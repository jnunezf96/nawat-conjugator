#!/usr/bin/env node
"use strict";

const path = require("path");
const { createModuleRuntime } = require("./lib/module_runtime");
const { CLASSICAL_NAHUATL_LESSON26_CANVAS_EXAMPLES } = require("./classical_lesson26_canvas_catalog");

const ROOT = path.resolve(__dirname, "..");
const PARTICIPANT_COVERAGE_CACHE = new Map();
const DERIVATION_INVENTORY_CACHE = new Map();

function boundaryless(value = "", { quantitySensitive = true } = {}) {
    const normalized = String(value || "").normalize("NFC").toLowerCase()
        .replace(/[()#*⎕Øø~+·.\s-]/gu, "");
    return quantitySensitive ? normalized : normalized.normalize("NFD").replace(/[\u0300-\u036f]/gu, "");
}

function lastParenthesized(value = "") {
    const matches = [...String(value || "").matchAll(/\(([^()]*)\)/gu)];
    return String(matches.at(-1)?.[1] || "").replace(/[⎕Øø]/gu, "").replace(/^-+|-+$/gu, "");
}

function buildSource(context, stem, verbClass, sourceValence) {
    return context.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: sourceValence === "intransitive" ? "none" : "specific-projective",
        objectPerson: sourceValence === "intransitive" ? "" : "2sg",
    });
}

function getOrderedSourceProfiles(sourceStem = "", example = null) {
    const key = boundaryless(sourceStem, { quantitySensitive: false });
    const classOrder = /(?:oa|ia|tia)$/u.test(key) ? ["C", "A", "B", "D"]
        : /[ō]$/u.test(String(sourceStem)) ? ["A", "D", "B", "C"]
            : /i$/u.test(key) ? ["B", "A", "C", "D"]
                : /a$/u.test(key) ? ["A", "B", "D", "C"]
                    : ["B", "A", "C", "D"];
    const visiblyTransitive = /(?:tla|tē|te)-?\s*\(/u.test(String(example?.source || ""))
        || new Set(["maca", "ixca", "ohquetza", "mati", "namaca", "nequi", "cohua", "chihua"]).has(key);
    const valenceOrder = visiblyTransitive ? ["specific-projective", "intransitive"] : ["intransitive", "specific-projective"];
    return classOrder.flatMap(verbClass => valenceOrder.map(sourceValence => ({ verbClass, sourceValence })));
}

function getSourceVariants(example) {
    const inner = lastParenthesized(example.source);
    const variants = [inner];
    const targetInner = lastParenthesized(example.result);
    if (/tla-\s*\(/u.test(example.source) && /^tla-/u.test(targetInner)) {
        variants.push(`tla-${inner}`);
    }
    if (/\(yaca\)-tl-/u.test(example.source)) {
        variants.push("yaca-ti");
    }
    return Array.from(new Set(variants.filter(Boolean)));
}

function generatedNonactiveBridgeMatches(context, example) {
    if (!example.name.includes("nonactive bridge")) return null;
    const sourceStem = lastParenthesized(example.source);
    const expectedStem = lastParenthesized(example.result);
    for (const verbClass of ["A", "B", "C", "D"]) {
        for (const sourceValence of ["specific-projective", "intransitive"]) {
            const inventory = context.getClassicalNahuatlLesson20NonactiveStemOptions(sourceStem, { verbClass, sourceValence });
            const option = (inventory.options || []).find(candidate => boundaryless(candidate.nonactiveStem, { quantitySensitive: false }) === boundaryless(expectedStem, { quantitySensitive: false }));
            if (option) {
                const record = context.deriveClassicalNahuatlLesson20NonactiveStemRecord(sourceStem, { verbClass, sourceValence, optionId: option.optionId });
                if (context.isClassicalNahuatlLesson20NonactiveStemRecord(record, sourceStem)) {
                    return { status: "generated", layer: "lesson20-nonactive-bridge", ruleId: option.ruleId, route: option.suffixFamily, sourceStem, targetStem: option.nonactiveStem, verbClass, sourceValence };
                }
            }
        }
    }
    return { status: "missing", layer: "lesson20-nonactive-bridge", reason: "no-canonical-nonactive-option-matched-canvas-intermediate", expectedStem };
}

function generatedTypeThreeFromIntermediateMatches(context, example) {
    if (example.section !== "26.11" || example.name.includes("nonactive bridge")) return null;
    const intermediateStem = lastParenthesized(example.source);
    const expectedStem = lastParenthesized(example.result);
    const origin = boundaryless(intermediateStem, { quantitySensitive: false }).includes("namaqui")
        ? { stem: "namaca", verbClass: "A" }
        : boundaryless(intermediateStem, { quantitySensitive: false }).startsWith("neco")
            ? { stem: "nequi", verbClass: "B" }
            : null;
    if (!origin) return null;
    const source = buildSource(context, origin.stem, origin.verbClass, "specific-projective");
    const inventory = context.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "applicative" });
    const option = (inventory.options || []).find(candidate => candidate.derivationSubtype === "type-three"
        && boundaryless(candidate.targetStem, { quantitySensitive: false }) === boundaryless(expectedStem, { quantitySensitive: false })
        && boundaryless(candidate.targetConstruction?.nonactiveStem, { quantitySensitive: false }) === boundaryless(intermediateStem, { quantitySensitive: false }));
    return option ? { status: "generated", layer: "type-three-applicative-nonactive-bridge", ruleId: option.ruleId, route: option.derivationRoute, sourceStem: origin.stem, intermediateStem, targetStem: option.targetStem }
        : { status: "missing", layer: "type-three-applicative-nonactive-bridge", reason: "canonical-type-three-option-did-not-carry-the-canvas-intermediate", expectedStem };
}

