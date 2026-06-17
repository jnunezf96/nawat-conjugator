// src/lessons/registry.js
// Curriculum metadata for the 58-lesson book sequence.
// This is NOT the physical architecture of the engine.
// Lessons are pedagogical entry points over the grammar engine.
//
// Status values:
//   "implemented"           — engine fully supports this domain
//   "partially-implemented" — some coverage, incomplete
//   "placeholder"           — no conjugation content or not yet mapped
//   "not-mapped"            — content exists in book but not in engine

const ANDREWS_TRAJECTORY_REDIRECT_ACTIONS = Object.freeze([
    "keep",
    "rename-visible-ui",
    "reframe-metadata",
    "diagnostic-only",
    "block-generation",
    "refactor-engine",
    "needs-nawat-evidence",
]);

const ANDREWS_PLAN_PURSUIT_AIM_STATUSES = Object.freeze([
    "queued",
    "shooting",
    "blocked",
    "closest-pass",
]);

const ANDREWS_PLAN_PURSUIT_ARROW_RESULTS = Object.freeze([
    "hit",
    "miss",
]);

const ANDREWS_TRAJECTORY_GROUPS = Object.freeze([
    {
        range: [1, 4],
        label: "Lessons 1-4",
        directive: "Foundation layer: use Andrews to define grammar terms, notation, particles, and nuclear-clause boundaries before UI or generation claims.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/concepts.test.js", "src/tests/orthography.test.js", "src/tests/particles.test.js", "src/tests/clause.test.js"],
    },
    {
        range: [5, 11],
        label: "Lessons 5-11",
        directive: "Basic VNC layer: Andrews directs subject, object, tense, valency, stem class, sentence boundary, and irregular categories.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/agreement.test.js", "src/tests/vnc.test.js", "src/tests/preterit.test.js", "src/tests/sentence.test.js", "src/tests/irregulars.test.js"],
    },
    {
        range: [12, 19],
        label: "Lessons 12-19",
        directive: "Basic NNC layer: Andrews directs absolutive, possessive, nounstem class, pronominal, and supplementation contracts without adding a tense slot.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "src/tests/parsing.test.js"],
    },
    {
        range: [20, 27],
        label: "Lessons 20-27",
        directive: "Derived verbstem layer: Andrews directs nonactive, passive, impersonal, object, causative, applicative, and frequentative derivation boundaries.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "src/tests/vnc.test.js", "src/tests/agreement.test.js"],
    },
    {
        range: [28, 34],
        label: "Lessons 28-34",
        directive: "Compound and special-stem layer: Andrews directs compound VNC/NNC, purposive, affective, honorific, and numeral boundaries.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/parsing.test.js", "src/tests/nnc.test.js"],
    },
    {
        range: [35, 43],
        label: "Lessons 35-43",
        directive: "Nominal and adjectival formation layer: Andrews directs nominalization, patientive, adjectival function, and modification boundaries.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "src/tests/nnc_adjectival.test.js", "src/tests/modification.test.js"],
    },
    {
        range: [44, 50],
        label: "Lessons 44-50",
        directive: "Relational and adverbial layer: Andrews directs adverbial nuclear clauses, relational NNCs, place/gentilic forms, and adjunction.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adverbial.test.js", "src/tests/adjunction.test.js"],
    },
    {
        range: [51, 58],
        label: "Lessons 51-58",
        directive: "Clause, denominal, name, and miscellany layer: Andrews directs complement, conjunction, comparison, denominal, name, and analysis boundaries.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/complement.test.js", "src/tests/conjunction.test.js"],
    },
]);

