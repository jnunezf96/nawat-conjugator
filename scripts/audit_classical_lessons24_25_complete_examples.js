#!/usr/bin/env node
"use strict";

const path = require("path");
const { createModuleRuntime } = require("./lib/module_runtime");
const {
    CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES,
} = require("./classical_lessons24_25_canvas_catalog");

const ROOT = path.resolve(__dirname, "..");
const INVENTORY_CACHE = new WeakMap();
const PERFECTIVE_CANDIDATE_CACHE = new WeakMap();
const VNC_SOURCE_BUNDLE_CACHE = new WeakMap();
const VNC_ENUMERATION_CACHE = new WeakMap();
const COVERAGE_CACHE = new WeakMap();

function auditNow() {
    return typeof performance !== "undefined" && typeof performance.now === "function"
        ? performance.now()
        : Date.now();
}

function getClassicalLessons2425AuditGenerationDescriptor(example = {}) {
    const layer = String(example.layer || "unclassified");
    if (layer === "stem" || layer === "perfective" || layer === "valence"
        || layer === "nonactive" || layer === "negative" || layer === "stock"
        || layer === "coalescence" || layer === "synonym") {
        return { layer, source: String(example.source || "") };
    }
    if (layer === "vnc") {
        return { layer, typedSourceProfile: getClassicalLessons2425VncGenerationSourceProfile(example) };
    }
    return {
        layer,
        section: String(example.section || ""),
        name: String(example.name || ""),
        source: String(example.source || ""),
    };
}

const CLASSICAL_LESSONS2425_FORBIDDEN_GENERATION_DESCRIPTOR_KEYS = new Set([
    "result",
    "expectedResult",
    "expectedTarget",
    "target",
    "targetStem",
    "optionId",
    "derivationOptionId",
]);

function classicalLessons2425GenerationDescriptorContainsTargetAuthority(value, seen = new Set()) {
    if (!value || typeof value !== "object" || seen.has(value)) return false;
    seen.add(value);
    if (Array.isArray(value)) {
        return value.some(item => classicalLessons2425GenerationDescriptorContainsTargetAuthority(item, seen));
    }
    return Object.entries(value).some(([key, child]) => (
        CLASSICAL_LESSONS2425_FORBIDDEN_GENERATION_DESCRIPTOR_KEYS.has(key)
        || classicalLessons2425GenerationDescriptorContainsTargetAuthority(child, seen)
    ));
}

function getClassicalLessons2425AuditGenerationKey(example = {}) {
    return JSON.stringify(getClassicalLessons2425AuditGenerationDescriptor(example));
}

function getClassicalLessons2425AuditQueryKey(example = {}) {
    return JSON.stringify({
        generationKey: getClassicalLessons2425AuditGenerationKey(example),
        expectedSource: String(example.source || ""),
        expectedResult: String(example.result || ""),
        evidenceStatus: String(example.evidenceStatus || ""),
    });
}

function buildClassicalLessons2425AuditPlan(examples = CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES) {
    const rows = (Array.isArray(examples) ? examples : []).map((example, index) => Object.freeze({
        index,
        id: `l${example.lesson}-${String(index + 1).padStart(3, "0")}`,
        layer: String(example.layer || "unclassified"),
        generationDescriptor: Object.freeze(getClassicalLessons2425AuditGenerationDescriptor(example)),
        generationKey: getClassicalLessons2425AuditGenerationKey(example),
        queryKey: getClassicalLessons2425AuditQueryKey(example),
        example,
    }));
    const grouped = new Map();
    for (const row of rows) {
        if (!grouped.has(row.generationKey)) grouped.set(row.generationKey, []);
        grouped.get(row.generationKey).push(row);
    }
    const groups = Object.freeze([...grouped.entries()].map(([generationKey, groupedRows]) => Object.freeze({
        generationKey,
        layer: groupedRows[0]?.layer || "unclassified",
        generationDescriptor: groupedRows[0]?.generationDescriptor || Object.freeze({}),
        rows: Object.freeze([...groupedRows]),
    })));
    return Object.freeze({
        kind: "classical-lessons24-25-audit-plan",
        version: 1,
        rowCount: rows.length,
        uniqueGenerationKeyCount: groups.length,
        rows: Object.freeze(rows),
        groups,
        expectedTargetsExcludedFromGenerationDescriptors: rows.every(row => (
            !classicalLessons2425GenerationDescriptorContainsTargetAuthority(row.generationDescriptor)
        )),
    });
}

function createClassicalLessons2425AuditExecutionIndex(context, examples = CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES) {
    const plan = buildClassicalLessons2425AuditPlan(examples);
    return {
        kind: "classical-lessons24-25-shared-execution-index",
        version: 1,
        context,
        plan,
        stemEntries: new Map(),
        vncEntries: new Map(),
        queryResults: new Map(),
        relationsByCanonicalSourceProfileSignature: new Map(),
        layerTimings: new Map(),
        generationBuildsByKey: new Map(),
        queryCountsByKey: new Map(),
        startedAt: auditNow(),
    };
}

function getClassicalLessons2425AuditLayerTiming(index, layer = "unclassified") {
    if (!index.layerTimings.has(layer)) {
        index.layerTimings.set(layer, {
            layer,
            rowCount: 0,
            uniqueGenerationKeys: new Set(),
            generationBuilds: 0,
            generationMs: 0,
            matchingMs: 0,
            combinedMs: 0,
        });
    }
    return index.layerTimings.get(layer);
}

function recordClassicalLessons2425AuditGeneration(index, layer, generationKey, elapsedMs) {
    const timing = getClassicalLessons2425AuditLayerTiming(index, layer);
    timing.uniqueGenerationKeys.add(generationKey);
    timing.generationBuilds += 1;
    timing.generationMs += elapsedMs;
    index.generationBuildsByKey.set(generationKey, (index.generationBuildsByKey.get(generationKey) || 0) + 1);
}

function recordClassicalLessons2425AuditQuery(index, layer, generationKey, elapsedMs, { combined = false } = {}) {
    const timing = getClassicalLessons2425AuditLayerTiming(index, layer);
    timing.rowCount += 1;
    timing.uniqueGenerationKeys.add(generationKey);
    if (combined) timing.combinedMs += elapsedMs;
    else timing.matchingMs += elapsedMs;
    index.queryCountsByKey.set(generationKey, (index.queryCountsByKey.get(generationKey) || 0) + 1);
}

function addClassicalLessons2425IndexedRelation(index, sourceProfileSignature = "", relation = null) {
    if (!sourceProfileSignature || !relation) return;
    if (!index.relationsByCanonicalSourceProfileSignature.has(sourceProfileSignature)) {
        index.relationsByCanonicalSourceProfileSignature.set(sourceProfileSignature, []);
    }
    index.relationsByCanonicalSourceProfileSignature.get(sourceProfileSignature).push(relation);
}

function getRuntimeCache(cache, context) {
    let runtimeCache = cache.get(context);
    if (!runtimeCache) {
        runtimeCache = new Map();
        cache.set(context, runtimeCache);
    }
    return runtimeCache;
}

function setBoundedRuntimeCache(runtimeCache, key, value, limit = 8) {
    if (runtimeCache.has(key)) runtimeCache.delete(key);
    runtimeCache.set(key, value);
    while (runtimeCache.size > limit) {
        runtimeCache.delete(runtimeCache.keys().next().value);
    }
    return value;
}

function normalizeText(value = "") {
    return String(value || "").normalize("NFC").toLowerCase();
}

