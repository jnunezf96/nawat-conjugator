"use strict";

const { createSuite } = require("./runner");

function buildSource(ctx, stem, verbClass, sourceValence) {
    const objectKind = {
        "specific-projective": "specific-projective",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman",
    }[sourceValence] || "none";
    return ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind,
        objectPerson: objectKind === "specific-projective" ? "3sg" : "",
    });
}

function buildMultipleObjectSource(ctx, stem, verbClass) {
    const lower = buildSource(ctx, stem, verbClass, "projective-human");
    return ctx.buildClassicalNahuatlLesson23MultipleObjectVncFrame(lower, {
        objectRequests: [{
            objectId: "source-object-1",
            objectKind: "nonspecific-human",
            objectPerson: "",
            governor: "directive",
            derivationalLevel: 1,
        }, {
            objectId: "source-object-2",
            objectKind: "nonspecific-nonhuman",
            objectPerson: "",
            governor: "directive",
            derivationalLevel: 2,
        }],
    });
}

const STEM_RELATION_CASES = Object.freeze([
    ["l24-042", "mī-ni", "B", "intransitive", "*(mi-ī-ni) > (mī-ni) > tla-(mī-n-a)"],
    ["l24-043", "xī-ni", "B", "intransitive", "*(xi-ī-ni) > (xī-ni) > tla-(xī-ni-ā)"],
    ["l24-044", "cē-hui", "B", "intransitive", "*(ce-ē-hui) > (cē-hui) > tla-(cē-hui-ā)"],
    ["l25-098", "itqui", "A", "projective-nonhuman", "tla-(itqui) > (itqui-hua) > tē+tla-(itqui-tiā)"],
    ["l25-099", "caqui", "B", "projective-nonhuman", "tla-(caqui) > *(caqui-hua) > tē+tla-(caquī-tiā)"],
    ["l25-105", "itt-a", "A", "projective-nonhuman", "tla-(itt-a) > *(itt-ī-hua) > tē+tla-(itt-ī-tiā)"],
    ["l25-106", "mati", "B", "projective-nonhuman", "tla-(mati) > *(machi-hua) > tē+tla-(machi-tiā)"],
    ["l25-117", "hue-tz-ca", "A", "projective-nonhuman", "tla-(hue-tz-ca) > tē+tla-(hue-tz-qui-tiā)"],
    ["l25-120", "quīza", "B", "intransitive", "(quīza) > (quix-o-hua) > tē-(quīx-tiā)"],
    ["l25-122", "cual-ā-ni", "B", "intransitive", "(cual-ā-ni) > (cual-ā-n-ō) > tē-(cual-ā-n-tiā)"],
    ["l25-125", "mati", "B", "projective-nonhuman", "tla-(mati) > *(mach-ō) > tē+tla-(mach-tiā)"],
    ["l25-134", "quēmi", "B", "projective-nonhuman", "tla-(quēmi) > *(quēm-o-hua) > tē+tla-(quēn-tiā)"],
    ["l25-135", "itt-a", "A", "projective-nonhuman", "tla-(itt-a) > (itt-a-lō) > tē+tla-(itt-a-l-tiā)"],
    ["l25-138", "chol-o-ā", "C", "intransitive", "(chol-o-ā) > (chol-o-lō) > tē-(chol-o-l-tiā)"],
    ["l25-143", "maca", "A", "multiple-object", "tē+tla-(maca) > *(maqui-lō) > tē+tē+tla-(maqui-l-tiā)"],
    ["l25-144", "caqui", "B", "projective-nonhuman", "tla-(caqui) > *(caqui-lō) > tē+tla-(caqui-l-tiā)"],
    ["l25-147", "tzacu-a", "B", "projective-nonhuman", "tla-(tzacu-a) > *(tzacu-i-lō) > tē+tla-(tzacu-i-l-tiā)"],
    ["l25-148", "imacaci", "B", "projective-human", "tē-(imacaci) > *(imacaxi-lō) > tē+tē-(imacaxi-l-tiā)"],
    ["l25-152", "mati", "B", "projective-nonhuman", "tla-(mati) > *(machi-lō) > tē+tla-(machi-l-tiā)"],
]);

function getCaquiSourceValence(objectKind = "") {
    return objectKind === "reflexive" ? "mainline-reflexive"
        : objectKind === "nonspecific-human" ? "projective-human"
            : objectKind === "nonspecific-nonhuman" ? "projective-nonhuman"
                : "specific-projective";
}

