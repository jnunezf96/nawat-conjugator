"use strict";

/**
 * Tests for src/core/nnc/nnc.js.
 * These cover the current verb-derived nominal API, not full ordinary NNC paradigms.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc");
    const summarizeOrdinaryNnc = (result) => result && ({
        supported: result.supported,
        result: result.result,
        surfaceForms: result.surfaceForms,
        stem: result.stem,
        state: result.state,
        nounClass: result.nounClass,
        animacy: result.animacy,
        number: result.number,
        subject: result.subject,
        possessor: result.possessor,
        diagnostics: result.diagnostics,
    });
    const summarizeGeneratedOrdinaryNnc = (result) => result && ({
        generationRoute: result.generationRoute || "",
        supported: result.supported === true,
        result: result.result || "",
        surfaceForms: result.surfaceForms || [],
        stem: result.stem || "",
        state: result.state || "",
        nounClass: result.nounClass || "",
        animacy: result.animacy || "",
        number: result.number || "",
        subjectKey: result.subject ? result.subject.personSubKey : null,
        possessorPrefix: result.possessor ? result.possessor.prefix : null,
        diagnostics: result.diagnostics || [],
        isReflexive: result.isReflexive === true,
        stemProvenance: result.stemProvenance || null,
    });
    const summarizeOrdinaryNncSet = (result) => result && ({
        supported: result.supported,
        stem: result.stem,
        nounClass: result.nounClass,
        animacy: result.animacy,
        entries: Array.isArray(result.entries)
            ? result.entries.map((entry) => ({
                result: entry.result,
                surfaceForms: entry.surfaceForms,
                state: entry.state,
                number: entry.number,
                possessor: entry.possessor ? entry.possessor.prefix : null,
            }))
            : [],
        diagnostics: result.diagnostics,
        source: result.source,
    });
    const summarizeOrdinaryNncFixtureProbe = (result) => result && ({
        supported: result.supported,
        kind: result.kind,
        input: result.input,
        normalizedInput: result.normalizedInput,
        fixture: result.fixture,
        paradigmSet: summarizeOrdinaryNncSet(result.paradigmSet),
    });

    const buildSilentNounRequest = ({
        tense,
        verb,
        objectPrefix = "",
        possessivePrefix = "",
        subjectPrefix = "",
        subjectSuffix = "",
        derivationMode = ctx.DERIVATION_MODE.active,
        voiceMode = ctx.VOICE_MODE.active,
    }) => ({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tense,
                tenseMode: ctx.TENSE_MODE.sustantivo,
                derivationMode,
                voiceMode,
            },
        },
        prefixInputs: {
            subjectPrefix,
            objectPrefix,
            verb,
            subjectSuffix,
            possessivePrefix,
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    const buildSilentOrdinaryNncRequest = ({
        stem,
        state = "absolutive",
        number = "singular",
        possessor = "",
        subjectPrefix = "",
        subjectSuffix = "",
    }) => ({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tense: "ordinary-nnc",
                tenseMode: ctx.TENSE_MODE.sustantivo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
                ordinaryNnc: {
                    enabled: true,
                    state,
                    number,
                    possessor,
                },
            },
        },
        prefixInputs: {
            subjectPrefix,
            objectPrefix: "",
            verb: stem,
            subjectSuffix,
            possessivePrefix: possessor,
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });

    const nemiMeta = ctx.parseVerbInput("(nemi)");
    const directInstrumentivo = ctx.getInstrumentivoResult({
        rawVerb: "(nemi)",
        verbMeta: nemiMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        mode: ctx.INSTRUMENTIVO_MODE.absolutivo,
        possessivePrefix: "",
    });
    s.eq("direct instrumentivo returns stable display text", directInstrumentivo.result, "nemiwani / nemuwani");
    s.eq("direct instrumentivo returns structured entries", directInstrumentivo.entries.length, 2);
    s.eq("direct instrumentivo records derivation kind", directInstrumentivo.nounDerivationKind, "instrumentivo");
    s.eq("direct instrumentivo records source tense", directInstrumentivo.entries[0].sourceTense, "presente-habitual");

    const generatedInstrumentivo = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "instrumentivo",
        verb: "(nemi)",
    }));
    s.eq("generateWord instrumentivo matches direct helper text", generatedInstrumentivo.result, directInstrumentivo.result);
    s.eq("generateWord instrumentivo exposes surface forms", generatedInstrumentivo.surfaceForms, ["nemiwani", "nemuwani"]);

    const mikiMeta = ctx.parseVerbInput("(miki)");
    const directCalificativo = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
    });
    s.eq("direct calificativo-instrumentivo keeps nominal yut suffix", directCalificativo.result, "mikkayut");
    s.eq("direct calificativo-instrumentivo records source tense", directCalificativo.entries[0].sourceTense, "pasado-remoto");

    const generatedCalificativo = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "calificativo-instrumentivo",
        verb: "(miki)",
    }));
    s.eq("generateWord calificativo-instrumentivo matches direct helper text", generatedCalificativo.result, directCalificativo.result);
    s.eq("generateWord calificativo-instrumentivo exposes surface form", generatedCalificativo.surfaceForms, ["mikkayut"]);

    const directLocativo = ctx.getLocativoTemporalResult({
        rawVerb: "(nemi)",
        verbMeta: nemiMeta,
        objectPrefix: "",
        possessivePrefix: "",
        combinedMode: ctx.COMBINED_MODE.active,
    });
    s.eq("direct locativo-temporal keeps trailing n", directLocativo.result, "nemiyan");
    s.eq("direct locativo-temporal records source tense", directLocativo.entries[0].sourceTense, "imperfecto");

    const generatedLocativo = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "locativo-temporal",
        verb: "(nemi)",
    }));
    s.eq("generateWord locativo-temporal matches direct helper text", generatedLocativo.result, directLocativo.result);
    s.eq("generateWord locativo-temporal exposes surface form", generatedLocativo.surfaceForms, ["nemiyan"]);

    const piyaMeta = ctx.parseVerbInput("-(piya)");
    const directPossessedInstrumentivo = ctx.getInstrumentivoResult({
        rawVerb: "-(piya)",
        verbMeta: piyaMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "ta",
        mode: ctx.INSTRUMENTIVO_MODE.posesivo,
        possessivePrefix: "i",
    });
    const generatedPossessedInstrumentivo = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "instrumentivo",
        verb: "-(piya)",
        objectPrefix: "ta",
        possessivePrefix: "i",
    }));
    s.eq("generateWord possessed instrumentivo matches direct helper text", generatedPossessedInstrumentivo.result, directPossessedInstrumentivo.result);
    s.eq("generateWord possessed instrumentivo exposes surface form", generatedPossessedInstrumentivo.surfaceForms, ["itapiyaya"]);

    const unsupportedCalificativo = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "ni",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
    });
    s.eq("direct calificativo-instrumentivo rejects animate subject", unsupportedCalificativo.error, true);

    const generateVerbFirstPresent = (verb) => ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        prefixInputs: {
            subjectPrefix: "ni",
            objectPrefix: "",
            verb,
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.eq(
        "ordinary NNC fixture input remains verb-first without opt-in",
        ["kal", "shuchit", "mistun"].map((stem) => {
            const result = generateVerbFirstPresent(stem);
            return {
                error: result.error === true,
                result: result.result || "",
                surfaceForms: result.surfaceForms || [],
                generationRoute: result.generationRoute || "",
            };
        }),
        [
            { error: true, result: "—", surfaceForms: [], generationRoute: "" },
            { error: true, result: "—", surfaceForms: [], generationRoute: "" },
            { error: true, result: "—", surfaceForms: [], generationRoute: "" },
        ]
    );
    [
        {
            label: "ordinary NNC opt-in generation returns kal absolutive",
            request: buildSilentOrdinaryNncRequest({ stem: "kal" }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "kal",
                surfaceForms: ["kal"],
                stem: "kal",
                state: "absolutive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: null,
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation returns kal possessive nu",
            request: buildSilentOrdinaryNncRequest({
                stem: "kal",
                state: "possessive",
                possessor: "nu",
                subjectPrefix: "ti",
                subjectSuffix: "t",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "nukal",
                surfaceForms: ["nukal"],
                stem: "kal",
                state: "possessive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "1pl",
                possessorPrefix: "nu",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation returns mistun possessive nu",
            request: buildSilentOrdinaryNncRequest({
                stem: "mistun",
                state: "possessive",
                possessor: "nu",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "numistun",
                surfaceForms: ["numistun"],
                stem: "mistun",
                state: "possessive",
                nounClass: "lexical",
                animacy: "animate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "nu",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation returns mistun possessive mu",
            request: buildSilentOrdinaryNncRequest({
                stem: "mistun",
                state: "possessive",
                possessor: "mu",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "mumistun",
                surfaceForms: ["mumistun"],
                stem: "mistun",
                state: "possessive",
                nounClass: "lexical",
                animacy: "animate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "mu",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation returns unsupported plural diagnostic",
            request: buildSilentOrdinaryNncRequest({
                stem: "kal",
                number: "plural",
                subjectSuffix: "t",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: false,
                result: "",
                surfaceForms: [],
                stem: "kal",
                state: "absolutive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "plural",
                subjectKey: "3pl",
                possessorPrefix: null,
                diagnostics: [{
                    id: "ordinary-nnc-unsupported-number",
                    severity: "unsupported",
                    message: "No ordinary NNC absolutive plural form is configured for stem \"kal\".",
                }],
                isReflexive: false,
                stemProvenance: null,
            },
        },
    ].forEach(({ label, request, expected }) => {
        s.eq(label, summarizeGeneratedOrdinaryNnc(ctx.executeGenerateWordRequest(request)), expected);
    });
    const buildOrdinaryNncGenerateWordRequest = typeof ctx.buildOrdinaryNncGenerateWordRequest === "function"
        ? (options) => ctx.buildOrdinaryNncGenerateWordRequest(options)
        : () => ({});
    [
        {
            label: "ordinary NNC UI request path returns kal absolutive",
            request: buildOrdinaryNncGenerateWordRequest({
                explicit: true,
                stem: "kal",
                state: "absolutive",
                number: "singular",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "kal",
                surfaceForms: ["kal"],
                stem: "kal",
                state: "absolutive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: null,
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC UI request path returns kal possessive nu",
            request: buildOrdinaryNncGenerateWordRequest({
                explicit: true,
                stem: "kal",
                state: "possessive",
                number: "singular",
                possessor: "nu",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "nukal",
                surfaceForms: ["nukal"],
                stem: "kal",
                state: "possessive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "nu",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC UI request path returns mistun possessive mu",
            request: buildOrdinaryNncGenerateWordRequest({
                explicit: true,
                stem: "mistun",
                state: "possessive",
                number: "singular",
                possessor: "mu",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "mumistun",
                surfaceForms: ["mumistun"],
                stem: "mistun",
                state: "possessive",
                nounClass: "lexical",
                animacy: "animate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "mu",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC UI request path preserves plural diagnostic",
            request: buildOrdinaryNncGenerateWordRequest({
                explicit: true,
                stem: "kal",
                state: "absolutive",
                number: "plural",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: false,
                result: "",
                surfaceForms: [],
                stem: "kal",
                state: "absolutive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "plural",
                subjectKey: "3pl",
                possessorPrefix: null,
                diagnostics: [{
                    id: "ordinary-nnc-unsupported-number",
                    severity: "unsupported",
                    message: "No ordinary NNC absolutive plural form is configured for stem \"kal\".",
                }],
                isReflexive: false,
                stemProvenance: null,
            },
        },
    ].forEach(({ label, request, expected }) => {
        s.eq(label, summarizeGeneratedOrdinaryNnc(ctx.executeGenerateWordRequest(request)), expected);
    });

    s.eq("ordinary NNC direct helper is exported", typeof ctx.generateOrdinaryNncParadigm, "function");
    const kalAbsolutive = ctx.generateOrdinaryNncParadigm({
        stem: "kal",
        state: "absolutive",
        subject: { subjectPrefix: "", subjectSuffix: "" },
        number: "singular",
    });
    s.eq(
        "ordinary NNC fixture generates kal absolutive",
        summarizeOrdinaryNnc(kalAbsolutive),
        {
            supported: true,
            result: "kal",
            surfaceForms: ["kal"],
            stem: "kal",
            state: "absolutive",
            nounClass: "zero",
            animacy: "inanimate",
            number: "singular",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: null,
            diagnostics: [],
        }
    );
    const kalPossessive = ctx.generateOrdinaryNncParadigm({
        stem: "kal",
        state: "possessive",
        subject: { subjectPrefix: "ti", subjectSuffix: "t" },
        possessor: "nu",
        number: "singular",
    });
    s.eq(
        "ordinary NNC fixture keeps possessor separate from subject",
        summarizeOrdinaryNnc(kalPossessive),
        {
            supported: true,
            result: "nukal",
            surfaceForms: ["nukal"],
            stem: "kal",
            state: "possessive",
            nounClass: "zero",
            animacy: "inanimate",
            number: "singular",
            subject: { subjectPrefix: "ti", subjectSuffix: "t", person: 1, number: "plural", personSubKey: "1pl" },
            possessor: { id: "1s", prefix: "nu", personSubKey: "1sg", number: "singular" },
            diagnostics: [],
        }
    );
    s.eq(
        "ordinary NNC fixture covers configured kal singular possessive prefixes",
        ["nu", "mu", "i", "tu", "anmu", "in"].map((prefix) => (
            ctx.generateOrdinaryNncParadigm({
                stem: "kal",
                state: "possessive",
                possessor: prefix,
                number: "singular",
            }).result
        )),
        ["nukal", "mukal", "ikal", "tukal", "anmukal", "inkal"]
    );
    s.eq(
        "ordinary NNC plural request stays unsupported without fixture data",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "kal",
            state: "absolutive",
            subject: { subjectPrefix: "", subjectSuffix: "t" },
            number: "pl",
        })),
        {
            supported: false,
            result: "",
            surfaceForms: [],
            stem: "kal",
            state: "absolutive",
            nounClass: "zero",
            animacy: "inanimate",
            number: "plural",
            subject: { subjectPrefix: "", subjectSuffix: "t", person: 3, number: "plural", personSubKey: "3pl" },
            possessor: null,
            diagnostics: [{
                id: "ordinary-nnc-unsupported-number",
                severity: "unsupported",
                message: "No ordinary NNC absolutive plural form is configured for stem \"kal\".",
            }],
        }
    );
    s.eq(
        "ordinary NNC possessive plural noun request is not plural possessor",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "kal",
            state: "possessive",
            possessor: "in",
            number: "plural",
        })),
        {
            supported: false,
            result: "",
            surfaceForms: [],
            stem: "kal",
            state: "possessive",
            nounClass: "zero",
            animacy: "inanimate",
            number: "plural",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: { id: "3p", prefix: "in", personSubKey: "3pl", number: "plural" },
            diagnostics: [{
                id: "ordinary-nnc-unsupported-number",
                severity: "unsupported",
                message: "No ordinary NNC possessive plural form is configured for stem \"kal\".",
            }],
        }
    );
    s.eq(
        "ordinary NNC fixture generates shuchi absolutive only from explicit data",
        ctx.generateOrdinaryNncParadigm({
            stem: "shuchi",
            state: "absolutive",
            number: "singular",
        }).surfaceForms,
        ["shuchit"]
    );
    s.eq(
        "ordinary NNC fixture generates user-provided shuchi singular possessives",
        ["nu", "mu"].map((possessor) => (
            ctx.generateOrdinaryNncParadigm({
                stem: "shuchit",
                state: "possessive",
                possessor,
                number: "singular",
            }).result
        )),
        ["nushuchiw", "mushuchiw"]
    );
    s.eq(
        "ordinary NNC fixture generates user-provided mistun singular forms",
        [
            ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "absolutive",
                number: "singular",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "possessive",
                possessor: "nu",
                number: "singular",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "possessive",
                possessor: "mu",
                number: "singular",
            }).result,
        ],
        ["mistun", "numistun", "mumistun"]
    );
    s.eq(
        "ordinary NNC lexical label fixtures generate explicit absolutives",
        ["tukayit", "machiyut", "majmachiyut"].map((stem) => (
            ctx.generateOrdinaryNncParadigm({
                stem,
                state: "absolutive",
                number: "singular",
            }).surfaceForms
        )),
        [["tukayit"], ["machiyut"], ["majmachiyut"]]
    );
    s.eq(
        "ordinary NNC lexical label fixtures expose evidence refs",
        [
            { stem: "a", refs: ["src/tests/parsing.test.js:95"] },
            { stem: "tukayit", refs: ["data/static_labels.json:4", "data/static_modes.json:14"] },
            { stem: "machiyut", refs: ["data/static_labels.json:29", "data/basic-data.csv:1623"] },
            { stem: "majmachiyut", refs: ["data/static_labels.json:25"] },
        ].map(({ stem }) => {
            const result = ctx.generateOrdinaryNncParadigm({
                stem,
                state: "absolutive",
                number: "singular",
            });
            return {
                stem: result.stem,
                result: result.result,
                fixtureId: result.source && result.source.fixtureId,
                sourceRefs: result.source && result.source.sourceRefs,
            };
        }),
        [
            { stem: "a", result: "at", fixtureId: "a", sourceRefs: ["src/tests/parsing.test.js:95"] },
            { stem: "tukayit", result: "tukayit", fixtureId: "tukayit", sourceRefs: ["data/static_labels.json:4", "data/static_modes.json:14"] },
            { stem: "machiyut", result: "machiyut", fixtureId: "machiyut", sourceRefs: ["data/static_labels.json:29", "data/basic-data.csv:1623"] },
            { stem: "majmachiyut", result: "majmachiyut", fixtureId: "majmachiyut", sourceRefs: ["data/static_labels.json:25"] },
        ]
    );
    s.eq(
        "ordinary NNC lexical label fixture keeps unconfigured possessive unsupported",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "tukayit",
            state: "possessive",
            possessor: "nu",
            number: "singular",
        })),
        {
            supported: false,
            result: "",
            surfaceForms: [],
            stem: "tukayit",
            state: "possessive",
            nounClass: "lexical",
            animacy: "inanimate",
            number: "singular",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: { id: "1s", prefix: "nu", personSubKey: "1sg", number: "singular" },
            diagnostics: [{
                id: "ordinary-nnc-unsupported-possessive-state",
                severity: "unsupported",
                message: "No ordinary NNC possessive forms are configured for stem \"tukayit\".",
            }],
        }
    );
    s.eq(
        "ordinary NNC fixture generates shuchi user-provided possessive state",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "shuchi",
            state: "possessive",
            possessor: "nu",
            number: "singular",
        })),
        {
            supported: true,
            result: "nushuchiw",
            surfaceForms: ["nushuchiw"],
            stem: "shuchi",
            state: "possessive",
            nounClass: "t",
            animacy: "inanimate",
            number: "singular",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: { id: "1s", prefix: "nu", personSubKey: "1sg", number: "singular" },
            diagnostics: [],
        }
    );
    s.eq(
        "ordinary NNC unsupported stem returns diagnostic without guessing",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "unconfigured-nnc",
            state: "absolutive",
            number: "singular",
        })),
        {
            supported: false,
            result: "",
            surfaceForms: [],
            stem: "unconfigured-nnc",
            state: "absolutive",
            nounClass: "",
            animacy: "",
            number: "singular",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: null,
            diagnostics: [{
                id: "ordinary-nnc-unsupported-stem",
                severity: "unsupported",
                message: "No ordinary NNC fixture is configured for stem \"unconfigured-nnc\".",
            }],
        }
    );
    s.eq("ordinary NNC paradigm-set helper is exported", typeof ctx.generateOrdinaryNncParadigmSet, "function");
    s.eq("ordinary NNC read-only fixture probe is exported", typeof ctx.resolveOrdinaryNncFixture, "function");
    const resolveOrdinaryNncFixture = typeof ctx.resolveOrdinaryNncFixture === "function"
        ? (request) => ctx.resolveOrdinaryNncFixture(request)
        : () => undefined;
    s.eq(
        "ordinary NNC read-only fixture probe resolves supported fixture stem",
        summarizeOrdinaryNncFixtureProbe(resolveOrdinaryNncFixture({
            stem: "kal",
            states: ["absolutive"],
            numbers: ["singular"],
        })),
        {
            supported: true,
            kind: "ordinary-nnc-fixture",
            input: "kal",
            normalizedInput: "kal",
            fixture: {
                id: "kal",
                stem: "kal",
                lemma: "kal",
                nounClass: "zero",
                animacy: "inanimate",
                aliases: [],
                sourceRefs: ["data/static_parse_tests.json:49", "data/basic-data.csv:174"],
            },
            paradigmSet: {
                supported: true,
                stem: "kal",
                nounClass: "zero",
                animacy: "inanimate",
                entries: [
                    { result: "kal", surfaceForms: ["kal"], state: "absolutive", number: "singular", possessor: null },
                ],
                diagnostics: [],
                source: {
                    fixtureId: "kal",
                    sourceRefs: ["data/static_parse_tests.json:49", "data/basic-data.csv:174"],
                },
            },
        }
    );
    s.eq(
        "ordinary NNC read-only fixture probe resolves lemma input",
        summarizeOrdinaryNncFixtureProbe(resolveOrdinaryNncFixture("shuchit")),
        {
            supported: true,
            kind: "ordinary-nnc-fixture",
            input: "shuchit",
            normalizedInput: "shuchit",
            fixture: {
                id: "shuchi",
                stem: "shuchi",
                lemma: "shuchit",
                nounClass: "t",
                animacy: "inanimate",
                aliases: [],
                sourceRefs: ["data/static_parse_tests.json:16", "src/tests/parsing.test.js:91", "user-provided:2026-06-04"],
            },
            paradigmSet: {
                supported: true,
                stem: "shuchi",
                nounClass: "t",
                animacy: "inanimate",
                entries: [
                    { result: "shuchit", surfaceForms: ["shuchit"], state: "absolutive", number: "singular", possessor: null },
                    { result: "nushuchiw", surfaceForms: ["nushuchiw"], state: "possessive", number: "singular", possessor: "nu" },
                    { result: "mushuchiw", surfaceForms: ["mushuchiw"], state: "possessive", number: "singular", possessor: "mu" },
                ],
                diagnostics: [],
                source: {
                    fixtureId: "shuchi",
                    sourceRefs: ["data/static_parse_tests.json:16", "src/tests/parsing.test.js:91", "user-provided:2026-06-04"],
                },
            },
        }
    );
    s.eq(
        "ordinary NNC read-only fixture probe returns null for unsupported stem",
        resolveOrdinaryNncFixture({ stem: "unconfigured-nnc" }),
        null
    );
    const ordinaryNncProbeRequest = {
        stem: "kal",
        states: ["possessive"],
        numbers: ["singular"],
        possessors: ["nu", "mu"],
    };
    s.eq(
        "ordinary NNC read-only fixture probe returns the direct paradigm set",
        resolveOrdinaryNncFixture(ordinaryNncProbeRequest).paradigmSet,
        ctx.generateOrdinaryNncParadigmSet(ordinaryNncProbeRequest)
    );
    s.eq(
        "ordinary NNC read-only fixture probe preserves unsupported slot diagnostics",
        summarizeOrdinaryNncFixtureProbe(resolveOrdinaryNncFixture({
            stem: "shuchi",
            states: ["absolutive", "possessive"],
            numbers: ["singular", "plural"],
            possessors: ["nu"],
        })),
        {
            supported: true,
            kind: "ordinary-nnc-fixture",
            input: "shuchi",
            normalizedInput: "shuchi",
            fixture: {
                id: "shuchi",
                stem: "shuchi",
                lemma: "shuchit",
                nounClass: "t",
                animacy: "inanimate",
                aliases: [],
                sourceRefs: ["data/static_parse_tests.json:16", "src/tests/parsing.test.js:91", "user-provided:2026-06-04"],
            },
            paradigmSet: {
                supported: true,
                stem: "shuchi",
                nounClass: "t",
                animacy: "inanimate",
                entries: [
                    { result: "shuchit", surfaceForms: ["shuchit"], state: "absolutive", number: "singular", possessor: null },
                    { result: "nushuchiw", surfaceForms: ["nushuchiw"], state: "possessive", number: "singular", possessor: "nu" },
                ],
                diagnostics: [
                    {
                        id: "ordinary-nnc-unsupported-number",
                        severity: "unsupported",
                        message: "No ordinary NNC absolutive plural form is configured for stem \"shuchi\".",
                        state: "absolutive",
                        number: "plural",
                        possessor: null,
                    },
                    {
                        id: "ordinary-nnc-unsupported-number",
                        severity: "unsupported",
                        message: "No ordinary NNC possessive plural form is configured for stem \"shuchi\".",
                        state: "possessive",
                        number: "plural",
                        possessor: "nu",
                    },
                ],
                source: {
                    fixtureId: "shuchi",
                    sourceRefs: ["data/static_parse_tests.json:16", "src/tests/parsing.test.js:91", "user-provided:2026-06-04"],
                },
            },
        }
    );
    s.eq(
        "ordinary NNC paradigm-set enumerates only fixture-backed kal entries",
        summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({ stem: "kal" })),
        {
            supported: true,
            stem: "kal",
            nounClass: "zero",
            animacy: "inanimate",
            entries: [
                { result: "kal", surfaceForms: ["kal"], state: "absolutive", number: "singular", possessor: null },
                { result: "nukal", surfaceForms: ["nukal"], state: "possessive", number: "singular", possessor: "nu" },
                { result: "mukal", surfaceForms: ["mukal"], state: "possessive", number: "singular", possessor: "mu" },
                { result: "ikal", surfaceForms: ["ikal"], state: "possessive", number: "singular", possessor: "i" },
                { result: "tukal", surfaceForms: ["tukal"], state: "possessive", number: "singular", possessor: "tu" },
                { result: "anmukal", surfaceForms: ["anmukal"], state: "possessive", number: "singular", possessor: "anmu" },
                { result: "inkal", surfaceForms: ["inkal"], state: "possessive", number: "singular", possessor: "in" },
            ],
            diagnostics: [],
            source: {
                fixtureId: "kal",
                sourceRefs: ["data/static_parse_tests.json:49", "data/basic-data.csv:174"],
            },
        }
    );
    s.eq(
        "ordinary NNC paradigm-set keeps shuchi supported absolutive and possessive entries",
        summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({
            stem: "shuchi",
            states: ["absolutive", "possessive"],
            numbers: ["singular"],
            possessors: ["nu"],
        })),
        {
            supported: true,
            stem: "shuchi",
            nounClass: "t",
            animacy: "inanimate",
            entries: [
                { result: "shuchit", surfaceForms: ["shuchit"], state: "absolutive", number: "singular", possessor: null },
                { result: "nushuchiw", surfaceForms: ["nushuchiw"], state: "possessive", number: "singular", possessor: "nu" },
            ],
            diagnostics: [],
            source: {
                fixtureId: "shuchi",
                sourceRefs: ["data/static_parse_tests.json:16", "src/tests/parsing.test.js:91", "user-provided:2026-06-04"],
            },
        }
    );
    s.eq(
        "ordinary NNC paradigm-set includes lexical label fixtures",
        ["tukayit", "machiyut", "majmachiyut"].map((stem) => summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({ stem }))),
        [
            {
                supported: true,
                stem: "tukayit",
                nounClass: "lexical",
                animacy: "inanimate",
                entries: [
                    { result: "tukayit", surfaceForms: ["tukayit"], state: "absolutive", number: "singular", possessor: null },
                ],
                diagnostics: [],
                source: {
                    fixtureId: "tukayit",
                    sourceRefs: ["data/static_labels.json:4", "data/static_modes.json:14"],
                },
            },
            {
                supported: true,
                stem: "machiyut",
                nounClass: "lexical",
                animacy: "inanimate",
                entries: [
                    { result: "machiyut", surfaceForms: ["machiyut"], state: "absolutive", number: "singular", possessor: null },
                ],
                diagnostics: [],
                source: {
                    fixtureId: "machiyut",
                    sourceRefs: ["data/static_labels.json:29", "data/basic-data.csv:1623"],
                },
            },
            {
                supported: true,
                stem: "majmachiyut",
                nounClass: "lexical",
                animacy: "inanimate",
                entries: [
                    { result: "majmachiyut", surfaceForms: ["majmachiyut"], state: "absolutive", number: "singular", possessor: null },
                ],
                diagnostics: [],
                source: {
                    fixtureId: "majmachiyut",
                    sourceRefs: ["data/static_labels.json:25"],
                },
            },
        ]
    );
    s.eq(
        "ordinary NNC paradigm-set records requested plural diagnostics without fallback",
        summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({
            stem: "kal",
            states: ["absolutive"],
            numbers: ["singular", "plural"],
        })),
        {
            supported: true,
            stem: "kal",
            nounClass: "zero",
            animacy: "inanimate",
            entries: [
                { result: "kal", surfaceForms: ["kal"], state: "absolutive", number: "singular", possessor: null },
            ],
            diagnostics: [{
                id: "ordinary-nnc-unsupported-number",
                severity: "unsupported",
                message: "No ordinary NNC absolutive plural form is configured for stem \"kal\".",
                state: "absolutive",
                number: "plural",
                possessor: null,
            }],
            source: {
                fixtureId: "kal",
                sourceRefs: ["data/static_parse_tests.json:49", "data/basic-data.csv:174"],
            },
        }
    );
    s.eq(
        "ordinary NNC paradigm-set enumerates user-provided mistun entries",
        summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({ stem: "mistun" })),
        {
            supported: true,
            stem: "mistun",
            nounClass: "lexical",
            animacy: "animate",
            entries: [
                { result: "mistun", surfaceForms: ["mistun"], state: "absolutive", number: "singular", possessor: null },
                { result: "numistun", surfaceForms: ["numistun"], state: "possessive", number: "singular", possessor: "nu" },
                { result: "mumistun", surfaceForms: ["mumistun"], state: "possessive", number: "singular", possessor: "mu" },
            ],
            diagnostics: [],
            source: {
                fixtureId: "mistun",
                sourceRefs: ["user-provided:2026-06-04"],
            },
        }
    );
    s.eq(
        "ordinary NNC paradigm-set unsupported stem returns no entries",
        summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({ stem: "unconfigured-nnc" })),
        {
            supported: false,
            stem: "unconfigured-nnc",
            nounClass: "",
            animacy: "",
            entries: [],
            diagnostics: [{
                id: "ordinary-nnc-unsupported-stem",
                severity: "unsupported",
                message: "No ordinary NNC fixture is configured for stem \"unconfigured-nnc\".",
                state: "absolutive",
                number: "singular",
                possessor: null,
            }],
            source: null,
        }
    );

    return s;
}

module.exports = { run };
