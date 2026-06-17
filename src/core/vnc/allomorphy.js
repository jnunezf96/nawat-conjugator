// core/vnc/allomorphy.js
// Nonspecific Object Allomorphy: VNC generation, morphophonology, derivation.
// Extracted from script.js Nonspecific Object Allomorphy section (post-Phase-5c lines 3129–12980).
// Global-scope module: all functions defined directly on the global object.
// Note: VERB_DERIVED_NOMINAL_KIND changed to var in script.js (referenced by nnc.js).
// All other top-level const declarations stay as intra-file closures.
// Deps (resolved at call time): all globals in global scope from script.js.

"use strict";

function normalizeVncAllomorphyContractSurfaceValue(value = "") {
    if (typeof normalizeGrammarSurfaceValue === "function") {
        return normalizeGrammarSurfaceValue(value);
    }
    const text = String(value || "").trim();
    return text === "—" ? "" : text;
}

function splitVncAllomorphyContractSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeVncAllomorphyContractSurfaceValue(entry))
        .filter(Boolean);
}

function getVncAllomorphyContractGrammarFrame(record = null, options = {}) {
    const optionFrame = options?.grammarFrame && typeof options.grammarFrame === "object"
        ? options.grammarFrame
        : (options?.frames && typeof options.frames === "object" ? options.frames : null);
    const recordFrame = record?.grammarFrame && typeof record.grammarFrame === "object"
        ? record.grammarFrame
        : (record?.frames && typeof record.frames === "object" ? record.frames : null);
    return optionFrame || recordFrame || null;
}

function getVncAllomorphyContractResultFrame(record = null, options = {}) {
    const grammarFrame = getVncAllomorphyContractGrammarFrame(record, options);
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
}

function getVncAllomorphyContractSurfaceForms(record = null, options = {}) {
    const node = record && typeof record === "object" ? record : {};
    const resultFrame = getVncAllomorphyContractResultFrame(node, options);
    const hasResultFrame = Boolean(resultFrame);
    const orthographyFrame = options?.orthographyFrame && typeof options.orthographyFrame === "object"
        ? options.orthographyFrame
        : null;
    const targetContract = options?.targetContract && typeof options.targetContract === "object"
        ? options.targetContract
        : null;
    const forms = [];
    if (Array.isArray(resultFrame?.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
    }
    if (resultFrame?.surface) {
        forms.push(resultFrame.surface);
    }
    if (hasResultFrame) {
        return forms
            .flatMap((entry) => splitVncAllomorphyContractSurfaceText(entry))
            .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    if (!hasResultFrame && Array.isArray(options?.surfaceForms)) {
        forms.push(...options.surfaceForms);
    }
    if (!hasResultFrame && options?.surface) {
        forms.push(options.surface);
    }
    if (!hasResultFrame && Array.isArray(orthographyFrame?.surfaceForms)) {
        forms.push(...orthographyFrame.surfaceForms);
    }
    if (!hasResultFrame && orthographyFrame?.surface) {
        forms.push(orthographyFrame.surface);
    }
    if (!hasResultFrame && Array.isArray(node.surfaceForms)) {
        forms.push(...node.surfaceForms);
    }
    if (!hasResultFrame && node.surface) {
        forms.push(node.surface);
    }
    if (!hasResultFrame && node.outputSurface) {
        forms.push(node.outputSurface);
    }
    if (!hasResultFrame && node.selectedOutputSurface) {
        forms.push(node.selectedOutputSurface);
    }
    if (!hasResultFrame && node.nawatSurfaceSuffix) {
        forms.push(node.nawatSurfaceSuffix);
    }
    if (!hasResultFrame && targetContract?.outputSurface) {
        forms.push(targetContract.outputSurface);
    }
    if (!hasResultFrame && targetContract?.selectedOutputSurface) {
        forms.push(targetContract.selectedOutputSurface);
    }
    if (!hasResultFrame && node.result) {
        forms.push(node.result);
    }
    return forms
        .flatMap((entry) => splitVncAllomorphyContractSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function getVncAllomorphyContractSurface(record = null, options = {}) {
    return getVncAllomorphyContractSurfaceForms(record, options)[0] || "";
}

function getVncAllomorphyContractSourceInput(record = null, options = {}) {
    const node = record && typeof record === "object" ? record : {};
    const resultFrame = getVncAllomorphyContractResultFrame(node, options);
    if (resultFrame) {
        return normalizeVncAllomorphyContractSurfaceValue(
            resultFrame.sourceInput
            || getVncAllomorphyContractSurface(node, options)
            || ""
        );
    }
    return normalizeVncAllomorphyContractSurfaceValue(
        options.sourceInput
        || node.sourceStem
        || node.stem
        || node.sourceSuffix
        || node.selectedOutputSurface
        || ""
    );
}

function getVncAllomorphySourceSurfaceForms(record = null, options = {}) {
    const node = record && typeof record === "object" ? record : {};
    const resultFrame = getVncAllomorphyContractResultFrame(node, options);
    const frameFirstForms = getVncAllomorphyContractSurfaceForms(node, options);
    if (frameFirstForms.length || resultFrame) {
        return frameFirstForms;
    }
    return (Array.isArray(node.forms) ? node.forms : [])
        .flatMap((entry) => splitVncAllomorphyContractSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function attachVncAllomorphyGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    const node = record && typeof record === "object" ? record : {};
    const curriculumRef = node.curriculumRef && typeof node.curriculumRef === "object"
        ? node.curriculumRef
        : {};
    const range = String(options.range || curriculumRef.range || "").trim();
    const structuralSource = String(options.structuralSource || (range ? `Andrews ${range}` : "Andrews Lessons 37-39")).trim();
    const supported = Object.prototype.hasOwnProperty.call(options, "supported")
        ? options.supported === true
        : (node.supported === true || node.allowed === true);
    const diagnostics = [
        ...(Array.isArray(node.diagnostics) ? node.diagnostics : []),
        ...(Array.isArray(options.diagnostics) ? options.diagnostics : []),
    ];
    const surfaceForms = getVncAllomorphyContractSurfaceForms(node, options);
    const surface = surfaceForms[0] || "";
    const resultFrame = getVncAllomorphyContractResultFrame(node, options);
    const hasResultFrame = Boolean(resultFrame);
    const sourceInput = getVncAllomorphyContractSourceInput(node, options);
    const orthographyFrame = options.orthographyFrame || {
        spellingAuthority: "Nawat/Pipil output spelling",
        noClassicalSurfaceImport: true,
    };
    const resolvedOrthographyFrame = {
        ...orthographyFrame,
        surface: hasResultFrame
            ? surface
            : normalizeVncAllomorphyContractSurfaceValue(orthographyFrame.surface || surface),
        surfaceForms: hasResultFrame
            ? surfaceForms
            : (Array.isArray(orthographyFrame.surfaceForms) && orthographyFrame.surfaceForms.length
            ? getVncAllomorphyContractSurfaceForms({
                surfaceForms: orthographyFrame.surfaceForms,
                surface: orthographyFrame.surface,
            })
            : surfaceForms),
    };
    const rawStemFrame = options.stemFrame || {
        stemKind: String(options.stemKind || node.kind || "vnc-allomorphy-contract"),
        sourceStem: String(node.sourceStem || node.stem || ""),
        targetStem: String(node.outputStem || ""),
        sourceSuffix: String(node.sourceSuffix || ""),
    };
    const resolvedStemFrame = {
        ...rawStemFrame,
        sourceStem: hasResultFrame ? sourceInput : String(rawStemFrame.sourceStem || ""),
        targetStem: hasResultFrame ? surface : String(rawStemFrame.targetStem || ""),
        sourceSuffix: hasResultFrame ? "" : String(rawStemFrame.sourceSuffix || ""),
    };
    const rawTargetContract = options.targetContract || {
        metadataKind: String(options.metadataKind || node.kind || "vnc-allomorphy-contract"),
        generationAllowed: false,
        supported,
        allowed: node.allowed === true,
        outputSurface: String(node.outputSurface || node.selectedOutputSurface || ""),
    };
    const resolvedTargetContract = {
        ...rawTargetContract,
        outputSurface: hasResultFrame ? surface : String(rawTargetContract.outputSurface || ""),
        selectedOutputSurface: hasResultFrame ? surface : String(rawTargetContract.selectedOutputSurface || ""),
        surface: hasResultFrame
            ? surface
            : normalizeVncAllomorphyContractSurfaceValue(rawTargetContract.surface || ""),
        surfaceForms: hasResultFrame
            ? surfaceForms
            : (Array.isArray(rawTargetContract.surfaceForms)
                ? getVncAllomorphyContractSurfaceForms({ surfaceForms: rawTargetContract.surfaceForms })
                : []),
    };
    return attachGrammarMetadataContract({
        ...node,
        surfaceForms,
    }, {
        enumerable: false,
        unitKind: "vnc-allomorphy-contract",
        metadataKind: String(options.metadataKind || node.kind || "vnc-allomorphy-contract"),
        routeFamily: String(options.routeFamily || "vnc-allomorphy"),
        routeStage: String(options.routeStage || "classify-contract"),
        generationAllowed: false,
        supported,
        structuralSource,
        andrewsRefs: [structuralSource],
        diagnostics,
        sourceInput,
        evidenceStatus: supported ? "contract-supported" : "contract-blocked",
        surface,
        surfaceForms,
        orthographyFrame: resolvedOrthographyFrame,
        morphBoundaryFrame: options.morphBoundaryFrame || node,
        stemFrame: resolvedStemFrame,
        targetContract: resolvedTargetContract,
    });
}

function cloneVncAllomorphyLessonRecord(record = null) {
    return JSON.parse(JSON.stringify(record || null));
}

const LESSON20_NONACTIVE_VALIDATION_REFS = Object.freeze([
    "src/tests/derivation.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON20_NONACTIVE_PDF_REFS = Object.freeze([
    "Andrews Lesson 20.1",
    "Andrews Lesson 20.2",
    "Andrews Lesson 20.3",
    "Andrews Lesson 20.4",
    "Andrews Lesson 20.5",
    "Andrews Lesson 20.6",
    "Andrews Lesson 20.7",
    "Andrews Lesson 20.8",
]);

const LESSON20_NONACTIVE_SUFFIX_BRIDGE = Object.freeze([
    Object.freeze({ andrews: "o", nawat: "u", family: "plain-o" }),
    Object.freeze({ andrews: "lo", nawat: "lu", family: "lo" }),
    Object.freeze({ andrews: "hua", nawat: "wa", family: "hua" }),
    Object.freeze({ andrews: "o-hua", nawat: "uwa", family: "o-hua" }),
    Object.freeze({ andrews: "lo-hua", nawat: "luwa", family: "lo-hua" }),
    Object.freeze({ andrews: "hua-lo", nawat: "walu", family: "hua-lo" }),
]);

const LESSON20_NONACTIVE_OVERVIEW_FRAME = Object.freeze({
    kind: "lesson-20-nonactive-overview-frame",
    sourceSection: "Andrews 20.1",
    derivationSource: "imperfective active stem",
    derivedUnit: "nonactive verbstem",
    suffixFamilies: Object.freeze(["u", "lu", "wa", "uwa", "luwa", "walu"]),
    perfectiveNonactiveSource: "imperfective nonactive stem",
    vncUseDeferredTo: Object.freeze(["Andrews Lesson 21", "Andrews Lesson 22"]),
    misleadingTraditionalSpellings: Object.freeze(["oa", "loa"]),
    generationAllowed: true,
});

const LESSON20_NONACTIVE_LU_FRAME = Object.freeze({
    kind: "lesson-20-lu-frame",
    sourceSections: Object.freeze(["Andrews 20.2"]),
    andrewsSuffix: "lo",
    nawatSuffix: "lu",
    frequency: "most frequent nonactive formative",
    mainSource: "transitive verbstems ending in a",
    intransitiveSource: "Class C intransitives may also use this suffix",
    sourceStemShape: "future-tense imperfective active stem, except Class D",
    rootPlusYaBehavior: "some Class B root-plus-ya verbs drop ya before suffix",
    classCBehavior: "base-final o and i lengthen before the suffix in Andrews notation",
    classDBehavior: "final a has reduced-long pronunciation before suffix",
    generationAllowed: true,
});

const LESSON20_NONACTIVE_LUWA_FRAME = Object.freeze({
    kind: "lesson-20-luwa-frame",
    sourceSections: Object.freeze(["Andrews 20.3"]),
    andrewsSuffix: "lo-hua",
    nawatSuffix: "luwa",
    frequency: "small number of verbstems",
    irregularIntransitivesUseSuppletiveStem: true,
    compoundStemAttachment: "attached to first member of certain compound stems",
    generationAllowed: true,
});

const LESSON20_NONACTIVE_U_FRAME = Object.freeze({
    kind: "lesson-20-u-frame",
    sourceSections: Object.freeze(["Andrews 20.4"]),
    andrewsSuffix: "o",
    nawatSuffix: "u",
    sourceFinals: Object.freeze(["ka", "ki", "na", "ni", "sa", "si", "kwi", "ta", "ti"]),
    deletesSourceFinalVowel: true,
    baseIsReplaciveImperfective: true,
    notPerfectiveStemDespiteSurfaceIdentity: true,
    soundCorrespondencesAsNawat: Object.freeze([
        Object.freeze({ from: "s", to: "sh" }),
        Object.freeze({ from: "kw", to: "k" }),
        Object.freeze({ from: "t", to: "ch", condition: "ti/ta subfamilies where licensed" }),
    ]),
    variantLuAllowedForSomeNaNiSa: true,
    generationAllowed: true,
});

const LESSON20_NONACTIVE_UWA_FRAME = Object.freeze({
    kind: "lesson-20-uwa-frame",
    sourceSections: Object.freeze(["Andrews 20.5"]),
    andrewsSuffix: "o-hua",
    nawatSuffix: "uwa",
    mainSource: "active intransitive source",
    sourceFinals: Object.freeze(["ka", "ki", "sa", "si", "wa", "wi", "mi", "ni", "tzi"]),
    deletesSourceFinalVowel: true,
    deletesBaseFinalWWithCompensation: true,
    soundCorrespondencesAsNawat: Object.freeze([
        Object.freeze({ from: "s", to: "sh" }),
        Object.freeze({ from: "tz", to: "ch" }),
    ]),
    exceptionsRequireLexicalOrRuleEvidence: true,
    generationAllowed: true,
});

const LESSON20_NONACTIVE_WA_WALU_FRAME = Object.freeze({
    kind: "lesson-20-wa-walu-frame",
    sourceSections: Object.freeze(["Andrews 20.6", "Andrews 20.7"]),
    wa: Object.freeze({
        andrewsSuffix: "hua",
        nawatSuffix: "wa",
        sourceFinals: Object.freeze(["i", "o"]),
        mainlyIntransitive: true,
        someTransitivesUseIt: true,
        finalOOftenMisleadinglySpelledA: true,
    }),
    walu: Object.freeze({
        andrewsSuffix: "hua-lo",
        nawatSuffix: "walu",
        freeVariantOfWa: true,
        lessFrequent: true,
    }),
    generationAllowed: true,
});

const LESSON20_NONACTIVE_CLASS_FRAME = Object.freeze({
    kind: "lesson-20-class-frame",
    sourceSections: Object.freeze(["Andrews 20.8"]),
    classMembership: "Class A-2",
    appliesRegardlessOfActiveSourceClass: true,
    finalOSuffixes: Object.freeze(["lo", "o", "hua-lo"]),
    nawatFinalUSuffixes: Object.freeze(["lu", "u", "walu"]),
    longFinalVowelBoundary: "Andrews final o length is not a separate Nawat spelling surface",
    perfectiveBuiltLikeClassA2: true,
    generationAllowed: true,
});

const LESSON20_NONACTIVE_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({
        id: "lesson20-nonactive-derivation",
        andrewsSection: "20.1",
        category: "nonactive-verbstem-derivation",
        directiveEs: "El tronco no activo se deriva de un tronco activo imperfectivo con familias u, lu, wa, uwa, luwa o walu; su uso en CNV queda para Lecciones 21-22.",
        engineSurface: "nonactive source and suffix family metadata",
        implementationState: "implemented",
    }),
    Object.freeze({
        id: "lesson20-lu-suffix",
        andrewsSection: "20.2",
        category: "lu-suffix",
        directiveEs: "El sufijo lu corresponde a Andrews lo y se adjunta sobre todo a fuentes transitivas en a, con rutas para Clase C, raiz+ya y Clase D.",
        engineSurface: "lu nonactive option family",
        implementationState: "implemented",
    }),
    Object.freeze({
        id: "lesson20-luwa-combination",
        andrewsSection: "20.3",
        category: "luwa-suffix-combination",
        directiveEs: "La combinacion luwa corresponde a Andrews lo-hua y cubre un grupo pequeno, incluidas rutas supletivas e insercion en compuestos.",
        engineSurface: "luwa nonactive option family",
        implementationState: "implemented",
    }),
    Object.freeze({
        id: "lesson20-u-suffix",
        andrewsSection: "20.4",
        category: "u-suffix",
        directiveEs: "El sufijo u corresponde a Andrews o; usa base imperfectiva reemplazante con borrado de vocal final y cambios como s->sh o kw->k.",
        engineSurface: "u nonactive option family",
        implementationState: "implemented",
    }),
    Object.freeze({
        id: "lesson20-uwa-combination",
        andrewsSection: "20.5",
        category: "uwa-suffix-combination",
        directiveEs: "La combinacion uwa corresponde a Andrews o-hua; deriva sobre todo de fuentes intransitivas con borrado de vocal final y cambios segmentales.",
        engineSurface: "uwa nonactive option family",
        implementationState: "implemented",
    }),
    Object.freeze({
        id: "lesson20-wa-suffix",
        andrewsSection: "20.6",
        category: "wa-suffix",
        directiveEs: "El sufijo wa corresponde a Andrews hua; se asocia principalmente con fuentes intransitivas en i u o, pero admite algunas transitivas.",
        engineSurface: "wa nonactive option family",
        implementationState: "implemented",
    }),
    Object.freeze({
        id: "lesson20-walu-combination",
        andrewsSection: "20.7",
        category: "walu-suffix-combination",
        directiveEs: "La combinacion walu corresponde a Andrews hua-lo y funciona como variante libre menos frecuente de wa.",
        engineSurface: "walu nonactive option family",
        implementationState: "implemented",
    }),
    Object.freeze({
        id: "lesson20-nonactive-class-membership",
        andrewsSection: "20.8",
        category: "nonactive-class-membership",
        directiveEs: "Todo tronco no activo pertenece a Clase A-2 sin importar la clase de la fuente activa.",
        engineSurface: "Class A-2 nonactive perfective routing",
        implementationState: "implemented",
    }),
]);

function getLesson20NonactiveSubsectionInventory() {
    return LESSON20_NONACTIVE_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON20_NONACTIVE_VALIDATION_REFS),
    }));
}

function buildLesson20NonactivePursuitFrame() {
    const subsectionInventory = getLesson20NonactiveSubsectionInventory();
    const overviewFrame = cloneVncAllomorphyLessonRecord(LESSON20_NONACTIVE_OVERVIEW_FRAME);
    const suffixBridge = LESSON20_NONACTIVE_SUFFIX_BRIDGE.map((entry) => ({ ...entry }));
    const luFrame = cloneVncAllomorphyLessonRecord(LESSON20_NONACTIVE_LU_FRAME);
    const luwaFrame = cloneVncAllomorphyLessonRecord(LESSON20_NONACTIVE_LUWA_FRAME);
    const uFrame = cloneVncAllomorphyLessonRecord(LESSON20_NONACTIVE_U_FRAME);
    const uwaFrame = cloneVncAllomorphyLessonRecord(LESSON20_NONACTIVE_UWA_FRAME);
    const waWaluFrame = cloneVncAllomorphyLessonRecord(LESSON20_NONACTIVE_WA_WALU_FRAME);
    const classMembershipFrame = cloneVncAllomorphyLessonRecord(LESSON20_NONACTIVE_CLASS_FRAME);
    const frame = {
        kind: "lesson-20-nonactive-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 20,
        aimStatus: "closest-pass",
        pdfRefs: Array.from(LESSON20_NONACTIVE_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-20-nonactive-verbstem-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 20.1-20.8 against current Nawat nonactive suffix families, imperfective-active source selection, suffix correspondences, exception boundaries, and Class A-2 routing.",
                andrewsRefs: Array.from(LESSON20_NONACTIVE_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON20_NONACTIVE_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-20-nonactive-verbstem-audit",
                result: "hit",
                correction: "Lesson 20 now carries subsection PDF refs, Spanish directives, Nawat suffix-family bridge metadata, source-stem boundaries, current engine option families, and Class A-2 routing evidence.",
                andrewsRefs: Array.from(LESSON20_NONACTIVE_PDF_REFS),
                feedbackRefs: Array.from(LESSON20_NONACTIVE_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        overviewFrame,
        suffixBridge,
        luFrame,
        luwaFrame,
        uFrame,
        uwaFrame,
        waWaluFrame,
        classMembershipFrame,
        currentEngineBoundary: {
            nonactiveGenerationImplemented: true,
            nawatSuffixFamilies: suffixBridge.map((entry) => entry.nawat),
            activeImperfectiveSourceRequired: true,
            perfectiveNonactiveUsesClassA2Routing: true,
            noClassicalSurfaceImport: true,
            vowelLengthIsNotIndependentNawatSpelling: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps: [],
        closestPass: true,
        generationAllowed: true,
    };
    if (typeof attachGrammarMetadataContract !== "function") {
        return frame;
    }
    return attachGrammarMetadataContract(frame, {
        enumerable: false,
        unitKind: "nonactive-verbstem",
        metadataKind: "lesson-20-nonactive-pursuit-frame",
        routeFamily: "vnc-allomorphy",
        routeStage: "audit-lesson-20",
        generationAllowed: false,
        supported: true,
        structuralSource: "Andrews Lesson 20",
        andrewsRefs: ["Andrews Lesson 20.1-20.8"],
        evidenceStatus: "direct-pdf-with-nawat-realization",
        sourceInput: "Andrews Lesson 20.1-20.8",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil output spelling",
            noClassicalSurfaceImport: true,
            suffixBridge,
        },
        morphBoundaryFrame: {
            overviewFrame,
            luFrame,
            luwaFrame,
            uFrame,
            uwaFrame,
            waWaluFrame,
            classMembershipFrame,
        },
        stemFrame: {
            stemKind: "nonactive-derived-verbstem",
            sourceStem: "imperfective active stem",
            targetStem: "nonactive stem",
            sourceSuffix: suffixBridge.map((entry) => entry.nawat).join("/"),
        },
        nuclearClauseFrame: {
            clauseKind: "verbal-nuclear-clause",
            nonactiveUseLessons: ["Andrews Lesson 21", "Andrews Lesson 22"],
            classMembership: classMembershipFrame.classMembership,
        },
        targetContract: {
            metadataKind: "lesson-20-nonactive-pursuit-frame",
            generationAllowed: false,
            closestPass: true,
            nonactiveGenerationImplemented: true,
            currentEngineFamilies: suffixBridge.map((entry) => entry.nawat),
        },
    });
}

const LESSON24_FIRST_TYPE_CAUSATIVE_VALIDATION_REFS = Object.freeze([
    "src/tests/derivation.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON24_FIRST_TYPE_CAUSATIVE_PDF_REFS = Object.freeze([
    "Andrews Lesson 24.1",
    "Andrews Lesson 24.2",
    "Andrews Lesson 24.3",
    "Andrews Lesson 24.4",
    "Andrews Lesson 24.5",
    "Andrews Lesson 24.6",
    "Andrews Lesson 24.7",
    "Andrews Lesson 24.8",
    "Andrews Lesson 24.9",
]);

const LESSON24_FINAL_VOWEL_VALENCE_FRAME = Object.freeze({
    kind: "lesson-24-final-vowel-valence-frame",
    sourceSection: "Andrews 24.1",
    finalVowels: Object.freeze(["i", "a", "o", "e"]),
    valencePredictableFromFinalVowel: false,
    majorityPattern: "many intransitive stems end in i and many directive stems end in a",
    exceptions: Object.freeze([
        "intransitive stems may end in a, o, or o-long",
        "directive stems may end in i",
        "nonactive stems in o-long or wa may be intransitive or transitive",
        "some directive a-stems have e variants",
    ]),
});

const LESSON24_VALENCE_NEUTRAL_FRAME = Object.freeze({
    kind: "lesson-24-valence-neutral-frame",
    sourceSection: "Andrews 24.2",
    violatesValencePrinciple: true,
    derivationalSuffixDeterminesShift: false,
    transitiveNormallyRequiresSpecificObject: true,
    normalMeaning: "applicative-like transitive member",
    exceptionalMeaning: "some i-final transitive members have causative meaning",
    nonactiveReflectsValenceNeutralVariant: true,
});

const LESSON24_TYPE_ONE_CAUSATIVE_FRAME = Object.freeze({
    kind: "lesson-24-type-one-causative-frame",
    sourceSection: "Andrews 24.3",
    causativeMorpheme: Object.freeze({ andrews: "a", nawat: "a" }),
    createsIntransitiveTransitivePair: true,
    sourceMustBeIntransitive: true,
    lengthPolicy: "short after consonants, long after vowels in Andrews notation",
    iFinalProcedures: Object.freeze([
        Object.freeze({
            id: "i-final-replacement",
            operation: "delete final i and add causative a",
            classOfDerivedStem: "Class B",
            mayReplaceFinalConsonant: true,
            meaningMayShift: true,
        }),
        Object.freeze({
            id: "i-final-addition",
            operation: "add causative a to the full intransitive stem",
            classOfDerivedStem: "Class C",
            lengthensAfterVowel: true,
        }),
    ]),
    aFinalProcedures: Object.freeze([
        Object.freeze({
            id: "a-final-non-ya-replacement",
            operation: "replace stem-final a with causative a",
            phonologicalContrastVisible: false,
            sourceClass: "Class A",
            derivedClass: "Class B",
        }),
        Object.freeze({
            id: "ya-final-replacement",
            operation: "replace derivational ya with causative a",
            sourceClass: "Class A or Class B",
            derivedClass: "Class C",
            exceptionsExist: true,
        }),
    ]),
});

const LESSON24_DESTOCKAL_ARCHITECTURE_FRAME = Object.freeze({
    kind: "lesson-24-destockal-architecture-frame",
    sourceSection: "Andrews 24.4",
    stockRank: "above root and below stem",
    stockCannotActAsStem: true,
    process: Object.freeze([
        "root-plus-stock-formative-creates-stock",
        "stock-plus-stem-formative-creates-intransitive-verbstem",
        "type-one-causative-creates-transitive-mate",
    ]),
    destockalTypes: Object.freeze(["ni-or-hui", "hua", "i-hui-or-a-hui"]),
});

const LESSON24_DESTOCKAL_NI_HUI_FRAME = Object.freeze({
    kind: "lesson-24-destockal-ni-hui-frame",
    sourceSection: "Andrews 24.5",
    stemFormatives: Object.freeze(["ni", "hui"]),
    stockFormativeLength: "long vowel normally harmonizes with the root vowel",
    intransitiveClass: "Class B",
    causativeSelection: Object.freeze({
        ni: "majority add a to full intransitive stem; a smaller set replaces final i",
        hui: "majority replace final i with causative a; a smaller set adds a",
    }),
    derivedClassPolicy: Object.freeze({
        "n-a": "Class B",
        "hu-a": "Class B",
        "ni-a": "Class C",
        "hui-a": "Class C",
    }),
    irregularCoalescedStocksExist: true,
});

const LESSON24_DESTOCKAL_HUA_FRAME = Object.freeze({
    kind: "lesson-24-destockal-hua-frame",
    sourceSection: "Andrews 24.6",
    stemFormative: "hua",
    stockFormatives: Object.freeze(["a", "e"]),
    nounstemMayBeDowngradedToNounroot: true,
    mayBeSynonymousWithHuiStem: true,
    intransitiveClassPolicy: "a-hua/e-hua usually Class A, sometimes Class A or B",
    causativeAlwaysReplacement: true,
    causativeShape: "hua becomes hu-a",
    derivedClass: "Class B",
});

const LESSON24_DESTOCKAL_IHUI_AHUI_FRAME = Object.freeze({
    kind: "lesson-24-destockal-ihui-ahui-frame",
    sourceSection: "Andrews 24.7",
    stemFormative: "hui",
    stockFormativeSelection: Object.freeze([
        Object.freeze({ rootVowels: Object.freeze(["e", "a"]), stockFormative: "i" }),
        Object.freeze({ rootVowels: Object.freeze(["i", "o"]), stockFormative: "a" }),
        Object.freeze({ afterRootFinal: "l", stockFormative: "i" }),
    ]),
    selectionContrastsWithLesson245: true,
    causativeOperation: "replace i-hui or a-hui with o-a",
    intransitiveClass: "Class B",
    derivedClass: "Class C",
    gapsAndIrregularRelationsExist: true,
});

const LESSON24_CAUSATIVE_VNC_GENERATION_FRAME = Object.freeze({
    kind: "lesson-24-causative-vnc-generation-frame",
    sourceSection: "Andrews 24.8",
    generatedObjectSources: Object.freeze([
        Object.freeze({
            source: "active intransitive VNC",
            causativeObject: "specific projective or reflexive object",
        }),
        Object.freeze({
            source: "impersonal intransitive VNC",
            causativeObject: "nonspecific projective object",
        }),
    ]),
    sourceSubjectBecomesCausativeObject: true,
    causativeSubjectImportedFromOutsideSource: true,
    sameTranslationCanHideMeaningDifference: true,
    responsibilityImplicationForReflexiveCausative: true,
});

const LESSON24_CAUSATIVE_A_CONTROL_FRAME = Object.freeze({
    kind: "lesson-24-causative-a-control-frame",
    sourceSection: "Andrews 24.9",
    causativeAControls: Object.freeze(["source subject", "source core"]),
    matrixStemAnalysisSuggested: true,
    possibleCompoundStemAnalysis: "causative a behaves as if it embeds the source VNC as incorporated object",
    sourceSubjectObjectivizationIsConsequence: true,
    compareLessons: Object.freeze(["Andrews Lesson 28.2", "Andrews Lesson 39.7.2"]),
});

const LESSON24_FIRST_TYPE_CAUSATIVE_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({
        id: "lesson24-final-vowel-valence",
        andrewsSection: "24.1",
        category: "final-vowel-valence-boundary",
        directiveEs: "La vocal final no predice por si sola la valencia; los patrones i/a son tendencias con excepciones.",
        engineSurface: "source-stem class, transitivity, and derivation gates",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
    }),
    Object.freeze({
        id: "lesson24-valence-neutral",
        andrewsSection: "24.2",
        category: "valence-neutral-verbstems",
        directiveEs: "Algunos troncos son neutrales de valencia y violan el principio de que el sufijo derivacional justifica el objeto.",
        engineSurface: "lexical/source evidence gates",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
    }),
    Object.freeze({
        id: "lesson24-type-one-causative",
        andrewsSection: "24.3",
        category: "type-one-causative-a",
        directiveEs: "El causativo tipo 1 usa a para convertir una fuente intransitiva en tronco transitivo por reemplazo o adicion.",
        engineSurface: "causative forward derivation options",
        implementationState: "partial",
        redirectAction: "refactor-engine",
    }),
    Object.freeze({
        id: "lesson24-destockal-architecture",
        andrewsSection: "24.4",
        category: "destockal-stock-architecture",
        directiveEs: "El destockal se construye en dos pasos: raiz a stock y stock a tronco; el stock no funciona como tronco independiente.",
        engineSurface: "stock-formative metadata and reverse derivation hints",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
    }),
    Object.freeze({
        id: "lesson24-destockal-ni-hui",
        andrewsSection: "24.5",
        category: "destockal-ni-hui",
        directiveEs: "Los destockales ni/hui usan vocal larga de stock, Clase B intransitiva y seleccion causativa por adicion o reemplazo.",
        engineSurface: "type-one causative choices and destockal hints",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
    }),
    Object.freeze({
        id: "lesson24-destockal-hua",
        andrewsSection: "24.6",
        category: "destockal-hua",
        directiveEs: "Los destockales hua usan stock a/e y su causativo siempre reemplaza hua por hu-a.",
        engineSurface: "Nawat wa/ua causative exceptions and source metadata",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
    }),
    Object.freeze({
        id: "lesson24-destockal-ihui-ahui",
        andrewsSection: "24.7",
        category: "destockal-ihui-ahui",
        directiveEs: "Los destockales i-hui/a-hui seleccionan stock al reves de 24.5 y forman causativo cambiando i-hui/a-hui a o-a.",
        engineSurface: "getDestockalWiReverseBaseSuffixes and ua route hints",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
    }),
    Object.freeze({
        id: "lesson24-causative-vnc-generation",
        andrewsSection: "24.8",
        category: "causative-vnc-generation",
        directiveEs: "La CNV causativa convierte el sujeto de la fuente en objeto causativo, y el sujeto causativo viene de fuera.",
        engineSurface: "object slot controls plus forwardDerivationFrame",
        implementationState: "partial",
        redirectAction: "refactor-engine",
    }),
    Object.freeze({
        id: "lesson24-causative-a-control",
        andrewsSection: "24.9",
        category: "causative-a-control",
        directiveEs: "La a causativa controla el sujeto y el nucleo fuente, como si incorporara la CNV fuente como objeto.",
        engineSurface: "diagnostic boundary before compound-stem modeling",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
    }),
]);

function getLesson24FirstTypeCausativeSubsectionInventory() {
    return LESSON24_FIRST_TYPE_CAUSATIVE_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON24_FIRST_TYPE_CAUSATIVE_VALIDATION_REFS),
    }));
}

function buildLesson24FirstTypeCausativePursuitFrame() {
    const subsectionInventory = getLesson24FirstTypeCausativeSubsectionInventory();
    const finalVowelValenceFrame = cloneVncAllomorphyLessonRecord(LESSON24_FINAL_VOWEL_VALENCE_FRAME);
    const valenceNeutralFrame = cloneVncAllomorphyLessonRecord(LESSON24_VALENCE_NEUTRAL_FRAME);
    const typeOneCausativeFrame = cloneVncAllomorphyLessonRecord(LESSON24_TYPE_ONE_CAUSATIVE_FRAME);
    const destockalArchitectureFrame = cloneVncAllomorphyLessonRecord(LESSON24_DESTOCKAL_ARCHITECTURE_FRAME);
    const destockalNiHuiFrame = cloneVncAllomorphyLessonRecord(LESSON24_DESTOCKAL_NI_HUI_FRAME);
    const destockalHuaFrame = cloneVncAllomorphyLessonRecord(LESSON24_DESTOCKAL_HUA_FRAME);
    const destockalIhuiAhuiFrame = cloneVncAllomorphyLessonRecord(LESSON24_DESTOCKAL_IHUI_AHUI_FRAME);
    const causativeVncGenerationFrame = cloneVncAllomorphyLessonRecord(LESSON24_CAUSATIVE_VNC_GENERATION_FRAME);
    const causativeAControlFrame = cloneVncAllomorphyLessonRecord(LESSON24_CAUSATIVE_A_CONTROL_FRAME);
    const remainingGaps = [
        "Final-vowel valence tendencies are not a complete lexical source model; valence-neutral stems still need confirmed Nawat/Pipil evidence and source-specific gates.",
        "Type-one causative replacement versus addition is only partially controlled by current rules and exceptions, especially for a-final, ya-final, and consonant-replacement cases.",
        "Destockal ni/hui/hua/i-hui/a-hui inventories, class membership, coalesced stocks, synonym pairs, and gaps are not data-complete.",
        "Andrews 24.8 source-subject-to-causative-object generation is not yet a full source-CNV transform with imported causative subject and specific/reflexive/nonspecific object derivation.",
        "Andrews 24.9 matrix-stem or compound-stem analysis of causative a remains diagnostic until compound-source modeling is explicit.",
    ];
    const frame = {
        kind: "lesson-24-first-type-causative-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 24,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON24_FIRST_TYPE_CAUSATIVE_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-24-first-type-causative-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 24.1-24.9 against current type-one causative generation, valence-neutral boundaries, destockal stem architecture, source-subject-to-object transforms, and Nawat orthography evidence.",
                andrewsRefs: Array.from(LESSON24_FIRST_TYPE_CAUSATIVE_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON24_FIRST_TYPE_CAUSATIVE_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-24-first-type-causative-audit",
                result: "hit",
                correction: "Lesson 24 now records Andrews final-vowel boundaries, valence-neutral stems, type-one causative a procedures, destockal stock architecture, 24.8 generation transform, current engine support, and explicit gaps before closest-pass can be claimed.",
                andrewsRefs: Array.from(LESSON24_FIRST_TYPE_CAUSATIVE_PDF_REFS),
                feedbackRefs: Array.from(LESSON24_FIRST_TYPE_CAUSATIVE_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        finalVowelValenceFrame,
        valenceNeutralFrame,
        typeOneCausativeFrame,
        destockalArchitectureFrame,
        destockalNiHuiFrame,
        destockalHuaFrame,
        destockalIhuiAhuiFrame,
        causativeVncGenerationFrame,
        causativeAControlFrame,
        currentEngineBoundary: {
            causativeForwardDerivationImplemented: true,
            forwardDerivationFrameImplemented: true,
            typeOneCausativeSubsetImplemented: true,
            destockalWiReverseLookupImplemented: true,
            nawatUExceptionsImplementedForKnownForms: true,
            finalVowelValenceLexiconIncomplete: true,
            valenceNeutralStemGatesIncomplete: true,
            destockalInventoryIncomplete: true,
            sourceCnvTransformIncomplete: true,
            causativeACompoundAnalysisDiagnosticOnly: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    if (typeof attachGrammarMetadataContract !== "function") {
        return frame;
    }
    return attachGrammarMetadataContract(frame, {
        enumerable: false,
        unitKind: "causative-verbstem",
        metadataKind: "lesson-24-first-type-causative-pursuit-frame",
        routeFamily: "vnc-allomorphy",
        routeStage: "audit-lesson-24",
        generationAllowed: false,
        supported: true,
        structuralSource: "Andrews Lesson 24",
        andrewsRefs: ["Andrews Lesson 24.1-24.9"],
        evidenceStatus: "direct-pdf-partial",
        sourceInput: "Andrews Lesson 24.1-24.9",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil output spelling",
            noClassicalSurfaceImport: true,
            causativeMorpheme: typeOneCausativeFrame.causativeMorpheme,
            destockalBridge: {
                "hui": "wi",
                "hua": "wa",
                "o-a": "u-a",
            },
        },
        morphBoundaryFrame: {
            finalVowelValenceFrame,
            valenceNeutralFrame,
            typeOneCausativeFrame,
            destockalArchitectureFrame,
            destockalNiHuiFrame,
            destockalHuaFrame,
            destockalIhuiAhuiFrame,
            causativeAControlFrame,
        },
        stemFrame: {
            stemKind: "first-type-causative-verbstem",
            sourceStem: "active intransitive or impersonal intransitive source",
            targetStem: "type-one causative stem",
            sourceSuffix: "a",
            destockalTypes: destockalArchitectureFrame.destockalTypes,
        },
        participantFrame: {
            sourceSubjectBecomesCausativeObject: true,
            causativeSubjectImportedFromOutsideSource: true,
            generatedObjectSources: causativeVncGenerationFrame.generatedObjectSources,
            valenceNeutralStemGatesIncomplete: true,
        },
        nuclearClauseFrame: {
            clauseKind: "verbal-nuclear-clause",
            sourceClauseKind: "intransitive VNC",
            targetClauseKind: "single-object causative VNC",
            sourceCnvTransformComplete: false,
        },
        targetContract: {
            metadataKind: "lesson-24-first-type-causative-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnosticStatus: "partial-audit",
    });
}

const LESSON25_SECOND_TYPE_CAUSATIVE_VALIDATION_REFS = Object.freeze([
    "src/tests/derivation.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON25_SECOND_TYPE_CAUSATIVE_PDF_REFS = Object.freeze([
    "Andrews Lesson 25.1",
    "Andrews Lesson 25.2",
    "Andrews Lesson 25.3",
    "Andrews Lesson 25.4",
    "Andrews Lesson 25.5",
    "Andrews Lesson 25.6",
    "Andrews Lesson 25.7",
    "Andrews Lesson 25.8",
    "Andrews Lesson 25.9",
    "Andrews Lesson 25.10",
    "Andrews Lesson 25.11",
    "Andrews Lesson 25.12",
    "Andrews Lesson 25.13",
    "Andrews Lesson 25.14",
    "Andrews Lesson 25.15",
    "Andrews Lesson 25.16",
]);

const LESSON25_TYPE_TWO_OVERVIEW_FRAME = Object.freeze({
    kind: "lesson-25-type-two-overview-frame",
    sourceSection: "Andrews 25.1",
    suffixalUnits: Object.freeze(["tia", "lia", "huia"]),
    coreCausativeCluster: "tia",
    tiaComposition: Object.freeze(["semantically empty ti", "causative a from Lesson 24"]),
    derivesObjectCounts: Object.freeze(["single-object", "double-object", "triple-object"]),
    nonactiveSourceFamilies: Object.freeze(["hua", "o", "o-hua", "lo"]),
    deletesFromNonactiveSource: Object.freeze(["hua", "o"]),
    unexpectedOrUnattestedNonactiveSources: true,
    suppletiveNoCausativeStems: Object.freeze(["yawi uses huica", "hual-la-uh uses hual+huica"]),
    honorificOnlyBoundary: "some causatives serve only honorific VNCs",
});

const LESSON25_SOURCE_FORMATION_FRAME = Object.freeze({
    kind: "lesson-25-source-formation-frame",
    sourceSections: Object.freeze(["Andrews 25.2", "Andrews 25.3", "Andrews 25.4", "Andrews 25.5", "Andrews 25.6"]),
    huaSource: Object.freeze({
        operation: "tia replaces hua",
        usualMarker: "long base-final i before tia",
        unexpectedFinals: Object.freeze(["ki/ka", "si/sa", "ti/ta", "i-hui/a-hui"]),
    }),
    oOHuaSource: Object.freeze({
        operation: "tia replaces o or o-hua",
        distinguishedBy: "consonant before tia except l",
        impossibleWhenActiveHasTwoConsonantsBeforeFinalVowel: true,
        specialSpecificNonhumanObjectCases: true,
    }),
    loSource: Object.freeze({
        operation: "tia replaces the o of lo, leaving l before tia",
        classCDUseThisProcedure: true,
        unexpectedFinals: Object.freeze(["ka/ki", "ni/na", "kwa", "si/sa", "wa/wi", "postvocalic ti", "root+ya"]),
    }),
    liaSource: Object.freeze({
        sourceShape: "active i or a stem",
        iFinalSource: "denominal ti 'to become'",
        aFinalSource: "root plus ya, with ya deleted",
        phonologicallyIdenticalToApplicativeLia: true,
    }),
    huiaSource: Object.freeze({
        sourceShape: "active o/o-long stem with hua nonactive source",
        mayAttachDirectlyOrAfterOToAReplacement: true,
        phonologicallyIdenticalToApplicativeHuia: true,
    }),
});

const LESSON25_CLASS_AND_PARALLEL_FRAME = Object.freeze({
    kind: "lesson-25-class-and-parallel-frame",
    sourceSections: Object.freeze(["Andrews 25.7", "Andrews 25.8"]),
    classMembership: "Class C",
    appliesTo: Object.freeze(["tia", "lia", "huia"]),
    typeOneAndTypeTwoSameSourceAllowed: true,
    typeOneTypeTwoMeaningsMayMatchOrDiverge: true,
});

const LESSON25_CAUSATIVE_TRANSFORMATION_FRAME = Object.freeze({
    kind: "lesson-25-causative-transformation-frame",
    sourceSection: "Andrews 25.9",
    sameAsTypeOneButMoreComplexForTransitiveSources: true,
    operations: Object.freeze([
        "compact-source-vnc-into-causative-predicate",
        "replace-source-stem-with-causative-stem",
        "change-source-subject-pronoun-into-causative-object",
        "import-new-causative-subject-from-outside-source",
    ]),
    causativeObjectIsObjectInFormSubjectInFunction: true,
    specificityFromSourceVoice: Object.freeze(["active", "passive", "impersonal"]),
});

const LESSON25_OBJECT_TRANSFORM_FRAME = Object.freeze({
    kind: "lesson-25-object-transform-frame",
    sourceSections: Object.freeze(["Andrews 25.10", "Andrews 25.11", "Andrews 25.12"]),
    singleObject: Object.freeze({
        source: "active or impersonal intransitive VNC",
        outputs: Object.freeze(["specific projective", "reflexive", "nonspecific projective"]),
    }),
    doubleObject: Object.freeze({
        sources: Object.freeze(["active single-object transitive VNC", "passive intransitive VNC", "single-object impersonal VNC"]),
        causativeObjectBecomesMainline: true,
        shuntlineSpecificMayBeSilent: true,
        shuntlineReflexiveUsuallyNe: true,
        nonspecificProjectivePreserved: true,
        coreferenceCanPreventNeShape: true,
    }),
    tripleObject: Object.freeze({
        mainline: "causative object",
        secondLevelShuntline: "causative or applicative object",
        firstLevelShuntline: "direct, causative, or rare applicative object",
        silentShuntlinesRequireStemKnowledge: true,
        exhaustiveCombinationTableDeferredTo: "Andrews Lesson 23.5 and Appendix C",
    }),
});

const LESSON25_BOUNDARY_FRAME = Object.freeze({
    kind: "lesson-25-boundary-frame",
    sourceSections: Object.freeze(["Andrews 25.13", "Andrews 25.14", "Andrews 25.15", "Andrews 25.16"]),
    ambiguity: Object.freeze({
        objectFormsDoNotDiscriminateFunction: true,
        contextChoosesSource: true,
        reducers: Object.freeze(["specific-object incompatibility", "shuntline ne replacement"]),
    }),
    sentenceMoods: Object.freeze(["wish", "command/exhortation", "admonition"]),
    passiveImpersonalTransformsAllowed: true,
    silentObjectPronounCanBeSupplemented: true,
    supplementationRequiresSentenceLayer: true,
});

const LESSON25_SECOND_TYPE_CAUSATIVE_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson25-type-two-causative", andrewsSection: "25.1", category: "type-two-causative-overview", directiveEs: "El causativo tipo 2 usa tia, con ti vacio mas a causativa, y puede crear CNV de uno, dos o tres objetos.", engineSurface: "type-two causative derivation option", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson25-hua-source", andrewsSection: "25.2", category: "hua-nonactive-source", directiveEs: "Tia reemplaza hua y frecuentemente muestra i final de base; hay formaciones inesperadas por terminacion de fuente.", engineSurface: "type-two causative source selection", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson25-o-ohua-source", andrewsSection: "25.3", category: "o-ohua-nonactive-source", directiveEs: "Tia reemplaza o u o-hua; la consonante antes de tia distingue la ruta salvo l.", engineSurface: "type-two causative source selection", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson25-lo-source", andrewsSection: "25.4", category: "lo-nonactive-source", directiveEs: "Tia reemplaza la o de lo y deja l ante tia; esta ruta gobierna clases C/D y muchas formaciones inesperadas.", engineSurface: "type-two causative l-tia routes", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson25-lia-causative", andrewsSection: "25.5", category: "lia-causative", directiveEs: "Algunas fuentes intransitivas en i/a usan lia causativa, identica en forma a la lia aplicativa.", engineSurface: "lia causative/applicative ambiguous routing", implementationState: "partial", redirectAction: "reframe-metadata" }),
    Object.freeze({ id: "lesson25-huia-causative", andrewsSection: "25.6", category: "huia-causative", directiveEs: "Fuentes intransitivas en o con no activo hua pueden formar huia, identica en forma a la huia aplicativa.", engineSurface: "huia/wia causative-applicative ambiguity", implementationState: "partial", redirectAction: "reframe-metadata" }),
    Object.freeze({ id: "lesson25-class-membership", andrewsSection: "25.7", category: "type-two-class-c", directiveEs: "Todo causativo tipo 2, sea tia, lia o huia, pertenece a Clase C.", engineSurface: "Class C causative routing", implementationState: "partial", redirectAction: "reframe-metadata" }),
    Object.freeze({ id: "lesson25-type-one-type-two-same-source", andrewsSection: "25.8", category: "type-one-type-two-parallel", directiveEs: "Una misma fuente puede tener causativo tipo 1 y tipo 2, con significado igual o diferente.", engineSurface: "parallel causative stem pool", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson25-causative-transformation", andrewsSection: "25.9", category: "causative-transformation", directiveEs: "La fuente se compacta dentro del predicado causativo, el sujeto fuente pasa a objeto y se importa un sujeto nuevo.", engineSurface: "forwardDerivationFrame plus object slots", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson25-single-object-causative", andrewsSection: "25.10", category: "single-object-causative-vnc", directiveEs: "La fuente intransitiva activa o impersonal genera objeto causativo especifico, reflexivo o inespecifico.", engineSurface: "single-object causative output", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson25-double-object-causative", andrewsSection: "25.11", category: "double-object-causative-vnc", directiveEs: "La causativa de dos objetos puede venir de activa transitiva, pasiva intransitiva o impersonal de un objeto; el objeto causativo es linea principal.", engineSurface: "obj1/obj2 valence controls", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson25-triple-object-causative", andrewsSection: "25.12", category: "triple-object-causative-vnc", directiveEs: "La causativa de tres objetos exige linea principal y dos niveles secundarios, a veces silenciosos.", engineSurface: "obj1/obj2/obj3 controls", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson25-causative-ambiguity", andrewsSection: "25.13", category: "causative-transform-ambiguity", directiveEs: "Las formas de objeto no distinguen funcion; el contexto y las reglas de silencio/ne reducen ambiguedad.", engineSurface: "diagnostic ambiguity metadata", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson25-causative-moods", andrewsSection: "25.14", category: "causative-sentence-moods", directiveEs: "Las CNV causativas pueden entrar en deseo, mandato/exhortacion y admonicion.", engineSurface: "finite output plus sentence-layer diagnostics", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson25-causative-passive-impersonal", andrewsSection: "25.15", category: "causative-passive-impersonal", directiveEs: "Las CNV con tronco causativo pueden sufrir transformaciones pasivas e impersonales.", engineSurface: "shared passive/impersonal nonactive route", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson25-silent-object-supplementation", andrewsSection: "25.16", category: "silent-object-supplementation", directiveEs: "Un objeto silencioso es real y puede recibir suplemento; esto pertenece a la capa de oracion.", engineSurface: "supplementation diagnostics only", implementationState: "partial", redirectAction: "diagnostic-only" }),
]);

function getLesson25SecondTypeCausativeSubsectionInventory() {
    return LESSON25_SECOND_TYPE_CAUSATIVE_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON25_SECOND_TYPE_CAUSATIVE_VALIDATION_REFS),
    }));
}

function buildLesson25SecondTypeCausativePursuitFrame() {
    const subsectionInventory = getLesson25SecondTypeCausativeSubsectionInventory();
    const overviewFrame = cloneVncAllomorphyLessonRecord(LESSON25_TYPE_TWO_OVERVIEW_FRAME);
    const sourceFormationFrame = cloneVncAllomorphyLessonRecord(LESSON25_SOURCE_FORMATION_FRAME);
    const classAndParallelFrame = cloneVncAllomorphyLessonRecord(LESSON25_CLASS_AND_PARALLEL_FRAME);
    const causativeTransformationFrame = cloneVncAllomorphyLessonRecord(LESSON25_CAUSATIVE_TRANSFORMATION_FRAME);
    const objectTransformFrame = cloneVncAllomorphyLessonRecord(LESSON25_OBJECT_TRANSFORM_FRAME);
    const boundaryFrame = cloneVncAllomorphyLessonRecord(LESSON25_BOUNDARY_FRAME);
    const remainingGaps = [
        "Type-two source selection from hua, o, o-hua, lo, lia, and huia is not data-complete and often depends on unexpected or unattested nonactive stems.",
        "The engine exposes type-two causative output, but it does not yet prove all Andrews 25.2-25.8 source-shape, class, suppletive, honorific-only, and type-one/type-two parallel distinctions.",
        "Andrews 25.9-25.12 source-CNV transformations for single-, double-, and triple-object causatives are not fully modeled with mainline/shuntline function and silent object pronouns.",
        "Causative transform ambiguity, passive/impersonal causative transforms, sentence moods, and supplementation of silent objects remain diagnostic or partially routed.",
    ];
    const frame = {
        kind: "lesson-25-second-type-causative-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 25,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON25_SECOND_TYPE_CAUSATIVE_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-25-second-type-causative-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 25.1-25.16 against current type-two causative generation, source-family selection, single/double/triple object transforms, ambiguity, voices, sentence moods, and silent-object supplementation.",
                andrewsRefs: Array.from(LESSON25_SECOND_TYPE_CAUSATIVE_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON25_SECOND_TYPE_CAUSATIVE_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-25-second-type-causative-audit",
                result: "hit",
                correction: "Lesson 25 now records Andrews type-two causative source families, tia/lia/huia boundaries, Class C policy, source-CNV transformation rules, object-depth behavior, ambiguity, voice and sentence boundaries, current engine support, and explicit gaps before closest-pass can be claimed.",
                andrewsRefs: Array.from(LESSON25_SECOND_TYPE_CAUSATIVE_PDF_REFS),
                feedbackRefs: Array.from(LESSON25_SECOND_TYPE_CAUSATIVE_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        overviewFrame,
        sourceFormationFrame,
        classAndParallelFrame,
        causativeTransformationFrame,
        objectTransformFrame,
        boundaryFrame,
        currentEngineBoundary: {
            typeTwoCausativeGenerationImplemented: true,
            forwardDerivationFrameImplemented: true,
            tiaLiaHuiaStemPoolPartial: true,
            classCPolicyPartial: true,
            sourceCnvTransformIncomplete: true,
            doubleTripleObjectRoutingIncomplete: true,
            silentObjectSupplementationMissing: true,
            passiveImpersonalCausativeRoutingPartial: true,
            sentenceMoodLayerDiagnosticOnly: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    if (typeof attachGrammarMetadataContract !== "function") {
        return frame;
    }
    return attachGrammarMetadataContract(frame, {
        enumerable: false,
        unitKind: "causative-verbstem",
        metadataKind: "lesson-25-second-type-causative-pursuit-frame",
        routeFamily: "vnc-allomorphy",
        routeStage: "audit-lesson-25",
        generationAllowed: false,
        supported: true,
        structuralSource: "Andrews Lesson 25",
        andrewsRefs: ["Andrews Lesson 25.1-25.16"],
        evidenceStatus: "direct-pdf-partial",
        sourceInput: "Andrews Lesson 25.1-25.16",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil output spelling",
            noClassicalSurfaceImport: true,
            suffixalUnits: overviewFrame.suffixalUnits,
            classicalToNawatHints: {
                "tia": "tia",
                "lia": "lia",
                "huia": "wia",
                "hua": "wa",
            },
        },
        morphBoundaryFrame: {
            overviewFrame,
            sourceFormationFrame,
            classAndParallelFrame,
            causativeTransformationFrame,
            objectTransformFrame,
            boundaryFrame,
        },
        stemFrame: {
            stemKind: "second-type-causative-verbstem",
            sourceStem: "nonactive-derived base or exceptional active source",
            targetStem: "type-two causative stem",
            sourceSuffix: overviewFrame.suffixalUnits.join("/"),
            classMembership: classAndParallelFrame.classMembership,
        },
        participantFrame: {
            sourceSubjectBecomesCausativeObject: true,
            causativeSubjectImportedFromOutsideSource: true,
            singleObjectSources: objectTransformFrame.singleObject.source,
            doubleObjectSources: objectTransformFrame.doubleObject.sources,
            tripleObjectMainline: objectTransformFrame.tripleObject.mainline,
            silentShuntlinesRequireStemKnowledge: true,
        },
        nuclearClauseFrame: {
            clauseKind: "verbal-nuclear-clause",
            sourceClauseKind: "intransitive/transitive/passive/impersonal VNC",
            targetClauseKind: "causative VNC",
            maxObjectDepth: 3,
            sentenceMoodBoundary: boundaryFrame.sentenceMoods,
        },
        targetContract: {
            metadataKind: "lesson-25-second-type-causative-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnosticStatus: "partial-audit",
    });
}

const LESSON26_APPLICATIVE_VALIDATION_REFS = Object.freeze([
    "src/tests/derivation.test.js",
    "src/tests/registry.test.js",
    "docs/GRAMMAR_SPEC.md",
]);

const LESSON26_APPLICATIVE_PDF_REFS = Object.freeze([
    "Andrews Lesson 26.1",
    "Andrews Lesson 26.2",
    "Andrews Lesson 26.3",
    "Andrews Lesson 26.4",
    "Andrews Lesson 26.5",
    "Andrews Lesson 26.6",
    "Andrews Lesson 26.7",
    "Andrews Lesson 26.8",
    "Andrews Lesson 26.9",
    "Andrews Lesson 26.10",
    "Andrews Lesson 26.11",
    "Andrews Lesson 26.12",
    "Andrews Lesson 26.13",
    "Andrews Lesson 26.14",
    "Andrews Lesson 26.15",
    "Andrews Lesson 26.16",
    "Andrews Lesson 26.17",
    "Andrews Lesson 26.18",
    "Andrews Lesson 26.19",
    "Andrews Lesson 26.20",
    "Andrews Lesson 26.21",
    "Andrews Lesson 26.22",
    "Andrews Lesson 26.23",
]);

const LESSON26_APPLICATIVE_NATURE_FRAME = Object.freeze({
    kind: "lesson-26-applicative-nature-frame",
    sourceSection: "Andrews 26.1",
    semanticRange: Object.freeze([
        "advantage",
        "disadvantage",
        "interest",
        "possession",
        "bestowal",
        "deprival",
        "association",
    ]),
    mainlineConstituents: Object.freeze(["applicative suffix", "obligatorily concomitant applicative object pronoun"]),
    derivesObjectCounts: Object.freeze(["single-object", "double-object", "triple-object"]),
    honorificOnlyBoundary: true,
    irregularBoundaries: Object.freeze([
        "inherently applicative double-object maca without applicative suffix",
        "itta from defective itzi with unusual sound shift and applicative a",
        "valence-neutral pairs with applicative-like transitive member",
    ]),
});

const LESSON26_APPLICATIVE_FORMATION_FRAME = Object.freeze({
    kind: "lesson-26-applicative-formation-frame",
    sourceSections: Object.freeze(["Andrews 26.2", "Andrews 26.3", "Andrews 26.12", "Andrews 26.13"]),
    typeOne: Object.freeze({
        suffixalUnit: "ia",
        operation: "add ia to a replacive imperfective stem lacking the final source vowel",
        sourceIFinalStillDeletes: true,
        sourceTiCanLookCausative: true,
        causativeApplicativeAmbiguity: true,
        lexicalPredictability: "unpredictable; learn each verbstem separately",
    }),
    typeTwo: Object.freeze({
        suffixalUnits: Object.freeze(["lia", "huia"]),
        composition: Object.freeze(["applicative ia", "semantically empty l or w"]),
        defaultLiaElsewhere: true,
        huiaEnvironments: Object.freeze(["transitive Class C o-a sources", "intransitive Class A long-o sources"]),
        causativeLiaSourcesNormallyBlockApplicative: true,
        sourceReflexiveBecomesShuntlineNe: true,
    }),
    sameSourceCanHaveBothTypes: true,
    classMembership: "Class C",
});

const LESSON26_SOURCE_SHAPE_FRAME = Object.freeze({
    kind: "lesson-26-source-shape-frame",
    sourceSections: Object.freeze(["Andrews 26.4", "Andrews 26.5", "Andrews 26.6", "Andrews 26.7", "Andrews 26.8"]),
    finalI: Object.freeze({
        operation: "attach lia to imperfective stem",
        finalVowelLengtheningPossible: true,
        siToXi: true,
        tziOrTzToChiPossible: true,
        postvocalicTiToChiPossible: true,
    }),
    finalAAfterI: Object.freeze({
        operation: "delete final a and add lia",
        appliesToCausativeAndApplicativeSources: true,
        iteratedApplicativesPossible: true,
    }),
    finalAAfterConsonant: Object.freeze({
        operation: "replace final a with i and add lia",
        saToXilia: true,
        tlaOrTzaToChilia: true,
        occasionalTlaToTilia: true,
        homophonousCausativeRisk: true,
    }),
    exceptions: Object.freeze({
        classD: "add lia to imperfective stem",
        transitiveClassBIya: "add lia to imperfective stem",
        intransitiveClassBEya: "delete ya and add lia to root",
        oyaRootYa: "delete ya for root+lia when the source behaves like root+ya; otherwise add lia",
    }),
});

const LESSON26_HUIA_TIA_FRAME = Object.freeze({
    kind: "lesson-26-huia-tia-frame",
    sourceSections: Object.freeze(["Andrews 26.9", "Andrews 26.10", "Andrews 26.11"]),
    oaSources: Object.freeze({
        generalSuffixalUnit: "huia",
        rootFinalL: "add huia to root",
        rootFinalConsonantOtherThanL: "add a-l-huia or i-l-huia according to the intransitive a-hui/i-hui source",
        rootFinalO: "add l-huia to root",
        rootYaCausativeOa: "add l-huia to root",
        exceptionalOaUsesLia: true,
    }),
    intransitiveLongO: Object.freeze({
        suffixalUnit: "huia",
        causativeApplicativeAmbiguityResolvedByContext: true,
    }),
    rareTiaApplicative: Object.freeze({
        suffixalUnit: "tia",
        notCausative: true,
        exceptional: true,
    }),
});

const LESSON26_APPLICATIVE_TRANSFORMATION_FRAME = Object.freeze({
    kind: "lesson-26-applicative-transformation-frame",
    sourceSection: "Andrews 26.14",
    operations: Object.freeze([
        "replace-source-stem-with-applicative-stem",
        "import-applicative-object-pronoun-from-outside-source-vnc",
        "make-last-added-applicative-object-the-mainline-object",
        "demote-source-objects-to-shuntline-levels",
    ]),
    mainlineObject: "applicative object",
    sourceObjectInDoubleObjectTarget: "shuntline object",
    sourceObjectsInTripleObjectTarget: Object.freeze(["first-level shuntline", "second-level shuntline"]),
});

const LESSON26_OBJECT_DEPTH_FRAME = Object.freeze({
    kind: "lesson-26-object-depth-frame",
    sourceSections: Object.freeze(["Andrews 26.15", "Andrews 26.16", "Andrews 26.17"]),
    singleObject: Object.freeze({
        source: "intransitive VNC",
        target: "single-object applicative VNC",
        tlaFusionMayHideIntransitiveSource: true,
        adverbialEmbedCanClarifyObjectCount: true,
    }),
    doubleObject: Object.freeze({
        source: "single-object VNC",
        target: "double-object applicative VNC",
        sourceReflexiveBecomesShuntlineNe: true,
        mainlineApplicativeObjectMayBeOnlyOvertSpecificObject: true,
        silentSpecificObjectMayTakeSupplement: true,
        appendixRef: "Appendix C.2",
    }),
    tripleObject: Object.freeze({
        source: "double-object VNC",
        target: "triple-object applicative VNC",
        overtObjectCountsAllowed: Object.freeze([3, 2, 1]),
        silentProjectiveShuntlinesPossible: true,
        appendixRef: "Appendix C.3",
    }),
});

const LESSON26_APPLICATIVE_BOUNDARY_FRAME = Object.freeze({
    kind: "lesson-26-applicative-boundary-frame",
    sourceSections: Object.freeze(["Andrews 26.18", "Andrews 26.19", "Andrews 26.20", "Andrews 26.21", "Andrews 26.22", "Andrews 26.23"]),
    ambiguity: Object.freeze({
        objectSequenceMayHaveMultipleSources: true,
        mustResolveMainlineAndShuntlineRoles: true,
        appendixCRequired: true,
    }),
    sentenceMoods: Object.freeze(["wish", "command/exhortation", "admonition"]),
    passiveImpersonalTransformsAllowed: true,
    alternativeObjectPronouns: Object.freeze({
        humanNonhumanContrastCanChangeTranslation: true,
        translationCanDisguiseApplicativeNature: true,
    }),
    deceptiveVncs: true,
    applicativeUnitControl: Object.freeze({
        discontinuousObjectPlusSuffixUnit: true,
        possibleCompositionAnalysis: true,
        doesNotIncorporateWholeSourceVncAsObject: true,
        causativeApplicativeMeaningOverlapRequiresCaution: true,
    }),
});

const LESSON26_APPLICATIVE_SUBSECTION_INVENTORY = Object.freeze([
    Object.freeze({ id: "lesson26-applicative-nature", andrewsSection: "26.1", category: "applicative-object-role", directiveEs: "El aplicativo aplica la accion a un participante tangencial y su objeto es constituyente principal junto con el sufijo.", engineSurface: "applicative derivation option", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson26-type-one-applicative", andrewsSection: "26.2", category: "type-one-applicative-ia", directiveEs: "El tipo 1 agrega ia a un imperfectivo replacivo sin vocal final y es lexicalmente impredecible.", engineSurface: "applicative stem pool", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson26-type-two-applicative", andrewsSection: "26.3", category: "type-two-applicative-lia-huia", directiveEs: "El tipo 2 usa lia o huia, con l/w vacios mas ia aplicativa; reflexivo fuente pasa a ne secundario.", engineSurface: "applicative stem pool", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson26-final-i-sources", andrewsSection: "26.4", category: "final-i-source", directiveEs: "Fuentes en i agregan lia y pueden mostrar alargamiento o cambios si/ti/tz.", engineSurface: "source-shape allomorphy", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson26-final-a-frame", andrewsSection: "26.5", category: "final-a-source-frame", directiveEs: "Fuentes en a se dividen por sonido precedente: i, consonante u o.", engineSurface: "source-shape classifier", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson26-final-ia-sources", andrewsSection: "26.6", category: "final-ia-source", directiveEs: "Fuentes en ia borran a y agregan lia; esto permite aplicativos de causativos y de aplicativos.", engineSurface: "iterated applicative routing", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson26-final-consonant-a-sources", andrewsSection: "26.7", category: "final-consonant-a-source", directiveEs: "Fuentes consonante+a cambian a por i y agregan lia, con rutas xi/ch/ti.", engineSurface: "source-shape allomorphy", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson26-exceptions", andrewsSection: "26.8", category: "applicative-source-exceptions", directiveEs: "Clase D, clase B iya/eya y oya tienen excepciones propias antes de lia.", engineSurface: "exception stem pool", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson26-oa-huia-sources", andrewsSection: "26.9", category: "oa-huia-source", directiveEs: "Fuentes o-a forman huia sobre raiz, raiz+a-l/i-l, raiz+l, o excepcionalmente lia.", engineSurface: "huia/wia applicative routing", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson26-long-o-huia", andrewsSection: "26.10", category: "long-o-huia-source", directiveEs: "Fuentes intransitivas en o larga pueden dar huia causativa o aplicativa; el contexto decide.", engineSurface: "causative/applicative ambiguity metadata", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson26-tia-applicative", andrewsSection: "26.11", category: "rare-tia-applicative", directiveEs: "Tia puede ser formativo aplicativo raro y no debe confundirse con causativo.", engineSurface: "tia ambiguity diagnostics", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson26-two-types-same-source", andrewsSection: "26.12", category: "type-one-type-two-parallel", directiveEs: "Una misma fuente puede tener aplicativo tipo 1 y tipo 2, con significado igual o diferente.", engineSurface: "parallel applicative stem pool", implementationState: "partial", redirectAction: "needs-nawat-evidence" }),
    Object.freeze({ id: "lesson26-class-c", andrewsSection: "26.13", category: "applicative-class-c", directiveEs: "Todo aplicativo, de tipo 1 o tipo 2, pertenece a Clase C.", engineSurface: "Class C applicative routing", implementationState: "partial", redirectAction: "reframe-metadata" }),
    Object.freeze({ id: "lesson26-applicative-transform", andrewsSection: "26.14", category: "applicative-transformation", directiveEs: "La CNV fuente cambia a tronco aplicativo e importa objeto aplicativo principal; objetos fuente pasan a lineas secundarias.", engineSurface: "forwardDerivationFrame plus object slots", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson26-single-object-transform", andrewsSection: "26.15", category: "single-object-applicative-vnc", directiveEs: "Fuente intransitiva produce CNV aplicativa de un objeto; tla fusion puede ocultar la fuente.", engineSurface: "single-object applicative output", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson26-double-object-transform", andrewsSection: "26.16", category: "double-object-applicative-vnc", directiveEs: "Fuente de un objeto produce aplicativo de dos objetos; incompatibilidad puede silenciar el objeto fuente.", engineSurface: "obj1/obj2 valence controls", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson26-triple-object-transform", andrewsSection: "26.17", category: "triple-object-applicative-vnc", directiveEs: "Fuente de dos objetos produce aplicativo de tres objetos con lineas secundarias y silencios posibles.", engineSurface: "obj1/obj2/obj3 controls", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson26-applicative-ambiguity", andrewsSection: "26.18", category: "applicative-transform-ambiguity", directiveEs: "Las secuencias de objeto pueden venir de fuentes distintas; hay que resolver linea principal y secundarias.", engineSurface: "diagnostic ambiguity metadata", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson26-applicative-moods", andrewsSection: "26.19", category: "applicative-sentence-moods", directiveEs: "Las CNV aplicativas pueden entrar en deseo, mandato/exhortacion y admonicion.", engineSurface: "finite output plus sentence-layer diagnostics", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson26-applicative-passive-impersonal", andrewsSection: "26.20", category: "applicative-passive-impersonal", directiveEs: "Las CNV aplicativas pueden sufrir transformaciones pasivas e impersonales.", engineSurface: "shared passive/impersonal nonactive route", implementationState: "partial", redirectAction: "refactor-engine" }),
    Object.freeze({ id: "lesson26-alternative-object-pronouns", andrewsSection: "26.21", category: "human-nonhuman-object-translation", directiveEs: "Objetos humanos/no humanos pueden cambiar la traduccion y ocultar la naturaleza aplicativa.", engineSurface: "object-humanity diagnostics", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson26-deceptive-vncs", andrewsSection: "26.22", category: "deceptive-applicative-vnc", directiveEs: "La superficie puede ocultar analisis morfosintacticos distintos.", engineSurface: "alternate-source diagnostics", implementationState: "partial", redirectAction: "diagnostic-only" }),
    Object.freeze({ id: "lesson26-applicative-unit", andrewsSection: "26.23", category: "object-plus-suffix-unit", directiveEs: "El sufijo aplicativo y su objeto forman una unidad discontinua fuerte, posiblemente composicional.", engineSurface: "applicative unit metadata", implementationState: "partial", redirectAction: "reframe-metadata" }),
]);

function getLesson26ApplicativeSubsectionInventory() {
    return LESSON26_APPLICATIVE_SUBSECTION_INVENTORY.map((entry) => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON26_APPLICATIVE_VALIDATION_REFS),
    }));
}

function buildLesson26ApplicativePursuitFrame() {
    const subsectionInventory = getLesson26ApplicativeSubsectionInventory();
    const natureFrame = cloneVncAllomorphyLessonRecord(LESSON26_APPLICATIVE_NATURE_FRAME);
    const formationFrame = cloneVncAllomorphyLessonRecord(LESSON26_APPLICATIVE_FORMATION_FRAME);
    const sourceShapeFrame = cloneVncAllomorphyLessonRecord(LESSON26_SOURCE_SHAPE_FRAME);
    const huiaTiaFrame = cloneVncAllomorphyLessonRecord(LESSON26_HUIA_TIA_FRAME);
    const transformationFrame = cloneVncAllomorphyLessonRecord(LESSON26_APPLICATIVE_TRANSFORMATION_FRAME);
    const objectDepthFrame = cloneVncAllomorphyLessonRecord(LESSON26_OBJECT_DEPTH_FRAME);
    const boundaryFrame = cloneVncAllomorphyLessonRecord(LESSON26_APPLICATIVE_BOUNDARY_FRAME);
    const remainingGaps = [
        "Applicative source-shape selection for ia, lia, huia, and rare tia is not data-complete and has many lexical, exception, and ambiguity boundaries.",
        "Current applicative generation and forwardDerivationFrame metadata do not yet prove Andrews 26.1-26.13 irregular, valence-neutral, honorific-only, source-class, source-final, type-one/type-two parallel, and Class C contracts.",
        "Andrews 26.14-26.18 source-CNV transforms for single-, double-, and triple-object applicatives are not fully modeled with mainline/shuntline function, silent objects, and Appendix C coverage.",
        "Applicative moods, passive/impersonal transforms, human/nonhuman alternative-object diagnostics, deceptive VNCs, and the discontinuous object-plus-suffix unit remain diagnostic or partially routed.",
    ];
    const frame = {
        kind: "lesson-26-applicative-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 26,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON26_APPLICATIVE_PDF_REFS),
        plannedArrows: [
            {
                id: "lesson-26-applicative-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 26.1-26.23 against current applicative generation, source-shape selection, single/double/triple object transforms, ambiguity, voices, sentence moods, and object-plus-suffix unit control.",
                andrewsRefs: Array.from(LESSON26_APPLICATIVE_PDF_REFS),
                expectedFeedbackRefs: Array.from(LESSON26_APPLICATIVE_VALIDATION_REFS),
            },
        ],
        firedArrows: [
            {
                id: "lesson-26-applicative-audit",
                result: "hit",
                correction: "Lesson 26 now records Andrews applicative source families, ia/lia/huia/tia boundaries, Class C policy, source-CNV transformation rules, object-depth behavior, ambiguity, voice and sentence boundaries, current engine support, and explicit gaps before closest-pass can be claimed.",
                andrewsRefs: Array.from(LESSON26_APPLICATIVE_PDF_REFS),
                feedbackRefs: Array.from(LESSON26_APPLICATIVE_VALIDATION_REFS),
            },
        ],
        subsectionInventory,
        natureFrame,
        formationFrame,
        sourceShapeFrame,
        huiaTiaFrame,
        transformationFrame,
        objectDepthFrame,
        boundaryFrame,
        currentEngineBoundary: {
            applicativeGenerationImplemented: true,
            forwardDerivationFrameImplemented: true,
            typeOneTypeTwoStemPoolPartial: true,
            sourceShapeAllomorphyPartial: true,
            classCPolicyPartial: true,
            sourceCnvTransformIncomplete: true,
            doubleTripleObjectRoutingIncomplete: true,
            silentObjectSupplementationPartial: true,
            passiveImpersonalApplicativeRoutingPartial: true,
            sentenceMoodLayerDiagnosticOnly: true,
            deceptiveVncDiagnosticsPartial: true,
            objectPlusSuffixUnitDiagnosticOnly: true,
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false,
    };
    if (typeof attachGrammarMetadataContract !== "function") {
        return frame;
    }
    return attachGrammarMetadataContract(frame, {
        enumerable: false,
        unitKind: "applicative-verbstem",
        metadataKind: "lesson-26-applicative-pursuit-frame",
        routeFamily: "vnc-allomorphy",
        routeStage: "audit-lesson-26",
        generationAllowed: false,
        supported: true,
        structuralSource: "Andrews Lesson 26",
        andrewsRefs: ["Andrews Lesson 26.1-26.23"],
        evidenceStatus: "direct-pdf-partial",
        sourceInput: "Andrews Lesson 26.1-26.23",
        orthographyFrame: {
            spellingAuthority: "Nawat/Pipil output spelling",
            noClassicalSurfaceImport: true,
            suffixalUnits: ["ia", "lia", "huia", "tia"],
            classicalToNawatHints: {
                "huia": "wia",
                "hua": "wa",
                "tla": "ta",
                "h": "j",
            },
        },
        morphBoundaryFrame: {
            natureFrame,
            formationFrame,
            sourceShapeFrame,
            huiaTiaFrame,
            transformationFrame,
            objectDepthFrame,
            boundaryFrame,
        },
        stemFrame: {
            stemKind: "applicative-verbstem",
            sourceStem: "nonapplicative or applicative source stem",
            targetStem: "applicative stem",
            sourceSuffix: "ia/lia/huia/tia",
            classMembership: formationFrame.classMembership,
        },
        participantFrame: {
            applicativeObjectIsMainline: true,
            applicativeObjectImportedFromOutsideSource: true,
            sourceObjectsBecomeShuntline: true,
            singleObjectSource: objectDepthFrame.singleObject.source,
            doubleObjectSource: objectDepthFrame.doubleObject.source,
            tripleObjectSource: objectDepthFrame.tripleObject.source,
            silentSpecificObjectMayTakeSupplement: true,
        },
        nuclearClauseFrame: {
            clauseKind: "verbal-nuclear-clause",
            sourceClauseKind: "intransitive/transitive/applicative/causative VNC",
            targetClauseKind: "applicative VNC",
            maxObjectDepth: 3,
            sentenceMoodBoundary: boundaryFrame.sentenceMoods,
        },
        targetContract: {
            metadataKind: "lesson-26-applicative-pursuit-frame",
            generationAllowed: false,
            closestPass: false,
            remainingGaps,
        },
        diagnosticStatus: "partial-audit",
    });
}

function replaceAnalysisSuffix(verb, analysisVerb, nextAnalysisVerb) {
    if (!analysisVerb || analysisVerb === nextAnalysisVerb) {
        return { verb, analysisVerb };
    }
    if (verb.endsWith(analysisVerb)) {
        return {
            verb: `${verb.slice(0, -analysisVerb.length)}${nextAnalysisVerb}`,
            analysisVerb: nextAnalysisVerb,
        };
    }
    return { verb, analysisVerb: nextAnalysisVerb };
}

function buildVncAllomorphyLesson2SoundSpellingFrame(frameInput = {}, beforeValue = "", afterValue = "", role = "") {
    if (typeof buildLesson2SoundSpellingFrame !== "function") {
        return null;
    }
    const frame = buildLesson2SoundSpellingFrame(frameInput);
    if (!frame || !frame.ruleId) {
        return null;
    }
    const normalizedRole = String(role || frame.grammarSlot || "");
    return {
        ...frame,
        segmentRole: normalizedRole,
        sourceSegmentValue: String(beforeValue || ""),
        targetSegmentValue: String(afterValue || ""),
    };
}

function pushVncAllomorphyLesson2SoundSpellingFrame(frames = [], frameInput = {}, beforeValue = "", afterValue = "", role = "") {
    if (!Array.isArray(frames)) {
        return;
    }
    const frame = buildVncAllomorphyLesson2SoundSpellingFrame(frameInput, beforeValue, afterValue, role);
    if (!frame) {
        return;
    }
    const key = [
        frame.ruleId || "",
        frame.grammarSlot || "",
        frame.syllablePosition || "",
        frame.sourceSurface || "",
        frame.target || "",
        Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "",
        frame.segmentRole || "",
        frame.sourceSegmentValue || "",
        frame.targetSegmentValue || "",
    ].join(":");
    if (key && frames.some((entry) => [
        entry.ruleId || "",
        entry.grammarSlot || "",
        entry.syllablePosition || "",
        entry.sourceSurface || "",
        entry.target || "",
        Array.isArray(entry.targetCandidates) ? entry.targetCandidates.join("/") : "",
        entry.segmentRole || "",
        entry.sourceSegmentValue || "",
        entry.targetSegmentValue || "",
    ].join(":") === key)) {
        return;
    }
    frames.push(frame);
}

function applyNonspecificObjectAllomorphy({
    verb,
    analysisVerb,
    obj1,
    obj2 = "",
    obj3 = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    supportivePrecedingSurface = "",
    hasNonspecificValence = false,
    hasSlashMarker = false,
    hasBoundMarker = false,
    directionalPrefix = "",
}) {
    const soundSpellingFrames = [];
    if (!verb) {
        return { verb, analysisVerb, obj1, soundSpellingFrames };
    }
    const base = analysisVerb || verb;
    let nextVerb = verb;
    let nextAnalysis = base;
    let nextObj1 = obj1;
    const normalizedSupportivePrecedingSurface = normalizeSupportiveYContextSurface(
        supportivePrecedingSurface
    );
    const hasNonspecificMarker = hasNonspecificValence
        || NONSPECIFIC_VALENCE_AFFIX_SET.has(obj1)
        || NONSPECIFIC_VALENCE_AFFIX_SET.has(obj2)
        || NONSPECIFIC_VALENCE_AFFIX_SET.has(obj3);
    const shouldReduceMuPrefix =
        obj1 === "mu"
        && (startsWithICVCVPattern(base) || startsWithAlPrefix(base) || startsWithACVlPattern(base))
        && !startsWithAny(base, NONSPECIFIC_I_DROP_VERBS);
    if (shouldReduceMuPrefix) {
        const position = startsWithICVCVPattern(base)
            ? "before-i-stem"
            : (startsWithAlPrefix(base) ? "before-al-stem" : "before-a-cvl-stem");
        pushVncAllomorphyLesson2SoundSpellingFrame(soundSpellingFrames, {
            ruleId: "obj1-mu-before-vowel-m",
            source: obj1,
            target: "m",
            slot: "obj1",
            syllablePosition: position,
        }, obj1, "m", "obj1");
        nextObj1 = "m";
    }
    if (hasOptionalSupportiveI) {
        const supportiveLetter = resolveOptionalSupportiveLetter(optionalSupportiveLetter, nextAnalysis);
        const isSupportiveI = supportiveLetter === "i";
        const shouldPreserveBoundSlashSupportiveI = Boolean(
            hasSlashMarker
            && hasBoundMarker
            && isSupportiveI
        );
        const shouldKeepSupportiveIForSlash = hasSlashMarker
            && isSupportiveI
            && (
                shouldPreserveBoundSlashSupportiveI
                || (
                SUPPORTIVE_I_KEEP_SLASH_PREFIXES_LOADED
                    ? SUPPORTIVE_I_KEEP_SLASH_PREFIXES.has(directionalPrefix)
                    : Boolean(directionalPrefix)
                )
            );
        const shouldDropSupportiveMarker = (
            isSupportiveI
            && !shouldPreserveBoundSlashSupportiveI
            && (
                hasNonspecificMarker
                || (hasSlashMarker && !shouldKeepSupportiveIForSlash)
            )
        );
        if (shouldDropSupportiveMarker) {
            if (nextAnalysis.startsWith(supportiveLetter)) {
                const dropped = nextAnalysis.slice(1);
                pushVncAllomorphyLesson2SoundSpellingFrame(soundSpellingFrames, {
                    ruleId: "supportive-i-stem-initial-elision",
                    source: supportiveLetter,
                    target: "",
                    slot: "stem-initial",
                    syllablePosition: hasSlashMarker ? "slash-boundary" : "after-object",
                }, nextAnalysis, dropped, "stem-initial");
                const updated = replaceAnalysisSuffix(nextVerb, nextAnalysis, dropped);
                nextVerb = updated.verb;
                // Keep the underlying matrix analysis for bound slash inputs even when
                // nonspecific object allomorphy drops the surface supportive i.
                nextAnalysis = hasSlashMarker && hasBoundMarker
                    ? nextAnalysis
                    : updated.analysisVerb;
            } else if (nextVerb.startsWith(supportiveLetter)) {
                // Slash/fused paths can keep matrix support in surface verb while analysis is matrix-only.
                const dropped = nextVerb.slice(1);
                pushVncAllomorphyLesson2SoundSpellingFrame(soundSpellingFrames, {
                    ruleId: "supportive-i-stem-initial-elision",
                    source: supportiveLetter,
                    target: "",
                    slot: "stem-initial",
                    syllablePosition: hasSlashMarker ? "slash-boundary" : "after-object",
                }, nextVerb, dropped, "stem-initial");
                nextVerb = nextVerb.slice(1);
            }
        } else if (
            isSupportiveI
            && !nextAnalysis.startsWith(supportiveLetter)
            && !normalizedSupportivePrecedingSurface
        ) {
            const isCompositeSlashBoundary = Boolean(
                hasSlashMarker
                && nextAnalysis
                && nextVerb.endsWith(nextAnalysis)
                && nextVerb.length > nextAnalysis.length
            );
            const hasSupportiveAtAnalysisBoundary = Boolean(
                nextAnalysis
                && nextVerb.endsWith(nextAnalysis)
                && nextVerb.length > nextAnalysis.length
                && nextVerb[nextVerb.length - nextAnalysis.length - 1] === supportiveLetter
            );
            if (hasSupportiveAtAnalysisBoundary) {
                // Keep analysis aligned with an already-supportive surface form; avoid doubling.
                nextAnalysis = `${supportiveLetter}${nextAnalysis}`;
            } else if (!isCompositeSlashBoundary) {
                const extended = `${supportiveLetter}${nextAnalysis}`;
                const updated = replaceAnalysisSuffix(nextVerb, nextAnalysis, extended);
                nextVerb = updated.verb;
                nextAnalysis = updated.analysisVerb;
            }
        }
    }
    return { verb: nextVerb, analysisVerb: nextAnalysis, obj1: nextObj1, soundSpellingFrames };
}

function isObj1ValencyFilled(obj1, verbMeta) {
    if (obj1) {
        return true;
    }
    if (!verbMeta) {
        return false;
    }
    if (verbMeta.isMarkedTransitive) {
        return true;
    }
    return getActiveVerbValency(verbMeta) > 1;
}

function isNonactiveTransitiveByObj1(obj1, verbMeta) {
    if (!verbMeta) {
        return Boolean(obj1);
    }
    if (verbMeta.isTaFusion) {
        return true;
    }
    return isObj1ValencyFilled(obj1, verbMeta);
}

function shouldUseAnalysisVerbAsRuleBase(verbMeta) {
    if (!verbMeta) {
        return false;
    }
    const hasBoundMarker = verbMeta.hasBoundMarker === true
        || (Array.isArray(verbMeta.boundPrefixes) && verbMeta.boundPrefixes.length > 0)
        || (typeof verbMeta.boundPrefix === "string" && verbMeta.boundPrefix.length > 0);
    return Boolean(
        verbMeta.hasCompoundMarker
        || verbMeta.hasSuffixSeparator
        || verbMeta.hasSlashMarker
        || hasBoundMarker
        || verbMeta.hasLeadingDash
    );
}

function normalizeRuleBase(value) {
    let base = value || "";
    if (!base) {
        return base;
    }
    const markerRe = COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
    return base.replace(markerRe, "");
}

function normalizeTiCausativeClass(value = "") {
    const raw = String(value || "").trim();
    if (!raw) {
        return "";
    }
    const normalized = raw
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    const compact = normalized.replace(/\s+/g, "");
    const canonical = compact.replace(/[=-]/g, ":");
    if (
        canonical === "ti1"
        || canonical === "ti:1"
        || canonical === "ti:become"
        || canonical === "ti:hacerse"
        || canonical === "become"
        || canonical === "hacerse"
    ) {
        return "become";
    }
    if (
        canonical === "ti2"
        || canonical === "ti:2"
        || canonical === "ti:have"
        || canonical === "ti:tener"
        || canonical === "have"
        || canonical === "tener"
    ) {
        return "have";
    }
    return "";
}

function parseTiCausativeDirectiveToken(value = "") {
    const raw = String(value || "").trim();
    if (!raw) {
        return "";
    }
    const normalized = raw
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
    const canonical = normalized.replace(/[=-]/g, ":");
    if (
        canonical === "ti1"
        || canonical === "ti:1"
        || canonical === "ti:become"
        || canonical === "ti:hacerse"
    ) {
        return "become";
    }
    if (
        canonical === "ti2"
        || canonical === "ti:2"
        || canonical === "ti:have"
        || canonical === "ti:tener"
    ) {
        return "have";
    }
    return "";
}

function collapseSlashTiInput(baseValue = "") {
    const base = String(baseValue || "").trim().toLowerCase();
    if (!base.includes("/ti")) {
        return baseValue;
    }
    // New serial mechanism treats slash X/ti as fused Xti.
    // Keep known valence-marked forms untouched.
    const simpleMatch = base.match(/^([a-z]+)\/ti$/);
    if (!simpleMatch) {
        return baseValue;
    }
    const prefix = simpleMatch[1] || "";
    if (["ta", "te", "mu"].includes(prefix)) {
        return baseValue;
    }
    return `${prefix}ti`;
}

function isValenceLikeDashPrefixToken(token = "") {
    const normalized = normalizeRuleBase(String(token || "").toLowerCase());
    if (!normalized) {
        return false;
    }
    if (
        normalized === "k"
        || normalized === "ki"
        || normalized === "kin"
        || normalized === "m"
        || normalized === "t"
        || SPECIFIC_VALENCE_PREFIX_SET.has(normalized)
        || OBJECT_MARKERS.has(normalized)
        || FUSION_PREFIXES.has(normalized)
        || isNonspecificValenceAffixToken(normalized)
        || isNonspecificValenceAffixToken(normalized, { explicit: true })
    ) {
        return true;
    }
    return false;
}

function collapseSerialStemDashInput(baseValue = "") {
    const base = String(baseValue || "").trim().toLowerCase();
    if (!base.includes("-")) {
        return baseValue;
    }
    const slashIndex = base.lastIndexOf("/");
    const head = slashIndex > -1 ? base.slice(0, slashIndex + 1) : "";
    const tail = slashIndex > -1 ? base.slice(slashIndex + 1) : base;
    if (!tail || tail.startsWith("-")) {
        return baseValue;
    }
    const collapseByPattern = (pattern, buildCollapsedTail) => {
        const match = tail.match(pattern);
        if (!match) {
            return "";
        }
        const root = String(match[1] || "");
        if (!root || isValenceLikeDashPrefixToken(root)) {
            return "";
        }
        const collapsedTail = buildCollapsedTail(root);
        return collapsedTail ? `${head}${collapsedTail}` : "";
    };
    const collapsed = (
        collapseByPattern(/^([a-z]+)-ti$/i, (root) => `${root}ti`)
        || collapseByPattern(/^([a-z]+)-ya$/i, (root) => `${root}ya`)
        || collapseByPattern(/^([a-z]+)-u-a$/i, (root) => `${root}ua`)
        || collapseByPattern(/^([a-z]+)-a-wi$/i, (root) => `${root}awi`)
        || collapseByPattern(/^([a-z]+)-i-wi$/i, (root) => `${root}iwi`)
    );
    return collapsed || baseValue;
}

function parseInlineTiCausativeClassFromBase(baseValue = "") {
    const base = String(baseValue || "");
    if (!base) {
        return {
            base: "",
            tiCausativeClass: "",
        };
    }
    let tiCausativeClass = "";
    let normalizedBase = base.replace(/(^|[\/-])\s*ti(?:[:=-]?)([12])(?=$|[\/-])/gi, (_match, separator, index) => {
        if (!tiCausativeClass) {
            tiCausativeClass = index === "1" ? "become" : "have";
        }
        return `${separator}ti`;
    });
    normalizedBase = normalizedBase.replace(/ti(?:[:=-]?)([12])(?=$|[\/-])/gi, (_match, index) => {
        if (!tiCausativeClass) {
            tiCausativeClass = index === "1" ? "become" : "have";
        }
        return "ti";
    });
    return {
        base: collapseSlashTiInput(normalizedBase),
        tiCausativeClass,
    };
}

function getCanonicalRuleBaseFromOptions(source, options = {}) {
    if (options.nonactiveRuleSource?.ruleBase) {
        return normalizeRuleBase(options.nonactiveRuleSource.ruleBase);
    }
    if (options.canonicalRuleBase) {
        return options.canonicalRuleBase;
    }
    const meta = options.verbMeta || options.parsedVerb || null;
    if (meta) {
        if (meta.canonicalRuleBase) {
            return meta.canonicalRuleBase;
        }
        if (meta.canonical && meta.canonical.ruleBase) {
            return meta.canonical.ruleBase;
        }
    }
    if (options.ruleBase) {
        return normalizeRuleBase(options.ruleBase);
    }
    return normalizeRuleBase(source);
}

function getDerivationRuleBase(source, verbMeta) {
    if (!source || !verbMeta) {
        return source;
    }
    if (verbMeta.canonicalRuleBase) {
        return verbMeta.canonicalRuleBase;
    }
    if (verbMeta.canonical && verbMeta.canonical.ruleBase) {
        return verbMeta.canonical.ruleBase;
    }
    const analysisVerb = verbMeta.analysisVerb || "";
    if (analysisVerb && shouldUseAnalysisVerbAsRuleBase(verbMeta)) {
        return normalizeRuleBase(analysisVerb);
    }
    return normalizeRuleBase(source);
}

function buildDerivationRuleBaseOptions({
    analysisVerb = "",
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    boundPrefix = "",
} = {}) {
    return {
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        boundPrefix,
    };
}

// Strip the directional prefix and any bound/fusion prefixes from a rule base so
// that phonological rules operate on the bare verb root.
function stripNonactiveRuleBasePrefixes(base, verbMeta) {
    if (!verbMeta || !base) {
        return base;
    }
    let result = String(base);
    if (verbMeta.directionalPrefix && result.startsWith(verbMeta.directionalPrefix)) {
        result = result.slice(verbMeta.directionalPrefix.length);
    }
    const fusionPrefixes = Array.isArray(verbMeta.fusionPrefixes) ? verbMeta.fusionPrefixes : [];
    const boundPrefixes = Array.isArray(verbMeta.boundPrefixes) ? verbMeta.boundPrefixes : [];
    const allPrefixes = fusionPrefixes.length
        ? [...fusionPrefixes, ...boundPrefixes.filter((p) => !fusionPrefixes.includes(p))]
        : boundPrefixes;
    return allPrefixes.length ? stripLeadingPrefixes(result, allPrefixes) : result;
}

function resolveNonactiveRuleBase(source, verbMeta) {
    if (!source || !verbMeta) {
        return source;
    }
    // Structural path: same model buildNonactiveRuleSourceContext uses internally.
    const structuralModel = buildDerivationSourceModel(
        verbMeta,
        verbMeta?.sourceRawVerb || verbMeta?.verb || source,
        verbMeta?.analysisVerb || source,
    );
    const structuralMatrixBase = normalizeRuleBase(structuralModel?.matrixBase || "");
    if (structuralMatrixBase) {
        return structuralMatrixBase;
    }
    const canonicalRuleBase = verbMeta.canonicalRuleBase
        || (verbMeta.canonical && verbMeta.canonical.ruleBase)
        || "";
    if (canonicalRuleBase) {
        return canonicalRuleBase;
    }
    const base = getDerivationRuleBase(source, verbMeta);
    const stripped = stripNonactiveRuleBasePrefixes(base, verbMeta);
    return normalizeRuleBase(stripped || source) || stripped || source;
}

function shouldForceAllNonactiveOptions() {
    return false;
}

const MORPH_STEM_SPEC_KIND = Object.freeze({
    literal: "literal",
    baseSuffix: "base-suffix",
    transform: "transform",
});

const MORPH_STEM_TRANSFORM_KIND = Object.freeze({
    append: "append",
    prepend: "prepend",
    stripPrefix: "strip-prefix",
    replaceSuffix: "replace-suffix",
    deletionShift: "deletion-shift",
    intransitiveTypeOne: "intransitive-type-one",
    nonactiveU: "nonactive-u",
    nonactiveUwa: "nonactive-uwa",
    nonactiveWaVariant: "nonactive-wa-variant",
    truncateNonactiveBase: "truncate-nonactive-base",
});

function buildLiteralMorphStemSpec(surfaceStem = "", options = {}) {
    const normalizedSurfaceStem = normalizeRuleBase(String(surfaceStem || "").trim().toLowerCase());
    if (!normalizedSurfaceStem) {
        return null;
    }
    const normalizedSourceBase = normalizeRuleBase(String(options.sourceBase || "").trim().toLowerCase());
    const normalizedSourceSuffix = normalizeRuleBase(String(options.sourceSuffix || "").trim().toLowerCase());
    return Object.freeze({
        kind: MORPH_STEM_SPEC_KIND.literal,
        surfaceStem: normalizedSurfaceStem,
        sourceBase: normalizedSourceBase,
        sourceSuffix: normalizedSourceSuffix,
    });
}

function buildBaseSuffixMorphStemSpec({
    sourceBase = "",
    sourceSuffix = "",
    resultSuffix = "",
} = {}) {
    const normalizedSourceBase = normalizeRuleBase(String(sourceBase || "").trim().toLowerCase());
    const normalizedResultSuffix = normalizeRuleBase(String(resultSuffix || "").trim().toLowerCase());
    if (!normalizedSourceBase && !normalizedResultSuffix) {
        return null;
    }
    return Object.freeze({
        kind: MORPH_STEM_SPEC_KIND.baseSuffix,
        sourceBase: normalizedSourceBase,
        sourceSuffix: normalizeRuleBase(String(sourceSuffix || "").trim().toLowerCase()),
        resultSuffix: normalizedResultSuffix,
    });
}

function buildTransformMorphStemSpec({
    transformKind = "",
    sourceStem = "",
    sourceStemSpec = null,
    sourceBase = "",
    sourceSuffix = "",
    appendText = "",
    prependText = "",
    replacement = "",
    deletionVariant = "",
    typeOneTarget = null,
    lastOnset = "",
    lastNucleus = "",
    blockCh = false,
    blockOnsetReplacement = false,
    allowFinalTaReplacement = false,
    dropFinalW = false,
    tzToCh = false,
    isTransitive = false,
} = {}) {
    const normalizedSourceStem = normalizeRuleBase(String(sourceStem || "").trim().toLowerCase());
    const normalizedSourceStemSpec = (
        sourceStemSpec
        && typeof sourceStemSpec === "object"
        && sourceStemSpec.kind
    ) ? sourceStemSpec : null;
    if ((!normalizedSourceStem && !normalizedSourceStemSpec) || !transformKind) {
        return null;
    }
    return Object.freeze({
        kind: MORPH_STEM_SPEC_KIND.transform,
        transformKind,
        sourceStem: normalizedSourceStem,
        sourceStemSpec: normalizedSourceStemSpec,
        sourceBase: normalizeRuleBase(String(sourceBase || "").trim().toLowerCase()),
        sourceSuffix: normalizeRuleBase(String(sourceSuffix || "").trim().toLowerCase()),
        appendText: normalizeRuleBase(String(appendText || "").trim().toLowerCase()),
        prependText: normalizeRuleBase(String(prependText || "").trim().toLowerCase()),
        replacement: normalizeRuleBase(String(replacement || "").trim().toLowerCase()),
        deletionVariant: String(deletionVariant || ""),
        typeOneTarget: typeOneTarget || null,
        lastOnset: normalizeRuleBase(String(lastOnset || "").trim().toLowerCase()),
        lastNucleus: normalizeRuleBase(String(lastNucleus || "").trim().toLowerCase()),
        blockCh: blockCh === true,
        blockOnsetReplacement: blockOnsetReplacement === true,
        allowFinalTaReplacement: allowFinalTaReplacement === true,
        dropFinalW: dropFinalW === true,
        tzToCh: tzToCh === true,
        isTransitive: isTransitive === true,
    });
}

function buildAppendMorphStemSpec(sourceStem = "", appendText = "", options = {}) {
    return buildTransformMorphStemSpec({
        transformKind: MORPH_STEM_TRANSFORM_KIND.append,
        sourceStem,
        sourceStemSpec: options.sourceStemSpec || null,
        sourceBase: options.sourceBase,
        sourceSuffix: options.sourceSuffix,
        appendText,
    });
}

function buildPrependMorphStemSpec(sourceStemOrSpec = "", prependText = "", options = {}) {
    const sourceStemSpec = (
        sourceStemOrSpec
        && typeof sourceStemOrSpec === "object"
        && sourceStemOrSpec.kind
    ) ? sourceStemOrSpec : null;
    return buildTransformMorphStemSpec({
        transformKind: MORPH_STEM_TRANSFORM_KIND.prepend,
        sourceStem: sourceStemSpec ? "" : sourceStemOrSpec,
        sourceStemSpec: sourceStemSpec || options.sourceStemSpec || null,
        sourceBase: options.sourceBase,
        sourceSuffix: options.sourceSuffix,
        prependText,
    });
}

function buildStripPrefixMorphStemSpec(sourceStemOrSpec = "", prefix = "", options = {}) {
    const sourceStemSpec = (
        sourceStemOrSpec
        && typeof sourceStemOrSpec === "object"
        && sourceStemOrSpec.kind
    ) ? sourceStemOrSpec : null;
    const normalizedPrefix = normalizeRuleBase(String(prefix || "").trim().toLowerCase());
    if (!normalizedPrefix) {
        return sourceStemSpec || buildLiteralMorphStemSpec(sourceStemOrSpec);
    }
    return buildTransformMorphStemSpec({
        transformKind: MORPH_STEM_TRANSFORM_KIND.stripPrefix,
        sourceStem: sourceStemSpec ? "" : sourceStemOrSpec,
        sourceStemSpec: sourceStemSpec || options.sourceStemSpec || null,
        sourceBase: options.sourceBase,
        sourceSuffix: options.sourceSuffix,
        prependText: normalizedPrefix,
    });
}

function buildReplaceSuffixMorphStemSpec(sourceStem = "", sourceSuffix = "", replacement = "", options = {}) {
    const sourceStemSpec = (
        sourceStem
        && typeof sourceStem === "object"
        && sourceStem.kind
    ) ? sourceStem : (
        options.sourceStemSpec
        && typeof options.sourceStemSpec === "object"
        && options.sourceStemSpec.kind
    ) ? options.sourceStemSpec : null;
    const normalizedSourceStem = sourceStemSpec
        ? realizeMorphStemSpec(sourceStemSpec, options.fallbackSourceStem || "")
        : normalizeRuleBase(String(sourceStem || "").trim().toLowerCase());
    const normalizedSourceSuffix = normalizeRuleBase(String(sourceSuffix || "").trim().toLowerCase());
    if (!normalizedSourceStem) {
        return null;
    }
    const derivedSourceBase = normalizedSourceSuffix && normalizedSourceStem.endsWith(normalizedSourceSuffix)
        ? normalizedSourceStem.slice(0, -normalizedSourceSuffix.length)
        : normalizedSourceStem;
    return buildTransformMorphStemSpec({
        transformKind: MORPH_STEM_TRANSFORM_KIND.replaceSuffix,
        sourceStem: sourceStemSpec ? "" : normalizedSourceStem,
        sourceStemSpec: sourceStemSpec || null,
        sourceBase: options.sourceBase || derivedSourceBase,
        sourceSuffix: options.sourceSuffix || normalizedSourceSuffix,
        replacement,
    });
}

function buildDeletionShiftMorphStemSpec(sourceStemOrSpec = "", deletionVariant = "", options = {}) {
    const sourceStemSpec = (
        sourceStemOrSpec
        && typeof sourceStemOrSpec === "object"
        && sourceStemOrSpec.kind
    ) ? sourceStemOrSpec : null;
    return buildTransformMorphStemSpec({
        transformKind: MORPH_STEM_TRANSFORM_KIND.deletionShift,
        sourceStem: sourceStemSpec ? "" : sourceStemOrSpec,
        sourceStemSpec: sourceStemSpec || options.sourceStemSpec || null,
        sourceBase: options.sourceBase,
        sourceSuffix: options.sourceSuffix,
        deletionVariant,
        isTransitive: options.isTransitive === true,
    });
}

function buildIntransitiveTypeOneStem(baseStem = "", typeOneTarget = null) {
    if (!baseStem || !typeOneTarget) {
        return "";
    }
    if (typeOneTarget === "na") {
        if (baseStem.endsWith("ni")) {
            return `${baseStem.slice(0, -1)}a`;
        }
        return "";
    }
    if (typeOneTarget === "wa") {
        if (baseStem.endsWith("wa")) {
            return baseStem;
        }
        if (baseStem.endsWith("wi")) {
            return `${baseStem.slice(0, -1)}a`;
        }
        return "";
    }
    if (typeOneTarget === "ua") {
        if (
            baseStem.endsWith("awa")
            || baseStem.endsWith("iwa")
            || baseStem.endsWith("ewa")
            || baseStem.endsWith("uwa")
        ) {
            return `${baseStem.slice(0, -3)}ua`;
        }
        if (baseStem.endsWith("awi") || baseStem.endsWith("iwi") || baseStem.endsWith("uwi")) {
            return `${baseStem.slice(0, -3)}ua`;
        }
        if (baseStem.endsWith("wi")) {
            return `${baseStem.slice(0, -2)}ua`;
        }
        return "";
    }
    return "";
}

function buildIntransitiveTypeOneMorphStemSpec(baseStem = "", typeOneTarget = null, options = {}) {
    return buildTransformMorphStemSpec({
        transformKind: MORPH_STEM_TRANSFORM_KIND.intransitiveTypeOne,
        sourceStem: baseStem,
        sourceBase: options.sourceBase,
        sourceSuffix: options.sourceSuffix,
        typeOneTarget,
    });
}

function buildNonactiveUStemMorphStemSpec(stem = "", lastOnset = "", lastNucleus = "", options = {}) {
    return buildTransformMorphStemSpec({
        transformKind: MORPH_STEM_TRANSFORM_KIND.nonactiveU,
        sourceStem: stem,
        sourceBase: options.sourceBase,
        sourceSuffix: options.sourceSuffix,
        lastOnset,
        lastNucleus,
        blockCh: options.blockCh,
        blockOnsetReplacement: options.blockOnsetReplacement,
        allowFinalTaReplacement: options.allowFinalTaReplacement,
    });
}

function buildNonactiveUwaStemMorphStemSpec(stem = "", lastOnset = "", lastNucleus = "", options = {}) {
    return buildTransformMorphStemSpec({
        transformKind: MORPH_STEM_TRANSFORM_KIND.nonactiveUwa,
        sourceStem: stem,
        sourceBase: options.sourceBase,
        sourceSuffix: options.sourceSuffix,
        lastOnset,
        lastNucleus,
        blockCh: options.blockCh,
        blockOnsetReplacement: options.blockOnsetReplacement,
    });
}

function buildWaOnsetVariantMorphStemSpec(stem = "", options = {}) {
    return buildTransformMorphStemSpec({
        transformKind: MORPH_STEM_TRANSFORM_KIND.nonactiveWaVariant,
        sourceStem: stem,
        sourceBase: options.sourceBase,
        sourceSuffix: options.sourceSuffix,
        blockCh: options.blockCh,
        blockOnsetReplacement: options.blockOnsetReplacement,
    });
}

function buildTruncateNonactiveBaseMorphStemSpec(stem = "", options = {}) {
    return buildTransformMorphStemSpec({
        transformKind: MORPH_STEM_TRANSFORM_KIND.truncateNonactiveBase,
        sourceStem: stem,
        sourceBase: options.sourceBase,
        sourceSuffix: options.sourceSuffix,
        dropFinalW: options.dropFinalW,
        tzToCh: options.tzToCh,
    });
}


function buildMorphStemSpecFromRoute(sourceBase = "", sourceSuffix = "", outputStem = "") {
    const normalizedOutputStem = normalizeRuleBase(String(outputStem || "").trim().toLowerCase());
    if (!normalizedOutputStem) {
        return null;
    }
    const normalizedSourceBase = normalizeRuleBase(String(sourceBase || "").trim().toLowerCase());
    const normalizedSourceSuffix = normalizeRuleBase(String(sourceSuffix || "").trim().toLowerCase());
    if (normalizedSourceBase && normalizedOutputStem.startsWith(normalizedSourceBase)) {
        const resultSuffix = normalizedOutputStem.slice(normalizedSourceBase.length);
        const spec = buildBaseSuffixMorphStemSpec({
            sourceBase: normalizedSourceBase,
            sourceSuffix: normalizedSourceSuffix,
            resultSuffix,
        });
        if (spec) {
            return spec;
        }
    }
    return buildLiteralMorphStemSpec(normalizedOutputStem, {
        sourceBase: normalizedSourceBase,
        sourceSuffix: normalizedSourceSuffix,
    });
}

function realizeMorphStemSpec(spec = null, fallbackStem = "") {
    if (!spec || typeof spec !== "object") {
        return normalizeRuleBase(String(fallbackStem || "").trim().toLowerCase());
    }
    if (spec.kind === MORPH_STEM_SPEC_KIND.baseSuffix) {
        return `${spec.sourceBase || ""}${spec.resultSuffix || ""}`;
    }
    if (spec.kind === MORPH_STEM_SPEC_KIND.literal) {
        return normalizeRuleBase(String(spec.surfaceStem || "").trim().toLowerCase());
    }
    if (spec.kind === MORPH_STEM_SPEC_KIND.transform) {
        const resolvedSourceStem = spec.sourceStemSpec
            ? realizeMorphStemSpec(spec.sourceStemSpec, spec.sourceStem || fallbackStem || "")
            : String(spec.sourceStem || fallbackStem || "");
        const sourceStem = normalizeRuleBase(String(resolvedSourceStem || "").trim().toLowerCase());
        if (!sourceStem) {
            return "";
        }
        if (spec.transformKind === MORPH_STEM_TRANSFORM_KIND.append) {
            return `${sourceStem}${spec.appendText || ""}`;
        }
        if (spec.transformKind === MORPH_STEM_TRANSFORM_KIND.prepend) {
            return `${spec.prependText || ""}${sourceStem}`;
        }
        if (spec.transformKind === MORPH_STEM_TRANSFORM_KIND.stripPrefix) {
            const prefix = normalizeRuleBase(String(spec.prependText || "").trim().toLowerCase());
            if (!prefix) {
                return sourceStem;
            }
            return sourceStem.startsWith(prefix) ? sourceStem.slice(prefix.length) : sourceStem;
        }
        if (spec.transformKind === MORPH_STEM_TRANSFORM_KIND.replaceSuffix) {
            const sourceSuffix = normalizeRuleBase(String(spec.sourceSuffix || "").trim().toLowerCase());
            const replacement = normalizeRuleBase(String(spec.replacement || "").trim().toLowerCase());
            if (!sourceSuffix) {
                return `${sourceStem}${replacement}`;
            }
            if (!sourceStem.endsWith(sourceSuffix)) {
                return `${sourceStem}${replacement}`;
            }
            return `${sourceStem.slice(0, -sourceSuffix.length)}${replacement}`;
        }
        if (spec.transformKind === MORPH_STEM_TRANSFORM_KIND.deletionShift) {
            if (spec.deletionVariant === "kw-to-k") {
                return sourceStem.endsWith("kw") ? `${sourceStem.slice(0, -2)}k` : "";
            }
            if (spec.deletionVariant === "w-keep") {
                return sourceStem;
            }
            if (spec.deletionVariant === "w-to-j") {
                return sourceStem.endsWith("w") ? `${sourceStem.slice(0, -1)}j` : "";
            }
            if (spec.deletionVariant === "m-to-n") {
                return sourceStem.endsWith("m") ? `${sourceStem.slice(0, -1)}n` : "";
            }
            if (spec.deletionVariant === "y-shift") {
                if (!sourceStem.endsWith("y")) {
                    return "";
                }
                const letters = splitVerbLetters(sourceStem);
                const recent = letters.slice(Math.max(0, letters.length - 6));
                const hasRecentS = recent.includes("s");
                const base = sourceStem.slice(0, -1);
                if (!spec.isTransitive && hasRecentS) {
                    return base.endsWith("s") ? base : `${base}s`;
                }
                return `${base}sh`;
            }
            if (spec.deletionVariant === "identity") {
                return sourceStem;
            }
            return sourceStem;
        }
        if (spec.transformKind === MORPH_STEM_TRANSFORM_KIND.intransitiveTypeOne) {
            return buildIntransitiveTypeOneStem(sourceStem, spec.typeOneTarget);
        }
        if (spec.transformKind === MORPH_STEM_TRANSFORM_KIND.nonactiveU) {
            return buildNonactiveUStem(sourceStem, spec.lastOnset, spec.lastNucleus, {
                blockCh: spec.blockCh,
                blockOnsetReplacement: spec.blockOnsetReplacement,
                allowFinalTaReplacement: spec.allowFinalTaReplacement,
            }) || "";
        }
        if (spec.transformKind === MORPH_STEM_TRANSFORM_KIND.nonactiveUwa) {
            return buildNonactiveUwaStem(sourceStem, spec.lastOnset, spec.lastNucleus, {
                blockCh: spec.blockCh,
                blockOnsetReplacement: spec.blockOnsetReplacement,
            }) || "";
        }
        if (spec.transformKind === MORPH_STEM_TRANSFORM_KIND.nonactiveWaVariant) {
            return buildWaOnsetVariant(sourceStem, {
                blockCh: spec.blockCh,
                blockOnsetReplacement: spec.blockOnsetReplacement,
            }) || "";
        }
        if (spec.transformKind === MORPH_STEM_TRANSFORM_KIND.truncateNonactiveBase) {
            return truncateNonactiveBase(sourceStem, {
                dropFinalW: spec.dropFinalW,
                tzToCh: spec.tzToCh,
            }) || "";
        }
    }
    return normalizeRuleBase(String(fallbackStem || "").trim().toLowerCase());
}

const NOMINAL_FORM_SPEC_KIND = Object.freeze({
    literal: "literal",
    stem: "stem",
});

function buildLiteralNominalFormSpec(verb = "", subjectSuffix = "", options = {}) {
    const normalizedVerb = normalizeRuleBase(String(verb || "").trim().toLowerCase());
    if (!normalizedVerb && !subjectSuffix) {
        return null;
    }
    return Object.freeze({
        kind: NOMINAL_FORM_SPEC_KIND.literal,
        verb: normalizedVerb,
        subjectSuffix: String(subjectSuffix || ""),
        lockNominalMarker: options.lockNominalMarker === true,
    });
}

function buildStemNominalFormSpec(stemSpec = null, subjectSuffix = "", options = {}) {
    const resolvedStemSpec = (
        stemSpec
        && typeof stemSpec === "object"
        && stemSpec.kind
    ) ? stemSpec : null;
    if (!resolvedStemSpec) {
        return null;
    }
    return Object.freeze({
        kind: NOMINAL_FORM_SPEC_KIND.stem,
        stemSpec: resolvedStemSpec,
        stem: normalizeRuleBase(String(options.stem || "").trim().toLowerCase()),
        subjectSuffix: String(subjectSuffix || ""),
        lockNominalMarker: options.lockNominalMarker === true,
    });
}

function realizeNominalFormSpec(spec = null, fallback = {}) {
    if (!spec || typeof spec !== "object") {
        return {
            verb: normalizeRuleBase(String(fallback.verb || "").trim().toLowerCase()),
            subjectSuffix: String(fallback.subjectSuffix || ""),
            lockNominalMarker: fallback.lockNominalMarker === true,
        };
    }
    if (spec.kind === NOMINAL_FORM_SPEC_KIND.literal) {
        return {
            verb: normalizeRuleBase(String(spec.verb || "").trim().toLowerCase()),
            subjectSuffix: String(spec.subjectSuffix || ""),
            lockNominalMarker: spec.lockNominalMarker === true,
        };
    }
    if (spec.kind === NOMINAL_FORM_SPEC_KIND.stem) {
        return {
            verb: realizeMorphStemSpec(spec.stemSpec, spec.stem || fallback.verb || ""),
            subjectSuffix: String(spec.subjectSuffix || fallback.subjectSuffix || ""),
            lockNominalMarker: spec.lockNominalMarker === true,
        };
    }
    return {
        verb: normalizeRuleBase(String(fallback.verb || "").trim().toLowerCase()),
        subjectSuffix: String(fallback.subjectSuffix || ""),
        lockNominalMarker: fallback.lockNominalMarker === true,
    };
}

function withNominalFormSpecSuffix(spec = null, subjectSuffix = "", fallback = {}) {
    const resolved = realizeNominalFormSpec(spec, fallback);
    if (spec?.kind === NOMINAL_FORM_SPEC_KIND.stem && spec.stemSpec) {
        return buildStemNominalFormSpec(spec.stemSpec, subjectSuffix, {
            stem: resolved.verb,
            lockNominalMarker: resolved.lockNominalMarker,
        });
    }
    return buildLiteralNominalFormSpec(resolved.verb, subjectSuffix, {
        lockNominalMarker: resolved.lockNominalMarker,
    });
}

function buildNominalNum1Num2({
    subjectSuffix = "",
    nominalKind = "",
    predicateState = "derived-nominal",
    source = "",
} = {}) {
    const normalizedNominalKind = String(nominalKind || "");
    const rawSubjectSuffix = String(subjectSuffix || "");
    const suffixIsPredicateNominalizer = normalizedNominalKind === VERB_DERIVED_NOMINAL_KIND.sustantivoVerbal
        || normalizedNominalKind === "potencial";
    const derivationalSuffixRole = normalizedNominalKind === "potencial"
        ? "predicate.potential-patient-nominalizer"
        : "predicate.action-nominalizer";
    const surface = suffixIsPredicateNominalizer ? "" : rawSubjectSuffix;
    return Object.freeze({
        version: 1,
        role: "subject-number-connector",
        slot: "subject.num1-num2",
        belongsTo: "subject",
        surface,
        displaySurface: surface || "Ø",
        nominalKind: normalizedNominalKind,
        predicateState: String(predicateState || "derived-nominal"),
        source: String(source || ""),
        predicateDerivationalSuffix: suffixIsPredicateNominalizer ? rawSubjectSuffix : "",
        derivationalSuffixRole: suffixIsPredicateNominalizer ? derivationalSuffixRole : "",
        notNounSuffix: true,
        notStatePosition: true,
    });
}

function normalizeNominalNum1Num2(connector = null, fallback = {}) {
    if (connector && typeof connector === "object") {
        return Object.freeze({
            ...connector,
            version: connector.version || 1,
            role: connector.role || "subject-number-connector",
            slot: connector.slot || "subject.num1-num2",
            belongsTo: connector.belongsTo || "subject",
            surface: String(connector.surface ?? fallback.subjectSuffix ?? ""),
            displaySurface: String(connector.displaySurface || connector.surface || fallback.subjectSuffix || "Ø"),
            nominalKind: String(connector.nominalKind || fallback.nominalKind || ""),
            predicateState: String(connector.predicateState || fallback.predicateState || "derived-nominal"),
            source: String(connector.source || fallback.source || ""),
            predicateDerivationalSuffix: String(connector.predicateDerivationalSuffix || ""),
            derivationalSuffixRole: String(connector.derivationalSuffixRole || ""),
            notNounSuffix: connector.notNounSuffix !== false,
            notStatePosition: connector.notStatePosition !== false,
        });
    }
    return buildNominalNum1Num2(fallback);
}

function buildNominalFormEntry(verb = "", subjectSuffix = "", options = {}) {
    const normalizedVerb = normalizeRuleBase(String(verb || "").trim().toLowerCase());
    const normalizedSuffix = String(subjectSuffix || "");
    const formSpec = options?.formSpec || buildLiteralNominalFormSpec(normalizedVerb, normalizedSuffix, {
        lockNominalMarker: options?.lockNominalMarker === true,
    });
    const nominalKind = String(options?.nounDerivationKind || options?.nominalKind || "");
    const num1Num2 = normalizeNominalNum1Num2(
        options?.num1Num2 || null,
        {
            subjectSuffix: normalizedSuffix,
            nominalKind,
            predicateState: options?.predicateState || "derived-nominal",
            source: options?.sourceTense || options?.source || "",
        }
    );
    const entry = {
        ...options,
        verb: normalizedVerb,
        subjectSuffix: normalizedSuffix,
        formSpec,
        num1Num2,
    };
    return entry;
}

function normalizeNominalFormEntry(entry = null, fallback = {}) {
    if (!entry || typeof entry !== "object") {
        return buildNominalFormEntry(fallback.verb || "", fallback.subjectSuffix || "", fallback);
    }
    const realized = realizeNominalFormSpec(entry.formSpec || null, {
        verb: entry.verb || fallback.verb || "",
        subjectSuffix: entry.subjectSuffix ?? fallback.subjectSuffix ?? "",
        lockNominalMarker: entry.lockNominalMarker === true || fallback.lockNominalMarker === true,
    });
    return buildNominalFormEntry(realized.verb, realized.subjectSuffix, {
        ...fallback,
        ...entry,
        lockNominalMarker: realized.lockNominalMarker,
        formSpec: entry.formSpec || buildLiteralNominalFormSpec(realized.verb, realized.subjectSuffix, {
            lockNominalMarker: realized.lockNominalMarker,
        }),
    });
}

function withNominalFormEntrySuffix(entry = null, subjectSuffix = "", fallback = {}) {
    const normalized = normalizeNominalFormEntry(entry, fallback);
    return buildNominalFormEntry(normalized.verb, subjectSuffix, {
        ...normalized,
        formSpec: withNominalFormSpecSuffix(normalized.formSpec || null, subjectSuffix, normalized),
    });
}

var VERB_DERIVED_NOMINAL_KIND = Object.freeze({
    sustantivoVerbal: "sustantivo-verbal",
    instrumentivo: "instrumentivo",
    calificativoInstrumentivo: "calificativo-instrumentivo",
    locativoTemporal: "locativo-temporal",
});

function getActiveActionNominalizerContract() {
    const longConversion = typeof convertClassicalLettersToNawat === "function"
        ? convertClassicalLettersToNawat("liz", {
            contract: "active-action-nominalizer",
        })
        : null;
    const shortConversion = typeof convertClassicalLettersToNawat === "function"
        ? convertClassicalLettersToNawat("z", {
            contract: "active-action-nominalizer",
        })
        : null;
    const contract = {
        kind: "active-action-nominalizer-contract",
        version: 1,
        curriculumRef: Object.freeze({
            source: "Andrews",
            range: "37.2-37.5",
            role: "active-action-nnc-nominalizer",
        }),
        classicalSuffixes: Object.freeze({
            long: "liz",
            short: "z",
        }),
        nawatSuffixes: Object.freeze({
            long: longConversion?.output || "lis",
            short: shortConversion?.output || "s",
        }),
        orthographyConversions: Object.freeze({
            long: longConversion,
            short: shortConversion,
        }),
        sourceStageModel: Object.freeze({
            slot: "#3 salida",
            sourceCore: "future-active-core",
            outputStage: "active-action-noun-output",
        }),
        boundaries: Object.freeze({
            noClassicalSurfaceImport: true,
            noFixtureEvidence: true,
            preservesGeneratedSurfaceForms: true,
            orthographyConversionIsRuleOnly: true,
        }),
    };
    return Object.freeze(attachVncAllomorphyGrammarContract(contract, {
        metadataKind: "active-action-nominalizer-contract",
        routeFamily: "active-action-nominalizer",
        routeStage: "classify-nominalizer",
        range: "37.2-37.5",
        supported: true,
        orthographyFrame: {
            classicalRuleSpelling: "z/liz",
            nawatRuleSpelling: `${contract.nawatSuffixes.short}/${contract.nawatSuffixes.long}`,
            surfaceForms: [contract.nawatSuffixes.short, contract.nawatSuffixes.long].filter(Boolean),
            spellingAuthority: "Nawat/Pipil output spelling",
            noClassicalSurfaceImport: true,
            orthographyConversions: contract.orthographyConversions,
        },
        targetContract: {
            metadataKind: "active-action-nominalizer-contract",
            generationAllowed: false,
            sourceStageModel: contract.sourceStageModel,
            doesNotCreateFixtureEvidence: true,
        },
    }));
}

function getActiveActionNominalizerSuffixes() {
    const contract = getActiveActionNominalizerContract();
    return Object.freeze([
        contract.nawatSuffixes.long,
        contract.nawatSuffixes.short,
    ].filter(Boolean));
}

var VERB_DERIVED_PATIENTIVE_FAMILY = Object.freeze({
    nonactive: "nonactive",
    passive: "passive",
    impersonal: "impersonal",
    perfectivo: "perfectivo",
    imperfectivo: "imperfectivo",
    troncoVerbal: "tronco-verbal",
    customaryPresent: "customary-present-passive",
    unknown: "unknown",
});

const PATIENTIVO_NONACTIVE_SOURCE_SUFFIX_CONTRACTS = Object.freeze({
    lu: Object.freeze({
        sourceSuffix: "lu",
        classicalSuffix: "lo",
        sourceFamily: "nonactive",
        sourceOperation: "delete-final-u",
        deletedSegment: "u",
        retainedSegment: "l",
        andrewsNounstemClass: "tli",
        nawatConnectorFamily: "t/ti",
        lessonRef: "37.8-37.9",
    }),
    luwa: Object.freeze({
        sourceSuffix: "luwa",
        classicalSuffix: "lo-hua",
        sourceFamily: "nonactive",
        sourceOperation: "delete-wa-and-final-u",
        deletedSegment: "uwa",
        retainedSegment: "l",
        andrewsNounstemClass: "tli",
        nawatConnectorFamily: "t/ti",
        lessonRef: "37.8-37.9",
    }),
    u: Object.freeze({
        sourceSuffix: "u",
        classicalSuffix: "o",
        sourceFamily: "nonactive",
        sourceOperation: "delete-entire-suffix",
        deletedSegment: "u",
        retainedSegment: "",
        andrewsNounstemClass: "tli",
        nawatConnectorFamily: "t/ti",
        lessonRef: "37.8-37.9",
    }),
    uwa: Object.freeze({
        sourceSuffix: "uwa",
        classicalSuffix: "o-hua",
        sourceFamily: "nonactive",
        sourceOperation: "delete-entire-suffix",
        deletedSegment: "uwa",
        retainedSegment: "",
        andrewsNounstemClass: "tli",
        nawatConnectorFamily: "t/ti",
        lessonRef: "37.8-37.9",
    }),
    wa: Object.freeze({
        sourceSuffix: "wa",
        classicalSuffix: "hua",
        sourceFamily: "nonactive",
        sourceOperation: "delete-entire-suffix",
        deletedSegment: "wa",
        retainedSegment: "",
        andrewsNounstemClass: "ti",
        nawatConnectorFamily: "ti",
        lessonRef: "37.8-37.9",
    }),
    walu: Object.freeze({
        sourceSuffix: "walu",
        classicalSuffix: "hua-lo",
        sourceFamily: "nonactive-chain",
        sourceOperation: "delete-final-u-after-chained-nonactive",
        deletedSegment: "u",
        retainedSegment: "wal",
        andrewsNounstemClass: "tli",
        nawatConnectorFamily: "t/ti",
        lessonRef: "37.8-39.5",
    }),
});

function normalizePatientivoSourceSuffix(value = "") {
    return normalizeRuleBase(String(value || "").trim().toLowerCase()).replace(/-/g, "");
}

function getPatientivoNonactiveSourceSuffixContract(sourceSuffix = "") {
    const suffix = normalizePatientivoSourceSuffix(sourceSuffix);
    const contract = PATIENTIVO_NONACTIVE_SOURCE_SUFFIX_CONTRACTS[suffix] || null;
    if (!contract) {
        return null;
    }
    const orthographyConversion = typeof convertClassicalLettersToNawat === "function"
        ? convertClassicalLettersToNawat(contract.classicalSuffix, {
            contract: "patientive-nonactive-source-suffix",
        })
        : null;
    const contractRecord = {
        kind: "patientive-nonactive-source-suffix-contract",
        version: 1,
        sourceSuffix: contract.sourceSuffix,
        classicalSuffix: contract.classicalSuffix,
        nawatRuleSuffix: orthographyConversion?.output || contract.sourceSuffix,
        nawatSurfaceSuffix: String(orthographyConversion?.output || contract.sourceSuffix).replace(/[^a-z]/g, ""),
        sourceFamily: contract.sourceFamily,
        sourceOperation: contract.sourceOperation,
        deletedSegment: contract.deletedSegment,
        retainedSegment: contract.retainedSegment,
        andrewsNounstemClass: contract.andrewsNounstemClass,
        nawatConnectorFamily: contract.nawatConnectorFamily,
        lessonRef: contract.lessonRef,
        orthographyConversion,
        grammarAuthority: "Andrews PDF",
        orthographyAuthority: "Nawat/Pipil output spelling",
        generationAllowedByOrthography: false,
    };
    return Object.freeze(attachVncAllomorphyGrammarContract(contractRecord, {
        metadataKind: "patientive-nonactive-source-suffix-contract",
        routeFamily: "patientive-source-contract",
        routeStage: "classify-nonactive-source-suffix",
        range: contract.lessonRef,
        supported: true,
        sourceInput: contractRecord.sourceSuffix,
        orthographyFrame: {
            classicalRuleSpelling: contractRecord.classicalSuffix,
            nawatRuleSpelling: contractRecord.nawatRuleSuffix,
            surface: contractRecord.nawatSurfaceSuffix,
            surfaceForms: contractRecord.nawatSurfaceSuffix ? [contractRecord.nawatSurfaceSuffix] : [],
            spellingAuthority: "Nawat/Pipil output spelling",
            noClassicalSurfaceImport: true,
            orthographyConversion,
        },
        stemFrame: {
            stemKind: "patientive-nonactive-source-suffix",
            sourceSuffix: contractRecord.sourceSuffix,
            sourceOperation: contractRecord.sourceOperation,
            deletedSegment: contractRecord.deletedSegment,
            retainedSegment: contractRecord.retainedSegment,
        },
        targetContract: {
            metadataKind: "patientive-nonactive-source-suffix-contract",
            generationAllowed: false,
            sourceFamily: contractRecord.sourceFamily,
            andrewsNounstemClass: contractRecord.andrewsNounstemClass,
            nawatConnectorFamily: contractRecord.nawatConnectorFamily,
        },
    }));
}

function buildPatientivoSourceStageFrame({
    sourceType = "",
    sourceSuffix = "",
    sourceStem = "",
    outputStem = "",
    outputConnector = "",
    sourceEndingContract = null,
    sourceStockContract = null,
    sourceModel = null,
} = {}) {
    const normalizedSourceType = String(sourceType || "").trim();
    const normalizedSourceSuffix = normalizePatientivoSourceSuffix(sourceSuffix);
    const nonactiveSuffixContract = normalizedSourceType === "nonactive"
        ? getPatientivoNonactiveSourceSuffixContract(normalizedSourceSuffix)
        : null;
    const perfectiveEndingContract = normalizedSourceType === "perfectivo"
        ? (
            sourceEndingContract
            && typeof sourceEndingContract === "object"
            && sourceEndingContract.kind === "patientive-perfective-source-ending-contract"
                ? sourceEndingContract
                : getPatientivoPerfectiveSourceStemContract(outputStem || sourceStem)
        )
        : null;
    const imperfectiveStemContract = normalizedSourceType === "imperfectivo"
        ? (
            sourceEndingContract
            && typeof sourceEndingContract === "object"
            && sourceEndingContract.kind === "patientive-imperfective-source-stem-contract"
                ? sourceEndingContract
                : getPatientivoImperfectiveSourceStemContract({
                    sourceStem,
                    outputStem,
                    outputConnector,
                })
        )
        : null;
    const rootStockContract = normalizedSourceType === "tronco-verbal"
        ? (
            sourceStockContract
            && typeof sourceStockContract === "object"
            && sourceStockContract.kind === "patientive-root-stock-source-contract"
                ? sourceStockContract
                : getPatientivoRootStockSourceContract({
                    sourceStem,
                    outputStem,
                    outputConnector,
                })
        )
        : null;
    const sourceCore = nonactiveSuffixContract
        ? "nonactive-core"
        : (
            normalizedSourceType === "perfectivo"
                ? "perfective-active-core"
                : (
                    normalizedSourceType === "imperfectivo"
                        ? "imperfective-active-core"
                        : (
                            normalizedSourceType === "tronco-verbal"
                                ? "root-or-stock-stem"
                                : normalizedSourceType
                        )
                )
        );
    const operation = nonactiveSuffixContract?.sourceOperation || (
        normalizedSourceType === "perfectivo"
            ? "derive-from-perfective-active-core"
            : (
                normalizedSourceType === "imperfectivo"
                    ? "derive-from-imperfective-active-core"
                    : (
                        normalizedSourceType === "tronco-verbal"
                            ? "derive-from-root-or-stock"
                            : "unknown-patientive-source-operation"
                    )
            )
    );
    const frameRecord = {
        kind: "patientive-source-stage-frame",
        version: 1,
        curriculumRef: Object.freeze({
            source: "Andrews",
            range: nonactiveSuffixContract?.lessonRef || "37.9-39",
            role: "patientive-source-to-output-contract",
        }),
        slot: "#3 salida",
        sourceType: normalizedSourceType,
        sourceCore,
        sourceSuffix: normalizedSourceSuffix,
        sourceSuffixContract: nonactiveSuffixContract,
        sourceEndingContract: perfectiveEndingContract,
        sourceStemContract: imperfectiveStemContract,
        sourceStockContract: rootStockContract,
        sourceStem: String(sourceStem || ""),
        outputStem: String(outputStem || ""),
        outputConnector: String(outputConnector || ""),
        outputSurface: `${String(outputStem || "")}${String(outputConnector || "")}`,
        operation,
        sourceModel,
        boundaries: Object.freeze({
            noClassicalSurfaceImport: true,
            noNewFixtureEvidence: true,
            preservesGeneratedSurfaceForms: true,
            orthographyConversionIsRuleOnly: true,
        }),
    };
    return Object.freeze(attachVncAllomorphyGrammarContract(frameRecord, {
        metadataKind: "patientive-source-stage-frame",
        routeFamily: "patientive-source-contract",
        routeStage: "classify-source-stage",
        range: frameRecord.curriculumRef.range,
        supported: Boolean(frameRecord.sourceType),
        sourceInput: frameRecord.sourceStem || frameRecord.sourceSuffix,
        stemFrame: {
            stemKind: "patientive-source-stage",
            sourceStem: frameRecord.sourceStem,
            targetStem: frameRecord.outputStem,
            sourceSuffix: frameRecord.sourceSuffix,
            sourceCore: frameRecord.sourceCore,
            operation: frameRecord.operation,
        },
        targetContract: {
            metadataKind: "patientive-source-stage-frame",
            generationAllowed: false,
            outputSurface: frameRecord.outputSurface,
            sourceType: frameRecord.sourceType,
        },
    }));
}

function normalizeVerbDerivedPatientiveFamily(value = "") {
    const normalized = String(value || "").trim();
    if (normalized === "passive" || normalized === "pasivo") {
        return VERB_DERIVED_PATIENTIVE_FAMILY.passive;
    }
    if (normalized === "impersonal") {
        return VERB_DERIVED_PATIENTIVE_FAMILY.impersonal;
    }
    if (normalized === "nonactive") {
        return VERB_DERIVED_PATIENTIVE_FAMILY.nonactive;
    }
    if (normalized === "perfectivo" || normalized === "perfective") {
        return VERB_DERIVED_PATIENTIVE_FAMILY.perfectivo;
    }
    if (normalized === "imperfectivo" || normalized === "imperfective") {
        return VERB_DERIVED_PATIENTIVE_FAMILY.imperfectivo;
    }
    if (normalized === "tronco-verbal" || normalized === "root-stock" || normalized === "root-or-stock") {
        return VERB_DERIVED_PATIENTIVE_FAMILY.troncoVerbal;
    }
    if (normalized === "customary-present-passive" || normalized === "customary-present-patientive") {
        return VERB_DERIVED_PATIENTIVE_FAMILY.customaryPresent;
    }
    return normalized || "";
}

function buildVerbDerivedPatientiveFamilyProfile(patientivoSource = "", {
    nominalKind = "",
    sourceTense = "",
    sourceStageFrame = null,
} = {}) {
    const family = normalizeVerbDerivedPatientiveFamily(patientivoSource);
    if (!family) {
        return null;
    }
    const familyProfiles = {
        [VERB_DERIVED_PATIENTIVE_FAMILY.nonactive]: {
            label: "pasivo/impersonal",
            sourcePattern: "nonactive-passive-impersonal",
            sourcePatternLabel: "nucleo no activo",
            sourceFamilyIds: ["passive-core", "impersonal-core"],
            sourceFamilyLabel: "pasivo + impersonal (no distinguido)",
            sourceFamilyBoundary: "current-nonactive-branch-does-not-distinguish-passive-vs-impersonal",
            andrewsAnalogue: "passive and impersonal patientive sources",
        },
        [VERB_DERIVED_PATIENTIVE_FAMILY.passive]: {
            label: "pasivo",
            sourcePattern: "passive-core",
            sourcePatternLabel: "nucleo pasivo",
            sourceFamilyIds: ["passive-core"],
            sourceFamilyLabel: "pasivo",
            sourceFamilyBoundary: "realized-through-current-nonactive-builder",
            andrewsAnalogue: "passive patientive source",
        },
        [VERB_DERIVED_PATIENTIVE_FAMILY.impersonal]: {
            label: "impersonal",
            sourcePattern: "impersonal-core",
            sourcePatternLabel: "nucleo impersonal",
            sourceFamilyIds: ["impersonal-core"],
            sourceFamilyLabel: "impersonal",
            sourceFamilyBoundary: "realized-through-current-nonactive-builder",
            andrewsAnalogue: "impersonal patientive source",
        },
        [VERB_DERIVED_PATIENTIVE_FAMILY.perfectivo]: {
            label: "perfectivo",
            sourcePattern: "perfective-active-stem",
            sourcePatternLabel: "tronco perfectivo activo",
            sourceFamilyIds: ["perfective-active-core"],
            sourceFamilyLabel: "perfectivo activo",
            sourceFamilyBoundary: "",
            andrewsAnalogue: "perfective active patientive source",
        },
        [VERB_DERIVED_PATIENTIVE_FAMILY.imperfectivo]: {
            label: "imperfectivo",
            sourcePattern: "imperfective-active-stem",
            sourcePatternLabel: "tronco imperfectivo activo",
            sourceFamilyIds: ["imperfective-active-core"],
            sourceFamilyLabel: "imperfectivo activo",
            sourceFamilyBoundary: "",
            andrewsAnalogue: "imperfective active patientive source",
        },
        [VERB_DERIVED_PATIENTIVE_FAMILY.troncoVerbal]: {
            label: "tronco verbal",
            sourcePattern: "root-or-stock-stem",
            sourcePatternLabel: "raiz/tronco",
            sourceFamilyIds: ["root-or-stock"],
            sourceFamilyLabel: "raiz/tronco",
            sourceFamilyBoundary: "",
            andrewsAnalogue: "root/stock patientive source",
        },
        [VERB_DERIVED_PATIENTIVE_FAMILY.customaryPresent]: {
            label: "presente habitual patientivo",
            sourcePattern: "customary-present-passive-core",
            sourcePatternLabel: "nucleo pasivo + presente habitual",
            sourceFamilyIds: ["passive-customary-present-core"],
            sourceFamilyLabel: "pasivo habitual reanalizado como NNC",
            sourceFamilyBoundary: "customary-present-patientive-nnc",
            andrewsAnalogue: "customary-present patientive NNC",
        },
    };
    const profile = familyProfiles[family] || {
        label: family,
        sourcePattern: VERB_DERIVED_PATIENTIVE_FAMILY.unknown,
        sourcePatternLabel: "fuente no confirmada",
        sourceFamilyIds: ["unknown"],
        sourceFamilyLabel: "no confirmada",
        sourceFamilyBoundary: "unknown-patientive-source",
        andrewsAnalogue: "unknown patientive source",
    };
    return Object.freeze({
        version: 1,
        family,
        label: profile.label,
        sourcePattern: profile.sourcePattern,
        sourcePatternLabel: profile.sourcePatternLabel,
        sourceFamilyIds: Object.freeze(Array.from(profile.sourceFamilyIds || [])),
        sourceFamilyLabel: profile.sourceFamilyLabel,
        sourceFamilyBoundary: profile.sourceFamilyBoundary,
        sourceTense: String(sourceTense || ""),
        nominalKind: String(nominalKind || ""),
        curriculumRef: Object.freeze({
            source: "Andrews",
            range: "37.9-39",
            role: "patientive-family-analogue",
        }),
        sourceStageModel: Object.freeze({
            slot: "#3 salida",
            sourceCore: profile.sourcePattern,
            patientiveFamily: family,
            outputStage: "patientive-noun-output",
        }),
        sourceStageFrame: sourceStageFrame || null,
        andrewsAnalogue: profile.andrewsAnalogue,
        implementedAs: "current-patientivo-branch",
        isGeneratedSurfaceOnly: true,
        isCompletePatientiveTaxonomy: false,
        boundaries: Object.freeze({
            noNewSurfaceForms: true,
            noFixtureEvidence: true,
            noFullLessons38_39Engine: true,
            doesNotImplementOwnerhood: true,
            doesNotImplementLizZDeverbalNouns: true,
        }),
    });
}

function getVerbDerivedNominalProfileDefaults(nominalKind = "", patientivoSource = "") {
    const kind = String(nominalKind || "");
    const resolvedPatientivoSource = normalizeVerbDerivedPatientiveFamily(patientivoSource);
    if (kind === "sustantivo-verbal") {
        return {
            nominalizationKind: "action-nominal",
            semanticRole: "action/process",
            sourceTense: "futuro",
        };
    }
    if (kind === "agentivo") {
        return {
            nominalizationKind: "customary-present-agentive",
            semanticRole: "agent",
            sourceTense: "presente-habitual",
        };
    }
    if (kind === "agentivo-presente") {
        return {
            nominalizationKind: "present-agentive",
            semanticRole: "agent",
            sourceTense: "presente",
        };
    }
    if (kind === "agentivo-preterito") {
        return {
            nominalizationKind: "preterit-agentive",
            semanticRole: "agent",
            sourceTense: "preterito",
        };
    }
    if (kind === "agentivo-futuro") {
        return {
            nominalizationKind: "future-agentive",
            semanticRole: "agent",
            sourceTense: "futuro",
        };
    }
    if (kind === "patientivo") {
        return {
            nominalizationKind: "patientive",
            semanticRole: "patient/result",
            patientiveFamily: resolvedPatientivoSource,
            sourceTense: resolvedPatientivoSource === "imperfectivo"
                ? "imperfecto"
                : (resolvedPatientivoSource === "perfectivo" ? "preterito" : ""),
        };
    }
    if (kind === "instrumentivo") {
        return {
            nominalizationKind: "instrumentive",
            semanticRole: "instrument",
            sourceTense: "presente-habitual",
        };
    }
    if (kind === "calificativo-instrumentivo") {
        return {
            nominalizationKind: "quality-result",
            semanticRole: "quality/result",
            sourceTense: "pasado-remoto",
        };
    }
    if (kind === "potencial") {
        return {
            nominalizationKind: "potential-patient",
            semanticRole: "potential-patient",
            sourceTense: "futuro",
        };
    }
    if (kind === "potencial-habitual") {
        return {
            nominalizationKind: "customary-present-patientive",
            semanticRole: "patient/customary-fitness",
            patientiveFamily: "customary-present-passive",
            sourceTense: "presente-habitual",
        };
    }
    if (kind === "locativo-temporal") {
        return {
            nominalizationKind: "locative-temporal",
            semanticRole: "place/time",
            sourceTense: "imperfecto",
        };
    }
    if (kind === "adjetivo-patientivo-no-activo" || kind === "patientivo-nonactive-ti") {
        return {
            nominalizationKind: "patientive-adjectival",
            semanticRole: "property",
            patientiveFamily: "nonactive",
            adjectivalFunction: "predicate-surface",
        };
    }
    if (kind === "adjetivo-patientivo-perfectivo" || kind === "patientivo-perfective-ti") {
        return {
            nominalizationKind: "patientive-adjectival",
            semanticRole: "property",
            patientiveFamily: "perfectivo",
            adjectivalFunction: "predicate-surface",
        };
    }
    if (kind.startsWith("adjetivo-") || kind === "potencial" || kind === "potencial-habitual") {
        return {
            nominalizationKind: "adjectival-surface",
            semanticRole: "property",
            adjectivalFunction: "predicate-surface",
            sourceTense: kind.includes("perfecto")
                ? "perfecto"
                : (kind.includes("preterito") ? "preterito" : ""),
        };
    }
    return {
        nominalizationKind: kind || "unknown",
        semanticRole: "",
        sourceTense: "",
    };
}

function buildVerbDerivedNominalPossessorSourceFrame({
    nominalKind = "",
    sourceModel = null,
    predicateStateSlot = null,
    isGeneralUseActionNominal = false,
    isGeneralUsePassiveActionNominal = false,
} = {}) {
    const kind = String(nominalKind || "");
    const hasPossessor = predicateStateSlot?.hasPossessor === true;
    const possessorPrefix = String(predicateStateSlot?.possessorPrefix || "");
    if (!hasPossessor || !possessorPrefix) {
        return null;
    }
    if (kind === "agentivo-preterito") {
        return Object.freeze({
            version: 1,
            grammarSource: "Andrews 36.12",
            possessorOrigin: "external",
            sourceSubjectRelation: "retained-as-nnc-subject",
            contrastNominalKind: "calificativo-instrumentivo",
            notSourceSubjectTransform: true,
            notExternalPossessorImport: false,
        });
    }
    if (kind === "calificativo-instrumentivo" && isGeneralUseActionNominal) {
        const sourceSubject = Object.freeze({
            prefix: String(sourceModel?.sourceSubjectPrefix || ""),
            suffix: String(sourceModel?.sourceSubjectSuffix || ""),
        });
        return Object.freeze({
            version: 1,
            grammarSource: isGeneralUsePassiveActionNominal
                ? "Andrews 36.10/36.12"
                : "Andrews 36.11/36.12",
            possessorOrigin: "source-vnc-subject",
            sourceSubjectRelation: "transformed-to-possessor",
            contrastNominalKind: "agentivo-preterito",
            notSourceSubjectTransform: false,
            notExternalPossessorImport: true,
            sourceSubject,
        });
    }
    return null;
}

function buildVerbDerivedNominalizationProfile({
    nominalKind = "",
    sourceModel = null,
    sourceTense = "",
    predicateStateSlot = null,
    num1Num2 = null,
    patientivoSource = "",
    patientiveSourceStageFrame = null,
    patientiveMultipleDerivationContract = null,
    generatedSurface = true,
} = {}) {
    const kind = String(nominalKind || "");
    const defaults = getVerbDerivedNominalProfileDefaults(kind, patientivoSource);
    const isImpersonalActionNominal = kind === "sustantivo-verbal"
        && String(sourceModel?.combinedMode || "") === "nonactive";
    const isGeneralUseActionNominal = kind === "calificativo-instrumentivo"
        && String(sourceModel?.actionNounStemUse || "") === "general-use";
    const isGeneralUsePassiveActionNominal = isGeneralUseActionNominal
        && String(sourceModel?.combinedMode || "") === "nonactive";
    const isGeneralUseActiveActionNominal = isGeneralUseActionNominal
        && !isGeneralUsePassiveActionNominal;
    const roleDefaults = isImpersonalActionNominal ? {
        ...defaults,
        nominalizationKind: "impersonal-action-nominal",
        semanticRole: "general action",
        sourceTense: "impersonal-core",
    } : (
        isGeneralUsePassiveActionNominal ? {
            ...defaults,
            nominalizationKind: "passive-action-nominal",
            semanticRole: "patient/action",
            sourceTense: "pasado-remoto",
        } : (
            isGeneralUseActiveActionNominal ? {
                ...defaults,
                nominalizationKind: "active-action-nominal",
                semanticRole: "agent/action",
                sourceTense: "pasado-remoto",
            } : defaults
        )
    );
    const hasPossessor = predicateStateSlot?.hasPossessor === true;
    const resolvedSourceTense = String(
        sourceTense
        || (kind === "instrumentivo" && hasPossessor ? "imperfecto" : "")
        || roleDefaults.sourceTense
        || ""
    );
    const usesPatientiveFamily = kind === "patientivo" || Object.prototype.hasOwnProperty.call(defaults, "patientiveFamily");
    const patientiveFamilySource = kind === "potencial-habitual"
        ? (defaults.patientiveFamily || patientivoSource || "")
        : (patientivoSource || defaults.patientiveFamily || "");
    const resolvedPatientiveFamily = usesPatientiveFamily
        ? normalizeVerbDerivedPatientiveFamily(patientiveFamilySource)
        : "";
    const patientiveFamilyProfile = resolvedPatientiveFamily
        ? buildVerbDerivedPatientiveFamilyProfile(resolvedPatientiveFamily, {
            nominalKind: kind,
            sourceTense: resolvedSourceTense,
            sourceStageFrame: patientiveSourceStageFrame,
        })
        : null;
    const possessorSourceFrame = buildVerbDerivedNominalPossessorSourceFrame({
        nominalKind: kind,
        sourceModel,
        predicateStateSlot,
        isGeneralUseActionNominal,
        isGeneralUsePassiveActionNominal,
    });
    const connectorSlot = num1Num2 || null;
    const profile = {
        version: 1,
        outputKind: "verb-derived-nominal",
        nominalKind: kind,
        curriculumRef: Object.freeze({
            source: "Andrews",
            range: "35-41",
            role: "curriculum-index",
        }),
        source: Object.freeze({
            sourceMode: "verbo",
            sourceTense: resolvedSourceTense,
            sourceCategory: "VNC",
            matrixBase: String(sourceModel?.matrixBase || ""),
            sourceRawVerb: String(sourceModel?.sourceRawVerb || ""),
            analysisVerb: String(sourceModel?.analysisVerb || ""),
            sourceCombinedMode: String(sourceModel?.combinedMode || ""),
        }),
        role: Object.freeze({
            nominalizationKind: roleDefaults.nominalizationKind || kind || "unknown",
            semanticRole: roleDefaults.semanticRole || "",
            patientiveFamily: resolvedPatientiveFamily,
            adjectivalFunction: roleDefaults.adjectivalFunction || "",
        }),
        patientiveFamilyProfile,
        patientiveSourceStageFrame: patientiveSourceStageFrame || null,
        patientiveMultipleDerivationContract: (
            patientiveMultipleDerivationContract
            && typeof patientiveMultipleDerivationContract === "object"
            && patientiveMultipleDerivationContract.kind === "patientive-multiple-derivation-contract"
        ) ? patientiveMultipleDerivationContract : null,
        categoryTransition: Object.freeze({
            sourceCategory: "VNC",
            targetCategory: "NNC",
            process: "structural-nominalization",
        }),
        predicateState: Object.freeze({
            value: String(predicateStateSlot?.state || ""),
            slot: String(predicateStateSlot?.slot || "predicate.state"),
            hasPossessor,
            possessorPrefix: String(predicateStateSlot?.possessorPrefix || ""),
        }),
        possessorSourceFrame,
        num1Num2: connectorSlot,
        boundaries: Object.freeze({
            nominalizationScope: "structural-word-output",
            isGeneratedSurface: generatedSurface !== false,
            isFullParadigm: false,
            isFunctionalSupplementation: false,
            isAdjectivalModification: false,
            doesNotImplementLessons42_43: true,
        }),
    };
    return Object.freeze(profile);
}

function buildVerbDerivedNominalSourceModel(options = {}, kind = "") {
    const chain = buildFullDerivationSourceChain(
        options,
        options?.verb || "",
        options?.analysisVerb || options?.verb || "",
    );
    const matrixBase = normalizeRuleBase(
        options?.matrixBaseOverride
        || options?.exactBaseVerb
        || chain?.model?.matrixBase
        || chain?.baseVerb
        || options?.analysisVerb
        || options?.verb
        || ""
    );
    return Object.freeze({
        nounDerivationKind: String(kind || ""),
        chain,
        derivationModel: chain?.model || null,
        matrixBase,
        sourceRawVerb: String(options?.sourceRawVerb || options?.verb || ""),
        analysisVerb: String(options?.analysisVerb || options?.verb || ""),
        directionalPrefix: String(options?.directionalPrefix || ""),
        isTransitive: options?.isTransitive === true,
        combinedMode: String(options?.combinedMode || ""),
        actionNounStemUse: String(options?.actionNounStemUse || ""),
        sourceSubjectPrefix: String(options?.sourceSubjectPrefix || ""),
        sourceSubjectSuffix: String(options?.sourceSubjectSuffix || ""),
        runtimeObjectSelection: Object.freeze({
            objectPrefix: String(options?.objectPrefix || ""),
            indirectObjectMarker: String(options?.indirectObjectMarker || ""),
            thirdObjectMarker: String(options?.thirdObjectMarker || ""),
        }),
    });
}

function buildVerbDerivedNominalSourceModelFromRawVerb(rawVerb = "", kind = "") {
    const sourceRawVerb = String(rawVerb || "");
    if (!sourceRawVerb) {
        return null;
    }
    const parsedVerb = parseVerbInput(sourceRawVerb);
    if (!parsedVerb || typeof parsedVerb !== "object") {
        return null;
    }
    return buildVerbDerivedNominalSourceModel({
        ...parsedVerb,
        sourceRawVerb,
        verb: parsedVerb.verb || sourceRawVerb,
        analysisVerb: parsedVerb.analysisVerb || parsedVerb.verb || sourceRawVerb,
    }, kind);
}

function getVerbDerivedNominalLexicalOuterPrefix(sourceModel = null) {
    const outerPieces = Array.isArray(sourceModel?.derivationModel?.outerPieces)
        ? sourceModel.derivationModel.outerPieces
        : [];
    return outerPieces
        .filter((piece) => piece?.type === "lexical" && piece?.value)
        .map((piece) => piece.value)
        .join("");
}

function resolveVerbDerivedNominalSourceOuterSurfacePlacement({
    sourceModel = null,
    runtimeObjectPrefix = "",
    objectPrefix = "",
    verb = "",
    surfaceRuleMeta = null,
} = {}) {
    const nextVerbValue = String(verb || "");
    const nextRuntimeObjectPrefix = String(runtimeObjectPrefix || "");
    let nextObjectPrefix = String(objectPrefix || "");
    let nextSurfaceRuleMeta = (
        surfaceRuleMeta && typeof surfaceRuleMeta === "object"
    ) ? { ...surfaceRuleMeta } : null;
    if (!nextVerbValue) {
        return {
            objectPrefix: nextObjectPrefix,
            verb: nextVerbValue,
            surfaceRuleMeta: nextSurfaceRuleMeta,
        };
    }
    const lexicalOuterPrefix = getVerbDerivedNominalLexicalOuterPrefix(sourceModel);
    if (!lexicalOuterPrefix) {
        return {
            objectPrefix: nextObjectPrefix,
            verb: nextVerbValue,
            surfaceRuleMeta: nextSurfaceRuleMeta,
        };
    }
    if (String(nextSurfaceRuleMeta?.sourceOuterPrefix || "")) {
        return {
            objectPrefix: nextObjectPrefix,
            verb: nextVerbValue,
            surfaceRuleMeta: nextSurfaceRuleMeta,
        };
    }
    const detachableObjectPrefix = nextObjectPrefix || nextRuntimeObjectPrefix;
    if (detachableObjectPrefix) {
        const fusedLeadingSequence = `${detachableObjectPrefix}${lexicalOuterPrefix}`;
        if (nextVerbValue.startsWith(fusedLeadingSequence)) {
            nextObjectPrefix = detachableObjectPrefix;
            nextSurfaceRuleMeta = {
                ...(nextSurfaceRuleMeta || {}),
                sourceOuterPrefix: lexicalOuterPrefix,
            };
            return {
                objectPrefix: nextObjectPrefix,
                verb: nextVerbValue.slice(fusedLeadingSequence.length),
                surfaceRuleMeta: nextSurfaceRuleMeta,
            };
        }
    }
    if (nextVerbValue.startsWith(lexicalOuterPrefix)) {
        nextSurfaceRuleMeta = {
            ...(nextSurfaceRuleMeta || {}),
            sourceOuterPrefix: lexicalOuterPrefix,
        };
        return {
            objectPrefix: nextObjectPrefix,
            verb: nextVerbValue.slice(lexicalOuterPrefix.length),
            surfaceRuleMeta: nextSurfaceRuleMeta,
        };
    }
    return {
        objectPrefix: nextObjectPrefix,
        verb: nextVerbValue,
        surfaceRuleMeta: nextSurfaceRuleMeta,
    };
}

function buildVerbDerivedNominalEntry({
    kind = "",
    sourceModel = null,
    verb = "",
    subjectSuffix = "",
    stemSpec = null,
    formSpec = null,
    trailingSuffix = "",
    runtimeObjectPrefix = "",
    surfaceObjectPrefix = "",
    surfaceRuleMeta = null,
    sourceTense = "",
    provenance = null,
    metadata = {},
} = {}) {
    const resolvedStemSpec = (
        stemSpec
        && typeof stemSpec === "object"
        && stemSpec.kind
    ) ? stemSpec : null;
    const resolvedFormSpec = (
        formSpec
        && typeof formSpec === "object"
        && formSpec.kind
    ) ? formSpec : (
        resolvedStemSpec
            ? buildStemNominalFormSpec(resolvedStemSpec, subjectSuffix, {
                stem: verb,
            })
            : buildLiteralNominalFormSpec(verb, subjectSuffix)
    );
    const realized = realizeNominalFormSpec(resolvedFormSpec, {
        verb,
        subjectSuffix,
    });
    return buildNominalFormEntry(realized.verb, realized.subjectSuffix, {
        ...(metadata && typeof metadata === "object" ? metadata : {}),
        formSpec: resolvedFormSpec,
        stemSpec: resolvedStemSpec
            || (resolvedFormSpec?.kind === NOMINAL_FORM_SPEC_KIND.stem
                ? resolvedFormSpec.stemSpec
                : buildLiteralMorphStemSpec(realized.verb)),
        nounDerivationKind: String(
            kind
            || metadata?.nounDerivationKind
            || sourceModel?.nounDerivationKind
            || ""
        ),
        sourceModel: sourceModel || metadata?.sourceModel || null,
        trailingSuffix: String(trailingSuffix || metadata?.trailingSuffix || ""),
        runtimeObjectPrefix: String(runtimeObjectPrefix || metadata?.runtimeObjectPrefix || ""),
        surfaceObjectPrefix: String(surfaceObjectPrefix || metadata?.surfaceObjectPrefix || ""),
        surfaceRuleMeta: surfaceRuleMeta && typeof surfaceRuleMeta === "object"
            ? { ...surfaceRuleMeta }
            : (
                metadata?.surfaceRuleMeta && typeof metadata.surfaceRuleMeta === "object"
                    ? { ...metadata.surfaceRuleMeta }
                    : null
            ),
        sourceTense: String(sourceTense || metadata?.sourceTense || ""),
        provenance: provenance || metadata?.provenance || null,
    });
}

function normalizeVerbDerivedNominalEntry(entry = null, fallback = {}) {
    if (!entry || typeof entry !== "object") {
        return buildVerbDerivedNominalEntry({
            kind: fallback.kind || "",
            sourceModel: fallback.sourceModel || null,
            verb: fallback.verb || "",
            subjectSuffix: fallback.subjectSuffix || "",
            stemSpec: fallback.stemSpec || null,
            formSpec: fallback.formSpec || null,
            trailingSuffix: fallback.trailingSuffix || "",
            runtimeObjectPrefix: fallback.runtimeObjectPrefix || "",
            surfaceObjectPrefix: fallback.surfaceObjectPrefix || "",
            surfaceRuleMeta: fallback.surfaceRuleMeta || null,
            sourceTense: fallback.sourceTense || "",
            provenance: fallback.provenance || null,
            metadata: fallback,
        });
    }
    const realized = realizeNominalFormSpec(entry.formSpec || null, entry);
    return buildVerbDerivedNominalEntry({
        kind: entry.nounDerivationKind || fallback.kind || "",
        sourceModel: entry.sourceModel || fallback.sourceModel || null,
        verb: realized.verb || entry.verb || "",
        subjectSuffix: realized.subjectSuffix ?? entry.subjectSuffix ?? fallback.subjectSuffix ?? "",
        stemSpec: entry.stemSpec || null,
        formSpec: entry.formSpec || null,
        trailingSuffix: entry.trailingSuffix || fallback.trailingSuffix || "",
        runtimeObjectPrefix: entry.runtimeObjectPrefix || fallback.runtimeObjectPrefix || "",
        surfaceObjectPrefix: entry.surfaceObjectPrefix || fallback.surfaceObjectPrefix || "",
        surfaceRuleMeta: entry.surfaceRuleMeta || fallback.surfaceRuleMeta || null,
        sourceTense: entry.sourceTense || fallback.sourceTense || "",
        provenance: entry.provenance || fallback.provenance || null,
        metadata: entry,
    });
}

function normalizeVerbDerivedNominalEntries(entries = [], fallback = {}) {
    return (Array.isArray(entries) ? entries : [])
        .map((entry) => normalizeVerbDerivedNominalEntry(entry, fallback))
        .filter(Boolean);
}

function buildVerbDerivedNominalOutputEntry({
    kind = "",
    sourceModel = null,
    runtimeObjectPrefix = "",
    objectPrefix = "",
    verb = "",
    subjectSuffix = "",
    trailingSuffix = "",
    stemSpec = null,
    sourceTense = "",
    provenance = null,
    surfaceRuleMeta = null,
    metadata = {},
} = {}) {
    const nominalSurface = resolveVerbDerivedNominalSourceOuterSurfacePlacement({
        sourceModel,
        runtimeObjectPrefix,
        objectPrefix,
        verb,
        surfaceRuleMeta,
    });
    const placedVerb = String(nominalSurface.verb || "");
    const sourceVerb = String(verb || "");
    const sourceOuterPrefix = String(nominalSurface.surfaceRuleMeta?.sourceOuterPrefix || "");
    const resolvedStemSpec = (
        placedVerb
        && placedVerb !== sourceVerb
        && sourceOuterPrefix
        && stemSpec
        && typeof stemSpec === "object"
        && stemSpec.kind
    )
        ? buildStripPrefixMorphStemSpec(stemSpec, sourceOuterPrefix, {
            sourceBase: stemSpec?.sourceBase || "",
            sourceSuffix: stemSpec?.sourceSuffix || "",
        })
        : (
            placedVerb
            && placedVerb !== sourceVerb
            && sourceOuterPrefix
            && sourceVerb.startsWith(sourceOuterPrefix)
            && sourceVerb.slice(sourceOuterPrefix.length) === placedVerb
        )
            ? buildStripPrefixMorphStemSpec(sourceVerb, sourceOuterPrefix, {
                sourceBase: sourceModel?.matrixBase || sourceVerb,
                sourceSuffix: "",
            })
        : (
            placedVerb
            && placedVerb !== sourceVerb
        )
            ? buildLiteralMorphStemSpec(placedVerb)
        : stemSpec;
    return buildVerbDerivedNominalEntry({
        kind,
        sourceModel,
        verb: placedVerb,
        subjectSuffix,
        stemSpec: resolvedStemSpec,
        trailingSuffix,
        runtimeObjectPrefix,
        surfaceObjectPrefix: nominalSurface.objectPrefix,
        surfaceRuleMeta: nominalSurface.surfaceRuleMeta,
        sourceTense,
        provenance,
        metadata,
    });
}

function buildStructuredPrefixedStemSpec({
    stemSpec = null,
    verb = "",
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    output = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    directionalChainMeta = null,
    surfaceRuleMeta = null,
} = {}) {
    const resolvedStemSpec = (
        stemSpec
        && typeof stemSpec === "object"
        && stemSpec.kind
    ) ? stemSpec : null;
    if (!resolvedStemSpec) {
        return null;
    }
    const baseVerb = String(verb || "");
    const normalizedSubjectPrefix = String(subjectPrefix || "");
    const normalizedPossessivePrefix = String(possessivePrefix || "");
    const normalizedObjectPrefix = String(objectPrefix || "");
    const expectedOutput = buildOutputPrefixedChain({
        pers1: normalizedSubjectPrefix,
        poseedor: normalizedPossessivePrefix,
        obj1: normalizedObjectPrefix,
        tronco: baseVerb,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        directionalChainMeta,
        surfaceRuleMeta,
    });
    if (!expectedOutput || expectedOutput !== String(output || "")) {
        return null;
    }
    let nextSpec = resolvedStemSpec;
    if (normalizedObjectPrefix) {
        nextSpec = buildPrependMorphStemSpec(nextSpec, normalizedObjectPrefix, {
            sourceBase: nextSpec?.sourceBase || baseVerb,
            sourceSuffix: nextSpec?.sourceSuffix || "",
        }) || nextSpec;
    }
    if (normalizedPossessivePrefix) {
        nextSpec = buildPrependMorphStemSpec(nextSpec, normalizedPossessivePrefix, {
            sourceBase: nextSpec?.sourceBase || baseVerb,
            sourceSuffix: nextSpec?.sourceSuffix || "",
        }) || nextSpec;
    }
    if (normalizedSubjectPrefix) {
        nextSpec = buildPrependMorphStemSpec(nextSpec, normalizedSubjectPrefix, {
            sourceBase: nextSpec?.sourceBase || baseVerb,
            sourceSuffix: nextSpec?.sourceSuffix || "",
        }) || nextSpec;
    }
    return nextSpec;
}

function applyVerbDerivedNominalPlacementToEntry(entry = null, sourceModel = null, {
    runtimeObjectPrefix = "",
    objectPrefix = "",
} = {}) {
    const normalizedEntry = normalizeVerbDerivedNominalEntry(entry);
    if (!normalizedEntry) {
        return null;
    }
    return buildVerbDerivedNominalOutputEntry({
        kind: normalizedEntry.nounDerivationKind || "",
        sourceModel: sourceModel || normalizedEntry.sourceModel || null,
        runtimeObjectPrefix: runtimeObjectPrefix || normalizedEntry.runtimeObjectPrefix || "",
        objectPrefix: objectPrefix || normalizedEntry.surfaceObjectPrefix || "",
        verb: normalizedEntry.verb || "",
        subjectSuffix: normalizedEntry.subjectSuffix || "",
        trailingSuffix: normalizedEntry.trailingSuffix || "",
        stemSpec: normalizedEntry.stemSpec || null,
        sourceTense: normalizedEntry.sourceTense || "",
        provenance: normalizedEntry.provenance || null,
        surfaceRuleMeta: normalizedEntry.surfaceRuleMeta || null,
        metadata: normalizedEntry,
    });
}

function buildVerbDerivedNominalResult(entries = [], {
    kind = "",
    possessivePrefix = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
} = {}) {
    const normalizedEntries = normalizeVerbDerivedNominalEntries(entries, { kind });
    const forms = new Set();
    normalizedEntries.forEach((entry) => {
        const realized = realizeNominalFormSpec(entry.formSpec || null, entry);
        const text = buildNominalOutputText({
            poseedor: possessivePrefix || "",
            obj1: entry.surfaceObjectPrefix || "",
            tronco: realized.verb,
            pers2: realized.subjectSuffix,
            sufijoNominal: entry.trailingSuffix || "",
            hasOptionalSupportiveI,
            optionalSupportiveLetter,
            surfaceRuleMeta: entry.surfaceRuleMeta || null,
        });
        if (text) {
            forms.add(text);
        }
    });
    const num1Num2Alternates = [];
    const seenConnectorKeys = new Set();
    normalizedEntries.forEach((entry) => {
        const connector = normalizeNominalNum1Num2(entry?.num1Num2 || null, {
            subjectSuffix: entry?.subjectSuffix || "",
            nominalKind: kind || entry?.nounDerivationKind || "",
            predicateState: "derived-nominal",
            source: entry?.sourceTense || "",
        });
        const key = [
            connector.surface,
            connector.nominalKind,
            connector.predicateState,
            connector.source,
        ].join("|");
        if (!seenConnectorKeys.has(key)) {
            seenConnectorKeys.add(key);
            num1Num2Alternates.push(connector);
        }
    });
    const primaryConnector = num1Num2Alternates[0] || null;
    const nounDerivationKind = kind || normalizedEntries[0]?.nounDerivationKind || "";
    const sourceTenses = normalizedEntries
        .map((entry) => String(entry?.sourceTense || ""))
        .filter(Boolean);
    const primarySourceTense = sourceTenses[0] || "";
    const hasPossessor = Boolean(possessivePrefix);
    const predicateStateSlot = Object.freeze({
        role: "predicate-state",
        slot: "predicate.state",
        state: hasPossessor ? "possessive" : "absolutive",
        statePosition: hasPossessor ? "possessor" : "vacant",
        isVacant: !hasPossessor,
        hasPossessor,
        participantRole: hasPossessor ? "possessor" : "",
        possessorPrefix: possessivePrefix || "",
        notSubjectConnector: true,
        notTense: true,
    });
    const output = {
        result: Array.from(forms).join(" / "),
        entries: normalizedEntries,
        sourceModel: normalizedEntries[0]?.sourceModel || null,
        nounDerivationKind,
        num1Num2: primaryConnector,
        num1Num2Alternates,
        nominalizationProfile: buildVerbDerivedNominalizationProfile({
            nominalKind: nounDerivationKind,
            sourceModel: normalizedEntries[0]?.sourceModel || null,
            sourceTense: primarySourceTense,
            predicateStateSlot,
            num1Num2: primaryConnector,
        }),
        nominalClauseFrame: primaryConnector ? Object.freeze({
            version: 1,
            clauseKind: "nominal-nuclear-clause",
            predicateKind: nounDerivationKind,
            hasTensePosition: false,
            tense: null,
            subject: Object.freeze({
                numberConnector: primaryConnector,
                numberConnectors: Object.freeze([...num1Num2Alternates]),
            }),
            predicate: Object.freeze({
                kind: nounDerivationKind,
                state: predicateStateSlot.state,
                stateSlot: predicateStateSlot,
            }),
            stateSlot: predicateStateSlot,
        }) : null,
    };
    return output;
}

function isNominalMorphProfileTense(tenseValue = "") {
    return isNonanimateNounTense(tenseValue)
        || isPotencialProfileTense(tenseValue)
        || isPatientivoAdjectiveTense(tenseValue)
        || tenseValue === "agentivo"
        || tenseValue === "agentivo-presente"
        || tenseValue === "agentivo-preterito"
        || tenseValue === "agentivo-futuro"
        || tenseValue === "patientivo"
        || tenseValue === "instrumentivo"
        || tenseValue === "calificativo-instrumentivo"
        || tenseValue === "locativo-temporal";
}

function buildSurfaceRouteText(sourceBase = "", sourceSuffix = "", outputStem = "") {
    const normalizedSourceSuffix = normalizeDerivationStemValue(sourceSuffix);
    const normalizedOutputStem = normalizeDerivationStemValue(outputStem);
    if (!normalizedSourceSuffix || !normalizedOutputStem) {
        return "";
    }
    const normalizedSourceBase = normalizeDerivationStemValue(sourceBase);
    if (normalizedSourceBase && !normalizedOutputStem.startsWith(normalizedSourceBase)) {
        return "";
    }
    const resultSuffix = normalizedOutputStem.slice(normalizedSourceBase.length);
    if (!resultSuffix) {
        return "";
    }
    return `${normalizedSourceSuffix} → ${resultSuffix}`;
}

function buildMorphStemGuidanceRoute(spec = null) {
    if (!spec || typeof spec !== "object") {
        return "";
    }
    const sourceBase = normalizeRuleBase(String(spec.sourceBase || "").trim().toLowerCase());
    const sourceSuffix = normalizeRuleBase(String(spec.sourceSuffix || "").trim().toLowerCase());
    const surfaceStem = realizeMorphStemSpec(spec);
    return buildSurfaceRouteText(sourceBase, sourceSuffix, surfaceStem);
}

function isValenceNeutralIntransitiveStem(stem) {
    if (!stem) {
        return false;
    }
    const neutral = VALENCE_NEUTRAL_RULES || {};
    const intransitiveList = Array.isArray(neutral?.intransitiveToApplicative?.verbs)
        ? neutral.intransitiveToApplicative.verbs
        : [];
    const intransitiveSuffixes = Array.isArray(neutral?.intransitiveToApplicative?.suffixes)
        ? neutral.intransitiveToApplicative.suffixes
        : [];
    const causativeSuffixes = Array.isArray(neutral?.intransitiveToCausative?.suffixes)
        ? neutral.intransitiveToCausative.suffixes
        : [];
    if (intransitiveList.includes(stem)) {
        return true;
    }
    const suffixCandidates = [...intransitiveSuffixes, ...causativeSuffixes];
    return suffixCandidates.some((suffix) => (
        suffix
        && stem.endsWith(suffix)
        && stem.length > suffix.length
    ));
}

function getCausativeDerivationOptions(verb, analysisVerb, options = {}) {
    const source = verb || analysisVerb;
    const allowTypeTwo = options.allowTypeTwo !== false;
    const hasLeadingDash = options.hasLeadingDash === true;
    const rawRuleBase = options.ruleBase
        || options.canonicalRuleBase
        || getCanonicalRuleBaseFromOptions(source, options);
    const ruleBase = normalizeRuleBase(rawRuleBase);
    const rawFullRuleBase = options.canonicalFullRuleBase
        || (options.parsedVerb && options.parsedVerb.canonicalFullRuleBase)
        || (options.parsedVerb && options.parsedVerb.canonical && options.parsedVerb.canonical.fullRuleBase)
        || (options.verbMeta && options.verbMeta.canonicalFullRuleBase)
        || (options.verbMeta && options.verbMeta.canonical && options.verbMeta.canonical.fullRuleBase)
        || (options.fullRuleBase || "");
    const fullRuleBase = normalizeRuleBase(rawFullRuleBase);
    const getWiWaPolicyRuleBaseInput = () => {
        const directInput = rawRuleBase || ruleBase;
        const parsed = options?.parsedVerb;
        if (!parsed || parsed.hasSlashMarker !== true) {
            return directInput;
        }
        const matrixRoot = normalizeDerivationStemValue(
            parsed.analysisVerb
            || parsed.canonicalRuleBase
            || parsed?.canonical?.ruleBase
            || directInput
        );
        const matrixRootDescriptor = matrixRoot
            ? buildCausativeDescriptor(matrixRoot, {})
            : null;
        if (
            !matrixRootDescriptor
            || !causativeDescriptorMatches(matrixRootDescriptor, {
                endingFamilies: ["w+i", "w+a"],
            })
        ) {
            return directInput;
        }
        const lexicalBoundPrefixes = getLexicalBoundPrefixes(
            Array.isArray(parsed.boundPrefixes) ? parsed.boundPrefixes : [],
            Array.isArray(parsed.boundExplicitFlags) ? parsed.boundExplicitFlags : []
        );
        if (!lexicalBoundPrefixes.length) {
            return directInput;
        }
        const embedRoot = normalizeDerivationStemValue(lexicalBoundPrefixes.join(""));
        if (!embedRoot) {
            return directInput;
        }
        return `${embedRoot}/${matrixRoot}`;
    };
    if (!ruleBase || !VOWEL_END_RE.test(ruleBase)) {
        return [];
    }
    const rules = DERIVATIONAL_RULES?.causative || {};
    const isTransitive = options.isTransitive === true || options.hasLeadingDash === true;
    let isIntransitive = options.isTransitive === false ? true : !isTransitive;
    const neutralCausative = VALENCE_NEUTRAL_RULES?.intransitiveToCausative || {};
    const neutralVerbs = Array.isArray(neutralCausative?.verbs)
        ? neutralCausative.verbs
        : [];
    const neutralSuffixes = Array.isArray(neutralCausative?.suffixes)
        ? neutralCausative.suffixes
        : [];
    const matchesNeutralSuffix = (base) => neutralSuffixes.some((suffix) => (
        suffix
        && base.endsWith(suffix)
        && base.length > suffix.length
    ));
    const matchNeutralBase = (base) => Boolean(base && (neutralVerbs.includes(base) || matchesNeutralSuffix(base)));
    const results = [];
    const seen = new Set();
    let causativeTrace = {
        ruleBase,
        fullRuleBase,
        isTransitive,
        isIntransitive,
    };
    const push = (stemOrSpec, meta = {}) => {
        const stemSpec = (stemOrSpec && typeof stemOrSpec === "object" && stemOrSpec.kind)
            ? stemOrSpec
            : buildLiteralMorphStemSpec(stemOrSpec);
        const stem = realizeMorphStemSpec(stemSpec);
        if (!stem) {
            return;
        }
        if (!isSyllableSequencePronounceable(stem)) {
            return;
        }
        const key = stem;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        results.push({
            stem,
            stemSpec,
            ...meta,
            causativeTrace,
        });
    };
    const pushWithRoute = (stemOrSpec, sourceBase = "", sourceSuffix = "", meta = {}) => {
        const stemSpec = (stemOrSpec && typeof stemOrSpec === "object" && stemOrSpec.kind)
            ? stemOrSpec
            : buildMorphStemSpecFromRoute(sourceBase, sourceSuffix, stemOrSpec);
        const routeText = buildMorphStemGuidanceRoute(stemSpec);
        push(stemSpec, {
            ...meta,
            guidanceRoute: routeText ? { text: routeText } : null,
        });
    };
    if (isIntransitive && !hasLeadingDash) {
        const matchBase = matchNeutralBase(fullRuleBase) ? fullRuleBase : (matchNeutralBase(ruleBase) ? ruleBase : "");
        if (matchBase) {
            push(matchBase, { type: "neutral", rule: "valence-neutral" });
            const allowAdditional = Array.isArray(neutralCausative?.allowAdditionalDerivations)
                ? neutralCausative.allowAdditionalDerivations
                : [];
            const allowNeutralPlus = matchesDerivationRuleBaseList(
                allowAdditional,
                ruleBase,
                fullRuleBase
            ) || allowAdditional.includes(matchBase);
            if (!allowNeutralPlus) {
                return results;
            }
        }
    }
    const rootPlusYaBase = options.rootPlusYaBase || "";
    const isSlashMatrixTiInput = Boolean(
        options?.parsedVerb?.hasSlashMarker
        && options?.parsedVerb?.hasBoundMarker
        && normalizeRuleBase(options?.parsedVerb?.analysisVerb || "") === "ti"
    );
    const tiCausativeClass = normalizeTiCausativeClass(
        options?.tiCausativeClass || options?.parsedVerb?.tiCausativeClass || ""
    );
    const initialCausativeDescriptor = buildCausativeDescriptor(ruleBase, {
        isTransitive,
        isIntransitive,
        isSlashMatrixTiInput,
        tiCausativeClass,
    });
    const isRootPlusYa = Boolean(rootPlusYaBase) && causativeDescriptorMatches(initialCausativeDescriptor, {
        endingFamily: "y+a",
    });
    const causativeDescriptor = isRootPlusYa
        ? buildCausativeDescriptor(ruleBase, {
            isTransitive,
            isIntransitive,
            isRootPlusYa,
            isSlashMatrixTiInput,
            tiCausativeClass,
        })
        : initialCausativeDescriptor;
    const causativePattern = createCausativeDescriptorMatcher(causativeDescriptor);
    const hasEndingFamily = (endingFamily) => causativePattern.has({ endingFamily });
    const finalOnset = causativeDescriptor.finalOnset;
    const finalNucleus = causativeDescriptor.finalNucleus;
    const previousSyllableForm = causativeDescriptor.previousSyllableForm;
    const previousSyllableOnset = causativeDescriptor.previousSyllableOnset;
    const previousSyllableNucleus = causativeDescriptor.previousSyllableNucleus;
    const previousHasCoda = causativeDescriptor.previousHasCoda;
    const preFinalSegment = causativeDescriptor.preFinalSegment;
    const preFinalIsConsonant = causativeDescriptor.preFinalIsConsonant === true;
    const firstOnsetDescriptor = causativeDescriptor.firstOnset;
    const allowTiClassOverride = Boolean(
        causativePattern.has({
            endingFamily: "t+i",
            tiCausativeClasses: ["become", "have"],
        })
    );
    const forceTiBecomeTypeTwo = causativePattern.has({
        endingFamily: "t+i",
        tiCausativeClass: "become",
    });
    const forceTiHaveTypeTwo = causativePattern.has({
        endingFamily: "t+i",
        tiCausativeClass: "have",
    });
    const blockExpandedTiCausatives = isIntransitive
        && hasEndingFamily("t+i")
        && !isSlashMatrixTiInput;
    const allowTiUwaChtia = blockExpandedTiCausatives && ruleBase === "mati";
    const allowIntransitiveTiChtia = Boolean(
        isIntransitive
        && ruleBase === "mati"
        && (
            !options?.parsedVerb?.hasSlashMarker
            || isSlashMatrixTiInput
        )
    );
    if (allowTiClassOverride) {
        causativeTrace = {
            ...causativeTrace,
            tiCausativeClass,
            descriptor: causativeDescriptor,
        };
    } else {
        causativeTrace = {
            ...causativeTrace,
            descriptor: causativeDescriptor,
        };
    }
    const extractExampleBases = (examples) => (
        Array.isArray(examples)
            ? examples.map((entry) => String(entry || "").split("->")[0].trim()).filter(Boolean)
            : []
    );
    const resolveIntransitiveTypeOnePolicy = (baseStem = "") => {
        const normalized = normalizeDerivationStemValue(baseStem);
        if (!isIntransitive || !normalized) {
            return null;
        }
        const descriptor = buildCausativeDescriptor(normalized, { isIntransitive: true });
        if (causativeDescriptorMatches(descriptor, { endingFamily: "w+a" })) {
            return {
                sourceClass: "final_wa",
                stockFamily: "wa",
                typeOneTargets: ["wa"],
                typeOneTarget: "wa",
                typeTwoTarget: null,
                chain: "final wa -> wa",
            };
        }
        if (causativeDescriptorMatches(descriptor, { endingFamily: "w+i" })) {
            if (causativeDescriptorMatches(descriptor, {
                endingFamily: "w+i",
                rightEdgeProfiles: ["V|C|CV"],
            })) {
                return null;
            }
            if (causativeDescriptorMatches(descriptor, {
                endingFamily: "w+i",
                previousSyllableNucleus: "e",
            })) {
                return {
                    sourceClass: "final_ewi",
                    stockFamily: "ewi",
                    typeOneTargets: ["wa"],
                    typeOneTarget: "wa",
                    typeTwoTarget: "witia",
                    chain: "final ewi -> ewa",
                };
            }
            return {
                sourceClass: "final_wi",
                stockFamily: "wi",
                typeOneTargets: ["ua", "wa"],
                typeOneTarget: "ua",
                typeTwoTarget: "witia",
                chain: "final wi -> ua ~ wa",
            };
        }
        if (causativeDescriptorMatches(descriptor, {
            endingFamily: "n+i",
            rightEdgeProfiles: ["V|CV"],
        })) {
            return {
                sourceClass: "final_ani",
                stockFamily: "ni",
                typeOneTargets: ["na"],
                typeOneTarget: "na",
                typeTwoTarget: null,
                chain: "final ni -> na",
            };
        }
        return null;
    };
    const intransitiveTypeOnePolicy = resolveIntransitiveTypeOnePolicy(getWiWaPolicyRuleBaseInput());
    if (intransitiveTypeOnePolicy) {
        causativeTrace = {
            ...causativeTrace,
            intransitiveTypeOnePolicy: {
                sourceClass: intransitiveTypeOnePolicy.sourceClass,
                stockFamily: intransitiveTypeOnePolicy.stockFamily || "",
                chain: intransitiveTypeOnePolicy.chain,
                typeOneTargets: Array.isArray(intransitiveTypeOnePolicy.typeOneTargets)
                    ? [...intransitiveTypeOnePolicy.typeOneTargets]
                    : [],
                typeOneTarget: intransitiveTypeOnePolicy.typeOneTarget || null,
                typeTwoTarget: intransitiveTypeOnePolicy.typeTwoTarget || null,
            },
        };
    }
    const hasIntransitiveTypeOnePolicy = Boolean(intransitiveTypeOnePolicy);
    const isIntransitiveEndsWithI = causativePattern.has({
        modifiers: ["intransitive"],
        finalNucleus: "i",
    });
    const getSegmentFeatures = (segment = "") => {
        const key = String(segment || "");
        const map = {
            p: { place: "labial", manner: "stop", sonority: 1, placeIndex: 0 },
            m: { place: "labial", manner: "nasal", sonority: 3, placeIndex: 0 },
            w: { place: "labial", manner: "glide", sonority: 5, placeIndex: 0 },
            t: { place: "coronal", manner: "stop", sonority: 1, placeIndex: 1 },
            s: { place: "coronal", manner: "fricative", sonority: 2, placeIndex: 1 },
            n: { place: "coronal", manner: "nasal", sonority: 3, placeIndex: 1 },
            l: { place: "coronal", manner: "lateral", sonority: 4, placeIndex: 1 },
            tz: { place: "coronal", manner: "affricate", sonority: 1, placeIndex: 1 },
            sh: { place: "coronal", manner: "fricative", sonority: 2, placeIndex: 1 },
            ch: { place: "coronal", manner: "affricate", sonority: 1, placeIndex: 1 },
            y: { place: "palatal", manner: "glide", sonority: 5, placeIndex: 2 },
            j: { place: "palatal", manner: "glide", sonority: 5, placeIndex: 2 },
            k: { place: "dorsal", manner: "stop", sonority: 1, placeIndex: 3 },
            kw: { place: "dorsal", manner: "stop", sonority: 1, placeIndex: 3 },
        };
        return map[key] || {
            place: "other",
            manner: "other",
            sonority: 3,
            placeIndex: -1,
        };
    };
    const getIntransitiveIConsonantProfile = () => {
        const letters = splitVerbLetters(ruleBase);
        const firstOnset = firstOnsetDescriptor || letters.find((letter) => isVerbLetterConsonant(letter)) || "";
        const finalConsonant = finalOnset || (preFinalIsConsonant ? preFinalSegment : "");
        const firstFeatures = getSegmentFeatures(firstOnset);
        const finalFeatures = getSegmentFeatures(finalConsonant);
        return {
            firstOnset,
            finalConsonant,
            firstFeatures,
            finalFeatures,
            mannerPair: `${finalFeatures.manner}:${firstFeatures.manner}`,
            placePair: `${finalFeatures.place}:${firstFeatures.place}`,
        };
    };
    const classifyIntransitiveICausativeLexical = () => {
        // Intentionally list-free for intransitive ...i causative classification.
        if (isIntransitiveEndsWithI && hasEndingFamily("tz+i")) {
            if (causativePattern.has({
                endingFamily: "tz+i",
                juncture: "CV|CV",
            }) && previousSyllableOnset !== "w") {
                return null;
            }
            return {
                label: "none",
                source: "phonological-tzi-block",
            };
        }
        if (isIntransitiveEndsWithI) {
            const { firstFeatures, finalConsonant } = getIntransitiveIConsonantProfile();
            // Strong final-onset routing from matrix-pattern mining.
            if (["s", "sh", "l"].includes(finalConsonant)) {
                return {
                    label: "none",
                    source: "phonological-final-fricative-lateral-block",
                };
            }
            if (["y", "j"].includes(finalConsonant)) {
                return {
                    label: "replacive",
                    source: "phonological-final-glide-replacive",
                };
            }
            // Keep this lexical override on -n+i; -m+i is now descriptor-driven.
            if (finalConsonant === "n" && firstFeatures.manner === "fricative") {
                return {
                    label: "additive",
                    source: "phonological-nasal-fricative-additive",
                };
            }
        }
        return null;
    };
    const intransitiveIPairBias = (
        rules?.intransitiveEndsWithI?.pairBias
        && typeof rules.intransitiveEndsWithI.pairBias === "object"
    )
        ? rules.intransitiveEndsWithI.pairBias
        : {};
    const matchPairBiasCondition = (actual, expected) => {
        if (Array.isArray(expected)) {
            return expected.includes(actual);
        }
        if (expected && typeof expected === "object") {
            if (Array.isArray(expected.in) && !expected.in.includes(actual)) {
                return false;
            }
            if (Object.prototype.hasOwnProperty.call(expected, "eq") && actual !== expected.eq) {
                return false;
            }
            if (Object.prototype.hasOwnProperty.call(expected, "not")) {
                const notValue = expected.not;
                if (Array.isArray(notValue)) {
                    if (notValue.includes(actual)) {
                        return false;
                    }
                } else if (actual === notValue) {
                    return false;
                }
            }
            return true;
        }
        return actual === expected;
    };
    const matchPairBiasRule = (when, context) => {
        if (!when || typeof when !== "object") {
            return false;
        }
        return Object.entries(when).every(([key, expected]) => (
            matchPairBiasCondition(context[key], expected)
        ));
    };
    const classifyIntransitiveICausativeByPairBias = () => {
        if (!isIntransitiveEndsWithI || intransitiveIPairBias.enabled === false) {
            return null;
        }
        if (causativePattern.has({ endingFamily: "p+i", rightEdgeProfile: "Vl|CV" })) {
            return null;
        }
        if (causativePattern.has({ endingFamily: "m+i" })) {
            return null;
        }
        if (hasEndingFamily("t+i") && causativePattern.has({ tiCausativeClasses: ["become", "have"] })) {
            return null;
        }
        const {
            firstOnset,
            finalConsonant,
            firstFeatures,
            finalFeatures,
            mannerPair,
            placePair,
        } = getIntransitiveIConsonantProfile();
        if (!firstOnset || !finalConsonant) {
            return null;
        }
        const scoreRules = Array.isArray(intransitiveIPairBias.rules)
            ? intransitiveIPairBias.rules
            : [];
        if (!scoreRules.length) {
            return null;
        }
    const context = {
            endsWithWi: hasEndingFamily("w+i"),
            endsWithTi: hasEndingFamily("t+i"),
            endsWithConsonantCluster: causativePattern.has({ juncture: "C|CV" }),
            penultimateNucleus: previousSyllableNucleus || "",
            penultimateHasCoda: previousHasCoda === true,
            previousSyllableForm,
            rightEdgeProfile: causativeDescriptor.rightEdgeProfile,
            juncture: causativeDescriptor.juncture,
            endingFamily: causativeDescriptor.endingFamily,
            firstOnset,
            finalConsonant,
            firstManner: firstFeatures.manner,
            finalManner: finalFeatures.manner,
            firstPlace: firstFeatures.place,
            finalPlace: finalFeatures.place,
            mannerPair,
            placePair,
        };
        const scores = {
            additive: 0,
            replacive: 0,
            none: 0,
        };
        scoreRules.forEach((rule) => {
            if (!rule || typeof rule !== "object") {
                return;
            }
            const target = String(rule.to || "");
            if (!Object.prototype.hasOwnProperty.call(scores, target)) {
                return;
            }
            const weight = Number(rule.weight);
            if (!Number.isFinite(weight) || weight === 0) {
                return;
            }
            if (!matchPairBiasRule(rule.when, context)) {
                return;
            }
            scores[target] += weight;
        });
        const ranked = [
            { label: "additive", score: scores.additive },
            { label: "replacive", score: scores.replacive },
            { label: "none", score: scores.none },
        ].sort((a, b) => b.score - a.score);
        const top = ranked[0] || { label: "replacive", score: 0 };
        const second = ranked[1] || { label: "none", score: 0 };
        const margin = top.score - second.score;
        const minTopScore = Number.isFinite(intransitiveIPairBias.minTopScore)
            ? Number(intransitiveIPairBias.minTopScore)
            : 2.5;
        const minMargin = Number.isFinite(intransitiveIPairBias.minMargin)
            ? Number(intransitiveIPairBias.minMargin)
            : 0.7;
        if (top.score < minTopScore || margin < minMargin) {
            return null;
        }
        return {
            label: top.label,
            source: "pair-bias-config",
            pair: {
                manner: mannerPair,
                place: placePair,
            },
            scores,
            confidence: {
                topScore: top.score,
                margin,
                minTopScore,
                minMargin,
            },
        };
    };
    const classifyIntransitiveICausativeByMatrix = () => {
        if (!isIntransitiveEndsWithI) {
            return null;
        }
        const { firstOnset, finalConsonant, firstFeatures } = getIntransitiveIConsonantProfile();
        const penultimateNucleus = previousSyllableNucleus || "";
        const penultimateHasCoda = previousHasCoda === true;

        // Shape-first routing for -wi allomorphy.
        if (hasEndingFamily("w+i")) {
            if (causativePattern.has({ juncture: "C|CV" }) && firstFeatures.manner === "glide") {
                return { label: "none", source: "matrix-wi-glide-cluster" };
            }
            if (penultimateNucleus === "e" && firstOnset === "s") {
                return { label: "additive", source: "matrix-wi-sewi" };
            }
            return { label: "replacive", source: "matrix-wi-default" };
        }

        // Dedicated -ti split: additive only in the strong additive environments.
        if (hasEndingFamily("t+i")) {
            if (causativePattern.has({ tiCausativeClass: "have" })) {
                return { label: "additive", source: "descriptor-ti-have" };
            }
            if (causativePattern.has({ tiCausativeClass: "become" })) {
                return { label: "none", source: "descriptor-ti-become" };
            }
            if (penultimateHasCoda || penultimateNucleus === "e") {
                return { label: "additive", source: "matrix-ti-additive-env" };
            }
            if (firstOnset === "p") {
                return { label: "replacive", source: "matrix-ti-p-onset" };
            }
            return { label: "none", source: "matrix-ti-nonadditive" };
        }
        if (hasEndingFamily("k+i")) {
            if (previousSyllableForm === "V") {
                return { label: "additive", source: "descriptor-ki-v-cv" };
            }
            if (causativePattern.has({
                endingFamily: "k+i",
                rightEdgeProfile: "CV|CV",
                previousSyllableOnset: "w",
                previousSyllableNucleus: "a",
            })) {
                return { label: "replacive", source: "descriptor-ki-cv-cv-w-onset" };
            }
            if (previousSyllableForm === "CV") {
                return { label: "none", source: "descriptor-ki-cv-cv-type-two" };
            }
        }
        if (causativePattern.has({ endingFamily: "p+i", rightEdgeProfile: "Vl|CV" })) {
            return { label: "additive", source: "descriptor-pi-vl-cv" };
        }

        // Final onset / coda class routing for other ...Ci stems.
        if (finalConsonant === "n") {
            if (["p", "sh"].includes(firstOnset)) {
                return { label: "additive", source: "matrix-n-to-additive" };
            }
            if (firstOnset === "m") {
                return { label: "replacive", source: "matrix-n-to-replacive" };
            }
            return { label: "none", source: "matrix-n-to-none" };
        }
        if (hasEndingFamily("m+i")) {
            if (causativePattern.has({ endingFamily: "m+i", juncture: "CV|CV" })) {
                if (penultimateNucleus === "a") {
                    return { label: "additive", source: "descriptor-mi-cv-cv-a" };
                }
                if (penultimateNucleus === "e" && previousSyllableOnset === "n") {
                    return { label: "none", source: "descriptor-mi-cv-cv-e-n-exempt" };
                }
                if (["u", "i", "e"].includes(penultimateNucleus)) {
                    return { label: "replacive", source: "descriptor-mi-cv-cv-uie" };
                }
            }
            return { label: "replacive", source: "descriptor-mi-default" };
        }
        if (causativePattern.has({
            endingFamily: "tz+i",
            juncture: "CV|CV",
        }) && previousSyllableOnset !== "w") {
            return { label: "replacive", source: "descriptor-tzi-cv-cv-replacive" };
        }
        if (["s", "l"].includes(finalConsonant)) {
            return { label: "none", source: "matrix-fricative-lateral" };
        }
        if (finalConsonant === "k") {
            if (!penultimateHasCoda && firstOnset !== "n") {
                return { label: "additive", source: "matrix-k-open-penult" };
            }
            return { label: "none", source: "matrix-k-blocked" };
        }
        if (["p", "w", "kw", "tz", "ch"].includes(finalConsonant)) {
            return { label: "replacive", source: "matrix-replacive-final-class" };
        }
        if (penultimateHasCoda && ["t", "tz", "ch", "k", "p"].includes(finalConsonant)) {
            return { label: "additive", source: "matrix-coda-stop-affricate" };
        }
        return null;
    };
    const classifyIntransitiveICausativeByScoreFallback = () => {
        if (!isIntransitiveEndsWithI) {
            return { label: "unknown", source: "not-i" };
        }
        const I = (condition) => (condition ? 1 : 0);
        const { firstOnset, finalConsonant, firstFeatures, finalFeatures } = getIntransitiveIConsonantProfile();
        const placeDistance = (
            finalFeatures.placeIndex >= 0
            && firstFeatures.placeIndex >= 0
        )
            ? Math.abs(finalFeatures.placeIndex - firstFeatures.placeIndex)
            : 0;
        const sonoritySlope = finalFeatures.sonority - firstFeatures.sonority;
        const tiAdditiveEnvironment = hasEndingFamily("t+i")
            && (previousHasCoda || previousSyllableNucleus === "e");
        const tiNonAdditiveEnvironment = hasEndingFamily("t+i") && !tiAdditiveEnvironment;
        const additiveScore = (
            8.0 * I(hasEndingFamily("w+i") && previousSyllableNucleus === "e" && firstOnset === "s")
            + 2.2 * I(finalFeatures.place === "dorsal" && !previousHasCoda && firstOnset !== "n")
            + 2.6 * I(tiAdditiveEnvironment)
            + 2.1 * I(finalConsonant === "n" && ["p", "sh"].includes(firstOnset))
            + 1.2 * I(finalConsonant === "m" && firstOnset === "t" && previousSyllableNucleus === "a")
            + 2.0 * I(previousHasCoda && ["stop", "affricate"].includes(finalFeatures.manner))
            + 0.7 * I(sonoritySlope <= -1)
            + 0.4 * I(placeDistance >= 2)
        );
        const replaciveScore = (
            5.0 * I(hasEndingFamily("w+i"))
            + 2.2 * I(tiNonAdditiveEnvironment && firstOnset === "p")
            + 1.9 * I(finalConsonant === "n" && firstOnset === "m")
            + 1.8 * I(finalConsonant === "m" && firstOnset !== "n" && !(firstOnset === "t" && previousSyllableNucleus === "a"))
            + 1.0 * I(["p", "w", "kw", "tz", "ch"].includes(finalConsonant))
            + 0.6 * I(sonoritySlope >= 0)
            + 0.2
        );
        const noneScore = (
            3.5 * I(["fricative", "lateral"].includes(finalFeatures.manner))
            + 2.2 * I(finalFeatures.place === "dorsal" && (previousHasCoda || firstOnset === "n"))
            + 2.4 * I(tiNonAdditiveEnvironment && firstOnset !== "p")
            + 1.9 * I(finalConsonant === "n" && !["p", "sh", "m"].includes(firstOnset))
            + 3.0 * I(finalConsonant === "m" && firstOnset === "n")
            + 2.0 * I(finalConsonant === "l" && ["y", "k"].includes(firstOnset))
            + 0.5 * I(placeDistance === 0 && finalConsonant === "l")
        );
        const ranked = [
            { label: "additive", score: additiveScore },
            { label: "replacive", score: replaciveScore },
            { label: "none", score: noneScore },
        ].sort((a, b) => b.score - a.score);
        return {
            label: ranked[0]?.label || "replacive",
            source: "sonority-place-formula-fallback",
            scores: {
                additive: additiveScore,
                replacive: replaciveScore,
                none: noneScore,
            },
        };
    };
    const intransitiveITrace = isIntransitiveEndsWithI
        ? {
            layers: [],
            winner: null,
        }
        : null;
    const allowShapeTiToTaCausative = Boolean(
        isIntransitiveEndsWithI
        && hasEndingFamily("t+i")
        && !forceTiHaveTypeTwo
        && (
            forceTiBecomeTypeTwo
            ||
            ruleBase === "ti"
            || isSlashMatrixTiInput
        )
    );
    const collectIntransitiveILayer = (layer, decision) => {
        if (!intransitiveITrace) {
            return;
        }
        intransitiveITrace.layers.push({
            layer,
            decision: decision ? { ...decision } : null,
        });
    };
    const lexicalDecision = classifyIntransitiveICausativeLexical();
    collectIntransitiveILayer("lexical", lexicalDecision);
    const pairDecision = lexicalDecision ? null : classifyIntransitiveICausativeByPairBias();
    collectIntransitiveILayer("pair-bias", pairDecision);
    const matrixDecision = (lexicalDecision || pairDecision) ? null : classifyIntransitiveICausativeByMatrix();
    collectIntransitiveILayer("matrix", matrixDecision);
    const fallbackDecision = (lexicalDecision || pairDecision || matrixDecision)
        ? null
        : classifyIntransitiveICausativeByScoreFallback();
    collectIntransitiveILayer("fallback", fallbackDecision);
    const intransitiveICausativeClass = lexicalDecision
        || pairDecision
        || matrixDecision
        || fallbackDecision;
    if (intransitiveITrace) {
        intransitiveITrace.winner = intransitiveICausativeClass ? { ...intransitiveICausativeClass } : null;
        causativeTrace = {
            ...causativeTrace,
            intransitiveI: intransitiveITrace,
        };
    }
    const blockTypeOneCausativeForI = intransitiveICausativeClass.label === "none";
    const allowIntransitiveTypeOnePolicy = isIntransitive
        && hasIntransitiveTypeOnePolicy
        && intransitiveTypeOnePolicy.typeOneTarget;
    const isDirectIntransitiveSource = isIntransitive
        && !hasLeadingDash;
    const isDirectIntransitiveTypeOnePolicySource = isDirectIntransitiveSource
        && (
            hasEndingFamily("w+i")
            || hasEndingFamily("w+a")
            || hasEndingFamily("n+i")
        );
    if (allowShapeTiToTaCausative) {
        pushWithRoute(buildReplaceSuffixMorphStemSpec(ruleBase, "ti", "ta"), "", "", {
            type: "type-one",
            rule: "replace-final-ti-phonological",
        });
    }
    if (allowIntransitiveTypeOnePolicy && (!blockTypeOneCausativeForI || isDirectIntransitiveTypeOnePolicySource)) {
        const pushIntransitiveTypeOnePolicyTarget = (typeOneTarget) => {
            const sourceSuffix = hasEndingFamily("w+i")
                ? "wi"
                : (hasEndingFamily("w+a")
                    ? "wa"
                    : (hasEndingFamily("n+i") ? "ni" : ""));
            const sourceBase = sourceSuffix ? ruleBase.slice(0, -sourceSuffix.length) : "";
            const policyStemSpec = buildIntransitiveTypeOneMorphStemSpec(ruleBase, typeOneTarget, {
                sourceBase,
                sourceSuffix,
            });
            if (!realizeMorphStemSpec(policyStemSpec)) {
                return;
            }
            pushWithRoute(policyStemSpec, "", "", {
                type: "type-one",
                rule: `type-one-policy-${intransitiveTypeOnePolicy.sourceClass}`,
                typeOnePolicy: intransitiveTypeOnePolicy.chain,
            });
        };
        const typeOneTargets = Array.isArray(intransitiveTypeOnePolicy.typeOneTargets)
            && intransitiveTypeOnePolicy.typeOneTargets.length
            ? intransitiveTypeOnePolicy.typeOneTargets
            : [intransitiveTypeOnePolicy.typeOneTarget].filter(Boolean);
        typeOneTargets.forEach((typeOneTarget) => {
            pushIntransitiveTypeOnePolicyTarget(typeOneTarget);
        });
    }

    if (
        isIntransitiveEndsWithI
        && !allowIntransitiveTypeOnePolicy
        && !blockTypeOneCausativeForI
        && !forceTiHaveTypeTwo
        && !forceTiBecomeTypeTwo
    ) {
        const dropped = ruleBase.slice(0, -1);
        const { firstOnset } = getIntransitiveIConsonantProfile();
        const useKiWTzaReplacement = causativePattern.has({
            endingFamily: "k+i",
            rightEdgeProfile: "CV|CV",
            previousSyllableOnset: "w",
            previousSyllableNucleus: "a",
        });
        if (dropped.endsWith("k") && firstOnset === "w" && useKiWTzaReplacement) {
            pushWithRoute(buildReplaceSuffixMorphStemSpec(ruleBase, "ki", "tza"), "", "", {
                type: "type-one",
                rule: "descriptor-ki-cv-cv-w-onset-tza",
            });
        }
        if (intransitiveICausativeClass.label === "additive") {
            pushWithRoute(buildReplaceSuffixMorphStemSpec(ruleBase, "i", "ia"), "", "", {
                type: "type-one",
                rule: "addition-phonological-i",
            });
        } else if (!useKiWTzaReplacement) {
            pushWithRoute(buildReplaceSuffixMorphStemSpec(ruleBase, "i", "a"), "", "", {
                type: "type-one",
                rule: "replace-final-i-phonological",
            });
        }
    }
    const intransitiveEndsWithA = rules?.intransitiveEndsWithA || {};
    const replacementOnlyA = Array.isArray(intransitiveEndsWithA.replacementOnly)
        ? intransitiveEndsWithA.replacementOnly
        : [];
    const allowReplaceFinalA = replacementOnlyA.length === 0
        || matchesDerivationRuleBaseList(replacementOnlyA, ruleBase, fullRuleBase);
    if (isIntransitive && finalNucleus === "a" && !(hasIntransitiveTypeOnePolicy && hasEndingFamily("w+a"))) {
        if (isRootPlusYa && rootPlusYaBase) {
            const rootPlusYaRules = rules?.intransitiveEndsWithA?.rootPlusYa || {};
            const allowVerbs = Array.isArray(rootPlusYaRules.allowVerbs)
                ? rootPlusYaRules.allowVerbs
                : [];
            const allowSuffixes = Array.isArray(rootPlusYaRules.allowSuffixes)
                ? rootPlusYaRules.allowSuffixes
                : [];
            const matchesRootPlusYa = matchesDerivationRuleBaseList(
                allowVerbs,
                ruleBase,
                fullRuleBase
            )
                || allowSuffixes.some((suffix) => suffix && ruleBase.endsWith(suffix))
                || (fullRuleBase && allowSuffixes.some((suffix) => suffix && fullRuleBase.endsWith(suffix)));
            if (matchesRootPlusYa || (allowVerbs.length === 0 && allowSuffixes.length === 0)) {
                pushWithRoute(buildReplaceSuffixMorphStemSpec(`${rootPlusYaBase}ya`, "ya", "a"), "", "", {
                    type: "type-one",
                    rule: "root-plus-ya",
                });
            }
        } else if (allowReplaceFinalA) {
            pushWithRoute(buildReplaceSuffixMorphStemSpec(ruleBase, "a", "a"), "", "", {
                type: "type-one",
                rule: "replace-final-a",
            });
        }
    }

    if (isIntransitive && !isIntransitiveEndsWithI) {
        const destockal = rules.destockal || {};
        const addWithOrder = (order, actions, routeBase = "", routeSuffix = "") => {
            (order || []).forEach((action) => {
                const builder = actions[action];
                if (typeof builder === "function") {
                    const stem = builder();
                    if (stem) {
                        pushWithRoute(stem, routeBase, routeSuffix, {
                            type: "type-one",
                            rule: `destockal-${action}`,
                        });
                    }
                }
            });
        };
    }

    const typeTwo = rules.typeTwo || {};
    const allowedSuffixes = Array.isArray(typeTwo.nonactiveBaseSuffixes)
        ? typeTwo.nonactiveBaseSuffixes
        : [];
    const uwaOnlyList = Array.isArray(typeTwo.uwaOnly) ? typeTwo.uwaOnly : [];
    const uwaBlockList = Array.isArray(typeTwo.uwaBlock) ? typeTwo.uwaBlock : [];
    const matchesTypeTwoList = (list) => matchesDerivationRuleBaseList(
        list,
        ruleBase,
        fullRuleBase
    );
    const blockTypeTwoForDescriptor = causativePattern.has({
        modifiers: ["intransitive"],
        endingFamily: "k+i",
        previousSyllableForm: "V",
    });
    const forceUwaOnly = matchesTypeTwoList(uwaOnlyList);
    const blockUwaTypeTwo = matchesTypeTwoList(uwaBlockList);
    if (allowTypeTwo && !blockTypeTwoForDescriptor) {
        const deleteSuffixes = new Set(Array.isArray(typeTwo.deleteSuffixes) ? typeTwo.deleteSuffixes : []);
        const shortStemDeleteSuffixes = new Set(
            Array.from(deleteSuffixes).filter((suffix) => suffix !== "wa")
        );
        const typeTwoSuffix = typeof typeTwo.suffix === "string" ? typeTwo.suffix : "tia";
        const annotateTypeTwoOption = (option) => annotateCausativeNonactiveOption(option, {
            isTransitive,
            isIntransitive,
        });
        const optionHasFamily = (option, nonactiveFamily) => Boolean(
            option?.sourcePattern?.has({ nonactiveFamily })
        );
        const hasOptionFamily = (optionsList, nonactiveFamily) => (
            (Array.isArray(optionsList) ? optionsList : []).some((option) => optionHasFamily(option, nonactiveFamily))
        );
        const findOptionByFamily = (optionsList, nonactiveFamily) => (
            (Array.isArray(optionsList) ? optionsList : []).find((option) => optionHasFamily(option, nonactiveFamily)) || null
        );
        if (forceTiHaveTypeTwo && hasEndingFamily("t+i")) {
            pushWithRoute(buildReplaceSuffixMorphStemSpec(ruleBase, "ti", "tia"), "", "", {
                type: "type-two",
                rule: "ti-class-have-direct",
                preferred: true,
            });
        }
        if (intransitiveTypeOnePolicy?.typeTwoTarget === "witia" && hasEndingFamily("w+i")) {
            pushWithRoute(buildReplaceSuffixMorphStemSpec(ruleBase, "wi", "witia"), "", "", {
                type: "type-two",
                rule: "wi-direct-tia",
            });
        }
        const nonactiveOptions = getNonactiveDerivationOptions(ruleBase, ruleBase, {
            isTransitive,
            isYawi: options.isYawi === true,
            ruleBase,
            rootPlusYaBase,
        }).map(annotateTypeTwoOption);
        const hasNonactiveFamily = (nonactiveFamily) => hasOptionFamily(nonactiveOptions, nonactiveFamily);
        const typeTwoOptions = [...nonactiveOptions];
        const nonRedupRuleBase = getNonReduplicatedRoot(ruleBase);
        if (nonRedupRuleBase && nonRedupRuleBase !== ruleBase) {
            const nonRedupOptions = getNonactiveDerivationOptions(nonRedupRuleBase, nonRedupRuleBase, {
                isTransitive,
                isYawi: options.isYawi === true,
                ruleBase: nonRedupRuleBase,
                rootPlusYaBase,
            }).map(annotateTypeTwoOption);
            const hasTypeTwoFamily = (nonactiveFamily) => hasOptionFamily(typeTwoOptions, nonactiveFamily);
            const hasNonRedupFamily = (nonactiveFamily) => hasOptionFamily(nonRedupOptions, nonactiveFamily);
            const blockChForTi = previousHasCoda || (hasEndingFamily("t+i") && preFinalIsConsonant);
            const blockOnsetReplacement = isShortReplaciveOnsetBase(ruleBase);
            const addSynthesized = (nonactiveFamily, stemBuilder) => {
                if (!hasNonRedupFamily(nonactiveFamily) || hasTypeTwoFamily(nonactiveFamily)) {
                    return;
                }
                const stemSpec = stemBuilder();
                if (realizeMorphStemSpec(stemSpec)) {
                    typeTwoOptions.push(annotateTypeTwoOption({ suffix: nonactiveFamily, stemSpec }));
                }
            };
            addSynthesized("wa", () => buildAppendMorphStemSpec(ruleBase, "wa", {
                sourceBase: ruleBase,
                sourceSuffix: "wa",
            }));
            addSynthesized("u", () => buildNonactiveUStemMorphStemSpec(ruleBase, finalOnset, finalNucleus, {
                sourceBase: ruleBase,
                sourceSuffix: "u",
                blockCh: blockChForTi,
                blockOnsetReplacement,
            }));
            addSynthesized("uwa", () => buildNonactiveUwaStemMorphStemSpec(ruleBase, finalOnset, finalNucleus, {
                sourceBase: ruleBase,
                sourceSuffix: "uwa",
                blockCh: blockChForTi,
                blockOnsetReplacement,
            }));
            addSynthesized("lu", () => buildAppendMorphStemSpec(ruleBase, "lu", {
                sourceBase: ruleBase,
                sourceSuffix: "lu",
            }));
        }
        const hasTransitiveCodaS = isTransitive && hasEndingFamily("s+i");
        if (hasTransitiveCodaS && !hasOptionFamily(typeTwoOptions, "uwa")) {
            const uwaStem = buildNonactiveUwaStem(ruleBase, finalOnset, finalNucleus, {
                blockCh: previousHasCoda || (hasEndingFamily("t+i") && preFinalIsConsonant),
                blockOnsetReplacement: isShortReplaciveOnsetBase(ruleBase),
            });
            if (uwaStem) {
                typeTwoOptions.push(annotateTypeTwoOption({
                    suffix: "uwa",
                    stemSpec: buildNonactiveUwaStemMorphStemSpec(ruleBase, finalOnset, finalNucleus, {
                        sourceBase: ruleBase,
                        sourceSuffix: "uwa",
                        blockCh: previousHasCoda || (hasEndingFamily("t+i") && preFinalIsConsonant),
                        blockOnsetReplacement: isShortReplaciveOnsetBase(ruleBase),
                    }),
                }));
            }
        }
        if (isTransitive && hasEndingFamily("w+i") && allowedSuffixes.includes("u")
            && !hasOptionFamily(typeTwoOptions, "u")) {
            const uStem = buildNonactiveUStem(ruleBase, finalOnset, finalNucleus, {
                blockCh: previousHasCoda || (hasEndingFamily("t+i") && preFinalIsConsonant),
                blockOnsetReplacement: isShortReplaciveOnsetBase(ruleBase),
            });
            if (uStem) {
                typeTwoOptions.push(annotateTypeTwoOption({
                    suffix: "u",
                    stemSpec: buildNonactiveUStemMorphStemSpec(ruleBase, finalOnset, finalNucleus, {
                        sourceBase: ruleBase,
                        sourceSuffix: "u",
                        blockCh: previousHasCoda || (hasEndingFamily("t+i") && preFinalIsConsonant),
                        blockOnsetReplacement: isShortReplaciveOnsetBase(ruleBase),
                    }),
                }));
            }
        }
        const allowTransitiveChiwaUBase = isTransitive
            && matchesDerivationRuleBaseList(["chiwa"], ruleBase, fullRuleBase);
        if (allowTransitiveChiwaUBase && allowedSuffixes.includes("u")
            && !hasOptionFamily(typeTwoOptions, "u")) {
            const uStem = buildNonactiveUStem(ruleBase, finalOnset, finalNucleus, {
                blockCh: previousHasCoda || (hasEndingFamily("t+i") && preFinalIsConsonant),
                blockOnsetReplacement: isShortReplaciveOnsetBase(ruleBase),
            });
            if (uStem) {
                typeTwoOptions.push(annotateTypeTwoOption({
                    suffix: "u",
                    stemSpec: buildNonactiveUStemMorphStemSpec(ruleBase, finalOnset, finalNucleus, {
                        sourceBase: ruleBase,
                        sourceSuffix: "u",
                        blockCh: previousHasCoda || (hasEndingFamily("t+i") && preFinalIsConsonant),
                        blockOnsetReplacement: isShortReplaciveOnsetBase(ruleBase),
                    }),
                }));
            }
        }
        const endsWithCluster = (stem) => {
            if (!stem) {
                return false;
            }
            const letters = splitVerbLetters(stem);
            if (letters.length < 2) {
                return false;
            }
            const last = letters[letters.length - 1];
            const prev = letters[letters.length - 2];
            return isVerbLetterConsonant(last) && isVerbLetterConsonant(prev);
        };
        const getClusterBaseStem = (stem) => {
            if (!stem) {
                return "";
            }
            const nonRedup = getNonReduplicatedRoot(stem);
            return nonRedup && nonRedup !== stem ? nonRedup : stem;
        };
        const uwaClusterBase = (() => {
            const uwaOption = findOptionByFamily(typeTwoOptions, "uwa");
            if (!uwaOption || !uwaOption.stem) {
                return "";
            }
            if (!uwaOption.stem.endsWith("uwa")) {
                return "";
            }
            let baseStem = uwaOption.stem.slice(0, -3);
            if (hasEndingFamily("n+i") && baseStem.endsWith("u")) {
                baseStem = baseStem.slice(0, -1);
            }
            const clusterStem = getClusterBaseStem(baseStem);
            return endsWithCluster(clusterStem) ? clusterStem : "";
        })();
        if (forceUwaOnly && !hasOptionFamily(typeTwoOptions, "uwa")) {
            const uwaStem = buildNonactiveUwaStem(ruleBase, finalOnset, finalNucleus, {
                blockCh: previousHasCoda,
            });
            if (uwaStem) {
                typeTwoOptions.push(annotateTypeTwoOption({
                    suffix: "uwa",
                    stemSpec: buildNonactiveUwaStemMorphStemSpec(ruleBase, finalOnset, finalNucleus, {
                        sourceBase: ruleBase,
                        sourceSuffix: "uwa",
                        blockCh: previousHasCoda,
                    }),
                }));
            }
        }
        const sourceSyllableCount = causativeDescriptor.nonRedupSyllableCount || causativeDescriptor.syllableCount || 0;
        const isIntransitiveMonosyllable = isIntransitive && sourceSyllableCount <= 1;
        const allowIntransitiveMonosyllableUwaTypeTwo = isIntransitiveMonosyllable
            && hasOptionFamily(typeTwoOptions, "uwa");
        const shouldUseSupportiveITypeTwo = (optionSuffix, baseStem, currentSuffix) => {
            if (currentSuffix !== typeTwoSuffix) {
                return false;
            }
            if (allowIntransitiveMonosyllableUwaTypeTwo && optionSuffix === "uwa") {
                return true;
            }
            if (!["u", "uwa"].includes(optionSuffix)) {
                return false;
            }
            const clusterStem = getClusterBaseStem(baseStem);
            return endsWithCluster(clusterStem);
        };
        const preferIntransitiveBisyllableUwa = (
            isIntransitive
            && sourceSyllableCount === 2
            && !blockUwaTypeTwo
            && allowedSuffixes.includes("uwa")
            && hasOptionFamily(typeTwoOptions, "uwa")
        );
        const preferTransitiveCodaSUwaBase = hasTransitiveCodaS
            && hasOptionFamily(typeTwoOptions, "uwa");
        const preferTransitiveWiUBase = isTransitive
            && hasEndingFamily("w+i")
            && hasOptionFamily(typeTwoOptions, "u");

        if (isIntransitive && finalNucleus === "u" && hasNonactiveFamily("wa")) {
            const uRules = rules.intransitiveEndsWithU?.nonactiveWa?.typeTwo || {};
            const additionBases = Array.isArray(uRules?.addition?.verbs)
                ? uRules.addition.verbs
                : extractExampleBases(uRules?.addition?.examples);
            const replacementBases = Array.isArray(uRules?.replacement?.verbs)
                ? uRules.replacement.verbs
                : extractExampleBases(uRules?.replacement?.examples);
            const matchBase = (baseList) => matchesDerivationRuleBaseList(baseList, ruleBase, fullRuleBase);
            const useAddition = additionBases.length ? matchBase(additionBases) : true;
            const useReplacement = replacementBases.length ? matchBase(replacementBases) : true;
            if (useAddition) {
                pushWithRoute(buildAppendMorphStemSpec(ruleBase, "wia", {
                    sourceBase: ruleBase,
                    sourceSuffix: "wa",
                }), "", "", {
                    type: "type-two",
                    rule: "u-wa-wia",
                });
            }
            if (useReplacement) {
                pushWithRoute(buildReplaceSuffixMorphStemSpec(ruleBase, "u", "awia"), "", "", {
                    type: "type-two",
                    rule: "u-wa-wia-replace",
                });
            }
        }

        typeTwoOptions.forEach((option) => {
            const optionFamily = option?.sourceDescriptor?.nonactiveFamily || "";
            const optionStem = realizeMorphStemSpec(option?.stemSpec, option?.stem || "");
            if (!allowedSuffixes.includes(optionFamily)) {
                return;
            }
            if (forceTiHaveTypeTwo) {
                return;
            }
            if (forceTiBecomeTypeTwo && !optionHasFamily(option, "lu")) {
                return;
            }
            if (
                isIntransitiveMonosyllable
                && shortStemDeleteSuffixes.has(optionFamily)
                && !(allowIntransitiveMonosyllableUwaTypeTwo && optionHasFamily(option, "uwa"))
            ) {
                // For short stems, only paths that remove base material (u/uwa) are blocked.
                return;
            }
            if (isRootPlusYa && optionHasFamily(option, "lu") && optionStem === `${ruleBase}lu`) {
                return;
            }
            if (optionHasFamily(option, "wa") && uwaClusterBase) {
                return;
            }
            if (isIntransitive && hasEndingFamily("w+i")) {
                const wiSyllableCount = causativeDescriptor.nonRedupSyllableCount || causativeDescriptor.syllableCount;
                const wiCluster = causativePattern.has({ juncture: "C|CV" });
                if (wiCluster && optionHasFamily(option, "uwa")) {
                    return;
                }
                if (!wiCluster && wiSyllableCount >= 3 && optionHasFamily(option, "uwa")) {
                    return;
                }
                if (!wiCluster && wiSyllableCount === 2 && optionHasFamily(option, "wa")) {
                    return;
                }
            }
            if (forceUwaOnly && optionHasFamily(option, "wa")) {
                return;
            }
            if (blockUwaTypeTwo && optionHasFamily(option, "uwa")) {
                return;
            }
            if (isIntransitive && optionHasFamily(option, "wa") && finalOnset === "k" && hasNonactiveFamily("uwa")) {
                // For intransitives with last onset k (and an available -uwa nonactive),
                // only accept the -uwa-based type-two causative (drop -uwa + tia), not the -wa-based one.
                return;
            }
            if (isIntransitive && optionHasFamily(option, "lu") && finalOnset === "s" && hasNonactiveFamily("uwa")) {
                // For intransitives with final onset s, prefer only the -uwa-based type-two causative.
                return;
            }
            if (preferTransitiveCodaSUwaBase && option.sourcePattern.hasAny([
                { nonactiveFamily: "lu" },
                { nonactiveFamily: "u" },
            ])) {
                // For transitive stems ending in -si (s-coda class), prefer only the -uwa-based type-two causative.
                return;
            }
            if (blockExpandedTiCausatives && optionHasFamily(option, "lu") && !forceTiBecomeTypeTwo) {
                return;
            }
            if (blockExpandedTiCausatives && optionHasFamily(option, "uwa") && !allowTiUwaChtia) {
                return;
            }
            if (isIntransitive && hasEndingFamily("t+i") && optionHasFamily(option, "wa") && !forceTiHaveTypeTwo) {
                // Intransitive stems ending in -ti do not form type-two causatives from the -wa nonactive base.
                return;
            }
            if (
                isIntransitive
                && hasEndingFamily("t+i")
                && isSlashMatrixTiInput
                && !allowIntransitiveTiChtia
                && optionHasFamily(option, "uwa")
            ) {
                // For slash-matrix X/ti, keep the direct X/ta route and suppress uwa-based
                // surface output unless it's the exempt mati/ma/ti class.
                return;
            }
            if (isIntransitive && finalNucleus === "u" && optionHasFamily(option, "wa")) {
                // For intransitive -u verbs, WIA can be formed either by addition (temu -> temuwia)
                // or by replacement (panu -> panawia). If the verb is listed as replacement,
                // suppress the default -wia output derived from the -wa nonactive base.
                const uRules = rules.intransitiveEndsWithU?.nonactiveWa?.typeTwo || {};
                const additionBases = Array.isArray(uRules?.addition?.verbs)
                    ? uRules.addition.verbs
                    : extractExampleBases(uRules?.addition?.examples);
                const replacementBases = Array.isArray(uRules?.replacement?.verbs)
                    ? uRules.replacement.verbs
                    : extractExampleBases(uRules?.replacement?.examples);
                if (replacementBases.length) {
                    const matchBase = (baseList) => matchesDerivationRuleBaseList(baseList, ruleBase, fullRuleBase);
                    const inAdditionList = additionBases.length ? matchBase(additionBases) : false;
                    const inReplacementList = matchBase(replacementBases);
                    if (inReplacementList && !inAdditionList) {
                        return;
                    }
                }
            }
            let baseStem = optionStem;
            if (optionHasFamily(option, "lu")) {
                baseStem = optionStem.endsWith("lu") ? optionStem.slice(0, -1) : optionStem;
            } else if (deleteSuffixes.has(optionFamily)) {
                if (optionHasFamily(option, "wa") && optionStem.endsWith("wa")) {
                    baseStem = optionStem.slice(0, -2);
                } else if (optionHasFamily(option, "u") && optionStem.endsWith("u")) {
                    baseStem = optionStem.slice(0, -1);
                } else if (optionHasFamily(option, "uwa") && optionStem.endsWith("uwa")) {
                    baseStem = optionStem.slice(0, -3);
                }
            }
            if (optionHasFamily(option, "uwa") && hasEndingFamily("n+i") && baseStem.endsWith("u")) {
                baseStem = baseStem.slice(0, -1);
            }
            let suffix = typeTwoSuffix;
            if (finalNucleus === "u" && optionHasFamily(option, "wa")) {
                suffix = "wia";
            }
            if (isIntransitive && optionHasFamily(option, "lu") && hasEndingFamily("t+i")) {
                suffix = "ia";
            }
            if (shouldUseSupportiveITypeTwo(optionFamily, baseStem, suffix)) {
                suffix = `i${suffix}`;
            }
            if (optionHasFamily(option, "uwa") && suffix.endsWith(typeTwoSuffix) && finalOnset === "w") {
                suffix = `w${suffix}`;
            }
        if (optionHasFamily(option, "lu") && isRootPlusYa && rootPlusYaBase) {
            pushWithRoute(buildReplaceSuffixMorphStemSpec(`${rootPlusYaBase}ya`, "ya", "lia"), "", "", {
                type: "type-two",
                rule: "root-plus-ya-lia",
                skipSourcePrefixIfPresent: true,
            });
        }
            if (optionHasFamily(option, "lu") && rootPlusYaBase && (rootPlusYaBase.endsWith("ti") || rootPlusYaBase.endsWith("wi"))) {
                pushWithRoute(buildReplaceSuffixMorphStemSpec(`${rootPlusYaBase}ya`, "ya", "lia"), "", "", {
                    type: "type-two",
                    rule: "root-plus-ya-tiwi-lia",
                    skipSourcePrefixIfPresent: true,
                });
            }
            if (baseStem) {
                const isIntransitiveTi = isIntransitive && hasEndingFamily("t+i");
                const isIntransitiveTiTitia = isIntransitiveTi
                    && suffix === `i${typeTwoSuffix}`;
                if (isIntransitiveTiTitia) {
                    return;
                }
                const isIntransitiveTiChtia = isIntransitiveTi
                    && suffix === typeTwoSuffix
                    && baseStem.endsWith("ch");
                if (isIntransitiveTiChtia && !allowIntransitiveTiChtia) {
                    return;
                }
                const preferUwaSh = optionHasFamily(option, "uwa")
                    && finalOnset === "s"
                    && optionStem.includes("sh");
                const preferUwaFromTransitiveCodaS = optionHasFamily(option, "uwa") && preferTransitiveCodaSUwaBase;
                const preferIntransitiveBisyllableUwaBase = preferIntransitiveBisyllableUwa
                    && optionHasFamily(option, "uwa");
                const preferIntransitiveMonosyllableUwa = allowIntransitiveMonosyllableUwaTypeTwo
                    && optionHasFamily(option, "uwa");
                const preferTransitiveWiU = optionHasFamily(option, "u") && preferTransitiveWiUBase;
                const preferVowelMonosyllableLu = isIntransitive
                    && causativeDescriptor.finalForm === "V"
                    && causativePattern.has({ modifiers: ["monosyllable"] })
                    && optionHasFamily(option, "lu");
                const skipSourcePrefixIfPresent = Boolean(
                    isRootPlusYa
                    && rootPlusYaBase
                    && baseStem.startsWith(rootPlusYaBase)
                );
                const sourceBase = optionStem.endsWith(optionFamily)
                    ? optionStem.slice(0, -optionFamily.length)
                    : "";
                pushWithRoute(buildAppendMorphStemSpec(baseStem, suffix, {
                    sourceBase,
                    sourceSuffix: optionFamily,
                }), "", "", {
                    type: "type-two",
                    rule: `nonactive-${optionFamily}`,
                    preferred: preferUwaSh
                        || preferUwaFromTransitiveCodaS
                        || preferIntransitiveBisyllableUwaBase
                        || preferIntransitiveMonosyllableUwa
                        || preferTransitiveWiU
                        || preferVowelMonosyllableLu,
                    skipSourcePrefixIfPresent,
                });
            }
        });
    }

    results.causativeTrace = causativeTrace;
    return results;
}

// Returns { allowTypeTwo, baseIsTransitive } for the given parsedVerb, using the same
// gate logic as applyCausativeDerivation. Used both in the actual engine and in the
// UI probe so that button availability always matches actual generation.
function computeAllowTypeTwoCausativeForParsedVerb(parsedVerb) {
    if (!parsedVerb) {
        return { allowTypeTwo: false, baseIsTransitive: false };
    }
    const canonicalRuleBase = parsedVerb.canonicalRuleBase || parsedVerb?.canonical?.ruleBase || "";
    const causativeRuleSource = buildNonactiveRuleSourceContext(
        parsedVerb.verb || parsedVerb.analysisVerb || "",
        parsedVerb.analysisVerb || "",
        { verbMeta: parsedVerb, parsedVerb }
    );
    const ruleBaseForGate = canonicalRuleBase || causativeRuleSource?.ruleBase || "";
    // Compute baseIsTransitive
    const explicitSlots = Number.isFinite(parsedVerb.totalValenceSlotCount)
        ? Math.max(0, Math.min(MAX_OBJECT_SLOTS, parsedVerb.totalValenceSlotCount))
        : 0;
    const baseSlots = explicitSlots > 0
        ? explicitSlots
        : Math.max(0, getBaseObjectSlots(parsedVerb) - (parsedVerb.derivationValencyDelta || 0));
    let baseIsTransitive = baseSlots > 0;
    const wiWaDirectSourceBase = normalizeRuleBase(canonicalRuleBase || "");
    const wiWaDirectSourceDescriptor = wiWaDirectSourceBase
        ? buildCausativeDescriptor(wiWaDirectSourceBase, {})
        : null;
    const hasWiWaDirectSourceEnding = Boolean(
        wiWaDirectSourceDescriptor
        && wiWaDirectSourceDescriptor.finalOnset === "w"
        && ["a", "i"].includes(wiWaDirectSourceDescriptor.finalNucleus)
    );
    const hasOnlyNonspecificSourceValence = Boolean(
        parsedVerb.hasNonspecificValence === true
        && parsedVerb.hasSpecificValence !== true
        && Number(parsedVerb.totalValenceSlotCount || 0) > 0
    );
    if (
        baseIsTransitive
        && hasOnlyNonspecificSourceValence
        && parsedVerb.hasLeadingDash !== true
        && hasWiWaDirectSourceEnding
    ) {
        baseIsTransitive = false;
    }
    if (baseIsTransitive) {
        return { allowTypeTwo: true, baseIsTransitive: true };
    }
    // Compute intransitive gate conditions
    let allowTypeTwoIntransitiveA = false;
    let allowTypeTwoIntransitiveNiUwa = false;
    let allowTypeTwoIntransitiveU = false;
    let allowTypeTwoIntransitiveUwa = false;
    let allowTypeTwoIntransitiveLu = false;
    let allowTypeTwoIntransitiveKi = false;
    if (ruleBaseForGate) {
        const gateBase = getNonReduplicatedRoot(ruleBaseForGate) || ruleBaseForGate;
        const typeTwoGate = DERIVATIONAL_RULES?.causative?.typeTwo?.allowTypeTwoForIntransitives || {};
        const gateDescriptor = buildCausativeDescriptor(gateBase, {
            isIntransitive: !parsedVerb.isMarkedTransitive,
        });
        const gatePattern = createCausativeDescriptorMatcher(gateDescriptor);
        if (
            !parsedVerb.isMarkedTransitive
            && gateDescriptor.finalNucleus === "u"
            && typeTwoGate.endsWithU !== false
        ) {
            allowTypeTwoIntransitiveU = true;
        }
        if (
            !parsedVerb.isMarkedTransitive
            && gateDescriptor.finalNucleus === "a"
            && typeTwoGate.endsWithA !== false
        ) {
            const aRules = DERIVATIONAL_RULES?.causative?.intransitiveEndsWithA || {};
            const allowList = Array.isArray(aRules.replacementOnly) ? aRules.replacementOnly : [];
            const typeTwoAllow = Array.isArray(aRules.typeTwoAllow) ? aRules.typeTwoAllow : [];
            const baseForGate = normalizeRuleBase(gateBase);
            const allowTypeTwoList = matchesDerivationRuleBaseList(
                typeTwoAllow,
                baseForGate,
                getNonReduplicatedRoot(baseForGate)
            );
            allowTypeTwoIntransitiveA = allowTypeTwoList
                || (allowList.length > 0 && !matchesDerivationRuleBaseList(
                    allowList,
                    baseForGate,
                    getNonReduplicatedRoot(baseForGate)
                ));
        }
        if (
            !parsedVerb.isMarkedTransitive
            && gatePattern.has({ endingFamily: "n+i" })
            && typeTwoGate.endsWithNi !== false
        ) {
            const niGate = typeTwoGate.endsWithNi && typeof typeTwoGate.endsWithNi === "object"
                ? typeTwoGate.endsWithNi
                : {};
            const minSyllables = Number.isFinite(niGate.minSyllables) ? Math.max(0, niGate.minSyllables) : 3;
            const requiredSuffix = typeof niGate.requireNonactiveSuffix === "string"
                ? niGate.requireNonactiveSuffix
                : "uwa";
            const niSyllables = getSyllables(gateBase, { analysis: true, assumeFinalV: true });
            if (niSyllables.length >= minSyllables) {
                const niOptions = getNonactiveDerivationOptions(gateBase, gateBase, {
                    isTransitive: false,
                    ruleBase: gateBase,
                    rootPlusYaBase: parsedVerb.rootPlusYaBase,
                }).map((option) => annotateCausativeNonactiveOption(option, {
                    isTransitive: false,
                    isIntransitive: true,
                }));
                allowTypeTwoIntransitiveNiUwa = niOptions.some((option) => (
                    option?.sourcePattern?.has({ nonactiveFamily: requiredSuffix })
                ));
            }
        }
        if (!parsedVerb.isMarkedTransitive) {
            const nonactiveOptions = getNonactiveDerivationOptions(gateBase, gateBase, {
                isTransitive: false,
                ruleBase: gateBase,
                rootPlusYaBase: parsedVerb.rootPlusYaBase,
            }).map((option) => annotateCausativeNonactiveOption(option, {
                isTransitive: false,
                isIntransitive: true,
            }));
            const gateHasNonactiveFamily = (nonactiveFamily) => (
                nonactiveOptions.some((option) => option?.sourcePattern?.has({ nonactiveFamily }))
            );
            const gateSyllableCount = gateDescriptor.nonRedupSyllableCount || gateDescriptor.syllableCount || 0;
            if (gateSyllableCount <= 1) {
                allowTypeTwoIntransitiveLu = gateHasNonactiveFamily("lu");
            }
            if (gatePattern.has({ endingFamily: "k+i", previousSyllableForm: "CV" })) {
                allowTypeTwoIntransitiveKi = true;
            }
            const allowSuffixes = Array.isArray(typeTwoGate.allowWhenHasNonactiveSuffixes)
                ? typeTwoGate.allowWhenHasNonactiveSuffixes.filter(Boolean)
                : [];
            if (allowSuffixes.length) {
                allowTypeTwoIntransitiveUwa = allowSuffixes.some((nonactiveFamily) => (
                    gateHasNonactiveFamily(nonactiveFamily)
                ));
            }
        }
    }
    const allowTypeTwo = allowTypeTwoIntransitiveA
        || allowTypeTwoIntransitiveNiUwa
        || allowTypeTwoIntransitiveU
        || allowTypeTwoIntransitiveUwa
        || allowTypeTwoIntransitiveKi
        || allowTypeTwoIntransitiveLu;
    return {
        allowTypeTwo,
        baseIsTransitive,
        gates: {
            baseIsTransitive,
            allowTypeTwoIntransitiveA,
            allowTypeTwoIntransitiveNiUwa,
            allowTypeTwoIntransitiveU,
            allowTypeTwoIntransitiveUwa,
            allowTypeTwoIntransitiveKi,
            allowTypeTwoIntransitiveLu,
        },
    };
}

function applyCausativeDerivation({
    isCausative,
    verb,
    analysisVerb,
    objectPrefix,
    parsedVerb,
    directionalPrefix,
    isYawi,
    suppletiveStemSet,
    causativeSubtype,
}) {
    if (!isCausative) {
        return {
            verb,
            analysisVerb,
            isYawi,
            causativeAllStems: null,
            suppletiveStemSet,
        };
    }
    // Suppletive: yawi has a fixed causative stem.
    if (parsedVerb?.isYawi) {
        const causativeSource = getNonactiveDerivationSource(parsedVerb, verb, analysisVerb);
        const prefix = causativeSource.prefix || "";
        const embeddedPrefix = getEmbeddedVerbPrefix(parsedVerb);
        const baseStem = getSuppletiveYawiCausativeActive();
        const baseSelectedStem = prefix ? `${prefix}${baseStem}` : baseStem;
        const selectedStem = applyEmbeddedPrefixToStem(baseSelectedStem, embeddedPrefix, directionalPrefix);
        const nextAnalysis = stripDirectionalPrefixFromStem(baseSelectedStem, directionalPrefix);
        return {
            verb: selectedStem,
            analysisVerb: nextAnalysis,
            isYawi: false,
            causativeAllStems: [selectedStem],
            causativeAllStemSpecs: [buildLiteralMorphStemSpec(baseSelectedStem)],
            noCausativeStem: false,
            suppletiveStemSet: null,
            selectedForwardMeta: {
                surfaceStem: selectedStem,
                baseStem: baseSelectedStem,
                stemSpec: buildLiteralMorphStemSpec(baseSelectedStem),
                rule: "suppletive-yawi-causative",
                patternType: "suppletive",
                causativeTrace: null,
                preferred: true,
            },
        };
    }
    const canonicalRuleBase = parsedVerb?.canonicalRuleBase || parsedVerb?.canonical?.ruleBase || "";
    const canonicalFullRuleBase = parsedVerb?.canonicalFullRuleBase || parsedVerb?.canonical?.fullRuleBase || "";
    const causativeRuleSource = buildNonactiveRuleSourceContext(verb, analysisVerb, {
        verbMeta: parsedVerb,
        parsedVerb,
    });
    suppletiveStemSet = null;
    const causativeSource = getNonactiveDerivationSource(parsedVerb, verb, analysisVerb);
    const ruleBase = canonicalRuleBase || causativeRuleSource.ruleBase;
    const fullRuleBase = canonicalFullRuleBase || causativeRuleSource.matrixBase || causativeSource.baseVerb || "";
    const { allowTypeTwo, baseIsTransitive } = computeAllowTypeTwoCausativeForParsedVerb(parsedVerb);
    const treatAsIntransitive = !baseIsTransitive
        && parsedVerb.hasLeadingDash !== true
        && isValenceNeutralIntransitiveStem(ruleBase);
    const options = getCausativeDerivationOptions(ruleBase, ruleBase, {
        isTransitive: treatAsIntransitive ? false : baseIsTransitive,
        isYawi: parsedVerb.isYawi,
        ruleBase,
        fullRuleBase,
        canonicalRuleBase,
        canonicalFullRuleBase,
        rootPlusYaBase: parsedVerb.rootPlusYaBase,
        // Intransitives that can form nonactive -uwa should also be able to form type-two causatives
        // by dropping -uwa and adding -tia (with m->n before t where applicable).
        allowTypeTwo,
        hasLeadingDash: parsedVerb.hasLeadingDash === true,
        parsedVerb,
    });
    if (!options.length) {
        return {
            verb,
            analysisVerb,
            isYawi,
            causativeAllStems: null,
            noCausativeStem: true,
            suppletiveStemSet,
        };
    }
    const filteredOptions = (() => {
        if (causativeSubtype === CAUSATIVE_SUBTYPE.one) {
            return options.filter((opt) => opt.type !== "type-two");
        }
        if (causativeSubtype === CAUSATIVE_SUBTYPE.two) {
            return options.filter((opt) => opt.type === "type-two");
        }
        return options;
    })();
    const effectiveOptions = filteredOptions.length ? filteredOptions : options;
    const prefix = causativeSource.prefix || "";
    const embeddedPrefix = getEmbeddedVerbPrefix(parsedVerb);
    const selectedCausative = buildDerivedStemSelection({
        options: effectiveOptions,
        prefix,
        embeddedPrefix,
        directionalPrefix,
        fallbackStem: verb || "",
    });
    return {
        verb: selectedCausative.selectedStem,
        analysisVerb: selectedCausative.analysisStem,
        isYawi: false,
        causativeAllStems: selectedCausative.allStems,
        causativeAllStemSpecs: selectedCausative.allStemSpecs,
        noCausativeStem: false,
        suppletiveStemSet,
        selectedForwardMeta: selectedCausative.selectedMeta || null,
    };
}

function getApplicativeDerivationOptions(verb, analysisVerb, options = {}) {
    const source = verb || analysisVerb;
    const ruleBase = options.ruleBase
        || options.canonicalRuleBase
        || getCanonicalRuleBaseFromOptions(source, options);
    const fullRuleBase = options.canonicalFullRuleBase
        || (options.parsedVerb && options.parsedVerb.canonicalFullRuleBase)
        || (options.parsedVerb && options.parsedVerb.canonical && options.parsedVerb.canonical.fullRuleBase)
        || (options.verbMeta && options.verbMeta.canonicalFullRuleBase)
        || (options.verbMeta && options.verbMeta.canonical && options.verbMeta.canonical.fullRuleBase)
        || normalizeRuleBase(options.fullRuleBase || "");
    if (!ruleBase || !VOWEL_END_RE.test(ruleBase)) {
        return [];
    }
    const isTransitive = options.isTransitive === true;
    const isIntransitive = options.isTransitive === false ? true : !isTransitive;
    const rules = DERIVATIONAL_RULES?.applicative || {};
    const extractExampleBases = (examples) => (
        Array.isArray(examples)
            ? examples.map((entry) => String(entry || "").split("->")[0].trim()).filter(Boolean)
            : []
    );
    const results = [];
    const seen = new Set();
    const push = (stemOrSpec, meta = {}) => {
        const stemSpec = (stemOrSpec && typeof stemOrSpec === "object" && stemOrSpec.kind)
            ? stemOrSpec
            : buildLiteralMorphStemSpec(stemOrSpec);
        const stem = realizeMorphStemSpec(stemSpec);
        if (!stem) {
            return;
        }
        if (!isSyllableSequencePronounceable(stem)) {
            return;
        }
        const key = stem;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        results.push({ stem, stemSpec, ...meta });
    };
    const pushWithRoute = (stemOrSpec, sourceBase = "", sourceSuffix = "", meta = {}) => {
        const stemSpec = (stemOrSpec && typeof stemOrSpec === "object" && stemOrSpec.kind)
            ? stemOrSpec
            : buildMorphStemSpecFromRoute(sourceBase, sourceSuffix, stemOrSpec);
        const routeText = buildMorphStemGuidanceRoute(stemSpec);
        push(stemSpec, {
            ...meta,
            guidanceRoute: routeText ? { text: routeText } : null,
        });
    };
    const normalizeExceptionStems = (list) => (
        Array.isArray(list)
            ? list.map((stem) => String(stem || "").replace(/^-+/, "")).filter(Boolean)
            : []
    );
    const matchesExceptionBase = (base, entry) => {
        if (!base) {
            return false;
        }
        const applyToPrefixes = entry?.applyToPrefixes === true;
        if (matchesDerivationRuleBaseList([base], ruleBase, fullRuleBase)) {
            return true;
        }
        if (!applyToPrefixes) {
            return false;
        }
        const redupRuleBase = getNonReduplicatedRoot(ruleBase) || ruleBase;
        const redupFull = fullRuleBase ? (getNonReduplicatedRoot(fullRuleBase) || fullRuleBase) : "";
        return redupRuleBase.endsWith(base) || (redupFull && redupFull.endsWith(base));
    };
    const exceptions = rules.exceptions && typeof rules.exceptions === "object"
        ? rules.exceptions
        : {};
    for (const [key, entry] of Object.entries(exceptions)) {
        if (!entry || typeof entry !== "object") {
            continue;
        }
        const base = entry.base || key;
        if (!matchesExceptionBase(base, entry)) {
            continue;
        }
        const directStems = normalizeExceptionStems(entry.directStems);
        const applicativeStems = normalizeExceptionStems(entry.applicativeStems);
        const singleStem = typeof entry.applicativeStem === "string"
            ? entry.applicativeStem.replace(/^-+/, "")
            : "";
        directStems.forEach((stem) => push(stem, { type: "exception", rule: "direct" }));
        applicativeStems.forEach((stem) => push(stem, { type: "exception", rule: "applicative" }));
        if (singleStem) {
            push(singleStem, { type: "exception", rule: "applicative" });
        }
        return results;
    }
    if (options.allowValenceNeutral === true) {
        const valenceNeutral = rules.valenceNeutralPairs || {};
        const neutralVerbs = Array.isArray(valenceNeutral?.verbs) ? valenceNeutral.verbs : [];
        const neutralSuffixes = Array.isArray(valenceNeutral?.suffixes) ? valenceNeutral.suffixes : [];
        const matchesNeutralSuffix = (base) => neutralSuffixes.some((suffix) => (
            suffix
            && base.endsWith(suffix)
            && base.length > suffix.length
        ));
        const isNeutral = matchesDerivationRuleBaseList(neutralVerbs, ruleBase, fullRuleBase)
            || matchesNeutralSuffix(ruleBase)
            || (fullRuleBase && matchesNeutralSuffix(fullRuleBase));
        if (isIntransitive && isNeutral) {
            push(ruleBase, { type: "neutral", rule: "valence-neutral" });
            return results;
        }
    }
    const rootPlusYaBase = typeof options.rootPlusYaBase === "string" ? options.rootPlusYaBase : "";
    const isRootPlusYa = Boolean(rootPlusYaBase)
        || options.parsedVerb?.isRootPlusYa === true
        || options.parsedVerb?.rootPlusYaBase;
    const applicativeDescriptor = buildApplicativeDescriptor(ruleBase, {
        isTransitive,
        isIntransitive,
        isRootPlusYa,
    });
    const applicativePattern = createApplicativeDescriptorMatcher(applicativeDescriptor);
    const finalOnset = applicativeDescriptor.finalOnset;
    const finalNucleus = applicativeDescriptor.finalNucleus;
    const previousHasCoda = applicativeDescriptor.previousHasCoda === true;
    const inferWiStockFormative = (baseStem) => {
        if (!baseStem) {
            return "";
        }
        const rootBase = getNonReduplicatedRoot(baseStem) || baseStem;
        const letters = splitVerbLetters(rootBase);
        if (!letters.length) {
            return "";
        }
        if (letters[letters.length - 1] === "l") {
            return "i";
        }
        for (let i = letters.length - 1; i >= 0; i -= 1) {
            const letter = letters[i];
            if (!isVerbLetterVowel(letter)) {
                continue;
            }
            if (letter === "e" || letter === "a") {
                return "i";
            }
            if (letter === "i" || letter === "u") {
                return "a";
            }
            return "";
        }
        return "";
    };
    const uaStockFormativeU = Array.isArray(rules?.uaStockFormativeU)
        ? rules.uaStockFormativeU
        : [];
    const uaLia = Array.isArray(rules?.uaLia)
        ? rules.uaLia
        : [];
    const uaLiaKeepYa = Array.isArray(rules?.uaLiaKeepYa)
        ? rules.uaLiaKeepYa
        : [];
    const matchesUaStock = matchesDerivationRuleBaseList(uaStockFormativeU, ruleBase, fullRuleBase);
    const matchesUaLia = matchesDerivationRuleBaseList(uaLia, ruleBase, fullRuleBase);
    if (
        applicativePattern.has({
            modifiers: ["classC"],
            classCFamily: "ua",
        })
    ) {
        const rightmostPreFinalCoda = applicativeDescriptor.rightmostPreFinalCoda || "";
        if (rightmostPreFinalCoda === "l") {
            pushWithRoute(buildReplaceSuffixMorphStemSpec(ruleBase, "ua", "wia"), "", "", {
                type: "class-c",
                rule: "class-c-l-wia",
            });
            return results;
        }
        if (!rightmostPreFinalCoda && isIntransitive) {
            pushWithRoute(buildReplaceSuffixMorphStemSpec(ruleBase, "ua", "ilwia"), "", "", {
                type: "class-c",
                rule: "class-c-ilwia",
            });
            return results;
        }
    }
    if (
        isTransitive
        && (
            applicativePattern.has({
                modifiers: ["classC"],
                classCFamily: "ua",
            })
            || matchesUaStock
            || matchesUaLia
        )
    ) {
        let baseStem = applicativePattern.has({
            modifiers: ["classC"],
            classCFamily: "ua",
        })
            ? ruleBase.slice(0, -2)
            : ruleBase;
        if (matchesUaLia) {
            const keepYa = matchesDerivationRuleBaseList(uaLiaKeepYa, ruleBase, fullRuleBase);
            let sourceSuffix = "";
            if (keepYa) {
                baseStem = ruleBase;
                sourceSuffix = "";
            } else if (applicativePattern.has({ endingFamily: "y+a" })) {
                baseStem = ruleBase.slice(0, -2);
                sourceSuffix = "ya";
            } else if (applicativePattern.has({ modifiers: ["classC"], classCFamily: "ua" })) {
                baseStem = ruleBase.slice(0, -1);
                sourceSuffix = "ua";
            } else if (applicativeDescriptor.finalNucleus === "a") {
                baseStem = ruleBase.slice(0, -1);
                sourceSuffix = "a";
            }
            pushWithRoute(buildAppendMorphStemSpec(baseStem, "lia", {
                sourceBase: baseStem,
                sourceSuffix,
            }), "", "", {
                type: "class-c",
                rule: "class-c-ua-lia",
            });
            return results;
        }
        let stockFormative = matchesUaStock ? "u" : inferWiStockFormative(baseStem);
        if (
            !stockFormative
            && options.parsedVerb?.hasOptionalSupportiveI
            && baseStem
            && !VOWEL_RE.test(baseStem)
        ) {
            const supportiveLetter = resolveOptionalSupportiveLetter(
                options.parsedVerb?.optionalSupportiveLetter,
                options.parsedVerb?.analysisVerb || options.parsedVerb?.rawAnalysisVerb || baseStem
            );
            stockFormative = inferWiStockFormative(`${supportiveLetter}${baseStem}`);
        }
        if (stockFormative) {
            pushWithRoute(
                buildAppendMorphStemSpec(baseStem, `${stockFormative}lwia`, {
                    sourceBase: baseStem,
                    sourceSuffix: applicativePattern.has({ modifiers: ["classC"], classCFamily: "ua" }) ? "ua" : "",
                }),
                "",
                "",
                { type: "class-c", rule: "class-c-ua-stock-formative" },
            );
            return results;
        }
    }
    const syllableCount = applicativeDescriptor.nonRedupSyllableCount || applicativeDescriptor.syllableCount;
    const fusionPrefixes = Array.isArray(options.parsedVerb?.fusionPrefixes)
        ? options.parsedVerb.fusionPrefixes
        : [];
    const fusionStrippedBase = fusionPrefixes.length
        ? stripLeadingPrefixes(ruleBase, fusionPrefixes)
        : ruleBase;
    const classDBase = getNonReduplicatedRoot(fusionStrippedBase) || fusionStrippedBase;
    const classDDescriptor = classDBase
        ? buildApplicativeDescriptor(classDBase, { isTransitive, isIntransitive })
        : null;
    const classDSyllableCount = classDDescriptor?.syllableCount || syllableCount;
    const isDirectClassD = classDSyllableCount === 1;
    const blockReplaciveNucleus = applicativePattern.hasAny([
        { modifiers: ["rootPlusYa"] },
        { modifiers: ["transitive"], endingFamily: "y+a" },
    ]);
    const blockReplaciveOnsetForShort = isShortReplaciveOnsetBase(ruleBase);
    const clusterAfterDeletion = applicativePattern.has({ juncture: "C|CV" });
    const endsWithAorI = finalNucleus === "a" || finalNucleus === "i";
    const allowTypeOneTransitive = endsWithAorI && (
        (finalOnset === "w")
        || (finalOnset === "k" && finalNucleus === "a" && clusterAfterDeletion)
        || (finalOnset === "m" && finalNucleus === "a")
        || (finalOnset === "n")
        || (finalOnset === "kw")
        || (finalOnset === "tz" && finalNucleus === "a")
    );
    const allowTypeOneIntransitive = endsWithAorI && (
        (finalOnset === "w")
        || (finalOnset === "n" && finalNucleus === "a")
    );
    const allowTypeOne = (isTransitive ? allowTypeOneTransitive : allowTypeOneIntransitive)
        && !applicativePattern.has({ modifiers: ["classC"] });
    if (allowTypeOne) {
        const dropped = dropFinalVowel(ruleBase);
        if (dropped) {
            let stemBase = dropped;
            if (isTransitive && finalOnset === "tz" && finalNucleus === "a") {
                stemBase = `${stemBase.slice(0, -2)}ch`;
            }
            pushWithRoute(buildAppendMorphStemSpec(stemBase, "ia", {
                sourceBase: dropped,
                sourceSuffix: finalNucleus,
            }), "", "", {
                type: "type-one",
                rule: "drop-final-vowel",
            });
        }
    }
    const nonactiveOptions = getNonactiveDerivationOptions(ruleBase, ruleBase, {
        isTransitive,
        isYawi: options.isYawi === true,
        ruleBase,
        rootPlusYaBase,
    }).map((option) => annotateApplicativeNonactiveOption(option, {
        isTransitive,
        isIntransitive,
    }));
    const optionHasFamily = (option, nonactiveFamily) => Boolean(
        option?.sourcePattern?.has({ nonactiveFamily })
    );
    let luOptions = nonactiveOptions.filter((option) => (
        optionHasFamily(option, "lu")
        && realizeMorphStemSpec(option?.stemSpec, option?.stem || "")
    ));
    const uwaOptions = nonactiveOptions.filter((option) => (
        optionHasFamily(option, "uwa")
        && realizeMorphStemSpec(option?.stemSpec, option?.stem || "")
    ));
    if (isRootPlusYa) {
        const retainedYaStem = `${ruleBase}lu`;
        luOptions = luOptions.filter((option) => (
            realizeMorphStemSpec(option?.stemSpec, option?.stem || "") !== retainedYaStem
        ));
    }
    const sourceSyllableCount = applicativeDescriptor.nonRedupSyllableCount
        || applicativeDescriptor.syllableCount
        || 0;
    const allowIntransitiveShortUwaApplicative = isIntransitive
        && sourceSyllableCount <= 2;
    if (allowIntransitiveShortUwaApplicative && uwaOptions.length) {
        uwaOptions.forEach((option) => {
            const optionStem = realizeMorphStemSpec(option?.stemSpec, option?.stem || "");
            let baseStem = optionStem;
            if (baseStem.endsWith("uwa")) {
                baseStem = baseStem.slice(0, -3);
                // If nonactive -uwa was built by deleting final -wi (e.g. awi -> auwa),
                // restore the dropped w before adding -ilia.
                if (applicativePattern.has({ endingFamily: "w+i" })) {
                    const wiBase = ruleBase.slice(0, -2);
                    if (baseStem === wiBase) {
                        baseStem = `${baseStem}w`;
                    }
                }
            }
            if (baseStem) {
                const sourceBase = optionStem.endsWith("uwa")
                    ? optionStem.slice(0, -3)
                    : "";
                pushWithRoute(buildAppendMorphStemSpec(baseStem, "ilia", {
                    sourceBase,
                    sourceSuffix: "uwa",
                }), "", "", {
                    type: "type-two",
                    rule: "nonactive-uwa-ilia",
                    preferred: true,
                });
            }
        });
    }
    if (!luOptions.length && applicativePattern.has({
        modifiers: ["intransitive"],
        finalNucleus: "i",
    })) {
        luOptions = [annotateApplicativeNonactiveOption({ suffix: "lu", stem: `${ruleBase}lu` }, {
            isTransitive,
            isIntransitive,
        })];
    }
    luOptions.forEach((option) => {
        const optionStem = realizeMorphStemSpec(option?.stemSpec, option?.stem || "");
        let baseStem = optionStem;
        if (baseStem.endsWith("lu")) {
            baseStem = baseStem.slice(0, -1);
        }
        const letters = splitVerbLetters(baseStem);
        if (!letters.length) {
            return;
        }
        let coda = "";
        if (isVerbLetterConsonant(letters[letters.length - 1])) {
            coda = letters.pop();
        }
        if (!letters.length) {
            return;
        }
        const descriptorBase = letters.join("");
        const baseDescriptor = buildApplicativeDescriptor(descriptorBase, {
            isTransitive,
            isIntransitive,
        });
        const nucleusIndex = letters.length - 1;
        const onsetIndex = letters.length - 2;
        const adjustedFinalNucleus = baseDescriptor.finalNucleus;
        const adjustedFinalOnset = baseDescriptor.finalOnset;
        const blockReplaciveForCluster = applicativePattern.has({
            modifiers: ["classC"],
            juncture: "C|CV",
        });
        const allowReplaciveOnset = !applicativePattern.hasAny([
            { modifiers: ["rootPlusYa"] },
            { modifiers: ["classC"] },
        ]) && !isDirectClassD;
        const allowSaChange = adjustedFinalNucleus === "i" || adjustedFinalNucleus === "a";
        const allowTzChange = allowSaChange && !baseDescriptor.previousHasCoda;
        if (allowReplaciveOnset) {
            if (allowTzChange && adjustedFinalOnset === "tz") {
                letters[onsetIndex] = "ch";
            } else if (allowSaChange && adjustedFinalOnset === "s") {
                letters[onsetIndex] = "sh";
            } else if (!blockReplaciveOnsetForShort && adjustedFinalOnset === "t" && ruleBase !== "pata") {
                if (!baseDescriptor.preFinalIsConsonant) {
                    letters[onsetIndex] = "ch";
                }
            }
        }
        if (
            adjustedFinalNucleus === "a"
            && !isDirectClassD
            && !blockReplaciveNucleus
            && !blockReplaciveForCluster
        ) {
            letters[nucleusIndex] = "i";
        }
        const adjustedBase = `${letters.join("")}${coda}`;
        const sourceBase = optionStem.endsWith("lu")
            ? optionStem.slice(0, -2)
            : "";
        pushWithRoute(buildAppendMorphStemSpec(adjustedBase, "ia", {
            sourceBase,
            sourceSuffix: "lu",
        }), "", "", {
            type: "type-two",
            rule: "nonactive-lu",
        });
    });
    return results;
}

function applyApplicativeDerivation({
    isApplicative,
    verb,
    analysisVerb,
    objectPrefix,
    parsedVerb,
    directionalPrefix,
    isYawi,
    suppletiveStemSet,
}) {
    if (!isApplicative) {
        return {
            verb,
            analysisVerb,
            isYawi,
            applicativeAllStems: null,
            noApplicativeStem: false,
            suppletiveStemSet,
        };
    }
    suppletiveStemSet = null;
    const canonicalRuleBase = parsedVerb?.canonicalRuleBase || parsedVerb?.canonical?.ruleBase || "";
    const canonicalFullRuleBase = parsedVerb?.canonicalFullRuleBase || parsedVerb?.canonical?.fullRuleBase || "";
    const applicativeRuleSource = buildNonactiveRuleSourceContext(verb, analysisVerb, {
        verbMeta: parsedVerb,
        parsedVerb,
    });
    const applicativeSource = getNonactiveDerivationSource(parsedVerb, verb, analysisVerb);
    const ruleBase = canonicalRuleBase || applicativeRuleSource.ruleBase;
    const fullRuleBase = canonicalFullRuleBase || applicativeRuleSource.matrixBase || applicativeSource.baseVerb || "";
    const explicitSlots = Number.isFinite(parsedVerb.totalValenceSlotCount)
        ? Math.max(0, Math.min(MAX_OBJECT_SLOTS, parsedVerb.totalValenceSlotCount))
        : 0;
    const baseSlots = explicitSlots > 0
        ? explicitSlots
        : Math.max(0, getBaseObjectSlots(parsedVerb) - (parsedVerb.derivationValencyDelta || 0));
    const baseIsTransitive = baseSlots > 0;
    const options = getApplicativeDerivationOptions(ruleBase, ruleBase, {
        isTransitive: baseIsTransitive,
        ruleBase,
        fullRuleBase,
        canonicalRuleBase,
        canonicalFullRuleBase,
        hasLeadingDash: parsedVerb?.hasLeadingDash === true,
        rootPlusYaBase: parsedVerb?.rootPlusYaBase || "",
        parsedVerb,
    });
    if (!options.length) {
        return {
            verb,
            analysisVerb,
            isYawi,
            applicativeAllStems: null,
            noApplicativeStem: true,
            suppletiveStemSet,
        };
    }
    const prefix = applicativeSource.prefix || "";
    const embeddedPrefix = getEmbeddedVerbPrefix(parsedVerb);
    const selectedApplicative = buildDerivedStemSelection({
        options,
        prefix,
        embeddedPrefix,
        directionalPrefix,
        fallbackStem: verb || "",
    });
    return {
        verb: selectedApplicative.selectedStem,
        analysisVerb: selectedApplicative.analysisStem,
        isYawi: false,
        applicativeAllStems: selectedApplicative.allStems,
        applicativeAllStemSpecs: selectedApplicative.allStemSpecs,
        noApplicativeStem: false,
        suppletiveStemSet,
        selectedForwardMeta: selectedApplicative.selectedMeta || null,
    };
}

const DERIVATION_ANTIDERIVATIVE_SUFFIX_HINTS = Object.freeze({
    // Keys use literal strings (= DERIVATION_TYPE.causative, DERIVATION_TYPE.applicative)
    // to avoid referencing DERIVATION_TYPE at module load time.
    causative: [
        { suffix: "tia", bases: ["", "a", "i", "u", "ya"] },
        { suffix: "ia", bases: ["", "a", "i", "u"] },
        { suffix: "wia", bases: ["u", "ua", "wi", "a", "i"] },
        // Reverse of destockal-wi-ia path: ...iwi / ...awi -> ...ua
        { suffix: "ua", bases: [] },
    ],
    applicative: [
        { suffix: "lia", bases: ["a", "i", "u", "ya", "ua"] },
        { suffix: "lwia", bases: ["ua", "ia", "ya", "a", "i"] },
        { suffix: "ilwia", bases: ["ia", "i", "a", "ua"] },
        { suffix: "ia", bases: ["", "a", "i", "u"] },
        { suffix: "wia", bases: ["u", "ua", "wi", "a", "i"] },
    ],
});

const DERIVATION_ANTIDERIVATIVE_CACHE_MAX = 256;
const DERIVATION_ANTIDERIVATIVE_FULL_REVERSE_MAX_DEPTH = 2;
const DERIVATION_ANTIDERIVATIVE_FULL_REVERSE_MAX_SEEDS = 480;
let DERIVATION_LOOKUP_CACHE_REV = 0;
let DERIVATION_ANTIDERIVATIVE_RESULT_CACHE = new Map();
let DERIVATION_LEXICON_BASE_CANDIDATE_CACHE = {
    rev: -1,
    rows: [],
};

function normalizeDerivationStemValue(value) {
    return normalizeRuleBase(String(value || "").toLowerCase().trim());
}

function getDestockalWiReverseBaseSuffixes(root = "") {
    const normalizedRoot = normalizeDerivationStemValue(root);
    if (!normalizedRoot) {
        return ["iwi", "awi"];
    }
    const letters = splitVerbLetters(normalizedRoot);
    if (!letters.length) {
        return ["iwi", "awi"];
    }
    const wiSelectionRules = DERIVATIONAL_RULES_DOCS?.causative?.destockal?.wiStockFormative?.selection || {};
    const rootVowelMap = wiSelectionRules?.rootVowelsToStockFormative || {
        e: "i",
        a: "i",
        i: "a",
        u: "a",
    };
    const rootFinalLForcesStockFormative = wiSelectionRules?.rootFinalLForcesStockFormative || "i";
    const lastLetter = letters[letters.length - 1];
    if (lastLetter === "l" && (rootFinalLForcesStockFormative === "i" || rootFinalLForcesStockFormative === "a")) {
        return [`${rootFinalLForcesStockFormative}wi`];
    }
    const rootVowel = letters.find((letter) => isVerbLetterVowel(letter)) || "";
    const stockFormative = rootVowel ? rootVowelMap[rootVowel] : "";
    if (stockFormative === "i" || stockFormative === "a") {
        return [`${stockFormative}wi`];
    }
    return ["iwi", "awi"];
}

function normalizeAntiderivativeRequestedType(type = "") {
    return Object.values(DERIVATION_TYPE).includes(type) ? type : "";
}

function normalizeAntiderivativeExpectedValence(valence) {
    const numeric = Number(valence);
    if (!Number.isFinite(numeric)) {
        return "";
    }
    const rounded = Math.trunc(numeric);
    return String(Math.max(1, Math.min(MAX_OBJECT_SLOTS + 1, rounded)));
}

function normalizeAntiderivativeExpectedTransitivity(isTransitive) {
    if (typeof isTransitive !== "boolean") {
        return "";
    }
    return isTransitive ? "t" : "i";
}

function normalizeAntiderivativeFullReverseFlag(fullReverseSeeds) {
    return fullReverseSeeds === true ? "full" : "lite";
}

function resetDerivationalLookupCaches() {
    DERIVATION_LOOKUP_CACHE_REV += 1;
    DERIVATION_ANTIDERIVATIVE_RESULT_CACHE = new Map();
    DERIVATION_LEXICON_BASE_CANDIDATE_CACHE = {
        rev: DERIVATION_LOOKUP_CACHE_REV,
        rows: [],
    };
}

function buildDerivationalAntiderivativeCacheKey(targetStem, requestedType = "", options = {}) {
    const normalizedType = normalizeAntiderivativeRequestedType(requestedType) || "both";
    const normalizedValence = normalizeAntiderivativeExpectedValence(options.expectedValence) || "any";
    const normalizedTransitivity = normalizeAntiderivativeExpectedTransitivity(options.expectedIsTransitive) || "any";
    const normalizedFullReverse = normalizeAntiderivativeFullReverseFlag(options.fullReverseSeeds);
    return `${DERIVATION_LOOKUP_CACHE_REV}|${normalizedType}|${normalizedValence}|${normalizedTransitivity}|${normalizedFullReverse}|${targetStem}`;
}

function getCachedDerivationalAntiderivativeResult(targetStem, requestedType = "", options = {}) {
    if (!targetStem) {
        return null;
    }
    const cacheKey = buildDerivationalAntiderivativeCacheKey(targetStem, requestedType, options);
    return DERIVATION_ANTIDERIVATIVE_RESULT_CACHE.get(cacheKey) || null;
}

function setCachedDerivationalAntiderivativeResult(targetStem, requestedType = "", options = {}, value = null) {
    if (!targetStem || !value || typeof value !== "object") {
        return;
    }
    const cacheKey = buildDerivationalAntiderivativeCacheKey(targetStem, requestedType, options);
    if (DERIVATION_ANTIDERIVATIVE_RESULT_CACHE.has(cacheKey)) {
        DERIVATION_ANTIDERIVATIVE_RESULT_CACHE.delete(cacheKey);
    }
    DERIVATION_ANTIDERIVATIVE_RESULT_CACHE.set(cacheKey, value);
    while (DERIVATION_ANTIDERIVATIVE_RESULT_CACHE.size > DERIVATION_ANTIDERIVATIVE_CACHE_MAX) {
        const firstKey = DERIVATION_ANTIDERIVATIVE_RESULT_CACHE.keys().next().value;
        if (!firstKey) {
            break;
        }
        DERIVATION_ANTIDERIVATIVE_RESULT_CACHE.delete(firstKey);
    }
}

function dedupeDerivationRows(rows = [], keyFactory = null) {
    const seen = new Set();
    const nextRows = [];
    rows.forEach((row) => {
        if (!row || typeof row !== "object") {
            return;
        }
        const key = keyFactory
            ? keyFactory(row)
            : JSON.stringify(row);
        if (!key || seen.has(key)) {
            return;
        }
        seen.add(key);
        nextRows.push(row);
    });
    return nextRows;
}

function buildDerivationOptionsForType(derivationType, stem, optionContext = {}) {
    const normalizedStem = normalizeDerivationStemValue(stem);
    if (!normalizedStem) {
        return [];
    }
    const normalizedType = Object.values(DERIVATION_TYPE).includes(derivationType)
        ? derivationType
        : DERIVATION_TYPE.direct;
    if (normalizedType === DERIVATION_TYPE.direct) {
        return [{
            stem: normalizedStem,
            stemSpec: buildLiteralMorphStemSpec(normalizedStem),
            type: "direct",
            rule: "identity",
            preferred: true,
        }];
    }
    if (normalizedType === DERIVATION_TYPE.causative) {
        return getCausativeDerivationOptions(normalizedStem, normalizedStem, optionContext);
    }
    if (normalizedType === DERIVATION_TYPE.applicative) {
        return getApplicativeDerivationOptions(normalizedStem, normalizedStem, optionContext);
    }
    return [];
}

function buildForwardDerivationRows({
    directStem,
    derivationType,
    parsedVerb,
    transitivityModes = [false, true],
}) {
    const rows = [];
    const normalizedDirect = normalizeDerivationStemValue(directStem);
    if (!normalizedDirect) {
        return rows;
    }
    const sourcePrefix = parsedVerb?.hasBoundMarker
        ? (
            parsedVerb?.sourcePrefix
            || parsedVerb?.canonical?.sourcePrefix
            || resolveCanonicalSourceSplit(parsedVerb, {
                verb: normalizedDirect,
                analysisVerb: normalizedDirect,
            }).sourcePrefix
            || ""
        )
        : "";
    const canonicalFullRuleBase = parsedVerb?.canonicalFullRuleBase
        || parsedVerb?.canonical?.fullRuleBase
        || "";
    const rootPlusYaBase = parsedVerb?.rootPlusYaBase || "";
    transitivityModes.forEach((isTransitive) => {
        const optionContext = {
            isTransitive,
            hasLeadingDash: isTransitive,
            ruleBase: normalizedDirect,
            fullRuleBase: canonicalFullRuleBase,
            canonicalRuleBase: normalizedDirect,
            canonicalFullRuleBase,
            rootPlusYaBase,
            parsedVerb,
            allowTypeTwo: true,
        };
        const options = buildDerivationOptionsForType(
            derivationType,
            normalizedDirect,
            optionContext,
        );
        options.forEach((option) => {
            const stem = normalizeDerivationStemValue(
                realizeMorphStemSpec(option?.stemSpec, option?.stem || "")
            );
            if (!stem) {
                return;
            }
            const skipSourcePrefix = Boolean(
                sourcePrefix
                && option?.skipSourcePrefixIfPresent
                && stem.startsWith(sourcePrefix)
            );
            const surfacedStem = sourcePrefix && !skipSourcePrefix
                ? `${sourcePrefix}${stem}`
                : stem;
            rows.push({
                stem: surfacedStem,
                derivationType,
                transitivity: isTransitive ? "transitive" : "intransitive",
                isTransitive,
                rule: option?.rule || "",
                patternType: option?.type || "",
                preferred: option?.preferred === true,
                causativeTrace: option?.causativeTrace || null,
                guidanceRoute: option?.guidanceRoute || null,
                stemSpec: option?.stemSpec || null,
            });
        });
    });
    return dedupeDerivationRows(
        rows,
        (row) => `${row.derivationType}|${row.transitivity}|${row.stem}|${row.rule}|${row.patternType}`,
    );
}

function traceDerivationalFunction(rawInput, options = {}) {
    const baseInput = String(getSearchInputBase(rawInput || "") || "");
    const parsedVerb = parseVerbInput(baseInput);
    const canonicalDirect = normalizeDerivationStemValue(
        parsedVerb?.canonicalRuleBase
        || parsedVerb?.canonical?.ruleBase
        || resolveNonactiveRuleBase(parsedVerb?.analysisVerb || parsedVerb?.verb || "", parsedVerb)
        || parsedVerb?.analysisVerb
        || parsedVerb?.verb
        || "",
    );
    const sourcePrefix = parsedVerb?.hasBoundMarker
        ? (
            parsedVerb?.sourcePrefix
            || parsedVerb?.canonical?.sourcePrefix
            || resolveCanonicalSourceSplit(parsedVerb, {
                verb: canonicalDirect,
                analysisVerb: canonicalDirect,
            }).sourcePrefix
            || ""
        )
        : "";
    const directStem = sourcePrefix && canonicalDirect && !canonicalDirect.startsWith(sourcePrefix)
        ? `${sourcePrefix}${canonicalDirect}`
        : canonicalDirect;
    const inferredIsTransitive = getBaseObjectSlots(parsedVerb) > 0;
    const primaryIsTransitive = options.isTransitive === true
        ? true
        : (options.isTransitive === false ? false : inferredIsTransitive);
    const includeBothTransitivity = options.includeBothTransitivity !== false;
    const transitivityModes = includeBothTransitivity
        ? (primaryIsTransitive ? [true, false] : [false, true])
        : [primaryIsTransitive];
    const direct = canonicalDirect
        ? [{
            stem: directStem,
            stemSpec: buildLiteralMorphStemSpec(directStem),
            derivationType: DERIVATION_TYPE.direct,
            transitivity: primaryIsTransitive ? "transitive" : "intransitive",
            isTransitive: primaryIsTransitive,
            rule: "identity",
            patternType: "direct",
            preferred: true,
        }]
        : [];
    const causative = buildForwardDerivationRows({
        directStem: canonicalDirect,
        derivationType: DERIVATION_TYPE.causative,
        parsedVerb,
        transitivityModes,
    });
    const applicative = buildForwardDerivationRows({
        directStem: canonicalDirect,
        derivationType: DERIVATION_TYPE.applicative,
        parsedVerb,
        transitivityModes,
    });
    return {
        input: rawInput,
        normalizedInput: baseInput,
        direct,
        causative,
        applicative,
        primaryTransitivity: primaryIsTransitive ? "transitive" : "intransitive",
        inferredTransitivity: inferredIsTransitive ? "transitive" : "intransitive",
    };
}

function buildBasicAntiderivativeSeedBases(stem, derivationType) {
    const normalizedStem = normalizeDerivationStemValue(stem);
    if (!normalizedStem) {
        return [];
    }
    const seeds = new Set([normalizedStem]);
    const nonRedup = getNonReduplicatedRoot(normalizedStem);
    if (nonRedup) {
        seeds.add(normalizeDerivationStemValue(nonRedup));
    }
    const hintRules = DERIVATION_ANTIDERIVATIVE_SUFFIX_HINTS[derivationType] || [];
    hintRules.forEach((rule) => {
        const suffix = normalizeDerivationStemValue(rule?.suffix || "");
        if (!suffix || !normalizedStem.endsWith(suffix) || normalizedStem.length <= suffix.length) {
            return;
        }
        const root = normalizedStem.slice(0, -suffix.length);
        if (!root) {
            return;
        }
        seeds.add(root);
        const bases = suffix === "ua" && derivationType === DERIVATION_TYPE.causative
            ? getDestockalWiReverseBaseSuffixes(root)
            : (Array.isArray(rule?.bases) ? rule.bases : []);
        bases.forEach((baseSuffix) => {
            seeds.add(`${root}${normalizeDerivationStemValue(baseSuffix)}`);
        });
        if (root.endsWith("ch")) {
            seeds.add(`${root.slice(0, -2)}tz`);
            seeds.add(`${root.slice(0, -2)}t`);
        }
        if (root.endsWith("sh")) {
            seeds.add(`${root.slice(0, -2)}s`);
        }
    });
    return Array.from(seeds)
        .map((value) => normalizeDerivationStemValue(value))
        .filter(Boolean);
}

function buildFullReverseAntiderivativeSeedBases(stem, derivationType) {
    const normalizedStem = normalizeDerivationStemValue(stem);
    if (!normalizedStem) {
        return [];
    }
    const queue = [{ seed: normalizedStem, depth: 0 }];
    const visitedStates = new Set();
    const allSeeds = new Set();
    while (queue.length) {
        const node = queue.shift();
        const normalizedSeed = normalizeDerivationStemValue(node?.seed || "");
        const depth = Number.isFinite(node?.depth) ? node.depth : 0;
        if (!normalizedSeed) {
            continue;
        }
        const stateKey = `${depth}|${normalizedSeed}`;
        if (visitedStates.has(stateKey)) {
            continue;
        }
        visitedStates.add(stateKey);
        const seeds = buildBasicAntiderivativeSeedBases(normalizedSeed, derivationType);
        seeds.forEach((candidate) => {
            const normalizedCandidate = normalizeDerivationStemValue(candidate);
            if (!normalizedCandidate) {
                return;
            }
            if (allSeeds.size >= DERIVATION_ANTIDERIVATIVE_FULL_REVERSE_MAX_SEEDS) {
                return;
            }
            if (!allSeeds.has(normalizedCandidate)) {
                allSeeds.add(normalizedCandidate);
            }
            if (depth >= DERIVATION_ANTIDERIVATIVE_FULL_REVERSE_MAX_DEPTH) {
                return;
            }
            const canExpandFurther = normalizedCandidate.length >= 3 && normalizedCandidate !== normalizedSeed;
            if (canExpandFurther) {
                queue.push({ seed: normalizedCandidate, depth: depth + 1 });
            }
        });
        if (allSeeds.size >= DERIVATION_ANTIDERIVATIVE_FULL_REVERSE_MAX_SEEDS) {
            break;
        }
    }
    return Array.from(allSeeds);
}

function buildAntiderivativeSeedBases(stem, derivationType, options = {}) {
    const fullReverseSeeds = options.fullReverseSeeds === true;
    if (fullReverseSeeds) {
        return buildFullReverseAntiderivativeSeedBases(stem, derivationType);
    }
    return buildBasicAntiderivativeSeedBases(stem, derivationType);
}

function getLexiconDerivationBaseCandidates() {
    if (!BASIC_DATA_CANONICAL_MAP.size) {
        return [];
    }
    if (
        DERIVATION_LEXICON_BASE_CANDIDATE_CACHE.rev === DERIVATION_LOOKUP_CACHE_REV
        && DERIVATION_LEXICON_BASE_CANDIDATE_CACHE.rows.length
    ) {
        return DERIVATION_LEXICON_BASE_CANDIDATE_CACHE.rows;
    }
    const rows = [];
    BASIC_DATA_CANONICAL_MAP.forEach((entry) => {
        const transitiveParsed = entry?.transitiveParsed || null;
        const intransitiveParsed = entry?.intransitiveParsed || null;
        if (intransitiveParsed) {
            rows.push({
                parsedVerb: intransitiveParsed,
                isTransitive: false,
                source: "lexicon",
                lexeme: entry?.base || intransitiveParsed.displayVerb || "",
            });
        }
        if (transitiveParsed) {
            rows.push({
                parsedVerb: transitiveParsed,
                isTransitive: true,
                source: "lexicon",
                lexeme: entry?.base || transitiveParsed.displayVerb || "",
            });
        }
    });
    const deduped = dedupeDerivationRows(
        rows,
        (row) => `${row.isTransitive ? "t" : "i"}|${row.parsedVerb?.canonicalRuleBase || row.parsedVerb?.verb || ""}`,
    );
    DERIVATION_LEXICON_BASE_CANDIDATE_CACHE = {
        rev: DERIVATION_LOOKUP_CACHE_REV,
        rows: deduped,
    };
    return deduped;
}

function getAntiderivativeDerivedValence(derivationType, isTransitive) {
    const baseValence = isTransitive ? 2 : 1;
    const delta = derivationType === DERIVATION_TYPE.direct ? 0 : 1;
    return baseValence + delta;
}

function getExpectedSourceTransitivityForAntiderivative(expectedValence, derivationType) {
    const normalizedValence = Number(expectedValence);
    if (!Number.isFinite(normalizedValence)) {
        return null;
    }
    const roundedValence = Math.max(1, Math.min(MAX_OBJECT_SLOTS + 1, Math.trunc(normalizedValence)));
    const delta = derivationType === DERIVATION_TYPE.direct ? 0 : 1;
    const sourceValence = Math.max(1, roundedValence - delta);
    return sourceValence > 1;
}

function findDerivationalAntiderivatives(derivedInput, options = {}) {
    const targetStem = normalizeDerivationStemValue(getSearchInputBase(derivedInput || ""));
    if (!targetStem) {
        return {
            input: derivedInput,
            normalizedInput: "",
            candidates: [],
        };
    }
    const requestedType = normalizeAntiderivativeRequestedType(options.derivationType);
    const expectedValence = normalizeAntiderivativeExpectedValence(options.expectedValence);
    const expectedValenceNumber = expectedValence ? Number(expectedValence) : NaN;
    const expectedIsTransitive = typeof options.expectedIsTransitive === "boolean"
        ? options.expectedIsTransitive
        : null;
    const fullReverseSeeds = options.fullReverseSeeds === true;
    const cacheLookupOptions = {
        expectedValence,
        expectedIsTransitive,
        fullReverseSeeds,
    };
    const cachedResult = getCachedDerivationalAntiderivativeResult(
        targetStem,
        requestedType,
        cacheLookupOptions,
    );
    if (cachedResult) {
        return {
            input: derivedInput,
            normalizedInput: cachedResult.normalizedInput || targetStem,
            candidates: Array.isArray(cachedResult.candidates) ? cachedResult.candidates : [],
        };
    }
    const derivationTypes = requestedType && requestedType !== DERIVATION_TYPE.direct
        ? [requestedType]
        : [DERIVATION_TYPE.causative, DERIVATION_TYPE.applicative];
    const heuristicCandidates = derivationTypes.flatMap((derivationType) => (
        buildAntiderivativeSeedBases(targetStem, derivationType, { fullReverseSeeds }).map((seedBase) => ({
            seedBase,
            derivationType,
            source: "heuristic",
        }))
    ));
    const lexiconCandidates = getLexiconDerivationBaseCandidates().flatMap((entry) => {
        const directStem = normalizeDerivationStemValue(
            entry.parsedVerb?.canonicalRuleBase
            || entry.parsedVerb?.canonical?.ruleBase
            || getDerivationRuleBase(entry.parsedVerb?.analysisVerb || entry.parsedVerb?.verb || "", entry.parsedVerb)
            || "",
        );
        if (!directStem) {
            return [];
        }
        return derivationTypes.map((derivationType) => ({
            seedBase: directStem,
            derivationType,
            source: entry.source,
            lexeme: entry.lexeme,
            parsedVerb: entry.parsedVerb,
            forcedIsTransitive: entry.isTransitive,
        }));
    });
    const allCandidates = [...heuristicCandidates, ...lexiconCandidates];
    const matches = [];
    allCandidates.forEach((candidate) => {
        const normalizedBase = normalizeDerivationStemValue(candidate.seedBase || "");
        if (!normalizedBase) {
            return;
        }
        const sourceTransitivityByValence = getExpectedSourceTransitivityForAntiderivative(
            expectedValenceNumber,
            candidate.derivationType,
        );
        const effectiveExpectedIsTransitive = sourceTransitivityByValence !== null
            ? sourceTransitivityByValence
            : expectedIsTransitive;
        if (
            typeof effectiveExpectedIsTransitive === "boolean"
            && typeof candidate.forcedIsTransitive === "boolean"
            && candidate.forcedIsTransitive !== effectiveExpectedIsTransitive
        ) {
            return;
        }
        const parsedVerb = candidate.parsedVerb || parseVerbInput(normalizedBase);
        const canonicalFullRuleBase = parsedVerb?.canonicalFullRuleBase
            || parsedVerb?.canonical?.fullRuleBase
            || "";
        const rootPlusYaBase = parsedVerb?.rootPlusYaBase || "";
        const transitivityModes = typeof candidate.forcedIsTransitive === "boolean"
            ? [candidate.forcedIsTransitive]
            : (typeof effectiveExpectedIsTransitive === "boolean"
                ? [effectiveExpectedIsTransitive]
                : [false, true]);
        transitivityModes.forEach((isTransitive) => {
            if (
                Number.isFinite(expectedValenceNumber)
                && expectedValenceNumber <= MAX_OBJECT_SLOTS
            ) {
                const derivedValence = getAntiderivativeDerivedValence(candidate.derivationType, isTransitive);
                if (derivedValence !== expectedValenceNumber) {
                    return;
                }
            }
            const optionsForForward = buildDerivationOptionsForType(
                candidate.derivationType,
                normalizedBase,
                {
                    isTransitive,
                    hasLeadingDash: isTransitive,
                    ruleBase: normalizedBase,
                    fullRuleBase: canonicalFullRuleBase,
                    canonicalRuleBase: normalizedBase,
                    canonicalFullRuleBase,
                    rootPlusYaBase,
                    parsedVerb,
                    allowTypeTwo: true,
                },
            );
            optionsForForward.forEach((option) => {
                const forwardStem = normalizeDerivationStemValue(
                    realizeMorphStemSpec(option?.stemSpec, option?.stem || "")
                );
                if (!forwardStem || forwardStem !== targetStem) {
                    return;
                }
                const isLexiconIdentityMatch = candidate.source !== "heuristic"
                    && (option?.rule || "") === "direct";
                if (isLexiconIdentityMatch && normalizedBase !== targetStem) {
                    return;
                }
                matches.push({
                    directStem: normalizedBase,
                    derivedStem: forwardStem,
                    derivationType: candidate.derivationType,
                    transitivity: isTransitive ? "transitive" : "intransitive",
                    isTransitive,
                    source: candidate.source,
                    lexeme: candidate.lexeme || "",
                    rule: option?.rule || "",
                    patternType: option?.type || "",
                    preferred: option?.preferred === true,
                });
            });
        });
    });
    const deduped = dedupeDerivationRows(
        matches,
        (row) => `${row.derivationType}|${row.directStem}|${row.transitivity}|${row.derivedStem}|${row.rule}|${row.patternType}|${row.source}|${row.lexeme}`,
    );
    const payload = {
        normalizedInput: targetStem,
        candidates: deduped,
    };
    setCachedDerivationalAntiderivativeResult(
        targetStem,
        requestedType,
        cacheLookupOptions,
        payload,
    );
    return {
        input: derivedInput,
        ...payload,
    };
}

function traceDerivationCalculus(rawInput, options = {}) {
    return {
        forward: traceDerivationalFunction(rawInput, options),
        antiderivatives: findDerivationalAntiderivatives(rawInput, options),
    };
}

function countFusionPrefixes(fusionPrefixes, boundPrefixes) {
    const hasParsedFusionList = Array.isArray(fusionPrefixes);
    const hasExplicitFusionList = hasParsedFusionList && fusionPrefixes.length > 0;
    // Prefer parser-produced fusion prefixes whenever available (even empty).
    // Falling back to boundPrefixes is only for parser metadata that does not
    // carry fusionPrefixes.
    const candidates = hasParsedFusionList ? fusionPrefixes : boundPrefixes;
    return candidates.filter((prefix) => (
        FUSION_PREFIXES.has(prefix)
        // "(m)" is normalized to "m" in fusionPrefixes; treat it as one consumed valency slot.
        || (hasExplicitFusionList && prefix === "m")
    )).length;
}

var MAX_OBJECT_SLOTS = 3;

const GRAMMAR_SLOT_ROLES = Object.freeze([
    "mainline",
    "shuntline1",
    "shuntline2",
]);

const GRAMMAR_ROLE_TO_SLOT_ID = Object.freeze({
    mainline: "object",
    shuntline1: "object2",
    shuntline2: "object3",
});

const GRAMMAR_SLOT_ID_TO_ROLE = Object.freeze({
    object: "mainline",
    object2: "shuntline1",
    object3: "shuntline2",
});

const GRAMMAR_ROLE_LABEL_KEY_BY_ROLE = Object.freeze({
    mainline: "mainline",
    shuntline1: "shuntline",
    shuntline2: "shuntline2",
});

const GRAMMAR_DERIVATION_PRIMARY_ROLE = Object.freeze({
    // Keys use literal strings (= DERIVATION_TYPE.direct/causative/applicative)
    // to avoid referencing DERIVATION_TYPE at module load time.
    direct: "shuntline1",
    causative: "shuntline1",
    applicative: "mainline",
});

const GRAMMAR_CONSTRAINT_IDS = Object.freeze({
    personAgreement: "person-agreement",
    hierarchyOrder: "hierarchy-order",
    valence4Matrix: "valence-4-matrix",
});

function getCanonicalRoleForSlotId(slotId = "") {
    return GRAMMAR_SLOT_ID_TO_ROLE[slotId] || "";
}

function getCanonicalSlotIdForRole(role = "") {
    return GRAMMAR_ROLE_TO_SLOT_ID[role] || "object";
}

function getCanonicalRoleLabelKey(role = "") {
    return GRAMMAR_ROLE_LABEL_KEY_BY_ROLE[role] || role;
}

function getCanonicalSlotRolesForCount(slotCount = 0) {
    const normalizedCount = Number.isFinite(slotCount)
        ? Math.max(0, Math.min(MAX_OBJECT_SLOTS, Number(slotCount)))
        : 0;
    return GRAMMAR_SLOT_ROLES.slice(0, normalizedCount);
}

function getCanonicalControllerRole(derivationType = "") {
    return GRAMMAR_DERIVATION_PRIMARY_ROLE[derivationType]
        || GRAMMAR_DERIVATION_PRIMARY_ROLE[DERIVATION_TYPE.direct];
}

function mapSlotValuesByRole(rawBySlot = {}) {
    const roleValues = {};
    GRAMMAR_SLOT_ROLES.forEach((role) => {
        const slotId = getCanonicalSlotIdForRole(role);
        roleValues[role] = rawBySlot[slotId] || "";
    });
    return roleValues;
}

function mapRoleValuesToSlotIds(roleValues = {}) {
    const bySlot = {};
    GRAMMAR_SLOT_ROLES.forEach((role) => {
        bySlot[getCanonicalSlotIdForRole(role)] = roleValues[role] || "";
    });
    return bySlot;
}

function getTypeTwoCausativeSuffixes() {
    const suffixes = new Set();
    const typeTwoSuffix = DERIVATIONAL_RULES?.causative?.typeTwo?.suffix;
    if (typeof typeTwoSuffix === "string" && typeTwoSuffix) {
        suffixes.add(typeTwoSuffix);
    }
    suffixes.add("wia");
    suffixes.add("awia");
    suffixes.add("lia");
    return Array.from(suffixes);
}

function getInferredCausativeValencyDelta(verbMeta) {
    if (!verbMeta || !verbMeta.isMarkedTransitive) {
        return 0;
    }
    const ruleBase = normalizeRuleBase(getDerivationRuleBase(verbMeta.analysisVerb || verbMeta.verb || "", verbMeta));
    if (!ruleBase) {
        return 0;
    }
    const suffixes = getTypeTwoCausativeSuffixes();
    if (!suffixes.length) {
        return 0;
    }
    if (!suffixes.some((suffix) => suffix && ruleBase.endsWith(suffix))) {
        return 0;
    }
    return 1;
}

function getBaseObjectSlots(verbMeta) {
    if (!verbMeta) {
        return 0;
    }
    let baseSlots = 0;
    const valenceSlots = Number.isFinite(verbMeta.valenceSlotCount)
        ? Math.max(0, Math.min(MAX_OBJECT_SLOTS, verbMeta.valenceSlotCount))
        : null;
    const totalSlots = Number.isFinite(verbMeta.totalValenceSlotCount)
        ? Math.max(0, Math.min(MAX_OBJECT_SLOTS, verbMeta.totalValenceSlotCount))
        : null;
    const hasExplicitValenceSlots = (totalSlots && totalSlots > 0) || (valenceSlots && valenceSlots > 0);
    if (totalSlots && totalSlots > 0) {
        baseSlots = totalSlots;
    } else if (valenceSlots && valenceSlots > 0) {
        baseSlots = valenceSlots;
    } else {
        if (verbMeta.isMarkedTransitive || verbMeta.isTaFusion) {
            baseSlots = 1;
        } else {
            baseSlots = verbMeta.hasLeadingDash ? 1 : 0;
        }
    }
    const delta = getEffectiveDerivationValencyDelta(verbMeta);
    // Only infer hidden causative valency when no explicit valence slots are marked.
    const inferredDelta = (!delta && !hasExplicitValenceSlots)
        ? getInferredCausativeValencyDelta(verbMeta)
        : 0;
    const totalDelta = delta + inferredDelta;
    if (!totalDelta) {
        return baseSlots;
    }
    return Math.max(0, Math.min(MAX_OBJECT_SLOTS, baseSlots + totalDelta));
}

function getDirectActiveObjectSlots(verbMeta) {
    if (!verbMeta) {
        return 0;
    }
    const currentSlots = getBaseObjectSlots(verbMeta);
    const delta = getEffectiveDerivationValencyDelta(verbMeta);
    return Math.max(0, Math.min(MAX_OBJECT_SLOTS, currentSlots - delta));
}

function getValencyFromDirectActive(verbMeta) {
    const directActiveSlots = getDirectActiveObjectSlots(verbMeta);
    const delta = getEffectiveDerivationValencyDelta(verbMeta);
    const activeSlots = Math.max(0, Math.min(MAX_OBJECT_SLOTS, directActiveSlots + delta));
    const nonactiveSlots = Math.max(0, activeSlots - 1);
    return {
        directActiveSlots,
        activeSlots,
        nonactiveSlots,
    };
}

function getFusionObjectSlots(verbMeta) {
    if (!verbMeta) {
        return 0;
    }
    const fusionPrefixes = Array.isArray(verbMeta.fusionPrefixes) ? verbMeta.fusionPrefixes : [];
    const boundPrefixes = Array.isArray(verbMeta.boundPrefixes) ? verbMeta.boundPrefixes : [];
    return countFusionPrefixes(fusionPrefixes, boundPrefixes);
}

function getOccupiedLexicalSourceObjectSlots(verbMeta) {
    if (!verbMeta) {
        return 0;
    }
    const parseLanguage = String(
        verbMeta.parseLanguage
        || verbMeta.inputLanguage
        || verbMeta.canonical?.parseLanguage
        || verbMeta.canonical?.inputLanguage
        || ""
    );
    if (parseLanguage !== "current-regex") {
        return 0;
    }
    if (!verbMeta.isMarkedTransitive) {
        return 0;
    }
    return getCurrentRegexStructuralOccupiedLexicalSourceSlots(verbMeta);
}

function getAvailableObjectSlots(verbMeta) {
    const embeddedSlots = Number.isFinite(verbMeta?.embeddedValenceCount) ? verbMeta.embeddedValenceCount : 0;
    const occupiedLexicalSourceSlots = getOccupiedLexicalSourceObjectSlots(verbMeta);
    return Math.max(
        0,
        getBaseObjectSlots(verbMeta) - getFusionObjectSlots(verbMeta) - embeddedSlots - occupiedLexicalSourceSlots
    );
}

function getActiveVerbValency(verbMeta) {
    const objectSlots = getBaseObjectSlots(verbMeta);
    return Math.max(1, Math.min(MAX_OBJECT_SLOTS + 1, objectSlots + 1));
}

function getVerbValencySummary(verbMeta) {
    const valency = getValencyFromDirectActive(verbMeta);
    const baseObjectSlots = valency.activeSlots;
    const fusionObjectSlots = getFusionObjectSlots(verbMeta);
    const embeddedSlots = Number.isFinite(verbMeta?.embeddedValenceCount) ? verbMeta.embeddedValenceCount : 0;
    const occupiedLexicalSourceSlots = getOccupiedLexicalSourceObjectSlots(verbMeta);
    const availableObjectSlots = Math.max(0, baseObjectSlots - fusionObjectSlots - embeddedSlots - occupiedLexicalSourceSlots);
    const baseValency = baseObjectSlots + 1;
    const nonactiveValency = Math.max(0, baseValency - 1);
    const nonactiveObjectSlots = Math.max(0, valency.nonactiveSlots - fusionObjectSlots - embeddedSlots - occupiedLexicalSourceSlots);
    return {
        baseObjectSlots,
        fusionObjectSlots,
        availableObjectSlots,
        baseValency,
        nonactiveValency,
        nonactiveObjectSlots,
        directActiveObjectSlots: valency.directActiveSlots,
    };
}

function getNonactiveObjectPrefixGroups(verbMeta) {
    const summary = getVerbValencySummary(verbMeta);
    if (summary.baseObjectSlots <= 0) {
        return {
            baseSlots: summary.baseObjectSlots,
            availableSlots: summary.nonactiveObjectSlots,
            groups: [{ prefixes: [""] }],
        };
    }
    const directPrefixes = Array.from(PASSIVE_IMPERSONAL_DIRECT_OBJECTS);
    return {
        baseSlots: summary.baseObjectSlots,
        availableSlots: summary.nonactiveObjectSlots,
        groups: buildObjectPrefixGroups(directPrefixes),
    };
}

function buildDeterministicStemPairings(activeStems = [], nonactiveStems = []) {
    const unique = (values) => Array.from(new Set((values || []).filter(Boolean)));
    const active = unique(activeStems);
    const nonactive = unique(nonactiveStems);
    const activeFallback = active.length ? active : [""];
    const nonactiveFallback = nonactive.length ? nonactive : activeFallback;
    const pairCount = Math.max(activeFallback.length, nonactiveFallback.length);
    const pairs = [];
    for (let index = 0; index < pairCount; index += 1) {
        const activeStem = activeFallback[Math.min(index, activeFallback.length - 1)] || "";
        const nonactiveStem = nonactiveFallback[Math.min(index, nonactiveFallback.length - 1)] || "";
        if (!activeStem && !nonactiveStem) {
            continue;
        }
        pairs.push({
            index,
            active: activeStem,
            nonactive: nonactiveStem,
        });
    }
    return pairs;
}

function grammarPipelineParse({
    verb = "",
    modeKey = "verb",
    parsedVerb = null,
}) {
    const resolvedModeKey = modeKey || "verb";
    const resolvedParsedVerb = parsedVerb || getParsedVerbForTab(resolvedModeKey, verb || "");
    return {
        step: "parse",
        inputVerb: verb || "",
        modeKey: resolvedModeKey,
        parsedVerb: resolvedParsedVerb,
    };
}

function grammarPipelineDeriveStems({
    parsedVerb = null,
    inputVerb = "",
}) {
    const safeParsedVerb = parsedVerb || null;
    const surfaceStem = safeParsedVerb?.verb || inputVerb || "";
    const analysisStem = safeParsedVerb?.analysisVerb || surfaceStem;
    const activeStems = [surfaceStem, analysisStem].filter(Boolean);
    const nonactiveCandidates = [];
    [
        safeParsedVerb?.nonactiveStems,
        safeParsedVerb?.nonactiveAllStems,
        safeParsedVerb?.derivedNonactiveStems,
    ].forEach((candidate) => {
        if (Array.isArray(candidate)) {
            nonactiveCandidates.push(...candidate.filter(Boolean));
        }
    });
    const nonactiveStems = nonactiveCandidates.length ? nonactiveCandidates : activeStems;
    return {
        step: "derive-stems",
        activeStems: Array.from(new Set(activeStems)),
        nonactiveStems: Array.from(new Set(nonactiveStems)),
        stemPairs: buildDeterministicStemPairings(activeStems, nonactiveStems),
    };
}

function buildCanonicalGrammarState({
    parsedVerb = null,
    derivationType = "",
    voiceMode = "",
    isNonactiveMode = false,
    subject = null,
    objects = {},
}) {
    const summary = getVerbValencySummary(parsedVerb);
    const normalizedDerivationType = Object.values(DERIVATION_TYPE).includes(derivationType)
        ? derivationType
        : (parsedVerb?.derivationType || DERIVATION_TYPE.direct);
    const normalizedVoiceMode = Object.values(VOICE_MODE).includes(voiceMode)
        ? voiceMode
        : (isNonactiveMode ? VOICE_MODE.passive : VOICE_MODE.active);
    const slotsActive = getCanonicalSlotRolesForCount(summary.availableObjectSlots);
    const slotsNonactive = getCanonicalSlotRolesForCount(summary.nonactiveObjectSlots);
    const modeSlots = isNonactiveMode ? slotsNonactive : slotsActive;
    const modeValency = isNonactiveMode ? summary.nonactiveValency : summary.baseValency;
    const normalizedSubject = subject && typeof subject === "object"
        ? {
            prefix: subject.prefix || "",
            suffix: subject.suffix || "",
        }
        : { prefix: "", suffix: "" };
    const normalizedObjects = {};
    GRAMMAR_SLOT_ROLES.forEach((role) => {
        const slotId = getCanonicalSlotIdForRole(role);
        normalizedObjects[role] = objects?.[role] || objects?.[slotId] || "";
    });
    const controllerRole = getCanonicalControllerRole(normalizedDerivationType);
    return {
        derivationType: normalizedDerivationType,
        voiceMode: normalizedVoiceMode,
        valencyActive: summary.baseValency,
        valencyNonactive: summary.nonactiveValency,
        valencySummary: summary,
        slotRoles: GRAMMAR_SLOT_ROLES.map((role) => ({
            role,
            slotId: getCanonicalSlotIdForRole(role),
            isController: role === controllerRole,
            labelKey: getCanonicalRoleLabelKey(role),
        })),
        slotsActive,
        slotsNonactive,
        slotRolesOrdered: GRAMMAR_SLOT_ROLES.slice(),
        modeSlots,
        modeValency,
        subject: normalizedSubject,
        objects: normalizedObjects,
    };
}

function grammarPipelineAssignSlots({
    grammarState = null,
}) {
    const state = grammarState || buildCanonicalGrammarState({});
    const visibleRoles = Array.isArray(state.modeSlots) ? state.modeSlots : [];
    const controllerRole = getCanonicalControllerRole(state.derivationType);
    const roleModels = state.slotRoles.map((slotRole) => ({
        ...slotRole,
        isVisible: visibleRoles.includes(slotRole.role),
    }));
    const visibleSlots = roleModels.filter((slotRole) => slotRole.isVisible);
    return {
        step: "assign-slots",
        controllerRole,
        controllerSlotId: getCanonicalSlotIdForRole(controllerRole),
        roleModels,
        visibleRoles,
        visibleSlots,
        visibleSlotIds: visibleSlots.map((slotRole) => slotRole.slotId),
    };
}

function computeConstraintViolationsCore({
    subjectPrefix = "",
    subjectSuffix = "",
    controllerPrefix = "",
    shouldApplyPersonAgreement = true,
    enforceValence4Matrix = false,
    valence4Slots = null,
}) {
    const resolvedSubjectPrefix = subjectPrefix || "";
    const resolvedSubjectSuffix = subjectSuffix || "";
    const resolvedControllerPrefix = controllerPrefix || "";
    const personAgreementViolation = shouldApplyPersonAgreement
        && !!resolvedControllerPrefix
        && isPers1Obj1SamePersonAcrossNumber(
            resolvedSubjectPrefix,
            resolvedSubjectSuffix,
            resolvedControllerPrefix
        );
    const hierarchyOrderViolation = shouldApplyPersonAgreement
        && !!resolvedControllerPrefix
        && isPers1Obj1HierarchyOrderViolation(
            resolvedSubjectPrefix,
            resolvedSubjectSuffix,
            resolvedControllerPrefix
        );
    const valence4Violation = enforceValence4Matrix
        && !!valence4Slots
        && !isValidObj1Obj2Obj3Combo({
            obj1: valence4Slots.objectPrefix || "",
            obj2: valence4Slots.indirectObjectMarker || "",
            obj3: valence4Slots.thirdObjectMarker || "",
        });
    const shouldMaskByCore = personAgreementViolation || hierarchyOrderViolation || valence4Violation;
    return {
        personAgreementViolation,
        hierarchyOrderViolation,
        valence4Violation,
        shouldMaskByCore,
    };
}

function evaluateGrammarConstraintSet({
    grammarState = null,
    subjectSelection = null,
    slotValuesByRole = {},
    enforceValence4Matrix = false,
}) {
    const state = grammarState || buildCanonicalGrammarState({});
    const rawRoleValues = {
        mainline: slotValuesByRole.mainline || "",
        shuntline1: slotValuesByRole.shuntline1 || "",
        shuntline2: slotValuesByRole.shuntline2 || "",
    };
    const normalizedPair = resolveDisplayObj1Obj2({
        obj1: rawRoleValues.mainline,
        obj2: rawRoleValues.shuntline1,
        derivationType: state.derivationType,
    });
    const normalizedRoleValues = {
        ...rawRoleValues,
        mainline: normalizedPair.obj1 || "",
        shuntline1: normalizedPair.obj2 || "",
    };
    const hierarchyAdjusted = (
        normalizedRoleValues.mainline !== rawRoleValues.mainline
        || normalizedRoleValues.shuntline1 !== rawRoleValues.shuntline1
    );
    const controllerRole = getCanonicalControllerRole(state.derivationType);
    const rawControllerPrefix = rawRoleValues[controllerRole] || "";
    const controllerPriority = getDerivationControllerSlotPriority(state.derivationType);
    const roleValuesBySlotId = {
        [getCanonicalSlotIdForRole("mainline")]: rawRoleValues.mainline || "",
        [getCanonicalSlotIdForRole("shuntline1")]: rawRoleValues.shuntline1 || "",
    };
    const controllerPrefix = resolveComboValidationObj1({
        obj1: roleValuesBySlotId.object || "",
        obj2: roleValuesBySlotId.object2 || "",
        derivationType: state.derivationType,
        controllerObj1: rawControllerPrefix !== ""
            ? rawControllerPrefix
            : controllerPriority
                .map((slotId) => roleValuesBySlotId[slotId] || "")
                .find((prefix) => Boolean(prefix)) || null,
    });
    const subjectPrefix = subjectSelection?.subjectPrefix || "";
    const subjectSuffix = subjectSelection?.subjectSuffix || "";
    const constraintViolations = computeConstraintViolationsCore({
        subjectPrefix,
        subjectSuffix,
        controllerPrefix,
        shouldApplyPersonAgreement: Number(state.modeValency) >= 2,
        enforceValence4Matrix,
        valence4Slots: {
            objectPrefix: rawRoleValues.mainline,
            indirectObjectMarker: rawRoleValues.shuntline1,
            thirdObjectMarker: rawRoleValues.shuntline2,
        },
    });
    const personAgreementViolation = constraintViolations.personAgreementViolation;
    const hierarchyOrderViolation = constraintViolations.hierarchyOrderViolation;
    const valence4Violation = constraintViolations.valence4Violation;
    const violations = [];
    if (personAgreementViolation) {
        violations.push(GRAMMAR_CONSTRAINT_IDS.personAgreement);
    }
    if (hierarchyOrderViolation) {
        violations.push(GRAMMAR_CONSTRAINT_IDS.hierarchyOrder);
    }
    if (valence4Violation) {
        violations.push(GRAMMAR_CONSTRAINT_IDS.valence4Matrix);
    }
    return {
        controllerRole,
        controllerPrefix,
        rawControllerPrefix,
        rawRoleValues,
        normalizedRoleValues,
        rawSlotValuesById: mapRoleValuesToSlotIds(rawRoleValues),
        normalizedSlotValuesById: mapRoleValuesToSlotIds(normalizedRoleValues),
        hierarchyAdjusted,
        personAgreementViolation,
        hierarchyOrderViolation,
        valence4Violation,
        shouldMask: constraintViolations.shouldMaskByCore,
        maskedConstraintIds: violations,
    };
}

let VALENCE4_MASKED_COMBO_SIGNATURE_CACHE = null;

function getValence4MaskedComboSignatures() {
    if (Array.isArray(VALENCE4_MASKED_COMBO_SIGNATURE_CACHE)) {
        return VALENCE4_MASKED_COMBO_SIGNATURE_CACHE;
    }
    const mainlineCandidates = ["ki", "mu", "te", "ta"];
    const shuntlineCandidates = ["0", "mu", "te", "ta"];
    const masked = [];
    mainlineCandidates.forEach((mainline) => {
        shuntlineCandidates.forEach((shuntline1) => {
            shuntlineCandidates.forEach((shuntline2) => {
                const signature = `${mainline}|${shuntline1}|${shuntline2}`;
                if (!VALENCE4_VALID_COMBO_SIGNATURES.has(signature)) {
                    masked.push(signature);
                }
            });
        });
    });
    VALENCE4_MASKED_COMBO_SIGNATURE_CACHE = masked;
    return masked;
}

function grammarPipelineEnforceConstraints({
    grammarState = null,
}) {
    const state = grammarState || buildCanonicalGrammarState({});
    const constraintIds = [
        GRAMMAR_CONSTRAINT_IDS.personAgreement,
        GRAMMAR_CONSTRAINT_IDS.hierarchyOrder,
    ];
    if (Number(state.modeValency) >= 4) {
        constraintIds.push(GRAMMAR_CONSTRAINT_IDS.valence4Matrix);
    }
    return {
        step: "enforce-constraints",
        constraintIds,
        maskedCombos: Number(state.modeValency) >= 4
            ? getValence4MaskedComboSignatures()
            : [],
    };
}

function grammarPipelineRealizeUiConfig({
    grammarState = null,
    slotAssignment = null,
    constraintContext = null,
    isNonactiveMode = false,
    primaryTogglePrefixes = [],
    indirectTogglePrefixes = [],
}) {
    const state = grammarState || buildCanonicalGrammarState({});
    const slots = slotAssignment || grammarPipelineAssignSlots({ grammarState: state });
    const constraints = constraintContext || grammarPipelineEnforceConstraints({ grammarState: state });
    const visibleSlots = slots.visibleSlots.map((slot) => ({
        role: slot.role,
        slotId: slot.slotId,
        labelKey: slot.labelKey,
        isController: slot.isController,
    }));
    const roleOptionValues = {
        mainline: Array.from(new Set(primaryTogglePrefixes.filter((value) => value !== undefined))),
        shuntline1: Array.from(new Set(indirectTogglePrefixes.filter((value) => value !== undefined))),
        shuntline2: Array.from(new Set(indirectTogglePrefixes.filter((value) => value !== undefined))),
    };
    const viableOptionsPerSlot = {};
    visibleSlots.forEach((slot) => {
        viableOptionsPerSlot[slot.slotId] = roleOptionValues[slot.role] || [];
    });
    const defaultObjectToggles = {};
    visibleSlots.forEach((slot) => {
        const options = viableOptionsPerSlot[slot.slotId] || [];
        const preferred = getDefaultOutputToggleSelection({
            context: slot.slotId === "object" ? "verb-primary-object" : "verb-extra-object",
            values: options,
            isNonactiveMode,
        });
        defaultObjectToggles[slot.slotId] = preferred;
    });
    return {
        step: "realize-ui-config",
        visibleSlots,
        visibleSlotIds: visibleSlots.map((slot) => slot.slotId),
        defaultToggles: {
            subject: getDefaultOutputToggleSelection({ context: "verb-subject" }),
            passiveSubject: getDefaultOutputToggleSelection({ context: "verb-passive-subject" }),
            objectBySlotId: defaultObjectToggles,
        },
        viableOptionsPerSlot,
        maskedCombos: constraints.maskedCombos,
        labelValency: Number.isFinite(state.modeValency) ? state.modeValency : null,
        valencyLabelSource: isNonactiveMode ? "nonactive" : "active",
    };
}

function runVerbGrammarPipeline({
    verb = "",
    modeKey = "verb",
    parsedVerb = null,
    derivationType = "",
    voiceMode = "",
    isNonactiveMode = false,
    subject = null,
    objects = {},
    primaryTogglePrefixes = [],
    indirectTogglePrefixes = [],
    includeDiagnostics = false,
}) {
    const parseStep = grammarPipelineParse({ verb, modeKey, parsedVerb });
    const stemStep = includeDiagnostics
        ? grammarPipelineDeriveStems({
            parsedVerb: parseStep.parsedVerb,
            inputVerb: parseStep.inputVerb,
        })
        : null;
    const state = buildCanonicalGrammarState({
        parsedVerb: parseStep.parsedVerb,
        derivationType,
        voiceMode,
        isNonactiveMode,
        subject,
        objects,
    });
    const assignStep = grammarPipelineAssignSlots({ grammarState: state });
    const constraintStep = grammarPipelineEnforceConstraints({ grammarState: state });
    const uiConfigStep = grammarPipelineRealizeUiConfig({
        grammarState: state,
        slotAssignment: assignStep,
        constraintContext: constraintStep,
        isNonactiveMode,
        primaryTogglePrefixes,
        indirectTogglePrefixes,
    });
    return {
        parseStep,
        ...(includeDiagnostics ? { stemStep } : {}),
        state,
        assignStep,
        constraintStep,
        uiConfig: uiConfigStep,
    };
}

function truncateNonactiveBase(stem, options = {}) {
    const letters = splitVerbLetters(stem);
    if (!letters.length) {
        return stem;
    }
    if (isVerbLetterVowel(letters[letters.length - 1])) {
        letters.pop();
    }
    let base = letters.join("");
    if (base.endsWith("kw")) {
        base = base.slice(0, -2) + "k";
    }
    if (base.endsWith("s")) {
        base = base.slice(0, -1) + "sh";
    }
    if (options.dropFinalW && base.endsWith("w")) {
        base = base.slice(0, -1);
    }
    if (options.tzToCh && base.endsWith("tz")) {
        base = base.slice(0, -2) + "ch";
    }
    return base;
}

function isShortReplaciveOnsetBase(value) {
    const base = getNonReduplicatedRoot(value) || value || "";
    if (!base) {
        return false;
    }
    const letters = splitVerbLetters(base);
    return letters.length <= 3;
}

function buildWaOnsetVariant(stem, options = {}) {
    const letters = splitVerbLetters(stem);
    if (letters.length < 2) {
        return null;
    }
    const last = letters[letters.length - 1];
    if (!isVerbLetterVowel(last)) {
        return null;
    }
    const onsetIndex = letters.length - 2;
    const onset = letters[onsetIndex];
    if (onset === "s") {
        // Keep s->sh for wa even when short-base onset replacement is otherwise blocked.
        letters[onsetIndex] = "sh";
    } else if (onset === "t") {
        if (options.blockCh || options.blockOnsetReplacement) {
            return null;
        }
        letters[onsetIndex] = "ch";
    } else {
        return null;
    }
    return `${letters.join("")}wa`;
}

function buildNonactiveUStem(stem, lastOnset, lastNucleus, options = {}) {
    const letters = splitVerbLetters(stem);
    if (letters.length < 2) {
        return null;
    }
    const lastIndex = letters.length - 1;
    if (!isVerbLetterVowel(letters[lastIndex])) {
        return null;
    }
    if (!lastOnset) {
        return null;
    }
    const blockOnsetReplacement = options.blockOnsetReplacement === true;
    const onsetIndex = lastIndex - 1;
    if (
        lastOnset === "t"
        && (
            lastNucleus === "i"
            || (lastNucleus === "a" && options.allowFinalTaReplacement === true)
        )
    ) {
        if (!options.blockCh && !blockOnsetReplacement) {
            letters[onsetIndex] = "ch";
        }
    } else if (lastOnset === "s") {
        // Keep s->sh for u even when short-base onset replacement is otherwise blocked.
        letters[onsetIndex] = "sh";
    } else if (lastOnset === "tz") {
        if (!options.blockCh && !blockOnsetReplacement) {
            letters[onsetIndex] = "ch";
        }
    } else if (lastOnset === "kw" && lastNucleus === "i") {
        // If kw is preceded by a consonant (i.e. kw is part of a larger cluster like j+k+w),
        // we don't form a -u nonactive at all for this path (e.g. -majkwi should not yield majku/majkwu).
        const prevLetter = letters[onsetIndex - 1] || "";
        if (isVerbLetterConsonant(prevLetter)) {
            return null;
        }
        letters[onsetIndex] = "k";
    }
    letters[lastIndex] = "u";
    return letters.join("");
}

function buildNonactiveUwaStem(stem, lastOnset, lastNucleus, options = {}) {
    const letters = splitVerbLetters(stem);
    if (letters.length < 2) {
        return null;
    }
    const lastIndex = letters.length - 1;
    if (!isVerbLetterVowel(letters[lastIndex])) {
        return null;
    }
    if (!lastOnset) {
        return null;
    }
    const blockOnsetReplacement = options.blockOnsetReplacement === true;
    const onsetIndex = lastIndex - 1;
    if (lastOnset === "w") {
        letters.splice(onsetIndex, 2);
    } else {
        if (lastOnset === "s") {
            // Keep s->sh for uwa even when short-base onset replacement is otherwise blocked.
            letters[onsetIndex] = "sh";
        } else if (lastOnset === "tz") {
            if (!options.blockCh && !blockOnsetReplacement) {
                letters[onsetIndex] = "ch";
            }
        } else if (lastOnset === "t") {
            if (!options.blockCh && !blockOnsetReplacement) {
                letters[onsetIndex] = "ch";
            }
        }
        letters.splice(lastIndex, 1);
    }
    return `${letters.join("")}uwa`;
}


function getNonactiveBaseInfo(ruleBase) {
    const letters = splitVerbLetters(ruleBase);
    const letterCount = letters.length;
    const last = letters[letterCount - 1] || "";
    const prev = letters[letterCount - 2] || "";
    const prev2 = letters[letterCount - 3] || "";
    const prevVowel = getPreviousVowel(letters, letterCount - 3);
    const endsWithA = last === "a";
    const endsWithE = last === "e";
    const endsWithI = last === "i";
    const endsWithU = last === "u";
    const endsWithYa = ruleBase.endsWith("ya");
    const endsWithTa = ruleBase.endsWith("ta");
    const endsWithTi = ruleBase.endsWith("ti");
    const endsWithTV = isVerbLetterVowel(last) && prev === "t";
    const endsWithNa = ruleBase.endsWith("na");
    const endsWithSa = ruleBase.endsWith("sa");
    const isClassC = endsWithAny(ruleBase, IA_UA_SUFFIXES);
    const endsWithKwi = ruleBase.endsWith("kwi");
    const endsWithTzi = ruleBase.endsWith("tzi");
    const endsWithSi = ruleBase.endsWith("si");
    const endsWithMi = ruleBase.endsWith("mi");
    const endsWithNi = ruleBase.endsWith("ni");
    const endsWithWi = ruleBase.endsWith("wi");
    const endsWithJsA = endsWithA && prev === "s" && prev2 === "j";
    const endsWithMV = prev === "m" && (endsWithA || endsWithI);
    const endsWithTzV = isVerbLetterVowel(last) && prev === "tz";
    const endsWithChi = endsWithI && prev === "ch";
    const hasMultipleTz = ruleBase.indexOf("tz") !== ruleBase.lastIndexOf("tz");
    const syllables = getSyllables(ruleBase, { analysis: true, assumeFinalV: true });
    const syllableCount = syllables.length;
    const lastSyllable = syllables[syllableCount - 1] || null;
    const penultimateSyllable = syllables[syllableCount - 2] || null;
    const lastNucleus = lastSyllable?.nucleus || "";
    const lastOnset = lastSyllable?.onset || "";
    const penultimateNucleus = penultimateSyllable?.nucleus || "";
    const penultimateCoda = penultimateSyllable?.coda || "";
    const penultimateHasCoda = Boolean(penultimateCoda);
    const preTiConsonant = endsWithTi && isVerbLetterConsonant(prev2);
    const endsWithNucleusI = lastNucleus === "i";
    const endsWithNucleusA = lastNucleus === "a";
    const endsWithNucleusU = lastNucleus === "u";
    const nonRedupRoot = getNonReduplicatedRoot(ruleBase);
    const nonRedupSyllableCount = nonRedupRoot
        ? getSyllables(nonRedupRoot, { analysis: true, assumeFinalV: true }).length
        : 0;
    const isVowelMonosyllable = letterCount === 1 && isVerbLetterVowel(last);
    return {
        letterCount,
        last,
        prev,
        prev2,
        prevVowel,
        endsWithA,
        endsWithE,
        endsWithI,
        endsWithU,
        endsWithYa,
        endsWithTa,
        endsWithTi,
        endsWithTV,
        endsWithNa,
        endsWithSa,
        isClassC,
        endsWithKwi,
        endsWithTzi,
        endsWithSi,
        endsWithMi,
        endsWithNi,
        endsWithWi,
        endsWithJsA,
        endsWithMV,
        endsWithTzV,
        endsWithChi,
        hasMultipleTz,
        lastNucleus,
        lastOnset,
        penultimateNucleus,
        penultimateHasCoda,
        preTiConsonant,
        endsWithNucleusI,
        endsWithNucleusA,
        endsWithNucleusU,
        syllableCount,
        nonRedupSyllableCount,
        isVowelMonosyllable,
    };
}

function formatDerivationRightEdgeProfile(syllables = []) {
    const safeSyllables = Array.isArray(syllables) ? syllables.filter(Boolean) : [];
    if (typeof formatPretRightEdgeProfile === "function") {
        return formatPretRightEdgeProfile(safeSyllables);
    }
    return safeSyllables.map((syllable) => syllable?.form || "").filter(Boolean).join("|");
}

function formatDerivationJuncture(syllables = []) {
    const safeSyllables = Array.isArray(syllables) ? syllables.filter(Boolean) : [];
    if (typeof formatPretJuncture === "function") {
        return formatPretJuncture(safeSyllables);
    }
    return safeSyllables.slice(-2).map((syllable) => syllable?.form || "").filter(Boolean).join("|");
}

function formatDerivationEndingFamily(lastSyllable = null) {
    if (typeof formatPretEndingFamily === "function") {
        return formatPretEndingFamily(lastSyllable);
    }
    return `${lastSyllable?.onset || "Ø"}+${lastSyllable?.nucleus || "*"}`;
}

function freezeDerivationModifierList(list = []) {
    return Object.freeze(Array.isArray(list) ? list.filter(Boolean) : []);
}

function buildOrderedDerivationDescriptor({
    rightEdgeProfile = "",
    juncture = "",
    endingFamily = "",
    previousSyllableForm = "",
    previousSyllableOnset = "",
    previousSyllableNucleus = "",
    previousCoda = "",
    previousHasCoda = false,
    finalForm = "",
    finalOnset = "",
    finalNucleus = "",
    rightmostPreFinalCoda = "",
    preFinalSegment = "",
    preFinalIsConsonant = false,
    firstOnset = "",
    modifiers = [],
    ruleBase = "",
    syllableCount = 0,
    nonRedupSyllableCount = 0,
    extraFields = {},
} = {}) {
    return Object.freeze({
        rightEdgeProfile,
        juncture,
        endingFamily,
        previousSyllableForm,
        previousSyllableOnset,
        previousSyllableNucleus,
        previousCoda,
        previousHasCoda,
        finalForm,
        finalOnset,
        finalNucleus,
        rightmostPreFinalCoda,
        preFinalSegment,
        preFinalIsConsonant,
        firstOnset,
        modifiers: freezeDerivationModifierList(modifiers),
        ruleBase,
        syllableCount,
        nonRedupSyllableCount,
        ...(extraFields && typeof extraFields === "object" ? extraFields : {}),
    });
}

function buildOrderedDerivationDescriptorQuery({
    rightEdgeProfiles = [],
    junctures = [],
    endingFamily = "",
    endingFamilies = [],
    previousSyllableForms = [],
    previousSyllableForm = "",
    previousSyllableOnset,
    previousSyllableNucleus,
    previousHasCoda,
    finalOnset,
    finalNucleus,
    firstOnset,
    tiCausativeClasses = [],
    tiCausativeClass = "",
    modifiers = [],
    excludeModifiers = [],
} = {}) {
    const query = {};
    if (rightEdgeProfiles.length) {
        query.rightEdgeProfiles = Object.freeze(rightEdgeProfiles.filter(Boolean));
    }
    if (junctures.length) {
        query.junctures = Object.freeze(junctures.filter(Boolean));
    }
    if (endingFamily) {
        query.endingFamily = endingFamily;
    }
    if (endingFamilies.length) {
        query.endingFamilies = Object.freeze(endingFamilies.filter(Boolean));
    }
    if (previousSyllableForm) {
        query.previousSyllableForm = previousSyllableForm;
    }
    if (previousSyllableForms.length) {
        query.previousSyllableForms = Object.freeze(previousSyllableForms.filter(Boolean));
    }
    if (typeof previousSyllableOnset === "string") {
        query.previousSyllableOnset = previousSyllableOnset;
    }
    if (typeof previousSyllableNucleus === "string") {
        query.previousSyllableNucleus = previousSyllableNucleus;
    }
    if (typeof previousHasCoda === "boolean") {
        query.previousHasCoda = previousHasCoda;
    }
    if (typeof finalOnset === "string") {
        query.finalOnset = finalOnset;
    }
    if (typeof finalNucleus === "string") {
        query.finalNucleus = finalNucleus;
    }
    if (typeof firstOnset === "string") {
        query.firstOnset = firstOnset;
    }
    if (tiCausativeClass) {
        query.tiCausativeClass = tiCausativeClass;
    }
    if (tiCausativeClasses.length) {
        query.tiCausativeClasses = Object.freeze(tiCausativeClasses.filter(Boolean));
    }
    if (modifiers.length) {
        query.modifiers = Object.freeze(modifiers.filter(Boolean));
    }
    if (excludeModifiers.length) {
        query.excludeModifiers = Object.freeze(excludeModifiers.filter(Boolean));
    }
    return Object.freeze(query);
}

function buildOrderedDerivationNonactiveSourceDescriptor({
    rightEdgeProfile = "",
    juncture = "",
    endingFamily = "",
    nonactiveFamily = "",
    deleteBehavior = "",
    finalOnset = "",
    finalNucleus = "",
    stem = "",
    stemDescriptor = null,
} = {}) {
    return Object.freeze({
        rightEdgeProfile,
        juncture,
        endingFamily,
        nonactiveFamily,
        deleteBehavior,
        finalOnset,
        finalNucleus,
        stem,
        stemDescriptor,
    });
}

function normalizeDerivationDescriptorQuery(query = {}) {
    if (!query || typeof query !== "object") {
        return Object.freeze({});
    }
    return buildOrderedDerivationDescriptorQuery({
        rightEdgeProfiles: Array.isArray(query.rightEdgeProfiles)
            ? query.rightEdgeProfiles
            : (query.rightEdgeProfile ? [query.rightEdgeProfile] : []),
        junctures: Array.isArray(query.junctures)
            ? query.junctures
            : (query.juncture ? [query.juncture] : []),
        endingFamily: query.endingFamily || "",
        endingFamilies: Array.isArray(query.endingFamilies) ? query.endingFamilies : [],
        previousSyllableForm: query.previousSyllableForm || "",
        previousSyllableForms: Array.isArray(query.previousSyllableForms)
            ? query.previousSyllableForms
            : [],
        previousSyllableOnset: query.previousSyllableOnset,
        previousSyllableNucleus: query.previousSyllableNucleus,
        previousHasCoda: query.previousHasCoda,
        finalOnset: query.finalOnset,
        finalNucleus: query.finalNucleus,
        firstOnset: query.firstOnset,
        tiCausativeClass: query.tiCausativeClass || "",
        tiCausativeClasses: Array.isArray(query.tiCausativeClasses)
            ? query.tiCausativeClasses
            : [],
        modifiers: Array.isArray(query.modifiers) ? query.modifiers : [],
        excludeModifiers: Array.isArray(query.excludeModifiers) ? query.excludeModifiers : [],
    });
}

function buildDerivationDescriptor(ruleBase, options = {}) {
    const normalizedRuleBase = normalizeRuleBase(ruleBase || "");
    const letters = splitVerbLetters(normalizedRuleBase);
    const syllables = getSyllables(normalizedRuleBase, { analysis: true, assumeFinalV: true });
    const safeSyllables = Array.isArray(syllables) ? syllables.filter(Boolean) : [];
    const nonRedupRoot = getNonReduplicatedRoot(normalizedRuleBase);
    const nonRedupSyllables = nonRedupRoot
        ? getSyllables(nonRedupRoot, { analysis: true, assumeFinalV: true })
        : [];
    const lastSyllable = safeSyllables[safeSyllables.length - 1] || null;
    const previousSyllable = safeSyllables[safeSyllables.length - 2] || null;
    const firstSyllableWithOnset = safeSyllables.find((syllable) => syllable?.onset) || null;
    let rightmostPreFinalCoda = "";
    for (let index = safeSyllables.length - 2; index >= 0; index -= 1) {
        if (safeSyllables[index]?.coda) {
            rightmostPreFinalCoda = safeSyllables[index].coda;
            break;
        }
    }
    const modifiers = [];
    if (options.isTransitive === true) {
        modifiers.push("transitive");
    }
    if (options.isIntransitive === true) {
        modifiers.push("intransitive");
    }
    if (options.isRootPlusYa === true) {
        modifiers.push("rootPlusYa");
    }
    if (safeSyllables.length <= 1) {
        modifiers.push("monosyllable");
    }
    if (previousSyllable?.coda) {
        modifiers.push("previousClosed");
    } else if (previousSyllable) {
        modifiers.push("previousOpen");
    }
    if (Array.isArray(options.extraModifiers)) {
        options.extraModifiers.filter(Boolean).forEach((modifier) => modifiers.push(modifier));
    }
    return buildOrderedDerivationDescriptor({
        rightEdgeProfile: formatDerivationRightEdgeProfile(safeSyllables),
        juncture: formatDerivationJuncture(safeSyllables),
        endingFamily: formatDerivationEndingFamily(lastSyllable),
        previousSyllableForm: previousSyllable?.form || "",
        previousSyllableOnset: previousSyllable?.onset || "",
        previousSyllableNucleus: previousSyllable?.nucleus || "",
        previousCoda: previousSyllable?.coda || "",
        previousHasCoda: Boolean(previousSyllable?.coda),
        rightmostPreFinalCoda,
        finalForm: lastSyllable?.form || "",
        finalOnset: lastSyllable?.onset || "",
        finalNucleus: lastSyllable?.nucleus || "",
        preFinalSegment: letters[letters.length - 3] || "",
        preFinalIsConsonant: isVerbLetterConsonant(letters[letters.length - 3] || ""),
        firstOnset: firstSyllableWithOnset?.onset || "",
        modifiers,
        ruleBase: normalizedRuleBase,
        syllableCount: safeSyllables.length,
        nonRedupSyllableCount: Array.isArray(nonRedupSyllables) ? nonRedupSyllables.length : 0,
        extraFields: options.extraFields,
    });
}

function buildCausativeDescriptor(ruleBase, options = {}) {
    const tiCausativeClass = options.tiCausativeClass || "";
    const extraModifiers = [];
    if (options.isSlashMatrixTiInput === true) {
        extraModifiers.push("slashMatrixTi");
    }
    if (tiCausativeClass) {
        extraModifiers.push(`tiSubclass=${tiCausativeClass}`);
    }
    return buildDerivationDescriptor(ruleBase, {
        ...options,
        extraModifiers,
        extraFields: {
            tiCausativeClass,
        },
    });
}

function derivationDescriptorMatches(descriptor, query = {}) {
    if (!descriptor || !query || typeof query !== "object") {
        return false;
    }
    const orderedQuery = normalizeDerivationDescriptorQuery(query);
    const endingFamilies = Array.isArray(orderedQuery.endingFamilies)
        ? orderedQuery.endingFamilies
        : (orderedQuery.endingFamily ? [orderedQuery.endingFamily] : []);
    if (endingFamilies.length && !endingFamilies.includes(descriptor.endingFamily)) {
        return false;
    }
    const rightEdgeProfiles = Array.isArray(orderedQuery.rightEdgeProfiles)
        ? orderedQuery.rightEdgeProfiles
        : (orderedQuery.rightEdgeProfile ? [orderedQuery.rightEdgeProfile] : []);
    if (rightEdgeProfiles.length && !rightEdgeProfiles.includes(descriptor.rightEdgeProfile)) {
        return false;
    }
    const junctures = Array.isArray(orderedQuery.junctures)
        ? orderedQuery.junctures
        : (orderedQuery.juncture ? [orderedQuery.juncture] : []);
    if (junctures.length && !junctures.includes(descriptor.juncture)) {
        return false;
    }
    const previousForms = Array.isArray(orderedQuery.previousSyllableForms)
        ? orderedQuery.previousSyllableForms
        : (orderedQuery.previousSyllableForm ? [orderedQuery.previousSyllableForm] : []);
    if (previousForms.length && !previousForms.includes(descriptor.previousSyllableForm)) {
        return false;
    }
    if (Object.prototype.hasOwnProperty.call(orderedQuery, "previousSyllableNucleus")
        && descriptor.previousSyllableNucleus !== orderedQuery.previousSyllableNucleus) {
        return false;
    }
    if (Object.prototype.hasOwnProperty.call(orderedQuery, "previousSyllableOnset")
        && descriptor.previousSyllableOnset !== orderedQuery.previousSyllableOnset) {
        return false;
    }
    if (Object.prototype.hasOwnProperty.call(orderedQuery, "previousHasCoda")
        && descriptor.previousHasCoda !== Boolean(orderedQuery.previousHasCoda)) {
        return false;
    }
    if (Object.prototype.hasOwnProperty.call(orderedQuery, "finalOnset")
        && descriptor.finalOnset !== orderedQuery.finalOnset) {
        return false;
    }
    if (Object.prototype.hasOwnProperty.call(orderedQuery, "finalNucleus")
        && descriptor.finalNucleus !== orderedQuery.finalNucleus) {
        return false;
    }
    if (Object.prototype.hasOwnProperty.call(orderedQuery, "firstOnset")
        && descriptor.firstOnset !== orderedQuery.firstOnset) {
        return false;
    }
    const tiCausativeClasses = Array.isArray(orderedQuery.tiCausativeClasses)
        ? orderedQuery.tiCausativeClasses
        : (orderedQuery.tiCausativeClass ? [orderedQuery.tiCausativeClass] : []);
    if (tiCausativeClasses.length && !tiCausativeClasses.includes(descriptor.tiCausativeClass || "")) {
        return false;
    }
    const descriptorModifiers = Array.isArray(descriptor.modifiers) ? descriptor.modifiers : [];
    if (Array.isArray(orderedQuery.modifiers) && orderedQuery.modifiers.length) {
        if (!orderedQuery.modifiers.every((modifier) => descriptorModifiers.includes(modifier))) {
            return false;
        }
    }
    if (Array.isArray(orderedQuery.excludeModifiers) && orderedQuery.excludeModifiers.length) {
        if (orderedQuery.excludeModifiers.some((modifier) => descriptorModifiers.includes(modifier))) {
            return false;
        }
    }
    return true;
}

function causativeDescriptorMatches(descriptor, query = {}) {
    return derivationDescriptorMatches(descriptor, query);
}

function createDerivationDescriptorMatcher(descriptor, matchFn = derivationDescriptorMatches) {
    return Object.freeze({
        descriptor,
        has(query = {}) {
            return matchFn(descriptor, query);
        },
        hasAny(queries = []) {
            return (Array.isArray(queries) ? queries : []).some((query) => (
                matchFn(descriptor, query)
            ));
        },
    });
}

function createCausativeDescriptorMatcher(descriptor) {
    return createDerivationDescriptorMatcher(descriptor, causativeDescriptorMatches);
}

function getDerivationNonactiveDeleteBehavior(nonactiveFamily = "") {
    if (nonactiveFamily === "lu") {
        return "drop-final-u";
    }
    if (["wa", "u", "uwa"].includes(nonactiveFamily)) {
        return "strip-nonactive-family";
    }
    return "keep";
}

function buildDerivationNonactiveSourceDescriptor(option = {}, context = {}, descriptorBuilder = buildDerivationDescriptor) {
    const nonactiveFamily = String(option?.suffix || "");
    const stem = normalizeRuleBase(
        realizeMorphStemSpec(option?.stemSpec, option?.stem || "")
    );
    const stemDescriptor = stem
        ? descriptorBuilder(stem, {
            isTransitive: context.isTransitive === true,
            isIntransitive: context.isIntransitive === true,
        })
        : null;
    const deleteBehavior = getDerivationNonactiveDeleteBehavior(nonactiveFamily);
    return buildOrderedDerivationNonactiveSourceDescriptor({
        rightEdgeProfile: stemDescriptor?.rightEdgeProfile || "",
        juncture: stemDescriptor?.juncture || "",
        endingFamily: stemDescriptor?.endingFamily || "",
        nonactiveFamily,
        deleteBehavior,
        finalOnset: stemDescriptor?.finalOnset || "",
        finalNucleus: stemDescriptor?.finalNucleus || "",
        stem,
        stemDescriptor,
    });
}

function buildCausativeNonactiveSourceDescriptor(option = {}, context = {}) {
    return buildDerivationNonactiveSourceDescriptor(option, context, buildCausativeDescriptor);
}

function derivationNonactiveSourceMatches(descriptor, query = {}, descriptorMatchFn = derivationDescriptorMatches) {
    if (!descriptor || !query || typeof query !== "object") {
        return false;
    }
    const nonactiveFamilies = Array.isArray(query.nonactiveFamilies)
        ? query.nonactiveFamilies
        : (query.nonactiveFamily ? [query.nonactiveFamily] : []);
    if (nonactiveFamilies.length && !nonactiveFamilies.includes(descriptor.nonactiveFamily)) {
        return false;
    }
    const deleteBehaviors = Array.isArray(query.deleteBehaviors)
        ? query.deleteBehaviors
        : (query.deleteBehavior ? [query.deleteBehavior] : []);
    if (deleteBehaviors.length && !deleteBehaviors.includes(descriptor.deleteBehavior)) {
        return false;
    }
    if (!descriptorMatchFn(descriptor.stemDescriptor, query)) {
        return false;
    }
    return true;
}

function causativeNonactiveSourceMatches(descriptor, query = {}) {
    return derivationNonactiveSourceMatches(descriptor, query, causativeDescriptorMatches);
}

function createDerivationNonactiveSourceMatcher(
    descriptor,
    sourceMatchFn = derivationNonactiveSourceMatches,
) {
    return Object.freeze({
        descriptor,
        has(query = {}) {
            return sourceMatchFn(descriptor, query);
        },
        hasAny(queries = []) {
            return (Array.isArray(queries) ? queries : []).some((query) => (
                sourceMatchFn(descriptor, query)
            ));
        },
    });
}

function createCausativeNonactiveSourceMatcher(descriptor) {
    return createDerivationNonactiveSourceMatcher(descriptor, causativeNonactiveSourceMatches);
}

function annotateDerivationNonactiveOption(
    option = {},
    context = {},
    buildSourceDescriptor = buildDerivationNonactiveSourceDescriptor,
    createMatcher = createDerivationNonactiveSourceMatcher,
) {
    const sourceDescriptor = buildSourceDescriptor(option, context);
    return {
        ...option,
        sourceDescriptor,
        sourcePattern: createMatcher(sourceDescriptor),
    };
}

function annotateCausativeNonactiveOption(option = {}, context = {}) {
    return annotateDerivationNonactiveOption(
        option,
        context,
        buildCausativeNonactiveSourceDescriptor,
        createCausativeNonactiveSourceMatcher,
    );
}

function buildApplicativeDescriptor(ruleBase, options = {}) {
    const normalizedRuleBase = normalizeRuleBase(ruleBase || "");
    const classCFamily = endsWithAny(normalizedRuleBase, IA_UA_SUFFIXES)
        ? (normalizedRuleBase.endsWith("ua") ? "ua" : "ia")
        : "";
    const extraModifiers = [];
    if (classCFamily) {
        extraModifiers.push("classC");
    }
    if (normalizedRuleBase.endsWith("ya")) {
        extraModifiers.push("finalYa");
    }
    return buildDerivationDescriptor(normalizedRuleBase, {
        isTransitive: options.isTransitive === true,
        isIntransitive: options.isIntransitive === true,
        isRootPlusYa: options.isRootPlusYa === true,
        extraModifiers,
        extraFields: {
            classCFamily,
        },
    });
}

function applicativeDescriptorMatches(descriptor, query = {}) {
    if (!descriptor || !query || typeof query !== "object") {
        return false;
    }
    const classCFamilies = Array.isArray(query.classCFamilies)
        ? query.classCFamilies
        : (query.classCFamily ? [query.classCFamily] : []);
    if (classCFamilies.length && !classCFamilies.includes(descriptor.classCFamily || "")) {
        return false;
    }
    return derivationDescriptorMatches(descriptor, query);
}

function createApplicativeDescriptorMatcher(descriptor) {
    return createDerivationDescriptorMatcher(descriptor, applicativeDescriptorMatches);
}

function buildApplicativeNonactiveSourceDescriptor(option = {}, context = {}) {
    return buildDerivationNonactiveSourceDescriptor(option, context, buildApplicativeDescriptor);
}

function applicativeNonactiveSourceMatches(descriptor, query = {}) {
    return derivationNonactiveSourceMatches(descriptor, query, applicativeDescriptorMatches);
}

function createApplicativeNonactiveSourceMatcher(descriptor) {
    return createDerivationNonactiveSourceMatcher(descriptor, applicativeNonactiveSourceMatches);
}

function annotateApplicativeNonactiveOption(option = {}, context = {}) {
    return annotateDerivationNonactiveOption(
        option,
        context,
        buildApplicativeNonactiveSourceDescriptor,
        createApplicativeNonactiveSourceMatcher,
    );
}

function getNonactiveCandidateParts(info) {
    const {
        lastOnset,
        prev,
        prev2,
        penultimateHasCoda,
        penultimateNucleus,
        endsWithNucleusA,
        endsWithNucleusI,
        syllableCount,
        nonRedupSyllableCount,
    } = info;
    const isMonosyllable = syllableCount === 1 || nonRedupSyllableCount === 1;
    const blockUForWaWi = lastOnset === "w"
        && (endsWithNucleusA || endsWithNucleusI)
        && penultimateHasCoda;
    const blockUwaForPenultimateU = lastOnset === "w"
        && (endsWithNucleusA || endsWithNucleusI)
        && penultimateNucleus === "u";
    const blockUwaForPenultimateOnset = lastOnset === "w"
        && (endsWithNucleusA || endsWithNucleusI)
        && isVerbLetterConsonant(prev2);
    const blockUwaForCoda = penultimateHasCoda
        && (lastOnset === "tz" || lastOnset === "t");
    const allowUwaFromT = lastOnset === "t" && (endsWithNucleusA || endsWithNucleusI);
    const allowUFromKNS = ["k", "n", "s"].includes(lastOnset) && (endsWithNucleusA || endsWithNucleusI);
    const allowUFromM = lastOnset === "m" && endsWithNucleusI;
    // For kw+i, a preceding coda creates a larger consonant cluster (e.g. -majkwi),
    // and we don't allow the -u nonactive on this path.
    const allowUFromKwI = lastOnset === "kw" && endsWithNucleusI && !penultimateHasCoda;
    const allowUFromT = lastOnset === "t" && endsWithNucleusI;
    const allowUFromTz = lastOnset === "tz" && endsWithNucleusA;
    const allowUFromTTa = lastOnset === "t" && endsWithNucleusA && prev === "t" && prev2 === "t";
    return {
        isMonosyllable,
        blockUForWaWi,
        blockUwaForPenultimateU,
        blockUwaForPenultimateOnset,
        blockUwaForCoda,
        allowUwaFromT,
        allowUFromKNS,
        allowUFromM,
        allowUFromKwI,
        allowUFromT,
        allowUFromTz,
        allowUFromTTa,
    };
}

function getPreviousVowel(letters, startIndex) {
    for (let i = Math.min(startIndex, letters.length - 1); i >= 0; i -= 1) {
        if (isVerbLetterVowel(letters[i])) {
            return letters[i];
        }
    }
    return "";
}

function stripLeadingPrefixes(stem, prefixes) {
    if (!stem || !prefixes.length) {
        return stem;
    }
    let result = stem;
    prefixes.forEach((prefix) => {
        if (result.startsWith(prefix)) {
            result = result.slice(prefix.length);
        }
    });
    return result;
}

function getEmbeddedVerbPrefix(parsedVerb) {
    if (!parsedVerb) {
        return "";
    }
    const structuralCorePrefixParts = Array.isArray(parsedVerb?.coreStructuralPrefixParts)
        ? parsedVerb.coreStructuralPrefixParts
        : (
            Array.isArray(parsedVerb?.canonical?.coreStructuralPrefixParts)
                ? parsedVerb.canonical.coreStructuralPrefixParts
                : null
        );
    if (Array.isArray(structuralCorePrefixParts)) {
        const structuralAdjacentEmbed = structuralCorePrefixParts.find((piece) => (
            piece?.type === "adjacent-embed" && piece?.value
        ));
        return structuralAdjacentEmbed
            ? String(structuralAdjacentEmbed.value || "")
            : "";
    }
    const parseLanguage = String(
        parsedVerb.parseLanguage
        || parsedVerb.inputLanguage
        || parsedVerb.canonical?.parseLanguage
        || parsedVerb.canonical?.inputLanguage
        || ""
    );
    const canonicalEmbeddedPrefix = String(
        parsedVerb.embeddedPrefix
        || (parsedVerb.canonical && parsedVerb.canonical.embeddedPrefix)
        || ""
    );
    const canonicalSourcePrefix = String(
        parsedVerb.sourcePrefix
        || (parsedVerb.canonical && parsedVerb.canonical.sourcePrefix)
        || ""
    );
    if (
        parseLanguage === "current-regex"
        && !parsedVerb.hasSuffixSeparator
        && !parsedVerb.hasBoundMarker
        && canonicalSourcePrefix
        && canonicalEmbeddedPrefix === canonicalSourcePrefix
    ) {
        return "";
    }
    if (canonicalEmbeddedPrefix) {
        return canonicalEmbeddedPrefix;
    }
    if (!parsedVerb.hasSuffixSeparator && !parsedVerb.hasCompoundMarker) {
        return "";
    }
    if (parsedVerb.hasBoundMarker) {
        return "";
    }
    if (Array.isArray(parsedVerb.parts) && parsedVerb.parts.length) {
        return getEmbeddedVerbPrefixFromParts(parsedVerb.parts);
    }
    if (!parsedVerb.verbSegment) {
        return "";
    }
    const parts = parsedVerb.verbSegment.split(COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
    return getEmbeddedVerbPrefixFromParts(parts);
}

function stripDirectionalPrefixFromStem(stem, directionalPrefix = "") {
    if (!directionalPrefix || typeof stem !== "string") {
        return stem;
    }
    return stem.startsWith(directionalPrefix)
        ? stem.slice(directionalPrefix.length)
        : stem;
}

function selectDerivedStemEntry(stemEntries, fallbackStem = "", directionalPrefix = "") {
    const preferredEntry = (Array.isArray(stemEntries) ? stemEntries : [])
        .find((entry) => entry?.preferred);
    const selectedEntry = preferredEntry || (Array.isArray(stemEntries) ? stemEntries[0] : null);
    const selectedStem = selectedEntry ? selectedEntry.surfaceStem : (fallbackStem || "");
    const baseSelectedStem = selectedEntry ? selectedEntry.baseStem : selectedStem;
    const analysisStem = stripDirectionalPrefixFromStem(baseSelectedStem, directionalPrefix);
    return {
        selectedStem,
        analysisStem,
        selectedMeta: selectedEntry || null,
    };
}

function resolveDerivedStemList(candidateList, fallbackStem = "") {
    if (Array.isArray(candidateList) && candidateList.length) {
        return candidateList;
    }
    return [fallbackStem];
}

function buildDerivedStemSelection({
    options = [],
    prefix = "",
    embeddedPrefix = "",
    directionalPrefix = "",
    fallbackStem = "",
}) {
    const stemEntries = (Array.isArray(options) ? options : []).map((option) => {
        const stemValue = realizeMorphStemSpec(option?.stemSpec, option?.stem || "");
        const skipSourcePrefix = Boolean(
            prefix
            && option?.skipSourcePrefixIfPresent
            && stemValue.startsWith(prefix)
        );
        const baseStem = prefix && !skipSourcePrefix ? `${prefix}${stemValue}` : stemValue;
        const surfaceStem = applyEmbeddedPrefixToStem(baseStem, embeddedPrefix, directionalPrefix);
        return {
            baseStem,
            surfaceStem,
            preferred: option.preferred === true,
            rule: String(option?.rule || ""),
            patternType: String(option?.type || ""),
            causativeTrace: option?.causativeTrace || null,
            guidanceRoute: option?.guidanceRoute || null,
            stemSpec: option?.stemSpec || buildLiteralMorphStemSpec(stemValue),
        };
    });
    const allStems = stemEntries.map((entry) => entry.surfaceStem);
    const allStemSpecs = stemEntries.map((entry) => (
        entry.stemSpec || buildLiteralMorphStemSpec(entry.baseStem)
    )).filter(Boolean);
    const selected = selectDerivedStemEntry(stemEntries, fallbackStem, directionalPrefix);
    return {
        allStems,
        allStemSpecs,
        selectedStem: selected.selectedStem,
        analysisStem: selected.analysisStem,
        selectedStemSpec: selected.selectedMeta?.stemSpec || null,
        selectedMeta: selected.selectedMeta || null,
    };
}

function getFirstAvailableEntry(entries = [], selectedValue = "", key = "tenseValue") {
    const selectedEntry = entries.find((entry) => entry?.[key] === selectedValue);
    if (selectedEntry && resolveTenseAvailabilityIsAvailable(selectedEntry) === true) {
        return selectedEntry;
    }
    return entries.find((entry) => resolveTenseAvailabilityIsAvailable(entry) === true) || null;
}

function uniqueNonEmptyValues(values = []) {
    return Array.from(new Set((values || []).filter(Boolean)));
}

function applyEmbeddedPrefixToStem(stem, embeddedPrefix, directionalPrefix = "") {
    if (!embeddedPrefix || !stem) {
        return stem;
    }
    if (stem.startsWith(embeddedPrefix)) {
        return stem;
    }
    if (directionalPrefix && stem.startsWith(directionalPrefix)) {
        return `${directionalPrefix}${embeddedPrefix}${stem.slice(directionalPrefix.length)}`;
    }
    return `${embeddedPrefix}${stem}`;
}

function deriveNonactiveStem(verb, analysisVerb, options = {}) {
    const sourceContext = buildNonactiveRuleSourceContext(verb, analysisVerb, options);
    const source = sourceContext.sourceStem || normalizeDerivationStemValue(verb || analysisVerb || "");
    const analysisSource = sourceContext.analysisStem || source;
    const ruleBase = sourceContext.ruleBase;
    if (!ruleBase || !VOWEL_END_RE.test(ruleBase)) {
        return source;
    }
    const optionsList = getVisibleNonactiveDerivationOptions(source, analysisSource, {
        isTransitive: options.isTransitive === true,
        isYawi: options.isYawi === true,
        ruleBase,
        rootPlusYaBase: options.rootPlusYaBase,
        nonactiveRuleSource: sourceContext,
    });
    if (!optionsList || !optionsList.length) {
        return source;
    }
    const selectedSuffix = getDefaultNonactiveSuffix(optionsList);
    if (selectedSuffix) {
        const optionMap = buildNonactiveOptionMap(optionsList);
        const stems = optionMap.get(selectedSuffix) || [];
        if (stems.length) {
            return stems[0];
        }
    }
    return optionsList[0].stem || source;
}

function getDefaultNonactiveSuffix(options) {
    const available = new Set(options.map((option) => option.suffix));
    return NONACTIVE_SUFFIX_ORDER.find((suffix) => available.has(suffix)) || null;
}

function getPatientivoStemFromNonactive(stem, suffix, options = {}) {
    if (!stem || !suffix) {
        return [];
    }
    const normalizedSuffix = normalizePatientivoSourceSuffix(suffix);
    const sourceSuffixContract = getPatientivoNonactiveSourceSuffixContract(normalizedSuffix);
    if (!sourceSuffixContract) {
        return [];
    }
    const sourceStemSpec = (
        options.stemSpec
        && typeof options.stemSpec === "object"
        && options.stemSpec.kind
    ) ? options.stemSpec : null;
    const baseInfo = options.baseInfo || null;
    const normalizedStem = normalizeDerivationStemValue(stem);
    const routeSourceBase = normalizeDerivationStemValue(sourceStemSpec?.sourceBase || "");
    const routeSourceSuffix = normalizePatientivoSourceSuffix(sourceStemSpec?.sourceSuffix || "");
    const buildVariantEntry = (stemSpec, fallbackStem, subjectSuffix, metadata = null) => {
        const resolvedStemSpec = (
            stemSpec
            && typeof stemSpec === "object"
            && stemSpec.kind
        ) ? stemSpec : null;
        const realizedStem = normalizeDerivationStemValue(
            realizeMorphStemSpec(resolvedStemSpec, fallbackStem || "")
        );
        if (!realizedStem) {
            return null;
        }
        const patientiveSourceStageFrame = (
            metadata?.patientiveSourceStageFrame
            && typeof metadata.patientiveSourceStageFrame === "object"
        ) ? metadata.patientiveSourceStageFrame : buildPatientivoSourceStageFrame({
            sourceType: "nonactive",
            sourceSuffix: normalizedSuffix,
            sourceStem: normalizedStem,
            outputStem: realizedStem,
            outputConnector: subjectSuffix,
        });
        return {
            stem: realizedStem,
            suffix: String(subjectSuffix || ""),
            stemSpec: resolvedStemSpec,
            patientiveSourceStageFrame,
            ...(metadata && typeof metadata === "object" ? metadata : {}),
        };
    };
    const buildAppendVariant = (sourceSpec, sourceStem, appendText = "") => (
        buildAppendMorphStemSpec(sourceStem, appendText, {
            sourceStemSpec: sourceSpec || null,
            sourceBase: sourceStem,
        })
    );
    const buildBaseSuffixRouteSpec = (sourceBase, sourceSuffix, resultSuffix = "") => (
        buildBaseSuffixMorphStemSpec({
            sourceBase,
            sourceSuffix,
            resultSuffix,
        })
    );
    const buildFallbackBaseEntry = () => {
        const sourceSuffix = sourceSuffixContract.sourceSuffix;
        const deletedSegment = sourceSuffixContract.deletedSegment;
        if (
            !sourceSuffix
            || !deletedSegment
            || !normalizedStem.endsWith(sourceSuffix)
            || !normalizedStem.endsWith(deletedSegment)
        ) {
            return null;
        }
        return {
            stem: normalizedStem.slice(0, -deletedSegment.length),
            stemSpec: buildReplaceSuffixMorphStemSpec(sourceStemSpec || normalizedStem, deletedSegment, "", {
                fallbackSourceStem: normalizedStem,
            }),
        };
    };
    const buildRouteBaseEntry = () => {
        const routeSurface = `${routeSourceBase}${routeSourceSuffix}`;
        if (
            !routeSourceBase
            || !routeSourceSuffix
            || routeSourceSuffix !== normalizedSuffix
            || routeSurface !== normalizedStem
        ) {
            return null;
        }
        return {
            stem: `${routeSourceBase}${sourceSuffixContract.retainedSegment || ""}`,
            stemSpec: buildBaseSuffixRouteSpec(
                routeSourceBase,
                routeSourceSuffix || sourceSuffixContract.sourceSuffix,
                sourceSuffixContract.retainedSegment || "",
            ),
        };
    };
    const familyBaseEntry = buildRouteBaseEntry() || buildFallbackBaseEntry();
    const buildRecoveredBase = (baseStem, baseStemSpec, recoverDeletedW = false) => {
        if (!recoverDeletedW || !baseStem || baseStem.endsWith("w")) {
            return {
                stem: baseStem,
                stemSpec: baseStemSpec,
            };
        }
        const recoveredStemSpec = buildAppendVariant(baseStemSpec, baseStem, "w");
        return {
            stem: `${baseStem}w`,
            stemSpec: recoveredStemSpec,
        };
    };
    const buildUVariants = (base, variantOptions = {}) => {
        const isTransitive = options.isTransitive === true;
        const recoversDeletedW = normalizedSuffix === "uwa" && baseInfo && baseInfo.lastOnset === "w";
        const recoveredBase = buildRecoveredBase(base, variantOptions.baseStemSpec || null, recoversDeletedW);
        if (!isTransitive && recoversDeletedW) {
            const tStemSpec = buildAppendVariant(recoveredBase.stemSpec, recoveredBase.stem, "i");
            return [
                buildVariantEntry(tStemSpec, `${recoveredBase.stem}i`, "t", {
                    allowedSuffixes: ["t"],
                    blocksAbsolutiveZeroNominalMarker: true,
                }),
            ].filter(Boolean);
        }
        const tiBaseStem = recoveredBase.stem;
        const tiBaseStemSpec = recoveredBase.stemSpec;
        const recoveredLetters = splitVerbLetters(recoveredBase.stem);
        const recoveredLast = recoveredLetters[recoveredLetters.length - 1] || "";
        const needsSupportiveI = recoveredLast && isVerbLetterConsonant(recoveredLast);
        const tStemSpec = needsSupportiveI
            ? buildAppendVariant(recoveredBase.stemSpec, recoveredBase.stem, "i")
            : recoveredBase.stemSpec;
        const tStem = needsSupportiveI ? `${recoveredBase.stem}i` : recoveredBase.stem;
        return [
            buildVariantEntry(tiBaseStemSpec, tiBaseStem, "ti", {
                allowedSuffixes: ["ti"],
                blocksAbsolutiveZeroNominalMarker: true,
            }),
            buildVariantEntry(tStemSpec, tStem, "t", {
                allowedSuffixes: ["t"],
                blocksAbsolutiveZeroNominalMarker: true,
            }),
        ].filter(Boolean);
    };
    const buildTliClassVariant = (entry) => {
        if (!entry?.stem) {
            return null;
        }
        const tliClassSuffix = getTClassSuffixForStem(entry.stem);
        return buildVariantEntry(
            entry.stemSpec,
            entry.stem,
            tliClassSuffix,
            {
                allowedSuffixes: [tliClassSuffix],
                blocksAbsolutiveZeroNominalMarker: true,
            },
        );
    };
    switch (normalizedSuffix) {
        case "lu":
            return familyBaseEntry
                ? [buildTliClassVariant(familyBaseEntry)].filter(Boolean)
                : [];
        case "luwa":
            return familyBaseEntry
                ? [buildTliClassVariant(familyBaseEntry)].filter(Boolean)
                : [];
        case "u":
        case "uwa": {
            if (!familyBaseEntry) {
                return [];
            }
            return buildUVariants(familyBaseEntry.stem, {
                baseStemSpec: familyBaseEntry.stemSpec,
            });
        }
        case "wa":
            return familyBaseEntry
                ? [buildVariantEntry(
                    familyBaseEntry.stemSpec,
                    familyBaseEntry.stem,
                    "t",
                    {
                        allowedSuffixes: ["t"],
                        blocksAbsolutiveZeroNominalMarker: true,
                    },
                )].filter(Boolean)
                : [];
        case "walu":
            return familyBaseEntry
                ? [buildTliClassVariant(familyBaseEntry)].filter(Boolean)
                : [];
        default:
            return [];
    }
}

const PATIENTIVO_DERIVATION_BUILDERS = Object.freeze({
    perfectivo: buildPatientivoPerfectivoDerivations,
    imperfectivo: buildPatientivoImperfectivoDerivations,
    "tronco-verbal": buildPatientivoTroncoDerivations,
});

const STRICT_PATIENTIVO_DERIVATION_SOURCES = new Set(
    Object.keys(PATIENTIVO_DERIVATION_BUILDERS),
);

function normalizePatientivoDerivationSource(source = "") {
    const normalized = normalizeVerbDerivedPatientiveFamily(source);
    if (
        normalized === VERB_DERIVED_PATIENTIVE_FAMILY.passive
        || normalized === VERB_DERIVED_PATIENTIVE_FAMILY.impersonal
    ) {
        return VERB_DERIVED_PATIENTIVE_FAMILY.nonactive;
    }
    return normalized || String(source || "").trim();
}

function getPatientivoDerivationBuilder(source = "") {
    const resolvedSource = normalizePatientivoDerivationSource(source);
    return PATIENTIVO_DERIVATION_BUILDERS[resolvedSource] || buildPatientivoDerivations;
}

function isStrictPatientivoDerivationSource(source = "") {
    return STRICT_PATIENTIVO_DERIVATION_SOURCES.has(normalizePatientivoDerivationSource(source));
}

const PATIENTIVO_DERIVATION_SOURCE_TYPE = Object.freeze({
    nonactive: "nonactive",
    perfectivo: "perfectivo",
    imperfectivo: "imperfectivo",
    troncoVerbal: "tronco-verbal",
});

const PATIENTIVO_SOURCE_CHAIN_POLICY = Object.freeze({
    preserveDirectional: true,
    preserveLexical: true,
    preserveValence: true,
    preserveImpersonal: true,
    preserveSupportive: true,
    preserveAdjacentEmbed: true,
});

function buildPatientivoSourceModel(options = {}, sourceType = PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive) {
    const chain = buildFullDerivationSourceChain(
        options,
        options?.verb || "",
        options?.analysisVerb || options?.verb || "",
    );
    const matrixBase = normalizeRuleBase(
        options?.matrixBaseOverride
        || options?.exactBaseVerb
        || chain?.model?.matrixBase
        || chain?.baseVerb
        || options?.analysisVerb
        || options?.verb
        || ""
    );
    return Object.freeze({
        sourceType: String(sourceType || PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive),
        chain,
        derivationModel: chain?.model || null,
        matrixBase,
        sourceRawVerb: String(options?.sourceRawVerb || options?.verb || ""),
        isTransitive: options?.isTransitive === true,
        objectPrefix: String(options?.objectPrefix || ""),
        directionalPrefix: String(options?.directionalPrefix || ""),
        hasSlashMarker: options?.hasSlashMarker === true,
        hasSuffixSeparator: options?.hasSuffixSeparator === true,
        hasLeadingDash: options?.hasLeadingDash === true,
        hasBoundMarker: options?.hasBoundMarker === true,
        hasCompoundMarker: options?.hasCompoundMarker === true,
        hasImpersonalTaPrefix: options?.hasImpersonalTaPrefix === true,
    });
}

function buildPatientivoNominalMarkerPolicy({
    sourceType = PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
    defaultSuffix = "",
    lockNominalMarker = false,
    allowedSuffixes = null,
    adjectiveSuffix = "ti",
} = {}) {
    return Object.freeze({
        sourceType: String(sourceType || PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive),
        defaultSuffix: String(defaultSuffix || ""),
        lockNominalMarker: lockNominalMarker === true,
        allowedSuffixes: Array.isArray(allowedSuffixes)
            ? Array.from(new Set(allowedSuffixes.map((entry) => String(entry ?? ""))))
            : null,
        adjectiveSuffix: String(adjectiveSuffix || "ti"),
    });
}

function resolveDefaultPatientivoAllowedSuffixes({
    sourceType = PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
    stem = "",
    defaultSuffix = "",
    lockNominalMarker = false,
} = {}) {
    const resolvedSourceType = String(sourceType || PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive);
    const normalizedStem = normalizeDerivationStemValue(stem || "");
    const normalizedDefaultSuffix = typeof defaultSuffix === "string" ? defaultSuffix : "";
    if (lockNominalMarker === true) {
        return [normalizedDefaultSuffix];
    }
    if (resolvedSourceType === PATIENTIVO_DERIVATION_SOURCE_TYPE.perfectivo) {
        return ["ti"];
    }
    if (resolvedSourceType === PATIENTIVO_DERIVATION_SOURCE_TYPE.imperfectivo) {
        return ["t"];
    }
    if (resolvedSourceType === PATIENTIVO_DERIVATION_SOURCE_TYPE.troncoVerbal) {
        const tClassSuffix = normalizedStem ? getTClassSuffixForStem(normalizedStem) : "";
        return Array.from(new Set([
            normalizedDefaultSuffix,
            tClassSuffix,
        ].map((value) => String(value ?? ""))));
    }
    const suffixes = [normalizedDefaultSuffix];
    const tClassSuffix = normalizedStem ? getTClassSuffixForStem(normalizedStem) : "";
    if (tClassSuffix && tClassSuffix !== normalizedDefaultSuffix) {
        suffixes.push(tClassSuffix);
    }
    if (normalizedDefaultSuffix !== "" && normalizedDefaultSuffix !== "t") {
        suffixes.push("");
    }
    const letters = splitVerbLetters(normalizedStem);
    const last = letters[letters.length - 1] || "";
    if (isVerbLetterConsonant(last) && last !== "t") {
        suffixes.push("in");
    }
    return Array.from(new Set(suffixes.map((value) => String(value ?? ""))));
}

function buildPatientivoDerivationEntry({
    sourceModel = null,
    sourceType = PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
    stemSpec = null,
    fallbackStem = "",
    subjectSuffix = "",
    lockNominalMarker = false,
    nominalMarkerPolicy = null,
    metadata = {},
} = {}) {
    const resolvedStemSpec = (
        stemSpec
        && typeof stemSpec === "object"
        && stemSpec.kind
    ) ? stemSpec : (fallbackStem ? buildLiteralMorphStemSpec(fallbackStem) : null);
    const realizedStem = normalizeDerivationStemValue(
        realizeMorphStemSpec(
            resolvedStemSpec,
            fallbackStem || metadata?.stem || metadata?.verb || "",
        )
    );
    if (!realizedStem) {
        return null;
    }
    const resolvedSourceType = String(
        sourceType
        || metadata?.sourceType
        || sourceModel?.sourceType
        || PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive
    );
    const resolvedPolicy = (
        nominalMarkerPolicy
        && typeof nominalMarkerPolicy === "object"
    ) ? buildPatientivoNominalMarkerPolicy({
        sourceType: nominalMarkerPolicy.sourceType || resolvedSourceType,
        defaultSuffix: nominalMarkerPolicy.defaultSuffix ?? subjectSuffix,
        lockNominalMarker: nominalMarkerPolicy.lockNominalMarker ?? lockNominalMarker,
        allowedSuffixes: nominalMarkerPolicy.allowedSuffixes ?? null,
        adjectiveSuffix: nominalMarkerPolicy.adjectiveSuffix || "ti",
    }) : buildPatientivoNominalMarkerPolicy({
        sourceType: resolvedSourceType,
        defaultSuffix: subjectSuffix,
        lockNominalMarker,
        allowedSuffixes: Array.isArray(metadata?.allowedSuffixes) ? metadata.allowedSuffixes : null,
    });
    const entryPolicy = buildPatientivoNominalMarkerPolicy({
        sourceType: resolvedPolicy.sourceType || resolvedSourceType,
        defaultSuffix: resolvedPolicy.defaultSuffix,
        lockNominalMarker: resolvedPolicy.lockNominalMarker === true,
        allowedSuffixes: resolvedPolicy.allowedSuffixes ?? resolveDefaultPatientivoAllowedSuffixes({
            sourceType: resolvedSourceType,
            stem: realizedStem,
            defaultSuffix: resolvedPolicy.defaultSuffix,
            lockNominalMarker: resolvedPolicy.lockNominalMarker === true,
        }),
        adjectiveSuffix: resolvedPolicy.adjectiveSuffix || "ti",
    });
    const entryStemSpec = resolvedStemSpec || buildLiteralMorphStemSpec(realizedStem);
    const patientiveSourceStageFrame = (
        metadata?.patientiveSourceStageFrame
        && typeof metadata.patientiveSourceStageFrame === "object"
    ) ? metadata.patientiveSourceStageFrame : buildPatientivoSourceStageFrame({
        sourceType: resolvedSourceType,
        sourceSuffix: metadata?.nonactiveSourceSuffix || "",
        sourceStem: metadata?.nonactiveSourceStem
            || metadata?.stem
            || metadata?.verb
            || sourceModel?.matrixBase
            || "",
        outputStem: realizedStem,
        outputConnector: subjectSuffix,
        sourceEndingContract: metadata?.perfectiveSourceEndingContract
            || metadata?.imperfectiveSourceStemContract
            || null,
        sourceStockContract: metadata?.rootStockSourceContract || null,
        sourceModel: sourceModel || metadata?.patientivoSourceModel || null,
    });
    return buildNominalFormEntry(realizedStem, subjectSuffix, {
        ...(metadata && typeof metadata === "object" ? metadata : {}),
        stem: realizedStem,
        stemSpec: entryStemSpec,
        sourceType: resolvedSourceType,
        patientivoSourceModel: sourceModel || metadata?.patientivoSourceModel || null,
        sourceModel: sourceModel || metadata?.sourceModel || metadata?.patientivoSourceModel || null,
        patientiveSourceStageFrame,
        nominalMarkerPolicy: entryPolicy,
        lockNominalMarker: entryPolicy.lockNominalMarker === true,
        formSpec: buildStemNominalFormSpec(entryStemSpec, subjectSuffix, {
            stem: realizedStem,
            lockNominalMarker: entryPolicy.lockNominalMarker === true,
        }),
    });
}

function normalizePatientivoDerivationEntry(entry = null, source = "") {
    if (!entry || typeof entry !== "object") {
        return null;
    }
    const realizedEntry = realizeNominalFormSpec(entry.formSpec || null, entry);
    const sourceModel = entry.patientivoSourceModel || entry.sourceModel || null;
    const resolvedSourceType = String(
        entry.sourceType
        || source
        || sourceModel?.sourceType
        || PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive
    );
    const stemSpec = (
        entry.stemSpec
        && typeof entry.stemSpec === "object"
        && entry.stemSpec.kind
    ) ? entry.stemSpec : (
        entry.formSpec?.kind === NOMINAL_FORM_SPEC_KIND.stem
            ? entry.formSpec.stemSpec
            : buildLiteralMorphStemSpec(entry.stem || realizedEntry.verb || entry.verb || "")
    );
    const stem = normalizeDerivationStemValue(
        entry.stem
        || realizeMorphStemSpec(stemSpec, realizedEntry.verb || entry.verb || "")
    );
    const resolvedPolicy = buildPatientivoNominalMarkerPolicy({
        sourceType: entry?.nominalMarkerPolicy?.sourceType || resolvedSourceType,
        defaultSuffix: entry?.nominalMarkerPolicy?.defaultSuffix ?? realizedEntry.subjectSuffix,
        lockNominalMarker: entry?.nominalMarkerPolicy?.lockNominalMarker ?? realizedEntry.lockNominalMarker,
        allowedSuffixes: entry?.nominalMarkerPolicy?.allowedSuffixes ?? null,
        adjectiveSuffix: entry?.nominalMarkerPolicy?.adjectiveSuffix || "ti",
    });
    return buildPatientivoDerivationEntry({
        sourceModel,
        sourceType: resolvedSourceType,
        stemSpec,
        fallbackStem: stem || realizedEntry.verb || entry.verb || "",
        subjectSuffix: realizedEntry.subjectSuffix,
        lockNominalMarker: resolvedPolicy.lockNominalMarker === true,
        nominalMarkerPolicy: resolvedPolicy,
        metadata: entry,
    });
}

function normalizePatientivoDerivationEntries(derivations = [], source = "") {
    return (Array.isArray(derivations) ? derivations : [])
        .map((entry) => normalizePatientivoDerivationEntry(entry, source))
        .filter(Boolean);
}

function buildPatientivoAdjectiveDerivations(derivations = [], source = "") {
    const adjectiveEntries = [];
    const seen = new Set();
    normalizePatientivoDerivationEntries(derivations, source).forEach((entry) => {
        const adjectiveSuffix = String(entry?.nominalMarkerPolicy?.adjectiveSuffix || "ti");
        const adjectiveEntry = buildPatientivoDerivationEntry({
            sourceModel: entry?.patientivoSourceModel || null,
            sourceType: entry?.sourceType || source || PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
            stemSpec: entry?.stemSpec || null,
            fallbackStem: entry?.stem || entry?.verb || "",
            subjectSuffix: adjectiveSuffix,
            lockNominalMarker: true,
            nominalMarkerPolicy: buildPatientivoNominalMarkerPolicy({
                sourceType: entry?.sourceType || source || PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
                defaultSuffix: adjectiveSuffix,
                allowedSuffixes: [adjectiveSuffix],
                adjectiveSuffix,
                lockNominalMarker: true,
            }),
            metadata: entry,
        });
        if (!adjectiveEntry) {
            return;
        }
        const key = `${adjectiveEntry.verb}|${adjectiveEntry.subjectSuffix}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        adjectiveEntries.push(adjectiveEntry);
    });
    return adjectiveEntries;
}

function resolvePatientivoTroncoDerivationalStem(sourceModel = null) {
    const matrixBase = normalizeDerivationStemValue(
        sourceModel?.matrixBase
        || sourceModel?.chain?.baseVerb
        || ""
    );
    if (!matrixBase) {
        return {
            stem: "",
            stemSpec: null,
        };
    }
    const matrixBaseSpec = buildLiteralMorphStemSpec(matrixBase, {
        sourceBase: matrixBase,
    });
    const troncoStemSpec = applySourceChainStemSpecByPolicy(
        matrixBaseSpec,
        matrixBase,
        sourceModel?.chain || null,
        {
            policy: PATIENTIVO_SOURCE_CHAIN_POLICY,
        },
    ) || matrixBaseSpec;
    const troncoStem = normalizeDerivationStemValue(
        realizeMorphStemSpec(troncoStemSpec, matrixBase)
    ) || normalizeDerivationStemValue(
        realizeSourceChainStemByPolicy(
            matrixBase,
            sourceModel?.chain || null,
            PATIENTIVO_SOURCE_CHAIN_POLICY,
        )
    ) || matrixBase;
    return {
        stem: troncoStem,
        stemSpec: troncoStemSpec,
    };
}

function shouldBypassPatientivoPronounceabilityGate(entry = null) {
    const sourceModel = entry?.patientivoSourceModel || entry?.sourceModel || null;
    const sourceType = String(entry?.sourceType || sourceModel?.sourceType || "");
    return sourceType === PATIENTIVO_DERIVATION_SOURCE_TYPE.troncoVerbal
        && sourceModel?.isTransitive === true;
}

function expandPatientivoNominalMarkerOptions(derivations = [], source = "") {
    const normalizedEntries = normalizePatientivoDerivationEntries(derivations, source);
    if (!normalizedEntries.length) {
        return [];
    }
    const expanded = [];
    const seen = new Set();
    const resolvedSource = String(source || "");
    const resolveAllowedSuffixes = (entry, {
        verb = "",
        baseSuffix = "",
    } = {}) => {
        const explicitAllowedSuffixes = Array.isArray(entry?.nominalMarkerPolicy?.allowedSuffixes)
            ? entry.nominalMarkerPolicy.allowedSuffixes.map((value) => String(value ?? ""))
            : null;
        if (explicitAllowedSuffixes && explicitAllowedSuffixes.length) {
            const normalizedExplicitSuffixes = Array.from(new Set(explicitAllowedSuffixes));
            return entry?.blocksAbsolutiveZeroNominalMarker === true
                ? normalizedExplicitSuffixes.filter((value) => value !== "")
                : normalizedExplicitSuffixes;
        }
        const resolvedAllowedSuffixes = resolveDefaultPatientivoAllowedSuffixes({
            sourceType: entry?.sourceType || resolvedSource || PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
            stem: entry?.stem || verb || "",
            defaultSuffix: typeof baseSuffix === "string" ? baseSuffix : "",
            lockNominalMarker: entry?.lockNominalMarker === true,
        });
        return entry?.blocksAbsolutiveZeroNominalMarker === true
            ? resolvedAllowedSuffixes.filter((value) => value !== "")
            : resolvedAllowedSuffixes;
    };
    const pushVariant = (entry, suffix) => {
        const normalizedSuffix = typeof suffix === "string" ? suffix : "";
        const nextEntry = buildPatientivoDerivationEntry({
            sourceModel: entry?.patientivoSourceModel || null,
            sourceType: entry?.sourceType || resolvedSource || PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
            stemSpec: entry?.stemSpec || null,
            fallbackStem: entry?.stem || entry?.verb || "",
            subjectSuffix: normalizedSuffix,
            lockNominalMarker: entry?.lockNominalMarker === true,
            nominalMarkerPolicy: buildPatientivoNominalMarkerPolicy({
                sourceType: entry?.sourceType || resolvedSource || PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
                defaultSuffix: normalizedSuffix,
                lockNominalMarker: entry?.lockNominalMarker === true,
                allowedSuffixes: entry?.nominalMarkerPolicy?.allowedSuffixes ?? null,
                adjectiveSuffix: entry?.nominalMarkerPolicy?.adjectiveSuffix || "ti",
            }),
            metadata: entry,
        });
        if (!nextEntry || !isSyllableSequencePronounceable(`${nextEntry.verb}${nextEntry.subjectSuffix}`)) {
            if (!shouldBypassPatientivoPronounceabilityGate(nextEntry)) {
                return;
            }
        }
        const key = `${nextEntry.verb}|${nextEntry.subjectSuffix}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        expanded.push(nextEntry);
    };
    normalizedEntries.forEach((entry) => {
        const verb = typeof entry?.verb === "string" ? entry.verb : "";
        const baseSuffix = typeof entry?.subjectSuffix === "string" ? entry.subjectSuffix : "";
        if (!verb) {
            return;
        }
        resolveAllowedSuffixes(entry, {
            verb,
            baseSuffix,
        }).forEach((suffix) => {
            pushVariant(entry, suffix);
        });
    });
    return expanded;
}

function normalizePatientivoNominalSuffixSelection(value) {
    if (value === null || value === undefined) {
        return null;
    }
    const normalized = String(value);
    if (normalized === "zero" || normalized === "") {
        return "";
    }
    return PATIENTIVO_NOMINAL_SUFFIX_OPTIONS.some((entry) => entry.id === normalized)
        ? normalized
        : null;
}

function getPatientivoNominalSuffixToggleValue(value) {
    const normalized = normalizePatientivoNominalSuffixSelection(value);
    if (normalized === null) {
        return null;
    }
    return normalized === "" ? "zero" : normalized;
}

function getPatientivoNominalSuffixCacheToken(value) {
    const normalized = normalizePatientivoNominalSuffixSelection(value);
    if (normalized === null) {
        return "*";
    }
    return normalized === "" ? "zero" : normalized;
}

function buildPatientivoDerivationInput({
    verb,
    analysisVerb,
    rawAnalysisVerb = "",
    sourceRawVerb = "",
    isTransitive = false,
    objectPrefix = "",
    directionalPrefix = "",
    isYawi = false,
    hasImpersonalTaPrefix = false,
    boundPrefix = "",
    boundPrefixes = [],
    boundExplicitFlags = [],
    directionalPrefixFromSlash = "",
    sourceSplitPrefix = "",
    sourcePrefix = "",
    sourceBase = "",
    sourceCompositeBase = "",
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    exactBaseVerb = "",
    suppletiveStemSet = null,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
    blockPerfectivoClassC = false,
    preserveProjectiveObjectPrefix = "",
}) {
    return {
        verb,
        analysisVerb,
        rawAnalysisVerb,
        sourceRawVerb,
        isTransitive,
        objectPrefix,
        directionalPrefix,
        isYawi,
        hasImpersonalTaPrefix,
        boundPrefix,
        boundPrefixes,
        boundExplicitFlags,
        directionalPrefixFromSlash,
        sourceSplitPrefix,
        sourcePrefix,
        sourceBase,
        sourceCompositeBase,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        hasOptionalSupportiveI,
        hasNonspecificValence,
        exactBaseVerb,
        suppletiveStemSet,
        rootPlusYaBase,
        rootPlusYaBasePronounceable,
        blockPerfectivoClassC,
        preserveProjectiveObjectPrefix,
    };
}

function buildPatientivoDerivations({
    verb,
    analysisVerb,
    rawAnalysisVerb = "",
    sourceRawVerb = "",
    isTransitive,
    preserveProjectiveObjectPrefix = "",
    directionalPrefix = "",
    boundPrefix = "",
    boundPrefixes = [],
    boundExplicitFlags = [],
    directionalPrefixFromSlash = "",
    sourceSplitPrefix = "",
    sourcePrefix = "",
    sourceBase = "",
    sourceCompositeBase = "",
    isYawi = false,
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
}) {
    const preservedProjectiveObjectPrefix = (
        preserveProjectiveObjectPrefix === "ta"
        || preserveProjectiveObjectPrefix === "te"
    ) ? preserveProjectiveObjectPrefix : "";
    const patientivoBoundPrefixes = preservedProjectiveObjectPrefix
        ? [preservedProjectiveObjectPrefix, ...boundPrefixes]
        : boundPrefixes;
    const patientivoBoundExplicitFlags = preservedProjectiveObjectPrefix
        ? [true, ...boundExplicitFlags]
        : boundExplicitFlags;
    const patientivoSourceModel = buildPatientivoSourceModel({
        sourceRawVerb,
        verb,
        analysisVerb,
        rawAnalysisVerb,
        isTransitive,
        objectPrefix: preserveProjectiveObjectPrefix,
        directionalPrefix,
        isYawi,
        hasImpersonalTaPrefix,
        boundPrefix,
        boundPrefixes: patientivoBoundPrefixes,
        boundExplicitFlags: patientivoBoundExplicitFlags,
        directionalPrefixFromSlash,
        sourceSplitPrefix,
        sourcePrefix,
        sourceBase,
        sourceCompositeBase,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        canonical: {
            sourcePrefix,
            sourceBase,
        },
        canonicalRuleBase: sourceBase || "",
    }, PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive);
    const nonactiveSourceChain = patientivoSourceModel.chain;
    const nonactiveBaseVerb = normalizeDerivationStemValue(
        patientivoSourceModel.matrixBase || nonactiveSourceChain?.baseVerb || ""
    );
    if (!nonactiveBaseVerb) {
        return [];
    }
    const baseLetters = splitVerbLetters(nonactiveBaseVerb);
    const baseLast = baseLetters[baseLetters.length - 1] || "";
    const basePrev = baseLetters[baseLetters.length - 2] || "";
    const basePrev2 = baseLetters[baseLetters.length - 3] || "";
    const baseEndsWithCluster = isVerbLetterVowel(baseLast)
        && isVerbLetterConsonant(basePrev)
        && isVerbLetterConsonant(basePrev2);
    const allowOriginalTVariant = isTransitive && baseEndsWithCluster && baseLast !== "i";
    const baseInfo = getNonactiveBaseInfo(nonactiveBaseVerb);
    const nonactiveRuleBase = normalizeRuleBase(nonactiveBaseVerb);
    const patientivoChainPolicy = hasNonspecificValence
        ? { ...FULL_SOURCE_CHAIN_REALIZATION_POLICY, preserveSupportive: false }
        : FULL_SOURCE_CHAIN_REALIZATION_POLICY;
    const nonactiveRuleSource = buildNonactiveRuleSourceContext(nonactiveBaseVerb, nonactiveBaseVerb, {
        isTransitive,
        isYawi,
        ruleBase: nonactiveRuleBase,
        rootPlusYaBase,
        nonactiveSourceChain,
        matrixBase: nonactiveBaseVerb,
        sourceStem: nonactiveBaseVerb,
        analysisStem: nonactiveBaseVerb,
        optionalSupportiveLetter: hasOptionalSupportiveI ? "i" : "",
    });
    const patientivoNonactiveRuleSource = Object.freeze({
        ...nonactiveRuleSource,
        realizationPolicy: patientivoChainPolicy,
    });
    let options = getVisibleNonactiveDerivationOptions(nonactiveBaseVerb, nonactiveBaseVerb, {
        isTransitive,
        isYawi,
        ruleBase: nonactiveRuleBase,
        rootPlusYaBase,
        nonactiveRuleSource,
    }).map((option) => realizeNonactiveDerivationOption(option, patientivoNonactiveRuleSource))
        .filter(Boolean);
    const selectedNonactiveSuffix = shouldForceAllNonactiveOptions() ? null : getSelectedNonactiveSuffix();
    if (selectedNonactiveSuffix && options.some((option) => option?.suffix === selectedNonactiveSuffix)) {
        options = options.filter((option) => option?.suffix === selectedNonactiveSuffix);
    }
    if (!options.length) {
        return [];
    }
    const results = [];
    const seen = new Set();
    options.forEach((option) => {
        const optionStemSpec = (
            option?.stemSpec
            && typeof option.stemSpec === "object"
            && option.stemSpec.kind
        ) ? option.stemSpec : buildLiteralMorphStemSpec(
            realizeMorphStemSpec(option?.stemSpec, option?.stem || "")
        );
        const optionStem = realizeMorphStemSpec(optionStemSpec, "");
        const derivedList = getPatientivoStemFromNonactive(optionStem, option.suffix, {
            baseInfo,
            isTransitive,
            stemSpec: optionStemSpec,
        });
        if (!derivedList.length) {
            return;
        }
        derivedList.forEach((derived) => {
            const derivedSurface = `${derived.stem || ""}${derived.suffix || ""}`;
            if (
                option.suffix === "uwa"
                && (derivedSurface.endsWith("it") || derivedSurface.endsWith("iti"))
            ) {
                return;
            }
            const nounStem = derived.stem;
            const nextEntry = buildPatientivoDerivationEntry({
                sourceModel: patientivoSourceModel,
                sourceType: PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
                stemSpec: (
                    derived?.stemSpec
                    && typeof derived.stemSpec === "object"
                    && derived.stemSpec.kind
                ) ? derived.stemSpec : buildLiteralMorphStemSpec(nounStem, {
                    sourceBase: optionStem || nounStem,
                }),
                fallbackStem: nounStem,
                subjectSuffix: derived.suffix,
                nominalMarkerPolicy: buildPatientivoNominalMarkerPolicy({
                    sourceType: PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
                    defaultSuffix: derived.suffix,
                    allowedSuffixes: Array.isArray(derived?.allowedSuffixes) ? derived.allowedSuffixes : null,
                    lockNominalMarker: false,
                }),
                metadata: {
                    nonactiveSourceSuffix: option.suffix,
                    nonactiveSourceStem: optionStem,
                    blocksAbsolutiveZeroNominalMarker: derived?.blocksAbsolutiveZeroNominalMarker === true,
                },
            });
            if (nextEntry) {
                if (
                    derived.suffix === "ti"
                    && !isSyllableSequencePronounceable(`${nextEntry.verb}${nextEntry.subjectSuffix}`)
                ) {
                    return;
                }
                const key = `${nextEntry.verb}|${nextEntry.subjectSuffix}`;
                if (seen.has(key)) {
                    return;
                }
                seen.add(key);
                results.push(nextEntry);
            }
        });
    });
    if (allowOriginalTVariant) {
        const nounStem = realizeNonactiveSourceChainStem(nonactiveBaseVerb, nonactiveSourceChain);
        const nounStemSpec = (() => {
            const sourceStemSpec = applyNonactiveSourceChainStemSpec(
                buildLiteralMorphStemSpec(nonactiveBaseVerb, {
                    sourceBase: patientivoSourceModel.matrixBase || nonactiveBaseVerb,
                }),
                nonactiveBaseVerb,
                nonactiveSourceChain,
                {
                    policy: patientivoChainPolicy,
                },
            );
            const realizedSourceStem = normalizeDerivationStemValue(
                realizeMorphStemSpec(sourceStemSpec, nonactiveBaseVerb)
            );
            return realizedSourceStem === nounStem
                ? sourceStemSpec
                : buildLiteralMorphStemSpec(nounStem, {
                    sourceBase: patientivoSourceModel.matrixBase || nonactiveBaseVerb,
                });
        })();
        const key = `${nounStem}|t`;
        if (!seen.has(key)) {
            seen.add(key);
            const nextEntry = buildPatientivoDerivationEntry({
                sourceModel: patientivoSourceModel,
                sourceType: PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
                stemSpec: nounStemSpec,
                fallbackStem: nounStem,
                subjectSuffix: "t",
                nominalMarkerPolicy: buildPatientivoNominalMarkerPolicy({
                    sourceType: PATIENTIVO_DERIVATION_SOURCE_TYPE.nonactive,
                    defaultSuffix: "t",
                    lockNominalMarker: false,
                }),
                metadata: {
                    nonactiveSourceSuffix: "",
                },
            });
            if (nextEntry) {
                results.push(nextEntry);
            }
        }
    }
    return results;
}

function buildPatientivoPerfectivoSourceChain(verbMeta, verb, analysisVerb) {
    return buildFullDerivationSourceChain(verbMeta, verb, analysisVerb);
}

function buildCalificativoInstrumentivoSourceChain(verbMeta, verb, analysisVerb) {
    return buildFullDerivationSourceChain(verbMeta, verb, analysisVerb);
}

function buildPatientivoPerfectivoClassABStemSpec(sourceBase = "", options = {}) {
    const normalizedSourceBase = normalizeRuleBase(sourceBase || "");
    if (!normalizedSourceBase) {
        return null;
    }
    const letters = splitVerbLetters(normalizedSourceBase);
    const lastLetter = letters[letters.length - 1] || "";
    const deletedStemSpec = lastLetter && isVerbLetterVowel(lastLetter)
        ? buildReplaceSuffixMorphStemSpec(normalizedSourceBase, lastLetter, "", {
            sourceBase: normalizedSourceBase,
        })
        : buildLiteralMorphStemSpec(normalizedSourceBase, {
            sourceBase: normalizedSourceBase,
        });
    const deletedBase = normalizeDerivationStemValue(
        realizeMorphStemSpec(deletedStemSpec, normalizedSourceBase)
    );
    if (!deletedStemSpec || !deletedBase) {
        return null;
    }
    return buildDeletionShiftMorphStemSpec(deletedStemSpec, "identity", {
        sourceBase: normalizedSourceBase,
        isTransitive: options.isTransitive === true,
    });
}

function getPatientivoPerfectivoSourceStemEnding(stem = "") {
    const normalized = normalizeRuleBase(String(stem || "").trim().toLowerCase());
    if (!normalized) {
        return "";
    }
    const recognizedDigraphs = ["kw", "qu", "tz", "ts", "sh", "ch"];
    const matchedDigraph = recognizedDigraphs.find((ending) => normalized.endsWith(ending));
    if (matchedDigraph) {
        return matchedDigraph;
    }
    return normalized[normalized.length - 1] || "";
}

const PATIENTIVO_PERFECTIVE_SOURCE_ENDING_CONTRACTS = Object.freeze([
    Object.freeze({
        id: "w",
        classicalEnding: "w",
        classicalSpellings: Object.freeze(["hu", "uh"]),
        nawatEndings: Object.freeze(["w"]),
        acceptedEndings: Object.freeze(["w"]),
    }),
    Object.freeze({
        id: "k",
        classicalEnding: "k",
        classicalSpellings: Object.freeze(["c", "qu"]),
        nawatEndings: Object.freeze(["k"]),
        acceptedEndings: Object.freeze(["k", "c", "qu"]),
    }),
    Object.freeze({
        id: "kw",
        classicalEnding: "kw",
        classicalSpellings: Object.freeze(["cu", "uc"]),
        nawatEndings: Object.freeze(["kw"]),
        acceptedEndings: Object.freeze(["kw"]),
    }),
    Object.freeze({
        id: "s",
        classicalEnding: "s/z",
        classicalSpellings: Object.freeze(["s", "z"]),
        nawatEndings: Object.freeze(["s"]),
        acceptedEndings: Object.freeze(["s", "z"]),
    }),
    Object.freeze({
        id: "sh",
        classicalEnding: "x",
        classicalSpellings: Object.freeze(["x"]),
        nawatEndings: Object.freeze(["sh"]),
        acceptedEndings: Object.freeze(["sh", "x"]),
    }),
    Object.freeze({
        id: "n",
        classicalEnding: "n",
        classicalSpellings: Object.freeze(["n"]),
        nawatEndings: Object.freeze(["n"]),
        acceptedEndings: Object.freeze(["n"]),
    }),
    Object.freeze({
        id: "glottal",
        classicalEnding: "?",
        classicalSpellings: Object.freeze(["h"]),
        nawatEndings: Object.freeze(["h", "j"]),
        acceptedEndings: Object.freeze(["h", "j"]),
    }),
    Object.freeze({
        id: "l",
        classicalEnding: "l",
        classicalSpellings: Object.freeze(["l"]),
        nawatEndings: Object.freeze(["l"]),
        acceptedEndings: Object.freeze(["l"]),
    }),
    Object.freeze({
        id: "tz",
        classicalEnding: "tz",
        classicalSpellings: Object.freeze(["tz"]),
        nawatEndings: Object.freeze(["tz"]),
        acceptedEndings: Object.freeze(["tz", "ts"]),
    }),
]);

function buildPatientivoPerfectiveEndingOrthographyConversions(contract = null) {
    const spellings = Array.isArray(contract?.classicalSpellings)
        ? contract.classicalSpellings
        : [];
    return Object.freeze(spellings.map((spelling) => (
        typeof convertClassicalLettersToNawat === "function"
            ? convertClassicalLettersToNawat(spelling, {
                contract: "patientive-perfective-source-ending",
            })
            : {
                input: spelling,
                output: spelling,
                generationAllowed: false,
            }
    )));
}

function getPatientivoPerfectiveSourceStemContract(stem = "") {
    const normalizedStem = normalizeRuleBase(String(stem || "").trim().toLowerCase());
    const matchedEnding = getPatientivoPerfectivoSourceStemEnding(normalizedStem);
    const contract = PATIENTIVO_PERFECTIVE_SOURCE_ENDING_CONTRACTS.find((entry) => (
        Array.isArray(entry.acceptedEndings)
        && entry.acceptedEndings.includes(matchedEnding)
    )) || null;
    const allowedContractIds = PATIENTIVO_PERFECTIVE_SOURCE_ENDING_CONTRACTS.map((entry) => entry.id);
    if (!contract) {
        const blockedContract = {
            kind: "patientive-perfective-source-ending-contract",
            version: 1,
            curriculumRef: Object.freeze({
                source: "Andrews",
                range: "39.1",
                role: "perfective-active-core-ending-gate",
            }),
            stem: normalizedStem,
            matchedEnding,
            allowed: false,
            contractId: "",
            classicalEnding: "",
            classicalSpellings: Object.freeze([]),
            nawatEndings: Object.freeze([]),
            acceptedEndings: Object.freeze([]),
            allowedContractIds: Object.freeze(allowedContractIds),
            diagnostics: Object.freeze(["unsupported-perfective-patientive-source-ending"]),
            grammarAuthority: "Andrews PDF",
            orthographyAuthority: "Nawat/Pipil output spelling",
            generationAllowedByOrthography: false,
        };
        return Object.freeze(attachVncAllomorphyGrammarContract(blockedContract, {
            metadataKind: "patientive-perfective-source-ending-contract",
            routeFamily: "patientive-source-contract",
            routeStage: "classify-perfective-source-ending",
            range: "39.1",
            supported: false,
            sourceInput: normalizedStem,
            diagnostics: blockedContract.diagnostics,
            stemFrame: {
                stemKind: "patientive-perfective-source-ending",
                sourceStem: normalizedStem,
                matchedEnding,
            },
            targetContract: {
                metadataKind: "patientive-perfective-source-ending-contract",
                generationAllowed: false,
                allowed: false,
                allowedContractIds,
            },
        }));
    }
    const supportedContract = {
        kind: "patientive-perfective-source-ending-contract",
        version: 1,
        curriculumRef: Object.freeze({
            source: "Andrews",
            range: "39.1",
            role: "perfective-active-core-ending-gate",
        }),
        stem: normalizedStem,
        matchedEnding,
        allowed: true,
        contractId: contract.id,
        classicalEnding: contract.classicalEnding,
        classicalSpellings: Object.freeze([...(contract.classicalSpellings || [])]),
        nawatEndings: Object.freeze([...(contract.nawatEndings || [])]),
        acceptedEndings: Object.freeze([...(contract.acceptedEndings || [])]),
        allowedContractIds: Object.freeze(allowedContractIds),
        orthographyConversions: buildPatientivoPerfectiveEndingOrthographyConversions(contract),
        diagnostics: Object.freeze([
            "perfective-patientive-source-ending-allowed",
            "orthography-conversion-is-not-lexical-evidence",
        ]),
        grammarAuthority: "Andrews PDF",
        orthographyAuthority: "Nawat/Pipil output spelling",
        generationAllowedByOrthography: false,
    };
    return Object.freeze(attachVncAllomorphyGrammarContract(supportedContract, {
        metadataKind: "patientive-perfective-source-ending-contract",
        routeFamily: "patientive-source-contract",
        routeStage: "classify-perfective-source-ending",
        range: "39.1",
        supported: true,
        sourceInput: normalizedStem,
        diagnostics: supportedContract.diagnostics,
        orthographyFrame: {
            classicalRuleSpelling: supportedContract.classicalEnding,
            nawatRuleSpelling: supportedContract.nawatEndings.join("/"),
            surfaceForms: supportedContract.nawatEndings,
            spellingAuthority: "Nawat/Pipil output spelling",
            noClassicalSurfaceImport: true,
            orthographyConversions: supportedContract.orthographyConversions,
        },
        stemFrame: {
            stemKind: "patientive-perfective-source-ending",
            sourceStem: normalizedStem,
            matchedEnding,
            contractId: supportedContract.contractId,
        },
        targetContract: {
            metadataKind: "patientive-perfective-source-ending-contract",
            generationAllowed: false,
            allowed: true,
            acceptedEndings: supportedContract.acceptedEndings,
        },
    }));
}

function isAllowedPatientivoPerfectivoSourceStem(stem = "") {
    return getPatientivoPerfectiveSourceStemContract(stem).allowed === true;
}

function applyPatientivoPerfectivoSourceChainStemSpec(stemSpec = null, fallbackStem = "", chain = null) {
    return applySourceChainStemSpecByPolicy(stemSpec, fallbackStem, chain, {
        policy: PATIENTIVO_PERFECTIVO_SOURCE_CHAIN_POLICY,
    });
}

function applyCalificativoInstrumentivoSourceChainStemSpec(stemSpec = null, fallbackStem = "", chain = null) {
    return applySourceChainStemSpecByPolicy(stemSpec, fallbackStem, chain, {
        policy: CALIFICATIVO_INSTRUMENTIVO_SOURCE_CHAIN_POLICY,
    });
}

function extractPasadoRemotoStemCoreFromProvenanceEntry(entry = null, sourceBase = "") {
    const baseSpec = entry?.baseSpec && typeof entry.baseSpec === "object"
        ? entry.baseSpec
        : null;
    const provenanceBase = normalizeDerivationStemValue(
        entry?.base
        || (baseSpec ? realizePretBaseSpec(baseSpec, "") : "")
    );
    const provenanceSuffix = String(entry?.suffix || "");
    const provenanceSurfaceStem = normalizeDerivationStemValue(
        entry?.surfaceStem
        || `${provenanceBase || ""}${provenanceSuffix}`
    );
    const provenanceSurfaceStemCore = extractPasadoRemotoStemCoreFromSurfaceForm(provenanceSurfaceStem);
    let stemCore = provenanceSurfaceStemCore || provenanceBase || provenanceSurfaceStem || normalizeRuleBase(sourceBase || "");
    stemCore = normalizeDerivationStemValue(stemCore);
    return {
        provenanceBase,
        provenanceSuffix,
        provenanceSurfaceStem,
        provenanceSurfaceStemCore,
        stemCore,
        baseSpec,
    };
}

function extractPasadoRemotoStemCoreFromSurfaceForm(surfaceForm = "") {
    const normalizedSurfaceForm = normalizeDerivationStemValue(surfaceForm);
    if (!normalizedSurfaceForm) {
        return "";
    }
    if (normalizedSurfaceForm.endsWith("ka") || normalizedSurfaceForm.endsWith("ki")) {
        return normalizeDerivationStemValue(normalizedSurfaceForm.slice(0, -2));
    }
    if (normalizedSurfaceForm.endsWith("k")) {
        return normalizeDerivationStemValue(normalizedSurfaceForm.slice(0, -1));
    }
    return normalizedSurfaceForm;
}

function resolveCalificativoInstrumentivoStemFromProvenanceEntry(entry = null, sourceBase = "") {
    const extractedStem = extractPasadoRemotoStemCoreFromProvenanceEntry(entry, sourceBase);
    if (extractedStem.baseSpec || extractedStem.stemCore) {
        return {
            stemSpec: buildLiteralMorphStemSpec(extractedStem.stemCore, {
                sourceBase: sourceBase || extractedStem.stemCore,
            }),
            fallbackStem: extractedStem.stemCore || sourceBase,
            provenanceBase: extractedStem.provenanceBase || "",
            provenanceSuffix: extractedStem.provenanceSuffix || "",
            provenanceSurfaceStem: extractedStem.provenanceSurfaceStem || "",
            pasadoRemotoStemCore: extractedStem.stemCore || "",
        };
    }
    const stemSpec = entry?.stemSpec && typeof entry.stemSpec === "object"
        ? entry.stemSpec
        : null;
    const realizedStem = normalizeDerivationStemValue(
        entry?.surfaceStem
        || (stemSpec
            ? realizeMorphStemSpec(stemSpec, `${entry?.base || ""}${entry?.suffix || ""}`)
            : `${entry?.base || ""}${entry?.suffix || ""}`)
    );
    if (!realizedStem && !stemSpec) {
        return null;
    }
    return {
        stemSpec: stemSpec || buildLiteralMorphStemSpec(realizedStem, {
            sourceBase: sourceBase || realizedStem,
        }),
        fallbackStem: realizedStem || sourceBase,
        provenanceBase: extractedStem.provenanceBase || "",
        provenanceSuffix: extractedStem.provenanceSuffix || "",
        provenanceSurfaceStem: extractedStem.provenanceSurfaceStem || "",
        pasadoRemotoStemCore: extractedStem.stemCore || realizedStem || "",
    };
}

function buildPasadoRemotoStemEntries({
    verb,
    analysisVerb,
    rawAnalysisVerb = "",
    sourceRawVerb = "",
    isTransitive,
    directionalPrefix = "",
    boundPrefix = "",
    boundPrefixes = [],
    boundExplicitFlags = [],
    directionalPrefixFromSlash = "",
    sourceSplitPrefix = "",
    sourcePrefix = "",
    sourceBase = "",
    sourceCompositeBase = "",
    isYawi = false,
    hasImpersonalTaPrefix = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    exactBaseVerb = "",
    suppletiveStemSet = null,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
    matrixBaseOverride = "",
}) {
    const pasadoRemotoSourceChain = buildCalificativoInstrumentivoSourceChain({
        sourceRawVerb,
        verb,
        analysisVerb,
        rawAnalysisVerb,
        directionalPrefix,
        boundPrefix,
        boundPrefixes,
        boundExplicitFlags,
        directionalPrefixFromSlash,
        sourceSplitPrefix,
        sourcePrefix,
        sourceBase,
        sourceCompositeBase,
        hasImpersonalTaPrefix,
        hasOptionalSupportiveI,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        canonical: {
            sourcePrefix,
            sourceBase,
        },
        canonicalRuleBase: sourceBase || "",
    }, verb, analysisVerb);
    const classSource = normalizeRuleBase(
        matrixBaseOverride
        || exactBaseVerb
        || pasadoRemotoSourceChain?.model?.matrixBase
        || pasadoRemotoSourceChain?.baseVerb
        || ""
    );
    if (!classSource) {
        return [];
    }
    const context = resolvePretUniversalContextBundle({
        verb: classSource,
        analysisVerb: classSource,
        analysisTarget: classSource,
        isTransitive,
        contextOptions: buildPretContextOptionsFromFlags({
            isYawi,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            exactBaseVerb: classSource || exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
        }),
    }).context;
    const classCandidates = typeof getPretUniversalClassCandidates === "function"
        ? getPretUniversalClassCandidates(context)
        : new Set();
    const classOrder = typeof getPretUniversalClassOrder === "function"
        ? getPretUniversalClassOrder()
        : ["A", "B", "C", "D"];
    const candidateClassKeys = classOrder.filter((classKey) => classCandidates.has(classKey));
    const classKeys = candidateClassKeys.length ? candidateClassKeys : classOrder;
    const pasadoRemotoStemEntries = [];
    const seenStemEntries = new Set();
    const pushPasadoRemotoStemEntry = (stemSpec = null, fallbackStem = "", meta = null) => {
        const realizedStemSpec = applyCalificativoInstrumentivoSourceChainStemSpec(
            stemSpec,
            fallbackStem,
            pasadoRemotoSourceChain,
        );
        const stem = realizedStemSpec
            ? realizeMorphStemSpec(realizedStemSpec, "")
            : "";
        const normalizedStem = normalizeDerivationStemValue(stem);
        if (!normalizedStem || seenStemEntries.has(normalizedStem)) {
            return;
        }
        seenStemEntries.add(normalizedStem);
        pasadoRemotoStemEntries.push({
            verb: normalizedStem,
            stemSpec: realizedStemSpec,
            provenanceBase: String(meta?.provenanceBase || ""),
            provenanceSuffix: String(meta?.provenanceSuffix || ""),
            provenanceSurfaceStem: String(meta?.provenanceSurfaceStem || ""),
            pasadoRemotoStemCore: String(meta?.pasadoRemotoStemCore || fallbackStem || ""),
            provenanceEntry: meta?.provenanceEntry && typeof meta.provenanceEntry === "object"
                ? { ...meta.provenanceEntry }
                : null,
        });
    };
    classKeys.forEach((classKey) => {
        const pasadoRemotoOutput = buildClassBasedResultWithProvenance({
            verb: classSource,
            subjectPrefix: "",
            objectPrefix: "",
            subjectSuffix: applyTenseSuffixRules("pasado-remoto", ""),
            tense: "pasado-remoto",
            analysisVerb: classSource,
            exactBaseVerb: classSource,
            classFilter: classKey,
            allowAllClasses: false,
            isYawi,
            isWeya: false,
            hasSlashMarker: false,
            hasSuffixSeparator: false,
            hasLeadingDash: false,
            hasBoundMarker: false,
            hasCompoundMarker: false,
            hasImpersonalTaPrefix: false,
            hasOptionalSupportiveI: false,
            optionalSupportiveLetter: "",
            hasNonspecificValence: false,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType: DERIVATION_TYPE.direct,
            directionalInputPrefix: "",
            directionalOutputPrefix: "",
            baseSubjectPrefix: "",
            baseObjectPrefix: "",
            suppletiveStemSet,
            forceTransitive: isTransitive,
            indirectObjectMarker: "",
            hasDoubleDash: false,
            forceClassBSelection: false,
            forceClassBOnly: false,
        });
        const provenanceVariants = Array.isArray(pasadoRemotoOutput?.provenance?.variants)
            ? pasadoRemotoOutput.provenance.variants
            : [];
        provenanceVariants.forEach((entry) => {
                const resolvedStem = resolveCalificativoInstrumentivoStemFromProvenanceEntry(entry, classSource);
                if (!resolvedStem) {
                    return;
                }
                pushPasadoRemotoStemEntry(resolvedStem.stemSpec, resolvedStem.fallbackStem, {
                    provenanceBase: resolvedStem.provenanceBase || "",
                    provenanceSuffix: resolvedStem.provenanceSuffix || "",
                    provenanceSurfaceStem: resolvedStem.provenanceSurfaceStem || "",
                    pasadoRemotoStemCore: resolvedStem.pasadoRemotoStemCore || resolvedStem.fallbackStem || "",
                    provenanceEntry: entry && typeof entry === "object" ? entry : null,
                });
            });
        if (!provenanceVariants.length) {
            getVncAllomorphySourceSurfaceForms(pasadoRemotoOutput)
                .map((entry) => normalizeDerivationStemValue(entry))
                .filter((entry) => entry && entry !== "—")
                .forEach((surfaceForm) => {
                    const stemCore = extractPasadoRemotoStemCoreFromSurfaceForm(surfaceForm);
                    if (!stemCore) {
                        return;
                    }
                    pushPasadoRemotoStemEntry(
                        buildLiteralMorphStemSpec(stemCore, {
                            sourceBase: classSource || stemCore,
                        }),
                        stemCore,
                        {
                            provenanceBase: "",
                            provenanceSuffix: "",
                            provenanceSurfaceStem: surfaceForm,
                            pasadoRemotoStemCore: stemCore,
                            provenanceEntry: null,
                        },
                    );
                });
        }
    });
    if (!pasadoRemotoStemEntries.length) {
        const fallbackStem = normalizeDerivationStemValue(classSource);
        if (fallbackStem) {
            pushPasadoRemotoStemEntry(
                buildLiteralMorphStemSpec(fallbackStem, {
                    sourceBase: classSource,
                }),
                fallbackStem,
            );
        }
    }
    return pasadoRemotoStemEntries.filter((entry) => {
        const predicateStemSpec = buildCalificativoInstrumentivoPredicateStemSpec(
            entry?.stemSpec || null,
            entry?.verb || "",
        );
        const predicateStem = normalizeDerivationStemValue(
            realizeMorphStemSpec(predicateStemSpec, `${entry?.verb || ""}ka`)
        );
        return isSyllableSequencePronounceable(
            String(predicateStem || entry?.verb || "")
        );
    });
}

function buildSustantivoVerbalSourceChain(verbMeta, verb, analysisVerb) {
    return buildFullDerivationSourceChain(verbMeta, verb, analysisVerb);
}

function resolveSustantivoVerbalBaseStemSpec(chain = null) {
    const baseVerb = normalizeDerivationStemValue(chain?.baseVerb || "");
    if (!baseVerb) {
        return null;
    }
    const normalizedSourceBase = normalizeRuleBase(chain?.sourceBase || baseVerb);
    if (endsWithAny(baseVerb, IA_UA_SUFFIXES)) {
        const spec = buildReplaceSuffixMorphStemSpec(baseVerb, "a", "", {
            sourceBase: normalizedSourceBase,
            sourceSuffix: "a",
        });
        if (spec) {
            return spec;
        }
    }
    return buildLiteralMorphStemSpec(baseVerb, {
        sourceBase: normalizedSourceBase,
    });
}

function applySustantivoVerbalSourceChainStemSpec(stemSpec = null, fallbackStem = "", chain = null) {
    return applySourceChainStemSpecByPolicy(stemSpec, fallbackStem, chain, {
        policy: SUSTANTIVO_VERBAL_SOURCE_CHAIN_POLICY,
    });
}

function buildSustantivoVerbalStemCandidates({
    verb = "",
    analysisVerb = "",
    rawAnalysisVerb = "",
    sourceRawVerb = "",
    directionalPrefix = "",
    boundPrefix = "",
    boundPrefixes = [],
    boundExplicitFlags = [],
    directionalPrefixFromSlash = "",
    sourceSplitPrefix = "",
    sourcePrefix = "",
    sourceBase = "",
    sourceCompositeBase = "",
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    isIntransitive = true,
    isYawi = false,
    isWeya = false,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
    combinedMode = "",
} = {}) {
    const isImpersonalActionSource = String(combinedMode || "") === "nonactive";
    const nounSourceModel = buildVerbDerivedNominalSourceModel({
        sourceRawVerb,
        verb,
        analysisVerb,
        rawAnalysisVerb,
        directionalPrefix,
        boundPrefix,
        boundPrefixes,
        boundExplicitFlags,
        directionalPrefixFromSlash,
        sourceSplitPrefix,
        sourcePrefix,
        sourceBase,
        sourceCompositeBase,
        hasImpersonalTaPrefix,
        hasOptionalSupportiveI,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        exactBaseVerb: analysisVerb || verb,
        combinedMode,
    }, VERB_DERIVED_NOMINAL_KIND.sustantivoVerbal);
    const sourceChain = buildSustantivoVerbalSourceChain({
        sourceRawVerb,
        verb,
        analysisVerb,
        rawAnalysisVerb,
        directionalPrefix,
        boundPrefix,
        boundPrefixes,
        boundExplicitFlags,
        directionalPrefixFromSlash,
        sourceSplitPrefix,
        sourcePrefix,
        sourceBase,
        sourceCompositeBase,
        hasImpersonalTaPrefix,
        hasOptionalSupportiveI,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        canonical: {
            sourcePrefix,
            sourceBase,
        },
        canonicalRuleBase: sourceBase || "",
    }, verb, analysisVerb);
    const matrixSourceBase = normalizeDerivationStemValue(sourceChain?.baseVerb || "");
    const baseStemSpec = resolveSustantivoVerbalBaseStemSpec(sourceChain);
    const baseStem = realizeMorphStemSpec(baseStemSpec, "");
    if (!matrixSourceBase || !baseStemSpec || !baseStem) {
        return [];
    }
    const candidates = [];
    const seen = new Set();
    const pushCandidate = (stemSpec = null, fallbackStem = "", {
        suppressIEndingSVariant = false,
    } = {}) => {
        const resolvedStemSpec = isImpersonalActionSource
            ? (stemSpec || buildLiteralMorphStemSpec(fallbackStem))
            : applySustantivoVerbalSourceChainStemSpec(
                stemSpec,
                fallbackStem,
                sourceChain,
            );
        const realizedStem = resolvedStemSpec
            ? realizeMorphStemSpec(resolvedStemSpec, "")
            : "";
        const normalizedStem = normalizeDerivationStemValue(realizedStem);
        if (!normalizedStem) {
            return;
        }
        if (seen.has(normalizedStem)) {
            return;
        }
        seen.add(normalizedStem);
        candidates.push(buildVerbDerivedNominalEntry({
            kind: VERB_DERIVED_NOMINAL_KIND.sustantivoVerbal,
            sourceModel: nounSourceModel,
            verb: normalizedStem,
            subjectSuffix: "",
            stemSpec: resolvedStemSpec,
            sourceTense: isImpersonalActionSource ? "impersonal-core" : "futuro",
            provenance: {
                matrixBase: nounSourceModel.matrixBase,
            },
            metadata: {
                verb: normalizedStem,
                subjectSuffix: "",
            suppressIEndingSVariant: suppressIEndingSVariant === true,
            },
        }));
    };
    if (isImpersonalActionSource) {
        const impersonalStem = normalizeDerivationStemValue(verb || analysisVerb || "");
        if (!impersonalStem) {
            return [];
        }
        pushCandidate(buildLiteralMorphStemSpec(impersonalStem, {
            sourceBase: matrixSourceBase || impersonalStem,
        }), impersonalStem, {
            suppressIEndingSVariant: true,
        });
        return candidates;
    }
    const sourceEndsWithYa = matrixSourceBase.endsWith("ya");
    const resolvedFinalYaHostBase = sourceEndsWithYa && isIntransitive
        ? resolveFinalYaImmediateHostBase(matrixSourceBase, {
            isTransitive: false,
            isYawi,
            isWeya,
            requirePronounceable: false,
        })
        : "";
    const droppedSourceYaBase = resolvedFinalYaHostBase || (
        sourceEndsWithYa && baseStem.length > 2
            ? baseStem.slice(0, -2)
            : ""
    );
    const droppedSourceYaBasePronounceable = droppedSourceYaBase && isSyllableSequencePronounceable(droppedSourceYaBase)
        ? droppedSourceYaBase
        : "";
    const droppedYaLooksLikeRootPlusYa = Boolean(
        droppedSourceYaBasePronounceable
        && (
            droppedSourceYaBasePronounceable.endsWith("i")
            || droppedSourceYaBasePronounceable.endsWith("u")
            || droppedSourceYaBasePronounceable.endsWith("ya")
            || endsWithAny(droppedSourceYaBasePronounceable, IA_UA_SUFFIXES)
            || Boolean(rootPlusYaBase)
            || Boolean(rootPlusYaBasePronounceable)
        )
    );
    const shouldPreferDroppedYaAsPrimary = Boolean(
        isIntransitive
        && sourceEndsWithYa
        && droppedYaLooksLikeRootPlusYa
    );
    const droppedYaStemSpec = droppedSourceYaBase
        ? buildLiteralMorphStemSpec(droppedSourceYaBase, {
            sourceBase: matrixSourceBase,
        })
        : null;
    const actionNominalRootPlusYaRules = DERIVATIONAL_RULES?.actionNominal?.sustantivoVerbal?.rootPlusYa || {};
    const deleteYaOnlyVerbs = Array.isArray(actionNominalRootPlusYaRules.deleteYaOnlyVerbs)
        ? actionNominalRootPlusYaRules.deleteYaOnlyVerbs
        : [];
    const deleteYaOnlySuffixes = Array.isArray(actionNominalRootPlusYaRules.deleteYaOnlySuffixes)
        ? actionNominalRootPlusYaRules.deleteYaOnlySuffixes
        : [];
    const allowStemVariantVerbs = Array.isArray(actionNominalRootPlusYaRules.allowStemVariantVerbs)
        ? actionNominalRootPlusYaRules.allowStemVariantVerbs
        : [];
    const allowStemVariantSuffixes = Array.isArray(actionNominalRootPlusYaRules.allowStemVariantSuffixes)
        ? actionNominalRootPlusYaRules.allowStemVariantSuffixes
        : [];
    const sourceRuleBase = matrixSourceBase || baseStem || "";
    const sourceFullRuleBase = sourceRawVerb || rawAnalysisVerb || analysisVerb || verb || "";
    const matchesActionNominalSuffix = (suffixes) => suffixes.some((suffix) => (
        suffix
        && (
            sourceRuleBase.endsWith(suffix)
            || (sourceFullRuleBase && sourceFullRuleBase.endsWith(suffix))
        )
    ));
    const actionNominalRules = DERIVATIONAL_RULES?.actionNominal?.sustantivoVerbal || {};
    const replaciveImperfectiveRules = actionNominalRules.replaciveImperfective || {};
    const finalKaToKiOnly = Array.isArray(replaciveImperfectiveRules.finalKaToKiOnly)
        ? replaciveImperfectiveRules.finalKaToKiOnly
        : [];
    const finalSiToShiOnlySuffixes = Array.isArray(replaciveImperfectiveRules.finalSiToShiOnlySuffixes)
        ? replaciveImperfectiveRules.finalSiToShiOnlySuffixes
        : [];
    const finalTiToChiOptional = Array.isArray(replaciveImperfectiveRules.finalTiToChiOptional)
        ? replaciveImperfectiveRules.finalTiToChiOptional
        : [];
    if (
        baseStem.endsWith("ka")
        && matchesDerivationRuleBaseList(finalKaToKiOnly, sourceRuleBase, sourceFullRuleBase)
    ) {
        pushCandidate(buildReplaceSuffixMorphStemSpec(baseStem, "ka", "ki", {
            sourceBase: matrixSourceBase,
        }), `${baseStem.slice(0, -2)}ki`, {
            suppressIEndingSVariant: true,
        });
        return candidates;
    }
    if (
        baseStem.endsWith("si")
        && matchesActionNominalSuffix(finalSiToShiOnlySuffixes)
    ) {
        pushCandidate(buildReplaceSuffixMorphStemSpec(baseStem, "si", "shi", {
            sourceBase: matrixSourceBase,
        }), `${baseStem.slice(0, -2)}shi`, {
            suppressIEndingSVariant: true,
        });
        return candidates;
    }
    const rootPlusYaStemVariantAllowed = matchesDerivationRuleBaseList(
        allowStemVariantVerbs,
        sourceRuleBase,
        sourceFullRuleBase,
    ) || matchesActionNominalSuffix(allowStemVariantSuffixes);
    const rootPlusYaDeleteOnly = (
        matchesDerivationRuleBaseList(deleteYaOnlyVerbs, sourceRuleBase, sourceFullRuleBase)
        || matchesActionNominalSuffix(deleteYaOnlySuffixes)
    ) && !rootPlusYaStemVariantAllowed;
    if (shouldPreferDroppedYaAsPrimary && droppedYaStemSpec) {
        pushCandidate(droppedYaStemSpec, droppedSourceYaBase, {
            suppressIEndingSVariant: true,
        });
        if (!rootPlusYaDeleteOnly) {
            pushCandidate(baseStemSpec, baseStem);
        }
        return candidates;
    }
    pushCandidate(baseStemSpec, baseStem);
    if (
        baseStem.endsWith("ti")
        && matchesDerivationRuleBaseList(finalTiToChiOptional, sourceRuleBase, sourceFullRuleBase)
    ) {
        pushCandidate(buildReplaceSuffixMorphStemSpec(baseStem, "ti", "chi", {
            sourceBase: matrixSourceBase,
        }), `${baseStem.slice(0, -2)}chi`, {
            suppressIEndingSVariant: true,
        });
    }
    const hasYaEnding = isIntransitive && baseStem.endsWith("ya") && baseStem.length > 2;
    const rootPlusYaBaseResolved = hasYaEnding
        ? (
            rootPlusYaBase
            || resolveFinalYaImmediateHostBase(baseStem, {
                isTransitive: false,
                isYawi,
                isWeya,
                requirePronounceable: false,
            })
            || baseStem.slice(0, -2)
        )
        : "";
    const rootPlusYaNonRedup = rootPlusYaBaseResolved
        ? getNonReduplicatedRoot(rootPlusYaBaseResolved)
        : "";
    const rootVowelCount = rootPlusYaBaseResolved
        ? getTotalVowelCount(rootPlusYaNonRedup || rootPlusYaBaseResolved)
        : 0;
    const hasMonosyllableRootPlusYa = rootVowelCount === 1;
    const allowYaAlternates = !hasMonosyllableRootPlusYa;
    const sustantivoLetterCount = getVerbLetterCount(matrixSourceBase);
    if (allowYaAlternates && hasYaEnding && sustantivoLetterCount > 2 && droppedYaStemSpec) {
        pushCandidate(droppedYaStemSpec, droppedSourceYaBase);
    }
    return candidates;
}

function getCurrentRegexOuterLexicalPrefix(rawValue = "") {
    const model = buildCurrentRegexDerivationSourceModel(rawValue);
    if (!model || !Array.isArray(model.outerPieces)) {
        return "";
    }
    return model.outerPieces
        .filter((piece) => piece?.type === "lexical" && piece?.value)
        .map((piece) => piece.value)
        .join("");
}

function stripNominalOuterLexicalPrefixFromEntry(entry = null, lexicalPrefix = "", sourceModel = null) {
    if (!entry || typeof entry !== "object") {
        return entry;
    }
    const resolvedSourceModel = sourceModel || entry?.sourceModel || null;
    if (resolvedSourceModel) {
        return applyVerbDerivedNominalPlacementToEntry(entry, resolvedSourceModel);
    }
    const prefix = String(lexicalPrefix || "");
    if (!prefix) {
        return entry;
    }
    const verb = String(entry.verb || "");
    if (!verb.startsWith(prefix)) {
        return entry;
    }
    const strippedVerb = verb.slice(prefix.length);
    const subjectSuffix = String(entry.subjectSuffix || "");
    const priorStemSpec = (
        entry.stemSpec && typeof entry.stemSpec === "object" && entry.stemSpec.kind
    ) ? entry.stemSpec : (
        entry.formSpec?.kind === NOMINAL_FORM_SPEC_KIND.stem && entry.formSpec.stemSpec
            ? entry.formSpec.stemSpec
            : null
    );
    const strippedStemSpec = priorStemSpec
        ? buildStripPrefixMorphStemSpec(priorStemSpec, prefix, {
            sourceBase: priorStemSpec.sourceBase || verb,
        })
        : buildStripPrefixMorphStemSpec(verb, prefix, { sourceBase: verb });
    const strippedFormSpec = buildStemNominalFormSpec(strippedStemSpec, subjectSuffix, {
        stem: strippedVerb,
        lockNominalMarker: entry.lockNominalMarker === true,
    }) || buildLiteralNominalFormSpec(strippedVerb, subjectSuffix);
    return buildNominalFormEntry(strippedVerb, subjectSuffix, {
        ...entry,
        verb: strippedVerb,
        formSpec: strippedFormSpec,
    });
}

function resolveNominalSourceOuterSurfacePlacement({
    rawVerb = "",
    sourceModel = null,
    runtimeObjectPrefix = "",
    objectPrefix = "",
    verb = "",
    surfaceRuleMeta = null,
} = {}) {
    const resolvedSourceModel = sourceModel || (
        rawVerb
            ? buildVerbDerivedNominalSourceModelFromRawVerb(rawVerb)
            : null
    );
    if (resolvedSourceModel) {
        return resolveVerbDerivedNominalSourceOuterSurfacePlacement({
            sourceModel: resolvedSourceModel,
            runtimeObjectPrefix,
            objectPrefix,
            verb,
            surfaceRuleMeta,
        });
    }
    const nextVerbValue = String(verb || "");
    const nextRuntimeObjectPrefix = String(runtimeObjectPrefix || "");
    let nextObjectPrefix = String(objectPrefix || "");
    let nextSurfaceRuleMeta = (
        surfaceRuleMeta && typeof surfaceRuleMeta === "object"
    ) ? { ...surfaceRuleMeta } : null;
    if (!nextVerbValue) {
        return {
            objectPrefix: nextObjectPrefix,
            verb: nextVerbValue,
            surfaceRuleMeta: nextSurfaceRuleMeta,
        };
    }
    const lexicalOuterPrefix = getCurrentRegexOuterLexicalPrefix(rawVerb);
    if (!lexicalOuterPrefix) {
        return {
            objectPrefix: nextObjectPrefix,
            verb: nextVerbValue,
            surfaceRuleMeta: nextSurfaceRuleMeta,
        };
    }
    if (String(nextSurfaceRuleMeta?.sourceOuterPrefix || "")) {
        return {
            objectPrefix: nextObjectPrefix,
            verb: nextVerbValue,
            surfaceRuleMeta: nextSurfaceRuleMeta,
        };
    }
    const detachableObjectPrefix = nextObjectPrefix || nextRuntimeObjectPrefix;
    if (detachableObjectPrefix) {
        const fusedLeadingSequence = `${detachableObjectPrefix}${lexicalOuterPrefix}`;
        if (nextVerbValue.startsWith(fusedLeadingSequence)) {
            nextObjectPrefix = detachableObjectPrefix;
            nextSurfaceRuleMeta = {
                ...(nextSurfaceRuleMeta || {}),
                sourceOuterPrefix: lexicalOuterPrefix,
            };
            return {
                objectPrefix: nextObjectPrefix,
                verb: nextVerbValue.slice(fusedLeadingSequence.length),
                surfaceRuleMeta: nextSurfaceRuleMeta,
            };
        }
    }
    if (nextVerbValue.startsWith(lexicalOuterPrefix)) {
        nextSurfaceRuleMeta = {
            ...(nextSurfaceRuleMeta || {}),
            sourceOuterPrefix: lexicalOuterPrefix,
        };
        return {
            objectPrefix: nextObjectPrefix,
            verb: nextVerbValue.slice(lexicalOuterPrefix.length),
            surfaceRuleMeta: nextSurfaceRuleMeta,
        };
    }
    return {
        objectPrefix: nextObjectPrefix,
        verb: nextVerbValue,
        surfaceRuleMeta: nextSurfaceRuleMeta,
    };
}

function resolvePlacedNominalStemSpec(nominalSurface, sourceVerb, sourceStemSpec) {
    const placedVerb = String(nominalSurface?.verb || "");
    const sourceVerbStr = String(sourceVerb || "");
    const placedSourceOuterPrefix = String(nominalSurface?.surfaceRuleMeta?.sourceOuterPrefix || "");
    const nominalObjectPrefix = String(nominalSurface?.objectPrefix || "");
    // Effective prefix: object-only, lexical-only, or fused object+lexical.
    const effectivePrefix = `${nominalObjectPrefix}${placedSourceOuterPrefix}`;
    const resolvedSourceStemSpec = (
        sourceStemSpec && typeof sourceStemSpec === "object" && sourceStemSpec.kind
    ) ? sourceStemSpec : null;
    if (placedVerb === sourceVerbStr) {
        return resolvedSourceStemSpec || buildLiteralMorphStemSpec(placedVerb);
    }
    if (effectivePrefix) {
        if (resolvedSourceStemSpec) {
            return buildStripPrefixMorphStemSpec(resolvedSourceStemSpec, effectivePrefix, {
                sourceBase: resolvedSourceStemSpec.sourceBase || "",
                sourceSuffix: resolvedSourceStemSpec.sourceSuffix || "",
            });
        }
        if (
            sourceVerbStr.startsWith(effectivePrefix)
            && sourceVerbStr.slice(effectivePrefix.length) === placedVerb
        ) {
            return buildStripPrefixMorphStemSpec(sourceVerbStr, effectivePrefix, {
                sourceBase: sourceVerbStr,
            });
        }
    }
    return buildLiteralMorphStemSpec(placedVerb);
}

function buildPatientivoPerfectivoStemEntries({
    verb,
    analysisVerb,
    rawAnalysisVerb = "",
    sourceRawVerb = "",
    isTransitive,
    directionalPrefix = "",
    boundPrefix = "",
    boundPrefixes = [],
    boundExplicitFlags = [],
    directionalPrefixFromSlash = "",
    sourceSplitPrefix = "",
    sourcePrefix = "",
    sourceBase = "",
    sourceCompositeBase = "",
    isYawi = false,
    hasImpersonalTaPrefix = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    exactBaseVerb = "",
    suppletiveStemSet = null,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
    blockPerfectivoClassC = false,
    matrixBaseOverride = "",
}) {
    const patientivoSourceModel = buildPatientivoSourceModel({
        sourceRawVerb,
        verb,
        analysisVerb,
        rawAnalysisVerb,
        isTransitive,
        directionalPrefix,
        boundPrefix,
        boundPrefixes,
        boundExplicitFlags,
        directionalPrefixFromSlash,
        sourceSplitPrefix,
        sourcePrefix,
        sourceBase,
        sourceCompositeBase,
        hasImpersonalTaPrefix,
        hasOptionalSupportiveI,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        canonical: {
            sourcePrefix,
            sourceBase,
        },
        canonicalRuleBase: sourceBase || "",
        matrixBaseOverride,
    }, PATIENTIVO_DERIVATION_SOURCE_TYPE.perfectivo);
    const perfectiveSourceChain = patientivoSourceModel.chain;
    const classSource = normalizeRuleBase(
        matrixBaseOverride
        || exactBaseVerb
        || patientivoSourceModel.matrixBase
        || perfectiveSourceChain?.baseVerb
        || ""
    );
    if (!classSource) {
        return [];
    }
    const context = resolvePretUniversalContextBundle({
        verb: classSource,
        analysisVerb: classSource,
        analysisTarget: classSource,
        isTransitive,
        contextOptions: buildPretContextOptionsFromFlags({
            isYawi,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            exactBaseVerb: classSource || exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
        }),
    }).context;
    const selectedClassKey = context.isMonosyllable
        ? "D"
        : (pretContextHasRightEdge(context, {
            finalForm: "V",
            finalNucleus: "a",
            previousHasCoda: false,
            previousNuclei: ["i", "u"],
        }) ? "C" : "A");
    if (blockPerfectivoClassC && selectedClassKey === "C") {
        return [];
    }
    const classCandidates = typeof getPretUniversalClassCandidates === "function"
        ? getPretUniversalClassCandidates(context)
        : new Set();
    const perfectiveStemEntries = [];
    const seenStemEntries = new Set();
    const pushPerfectiveStemEntry = (stemSpec = null, fallbackStem = "") => {
        const realizedStemSpec = applyPatientivoPerfectivoSourceChainStemSpec(
            stemSpec,
            fallbackStem,
            perfectiveSourceChain,
        );
        const stem = realizedStemSpec
            ? realizeMorphStemSpec(realizedStemSpec, "")
            : "";
        const normalizedStem = normalizeDerivationStemValue(stem);
        if (!normalizedStem) {
            return;
        }
        const perfectiveSourceEndingContract = getPatientivoPerfectiveSourceStemContract(normalizedStem);
        if (perfectiveSourceEndingContract.allowed !== true) {
            return;
        }
        if (seenStemEntries.has(normalizedStem)) {
            return;
        }
        seenStemEntries.add(normalizedStem);
        perfectiveStemEntries.push({
            stem: normalizedStem,
            verb: normalizedStem,
            stemSpec: realizedStemSpec,
            sourceType: PATIENTIVO_DERIVATION_SOURCE_TYPE.perfectivo,
            patientivoSourceModel,
            provenanceBase: "",
            provenanceSuffix: "",
            provenanceSurfaceStem: "",
            pasadoRemotoStemCore: normalizedStem,
            perfectiveSourceEndingContract,
        });
    };
    const shouldUseClassABStem = selectedClassKey !== "C"
        && selectedClassKey !== "D"
        && (classCandidates.has("A") || classCandidates.has("B"));
    if (shouldUseClassABStem) {
        const classABStemSpec = buildPatientivoPerfectivoClassABStemSpec(classSource, {
            isTransitive,
        });
        if (classABStemSpec) {
            pushPerfectiveStemEntry(classABStemSpec, classSource);
        }
    } else {
        const preteriteOutput = buildClassBasedResultWithProvenance({
            verb: classSource,
            subjectPrefix: "",
            objectPrefix: "",
            subjectSuffix: "",
            tense: ADJECTIVE_ACTIVE_TENSE_IDS.preterito,
            analysisVerb: classSource,
            exactBaseVerb: classSource,
            classFilter: selectedClassKey,
            allowAllClasses: false,
            isYawi,
            isWeya: false,
            hasSlashMarker: false,
            hasSuffixSeparator: false,
            hasLeadingDash: false,
            hasBoundMarker: false,
            hasCompoundMarker: false,
            hasImpersonalTaPrefix: false,
            hasOptionalSupportiveI: false,
            optionalSupportiveLetter: "",
            hasNonspecificValence: false,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType: DERIVATION_TYPE.direct,
            directionalInputPrefix: "",
            directionalOutputPrefix: "",
            baseSubjectPrefix: "",
            baseObjectPrefix: "",
            suppletiveStemSet,
            forceTransitive: isTransitive,
            indirectObjectMarker: "",
            hasDoubleDash: false,
            forceClassBSelection: false,
            forceClassBOnly: false,
        });
        const getPatientivoPerfectivoStemFromProvenanceEntry = (entry = null) => resolveCalificativoInstrumentivoStemFromProvenanceEntry(entry, classSource);
        (Array.isArray(preteriteOutput?.provenance?.variants) ? preteriteOutput.provenance.variants : [])
            .forEach((entry) => {
                const resolvedStem = getPatientivoPerfectivoStemFromProvenanceEntry(entry);
                if (!resolvedStem) {
                    return;
                }
                pushPerfectiveStemEntry(resolvedStem.stemSpec, resolvedStem.fallbackStem);
                const lastEntry = perfectiveStemEntries[perfectiveStemEntries.length - 1];
                if (lastEntry) {
                    lastEntry.provenanceBase = resolvedStem.provenanceBase || "";
                    lastEntry.provenanceSuffix = resolvedStem.provenanceSuffix || "";
                    lastEntry.provenanceSurfaceStem = resolvedStem.provenanceSurfaceStem || "";
                    lastEntry.pasadoRemotoStemCore = resolvedStem.pasadoRemotoStemCore || resolvedStem.fallbackStem || "";
                }
            });
        if (!perfectiveStemEntries.length) {
            const fallbackPerfectiveStem = normalizeDerivationStemValue(
                getVncAllomorphyContractSurface(preteriteOutput)
            );
            if (fallbackPerfectiveStem) {
                pushPerfectiveStemEntry(
                    buildLiteralMorphStemSpec(fallbackPerfectiveStem, {
                        sourceBase: classSource,
                    }),
                    fallbackPerfectiveStem,
                );
            }
        }
    }
    return perfectiveStemEntries;
}

function buildPatientivoPerfectivoDerivations(options = {}) {
    return buildPatientivoPerfectivoStemEntries(options)
        .map((entry) => buildPatientivoDerivationEntry({
            sourceModel: entry?.patientivoSourceModel || null,
            sourceType: entry?.sourceType || PATIENTIVO_DERIVATION_SOURCE_TYPE.perfectivo,
            stemSpec: entry?.stemSpec || null,
            fallbackStem: entry?.stem || entry?.verb || "",
            subjectSuffix: "ti",
            lockNominalMarker: true,
            nominalMarkerPolicy: buildPatientivoNominalMarkerPolicy({
                sourceType: entry?.sourceType || PATIENTIVO_DERIVATION_SOURCE_TYPE.perfectivo,
                defaultSuffix: "ti",
                allowedSuffixes: ["ti"],
                adjectiveSuffix: "ti",
                lockNominalMarker: true,
            }),
            metadata: entry,
        }))
        .filter((entry) => {
            if (!entry) {
                return false;
            }
            return isSyllableSequencePronounceable(
                `${entry?.verb || ""}${entry?.subjectSuffix || ""}`
            );
        });
}

function getTClassSuffixForStem(stem) {
    const letters = splitVerbLetters(stem);
    const last = letters[letters.length - 1] || "";
    return isVerbLetterVowel(last) ? "t" : "ti";
}

const PATIENTIVO_ROOT_STOCK_VARIANT_CONSONANTS = Object.freeze([
    Object.freeze({ classical: "c", nawat: "k" }),
    Object.freeze({ classical: "x", nawat: "sh" }),
    Object.freeze({ classical: "z", nawat: "s" }),
    Object.freeze({ classical: "ch", nawat: "ch" }),
]);

function buildPatientivoRootStockVariantOrthographyConversions() {
    return Object.freeze(PATIENTIVO_ROOT_STOCK_VARIANT_CONSONANTS.map((entry) => (
        typeof convertClassicalLettersToNawat === "function"
            ? convertClassicalLettersToNawat(entry.classical, {
                contract: "patientive-root-stock-variant-consonant",
            })
            : {
                input: entry.classical,
                output: entry.nawat,
                generationAllowed: false,
            }
    )));
}

function normalizePatientivoRootStockVariantConsonant(value = "") {
    const normalized = String(value || "").trim().toLowerCase();
    const matched = PATIENTIVO_ROOT_STOCK_VARIANT_CONSONANTS.find((entry) => (
        entry.classical === normalized || entry.nawat === normalized
    ));
    return matched ? matched.nawat : "";
}

function getPatientivoRootStockSourceContract(options = {}) {
    const normalizedSourceStem = normalizeDerivationStemValue(options.sourceStem || "");
    const normalizedOutputStem = normalizeDerivationStemValue(options.outputStem || "");
    const hasOutputConnector = Object.prototype.hasOwnProperty.call(options, "outputConnector");
    const routeStemOnly = options.routeStemOnly === true
        || (hasOutputConnector && String(options.outputConnector ?? "") === "");
    const resolvedConnector = routeStemOnly
        ? ""
        : (
            hasOutputConnector
                ? String(options.outputConnector ?? "")
                : getTClassSuffixForStem(normalizedOutputStem)
        );
    const variantConsonant = normalizePatientivoRootStockVariantConsonant(options.variantConsonant || "");
    const supported = Boolean(normalizedSourceStem && normalizedOutputStem && (routeStemOnly || resolvedConnector));
    const contract = {
        kind: "patientive-root-stock-source-contract",
        version: 1,
        curriculumRef: Object.freeze({
            source: "Andrews",
            range: "39.4",
            role: "root-or-stock-patientive-nounstem",
        }),
        sourceCore: "root-or-stock-stem",
        sourceStem: normalizedSourceStem,
        outputStem: normalizedOutputStem,
        outputConnector: resolvedConnector,
        outputSurface: `${normalizedOutputStem}${resolvedConnector}`,
        supported,
        andrewsSourceFamily: "root-or-stock",
        andrewsNounstemClass: "tli",
        nawatConnectorFamily: "t/ti",
        connectorRule: "tli-class-surface-connector-follows-current-Nawat-stem-shape",
        variantSelectionStatus: "not-fully-recoverable-from-surface-grammar",
        variantConsonant,
        classicalVariantConsonants: Object.freeze(
            PATIENTIVO_ROOT_STOCK_VARIANT_CONSONANTS.map((entry) => entry.classical)
        ),
        nawatVariantConsonants: Object.freeze(
            PATIENTIVO_ROOT_STOCK_VARIANT_CONSONANTS.map((entry) => entry.nawat)
        ),
        orthographyConversions: buildPatientivoRootStockVariantOrthographyConversions(),
        routeStemOnly,
        grammarAuthority: "Andrews PDF",
        orthographyAuthority: "Nawat/Pipil output spelling",
        diagnostics: Object.freeze(supported
            ? ["root-stock-patientive-source-supported"]
            : ["unsupported-root-stock-patientive-source"]),
        boundaries: Object.freeze({
            noClassicalSurfaceImport: true,
            noNewFixtureEvidence: true,
            preservesGeneratedSurfaceForms: true,
            orthographyConversionIsRuleOnly: true,
            doesNotSelectVariantFromSurfaceGrammar: true,
        }),
    };
    return Object.freeze(attachVncAllomorphyGrammarContract(contract, {
        metadataKind: "patientive-root-stock-source-contract",
        routeFamily: "patientive-source-contract",
        routeStage: "classify-root-stock-source",
        range: "39.4",
        supported,
        sourceInput: normalizedSourceStem,
        diagnostics: contract.diagnostics,
        orthographyFrame: {
            classicalRuleSpelling: contract.classicalVariantConsonants.join("/"),
            nawatRuleSpelling: contract.nawatVariantConsonants.join("/"),
            surface: contract.outputSurface,
            surfaceForms: contract.outputSurface ? [contract.outputSurface] : [],
            spellingAuthority: "Nawat/Pipil output spelling",
            noClassicalSurfaceImport: true,
            orthographyConversions: contract.orthographyConversions,
        },
        stemFrame: {
            stemKind: "patientive-root-stock-source",
            sourceStem: normalizedSourceStem,
            targetStem: normalizedOutputStem,
            variantConsonant,
        },
        targetContract: {
            metadataKind: "patientive-root-stock-source-contract",
            generationAllowed: false,
            supported,
            outputSurface: contract.outputSurface,
            outputConnector: resolvedConnector,
            routeStemOnly,
        },
    }));
}

function getPatientivoImperfectiveSourceStemContract({
    sourceStem = "",
    outputStem = "",
    outputConnector = "",
} = {}) {
    const normalizedSourceStem = normalizeDerivationStemValue(sourceStem);
    const normalizedOutputStem = normalizeDerivationStemValue(outputStem);
    const resolvedConnector = String(outputConnector || getTClassSuffixForStem(normalizedOutputStem) || "");
    const supported = Boolean(normalizedSourceStem && normalizedOutputStem && resolvedConnector);
    const contract = {
        kind: "patientive-imperfective-source-stem-contract",
        version: 1,
        curriculumRef: Object.freeze({
            source: "Andrews",
            range: "39.2",
            role: "imperfective-active-core-to-patientive-nounstem",
        }),
        sourceCore: "imperfective-active-core",
        sourceStem: normalizedSourceStem,
        outputStem: normalizedOutputStem,
        outputConnector: resolvedConnector,
        outputSurface: `${normalizedOutputStem}${resolvedConnector}`,
        supported,
        andrewsNounstemClass: "ti",
        nawatConnectorFamily: "t/ti",
        connectorRule: "ti-class-surface-connector-follows-current-Nawat-stem-shape",
        classicalSourceModel: Object.freeze({
            classC: "truncated-imperfective-final-long-o-or-i",
            classD: "imperfective-final-long-a",
            sourceAnalogy: "modeled-after-passive-or-impersonal-patientive",
        }),
        grammarAuthority: "Andrews PDF",
        orthographyAuthority: "Nawat/Pipil output spelling",
        diagnostics: Object.freeze(supported
            ? ["imperfective-patientive-source-stem-supported"]
            : ["unsupported-imperfective-patientive-source-stem"]),
        boundaries: Object.freeze({
            noClassicalSurfaceImport: true,
            noNewFixtureEvidence: true,
            preservesGeneratedSurfaceForms: true,
        }),
    };
    return Object.freeze(attachVncAllomorphyGrammarContract(contract, {
        metadataKind: "patientive-imperfective-source-stem-contract",
        routeFamily: "patientive-source-contract",
        routeStage: "classify-imperfective-source-stem",
        range: "39.2",
        supported,
        sourceInput: normalizedSourceStem,
        diagnostics: contract.diagnostics,
        orthographyFrame: {
            surface: contract.outputSurface,
            surfaceForms: contract.outputSurface ? [contract.outputSurface] : [],
            spellingAuthority: "Nawat/Pipil output spelling",
            noClassicalSurfaceImport: true,
        },
        stemFrame: {
            stemKind: "patientive-imperfective-source-stem",
            sourceStem: normalizedSourceStem,
            targetStem: normalizedOutputStem,
            outputConnector: resolvedConnector,
        },
        targetContract: {
            metadataKind: "patientive-imperfective-source-stem-contract",
            generationAllowed: false,
            supported,
            outputSurface: contract.outputSurface,
            outputConnector: resolvedConnector,
        },
    }));
}

function allowsPatientivoSFamily(sourceBase = "") {
    const normalized = normalizeRuleBase(sourceBase || "");
    if (!normalized) {
        return false;
    }
    return normalized === "waki" || endsWithOpenSyllableSuffix(normalized, "w", "a");
}

function isPreferredPatientivoWrapperStem(stem, { allowSFamily = false } = {}) {
    const normalized = normalizeRuleBase(stem || "");
    if (!normalized) {
        return false;
    }
    return normalized.endsWith("k") || (allowSFamily && normalized.endsWith("s"));
}

function buildPatientivoImperfectivoDerivations({
    verb,
    analysisVerb,
    rawAnalysisVerb = "",
    sourceRawVerb = "",
    directionalPrefix = "",
    boundPrefix = "",
    boundPrefixes = [],
    boundExplicitFlags = [],
    directionalPrefixFromSlash = "",
    sourceSplitPrefix = "",
    sourcePrefix = "",
    sourceBase = "",
    sourceCompositeBase = "",
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
}) {
    const patientivoSourceModel = buildPatientivoSourceModel({
        sourceRawVerb,
        verb,
        analysisVerb,
        rawAnalysisVerb,
        directionalPrefix,
        boundPrefix,
        boundPrefixes,
        boundExplicitFlags,
        directionalPrefixFromSlash,
        sourceSplitPrefix,
        sourcePrefix,
        sourceBase,
        sourceCompositeBase,
        hasImpersonalTaPrefix,
        hasOptionalSupportiveI,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        canonical: {
            sourcePrefix,
            sourceBase,
        },
        canonicalRuleBase: sourceBase || "",
    }, PATIENTIVO_DERIVATION_SOURCE_TYPE.imperfectivo);
    const imperfectiveSourceChain = patientivoSourceModel.chain;
    const baseStemSpec = resolvePatientivoImperfectiveBaseStemSpec(imperfectiveSourceChain);
    const baseStem = realizeMorphStemSpec(baseStemSpec, "");
    if (!baseStem) {
        return [];
    }
    const nounStemSpec = applyPatientivoImperfectiveSourceChainStemSpec(
        baseStemSpec,
        baseStem,
        imperfectiveSourceChain,
    );
    const nounStem = nounStemSpec
        ? realizeMorphStemSpec(nounStemSpec, "")
        : realizePatientivoImperfectiveSourceChainStem(baseStem, imperfectiveSourceChain);
    const imperfectiveSourceStemContract = getPatientivoImperfectiveSourceStemContract({
        sourceStem: baseStem,
        outputStem: nounStem,
    });
    if (imperfectiveSourceStemContract.supported !== true) {
        return [];
    }
    const subjectSuffix = imperfectiveSourceStemContract.outputConnector;
    const entry = buildPatientivoDerivationEntry({
        sourceModel: patientivoSourceModel,
        sourceType: PATIENTIVO_DERIVATION_SOURCE_TYPE.imperfectivo,
        stemSpec: nounStemSpec,
        fallbackStem: nounStem,
        subjectSuffix,
        lockNominalMarker: true,
        nominalMarkerPolicy: buildPatientivoNominalMarkerPolicy({
            sourceType: PATIENTIVO_DERIVATION_SOURCE_TYPE.imperfectivo,
            defaultSuffix: subjectSuffix,
            allowedSuffixes: [subjectSuffix],
            adjectiveSuffix: "ti",
            lockNominalMarker: true,
        }),
        metadata: {
            imperfectiveSourceStemContract,
        },
    });
    return entry ? [entry] : [];
}

function buildPatientivoTroncoDerivations({
    verb,
    analysisVerb,
    rawAnalysisVerb = "",
    isTransitive = false,
    directionalPrefix = "",
    boundPrefix = "",
    boundPrefixes = [],
    boundExplicitFlags = [],
    directionalPrefixFromSlash = "",
    sourceSplitPrefix = "",
    sourcePrefix = "",
    sourceBase = "",
    sourceCompositeBase = "",
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
}) {
    const patientivoSourceModel = buildPatientivoSourceModel({
        sourceRawVerb: verb,
        verb,
        analysisVerb,
        rawAnalysisVerb,
        isTransitive,
        directionalPrefix,
        boundPrefix,
        boundPrefixes,
        boundExplicitFlags,
        directionalPrefixFromSlash,
        sourceSplitPrefix,
        sourcePrefix,
        sourceBase,
        sourceCompositeBase,
        hasImpersonalTaPrefix,
        hasOptionalSupportiveI,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        canonical: {
            sourcePrefix,
            sourceBase,
        },
        canonicalRuleBase: sourceBase || "",
    }, PATIENTIVO_DERIVATION_SOURCE_TYPE.troncoVerbal);
    const resolvedTroncoBase = resolvePatientivoTroncoDerivationalStem(patientivoSourceModel);
    const base = normalizeDerivationStemValue(resolvedTroncoBase?.stem || "");
    if (!base) {
        return [];
    }
    const gateBase = getNonReduplicatedRoot(base) || base;
    const endsWithPlainWi = endsWithOpenSyllableSuffix(base, "w", "i");
    const endsWithPlainWa = endsWithOpenSyllableSuffix(base, "w", "a");
    const gateEndsWithPlainWi = endsWithOpenSyllableSuffix(gateBase, "w", "i");
    const gateEndsWithPlainWa = endsWithOpenSyllableSuffix(gateBase, "w", "a");
    const endsWithProductiveNi = endsWithOpenSyllableSuffix(base, "n", "i");
    const endsWithProductiveNa = endsWithOpenSyllableSuffix(base, "n", "a");
    const endsWithProductiveKi = endsWithOpenSyllableSuffix(base, "k", "i");
    const endsWithProductiveKa = endsWithOpenSyllableSuffix(base, "k", "a");
    const endsWithProductiveYa = endsWithOpenSyllableSuffix(base, "y", "a");
    const isLuaEnding = base.endsWith("lua");
    const syllables = getSyllables(base, { analysis: true, assumeFinalV: true });
    if (syllables.length === 1) {
        return [];
    }
    const isWaFinalSyllable = (syllable) => (
        syllable?.form === "CV" && syllable.onset === "w" && syllable.nucleus === "a"
    );
    const startsWithInitialRedup = (() => {
        if (syllables.length < 2) {
            return false;
        }
        const first = syllables[0];
        const second = syllables[1];
        if (!first || !second) {
            return false;
        }
        const isStandardRedup = (
            REDUP_PREFIX_FORMS.has(first.form)
            && second.nucleus
            && isOpenSyllable(second)
            && (first.onset || second.onset)
            && getSyllableBaseKey(first) === getSyllableBaseKey(second)
        );
        const isLRedup = (
            second.nucleus
            && getSyllableBaseKey(first) === getSyllableBaseKey(second)
            && (
                ((first.form === "V" || first.form === "Vj") && second.form === "Vl")
                || ((first.form === "CV" || first.form === "CVj") && second.form === "CVl")
            )
        );
        return isStandardRedup || isLRedup;
    })();
    const startsWithVj = syllables[0]?.form === "Vj";
    const isCvkiShape = (
        syllables.length === 2
        && syllables[0]?.form === "CV"
        && syllables[1]?.form === "CV"
        && syllables[1]?.onset === "k"
        && syllables[1]?.nucleus === "i"
    );
    const getCoreBeforeSuffixSyllables = (suffix, sourceBase = base) => {
        if (!suffix || !sourceBase.endsWith(suffix) || sourceBase.length <= suffix.length) {
            return [];
        }
        const core = sourceBase.slice(0, -suffix.length);
        return getSyllables(core, { analysis: true, assumeFinalV: true });
    };
    const hasMultisyllableCoreBeforeSuffix = (suffix, sourceBase = base) => {
        const coreSyllables = getCoreBeforeSuffixSyllables(suffix, sourceBase);
        return coreSyllables.length > 1;
    };
    const hasShortOpenCoreBeforeSuffix = (suffix, sourceBase = base) => {
        const coreSyllables = getCoreBeforeSuffixSyllables(suffix, sourceBase);
        if (coreSyllables.length !== 1) {
            return false;
        }
        const [coreSyllable] = coreSyllables;
        return isOpenSyllable(coreSyllable) && Boolean(coreSyllable?.onset);
    };
    const endsWithVCCVwa = (() => {
        if (syllables.length < 3) {
            return false;
        }
        const tail = syllables.slice(-3);
        return tail[0]?.form === "V"
            && tail[1]?.form === "C"
            && isWaFinalSyllable(tail[2]);
    })();
    const endsWithVCCVwi = (() => {
        if (syllables.length < 3) {
            return false;
        }
        const tail = syllables.slice(-3);
        return tail[0]?.form === "V"
            && tail[1]?.form === "C"
            && tail[2]?.form === "CV"
            && tail[2]?.onset === "w"
            && tail[2]?.nucleus === "i";
    })();
    const endsWithVjCVwa = (() => {
        if (syllables.length >= 3) {
            const shortTail = syllables.slice(-3);
            if (shortTail[0]?.form === "Vj"
                && shortTail[1]?.form === "CV"
                && isWaFinalSyllable(shortTail[2])) {
                return true;
            }
        }
        if (syllables.length >= 4) {
            const longTail = syllables.slice(-4);
            return longTail[0]?.form === "V"
                && longTail[1]?.form === "C"
                && longTail[1]?.onset === "j"
                && longTail[2]?.form === "CV"
                && isWaFinalSyllable(longTail[3]);
        }
        return false;
    })();
    const endsWithVjCVwi = (() => {
        if (syllables.length >= 2) {
            const shortTail = syllables.slice(-2);
            if (shortTail[0]?.form === "Vj"
                && shortTail[1]?.form === "CV"
                && shortTail[1]?.onset === "w"
                && shortTail[1]?.nucleus === "i") {
                return true;
            }
        }
        if (syllables.length >= 3) {
            const shortTail = syllables.slice(-3);
            if (shortTail[0]?.form === "Vj"
                && shortTail[1]?.form === "CV"
                && shortTail[2]?.form === "CV"
                && shortTail[2]?.onset === "w"
                && shortTail[2]?.nucleus === "i") {
                return true;
            }
        }
        if (syllables.length >= 4) {
            const longTail = syllables.slice(-4);
            return longTail[0]?.form === "V"
                && longTail[1]?.form === "C"
                && longTail[1]?.onset === "j"
                && longTail[2]?.form === "CV"
                && longTail[3]?.form === "CV"
                && longTail[3]?.onset === "w"
                && longTail[3]?.nucleus === "i";
        }
        return false;
    })();
    const endsWithVlCVwa = (() => {
        if (syllables.length < 3) {
            return false;
        }
        const tail = syllables.slice(-3);
        return tail[0]?.form === "Vl"
            && tail[1]?.form === "CV"
            && isWaFinalSyllable(tail[2]);
    })();
    const endsWithVlCVwi = (() => {
        if (syllables.length >= 2) {
            const shortTail = syllables.slice(-2);
            if (shortTail[0]?.form === "Vl"
                && shortTail[1]?.form === "CV"
                && shortTail[1]?.onset === "w"
                && shortTail[1]?.nucleus === "i") {
                return true;
            }
        }
        if (syllables.length < 3) {
            return false;
        }
        const tail = syllables.slice(-3);
        return tail[0]?.form === "Vl"
            && tail[1]?.form === "CV"
            && tail[2]?.form === "CV"
            && tail[2]?.onset === "w"
            && tail[2]?.nucleus === "i";
    })();
    if (
        endsWithVCCVwa
        || endsWithVCCVwi
        || endsWithVlCVwa
        || endsWithVlCVwi
    ) {
        return [];
    }
    const results = [];
    const seen = new Set();
    const matrixBaseForStemSpec = normalizeDerivationStemValue(
        patientivoSourceModel?.matrixBase
        || patientivoSourceModel?.chain?.baseVerb
        || base
    );
    const baseStemSpec = (
        resolvedTroncoBase?.stemSpec
        && typeof resolvedTroncoBase.stemSpec === "object"
        && resolvedTroncoBase.stemSpec.kind
    )
        ? resolvedTroncoBase.stemSpec
        : buildLiteralMorphStemSpec(base, {
            sourceBase: matrixBaseForStemSpec || base,
        });
    const normalizeStem = (stem) => {
        if (endsWithAny(stem, IA_UA_SUFFIXES)) {
            return stem.slice(0, -1);
        }
        return stem;
    };
    const buildNormalizedTroncoStemSpec = (stem = "", stemSpec = null) => {
        const normalizedStem = normalizeStem(stem);
        let resolvedStemSpec = (
            stemSpec
            && typeof stemSpec === "object"
            && stemSpec.kind
        ) ? stemSpec : (
            stem === base
                ? baseStemSpec
                : (stem ? buildMorphStemSpecFromRoute(base, "", stem) : null)
        );
        if (
            resolvedStemSpec
            && normalizedStem !== stem
            && typeof stem === "string"
            && stem.endsWith("a")
        ) {
            resolvedStemSpec = buildReplaceSuffixMorphStemSpec(resolvedStemSpec, "a", "", {
                fallbackSourceStem: stem,
                sourceSuffix: "a",
                sourceBase: stem.slice(0, -1),
            }) || resolvedStemSpec;
        }
        if (!resolvedStemSpec && normalizedStem) {
            resolvedStemSpec = buildMorphStemSpecFromRoute(base, "", normalizedStem);
        }
        return {
            stem: normalizedStem,
            stemSpec: resolvedStemSpec,
        };
    };
    const buildBaseSuffixTrimSpec = (suffix = "", replacement = "") => {
        if (!suffix || !base.endsWith(suffix)) {
            return null;
        }
        return buildReplaceSuffixMorphStemSpec(baseStemSpec || base, suffix, replacement, {
            fallbackSourceStem: base,
            sourceSuffix: suffix,
            sourceBase: base.slice(0, -suffix.length),
        });
    };
    const buildAppendedStemSpec = (stem = "", stemSpec = null, appendText = "") => (
        buildAppendMorphStemSpec(stem, appendText, {
            sourceStemSpec: (
                stemSpec
                && typeof stemSpec === "object"
                && stemSpec.kind
            ) ? stemSpec : null,
            sourceBase: stem,
        })
    );
    const buildTrimmedStemSpec = (stem = "", stemSpec = null, sourceSuffix = "", replacement = "") => (
        buildReplaceSuffixMorphStemSpec(
            (
                stemSpec
                && typeof stemSpec === "object"
                && stemSpec.kind
            ) ? stemSpec : stem,
            sourceSuffix,
            replacement,
            {
                fallbackSourceStem: stem,
                sourceSuffix,
                sourceBase: sourceSuffix && stem.endsWith(sourceSuffix)
                    ? stem.slice(0, -sourceSuffix.length)
                    : stem,
            },
        )
    );
    const addRawResult = (stem, suffix, options = {}) => {
        const derivedStem = buildNormalizedTroncoStemSpec(stem, options.stemSpec || null);
        const normalized = derivedStem.stem;
        if (!normalized) {
            return;
        }
        const rootStockSourceContract = options.rootStockSourceContract
            || getPatientivoRootStockSourceContract({
                sourceStem: base,
                outputStem: normalized,
                outputConnector: suffix,
                routeStemOnly: suffix === "",
                variantConsonant: options.variantConsonant || "",
            });
        const nextEntry = buildPatientivoDerivationEntry({
            sourceModel: patientivoSourceModel,
            sourceType: PATIENTIVO_DERIVATION_SOURCE_TYPE.troncoVerbal,
            stemSpec: derivedStem.stemSpec,
            fallbackStem: normalized,
            subjectSuffix: suffix,
            lockNominalMarker: options.lockNominalMarker === true,
            nominalMarkerPolicy: buildPatientivoNominalMarkerPolicy({
                sourceType: PATIENTIVO_DERIVATION_SOURCE_TYPE.troncoVerbal,
                defaultSuffix: suffix,
                lockNominalMarker: options.lockNominalMarker === true,
            }),
            metadata: {
                rootStockSourceContract,
            },
        });
        if (nextEntry) {
            if (!shouldBypassPatientivoPronounceabilityGate(nextEntry) && !isSyllableSequencePronounceable(`${nextEntry.verb}${nextEntry.subjectSuffix}`)) {
                return;
            }
            const key = `${nextEntry.verb}|${nextEntry.subjectSuffix}`;
            if (seen.has(key)) {
                return;
            }
            seen.add(key);
            results.push(nextEntry);
        }
    };
    const addResult = (stem, options = {}) => {
        const normalized = normalizeStem(stem);
        if (!normalized) {
            return;
        }
        const rootStockSourceContract = getPatientivoRootStockSourceContract({
            sourceStem: base,
            outputStem: normalized,
        });
        const suffix = rootStockSourceContract.outputConnector;
        addRawResult(normalized, suffix, {
            stemSpec: options.stemSpec || null,
            lockNominalMarker: options.lockNominalMarker !== false,
            rootStockSourceContract,
            variantConsonant: options.variantConsonant || "",
        });
    };
    const hasFinalConsonantCluster = (stem = "") => {
        const letters = splitVerbLetters(stem);
        if (letters.length < 2) {
            return false;
        }
        const last = letters[letters.length - 1] || "";
        const prev = letters[letters.length - 2] || "";
        return isVerbLetterConsonant(last) && isVerbLetterConsonant(prev);
    };
    const endsWithTBaseSegment = (stem = "") => {
        const letters = splitVerbLetters(stem);
        return (letters[letters.length - 1] || "") === "t";
    };
    const targetVerbForMirror = normalizeComposerStem(analysisVerb || verb || base);
    const shouldMirrorAgainstSeries = /(?:wi|wa|iwi|awi|ua)$/i.test(targetVerbForMirror);
    const finalizeSeriesMirroredResults = () => {
        if (!shouldMirrorAgainstSeries) {
            return results;
        }
        return results.filter((entry) => {
            const nounSurface = `${entry?.verb || ""}${entry?.subjectSuffix || ""}`;
            return canComposerNounRebuildVerbThroughSeries(nounSurface, targetVerbForMirror);
        });
    };
    const addTClassMirror = (stem = "", stemSpec = null) => {
        const normalizedStem = normalizeStem(stem);
        if (!normalizedStem) {
            return;
        }
        const letters = splitVerbLetters(normalizedStem);
        const last = letters[letters.length - 1] || "";
        if (!isVerbLetterVowel(last)) {
            return;
        }
        const tStem = `${normalizedStem}t`;
        if (canComposerNounRebuildVerbThroughSeries(tStem, targetVerbForMirror)) {
            addRawResult(tStem, "", {
                stemSpec: buildAppendedStemSpec(normalizedStem, stemSpec, "t"),
                lockNominalMarker: true,
            });
        }
    };
    const addATClassMirror = (stem = "", stemSpec = null) => {
        const normalizedStem = normalizeStem(stem);
        if (!normalizedStem) {
            return;
        }
        addTClassMirror(`${normalizedStem}a`, buildAppendedStemSpec(normalizedStem, stemSpec, "a"));
    };
    const addYJoinedTClassMirror = (stem = "", stemSpec = null) => {
        const normalizedStem = normalizeStem(stem);
        if (!normalizedStem || !normalizedStem.endsWith("y")) {
            return;
        }
        const letters = splitVerbLetters(normalizedStem);
        const prev = letters[letters.length - 2] || "";
        if (!isVerbLetterVowel(prev)) {
            return;
        }
        addTClassMirror(
            normalizedStem.slice(0, -1),
            buildTrimmedStemSpec(normalizedStem, stemSpec, "y", ""),
        );
    };
    const addFullAwiTClassMirror = () => {
        if (iwiAwiUaSuffix !== "awi") {
            return;
        }
        addRawResult(`${base}t`, "", {
            stemSpec: buildAppendedStemSpec(base, baseStemSpec, "t"),
            lockNominalMarker: true,
        });
    };
    if (isTransitive) {
        if (!isLuaEnding) {
            return [];
        }
        const core = base.slice(0, -2);
        addRawResult(core, "", {
            stemSpec: buildBaseSuffixTrimSpec("ua", ""),
        });
        return results;
    }
    const addWithConsonants = (stem, consonants, stemSpec = null) => {
        consonants.forEach((consonant) => {
            const extendedStem = `${stem}${consonant}`;
            const extendedStemSpec = buildAppendedStemSpec(stem, stemSpec, consonant);
            addRawResult(extendedStem, "", {
                stemSpec: extendedStemSpec,
                variantConsonant: consonant,
            });
            addResult(extendedStem, {
                stemSpec: extendedStemSpec,
                variantConsonant: consonant,
            });
        });
    };
    const wiFamilyConsonants = ["k", "ch", "s", "sh"];
    const iwiAwiUaSuffix = base.endsWith("iwi")
        ? "iwi"
        : (base.endsWith("awi")
            ? "awi"
            : (base.endsWith("ua") ? "ua" : ""));
    const gateIwiAwiUaSuffix = gateBase.endsWith("iwi")
        ? "iwi"
        : (gateBase.endsWith("awi")
            ? "awi"
            : (gateBase.endsWith("ua") ? "ua" : ""));
    const isIwiAwiUa = Boolean(iwiAwiUaSuffix);
    const gateIsIwiAwiUa = Boolean(gateIwiAwiUaSuffix);
    const allowMonosyllableIwiAwiUa = gateBase === "iwi" || gateBase === "awi";
    const allowShortIwiCore = (() => {
        if (iwiAwiUaSuffix !== "iwi" || gateIwiAwiUaSuffix !== "iwi") {
            return false;
        }
        const core = base.slice(0, -3);
        const gateCoreSyllables = getCoreBeforeSuffixSyllables("iwi", gateBase);
        return gateCoreSyllables.length === 1 && isSyllableSequencePronounceable(core);
    })();
    const useShortWiSuperposition = gateEndsWithPlainWi
        && hasShortOpenCoreBeforeSuffix("wi", gateBase);
    if (useShortWiSuperposition) {
        const shortWiCore = base.slice(0, -2);
        if (shortWiCore) {
            const shortWiCoreSpec = buildBaseSuffixTrimSpec("wi", "");
            addWithConsonants(shortWiCore, ["k"], shortWiCoreSpec);
            addTClassMirror(shortWiCore, shortWiCoreSpec);
        }
        return finalizeSeriesMirroredResults();
    }
    if (
        isIwiAwiUa
        && gateIsIwiAwiUa
        && gateIwiAwiUaSuffix === iwiAwiUaSuffix
        && (
            hasMultisyllableCoreBeforeSuffix(iwiAwiUaSuffix, gateBase)
            || allowShortIwiCore
            || allowMonosyllableIwiAwiUa
        )
    ) {
        const familyCore = base.slice(0, -iwiAwiUaSuffix.length);
        const familyCoreSpec = buildBaseSuffixTrimSpec(iwiAwiUaSuffix, "");
        if (familyCore) {
            if (hasFinalConsonantCluster(familyCore)) {
                const recoveredVowel = iwiAwiUaSuffix === "iwi"
                    ? "i"
                    : (iwiAwiUaSuffix === "awi" ? "a" : "u");
                const repairedStem = `${familyCore}${recoveredVowel}`;
                const repairedStemSpec = buildAppendedStemSpec(familyCore, familyCoreSpec, recoveredVowel);
                addRawResult(repairedStem, "", { stemSpec: repairedStemSpec });
                addResult(repairedStem, { stemSpec: repairedStemSpec });
                if (iwiAwiUaSuffix === "awi") {
                    addWithConsonants(repairedStem, wiFamilyConsonants, repairedStemSpec);
                }
                addFullAwiTClassMirror();
            } else {
                if (!endsWithTBaseSegment(familyCore)) {
                    addRawResult(familyCore, "", { stemSpec: familyCoreSpec });
                    addResult(familyCore, { stemSpec: familyCoreSpec });
                }
                if (iwiAwiUaSuffix === "awi") {
                    const awiStemSpec = buildAppendedStemSpec(familyCore, familyCoreSpec, "a");
                    addWithConsonants(`${familyCore}a`, wiFamilyConsonants, awiStemSpec);
                    addATClassMirror(familyCore, familyCoreSpec);
                    addFullAwiTClassMirror();
                }
                addYJoinedTClassMirror(familyCore, familyCoreSpec);
            }
        } else if (allowMonosyllableIwiAwiUa) {
            const nounStem = "";
            const key = `${nounStem}|`;
            if (!seen.has(key)) {
                seen.add(key);
                const nextEntry = buildPatientivoDerivationEntry({
                    sourceModel: patientivoSourceModel,
                    sourceType: PATIENTIVO_DERIVATION_SOURCE_TYPE.troncoVerbal,
                    stemSpec: buildLiteralMorphStemSpec(nounStem),
                    fallbackStem: nounStem,
                    subjectSuffix: "",
                    nominalMarkerPolicy: buildPatientivoNominalMarkerPolicy({
                        sourceType: PATIENTIVO_DERIVATION_SOURCE_TYPE.troncoVerbal,
                        defaultSuffix: "",
                    }),
                });
                if (nextEntry) {
                    results.push(nextEntry);
                }
            }
        }
    }
    if (!isIwiAwiUa && (endsWithPlainWi || endsWithPlainWa)) {
        const wiWaSuffix = endsWithPlainWi ? "wi" : "wa";
        const gateWiWaSuffix = gateEndsWithPlainWi ? "wi" : (gateEndsWithPlainWa ? "wa" : "");
        const allowMonosyllableWiWa = gateBase === "ewa" || gateBase === "ewi" || gateBase === "awa";
        const allowReduplicatedCore = gateBase !== base
            && hasMultisyllableCoreBeforeSuffix(wiWaSuffix, base);
        const hasAllowedCore = hasMultisyllableCoreBeforeSuffix(wiWaSuffix, gateBase)
            || allowMonosyllableWiWa
            || allowReduplicatedCore;
        if (
            !gateWiWaSuffix
            || gateWiWaSuffix !== wiWaSuffix
            || !hasAllowedCore
        ) {
            return finalizeSeriesMirroredResults();
        }
        const core = base.slice(0, -2);
        const coreSpec = buildBaseSuffixTrimSpec(wiWaSuffix, "");
        if (endsWithPlainWi) {
            const coreLetters = splitVerbLetters(core);
            const lastCore = coreLetters[coreLetters.length - 1] || "";
            const coreNoV = isVerbLetterVowel(lastCore) ? core.slice(0, -1) : core;
            addWithConsonants(core, wiFamilyConsonants, coreSpec);
            addResult(coreNoV, {
                stemSpec: isVerbLetterVowel(lastCore)
                    ? buildTrimmedStemSpec(core, coreSpec, lastCore, "")
                    : coreSpec,
            });
        } else {
            addWithConsonants(core, wiFamilyConsonants, coreSpec);
            addResult(core, { stemSpec: coreSpec });
        }
    }
    if (endsWithProductiveNi || endsWithProductiveNa) {
        const core = base.slice(0, -2);
        const coreSpec = buildBaseSuffixTrimSpec(endsWithProductiveNi ? "ni" : "na", "");
        addWithConsonants(core, wiFamilyConsonants, coreSpec);
        addResult(core, { stemSpec: coreSpec });
    }
    if (endsWithProductiveKi && isCvkiShape) {
        const core = base.slice(0, -2);
        const coreSpec = buildBaseSuffixTrimSpec("ki", "");
        addWithConsonants(core, ["k", "ch", "j"], coreSpec);
        if (base === "waki" || gateBase === "waki") {
            const sCore = `${base.slice(0, -2)}s`;
            const sCoreSpec = buildAppendedStemSpec(core, coreSpec, "s");
            addRawResult(sCore, "", { stemSpec: sCoreSpec });
            addResult(sCore, { stemSpec: sCoreSpec });
        }
    }
    if (
        endsWithProductiveKa
        && hasMultisyllableCoreBeforeSuffix("ka")
        && (startsWithInitialRedup || startsWithVj)
    ) {
        const core = base.slice(0, -2);
        addWithConsonants(core, ["k", "ch", "j"], buildBaseSuffixTrimSpec("ka", ""));
    }
    if (endsWithProductiveYa) {
        if (base.endsWith("tiya") && gateBase.endsWith("tiya")) {
            const tiyaCore = base.slice(0, -4);
            if (tiyaCore) {
                const tiyaCoreSpec = buildBaseSuffixTrimSpec("tiya", "");
                addRawResult(tiyaCore, "", { stemSpec: tiyaCoreSpec });
                addResult(tiyaCore, { stemSpec: tiyaCoreSpec });
            }
        } else {
            const lStem = `${base.slice(0, -2)}l`;
            if (lStem) {
                const lStemSpec = buildBaseSuffixTrimSpec("ya", "l");
                addRawResult(lStem, "", { stemSpec: lStemSpec });
                addResult(lStem, { stemSpec: lStemSpec });
            }
        }
    }
    return finalizeSeriesMirroredResults();
}

const PATIENTIVO_MULTIPLE_DERIVATION_SOURCE_FAMILIES = Object.freeze([
    VERB_DERIVED_PATIENTIVE_FAMILY.passive,
    VERB_DERIVED_PATIENTIVE_FAMILY.impersonal,
    VERB_DERIVED_PATIENTIVE_FAMILY.perfectivo,
    VERB_DERIVED_PATIENTIVE_FAMILY.imperfectivo,
    VERB_DERIVED_PATIENTIVE_FAMILY.troncoVerbal,
]);

function buildPatientivoMultipleDerivationContract({
    patientivoInput = null,
    selectedSource = "",
    selectedStageFrame = null,
    selectedOutputSurface = "",
    sourceFamilies = PATIENTIVO_MULTIPLE_DERIVATION_SOURCE_FAMILIES,
} = {}) {
    const input = patientivoInput && typeof patientivoInput === "object" ? patientivoInput : null;
    const selectedFamily = normalizeVerbDerivedPatientiveFamily(selectedSource || selectedStageFrame?.sourceType || "");
    const families = Array.isArray(sourceFamilies) && sourceFamilies.length
        ? sourceFamilies
        : PATIENTIVO_MULTIPLE_DERIVATION_SOURCE_FAMILIES;
    const sourceOptions = families.map((familyValue) => {
        const sourceFamily = normalizeVerbDerivedPatientiveFamily(familyValue);
        const builder = sourceFamily ? getPatientivoDerivationBuilder(sourceFamily) : null;
        let entries = [];
        if (input && typeof builder === "function") {
            const rawEntries = normalizePatientivoDerivationEntries(builder(input), sourceFamily);
            const expandedEntries = expandPatientivoNominalMarkerOptions(rawEntries, sourceFamily);
            entries = (expandedEntries.length ? expandedEntries : rawEntries).filter(Boolean);
        }
        const sourceCores = Array.from(new Set(entries
            .map((entry) => String(entry?.patientiveSourceStageFrame?.sourceCore || entry?.sourceType || ""))
            .filter(Boolean)));
        const outputSurfaces = Array.from(new Set(entries
            .map((entry) => `${String(entry?.verb || entry?.stem || "")}${String(entry?.subjectSuffix || "")}`)
            .filter(Boolean)));
        return Object.freeze({
            sourceFamily,
            available: entries.length > 0,
            outputCount: entries.length,
            sourceCores: Object.freeze(sourceCores),
            outputSurfaces: Object.freeze(outputSurfaces),
            selected: sourceFamily === selectedFamily,
            diagnostics: Object.freeze(entries.length
                ? ["patientive-derivation-procedure-available"]
                : ["patientive-derivation-procedure-unavailable"]),
        });
    });
    const availableOptions = sourceOptions.filter((entry) => entry.available === true);
    const contract = {
        kind: "patientive-multiple-derivation-contract",
        version: 1,
        curriculumRef: Object.freeze({
            source: "Andrews",
            range: "39.5",
            role: "multiple-patientive-derivation-procedures",
        }),
        slot: "#3 salida",
        selectedSource: selectedFamily,
        selectedSourceCore: String(selectedStageFrame?.sourceCore || ""),
        selectedOutputSurface: String(selectedOutputSurface || selectedStageFrame?.outputSurface || ""),
        sourceOptions: Object.freeze(sourceOptions),
        availableSourceFamilies: Object.freeze(availableOptions.map((entry) => entry.sourceFamily)),
        availableProcedureCount: availableOptions.length,
        hasMultipleAvailableProcedures: availableOptions.length > 1,
        semanticBoundary: "shared-source-patientive-outputs-may-be-synonymous-or-idiomatically-distinct",
        grammarAuthority: "Andrews PDF",
        orthographyAuthority: "Nawat/Pipil output spelling",
        diagnostics: Object.freeze(availableOptions.length > 1
            ? ["multiple-patientive-derivation-procedures-available"]
            : ["single-patientive-derivation-procedure-available"]),
        boundaries: Object.freeze({
            noClassicalSurfaceImport: true,
            noNewFixtureEvidence: true,
            noNewSurfaceForms: true,
            doesNotMergeSynonymousTranslations: true,
            sourceProcedureInventoryOnly: true,
        }),
    };
    return Object.freeze(attachVncAllomorphyGrammarContract(contract, {
        metadataKind: "patientive-multiple-derivation-contract",
        routeFamily: "patientive-source-contract",
        routeStage: "classify-multiple-derivation",
        range: "39.5",
        supported: availableOptions.length > 0,
        sourceInput: selectedFamily,
        diagnostics: contract.diagnostics,
        stemFrame: {
            stemKind: "patientive-multiple-derivation",
            sourceFamily: selectedFamily,
            selectedSourceCore: contract.selectedSourceCore,
            targetStem: contract.selectedOutputSurface,
        },
        targetContract: {
            metadataKind: "patientive-multiple-derivation-contract",
            generationAllowed: false,
            availableSourceFamilies: contract.availableSourceFamilies,
            availableProcedureCount: contract.availableProcedureCount,
            hasMultipleAvailableProcedures: contract.hasMultipleAvailableProcedures,
        },
    }));
}

function buildNonactiveOptionMap(options) {
    const map = new Map();
    if (!Array.isArray(options)) {
        return map;
    }
    options.forEach((option) => {
        const optionStem = realizeMorphStemSpec(option?.stemSpec, option?.stem || "");
        if (!option || !option.suffix || !optionStem) {
            return;
        }
        const list = map.get(option.suffix);
        if (list) {
            if (!list.includes(optionStem)) {
                list.push(optionStem);
            }
            return;
        }
        map.set(option.suffix, [optionStem]);
    });
    return map;
}

function buildNonactiveRuleSourceContext(verb, analysisVerb, options = {}) {
    const verbMeta = options.nonactiveVerbMeta || options.verbMeta || options.parsedVerb || null;
    const nonactiveSourceChain = (
        options.nonactiveSourceChain
        && typeof options.nonactiveSourceChain === "object"
    ) ? options.nonactiveSourceChain : (
        verbMeta ? buildNonactiveSourceChain(verbMeta, verb, analysisVerb) : null
    );
    const sourceModel = nonactiveSourceChain?.model || null;
    const fallbackRuleBase = (() => {
        if (options.canonicalRuleBase) {
            return normalizeRuleBase(options.canonicalRuleBase);
        }
        if (verbMeta?.canonicalRuleBase) {
            return normalizeRuleBase(verbMeta.canonicalRuleBase);
        }
        if (verbMeta?.canonical?.ruleBase) {
            return normalizeRuleBase(verbMeta.canonical.ruleBase);
        }
        if (options.ruleBase) {
            return normalizeRuleBase(options.ruleBase);
        }
        const normalizedAnalysisVerb = normalizeRuleBase(analysisVerb || "");
        if (verbMeta && normalizedAnalysisVerb && shouldUseAnalysisVerbAsRuleBase(verbMeta)) {
            return normalizedAnalysisVerb;
        }
        return normalizeRuleBase(verb || analysisVerb || "");
    })();
    const matrixBase = normalizeDerivationStemValue(
        options.matrixBase
        || options.exactBaseVerb
        || verbMeta?.exactBaseVerb
        || sourceModel?.matrixBase
        || nonactiveSourceChain?.baseVerb
        || fallbackRuleBase
    );
    const sourceStem = normalizeDerivationStemValue(
        options.sourceStem
        || matrixBase
        || fallbackRuleBase
        || verb
        || analysisVerb
    );
    const analysisStem = normalizeDerivationStemValue(
        options.analysisStem
        || matrixBase
        || analysisVerb
        || verb
        || fallbackRuleBase
    );
    const ruleBase = normalizeRuleBase(
        options.ruleBase
        || options.canonicalRuleBase
        || matrixBase
        || normalizeRuleBase(stripNonactiveRuleBasePrefixes(
            getDerivationRuleBase(fallbackRuleBase || verb || analysisVerb || "", verbMeta),
            verbMeta,
        ))
        || sourceStem
    );
    const supportiveLetter = normalizeSupportiveMarkerValue(
        options.optionalSupportiveLetter
        || nonactiveSourceChain?.supportiveMarker
        || verbMeta?.optionalSupportiveLetter
        || (verbMeta?.hasOptionalSupportiveI === true ? "i" : "")
    );
    const realizationPolicy = verbMeta?.hasNonspecificValence
        ? { ...FULL_SOURCE_CHAIN_REALIZATION_POLICY, preserveSupportive: false }
        : FULL_SOURCE_CHAIN_REALIZATION_POLICY;
    return Object.freeze({
        verbMeta,
        chain: nonactiveSourceChain,
        model: sourceModel,
        matrixBase,
        sourceStem,
        analysisStem,
        ruleBase,
        supportiveLetter,
        realizationPolicy,
        rootPlusYaBase: options.rootPlusYaBase || verbMeta?.rootPlusYaBase || "",
        isTransitive: options.isTransitive === true,
        isYawi: options.isYawi === true,
    });
}

function normalizeVisibleNonactiveDerivationOptions(options = []) {
    return Array.isArray(options) ? options.filter(Boolean) : [];
}

function realizeNonactiveDerivationOption(option = {}, sourceContext = null) {
    if (!option || typeof option !== "object") {
        return null;
    }
    if (!sourceContext?.chain) {
        const stem = realizeMorphStemSpec(option?.stemSpec, option?.stem || "");
        return stem
            ? { ...option, stem, stemSpec: option?.stemSpec }
            : null;
    }
    const stemSpec = applyNonactiveSourceChainStemSpec(
        option?.stemSpec,
        option?.stem || "",
        sourceContext.chain,
        {
            sourceSuffix: option?.suffix || "",
            policy: sourceContext.realizationPolicy || FULL_SOURCE_CHAIN_REALIZATION_POLICY,
        }
    );
    const stem = realizeMorphStemSpec(stemSpec, "");
    if (!stem) {
        return null;
    }
    return {
        ...option,
        stem,
        stemSpec,
    };
}

function resolveLiveNonactiveOptions({
    verbMeta = null,
    verb = "",
    analysisVerb = "",
    isTransitive = false,
    isYawi = false,
    ruleBase = "",
    rootPlusYaBase = "",
} = {}) {
    const sourceContext = buildNonactiveRuleSourceContext(verb, analysisVerb, {
        verbMeta,
        parsedVerb: verbMeta,
        isTransitive,
        isYawi,
        ruleBase,
        rootPlusYaBase,
    });
    const rawOptions = getVisibleNonactiveDerivationOptions(
        sourceContext.sourceStem || verb || analysisVerb,
        sourceContext.analysisStem || analysisVerb || verb || sourceContext.sourceStem,
        {
            isTransitive,
            isYawi,
            ruleBase: sourceContext.ruleBase || ruleBase,
            rootPlusYaBase: sourceContext.rootPlusYaBase || rootPlusYaBase,
            verbMeta,
            parsedVerb: verbMeta,
            nonactiveRuleSource: sourceContext,
        }
    );
    return normalizeVisibleNonactiveDerivationOptions(
        rawOptions
            .map((option) => realizeNonactiveDerivationOption(option, sourceContext))
            .filter(Boolean)
    );
}

function getVisibleNonactiveDerivationOptions(verb, analysisVerb, options = {}) {
    return normalizeVisibleNonactiveDerivationOptions(
        getNonactiveDerivationOptions(verb, analysisVerb, options),
    );
}

function getUniqueMorphStemSpecs(specs = []) {
    const uniqueSpecs = [];
    const seen = new Set();
    (Array.isArray(specs) ? specs : []).forEach((spec) => {
        const realizedStem = realizeMorphStemSpec(spec);
        if (!realizedStem || seen.has(realizedStem)) {
            return;
        }
        seen.add(realizedStem);
        uniqueSpecs.push(
            spec && typeof spec === "object" && spec.kind
                ? spec
                : buildLiteralMorphStemSpec(realizedStem)
        );
    });
    return uniqueSpecs;
}

function buildNonactiveOptionSpecMap(options) {
    const map = new Map();
    if (!Array.isArray(options)) {
        return map;
    }
    options.forEach((option) => {
        const optionStem = realizeMorphStemSpec(option?.stemSpec, option?.stem || "");
        if (!option || !option.suffix || !optionStem) {
            return;
        }
        const optionSpec = option?.stemSpec;
        const list = map.get(option.suffix) || [];
        if (!list.some((entry) => realizeMorphStemSpec(entry) === optionStem)) {
            list.push(optionSpec);
        }
        map.set(option.suffix, list);
    });
    return map;
}

function getNonactiveDerivationOptions(verb, analysisVerb, options = {}) {
    const sourceContext = (
        options.nonactiveRuleSource
        && typeof options.nonactiveRuleSource === "object"
    ) ? options.nonactiveRuleSource : buildNonactiveRuleSourceContext(verb, analysisVerb, options);
    const source = sourceContext.sourceStem || normalizeDerivationStemValue(verb || analysisVerb || "");
    const suppletiveOptions = getSuppletiveNonactiveOptions({
        verb: source,
        isYawi: options.isYawi === true,
    });
    if (suppletiveOptions) {
        return suppletiveOptions;
    }
    const ruleBase = sourceContext.ruleBase;
    if (!ruleBase || !VOWEL_END_RE.test(ruleBase)) {
        return [];
    }

    const info = getNonactiveBaseInfo(ruleBase);
    const blockReplaciveOnsetForShort = isShortReplaciveOnsetBase(ruleBase);
    const {
        last,
        prev,
        prev2,
        endsWithA,
        endsWithE,
        endsWithU,
        endsWithYa,
        endsWithTa,
        endsWithTi,
        endsWithTV,
        endsWithNa,
        endsWithSa,
        isClassC,
        endsWithKwi,
        endsWithWi,
        endsWithNi,
        endsWithTzV,
        lastNucleus,
        lastOnset,
        penultimateHasCoda,
        preTiConsonant,
        endsWithNucleusI,
        endsWithNucleusA,
        endsWithNucleusU,
        isVowelMonosyllable,
    } = info;
    const isTransitive = options.isTransitive === true;
    const allowChiwaVariant = isTransitive && isVerbLetterVowel(last) && prev === "t";
    const allowShiwaVariant = isTransitive && isVerbLetterVowel(last) && prev === "s";
    const allowChiwaOrShiwa = allowChiwaVariant || allowShiwaVariant;
    const allowPlainUVariant = isTransitive && endsWithTV;
    const isTiNonactive = endsWithTi;
    const {
        isMonosyllable,
        blockUForWaWi,
        blockUwaForPenultimateU,
        blockUwaForPenultimateOnset,
        blockUwaForCoda,
        allowUwaFromT,
        allowUFromKNS,
        allowUFromM,
        allowUFromKwI,
        allowUFromT,
        allowUFromTz,
        allowUFromTTa,
    } = getNonactiveCandidateParts(info);
    const allowUFromPlainTa = isTransitive
        && lastOnset === "t"
        && endsWithNucleusA
        && !allowUFromTTa
        && !penultimateHasCoda;
    const allowMonosyllableUWalu = isMonosyllable && endsWithNucleusU;
    const allowIntransitiveTiWalu = !isTransitive && endsWithTi;
    const allowINucleusWaluByShape = !endsWithTi && (isMonosyllable || penultimateHasCoda);
    const allowWaluVariant = (
        endsWithNucleusI
        && (
            allowINucleusWaluByShape
            || allowIntransitiveTiWalu
        )
    ) || allowMonosyllableUWalu;
    const uCandidate = isTransitive
        && !isMonosyllable
        && (
            allowUFromKNS
            || allowUFromM
            || allowUFromKwI
            || allowUFromT
            || allowUFromTz
            || allowUFromTTa
            || allowUFromPlainTa
        )
        && !blockUForWaWi;
    const uwaCandidate = !isTransitive
        && (
            (["k", "s", "w"].includes(lastOnset) && (endsWithNucleusA || endsWithNucleusI))
            || (["w", "m", "n", "tz"].includes(lastOnset) && endsWithNucleusI)
            || allowUwaFromT
        )
        && !blockUForWaWi
        && !blockUwaForPenultimateU
        && !blockUwaForPenultimateOnset
        && !blockUwaForCoda;
    // -wa is generally intransitive-only, but bare transitive -i also keeps a wa path.
    const allowWaForI = isTransitive && ruleBase === "i";
    const waCandidate = (!isTransitive && (endsWithNucleusI || endsWithNucleusU))
        || allowWaForI;
    const allowLuVariantTzV = isTransitive && endsWithTzV;
    const allowLuVariantTV = isTransitive && endsWithA && prev === "t";
    const allowLuVariantTransitiveA = isTransitive && endsWithA;
    const allowLuVariantIntransA = !isTransitive && endsWithA;
    const allowLuVariantIntransU = !isTransitive && endsWithU;
    const allowLuVariantIntransWaWiPenultimateOnset = !isTransitive
        && lastOnset === "w"
        && (endsWithNucleusA || endsWithNucleusI)
        && isVerbLetterConsonant(prev2);
    const allowLuVariantIntransI = !isTransitive
        && endsWithNucleusI
        && (
            lastOnset === "t"
            || isVowelMonosyllable
        );
    const luCandidate = (endsWithA
            || endsWithE
            || endsWithU
            || allowLuVariantIntransI
            || allowLuVariantIntransWaWiPenultimateOnset)
        && !(endsWithA && lastOnset === "s" && penultimateHasCoda)
        && (!uCandidate
            || allowLuVariantTzV
            || allowLuVariantTV
            || allowLuVariantTransitiveA
            || allowLuVariantIntransA
            || allowLuVariantIntransU
            || allowLuVariantIntransI
            || allowLuVariantIntransWaWiPenultimateOnset)
        && (!uwaCandidate
            || allowLuVariantIntransA
            || allowLuVariantIntransU
            || allowLuVariantIntransI
            || allowLuVariantIntransWaWiPenultimateOnset);

    const results = [];
    const seen = new Set();
    const optionalSupportiveLetter = normalizeSupportiveMarkerValue(
        sourceContext.supportiveLetter
        || options.optionalSupportiveLetter
        || options.parsedVerb?.optionalSupportiveLetter
        || (options.parsedVerb?.hasOptionalSupportiveI === true ? "i" : "")
    );
    const isSourceAwareNonactiveStemPronounceable = (stemSpec, stem, suffix = "") => {
        const normalizedStem = normalizeDerivationStemValue(stem);
        if (!normalizedStem) {
            return false;
        }
        if (isSyllableSequencePronounceable(normalizedStem)) {
            return true;
        }
        if (
            optionalSupportiveLetter
            && isSyllableSequencePronounceable(`${optionalSupportiveLetter}${normalizedStem}`)
        ) {
            return true;
        }
        if (!sourceContext?.chain) {
            return false;
        }
        const realizedStemSpec = applyNonactiveSourceChainStemSpec(
            stemSpec,
            normalizedStem,
            sourceContext.chain,
            {
                sourceSuffix: suffix,
                policy: sourceContext.realizationPolicy || FULL_SOURCE_CHAIN_REALIZATION_POLICY,
            }
        );
        const realizedStem = normalizeDerivationStemValue(
            realizeMorphStemSpec(realizedStemSpec, "")
        );
        return Boolean(realizedStem && isSyllableSequencePronounceable(realizedStem));
    };
    const push = (suffix, stemSpec) => {
        if (!stemSpec?.kind) {
            return;
        }
        const stem = realizeMorphStemSpec(stemSpec);
        if (!stem) {
            return;
        }
        if (!isSourceAwareNonactiveStemPronounceable(stemSpec, stem, suffix)) {
            return;
        }
        const key = `${suffix}|${stem}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        results.push({ suffix, stem, stemSpec });
    };
    const pushWithVariants = (suffix, stemOrSpec) => {
        push(suffix, stemOrSpec);
        if (suffix !== "u" && suffix !== "uwa") {
            return;
        }
    };

    const buildLu = () => {
        const dropYa = endsWithYa
            && !isTransitive
            && shouldDropYaInRootPlusYaNonactive(source, {
                isTransitive,
                isYawi: options.isYawi === true,
                isWeya: options.isWeya === true,
                rootPlusYaBase: options.rootPlusYaBase,
            });
        const base = (isTransitive && endsWithTV)
            ? `${source.slice(0, -1)}i`
            : (dropYa ? source.slice(0, -2) : source);
        return buildAppendMorphStemSpec(base, "lu", {
            sourceBase: base,
            sourceSuffix: "lu",
        });
    };
    const blockChForTi = penultimateHasCoda || (endsWithTi && preTiConsonant);
    const buildU = () => {
        return buildNonactiveUStemMorphStemSpec(source, lastOnset, lastNucleus, {
            sourceBase: source,
            sourceSuffix: "u",
            blockCh: blockChForTi,
            blockOnsetReplacement: blockReplaciveOnsetForShort,
            allowFinalTaReplacement: allowUFromPlainTa,
        });
    };
    const buildPlainUT = () => buildReplaceSuffixMorphStemSpec(source, source.slice(-1), "u");
    const buildWa = () => buildAppendMorphStemSpec(source, "wa", {
        sourceBase: source,
        sourceSuffix: "wa",
    });
    const buildUwa = () => buildNonactiveUwaStemMorphStemSpec(source, lastOnset, lastNucleus, {
        sourceBase: source,
        sourceSuffix: "uwa",
        blockCh: blockChForTi,
        blockOnsetReplacement: blockReplaciveOnsetForShort,
    });

    if (isClassC) {
        const baseSpec = buildTruncateNonactiveBaseMorphStemSpec(source, {
            sourceBase: source,
            sourceSuffix: "",
        });
        const base = realizeMorphStemSpec(baseSpec);
        const stemSpec = buildAppendMorphStemSpec(base, "lu", {
            sourceBase: base,
            sourceSuffix: "lu",
        });
        return [{ suffix: "lu", stem: realizeMorphStemSpec(stemSpec), stemSpec }];
    }
    if (luCandidate) {
        const baseLu = buildLu();
        push("lu", baseLu);
        if (endsWithYa && !isTransitive) {
            const yaLu = buildAppendMorphStemSpec(source, "lu", {
                sourceBase: source,
                sourceSuffix: "lu",
            });
            if (realizeMorphStemSpec(yaLu) !== realizeMorphStemSpec(baseLu)) {
                push("lu", yaLu);
            }
        }
        if (endsWithA && !isMonosyllable && !endsWithYa && (lastOnset === "k" || lastOnset === "kw")) {
            const altLu = buildReplaceSuffixMorphStemSpec(source, "a", "ilu");
            if (realizeMorphStemSpec(altLu) !== realizeMorphStemSpec(baseLu)) {
                push("lu", altLu);
            }
        }
        if (isTransitive && endsWithTV) {
            const altLu = buildAppendMorphStemSpec(source, "lu", {
                sourceBase: source,
                sourceSuffix: "lu",
            });
            if (realizeMorphStemSpec(altLu) !== realizeMorphStemSpec(baseLu)) {
                push("lu", altLu);
            }
        }
    }
    if (uCandidate) {
        const uStem = buildU();
        pushWithVariants("u", uStem);
    }
    if (allowPlainUVariant) {
        pushWithVariants("u", buildPlainUT());
    }
    if (waCandidate) {
        // The n+i family keeps plain -wa alongside -uwa (e.g. keluniwa ~ kelunuwa).
        const baseWa = buildWa();
        const baseWaStem = realizeMorphStemSpec(baseWa);
        const hasSOnset = isVerbLetterVowel(last) && prev === "s";
        if (!hasSOnset) {
            push("wa", baseWa);
        }
        const onsetVariant = buildWaOnsetVariant(source, {
            blockCh: blockChForTi,
            blockOnsetReplacement: blockReplaciveOnsetForShort,
        });
        const onsetVariantSpec = buildWaOnsetVariantMorphStemSpec(source, {
            sourceBase: source,
            sourceSuffix: "wa",
            blockCh: blockChForTi,
            blockOnsetReplacement: blockReplaciveOnsetForShort,
        });
        if (onsetVariant && onsetVariant !== baseWaStem) {
            push("wa", onsetVariantSpec);
        }
    }
    if (uwaCandidate) {
        pushWithVariants("uwa", buildUwa());
    }

    // Transitive verbs ending in nucleus -i also allow -lu nonactive.
    const allowLuVariant = isTransitive
        && (endsWithNucleusI || endsWithNa || endsWithNi || endsWithSa || endsWithTa || endsWithTi || endsWithTV || endsWithWi);
    const allowLuForI = isTransitive && ruleBase === "i";
    if (allowLuVariant) {
        push("lu", buildLu());
        if (isTransitive && endsWithTV) {
            push("lu", buildAppendMorphStemSpec(source, "lu", {
                sourceBase: source,
                sourceSuffix: "lu",
            }));
        }
    }
    if (allowLuForI) {
        push("lu", buildLu());
    }
    if (endsWithKwi) {
        push("lu", buildLu());
    }
    if (isTransitive && isTiNonactive && !allowChiwaOrShiwa) {
        const chuStem = realizeMorphStemSpec(buildU());
        push("lu", buildAppendMorphStemSpec(chuStem, "lu", {
            sourceBase: chuStem,
            sourceSuffix: "lu",
        }));
    }
    if (allowWaluVariant) {
        push("walu", buildAppendMorphStemSpec(source, "walu", {
            sourceBase: source,
            sourceSuffix: "walu",
        }));
    }

    return results;
}

function resolveNonactiveStemSelection(verb, analysisVerb, options = {}) {
    if (
        analysisVerb
        && typeof analysisVerb === "object"
        && !Array.isArray(analysisVerb)
        && (!options || (typeof options === "object" && !Object.keys(options).length))
    ) {
        options = analysisVerb;
        analysisVerb = "";
    }
    const sourceContext = (
        options.nonactiveRuleSource
        && typeof options.nonactiveRuleSource === "object"
    ) ? options.nonactiveRuleSource : buildNonactiveRuleSourceContext(verb, analysisVerb, options);
    const resolveTenseSpecificOption = (option) => {
        if (!option || typeof option !== "object") {
            return option;
        }
        const preferredStem = options.useNonactiveImperfectiveCore === true
            ? (option.imperfectiveStem || option.stem)
            : (option.perfectiveStem || option.stem);
        if (!preferredStem || preferredStem === option.stem) {
            return option;
        }
        return {
            ...option,
            stem: preferredStem,
            stemSpec: buildLiteralMorphStemSpec(preferredStem),
        };
    };
    const optionsList = getVisibleNonactiveDerivationOptions(
        sourceContext.sourceStem || verb || analysisVerb,
        sourceContext.analysisStem || analysisVerb || verb || sourceContext.sourceStem,
        {
            ...options,
            nonactiveRuleSource: sourceContext,
        }
    ).map(resolveTenseSpecificOption);
    const optionMap = buildNonactiveOptionMap(optionsList);
    const optionSpecMap = buildNonactiveOptionSpecMap(optionsList);
    const realizedOptionsList = normalizeVisibleNonactiveDerivationOptions(
        optionsList.map((option) => realizeNonactiveDerivationOption(option, sourceContext))
    );
    const realizedOptionMap = buildNonactiveOptionMap(realizedOptionsList);
    const realizedOptionSpecMap = buildNonactiveOptionSpecMap(realizedOptionsList);
    const hasExplicitSelectedSuffix = Object.prototype.hasOwnProperty.call(options, "selectedSuffix");
    let selectedSuffix = hasExplicitSelectedSuffix
        ? String(options.selectedSuffix || "").trim().toLowerCase() || null
        : getSelectedNonactiveSuffix();
    if (options.forceAll) {
        selectedSuffix = null;
    }
    if (selectedSuffix && !optionMap.has(selectedSuffix)) {
        selectedSuffix = null;
        if (!hasExplicitSelectedSuffix) {
            setSelectedNonactiveSuffix(null);
        }
    }
    let selectedStem = null;
    let selectedStems = [];
    let selectedStemSpec = null;
    let selectedStemSpecs = [];
    let selectedRealizedStem = null;
    let selectedRealizedStems = [];
    let selectedRealizedStemSpec = null;
    let selectedRealizedStemSpecs = [];
    if (selectedSuffix && optionMap.has(selectedSuffix)) {
        selectedStems = optionMap.get(selectedSuffix) || [];
        selectedStemSpecs = optionSpecMap.get(selectedSuffix) || [];
        selectedStemSpec = selectedStemSpecs[0] || null;
        selectedStem = selectedStems[0] || null;
        selectedRealizedStems = realizedOptionMap.get(selectedSuffix) || [];
        selectedRealizedStemSpecs = realizedOptionSpecMap.get(selectedSuffix) || [];
        selectedRealizedStemSpec = selectedRealizedStemSpecs[0] || null;
        selectedRealizedStem = selectedRealizedStems[0] || null;
    } else if (optionsList.length) {
        const fallback = getDefaultNonactiveSuffix(optionsList);
        const fallbackSpecs = (fallback && optionSpecMap.has(fallback))
            ? optionSpecMap.get(fallback)
            : null;
        selectedStemSpecs = getUniqueMorphStemSpecs(
            (fallbackSpecs && fallbackSpecs.length)
                ? fallbackSpecs
                : [optionsList[0]?.stemSpec]
        );
        selectedStems = selectedStemSpecs.map((spec) => realizeMorphStemSpec(spec)).filter(Boolean);
        selectedStemSpec = selectedStemSpecs[0] || null;
        selectedStem = selectedStems[0] || null;
        const realizedFallbackSpecs = (fallback && realizedOptionSpecMap.has(fallback))
            ? realizedOptionSpecMap.get(fallback)
            : null;
        selectedRealizedStemSpecs = getUniqueMorphStemSpecs(
            (realizedFallbackSpecs && realizedFallbackSpecs.length)
                ? realizedFallbackSpecs
                : [realizedOptionsList[0]?.stemSpec]
        );
        selectedRealizedStems = selectedRealizedStemSpecs
            .map((spec) => realizeMorphStemSpec(spec))
            .filter(Boolean);
        selectedRealizedStemSpec = selectedRealizedStemSpecs[0] || null;
        selectedRealizedStem = selectedRealizedStems[0] || null;
    } else {
        selectedStem = deriveNonactiveStem(verb, analysisVerb, options);
        selectedStems = selectedStem ? [selectedStem] : [];
        selectedStemSpec = selectedStem ? buildLiteralMorphStemSpec(selectedStem) : null;
        selectedStemSpecs = selectedStemSpec ? [selectedStemSpec] : [];
        selectedRealizedStemSpec = selectedStemSpec
            ? applyNonactiveSourceChainStemSpec(
                selectedStemSpec,
                selectedStem,
                sourceContext.chain,
                {
                    sourceSuffix: selectedSuffix || "",
                    policy: sourceContext.realizationPolicy || FULL_SOURCE_CHAIN_REALIZATION_POLICY,
                }
            )
            : null;
        selectedRealizedStem = selectedRealizedStemSpec
            ? realizeMorphStemSpec(selectedRealizedStemSpec, "")
            : selectedStem;
        selectedRealizedStems = selectedRealizedStem ? [selectedRealizedStem] : [];
        selectedRealizedStemSpecs = selectedRealizedStemSpec ? [selectedRealizedStemSpec] : [];
    }
    const allStemSpecs = optionsList.length
        ? getUniqueMorphStemSpecs(optionsList.map((option) => option?.stemSpec))
        : selectedStemSpecs;
    const allStems = allStemSpecs.length
        ? allStemSpecs.map((spec) => realizeMorphStemSpec(spec)).filter(Boolean)
        : (selectedStems.length ? selectedStems : []);
    const allRealizedStemSpecs = realizedOptionsList.length
        ? getUniqueMorphStemSpecs(realizedOptionsList.map((option) => option?.stemSpec))
        : selectedRealizedStemSpecs;
    const allRealizedStems = allRealizedStemSpecs.length
        ? allRealizedStemSpecs.map((spec) => realizeMorphStemSpec(spec)).filter(Boolean)
        : (selectedRealizedStems.length ? selectedRealizedStems : []);
    return {
        selectedStem,
        selectedStemSpec,
        selectedStems,
        selectedStemSpecs,
        selectedRealizedStem,
        selectedRealizedStemSpec,
        selectedRealizedStems,
        selectedRealizedStemSpecs,
        allStems,
        allStemSpecs,
        allRealizedStems,
        allRealizedStemSpecs,
        selectedSuffix,
        nonactiveRuleSource: sourceContext,
    };
}