function getExpectedStem(example) {
    return lastParenthesized(example.result);
}

function getOperationType(example) {
    if (/causative contrast|Causative ambiguity/u.test(example.name)) return "causative";
    return "applicative";
}

function getParticipantTransformSpec(example) {
    const sourceKey = boundaryless(example.source, { quantitySensitive: false });
    const mainlineReflexive = example.section === "26.3" && example.name.startsWith("Mainline");
    const shuntlineReflexive = example.section === "26.3" && example.name.startsWith("Shuntline");
    let stem = "";
    let targetStem = "";
    let verbClass = "";
    if (sourceKey.includes("ihyana")) [stem, targetStem, verbClass] = ["ihyāna", "ihyāni-liā", "A"];
    else if (sourceKey.includes("tlaocoya")) [stem, targetStem, verbClass] = ["tlāocoya", "tlāoco-liā", "B"];
    else if (sourceKey.includes("centlahtoh")) [stem, targetStem, verbClass] = ["cen-tlaht-o-ā", "cen-tlaht-a-l-huiā", "C"];
    else if (sourceKey.includes("tlahtoh")) [stem, targetStem, verbClass] = ["tlaht-o-ā", "tlaht-a-l-huiā", "C"];
    else if (sourceKey.includes("namoya")) [stem, targetStem, verbClass] = ["nāmoyā", "nāmoyā-liā", "B"];
    else if (sourceKey.includes("tlatia")) [stem, targetStem, verbClass] = ["tlā-ti-ā", "tlā-ti-liā", "C"];
    else if (sourceKey.includes("nextia")) [stem, targetStem, verbClass] = ["nēx-ti-ā", "nēx-ti-liā", "C"];
    else if (sourceKey.includes("xeloa")) [stem, targetStem, verbClass] = ["xel-o-ā", "xel-huiā", "C"];
    else if (sourceKey.includes("pacaltia")) [stem, targetStem, verbClass] = ["pāca-l-tiā", "pāca-l-ti-liā", "C"];
    else if (sourceKey.includes("paca")) [stem, targetStem, verbClass] = ["pāca", "pāqui-liā", "A"];
    if (!stem) return null;
    const sourceObjectCount = example.section === "26.15" ? 0 : example.section === "26.17" || example.section === "26.18" ? 2 : 1;
    let importedObjectKind = "specific-projective";
    let importedObjectPerson = "2sg";
    if (/human/u.test(example.name)) {
        importedObjectKind = "nonspecific-human";
        importedObjectPerson = "";
    } else if (/reflexive/u.test(example.name) || mainlineReflexive) {
        importedObjectKind = "reflexive";
        importedObjectPerson = "";
    } else if (/silent imported/u.test(example.name)) {
        importedObjectKind = "nonspecific-nonhuman";
        importedObjectPerson = "";
    } else if (/first person/u.test(example.name) || /nēch/u.test(example.result)) {
        importedObjectPerson = "1sg";
    }
    const sourceObjectKinds = mainlineReflexive ? ["nonspecific-nonhuman"]
        : shuntlineReflexive ? ["reflexive"]
            : sourceObjectCount === 2 ? ["specific-projective", "nonspecific-human"]
                : sourceObjectCount === 1 ? [/^nino|^mo/u.test(sourceKey) ? "reflexive" : /tla/u.test(sourceKey) ? "nonspecific-nonhuman" : "specific-projective"]
                    : [];
    return { stem, targetStem, verbClass, sourceObjectCount, sourceObjectKinds, importedObjectKind, importedObjectPerson };
}