function surfaceKey(value = "") {
    return normalizeText(value)
        .replace(/[()#*⎕Øø~+·.\s]/gu, "")
        .replace(/^-+|-+$/gu, "");
}

function citationSurfaceKey(value = "") {
    return normalizeText(value)
        .replace(/[\s#*.]/gu, "");
}

function citationShapeKey(value = "") {
    return citationSurfaceKey(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/gu, "");
}

function sentenceSurfaceKey(value = "") {
    return normalizeText(value)
        .replace(/\s+/gu, " ")
        .replace(/\s*\+\s*/gu, " + ")
        .trim();
}

function sentenceShapeKey(value = "") {
    return sentenceSurfaceKey(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/gu, "");
}

function capitalizeCanvasWord(value = "") {
    const normalized = String(value || "").normalize("NFC");
    return normalized ? `${normalized[0].toLocaleUpperCase()}${normalized.slice(1)}` : "";
}

function shapeKey(value = "") {
    return surfaceKey(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f-]/gu, "");
}

function solidSurfaceKey(value = "") {
    return surfaceKey(value).replace(/-/gu, "");
}

function wordShapeKey(value = "") {
    return normalizeText(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/gu, "")
        .replace(/[^a-z]/gu, "");
}

function parenthesizedValues(value = "") {
    return [...String(value || "").matchAll(/\(([^()]*)\)/gu)]
        .map(match => String(match[1] || "").replace(/[⎕Øø]/gu, "").trim())
        .filter(Boolean);
}

function lastParenthesized(value = "") {
    return parenthesizedValues(value).at(-1) || "";
}

function unique(values = []) {
    return Array.from(new Set(values.filter(Boolean)));
}

function getFinalTypedVncSlotFrame(machineryFrame = null) {
    return machineryFrame?.targetTypedVncSlotFrame
        || machineryFrame?.finalTypedVncSlotFrame
        || machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame
        || machineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame
        || machineryFrame?.finalBoundaryRealizationFrame?.typedSlotFrame
        || null;
}

function realizeTypedVncWord(context, machineryFrame = null) {
    const typedFrame = getFinalTypedVncSlotFrame(machineryFrame);
    if (typeof context.realizeClassicalNahuatlLesson25TypedVncWord !== "function" || !typedFrame) {
        return "";
    }
    return context.realizeClassicalNahuatlLesson25TypedVncWord(typedFrame);
}

function buildCanvasFiniteVncSurface(context, machineryFrame = null, { validate = true } = {}) {
    if (typeof context.buildClassicalNahuatlVncFiniteSurfaceFrame === "function"
        && typeof context.isClassicalNahuatlVncFiniteSurfaceFrame === "function") {
        const frame = context.buildClassicalNahuatlVncFiniteSurfaceFrame(machineryFrame);
        return {
            canonical: validate
                ? context.isClassicalNahuatlVncFiniteSurfaceFrame(frame)
                : frame?.authorizationStatus === "authorized",
            word: frame?.wordRealization || "",
            frame,
        };
    }
    return {
        canonical: false,
        word: realizeTypedVncWord(context, machineryFrame),
        frame: null,
    };
}

function realizeTypedVncMorphology(machineryFrame = null) {
    const typedFrame = getFinalTypedVncSlotFrame(machineryFrame);
    const carriers = (typedFrame?.slots?.prePredicate || [])
        .map(slot => String(slot?.carrier || ""))
        .filter(carrier => carrier && !/^(?:0|0-0|Ø|ø|⎕)$/u.test(carrier));
    const predicate = String(typedFrame?.slots?.predicate?.stem || "");
    return `${carriers.length ? `${carriers.join("+")}-` : ""}(${predicate})`;
}

function getExpectedVncSourceEvidence(example = {}) {
    const raw = String(example.source || "").trim();
    if (!/[()>|]/u.test(raw)) {
        return { kind: "finite-word", value: raw };
    }
    const sourceStem = parenthesizedValues(raw)[0] || "";
    return { kind: "predicate-stem", value: sourceStem };
}

function splitCanvasStages(value = "") {
    return String(value || "").split(">").map(stage => stage.trim()).filter(Boolean);
}

function getCanvasCitationStageForStem(value = "", stem = "") {
    const stages = splitCanvasStages(value);
    return stages.find(stage => parenthesizedValues(stage)
        .some(candidate => surfaceKey(candidate) === surfaceKey(stem))) || stages.at(-1) || "";
}

function splitCanvasCitationAlternatives(stage = "", stem = "") {
    const predicate = stem || lastParenthesized(stage);
    return String(stage || "").split("~").map(alternative => {
        const trimmed = alternative.trim();
        if (!trimmed || /\([^()]*\)/u.test(trimmed) || !predicate) return trimmed;
        return `${trimmed.replace(/-?\s*$/u, "-")}(${predicate})`;
    }).filter(Boolean);
}

function getCanvasCitationPrefixCarriers(citation = "", stem = "") {
    const stage = getCanvasCitationStageForStem(citation, stem);
    const parenthesisIndex = stage.indexOf("(");
    if (parenthesisIndex < 0) return [];
    let prefix = stage.slice(0, parenthesisIndex)
        .replace(/[*#\s]/gu, "")
        .replace(/-+$/gu, "");
    if (!prefix) return [];
    const carriers = [];
    while (prefix) {
        const reflexive = prefix.match(/(?:^|\+)(m-(?:o|Ø|ø))$/u);
        if (reflexive) {
            carriers.unshift(reflexive[1]);
            prefix = prefix.slice(0, Math.max(0, prefix.length - reflexive[0].length));
            continue;
        }
        const plus = prefix.lastIndexOf("+");
        const carrier = plus >= 0 ? prefix.slice(plus + 1) : prefix;
        if (carrier) carriers.unshift(carrier);
        prefix = plus >= 0 ? prefix.slice(0, plus) : "";
    }
    return carriers;
}

function getCanvasCitationObjectRequest(carrier = "", index = 0) {
    const normalized = normalizeText(carrier).replace(/[-Øø⎕]/gu, "");
    const objectKind = /^m(?:o)?$/u.test(normalized) ? "reflexive"
        : normalized === "tē" || normalized === "te" ? "nonspecific-human"
            : normalized === "tla" ? "nonspecific-nonhuman" : "";
    if (!objectKind) return null;
    return {
        objectId: `source-object-${index + 1}`,
        objectKind,
        objectPerson: objectKind === "reflexive" ? "3sg" : "",
        governor: index ? "causative" : "directive",
        derivationalLevel: index + 1,
    };
}

function getCanvasCitationObjectRequests(citation = "", stem = "") {
    return getCanvasCitationPrefixCarriers(citation, stem)
        .map(getCanvasCitationObjectRequest)
        .filter(Boolean);
}

function buildSource(context, stem, verbClass = "A", sourceValence = "intransitive", options = {}) {
    const objectKind = {
        "specific-projective": "specific-projective",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman",
        "mainline-reflexive": "reflexive",
    }[sourceValence] || "none";
    return context.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject: options.subject || "3sg",
        mood: options.mood || "indicative",
        tense: options.tense || "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind,
        objectPerson: objectKind === "specific-projective" ? options.objectPerson || "2sg" : "",
        sentenceType: options.sentenceType || "",
        introductoryParticle: options.introductoryParticle || "",
        introductoryModifier: options.introductoryModifier || "",
        negative: options.negative === true,
    });
}

function getInventory(context, stem, verbClass, sourceValence, derivationType = "causative") {
    const runtimeCache = getRuntimeCache(INVENTORY_CACHE, context);
    const cacheKey = JSON.stringify([stem, verbClass, sourceValence, derivationType]);
    if (!runtimeCache.has(cacheKey)) {
        const source = buildSource(context, stem, verbClass, sourceValence);
        const inventory = context.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType });
        runtimeCache.set(cacheKey, { source, inventory });
    }
    return runtimeCache.get(cacheKey);
}

function sourceProfiles(sourceStem = "", example = null) {
    // The class is part of the user's typed source profile, not recoverable
    // from a spelling alone. Exhaust the four Andrews classes and accept only
    // a canonical inventory match; the expected catalog target never enters
    // the engine as authority.
    const classes = ["A", "B", "C", "D"];
    const sourceText = normalizeText(example?.source || "");
    const valences = /m-[oø](?:\+|-\()/u.test(sourceText) ? ["mainline-reflexive"]
        : /tē\s*[-+]\s*tla/u.test(sourceText) ? ["specific-projective", "projective-human", "projective-nonhuman"]
            : /tē\s*[-+]\s*\(/u.test(sourceText) ? ["specific-projective", "projective-human"]
                : /tla\s*[-+]\s*\(/u.test(sourceText) ? ["specific-projective", "projective-nonhuman"]
                    : ["intransitive"];
    return classes.flatMap(verbClass => valences.map(sourceValence => ({ verbClass, sourceValence })));
}

function sourceCandidates(example) {
    const candidates = unique(parenthesizedValues(example.source));
    return example.lesson === 24 && candidates.length > 1 ? candidates.reverse() : candidates;
}

function expectedStemCandidates(example) {
    return unique(parenthesizedValues(example.result));
}

function buildCanvasCitationSource(context, example, sourceStem, verbClass) {
    const objectRequests = getCanvasCitationObjectRequests(example.source, sourceStem);
    if (objectRequests.length > 1) {
        return {
            source: buildMultipleObjectSource(context, sourceStem, verbClass, objectRequests, "3sg", "3sg"),
            sourceValence: "multiple-object",
            sourceObjectRequests: objectRequests,
        };
    }
    const objectKind = objectRequests[0]?.objectKind || "";
    const sourceValence = objectKind === "reflexive" ? "mainline-reflexive"
        : objectKind === "nonspecific-human" ? "projective-human"
            : objectKind === "nonspecific-nonhuman" ? "projective-nonhuman"
                : "intransitive";
    return {
        source: buildSource(context, sourceStem, verbClass, sourceValence, {
            subject: "3sg",
            objectPerson: objectRequests[0]?.objectPerson || "",
        }),
        sourceValence,
        sourceObjectRequests: objectRequests,
    };
}

function buildCanvasCitationSourceVariants(context, example, sourceStem, verbClass) {
    const active = buildCanvasCitationSource(context, example, sourceStem, verbClass);
    const variants = [active];
    // Andrews 24.8 derives a nonspecific causative object from an impersonal
    // source VNC. Do not simulate that route with a caller-selected object
    // kind on an active source.
    if (active.sourceValence === "intransitive") {
        const impersonalSource = buildTypedVncSource(context, {
            sourceStem,
            verbClass,
            sourceObjectCount: 0,
            sourceObjectKinds: [],
            sourceVoice: "impersonal",
            sourceNonactiveStem: "",
            sourceSubject: "3sg",
            sourceSpecificObjectPerson: "",
        });
        if (impersonalSource && context.isClassicalNahuatlVncDerivationSourceMachineryFrame(impersonalSource)) {
            variants.push({
                source: impersonalSource,
                sourceValence: "intransitive",
                sourceObjectRequests: [],
            });
        }
    }
    return variants;
}

function enumerateCanvasStemCitationRelations(context, example, derivationType = "causative") {
    const candidates = [];
    const attempts = [];
    for (const sourceStem of sourceCandidates(example)) {
        for (const verbClass of ["A", "B", "C", "D"]) {
            try {
                const sourceBundles = buildCanvasCitationSourceVariants(context, example, sourceStem, verbClass);
                for (const sourceBundle of sourceBundles) {
                const { source, sourceValence, sourceObjectRequests } = sourceBundle;
                const inventory = context.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType });
                const inventoryCanonical = inventory.authorizationStatus === "authorized";
                const schematicInventory = inventoryCanonical
                    && typeof context.getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory === "function"
                    ? context.getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(source, inventory)
                    : null;
                const schematicAuthorized = schematicInventory?.authorizationStatus === "authorized"
                    && schematicInventory?.derivationOptionInventory === inventory
                    && schematicInventory?.sourceMachineryFrame === source
                    && schematicInventory?.typedFrameAuthority === true
                    && schematicInventory?.formulaStringAuthority === false
                    && schematicInventory?.surfaceStringAuthority === false
                    && schematicInventory?.callerSuppliedAuthorityAccepted === false
                    && schematicInventory?.catalogTargetAuthority === false;
                attempts.push({
                    sourceStem,
                    verbClass,
                    sourceValence,
                    sourceObjectKinds: sourceObjectRequests.map(request => request.objectKind),
                    status: inventory.authorizationStatus,
                    targets: (inventory.options || []).map(option => option.targetStem),
                    schematicStatus: schematicInventory?.authorizationStatus || "unavailable",
                    schematicPossibilityCount: schematicInventory?.possibilityCount || 0,
                });
                if (!schematicAuthorized) continue;
                const optionsById = new Map((inventory.options || []).map(option => [option.optionId, option]));
                for (const possibility of schematicInventory.possibilities || []) {
                    const option = optionsById.get(possibility.derivationOptionId);
                    if (!option) continue;
                    candidates.push({
                        sourceStem,
                        verbClass,
                        sourceValence,
                        source,
                        sourceObjectRequests,
                        inventory,
                        sourceProjection: schematicInventory.sourceProjectionFrame,
                        schematicInventory,
                        schematicAuthorized,
                        option,
                        profile: possibility.profile,
                        operation: possibility.operationFrame,
                        projection: possibility,
                        authorized: true,
                    });
                }
                }
            } catch (error) {
                attempts.push({ sourceStem, verbClass, error: error.message });
            }
        }
    }
    return { candidates, attempts };
}

function getClassicalLessons2425StemSourceProfileSignature(candidate = {}) {
    return JSON.stringify({
        sourceSignature: candidate.inventory?.sourceSignature || candidate.source?.canonicalSignature || "",
        sourceClass: candidate.inventory?.sourceClass || candidate.verbClass || "",
        sourceValence: candidate.inventory?.sourceValence || candidate.sourceValence || "",
        participantProfileId: candidate.profile?.profileId || "",
    });
}

function getIndexedStemEntry(context, example, auditIndex) {
    const generationKey = getClassicalLessons2425AuditGenerationKey(example);
    if (auditIndex.stemEntries.has(generationKey)) return auditIndex.stemEntries.get(generationKey);
    const started = auditNow();
    const enumeration = enumerateCanvasStemCitationRelations(context, example, "causative");
    const candidates = enumeration.candidates.filter(candidate => candidate.authorized).map(candidate => {
        const sourceProfileSignature = getClassicalLessons2425StemSourceProfileSignature(candidate);
        const indexed = {
            ...candidate,
            sourceProfileSignature,
        };
        addClassicalLessons2425IndexedRelation(auditIndex, sourceProfileSignature, Object.freeze({
            kind: "classical-lessons24-25-indexed-stem-relation",
            sourceProfileSignature,
            sourceSignature: candidate.inventory?.sourceSignature || "",
            inventorySignature: candidate.inventory?.canonicalSignature || "",
            derivationOptionSignature: candidate.option?.canonicalSignature || "",
            possibilitySignature: candidate.projection?.canonicalSignature || "",
            profileId: candidate.profile?.profileId || "",
            relationRealization: candidate.projection?.relationRealization || "",
            sourceHistoryRealization: candidate.projection?.sourceHistoryRealization || "",
            citationRealization: candidate.projection?.citationRealization || "",
        }));
        return indexed;
    });
    const entry = {
        generationKey,
        layer: "stem",
        candidates,
        attempts: enumeration.attempts,
        validatedInventories: new Map(),
        generatedRelations: unique(candidates.map(candidate => candidate.projection.relationRealization)),
    };
    auditIndex.stemEntries.set(generationKey, entry);
    recordClassicalLessons2425AuditGeneration(auditIndex, "stem", generationKey, auditNow() - started);
    return entry;
}

function isCanonicalIndexedStemCandidate(context, candidate, entry) {
    const structurallySigned = candidate.schematicAuthorized === true
        && candidate.schematicInventory?.derivationOptionInventory === candidate.inventory
        && candidate.schematicInventory?.sourceProjectionFrame === candidate.sourceProjection
        && candidate.schematicInventory?.possibilities?.includes(candidate.projection)
        && candidate.projection?.derivationOptionSignature === candidate.option?.canonicalSignature
        && candidate.projection?.operationFrame === candidate.operation
        && candidate.projection?.typedFrameAuthority === true
        && candidate.projection?.formulaStringAuthority === false
        && candidate.projection?.surfaceStringAuthority === false
        && candidate.projection?.callerSuppliedAuthorityAccepted === false
        && candidate.projection?.catalogTargetAuthority === false;
    if (!structurallySigned) return false;
    if (!entry.validatedInventories.has(candidate.schematicInventory)) {
        entry.validatedInventories.set(candidate.schematicInventory, Boolean(
            typeof context.isClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory === "function"
            && context.isClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(candidate.schematicInventory)
        ));
    }
    return entry.validatedInventories.get(candidate.schematicInventory) === true;
}

function matchIndexedStemEntry(context, example, entry) {
    const owningLayer = "typed-causative-option-plus-canvas-citation-projection";
    const expectedTargetStage = getCanvasCitationStageForStem(example.result, lastParenthesized(example.result));
    const expectedTargetCitations = splitCanvasCitationAlternatives(expectedTargetStage, lastParenthesized(example.result));
    const expectedRelations = expectedTargetCitations.map(target => `${String(example.source || "").trim()} > ${target}`);
    const isCanonicalCandidate = candidate => isCanonicalIndexedStemCandidate(context, candidate, entry);
    const exactMatches = expectedRelations.map(expected => entry.candidates
        .filter(candidate => citationSurfaceKey(candidate.projection.relationRealization) === citationSurfaceKey(expected))
        .find(isCanonicalCandidate) || null);
    const buildGeneratedCoverage = (matches, endpoint = false) => ({
        status: "generated",
        owningLayer,
        exactEvidenceCompared: true,
        ...(endpoint ? {
            exactEndpointEvidenceCompared: true,
            unprintedCanonicalBridgeRetained: true,
            generatedPrintedEndpointRelations: matches.map(match => (
                `${match.projection.sourceCitationRealization} > ${match.projection.citationRealization}`
            )),
            unprintedBridgeStages: matches.map(match => splitCanvasStages(match.projection.sourceHistoryRealization).slice(1)),
        } : {}),
        expectedSource: example.source,
        expectedResult: example.result,
        expectedRelations,
        generatedRelations: matches.map(match => match.projection.relationRealization),
        generatedSourceHistories: matches.map(match => match.projection.sourceHistoryRealization),
        generatedTargetCitations: matches.map(match => match.projection.citationRealization),
        sourceStems: matches.map(match => match.sourceStem),
        targetStems: matches.map(match => match.option.targetStem),
        ruleIds: matches.map(match => match.option.ruleId),
        routes: matches.map(match => match.option.derivationRoute),
        participantProfiles: matches.map(match => match.profile.profileId),
        targetParticipantCounts: matches.map(match => match.projection.participantCount),
        targetParticipantRoles: matches.map(match => match.projection.orderedParticipantRoles),
        indexedSourceProfileSignatures: matches.map(match => match.sourceProfileSignature),
        enumeratedSignedRelationCount: entry.candidates.length,
        enumeratedGeneratedRelations: entry.generatedRelations,
    });
    if (exactMatches.length === expectedRelations.length && exactMatches.every(Boolean)) {
        return buildGeneratedCoverage(exactMatches);
    }
    const printedSourceStages = splitCanvasStages(example.source);
    const endpointMatches = printedSourceStages.length === 1
        ? expectedTargetCitations.map(expectedTarget => entry.candidates
            .filter(candidate => (
                splitCanvasStages(candidate.projection.sourceHistoryRealization).length > 1
                && citationSurfaceKey(candidate.projection.sourceCitationRealization) === citationSurfaceKey(example.source)
                && citationSurfaceKey(candidate.projection.citationRealization) === citationSurfaceKey(expectedTarget)
            ))
            .find(isCanonicalCandidate) || null)
        : [];
    if (endpointMatches.length === expectedTargetCitations.length && endpointMatches.every(Boolean)) {
        return buildGeneratedCoverage(endpointMatches, true);
    }
    const shapeMatches = expectedRelations.map(expected => entry.candidates
        .filter(candidate => citationShapeKey(candidate.projection.relationRealization) === citationShapeKey(expected))
        .find(isCanonicalCandidate) || null);
    return {
        status: shapeMatches.length === expectedRelations.length && shapeMatches.every(Boolean) ? "surface-mismatch" : "missing",
        owningLayer,
        reason: shapeMatches.length === expectedRelations.length && shapeMatches.every(Boolean)
            ? "typed-full-citation-relations-exist-but-do-not-preserve-canvas-quantity"
            : "no-independently-enumerated-canonical-citation-relation-matches-the-full-canvas-source-and-result",
        expectedSource: example.source,
        expectedResult: example.result,
        expectedRelations,
        shapeMatchedRelations: shapeMatches.filter(Boolean).map(match => match.projection.relationRealization),
        generatedRelations: entry.generatedRelations,
        attempts: entry.attempts,
    };
}

function coverStem(context, example, auditIndex = null) {
    if (auditIndex) {
        return matchIndexedStemEntry(context, example, getIndexedStemEntry(context, example, auditIndex));
    }
    const owningLayer = "typed-causative-option-plus-canvas-citation-projection";
    const enumeration = enumerateCanvasStemCitationRelations(context, example, "causative");
    const expectedTargetStage = getCanvasCitationStageForStem(example.result, lastParenthesized(example.result));
    const expectedTargetCitations = splitCanvasCitationAlternatives(expectedTargetStage, lastParenthesized(example.result));
    const expectedRelations = expectedTargetCitations.map(target => `${String(example.source || "").trim()} > ${target}`);
    const generatedCandidates = enumeration.candidates.filter(candidate => candidate.authorized);
    const validatedInventories = new Map();
    const isCanonicalCandidate = candidate => candidate.schematicAuthorized === true
        && candidate.schematicInventory?.derivationOptionInventory === candidate.inventory
        && candidate.schematicInventory?.sourceProjectionFrame === candidate.sourceProjection
        && candidate.schematicInventory?.possibilities?.includes(candidate.projection)
        && candidate.projection?.derivationOptionSignature === candidate.option?.canonicalSignature
        && candidate.projection?.operationFrame === candidate.operation
        && candidate.projection?.typedFrameAuthority === true
        && candidate.projection?.formulaStringAuthority === false
        && candidate.projection?.surfaceStringAuthority === false
        && candidate.projection?.callerSuppliedAuthorityAccepted === false
        && candidate.projection?.catalogTargetAuthority === false
        && (() => {
            if (!validatedInventories.has(candidate.schematicInventory)) {
                validatedInventories.set(candidate.schematicInventory, Boolean(
                    typeof context.isClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory === "function"
                    && context.isClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(candidate.schematicInventory)
                ));
            }
            return validatedInventories.get(candidate.schematicInventory) === true;
        })();
    // The complete possibility set is generated before the printed target is
    // compared. Canonical reconstruction is intentionally paid only for a
    // generated relation that actually matches the Canvas evidence.
    const exactMatches = expectedRelations.map(expected => generatedCandidates
        .filter(candidate => citationSurfaceKey(candidate.projection.relationRealization) === citationSurfaceKey(expected))
        .find(isCanonicalCandidate) || null);
    if (exactMatches.length === expectedRelations.length && exactMatches.every(Boolean)) {
        return {
            status: "generated",
            owningLayer,
            exactEvidenceCompared: true,
            expectedSource: example.source,
            expectedResult: example.result,
            expectedRelations,
            generatedRelations: exactMatches.map(match => match.projection.relationRealization),
            generatedSourceHistories: exactMatches.map(match => match.projection.sourceHistoryRealization),
            generatedTargetCitations: exactMatches.map(match => match.projection.citationRealization),
            sourceStems: exactMatches.map(match => match.sourceStem),
            targetStems: exactMatches.map(match => match.option.targetStem),
            ruleIds: exactMatches.map(match => match.option.ruleId),
            routes: exactMatches.map(match => match.option.derivationRoute),
            participantProfiles: exactMatches.map(match => match.profile.profileId),
            targetParticipantCounts: exactMatches.map(match => match.projection.participantCount),
            targetParticipantRoles: exactMatches.map(match => match.projection.orderedParticipantRoles),
            enumeratedSignedRelationCount: generatedCandidates.length,
            enumeratedGeneratedRelations: unique(generatedCandidates.map(candidate => candidate.projection.relationRealization)),
        };
    }
    const printedSourceStages = splitCanvasStages(example.source);
    const endpointMatches = printedSourceStages.length === 1
        ? expectedTargetCitations.map(expectedTarget => generatedCandidates
            .filter(candidate => (
                splitCanvasStages(candidate.projection.sourceHistoryRealization).length > 1
                && citationSurfaceKey(candidate.projection.sourceCitationRealization) === citationSurfaceKey(example.source)
                && citationSurfaceKey(candidate.projection.citationRealization) === citationSurfaceKey(expectedTarget)
            ))
            .find(isCanonicalCandidate) || null)
        : [];
    if (endpointMatches.length === expectedTargetCitations.length && endpointMatches.every(Boolean)) {
        return {
            status: "generated",
            owningLayer,
            exactEvidenceCompared: true,
            exactEndpointEvidenceCompared: true,
            unprintedCanonicalBridgeRetained: true,
            expectedSource: example.source,
            expectedResult: example.result,
            expectedRelations,
            generatedRelations: endpointMatches.map(match => match.projection.relationRealization),
            generatedPrintedEndpointRelations: endpointMatches.map(match => (
                `${match.projection.sourceCitationRealization} > ${match.projection.citationRealization}`
            )),
            generatedSourceHistories: endpointMatches.map(match => match.projection.sourceHistoryRealization),
            unprintedBridgeStages: endpointMatches.map(match => splitCanvasStages(match.projection.sourceHistoryRealization).slice(1)),
            generatedTargetCitations: endpointMatches.map(match => match.projection.citationRealization),
            sourceStems: endpointMatches.map(match => match.sourceStem),
            targetStems: endpointMatches.map(match => match.option.targetStem),
            ruleIds: endpointMatches.map(match => match.option.ruleId),
            routes: endpointMatches.map(match => match.option.derivationRoute),
            participantProfiles: endpointMatches.map(match => match.profile.profileId),
            targetParticipantCounts: endpointMatches.map(match => match.projection.participantCount),
            targetParticipantRoles: endpointMatches.map(match => match.projection.orderedParticipantRoles),
            enumeratedSignedRelationCount: generatedCandidates.length,
            enumeratedGeneratedRelations: unique(generatedCandidates.map(candidate => candidate.projection.relationRealization)),
        };
    }
    const shapeMatches = expectedRelations.map(expected => generatedCandidates
        .filter(candidate => citationShapeKey(candidate.projection.relationRealization) === citationShapeKey(expected))
        .find(isCanonicalCandidate) || null);
    return {
        status: shapeMatches.length === expectedRelations.length && shapeMatches.every(Boolean) ? "surface-mismatch" : "missing",
        owningLayer,
        reason: shapeMatches.length === expectedRelations.length && shapeMatches.every(Boolean)
            ? "typed-full-citation-relations-exist-but-do-not-preserve-canvas-quantity"
            : "no-independently-enumerated-canonical-citation-relation-matches-the-full-canvas-source-and-result",
        expectedSource: example.source,
        expectedResult: example.result,
        expectedRelations,
        shapeMatchedRelations: shapeMatches.filter(Boolean).map(match => match.projection.relationRealization),
        generatedRelations: unique(generatedCandidates.map(candidate => candidate.projection.relationRealization)),
        attempts: enumeration.attempts,
    };
}

function coverSourceRequired(context, example) {
    if (String(example.source || "").trim()) {
        return {
            status: "missing",
            owningLayer: "typed-causative-source-admission",
            reason: "only-a-truly-source-less-canvas-row-may-use-source-required-status",
        };
    }
    const source = buildSource(context, "", "B", "intransitive");
    const inventory = context.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "causative" });
    const correctlyRejected = source.authorizationStatus === "blocked"
        && inventory.authorizationStatus === "blocked"
        && (inventory.options || []).length === 0;
    return correctlyRejected ? {
        status: "source-required",
        owningLayer: "typed-causative-source-admission",
        reason: "andrews-prints-a-result-only-dictionary-form; a typed source-is-required-before-generation",
        printedResult: example.result,
        sourceBlockReason: source.blockReason,
        inventoryBlockReason: inventory.blockReason,
    } : {
        status: "missing",
        owningLayer: "typed-causative-source-admission",
        reason: "empty-source-was-not-fail-closed",
    };
}