function buildRecursiveCaquiActiveSourceWithRequests(ctx, {
    subject = "1sg",
    objectRequests = [],
} = {}) {
    const first = objectRequests[0] || { objectKind: "specific-projective", objectPerson: "3sg" };
    const sourceValence = getCaquiSourceValence(first.objectKind);
    const lower = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("caquī-tiā", {
        subject,
        mood: "indicative",
        tense: "present",
        verbClass: "C",
        perfectiveClass: "C",
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: first.objectKind,
        objectPerson: first.objectKind === "specific-projective" ? first.objectPerson || "3sg" : "",
    });
    return ctx.buildClassicalNahuatlLesson23MultipleObjectVncFrame(lower, {
        objectRequests: objectRequests.map((request, index) => ({
            objectId: `source-object-${index + 1}`,
            objectKind: request.objectKind,
            objectPerson: request.objectKind === "specific-projective" || request.objectKind === "reflexive"
                ? request.objectPerson || ""
                : "",
            governor: index ? "causative" : "directive",
            derivationalLevel: index + 1,
        })),
    });
}

function buildRecursiveCaquiActiveSource(ctx) {
    return buildRecursiveCaquiActiveSourceWithRequests(ctx, {
        subject: "1sg",
        objectRequests: [
            { objectKind: "specific-projective", objectPerson: "3sg" },
            { objectKind: "nonspecific-human", objectPerson: "" },
        ],
    });
}

function buildRecursiveCaquiNonactiveSource(ctx, {
    voice = "passive",
    subject = "1sg",
    objectRequests = [{ objectKind: "specific-projective", objectPerson: "1sg" }],
} = {}) {
    const activeObjectRequests = objectRequests.map((request, index) => index === 0 && voice === "passive"
        ? { ...request, objectKind: "specific-projective", objectPerson: subject }
        : request);
    const active = activeObjectRequests.length > 1
        ? buildRecursiveCaquiActiveSourceWithRequests(ctx, {
            subject: "3sg",
            objectRequests: activeObjectRequests,
        })
        : ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("caquī-tiā", {
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            verbClass: "C",
            perfectiveClass: "C",
            valence: getCaquiSourceValence(activeObjectRequests[0]?.objectKind),
            transitivity: "transitive",
            objectKind: activeObjectRequests[0]?.objectKind || "specific-projective",
            objectPerson: activeObjectRequests[0]?.objectPerson || "",
        });
    const sourceValence = activeObjectRequests.length > 1
        ? "multiple-object"
        : getCaquiSourceValence(activeObjectRequests[0]?.objectKind);
    const inventory = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("caquī-tiā", {
        verbClass: "C",
        sourceValence,
    });
    const option = inventory.options.find((candidate) => candidate.nonactiveStem === "caquī-ti-lō");
    const record = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("caquī-tiā", {
        verbClass: "C",
        sourceValence,
        optionId: option.optionId,
    });
    return ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(active, {
        voice,
        nonactiveStemRecord: record,
        sourceObjectClusterFrame: activeObjectRequests.length > 1 ? active.multipleObjectClusterFrame : undefined,
        sourceValence,
        sourceSubject: "3sg",
        sourceObjectPerson: voice === "passive" ? subject : "",
        mood: "indicative",
        tense: "present",
        verbClass: "C",
    });
}

function buildRecursiveCaquiPassiveSource(ctx) {
    return buildRecursiveCaquiNonactiveSource(ctx);
}

