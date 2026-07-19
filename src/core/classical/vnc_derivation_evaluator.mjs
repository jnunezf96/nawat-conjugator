// Canonical modern ESM module.

import {
  getClassicalNahuatlKarttunen1992DerivationEvidenceInventory as getSharedKarttunen1992DerivationEvidenceInventory,
  getClassicalNahuatlKarttunen1992DerivationEvidenceMatches as getSharedKarttunen1992DerivationEvidenceMatches,
} from "./karttunen_1992_derivation_evidence.mjs";
import CLASSICAL_NAHUATL_CANVAS_DERIVATION_AUTHORITY from "./canvas_lessons24_26_derivation_authority.json" with { type: "json" };

export function createClassicalNahuatlVncDerivationEvaluatorApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION = 1;
    const CLASSICAL_NAHUATL_CANVAS_DERIVATION_CHOICE_KIND = "classical-nahuatl-canvas-derivation-choice-frame";
    const CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH = 12;
    const CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES = Object.freeze(["direct", "causative", "applicative"]);
    const CLASSICAL_NAHUATL_VNC_DERIVATION_OBJECT_KINDS = Object.freeze(["specific-projective", "reflexive", "nonspecific-human", "nonspecific-nonhuman"]);
    const CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS = Object.freeze(["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]);
    const CLASSICAL_NAHUATL_VNC_DERIVATION_BASE_SOURCE_KINDS = Object.freeze([
      "classical-nahuatl-lesson7-verbstem-class-machinery-frame",
      "classical-nahuatl-lesson23-multiple-object-vnc-machinery-frame"
    ]);
    const CLASSICAL_NAHUATL_VNC_DERIVATION_VOICE_SOURCE_KIND = "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame";
    const CLASSICAL_NAHUATL_VNC_DERIVATION_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_WITNESSES = Object.freeze([Object.freeze({
      sourceStem: "tomi",
      sourceClass: "B",
      sourceValence: "intransitive",
      sourceObjectCount: 0,
      targetStem: "tom-a",
      targetClass: "B",
      ruleId: "cn-l24-2431a-tomi-tom-a",
      ruleTagId: "cn-l24-type-one-causative-a",
      andrewsSection: "24.3.1.a",
      formationLesson: "24",
      evidenceSections: Object.freeze(["24.3.1.a", "24.8.1", "24.9"]),
      scopeModel: "causative-source-vnc-core",
      scopeSection: "24.9",
      scopeRule: "The causative governs the source subject together with the source VNC core.",
      participantRule: "The source subject becomes the causative object and a new outer subject is imported.",
      derivationSubtype: "type-one",
      derivationRoute: "type-one-replacement-exact"
    }), Object.freeze({
      sourceStem: "tēmi",
      sourceClass: "B",
      sourceValence: "intransitive",
      sourceObjectCount: 0,
      targetStem: "tēm-a",
      targetClass: "B",
      ruleId: "cn-l24-2431a-temi-tem-a",
      ruleTagId: "cn-l24-type-one-causative-a",
      andrewsSection: "24.3.1.a",
      formationLesson: "24",
      evidenceSections: Object.freeze(["24.3.1.a", "24.8.1", "24.9"]),
      scopeModel: "causative-source-vnc-core",
      scopeSection: "24.9",
      scopeRule: "The causative governs the source subject together with the source VNC core.",
      participantRule: "The source subject becomes the causative object and a new outer subject is imported.",
      derivationSubtype: "type-one",
      derivationRoute: "type-one-replacement-exact"
    })]);
    const CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_NEGATIVE_LICENSES = Object.freeze([Object.freeze({
      sourceStem: "pil-i-hui",
      sourceClass: "B",
      sourceValence: "intransitive",
      blockedRoute: "type-one-destockal-hui-to-o-a",
      andrewsSection: "24.7 note 2",
      reason: "The documented i-hui source has no o-a causative counterpart."
    })]);
    const CLASSICAL_NAHUATL_LESSONS24_25_SOURCE_ANALYSIS_WITNESSES = Object.freeze([Object.freeze({
      analysisId: "cn-l24-2431a-huaqui-fused-destockal",
      sourceAliases: Object.freeze(["huā-qui", "huāqui", "hua-qui", "huaqui"]),
      categories: Object.freeze(["fused-destockal-final-i", "type-one-consonant-alternation"]),
      canonicalSegments: Object.freeze(["huā", "qui"]),
      andrewsSections: Object.freeze(["24.3.1.a", "24.5.9", "25.8"])
    }), Object.freeze({
      analysisId: "cn-l24-2432b-yocoya-retentive-exception",
      sourceAliases: Object.freeze(["yōco-ya", "yōcoya", "yoco-ya", "yocoya"]),
      categories: Object.freeze(["root-plus-ya", "root-plus-ya-retentive-exception"]),
      canonicalSegments: Object.freeze(["yōco", "ya"]),
      andrewsSections: Object.freeze(["24.3.2.b note"])
    }), Object.freeze({
      analysisId: "cn-l25-253-mahui-hidden-o-hua",
      sourceAliases: Object.freeze(["mahui"]),
      categories: Object.freeze(["hidden-nonactive-o-hua", "type-two-consonant-alternation"]),
      canonicalSegments: Object.freeze(["mahu", "i"]),
      andrewsSections: Object.freeze(["25.3"])
    }), Object.freeze({
      analysisId: "cn-l25-253-254-quemi-hidden-bases",
      sourceAliases: Object.freeze(["quēmi", "quemi"]),
      categories: Object.freeze(["hidden-nonactive-o-hua", "hidden-nonactive-lo", "type-two-consonant-alternation"]),
      canonicalSegments: Object.freeze(["quēm", "i"]),
      andrewsSections: Object.freeze(["25.3", "25.4"])
    }), Object.freeze({
      analysisId: "cn-l25-251-yauh-suppletive-source",
      sourceAliases: Object.freeze(["ya-uh", "yauh"]),
      categories: Object.freeze(["suppletive-causative-source"]),
      canonicalSegments: Object.freeze(["ya", "uh"]),
      andrewsSections: Object.freeze(["25.1 note"])
    }), Object.freeze({
      analysisId: "cn-l25-251-huallauh-suppletive-source",
      sourceAliases: Object.freeze(["huāl-la-uh", "huāllauh", "hual-la-uh", "huallauh"]),
      categories: Object.freeze(["suppletive-causative-source", "directional-suppletive-causative-source"]),
      canonicalSegments: Object.freeze(["huāl", "la", "uh"]),
      andrewsSections: Object.freeze(["25.1 note"])
    }), Object.freeze({
      analysisId: "cn-l24-2459-mini-fused-destockal",
      sourceAliases: Object.freeze(["mī-ni", "mīni"]),
      categories: Object.freeze(["destockal-ni-candidate", "fused-destockal-ni-exact"]),
      canonicalSegments: Object.freeze(["mi", "i", "ni"]),
      andrewsSections: Object.freeze(["24.5.9"])
    }), Object.freeze({
      analysisId: "cn-l24-2459-xini-fused-destockal",
      sourceAliases: Object.freeze(["xī-ni", "xīni", "xi-ni", "xini"]),
      categories: Object.freeze(["destockal-ni-candidate", "fused-destockal-ni-exact"]),
      canonicalSegments: Object.freeze(["xi", "i", "ni"]),
      andrewsSections: Object.freeze(["24.5.9"])
    }), Object.freeze({
      analysisId: "cn-l24-2459-cehui-fused-destockal",
      sourceAliases: Object.freeze(["cē-hui", "cēhui"]),
      categories: Object.freeze(["destockal-hui-candidate", "fused-destockal-hui-exact"]),
      canonicalSegments: Object.freeze(["ce", "ē", "hui"]),
      andrewsSections: Object.freeze(["24.5.9"])
    }), Object.freeze({
      analysisId: "cn-l24-2457b-tlapihui-addition-preference",
      sourceAliases: Object.freeze(["tlap-ī-hui", "tlapīhui", "tlap-i-hui", "tlapihui"]),
      categories: Object.freeze(["destockal-hui-candidate"]),
      canonicalSegments: Object.freeze(["tlap", "ī", "hui"]),
      andrewsSections: Object.freeze(["24.5.7"])
    })]);
    const CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_ALTERNATIONS = Object.freeze([Object.freeze({
      sourceAliases: Object.freeze(["ē-hua", "ēhua"]),
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "ē-hu-a",
      unmarkedTargetStem: "e-hu-a",
      targetClass: "B",
      ruleId: "cn-l24-2432a-ehua-e-hu-a",
      andrewsSection: "24.3.2.a",
      derivationRoute: "type-one-final-a-morphological-replacement-exact",
      procedure: "replace-the-source-final-a-with-homophonous-causative-a-and-expose-the-hu-a-boundary",
      targetConstruction: Object.freeze({ operation: "morphological-replacement", preserve: "ē-hu", remove: "source-a", add: "causative-a", surfaceChange: false })
    }), Object.freeze({
      sourceAliases: Object.freeze(["huā-qui", "huāqui", "hua-qui", "huaqui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "huā-tz-a",
      unmarkedTargetStem: "hua-tz-a",
      causativeCitationRole: "tla",
      targetClass: "B",
      ruleId: "cn-l24-2431a-huaqui-huatza",
      andrewsSection: "24.3.1.a",
      derivationRoute: "type-one-final-i-consonant-alternation-exact",
      procedure: "replace-final-qui-with-tz-plus-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-final-and-consonant", remove: "qui", add: "tz-a" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["zahui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "zahu-a",
      unmarkedTargetStem: "zahu-a",
      targetClass: "B",
      ruleId: "cn-l24-2431a-zahui-zahua",
      andrewsSection: "24.3.1.a",
      derivationRoute: "type-one-final-i-replacement-exact-simple-source",
      procedure: "treat-the-attested-source-as-simple-final-i-and-replace-i-with-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-final", remove: "i", add: "a", blocksCompetingAnalysis: "destockal-i-hui" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["ilpi"]),
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "ilpi-ā",
      unmarkedTargetStem: "ilpi-ā",
      targetClass: "C",
      ruleId: "cn-l24-2431b-ilpi-ilpia",
      andrewsSection: "24.3.1.b",
      derivationRoute: "type-one-final-i-addition-exact-long-a",
      procedure: "preserve-final-i-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["aqui"]),
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "aqui-ā",
      unmarkedTargetStem: "aqui-ā",
      targetClass: "C",
      ruleId: "cn-l24-2431b-aqui-aquia",
      andrewsSection: "24.3.1.b",
      derivationRoute: "type-one-final-i-addition-exact-long-a",
      procedure: "preserve-final-i-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["pah-ti"]),
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "pah-ti-ā",
      unmarkedTargetStem: "pah-ti-ā",
      targetClass: "C",
      ruleId: "cn-l24-2431b-pahti-pahtia",
      andrewsSection: "24.3.1.b",
      derivationRoute: "type-one-final-i-addition-exact-long-a",
      procedure: "preserve-denominal-ti-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["coco-ya"]),
      sourceClasses: Object.freeze(["A", "B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "coco-ā",
      unmarkedTargetStem: "coco-ā",
      targetClass: "C",
      ruleId: "cn-l24-2432b-cocoya-cocoa",
      andrewsSection: "24.3.2.b",
      derivationRoute: "type-one-root-plus-ya-replacement-exact-long-a",
      procedure: "delete-derivational-ya-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-morpheme", remove: "ya", add: "ā", suffixQuantity: "long" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["tlap-ī-hui-ya"]),
      sourceClasses: Object.freeze(["A", "B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "tlap-ī-hui-ā",
      unmarkedTargetStem: "tlap-ī-hui-ā",
      targetClass: "C",
      ruleId: "cn-l24-2432b-tlapihuiya-tlapihuia",
      andrewsSection: "24.3.2.b",
      derivationRoute: "type-one-root-plus-ya-replacement-exact-quantity",
      procedure: "delete-derivational-ya-preserve-internal-long-i-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-morpheme", remove: "ya", preserveInternalQuantity: true, add: "ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["ōl-ī-ni"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "ōl-ī-ni-ā",
      unmarkedTargetStem: "ol-i-ni-a",
      targetClass: "C",
      ruleId: "cn-l24-2457a-olini-olinia",
      andrewsSection: "24.5.7",
      derivationRoute: "type-one-destockal-ni-addition-exact-quantity",
      procedure: "preserve-destockal-ni-quantity-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "append", preserveSource: true, preserveInternalQuantity: true, add: "ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["chay-ā-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "chay-ā-hu-a",
      unmarkedTargetStem: "chay-a-hu-a",
      targetClass: "B",
      ruleId: "cn-l24-2457b-chayahui-chayahua",
      andrewsSection: "24.5.7",
      derivationRoute: "type-one-destockal-hui-replacement-exact-quantity",
      procedure: "replace-final-hui-with-hu-a-and-preserve-stock-vowel-quantity",
      targetConstruction: Object.freeze({ operation: "replace-morpheme", preserveInternalQuantity: true, remove: "hui", add: "hu-a" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["tlap-ī-hui", "tlap-i-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "tlap-ī-hui-ā",
      unmarkedTargetStem: "tlap-ī-hui-ā",
      targetClass: "C",
      ruleId: "cn-l24-2457b-tlapihui-tlapihuia",
      andrewsSection: "24.5.7",
      derivationRoute: "type-one-destockal-hui-addition-exact-long-a",
      procedure: "preserve-destockal-hui-and-append-long-causative-a",
      targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["pol-i-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "pol-o-ā",
      unmarkedTargetStem: "pol-o-ā",
      targetClass: "C",
      ruleId: "cn-l24-247-polihui-poloa",
      andrewsSection: "24.7",
      derivationRoute: "type-one-destockal-hui-to-o-a-exact-long-a",
      procedure: "replace-i-hui-with-o-plus-long-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-morpheme-sequence", remove: "i-hui", add: "o-ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["tlal-i-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "tlal-o-ā",
      unmarkedTargetStem: "tlal-o-ā",
      targetClass: "C",
      ruleId: "cn-l24-247-tlalihui-tlaloa",
      andrewsSection: "24.7",
      derivationRoute: "type-one-destockal-hui-to-o-a-exact-long-a",
      procedure: "replace-i-hui-with-o-plus-long-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-morpheme-sequence", remove: "i-hui", add: "o-ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["pix-a-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "pix-o-ā",
      unmarkedTargetStem: "pix-o-ā",
      targetClass: "C",
      ruleId: "cn-l24-247-pixahui-pixoa",
      andrewsSection: "24.7",
      derivationRoute: "type-one-destockal-hui-to-o-a-exact-long-a",
      procedure: "replace-a-hui-with-o-plus-long-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-morpheme-sequence", remove: "a-hui", add: "o-ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["tlap-o-hui"]),
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "tlap-o-ā",
      unmarkedTargetStem: "tlap-o-ā",
      targetClass: "C",
      ruleId: "cn-l24-247-note1-tlapohui-tlapoa",
      andrewsSection: "24.7 note 1",
      derivationRoute: "type-one-destockal-o-hui-to-o-a-exact-long-a",
      procedure: "replace-final-hui-with-long-causative-a",
      targetConstruction: Object.freeze({ operation: "replace-morpheme", remove: "hui", add: "ā" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["pil-ca"]),
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "pil-o-ā",
      unmarkedTargetStem: "pil-o-ā",
      targetClass: "C",
      ruleId: "cn-l24-247-note2-pilca-piloa",
      andrewsSection: "24.7 note 2",
      derivationRoute: "type-one-totally-irregular-pilca-piloa-exact",
      procedure: "apply-the-bounded-pilca-to-piloa-lexical-relation",
      targetConstruction: Object.freeze({ operation: "exact-lexical-replacement", remove: "pil-ca", add: "pil-o-ā", productiveFinalCaRule: false })
    }), Object.freeze({
      sourceAliases: Object.freeze(["pīn-ā-hua"]),
      sourceClasses: Object.freeze(["A", "B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "pin-ā-hu-a",
      unmarkedTargetStem: "pin-ā-hu-a",
      targetClass: "B",
      ruleId: "cn-l25-258-pinahua-pinahua-type-one",
      andrewsSection: "25.8",
      derivationRoute: "type-one-destockal-hua-replacement-exact-quantity",
      procedure: "replace-hua-with-hu-a-and-shorten-the-attested-root-vowel",
      targetConstruction: Object.freeze({ operation: "replace-morpheme-with-quantity-alternation", internalChange: "ī-to-i", remove: "hua", add: "hu-a" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["yōco-ya", "yōcoya", "yoco-ya", "yocoya"]),
      sourceClasses: Object.freeze(["A", "B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      markedTargetStem: "yōco-y-a",
      unmarkedTargetStem: "yōco-y-a",
      targetClass: "B",
      ruleId: "cn-l24-2432b-yocoya-retains-y-a",
      andrewsSection: "24.3.2.b note",
      derivationRoute: "type-one-root-plus-ya-retentive-exception-exact",
      procedure: "preserve-root-final-y-and-replace-source-a-with-causative-a",
      targetConstruction: Object.freeze({ operation: "morphological-replacement", preserve: "y", remove: "source-a", add: "causative-a", surfaceChange: false })
    })]);
    const CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_DESTOCKAL_ALTERNATIONS = Object.freeze([Object.freeze({
      sourceAliases: Object.freeze(["pach-i-hui", "pachihui"]),
      sourceClasses: Object.freeze(["B"]),
      targetStem: "pach-o-ā",
      targetClass: "C",
      ruleId: "cn-l25-2524-pachihui-pachoa-semantic-alternative",
      andrewsSection: "25.2.4",
      derivationRoute: "type-one-destockal-pachihui-to-pachoa-exact-semantic-alternative",
      procedure: "select-the-attested-pressed-down-sense-and-replace-i-hui-with-o-plus-long-causative-a",
      sourceAnalysisCategory: "destockal-i-a-o-hui",
      targetConstruction: Object.freeze({ operation: "replace-morpheme-sequence", remove: "i-hui", add: "o-ā", semanticSelection: "pressed-down-sense" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["mī-ni", "mīni"]),
      sourceClasses: Object.freeze(["B"]),
      targetStem: "mī-n-a",
      causativeCitationRole: "tla",
      targetClass: "B",
      ruleId: "cn-l24-2459-mini-mi-n-a",
      andrewsSection: "24.5.9",
      derivationRoute: "type-one-fused-destockal-mini-replacement-exact",
      procedure: "recover-underlying-mi-i-ni-and-preserve-the-coalesced-long-vowel-while-replacing-final-i-with-causative-a",
      sourceAnalysisCategory: "fused-destockal-ni-exact",
      targetConstruction: Object.freeze({ operation: "recover-fused-stock-and-replace", underlyingSource: "mi-ī-ni", preserveCoalescedQuantity: true, remove: "i-ni", add: "i-n-a" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["xī-ni", "xīni", "xi-ni", "xini"]),
      sourceClasses: Object.freeze(["B"]),
      targetStem: "xī-ni-ā",
      causativeCitationRole: "tla",
      targetClass: "C",
      ruleId: "cn-l24-2459-xini-xi-ni-a",
      andrewsSection: "24.5.9",
      derivationRoute: "type-one-fused-destockal-xini-addition-exact",
      procedure: "recover-underlying-xi-i-ni-with-root-lengthening-and-add-causative-a",
      sourceAnalysisCategory: "fused-destockal-ni-exact",
      targetConstruction: Object.freeze({ operation: "recover-fused-stock-and-append", underlyingSource: "xi-ī-ni", preserve: "ni", add: "ā", rootVowelChange: "i-to-ī" })
    }), Object.freeze({
      sourceAliases: Object.freeze(["cē-hui", "cēhui"]),
      sourceClasses: Object.freeze(["B"]),
      targetStem: "cē-hui-ā",
      causativeCitationRole: "tla",
      targetClass: "C",
      ruleId: "cn-l24-2459-cehui-ce-hui-a",
      andrewsSection: "24.5.9",
      derivationRoute: "type-one-fused-destockal-cehui-addition-exact",
      procedure: "preserve-fused-ce-e-hui-source-and-add-causative-a",
      sourceAnalysisCategory: "fused-destockal-hui-exact",
      targetConstruction: Object.freeze({ operation: "recover-fused-stock-and-append", underlyingSource: "ce-ē-hui", preserve: "cē-hui", add: "ā" })
    })]);
    const CLASSICAL_NAHUATL_TYPE_ONE_DESTOCKAL_PREFERENCE_OVERRIDES = Object.freeze([Object.freeze({
      sourceAliases: Object.freeze(["tlap-a-ni", "tlapani"]),
      preferredProcedure: "replacement",
      ruleId: "cn-l24-2457a-tlapani-prefers-replacement"
    }), Object.freeze({
      sourceAliases: Object.freeze(["tzay-ā-ni", "tzayāni"]),
      preferredProcedure: "replacement",
      ruleId: "cn-l24-2457a-tzayani-prefers-replacement"
    }), Object.freeze({
      sourceAliases: Object.freeze(["cot-ō-ni", "cotōni"]),
      preferredProcedure: "replacement",
      ruleId: "cn-l24-2457a-cotoni-prefers-replacement"
    }), Object.freeze({
      sourceAliases: Object.freeze(["tlap-ī-hui", "tlapīhui", "tlap-i-hui", "tlapihui"]),
      preferredProcedure: "addition",
      ruleId: "cn-l24-2457b-tlapihui-prefers-addition"
    })]);
    const CLASSICAL_NAHUATL_FINAL_O_HUIA_EXACT_ROUTE_CHOICES = Object.freeze([Object.freeze({
      sourceStem: "temō",
      route: "direct"
    }), Object.freeze({
      sourceStem: "tlehcō",
      route: "replacive"
    }), Object.freeze({
      sourceStem: "panō",
      route: "replacive"
    })]);
    const CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_LICENSES = Object.freeze([Object.freeze({
      derivationLicenseId: "cn-l25-2515-cui-cuitia",
      sourceStem: "cui",
      sourceClass: "A",
      sourceValence: "specific-projective",
      sourceValences: Object.freeze(["specific-projective", "projective-human", "projective-nonhuman", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal"]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      lesson20NonactiveStem: "cuī-hua",
      lesson20SuffixFamily: "hua",
      targetStem: "cuī-tiā",
      targetClass: "C",
      ruleId: "cn-l25-2515-cui-cuitia-surface",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.15",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.2", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-exact-cui-hua-license"
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-chihua-lo-to-chihua-l-tia",
      sourceStem: "chihua",
      sourceClass: "A",
      sourceValence: "specific-projective",
      sourceValences: Object.freeze(["specific-projective", "projective-human", "projective-nonhuman", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal"]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      lesson20OptionId: "lō:chīhua-lō",
      lesson20RuleId: "cn-l20-2-chihua",
      lesson20NonactiveStem: "chīhua-lō",
      lesson20SuffixFamily: "lō",
      targetStem: "chīhua-l-tiā",
      targetClass: "C",
      ruleId: "cn-l25-254-chihua-lo-to-chihua-l-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.4",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.4", "25.11.1", "25.15"]),
      scopeModel: "causative-source-vnc-core",
      scopeSection: "24.9",
      scopeRule: "The causative governs the source subject together with the source VNC core.",
      participantRule: "The source subject becomes the causative object; the older source object remains at its earlier derivational level.",
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-exact-chihua-lo-license"
    }), Object.freeze({
      derivationLicenseId: "cn-l25-253-mahui-mauh-tia",
      sourceStem: "mahui",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      lesson20NonactiveStem: "mahu-o-hua",
      lesson20SuffixFamily: "o-hua",
      targetStem: "mauh-tiā",
      targetClass: "C",
      ruleId: "cn-l25-253-mahui-mauh-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.3",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.3", "25.9", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-o-hua-w-to-uh-exact"
    }), Object.freeze({
      derivationLicenseId: "cn-l25-253-quemi-quen-tia",
      sourceStem: "quēmi",
      sourceClass: "B",
      sourceValence: "specific-projective",
      sourceValences: Object.freeze(["specific-projective", "projective-human", "projective-nonhuman", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal"]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      lesson20NonactiveStem: "quēm-o-hua",
      lesson20SuffixFamily: "o-hua",
      targetStem: "quēn-tiā",
      targetClass: "C",
      ruleId: "cn-l25-253-quemi-quen-tia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.3",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.3", "25.11", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-o-hua-m-to-n-exact"
    }), Object.freeze({
      derivationLicenseId: "cn-l25-254-quemi-quemiltia",
      sourceStem: "quēmi",
      sourceClass: "B",
      sourceValence: "specific-projective",
      sourceValences: Object.freeze(["specific-projective", "projective-human", "projective-nonhuman", "mainline-reflexive", "shuntline-reflexive", "human-reciprocal"]),
      minimumSourceObjectCount: 1,
      maximumSourceObjectCount: 1,
      lesson20NonactiveStem: "quēmi-lō",
      lesson20SuffixFamily: "lō",
      targetStem: "quēmi-l-tiā",
      targetClass: "C",
      ruleId: "cn-l25-254-quemi-quemiltia-surface",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.4",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.4", "25.11", "25.15"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-exact-quemi-lo-license"
    }), Object.freeze({
      derivationLicenseId: "cn-l25-258-huaqui-huaquiltia",
      sourceStem: "huā-qui",
      sourceClass: "B",
      sourceValence: "intransitive",
      minimumSourceObjectCount: 0,
      maximumSourceObjectCount: 0,
      lesson20NonactiveStem: "huā-qui-lō",
      lesson20SuffixFamily: "lō",
      targetStem: "huā-qui-l-tiā",
      targetClass: "C",
      ruleId: "cn-l25-258-huaqui-huaquiltia",
      ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
      andrewsSection: "25.8",
      formationLesson: "25",
      evidenceSections: Object.freeze(["25.1", "25.4", "25.8", "25.9"]),
      derivationSubtype: "type-two",
      derivationRoute: "type-two-tia-from-exact-huaqui-lo-license",
      causativeCitationRole: "tla"
    })]);
    const CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_TYPED_BRIDGES = Object.freeze([Object.freeze({
      sourceStem: "pol-i-hui",
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      nonactiveStem: "pol-i-huī-hua",
      suffixFamily: "hua",
      targetStem: "pol-i-huī-tiā",
      targetClass: "C",
      ruleId: "cn-l25-2524-polihui-long-hui-hidden-hua",
      andrewsSection: "25.2.4",
      derivationRoute: "type-two-tia-from-exact-destockal-long-hui-hidden-hua",
      citationVisibility: "implicit",
      hypothetical: false
    }), Object.freeze({
      sourceStem: "hue-tz-ca",
      sourceClasses: Object.freeze(["A"]),
      sourceValences: Object.freeze(["projective-nonhuman"]),
      sourceObjectCount: 1,
      nonactiveStem: "hue-tz-qui-hua",
      suffixFamily: "hua",
      targetStem: "hue-tz-qui-tiā",
      targetClass: "C",
      ruleId: "cn-l25-2524-huetzca-projective-hidden-hua",
      andrewsSection: "25.2.4",
      derivationRoute: "type-two-tia-from-exact-valence-sensitive-hidden-hua",
      citationVisibility: "implicit",
      hypothetical: true
    }), Object.freeze({
      sourceStem: "cual-ā-ni",
      sourceClasses: Object.freeze(["B"]),
      sourceValences: Object.freeze(["intransitive"]),
      sourceObjectCount: 0,
      nonactiveStem: "cual-ā-n-ō",
      suffixFamily: "ō",
      targetStem: "cual-ā-n-tiā",
      targetClass: "C",
      ruleId: "cn-l25-253-cualani-exact-o-bridge",
      andrewsSection: "25.3",
      derivationRoute: "type-two-tia-from-exact-o-nonactive-bridge",
      citationVisibility: "visible",
      hypothetical: false
    })]);
    // These overlays are bounded lexical realization facts over an already
    // licensed typed rule. They do not create a derivation from a target string:
    // the source profile and, where applicable, its canonical Lesson 20
    // nonactive record must first select the underlying route. This keeps the
    // productive category useful for arbitrary input while reproducing the
    // quantity and internal boundaries printed in Lesson 25.
    const CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_SURFACE_OVERLAYS = Object.freeze([
      ["cochi", ["B"], ["intransitive"], ["cochī-hua"], "", "cochī-tiā", "cn-l25-252-cochi-cochitia-surface"],
      ["ī", ["A"], ["specific-projective"], ["ī-hua"], "", "ī-tiā", "cn-l25-252-i-itia-surface"],
      ["itqui", ["A"], ["specific-projective", "projective-nonhuman"], ["itquī-hua"], "", "itqui-tiā", "cn-l25-252-itqui-itquitia-surface", false, { stem: "itqui-hua", hypothetical: false }],
      ["caqui", ["B"], ["specific-projective", "projective-nonhuman"], ["caqui-hua"], "", "caquī-tiā", "cn-l25-2521-caqui-caquitia-surface"],
      ["caquī-tiā", ["C"], ["multiple-object", "specific-projective"], [], "lo-nonactive", "caqui-ti-l-tiā", "cn-l25-2512-recursive-caqui-quantity-surface"],
      ["neci", ["B"], ["intransitive"], ["nēxi-hua"], "", "nēxi-tiā", "cn-l25-2522-neci-nexitia-surface"],
      ["iuc-ci", ["A"], ["intransitive"], ["iuc-xi-hua"], "", "iuc-xi-tiā", "cn-l25-2522-iucci-iucxitia-surface", true],
      ["ihza", ["A"], ["intransitive"], ["ihxi-hua"], "", "ihxi-tiā", "cn-l25-2522-ihza-ihxitia-surface"],
      ["itta", ["A"], ["specific-projective", "projective-nonhuman"], ["itt-ī-hua"], "", "itt-ī-tiā", "cn-l25-2523-itta-ittitia-surface"],
      ["mati", ["B"], ["specific-projective", "projective-nonhuman"], ["machi-hua"], "", "machi-tiā", "cn-l25-2523-mati-machitia-surface"],
      ["hue-tz-ca", ["A"], ["intransitive"], ["hue-tz-qui-hua"], "", "hue-tz-qui-tia", "cn-l25-2524-huetzca-intransitive-surface"],
      ["hue-tz-ca", ["A"], ["specific-projective"], ["hue-tz-qui-hua"], "", "hue-tz-qui-tiā", "cn-l25-2524-huetzca-transitive-surface"],
      ["tomi", ["B"], ["intransitive"], ["tom-o-hua"], "", "tom-tia", "cn-l25-253-tomi-tom-tia-surface"],
      ["quīza", ["B"], ["intransitive"], ["quīx-o-hua", "quix-o-hua"], "", "quīx-tiā", "cn-l25-253-quiza-quixtia-surface", false, { stem: "quix-o-hua", hypothetical: false }],
      ["mati", ["B"], ["intransitive", "specific-projective", "projective-nonhuman"], ["mach-ō"], "", "mach-tiā", "cn-l25-253-mati-machtia-surface"],
      ["itta", ["A"], ["specific-projective", "projective-nonhuman"], ["itta-lō", "itt-a-lō"], "", "itt-a-l-tiā", "cn-l25-254-itta-ittaltia-surface", false, { stem: "itt-a-lō", hypothetical: false }],
      ["chol-o-ā", ["C"], ["intransitive"], ["chol-o-lō", "chol-ō-lō"], "", "chol-o-l-tiā", "cn-l25-254-choloa-chololtia-surface", false, { stem: "chol-o-lō", hypothetical: false }],
      ["cuā", ["D"], ["specific-projective"], ["cua-lō", "cuā-lō"], "", "cua-l-tiā", "cn-l25-254-cua-cualtia-surface"],
      ["piya", ["B"], ["specific-projective"], ["piya-lō"], "", "piya-l-tiā", "cn-l25-25113-piya-piyaltia-surface"],
      ["maca", ["A"], ["specific-projective", "multiple-object"], ["maqui-lō"], "", "maqui-l-tiā", "cn-l25-2541-maca-maquiltia-surface"],
      ["caqui", ["B"], ["specific-projective", "projective-nonhuman"], ["caqui-lō"], "", "caqui-l-tiā", "cn-l25-2541-caqui-caquiltia-surface"],
      ["tzacu-a", ["B"], ["specific-projective", "projective-nonhuman"], ["tzacu-i-lō"], "", "tzacu-i-l-tiā", "cn-l25-2543-tzacua-tzacuilitia-surface"],
      ["imacaci", ["B"], ["specific-projective", "projective-human"], ["imacaxi-lō"], "", "imacaxi-l-tiā", "cn-l25-2544-imacaci-imacaxiltia-surface"],
      ["ihza", ["A"], ["intransitive"], ["ihxi-lō"], "", "ihxi-l-tiā", "cn-l25-2544-ihza-ihxiltia-surface"],
      ["mati", ["B"], ["specific-projective", "projective-nonhuman"], ["machi-lō"], "", "machi-l-tiā", "cn-l25-2546-mati-machiltia-surface"],
      ["itz-ti", ["A"], ["intransitive"], ["itz-ti-lō"], "", "itz-ti-l-tiā", "cn-l25-2547-itzti-itztlivia-surface"],
      ["āhui-ya", ["A", "B"], ["intransitive"], [], "root-plus-ya-lia", "āhui-l-tiā", "cn-l25-2548-ahuiya-reduced-ya-surface"],
      ["āhui-ya", ["A", "B"], ["intransitive"], ["āhui-ya-lō"], "", "āhui-ya-l-tiā", "cn-l25-2548-ahuiya-retained-ya-surface"],
      ["nel-ti", ["A"], ["intransitive"], [], "denominal-ti-lia", "nel-ti-liā", "cn-l25-2551-nelti-neltilia-surface"],
      ["ce-ce-ya", ["A", "B"], ["intransitive"], [], "root-plus-ya-lia", "ce-ce-liā", "cn-l25-2552-ceceya-cecelia-surface"],
      ["xoco-ya", ["A", "B"], ["intransitive"], [], "root-plus-ya-lia", "xoco-liā", "cn-l25-2552-xocoya-xocolia-surface"],
      ["chichi-ya", ["A", "B"], ["intransitive"], [], "root-plus-ya-lia", "chichi-liā", "cn-l25-2552-chichiya-chichilia-surface"],
      ["te-ti-ya", ["A", "B"], ["intransitive"], [], "root-plus-ya-lia", "te-ti-liā", "cn-l25-2552-tetiya-tetilia-surface"],
      ["xo-xō-hui-ya", ["A", "B"], ["intransitive"], [], "root-plus-ya-lia", "xo-xō-hui-liā", "cn-l25-2552-xoxohuiya-xoxohuilia-surface"],
      ["on-o", ["A"], ["intransitive"], ["on-o-lō"], "", "on-o-l-tiā", "cn-l25-256-ono-onoltia-surface"],
      
    ].map(([sourceStem, sourceClasses, sourceValences, lesson20NonactiveStems, routeIncludes, targetStem, ruleId, supportiveInitialI = false, canvasBridge = null]) => Object.freeze({
      sourceStem,
      sourceClasses: Object.freeze(sourceClasses),
      sourceValences: Object.freeze(sourceValences),
      lesson20NonactiveStems: Object.freeze(lesson20NonactiveStems),
      routeIncludes,
      targetStem,
      ruleId,
      supportiveInitialI,
      canvasBridge: canvasBridge ? Object.freeze({ ...canvasBridge }) : null
    })));
    // Exact witnesses refine productive categories; they never act as the
    // source whitelist for the reusable Lesson 26 rules below.
    const CLASSICAL_NAHUATL_APPLICATIVE_EXACT_LICENSES = Object.freeze([Object.freeze({
      derivationLicenseId: "cn-l26-2691-xeloa-xel-huia",
      sourceStem: "xeloa",
      sourceClass: "C",
      sourceValence: "specific-projective",
      sourceObjectCount: 1,
      targetStem: "xel-huiā",
      suffix: "huiā",
      targetClass: "C",
      ruleId: "cn-l26-2691-xeloa-huia-exception",
      ruleTagId: "cn-l26-applicative-imported-object-transform",
      andrewsSection: "26.9.1",
      formationLesson: "26",
      evidenceSections: Object.freeze(["26.9.1", "26.14", "26.16.2", "26.23"]),
      scopeModel: "applicative-object-suffix-discontinuous-unit",
      scopeSection: "26.23",
      scopeRule: "The imported object and applicative suffix form a discontinuous unit; the source VNC is not the applicative object.",
      participantRule: "The source subject is preserved while a new applicative object is imported above older source objects.",
      derivationSubtype: "type-two-huia-exact",
      derivationRoute: "type-two-huia-from-exact-xeloa-source-license"
    })]);
    const CLASSICAL_NAHUATL_APPLICATIVE_FINAL_TL_TO_T_EXACT_LICENSES = Object.freeze([Object.freeze({
      derivationLicenseId: "cn-l26-267-patla-pa-ti-lia",
      sourceStem: "pa-tla",
      sourceClass: "A",
      sourceValence: "specific-projective",
      sourceObjectCount: 1,
      targetStem: "pa-ti-lia",
      ruleId: "cn-l26-267-patla-pa-ti-lia",
      andrewsSection: "26.7",
      exactWitness: "tla-(pa-tla) > te+tla-(pa-ti-lia)",
      evidenceSections: Object.freeze(["26.7", "26.14", "26.23"])
    }), Object.freeze({
      derivationLicenseId: "cn-l26-267-tlazohtla-tlazohti-lia",
      sourceStem: "tla-zo-h-tla",
      sourceClass: "A",
      sourceValence: "specific-projective",
      sourceObjectCount: 1,
      targetStem: "tla-zo-h-ti-lia",
      ruleId: "cn-l26-267-tlazohtla-tlazohti-lia",
      andrewsSection: "26.7",
      exactWitness: "te-(tla-zo-h-tla) > te+te-(tla-zo-h-ti-lia)",
      evidenceSections: Object.freeze(["26.7", "26.14", "26.23"])
    })]);
    const CLASSICAL_NAHUATL_APPLICATIVE_EXACT_FORMATIONS = Object.freeze([
      {
        sourceAliases: ["maca"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "maca", unmarkedTargetStem: "maca", targetClass: "A",
        derivationSubtype: "inherent-applicative", derivationRoute: "inherent-applicative-valence-import",
        procedure: "preserve-inherently-applicative-stem-and-import-object", ruleId: "cn-l26-2611-inherent-maca",
        andrewsSection: "26.1.1", targetConstruction: { operation: "identity-stem-with-valence-increase" }
      },
      {
        sourceAliases: ["itzi"], sourceClasses: ["B"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "itt-a", unmarkedTargetStem: "itt-a", targetClass: "A",
        derivationSubtype: "irregular-applicative", derivationRoute: "irregular-applicative-itzi-to-itta",
        procedure: "replace-affricate-release-and-add-irregular-applicative-a", ruleId: "cn-l26-2612-itzi-itta",
        andrewsSection: "26.1.2", suppressGenericTypeOne: true,
        targetConstruction: { operation: "replace-final-tzi", remove: "tzi", add: "tt-a" }
      },
      {
        sourceAliases: ["itzi"], sourceClasses: ["B"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "itzi", unmarkedTargetStem: "itzi", targetClass: "B",
        derivationSubtype: "valence-neutral-applicative", derivationRoute: "valence-neutral-applicative-identity",
        procedure: "preserve-valence-neutral-stem-and-import-object", ruleId: "cn-l26-2612-itzi-valence-neutral",
        andrewsSection: "26.1.2", suppressGenericTypeOne: true,
        targetConstruction: { operation: "identity-stem-with-valence-increase" }
      },
      ...[
        ["huetzca", "A", "hue-tz-ca", "hue-tz-ca", "cn-l26-2613-huetzca"],
        ["mayāna", "A", "mayāna", "mayana", "cn-l26-2613-mayana"],
        ["āmiqui", "B", "ā-miqui", "a-miqui", "cn-l26-2613-amiqui"],
        ["tēmiqui", "B", "tēmiqui", "temiqui", "cn-l26-2613-temiqui"],
        ["teohcihui", "B", "teo-hc-i-hui", "teo-hc-i-hui", "cn-l26-2613-teohcihui"],
        ["nenehcihui", "B", "nene-hc-i-hui", "nene-hc-i-hui", "cn-l26-2613-nenehcihui"]
      ].map(([sourceStem, sourceClass, markedTargetStem, unmarkedTargetStem, ruleId]) => ({
        sourceAliases: [sourceStem, sourceStem.replace(/[āēīō]/gu, vowel => ({ ā: "a", ē: "e", ī: "i", ō: "o" })[vowel])],
        sourceClasses: [sourceClass], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem, unmarkedTargetStem, targetClass: sourceClass,
        derivationSubtype: "valence-neutral-applicative", derivationRoute: "valence-neutral-applicative-identity",
        procedure: "preserve-valence-neutral-stem-and-import-object", ruleId, andrewsSection: "26.1.3",
        suppressGenericTypeOne: true, targetConstruction: { operation: "identity-stem-with-valence-increase" }
      })),
      {
        sourceAliases: ["ixca"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "ixqu-iā", unmarkedTargetStem: "ixqu-ia", targetClass: "C",
        derivationSubtype: "type-one", derivationRoute: "type-one-final-ca-to-qu-ia-exact",
        procedure: "replace-final-ca-with-qu-and-add-ia", ruleId: "cn-l26-262-ixca-ixquia",
        andrewsSection: "26.2", suppressGenericTypeOne: true,
        targetConstruction: { operation: "replace-final", remove: "ca", add: "qu-iā" }
      },
      {
        sourceAliases: ["ohquetza", "oh-quetza"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "oh-quech-iā", unmarkedTargetStem: "oh-quech-ia", targetClass: "C",
        derivationSubtype: "type-one", derivationRoute: "type-one-final-tza-to-ch-ia-exact",
        procedure: "replace-final-tza-with-ch-and-add-ia", ruleId: "cn-l26-262-ohquetza-ohquechia",
        andrewsSection: "26.2", suppressGenericTypeOne: true,
        targetConstruction: { operation: "replace-final", remove: "tza", add: "ch-iā" }
      },
      {
        sourceAliases: ["tlatzihui", "tlatz-i-hui"], sourceClasses: ["B"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "tlatz-i-l-huiā", unmarkedTargetStem: "tlatz-i-l-huia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-irregular-final-hui-to-i-l-huia-exact",
        procedure: "replace-final-hui-with-i-l-huia", ruleId: "cn-l26-264-tlatzihui-irregular-huia",
        andrewsSection: "26.4", targetConstruction: { operation: "replace-final", remove: "hui", add: "i-l-huiā" }
      },
      {
        sourceAliases: ["huetzi"], sourceClasses: ["B"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "huechi-liā", unmarkedTargetStem: "huechi-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-final-tzi-to-chi-lia-exact",
        procedure: "replace-final-tzi-with-chi-and-append-lia", ruleId: "cn-l26-264-huetzi-huechilia",
        andrewsSection: "26.4", targetConstruction: { operation: "replace-and-append", remove: "tzi", add: "chi-liā" }
      },
      {
        sourceAliases: ["mati"], sourceClasses: ["B"], transitiveOnly: true,
        markedTargetStem: "machi-liā", unmarkedTargetStem: "machi-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-final-ti-to-chi-lia-exact",
        procedure: "replace-final-ti-with-chi-and-append-lia", ruleId: "cn-l26-264-mati-machilia",
        andrewsSection: "26.4", targetConstruction: { operation: "replace-and-append", remove: "ti", add: "chi-liā" }
      },
      {
        sourceAliases: ["ōya", "oya"], sourceClasses: ["B"], transitiveOnly: true,
        markedTargetStem: "ōyi-liā", unmarkedTargetStem: "oyi-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-final-oya-to-oyi-lia-exact",
        procedure: "replace-final-a-with-i-and-append-lia", ruleId: "cn-l26-267-oya-oyilia",
        andrewsSection: "26.7", targetConstruction: { operation: "replace-and-append", remove: "a", add: "i-liā" }
      },
      {
        sourceAliases: ["pātzca", "pā-tz-ca", "patzca", "pa-tz-ca"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "pa-tz-qui-liā", unmarkedTargetStem: "pa-tz-qui-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-final-ca-to-qui-lia-exact",
        procedure: "replace-final-ca-with-qui-and-append-lia", ruleId: "cn-l26-267-patzca-patzquilia",
        andrewsSection: "26.7", targetConstruction: { operation: "replace-and-append", remove: "ca", add: "qui-liā", rootVowelChange: "ā-to-a" }
      },
      {
        sourceAliases: ["yōcoya", "yōco-ya", "yocoya", "yoco-ya"], sourceClasses: ["B"], transitiveOnly: true,
        markedTargetStem: "yōco-liā", unmarkedTargetStem: "yōco-liā", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-transitive-valence-neutral-oya-delete-ya-exact",
        procedure: "delete-final-ya-from-valence-neutral-root-plus-ya-and-add-lia", ruleId: "cn-l26-2684-yocoya-yocolia",
        andrewsSection: "26.8.4", targetConstruction: { operation: "replace-final", remove: "ya", add: "liā" }
      },
      {
        sourceAliases: ["ihtoā", "iht-o-ā", "ihtoa", "iht-o-a"], sourceClasses: ["C"], transitiveOnly: true,
        markedTargetStem: "il-huiā", unmarkedTargetStem: "il-huia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-suppletive-ihtoa-to-il-huia-exact",
        procedure: "select-suppletive-il-base-and-add-huia", ruleId: "cn-l26-2691-ihtoa-ilhuia",
        andrewsSection: "26.9.1", targetConstruction: { operation: "suppletive-base", sourceBase: "iht", targetBase: "il", add: "huiā" }
      },
      {
        sourceAliases: ["namaca"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "namaqui-l-tiā", unmarkedTargetStem: "namaqui-l-tia", targetClass: "C",
        derivationSubtype: "type-three", derivationRoute: "type-three-applicative-from-lo-nonactive-exact",
        procedure: "derive-lo-nonactive-then-replace-o-with-tia", ruleId: "cn-l26-2611-namaca-namaquiltia",
        andrewsSection: "26.11", targetConstruction: { operation: "typed-nonactive-bridge", nonactiveStem: "namaquī-lo", remove: "o", add: "tiā" }
      },
      {
        sourceAliases: ["nequi"], sourceClasses: ["B"], transitiveOnly: true,
        markedTargetStem: "nec-tiā", unmarkedTargetStem: "nec-tia", targetClass: "C",
        derivationSubtype: "type-three", derivationRoute: "type-three-applicative-from-o-nonactive-exact",
        procedure: "derive-o-nonactive-then-replace-o-with-tia", ruleId: "cn-l26-2611-nequi-nectia",
        andrewsSection: "26.11", targetConstruction: { operation: "typed-nonactive-bridge", nonactiveStem: "nec-ō", remove: "ō", add: "tiā" }
      },
      {
        sourceAliases: ["cōhua", "cohua"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "cōhui-liā", unmarkedTargetStem: "cohui-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-parallel-final-hua-to-hui-lia-exact",
        procedure: "replace-final-a-with-i-and-append-lia", ruleId: "cn-l26-2612-cohua-cohuilia",
        andrewsSection: "26.12", targetConstruction: { operation: "replace-and-append", remove: "a", add: "i-liā" }
      },
      {
        sourceAliases: ["chīhua", "chihua"], sourceClasses: ["A"], transitiveOnly: true,
        markedTargetStem: "chihui-liā", unmarkedTargetStem: "chihui-lia", targetClass: "C",
        derivationSubtype: "type-two", derivationRoute: "type-two-parallel-final-hua-to-hui-lia-exact",
        procedure: "replace-final-a-with-i-and-append-lia", ruleId: "cn-l26-2612-chihua-chihuilia",
        andrewsSection: "26.12", targetConstruction: { operation: "replace-and-append", remove: "a", add: "i-liā", rootVowelChange: "ī-to-i" }
      },
      {
        sourceAliases: ["tla-hua-hua-l-o-ā", "tlahuahualoā", "tla-hua-hua-l-o-a", "tlahuahualoa"], sourceClasses: ["C"], transitiveOnly: true,
        markedTargetStem: "hua-hua-l-o-ā", unmarkedTargetStem: "hua-hua-l-o-a", targetClass: "C",
        derivationSubtype: "valence-neutral-applicative", derivationRoute: "causative-form-with-defused-tla-applicative-valence-exact",
        procedure: "move-fused-tla-to-the-object-prefix-line-and-import-applicative-object", ruleId: "cn-l26-23-huahualoa-applicative-valence",
        andrewsSection: "26.23", targetConstruction: { operation: "defuse-tla-and-increase-valence", remove: "fused-tla", addOutsideStem: "tla-object-prefix" }
      },
      {
        sourceAliases: ["tlāni", "tlani"], sourceClasses: ["B"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "tlāni", unmarkedTargetStem: "tlani", targetClass: "B",
        derivationSubtype: "valence-neutral-applicative", derivationRoute: "object-reading-applicative-identity-exact",
        procedure: "preserve-direct-stem-and-select-applicative-reading", ruleId: "cn-l26-21-tlani-applicative-reading",
        andrewsSection: "26.21", suppressGenericTypeOne: true, targetConstruction: { operation: "identity-stem-with-valence-increase" }
      },
      {
        sourceAliases: ["nō-nōtza", "nōnōtza", "no-notza", "nonotza"], sourceClasses: ["A"], sourceValences: ["intransitive"], sourceObjectCount: 0,
        markedTargetStem: "nō-nōtza", unmarkedTargetStem: "no-notza", targetClass: "A",
        derivationSubtype: "valence-neutral-applicative", derivationRoute: "object-reading-applicative-identity-exact",
        procedure: "preserve-direct-stem-and-select-applicative-reading", ruleId: "cn-l26-21-nonotza-applicative-reading",
        andrewsSection: "26.21", suppressGenericTypeOne: true, targetConstruction: { operation: "identity-stem-with-valence-increase" }
      }
    ].map(formation => Object.freeze({
      ...formation,
      sourceAliases: Object.freeze(formation.sourceAliases),
      sourceClasses: Object.freeze(formation.sourceClasses),
      sourceValences: formation.sourceValences ? Object.freeze(formation.sourceValences) : null,
      targetConstruction: Object.freeze(formation.targetConstruction),
      evidenceSections: Object.freeze([formation.andrewsSection, "26.13", "26.14", "26.23"])
    })));

    function normalizeClassicalNahuatlVncDerivationToken(value = "") {
      return String(value == null ? "" : value).trim();
    }
    function normalizeClassicalNahuatlVncDerivationStem(value = "") {
      return normalizeClassicalNahuatlVncDerivationToken(value).replace(/^\((.*)\)$/u, "$1").normalize("NFC").trim();
    }
    function getClassicalNahuatlVncDerivationLexicalKey(value = "") {
      return normalizeClassicalNahuatlVncDerivationStem(value).replace(/-/gu, "");
    }
    function hasClassicalNahuatlVncDerivationLexicalKey(value = "", expected = "") {
      return Boolean(getClassicalNahuatlVncDerivationLexicalKey(value) && getClassicalNahuatlVncDerivationLexicalKey(value) === getClassicalNahuatlVncDerivationLexicalKey(expected));
    }
    function getClassicalNahuatlKarttunen1992DerivationEvidenceInventory() {
      return getSharedKarttunen1992DerivationEvidenceInventory();
    }
    function getClassicalNahuatlKarttunen1992DerivationEvidenceMatches({ derivationType = "", sourceStem = "", targetStem = "" } = {}) {
      return getSharedKarttunen1992DerivationEvidenceMatches({
        derivationType,
        sourceStem,
        targetStem,
      });
    }
    function getClassicalNahuatlCanvasDerivationAuthorityRule(recordId = "") {
      const normalizedRecordId = normalizeClassicalNahuatlVncDerivationToken(recordId);
      return CLASSICAL_NAHUATL_CANVAS_DERIVATION_AUTHORITY.rules.find(record => record.recordId === normalizedRecordId) || null;
    }
    function getClassicalNahuatlCanvasDerivationAuthorityExample(recordId = "") {
      const normalizedRecordId = normalizeClassicalNahuatlVncDerivationToken(recordId);
      return CLASSICAL_NAHUATL_CANVAS_DERIVATION_AUTHORITY.examples.find(record => record.recordId === normalizedRecordId) || null;
    }
    function getClassicalNahuatlCanvasExactDerivationExample(sourceDescriptor = {}, nonactiveRecord = null, derivationType = "") {
      const normalizedDerivationType = normalizeClassicalNahuatlVncDerivationToken(derivationType).toLowerCase();
      return CLASSICAL_NAHUATL_CANVAS_DERIVATION_AUTHORITY.examples.find(example => {
        const rule = getClassicalNahuatlCanvasDerivationAuthorityRule(example.ruleRecordId);
        return Boolean(rule
          && rule.derivationType === normalizedDerivationType
          && hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, example.source?.stem)
          && sourceDescriptor.sourceClass === example.source?.verbClass
          && sourceDescriptor.sourceValence === example.source?.valence
          && sourceDescriptor.sourceObjectCount === example.source?.objectCount
          && (!nonactiveRecord || hasClassicalNahuatlVncDerivationLexicalKey(nonactiveRecord.nonactiveStem, example.bridge?.stem)
            && nonactiveRecord.suffixFamily === example.bridge?.suffixFamily));
      }) || null;
    }
    function getClassicalNahuatlCanvasDerivationChoiceSignaturePayload(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        authorizationStatus: frame.authorizationStatus,
        authority: frame.authority,
        identity: frame.identity,
        source: frame.source,
        formation: frame.formation,
        targetRealization: frame.targetRealization,
        eligibility: frame.eligibility,
        typedFrameAuthority: frame.typedFrameAuthority,
        callerSuppliedTargetAllowed: frame.callerSuppliedTargetAllowed,
        formulaArtifactAuthority: frame.formulaArtifactAuthority,
        surfaceArtifactAuthority: frame.surfaceArtifactAuthority
      };
    }
    function buildClassicalNahuatlCanvasDerivationChoiceFrame(sourceDescriptor = {}, option = {}, exampleRecordId = "") {
      const example = getClassicalNahuatlCanvasDerivationAuthorityExample(exampleRecordId);
      const rule = example ? getClassicalNahuatlCanvasDerivationAuthorityRule(example.ruleRecordId) : null;
      const sourceMatches = Boolean(example && rule
        && hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, example.source?.stem)
        && sourceDescriptor.sourceClass === example.source?.verbClass
        && sourceDescriptor.sourceValence === example.source?.valence
        && sourceDescriptor.sourceObjectCount === example.source?.objectCount);
      const optionMatches = Boolean(sourceMatches
        && option.optionId === example.choiceId
        && option.derivationType === rule.derivationType
        && option.derivationSubtype === rule.subtype
        && option.targetStem === example.target?.stem
        && option.targetClass === example.target?.verbClass
        && option.ruleId === rule.operationId
        && option.andrewsSection === rule.section);
      if (!optionMatches) {
        return null;
      }
      const frame = {
        kind: CLASSICAL_NAHUATL_CANVAS_DERIVATION_CHOICE_KIND,
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        authorizationStatus: "authorized",
        authority: Object.freeze({
          catalogId: CLASSICAL_NAHUATL_CANVAS_DERIVATION_AUTHORITY.catalogId,
          schemaVersion: CLASSICAL_NAHUATL_CANVAS_DERIVATION_AUTHORITY.schemaVersion,
          sourceDocument: CLASSICAL_NAHUATL_CANVAS_DERIVATION_AUTHORITY.sourceDocument,
          ruleRecordId: rule.recordId,
          exampleRecordId: example.recordId,
          lesson: example.lesson,
          section: example.section,
          authorityWitness: example.authorityWitness ? Object.freeze({ ...example.authorityWitness }) : null
        }),
        identity: Object.freeze({
          choiceId: example.choiceId,
          operationId: rule.operationId,
          derivationType: rule.derivationType,
          subtype: rule.subtype,
          nomenclature: rule.nomenclature,
          ruleId: rule.operationId,
          andrewsSection: rule.section
        }),
        source: Object.freeze({
          signature: sourceDescriptor.sourceSignature,
          analysisSignature: option.sourceAnalysisFrame?.canonicalSignature || "",
          stem: example.source.stem,
          verbClass: example.source.verbClass,
          valence: example.source.valence,
          objectCount: example.source.objectCount,
          bridgeStem: example.bridge.stem,
          bridgeSuffixFamily: example.bridge.suffixFamily,
          bridgeVisibility: example.bridge.visibility,
          bridgeHypothetical: example.bridge.hypothetical === true,
          bridgeAuthority: example.bridge.authority
        }),
        formation: Object.freeze({
          operation: rule.formation.operation,
          remove: rule.formation.remove,
          add: rule.formation.add,
          quantityChange: rule.formation.quantityChange || "",
          targetClass: rule.formation.targetClass,
          targetSegments: Object.freeze([...example.target.segments]),
          participantOperation: rule.participantOperation
        }),
        targetRealization: Object.freeze({
          canonicalStem: example.target.stem,
          segmentedStem: example.target.hyphenation,
          quantity: example.target.quantity,
          exactWitnessApplied: true,
          printedSource: example.printedSource,
          printedResult: example.printedResult
        }),
        eligibility: Object.freeze({
          selectable: true,
          formationSelectionRequired: false,
          causativeObjectKindAuthority: "derived-from-source-voice",
          allowedCausativeObjectKinds: Object.freeze([]),
          referentRelationChoice: "source-and-target-person-dependent",
          specificShuntlineChoice: "typed-object-cluster-dependent",
          allowedApplicativeObjects: Object.freeze([])
        }),
        typedFrameAuthority: true,
        callerSuppliedTargetAllowed: false,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      };
      frame.canonicalSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlCanvasDerivationChoiceSignaturePayload(frame));
      return Object.freeze(frame);
    }
    function isClassicalNahuatlCanvasDerivationChoiceFrame(frame = null) {
      if (!frame
        || frame.kind !== CLASSICAL_NAHUATL_CANVAS_DERIVATION_CHOICE_KIND
        || frame.version !== CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.callerSuppliedTargetAllowed !== false
        || frame.formulaArtifactAuthority !== false
        || frame.surfaceArtifactAuthority !== false) {
        return false;
      }
      const example = getClassicalNahuatlCanvasDerivationAuthorityExample(frame.authority?.exampleRecordId);
      const rule = example ? getClassicalNahuatlCanvasDerivationAuthorityRule(example.ruleRecordId) : null;
      return Boolean(example
        && rule
        && frame.authority?.catalogId === CLASSICAL_NAHUATL_CANVAS_DERIVATION_AUTHORITY.catalogId
        && frame.authority?.ruleRecordId === rule.recordId
        && areClassicalNahuatlVncDerivationValuesEqual(frame.authority?.authorityWitness || null, example.authorityWitness || null)
        && frame.identity?.choiceId === example.choiceId
        && frame.identity?.operationId === rule.operationId
        && frame.source?.stem === example.source.stem
        && frame.source?.verbClass === example.source.verbClass
        && frame.source?.valence === example.source.valence
        && frame.source?.objectCount === example.source.objectCount
        && frame.source?.bridgeStem === example.bridge.stem
        && frame.source?.bridgeSuffixFamily === example.bridge.suffixFamily
        && frame.source?.bridgeVisibility === example.bridge.visibility
        && frame.source?.bridgeHypothetical === (example.bridge.hypothetical === true)
        && frame.source?.bridgeAuthority === example.bridge.authority
        && frame.formation?.operation === rule.formation.operation
        && frame.formation?.remove === rule.formation.remove
        && frame.formation?.add === rule.formation.add
        && frame.formation?.quantityChange === (rule.formation.quantityChange || "")
        && frame.formation?.targetClass === example.target.verbClass
        && frame.targetRealization?.canonicalStem === example.target.stem
        && frame.targetRealization?.segmentedStem === example.target.hyphenation
        && frame.targetRealization?.quantity === example.target.quantity
        && frame.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlCanvasDerivationChoiceSignaturePayload(frame)));
    }
    function cloneClassicalNahuatlVncDerivationValue(value) {
      if (Array.isArray(value)) {
        return value.map(cloneClassicalNahuatlVncDerivationValue);
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneClassicalNahuatlVncDerivationValue(entry)]));
    }
    function areClassicalNahuatlVncDerivationValuesEqual(left, right) {
      try {
        if (left === right) {
          return true;
        }
        if (Array.isArray(left) || Array.isArray(right)) {
        if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
          return false;
        }
        for (let index = 0; index < left.length; index += 1) {
          const leftDescriptor = Object.getOwnPropertyDescriptor(left, String(index));
          const rightDescriptor = Object.getOwnPropertyDescriptor(right, String(index));
          if (Boolean(leftDescriptor) !== Boolean(rightDescriptor)) {
            return false;
          }
          if (!leftDescriptor) {
            continue;
          }
          if (!Object.prototype.hasOwnProperty.call(leftDescriptor, "value")
            || !Object.prototype.hasOwnProperty.call(rightDescriptor, "value")
            || !areClassicalNahuatlVncDerivationValuesEqual(leftDescriptor.value, rightDescriptor.value)) {
            return false;
          }
        }
        return true;
        }
        if ((left && typeof left === "object") || (right && typeof right === "object")) {
        if (!left || !right || typeof left !== "object" || typeof right !== "object") {
          return false;
        }
        const leftKeys = Object.keys(left).sort();
        const rightKeys = Object.keys(right).sort();
        return leftKeys.length === rightKeys.length
          && leftKeys.every((key, index) => {
            if (key !== rightKeys[index]) {
              return false;
            }
            const leftDescriptor = Object.getOwnPropertyDescriptor(left, key);
            const rightDescriptor = Object.getOwnPropertyDescriptor(right, key);
            return Boolean(leftDescriptor && rightDescriptor)
              && Object.prototype.hasOwnProperty.call(leftDescriptor, "value")
              && Object.prototype.hasOwnProperty.call(rightDescriptor, "value")
              && areClassicalNahuatlVncDerivationValuesEqual(leftDescriptor.value, rightDescriptor.value);
          });
        }
        return JSON.stringify(left === undefined ? null : left) === JSON.stringify(right === undefined ? null : right);
      } catch (_error) {
        return false;
      }
    }
    function signClassicalNahuatlVncDerivationValue(value) {
      let hash = 2166136261;
      const updateHash = token => {
        const serializedToken = String(token);
        for (let index = 0; index < serializedToken.length; index += 1) {
          hash ^= serializedToken.charCodeAt(index);
          hash = Math.imul(hash, 16777619);
        }
      };
      const visit = entry => {
        if (Array.isArray(entry)) {
          updateHash("[");
          for (let index = 0; index < entry.length; index += 1) {
            if (index > 0) {
              updateHash(",");
            }
            const descriptor = Object.getOwnPropertyDescriptor(entry, String(index));
            if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
              visit(descriptor.value);
            } else if (descriptor) {
              updateHash("<accessor>");
            }
          }
          updateHash("]");
          return;
        }
        if (entry && typeof entry === "object") {
          updateHash("{");
          Object.keys(entry).sort().forEach((key, index) => {
            if (index > 0) {
              updateHash(",");
            }
            updateHash(JSON.stringify(key));
            updateHash(":");
            const descriptor = Object.getOwnPropertyDescriptor(entry, key);
            if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
              visit(descriptor.value);
            } else {
              updateHash("<accessor>");
            }
          });
          updateHash("}");
          return;
        }
        updateHash(JSON.stringify(entry === undefined ? null : entry));
      };
      try {
        visit(value);
      } catch (_error) {
        return `v${CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION}:invalid`;
      }
      return `v${CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION}:${(hash >>> 0).toString(16).padStart(8, "0")}`;
    }
    function createClassicalNahuatlVncDerivationValidationContext() {
      return {
        baseSources: new WeakSet(),
        voiceSources: new WeakSet(),
        sourceAnalyses: new WeakSet(),
        inventories: new WeakSet(),
        operations: new WeakSet(),
        machineryFrames: new WeakSet()
      };
    }
    function getClassicalNahuatlVncDerivationRuntimeTarget() {
      if (targetObject && typeof targetObject === "object") {
        return targetObject;
      }
      return typeof globalThis !== "undefined" ? globalThis : null;
    }
    function getClassicalNahuatlVncDerivationFinalTypedFrame(machineryFrame = null) {
      return machineryFrame?.targetTypedVncSlotFrame || machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || machineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame || machineryFrame?.finalBoundaryRealizationFrame?.typedSlotFrame || null;
    }
    function getClassicalNahuatlVncDerivationSemanticIdentity(frame = null) {
      const subject = frame?.slots?.subject || {};
      const predicate = frame?.slots?.predicate || {};
      const number = frame?.slots?.number || {};
      const prePredicate = Array.isArray(frame?.slots?.prePredicate) ? frame.slots.prePredicate : [];
      return [subject.pers1 || "", subject.pers2 || "", ...prePredicate.map(slot => slot?.carrier || ""), predicate.stem || "", predicate.tns || "", number.num1 || "", number.num2 || ""].join("|");
    }
    function isClassicalNahuatlVncDerivationTypedSlotFrame(frame = null) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      return Boolean(typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame === "function" && runtimeTarget.isClassicalNahuatlVncSlotFrame(frame) && frame.semanticIdentity === getClassicalNahuatlVncDerivationSemanticIdentity(frame));
    }
    function normalizeClassicalNahuatlVncDerivationObjectKind(value = "") {
      const normalized = normalizeClassicalNahuatlVncDerivationToken(value);
      return {
        "mainline-reflexive": "reflexive",
        "shuntline-reflexive": "reflexive",
        "human-reciprocal": "reflexive",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman"
      }[normalized] || normalized;
    }
    function normalizeClassicalNahuatlVncDerivationObjectRequest(request = {}, index = 0) {
      const objectKind = normalizeClassicalNahuatlVncDerivationObjectKind(request?.objectKind);
      return Object.freeze({
        objectId: normalizeClassicalNahuatlVncDerivationToken(request?.objectId || `source-object-${index + 1}`),
        objectKind,
        objectPerson: objectKind === "specific-projective" || objectKind === "reflexive" ? normalizeClassicalNahuatlVncDerivationToken(request?.objectPerson) : "",
        governor: normalizeClassicalNahuatlVncDerivationToken(request?.governor || "directive"),
        derivationalLevel: Number(request?.derivationalLevel || index + 1)
      });
    }
    function areClassicalNahuatlVncDerivationObjectRequestsValid(requests = [], { maximumCount = 2 } = {}) {
      if (!Array.isArray(requests) || requests.length > maximumCount) {
        return false;
      }
      const levels = [];
      const objectIds = [];
      for (let index = 0; index < requests.length; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(requests, String(index));
        if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
          return false;
        }
        const request = descriptor.value;
        if (!request?.objectId
          || !CLASSICAL_NAHUATL_VNC_DERIVATION_OBJECT_KINDS.includes(request.objectKind)
          || !["directive", "causative", "applicative"].includes(request.governor)
          || !Number.isInteger(request.derivationalLevel)
          || request.derivationalLevel < 1
          || request.derivationalLevel > 3
          || (request.objectKind === "specific-projective" && !CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(request.objectPerson))
          || (request.objectKind === "reflexive"
            && request.objectPerson
            && request.objectPerson !== "nonfirst-common"
            && !CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(request.objectPerson))) {
          return false;
        }
        levels.push(request.derivationalLevel);
        objectIds.push(request.objectId);
      }
      return new Set(objectIds).size === objectIds.length && new Set(levels).size === levels.length;
    }
    function getClassicalNahuatlVncDerivationAvailableObjectId(sourceObjectRequests = [], baseId = "object", preferredSuffix = 1) {
      const usedIds = new Set(sourceObjectRequests.map(request => request.objectId));
      if (!usedIds.has(baseId)) {
        return baseId;
      }
      let suffix = Math.max(1, Number(preferredSuffix || 1));
      while (usedIds.has(`${baseId}-${suffix}`)) {
        suffix += 1;
      }
      return `${baseId}-${suffix}`;
    }
    function getClassicalNahuatlVncDerivationSourceObjectRequests(sourceMachineryFrame = null, sourceStem = "", finalTypedFrame = null) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const derivedRequests = sourceMachineryFrame?.kind === "classical-nahuatl-vnc-derived-machinery-frame" ? sourceMachineryFrame.targetObjectRequests : null;
      const clusterFrame = sourceMachineryFrame?.multipleObjectClusterFrame || sourceMachineryFrame?.targetObjectClusterFrame || null;
      if (Array.isArray(derivedRequests)) {
        if (derivedRequests.length >= 2 && !(typeof runtimeTarget?.isClassicalNahuatlLesson23ObjectClusterFrame === "function" && runtimeTarget.isClassicalNahuatlLesson23ObjectClusterFrame(clusterFrame, sourceStem))) {
          return null;
        }
        return Object.freeze(derivedRequests.map(normalizeClassicalNahuatlVncDerivationObjectRequest));
      }
      if (clusterFrame) {
        if (!(typeof runtimeTarget?.isClassicalNahuatlLesson23ObjectClusterFrame === "function" && runtimeTarget.isClassicalNahuatlLesson23ObjectClusterFrame(clusterFrame, sourceStem))) {
          return null;
        }
        return Object.freeze(clusterFrame.objectRequests.map(normalizeClassicalNahuatlVncDerivationObjectRequest));
      }
      const objectFrame = sourceMachineryFrame?.priorVncFrame?.objectFrame || null;
      if (!objectFrame || !objectFrame.objectKind || objectFrame.valenceArity === "vacant") {
        const typedValenceSlots = (finalTypedFrame?.slots?.prePredicate || []).filter(slot => /^valence(?:-|$)/u.test(slot?.id || ""));
        return typedValenceSlots.length ? null : Object.freeze([]);
      }
      const request = normalizeClassicalNahuatlVncDerivationObjectRequest({
        objectId: "source-object-1",
        objectKind: objectFrame.objectKind,
        objectPerson: objectFrame.objectPerson,
        governor: "directive",
        derivationalLevel: 1
      });
      return Object.freeze([request]);
    }
    function getClassicalNahuatlVncDerivationSourceSignaturePayload(source = {}) {
      return {
        sourceKind: source.sourceKind,
        sourceVoice: source.sourceVoice || "active",
        sourceStem: source.sourceStem,
        sourceClass: source.sourceClass,
        sourceValence: source.sourceValence,
        sourceSubject: source.sourceSubject,
        mood: source.mood,
        tense: source.tense,
        typedSemanticIdentity: source.finalTypedFrame?.semanticIdentity || "",
        formationTypedSemanticIdentity: source.formationFinalTypedFrame?.semanticIdentity || "",
        formationSourceSignature: source.formationSourceSignature || "",
        participantSurfaceSubject: source.participantSurfaceSubject || "",
        participantSurfaceObjectRequests: source.participantSurfaceObjectRequests || [],
        promotedSourceObjectRequest: source.promotedSourceObjectRequest || null,
        implicitAgentObjectKind: source.implicitAgentObjectKind || "",
        objectRequests: source.sourceObjectRequests || [],
        priorDerivationSignature: source.priorDerivationSignature || ""
      };
    }
    function getClassicalNahuatlVncDerivationBaseSourceAuthorityProjection(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        stem: frame.stem,
        classTargetStem: frame.classTargetStem,
        classTargetValence: frame.classTargetValence,
        sourceVerbstem: frame.sourceVerbstem,
        classId: frame.classId,
        classProfile: frame.classProfile,
        sourceSelectionFrame: frame.sourceSelectionFrame,
        progressiveAssimilationFrame: frame.progressiveAssimilationFrame,
        lesson11ParadigmPlan: frame.lesson11ParadigmPlan,
        lesson11VncApplicationFrame: frame.lesson11VncApplicationFrame,
        citationRuleFrame: frame.citationRuleFrame,
        structureRuleFrame: frame.structureRuleFrame,
        classRuleFrame: frame.classRuleFrame,
        predicateFormationRuleFrame: frame.predicateFormationRuleFrame,
        analysisRuleFrame: frame.analysisRuleFrame,
        objectRelationshipRuleFrame: frame.objectRelationshipRuleFrame,
        tlaFusionRuleFrame: frame.tlaFusionRuleFrame,
        expandedVncBoundaryFrame: frame.expandedVncBoundaryFrame,
        sentenceSurfaceFrame: frame.sentenceSurfaceFrame,
        canvasLayerEvaluationFrame: frame.canvasLayerEvaluationFrame,
        priorVncFrame: frame.priorVncFrame,
        multipleObjectClusterFrame: frame.multipleObjectClusterFrame,
        formulaRealization: frame.formulaRealization,
        proofFrame: frame.proofFrame,
        selectedOutputLogicFrame: frame.selectedOutputLogicFrame,
        grammarGenerationAllowed: frame.grammarGenerationAllowed,
        formulaOutputAllowed: frame.formulaOutputAllowed,
        surfaceGenerationAllowed: frame.surfaceGenerationAllowed
      };
    }
    function rebuildClassicalNahuatlVncDerivationBaseSourceMachineryFrame(sourceMachineryFrame = null) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (typeof runtimeTarget?.buildClassicalNahuatlLesson7VerbstemClassFrame !== "function") {
        return null;
      }
      const proofConclusion = sourceMachineryFrame?.proofFrame?.conclusion || {};
      const priorVncFrame = sourceMachineryFrame?.priorVncFrame || {};
      const sourceSelectionFrame = sourceMachineryFrame?.sourceSelectionFrame || {};
      const objectFrame = priorVncFrame.objectFrame || {};
      const sourceStem = normalizeClassicalNahuatlVncDerivationStem(proofConclusion.sourceVerbstem || sourceMachineryFrame?.sourceVerbstem || sourceMachineryFrame?.stem);
      const sourceClass = normalizeClassicalNahuatlVncDerivationToken(proofConclusion.classId || sourceMachineryFrame?.classId).toUpperCase();
      const sourceValence = normalizeClassicalNahuatlVncDerivationToken(proofConclusion.classTargetValence || sourceMachineryFrame?.classTargetValence || sourceMachineryFrame?.citationRuleFrame?.valence);
      const sourceSubject = normalizeClassicalNahuatlVncDerivationToken(priorVncFrame.personDyad?.subject || priorVncFrame.subject || sourceMachineryFrame?.multipleObjectClusterFrame?.subject);
      // Lesson 11 may borrow a morphological tense to realize a different
      // semantic tense (on-o and pil-ca use the preterit form for present
      // meaning). Canonical reconstruction must replay the semantic request;
      // feeding the already-remapped morphological tense back as a new request
      // changes the Lesson 11 plan and falsely rejects an otherwise typed source.
      const mood = normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame?.lesson11ParadigmPlan?.requestedMood || priorVncFrame.personDyad?.mood || priorVncFrame.mood || "indicative");
      const tense = normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame?.lesson11ParadigmPlan?.requestedSemanticTense || priorVncFrame.tense || "present");
      const sourceObjectPerson = normalizeClassicalNahuatlVncDerivationToken(objectFrame.objectPerson || sourceMachineryFrame?.objectRelationshipRuleFrame?.selectedObjectPerson);
      if (!sourceStem || !["A", "B", "C", "D"].includes(sourceClass) || !sourceValence || !CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(sourceSubject)) {
        return null;
      }
      const sourceOptions = {
        ...getClassicalNahuatlDerivedVncCanonicalSentenceOptions(sourceMachineryFrame),
        tenseMode: "verbo",
        subject: sourceSubject,
        mood,
        tense,
        verbClass: sourceClass,
        perfectiveClass: sourceClass,
        requestedSourceValence: sourceValence,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: sourceMachineryFrame?.objectRelationshipRuleFrame?.selectedObjectKind || (sourceValence === "intransitive" ? "none" : sourceValence),
        objectPerson: sourceObjectPerson,
        object: sourceObjectPerson,
        silentSpecificObject: objectFrame.objectKind === "specific-projective" && objectFrame.va1 === "0",
        tlaFusion: sourceMachineryFrame?.tlaFusionRuleFrame?.fused === true,
        sourceSelectionKind: sourceSelectionFrame.requestedSelectionKind || "",
        sourceEmbedStem: sourceSelectionFrame.explicitEmbedStem || "",
        sourceMatrixStem: sourceSelectionFrame.explicitMatrixStem || "",
        predicateTnsOverride: priorVncFrame.predicateTnsOverride || ""
      };
      const rebuiltLesson7 = runtimeTarget.buildClassicalNahuatlLesson7VerbstemClassFrame(sourceStem, sourceOptions);
      if (sourceMachineryFrame.kind === "classical-nahuatl-lesson7-verbstem-class-machinery-frame") {
        return rebuiltLesson7;
      }
      if (sourceMachineryFrame.kind !== "classical-nahuatl-lesson23-multiple-object-vnc-machinery-frame" || typeof runtimeTarget?.buildClassicalNahuatlLesson23MultipleObjectVncFrame !== "function") {
        return null;
      }
      const clusterFrame = sourceMachineryFrame.multipleObjectClusterFrame;
      if (!(typeof runtimeTarget?.isClassicalNahuatlLesson23ObjectClusterFrame === "function" && runtimeTarget.isClassicalNahuatlLesson23ObjectClusterFrame(clusterFrame, sourceStem))) {
        return null;
      }
      return runtimeTarget.buildClassicalNahuatlLesson23MultipleObjectVncFrame(rebuiltLesson7, {
        objectRequests: clusterFrame.objectRequests,
        formulaArtifact: clusterFrame.formulaArtifact || "",
        surfaceArtifact: clusterFrame.surfaceArtifact || ""
      });
    }
    function isCanonicalClassicalNahuatlVncDerivationBaseSourceMachineryFrame(frame = null, validationContext = null) {
      if (!frame || !CLASSICAL_NAHUATL_VNC_DERIVATION_BASE_SOURCE_KINDS.includes(frame.kind) || frame.authorizationStatus !== "authorized") {
        return false;
      }
      if (validationContext?.baseSources?.has(frame)) {
        return true;
      }
      const rebuilt = rebuildClassicalNahuatlVncDerivationBaseSourceMachineryFrame(frame);
      const canonical = Boolean(rebuilt?.authorizationStatus === "authorized" && areClassicalNahuatlVncDerivationValuesEqual(getClassicalNahuatlVncDerivationBaseSourceAuthorityProjection(frame), getClassicalNahuatlVncDerivationBaseSourceAuthorityProjection(rebuilt)));
      if (canonical) {
        validationContext?.baseSources?.add(frame);
      }
      return canonical;
    }
    function getClassicalNahuatlVncDerivationVoiceSourceAuthorityProjection(frame = {}) {
      const finalTypedFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(frame);
      return {
        kind: frame.kind,
        version: frame.version,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        voice: frame.voice,
        stem: frame.stem,
        sourceVerbstem: frame.sourceVerbstem,
        sourceValence: frame.sourceValence,
        valence: frame.valence,
        sourceSubject: frame.sourceSubject,
        subject: frame.subject,
        selectedNonactiveAspect: frame.selectedNonactiveAspect,
        nonactiveStemRecord: frame.nonactiveStemRecord,
        sourceObjectClusterFrame: frame.sourceObjectClusterFrame,
        voiceObjectClusterFrame: frame.voiceObjectClusterFrame,
        voiceTransformationFrame: frame.voiceTransformationFrame,
        finalTypedVncSlotFrame: finalTypedFrame,
        formulaRealization: frame.formulaRealization,
        selectedOutputFillers: frame.selectedOutputLogicFrame?.outputFillers || null,
        grammarGenerationAllowed: frame.grammarGenerationAllowed,
        formulaOutputAllowed: frame.formulaOutputAllowed,
        surfaceGenerationAllowed: frame.surfaceGenerationAllowed
      };
    }
    function rebuildClassicalNahuatlVncDerivationVoiceSourceMachineryFrame(frame = null, depth = 0, validationContext = null) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const activeMachineryFrame = frame?.activeMachineryFrame || null;
      const activeDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(activeMachineryFrame, depth + 1, validationContext);
      if (frame?.kind !== CLASSICAL_NAHUATL_VNC_DERIVATION_VOICE_SOURCE_KIND || !["passive", "impersonal"].includes(normalizeClassicalNahuatlVncDerivationToken(frame.voice)) || activeDescriptor.authorizationStatus !== "authorized" || typeof runtimeTarget?.buildClassicalNahuatlLessons20To22DerivedVncFrame !== "function") {
        return null;
      }
      const specificSourceObject = activeDescriptor.sourceObjectRequests.find(request => request.objectKind === "specific-projective") || null;
      return runtimeTarget.buildClassicalNahuatlLessons20To22DerivedVncFrame(activeMachineryFrame, {
        voice: frame.voice,
        nonactiveStemRecord: frame.nonactiveStemRecord,
        sourceObjectClusterFrame: frame.sourceObjectClusterFrame,
        sourceValence: activeDescriptor.sourceValence,
        sourceSubject: activeDescriptor.sourceSubject,
        sourceObjectPerson: specificSourceObject?.objectPerson || "",
        mood: activeDescriptor.mood,
        tense: activeDescriptor.tense,
        verbClass: activeDescriptor.sourceClass,
        sentenceOptions: getClassicalNahuatlDerivedVncCanonicalSentenceOptions(activeMachineryFrame)
      });
    }
    function isCanonicalClassicalNahuatlVncDerivationVoiceSourceMachineryFrame(frame = null, depth = 0, validationContext = null) {
      if (!frame || frame.kind !== CLASSICAL_NAHUATL_VNC_DERIVATION_VOICE_SOURCE_KIND || frame.authorizationStatus !== "authorized" || !["passive", "impersonal"].includes(normalizeClassicalNahuatlVncDerivationToken(frame.voice)) || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH) {
        return false;
      }
      if (validationContext?.voiceSources?.has(frame)) {
        return true;
      }
      const activeDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(frame.activeMachineryFrame, depth + 1, validationContext);
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const nonactiveRecordCanonical = activeDescriptor.authorizationStatus === "authorized"
        && typeof runtimeTarget?.isClassicalNahuatlLesson20NonactiveStemRecord === "function"
        && runtimeTarget.isClassicalNahuatlLesson20NonactiveStemRecord(frame.nonactiveStemRecord, activeDescriptor.sourceStem);
      if (!nonactiveRecordCanonical) {
        return false;
      }
      if (frame.sourceObjectClusterFrame && !(typeof runtimeTarget?.isClassicalNahuatlLesson23ObjectClusterFrame === "function" && runtimeTarget.isClassicalNahuatlLesson23ObjectClusterFrame(frame.sourceObjectClusterFrame, activeDescriptor.sourceStem))) {
        return false;
      }
      const rebuilt = rebuildClassicalNahuatlVncDerivationVoiceSourceMachineryFrame(frame, depth + 1, validationContext);
      const canonical = Boolean(rebuilt?.authorizationStatus === "authorized"
        && areClassicalNahuatlVncDerivationValuesEqual(getClassicalNahuatlVncDerivationVoiceSourceAuthorityProjection(frame), getClassicalNahuatlVncDerivationVoiceSourceAuthorityProjection(rebuilt)));
      if (canonical) {
        validationContext?.voiceSources?.add(frame);
      }
      return canonical;
    }
    function getClassicalNahuatlVncDerivationTypedSubjectCandidates(finalTypedFrame = null, {
      stem = "",
      mood = "indicative",
      tense = "present"
    } = {}) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (typeof runtimeTarget?.getClassicalNahuatlLesson5PersonDyad !== "function" || typeof runtimeTarget?.getClassicalNahuatlLesson5NumberDyad !== "function") {
        return [];
      }
      const typedSubject = finalTypedFrame?.slots?.subject || {};
      const typedNumber = finalTypedFrame?.slots?.number || {};
      const followingMaterial = finalTypedFrame?.slots?.prePredicate?.[0]?.carrier || stem;
      return CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.filter(subject => {
        const personDyad = runtimeTarget.getClassicalNahuatlLesson5PersonDyad(subject, mood, {
          followingMaterial,
          stem: followingMaterial
        });
        const numberDyad = runtimeTarget.getClassicalNahuatlLesson5NumberDyad({
          subject,
          mood,
          tense,
          stem
        });
        const pers1Candidates = new Set([personDyad?.pers1, ...(personDyad?.pers1Variants || [])].map(normalizeClassicalNahuatlVncDerivationToken));
        const num1Candidates = new Set([numberDyad?.num1, ...(numberDyad?.num1Variants || [])].map(normalizeClassicalNahuatlVncDerivationToken));
        const num2Candidates = new Set([numberDyad?.num2, ...(numberDyad?.num2Variants || [])].map(normalizeClassicalNahuatlVncDerivationToken));
        return pers1Candidates.has(normalizeClassicalNahuatlVncDerivationToken(typedSubject.pers1))
          && normalizeClassicalNahuatlVncDerivationToken(personDyad?.pers2) === normalizeClassicalNahuatlVncDerivationToken(typedSubject.pers2)
          && num1Candidates.has(normalizeClassicalNahuatlVncDerivationToken(typedNumber.num1))
          && num2Candidates.has(normalizeClassicalNahuatlVncDerivationToken(typedNumber.num2));
      });
    }
    function getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame = null, depth = 0, validationContext = null) {
      if (!sourceMachineryFrame || typeof sourceMachineryFrame !== "object" || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-authorized-source-machinery-required" };
      }
      const sourceKind = normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame.kind);
      const voicedSource = sourceKind === CLASSICAL_NAHUATL_VNC_DERIVATION_VOICE_SOURCE_KIND;
      if (voicedSource) {
        if (sourceMachineryFrame.authorizationStatus !== "authorized") {
          return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-machinery-kind-not-authorized" };
        }
        if (!isCanonicalClassicalNahuatlVncDerivationVoiceSourceMachineryFrame(sourceMachineryFrame, depth + 1, validationContext)) {
          return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-voice-source-not-canonical" };
        }
        const formationDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame.activeMachineryFrame, depth + 1, validationContext);
        const finalTypedFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(sourceMachineryFrame);
        if (formationDescriptor.authorizationStatus !== "authorized" || !isClassicalNahuatlVncDerivationTypedSlotFrame(finalTypedFrame)) {
          return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-voice-source-typed-bases-required" };
        }
        const sourceVoice = normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame.voice);
        const voiceClusterFrame = sourceMachineryFrame.voiceObjectClusterFrame || null;
        const promotedObjectId = normalizeClassicalNahuatlVncDerivationToken(voiceClusterFrame?.promotedObjectId);
        const promotedSourceObjectRequest = sourceVoice === "passive"
          ? formationDescriptor.sourceObjectRequests.find(request => request.objectId === promotedObjectId)
            || formationDescriptor.sourceObjectRequests.find(request => request.objectKind === "specific-projective")
            || null
          : null;
        const retainedObjectIds = new Set(Array.isArray(voiceClusterFrame?.retainedObjectIds) ? voiceClusterFrame.retainedObjectIds : []);
        const participantSurfaceObjectRequests = sourceVoice === "passive"
          ? Object.freeze(formationDescriptor.sourceObjectRequests.filter(request => request.objectId !== promotedSourceObjectRequest?.objectId && (!voiceClusterFrame || retainedObjectIds.has(request.objectId))))
          : Object.freeze([...formationDescriptor.sourceObjectRequests]);
        const descriptor = {
          authorizationStatus: "authorized",
          blockReason: "",
          sourceKind,
          sourceVoice,
          sourceStem: formationDescriptor.sourceStem,
          sourceClass: formationDescriptor.sourceClass,
          sourceValence: formationDescriptor.sourceValence,
          sourceSubject: formationDescriptor.sourceSubject,
          mood: formationDescriptor.mood,
          tense: formationDescriptor.tense,
          sourceObjectRequests: formationDescriptor.sourceObjectRequests,
          sourceObjectCount: formationDescriptor.sourceObjectCount,
          finalTypedFrame,
          formationFinalTypedFrame: formationDescriptor.finalTypedFrame,
          formationSourceSignature: formationDescriptor.sourceSignature,
          formationSourceMachineryFrame: sourceMachineryFrame.activeMachineryFrame,
          participantSurfaceSubject: normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame.subject || sourceMachineryFrame.voiceTransformationFrame?.targetSubject),
          participantSurfaceObjectRequests,
          promotedSourceObjectRequest,
          implicitAgentObjectKind: "nonspecific-human",
          priorDerivationSignature: signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationVoiceSourceAuthorityProjection(sourceMachineryFrame)),
          sourceMachineryFrame
        };
        descriptor.sourceSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceSignaturePayload(descriptor));
        return descriptor;
      }
      const derivedSource = sourceKind === "classical-nahuatl-vnc-derived-machinery-frame";
      if (!derivedSource && !CLASSICAL_NAHUATL_VNC_DERIVATION_BASE_SOURCE_KINDS.includes(sourceKind)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-machinery-kind-not-authorized" };
      }
      if (derivedSource && !isCanonicalClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, depth + 1, validationContext)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-derived-source-signature-invalid" };
      }
      if (!derivedSource && !isCanonicalClassicalNahuatlVncDerivationBaseSourceMachineryFrame(sourceMachineryFrame, validationContext)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-base-source-not-canonical" };
      }
      const finalTypedFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(sourceMachineryFrame);
      const proofAuthorized = sourceMachineryFrame.authorizationStatus === "authorized" && sourceMachineryFrame.proofFrame?.authorizationStatus === "authorized" && sourceMachineryFrame.proofFrame?.conclusion?.authorized === true;
      if (!proofAuthorized || !isClassicalNahuatlVncDerivationTypedSlotFrame(finalTypedFrame)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-authorized-typed-source-required" };
      }
      const proofConclusion = sourceMachineryFrame.proofFrame.conclusion || {};
      const typedPredicateStem = normalizeClassicalNahuatlVncDerivationStem(finalTypedFrame.slots.predicate?.stem);
      const sourceStem = normalizeClassicalNahuatlVncDerivationStem(proofConclusion.sourceVerbstem || proofConclusion.classTargetStem || proofConclusion.verbstem);
      const canonicalTypedPredicateStem = normalizeClassicalNahuatlVncDerivationStem(proofConclusion.predicateExpectedStemVariant || proofConclusion.stemVariant || typedPredicateStem);
      const sourceLexicalKey = getClassicalNahuatlVncDerivationLexicalKey(sourceStem);
      const typedPredicateLexicalKey = getClassicalNahuatlVncDerivationLexicalKey(typedPredicateStem);
      const canonicalTypedPredicateLexicalKey = getClassicalNahuatlVncDerivationLexicalKey(canonicalTypedPredicateStem);
      const stemContinuityCandidates = [
        sourceMachineryFrame.targetStem,
        sourceMachineryFrame.sourceVerbstem,
        sourceMachineryFrame.stem,
        sourceMachineryFrame.classTargetStem,
        sourceMachineryFrame.classRuleFrame?.stem,
        sourceMachineryFrame.classRuleFrame?.sourceVerbstem,
        proofConclusion.verbstem,
        proofConclusion.stemAsFormulaPredicate,
        proofConclusion.classTargetStem,
        proofConclusion.sourceVerbstem
      ].map(normalizeClassicalNahuatlVncDerivationStem).filter(Boolean);
      const stemContinuityLexicalKeys = stemContinuityCandidates.map(getClassicalNahuatlVncDerivationLexicalKey).filter(Boolean);
      if (!sourceLexicalKey || !typedPredicateLexicalKey || typedPredicateLexicalKey !== canonicalTypedPredicateLexicalKey || !stemContinuityLexicalKeys.length || stemContinuityLexicalKeys.some(candidate => candidate !== sourceLexicalKey)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-stem-continuity-failed" };
      }
      const sourceClass = normalizeClassicalNahuatlVncDerivationToken(proofConclusion.classId).toUpperCase();
      const classContinuityCandidates = [
        sourceMachineryFrame.targetClass,
        sourceMachineryFrame.classId,
        sourceMachineryFrame.classRuleFrame?.classId,
        sourceMachineryFrame.classProfile?.classId,
        proofConclusion.classId
      ].map(value => normalizeClassicalNahuatlVncDerivationToken(value).toUpperCase()).filter(Boolean);
      if (!["A", "B", "C", "D"].includes(sourceClass) || !classContinuityCandidates.length || classContinuityCandidates.some(candidate => candidate !== sourceClass)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-class-continuity-failed" };
      }
      const typedValenceSlots = (finalTypedFrame.slots.prePredicate || []).filter(slot => /^valence(?:-|$)/u.test(slot?.id || ""));
      const sourceObjectRequests = getClassicalNahuatlVncDerivationSourceObjectRequests(sourceMachineryFrame, sourceStem, finalTypedFrame);
      if (!sourceObjectRequests) {
        return { authorizationStatus: "blocked", blockReason: typedValenceSlots.length ? "classical-vnc-derivation-source-object-slot-continuity-failed" : "classical-vnc-derivation-source-identity-or-object-contract-invalid" };
      }
      if (!areClassicalNahuatlVncDerivationObjectRequestsValid(sourceObjectRequests)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-identity-or-object-contract-invalid" };
      }
      if (typedValenceSlots.length !== sourceObjectRequests.length) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-object-slot-continuity-failed" };
      }
      const expectedTypedValenceArity = sourceObjectRequests.length > 1
        ? "multiple"
        : sourceObjectRequests.length === 0
          ? "vacant"
          : sourceObjectRequests[0].objectKind === "specific-projective" || sourceObjectRequests[0].objectKind === "reflexive"
            ? "dyadic"
            : "monadic";
      if (finalTypedFrame.valenceArity !== expectedTypedValenceArity) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-object-slot-continuity-failed" };
      }
      const canonicalBaseValence = normalizeClassicalNahuatlVncDerivationToken(proofConclusion.classTargetValence);
      const baseValenceContinuityCandidates = [
        sourceMachineryFrame.citationRuleFrame?.valence,
        sourceMachineryFrame.classTargetValence,
        sourceMachineryFrame.classRuleFrame?.classTargetValence,
        proofConclusion.classTargetValence
      ].map(normalizeClassicalNahuatlVncDerivationToken).filter(Boolean);
      if (!canonicalBaseValence || !baseValenceContinuityCandidates.length || baseValenceContinuityCandidates.some(candidate => candidate !== canonicalBaseValence)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-valence-continuity-failed" };
      }
      const sourceValence = sourceObjectRequests.length > 1 ? "multiple-object" : canonicalBaseValence;
      const outerValence = normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame.valence);
      if (outerValence && outerValence !== sourceValence) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-valence-continuity-failed" };
      }
      if (sourceObjectRequests.length === 0 && sourceValence !== "intransitive" || sourceObjectRequests.length === 1 && sourceValence === "intransitive") {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-valence-continuity-failed" };
      }
      const mood = normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame.priorVncFrame?.personDyad?.mood || sourceMachineryFrame.priorVncFrame?.mood || "indicative");
      const tense = normalizeClassicalNahuatlVncDerivationToken(sourceMachineryFrame.priorVncFrame?.tense || "present");
      const typedSubjectCandidates = getClassicalNahuatlVncDerivationTypedSubjectCandidates(finalTypedFrame, {
        stem: typedPredicateStem,
        mood,
        tense
      });
      if (typedSubjectCandidates.length !== 1) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-subject-continuity-failed" };
      }
      const sourceSubject = typedSubjectCandidates[0];
      const subjectContinuityCandidates = [
        sourceMachineryFrame.targetSubject,
        sourceMachineryFrame.priorVncFrame?.subject,
        sourceMachineryFrame.priorVncFrame?.personDyad?.subject,
        sourceMachineryFrame.multipleObjectClusterFrame?.subject
      ].map(normalizeClassicalNahuatlVncDerivationToken).filter(Boolean);
      if (!subjectContinuityCandidates.length || subjectContinuityCandidates.some(candidate => candidate !== sourceSubject)) {
        return { authorizationStatus: "blocked", blockReason: "classical-vnc-derivation-source-subject-continuity-failed" };
      }
      const descriptor = {
        authorizationStatus: "authorized",
        blockReason: "",
        sourceKind,
        sourceVoice: "active",
        sourceStem,
        sourceClass,
        sourceValence,
        sourceSubject,
        mood,
        tense,
        sourceObjectRequests,
        sourceObjectCount: sourceObjectRequests.length,
        finalTypedFrame,
        formationFinalTypedFrame: finalTypedFrame,
        formationSourceSignature: "",
        formationSourceMachineryFrame: sourceMachineryFrame,
        participantSurfaceSubject: sourceSubject,
        participantSurfaceObjectRequests: sourceObjectRequests,
        promotedSourceObjectRequest: null,
        implicitAgentObjectKind: "",
        priorDerivationSignature: derivedSource ? sourceMachineryFrame.canonicalSignature : "",
        sourceMachineryFrame
      };
      descriptor.sourceSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceSignaturePayload(descriptor));
      return descriptor;
    }
    function isClassicalNahuatlVncDerivationSourceMachineryFrame(frame = null) {
      return getClassicalNahuatlVncDerivationSourceDescriptor(frame, 0, createClassicalNahuatlVncDerivationValidationContext()).authorizationStatus === "authorized";
    }
    function sourceUsesClassicalNahuatlLongVowelNotation(stem = "") {
      return /[āēīō]/u.test(normalizeClassicalNahuatlVncDerivationStem(stem));
    }
    function getClassicalNahuatlVncDerivationLongSuffix(stem = "", marked = "", unmarked = "") {
      return sourceUsesClassicalNahuatlLongVowelNotation(stem) ? marked : unmarked;
    }
    function joinClassicalNahuatlVncDerivationMorphemes(...parts) {
      return parts.map(part => normalizeClassicalNahuatlVncDerivationStem(part).replace(/^-+|-+$/gu, "")).filter(Boolean).join("-");
    }
    function replaceClassicalNahuatlVncDerivationRightEdge(stem = "", removeCharacterCount = 0, ...morphemes) {
      const normalizedStem = normalizeClassicalNahuatlVncDerivationStem(stem);
      const retainedStem = normalizedStem.slice(0, Math.max(0, normalizedStem.length - Number(removeCharacterCount || 0))).replace(/-+$/gu, "");
      return joinClassicalNahuatlVncDerivationMorphemes(retainedStem, ...morphemes);
    }
    function replaceClassicalNahuatlVncDerivationRightEdgeBeforeVowel(stem = "", removeCharacterCount = 0, followingVowel = "", ...remainingMorphemes) {
      const normalizedStem = normalizeClassicalNahuatlVncDerivationStem(stem);
      let retainedStem = normalizedStem.slice(0, Math.max(0, normalizedStem.length - Number(removeCharacterCount || 0))).replace(/-+$/gu, "");
      const normalizedFollowingVowel = normalizeClassicalNahuatlVncDerivationToken(followingVowel).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").charAt(0);
      if (["a", "o"].includes(normalizedFollowingVowel) && /qu$/u.test(retainedStem)) {
        retainedStem = retainedStem.replace(/qu$/u, "c");
      } else if (["a", "o"].includes(normalizedFollowingVowel) && /c$/u.test(retainedStem) && /ci$/u.test(normalizedStem)) {
        retainedStem = retainedStem.replace(/c$/u, "z");
      } else if (["e", "i"].includes(normalizedFollowingVowel) && /c$/u.test(retainedStem)) {
        retainedStem = retainedStem.replace(/c$/u, "qu");
      } else if (["e", "i"].includes(normalizedFollowingVowel) && /z$/u.test(retainedStem)) {
        retainedStem = retainedStem.replace(/z$/u, "c");
      }
      return joinClassicalNahuatlVncDerivationMorphemes(retainedStem, followingVowel, ...remainingMorphemes);
    }
    function replaceClassicalNahuatlVncDerivationRightEdgeWithinBaseBeforeVowel(stem = "", removeCharacterCount = 0, replacementSegment = "") {
      const normalizedStem = normalizeClassicalNahuatlVncDerivationStem(stem);
      let retainedStem = normalizedStem.slice(0, Math.max(0, normalizedStem.length - Number(removeCharacterCount || 0))).replace(/-+$/gu, "");
      const normalizedReplacement = normalizeClassicalNahuatlVncDerivationToken(replacementSegment).replace(/^-+|-+$/gu, "");
      const normalizedFollowingVowel = normalizedReplacement.normalize("NFD").replace(/[\u0300-\u036f]/gu, "").charAt(0);
      if (["a", "o"].includes(normalizedFollowingVowel) && /qu$/u.test(retainedStem)) {
        retainedStem = retainedStem.replace(/qu$/u, "c");
      } else if (["a", "o"].includes(normalizedFollowingVowel) && /c$/u.test(retainedStem) && /ci$/u.test(normalizedStem)) {
        retainedStem = retainedStem.replace(/c$/u, "z");
      } else if (["e", "i"].includes(normalizedFollowingVowel) && /c$/u.test(retainedStem)) {
        retainedStem = retainedStem.replace(/c$/u, "qu");
      } else if (["e", "i"].includes(normalizedFollowingVowel) && /z$/u.test(retainedStem)) {
        retainedStem = retainedStem.replace(/z$/u, "c");
      }
      return `${retainedStem}${normalizedReplacement}`;
    }
    function getClassicalNahuatlVncDerivationSourceAnalysisSignaturePayload(frame = {}) {
      return {
        sourceSignature: frame.sourceSignature || "",
        sourceVoice: frame.sourceVoice || "active",
        formationSourceSignature: frame.formationSourceSignature || "",
        sourceStem: frame.sourceStem || "",
        lexicalStem: frame.lexicalStem || "",
        sourceClass: frame.sourceClass || "",
        sourceValence: frame.sourceValence || "",
        participantSourceTypedIdentity: frame.participantSourceTypedIdentity || "",
        participantSurfaceSubject: frame.participantSurfaceSubject || "",
        participantSurfaceObjectRequests: frame.participantSurfaceObjectRequests || [],
        promotedSourceObjectRequest: frame.promotedSourceObjectRequest || null,
        implicitAgentObjectKind: frame.implicitAgentObjectKind || "",
        explicitBoundaryObserved: frame.explicitBoundaryObserved === true,
        boundaryAuthority: frame.boundaryAuthority || "",
        analyses: frame.analyses || [],
        authorizationStatus: frame.authorizationStatus || "",
        blockReason: frame.blockReason || "",
        callerSuppliedAnalysisAllowed: frame.callerSuppliedAnalysisAllowed,
        formulaArtifactAuthority: frame.formulaArtifactAuthority,
        surfaceArtifactAuthority: frame.surfaceArtifactAuthority
      };
    }
    function buildClassicalNahuatlVncDerivationSourceAnalysisFromDescriptor(sourceDescriptor = {}) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (typeof runtimeTarget?.buildClassicalNahuatlLesson20StemFinalShapeFrame !== "function" || typeof runtimeTarget?.buildClassicalNahuatlLesson20ActiveStemIdentityFrame !== "function") {
        return null;
      }
      const sourceFinalShapeFrame = runtimeTarget.buildClassicalNahuatlLesson20StemFinalShapeFrame(sourceDescriptor.sourceStem);
      const sourceIdentityFrame = runtimeTarget.buildClassicalNahuatlLesson20ActiveStemIdentityFrame(sourceDescriptor.sourceStem, {
        verbClass: sourceDescriptor.sourceClass,
        sourceValence: sourceDescriptor.sourceValence
      });
      if (sourceFinalShapeFrame?.authorizationStatus !== "authorized" || sourceFinalShapeFrame.stem !== sourceDescriptor.sourceStem || sourceIdentityFrame?.authorizationStatus !== "authorized" || sourceIdentityFrame.enteredStem !== sourceDescriptor.sourceStem) {
        return null;
      }
      const lexicalStem = getClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem);
      const analyses = [];
      const analysisIds = new Set();
      const addAnalysis = ({ analysisId = "", category = "", segments = [], root = "", stockFormative = "", stemFormative = "", analysisAuthority = "andrews-final-shape-category", lexicalStatus = "shape-licensed-candidate", andrewsSections = [], sourceAnalysisSelectionRequired = false } = {}) => {
        const normalizedSegments = segments.map(segment => normalizeClassicalNahuatlVncDerivationStem(segment).replace(/^-+|-+$/gu, "")).filter(Boolean);
        if (!analysisId || !category || analysisIds.has(analysisId)) {
          return;
        }
        analysisIds.add(analysisId);
        analyses.push(Object.freeze({
          analysisId,
          category,
          segments: Object.freeze(normalizedSegments),
          root: normalizeClassicalNahuatlVncDerivationStem(root).replace(/^-+|-+$/gu, ""),
          stockFormative: normalizeClassicalNahuatlVncDerivationStem(stockFormative).replace(/^-+|-+$/gu, ""),
          stemFormative: normalizeClassicalNahuatlVncDerivationStem(stemFormative).replace(/^-+|-+$/gu, ""),
          analysisAuthority,
          lexicalStatus,
          andrewsSections: Object.freeze([...andrewsSections]),
          sourceAnalysisSelectionRequired: sourceAnalysisSelectionRequired === true,
          userAuthoredBoundaryRequired: false
        }));
      };
      const exactWitness = CLASSICAL_NAHUATL_LESSONS24_25_SOURCE_ANALYSIS_WITNESSES.find(witness => witness.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias))) || null;
      if (exactWitness) {
        exactWitness.categories.forEach(category => addAnalysis({
          analysisId: `${exactWitness.analysisId}:${category}`,
          category,
          segments: exactWitness.canonicalSegments,
          root: exactWitness.canonicalSegments[0] || "",
          stockFormative: exactWitness.canonicalSegments.length > 2 ? exactWitness.canonicalSegments.at(-2) : "",
          stemFormative: exactWitness.canonicalSegments.at(-1) || "",
          analysisAuthority: "andrews-lexical-source-analysis-witness",
          lexicalStatus: "canvas-licensed-source-analysis",
          andrewsSections: exactWitness.andrewsSections
        }));
      }
      const destockalOaMatch = lexicalStem.match(/^(.*?)([iao])hui$/u);
      if (destockalOaMatch?.[1] && (!exactWitness || exactWitness.categories.includes("destockal-i-a-o-hui"))) {
        addAnalysis({
          analysisId: `cn-l24-boundary-free-destockal-${destockalOaMatch[2]}-hui:${lexicalStem}`,
          category: "destockal-i-a-o-hui",
          segments: [destockalOaMatch[1], destockalOaMatch[2], "hui"],
          root: destockalOaMatch[1],
          stockFormative: destockalOaMatch[2],
          stemFormative: "hui",
          andrewsSections: ["24.4", "24.7"]
        });
      }
      const destockalHuaMatch = lexicalStem.match(/^(.*?)([āē])hua$/u);
      if (destockalHuaMatch?.[1]) {
        addAnalysis({
          analysisId: `cn-l24-boundary-free-destockal-${destockalHuaMatch[2]}-hua:${lexicalStem}`,
          category: "destockal-long-vowel-hua",
          segments: [destockalHuaMatch[1], destockalHuaMatch[2], "hua"],
          root: destockalHuaMatch[1],
          stockFormative: destockalHuaMatch[2],
          stemFormative: "hua",
          andrewsSections: ["24.4", "24.6"]
        });
      }
      if (lexicalStem.length > 2 && lexicalStem.endsWith("ya") && !exactWitness?.categories.includes("root-plus-ya")) {
        const root = lexicalStem.slice(0, -2);
        const witnessedRootPlusYa = exactWitness?.categories.includes("root-plus-ya") === true;
        addAnalysis({
          analysisId: `cn-l24-25-boundary-free-root-plus-ya:${lexicalStem}`,
          category: "root-plus-ya",
          segments: [root, "ya"],
          root,
          stemFormative: "ya",
          lexicalStatus: witnessedRootPlusYa ? "canvas-licensed-source-analysis" : "shape-licensed-lexical-choice",
          andrewsSections: ["24.3.2.b", "25.4.8", "25.5.2"],
          sourceAnalysisSelectionRequired: !witnessedRootPlusYa
        });
      }
      if (lexicalStem.length > 2 && lexicalStem.endsWith("ti")) {
        const root = lexicalStem.slice(0, -2);
        addAnalysis({
          analysisId: `cn-l25-boundary-free-denominal-ti:${lexicalStem}`,
          category: "denominal-ti-candidate",
          segments: [root, "ti"],
          root,
          stemFormative: "ti",
          lexicalStatus: "shape-licensed-lexical-choice",
          andrewsSections: ["25.5.1", "54.2.1"],
          sourceAnalysisSelectionRequired: true
        });
      }
      if (lexicalStem.length > 2 && lexicalStem.endsWith("ni")) {
        addAnalysis({
          analysisId: `cn-l24-boundary-free-destockal-ni:${lexicalStem}`,
          category: "destockal-ni-candidate",
          segments: [lexicalStem.slice(0, -2), "ni"],
          root: lexicalStem.slice(0, -2),
          stemFormative: "ni",
          lexicalStatus: "shape-licensed-lexical-choice",
          andrewsSections: ["24.4", "24.5"],
          sourceAnalysisSelectionRequired: true
        });
      }
      if (lexicalStem.length > 3 && lexicalStem.endsWith("hui") && !destockalOaMatch) {
        addAnalysis({
          analysisId: `cn-l24-boundary-free-destockal-hui:${lexicalStem}`,
          category: "destockal-hui-candidate",
          segments: [lexicalStem.slice(0, -3), "hui"],
          root: lexicalStem.slice(0, -3),
          stemFormative: "hui",
          lexicalStatus: "shape-licensed-lexical-choice",
          andrewsSections: ["24.4", "24.5"],
          sourceAnalysisSelectionRequired: true
        });
      }
      const frame = {
        kind: "classical-nahuatl-vnc-derivation-source-analysis",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        sourceAuthority: "Andrews Lessons 24-25 typed source morphology",
        sourceDocument: CLASSICAL_NAHUATL_VNC_DERIVATION_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        sourceSignature: sourceDescriptor.sourceSignature,
        sourceVoice: sourceDescriptor.sourceVoice || "active",
        formationSourceSignature: sourceDescriptor.formationSourceSignature || sourceDescriptor.sourceSignature,
        sourceStem: sourceDescriptor.sourceStem,
        lexicalStem,
        sourceClass: sourceDescriptor.sourceClass,
        sourceValence: sourceDescriptor.sourceValence,
        sourceMachineryFrame: sourceDescriptor.sourceMachineryFrame,
        formationSourceMachineryFrame: sourceDescriptor.formationSourceMachineryFrame || sourceDescriptor.sourceMachineryFrame,
        participantSourceTypedIdentity: sourceDescriptor.finalTypedFrame?.semanticIdentity || "",
        participantSurfaceSubject: sourceDescriptor.participantSurfaceSubject || sourceDescriptor.sourceSubject,
        participantSurfaceObjectRequests: sourceDescriptor.participantSurfaceObjectRequests || sourceDescriptor.sourceObjectRequests,
        promotedSourceObjectRequest: sourceDescriptor.promotedSourceObjectRequest || null,
        implicitAgentObjectKind: sourceDescriptor.implicitAgentObjectKind || "",
        sourceFinalShapeFrame,
        sourceIdentityFrame,
        sourceInternalMorphology: sourceIdentityFrame.internalMorphology || null,
        explicitBoundaryObserved: sourceIdentityFrame.internalMorphology?.hasExplicitBoundary === true,
        boundaryAuthority: "engine-derived-analysis; editorial hyphens are observation only",
        analyses: Object.freeze(analyses),
        analysisCount: analyses.length,
        callerSuppliedAnalysisAllowed: false,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      };
      frame.canonicalSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceAnalysisSignaturePayload(frame));
      return Object.freeze(frame);
    }
    function getClassicalNahuatlVncDerivationSourceAnalysis(sourceDescriptor = {}) {
      return buildClassicalNahuatlVncDerivationSourceAnalysisFromDescriptor(sourceDescriptor);
    }
    function buildClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceMachineryFrame = null) {
      const descriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame, 1, createClassicalNahuatlVncDerivationValidationContext());
      if (descriptor.authorizationStatus !== "authorized") {
        return Object.freeze({
          kind: "classical-nahuatl-vnc-derivation-source-analysis",
          version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
          sourceAuthority: "Andrews Lessons 24-25 typed source morphology",
          sourceDocument: CLASSICAL_NAHUATL_VNC_DERIVATION_SOURCE_DOCUMENT,
          authorizationStatus: "blocked",
          blockReason: descriptor.blockReason,
          sourceSignature: "",
          sourceVoice: "",
          formationSourceSignature: "",
          sourceStem: "",
          lexicalStem: "",
          sourceClass: "",
          sourceValence: "",
          sourceMachineryFrame: null,
          formationSourceMachineryFrame: null,
          participantSourceTypedIdentity: "",
          participantSurfaceSubject: "",
          participantSurfaceObjectRequests: Object.freeze([]),
          promotedSourceObjectRequest: null,
          implicitAgentObjectKind: "",
          analyses: Object.freeze([]),
          analysisCount: 0,
          callerSuppliedAnalysisAllowed: false,
          formulaArtifactAuthority: false,
          surfaceArtifactAuthority: false,
          canonicalSignature: ""
        });
      }
      return buildClassicalNahuatlVncDerivationSourceAnalysisFromDescriptor(descriptor);
    }
    function getComparableClassicalNahuatlVncDerivationSourceAnalysisFrame(frame = {}) {
      return Object.fromEntries(Object.entries(frame).filter(([key]) => !["sourceMachineryFrame", "formationSourceMachineryFrame"].includes(key)));
    }
    function isClassicalNahuatlVncDerivationSourceAnalysisFrameInternal(frame = null, depth = 0, validationContext = null) {
      if (!frame || frame.kind !== "classical-nahuatl-vnc-derivation-source-analysis" || frame.version !== CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION || frame.authorizationStatus !== "authorized" || !frame.sourceSignature || !frame.sourceStem || !frame.lexicalStem || !Array.isArray(frame.analyses) || frame.analysisCount !== frame.analyses.length || frame.callerSuppliedAnalysisAllowed !== false || frame.formulaArtifactAuthority !== false || frame.surfaceArtifactAuthority !== false || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH) {
        return false;
      }
      if (validationContext?.sourceAnalyses?.has(frame)) {
        return true;
      }
      if (frame.canonicalSignature !== signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceAnalysisSignaturePayload(frame))) {
        return false;
      }
      for (let index = 0; index < frame.analyses.length; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(frame.analyses, String(index));
        const analysis = descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value") ? descriptor.value : null;
        if (!analysis?.analysisId || !analysis?.category || !Array.isArray(analysis.segments) || analysis.userAuthoredBoundaryRequired !== false) {
          return false;
        }
      }
      const descriptor = getClassicalNahuatlVncDerivationSourceDescriptor(frame.sourceMachineryFrame, depth + 1, validationContext);
      const rebuilt = descriptor.authorizationStatus === "authorized" ? buildClassicalNahuatlVncDerivationSourceAnalysisFromDescriptor(descriptor) : null;
      const canonical = Boolean(rebuilt && frame.sourceSignature === descriptor.sourceSignature && areClassicalNahuatlVncDerivationValuesEqual(getComparableClassicalNahuatlVncDerivationSourceAnalysisFrame(frame), getComparableClassicalNahuatlVncDerivationSourceAnalysisFrame(rebuilt)));
      if (canonical) {
        validationContext?.sourceAnalyses?.add(frame);
      }
      return canonical;
    }
    function isClassicalNahuatlVncDerivationSourceAnalysisFrame(frame = null) {
      return isClassicalNahuatlVncDerivationSourceAnalysisFrameInternal(frame, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function getClassicalNahuatlVncDerivationSourceAnalysisByCategory(frame = null, category = "") {
      const normalizedCategory = normalizeClassicalNahuatlVncDerivationToken(category);
      const structurallySigned = Boolean(frame && frame.kind === "classical-nahuatl-vnc-derivation-source-analysis" && frame.version === CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION && frame.authorizationStatus === "authorized" && Array.isArray(frame.analyses) && frame.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationSourceAnalysisSignaturePayload(frame)));
      return structurallySigned ? frame.analyses.find(analysis => analysis.category === normalizedCategory) || null : null;
    }
    function hasClassicalNahuatlVncDerivationSourceAnalysisCategory(frame = null, category = "") {
      return Boolean(getClassicalNahuatlVncDerivationSourceAnalysisByCategory(frame, category));
    }
    function getClassicalNahuatlVncDerivationFinalShapeFingerprint(frame = null) {
      if (!frame || typeof frame !== "object") {
        return null;
      }
      return {
        kind: frame.kind,
        version: frame.version,
        authorizationStatus: frame.authorizationStatus,
        stem: frame.stem,
        orthographicTail: frame.orthographicTail,
        letterTail: frame.letterTail,
        soundTail: frame.soundTail,
        morphemeTail: frame.morphemeTail,
        morphemes: frame.morphemes,
        finalLetter: frame.finalLetter,
        precedingLetter: frame.precedingLetter,
        finalSound: frame.finalSound,
        precedingSound: frame.precedingSound,
        finalVowelLength: frame.finalVowelLength,
        hasMorphemeBoundary: frame.hasMorphemeBoundary
      };
    }
    function getClassicalNahuatlVncDerivationInternalMorphologyFingerprint(frame = null) {
      if (!frame || typeof frame !== "object") {
        return null;
      }
      return {
        morphemes: frame.morphemes || [],
        hasExplicitBoundary: frame.hasExplicitBoundary === true,
        explicitRootPlusYaBoundary: frame.explicitRootPlusYaBoundary === true,
        rootPlusYaBoundaryStatus: frame.rootPlusYaBoundaryStatus || "",
        hiddenIntervocalicY: frame.hiddenIntervocalicY === true,
        finalVowelAllomorph: frame.finalVowelAllomorph || ""
      };
    }
    function hasClassicalNahuatlTwoConsonantClusterBeforeFinalVowel(stem = "") {
      const normalized = normalizeClassicalNahuatlVncDerivationStem(stem).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f-]/gu, "");
      const units = normalized.match(/ch|tl|tz|qu|hu|[aeio]|./gu) || [];
      let finalVowelIndex = -1;
      for (let index = units.length - 1; index >= 0; index -= 1) {
        if (/^[aeio]$/u.test(units[index])) {
          finalVowelIndex = index;
          break;
        }
      }
      if (finalVowelIndex < 0) {
        return false;
      }
      let consonantCount = 0;
      for (let index = finalVowelIndex - 1; index >= 0 && !/^[aeio]$/u.test(units[index]); index -= 1) {
        consonantCount += 1;
      }
      return consonantCount >= 2;
    }
    function hasClassicalNahuatlExactDerivationSourceSelfReference(sourceDescriptor = {}, derivationType = "") {
      const derivationalRoute = derivationType === "causative" || derivationType === "applicative";
      const personCategoryRequiresReflexive = ["1sg", "2sg", "1pl", "2pl"].includes(sourceDescriptor.sourceSubject);
      return Boolean(derivationalRoute && personCategoryRequiresReflexive && sourceDescriptor.sourceObjectRequests?.some(request => (
        request.objectKind === "specific-projective"
        && request.objectPerson === sourceDescriptor.sourceSubject
      )));
    }
    function getClassicalNahuatlVncDerivationOptionSignaturePayload(option = {}) {
      return {
        optionId: option.optionId,
        derivationType: option.derivationType,
        derivationSubtype: option.derivationSubtype,
        derivationRoute: option.derivationRoute || "",
        procedure: option.procedure,
        underlyingSuffix: option.underlyingSuffix || "",
        suffixLength: option.suffixLength || "",
        sourceStem: option.sourceStem,
        sourceSignature: option.sourceSignature,
        targetStem: option.targetStem,
        targetClass: option.targetClass,
        ruleId: option.ruleId,
        ruleTagId: option.ruleTagId,
        andrewsSection: option.andrewsSection,
        formationLesson: option.formationLesson || "",
        evidenceSections: option.evidenceSections || [],
        scopeModel: option.scopeModel || "",
        scopeSection: option.scopeSection || "",
        scopeRule: option.scopeRule || "",
        participantRule: option.participantRule || "",
        authorityStatus: option.authorityStatus,
        derivationLicenseId: option.derivationLicenseId || "",
        licensedSourceClass: option.licensedSourceClass || "",
        licensedSourceValence: option.licensedSourceValence || "",
        licensedMinimumSourceObjectCount: option.licensedMinimumSourceObjectCount ?? null,
        licensedMaximumSourceObjectCount: option.licensedMaximumSourceObjectCount ?? null,
        licensedLesson20OptionId: option.licensedLesson20OptionId || "",
        licensedLesson20RuleId: option.licensedLesson20RuleId || "",
        licensedLesson20NonactiveStem: option.licensedLesson20NonactiveStem || "",
        licensedLesson20SuffixFamily: option.licensedLesson20SuffixFamily || "",
        lesson20OptionId: option.lesson20OptionId || "",
        lesson20RuleId: option.lesson20RuleId || "",
        lesson20RecordSignature: option.lesson20RecordSignature || "",
        sourceAnalysisSignature: option.sourceAnalysisFrame?.canonicalSignature || "",
        sourceAnalysisId: option.sourceAnalysisId || "",
        sourceAnalysisSelectionRequired: option.sourceAnalysisSelectionRequired === true,
        sourceFinalShapeFrame: getClassicalNahuatlVncDerivationFinalShapeFingerprint(option.sourceFinalShapeFrame),
        sourceInternalMorphology: getClassicalNahuatlVncDerivationInternalMorphologyFingerprint(option.sourceInternalMorphology),
        formationRuleTier: option.formationRuleTier || "",
        productivityStatus: option.productivityStatus || "",
        lexicalChoiceRequired: option.lexicalChoiceRequired === true,
        lexicalEvidenceMatches: option.lexicalEvidenceMatches || [],
        canvasPreference: option.canvasPreference || "",
        preferenceRuleId: option.preferenceRuleId || "",
        preferenceAndrewsSection: option.preferenceAndrewsSection || "",
        targetConstruction: option.targetConstruction || null,
        targetEnvironment: option.targetEnvironment || null,
        supportiveInitialI: option.supportiveInitialI === true,
        causativeOaHistory: option.causativeOaHistory || null,
        exactNonactiveBridgeSignature: option.exactNonactiveBridgeFrame?.canonicalSignature || "",
        citationBridgeStem: option.citationBridgeStem || "",
        citationBridgeVisibility: option.citationBridgeVisibility || "",
        citationBridgeHypothetical: option.citationBridgeHypothetical ?? null,
        citationBridgeAuthority: option.citationBridgeAuthority || "",
        causativeCitationRole: option.causativeCitationRole || "",
        canvasDerivationChoiceSignature: option.canvasDerivationChoiceFrame?.canonicalSignature || ""
      };
    }
    function getClassicalNahuatlLesson20RecordFingerprintPayload(record = null) {
      if (!record || typeof record !== "object") {
        return null;
      }
      return {
        kind: record.kind,
        version: record.version,
        authorizationStatus: record.authorizationStatus,
        sourceStem: record.sourceStem,
        nonactiveStem: record.nonactiveStem,
        suffixFamily: record.suffixFamily,
        targetClass: record.targetClass,
        selectedOptionId: record.selectedOptionId,
        selectedRuleId: record.selectedRuleId,
        selectedFormationAuthority: record.selectedFormationAuthority,
        formationCore: record.formationCore,
        formationContinuation: record.formationContinuation,
        formationSequence: record.formationSequence || [],
        lexicalEvidenceMatches: record.lexicalEvidenceMatches || [],
        lexicalEvidenceSignature: record.lexicalEvidenceSignature || "",
        sourceIdentityStem: record.sourceIdentityFrame?.enteredStem || "",
        sourceIdentityAuthorizationStatus: record.sourceIdentityFrame?.authorizationStatus || "",
        finalShapeSourceStem: record.finalShapeRelation?.sourceFinalShapeFrame?.stem || "",
        finalShapeTargetStem: record.finalShapeRelation?.nonactiveFinalShapeFrame?.stem || "",
        finalShapeSuffixFamily: record.finalShapeRelation?.suffixFamily || "",
        formulaArtifactAuthority: record.formulaArtifactAuthority,
        surfaceArtifactAuthority: record.surfaceArtifactAuthority
      };
    }
    function getClassicalNahuatlLesson20RecordSignature(record = null) {
      const payload = getClassicalNahuatlLesson20RecordFingerprintPayload(record);
      return payload ? signClassicalNahuatlVncDerivationValue(payload) : "";
    }
    function buildClassicalNahuatlVncExactNonactiveBridgeFrame(sourceDescriptor = {}, witness = {}) {
      const frame = {
        kind: "classical-nahuatl-vnc-exact-nonactive-bridge-frame",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        authorizationStatus: "authorized",
        sourceAuthority: "Andrews exact typed source and nonactive bridge witness",
        sourceDocument: CLASSICAL_NAHUATL_VNC_DERIVATION_SOURCE_DOCUMENT,
        sourceStem: sourceDescriptor.sourceStem,
        sourceSignature: sourceDescriptor.sourceSignature,
        sourceClass: sourceDescriptor.sourceClass,
        sourceValence: sourceDescriptor.sourceValence,
        sourceObjectCount: sourceDescriptor.sourceObjectCount,
        nonactiveStem: witness.nonactiveStem,
        suffixFamily: witness.suffixFamily,
        ruleId: witness.ruleId,
        andrewsSection: witness.andrewsSection,
        citationVisibility: witness.citationVisibility,
        hypothetical: witness.hypothetical === true,
        typedFrameAuthority: true,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedTargetAllowed: false
      };
      frame.canonicalSignature = signClassicalNahuatlVncDerivationValue(frame);
      return Object.freeze(frame);
    }
    function finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor = {}, option = {}) {
      const finalized = {
        ...option,
        sourceStem: sourceDescriptor.sourceStem,
        sourceSignature: sourceDescriptor.sourceSignature,
        targetStem: normalizeClassicalNahuatlVncDerivationStem(option.targetStem),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedTargetAllowed: false
      };
      finalized.derivationRoute = finalized.derivationRoute || finalized.derivationSubtype;
      finalized.subtype = ["type-one", "type-two", "type-three"].find(type => String(finalized.derivationRoute || "").startsWith(type))
        || finalized.derivationSubtype
        || "type-two";
      finalized.formationType = finalized.subtype;
      finalized.lesson20RecordSignature = getClassicalNahuatlLesson20RecordSignature(finalized.lesson20NonactiveStemRecord);
      finalized.lexicalEvidenceMatches = getClassicalNahuatlKarttunen1992DerivationEvidenceMatches({
        derivationType: finalized.derivationType,
        sourceStem: finalized.sourceStem,
        targetStem: finalized.targetStem
      });
      const optionAliases = Array.isArray(option.optionAliases) ? option.optionAliases : [finalized.ruleId, finalized.lesson20RuleId];
      finalized.optionAliases = Object.freeze(Array.from(new Set(optionAliases.map(normalizeClassicalNahuatlVncDerivationToken).filter(Boolean))));
      if (option.canvasAuthorityExampleId) {
        finalized.canvasDerivationChoiceFrame = buildClassicalNahuatlCanvasDerivationChoiceFrame(sourceDescriptor, finalized, option.canvasAuthorityExampleId);
        if (!finalized.canvasDerivationChoiceFrame) {
          throw new Error(`Canvas derivation choice could not be compiled for ${option.canvasAuthorityExampleId}`);
        }
        finalized.choiceId = finalized.canvasDerivationChoiceFrame.identity.choiceId;
        finalized.choiceSignature = finalized.canvasDerivationChoiceFrame.canonicalSignature;
      }
      finalized.canonicalSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationOptionSignaturePayload(finalized));
      return Object.freeze(finalized);
    }
    function applyClassicalNahuatlTypeTwoCausativeExactSurfaceOverlay(sourceDescriptor = {}, option = {}) {
      const lesson20NonactiveStems = [
        option.licensedLesson20NonactiveStem,
        option.lesson20NonactiveStem,
        option.lesson20NonactiveStemRecord?.nonactiveStem
      ].filter(Boolean);
      const routeFingerprint = [option.derivationRoute, option.ruleId, option.derivationLicenseId]
        .map(normalizeClassicalNahuatlVncDerivationToken)
        .filter(Boolean)
        .join("|");
      const overlay = CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_SURFACE_OVERLAYS.find(candidate => (
        hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, candidate.sourceStem)
        && candidate.sourceClasses.includes(sourceDescriptor.sourceClass)
        && candidate.sourceValences.includes(sourceDescriptor.sourceValence)
        && (!candidate.lesson20NonactiveStems.length || candidate.lesson20NonactiveStems.some(expected => (
          lesson20NonactiveStems.some(actual => hasClassicalNahuatlVncDerivationLexicalKey(actual, expected))
        )))
        && (!candidate.routeIncludes || routeFingerprint.includes(candidate.routeIncludes))
      )) || null;
      if (!overlay) {
        return option;
      }
      if (hasClassicalNahuatlVncDerivationLexicalKey(option.targetStem, overlay.targetStem)
        && option.exactWitness === true
        && option.ruleId === overlay.ruleId) {
        return option;
      }
      return finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
        ...option,
        optionId: `${option.optionId}:canvas-surface:${overlay.ruleId}`,
        label: `${overlay.targetStem} (type-two causative · exact Canvas realization over ${option.andrewsSection || "licensed route"})`,
        targetStem: overlay.targetStem,
        ruleId: overlay.ruleId,
        exactWitness: true,
        authorityStatus: "exact-witness-over-typed-productive-route",
        formationRuleTier: "exact-lexical-surface-overlay",
        baseRuleId: option.ruleId,
        baseTargetStem: option.targetStem,
        supportiveInitialI: overlay.supportiveInitialI === true,
        citationBridgeStem: overlay.canvasBridge?.stem || option.citationBridgeStem || "",
        citationBridgeVisibility: overlay.canvasBridge ? "visible" : option.citationBridgeVisibility || "",
        citationBridgeHypothetical: overlay.canvasBridge ? overlay.canvasBridge.hypothetical === true : option.citationBridgeHypothetical,
        citationBridgeAuthority: overlay.canvasBridge ? "exact-andrews-printed-nonactive-bridge" : option.citationBridgeAuthority || "",
        optionAliases: [...(Array.isArray(option.optionAliases) ? option.optionAliases : []), option.ruleId, overlay.ruleId],
        targetConstruction: Object.freeze({
          ...(option.targetConstruction || {}),
          operation: "realize-exact-canvas-surface-over-licensed-route",
          baseOperation: option.targetConstruction?.operation || option.procedure || "",
          baseTargetStem: option.targetStem,
          surfaceRealization: overlay.targetStem
        })
      });
    }
    function getClassicalNahuatlTypeOneCausativeOptions(sourceDescriptor = {}) {
      if (sourceDescriptor.sourceValence !== "intransitive" || sourceDescriptor.sourceObjectCount !== 0) {
        return [];
      }
      const analysis = getClassicalNahuatlVncDerivationSourceAnalysis(sourceDescriptor);
      if (!analysis) {
        return [];
      }
      const shape = analysis.sourceFinalShapeFrame;
      const morphology = analysis.sourceInternalMorphology || {};
      const morphemes = Array.isArray(shape.morphemes) ? shape.morphemes : [];
      const finalMorpheme = morphemes.at(-1) || "";
      const precedingMorpheme = morphemes.at(-2) || "";
      const longA = "ā";
      const common = {
        derivationType: "causative",
        ruleTagId: "cn-l24-type-one-causative-a",
        formationLesson: "24",
        scopeModel: "causative-source-vnc-core",
        scopeSection: "24.9",
        scopeRule: "The causative governs the source subject together with the source VNC core.",
        participantRule: "The source subject becomes the causative object and a new outer subject is imported.",
        licensedSourceClass: sourceDescriptor.sourceClass,
        licensedSourceValence: sourceDescriptor.sourceValence,
        licensedMinimumSourceObjectCount: 0,
        licensedMaximumSourceObjectCount: 0,
        sourceAnalysisFrame: analysis,
        sourceFinalShapeFrame: shape,
        sourceInternalMorphology: analysis.sourceInternalMorphology,
        formationRuleTier: "productive-final-shape",
        productivityStatus: "andrews-category-rule",
        lexicalChoiceRequired: false,
        optionAliases: []
      };
      const candidates = [];
      const exactWitness = CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_WITNESSES.find(witness => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, witness.sourceStem) && witness.sourceClass === sourceDescriptor.sourceClass && witness.sourceValence === sourceDescriptor.sourceValence && witness.sourceObjectCount === sourceDescriptor.sourceObjectCount) || null;
      const exactAlternation = CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_ALTERNATIONS.find(formation => formation.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias)) && formation.sourceClasses.includes(sourceDescriptor.sourceClass) && formation.sourceValences.includes(sourceDescriptor.sourceValence) && formation.sourceObjectCount === sourceDescriptor.sourceObjectCount) || null;
      const exactDestockalAlternation = CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_DESTOCKAL_ALTERNATIONS.find(formation => formation.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias)) && formation.sourceClasses.includes(sourceDescriptor.sourceClass)) || null;
      const exactNegativeDestockalOa = CLASSICAL_NAHUATL_TYPE_ONE_CAUSATIVE_EXACT_NEGATIVE_LICENSES.find(license => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, license.sourceStem) && license.sourceClass === sourceDescriptor.sourceClass && license.sourceValence === sourceDescriptor.sourceValence) || null;
      const destockalOaAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "destockal-i-a-o-hui");
      const destockalHuaAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "destockal-long-vowel-hua");
      const rootPlusYaAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "root-plus-ya");
      const destockalNiAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "destockal-ni-candidate");
      const destockalHuiAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "destockal-hui-candidate");
      const destockalPreferenceOverride = CLASSICAL_NAHUATL_TYPE_ONE_DESTOCKAL_PREFERENCE_OVERRIDES.find(preference => preference.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias))) || null;
      let preferredDestockalProcedure = destockalPreferenceOverride?.preferredProcedure || "";
      if (!preferredDestockalProcedure && destockalNiAnalysis) {
        preferredDestockalProcedure = "addition";
      } else if (!preferredDestockalProcedure && destockalHuiAnalysis) {
        preferredDestockalProcedure = "replacement";
      }
      const destockalPreferenceRuleId = destockalPreferenceOverride?.ruleId || (destockalNiAnalysis
        ? "cn-l24-2457a-destockal-ni-prefers-addition"
        : destockalHuiAnalysis
          ? "cn-l24-2457b-destockal-hui-prefers-replacement"
          : "");
      const getDestockalPreferenceFields = procedure => preferredDestockalProcedure ? {
        canvasPreference: procedure === preferredDestockalProcedure ? "preferred" : "available-alternative",
        preferenceRuleId: destockalPreferenceRuleId,
        preferenceAndrewsSection: "24.5.7"
      } : {};
      const destockalOaRoute = sourceDescriptor.sourceClass === "B" && Boolean(destockalOaAnalysis) && !exactNegativeDestockalOa;
      const destockalHuaRoute = ["A", "B"].includes(sourceDescriptor.sourceClass)
        && Boolean(destockalHuaAnalysis);
      const rootPlusYaRoute = ["A", "B"].includes(sourceDescriptor.sourceClass) && Boolean(rootPlusYaAnalysis);
      if (exactNegativeDestockalOa) {
        return candidates;
      }
      if (exactAlternation) {
        const targetStem = sourceUsesClassicalNahuatlLongVowelNotation(sourceDescriptor.sourceStem) ? exactAlternation.markedTargetStem : exactAlternation.unmarkedTargetStem;
        const sourceAnalysis = analysis.analyses.find(candidate => exactAlternation.ruleId.includes("huaqui")
          ? candidate.category === "type-one-consonant-alternation"
          : exactAlternation.ruleId.includes("yocoya")
            ? candidate.category === "root-plus-ya-retentive-exception"
            : candidate.category === "destockal-hui-candidate") || null;
        const exactDestockalPreference = exactAlternation.ruleId === "cn-l24-2457b-chayahui-chayahua"
          ? Object.freeze({ preferredProcedure: "replacement", ruleId: "cn-l24-2457b-destockal-hui-prefers-replacement" })
          : exactAlternation.ruleId === "cn-l24-2457b-tlapihui-tlapihuia"
            ? Object.freeze({ preferredProcedure: "addition", ruleId: "cn-l24-2457b-tlapihui-prefers-addition" })
            : null;
        const exactCausativeOaHistory = exactAlternation.ruleId === "cn-l24-247-polihui-poloa"
          ? Object.freeze({ sourceRoute: "destockal-i-hui-a-hui", root: "pol", underlyingDestockalVowel: "i" })
          : exactAlternation.ruleId === "cn-l24-247-note1-tlapohui-tlapoa"
            ? Object.freeze({ sourceRoute: "destockal-o-hui", root: "tlap", underlyingDestockalVowel: "o" })
            : null;
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:exact-alternation:${exactAlternation.ruleId}:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-one causative · Canvas lexical alternation)`,
          derivationSubtype: "type-one",
          derivationRoute: exactAlternation.derivationRoute,
          procedure: exactAlternation.procedure,
          suffix: "a",
          targetStem,
          targetClass: exactAlternation.targetClass,
          ruleId: exactAlternation.ruleId,
          andrewsSection: exactAlternation.andrewsSection,
          evidenceSections: Object.freeze([exactAlternation.andrewsSection, "24.8.1", "24.9"]),
          authorityStatus: "exact-canvas-alternation-over-andrews-category",
          exactWitness: true,
          lexicalChoiceRequired: false,
          derivationLicenseId: exactAlternation.ruleId,
          optionAliases: [exactAlternation.ruleId],
          sourceAnalysisId: sourceAnalysis?.analysisId || "",
          causativeOaHistory: exactCausativeOaHistory,
          causativeCitationRole: exactAlternation.causativeCitationRole || "",
          ...(exactDestockalPreference ? {
            canvasPreference: "preferred",
            preferenceRuleId: exactDestockalPreference.ruleId,
            preferenceAndrewsSection: "24.5.7"
          } : {}),
          targetConstruction: exactAlternation.targetConstruction
        }));
        if (exactDestockalPreference) {
          const replacementPreferred = exactDestockalPreference.preferredProcedure === "replacement";
          const alternateTargetStem = replacementPreferred ? "chay-ā-hui-ā" : "tlap-ī-hu-a";
          const alternateRoute = replacementPreferred
            ? "type-one-destockal-hui-addition-exact-long-a"
            : "type-one-destockal-hui-replacement-exact-quantity";
          const alternateRuleId = replacementPreferred
            ? "cn-l24-2457b-chayahui-chayahui-a-alternate"
            : "cn-l24-2457b-tlapihui-tlapihua-alternate";
          candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
            ...common,
            optionId: `causative:type-one:exact-alternation:${alternateRuleId}:${sourceDescriptor.sourceStem}:${alternateTargetStem}`,
            label: `${alternateTargetStem} (type-one causative · Canvas available alternative)`,
            derivationSubtype: "type-one",
            derivationRoute: alternateRoute,
            procedure: replacementPreferred ? "preserve-destockal-hui-and-append-long-causative-a" : "replace-final-hui-with-hu-a-and-preserve-stock-vowel-quantity",
            suffix: replacementPreferred ? "ā" : "a",
            targetStem: alternateTargetStem,
            targetClass: replacementPreferred ? "C" : "B",
            ruleId: alternateRuleId,
            andrewsSection: "24.5.7",
            evidenceSections: Object.freeze(["24.5.7", "24.8.1", "24.9"]),
            authorityStatus: "exact-canvas-alternative-over-andrews-category",
            exactWitness: true,
            lexicalChoiceRequired: false,
            derivationLicenseId: alternateRuleId,
            optionAliases: [alternateRuleId],
            sourceAnalysisId: sourceAnalysis?.analysisId || "",
            canvasPreference: "available-alternative",
            preferenceRuleId: exactDestockalPreference.ruleId,
            preferenceAndrewsSection: "24.5.7",
            targetConstruction: Object.freeze(replacementPreferred
              ? { operation: "append", preserveSource: true, add: "ā", suffixQuantity: "long" }
              : { operation: "replace-morpheme", preserveInternalQuantity: true, remove: "hui", add: "hu-a" })
          }));
        }
        return candidates;
      }
      if (exactDestockalAlternation) {
        const sourceAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, exactDestockalAlternation.sourceAnalysisCategory);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:exact-destockal:${exactDestockalAlternation.ruleId}:${sourceDescriptor.sourceStem}:${exactDestockalAlternation.targetStem}`,
          label: `${exactDestockalAlternation.targetStem} (type-one causative · Canvas fused-destockal formation)`,
          derivationSubtype: "type-one",
          derivationRoute: exactDestockalAlternation.derivationRoute,
          procedure: exactDestockalAlternation.procedure,
          suffix: "a",
          targetStem: exactDestockalAlternation.targetStem,
          targetClass: exactDestockalAlternation.targetClass,
          ruleId: exactDestockalAlternation.ruleId,
          andrewsSection: exactDestockalAlternation.andrewsSection,
          evidenceSections: Object.freeze([exactDestockalAlternation.andrewsSection, "24.8.1", "24.9"]),
          authorityStatus: "exact-canvas-fused-destockal-alternation",
          exactWitness: true,
          lexicalChoiceRequired: false,
          derivationLicenseId: exactDestockalAlternation.ruleId,
          optionAliases: [exactDestockalAlternation.ruleId],
          formationRuleTier: "typed-lexical-destockal-exact",
          sourceAnalysisId: sourceAnalysis?.analysisId || "",
          sourceAnalysisSelectionRequired: sourceAnalysis?.sourceAnalysisSelectionRequired === true,
          causativeCitationRole: exactDestockalAlternation.causativeCitationRole || "",
          targetConstruction: exactDestockalAlternation.targetConstruction
        }));
        return candidates;
      }
      if (destockalOaRoute) {
        const stockFormative = destockalOaAnalysis.stockFormative;
        const root = destockalOaAnalysis.root;
        const targetStem = stockFormative === "o"
          ? joinClassicalNahuatlVncDerivationMorphemes(root, "o", longA)
          : joinClassicalNahuatlVncDerivationMorphemes(root, "o", longA);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:destockal-o-a:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-one causative · boundary-free destockal ${stockFormative}-hui → ${stockFormative === "o" ? longA : `o-${longA}`})`,
          derivationSubtype: "type-one",
          derivationRoute: stockFormative === "o" ? "type-one-destockal-o-hui-to-o-a" : "type-one-destockal-hui-to-o-a",
          procedure: stockFormative === "o" ? "replace-typed-destockal-o-hui-final-hui-with-a" : "replace-typed-destockal-i-hui-or-a-hui-with-o-a",
          suffix: stockFormative === "o" ? longA : `o-${longA}`,
          targetStem,
          targetClass: "C",
          ruleId: stockFormative === "o" ? "cn-l24-247-note1-destockal-o-hui-o-a" : "cn-l24-247-destockal-i-hui-a-hui-o-a",
          andrewsSection: stockFormative === "o" ? "24.7 note 1" : "24.7",
          evidenceSections: Object.freeze([stockFormative === "o" ? "24.7 note 1" : "24.7", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-rule-from-boundary-free-typed-morphology",
          derivationLicenseId: stockFormative === "o" ? "cn-l24-247-note1-destockal-o-hui-o-a" : "cn-l24-247-destockal-i-hui-a-hui-o-a",
          formationRuleTier: "typed-internal-morphology",
          sourceAnalysisId: destockalOaAnalysis.analysisId,
          targetConstruction: Object.freeze({ operation: "replace-morpheme-sequence", remove: stockFormative === "o" ? "hui" : `${stockFormative}-hui`, add: stockFormative === "o" ? longA : `o-${longA}` }),
          causativeOaHistory: Object.freeze({ sourceRoute: stockFormative === "o" ? "destockal-o-hui" : "destockal-i-hui-a-hui", root, underlyingDestockalVowel: stockFormative })
        }));
        return candidates;
      }
      if (destockalHuaRoute) {
        const targetStem = replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 3, "hu", "a");
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:destockal-hua:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-one causative · typed destockal hua → hu-a)`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-destockal-hua-replacement",
          procedure: "replace-typed-destockal-hua-with-hu-a",
          suffix: "a",
          targetStem,
          targetClass: "B",
          ruleId: "cn-l24-2465-destockal-hua-hu-a",
          andrewsSection: "24.6.5",
          evidenceSections: Object.freeze(["24.6.5", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-rule-from-typed-explicit-morphology",
          derivationLicenseId: "cn-l24-2465-destockal-hua-hu-a",
          formationRuleTier: "typed-internal-morphology",
          sourceAnalysisId: destockalHuaAnalysis.analysisId,
          targetConstruction: Object.freeze({ operation: "replace-morpheme", remove: "hua", add: "hu-a" })
        }));
        return candidates;
      }
      if (rootPlusYaRoute) {
        const root = rootPlusYaAnalysis.root;
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, longA);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:root-plus-ya:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-one causative · typed root+ya → ${longA})`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-root-plus-ya-replacement",
          procedure: "delete-typed-derivational-ya-and-add-causative-a",
          suffix: longA,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l24-2432b-root-plus-ya-a",
          andrewsSection: "24.3.2.b",
          evidenceSections: Object.freeze(["24.3.2.b", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-rule-from-boundary-free-typed-morphology",
          derivationLicenseId: "cn-l24-2432b-root-plus-ya-a",
          formationRuleTier: "typed-internal-morphology",
          sourceAnalysisId: rootPlusYaAnalysis.analysisId,
          sourceAnalysisSelectionRequired: rootPlusYaAnalysis.sourceAnalysisSelectionRequired === true,
          targetConstruction: Object.freeze({ operation: "replace-morpheme", remove: "ya", add: longA }),
          causativeOaHistory: Object.freeze({ sourceRoute: "root-plus-ya-to-a", root, underlyingDestockalVowel: "root-plus-ya" })
        }));
        return candidates;
      }
      if (sourceDescriptor.sourceClass === "B" && shape.finalLetter === "i") {
        const replacementTarget = exactWitness?.targetStem || replaceClassicalNahuatlVncDerivationRightEdgeBeforeVowel(sourceDescriptor.sourceStem, 1, "a");
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          ...getDestockalPreferenceFields("replacement"),
          optionId: `causative:type-one:replacement:${sourceDescriptor.sourceStem}:${replacementTarget}`,
          label: `${replacementTarget} (type-one causative · final i replacement${exactWitness ? " · Canvas witness" : ""})`,
          derivationSubtype: "type-one",
          derivationRoute: exactWitness?.derivationRoute || "type-one-final-i-replacement",
          procedure: "replace-final-i-with-causative-a",
          suffix: "a",
          targetStem: replacementTarget,
          targetClass: "B",
          ruleId: exactWitness?.ruleId || "cn-l24-2431a-final-i-replacement",
          andrewsSection: "24.3.1.a",
          evidenceSections: exactWitness?.evidenceSections || Object.freeze(["24.3.1.a", "24.8.1", "24.9"]),
          authorityStatus: exactWitness ? "exact-witness-over-productive-andrews-rule" : "productive-andrews-final-shape-rule",
          exactWitness: Boolean(exactWitness),
          lexicalChoiceRequired: !exactWitness,
          derivationLicenseId: exactWitness?.ruleId || "cn-l24-2431a-final-i-replacement",
          optionAliases: exactWitness ? [exactWitness.ruleId] : [],
          sourceAnalysisId: destockalNiAnalysis?.analysisId || destockalHuiAnalysis?.analysisId || "",
          sourceAnalysisSelectionRequired: (destockalNiAnalysis || destockalHuiAnalysis)?.sourceAnalysisSelectionRequired === true,
          targetConstruction: Object.freeze({ operation: "replace-final", remove: "i", add: "a" })
        }));
        if (exactWitness) {
          return candidates;
        }
        const additionTarget = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, longA);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          ...getDestockalPreferenceFields("addition"),
          optionId: `causative:type-one:addition:${sourceDescriptor.sourceStem}:${additionTarget}`,
          label: `${additionTarget} (type-one causative · preserve final i + ${longA})`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-final-i-addition",
          procedure: "preserve-source-and-add-long-causative-a",
          suffix: longA,
          underlyingSuffix: "ā",
          suffixLength: "long-after-vowel",
          targetStem: additionTarget,
          targetClass: "C",
          ruleId: "cn-l24-2431b-final-i-addition",
          andrewsSection: "24.3.1.b",
          evidenceSections: Object.freeze(["24.3.1.b", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-final-shape-alternative",
          lexicalChoiceRequired: true,
          derivationLicenseId: "cn-l24-2431b-final-i-addition",
          sourceAnalysisId: destockalNiAnalysis?.analysisId || destockalHuiAnalysis?.analysisId || "",
          sourceAnalysisSelectionRequired: (destockalNiAnalysis || destockalHuiAnalysis)?.sourceAnalysisSelectionRequired === true,
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: longA })
        }));
      } else if (sourceDescriptor.sourceClass === "A" && shape.finalLetter === "i") {
        const additionTarget = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, longA);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:addition:${sourceDescriptor.sourceStem}:${additionTarget}`,
          label: `${additionTarget} (type-one causative · Class A final i preserved + ${longA})`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-final-i-addition",
          procedure: "preserve-source-and-add-long-causative-a",
          suffix: longA,
          underlyingSuffix: "ā",
          suffixLength: "long-after-vowel",
          targetStem: additionTarget,
          targetClass: "C",
          ruleId: "cn-l24-2431b-final-i-addition",
          andrewsSection: "24.3.1.b",
          evidenceSections: Object.freeze(["24.3.1.b", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-class-a-final-i-addition",
          lexicalChoiceRequired: false,
          derivationLicenseId: "cn-l24-2431b-final-i-addition",
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: longA })
        }));
      } else if (sourceDescriptor.sourceClass === "A" && shape.finalLetter === "a" && shape.precedingLetter !== "y") {
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `causative:type-one:final-a-replacement:${sourceDescriptor.sourceStem}`,
          label: `${sourceDescriptor.sourceStem} (type-one causative · final a replaced morphologically; same surface)`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-final-a-morphological-replacement",
          procedure: "replace-final-source-a-with-homophonous-causative-a",
          suffix: "a",
          targetStem: sourceDescriptor.sourceStem,
          targetClass: "B",
          ruleId: "cn-l24-2432a-final-a-morphological-replacement",
          andrewsSection: "24.3.2.a",
          evidenceSections: Object.freeze(["24.3.2.a", "24.8.1", "24.9"]),
          authorityStatus: "productive-andrews-final-shape-rule",
          derivationLicenseId: "cn-l24-2432a-final-a-morphological-replacement",
          targetConstruction: Object.freeze({ operation: "morphological-replacement", remove: "source-a", add: "causative-a", surfaceChange: false })
        }));
      }
      return candidates;
    }
    function getClassicalNahuatlTypeTwoCausativeOptions(sourceDescriptor = {}) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (typeof runtimeTarget?.getClassicalNahuatlLesson20NonactiveStemOptions !== "function" || typeof runtimeTarget?.deriveClassicalNahuatlLesson20NonactiveStemRecord !== "function" || typeof runtimeTarget?.isClassicalNahuatlLesson20NonactiveStemRecord !== "function") {
        return [];
      }
      const analysis = getClassicalNahuatlVncDerivationSourceAnalysis(sourceDescriptor);
      if (!analysis) {
        return [];
      }
      const shape = analysis.sourceFinalShapeFrame;
      const intransitiveWithoutObjects = sourceDescriptor.sourceValence === "intransitive" && sourceDescriptor.sourceObjectCount === 0;
      const scopeFields = {
        derivationType: "causative",
        derivationSubtype: "type-two",
        ruleTagId: "cn-l25-type-two-causative-typed-nonactive-base",
        formationLesson: "25",
        scopeModel: "causative-source-vnc-core",
        scopeSection: "24.9",
        scopeRule: "The causative governs the source subject together with the source VNC core.",
        participantRule: sourceDescriptor.sourceObjectCount ? "The source subject becomes the causative object; older source objects remain at their earlier derivational levels." : "The source subject becomes the causative object and a new outer subject is imported.",
        licensedSourceClass: sourceDescriptor.sourceClass,
        licensedSourceValence: sourceDescriptor.sourceValence,
        licensedMinimumSourceObjectCount: 0,
        licensedMaximumSourceObjectCount: 2,
        sourceAnalysisFrame: analysis,
        sourceFinalShapeFrame: shape,
        sourceInternalMorphology: analysis.sourceInternalMorphology,
        productivityStatus: "andrews-category-rule",
        lexicalChoiceRequired: false,
        optionAliases: []
      };
      const candidates = [];
      CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_TYPED_BRIDGES.filter(witness => (
        hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, witness.sourceStem)
        && witness.sourceClasses.includes(sourceDescriptor.sourceClass)
        && witness.sourceValences.includes(sourceDescriptor.sourceValence)
        && witness.sourceObjectCount === sourceDescriptor.sourceObjectCount
      )).forEach(witness => {
        const exactNonactiveBridgeFrame = buildClassicalNahuatlVncExactNonactiveBridgeFrame(sourceDescriptor, witness);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:exact-nonactive-bridge:${witness.ruleId}:${sourceDescriptor.sourceStem}`,
          label: `${witness.targetStem} (type-two causative · exact typed ${witness.suffixFamily} bridge · Andrews §${witness.andrewsSection})`,
          derivationRoute: witness.derivationRoute,
          procedure: "map-an-exact-typed-andrews-nonactive-bridge-to-the-type-two-causative",
          suffix: "tiā",
          targetStem: witness.targetStem,
          targetClass: witness.targetClass,
          ruleId: witness.ruleId,
          andrewsSection: witness.andrewsSection,
          evidenceSections: Object.freeze(["25.1", witness.andrewsSection, "25.9", "25.15"]),
          authorityStatus: "exact-andrews-typed-nonactive-bridge",
          exactWitness: true,
          derivationLicenseId: witness.ruleId,
          licensedLesson20NonactiveStem: witness.nonactiveStem,
          licensedLesson20SuffixFamily: witness.suffixFamily,
          exactNonactiveBridgeFrame,
          citationBridgeStem: witness.nonactiveStem,
          citationBridgeVisibility: witness.citationVisibility,
          citationBridgeHypothetical: witness.hypothetical,
          citationBridgeAuthority: "exact-andrews-typed-nonactive-bridge",
          formationRuleTier: "typed-exact-nonactive-bridge",
          productivityStatus: "exact-andrews-witness",
          lexicalChoiceRequired: false,
          optionAliases: [witness.ruleId],
          targetConstruction: Object.freeze({
            operation: "replace-exact-nonactive-right-edge",
            nonactiveStem: witness.nonactiveStem,
            suffixFamily: witness.suffixFamily,
            add: "tiā"
          })
        }));
      });
      const lia = "liā";
      const destockalHuiAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "destockal-i-a-o-hui");
      if (intransitiveWithoutObjects
        && sourceDescriptor.sourceClass === "B"
        && destockalHuiAnalysis?.stemFormative === "hui"
        && !hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, "pol-i-hui")) {
        const exactLongWitnesses = ["mix-i-hui", "tlatz-i-hui", "ihc-i-hui", "pol-i-hui"];
        const exactShortWitnesses = ["pach-i-hui"];
        const polIhuiExactLong = hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, "pol-i-hui");
        [
          { suffixStem: "huī", length: "long", witnessSources: exactLongWitnesses },
          { suffixStem: "hui", length: "short", witnessSources: exactShortWitnesses }
        ].forEach(({ suffixStem, length, witnessSources }) => {
          if (polIhuiExactLong && length !== "long") {
            return;
          }
          const targetStem = joinClassicalNahuatlVncDerivationMorphemes(
            destockalHuiAnalysis.root,
            destockalHuiAnalysis.stockFormative,
            suffixStem,
            "tiā"
          );
          const exactWitness = witnessSources.some(source => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, source));
          candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
            ...scopeFields,
            optionId: `causative:type-two:destockal-hui-${length}:${sourceDescriptor.sourceStem}:${targetStem}`,
            label: `${targetStem} (type-two causative · destockal ${destockalHuiAnalysis.stockFormative}-hui + tiā · ${length} hui choice${exactWitness ? " · Canvas witness" : ""})`,
            derivationRoute: `type-two-tia-from-destockal-hui-source-${length}`,
            procedure: `preserve-typed-destockal-source-and-append-tia-with-${length}-hui`,
            suffix: "tiā",
            targetStem,
            targetClass: "C",
            ruleId: `cn-l25-2524-destockal-hui-${length}-tia`,
            andrewsSection: "25.2.4",
            evidenceSections: Object.freeze(["25.1", "25.2.4", "25.9", "25.15"]),
            authorityStatus: exactWitness ? "exact-witness-over-productive-destockal-hui-choice" : "productive-andrews-destockal-hui-choice",
            exactWitness,
            derivationLicenseId: `cn-l25-2524-destockal-hui-${length}-tia`,
            formationRuleTier: "typed-internal-morphology-choice",
            lexicalChoiceRequired: !exactWitness,
            sourceAnalysisId: destockalHuiAnalysis.analysisId,
            sourceAnalysisSelectionRequired: destockalHuiAnalysis.sourceAnalysisSelectionRequired === true,
            targetConstruction: Object.freeze({
              operation: "preserve-destockal-analysis-and-append-type-two-causative",
              segments: Object.freeze([destockalHuiAnalysis.root, destockalHuiAnalysis.stockFormative, suffixStem, "tiā"]),
              sourceHuiLength: "unmarked",
              targetHuiLength: length
            })
          }));
        });
      }
      if (intransitiveWithoutObjects
        && ["A", "B"].includes(sourceDescriptor.sourceClass)
        && hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, "pīn-ā-hua")) {
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:exact-pinahua-pinauhtia:${sourceDescriptor.sourceStem}`,
          label: "pin-ā-uh-tiā (type-two causative · Andrews §25.8 parallel formation)",
          derivationRoute: "type-two-exact-pinahua-to-pinauhtia",
          procedure: "apply-bounded-pinahua-type-two-quantity-and-w-alternation",
          suffix: "tiā",
          targetStem: "pin-ā-uh-tiā",
          targetClass: "C",
          ruleId: "cn-l25-258-pinahua-pinauhtia-type-two",
          andrewsSection: "25.8",
          evidenceSections: Object.freeze(["24.6.1", "25.8", "25.9", "25.15"]),
          authorityStatus: "exact-andrews-type-two-lexical-formation",
          exactWitness: true,
          derivationLicenseId: "cn-l25-258-pinahua-pinauhtia-type-two",
          formationRuleTier: "typed-lexical-exact",
          productivityStatus: "exact-andrews-witness",
          lexicalChoiceRequired: false,
          targetConstruction: Object.freeze({
            operation: "exact-lexical-replacement-with-quantity-and-w-alternation",
            remove: "pīn-ā-hua",
            add: "pin-ā-uh-tiā"
          })
        }));
      }
      if (intransitiveWithoutObjects && sourceDescriptor.sourceClass === "A" && hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, "tla-zo-h-ti")) {
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:exact-tlazohti-lia:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `Type 2 causative · ${targetStem} · Andrews §26.7 note`,
          derivationRoute: "type-two-denominal-ti-lia-homophone-exact",
          procedure: "preserve-denominal-ti-source-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-267-note-tlazohti-causative-homophone",
          andrewsSection: "26.7 note",
          evidenceSections: Object.freeze(["25.5.1", "26.7 note", "26.23"]),
          authorityStatus: "exact-andrews-homophonous-causative-analysis",
          exactWitness: true,
          derivationLicenseId: "cn-l26-267-note-tlazohti-causative-homophone",
          formationRuleTier: "exact-lexical-overlay",
          productivityStatus: "exact-andrews-witness",
          lexicalChoiceRequired: false,
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: lia })
        }));
      }
      const denominalTiAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "denominal-ti-candidate");
      const rootPlusYaAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, "root-plus-ya");
      const boundaryFreeDenominalTi = intransitiveWithoutObjects
        && ["A", "B"].includes(sourceDescriptor.sourceClass)
        && Boolean(denominalTiAnalysis);
      if (boundaryFreeDenominalTi) {
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:denominal-ti-lia:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two causative · boundary-free denominal-ti analysis + ${lia})`,
          derivationRoute: "type-two-lia-from-typed-denominal-ti",
          procedure: "preserve-typed-denominal-ti-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l25-2551-denominal-ti-lia",
          andrewsSection: "25.5.1",
          evidenceSections: Object.freeze(["25.1", "25.5.1", "25.9", "25.15"]),
          authorityStatus: "productive-andrews-rule-from-boundary-free-typed-morphology",
          derivationLicenseId: "cn-l25-2551-denominal-ti-lia",
          formationRuleTier: "typed-internal-morphology-exception",
          lexicalChoiceRequired: true,
          sourceAnalysisId: denominalTiAnalysis.analysisId,
          sourceAnalysisSelectionRequired: denominalTiAnalysis.sourceAnalysisSelectionRequired === true,
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: lia })
        }));
      }
      const boundaryFreeRootPlusYa = intransitiveWithoutObjects
        && ["A", "B"].includes(sourceDescriptor.sourceClass)
        && Boolean(rootPlusYaAnalysis);
      if (boundaryFreeRootPlusYa) {
        const root = rootPlusYaAnalysis.root;
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:root-plus-ya-lia:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two causative · boundary-free root+ya → root+${lia})`,
          derivationRoute: "type-two-lia-from-typed-root-plus-ya",
          procedure: "delete-typed-derivational-ya-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l25-2552-root-plus-ya-lia",
          andrewsSection: "25.5.2",
          evidenceSections: Object.freeze(["25.1", "25.5.2", "25.9", "25.15"]),
          authorityStatus: "productive-andrews-rule-from-boundary-free-typed-morphology",
          derivationLicenseId: "cn-l25-2552-root-plus-ya-lia",
          formationRuleTier: "typed-internal-morphology-exception",
          lexicalChoiceRequired: rootPlusYaAnalysis.sourceAnalysisSelectionRequired === true,
          sourceAnalysisId: rootPlusYaAnalysis.analysisId,
          sourceAnalysisSelectionRequired: rootPlusYaAnalysis.sourceAnalysisSelectionRequired === true,
          targetConstruction: Object.freeze({ operation: "replace-morpheme", remove: "ya", add: lia })
        }));
      }
      const yauhSuppletiveWitness = CLASSICAL_NAHUATL_LESSONS24_25_SOURCE_ANALYSIS_WITNESSES.find(witness => witness.analysisId === "cn-l25-251-yauh-suppletive-source") || null;
      const huallauhSuppletiveWitness = CLASSICAL_NAHUATL_LESSONS24_25_SOURCE_ANALYSIS_WITNESSES.find(witness => witness.analysisId === "cn-l25-251-huallauh-suppletive-source") || null;
      const matchesYauhSuppletive = yauhSuppletiveWitness?.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias)) === true;
      const matchesHuallauhSuppletive = huallauhSuppletiveWitness?.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias)) === true;
      const suppletiveAnalysis = getClassicalNahuatlVncDerivationSourceAnalysisByCategory(analysis, matchesHuallauhSuppletive ? "directional-suppletive-causative-source" : "suppletive-causative-source");
      if (suppletiveAnalysis && intransitiveWithoutObjects && sourceDescriptor.sourceClass === "D" && (matchesYauhSuppletive || matchesHuallauhSuppletive)) {
        const targetStem = "huīca";
        const directionalTargetEnvironment = matchesHuallauhSuppletive ? Object.freeze({
          directionalPrefix: "huāl",
          directionalMeaning: "proximity-hither-here",
          environmentSource: "suppletive-huallauh-causative",
          andrewsSection: "25.1 note"
        }) : null;
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: `causative:type-two:${matchesHuallauhSuppletive ? "suppletive-huallauh-hual-huica" : "suppletive-yauh-huica"}:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${matchesHuallauhSuppletive ? `huāl+${targetStem}` : targetStem} (type-two causative · suppletive source for ${matchesHuallauhSuppletive ? "huāl-la-uh" : "ya-uh"})`,
          derivationRoute: matchesHuallauhSuppletive ? "type-two-suppletive-huallauh-hual-huica" : "type-two-suppletive-yauh-huica",
          procedure: matchesHuallauhSuppletive ? "replace-irregular-huallauh-source-with-directional-hual-plus-suppletive-huica" : "replace-irregular-yauh-source-with-suppletive-huica",
          suffix: "",
          targetStem,
          targetClass: "A",
          ruleId: matchesHuallauhSuppletive ? "cn-l25-251-note-huallauh-hual-huica-suppletion" : "cn-l25-251-note-yauh-huica-suppletion",
          andrewsSection: "25.1 note",
          evidenceSections: Object.freeze(["25.1 note", "25.9", "25.15"]),
          authorityStatus: "exact-andrews-suppletive-causative-source",
          exactWitness: true,
          derivationLicenseId: matchesHuallauhSuppletive ? "cn-l25-251-note-huallauh-hual-huica-suppletion" : "cn-l25-251-note-yauh-huica-suppletion",
          formationRuleTier: "typed-lexical-suppletion",
          sourceAnalysisId: suppletiveAnalysis.analysisId,
          targetConstruction: Object.freeze({
            operation: "suppletion",
            remove: matchesHuallauhSuppletive ? "huāl-la-uh" : "ya-uh",
            add: targetStem,
            ...(directionalTargetEnvironment ? { directionalPrefix: directionalTargetEnvironment.directionalPrefix } : {})
          }),
          targetEnvironment: directionalTargetEnvironment
        }));
      }
      const inventory = runtimeTarget.getClassicalNahuatlLesson20NonactiveStemOptions(sourceDescriptor.sourceStem, {
        verbClass: sourceDescriptor.sourceClass,
        sourceValence: sourceDescriptor.sourceValence
      });
      const exactSourceTypeTwoLicenses = CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_LICENSES.filter(license => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, license.sourceStem) && license.sourceClass === sourceDescriptor.sourceClass && (license.sourceValences || [license.sourceValence]).includes(sourceDescriptor.sourceValence) && sourceDescriptor.sourceObjectCount >= Number(license.minimumSourceObjectCount ?? 0) && sourceDescriptor.sourceObjectCount <= Number(license.maximumSourceObjectCount ?? 2));
      const permittedFamilies = new Set(["hua", "ō", "o-hua", "lō"]);
      const bridgeOptions = (Array.isArray(inventory?.options) ? inventory.options : []).filter(option => permittedFamilies.has(option.suffixFamily)).flatMap(option => {
        if (hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, "pol-i-hui")) {
          return [];
        }
        if (["ō", "o-hua"].includes(option.suffixFamily) && hasClassicalNahuatlTwoConsonantClusterBeforeFinalVowel(sourceDescriptor.sourceStem)) {
          return [];
        }
        const record = runtimeTarget.deriveClassicalNahuatlLesson20NonactiveStemRecord(sourceDescriptor.sourceStem, {
          verbClass: sourceDescriptor.sourceClass,
          sourceValence: sourceDescriptor.sourceValence,
          optionId: option.optionId
        });
        if (!runtimeTarget.isClassicalNahuatlLesson20NonactiveStemRecord(record, sourceDescriptor.sourceStem) || record.selectedOptionId !== option.optionId || record.selectedRuleId !== option.ruleId || record.nonactiveStem !== option.nonactiveStem || record.suffixFamily !== option.suffixFamily) {
          return [];
        }
        const exactFamilyLicenses = exactSourceTypeTwoLicenses.filter(license => license.lesson20SuffixFamily === record.suffixFamily);
        if (exactFamilyLicenses.length && !exactFamilyLicenses.some(license => hasClassicalNahuatlVncDerivationLexicalKey(record.nonactiveStem, license.lesson20NonactiveStem))) {
          return [];
        }
        const retainedRootPlusYaNonactive = rootPlusYaAnalysis
          && hasClassicalNahuatlVncDerivationLexicalKey(record.nonactiveStem, `${sourceDescriptor.sourceStem}-lō`);
        if (rootPlusYaAnalysis
          && record.suffixFamily === "lō"
          && !hasClassicalNahuatlVncDerivationLexicalKey(record.nonactiveStem, `${rootPlusYaAnalysis.root}-lō`)
          && !retainedRootPlusYaNonactive) {
          return [];
        }
        if (sourceDescriptor.sourceClass === "A" && intransitiveWithoutObjects && shape.finalLetter === "ō" && record.suffixFamily === "hua") {
          const huia = "huiā";
          const replaciveBase = replaceClassicalNahuatlVncDerivationRightEdgeWithinBaseBeforeVowel(sourceDescriptor.sourceStem, 1, "a");
          const exactRouteChoice = CLASSICAL_NAHUATL_FINAL_O_HUIA_EXACT_ROUTE_CHOICES.find(choice => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, choice.sourceStem))?.route || "";
          const canvasExample = getClassicalNahuatlCanvasExactDerivationExample(sourceDescriptor, record, "causative");
          const canvasRule = canvasExample ? getClassicalNahuatlCanvasDerivationAuthorityRule(canvasExample.ruleRecordId) : null;
          const routes = [{
            route: "direct",
            targetStem: joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, huia),
            ruleId: "cn-l25-256-final-o-direct-huia",
            operation: "append-huia-to-final-o"
          }, {
            route: "replacive",
            targetStem: joinClassicalNahuatlVncDerivationMorphemes(replaciveBase, huia),
            ruleId: "cn-l25-256-final-o-replacive-a-huia",
            operation: "replace-final-o-with-a-within-base-and-append-huia"
          }].filter(route => !exactRouteChoice || route.route === exactRouteChoice);
          return routes.map(route => finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
            ...scopeFields,
            optionId: canvasExample?.choiceId || `causative:type-two:final-o:${route.route}:${record.selectedOptionId}`,
            label: `${canvasExample?.target?.stem || route.targetStem} (${canvasRule?.nomenclature || `type-two causative · final ō ${route.route} ${huia}`}${exactRouteChoice ? " · Canvas witness" : " · lexical choice"})`,
            derivationRoute: `type-two-final-o-${route.route}-huia`,
            procedure: route.operation,
            suffix: huia,
            targetStem: canvasExample?.target?.stem || route.targetStem,
            targetClass: canvasExample?.target?.verbClass || "C",
            ruleId: canvasRule?.operationId || route.ruleId,
            andrewsSection: canvasRule?.section || "25.6",
            evidenceSections: Object.freeze(["25.1", "25.6", "25.9", "25.15"]),
            authorityStatus: canvasExample ? "canonical-canvas-catalog-choice" : exactRouteChoice ? "exact-witness-over-productive-huia-route" : "productive-andrews-rule-plus-typed-hua-nonactive-record",
            exactWitness: Boolean(canvasExample || exactRouteChoice),
            derivationLicenseId: canvasRule?.operationId || route.ruleId,
            licensedLesson20OptionId: record.selectedOptionId,
            licensedLesson20RuleId: record.selectedRuleId,
            licensedLesson20NonactiveStem: record.nonactiveStem,
            licensedLesson20SuffixFamily: record.suffixFamily,
            lesson20OptionId: record.selectedOptionId,
            lesson20RuleId: record.selectedRuleId,
            lesson20NonactiveStemRecord: record,
            formationRuleTier: canvasExample ? "compiled-canvas-rule-and-exact-example" : "typed-lesson20-nonactive-exception",
            lexicalChoiceRequired: !exactRouteChoice,
            citationBridgeStem: canvasExample?.bridge?.stem || "",
            citationBridgeVisibility: canvasExample?.bridge?.visibility || "",
            citationBridgeHypothetical: canvasExample ? canvasExample.bridge?.hypothetical === true : null,
            citationBridgeAuthority: canvasExample?.bridge?.authority || "",
            canvasAuthorityExampleId: canvasExample?.recordId || "",
            targetConstruction: Object.freeze({
              operation: canvasRule?.formation?.operation || route.operation,
              sourceFinal: "ō",
              remove: canvasRule?.formation?.remove || "",
              add: canvasRule?.formation?.add || huia
            })
          }));
        }
        // Type-two causative -tiā is inherently long in Andrews §25.1. The
        // source's use or absence of other macrons never shortens this suffix;
        // bounded lexical witnesses may still relocate quantity internally.
        const tia = "tiā";
        const familyRule = {
          hua: { section: "25.2", ruleId: "cn-l25-252-hua-to-tia", route: "type-two-tia-from-hua-nonactive", removeCount: 3, remove: "hua" },
          "ō": { section: "25.3", ruleId: "cn-l25-253-o-to-tia", route: "type-two-tia-from-o-nonactive", removeCount: 1, remove: "ō" },
          "o-hua": { section: "25.3", ruleId: "cn-l25-253-o-hua-to-tia", route: "type-two-tia-from-o-hua-nonactive", removeCount: 5, remove: "o-hua" },
          "lō": { section: "25.4", ruleId: "cn-l25-254-lo-to-l-tia", route: "type-two-tia-from-lo-nonactive", removeCount: 1, remove: "ō" }
        }[record.suffixFamily];
        const targetStem = replaceClassicalNahuatlVncDerivationRightEdge(record.nonactiveStem, familyRule.removeCount, tia);
        const canvasExample = getClassicalNahuatlCanvasExactDerivationExample(sourceDescriptor, record, "causative");
        const canvasRule = canvasExample ? getClassicalNahuatlCanvasDerivationAuthorityRule(canvasExample.ruleRecordId) : null;
        const exactLicense = CLASSICAL_NAHUATL_TYPE_TWO_CAUSATIVE_EXACT_LICENSES.find(license => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, license.sourceStem) && license.sourceClass === sourceDescriptor.sourceClass && (license.sourceValences || [license.sourceValence]).includes(sourceDescriptor.sourceValence) && sourceDescriptor.sourceObjectCount >= Number(license.minimumSourceObjectCount ?? 0) && sourceDescriptor.sourceObjectCount <= Number(license.maximumSourceObjectCount ?? 2) && hasClassicalNahuatlVncDerivationLexicalKey(record.nonactiveStem, license.lesson20NonactiveStem) && record.suffixFamily === license.lesson20SuffixFamily) || null;
        const resolvedTargetStem = canvasExample?.target?.stem || exactLicense?.targetStem || targetStem;
        return [finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...scopeFields,
          optionId: canvasExample?.choiceId || `causative:type-two:${record.selectedOptionId}`,
          label: `${resolvedTargetStem} (${canvasRule?.nomenclature || `type-two causative · ${record.suffixFamily} nonactive → ${tia}`}${canvasExample || exactLicense ? " · Canvas witness" : ""})`,
          derivationRoute: exactLicense?.derivationRoute || familyRule.route,
          procedure: "map-canonical-lesson20-nonactive-family-to-type-two-causative",
          suffix: tia,
          targetStem: resolvedTargetStem,
          targetClass: canvasExample?.target?.verbClass || "C",
          ruleId: canvasRule?.operationId || exactLicense?.ruleId || `${familyRule.ruleId}:${record.selectedRuleId}`,
          andrewsSection: canvasRule?.section || familyRule.section,
          evidenceSections: exactLicense?.evidenceSections || Object.freeze(["25.1", canvasRule?.section || familyRule.section, "25.11", "25.15"]),
          authorityStatus: canvasExample ? "canonical-canvas-catalog-choice" : exactLicense ? "exact-witness-over-productive-lesson20-bridge" : "productive-andrews-rule-plus-typed-lesson20-record",
          exactWitness: Boolean(canvasExample || exactLicense),
          derivationLicenseId: canvasRule?.operationId || exactLicense?.derivationLicenseId || familyRule.ruleId,
          licensedLesson20OptionId: record.selectedOptionId,
          licensedLesson20RuleId: record.selectedRuleId,
          licensedLesson20NonactiveStem: record.nonactiveStem,
          licensedLesson20SuffixFamily: record.suffixFamily,
          lesson20OptionId: record.selectedOptionId,
          lesson20RuleId: record.selectedRuleId,
          lesson20NonactiveStemRecord: record,
          sourceFinalShapeFrame: record.sourceFinalShapeFrame,
          sourceInternalMorphology: record.sourceInternalMorphology,
          formationRuleTier: canvasExample ? "compiled-canvas-rule-and-exact-example" : "typed-lesson20-nonactive-bridge",
          productivityStatus: "andrews-category-rule",
          lexicalChoiceRequired: false,
          optionAliases: exactLicense ? [exactLicense.ruleId] : [],
          citationBridgeStem: canvasExample?.bridge?.stem || "",
          citationBridgeVisibility: canvasExample?.bridge?.visibility || "",
          citationBridgeHypothetical: canvasExample ? canvasExample.bridge?.hypothetical === true : null,
          citationBridgeAuthority: canvasExample ? "canonical-canvas-catalog" : "",
          causativeCitationRole: exactLicense?.causativeCitationRole || "",
          canvasAuthorityExampleId: canvasExample?.recordId || "",
          targetConstruction: Object.freeze({
            operation: canvasRule?.formation?.operation || "replace-nonactive-right-edge",
            nonactiveStem: record.nonactiveStem,
            remove: canvasRule?.formation?.remove || familyRule.remove,
            add: canvasRule?.formation?.add || tia
          })
        })];
      });
      return [...candidates, ...bridgeOptions].map(option => (
        applyClassicalNahuatlTypeTwoCausativeExactSurfaceOverlay(sourceDescriptor, option)
      ));
    }
    function getClassicalNahuatlLicensedApplicativeOptions(sourceDescriptor = {}) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const analysis = getClassicalNahuatlVncDerivationSourceAnalysis(sourceDescriptor);
      if (!analysis || sourceDescriptor.sourceObjectCount > 2) {
        return [];
      }
      const shape = analysis.sourceFinalShapeFrame;
      const morphology = analysis.sourceInternalMorphology || {};
      const morphemes = Array.isArray(shape.morphemes) ? shape.morphemes : [];
      const finalMorpheme = morphemes.at(-1) || "";
      // These are canonical tenseless applicative stems. Their suffix vowel is
      // long here; Lesson 7 selects the tense-bearing formulaic allomorph.
      const lia = "liā";
      const huia = "huiā";
      const transitiveSource = sourceDescriptor.sourceValence !== "intransitive";
      const common = {
        derivationType: "applicative",
        derivationSubtype: "type-two",
        ruleTagId: "cn-l26-applicative-imported-object-transform",
        formationLesson: "26",
        scopeModel: "applicative-object-suffix-discontinuous-unit",
        scopeSection: "26.23",
        scopeRule: "The imported object and applicative suffix form a discontinuous unit; the source VNC is not the applicative object.",
        participantRule: "The source subject is preserved while a new applicative object is imported above older source objects.",
        licensedSourceClass: sourceDescriptor.sourceClass,
        licensedSourceValence: sourceDescriptor.sourceValence,
        licensedMinimumSourceObjectCount: 0,
        licensedMaximumSourceObjectCount: 2,
        sourceFinalShapeFrame: shape,
        sourceInternalMorphology: analysis.sourceInternalMorphology,
        formationRuleTier: "productive-final-shape",
        productivityStatus: "andrews-category-rule",
        lexicalChoiceRequired: false,
        optionAliases: []
      };
      const candidates = [];
      const exactFormations = CLASSICAL_NAHUATL_APPLICATIVE_EXACT_FORMATIONS.filter(formation => (
        formation.sourceAliases.some(alias => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, alias))
        && formation.sourceClasses.includes(sourceDescriptor.sourceClass)
        && (!formation.sourceValences || formation.sourceValences.includes(sourceDescriptor.sourceValence))
        && (!formation.transitiveOnly || transitiveSource)
        && (formation.sourceObjectCount == null || formation.sourceObjectCount === sourceDescriptor.sourceObjectCount)
      ));
      exactFormations.forEach(formation => {
        const targetStem = formation.markedTargetStem;
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:${formation.derivationSubtype}:exact:${formation.ruleId}:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${formation.derivationSubtype.replace(/-/gu, " ")} applicative · ${targetStem} · Andrews §${formation.andrewsSection}`,
          derivationSubtype: formation.derivationSubtype,
          derivationRoute: formation.derivationRoute,
          procedure: formation.procedure,
          suffix: formation.derivationSubtype === "type-three" ? "tiā" : formation.derivationSubtype === "type-one" ? "iā" : "",
          targetStem,
          targetClass: formation.targetClass,
          ruleId: formation.ruleId,
          andrewsSection: formation.andrewsSection,
          evidenceSections: formation.evidenceSections,
          authorityStatus: "exact-andrews-source-target-license",
          exactWitness: true,
          derivationLicenseId: formation.ruleId,
          formationRuleTier: "exact-lexical-overlay",
          productivityStatus: "exact-andrews-witness",
          lexicalChoiceRequired: false,
          optionAliases: [formation.ruleId],
          targetConstruction: formation.targetConstruction
        }));
      });
      const genericTypeOneSuppressed = exactFormations.some(formation => formation.suppressGenericTypeOne === true);
      if (!genericTypeOneSuppressed && ["A", "B"].includes(sourceDescriptor.sourceClass) && ["a", "ā", "i"].includes(shape.finalLetter)) {
        const ia = "iā";
        const targetStem = replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 1, ia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-one:optional-final-vowel-replacement:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `Type 1 applicative · ${targetStem} · Andrews §26.2 · lexical choice`,
          derivationSubtype: "type-one",
          derivationRoute: "type-one-final-vowel-replacement-optional",
          procedure: "delete-source-final-vowel-and-add-ia-as-a-user-selected-lexical-route",
          suffix: ia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-262-optional-final-vowel-replacement-ia",
          andrewsSection: "26.2",
          evidenceSections: Object.freeze(["26.2", "26.12", "26.13", "26.14", "26.23"]),
          authorityStatus: "andrews-category-possibility-requiring-lexical-choice",
          derivationLicenseId: "cn-l26-262-optional-final-vowel-replacement-ia",
          formationRuleTier: "productive-possibility-with-lexical-selection",
          productivityStatus: "andrews-unpredictable-user-selected-category",
          lexicalChoiceRequired: true,
          targetConstruction: Object.freeze({ operation: "replace-final-vowel", remove: shape.finalLetter, add: ia })
        }));
      }
      const exactFinalTlToTLicense = CLASSICAL_NAHUATL_APPLICATIVE_FINAL_TL_TO_T_EXACT_LICENSES.find(license => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, license.sourceStem) && license.sourceClass === sourceDescriptor.sourceClass && license.sourceValence === sourceDescriptor.sourceValence && license.sourceObjectCount === sourceDescriptor.sourceObjectCount) || null;
      CLASSICAL_NAHUATL_APPLICATIVE_EXACT_LICENSES.filter(license => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, license.sourceStem) && license.sourceClass === sourceDescriptor.sourceClass && sourceDescriptor.sourceValence !== "intransitive" && license.sourceObjectCount === sourceDescriptor.sourceObjectCount).forEach(license => {
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:${license.suffix}:${license.sourceStem}:${license.targetStem}`,
          label: `${license.targetStem} (type-two applicative · exact typed o-a history)`,
          derivationSubtype: license.derivationSubtype,
          derivationRoute: license.derivationRoute,
          procedure: "apply-exact-xeloa-to-xel-huia-source-license",
          suffix: license.suffix,
          targetStem: license.targetStem,
          targetClass: license.targetClass,
          ruleId: license.ruleId,
          andrewsSection: license.andrewsSection,
          evidenceSections: license.evidenceSections,
          authorityStatus: "exact-andrews-source-target-license",
          exactWitness: true,
          derivationLicenseId: license.derivationLicenseId,
          licensedMinimumSourceObjectCount: license.sourceObjectCount,
          licensedMaximumSourceObjectCount: license.sourceObjectCount,
          formationRuleTier: "exact-lexical-overlay",
          productivityStatus: "exact-andrews-witness",
          optionAliases: [license.ruleId],
          targetConstruction: Object.freeze({ operation: "typed-o-a-to-huia", remove: "o-a", add: "huia" })
        }));
      });
      if (exactFinalTlToTLicense) {
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:exact-final-tl-to-t:${exactFinalTlToTLicense.sourceStem}:${exactFinalTlToTLicense.targetStem}`,
          label: `${exactFinalTlToTLicense.targetStem} (type-two applicative · exact tl → t allomorph)`,
          derivationSubtype: "type-two-lia-exact",
          derivationRoute: "type-two-final-tla-to-ti-lia-exact",
          procedure: "replace-exact-final-tla-with-ti-and-append-lia",
          suffix: lia,
          targetStem: exactFinalTlToTLicense.targetStem,
          targetClass: "C",
          ruleId: exactFinalTlToTLicense.ruleId,
          andrewsSection: exactFinalTlToTLicense.andrewsSection,
          evidenceSections: exactFinalTlToTLicense.evidenceSections,
          authorityStatus: "exact-andrews-source-target-license",
          exactWitness: true,
          derivationLicenseId: exactFinalTlToTLicense.derivationLicenseId,
          formationRuleTier: "exact-lexical-overlay",
          productivityStatus: "exact-andrews-witness",
          optionAliases: [exactFinalTlToTLicense.ruleId],
          targetConstruction: Object.freeze({ operation: "replace-final-tla-with-ti-and-append", remove: "tla", add: `ti-${lia}` })
        }));
      }
      const explicitIntransitiveDenominalTiWithoutApplicative = sourceDescriptor.sourceValence === "intransitive"
        && morphology.hasExplicitBoundary === true
        && finalMorpheme === "ti";
      if (explicitIntransitiveDenominalTiWithoutApplicative) {
        return candidates;
      }
      const priorOaHistory = sourceDescriptor.sourceKind === "classical-nahuatl-vnc-derived-machinery-frame" ? sourceDescriptor.sourceMachineryFrame?.derivationOperationFrame?.selectedOption?.causativeOaHistory || null : null;
      if (priorOaHistory?.root && ["i", "a", "o", "root-plus-ya"].includes(priorOaHistory.underlyingDestockalVowel)) {
        const root = normalizeClassicalNahuatlVncDerivationStem(priorOaHistory.root);
        let targetStem = "";
        if (priorOaHistory.underlyingDestockalVowel === "root-plus-ya") {
          targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, "l", huia);
        } else if (/l$/u.test(root)) {
          targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, huia);
        } else if (/o$/u.test(root)) {
          targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, "l", huia);
        } else {
          targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, priorOaHistory.underlyingDestockalVowel, "l", huia);
        }
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:typed-o-a-history:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · signed prior o-a causative history)`,
          derivationRoute: "type-two-huia-from-signed-causative-o-a-history",
          procedure: "consume-signed-causative-o-a-history-and-add-huia",
          suffix: huia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-269-causative-o-a-to-huia",
          andrewsSection: "26.9",
          evidenceSections: Object.freeze(["26.9", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-rule-from-signed-prior-derivation",
          derivationLicenseId: "cn-l26-269-causative-o-a-to-huia",
          formationRuleTier: "signed-prior-derivation-history",
          targetConstruction: Object.freeze({ operation: "consume-prior-o-a-history", root, underlyingDestockalVowel: priorOaHistory.underlyingDestockalVowel, add: huia })
        }));
      }
      const explicitOaSource = sourceDescriptor.sourceClass === "C"
        && morphology.hasExplicitBoundary === true
        && ["o-a", "o-ā"].includes(shape.morphemeTail.two);
      if (explicitOaSource) {
        const root = joinClassicalNahuatlVncDerivationMorphemes(...morphemes.slice(0, -2));
        if (root && /l$/u.test(root)) {
          const targetStem = joinClassicalNahuatlVncDerivationMorphemes(root, huia);
          const exactTargetAlreadyPresent = candidates.some(candidate => candidate.exactWitness === true && hasClassicalNahuatlVncDerivationLexicalKey(candidate.targetStem, targetStem));
          if (!exactTargetAlreadyPresent) {
            candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
            ...common,
            optionId: `applicative:type-two:explicit-root-l-o-a:${sourceDescriptor.sourceStem}:${targetStem}`,
            label: `${targetStem} (type-two applicative · explicit root-final-l + o-a → ${huia})`,
            derivationRoute: "type-two-huia-from-explicit-root-l-o-a",
            procedure: "replace-explicit-o-a-after-root-final-l-with-huia",
            suffix: huia,
            targetStem,
            targetClass: "C",
            ruleId: "cn-l26-2691-explicit-root-l-o-a-huia",
            andrewsSection: "26.9.1",
            evidenceSections: Object.freeze(["26.9.1", "26.14", "26.23"]),
            authorityStatus: "productive-andrews-rule-from-explicit-typed-morphology",
            derivationLicenseId: "cn-l26-2691-explicit-root-l-o-a-huia",
            formationRuleTier: "typed-internal-morphology",
            targetConstruction: Object.freeze({ operation: "replace-morpheme-sequence", remove: "o-a", add: huia, retainedRoot: root })
            }));
          }
        }
      }
      const explicitOaMorphemeTail = ["o-a", "o-ā"].includes(shape.morphemeTail.two);
      const boundarylessOaTail = /o(?:a|ā)$/u.test(getClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem));
      if (sourceDescriptor.sourceClass === "C" && (explicitOaMorphemeTail || boundarylessOaTail)) {
        const root = explicitOaMorphemeTail
          ? joinClassicalNahuatlVncDerivationMorphemes(...morphemes.slice(0, -2))
          : replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 2);
        const baseWithoutFinalA = explicitOaMorphemeTail
          ? joinClassicalNahuatlVncDerivationMorphemes(...morphemes.slice(0, -1))
          : replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 1);
        const routeChoices = [
          { route: "root-huia", targetStem: joinClassicalNahuatlVncDerivationMorphemes(root, huia), procedure: "delete-o-a-and-add-huia-to-root", construction: { operation: "replace-final", remove: "o-a", add: huia } },
          { route: "root-a-l-huia", targetStem: joinClassicalNahuatlVncDerivationMorphemes(root, "a", "l", huia), procedure: "recover-a-hui-history-and-add-a-l-huia", construction: { operation: "recover-destockal-base", underlyingSource: "a-hui", add: `a-l-${huia}` } },
          { route: "root-i-l-huia", targetStem: joinClassicalNahuatlVncDerivationMorphemes(root, "i", "l", huia), procedure: "recover-i-hui-history-and-add-i-l-huia", construction: { operation: "recover-destockal-base", underlyingSource: "i-hui", add: `i-l-${huia}` } },
          { route: "base-l-huia", targetStem: joinClassicalNahuatlVncDerivationMorphemes(baseWithoutFinalA, "l", huia), procedure: "preserve-root-final-o-or-root-plus-ya-base-and-add-l-huia", construction: { operation: "replace-final-a", preserve: baseWithoutFinalA, add: `l-${huia}` } },
          { route: "exceptional-lia", targetStem: joinClassicalNahuatlVncDerivationMorphemes(baseWithoutFinalA, lia), procedure: "delete-final-a-and-add-exceptional-lia", construction: { operation: "replace-final", remove: "a", add: lia } }
        ];
        routeChoices.filter(choice => root && choice.targetStem && !candidates.some(candidate => hasClassicalNahuatlVncDerivationLexicalKey(candidate.targetStem, choice.targetStem))).forEach(choice => {
          candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
            ...common,
            optionId: `applicative:type-two:final-oa:${choice.route}:${sourceDescriptor.sourceStem}:${choice.targetStem}`,
            label: `Type 2 applicative · ${choice.targetStem} · Andrews §26.9 · source analysis choice`,
            derivationSubtype: "type-two",
            derivationRoute: `type-two-final-oa-${choice.route}`,
            procedure: choice.procedure,
            suffix: choice.route === "exceptional-lia" ? lia : huia,
            targetStem: choice.targetStem,
            targetClass: "C",
            ruleId: `cn-l26-269-final-oa-${choice.route}`,
            andrewsSection: "26.9",
            evidenceSections: Object.freeze(["26.9", "26.13", "26.14", "26.23"]),
            authorityStatus: "andrews-category-possibility-requiring-source-analysis-choice",
            derivationLicenseId: `cn-l26-269-final-oa-${choice.route}`,
            formationRuleTier: "typed-final-oa-route-choice",
            productivityStatus: "andrews-conditioned-user-selected-category",
            lexicalChoiceRequired: true,
            targetConstruction: Object.freeze(choice.construction)
          }));
        });
      }
      if (shape.finalLetter === "ō" && sourceDescriptor.sourceClass === "A" && sourceDescriptor.sourceValence === "intransitive" && typeof runtimeTarget?.getClassicalNahuatlLesson20NonactiveStemOptions === "function" && typeof runtimeTarget?.deriveClassicalNahuatlLesson20NonactiveStemRecord === "function" && typeof runtimeTarget?.isClassicalNahuatlLesson20NonactiveStemRecord === "function") {
        const nonactiveInventory = runtimeTarget.getClassicalNahuatlLesson20NonactiveStemOptions(sourceDescriptor.sourceStem, {
          verbClass: sourceDescriptor.sourceClass,
          sourceValence: sourceDescriptor.sourceValence
        });
        (nonactiveInventory.options || []).filter(option => option.suffixFamily === "hua").forEach(option => {
          const record = runtimeTarget.deriveClassicalNahuatlLesson20NonactiveStemRecord(sourceDescriptor.sourceStem, {
            verbClass: sourceDescriptor.sourceClass,
            sourceValence: sourceDescriptor.sourceValence,
            optionId: option.optionId
          });
          if (!runtimeTarget.isClassicalNahuatlLesson20NonactiveStemRecord(record, sourceDescriptor.sourceStem)) {
            return;
          }
          const directTarget = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, huia);
          const replaciveBase = replaceClassicalNahuatlVncDerivationRightEdgeWithinBaseBeforeVowel(sourceDescriptor.sourceStem, 1, "a");
          const replaciveTarget = joinClassicalNahuatlVncDerivationMorphemes(replaciveBase, huia);
          const exactRouteChoice = CLASSICAL_NAHUATL_FINAL_O_HUIA_EXACT_ROUTE_CHOICES.find(choice => hasClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem, choice.sourceStem))?.route || "";
          [
            { route: "direct", targetStem: directTarget, ruleId: "cn-l26-2610-final-o-direct-huia", operation: "append-huia-to-final-o" },
            { route: "replacive", targetStem: replaciveTarget, ruleId: "cn-l26-2610-final-o-replacive-a-huia", operation: "replace-final-o-with-a-within-base-and-append-huia" }
          ].filter(route => !exactRouteChoice || route.route === exactRouteChoice).forEach(route => candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
            ...common,
            optionId: `applicative:type-two:final-o:${route.route}:${record.selectedOptionId}`,
            label: `${route.targetStem} (type-two applicative · final ō ${route.route} huiā route)`,
            derivationRoute: `type-two-final-o-${route.route}-huia`,
            procedure: route.operation,
            suffix: huia,
            targetStem: route.targetStem,
            targetClass: "C",
            ruleId: route.ruleId,
            andrewsSection: "26.10",
            evidenceSections: Object.freeze(["25.6", "26.10", "26.14", "26.23"]),
            authorityStatus: exactRouteChoice ? "exact-witness-over-productive-huia-route" : "productive-andrews-rule-plus-typed-hua-nonactive-record",
            exactWitness: Boolean(exactRouteChoice),
            derivationLicenseId: route.ruleId,
            lesson20OptionId: record.selectedOptionId,
            lesson20RuleId: record.selectedRuleId,
            lesson20NonactiveStemRecord: record,
            formationRuleTier: "typed-lesson20-nonactive-bridge",
            lexicalChoiceRequired: !exactRouteChoice,
            targetConstruction: Object.freeze({ operation: route.operation, sourceFinal: "ō", add: huia })
          })));
        });
      } else if (sourceDescriptor.sourceClass === "D") {
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:class-d:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · Class D preserves final vowel)`,
          derivationRoute: "type-two-class-d-append-lia",
          procedure: "preserve-class-d-source-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-2681-class-d-append-lia",
          andrewsSection: "26.8.1",
          evidenceSections: Object.freeze(["26.8.1", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-class-rule",
          derivationLicenseId: "cn-l26-2681-class-d-append-lia",
          formationRuleTier: "typed-class-exception",
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: lia })
        }));
      } else if (sourceDescriptor.sourceClass === "B" && transitiveSource && shape.letterTail.three === "iya") {
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:class-b-iya:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · transitive Class B iya preserves source)`,
          derivationRoute: "type-two-class-b-transitive-iya-append-lia",
          procedure: "preserve-transitive-class-b-iya-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-2682-class-b-iya-append-lia",
          andrewsSection: "26.8.2",
          evidenceSections: Object.freeze(["26.8.2", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-class-and-valence-rule",
          derivationLicenseId: "cn-l26-2682-class-b-iya-append-lia",
          formationRuleTier: "typed-class-valence-exception",
          targetConstruction: Object.freeze({ operation: "append", preserveSource: true, add: lia })
        }));
      } else if (sourceDescriptor.sourceClass === "B" && !transitiveSource && shape.letterTail.three === "eya") {
        const targetStem = replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 2, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:class-b-eya:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · intransitive Class B eya loses ya)`,
          derivationRoute: "type-two-class-b-intransitive-eya-delete-ya-add-lia",
          procedure: "delete-final-ya-from-intransitive-class-b-eya-and-add-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-2683-class-b-eya-delete-ya-add-lia",
          andrewsSection: "26.8.3",
          evidenceSections: Object.freeze(["26.8.3", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-class-and-valence-rule",
          derivationLicenseId: "cn-l26-2683-class-b-eya-delete-ya-add-lia",
          formationRuleTier: "typed-class-valence-exception",
          targetConstruction: Object.freeze({ operation: "replace-final", remove: "ya", add: lia })
        }));
      } else if (!transitiveSource && ["oya", "oyā"].includes(shape.letterTail.three)) {
        const targetStem = replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 2, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:intransitive-oya:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · intransitive oya loses ya)`,
          derivationRoute: "type-two-intransitive-oya-delete-ya-add-lia",
          procedure: "delete-final-ya-from-intransitive-oya-and-add-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-2684-intransitive-oya-delete-ya-add-lia",
          andrewsSection: "26.8.4",
          evidenceSections: Object.freeze(["26.8.4", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-valence-and-final-shape-rule",
          derivationLicenseId: "cn-l26-2684-intransitive-oya-delete-ya-add-lia",
          formationRuleTier: "typed-valence-exception",
          targetConstruction: Object.freeze({ operation: "replace-final", remove: "ya", add: lia })
        }));
      } else if (transitiveSource && ["oya", "oyā"].includes(shape.letterTail.three)) {
        const typedRootPlusYa = morphology.explicitRootPlusYaBoundary === true && shape.orthographicTail.three === "-ya";
        const targetStem = typedRootPlusYa
          ? replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 2, lia)
          : joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:transitive-oya:${typedRootPlusYa ? "root" : "whole"}:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · transitive oya ${typedRootPlusYa ? "typed root+ya" : "whole-stem"} route)`,
          derivationRoute: typedRootPlusYa ? "type-two-transitive-valence-neutral-oya-delete-ya-add-lia" : "type-two-transitive-oya-append-lia",
          procedure: typedRootPlusYa ? "delete-final-ya-from-typed-valence-neutral-oya-and-add-lia" : "preserve-transitive-oya-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: typedRootPlusYa ? "cn-l26-2684-transitive-valence-neutral-oya-delete-ya-add-lia" : "cn-l26-2684-transitive-oya-append-lia",
          andrewsSection: "26.8.4",
          evidenceSections: Object.freeze(["26.8.4", "26.13", "26.14", "26.23"]),
          authorityStatus: typedRootPlusYa ? "productive-andrews-rule-from-explicit-typed-morphology" : "productive-andrews-transitive-oya-rule",
          derivationLicenseId: typedRootPlusYa ? "cn-l26-2684-transitive-valence-neutral-oya-delete-ya-add-lia" : "cn-l26-2684-transitive-oya-append-lia",
          formationRuleTier: typedRootPlusYa ? "typed-internal-morphology-exception" : "typed-valence-exception",
          targetConstruction: Object.freeze({ operation: typedRootPlusYa ? "replace-final" : "append", remove: typedRootPlusYa ? "ya" : "", add: lia })
        }));
      } else if (shape.finalLetter === "i") {
        const sibilantFinal = ["ci", "si"].includes(shape.letterTail.two);
        const targetStem = sibilantFinal
          ? joinClassicalNahuatlVncDerivationMorphemes(replaceClassicalNahuatlVncDerivationRightEdgeWithinBaseBeforeVowel(sourceDescriptor.sourceStem, 2, "xi"), lia)
          : joinClassicalNahuatlVncDerivationMorphemes(sourceDescriptor.sourceStem, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:final-i:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · final i${sibilantFinal ? " with si → xi" : ""})`,
          derivationRoute: sibilantFinal ? "type-two-final-si-to-xi-append-lia" : "type-two-final-i-append-lia",
          procedure: sibilantFinal ? "replace-final-si-with-xi-and-append-lia" : "append-lia-to-final-i",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: sibilantFinal ? "cn-l26-264-final-si-xi-lia" : "cn-l26-264-final-i-append-lia",
          andrewsSection: "26.4",
          evidenceSections: Object.freeze(["26.4", "26.5", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-final-shape-rule",
          derivationLicenseId: sibilantFinal ? "cn-l26-264-final-si-xi-lia" : "cn-l26-264-final-i-append-lia",
          targetConstruction: Object.freeze({ operation: sibilantFinal ? "replace-and-append" : "append", remove: sibilantFinal ? shape.letterTail.two : "", add: sibilantFinal ? `xi-${lia}` : lia })
        }));
      } else if (sourceDescriptor.sourceClass === "C" && ["ia", "iā"].includes(shape.letterTail.two)) {
        const targetStem = replaceClassicalNahuatlVncDerivationRightEdge(sourceDescriptor.sourceStem, 1, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:final-ia:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · final iā loses ā)`,
          derivationRoute: "type-two-final-ia-delete-a-add-lia",
          procedure: "delete-final-a-from-class-c-ia-and-add-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: "cn-l26-266-final-ia-delete-a-add-lia",
          andrewsSection: "26.6",
          evidenceSections: Object.freeze(["26.6", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-final-shape-and-class-rule",
          derivationLicenseId: "cn-l26-266-final-ia-delete-a-add-lia",
          targetConstruction: Object.freeze({ operation: "replace-final", remove: shape.finalLetter, add: lia })
        }));
      } else if (!exactFinalTlToTLicense && shape.finalLetter === "a" && !["oya", "oyā"].includes(shape.letterTail.three) && !/[aeioāēīō]/u.test(shape.precedingLetter)) {
        const tlaOrTza = ["tla", "tza"].includes(shape.letterTail.three);
        const sa = ["sa", "za"].includes(shape.letterTail.two);
        const ca = shape.letterTail.two === "ca";
        const removeCount = tlaOrTza ? 3 : sa || ca ? 2 : 1;
        const replacement = tlaOrTza ? "chi" : sa ? "xi" : ca ? "qui" : "i";
        const replaciveBase = replaceClassicalNahuatlVncDerivationRightEdgeWithinBaseBeforeVowel(sourceDescriptor.sourceStem, removeCount, replacement);
        const targetStem = joinClassicalNahuatlVncDerivationMorphemes(replaciveBase, lia);
        candidates.push(finalizeClassicalNahuatlVncDerivationOption(sourceDescriptor, {
          ...common,
          optionId: `applicative:type-two:consonant-a:${sourceDescriptor.sourceStem}:${targetStem}`,
          label: `${targetStem} (type-two applicative · ${tlaOrTza ? `${shape.letterTail.three} → chi` : sa ? `${shape.letterTail.two} → xi` : ca ? "ca → qui" : "final a → i"})`,
          derivationRoute: tlaOrTza ? "type-two-final-tla-tza-to-chi-lia" : sa ? "type-two-final-sa-to-xi-lia" : ca ? "type-two-final-ca-to-qui-lia" : "type-two-consonant-final-a-to-i-lia",
          procedure: "replace-consonant-plus-final-a-allomorph-and-append-lia",
          suffix: lia,
          targetStem,
          targetClass: "C",
          ruleId: tlaOrTza ? "cn-l26-267-final-tla-tza-chi-lia" : sa ? "cn-l26-267-final-sa-xi-lia" : ca ? "cn-l26-267-final-ca-qui-lia" : "cn-l26-267-consonant-a-i-lia",
          andrewsSection: "26.7",
          evidenceSections: Object.freeze(["26.7", "26.13", "26.14", "26.23"]),
          authorityStatus: "productive-andrews-final-shape-rule",
          derivationLicenseId: tlaOrTza ? "cn-l26-267-final-tla-tza-chi-lia" : sa ? "cn-l26-267-final-sa-xi-lia" : ca ? "cn-l26-267-final-ca-qui-lia" : "cn-l26-267-consonant-a-i-lia",
          targetConstruction: Object.freeze({ operation: "replace-and-append", remove: tlaOrTza ? shape.letterTail.three : sa || ca ? shape.letterTail.two : "a", add: `${replacement}-${lia}` })
        }));
      }
      return candidates;
    }
    function getClassicalNahuatlVncDerivationInventorySignaturePayload(inventory = {}) {
      return {
        derivationType: inventory.derivationType,
        sourceSignature: inventory.sourceSignature,
        sourceAnalysisSignature: inventory.sourceAnalysisFrame?.canonicalSignature || "",
        authorizationStatus: inventory.authorizationStatus,
        blockReason: inventory.blockReason,
        optionSignatures: (inventory.options || []).map(option => option.canonicalSignature),
        canvasChoiceSignatures: (inventory.canvasDerivationChoiceFrames || []).map(frame => frame.canonicalSignature),
        selectorRequired: inventory.selectorRequired,
        analysisSelectionRequired: inventory.analysisSelectionRequired === true,
        automaticOptionId: inventory.automaticOptionId
      };
    }
    function getClassicalNahuatlVncDerivationOptionInventoryInternal(sourceMachineryFrame = null, options = {}, depth = 0, validationContext = null) {
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame, depth + 1, validationContext);
      const derivationType = normalizeClassicalNahuatlVncDerivationToken(options?.derivationType || "direct").toLowerCase();
      const requestedClass = normalizeClassicalNahuatlVncDerivationToken(options?.verbClass).toUpperCase();
      const requestedValence = normalizeClassicalNahuatlVncDerivationToken(options?.sourceValence);
      let blockReason = sourceDescriptor.authorizationStatus === "authorized" ? "" : sourceDescriptor.blockReason;
      if (!CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES.includes(derivationType)) {
        blockReason = "classical-vnc-derivation-type-not-recognized";
      } else if (requestedClass && sourceDescriptor.authorizationStatus === "authorized" && requestedClass !== sourceDescriptor.sourceClass) {
        blockReason = "classical-vnc-derivation-source-class-contradiction";
      } else if (requestedValence && sourceDescriptor.authorizationStatus === "authorized" && requestedValence !== sourceDescriptor.sourceValence) {
        blockReason = "classical-vnc-derivation-source-valence-contradiction";
      } else if (!blockReason && hasClassicalNahuatlExactDerivationSourceSelfReference(sourceDescriptor, derivationType)) {
        blockReason = `classical-vnc-${derivationType}-source-specific-self-reference-must-be-reflexive`;
      }
      let generatedOptions = [];
      if (!blockReason && derivationType === "causative") {
        generatedOptions = [...getClassicalNahuatlTypeOneCausativeOptions(sourceDescriptor), ...getClassicalNahuatlTypeTwoCausativeOptions(sourceDescriptor)];
      } else if (!blockReason && derivationType === "applicative") {
        generatedOptions = getClassicalNahuatlLicensedApplicativeOptions(sourceDescriptor);
      }
      const dedupedOptions = Object.freeze(Array.from(new Map(generatedOptions.map(option => [option.optionId, option])).values()));
      if (!blockReason && derivationType !== "direct" && !dedupedOptions.length) {
        blockReason = `classical-vnc-${derivationType}-no-rule-derived-options`;
      }
      const sourceAnalysisFrame = sourceDescriptor.authorizationStatus === "authorized" ? getClassicalNahuatlVncDerivationSourceAnalysis(sourceDescriptor) : null;
      const analysisSelectionRequired = dedupedOptions.some(option => option.sourceAnalysisSelectionRequired === true);
      const selectorRequired = dedupedOptions.length > 1 || analysisSelectionRequired;
      const automaticOptionId = dedupedOptions.length === 1 && !selectorRequired ? dedupedOptions[0].optionId : "";
      const inventory = {
        kind: "classical-nahuatl-vnc-derivation-option-inventory",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        sourceAuthority: "Andrews transcription and typed lower-lesson frames",
        sourceDocument: CLASSICAL_NAHUATL_VNC_DERIVATION_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        derivationType,
        sourceStem: sourceDescriptor.sourceStem || "",
        sourceClass: sourceDescriptor.sourceClass || "",
        sourceValence: sourceDescriptor.sourceValence || "",
        sourceSubject: sourceDescriptor.sourceSubject || "",
        sourceSignature: sourceDescriptor.sourceSignature || "",
        sourceAnalysisFrame,
        sourceMachineryFrame,
        sourceTypedVncSlotFrame: sourceDescriptor.finalTypedFrame || null,
        options: dedupedOptions,
        canvasDerivationChoiceFrames: Object.freeze(dedupedOptions.map(option => option.canvasDerivationChoiceFrame).filter(Boolean)),
        optionCount: dedupedOptions.length,
        selectionRequired: selectorRequired,
        selectorRequired,
        analysisSelectionRequired,
        automaticOptionId,
        defaultOptionId: "",
        callerSuppliedTargetAllowed: false,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      };
      inventory.canonicalSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationInventorySignaturePayload(inventory));
      return Object.freeze(inventory);
    }
    function getClassicalNahuatlVncDerivationOptionInventory(sourceMachineryFrame = null, options = {}) {
      return getClassicalNahuatlVncDerivationOptionInventoryInternal(sourceMachineryFrame, options, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function getComparableClassicalNahuatlVncDerivationOptionInventory(inventory = {}) {
      return Object.fromEntries(Object.entries(inventory).filter(([key]) => !["sourceMachineryFrame", "sourceAnalysisFrame"].includes(key)));
    }
    function isClassicalNahuatlVncDerivationOptionInventoryInternal(frame = null, depth = 0, validationContext = null) {
      if (!frame || frame.kind !== "classical-nahuatl-vnc-derivation-option-inventory" || frame.version !== CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION || frame.authorizationStatus !== "authorized" || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH || frame.callerSuppliedTargetAllowed !== false || frame.formulaArtifactAuthority !== false || frame.surfaceArtifactAuthority !== false) {
        return false;
      }
      if (validationContext?.inventories?.has(frame)) {
        return true;
      }
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(frame.sourceMachineryFrame, depth + 1, validationContext);
      if (sourceDescriptor.authorizationStatus !== "authorized" || sourceDescriptor.sourceSignature !== frame.sourceSignature || !isClassicalNahuatlVncDerivationSourceAnalysisFrameInternal(frame.sourceAnalysisFrame, depth + 1, validationContext) || frame.sourceAnalysisFrame.sourceSignature !== frame.sourceSignature) {
        return false;
      }
      const rebuilt = getClassicalNahuatlVncDerivationOptionInventoryInternal(frame.sourceMachineryFrame, {
        derivationType: frame.derivationType,
        sourceValence: frame.sourceValence,
        verbClass: frame.sourceClass
      }, depth + 1, validationContext);
      const canonical = Boolean(rebuilt.authorizationStatus === "authorized" && frame.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationInventorySignaturePayload(frame)) && areClassicalNahuatlVncDerivationValuesEqual(getComparableClassicalNahuatlVncDerivationOptionInventory(frame), getComparableClassicalNahuatlVncDerivationOptionInventory(rebuilt)));
      if (canonical) {
        validationContext?.inventories?.add(frame);
      }
      return canonical;
    }
    function isClassicalNahuatlVncDerivationOptionInventory(frame = null) {
      return isClassicalNahuatlVncDerivationOptionInventoryInternal(frame, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function deriveClassicalNahuatlVncParticipantTransform(sourceDescriptor = {}, derivationType = "", options = {}) {
      const sourceObjectRequests = Object.freeze((Array.isArray(sourceDescriptor.sourceObjectRequests) ? sourceDescriptor.sourceObjectRequests : []).map(request => Object.freeze({ ...request })));
      const sourceVoice = normalizeClassicalNahuatlVncDerivationToken(sourceDescriptor.sourceVoice || "active");
      const newestLevel = sourceObjectRequests.reduce((maximum, request) => Math.max(maximum, request.derivationalLevel), 0) + 1;
      let blockReason = sourceObjectRequests.length > 2 ? "classical-vnc-derivation-source-object-limit-exceeded" : "";
      let targetSubject = normalizeClassicalNahuatlVncDerivationToken(options?.targetSubject);
      const causativeReferentRelation = normalizeClassicalNahuatlVncDerivationToken(options?.causativeReferentRelation);
      let causativeSpecificShuntlineRealization = normalizeClassicalNahuatlVncDerivationToken(options?.causativeSpecificShuntlineRealization);
      // Canvas determines this participant from source voice; it is not an
      // independent derivational choice. Active sources contribute their
      // specific subject (reflexive only when coreferential), while passive and
      // impersonal sources contribute the typed implicit agent below.
      const causativeObjectKindChoiceEligible = false;
      const allowedCausativeObjectKinds = Object.freeze([]);
      const causativeReferentRelationChoiceEligible = derivationType === "causative"
        && sourceVoice === "active"
        && targetSubject === sourceDescriptor.sourceSubject
        && !["1sg", "2sg"].includes(targetSubject);
      let addedObjectRequest = null;
      const selectedOption = options?.selectedOption || null;
      const implicitAgentObjectKind = sourceVoice === "active"
        ? ""
        : sourceVoice === "impersonal" && selectedOption?.derivationSubtype === "type-one"
          ? "nonspecific-nonhuman"
          : "nonspecific-human";
      if (!blockReason && derivationType === "causative") {
        if (!CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(targetSubject)) {
          blockReason = "classical-vnc-causative-target-subject-required";
        } else if (causativeReferentRelation && !["distinct", "coreferential"].includes(causativeReferentRelation)) {
          blockReason = "classical-vnc-causative-referent-relation-not-recognized";
        } else if (causativeReferentRelation && !causativeReferentRelationChoiceEligible) {
          blockReason = "classical-vnc-causative-referent-relation-not-applicable";
        } else if (causativeReferentRelationChoiceEligible && !causativeReferentRelation) {
          blockReason = "classical-vnc-causative-equal-person-category-referent-choice-required";
        } else if (["1pl", "2pl"].includes(targetSubject) && sourceObjectRequests.some(request => request.objectKind === "specific-projective" && request.objectPerson === targetSubject)) {
          blockReason = "classical-vnc-causative-retained-source-coreference-referent-choice-required";
        } else {
          const coreferential = sourceVoice === "active"
            && targetSubject === sourceDescriptor.sourceSubject
            && (["1sg", "2sg"].includes(targetSubject) || causativeReferentRelation === "coreferential");
          const selectedCausativeObjectKind = sourceVoice === "active"
            ? coreferential
              ? "reflexive"
              : "specific-projective"
            : implicitAgentObjectKind;
          const objectId = getClassicalNahuatlVncDerivationAvailableObjectId(sourceObjectRequests, "causative-object", newestLevel);
          addedObjectRequest = normalizeClassicalNahuatlVncDerivationObjectRequest({
            objectId,
            objectKind: selectedCausativeObjectKind,
            objectPerson: sourceVoice === "active" && ["specific-projective", "reflexive"].includes(selectedCausativeObjectKind) ? sourceDescriptor.sourceSubject : "",
            governor: "causative",
            derivationalLevel: newestLevel
          }, sourceObjectRequests.length);
        }
      } else if (!blockReason && derivationType === "applicative") {
        if (targetSubject && targetSubject !== sourceDescriptor.sourceSubject) {
          blockReason = "classical-vnc-applicative-target-subject-must-preserve-source-subject";
        }
        targetSubject = sourceDescriptor.sourceSubject;
        const objectKind = normalizeClassicalNahuatlVncDerivationObjectKind(options?.applicativeObjectKind || "specific-projective");
        const objectPerson = normalizeClassicalNahuatlVncDerivationToken(options?.applicativeObjectPerson);
        if (!blockReason && !CLASSICAL_NAHUATL_VNC_DERIVATION_OBJECT_KINDS.includes(objectKind)) {
          blockReason = "classical-vnc-applicative-object-kind-not-authorized";
        } else if (!blockReason && objectKind === "specific-projective" && !CLASSICAL_NAHUATL_VNC_DERIVATION_PERSONS.includes(objectPerson)) {
          blockReason = "classical-vnc-applicative-specific-object-person-required";
        } else if (!blockReason && objectKind === "specific-projective" && ["1sg", "2sg", "1pl", "2pl"].includes(targetSubject) && objectPerson === targetSubject) {
          blockReason = "classical-vnc-applicative-coreferential-specific-object-must-be-reflexive";
        } else if (!blockReason) {
          const objectId = getClassicalNahuatlVncDerivationAvailableObjectId(sourceObjectRequests, "applicative-object", newestLevel);
          addedObjectRequest = normalizeClassicalNahuatlVncDerivationObjectRequest({
            objectId,
            objectKind,
            objectPerson,
            governor: "applicative",
            derivationalLevel: newestLevel
          }, sourceObjectRequests.length);
        }
      }
      const retainedTargetObjectRequests = Object.freeze(sourceObjectRequests.map((request, requestIndex) => {
        if (derivationType === "causative" && request.objectKind === "reflexive") {
          return normalizeClassicalNahuatlVncDerivationObjectRequest({
            ...request,
            objectPerson: "nonfirst-common"
          }, requestIndex);
        }
        if (request.objectKind === "specific-projective" && ["1sg", "2sg"].includes(targetSubject) && request.objectPerson === targetSubject) {
          return normalizeClassicalNahuatlVncDerivationObjectRequest({
            ...request,
            objectKind: "reflexive",
            objectPerson: targetSubject
          }, requestIndex);
        }
        return request;
      }));
      const retainedSourceReflexiveShuntlineRuleFrame = derivationType === "causative" && sourceObjectRequests.some(request => request.objectKind === "reflexive")
        ? Object.freeze({
          kind: "classical-nahuatl-lesson25-retained-source-reflexive-shuntline-rule-frame",
          version: 1,
          lesson: "Andrews Lesson 25",
          section: "25.13",
          authorizationStatus: "authorized",
          ruleId: "cn-l25-2513-source-mainline-reflexive-to-shuntline-ne",
          operation: "replace-retained-source-mainline-reflexive-person-with-nonfirst-common-shuntline",
          sourceReflexiveObjectIds: Object.freeze(sourceObjectRequests.filter(request => request.objectKind === "reflexive").map(request => request.objectId)),
          targetObjectPerson: "nonfirst-common",
          typedParticipantAuthority: true,
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        })
        : null;
      const targetObjectRequests = Object.freeze(addedObjectRequest ? [...retainedTargetObjectRequests, addedObjectRequest] : [...retainedTargetObjectRequests]);
      const specificShuntlineChoiceEligible = derivationType === "causative"
        && retainedTargetObjectRequests.filter(request => request.objectKind === "specific-projective").length === 1
        && addedObjectRequest?.governor === "causative"
        && ["nonspecific-human", "nonspecific-nonhuman"].includes(addedObjectRequest?.objectKind);
      if (specificShuntlineChoiceEligible && !causativeSpecificShuntlineRealization) {
        causativeSpecificShuntlineRealization = "silent";
      }
      if (!blockReason && causativeSpecificShuntlineRealization && !["silent", "sounded"].includes(causativeSpecificShuntlineRealization)) {
        blockReason = "classical-vnc-causative-specific-shuntline-realization-not-recognized";
      } else if (!blockReason && causativeSpecificShuntlineRealization && !specificShuntlineChoiceEligible) {
        blockReason = "classical-vnc-causative-specific-shuntline-realization-not-applicable";
      }
      if (!blockReason && !areClassicalNahuatlVncDerivationObjectRequestsValid(targetObjectRequests, { maximumCount: 3 })) {
        blockReason = "classical-vnc-derivation-target-object-contract-invalid";
      }
      const participantTransformFrame = {
        frameRole: "typed-participant-transform",
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        derivationType,
        sourceVoice,
        sourceSubject: sourceDescriptor.sourceSubject,
        participantSurfaceSubject: sourceDescriptor.participantSurfaceSubject || sourceDescriptor.sourceSubject,
        participantSurfaceObjectRequests: sourceDescriptor.participantSurfaceObjectRequests || sourceObjectRequests,
        promotedSourceObjectRequest: sourceDescriptor.promotedSourceObjectRequest || null,
        implicitAgentObjectKind,
        targetSubject,
        causativeReferentRelation,
        causativeReferentRelationChoiceEligible,
        requestedCausativeObjectKind: "",
        causativeObjectKind: addedObjectRequest?.objectKind || "",
        causativeObjectKindChoiceEligible,
        allowedCausativeObjectKinds,
        causativeSpecificShuntlineRealization,
        causativeSpecificShuntlineChoiceEligible: specificShuntlineChoiceEligible,
        sourceSubjectBecomesCausativeObject: derivationType === "causative" && sourceVoice === "active",
        implicitAgentBecomesCausativeObject: derivationType === "causative" && sourceVoice !== "active",
        referentiallyEmptySourceSubjectDiscarded: derivationType === "causative" && sourceVoice === "impersonal",
        passivePromotedSubjectRetainedAsObject: derivationType === "causative" && sourceVoice === "passive",
        sourceSubjectPreservedByApplicative: derivationType === "applicative",
        sourceObjectRequests,
        retainedTargetObjectRequests,
        retainedSourceReflexiveShuntlineRuleFrame,
        addedObjectRequest,
        targetObjectRequests,
        sourceObjectCount: sourceObjectRequests.length,
        targetObjectCount: targetObjectRequests.length,
        newestDerivationalLevel: newestLevel,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      };
      participantTransformFrame.canonicalSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncParticipantTransformSignaturePayload(participantTransformFrame, sourceDescriptor.sourceSignature));
      return Object.freeze(participantTransformFrame);
    }
    function getClassicalNahuatlVncParticipantTransformSignaturePayload(participantTransformFrame = {}, sourceSignature = "") {
      return {
        derivationType: participantTransformFrame.derivationType,
        sourceSignature,
        sourceVoice: participantTransformFrame.sourceVoice || "active",
        sourceSubject: participantTransformFrame.sourceSubject,
        participantSurfaceSubject: participantTransformFrame.participantSurfaceSubject || "",
        participantSurfaceObjectRequests: participantTransformFrame.participantSurfaceObjectRequests || [],
        promotedSourceObjectRequest: participantTransformFrame.promotedSourceObjectRequest || null,
        implicitAgentObjectKind: participantTransformFrame.implicitAgentObjectKind || "",
        targetSubject: participantTransformFrame.targetSubject,
        causativeReferentRelation: participantTransformFrame.causativeReferentRelation || "",
        causativeReferentRelationChoiceEligible: participantTransformFrame.causativeReferentRelationChoiceEligible === true,
        requestedCausativeObjectKind: participantTransformFrame.requestedCausativeObjectKind || "",
        causativeObjectKind: participantTransformFrame.causativeObjectKind || "",
        causativeObjectKindChoiceEligible: participantTransformFrame.causativeObjectKindChoiceEligible === true,
        allowedCausativeObjectKinds: participantTransformFrame.allowedCausativeObjectKinds || [],
        causativeSpecificShuntlineRealization: participantTransformFrame.causativeSpecificShuntlineRealization || "",
        causativeSpecificShuntlineChoiceEligible: participantTransformFrame.causativeSpecificShuntlineChoiceEligible === true,
        sourceSubjectBecomesCausativeObject: participantTransformFrame.sourceSubjectBecomesCausativeObject === true,
        implicitAgentBecomesCausativeObject: participantTransformFrame.implicitAgentBecomesCausativeObject === true,
        referentiallyEmptySourceSubjectDiscarded: participantTransformFrame.referentiallyEmptySourceSubjectDiscarded === true,
        passivePromotedSubjectRetainedAsObject: participantTransformFrame.passivePromotedSubjectRetainedAsObject === true,
        sourceSubjectPreservedByApplicative: participantTransformFrame.sourceSubjectPreservedByApplicative === true,
        sourceObjectRequests: participantTransformFrame.sourceObjectRequests || [],
        retainedTargetObjectRequests: participantTransformFrame.retainedTargetObjectRequests || [],
        retainedSourceReflexiveShuntlineRuleFrame: participantTransformFrame.retainedSourceReflexiveShuntlineRuleFrame || null,
        addedObjectRequest: participantTransformFrame.addedObjectRequest || null,
        targetObjectRequests: participantTransformFrame.targetObjectRequests || [],
        sourceObjectCount: participantTransformFrame.sourceObjectCount,
        targetObjectCount: participantTransformFrame.targetObjectCount,
        newestDerivationalLevel: participantTransformFrame.newestDerivationalLevel,
        authorizationStatus: participantTransformFrame.authorizationStatus,
        blockReason: participantTransformFrame.blockReason || "",
        formulaArtifactAuthority: participantTransformFrame.formulaArtifactAuthority,
        surfaceArtifactAuthority: participantTransformFrame.surfaceArtifactAuthority
      };
    }
    function buildClassicalNahuatlVncDerivationReverseSourceAnalyses(sourceDescriptor = {}, selectedOption = null) {
      if (!selectedOption) {
        return Object.freeze([]);
      }
      const selectedSourceAnalysis = {
        analysisId: `identified-source:${sourceDescriptor.sourceSignature}`,
        analysisStatus: "identified-source",
        formationStem: sourceDescriptor.sourceStem,
        formationClass: sourceDescriptor.sourceClass,
        sourceVoice: sourceDescriptor.sourceVoice || "active",
        sourceValence: sourceDescriptor.sourceValence,
        sourceObjectCount: sourceDescriptor.sourceObjectCount,
        sourceSubject: sourceDescriptor.sourceSubject,
        sourceTypedSemanticIdentity: sourceDescriptor.finalTypedFrame?.semanticIdentity || "",
        sourceSignature: sourceDescriptor.sourceSignature,
        selectedDerivationRoute: selectedOption.derivationRoute,
        andrewsSections: Object.freeze([selectedOption.andrewsSection, "25.9", "25.13"].filter(Boolean)),
        silentSourceObjectRequired: false,
        generationAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false
      };
      const normalizedTarget = getClassicalNahuatlVncDerivationLexicalKey(selectedOption.targetStem);
      const normalizedSource = getClassicalNahuatlVncDerivationLexicalKey(sourceDescriptor.sourceStem);
      const exactMachAmbiguity = normalizedSource === "mati" && ["machtia", "machtiā"].includes(normalizedTarget);
      const machReverseAnalyses = [{
        analysisId: "cn-l25-253-mach-tia-from-intransitive-mati",
        analysisStatus: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence === "intransitive" ? "identified-source" : "canonically-licensed-reverse-source",
        formationStem: sourceDescriptor.sourceStem,
        formationClass: "B",
        sourceVoice: "active",
        sourceValence: "intransitive",
        sourceObjectCount: 0,
        sourceSubject: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence === "intransitive" ? sourceDescriptor.sourceSubject : "context-dependent",
        sourceTypedSemanticIdentity: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence === "intransitive" ? sourceDescriptor.finalTypedFrame?.semanticIdentity || "" : "",
        sourceSignature: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence === "intransitive" ? sourceDescriptor.sourceSignature : "",
        selectedDerivationRoute: selectedOption.derivationRoute,
        andrewsSections: Object.freeze(["25.3", "25.13"]),
        silentSourceObjectRequired: false,
        generationAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false
      }, {
        analysisId: "cn-l25-253-mach-tia-from-transitive-tla-mati",
        analysisStatus: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence !== "intransitive" ? "identified-source" : "canonically-licensed-reverse-source",
        formationStem: sourceDescriptor.sourceStem,
        formationClass: "B",
        sourceVoice: "active",
        sourceValence: "specific-projective",
        sourceObjectCount: 1,
        sourceSubject: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence !== "intransitive" ? sourceDescriptor.sourceSubject : "context-dependent",
        sourceTypedSemanticIdentity: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence !== "intransitive" ? sourceDescriptor.finalTypedFrame?.semanticIdentity || "" : "",
        sourceSignature: sourceDescriptor.sourceVoice === "active" && sourceDescriptor.sourceValence !== "intransitive" ? sourceDescriptor.sourceSignature : "",
        selectedDerivationRoute: selectedOption.derivationRoute,
        andrewsSections: Object.freeze(["25.3", "25.13"]),
        silentSourceObjectRequired: true,
        generationAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false
      }];
      const canvasLesson2513Analyses = normalizedTarget === "caquitiltiā" ? [{
        analysisId: "cn-l25-2513-caquitiltia-from-active-first-causative",
        analysisStatus: sourceDescriptor.sourceVoice === "active" ? "identified-source" : "canonically-licensed-reverse-source",
        formationStem: "caquī-tiā",
        formationClass: "C",
        sourceVoice: "active",
        sourceValence: "multiple-object",
        sourceObjectCount: 2,
        sourceSubject: sourceDescriptor.sourceVoice === "active" ? sourceDescriptor.sourceSubject : "context-dependent",
        sourceTypedSemanticIdentity: sourceDescriptor.sourceVoice === "active" ? sourceDescriptor.finalTypedFrame?.semanticIdentity || "" : "",
        sourceSignature: sourceDescriptor.sourceVoice === "active" ? sourceDescriptor.sourceSignature : "",
        selectedDerivationRoute: selectedOption.derivationRoute,
        andrewsSections: Object.freeze(["25.12", "25.13"]),
        silentSourceObjectRequired: true,
        generationAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false
      }, {
        analysisId: "cn-l25-2513-caquitiltia-from-passive-first-causative",
        analysisStatus: sourceDescriptor.sourceVoice === "passive" ? "identified-source" : "canonically-licensed-reverse-source",
        formationStem: "caquī-ti-lō",
        formationClass: "C",
        sourceVoice: "passive",
        sourceValence: "multiple-object",
        sourceObjectCount: 1,
        sourceSubject: sourceDescriptor.sourceVoice === "passive" ? sourceDescriptor.sourceSubject : "context-dependent",
        sourceTypedSemanticIdentity: sourceDescriptor.sourceVoice === "passive" ? sourceDescriptor.finalTypedFrame?.semanticIdentity || "" : "",
        sourceSignature: sourceDescriptor.sourceVoice === "passive" ? sourceDescriptor.sourceSignature : "",
        selectedDerivationRoute: selectedOption.derivationRoute,
        andrewsSections: Object.freeze(["25.12.3", "25.13"]),
        silentSourceObjectRequired: true,
        generationAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false
      }] : normalizedTarget === "nōtzaltiā" ? [{
        analysisId: "cn-l25-2513-notzaltia-from-active-human-object-source",
        analysisStatus: sourceDescriptor.sourceVoice === "active" ? "identified-source" : "canonically-licensed-reverse-source",
        formationStem: "nōtza",
        formationClass: "A",
        sourceVoice: "active",
        sourceValence: "nonspecific-human",
        sourceObjectCount: 1,
        sourceSubject: sourceDescriptor.sourceVoice === "active" ? sourceDescriptor.sourceSubject : "context-dependent",
        sourceTypedSemanticIdentity: sourceDescriptor.sourceVoice === "active" ? sourceDescriptor.finalTypedFrame?.semanticIdentity || "" : "",
        sourceSignature: sourceDescriptor.sourceVoice === "active" ? sourceDescriptor.sourceSignature : "",
        selectedDerivationRoute: selectedOption.derivationRoute,
        andrewsSections: Object.freeze(["25.11.1", "25.13"]),
        silentSourceObjectRequired: false,
        generationAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false
      }, {
        analysisId: "cn-l25-2513-notzaltia-from-passive-source",
        analysisStatus: sourceDescriptor.sourceVoice === "passive" ? "identified-source" : "canonically-licensed-reverse-source",
        formationStem: "nōtza-lō",
        formationClass: "A",
        sourceVoice: "passive",
        sourceValence: "specific-projective",
        sourceObjectCount: 0,
        sourceSubject: sourceDescriptor.sourceVoice === "passive" ? sourceDescriptor.sourceSubject : "context-dependent",
        sourceTypedSemanticIdentity: sourceDescriptor.sourceVoice === "passive" ? sourceDescriptor.finalTypedFrame?.semanticIdentity || "" : "",
        sourceSignature: sourceDescriptor.sourceVoice === "passive" ? sourceDescriptor.sourceSignature : "",
        selectedDerivationRoute: selectedOption.derivationRoute,
        andrewsSections: Object.freeze(["25.11.3", "25.13"]),
        silentSourceObjectRequired: true,
        generationAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false
      }] : [];
      const analyses = canvasLesson2513Analyses.length
        ? canvasLesson2513Analyses
        : exactMachAmbiguity
        ? sourceDescriptor.sourceVoice === "active"
          ? machReverseAnalyses
          : [selectedSourceAnalysis, ...machReverseAnalyses]
        : [selectedSourceAnalysis];
      return Object.freeze(analyses.map(analysis => Object.freeze({
        ...analysis,
        canonicalSignature: signClassicalNahuatlVncDerivationValue(analysis)
      })));
    }
    function deriveClassicalNahuatlVncDerivationOperationFrameFromCanonicalContext(sourceMachineryFrame = null, sourceDescriptor = {}, inventory = {}, options = {}) {
      const derivationType = normalizeClassicalNahuatlVncDerivationToken(options?.derivationType).toLowerCase();
      const requestedOptionId = normalizeClassicalNahuatlVncDerivationToken(options?.optionId || options?.derivationOptionId);
      const selectedOptionId = requestedOptionId || inventory.automaticOptionId;
      const selectedOption = inventory.options.find(option => option.optionId === selectedOptionId || option.optionAliases?.includes(selectedOptionId)) || null;
      let blockReason = sourceDescriptor.authorizationStatus === "authorized" ? inventory.blockReason : sourceDescriptor.blockReason;
      if (!blockReason && derivationType === "direct") {
        blockReason = "classical-vnc-direct-derivation-has-no-operation";
      } else if (!blockReason && inventory.selectionRequired && !requestedOptionId) {
        blockReason = "classical-vnc-derivation-option-selection-required";
      } else if (!blockReason && !selectedOption) {
        blockReason = "classical-vnc-derivation-selected-option-was-not-generated";
      }
      const participantTransformFrame = selectedOption && sourceDescriptor.authorizationStatus === "authorized" ? deriveClassicalNahuatlVncParticipantTransform(sourceDescriptor, derivationType, {
        ...options,
        selectedOption
      }) : null;
      if (!blockReason && participantTransformFrame?.authorizationStatus !== "authorized") {
        blockReason = participantTransformFrame?.blockReason || "classical-vnc-derivation-participant-transform-blocked";
      }
      const reverseSourceAnalyses = selectedOption && sourceDescriptor.authorizationStatus === "authorized"
        ? buildClassicalNahuatlVncDerivationReverseSourceAnalyses(sourceDescriptor, selectedOption)
        : Object.freeze([]);
      const operationFrame = {
        kind: "classical-nahuatl-vnc-derivation-operation-frame",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        sourceAuthority: "Andrews transcription and rebuilt typed option inventory",
        sourceDocument: CLASSICAL_NAHUATL_VNC_DERIVATION_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        derivationType,
        sourceMachineryFrame,
        sourceTypedVncSlotFrame: sourceDescriptor.finalTypedFrame || null,
        formationSourceMachineryFrame: sourceDescriptor.formationSourceMachineryFrame || sourceMachineryFrame,
        formationSourceTypedVncSlotFrame: sourceDescriptor.formationFinalTypedFrame || sourceDescriptor.finalTypedFrame || null,
        sourceVoice: sourceDescriptor.sourceVoice || "active",
        sourceStem: sourceDescriptor.sourceStem || "",
        sourceSignature: sourceDescriptor.sourceSignature || "",
        sourceSubject: sourceDescriptor.sourceSubject || "",
        targetSubject: participantTransformFrame?.targetSubject || "",
        causativeReferentRelation: participantTransformFrame?.causativeReferentRelation || "",
        requestedCausativeObjectKind: participantTransformFrame?.requestedCausativeObjectKind || "",
        causativeObjectKind: participantTransformFrame?.causativeObjectKind || "",
        causativeObjectKindChoiceEligible: participantTransformFrame?.causativeObjectKindChoiceEligible === true,
        allowedCausativeObjectKinds: participantTransformFrame?.allowedCausativeObjectKinds || Object.freeze([]),
        causativeSpecificShuntlineRealization: participantTransformFrame?.causativeSpecificShuntlineRealization || "",
        requestedOptionId,
        selectedOptionId: selectedOption?.optionId || "",
        selectedOption,
        selectedCanvasDerivationChoiceFrame: selectedOption?.canvasDerivationChoiceFrame || null,
        selectedChoiceId: selectedOption?.canvasDerivationChoiceFrame?.identity?.choiceId || "",
        selectedChoiceSignature: selectedOption?.canvasDerivationChoiceFrame?.canonicalSignature || "",
        targetStem: selectedOption?.targetStem || "",
        targetClass: selectedOption?.targetClass || "",
        targetEnvironment: selectedOption?.targetEnvironment || null,
        participantTransformFrame,
        reverseSourceAnalyses,
        targetObjectRequests: participantTransformFrame?.targetObjectRequests || Object.freeze([]),
        applicativeObjectKind: normalizeClassicalNahuatlVncDerivationObjectKind(options?.applicativeObjectKind || "specific-projective"),
        applicativeObjectPerson: normalizeClassicalNahuatlVncDerivationToken(options?.applicativeObjectPerson),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedTargetAllowed: false,
        rawNawatForwardPoolUsed: false
      };
      operationFrame.canonicalSignature = signClassicalNahuatlVncDerivationValue({
        derivationType,
        sourceSignature: operationFrame.sourceSignature,
        selectedOptionSignature: selectedOption?.canonicalSignature || "",
        selectedChoiceSignature: selectedOption?.canvasDerivationChoiceFrame?.canonicalSignature || "",
        targetEnvironment: operationFrame.targetEnvironment,
        participantTransformSignature: participantTransformFrame?.canonicalSignature || "",
        reverseSourceAnalysisSignatures: reverseSourceAnalyses.map(analysis => analysis.canonicalSignature),
        authorizationStatus: operationFrame.authorizationStatus,
        blockReason
      });
      return Object.freeze(operationFrame);
    }
    function deriveClassicalNahuatlVncDerivationOperationFrameInternal(sourceMachineryFrame = null, options = {}, depth = 0, validationContext = null) {
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame, depth + 1, validationContext);
      const derivationType = normalizeClassicalNahuatlVncDerivationToken(options?.derivationType).toLowerCase();
      const inventory = getClassicalNahuatlVncDerivationOptionInventoryInternal(sourceMachineryFrame, { derivationType }, depth + 1, validationContext);
      return deriveClassicalNahuatlVncDerivationOperationFrameFromCanonicalContext(sourceMachineryFrame, sourceDescriptor, inventory, options);
    }
    function normalizeClassicalNahuatlVncDerivationOperationBatchRequest(options = {}) {
      return Object.freeze({
        derivationType: normalizeClassicalNahuatlVncDerivationToken(options?.derivationType).toLowerCase(),
        optionId: normalizeClassicalNahuatlVncDerivationToken(options?.optionId || options?.derivationOptionId),
        targetSubject: normalizeClassicalNahuatlVncDerivationToken(options?.targetSubject),
        causativeReferentRelation: normalizeClassicalNahuatlVncDerivationToken(options?.causativeReferentRelation),
        causativeObjectKind: normalizeClassicalNahuatlVncDerivationToken(options?.causativeObjectKind),
        causativeSpecificShuntlineRealization: normalizeClassicalNahuatlVncDerivationToken(options?.causativeSpecificShuntlineRealization),
        applicativeObjectKind: normalizeClassicalNahuatlVncDerivationToken(options?.applicativeObjectKind),
        applicativeObjectPerson: normalizeClassicalNahuatlVncDerivationToken(options?.applicativeObjectPerson)
      });
    }
    function getClassicalNahuatlVncDerivationOperationBatchSignaturePayload(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        sourceSignature: frame.sourceSignature,
        derivationInventorySignature: frame.derivationOptionInventory?.canonicalSignature || "",
        operationRequests: frame.operationRequests || [],
        operationSignatures: (frame.operationFrames || []).map(operationFrame => operationFrame?.canonicalSignature || ""),
        operationCount: frame.operationCount || 0,
        typedFrameAuthority: frame.typedFrameAuthority,
        formulaArtifactAuthority: frame.formulaArtifactAuthority,
        surfaceArtifactAuthority: frame.surfaceArtifactAuthority,
        callerSuppliedTargetAllowed: frame.callerSuppliedTargetAllowed
      };
    }
    function deriveClassicalNahuatlVncDerivationOperationBatchFrameInternal(sourceMachineryFrame = null, derivationOptionInventory = null, operationRequests = [], depth = 0, validationContext = null) {
      const normalizedOperationRequests = Object.freeze((Array.isArray(operationRequests) ? operationRequests : []).map(normalizeClassicalNahuatlVncDerivationOperationBatchRequest));
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame, depth + 1, validationContext);
      const inventoryCanonical = derivationOptionInventory?.sourceMachineryFrame === sourceMachineryFrame
        && isClassicalNahuatlVncDerivationOptionInventoryInternal(derivationOptionInventory, depth + 1, validationContext);
      let blockReason = sourceDescriptor.authorizationStatus === "authorized" ? "" : sourceDescriptor.blockReason;
      if (!blockReason && !inventoryCanonical) {
        blockReason = "classical-vnc-derivation-operation-batch-canonical-inventory-required";
      } else if (!blockReason && !normalizedOperationRequests.length) {
        blockReason = "classical-vnc-derivation-operation-batch-requests-required";
      } else if (!blockReason && normalizedOperationRequests.some(request => request.derivationType !== derivationOptionInventory.derivationType)) {
        blockReason = "classical-vnc-derivation-operation-batch-type-must-match-inventory";
      }
      const operationFrames = Object.freeze(blockReason ? [] : normalizedOperationRequests.map(request => deriveClassicalNahuatlVncDerivationOperationFrameFromCanonicalContext(
        sourceMachineryFrame,
        sourceDescriptor,
        derivationOptionInventory,
        request
      )));
      const frame = {
        kind: "classical-nahuatl-vnc-derivation-operation-batch-frame",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        sourceMachineryFrame,
        sourceSignature: sourceDescriptor.sourceSignature || "",
        derivationOptionInventory,
        operationRequests: normalizedOperationRequests,
        operationFrames,
        operationCount: operationFrames.length,
        typedFrameAuthority: true,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedTargetAllowed: false
      };
      frame.canonicalSignature = blockReason ? "" : signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationOperationBatchSignaturePayload(frame));
      return Object.freeze(frame);
    }
    function deriveClassicalNahuatlVncDerivationOperationBatchFrame(sourceMachineryFrame = null, derivationOptionInventory = null, operationRequests = []) {
      return deriveClassicalNahuatlVncDerivationOperationBatchFrameInternal(sourceMachineryFrame, derivationOptionInventory, operationRequests, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function isClassicalNahuatlVncDerivationOperationBatchFrame(frame = null) {
      if (!frame
        || frame.kind !== "classical-nahuatl-vnc-derivation-operation-batch-frame"
        || frame.version !== CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.formulaArtifactAuthority !== false
        || frame.surfaceArtifactAuthority !== false
        || frame.callerSuppliedTargetAllowed !== false
        || frame.operationCount !== frame.operationFrames?.length
        || frame.operationCount !== frame.operationRequests?.length) {
        return false;
      }
      const rebuilt = deriveClassicalNahuatlVncDerivationOperationBatchFrameInternal(
        frame.sourceMachineryFrame,
        frame.derivationOptionInventory,
        frame.operationRequests,
        0,
        createClassicalNahuatlVncDerivationValidationContext()
      );
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.sourceMachineryFrame === frame.sourceMachineryFrame
        && rebuilt.derivationOptionInventory === frame.derivationOptionInventory
        && frame.operationFrames.every(operationFrame => operationFrame?.sourceMachineryFrame === frame.sourceMachineryFrame)
        && frame.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationOperationBatchSignaturePayload(frame))
        && rebuilt.canonicalSignature === frame.canonicalSignature
        && areClassicalNahuatlVncDerivationValuesEqual(rebuilt, frame));
    }
    function deriveClassicalNahuatlVncDerivationOperationFrame(sourceMachineryFrame = null, options = {}) {
      return deriveClassicalNahuatlVncDerivationOperationFrameInternal(sourceMachineryFrame, options, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function getComparableClassicalNahuatlVncDerivationOperationFrame(frame = {}) {
      return Object.fromEntries(Object.entries(frame).filter(([key]) => ![
        "sourceMachineryFrame",
        "formationSourceMachineryFrame"
      ].includes(key)));
    }
    function isClassicalNahuatlVncDerivationOperationFrameInternal(frame = null, depth = 0, validationContext = null) {
      if (!frame || frame.kind !== "classical-nahuatl-vnc-derivation-operation-frame" || frame.version !== CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION || frame.authorizationStatus !== "authorized" || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH || frame.formulaArtifactAuthority !== false || frame.surfaceArtifactAuthority !== false || frame.callerSuppliedTargetAllowed !== false || frame.rawNawatForwardPoolUsed !== false) {
        return false;
      }
      if (validationContext?.operations?.has(frame)) {
        return true;
      }
      const rebuilt = deriveClassicalNahuatlVncDerivationOperationFrameInternal(frame.sourceMachineryFrame, {
        derivationType: frame.derivationType,
        optionId: frame.requestedOptionId,
        targetSubject: frame.targetSubject,
        causativeReferentRelation: frame.causativeReferentRelation,
        causativeObjectKind: frame.requestedCausativeObjectKind,
        causativeSpecificShuntlineRealization: frame.causativeSpecificShuntlineRealization,
        applicativeObjectKind: frame.applicativeObjectKind,
        applicativeObjectPerson: frame.applicativeObjectPerson
      }, depth + 1, validationContext);
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const selectedOptionSignatureValid = frame.selectedOption?.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncDerivationOptionSignaturePayload(frame.selectedOption));
      const selectedChoiceValid = !frame.selectedCanvasDerivationChoiceFrame || Boolean(
        frame.selectedCanvasDerivationChoiceFrame === frame.selectedOption?.canvasDerivationChoiceFrame
        && frame.selectedChoiceId === frame.selectedCanvasDerivationChoiceFrame.identity?.choiceId
        && frame.selectedChoiceSignature === frame.selectedCanvasDerivationChoiceFrame.canonicalSignature
        && isClassicalNahuatlCanvasDerivationChoiceFrame(frame.selectedCanvasDerivationChoiceFrame)
      );
      const participantSignatureValid = frame.participantTransformFrame?.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlVncParticipantTransformSignaturePayload(frame.participantTransformFrame, frame.sourceSignature));
      const lesson20Record = frame.selectedOption?.lesson20NonactiveStemRecord || null;
      const lesson20RecordValid = !lesson20Record || typeof runtimeTarget?.isClassicalNahuatlLesson20NonactiveStemRecord === "function" && runtimeTarget.isClassicalNahuatlLesson20NonactiveStemRecord(lesson20Record, frame.sourceStem) && frame.selectedOption.lesson20RecordSignature === getClassicalNahuatlLesson20RecordSignature(lesson20Record);
      const canonical = Boolean(rebuilt.authorizationStatus === "authorized" && frame.canonicalSignature === rebuilt.canonicalSignature && frame.sourceSignature === rebuilt.sourceSignature && frame.formationSourceMachineryFrame === rebuilt.formationSourceMachineryFrame && frame.targetStem === rebuilt.targetStem && frame.targetClass === rebuilt.targetClass && selectedOptionSignatureValid && selectedChoiceValid && lesson20RecordValid && frame.selectedOption?.canonicalSignature === rebuilt.selectedOption?.canonicalSignature && frame.selectedChoiceSignature === rebuilt.selectedChoiceSignature && areClassicalNahuatlVncDerivationValuesEqual(frame.selectedOption, rebuilt.selectedOption) && areClassicalNahuatlVncDerivationValuesEqual(frame.targetObjectRequests, rebuilt.targetObjectRequests) && participantSignatureValid && frame.participantTransformFrame?.canonicalSignature === rebuilt.participantTransformFrame?.canonicalSignature && areClassicalNahuatlVncDerivationValuesEqual(frame.participantTransformFrame, rebuilt.participantTransformFrame) && areClassicalNahuatlVncDerivationValuesEqual(getComparableClassicalNahuatlVncDerivationOperationFrame(frame), getComparableClassicalNahuatlVncDerivationOperationFrame(rebuilt)));
      if (canonical) {
        validationContext?.operations?.add(frame);
      }
      return canonical;
    }
    function isClassicalNahuatlVncDerivationOperationFrame(frame = null) {
      return isClassicalNahuatlVncDerivationOperationFrameInternal(frame, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function getClassicalNahuatlVncDerivationValenceForObjectKind(objectKind = "") {
      return {
        reflexive: "mainline-reflexive",
        "nonspecific-human": "projective-human",
        "nonspecific-nonhuman": "projective-nonhuman",
        "specific-projective": "specific-projective"
      }[normalizeClassicalNahuatlVncDerivationObjectKind(objectKind)] || "specific-projective";
    }
    function getClassicalNahuatlVncDerivationSafeSentenceOptions(options = {}) {
      const source = options?.sentenceOptions && typeof options.sentenceOptions === "object" ? options.sentenceOptions : options;
      const keys = ["directionalPrefix", "incorporatedAdverb", "adverbPosition", "sentenceType", "negative", "questionMode", "introductoryParticle", "prefaceParticle", "lesson9PrefaceParticle", "introductoryModifier", "lesson9IntroductoryModifier", "admonitiveTranslationReading", "translationReading", "requestedTranslationReading", "admonitiveContrastReading", "contrastReading", "requestedContrastReading", "sentenceAntecessive", "antecessive", "requestedNegativePrefix", "negativePrefix", "outsidePrefixes", "construction", "lesson11LexicalReading"];
      return Object.fromEntries(keys.filter(key => Object.prototype.hasOwnProperty.call(source || {}, key)).map(key => [key, Array.isArray(source[key]) ? [...source[key]] : source[key]]));
    }
    function buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame = null, operationFrame = null, blockReason = "classical-vnc-derived-machinery-not-authorized") {
      return Object.freeze({
        kind: "classical-nahuatl-vnc-derived-machinery-frame",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        authorizationStatus: "blocked",
        blockReason,
        stem: "",
        targetStem: operationFrame?.targetStem || "",
        targetClass: operationFrame?.targetClass || "",
        valence: "",
        sourceMachineryFrame,
        sourceTypedVncSlotFrame: getClassicalNahuatlVncDerivationFinalTypedFrame(sourceMachineryFrame),
        derivationOperationFrame: operationFrame,
        participantTransformFrame: operationFrame?.participantTransformFrame || null,
        targetObjectRequests: operationFrame?.targetObjectRequests || Object.freeze([]),
        multipleObjectClusterFrame: null,
        targetObjectClusterFrame: null,
        targetTypedVncSlotFrame: null,
        finalTypedVncSlotFrame: null,
        typedFrameAuthority: true,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        rawNawatForwardPoolUsed: false,
        canonicalSignature: ""
      });
    }
    function getClassicalNahuatlDerivedVncMachinerySignaturePayload(frame = {}) {
      return {
        sourceSignature: frame.sourceSignature,
        operationSignature: frame.derivationOperationFrame?.canonicalSignature || "",
        targetStem: frame.targetStem,
        targetClass: frame.targetClass,
        targetSubject: frame.targetSubject,
        targetObjectRequests: frame.targetObjectRequests || [],
        targetTypedSemanticIdentity: frame.targetTypedVncSlotFrame?.semanticIdentity || "",
        targetClusterPositions: frame.targetObjectClusterFrame?.positions || []
      };
    }
    function getClassicalNahuatlDerivedVncCanonicalSentenceOptions(sourceMachineryFrame = null) {
      const conclusion = sourceMachineryFrame?.proofFrame?.conclusion || {};
      const expandedBoundary = sourceMachineryFrame?.expandedVncBoundaryFrame || conclusion.expandedVncBoundaryFrame || {};
      const sentenceFrame = sourceMachineryFrame?.sentenceSurfaceFrame || conclusion.sentenceSurfaceFrame || {};
      const sentenceAntecessive = conclusion.antecessiveOutsideVnc === true || sentenceFrame.sentenceAntecessive === true || sentenceFrame.antecessive === true;
      const negative = sentenceFrame.lesson9NegativeRequested === true || sentenceFrame.lesson10NegativeRequested === true || sentenceFrame.sentenceType === "negative-assertion" || Boolean(sentenceFrame.negativePrefix);
      return getClassicalNahuatlVncDerivationSafeSentenceOptions({
        directionalPrefix: expandedBoundary.directionalPrefix || conclusion.directionalPrefix || "",
        incorporatedAdverb: conclusion.incorporatedAdverb || "",
        adverbPosition: conclusion.adverbPosition || "",
        sentenceType: sentenceFrame.sentenceType || "",
        negative,
        questionMode: sentenceFrame.questionMode || "",
        introductoryParticle: sentenceFrame.introductoryParticle || "",
        prefaceParticle: sentenceFrame.prefaceParticle || "",
        lesson9PrefaceParticle: sentenceFrame.requestedPrefaceParticle || sentenceFrame.prefaceParticle || "",
        introductoryModifier: sentenceFrame.introductoryModifier || "",
        lesson9IntroductoryModifier: sentenceFrame.requestedIntroductoryModifier || sentenceFrame.introductoryModifier || "",
        admonitiveTranslationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        translationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        requestedTranslationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        admonitiveContrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        contrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        requestedContrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        sentenceAntecessive,
        antecessive: sentenceAntecessive,
        requestedNegativePrefix: sentenceFrame.negativePrefix || "",
        negativePrefix: sentenceFrame.negativePrefix || "",
        outsidePrefixes: Array.isArray(conclusion.outsidePrefixes) ? [...conclusion.outsidePrefixes] : [],
        construction: sentenceFrame.lesson11Construction || "",
        lesson11LexicalReading: sourceMachineryFrame?.lesson11VncApplicationFrame?.selectedLexicalReading || ""
      });
    }
    function getClassicalNahuatlDerivedVncAuthoritativeProjection(frame = {}) {
      return {
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        stem: frame.stem,
        targetStem: frame.targetStem,
        targetClass: frame.targetClass,
        targetSubject: frame.targetSubject,
        valence: frame.valence,
        sourceSignature: frame.sourceSignature,
        participantTransformFrame: frame.participantTransformFrame,
        targetObjectRequests: frame.targetObjectRequests,
        multipleObjectClusterFrame: frame.multipleObjectClusterFrame,
        targetObjectClusterFrame: frame.targetObjectClusterFrame,
        targetTypedVncSlotFrame: frame.targetTypedVncSlotFrame,
        finalTypedVncSlotFrame: frame.finalTypedVncSlotFrame,
        sourceOperationTargetFrames: frame.sourceOperationTargetFrames,
        formulaRealization: frame.formulaRealization,
        proofFrame: frame.proofFrame,
        selectedOutputLogicFrame: frame.selectedOutputLogicFrame,
        expandedVncBoundaryFrame: frame.expandedVncBoundaryFrame,
        sentenceSurfaceFrame: frame.sentenceSurfaceFrame,
        canvasLayerEvaluationFrame: frame.canvasLayerEvaluationFrame,
        ruleLogicFrames: frame.ruleLogicFrames,
        ruleLogicFrameKinds: frame.ruleLogicFrameKinds,
        grammarGenerationAllowed: frame.grammarGenerationAllowed,
        formulaOutputAllowed: frame.formulaOutputAllowed,
        surfaceGenerationAllowed: frame.surfaceGenerationAllowed,
        typedFrameAuthority: frame.typedFrameAuthority,
        formulaArtifactAuthority: frame.formulaArtifactAuthority,
        surfaceArtifactAuthority: frame.surfaceArtifactAuthority,
        callerSuppliedAuthorityAccepted: frame.callerSuppliedAuthorityAccepted,
        rawNawatForwardPoolUsed: frame.rawNawatForwardPoolUsed
      };
    }
    function buildClassicalNahuatlDerivedVncMachineryFrameInternal(sourceMachineryFrame = null, operationFrame = null, options = {}, depth = 0, validationContext = null) {
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(sourceMachineryFrame, depth + 1, validationContext);
      if (sourceDescriptor.authorizationStatus !== "authorized") {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, sourceDescriptor.blockReason);
      }
      if (!isClassicalNahuatlVncDerivationOperationFrameInternal(operationFrame, depth + 1, validationContext) || operationFrame.sourceSignature !== sourceDescriptor.sourceSignature) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, "classical-vnc-derived-machinery-canonical-operation-required");
      }
      if (typeof runtimeTarget?.buildClassicalNahuatlLesson7VerbstemClassFrame !== "function" || typeof runtimeTarget?.buildClassicalNahuatlLesson23ObjectClusterFrame !== "function" || typeof runtimeTarget?.isClassicalNahuatlLesson23ObjectClusterFrame !== "function" || typeof runtimeTarget?.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame !== "function") {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, "classical-vnc-derived-machinery-lower-layer-capabilities-unavailable");
      }
      const targetSubject = operationFrame.targetSubject;
      const requestedTargetSubject = normalizeClassicalNahuatlVncDerivationToken(options?.targetSubject);
      const targetMood = normalizeClassicalNahuatlVncDerivationToken(options?.mood || sourceDescriptor.mood);
      const targetTense = normalizeClassicalNahuatlVncDerivationToken(options?.tense || sourceDescriptor.tense);
      if (requestedTargetSubject && requestedTargetSubject !== targetSubject) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, "classical-vnc-derived-machinery-target-subject-contradiction");
      }
      if (targetMood !== sourceDescriptor.mood || targetTense !== sourceDescriptor.tense) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, "classical-vnc-derived-machinery-source-environment-continuity-required");
      }
      const targetObjectRequests = operationFrame.targetObjectRequests;
      if (!targetObjectRequests.length || targetObjectRequests.length > 3) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, "classical-vnc-derived-machinery-one-to-three-target-objects-required");
      }
      const oldestObjectRequest = targetObjectRequests.slice().sort((left, right) => left.derivationalLevel - right.derivationalLevel)[0];
      const baseValence = getClassicalNahuatlVncDerivationValenceForObjectKind(oldestObjectRequest.objectKind);
      const callerSentenceOptions = getClassicalNahuatlVncDerivationSafeSentenceOptions(options);
      const sentenceOptions = operationFrame.targetEnvironment?.directionalPrefix ? {
        ...callerSentenceOptions,
        directionalPrefix: operationFrame.targetEnvironment.directionalPrefix
      } : callerSentenceOptions;
      const targetLesson7Machinery = runtimeTarget.buildClassicalNahuatlLesson7VerbstemClassFrame(operationFrame.targetStem, {
        ...sentenceOptions,
        subject: targetSubject,
        mood: targetMood,
        tense: targetTense,
        verbClass: operationFrame.targetClass,
        perfectiveClass: operationFrame.targetClass,
        requestedSourceValence: baseValence,
        valence: baseValence,
        transitivity: "transitive",
        objectKind: oldestObjectRequest.objectKind,
        objectPerson: oldestObjectRequest.objectPerson,
        object: oldestObjectRequest.objectPerson,
        supportiveInitialI: operationFrame.selectedOption?.supportiveInitialI === true
      });
      let selectedMachineryFrame = targetLesson7Machinery;
      let targetObjectClusterFrame = null;
      const lowerTypedFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(targetLesson7Machinery);
      if (targetLesson7Machinery?.authorizationStatus !== "authorized" || !isClassicalNahuatlVncDerivationTypedSlotFrame(lowerTypedFrame)) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, targetLesson7Machinery?.blockReason || "classical-vnc-derived-target-lesson7-machinery-blocked");
      }
      if (targetObjectRequests.length >= 2) {
        targetObjectClusterFrame = runtimeTarget.buildClassicalNahuatlLesson23ObjectClusterFrame(operationFrame.targetStem, {
          subject: targetSubject,
          subjectCarrier: lowerTypedFrame.slots.subject.pers1,
          predicateStem: lowerTypedFrame.slots.predicate.stem,
          tense: targetTense,
          objectRequests: targetObjectRequests,
          causativeSpecificShuntlineRealization: operationFrame.causativeSpecificShuntlineRealization,
          minimumPositionCount: targetObjectRequests.length,
          maximumPositionCount: targetObjectRequests.length
        });
        if (!runtimeTarget.isClassicalNahuatlLesson23ObjectClusterFrame(targetObjectClusterFrame, operationFrame.targetStem)) {
          return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, targetObjectClusterFrame?.blockReason || "classical-vnc-derived-target-object-cluster-blocked");
        }
        selectedMachineryFrame = runtimeTarget.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(targetLesson7Machinery, targetObjectClusterFrame, {
          sourceFrameKind: "classical-nahuatl-vnc-derived-machinery-frame"
        });
      }
      const targetTypedVncSlotFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(selectedMachineryFrame);
      if (!selectedMachineryFrame || selectedMachineryFrame.authorizationStatus !== "authorized" || !isClassicalNahuatlVncDerivationTypedSlotFrame(targetTypedVncSlotFrame)) {
        return buildBlockedClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, selectedMachineryFrame?.blockReason || "classical-vnc-derived-target-typed-slot-blocked");
      }
      const existingRuleLogicFrames = Array.isArray(selectedMachineryFrame.ruleLogicFrames) ? selectedMachineryFrame.ruleLogicFrames : [];
      const derivedFrame = {
        ...selectedMachineryFrame,
        kind: "classical-nahuatl-vnc-derived-machinery-frame",
        version: CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
        lesson: operationFrame.derivationType === "causative" ? "Andrews Lessons 24-25" : "Andrews Lesson 26",
        lessonTitle: operationFrame.derivationType === "causative" ? "Causative VNC Derivation" : "Applicative VNC Derivation",
        authorizationStatus: "authorized",
        blockReason: "",
        stem: operationFrame.targetStem,
        targetStem: operationFrame.targetStem,
        targetClass: operationFrame.targetClass,
        targetEnvironment: operationFrame.targetEnvironment,
        targetSubject,
        valence: targetObjectRequests.length > 1 ? "multiple-object" : baseValence,
        sourceMachineryFrame,
        sourceTypedVncSlotFrame: sourceDescriptor.finalTypedFrame,
        sourceSignature: sourceDescriptor.sourceSignature,
        derivationOperationFrame: operationFrame,
        participantTransformFrame: operationFrame.participantTransformFrame,
        targetObjectRequests,
        multipleObjectClusterFrame: targetObjectClusterFrame,
        targetObjectClusterFrame,
        targetLesson7MachineryFrame: targetLesson7Machinery,
        targetTypedVncSlotFrame,
        finalTypedVncSlotFrame: targetTypedVncSlotFrame,
        sourceOperationTargetFrames: Object.freeze({
          source: sourceDescriptor.finalTypedFrame,
          operation: operationFrame,
          target: targetTypedVncSlotFrame
        }),
        ruleLogicFrames: [operationFrame, ...(targetObjectClusterFrame ? [targetObjectClusterFrame] : []), ...existingRuleLogicFrames],
        ruleLogicFrameKinds: [operationFrame.kind, ...(targetObjectClusterFrame ? [targetObjectClusterFrame.kind] : []), ...(Array.isArray(selectedMachineryFrame.ruleLogicFrameKinds) ? selectedMachineryFrame.ruleLogicFrameKinds : [])],
        typedFrameAuthority: true,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        rawNawatForwardPoolUsed: false
      };
      derivedFrame.canonicalSignature = signClassicalNahuatlVncDerivationValue(getClassicalNahuatlDerivedVncMachinerySignaturePayload(derivedFrame));
      return derivedFrame;
    }
    function buildClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame = null, operationFrame = null, options = {}) {
      return buildClassicalNahuatlDerivedVncMachineryFrameInternal(sourceMachineryFrame, operationFrame, options, 0, createClassicalNahuatlVncDerivationValidationContext());
    }
    function isCanonicalClassicalNahuatlDerivedVncMachineryFrame(frame = null, depth = 0, validationContext = null) {
      if (!frame || frame.kind !== "classical-nahuatl-vnc-derived-machinery-frame" || frame.version !== CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION || frame.authorizationStatus !== "authorized" || depth > CLASSICAL_NAHUATL_VNC_DERIVATION_MAX_VALIDATION_DEPTH || frame.typedFrameAuthority !== true || frame.formulaArtifactAuthority !== false || frame.surfaceArtifactAuthority !== false || frame.callerSuppliedAuthorityAccepted !== false || frame.rawNawatForwardPoolUsed !== false) {
        return false;
      }
      if (validationContext?.machineryFrames?.has(frame)) {
        return true;
      }
      const sourceDescriptor = getClassicalNahuatlVncDerivationSourceDescriptor(frame.sourceMachineryFrame, depth + 1, validationContext);
      const operationAuthorized = isClassicalNahuatlVncDerivationOperationFrameInternal(frame.derivationOperationFrame, depth + 1, validationContext);
      const targetTypedFrame = getClassicalNahuatlVncDerivationFinalTypedFrame(frame);
      if (sourceDescriptor.authorizationStatus !== "authorized" || !operationAuthorized || frame.sourceSignature !== sourceDescriptor.sourceSignature || frame.derivationOperationFrame.sourceSignature !== sourceDescriptor.sourceSignature || frame.targetStem !== frame.derivationOperationFrame.targetStem || frame.targetClass !== frame.derivationOperationFrame.targetClass || !isClassicalNahuatlVncDerivationTypedSlotFrame(targetTypedFrame) || targetTypedFrame.semanticIdentity !== frame.targetTypedVncSlotFrame?.semanticIdentity || !areClassicalNahuatlVncDerivationValuesEqual(frame.targetObjectRequests, frame.derivationOperationFrame.targetObjectRequests)) {
        return false;
      }
      const runtimeTarget = getClassicalNahuatlVncDerivationRuntimeTarget();
      if (frame.targetObjectRequests.length >= 2 && !(typeof runtimeTarget?.isClassicalNahuatlLesson23ObjectClusterFrame === "function" && runtimeTarget.isClassicalNahuatlLesson23ObjectClusterFrame(frame.targetObjectClusterFrame, frame.targetStem))) {
        return false;
      }
      const rebuiltOperation = deriveClassicalNahuatlVncDerivationOperationFrameInternal(frame.sourceMachineryFrame, {
        derivationType: frame.derivationOperationFrame.derivationType,
        optionId: frame.derivationOperationFrame.requestedOptionId,
        targetSubject: frame.derivationOperationFrame.targetSubject,
        causativeReferentRelation: frame.derivationOperationFrame.causativeReferentRelation,
        causativeObjectKind: frame.derivationOperationFrame.requestedCausativeObjectKind,
        causativeSpecificShuntlineRealization: frame.derivationOperationFrame.causativeSpecificShuntlineRealization,
        applicativeObjectKind: frame.derivationOperationFrame.applicativeObjectKind,
        applicativeObjectPerson: frame.derivationOperationFrame.applicativeObjectPerson
      }, depth + 1, validationContext);
      if (!isClassicalNahuatlVncDerivationOperationFrameInternal(rebuiltOperation, depth + 1, validationContext)) {
        return false;
      }
      if (!areClassicalNahuatlVncDerivationValuesEqual(getComparableClassicalNahuatlVncDerivationOperationFrame(frame.derivationOperationFrame), getComparableClassicalNahuatlVncDerivationOperationFrame(rebuiltOperation)) || !areClassicalNahuatlVncDerivationValuesEqual(frame.derivationOperationFrame.sourceMachineryFrame, frame.sourceMachineryFrame) || !areClassicalNahuatlVncDerivationValuesEqual(frame.participantTransformFrame, frame.derivationOperationFrame.participantTransformFrame)) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlDerivedVncMachineryFrameInternal(frame.sourceMachineryFrame, rebuiltOperation, {
        mood: sourceDescriptor.mood,
        tense: sourceDescriptor.tense,
        targetSubject: rebuiltOperation.targetSubject,
        sentenceOptions: getClassicalNahuatlDerivedVncCanonicalSentenceOptions(frame.sourceMachineryFrame)
      }, depth + 1, validationContext);
      if (rebuilt?.authorizationStatus !== "authorized") {
        return false;
      }
      const authoritativeProjectionMatches = areClassicalNahuatlVncDerivationValuesEqual(getClassicalNahuatlDerivedVncAuthoritativeProjection(frame), getClassicalNahuatlDerivedVncAuthoritativeProjection(rebuilt));
      const canonical = Boolean(authoritativeProjectionMatches && frame.canonicalSignature === rebuilt.canonicalSignature && frame.canonicalSignature === signClassicalNahuatlVncDerivationValue(getClassicalNahuatlDerivedVncMachinerySignaturePayload(frame)));
      if (canonical) {
        validationContext?.machineryFrames?.add(frame);
      }
      return canonical;
    }
    function isClassicalNahuatlDerivedVncMachineryFrame(frame = null) {
      return isCanonicalClassicalNahuatlDerivedVncMachineryFrame(frame, 0, createClassicalNahuatlVncDerivationValidationContext());
    }

    return {
      CLASSICAL_NAHUATL_VNC_DERIVATION_VERSION,
      CLASSICAL_NAHUATL_CANVAS_DERIVATION_CHOICE_KIND,
      CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES,
      getClassicalNahuatlKarttunen1992DerivationEvidenceInventory,
      getClassicalNahuatlKarttunen1992DerivationEvidenceMatches,
      isClassicalNahuatlCanvasDerivationChoiceFrame,
      isClassicalNahuatlVncDerivationSourceMachineryFrame,
      buildClassicalNahuatlVncDerivationSourceAnalysisFrame,
      isClassicalNahuatlVncDerivationSourceAnalysisFrame,
      getClassicalNahuatlVncDerivationOptionInventory,
      isClassicalNahuatlVncDerivationOptionInventory,
      deriveClassicalNahuatlVncDerivationOperationBatchFrame,
      isClassicalNahuatlVncDerivationOperationBatchFrame,
      deriveClassicalNahuatlVncDerivationOperationFrame,
      isClassicalNahuatlVncDerivationOperationFrame,
      buildClassicalNahuatlDerivedVncMachineryFrame,
      isClassicalNahuatlDerivedVncMachineryFrame
    };
}

export function installClassicalNahuatlVncDerivationEvaluatorGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlVncDerivationEvaluatorApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