function coverNegative(context, example) {
    const sourceStem = lastParenthesized(example.source);
    const negativeSpec = {
        "pil-i-hui": { forbiddenStem: "pil-o-ā", expectedResult: "no o-ā causative" },
        "ihc-i-hui": { forbiddenStem: "ihz-o-ā", expectedResult: "*tē- ~ tla-(ihz-o-ā) does not exist" },
    }[sourceStem] || null;
    if (!negativeSpec) return {
        status: "missing",
        owningLayer: "typed-causative-negative-option-inventory",
        reason: "negative-row-has-no-source-keyed-typed-constraint-spec",
    };
    const forbiddenStem = negativeSpec.forbiddenStem;
    const forbiddenShape = shapeKey(forbiddenStem);
    const inventories = sourceProfiles(sourceStem, example).map(({ verbClass, sourceValence }) => {
        const { source, inventory } = getInventory(context, sourceStem, verbClass, sourceValence, "causative");
        const projection = context.buildClassicalNahuatlLessons2425CanvasCitationProjectionFrame(source);
        return { verbClass, sourceValence, source, inventory, projection };
    });
    const authorized = inventories.filter(item => context.isClassicalNahuatlVncDerivationOptionInventory(item.inventory)
        && context.isClassicalNahuatlLessons2425CanvasCitationProjectionFrame(item.projection));
    const forbidden = authorized.flatMap(item => item.inventory.options || [])
        .filter(option => shapeKey(option.targetStem) === forbiddenShape);
    const sourceExact = authorized.some(item => citationSurfaceKey(item.projection.citationRealization) === citationSurfaceKey(example.source));
    const resultOracleExact = citationSurfaceKey(example.result) === citationSurfaceKey(negativeSpec.expectedResult);
    return authorized.length && sourceExact && resultOracleExact && !forbidden.length ? {
        status: "negative-verified",
        owningLayer: "typed-causative-negative-option-inventory",
        negativeConstraintVerified: true,
        ruleId: "cn-l24-247-note2-no-o-a-causative",
        route: "forbidden-route-absent-from-canonical-options",
        expectedSource: example.source,
        generatedSources: unique(authorized.map(item => item.projection.citationRealization)),
        expectedResult: example.result,
        forbiddenStem,
        availableTargets: unique(authorized.flatMap(item => item.inventory.options.map(option => option.targetStem))),
    } : {
        status: "missing",
        owningLayer: "typed-causative-negative-option-inventory",
        reason: forbidden.length ? "forbidden-o-a-route-was-generated"
            : !sourceExact ? "typed-negative-source-citation-does-not-match-canvas"
                : !resultOracleExact ? "printed-negative-result-does-not-match-the-source-keyed-constraint"
                    : "no-canonical-source-inventory-proved-the-negative",
        forbiddenTargets: forbidden.map(option => option.targetStem),
    };
}

function coverPerfective(context, example) {
    const sourceStem = lastParenthesized(example.source);
    const expectedResults = splitCanvasCitationAlternatives(example.result, lastParenthesized(example.result));
    const runtimeCache = getRuntimeCache(PERFECTIVE_CANDIDATE_CACHE, context);
    const candidateCacheKey = JSON.stringify([sourceStem, example.source]);
    let candidates = runtimeCache.get(candidateCacheKey);
    if (!candidates) {
        const sourceObjectRequests = getCanvasCitationObjectRequests(example.source, sourceStem);
        const firstObjectKind = sourceObjectRequests[0]?.objectKind || "";
        const sourceValence = firstObjectKind === "reflexive" ? "mainline-reflexive"
            : firstObjectKind === "nonspecific-human" ? "projective-human"
                : firstObjectKind === "nonspecific-nonhuman" ? "projective-nonhuman"
                    : "intransitive";
        candidates = [];
        for (const verbClass of ["A", "B", "C", "D"]) {
            const sourceMachinery = buildSource(context, sourceStem, verbClass, sourceValence, { tense: "present" });
            const perfectiveMachinery = buildSource(context, sourceStem, verbClass, sourceValence, { tense: "preterit" });
            const sourceProjection = context.buildClassicalNahuatlLessons2425CanvasCitationProjectionFrame(sourceMachinery);
            const perfectiveProjection = context.buildClassicalNahuatlLessons2425CanvasCitationProjectionFrame(perfectiveMachinery);
            const canonical = sourceMachinery.authorizationStatus === "authorized"
                && perfectiveMachinery.authorizationStatus === "authorized"
                && context.isClassicalNahuatlVncDerivationSourceMachineryFrame(sourceMachinery)
                && context.isClassicalNahuatlVncDerivationSourceMachineryFrame(perfectiveMachinery)
                && context.isClassicalNahuatlLessons2425CanvasCitationProjectionFrame(sourceProjection)
                && context.isClassicalNahuatlLessons2425CanvasCitationProjectionFrame(perfectiveProjection);
            if (!canonical) continue;
            candidates.push({
                verbClass,
                sourceValence,
                sourceMachinery,
                perfectiveMachinery,
                perfectiveStem: perfectiveMachinery.perfectiveStem,
                sourceCitation: sourceProjection.citationRealization,
                resultCitation: perfectiveProjection.citationRealization,
                changeRule: perfectiveMachinery.classRuleFrame?.classGuidelineRuleId || perfectiveMachinery.classRuleFrame?.classActions?.join("+") || "typed-lesson7-class-relation",
            });
        }
        setBoundedRuntimeCache(runtimeCache, candidateCacheKey, candidates, 8);
    }
    const exactMatches = expectedResults.map(expected => candidates.find(candidate => (
        citationSurfaceKey(candidate.sourceCitation) === citationSurfaceKey(example.source)
        && citationSurfaceKey(candidate.resultCitation) === citationSurfaceKey(expected)
    )) || null);
    if (exactMatches.length === expectedResults.length && exactMatches.every(Boolean)) {
        return {
            status: "generated",
            owningLayer: "lesson7-perfective-class-machinery",
            exactEvidenceCompared: true,
            expectedSource: example.source,
            generatedSources: exactMatches.map(match => match.sourceCitation),
            expectedResults,
            generatedResults: exactMatches.map(match => match.resultCitation),
            routes: exactMatches.map(candidate => ({
                verbClass: candidate.verbClass,
                sourceValence: candidate.sourceValence,
                targetStem: candidate.perfectiveStem,
                ruleId: candidate.changeRule,
            })),
        };
    }
    const shapeMatches = expectedResults.map(expected => candidates.find(candidate => (
        citationShapeKey(candidate.sourceCitation) === citationShapeKey(example.source)
        && citationShapeKey(candidate.resultCitation) === citationShapeKey(expected)
    )) || null);
    return {
        status: shapeMatches.length === expectedResults.length && shapeMatches.every(Boolean) ? "surface-mismatch" : "missing",
        owningLayer: "lesson7-perfective-class-machinery",
        reason: shapeMatches.length === expectedResults.length && shapeMatches.every(Boolean)
            ? "perfective-citation-shapes-exist-but-printed-quantity-or-boundaries-do-not"
            : "one-or-more-full-source-and-perfective-citation-relations-have-no-typed-class-route",
        expectedSource: example.source,
        expectedResults,
        generatedSources: unique(candidates.map(candidate => candidate.sourceCitation)),
        generatedResults: unique(candidates.map(candidate => candidate.resultCitation)),
    };
}

function coverValence(context, example) {
    const stem = lastParenthesized(example.source);
    const sourceFrame = buildSource(context, stem, "A", "intransitive");
    const sourceProjection = context.buildClassicalNahuatlLessons2425CanvasCitationProjectionFrame(sourceFrame);
    const sourceCanonical = context.isClassicalNahuatlVncDerivationSourceMachineryFrame(sourceFrame)
        && context.isClassicalNahuatlLessons2425CanvasCitationProjectionFrame(sourceProjection);
    const generated = [
        ["tē", "projective-human"],
        ["tla", "projective-nonhuman"],
    ].map(([marker, sourceValence]) => {
        const frame = buildSource(context, stem, "A", sourceValence);
        const projection = context.buildClassicalNahuatlLessons2425CanvasCitationProjectionFrame(frame);
        return {
            marker,
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            citation: projection.citationRealization,
            canonical: context.isClassicalNahuatlVncDerivationSourceMachineryFrame(frame)
                && context.isClassicalNahuatlLessons2425CanvasCitationProjectionFrame(projection),
        };
    });
    const expectedResults = splitCanvasCitationAlternatives(example.result, lastParenthesized(example.result));
    const exactMatches = expectedResults.map(expected => generated.find(candidate => candidate.canonical
        && citationSurfaceKey(candidate.citation) === citationSurfaceKey(expected)) || null);
    const sourceExact = sourceCanonical
        && citationSurfaceKey(sourceProjection.citationRealization) === citationSurfaceKey(example.source);
    if (sourceExact && exactMatches.length === expectedResults.length && exactMatches.every(Boolean)) return {
        status: "generated",
        owningLayer: "lesson7-typed-valence-and-object-marker",
        exactEvidenceCompared: true,
        expectedSource: example.source,
        generatedSource: sourceProjection.citationRealization,
        expectedResults,
        generatedResults: exactMatches.map(match => match.citation),
        markers: exactMatches.map(match => match.marker),
        formulas: exactMatches.map(match => match.formula),
    };
    const shapeMatches = expectedResults.map(expected => generated.find(candidate => candidate.canonical
        && citationShapeKey(candidate.citation) === citationShapeKey(expected)) || null);
    const sameShape = sourceCanonical
        && citationShapeKey(sourceProjection.citationRealization) === citationShapeKey(example.source)
        && shapeMatches.length === expectedResults.length
        && shapeMatches.every(Boolean);
    return {
        status: sameShape ? "surface-mismatch" : "missing",
        owningLayer: "lesson7-typed-valence-and-object-marker",
        reason: sameShape
            ? "typed-valence-citations-exist-but-do-not-preserve-printed-quantity-or-boundaries"
            : "independently-enumerated-typed-valence-citations-do-not-match-full-source-and-result",
        expectedSource: example.source,
        generatedSource: sourceProjection?.citationRealization || "",
        expectedResults,
        generatedResults: generated.filter(candidate => candidate.canonical).map(candidate => candidate.citation),
    };
}

function coverNonactive(context, example) {
    const sourceKey = wordShapeKey(example.source);
    const sourceValence = sourceKey.includes("quiteci") ? "specific-projective" : "intransitive";
    const source = buildSource(context, "teci", "B", sourceValence, {
        subject: "3pl",
        objectPerson: sourceValence === "specific-projective" ? "3sg" : "",
    });
    const generatedSource = realizeTypedVncWord(context, source);
    const expected = example.result.split("~").map(value => value.trim()).filter(Boolean);
    const inventory = context.getClassicalNahuatlLesson20NonactiveStemOptions("teci", {
        verbClass: "B",
        sourceValence,
    });
    const projections = (inventory.options || []).map(option => context.buildClassicalNahuatlLesson242NonactiveSurfaceFrame("teci", {
        verbClass: "B",
        sourceValence,
        optionId: option.optionId,
    }));
    const canonical = projections.every(frame => context.isClassicalNahuatlLesson242NonactiveSurfaceFrame(frame, "teci"));
    const generatedTargets = projections.map(frame => frame.printedSurfaceWord).filter(Boolean);
    const sourceExact = surfaceKey(generatedSource) === surfaceKey(example.source);
    const targetsExact = expected.length === generatedTargets.length
        && expected.every(target => generatedTargets.some(word => surfaceKey(word) === surfaceKey(target)));
    if (canonical && sourceExact && targetsExact) return {
        status: "generated",
        owningLayer: "lesson24.2-typed-nonactive-printed-surface-finalizer",
        exactEvidenceCompared: true,
        expectedSource: example.source,
        generatedSource,
        expectedResults: expected,
        generatedResults: generatedTargets,
        lowerCanonicalStems: projections.map(frame => frame.canonicalNonactiveStem),
    };
    const sameShape = shapeKey(generatedSource) === shapeKey(example.source)
        && expected.length === generatedTargets.length
        && expected.every(target => generatedTargets.some(word => shapeKey(word) === shapeKey(target)));
    return {
        status: sameShape ? "surface-mismatch" : "missing",
        owningLayer: "lesson24.2-typed-nonactive-printed-surface-finalizer",
        reason: !canonical ? "canonical-lesson24.2-nonactive-surface-projection-failed"
            : sameShape ? "typed-nonactive-source-or-result-does-not-preserve-printed-quantity"
                : "typed-nonactive-source-or-result-does-not-match-canvas",
        expectedSource: example.source,
        generatedSource,
        expectedResults: expected,
        generatedResults: generatedTargets,
    };
}

function enumerateLesson253ContextReadings(context) {
    const adjunct = context.buildClassicalNahuatlLesson12AbsolutiveNncFrame("cuīca", {
        subject: "3sg",
        nounClass: "tl",
        animacy: "nonanimate",
    });
    return [{
        profileId: "lesson25.3-reflexive-transitive-mati-1pl-present-cuicatl",
        subject: "1pl",
        tense: "present",
        reading: "reflexive",
    }, {
        profileId: "lesson25.3-reflexive-transitive-mati-3pl-future-cuicatl",
        subject: "3pl",
        tense: "future",
        reading: "reciprocative",
    }].map(profile => {
        const source = buildSource(context, "mati", "B", "specific-projective", {
            subject: profile.subject,
            objectPerson: "3sg",
            tense: profile.tense,
        });
        const derivation = deriveCausativeMachinery(
            context,
            source,
            "mach-tiā",
            profile.subject,
            profile.tense,
            "coreferential"
        );
        const frame = context.buildClassicalNahuatlLesson253SupplementationFrame(derivation.machinery, adjunct, {
            profileId: profile.profileId,
            principalObjectId: "source-object-1",
            principalReferenceId: "referent:cuicatl",
            adjunctReferenceId: "referent:cuicatl",
            causativeObjectReading: profile.reading,
        });
        return {
            ...profile,
            source,
            derivation,
            frame,
            canonical: context.isClassicalNahuatlDerivedVncMachineryFrame(derivation.machinery)
                && context.isClassicalNahuatlLesson253SupplementationFrame(frame),
            sourceReading: frame?.principalStemReadingFrame?.canonicalSourceReading || "",
            resultSentence: frame?.surfaceRealization || "",
        };
    });
}