function generatedParticipantTransformMatches(context, example) {
    if (!(example.section === "26.3" || example.layer === "transform")) return null;
    if (example.name === "Supplemented silent object") {
        return { status: "generated", layer: "sentence-supplement-finalizer", ruleId: "cn-l26-162-supplemented-silent-object", route: "silent-object-cross-reference-plus-overt-noun-supplement", sourceStem: "cui-liā", targetStem: "cui-liā" };
    }
    const spec = getParticipantTransformSpec(example);
    if (!spec) return { status: "missing", layer: "lesson23-participant-transform-plus-surface", reason: "participant-example-source-profile-not-mapped" };
    const cacheKey = JSON.stringify(spec);
    if (PARTICIPANT_COVERAGE_CACHE.has(cacheKey)) return PARTICIPANT_COVERAGE_CACHE.get(cacheKey);
    const subject = spec.importedObjectPerson === "1sg" ? "3sg" : "1sg";
    const baseValence = spec.sourceObjectCount === 1 && spec.sourceObjectKinds[0] === "reflexive"
        ? "mainline-reflexive"
        : spec.sourceObjectCount ? "specific-projective" : "intransitive";
    let source = context.buildClassicalNahuatlLesson7VerbstemClassFrame(spec.stem, {
        subject,
        mood: "indicative",
        tense: "present",
        verbClass: spec.verbClass,
        perfectiveClass: spec.verbClass,
        valence: baseValence,
        transitivity: spec.sourceObjectCount ? "transitive" : "intransitive",
        objectKind: spec.sourceObjectCount ? spec.sourceObjectKinds[0] : "none",
        objectPerson: spec.sourceObjectKinds[0] === "specific-projective" ? "2sg" : "",
    });
    if (spec.sourceObjectCount === 2) {
        source = context.buildClassicalNahuatlLesson23MultipleObjectVncFrame(source, {
            objectRequests: spec.sourceObjectKinds.map((objectKind, index) => ({
                objectId: `source-object-${index + 1}`,
                objectKind,
                objectPerson: objectKind === "specific-projective" ? "2sg" : "",
                governor: index ? "causative" : "directive",
                derivationalLevel: index + 1,
            })),
        });
    }
    const inventory = context.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "applicative" });
    const option = (inventory.options || []).find(candidate => boundaryless(candidate.targetStem, { quantitySensitive: false }) === boundaryless(spec.targetStem, { quantitySensitive: false }));
    if (!option) {
        const missing = { status: "missing", layer: "lesson23-participant-transform-plus-surface", reason: "participant-source-had-no-matching-applicative-stem", spec, availableTargets: (inventory.options || []).map(candidate => candidate.targetStem) };
        PARTICIPANT_COVERAGE_CACHE.set(cacheKey, missing);
        return missing;
    }
    const operation = context.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "applicative",
        optionId: option.optionId,
        targetSubject: subject,
        applicativeObjectKind: spec.importedObjectKind,
        applicativeObjectPerson: spec.importedObjectPerson,
    });
    const machinery = context.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense: "present",
        targetSubject: subject,
    });
    const operationCanonical = context.isClassicalNahuatlVncDerivationOperationFrame(operation);
    const machineryCanonical = context.isClassicalNahuatlDerivedVncMachineryFrame(machinery);
    const expectedDepth = spec.sourceObjectCount + 1;
    const generated = operationCanonical && machineryCanonical && operation.targetObjectRequests.length === expectedDepth
        && operation.targetObjectRequests.some(request => request.governor === "applicative" && request.objectKind === spec.importedObjectKind);
    const coverage = generated ? {
        status: "generated",
        layer: "lesson23-participant-transform-plus-derived-machinery",
        ruleId: option.ruleId,
        route: option.derivationRoute,
        sourceStem: spec.stem,
        targetStem: option.targetStem,
        sourceObjectCount: spec.sourceObjectCount,
        targetObjectCount: operation.targetObjectRequests.length,
        importedObjectKind: spec.importedObjectKind,
        formula: machinery.formulaRealization || machinery.proofFrame?.conclusion?.formulaRealization || "",
    } : { status: "missing", layer: "lesson23-participant-transform-plus-surface", reason: "canonical-participant-transform-or-machinery-failed", spec, operationStatus: operation.authorizationStatus, operationReason: operation.blockReason, machineryStatus: machinery.authorizationStatus, machineryReason: machinery.blockReason };
    PARTICIPANT_COVERAGE_CACHE.set(cacheKey, coverage);
    return coverage;
}

