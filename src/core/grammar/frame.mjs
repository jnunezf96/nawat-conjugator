// Canonical modern ESM module.

export function createGrammarFrameModule(targetObject = globalThis) {
    var GRAMMAR_FRAME_VERSION = 1;
    var GRAMMAR_FRAME_KEYS = Object.freeze(["authorityFrame", "orthographyFrame", "unitFrame", "morphBoundaryFrame", "stemFrame", "nuclearClauseFrame", "participantFrame", "inflectionFrame", "routeContract", "astFrame", "resultFrame", "diagnosticFrame"]);
    var GRAMMAR_FRAME_LAYER_ORDER = Object.freeze(["authority-evidence", "orthography", "unit-kind", "morph-boundary", "stem-core", "nuclear-clause", "participants-state-valence", "inflection-route-source", "route-or-ast", "output-provenance", "diagnostics-curriculum"]);
    var GRAMMAR_NO_OUTPUT_SURFACE_MARKERS = Object.freeze(["—"]);
    var ANDREWS_FORMULA_SLOT_SCHEMA_VERSION = 1;
    var ANDREWS_LOGIC_AUTHORITY_POLICY_VERSION = 1;
    var ANDREWS_LOGIC_AUTHORITY_POLICY = Object.freeze({
      version: ANDREWS_LOGIC_AUTHORITY_POLICY_VERSION,
      grammarLogicAuthority: "Andrews PDF",
      grammarLogicDecidesGeneration: true,
      orthographyExamplesDecideGrammarLogic: false,
      grammarLogicGate: "andrews-licensed-route-plus-required-source-context",
      orthographyExamplesRole: "spelling-realization-only",
      orthographyAuthority: "Nawat/Pipil orthography bridge",
      orthographyBridgeRequired: true,
      noClassicalSurfaceImport: true,
      scope: "Andrews-licensed route, slot, boundary, and derivation logic"
    });
    var ANDREWS_CNV_TENSE_LOGIC_AUTHORITY_BY_TENSE = Object.freeze({
      presente: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-present",
        mood: "indicative",
        andrewsTense: "present",
        label: "Andrews logic",
        title: "Andrews Lessons 5 and 7: present indicative, imperfective stem, zero tense morph."
      }),
      "presente-habitual": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-customary-present",
        mood: "indicative",
        andrewsTense: "customary-present",
        label: "Andrews logic",
        title: "Andrews Lessons 5 and 7: customary present indicative, imperfective stem."
      }),
      imperfecto: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-past",
        mood: "indicative",
        andrewsTense: "imperfect",
        label: "Andrews logic",
        title: "Andrews Lessons 5 and 7: imperfect indicative, imperfective stem."
      }),
      futuro: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.2", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-future",
        mood: "indicative",
        andrewsTense: "future",
        label: "Andrews logic",
        title: "Andrews Lessons 5 and 7: future indicative, imperfective stem."
      }),
      preterito: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.2", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-perfective-preterit",
        mood: "indicative",
        andrewsTense: "preterit",
        label: "Andrews logic",
        title: "Andrews Lessons 5 and 7: preterit indicative, perfective stem."
      }),
      "pasado-remoto": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-perfective-distant-past",
        mood: "indicative",
        andrewsTense: "distant-past",
        label: "Andrews logic",
        title: "Andrews Lessons 5 and 7: distant-past indicative, perfective stem."
      }),
      optativo: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.3", "Andrews 5.5", "Andrews 9"]),
        slot: "tns",
        family: "optative-nonpast",
        mood: "optative",
        andrewsTense: "nonpast",
        label: "Andrews logic",
        title: "Andrews Lessons 5 and 9: nonpast optative."
      }),
      "preterito-universal-1": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-a",
        mood: "indicative",
        andrewsTense: "preterit",
        label: "Andrews logic",
        title: "Andrews Lesson 7: perfective stem class A."
      }),
      "preterito-universal-2": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-b",
        mood: "indicative",
        andrewsTense: "preterit",
        label: "Andrews logic",
        title: "Andrews Lesson 7: perfective stem class B."
      }),
      "preterito-universal-3": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-d",
        mood: "indicative",
        andrewsTense: "preterit",
        label: "Andrews logic",
        title: "Andrews Lesson 7: perfective stem class D."
      }),
      "preterito-universal-4": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-c",
        mood: "indicative",
        andrewsTense: "preterit",
        label: "Andrews logic",
        title: "Andrews Lesson 7: perfective stem class C."
      })
    });
    var ANDREWS_CNV_NAWAT_EXTENSION_TENSES = Object.freeze(["presente-desiderativo", "condicional", "perfecto", "pluscuamperfecto", "condicional-perfecto"]);
    function freezeAndrewsFormulaSlot(slot = {}) {
      return Object.freeze({
        id: String(slot.id || ""),
        key: String(slot.key || slot.id || ""),
        token: String(slot.token || slot.id || ""),
        label: String(slot.label || slot.id || ""),
        role: String(slot.role || ""),
        owner: String(slot.owner || ""),
        path: String(slot.path || slot.id || ""),
        boundary: String(slot.boundary || ""),
        layer: String(slot.layer || ""),
        position: String(slot.position || ""),
        leading: String(slot.leading || ""),
        trailing: String(slot.trailing || ""),
        wrapper: String(slot.wrapper || ""),
        requiredForEcho: slot.requiredForEcho === true,
        emptyDisplay: String(slot.emptyDisplay || ""),
        blockedInterpretations: Object.freeze(normalizeGrammarFrameArray(slot.blockedInterpretations).map(entry => String(entry || "").trim()).filter(Boolean)),
        diagnostics: Object.freeze(normalizeGrammarFrameArray(slot.diagnostics).map(entry => String(entry || "").trim()).filter(Boolean))
      });
    }
    function freezeAndrewsFormulaSourceRequirement(requirement = {}) {
      return Object.freeze({
        id: String(requirement.id || ""),
        slotId: String(requirement.slotId || ""),
        slotKey: String(requirement.slotKey || ""),
        path: String(requirement.path || ""),
        label: String(requirement.label || requirement.id || ""),
        source: String(requirement.source || ""),
        required: requirement.required !== false,
        missingDiagnosticId: String(requirement.missingDiagnosticId || ""),
        missingMessage: String(requirement.missingMessage || "")
      });
    }
    function freezeAndrewsFormulaGenerationContract(contract = {}) {
      return Object.freeze({
        routeFamily: String(contract.routeFamily || ""),
        routeStage: String(contract.routeStage || ""),
        generationStatus: String(contract.generationStatus || ""),
        generationAllowed: typeof contract.generationAllowed === "undefined" || contract.generationAllowed === null ? null : contract.generationAllowed === true,
        sourceGated: contract.sourceGated === true,
        diagnosticOnlyWhenMissingSource: contract.diagnosticOnlyWhenMissingSource === true,
        unsupportedWhenBlocked: contract.unsupportedWhenBlocked !== false,
        outputPolicy: String(contract.outputPolicy || "")
      });
    }
    function freezeAndrewsFormulaSlotSchema(schema = {}) {
      return Object.freeze({
        version: ANDREWS_FORMULA_SLOT_SCHEMA_VERSION,
        id: String(schema.id || ""),
        label: String(schema.label || ""),
        title: String(schema.title || schema.label || ""),
        unit: String(schema.unit || ""),
        family: String(schema.family || ""),
        compactFormula: String(schema.compactFormula || ""),
        hasTensePosition: schema.hasTensePosition === null ? null : schema.hasTensePosition === true,
        generationBoundary: String(schema.generationBoundary || ""),
        evidenceRefs: Object.freeze(normalizeGrammarFrameArray(schema.evidenceRefs).map(entry => String(entry || "").trim()).filter(Boolean)),
        slots: Object.freeze(normalizeGrammarFrameArray(schema.slots).map(slot => freezeAndrewsFormulaSlot(slot))),
        sourceRequirements: Object.freeze(normalizeGrammarFrameArray(schema.sourceRequirements).map(requirement => freezeAndrewsFormulaSourceRequirement(requirement))),
        generationContract: freezeAndrewsFormulaGenerationContract(schema.generationContract),
        diagnostics: Object.freeze(normalizeGrammarFrameArray(schema.diagnostics).map(entry => String(entry || "").trim()).filter(Boolean))
      });
    }
    var ANDREWS_FORMULA_SLOT_SCHEMAS = Object.freeze({
      "vnc-shell": freezeAndrewsFormulaSlotSchema({
        id: "vnc-shell",
        label: "CNV",
        title: "Clausula nuclear verbal",
        unit: "CNV",
        family: "nuclear-clause-shell",
        compactFormula: "#sujeto+valencia(STEM)tiempo+numero#",
        hasTensePosition: true,
        generationBoundary: "finite-surface-generation-scoped-to-preterit-indicative",
        sourceRequirements: [{
          id: "vnc-predicate-stem",
          slotId: "STEM",
          slotKey: "predicateStem",
          path: "predicate.stem",
          label: "verbal predicate stem",
          source: "input-stem-or-fixture",
          required: true,
          missingDiagnosticId: "vnc-missing-predicate-stem",
          missingMessage: "VNC formula workbench requires a verbal predicate stem inside the parentheses."
        }],
        generationContract: {
          routeFamily: "vnc-valence",
          routeStage: "formula-workbench",
          generationStatus: "source-gated",
          generationAllowed: true,
          sourceGated: true,
          diagnosticOnlyWhenMissingSource: true,
          unsupportedWhenBlocked: true,
          outputPolicy: "VNC formulas use Andrews as the grammar logic authority; orthographic examples only illustrate realization, and spelling still passes through the orthography bridge."
        },
        evidenceRefs: ["Andrews 4.5", "Andrews 5.1-5.3", "Andrews 6.1-6.4"],
        slots: [{
          id: "boundary-open",
          key: "boundaryOpen",
          token: "#",
          label: "limite",
          role: "nuclear-boundary",
          owner: "shell",
          path: "shell.boundary.open",
          boundary: "open",
          layer: "shell",
          position: "edge"
        }, {
          id: "pers1-pers2",
          key: "pers1Pers2",
          token: "pers1-pers2",
          label: "sujeto",
          role: "subject-person",
          owner: "subject",
          path: "subject.pers1-pers2",
          boundary: "outside-predicate",
          layer: "subject",
          position: "prefix"
        }, {
          id: "va1-va2",
          key: "valence",
          token: "va1-va2",
          label: "valencia",
          role: "object-valence",
          owner: "predicate",
          path: "predicate.valence.va1-va2",
          boundary: "outside-stem",
          layer: "predicate",
          position: "pre-stem",
          leading: "+",
          blockedInterpretations: ["stem", "subject-connector", "subject-number-connector", "tense"]
        }, {
          id: "STEM",
          key: "predicateStem",
          token: "STEM",
          label: "predicado",
          role: "predicate-stem",
          owner: "predicate",
          path: "predicate.stem",
          boundary: "inside-parentheses",
          layer: "predicate",
          position: "stem",
          wrapper: "parentheses",
          requiredForEcho: true
        }, {
          id: "tns",
          key: "tensePosition",
          token: "tns",
          label: "tiempo",
          role: "tense",
          owner: "predicate",
          path: "predicate.tense",
          boundary: "outside-stem",
          layer: "predicate",
          position: "post-stem",
          blockedInterpretations: ["nnc-state", "subject-number-connector", "object-valence"]
        }, {
          id: "num1-num2",
          key: "num1Num2",
          token: "num1-num2",
          label: "numero",
          role: "subject-number-connector",
          owner: "subject",
          path: "subject.num1-num2",
          boundary: "outside-predicate",
          layer: "subject",
          position: "suffix",
          leading: "+",
          blockedInterpretations: ["tense", "stem-suffix", "object-valence", "predicate-state"]
        }, {
          id: "boundary-close",
          key: "boundaryClose",
          token: "#",
          label: "limite",
          role: "nuclear-boundary",
          owner: "shell",
          path: "shell.boundary.close",
          boundary: "close",
          layer: "shell",
          position: "edge"
        }],
        diagnostics: ["Classical VNC spelling is structural evidence only.", "Displayed Nawat surfaces are orthography-bridge realizations of Andrews-licensed formula logic."]
      }),
      "ordinary-nnc-shell": freezeAndrewsFormulaSlotSchema({
        id: "ordinary-nnc-shell",
        label: "CNN/S",
        title: "Clausula nuclear nominal ordinaria",
        unit: "CNN",
        family: "nuclear-clause-shell",
        compactFormula: "#sujeto(STEM)numero#",
        hasTensePosition: false,
        generationBoundary: "ordinary-nnc-has-no-tense-slot",
        sourceRequirements: [{
          id: "ordinary-nnc-predicate-stem",
          slotId: "STEM",
          slotKey: "predicateStem",
          path: "predicate.stem",
          label: "predicate nounstem",
          source: "input-stem-or-fixture",
          required: true,
          missingDiagnosticId: "ordinary-nnc-missing-predicate-stem",
          missingMessage: "Ordinary NNC/S requires a predicate nounstem inside the parentheses."
        }],
        generationContract: {
          routeFamily: "ordinary-nnc",
          routeStage: "formula-workbench",
          generationStatus: "generated",
          generationAllowed: true,
          sourceGated: false,
          diagnosticOnlyWhenMissingSource: true,
          unsupportedWhenBlocked: true,
          outputPolicy: "Generate through Andrews ordinary NNC/S formula logic; never treat num1-num2 as tense or a stem suffix."
        },
        evidenceRefs: ["Andrews 12.2", "Andrews 12.3", "Andrews 12.4"],
        slots: [{
          id: "boundary-open",
          key: "boundaryOpen",
          token: "#",
          label: "limite",
          role: "nuclear-boundary",
          owner: "shell",
          path: "shell.boundary.open",
          boundary: "open",
          layer: "shell",
          position: "edge"
        }, {
          id: "pers1-pers2",
          key: "pers1Pers2",
          token: "pers1-pers2",
          label: "sujeto",
          role: "subject-person",
          owner: "subject",
          path: "subject.pers1-pers2",
          boundary: "outside-predicate",
          layer: "subject",
          position: "prefix"
        }, {
          id: "STEM",
          key: "predicateStem",
          token: "STEM",
          label: "predicado nominal",
          role: "predicate-stem",
          owner: "predicate",
          path: "predicate.stem",
          boundary: "inside-parentheses",
          layer: "predicate",
          position: "stem",
          wrapper: "parentheses",
          requiredForEcho: true
        }, {
          id: "num1-num2",
          key: "num1Num2",
          token: "num1-num2",
          label: "conector de numero",
          role: "subject-number-connector",
          owner: "subject",
          path: "subject.num1-num2",
          boundary: "outside-predicate",
          layer: "subject",
          position: "suffix",
          emptyDisplay: "Ø",
          blockedInterpretations: ["tense", "stem-suffix", "nounstem", "predicate-state"],
          diagnostics: ["num1-num2 belongs to subject, not predicate", "ordinary NNC/S has no tense slot"]
        }, {
          id: "boundary-close",
          key: "boundaryClose",
          token: "#",
          label: "limite",
          role: "nuclear-boundary",
          owner: "shell",
          path: "shell.boundary.close",
          boundary: "close",
          layer: "shell",
          position: "edge"
        }],
        diagnostics: ["Predicate stem is inside parentheses.", "Subject connectors are outside parentheses.", "No tense slot is present in ordinary NNC/S."]
      }),
      "possessive-state-nnc": freezeAndrewsFormulaSlotSchema({
        id: "possessive-state-nnc",
        label: "CNN posesiva",
        title: "CNN con estado posesivo",
        unit: "CNN",
        family: "possessive-state",
        compactFormula: "#sujeto+estado(STEM)numero#",
        hasTensePosition: false,
        generationBoundary: "possessive-state-source-gated",
        sourceRequirements: [{
          id: "possessive-nnc-predicate-stem",
          slotId: "STEM",
          slotKey: "predicateStem",
          path: "predicate.stem",
          label: "possessive predicate nounstem",
          source: "input-stem-or-fixture",
          required: true,
          missingDiagnosticId: "possessive-nnc-missing-predicate-stem",
          missingMessage: "Possessive-state NNC requires a predicate nounstem inside the parentheses."
        }],
        generationContract: {
          routeFamily: "possessive-state-nnc",
          routeStage: "formula-workbench",
          generationStatus: "source-gated",
          generationAllowed: true,
          sourceGated: true,
          diagnosticOnlyWhenMissingSource: true,
          unsupportedWhenBlocked: true,
          outputPolicy: "Generate possessive-state structure from Andrews logic; keep Classical spelling structural and realize Nawat/Pipil spelling through the orthography bridge."
        },
        evidenceRefs: ["Andrews 13.1", "Andrews 13.2", "Andrews 13.3", "Andrews 13.6"],
        slots: [{
          id: "boundary-open",
          key: "boundaryOpen",
          token: "#",
          label: "limite",
          role: "nuclear-boundary",
          owner: "shell",
          path: "shell.boundary.open",
          boundary: "open",
          layer: "shell",
          position: "edge"
        }, {
          id: "pers1-pers2",
          key: "pers1Pers2",
          token: "pers1-pers2",
          label: "sujeto",
          role: "subject-person",
          owner: "subject",
          path: "subject.pers1-pers2",
          boundary: "outside-predicate",
          layer: "subject",
          position: "prefix"
        }, {
          id: "st1-st2",
          key: "possessiveState",
          token: "st1-st2",
          label: "estado posesivo",
          role: "possessive-state",
          owner: "predicate",
          path: "predicate.state.st1-st2",
          boundary: "predicate-state",
          layer: "predicate",
          position: "pre-stem",
          leading: "+",
          blockedInterpretations: ["subject-connector", "tense"]
        }, {
          id: "STEM",
          key: "predicateStem",
          token: "STEM",
          label: "nounstem",
          role: "predicate-stem",
          owner: "predicate",
          path: "predicate.stem",
          boundary: "inside-parentheses",
          layer: "predicate",
          position: "stem",
          wrapper: "parentheses",
          requiredForEcho: true
        }, {
          id: "num1-num2",
          key: "num1Num2",
          token: "num1-num2",
          label: "numero del sujeto",
          role: "subject-number-connector",
          owner: "subject",
          path: "subject.num1-num2",
          boundary: "outside-predicate",
          layer: "subject",
          position: "suffix",
          emptyDisplay: "Ø",
          blockedInterpretations: ["tense", "stem-suffix", "nounstem", "predicate-state"]
        }, {
          id: "boundary-close",
          key: "boundaryClose",
          token: "#",
          label: "limite",
          role: "nuclear-boundary",
          owner: "shell",
          path: "shell.boundary.close",
          boundary: "close",
          layer: "shell",
          position: "edge"
        }],
        diagnostics: ["Possessive state belongs to the predicate.", "num1-num2 remains a subject connector."]
      }),
      "valence-object-slots": freezeAndrewsFormulaSlotSchema({
        id: "valence-object-slots",
        label: "Valencia",
        title: "Ranuras de valencia y objeto",
        unit: "CNV",
        family: "participant-valence",
        compactFormula: "va monadica o va1-va2 diadica",
        hasTensePosition: true,
        generationBoundary: "object-route-source-gated",
        evidenceRefs: ["Andrews 6.1-6.4", "Andrews 23.1-23.5"],
        slots: [{
          id: "va",
          key: "monadicValence",
          token: "va",
          label: "objeto no especifico",
          role: "monadic-valence",
          owner: "predicate",
          path: "predicate.valence.va",
          boundary: "outside-stem",
          layer: "predicate",
          position: "pre-stem"
        }, {
          id: "va1-va2",
          key: "dyadicValence",
          token: "va1-va2",
          label: "objeto especifico",
          role: "dyadic-valence",
          owner: "predicate",
          path: "predicate.valence.va1-va2",
          boundary: "outside-stem",
          layer: "predicate",
          position: "pre-stem"
        }, {
          id: "obj1",
          key: "objectMainline",
          token: "obj1",
          label: "mainline",
          role: "object-mainline",
          owner: "predicate",
          path: "predicate.object.mainline",
          boundary: "object-slot",
          layer: "predicate",
          position: "pre-stem"
        }, {
          id: "obj2-obj3",
          key: "objectShuntline",
          token: "obj2/obj3",
          label: "shuntline",
          role: "object-shuntline",
          owner: "predicate",
          path: "predicate.object.shuntline",
          boundary: "object-slot",
          layer: "predicate",
          position: "pre-stem"
        }]
      }),
      "subject-number-connectors": freezeAndrewsFormulaSlotSchema({
        id: "subject-number-connectors",
        label: "Sujeto/numero",
        title: "Conectores de sujeto y numero",
        unit: "CNV/CNN",
        family: "participant-connectors",
        compactFormula: "pers1-pers2 ... num1-num2",
        hasTensePosition: null,
        generationBoundary: "connector-boundary-audit",
        evidenceRefs: ["Andrews 5.1-5.3", "Andrews 12.2-12.4", "Andrews 13.1-13.6"],
        slots: [{
          id: "pers1-pers2",
          key: "pers1Pers2",
          token: "pers1-pers2",
          label: "dyada de sujeto",
          role: "subject-person",
          owner: "subject",
          path: "subject.pers1-pers2",
          boundary: "outside-predicate",
          layer: "subject",
          position: "prefix",
          blockedInterpretations: ["predicate-state", "tense", "object-valence"]
        }, {
          id: "predicate-side",
          key: "predicateSide",
          token: "(STEM)",
          label: "lado del predicado",
          role: "predicate-boundary",
          owner: "predicate",
          path: "predicate.side",
          boundary: "inside-or-adjacent-to-predicate",
          layer: "predicate",
          position: "middle"
        }, {
          id: "num1-num2",
          key: "num1Num2",
          token: "num1-num2",
          label: "dyada de numero",
          role: "subject-number-connector",
          owner: "subject",
          path: "subject.num1-num2",
          boundary: "outside-predicate",
          layer: "subject",
          position: "suffix",
          emptyDisplay: "Ø",
          blockedInterpretations: ["tense", "stem-suffix", "nounstem", "object-valence", "predicate-state"]
        }],
        diagnostics: ["pers1-pers2 and num1-num2 are subject dyads.", "num1-num2 is not tense, object valence, predicate state, or a stem suffix.", "VNC may add tns; CNN formulas remain tense-free."]
      }),
      "derivational-routes": freezeAndrewsFormulaSlotSchema({
        id: "derivational-routes",
        label: "Rutas",
        title: "Rutas derivacionales",
        unit: "CNV/CNN",
        family: "derivational-route",
        compactFormula: "fuente -> operacion -> destino",
        hasTensePosition: null,
        generationBoundary: "source-gated-route",
        evidenceRefs: ["Andrews 20-27", "Andrews 35-39", "Andrews 46.3.1.a", "Andrews 54-55"],
        slots: [{
          id: "SOURCE",
          key: "sourceFormula",
          token: "SOURCE",
          label: "formula fuente",
          role: "source-formula",
          owner: "route",
          path: "route.source",
          boundary: "route-source",
          layer: "route",
          position: "source"
        }, {
          id: "arrow-source-operation",
          key: "arrowSourceOperation",
          token: " -> ",
          label: "flecha",
          role: "route-boundary",
          owner: "route",
          path: "route.boundary.source-operation",
          boundary: "route-operation",
          layer: "route",
          position: "middle"
        }, {
          id: "OP",
          key: "operation",
          token: "OP",
          label: "operacion",
          role: "derivational-operation",
          owner: "route",
          path: "route.operation",
          boundary: "route-operation",
          layer: "route",
          position: "middle"
        }, {
          id: "arrow-operation-target",
          key: "arrowOperationTarget",
          token: " -> ",
          label: "flecha",
          role: "route-boundary",
          owner: "route",
          path: "route.boundary.operation-target",
          boundary: "route-target",
          layer: "route",
          position: "middle"
        }, {
          id: "TARGET",
          key: "targetFormula",
          token: "TARGET",
          label: "formula destino",
          role: "target-formula",
          owner: "route",
          path: "route.target",
          boundary: "route-target",
          layer: "route",
          position: "target"
        }]
      }),
      "compound-stems": freezeAndrewsFormulaSlotSchema({
        id: "compound-stems",
        label: "Compuestos",
        title: "Tallos compuestos",
        unit: "CNV/CNN",
        family: "compound-stem",
        compactFormula: "incluido + matriz",
        hasTensePosition: null,
        generationBoundary: "diagnostic-only",
        evidenceRefs: ["Andrews 28.1-28.8", "Andrews 31.1-31.4"],
        slots: [{
          id: "EMBED",
          key: "embeddedStem",
          token: "EMBED",
          label: "incluido",
          role: "embedded-stem",
          owner: "stem",
          path: "stem.embedded",
          boundary: "compound-left",
          layer: "stem",
          position: "left"
        }, {
          id: "plus",
          key: "compoundPlus",
          token: " + ",
          label: "union",
          role: "compound-boundary",
          owner: "stem",
          path: "stem.boundary",
          boundary: "compound",
          layer: "stem",
          position: "middle"
        }, {
          id: "MATRIX",
          key: "matrixStem",
          token: "MATRIX",
          label: "matriz",
          role: "matrix-stem",
          owner: "stem",
          path: "stem.matrix",
          boundary: "compound-right",
          layer: "stem",
          position: "right"
        }, {
          id: "arrow",
          key: "compoundArrow",
          token: " -> ",
          label: "flecha",
          role: "compound-output-boundary",
          owner: "stem",
          path: "stem.output-boundary",
          boundary: "compound-output",
          layer: "stem",
          position: "middle"
        }, {
          id: "COMPOUND",
          key: "compoundStem",
          token: "COMPOUND",
          label: "compuesto",
          role: "compound-stem",
          owner: "stem",
          path: "stem.compound",
          boundary: "compound-output",
          layer: "stem",
          position: "output"
        }]
      }),
      "nominalizations": freezeAndrewsFormulaSlotSchema({
        id: "nominalizations",
        label: "Nominalizaciones",
        title: "Nominalizaciones de CNV",
        unit: "CNV->CNN",
        family: "nominalization",
        compactFormula: "CNV fuente -> CNN destino",
        hasTensePosition: null,
        generationBoundary: "source-gated-route",
        evidenceRefs: ["Andrews 35.1-35.6", "Andrews 36.1-36.6"],
        slots: [{
          id: "CNV",
          key: "sourceCnv",
          token: "CNV",
          label: "fuente verbal",
          role: "source-formula",
          owner: "route",
          path: "route.source.cnv",
          boundary: "route-source",
          layer: "route",
          position: "source"
        }, {
          id: "SOURCE_CORE",
          key: "sourceCore",
          token: "SOURCE_CORE",
          label: "nucleo fuente",
          role: "source-core",
          owner: "stem",
          path: "route.source.core",
          boundary: "inside-source",
          layer: "stem",
          position: "source-core",
          wrapper: "parentheses"
        }, {
          id: "arrow",
          key: "nominalizationArrow",
          token: " -> ",
          label: "flecha",
          role: "route-boundary",
          owner: "route",
          path: "route.boundary",
          boundary: "route-operation",
          layer: "route",
          position: "middle"
        }, {
          id: "CNN",
          key: "targetCnn",
          token: "CNN",
          label: "destino nominal",
          role: "target-formula",
          owner: "route",
          path: "route.target.cnn",
          boundary: "route-target",
          layer: "route",
          position: "target"
        }, {
          id: "NOMINALIZED_STEM",
          key: "nominalizedStem",
          token: "NOMINALIZED_STEM",
          label: "tallo nominalizado",
          role: "target-stem",
          owner: "stem",
          path: "route.target.stem",
          boundary: "route-target",
          layer: "stem",
          position: "target",
          wrapper: "parentheses"
        }]
      }),
      "personal-name-embedded-nnc": freezeAndrewsFormulaSlotSchema({
        id: "personal-name-embedded-nnc",
        label: "Nombres",
        title: "Nombre personal con clausula incluida",
        unit: "CNN",
        family: "embedded-nuclear-clause",
        compactFormula: "capa externa CNN + clausula interna",
        hasTensePosition: false,
        generationBoundary: "source-gated",
        evidenceRefs: ["Andrews 56.1-56.5"],
        slots: [{
          id: "boundary-open",
          key: "boundaryOpen",
          token: "#",
          label: "limite",
          role: "nuclear-boundary",
          owner: "outer-shell",
          path: "outer.boundary.open",
          boundary: "open",
          layer: "outer-shell",
          position: "edge"
        }, {
          id: "pers1-pers2",
          key: "outerSubject",
          token: "pers1-pers2",
          label: "sujeto externo",
          role: "outer-subject",
          owner: "outer-shell",
          path: "outer.subject",
          boundary: "outside-predicate",
          layer: "outer-shell",
          position: "prefix"
        }, {
          id: "INNER_CLAUSE",
          key: "innerClause",
          token: "INNER_CLAUSE",
          label: "clausula interna",
          role: "embedded-clause-stem",
          owner: "predicate",
          path: "predicate.inner-clause",
          boundary: "inside-parentheses",
          layer: "predicate",
          position: "stem",
          wrapper: "parentheses"
        }, {
          id: "0-0",
          key: "outerNumber",
          token: "0-0",
          label: "numero externo",
          role: "outer-number",
          owner: "outer-shell",
          path: "outer.num1-num2",
          boundary: "outside-predicate",
          layer: "outer-shell",
          position: "suffix",
          blockedInterpretations: ["tense", "inner-subject"]
        }, {
          id: "boundary-close",
          key: "boundaryClose",
          token: "#",
          label: "limite",
          role: "nuclear-boundary",
          owner: "outer-shell",
          path: "outer.boundary.close",
          boundary: "close",
          layer: "outer-shell",
          position: "edge"
        }]
      }),
      "unsupported-route-diagnostics": freezeAndrewsFormulaSlotSchema({
        id: "unsupported-route-diagnostics",
        label: "Diagnosticos",
        title: "Rutas incompletas o no soportadas",
        unit: "diagnostic",
        family: "diagnostic-boundary",
        compactFormula: "sin salida inventada",
        hasTensePosition: null,
        generationBoundary: "unsupported-routes-block-generation",
        evidenceRefs: ["LCM layer 12", "Andrews formula inventory"],
        slots: [{
          id: "INPUT",
          key: "input",
          token: "INPUT",
          label: "entrada",
          role: "source-input",
          owner: "diagnostic",
          path: "diagnostic.input",
          boundary: "source",
          layer: "diagnostic",
          position: "source"
        }, {
          id: "arrow-input-diagnostic",
          key: "diagnosticArrow",
          token: " -> ",
          label: "flecha",
          role: "diagnostic-boundary",
          owner: "diagnostic",
          path: "diagnostic.boundary",
          boundary: "gate",
          layer: "diagnostic",
          position: "middle"
        }, {
          id: "DIAGNOSTIC_ONLY",
          key: "diagnosticOnly",
          token: "DIAGNOSTIC_ONLY",
          label: "diagnostico",
          role: "blocked-output",
          owner: "diagnostic",
          path: "diagnostic.output",
          boundary: "output",
          layer: "diagnostic",
          position: "output"
        }]
      })
    });
    function getAndrewsLogicAuthorityPolicy() {
      return {
        ...ANDREWS_LOGIC_AUTHORITY_POLICY
      };
    }
    function isAndrewsLogicGenerationAuthorityEnabled() {
      return ANDREWS_LOGIC_AUTHORITY_POLICY.grammarLogicDecidesGeneration === true && ANDREWS_LOGIC_AUTHORITY_POLICY.orthographyExamplesDecideGrammarLogic === false;
    }
    function cloneAndrewsCnvTenseLogicAuthorityFrame(frame = null) {
      if (!frame || typeof frame !== "object") {
        return null;
      }
      return {
        ...frame,
        sourceRefs: Array.isArray(frame.sourceRefs) ? Array.from(frame.sourceRefs) : []
      };
    }
    function getAndrewsCnvTenseLogicAuthorityFrame(tenseValue = "") {
      const normalizedTense = String(tenseValue || "").trim();
      const directFrame = cloneAndrewsCnvTenseLogicAuthorityFrame(ANDREWS_CNV_TENSE_LOGIC_AUTHORITY_BY_TENSE[normalizedTense]);
      if (directFrame) {
        return directFrame;
      }
      if (typeof targetObject.NONACTIVE_SUFFIX_ORDER !== "undefined" && Array.isArray(targetObject.NONACTIVE_SUFFIX_ORDER) && targetObject.NONACTIVE_SUFFIX_ORDER.includes(normalizedTense)) {
        return {
          scope: "andrews-licensed",
          source: "Andrews",
          sourceRefs: ["Andrews 20"],
          slot: "derived-stem",
          family: "nonactive-verbstem",
          mood: "",
          andrewsTense: "",
          label: "Andrews nonactive logic",
          title: "Andrews Lesson 20: nonactive suffix selection is derived-stem logic, not a Nawat/Pipil evidence gate."
        };
      }
      if (ANDREWS_CNV_NAWAT_EXTENSION_TENSES.includes(normalizedTense)) {
        return {
          scope: "nawat-extension",
          source: "Nawat/Pipil orthography evidence",
          sourceRefs: ["not an Andrews tense authority"],
          slot: "tns",
          family: `nawat-extension-${normalizedTense || "unknown"}`,
          mood: "",
          andrewsTense: "",
          label: "Nawat extension",
          title: "Nawat/Pipil finite extension: spelling or surface evidence only; Andrews does not license it as CNV tense logic."
        };
      }
      return {
        scope: "unknown",
        source: "unclassified",
        sourceRefs: [],
        slot: "andrews-frame-required",
        family: normalizedTense || "unknown",
        mood: "",
        andrewsTense: "",
        label: "unclassified",
        title: "Andrews PDF must classify this tense before CNV generation."
      };
    }
    function getAndrewsCnvTenseLogicGenerationGateFrame(frameOrTense = "") {
      const frame = frameOrTense && typeof frameOrTense === "object" ? frameOrTense : getAndrewsCnvTenseLogicAuthorityFrame(frameOrTense);
      const scope = String(frame?.scope || "").trim();
      const slot = String(frame?.slot || "").trim();
      if (scope === "andrews-licensed") {
        return {
          logicRole: slot === "derived-stem" ? "derived-stem-logic-source" : "grammar-logic-source",
          generationGate: "andrews-licensed-generation",
          outputRole: "orthography-realization",
          nawatEvidenceRole: "orthography-realization-only",
          classicalOutputImport: "blocked",
          engineGenerationAllowed: true
        };
      }
      if (scope === "nawat-extension") {
        return {
          logicRole: "surface-extension-not-grammar-source",
          generationGate: "not-andrews-grammar-gate",
          outputRole: "surface-evidence-only",
          nawatEvidenceRole: "surface-extension-only",
          classicalOutputImport: "blocked",
          engineGenerationAllowed: false
        };
      }
      return {
        logicRole: "andrews-frame-required",
        generationGate: "unclassified-andrews-frame-required",
        outputRole: "blocked-until-andrews-frame",
        nawatEvidenceRole: "not-a-grammar-gate",
        classicalOutputImport: "blocked",
        engineGenerationAllowed: false
      };
    }
    function getAndrewsCnvTenseLogicGenerationGateValue(tenseValue = "") {
      return getAndrewsCnvTenseLogicGenerationGateFrame(tenseValue).generationGate || "";
    }
    function isAndrewsCnvTenseLogicGenerationAllowed(tenseValue = "") {
      return getAndrewsCnvTenseLogicGenerationGateValue(tenseValue) === "andrews-licensed-generation";
    }
    function cloneAndrewsFormulaSlotDefinition(slot = null) {
      if (!slot || typeof slot !== "object") {
        return null;
      }
      return {
        ...slot,
        blockedInterpretations: Array.from(slot.blockedInterpretations || []),
        diagnostics: Array.from(slot.diagnostics || [])
      };
    }
    function cloneAndrewsFormulaSlotSchema(schema = null) {
      if (!schema || typeof schema !== "object") {
        return null;
      }
      return {
        ...schema,
        evidenceRefs: Array.from(schema.evidenceRefs || []),
        slots: Array.from(schema.slots || []).map(cloneAndrewsFormulaSlotDefinition).filter(Boolean),
        sourceRequirements: Array.from(schema.sourceRequirements || []).map(requirement => ({
          ...requirement
        })),
        generationContract: {
          ...(schema.generationContract || {})
        },
        diagnostics: Array.from(schema.diagnostics || [])
      };
    }
    function getAndrewsFormulaSlotSchema(schemaId = "") {
      const key = String(schemaId || "").trim();
      return cloneAndrewsFormulaSlotSchema(ANDREWS_FORMULA_SLOT_SCHEMAS[key] || null);
    }
    function getAndrewsFormulaSlotSchemas() {
      return Object.keys(ANDREWS_FORMULA_SLOT_SCHEMAS).map(getAndrewsFormulaSlotSchema).filter(Boolean);
    }
    function resolveAndrewsFormulaSlotSchema(schemaOrId = "") {
      if (schemaOrId && typeof schemaOrId === "object") {
        return cloneAndrewsFormulaSlotSchema(schemaOrId);
      }
      return getAndrewsFormulaSlotSchema(schemaOrId);
    }
    function getAndrewsFormulaSlotDefinition(schemaOrId = "", slotId = "") {
      const schema = resolveAndrewsFormulaSlotSchema(schemaOrId);
      const normalizedSlotId = String(slotId || "").trim();
      if (!schema || !normalizedSlotId) {
        return null;
      }
      return (schema.slots || []).find(slot => slot.id === normalizedSlotId || slot.key === normalizedSlotId || slot.path === normalizedSlotId || slot.token === normalizedSlotId) || null;
    }
    function getAndrewsFormulaGenerationContract(schemaOrId = "") {
      const schema = resolveAndrewsFormulaSlotSchema(schemaOrId);
      return schema?.generationContract ? {
        ...schema.generationContract
      } : null;
    }
    function getAndrewsFormulaSourceRequirements(schemaOrId = "") {
      const schema = resolveAndrewsFormulaSlotSchema(schemaOrId);
      return Array.from(schema?.sourceRequirements || []).map(requirement => ({
        ...requirement
      }));
    }
    function renderAndrewsFormulaSlotTemplate(slot = null, options = {}) {
      if (!slot || typeof slot !== "object") {
        return "";
      }
      if (isAndrewsFormulaSlotOmitted(slot, options)) {
        return "";
      }
      const slotTokens = options?.slotTokens && typeof options.slotTokens === "object" ? options.slotTokens : {};
      const token = String(slotTokens[slot.key] || slotTokens[slot.id] || slotTokens[slot.path] || slot.token || slot.id || "");
      const wrapped = slot.wrapper === "parentheses" ? `(${token})` : token;
      return `${slot.leading || ""}${wrapped}${slot.trailing || ""}`;
    }
    function isAndrewsFormulaSlotOmitted(slot = null, options = {}) {
      if (!slot || typeof slot !== "object") {
        return false;
      }
      const omitted = new Set([...normalizeGrammarFrameArray(options.omitSlots), ...normalizeGrammarFrameArray(options.omitSlotIds), ...normalizeGrammarFrameArray(options.omitSlotKeys), ...normalizeGrammarFrameArray(options.omitSlotPaths)].map(entry => String(entry || "").trim()).filter(Boolean));
      if (!omitted.size) {
        return false;
      }
      return omitted.has(slot.id) || omitted.has(slot.key) || omitted.has(slot.path) || omitted.has(slot.token);
    }
    function renderAndrewsFormulaTemplate(schemaOrId = "", options = {}) {
      const schema = resolveAndrewsFormulaSlotSchema(schemaOrId);
      if (!schema) {
        return "";
      }
      return (schema.slots || []).map(slot => renderAndrewsFormulaSlotTemplate(slot, options)).join("");
    }
    function getAndrewsFormulaEchoSlotValue(slot = null, slotValues = {}) {
      const values = slotValues && typeof slotValues === "object" ? slotValues : {};
      const source = values[slot.key] || values[slot.id] || values[slot.path] || null;
      if (slot.role === "nuclear-boundary" || slot.role === "route-boundary" || slot.role === "compound-boundary" || slot.role === "diagnostic-boundary" || /arrow|plus/i.test(slot.key)) {
        return slot.token || "";
      }
      if (slot.key === "pers1Pers2" || slot.id === "pers1-pers2") {
        const prefix = String(source?.displayPrefix || source?.prefix || source?.subjectPrefix || "Ø") || "Ø";
        const suffix = String(source?.displaySuffix || source?.suffix || source?.subjectSuffix || "Ø") || "Ø";
        return `${prefix}-${suffix}`;
      }
      if (slot.key === "num1Num2" || slot.id === "num1-num2") {
        const connector = String(source?.displayDyad || source?.dyad || source?.fullConnector || source?.displayConnector || source?.displaySurface || source?.connector || source?.surface || slot.emptyDisplay || "Ø");
        return connector || slot.emptyDisplay || "Ø";
      }
      if (slot.key === "predicateStem" || slot.id === "STEM") {
        return String(source?.displayStem || source?.formulaDisplayStem || source?.stem || source?.surface || "");
      }
      return String(source?.display || source?.value || source?.surface || source?.stem || slot.token || "");
    }
    function renderAndrewsFormulaEchoFromSchema(schemaOrId = "", slotValues = {}) {
      const schema = resolveAndrewsFormulaSlotSchema(schemaOrId);
      if (!schema) {
        return "";
      }
      const pieces = [];
      for (const slot of schema.slots || []) {
        if (isAndrewsFormulaSlotOmitted(slot, slotValues?.renderOptions || slotValues?.options || {})) {
          continue;
        }
        const value = getAndrewsFormulaEchoSlotValue(slot, slotValues);
        if (slot.requiredForEcho && !value) {
          return "";
        }
        const wrapped = slot.wrapper === "parentheses" ? `(${value})` : value;
        pieces.push(`${slot.leading || ""}${wrapped}${slot.trailing || ""}`);
      }
      return pieces.join("");
    }
    function normalizeAndrewsFormulaRequirementValue(value = null) {
      if (value === null || typeof value === "undefined") {
        return "";
      }
      if (typeof value === "object") {
        return String(value.displayStem || value.formulaDisplayStem || value.stem || value.display || value.value || value.surface || value.connector || "").trim();
      }
      return String(value || "").trim();
    }
    function getAndrewsFormulaSourceRequirementValue(requirement = {}, {
      slotValues = {},
      sourceValues = {},
      inputValue = ""
    } = {}) {
      const keys = [requirement.slotKey, requirement.slotId, requirement.path, requirement.id].filter(Boolean);
      for (const key of keys) {
        const slotValue = normalizeAndrewsFormulaRequirementValue(slotValues?.[key]);
        if (slotValue) {
          return slotValue;
        }
        const sourceValue = normalizeAndrewsFormulaRequirementValue(sourceValues?.[key]);
        if (sourceValue) {
          return sourceValue;
        }
      }
      if (requirement.slotKey === "predicateStem" || requirement.slotId === "STEM") {
        return normalizeAndrewsFormulaRequirementValue(inputValue);
      }
      return "";
    }
    function evaluateAndrewsFormulaSourceRequirements(schemaOrId = "", {
      slotValues = {},
      sourceValues = {},
      inputValue = ""
    } = {}) {
      const schema = resolveAndrewsFormulaSlotSchema(schemaOrId);
      const requirements = Array.from(schema?.sourceRequirements || []);
      const satisfiedRequirements = [];
      const missingRequirements = [];
      requirements.forEach(requirement => {
        const value = getAndrewsFormulaSourceRequirementValue(requirement, {
          slotValues,
          sourceValues,
          inputValue
        });
        const record = {
          ...requirement,
          value,
          satisfied: Boolean(value) || requirement.required === false
        };
        if (record.satisfied) {
          satisfiedRequirements.push(record);
        } else {
          missingRequirements.push(record);
        }
      });
      const diagnostics = missingRequirements.map(requirement => ({
        id: requirement.missingDiagnosticId || `${schema?.id || "formula"}-${requirement.id || "source"}-missing`,
        severity: "blocked",
        status: "blocked",
        message: requirement.missingMessage || `${requirement.label || requirement.id || "source"} is required before generation.`,
        failedLayer: "nuclear-clause",
        contractLayer: "nuclearClauseFrame",
        formulaSchemaId: schema?.id || "",
        requirementId: requirement.id || "",
        slotId: requirement.slotId || "",
        slotPath: requirement.path || ""
      }));
      return {
        ok: missingRequirements.length === 0,
        schemaId: schema?.id || "",
        generationContract: getAndrewsFormulaGenerationContract(schema || schemaOrId),
        sourceRequirements: requirements.map(requirement => ({
          ...requirement
        })),
        satisfiedRequirements,
        missingRequirements,
        diagnostics
      };
    }
    function evaluateAndrewsFormulaGenerationAuthority(schemaOrId = "", {
      slotValues = {},
      sourceValues = {},
      inputValue = ""
    } = {}) {
      const schema = resolveAndrewsFormulaSlotSchema(schemaOrId);
      const policy = getAndrewsLogicAuthorityPolicy();
      const contract = getAndrewsFormulaGenerationContract(schema || schemaOrId);
      const sourceCheck = evaluateAndrewsFormulaSourceRequirements(schema || schemaOrId, {
        slotValues,
        sourceValues,
        inputValue
      });
      const policyAllows = isAndrewsLogicGenerationAuthorityEnabled();
      const contractAllows = contract?.generationAllowed === true;
      const sourceAllows = sourceCheck.ok === true;
      const generationAllowed = Boolean(policyAllows && contractAllows && sourceAllows);
      const blockedReasons = [policyAllows ? "" : "andrews-logic-authority-disabled", contractAllows ? "" : "formula-contract-blocks-generation", sourceAllows ? "" : "formula-source-requirement-missing"].filter(Boolean);
      return {
        ok: generationAllowed,
        allowed: generationAllowed,
        schemaId: schema?.id || "",
        formula: renderAndrewsFormulaTemplate(schema || schemaOrId),
        authority: policy.grammarLogicAuthority || "Andrews PDF",
        logicAuthority: policy.grammarLogicAuthority || "Andrews PDF",
        orthographyAuthority: policy.orthographyAuthority || "Nawat/Pipil orthography bridge",
        orthographyBoundary: "orthography-realization",
        spellingEvidenceRole: policy.orthographyExamplesRole || "spelling-realization-only",
        classicalSurfaceImport: policy.noClassicalSurfaceImport ? "blocked" : "unspecified",
        gate: generationAllowed ? "andrews-formula-authorized-generation" : "andrews-formula-generation-blocked",
        status: generationAllowed ? contract?.generationStatus || "generated" : contract?.unsupportedWhenBlocked === false ? "diagnostic" : "blocked",
        blockedReasons,
        policy,
        generationContract: contract,
        sourceRequirements: sourceCheck.sourceRequirements,
        missingRequirements: sourceCheck.missingRequirements,
        satisfiedRequirements: sourceCheck.satisfiedRequirements,
        diagnostics: sourceCheck.diagnostics
      };
    }
    function diagnoseAndrewsFormulaSlotInterpretation(schemaOrId = "", slotId = "", interpretation = "") {
      const schema = resolveAndrewsFormulaSlotSchema(schemaOrId);
      const slot = getAndrewsFormulaSlotDefinition(schema, slotId);
      const normalizedInterpretation = String(interpretation || "").trim();
      const blockedInterpretations = Array.isArray(slot?.blockedInterpretations) ? slot.blockedInterpretations : [];
      const blocked = Boolean(slot && normalizedInterpretation && blockedInterpretations.includes(normalizedInterpretation));
      return {
        ok: Boolean(slot) && !blocked,
        schemaId: schema?.id || "",
        slotId: slot?.id || String(slotId || ""),
        slotPath: slot?.path || "",
        slotRole: slot?.role || "",
        slotOwner: slot?.owner || "",
        interpretation: normalizedInterpretation,
        blocked,
        diagnostic: blocked ? {
          id: `formula-slot-${slot.id}-not-${normalizedInterpretation}`,
          severity: "blocked",
          message: `${schema?.id || "formula"} slot ${slot.id} cannot be interpreted as ${normalizedInterpretation}.`,
          failedLayer: "nuclear-clause",
          contractLayer: "nuclearClauseFrame"
        } : null
      };
    }
    function normalizeGrammarFrameObject(value = null) {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return null;
      }
      return {
        ...value
      };
    }
    function normalizeGrammarFrameArray(value = []) {
      if (!Array.isArray(value)) {
        return [];
      }
      return value.filter(entry => entry !== null && entry !== undefined);
    }
    function normalizeGrammarSurfaceValue(value = "") {
      const surface = String(value || "").trim();
      return GRAMMAR_NO_OUTPUT_SURFACE_MARKERS.includes(surface) ? "" : surface;
    }
    function normalizeGrammarSurfaceForms(value = []) {
      return normalizeGrammarFrameArray(value).map(entry => normalizeGrammarSurfaceValue(entry)).filter(Boolean);
    }
    function normalizeGrammarCanonicalRecordList(value = []) {
      if (!value) {
        return [];
      }
      return Array.isArray(value) ? value : [value];
    }
    function normalizeGrammarFormulaSegmentFrame(segment = null) {
      if (!segment || typeof segment !== "object" || Array.isArray(segment)) {
        return null;
      }
      return {
        slot: String(segment.slot || segment.formulaSlot || segment.formulaSlotKey || ""),
        role: String(segment.role || segment.formulaRole || ""),
        owner: String(segment.owner || ""),
        formulaValue: String(segment.formulaValue || segment.formulaMorph || segment.structural || ""),
        surface: normalizeGrammarSurfaceValue(segment.surface || segment.surfaceValue || segment.realized || ""),
        orthographyBridge: String(segment.orthographyBridge || "Nawat/Pipil orthography bridge"),
        operationId: String(segment.operationId || ""),
        sourceFrameId: String(segment.sourceFrameId || "")
      };
    }
    function buildGrammarFormulaRecord({
      id = "",
      unit = "",
      formula = "",
      formulaText = "",
      formulaSlots = null,
      routeContract = null,
      sourceFrame = null,
      operationFrames = [],
      source = ""
    } = {}) {
      const resolvedFormula = String(formulaText || formula || "").trim();
      if (!resolvedFormula) {
        return null;
      }
      return Object.freeze({
        kind: "grammar-formula-record",
        id: String(id || resolvedFormula),
        unit: String(unit || ""),
        formula: resolvedFormula,
        formulaText: resolvedFormula,
        formulaSlots: normalizeGrammarFrameObject(formulaSlots),
        routeContract: normalizeGrammarFrameObject(routeContract),
        sourceFrame: normalizeGrammarFrameObject(sourceFrame),
        operationFrames: Object.freeze(normalizeGrammarFrameArray(operationFrames).map(entry => normalizeGrammarFrameObject(entry)).filter(Boolean)),
        source: String(source || "structured-formula-slots"),
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface"])
      });
    }
    function buildGrammarFormulaRealizationRecord({
      id = "",
      formulaRecord = null,
      formulaRecordId = "",
      unit = "",
      segmentFrames = [],
      surface = "",
      surfaceForms = [],
      orthographyBridge = "Nawat/Pipil orthography bridge",
      source = "",
      deriveSurfaceFromSegments = false
    } = {}) {
      const normalizedSegments = Object.freeze(normalizeGrammarFrameArray(segmentFrames).map(normalizeGrammarFormulaSegmentFrame).filter(Boolean));
      const segmentSurface = normalizedSegments.map(segment => normalizeGrammarSurfaceValue(segment.surface)).join("");
      const providedSurfaceForms = Array.isArray(surfaceForms) ? surfaceForms : [surfaceForms].filter(Boolean);
      const normalizedSurfaceForms = deriveSurfaceFromSegments ? segmentSurface ? Object.freeze([segmentSurface]) : Object.freeze([]) : Object.freeze(normalizeGrammarSurfaceForms(providedSurfaceForms.length ? providedSurfaceForms : [surface || segmentSurface]));
      const primarySurface = normalizedSurfaceForms[0] || "";
      if (!primarySurface && !normalizedSegments.length) {
        return null;
      }
      const resolvedFormulaRecordId = String(formulaRecordId || formulaRecord?.id || formulaRecord?.formula || "");
      const segmentIdentity = normalizedSegments.map(segment => [segment.slot, segment.role, segment.formulaValue, segment.operationId, segment.sourceFrameId].map(entry => String(entry || "").trim()).filter(Boolean).join(":")).filter(Boolean).join("|");
      return Object.freeze({
        kind: "grammar-formula-realization-record",
        id: String(id || `${resolvedFormulaRecordId || "formula"}::${segmentIdentity || "segments"}`),
        formulaRecordId: resolvedFormulaRecordId,
        unit: String(unit || formulaRecord?.unit || ""),
        surface: primarySurface,
        surfaceForms: normalizedSurfaceForms,
        segmentFrames: normalizedSegments,
        orthographyBridge: String(orthographyBridge || "Nawat/Pipil orthography bridge"),
        source: String(source || "structured-segment-result-frames"),
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface"])
      });
    }
    function normalizeGrammarFormulaRecords(value = []) {
      return Object.freeze(normalizeGrammarCanonicalRecordList(value).map(entry => {
        if (!entry || typeof entry !== "object") {
          return null;
        }
        if (entry.kind === "grammar-formula-record" && entry.formulaText) {
          return Object.freeze({
            ...entry
          });
        }
        return buildGrammarFormulaRecord(entry);
      }).filter(Boolean));
    }
    function normalizeGrammarFormulaRealizationRecords(value = []) {
      return Object.freeze(normalizeGrammarCanonicalRecordList(value).map(entry => {
        if (!entry || typeof entry !== "object") {
          return null;
        }
        if (entry.kind === "grammar-formula-realization-record" && Array.isArray(entry.surfaceForms)) {
          return buildGrammarFormulaRealizationRecord({
            ...entry,
            deriveSurfaceFromSegments: entry.deriveSurfaceFromSegments === true
          });
        }
        return buildGrammarFormulaRealizationRecord(entry);
      }).filter(Boolean));
    }
    function getGrammarCanonicalSurfaceFormsFromRealizationRecords(records = []) {
      const forms = [];
      normalizeGrammarCanonicalRecordList(records).forEach(record => {
        if (Array.isArray(record?.surfaceForms)) {
          forms.push(...record.surfaceForms);
        }
        if (record?.surface) {
          forms.push(record.surface);
        }
      });
      return normalizeGrammarSurfaceForms(forms).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getGrammarResultFrameCanonicalSurfaceForms(frameResult = null) {
      if (!frameResult || typeof frameResult !== "object") {
        return [];
      }
      const records = Array.isArray(frameResult.formulaRealizationRecords) && frameResult.formulaRealizationRecords.length ? frameResult.formulaRealizationRecords : frameResult.formulaRealizationRecord ? [frameResult.formulaRealizationRecord] : [];
      return getGrammarCanonicalSurfaceFormsFromRealizationRecords(records);
    }
    function getGrammarCanonicalFormulaSurfacePairsFromResultFrame(frameResult = null) {
      if (!frameResult || typeof frameResult !== "object") {
        return Object.freeze([]);
      }
      const formulaRecords = Array.isArray(frameResult.formulaRecords) && frameResult.formulaRecords.length ? frameResult.formulaRecords : frameResult.formulaRecord ? [frameResult.formulaRecord] : [];
      const formulaById = new Map();
      formulaRecords.forEach(record => {
        if (!record || typeof record !== "object") {
          return;
        }
        const ids = [record.id, record.formula, record.formulaText].map(entry => String(entry || "").trim()).filter(Boolean);
        ids.forEach(id => formulaById.set(id, record));
      });
      const realizationRecords = Array.isArray(frameResult.formulaRealizationRecords) && frameResult.formulaRealizationRecords.length ? frameResult.formulaRealizationRecords : frameResult.formulaRealizationRecord ? [frameResult.formulaRealizationRecord] : [];
      return Object.freeze(realizationRecords.map(record => {
        if (!record || typeof record !== "object") {
          return null;
        }
        const formulaRecord = formulaById.get(String(record.formulaRecordId || "").trim()) || formulaRecords[0] || null;
        const formulaText = String(formulaRecord?.formulaText || formulaRecord?.formula || "").trim();
        const surface = normalizeGrammarSurfaceValue(Array.isArray(record.surfaceForms) ? record.surfaceForms[0] : record.surface);
        if (!formulaText || !surface) {
          return null;
        }
        return Object.freeze({
          surface,
          sourceFormulaEcho: String(formulaRecord?.sourceFrame?.formula || formulaRecord?.sourceFrame?.formulaText || "").trim(),
          andrewsFormulaEcho: formulaText,
          targetFormulaEcho: formulaText,
          conjugatorFormulaEcho: formulaText,
          sourceToTargetFormulaEcho: `${String(formulaRecord?.sourceFrame?.label || formulaRecord?.sourceFrame?.formula || formulaRecord?.sourceFrame?.formulaText || formulaText).trim()} -> ${formulaText}`,
          andrewsToConjugatorFormulaEcho: `${String(formulaRecord?.sourceFrame?.label || formulaRecord?.sourceFrame?.formula || formulaRecord?.sourceFrame?.formulaText || formulaText).trim()} -> ${formulaText}`,
          formulaRecord,
          formulaRealizationRecord: record
        });
      }).filter(Boolean));
    }
    function buildGrammarAuthorityFrame({
      grammarAuthority = "Andrews",
      spellingAuthority = "Nawat/Pipil orthography bridge",
      sourceContext = null,
      sourceEvidence = null,
      evidenceStatus = "",
      andrewsRefs = [],
      orthographyRefs = [],
      supported = null
    } = {}) {
      const resolvedSourceContext = normalizeGrammarFrameObject(sourceContext) || normalizeGrammarFrameObject(sourceEvidence);
      return {
        grammarAuthority: String(grammarAuthority || "Andrews"),
        spellingAuthority: String(spellingAuthority || "Nawat/Pipil orthography bridge"),
        sourceContext: resolvedSourceContext,
        sourceEvidence: resolvedSourceContext,
        evidenceStatus: String(evidenceStatus || ""),
        andrewsRefs: normalizeGrammarFrameArray(andrewsRefs).map(entry => String(entry || "")).filter(Boolean),
        orthographyRefs: normalizeGrammarFrameArray(orthographyRefs).map(entry => String(entry || "")).filter(Boolean),
        supported: supported === null ? null : supported === true
      };
    }
    function buildGrammarRouteContractFrame({
      routeFamily = "",
      routeStage = "",
      sourceContract = null,
      targetContract = null,
      generationAllowed = null,
      blockingDiagnostics = []
    } = {}) {
      return {
        routeFamily: String(routeFamily || ""),
        routeStage: String(routeStage || ""),
        sourceContract: normalizeGrammarFrameObject(sourceContract),
        targetContract: normalizeGrammarFrameObject(targetContract),
        generationAllowed: generationAllowed === null ? null : generationAllowed === true,
        blockingDiagnostics: normalizeGrammarFrameArray(blockingDiagnostics)
      };
    }
    function buildGrammarResultFrame({
      ok = null,
      surface = "",
      surfaceForms = [],
      outputKind = "",
      generationRoute = "",
      sourceInput = "",
      provenance = null,
      continuation = null,
      formulaRecord = null,
      formulaRecords = [],
      formulaRealizationRecord = null,
      formulaRealizationRecords = []
    } = {}) {
      const providedFormulaRecords = Array.isArray(formulaRecords) ? formulaRecords : formulaRecords ? [formulaRecords] : [];
      const providedFormulaRealizationRecords = Array.isArray(formulaRealizationRecords) ? formulaRealizationRecords : formulaRealizationRecords ? [formulaRealizationRecords] : [];
      const normalizedFormulaRecords = normalizeGrammarFormulaRecords(providedFormulaRecords.length ? providedFormulaRecords : formulaRecord ? [formulaRecord] : []);
      const normalizedFormulaRealizationRecords = normalizeGrammarFormulaRealizationRecords(providedFormulaRealizationRecords.length ? providedFormulaRealizationRecords : formulaRealizationRecord ? [formulaRealizationRecord] : []);
      const canonicalSurfaceForms = getGrammarCanonicalSurfaceFormsFromRealizationRecords(normalizedFormulaRealizationRecords);
      const resolvedSurfaceForms = canonicalSurfaceForms.length ? canonicalSurfaceForms : normalizeGrammarSurfaceForms(surfaceForms);
      const normalizedSurface = normalizeGrammarSurfaceValue(surface || resolvedSurfaceForms[0]);
      return {
        ok: ok === null ? null : ok === true,
        surface: normalizedSurface,
        surfaceForms: resolvedSurfaceForms,
        outputKind: String(outputKind || ""),
        generationRoute: String(generationRoute || ""),
        sourceInput: String(sourceInput || ""),
        provenance: normalizeGrammarFrameObject(provenance),
        continuation: normalizeGrammarFrameObject(continuation),
        formulaRecord: normalizedFormulaRecords[0] || null,
        formulaRecords: normalizedFormulaRecords,
        formulaRealizationRecord: normalizedFormulaRealizationRecords[0] || null,
        formulaRealizationRecords: normalizedFormulaRealizationRecords
      };
    }
    function buildGrammarDiagnosticFrame({
      diagnostics = [],
      status = "",
      blockers = []
    } = {}) {
      return {
        status: String(status || ""),
        diagnostics: normalizeGrammarFrameArray(diagnostics),
        blockers: normalizeGrammarFrameArray(blockers)
      };
    }
    function buildGrammarFrame(overrides = {}) {
      const source = overrides && typeof overrides === "object" ? overrides : {};
      const frame = {
        version: GRAMMAR_FRAME_VERSION,
        layerOrder: [...GRAMMAR_FRAME_LAYER_ORDER]
      };
      GRAMMAR_FRAME_KEYS.forEach(key => {
        frame[key] = normalizeGrammarFrameObject(source[key]);
      });
      return frame;
    }
    function splitGrammarResultContractSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeGrammarSurfaceValue(entry)).filter(Boolean);
    }
    function getGrammarResultContractSurfaceForms({
      output = null,
      frameResult = null
    } = {}) {
      const hasResultFrame = Boolean(frameResult);
      const canonicalForms = getGrammarResultFrameCanonicalSurfaceForms(frameResult);
      if (canonicalForms.length) {
        return canonicalForms;
      }
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.map(entry => normalizeGrammarSurfaceValue(entry)).filter(entry => entry && !entry.includes("/")).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(output?.surfaceForms)) {
        forms.push(...output.surfaceForms);
      }
      if (!hasResultFrame && output?.surface) {
        forms.push(output.surface);
      }
      if (!hasResultFrame && output?.result) {
        forms.push(output.result);
      }
      return forms.flatMap(entry => splitGrammarResultContractSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getGrammarMetadataContractFrame(record = null, options = {}) {
      const optionFrame = options?.grammarFrame && typeof options.grammarFrame === "object" ? options.grammarFrame : options?.frames && typeof options.frames === "object" ? options.frames : null;
      const recordFrame = record?.grammarFrame && typeof record.grammarFrame === "object" ? record.grammarFrame : record?.frames && typeof record.frames === "object" ? record.frames : null;
      return optionFrame || recordFrame || null;
    }
    function getGrammarMetadataContractResultFrame(record = null, options = {}) {
      const grammarFrame = getGrammarMetadataContractFrame(record, options);
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function getGrammarMetadataContractSurfaceForms(record = null, options = {}) {
      const node = record && typeof record === "object" ? record : {};
      const resultFrame = getGrammarMetadataContractResultFrame(node, options);
      const hasResultFrame = Boolean(resultFrame);
      const canonicalForms = getGrammarResultFrameCanonicalSurfaceForms(resultFrame);
      if (canonicalForms.length) {
        return canonicalForms;
      }
      const forms = [];
      if (Array.isArray(resultFrame?.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
      }
      if (resultFrame?.surface) {
        forms.push(resultFrame.surface);
      }
      if (hasResultFrame) {
        return forms.map(entry => normalizeGrammarSurfaceValue(entry)).filter(entry => entry && !entry.includes("/")).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(options?.surfaceForms)) {
        forms.push(...options.surfaceForms);
      }
      if (!hasResultFrame && options?.surface) {
        forms.push(options.surface);
      }
      if (!hasResultFrame && Array.isArray(node.surfaceForms)) {
        forms.push(...node.surfaceForms);
      }
      if (!hasResultFrame && Array.isArray(node.output?.surfaceForms)) {
        forms.push(...node.output.surfaceForms);
      }
      if (!hasResultFrame && node.surface) {
        forms.push(node.surface);
      }
      if (!hasResultFrame && node.output?.surface) {
        forms.push(node.output.surface);
      }
      const normalizedForms = forms.flatMap(entry => splitGrammarResultContractSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      if (normalizedForms.length) {
        return normalizedForms;
      }
      return hasResultFrame ? [] : splitGrammarResultContractSurfaceText(node.result || "");
    }
    function buildGrammarResultContract({
      result = null,
      grammarFrame = null
    } = {}) {
      const output = result && typeof result === "object" ? result : {};
      const frames = grammarFrame && typeof grammarFrame === "object" ? grammarFrame : output.grammarFrame && typeof output.grammarFrame === "object" ? output.grammarFrame : output.frames && typeof output.frames === "object" ? output.frames : null;
      const frameResult = frames?.resultFrame && typeof frames.resultFrame === "object" ? frames.resultFrame : null;
      const surfaceForms = getGrammarResultContractSurfaceForms({
        output,
        frameResult
      });
      const frameSurface = normalizeGrammarSurfaceValue(frameResult?.surface || "");
      const surface = normalizeGrammarSurfaceValue(surfaceForms[0] || (frameSurface && !frameSurface.includes("/") ? frameSurface : "") || (!frameResult ? output.surface || output.result : "") || "");
      const frameOk = frameResult && typeof frameResult.ok === "boolean" ? frameResult.ok : null;
      const ok = frameOk === null ? Boolean(surface || surfaceForms.length) && output.error !== true && output.supported !== false : frameOk;
      const diagnostics = [...(Array.isArray(output.diagnostics) ? output.diagnostics : []), ...(Array.isArray(frames?.diagnosticFrame?.diagnostics) ? frames.diagnosticFrame.diagnostics : [])].filter((entry, index, list) => {
        if (!entry || typeof entry !== "object") {
          return false;
        }
        const key = `${entry.id || entry.code || ""}|${entry.severity || ""}|${entry.message || ""}`;
        return list.findIndex(candidate => candidate && typeof candidate === "object" && `${candidate.id || candidate.code || ""}|${candidate.severity || ""}|${candidate.message || ""}` === key) === index;
      });
      return {
        ok,
        surface,
        surfaceForms,
        frames,
        diagnostics
      };
    }
    function getGrammarDiagnosticLayerContract(entry = null) {
      const diagnosticId = typeof entry === "string" ? entry : String(entry?.id || entry?.code || entry?.message || "");
      const id = String(diagnosticId || "").trim();
      if (!id) {
        return {
          failedLayer: "",
          contractLayer: ""
        };
      }
      const layerId = id.replace(/^(?:nuclear-clause-surface|generate-word)-/i, "");
      if (/authority|evidence|unconfirmed|false-positive|not-evidence|needs-.*evidence|source-evidence|source-gated/i.test(layerId)) {
        return {
          failedLayer: "authority",
          contractLayer: "authorityFrame"
        };
      }
      if (/orthography|spelling|letter|classical|nawat-letter|nawat-spelling|phonolog|syllable/i.test(layerId)) {
        return {
          failedLayer: "orthography",
          contractLayer: "orthographyFrame"
        };
      }
      if (/surface|output|result|no-output|empty|render|display|form/i.test(layerId)) {
        return {
          failedLayer: "output",
          contractLayer: "resultFrame"
        };
      }
      if (/agreement|participant|subject|object|possessor|possessive|valence|state|person|number|animate|nonanimate/i.test(layerId)) {
        return {
          failedLayer: "agreement",
          contractLayer: "participantFrame"
        };
      }
      if (/tense|mode|modal|potential|potencial|indicative|optative|admonitive|preterit|perfective|future|present|past/i.test(layerId)) {
        return {
          failedLayer: "inflection",
          contractLayer: "inflectionFrame"
        };
      }
      if (/stem|root|source|input|predicate|noun-stem|verbstem|verb-stem|matrix|embed|compound|incorporated/i.test(layerId)) {
        return {
          failedLayer: "stem",
          contractLayer: "stemFrame"
        };
      }
      if (/nuclear|clause|nnc|vnc/i.test(layerId)) {
        return {
          failedLayer: "nuclear-clause",
          contractLayer: "nuclearClauseFrame"
        };
      }
      if (/boundary|suffix|prefix|carrier|connector/i.test(layerId)) {
        return {
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame"
        };
      }
      if (/route-blocked|unsupported|not-allowed|requires|missing|route|generation|contract|class|kind|option|relation|order|marked|unmarked/i.test(layerId)) {
        return {
          failedLayer: "route",
          contractLayer: "routeContract"
        };
      }
      return {
        failedLayer: "",
        contractLayer: ""
      };
    }
    function normalizeGrammarDiagnosticContractEntry(entry = null) {
      if (!entry) {
        return null;
      }
      if (typeof entry === "string") {
        const id = entry.trim();
        if (!id) {
          return null;
        }
        const layerContract = getGrammarDiagnosticLayerContract(id);
        return {
          id,
          severity: "diagnostic",
          message: "",
          ...(layerContract.failedLayer ? layerContract : {})
        };
      }
      if (typeof entry !== "object") {
        return null;
      }
      const id = String(entry.id || entry.code || "").trim();
      const message = String(entry.message || "").trim();
      if (!id && !message) {
        return null;
      }
      const layerContract = getGrammarDiagnosticLayerContract({
        ...entry,
        id: id || message,
        message
      });
      const normalized = {
        ...entry,
        id: id || message,
        severity: String(entry.severity || "diagnostic"),
        message
      };
      if (!String(normalized.failedLayer || "").trim() && layerContract.failedLayer) {
        normalized.failedLayer = layerContract.failedLayer;
      }
      if (!String(normalized.contractLayer || "").trim() && layerContract.contractLayer) {
        normalized.contractLayer = layerContract.contractLayer;
      }
      return normalized;
    }
    function normalizeGrammarDiagnosticContractEntries(entries = []) {
      const normalized = normalizeGrammarFrameArray(entries).map(entry => normalizeGrammarDiagnosticContractEntry(entry)).filter(Boolean);
      return normalized.filter((entry, index, list) => {
        const key = `${entry.id || ""}|${entry.severity || ""}|${entry.message || ""}`;
        return list.findIndex(candidate => `${candidate.id || ""}|${candidate.severity || ""}|${candidate.message || ""}` === key) === index;
      });
    }
    function buildGrammarAstContractFrame(ast = null, options = {}) {
      if (typeof buildGrammarFrame !== "function") {
        return null;
      }
      const node = ast && typeof ast === "object" ? ast : {};
      const diagnostics = normalizeGrammarDiagnosticContractEntries(node.diagnostics);
      const surface = String(node.surface || "").trim();
      const supported = node.supported === true;
      const structuralSource = String(options.structuralSource || node.structuralSource || "").trim();
      const lessonRefs = normalizeGrammarFrameArray(options.andrewsRefs || node.andrewsRefs).map(entry => String(entry || "").trim()).filter(Boolean);
      const lessons = normalizeGrammarFrameArray(options.lessons || node.lessons || (node.lesson ? [node.lesson] : [])).map(entry => String(entry || "").trim()).filter(Boolean);
      const resolvedRefs = lessonRefs.length ? lessonRefs : structuralSource ? [structuralSource] : lessons.map(lesson => `Andrews Lesson ${lesson}`);
      const astKind = String(options.astKind || node.kind || "composition-ast");
      const authorityFrame = typeof buildGrammarAuthorityFrame === "function" ? buildGrammarAuthorityFrame({
        evidenceStatus: supported ? "composition-ast" : diagnostics.length ? "blocked" : "pending",
        andrewsRefs: resolvedRefs,
        supported
      }) : null;
      const routeContract = typeof buildGrammarRouteContractFrame === "function" ? buildGrammarRouteContractFrame({
        routeFamily: astKind,
        routeStage: "compose-ast",
        sourceContract: {
          unitKind: String(options.unitKind || "clause-unit"),
          targetAuthority: String(node.targetAuthority || ""),
          evidenceSource: String(node.evidenceSource || "")
        },
        targetContract: {
          astKind,
          newWordGenerationAllowed: node.newWordGenerationAllowed === true,
          generationAllowed: node.generationAllowed === true
        },
        generationAllowed: false,
        blockingDiagnostics: supported ? [] : diagnostics
      }) : null;
      const resultFrame = typeof buildGrammarResultFrame === "function" ? buildGrammarResultFrame({
        ok: supported,
        surface,
        surfaceForms: surface ? [surface] : [],
        outputKind: astKind,
        generationRoute: "composition-ast",
        sourceInput: String(options.sourceInput || "")
      }) : null;
      const diagnosticFrame = typeof buildGrammarDiagnosticFrame === "function" ? buildGrammarDiagnosticFrame({
        status: supported ? "composed" : diagnostics.length ? "blocked" : "pending",
        diagnostics,
        blockers: supported ? [] : diagnostics
      }) : null;
      return buildGrammarFrame({
        authorityFrame,
        unitFrame: {
          unitKind: String(options.unitKind || "clause-unit"),
          outputKind: astKind,
          generationRoute: "composition-ast"
        },
        orthographyFrame: {
          surface,
          surfaceForms: surface ? [surface] : [],
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: null,
        stemFrame: null,
        nuclearClauseFrame: null,
        participantFrame: null,
        inflectionFrame: null,
        routeContract,
        astFrame: node,
        resultFrame,
        diagnosticFrame
      });
    }
    function attachGrammarAstContract(ast = null, options = {}) {
      const node = ast && typeof ast === "object" ? ast : {};
      const grammarFrame = buildGrammarAstContractFrame(node, options);
      const resultContract = buildGrammarResultContract({
        result: {
          ...node,
          diagnostics: normalizeGrammarDiagnosticContractEntries(node.diagnostics)
        },
        grammarFrame
      });
      return {
        ...node,
        grammarFrame,
        ok: resultContract.ok,
        surface: resultContract.surface,
        frames: resultContract.frames,
        contractDiagnostics: resultContract.diagnostics
      };
    }
    function buildGrammarMetadataContractFrame(record = null, options = {}) {
      const node = record && typeof record === "object" ? record : {};
      const inboundResultFrame = getGrammarMetadataContractResultFrame(node, options);
      const hasInboundResultFrame = Boolean(inboundResultFrame);
      const diagnostics = normalizeGrammarDiagnosticContractEntries([...(Array.isArray(node.diagnostics) ? node.diagnostics : []), ...(Array.isArray(options.diagnostics) ? options.diagnostics : [])]);
      const supported = options.supported !== undefined ? options.supported === true : node.supported === true || node.confirmed === true;
      const generationAllowed = options.generationAllowed !== undefined ? options.generationAllowed === true : node.generationAllowed === true;
      const structuralSource = String(options.structuralSource || node.structuralSource || "").trim();
      const lessonRefs = normalizeGrammarFrameArray(options.andrewsRefs || node.andrewsRefs).map(entry => String(entry || "").trim()).filter(Boolean);
      const lessons = normalizeGrammarFrameArray(options.lessons || node.lessons || (node.lesson ? [node.lesson] : [])).map(entry => String(entry || "").trim()).filter(Boolean);
      const appendices = normalizeGrammarFrameArray(options.appendices || node.appendices || (node.appendix ? [node.appendix] : [])).map(entry => String(entry || "").trim()).filter(Boolean);
      const resolvedRefs = lessonRefs.length ? lessonRefs : [...(structuralSource ? [structuralSource] : lessons.map(lesson => `Andrews Lesson ${lesson}`)), ...appendices.map(appendix => `Andrews Appendix ${appendix}`)];
      const surfaceForms = getGrammarMetadataContractSurfaceForms(node, options);
      const surface = normalizeGrammarSurfaceValue(surfaceForms[0] || "");
      const metadataKind = String(options.metadataKind || node.kind || "metadata").trim();
      const unitKind = String(options.unitKind || node.unitKind || "diagnostic-unit").trim();
      const routeStage = String(options.routeStage || (generationAllowed ? "execute" : "classify-boundary")).trim();
      const routeFamily = String(options.routeFamily || metadataKind).trim();
      const primitiveSource = typeof node.source === "string" || typeof node.source === "number" || typeof node.source === "boolean" ? node.source : "";
      const primitiveTarget = typeof node.target === "string" || typeof node.target === "number" || typeof node.target === "boolean" ? node.target : "";
      const fallbackSourceInput = String(options.sourceInput || node.candidate || node.sourceName || node.nameSource || node.source?.raw || primitiveSource || primitiveTarget || "").trim();
      const sourceInput = hasInboundResultFrame ? normalizeGrammarSurfaceValue(inboundResultFrame.sourceInput || surface || "") : fallbackSourceInput;
      const authorityFrame = buildGrammarAuthorityFrame({
        sourceEvidence: {
          kind: metadataKind,
          targetAuthority: String(node.targetAuthority || options.targetAuthority || ""),
          evidenceSource: String(node.evidenceSource || options.evidenceSource || ""),
          confirmedExamples: normalizeGrammarFrameArray(node.confirmedExamples)
        },
        evidenceStatus: String(options.evidenceStatus || node.status || (supported ? "metadata-supported" : "diagnostic-only")),
        andrewsRefs: resolvedRefs,
        orthographyRefs: normalizeGrammarFrameArray(options.orthographyRefs || node.orthographyRefs),
        supported
      });
      const providedSourceContract = normalizeGrammarFrameObject(options.sourceContract);
      const routeSourceContract = providedSourceContract ? {
        ...providedSourceContract,
        sourceInput: hasInboundResultFrame ? sourceInput : String(providedSourceContract.sourceInput || sourceInput || ""),
        sourceSurface: hasInboundResultFrame ? sourceInput : String(providedSourceContract.sourceSurface || sourceInput || "")
      } : {
        unitKind,
        metadataKind,
        sourceInput,
        evidenceSource: String(node.evidenceSource || "")
      };
      const routeContract = buildGrammarRouteContractFrame({
        routeFamily,
        routeStage,
        sourceContract: routeSourceContract,
        targetContract: normalizeGrammarFrameObject(options.targetContract) || {
          metadataKind,
          generationAllowed,
          newWordGenerationAllowed: generationAllowed,
          targetAuthority: String(node.targetAuthority || options.targetAuthority || "")
        },
        generationAllowed,
        blockingDiagnostics: generationAllowed ? [] : diagnostics
      });
      const resultFrame = buildGrammarResultFrame({
        ok: supported,
        surface,
        surfaceForms,
        outputKind: metadataKind,
        generationRoute: routeStage,
        sourceInput,
        provenance: normalizeGrammarFrameObject(options.provenance),
        continuation: normalizeGrammarFrameObject(options.continuation),
        formulaRecord: options.formulaRecord || node.formulaRecord || inboundResultFrame?.formulaRecord || null,
        formulaRecords: options.formulaRecords || node.formulaRecords || inboundResultFrame?.formulaRecords || [],
        formulaRealizationRecord: options.formulaRealizationRecord || node.formulaRealizationRecord || inboundResultFrame?.formulaRealizationRecord || null,
        formulaRealizationRecords: options.formulaRealizationRecords || node.formulaRealizationRecords || inboundResultFrame?.formulaRealizationRecords || []
      });
      const diagnosticFrame = buildGrammarDiagnosticFrame({
        status: String(options.diagnosticStatus || node.status || (supported ? "classified" : "diagnostic-only")),
        diagnostics,
        blockers: generationAllowed ? [] : diagnostics
      });
      const providedOrthographyFrame = normalizeGrammarFrameObject(options.orthographyFrame);
      const orthographyFrame = providedOrthographyFrame ? {
        ...providedOrthographyFrame,
        surface: hasInboundResultFrame ? surface : normalizeGrammarSurfaceValue(providedOrthographyFrame.surface || surface),
        surfaceForms: hasInboundResultFrame ? surfaceForms : normalizeGrammarSurfaceForms(providedOrthographyFrame.surfaceForms || surfaceForms)
      } : {
        surface,
        surfaceForms,
        spellingAuthority: "Nawat/Pipil orthography bridge",
        noClassicalSurfaceImport: true
      };
      return buildGrammarFrame({
        authorityFrame,
        orthographyFrame,
        unitFrame: normalizeGrammarFrameObject(options.unitFrame) || {
          unitKind,
          outputKind: metadataKind,
          generationRoute: routeStage
        },
        morphBoundaryFrame: Object.prototype.hasOwnProperty.call(options, "morphBoundaryFrame") ? normalizeGrammarFrameObject(options.morphBoundaryFrame) : normalizeGrammarFrameObject(node.boundary || (metadataKind.includes("boundary") ? node : null)),
        stemFrame: normalizeGrammarFrameObject(options.stemFrame),
        nuclearClauseFrame: normalizeGrammarFrameObject(options.nuclearClauseFrame),
        participantFrame: normalizeGrammarFrameObject(options.participantFrame),
        inflectionFrame: normalizeGrammarFrameObject(options.inflectionFrame),
        routeContract,
        astFrame: normalizeGrammarFrameObject(options.astFrame),
        resultFrame,
        diagnosticFrame
      });
    }
    function attachGrammarMetadataContract(record = null, options = {}) {
      const node = record && typeof record === "object" ? record : {};
      const grammarFrame = buildGrammarMetadataContractFrame(node, options);
      const resultContract = buildGrammarResultContract({
        result: {
          ...node,
          diagnostics: normalizeGrammarDiagnosticContractEntries(node.diagnostics)
        },
        grammarFrame
      });
      const enumerable = options.enumerable === true;
      const output = {
        ...node
      };
      const formulaSurfaceFields = buildGrammarContractFormulaSurfacePairFields({
        node,
        options,
        grammarFrame,
        resultContract
      });
      const hasOwnSurfaceForms = Object.prototype.hasOwnProperty.call(node, "surfaceForms");
      const surfaceFormsEnumerable = Object.prototype.propertyIsEnumerable.call(node, "surfaceForms");
      Object.defineProperties(output, {
        grammarFrame: {
          configurable: true,
          enumerable,
          writable: true,
          value: grammarFrame
        },
        ok: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.ok
        },
        surface: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.surface
        },
        frames: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.frames
        },
        contractDiagnostics: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.diagnostics
        },
        ...(hasOwnSurfaceForms ? {
          surfaceForms: {
            configurable: true,
            enumerable: surfaceFormsEnumerable,
            writable: true,
            value: resultContract.surfaceForms
          }
        } : {}),
        ...(formulaSurfaceFields.formulaSurfacePairs.length ? {
          formulaSurfacePairs: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: formulaSurfaceFields.formulaSurfacePairs
          },
          targetFormulaEchoes: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: formulaSurfaceFields.targetFormulaEchoes
          },
          sourceFormulaEcho: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: formulaSurfaceFields.sourceFormulaEcho
          },
          sourceFormulaEchoes: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: formulaSurfaceFields.sourceFormulaEchoes
          },
          andrewsFormulaEcho: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: formulaSurfaceFields.andrewsFormulaEcho
          },
          andrewsFormulaEchoes: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: formulaSurfaceFields.andrewsFormulaEchoes
          },
          conjugatorFormulaEcho: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: formulaSurfaceFields.conjugatorFormulaEcho
          },
          conjugatorFormulaEchoes: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: formulaSurfaceFields.conjugatorFormulaEchoes
          },
          sourceToTargetFormulaEcho: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: formulaSurfaceFields.sourceToTargetFormulaEcho
          },
          andrewsToConjugatorFormulaEcho: {
            configurable: true,
            enumerable: true,
            writable: true,
            value: formulaSurfaceFields.andrewsToConjugatorFormulaEcho
          }
        } : {})
      });
      return output;
    }
    function buildGrammarContractFormulaSurfacePairFields({
      node = null,
      options = null,
      grammarFrame = null,
      resultContract = null
    } = {}) {
      const source = node && typeof node === "object" ? node : {};
      const canonicalPairs = getGrammarCanonicalFormulaSurfacePairsFromResultFrame(grammarFrame?.resultFrame);
      if (canonicalPairs.length) {
        return {
          formulaSurfacePairs: canonicalPairs,
          sourceFormulaEcho: canonicalPairs.map(entry => entry.sourceFormulaEcho).filter(Boolean)[0] || "",
          sourceFormulaEchoes: Object.freeze(Array.from(new Set(canonicalPairs.map(entry => entry.sourceFormulaEcho).filter(Boolean)))),
          andrewsFormulaEcho: canonicalPairs.map(entry => entry.andrewsFormulaEcho).filter(Boolean)[0] || "",
          andrewsFormulaEchoes: Object.freeze(Array.from(new Set(canonicalPairs.map(entry => entry.andrewsFormulaEcho).filter(Boolean)))),
          targetFormulaEchoes: Object.freeze(canonicalPairs.map(entry => entry.targetFormulaEcho)),
          conjugatorFormulaEcho: canonicalPairs.map(entry => entry.conjugatorFormulaEcho).filter(Boolean)[0] || "",
          conjugatorFormulaEchoes: Object.freeze(Array.from(new Set(canonicalPairs.map(entry => entry.conjugatorFormulaEcho).filter(Boolean)))),
          sourceToTargetFormulaEcho: canonicalPairs.map(entry => entry.sourceToTargetFormulaEcho).filter(Boolean).join(" | "),
          andrewsToConjugatorFormulaEcho: canonicalPairs.map(entry => entry.andrewsToConjugatorFormulaEcho).filter(Boolean).join(" | ")
        };
      }
      if (Array.isArray(source.formulaSurfacePairs) && source.formulaSurfacePairs.length) {
        const pairs = source.formulaSurfacePairs.map(entry => entry && typeof entry === "object" ? {
          surface: String(entry.surface || "").trim(),
          sourceFormulaEcho: String(entry.sourceFormulaEcho || "").trim(),
          andrewsFormulaEcho: String(entry.andrewsFormulaEcho || entry.sourceFormulaEcho || "").trim(),
          targetFormulaEcho: String(entry.targetFormulaEcho || "").trim(),
          conjugatorFormulaEcho: String(entry.conjugatorFormulaEcho || entry.targetFormulaEcho || "").trim(),
          sourceToTargetFormulaEcho: String(entry.sourceToTargetFormulaEcho || "").trim(),
          andrewsToConjugatorFormulaEcho: String(entry.andrewsToConjugatorFormulaEcho || entry.sourceToTargetFormulaEcho || "").trim()
        } : null).filter(entry => entry && entry.surface && entry.targetFormulaEcho).map(entry => Object.freeze(entry));
        return {
          formulaSurfacePairs: Object.freeze(pairs),
          sourceFormulaEcho: pairs.map(entry => entry.sourceFormulaEcho).filter(Boolean)[0] || "",
          sourceFormulaEchoes: Object.freeze(Array.from(new Set(pairs.map(entry => entry.sourceFormulaEcho).filter(Boolean)))),
          andrewsFormulaEcho: pairs.map(entry => entry.andrewsFormulaEcho).filter(Boolean)[0] || "",
          andrewsFormulaEchoes: Object.freeze(Array.from(new Set(pairs.map(entry => entry.andrewsFormulaEcho).filter(Boolean)))),
          targetFormulaEchoes: Object.freeze(pairs.map(entry => entry.targetFormulaEcho)),
          conjugatorFormulaEcho: pairs.map(entry => entry.conjugatorFormulaEcho).filter(Boolean)[0] || "",
          conjugatorFormulaEchoes: Object.freeze(Array.from(new Set(pairs.map(entry => entry.conjugatorFormulaEcho).filter(Boolean)))),
          sourceToTargetFormulaEcho: pairs.map(entry => entry.sourceToTargetFormulaEcho).filter(Boolean).join(" | "),
          andrewsToConjugatorFormulaEcho: pairs.map(entry => entry.andrewsToConjugatorFormulaEcho).filter(Boolean).join(" | ")
        };
      }
      const targetFormulaEcho = resolveGrammarContractTargetFormulaEcho(source, options, grammarFrame);
      if (!targetFormulaEcho) {
        return {
          formulaSurfacePairs: Object.freeze([]),
          sourceFormulaEcho: "",
          sourceFormulaEchoes: Object.freeze([]),
          andrewsFormulaEcho: "",
          andrewsFormulaEchoes: Object.freeze([]),
          targetFormulaEchoes: Object.freeze([]),
          conjugatorFormulaEcho: "",
          conjugatorFormulaEchoes: Object.freeze([]),
          sourceToTargetFormulaEcho: "",
          andrewsToConjugatorFormulaEcho: ""
        };
      }
      const surfaces = normalizeGrammarContractFormulaSurfaceForms(resultContract?.surfaceForms || source.surfaceForms || source.surface || source.result);
      const sourceLabel = resolveGrammarContractFormulaSourceLabel(source, options, grammarFrame);
      const seen = new Set();
      const pairs = surfaces.filter(surface => {
        if (!surface || seen.has(surface)) {
          return false;
        }
        seen.add(surface);
        return true;
      }).map(surface => Object.freeze({
        surface,
        sourceFormulaEcho: sourceLabel,
        andrewsFormulaEcho: sourceLabel,
        targetFormulaEcho,
        conjugatorFormulaEcho: targetFormulaEcho,
        sourceToTargetFormulaEcho: `${sourceLabel} -> ${targetFormulaEcho}`,
        andrewsToConjugatorFormulaEcho: `${sourceLabel} -> ${targetFormulaEcho}`
      }));
      return {
        formulaSurfacePairs: Object.freeze(pairs),
        sourceFormulaEcho: pairs.map(entry => entry.sourceFormulaEcho).filter(Boolean)[0] || "",
        sourceFormulaEchoes: Object.freeze(Array.from(new Set(pairs.map(entry => entry.sourceFormulaEcho).filter(Boolean)))),
        andrewsFormulaEcho: pairs.map(entry => entry.andrewsFormulaEcho).filter(Boolean)[0] || "",
        andrewsFormulaEchoes: Object.freeze(Array.from(new Set(pairs.map(entry => entry.andrewsFormulaEcho).filter(Boolean)))),
        targetFormulaEchoes: Object.freeze(pairs.map(entry => entry.targetFormulaEcho)),
        conjugatorFormulaEcho: pairs.map(entry => entry.conjugatorFormulaEcho).filter(Boolean)[0] || "",
        conjugatorFormulaEchoes: Object.freeze(Array.from(new Set(pairs.map(entry => entry.conjugatorFormulaEcho).filter(Boolean)))),
        sourceToTargetFormulaEcho: pairs.map(entry => entry.sourceToTargetFormulaEcho).join(" | "),
        andrewsToConjugatorFormulaEcho: pairs.map(entry => entry.andrewsToConjugatorFormulaEcho).join(" | ")
      };
    }
    function normalizeGrammarContractFormulaSurfaceForms(value = null) {
      const raw = Array.isArray(value) ? value : [value];
      return raw.flatMap(entry => String(entry || "").split(/\s*\/\s*/)).map(entry => entry.trim()).filter(Boolean);
    }
    function resolveGrammarContractTargetFormulaEcho(node = null, options = null, grammarFrame = null) {
      const source = node && typeof node === "object" ? node : {};
      const opts = options && typeof options === "object" ? options : {};
      return String(source.targetFormulaEcho || source.formulaEcho || source.structuralFormula || opts.targetFormulaEcho || opts.formulaEcho || opts.nuclearClauseFrame?.formulaEcho || opts.nuclearClauseFrame?.structuralFormula || grammarFrame?.nuclearClauseFrame?.formulaEcho || grammarFrame?.nuclearClauseFrame?.structuralFormula || grammarFrame?.resultFrame?.formulaEcho || "").trim();
    }
    function resolveGrammarContractFormulaSourceLabel(node = null, options = null, grammarFrame = null) {
      const source = node && typeof node === "object" ? node : {};
      const opts = options && typeof options === "object" ? options : {};
      const routeFamily = String(opts.routeFamily || grammarFrame?.routeContract?.routeFamily || source.generationRoute || source.routeFamily || "grammar").trim();
      const sourceStem = String(source.sourceStem || source.sourceCore || source.sourcePredicate || source.sourceInput || opts.sourceInput || source.stem || source.targetStem || source.surface || source.result || "SOURCE").trim() || "SOURCE";
      if (routeFamily === "nominalization") {
        return `CNV(${sourceStem})`;
      }
      if (routeFamily.endsWith("-nnc") || routeFamily === "relational-nnc" || routeFamily === "numeral-nnc") {
        return `NNC(${sourceStem})`;
      }
      return `${routeFamily.toUpperCase()}(${sourceStem})`;
    }

    const api = {};
    Object.defineProperty(api, "GRAMMAR_FRAME_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_FRAME_VERSION; },
        set(value) { GRAMMAR_FRAME_VERSION = value; },
    });
    Object.defineProperty(api, "GRAMMAR_FRAME_KEYS", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_FRAME_KEYS; },
        set(value) { GRAMMAR_FRAME_KEYS = value; },
    });
    Object.defineProperty(api, "GRAMMAR_FRAME_LAYER_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_FRAME_LAYER_ORDER; },
        set(value) { GRAMMAR_FRAME_LAYER_ORDER = value; },
    });
    Object.defineProperty(api, "GRAMMAR_NO_OUTPUT_SURFACE_MARKERS", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_NO_OUTPUT_SURFACE_MARKERS; },
        set(value) { GRAMMAR_NO_OUTPUT_SURFACE_MARKERS = value; },
    });
    Object.defineProperty(api, "ANDREWS_FORMULA_SLOT_SCHEMA_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_FORMULA_SLOT_SCHEMA_VERSION; },
        set(value) { ANDREWS_FORMULA_SLOT_SCHEMA_VERSION = value; },
    });
    Object.defineProperty(api, "ANDREWS_LOGIC_AUTHORITY_POLICY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_LOGIC_AUTHORITY_POLICY_VERSION; },
        set(value) { ANDREWS_LOGIC_AUTHORITY_POLICY_VERSION = value; },
    });
    Object.defineProperty(api, "ANDREWS_LOGIC_AUTHORITY_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_LOGIC_AUTHORITY_POLICY; },
        set(value) { ANDREWS_LOGIC_AUTHORITY_POLICY = value; },
    });
    Object.defineProperty(api, "ANDREWS_CNV_TENSE_LOGIC_AUTHORITY_BY_TENSE", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_CNV_TENSE_LOGIC_AUTHORITY_BY_TENSE; },
        set(value) { ANDREWS_CNV_TENSE_LOGIC_AUTHORITY_BY_TENSE = value; },
    });
    Object.defineProperty(api, "ANDREWS_CNV_NAWAT_EXTENSION_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_CNV_NAWAT_EXTENSION_TENSES; },
        set(value) { ANDREWS_CNV_NAWAT_EXTENSION_TENSES = value; },
    });
    api.freezeAndrewsFormulaSlot = freezeAndrewsFormulaSlot;
    api.freezeAndrewsFormulaSourceRequirement = freezeAndrewsFormulaSourceRequirement;
    api.freezeAndrewsFormulaGenerationContract = freezeAndrewsFormulaGenerationContract;
    api.freezeAndrewsFormulaSlotSchema = freezeAndrewsFormulaSlotSchema;
    Object.defineProperty(api, "ANDREWS_FORMULA_SLOT_SCHEMAS", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_FORMULA_SLOT_SCHEMAS; },
        set(value) { ANDREWS_FORMULA_SLOT_SCHEMAS = value; },
    });
    api.getAndrewsLogicAuthorityPolicy = getAndrewsLogicAuthorityPolicy;
    api.isAndrewsLogicGenerationAuthorityEnabled = isAndrewsLogicGenerationAuthorityEnabled;
    api.cloneAndrewsCnvTenseLogicAuthorityFrame = cloneAndrewsCnvTenseLogicAuthorityFrame;
    api.getAndrewsCnvTenseLogicAuthorityFrame = getAndrewsCnvTenseLogicAuthorityFrame;
    api.getAndrewsCnvTenseLogicGenerationGateFrame = getAndrewsCnvTenseLogicGenerationGateFrame;
    api.getAndrewsCnvTenseLogicGenerationGateValue = getAndrewsCnvTenseLogicGenerationGateValue;
    api.isAndrewsCnvTenseLogicGenerationAllowed = isAndrewsCnvTenseLogicGenerationAllowed;
    api.cloneAndrewsFormulaSlotDefinition = cloneAndrewsFormulaSlotDefinition;
    api.cloneAndrewsFormulaSlotSchema = cloneAndrewsFormulaSlotSchema;
    api.getAndrewsFormulaSlotSchema = getAndrewsFormulaSlotSchema;
    api.getAndrewsFormulaSlotSchemas = getAndrewsFormulaSlotSchemas;
    api.resolveAndrewsFormulaSlotSchema = resolveAndrewsFormulaSlotSchema;
    api.getAndrewsFormulaSlotDefinition = getAndrewsFormulaSlotDefinition;
    api.getAndrewsFormulaGenerationContract = getAndrewsFormulaGenerationContract;
    api.getAndrewsFormulaSourceRequirements = getAndrewsFormulaSourceRequirements;
    api.renderAndrewsFormulaSlotTemplate = renderAndrewsFormulaSlotTemplate;
    api.isAndrewsFormulaSlotOmitted = isAndrewsFormulaSlotOmitted;
    api.renderAndrewsFormulaTemplate = renderAndrewsFormulaTemplate;
    api.getAndrewsFormulaEchoSlotValue = getAndrewsFormulaEchoSlotValue;
    api.renderAndrewsFormulaEchoFromSchema = renderAndrewsFormulaEchoFromSchema;
    api.normalizeAndrewsFormulaRequirementValue = normalizeAndrewsFormulaRequirementValue;
    api.getAndrewsFormulaSourceRequirementValue = getAndrewsFormulaSourceRequirementValue;
    api.evaluateAndrewsFormulaSourceRequirements = evaluateAndrewsFormulaSourceRequirements;
    api.evaluateAndrewsFormulaGenerationAuthority = evaluateAndrewsFormulaGenerationAuthority;
    api.diagnoseAndrewsFormulaSlotInterpretation = diagnoseAndrewsFormulaSlotInterpretation;
    api.normalizeGrammarFrameObject = normalizeGrammarFrameObject;
    api.normalizeGrammarFrameArray = normalizeGrammarFrameArray;
    api.normalizeGrammarSurfaceValue = normalizeGrammarSurfaceValue;
    api.normalizeGrammarSurfaceForms = normalizeGrammarSurfaceForms;
    api.normalizeGrammarCanonicalRecordList = normalizeGrammarCanonicalRecordList;
    api.normalizeGrammarFormulaSegmentFrame = normalizeGrammarFormulaSegmentFrame;
    api.buildGrammarFormulaRecord = buildGrammarFormulaRecord;
    api.buildGrammarFormulaRealizationRecord = buildGrammarFormulaRealizationRecord;
    api.normalizeGrammarFormulaRecords = normalizeGrammarFormulaRecords;
    api.normalizeGrammarFormulaRealizationRecords = normalizeGrammarFormulaRealizationRecords;
    api.getGrammarCanonicalSurfaceFormsFromRealizationRecords = getGrammarCanonicalSurfaceFormsFromRealizationRecords;
    api.getGrammarResultFrameCanonicalSurfaceForms = getGrammarResultFrameCanonicalSurfaceForms;
    api.getGrammarCanonicalFormulaSurfacePairsFromResultFrame = getGrammarCanonicalFormulaSurfacePairsFromResultFrame;
    api.buildGrammarAuthorityFrame = buildGrammarAuthorityFrame;
    api.buildGrammarRouteContractFrame = buildGrammarRouteContractFrame;
    api.buildGrammarResultFrame = buildGrammarResultFrame;
    api.buildGrammarDiagnosticFrame = buildGrammarDiagnosticFrame;
    api.buildGrammarFrame = buildGrammarFrame;
    api.splitGrammarResultContractSurfaceText = splitGrammarResultContractSurfaceText;
    api.getGrammarResultContractSurfaceForms = getGrammarResultContractSurfaceForms;
    api.getGrammarMetadataContractFrame = getGrammarMetadataContractFrame;
    api.getGrammarMetadataContractResultFrame = getGrammarMetadataContractResultFrame;
    api.getGrammarMetadataContractSurfaceForms = getGrammarMetadataContractSurfaceForms;
    api.buildGrammarResultContract = buildGrammarResultContract;
    api.getGrammarDiagnosticLayerContract = getGrammarDiagnosticLayerContract;
    api.normalizeGrammarDiagnosticContractEntry = normalizeGrammarDiagnosticContractEntry;
    api.normalizeGrammarDiagnosticContractEntries = normalizeGrammarDiagnosticContractEntries;
    api.buildGrammarAstContractFrame = buildGrammarAstContractFrame;
    api.attachGrammarAstContract = attachGrammarAstContract;
    api.buildGrammarMetadataContractFrame = buildGrammarMetadataContractFrame;
    api.attachGrammarMetadataContract = attachGrammarMetadataContract;
    api.buildGrammarContractFormulaSurfacePairFields = buildGrammarContractFormulaSurfacePairFields;
    api.normalizeGrammarContractFormulaSurfaceForms = normalizeGrammarContractFormulaSurfaceForms;
    api.resolveGrammarContractTargetFormulaEcho = resolveGrammarContractTargetFormulaEcho;
    api.resolveGrammarContractFormulaSourceLabel = resolveGrammarContractFormulaSourceLabel;
    return api;
}

export function installGrammarFrameGlobals(targetObject = globalThis) {
    const api = createGrammarFrameModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
