// core/irregulars/irregulars.js
// Suppletive stem getters and stem-set builders for kati, yawi, witzi, weya.
// Extracted from script.js lines 20,050–20,194 (Suppletive Stem Paths section).
// Global-scope module: all functions defined directly on the global object.
// Deps: SUPPLETIVE_* let variables, INTRANSITIVE_ONLY_SUPPLETIVE_IDS const,
//       SUPPLETIVE_STEM_PATHS, VOWEL_END_RE
//       — all initialized in script.js before first call.
//       getDirectActiveObjectSlots() — defined in script.js.

"use strict";

function isIntransitiveOnlySuppletiveId(id = "") {
    return INTRANSITIVE_ONLY_SUPPLETIVE_IDS.has(String(id || "").toLowerCase());
}

function isSuppletiveIntransitiveOnlyContext(parsedVerb, options = {}) {
    if (!parsedVerb) {
        return false;
    }
    const hasObjectSelection = options.hasObjectSelection === true;
    // Evaluate intransitive-only suppletives from the source/direct valency,
    // not from derived valency (causative/applicative adds slots).
    const sourceObjectSlots = getDirectActiveObjectSlots(parsedVerb);
    return sourceObjectSlots === 0 && !hasObjectSelection;
}

function dropFinalVowel(stem) {
    if (!stem) {
        return stem;
    }
    return VOWEL_END_RE.test(stem) ? stem.slice(0, -1) : stem;
}

function getSuppletiveYawiCanonical() {
    return SUPPLETIVE_YAWI_CANONICAL || "yawi";
}

function getSuppletiveYawiImperfective() {
    return SUPPLETIVE_YAWI_IMPERFECTIVE || "ya";
}

function getSuppletiveYawiShort() {
    return SUPPLETIVE_YAWI_SHORT || "yaw";
}

function getSuppletiveYawiYuVariant() {
    return SUPPLETIVE_YAWI_YU_VARIANT || "yu";
}

function getSuppletiveYawiCausativeActive() {
    return SUPPLETIVE_YAWI_CAUSATIVE_ACTIVE || "wika";
}

function getSuppletiveYawiCausativeNonactive() {
    return SUPPLETIVE_YAWI_CAUSATIVE_NONACTIVE || "wikalu";
}

function getSuppletiveWeyaRootPlusYaBase() {
    return SUPPLETIVE_WEYA_ROOT || "wey";
}

function getSuppletiveWeyaCanonical() {
    if (SUPPLETIVE_WEYA_CANONICAL) {
        return SUPPLETIVE_WEYA_CANONICAL;
    }
    const rootBase = getSuppletiveWeyaRootPlusYaBase();
    return rootBase ? `${rootBase}ya` : "weyya";
}

function buildSuppletiveKatiStemSet() {
    const variantsByClass = new Map();
    variantsByClass.set("A", [{ base: dropFinalVowel(SUPPLETIVE_KATI_CLASS_A), suffix: "ki" }]);
    const compoundPerfectTenses = ["perfecto", "pluscuamperfecto", "condicional-perfecto"];
    const tenseVariantsByClass = compoundPerfectTenses.reduce((acc, tenseKey) => {
        const perTenseVariants = new Map();
        perTenseVariants.set("A", [{ base: SUPPLETIVE_KATI_IMPERFECTIVE, suffix: "" }]);
        acc[tenseKey] = perTenseVariants;
        return acc;
    }, {});
    return {
        imperfective: { verb: SUPPLETIVE_KATI_IMPERFECTIVE, analysisVerb: SUPPLETIVE_KATI_IMPERFECTIVE },
        variantsByClass,
        tenseVariantsByClass,
        pretPluralSuffix: "et",
        pretPluralClasses: new Set(["A"]),
        classExclusionsByTense: SUPPLETIVE_KATI_CLASS_EXCLUSIONS,
    };
}

function buildSuppletiveYawiStemSet() {
    const base = getSuppletiveYawiImperfective();
    const variantsByClass = new Map();
    variantsByClass.set("D", [{ base: `${base}j`, suffix: "ki" }]);
    return {
        imperfective: { verb: base, analysisVerb: base },
        variantsByClass,
    };
}

function buildSuppletiveWitziStemSet() {
    const imperfective = SUPPLETIVE_WITZI_IMPERFECTIVE || "witzi";
    const base = SUPPLETIVE_WITZI_PERFECTIVE || "witz";
    const variantsByClass = new Map();
    variantsByClass.set("A", [{ base, suffix: "" }]);
    return {
        imperfective: { verb: imperfective, analysisVerb: imperfective },
        variantsByClass,
        pretPluralSuffix: "et",
        pretPluralClasses: new Set(["A"]),
    };
}

function buildSuppletiveWeyaStemSet(parsedVerb = null) {
    const inputVerb = parsedVerb?.rawAnalysisVerb
        || parsedVerb?.analysisVerb
        || parsedVerb?.exactBaseVerb
        || parsedVerb?.verb
        || getSuppletiveWeyaCanonical();
    const imperfectiveVerb = SUPPLETIVE_WEYA_FORMS.has(inputVerb)
        ? inputVerb
        : getSuppletiveWeyaCanonical();
    const rootBase = getSuppletiveWeyaRootPlusYaBase();
    const canonical = getSuppletiveWeyaCanonical();
    const preserveCodaY = { preserveCodaY: true };
    const variantsByClass = new Map();
    variantsByClass.set("A", [
        { base: rootBase, suffix: "ki", surfaceRuleMeta: preserveCodaY },
        { base: canonical, suffix: "k", surfaceRuleMeta: preserveCodaY },
    ]);
    return {
        imperfective: { verb: imperfectiveVerb, analysisVerb: imperfectiveVerb },
        variantsByClass,
        surfaceRuleMeta: preserveCodaY,
    };
}

function getSuppletiveStemPath(parsedVerb) {
    if (!parsedVerb) {
        return null;
    }
    const resolveEntryValue = (value) => {
        if (!value) {
            return null;
        }
        if (typeof value === "function") {
            return value(parsedVerb);
        }
        return value;
    };
    for (const entry of SUPPLETIVE_STEM_PATHS) {
        if (entry.match(parsedVerb)) {
            if (
                isIntransitiveOnlySuppletiveId(entry.id)
                && !isSuppletiveIntransitiveOnlyContext(parsedVerb)
            ) {
                continue;
            }
            return {
                path: "suppletive",
                id: entry.id,
                stemSet: resolveEntryValue(entry.active),
                nonactiveOptions: resolveEntryValue(entry.nonactive),
                activeTenses: entry.activeTenses || null,
                tenseSuffixOverrides: entry.tenseSuffixOverrides || null,
                verbOverrides: entry.verbOverrides || null,
                nonactiveTenses: entry.nonactiveTenses || null,
            };
        }
    }
    return null;
}

function getSuppletiveStemSet(parsedVerb) {
    return getSuppletiveStemPath(parsedVerb)?.stemSet || null;
}

function getSuppletiveNonactiveOptions(parsedVerb) {
    const path = getSuppletiveStemPath(parsedVerb);
    const options = path?.nonactiveOptions || null;
    return options && options.length ? options : null;
}