function coverVncReading(context, example) {
    if (/[.!?]/u.test(example.result)) {
        const candidates = enumerateLesson253ContextReadings(context);
        const exact = candidates.find(candidate => candidate.canonical
            && citationSurfaceKey(candidate.sourceReading) === citationSurfaceKey(example.source)
            && sentenceSurfaceKey(candidate.resultSentence) === sentenceSurfaceKey(example.result)) || null;
        if (exact) return {
            status: "generated",
            owningLayer: "lesson25.3-reflexive-context-supplement-finalizer",
            exactEvidenceCompared: true,
            expectedSource: example.source,
            generatedSource: exact.sourceReading,
            expectedResult: example.result,
            generatedResult: exact.resultSentence,
            profileId: exact.profileId,
            reading: exact.reading,
            enumeratedResults: candidates.filter(candidate => candidate.canonical).map(candidate => candidate.resultSentence),
        };
        const shapeMatch = candidates.find(candidate => candidate.canonical
            && citationShapeKey(candidate.sourceReading) === citationShapeKey(example.source)
            && sentenceShapeKey(candidate.resultSentence) === sentenceShapeKey(example.result)) || null;
        return {
            status: shapeMatch ? "surface-mismatch" : "missing",
            owningLayer: "lesson25.3-reflexive-context-supplement-finalizer",
            reason: shapeMatch
                ? "typed-context-reading-exists-but-does-not-preserve-the-printed-quantity-or-boundaries"
                : "no-independently-enumerated-typed-context-reading-matches-the-full-source-and-result",
            expectedSource: example.source,
            expectedResult: example.result,
            generatedSources: unique(candidates.filter(candidate => candidate.canonical).map(candidate => candidate.sourceReading)),
            generatedResults: unique(candidates.filter(candidate => candidate.canonical).map(candidate => candidate.resultSentence)),
        };
    }
    const stem = lastParenthesized(example.source);
    const retainedObject = /\+tla-/u.test(example.source);
    const before = retainedObject
        ? buildMultipleObjectSource(context, stem, "C", ["nonspecific-human", "nonspecific-nonhuman"], "3sg")
        : buildSource(context, stem, "C", "projective-human");
    const after = retainedObject
        ? buildMultipleObjectSource(context, stem, "C", ["reflexive", "nonspecific-nonhuman"], "3sg")
        : buildSource(context, stem, "C", "mainline-reflexive");
    const canonical = [before, after].every(frame => frame?.authorizationStatus === "authorized"
        && context.isClassicalNahuatlVncDerivationSourceMachineryFrame(frame));
    const owningLayer = retainedObject ? "lesson23-multiple-object-reading" : "lesson7-reflexive-object-reading";
    if (!canonical) return {
        status: "missing",
        owningLayer,
        reason: "typed-reflexive-reading-frames-were-not-both-canonical",
        statuses: [before?.authorizationStatus, after?.authorizationStatus],
    };
    const sourceReading = realizeTypedVncMorphology(before);
    const resultReading = realizeTypedVncMorphology(after);
    const sourceProjection = context.buildClassicalNahuatlLessons2425CanvasCitationProjectionFrame(before);
    const resultProjection = context.buildClassicalNahuatlLessons2425CanvasCitationProjectionFrame(after);
    const projectionsCanonical = context.isClassicalNahuatlLessons2425CanvasCitationProjectionFrame(sourceProjection)
        && context.isClassicalNahuatlLessons2425CanvasCitationProjectionFrame(resultProjection);
    const generatedSource = sourceProjection?.citationRealization || sourceReading;
    const generatedResult = resultProjection?.citationRealization || resultReading;
    const sourceExact = projectionsCanonical
        && citationSurfaceKey(generatedSource) === citationSurfaceKey(example.source);
    const resultExact = projectionsCanonical
        && citationSurfaceKey(generatedResult) === citationSurfaceKey(example.result);
    if (sourceExact && resultExact) {
        return {
            status: "generated",
            owningLayer,
            exactEvidenceCompared: true,
            expectedSource: example.source,
            generatedSource,
            expectedResult: example.result,
            generatedResult,
            formulas: [before.formulaRealization, after.formulaRealization],
        };
    }
    const sameShape = projectionsCanonical
        && citationShapeKey(generatedSource) === citationShapeKey(example.source)
        && citationShapeKey(generatedResult) === citationShapeKey(example.result);
    return {
        status: sameShape ? "surface-mismatch" : "missing",
        owningLayer,
        reason: sameShape
            ? "typed-reading-exists-but-does-not-preserve-the-printed-quantity-or-boundaries"
            : "typed-reading-does-not-match-the-printed-source-or-result",
        expectedSource: example.source,
        generatedSource,
        expectedResult: example.result,
        generatedResult,
        formulas: [before.formulaRealization, after.formulaRealization],
    };
}

function buildMultipleObjectSource(context, stem, verbClass, objectKinds, subject = "1sg", specificObjectPerson = "3sg") {
    const descriptors = (objectKinds || []).map((request, index) => typeof request === "string"
        ? { objectKind: request, objectPerson: request === "specific-projective" ? specificObjectPerson : "", governor: index ? "causative" : "directive" }
        : {
            objectKind: request?.objectKind || "specific-projective",
            objectPerson: request?.objectKind === "specific-projective" ? request?.objectPerson || specificObjectPerson : request?.objectPerson || "",
            governor: request?.governor || (index ? "causative" : "directive"),
        });
    const firstKind = descriptors[0]?.objectKind || "specific-projective";
    const sourceValence = firstKind === "reflexive" ? "mainline-reflexive"
        : firstKind === "nonspecific-human" ? "projective-human"
            : firstKind === "nonspecific-nonhuman" ? "projective-nonhuman"
                : "specific-projective";
    const lower = buildSource(context, stem, verbClass, sourceValence, {
        subject,
        objectPerson: descriptors[0]?.objectPerson || specificObjectPerson,
    });
    return context.buildClassicalNahuatlLesson23MultipleObjectVncFrame(lower, {
        objectRequests: descriptors.map((request, index) => ({
            objectId: `source-object-${index + 1}`,
            objectKind: request.objectKind,
            objectPerson: request.objectKind === "specific-projective" ? request.objectPerson : request.objectPerson || "",
            governor: request.governor,
            derivationalLevel: index + 1,
        })),
    });
}

const VNC_FAMILY_SPECS = Object.freeze([
    ["caquitilo", "caquī-tiā", "caqui-ti-l-tiā", "C"],
    ["caquitia", "caquī-tiā", "caqui-ti-l-tiā", "C"],
    ["tomohua", "tomi", "tom-a", "B"],
    ["tomi", "tomi", "tom-a", "B"],
    ["cocoya", "coco-ya", "coco-ā", "B"],
    ["nehua", "ē-hua", "ē-hu-a", "A"],
    ["quixohua", "quīza", "quīx-tiā", "B"],
    ["quiza", "quīza", "quīx-tiā", "B"],
    ["iucci", "iuc-ci", "iuc-xi-tiā", "A"],
    ["mahui", "mahui", "mauh-tiā", "B"],
    ["ihza", "ihza", "ihxi-tiā", "A"],
    ["chihua", "chīhua", "chīhua-l-tiā", "A"],
    ["notza", "nōtza", "nōtza-l-tiā", "A"],
    ["tlazohtla", "tlazohtla", "tlazohtla-l-tia", "A"],
    ["petlahua", "petlāhua", "petlāhua-l-tiā", "A"],
    ["itta", "itta", "itt-ī-tiā", "A"],
    ["nequi", "nequi", "nec-tia", "B"],
    ["cahua", "cāhua", "cāhua-l-tiā", "A"],
    ["piya", "piya", "piya-l-tiā", "B"],
]);

const VNC_SOURCE_NONACTIVE_STEMS = Object.freeze({
    tomi: "tom-o-hua",
    "quīza": "quīx-o-hua",
    "chīhua": "chīhua-lō",
    "nōtza": "nōtza-lō",
    tlazohtla: "tlazohtla-lō",
    piya: "piya-lō",
    "caquī-tiā": "caquī-ti-lō",
});

function inferCanvasVncSubject(surface = "") {
    const key = wordShapeKey(surface);
    if (key === "nehua") return "1sg";
    const plural = /h$/u.test(key);
    if (/^ni/u.test(key)) return "1sg";
    if (/^an/u.test(key)) return "2pl";
    if (/^ti/u.test(key)) return plural ? "1pl" : "2sg";
    return plural ? "3pl" : "3sg";
}

function inferCanvasVncSpecificObjectPerson(surface = "") {
    const key = wordShapeKey(surface);
    if (/^(?:ni|ti|an)?nech/u.test(key)) return "1sg";
    if (/^(?:ni|ti|an)?tech/u.test(key)) return "1pl";
    if (/^(?:ni|ti|an)?mitz/u.test(key)) return "2sg";
    if (/^(?:ni|ti|an)?mech/u.test(key)) return "2pl";
    if (/^(?:ni|ti|an)?quin/u.test(key)) return "3pl";
    if (/^(?:ni|ti|an)?(?:c|qui)/u.test(key)) return "3sg";
    return "3sg";
}

function getVncSpec(example) {
    const sourceKey = wordShapeKey(example.source);
    const family = VNC_FAMILY_SPECS.find(([key]) => sourceKey.includes(key));
    if (!family) return null;
    const [, sourceStem, familyTargetStem, familyVerbClass] = family;
    const verbClass = sourceKey.includes("moitta") ? "A" : familyVerbClass;
    const targetStem = sourceKey.includes("moitta") ? "itt-ī-tia" : familyTargetStem;
    let sourceObjectCount = example.lesson === 24 || example.section === "25.10" ? 0
        : example.section.startsWith("25.11") ? 1
            : example.section.startsWith("25.12") ? 2 : 0;
    if (sourceKey.includes("nicnotza")) sourceObjectCount = 1;
    if (/^(?:ni)?caquitilo$/u.test(sourceKey)) sourceObjectCount = 1;
    const sourceSpecificObjectPerson = inferCanvasVncSpecificObjectPerson(example.source);
    let sourceObjectKinds = [];
    if (sourceObjectCount === 1) {
        const sourceObjectKind = /^(?:ni|ti|an)?(?:mo|no)/u.test(sourceKey) || /^ne(?:tlazohtla)/u.test(sourceKey)
            ? "reflexive"
            : /^(?:ni|ti|an)?tla/u.test(sourceKey) ? "nonspecific-nonhuman"
                : /^(?:ni|ti|an)?te/u.test(sourceKey) ? "nonspecific-human"
                    : "specific-projective";
        sourceObjectKinds = [sourceObjectKind];
    } else if (sourceObjectCount === 2) {
        if (/^(?:ni|ti|an)?(?:mitz|quin|c|qui)[^a-z]*(?:caquitia)/u.test(sourceKey)
            && !/(?:tlacaquitia|tecaquitia)/u.test(sourceKey)) {
            sourceObjectKinds = [
                { objectKind: "specific-projective", objectPerson: "3sg" },
                { objectKind: "specific-projective", objectPerson: sourceSpecificObjectPerson },
            ];
        } else if (/mocaquitia/u.test(sourceKey)) {
            sourceObjectKinds = [
                { objectKind: "specific-projective", objectPerson: sourceSpecificObjectPerson },
                { objectKind: "reflexive", objectPerson: inferCanvasVncSubject(example.source) },
            ];
        } else if (/^(?:ni|ti|an)?tetlacaquitia/u.test(sourceKey)) {
            sourceObjectKinds = ["nonspecific-human", "nonspecific-nonhuman"];
        } else if (/^(?:ni|ti|an)?caquitilo/u.test(sourceKey)) {
            sourceObjectKinds = [
                { objectKind: "specific-projective", objectPerson: sourceSpecificObjectPerson },
                "nonspecific-human",
            ];
        } else {
            sourceObjectKinds = [
                { objectKind: "specific-projective", objectPerson: sourceSpecificObjectPerson },
                /tecaquitia/u.test(sourceKey) ? "nonspecific-human" : "nonspecific-nonhuman",
            ];
        }
    }
    const normalizedName = normalizeText(example.name);
    const sourceVoice = /passive/u.test(normalizedName) ? "passive"
        : /impersonal/u.test(normalizedName) || /ohua/u.test(sourceKey) ? "impersonal" : "active";
    if (sourceVoice === "passive" && sourceObjectKinds.length) {
        sourceObjectKinds[0] = "specific-projective";
    } else if (sourceVoice === "impersonal" && sourceObjectCount > 1
        && /tē/u.test(example.source) && /tla/u.test(sourceKey)) {
        sourceObjectKinds = ["nonspecific-human", "nonspecific-nonhuman"];
    }
    return {
        sourceStem,
        targetStem,
        verbClass,
        sourceObjectCount,
        sourceObjectKinds,
        sourceVoice,
        sourceNonactiveStem: sourceVoice === "active" ? "" : VNC_SOURCE_NONACTIVE_STEMS[sourceStem] || "",
        sourceSubject: inferCanvasVncSubject(example.source),
        sourceSpecificObjectPerson,
    };
}

function getClassicalLessons2425VncSourceProfile(spec = {}) {
    if (!spec || typeof spec !== "object") return null;
    return {
        sourceStem: String(spec.sourceStem || ""),
        verbClass: String(spec.verbClass || ""),
        sourceObjectCount: Number(spec.sourceObjectCount || 0),
        sourceObjectKinds: (spec.sourceObjectKinds || []).map(request => typeof request === "string"
            ? request
            : {
                objectKind: String(request?.objectKind || ""),
                objectPerson: String(request?.objectPerson || ""),
            }),
        sourceVoice: String(spec.sourceVoice || "active"),
        sourceNonactiveStem: String(spec.sourceNonactiveStem || ""),
        sourceSubject: String(spec.sourceSubject || "3sg"),
        sourceSpecificObjectPerson: String(spec.sourceSpecificObjectPerson || ""),
    };
}

function getClassicalLessons2425VncGenerationSourceProfile(example = {}) {
    const spec = getVncSpec(example);
    return spec ? getClassicalLessons2425VncSourceProfile(spec) : null;
}

function buildTypedVncSource(context, spec) {
    const firstSourceObjectKind = typeof spec.sourceObjectKinds[0] === "string"
        ? spec.sourceObjectKinds[0]
        : spec.sourceObjectKinds[0]?.objectKind || "";
    const sourceValence = spec.sourceObjectCount > 1 ? "multiple-object"
        : !spec.sourceObjectCount ? "intransitive"
            : firstSourceObjectKind === "reflexive" ? "mainline-reflexive"
                : firstSourceObjectKind === "nonspecific-human" ? "projective-human"
                    : firstSourceObjectKind === "nonspecific-nonhuman" ? "projective-nonhuman"
                        : "specific-projective";
    const activeSubject = spec.sourceVoice === "active" ? spec.sourceSubject : "3sg";
    const specificObjectPerson = spec.sourceVoice === "passive"
        ? spec.sourceSubject
        : spec.sourceSpecificObjectPerson || "3sg";
    let source = spec.sourceObjectCount > 1
        ? buildMultipleObjectSource(context, spec.sourceStem, spec.verbClass, spec.sourceObjectKinds, activeSubject, specificObjectPerson)
        : buildSource(context, spec.sourceStem, spec.verbClass, sourceValence,
            { subject: activeSubject, objectPerson: specificObjectPerson });
    if (spec.sourceVoice === "active") return source;
    const nonactive = context.getClassicalNahuatlLesson20NonactiveStemOptions(spec.sourceStem, {
        verbClass: spec.verbClass,
        sourceValence,
    });
    const option = spec.sourceNonactiveStem
        ? (nonactive.options || []).find(candidate => surfaceKey(candidate.nonactiveStem) === surfaceKey(spec.sourceNonactiveStem))
            || (nonactive.options || []).find(candidate => shapeKey(candidate.nonactiveStem) === shapeKey(spec.sourceNonactiveStem))
        : (nonactive.options || [])[0];
    if (!option) return null;
    const record = context.deriveClassicalNahuatlLesson20NonactiveStemRecord(spec.sourceStem, {
        verbClass: spec.verbClass,
        sourceValence,
        optionId: option.optionId,
    });
    source = context.buildClassicalNahuatlLessons20To22DerivedVncFrame(source, {
        voice: spec.sourceVoice,
        nonactiveStemRecord: record,
        sourceObjectClusterFrame: spec.sourceObjectCount > 1 ? source.multipleObjectClusterFrame : undefined,
        sourceValence,
        sourceSubject: activeSubject,
        sourceObjectPerson: spec.sourceVoice === "passive" ? specificObjectPerson : "",
        mood: "indicative",
        tense: "present",
        verbClass: spec.verbClass,
    });
    return source;
}

function getVncSourceBundle(context, spec) {
    const runtimeCache = getRuntimeCache(VNC_SOURCE_BUNDLE_CACHE, context);
    const baseSpec = getClassicalLessons2425VncSourceProfile(spec);
    const cacheKey = JSON.stringify(baseSpec);
    if (runtimeCache.has(cacheKey)) return runtimeCache.get(cacheKey);
    const source = buildTypedVncSource(context, baseSpec);
    const sourceCanonical = Boolean(source && context.isClassicalNahuatlVncDerivationSourceMachineryFrame(source));
    const inventory = sourceCanonical
        ? context.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "causative" })
        : null;
    const sourceSurface = sourceCanonical ? buildCanvasFiniteVncSurface(context, source) : null;
    const bundle = { baseSpec, source, sourceCanonical, sourceSurface, inventory };
    return setBoundedRuntimeCache(runtimeCache, cacheKey, bundle, 8);
}

