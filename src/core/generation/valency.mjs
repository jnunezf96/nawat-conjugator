// Native wrapper generated from src/core/generation/valency.js.

export function createGenerationValencyModule(targetObject = globalThis) {
    const GENERATION_VALENCY_OBJECT_SLOT_GATE_DIAGNOSTIC_ID = "generation-valency-object-slot-frame-unfixed";
    const GENERATION_VALENCY_OBJECT_SLOT_GATE_ROUTE_STAGE = "generation-valency-object-slot-gate";
    function normalizeGenerationValencySlotInput(input = {}) {
      const node = input && typeof input === "object" ? input : {};
      const {
        pers1 = "",
        pers2,
        num2,
        obj1 = "",
        obj2 = "",
        obj3 = "",
        ...rest
      } = node;
      return {
        ...rest,
        pers1: String(pers1 || ""),
        pers2: String(pers2 ?? num2 ?? ""),
        obj1: String(obj1 || ""),
        obj2: String(obj2 || ""),
        obj3: String(obj3 || "")
      };
    }
    function buildGenerationValencySlotFrame({
      pers1 = "",
      pers2 = "",
      obj1 = "",
      obj2 = "",
      obj3 = ""
    } = {}) {
      const resolvedPers1 = String(pers1 || "");
      const resolvedPers2 = String(pers2 || "");
      const resolvedObj1 = String(obj1 || "");
      const resolvedObj2 = String(obj2 || "");
      const resolvedObj3 = String(obj3 || "");
      return {
        pers1: resolvedPers1,
        pers2: resolvedPers2,
        obj1: resolvedObj1,
        obj2: resolvedObj2,
        obj3: resolvedObj3,
        pers1Pers2: {
          slot: "pers1-pers2",
          prefix: resolvedPers1,
          suffix: resolvedPers2
        },
        objectSlotSequence: [{
          slot: "obj1",
          prefix: resolvedObj1
        }, {
          slot: "obj2",
          prefix: resolvedObj2
        }, {
          slot: "obj3",
          prefix: resolvedObj3
        }]
      };
    }
    function cloneGenerationValencyLessonRecord(value) {
      if (Array.isArray(value)) {
        return value.map(entry => cloneGenerationValencyLessonRecord(entry));
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneGenerationValencyLessonRecord(entry)]));
    }
    const LESSON21_PASSIVE_VALIDATION_REFS = Object.freeze(["src/tests/vnc.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON21_PASSIVE_PDF_REFS = Object.freeze(["Andrews Lesson 21.1", "Andrews Lesson 21.2", "Andrews Lesson 21.3", "Andrews Lesson 21.4"]);
    const LESSON21_PASSIVE_TRANSFORMATION_FRAME = Object.freeze({
      kind: "lesson-21-passive-transformation-frame",
      sourceSection: "Andrews 21.1",
      sourceVoice: "active VNC",
      targetVoice: "passive VNC",
      requiresSpecificObjectPronoun: true,
      sourceIntransitiveAllowed: false,
      sourceNonspecificObjectAllowed: false,
      nonspecificObjectRedirect: "Andrews Lesson 22 impersonal voice",
      operations: Object.freeze(["delete-active-subject", "replace-active-stem-with-nonactive-counterpart", "relocate-specific-object-to-subject-function"]),
      agentPhraseAllowed: false,
      agentInterpretation: "passive agent is impersonal and cannot be expressed as a by-phrase"
    });
    const LESSON21_PASSIVE_GENERATION_CASES = Object.freeze([Object.freeze({
      id: "single-specific-projective-object",
      sourceSection: "Andrews 21.2.1",
      sourceObjectProfile: "one specific projective object",
      targetFormula: "intransitive VNC",
      objectToSubject: true,
      shuntlineObjectPreserved: false,
      currentEngineStatus: "implemented-through-passive-subject-override-and-nonactive-stem"
    }), Object.freeze({
      id: "single-specific-reflexive-object",
      sourceSection: "Andrews 21.2.2",
      sourceObjectProfile: "one specific reflexive object",
      targetFormula: "transitive VNC",
      objectToSubject: true,
      reflexiveWitness: "shuntline ne",
      currentEngineStatus: "partial-nawat-reflexive-slot-exists-but-passive-ne-witness-needs-audited-routing"
    }), Object.freeze({
      id: "projective-plus-reflexive-object",
      sourceSection: "Andrews 21.2.3",
      sourceObjectProfile: "one specific projective object plus one reflexive object",
      targetFormula: "transitive VNC",
      mainlineProjectiveToSubject: true,
      reflexiveWitness: "shuntline ne",
      currentEngineStatus: "partial-double-object-passive-routing-needs-focused-audit"
    }), Object.freeze({
      id: "two-specific-projective-objects",
      sourceSection: "Andrews 21.2.4",
      sourceObjectProfile: "two specific projective objects",
      targetFormula: "transitive VNC",
      mainlineObjectToSubject: true,
      shuntlineSpecificObjectPreserved: true,
      currentEngineStatus: "partial-mainline-shuntline-passive-distinction-needs-focused-audit"
    }), Object.freeze({
      id: "one-specific-one-nonspecific-projective-object",
      sourceSection: "Andrews 21.2.5",
      sourceObjectProfile: "one specific projective object plus one nonspecific projective object",
      targetFormula: "transitive VNC",
      specificObjectToSubject: true,
      nonspecificObjectPreserved: true,
      currentEngineStatus: "partial-current-combined-passive-impersonal-route-can-clear nonspecific markers"
    }), Object.freeze({
      id: "three-object-pronouns",
      sourceSection: "Andrews 21.2.6",
      sourceObjectProfile: "three object pronouns",
      targetFormula: "principles from 21.2.1-21.2.5",
      currentEngineStatus: "partial-needs-separate-three-object-passive-audit"
    })]);
    const LESSON21_PASSIVE_MOOD_FRAME = Object.freeze({
      kind: "lesson-21-passive-mood-frame",
      sourceSection: "Andrews 21.3",
      passiveAssertionsCanTransformTo: Object.freeze(["wish", "command/exhortation", "admonition"]),
      sentenceLayerLessons: Object.freeze(["Andrews Lesson 9", "Andrews Lesson 10"]),
      currentEngineStatus: "finite nonactive tenses exist; sentence-level optative/admonitive particles remain diagnostic"
    });
    const LESSON21_ACTIVE_REFLEXIVE_PASSIVE_NOTION_FRAME = Object.freeze({
      kind: "lesson-21-active-reflexive-passive-notion-frame",
      sourceSection: "Andrews 21.4",
      construction: "active-voice VNC with reflexive object pronoun can express a passive notion",
      subjectRole: "patient, not agent",
      typicalSubjectAnimacy: "nonanimate, with animate subjects possible",
      currentEngineStatus: "ordinary active reflexive generation exists; passive-notion interpretation is not a separate generated voice route",
      generationPolicy: "diagnostic interpretation only until Nawat/Pipil evidence and sentence context license examples"
    });
    const LESSON21_PASSIVE_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson21-passive-transformation",
      andrewsSection: "21.1",
      category: "passive-transformation",
      directiveEs: "La pasiva transforma una CNV activa con objeto especifico: borra el sujeto activo, usa el tronco no activo y convierte el objeto especifico en sujeto.",
      engineSurface: "nonactive voice mode, passive subject override map, object-clearing valency frame",
      implementationState: "partial",
      redirectAction: "reframe-metadata"
    }), Object.freeze({
      id: "lesson21-passive-generation-rules",
      andrewsSection: "21.2",
      category: "passive-generation-cases",
      directiveEs: "Las reglas de generacion dependen de si la fuente tiene un objeto especifico, reflexivo, dos objetos o tres objetos; el sujeto activo nunca participa.",
      engineSurface: "single-object passive subject controls plus double-object valency metadata",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson21-passive-optative-admonitive",
      andrewsSection: "21.3",
      category: "passive-sentence-moods",
      directiveEs: "Las aserciones pasivas pueden entrar en oraciones de deseo, mandato/exhortacion o admonicion; esto pertenece a capa de oracion.",
      engineSurface: "finite nonactive tense output with sentence-layer diagnostics",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson21-active-reflexive-passive-notion",
      andrewsSection: "21.4",
      category: "active-reflexive-passive-notion",
      directiveEs: "Una CNV activa reflexiva puede expresar nocion pasiva; el sujeto visible es paciente, no agente.",
      engineSurface: "active reflexive generation; passive-notion interpretation not yet modeled as sentence metadata",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    })]);
    function getLesson21PassiveVoiceSubsectionInventory() {
      return LESSON21_PASSIVE_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON21_PASSIVE_VALIDATION_REFS)
      }));
    }
    function buildLesson21PassiveVoicePursuitFrame() {
      const subsectionInventory = getLesson21PassiveVoiceSubsectionInventory();
      const transformationFrame = cloneGenerationValencyLessonRecord(LESSON21_PASSIVE_TRANSFORMATION_FRAME);
      const generationCases = cloneGenerationValencyLessonRecord(LESSON21_PASSIVE_GENERATION_CASES);
      const moodFrame = cloneGenerationValencyLessonRecord(LESSON21_PASSIVE_MOOD_FRAME);
      const activeReflexivePassiveNotionFrame = cloneGenerationValencyLessonRecord(LESSON21_ACTIVE_REFLEXIVE_PASSIVE_NOTION_FRAME);
      const remainingGaps = ["Current visible/generated voice route is still combined as passive-impersonal instead of Andrews-separate passive and impersonal contracts.", "Passive mode still needs a hard gate or redirect for nonspecific ta/te sources, which Andrews sends to impersonal voice rather than passive voice.", "Single reflexive, projective-plus-reflexive, two-projective, one-specific-plus-nonspecific, and three-object passive cases need focused engine audits against Andrews 21.2.", "Passive optative/admonitive and active-reflexive passive-notion readings remain sentence-layer diagnostics."];
      const frame = {
        kind: "lesson-21-passive-voice-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 21,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON21_PASSIVE_PDF_REFS),
        plannedArrows: [{
          id: "lesson-21-passive-voice-audit",
          type: "metadata-engine-test",
          aim: "Audit Andrews Lesson 21.1-21.4 against the current nonactive/passive route, object-to-subject mapping, passive generation cases, sentence-mood boundaries, and active-reflexive passive notion.",
          andrewsRefs: Array.from(LESSON21_PASSIVE_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON21_PASSIVE_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-21-passive-voice-audit",
          result: "hit",
          correction: "Lesson 21 now records the Andrews passive transform, the 21.2 case inventory, current Nawat passive-subject override support, combined passive/impersonal drift, and explicit remaining gaps before closest-pass can be claimed.",
          andrewsRefs: Array.from(LESSON21_PASSIVE_PDF_REFS),
          feedbackRefs: Array.from(LESSON21_PASSIVE_VALIDATION_REFS)
        }],
        subsectionInventory,
        transformationFrame,
        generationCases,
        moodFrame,
        activeReflexivePassiveNotionFrame,
        currentEngineBoundary: {
          nonactiveStemReplacementImplemented: true,
          passiveSubjectOverrideMapImplemented: true,
          activeSubjectDeletionRepresentedByNoAgentRoute: true,
          noAgentPhraseRoute: true,
          combinedPassiveImpersonalLabelStillVisible: true,
          nonspecificObjectPassiveGateMissing: true,
          reflexivePassiveWitnessNeedsAudit: true,
          doubleObjectPassiveRulesNeedAudit: true,
          activeReflexivePassiveNotionDiagnosticOnly: true
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
        metadataKind: "lesson-21-passive-voice-pursuit-frame",
        routeFamily: "generation-valency",
        routeStage: "audit-lesson-21",
        generationAllowed: false,
        supported: true,
        structuralSource: "Andrews Lesson 21",
        andrewsRefs: Array.from(LESSON21_PASSIVE_PDF_REFS),
        evidenceStatus: "direct-pdf-partial",
        sourceInput: "Andrews Lesson 21.1-21.4",
        morphBoundaryFrame: {
          transformationFrame,
          generationCases,
          moodFrame,
          activeReflexivePassiveNotionFrame
        },
        participantFrame: {
          sourceSubject: "deleted",
          promotedSourceObject: "specific projective or reflexive object, by Andrews case",
          agentPhraseAllowed: false,
          nonspecificObjectRedirect: "Andrews Lesson 22"
        },
        nuclearClauseFrame: {
          clauseKind: "verbal-nuclear-clause",
          sourceVoice: "active",
          targetVoice: "passive",
          formulaDependsOnSourceObjects: true
        },
        targetContract: {
          metadataKind: "lesson-21-passive-voice-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnosticStatus: "partial-audit"
      });
    }
    const LESSON22_IMPERSONAL_VALIDATION_REFS = Object.freeze(["src/tests/vnc.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON22_IMPERSONAL_PDF_REFS = Object.freeze(["Andrews Lesson 22.1", "Andrews Lesson 22.2", "Andrews Lesson 22.3", "Andrews Lesson 22.4", "Andrews Lesson 22.5", "Andrews Lesson 22.6"]);
    const LESSON22_INHERENT_IMPERSONAL_FRAME = Object.freeze({
      kind: "lesson-22-inherent-impersonal-frame",
      sourceSection: "Andrews 22.1",
      subjectReferent: "none",
      subjectPersonNumber: "third-person singular only",
      subjectSupplementable: false,
      subjectIsFictitiousButPresent: true,
      typicalSemanticDomains: Object.freeze(["meteorological events", "agentless conditions"]),
      currentEngineStatus: "not a confirmed lexical impersonal verb inventory"
    });
    const LESSON22_NONANIMATE_DISTINCTION_FRAME = Object.freeze({
      kind: "lesson-22-nonanimate-distinction-frame",
      sourceSection: "Andrews 22.2",
      sharedSurfaceLimit: "third-person singular/common-number surface",
      impersonalSubjectReferent: "no specifiable referent; cannot be supplemented",
      nonanimateSubjectReferent: "specific nonanimate entity or entities; can be supplemented",
      activeReflexivePassiveNotionLink: "Lesson 21.4 active reflexive passive-notion subjects tend to be nonanimate and specific",
      currentEngineStatus: "nonanimate subject metadata exists elsewhere; impersonal/nonanimate interpretation is not fully separated in VNC generation"
    });
    const LESSON22_IMPERSONAL_TRANSFORMATION_FRAME = Object.freeze({
      kind: "lesson-22-impersonal-transformation-frame",
      sourceSection: "Andrews 22.3",
      sourceVoice: "active personal VNC",
      targetVoice: "impersonal VNC",
      operations: Object.freeze(["replace-active-personal-subject-with-impersonal-third-singular-subject", "replace-active-stem-with-nonactive-counterpart"]),
      activeSourceMayBeIntransitive: true,
      activeSourceMayBeTransitive: true,
      transitiveRestriction: "source must not contain a specific projective object",
      reflexiveSpecificObjectException: true,
      passiveContrast: "passive is personal because a specific patient becomes subject; impersonal has a faceless third-singular subject"
    });
    const LESSON22_IMPERSONAL_GENERATION_FRAME = Object.freeze({
      kind: "lesson-22-impersonal-generation-frame",
      sourceSection: "Andrews 22.4",
      formulaPolicy: "use the same VNC formula as the active source",
      intransitiveSourceTargetFormula: "intransitive VNC",
      transitiveSourceTargetFormula: "transitive VNC",
      subjectPronounSource: "imported impersonal subject from outside; not generated from active source subject",
      discardedSourceSubjectRecoverable: false,
      nonspecificProjectiveObjectsPreserved: Object.freeze(["te", "tla"]),
      nawatNonspecificObjectBridge: Object.freeze([Object.freeze({
        andrews: "te",
        nawat: "te"
      }), Object.freeze({
        andrews: "tla",
        nawat: "ta"
      })]),
      reflexiveSourceUsesShuntlineWitness: "ne"
    });
    const LESSON22_IMPERSONAL_MOOD_FRAME = Object.freeze({
      kind: "lesson-22-impersonal-mood-frame",
      sourceSection: "Andrews 22.5",
      impersonalAssertionsCanTransformTo: Object.freeze(["wish", "command/exhortation", "admonition"]),
      sentenceLayerLessons: Object.freeze(["Andrews Lesson 9", "Andrews Lesson 10"]),
      currentEngineStatus: "finite nonactive output exists; sentence-level wish/exhortation/admonition remains diagnostic"
    });
    const LESSON22_TA_IMPERSONAL_FRAME = Object.freeze({
      kind: "lesson-22-ta-impersonal-frame",
      sourceSection: "Andrews 22.6",
      derivationalPrefix: Object.freeze({
        andrews: "tla",
        nawat: "ta"
      }),
      sourceStemType: "active intransitive verbstem, usually inceptive/inchoative or stative",
      prefixRole: "derivational impersonalizer inside derived verbstem",
      notObjectPronoun: true,
      mayAttachToInherentImpersonalStem: true,
      animateGeneralSubjectLimited: true,
      currentEngineStatus: "hasImpersonalTaPrefix metadata exists, but Lesson 22.6 derivational inventory and generation are not data-complete"
    });
    const LESSON22_IMPERSONAL_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson22-inherent-impersonal-vncs",
      andrewsSection: "22.1",
      category: "inherent-impersonal-vnc",
      directiveEs: "La CNV impersonal inherente tiene sujeto ficticio de tercera singular sin referente nombrable; no puede suplementarse.",
      engineSurface: "impersonal subject diagnostics and no lexical weather-verb inventory",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    }), Object.freeze({
      id: "lesson22-nonanimate-vs-impersonal",
      andrewsSection: "22.2",
      category: "nonanimate-impersonal-distinction",
      directiveEs: "No confundir sujeto no animado con sujeto impersonal: ambos pueden verse como tercera singular, pero solo el no animado tiene referente suplementable.",
      engineSurface: "clause animacy metadata plus VNC impersonal diagnostics",
      implementationState: "partial",
      redirectAction: "reframe-metadata"
    }), Object.freeze({
      id: "lesson22-impersonal-voice",
      andrewsSection: "22.3",
      category: "impersonal-voice-transform",
      directiveEs: "La voz impersonal cambia el sujeto personal por uno impersonal y usa el tronco no activo; fuentes transitivas no pueden tener objeto proyectivo especifico.",
      engineSurface: "nonactive voice mode and subject/object clearing rules",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson22-impersonal-generation",
      andrewsSection: "22.4",
      category: "impersonal-generation-rules",
      directiveEs: "La CNV impersonal usa la misma formula que la fuente activa, conserva objetos inespecificos te/ta y cambia reflexivo fuente a testigo ne.",
      engineSurface: "combined passive/impersonal route plus patientive impersonal-source evidence",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson22-impersonal-optative-admonitive",
      andrewsSection: "22.5",
      category: "impersonal-sentence-moods",
      directiveEs: "Una asercion impersonal puede entrar en deseo, mandato/exhortacion o admonicion; esto pertenece a capa de oracion.",
      engineSurface: "finite nonactive output with sentence-layer diagnostics",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson22-ta-impersonal",
      andrewsSection: "22.6",
      category: "ta-impersonal-derivation",
      directiveEs: "El prefijo impersonalizador Andrews tla, Nawat ta, es derivacional dentro del tronco y no el pronombre objeto inespecifico.",
      engineSurface: "hasImpersonalTaPrefix metadata; no data-complete ta-impersonal derivation inventory",
      implementationState: "partial",
      redirectAction: "needs-nawat-evidence"
    })]);
    function getLesson22ImpersonalVoiceSubsectionInventory() {
      return LESSON22_IMPERSONAL_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: Array.from(LESSON22_IMPERSONAL_VALIDATION_REFS)
      }));
    }
    function buildLesson22ImpersonalVoicePursuitFrame() {
      const subsectionInventory = getLesson22ImpersonalVoiceSubsectionInventory();
      const inherentImpersonalFrame = cloneGenerationValencyLessonRecord(LESSON22_INHERENT_IMPERSONAL_FRAME);
      const nonanimateDistinctionFrame = cloneGenerationValencyLessonRecord(LESSON22_NONANIMATE_DISTINCTION_FRAME);
      const impersonalTransformationFrame = cloneGenerationValencyLessonRecord(LESSON22_IMPERSONAL_TRANSFORMATION_FRAME);
      const impersonalGenerationFrame = cloneGenerationValencyLessonRecord(LESSON22_IMPERSONAL_GENERATION_FRAME);
      const moodFrame = cloneGenerationValencyLessonRecord(LESSON22_IMPERSONAL_MOOD_FRAME);
      const taImpersonalFrame = cloneGenerationValencyLessonRecord(LESSON22_TA_IMPERSONAL_FRAME);
      const remainingGaps = ["Current visible/generated voice route is still combined as passive-impersonal instead of an Andrews-separate impersonal contract.", "Inherent impersonal verb inventory and nonanimate-versus-impersonal subject interpretation require confirmed Nawat/Pipil evidence and sentence metadata.", "Impersonal voice still needs explicit gates: permit intransitive sources and transitive sources without specific projective objects, but block or redirect specific projective-object sources to passive handling.", "Andrews 22.4 preservation of nonspecific te/ta and reflexive-source witness ne needs focused finite-CNV audit.", "Andrews 22.5 sentence moods and 22.6 derivational ta-impersonal inventory remain diagnostic or evidence-needed."];
      const frame = {
        kind: "lesson-22-impersonal-voice-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 22,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON22_IMPERSONAL_PDF_REFS),
        plannedArrows: [{
          id: "lesson-22-impersonal-voice-audit",
          type: "metadata-engine-test",
          aim: "Audit Andrews Lesson 22.1-22.6 against current passive/impersonal voice routing, impersonal subject behavior, nonanimate distinction, source restrictions, preserved nonspecific objects, reflexive witness ne, sentence moods, and ta-impersonal derivation.",
          andrewsRefs: Array.from(LESSON22_IMPERSONAL_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON22_IMPERSONAL_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-22-impersonal-voice-audit",
          result: "hit",
          correction: "Lesson 22 now records the Andrews impersonal subject contract, nonanimate distinction, impersonal transform, 22.4 generation rules, sentence-mood boundary, ta-impersonal derivation boundary, current engine support, and explicit remaining gaps before closest-pass can be claimed.",
          andrewsRefs: Array.from(LESSON22_IMPERSONAL_PDF_REFS),
          feedbackRefs: Array.from(LESSON22_IMPERSONAL_VALIDATION_REFS)
        }],
        subsectionInventory,
        inherentImpersonalFrame,
        nonanimateDistinctionFrame,
        impersonalTransformationFrame,
        impersonalGenerationFrame,
        moodFrame,
        taImpersonalFrame,
        currentEngineBoundary: {
          nonactiveStemReplacementImplemented: true,
          impersonalThirdSingularSubjectClearingImplemented: true,
          combinedPassiveImpersonalLabelStillVisible: true,
          hasImpersonalTaPrefixMetadataExists: true,
          inherentImpersonalLexiconMissing: true,
          nonanimateImpersonalDistinctionIncomplete: true,
          specificProjectiveObjectImpersonalGateMissing: true,
          nonspecificObjectPreservationNeedsAudit: true,
          reflexiveWitnessNeedsAudit: true,
          taImpersonalDerivationInventoryMissing: true
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
        metadataKind: "lesson-22-impersonal-voice-pursuit-frame",
        routeFamily: "generation-valency",
        routeStage: "audit-lesson-22",
        generationAllowed: false,
        supported: true,
        structuralSource: "Andrews Lesson 22",
        andrewsRefs: Array.from(LESSON22_IMPERSONAL_PDF_REFS),
        evidenceStatus: "direct-pdf-partial",
        sourceInput: "Andrews Lesson 22.1-22.6",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil output spelling",
          noClassicalSurfaceImport: true,
          derivationalPrefixBridge: taImpersonalFrame.derivationalPrefix,
          nonspecificObjectBridge: impersonalGenerationFrame.nawatNonspecificObjectBridge
        },
        morphBoundaryFrame: {
          impersonalTransformationFrame,
          impersonalGenerationFrame,
          taImpersonalFrame
        },
        participantFrame: {
          subjectReferent: "none",
          subjectPersonNumber: "third-person singular",
          subjectSupplementable: false,
          specificProjectiveObjectAllowed: false,
          nonspecificProjectiveObjectsPreserved: ["te", "ta"],
          reflexiveWitness: "ne"
        },
        nuclearClauseFrame: {
          clauseKind: "verbal-nuclear-clause",
          sourceVoice: "active",
          targetVoice: "impersonal",
          formulaPolicy: "same formula as active source",
          nonanimateContrast: nonanimateDistinctionFrame
        },
        targetContract: {
          metadataKind: "lesson-22-impersonal-voice-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnosticStatus: "partial-audit"
      });
    }
    function shouldDropBoundObjectPrefix(parsedVerb) {
      if (!parsedVerb || !parsedVerb.hasBoundMarker) {
        return false;
      }
      if ((parsedVerb.derivationValencyDelta || 0) > 0 || parsedVerb.derivationType === targetObject.DERIVATION_TYPE.causative || parsedVerb.derivationType === targetObject.DERIVATION_TYPE.applicative) {
        return false;
      }
      const boundPrefixes = Array.isArray(parsedVerb.boundPrefixes) ? parsedVerb.boundPrefixes : [];
      if (!boundPrefixes.length) {
        return false;
      }
      return boundPrefixes.some(prefix => isGenerationValencyObjectOrFusionPrefix(prefix));
    }
    function shouldDropOccupiedSourceObjectPrefix(parsedVerb) {
      if (!parsedVerb || targetObject.getOccupiedLexicalSourceObjectSlots(parsedVerb) <= 0) {
        return false;
      }
      if ((parsedVerb.derivationValencyDelta || 0) > 0) {
        return false;
      }
      return targetObject.getAvailableObjectSlots(parsedVerb) <= 0;
    }
    function isGenerationValencyObjectOrFusionPrefix(prefix = "") {
      const normalized = String(prefix || "").trim();
      if (!normalized) {
        return false;
      }
      return targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(normalized) || targetObject.OBJECT_MARKERS.has(normalized) || targetObject.FUSION_PREFIXES.has(normalized) || ["k", "ki", "kin", "nech", "metz", "tech", "mech", "te", "ta", "mu", "m", "t"].includes(normalized);
    }
    function generationValencyEntradaGrammarObjectHasValenceObjectSignal(entradaGrammarObject = null) {
      if (!entradaGrammarObject || typeof entradaGrammarObject !== "object" || String(entradaGrammarObject.kind || "") !== "andrews-entrada-grammar-object") {
        return false;
      }
      const valenceFrame = entradaGrammarObject.valenceFrame && typeof entradaGrammarObject.valenceFrame === "object" ? entradaGrammarObject.valenceFrame : {};
      const objectFrame = entradaGrammarObject.objectFrame && typeof entradaGrammarObject.objectFrame === "object" ? entradaGrammarObject.objectFrame : {};
      return Boolean(objectFrame.hasObjectSlots === true || Array.isArray(objectFrame.slots) && objectFrame.slots.length > 0 || Array.isArray(valenceFrame.slots) && valenceFrame.slots.length > 0 || Array.isArray(valenceFrame.tokens) && valenceFrame.tokens.length > 0);
    }
    function generationValencyEntradaGrammarObjectHasFixedFrame(entradaGrammarObject = null) {
      return Boolean(entradaGrammarObject && typeof entradaGrammarObject === "object" && String(entradaGrammarObject.kind || "") === "andrews-entrada-grammar-object" && (entradaGrammarObject.valenceFrame?.frameFixed === true || entradaGrammarObject.objectFrame?.frameFixed === true || entradaGrammarObject.formulaBoundaryFrame?.valenceFrameFixed === true || entradaGrammarObject.formulaBoundaryFrame?.frameFixed === true && entradaGrammarObject.formulaBoundaryFrame?.objectSlotsCovered === true));
    }
    function generationValencyFrameHasFixedValenceEvidence(frame = null) {
      if (!frame || typeof frame !== "object") {
        return false;
      }
      if (frame.frameFixed === false || frame.valenceFrameFixed === false || frame.sourceValenceFrameFixed === false) {
        return false;
      }
      return Boolean(frame.frameFixed === true || frame.valenceFrameFixed === true || frame.sourceValenceFrameFixed === true || frame.objectFrameFixed === true || frame.matrixValenceFrameFixed === true || frame.valencyFrameFixed === true || frame.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.participantFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.participantFrame?.valenceFrame?.frameFixed === true || frame.participantFrame?.valenceFrame?.valenceFrameFixed === true || frame.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.incorporationRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.sourceContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.targetContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.sourceContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.targetContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.routeContract?.targetContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.sourceContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.targetContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.sourceContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.targetContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.targetContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true);
    }
    function generationValencyFrameHasValenceObjectSignal(frame = null) {
      if (!frame || typeof frame !== "object") {
        return false;
      }
      const hasSlots = (...slotLists) => slotLists.some(slots => Array.isArray(slots) && slots.length > 0);
      return Boolean(String(frame.kind || "") === "andrews-incorporation-route-frame" || String(frame.matrixValence || "").trim() || String(frame.consumedObjectSlot || "").trim() || frame.routeFrameLicensesObjectSlotOwnership === true || frame.routeFrameLicensesObjectSlotOwnership === false || hasSlots(frame.remainingExternalObjectSlots, frame.sourceExternalObjectSlots, frame.objectSlotOwnership?.remainingExternalObjectSlots, frame.objectSlotOwnership?.sourceExternalObjectSlots, frame.participantFrame?.objectSlotOwnership?.remainingExternalObjectSlots, frame.participantFrame?.objectSlotOwnership?.sourceExternalObjectSlots, frame.routeFrame?.remainingExternalObjectSlots, frame.sourceRouteFrame?.remainingExternalObjectSlots, frame.incorporationRouteFrame?.remainingExternalObjectSlots, frame.routeContract?.sourceContract?.routeFrame?.remainingExternalObjectSlots, frame.routeContract?.targetContract?.routeFrame?.remainingExternalObjectSlots, frame.routeContract?.sourceContract?.sourceRouteFrame?.remainingExternalObjectSlots, frame.routeContract?.targetContract?.sourceRouteFrame?.remainingExternalObjectSlots, frame.sourceContract?.routeFrame?.remainingExternalObjectSlots, frame.targetContract?.routeFrame?.remainingExternalObjectSlots, frame.sourceContract?.sourceRouteFrame?.remainingExternalObjectSlots, frame.targetContract?.sourceRouteFrame?.remainingExternalObjectSlots) || frame.objectSlotOwnership?.matrixValenceFrameFixed === true || frame.objectSlotOwnership?.matrixValenceFrameFixed === false || frame.participantFrame?.valenceFrame || frame.participantFrame?.object || frame.routeContract?.sourceContract?.valenceFrame || frame.routeContract?.targetContract?.valenceFrame || frame.sourceContract?.valenceFrame || frame.targetContract?.valenceFrame);
    }
    function getGenerationValencyFrameCandidates(options = {}) {
      const source = options && typeof options === "object" ? options : {};
      return [source.sourceFrame, source.grammarFrame, source.frames, source.participantFrame, source.sourceRouteFrame, source.routeFrame, source.incorporationRouteFrame, source.objectSlotOwnership, source.routeContract, source.sourceContract, source.targetContract, source.grammarFrame?.participantFrame, source.grammarFrame?.routeContract, source.grammarFrame?.routeContract?.sourceContract, source.grammarFrame?.routeContract?.targetContract, source.frames?.participantFrame, source.frames?.routeContract, source.frames?.routeContract?.sourceContract, source.frames?.routeContract?.targetContract, source.routeContract?.sourceContract, source.routeContract?.targetContract].filter(candidate => candidate && typeof candidate === "object");
    }
    function resolveGenerationValencyFrameFixed(options = {}) {
      if (options.valenceFrameFixed === true || options.sourceValenceFrameFixed === true) {
        return true;
      }
      if (options.valenceFrameFixed === false || options.sourceValenceFrameFixed === false) {
        return false;
      }
      const hasEntradaGrammarObject = Boolean(options.entradaGrammarObject && typeof options.entradaGrammarObject === "object" && String(options.entradaGrammarObject.kind || "") === "andrews-entrada-grammar-object");
      if (generationValencyEntradaGrammarObjectHasValenceObjectSignal(options.entradaGrammarObject) || options.requireFixedValenceFrame === true && hasEntradaGrammarObject) {
        return generationValencyEntradaGrammarObjectHasFixedFrame(options.entradaGrammarObject);
      }
      const frameCandidates = getGenerationValencyFrameCandidates(options);
      if (frameCandidates.some(frame => generationValencyFrameHasValenceObjectSignal(frame))) {
        return frameCandidates.some(frame => generationValencyFrameHasFixedValenceEvidence(frame));
      }
      return options.requireFixedValenceFrame === true ? false : true;
    }
    function buildGenerationValencyObjectSlotMutationGate({
      operation = "",
      mutationKind = "",
      reason = "",
      sourceObj1 = "",
      sourceBaseObj1 = "",
      sourceObj2 = "",
      sourceObj3 = "",
      targetObj1 = "",
      targetBaseObj1 = "",
      targetObj2 = "",
      targetObj3 = "",
      options = {}
    } = {}) {
      const normalizedSourceObj1 = String(sourceObj1 || "");
      const normalizedSourceBaseObj1 = String(sourceBaseObj1 || "");
      const normalizedSourceObj2 = String(sourceObj2 || "");
      const normalizedSourceObj3 = String(sourceObj3 || "");
      const normalizedTargetObj1 = String(targetObj1 || "");
      const normalizedTargetBaseObj1 = String(targetBaseObj1 || "");
      const normalizedTargetObj2 = String(targetObj2 || "");
      const normalizedTargetObj3 = String(targetObj3 || "");
      const mutatesObjectSlot = normalizedSourceObj1 !== normalizedTargetObj1 || normalizedSourceBaseObj1 !== normalizedTargetBaseObj1 || normalizedSourceObj2 !== normalizedTargetObj2 || normalizedSourceObj3 !== normalizedTargetObj3;
      const entradaHasValenceObjectSignal = generationValencyEntradaGrammarObjectHasValenceObjectSignal(options.entradaGrammarObject);
      const frameCandidates = getGenerationValencyFrameCandidates(options);
      const frameHasValenceObjectSignal = frameCandidates.some(frame => generationValencyFrameHasValenceObjectSignal(frame));
      const requiresFixedValenceFrame = options.requireFixedValenceFrame === true || entradaHasValenceObjectSignal || frameHasValenceObjectSignal;
      const valenceFrameFixed = resolveGenerationValencyFrameFixed(options);
      const status = mutatesObjectSlot && requiresFixedValenceFrame && !valenceFrameFixed ? "blocked" : "pass";
      return {
        kind: "generation-valency-object-slot-mutation-gate",
        version: 1,
        operation: String(operation || ""),
        mutationKind: String(mutationKind || ""),
        status,
        diagnosticId: GENERATION_VALENCY_OBJECT_SLOT_GATE_DIAGNOSTIC_ID,
        routeStage: GENERATION_VALENCY_OBJECT_SLOT_GATE_ROUTE_STAGE,
        reason: status === "blocked" ? "generation-valency-source-frame-unfixed" : String(reason || "generation-valency-object-slot-mutation-licensed"),
        generationAllowed: status !== "blocked",
        routeRankingAllowed: status !== "blocked",
        requiresFixedValenceFrame,
        valenceFrameFixed,
        entradaHasValenceObjectSignal,
        frameHasValenceObjectSignal,
        mutatesObjectSlot,
        sourceVector: {
          obj1: normalizedSourceObj1,
          baseObj1: normalizedSourceBaseObj1,
          obj2: normalizedSourceObj2,
          obj3: normalizedSourceObj3
        },
        targetVector: {
          obj1: normalizedTargetObj1,
          baseObj1: normalizedTargetBaseObj1,
          obj2: normalizedTargetObj2,
          obj3: normalizedTargetObj3
        },
        boundaries: {
          unresolvedValenceFrameIsHardGate: true,
          objectSlotDeletionRequiresFixedValenceFrame: true,
          objectSlotRelocationRequiresFixedValenceFrame: true,
          objectSlotReclassificationRequiresFixedValenceFrame: true,
          objectSlotCreationRequiresFixedValenceFrame: true
        }
      };
    }
    function applyBoundMarkerSlotOverrides(parsedVerb, obj1 = "", baseObj1 = "", options = {}) {
      const preserveOccupiedSourceObjectPrefix = options.preserveOccupiedSourceObjectPrefix === true;
      const dropBoundObjectPrefix = shouldDropBoundObjectPrefix(parsedVerb);
      const dropOccupiedSourceObjectPrefix = !preserveOccupiedSourceObjectPrefix && shouldDropOccupiedSourceObjectPrefix(parsedVerb);
      const shouldDrop = dropBoundObjectPrefix || dropOccupiedSourceObjectPrefix;
      const reason = dropBoundObjectPrefix ? "bound-marker-owns-object-slot" : dropOccupiedSourceObjectPrefix ? "occupied-source-object-slot" : "";
      const targetObj1 = shouldDrop ? "" : obj1;
      const targetBaseObj1 = shouldDrop ? "" : baseObj1;
      const valencyObjectSlotGate = buildGenerationValencyObjectSlotMutationGate({
        operation: "apply-bound-marker-slot-overrides",
        mutationKind: shouldDrop ? "delete-object-slot" : "none",
        reason,
        sourceObj1: obj1,
        sourceBaseObj1: baseObj1,
        targetObj1,
        targetBaseObj1,
        options
      });
      if (valencyObjectSlotGate.status === "blocked") {
        return {
          obj1,
          baseObj1,
          blocked: true,
          generationAllowed: false,
          routeRankingAllowed: false,
          diagnosticId: valencyObjectSlotGate.diagnosticId,
          routeStage: valencyObjectSlotGate.routeStage,
          valencyObjectSlotGate
        };
      }
      if (shouldDrop) {
        return {
          obj1: "",
          baseObj1: "",
          valencyObjectSlotGate
        };
      }
      return {
        obj1,
        baseObj1,
        valencyObjectSlotGate
      };
    }
    function applyObj1Allomorphy(input = {}) {
      const {
        verb,
        analysisVerb,
        pers1,
        pers2,
        obj1,
        obj2,
        obj3 = "",
        isTaFusion,
        isPassiveImpersonalMode,
        hasOptionalSupportiveI = false,
        optionalSupportiveLetter = "",
        supportivePrecedingSurface = "",
        hasNonspecificValence = false,
        hasSlashMarker = false,
        hasBoundMarker = false,
        directionalPrefix = ""
      } = normalizeGenerationValencySlotInput(input);
      const allomorphyObjectPrefix = !isPassiveImpersonalMode && targetObject.isPers1Obj1Reflexivo(pers1, pers2, obj1) ? "mu" : obj1;
      const nonspecificAllomorphy = targetObject.applyNonspecificObjectAllomorphy({
        verb,
        analysisVerb,
        obj1: allomorphyObjectPrefix,
        obj2,
        obj3,
        isTaFusion,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        supportivePrecedingSurface,
        hasNonspecificValence,
        hasSlashMarker,
        hasBoundMarker,
        directionalPrefix
      });
      return {
        obj1: nonspecificAllomorphy.obj1 || allomorphyObjectPrefix,
        verb: nonspecificAllomorphy.verb,
        analysisVerb: nonspecificAllomorphy.analysisVerb,
        morphologyObj1: nonspecificAllomorphy.obj1 || allomorphyObjectPrefix,
        soundSpellingFrames: Array.isArray(nonspecificAllomorphy.soundSpellingFrames) ? nonspecificAllomorphy.soundSpellingFrames : []
      };
    }
    function applyPassiveImpersonalSlotAdjustments(input = {}) {
      let {
        isPassiveImpersonalMode,
        verb,
        analysisVerb,
        fusionPrefixes,
        targetValency,
        pers1,
        pers2,
        obj1,
        obj2,
        obj3 = "",
        preserveSubjectForPassive,
        allowPassiveObject,
        morphologyObj1,
        hasPromotableObject
      } = normalizeGenerationValencySlotInput(input);
      const sourceObj1 = obj1;
      const sourceObj2 = obj2;
      const sourceObj3 = obj3;
      const sourceMorphologyObj1 = morphologyObj1;
      if (!isPassiveImpersonalMode) {
        return {
          ...buildGenerationValencySlotFrame({
            pers1,
            pers2,
            obj1,
            obj2,
            obj3
          }),
          verb,
          analysisVerb,
          preserveSubjectForPassive,
          morphologyObj1
        };
      }
      const clearObjectMarkers = () => {
        obj1 = "";
        obj2 = "";
        obj3 = "";
      };
      let valencyAdjustedPrefix = false;
      const forceImpersonal = targetValency > 0 && !hasPromotableObject;
      if (forceImpersonal) {
        pers1 = "";
        pers2 = "";
        preserveSubjectForPassive = false;
        valencyAdjustedPrefix = true;
      } else if (targetValency <= 0) {
        pers1 = "";
        pers2 = "";
        clearObjectMarkers();
        preserveSubjectForPassive = false;
        valencyAdjustedPrefix = true;
      } else if (targetValency === 1) {
        clearObjectMarkers();
        preserveSubjectForPassive = true;
        valencyAdjustedPrefix = true;
      } else {
        preserveSubjectForPassive = true;
        if (fusionPrefixes.length && !allowPassiveObject) {
          clearObjectMarkers();
          valencyAdjustedPrefix = true;
        }
      }
      if (valencyAdjustedPrefix) {
        morphologyObj1 = obj1;
      }
      const valencyObjectSlotGate = buildGenerationValencyObjectSlotMutationGate({
        operation: "apply-passive-impersonal-slot-adjustments",
        mutationKind: valencyAdjustedPrefix ? "delete-object-slots" : "none",
        reason: valencyAdjustedPrefix ? "passive-impersonal-valency-adjustment" : "",
        sourceObj1,
        sourceBaseObj1: sourceMorphologyObj1 || sourceObj1,
        sourceObj2,
        sourceObj3,
        targetObj1: obj1,
        targetBaseObj1: morphologyObj1 || obj1,
        targetObj2: obj2,
        targetObj3: obj3,
        options: input
      });
      if (valencyObjectSlotGate.status === "blocked") {
        return {
          ...buildGenerationValencySlotFrame({
            pers1,
            pers2,
            obj1: sourceObj1,
            obj2: sourceObj2,
            obj3: sourceObj3
          }),
          verb,
          analysisVerb,
          preserveSubjectForPassive,
          morphologyObj1: sourceMorphologyObj1,
          blocked: true,
          generationAllowed: false,
          routeRankingAllowed: false,
          diagnosticId: valencyObjectSlotGate.diagnosticId,
          routeStage: valencyObjectSlotGate.routeStage,
          valencyObjectSlotGate
        };
      }
      return {
        ...buildGenerationValencySlotFrame({
          pers1,
          pers2,
          obj1,
          obj2,
          obj3
        }),
        verb,
        analysisVerb,
        preserveSubjectForPassive,
        morphologyObj1,
        valencyObjectSlotGate
      };
    }
    function resetPers1Pers2ForNounTenses(tense, override, pers1, pers2) {
      if (tense && typeof tense === "object") {
        const input = normalizeGenerationValencySlotInput(tense);
        const updated = resetPers1Pers2ForNounTenses(input.tiempo ?? input.tense, input.override, input.pers1, input.pers2);
        return {
          ...updated,
          ...buildGenerationValencySlotFrame({
            pers1: updated.pers1,
            pers2: updated.pers2
          })
        };
      }
      if (tense === "sustantivo-verbal" || targetObject.isPotencialProfileTense(tense) || tense === "agentivo" || tense === "agentivo-presente" || tense === "agentivo-preterito" || tense === "agentivo-futuro" || tense === "patientivo") {
        if (!Object.prototype.hasOwnProperty.call(override || {}, "pers1")) {
          pers1 = "";
        }
        if (!Object.prototype.hasOwnProperty.call(override || {}, "pers2") && !Object.prototype.hasOwnProperty.call(override || {}, "num2")) {
          pers2 = "";
        }
      }
      return {
        ...buildGenerationValencySlotFrame({
          pers1,
          pers2
        })
      };
    }
    function resetPers1Pers2ForNominalTiempos(input = {}) {
      return resetPers1Pers2ForNounTenses(normalizeGenerationValencySlotInput(input));
    }
    function applyPassiveImpersonalSlotOverrides(input = {}) {
      const {
        pers1,
        pers2,
        obj1,
        analysisVerb,
        preserveSubjectForPassive,
        allowPassiveObject
      } = normalizeGenerationValencySlotInput(input);
      const updated = targetObject.applyPassiveImpersonal({
        pers1,
        pers2,
        obj1,
        analysisVerb,
        preservePers1Pers2: preserveSubjectForPassive,
        allowObj1: allowPassiveObject
      });
      const valencyObjectSlotGate = buildGenerationValencyObjectSlotMutationGate({
        operation: "apply-passive-impersonal-slot-overrides",
        mutationKind: obj1 !== updated.obj1 ? "delete-object-slot" : "none",
        reason: obj1 !== updated.obj1 ? "passive-impersonal-slot-override" : "",
        sourceObj1: obj1,
        sourceBaseObj1: obj1,
        targetObj1: updated.obj1,
        targetBaseObj1: updated.obj1,
        options: input
      });
      if (valencyObjectSlotGate.status === "blocked") {
        return {
          ...buildGenerationValencySlotFrame({
            pers1,
            pers2,
            obj1
          }),
          morphologyObj1: obj1,
          blocked: true,
          generationAllowed: false,
          routeRankingAllowed: false,
          diagnosticId: valencyObjectSlotGate.diagnosticId,
          routeStage: valencyObjectSlotGate.routeStage,
          valencyObjectSlotGate
        };
      }
      return {
        ...buildGenerationValencySlotFrame({
          pers1: updated.pers1,
          pers2: updated.pers2,
          obj1: updated.obj1
        }),
        morphologyObj1: updated.obj1,
        valencyObjectSlotGate
      };
    }
    function applyReflexivoAutoSwitch(input = {}) {
      let {
        pers1,
        pers2,
        obj1,
        isPassiveImpersonal,
        clearError
      } = normalizeGenerationValencySlotInput(input);
      const sourceObj1 = obj1;
      let isReflexive = obj1 === "mu";
      let shouldClearObjectError = false;
      let mutationReason = "";
      if (!isPassiveImpersonal) {
        if (targetObject.isPers1Obj1Reflexivo(pers1, pers2, obj1)) {
          obj1 = "mu";
          isReflexive = true;
          shouldClearObjectError = true;
          mutationReason = "same-person-object-reflexive-auto-switch";
        } else if (obj1 === "mu") {
          isReflexive = true;
        }
      }
      const valencyObjectSlotGate = buildGenerationValencyObjectSlotMutationGate({
        operation: "apply-reflexivo-auto-switch",
        mutationKind: sourceObj1 !== obj1 ? "reclassify-object-slot-reflexive" : "none",
        reason: mutationReason,
        sourceObj1,
        sourceBaseObj1: sourceObj1,
        targetObj1: obj1,
        targetBaseObj1: obj1,
        options: input
      });
      if (valencyObjectSlotGate.status === "blocked") {
        return {
          ...buildGenerationValencySlotFrame({
            pers1,
            pers2,
            obj1: sourceObj1
          }),
          isReflexive: sourceObj1 === "mu",
          blocked: true,
          generationAllowed: false,
          routeRankingAllowed: false,
          diagnosticId: valencyObjectSlotGate.diagnosticId,
          routeStage: valencyObjectSlotGate.routeStage,
          valencyObjectSlotGate
        };
      }
      if (shouldClearObjectError && clearError) {
        clearError("object-prefix");
      }
      return {
        ...buildGenerationValencySlotFrame({
          pers1,
          pers2,
          obj1
        }),
        isReflexive,
        valencyObjectSlotGate
      };
    }

    const api = {};
    Object.defineProperty(api, "GENERATION_VALENCY_OBJECT_SLOT_GATE_DIAGNOSTIC_ID", {
        configurable: true,
        enumerable: true,
        get() { return GENERATION_VALENCY_OBJECT_SLOT_GATE_DIAGNOSTIC_ID; },
    });
    Object.defineProperty(api, "GENERATION_VALENCY_OBJECT_SLOT_GATE_ROUTE_STAGE", {
        configurable: true,
        enumerable: true,
        get() { return GENERATION_VALENCY_OBJECT_SLOT_GATE_ROUTE_STAGE; },
    });
    api.normalizeGenerationValencySlotInput = normalizeGenerationValencySlotInput;
    api.buildGenerationValencySlotFrame = buildGenerationValencySlotFrame;
    api.cloneGenerationValencyLessonRecord = cloneGenerationValencyLessonRecord;
    Object.defineProperty(api, "LESSON21_PASSIVE_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON21_PASSIVE_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON21_PASSIVE_TRANSFORMATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_TRANSFORMATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON21_PASSIVE_GENERATION_CASES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_GENERATION_CASES; },
    });
    Object.defineProperty(api, "LESSON21_PASSIVE_MOOD_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_MOOD_FRAME; },
    });
    Object.defineProperty(api, "LESSON21_ACTIVE_REFLEXIVE_PASSIVE_NOTION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_ACTIVE_REFLEXIVE_PASSIVE_NOTION_FRAME; },
    });
    Object.defineProperty(api, "LESSON21_PASSIVE_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON21_PASSIVE_SUBSECTION_INVENTORY; },
    });
    api.getLesson21PassiveVoiceSubsectionInventory = getLesson21PassiveVoiceSubsectionInventory;
    api.buildLesson21PassiveVoicePursuitFrame = buildLesson21PassiveVoicePursuitFrame;
    Object.defineProperty(api, "LESSON22_IMPERSONAL_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON22_IMPERSONAL_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON22_INHERENT_IMPERSONAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_INHERENT_IMPERSONAL_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_NONANIMATE_DISTINCTION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_NONANIMATE_DISTINCTION_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_IMPERSONAL_TRANSFORMATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_TRANSFORMATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_IMPERSONAL_GENERATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_GENERATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_IMPERSONAL_MOOD_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_MOOD_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_TA_IMPERSONAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_TA_IMPERSONAL_FRAME; },
    });
    Object.defineProperty(api, "LESSON22_IMPERSONAL_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON22_IMPERSONAL_SUBSECTION_INVENTORY; },
    });
    api.getLesson22ImpersonalVoiceSubsectionInventory = getLesson22ImpersonalVoiceSubsectionInventory;
    api.buildLesson22ImpersonalVoicePursuitFrame = buildLesson22ImpersonalVoicePursuitFrame;
    api.shouldDropBoundObjectPrefix = shouldDropBoundObjectPrefix;
    api.shouldDropOccupiedSourceObjectPrefix = shouldDropOccupiedSourceObjectPrefix;
    api.isGenerationValencyObjectOrFusionPrefix = isGenerationValencyObjectOrFusionPrefix;
    api.generationValencyEntradaGrammarObjectHasValenceObjectSignal = generationValencyEntradaGrammarObjectHasValenceObjectSignal;
    api.generationValencyEntradaGrammarObjectHasFixedFrame = generationValencyEntradaGrammarObjectHasFixedFrame;
    api.generationValencyFrameHasFixedValenceEvidence = generationValencyFrameHasFixedValenceEvidence;
    api.generationValencyFrameHasValenceObjectSignal = generationValencyFrameHasValenceObjectSignal;
    api.getGenerationValencyFrameCandidates = getGenerationValencyFrameCandidates;
    api.resolveGenerationValencyFrameFixed = resolveGenerationValencyFrameFixed;
    api.buildGenerationValencyObjectSlotMutationGate = buildGenerationValencyObjectSlotMutationGate;
    api.applyBoundMarkerSlotOverrides = applyBoundMarkerSlotOverrides;
    api.applyObj1Allomorphy = applyObj1Allomorphy;
    api.applyPassiveImpersonalSlotAdjustments = applyPassiveImpersonalSlotAdjustments;
    api.resetPers1Pers2ForNounTenses = resetPers1Pers2ForNounTenses;
    api.resetPers1Pers2ForNominalTiempos = resetPers1Pers2ForNominalTiempos;
    api.applyPassiveImpersonalSlotOverrides = applyPassiveImpersonalSlotOverrides;
    api.applyReflexivoAutoSwitch = applyReflexivoAutoSwitch;
    return api;
}

export function installGenerationValencyGlobals(targetObject = globalThis) {
    const api = createGenerationValencyModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