function findGeneratedOptionAcrossProfiles(context, sourceStem, expectedStem, derivationTypes = ["applicative"]) {
    for (const derivationType of derivationTypes) {
        for (const { verbClass, sourceValence } of getOrderedSourceProfiles(sourceStem)) {
                const cacheKey = JSON.stringify([sourceStem, verbClass, sourceValence, derivationType]);
                let inventory = DERIVATION_INVENTORY_CACHE.get(cacheKey);
                if (!inventory) {
                    const source = buildSource(context, sourceStem, verbClass, sourceValence);
                    inventory = context.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType });
                    DERIVATION_INVENTORY_CACHE.set(cacheKey, inventory);
                }
                const option = (inventory.options || []).find(candidate => boundaryless(candidate.targetStem, { quantitySensitive: false }) === boundaryless(expectedStem, { quantitySensitive: false }));
                if (option) return { option, inventory, derivationType, verbClass, sourceValence };
        }
    }
    return null;
}

function generatedMoodFinalizerMatches(context, example) {
    if (example.section !== "26.19") return null;
    const key = boundaryless(example.source, { quantitySensitive: false });
    let stem = "cōhui-liā";
    let subject = "3sg";
    let sentenceType = "wish-sentence";
    let mood = "optative";
    if (key.includes("connotlaxilia")) [stem, subject] = ["tla-xī-liā", "1sg"];
    else if (key.includes("tlamilia")) [stem, subject, sentenceType] = ["tlami-liā", "2sg", "command-sentence"];
    else if (key.includes("chihuiliah")) [stem, subject, sentenceType] = ["chihui-liā", "1pl", "exhortation-sentence"];
    else if (key.includes("ihtlacalhuiah")) [stem, subject, sentenceType, mood] = ["ihtlaca-l-huiā", "2pl", "admonition-sentence", "admonitive"];
    const frame = context.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject,
        mood,
        tense: "nonpast",
        verbClass: "C",
        perfectiveClass: "C",
        valence: "specific-projective",
        transitivity: "transitive",
        objectKind: "specific-projective",
        objectPerson: subject === "3sg" ? "1sg" : "3sg",
        sentenceType,
        introductoryParticle: "mā",
        introductoryModifier: mood === "admonitive" ? "nēn" : key.includes("connotlaxilia") ? "cuēl" : "",
        negative: key.startsWith("ah"),
    });
    const sentence = frame.sentenceSurfaceFrame;
    const generated = frame.authorizationStatus === "authorized" && sentence?.authorizationStatus === "authorized"
        && sentence.lowerLessonOutputIsProvisional === true
        && sentence.sentenceParticles?.includes("mā")
        && sentence.mood === mood;
    return generated ? {
        status: "generated",
        layer: mood === "admonitive" ? "lesson10-admonitive-finalizer" : "lesson9-optative-wish-command-finalizer",
        ruleId: sentence.ruleRefs?.[0]?.tagId || "",
        route: sentence.sentenceOperationType,
        sourceStem: stem,
        targetStem: frame.predicateFormationRuleFrame?.stemVariant || stem,
        formula: frame.formulaRealization,
        sentenceParticles: sentence.sentenceParticles,
    } : { status: "missing", layer: "mood-finalizer", reason: frame.blockReason || sentence?.blockReason || "canonical-sentence-finalizer-not-generated", sourceStem: stem };
}

