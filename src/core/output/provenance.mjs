export function createOutputProvenanceApi(targetObject = globalThis) {
    function buildProvenanceVariantEntry({
        base = "",
        suffix = "",
        baseSpec = null,
        stemSpec = null,
        surfaceStem = "",
    } = {}) {
        const resolvedStemSpec = (
            stemSpec
            && typeof stemSpec === "object"
            && stemSpec.kind
        )
            ? stemSpec
            : null;
        const resolvedBaseSpec = (
            baseSpec
            && typeof baseSpec === "object"
        )
            ? baseSpec
            : null;
        const realizedStem = targetObject.normalizeDerivationStemValue(
            surfaceStem
            || (resolvedStemSpec
                ? targetObject.realizeMorphStemSpec(resolvedStemSpec, `${base || ""}${suffix || ""}`)
                : `${base || ""}${suffix || ""}`)
        );
        return {
            base: String(base || ""),
            suffix: String(suffix || ""),
            baseSpec: resolvedBaseSpec,
            stemSpec: resolvedStemSpec,
            surfaceStem: realizedStem,
        };
    }

    function getProvenancePrimaryStemSurface(provenance = null) {
        const variants = Array.isArray(provenance?.variants) ? provenance.variants : [];
        const primaryVariant = variants[0] || null;
        if (primaryVariant) {
            const resolvedSurface = targetObject.normalizeDerivationStemValue(
                primaryVariant.surfaceStem
                || (primaryVariant.stemSpec
                    ? targetObject.realizeMorphStemSpec(
                        primaryVariant.stemSpec,
                        `${primaryVariant.base || ""}${primaryVariant.suffix || ""}`
                    )
                    : `${primaryVariant.base || ""}${primaryVariant.suffix || ""}`)
            );
            if (resolvedSurface) {
                return resolvedSurface;
            }
        }
        if (provenance?.stemSpec) {
            return targetObject.normalizeDerivationStemValue(targetObject.realizeMorphStemSpec(provenance.stemSpec, ""));
        }
        return targetObject.normalizeDerivationStemValue(provenance?.surfaceStem || "");
    }

    function buildForwardDerivationProvenance({
        sourceVerb = "",
        analysisTarget = "",
        tense = "",
        derivationType = "",
        isTransitive = false,
        selectedMeta = null,
    } = {}) {
        const meta = selectedMeta && typeof selectedMeta === "object" ? selectedMeta : {};
        const selectedStem = targetObject.normalizeDerivationStemValue(
            meta.surfaceStem
            || targetObject.realizeMorphStemSpec(meta.stemSpec || null, meta.stem || "")
            || meta.stem
            || ""
        );
        const variants = selectedStem ? [buildProvenanceVariantEntry({
            stemSpec: meta.stemSpec || null,
            surfaceStem: selectedStem,
        })] : [];
        return {
            verb: sourceVerb,
            analysisTarget,
            tense,
            isTransitive,
            stemPath: derivationType || null,
            rule: String(meta.rule || ""),
            patternType: String(meta.patternType || ""),
            causativeTrace: meta.causativeTrace || null,
            guidanceRoute: meta.guidanceRoute || null,
            stemSpec: meta.stemSpec || null,
            surfaceStem: selectedStem,
            variants,
            blockedReason: null,
        };
    }

    return {
        buildProvenanceVariantEntry,
        getProvenancePrimaryStemSurface,
        buildForwardDerivationProvenance,
    };
}

export function installOutputProvenanceGlobals(targetObject = globalThis) {
    const api = createOutputProvenanceApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