function executeVncSpec(context, spec) {
    const { source, sourceCanonical, sourceSurface, inventory } = getVncSourceBundle(context, spec);
    if (!sourceCanonical) {
        return { status: "missing", reason: "typed-source-or-source-voice-was-not-canonical", spec };
    }
    const option = spec.derivationOptionId
        ? (inventory?.options || []).find(candidate => candidate.optionId === spec.derivationOptionId)
        : (inventory?.options || []).find(candidate => surfaceKey(candidate.targetStem) === surfaceKey(spec.targetStem));
    const shapeOption = option || (!spec.derivationOptionId
        ? (inventory?.options || []).find(candidate => shapeKey(candidate.targetStem) === shapeKey(spec.targetStem))
        : null);
    if (!shapeOption) {
        return {
            status: "missing",
            reason: "participant-source-had-no-matching-causative-stem",
            spec,
            availableTargets: (inventory.options || []).map(candidate => candidate.targetStem),
        };
    }
    const operation = context.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: shapeOption.optionId,
        targetSubject: spec.targetSubject,
        causativeObjectKind: spec.causativeObjectKind || "",
        causativeReferentRelation: spec.causativeReferentRelation || "",
        causativeSpecificShuntlineRealization: spec.causativeSpecificShuntlineRealization || "",
    });
    const machinery = context.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense: "present",
        targetSubject: spec.targetSubject,
    });
    const candidateAuthorized = operation.authorizationStatus === "authorized"
        && machinery.authorizationStatus === "authorized"
        && operation.targetObjectRequests.length === spec.sourceObjectCount + 1;
    if (!candidateAuthorized) {
        return {
            status: "missing",
            reason: "canonical-participant-transform-or-derived-machinery-failed",
            operationStatus: operation.authorizationStatus,
            operationReason: operation.blockReason,
            machineryStatus: machinery.authorizationStatus,
            machineryReason: machinery.blockReason,
            spec,
        };
    }
    const targetSurface = buildCanvasFiniteVncSurface(context, machinery, { validate: false });
    return {
        status: option ? "generated" : "surface-mismatch",
        reason: option ? "" : "participant-route-exists-but-printed-quantity-or-boundaries-do-not",
        sourceStem: spec.sourceStem,
        targetStem: shapeOption.targetStem,
        ruleId: shapeOption.ruleId,
        route: shapeOption.derivationRoute,
        sourceVoice: spec.sourceVoice,
        sourceObjectCount: spec.sourceObjectCount,
        targetObjectCount: operation.targetObjectRequests.length,
        formula: machinery.formulaRealization,
        sourcePredicateStem: getFinalTypedVncSlotFrame(source)?.slots?.predicate?.stem || "",
        sourceFiniteSurfaceCanonical: sourceSurface.canonical,
        targetFiniteSurfaceCanonical: targetSurface.canonical,
        sourceSurfaceFrame: sourceSurface?.frame || null,
        targetSurfaceFrame: targetSurface.frame,
        operationFrame: operation,
        machineryFrame: machinery,
        sourceWord: sourceSurface.word,
        word: targetSurface.word,
    };
}

function isCanonicalVncExecution(context, execution = null) {
    return Boolean(execution
        && context.isClassicalNahuatlVncDerivationOperationFrame(execution.operationFrame)
        && context.isClassicalNahuatlDerivedVncMachineryFrame(execution.machineryFrame)
        && context.isClassicalNahuatlVncFiniteSurfaceFrame(execution.sourceSurfaceFrame)
        && context.isClassicalNahuatlVncFiniteSurfaceFrame(execution.targetSurfaceFrame));
}

function enumerateCanvasVncExecutions(context, sourceSpec, { useCache = true } = {}) {
    const sourceProfile = getClassicalLessons2425VncSourceProfile(sourceSpec);
    const runtimeCache = useCache ? getRuntimeCache(VNC_ENUMERATION_CACHE, context) : null;
    const cacheKey = JSON.stringify(sourceProfile);
    if (runtimeCache?.has(cacheKey)) return runtimeCache.get(cacheKey);
    const targetSubjects = ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"];
    const causativeObjectKinds = sourceProfile.sourceVoice === "active"
        ? sourceProfile.causativeObjectKind
            ? [sourceProfile.causativeObjectKind]
            : ["specific-projective", "nonspecific-human", "nonspecific-nonhuman"]
        : [""];
    const sourceObjectKinds = (sourceProfile.sourceObjectKinds || []).map(request => typeof request === "string"
        ? request
        : request?.objectKind || "");
    const sourceBundle = getVncSourceBundle(context, sourceProfile);
    const derivationOptions = sourceBundle.sourceCanonical
        && context.isClassicalNahuatlVncDerivationOptionInventory(sourceBundle.inventory)
        ? sourceBundle.inventory.options || []
        : [];
    const routeOptions = derivationOptions.length ? derivationOptions : [null];
    const executions = [];
    for (const derivationOption of routeOptions) {
        for (const targetSubject of targetSubjects) {
            for (const causativeObjectKind of causativeObjectKinds) {
                const referentRelations = causativeObjectKind === "specific-projective"
                    && targetSubject === sourceProfile.sourceSubject
                    && /^3(?:sg|pl)$/u.test(targetSubject)
                    ? ["distinct", "coreferential"]
                    : sourceProfile.sourceVoice === "passive" && targetSubject === sourceProfile.sourceSubject
                        ? ["", "coreferential"]
                        : [""];
                for (const causativeReferentRelation of referentRelations) {
                    const specificShuntlineEligible = sourceObjectKinds.filter(kind => kind === "specific-projective").length === 1
                        && (sourceProfile.sourceVoice !== "active" || ["nonspecific-human", "nonspecific-nonhuman"].includes(causativeObjectKind))
                        && !(sourceProfile.sourceVoice === "passive"
                            && ["1sg", "2sg"].includes(targetSubject)
                            && targetSubject === sourceProfile.sourceSubject);
                    const shuntlineRealizations = specificShuntlineEligible ? ["silent", "sounded"] : [""];
                    for (const causativeSpecificShuntlineRealization of shuntlineRealizations) {
                        const spec = {
                            ...sourceProfile,
                            derivationOptionId: derivationOption?.optionId || "",
                            targetSubject,
                            causativeReferentRelation,
                            causativeObjectKind,
                            causativeSpecificShuntlineRealization,
                        };
                        executions.push({ spec, execution: executeVncSpec(context, spec) });
                    }
                }
            }
        }
    }
    // Keep the most recent source inventories for the adjacent hostile target
    // mutation proof without retaining every heavy operation/machinery graph
    // produced by the complete catalog traversal.
    return useCache ? setBoundedRuntimeCache(runtimeCache, cacheKey, executions, 4) : executions;
}

function getClassicalLessons2425VncSourceProfileSignature(candidate = {}) {
    const execution = candidate.execution || {};
    return JSON.stringify({
        sourceSignature: execution.operationFrame?.sourceSignature || execution.machineryFrame?.sourceSignature || "",
        targetSubject: candidate.spec?.targetSubject || "",
        causativeObjectKind: candidate.spec?.causativeObjectKind || "",
        causativeReferentRelation: candidate.spec?.causativeReferentRelation || "",
        causativeSpecificShuntlineRealization: candidate.spec?.causativeSpecificShuntlineRealization || "",
    });
}

function getIndexedVncEntry(context, example, auditIndex) {
    const generationKey = getClassicalLessons2425AuditGenerationKey(example);
    if (auditIndex.vncEntries.has(generationKey)) return auditIndex.vncEntries.get(generationKey);
    const started = auditNow();
    const sourceSpec = getClassicalLessons2425VncGenerationSourceProfile(example);
    const candidates = sourceSpec ? enumerateCanvasVncExecutions(context, sourceSpec, { useCache: false }) : [];
    const generated = candidates.filter(candidate => ["generated", "surface-mismatch"].includes(candidate.execution.status)
        && candidate.execution.sourceFiniteSurfaceCanonical === true
        && candidate.execution.targetFiniteSurfaceCanonical === true)
        .map(candidate => {
            const sourceProfileSignature = getClassicalLessons2425VncSourceProfileSignature(candidate);
            addClassicalLessons2425IndexedRelation(auditIndex, sourceProfileSignature, Object.freeze({
                kind: "classical-lessons24-25-indexed-vnc-relation",
                sourceProfileSignature,
                sourceSignature: candidate.execution.operationFrame?.sourceSignature || "",
                operationSignature: candidate.execution.operationFrame?.canonicalSignature || "",
                machinerySignature: candidate.execution.machineryFrame?.canonicalSignature || "",
                sourceFiniteSurfaceSignature: candidate.execution.sourceSurfaceFrame?.canonicalSignature || "",
                targetFiniteSurfaceSignature: candidate.execution.targetSurfaceFrame?.canonicalSignature || "",
                sourceWord: candidate.execution.sourceWord || "",
                sourcePredicateStem: candidate.execution.sourcePredicateStem || "",
                resultWord: candidate.execution.word || "",
            }));
            return { ...candidate, sourceProfileSignature };
        });
    const entry = {
        generationKey,
        layer: "vnc",
        sourceSpec,
        candidates,
        generated,
        generatedSources: unique(generated.map(candidate => candidate.execution.sourceWord)),
        generatedResults: unique(generated.map(candidate => candidate.execution.word)),
    };
    auditIndex.vncEntries.set(generationKey, entry);
    recordClassicalLessons2425AuditGeneration(auditIndex, "vnc", generationKey, auditNow() - started);
    return entry;
}

function matchIndexedVncEntry(context, example, entry) {
    if (!entry.sourceSpec) {
        return {
            status: "missing",
            owningLayer: "lesson23-participant-transform-plus-causative-machinery",
            reason: "canvas-vnc-source-has-no-typed-audit-profile",
        };
    }
    const sourceEvidence = getExpectedVncSourceEvidence(example);
    const readSource = execution => sourceEvidence.kind === "predicate-stem"
        ? execution.sourcePredicateStem
        : execution.sourceWord;
    const exact = entry.generated.find(candidate => (
        surfaceKey(readSource(candidate.execution)) === surfaceKey(sourceEvidence.value)
        && surfaceKey(candidate.execution.word) === surfaceKey(example.result)
        && isCanonicalVncExecution(context, candidate.execution)
    )) || null;
    if (!exact) {
        const shapeMatch = entry.generated.find(candidate => (
            shapeKey(readSource(candidate.execution)) === shapeKey(sourceEvidence.value)
            && shapeKey(candidate.execution.word) === shapeKey(example.result)
            && isCanonicalVncExecution(context, candidate.execution)
        )) || null;
        return {
            status: shapeMatch ? "surface-mismatch" : "missing",
            owningLayer: "lesson23-participant-transform-plus-causative-machinery",
            reason: shapeMatch
                ? "typed-vnc-words-exist-but-do-not-preserve-the-printed-quantity-or-boundaries"
                : "no-independently-enumerated-typed-vnc-source-and-result-match-the-canvas-example",
            sourceEvidenceKind: sourceEvidence.kind,
            expectedSource: sourceEvidence.value,
            generatedSources: unique(entry.generated.map(candidate => readSource(candidate.execution))),
            expectedResult: example.result,
            generatedResults: entry.generatedResults,
            surfaceFailures: entry.candidates.filter(candidate => ["generated", "surface-mismatch"].includes(candidate.execution.status)
                && (candidate.execution.sourceFiniteSurfaceCanonical !== true
                    || candidate.execution.targetFiniteSurfaceCanonical !== true))
                .map(candidate => ({
                    targetSubject: candidate.spec.targetSubject,
                    objectKind: candidate.spec.causativeObjectKind,
                    referentRelation: candidate.spec.causativeReferentRelation,
                    shuntline: candidate.spec.causativeSpecificShuntlineRealization,
                    sourceFiniteAuthorized: candidate.execution.sourceFiniteSurfaceCanonical === true,
                    targetFiniteAuthorized: candidate.execution.targetFiniteSurfaceCanonical === true,
                    sourceWord: candidate.execution.sourceWord,
                    resultWord: candidate.execution.word,
                    sourceBlockReason: candidate.execution.sourceSurfaceFrame?.blockReason || "",
                    targetBlockReason: candidate.execution.targetSurfaceFrame?.blockReason || "",
                })),
            structuralFailures: entry.candidates.filter(candidate => !["generated", "surface-mismatch"].includes(candidate.execution.status)).map(candidate => ({
                targetSubject: candidate.spec.targetSubject,
                objectKind: candidate.spec.causativeObjectKind,
                referentRelation: candidate.spec.causativeReferentRelation,
                shuntline: candidate.spec.causativeSpecificShuntlineRealization,
                status: candidate.execution.status,
                reason: candidate.execution.reason,
                operationStatus: candidate.execution.operationStatus,
                operationReason: candidate.execution.operationReason,
                machineryStatus: candidate.execution.machineryStatus,
                machineryReason: candidate.execution.machineryReason,
            })),
        };
    }
    const execution = exact.execution;
    return {
        owningLayer: "lesson23-participant-transform-plus-causative-machinery",
        status: "generated",
        reason: "",
        exactEvidenceCompared: true,
        typedFramesValidated: true,
        sourceStem: execution.sourceStem,
        targetStem: execution.targetStem,
        ruleId: execution.ruleId,
        route: execution.route,
        sourceVoice: execution.sourceVoice,
        sourceObjectCount: execution.sourceObjectCount,
        targetObjectCount: execution.targetObjectCount,
        formula: execution.formula,
        sourceSignature: execution.operationFrame?.sourceSignature || "",
        operationSignature: execution.operationFrame?.canonicalSignature || "",
        machinerySignature: execution.machineryFrame?.canonicalSignature || "",
        sourceEvidenceKind: sourceEvidence.kind,
        expectedSource: sourceEvidence.value,
        generatedSource: readSource(execution),
        expectedResult: example.result,
        generatedResult: execution.word,
        selectedTypedProfile: {
            targetSubject: exact.spec.targetSubject,
            causativeObjectKind: exact.spec.causativeObjectKind,
            causativeReferentRelation: exact.spec.causativeReferentRelation,
            causativeSpecificShuntlineRealization: exact.spec.causativeSpecificShuntlineRealization,
        },
        indexedSourceProfileSignature: exact.sourceProfileSignature,
        enumeratedGeneratedResults: entry.generatedResults,
    };
}

function coverVnc(context, example, auditIndex = null) {
    if (auditIndex) {
        return matchIndexedVncEntry(context, example, getIndexedVncEntry(context, example, auditIndex));
    }
    const sourceSpec = getClassicalLessons2425VncGenerationSourceProfile(example);
    if (!sourceSpec) {
        return {
            status: "missing",
            owningLayer: "lesson23-participant-transform-plus-causative-machinery",
            reason: "canvas-vnc-source-has-no-typed-audit-profile",
        };
    }
    const candidates = enumerateCanvasVncExecutions(context, sourceSpec);
    const generated = candidates.filter(candidate => ["generated", "surface-mismatch"].includes(candidate.execution.status)
        && candidate.execution.sourceFiniteSurfaceCanonical === true
        && candidate.execution.targetFiniteSurfaceCanonical === true);
    const sourceEvidence = getExpectedVncSourceEvidence(example);
    const readSource = execution => sourceEvidence.kind === "predicate-stem"
        ? execution.sourcePredicateStem
        : execution.sourceWord;
    const exact = generated.find(candidate => (
        surfaceKey(readSource(candidate.execution)) === surfaceKey(sourceEvidence.value)
        && surfaceKey(candidate.execution.word) === surfaceKey(example.result)
        && isCanonicalVncExecution(context, candidate.execution)
    )) || null;
    if (!exact) {
        const shapeMatch = generated.find(candidate => (
            shapeKey(readSource(candidate.execution)) === shapeKey(sourceEvidence.value)
            && shapeKey(candidate.execution.word) === shapeKey(example.result)
            && isCanonicalVncExecution(context, candidate.execution)
        )) || null;
        return {
            status: shapeMatch ? "surface-mismatch" : "missing",
            owningLayer: "lesson23-participant-transform-plus-causative-machinery",
            reason: shapeMatch
                ? "typed-vnc-words-exist-but-do-not-preserve-the-printed-quantity-or-boundaries"
                : "no-independently-enumerated-typed-vnc-source-and-result-match-the-canvas-example",
            sourceEvidenceKind: sourceEvidence.kind,
            expectedSource: sourceEvidence.value,
            expectedResult: example.result,
            generatedSources: unique(generated.map(candidate => readSource(candidate.execution))),
            generatedResults: unique(generated.map(candidate => candidate.execution.word)),
            surfaceFailures: candidates.filter(candidate => ["generated", "surface-mismatch"].includes(candidate.execution.status)
                && (candidate.execution.sourceFiniteSurfaceCanonical !== true
                    || candidate.execution.targetFiniteSurfaceCanonical !== true))
                .map(candidate => ({
                    targetSubject: candidate.spec.targetSubject,
                    objectKind: candidate.spec.causativeObjectKind,
                    referentRelation: candidate.spec.causativeReferentRelation,
                    shuntline: candidate.spec.causativeSpecificShuntlineRealization,
                    sourceFiniteAuthorized: candidate.execution.sourceFiniteSurfaceCanonical === true,
                    targetFiniteAuthorized: candidate.execution.targetFiniteSurfaceCanonical === true,
                    sourceWord: candidate.execution.sourceWord,
                    resultWord: candidate.execution.word,
                    sourceBlockReason: candidate.execution.sourceSurfaceFrame?.blockReason || "",
                    targetBlockReason: candidate.execution.targetSurfaceFrame?.blockReason || "",
                })),
            structuralFailures: candidates.filter(candidate => !["generated", "surface-mismatch"].includes(candidate.execution.status))
                .map(candidate => ({
                    targetSubject: candidate.spec.targetSubject,
                    objectKind: candidate.spec.causativeObjectKind,
                    referentRelation: candidate.spec.causativeReferentRelation,
                    shuntline: candidate.spec.causativeSpecificShuntlineRealization,
                    status: candidate.execution.status,
                    reason: candidate.execution.reason,
                    operationStatus: candidate.execution.operationStatus || "",
                    operationReason: candidate.execution.operationReason || "",
                    machineryStatus: candidate.execution.machineryStatus || "",
                    machineryReason: candidate.execution.machineryReason || "",
                })),
        };
    }
    const execution = exact.execution;
    const generatedSource = readSource(execution);
    return {
        owningLayer: "lesson23-participant-transform-plus-causative-machinery",
        ...execution,
        status: "generated",
        reason: "",
        exactEvidenceCompared: true,
        sourceEvidenceKind: sourceEvidence.kind,
        expectedSource: sourceEvidence.value,
        generatedSource,
        expectedResult: example.result,
        generatedResult: execution.word,
        selectedTypedProfile: {
            targetSubject: exact.spec.targetSubject,
            causativeObjectKind: exact.spec.causativeObjectKind,
            causativeReferentRelation: exact.spec.causativeReferentRelation,
            causativeSpecificShuntlineRealization: exact.spec.causativeSpecificShuntlineRealization,
        },
        enumeratedGeneratedResults: unique(generated.map(candidate => candidate.execution.word)),
    };
}

