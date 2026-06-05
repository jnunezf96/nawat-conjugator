export function createNncApi(targetObject = globalThis) {
    const VERB_DERIVED_NOMINAL_KIND = new Proxy({}, {
        get: (_target, prop) => targetObject.VERB_DERIVED_NOMINAL_KIND?.[prop],
    });
    const INSTRUMENTIVO_MODE = new Proxy({}, {
        get: (_target, prop) => targetObject.INSTRUMENTIVO_MODE?.[prop],
    });
    const COMBINED_MODE = new Proxy({}, {
        get: (_target, prop) => targetObject.COMBINED_MODE?.[prop],
    });
    const ORDINARY_NNC_STATE = Object.freeze({
        absolutive: "absolutive",
        possessive: "possessive",
    });
    const ORDINARY_NNC_DIAGNOSTIC_IDS = Object.freeze({
        unsupportedStem: "ordinary-nnc-unsupported-stem",
        unsupportedState: "ordinary-nnc-unsupported-state",
        unsupportedPossessiveState: "ordinary-nnc-unsupported-possessive-state",
        unsupportedPossessor: "ordinary-nnc-unsupported-possessor",
        unsupportedNumber: "ordinary-nnc-unsupported-number",
        nounClassMismatch: "ordinary-nnc-noun-class-mismatch",
    });

    const buildVerbDerivedNominalBuilderContext = (...args) => targetObject.buildVerbDerivedNominalBuilderContext(...args);
    const buildVerbDerivedNominalEntry = (...args) => targetObject.buildVerbDerivedNominalEntry(...args);
    const buildVerbDerivedNominalResult = (...args) => targetObject.buildVerbDerivedNominalResult(...args);
    const buildNonactiveSourceChain = (...args) => targetObject.buildNonactiveSourceChain(...args);
    const normalizeDerivationStemValue = (...args) => targetObject.normalizeDerivationStemValue(...args);
    const getNounNonactiveRuleBase = (...args) => targetObject.getNounNonactiveRuleBase(...args);
    const getVisibleNonactiveDerivationOptions = (...args) => targetObject.getVisibleNonactiveDerivationOptions(...args);
    const resolveNonactiveStemSelection = (...args) => targetObject.resolveNonactiveStemSelection(...args);
    const shouldForceAllNonactiveOptions = (...args) => targetObject.shouldForceAllNonactiveOptions(...args);
    const getSelectedNonactiveSuffix = (...args) => targetObject.getSelectedNonactiveSuffix(...args);
    const applyNonactiveSourceChainStemSpec = (...args) => targetObject.applyNonactiveSourceChainStemSpec(...args);
    const realizeMorphStemSpec = (...args) => targetObject.realizeMorphStemSpec(...args);
    const buildLiteralMorphStemSpec = (...args) => targetObject.buildLiteralMorphStemSpec(...args);
    const applyMorphologyRules = (...args) => targetObject.applyMorphologyRules(...args);
    const buildMorphologyMetaOptions = (...args) => targetObject.buildMorphologyMetaOptions(...args);
    const resolveNominalSourceOuterSurfacePlacement = (...args) => targetObject.resolveNominalSourceOuterSurfacePlacement(...args);
    const resolvePlacedNominalStemSpec = (...args) => targetObject.resolvePlacedNominalStemSpec(...args);
    const buildOutputPrefixedChain = (...args) => targetObject.buildOutputPrefixedChain(...args);
    const buildStructuredPrefixedStemSpec = (...args) => targetObject.buildStructuredPrefixedStemSpec(...args);
    const buildPasadoRemotoStemEntries = (...args) => targetObject.buildPasadoRemotoStemEntries(...args);
    const buildCalificativoInstrumentivoPredicateStemSpec = (...args) => targetObject.buildCalificativoInstrumentivoPredicateStemSpec(...args);
    const collapseCalificativoMarkerEcho = (...args) => targetObject.collapseCalificativoMarkerEcho(...args);
    const composeProjectiveObjectPrefix = (...args) => targetObject.composeProjectiveObjectPrefix(...args);
    const getForwardDerivationConfig = (...args) => targetObject.getForwardDerivationConfig(...args);
    const getNounDerivationTypeFromMeta = (...args) => targetObject.getNounDerivationTypeFromMeta(...args);
    const normalizeRuleBase = (...args) => targetObject.normalizeRuleBase(...args);
    const getBaseObjectSlots = (...args) => targetObject.getBaseObjectSlots(...args);
    const resolveHasNonspecificValence = (...args) => targetObject.resolveHasNonspecificValence(...args);
    const getSuppletiveStemSet = (...args) => targetObject.getSuppletiveStemSet(...args);
    const stripDirectionalPrefixFromStem = (...args) => targetObject.stripDirectionalPrefixFromStem(...args);
    const applyPassiveImpersonal = (...args) => targetObject.applyPassiveImpersonal(...args);
    const getCombinedMode = (...args) => targetObject.getCombinedMode(...args);

    function normalizeOrdinaryNncText(value = "") {
        return String(value || "").trim().toLowerCase();
    }

    function normalizeOrdinaryNncNumber(value = "") {
        const normalized = normalizeOrdinaryNncText(value || "singular");
        if (normalized === "sg") {
            return "singular";
        }
        if (normalized === "pl") {
            return "plural";
        }
        return normalized || "singular";
    }

    function normalizeOrdinaryNncAgreementNumber(value = "") {
        const normalized = normalizeOrdinaryNncText(value);
        return normalized === "sg" ? "singular" : (normalized === "pl" ? "plural" : normalized);
    }

    function normalizeOrdinaryNncState(value = "", possessor = null) {
        const normalized = normalizeOrdinaryNncText(value);
        if (!normalized) {
            return possessor?.prefix ? ORDINARY_NNC_STATE.possessive : ORDINARY_NNC_STATE.absolutive;
        }
        if (normalized === "absolutive" || normalized === "absolutivo") {
            return ORDINARY_NNC_STATE.absolutive;
        }
        if (normalized === "possessive" || normalized === "possessed" || normalized === "posesivo") {
            return ORDINARY_NNC_STATE.possessive;
        }
        return normalized;
    }

    function getOrdinaryNncFixtureEntries() {
        return Array.isArray(targetObject.ORDINARY_NNC_FIXTURES)
            ? targetObject.ORDINARY_NNC_FIXTURES
            : [];
    }

    function getOrdinaryNncPossessiveEntries() {
        return Array.isArray(targetObject.POSSESSIVE_PREFIXES)
            ? targetObject.POSSESSIVE_PREFIXES
            : [];
    }

    function getOrdinaryNncSubjectEntries() {
        return Array.isArray(targetObject.SUBJECT_COMBINATIONS)
            ? targetObject.SUBJECT_COMBINATIONS
            : [];
    }

    function buildOrdinaryNncDiagnostic(id = "", message = "", severity = "unsupported") {
        return { id, severity, message };
    }

    function parseOrdinaryNncPersonSubKey(personSubKey = "") {
        const match = String(personSubKey || "").match(/^([123])(?:s|sg|p|pl)$/i);
        if (!match) {
            return { person: null, number: "" };
        }
        return {
            person: Number(match[1]),
            number: /p/i.test(personSubKey) ? "plural" : "singular",
        };
    }

    function resolveOrdinaryNncSubject(subject = null) {
        const source = subject && typeof subject === "object" ? subject : {};
        const requestedId = typeof subject === "string" ? subject : (source.id || source.personSubKey || "");
        const subjectPrefix = typeof source.subjectPrefix === "string"
            ? source.subjectPrefix
            : (typeof source.prefix === "string" ? source.prefix : "");
        const subjectSuffix = typeof source.subjectSuffix === "string"
            ? source.subjectSuffix
            : (typeof source.suffix === "string" ? source.suffix : "");
        const entries = getOrdinaryNncSubjectEntries();
        const entry = entries.find((candidate) => (
            (requestedId && (candidate.id === requestedId || candidate.personSubKey === requestedId))
            || (
                String(candidate.subjectPrefix || "") === subjectPrefix
                && String(candidate.subjectSuffix || "") === subjectSuffix
            )
        )) || entries.find((candidate) => (
            String(candidate.subjectPrefix || "") === ""
            && String(candidate.subjectSuffix || "") === ""
        ));
        const prefix = entry ? String(entry.subjectPrefix || "") : subjectPrefix;
        const suffix = entry ? String(entry.subjectSuffix || "") : subjectSuffix;
        const agreementInfo = typeof targetObject.getSubjectPersonInfo === "function"
            ? targetObject.getSubjectPersonInfo(prefix, suffix)
            : null;
        const parsed = parseOrdinaryNncPersonSubKey(entry?.personSubKey || "");
        const number = normalizeOrdinaryNncAgreementNumber(agreementInfo?.number || parsed.number || "singular");
        return {
            subjectPrefix: prefix,
            subjectSuffix: suffix,
            person: agreementInfo?.person || parsed.person || 3,
            number,
            personSubKey: entry?.personSubKey || `${agreementInfo?.person || parsed.person || 3}${number === "plural" ? "pl" : "sg"}`,
        };
    }

    function resolveOrdinaryNncPossessor(possessor = null, possessivePrefix = "") {
        const raw = possessor && typeof possessor === "object"
            ? (possessor.prefix || possessor.value || possessor.id || "")
            : (possessor || possessivePrefix || "");
        const normalized = String(raw || "").trim();
        if (!normalized || normalized === "none") {
            return null;
        }
        const entry = getOrdinaryNncPossessiveEntries().find((candidate) => (
            candidate.value === normalized
            || candidate.id === normalized
            || candidate.personSubKey === normalized
        ));
        if (!entry) {
            return {
                id: "",
                prefix: normalized,
                personSubKey: "",
                number: "",
                unsupported: true,
            };
        }
        return {
            id: entry.id || "",
            prefix: entry.value || "",
            personSubKey: entry.personSubKey || "",
            number: entry.number || "",
        };
    }

    function findOrdinaryNncFixture(stem = "") {
        const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
        return getOrdinaryNncFixtureEntries().find((fixture) => {
            const keys = [
                fixture.id,
                fixture.stem,
                fixture.lemma,
                ...(Array.isArray(fixture.aliases) ? fixture.aliases : []),
            ].map(normalizeOrdinaryNncText).filter(Boolean);
            return keys.includes(normalizedStem);
        }) || null;
    }

    function getOrdinaryNncSurfaceFormsFromCell(cell = null) {
        if (Array.isArray(cell)) {
            return cell.filter(Boolean);
        }
        if (cell && typeof cell === "object" && Array.isArray(cell.surfaceForms)) {
            return cell.surfaceForms.filter(Boolean);
        }
        return [];
    }

    function getOrdinaryNncFixtureStateForms(fixture = null, state = "", {
        number = "singular",
        possessor = null,
    } = {}) {
        const stateData = fixture?.states?.[state] || null;
        if (!stateData) {
            return [];
        }
        if (state === ORDINARY_NNC_STATE.possessive) {
            const possessorPrefix = possessor?.prefix || "";
            const byNumber = stateData.numberFormsByPossessor?.[number]?.[possessorPrefix];
            const formsByNumber = getOrdinaryNncSurfaceFormsFromCell(byNumber);
            if (formsByNumber.length) {
                return formsByNumber;
            }
            const byPossessor = stateData.surfaceByPossessor?.[possessorPrefix];
            return getOrdinaryNncSurfaceFormsFromCell(byPossessor);
        }
        const byNumber = stateData.numberForms?.[number];
        const formsByNumber = getOrdinaryNncSurfaceFormsFromCell(byNumber);
        if (formsByNumber.length) {
            return formsByNumber;
        }
        return getOrdinaryNncSurfaceFormsFromCell(stateData);
    }

    function buildOrdinaryNncUnsupportedResult({
        stem = "",
        state = ORDINARY_NNC_STATE.absolutive,
        number = "singular",
        subject = null,
        possessor = null,
        nounClass = "",
        animacy = "",
        diagnostic,
    } = {}) {
        return {
            supported: false,
            result: "",
            surfaceForms: [],
            stem,
            state,
            nounClass,
            animacy,
            number,
            subject,
            possessor,
            diagnostics: diagnostic ? [diagnostic] : [],
        };
    }

    function generateOrdinaryNncParadigm({
        stem = "",
        state = "",
        subject = null,
        possessor = null,
        possessivePrefix = "",
        number = "singular",
        nounClass = "",
    } = {}) {
        const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
        const resolvedSubject = resolveOrdinaryNncSubject(subject);
        const resolvedPossessor = resolveOrdinaryNncPossessor(possessor, possessivePrefix);
        const normalizedState = normalizeOrdinaryNncState(state, resolvedPossessor);
        const normalizedNumber = normalizeOrdinaryNncNumber(number);
        const fixture = findOrdinaryNncFixture(normalizedStem);
        if (!fixture) {
            return buildOrdinaryNncUnsupportedResult({
                stem: normalizedStem,
                state: normalizedState,
                number: normalizedNumber,
                subject: resolvedSubject,
                possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
                diagnostic: buildOrdinaryNncDiagnostic(
                    ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedStem,
                    `No ordinary NNC fixture is configured for stem "${normalizedStem}".`
                ),
            });
        }
        const fixtureClass = String(fixture.nounClass || "");
        if (nounClass && fixtureClass && nounClass !== fixtureClass) {
            return buildOrdinaryNncUnsupportedResult({
                stem: fixture.stem || normalizedStem,
                state: normalizedState,
                number: normalizedNumber,
                subject: resolvedSubject,
                possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
                nounClass: fixtureClass,
                animacy: fixture.animacy || "",
                diagnostic: buildOrdinaryNncDiagnostic(
                    ORDINARY_NNC_DIAGNOSTIC_IDS.nounClassMismatch,
                    `Ordinary NNC fixture "${fixture.id || normalizedStem}" is class "${fixtureClass}", not "${nounClass}".`
                ),
            });
        }
        if (normalizedState === ORDINARY_NNC_STATE.possessive && (!resolvedPossessor || resolvedPossessor.unsupported)) {
            return buildOrdinaryNncUnsupportedResult({
                stem: fixture.stem || normalizedStem,
                state: normalizedState,
                number: normalizedNumber,
                subject: resolvedSubject,
                possessor: null,
                nounClass: fixtureClass,
                animacy: fixture.animacy || "",
                diagnostic: buildOrdinaryNncDiagnostic(
                    ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPossessor,
                    `No ordinary NNC possessive fixture is configured for possessor "${possessor || possessivePrefix || ""}".`
                ),
            });
        }
        const surfaceForms = getOrdinaryNncFixtureStateForms(fixture, normalizedState, {
            number: normalizedNumber,
            possessor: resolvedPossessor,
        });
        if (!surfaceForms.length) {
            const stateData = fixture.states?.[normalizedState] || null;
            const missingPossessiveState = normalizedState === ORDINARY_NNC_STATE.possessive && !stateData;
            const diagnosticId = missingPossessiveState
                ? ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPossessiveState
                : (stateData
                    ? ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedNumber
                    : ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedState);
            const diagnosticMessage = missingPossessiveState
                ? `No ordinary NNC possessive forms are configured for stem "${fixture.stem || normalizedStem}".`
                : `No ordinary NNC ${normalizedState} ${normalizedNumber} form is configured for stem "${fixture.stem || normalizedStem}".`;
            return buildOrdinaryNncUnsupportedResult({
                stem: fixture.stem || normalizedStem,
                state: normalizedState,
                number: normalizedNumber,
                subject: resolvedSubject,
                possessor: resolvedPossessor,
                nounClass: fixtureClass,
                animacy: fixture.animacy || "",
                diagnostic: buildOrdinaryNncDiagnostic(
                    diagnosticId,
                    diagnosticMessage
                ),
            });
        }
        return {
            supported: true,
            result: surfaceForms.join(" / "),
            surfaceForms,
            stem: fixture.stem || normalizedStem,
            state: normalizedState,
            nounClass: fixtureClass,
            animacy: fixture.animacy || "",
            number: normalizedNumber,
            subject: resolvedSubject,
            possessor: normalizedState === ORDINARY_NNC_STATE.possessive ? resolvedPossessor : null,
            diagnostics: [],
            source: {
                fixtureId: fixture.id || "",
                sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : [],
            },
        };
    }

    function normalizeOrdinaryNncRequestedList(values = null, normalizer = (value) => value) {
        const source = Array.isArray(values)
            ? values
            : (values === null || typeof values === "undefined" ? [] : [values]);
        const seen = new Set();
        const normalizedValues = [];
        source.forEach((value) => {
            const normalized = normalizer(value);
            if (!normalized || seen.has(normalized)) {
                return;
            }
            seen.add(normalized);
            normalizedValues.push(normalized);
        });
        return normalizedValues;
    }

    function getOrdinaryNncFixtureStates(fixture = null) {
        return Object.keys(fixture?.states || {})
            .map((state) => normalizeOrdinaryNncState(state))
            .filter(Boolean);
    }

    function getOrdinaryNncFixtureNumbersForState(fixture = null, state = "") {
        const stateData = fixture?.states?.[state] || null;
        if (!stateData) {
            return [];
        }
        if (state === ORDINARY_NNC_STATE.possessive) {
            const numbers = Object.keys(stateData.numberFormsByPossessor || {});
            return numbers.map(normalizeOrdinaryNncNumber).filter(Boolean);
        }
        const numbers = Object.keys(stateData.numberForms || {});
        if (numbers.length) {
            return numbers.map(normalizeOrdinaryNncNumber).filter(Boolean);
        }
        return Array.isArray(stateData.surfaceForms) && stateData.surfaceForms.length ? ["singular"] : [];
    }

    function getOrdinaryNncPossessorInventory() {
        return getOrdinaryNncPossessiveEntries()
            .map((entry) => String(entry.value || ""))
            .filter(Boolean);
    }

    function normalizeOrdinaryNncRequestedPossessor(value = "") {
        const resolved = resolveOrdinaryNncPossessor(value);
        if (resolved && !resolved.unsupported && resolved.prefix) {
            return resolved.prefix;
        }
        if (value && typeof value === "object") {
            return String(value.prefix || value.value || value.id || value.personSubKey || "").trim();
        }
        return String(value || "").trim();
    }

    function getOrdinaryNncFixturePossessorsForStateNumber(fixture = null, state = "", number = "singular") {
        if (state !== ORDINARY_NNC_STATE.possessive) {
            return [];
        }
        const stateData = fixture?.states?.[state] || null;
        if (!stateData) {
            return [];
        }
        const byNumber = stateData.numberFormsByPossessor?.[number] || {};
        const numberPossessors = Object.keys(byNumber).filter(Boolean);
        if (numberPossessors.length) {
            return numberPossessors;
        }
        return Object.keys(stateData.surfaceByPossessor || {}).filter(Boolean);
    }

    function buildOrdinaryNncParadigmSetDiagnostic(diagnostic = null, {
        state = ORDINARY_NNC_STATE.absolutive,
        number = "singular",
        possessor = null,
    } = {}) {
        if (!diagnostic) {
            return null;
        }
        return {
            ...diagnostic,
            state,
            number,
            possessor: possessor || null,
        };
    }

    function buildOrdinaryNncParadigmSetResult({
        supported = false,
        stem = "",
        nounClass = "",
        animacy = "",
        entries = [],
        diagnostics = [],
        source = null,
    } = {}) {
        return {
            supported,
            stem,
            nounClass,
            animacy,
            entries,
            diagnostics,
            source,
        };
    }

    function generateOrdinaryNncParadigmSet({
        stem = "",
        states = null,
        numbers = null,
        possessors = null,
        subject = null,
        nounClass = "",
    } = {}) {
        const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
        const fixture = findOrdinaryNncFixture(normalizedStem);
        const requestedStates = normalizeOrdinaryNncRequestedList(states, (value) => normalizeOrdinaryNncState(value));
        const requestedNumbers = normalizeOrdinaryNncRequestedList(numbers, normalizeOrdinaryNncNumber);
        const requestedPossessors = normalizeOrdinaryNncRequestedList(possessors, normalizeOrdinaryNncRequestedPossessor);
        if (!fixture) {
            const state = requestedStates[0] || ORDINARY_NNC_STATE.absolutive;
            const number = requestedNumbers[0] || "singular";
            const possessor = state === ORDINARY_NNC_STATE.possessive ? (requestedPossessors[0] || null) : null;
            const directResult = generateOrdinaryNncParadigm({
                stem: normalizedStem,
                state,
                number,
                subject,
                possessor,
                nounClass,
            });
            return buildOrdinaryNncParadigmSetResult({
                supported: false,
                stem: normalizedStem,
                entries: [],
                diagnostics: (directResult.diagnostics || []).map((diagnostic) => (
                    buildOrdinaryNncParadigmSetDiagnostic(diagnostic, { state, number, possessor })
                )).filter(Boolean),
                source: null,
            });
        }
        const fixtureClass = String(fixture.nounClass || "");
        const setStates = requestedStates.length ? requestedStates : getOrdinaryNncFixtureStates(fixture);
        const entries = [];
        const diagnostics = [];
        setStates.forEach((state) => {
            const stateNumbers = requestedNumbers.length
                ? requestedNumbers
                : getOrdinaryNncFixtureNumbersForState(fixture, state);
            const effectiveNumbers = stateNumbers.length ? stateNumbers : ["singular"];
            effectiveNumbers.forEach((number) => {
                if (state === ORDINARY_NNC_STATE.possessive) {
                    const fixturePossessors = getOrdinaryNncFixturePossessorsForStateNumber(fixture, state, number);
                    const statePossessors = requestedPossessors.length
                        ? requestedPossessors
                        : (fixturePossessors.length ? fixturePossessors : getOrdinaryNncPossessorInventory());
                    statePossessors.forEach((possessor) => {
                        const directResult = generateOrdinaryNncParadigm({
                            stem: fixture.stem || normalizedStem,
                            state,
                            number,
                            subject,
                            possessor,
                            nounClass,
                        });
                        if (directResult.supported) {
                            entries.push(directResult);
                            return;
                        }
                        (directResult.diagnostics || []).forEach((diagnostic) => {
                            diagnostics.push(buildOrdinaryNncParadigmSetDiagnostic(diagnostic, { state, number, possessor }));
                        });
                    });
                    return;
                }
                const directResult = generateOrdinaryNncParadigm({
                    stem: fixture.stem || normalizedStem,
                    state,
                    number,
                    subject,
                    nounClass,
                });
                if (directResult.supported) {
                    entries.push(directResult);
                    return;
                }
                (directResult.diagnostics || []).forEach((diagnostic) => {
                    diagnostics.push(buildOrdinaryNncParadigmSetDiagnostic(diagnostic, { state, number, possessor: null }));
                });
            });
        });
        return buildOrdinaryNncParadigmSetResult({
            supported: entries.length > 0,
            stem: fixture.stem || normalizedStem,
            nounClass: fixtureClass,
            animacy: fixture.animacy || "",
            entries,
            diagnostics: diagnostics.filter(Boolean),
            source: {
                fixtureId: fixture.id || "",
                sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : [],
            },
        });
    }

    function resolveOrdinaryNncFixture(request = {}) {
        const source = request && typeof request === "object" ? request : { stem: request };
        const rawInput = source.stem ?? source.input ?? source.rawStem ?? source.rawInput ?? source.value ?? "";
        const normalizedInput = normalizeOrdinaryNncText(rawInput).replace(/[()]/g, "");
        const fixture = findOrdinaryNncFixture(normalizedInput);
        if (!fixture) {
            return null;
        }
        const fixtureStem = fixture.stem || normalizedInput;
        const paradigmSet = generateOrdinaryNncParadigmSet({
            stem: fixtureStem,
            states: source.states ?? source.state ?? null,
            numbers: source.numbers ?? source.number ?? null,
            possessors: source.possessors ?? source.possessor ?? source.possessivePrefix ?? null,
            subject: source.subject ?? null,
            nounClass: source.nounClass || "",
        });
        return {
            supported: true,
            kind: "ordinary-nnc-fixture",
            input: String(rawInput || ""),
            normalizedInput,
            fixture: {
                id: fixture.id || "",
                stem: fixtureStem,
                lemma: fixture.lemma || "",
                nounClass: String(fixture.nounClass || ""),
                animacy: fixture.animacy || "",
                aliases: Array.isArray(fixture.aliases) ? [...fixture.aliases] : [],
                sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : [],
            },
            paradigmSet,
        };
    }

    function getInstrumentivoResult({
        rawVerb,
        verbMeta,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        mode,
        possessivePrefix,
    }) {
        const commonNumberSuffix = "";
        const context = buildVerbDerivedNominalBuilderContext({
            kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            rawVerb,
            verbMeta,
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
        });
        if (context.error) {
            return { error: true };
        }
        const {
            nounSourceModel,
            directionalPrefix,
            derivedIsYawi,
            derivedIsWeya,
            derivationIsTransitive,
            resolvedDirectionalRuleMode,
            forwardStemContexts,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
        } = context;
        if (mode === INSTRUMENTIVO_MODE.absolutivo) {
            const entries = [];
            forwardStemContexts.forEach((stemContext) => {
                const nonactiveSourceChain = buildNonactiveSourceChain(
                    verbMeta,
                    stemContext.verb,
                    stemContext.analysisVerb,
                );
                const baseVerb = normalizeDerivationStemValue(nonactiveSourceChain?.baseVerb || "");
                const nonactiveRuleBase = getNounNonactiveRuleBase(baseVerb, verbMeta);
                let options = getVisibleNonactiveDerivationOptions(baseVerb, baseVerb, {
                    isTransitive: derivationIsTransitive,
                    isYawi: derivedIsYawi,
                    ruleBase: nonactiveRuleBase,
                    rootPlusYaBase: verbMeta.rootPlusYaBase,
                });
                const selectedNonactiveSuffix = shouldForceAllNonactiveOptions() ? null : getSelectedNonactiveSuffix();
                if (selectedNonactiveSuffix && options.some((option) => option.suffix === selectedNonactiveSuffix)) {
                    options = options.filter((option) => option.suffix === selectedNonactiveSuffix);
                }
                options.forEach((option) => {
                    const rawOptionStemSpec = option?.stemSpec || buildLiteralMorphStemSpec(
                        realizeMorphStemSpec(option?.stemSpec, option?.stem || "")
                    );
                    const stemSpec = applyNonactiveSourceChainStemSpec(
                        rawOptionStemSpec,
                        option?.stem || "",
                        nonactiveSourceChain,
                        { sourceSuffix: option?.suffix || "" },
                    );
                    const stem = realizeMorphStemSpec(stemSpec, "");
                    const analysisStem = directionalPrefix && stem.startsWith(directionalPrefix)
                        ? stem.slice(directionalPrefix.length)
                        : realizeMorphStemSpec(rawOptionStemSpec, option?.stem || "");
                    const applied = applyMorphologyRules({
                        subjectPrefix,
                        objectPrefix: stemContext.morphologyObjectPrefix,
                        subjectSuffix: commonNumberSuffix,
                        verb: stem,
                        tense: "presente-habitual",
                        analysisVerb: analysisStem,
                        sourceRawVerb: rawVerb,
                        isYawi: false,
                        isWeya: false,
                        directionalPrefix,
                        directionalRuleMode: resolvedDirectionalRuleMode,
                        isNounContext: true,
                        ...buildMorphologyMetaOptions(verbMeta),
                        indirectObjectMarker: resolvedIndirectObjectMarker,
                        thirdObjectMarker: resolvedThirdObjectMarker,
                    });
                    if (!applied || !applied.verb) {
                        return;
                    }
                    const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
                        sourceModel: nounSourceModel,
                        runtimeObjectPrefix: stemContext.morphologyObjectPrefix,
                        objectPrefix: applied.objectPrefix,
                        verb: applied.verb,
                        surfaceRuleMeta: applied.surfaceRuleMeta || null,
                    });
                    const placedStemSpec = resolvePlacedNominalStemSpec(nominalSurface, applied.verb, stemSpec);
                    const core = buildOutputPrefixedChain({
                        subjectPrefix: applied.subjectPrefix,
                        objectPrefix: nominalSurface.objectPrefix,
                        verb: nominalSurface.verb,
                        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                        surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                    });
                    const coreStemSpec = buildStructuredPrefixedStemSpec({
                        stemSpec: placedStemSpec,
                        verb: nominalSurface.verb,
                        subjectPrefix: applied.subjectPrefix,
                        objectPrefix: nominalSurface.objectPrefix,
                        output: core,
                        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                        surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                    }) || buildLiteralMorphStemSpec(core);
                    entries.push(buildVerbDerivedNominalEntry({
                        kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
                        sourceModel: nounSourceModel,
                        verb: core,
                        subjectSuffix: applied.subjectSuffix,
                        stemSpec: coreStemSpec,
                        sourceTense: "presente-habitual",
                        provenance: {
                            nonactiveSuffix: option?.suffix || "",
                            forward: stemContext.derivationProvenance || null,
                        },
                        metadata: {
                            runtimeObjectPrefix: stemContext.morphologyObjectPrefix,
                        },
                    }));
                });
            });
            const result = buildVerbDerivedNominalResult(entries, {
                kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            });
            if (!result.result) {
                return { error: true };
            }
            return result;
        }

        const resolvedPossessivePrefix = typeof possessivePrefix === "string"
            ? possessivePrefix
            : "";
        const entries = [];
        forwardStemContexts.forEach((stemContext) => {
            const applied = applyMorphologyRules({
                subjectPrefix,
                objectPrefix: stemContext.morphologyObjectPrefix,
                subjectSuffix: commonNumberSuffix,
                verb: stemContext.verb,
                tense: "imperfecto",
                analysisVerb: stemContext.analysisVerb,
                sourceRawVerb: rawVerb,
                isYawi: derivedIsYawi,
                isWeya: derivedIsWeya,
                directionalPrefix,
                directionalRuleMode: resolvedDirectionalRuleMode,
                isNounContext: true,
                ...buildMorphologyMetaOptions(verbMeta),
                indirectObjectMarker: resolvedIndirectObjectMarker,
                thirdObjectMarker: resolvedThirdObjectMarker,
            });
            if (!applied || !applied.verb) {
                return;
            }
            const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
                sourceModel: nounSourceModel,
                runtimeObjectPrefix: stemContext.morphologyObjectPrefix,
                objectPrefix: applied.objectPrefix,
                verb: applied.verb,
                surfaceRuleMeta: applied.surfaceRuleMeta || null,
            });
            const placedStemSpec = resolvePlacedNominalStemSpec(nominalSurface, applied.verb, stemContext.stemSpec);
            entries.push(buildVerbDerivedNominalEntry({
                kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
                sourceModel: nounSourceModel,
                verb: nominalSurface.verb,
                subjectSuffix: applied.subjectSuffix,
                stemSpec: placedStemSpec,
                surfaceObjectPrefix: nominalSurface.objectPrefix,
                runtimeObjectPrefix: stemContext.morphologyObjectPrefix,
                surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                sourceTense: "imperfecto",
                provenance: {
                    forward: stemContext.derivationProvenance || null,
                },
            }));
        });
        const result = buildVerbDerivedNominalResult(entries, {
            kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            possessivePrefix: resolvedPossessivePrefix,
            hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
            optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
        });
        if (!result.result) {
            return { error: true };
        }
        return result;
    }

    function getCalificativoInstrumentivoResult({
        rawVerb,
        verbMeta,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        possessivePrefix,
    }) {
        const context = buildVerbDerivedNominalBuilderContext({
            kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            rawVerb,
            verbMeta,
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            requireNonanimateSubject: true,
        });
        if (context.error) {
            return { error: true };
        }
        const {
            nounSourceModel,
            directionalPrefix,
            derivedIsYawi,
            forwardStemContexts,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
        } = context;
        const resolvedPossessivePrefix = typeof possessivePrefix === "string"
            ? possessivePrefix
            : "";
        const shouldCollapseMarkerEcho = Boolean(
            getForwardDerivationConfig(getNounDerivationTypeFromMeta(verbMeta))
            && (resolvedIndirectObjectMarker || resolvedThirdObjectMarker)
        );
        const calificativoMatrixBase = normalizeRuleBase(
            verbMeta?.exactBaseVerb
            || verbMeta?.sourceBase
            || verbMeta?.canonical?.sourceBase
            || nounSourceModel?.matrixBase
            || ""
        );
        const pasadoRemotoIsTransitive = Boolean(
            getBaseObjectSlots(verbMeta) > 0
            || verbMeta?.isMarkedTransitive
            || verbMeta?.isTaFusion
        );
        const entries = [];
        forwardStemContexts.forEach((stemContext) => {
            const pasadoRemotoStemEntries = buildPasadoRemotoStemEntries({
                verb: stemContext.verb || "",
                analysisVerb: stemContext.analysisVerb || stemContext.verb || "",
                rawAnalysisVerb: stemContext.analysisVerb || stemContext.verb || "",
                sourceRawVerb: rawVerb,
                isTransitive: pasadoRemotoIsTransitive,
                directionalPrefix,
                boundPrefix: verbMeta?.hasBoundMarker ? (verbMeta?.sourcePrefix || "") : "",
                boundPrefixes: Array.isArray(verbMeta?.boundPrefixes) ? verbMeta.boundPrefixes : [],
                boundExplicitFlags: Array.isArray(verbMeta?.boundExplicitFlags) ? verbMeta.boundExplicitFlags : [],
                directionalPrefixFromSlash: verbMeta?.directionalPrefixFromSlash || "",
                sourceSplitPrefix: verbMeta?.hasBoundMarker ? (verbMeta?.sourcePrefix || "") : "",
                sourcePrefix: verbMeta?.sourcePrefix || "",
                sourceBase: verbMeta?.sourceBase || verbMeta?.canonical?.sourceBase || verbMeta?.canonicalRuleBase || "",
                sourceCompositeBase: verbMeta?.canonical?.slashCompositeRuleBase || "",
                isYawi: derivedIsYawi,
                hasImpersonalTaPrefix: verbMeta?.hasImpersonalTaPrefix === true,
                hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                hasSlashMarker: verbMeta?.hasSlashMarker === true,
                hasSuffixSeparator: verbMeta?.hasSuffixSeparator === true,
                hasLeadingDash: verbMeta?.hasLeadingDash === true,
                hasBoundMarker: verbMeta?.hasBoundMarker === true,
                hasCompoundMarker: verbMeta?.hasCompoundMarker === true,
                hasNonspecificValence: resolveHasNonspecificValence(verbMeta),
                exactBaseVerb: calificativoMatrixBase,
                suppletiveStemSet: getSuppletiveStemSet(verbMeta),
                rootPlusYaBase: verbMeta?.rootPlusYaBase || "",
                rootPlusYaBasePronounceable: verbMeta?.rootPlusYaBasePronounceable || "",
                matrixBaseOverride: calificativoMatrixBase,
            });
            if (!pasadoRemotoStemEntries.length) {
                return;
            }
            const composedObjectPrefix = composeProjectiveObjectPrefix({
                objectPrefix: stemContext.morphologyObjectPrefix,
                markers: [resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || ""],
                subjectPrefix: "",
            });
            pasadoRemotoStemEntries.forEach((pasadoRemotoEntry) => {
                const predicateStemSpec = buildCalificativoInstrumentivoPredicateStemSpec(
                    pasadoRemotoEntry.stemSpec || null,
                    pasadoRemotoEntry.verb || "",
                );
                const predicateStem = realizeMorphStemSpec(
                    predicateStemSpec,
                    `${pasadoRemotoEntry.verb || ""}ka`,
                );
                if (!predicateStem || predicateStem === "—") {
                    return;
                }
                const baseForms = [predicateStem]
                    .map((form) => collapseCalificativoMarkerEcho({
                        form,
                        morphologyObjectPrefix: composedObjectPrefix || stemContext.morphologyObjectPrefix,
                        indirectObjectMarker: resolvedIndirectObjectMarker,
                        thirdObjectMarker: resolvedThirdObjectMarker,
                        enable: shouldCollapseMarkerEcho,
                    }));
                if (!baseForms.length) {
                    return;
                }
                baseForms.forEach((form) => {
                    const baseStemSpec = (
                        form === predicateStem
                        && predicateStemSpec
                        && typeof predicateStemSpec === "object"
                        && predicateStemSpec.kind
                    )
                        ? predicateStemSpec
                        : buildLiteralMorphStemSpec(form);
                    const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
                        sourceModel: nounSourceModel,
                        runtimeObjectPrefix: composedObjectPrefix || stemContext.morphologyObjectPrefix,
                        objectPrefix: composedObjectPrefix || "",
                        verb: form,
                        surfaceRuleMeta: null,
                    });
                    const placedStemSpec = resolvePlacedNominalStemSpec(nominalSurface, form, baseStemSpec);
                    const objectChainForm = buildOutputPrefixedChain({
                        objectPrefix: nominalSurface.objectPrefix,
                        verb: nominalSurface.verb,
                        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                        surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                    });
                    const objectChainStemSpec = buildStructuredPrefixedStemSpec({
                        stemSpec: placedStemSpec,
                        verb: nominalSurface.verb,
                        subjectPrefix: "",
                        objectPrefix: nominalSurface.objectPrefix,
                        output: objectChainForm,
                        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                        surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                    }) || buildLiteralMorphStemSpec(objectChainForm);
                    entries.push(buildVerbDerivedNominalEntry({
                        kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
                        sourceModel: nounSourceModel,
                        verb: objectChainForm,
                        subjectSuffix: "",
                        stemSpec: objectChainStemSpec,
                        trailingSuffix: resolvedPossessivePrefix === "" ? "yut" : "",
                        sourceTense: "pasado-remoto",
                        provenance: {
                            pasadoRemotoEntry,
                            forward: stemContext.derivationProvenance || null,
                        },
                    }));
                });
            });
        });
        const result = buildVerbDerivedNominalResult(entries, {
            kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            possessivePrefix: resolvedPossessivePrefix,
            hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
            optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
        });
        if (!result.result) {
            return { error: true };
        }
        return result;
    }

    function getLocativoTemporalResult({
        rawVerb,
        verbMeta,
        objectPrefix,
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        possessivePrefix,
        combinedMode,
    }) {
        const resolvedMode = combinedMode || getCombinedMode();
        const isNonactive = resolvedMode === COMBINED_MODE.nonactive;
        const context = buildVerbDerivedNominalBuilderContext({
            kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
            rawVerb,
            verbMeta,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            combinedMode: resolvedMode,
        });
        if (context.error) {
            return { error: true };
        }
        const {
            nounSourceModel,
            directionalPrefix,
            derivedIsYawi,
            derivedIsWeya,
            derivationIsTransitive,
            resolvedDirectionalRuleMode,
            forwardStemContexts,
            objectPrefix: resolvedObjectPrefix,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
        } = context;
        const possessorInput = typeof possessivePrefix === "string" ? possessivePrefix : "";
        const isImpersonal = isNonactive && !possessorInput;
        const entries = [];
        forwardStemContexts.forEach((stemContext) => {
            let nonactiveStemSpecs = [stemContext.stemSpec || buildLiteralMorphStemSpec(stemContext.verb)];
            if (isNonactive) {
                const nonactiveSourceChain = buildNonactiveSourceChain(
                    verbMeta,
                    stemContext.verb,
                    stemContext.analysisVerb,
                );
                const nonactiveBaseVerb = normalizeDerivationStemValue(nonactiveSourceChain?.baseVerb || "");
                const nonactiveRuleBase = getNounNonactiveRuleBase(nonactiveBaseVerb, verbMeta);
                const selection = resolveNonactiveStemSelection(nonactiveBaseVerb, nonactiveBaseVerb, {
                    isTransitive: derivationIsTransitive,
                    isYawi: derivedIsYawi,
                    forceAll: shouldForceAllNonactiveOptions(),
                    ruleBase: nonactiveRuleBase,
                    rootPlusYaBase: verbMeta.rootPlusYaBase,
                });
                const selectedStemSpecList = Array.isArray(selection.selectedStemSpecs)
                    ? selection.selectedStemSpecs.filter(Boolean)
                    : [];
                const rawStemSpecs = (!selection.selectedSuffix && Array.isArray(selection.allStemSpecs) && selection.allStemSpecs.length > 1)
                    ? selection.allStemSpecs
                    : ((selection.selectedSuffix && selectedStemSpecList.length > 1)
                        ? selectedStemSpecList
                        : [selection.selectedStemSpec || buildLiteralMorphStemSpec(selection.selectedStem)]);
                nonactiveStemSpecs = rawStemSpecs
                    .map((spec, index) => applyNonactiveSourceChainStemSpec(
                        spec,
                        Array.isArray(selection.selectedStems) ? selection.selectedStems[index] || selection.selectedStem || "" : selection.selectedStem || "",
                        nonactiveSourceChain,
                        { sourceSuffix: selection.selectedSuffix || "" },
                    ))
                    .filter(Boolean);
            }
            const nonactiveStemEntries = (nonactiveStemSpecs || [])
                .map((spec) => ({
                    stemSpec: spec,
                    stem: realizeMorphStemSpec(spec, ""),
                }))
                .filter((entry) => Boolean(entry.stem));
            if (!nonactiveStemEntries.length) {
                return;
            }
            let sourceObjectPrefix = resolvedObjectPrefix;
            if (isNonactive) {
                const passive = applyPassiveImpersonal({
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: resolvedObjectPrefix,
                    analysisVerb: stripDirectionalPrefixFromStem(nonactiveStemEntries[0].stem, directionalPrefix),
                });
                sourceObjectPrefix = passive.objectPrefix;
            }
            const locativeObjectPrefix = sourceObjectPrefix === resolvedObjectPrefix
                ? stemContext.morphologyObjectPrefix
                : sourceObjectPrefix;
            nonactiveStemEntries.forEach(({ stemSpec, stem }) => {
                const stemAnalysisLocal = stripDirectionalPrefixFromStem(stem, directionalPrefix);
                const applied = applyMorphologyRules({
                    subjectPrefix: "",
                    objectPrefix: locativeObjectPrefix,
                    subjectSuffix: "",
                    verb: stem,
                    tense: "imperfecto",
                    analysisVerb: stemAnalysisLocal,
                    sourceRawVerb: rawVerb,
                    isYawi: isNonactive ? false : derivedIsYawi,
                    isWeya: isNonactive ? false : derivedIsWeya,
                    directionalPrefix,
                    directionalRuleMode: resolvedDirectionalRuleMode,
                    isNounContext: true,
                    ...buildMorphologyMetaOptions(verbMeta),
                    indirectObjectMarker: resolvedIndirectObjectMarker,
                    thirdObjectMarker: resolvedThirdObjectMarker,
                });
                if (!applied || !applied.verb) {
                    return;
                }
                const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
                    sourceModel: nounSourceModel,
                    runtimeObjectPrefix: locativeObjectPrefix,
                    objectPrefix: applied.objectPrefix,
                    verb: applied.verb,
                    surfaceRuleMeta: applied.surfaceRuleMeta || null,
                });
                const placedStemSpec = resolvePlacedNominalStemSpec(
                    nominalSurface,
                    applied.verb,
                    isNonactive ? stemSpec : null
                );
                entries.push(buildVerbDerivedNominalEntry({
                    kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
                    sourceModel: nounSourceModel,
                    verb: nominalSurface.verb,
                    subjectSuffix: applied.subjectSuffix,
                    stemSpec: placedStemSpec,
                    runtimeObjectPrefix: locativeObjectPrefix,
                    surfaceObjectPrefix: nominalSurface.objectPrefix,
                    surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                    trailingSuffix: "n",
                    sourceTense: isNonactive ? "imperfecto-no-activo" : "imperfecto",
                    provenance: {
                        forward: stemContext.derivationProvenance || null,
                    },
                }));
            });
        });
        const result = buildVerbDerivedNominalResult(entries, {
            kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
            possessivePrefix: possessorInput,
        });
        if (!result.result) {
            return { error: true };
        }
        return {
            ...result,
            possessorPrefix: possessorInput,
            isImpersonal,
        };
    }

    return {
        getInstrumentivoResult,
        getCalificativoInstrumentivoResult,
        getLocativoTemporalResult,
        generateOrdinaryNncParadigm,
        generateOrdinaryNncParadigmSet,
        resolveOrdinaryNncFixture,
    };
}

export function installNncGlobals(targetObject = globalThis) {
    const api = createNncApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
