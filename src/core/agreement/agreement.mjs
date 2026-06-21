// Native wrapper generated from src/core/agreement/agreement.js.

export function createAgreementApi(targetObject = globalThis) {
    function cloneAgreementLessonRecord(value) {
      if (Array.isArray(value)) {
        return value.map(entry => cloneAgreementLessonRecord(entry));
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneAgreementLessonRecord(entry)]));
    }
    const LESSON23_VERB_OBJECTS_VALIDATION_REFS = Object.freeze(["src/tests/agreement.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON23_VERB_OBJECTS_PDF_REFS = Object.freeze(["Andrews Lesson 23.1", "Andrews Lesson 23.2", "Andrews Lesson 23.3", "Andrews Lesson 23.4", "Andrews Lesson 23.5"]);
    const LESSON23_OBJECT_KIND_FRAME = Object.freeze({
      kind: "lesson-23-object-kind-frame",
      sourceSection: "Andrews 23.1",
      transitiveIsCoverTerm: true,
      objectStemTypes: Object.freeze(["directive", "causative", "applicative"]),
      directiveObjectBelongsToStem: true,
      causativeApplicativeObjectsBelongToSuffixes: true,
      objectAndSuffixAreDiscontinuousUnit: true,
      suffixNormallyRequiresValenceObject: true,
      objectFormDoesNotExposeFunction: true
    });
    const LESSON23_MULTIPLE_VALENCE_FRAME = Object.freeze({
      kind: "lesson-23-multiple-valence-frame",
      sourceSection: "Andrews 23.2",
      maxValencePositions: 3,
      mainlinePolicy: "last-added derivational object is mainline",
      shuntlinePolicy: "earlier object positions become shuntline levels",
      derivationalHistoryDoesNotSetLinearObjectOrder: true,
      histories: Object.freeze([Object.freeze({
        source: "intransitive",
        path: Object.freeze([Object.freeze({
          objectCount: 0,
          formula: "(STEM)",
          mainlineObject: ""
        }), Object.freeze({
          objectCount: 1,
          formula: "+va(IBASE-SUF)",
          mainlineObject: "causative-or-applicative"
        }), Object.freeze({
          objectCount: 2,
          formula: "+va+va(IBASE-SUF-SUF)",
          shuntlineObjects: 1,
          mainlineObject: "last causative-or-applicative"
        }), Object.freeze({
          objectCount: 3,
          formula: "+va+va+va(IBASE-SUF-SUF-SUF)",
          shuntlineObjects: 2,
          mainlineObject: "last causative-or-applicative"
        })])
      }), Object.freeze({
        source: "directive",
        path: Object.freeze([Object.freeze({
          objectCount: 1,
          formula: "+va(STEM)",
          mainlineObject: "direct"
        }), Object.freeze({
          objectCount: 2,
          formula: "+va+va(DBASE-SUF)",
          shuntlineObjects: 1,
          mainlineObject: "causative-or-applicative"
        }), Object.freeze({
          objectCount: 3,
          formula: "+va+va+va(DBASE-SUF-SUF)",
          shuntlineObjects: 2,
          mainlineObject: "last causative-or-applicative"
        })])
      })])
    });
    const LESSON23_VALENCE_RULE_FRAME = Object.freeze({
      kind: "lesson-23-valence-rule-frame",
      sourceSection: "Andrews 23.3",
      everyPositionAndSubpositionObligatory: true,
      silentMorphStillOccupiesPosition: true,
      onlyOneMainlineReflexive: true,
      reflexiveMainlineControlledByLastAddedSuffix: true,
      causativesNormallyBeforeApplicatives: true,
      objectSequenceNotSuffixHistory: true,
      specificProjectiveObjectPronounsMutuallyIncompatible: true,
      incompatibilityAppliesWhenMainlineIsSpecificProjective: true,
      specificProjectiveShuntlinesRemainWhenMainlineIsNonspecificOrReflexive: true
    });
    const LESSON23_FORMULA_FRAME = Object.freeze({
      kind: "lesson-23-formula-frame",
      sourceSection: "Andrews 23.4",
      representativeFormula: "#pers1-pers2+va+va+va(DBASE-CAUS-APPLIC)tns+num1-num2#",
      currentUiFormulaShorthand: "#pers1-pers2(base)tiempo+num1-num2#",
      valencePositionSubpositions: 2,
      mainlineIsLastCoreLine: true,
      shuntlineSpecificProjectiveSilencing: Object.freeze([Object.freeze({
        source: "first-or-second-person-specific-projective",
        shuntlineSurface: "0-0"
      }), Object.freeze({
        source: "third-singular-specific-projective c/qu/qui-0",
        shuntlineSurface: "0-0"
      }), Object.freeze({
        source: "third-plural-specific-projective qu-im",
        shuntlineSurface: "0-im or 0-0 before mainline 3pl"
      })]),
      shuntlineNonspecificMorphs: Object.freeze([Object.freeze({
        andrews: "te",
        nawat: "te"
      }), Object.freeze({
        andrews: "tla",
        nawat: "ta"
      })]),
      shuntlineReflexive: "ne"
    });
    const LESSON23_OBJECT_SEQUENCE_FRAME = Object.freeze({
      kind: "lesson-23-object-sequence-frame",
      sourceSection: "Andrews 23.5",
      priorityRules: Object.freeze(["specific-projective-before-reflexive", "specific-projective-before-nonspecific-projective", "reflexive-before-nonspecific-projective", "human-before-nonhuman"]),
      directionalLocativePrefixBoundary: "Andrews Lesson 8.1",
      andrewsThreeObjectCombinations: Object.freeze([Object.freeze(["tla", "tla", "tla"]), Object.freeze(["te", "tla", "tla"]), Object.freeze(["m-o", "tla", "tla"]), Object.freeze(["te", "te", "tla"]), Object.freeze(["m-o", "te", "tla"]), Object.freeze(["c-0", "m-o", "tla"]), Object.freeze(["te", "te", "te"]), Object.freeze(["m-o", "te", "te"]), Object.freeze(["c-0", "m-o", "te"]), Object.freeze(["c-0", "0-0", "tla"]), Object.freeze(["c-0", "0-0", "te"]), Object.freeze(["c-0", "0-0", "m-o"]), Object.freeze(["c-0", "0-0", "0-0"])]),
      nawatOrthographyBridge: Object.freeze([Object.freeze({
        andrews: "tla",
        nawat: "ta"
      }), Object.freeze({
        andrews: "m-o",
        nawat: "mu"
      }), Object.freeze({
        andrews: "c/qu/qui",
        nawat: "ki/k"
      })]),
      appendixCInventoryNeededForClosestPass: true
    });
    const LESSON23_VERB_OBJECTS_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson23-object-kinds",
      andrewsSection: "23.1",
      category: "verb-object-kinds",
      directiveEs: "Transitivo es un termino amplio: los objetos pueden ser directivos, causativos o aplicativos; la forma del pronombre no decide por si sola la funcion.",
      engineSurface: "object prefix inventory plus causative/applicative derivation metadata",
      implementationState: "partial",
      redirectAction: "reframe-metadata"
    }), Object.freeze({
      id: "lesson23-multiple-valence",
      andrewsSection: "23.2",
      category: "multiple-valence-positions",
      directiveEs: "Una CNV puede tener hasta tres posiciones de valencia; la ultima derivacion da la linea principal y las anteriores pasan a lineas secundarias.",
      engineSurface: "obj1/obj2/obj3 controls and generated-row valency metadata",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson23-valence-rules",
      andrewsSection: "23.3",
      category: "valence-position-rules",
      directiveEs: "Toda posicion y subposicion existe aun cuando sea silenciosa; solo hay un reflexivo de linea principal y los proyectivos especificos compiten.",
      engineSurface: "object compatibility and allomorphy helpers",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson23-multiple-valence-formula",
      andrewsSection: "23.4",
      category: "multiple-valence-formula",
      directiveEs: "La formula multiple usa posiciones +va con subposiciones; las lineas secundarias pueden quedar en cero aunque sigan siendo gramaticales.",
      engineSurface: "compact UI formula plus object-slot metadata",
      implementationState: "partial",
      redirectAction: "rename-visible-ui"
    }), Object.freeze({
      id: "lesson23-object-sequence",
      andrewsSection: "23.5",
      category: "object-sequence-priorities",
      directiveEs: "El orden de objetos se decide por tipo de objeto y humanidad, no por el historial de sufijos: proyectivo especifico, reflexivo, inespecifico, humano antes de no humano.",
      engineSurface: "normalizeValenceMarkerOrder and Appendix C-inspired object combinations",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    })]);
    function getLesson23VerbObjectsSubsectionInventory() {
      return LESSON23_VERB_OBJECTS_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON23_VERB_OBJECTS_VALIDATION_REFS)
      }));
    }
    function buildLesson23VerbObjectsPursuitFrame() {
      const subsectionInventory = getLesson23VerbObjectsSubsectionInventory();
      const objectKindFrame = cloneAgreementLessonRecord(LESSON23_OBJECT_KIND_FRAME);
      const multipleValenceFrame = cloneAgreementLessonRecord(LESSON23_MULTIPLE_VALENCE_FRAME);
      const valenceRuleFrame = cloneAgreementLessonRecord(LESSON23_VALENCE_RULE_FRAME);
      const formulaFrame = cloneAgreementLessonRecord(LESSON23_FORMULA_FRAME);
      const objectSequenceFrame = cloneAgreementLessonRecord(LESSON23_OBJECT_SEQUENCE_FRAME);
      const remainingGaps = ["Object function is not fully encoded per generated row: directive, causative, and applicative objects can share surface pronoun forms and remain ambiguous without source context.", "The discontinuous object-plus-suffix contract for causative and applicative objects is not yet enforced or explained across all object slots.", "The full mainline/shuntline derivational history for one-, two-, and three-object VNCs is not exhaustively audited against current obj1/obj2/obj3 behavior.", "Silent shuntline morphs and the thirteen Andrews 23.5 three-object combinations are not yet a complete generation/validation table.", "Appendix C object-combination inventory and Nawat/Pipil exceptions still need direct evidence before closest-pass."];
      const frame = {
        kind: "lesson-23-verb-objects-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 23,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON23_VERB_OBJECTS_PDF_REFS),
        plannedArrows: [{
          id: "lesson-23-verb-objects-audit",
          type: "metadata-engine-test",
          aim: "Audit Andrews Lesson 23.1-23.5 against current object slots, object function metadata, mainline/shuntline positions, silent morphs, sequence priorities, and Nawat orthography bridge.",
          andrewsRefs: Array.from(LESSON23_VERB_OBJECTS_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON23_VERB_OBJECTS_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-23-verb-objects-audit",
          result: "hit",
          correction: "Lesson 23 now records Andrews object kinds, multiple valence positions, +va formula boundaries, mainline/shuntline rules, object sequence priorities, current object-slot support, and explicit gaps before closest-pass can be claimed.",
          andrewsRefs: Array.from(LESSON23_VERB_OBJECTS_PDF_REFS),
          feedbackRefs: Array.from(LESSON23_VERB_OBJECTS_VALIDATION_REFS)
        }],
        subsectionInventory,
        objectKindFrame,
        multipleValenceFrame,
        valenceRuleFrame,
        formulaFrame,
        objectSequenceFrame,
        currentEngineBoundary: {
          objectPrefixInventoryImplemented: true,
          obj1Obj2Obj3ControlsExist: true,
          normalizeValenceMarkerOrderImplemented: true,
          causativeApplicativeDerivationImplementedElsewhere: true,
          objectFunctionAmbiguityNotFullyExposed: true,
          discontinuousObjectSuffixContractPartial: true,
          mainlineShuntlineLevelsPartial: true,
          silentMorphTableIncomplete: true,
          appendixCInventoryIncomplete: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return frame;
      }
      return targetObject.attachGrammarMetadataContract(frame, {
        enumerable: false,
        unitKind: "verbal-nuclear-clause",
        metadataKind: "lesson-23-verb-objects-pursuit-frame",
        routeFamily: "agreement-valence",
        routeStage: "audit-lesson-23",
        generationAllowed: false,
        supported: true,
        structuralSource: "Andrews Lesson 23",
        andrewsRefs: Array.from(LESSON23_VERB_OBJECTS_PDF_REFS),
        evidenceStatus: "direct-pdf-partial",
        sourceInput: "Andrews Lesson 23.1-23.5",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil output spelling",
          noClassicalSurfaceImport: true,
          objectBridge: objectSequenceFrame.nawatOrthographyBridge,
          nonspecificObjectBridge: formulaFrame.shuntlineNonspecificMorphs
        },
        morphBoundaryFrame: {
          objectKindFrame,
          multipleValenceFrame,
          valenceRuleFrame,
          formulaFrame,
          objectSequenceFrame
        },
        participantFrame: {
          maxValencePositions: 3,
          objectFunctionTypes: objectKindFrame.objectStemTypes,
          mainlinePolicy: multipleValenceFrame.mainlinePolicy,
          shuntlinePolicy: multipleValenceFrame.shuntlinePolicy,
          sequencePriorityRules: objectSequenceFrame.priorityRules,
          silentMorphStillOccupiesPosition: true
        },
        nuclearClauseFrame: {
          clauseKind: "verbal-nuclear-clause",
          formulaAbbreviation: formulaFrame.representativeFormula,
          formulaLabel: "CNV transitiva de valencia multiple",
          lineModel: "mainline plus shuntline object positions"
        },
        targetContract: {
          metadataKind: "lesson-23-verb-objects-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnosticStatus: "partial-audit"
      });
    }

    // === Person & Agreement ===
    function getOptativePers1Pers2Info(pers1, pers2) {
      const key = `${pers1}|${pers2}`;
      switch (key) {
        case "ni|":
          return {
            person: 1,
            number: "sg",
            mode: "optative"
          };
        case "shi|":
          return {
            person: 2,
            number: "sg",
            mode: "optative"
          };
        case "|":
          return {
            person: 3,
            number: "sg",
            mode: "optative"
          };
        case "ti|kan":
          return {
            person: 1,
            number: "pl",
            mode: "optative"
          };
        case "shi|kan":
          return {
            person: 2,
            number: "pl",
            mode: "optative"
          };
        case "|kan":
          return {
            person: 3,
            number: "pl",
            mode: "optative"
          };
        default:
          return null;
      }
    }
    function getNonOptativePers1Pers2Info(pers1, pers2) {
      const key = `${pers1}|${pers2}`;
      switch (key) {
        case "ni|":
          return {
            person: 1,
            number: "sg",
            mode: "nonoptative"
          };
        case "ti|":
          return {
            person: 2,
            number: "sg",
            mode: "nonoptative"
          };
        case "|":
          return {
            person: 3,
            number: "sg",
            mode: "nonoptative"
          };
        case "ti|t":
          return {
            person: 1,
            number: "pl",
            mode: "nonoptative"
          };
        case "an|t":
          return {
            person: 2,
            number: "pl",
            mode: "nonoptative"
          };
        case "|t":
          return {
            person: 3,
            number: "pl",
            mode: "nonoptative"
          };
        default:
          return null;
      }
    }
    function isOptativePers1Pers2IdentityContext(options = {}) {
      return options?.mode === "optative" || options?.tense === "optativo";
    }
    function isNonOptativePers1Pers2IdentityContext(options = {}) {
      return options?.mode === "nonoptative" || options?.mode === "non-optative" || typeof options?.tense === "string" && options.tense && options.tense !== "optativo";
    }
    function stripPers1Pers2IdentityMode(info = null) {
      return info ? {
        person: info.person,
        number: info.number
      } : null;
    }
    function getPers1Pers2Info(pers1, pers2, options = {}) {
      const optativeInfo = getOptativePers1Pers2Info(pers1, pers2);
      if (optativeInfo && (isOptativePers1Pers2IdentityContext(options) || pers1 === "shi" || pers2 === "kan")) {
        return optativeInfo;
      }
      const nonOptativeInfo = getNonOptativePers1Pers2Info(pers1, pers2);
      if (nonOptativeInfo) {
        return isNonOptativePers1Pers2IdentityContext(options) ? nonOptativeInfo : stripPers1Pers2IdentityMode(nonOptativeInfo);
      }
      return null;
    }
    function getObj1PersonInfo(obj1) {
      switch (obj1) {
        case "nech":
        case "n-ech":
          return {
            person: 1,
            number: "sg"
          };
        case "tech":
        case "t-ech":
          return {
            person: 1,
            number: "pl"
          };
        case "metz":
        case "m-etz":
          return {
            person: 2,
            number: "sg"
          };
        case "metzin":
        case "m-etz-in":
          return {
            person: 2,
            number: "pl"
          };
        case "ki":
        case "k":
        case "ki-0":
        case "k-0":
          return {
            person: 3,
            number: "sg"
          };
        case "kin":
        case "k-in":
          return {
            person: 3,
            number: "pl"
          };
        default:
          return null;
      }
    }
    function isPers1Obj1SamePersonAcrossNumber(pers1, pers2, obj1) {
      const pers1Pers2 = getPers1Pers2Info(pers1, pers2);
      const obj1Info = getObj1PersonInfo(obj1);
      if (!pers1Pers2 || !obj1Info) {
        return false;
      }
      if (pers1Pers2.person === 3 || obj1Info.person === 3) {
        return false;
      }
      return pers1Pers2.person === obj1Info.person;
    }
    function isPers1Obj1HierarchyOrderViolation(pers1, pers2, obj1) {
      const pers1Pers2 = getPers1Pers2Info(pers1, pers2);
      const obj1Info = getObj1PersonInfo(obj1);
      if (!pers1Pers2 || !obj1Info) {
        return false;
      }
      // 3rd-person pers1-pers2 can combine with 1st/2nd-person obj1.
      // Keep cross-number collision blocking in isPers1Obj1SamePersonAcrossNumber().
      return false;
    }
    function isPers1Obj1Reflexivo(pers1, pers2, obj1) {
      const pers1Pers2 = getPers1Pers2Info(pers1, pers2);
      const obj1Info = getObj1PersonInfo(obj1);
      if (!pers1Pers2 || !obj1Info) {
        return false;
      }
      if (pers1Pers2.person === 3) {
        return false;
      }
      return pers1Pers2.person === obj1Info.person && pers1Pers2.number === obj1Info.number;
    }

    // === Nonactive Derivation ===
    function applyPassiveImpersonal({
      pers1 = "",
      pers2 = "",
      obj1 = "",
      preservePers1Pers2,
      preserveSubject = false,
      allowObj1,
      allowObjectPrefix = false
    }) {
      const inputPers1 = String(pers1 || "");
      const inputPers2 = String(pers2 || "");
      const inputObj1 = String(obj1 || "");
      const shouldPreservePers1Pers2 = Boolean(preservePers1Pers2 ?? preserveSubject);
      const shouldAllowObj1 = Boolean(allowObj1 ?? allowObjectPrefix);
      const build = ({
        nextPers1,
        nextPers2,
        nextObj1
      }) => ({
        pers1: nextPers1,
        pers2: nextPers2,
        obj1: nextObj1
      });
      const isTransitiveVerb = inputObj1 !== "";
      if (!isTransitiveVerb) {
        return shouldPreservePers1Pers2 ? build({
          nextPers1: inputPers1,
          nextPers2: inputPers2,
          nextObj1: inputObj1
        }) : build({
          nextPers1: "",
          nextPers2: "",
          nextObj1: inputObj1
        });
      }
      if (targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(inputObj1)) {
        if (shouldPreservePers1Pers2) {
          return build({
            nextPers1: inputPers1,
            nextPers2: inputPers2,
            nextObj1: shouldAllowObj1 ? inputObj1 : ""
          });
        }
        const mapped = targetObject.PASSIVE_IMPERSONAL_SUBJECT_MAP[inputObj1];
        return build({
          nextPers1: mapped.pers1 ?? "",
          nextPers2: mapped.pers2 ?? "",
          nextObj1: ""
        });
      }
      return shouldPreservePers1Pers2 ? build({
        nextPers1: inputPers1,
        nextPers2: inputPers2,
        nextObj1: inputObj1
      }) : build({
        nextPers1: "",
        nextPers2: "",
        nextObj1: inputObj1
      });
    }
    function getPassiveSubjectOverride(prefix) {
      const mapped = targetObject.PASSIVE_IMPERSONAL_SUBJECT_MAP[prefix];
      if (mapped) {
        return {
          pers1: mapped.pers1 ?? "",
          pers2: mapped.pers2 ?? ""
        };
      }
      if (targetObject.OBJECT_MARKERS.has(prefix)) {
        return {
          pers1: "",
          pers2: ""
        };
      }
      return null;
    }

    // === Prefix Selection ===
    function applyObj2ToObj1Chain(obj1, obj2) {
      if (!obj2) {
        return obj1;
      }
      let combined = "";
      if (targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(obj2) || obj2 === "k") {
        if (!obj1) {
          combined = obj2;
        } else if (targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(obj1) || obj1 === "k") {
          combined = obj2;
        } else {
          combined = `${obj1}${obj2}`;
        }
      } else if (obj1 === obj2) {
        if (obj2 === "ta" || obj2 === "te") {
          combined = `${obj1}${obj2}`;
        } else {
          combined = obj1;
        }
      } else {
        combined = `${obj1}${obj2}`;
      }
      return normalizeValenceMarkerOrder(combined);
    }
    function parseProjectiveMarkerChain(value, inventory) {
      if (!value) {
        return false;
      }
      let remaining = value;
      while (remaining) {
        const token = inventory.find(item => remaining.startsWith(item));
        if (!token) {
          return false;
        }
        remaining = remaining.slice(token.length);
      }
      return true;
    }
    function shortenObj1KiBeforePers1(prefix, pers1 = "") {
      if (!prefix) {
        return prefix;
      }
      const nonspecificInventory = Array.from(targetObject.NONSPECIFIC_VALENCE_AFFIX_SET).filter(Boolean).sort((a, b) => b.length - a.length);
      const valenceMarkerInventory = Array.from(new Set([...Array.from(targetObject.SPECIFIC_VALENCE_PREFIX_SET || []), ...Array.from(targetObject.NONSPECIFIC_VALENCE_AFFIX_SET || []), "k"])).filter(Boolean).sort((a, b) => b.length - a.length);
      if (prefix.startsWith("ki") && prefix.length > 2 && ["ni", "ti"].includes(pers1)) {
        const tail = prefix.slice(2);
        const isNonspecificMarkerChain = parseProjectiveMarkerChain(tail, nonspecificInventory);
        const isValenceMarkerChain = parseProjectiveMarkerChain(tail, valenceMarkerInventory);
        if (isNonspecificMarkerChain || isValenceMarkerChain) {
          return `k${tail}`;
        }
      }
      if (prefix.endsWith("ki") && prefix.length > 2) {
        const leading = prefix.slice(0, -2);
        if (isNonspecificProjectivePrefix(leading)) {
          return prefix;
        }
        return `${prefix.slice(0, -2)}k`;
      }
      if (prefix === "ki" && ["ni", "ti"].includes(pers1)) {
        return "k";
      }
      return prefix;
    }
    function composeObj1Chain({
      obj1 = "",
      markers = [],
      pers1 = ""
    }) {
      let combined = obj1 || "";
      const markerChain = Array.isArray(markers) ? markers : [];
      markerChain.filter(Boolean).forEach(marker => {
        combined = applyObj2ToObj1Chain(combined, marker);
      });
      return shortenObj1KiBeforePers1(combined, pers1);
    }
    function isSpecificProjectivePrefix(prefix) {
      return targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k";
    }
    function isNonspecificProjectivePrefix(prefix) {
      return targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix);
    }
    function getProjectiveHierarchyRank(prefix) {
      if (!prefix) {
        return 99;
      }
      if (isSpecificProjectivePrefix(prefix)) {
        return 0;
      }
      if (prefix === "mu") {
        return 1;
      }
      if (prefix === "te") {
        return 2;
      }
      if (prefix === "ta") {
        return 3;
      }
      if (targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix)) {
        return 4;
      }
      return 5;
    }
    function normalizeValenceMarkerOrder(prefix) {
      if (!prefix) {
        return prefix;
      }
      const full = prefix;
      let directional = "";
      let rest = prefix;
      if (rest.startsWith("al") && rest !== "al") {
        directional = "al";
        rest = rest.slice(2);
      }
      const markerInventory = Array.from(new Set([...targetObject.SPECIFIC_VALENCE_PREFIXES, ...targetObject.NONSPECIFIC_VALENCE_PREFIXES, "k"])).sort((a, b) => b.length - a.length);
      const tokenEntries = [];
      let working = rest;
      let tokenIndex = 0;
      while (working) {
        const match = markerInventory.find(token => working.startsWith(token));
        if (!match) {
          return full;
        }
        tokenEntries.push({
          token: match,
          index: tokenIndex
        });
        tokenIndex += 1;
        working = working.slice(match.length);
      }
      if (tokenEntries.length <= 1) {
        return full;
      }
      tokenEntries.sort((a, b) => {
        const rankDiff = getProjectiveHierarchyRank(a.token) - getProjectiveHierarchyRank(b.token);
        if (rankDiff !== 0) {
          return rankDiff;
        }
        return a.index - b.index;
      });
      return `${directional}${tokenEntries.map(entry => entry.token).join("")}`;
    }
    function reorderObj1Obj2ByHierarchy(obj1, obj2) {
      if (!obj1 || !obj2) {
        return {
          obj1,
          obj2
        };
      }
      const obj1Rank = getProjectiveHierarchyRank(obj1);
      const obj2Rank = getProjectiveHierarchyRank(obj2);
      if (obj2Rank < obj1Rank) {
        return {
          obj1: obj2,
          obj2: obj1
        };
      }
      return {
        obj1,
        obj2
      };
    }
    function resolveObj1Obj2Positions({
      obj1,
      obj2,
      derivationType
    }) {
      if (!obj2) {
        return {
          obj1,
          obj2
        };
      }
      ({
        obj1,
        obj2
      } = reorderObj1Obj2ByHierarchy(obj1, obj2));
      if (derivationType === targetObject.DERIVATION_TYPE.direct) {
        return {
          obj1,
          obj2
        };
      }
      const isApplicative = derivationType === targetObject.DERIVATION_TYPE.applicative;
      const allowSpecificWithNonspecific = isApplicative || derivationType === targetObject.DERIVATION_TYPE.causative;
      if (allowSpecificWithNonspecific && obj2 === "mu") {
        return {
          obj1,
          obj2
        };
      }
      const isSpecific = prefix => targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k";
      const isNonspecific = prefix => targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix);
      const isReflexive = prefix => prefix === "mu";
      const keepReflexiveObj2 = allowSpecificWithNonspecific && obj2 === "mu";
      if (isApplicative) {
        if (isSpecific(obj2) || isReflexive(obj2)) {
          if (keepReflexiveObj2) {
            return {
              obj1,
              obj2
            };
          }
          if (allowSpecificWithNonspecific && isNonspecific(obj1)) {
            return {
              obj1,
              obj2
            };
          }
          obj2 = "";
        }
        return {
          obj1,
          obj2
        };
      }
      if (isSpecific(obj2)) {
        if (isSpecific(obj1) || isReflexive(obj1)) {
          obj1 = "";
        }
        return {
          obj1,
          obj2
        };
      }
      if (isReflexive(obj2)) {
        if (keepReflexiveObj2) {
          return {
            obj1,
            obj2
          };
        }
        obj1 = "";
        return {
          obj1,
          obj2
        };
      }
      if (isSpecific(obj1) || isReflexive(obj1)) {
        if (allowSpecificWithNonspecific && isNonspecific(obj2)) {
          return {
            obj1,
            obj2
          };
        }
        obj1 = "";
      }
      return {
        obj1,
        obj2
      };
    }
    function resolveDisplayObj1Obj2({
      obj1,
      obj2,
      derivationType
    }) {
      let nextObj1 = obj1 || "";
      let nextObj2 = obj2 || "";
      if ((derivationType === targetObject.DERIVATION_TYPE.applicative || derivationType === targetObject.DERIVATION_TYPE.causative) && nextObj2) {
        const isSpecific = prefix => isSpecificProjectivePrefix(prefix) || prefix === "mu";
        const obj2IsSpecific = isSpecific(nextObj2);
        const shouldSwap = !nextObj1 && obj2IsSpecific;
        if (shouldSwap) {
          const rightmostObj1 = nextObj2;
          nextObj2 = nextObj1 || "";
          nextObj1 = rightmostObj1;
        }
      }
      return resolveObj1Obj2Positions({
        obj1: nextObj1,
        obj2: nextObj2,
        derivationType
      });
    }
    function getPoseedorPrefixForPers1Pers2(pers1, pers2) {
      const key = `${pers1}|${pers2}`;
      switch (key) {
        case "ni|":
          return "nu";
        case "ti|":
          return "mu";
        case "|":
          return "i";
        case "ti|t":
          return "tu";
        case "an|t":
          return "anmu";
        case "|t":
          return "in";
        default:
          return "";
      }
    }
    function getPoseedorPersonInfo(poseedor) {
      if (!poseedor) {
        return null;
      }
      const obj1Equivalent = targetObject.POSSESSIVE_TO_OBJECT_PREFIX[poseedor] || "";
      if (!obj1Equivalent) {
        return null;
      }
      return getObj1PersonInfo(obj1Equivalent);
    }
    function isSamePers1Pers2Poseedor(pers1, pers2, poseedor) {
      if (!poseedor) {
        return false;
      }
      const pers1Pers2Info = getPers1Pers2Info(pers1, pers2);
      const poseedorInfo = getPoseedorPersonInfo(poseedor);
      if (pers1Pers2Info && poseedorInfo) {
        if (pers1Pers2Info.person === 3 && poseedorInfo.person === 3) {
          return false;
        }
        return pers1Pers2Info.person === poseedorInfo.person;
      }
      const expectedPoseedor = getPoseedorPrefixForPers1Pers2(pers1, pers2);
      return Boolean(expectedPoseedor && expectedPoseedor === poseedor);
    }
    function isNonanimatePers1Pers2(pers1, pers2) {
      return pers1 === "" && pers2 === "";
    }
    var CONJUGATION_AVAILABILITY_STATE = Object.freeze({
      viable: "viable",
      masked: "masked",
      impossible: "impossible"
    });
    var CONJUGATION_DIAGNOSTIC_IDS = Object.freeze({
      resultError: "result-error",
      reflexiveHidden: "reflexive-hidden",
      invalidCombo: "invalid-combo",
      personAgreement: "person-agreement",
      hierarchyOrder: "hierarchy-order",
      subjectPossessorCollision: "subject-possessor-collision",
      valence4Matrix: "valence4-matrix"
    });
    var CONJUGATION_DIAGNOSTIC_DISPLAY_LABELS = Object.freeze({
      [CONJUGATION_DIAGNOSTIC_IDS.resultError]: "La generacion no produjo una forma.",
      [CONJUGATION_DIAGNOSTIC_IDS.reflexiveHidden]: "Forma reflexiva oculta para este rol.",
      [CONJUGATION_DIAGNOSTIC_IDS.invalidCombo]: "Combinacion incompatible.",
      [CONJUGATION_DIAGNOSTIC_IDS.personAgreement]: "Persona incompatible.",
      [CONJUGATION_DIAGNOSTIC_IDS.hierarchyOrder]: "Jerarquia de participantes incompatible.",
      [CONJUGATION_DIAGNOSTIC_IDS.subjectPossessorCollision]: "Sujeto y poseedor incompatibles.",
      [CONJUGATION_DIAGNOSTIC_IDS.valence4Matrix]: "Matriz de valencia incompatible."
    });
    function buildConjugationDiagnosticEntry(id = "", severity = "masked", options = {}) {
      return {
        id: String(id || ""),
        severity: severity || "masked",
        source: options.source || "",
        masked: options.masked !== false
      };
    }
    function normalizeConjugationDiagnosticEntry(entry = null, fallbackSource = "") {
      if (!entry) {
        return null;
      }
      if (typeof entry === "string") {
        const id = entry.trim();
        return id ? buildConjugationDiagnosticEntry(id, "diagnostic", {
          source: fallbackSource
        }) : null;
      }
      if (typeof entry !== "object") {
        return null;
      }
      const id = String(entry.id || entry.code || entry.message || "").trim();
      if (!id) {
        return null;
      }
      return {
        ...entry,
        id,
        severity: String(entry.severity || "diagnostic"),
        source: entry.source || fallbackSource || ""
      };
    }
    function dedupeConjugationDiagnosticEntries(entries = []) {
      const seen = new Set();
      return (Array.isArray(entries) ? entries : []).map(entry => normalizeConjugationDiagnosticEntry(entry)).filter(entry => entry && entry.id).filter(entry => {
        const key = `${entry.id}|${entry.severity || ""}|${entry.source || ""}|${entry.message || ""}`;
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      });
    }
    function getConjugationResultFrame(result = null) {
      return (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null) || (result?.frames && typeof result.frames === "object" ? result.frames : null);
    }
    function splitConjugationRenderableSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeConjugationDisplayText(entry)).filter(Boolean);
    }
    function getConjugationRenderableSurfaceForms(result = null) {
      const grammarFrame = getConjugationResultFrame(result);
      const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      const hasResultFrame = Boolean(frameResult);
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.flatMap(entry => splitConjugationRenderableSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(result?.surfaceForms)) {
        forms.push(...result.surfaceForms);
      }
      if (!hasResultFrame && result?.surface) {
        forms.push(result.surface);
      }
      if (!hasResultFrame && result?.result) {
        forms.push(result.result);
      }
      return forms.flatMap(entry => splitConjugationRenderableSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getConjugationRenderableSurface(result = null) {
      return getConjugationRenderableSurfaceForms(result).join(" / ");
    }
    function buildConjugationFrameStatusDiagnostic(result = null) {
      const grammarFrame = getConjugationResultFrame(result);
      if (!grammarFrame || typeof grammarFrame !== "object") {
        return null;
      }
      const routeContract = grammarFrame.routeContract && typeof grammarFrame.routeContract === "object" ? grammarFrame.routeContract : {};
      const authorityFrame = grammarFrame.authorityFrame && typeof grammarFrame.authorityFrame === "object" ? grammarFrame.authorityFrame : {};
      const resultFrame = grammarFrame.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : {};
      const blocked = result?.ok === false || resultFrame.ok === false || routeContract.generationAllowed === false || authorityFrame.supported === false;
      if (!blocked) {
        return null;
      }
      const andrewsRefs = Array.isArray(authorityFrame.andrewsRefs) ? authorityFrame.andrewsRefs.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      const routeFamily = String(routeContract.routeFamily || "").trim();
      const routeStage = String(routeContract.routeStage || "").trim();
      const hasAndrewsAuthority = andrewsRefs.length > 0 || String(authorityFrame.grammarAuthority || "") === "Andrews";
      const authorityBlocked = authorityFrame.supported === false;
      const routeBlocked = routeContract.generationAllowed === false;
      const resultBlocked = result?.ok === false || resultFrame.ok === false;
      let failedLayer = "diagnostic";
      let contractLayer = "diagnosticFrame";
      if (authorityBlocked) {
        failedLayer = "authority";
        contractLayer = "authorityFrame";
      } else if (routeBlocked) {
        failedLayer = "route";
        contractLayer = "routeContract";
      } else if (resultBlocked) {
        failedLayer = "output";
        contractLayer = "resultFrame";
      }
      return {
        id: hasAndrewsAuthority ? "ANDREWS_ROUTE_NOT_LICENSED" : "LCM_ROUTE_GENERATION_BLOCKED",
        code: hasAndrewsAuthority ? "ANDREWS_ROUTE_NOT_LICENSED" : "LCM_ROUTE_GENERATION_BLOCKED",
        severity: "error",
        source: "grammar-frame",
        failedLayer,
        contractLayer,
        message: hasAndrewsAuthority ? "Ruta bloqueada antes de generar por la evidencia Andrews del contrato." : "Ruta bloqueada antes de generar por el contrato gramatical.",
        authority: andrewsRefs.join("; "),
        routeFamily,
        routeStage
      };
    }
    function isGenericConjugationNoOutputDiagnostic(entry = null) {
      if (!entry || typeof entry !== "object") {
        return false;
      }
      const id = String(entry.id || entry.code || "").trim();
      const message = String(entry.message || "").trim();
      return id === CONJUGATION_DIAGNOSTIC_IDS.resultError || id === "nuclear-clause-surface-route-blocked" || id === "generate-word-route-blocked" || id === "generate-runtime-no-output" || id === "morphology-application-blocked" || id === "verb-derived-nominal-blocked" || id === "verb-derived-nominal-context-blocked" || id === "preterit-class-based-result-blocked" || message === "La generacion no produjo una forma." || message === "La generación no produjo una forma.";
    }
    function hasConjugationFailedLayerDiagnostic(entries = []) {
      return entries.some(entry => {
        if (!entry || typeof entry !== "object") {
          return false;
        }
        const id = String(entry.id || entry.code || "").trim();
        return entry.source === "grammar-frame" || Boolean(entry.failedLayer || entry.contractLayer) || id === "ANDREWS_ROUTE_NOT_LICENSED" || id === "LCM_ROUTE_GENERATION_BLOCKED";
      });
    }
    function shouldPromoteConjugationFrameStatusDiagnostic(frameStatusDiagnostic = null, entries = []) {
      if (!frameStatusDiagnostic || typeof frameStatusDiagnostic !== "object") {
        return false;
      }
      const statusLayer = String(frameStatusDiagnostic.failedLayer || "").trim();
      const statusId = String(frameStatusDiagnostic.id || frameStatusDiagnostic.code || "").trim();
      if (!["authority", "route", "stem", "orthography", "agreement"].includes(statusLayer)) {
        return false;
      }
      const diagnosticEntries = Array.isArray(entries) ? entries : [];
      if (diagnosticEntries.some(entry => entry && typeof entry === "object" && !isGenericConjugationNoOutputDiagnostic(entry))) {
        return false;
      }
      return !diagnosticEntries.some(entry => {
        if (!entry || typeof entry !== "object") {
          return false;
        }
        const entryId = String(entry.id || entry.code || "").trim();
        if (entry.source === "grammar-frame" || entryId === statusId || entryId === "ANDREWS_ROUTE_NOT_LICENSED" || entryId === "LCM_ROUTE_GENERATION_BLOCKED") {
          return true;
        }
        const failedLayer = String(entry.failedLayer || "").trim();
        const contractLayer = String(entry.contractLayer || "").trim();
        if (!failedLayer && !contractLayer) {
          return false;
        }
        if (isGenericConjugationNoOutputDiagnostic(entry)) {
          return false;
        }
        return failedLayer !== "output" && failedLayer !== "result" && contractLayer !== "resultFrame";
      });
    }
    function getConjugationResultDiagnostics(result = null) {
      if (!result || typeof result !== "object") {
        return [];
      }
      const grammarFrame = getConjugationResultFrame(result);
      const routeDiagnostics = Array.isArray(grammarFrame?.routeContract?.blockingDiagnostics) ? grammarFrame.routeContract.blockingDiagnostics : [];
      const frameDiagnostics = Array.isArray(grammarFrame?.diagnosticFrame?.diagnostics) ? grammarFrame.diagnosticFrame.diagnostics : [];
      const diagnostics = [...(Array.isArray(result.diagnostics) ? result.diagnostics : []), ...routeDiagnostics, ...frameDiagnostics, ...(Array.isArray(result.contractDiagnostics) ? result.contractDiagnostics : [])];
      const frameStatusDiagnostic = buildConjugationFrameStatusDiagnostic(result);
      if (frameStatusDiagnostic && (!hasConjugationFailedLayerDiagnostic(diagnostics) && (!diagnostics.length || diagnostics.every(entry => isGenericConjugationNoOutputDiagnostic(entry))) || diagnostics.every(entry => isGenericConjugationNoOutputDiagnostic(entry)) || shouldPromoteConjugationFrameStatusDiagnostic(frameStatusDiagnostic, diagnostics))) {
        diagnostics.unshift(frameStatusDiagnostic);
      }
      return dedupeConjugationDiagnosticEntries(diagnostics);
    }
    function resolveConjugationAvailabilityState({
      hasRenderableResult = false,
      shouldMaskRow = false
    }) {
      if (!hasRenderableResult) {
        return CONJUGATION_AVAILABILITY_STATE.impossible;
      }
      if (shouldMaskRow) {
        return CONJUGATION_AVAILABILITY_STATE.masked;
      }
      return CONJUGATION_AVAILABILITY_STATE.viable;
    }
    function createToggleAvailabilityRealizationSummary() {
      return {
        combinationCount: 0,
        viableCount: 0,
        maskedCount: 0,
        impossibleCount: 0
      };
    }
    function recordToggleAvailabilityRealization(summary = null, evaluation = null) {
      const target = summary && typeof summary === "object" ? summary : createToggleAvailabilityRealizationSummary();
      const availabilityState = evaluation?.availabilityState || CONJUGATION_AVAILABILITY_STATE.impossible;
      target.combinationCount += 1;
      if (availabilityState === CONJUGATION_AVAILABILITY_STATE.viable) {
        target.viableCount += 1;
      } else if (availabilityState === CONJUGATION_AVAILABILITY_STATE.masked) {
        target.maskedCount += 1;
      } else {
        target.impossibleCount += 1;
      }
      return target;
    }
    function realizeToggleAvailabilitySummary(summary = null) {
      const resolved = summary && typeof summary === "object" ? summary : createToggleAvailabilityRealizationSummary();
      const hasAnyCombination = resolved.combinationCount > 0;
      const availabilityState = !hasAnyCombination ? CONJUGATION_AVAILABILITY_STATE.impossible : resolved.viableCount > 0 ? CONJUGATION_AVAILABILITY_STATE.viable : resolved.maskedCount > 0 ? CONJUGATION_AVAILABILITY_STATE.masked : CONJUGATION_AVAILABILITY_STATE.impossible;
      return {
        ...resolved,
        hasAnyCombination,
        availabilityState
      };
    }
    function buildConjugationEvaluationRecord({
      result = null,
      maskState = null,
      grammarConstraintState = null,
      hasValenceStructureError = false,
      extraDiagnostics = []
    } = {}) {
      const resolvedMaskState = maskState && typeof maskState === "object" ? maskState : {};
      const diagnostics = [...(Array.isArray(resolvedMaskState.diagnostics) ? resolvedMaskState.diagnostics : []), ...getConjugationResultDiagnostics(result), ...(Array.isArray(extraDiagnostics) ? extraDiagnostics : [])];
      const maskedConstraintIds = Array.isArray(grammarConstraintState?.maskedConstraintIds) ? grammarConstraintState.maskedConstraintIds : [];
      maskedConstraintIds.forEach(constraintId => {
        diagnostics.push(buildConjugationDiagnosticEntry(constraintId, "masked", {
          source: "grammar-constraint"
        }));
      });
      if (hasValenceStructureError) {
        diagnostics.push(buildConjugationDiagnosticEntry(CONJUGATION_DIAGNOSTIC_IDS.valence4Matrix, "error", {
          source: "grammar-constraint"
        }));
      }
      const dedupedDiagnostics = dedupeConjugationDiagnosticEntries(diagnostics);
      const hasRenderableResult = resolvedMaskState.hasRenderableResult === true || Boolean(getConjugationRenderableSurface(result));
      const shouldMaskRow = !!(resolvedMaskState.shouldMask || grammarConstraintState?.shouldMask || hasValenceStructureError);
      const isErrorRow = !!(resolvedMaskState.isError || grammarConstraintState?.shouldMask || hasValenceStructureError);
      return {
        result: result || resolvedMaskState.result || {},
        shouldMaskRow,
        isErrorRow,
        hasRenderableResult,
        hasVisibleResult: hasRenderableResult && !shouldMaskRow,
        availabilityState: resolveConjugationAvailabilityState({
          hasRenderableResult,
          shouldMaskRow
        }),
        diagnostics: dedupedDiagnostics,
        diagnosticIds: dedupedDiagnostics.map(entry => entry.id),
        maskedConstraintIds
      };
    }
    function getConjugationDiagnosticDisplayLabel(diagnostic = null) {
      const entry = typeof diagnostic === "string" ? {
        id: diagnostic
      } : diagnostic;
      const explicitMessage = String(entry?.message || "").trim();
      if (explicitMessage) {
        return explicitMessage;
      }
      const id = String(entry?.id || "").trim();
      return id ? CONJUGATION_DIAGNOSTIC_DISPLAY_LABELS[id] || id : "";
    }
    function getConjugationNoOutputDisplay(evaluation = null, fallback = "Sin salida para esta configuracion.") {
      const diagnostics = Array.isArray(evaluation?.diagnostics) ? evaluation.diagnostics : [];
      const primaryDiagnostic = diagnostics.find(entry => String(entry?.message || "").trim() || String(entry?.id || "").trim());
      const diagnosticLabel = getConjugationDiagnosticDisplayLabel(primaryDiagnostic);
      if (diagnosticLabel) {
        return diagnosticLabel;
      }
      const diagnosticIds = Array.isArray(evaluation?.diagnosticIds) ? evaluation.diagnosticIds : [];
      const diagnosticIdLabel = getConjugationDiagnosticDisplayLabel(diagnosticIds.find(Boolean) || "");
      if (diagnosticIdLabel) {
        return diagnosticIdLabel;
      }
      if (evaluation?.shouldMaskRow) {
        return evaluation.isErrorRow ? "Combinacion bloqueada por la gramatica." : "Salida no visible para esta seleccion.";
      }
      return String(fallback || "").trim() || "Sin salida para esta configuracion.";
    }
    function normalizeConjugationDisplayText(value = "") {
      const text = String(value || "").trim();
      return text && text !== "—" ? text : "";
    }
    function applyConjugationEvaluationPresentation({
      row = null,
      value = null,
      evaluation = null,
      formattedValue = ""
    }) {
      const availabilityState = evaluation?.availabilityState || CONJUGATION_AVAILABILITY_STATE.impossible;
      const diagnosticIds = Array.isArray(evaluation?.diagnosticIds) ? evaluation.diagnosticIds : [];
      const grammarFrame = evaluation?.result?.grammarFrame || evaluation?.result?.frames || null;
      const routeContract = grammarFrame?.routeContract || {};
      const authorityFrame = grammarFrame?.authorityFrame || {};
      const diagnosticFrame = grammarFrame?.diagnosticFrame || {};
      const primaryDiagnostic = (Array.isArray(evaluation?.diagnostics) ? evaluation.diagnostics : []).find(entry => entry && typeof entry === "object" && (String(entry.id || entry.code || "").trim() || String(entry.failedLayer || entry.contractLayer || "").trim())) || {};
      const frameStatusDiagnostic = buildConjugationFrameStatusDiagnostic(evaluation?.result);
      const datasetLayerDiagnostic = String(primaryDiagnostic.failedLayer || primaryDiagnostic.contractLayer || "").trim() ? primaryDiagnostic : frameStatusDiagnostic || {};
      if (row) {
        row.dataset.availabilityState = availabilityState;
        row.dataset.diagnosticState = availabilityState;
        row.dataset.diagnosticIds = diagnosticIds.join(",");
        if (grammarFrame && typeof grammarFrame === "object") {
          row.dataset.grammarFrameVersion = String(grammarFrame.version || "");
          row.dataset.lcmRouteFamily = String(routeContract.routeFamily || "");
          row.dataset.lcmRouteStage = String(routeContract.routeStage || "");
          row.dataset.lcmGenerationAllowed = routeContract.generationAllowed === false ? "false" : routeContract.generationAllowed === true ? "true" : "";
          row.dataset.lcmEvidenceStatus = String(authorityFrame.evidenceStatus || "");
          row.dataset.lcmDiagnosticStatus = String(diagnosticFrame.status || "");
        }
        row.dataset.lcmDiagnosticId = String(primaryDiagnostic.id || primaryDiagnostic.code || "").trim();
        row.dataset.lcmFailedLayer = String(datasetLayerDiagnostic.failedLayer || "").trim();
        row.dataset.lcmContractLayer = String(datasetLayerDiagnostic.contractLayer || "").trim();
      }
      if (!value) {
        return;
      }
      value.classList.remove("conjugation-error", "conjugation-reflexive");
      value.classList.remove("conjugation-value--no-output");
      value.dataset.availabilityState = availabilityState;
      value.dataset.diagnosticState = availabilityState;
      value.dataset.diagnosticIds = diagnosticIds.join(",");
      if (evaluation?.shouldMaskRow) {
        value.textContent = getConjugationNoOutputDisplay(evaluation);
        value.classList.add("conjugation-value--no-output");
        if (evaluation.isErrorRow) {
          value.classList.add("conjugation-error");
        }
        return;
      }
      const displayValue = normalizeConjugationDisplayText(formattedValue) || getConjugationRenderableSurface(evaluation?.result);
      if (!displayValue) {
        value.textContent = getConjugationNoOutputDisplay(evaluation);
        value.classList.add("conjugation-value--no-output");
        value.classList.add("conjugation-error");
        return;
      }
      value.textContent = displayValue;
      if (evaluation?.result?.isReflexive) {
        value.classList.add("conjugation-reflexive");
      }
    }
    function getConjugationMaskState({
      result,
      subjectPrefix,
      subjectSuffix,
      objectPrefix = "",
      possessivePrefix = "",
      comboObjectPrefix,
      derivationType = "",
      indirectObjectMarker = "",
      controllerObjectMarker = null,
      requireDistinctPossessor = false,
      enforceInvalidCombo = true,
      invalidComboSet = targetObject.INVALID_COMBINATION_KEYS
    }) {
      const hasExplicitComboObjectPrefix = comboObjectPrefix !== undefined && comboObjectPrefix !== null && comboObjectPrefix !== "";
      const effectiveObjectPrefix = hasExplicitComboObjectPrefix ? comboObjectPrefix : targetObject.resolveComboValidationObj1({
        obj1: objectPrefix,
        obj2: indirectObjectMarker,
        derivationType,
        controllerObj1: controllerObjectMarker
      });
      const invalidCombo = enforceInvalidCombo && invalidComboSet.has(targetObject.getPers1Obj1Pers2Key(subjectPrefix, effectiveObjectPrefix, subjectSuffix));
      const constraintViolations = targetObject.computeConstraintViolationsCore({
        subjectPrefix,
        subjectSuffix,
        controllerPrefix: effectiveObjectPrefix,
        shouldApplyPersonAgreement: true
      });
      const samePerson = constraintViolations.personAgreementViolation;
      const hierarchyOrderViolation = constraintViolations.hierarchyOrderViolation;
      const subjectPossessorCollision = requireDistinctPossessor && isSamePers1Pers2Poseedor(subjectPrefix, subjectSuffix, possessivePrefix);
      const hideReflexive = !!(result && result.isReflexive && targetObject.getObjectCategory(objectPrefix) !== "reflexive");
      const shouldMask = !!(result?.error || hideReflexive || invalidCombo || samePerson || hierarchyOrderViolation || subjectPossessorCollision);
      const isError = !!(result?.error || invalidCombo || samePerson || hierarchyOrderViolation || subjectPossessorCollision);
      const diagnostics = [];
      if (result?.error) {
        const resultDiagnostics = getConjugationResultDiagnostics(result);
        if (resultDiagnostics.length) {
          diagnostics.push(...resultDiagnostics);
        } else {
          diagnostics.push(buildConjugationDiagnosticEntry(CONJUGATION_DIAGNOSTIC_IDS.resultError, "error", {
            source: "result"
          }));
        }
      }
      if (hideReflexive) {
        diagnostics.push(buildConjugationDiagnosticEntry(CONJUGATION_DIAGNOSTIC_IDS.reflexiveHidden, "masked", {
          source: "result"
        }));
      }
      if (invalidCombo) {
        diagnostics.push(buildConjugationDiagnosticEntry(CONJUGATION_DIAGNOSTIC_IDS.invalidCombo, "error", {
          source: "grammar-constraint"
        }));
      }
      if (samePerson) {
        diagnostics.push(buildConjugationDiagnosticEntry(CONJUGATION_DIAGNOSTIC_IDS.personAgreement, "error", {
          source: "grammar-constraint"
        }));
      }
      if (hierarchyOrderViolation) {
        diagnostics.push(buildConjugationDiagnosticEntry(CONJUGATION_DIAGNOSTIC_IDS.hierarchyOrder, "error", {
          source: "grammar-constraint"
        }));
      }
      if (subjectPossessorCollision) {
        diagnostics.push(buildConjugationDiagnosticEntry(CONJUGATION_DIAGNOSTIC_IDS.subjectPossessorCollision, "error", {
          source: "grammar-constraint"
        }));
      }
      const hasRenderableResult = Boolean(getConjugationRenderableSurface(result));
      const dedupedDiagnostics = dedupeConjugationDiagnosticEntries(diagnostics);
      return {
        shouldMask,
        isError,
        invalidCombo,
        samePerson,
        hierarchyOrderViolation,
        subjectPossessorCollision,
        hideReflexive,
        hasRenderableResult,
        hasVisibleResult: hasRenderableResult && !shouldMask,
        availabilityState: resolveConjugationAvailabilityState({
          hasRenderableResult,
          shouldMaskRow: shouldMask
        }),
        diagnostics: dedupedDiagnostics,
        diagnosticIds: dedupedDiagnostics.map(entry => entry.id)
      };
    }
    function getLocativoTemporalMaskState({
      result,
      objectPrefix = ""
    }) {
      return getConjugationMaskState({
        result,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix,
        controllerObjectMarker: "",
        enforceInvalidCombo: false
      });
    }
    function resolveNominalAvailabilityProbeSelection({
      tenseValue = "",
      patientivoSource = null,
      verbMeta = null,
      objectPrefix = "",
      indirectObjectMarker = "",
      thirdObjectMarker = ""
    } = {}) {
      const resolvedObjectPrefix = String(objectPrefix || "");
      const resolvedIndirectObjectMarker = String(indirectObjectMarker || "");
      const resolvedThirdObjectMarker = String(thirdObjectMarker || "");
      let normalizedObjectPrefix = resolvedObjectPrefix;
      const resolvedPatientivoSource = String(patientivoSource || "");
      const isPatientivoTroncoProbe = String(tenseValue || "") === "patientivo" && resolvedPatientivoSource === "tronco-verbal";
      if (isPatientivoTroncoProbe && !normalizedObjectPrefix && verbMeta?.hasImpersonalTaPrefix !== true) {
        const baseObjectSlots = Number(targetObject.getBaseObjectSlots(verbMeta));
        const isTransitiveBase = Number.isFinite(baseObjectSlots) && baseObjectSlots > 0 || verbMeta?.isMarkedTransitive === true || verbMeta?.isTaFusion === true;
        if (isTransitiveBase) {
          normalizedObjectPrefix = "ta";
        }
      }
      return {
        objectPrefix: normalizedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker,
        wasNormalized: normalizedObjectPrefix !== resolvedObjectPrefix
      };
    }
    function resolveHasNonspecificValence(meta) {
      return Boolean(meta?.hasNonspecificValence || meta?.hasNonactiveNonspecificValence);
    }
    function buildMorphologyMetaOptions(meta, overrides = {}) {
      return {
        hasSlashMarker: meta?.hasSlashMarker,
        hasSuffixSeparator: meta?.hasSuffixSeparator,
        hasLeadingDash: meta?.hasLeadingDash,
        hasBoundMarker: meta?.hasBoundMarker,
        hasCompoundMarker: meta?.hasCompoundMarker,
        hasImpersonalTaPrefix: meta?.hasImpersonalTaPrefix,
        hasOptionalSupportiveI: meta?.hasOptionalSupportiveI,
        optionalSupportiveLetter: meta?.optionalSupportiveLetter || "",
        hasNonspecificValence: resolveHasNonspecificValence(meta),
        isTaFusion: meta?.isTaFusion,
        indirectObjectMarker: meta?.indirectObjectMarker,
        isUnderlyingTransitive: meta?.isMarkedTransitive || meta?.isTaFusion,
        sourcePrefix: meta?.sourcePrefix || meta?.canonical?.sourcePrefix || "",
        sourceBase: meta?.sourceBase || meta?.canonicalRuleBase || meta?.canonical?.sourceBase || "",
        rootPlusYaBase: meta?.rootPlusYaBase,
        rootPlusYaBasePronounceable: meta?.rootPlusYaBasePronounceable,
        ...overrides
      };
    }
    function buildObjectAllomorphyMetaOptions(meta, overrides = {}) {
      return {
        isTaFusion: meta?.isTaFusion,
        hasOptionalSupportiveI: meta?.hasOptionalSupportiveI,
        optionalSupportiveLetter: meta?.optionalSupportiveLetter || "",
        supportivePrecedingSurface: targetObject.buildSupportivePrecedingSurfaceFromVerbMeta(meta, meta?.sourceRawVerb || meta?.verb || "", meta?.analysisVerb || meta?.verb || ""),
        hasNonspecificValence: resolveHasNonspecificValence(meta),
        hasSlashMarker: meta?.hasSlashMarker,
        hasBoundMarker: meta?.hasBoundMarker,
        directionalPrefix: meta?.directionalPrefix,
        ...overrides
      };
    }
    function buildNonspecificAllomorphyOptions(meta, overrides = {}) {
      return {
        obj2: meta?.indirectObjectMarker,
        isTaFusion: meta?.isTaFusion,
        hasOptionalSupportiveI: meta?.hasOptionalSupportiveI,
        optionalSupportiveLetter: meta?.optionalSupportiveLetter || "",
        supportivePrecedingSurface: targetObject.buildSupportivePrecedingSurfaceFromVerbMeta(meta, meta?.sourceRawVerb || meta?.verb || "", meta?.analysisVerb || meta?.verb || ""),
        hasNonspecificValence: resolveHasNonspecificValence(meta),
        hasSlashMarker: meta?.hasSlashMarker,
        hasBoundMarker: meta?.hasBoundMarker,
        directionalPrefix: meta?.directionalPrefix,
        ...overrides
      };
    }
    function shouldDelaySlashSupportiveIAllomorphyForPret({
      parsedVerb = null,
      tense = "",
      objectPrefix = "",
      indirectObjectMarker = "",
      thirdObjectMarker = ""
    } = {}) {
      if (!parsedVerb?.hasSlashMarker || !parsedVerb?.hasBoundMarker || !parsedVerb?.hasOptionalSupportiveI) {
        return false;
      }
      const supportiveLetter = targetObject.resolveOptionalSupportiveLetter(parsedVerb.optionalSupportiveLetter, parsedVerb.analysisVerb || parsedVerb.verb || "");
      if (supportiveLetter !== "i") {
        return false;
      }
      const isPretLikeTense = targetObject.isPerfectiveTense(tense);
      if (!isPretLikeTense) {
        return false;
      }
      return targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(objectPrefix) || targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(indirectObjectMarker) || targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(thirdObjectMarker) || resolveHasNonspecificValence(parsedVerb);
    }
    function applyNounForwardDerivation({
      verbMeta = null,
      verb = "",
      analysisVerb = "",
      objectPrefix = ""
    }) {
      const nounSourceModel = targetObject.buildVerbDerivedNominalSourceModel({
        ...(verbMeta && typeof verbMeta === "object" ? verbMeta : {}),
        sourceRawVerb: verbMeta?.sourceRawVerb || verb,
        verb,
        analysisVerb,
        objectPrefix
      });
      const directSourceChain = targetObject.buildFullDerivationSourceChain(verbMeta, verb, analysisVerb);
      const directBaseVerb = targetObject.normalizeDerivationStemValue(directSourceChain?.baseVerb || analysisVerb || verb || "");
      const directBaseStemSpec = directBaseVerb ? targetObject.buildLiteralMorphStemSpec(directBaseVerb, {
        sourceBase: targetObject.normalizeRuleBase(directSourceChain?.sourceBase || directBaseVerb)
      }) : null;
      const directStemSpec = directBaseStemSpec ? targetObject.applySourceChainStemSpecByPolicy(directBaseStemSpec, directBaseVerb, directSourceChain, {
        policy: targetObject.FULL_SOURCE_CHAIN_REALIZATION_POLICY
      }) : null;
      const directStem = targetObject.realizeMorphStemSpec(directStemSpec, verb || "");
      const directAnalysisVerb = directStem || directBaseVerb || analysisVerb || verb;
      const suppletiveStemSet = targetObject.getSuppletiveStemSet(verbMeta);
      const directionalPrefix = verbMeta?.directionalPrefix || "";
      const derivationType = Object.values(targetObject.DERIVATION_TYPE).includes(verbMeta?.derivationType) ? verbMeta.derivationType : targetObject.DERIVATION_TYPE.direct;
      const buildStructuredTarget = ({
        verb: targetVerb = "",
        analysisVerb: targetAnalysisVerb = "",
        stemSpec = null,
        provenance = null
      } = {}) => ({
        verb: targetVerb,
        analysisVerb: targetAnalysisVerb || targetVerb,
        stemSpec: stemSpec && typeof stemSpec === "object" && stemSpec.kind ? stemSpec : targetObject.buildLiteralMorphStemSpec(targetVerb),
        sourceModel: nounSourceModel,
        runtimeObjectPrefix: String(objectPrefix || ""),
        derivationProvenance: provenance || null
      });
      const fallbackTargets = [buildStructuredTarget({
        verb: directStem || verb,
        analysisVerb: directAnalysisVerb,
        stemSpec: directStemSpec || targetObject.buildLiteralMorphStemSpec(directStem || verb),
        provenance: {
          derivationType,
          mode: "direct"
        }
      })];
      const fallback = {
        blocked: false,
        verb: directStem || verb,
        analysisVerb: directAnalysisVerb,
        isYawi: verbMeta?.isYawi === true,
        isWeya: verbMeta?.isWeya === true,
        suppletiveStemSet,
        sourceModel: nounSourceModel,
        targets: fallbackTargets,
        stemTargets: fallbackTargets
      };
      const forwardConfig = targetObject.getForwardDerivationConfig(derivationType);
      if (!forwardConfig) {
        return fallback;
      }
      const forwardDerivation = targetObject.applySelectedForwardDerivation({
        derivationType,
        derivationOptions: targetObject.buildDerivationAvailabilityCoreOptions({
          verb,
          analysisVerb,
          objectPrefix,
          verbMeta,
          suppletiveStemSet
        }),
        enabled: true
      });
      if (forwardDerivation.blocked) {
        return {
          ...fallback,
          blocked: true
        };
      }
      const derivedVerb = forwardDerivation.verb || fallback.verb;
      const derivedAnalysisVerb = forwardDerivation.analysisVerb || fallback.analysisVerb;
      const derivedStemList = targetObject.uniqueNonEmptyValues(targetObject.resolveDerivedStemList(forwardDerivation[forwardConfig.resultField], derivedVerb));
      const derivedStemSpecs = Array.isArray(forwardDerivation[forwardConfig.resultSpecField]) ? targetObject.getUniqueMorphStemSpecs(forwardDerivation[forwardConfig.resultSpecField]) : [];
      const targets = derivedStemList.length ? derivedStemList.map((stem, index) => buildStructuredTarget({
        verb: stem,
        analysisVerb: targetObject.stripDirectionalPrefixFromStem(stem, directionalPrefix),
        stemSpec: derivedStemSpecs[index] || targetObject.buildLiteralMorphStemSpec(stem),
        provenance: {
          derivationType,
          mode: "forward",
          configId: forwardConfig.id || "",
          sourceField: forwardConfig.resultField || ""
        }
      })) : [buildStructuredTarget({
        verb: derivedVerb,
        analysisVerb: derivedAnalysisVerb || derivedVerb,
        stemSpec: derivedStemSpecs[0] || targetObject.buildLiteralMorphStemSpec(derivedVerb),
        provenance: {
          derivationType,
          mode: "forward",
          configId: forwardConfig.id || "",
          sourceField: forwardConfig.resultField || ""
        }
      })];
      return {
        blocked: false,
        verb: derivedVerb,
        analysisVerb: derivedAnalysisVerb,
        isYawi: forwardDerivation.isYawi ?? fallback.isYawi,
        isWeya: false,
        suppletiveStemSet: forwardDerivation.suppletiveStemSet ?? suppletiveStemSet,
        sourceModel: nounSourceModel,
        targets,
        stemTargets: targets
      };
    }
    function getNounNonactiveRuleBase(baseVerb = "", verbMeta = null) {
      const derivationType = Object.values(targetObject.DERIVATION_TYPE).includes(verbMeta?.derivationType) ? verbMeta.derivationType : targetObject.DERIVATION_TYPE.direct;
      if (targetObject.getForwardDerivationConfig(derivationType)) {
        return targetObject.normalizeRuleBase(baseVerb || "");
      }
      return targetObject.resolveNonactiveRuleBase(baseVerb, verbMeta);
    }
    function getNounForwardStemTargets(nounForwardDerivation, fallbackVerb = "", fallbackAnalysisVerb = "") {
      const stemTargets = Array.isArray(nounForwardDerivation?.targets) ? nounForwardDerivation.targets.filter(entry => entry && entry.verb) : Array.isArray(nounForwardDerivation?.stemTargets) ? nounForwardDerivation.stemTargets.filter(entry => entry && entry.verb) : [];
      if (stemTargets.length) {
        return stemTargets;
      }
      if (!fallbackVerb) {
        return [];
      }
      return [targetObject.buildNominalFormEntry(fallbackVerb, "", {
        analysisVerb: fallbackAnalysisVerb || fallbackVerb,
        sourceModel: nounForwardDerivation?.sourceModel || null
      })].map(entry => ({
        verb: entry.verb,
        analysisVerb: entry.analysisVerb || fallbackAnalysisVerb || fallbackVerb,
        stemSpec: targetObject.buildLiteralMorphStemSpec(entry.verb),
        sourceModel: nounForwardDerivation?.sourceModel || null,
        runtimeObjectPrefix: "",
        derivationProvenance: null
      }));
    }
    function buildNounForwardStemContexts({
      stemTargets = [],
      objectPrefix = "",
      verbMeta = null,
      indirectObjectMarker = "",
      thirdObjectMarker = ""
    }) {
      return (Array.isArray(stemTargets) ? stemTargets : []).map(stemTarget => {
        const targetVerb = stemTarget?.verb || "";
        const targetAnalysisVerb = stemTarget?.analysisVerb || targetVerb;
        const targetStemSpec = stemTarget?.stemSpec && typeof stemTarget.stemSpec === "object" && stemTarget.stemSpec.kind ? stemTarget.stemSpec : targetObject.buildLiteralMorphStemSpec(targetVerb);
        if (!targetVerb) {
          return null;
        }
        const nonspecificAllomorphy = targetObject.applyNonspecificObjectAllomorphy({
          verb: targetVerb,
          analysisVerb: targetAnalysisVerb,
          obj1: objectPrefix,
          ...buildNonspecificAllomorphyOptions(verbMeta),
          obj2: indirectObjectMarker,
          obj3: thirdObjectMarker
        });
        return {
          verb: nonspecificAllomorphy.verb || targetVerb,
          analysisVerb: nonspecificAllomorphy.analysisVerb || targetAnalysisVerb,
          morphologyObjectPrefix: nonspecificAllomorphy.obj1 || objectPrefix,
          runtimeObjectPrefix: stemTarget?.runtimeObjectPrefix || objectPrefix,
          stemSpec: (nonspecificAllomorphy.verb || targetVerb) === targetVerb ? targetStemSpec : targetObject.buildLiteralMorphStemSpec(nonspecificAllomorphy.verb || targetVerb),
          sourceModel: stemTarget?.sourceModel || null,
          derivationProvenance: stemTarget?.derivationProvenance || null
        };
      }).filter(entry => entry && entry.verb);
    }
    function buildVerbDerivedNominalBuilderContextDiagnostic({
      id = "verb-derived-nominal-context-blocked",
      message = "La generacion no produjo una forma.",
      details = null,
      failedLayer = "",
      contractLayer = "",
      routeStage = ""
    } = {}) {
      const normalizedId = String(id || "verb-derived-nominal-context-blocked").trim();
      const layerContract = getVerbDerivedNominalBuilderContextFailedLayerContract(routeStage);
      return {
        id: normalizedId,
        code: normalizedId.toUpperCase().replace(/-/g, "_"),
        severity: "error",
        message: String(message || "La generacion no produjo una forma.").trim(),
        details: details && typeof details === "object" ? details : null,
        failedLayer: String(failedLayer || layerContract.failedLayer).trim(),
        contractLayer: String(contractLayer || layerContract.contractLayer).trim(),
        routeFamily: "verb-derived-nominal-builder-context",
        routeStage: String(routeStage || "").trim()
      };
    }
    function getVerbDerivedNominalBuilderContextFailedLayerContract(routeStage = "") {
      const stage = String(routeStage || "").trim();
      if (/parse-input|orthography|spelling|letters?|characters?/i.test(stage)) {
        return {
          failedLayer: "orthography",
          contractLayer: "orthographyFrame"
        };
      }
      if (/parse-stem|stem-context|stem|source-stem/i.test(stage)) {
        return {
          failedLayer: "stem",
          contractLayer: "stemFrame"
        };
      }
      if (/subject|object-slot|object|possess|participant|agreement|valence|state/i.test(stage)) {
        return {
          failedLayer: "agreement",
          contractLayer: "participantFrame"
        };
      }
      if (/output|result|surface|no-output/i.test(stage)) {
        return {
          failedLayer: "output",
          contractLayer: "resultFrame"
        };
      }
      return {
        failedLayer: "route",
        contractLayer: "routeContract"
      };
    }
    function getVerbDerivedNominalBuilderContextAndrewsRefs(kind = "") {
      const refs = ["Andrews Lesson 5", "Andrews Lesson 6", "Andrews Lesson 7"];
      switch (String(kind || "")) {
        case "instrumentivo":
          refs.push("Andrews 36.6");
          break;
        case "calificativo-instrumentivo":
          refs.push("Andrews 36.10-36.11");
          break;
        case "locativo-temporal":
          refs.push("Andrews 46.4");
          break;
        default:
          refs.push("Andrews Lessons 35-37");
          break;
      }
      if (targetObject.isPredicateNominalTense(kind)) {
        refs.push("Andrews 36.6 note 2");
      }
      return refs.filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function normalizeVerbDerivedNominalBuilderContextDiagnostics(diagnostics = [], fallbackDiagnostic = null) {
      const entries = [...(Array.isArray(diagnostics) ? diagnostics : []), ...(fallbackDiagnostic ? [fallbackDiagnostic] : [])];
      if (typeof targetObject.normalizeGrammarDiagnosticContractEntries === "function") {
        return targetObject.normalizeGrammarDiagnosticContractEntries(entries);
      }
      return entries.filter(entry => entry && typeof entry === "object");
    }
    function applyVerbDerivedNominalBuilderContextDiagnosticLayerMetadata(diagnostics = [], routeStage = "") {
      const layerContract = getVerbDerivedNominalBuilderContextFailedLayerContract(routeStage);
      return (Array.isArray(diagnostics) ? diagnostics : []).map(entry => {
        if (!entry || typeof entry !== "object") {
          return entry;
        }
        return {
          ...entry,
          failedLayer: entry.failedLayer || layerContract.failedLayer,
          contractLayer: entry.contractLayer || layerContract.contractLayer,
          routeFamily: entry.routeFamily || "verb-derived-nominal-builder-context",
          routeStage: entry.routeStage || String(routeStage || "").trim()
        };
      });
    }
    function attachVerbDerivedNominalBuilderContextContract(context = null, {
      kind = "",
      rawVerb = "",
      subjectPrefix = "",
      subjectSuffix = "",
      objectPrefix = "",
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      combinedMode = "",
      slotPlanBundle = null,
      routeStage = "build-context",
      diagnosticId = "verb-derived-nominal-context-blocked",
      message = "La generacion no produjo una forma.",
      diagnosticDetails = null,
      enumerable = false
    } = {}) {
      const output = context && typeof context === "object" ? context : {};
      const nominalKind = String(kind || output.kind || output.nounSourceModel?.nounDerivationKind || "").trim();
      const blocked = output.error === true;
      const fallbackDiagnostic = buildVerbDerivedNominalBuilderContextDiagnostic({
        id: diagnosticId,
        message,
        details: diagnosticDetails,
        routeStage
      });
      const diagnostics = applyVerbDerivedNominalBuilderContextDiagnosticLayerMetadata(normalizeVerbDerivedNominalBuilderContextDiagnostics(output.diagnostics, blocked ? fallbackDiagnostic : null), routeStage);
      if (!Object.prototype.hasOwnProperty.call(output, "diagnostics")) {
        Object.defineProperty(output, "diagnostics", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: diagnostics
        });
      }
      const ok = !blocked;
      const grammarFrame = typeof targetObject.buildGrammarFrame === "function" ? targetObject.buildGrammarFrame({
        authorityFrame: typeof targetObject.buildGrammarAuthorityFrame === "function" ? targetObject.buildGrammarAuthorityFrame({
          sourceEvidence: {
            kind: "verb-derived-nominal-builder-context",
            nominalKind,
            sourceModel: output.nounSourceModel || null
          },
          evidenceStatus: ok ? "context-built" : "blocked",
          andrewsRefs: getVerbDerivedNominalBuilderContextAndrewsRefs(nominalKind),
          supported: ok
        }) : null,
        unitFrame: {
          unitKind: "agreement-builder-context",
          outputKind: "verb-derived-nominal-builder-context",
          generationRoute: nominalKind
        },
        orthographyFrame: {
          surface: "",
          surfaceForms: [],
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: {
          objectPrefix: String(output.objectPrefix || objectPrefix || ""),
          indirectObjectMarker: String(output.indirectObjectMarker || indirectObjectMarker || ""),
          thirdObjectMarker: String(output.thirdObjectMarker || thirdObjectMarker || ""),
          slotPlanBundle: output.slotPlanBundle || slotPlanBundle || null
        },
        stemFrame: {
          stem: String(output.verb || ""),
          analysisStem: String(output.analysisVerb || ""),
          sourceRawVerb: String(rawVerb || output.rawVerb || ""),
          sourceModel: output.nounSourceModel || null,
          forwardStemTargets: Array.isArray(output.forwardStemTargets) ? output.forwardStemTargets : [],
          forwardStemContexts: Array.isArray(output.forwardStemContexts) ? output.forwardStemContexts : []
        },
        nuclearClauseFrame: {
          clauseKind: "nominal-nuclear-clause",
          sourceUnitKind: "verbal-nuclear-clause",
          predicateInsideParentheses: true,
          subjectConnectorsOutsideParentheses: true,
          tenseSlot: false
        },
        participantFrame: {
          subject: {
            prefix: String(output.subjectPrefix || subjectPrefix || ""),
            suffix: String(output.subjectSuffix || subjectSuffix || "")
          },
          object: {
            prefix: String(output.objectPrefix || objectPrefix || ""),
            indirectObjectMarker: String(output.indirectObjectMarker || indirectObjectMarker || ""),
            thirdObjectMarker: String(output.thirdObjectMarker || thirdObjectMarker || "")
          }
        },
        inflectionFrame: {
          nominalKind,
          combinedMode: String(output.combinedMode || combinedMode || "")
        },
        routeContract: typeof targetObject.buildGrammarRouteContractFrame === "function" ? targetObject.buildGrammarRouteContractFrame({
          routeFamily: "verb-derived-nominal-builder-context",
          routeStage,
          sourceContract: {
            rawVerb: String(rawVerb || output.rawVerb || ""),
            nominalKind
          },
          targetContract: {
            outputKind: "verb-derived-nominal-builder-context",
            generationRoute: nominalKind,
            contextReady: ok
          },
          generationAllowed: ok,
          blockingDiagnostics: ok ? [] : diagnostics
        }) : null,
        astFrame: null,
        resultFrame: typeof targetObject.buildGrammarResultFrame === "function" ? targetObject.buildGrammarResultFrame({
          ok,
          surface: "",
          surfaceForms: [],
          outputKind: "verb-derived-nominal-builder-context",
          generationRoute: nominalKind,
          sourceInput: String(rawVerb || output.rawVerb || "")
        }) : null,
        diagnosticFrame: typeof targetObject.buildGrammarDiagnosticFrame === "function" ? targetObject.buildGrammarDiagnosticFrame({
          status: ok ? "context-built" : "blocked",
          diagnostics,
          blockers: ok ? [] : diagnostics
        }) : null
      }) : null;
      const resultContract = typeof targetObject.buildGrammarResultContract === "function" ? targetObject.buildGrammarResultContract({
        result: output,
        grammarFrame
      }) : {
        ok,
        surface: "",
        frames: grammarFrame,
        diagnostics
      };
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
        }
      });
      return output;
    }
    function buildVerbDerivedNominalBuilderContextBlocked({
      kind = "",
      rawVerb = "",
      subjectPrefix = "",
      subjectSuffix = "",
      objectPrefix = "",
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      combinedMode = "",
      slotPlanBundle = null,
      routeStage = "blocked",
      diagnosticId = "verb-derived-nominal-context-blocked",
      message = "La generacion no produjo una forma.",
      diagnosticDetails = null
    } = {}) {
      return attachVerbDerivedNominalBuilderContextContract({
        error: true
      }, {
        kind,
        rawVerb,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        combinedMode,
        slotPlanBundle,
        routeStage,
        diagnosticId,
        message,
        diagnosticDetails
      });
    }
    function buildVerbDerivedNominalBuilderContext({
      kind = "",
      rawVerb = "",
      verbMeta = null,
      subjectPrefix = "",
      subjectSuffix = "",
      objectPrefix = "",
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      actionNounStemUse = "",
      combinedMode = "",
      requireNonanimateSubject = false
    } = {}) {
      const invalidCharacters = targetObject.getInvalidVerbCharacters(rawVerb);
      const invalidLetters = targetObject.getInvalidVerbLetters(rawVerb);
      const invalidStructure = targetObject.getInvalidVerbStructure(rawVerb);
      if (invalidCharacters.length || invalidLetters.length || invalidStructure) {
        return buildVerbDerivedNominalBuilderContextBlocked({
          kind,
          rawVerb,
          subjectPrefix,
          subjectSuffix,
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          combinedMode,
          routeStage: "parse-input",
          diagnosticId: "verb-derived-nominal-context-invalid-input",
          message: "Entrada verbal incompatible con la ruta nominal.",
          diagnosticDetails: {
            invalidCharacters,
            invalidLetters,
            invalidStructure
          }
        });
      }
      let verb = String(verbMeta?.verb || "");
      if (!verb || !targetObject.VOWEL_RE.test(verb) || !targetObject.VOWEL_END_RE.test(verb)) {
        return buildVerbDerivedNominalBuilderContextBlocked({
          kind,
          rawVerb,
          subjectPrefix,
          subjectSuffix,
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          combinedMode,
          routeStage: "parse-stem",
          diagnosticId: "verb-derived-nominal-context-invalid-stem",
          message: "La ruta nominal requiere un tronco verbal con vocal final.",
          diagnosticDetails: {
            verb,
            hasVowel: targetObject.VOWEL_RE.test(verb),
            hasFinalVowel: targetObject.VOWEL_END_RE.test(verb)
          }
        });
      }
      if (requireNonanimateSubject && !isNonanimatePers1Pers2(subjectPrefix, subjectSuffix)) {
        return buildVerbDerivedNominalBuilderContextBlocked({
          kind,
          rawVerb,
          subjectPrefix,
          subjectSuffix,
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          combinedMode,
          routeStage: "subject-gate",
          diagnosticId: "verb-derived-nominal-context-nonanimate-subject-required",
          message: "Esta ruta nominal requiere sujeto no animado."
        });
      }
      let resolvedObjectPrefix = String(objectPrefix || "");
      let resolvedIndirectObjectMarker = String(indirectObjectMarker || "");
      let resolvedThirdObjectMarker = String(thirdObjectMarker || "");
      if (verbMeta?.hasImpersonalTaPrefix) {
        resolvedObjectPrefix = "";
        resolvedIndirectObjectMarker = "";
        resolvedThirdObjectMarker = "";
      }
      const analysisVerb = verbMeta?.analysisVerb || verb;
      const slotOptions = combinedMode ? {
        combinedMode
      } : {};
      const slotPlanBundle = targetObject.getNounObjectSlotPlansFromMeta(verbMeta, kind, slotOptions);
      const selectedBySlot = {
        object: resolvedObjectPrefix,
        object2: resolvedIndirectObjectMarker,
        object3: resolvedThirdObjectMarker
      };
      const hasOverflowedSlotSelection = targetObject.NOUN_OBJECT_SLOT_SCHEMA.slice(slotPlanBundle.slotPlans.length).some(slotMeta => Boolean(selectedBySlot[slotMeta.id]));
      const hasInvalidSlotSelection = slotPlanBundle.slotPlans.some(slotPlan => !slotPlan.toggleValues.includes(selectedBySlot[slotPlan.id] || ""));
      if (hasOverflowedSlotSelection || hasInvalidSlotSelection) {
        return buildVerbDerivedNominalBuilderContextBlocked({
          kind,
          rawVerb,
          subjectPrefix,
          subjectSuffix,
          objectPrefix: resolvedObjectPrefix,
          indirectObjectMarker: resolvedIndirectObjectMarker,
          thirdObjectMarker: resolvedThirdObjectMarker,
          combinedMode,
          slotPlanBundle,
          routeStage: "object-slot-gate",
          diagnosticId: "verb-derived-nominal-context-invalid-object-slot",
          message: "La seleccion de objeto no coincide con las ranuras de esta ruta nominal.",
          diagnosticDetails: {
            selectedBySlot,
            hasOverflowedSlotSelection,
            hasInvalidSlotSelection
          }
        });
      }
      const nounSourceModel = targetObject.buildVerbDerivedNominalSourceModel({
        ...(verbMeta && typeof verbMeta === "object" ? verbMeta : {}),
        sourceRawVerb: rawVerb,
        verb,
        analysisVerb,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker,
        actionNounStemUse,
        combinedMode,
        sourceSubjectPrefix: subjectPrefix,
        sourceSubjectSuffix: subjectSuffix
      }, kind);
      const nounForwardDerivation = applyNounForwardDerivation({
        verbMeta,
        verb,
        analysisVerb,
        objectPrefix: resolvedObjectPrefix
      });
      if (nounForwardDerivation.blocked) {
        return buildVerbDerivedNominalBuilderContextBlocked({
          kind,
          rawVerb,
          subjectPrefix,
          subjectSuffix,
          objectPrefix: resolvedObjectPrefix,
          indirectObjectMarker: resolvedIndirectObjectMarker,
          thirdObjectMarker: resolvedThirdObjectMarker,
          combinedMode,
          slotPlanBundle,
          routeStage: "forward-derivation-gate",
          diagnosticId: "verb-derived-nominal-context-forward-derivation-blocked",
          message: "La derivacion nominal no produjo un tronco de avance.",
          diagnosticDetails: nounForwardDerivation
        });
      }
      const forwardStemTargets = getNounForwardStemTargets(nounForwardDerivation, verb, analysisVerb);
      const forwardStemContexts = buildNounForwardStemContexts({
        stemTargets: forwardStemTargets,
        objectPrefix: resolvedObjectPrefix,
        verbMeta,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker
      });
      if (!forwardStemContexts.length) {
        return buildVerbDerivedNominalBuilderContextBlocked({
          kind,
          rawVerb,
          subjectPrefix,
          subjectSuffix,
          objectPrefix: resolvedObjectPrefix,
          indirectObjectMarker: resolvedIndirectObjectMarker,
          thirdObjectMarker: resolvedThirdObjectMarker,
          combinedMode,
          slotPlanBundle,
          routeStage: "forward-stem-context-gate",
          diagnosticId: "verb-derived-nominal-context-no-forward-stem",
          message: "La ruta nominal no encontro un tronco aplicable."
        });
      }
      return attachVerbDerivedNominalBuilderContextContract({
        error: false,
        rawVerb,
        verbMeta,
        verb,
        analysisVerb,
        directionalPrefix: verbMeta?.directionalPrefix || "",
        nounSourceModel,
        nounForwardDerivation,
        forwardStemTargets,
        forwardStemContexts,
        derivedIsYawi: nounForwardDerivation.isYawi,
        derivedIsWeya: nounForwardDerivation.isWeya,
        derivationIsTransitive: targetObject.isNonactiveTransitiveByObj1(resolvedObjectPrefix || resolvedIndirectObjectMarker || resolvedThirdObjectMarker, verbMeta),
        resolvedDirectionalRuleMode: targetObject.resolveDirectionalRuleMode(verbMeta, combinedMode === targetObject.COMBINED_MODE.nonactive ? {
          isNonactive: true
        } : {}),
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker,
        combinedMode
      }, {
        kind,
        rawVerb,
        subjectPrefix,
        subjectSuffix,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker,
        combinedMode,
        slotPlanBundle,
        routeStage: "build-context"
      });
    }
    function collapseCalificativoMarkerEcho({
      form = "",
      morphologyObjectPrefix = "",
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      enable = false
    }) {
      const sourceForm = String(form || "");
      if (!enable || !sourceForm) {
        return sourceForm;
      }
      const markerValues = [indirectObjectMarker || "", thirdObjectMarker || ""].filter(Boolean);
      if (!markerValues.length) {
        return sourceForm;
      }
      const echoMarker = markerValues[markerValues.length - 1] || "";
      if (!echoMarker || !targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(echoMarker)) {
        return sourceForm;
      }
      const markerChain = composeObj1Chain({
        obj1: morphologyObjectPrefix || "",
        markers: markerValues,
        pers1: ""
      });
      if (!markerChain) {
        return sourceForm;
      }
      const duplicatedPrefix = `${markerChain}${echoMarker}`;
      if (!sourceForm.startsWith(duplicatedPrefix)) {
        return sourceForm;
      }
      return `${markerChain}${sourceForm.slice(duplicatedPrefix.length)}`;
    }
    function buildCalificativoInstrumentivoPredicateStemSpec(stemSpec = null, fallbackStem = "") {
      const resolvedBaseSpec = stemSpec && typeof stemSpec === "object" && stemSpec.kind ? stemSpec : targetObject.buildLiteralMorphStemSpec(fallbackStem);
      const realizedBaseStem = targetObject.realizeMorphStemSpec(resolvedBaseSpec, fallbackStem);
      const baseLetters = targetObject.splitVerbLetters(realizedBaseStem);
      if ((baseLetters[baseLetters.length - 1] || "") === "m") {
        baseLetters[baseLetters.length - 1] = "n";
      }
      const baseStem = targetObject.normalizeDerivationStemValue(baseLetters.join(""));
      if (!baseStem) {
        return null;
      }
      return targetObject.buildAppendMorphStemSpec(baseStem, "ka", {
        sourceBase: baseStem,
        sourceSuffix: "ka"
      });
    }

    const api = {};
    api.cloneAgreementLessonRecord = cloneAgreementLessonRecord;
    Object.defineProperty(api, "LESSON23_VERB_OBJECTS_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON23_VERB_OBJECTS_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON23_VERB_OBJECTS_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON23_VERB_OBJECTS_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON23_OBJECT_KIND_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON23_OBJECT_KIND_FRAME; },
    });
    Object.defineProperty(api, "LESSON23_MULTIPLE_VALENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON23_MULTIPLE_VALENCE_FRAME; },
    });
    Object.defineProperty(api, "LESSON23_VALENCE_RULE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON23_VALENCE_RULE_FRAME; },
    });
    Object.defineProperty(api, "LESSON23_FORMULA_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON23_FORMULA_FRAME; },
    });
    Object.defineProperty(api, "LESSON23_OBJECT_SEQUENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON23_OBJECT_SEQUENCE_FRAME; },
    });
    Object.defineProperty(api, "LESSON23_VERB_OBJECTS_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON23_VERB_OBJECTS_SUBSECTION_INVENTORY; },
    });
    api.getLesson23VerbObjectsSubsectionInventory = getLesson23VerbObjectsSubsectionInventory;
    api.buildLesson23VerbObjectsPursuitFrame = buildLesson23VerbObjectsPursuitFrame;
    api.getOptativePers1Pers2Info = getOptativePers1Pers2Info;
    api.getNonOptativePers1Pers2Info = getNonOptativePers1Pers2Info;
    api.isOptativePers1Pers2IdentityContext = isOptativePers1Pers2IdentityContext;
    api.isNonOptativePers1Pers2IdentityContext = isNonOptativePers1Pers2IdentityContext;
    api.stripPers1Pers2IdentityMode = stripPers1Pers2IdentityMode;
    api.getPers1Pers2Info = getPers1Pers2Info;
    api.getObj1PersonInfo = getObj1PersonInfo;
    api.isPers1Obj1SamePersonAcrossNumber = isPers1Obj1SamePersonAcrossNumber;
    api.isPers1Obj1HierarchyOrderViolation = isPers1Obj1HierarchyOrderViolation;
    api.isPers1Obj1Reflexivo = isPers1Obj1Reflexivo;
    api.applyPassiveImpersonal = applyPassiveImpersonal;
    api.getPassiveSubjectOverride = getPassiveSubjectOverride;
    api.applyObj2ToObj1Chain = applyObj2ToObj1Chain;
    api.parseProjectiveMarkerChain = parseProjectiveMarkerChain;
    api.shortenObj1KiBeforePers1 = shortenObj1KiBeforePers1;
    api.composeObj1Chain = composeObj1Chain;
    api.isSpecificProjectivePrefix = isSpecificProjectivePrefix;
    api.isNonspecificProjectivePrefix = isNonspecificProjectivePrefix;
    api.getProjectiveHierarchyRank = getProjectiveHierarchyRank;
    api.normalizeValenceMarkerOrder = normalizeValenceMarkerOrder;
    api.reorderObj1Obj2ByHierarchy = reorderObj1Obj2ByHierarchy;
    api.resolveObj1Obj2Positions = resolveObj1Obj2Positions;
    api.resolveDisplayObj1Obj2 = resolveDisplayObj1Obj2;
    api.getPoseedorPrefixForPers1Pers2 = getPoseedorPrefixForPers1Pers2;
    api.getPoseedorPersonInfo = getPoseedorPersonInfo;
    api.isSamePers1Pers2Poseedor = isSamePers1Pers2Poseedor;
    api.isNonanimatePers1Pers2 = isNonanimatePers1Pers2;
    Object.defineProperty(api, "CONJUGATION_AVAILABILITY_STATE", {
        configurable: true,
        enumerable: true,
        get() { return CONJUGATION_AVAILABILITY_STATE; },
        set(value) { CONJUGATION_AVAILABILITY_STATE = value; },
    });
    Object.defineProperty(api, "CONJUGATION_DIAGNOSTIC_IDS", {
        configurable: true,
        enumerable: true,
        get() { return CONJUGATION_DIAGNOSTIC_IDS; },
        set(value) { CONJUGATION_DIAGNOSTIC_IDS = value; },
    });
    Object.defineProperty(api, "CONJUGATION_DIAGNOSTIC_DISPLAY_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return CONJUGATION_DIAGNOSTIC_DISPLAY_LABELS; },
        set(value) { CONJUGATION_DIAGNOSTIC_DISPLAY_LABELS = value; },
    });
    api.buildConjugationDiagnosticEntry = buildConjugationDiagnosticEntry;
    api.normalizeConjugationDiagnosticEntry = normalizeConjugationDiagnosticEntry;
    api.dedupeConjugationDiagnosticEntries = dedupeConjugationDiagnosticEntries;
    api.getConjugationResultFrame = getConjugationResultFrame;
    api.splitConjugationRenderableSurfaceText = splitConjugationRenderableSurfaceText;
    api.getConjugationRenderableSurfaceForms = getConjugationRenderableSurfaceForms;
    api.getConjugationRenderableSurface = getConjugationRenderableSurface;
    api.buildConjugationFrameStatusDiagnostic = buildConjugationFrameStatusDiagnostic;
    api.isGenericConjugationNoOutputDiagnostic = isGenericConjugationNoOutputDiagnostic;
    api.hasConjugationFailedLayerDiagnostic = hasConjugationFailedLayerDiagnostic;
    api.shouldPromoteConjugationFrameStatusDiagnostic = shouldPromoteConjugationFrameStatusDiagnostic;
    api.getConjugationResultDiagnostics = getConjugationResultDiagnostics;
    api.resolveConjugationAvailabilityState = resolveConjugationAvailabilityState;
    api.createToggleAvailabilityRealizationSummary = createToggleAvailabilityRealizationSummary;
    api.recordToggleAvailabilityRealization = recordToggleAvailabilityRealization;
    api.realizeToggleAvailabilitySummary = realizeToggleAvailabilitySummary;
    api.buildConjugationEvaluationRecord = buildConjugationEvaluationRecord;
    api.getConjugationDiagnosticDisplayLabel = getConjugationDiagnosticDisplayLabel;
    api.getConjugationNoOutputDisplay = getConjugationNoOutputDisplay;
    api.normalizeConjugationDisplayText = normalizeConjugationDisplayText;
    api.applyConjugationEvaluationPresentation = applyConjugationEvaluationPresentation;
    api.getConjugationMaskState = getConjugationMaskState;
    api.getLocativoTemporalMaskState = getLocativoTemporalMaskState;
    api.resolveNominalAvailabilityProbeSelection = resolveNominalAvailabilityProbeSelection;
    api.resolveHasNonspecificValence = resolveHasNonspecificValence;
    api.buildMorphologyMetaOptions = buildMorphologyMetaOptions;
    api.buildObjectAllomorphyMetaOptions = buildObjectAllomorphyMetaOptions;
    api.buildNonspecificAllomorphyOptions = buildNonspecificAllomorphyOptions;
    api.shouldDelaySlashSupportiveIAllomorphyForPret = shouldDelaySlashSupportiveIAllomorphyForPret;
    api.applyNounForwardDerivation = applyNounForwardDerivation;
    api.getNounNonactiveRuleBase = getNounNonactiveRuleBase;
    api.getNounForwardStemTargets = getNounForwardStemTargets;
    api.buildNounForwardStemContexts = buildNounForwardStemContexts;
    api.buildVerbDerivedNominalBuilderContextDiagnostic = buildVerbDerivedNominalBuilderContextDiagnostic;
    api.getVerbDerivedNominalBuilderContextFailedLayerContract = getVerbDerivedNominalBuilderContextFailedLayerContract;
    api.getVerbDerivedNominalBuilderContextAndrewsRefs = getVerbDerivedNominalBuilderContextAndrewsRefs;
    api.normalizeVerbDerivedNominalBuilderContextDiagnostics = normalizeVerbDerivedNominalBuilderContextDiagnostics;
    api.applyVerbDerivedNominalBuilderContextDiagnosticLayerMetadata = applyVerbDerivedNominalBuilderContextDiagnosticLayerMetadata;
    api.attachVerbDerivedNominalBuilderContextContract = attachVerbDerivedNominalBuilderContextContract;
    api.buildVerbDerivedNominalBuilderContextBlocked = buildVerbDerivedNominalBuilderContextBlocked;
    api.buildVerbDerivedNominalBuilderContext = buildVerbDerivedNominalBuilderContext;
    api.collapseCalificativoMarkerEcho = collapseCalificativoMarkerEcho;
    api.buildCalificativoInstrumentivoPredicateStemSpec = buildCalificativoInstrumentivoPredicateStemSpec;
    return api;
}

export function installAgreementGlobals(targetObject = globalThis) {
    const api = createAgreementApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