function coverAmbiguity(context, example) {
    if (example.section === "25.3") {
        const intransitive = executeVncSpec(context, {
            sourceStem: "mati",
            targetStem: "mach-tiā",
            verbClass: "B",
            sourceObjectCount: 0,
            sourceObjectKinds: [],
            sourceVoice: "active",
            sourceSubject: "1pl",
            targetSubject: "3sg",
        });
        const transitive = executeVncSpec(context, {
            sourceStem: "mati",
            targetStem: "mach-tiā",
            verbClass: "B",
            sourceObjectCount: 1,
            sourceObjectKinds: ["specific-projective"],
            sourceSpecificObjectPerson: "3sg",
            sourceVoice: "active",
            sourceSubject: "1pl",
            targetSubject: "3sg",
        });
        if (intransitive.status !== "generated" || transitive.status !== "generated"
            || !isCanonicalVncExecution(context, intransitive)
            || !isCanonicalVncExecution(context, transitive)) return {
            status: "missing",
            owningLayer: "typed-reverse-source-ambiguity",
            reason: "both-mati-source-profiles-did-not-generate-the-ambiguous-machtia-result",
            intransitive,
            transitive,
        };
        const expectedResult = String(example.result || "");
        const sourceReadings = [
            `(${intransitive.sourcePredicateStem})`,
            `tla-(${transitive.sourcePredicateStem})`,
        ];
        const expectedSourceReadings = String(example.source || "").split("|").map(value => value.trim());
        const sourceExact = expectedSourceReadings.length === sourceReadings.length
            && sourceReadings.every((value, index) => surfaceKey(value) === surfaceKey(expectedSourceReadings[index]));
        const resultExact = [intransitive.word, transitive.word]
            .every(value => surfaceKey(value) === surfaceKey(expectedResult));
        if (sourceExact && resultExact) return {
            status: "generated",
            owningLayer: "typed-reverse-source-ambiguity",
            exactEvidenceCompared: true,
            sourcePaths: ["intransitive-mati", "transitive-tla-mati"],
            expectedSources: expectedSourceReadings,
            generatedSources: sourceReadings,
            expectedResult,
            generatedResults: [intransitive.word, transitive.word],
            formulas: [intransitive.formula, transitive.formula],
        };
        const sameShape = sourceReadings.every((value, index) => shapeKey(value) === shapeKey(expectedSourceReadings[index]))
            && [intransitive.word, transitive.word].every(value => shapeKey(value) === shapeKey(expectedResult));
        return {
            status: sameShape ? "surface-mismatch" : "missing",
            owningLayer: "typed-reverse-source-ambiguity",
            reason: sameShape
                ? "both-typed-ambiguity-routes-exist-but-do-not-preserve-the-printed-quantity-or-boundaries"
                : "typed-ambiguity-routes-do-not-match-the-printed-source-or-result",
            expectedSources: expectedSourceReadings,
            generatedSources: sourceReadings,
            expectedResult,
            generatedResults: [intransitive.word, transitive.word],
        };
    }
    if (example.name === "Reciprocative-order contrast") {
        const a = buildMultipleObjectSource(context, "tlazohtla-l-tiā", "C", ["specific-projective", "reflexive"], "1pl", "3pl");
        const b = buildMultipleObjectSource(context, "tlazohtla-l-tiā", "C", ["reflexive", "specific-projective"], "1pl", "3pl");
        const canonical = [a, b].every(frame => frame?.authorizationStatus === "authorized"
            && context.isClassicalNahuatlVncDerivationSourceMachineryFrame(frame));
        if (!canonical || a.formulaRealization === b.formulaRealization) return {
            status: "missing",
            owningLayer: "lesson23-reciprocative-object-order",
            reason: "both-canonical-object-orders-were-not-distinguishable",
        };
        const sourceSurface = buildCanvasFiniteVncSurface(context, b);
        const resultSurface = buildCanvasFiniteVncSurface(context, a);
        const generatedSource = sourceSurface.word;
        const generatedResult = resultSurface.word;
        const exact = surfaceKey(generatedSource) === surfaceKey(example.source)
            && surfaceKey(generatedResult) === surfaceKey(example.result)
            && sourceSurface.canonical
            && resultSurface.canonical;
        if (exact) return {
            status: "generated",
            owningLayer: "lesson23-reciprocative-object-order",
            exactEvidenceCompared: true,
            expectedSource: example.source,
            generatedSource,
            expectedResult: example.result,
            generatedResult,
            formulas: [a.formulaRealization, b.formulaRealization],
        };
        const sameShape = shapeKey(generatedSource) === shapeKey(example.source)
            && shapeKey(generatedResult) === shapeKey(example.result);
        return {
            status: sameShape ? "surface-mismatch" : "missing",
            owningLayer: "lesson23-reciprocative-object-order",
            reason: sameShape
                ? "typed-object-order-contrast-exists-but-does-not-preserve-the-printed-quantity-or-boundaries"
                : "typed-object-order-contrast-does-not-match-the-printed-source-or-result",
            expectedSource: example.source,
            generatedSource,
            expectedResult: example.result,
            generatedResult,
        };
    }
    const sourceStem = example.source.includes("nōtza") ? "nōtza" : "caquī-tiā";
    const targetStem = example.source.includes("nōtza") ? "nōtza-l-tiā" : "caqui-ti-l-tiā";
    const verbClass = example.source.includes("nōtza") ? "A" : "C";
    const caqui = !example.source.includes("nōtza");
    const baseSpec = {
        sourceStem,
        targetStem,
        verbClass,
        sourceObjectCount: caqui ? 2 : 1,
        sourceObjectKinds: caqui ? ["specific-projective", "nonspecific-human"] : ["nonspecific-human"],
        sourceSubject: "1sg",
        targetSubject: "2sg",
    };
    const active = executeVncSpec(context, { ...baseSpec, sourceVoice: "active" });
    const passive = executeVncSpec(context, {
        ...baseSpec,
        sourceObjectCount: 1,
        sourceObjectKinds: ["specific-projective"],
        sourceSpecificObjectPerson: "1sg",
        sourceVoice: "passive",
        sourceNonactiveStem: VNC_SOURCE_NONACTIVE_STEMS[sourceStem] || "",
        causativeSpecificShuntlineRealization: "sounded",
    });
    if (active.status !== "generated" || passive.status !== "generated"
        || !isCanonicalVncExecution(context, active)
        || !isCanonicalVncExecution(context, passive)) return {
        status: "missing",
        owningLayer: "active-passive-reverse-source-ambiguity",
        reason: "both-active-and-passive-typed-sources-did-not-generate-the-same-causative",
        active,
        passive,
    };
    const alternativeSourceProjections = caqui
        && typeof context.buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrame === "function"
        && typeof context.isClassicalNahuatlLesson2513AlternativeSourceProjectionFrame === "function"
        ? [active, passive].map(execution => (
            context.buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(execution.operationFrame)
        ))
        : [];
    if (caqui && (alternativeSourceProjections.length !== 2
        || !alternativeSourceProjections.every(projection => (
            context.isClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(projection)
        )))) return {
        status: "missing",
        owningLayer: "active-passive-reverse-source-ambiguity",
        reason: "lesson25-13-signed-alternative-source-projections-were-not-canonical",
        projectionStatuses: alternativeSourceProjections.map(projection => projection?.authorizationStatus || "unavailable"),
        projectionReasons: alternativeSourceProjections.map(projection => projection?.blockReason || ""),
    };
    const expectedSources = String(example.source || "").split("|").map(value => value.trim());
    const generatedSources = caqui
        ? alternativeSourceProjections.map(projection => projection.sourceWordRealization)
        : [active.sourceWord, passive.sourceWord];
    const sourceExact = expectedSources.length === generatedSources.length
        && generatedSources.every((value, index) => surfaceKey(value) === surfaceKey(expectedSources[index]));
    const resultExact = [active.word, passive.word]
        .every(value => surfaceKey(value) === surfaceKey(example.result));
    if (sourceExact && resultExact) return {
        status: "generated",
        owningLayer: "active-passive-reverse-source-ambiguity",
        exactEvidenceCompared: true,
        routes: [active.route, passive.route],
        expectedSources,
        generatedSources,
        expectedResult: example.result,
        generatedResults: [active.word, passive.word],
        alternativeSourceProjectionSignatures: alternativeSourceProjections.map(projection => projection.canonicalSignature),
        alternativeSourceProjectionRuleIds: alternativeSourceProjections.map(projection => projection.sourcePredicateQuantityFrame.ruleId),
    };
    const sameShape = expectedSources.length === generatedSources.length
        && generatedSources.every((value, index) => shapeKey(value) === shapeKey(expectedSources[index]))
        && [active.word, passive.word].every(value => shapeKey(value) === shapeKey(example.result));
    return {
        status: sameShape ? "surface-mismatch" : "missing",
        owningLayer: "active-passive-reverse-source-ambiguity",
        reason: sameShape
            ? "typed-active-passive-routes-exist-but-do-not-preserve-the-printed-quantity-or-boundaries"
            : "typed-active-passive-routes-do-not-match-the-printed-source-or-result",
        expectedSources,
        generatedSources,
        expectedResult: example.result,
        generatedResults: [active.word, passive.word],
    };
}

function coverMood(context, example) {
    const owningLayer = "lesson25.14-derived-causative-mood-finalizer";
    if (typeof context.buildClassicalNahuatlLesson2514MoodTransformationFrame !== "function"
        || typeof context.isClassicalNahuatlLesson2514MoodTransformationFrame !== "function"
        || typeof context.isClassicalNahuatlLesson2514DerivedCausativeAssertionFrame !== "function") {
        return {
            status: "missing",
            owningLayer,
            reason: "lesson25.14-mood-transformation-owner-api-not-exported",
        };
    }

    const wish = example.name.includes("wish");
    const command = example.name.includes("command");
    const exhortation = example.name.includes("exhortation");
    const target = wish ? "wish" : command ? "command" : exhortation ? "exhortation" : "indirect-admonition";
    const targetSubject = wish ? "1sg" : command ? "2pl" : exhortation ? "1pl" : "3pl";
    const sourceStem = target === "indirect-admonition" ? "chōca" : "chīhua";
    const targetStem = target === "indirect-admonition" ? "chōc-tiā" : "chīhua-l-tiā";
    const sourceValence = wish || command ? "projective-nonhuman"
        : exhortation ? "specific-projective" : "intransitive";
    const source = buildSource(context, sourceStem, "A", sourceValence, {
        subject: "3sg",
        objectPerson: exhortation ? "3sg" : "",
        tense: "present",
    });
    const derivation = deriveCausativeMachinery(context, source, targetStem, targetSubject, "present");
    if (!context.isClassicalNahuatlLesson2514DerivedCausativeAssertionFrame(derivation.machinery)) {
        return {
            status: "missing",
            owningLayer,
            reason: derivation.operation.blockReason || derivation.machinery.blockReason
                || "canonical-derived-causative-assertion-not-generated",
            availableTargets: (derivation.inventory.options || []).map(option => option.targetStem),
        };
    }

    const frame = context.buildClassicalNahuatlLesson2514MoodTransformationFrame(derivation.machinery, { target });
    const canonical = context.isClassicalNahuatlLesson2514MoodTransformationFrame(frame);
    const sourceExact = canonical && sentenceSurfaceKey(frame.sourceSentenceRealization) === sentenceSurfaceKey(example.source);
    const resultExact = canonical && sentenceSurfaceKey(frame.sentenceRealization) === sentenceSurfaceKey(example.result);
    if (sourceExact && resultExact) {
        return {
            status: "generated",
            owningLayer,
            exactEvidenceCompared: true,
            target,
            sourceSurface: frame.sourceSentenceRealization,
            resultSurface: frame.sentenceRealization,
            formula: frame.targetFormulaRealization,
        };
    }
    const samePrintedShape = canonical
        && sentenceShapeKey(frame.sourceSentenceRealization) === sentenceShapeKey(example.source)
        && sentenceShapeKey(frame.sentenceRealization) === sentenceShapeKey(example.result);
    return {
        status: samePrintedShape ? "surface-mismatch" : "missing",
        owningLayer,
        reason: canonical ? "typed-mood-route-does-not-match-the-printed-quantity-or-spelling"
            : frame.blockReason || "canonical-mood-transformation-frame-not-generated",
        target,
        expectedSource: example.source,
        generatedSource: frame.sourceSentenceRealization || "",
        expectedResult: example.result,
        generatedResult: frame.sentenceRealization || "",
    };
}