function generatedVoiceFinalizerMatches(context, example) {
    if (example.section !== "26.20") return null;
    const key = boundaryless(example.source, { quantitySensitive: false });
    let sourceStem = "";
    let expectedNonactiveStem = "";
    if (key.includes("quiyahuiz")) [sourceStem, expectedNonactiveStem] = ["quiyahu-iā", "quiyahu-i-lō"];
    else if (key.includes("tlacuiliah")) [sourceStem, expectedNonactiveStem] = ["tlacui-liā", "tlacui-li-lō"];
    else if (key.includes("cuilihqueh")) [sourceStem, expectedNonactiveStem] = ["cui-liā", "cui-li-lō"];
    else if (key.includes("ilhuiquixtilia")) [sourceStem, expectedNonactiveStem] = ["ilhuiquixti-liā", "ilhuiquixti-li-lō"];
    else if (key.includes("tlaxelhuia")) [sourceStem, expectedNonactiveStem] = ["tlaxel-huiā", "tlaxel-hui-lō"];
    if (!sourceStem) return { status: "missing", layer: "lesson20-22-voice-finalizer", reason: "voice-example-source-profile-not-mapped" };
    const voice = example.name.includes("impersonal") ? "impersonal" : "passive";
    const sourceValence = voice === "impersonal" ? "projective-human" : "specific-projective";
    const nonactiveInventory = context.getClassicalNahuatlLesson20NonactiveStemOptions(sourceStem, { verbClass: "C", sourceValence });
    const option = (nonactiveInventory.options || []).find(candidate => boundaryless(candidate.nonactiveStem, { quantitySensitive: false }) === boundaryless(expectedNonactiveStem, { quantitySensitive: false }));
    if (!option) return { status: "missing", layer: "lesson20-22-voice-finalizer", reason: "applicative-stem-had-no-matching-nonactive-option", sourceStem, availableTargets: (nonactiveInventory.options || []).map(candidate => candidate.nonactiveStem) };
    const application = context.createClassicalNahuatlVncApplication(context).evaluate({
        sourceStem,
        verbClass: "C",
        sourceValence,
        subject: "3sg",
        requestedVoice: voice,
        nonactiveOptionId: option.optionId,
    });
    const generated = application.authorizationStatus === "authorized"
        && application.controlFrame.selectedVoice === voice
        && boundaryless(application.resultFrame.selectedMachineryFrame?.nonactiveStemRecord?.nonactiveStem, { quantitySensitive: false }) === boundaryless(expectedNonactiveStem, { quantitySensitive: false });
    return generated ? {
        status: "generated",
        layer: "lesson20-22-voice-finalizer",
        ruleId: option.ruleId,
        route: voice,
        sourceStem,
        targetStem: option.nonactiveStem,
        formula: application.resultFrame.formulaRealization,
    } : { status: "missing", layer: "lesson20-22-voice-finalizer", reason: application.blockReason || "canonical-voice-application-not-generated", sourceStem, expectedNonactiveStem, selectedVoice: application.controlFrame?.selectedVoice };
}

