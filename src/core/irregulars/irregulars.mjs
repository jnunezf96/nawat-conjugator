export function createIrregularsApi(targetObject = globalThis) {
    function isIntransitiveOnlySuppletiveId(id = "") {
        return targetObject.INTRANSITIVE_ONLY_SUPPLETIVE_IDS.has(String(id || "").toLowerCase());
    }

    function isSuppletiveIntransitiveOnlyContext(parsedVerb, options = {}) {
        if (!parsedVerb) {
            return false;
        }
        const hasObjectSelection = options.hasObjectSelection === true;
        const sourceObjectSlots = targetObject.getDirectActiveObjectSlots(parsedVerb);
        return sourceObjectSlots === 0 && !hasObjectSelection;
    }

    function dropFinalVowel(stem) {
        if (!stem) {
            return stem;
        }
        return targetObject.VOWEL_END_RE.test(stem) ? stem.slice(0, -1) : stem;
    }

    function getSuppletiveYawiCanonical() {
        return targetObject.SUPPLETIVE_YAWI_CANONICAL || "yawi";
    }

    function getSuppletiveYawiImperfective() {
        return targetObject.SUPPLETIVE_YAWI_IMPERFECTIVE || "ya";
    }

    function getSuppletiveYawiShort() {
        return targetObject.SUPPLETIVE_YAWI_SHORT || "yaw";
    }

    function getSuppletiveYawiYuVariant() {
        return targetObject.SUPPLETIVE_YAWI_YU_VARIANT || "yu";
    }

    function getSuppletiveYawiCausativeActive() {
        return targetObject.SUPPLETIVE_YAWI_CAUSATIVE_ACTIVE || "wika";
    }

    function getSuppletiveYawiCausativeNonactive() {
        return targetObject.SUPPLETIVE_YAWI_CAUSATIVE_NONACTIVE || "wikalu";
    }

    function getSuppletiveWeyaRootPlusYaBase() {
        return targetObject.SUPPLETIVE_WEYA_ROOT || "wey";
    }

    function getSuppletiveWeyaCanonical() {
        if (targetObject.SUPPLETIVE_WEYA_CANONICAL) {
            return targetObject.SUPPLETIVE_WEYA_CANONICAL;
        }
        const rootBase = getSuppletiveWeyaRootPlusYaBase();
        return rootBase ? `${rootBase}ya` : "weyya";
    }

    function buildSuppletiveKatiStemSet() {
        const variantsByClass = new Map();
        variantsByClass.set("A", [{ base: dropFinalVowel(targetObject.SUPPLETIVE_KATI_CLASS_A), suffix: "ki" }]);
        const compoundPerfectTenses = ["perfecto", "pluscuamperfecto", "condicional-perfecto"];
        const tenseVariantsByClass = compoundPerfectTenses.reduce((acc, tenseKey) => {
            const perTenseVariants = new Map();
            perTenseVariants.set("A", [{ base: targetObject.SUPPLETIVE_KATI_IMPERFECTIVE, suffix: "" }]);
            acc[tenseKey] = perTenseVariants;
            return acc;
        }, {});
        return {
            imperfective: {
                verb: targetObject.SUPPLETIVE_KATI_IMPERFECTIVE,
                analysisVerb: targetObject.SUPPLETIVE_KATI_IMPERFECTIVE,
            },
            variantsByClass,
            tenseVariantsByClass,
            pretPluralSuffix: "et",
            pretPluralClasses: new Set(["A"]),
            classExclusionsByTense: targetObject.SUPPLETIVE_KATI_CLASS_EXCLUSIONS,
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
        const base = dropFinalVowel(targetObject.SUPPLETIVE_WITZI_IMPERFECTIVE);
        const variantsByClass = new Map();
        variantsByClass.set("A", [{ base, suffix: "" }]);
        return {
            imperfective: {
                verb: targetObject.SUPPLETIVE_WITZI_IMPERFECTIVE,
                analysisVerb: targetObject.SUPPLETIVE_WITZI_IMPERFECTIVE,
            },
            variantsByClass,
            pretPluralSuffix: "et",
            pretPluralClasses: new Set(["A"]),
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
        for (const entry of targetObject.SUPPLETIVE_STEM_PATHS) {
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

    return {
        isIntransitiveOnlySuppletiveId,
        isSuppletiveIntransitiveOnlyContext,
        dropFinalVowel,
        getSuppletiveYawiCanonical,
        getSuppletiveYawiImperfective,
        getSuppletiveYawiShort,
        getSuppletiveYawiYuVariant,
        getSuppletiveYawiCausativeActive,
        getSuppletiveYawiCausativeNonactive,
        getSuppletiveWeyaRootPlusYaBase,
        getSuppletiveWeyaCanonical,
        buildSuppletiveKatiStemSet,
        buildSuppletiveYawiStemSet,
        buildSuppletiveWitziStemSet,
        getSuppletiveStemPath,
        getSuppletiveStemSet,
        getSuppletiveNonactiveOptions,
    };
}

export function installIrregularGlobals(targetObject = globalThis) {
    const api = createIrregularsApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