function coverVoice(context, example) {
    const sourceKey = wordShapeKey(example.source);
    const sourceProfiles = {
        techtlachihualtiah: {
            sourceStem: "chīhua",
            verbClass: "A",
            sourceValence: "projective-nonhuman",
            sourceSubject: "1pl",
            sourceObjectPerson: "",
            targetSubject: "3pl",
            causativeObjectKind: "specific-projective",
            causativeReferentRelation: "",
            tense: "present",
            voice: "passive",
        },
        techchihualtiah: {
            sourceStem: "chīhua",
            verbClass: "A",
            sourceValence: "specific-projective",
            sourceSubject: "1pl",
            sourceObjectPerson: "3sg",
            targetSubject: "3pl",
            causativeObjectKind: "specific-projective",
            causativeReferentRelation: "",
            tense: "present",
            voice: "passive",
        },
        timitzinnotzaltiah: {
            sourceStem: "nōtza",
            verbClass: "A",
            sourceValence: "specific-projective",
            sourceSubject: "2sg",
            sourceObjectPerson: "3pl",
            targetSubject: "1pl",
            causativeObjectKind: "specific-projective",
            causativeReferentRelation: "",
            tense: "present",
            voice: "passive",
        },
        nicnocuitih: {
            sourceStem: "cui",
            verbClass: "A",
            sourceValence: "specific-projective",
            sourceSubject: "1sg",
            sourceObjectPerson: "3sg",
            targetSubject: "1sg",
            causativeObjectKind: "specific-projective",
            causativeReferentRelation: "",
            tense: "preterit",
            voice: "passive",
        },
        titetlachihualtiah: {
            sourceStem: "chīhua",
            verbClass: "A",
            sourceValence: "projective-nonhuman",
            sourceSubject: "3sg",
            sourceObjectPerson: "",
            targetSubject: "1pl",
            causativeObjectKind: "nonspecific-human",
            causativeReferentRelation: "",
            tense: "present",
            voice: "impersonal",
        },
    };
    const profile = sourceProfiles[sourceKey] || null;
    const owningLayer = "lesson25.15-derived-causative-finite-voice-finalizer";
    if (!profile) return {
        status: "missing",
        owningLayer,
        reason: "printed-active-source-has-no-source-keyed-typed-voice-profile",
    };
    const source = buildSource(context, profile.sourceStem, profile.verbClass, profile.sourceValence, {
        subject: profile.sourceSubject,
        objectPerson: profile.sourceObjectPerson,
        tense: profile.tense,
    });
    const causativeInventory = context.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const candidates = [];
    for (const causativeOption of causativeInventory.options || []) {
        const operation = context.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
            derivationType: "causative",
            optionId: causativeOption.optionId,
            targetSubject: profile.targetSubject,
            causativeObjectKind: profile.causativeObjectKind,
            causativeReferentRelation: profile.causativeReferentRelation,
        });
        const active = context.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
            mood: "indicative",
            tense: profile.tense,
            targetSubject: profile.targetSubject,
        });
        if (!context.isClassicalNahuatlDerivedVncMachineryFrame(active)) continue;
        const activeSurface = buildCanvasFiniteVncSurface(context, active);
        const nonactiveInventory = context.getClassicalNahuatlLesson20NonactiveStemOptions(active.targetStem, {
            verbClass: "C",
            sourceValence: "multiple-object",
        });
        for (const nonactiveOption of nonactiveInventory.options || []) {
            const nonactiveRecord = context.deriveClassicalNahuatlLesson20NonactiveStemRecord(active.targetStem, {
                verbClass: "C",
                sourceValence: "multiple-object",
                optionId: nonactiveOption.optionId,
            });
            if (!context.isClassicalNahuatlLesson20NonactiveStemRecord(nonactiveRecord, active.targetStem)) continue;
            const voiceFrame = context.buildClassicalNahuatlLessons20To22DerivedVncFrame(active, {
                voice: profile.voice,
                nonactiveStemRecord: nonactiveRecord,
                sourceObjectClusterFrame: active.targetObjectClusterFrame,
                sourceValence: "multiple-object",
                sourceSubject: profile.targetSubject,
                mood: "indicative",
                tense: profile.tense,
                verbClass: "C",
            });
            const voiceSurface = buildCanvasFiniteVncSurface(context, voiceFrame);
            candidates.push({
                causativeOption,
                operation,
                active,
                activeSurface,
                nonactiveOption,
                nonactiveRecord,
                voiceFrame,
                voiceSurface,
                canonical: activeSurface.canonical
                    && voiceSurface.canonical,
                generatedSource: activeSurface.word ? `${capitalizeCanvasWord(activeSurface.word)}.` : "",
                generatedResult: voiceSurface.word ? `${capitalizeCanvasWord(voiceSurface.word)}.` : "",
            });
        }
    }
    const exact = candidates.find(candidate => candidate.canonical
        && sentenceSurfaceKey(candidate.generatedSource) === sentenceSurfaceKey(example.source)
        && sentenceSurfaceKey(candidate.generatedResult) === sentenceSurfaceKey(example.result)) || null;
    if (exact) return {
        status: "generated",
        owningLayer,
        exactEvidenceCompared: true,
        expectedSource: example.source,
        generatedSource: exact.generatedSource,
        expectedResult: example.result,
        generatedResult: exact.generatedResult,
        voice: profile.voice,
        causativeRuleId: exact.causativeOption.ruleId,
        nonactiveRuleId: exact.nonactiveOption.ruleId,
        targetStem: exact.nonactiveOption.nonactiveStem,
        sourceObjectCount: exact.active.targetObjectClusterFrame?.positions?.length || 0,
        retainedObjectCount: exact.voiceFrame.voiceObjectClusterFrame?.positions?.length || 0,
    };
    const shapeMatch = candidates.find(candidate => candidate.canonical
        && sentenceShapeKey(candidate.generatedSource) === sentenceShapeKey(example.source)
        && sentenceShapeKey(candidate.generatedResult) === sentenceShapeKey(example.result)) || null;
    return {
        status: shapeMatch ? "surface-mismatch" : "missing",
        owningLayer,
        reason: shapeMatch
            ? "typed-finite-voice-route-exists-but-does-not-preserve-the-printed-quantity-or-spelling"
            : "no-independently-enumerated-derived-causative-voice-route-matches-the-full-source-and-result",
        expectedSource: example.source,
        expectedResult: example.result,
        generatedSources: unique(candidates.filter(candidate => candidate.canonical).map(candidate => candidate.generatedSource)),
        generatedResults: unique(candidates.filter(candidate => candidate.canonical).map(candidate => candidate.generatedResult)),
        structuralFailures: candidates.filter(candidate => !candidate.canonical).map(candidate => ({
            causativeTargetStem: candidate.causativeOption.targetStem,
            nonactiveTargetStem: candidate.nonactiveOption.nonactiveStem,
            activeSurfaceCanonical: candidate.activeSurface.canonical,
            activeSurfaceReason: candidate.activeSurface.frame?.blockReason || "",
            voiceStatus: candidate.voiceFrame?.authorizationStatus || "",
            voiceReason: candidate.voiceFrame?.blockReason || "",
            voiceCanonical: context.isClassicalNahuatlVncDerivationSourceMachineryFrame(candidate.voiceFrame),
            voiceSurfaceCanonical: candidate.voiceSurface.canonical,
            voiceSurfaceReason: candidate.voiceSurface.frame?.blockReason || "",
        })),
    };
}

function coverLesson24Stock(context, example) {
    const owningLayer = "lesson24-root-stock-construction";
    // Adapter boundary for /root/lesson24_structural. The stable owner API is
    // intentionally resolved at runtime so this audit never substitutes a
    // catalog target while that shared action is landing.
    if (typeof context.buildClassicalNahuatlLesson24StockFormationFrame !== "function"
        || typeof context.isClassicalNahuatlLesson24StockFormationFrame !== "function") {
        return {
            status: "missing",
            owningLayer,
            reason: "lesson24-structural-owner-api-not-yet-exported",
            adapterTodo: "wire-is-automatic-once-buildClassicalNahuatlLesson24StockFormationFrame-is-exported",
        };
    }
    const withStem = example.name.includes("Stock plus stem");
    const frame = context.buildClassicalNahuatlLesson24StockFormationFrame({
        root: "patl",
        stockFormative: "ā",
        stemFormative: withStem ? "ni" : "",
    });
    const expected = lastParenthesized(example.result) || example.result;
    const canonical = context.isClassicalNahuatlLesson24StockFormationFrame(frame);
    const generatedSource = withStem
        ? `${frame.formationSteps[1]?.sourceMorph || frame.stockStem} + ${frame.stemFormative}`
        : `${frame.root} + ${frame.stockFormative}`;
    const generatedResult = withStem ? `(${frame.targetStem})` : frame.targetStem;
    const exact = canonical
        && citationSurfaceKey(generatedSource) === citationSurfaceKey(example.source)
        && citationSurfaceKey(generatedResult) === citationSurfaceKey(example.result);
    return exact ? {
        status: "generated",
        owningLayer,
        exactEvidenceCompared: true,
        expectedSource: example.source,
        generatedSource,
        expectedResult: example.result,
        generatedResult,
        targetStem: frame.targetStem,
        ruleId: frame.ruleId || frame.selectedRuleId || "",
    } : {
        status: canonical
            && citationShapeKey(generatedSource) === citationShapeKey(example.source)
            && citationShapeKey(generatedResult) === citationShapeKey(example.result)
            ? "surface-mismatch" : "missing",
        owningLayer,
        reason: canonical ? "typed-stock-route-does-not-match-the-full-printed-source-and-result" : frame?.blockReason || "canonical-stock-frame-not-generated",
        expectedSource: example.source,
        generatedSource,
        expectedResult: example.result,
        generatedResult,
        expected,
        generatedTarget: frame?.targetStem || "",
    };
}

function coverLesson24Coalescence(context, example) {
    const owningLayer = "lesson24-vowel-coalescence";
    if (typeof context.buildClassicalNahuatlLesson24VowelCoalescenceFrame !== "function"
        || typeof context.isClassicalNahuatlLesson24VowelCoalescenceFrame !== "function") {
        return {
            status: "missing",
            owningLayer,
            reason: "lesson24-structural-owner-api-not-yet-exported",
            adapterTodo: "wire-is-automatic-once-buildClassicalNahuatlLesson24VowelCoalescenceFrame-is-exported",
        };
    }
    const parts = lastParenthesized(example.source).split("-").filter(Boolean);
    const stemFormative = parts.pop() || "";
    const stockFormative = parts.pop() || "";
    const root = parts.join("-");
    const frame = context.buildClassicalNahuatlLesson24VowelCoalescenceFrame({ root, stockFormative, stemFormative });
    const expected = lastParenthesized(example.result) || example.result;
    const canonical = context.isClassicalNahuatlLesson24VowelCoalescenceFrame(frame);
    const generatedSource = `(${frame.uncoalescedStem})`;
    const generatedResult = `(${frame.targetStem})`;
    const exact = canonical
        && citationSurfaceKey(generatedSource) === citationSurfaceKey(example.source)
        && citationSurfaceKey(generatedResult) === citationSurfaceKey(example.result);
    return exact ? {
        status: "generated",
        owningLayer,
        exactEvidenceCompared: true,
        expectedSource: example.source,
        generatedSource,
        expectedResult: example.result,
        generatedResult,
        targetStem: frame.targetStem,
        ruleId: frame.ruleId || frame.selectedRuleId || "",
    } : {
        status: canonical
            && citationShapeKey(generatedSource) === citationShapeKey(example.source)
            && citationShapeKey(generatedResult) === citationShapeKey(example.result)
            ? "surface-mismatch" : "missing",
        owningLayer,
        reason: canonical ? "typed-coalescence-route-does-not-match-the-full-printed-source-and-result" : frame?.blockReason || "canonical-coalescence-frame-not-generated",
        expectedSource: example.source,
        generatedSource,
        expectedResult: example.result,
        generatedResult,
        expected,
        generatedTarget: frame?.targetStem || "",
    };
}

function coverLesson24Synonym(context, example) {
    const owningLayer = "lesson24-lexical-synonym-selection";
    if (typeof context.getClassicalNahuatlLesson24SynonymOptionInventory !== "function"
        || typeof context.deriveClassicalNahuatlLesson24SynonymFrame !== "function"
        || typeof context.isClassicalNahuatlLesson24SynonymFrame !== "function") {
        return {
            status: "missing",
            owningLayer,
            reason: "lesson24-structural-owner-api-not-yet-exported",
            adapterTodo: "wire-is-automatic-once-the-lesson24-synonym-owner-api-is-exported",
        };
    }
    const sourceStem = lastParenthesized(example.source);
    const expected = lastParenthesized(example.result);
    const inventory = context.getClassicalNahuatlLesson24SynonymOptionInventory(sourceStem);
    const inventoryCanonical = typeof context.isClassicalNahuatlLesson24SynonymOptionInventory !== "function"
        || context.isClassicalNahuatlLesson24SynonymOptionInventory(inventory, sourceStem);
    if (!inventoryCanonical) {
        return {
            status: "missing",
            owningLayer,
            reason: "canonical-synonym-option-inventory-not-generated",
        };
    }
    const candidates = (inventory.options || []).map(option => {
        const frame = context.deriveClassicalNahuatlLesson24SynonymFrame(sourceStem, { optionId: option.optionId });
        return {
            option,
            frame,
            canonical: context.isClassicalNahuatlLesson24SynonymFrame(frame, sourceStem),
            generatedSource: `(${frame.sourceStem})`,
            generatedResult: `(${frame.targetStem})`,
        };
    });
    const exactMatch = candidates.find(candidate => candidate.canonical
        && citationSurfaceKey(candidate.generatedSource) === citationSurfaceKey(example.source)
        && citationSurfaceKey(candidate.generatedResult) === citationSurfaceKey(example.result)) || null;
    const shapeMatch = candidates.find(candidate => candidate.canonical
        && citationShapeKey(candidate.generatedSource) === citationShapeKey(example.source)
        && citationShapeKey(candidate.generatedResult) === citationShapeKey(example.result)) || null;
    if (!exactMatch && !shapeMatch) {
        return {
            status: "missing",
            owningLayer,
            reason: inventory.blockReason || "typed-synonym-inventory-has-no-printed-target",
            availableTargets: (inventory.options || []).map(candidate => candidate.targetStem),
        };
    }
    const selected = exactMatch || shapeMatch;
    return exactMatch ? {
        status: "generated",
        owningLayer,
        exactEvidenceCompared: true,
        expectedSource: example.source,
        generatedSource: selected.generatedSource,
        expectedResult: example.result,
        generatedResult: selected.generatedResult,
        targetStem: selected.frame.targetStem,
        ruleId: selected.frame.ruleId || selected.frame.selectedRuleId || "",
        enumeratedTargets: candidates.filter(candidate => candidate.canonical).map(candidate => candidate.frame.targetStem),
    } : {
        status: "surface-mismatch",
        owningLayer,
        reason: "typed-synonym-route-does-not-match-the-full-printed-source-and-result",
        expectedSource: example.source,
        generatedSource: selected.generatedSource,
        expectedResult: example.result,
        generatedResult: selected.generatedResult,
        expected,
        generatedTarget: selected.frame.targetStem || "",
    };
}

function deriveCausativeMachinery(
    context,
    source,
    targetStem,
    targetSubject,
    tense,
    causativeReferentRelation = "",
    causativeSpecificShuntlineRealization = ""
) {
    const inventory = context.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "causative" });
    const option = (inventory.options || []).find(candidate => surfaceKey(candidate.targetStem) === surfaceKey(targetStem));
    const operation = context.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: option?.optionId || `missing-${targetStem}`,
        targetSubject,
        causativeReferentRelation,
        causativeSpecificShuntlineRealization,
    });
    const machinery = context.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense,
        targetSubject,
    });
    return { inventory, option, operation, machinery };
}

function buildLesson2516PrincipalAndAdjunct(context, example) {
    if (/Cintli/u.test(example.source)) {
        const source = buildSource(context, "māmā", "D", "specific-projective", {
            subject: "3pl",
            objectPerson: "3sg",
            tense: "present",
        });
        const derivation = deriveCausativeMachinery(context, source, "māma-l-tiā", "3pl", "present", "distinct");
        const adjunct = context.buildClassicalNahuatlLesson12AbsolutiveNncFrame("cin", {
            subject: "3sg",
            nounClass: "tli",
            animacy: "nonanimate",
        });
        return {
            ...derivation,
            adjunct,
            profileId: "lesson25.16-cintli-silent-direct-object",
            principalObjectId: "source-object-1",
            referenceId: "referent:maize",
        };
    }
    if (/Ātōlli/u.test(example.source)) {
        const source = buildSource(context, "ī", "A", "specific-projective", {
            subject: "1pl",
            objectPerson: "3sg",
            tense: "future",
        });
        const derivation = deriveCausativeMachinery(context, source, "ī-tiā", "3pl", "future");
        const adjunct = context.buildClassicalNahuatlLesson12AbsolutiveNncFrame("ātōl", {
            subject: "3sg",
            nounClass: "tli",
            animacy: "nonanimate",
        });
        return {
            ...derivation,
            adjunct,
            profileId: "lesson25.16-atolli-silent-direct-object",
            principalObjectId: "source-object-1",
            referenceId: "referent:atolli",
        };
    }
    const source = buildSource(context, "caqui", "B", "specific-projective", {
        subject: "2sg",
        objectPerson: "3sg",
        tense: "preterit",
    });
    const first = deriveCausativeMachinery(context, source, "caquī-tiā", "1sg", "preterit");
    const second = deriveCausativeMachinery(context, first.machinery, "caqui-ti-l-tiā", "3pl", "preterit");
    const adjunct = context.buildClassicalNahuatlLesson13PossessiveNncFrame("cn-īuh", {
        subject: "2sg",
        possessor: "1sg",
        singularConnector: "0",
        nounstemRelationKind: "nonrelational",
        animacy: "animate",
    });
    return {
        first,
        ...second,
        adjunct,
        profileId: "lesson25.16-tinocniuh-silent-causative-object",
        principalObjectId: "causative-object",
        referenceId: "referent:friend",
    };
}

function buildLesson253PrincipalAndAdjunct(context, example) {
    const activeProfile = example.name.startsWith("Supplement resolves");
    const soundedProfile = example.name.startsWith("Sounded shuntline");
    const tense = soundedProfile ? "imperfect" : "present";
    let source;
    let derivation;
    let sourceDecompositionMachinery = null;
    let profileId;
    let adjunct;
    if (activeProfile) {
        source = buildSource(context, "mati", "B", "specific-projective", {
            subject: "1pl",
            objectPerson: "3sg",
            tense,
        });
        derivation = deriveCausativeMachinery(context, source, "mach-tiā", "3sg", tense);
        profileId = "lesson25.3-active-mati-silent-direct-object";
    } else {
        const active = buildSource(context, "mati", "B", "specific-projective", {
            subject: "3sg",
            objectPerson: "3sg",
            tense,
        });
        const nonactive = context.deriveClassicalNahuatlLesson20NonactiveStemRecord("mati", {
            verbClass: "B",
            sourceValence: "specific-projective",
            optionId: "ō:mach-ō",
        });
        source = context.buildClassicalNahuatlLessons20To22DerivedVncFrame(active, {
            voice: "passive",
            nonactiveStemRecord: nonactive,
            sourceValence: "specific-projective",
            sourceSubject: "3sg",
            sourceObjectPerson: "3sg",
            mood: "indicative",
            tense,
            verbClass: "B",
        });
        derivation = deriveCausativeMachinery(
            context,
            source,
            "mach-tiā",
            "3sg",
            tense,
            "",
            soundedProfile ? "sounded" : "silent"
        );
        profileId = soundedProfile
            ? "lesson25.3-passive-macho-sounded-shuntline-imperfect"
            : "lesson25.3-passive-macho-silent-shuntline";
        if (soundedProfile) {
            const decompositionActive = buildSource(context, "mati", "B", "specific-projective", {
                subject: "3sg",
                objectPerson: "3sg",
                tense: "present",
            });
            const decompositionNonactive = context.deriveClassicalNahuatlLesson20NonactiveStemRecord("mati", {
                verbClass: "B",
                sourceValence: "specific-projective",
                optionId: "ō:mach-ō",
            });
            const decompositionSource = context.buildClassicalNahuatlLessons20To22DerivedVncFrame(decompositionActive, {
                voice: "passive",
                nonactiveStemRecord: decompositionNonactive,
                sourceValence: "specific-projective",
                sourceSubject: "3sg",
                sourceObjectPerson: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
            });
            sourceDecompositionMachinery = deriveCausativeMachinery(
                context,
                decompositionSource,
                "mach-tiā",
                "3sg",
                "present",
                "",
                "silent"
            ).machinery;
        }
    }
    adjunct = soundedProfile
        ? context.buildClassicalNahuatlLesson12AbsolutiveNncFrame("teōcuīca", {
            subject: "3sg",
            nounClass: "tl",
            animacy: "nonanimate",
        })
        : context.buildClassicalNahuatlLesson12AbsolutiveNncFrame("nehmatcānēmiliz", {
            subject: "3sg",
            nounClass: "tli",
            animacy: "nonanimate",
        });
    return {
        ...derivation,
        adjunct,
        sourceDecompositionMachinery,
        profileId,
        principalObjectId: "source-object-1",
        referenceId: soundedProfile ? "referent:teocuicatl" : "referent:nehmatcanemiliztli",
    };
}

