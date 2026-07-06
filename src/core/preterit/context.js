// Preterit/perfective universal context + candidate selection.
// Extracted from pret_universal_engine.js for maintainability.
function getPretUniversalCoreVowelCount(verb) {
    const lastLIndex = verb.lastIndexOf("l");
    if (lastLIndex >= 0 && lastLIndex < verb.length - 1) {
        return getTotalVowelCount(verb.slice(lastLIndex + 1));
    }
    return getTotalVowelCount(verb);
}

function getUniversalReplacementStem(verb, options = {}) {
    const baseSpec = typeof buildPretPerfectiveReplacementBaseSpec === "function"
        ? buildPretPerfectiveReplacementBaseSpec(verb, options)
        : null;
    return typeof realizePretBaseSpec === "function"
        ? realizePretBaseSpec(baseSpec, "")
        : "";
}

function getPerfectiveReplacementStem(verb, options = {}) {
    return getUniversalReplacementStem(verb, options);
}

const PRET_ROOT_PLUS_YA_SOURCE_FRAME_KIND = "preterit-root-plus-ya-source-frame";
const PRET_ROOT_PLUS_YA_SOURCE_SEGMENT_FRAME_KIND = "preterit-root-plus-ya-source-segment-frame";
const PRET_CLASS_A_DELETION_SOURCE_FRAME_KIND = "preterit-class-a-final-vowel-deletion-source-frame";
const PRET_CLASS_A_DELETION_SEGMENT_FRAME_KIND = "preterit-class-a-final-vowel-deletion-segment-frame";
const PRET_CLASS_A_YYA_SOURCE_FRAME_KIND = "preterit-class-a-yya-source-frame";
const PRET_CLASS_A_YYA_SEGMENT_FRAME_KIND = "preterit-class-a-yya-segment-frame";
const PRET_CLASS_A_ITA_SOURCE_FRAME_KIND = "preterit-class-a-ita-source-frame";
const PRET_CLASS_A_ITA_SEGMENT_FRAME_KIND = "preterit-class-a-ita-segment-frame";
const PRET_CLASS_A_SLASH_AKI_SOURCE_FRAME_KIND = "preterit-class-a-slash-aki-source-frame";
const PRET_CLASS_A_SLASH_AKI_SEGMENT_FRAME_KIND = "preterit-class-a-slash-aki-segment-frame";
const PRET_CLASS_A_SLASH_AKI_OPERATION_FRAME_KIND = "preterit-class-a-slash-aki-zero-operation-frame";
const PRET_CLASS_A_KWV_SOURCE_FRAME_KIND = "preterit-class-a-kwv-source-frame";
const PRET_CLASS_A_KWV_SEGMENT_FRAME_KIND = "preterit-class-a-kwv-segment-frame";
const PRET_CLASS_A_KWV_OPERATION_FRAME_KIND = "preterit-class-a-kwv-force-operation-frame";
const PRET_CLASS_A_KV_ALLOW_SOURCE_FRAME_KIND = "preterit-class-a-kv-allow-source-frame";
const PRET_CLASS_A_KV_ALLOW_SEGMENT_FRAME_KIND = "preterit-class-a-kv-allow-segment-frame";
const PRET_CLASS_A_KV_ALLOW_OPERATION_FRAME_KIND = "preterit-class-a-kv-allow-operation-frame";
const PRET_CLASS_A_CHI_ALLOW_SOURCE_FRAME_KIND = "preterit-class-a-chi-allow-source-frame";
const PRET_CLASS_A_CHI_ALLOW_SEGMENT_FRAME_KIND = "preterit-class-a-chi-allow-segment-frame";
const PRET_CLASS_A_CHI_ALLOW_OPERATION_FRAME_KIND = "preterit-class-a-chi-allow-operation-frame";
const PRET_CLASS_A_TA_REDUP_SOURCE_FRAME_KIND = "preterit-class-a-ta-redup-source-frame";
const PRET_CLASS_A_TA_REDUP_SEGMENT_FRAME_KIND = "preterit-class-a-ta-redup-segment-frame";
const PRET_CLASS_A_TA_REDUP_OPERATION_FRAME_KIND = "preterit-class-a-ta-redup-operation-frame";
const PRET_CLASS_A_PA_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-pa-transitive-source-frame";
const PRET_CLASS_A_PA_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-pa-transitive-segment-frame";
const PRET_CLASS_A_PA_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-pa-transitive-operation-frame";
const PRET_CLASS_A_PI_CV_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-pi-cv-transitive-source-frame";
const PRET_CLASS_A_PI_CV_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-pi-cv-transitive-segment-frame";
const PRET_CLASS_A_PI_CV_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-pi-cv-transitive-operation-frame";
const PRET_CLASS_A_CVWI_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-cvwi-transitive-source-frame";
const PRET_CLASS_A_CVWI_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-cvwi-transitive-segment-frame";
const PRET_CLASS_A_CVWI_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-cvwi-transitive-operation-frame";
const PRET_CLASS_A_CVCVWI_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-cvcvwi-transitive-source-frame";
const PRET_CLASS_A_CVCVWI_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-cvcvwi-transitive-segment-frame";
const PRET_CLASS_A_CVCVWI_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-cvcvwi-transitive-operation-frame";
const PRET_CLASS_A_CVWAI_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-cvwai-transitive-source-frame";
const PRET_CLASS_A_CVWAI_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-cvwai-transitive-segment-frame";
const PRET_CLASS_A_CVWAI_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-cvwai-transitive-operation-frame";
const PRET_CLASS_A_CVEWA_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-cvewa-transitive-source-frame";
const PRET_CLASS_A_CVEWA_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-cvewa-transitive-segment-frame";
const PRET_CLASS_A_CVEWA_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-cvewa-transitive-operation-frame";
const PRET_CLASS_A_CVAWA_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-cvawa-transitive-source-frame";
const PRET_CLASS_A_CVAWA_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-cvawa-transitive-segment-frame";
const PRET_CLASS_A_CVAWA_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-cvawa-transitive-operation-frame";
const PRET_CLASS_A_PA_CV_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-pa-cv-intransitive-source-frame";
const PRET_CLASS_A_PA_CV_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-pa-cv-intransitive-segment-frame";
const PRET_CLASS_A_PA_CV_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-pa-cv-intransitive-operation-frame";
const PRET_CLASS_A_NA_CV_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-na-cv-intransitive-source-frame";
const PRET_CLASS_A_NA_CV_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-na-cv-intransitive-segment-frame";
const PRET_CLASS_A_NA_CV_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-na-cv-intransitive-operation-frame";
const PRET_CLASS_B_VNA_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-b-vna-intransitive-source-frame";
const PRET_CLASS_B_VNA_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-b-vna-intransitive-segment-frame";
const PRET_CLASS_B_VNA_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-b-vna-intransitive-operation-frame";
const PRET_CLASS_A_M_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-m-transitive-source-frame";
const PRET_CLASS_A_M_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-m-transitive-segment-frame";
const PRET_CLASS_A_M_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-m-transitive-operation-frame";
const PRET_CLASS_A_PI_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-pi-intransitive-source-frame";
const PRET_CLASS_A_PI_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-pi-intransitive-segment-frame";
const PRET_CLASS_A_PI_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-pi-intransitive-operation-frame";
const PRET_CLASS_B_TA_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-b-ta-intransitive-source-frame";
const PRET_CLASS_B_TA_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-b-ta-intransitive-segment-frame";
const PRET_CLASS_B_TA_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-b-ta-intransitive-operation-frame";
const PRET_CLASS_B_TA_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-b-ta-transitive-source-frame";
const PRET_CLASS_B_TA_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-b-ta-transitive-segment-frame";
const PRET_CLASS_B_TA_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-b-ta-transitive-operation-frame";
const PRET_CLASS_B_KWI_CV_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-b-kwi-cv-intransitive-source-frame";
const PRET_CLASS_B_KWI_CV_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-b-kwi-cv-intransitive-segment-frame";
const PRET_CLASS_B_KWI_CV_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-b-kwi-cv-intransitive-operation-frame";
const PRET_CLASS_B_VCVCU_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-b-vcvcu-intransitive-source-frame";
const PRET_CLASS_B_VCVCU_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-b-vcvcu-intransitive-segment-frame";
const PRET_CLASS_B_VCVCU_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-b-vcvcu-intransitive-operation-frame";
const PRET_CLASS_B_VLCVWI_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-b-vlcvwi-intransitive-source-frame";
const PRET_CLASS_B_VLCVWI_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-b-vlcvwi-intransitive-segment-frame";
const PRET_CLASS_B_VLCVWI_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-b-vlcvwi-intransitive-operation-frame";
const PRET_CLASS_B_CVNIU_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-b-cvniu-intransitive-source-frame";
const PRET_CLASS_B_CVNIU_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-b-cvniu-intransitive-segment-frame";
const PRET_CLASS_B_CVNIU_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-b-cvniu-intransitive-operation-frame";
const PRET_CLASS_A_CVVNI_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-cvvni-intransitive-source-frame";
const PRET_CLASS_A_CVVNI_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-cvvni-intransitive-segment-frame";
const PRET_CLASS_A_CVVNI_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-cvvni-intransitive-operation-frame";
const PRET_CLASS_A_CVSV_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-cvsv-intransitive-source-frame";
const PRET_CLASS_A_CVSV_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-cvsv-intransitive-segment-frame";
const PRET_CLASS_A_CVSV_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-cvsv-intransitive-operation-frame";
const PRET_CLASS_A_CVWI_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-cvwi-intransitive-source-frame";
const PRET_CLASS_A_CVWI_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-cvwi-intransitive-segment-frame";
const PRET_CLASS_A_CVWI_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-cvwi-intransitive-operation-frame";
const PRET_CLASS_A_CVCVWI_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-cvcvwi-intransitive-source-frame";
const PRET_CLASS_A_CVCVWI_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-cvcvwi-intransitive-segment-frame";
const PRET_CLASS_A_CVCVWI_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-cvcvwi-intransitive-operation-frame";
const PRET_CLASS_B_VJWA_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-b-vjwa-intransitive-source-frame";
const PRET_CLASS_B_VJWA_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-b-vjwa-intransitive-segment-frame";
const PRET_CLASS_B_VJWA_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-b-vjwa-intransitive-operation-frame";
const PRET_CLASS_B_CUWA_INTRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-b-cuwa-intransitive-source-frame";
const PRET_CLASS_B_CUWA_INTRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-b-cuwa-intransitive-segment-frame";
const PRET_CLASS_B_CUWA_INTRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-b-cuwa-intransitive-operation-frame";
const PRET_CLASS_A_NI_CV_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-ni-cv-transitive-source-frame";
const PRET_CLASS_A_NI_CV_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-ni-cv-transitive-segment-frame";
const PRET_CLASS_A_NI_CV_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-ni-cv-transitive-operation-frame";
const PRET_CLASS_A_NA_CV_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-na-cv-transitive-source-frame";
const PRET_CLASS_A_NA_CV_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-na-cv-transitive-segment-frame";
const PRET_CLASS_A_NA_CV_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-na-cv-transitive-operation-frame";
const PRET_CLASS_A_NA_CVCVCV_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-na-cvcvcv-transitive-source-frame";
const PRET_CLASS_A_NA_CVCVCV_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-na-cvcvcv-transitive-segment-frame";
const PRET_CLASS_A_NA_CVCVCV_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-na-cvcvcv-transitive-operation-frame";
const PRET_CLASS_A_NA_CVLVCV_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-na-cvlvcv-transitive-source-frame";
const PRET_CLASS_A_NA_CVLVCV_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-na-cvlvcv-transitive-segment-frame";
const PRET_CLASS_A_NA_CVLVCV_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-na-cvlvcv-transitive-operation-frame";
const PRET_CLASS_A_NA_VLCVCV_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-na-vlcvcv-transitive-source-frame";
const PRET_CLASS_A_NA_VLCVCV_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-na-vlcvcv-transitive-segment-frame";
const PRET_CLASS_A_NA_VLCVCV_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-na-vlcvcv-transitive-operation-frame";
const PRET_CLASS_A_NA_VJCVCV_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-na-vjcvcv-transitive-source-frame";
const PRET_CLASS_A_NA_VJCVCV_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-na-vjcvcv-transitive-segment-frame";
const PRET_CLASS_A_NA_VJCVCV_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-na-vjcvcv-transitive-operation-frame";
const PRET_CLASS_A_TZA_TRANSITIVE_SOURCE_FRAME_KIND = "preterit-class-a-tza-transitive-source-frame";
const PRET_CLASS_A_TZA_TRANSITIVE_SEGMENT_FRAME_KIND = "preterit-class-a-tza-transitive-segment-frame";
const PRET_CLASS_A_TZA_TRANSITIVE_OPERATION_FRAME_KIND = "preterit-class-a-tza-transitive-operation-frame";
const PRET_CLASS_B_SOURCE_FRAME_KIND = "preterit-class-b-source-frame";
const PRET_CLASS_B_SEGMENT_FRAME_KIND = "preterit-class-b-segment-frame";
const PRET_CLASS_B_OPERATION_FRAME_KIND = "preterit-class-b-literal-base-operation-frame";
const PRET_CLASS_C_SOURCE_FRAME_KIND = "preterit-class-c-source-frame";
const PRET_CLASS_C_SEGMENT_FRAME_KIND = "preterit-class-c-segment-frame";
const PRET_CLASS_D_SOURCE_FRAME_KIND = "preterit-class-d-source-frame";
const PRET_CLASS_D_SEGMENT_FRAME_KIND = "preterit-class-d-segment-frame";

function normalizePretRootPlusYaFrameText(value = "") {
    return typeof normalizeRuleBase === "function"
        ? normalizeRuleBase(String(value || "").trim().toLowerCase())
        : String(value || "").trim().toLowerCase();
}

function buildPretRootPlusYaSourceSegmentFrame(role = "", value = "") {
    const text = normalizePretRootPlusYaFrameText(value);
    if (!text && role !== "root-plus-ya-suffix") {
        return null;
    }
    return Object.freeze({
        kind: PRET_ROOT_PLUS_YA_SOURCE_SEGMENT_FRAME_KIND,
        role,
        text,
    });
}

function buildPretRootPlusYaSourceFrame({
    rootBase = "",
    sourceVerb = "",
    sourceKind = "",
    isWeya = false,
    matrixStem = "",
} = {}) {
    const normalizedRoot = normalizePretRootPlusYaFrameText(rootBase);
    if (!normalizedRoot) {
        return null;
    }
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const surfaceVerb = normalizedSourceVerb || `${normalizedRoot}ya`;
    return Object.freeze({
        kind: PRET_ROOT_PLUS_YA_SOURCE_FRAME_KIND,
        route: "preterit-class-a-root-plus-ya",
        sourceKind: String(sourceKind || "root-plus-ya-source"),
        rootFrame: buildPretRootPlusYaSourceSegmentFrame("root-base", normalizedRoot),
        suffixFrame: buildPretRootPlusYaSourceSegmentFrame("root-plus-ya-suffix", "ya"),
        sourceVerbFrame: buildPretRootPlusYaSourceSegmentFrame("source-verb", surfaceVerb),
        matrixStem: normalizePretRootPlusYaFrameText(matrixStem),
        isWeya: isWeya === true,
    });
}

function buildPretClassAFinalVowelDeletionSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_DELETION_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function buildPretClassAFinalVowelDeletionSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const finalSyllable = sourceSyllables[sourceSyllables.length - 1] || null;
    const finalVowel = normalizePretRootPlusYaFrameText(finalSyllable?.nucleus || "");
    if (!normalizedSourceVerb || !finalSyllable || !finalVowel) {
        return null;
    }
    const deletedBase = [
        ...sourceSyllables.slice(0, -1).map((syllable) => normalizePretRootPlusYaFrameText(syllable?.text || "")),
        normalizePretRootPlusYaFrameText(finalSyllable?.onset || ""),
    ].join("");
    const finalBaseSegment = normalizePretRootPlusYaFrameText(finalSyllable?.onset || "");
    return Object.freeze({
        kind: PRET_CLASS_A_DELETION_SOURCE_FRAME_KIND,
        route: "preterit-class-a-final-vowel-deletion",
        sourceVerbFrame: buildPretClassAFinalVowelDeletionSegmentFrame("source-verb", normalizedSourceVerb),
        deletedBaseFrame: buildPretClassAFinalVowelDeletionSegmentFrame("deleted-base", deletedBase),
        finalVowelFrame: buildPretClassAFinalVowelDeletionSegmentFrame("deleted-final-vowel", finalVowel),
        finalBaseSegmentFrame: buildPretClassAFinalVowelDeletionSegmentFrame("deleted-base-final-segment", finalBaseSegment),
        rightEdgeDescriptorFrame: Object.freeze({
            ...(rightEdgeDescriptor && typeof rightEdgeDescriptor === "object" ? rightEdgeDescriptor : {}),
        }),
    });
}

function buildPretClassAYyaSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_YYA_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function buildPretClassAYyaSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const finalSyllable = sourceSyllables[sourceSyllables.length - 1] || null;
    const hasYyaEdge = edge.finalOnset === "y"
        && edge.finalNucleus === "a"
        && edge.previousForm === "C"
        && edge.previousOnset === "y";
    if (!normalizedSourceVerb || !finalSyllable || !hasYyaEdge) {
        return null;
    }
    const suffix = normalizePretRootPlusYaFrameText(finalSyllable.text || "");
    const retainedBase = sourceSyllables
        .slice(0, -1)
        .map((syllable) => normalizePretRootPlusYaFrameText(syllable?.text || ""))
        .join("");
    if (!retainedBase || !suffix) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_YYA_SOURCE_FRAME_KIND,
        route: "preterit-class-a-yya",
        sourceVerbFrame: buildPretClassAYyaSegmentFrame("source-verb", normalizedSourceVerb),
        retainedBaseFrame: buildPretClassAYyaSegmentFrame("retained-base", retainedBase),
        suffixFrame: buildPretClassAYyaSegmentFrame("deleted-yya-suffix", suffix),
        previousYFrame: buildPretClassAYyaSegmentFrame("previous-y", edge.previousOnset || ""),
        finalOnsetFrame: buildPretClassAYyaSegmentFrame("final-onset", edge.finalOnset || ""),
        finalNucleusFrame: buildPretClassAYyaSegmentFrame("final-nucleus", edge.finalNucleus || ""),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
    });
}

function buildPretClassAItaSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_ITA_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function buildPretClassAItaSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const penultimate = sourceSyllables[sourceSyllables.length - 2] || null;
    const finalSyllable = sourceSyllables[sourceSyllables.length - 1] || null;
    const hasItaShape = sourceSyllables.length === 2
        && penultimate?.form === "V"
        && penultimate?.nucleus === "i"
        && finalSyllable?.form === "CV"
        && finalSyllable?.onset === "t"
        && finalSyllable?.nucleus === "a";
    if (!normalizedSourceVerb || !hasItaShape) {
        return null;
    }
    const retainedBase = normalizePretRootPlusYaFrameText(penultimate?.text || "");
    const suffix = normalizePretRootPlusYaFrameText(finalSyllable?.text || "");
    if (!retainedBase || suffix !== "ta") {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_ITA_SOURCE_FRAME_KIND,
        route: "preterit-class-a-ita",
        sourceVerbFrame: buildPretClassAItaSegmentFrame("source-verb", normalizedSourceVerb),
        retainedBaseFrame: buildPretClassAItaSegmentFrame("retained-base", retainedBase),
        sourceSuffixFrame: buildPretClassAItaSegmentFrame("source-suffix", suffix),
        replacementFrame: buildPretClassAItaSegmentFrame("replacement", "tz"),
        firstNucleusFrame: buildPretClassAItaSegmentFrame("first-nucleus", penultimate.nucleus),
        finalOnsetFrame: buildPretClassAItaSegmentFrame("final-onset", edge.finalOnset || ""),
        finalNucleusFrame: buildPretClassAItaSegmentFrame("final-nucleus", edge.finalNucleus || ""),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
    });
}

function buildPretClassASlashAkiSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_SLASH_AKI_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassASlashAkiSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_SLASH_AKI_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.initialVowelFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.slashBoundaryFrame?.text || "",
        sourceFrame.targetSuffixFrame?.text || "",
    ].join("|");
}