const ANDREWS_FOUNDATION_TRAJECTORY_OVERRIDES = Object.freeze({
    1: {
        pdfRefs: ["Andrews Lesson 1"],
        directive: "Use Andrews Lesson 1 as the grammar operating-system layer: CN/CNV/CNN units, notation, morph/morpheme/form, stem, stock, affix, and boundary terms direct later engine architecture.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-diagnostic",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/concepts.test.js"],
    },
    2: {
        pdfRefs: ["Andrews Lesson 2.1-2.16"],
        directive: "Use Andrews Lesson 2 for Classical sound and spelling categories, then route surfaces through the Nawat/Pipil orthography bridge before any Nawat realization.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/orthography.test.js"],
        plannedArrows: [
            {
                id: "lesson-2-subsection-coverage-audit",
                type: "metadata-diagnostic-test",
                aim: "Expose Andrews Lesson 2.1-2.16 as subsection-level coverage metadata, with open transition and syllable structure separated before any generation claim.",
                andrewsRefs: ["Andrews Lesson 2.1-2.16"],
                expectedFeedbackRefs: ["src/tests/orthography.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-2-subsection-coverage-audit",
                result: "hit",
                correction: "Lesson 2 coverage now carries subsection PDF refs, redirect actions, validation refs, a non-generation policy, and a Plan/Pursue shot frame.",
                andrewsRefs: ["Andrews Lesson 2.1-2.16"],
                feedbackRefs: ["src/tests/orthography.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Vowel length, stress/prosody, long consonants, glottal alternation, and evidence-sensitive spelling choices remain blocked, diagnostic-only, or Nawat-evidence-needed.",
    },
    3: {
        pdfRefs: ["Andrews Lesson 3"],
        directive: "Use Andrews Lesson 3 to classify particles as minor, placement-sensitive units; keep Particula mode diagnostic unless local Nawat particle evidence confirms surfaces and functions.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-adapted-seed-only",
        validationRefs: ["src/tests/registry.test.js", "src/tests/particles.test.js"],
        plannedArrows: [
            {
                id: "lesson-3-pdf-example-transfer-audit",
                type: "metadata-diagnostic-test",
                aim: "Transfer the remaining Andrews Lesson 3 particle-collocation examples into the diagnostic seed inventory with Nawat orthography adaptation and no generation permission.",
                andrewsRefs: ["Andrews Lesson 3.4"],
                expectedFeedbackRefs: ["src/tests/particles.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-3-pdf-example-transfer-audit",
                result: "hit",
                correction: "Missing Lesson 3.4 collocation examples are now in the Andrews-derived seed inventory with Spanish glosses, orthography-adapted display forms, and generation disabled.",
                andrewsRefs: ["Andrews Lesson 3.4"],
                feedbackRefs: ["src/tests/particles.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Confirmed local Nawat/Pipil particle inventory, placement evidence, and generation remain unavailable; Particula mode stays diagnostic-only.",
    },
    4: {
        pdfRefs: ["Andrews Lesson 4.1-4.6"],
        directive: "Use Andrews Lesson 4 to direct nuclear-clause architecture: subject plus predicate, VNC/CNV and NNC/CNN frames, formula boundaries, and no word-level collapse.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/clause.test.js", "src/tests/ui.test.js"],
        plannedArrows: [
            {
                id: "lesson-4-subsection-coverage-audit",
                type: "metadata-diagnostic-test",
                aim: "Expose Andrews Lesson 4.1-4.6 as subsection-level CNV/CNN architecture metadata before treating formula UI or engine frames as implemented.",
                andrewsRefs: ["Andrews Lesson 4.1-4.6"],
                expectedFeedbackRefs: ["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-4-subsection-coverage-audit",
                result: "hit",
                correction: "Lesson 4 frame now carries subsection PDF refs, Spanish directives, redirect actions, validation refs, and non-generation policy.",
                andrewsRefs: ["Andrews Lesson 4.1-4.6"],
                feedbackRefs: ["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Sentence syntax, formula data registry, 3a-person reference context, and detailed CNV/CNN filler paradigms remain partial or deferred to later lessons.",
    },
    5: {
        pdfRefs: ["Andrews Lesson 5.1-5.5"],
        directive: "Use Andrews Lesson 5 to direct the intransitive CNV/VNC formula, subject pronoun slot distribution, tense morph inventory, and Nawat/Pipil realization boundary.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js"],
        plannedArrows: [
            {
                id: "lesson-5-intransitive-vnc-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 5.1-5.5 against the intransitive CNV engine, subject slots, tense morph routing, and Nawat orthography bridge.",
                andrewsRefs: ["Andrews Lesson 5.1-5.5"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-5-intransitive-vnc-audit",
                result: "hit",
                correction: "Lesson 5 now carries subsection PDF refs, Spanish directives, intransitive formula metadata, subject filler paradigms, tense morph inventory, and explicit Nawat realization policy.",
                andrewsRefs: ["Andrews Lesson 5.1-5.5"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    6: {
        pdfRefs: ["Andrews Lesson 6.1-6.7"],
        directive: "Use Andrews Lesson 6 to direct transitive CNV/VNC valence: objective pronoun categories, monadic and dyadic valence positions, projective-object paradigms, and reflexive/reciprocative object boundaries.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "src/tests/agreement.test.js", "src/tests/combo_validation.test.js"],
        plannedArrows: [
            {
                id: "lesson-6-transitive-vnc-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 6.1-6.7 against the transitive CNV engine, object categories, monadic/dyadic valence slots, and Nawat object-prefix realization.",
                andrewsRefs: ["Andrews Lesson 6.1-6.7"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-6-transitive-vnc-audit",
                result: "hit",
                correction: "Lesson 6 now carries subsection PDF refs, Spanish directives, monadic and dyadic valence formula metadata, object category frames, projective/reflexive paradigms, and explicit Nawat realization policy.",
                andrewsRefs: ["Andrews Lesson 6.1-6.7"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    7: {
        pdfRefs: ["Andrews Lesson 7.1-7.10"],
        directive: "Use Andrews Lesson 7 to direct verbcore citation, verbstem morphemic structure, A/B/C/D class architecture, perfective/imperfective predicate formation, VNC analysis boundaries, object relationships, and ta-fusion derivation.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "src/tests/preterit.test.js"],
        plannedArrows: [
            {
                id: "lesson-7-verbstem-class-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 7.1-7.10 against verbcore citation, verbstem classes, perfective/imperfective class routing, analysis frames, object relationships, and ta-fusion derivation boundaries.",
                andrewsRefs: ["Andrews Lesson 7.1-7.10"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-7-verbstem-class-audit",
                result: "hit",
                correction: "Lesson 7 now carries subsection PDF refs, Spanish directives, verbcore citation policy, A/B/C/D class frames, predicate-formation inventory, analysis boundaries, object-relationship metadata, and ta-fusion derivation policy.",
                andrewsRefs: ["Andrews Lesson 7.1-7.10"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    8: {
        pdfRefs: ["Andrews Lesson 8.1-8.6"],
        directive: "Use Andrews Lesson 8 to direct expanded CNV/VNC prefix boundaries, basic versus transform sentence categories, simple affirmative assertion rules, negative/emphatic assertion behavior, and yes/no question diagnostics.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-8-expanded-vnc-basic-sentence-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 8.1-8.6 against expanded VNC boundary placement, basic/transform sentence categories, and diagnostic-only sentence-layer slots.",
                andrewsRefs: ["Andrews Lesson 8.1-8.6"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-8-expanded-vnc-basic-sentence-audit",
                result: "hit",
                correction: "Lesson 8 now carries subsection PDF refs, Spanish directives, expanded-CNV boundary metadata, basic/transform sentence frames, and explicit generation blockers for negative, emphatic, and yes/no question sentences.",
                andrewsRefs: ["Andrews Lesson 8.1-8.6"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Sentence generation, confirmed Nawat/Pipil Lesson 8 particle realization, and generative directional/locative CNV prefix controls remain diagnostic-only or evidence-needed.",
    },
    9: {
        pdfRefs: ["Andrews Lesson 9.1-9.9"],
        directive: "Use Andrews Lesson 9 to direct optative CNV/VNC use, wish sentences, command and exhortation sentences, negative wish behavior, and the explicit boundary that Nahuatl has no imperative mood.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-9-optative-sentence-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 9.1-9.9 against optative VNC use, wish sentences, command/exhortation sentences, and the no-imperative-mood boundary.",
                andrewsRefs: ["Andrews Lesson 9.1-9.9"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-9-optative-sentence-audit",
                result: "hit",
                correction: "Lesson 9 now carries subsection PDF refs, Spanish directives, optative VNC use metadata, wish/negative-wish frames, command/exhortation frames, and explicit blockers for treating finite imperativo labels as an Andrews imperative mood.",
                andrewsRefs: ["Andrews Lesson 9.1-9.9"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Sentence generation, confirmed Nawat/Pipil Lesson 9 particle realization, and Andrews-directed visible reframe of compatibility imperativo labels remain diagnostic-only or evidence-needed.",
    },
    10: {
        pdfRefs: ["Andrews Lesson 10.1-10.5"],
        directive: "Use Andrews Lesson 10 to direct admonitive CNV/VNC meaning, nonpast admonitive formation, affirmative and negative admonition sentence transforms, and contrast diagnostics against optative and indicative forms.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-10-admonitive-sentence-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 10.1-10.5 against admonitive mood meaning, nonpast admonitive VNC formation, admonition sentence transforms, and admonitive/optative/indicative contrast diagnostics.",
                andrewsRefs: ["Andrews Lesson 10.1-10.5"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-10-admonitive-sentence-audit",
                result: "hit",
                correction: "Lesson 10 now carries subsection PDF refs, Spanish directives, admonitive mood metadata, nonpast admonitive VNC formation, affirmative/negative admonition frames, and contrast diagnostics that block treating admonitive forms as negative commands.",
                andrewsRefs: ["Andrews Lesson 10.1-10.5"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Sentence generation, confirmed Nawat/Pipil Lesson 10 particle realization, and Andrews-directed visible reframe of compatibility imperativo/admonitive labels remain diagnostic-only or evidence-needed.",
    },
    11: {
        pdfRefs: ["Andrews Lesson 11.1-11.6"],
        directive: "Use Andrews Lesson 11 to direct irregular CNV/VNC taxonomy: perfective-stem irregularity, tense-form meaning dislocation, defective paradigms, suppletion, and idiom boundaries; keep Nawat/Pipil surfaces evidence-gated.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/irregulars.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-11-irregular-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 11.1-11.6 against irregular VNC nature, perfective-stem irregularity, tense-form meaning dislocation, suppletion, and idiom boundaries.",
                andrewsRefs: ["Andrews Lesson 11.1-11.6"],
                expectedFeedbackRefs: ["src/tests/irregulars.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-11-irregular-vnc-audit",
                result: "hit",
                correction: "Lesson 11 now carries subsection PDF refs, Spanish directives, irregular perfective-stem taxonomy, tense-form/meaning dislocation metadata, suppletion frames, idiom boundaries, and explicit blockers against unlicensed Classical-to-Nawat irregular generation.",
                andrewsRefs: ["Andrews Lesson 11.1-11.6"],
                feedbackRefs: ["src/tests/irregulars.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "The current Nawat suppletive subset is implemented, but Andrews' full irregular perfective-stem taxonomy, tense-form/meaning dislocations, defective paradigms, and idioms remain diagnostic-only or Nawat/Pipil-evidence-needed.",
    },
    12: {
        pdfRefs: ["Andrews Lesson 12.1-12.7"],
        directive: "Use Andrews Lesson 12 to direct absolutive CNN/NNC architecture: NNC/VNC contrast, vacant State position, subject pers1-pers2 and num1-num2 slots, no tense slot, predicate nounstem behavior, animacy/reference, and state/nounstem boundaries.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-12-absolutive-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 12.1-12.7 against NNC/VNC contrast, absolutive-state NNC formula slots, subject-pronoun positions, predicate behavior, animacy, and state/nounstem boundaries.",
                andrewsRefs: ["Andrews Lesson 12.1-12.7"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-12-absolutive-nnc-audit",
                result: "hit",
                correction: "Lesson 12 now carries subsection PDF refs, Spanish directives, absolutive NNC formula metadata, subject num1-num2 ownership, no-tense predicate boundaries, animacy diagnostics, and generation blockers for unlicensed Classical connector paradigms.",
                andrewsRefs: ["Andrews Lesson 12.1-12.7"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Ordinary NNC formula slots are active, but the full Andrews absolutive subject-pronoun connector inventory, discourse time/reference behavior, metaphorical animacy overrides, and state-restriction exceptions remain partial, diagnostic-only, or Nawat/Pipil-evidence-needed.",
    },
    13: {
        pdfRefs: ["Andrews Lesson 13.1-13.6"],
        directive: "Use Andrews Lesson 13 to direct possessive CNN/NNC architecture: monadic and dyadic State formulas, possessive-state subject connectors, monadic ne/te/tla possessor taxonomy, dyadic st1/st2 category distribution, and specific possessor pronouns.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-13-possessive-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 13.1-13.6 against possessive-state NNC formulas, subject connector behavior, monadic and dyadic State slots, and possessor-pronoun inventories.",
                andrewsRefs: ["Andrews Lesson 13.1-13.6"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-13-possessive-nnc-audit",
                result: "hit",
                correction: "Lesson 13 now carries subsection PDF refs, Spanish directives, possessive-state formula metadata, subject num1-num2 ownership, monadic and dyadic State taxonomy, specific possessor frames, and blockers for unlicensed Classical-to-Nawat possessive paradigms.",
                andrewsRefs: ["Andrews Lesson 13.1-13.6"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Current specific possessor prefixes are evidence-backed, but the full Andrews possessive-state subject connector inventory, monadic ne/te/tla possessor generation, st1/st2 allomorphy, spelling caveats, and Lesson 14 stem selection remain partial, diagnostic-only, or Nawat/Pipil-evidence-needed.",
    },
    14: {
        pdfRefs: ["Andrews Lesson 14.1-14.8"],
        directive: "Use Andrews Lesson 14 to direct nounstem-class architecture: restricted and general use-stems, t/ti/in/zero class mapping, number as subject-only, affinity and distributive/varietal stem derivation, state-specific stem selection, and constituent-analysis diagnostics.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-14-nounstem-class-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 14.1-14.8 against use-stem kinds, nounstem classes, number boundaries, state/number-specific stem selection, and constituent-analysis warnings.",
                andrewsRefs: ["Andrews Lesson 14.1-14.8"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-14-nounstem-class-audit",
                result: "hit",
                correction: "Lesson 14 now carries subsection PDF refs, Spanish directives, use-stem and nounstem-class metadata, number/derived-stem boundaries, state-specific stem-selection frames, and blockers for unlicensed class/subclass generation.",
                andrewsRefs: ["Andrews Lesson 14.1-14.8"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Current Nawat t/ti/in/zero class compatibility is active, but full Andrews lexical class membership, restricted/general use-stem alternation, affinity/distributive nounstem derivation, plural-subject alternatives, possessive subclasses, and constituent-analysis ambiguities remain partial, diagnostic-only, or Nawat/Pipil-evidence-needed.",
    },
    15: {
        pdfRefs: ["Andrews Lesson 15.1-15.3"],
        directive: "Use Andrews Lesson 15 to direct further NNC boundaries: possessive-state peculiarities, natural-possession state cases, nuclear possessor versus supplementation, and NNC sentence-structure diagnostics.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-15-further-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 15.1-15.3 against possessive-state peculiarities, naturally possessed nounstems, and NNC sentence-structure boundaries.",
                andrewsRefs: ["Andrews Lesson 15.1-15.3"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-15-further-nnc-audit",
                result: "hit",
                correction: "Lesson 15 now carries subsection PDF refs, Spanish directives, possessive-peculiarity metadata, natural-possession evidence boundaries, NNC sentence-structure diagnostics, and blockers for unlicensed state-case or sentence generation.",
                andrewsRefs: ["Andrews Lesson 15.1-15.3"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Possessive plural assimilation, suppletive possessive stems, secondary te/tla stems, natural-possession state cases, and NNC sentence structure remain partial, diagnostic-only, or Nawat/Pipil-evidence-needed.",
    },
    16: {
        pdfRefs: ["Andrews Lesson 16.1-16.9"],
        directive: "Use Andrews Lesson 16 to direct pronominal CNN/NNC architecture: absolutive-only pronominal NNCs, entitive and quantitive subtypes, personal/interrogative/demonstrative/indefinite inventories, quantitive matrix stems, fused spelling diagnostics, and generation blockers.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-16-pronominal-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 16.1-16.9 against pronominal NNC kinds, entitive and quantitive subtypes, absolutive-only status, fused-spelling warnings, and generation blockers.",
                andrewsRefs: ["Andrews Lesson 16.1-16.9"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-16-pronominal-nnc-audit",
                result: "hit",
                correction: "Lesson 16 now carries subsection PDF refs, Spanish directives, pronominal-NNC subtype metadata, absolutive-only boundaries, fused-spelling diagnostics, quantitive matrix frames, and blockers for unlicensed pronominal generation.",
                andrewsRefs: ["Andrews Lesson 16.1-16.9"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Confirmed Nawat/Pipil pronominal NNC examples, a safe pronominal-NNC route contract, fused spelling handling, quantitive matrix allomorphy, and supplementation/adjectival-function behavior remain partial, diagnostic-only, or Nawat/Pipil-evidence-needed.",
    },
    17: {
        pdfRefs: ["Andrews Lesson 17.1-17.6"],
        directive: "Use Andrews Lesson 17 to direct supplementation architecture: multiple-nucleus groups, personal-pronoun heads, supplementary subject/object/possessor roles, shared-referent contact, topicalization, recursive ambiguity diagnostics, and information-question transforms.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-17-supplementation-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 17.1-17.6 against multiple-nucleus structure, supplementation roles, shared-referent contact, topicalization, and information-question transforms.",
                andrewsRefs: ["Andrews Lesson 17.1-17.6"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-17-supplementation-audit",
                result: "hit",
                correction: "Lesson 17 now carries subsection PDF refs, Spanish directives, multiple-nucleus metadata, supplementation role frames, shared-referent diagnostics, topicalization boundaries, and question-transform blockers.",
                andrewsRefs: ["Andrews Lesson 17.1-17.6"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Supplementation AST execution, confirmed Nawat/Pipil clause examples, topic/comment UI controls, recursive ambiguity resolution, and information-question generation remain partial, diagnostic-only, or Nawat/Pipil-evidence-needed.",
    },
    18: {
        pdfRefs: ["Andrews Lesson 18.1-18.12"],
        directive: "Use Andrews Lesson 18 to direct supplementation part-two architecture: integrated o# movement, short personal-pronominal NNC boundaries, marked in adjunction, discontinuity, agreement exceptions, named-partner and male-bonding supplements, silent object heads, principal deletion, vocatives, and free constituent order.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-18-supplementation-part-two-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 18.1-18.12 against integrated supplements, short pronominal NNCs, marked and discontinuous supplementation, agreement exceptions, named-partner/male-bonding supplements, silent object heads, principal deletion, vocatives, and sentence constituent order.",
                andrewsRefs: ["Andrews Lesson 18.1-18.12"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-18-supplementation-part-two-audit",
                result: "hit",
                correction: "Lesson 18 now carries subsection PDF refs, Spanish directives, integrated-supplement metadata, short-pronominal boundaries, marked/discontinuous diagnostics, agreement and referent exceptions, silent-object blockers, vocative boundaries, and sentence-order anti-translation warnings.",
                andrewsRefs: ["Andrews Lesson 18.1-18.12"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Executable supplementation ASTs, marked and discontinuous supplement parsing, silent object-head resolution, vocative surface/prosody behavior, free constituent order interpretation, and confirmed Nawat/Pipil clause evidence remain partial, diagnostic-only, or Nawat/Pipil-evidence-needed.",
    },
    19: {
        pdfRefs: ["Andrews Lesson 19.1-19.6"],
        directive: "Use Andrews Lesson 19 to direct supplementation part-three architecture: VNCs as supplements, pronominal plural supplementation, included-referent supplementation, infinitive-translation conditions, rumored report, and deleted saying principals.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-19-supplementation-part-three-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 19.1-19.6 against VNC supplements, pronominal plural supplementation, included-referent architecture, infinitive-translation conditions, rumored report, and deleted saying principals.",
                andrewsRefs: ["Andrews Lesson 19.1-19.6"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-19-supplementation-part-three-audit",
                result: "hit",
                correction: "Lesson 19 now carries subsection PDF refs, Spanish directives, VNC supplement roles, pronominal plural supplementation metadata, included-referent frames, speech/complement semantic groups, rumored-report blockers, and deleted-saying diagnostics.",
                andrewsRefs: ["Andrews Lesson 19.1-19.6"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Executable VNC-supplement and included-referent ASTs, pronominal plural route contracts, direct/indirect speech parsing, rumored-report handling, deleted saying-principal recovery, and confirmed Nawat/Pipil clause evidence remain partial, diagnostic-only, or Nawat/Pipil-evidence-needed.",
    },
    20: {
        pdfRefs: ["Andrews Lesson 20.1-20.8"],
        directive: "Use Andrews Lesson 20 to direct nonactive verbstem derivation: imperfective-active source selection, suffix families o/lo/hua and combinations, Nawat suffix realization u/lu/wa/uwa/luwa/walu, exception boundaries, and Class A-2 routing.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-20-nonactive-verbstem-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 20.1-20.8 against current Nawat nonactive suffix families, imperfective-active source selection, suffix correspondences, exception boundaries, and Class A-2 routing.",
                andrewsRefs: ["Andrews Lesson 20.1-20.8"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-20-nonactive-verbstem-audit",
                result: "hit",
                correction: "Lesson 20 now carries subsection PDF refs, Spanish directives, Nawat suffix-family bridge metadata, source-stem boundaries, current engine option families, and Class A-2 routing evidence.",
                andrewsRefs: ["Andrews Lesson 20.1-20.8"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    21: {
        pdfRefs: ["Andrews Lesson 21.1-21.4"],
        directive: "Use Andrews Lesson 21 to direct passive-voice CNV/VNC architecture: an active source with a specific object, deletion of the active subject, nonactive-stem replacement, object-to-subject reassignment, no expressed passive agent, passive generation case rules, passive sentence-mood boundaries, and active-reflexive passive-notion diagnostics.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-21-passive-voice-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 21.1-21.4 against the current nonactive/passive route, object-to-subject mapping, passive generation cases, sentence-mood boundaries, and active-reflexive passive notion.",
                andrewsRefs: ["Andrews Lesson 21.1-21.4"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-21-passive-voice-audit",
                result: "hit",
                correction: "Lesson 21 now records the Andrews passive transform, the 21.2 case inventory, current Nawat passive-subject override support, combined passive/impersonal drift, and explicit remaining gaps before closest-pass can be claimed.",
                andrewsRefs: ["Andrews Lesson 21.1-21.4"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Combined passive/impersonal visible and generated routing, nonspecific ta/te passive gating, reflexive and multi-object passive case routing, passive optative/admonitive sentence behavior, and active-reflexive passive-notion diagnostics remain partial or evidence-needed.",
    },
    22: {
        pdfRefs: ["Andrews Lesson 22.1-22.6"],
        directive: "Use Andrews Lesson 22 to direct impersonal CNV/VNC architecture: inherent impersonal subjects, nonanimate versus impersonal distinction, impersonal voice transformation, same-formula generation, nonspecific-object preservation, reflexive witness ne, sentence-mood boundaries, and derivational ta-impersonal stems.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-22-impersonal-voice-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 22.1-22.6 against current passive/impersonal voice routing, impersonal subject behavior, nonanimate distinction, source restrictions, preserved nonspecific objects, reflexive witness ne, sentence moods, and ta-impersonal derivation.",
                andrewsRefs: ["Andrews Lesson 22.1-22.6"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-22-impersonal-voice-audit",
                result: "hit",
                correction: "Lesson 22 now records the Andrews impersonal subject contract, nonanimate distinction, impersonal transform, 22.4 generation rules, sentence-mood boundary, ta-impersonal derivation boundary, current engine support, and explicit remaining gaps before closest-pass can be claimed.",
                andrewsRefs: ["Andrews Lesson 22.1-22.6"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Combined passive/impersonal visible and generated routing, inherent impersonal lexical inventory, nonanimate-versus-impersonal interpretation, source-object gates, nonspecific te/ta preservation, reflexive ne witness behavior, sentence moods, and derivational ta-impersonal inventory remain partial or evidence-needed.",
    },
    23: {
        pdfRefs: ["Andrews Lesson 23.1-23.5"],
        directive: "Use Andrews Lesson 23 to direct verb-object architecture: directive, causative, and applicative object kinds; multiple valence positions; mainline and shuntline object levels; silent morphs; object sequence priorities; and Nawat orthography adaptation for object markers.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/agreement.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-23-verb-objects-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 23.1-23.5 against current object slots, object function metadata, mainline/shuntline positions, silent morphs, sequence priorities, and Nawat orthography bridge.",
                andrewsRefs: ["Andrews Lesson 23.1-23.5"],
                expectedFeedbackRefs: ["src/tests/agreement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-23-verb-objects-audit",
                result: "hit",
                correction: "Lesson 23 now records Andrews object kinds, multiple valence positions, +va formula boundaries, mainline/shuntline rules, object sequence priorities, current object-slot support, and explicit gaps before closest-pass can be claimed.",
                andrewsRefs: ["Andrews Lesson 23.1-23.5"],
                feedbackRefs: ["src/tests/agreement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Object function ambiguity, discontinuous object-plus-suffix contracts, full mainline/shuntline histories, silent morph tables, the thirteen Andrews object combinations, Appendix C inventory, and Nawat/Pipil exceptions remain partial or evidence-needed.",
    },
    24: {
        pdfRefs: ["Andrews Lesson 24.1-24.9"],
        directive: "Use Andrews Lesson 24 to direct first-type causative architecture: final-vowel valence boundaries, valence-neutral stems, causative a replacement/addition, destockal stock and stem formatives, source-subject-to-object transformation, and causative-a control of the source core.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-24-first-type-causative-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 24.1-24.9 against current type-one causative generation, valence-neutral boundaries, destockal stem architecture, source-subject-to-object transforms, and Nawat orthography evidence.",
                andrewsRefs: ["Andrews Lesson 24.1-24.9"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-24-first-type-causative-audit",
                result: "hit",
                correction: "Lesson 24 now records Andrews final-vowel boundaries, valence-neutral stems, type-one causative a procedures, destockal stock architecture, 24.8 generation transform, current engine support, and explicit gaps before closest-pass can be claimed.",
                andrewsRefs: ["Andrews Lesson 24.1-24.9"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Final-vowel valence lexicon, valence-neutral stem gates, type-one replacement/addition selection, destockal inventories and class membership, source-CNV subject-to-object transformation, and causative-a compound/matrix analysis remain partial or evidence-needed.",
    },
    25: {
        pdfRefs: ["Andrews Lesson 25.1-25.16"],
        directive: "Use Andrews Lesson 25 to direct second-type causative architecture: tia, lia, and huia source families; Class C membership; source-CNV compaction; single-, double-, and triple-object causative transforms; ambiguity; passive/impersonal causatives; sentence moods; and supplementation of silent objects.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-25-second-type-causative-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 25.1-25.16 against current type-two causative generation, source-family selection, single/double/triple object transforms, ambiguity, voices, sentence moods, and silent-object supplementation.",
                andrewsRefs: ["Andrews Lesson 25.1-25.16"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-25-second-type-causative-audit",
                result: "hit",
                correction: "Lesson 25 now records Andrews type-two causative source families, tia/lia/huia boundaries, Class C policy, source-CNV transformation rules, object-depth behavior, ambiguity, voice and sentence boundaries, current engine support, and explicit gaps before closest-pass can be claimed.",
                andrewsRefs: ["Andrews Lesson 25.1-25.16"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Type-two source-family inventories, unexpected nonactive sources, suppletive and honorific-only cases, single/double/triple source-CNV transforms, silent shuntline objects, causative ambiguity, passive/impersonal causatives, sentence moods, and silent-object supplementation remain partial or evidence-needed.",
    },
    26: {
        pdfRefs: ["Andrews Lesson 26.1-26.23"],
        directive: "Use Andrews Lesson 26 to direct applicative architecture: applicative object roles; ia, lia, huia, and rare tia source families; Class C membership; source-CNV transforms; single-, double-, and triple-object applicative VNCs; ambiguity; passive/impersonal applicatives; sentence moods; alternative object interpretation; deceptive VNCs; and the discontinuous object-plus-suffix unit.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-26-applicative-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 26.1-26.23 against current applicative generation, source-shape selection, single/double/triple object transforms, ambiguity, voices, sentence moods, and object-plus-suffix unit control.",
                andrewsRefs: ["Andrews Lesson 26.1-26.23"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-26-applicative-audit",
                result: "hit",
                correction: "Lesson 26 now records Andrews applicative source families, ia/lia/huia/tia boundaries, Class C policy, source-CNV transformation rules, object-depth behavior, ambiguity, voice and sentence boundaries, current engine support, and explicit gaps before closest-pass can be claimed.",
                andrewsRefs: ["Andrews Lesson 26.1-26.23"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Applicative ia/lia/huia/tia source inventories, irregular and valence-neutral stems, source-shape exceptions, type-one/type-two parallel stems, single/double/triple source-CNV transforms, silent shuntline objects, Appendix C coverage, applicative ambiguity, passive/impersonal applicatives, sentence moods, alternative object interpretation, deceptive VNCs, and object-plus-suffix unit analysis remain partial or evidence-needed.",
    },
    27: {
        pdfRefs: ["Andrews Lesson 27.1-27.6"],
        directive: "Use Andrews Lesson 27 to direct frequentative architecture: ordinary reduplicative prefix shapes, object-pronoun reduplication, destockal frequentatives, uncertain frequentative formations, nonactive frequentatives, and strict separation from generic reduplication helpers until Nawat/Pipil evidence licenses output.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/frequentative.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-27-frequentative-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 27.1-27.6 against current frequentative boundary metadata, generic reduplication helpers, object-pronoun reduplication, destockal frequentatives, uncertain formations, and nonactive frequentatives.",
                andrewsRefs: ["Andrews Lesson 27.1-27.6"],
                expectedFeedbackRefs: ["src/tests/frequentative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-27-frequentative-audit",
                result: "hit",
                correction: "Lesson 27 now records Andrews ordinary, object-pronoun, destockal, uncertain, and nonactive frequentative categories while keeping generation blocked and current generic reduplication helpers marked as non-evidence.",
                andrewsRefs: ["Andrews Lesson 27.1-27.6"],
                feedbackRefs: ["src/tests/frequentative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Confirmed Nawat/Pipil frequentative examples, ordinary prefix-shape selection, object-pronoun reduplication, destockal frequentative generation, uncertain frequentative derivation, nonactive frequentative generation, causative/applicative ambiguity, and validation against generic reduplication false positives remain partial or evidence-needed.",
    },
    28: {
        pdfRefs: ["Andrews Lesson 28.1-28.12"],
        directive: "Use Andrews Lesson 28 to direct compound-verbstem architecture with verbal embeds: compounding formulas, matrix-after-embed order, linked versus integrated cohesiveness, connective-t morphology, limited matrix inventories, special passive/impersonal formations, accompanying possession, reflexive-matrix compounds, shared-object compounds, future-embed compounds, and recursion.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-28-verbal-embed-compound-audit",
                type: "metadata-parser-test",
                aim: "Audit Andrews Lesson 28.1-28.12 against current compoundAst parser metadata, matrix/embed order, linked/integrated boundaries, connective-t patterns, intransitive/reflexive/shared-object matrices, future-embed behavior, and recursion.",
                andrewsRefs: ["Andrews Lesson 28.1-28.12"],
                expectedFeedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-28-verbal-embed-compound-audit",
                result: "hit",
                correction: "Lesson 28 now records Andrews compound formulas, matrix/embed architecture, cohesiveness, connective-t requirements, intransitive/reflexive/shared-object/future-embed frames, special formations, accompanying possession, and recursion while leaving expanded generation blocked.",
                andrewsRefs: ["Andrews Lesson 28.1-28.12"],
                feedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Current compoundAst and compoundFrame metadata are real but do not implement connective-t preterit-embed generation, limited intransitive matrix inventories, special ye/yah/cac/itz formations, passive/impersonal compound routing, accompanying-possession supplementation, intransitivized-reflexive-matrix compounds, shared-object compounds, future-embed compounds, recursion, or confirmed Nawat/Pipil compound examples.",
    },
    29: {
        pdfRefs: ["Andrews Lesson 29.1-29.7"],
        directive: "Use Andrews Lesson 29 to direct purposive VNC architecture: future-embed linked connectiveless compounds, stem-internal outbound t and inbound c/qu directional morphs, silent future-tense embed morphs, outbound and inbound tense/mood paradigms, passive and impersonal nonactive embeds, compound-stemmed embeds, and stem-external hual/on directional alternatives.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/purposive.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-29-purposive-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 29.1-29.7 against current purposive/directional boundary metadata, stem-internal directional morphs, outbound/inbound paradigms, passive/impersonal embeds, compound-stemmed embeds, and external hual/on directional alternatives.",
                andrewsRefs: ["Andrews Lesson 29.1-29.7"],
                expectedFeedbackRefs: ["src/tests/purposive.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-29-purposive-vnc-audit",
                result: "hit",
                correction: "Lesson 29 now records Andrews purposive verbstem architecture, outbound and inbound paradigms, nonactive and compound-stemmed embeds, external directional alternatives, and anti-conflation with ordinary directional prefixes, progressive connective-t compounds, and admonitive endings while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 29.1-29.7"],
                feedbackRefs: ["src/tests/purposive.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Confirmed Nawat/Pipil purposive examples, outbound/inbound finite generation, silent future-morph behavior, vowel-length and glottal distinctions, optional o# behavior, irregular plural n, purposive/progressive/admonitive disambiguation, passive/impersonal nonactive embeds, compound-stemmed embeds, external hual/on directional alternatives, fulfilled-purpose readings, and metaphorical movement remain partial or evidence-needed.",
    },
    30: {
        pdfRefs: ["Andrews Lesson 30.1-30.18"],
        directive: "Use Andrews Lesson 30 to direct compound verbstems with nominal embeds: NNC+VNC integrated compound architecture, general-use nounstem embed selection, incorporated-object valence lowering, incorporated-adverb roles, supplement-to-adverb transforms, incorporated complements, reduplication, nonactive routing, and caveats that the embed is neither agent nor subject.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-30-nominal-embed-compound-audit",
                type: "metadata-parser-test",
                aim: "Audit Andrews Lesson 30.1-30.18 against current compoundAst lexical-embed metadata, NNC fixture classifications, incorporated-object/adverb/complement categories, supplement transforms, reduplication, nonactive routing, and anti-translation caveats.",
                andrewsRefs: ["Andrews Lesson 30.1-30.18"],
                expectedFeedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-30-nominal-embed-compound-audit",
                result: "hit",
                correction: "Lesson 30 now records Andrews NNC+VNC integrated compound architecture, incorporated-object valence lowering, incorporated-adverb roles and supplement transforms, incorporated-complement behavior, reduplication, nonactive voice routing, and caveats that the embed is neither agent nor subject while keeping expanded generation blocked.",
                andrewsRefs: ["Andrews Lesson 30.1-30.18"],
                feedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "General-use nounstem selection, subclass exceptions, incorporated-object valence lowering, exceptional tla-fusion analysis, supplement-to-adverb transforms, incorporated complements, embed and matrix reduplication, passive/impersonal routing, unique embeds, idioms, and confirmed Nawat/Pipil compound examples remain partial or evidence-needed.",
    },
    31: {
        pdfRefs: ["Andrews Lesson 31.1-31.13"],
        directive: "Use Andrews Lesson 31 to direct compound nounstem architecture: NNC+NNC=NNC formula control, linked and integrated structures, embed-before-matrix order, matrix-governed nounstem class, embed meaning roles, possessor orientation, matrix importance, embed-class behavior, unique fillers, conjunctive compounds, recursive fillers, sex/progeny/fellowship formations, affinity stems, and distributive/varietal stems.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-31-compound-nounstem-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 31.1-31.13 against current compound/affective NNC boundary metadata, NNC+NNC formula control, matrix/embed order, possessor orientation, unique fillers, conjunctive and recursive compounds, sex/progeny/fellowship formations, affinity stems, and distributive/varietal stems.",
                andrewsRefs: ["Andrews Lesson 31.1-31.13"],
                expectedFeedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-31-compound-nounstem-audit",
                result: "hit",
                correction: "Lesson 31 now records Andrews compound nounstem architecture, matrix/embed governance, possessor orientation, embed class behavior, unique fillers, conjunctive and recursive structures, special semantic formations, affinity stems, and distributive/varietal stems while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 31.1-31.13"],
                feedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Compound nounstem generation, NNC-specific compound AST parsing, linked/connectiveless/integrated segmentation, possessor orientation, embed class allomorphy, unique fillers, ca/yo matrix classes, conjunctive compounds, recursive compounds, sex/progeny/fellowship patterns, affinity stems, distributive/varietal stems, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    32: {
        pdfRefs: ["Andrews Lesson 32.1-32.8"],
        directive: "Use Andrews Lesson 32 to direct affective NNC architecture: valuing/disparaging attitude in compound affective nounstems or flawed-subject NNCs, affective-matrix nounstem class behavior for pil, pol, tzin, ton, and zol, affinity-shaped affective stems, pil child/noble ambiguity, nonanimate affective number behavior, and flawed-subject num1 silencing.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-32-affective-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 32.1-32.8 against current compound/affective NNC boundary metadata, affective-matrix nounstem classes, affinity-shaped affectives, pil child/noble ambiguity, nonanimate affective number behavior, and flawed-subject NNCs.",
                andrewsRefs: ["Andrews Lesson 32.1-32.8"],
                expectedFeedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-32-affective-nnc-audit",
                result: "hit",
                correction: "Lesson 32 now records Andrews affective NNC architecture, affective-matrix class behavior, affinity-shaped affective stems, pil child/noble ambiguity, nonanimate number behavior, and flawed-subject NNCs while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 32.1-32.8"],
                feedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Affective NNC generation, affective matrix class routing for pil/pol/tzin/ton/zol, lexicalized class shifts, vocative variants, affinity-shaped affectives, pil child/noble ambiguity, nonanimate number-agreement behavior, flawed-subject num1 silencing, defect-stem inventories, and confirmed Nawat/Pipil affective examples remain partial or evidence-needed.",
    },
    33: {
        pdfRefs: ["Andrews Lesson 33.1-33.10"],
        directive: "Use Andrews Lesson 33 to direct honorific and pejorative VNC architecture: honorific causative/applicative reflexive transformations, projective-object ambiguity, causative/applicative source VNCs, mainline reflexive source preterit-embed compounds with tzin-o-a, reverential doubling, pejorative preterit-embed compounds with pol-o-a, and compound-verbstem honorific/pejorative targeting.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/honorific_pejorative.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-33-honorific-pejorative-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 33.1-33.10 against current honorific/pejorative boundary metadata, causative/applicative reflexive routes, projective-object ambiguity, reflexive-source preterit embeds, reverential doubling, pejorative pol-o-a compounds, and compound-verbstem transforms.",
                andrewsRefs: ["Andrews Lesson 33.1-33.10"],
                expectedFeedbackRefs: ["src/tests/honorific_pejorative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-33-honorific-pejorative-vnc-audit",
                result: "hit",
                correction: "Lesson 33 now records Andrews honorific and pejorative VNC architecture, causative/applicative reflexive honorific routes, projective-object ambiguity, reflexive-source preterit embeds, reverential doubling, pejorative pol-o-a compounds, and compound-verbstem transformation boundaries while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 33.1-33.10"],
                feedbackRefs: ["src/tests/honorific_pejorative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Honorific generation, pejorative generation, reverential generation, causative/applicative reflexive route selection, projective-object honored-entity ambiguity, tzin-o-a preterit-embed routing, pol-o-a preterit-embed routing, compound-verbstem transformation targeting, and confirmed Nawat/Pipil honorific or pejorative examples remain partial or evidence-needed.",
    },
    34: {
        pdfRefs: ["Andrews Lesson 34.1-34.16"],
        directive: "Use Andrews Lesson 34 to direct cardinal-numeral NNC architecture: vigesimal orders, absolutive-state cardinal formula, ordinary versus gross counts, basic numeral stems, high-order compound matrices, conjoined numeral NNCs, classifier sets, reduplication, approximation/more modifiers, and measure NNCs.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_numerals.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-34-cardinal-numeral-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 34.1-34.16 against current numeral-NNC boundary metadata, vigesimal order, absolutive-state cardinal formula, simple/gross counts, basic and classifier sets, conjoined numerals, reduplication, approximation, and measures.",
                andrewsRefs: ["Andrews Lesson 34.1-34.16"],
                expectedFeedbackRefs: ["src/tests/nnc_numerals.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-34-cardinal-numeral-nnc-audit",
                result: "hit",
                correction: "Lesson 34 now records Andrews cardinal-numeral NNC architecture, vigesimal orders, absolutive-state formula boundary, simple and gross counts, basic stems, high-order compounds, conjoined numerals, classifier sets, reduplication, approximation, and measures while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 34.1-34.16"],
                feedbackRefs: ["src/tests/nnc_numerals.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Cardinal numeral generation, basic numeral stems, gross-count routing, exceptional gross-count possessive-state formations, high-order compound matrices, conjoined numeral structures, classifier sets, reduplication, approximation/more modifiers, measure NNCs, and confirmed Nawat/Pipil numeral examples remain partial or evidence-needed.",
    },
    35: {
        pdfRefs: ["Andrews Lesson 35.1-35.12"],
        directive: "Use Andrews Lesson 35 to direct preterit-agentive nominalization architecture: structural VNC-to-NNC conversion, restricted and general-use preterit-agentive stems, absolutive and possessive states, number-position alternations, compound embeds, old-woman/old-man formations, ownerhood and abundant-ownerhood matrices, translation boundaries, and VNC embedded object/adverbial roles.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-35-preterit-agentive-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 35.1-35.12 against current nominalization boundary metadata, preterit-agentive restricted/general-use stems, possessive state, compound embeds, old-person formations, ownerhood, abundant ownerhood, and VNC embed/adverbial continuations.",
                andrewsRefs: ["Andrews Lesson 35.1-35.12"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-35-preterit-agentive-audit",
                result: "hit",
                correction: "Lesson 35 now records Andrews preterit-agentive nominalization architecture, restricted and general-use stems, number-position alternations, possessive-state behavior, compound embeds, old-person formations, ownerhood and abundant-ownerhood matrices, translation boundaries, and VNC embed/adverbial roles while preserving evidence gates.",
                andrewsRefs: ["Andrews Lesson 35.1-35.12"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Complete preterit-agentive generation, number-position alternations, affinity-stem selection, activated projective-object hybrids, old-person lexical boundaries, rare que-matrix absolutives, complete ownerhood e/wa/yua subclass selection, object-focused adverbial matrices, lexicalized reflexive exceptions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    36: {
        pdfRefs: ["Andrews Lesson 36.1-36.12"],
        directive: "Use Andrews Lesson 36 to direct nominalized VNC architecture beyond Lesson 35: customary-present agentive reanalysis and full nominalization, customary-present patientives, instrumentives, present-agentive and future-agentive NNCs, passive-action and active-action NNCs, restricted/general-use action stems, and active-action versus preterit-agentive contrasts.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-36-nominalized-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 36.1-36.12 against current nominalization boundary metadata, customary-present agentive reanalysis/full nominalization, customary-present patientives, instrumentives, present/future agentives, action NNCs, passive-action, active-action, and active-action versus preterit-agentive contrasts.",
                andrewsRefs: ["Andrews Lesson 36.1-36.12"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-36-nominalized-vnc-audit",
                result: "hit",
                correction: "Lesson 36 now records Andrews nominalized VNC architecture for customary-present agentive reanalysis and full nominalization, customary-present patientives, instrumentives, present and future agentives, action NNCs, passive-action and active-action sources, and contrastive boundaries while preserving current evidence gates.",
                andrewsRefs: ["Andrews Lesson 36.1-36.12"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Complete customary-present agentive paradigms, reanalysis versus full nominalization routing, rare possessive reanalysis, activated-object hybrids, customary-present patientive passive variants, instrumentive state-source exceptions, future-agentive lexicalized embeds, passive-action and active-action restricted/general-use alternations, lexicalized action meanings, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    37: {
        pdfRefs: ["Andrews Lesson 37.1-37.9"],
        directive: "Use Andrews Lesson 37 to direct deverbal nounstem architecture: VNC-core derivation versus nominalization reanalysis, active-action z/liz, liz translation values, potential-patient values, impersonal-action nouns, compound embeds, active/passive action contrast, multiple-nucleus supplement uses, patientive source families, and passive-patientive source gates.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-37-deverbal-nounstem-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 37.1-37.9 against current nominalization boundary metadata, active-action z/liz generation, translation boundaries, potential-patient and impersonal-action values, active/passive action contrasts, multiple-nucleus supplements, patientive source families, and passive-patientive source gates.",
                andrewsRefs: ["Andrews Lesson 37.1-37.9"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-37-deverbal-nounstem-audit",
                result: "hit",
                correction: "Lesson 37 now records Andrews deverbal nounstem architecture, active-action z/liz, liz translation values, potential-patient and impersonal-action particulars, active/passive action possessor-role contrast, multiple-nucleus supplement use, patientive source families, and passive-patientive source gates while preserving current evidence boundaries.",
                andrewsRefs: ["Andrews Lesson 37.1-37.9"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Complete active-action z/liz generation, potential-patient routing, impersonal-action routing, compound embeds, multiple-nucleus supplement syntax, passive-patientive source gates, nonactive suffix deletion, irregular passive-source warnings, tzin assimilation, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    38: {
        pdfRefs: ["Andrews Lesson 38.1-38.2"],
        directive: "Use Andrews Lesson 38 to direct impersonal patientive nounstem architecture: impersonal VNC-core source, intransitive source families, reflexive shuntline ne, nonhuman projective tla, human te-to-tla impersonalized passive routing, human/nonhuman contrast, translation overlap with active-action nouns, and compound patientive boundaries.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-38-impersonal-patientive-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 38.1-38.2 against current patientive family metadata, impersonal patientive source-core routing, intransitive source families, reflexive shuntline ne, projective nonhuman tla, human te-to-tla impersonalized passive routing, human/nonhuman contrast, translation overlap, and compound patientive nounstem boundaries.",
                andrewsRefs: ["Andrews Lesson 38.1-38.2"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-38-impersonal-patientive-audit",
                result: "hit",
                correction: "Lesson 38 now records Andrews impersonal patientive architecture, intransitive source families, reflexive shuntline behavior, nonhuman projective routing, human te-to-tla impersonalized passive routing, human/nonhuman contrast, translation overlap with active-action nouns, and compound patientive boundaries while preserving evidence gates.",
                andrewsRefs: ["Andrews Lesson 38.1-38.2"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Complete impersonal-patientive generation, intransitive root-plus-ya source selection, lo/o/o-hua/hua/hua-lo source details, vowel shortening, final-a replacement, human/nonhuman contrast, anomalous te patientives, homonym disambiguation, compound patientive source and matrix behavior, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    39: {
        pdfRefs: ["Andrews Lesson 39.1-39.9"],
        directive: "Use Andrews Lesson 39 to direct patientive operations beyond passive and impersonal sources: perfective and imperfective patientives, characteristic-property yo-matrix patientives, root/stock patientives, multiple patientive derivation, patientive nounstems as compound embeds, incorporated complements, incorporated objects, and characteristic-property embeds.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-39-patientive-operations-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 39.1-39.9 against current patientive family metadata, perfective and imperfective patientive source gates, characteristic-property yo-matrix behavior, root/stock patientive contracts, multiple-derivation metadata, compound embeds, incorporated complements, incorporated objects, and characteristic-property embed continuations.",
                andrewsRefs: ["Andrews Lesson 39.1-39.9"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-39-patientive-operations-audit",
                result: "hit",
                correction: "Lesson 39 now records Andrews patientive operations for perfective, imperfective, characteristic-property, root/stock, multiple-derivation, compound-embed, incorporated-complement, incorporated-object, and characteristic-property-embed behavior while preserving current evidence gates.",
                andrewsRefs: ["Andrews Lesson 39.1-39.9"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Complete perfective patientive generation, imperfective patientive generation, characteristic-property yo-matrix routing, organic-possession contrasts, root/stock variant choice, multiple-derivation output selection, compound embed matrices, incorporated complement matrices, incorporated object matrices, characteristic-property embed omission, valence-violation handling, idiomatic restrictions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    40: {
        pdfRefs: ["Andrews Lesson 40.1-40.12"],
        directive: "Use Andrews Lesson 40 to direct adjectival NNC function architecture: adjective as syntactic function, exceptional adjectival NNCs, NNC/VNC predicate translation, derived nounstems, nominalized VNC predicates, customary agentive and patientive predicates, preterit-agentive class behavior, obsolete preterit root-plus-ya, synonym pairs and triplets, and predicate-adjective sentences.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-40-adjectival-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 40.1-40.12 against current adjectival NNC function metadata, exceptional adjectival NNCs, NNC/VNC predicate translation, derived nounstem adjectives, nominalized VNC adjective paths, preterit-agentive classes, obsolete preterit root-plus-ya, synonym sets, and predicate-adjective sentence boundaries.",
                andrewsRefs: ["Andrews Lesson 40.1-40.12"],
                expectedFeedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-40-adjectival-nnc-audit",
                result: "hit",
                correction: "Lesson 40 now records Andrews adjectival NNC function architecture across ordinary, exceptional, NNC/VNC, derived nounstem, nominalized VNC, preterit-agentive, obsolete-preterit, synonym-set, and predicate-adjective sentence boundaries while preserving current evidence gates.",
                andrewsRefs: ["Andrews Lesson 40.1-40.12"],
                feedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Exceptional adjectival NNCs, full NNC/VNC adjectival function coverage, source-synonym sets, predicate-adjective sentence syntax, modification AST behavior, class-specific preterit-agentive adjective behavior, root-plus-ya exceptions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    41: {
        pdfRefs: ["Andrews Lesson 41.1-41.4"],
        directive: "Use Andrews Lesson 41 to direct adjectival NNC intensification and compound-source architecture: intensified stems by reduplication, pah/cal/tzon/affective matrices, metaphor and simile intensification, compound verbstems with nominal embeds, denominal verbstems from compound nounstems, and adjectival nounstems embedded in compound-stemmed NNCs.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-41-adjectival-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 41.1-41.4 against current intensified adjectival output, compound-verbstem nominal-embed adjectival routes, denominal compound nounstem routes, and adjectival nounstem embed boundaries.",
                andrewsRefs: ["Andrews Lesson 41.1-41.4"],
                expectedFeedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-41-adjectival-nnc-audit",
                result: "hit",
                correction: "Lesson 41 now records Andrews intensified adjectival NNC families, compound-verbstem nominal-embed source subtypes, denominal compound nounstem sources, and adjectival nounstems as compound embeds while preserving current generation and evidence gates.",
                andrewsRefs: ["Andrews Lesson 41.1-41.4"],
                feedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Intensified-stem families, pah/cal/tzon/affective matrix intensification, metaphor or simile intensification, syntactic intensifiers, full compound-verbstem source subtypes, incorporated-object patientive source disambiguation, adjectival nounstems embedded in compound-stemmed NNCs, modifier/head syntax, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    42: {
        pdfRefs: ["Andrews Lesson 42.1-42.10"],
        directive: "Use Andrews Lesson 42 to direct multiple-nucleus adjectival modification architecture: modifier/head clause relations, preposing, adjoined and principal units, supplementation ambiguity, compound-head behavior, modifier clause type inventory, recursion, and incorporated modifier-head structures.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-42-adjectival-modification-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 42.1-42.10 against current adjectival modification boundary metadata, AST composition, modifier/head ordering, adjoined/principal unit behavior, supplementation ambiguity, modifier clause type inventory, recursion, and incorporated modification structures.",
                andrewsRefs: ["Andrews Lesson 42.1-42.10"],
                expectedFeedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-42-adjectival-modification-audit",
                result: "hit",
                correction: "Lesson 42 now records Andrews adjectival modification architecture across multiple-nucleus modification, preposing, adjoined/principal units, supplementation ambiguity, compound-head behavior, modifier clause types, recursion, and incorporated modification structures while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 42.1-42.10"],
                feedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Multiple-nucleus modification syntax, modifier/head order patterns, supplementation ambiguity resolution, compound-head matrix targeting, transitive VNC modifier ambiguity, pronominal/quantitive/numeral head behavior, measure NNC head behavior, recursion, incorporated modification structures, parser/search detection, fixture-backed clause examples, and confirmed Nawat/Pipil evidence remain partial or diagnostic-only.",
    },
    43: {
        pdfRefs: ["Andrews Lesson 43.1-43.9"],
        directive: "Use Andrews Lesson 43 to direct part-two adjectival modification architecture: nonpreposed modifier peculiarities, preposed/nonpreposed cooperation, discontinuity, interrogative pronominal heads, oc ce heads, idiomatic shared-referent violations, one-of/none-of expressions, male-bonding modifiers, and named-partner modifiers.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-43-adjectival-modification-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 43.1-43.9 against current adjectival modification boundary metadata, nonpreposed modifier behavior, preposed/nonpreposed cooperation, discontinuity, interrogative heads, oc ce heads, shared-referent violations, one-of/none-of constructions, male-bonding modifiers, and named-partner modifiers.",
                andrewsRefs: ["Andrews Lesson 43.1-43.9"],
                expectedFeedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-43-adjectival-modification-audit",
                result: "hit",
                correction: "Lesson 43 now records Andrews part-two adjectival modification architecture for nonpreposed modifiers, same-head cooperation, discontinuity, interrogative heads, oc ce, idiomatic shared-referent violations, one-of/none-of expressions, male-bonding modifiers, and named-partner modifiers while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 43.1-43.9"],
                feedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Nonpreposed modifier parsing, distant supplementary-element resolution, preposed/nonpreposed same-head cooperation, discontinuity with topicalized heads or shifted modifiers, ac/tleh interrogative-head ambiguity and in-unit warnings, oc ce heads, shared-referent violations, one-of/none-of idioms, male-bonding modifiers, named-partner modifiers, parser/search detection, fixture-backed clause examples, and confirmed Nawat/Pipil evidence remain partial or diagnostic-only.",
    },
    44: {
        pdfRefs: ["Andrews Lesson 44.1-44.9"],
        directive: "Use Andrews Lesson 44 to direct adverbial nuclear-clause architecture: adverbialized subject pronouns, first- and second-degree adverbialization, adverbialized VNCs and NNCs, particle-looking NNCs, other absolutive-state adverbials, preterit-agentive adverbial NNCs, possessive-state adverbials, and incorporated adverbial modifiers.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adverbial.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-44-adverbial-nuclear-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 44.1-44.9 against current adverbial nuclear-clause boundary metadata, configured adverbio output frames, adverbialization degrees, adverbialized VNC/NNC inventories, particle-looking NNCs, preterit-agentive adverbial NNCs, possessive-state adverbials, and incorporated adverbial modifiers.",
                andrewsRefs: ["Andrews Lesson 44.1-44.9"],
                expectedFeedbackRefs: ["src/tests/adverbial.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-44-adverbial-nuclear-audit",
                result: "hit",
                correction: "Lesson 44 now records Andrews adverbial nuclear-clause architecture across adverbialized subject pronouns, degree constraints, adverbialized VNCs and NNCs, particle-looking NNCs, absolutive and possessive-state adverbials, preterit-agentive adverbials, and incorporated adverbial modifiers while keeping generation expansion blocked.",
                andrewsRefs: ["Andrews Lesson 44.1-44.9"],
                feedbackRefs: ["src/tests/adverbial.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Full adverbial VNC/NNC generation, second-degree absolutive NNC adverbials, particle-looking NNC fixture evidence, other absolutive-state adverbials, preterit-agentive adverbial NNCs, possessive-state adverbials, incorporated adverbial modifiers, parser/search detection, static adverbial data, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    45: {
        pdfRefs: ["Andrews Lesson 45.1-45.4"],
        directive: "Use Andrews Lesson 45 to direct relational NNC part-one architecture: no prepositions or postpositions, relational nounstems as nounstems, high-generality relational meanings, four relational usage options, five option groupings, option-one-only stems, supplementary possessor limits, and ic means/purpose/reason/time/special-use behavior.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-45-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 45.1-45.4 against current relational NNC boundary metadata, no-preposition framing, relational nounstem usage options, option groupings, option-one-only stems, supplementary-possessor limits, ic functions, and translation-mirage blockers.",
                andrewsRefs: ["Andrews Lesson 45.1-45.4"],
                expectedFeedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-45-relational-nnc-audit",
                result: "hit",
                correction: "Lesson 45 now records Andrews relational NNC architecture across no-preposition warnings, four usage options, five option groupings, option-one-only stems, supplementary possessor limits, and ic means/purpose/reason/time/special-use behavior while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 45.1-45.4"],
                feedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Relational NNC generation, static relational fixture data, high-generality context-role resolution, affective relational stems, option-four compound embeds, option-one-only stem inventories, supplementary-possessor parsing, ic special uses, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    46: {
        pdfRefs: ["Andrews Lesson 46.1-46.15"],
        directive: "Use Andrews Lesson 46 to direct relational NNC part-two architecture: option-two-only matrix stems, n locatives, ca+n embeds, imperfect and perfective source-state mappings, locative/directional/frequency stems, body-part co/c warnings, contextual sentence inference, and continued blocking of unevidenced Nawat/Pipil surfaces.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-46-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 46.1-46.15 against current relational NNC boundary metadata, option-two-only matrix stems, n locatives, ca+n embeds, imperfect/perfective source mappings, locative/directional/frequency stems, body-part matrix warnings, and contextual sentence-use constraints.",
                andrewsRefs: ["Andrews Lesson 46.1-46.15"],
                expectedFeedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-46-relational-nnc-audit",
                result: "hit",
                correction: "Lesson 46 now records Andrews relational NNC part-two architecture across the eleven option-two-only matrix stems, locative n formations, ca+n embeds, imperfect/perfective source-state rules, co/c body-part warnings, directional/frequency pa split, and sentence-context inference while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 46.1-46.15"],
                feedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Relational NNC generation, matrix-only relational fixture data, Nawat/Pipil orthography confirmation, h-to-j visible spelling adaptation, supplementary possessor/object parsing, can/canin interrogative behavior, co/c body-part lexicalization, pa homonym disambiguation, incorporated adverb routing, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    47: {
        pdfRefs: ["Andrews Lesson 47.1-47.5"],
        directive: "Use Andrews Lesson 47 to direct relational NNC part-three architecture: option-one/two, option-one/three, and option-one/two/three relational groups; associated-entity NNCs; co/c silent replacement; pertinency NNCs; and blocking of translation-driven or unevidenced Nawat/Pipil surfaces.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-47-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 47.1-47.5 against current relational NNC boundary metadata, option-one/two and option-one/three and option-one/two/three stem groups, associated-entity NNCs, pertinency NNCs, and translation-complexity blockers.",
                andrewsRefs: ["Andrews Lesson 47.1-47.5"],
                expectedFeedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-47-relational-nnc-audit",
                result: "hit",
                correction: "Lesson 47 now records Andrews relational NNC part-three architecture across options-one-two stems, options-one-three stems, options-one-two-three stems, associated-entity NNC formation, co/c silent replacement, and pertinency NNC formation while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 47.1-47.5"],
                feedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Relational NNC generation, static relational fixture data, Nawat/Pipil orthography confirmation, h-to-j visible spelling adaptation, supplementary possessor parsing, pa/copa embedding, connective-t relational compounds, body-part compound distinctions, associated-entity versus gentilic contrast, pertinency routing, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    48: {
        pdfRefs: ["Andrews Lesson 48.1-48.13"],
        directive: "Use Andrews Lesson 48 to direct place-name and gentilic NNC architecture: unique adverbialized place-name reference, seven place-name groups, four gentilic formation routes, spelling ambiguity, incorporation, adjectival gentilic use, collectivity, profession/title extensions, and blocking of translation-driven or unevidenced Nawat/Pipil surfaces.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_place_gentilic.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-48-place-gentilic-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 48.1-48.13 against current place-name/gentilic NNC boundary metadata, place-name uniqueness, seven place-name groups, four gentilic formation routes, incorporation, adjectival use, collectivity, profession/title extensions, and translation/evidence blockers.",
                andrewsRefs: ["Andrews Lesson 48.1-48.13"],
                expectedFeedbackRefs: ["src/tests/nnc_place_gentilic.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-48-place-gentilic-audit",
                result: "hit",
                correction: "Lesson 48 now records Andrews place-name and gentilic architecture across unique social reference, seven place-name groups, four gentilic formation routes, spelling ambiguity, incorporation, adjectival use, collectivity, and profession/title extensions while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 48.1-48.13"],
                feedbackRefs: ["src/tests/nnc_place_gentilic.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Place-name generation, gentilic generation, static place fixture data, static gentilic fixture data, Nawat/Pipil orthography confirmation, h-to-j visible spelling adaptation, unique-reference resolution, place-name group parsing, gentilic derivation routing, traditional spelling ambiguity, incorporation, collectivity, profession/title extension, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    49: {
        pdfRefs: ["Andrews Lesson 49.1-49.10"],
        directive: "Use Andrews Lesson 49 to direct adverbial-modification part-one architecture: simple modifier/head order, multiple-nucleus structures, recursive modifier/head/both loci, interrogative and intensifier scope, lexicalized particle-adverbial collocations, place/time apposition, adverbialized principal clauses, and continued blocking of unevidenced Nawat/Pipil surfaces.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-49-adverbial-adjunction-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 49.1-49.10 against current adverbial-adjunction boundary metadata, supplied-surface AST behavior, simple and multiple-nucleus modification, recursion loci, interrogative/intensifier scope, collocations, apposition, and adverbial-principal clause behavior.",
                andrewsRefs: ["Andrews Lesson 49.1-49.10"],
                expectedFeedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-49-adverbial-adjunction-audit",
                result: "hit",
                correction: "Lesson 49 now records Andrews adverbial-modification part-one architecture across simple modifier/head order, multiple-nucleus structures, recursive head/modifier/both loci, interrogative and intensifier scope, particle-adverbial collocations, apposition, and adverbialized principal clauses while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 49.1-49.10"],
                feedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Static adverbial-adjunction data, recursive parser/search detection, multiple-nucleus resolution, compared-manner ambiguity, interrogative principal-clause parsing, intensifier routing, lexicalized particle-adverbial collocation inventory, place/time apposition fixtures, h-to-j visible spelling adaptation if examples become visible, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    50: {
        pdfRefs: ["Andrews Lesson 50.1-50.11"],
        directive: "Use Andrews Lesson 50 to direct adverbial-modification part-two architecture: nonadverbialized adjoined clause units, ten meaning types, time/place/manner/consideration/purpose/condition/concession/consequence/proviso/reason boundaries, particle and collocation scope, and blocking of translation-driven or unevidenced Nawat/Pipil surfaces.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-50-adverbial-adjunction-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 50.1-50.11 against current adverbial-adjunction boundary metadata, supplied-surface AST behavior, nonadverbialized adjoined-clause units, ten meaning types, purpose/condition/concession particles, and ca reason-as-principal-clause-introducer behavior.",
                andrewsRefs: ["Andrews Lesson 50.1-50.11"],
                expectedFeedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-50-adverbial-adjunction-audit",
                result: "hit",
                correction: "Lesson 50 now records Andrews adverbial-modification part-two architecture across nonadverbialized adjoined clause units, time, place, manner, consideration, purpose, condition, concession, consequence, proviso, and reason while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 50.1-50.11"],
                feedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Static adverbial-adjunction data, parser/search detection, time/place/manner fixture analysis, consideration versus included-referent supplementation, purpose versus conjunction ambiguity, open and hypothetical condition parsing, concession collocation inventory, consequence/proviso/reason detection, h-to-j visible spelling adaptation if examples become visible, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    51: {
        pdfRefs: ["Andrews Lesson 51.1-51.4"],
        directive: "Use Andrews Lesson 51 to direct complementation architecture: double-nucleus complement structures, object complements, subject complements, adverbial complements, shared-pronoun links, passive object-complement transforms, relational lexicalized complements, and continued blocking of unevidenced Nawat/Pipil surfaces.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/complement.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-51-complement-clause-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 51.1-51.4 against current complement boundary metadata, supplied-surface AST behavior, double-nucleus structure, object/subject/adverbial complement categories, shared-pronoun links, passive transforms, and relational lexicalized adverbial complements.",
                andrewsRefs: ["Andrews Lesson 51.1-51.4"],
                expectedFeedbackRefs: ["src/tests/complement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-51-complement-clause-audit",
                result: "hit",
                correction: "Lesson 51 now records Andrews complementation architecture across double-nucleus complement structure, object complement categories, subject complement categories, adverbial complement stem families, passive object-complement transforms, and relational lexicalized complement behavior while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 51.1-51.4"],
                feedbackRefs: ["src/tests/complement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Static complement data, complement parser/search detection, object-complement verbstem inventories, subject-complement state parsing, adverbial-complement stem-family routing, relational lexicalized vocabulary, passive transform detection, h-to-j visible spelling adaptation if examples become visible, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    52: {
        pdfRefs: ["Andrews Lesson 52.1-52.7"],
        directive: "Use Andrews Lesson 52 to direct conjunction architecture: balanced no-head concatenation, same-rank conjuncts, unmarked and marked conjunction, adverbial modifiers that are not conjunctors, correlative pairing, lexical innovation by conjoined CNNs, rephrasive/progressive/combined parallel structure, and continued blocking of unevidenced Nawat/Pipil surfaces.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/conjunction.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-52-conjunction-clause-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 52.1-52.7 against current conjunction boundary metadata, supplied-surface AST behavior, balanced no-head conjunction, unmarked and marked conjunction, adverbial modifiers near conjunction, correlative conjunction, lexical innovation, and parallel structure.",
                andrewsRefs: ["Andrews Lesson 52.1-52.7"],
                expectedFeedbackRefs: ["src/tests/conjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-52-conjunction-clause-audit",
                result: "hit",
                correction: "Lesson 52 now records Andrews conjunction architecture across balanced no-head conjunction, unmarked additive/alternative/adversative relations, marked auh structure, adverbial modifiers that are not conjunctors, correlative pairing, lexical innovation by conjoined CNNs, and rephrasive/progressive/combined parallel structure while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 52.1-52.7"],
                feedbackRefs: ["src/tests/conjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Static conjunction data, conjunction parser/search detection, unmarked relation inference, auh/orthography decisions, adverbial-modifier-vs-conjunctor detection, correlative pairing, biclausalism/triclausalism classification, parallel-structure parsing, h-to-j visible spelling adaptation if examples become visible, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    53: {
        pdfRefs: ["Andrews Lesson 53.1-53.7"],
        directive: "Use Andrews Lesson 53 to direct similarity and comparison architecture: seven similarity routes, comparison of sameness versus difference, equality, size equality, comparative degree, how-much-more questions, superlative degree, and continued blocking of adjective-output drift or unevidenced Nawat/Pipil surfaces.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/comparison.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-53-comparison-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 53.1-53.7 against current comparison boundary metadata, similarity routes, equality comparison, size comparison, comparative degree, how-much-more questions, and superlative degree while blocking adjective-output drift.",
                andrewsRefs: ["Andrews Lesson 53.1-53.7"],
                expectedFeedbackRefs: ["src/tests/comparison.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-53-comparison-audit",
                result: "hit",
                correction: "Lesson 53 now records Andrews similarity/comparison architecture across seven similarity routes, comparison of sameness versus difference, equality, size comparison, comparative degree, how-much-more questions, and superlative degree while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 53.1-53.7"],
                feedbackRefs: ["src/tests/comparison.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Comparison ASTs, static comparison data, parser/search detection, similarity-route classification, iuhqui/ihuan/tloc/tlapanahuia parsing, equality and size-comparison detection, comparative conjunction integration, superlative routing, h-to-j visible spelling adaptation if examples become visible, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed.",
    },
    54: {
        pdfRefs: ["Andrews Lesson 54.1-54.6"],
        directive: "Use Andrews Lesson 54 to direct denominal verbstem part-one architecture: nounstem-to-verbstem formation, inceptive/stative ti/hui/ya/a/hua, included-possessor ti, possession ti, ti-lia, ti-a, and t-ia boundaries, with Nawat/Pipil evidence controlling surfaces.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-54-denominal-verbstem-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 54.1-54.6 against current denominal contract inventory, executable-rule contracts, source-evidence gates, orthography bridge, and finite-generation blockers.",
                andrewsRefs: ["Andrews Lesson 54.1-54.6"],
                expectedFeedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-54-denominal-verbstem-audit",
                result: "hit",
                correction: "Lesson 54 now records Andrews denominal verbstem part-one architecture across inceptive/stative suffixes, included-possessor ti, possession ti, ti-lia, ti-a, and t-ia while keeping source-evidence and Nawat/Pipil realization gates visible.",
                andrewsRefs: ["Andrews Lesson 54.1-54.6"],
                feedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Full Lesson 54 lexical-source classification, source-state parsing, possession-ti semantics, possessive-state double-object ti-a, limited a/hua inventories, static Nawat/Pipil examples, visible UI actions, and confirmed Nawat/Pipil surfaces remain partial or evidence-needed.",
    },
    55: {
        pdfRefs: ["Andrews Lesson 55.1-55.7"],
        directive: "Use Andrews Lesson 55 to direct denominal verbstem part-two architecture: temporal tia, causative and intransitive tla, intransitive o-a with huia counterparts, adverbial huia, relational-compound o-a/huia, i-hui/a-hui to o-a, and transitive i-a, with Nawat/Pipil evidence controlling surfaces.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-55-denominal-verbstem-audit",
                type: "metadata-engine-test",
                aim: "Audit Andrews Lesson 55.1-55.7 against current denominal contract inventory, executable-rule contracts, source-evidence gates, orthography bridge, current i-hui/a-hui route support, and finite-generation blockers.",
                andrewsRefs: ["Andrews Lesson 55.1-55.7"],
                expectedFeedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-55-denominal-verbstem-audit",
                result: "hit",
                correction: "Lesson 55 now records Andrews denominal verbstem part-two architecture across temporal tia, causative and intransitive tla, intransitive o-a and huia, adverbial huia, relational-compound o-a/huia, i-hui/a-hui to o-a, and transitive i-a while keeping source-evidence and Nawat/Pipil realization gates visible.",
                andrewsRefs: ["Andrews Lesson 55.1-55.7"],
                feedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Full Lesson 55 lexical-source classification, temporal compound parsing, causative versus intransitive tla inventories, o-a/huia lexical meanings, adverbial and relational source detection, static Nawat/Pipil examples, visible UI actions, and confirmed Nawat/Pipil surfaces remain partial or evidence-needed.",
    },
    56: {
        pdfRefs: ["Andrews Lesson 56.1-56.5"],
        directive: "Use Andrews Lesson 56 to direct personal-name NNC architecture: two-tier downgraded statement predicates, inner/outer subject separation, single-clause sources, adjunction sources, conjunction sources, sentence use, and non-generation until confirmed Nawat/Pipil personal-name evidence exists.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_names.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-56-personal-name-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 56.1-56.5 against current personal-name NNC boundary metadata, false-positive classifiers, structural questions, and non-generation gates.",
                andrewsRefs: ["Andrews Lesson 56.1-56.5"],
                expectedFeedbackRefs: ["src/tests/nnc_names.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-56-personal-name-nnc-audit",
                result: "hit",
                correction: "Lesson 56 now records Andrews personal-name NNC two-tier architecture across single-clause, adjunction, conjunction, sentence-use, title, vocative, god-name downgrade, and place-name embed boundaries while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 56.1-56.5"],
                feedbackRefs: ["src/tests/nnc_names.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Full Lesson 56 personal-name source parsing, confirmed Nawat/Pipil personal-name examples, static names/calendar data, sentence-use ASTs, vocative diagnostics, god-name downgrade routing, place-name embed routing, parser/search detection, visible UI actions, and h-to-j visible spelling adaptation remain partial or evidence-needed.",
    },
    57: {
        pdfRefs: ["Andrews Lesson 57.1-57.7"],
        directive: "Use Andrews Lesson 57 to direct miscellany part-one diagnostics: nonsystemic tense use, irregular valence, absolute topic, supplement/head agreement mismatch, adverbial NNC supplements, silent pers1 morphs, and nounstem-forming l boundaries before any text behavior is treated as implemented.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-57-analysis-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 57.1-57.7 against current textual-analysis boundary metadata, false-positive classifiers, structural questions, and non-generation gates.",
                andrewsRefs: ["Andrews Lesson 57.1-57.7"],
                expectedFeedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-57-analysis-audit",
                result: "hit",
                correction: "Lesson 57 now records Andrews miscellany part-one diagnostics across tense/time mismatch, exceptional valence, absolute topic, agreement mismatch, adverbial NNC supplements, silent pers1 morphs, and nounstem-forming l boundaries while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 57.1-57.7"],
                feedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Full Lesson 57 textual examples, sentence-context parser behavior, tense-attraction detection, valence-irregularity lexicon, absolute-topic ASTs, supplement/head referent tracking, adverbial-NNC supplement detection, silent-pers1 diagnostics, nounstem-forming-l lexical data, visible UI actions, and h-to-j visible spelling adaptation remain partial or evidence-needed.",
    },
    58: {
        pdfRefs: ["Andrews Lesson 58.1-58.8"],
        directive: "Use Andrews Lesson 58 to direct miscellany part-two diagnostics: instrumental az nounstems, problematic stem formations, exclamatory expressions, mah constructions, incorporated-noun subject warnings, and textual problems before any analysis behavior is treated as implemented.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-58-analysis-audit",
                type: "metadata-diagnostic-test",
                aim: "Audit Andrews Lesson 58.1-58.8 against current textual-analysis boundary metadata, false-positive classifiers, structural questions, and non-generation gates.",
                andrewsRefs: ["Andrews Lesson 58.1-58.8"],
                expectedFeedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-58-analysis-audit",
                result: "hit",
                correction: "Lesson 58 now records Andrews miscellany part-two diagnostics across instrumental az nounstems, problematic formations, exclamations, mah construction variants, incorporated-noun subject warnings, and textual problems while keeping generation blocked.",
                andrewsRefs: ["Andrews Lesson 58.1-58.8"],
                feedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Full Lesson 58 textual examples, instrumental nounstem lexical data, problematic-construction parsing, exclamation classification, mah-construction ASTs, incorporated-noun subject diagnostics, textual-problem correction workflow, parser/search behavior, visible UI actions, and h-to-j visible spelling adaptation remain partial or evidence-needed.",
    },
});

function getAndrewsTrajectoryGroup(lessonId) {
    return ANDREWS_TRAJECTORY_GROUPS.find((group) => lessonId >= group.range[0] && lessonId <= group.range[1]);
}

function getAndrewsTrajectoryImplementationState(lesson) {
    if (lesson.status === "implemented") {
        return "implemented-audited";
    }
    if (lesson.status === "partially-implemented") {
        return "partial";
    }
    if (lesson.status === "not-mapped") {
        return "unmapped";
    }
    return "placeholder";
}

function getAndrewsTrajectoryRedirectAction(lesson) {
    if (lesson.status === "implemented") {
        return "keep";
    }
    if (lesson.status === "not-mapped" || lesson.status === "placeholder") {
        return "block-generation";
    }
    if (/Diagnostic|diagnostic|no confirmed|not modeled|not yet mapped/.test(lesson.notes || "")) {
        return "diagnostic-only";
    }
    return "needs-nawat-evidence";
}

function getAndrewsTrajectoryEvidenceStatus(lesson) {
    if (lesson.status === "implemented") {
        return "direct-pdf-audited";
    }
    if (lesson.status === "partially-implemented") {
        return "direct-pdf-partial";
    }
    return "pdf-index-placeholder";
}

function getAndrewsTrajectoryOrthographyStatus(lesson) {
    if (lesson.id === 2) {
        return "orthography-bridge-required";
    }
    if (lesson.status === "not-mapped" || /no generation|metadata|Diagnostic|syntax|AST|sentence|boundary/.test(lesson.notes || "")) {
        return "not-surface-bearing";
    }
    return "nawat-evidence-required";
}

function getAndrewsPlanPursuitAimStatus(lesson) {
    if (lesson.status === "implemented") {
        return "closest-pass";
    }
    if (lesson.status === "partially-implemented") {
        return "shooting";
    }
    if (lesson.status === "not-mapped") {
        return "blocked";
    }
    return "queued";
}

function buildAndrewsPlannedArrows(lesson, trajectory) {
    return [
        {
            id: `lesson-${lesson.id}-andrews-aim`,
            type: "grammar-trajectory",
            aim: trajectory.directive,
            andrewsRefs: trajectory.pdfRefs,
            expectedFeedbackRefs: trajectory.validationRefs,
        },
    ];
}

function buildAndrewsFiredArrows(lesson, trajectory) {
    if (lesson.status === "not-mapped" || lesson.status === "placeholder") {
        return [];
    }
    return [
        {
            id: `lesson-${lesson.id}-current-alignment`,
            result: "hit",
            correction: lesson.status === "implemented"
                ? "Current implementation is kept as the closest Andrews-directed pass for this lesson step."
                : "Current partial implementation is kept as a bounded Andrews-directed shot with remaining gaps exposed.",
            andrewsRefs: trajectory.pdfRefs,
            feedbackRefs: trajectory.validationRefs,
        },
    ];
}

function buildAndrewsLessonTrajectory(lesson) {
    const group = getAndrewsTrajectoryGroup(lesson.id) || ANDREWS_TRAJECTORY_GROUPS[0];
    const override = ANDREWS_FOUNDATION_TRAJECTORY_OVERRIDES[lesson.id] || {};
    const trajectory = {
        pdfRefs: override.pdfRefs || [`Andrews Lesson ${lesson.id}`],
        directive: override.directive || group.directive,
        implementationState: override.implementationState || getAndrewsTrajectoryImplementationState(lesson),
        redirectAction: override.redirectAction || getAndrewsTrajectoryRedirectAction(lesson),
        evidenceStatus: override.evidenceStatus || getAndrewsTrajectoryEvidenceStatus(lesson),
        orthographyStatus: override.orthographyStatus || getAndrewsTrajectoryOrthographyStatus(lesson),
        validationRefs: override.validationRefs || group.validationRefs,
    };
    const aimStatus = getAndrewsPlanPursuitAimStatus(lesson);
    const plannedArrows = Array.isArray(override.plannedArrows)
        ? override.plannedArrows.map((arrow) => ({ ...arrow }))
        : buildAndrewsPlannedArrows(lesson, trajectory);
    const firedArrows = Array.isArray(override.firedArrows)
        ? override.firedArrows.map((arrow) => ({ ...arrow }))
        : buildAndrewsFiredArrows(lesson, trajectory);
    const hitCount = firedArrows.filter((arrow) => arrow.result === "hit").length;
    const missCount = firedArrows.filter((arrow) => arrow.result === "miss").length;
    return {
        ...trajectory,
        stepNumber: lesson.id,
        aimStatus,
        plannedArrows,
        firedArrows,
        hitCount,
        missCount,
        remainingGap: aimStatus === "closest-pass" ? "none" : (override.remainingGap || lesson.notes || "Not yet mapped"),
        closestPass: aimStatus === "closest-pass",
    };
}

const LESSON_REGISTRY_BASE = [
    {
        id: 1,
        title: "Linguistic Preliminaries",
        status: "implemented",
        engineDependencies: ["core/concepts"],
        exampleVerbs: [],
        notes: "Diagnostic concept and notation registry plus visible Lesson 1 glossary UI are implemented; no generation is licensed",
    },
    {
        id: 2,
        title: "Pronunciation. Orthography",
        status: "partially-implemented",
        engineDependencies: ["core/phonology", "core/orthography"],
        exampleVerbs: [],
        notes: "Modern phonology and syllabification support exist; Andrews/Classical orthography is not fully modeled",
    },
    {
        id: 3,
        title: "Particles",
        status: "partially-implemented",
        engineDependencies: ["core/particles"],
        exampleVerbs: [],
        notes: "Visible diagnostic Partícula mode, particle placement metadata, and Andrews-derived orthography-adapted seed inventory exist; no confirmed local particle inventory or generation",
    },
    {
        id: 4,
        title: "Nuclear Clauses",
        status: "partially-implemented",
        engineDependencies: ["core/clause"],
        exampleVerbs: [],
        notes: "Nuclear-clause shell metadata exists; full sentence syntax is not modeled",
    },
    {
        id: 5,
        title: "The Intransitive VNC Formula. Subject Pronouns. Tense Morphs",
        status: "implemented",
        engineDependencies: ["core/agreement", "core/vnc", "core/preterit"],
        exampleVerbs: ["nemi", "yawi", "kisa", "miki"],
        notes: "Core intransitive paradigm fully implemented",
    },
    {
        id: 6,
        title: "The Transitive VNC Formula. Object Pronouns",
        status: "implemented",
        engineDependencies: ["core/agreement", "core/vnc"],
        exampleVerbs: ["kua", "itta", "maka"],
        notes: "Transitive paradigm fully implemented",
    },
    {
        id: 7,
        title: "Verbstem Classes",
        status: "implemented",
        engineDependencies: ["core/vnc", "core/preterit"],
        exampleVerbs: ["nemi", "pewa", "maka", "itta"],
        notes: "All preterit classes (A/B/C/D) implemented",
    },
    {
        id: 8,
        title: "Further Remarks on VNCs. Basic Sentences",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/agreement", "core/sentence"],
        exampleVerbs: [],
        notes: "VNC mechanics and diagnostic sentence-layer metadata exist; sentence generation is not modeled",
    },
    {
        id: 9,
        title: "The Optative Mood. Wish Sentences. Command/Exhortation Sentences",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/sentence"],
        exampleVerbs: ["nemi", "kua"],
        notes: "Finite optative VNC forms are implemented; sentence-level optative constructions are not modeled",
    },
    {
        id: 10,
        title: "The Admonitive Mood. Admonition Sentences",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/sentence"],
        exampleVerbs: ["nemi", "kua"],
        notes: "Finite admonitive VNC forms are implemented; sentence-level admonition constructions are not modeled",
    },
    {
        id: 11,
        title: "Irregular VNCs",
        status: "partially-implemented",
        engineDependencies: ["core/irregulars"],
        exampleVerbs: ["kati", "yawi", "witzi", "weya"],
        notes: "Nawat suppletive subset is implemented; Andrews irregular perfectives, defective verbs, and tense-meaning shifts remain incomplete",
    },
    {
        id: 12,
        title: "The Absolutive-State NNC Formula. Subject Pronouns",
        status: "partially-implemented",
        engineDependencies: ["core/nnc"],
        exampleVerbs: [],
        notes: "Noun derivations exist; full NNC paradigm generation is incomplete",
    },
    {
        id: 13,
        title: "The Possessive-State NNC Formula. Subject and Possessor Pronouns",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/agreement"],
        exampleVerbs: [],
        notes: "Possessive-state NNC partially implemented",
    },
    {
        id: 14,
        title: "Nounstem Classes",
        status: "partially-implemented",
        engineDependencies: ["core/nnc"],
        exampleVerbs: [],
        notes: "Stem class detection exists; full class-based NNC generation incomplete",
    },
    {
        id: 15,
        title: "Further Remarks on NNCs",
        status: "partially-implemented",
        engineDependencies: ["core/nnc"],
        exampleVerbs: [],
        notes: "Further possessive-state NNC, natural-possession, and sentence-structure boundaries are diagnostic; full state-case generation remains unmapped",
    },
    {
        id: 16,
        title: "Pronominal NNCs",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/agreement"],
        exampleVerbs: [],
        notes: "Pronominal NNC subtype, absolutive-only, and fused-spelling boundaries are diagnostic; no pronominal NNC generation",
    },
    {
        id: 17,
        title: "Supplementation (Part One)",
        status: "partially-implemented",
        engineDependencies: ["core/sentence", "core/clause"],
        exampleVerbs: [],
        notes: "Multiple-nucleus supplementation, shared-referent roles, topicalization, and information-question transforms are diagnostic; no supplementation AST or generation",
    },
    {
        id: 18,
        title: "Supplementation (Part Two)",
        status: "partially-implemented",
        engineDependencies: ["core/sentence", "core/clause"],
        exampleVerbs: [],
        notes: "Integrated, marked, discontinuous, exceptional, silent-object, vocative, and free-order supplementation are diagnostic; no supplementation AST or generation",
    },
    {
        id: 19,
        title: "Supplementation (Part Three)",
        status: "partially-implemented",
        engineDependencies: ["core/sentence", "core/clause"],
        exampleVerbs: [],
        notes: "VNC supplements, pronominal plural supplementation, included-referent clauses, report, and deleted-saying structures are diagnostic; no sentence AST or generation",
    },
    {
        id: 20,
        title: "The Nonactive Verbstem",
        status: "implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["nemi", "kua", "maka"],
        notes: "Nonactive derivation fully implemented",
    },
    {
        id: 21,
        title: "The Passive-Voice VNC",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: ["kua", "maka"],
        notes: "Passive VNC has nonactive-stem and passive-subject support, but Andrews 21.1-21.4 still need passive/impersonal separation, nonspecific-object gating, reflexive and multi-object passive routing, and sentence-layer diagnostics",
    },
    {
        id: 22,
        title: "Impersonal VNCs",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: ["nemi", "kua"],
        notes: "Impersonal VNC has nonactive-stem and impersonal-subject support, but Andrews 22.1-22.6 still need passive/impersonal separation, inherent impersonal inventory, nonanimate distinction, source-object gates, reflexive ne witness routing, sentence-layer diagnostics, and ta-impersonal derivation evidence",
    },
    {
        id: 23,
        title: "More on Verb Objects",
        status: "partially-implemented",
        engineDependencies: ["core/agreement", "core/vnc"],
        exampleVerbs: [],
        notes: "Object prefix allomorphy and combinations exist, but Andrews 23.1-23.5 still need object-function typing, discontinuous causative/applicative object contracts, full mainline/shuntline routing, silent morph tables, and Appendix C evidence",
    },
    {
        id: 24,
        title: "Causative Verbstems (First Type). Destockal Verbstems",
        status: "partially-implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["nemi", "kisa", "miki"],
        notes: "Type-1 causative and destockal derivation exist, but Andrews 24.1-24.9 still need final-vowel valence boundaries, valence-neutral stem gates, full destockal inventories, source-CNV subject-to-object transforms, and causative-a control diagnostics",
    },
    {
        id: 25,
        title: "Causative Verbstems (Second Type)",
        status: "partially-implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["temu", "tema", "nemi"],
        notes: "Type-2 causative (TIA/WIA/LIA) output exists, but Andrews 25.1-25.16 still need source-family inventories, source-CNV single/double/triple object transforms, ambiguity diagnostics, passive/impersonal causatives, sentence moods, and silent-object supplementation",
    },
    {
        id: 26,
        title: "Applicative Verbstems",
        status: "partially-implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["maka", "itta", "nemi"],
        notes: "Applicative output exists, but Andrews 26.1-26.23 still need source-family inventories, source-shape exceptions, source-CNV single/double/triple object transforms, ambiguity diagnostics, passive/impersonal applicatives, sentence moods, alternative object interpretation, deceptive VNCs, and object-plus-suffix unit control",
    },
    {
        id: 27,
        title: "Frequentative Verbstems",
        status: "partially-implemented",
        engineDependencies: ["core/derivation/frequentative"],
        exampleVerbs: [],
        notes: "Diagnostic frequentative boundary metadata exists for Andrews 27.1-27.6, but confirmed Nawat/Pipil frequentative examples, prefix-shape selection, object-pronoun reduplication, destockal frequentatives, uncertain formations, nonactive frequentatives, and generation remain evidence-needed",
    },
    {
        id: 28,
        title: "Compound Verbstems: Verbal Embed",
        status: "partially-implemented",
        engineDependencies: ["core/parsing", "core/vnc"],
        exampleVerbs: [],
        notes: "Diagnostic compoundAst and compoundFrame metadata exists for Andrews 28.1-28.12, but connective-t preterit-embed generation, limited matrix inventories, special passive/impersonal formations, accompanying possession, reflexive-matrix compounds, shared-object compounds, future-embed compounds, recursion, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 29,
        title: "Purposive VNCs",
        status: "partially-implemented",
        engineDependencies: ["core/vnc/purposive"],
        exampleVerbs: [],
        notes: "Diagnostic purposive/directional boundary metadata exists for Andrews 29.1-29.7, but outbound/inbound purposive generation, silent future-morph behavior, vowel-length and glottal disambiguation, optional o# behavior, irregular plural n, passive/impersonal embeds, compound-stemmed embeds, external hual/on alternatives, fulfilled-purpose readings, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 30,
        title: "Compound Verbstems: Nominal Embed",
        status: "partially-implemented",
        engineDependencies: ["core/parsing", "core/vnc"],
        exampleVerbs: [],
        notes: "Diagnostic compoundAst lexical-embed metadata exists for Andrews 30.1-30.18, but general-use nounstem selection, incorporated-object valence lowering, exceptional tla-fusion analysis, incorporated-adverb source transforms, supplement-to-adverb transforms, incorporated complements, reduplication, nonactive routing, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 31,
        title: "Compound Nounstems",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/compound"],
        exampleVerbs: [],
        notes: "Diagnostic compound nounstem metadata exists for Andrews 31.1-31.13, but NNC-specific compound AST parsing, linked/connectiveless/integrated segmentation, possessor orientation, embed class allomorphy, unique fillers, ca/yo matrix behavior, conjunctive compounds, recursive compounds, sex/progeny/fellowship patterns, affinity stems, distributive/varietal stems, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 32,
        title: "Affective NNCs",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/compound"],
        exampleVerbs: [],
        notes: "Diagnostic affective NNC metadata exists for Andrews 32.1-32.8, but affective matrix class routing for pil/pol/tzin/ton/zol, lexicalized class shifts, vocative variants, affinity-shaped affectives, pil child/noble ambiguity, nonanimate number behavior, flawed-subject num1 silencing, defect-stem inventories, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 33,
        title: "Honorific VNCs. Pejorative VNCs",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/vnc/honorific_pejorative"],
        exampleVerbs: [],
        notes: "Diagnostic honorific/pejorative VNC metadata exists for Andrews 33.1-33.10, but honorific, pejorative, and reverential generation, causative/applicative reflexive route selection, projective-object ambiguity, tzin-o-a and pol-o-a preterit-embed routing, compound-verbstem transformation targeting, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 34,
        title: "Cardinal-Numeral NNCs",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/numerals"],
        exampleVerbs: [],
        notes: "Diagnostic cardinal-numeral NNC metadata exists for Andrews 34.1-34.16, but cardinal numeral generation, basic stems, gross counts, high-order compounds, conjoined numerals, classifier sets, reduplication, approximation, measures, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 35,
        title: "Nominalization of VNCs (Part One)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Diagnostic preterit-agentive nominalization metadata exists for Andrews 35.1-35.12, and some generated Nawat preterit-agentive/general-use/ownerhood/adverbial continuations exist, but number alternations, affinity stems, activated-object hybrids, old-person boundaries, rare variants, complete ownerhood subclasses, object-focused adverbials, lexicalized reflexives, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 36,
        title: "Nominalization of VNCs (Part Two)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Diagnostic nominalized VNC metadata exists for Andrews 36.1-36.12, and some generated Nawat customary-agentive, patientive, instrumentive, present/future-agentive, passive-action, and active-action outputs exist, but reanalysis/full-nominalization routing, rare possessives, activated-object hybrids, state-source exceptions, future lexicalized embeds, action restricted/general-use alternations, lexicalized meanings, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 37,
        title: "Deverbal Nounstems (Part One)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Diagnostic deverbal nounstem metadata exists for Andrews 37.1-37.9, and some generated Nawat s/lis active-action, potential-patient, impersonal-action, and passive-patientive gates exist, but complete z/liz coverage, compound embeds, multiple-nucleus syntax, passive-patientive source gates, tzin assimilation, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 38,
        title: "Deverbal Nounstems (Part Two)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Diagnostic impersonal patientive metadata exists for Andrews 38.1-38.2, and some generated Nawat impersonal patientivo, reflexive ne, projective ta, te-to-ta, and compound patientive continuations exist, but complete source-family routing, root-plus-ya selection, human/nonhuman contrast, anomalous te forms, homonym disambiguation, compound patientive behavior, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 39,
        title: "Deverbal Nounstems (Part Three)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Diagnostic patientive-operations metadata exists for Andrews 39.1-39.9, and some generated Nawat perfective, imperfective, root/stock, characteristic-property, multiple-derivation, compound-embed, incorporated-complement, incorporated-object, and characteristic-property embed continuations exist, but full source gates, organic-possession contrasts, root/stock variant choice, matrix inventories, valence-violation handling, idiomatic restrictions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 40,
        title: "Adjectival NNCs (Part One)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/adjectival"],
        exampleVerbs: [],
        notes: "Diagnostic adjectival NNC function metadata exists for Andrews 40.1-40.12, and some opt-in Nawat ordinary NNC, VNC, patientive, nominalized VNC, and root-plus-ya adjectival continuations exist, but exceptional adjectival NNCs, full NNC/VNC function coverage, synonym sets, predicate-adjective sentence syntax, modification AST behavior, class-specific preterit-agentive behavior, root-plus-ya exceptions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 41,
        title: "Adjectival NNCs (Part Two)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/adjectival"],
        exampleVerbs: [],
        notes: "Diagnostic adjectival NNC metadata exists for Andrews 41.1-41.4, and some opt-in Nawat intensified, compound-source, and denominal-compound adjectival continuations exist, but intensified-stem families, pah/cal/tzon/affective matrix intensification, metaphor or simile intensification, syntactic intensifiers, full compound-verbstem source subtypes, incorporated-object patientive source disambiguation, adjectival nounstems embedded in compound-stemmed NNCs, modifier/head syntax, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 42,
        title: "Adjectival Modification (Part One)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/modification"],
        exampleVerbs: [],
        notes: "Diagnostic adjectival-modification metadata exists for Andrews 42.1-42.10, and the current AST composes supplied Nawat surfaces for selected modifier/head orders, but multiple-nucleus syntax, supplementation ambiguity resolution, compound-head matrix targeting, transitive VNC modifier ambiguity, pronominal/quantitive/numeral head behavior, measure NNC head behavior, recursion, incorporated modification structures, parser/search detection, fixture-backed clause examples, and confirmed Nawat/Pipil evidence remain partial or diagnostic-only",
    },
    {
        id: 43,
        title: "Adjectival Modification (Part Two)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/modification"],
        exampleVerbs: [],
        notes: "Diagnostic adjectival-modification metadata exists for Andrews 43.1-43.9, and the current AST can mark discontinuous order on supplied Nawat surfaces, but nonpreposed modifier parsing, same-head cooperation, interrogative-head ambiguity, oc ce heads, shared-referent violations, one-of/none-of idioms, male-bonding modifiers, named-partner modifiers, parser/search detection, fixture-backed clause examples, and confirmed Nawat/Pipil evidence remain partial or diagnostic-only",
    },
    {
        id: 44,
        title: "Adverbial Nuclear Clauses",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/adverbial"],
        exampleVerbs: [],
        notes: "Diagnostic adverbial nuclear-clause metadata exists for Andrews 44.1-44.9, and one configured adverbio surface carries a first-degree VNC adverbialization frame, but second-degree absolutive NNC adverbials, particle-looking NNC evidence, other absolutive adverbials, preterit-agentive adverbial NNCs, possessive-state adverbials, incorporated adverbial modifiers, parser/search detection, static adverbial data, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 45,
        title: "Relational NNCs (Part One)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/relational"],
        exampleVerbs: [],
        notes: "Diagnostic relational-NNC metadata exists for Andrews 45.1-45.4, and usage frames record no-preposition warnings, four relational options, option-one possessive-state gating, option groupings, option-one-only stems, and ic functions, but relational generation, static relational fixture data, supplementary-possessor parsing, option-four embeds, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 46,
        title: "Relational NNCs (Part Two)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/relational"],
        exampleVerbs: [],
        notes: "Diagnostic relational-NNC metadata exists for Andrews 46.1-46.15, and the Lesson 46 pursuit frame records option-two-only matrix stems, n locatives, ca+n embeds, imperfect/perfective source-state rules, co/c body-part warnings, directional/frequency pa split, and sentence-context inference, but relational generation, matrix-only relational fixture data, supplementary possessor/object parsing, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 47,
        title: "Relational NNCs (Part Three)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/relational"],
        exampleVerbs: [],
        notes: "Diagnostic relational-NNC metadata exists for Andrews 47.1-47.5, and the Lesson 47 pursuit frame records option-one/two, option-one/three, and option-one/two/three relational groups, associated-entity NNCs, co/c silent replacement, and pertinency NNCs, but relational generation, static relational fixture data, pa/copa embedding, connective-t compounds, associated-entity versus gentilic contrast, pertinency routing, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 48,
        title: "Place-Name NNCs. Gentilic NNCs",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/place_gentilic"],
        exampleVerbs: [],
        notes: "Diagnostic place/gentilic NNC metadata exists for Andrews 48.1-48.13, and the Lesson 48 pursuit frame records unique social place-name reference, seven place-name groups, four gentilic formation routes, spelling ambiguity, incorporation, adjectival gentilic use, collectivity, and profession/title extensions, but place-name generation, gentilic generation, static place/gentilic fixture data, unique-reference resolution, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 49,
        title: "Adverbial Modification (Part One)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/adjunction"],
        exampleVerbs: [],
        notes: "Diagnostic adverbial-adjunction metadata exists for Andrews 49.1-49.10, and the Lesson 49 pursuit frame records simple modifier/head order, multiple-nucleus structures, recursion loci, interrogative and intensifier scope, collocations, apposition, and adverbialized principal clauses, but static adverbial-adjunction data, recursive parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 50,
        title: "Adverbial Modification (Part Two)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/adjunction"],
        exampleVerbs: [],
        notes: "Diagnostic adverbial-adjunction metadata exists for Andrews 50.1-50.11, and the Lesson 50 pursuit frame records nonadverbialized adjoined clause units, ten meaning types, time/place/manner/consideration/purpose/condition/concession/consequence/proviso/reason boundaries, and ca as a principal-clause introducer rather than a conjunction, but static adverbial-adjunction data, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 51,
        title: "Complementation",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/complement"],
        exampleVerbs: [],
        notes: "Diagnostic complement metadata exists for Andrews 51.1-51.4, and the Lesson 51 pursuit frame records double-nucleus structures, object complements, subject complements, adverbial complements, passive object-complement transforms, and relational lexicalized complements, but static complement data, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 52,
        title: "Conjunction",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/conjunction"],
        exampleVerbs: [],
        notes: "Diagnostic conjunction metadata exists for Andrews 52.1-52.7, and the Lesson 52 pursuit frame records balanced no-head conjunction, unmarked and marked conjunction, adverbial modifiers that are not conjunctors, correlative pairing, lexical innovation by conjoined CNNs, and rephrasive/progressive/combined parallel structure, but static conjunction data, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 53,
        title: "The Notion of Similarity. Comparison",
        status: "partially-implemented",
        engineDependencies: ["core/comparison"],
        exampleVerbs: [],
        notes: "Diagnostic comparison metadata exists for Andrews 53.1-53.7, and the Lesson 53 pursuit frame records seven similarity routes, comparison of sameness versus difference, equality, size comparison, comparative degree, how-much-more questions, and superlative degree, but comparison ASTs, static comparison data, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 54,
        title: "Denominal Verbstems (Part One)",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: [],
        notes: "Denominal contract inventory and source-evidence route support exist for Andrews 54.1-54.6, but full lexical-source classification, possession-ti semantics, double-object ti-a, limited a/hua inventories, static Nawat/Pipil examples, and visible UI actions remain partial or evidence-needed",
    },
    {
        id: 55,
        title: "Denominal Verbstems (Part Two)",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: [],
        notes: "Denominal contract inventory and source-evidence route support exist for Andrews 55.1-55.7, including temporal tia, causative/intransitive tla, o-a/huia, adverbial huia, relational-compound o-a/huia, i-hui/a-hui to o-a, and transitive i-a, but lexical-source classification, static Nawat/Pipil examples, visible UI actions, and confirmed surfaces remain partial or evidence-needed",
    },
    {
        id: 56,
        title: "Personal-Name NNCs",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/names"],
        exampleVerbs: [],
        notes: "Diagnostic personal-name NNC metadata exists for Andrews 56.1-56.5, and the Lesson 56 pursuit frame records two-tier downgraded statement predicates, inner/outer subject separation, single-clause sources, adjunction sources, conjunction sources, sentence use, title/vocative boundaries, god-name downgrades, and place-name embeds, but personal-name source parsing, static name/calendar data, parser/search detection, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 57,
        title: "Miscellany (Part One)",
        status: "partially-implemented",
        engineDependencies: ["core/analysis"],
        exampleVerbs: [],
        notes: "Diagnostic analysis metadata exists for Andrews 57.1-57.7, and the Lesson 57 pursuit frame records nonsystemic tense use, irregular valence, absolute topic, supplement/head agreement mismatch, adverbial NNC supplements, silent pers1 morphs, and nounstem-forming l boundaries, but textual examples, parser/search detection, ASTs, UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
    {
        id: 58,
        title: "Miscellany (Part Two)",
        status: "partially-implemented",
        engineDependencies: ["core/analysis"],
        exampleVerbs: [],
        notes: "Diagnostic analysis metadata exists for Andrews 58.1-58.8, and the Lesson 58 pursuit frame records instrumental az nounstems, problematic stem formations, exclamatory expressions, mah constructions, incorporated-noun subject warnings, and textual problems, but textual examples, parser/search behavior, ASTs, visible UI actions, and confirmed Nawat/Pipil examples remain partial or evidence-needed",
    },
];

const LESSON_REGISTRY = LESSON_REGISTRY_BASE.map((lesson) => ({
    ...lesson,
    trajectory: buildAndrewsLessonTrajectory(lesson),
}));

// Summary counts
const LESSON_STATUS_COUNTS = LESSON_REGISTRY.reduce((acc, lesson) => {
    acc[lesson.status] = (acc[lesson.status] || 0) + 1;
    return acc;
}, {});