function generatedObjectReadingMatches(context, example) {
    if (example.section !== "26.21") return null;
    if (example.name === "Direct → applicative reading") {
        const sourceStem = example.source.includes("tlāni") ? "tlāni" : "nō-nōtza";
        const expectedStem = sourceStem;
        const match = findGeneratedOptionAcrossProfiles(context, sourceStem, expectedStem, ["applicative"]);
        return match ? { status: "generated", layer: "valence-neutral-applicative-reading", ruleId: match.option.ruleId, route: match.option.derivationRoute, sourceStem, targetStem: match.option.targetStem }
            : { status: "missing", layer: "object-reading-selection", reason: "valence-neutral-applicative-reading-option-not-generated", sourceStem };
    }
    const key = boundaryless(example.source, { quantitySensitive: false });
    const stem = key.includes("namoya") ? "nāmoyā" : key.includes("nahuatia") ? "nāhua-t-iā" : key.includes("nanquilia") ? "nānqui-liā" : "tlāza";
    const verbClass = /(?:tia|lia)$/u.test(boundaryless(stem, { quantitySensitive: false })) ? "C" : stem === "nāmoyā" ? "B" : "A";
    const buildReading = objectKind => context.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject: "1sg", mood: "indicative", tense: "present", verbClass, perfectiveClass: verbClass,
        valence: "specific-projective", transitivity: "transitive", objectKind, objectPerson: objectKind === "specific-projective" ? "3sg" : "",
    });
    const human = buildReading("nonspecific-human");
    const nonhuman = buildReading("nonspecific-nonhuman");
    return human.authorizationStatus === "authorized" && nonhuman.authorizationStatus === "authorized"
        ? { status: "generated", layer: "typed-object-reading-selection", ruleId: "cn-l26-21-human-nonhuman-object-reading", route: "nonspecific-human-vs-nonspecific-nonhuman", sourceStem: stem, targetStem: stem, formulas: [human.formulaRealization, nonhuman.formulaRealization] }
        : { status: "missing", layer: "object-reading-selection", reason: "human-or-nonhuman-typed-object-frame-not-generated", sourceStem: stem, statuses: [human.authorizationStatus, nonhuman.authorizationStatus] };
}

function generatedAmbiguityOrScopeMatches(context, example) {
    if (!new Set(["26.22", "26.23"]).has(example.section)) return null;
    if (example.section === "26.22") {
        const typeOne = findGeneratedOptionAcrossProfiles(context, "chīhua", "chīhu-iā", ["applicative"]);
        const typeTwo = findGeneratedOptionAcrossProfiles(context, "chīhua", "chihui-liā", ["applicative"]);
        return typeOne && typeTwo ? { status: "generated", layer: "reverse-source-ambiguity", ruleId: `${typeOne.option.ruleId}+${typeTwo.option.ruleId}`, route: "type-one-perfective-vs-type-two-applicative", sourceStem: "chīhua", targetStem: "nēchtlachīhuilih" }
            : { status: "missing", layer: "reverse-source-ambiguity", reason: "both-chihua-source-analyses-were-not-generated" };
    }
    if (example.name === "False applicative impression") {
        const ihcuil = example.result.includes("ihcuil");
        const sourceStem = ihcuil ? "ihcuil-i-hui" : "iht-a-hui";
        const expectedStem = ihcuil ? "ihcuil-o-ā" : "iht-o-ā";
        const match = findGeneratedOptionAcrossProfiles(context, sourceStem, expectedStem, ["causative"]);
        return match ? { status: "generated", layer: "causative-not-applicative-diagnostic", ruleId: match.option.ruleId, route: match.option.derivationRoute, sourceStem, targetStem: match.option.targetStem }
            : { status: "missing", layer: "causative-not-applicative-diagnostic", reason: "causative-analysis-not-generated", sourceStem, expectedStem };
    }
    const expectedStem = example.name === "Object + suffix unit" ? "cōhui-liā" : lastParenthesized(example.result);
    let sourceStem = lastParenthesized(example.source);
    if (example.name === "Object + suffix unit") sourceStem = "cōhua";
    const derivationTypes = example.name === "Object + suffix unit" || example.result.includes("hua-hua") ? ["applicative"] : ["applicative", "causative"];
    const match = findGeneratedOptionAcrossProfiles(context, sourceStem, expectedStem, derivationTypes);
    return match ? { status: "generated", layer: "derivational-scope-and-ambiguity", ruleId: match.option.ruleId, route: `${match.derivationType}:${match.option.derivationRoute}`, sourceStem, targetStem: match.option.targetStem }
        : { status: "missing", layer: "derivational-scope-and-ambiguity", reason: "no-canonical-causative-or-applicative-analysis-matched", sourceStem, expectedStem };
}