function buildPretClassASlashAkiSourceFrame({
    sourceVerb = "",
    hasSlashMarker = false,
    syllables = null,
    rightEdgeDescriptor = null,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const first = sourceSyllables[0] || null;
    const final = sourceSyllables[sourceSyllables.length - 1] || null;
    const hasAkiShape = sourceSyllables.length === 2
        && first?.form === "V"
        && first?.nucleus === "a"
        && final?.form === "CV"
        && final?.onset === "k"
        && final?.nucleus === "i"
        && edge.finalOnset === "k"
        && edge.finalNucleus === "i";
    if (!normalizedSourceVerb || hasSlashMarker !== true || !hasAkiShape) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_SLASH_AKI_SOURCE_FRAME_KIND,
        route: "preterit-class-a-slash-aki-zero",
        sourceVerbFrame: buildPretClassASlashAkiSegmentFrame("source-verb", normalizedSourceVerb),
        initialVowelFrame: buildPretClassASlashAkiSegmentFrame("initial-vowel", first.nucleus),
        finalOnsetFrame: buildPretClassASlashAkiSegmentFrame("final-onset", final.onset),
        finalNucleusFrame: buildPretClassASlashAkiSegmentFrame("final-nucleus", final.nucleus),
        slashBoundaryFrame: buildPretClassASlashAkiSegmentFrame("slash-boundary", "present"),
        targetSuffixFrame: buildPretClassASlashAkiSegmentFrame("target-suffix", "zero"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassASlashAkiSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassASlashAkiOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_SLASH_AKI_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassASlashAkiSourceSignature(sourceFrame);
    return Object.freeze({
        kind: PRET_CLASS_A_SLASH_AKI_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-slash-aki-zero-suffix-policy",
        routeFamily: "preterit-class-a",
        routeStage: "choose-class-a-suffix-policy",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-slash-aki-zero-target-frame",
            allowZeroSuffix: true,
            allowKiSuffix: false,
            targetSuffix: "",
        }),
        targetSignature: `${sourceSignature}|zero-only`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassASlashAkiFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_SLASH_AKI_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassASlashAkiSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_SLASH_AKI_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-slash-aki-zero-suffix-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "choose-class-a-suffix-policy"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-slash-aki-zero-target-frame"
        || operationFrame.targetFrame.allowZeroSuffix !== true
        || operationFrame.targetFrame.allowKiSuffix !== false
        || operationFrame.targetSignature !== `${sourceSignature}|zero-only`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassAKwvSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_KWV_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassAKwvSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_KWV_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.finalFormFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.rootPlusYaFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.overrideFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassAKwvSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isRootPlusYa = false,
    isMonosyllable = false,
    allowKWVClassB = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const finalForm = normalizePretRootPlusYaFrameText(edge.finalForm || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || finalForm !== "cv"
        || finalOnset !== "kw"
        || !finalNucleus
        || finalNucleus === "u"
        || isRootPlusYa === true
        || isMonosyllable === true
        || allowKWVClassB === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_KWV_SOURCE_FRAME_KIND,
        route: "preterit-class-a-kwv-force",
        sourceVerbFrame: buildPretClassAKwvSegmentFrame("source-verb", normalizedSourceVerb),
        finalFormFrame: buildPretClassAKwvSegmentFrame("right-edge-final-form", finalForm),
        finalOnsetFrame: buildPretClassAKwvSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassAKwvSegmentFrame("right-edge-final-nucleus", finalNucleus),
        rootPlusYaFrame: buildPretClassAKwvSegmentFrame("root-plus-ya", "absent"),
        monosyllableFrame: buildPretClassAKwvSegmentFrame("monosyllable", "absent"),
        overrideFrame: buildPretClassAKwvSegmentFrame("allow-kwv-class-b", "absent"),
        targetPolicyFrame: buildPretClassAKwvSegmentFrame("target-policy", "force-class-a"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassAKwvSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassAKwvOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_KWV_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassAKwvSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_KWV_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-kwv-force-policy",
        routeFamily: "preterit-class-a",
        routeStage: "choose-class-a-over-class-b-policy",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-kwv-force-target-frame",
            forceClassA: true,
            allowIntransitiveKV: true,
            maskClassBSelection: true,
            skipClassB: true,
            fallbackToClassA: true,
        }),
        targetSignature: `${sourceSignature}|force-class-a`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassAKwvFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_KWV_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassAKwvSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_KWV_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-kwv-force-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "choose-class-a-over-class-b-policy"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-kwv-force-target-frame"
        || operationFrame.targetFrame.forceClassA !== true
        || operationFrame.targetFrame.allowIntransitiveKV !== true
        || operationFrame.targetFrame.maskClassBSelection !== true
        || operationFrame.targetFrame.skipClassB !== true
        || operationFrame.targetFrame.fallbackToClassA !== true
        || operationFrame.targetSignature !== `${sourceSignature}|force-class-a`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassAKvAllowSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_KV_ALLOW_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassAKvAllowSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_KV_ALLOW_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.finalFormFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.slashBoundaryFrame?.text || "",
        sourceFrame.rootPlusYaFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassAKvAllowSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    hasSlashMarker = false,
    isRootPlusYa = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const finalForm = normalizePretRootPlusYaFrameText(edge.finalForm || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || finalForm !== "cv"
        || finalOnset !== "k"
        || !finalNucleus
        || finalNucleus === "u"
        || hasSlashMarker === true
        || isRootPlusYa === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_KV_ALLOW_SOURCE_FRAME_KIND,
        route: "preterit-class-a-kv-allow",
        sourceVerbFrame: buildPretClassAKvAllowSegmentFrame("source-verb", normalizedSourceVerb),
        finalFormFrame: buildPretClassAKvAllowSegmentFrame("right-edge-final-form", finalForm),
        finalOnsetFrame: buildPretClassAKvAllowSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassAKvAllowSegmentFrame("right-edge-final-nucleus", finalNucleus),
        slashBoundaryFrame: buildPretClassAKvAllowSegmentFrame("slash-boundary", "absent"),
        rootPlusYaFrame: buildPretClassAKvAllowSegmentFrame("root-plus-ya", "absent"),
        targetPolicyFrame: buildPretClassAKvAllowSegmentFrame("target-policy", "allow-class-a"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassAKvAllowSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassAKvAllowOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_KV_ALLOW_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassAKvAllowSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_KV_ALLOW_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-kv-allow-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-kv-non-u",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-kv-allow-target-frame",
            allowClassA: true,
            allowIntransitiveKV: true,
            forceClassA: false,
        }),
        targetSignature: `${sourceSignature}|allow-class-a`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassAKvAllowFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_KV_ALLOW_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassAKvAllowSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_KV_ALLOW_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-kv-allow-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-kv-non-u"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-kv-allow-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowIntransitiveKV !== true
        || operationFrame.targetFrame.forceClassA !== false
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassAChiAllowSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_CHI_ALLOW_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassAChiAllowSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CHI_ALLOW_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassAChiAllowSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "ch+i"
        || finalOnset !== "ch"
        || finalNucleus !== "i"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_CHI_ALLOW_SOURCE_FRAME_KIND,
        route: "preterit-class-a-chi-allow",
        sourceVerbFrame: buildPretClassAChiAllowSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassAChiAllowSegmentFrame("right-edge-ending-family", endingFamily),
        finalOnsetFrame: buildPretClassAChiAllowSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassAChiAllowSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassAChiAllowSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassAChiAllowSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassAChiAllowSegmentFrame("target-policy", "allow-class-a-and-b"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassAChiAllowSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassAChiAllowOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CHI_ALLOW_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassAChiAllowSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_CHI_ALLOW_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-chi-allow-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-chi-ending",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-chi-allow-target-frame",
            allowClassA: true,
            allowClassB: true,
            allowVtVStartClassA: true,
            forceClassA: false,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-and-b`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassAChiAllowFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CHI_ALLOW_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassAChiAllowSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_CHI_ALLOW_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-chi-allow-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-chi-ending"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-chi-allow-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.allowVtVStartClassA !== true
        || operationFrame.targetFrame.forceClassA !== false
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-and-b`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassATaRedupSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_TA_REDUP_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassATaRedupSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_TA_REDUP_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.analysisBaseFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.reduplicationFrame?.text || "",
        sourceFrame.itaShapeFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassATaRedupSourceFrame({
    sourceVerb = "",
    analysisBase = "",
    rightEdgeDescriptor = null,
    isTransitive = false,
    isReduplicatedCVCV = false,
    isItaVerb = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const normalizedAnalysisBase = normalizePretRootPlusYaFrameText(analysisBase || normalizedSourceVerb);
    const sourceSyllables = normalizedAnalysisBase && typeof getSyllables === "function"
        ? getSyllables(normalizedAnalysisBase, { analysis: true, assumeFinalV: true })
        : [];
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || !normalizedAnalysisBase
        || endingFamily !== "t+a"
        || finalOnset !== "t"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isReduplicatedCVCV !== true
        || isItaVerb === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_TA_REDUP_SOURCE_FRAME_KIND,
        route: "preterit-class-a-ta-redup",
        sourceVerbFrame: buildPretClassATaRedupSegmentFrame("source-verb", normalizedSourceVerb),
        analysisBaseFrame: buildPretClassATaRedupSegmentFrame("analysis-base", normalizedAnalysisBase),
        endingFamilyFrame: buildPretClassATaRedupSegmentFrame("right-edge-ending-family", endingFamily),
        finalOnsetFrame: buildPretClassATaRedupSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassATaRedupSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassATaRedupSegmentFrame("transitivity", "transitive"),
        reduplicationFrame: buildPretClassATaRedupSegmentFrame("reduplication", "cvcv"),
        itaShapeFrame: buildPretClassATaRedupSegmentFrame("ita-shape", "absent"),
        targetPolicyFrame: buildPretClassATaRedupSegmentFrame("target-policy", "allow-class-a-and-b-ki-only"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassATaRedupSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassATaRedupOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_TA_REDUP_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassATaRedupSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_TA_REDUP_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-ta-redup-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-ta-redup",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-ta-redup-target-frame",
            allowClassA: true,
            allowClassB: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-and-b-ki-only`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassATaRedupFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_TA_REDUP_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassATaRedupSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_TA_REDUP_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-ta-redup-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-ta-redup"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-ta-redup-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-and-b-ki-only`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassAPaTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_PA_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassAPaTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassAPaTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "p+a"
        || finalOnset !== "p"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_PA_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-pa-transitive",
        sourceVerbFrame: buildPretClassAPaTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassAPaTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        finalOnsetFrame: buildPretClassAPaTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassAPaTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassAPaTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassAPaTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassAPaTransitiveSegmentFrame("target-policy", "allow-class-a-ki-only"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassAPaTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassAPaTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassAPaTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_PA_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-pa-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-pa-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-pa-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-only`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassAPaTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassAPaTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_PA_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-pa-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-pa-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-pa-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-only`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassAPiCvTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_PI_CV_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassAPiCvTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PI_CV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassAPiCvTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "p+i"
        || rightEdgeProfile !== "CV|CV"
        || finalOnset !== "p"
        || finalNucleus !== "i"
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_PI_CV_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-pi-cv-transitive",
        sourceVerbFrame: buildPretClassAPiCvTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassAPiCvTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassAPiCvTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassAPiCvTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassAPiCvTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassAPiCvTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassAPiCvTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassAPiCvTransitiveSegmentFrame("target-policy", "allow-class-a-ki-only"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassAPiCvTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassAPiCvTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PI_CV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassAPiCvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_PI_CV_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-pi-cv-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-pi-cv-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-pi-cv-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-only`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassAPiCvTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PI_CV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassAPiCvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_PI_CV_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-pi-cv-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-pi-cv-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-pi-cv-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-only`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassACvwiTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_CVWI_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassACvwiTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVWI_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.reduplicationFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassACvwiTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
    isReduplicated = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "w+i"
        || rightEdgeProfile !== "CV|CV"
        || finalOnset !== "w"
        || finalNucleus !== "i"
        || isTransitive !== true
        || isMonosyllable === true
        || isReduplicated === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_CVWI_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-cvwi-transitive",
        sourceVerbFrame: buildPretClassACvwiTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassACvwiTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassACvwiTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassACvwiTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassACvwiTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassACvwiTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassACvwiTransitiveSegmentFrame("monosyllable", "absent"),
        reduplicationFrame: buildPretClassACvwiTransitiveSegmentFrame("reduplication", "absent"),
        targetPolicyFrame: buildPretClassACvwiTransitiveSegmentFrame("target-policy", "allow-class-a-ki-and-class-b-k"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassACvwiTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassACvwiTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVWI_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassACvwiTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_CVWI_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-cvwi-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-b-cvwi-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-cvwi-transitive-target-frame",
            allowClassA: true,
            allowClassB: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
            classBTargetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-and-class-b-k`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassACvwiTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVWI_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassACvwiTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_CVWI_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-cvwi-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-b-cvwi-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-cvwi-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetFrame.classBTargetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-and-class-b-k`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassACvcvwiTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_CVCVWI_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassACvcvwiTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVCVWI_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.reduplicationFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassACvcvwiTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
    isReduplicated = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "w+i"
        || rightEdgeProfile !== "CV|CV|CV"
        || finalOnset !== "w"
        || finalNucleus !== "i"
        || isTransitive !== true
        || isMonosyllable === true
        || isReduplicated === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_CVCVWI_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-cvcvwi-transitive",
        sourceVerbFrame: buildPretClassACvcvwiTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassACvcvwiTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassACvcvwiTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassACvcvwiTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassACvcvwiTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassACvcvwiTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassACvcvwiTransitiveSegmentFrame("monosyllable", "absent"),
        reduplicationFrame: buildPretClassACvcvwiTransitiveSegmentFrame("reduplication", "absent"),
        targetPolicyFrame: buildPretClassACvcvwiTransitiveSegmentFrame("target-policy", "allow-class-a-zero-and-class-b-k"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassACvcvwiTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassACvcvwiTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVCVWI_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassACvcvwiTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_CVCVWI_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-cvcvwi-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-b-cvcvwi-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-cvcvwi-transitive-target-frame",
            allowClassA: true,
            allowClassB: true,
            allowZeroSuffix: true,
            allowKiSuffix: false,
            classBTargetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-a-zero-and-class-b-k`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassACvcvwiTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVCVWI_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassACvcvwiTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_CVCVWI_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-cvcvwi-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-b-cvcvwi-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-cvcvwi-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.allowZeroSuffix !== true
        || operationFrame.targetFrame.allowKiSuffix !== false
        || operationFrame.targetFrame.classBTargetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-zero-and-class-b-k`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassACvwaiTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_CVWAI_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassACvwaiTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVWAI_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.previousNucleusFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassACvwaiTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const previousNucleus = normalizePretRootPlusYaFrameText(edge.previousNucleus || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "w+a"
        || rightEdgeProfile !== "CV|CV"
        || previousNucleus !== "i"
        || finalOnset !== "w"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_CVWAI_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-cvwai-transitive",
        sourceVerbFrame: buildPretClassACvwaiTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassACvwaiTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassACvwaiTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        previousNucleusFrame: buildPretClassACvwaiTransitiveSegmentFrame("right-edge-previous-nucleus", previousNucleus),
        finalOnsetFrame: buildPretClassACvwaiTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassACvwaiTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassACvwaiTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassACvwaiTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassACvwaiTransitiveSegmentFrame("target-policy", "allow-class-a-zero-and-ki"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassACvwaiTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassACvwaiTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVWAI_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassACvwaiTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_CVWAI_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-cvwai-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-cvwai-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-cvwai-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: true,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-zero-and-ki`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassACvwaiTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVWAI_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassACvwaiTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_CVWAI_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-cvwai-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-cvwai-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-cvwai-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== true
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-zero-and-ki`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassACvewaTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_CVEWA_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassACvewaTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVEWA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.previousNucleusFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassACvewaTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const previousNucleus = normalizePretRootPlusYaFrameText(edge.previousNucleus || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "w+a"
        || rightEdgeProfile !== "CV|CV"
        || previousNucleus !== "e"
        || finalOnset !== "w"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_CVEWA_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-cvewa-transitive",
        sourceVerbFrame: buildPretClassACvewaTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassACvewaTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassACvewaTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        previousNucleusFrame: buildPretClassACvewaTransitiveSegmentFrame("right-edge-previous-nucleus", previousNucleus),
        finalOnsetFrame: buildPretClassACvewaTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassACvewaTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassACvewaTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassACvewaTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassACvewaTransitiveSegmentFrame("target-policy", "allow-class-a-ki"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassACvewaTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassACvewaTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVEWA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassACvewaTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_CVEWA_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-cvewa-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-cvewa-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-cvewa-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassACvewaTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVEWA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassACvewaTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_CVEWA_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-cvewa-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-cvewa-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-cvewa-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassACvwaTransitiveFamilySegmentFrame(segmentKind = "", role = "", value = "") {
    return Object.freeze({
        kind: segmentKind,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassACvwaTransitiveFamilySourceSignature(sourceFrame = null, {
    sourceFrameKind = "",
    includeReduplication = false,
    includeSlash = false,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== sourceFrameKind) {
        return "";
    }
    const parts = [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.previousNucleusFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
    ];
    if (includeReduplication) {
        parts.push(sourceFrame.reduplicationFrame?.text || "");
    }
    if (includeSlash) {
        parts.push(sourceFrame.slashFrame?.text || "");
    }
    parts.push(sourceFrame.targetPolicyFrame?.text || "");
    return parts.join("|");
}

function buildPretClassACvwaTransitiveFamilySourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
    isReduplicated = false,
    hasSlashMarker = false,
    expectedPreviousNucleus = "",
    sourceFrameKind = "",
    segmentFrameKind = "",
    route = "",
    targetPolicy = "",
    includeReduplication = false,
    includeSlash = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const previousNucleus = normalizePretRootPlusYaFrameText(edge.previousNucleus || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || !sourceFrameKind
        || !segmentFrameKind
        || !route
        || !targetPolicy
        || endingFamily !== "w+a"
        || rightEdgeProfile !== "CV|CV"
        || previousNucleus !== expectedPreviousNucleus
        || finalOnset !== "w"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isMonosyllable === true
        || (includeReduplication && isReduplicated === true)
        || (includeSlash && hasSlashMarker === true)
    ) {
        return null;
    }
    const segment = (role, value) => buildPretClassACvwaTransitiveFamilySegmentFrame(segmentFrameKind, role, value);
    const sourceFrame = {
        kind: sourceFrameKind,
        route,
        sourceVerbFrame: segment("source-verb", normalizedSourceVerb),
        endingFamilyFrame: segment("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: segment("right-edge-profile", rightEdgeProfile),
        previousNucleusFrame: segment("right-edge-previous-nucleus", previousNucleus),
        finalOnsetFrame: segment("right-edge-final-onset", finalOnset),
        finalNucleusFrame: segment("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: segment("transitivity", "transitive"),
        monosyllableFrame: segment("monosyllable", "absent"),
        targetPolicyFrame: segment("target-policy", targetPolicy),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    if (includeReduplication) {
        sourceFrame.reduplicationFrame = segment("reduplication", "absent");
    }
    if (includeSlash) {
        sourceFrame.slashFrame = segment("slash-marker", "absent");
    }
    sourceFrame.sourceSignature = getPretClassACvwaTransitiveFamilySourceSignature(sourceFrame, {
        sourceFrameKind,
        includeReduplication,
        includeSlash,
    });
    return Object.freeze(sourceFrame);
}

function buildPretClassACvwaTransitiveFamilyOperationFrame(sourceFrame = null, {
    sourceFrameKind = "",
    operationFrameKind = "",
    operationId = "",
    routeStage = "",
    targetFrameKind = "",
    allowZeroSuffix = false,
    allowKiSuffix = true,
    allowJBaseVariant = true,
    targetSignatureSuffix = "",
    includeReduplication = false,
    includeSlash = false,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== sourceFrameKind) {
        return null;
    }
    const sourceSignature = getPretClassACvwaTransitiveFamilySourceSignature(sourceFrame, {
        sourceFrameKind,
        includeReduplication,
        includeSlash,
    });
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: operationFrameKind,
        operationId,
        routeFamily: "preterit-class-a-cvwa-transitive",
        routeStage,
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: targetFrameKind,
            allowClassA: true,
            allowZeroSuffix: allowZeroSuffix === true,
            allowKiSuffix: allowKiSuffix === true,
            allowJBaseVariant: allowJBaseVariant === true,
        }),
        targetSignature: `${sourceSignature}|${targetSignatureSuffix}`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassACvwaTransitiveFamilyFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
    sourceFrameKind = "",
    operationFrameKind = "",
    operationId = "",
    routeStage = "",
    targetFrameKind = "",
    allowZeroSuffix = false,
    allowKiSuffix = true,
    allowJBaseVariant = true,
    targetSignatureSuffix = "",
    includeReduplication = false,
    includeSlash = false,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== sourceFrameKind) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassACvwaTransitiveFamilySourceSignature(sourceFrame, {
        sourceFrameKind,
        includeReduplication,
        includeSlash,
    });
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== operationFrameKind
        || operationFrame.operationId !== operationId
        || operationFrame.routeFamily !== "preterit-class-a-cvwa-transitive"
        || operationFrame.routeStage !== routeStage
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== targetFrameKind
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== (allowZeroSuffix === true)
        || operationFrame.targetFrame.allowKiSuffix !== (allowKiSuffix === true)
        || operationFrame.targetFrame.allowJBaseVariant !== (allowJBaseVariant === true)
        || operationFrame.targetSignature !== `${sourceSignature}|${targetSignatureSuffix}`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassACvawaTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_CVAWA_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassACvawaTransitiveSourceSignature(sourceFrame = null) {
    return getPretClassACvwaTransitiveFamilySourceSignature(sourceFrame, {
        sourceFrameKind: PRET_CLASS_A_CVAWA_TRANSITIVE_SOURCE_FRAME_KIND,
        includeReduplication: true,
        includeSlash: true,
    });
}

function buildPretClassACvawaTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
    isReduplicated = false,
    hasSlashMarker = false,
} = {}) {
    return buildPretClassACvwaTransitiveFamilySourceFrame({
        sourceVerb,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
        isReduplicated,
        hasSlashMarker,
        expectedPreviousNucleus: "a",
        sourceFrameKind: PRET_CLASS_A_CVAWA_TRANSITIVE_SOURCE_FRAME_KIND,
        segmentFrameKind: PRET_CLASS_A_CVAWA_TRANSITIVE_SEGMENT_FRAME_KIND,
        route: "preterit-class-a-cvawa-transitive",
        targetPolicy: "allow-class-a-ki",
        includeReduplication: true,
        includeSlash: true,
    });
}

function buildPretClassACvawaTransitiveOperationFrame(sourceFrame = null) {
    return buildPretClassACvwaTransitiveFamilyOperationFrame(sourceFrame, {
        sourceFrameKind: PRET_CLASS_A_CVAWA_TRANSITIVE_SOURCE_FRAME_KIND,
        operationFrameKind: PRET_CLASS_A_CVAWA_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-cvawa-transitive-policy",
        routeStage: "allow-class-a-cvawa-transitive",
        targetFrameKind: "preterit-class-a-cvawa-transitive-target-frame",
        allowZeroSuffix: false,
        allowKiSuffix: true,
        allowJBaseVariant: false,
        targetSignatureSuffix: "allow-class-a-ki",
        includeReduplication: true,
        includeSlash: true,
    });
}

function getPretClassACvawaTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    return getPretClassACvwaTransitiveFamilyFrameMismatch({
        sourceFrame,
        operationFrame,
        sourceFrameKind: PRET_CLASS_A_CVAWA_TRANSITIVE_SOURCE_FRAME_KIND,
        operationFrameKind: PRET_CLASS_A_CVAWA_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-cvawa-transitive-policy",
        routeStage: "allow-class-a-cvawa-transitive",
        targetFrameKind: "preterit-class-a-cvawa-transitive-target-frame",
        allowZeroSuffix: false,
        allowKiSuffix: true,
        allowJBaseVariant: false,
        targetSignatureSuffix: "allow-class-a-ki",
        includeReduplication: true,
        includeSlash: true,
    });
}

function buildPretClassAPaCvIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_PA_CV_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassAPaCvIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PA_CV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassAPaCvIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "p+a"
        || rightEdgeProfile !== "CV|CV"
        || finalOnset !== "p"
        || finalNucleus !== "a"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_PA_CV_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-pa-cv-intransitive",
        sourceVerbFrame: buildPretClassAPaCvIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassAPaCvIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassAPaCvIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassAPaCvIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassAPaCvIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassAPaCvIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassAPaCvIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassAPaCvIntransitiveSegmentFrame("target-policy", "allow-class-a-ki-and-class-b-k"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassAPaCvIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassAPaCvIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PA_CV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassAPaCvIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_PA_CV_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-pa-cv-intransitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-pa-cv-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-pa-cv-intransitive-target-frame",
            allowClassA: true,
            allowClassB: true,
            allowClassAZeroSuffix: false,
            allowClassAKiSuffix: true,
            allowClassBKSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-and-class-b-k`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassAPaCvIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PA_CV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassAPaCvIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_PA_CV_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-pa-cv-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-pa-cv-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-pa-cv-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.allowClassAZeroSuffix !== false
        || operationFrame.targetFrame.allowClassAKiSuffix !== true
        || operationFrame.targetFrame.allowClassBKSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-and-class-b-k`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassANaCvIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_NA_CV_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassANaCvIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassANaCvIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "n+a"
        || rightEdgeProfile !== "CV|CV"
        || finalOnset !== "n"
        || finalNucleus !== "a"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_NA_CV_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-na-cv-intransitive",
        sourceVerbFrame: buildPretClassANaCvIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassANaCvIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassANaCvIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassANaCvIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassANaCvIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassANaCvIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassANaCvIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassANaCvIntransitiveSegmentFrame("target-policy", "allow-class-a-ki-and-class-b-k"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassANaCvIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassANaCvIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassANaCvIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_NA_CV_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-na-cv-intransitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-na-cv-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-na-cv-intransitive-target-frame",
            allowClassA: true,
            allowClassB: true,
            allowClassAZeroSuffix: false,
            allowClassAKiSuffix: true,
            allowClassBKSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-and-class-b-k`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassANaCvIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassANaCvIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_NA_CV_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-na-cv-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-na-cv-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-na-cv-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.allowClassAZeroSuffix !== false
        || operationFrame.targetFrame.allowClassAKiSuffix !== true
        || operationFrame.targetFrame.allowClassBKSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-and-class-b-k`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassBVnaIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_B_VNA_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassBVnaIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VNA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassBVnaIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "n+a"
        || rightEdgeProfile !== "V|CV"
        || finalOnset !== "n"
        || finalNucleus !== "a"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_B_VNA_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-b-vna-intransitive",
        sourceVerbFrame: buildPretClassBVnaIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassBVnaIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassBVnaIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassBVnaIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassBVnaIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassBVnaIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassBVnaIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassBVnaIntransitiveSegmentFrame("target-policy", "allow-class-b-k-suffix"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassBVnaIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassBVnaIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VNA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassBVnaIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_B_VNA_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-b-vna-intransitive-policy",
        routeFamily: "preterit-class-b",
        routeStage: "allow-class-b-vna-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-b-vna-intransitive-target-frame",
            allowClassB: true,
            targetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-b-k-suffix`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassBVnaIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VNA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassBVnaIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_B_VNA_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-b-vna-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-b"
        || operationFrame.routeStage !== "allow-class-b-vna-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-b-vna-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.targetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-b-k-suffix`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassAMTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_M_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassAMTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_M_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassAMTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || !["m+a", "m+i"].includes(endingFamily)
        || finalOnset !== "m"
        || !["a", "i"].includes(finalNucleus)
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_M_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-m-transitive",
        sourceVerbFrame: buildPretClassAMTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassAMTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        finalOnsetFrame: buildPretClassAMTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassAMTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassAMTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassAMTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassAMTransitiveSegmentFrame("target-policy", "allow-class-a-zero-and-ki"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassAMTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassAMTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_M_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassAMTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_M_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-m-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-m-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-m-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: true,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-zero-and-ki`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassAMTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_M_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassAMTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_M_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-m-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-m-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-m-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== true
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-zero-and-ki`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassAPiIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_PI_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassAPiIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassAPiIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "p+i"
        || finalOnset !== "p"
        || finalNucleus !== "i"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_PI_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-pi-intransitive",
        sourceVerbFrame: buildPretClassAPiIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassAPiIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        finalOnsetFrame: buildPretClassAPiIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassAPiIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassAPiIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassAPiIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassAPiIntransitiveSegmentFrame("target-policy", "allow-class-a-and-b-ki-only"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassAPiIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassAPiIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassAPiIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_PI_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-pi-intransitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-pi-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-pi-intransitive-target-frame",
            allowClassA: true,
            allowClassB: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-and-b-ki-only`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassAPiIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_PI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassAPiIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_PI_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-pi-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-pi-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-pi-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-and-b-ki-only`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassBTaIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_B_TA_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassBTaIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_TA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassBTaIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "t+a"
        || finalOnset !== "t"
        || finalNucleus !== "a"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_B_TA_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-b-ta-intransitive",
        sourceVerbFrame: buildPretClassBTaIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassBTaIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        finalOnsetFrame: buildPretClassBTaIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassBTaIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassBTaIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassBTaIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassBTaIntransitiveSegmentFrame("target-policy", "allow-class-b-k-suffix"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassBTaIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassBTaIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_TA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassBTaIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_B_TA_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-b-ta-intransitive-policy",
        routeFamily: "preterit-class-b",
        routeStage: "allow-class-b-ta-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-b-ta-intransitive-target-frame",
            allowClassB: true,
            targetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-b-k-suffix`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassBTaIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_TA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassBTaIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_B_TA_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-b-ta-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-b"
        || operationFrame.routeStage !== "allow-class-b-ta-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-b-ta-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.targetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-b-k-suffix`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassBTaTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_B_TA_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassBTaTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_TA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.itaShapeFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassBTaTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
    isItaVerb = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "t+a"
        || finalOnset !== "t"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isMonosyllable === true
        || isItaVerb === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_B_TA_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-b-ta-transitive",
        sourceVerbFrame: buildPretClassBTaTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassBTaTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        finalOnsetFrame: buildPretClassBTaTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassBTaTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassBTaTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassBTaTransitiveSegmentFrame("monosyllable", "absent"),
        itaShapeFrame: buildPretClassBTaTransitiveSegmentFrame("ita-shape", "absent"),
        targetPolicyFrame: buildPretClassBTaTransitiveSegmentFrame("target-policy", "allow-class-b-k-suffix"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassBTaTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassBTaTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_TA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassBTaTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_B_TA_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-b-ta-transitive-policy",
        routeFamily: "preterit-class-b",
        routeStage: "allow-class-b-ta-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-b-ta-transitive-target-frame",
            allowClassB: true,
            targetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-b-k-suffix`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassBTaTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_TA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassBTaTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_B_TA_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-b-ta-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-b"
        || operationFrame.routeStage !== "allow-class-b-ta-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-b-ta-transitive-target-frame"
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.targetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-b-k-suffix`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassBKwiCvIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_B_KWI_CV_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassBKwiCvIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_KWI_CV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassBKwiCvIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "kw+i"
        || rightEdgeProfile !== "CV|CV"
        || finalOnset !== "kw"
        || finalNucleus !== "i"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_B_KWI_CV_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-b-kwi-cv-intransitive",
        sourceVerbFrame: buildPretClassBKwiCvIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassBKwiCvIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassBKwiCvIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassBKwiCvIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassBKwiCvIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassBKwiCvIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassBKwiCvIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassBKwiCvIntransitiveSegmentFrame("target-policy", "allow-class-b-k-suffix"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassBKwiCvIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassBKwiCvIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_KWI_CV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassBKwiCvIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_B_KWI_CV_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-b-kwi-cv-intransitive-policy",
        routeFamily: "preterit-class-b",
        routeStage: "allow-class-b-kwi-cv-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-b-kwi-cv-intransitive-target-frame",
            allowClassB: true,
            targetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-b-k-suffix`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassBKwiCvIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_KWI_CV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassBKwiCvIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_B_KWI_CV_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-b-kwi-cv-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-b"
        || operationFrame.routeStage !== "allow-class-b-kwi-cv-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-b-kwi-cv-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.targetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-b-k-suffix`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassBVcvcuIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_B_VCVCU_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassBVcvcuIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VCVCU_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassBVcvcuIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || !endingFamily.endsWith("+u")
        || rightEdgeProfile !== "V|CV|CV"
        || !finalOnset
        || finalNucleus !== "u"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_B_VCVCU_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-b-vcvcu-intransitive",
        sourceVerbFrame: buildPretClassBVcvcuIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassBVcvcuIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassBVcvcuIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassBVcvcuIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassBVcvcuIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassBVcvcuIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassBVcvcuIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassBVcvcuIntransitiveSegmentFrame("target-policy", "allow-class-b-k-suffix"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassBVcvcuIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassBVcvcuIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VCVCU_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassBVcvcuIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_B_VCVCU_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-b-vcvcu-intransitive-policy",
        routeFamily: "preterit-class-b",
        routeStage: "allow-class-b-vcvcu-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-b-vcvcu-intransitive-target-frame",
            allowClassB: true,
            targetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-b-k-suffix`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassBVcvcuIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VCVCU_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassBVcvcuIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_B_VCVCU_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-b-vcvcu-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-b"
        || operationFrame.routeStage !== "allow-class-b-vcvcu-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-b-vcvcu-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.targetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-b-k-suffix`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassBVlcvwiIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_B_VLCVWI_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassBVlcvwiIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VLCVWI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassBVlcvwiIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "w+i"
        || rightEdgeProfile !== "Vl|CV|CV"
        || finalOnset !== "w"
        || finalNucleus !== "i"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_B_VLCVWI_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-b-vlcvwi-intransitive",
        sourceVerbFrame: buildPretClassBVlcvwiIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassBVlcvwiIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassBVlcvwiIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassBVlcvwiIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassBVlcvwiIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassBVlcvwiIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassBVlcvwiIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassBVlcvwiIntransitiveSegmentFrame("target-policy", "allow-class-b-k-suffix"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassBVlcvwiIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassBVlcvwiIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VLCVWI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassBVlcvwiIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_B_VLCVWI_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-b-vlcvwi-intransitive-policy",
        routeFamily: "preterit-class-b",
        routeStage: "allow-class-b-vlcvwi-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-b-vlcvwi-intransitive-target-frame",
            allowClassB: true,
            targetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-b-k-suffix`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassBVlcvwiIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VLCVWI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassBVlcvwiIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_B_VLCVWI_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-b-vlcvwi-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-b"
        || operationFrame.routeStage !== "allow-class-b-vlcvwi-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-b-vlcvwi-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.targetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-b-k-suffix`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassBCvniuIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_B_CVNIU_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassBCvniuIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_CVNIU_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.previousNucleusFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassBCvniuIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const previousNucleus = normalizePretRootPlusYaFrameText(edge.previousNucleus || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "n+i"
        || rightEdgeProfile !== "CV|CV"
        || previousNucleus !== "u"
        || finalOnset !== "n"
        || finalNucleus !== "i"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_B_CVNIU_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-b-cvniu-intransitive",
        sourceVerbFrame: buildPretClassBCvniuIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassBCvniuIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassBCvniuIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        previousNucleusFrame: buildPretClassBCvniuIntransitiveSegmentFrame("right-edge-previous-nucleus", previousNucleus),
        finalOnsetFrame: buildPretClassBCvniuIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassBCvniuIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassBCvniuIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassBCvniuIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassBCvniuIntransitiveSegmentFrame("target-policy", "allow-class-b-k-suffix"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassBCvniuIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassBCvniuIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_CVNIU_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassBCvniuIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_B_CVNIU_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-b-cvniu-intransitive-policy",
        routeFamily: "preterit-class-b",
        routeStage: "allow-class-b-cvniu-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-b-cvniu-intransitive-target-frame",
            allowClassB: true,
            targetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-b-k-suffix`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassBCvniuIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_CVNIU_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassBCvniuIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_B_CVNIU_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-b-cvniu-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-b"
        || operationFrame.routeStage !== "allow-class-b-cvniu-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-b-cvniu-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.targetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-b-k-suffix`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassACvvniIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_CVVNI_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassACvvniIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVVNI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.previousNucleusFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassACvvniIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const previousNucleus = normalizePretRootPlusYaFrameText(edge.previousNucleus || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "n+i"
        || rightEdgeProfile !== "CV|V|CV"
        || !previousNucleus
        || finalOnset !== "n"
        || finalNucleus !== "i"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_CVVNI_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-cvvni-intransitive",
        sourceVerbFrame: buildPretClassACvvniIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassACvvniIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassACvvniIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        previousNucleusFrame: buildPretClassACvvniIntransitiveSegmentFrame("right-edge-previous-nucleus", previousNucleus),
        finalOnsetFrame: buildPretClassACvvniIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassACvvniIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassACvvniIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassACvvniIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassACvvniIntransitiveSegmentFrame("target-policy", "allow-class-a-ki-and-class-b-k"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassACvvniIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassACvvniIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVVNI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassACvvniIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_CVVNI_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-cvvni-intransitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-b-cvvni-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-cvvni-intransitive-target-frame",
            allowClassA: true,
            allowClassB: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
            classBTargetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-and-class-b-k`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassACvvniIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVVNI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassACvvniIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_CVVNI_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-cvvni-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-b-cvvni-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-cvvni-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetFrame.classBTargetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-and-class-b-k`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassACvsvIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_CVSV_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassACvsvIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVSV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassACvsvIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "s+i"
        || rightEdgeProfile !== "CV|CV"
        || finalOnset !== "s"
        || finalNucleus !== "i"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_CVSV_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-cvsv-intransitive",
        sourceVerbFrame: buildPretClassACvsvIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassACvsvIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassACvsvIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassACvsvIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassACvsvIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassACvsvIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassACvsvIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassACvsvIntransitiveSegmentFrame("target-policy", "allow-class-a-ki-and-class-b-k"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassACvsvIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassACvsvIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVSV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassACvsvIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_CVSV_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-cvsv-intransitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-b-cvsv-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-cvsv-intransitive-target-frame",
            allowClassA: true,
            allowClassB: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
            classBTargetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-and-class-b-k`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassACvsvIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVSV_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassACvsvIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_CVSV_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-cvsv-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-b-cvsv-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-cvsv-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetFrame.classBTargetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-and-class-b-k`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassACvwiIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_CVWI_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassACvwiIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVWI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassACvwiIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "w+i"
        || rightEdgeProfile !== "CV|CV"
        || finalOnset !== "w"
        || finalNucleus !== "i"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_CVWI_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-cvwi-intransitive",
        sourceVerbFrame: buildPretClassACvwiIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassACvwiIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassACvwiIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassACvwiIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassACvwiIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassACvwiIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassACvwiIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassACvwiIntransitiveSegmentFrame("target-policy", "allow-class-a-ki-and-class-b-k"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassACvwiIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassACvwiIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVWI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassACvwiIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_CVWI_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-cvwi-intransitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-b-cvwi-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-cvwi-intransitive-target-frame",
            allowClassA: true,
            allowClassB: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
            classBTargetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-and-class-b-k`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassACvwiIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVWI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassACvwiIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_CVWI_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-cvwi-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-b-cvwi-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-cvwi-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetFrame.classBTargetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-and-class-b-k`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassACvcvwiIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_CVCVWI_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassACvcvwiIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVCVWI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassACvcvwiIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "w+i"
        || rightEdgeProfile !== "CV|CV|CV"
        || finalOnset !== "w"
        || finalNucleus !== "i"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_CVCVWI_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-cvcvwi-intransitive",
        sourceVerbFrame: buildPretClassACvcvwiIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassACvcvwiIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassACvcvwiIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassACvcvwiIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassACvcvwiIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassACvcvwiIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassACvcvwiIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassACvcvwiIntransitiveSegmentFrame("target-policy", "allow-class-a-ki-and-class-b-k"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassACvcvwiIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassACvcvwiIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVCVWI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassACvcvwiIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_CVCVWI_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-cvcvwi-intransitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-b-cvcvwi-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-cvcvwi-intransitive-target-frame",
            allowClassA: true,
            allowClassB: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
            classBTargetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-and-class-b-k`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassACvcvwiIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_CVCVWI_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassACvcvwiIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_CVCVWI_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-cvcvwi-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-b-cvcvwi-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-cvcvwi-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetFrame.classBTargetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-and-class-b-k`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassBVjwaIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_B_VJWA_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassBVjwaIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VJWA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassBVjwaIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "w+a"
        || rightEdgeProfile !== "Vj|CV"
        || finalOnset !== "w"
        || finalNucleus !== "a"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_B_VJWA_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-b-vjwa-intransitive",
        sourceVerbFrame: buildPretClassBVjwaIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassBVjwaIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassBVjwaIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassBVjwaIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassBVjwaIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassBVjwaIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassBVjwaIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassBVjwaIntransitiveSegmentFrame("target-policy", "allow-class-b-k-suffix"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassBVjwaIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassBVjwaIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VJWA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassBVjwaIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_B_VJWA_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-b-vjwa-intransitive-policy",
        routeFamily: "preterit-class-b",
        routeStage: "allow-class-b-vjwa-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-b-vjwa-intransitive-target-frame",
            allowClassB: true,
            targetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-b-k-suffix`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassBVjwaIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_VJWA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassBVjwaIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_B_VJWA_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-b-vjwa-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-b"
        || operationFrame.routeStage !== "allow-class-b-vjwa-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-b-vjwa-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.targetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-b-k-suffix`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassBCuwaIntransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_B_CUWA_INTRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassBCuwaIntransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_CUWA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.leadingNucleusFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassBCuwaIntransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const leadingNucleus = normalizePretRootPlusYaFrameText(sourceSyllables[0]?.nucleus || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "w+a"
        || rightEdgeProfile !== "CV|CV"
        || leadingNucleus !== "u"
        || finalOnset !== "w"
        || finalNucleus !== "a"
        || isTransitive === true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_B_CUWA_INTRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-b-cuwa-intransitive",
        sourceVerbFrame: buildPretClassBCuwaIntransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassBCuwaIntransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassBCuwaIntransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        leadingNucleusFrame: buildPretClassBCuwaIntransitiveSegmentFrame("leading-nucleus", leadingNucleus),
        finalOnsetFrame: buildPretClassBCuwaIntransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassBCuwaIntransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassBCuwaIntransitiveSegmentFrame("transitivity", "intransitive"),
        monosyllableFrame: buildPretClassBCuwaIntransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassBCuwaIntransitiveSegmentFrame("target-policy", "allow-class-b-k-suffix"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassBCuwaIntransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassBCuwaIntransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_CUWA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassBCuwaIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_B_CUWA_INTRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-b-cuwa-intransitive-policy",
        routeFamily: "preterit-class-b",
        routeStage: "allow-class-b-cuwa-intransitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-b-cuwa-intransitive-target-frame",
            allowClassB: true,
            targetSuffix: "k",
        }),
        targetSignature: `${sourceSignature}|allow-class-b-k-suffix`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassBCuwaIntransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_B_CUWA_INTRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassBCuwaIntransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_B_CUWA_INTRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-b-cuwa-intransitive-policy"
        || operationFrame.routeFamily !== "preterit-class-b"
        || operationFrame.routeStage !== "allow-class-b-cuwa-intransitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-b-cuwa-intransitive-target-frame"
        || operationFrame.targetFrame.allowClassB !== true
        || operationFrame.targetFrame.targetSuffix !== "k"
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-b-k-suffix`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassANiCvTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_NI_CV_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassANiCvTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NI_CV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassANiCvTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "n+i"
        || rightEdgeProfile !== "CV|CV"
        || finalOnset !== "n"
        || finalNucleus !== "i"
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_NI_CV_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-ni-cv-transitive",
        sourceVerbFrame: buildPretClassANiCvTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassANiCvTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassANiCvTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassANiCvTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassANiCvTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassANiCvTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassANiCvTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassANiCvTransitiveSegmentFrame("target-policy", "allow-class-a-zero-and-ki"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassANiCvTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassANiCvTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NI_CV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassANiCvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_NI_CV_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-ni-cv-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-ni-cv-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-ni-cv-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: true,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-zero-and-ki`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassANiCvTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NI_CV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassANiCvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_NI_CV_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-ni-cv-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-ni-cv-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-ni-cv-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== true
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-zero-and-ki`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassANaCvTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_NA_CV_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassANaCvTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassANaCvTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "n+a"
        || rightEdgeProfile !== "CV|CV"
        || finalOnset !== "n"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_NA_CV_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-na-cv-transitive",
        sourceVerbFrame: buildPretClassANaCvTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassANaCvTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassANaCvTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassANaCvTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassANaCvTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassANaCvTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassANaCvTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassANaCvTransitiveSegmentFrame("target-policy", "allow-class-a-ki-only"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassANaCvTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassANaCvTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassANaCvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_NA_CV_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-na-cv-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-na-cv-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-na-cv-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-only`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassANaCvTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassANaCvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_NA_CV_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-na-cv-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-na-cv-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-na-cv-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-only`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassANaCvcvcvTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_NA_CVCVCV_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassANaCvcvcvTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CVCVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassANaCvcvcvTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "n+a"
        || rightEdgeProfile !== "CV|CV|CV"
        || finalOnset !== "n"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_NA_CVCVCV_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-na-cvcvcv-transitive",
        sourceVerbFrame: buildPretClassANaCvcvcvTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassANaCvcvcvTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassANaCvcvcvTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassANaCvcvcvTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassANaCvcvcvTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassANaCvcvcvTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassANaCvcvcvTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassANaCvcvcvTransitiveSegmentFrame("target-policy", "allow-class-a-zero-and-ki"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassANaCvcvcvTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassANaCvcvcvTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CVCVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassANaCvcvcvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_NA_CVCVCV_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-na-cvcvcv-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-na-cvcvcv-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-na-cvcvcv-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: true,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-zero-and-ki`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassANaCvcvcvTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CVCVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassANaCvcvcvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_NA_CVCVCV_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-na-cvcvcv-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-na-cvcvcv-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-na-cvcvcv-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== true
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-zero-and-ki`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassANaCvlvcvTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_NA_CVLVCV_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassANaCvlvcvTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CVLVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassANaCvlvcvTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "n+a"
        || rightEdgeProfile !== "CVl|V|CV"
        || finalOnset !== "n"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_NA_CVLVCV_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-na-cvlvcv-transitive",
        sourceVerbFrame: buildPretClassANaCvlvcvTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassANaCvlvcvTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassANaCvlvcvTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassANaCvlvcvTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassANaCvlvcvTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassANaCvlvcvTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassANaCvlvcvTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassANaCvlvcvTransitiveSegmentFrame("target-policy", "allow-class-a-zero-and-ki"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassANaCvlvcvTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassANaCvlvcvTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CVLVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassANaCvlvcvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_NA_CVLVCV_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-na-cvlvcv-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-na-cvlvcv-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-na-cvlvcv-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: true,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-zero-and-ki`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassANaCvlvcvTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_CVLVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassANaCvlvcvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_NA_CVLVCV_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-na-cvlvcv-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-na-cvlvcv-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-na-cvlvcv-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== true
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-zero-and-ki`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassANaVlcvcvTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_NA_VLCVCV_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassANaVlcvcvTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_VLCVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassANaVlcvcvTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "n+a"
        || rightEdgeProfile !== "Vl|CV|CV"
        || finalOnset !== "n"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_NA_VLCVCV_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-na-vlcvcv-transitive",
        sourceVerbFrame: buildPretClassANaVlcvcvTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassANaVlcvcvTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassANaVlcvcvTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassANaVlcvcvTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassANaVlcvcvTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassANaVlcvcvTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassANaVlcvcvTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassANaVlcvcvTransitiveSegmentFrame("target-policy", "allow-class-a-ki-only"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassANaVlcvcvTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassANaVlcvcvTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_VLCVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassANaVlcvcvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_NA_VLCVCV_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-na-vlcvcv-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-na-vlcvcv-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-na-vlcvcv-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-only`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassANaVlcvcvTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_VLCVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassANaVlcvcvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_NA_VLCVCV_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-na-vlcvcv-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-na-vlcvcv-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-na-vlcvcv-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-only`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassANaVjcvcvTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_NA_VJCVCV_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassANaVjcvcvTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_VJCVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassANaVjcvcvTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "n+a"
        || !["Vj|CV|CV", "V|C|CV|CV"].includes(rightEdgeProfile)
        || finalOnset !== "n"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_NA_VJCVCV_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-na-vjcvcv-transitive",
        sourceVerbFrame: buildPretClassANaVjcvcvTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassANaVjcvcvTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassANaVjcvcvTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassANaVjcvcvTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassANaVjcvcvTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassANaVjcvcvTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassANaVjcvcvTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassANaVjcvcvTransitiveSegmentFrame("target-policy", "allow-class-a-zero-and-ki"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassANaVjcvcvTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassANaVjcvcvTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_VJCVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassANaVjcvcvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_NA_VJCVCV_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-na-vjcvcv-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-na-vjcvcv-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-na-vjcvcv-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: true,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-zero-and-ki`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassANaVjcvcvTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_NA_VJCVCV_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassANaVjcvcvTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_NA_VJCVCV_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-na-vjcvcv-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-na-vjcvcv-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-na-vjcvcv-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== true
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-zero-and-ki`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassATzaTransitiveSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_A_TZA_TRANSITIVE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function getPretClassATzaTransitiveSourceSignature(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_TZA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "";
    }
    return [
        sourceFrame.sourceVerbFrame?.text || "",
        sourceFrame.endingFamilyFrame?.text || "",
        sourceFrame.rightEdgeProfileFrame?.text || "",
        sourceFrame.finalOnsetFrame?.text || "",
        sourceFrame.finalNucleusFrame?.text || "",
        sourceFrame.transitivityFrame?.text || "",
        sourceFrame.monosyllableFrame?.text || "",
        sourceFrame.targetPolicyFrame?.text || "",
    ].join("|");
}

function buildPretClassATzaTransitiveSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
    isTransitive = false,
    isMonosyllable = false,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const endingFamily = normalizePretRootPlusYaFrameText(edge.endingFamily || "");
    const rightEdgeProfile = String(edge.rightEdgeProfile || "");
    const finalOnset = normalizePretRootPlusYaFrameText(edge.finalOnset || "");
    const finalNucleus = normalizePretRootPlusYaFrameText(edge.finalNucleus || "");
    if (
        !normalizedSourceVerb
        || endingFamily !== "tz+a"
        || !["CV|CV", "Vj|CV|CV", "V|C|CV|CV"].includes(rightEdgeProfile)
        || finalOnset !== "tz"
        || finalNucleus !== "a"
        || isTransitive !== true
        || isMonosyllable === true
    ) {
        return null;
    }
    const sourceFrame = {
        kind: PRET_CLASS_A_TZA_TRANSITIVE_SOURCE_FRAME_KIND,
        route: "preterit-class-a-tza-transitive",
        sourceVerbFrame: buildPretClassATzaTransitiveSegmentFrame("source-verb", normalizedSourceVerb),
        endingFamilyFrame: buildPretClassATzaTransitiveSegmentFrame("right-edge-ending-family", endingFamily),
        rightEdgeProfileFrame: buildPretClassATzaTransitiveSegmentFrame("right-edge-profile", rightEdgeProfile),
        finalOnsetFrame: buildPretClassATzaTransitiveSegmentFrame("right-edge-final-onset", finalOnset),
        finalNucleusFrame: buildPretClassATzaTransitiveSegmentFrame("right-edge-final-nucleus", finalNucleus),
        transitivityFrame: buildPretClassATzaTransitiveSegmentFrame("transitivity", "transitive"),
        monosyllableFrame: buildPretClassATzaTransitiveSegmentFrame("monosyllable", "absent"),
        targetPolicyFrame: buildPretClassATzaTransitiveSegmentFrame("target-policy", "allow-class-a-ki-only"),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    };
    sourceFrame.sourceSignature = getPretClassATzaTransitiveSourceSignature(sourceFrame);
    return Object.freeze(sourceFrame);
}

function buildPretClassATzaTransitiveOperationFrame(sourceFrame = null) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_TZA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return null;
    }
    const sourceSignature = getPretClassATzaTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_A_TZA_TRANSITIVE_OPERATION_FRAME_KIND,
        operationId: "andrews-preterit-class-a-tza-transitive-policy",
        routeFamily: "preterit-class-a",
        routeStage: "allow-class-a-tza-transitive",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature,
        targetFrame: Object.freeze({
            kind: "preterit-class-a-tza-transitive-target-frame",
            allowClassA: true,
            allowZeroSuffix: false,
            allowKiSuffix: true,
        }),
        targetSignature: `${sourceSignature}|allow-class-a-ki-only`,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
    });
}

function getPretClassATzaTransitiveFrameMismatch({
    sourceFrame = null,
    operationFrame = null,
} = {}) {
    if (!sourceFrame || sourceFrame.kind !== PRET_CLASS_A_TZA_TRANSITIVE_SOURCE_FRAME_KIND) {
        return "source-frame-required";
    }
    const sourceSignature = getPretClassATzaTransitiveSourceSignature(sourceFrame);
    if (!sourceSignature || sourceSignature !== sourceFrame.sourceSignature) {
        return "contradictory-source-frame";
    }
    if (
        !operationFrame
        || operationFrame.kind !== PRET_CLASS_A_TZA_TRANSITIVE_OPERATION_FRAME_KIND
        || operationFrame.operationId !== "andrews-preterit-class-a-tza-transitive-policy"
        || operationFrame.routeFamily !== "preterit-class-a"
        || operationFrame.routeStage !== "allow-class-a-tza-transitive"
        || operationFrame.sourceFrameKind !== sourceFrame.kind
        || operationFrame.sourceSignature !== sourceSignature
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false
    ) {
        return "operation-frame-required";
    }
    if (
        !operationFrame.targetFrame
        || operationFrame.targetFrame.kind !== "preterit-class-a-tza-transitive-target-frame"
        || operationFrame.targetFrame.allowClassA !== true
        || operationFrame.targetFrame.allowZeroSuffix !== false
        || operationFrame.targetFrame.allowKiSuffix !== true
        || operationFrame.targetSignature !== `${sourceSignature}|allow-class-a-ki-only`
    ) {
        return "contradictory-target-frame";
    }
    return "";
}

function buildPretClassBSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_B_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function buildPretClassBSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    if (!normalizedSourceVerb || !sourceSyllables.length) {
        return null;
    }
    const vowelCount = typeof getTrailingVowelCountFromSyllables === "function"
        ? getTrailingVowelCountFromSyllables(sourceSyllables)
        : getPretUniversalCoreVowelCount(normalizedSourceVerb);
    return Object.freeze({
        kind: PRET_CLASS_B_SOURCE_FRAME_KIND,
        route: "preterit-class-b-literal-base",
        sourceVerbFrame: buildPretClassBSegmentFrame("source-verb", normalizedSourceVerb),
        vowelCountFrame: buildPretClassBSegmentFrame("vowel-count", String(vowelCount)),
        syllableCountFrame: buildPretClassBSegmentFrame("syllable-count", String(sourceSyllables.length)),
        finalFormFrame: buildPretClassBSegmentFrame("final-form", edge.finalForm || ""),
        finalOnsetFrame: buildPretClassBSegmentFrame("final-onset", edge.finalOnset || ""),
        finalNucleusFrame: buildPretClassBSegmentFrame("final-nucleus", edge.finalNucleus || ""),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
        operationFrame: Object.freeze({
            kind: PRET_CLASS_B_OPERATION_FRAME_KIND,
            operation: "select-source-verb-as-class-b-base",
        }),
    });
}

function buildPretClassCSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_C_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function buildPretClassCSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    const finalSyllable = sourceSyllables[sourceSyllables.length - 1] || null;
    const finalVowel = normalizePretRootPlusYaFrameText(finalSyllable?.nucleus || "");
    if (!normalizedSourceVerb || !finalSyllable || !finalVowel) {
        return null;
    }
    const retainedBase = [
        ...sourceSyllables.slice(0, -1).map((syllable) => normalizePretRootPlusYaFrameText(syllable?.text || "")),
        normalizePretRootPlusYaFrameText(finalSyllable?.onset || ""),
    ].join("");
    if (!retainedBase) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_C_SOURCE_FRAME_KIND,
        route: "preterit-class-c-perfective-replacement",
        sourceVerbFrame: buildPretClassCSegmentFrame("source-verb", normalizedSourceVerb),
        retainedBaseFrame: buildPretClassCSegmentFrame("retained-base", retainedBase),
        finalVowelFrame: buildPretClassCSegmentFrame("final-vowel", finalVowel),
        previousNucleusFrame: buildPretClassCSegmentFrame("previous-nucleus", edge.previousNucleus || ""),
        finalFormFrame: buildPretClassCSegmentFrame("final-form", edge.finalForm || ""),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
    });
}

function buildPretClassDSegmentFrame(role = "", value = "") {
    return Object.freeze({
        kind: PRET_CLASS_D_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretRootPlusYaFrameText(value),
    });
}

function buildPretClassDSourceFrame({
    sourceVerb = "",
    syllables = null,
    rightEdgeDescriptor = null,
} = {}) {
    const normalizedSourceVerb = normalizePretRootPlusYaFrameText(sourceVerb);
    const sourceSyllables = Array.isArray(syllables) && syllables.length
        ? syllables
        : (normalizedSourceVerb && typeof getSyllables === "function"
            ? getSyllables(normalizedSourceVerb, { analysis: true, assumeFinalV: true })
            : []);
    const edge = rightEdgeDescriptor && typeof rightEdgeDescriptor === "object"
        ? rightEdgeDescriptor
        : (typeof buildPretRightEdgeDescriptor === "function"
            ? buildPretRightEdgeDescriptor(sourceSyllables)
            : {});
    if (!normalizedSourceVerb || !sourceSyllables.length) {
        return null;
    }
    return Object.freeze({
        kind: PRET_CLASS_D_SOURCE_FRAME_KIND,
        route: "preterit-class-d-append",
        sourceVerbFrame: buildPretClassDSegmentFrame("source-verb", normalizedSourceVerb),
        appendFrame: buildPretClassDSegmentFrame("append", "j"),
        syllableCountFrame: buildPretClassDSegmentFrame("syllable-count", String(sourceSyllables.length)),
        finalFormFrame: buildPretClassDSegmentFrame("final-form", edge.finalForm || ""),
        finalNucleusFrame: buildPretClassDSegmentFrame("final-nucleus", edge.finalNucleus || ""),
        rightEdgeDescriptorFrame: Object.freeze({ ...edge }),
    });
}

function applyPretUniversalDeletionShift(stem, options = {}) {
    const specs = [];
    if (typeof buildPretDeletionShiftBaseSpec === "function") {
        if (stem.endsWith("kw")) {
            specs.push(buildPretDeletionShiftBaseSpec(stem, "identity", options));
        } else if (stem.endsWith("w")) {
            specs.push(buildPretDeletionShiftBaseSpec(stem, "w-keep", options));
            specs.push(buildPretDeletionShiftBaseSpec(stem, "w-to-j", options));
        } else if (stem.endsWith("m")) {
            specs.push(buildPretDeletionShiftBaseSpec(stem, "identity", options));
        } else if (stem.endsWith("y")) {
            specs.push(buildPretDeletionShiftBaseSpec(stem, "identity", options));
        } else {
            specs.push(buildPretDeletionShiftBaseSpec(stem, "identity", options));
        }
    }
    const realized = specs
        .map((spec) => (typeof realizePretBaseSpec === "function" ? realizePretBaseSpec(spec, "") : ""))
        .filter(Boolean);
    return realized.length ? realized : [stem];
}

function getPerfectiveAlternationStems(verb, options = {}) {
    if (!verb) {
        return [];
    }
    const isRootPlusYa = options.isRootPlusYa === true;
    if (isRootPlusYa && verb.endsWith("ya")) {
        const replaced = getPerfectiveReplacementStem(verb, options);
        return replaced ? [replaced] : [];
    }
    const base = verb.slice(0, -1);
    if (!base) {
        return [];
    }
    return applyPretUniversalDeletionShift(base, options);
}

function getMonosyllableStemPath(sourceFrame = null) {
    if (
        !sourceFrame
        || typeof sourceFrame !== "object"
        || sourceFrame.kind !== PRET_CLASS_D_SOURCE_FRAME_KIND
        || sourceFrame.sourceVerbFrame?.kind !== PRET_CLASS_D_SEGMENT_FRAME_KIND
        || sourceFrame.appendFrame?.kind !== PRET_CLASS_D_SEGMENT_FRAME_KIND
    ) {
        return null;
    }
    const verb = normalizePretRootPlusYaFrameText(sourceFrame.sourceVerbFrame.text || "");
    const appendText = normalizePretRootPlusYaFrameText(sourceFrame.appendFrame.text || "");
    if (!verb || appendText !== "j") {
        return null;
    }
    const classDBaseSpec = typeof buildPretAppendBaseSpec === "function"
        ? buildPretAppendBaseSpec(verb, appendText)
        : null;
    return {
        path: "monosyllable",
        classDBase: typeof realizePretBaseSpec === "function"
            ? realizePretBaseSpec(classDBaseSpec, "")
            : `${verb}j`,
        classDBaseSpec,
    };
}

const PRET_UNIVERSAL_CLASS_ORDER = Object.freeze(["A", "B", "C", "D"]);
const PRET_UNIVERSAL_RULE_TIER_ORDER = Object.freeze([
    "override",
    "path",
    "monosyllable",
    "forced",
    "shape",
    "default",
]);
const PRET_UNIVERSAL_DEFAULT_RULE_LABEL = "default class rules";
const PRET_UNIVERSAL_DEFAULT_RULE_TIER = "default";
const PRET_UNIVERSAL_CLASS_ORDER_INDEX = Object.freeze(
    PRET_UNIVERSAL_CLASS_ORDER.reduce((acc, classKey, index) => {
        acc[classKey] = index;
        return acc;
    }, {}),
);
const PRET_UNIVERSAL_CLASS_GATE_RULES = Object.freeze([
    {
        id: "unpronounceable_root",
        label: "unpronounceable root",
        tier: PRET_UNIVERSAL_DEFAULT_RULE_TIER,
        when: (context, flags) => !context?.rootSyllablesOk && !flags?.allowUnpronounceable,
        classes: [],
    },
    {
        id: "override_classes",
        tier: "override",
        when: (_context, flags) => {
            const override = flags?.override;
            return Boolean(override && Array.isArray(override.classes) && override.classes.length);
        },
        resolveLabel: (context, flags) => {
            const override = flags?.override || {};
            const labelBase = override.id || context?.analysisVerb || override.verbs?.[0] || "lexical";
            return `override ${labelBase}`;
        },
        resolveCandidates: (_context, flags) => {
            const override = flags?.override || {};
            return toPretUniversalCandidateSet(override.classes);
        },
    },
    {
        id: "blocked_m_transitive_without_typed_frames",
        label: "m+[a|i] transitive missing typed frames",
        tier: "forced",
        when: (context) => (
            context?.isTransitive === true
            && context.isMonosyllable !== true
            && pretContextHasRightEdge(context, { finalOnset: "m", finalNuclei: ["a", "i"] })
            && getPretClassAMTransitiveFrameMismatch({
                sourceFrame: context?.classAMTransitiveSourceFrame,
                operationFrame: context?.classAMTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_pa_transitive_without_typed_frames",
        label: "p+a transitive missing typed frames",
        tier: "forced",
        when: (context) => (
            context?.isTransitive === true
            && context.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "p+a" })
            && getPretClassAPaTransitiveFrameMismatch({
                sourceFrame: context?.classAPaTransitiveSourceFrame,
                operationFrame: context?.classAPaTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_pi_intransitive_without_typed_frames",
        label: "p+i intransitive missing typed frames",
        tier: "forced",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "p+i" })
            && getPretClassAPiIntransitiveFrameMismatch({
                sourceFrame: context?.classAPiIntransitiveSourceFrame,
                operationFrame: context?.classAPiIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_pi_cv_transitive_without_typed_frames",
        label: "p+i CV|CV transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "p+i", rightEdgeProfiles: ["CV|CV"] })
            && getPretClassAPiCvTransitiveFrameMismatch({
                sourceFrame: context?.classAPiCvTransitiveSourceFrame,
                operationFrame: context?.classAPiCvTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_cvwi_transitive_without_typed_frames",
        label: "CV|CV(w+i) transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && context?.isReduplicated !== true
            && pretContextHasRightEdge(context, { endingFamily: "w+i", rightEdgeProfiles: ["CV|CV"] })
            && getPretClassACvwiTransitiveFrameMismatch({
                sourceFrame: context?.classACvwiTransitiveSourceFrame,
                operationFrame: context?.classACvwiTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_cvcvwi_transitive_without_typed_frames",
        label: "CV|CV|CV(w+i) transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && context?.isReduplicated !== true
            && pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.wiCV_CV_CV)
            && getPretClassACvcvwiTransitiveFrameMismatch({
                sourceFrame: context?.classACvcvwiTransitiveSourceFrame,
                operationFrame: context?.classACvcvwiTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_cvwai_transitive_without_typed_frames",
        label: "CV(i)|CV(w+a) transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, {
                endingFamily: "w+a",
                rightEdgeProfiles: ["CV|CV"],
                previousNucleus: "i",
            })
            && getPretClassACvwaiTransitiveFrameMismatch({
                sourceFrame: context?.classACvwaiTransitiveSourceFrame,
                operationFrame: context?.classACvwaiTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_cvewa_transitive_without_typed_frames",
        label: "CV(e)|CV(w+a) transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, {
                endingFamily: "w+a",
                rightEdgeProfiles: ["CV|CV"],
                previousNucleus: "e",
            })
            && getPretClassACvewaTransitiveFrameMismatch({
                sourceFrame: context?.classACvewaTransitiveSourceFrame,
                operationFrame: context?.classACvewaTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_cvawa_transitive_without_typed_frames",
        label: "CV(a)|CV(w+a) transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && context?.isReduplicated !== true
            && context?.hasSlashMarker !== true
            && pretContextHasRightEdge(context, {
                endingFamily: "w+a",
                rightEdgeProfiles: ["CV|CV"],
                previousNucleus: "a",
            })
            && getPretClassACvawaTransitiveFrameMismatch({
                sourceFrame: context?.classACvawaTransitiveSourceFrame,
                operationFrame: context?.classACvawaTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_pa_cv_intransitive_without_typed_frames",
        label: "p+a CV|CV intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "p+a", rightEdgeProfiles: ["CV|CV"] })
            && getPretClassAPaCvIntransitiveFrameMismatch({
                sourceFrame: context?.classAPaCvIntransitiveSourceFrame,
                operationFrame: context?.classAPaCvIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_na_cv_intransitive_without_typed_frames",
        label: "n+a CV|CV intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "n+a", rightEdgeProfiles: ["CV|CV"] })
            && getPretClassANaCvIntransitiveFrameMismatch({
                sourceFrame: context?.classANaCvIntransitiveSourceFrame,
                operationFrame: context?.classANaCvIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_vna_intransitive_without_typed_frames",
        label: "V|CV(na) intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "n+a", rightEdgeProfiles: ["V|CV"] })
            && getPretClassBVnaIntransitiveFrameMismatch({
                sourceFrame: context?.classBVnaIntransitiveSourceFrame,
                operationFrame: context?.classBVnaIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_ta_intransitive_without_typed_frames",
        label: "t+a intransitive missing typed frames",
        tier: "forced",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "t+a" })
            && getPretClassBTaIntransitiveFrameMismatch({
                sourceFrame: context?.classBTaIntransitiveSourceFrame,
                operationFrame: context?.classBTaIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_ta_transitive_without_typed_frames",
        label: "t+a transitive missing typed frames",
        tier: "forced",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && context?.isItaVerb !== true
            && pretContextHasRightEdge(context, { endingFamily: "t+a" })
            && getPretClassBTaTransitiveFrameMismatch({
                sourceFrame: context?.classBTaTransitiveSourceFrame,
                operationFrame: context?.classBTaTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_kwi_cv_intransitive_without_typed_frames",
        label: "kw+i CV|CV intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "kw+i", rightEdgeProfiles: ["CV|CV"] })
            && getPretClassBKwiCvIntransitiveFrameMismatch({
                sourceFrame: context?.classBKwiCvIntransitiveSourceFrame,
                operationFrame: context?.classBKwiCvIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_vcvcu_intransitive_without_typed_frames",
        label: "V|CV|CV(u) intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { rightEdgeProfiles: ["V|CV|CV"], finalNucleus: "u" })
            && getPretClassBVcvcuIntransitiveFrameMismatch({
                sourceFrame: context?.classBVcvcuIntransitiveSourceFrame,
                operationFrame: context?.classBVcvcuIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_vlcvwi_intransitive_without_typed_frames",
        label: "Vl|CV|CV(wi) intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "w+i", rightEdgeProfiles: ["Vl|CV|CV"] })
            && getPretClassBVlcvwiIntransitiveFrameMismatch({
                sourceFrame: context?.classBVlcvwiIntransitiveSourceFrame,
                operationFrame: context?.classBVlcvwiIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_cvniu_intransitive_without_typed_frames",
        label: "CV(u)|CV(ni) intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "n+i", rightEdgeProfiles: ["CV|CV"], previousNucleus: "u" })
            && getPretClassBCvniuIntransitiveFrameMismatch({
                sourceFrame: context?.classBCvniuIntransitiveSourceFrame,
                operationFrame: context?.classBCvniuIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_cvvni_intransitive_without_typed_frames",
        label: "CV|V|CV(ni) intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "n+i", rightEdgeProfiles: ["CV|V|CV"] })
            && getPretClassACvvniIntransitiveFrameMismatch({
                sourceFrame: context?.classACvvniIntransitiveSourceFrame,
                operationFrame: context?.classACvvniIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_cvsv_intransitive_without_typed_frames",
        label: "CV|CV(s+i) intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "s+i", rightEdgeProfiles: ["CV|CV"] })
            && getPretClassACvsvIntransitiveFrameMismatch({
                sourceFrame: context?.classACvsvIntransitiveSourceFrame,
                operationFrame: context?.classACvsvIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_cvwi_intransitive_without_typed_frames",
        label: "CV|CV(w+i) intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "w+i", rightEdgeProfiles: ["CV|CV"] })
            && getPretClassACvwiIntransitiveFrameMismatch({
                sourceFrame: context?.classACvwiIntransitiveSourceFrame,
                operationFrame: context?.classACvwiIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_cvcvwi_intransitive_without_typed_frames",
        label: "CV|CV|CV(w+i) intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "w+i", rightEdgeProfiles: ["CV|CV|CV"] })
            && getPretClassACvcvwiIntransitiveFrameMismatch({
                sourceFrame: context?.classACvcvwiIntransitiveSourceFrame,
                operationFrame: context?.classACvcvwiIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_vjwa_intransitive_without_typed_frames",
        label: "Vj|CV(wa) intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, {
                endingFamily: "w+a",
                rightEdgeProfiles: ["Vj|CV"],
            })
            && getPretClassBVjwaIntransitiveFrameMismatch({
                sourceFrame: context?.classBVjwaIntransitiveSourceFrame,
                operationFrame: context?.classBVjwaIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_cuwa_intransitive_without_typed_frames",
        label: "CV(u)|CV(wa) intransitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive !== true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, {
                endingFamily: "w+a",
                rightEdgeProfiles: ["CV|CV"],
                previousNucleus: "u",
            })
            && getPretClassBCuwaIntransitiveFrameMismatch({
                sourceFrame: context?.classBCuwaIntransitiveSourceFrame,
                operationFrame: context?.classBCuwaIntransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_ni_cv_transitive_without_typed_frames",
        label: "n+i CV|CV transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "n+i", rightEdgeProfiles: ["CV|CV"] })
            && getPretClassANiCvTransitiveFrameMismatch({
                sourceFrame: context?.classANiCvTransitiveSourceFrame,
                operationFrame: context?.classANiCvTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_na_cv_transitive_without_typed_frames",
        label: "n+a CV|CV transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "n+a", rightEdgeProfiles: ["CV|CV"] })
            && getPretClassANaCvTransitiveFrameMismatch({
                sourceFrame: context?.classANaCvTransitiveSourceFrame,
                operationFrame: context?.classANaCvTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_na_cvcvcv_transitive_without_typed_frames",
        label: "n+a CV|CV|CV transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.naCV_CV_CV)
            && getPretClassANaCvcvcvTransitiveFrameMismatch({
                sourceFrame: context?.classANaCvcvcvTransitiveSourceFrame,
                operationFrame: context?.classANaCvcvcvTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_na_cvlvcv_transitive_without_typed_frames",
        label: "n+a CVl|V|CV transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "n+a", rightEdgeProfiles: ["CVl|V|CV"] })
            && getPretClassANaCvlvcvTransitiveFrameMismatch({
                sourceFrame: context?.classANaCvlvcvTransitiveSourceFrame,
                operationFrame: context?.classANaCvlvcvTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_na_vlcvcv_transitive_without_typed_frames",
        label: "n+a Vl|CV|CV transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, { endingFamily: "n+a", rightEdgeProfiles: ["Vl|CV|CV"] })
            && getPretClassANaVlcvcvTransitiveFrameMismatch({
                sourceFrame: context?.classANaVlcvcvTransitiveSourceFrame,
                operationFrame: context?.classANaVlcvcvTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_na_vjcvcv_transitive_without_typed_frames",
        label: "n+a Vj|CV|CV transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, {
                endingFamily: "n+a",
                rightEdgeProfiles: ["Vj|CV|CV", "V|C|CV|CV"],
            })
            && getPretClassANaVjcvcvTransitiveFrameMismatch({
                sourceFrame: context?.classANaVjcvcvTransitiveSourceFrame,
                operationFrame: context?.classANaVjcvcvTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
    {
        id: "blocked_tza_transitive_without_typed_frames",
        label: "tz+a transitive missing typed frames",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && context?.isMonosyllable !== true
            && pretContextHasRightEdge(context, {
                endingFamily: "tz+a",
                rightEdgeProfiles: ["CV|CV", "Vj|CV|CV", "V|C|CV|CV"],
            })
            && getPretClassATzaTransitiveFrameMismatch({
                sourceFrame: context?.classATzaTransitiveSourceFrame,
                operationFrame: context?.classATzaTransitiveOperationFrame,
            })
        ),
        classes: [],
    },
]);

const PRET_DENOMINAL_MATRIX_STEM_SET = Object.freeze([
    "ti",
    "wi",
    "ya",
    "a",
    "wa",
    "tiya",
    "wiya",
]);

function normalizePretDenominalStem(value) {
    if (!value) {
        return "";
    }
    return String(value)
        .toLowerCase()
        .replace(/[|~#()\\/?-]/g, "");
}

function getPretDenominalSourceContext({
    verb = "",
    matrixStem = "",
    hasSlashMarker = false,
    hasBoundMarker = false,
    hasImpersonalTaPrefix = false,
} = {}) {
    const defaults = {
        isDenominalMatrixInput: false,
        denominalMatrixStem: "",
        denominalSourceStem: "",
        denominalSourceEndsWithVowel: false,
        denominalSourceEndsWithConsonant: false,
        isDenominalTiMatrix: false,
        isDenominalWiMatrix: false,
    };
    if (!hasSlashMarker || !hasBoundMarker || hasImpersonalTaPrefix) {
        return defaults;
    }
    const normalizedMatrix = normalizePretDenominalStem(matrixStem);
    if (!normalizedMatrix || !PRET_DENOMINAL_MATRIX_STEM_SET.includes(normalizedMatrix)) {
        return defaults;
    }
    const normalizedVerb = normalizePretDenominalStem(verb);
    if (
        !normalizedVerb
        || normalizedVerb.length <= normalizedMatrix.length
        || !normalizedVerb.endsWith(normalizedMatrix)
    ) {
        return defaults;
    }
    const sourceStem = normalizedVerb.slice(0, -normalizedMatrix.length);
    const letters = splitVerbLetters(sourceStem);
    const lastLetter = letters[letters.length - 1] || "";
    const sourceEndsWithVowel = Boolean(lastLetter && isVerbLetterVowel(lastLetter));
    const sourceEndsWithConsonant = Boolean(lastLetter && isVerbLetterConsonant(lastLetter));
    return {
        isDenominalMatrixInput: true,
        denominalMatrixStem: normalizedMatrix,
        denominalSourceStem: sourceStem,
        denominalSourceEndsWithVowel: sourceEndsWithVowel,
        denominalSourceEndsWithConsonant: sourceEndsWithConsonant,
        isDenominalTiMatrix: normalizedMatrix === "ti",
        isDenominalWiMatrix: normalizedMatrix === "wi",
    };
}

function getPretUniversalClassOrder() {
    return PRET_UNIVERSAL_CLASS_ORDER.slice();
}

function sortPretUniversalClassKeys(values) {
    const entries = Array.isArray(values)
        ? values
        : Array.from(values || []);
    return Array.from(new Set(entries.filter(Boolean))).sort((left, right) => {
        const leftIndex = Object.prototype.hasOwnProperty.call(PRET_UNIVERSAL_CLASS_ORDER_INDEX, left)
            ? PRET_UNIVERSAL_CLASS_ORDER_INDEX[left]
            : Number.MAX_SAFE_INTEGER;
        const rightIndex = Object.prototype.hasOwnProperty.call(PRET_UNIVERSAL_CLASS_ORDER_INDEX, right)
            ? PRET_UNIVERSAL_CLASS_ORDER_INDEX[right]
            : Number.MAX_SAFE_INTEGER;
        if (leftIndex !== rightIndex) {
            return leftIndex - rightIndex;
        }
        return String(left).localeCompare(String(right));
    });
}

function formatPretUniversalClassList(candidates) {
    return sortPretUniversalClassKeys(candidates).join("/");
}

function inferPretUniversalRuleTier(ruleLabel = "") {
    const label = String(ruleLabel || "").toLowerCase();
    if (!label) {
        return PRET_UNIVERSAL_DEFAULT_RULE_TIER;
    }
    const mappedTier = PRET_UNIVERSAL_RULE_TIER_BY_LABEL?.[label];
    if (mappedTier) {
        return mappedTier;
    }
    if (label.startsWith("override")) {
        return "override";
    }
    if (
        label === PRET_UNIVERSAL_DEFAULT_RULE_LABEL
        || label === "unpronounceable root"
    ) {
        return PRET_UNIVERSAL_DEFAULT_RULE_TIER;
    }
    return PRET_UNIVERSAL_DEFAULT_RULE_TIER;
}

const PRET_UNIVERSAL_CONTEXT_CACHE_LIMIT = 1200;
const PRET_UNIVERSAL_CONTEXT_CACHE = new Map();

function resetPretUniversalContextCache() {
    PRET_UNIVERSAL_CONTEXT_CACHE.clear();
}

function getPretUniversalContextCacheSize() {
    return PRET_UNIVERSAL_CONTEXT_CACHE.size;
}

function encodePretContextCacheValue(value) {
    if (value === true) {
        return "1";
    }
    if (value === false || value == null) {
        return "0";
    }
    const raw = String(value || "");
    return `${raw.length}:${raw}`;
}

function buildPretUniversalContextCacheKey(verb, analysisVerb, isTransitive, options = {}) {
    const parts = [
        encodePretContextCacheValue(verb),
        encodePretContextCacheValue(analysisVerb),
        encodePretContextCacheValue(isTransitive === true),
        encodePretContextCacheValue(options.isYawi === true),
        encodePretContextCacheValue(options.isWeya === true),
        encodePretContextCacheValue(options.isBitransitive === true),
        encodePretContextCacheValue(options.hasSlashMarker === true),
        encodePretContextCacheValue(options.hasSuffixSeparator === true),
        encodePretContextCacheValue(options.hasLeadingDash === true),
        encodePretContextCacheValue(options.hasBoundMarker === true),
        encodePretContextCacheValue(options.hasCompoundMarker === true),
        encodePretContextCacheValue(options.boundPrefix || ""),
        encodePretContextCacheValue(options.hasImpersonalTaPrefix === true),
        encodePretContextCacheValue(options.hasOptionalSupportiveI === true),
        encodePretContextCacheValue(options.hasNonspecificValence === true),
        encodePretContextCacheValue(options.exactBaseVerb || ""),
        encodePretContextCacheValue(options.rootPlusYaBase || ""),
        encodePretContextCacheValue(options.rootPlusYaBasePronounceable || ""),
        encodePretContextCacheValue(options.derivationType || ""),
        encodePretContextCacheValue(options.forceClassBOnly === true),
        encodePretContextCacheValue(options.allowUnpronounceableStems === true),
    ];
    return parts.join("|");
}

function clonePretUniversalContext(context) {
    if (!context || typeof context !== "object") {
        return context;
    }
    const clone = { ...context };
    if (context.rightEdgeDescriptor && typeof context.rightEdgeDescriptor === "object") {
        clone.rightEdgeDescriptor = { ...context.rightEdgeDescriptor };
    }
    if (context.verbOverride && typeof context.verbOverride === "object") {
        clone.verbOverride = { ...context.verbOverride };
        if (Array.isArray(context.verbOverride.classes)) {
            clone.verbOverride.classes = context.verbOverride.classes.slice();
        }
    }
    return clone;
}

function formatPretRightEdgeProfile(syllables = []) {
    return (Array.isArray(syllables) ? syllables : [])
        .map((syllable) => String(syllable?.form || ""))
        .filter(Boolean)
        .join("|");
}

function formatPretJuncture(syllables = []) {
    const forms = (Array.isArray(syllables) ? syllables : [])
        .map((syllable) => String(syllable?.form || ""))
        .filter(Boolean);
    if (!forms.length) {
        return "";
    }
    return forms.slice(-2).join("|");
}

function formatPretEndingFamily(syllable = null) {
    if (!syllable || typeof syllable !== "object") {
        return "";
    }
    const onset = syllable.onset || "Ø";
    const nucleus = syllable.nucleus || "Ø";
    return `${onset}+${nucleus}`;
}

function buildPretOrderedRightEdgeDescriptor({
    endingFamily = "",
    rightEdgeProfile = "",
    juncture = "",
    rightEdgeDepth = 0,
    previousForm = "",
    previousOnset = "",
    previousNucleus = "",
    previousCoda = "",
    previousHasCoda = false,
    antepenultimateForm = "",
    antepenultimateOnset = "",
    antepenultimateNucleus = "",
    antepenultimateCoda = "",
    finalOnset = "",
    finalNucleus = "",
    finalCoda = "",
    finalForm = "",
} = {}) {
    return Object.freeze({
        endingFamily,
        rightEdgeProfile,
        juncture,
        rightEdgeDepth,
        previousForm,
        previousOnset,
        previousNucleus,
        previousCoda,
        previousHasCoda,
        antepenultimateForm,
        antepenultimateOnset,
        antepenultimateNucleus,
        antepenultimateCoda,
        finalOnset,
        finalNucleus,
        finalCoda,
        finalForm,
    });
}

function buildPretRightEdgeDescriptor(syllables = []) {
    const safeSyllables = Array.isArray(syllables) ? syllables : [];
    const lastSyllable = safeSyllables[safeSyllables.length - 1] || null;
    const previousSyllable = safeSyllables[safeSyllables.length - 2] || null;
    const antepenultimateSyllable = safeSyllables[safeSyllables.length - 3] || null;
    return buildPretOrderedRightEdgeDescriptor({
        endingFamily: formatPretEndingFamily(lastSyllable),
        rightEdgeProfile: formatPretRightEdgeProfile(safeSyllables),
        juncture: formatPretJuncture(safeSyllables),
        rightEdgeDepth: safeSyllables.length,
        previousForm: previousSyllable?.form || "",
        previousOnset: previousSyllable?.onset || "",
        previousNucleus: previousSyllable?.nucleus || "",
        previousCoda: previousSyllable?.coda || "",
        previousHasCoda: Boolean(previousSyllable?.coda),
        antepenultimateForm: antepenultimateSyllable?.form || "",
        antepenultimateOnset: antepenultimateSyllable?.onset || "",
        antepenultimateNucleus: antepenultimateSyllable?.nucleus || "",
        antepenultimateCoda: antepenultimateSyllable?.coda || "",
        finalOnset: lastSyllable?.onset || "",
        finalNucleus: lastSyllable?.nucleus || "",
        finalCoda: lastSyllable?.coda || "",
        finalForm: lastSyllable?.form || "",
    });
}

function buildPretOrderedRightEdgeQuery({
    endingFamily = "",
    endingFamilies = [],
    rightEdgeProfiles = [],
    rightEdgeProfileSuffixes = [],
    rightEdgeDepth = 0,
    minimumRightEdgeDepth = 0,
    maximumRightEdgeDepth = 0,
    junctures = [],
    finalForm = "",
    finalOnset = "",
    finalOnsets = [],
    finalNucleus = "",
    finalNuclei = [],
    previousForm = "",
    previousForms = [],
    previousOnset = "",
    previousOnsets = [],
    previousNucleus = "",
    previousNuclei = [],
    previousCoda = "",
    previousCodas = [],
    previousHasCoda,
    antepenultimateForm = "",
    antepenultimateForms = [],
} = {}) {
    const query = {};
    if (endingFamily) {
        query.endingFamily = endingFamily;
    }
    if (endingFamilies.length) {
        query.endingFamilies = freezePretDescriptorList(endingFamilies);
    }
    if (rightEdgeProfiles.length) {
        query.rightEdgeProfiles = freezePretDescriptorList(rightEdgeProfiles);
    }
    if (rightEdgeProfileSuffixes.length) {
        query.rightEdgeProfileSuffixes = freezePretDescriptorList(rightEdgeProfileSuffixes);
    }
    if (rightEdgeDepth > 0) {
        query.rightEdgeDepth = rightEdgeDepth;
    }
    if (minimumRightEdgeDepth > 0) {
        query.minimumRightEdgeDepth = minimumRightEdgeDepth;
    }
    if (maximumRightEdgeDepth > 0) {
        query.maximumRightEdgeDepth = maximumRightEdgeDepth;
    }
    if (junctures.length) {
        query.junctures = freezePretDescriptorList(junctures);
    }
    if (finalForm) {
        query.finalForm = finalForm;
    }
    if (finalOnset) {
        query.finalOnset = finalOnset;
    }
    if (finalOnsets.length) {
        query.finalOnsets = freezePretDescriptorList(finalOnsets);
    }
    if (finalNucleus) {
        query.finalNucleus = finalNucleus;
    }
    if (finalNuclei.length) {
        query.finalNuclei = freezePretDescriptorList(finalNuclei);
    }
    if (previousForm) {
        query.previousForm = previousForm;
    }
    if (previousForms.length) {
        query.previousForms = freezePretDescriptorList(previousForms);
    }
    if (previousOnset) {
        query.previousOnset = previousOnset;
    }
    if (previousOnsets.length) {
        query.previousOnsets = freezePretDescriptorList(previousOnsets);
    }
    if (previousNucleus) {
        query.previousNucleus = previousNucleus;
    }
    if (previousNuclei.length) {
        query.previousNuclei = freezePretDescriptorList(previousNuclei);
    }
    if (previousCoda) {
        query.previousCoda = previousCoda;
    }
    if (previousCodas.length) {
        query.previousCodas = freezePretDescriptorList(previousCodas);
    }
    if (typeof previousHasCoda === "boolean") {
        query.previousHasCoda = previousHasCoda;
    }
    if (antepenultimateForm) {
        query.antepenultimateForm = antepenultimateForm;
    }
    if (antepenultimateForms.length) {
        query.antepenultimateForms = freezePretDescriptorList(antepenultimateForms);
    }
    return Object.freeze(query);
}

function normalizePretRightEdgeQuery(query = {}) {
    if (!query || typeof query !== "object") {
        return Object.freeze({});
    }
    return buildPretOrderedRightEdgeQuery({
        endingFamily: query.endingFamily || "",
        endingFamilies: Array.isArray(query.endingFamilies) ? query.endingFamilies : [],
        rightEdgeProfiles: Array.isArray(query.rightEdgeProfiles)
            ? query.rightEdgeProfiles
            : (query.rightEdgeProfile ? [query.rightEdgeProfile] : []),
        rightEdgeProfileSuffixes: Array.isArray(query.rightEdgeProfileSuffixes)
            ? query.rightEdgeProfileSuffixes
            : (query.rightEdgeProfileSuffix ? [query.rightEdgeProfileSuffix] : []),
        rightEdgeDepth: Number.isInteger(query.rightEdgeDepth) ? query.rightEdgeDepth : 0,
        minimumRightEdgeDepth: Number.isInteger(query.minimumRightEdgeDepth) ? query.minimumRightEdgeDepth : 0,
        maximumRightEdgeDepth: Number.isInteger(query.maximumRightEdgeDepth) ? query.maximumRightEdgeDepth : 0,
        junctures: Array.isArray(query.junctures)
            ? query.junctures
            : (query.juncture ? [query.juncture] : []),
        finalForm: query.finalForm || "",
        finalOnset: query.finalOnset || "",
        finalOnsets: Array.isArray(query.finalOnsets) ? query.finalOnsets : [],
        finalNucleus: query.finalNucleus || "",
        finalNuclei: Array.isArray(query.finalNuclei) ? query.finalNuclei : [],
        previousForm: query.previousForm || "",
        previousForms: Array.isArray(query.previousForms) ? query.previousForms : [],
        previousOnset: query.previousOnset || "",
        previousOnsets: Array.isArray(query.previousOnsets) ? query.previousOnsets : [],
        previousNucleus: query.previousNucleus || "",
        previousNuclei: Array.isArray(query.previousNuclei) ? query.previousNuclei : [],
        previousCoda: query.previousCoda || "",
        previousCodas: Array.isArray(query.previousCodas) ? query.previousCodas : [],
        previousHasCoda: query.previousHasCoda,
        antepenultimateForm: query.antepenultimateForm || "",
        antepenultimateForms: Array.isArray(query.antepenultimateForms) ? query.antepenultimateForms : [],
    });
}

function pretRightEdgeDescriptorMatchesQuery(descriptor, query = {}) {
    if (!descriptor || !query || typeof query !== "object") {
        return false;
    }
    const orderedQuery = normalizePretRightEdgeQuery(query);
    const endingFamilies = Array.isArray(orderedQuery.endingFamilies)
        ? orderedQuery.endingFamilies
        : (orderedQuery.endingFamily ? [orderedQuery.endingFamily] : []);
    if (endingFamilies.length && !endingFamilies.includes(descriptor.endingFamily)) {
        return false;
    }
    const rightEdgeProfiles = Array.isArray(orderedQuery.rightEdgeProfiles) ? orderedQuery.rightEdgeProfiles : [];
    if (rightEdgeProfiles.length && !rightEdgeProfiles.includes(descriptor.rightEdgeProfile)) {
        return false;
    }
    const rightEdgeProfileSuffixes = Array.isArray(orderedQuery.rightEdgeProfileSuffixes)
        ? orderedQuery.rightEdgeProfileSuffixes
        : [];
    if (
        rightEdgeProfileSuffixes.length
        && !rightEdgeProfileSuffixes.some((suffix) => descriptor.rightEdgeProfile === suffix || descriptor.rightEdgeProfile.endsWith(`|${suffix}`))
    ) {
        return false;
    }
    if (orderedQuery.rightEdgeDepth && descriptor.rightEdgeDepth !== orderedQuery.rightEdgeDepth) {
        return false;
    }
    if (orderedQuery.minimumRightEdgeDepth && descriptor.rightEdgeDepth < orderedQuery.minimumRightEdgeDepth) {
        return false;
    }
    if (orderedQuery.maximumRightEdgeDepth && descriptor.rightEdgeDepth > orderedQuery.maximumRightEdgeDepth) {
        return false;
    }
    const junctures = Array.isArray(orderedQuery.junctures) ? orderedQuery.junctures : [];
    if (junctures.length && !junctures.includes(descriptor.juncture)) {
        return false;
    }
    if (orderedQuery.finalForm && descriptor.finalForm !== orderedQuery.finalForm) {
        return false;
    }
    const finalOnsets = Array.isArray(orderedQuery.finalOnsets)
        ? orderedQuery.finalOnsets
        : (orderedQuery.finalOnset ? [orderedQuery.finalOnset] : []);
    if (finalOnsets.length && !finalOnsets.includes(descriptor.finalOnset)) {
        return false;
    }
    const finalNuclei = Array.isArray(orderedQuery.finalNuclei)
        ? orderedQuery.finalNuclei
        : (orderedQuery.finalNucleus ? [orderedQuery.finalNucleus] : []);
    if (finalNuclei.length && !finalNuclei.includes(descriptor.finalNucleus)) {
        return false;
    }
    const previousForms = Array.isArray(orderedQuery.previousForms)
        ? orderedQuery.previousForms
        : (orderedQuery.previousForm ? [orderedQuery.previousForm] : []);
    if (previousForms.length && !previousForms.includes(descriptor.previousForm)) {
        return false;
    }
    const previousOnsets = Array.isArray(orderedQuery.previousOnsets)
        ? orderedQuery.previousOnsets
        : (orderedQuery.previousOnset ? [orderedQuery.previousOnset] : []);
    if (previousOnsets.length && !previousOnsets.includes(descriptor.previousOnset)) {
        return false;
    }
    const previousNuclei = Array.isArray(orderedQuery.previousNuclei)
        ? orderedQuery.previousNuclei
        : (orderedQuery.previousNucleus ? [orderedQuery.previousNucleus] : []);
    if (previousNuclei.length && !previousNuclei.includes(descriptor.previousNucleus)) {
        return false;
    }
    const previousCodas = Array.isArray(orderedQuery.previousCodas)
        ? orderedQuery.previousCodas
        : (orderedQuery.previousCoda ? [orderedQuery.previousCoda] : []);
    if (previousCodas.length && !previousCodas.includes(descriptor.previousCoda)) {
        return false;
    }
    if (
        Object.prototype.hasOwnProperty.call(orderedQuery, "previousHasCoda")
        && descriptor.previousHasCoda !== Boolean(orderedQuery.previousHasCoda)
    ) {
        return false;
    }
    const antepenultimateForms = Array.isArray(orderedQuery.antepenultimateForms)
        ? orderedQuery.antepenultimateForms
        : (orderedQuery.antepenultimateForm ? [orderedQuery.antepenultimateForm] : []);
    if (antepenultimateForms.length && !antepenultimateForms.includes(descriptor.antepenultimateForm)) {
        return false;
    }
    return true;
}

function pretContextHasRightEdge(context, query = {}) {
    return pretRightEdgeDescriptorMatchesQuery(context?.rightEdgeDescriptor, query);
}

function pretContextHasAnyRightEdge(context, queries = []) {
    return (Array.isArray(queries) ? queries : []).some((query) => (
        pretContextHasRightEdge(context, query)
    ));
}

function freezePretDescriptorList(list = []) {
    return Object.freeze(Array.isArray(list) ? list.slice() : []);
}

function buildPretJuncturesFromProfiles(rightEdgeProfiles = []) {
    const junctures = [];
    const seen = new Set();
    for (const profile of rightEdgeProfiles) {
        const parts = String(profile || "").split("|").filter(Boolean);
        if (!parts.length) {
            continue;
        }
        const juncture = parts.slice(-2).join("|");
        if (!juncture || seen.has(juncture)) {
            continue;
        }
        seen.add(juncture);
        junctures.push(juncture);
    }
    return freezePretDescriptorList(junctures);
}

function buildPretOrderedDescriptorQuery({
    endingFamily = "",
    rightEdgeProfiles = [],
    junctures = [],
    modifierSet = null,
    modifiers = [],
    excludeModifiers = [],
} = {}) {
    const query = {};
    if (endingFamily) {
        query.endingFamily = endingFamily;
    }
    if (rightEdgeProfiles.length) {
        query.rightEdgeProfiles = freezePretDescriptorList(rightEdgeProfiles);
    }
    if (junctures.length) {
        query.junctures = freezePretDescriptorList(junctures);
    }
    if (modifierSet !== null) {
        query.modifierSet = freezePretDescriptorList(modifierSet);
    }
    if (modifiers.length) {
        query.modifiers = freezePretDescriptorList(modifiers);
    }
    if (excludeModifiers.length) {
        query.excludeModifiers = freezePretDescriptorList(excludeModifiers);
    }
    return Object.freeze(query);
}

function normalizePretDescriptorQuery(query = {}) {
    if (!query || typeof query !== "object") {
        return Object.freeze({});
    }
    return buildPretOrderedDescriptorQuery({
        rightEdgeProfiles: Array.isArray(query.rightEdgeProfiles)
            ? query.rightEdgeProfiles
            : (query.rightEdgeProfile ? [query.rightEdgeProfile] : []),
        junctures: Array.isArray(query.junctures)
            ? query.junctures
            : (query.juncture ? [query.juncture] : []),
        endingFamily: query.endingFamily || "",
        modifierSet: Object.prototype.hasOwnProperty.call(query, "modifierSet")
            ? (Array.isArray(query.modifierSet) ? query.modifierSet : [])
            : null,
        modifiers: Array.isArray(query.modifiers) ? query.modifiers : [],
        excludeModifiers: Array.isArray(query.excludeModifiers) ? query.excludeModifiers : [],
    });
}

function makePretDescriptorQuery(endingFamily = "", rightEdgeProfileOrProfiles = null, options = {}) {
    const rightEdgeProfiles = Array.isArray(rightEdgeProfileOrProfiles)
        ? rightEdgeProfileOrProfiles.filter(Boolean)
        : (rightEdgeProfileOrProfiles ? [String(rightEdgeProfileOrProfiles)] : []);
    const modifierSet = Object.prototype.hasOwnProperty.call(options, "modifierSet")
        ? (Array.isArray(options.modifierSet) ? options.modifierSet.filter(Boolean) : [])
        : null;
    const modifiers = Array.isArray(options.modifiers)
        ? options.modifiers.filter(Boolean)
        : [];
    const descriptorModifiers = modifierSet !== null ? modifierSet : modifiers;
    const junctures = Array.isArray(options.junctures)
        ? options.junctures.filter(Boolean)
        : (options.juncture ? [String(options.juncture)] : buildPretJuncturesFromProfiles(rightEdgeProfiles));
    return buildPretOrderedDescriptorQuery({
        rightEdgeProfiles,
        junctures,
        endingFamily,
        modifierSet,
        modifiers: descriptorModifiers,
        excludeModifiers: Array.isArray(options.excludeModifiers)
            ? options.excludeModifiers.filter(Boolean)
            : [],
    });
}

function pretDescriptorMatchesQuery(descriptor, query = {}) {
    if (!descriptor || !query || typeof query !== "object") {
        return false;
    }
    const orderedQuery = normalizePretDescriptorQuery(query);
    const descriptorModifiers = Array.isArray(descriptor.modifiers) ? descriptor.modifiers : [];
    const descriptorProfiles = Array.isArray(descriptor.rightEdgeProfiles) ? descriptor.rightEdgeProfiles : [];
    const descriptorJunctures = Array.isArray(descriptor.junctures) ? descriptor.junctures : [];
    const endingFamilies = Array.isArray(query.endingFamilies)
        ? query.endingFamilies
        : (orderedQuery.endingFamily ? [orderedQuery.endingFamily] : []);
    if (endingFamilies.length && !endingFamilies.includes(descriptor.endingFamily)) {
        return false;
    }
    const profiles = Array.isArray(orderedQuery.rightEdgeProfiles)
        ? orderedQuery.rightEdgeProfiles
        : (orderedQuery.rightEdgeProfile ? [orderedQuery.rightEdgeProfile] : []);
    if (profiles.length && !profiles.some((profile) => descriptorProfiles.includes(profile))) {
        return false;
    }
    const junctures = Array.isArray(orderedQuery.junctures)
        ? orderedQuery.junctures
        : (orderedQuery.juncture ? [orderedQuery.juncture] : []);
    if (junctures.length && !junctures.some((value) => descriptorJunctures.includes(value))) {
        return false;
    }
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
    if (Object.prototype.hasOwnProperty.call(orderedQuery, "modifierSet")) {
        const expectedModifiers = Array.isArray(orderedQuery.modifierSet) ? orderedQuery.modifierSet : [];
        if (descriptorModifiers.length !== expectedModifiers.length) {
            return false;
        }
        if (!expectedModifiers.every((modifier) => descriptorModifiers.includes(modifier))) {
            return false;
        }
    }
    return true;
}

function pretDescriptorListHasQuery(descriptors = [], query = {}) {
    return (Array.isArray(descriptors) ? descriptors : []).some((descriptor) => (
        pretDescriptorMatchesQuery(descriptor, query)
    ));
}

function pretDescriptorListHasAnyQuery(descriptors = [], queries = []) {
    return (Array.isArray(queries) ? queries : []).some((query) => (
        pretDescriptorListHasQuery(descriptors, query)
    ));
}

function formatPretDescriptorLabel(descriptor, options = {}) {
    if (!descriptor || typeof descriptor !== "object") {
        return "";
    }
    const activeProfile = options.activeRightEdgeProfile
        && Array.isArray(descriptor.rightEdgeProfiles)
        && descriptor.rightEdgeProfiles.includes(options.activeRightEdgeProfile)
        ? options.activeRightEdgeProfile
        : (descriptor.rightEdgeProfiles?.[0] || "");
    const parts = [];
    if (descriptor.endingFamily) {
        parts.push(descriptor.endingFamily);
    }
    if (activeProfile) {
        parts.push(activeProfile);
    }
    const modifiers = Array.isArray(descriptor.modifiers)
        ? descriptor.modifiers.filter((modifier) => modifier !== "aggregate")
        : [];
    return parts.concat(modifiers).join(" · ");
}

const PRET_DESCRIPTOR_QUERIES = Object.freeze({
    shape: Object.freeze({
        cvv: makePretDescriptorQuery("Ø+*", "CV|V", { modifierSet: [] }),
        vv: makePretDescriptorQuery("Ø+*", "V|V", { modifierSet: [] }),
        vlv: makePretDescriptorQuery("Ø+*", "Vl|V", { modifierSet: [] }),
        cvlv: makePretDescriptorQuery("Ø+*", "CVl|V", { modifierSet: [] }),
        ca: makePretDescriptorQuery("*+a", "CV", { modifierSet: [] }),
        ti: makePretDescriptorQuery("t+i", "CV", { modifierSet: [] }),
        vna: makePretDescriptorQuery("n+a", "V|CV", { modifierSet: [] }),
        cvna: makePretDescriptorQuery("n+a", "CV|CV", { modifierSet: [] }),
        cvcvna: makePretDescriptorQuery("n+a", "CV|CV|CV", { modifierSet: [] }),
        cvlvna: makePretDescriptorQuery("n+a", "CVl|V|CV", { modifierSet: [] }),
        vlcvna: makePretDescriptorQuery("n+a", "Vl|CV|CV", { modifierSet: [] }),
        cvccvna: makePretDescriptorQuery("n+a", "CV|C|CV|CV", { modifierSet: [] }),
        cvcvcvna: makePretDescriptorQuery("n+a", "CV|CV|CV|CV", { modifierSet: [] }),
        cvccvcvna: makePretDescriptorQuery("n+a", "CV|C|CV|CV|CV", { modifierSet: [] }),
        vjcvna: makePretDescriptorQuery("n+a", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        longNa: makePretDescriptorQuery("n+a", "...|CV", { modifierSet: ["long"] }),
        cvta: makePretDescriptorQuery("t+a", "CV|CV", { modifierSet: [] }),
        cvtza: makePretDescriptorQuery("tz+a", "CV|CV", { modifierSet: [] }),
        vjcvtza: makePretDescriptorQuery("tz+a", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        cvnia: makePretDescriptorQuery("n+ia", "CV|CV|V", { modifierSet: [] }),
        cvcvnia: makePretDescriptorQuery("n+ia", "CV|CV|CV|V", { modifierSet: [] }),
        cvlvnia: makePretDescriptorQuery("n+ia", "CVl|V|CV|V", { modifierSet: [] }),
        vjcvnia: makePretDescriptorQuery("n+ia", ["Vj|CV|CV|V", "V|C|CV|CV|V"], { modifierSet: [] }),
        cvlvni: makePretDescriptorQuery("n+i", "CVl|V|CV", { modifierSet: [] }),
        vjcvni: makePretDescriptorQuery("n+i", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        cvcvni: makePretDescriptorQuery("n+i", "CV|CV|CV", { modifierSet: [] }),
        cvcvcvni: makePretDescriptorQuery("n+i", "CV|CV|CV|CV", { modifierSet: [] }),
        cvccvcvni: makePretDescriptorQuery("n+i", "CV|C|CV|CV|CV", { modifierSet: [] }),
        cvcvcvcvni: makePretDescriptorQuery("n+i", "CV|CV|CV|CV|CV", { modifierSet: [] }),
        cvvni: makePretDescriptorQuery("n+i", "CV|V|CV", { modifierSet: [] }),
        cvni: makePretDescriptorQuery("n+i", "CV|CV", { modifierSet: [] }),
        cvniU: makePretDescriptorQuery("n+i", "CV|CV", { modifierSet: ["leadNucleus=u"] }),
        longNi: makePretDescriptorQuery("n+i", "...|CV", { modifierSet: ["long"] }),
        vnV: makePretDescriptorQuery("n+*", "V|CV", { modifierSet: [] }),
        cvnV: makePretDescriptorQuery("n+*", "CV|CV", { modifierSet: [] }),
        cvsV: makePretDescriptorQuery("s+*", "CV|CV", { modifierSet: [] }),
        cvpV: makePretDescriptorQuery("p+*", "CV|CV", { modifierSet: [] }),
        cvmV: makePretDescriptorQuery("m+*", "CV|CV", { modifierSet: [] }),
        cvma: makePretDescriptorQuery("m+a", "CV|CV", { modifierSet: [] }),
        vjcvma: makePretDescriptorQuery("m+a", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        vwi: makePretDescriptorQuery("w+i", "V|CV", { modifierSet: [] }),
        cvwi: makePretDescriptorQuery("w+i", "CV|CV", { modifierSet: [] }),
        ccvwi: makePretDescriptorQuery("w+i", "C|CV", { modifierSet: [] }),
        vccvwiShort: makePretDescriptorQuery("w+i", "V|C|CV", { modifierSet: [] }),
        vcvwi: makePretDescriptorQuery("w+i", "V|CV|CV", { modifierSet: [] }),
        vlvwi: makePretDescriptorQuery("w+i", "Vl|V|CV", { modifierSet: [] }),
        cvcvwi: makePretDescriptorQuery("w+i", "CV|CV|CV", { modifierSet: [] }),
        cvlvwi: makePretDescriptorQuery("w+i", "CVl|V|CV", { modifierSet: [] }),
        vlcvwi: makePretDescriptorQuery("w+i", "Vl|CV|CV", { modifierSet: [] }),
        cvcvcvwi: makePretDescriptorQuery("w+i", "CV|CV|CV|CV", { modifierSet: [] }),
        vccvwi: makePretDescriptorQuery("w+i", "V|C|CV|CV", { modifierSet: [] }),
        cvjcvwi: makePretDescriptorQuery("w+i", "CVj|CV|CV", { modifierSet: [] }),
        cvcvlvwi: makePretDescriptorQuery("w+i", "CV|CVl|V|CV", { modifierSet: [] }),
        cvccvwi: makePretDescriptorQuery("w+i", "CV|C|CV|CV", { modifierSet: [] }),
        cvccvcvwi: makePretDescriptorQuery("w+i", "CV|C|CV|CV|CV", { modifierSet: [] }),
        cvlcvcvwi: makePretDescriptorQuery("w+i", "CVl|CV|CV|CV", { modifierSet: [] }),
        vjcvwi: makePretDescriptorQuery("w+i", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        vjcvcvwi: makePretDescriptorQuery("w+i", "Vj|CV|CV|CV", { modifierSet: [] }),
        cvvjcvwi: makePretDescriptorQuery("w+i", "CV|Vj|CV|CV", { modifierSet: [] }),
        longWi: makePretDescriptorQuery("w+i", "...|CV", { modifierSet: ["long"] }),
        cvkwi: makePretDescriptorQuery("kw+i", "CV|CV", { modifierSet: [] }),
        vcvcu: makePretDescriptorQuery("*+u", "V|CV|CV", { modifierSet: [] }),
        vwa: makePretDescriptorQuery("w+a", "V|CV", { modifierSet: [] }),
        vjwa: makePretDescriptorQuery("w+a", "Vj|CV", { modifierSet: [] }),
        cvwa: makePretDescriptorQuery("w+a", "CV|CV", { modifierSet: [] }),
        vccvwa: makePretDescriptorQuery("w+a", "V|C|CV", { modifierSet: [] }),
        cvwaA: makePretDescriptorQuery("w+a", "CV|CV", { modifierSet: ["leadNucleus=a"] }),
        cvwaI: makePretDescriptorQuery("w+a", "CV|CV", { modifierSet: ["leadNucleus=i"] }),
        cewa: makePretDescriptorQuery("w+a", "CV|CV", { modifierSet: ["leadNucleus=e"] }),
        vccawa: makePretDescriptorQuery("w+a", "V|C|CV|CV", { modifierSet: ["bridgeNucleus=a"] }),
        cuwa: makePretDescriptorQuery("w+a", "CV|CV", { modifierSet: ["leadNucleus=u"] }),
        vwaI: makePretDescriptorQuery("w+a", "V|CV", { modifierSet: ["leadNucleus=i"] }),
        vjcvwa: makePretDescriptorQuery("w+a", ["Vj|CV|CV", "V|C|CV|CV"], { modifierSet: [] }),
        cvjcvwa: makePretDescriptorQuery("w+a", "CVj|CV|CV", { modifierSet: [] }),
        cvcawa: makePretDescriptorQuery("w+a", "CV|CV|CV", { modifierSet: ["bridgeNucleus=a"] }),
        cvcvwa: makePretDescriptorQuery("w+a", "CV|CV|CV", { modifierSet: [] }),
        cvcvewa: makePretDescriptorQuery("w+a", "CV|CV|CV", { modifierSet: ["bridgeNucleus=e"] }),
        vjcewa: makePretDescriptorQuery("w+a", "Vj|CV|CV", { modifierSet: ["bridgeNucleus=e"] }),
        cvlewa: makePretDescriptorQuery("w+a", "CVl|V|CV", { modifierSet: ["bridgeNucleus=e"] }),
        cvlawa: makePretDescriptorQuery("w+a", "CVl|V|CV", { modifierSet: ["bridgeNucleus=a"] }),
        vlvwa: makePretDescriptorQuery("w+a", "Vl|V|CV", { modifierSet: [] }),
        cvlvwa: makePretDescriptorQuery("w+a", "CVl|V|CV", { modifierSet: [] }),
        vlcvwa: makePretDescriptorQuery("w+a", "Vl|CV|CV", { modifierSet: [] }),
        cvccvwa: makePretDescriptorQuery("w+a", "CV|C|CV|CV", { modifierSet: [] }),
        cvcvcvwa: makePretDescriptorQuery("w+a", "CV|CV|CV|CV", { modifierSet: [] }),
        cvccvcvwa: makePretDescriptorQuery("w+a", "CV|C|CV|CV|CV", { modifierSet: [] }),
        cvlcvcvwa: makePretDescriptorQuery("w+a", "CVl|CV|CV|CV", { modifierSet: [] }),
        vccvcvwa: makePretDescriptorQuery("w+a", "V|C|CV|CV|CV", { modifierSet: [] }),
        longWa: makePretDescriptorQuery("w+a", "...|CV", { modifierSet: ["long"] }),
    }),
    aggregate: Object.freeze({
        wiPattern: makePretDescriptorQuery("w+i", null, { modifierSet: ["aggregate"] }),
        waPattern: makePretDescriptorQuery("w+a", null, { modifierSet: ["aggregate"] }),
        ewaPattern: makePretDescriptorQuery("w+a", null, { modifierSet: ["aggregate", "bridgeNucleus=e"] }),
        lwaPattern: makePretDescriptorQuery("w+a", null, { modifierSet: ["aggregate", "l-bridge"] }),
        kawa: makePretDescriptorQuery("w+a", null, {
            modifierSet: ["aggregate", "leadOnset=k", "leadNucleus=a"],
        }),
    }),
});

const PRET_DERIVED_SHAPE_DESCRIPTOR_SPECS = Object.freeze([
    Object.freeze({ descriptorKey: "cvniU", baseKey: "cvni", leadingNucleus: "u" }),
    Object.freeze({ descriptorKey: "cvwaA", baseKey: "cvwa", leadingNucleus: "a" }),
    Object.freeze({ descriptorKey: "cvwaI", baseKey: "cvwa", leadingNucleus: "i" }),
    Object.freeze({ descriptorKey: "cuwa", baseKey: "cvwa", leadingNucleus: "u" }),
    Object.freeze({ descriptorKey: "vwaI", baseKey: "vwa", leadingNucleus: "i" }),
]);

const PRET_RIGHT_EDGE_RULE_QUERIES = Object.freeze({
    naCV_CV_CV: buildPretOrderedRightEdgeQuery({
        endingFamily: "n+a",
        rightEdgeProfiles: ["CV|CV|CV"],
    }),
    naCV_CV_CV_CV: buildPretOrderedRightEdgeQuery({
        endingFamily: "n+a",
        rightEdgeProfiles: ["CV|CV|CV|CV"],
    }),
    naDepthAtLeastFour: buildPretOrderedRightEdgeQuery({
        endingFamily: "n+a",
        minimumRightEdgeDepth: 4,
    }),
    wiV_CV_CV: buildPretOrderedRightEdgeQuery({
        endingFamily: "w+i",
        rightEdgeProfiles: ["V|CV|CV"],
    }),
    wiCV_CV_CV: buildPretOrderedRightEdgeQuery({
        endingFamily: "w+i",
        rightEdgeProfiles: ["CV|CV|CV"],
    }),
    waCV_CV_CV: buildPretOrderedRightEdgeQuery({
        endingFamily: "w+a",
        rightEdgeProfiles: ["CV|CV|CV"],
    }),
});

const PRET_AGGREGATE_DESCRIPTOR_SPECS = Object.freeze([
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.shape.vwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvwi,
            PRET_DESCRIPTOR_QUERIES.shape.vcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.vlvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvlvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.vccvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvjcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvlvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvccvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvccvcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvlcvcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.vjcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.vjcvcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.cvvjcvwi,
            PRET_DESCRIPTOR_QUERIES.shape.longWi,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.waPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.shape.cvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvwa,
            PRET_DESCRIPTOR_QUERIES.shape.vccvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvccvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvcvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvccvcvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvlcvcvwa,
            PRET_DESCRIPTOR_QUERIES.shape.vccvcvwa,
            PRET_DESCRIPTOR_QUERIES.shape.longWa,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.ewaPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.shape.cewa,
            PRET_DESCRIPTOR_QUERIES.shape.cvcvewa,
            PRET_DESCRIPTOR_QUERIES.shape.vjcewa,
            PRET_DESCRIPTOR_QUERIES.shape.cvlewa,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.lwaPattern,
        sourceQueries: Object.freeze([
            PRET_DESCRIPTOR_QUERIES.shape.vlvwa,
            PRET_DESCRIPTOR_QUERIES.shape.cvlvwa,
        ]),
    }),
    Object.freeze({
        descriptor: PRET_DESCRIPTOR_QUERIES.aggregate.kawa,
        matcher: (shapeDescriptors = [], runtimeState = {}) => (
            pretDescriptorListHasQuery(shapeDescriptors, PRET_DESCRIPTOR_QUERIES.shape.cvwaA)
            && runtimeState.leadingOnset === "k"
        ),
    }),
]);

function pretEndingFamilyMatchesPattern(actualFamily = "", expectedFamily = "") {
    if (!expectedFamily) {
        return true;
    }
    const [actualOnset = "", actualNucleus = ""] = String(actualFamily || "").split("+");
    const [expectedOnset = "", expectedNucleus = ""] = String(expectedFamily || "").split("+");
    const onsetMatches = expectedOnset === "*" || actualOnset === expectedOnset;
    const nucleusMatches = expectedNucleus === "*" || actualNucleus === expectedNucleus;
    return onsetMatches && nucleusMatches;
}

function pretRightEdgeProfileMatchesSyllableWindow(profile = "", syllables = [], startIndex = 0) {
    const windowSyllables = (Array.isArray(syllables) ? syllables : []).slice(startIndex);
    const windowForms = windowSyllables.map((syllable) => String(syllable?.form || "")).filter(Boolean);
    const profileParts = String(profile || "").split("|").filter(Boolean);
    if (!windowForms.length || !profileParts.length) {
        return false;
    }
    if (profileParts[0] === "...") {
        const suffixParts = profileParts.slice(1);
        if (!suffixParts.length || windowForms.length < suffixParts.length) {
            return false;
        }
        return suffixParts.every((part, index) => (
            windowForms[windowForms.length - suffixParts.length + index] === part
        ));
    }
    if (windowForms.length !== profileParts.length) {
        return false;
    }
    return profileParts.every((part, index) => windowForms[index] === part);
}

function pretShapeModifiersMatchSyllableWindow(query = {}, syllables = [], startIndex = 0) {
    const windowSyllables = (Array.isArray(syllables) ? syllables : []).slice(startIndex);
    const modifiers = Array.isArray(query?.modifiers) ? query.modifiers : [];
    if (!modifiers.length) {
        return true;
    }
    const leadSyllable = windowSyllables[0] || null;
    const bridgeSyllable = windowSyllables[windowSyllables.length - 2] || null;
    return modifiers.every((modifier) => {
        if (modifier === "long") {
            return windowSyllables.length >= 4;
        }
        if (modifier === "aggregate" || modifier === "l-bridge") {
            return true;
        }
        if (modifier.startsWith("leadNucleus=")) {
            return (leadSyllable?.nucleus || "") === modifier.slice("leadNucleus=".length);
        }
        if (modifier.startsWith("leadOnset=")) {
            return (leadSyllable?.onset || "") === modifier.slice("leadOnset=".length);
        }
        if (modifier.startsWith("bridgeNucleus=")) {
            return (bridgeSyllable?.nucleus || "") === modifier.slice("bridgeNucleus=".length);
        }
        return true;
    });
}

function pretShapeDescriptorMatchesSyllableWindow(query = {}, syllables = [], startIndex = 0) {
    const windowSyllables = (Array.isArray(syllables) ? syllables : []).slice(startIndex);
    if (!windowSyllables.length) {
        return false;
    }
    const normalizedQuery = normalizePretDescriptorQuery(query);
    const rightEdgeProfiles = Array.isArray(normalizedQuery.rightEdgeProfiles)
        ? normalizedQuery.rightEdgeProfiles
        : [];
    if (
        rightEdgeProfiles.length
        && !rightEdgeProfiles.some((profile) => pretRightEdgeProfileMatchesSyllableWindow(profile, windowSyllables, 0))
    ) {
        return false;
    }
    const actualEndingFamily = formatPretEndingFamily(windowSyllables[windowSyllables.length - 1]);
    if (!pretEndingFamilyMatchesPattern(actualEndingFamily, normalizedQuery.endingFamily || "")) {
        return false;
    }
    return pretShapeModifiersMatchSyllableWindow(normalizedQuery, windowSyllables, 0);
}

const PRET_SHAPE_SOURCE_OPTIONS = Object.freeze({
    cvta: Object.freeze({ includeRawReduplicatedSource: true }),
    vcvcu: Object.freeze({ includeSupportiveSource: false }),
    vnV: Object.freeze({
        extraSources: Object.freeze([
            Object.freeze({ source: "syllables", startIndex: 1, prefixForms: Object.freeze(["V", "Vj"]) }),
        ]),
    }),
    cvnV: Object.freeze({
        extraSources: Object.freeze([
            Object.freeze({ source: "syllables", startIndex: 1, prefixForms: Object.freeze(["CV", "CVj"]) }),
        ]),
    }),
    cvsV: Object.freeze({
        extraSources: Object.freeze([
            Object.freeze({ source: "syllables", startIndex: 1, prefixForms: Object.freeze(["CV", "CVj"]) }),
        ]),
    }),
    cvmV: Object.freeze({
        extraSources: Object.freeze([
            Object.freeze({ source: "syllables", startIndex: 1, prefixForms: Object.freeze(["CV", "CVj"]) }),
        ]),
    }),
});

function pretShapeDescriptorMatchesSources(shapeKey = "", query = {}, {
    syllables = [],
    analysisSyllables = [],
    supportiveSyllables = null,
    rawSyllables = [],
    baseIsReduplicated = false,
} = {}) {
    const options = PRET_SHAPE_SOURCE_OPTIONS[shapeKey] || {};
    const availableSources = Object.freeze({
        syllables,
        analysisSyllables,
        supportiveSyllables,
        rawSyllables,
    });
    const sourceMatches = (sourceSyllables = [], startIndex = 0, prefixForms = []) => {
        if (!Array.isArray(sourceSyllables) || !sourceSyllables.length) {
            return false;
        }
        if (Array.isArray(prefixForms) && prefixForms.length) {
            const prefixForm = sourceSyllables[startIndex - 1]?.form || "";
            if (!prefixForms.includes(prefixForm)) {
                return false;
            }
        }
        return pretShapeDescriptorMatchesSyllableWindow(query, sourceSyllables, startIndex);
    };
    if (pretShapeDescriptorMatchesSyllableWindow(query, syllables, 0)) {
        return true;
    }
    if (baseIsReduplicated && pretShapeDescriptorMatchesSyllableWindow(query, analysisSyllables, 1)) {
        return true;
    }
    if (
        options.includeRawReduplicatedSource === true
        && baseIsReduplicated
        && pretShapeDescriptorMatchesSyllableWindow(query, rawSyllables, 0)
    ) {
        return true;
    }
    if (
        options.includeSupportiveSource !== false
        && supportiveSyllables
        && pretShapeDescriptorMatchesSyllableWindow(query, supportiveSyllables, 0)
    ) {
        return true;
    }
    const extraSources = Array.isArray(options.extraSources) ? options.extraSources : [];
    for (const extraSource of extraSources) {
        const sourceName = extraSource?.source || "";
        if (!sourceName || !Object.prototype.hasOwnProperty.call(availableSources, sourceName)) {
            continue;
        }
        if (
            sourceMatches(
                availableSources[sourceName],
                Number.isInteger(extraSource?.startIndex) ? extraSource.startIndex : 0,
                Array.isArray(extraSource?.prefixForms) ? extraSource.prefixForms : [],
            )
        ) {
            return true;
        }
    }
    return false;
}

function pretShapeHasRedupPrefix(query = {}, syllables = [], prefixForms = []) {
    if (!Array.isArray(syllables) || !syllables.length) {
        return false;
    }
    const prefixForm = syllables[0]?.form || "";
    if (!Array.isArray(prefixForms) || !prefixForms.includes(prefixForm)) {
        return false;
    }
    return pretShapeDescriptorMatchesSyllableWindow(query, syllables, 1);
}

function buildPretActiveShapeDescriptors(shapeQueries = PRET_DESCRIPTOR_QUERIES.shape, {
    syllables = [],
    analysisSyllables = [],
    supportiveSyllables = null,
    rawSyllables = [],
    baseIsReduplicated = false,
    leadingNucleus = "",
} = {}) {
    const activeDescriptors = [];
    const derivedKeys = new Set(PRET_DERIVED_SHAPE_DESCRIPTOR_SPECS.map((spec) => spec.descriptorKey));
    const activate = (query) => {
        if (query && !pretDescriptorListHasQuery(activeDescriptors, query)) {
            activeDescriptors.push(query);
        }
    };
    const hasShape = (query) => pretDescriptorListHasQuery(activeDescriptors, query);
    Object.entries(shapeQueries).forEach(([shapeKey, query]) => {
        if (derivedKeys.has(shapeKey)) {
            return;
        }
        if (
            pretShapeDescriptorMatchesSources(shapeKey, query, {
                syllables,
                analysisSyllables,
                supportiveSyllables,
                rawSyllables,
                baseIsReduplicated,
            })
        ) {
            activate(query);
        }
    });
    PRET_DERIVED_SHAPE_DESCRIPTOR_SPECS.forEach((spec) => {
        if (leadingNucleus !== spec.leadingNucleus) {
            return;
        }
        const baseDescriptor = shapeQueries[spec.baseKey];
        if (!hasShape(baseDescriptor)) {
            return;
        }
        activate(shapeQueries[spec.descriptorKey]);
    });
    if (hasShape(shapeQueries.vna) || hasShape(shapeQueries.cvna)) {
        return Object.freeze(activeDescriptors.filter((descriptor) => (
            !pretDescriptorMatchesQuery(descriptor, shapeQueries.vnV)
            && !pretDescriptorMatchesQuery(descriptor, shapeQueries.cvnV)
        )));
    }
    return Object.freeze(activeDescriptors.slice());
}

function buildPretAggregateDescriptors(shapeDescriptors = [], runtimeState = {}) {
    const activeDescriptors = [];
    PRET_AGGREGATE_DESCRIPTOR_SPECS.forEach((spec) => {
        const isActive = typeof spec.matcher === "function"
            ? spec.matcher(shapeDescriptors, runtimeState)
            : pretDescriptorListHasAnyQuery(shapeDescriptors, spec.sourceQueries || []);
        if (!isActive || pretDescriptorListHasQuery(activeDescriptors, spec.descriptor)) {
            return;
        }
        activeDescriptors.push(spec.descriptor);
    });
    return Object.freeze(activeDescriptors.slice());
}

function buildPretDescriptorState(shapeDescriptors = [], aggregateDescriptors = []) {
    return Object.freeze({
        shapeDescriptors: Object.freeze(Array.isArray(shapeDescriptors) ? shapeDescriptors.slice() : []),
        aggregateDescriptors: Object.freeze(Array.isArray(aggregateDescriptors) ? aggregateDescriptors.slice() : []),
    });
}

function pretContextGetDescriptorState(context) {
    return context?.descriptorState || null;
}

function pretContextHasShapeDescriptor(context, query) {
    const descriptorState = pretContextGetDescriptorState(context);
    return pretDescriptorListHasQuery(descriptorState?.shapeDescriptors, query);
}

function pretContextHasAnyShapeDescriptor(context, queries = []) {
    const descriptorState = pretContextGetDescriptorState(context);
    return pretDescriptorListHasAnyQuery(descriptorState?.shapeDescriptors, queries);
}

function pretContextHasAggregateDescriptor(context, query) {
    const descriptorState = pretContextGetDescriptorState(context);
    return pretDescriptorListHasQuery(descriptorState?.aggregateDescriptors, query);
}

function pretContextHasShapeEndingFamily(context, endingFamily) {
    return pretContextHasShapeDescriptor(context, { endingFamily });
}

function buildPretUniversalContext(verb, analysisVerb, isTransitive, options = {}) {
    const isYawi = options.isYawi === true;
    const isWeya = options.isWeya === true;
    const isBitransitive = options.isBitransitive === true;
    const forceClassBOnly = options.forceClassBOnly === true;
    const hasSlashMarker = options.hasSlashMarker === true;
    const hasSuffixSeparator = options.hasSuffixSeparator === true;
    const hasLeadingDash = options.hasLeadingDash === true;
    const hasBoundMarker = options.hasBoundMarker === true;
    const hasCompoundMarker = options.hasCompoundMarker === true;
    const boundPrefix = typeof options.boundPrefix === "string" ? options.boundPrefix : "";
    const hasImpersonalTaPrefix = options.hasImpersonalTaPrefix === true;
    const hasOptionalSupportiveI = options.hasOptionalSupportiveI === true;
    const hasNonspecificValence = options.hasNonspecificValence === true;
    const derivationType = options.derivationType || "";
    const exactBaseVerb = derivationType === DERIVATION_TYPE.direct
        ? options.exactBaseVerb
        : "";
    const contextCacheKey = buildPretUniversalContextCacheKey(verb, analysisVerb, isTransitive, {
        ...options,
        exactBaseVerb,
    });
    const cachedContext = PRET_UNIVERSAL_CONTEXT_CACHE.get(contextCacheKey);
    if (cachedContext) {
        return clonePretUniversalContext(cachedContext);
    }
    const denominalSource = getPretDenominalSourceContext({
        verb,
        matrixStem: exactBaseVerb,
        hasSlashMarker,
        hasBoundMarker,
        hasImpersonalTaPrefix,
    });
    const sourceVerb = exactBaseVerb || getDerivationRuleBase(analysisVerb || verb, {
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        boundPrefix,
    });
    const rootPlusYaSource = hasImpersonalTaPrefix ? verb : sourceVerb;
    const rawSyllables = getSyllables(sourceVerb, {
        analysis: true,
        assumeFinalV: true,
    });
    const getLooseRedupRoot = (syls) => {
        if (!syls || syls.length < 2) {
            return sourceVerb;
        }
        const first = syls[0];
        const second = syls[1];
        if (!REDUP_PREFIX_FORMS.has(first?.form) || !second?.nucleus) {
            return sourceVerb;
        }
        if (getSyllableBaseKey(first) !== getSyllableBaseKey(second)) {
            return sourceVerb;
        }
        return syls.slice(1).map((syllable) => syllable.text).join("");
    };
    const strictNonRedupRoot = getNonReduplicatedRoot(sourceVerb);
    const nonRedupRoot = strictNonRedupRoot !== sourceVerb
        ? strictNonRedupRoot
        : getLooseRedupRoot(rawSyllables);
    const baseIsReduplicated = sourceVerb !== nonRedupRoot;
    const parsedRootPlusYaBase = typeof options.rootPlusYaBase === "string"
        ? options.rootPlusYaBase
        : "";
    const parsedRootPlusYaPronounceable = typeof options.rootPlusYaBasePronounceable === "string"
        ? options.rootPlusYaBasePronounceable
        : "";
    const denominalRootPlusYaBase = (
        !isTransitive
        && denominalSource.isDenominalMatrixInput
        && denominalSource.denominalMatrixStem === "ya"
        && denominalSource.denominalSourceStem
    ) ? denominalSource.denominalSourceStem : "";
    const computedRootPlusYaBase = !isTransitive && parsedRootPlusYaBase
        ? parsedRootPlusYaBase
        : (denominalRootPlusYaBase || getRootPlusYaBase(rootPlusYaSource, { isTransitive, isYawi, isWeya }));
    const rootPlusYaBase = isTransitive ? null : computedRootPlusYaBase;
    const rootPlusYaBasePronounceable = rootPlusYaBase
        ? (parsedRootPlusYaPronounceable || (isSyllableSequencePronounceable(rootPlusYaBase) ? rootPlusYaBase : ""))
        : "";
    const isRootPlusYa = Boolean(rootPlusYaBase);
    const rootPlusYaSourceFrame = isRootPlusYa
        ? buildPretRootPlusYaSourceFrame({
            rootBase: rootPlusYaBase,
            sourceVerb: isWeya ? `${rootPlusYaBase}ya` : rootPlusYaSource,
            sourceKind: denominalRootPlusYaBase ? "denominal-root-plus-ya-source" : "root-plus-ya-source",
            isWeya,
            matrixStem: denominalSource.denominalMatrixStem || "",
        })
        : null;
    const isReduplicatedCVCV = !isRootPlusYa
        && baseIsReduplicated
        && rawSyllables.length >= 2
        && rawSyllables[0]?.form === "CV"
        && rawSyllables[1]?.form === "CV"
        && getSyllableBaseKey(rawSyllables[0]) === getSyllableBaseKey(rawSyllables[1]);
    const analysisRoot = isRootPlusYa ? rootPlusYaBase : nonRedupRoot;
    const isCausativeTypeTwo = derivationType === DERIVATION_TYPE.causative
        && /(t|w|l)ia$/.test(analysisRoot);
    const redupRoot = isRootPlusYa ? getNonReduplicatedRoot(rootPlusYaBase) : analysisRoot;
    const isReduplicatedRootPlusYa = isRootPlusYa && redupRoot !== rootPlusYaBase;
    const lexicalVerbOverride = getPretUniversalVerbOverride(analysisRoot, isTransitive);
    const verbOverride = (() => {
        if (!lexicalVerbOverride && !forceClassBOnly) {
            return null;
        }
        const next = lexicalVerbOverride && typeof lexicalVerbOverride === "object"
            ? { ...lexicalVerbOverride }
            : {};
        if (Array.isArray(lexicalVerbOverride?.classes)) {
            next.classes = lexicalVerbOverride.classes.slice();
        }
        if (forceClassBOnly) {
            next.classes = ["B"];
        }
        return next;
    })();
    let allowUnpronounceable = verbOverride?.allowUnpronounceable === true;
    let allowUnpronounceableStems = verbOverride?.allowUnpronounceableStems === true
        || options.allowUnpronounceableStems === true;
    if (isCausativeTypeTwo) {
        allowUnpronounceable = true;
        allowUnpronounceableStems = true;
    }
    const classAKiOnly = verbOverride?.classAKiOnly === true;
    const allowKWVClassB = verbOverride?.allowKWVClassB === true;
    const letters = analysisRoot ? splitVerbLetters(analysisRoot) : [];
    const startsWithConsonant = letters.length > 0 && isVerbLetterConsonant(letters[0]);
    const startsWithConsonantCluster = startsWithConsonant
        && letters.length > 1
        && isVerbLetterConsonant(letters[1]);
    const startsWithL = letters[0] === "l";
    const startsWithJ = letters[0] === "j";
    const hasBoundaryMarker = hasSlashMarker || hasSuffixSeparator || hasLeadingDash;
    const allowSupportiveMatch = startsWithConsonant
        && !hasNonspecificValence
        && (
            hasOptionalSupportiveI
            || (!hasBoundaryMarker || startsWithConsonantCluster || startsWithL || startsWithJ)
        );
    const supportiveInitialI = allowSupportiveMatch;
    const supportiveRoot = allowSupportiveMatch ? `i${analysisRoot}` : "";
    const syllables = getSyllables(analysisRoot, {
        analysis: true,
        assumeFinalV: true,
    });
    const supportiveSyllables = supportiveRoot
        ? getSyllables(supportiveRoot, { analysis: true, assumeFinalV: true })
        : null;
    const analysisSyllables = baseIsReduplicated ? rawSyllables : syllables;
    const letterCount = getVerbLetterCount(analysisRoot);
    const syllableForms = syllables.length ? syllables.map((syllable) => syllable.form) : null;
    const syllableCount = syllableForms
        ? syllableForms.length
        : getPretUniversalCoreVowelCount(analysisRoot);
    const vowelCount = getTrailingVowelCountFromSyllables(syllables);
    let isMonosyllable = syllableCount === 1;
    let isDerivedMonosyllable = isMonosyllable;
    if (isRootPlusYa) {
        isMonosyllable = false;
        isDerivedMonosyllable = false;
    }
    const resolvedVerb = isWeya && rootPlusYaBase ? `${rootPlusYaBase}ya` : verb;
    const stemPath = isRootPlusYa ? "root-plus-ya" : (isMonosyllable ? "monosyllable" : "default");
    const lastSyllable = syllables[syllables.length - 1] || null;
    const penultimateSyllable = syllables[syllables.length - 2] || null;
    const antepenultimateSyllable = syllables[syllables.length - 3] || null;
    const lastOnset = lastSyllable?.onset || "";
    const lastNucleus = lastSyllable?.nucleus || "";
    const penultimateNucleus = penultimateSyllable?.nucleus || "";
    const rightEdgeDescriptor = buildPretRightEdgeDescriptor(syllables);
    const rightEdgeProfile = rightEdgeDescriptor.rightEdgeProfile;
    const juncture = rightEdgeDescriptor.juncture;
    const endingFamily = rightEdgeDescriptor.endingFamily;
    const classDSyllables = resolvedVerb === analysisRoot
        ? syllables
        : getSyllables(resolvedVerb, { analysis: true, assumeFinalV: true });
    const classDRightEdgeDescriptor = resolvedVerb === analysisRoot
        ? rightEdgeDescriptor
        : buildPretRightEdgeDescriptor(classDSyllables);
    const classDSourceFrame = !isRootPlusYa
        ? buildPretClassDSourceFrame({
            sourceVerb: resolvedVerb,
            syllables: classDSyllables,
            rightEdgeDescriptor: classDRightEdgeDescriptor,
        })
        : null;
    const monosyllableStemPath = isMonosyllable ? getMonosyllableStemPath(classDSourceFrame) : null;
    const yyaClassASourceFrame = !isRootPlusYa && !isTransitive
        ? buildPretClassAYyaSourceFrame({
            sourceVerb,
            syllables,
            rightEdgeDescriptor,
        })
        : null;
    const itaClassASourceFrame = !isRootPlusYa && isTransitive
        ? buildPretClassAItaSourceFrame({
            sourceVerb,
            syllables,
            rightEdgeDescriptor,
        })
        : null;
    const classAFinalVowelDeletionSourceFrame = !isRootPlusYa
        ? buildPretClassAFinalVowelDeletionSourceFrame({
            sourceVerb,
            syllables,
            rightEdgeDescriptor,
        })
        : null;
    const classASlashAkiSourceFrame = !isRootPlusYa && !isTransitive
        ? buildPretClassASlashAkiSourceFrame({
            sourceVerb: analysisRoot,
            hasSlashMarker,
            syllables,
            rightEdgeDescriptor,
        })
        : null;
    const classASlashAkiOperationFrame = buildPretClassASlashAkiOperationFrame(
        classASlashAkiSourceFrame
    );
    const hasRightEdge = (query = {}) => pretRightEdgeDescriptorMatchesQuery(rightEdgeDescriptor, query);
    const forceClassBEnding = pretContextHasAnyRightEdge(
        { rightEdgeDescriptor },
        [
            { rightEdgeProfileSuffixes: ["Vj|CV", "CVj|CV"] },
            { rightEdgeProfileSuffixes: ["Vl|CV", "CVl|CV"] },
            { rightEdgeProfileSuffixes: ["V|C|CV", "CV|C|CV"] },
        ],
    );
    const shapeQuery = PRET_DESCRIPTOR_QUERIES.shape;
    const hasVnVRedupPrefix = pretShapeHasRedupPrefix(shapeQuery.vnV, syllables, ["V", "Vj"]);
    const hasCVnVRedupPrefix = pretShapeHasRedupPrefix(shapeQuery.cvnV, syllables, ["CV", "CVj"]);
    const hasCVmVRedupPrefix = pretShapeHasRedupPrefix(shapeQuery.cvmV, syllables, ["CV", "CVj"]);
    const activePretShapeDescriptors = buildPretActiveShapeDescriptors(shapeQuery, {
        syllables,
        analysisSyllables,
        supportiveSyllables,
        rawSyllables,
        baseIsReduplicated,
        leadingNucleus: syllables[0]?.nucleus || "",
    });
    const hasShapeDescriptor = (query) => pretDescriptorListHasQuery(activePretShapeDescriptors, query);

    const resolvedForceClassBEnding = forceClassBEnding
        && !hasShapeDescriptor(shapeQuery.vccvwi)
        && !hasShapeDescriptor(shapeQuery.vccvwiShort)
        && !hasShapeDescriptor(shapeQuery.vccvwa);
    const activePretAggregateDescriptors = buildPretAggregateDescriptors(activePretShapeDescriptors, {
        leadingOnset: syllables[0]?.onset || "",
    });
    const totalVowels = getTotalVowelCountFromSyllables(syllables);
    const isVtVStart = isPlainVowelSyllable(syllables[0]) && isCVWithOnset(syllables[1], "t");
    const isVVtVStart = isPlainVowelSyllable(syllables[0])
        && isPlainVowelSyllable(syllables[1])
        && isCVWithOnset(syllables[2], "t");
    const isReduplicatedContext = !isRootPlusYa && (
        baseIsReduplicated
        || hasVnVRedupPrefix
        || hasCVnVRedupPrefix
        || hasCVmVRedupPrefix
    );
    const isTransitiveUniI = isTransitive && isIVerbSyllableSequence(syllables);
    const rootSyllablesOk = areSyllablesPronounceable(syllables);
    const lastSyllableForm = lastSyllable?.form || null;
    const endsInOpenSyllable = isOpenSyllable(lastSyllable);
    const endsInOpenSyllableNonU = endsInOpenSyllable && lastNucleus !== "u";
    const isItaVerb = isItaSyllableSequence(syllables);
    const forceClassAForKWV = hasRightEdge({ finalForm: "CV", finalOnset: "kw" })
        && !hasRightEdge({ finalForm: "CV", finalOnset: "kw", finalNucleus: "u" })
        && !isRootPlusYa
        && !isMonosyllable;
    const classAKwvSourceFrame = forceClassAForKWV
        ? buildPretClassAKwvSourceFrame({
            sourceVerb: analysisRoot,
            syllables,
            rightEdgeDescriptor,
            isRootPlusYa,
            isMonosyllable,
            allowKWVClassB,
        })
        : null;
    const classAKwvOperationFrame = buildPretClassAKwvOperationFrame(classAKwvSourceFrame);
    const resolvedForceClassAForKWV = !getPretClassAKwvFrameMismatch({
        sourceFrame: classAKwvSourceFrame,
        operationFrame: classAKwvOperationFrame,
    });
    const classAKvAllowSourceFrame = !isTransitive
        ? buildPretClassAKvAllowSourceFrame({
            sourceVerb: analysisRoot,
            syllables,
            rightEdgeDescriptor,
            hasSlashMarker,
            isRootPlusYa,
        })
        : null;
    const classAKvAllowOperationFrame = buildPretClassAKvAllowOperationFrame(classAKvAllowSourceFrame);
    const resolvedAllowClassAForKV = resolvedForceClassAForKWV
        || !getPretClassAKvAllowFrameMismatch({
            sourceFrame: classAKvAllowSourceFrame,
            operationFrame: classAKvAllowOperationFrame,
        });
    const classAChiAllowSourceFrame = buildPretClassAChiAllowSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classAChiAllowOperationFrame = buildPretClassAChiAllowOperationFrame(classAChiAllowSourceFrame);
    const classATaRedupSourceFrame = buildPretClassATaRedupSourceFrame({
        sourceVerb,
        analysisBase: analysisRoot,
        rightEdgeDescriptor,
        isTransitive,
        isReduplicatedCVCV,
        isItaVerb,
    });
    const classATaRedupOperationFrame = buildPretClassATaRedupOperationFrame(classATaRedupSourceFrame);
    const classAPaTransitiveSourceFrame = buildPretClassAPaTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classAPaTransitiveOperationFrame = buildPretClassAPaTransitiveOperationFrame(classAPaTransitiveSourceFrame);
    const classAPiCvTransitiveSourceFrame = buildPretClassAPiCvTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classAPiCvTransitiveOperationFrame = buildPretClassAPiCvTransitiveOperationFrame(classAPiCvTransitiveSourceFrame);
    const classACvwiTransitiveSourceFrame = buildPretClassACvwiTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
        isReduplicated: isReduplicatedContext,
    });
    const classACvwiTransitiveOperationFrame = buildPretClassACvwiTransitiveOperationFrame(classACvwiTransitiveSourceFrame);
    const classACvcvwiTransitiveSourceFrame = buildPretClassACvcvwiTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
        isReduplicated: isReduplicatedContext,
    });
    const classACvcvwiTransitiveOperationFrame = buildPretClassACvcvwiTransitiveOperationFrame(classACvcvwiTransitiveSourceFrame);
    const classACvwaiTransitiveSourceFrame = buildPretClassACvwaiTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classACvwaiTransitiveOperationFrame = buildPretClassACvwaiTransitiveOperationFrame(classACvwaiTransitiveSourceFrame);
    const classACvewaTransitiveSourceFrame = buildPretClassACvewaTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classACvewaTransitiveOperationFrame = buildPretClassACvewaTransitiveOperationFrame(classACvewaTransitiveSourceFrame);
    const classACvawaTransitiveSourceFrame = buildPretClassACvawaTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
        isReduplicated: isReduplicatedContext,
        hasSlashMarker,
    });
    const classACvawaTransitiveOperationFrame = buildPretClassACvawaTransitiveOperationFrame(classACvawaTransitiveSourceFrame);
    const classAPaCvIntransitiveSourceFrame = buildPretClassAPaCvIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classAPaCvIntransitiveOperationFrame = buildPretClassAPaCvIntransitiveOperationFrame(classAPaCvIntransitiveSourceFrame);
    const classANaCvIntransitiveSourceFrame = buildPretClassANaCvIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classANaCvIntransitiveOperationFrame = buildPretClassANaCvIntransitiveOperationFrame(classANaCvIntransitiveSourceFrame);
    const classBVnaIntransitiveSourceFrame = buildPretClassBVnaIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classBVnaIntransitiveOperationFrame = buildPretClassBVnaIntransitiveOperationFrame(classBVnaIntransitiveSourceFrame);
    const classAMTransitiveSourceFrame = buildPretClassAMTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classAMTransitiveOperationFrame = buildPretClassAMTransitiveOperationFrame(classAMTransitiveSourceFrame);
    const classAPiIntransitiveSourceFrame = buildPretClassAPiIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classAPiIntransitiveOperationFrame = buildPretClassAPiIntransitiveOperationFrame(classAPiIntransitiveSourceFrame);
    const classBTaIntransitiveSourceFrame = buildPretClassBTaIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classBTaIntransitiveOperationFrame = buildPretClassBTaIntransitiveOperationFrame(classBTaIntransitiveSourceFrame);
    const classBTaTransitiveSourceFrame = buildPretClassBTaTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
        isItaVerb,
    });
    const classBTaTransitiveOperationFrame = buildPretClassBTaTransitiveOperationFrame(classBTaTransitiveSourceFrame);
    const classBKwiCvIntransitiveSourceFrame = buildPretClassBKwiCvIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classBKwiCvIntransitiveOperationFrame = buildPretClassBKwiCvIntransitiveOperationFrame(classBKwiCvIntransitiveSourceFrame);
    const classBVcvcuIntransitiveSourceFrame = buildPretClassBVcvcuIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classBVcvcuIntransitiveOperationFrame = buildPretClassBVcvcuIntransitiveOperationFrame(classBVcvcuIntransitiveSourceFrame);
    const classBVlcvwiIntransitiveSourceFrame = buildPretClassBVlcvwiIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classBVlcvwiIntransitiveOperationFrame = buildPretClassBVlcvwiIntransitiveOperationFrame(classBVlcvwiIntransitiveSourceFrame);
    const classBCvniuIntransitiveSourceFrame = buildPretClassBCvniuIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classBCvniuIntransitiveOperationFrame = buildPretClassBCvniuIntransitiveOperationFrame(classBCvniuIntransitiveSourceFrame);
    const classACvvniIntransitiveSourceFrame = buildPretClassACvvniIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classACvvniIntransitiveOperationFrame = buildPretClassACvvniIntransitiveOperationFrame(classACvvniIntransitiveSourceFrame);
    const classACvsvIntransitiveSourceFrame = buildPretClassACvsvIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classACvsvIntransitiveOperationFrame = buildPretClassACvsvIntransitiveOperationFrame(classACvsvIntransitiveSourceFrame);
    const classACvwiIntransitiveSourceFrame = buildPretClassACvwiIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classACvwiIntransitiveOperationFrame = buildPretClassACvwiIntransitiveOperationFrame(classACvwiIntransitiveSourceFrame);
    const classACvcvwiIntransitiveSourceFrame = buildPretClassACvcvwiIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classACvcvwiIntransitiveOperationFrame = buildPretClassACvcvwiIntransitiveOperationFrame(classACvcvwiIntransitiveSourceFrame);
    const classBVjwaIntransitiveSourceFrame = buildPretClassBVjwaIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classBVjwaIntransitiveOperationFrame = buildPretClassBVjwaIntransitiveOperationFrame(classBVjwaIntransitiveSourceFrame);
    const classBCuwaIntransitiveSourceFrame = buildPretClassBCuwaIntransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classBCuwaIntransitiveOperationFrame = buildPretClassBCuwaIntransitiveOperationFrame(classBCuwaIntransitiveSourceFrame);
    const classANiCvTransitiveSourceFrame = buildPretClassANiCvTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classANiCvTransitiveOperationFrame = buildPretClassANiCvTransitiveOperationFrame(classANiCvTransitiveSourceFrame);
    const classANaCvTransitiveSourceFrame = buildPretClassANaCvTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classANaCvTransitiveOperationFrame = buildPretClassANaCvTransitiveOperationFrame(classANaCvTransitiveSourceFrame);
    const classANaCvcvcvTransitiveSourceFrame = buildPretClassANaCvcvcvTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classANaCvcvcvTransitiveOperationFrame = buildPretClassANaCvcvcvTransitiveOperationFrame(classANaCvcvcvTransitiveSourceFrame);
    const classANaCvlvcvTransitiveSourceFrame = buildPretClassANaCvlvcvTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classANaCvlvcvTransitiveOperationFrame = buildPretClassANaCvlvcvTransitiveOperationFrame(classANaCvlvcvTransitiveSourceFrame);
    const classANaVlcvcvTransitiveSourceFrame = buildPretClassANaVlcvcvTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classANaVlcvcvTransitiveOperationFrame = buildPretClassANaVlcvcvTransitiveOperationFrame(classANaVlcvcvTransitiveSourceFrame);
    const classANaVjcvcvTransitiveSourceFrame = buildPretClassANaVjcvcvTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classANaVjcvcvTransitiveOperationFrame = buildPretClassANaVjcvcvTransitiveOperationFrame(classANaVjcvcvTransitiveSourceFrame);
    const classATzaTransitiveSourceFrame = buildPretClassATzaTransitiveSourceFrame({
        sourceVerb: analysisRoot,
        syllables,
        rightEdgeDescriptor,
        isTransitive,
        isMonosyllable,
    });
    const classATzaTransitiveOperationFrame = buildPretClassATzaTransitiveOperationFrame(classATzaTransitiveSourceFrame);
    const classCSyllables = resolvedVerb === sourceVerb
        ? syllables
        : getSyllables(resolvedVerb, { analysis: true, assumeFinalV: true });
    const classCRightEdgeDescriptor = resolvedVerb === sourceVerb
        ? rightEdgeDescriptor
        : buildPretRightEdgeDescriptor(classCSyllables);
    const classBSyllables = resolvedVerb === sourceVerb
        ? syllables
        : getSyllables(resolvedVerb, { analysis: true, assumeFinalV: true });
    const classBRightEdgeDescriptor = resolvedVerb === sourceVerb
        ? rightEdgeDescriptor
        : buildPretRightEdgeDescriptor(classBSyllables);
    const classBSourceFrame = !isRootPlusYa
        ? buildPretClassBSourceFrame({
            sourceVerb: resolvedVerb,
            syllables: classBSyllables,
            rightEdgeDescriptor: classBRightEdgeDescriptor,
        })
        : null;
    const classCSourceFrame = !isRootPlusYa
        ? buildPretClassCSourceFrame({
            sourceVerb: resolvedVerb,
            syllables: classCSyllables,
            rightEdgeDescriptor: classCRightEdgeDescriptor,
        })
        : null;
    const hasCJunctureIntransitive = !isTransitive
        && !isRootPlusYa
        && hasRightEdge({ juncture: "C|CV" });
    const context = {
        verb: resolvedVerb,
        analysisVerb: analysisRoot,
        verbOverride,
        forceClassBOnly,
        allowUnpronounceable,
        allowUnpronounceableStems,
        classAKiOnly,
        supportiveInitialI,
        isTransitive,
        isBitransitive,
        rootPlusYaBase,
        rootPlusYaBasePronounceable,
        rootPlusYaSourceFrame,
        yyaClassASourceFrame,
        itaClassASourceFrame,
        classAFinalVowelDeletionSourceFrame,
        classASlashAkiSourceFrame,
        classASlashAkiOperationFrame,
        classAKwvSourceFrame,
        classAKwvOperationFrame,
        classAKvAllowSourceFrame,
        classAKvAllowOperationFrame,
        classAChiAllowSourceFrame,
        classAChiAllowOperationFrame,
        classATaRedupSourceFrame,
        classATaRedupOperationFrame,
        classAPaTransitiveSourceFrame,
        classAPaTransitiveOperationFrame,
        classAPiCvTransitiveSourceFrame,
        classAPiCvTransitiveOperationFrame,
        classACvwiTransitiveSourceFrame,
        classACvwiTransitiveOperationFrame,
        classACvcvwiTransitiveSourceFrame,
        classACvcvwiTransitiveOperationFrame,
        classACvwaiTransitiveSourceFrame,
        classACvwaiTransitiveOperationFrame,
        classACvewaTransitiveSourceFrame,
        classACvewaTransitiveOperationFrame,
        classACvawaTransitiveSourceFrame,
        classACvawaTransitiveOperationFrame,
        classAPaCvIntransitiveSourceFrame,
        classAPaCvIntransitiveOperationFrame,
        classANaCvIntransitiveSourceFrame,
        classANaCvIntransitiveOperationFrame,
        classBVnaIntransitiveSourceFrame,
        classBVnaIntransitiveOperationFrame,
        classAMTransitiveSourceFrame,
        classAMTransitiveOperationFrame,
        classAPiIntransitiveSourceFrame,
        classAPiIntransitiveOperationFrame,
        classBTaIntransitiveSourceFrame,
        classBTaIntransitiveOperationFrame,
        classBTaTransitiveSourceFrame,
        classBTaTransitiveOperationFrame,
        classBKwiCvIntransitiveSourceFrame,
        classBKwiCvIntransitiveOperationFrame,
        classBVcvcuIntransitiveSourceFrame,
        classBVcvcuIntransitiveOperationFrame,
        classBVlcvwiIntransitiveSourceFrame,
        classBVlcvwiIntransitiveOperationFrame,
        classBCvniuIntransitiveSourceFrame,
        classBCvniuIntransitiveOperationFrame,
        classACvvniIntransitiveSourceFrame,
        classACvvniIntransitiveOperationFrame,
        classACvsvIntransitiveSourceFrame,
        classACvsvIntransitiveOperationFrame,
        classACvwiIntransitiveSourceFrame,
        classACvwiIntransitiveOperationFrame,
        classACvcvwiIntransitiveSourceFrame,
        classACvcvwiIntransitiveOperationFrame,
        classBVjwaIntransitiveSourceFrame,
        classBVjwaIntransitiveOperationFrame,
        classBCuwaIntransitiveSourceFrame,
        classBCuwaIntransitiveOperationFrame,
        classANiCvTransitiveSourceFrame,
        classANiCvTransitiveOperationFrame,
        classANaCvTransitiveSourceFrame,
        classANaCvTransitiveOperationFrame,
        classANaCvcvcvTransitiveSourceFrame,
        classANaCvcvcvTransitiveOperationFrame,
        classANaCvlvcvTransitiveSourceFrame,
        classANaCvlvcvTransitiveOperationFrame,
        classANaVlcvcvTransitiveSourceFrame,
        classANaVlcvcvTransitiveOperationFrame,
        classANaVjcvcvTransitiveSourceFrame,
        classANaVjcvcvTransitiveOperationFrame,
        classATzaTransitiveSourceFrame,
        classATzaTransitiveOperationFrame,
        classBSourceFrame,
        classCSourceFrame,
        classDSourceFrame,
        fromRootPlusYa: isRootPlusYa,
        isReduplicatedRootPlusYa,
        isReduplicated: isReduplicatedContext,
        isReduplicatedCVCV,
        letterCount,
        vowelCount,
        syllableForms,
        syllableCount,
        rightEdgeProfile,
        juncture,
        endingFamily,
        rightEdgeDescriptor,
        isMonosyllable,
        isDerivedMonosyllable,
        stemPath,
        isCausativeTypeTwo,
        monosyllableStemPath,
        forceClassBEnding: resolvedForceClassBEnding,
        totalVowels,
        isVtVStart,
        isVVtVStart,
        isTransitiveUniI,
        rootSyllablesOk,
        hasCJunctureIntransitive,
        lastSyllableForm,
        lastNucleus,
        penultimateNucleus,
        endsInOpenSyllable,
        endsInOpenSyllableNonU,
        isItaVerb,
        ...denominalSource,
        isYawi,
        isWeya,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        allowIntransitiveKV: resolvedAllowClassAForKV,
        forceClassAForKWV: resolvedForceClassAForKWV,
    };
    const descriptorState = buildPretDescriptorState(activePretShapeDescriptors, activePretAggregateDescriptors);
    context.descriptorState = descriptorState;
    PRET_UNIVERSAL_CONTEXT_CACHE.set(contextCacheKey, clonePretUniversalContext(context));
    if (PRET_UNIVERSAL_CONTEXT_CACHE.size > PRET_UNIVERSAL_CONTEXT_CACHE_LIMIT) {
        const firstKey = PRET_UNIVERSAL_CONTEXT_CACHE.keys().next().value;
        if (firstKey !== undefined) {
            PRET_UNIVERSAL_CONTEXT_CACHE.delete(firstKey);
        }
    }
    return context;
}

function getRootPlusYaClassCandidates(context) {
    const candidates = new Set();
    if (!context || !context.fromRootPlusYa || context.isTransitive) {
        return candidates;
    }
    if (context.analysisVerb === "ya" || context.verb === "ya") {
        return candidates;
    }
    candidates.add("A");
    candidates.add("B");
    return candidates;
}

const PRET_UNIVERSAL_EARLY_TIER_RULES = Object.freeze([
    {
        id: "root_plus_ya",
        label: "root+ya",
        tier: "path",
        resolveCandidates: (context) => getRootPlusYaClassCandidates(context),
    },
    {
        id: "causative_type_two",
        label: "causative type-two (-ia/-ua)",
        tier: "path",
        when: (context) => context.isCausativeTypeTwo,
        classes: ["C"],
    },
    {
        id: "denominal_ti_source_consonant",
        label: "denominal TI with consonant source",
        tier: "path",
        when: (context) => (
            context.isDenominalMatrixInput
            && context.isDenominalTiMatrix
            && context.denominalSourceEndsWithConsonant
        ),
        classes: ["B"],
    },
    {
        id: "denominal_ti_source_vowel",
        label: "denominal TI with vowel source",
        tier: "path",
        when: (context) => (
            context.isDenominalMatrixInput
            && context.isDenominalTiMatrix
            && context.denominalSourceEndsWithVowel
        ),
        classes: ["A", "B"],
    },
    {
        id: "denominal_wi_source_consonant",
        label: "denominal WI with consonant source",
        tier: "path",
        when: (context) => (
            context.isDenominalMatrixInput
            && context.isDenominalWiMatrix
            && context.denominalSourceEndsWithConsonant
        ),
        classes: ["B"],
    },
    {
        id: "denominal_wi_source_vowel",
        label: "denominal WI with vowel source",
        tier: "path",
        when: (context) => (
            context.isDenominalMatrixInput
            && context.isDenominalWiMatrix
            && context.denominalSourceEndsWithVowel
        ),
        classes: ["A", "B"],
    },
    {
        id: "monosyllable_transitive_v_e",
        label: "monosyllable transitive V (e)",
        tier: "monosyllable",
        when: (context) => (
            context.isMonosyllable
            && context.isTransitive
            && context.lastSyllableForm === "V"
            && context.lastNucleus === "e"
        ),
        classes: ["D"],
    },
    {
        id: "monosyllable_transitive_v",
        label: "monosyllable transitive V",
        tier: "monosyllable",
        when: (context) => context.isMonosyllable && context.isTransitive && context.lastSyllableForm === "V",
        classes: ["B"],
    },
    {
        id: "monosyllable_transitive_cv",
        label: "monosyllable transitive CV",
        tier: "monosyllable",
        when: (context) => context.isMonosyllable && context.isTransitive && context.lastSyllableForm === "CV",
        classes: ["D"],
    },
    {
        id: "monosyllable_intransitive_v",
        label: "monosyllable intransitive V",
        tier: "monosyllable",
        when: (context) => context.isMonosyllable && !context.isTransitive && context.lastSyllableForm === "V",
        classes: ["B"],
    },
    {
        id: "monosyllable_intransitive_cv",
        label: "monosyllable intransitive CV",
        tier: "monosyllable",
        when: (context) => (
            context.isMonosyllable
            && !context.isTransitive
            && context.lastSyllableForm === "CV"
        ),
        classes: ["B"],
    },
    {
        id: "c_juncture_intransitive",
        label: "C|CV (intransitive)",
        tier: "forced",
        when: (context) => {
            if (context.isTransitive || !context.hasCJunctureIntransitive) {
                return false;
            }
            const allowClusterWiWaShape = pretContextHasAnyShapeDescriptor(
                context,
                [
                    PRET_DESCRIPTOR_QUERIES.shape.ccvwi,
                    PRET_DESCRIPTOR_QUERIES.shape.vccvwiShort,
                    PRET_DESCRIPTOR_QUERIES.shape.vccvwa,
                ]
            );
            return !allowClusterWiWaShape;
        },
        classes: ["B"],
    },
    {
        id: "descriptor_t+a_intransitive",
        label: "descriptor t+a (intransitive)",
        tier: "forced",
        when: (context) => !getPretClassBTaIntransitiveFrameMismatch({
            sourceFrame: context?.classBTaIntransitiveSourceFrame,
            operationFrame: context?.classBTaIntransitiveOperationFrame,
        }),
        classes: ["B"],
    },
    {
        id: "descriptor_ch+i_intransitive",
        label: "descriptor ch+i (intransitive)",
        tier: "forced",
        when: (context) => !getPretClassAChiAllowFrameMismatch({
            sourceFrame: context?.classAChiAllowSourceFrame,
            operationFrame: context?.classAChiAllowOperationFrame,
        }),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_p+a_transitive",
        label: "descriptor p+a (transitive)",
        tier: "forced",
        when: (context) => !getPretClassAPaTransitiveFrameMismatch({
            sourceFrame: context?.classAPaTransitiveSourceFrame,
            operationFrame: context?.classAPaTransitiveOperationFrame,
        }),
        classes: ["A"],
    },
    {
        id: "descriptor_m+[a|i]_transitive",
        label: "descriptor m+[a|i] (transitive)",
        tier: "forced",
        when: (context) => !getPretClassAMTransitiveFrameMismatch({
            sourceFrame: context?.classAMTransitiveSourceFrame,
            operationFrame: context?.classAMTransitiveOperationFrame,
        }),
        classes: ["A"],
    },
    {
        id: "descriptor_p+i_intransitive",
        label: "descriptor p+i (intransitive)",
        tier: "forced",
        when: (context) => !getPretClassAPiIntransitiveFrameMismatch({
            sourceFrame: context?.classAPiIntransitiveSourceFrame,
            operationFrame: context?.classAPiIntransitiveOperationFrame,
        }),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_t+a_transitive_redup_cvcv",
        label: "descriptor t+a (transitive redup CVCV)",
        tier: "forced",
        when: (context) => !getPretClassATaRedupFrameMismatch({
            sourceFrame: context?.classATaRedupSourceFrame,
            operationFrame: context?.classATaRedupOperationFrame,
        }),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_t+a_transitive",
        label: "descriptor t+a (transitive)",
        tier: "forced",
        when: (context) => !getPretClassBTaTransitiveFrameMismatch({
            sourceFrame: context?.classBTaTransitiveSourceFrame,
            operationFrame: context?.classBTaTransitiveOperationFrame,
        }),
        classes: ["B"],
    },
    {
        id: "descriptor_tz+*",
        label: "descriptor tz+*",
        tier: "forced",
        when: (context) => (
            pretContextHasRightEdge(context, { finalOnset: "tz" })
            && !pretContextHasAnyRightEdge(context, [
                { juncture: "C|CV" },
            ])
            && !(
                context?.isTransitive === true
                && pretContextHasRightEdge(context, {
                    endingFamily: "tz+a",
                    rightEdgeProfiles: ["CV|CV", "Vj|CV|CV", "V|C|CV|CV"],
                })
            )
        ),
        classes: ["A"],
    },
    {
        id: "forced_b_ending",
        label: "forced B ending",
        tier: "forced",
        when: (context) => context.forceClassBEnding,
        classes: ["B"],
    },
]);

const PRET_UNIVERSAL_LV_TIER_RULES = Object.freeze([
    {
        id: "lv_i",
        label: "descriptor l+* · [Vl|V|CVl|V] · i",
        tier: "forced",
        when: (context) => (
            !context.isTransitive
            && context.lastNucleus === "i"
            && pretContextHasAnyRightEdge(
                context,
                [{ rightEdgeProfileSuffixes: ["Vl|V", "CVl|V"] }]
            )
        ),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_lv",
        label: "descriptor l+* · [Vl|V|CVl|V]",
        tier: "forced",
        when: (context) => pretContextHasAnyRightEdge(context, [{ rightEdgeProfileSuffixes: ["Vl|V", "CVl|V"] }]),
        classes: ["A"],
    },
    {
        id: "descriptor_lv_i",
        label: "descriptor l+* · [Vl|V|CVl|V] · i",
        tier: "shape",
        when: (context) => (
            context.lastNucleus === "i"
            && pretContextHasAnyRightEdge(
                context,
                [{ rightEdgeProfileSuffixes: ["Vl|V", "CVl|V"] }]
            )
        ),
        classes: ["A", "B"],
    },
]);

const PRET_UNIVERSAL_SHAPE_CORE_TIER_RULES = Object.freeze([
    {
        id: "descriptor_nia_transitive",
        label: "descriptor Nia (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeEndingFamily(context, "n+ia"),
        classes: ["C"],
    },
    {
        id: "descriptor_cvv_transitive",
        label: "descriptor CV-V (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvv),
        classes: ["C"],
    },
    {
        id: "descriptor_vv_intransitive",
        label: "descriptor V-V (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vv),
        classes: ["C"],
    },
]);

const PRET_UNIVERSAL_SHAPE_NA_INTRANSITIVE_TIER_RULES = Object.freeze([
    {
        id: "descriptor_vna_intransitive",
        label: "descriptor V-CV(na) (intransitive)",
        tier: "shape",
        when: (context) => !getPretClassBVnaIntransitiveFrameMismatch({
            sourceFrame: context?.classBVnaIntransitiveSourceFrame,
            operationFrame: context?.classBVnaIntransitiveOperationFrame,
        }),
        classes: ["B"],
    },
    {
        id: "descriptor_cvna_intransitive",
        label: "descriptor CV-CV(na) (intransitive)",
        tier: "shape",
        when: (context) => !getPretClassANaCvIntransitiveFrameMismatch({
            sourceFrame: context?.classANaCvIntransitiveSourceFrame,
            operationFrame: context?.classANaCvIntransitiveOperationFrame,
        }),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_na_three_syllable_intransitive",
        label: "descriptor n+a, three-syllable right edge (intransitive)",
        tier: "shape",
        when: (context) => (
            !context.isTransitive
            && pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.naCV_CV_CV)
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_na_four_syllable_intransitive",
        label: "descriptor n+a, four-syllable right edge (intransitive)",
        tier: "shape",
        when: (context) => (
            !context.isTransitive
            && pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.naCV_CV_CV_CV)
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_vwi_intransitive",
        label: "descriptor V-CV(wi) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vwi),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_SHAPE_NA_TRANSITIVE_TIER_RULES = Object.freeze([
    {
        id: "descriptor_na_three_syllable_transitive",
        label: "descriptor n+a, three-syllable right edge (transitive)",
        tier: "shape",
        when: (context) => !getPretClassANaCvcvcvTransitiveFrameMismatch({
            sourceFrame: context?.classANaCvcvcvTransitiveSourceFrame,
            operationFrame: context?.classANaCvcvcvTransitiveOperationFrame,
        }),
        classes: ["A"],
    },
    {
        id: "descriptor_cvlvna_transitive",
        label: "descriptor CVl-V-CV(na) (transitive)",
        tier: "shape",
        when: (context) => !getPretClassANaCvlvcvTransitiveFrameMismatch({
            sourceFrame: context?.classANaCvlvcvTransitiveSourceFrame,
            operationFrame: context?.classANaCvlvcvTransitiveOperationFrame,
        }),
        classes: ["A"],
    },
    {
        id: "descriptor_vlcvna_transitive",
        label: "descriptor Vl-CV-CV(na) (transitive)",
        tier: "shape",
        when: (context) => !getPretClassANaVlcvcvTransitiveFrameMismatch({
            sourceFrame: context?.classANaVlcvcvTransitiveSourceFrame,
            operationFrame: context?.classANaVlcvcvTransitiveOperationFrame,
        }),
        classes: ["A"],
    },
    {
        id: "descriptor_vjcvna_transitive",
        label: "descriptor Vj-CV-CV(na) (transitive)",
        tier: "shape",
        when: (context) => !getPretClassANaVjcvcvTransitiveFrameMismatch({
            sourceFrame: context?.classANaVjcvcvTransitiveSourceFrame,
            operationFrame: context?.classANaVjcvcvTransitiveOperationFrame,
        }),
        classes: ["A"],
    },
    {
        id: "descriptor_cvtza_transitive",
        label: "descriptor CV-CV(tza) (transitive)",
        tier: "shape",
        when: (context) => !getPretClassATzaTransitiveFrameMismatch({
            sourceFrame: context?.classATzaTransitiveSourceFrame,
            operationFrame: context?.classATzaTransitiveOperationFrame,
        }),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_SHAPE_TA_PV_TIER_RULES = Object.freeze([
    {
        id: "descriptor_cvta_intransitive",
        label: "descriptor CV-CV(ta) (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvta),
        classes: ["B"],
    },
    {
        id: "descriptor_cvpv_transitive",
        label: "descriptor CV-CV(pV) (transitive)",
        tier: "shape",
        when: (context) => !getPretClassAPiCvTransitiveFrameMismatch({
            sourceFrame: context?.classAPiCvTransitiveSourceFrame,
            operationFrame: context?.classAPiCvTransitiveOperationFrame,
        }),
        classes: ["A"],
    },
    {
        id: "descriptor_cvpv_intransitive",
        label: "descriptor CV-CV(pV) (intransitive)",
        tier: "shape",
        when: (context) => !getPretClassAPaCvIntransitiveFrameMismatch({
            sourceFrame: context?.classAPaCvIntransitiveSourceFrame,
            operationFrame: context?.classAPaCvIntransitiveOperationFrame,
        }),
        classes: ["A", "B"],
    },
]);

const PRET_UNIVERSAL_SHAPE_MA_KWI_NI_TIER_RULES = Object.freeze([
    {
        id: "descriptor_cvma_transitive",
        label: "descriptor CV-CV(ma) (transitive)",
        tier: "shape",
        when: (context) => (
            context?.isTransitive === true
            && !getPretClassAMTransitiveFrameMismatch({
                sourceFrame: context?.classAMTransitiveSourceFrame,
                operationFrame: context?.classAMTransitiveOperationFrame,
            })
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_cvkwi_intransitive",
        label: "descriptor CV-CV(kwi) (intransitive)",
        tier: "shape",
        when: (context) => !getPretClassBKwiCvIntransitiveFrameMismatch({
            sourceFrame: context?.classBKwiCvIntransitiveSourceFrame,
            operationFrame: context?.classBKwiCvIntransitiveOperationFrame,
        }),
        classes: ["B"],
    },
    {
        id: "descriptor_vcvcu_intransitive",
        label: "descriptor V-CV-CV(u) (intransitive)",
        tier: "shape",
        when: (context) => !getPretClassBVcvcuIntransitiveFrameMismatch({
            sourceFrame: context?.classBVcvcuIntransitiveSourceFrame,
            operationFrame: context?.classBVcvcuIntransitiveOperationFrame,
        }),
        classes: ["B"],
    },
    {
        id: "descriptor_vlcvwi_intransitive",
        label: "descriptor Vl-CV-CV(wi) (intransitive)",
        tier: "shape",
        when: (context) => !getPretClassBVlcvwiIntransitiveFrameMismatch({
            sourceFrame: context?.classBVlcvwiIntransitiveSourceFrame,
            operationFrame: context?.classBVlcvwiIntransitiveOperationFrame,
        }),
        classes: ["B"],
    },
    {
        id: "descriptor_cvniu_intransitive",
        label: "descriptor CV(u)-CV(ni) (intransitive)",
        tier: "shape",
        when: (context) => !getPretClassBCvniuIntransitiveFrameMismatch({
            sourceFrame: context?.classBCvniuIntransitiveSourceFrame,
            operationFrame: context?.classBCvniuIntransitiveOperationFrame,
        }),
        classes: ["B"],
    },
    {
        id: "descriptor_cvvni_intransitive",
        label: "descriptor CV-V-CV(ni) (intransitive)",
        tier: "shape",
        when: (context) => !getPretClassACvvniIntransitiveFrameMismatch({
            sourceFrame: context?.classACvvniIntransitiveSourceFrame,
            operationFrame: context?.classACvvniIntransitiveOperationFrame,
        }),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_ni_transitive",
        label: "descriptor Ni (transitive)",
        tier: "shape",
        when: (context) => (
            !getPretClassANiCvTransitiveFrameMismatch({
                sourceFrame: context?.classANiCvTransitiveSourceFrame,
                operationFrame: context?.classANiCvTransitiveOperationFrame,
            })
            || (
                context.isTransitive
                && !pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvni)
                && !pretContextHasRightEdge(context, { endingFamily: "n+i", rightEdgeProfiles: ["CV|CV"] })
                && pretContextHasShapeEndingFamily(context, "n+i")
            )
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_na_transitive",
        label: "descriptor Na (transitive)",
        tier: "shape",
        when: (context) => (
            !getPretClassANaCvTransitiveFrameMismatch({
                sourceFrame: context?.classANaCvTransitiveSourceFrame,
                operationFrame: context?.classANaCvTransitiveOperationFrame,
            })
            || (
                context.isTransitive
                && !pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvna)
                && !pretContextHasRightEdge(context, { endingFamily: "n+a", rightEdgeProfiles: ["CV|CV"] })
                && !pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.naCV_CV_CV)
                && !pretContextHasRightEdge(context, { endingFamily: "n+a", rightEdgeProfiles: ["CVl|V|CV"] })
                && !pretContextHasRightEdge(context, { endingFamily: "n+a", rightEdgeProfiles: ["Vl|CV|CV"] })
                && !pretContextHasRightEdge(context, {
                    endingFamily: "n+a",
                    rightEdgeProfiles: ["Vj|CV|CV", "V|C|CV|CV"],
                })
                && pretContextHasShapeEndingFamily(context, "n+a")
            )
        ),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_SHAPE_WA_ENTRY_TIER_RULES = Object.freeze([
    {
        id: "descriptor_vjwa",
        label: "descriptor Vj-CV(wa)",
        tier: "shape",
        when: (context) => !getPretClassBVjwaIntransitiveFrameMismatch({
            sourceFrame: context?.classBVjwaIntransitiveSourceFrame,
            operationFrame: context?.classBVjwaIntransitiveOperationFrame,
        }),
        classes: ["B"],
    },
    {
        id: "descriptor_Ø+u",
        label: "descriptor Ø+u",
        tier: "forced",
        when: (context) => pretContextHasRightEdge(context, { finalForm: "V", finalNucleus: "u" }),
        classes: ["B"],
    },
    {
        id: "descriptor_cvwai_transitive",
        label: "descriptor CV(i)-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => !getPretClassACvwaiTransitiveFrameMismatch({
            sourceFrame: context?.classACvwaiTransitiveSourceFrame,
            operationFrame: context?.classACvwaiTransitiveOperationFrame,
        }),
        classes: ["A"],
    },
    {
        id: "descriptor_vwai_transitive",
        label: "descriptor V(i)-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vwaI),
        classes: ["D"],
    },
    {
        id: "descriptor_vwa_transitive",
        label: "descriptor V-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive
            && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vwa)
            && !pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vwaI),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_SHAPE_WA_REST_TIER_RULES = Object.freeze([
    {
        id: "descriptor_vccawa_transitive",
        label: "descriptor V-C-CV(a)-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vccawa),
        classes: ["A"],
    },
    {
        id: "descriptor_wa_transitive",
        label: "descriptor Wa (transitive)",
        tier: "shape",
        when: (context) => {
            if (!context?.isTransitive) {
                return false;
            }
            if (!getPretClassACvawaTransitiveFrameMismatch({
                sourceFrame: context?.classACvawaTransitiveSourceFrame,
                operationFrame: context?.classACvawaTransitiveOperationFrame,
            })) {
                return true;
            }
            if (
                context.isReduplicated !== true
                && context.hasSlashMarker !== true
                && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvwaA)
            ) {
                return false;
            }
            return pretContextHasAnyShapeDescriptor(
                context,
                [
                    PRET_DESCRIPTOR_QUERIES.shape.cvwaA,
                    PRET_DESCRIPTOR_QUERIES.shape.cvcawa,
                    PRET_DESCRIPTOR_QUERIES.shape.cvlawa,
                ]
            );
        },
        classes: ["A"],
    },
    {
        id: "descriptor_ewa_transitive",
        label: "descriptor Ewa (transitive)",
        tier: "shape",
        when: (context) => {
            if (!context?.isTransitive) {
                return false;
            }
            if (!getPretClassACvewaTransitiveFrameMismatch({
                sourceFrame: context?.classACvewaTransitiveSourceFrame,
                operationFrame: context?.classACvewaTransitiveOperationFrame,
            })) {
                return true;
            }
            if (pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cewa)) {
                return false;
            }
            return pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.ewaPattern);
        },
        classes: ["A"],
    },
    {
        id: "descriptor_vjcvwa_transitive",
        label: "descriptor Vj-CV-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vjcvwa),
        classes: ["A"],
    },
    {
        id: "descriptor_cvjcvwa_transitive",
        label: "descriptor CVj-CV-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvjcvwa),
        classes: ["A"],
    },
    {
        id: "descriptor_vlcvwa_transitive",
        label: "descriptor Vl-CV-CV(wa) (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.vlcvwa),
        classes: ["A"],
    },
    {
        id: "descriptor_cvwi_transitive",
        label: "descriptor CV-CV(wi) (transitive)",
        tier: "shape",
        when: (context) => {
            if (!context?.isTransitive) {
                return false;
            }
            if (context.isReduplicated === true) {
                return pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvwi);
            }
            if (!pretContextHasRightEdge(context, { endingFamily: "w+i", rightEdgeProfiles: ["CV|CV"] })) {
                return false;
            }
            return !getPretClassACvwiTransitiveFrameMismatch({
                sourceFrame: context?.classACvwiTransitiveSourceFrame,
                operationFrame: context?.classACvwiTransitiveOperationFrame,
            });
        },
        classes: ["A", "B"],
    },
    {
        id: "descriptor_wi_three_syllable_transitive",
        label: "descriptor w+i, three-syllable right edge (transitive)",
        tier: "shape",
        when: (context) => {
            if (!context?.isTransitive || !pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.wiCV_CV_CV)) {
                return false;
            }
            if (context.isReduplicated === true) {
                return true;
            }
            return !getPretClassACvcvwiTransitiveFrameMismatch({
                sourceFrame: context?.classACvcvwiTransitiveSourceFrame,
                operationFrame: context?.classACvcvwiTransitiveOperationFrame,
            });
        },
        classes: ["A", "B"],
    },
    {
        id: "descriptor_wi_transitive",
        label: "descriptor Wi (transitive)",
        tier: "shape",
        when: (context) => context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_cuwa_intransitive",
        label: "descriptor CV(u)-CV(wa) (intransitive)",
        tier: "shape",
        when: (context) => !getPretClassBCuwaIntransitiveFrameMismatch({
            sourceFrame: context?.classBCuwaIntransitiveSourceFrame,
            operationFrame: context?.classBCuwaIntransitiveOperationFrame,
        }),
        classes: ["B"],
    },
    {
        id: "descriptor_lwa_intransitive",
        label: "descriptor Lwa (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.lwaPattern),
        classes: ["A", "B"],
    },
    {
        id: "descriptor_short_wi_intransitive",
        label: "descriptor short Wi (intransitive)",
        tier: "shape",
        when: (context) => !context.isTransitive
            && pretContextHasAnyShapeDescriptor(
                context,
                [PRET_DESCRIPTOR_QUERIES.shape.vccvwiShort, PRET_DESCRIPTOR_QUERIES.shape.ccvwi]
            ),
        classes: ["A"],
    },
    {
        id: "descriptor_wi_intransitive",
        label: "descriptor Wi (intransitive)",
        tier: "shape",
        when: (context) => {
            if (context?.isTransitive) {
                return false;
            }
            if (!getPretClassACvwiIntransitiveFrameMismatch({
                sourceFrame: context?.classACvwiIntransitiveSourceFrame,
                operationFrame: context?.classACvwiIntransitiveOperationFrame,
            })) {
                return true;
            }
            if (!getPretClassACvcvwiIntransitiveFrameMismatch({
                sourceFrame: context?.classACvcvwiIntransitiveSourceFrame,
                operationFrame: context?.classACvcvwiIntransitiveOperationFrame,
            })) {
                return true;
            }
            if (pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvwi)) {
                return !getPretClassACvwiIntransitiveFrameMismatch({
                    sourceFrame: context?.classACvwiIntransitiveSourceFrame,
                    operationFrame: context?.classACvwiIntransitiveOperationFrame,
                });
            }
            if (pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvcvwi)) {
                return !getPretClassACvcvwiIntransitiveFrameMismatch({
                    sourceFrame: context?.classACvcvwiIntransitiveSourceFrame,
                    operationFrame: context?.classACvcvwiIntransitiveOperationFrame,
                });
            }
            return pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern);
        },
        classes: ["A", "B"],
    },
    {
        id: "descriptor_wa_intransitive",
        label: "descriptor Wa (intransitive)",
        tier: "shape",
        resolveCandidates: (context) => {
            if (!context.isTransitive && pretContextHasAggregateDescriptor(context, PRET_DESCRIPTOR_QUERIES.aggregate.waPattern)) {
                const classes = ["A"];
                if (pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.waCV_CV_CV) && !context.isReduplicated) {
                    classes.push("B");
                }
                return classes;
            }
            return [];
        },
    },
    {
        id: "length_gradient_na_intransitive",
        label: "length gradient Na (intransitive)",
        tier: "shape",
        when: (context) => (
            !context.isTransitive
            && pretContextHasRightEdge(context, PRET_RIGHT_EDGE_RULE_QUERIES.naDepthAtLeastFour)
        ),
        classes: ["A"],
    },
    {
        id: "descriptor_vnv_cvnv_cvmv_transitive",
        label: "descriptor V-CV(nV)/CV-CV(nV)/CV-CV(mV) (transitive)",
        tier: "shape",
        when: (context) => {
            if (context?.isTransitive !== true) {
                return false;
            }
            if (pretContextHasAnyShapeDescriptor(context, [
                PRET_DESCRIPTOR_QUERIES.shape.vnV,
                PRET_DESCRIPTOR_QUERIES.shape.cvnV,
            ])) {
                return true;
            }
            if (!pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvmV)) {
                return false;
            }
            return !getPretClassAMTransitiveFrameMismatch({
                sourceFrame: context?.classAMTransitiveSourceFrame,
                operationFrame: context?.classAMTransitiveOperationFrame,
            });
        },
        classes: ["A"],
    },
    {
        id: "descriptor_cvsv",
        label: "descriptor CV-CV(sV)",
        tier: "shape",
        resolveCandidates: (context) => {
            if (!getPretClassACvsvIntransitiveFrameMismatch({
                sourceFrame: context?.classACvsvIntransitiveSourceFrame,
                operationFrame: context?.classACvsvIntransitiveOperationFrame,
            })) {
                return ["A", "B"];
            }
            if (!pretContextHasShapeDescriptor(context, PRET_DESCRIPTOR_QUERIES.shape.cvsV)) {
                return [];
            }
            const classes = ["A"];
            if (context.lastNucleus === "i" && !context.isTransitive) {
                classes.push("B");
            }
            return classes;
        },
    },
]);

const PRET_UNIVERSAL_DEFAULT_CLASS_RULES = Object.freeze([
    {
        label: "force class A for KWV",
        when: (ctx) => !getPretClassAKwvFrameMismatch({
            sourceFrame: ctx?.classAKwvSourceFrame,
            operationFrame: ctx?.classAKwvOperationFrame,
        }),
        classes: ["A"],
    },
    {
        label: "default class B",
        when: (_ctx, flags) => !flags.disallowTransitiveWaB && !flags.forceClassAForKWV,
        classes: ["B"],
    },
    {
        label: "open syllable non-u adds class A",
        when: (ctx) => ctx.endsInOpenSyllableNonU,
        classes: ["A"],
    },
    {
        label: "open syllable non-u ia/ua adds class C",
        when: (ctx) => (
            ctx.endsInOpenSyllableNonU
            && ctx.vowelCount === 2
            && pretContextHasRightEdge(ctx, {
                finalForm: "V",
                finalNucleus: "a",
                previousHasCoda: false,
                previousNuclei: ["i", "u"],
            })
        ),
        classes: ["C"],
    },
    {
        label: "intransitive yya adds class A",
        when: (ctx) => !ctx.isTransitive && Boolean(ctx.yyaClassASourceFrame),
        classes: ["A"],
    },
]);

const PRET_UNIVERSAL_CLASS_TIER_TABLES = Object.freeze([
    PRET_UNIVERSAL_EARLY_TIER_RULES,
    PRET_UNIVERSAL_LV_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_CORE_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_NA_INTRANSITIVE_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_NA_TRANSITIVE_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_TA_PV_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_MA_KWI_NI_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_WA_ENTRY_TIER_RULES,
    PRET_UNIVERSAL_SHAPE_WA_REST_TIER_RULES,
]);

function buildPretUniversalRuleTierByLabelMap() {
    const tierMap = {};
    PRET_UNIVERSAL_CLASS_TIER_TABLES.forEach((rules) => {
        (rules || []).forEach((rule) => {
            const label = String(rule?.label || "").toLowerCase();
            if (!label) {
                return;
            }
            tierMap[label] = rule.tier || PRET_UNIVERSAL_DEFAULT_RULE_TIER;
        });
    });
    tierMap[PRET_UNIVERSAL_DEFAULT_RULE_LABEL] = PRET_UNIVERSAL_DEFAULT_RULE_TIER;
    tierMap["unpronounceable root"] = PRET_UNIVERSAL_DEFAULT_RULE_TIER;
    return tierMap;
}

const PRET_UNIVERSAL_RULE_TIER_BY_LABEL = Object.freeze(
    buildPretUniversalRuleTierByLabelMap(),
);

function toPretUniversalCandidateSet(values) {
    const set = new Set();
    (Array.isArray(values) ? values : []).forEach((value) => {
        if (value) {
            set.add(value);
        }
    });
    return set;
}

function normalizePretUniversalRuleCandidates(values) {
    if (values instanceof Set) {
        return new Set(values);
    }
    if (Array.isArray(values)) {
        return toPretUniversalCandidateSet(values);
    }
    return new Set();
}

function resolvePretUniversalRuleMatch(rule, context, flags = {}) {
    if (!rule) {
        return null;
    }
    let candidates = null;
    if (typeof rule.resolveCandidates === "function") {
        candidates = normalizePretUniversalRuleCandidates(
            rule.resolveCandidates(context, flags),
        );
        if (!candidates.size) {
            return null;
        }
    } else {
        const matched = typeof rule.when === "function"
            ? rule.when(context, flags)
            : false;
        if (!matched) {
            return null;
        }
        // For plain `when + classes`, empty candidate sets are still considered
        // a valid match for control-flow rules (e.g., gate rules).
        candidates = toPretUniversalCandidateSet(rule.classes || []);
    }
    const resolvedLabel = typeof rule.resolveLabel === "function"
        ? rule.resolveLabel(context, flags)
        : rule.label;
    return {
        id: rule.id,
        label: resolvedLabel,
        tier: rule.tier,
        candidates,
    };
}

function evaluatePretUniversalRuleTable(ruleTable, context, flags = {}) {
    return findPretUniversalRuleMatch(ruleTable, context, flags);
}

function collectPretUniversalRuleTableCandidates(ruleTable, context, flags = {}) {
    const matches = collectPretUniversalRuleMatches(ruleTable, context, flags);
    const candidates = new Set();
    for (const match of matches) {
        match.candidates.forEach((classKey) => candidates.add(classKey));
    }
    return candidates;
}

function collectPretUniversalRuleMatches(ruleTable, context, flags = {}) {
    const matches = [];
    for (const rule of ruleTable) {
        const match = resolvePretUniversalRuleMatch(rule, context, flags);
        if (!match) {
            continue;
        }
        matches.push(match);
    }
    return matches;
}

function findPretUniversalRuleMatch(ruleTable, context, flags = {}) {
    for (const rule of ruleTable) {
        const match = resolvePretUniversalRuleMatch(rule, context, flags);
        if (!match) {
            continue;
        }
        return match;
    }
    return null;
}

function buildPretUniversalClassComputationFlags(context) {
    const override = context?.verbOverride || null;
    const allowUnpronounceable = override?.allowUnpronounceable === true || context?.allowUnpronounceable === true;
    const disallowTransitiveWaB = Boolean(
        context?.isTransitive
        && pretContextHasRightEdge(context, { endingFamily: "w+a" })
        && context?.letterCount >= 4,
    );
    const forceClassAForKWV = !getPretClassAKwvFrameMismatch({
        sourceFrame: context?.classAKwvSourceFrame,
        operationFrame: context?.classAKwvOperationFrame,
    });
    return {
        override,
        allowUnpronounceable,
        disallowTransitiveWaB,
        forceClassAForKWV,
    };
}

function evaluatePretUniversalClassSelectionPipeline(context, flags = {}) {
    const gateMatch = evaluatePretUniversalRuleTable(
        PRET_UNIVERSAL_CLASS_GATE_RULES,
        context,
        flags,
    );
    if (gateMatch) {
        return gateMatch;
    }
    for (const ruleTable of PRET_UNIVERSAL_CLASS_TIER_TABLES) {
        const tierMatch = evaluatePretUniversalRuleTable(ruleTable, context, flags);
        if (tierMatch) {
            return tierMatch;
        }
    }
    return {
        label: PRET_UNIVERSAL_DEFAULT_RULE_LABEL,
        tier: PRET_UNIVERSAL_DEFAULT_RULE_TIER,
        candidates: collectPretUniversalRuleTableCandidates(
            PRET_UNIVERSAL_DEFAULT_CLASS_RULES,
            context,
            flags,
        ),
    };
}

function recordPretUniversalSelectionTrace(traceState, {
    ruleLabel = "",
    ruleTier = "",
    ruleTierIndex = -1,
} = {}) {
    if (!traceState || traceState.rule) {
        return;
    }
    traceState.rule = ruleLabel;
    traceState.ruleTier = ruleTier;
    traceState.ruleTierIndex = ruleTierIndex;
}

function resolvePretUniversalClassSelection(context, options = {}) {
    const traceState = options.trace && typeof options.trace === "object"
        ? options.trace
        : null;
    const flags = buildPretUniversalClassComputationFlags(context);
    const selectionMatch = evaluatePretUniversalClassSelectionPipeline(context, flags);
    const candidates = normalizePretUniversalRuleCandidates(selectionMatch.candidates);
    const ruleLabel = selectionMatch.label || PRET_UNIVERSAL_DEFAULT_RULE_LABEL;
    const ruleTier = selectionMatch.tier || inferPretUniversalRuleTier(ruleLabel);
    const ruleTierIndex = PRET_UNIVERSAL_RULE_TIER_ORDER.indexOf(ruleTier);
    recordPretUniversalSelectionTrace(traceState, { ruleLabel, ruleTier, ruleTierIndex });
    return {
        candidates,
        ruleLabel,
        ruleTier,
        ruleTierIndex,
        gates: traceState?.gates || [],
    };
}

function getPretUniversalClassCandidates(context, trace = null) {
    // Precedence: root+ya > monosyllable > forced-B endings > descriptor LV > descriptor patterns
    // > general class rules.
    return resolvePretUniversalClassSelection(context, { trace }).candidates;
}

function getPretUniversalShapeLabels(context) {
    if (!context) {
        return [];
    }
    const descriptorState = pretContextGetDescriptorState(context);
    const shapeDescriptors = Array.isArray(descriptorState?.shapeDescriptors)
        ? descriptorState.shapeDescriptors
        : [];
    return shapeDescriptors
        .map((descriptor) => formatPretDescriptorLabel(descriptor, {
            activeRightEdgeProfile: context.rightEdgeProfile,
        }))
        .filter(Boolean);
}

function buildPretUniversalRuleSummary(context) {
    if (!context) {
        return null;
    }
    const selection = resolvePretUniversalClassSelection(context, {
        trace: { rule: "", gates: [] },
    });
    const candidates = selection.candidates;
    const ruleLabel = selection.ruleLabel;
    const ruleTier = selection.ruleTier;
    const shapeLabels = getPretUniversalShapeLabels(context);
    const shapeLabel = shapeLabels.length ? shapeLabels[0] : "";
    const classList = candidates.size ? formatPretUniversalClassList(candidates) : "";
    let resolvedClassList = "";
    if (typeof getPretUniversalVariantsByClass === "function") {
        const variantsByClass = getPretUniversalVariantsByClass(context);
        if (variantsByClass && variantsByClass.size) {
            const resolvedClasses = new Set();
            variantsByClass.forEach((_variants, classKey) => {
                if (classKey) {
                    resolvedClasses.add(classKey);
                }
            });
            if (resolvedClasses.size) {
                resolvedClassList = formatPretUniversalClassList(resolvedClasses);
            }
        }
    }
    return {
        ruleLabel,
        ruleTier,
        shapeLabel,
        shapeLabels,
        classList,
        resolvedClassList,
        gates: selection.gates,
    };
}