function run(ctx = {}) {
    const s = createSuite("classical_lessons24_25_engine_failure_groups");
    const rowFrames = STEM_RELATION_CASES.map(([id, stem, verbClass, valence, expectedRelation]) => {
        const source = valence === "multiple-object"
            ? buildMultipleObjectSource(ctx, stem, verbClass)
            : buildSource(ctx, stem, verbClass, valence);
        const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "causative" });
        const schematic = ctx.getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(source, inventory);
        const possibility = schematic.possibilities.find((candidate) => candidate.relationRealization === expectedRelation) || null;
        return { id, expectedRelation, source, inventory, schematic, possibility };
    });

    s.eq("the 19 assigned stem rows are exact signed engine projections", rowFrames.map((row) => ({
        id: row.id,
        sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(row.source),
        inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(row.inventory),
        schematicCanonical: ctx.isClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(row.schematic),
        exact: row.possibility?.relationRealization || "",
        operationCanonical: row.possibility ? ctx.isClassicalNahuatlVncDerivationOperationFrame(row.possibility.operationFrame) : false,
        catalogTargetAuthority: row.possibility?.catalogTargetAuthority,
    })), rowFrames.map((row) => ({
        id: row.id,
        sourceCanonical: true,
        inventoryCanonical: true,
        schematicCanonical: true,
        exact: row.expectedRelation,
        operationCanonical: true,
        catalogTargetAuthority: false,
    })));

    const activeQuantityNeighborSpecs = [
        ["l25-199", "nimitzcaquītia", "1sg", [["specific-projective", "3sg"], ["specific-projective", "2sg"]]],
        ["l25-200", "niquincaquītia", "1sg", [["specific-projective", "3sg"], ["specific-projective", "3pl"]]],
        ["l25-201", "nictlacaquītia", "1sg", [["specific-projective", "3sg"], ["nonspecific-nonhuman", ""]]],
        ["l25-202", "nictēcaquītia", "1sg", [["specific-projective", "3sg"], ["nonspecific-human", ""]]],
        ["l25-203", "quimocaquītiah", "3pl", [["specific-projective", "3sg"], ["reflexive", "3pl"]]],
        ["l25-204", "nēchtlacaquītia", "3sg", [["specific-projective", "1sg"], ["nonspecific-nonhuman", ""]]],
        ["l25-205", "nimitzcaquītia", "1sg", [["specific-projective", "3sg"], ["specific-projective", "2sg"]]],
        ["l25-206", "nictēcaquītia", "1sg", [["specific-projective", "3sg"], ["nonspecific-human", ""]]],
        ["l25-207", "niquintlacaquītia", "1sg", [["specific-projective", "3pl"], ["nonspecific-nonhuman", ""]]],
        ["l25-208", "nitētlacaquītia", "1sg", [["nonspecific-human", ""], ["nonspecific-nonhuman", ""]]],
    ];
    const activeQuantityNeighbors = activeQuantityNeighborSpecs.map(([id, expected, subject, requests]) => {
        const source = buildRecursiveCaquiActiveSourceWithRequests(ctx, {
            subject,
            objectRequests: requests.map(([objectKind, objectPerson]) => ({ objectKind, objectPerson })),
        });
        const finite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(source);
        return {
            id,
            canonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source)
                && ctx.isClassicalNahuatlVncFiniteSurfaceFrame(finite),
            source: finite.wordRealization,
            expected,
        };
    });
    const nonactiveQuantityNeighborSpecs = [
        ["l25-209", "nicaquitīlo", "passive", "1sg", [["specific-projective", "1sg"]]],
        ["l25-210", "nitlacaquitīlo", "passive", "1sg", [["specific-projective", "1sg"], ["nonspecific-nonhuman", ""]]],
        ["l25-211", "tētlacaquitīlo", "impersonal", "3sg", [["nonspecific-human", ""], ["nonspecific-nonhuman", ""]]],
    ];
    const nonactiveQuantityNeighbors = nonactiveQuantityNeighborSpecs.map(([id, expected, voice, subject, requests]) => {
        const source = buildRecursiveCaquiNonactiveSource(ctx, {
            voice,
            subject,
            objectRequests: requests.map(([objectKind, objectPerson]) => ({ objectKind, objectPerson })),
        });
        const finite = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(source);
        return {
            id,
            canonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source)
                && ctx.isClassicalNahuatlVncFiniteSurfaceFrame(finite),
            source: finite.wordRealization,
            expected,
        };
    });
    s.eq("the ten active caquītia sources and three passive or impersonal caquitīlo neighbors remain exact",
        [...activeQuantityNeighbors, ...nonactiveQuantityNeighbors],
        [...activeQuantityNeighborSpecs, ...nonactiveQuantityNeighborSpecs].map(([id, expected]) => ({
            id,
            canonical: true,
            source: expected,
            expected,
        })));

    const activeSource = buildRecursiveCaquiActiveSource(ctx);
    const activeSurface = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(activeSource);
    const activeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(activeSource, { derivationType: "causative" });
    const activeOption = activeInventory.options.find((candidate) => candidate.targetStem === "caqui-ti-l-tiā");
    const activeOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(activeSource, {
        derivationType: "causative",
        optionId: activeOption.optionId,
        targetSubject: "2sg",
    });
    const passiveSource = buildRecursiveCaquiPassiveSource(ctx);
    const passiveSurface = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(passiveSource);
    const passiveInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(passiveSource, { derivationType: "causative" });
    const passiveOption = passiveInventory.options.find((candidate) => candidate.targetStem === "caqui-ti-l-tiā");
    const passiveOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(passiveSource, {
        derivationType: "causative",
        optionId: passiveOption.optionId,
        targetSubject: "2sg",
        causativeSpecificShuntlineRealization: "sounded",
    });
    const activeAlternativeSource = ctx.buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(activeOperation);
    const passiveAlternativeSource = ctx.buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(passiveOperation);
    const registry = ctx.getDefaultGrammarContractRegistry();
    s.eq("the lower source quantity remains generic until the signed l25-212 alternative-source projection", {
        genericActiveSource: activeSurface.wordRealization,
        activeCanonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(activeSurface),
        alternativeActiveSource: activeAlternativeSource.sourceWordRealization,
        activeOperationStatus: activeOperation.authorizationStatus,
        activeOperationReason: activeOperation.blockReason,
        activeAlternativeStatus: activeAlternativeSource.authorizationStatus,
        activeAlternativeReason: activeAlternativeSource.blockReason,
        activeAlternativeCanonical: ctx.isClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(activeAlternativeSource),
        genericPassiveSource: passiveSurface.wordRealization,
        passiveCanonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(passiveSurface),
        alternativePassiveSource: passiveAlternativeSource.sourceWordRealization,
        passiveAlternativeCanonical: ctx.isClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(passiveAlternativeSource),
        activeTarget: activeOperation.targetStem,
        activeOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(activeOperation),
        passiveTarget: passiveOperation.targetStem,
        passiveOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(passiveOperation),
        registeredDefinition: Boolean(ctx.getGrammarContractDefinition(registry, activeAlternativeSource.kind, 1)),
        activeRegistered: ctx.isRegisteredGrammarContract(registry, activeAlternativeSource, { contractKind: activeAlternativeSource.kind, version: 1 }),
        passiveRegistered: ctx.isRegisteredGrammarContract(registry, passiveAlternativeSource, { contractKind: passiveAlternativeSource.kind, version: 1 }),
    }, {
        genericActiveSource: "nictēcaquītia",
        activeCanonical: true,
        alternativeActiveSource: "nictēcaquitīa",
        activeOperationStatus: "authorized",
        activeOperationReason: "",
        activeAlternativeStatus: "authorized",
        activeAlternativeReason: "",
        activeAlternativeCanonical: true,
        genericPassiveSource: "nicaquitīlo",
        passiveCanonical: true,
        alternativePassiveSource: "nicaquitīlo",
        passiveAlternativeCanonical: true,
        activeTarget: "caqui-ti-l-tiā",
        activeOperationCanonical: true,
        passiveTarget: "caqui-ti-l-tiā",
        passiveOperationCanonical: true,
        registeredDefinition: true,
        activeRegistered: true,
        passiveRegistered: true,
    });

    const hostileRow = rowFrames.find((row) => row.id === "l25-122");
    const hostilePossibility = {
        ...hostileRow.possibility,
        citationRealization: "caller-owned-target",
        relationRealization: `${hostileRow.possibility.sourceHistoryRealization} > caller-owned-target`,
    };
    const hostileSchematic = {
        ...hostileRow.schematic,
        possibilities: hostileRow.schematic.possibilities.map((possibility) => (
            possibility === hostileRow.possibility ? hostilePossibility : possibility
        )),
    };
    const callerTargetOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(passiveSource, {
        derivationType: "causative",
        optionId: passiveOption.optionId,
        targetSubject: "2sg",
        causativeSpecificShuntlineRealization: "sounded",
        targetStem: "caller-owned-target",
    });
    const copiedHostileAlternativeSource = {
        ...activeAlternativeSource,
        sourceWordRealization: "caller-owned-source",
    };
    const injectedAlternativeSource = ctx.buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(activeOperation, {
        sourceWordRealization: "caller-owned-source",
    });
    const sectionOnlyAlternativeSource = ctx.buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(
        hostileRow.possibility.operationFrame,
        { section: "25.13" },
    );
    s.eq("caller target strings cannot select or mutate a typed route", {
        hostileProjectionAccepted: ctx.isClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(hostileSchematic),
        injectedTarget: callerTargetOperation.targetStem,
        injectedOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(callerTargetOperation),
        copiedHostileOperationAccepted: ctx.isClassicalNahuatlVncDerivationOperationFrame({
            ...passiveOperation,
            targetStem: "caller-owned-target",
        }),
        copiedAlternativeSourceAccepted: ctx.isClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(copiedHostileAlternativeSource),
        injectedAlternativeSourceStatus: injectedAlternativeSource.authorizationStatus,
        injectedAlternativeSourceReason: injectedAlternativeSource.blockReason,
        injectedAlternativeSourceRejectedFields: injectedAlternativeSource.rejectedAuthorityFields,
        sectionOnlyAlternativeSourceStatus: sectionOnlyAlternativeSource.authorizationStatus,
        sectionOnlyAlternativeSourceReason: sectionOnlyAlternativeSource.blockReason,
    }, {
        hostileProjectionAccepted: false,
        injectedTarget: "caqui-ti-l-tiā",
        injectedOperationCanonical: true,
        copiedHostileOperationAccepted: false,
        copiedAlternativeSourceAccepted: false,
        injectedAlternativeSourceStatus: "blocked",
        injectedAlternativeSourceReason: "classical-lesson25-13-caller-supplied-surface-authority-rejected",
        injectedAlternativeSourceRejectedFields: ["sourceWordRealization"],
        sectionOnlyAlternativeSourceStatus: "blocked",
        sectionOnlyAlternativeSourceReason: "classical-lesson25-13-canonical-recursive-causative-operation-required",
    });

    return s;
}

module.exports = { run };