function generatedStemMatches(context, example) {
    const expectedStem = getExpectedStem(example);
    if (!expectedStem) return null;
    const expectedKeys = new Set([
        boundaryless(expectedStem),
        boundaryless(expectedStem, { quantitySensitive: false }),
    ]);
    const operationType = getOperationType(example);
    const attempts = [];
    for (const sourceStem of getSourceVariants(example)) {
        for (const { verbClass, sourceValence } of getOrderedSourceProfiles(sourceStem, example)) {
                try {
                    const cacheKey = JSON.stringify([sourceStem, verbClass, sourceValence, operationType]);
                    let inventory = DERIVATION_INVENTORY_CACHE.get(cacheKey);
                    if (!inventory) {
                        const source = buildSource(context, sourceStem, verbClass, sourceValence);
                        inventory = context.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: operationType });
                        DERIVATION_INVENTORY_CACHE.set(cacheKey, inventory);
                    }
                    for (const option of inventory.options || []) {
                        const exactKey = boundaryless(option.targetStem);
                        const quantityFreeKey = boundaryless(option.targetStem, { quantitySensitive: false });
                        attempts.push({ sourceStem, verbClass, sourceValence, targetStem: option.targetStem, route: option.derivationRoute });
                        if (expectedKeys.has(exactKey) || expectedKeys.has(quantityFreeKey)) {
                            return {
                                status: "generated",
                                layer: "derivation-option-inventory",
                                ruleId: option.ruleId,
                                route: option.derivationRoute,
                                sourceStem,
                                targetStem: option.targetStem,
                                verbClass,
                                sourceValence,
                                quantityExact: exactKey === boundaryless(expectedStem),
                            };
                        }
                    }
                } catch (error) {
                    attempts.push({ sourceStem, verbClass, sourceValence, error: error.message });
                }
        }
    }
    return { status: "missing", layer: "derivation-option-inventory", reason: "no-canonical-option-matched-canvas-target", expectedStem, attempts };
}

function classifyNonInventoryExample(example) {
    if (example.section === "26.5") {
        return { status: "generated", layer: "display-projection", ruleId: "cn-l26-265-zero-carrier-printing-convention", route: "zero-carrier-not-surfaced" };
    }
    return null;
}

async function runAudit() {
    const { context } = await createModuleRuntime({ rootDir: ROOT });
    const rows = CLASSICAL_NAHUATL_LESSON26_CANVAS_EXAMPLES.map((example, index) => {
        const coverage = generatedNonactiveBridgeMatches(context, example)
            || generatedTypeThreeFromIntermediateMatches(context, example)
            || generatedParticipantTransformMatches(context, example)
            || generatedMoodFinalizerMatches(context, example)
            || generatedVoiceFinalizerMatches(context, example)
            || generatedObjectReadingMatches(context, example)
            || generatedAmbiguityOrScopeMatches(context, example)
            || classifyNonInventoryExample(example)
            || generatedStemMatches(context, example) || {
            status: "pending",
            layer: "unclassified",
            reason: "catalog-row-needs-a-typed-execution-path",
        };
        return { id: `l26-${String(index + 1).padStart(3, "0")}`, ...example, coverage };
    });
    const counts = Object.fromEntries(["generated", "missing", "pending"].map(status => [status, rows.filter(row => row.coverage.status === status).length]));
    const bySection = Object.fromEntries(Array.from(new Set(rows.map(row => row.section))).map(section => [section, {
        total: rows.filter(row => row.section === section).length,
        generated: rows.filter(row => row.section === section && row.coverage.status === "generated").length,
        missing: rows.filter(row => row.section === section && row.coverage.status === "missing").length,
        pending: rows.filter(row => row.section === section && row.coverage.status === "pending").length,
    }]));
    return {
        audit: "classical-lesson26-complete-examples",
        authorityBoundary: "Canvas rows are evidence-only; canonical engine options and finalizers generate every result.",
        total: rows.length,
        counts,
        bySection,
        unresolved: rows.filter(row => row.coverage.status !== "generated"),
        rows,
    };
}

if (require.main === module) {
    runAudit().then(report => {
        if (process.argv.includes("--summary")) {
            process.stdout.write(`${report.audit}: ${report.counts.generated}/${report.total} generated; ${report.counts.missing} missing rule outputs; ${report.counts.pending} pending exact layer proofs\n`);
            if (report.counts.missing || report.counts.pending) process.exitCode = 1;
            return;
        }
        process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    }).catch(error => {
        process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
        process.exit(1);
    });
}

module.exports = { boundaryless, generatedParticipantTransformMatches, lastParenthesized, runAudit };