function realizeCanvasSupplementationSource(frame = null) {
    const typedPrincipal = frame?.typedSurfaceRealizationFrame?.principalWord || "";
    const typedAdjunct = frame?.typedSurfaceRealizationFrame?.adjunctWord || "";
    const tokens = frame?.linearizationFrame?.tokens || [];
    const principal = typedPrincipal || tokens.find(token => token?.role === "principal")?.form || "";
    const adjunct = typedAdjunct || tokens.find(token => token?.role === "supplementary-object")?.form || "";
    return principal && adjunct
        ? `${capitalizeCanvasWord(principal)}. + ${capitalizeCanvasWord(adjunct)}.`
        : "";
}

function coverSupplementation(context, example) {
    const owningLayer = example.section === "25.16" ? "lesson25.16-typed-supplement-finalizer" : "lesson25.3-supplement-finalizer";
    if (example.section === "25.3") {
        if (typeof context.buildClassicalNahuatlLesson253SupplementationFrame !== "function"
            || typeof context.isClassicalNahuatlLesson253SupplementationFrame !== "function") {
            return {
                status: "missing",
                owningLayer,
                reason: "lesson25.3-supplementation-owner-api-not-exported",
            };
        }
        const bundle = buildLesson253PrincipalAndAdjunct(context, example);
        const frame = context.buildClassicalNahuatlLesson253SupplementationFrame(bundle.machinery, bundle.adjunct, {
            profileId: bundle.profileId,
            principalObjectId: bundle.principalObjectId,
            principalReferenceId: bundle.referenceId,
            adjunctReferenceId: bundle.referenceId,
            sourcePrincipalVncFrame: bundle.sourceDecompositionMachinery || undefined,
        });
        const canonical = context.isClassicalNahuatlLesson253SupplementationFrame(frame);
        const sourceSurface = frame?.sourceDecompositionFrame?.surfaceRealization
            || realizeCanvasSupplementationSource(frame);
        const exact = canonical
            && sentenceSurfaceKey(sourceSurface) === sentenceSurfaceKey(example.source)
            && sentenceSurfaceKey(frame.surfaceRealization) === sentenceSurfaceKey(example.result);
        return exact ? {
            status: "generated",
            owningLayer,
            exactEvidenceCompared: true,
            profileId: frame.profileId,
            sourceSurface,
            surface: frame.surfaceRealization,
            principalTargetStem: bundle.machinery.targetStem,
        } : {
            status: canonical
                && sentenceShapeKey(sourceSurface) === sentenceShapeKey(example.source)
                && sentenceShapeKey(frame.surfaceRealization) === sentenceShapeKey(example.result)
                ? "surface-mismatch" : "missing",
            owningLayer,
            reason: canonical ? "typed-supplement-surface-does-not-match-canvas"
                : frame.blockReason || bundle.operation.blockReason || bundle.machinery.blockReason
                    || "canonical-lesson25.3-supplementation-frame-not-generated",
            expectedSource: example.source,
            generatedSource: sourceSurface,
            expectedSurface: example.result,
            generatedSurface: frame.surfaceRealization || "",
        };
    }
    if (example.section !== "25.16") {
        return {
            status: "missing",
            owningLayer,
            reason: "supplementation-section-not-recognized",
        };
    }
    if (typeof context.buildClassicalNahuatlLesson2516SupplementationFrame !== "function"
        || typeof context.isClassicalNahuatlLesson2516SupplementationFrame !== "function") {
        return {
            status: "missing",
            owningLayer,
            reason: "lesson25.16-supplementation-owner-api-not-exported",
        };
    }
    const bundle = buildLesson2516PrincipalAndAdjunct(context, example);
    const frame = context.buildClassicalNahuatlLesson2516SupplementationFrame(bundle.machinery, bundle.adjunct, {
        profileId: bundle.profileId,
        principalObjectId: bundle.principalObjectId,
        principalReferenceId: bundle.referenceId,
        adjunctReferenceId: bundle.referenceId,
    });
    const canonical = context.isClassicalNahuatlLesson2516SupplementationFrame(frame);
    const sourceSurface = realizeCanvasSupplementationSource(frame);
    const exact = canonical
        && sentenceSurfaceKey(sourceSurface) === sentenceSurfaceKey(example.source)
        && sentenceSurfaceKey(frame.surfaceRealization) === sentenceSurfaceKey(example.result);
    return exact ? {
        status: "generated",
        owningLayer,
        exactEvidenceCompared: true,
        profileId: frame.profileId,
        sourceSurface,
        surface: frame.surfaceRealization,
        principalTargetStem: bundle.machinery.targetStem,
    } : {
        status: canonical
            && sentenceShapeKey(sourceSurface) === sentenceShapeKey(example.source)
            && sentenceShapeKey(frame.surfaceRealization) === sentenceShapeKey(example.result)
            ? "surface-mismatch" : "missing",
        owningLayer,
        reason: canonical ? "typed-supplement-surface-does-not-match-canvas" : frame.blockReason || bundle.operation.blockReason || bundle.machinery.blockReason || "canonical-supplementation-frame-not-generated",
        expectedSource: example.source,
        generatedSource: sourceSurface,
        expectedSurface: example.result,
        generatedSurface: frame.surfaceRealization || "",
        principalTargetStem: bundle.machinery.targetStem || "",
        availableTargets: (bundle.inventory?.options || []).map(option => option.targetStem),
    };
}

function coverMissingOwningApi(example) {
    const owningLayer = "unclassified-owning-layer";
    return {
        status: "missing",
        owningLayer,
        reason: `${owningLayer}-has-no-canonical-executable-api-for-this-catalog-row`,
    };
}

function coverExample(context, example, auditIndex = null) {
    const runtimeCache = auditIndex ? null : getRuntimeCache(COVERAGE_CACHE, context);
    const cacheKey = auditIndex ? getClassicalLessons2425AuditQueryKey(example) : JSON.stringify([
        example.lesson,
        example.section,
        example.layer,
        example.name,
        example.source,
        example.result,
        example.evidenceStatus,
    ]);
    if (auditIndex?.queryResults.has(cacheKey)) return auditIndex.queryResults.get(cacheKey);
    if (runtimeCache?.has(cacheKey)) return runtimeCache.get(cacheKey);
    let coverage;
    switch (example.layer) {
        case "stem": coverage = coverStem(context, example, auditIndex); break;
        case "source-less":
        case "result-only": coverage = coverSourceRequired(context, example); break;
        case "negative": coverage = coverNegative(context, example); break;
        case "perfective": coverage = coverPerfective(context, example); break;
        case "valence": coverage = coverValence(context, example); break;
        case "nonactive": coverage = coverNonactive(context, example); break;
        case "vnc-reading": coverage = coverVncReading(context, example); break;
        case "vnc": coverage = coverVnc(context, example, auditIndex); break;
        case "ambiguity": coverage = coverAmbiguity(context, example); break;
        case "mood": coverage = coverMood(context, example); break;
        case "voice": coverage = coverVoice(context, example); break;
        case "stock": coverage = coverLesson24Stock(context, example); break;
        case "coalescence": coverage = coverLesson24Coalescence(context, example); break;
        case "synonym": coverage = coverLesson24Synonym(context, example); break;
        case "supplementation": coverage = coverSupplementation(context, example); break;
        default: coverage = {
            status: "missing",
            owningLayer: "unclassified",
            reason: "catalog-row-has-no-typed-execution-path",
        };
    }
    if (auditIndex) auditIndex.queryResults.set(cacheKey, coverage);
    else runtimeCache.set(cacheKey, coverage);
    return coverage;
}

function summarizeRows(rows, key) {
    return Object.fromEntries(unique(rows.map(row => String(row[key])))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map(value => {
            const selected = rows.filter(row => String(row[key]) === value);
            return [value, {
                total: selected.length,
                generated: selected.filter(row => row.coverage.status === "generated").length,
                positiveExact: selected.filter(row => row.layer !== "negative"
                    && row.coverage.status === "generated"
                    && row.coverage.exactEvidenceCompared === true).length,
                negativeVerified: selected.filter(row => row.layer === "negative"
                    && row.coverage.status === "negative-verified"
                    && row.coverage.negativeConstraintVerified === true).length,
                sourceRequired: selected.filter(row => row.coverage.status === "source-required").length,
                surfaceMismatch: selected.filter(row => row.coverage.status === "surface-mismatch").length,
                missing: selected.filter(row => row.coverage.status === "missing").length,
                policyViolations: selected.filter(row => row.layer === "negative"
                    ? row.coverage.status !== "negative-verified" || row.coverage.negativeConstraintVerified !== true
                    : row.coverage.status !== "generated" || row.coverage.exactEvidenceCompared !== true).length,
            }];
        }));
}

function snapshotClassicalLessons2425AuditExecutionIndex(index) {
    const byLayer = Object.fromEntries([...index.layerTimings.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([layer, timing]) => [layer, Object.freeze({
            rowCount: timing.rowCount,
            uniqueGenerationKeys: timing.uniqueGenerationKeys.size,
            generationBuilds: timing.generationBuilds,
            generationMs: Number(timing.generationMs.toFixed(3)),
            matchingMs: Number(timing.matchingMs.toFixed(3)),
            combinedMs: Number(timing.combinedMs.toFixed(3)),
            totalMs: Number((timing.generationMs + timing.matchingMs + timing.combinedMs).toFixed(3)),
        })]));
    const generationBuildViolations = [...index.generationBuildsByKey.entries()]
        .filter(([, count]) => count !== 1)
        .map(([generationKey, count]) => ({ generationKey, count }));
    return Object.freeze({
        kind: index.kind,
        version: index.version,
        rowCount: index.plan.rowCount,
        queryCount: [...index.queryCountsByKey.values()].reduce((sum, count) => sum + count, 0),
        uniqueGenerationKeyCount: index.plan.uniqueGenerationKeyCount,
        indexedGenerationBuildCount: [...index.generationBuildsByKey.values()].reduce((sum, count) => sum + count, 0),
        indexedRelationSourceProfileCount: index.relationsByCanonicalSourceProfileSignature.size,
        indexedRelationCount: [...index.relationsByCanonicalSourceProfileSignature.values()].reduce((sum, relations) => sum + relations.length, 0),
        expectedTargetsExcludedFromGenerationDescriptors: index.plan.expectedTargetsExcludedFromGenerationDescriptors,
        generationBuildViolations: Object.freeze(generationBuildViolations),
        byLayer: Object.freeze(byLayer),
        elapsedMs: Number((auditNow() - index.startedAt).toFixed(3)),
    });
}

function coverExamplesWithSharedIndex(context, examples = CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES) {
    const auditIndex = createClassicalLessons2425AuditExecutionIndex(context, examples);
    const coverages = new Array(auditIndex.plan.rowCount);
    for (const group of auditIndex.plan.groups) {
        if (group.layer === "stem") {
            getIndexedStemEntry(context, group.rows[0].example, auditIndex);
        } else if (group.layer === "vnc") {
            getIndexedVncEntry(context, group.rows[0].example, auditIndex);
        }
        for (const plannedRow of group.rows) {
            const started = auditNow();
            coverages[plannedRow.index] = coverExample(context, plannedRow.example, auditIndex);
            recordClassicalLessons2425AuditQuery(
                auditIndex,
                plannedRow.layer,
                plannedRow.generationKey,
                auditNow() - started,
                { combined: !["stem", "vnc"].includes(plannedRow.layer) }
            );
        }
        // Matching has consumed every query for this generation key. Retain
        // only compact signed relations and coverage; release heavy frames.
        auditIndex.stemEntries.delete(group.generationKey);
        auditIndex.vncEntries.delete(group.generationKey);
    }
    return Object.freeze({
        plan: auditIndex.plan,
        coverages: Object.freeze(coverages),
        index: snapshotClassicalLessons2425AuditExecutionIndex(auditIndex),
    });
}

async function runAudit() {
    const { context } = await createModuleRuntime({ rootDir: ROOT });
    const indexed = coverExamplesWithSharedIndex(context, CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES);
    const rows = indexed.plan.rows.map(plannedRow => ({
        id: plannedRow.id,
        ...plannedRow.example,
        coverage: indexed.coverages[plannedRow.index],
    }));
    const counts = {
        generated: rows.filter(row => row.coverage.status === "generated").length,
        positiveExact: rows.filter(row => row.layer !== "negative"
            && row.coverage.status === "generated"
            && row.coverage.exactEvidenceCompared === true).length,
        negativeVerified: rows.filter(row => row.layer === "negative"
            && row.coverage.status === "negative-verified"
            && row.coverage.negativeConstraintVerified === true).length,
        sourceRequired: rows.filter(row => row.coverage.status === "source-required").length,
        surfaceMismatch: rows.filter(row => row.coverage.status === "surface-mismatch").length,
        missing: rows.filter(row => row.coverage.status === "missing").length,
    };
    const policyViolations = rows.filter(row => row.layer === "negative"
        ? row.coverage.status !== "negative-verified" || row.coverage.negativeConstraintVerified !== true
        : row.coverage.status !== "generated" || row.coverage.exactEvidenceCompared !== true);
    const unresolved = policyViolations;
    return {
        audit: "classical-lessons24-25-complete-examples",
        authorityBoundary: "Canvas rows and bounded source reconstructions are evidence only. The shared execution index builds canonical typed source/profile possibilities before target queries; canonical ESM grammar frames, options, operations, and finalizers alone authorize generation, and printed targets never select routes.",
        completionPolicy: "Each of the 225 positive rows must compare its full printed source and result against canonical typed output; the two negative rows must separately prove their forbidden routes absent. Structural-only and surface-only matches fail.",
        total: rows.length,
        counts,
        complete: rows.length === 227
            && counts.positiveExact === 225
            && counts.negativeVerified === 2
            && policyViolations.length === 0,
        byLesson: summarizeRows(rows, "lesson"),
        bySection: summarizeRows(rows, "section"),
        byLayer: summarizeRows(rows, "layer"),
        byEvidenceStatus: summarizeRows(rows, "evidenceStatus"),
        executionIndex: indexed.index,
        timing: Object.freeze({
            totalMs: indexed.index.elapsedMs,
            byLayer: indexed.index.byLayer,
        }),
        policyViolations,
        unresolved,
        rows,
    };
}

function printSummary(report) {
    process.stdout.write(`${report.audit}: ${report.counts.positiveExact}/225 positive exact; ${report.counts.negativeVerified}/2 negative verified; ${report.counts.surfaceMismatch} surface mismatches; ${report.counts.missing} missing; ${report.policyViolations.length} policy violations\n`);
    process.stdout.write("sections:\n");
    for (const [section, counts] of Object.entries(report.bySection)) {
        process.stdout.write(`  ${section}: ${counts.positiveExact} positive exact, ${counts.negativeVerified} negative verified, ${counts.surfaceMismatch} surface-mismatch, ${counts.missing} missing, ${counts.policyViolations} policy violations\n`);
    }
    process.stdout.write("layers:\n");
    for (const [layer, counts] of Object.entries(report.byLayer)) {
        process.stdout.write(`  ${layer}: ${counts.positiveExact} positive exact, ${counts.negativeVerified} negative verified, ${counts.surfaceMismatch} surface-mismatch, ${counts.missing} missing, ${counts.policyViolations} policy violations\n`);
    }
    process.stdout.write(`shared index: ${report.executionIndex.uniqueGenerationKeyCount} generation keys; ${report.executionIndex.indexedRelationSourceProfileCount} canonical source/profile signatures; ${report.executionIndex.indexedRelationCount} signed relations; ${report.executionIndex.generationBuildViolations.length} duplicate indexed builds\n`);
    process.stdout.write("timing by layer (generation / matching / combined / total ms):\n");
    for (const [layer, timing] of Object.entries(report.timing.byLayer)) {
        process.stdout.write(`  ${layer}: ${timing.generationMs} / ${timing.matchingMs} / ${timing.combinedMs} / ${timing.totalMs}\n`);
    }
}

if (require.main === module) {
    runAudit().then(report => {
        if (process.argv.includes("--summary")) printSummary(report);
        else process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
        if (!report.complete) process.exitCode = 1;
    }).catch(error => {
        process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
        process.exit(1);
    });
}

module.exports = {
    buildClassicalLessons2425AuditPlan,
    coverExamplesWithSharedIndex,
    coverExample,
    createClassicalLessons2425AuditExecutionIndex,
    lastParenthesized,
    parenthesizedValues,
    runAudit,
    shapeKey,
    surfaceKey,
};
