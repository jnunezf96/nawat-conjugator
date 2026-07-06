// Native wrapper generated from src/core/vnc/honorific_pejorative/honorific_pejorative.js.

export function createHonorificPejorativeApi(targetObject = globalThis) {
    const HONORIFIC_PEJORATIVE_BOUNDARY_VERSION = 1;
    const HONORIFIC_PEJORATIVE_POLARITY = Object.freeze({
      honorific: "honorific",
      pejorative: "pejorative",
      neutral: "neutral",
      unknown: "unknown"
    });
    const HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE = Object.freeze({
      politeTranslation: "polite-translation",
      pejorativeTranslation: "pejorative-translation",
      ordinaryCausative: "ordinary-causative",
      ordinaryApplicative: "ordinary-applicative",
      nonactiveDerivation: "nonactive-derivation",
      personLabel: "person-label",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const HONORIFIC_PEJORATIVE_ANTI_CONFLATION_RULES = Object.freeze(["honorific/pejorative boundary metadata is not generation", "polite or insulting translation labels are not orthography-bridge fixture evidence", "ordinary causative/applicative derivation is not honorific or pejorative VNC generation", "nonactive/passive/impersonal derivation is not honorific or pejorative VNC generation", "person or agreement labels are not honorific or pejorative VNC evidence", "Andrews honorific/pejorative categories are architecture, not Nawat/Pipil orthography authority"]);
    const HONORIFIC_PEJORATIVE_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "sourceStem",
      asks: "Which VNC stem is the source of the honorific or pejorative candidate?"
    }), Object.freeze({
      field: "polarity",
      asks: "Is the candidate honorific, pejorative, neutral, or unknown?"
    }), Object.freeze({
      field: "morphologicalStrategy",
      asks: "Which Andrews honorific or pejorative strategy is structurally licensed?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "Which Andrews source gate or structured route licenses the status?"
    })]);
    const LESSON33_HONORIFIC_PEJORATIVE_VALIDATION_REFS = Object.freeze(["src/tests/honorific_pejorative.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS = Object.freeze(["Andrews Lesson 33.1", "Andrews Lesson 33.2", "Andrews Lesson 33.3", "Andrews Lesson 33.4", "Andrews Lesson 33.5", "Andrews Lesson 33.6", "Andrews Lesson 33.7", "Andrews Lesson 33.8", "Andrews Lesson 33.9", "Andrews Lesson 33.10"]);
    const LESSON33_HONORIFIC_OVERVIEW_FRAME = Object.freeze({
      kind: "lesson-33-honorific-overview-frame",
      sourceSection: "Andrews 33.1",
      honorificMeaning: "respect or high esteem toward another entity",
      selfHonorificWarning: "one should not use an honorific to speak of oneself",
      ordinaryRoute: "neutral VNC transformed into causative or applicative VNC with reflexive mainline object",
      reflexiveSourceRoute: "mainline reflexive-object source requires special compound stem",
      translationSymbolIsNotEvidence: "H marks an honorific source in glosses; translation tone is not structural evidence"
    });
    const LESSON33_INTRANSITIVE_CAUSATIVE_FRAME = Object.freeze({
      kind: "lesson-33-intransitive-causative-honorific-frame",
      sourceSection: "Andrews 33.2",
      sourceKind: "intransitive VNC",
      strategy: "honorific-via-causative-reflexive",
      reflexiveObjectPresentsHonoredEntityAsCausingSelfToAct: true,
      causativeFamilies: Object.freeze(["type-one-causative", "type-two-causative", "lia-causative"]),
      irregularIntransitiveBoundary: Object.freeze({
        causativeHonorificsAttested: true,
        connectiveTCompoundOftenPreferred: true,
        yaUhAndHualLaUhUseMoHuica: true,
        huiTzUsesMoHuicaTz: true,
        optativeUnavailableForMoHuicaTzSoIndicativeCommandsUsed: true
      }),
      causativeOrApplicativeChoiceMayVaryByVerb: true
    });
    const LESSON33_INTRANSITIVE_APPLICATIVE_FRAME = Object.freeze({
      kind: "lesson-33-intransitive-applicative-honorific-frame",
      sourceSection: "Andrews 33.3",
      sourceKind: "intransitive VNC",
      strategy: "honorific-via-applicative-reflexive",
      semanticPresentation: "honored subject acts for own sake or interest",
      someApplicativeStemsOnlyOccurInHonorificVncs: true,
      causativeOrApplicativeChoiceMayVaryByVerb: true
    });
    const LESSON33_PROJECTIVE_APPLICATIVE_FRAME = Object.freeze({
      kind: "lesson-33-projective-applicative-honorific-frame",
      sourceSection: "Andrews 33.4",
      sourceKind: "projective-object VNC",
      strategy: "honorific-via-applicative-reflexive",
      honoredEntityMayBeSubjectOrObject: true,
      ambiguityBecauseNoSignalIdentifiesHonoredEntity: true,
      firstPersonSubjectPermittedOnlyWhenPatientHonored: true
    });
    const LESSON33_CAUSATIVE_APPLICATIVE_SOURCE_FRAME = Object.freeze({
      kind: "lesson-33-causative-applicative-source-honorific-frame",
      sourceSection: "Andrews 33.5",
      sourceKinds: Object.freeze(["causative VNC", "applicative VNC"]),
      followsProjectiveObjectGeneralRule: true,
      strategy: "honorific-via-applicative-reflexive",
      existingCausativeApplicativeGenerationIsNotHonorificEvidence: true
    });
    const LESSON33_PROJECTIVE_CAUSATIVE_FRAME = Object.freeze({
      kind: "lesson-33-projective-causative-honorific-frame",
      sourceSection: "Andrews 33.6",
      sourceKind: "projective-object VNC",
      strategy: "honorific-via-causative-reflexive",
      honoredEntityMayBePatientOrAgent: true,
      ambiguityBecauseAgentStillCausesSelfToAct: true,
      causativeOrApplicativeChoiceMayVaryByVerb: true
    });
    const LESSON33_REFLEXIVE_SOURCE_FRAME = Object.freeze({
      kind: "lesson-33-reflexive-source-honorific-frame",
      sourceSection: "Andrews 33.7",
      sourceKind: "mainline reflexive-object VNC",
      strategy: "preterit-embed integrated compound",
      matrixStem: "tla-(tzin-o-a)",
      matrixMeaning: "cause something to become honored",
      sourceOfMatrix: "affective-matrix nounstem tzin",
      embeddedPredicate: "perfective stem plus preterit-tense zero",
      embeddedPredicateReplacesSpecificObjectOfMatrix: true,
      objectPronounsSameAsSourceVnc: true,
      validForVerbstemClasses: Object.freeze(["A", "B", "C", "D"]),
      shuntlineAndMainlineReflexiveSourcesMustRemainDistinct: true
    });
    const LESSON33_REVERENTIAL_FRAME = Object.freeze({
      kind: "lesson-33-reverential-frame",
      sourceSection: "Andrews 33.8",
      subtypeOfHonorific: true,
      strategy: "double honorific construction",
      firstHonorificBecomesReflexiveObjectVnc: true,
      honorificPreteritPredicateIncorporatedIntoTzinoaMatrix: true,
      translationSymbol: "R"
    });
    const LESSON33_PEJORATIVE_FRAME = Object.freeze({
      kind: "lesson-33-pejorative-frame",
      sourceSection: "Andrews 33.9",
      pejorativeMeaning: "contempt or scorn",
      strategy: "preterit-embed integrated compound",
      matrixStem: "tla-(pol-o-a)",
      matrixMeaning: "cause something to become disparaged",
      matrixOnlyUsedInThisConstruction: true,
      sourceOfMatrix: "affective-matrix nounstem pol",
      sourceKinds: Object.freeze(["intransitive VNC", "projective-object VNC", "reflexive-object VNC"]),
      selfPejorativePermitted: true,
      validForVerbstemClasses: Object.freeze(["A", "B", "C", "D"]),
      translationSymbol: "P"
    });
    const LESSON33_COMPOUND_VERBSTEM_FRAME = Object.freeze({
      kind: "lesson-33-compound-verbstem-honorific-pejorative-frame",
      sourceSection: "Andrews 33.10",
      compoundVerbstemsCanUndergoHonorificPejorativeTransform: true,
      intransitiveMatrixConnectiveTCompoundNormallyTransformsEmbed: true,
      itziHonorificInConnectiveTCompoundUsesApplicativeStem: "m-o+te-/tla-(itz-ti-lia)",
      idiomaticCompoundTransformsMatrixStem: true,
      sharedObjectCompoundTransformsMatrixStem: true,
      sharedObjectMatrixTransformShowsTighterBoundCompoundUnit: true
    });
    const LESSON33_HONORIFIC_PEJORATIVE_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson33-honorific-overview",
      andrewsSection: "33.1",
      category: "honorific-vnc-overview",
      directiveEs: "El honorifico expresa respeto hacia otra entidad; no es una etiqueta de traduccion ni una forma para hablar de uno mismo.",
      engineSurface: "diagnostic honorific overview frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson33-intransitive-causative",
      andrewsSection: "33.2",
      category: "honorific-intransitive-causative",
      directiveEs: "Fuentes intransitivas pueden formar honorifico con causativo y reflexivo mainline; irregulares y compuestos requieren rutas propias.",
      engineSurface: "diagnostic intransitive causative frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson33-intransitive-applicative",
      andrewsSection: "33.3",
      category: "honorific-intransitive-applicative",
      directiveEs: "Algunas fuentes intransitivas forman honorifico con aplicativo reflexivo y accion en beneficio propio.",
      engineSurface: "diagnostic intransitive applicative frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson33-projective-applicative",
      andrewsSection: "33.4",
      category: "honorific-projective-applicative",
      directiveEs: "Fuentes con objeto proyectivo suelen usar aplicativo reflexivo; el honrado puede ser sujeto u objeto y queda ambiguo.",
      engineSurface: "diagnostic projective applicative frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson33-causative-applicative-sources",
      andrewsSection: "33.5",
      category: "honorific-causative-applicative-source",
      directiveEs: "VNC causativos y aplicativos siguen la regla de fuentes con objeto proyectivo; la derivacion ordinaria no basta como evidencia.",
      engineSurface: "diagnostic causative/applicative source frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson33-projective-causative",
      andrewsSection: "33.6",
      category: "honorific-projective-causative",
      directiveEs: "Algunas fuentes proyectivas usan causativo reflexivo y conservan ambiguedad agente/paciente.",
      engineSurface: "diagnostic projective causative frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson33-reflexive-sources",
      andrewsSection: "33.7",
      category: "honorific-reflexive-source",
      directiveEs: "Fuentes reflexivas mainline usan compuesto integrado con incrustado preterito y matriz tzin-o-a.",
      engineSurface: "diagnostic reflexive source frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson33-reverential",
      andrewsSection: "33.8",
      category: "reverential-vnc",
      directiveEs: "El reverencial dobla la construccion honorifica incorporando el preterito del honorifico en tzin-o-a.",
      engineSurface: "diagnostic reverential frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson33-pejorative",
      andrewsSection: "33.9",
      category: "pejorative-vnc",
      directiveEs: "El peyorativo usa compuesto con incrustado preterito y matriz pol-o-a para desprecio o escarnio.",
      engineSurface: "diagnostic pejorative frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson33-compound-verbstems",
      andrewsSection: "33.10",
      category: "compound-verbstem-honorific-pejorative",
      directiveEs: "Los compuestos verbales pueden transformarse; incrustado, matriz o unidad fija dependen del tipo de compuesto.",
      engineSurface: "diagnostic compound verbstem frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    })]);
    function cloneHonorificPejorativeLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneHonorificPejorativeLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneHonorificPejorativeLessonRecord(value)]));
    }
    function getLesson33HonorificPejorativeSubsectionInventory() {
      return LESSON33_HONORIFIC_PEJORATIVE_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
        validationRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_VALIDATION_REFS)
      }));
    }
    function buildLesson33HonorificPejorativePursuitFrame() {
      const subsectionInventory = getLesson33HonorificPejorativeSubsectionInventory();
      const overviewFrame = cloneHonorificPejorativeLessonRecord(LESSON33_HONORIFIC_OVERVIEW_FRAME);
      const intransitiveCausativeFrame = cloneHonorificPejorativeLessonRecord(LESSON33_INTRANSITIVE_CAUSATIVE_FRAME);
      const intransitiveApplicativeFrame = cloneHonorificPejorativeLessonRecord(LESSON33_INTRANSITIVE_APPLICATIVE_FRAME);
      const projectiveApplicativeFrame = cloneHonorificPejorativeLessonRecord(LESSON33_PROJECTIVE_APPLICATIVE_FRAME);
      const causativeApplicativeSourceFrame = cloneHonorificPejorativeLessonRecord(LESSON33_CAUSATIVE_APPLICATIVE_SOURCE_FRAME);
      const projectiveCausativeFrame = cloneHonorificPejorativeLessonRecord(LESSON33_PROJECTIVE_CAUSATIVE_FRAME);
      const reflexiveSourceFrame = cloneHonorificPejorativeLessonRecord(LESSON33_REFLEXIVE_SOURCE_FRAME);
      const reverentialFrame = cloneHonorificPejorativeLessonRecord(LESSON33_REVERENTIAL_FRAME);
      const pejorativeFrame = cloneHonorificPejorativeLessonRecord(LESSON33_PEJORATIVE_FRAME);
      const compoundVerbstemFrame = cloneHonorificPejorativeLessonRecord(LESSON33_COMPOUND_VERBSTEM_FRAME);
      const remainingGaps = ["Current honorific/pejorative metadata is not an honorific or pejorative VNC generator.", "Causative/applicative reflexive honorific routing, agent/patient ambiguity, and source-specific strategy choice remain diagnostic.", "Preterit-embed honorific and pejorative target stems now generate for supplied preterit predicates; reverential doubling and full finite UI expansion remain unimplemented.", "Compound-verbstem transformation targets and Andrews honorific or pejorative source models remain evidence-needed."];
      const frame = {
        kind: "lesson-33-honorific-pejorative-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 33,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS),
        plannedArrows: [{
          id: "lesson-33-honorific-pejorative-vnc-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 33.1-33.10 against current honorific/pejorative boundary metadata, causative/applicative reflexive routes, projective-object ambiguity, reflexive-source preterit embeds, reverential doubling, pejorative pol-o-a compounds, and compound-verbstem transforms.",
          andrewsRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-33-honorific-pejorative-vnc-audit",
          result: "hit",
          correction: "Lesson 33 now records Andrews honorific and pejorative VNC architecture, causative/applicative reflexive honorific routes, projective-object ambiguity, reflexive-source preterit embeds, reverential doubling, pejorative pol-o-a compounds, and compound-verbstem transformation boundaries while generating scoped preterit-embed target stems.",
          andrewsRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS),
          feedbackRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_VALIDATION_REFS)
        }],
        subsectionInventory,
        overviewFrame,
        intransitiveCausativeFrame,
        intransitiveApplicativeFrame,
        projectiveApplicativeFrame,
        causativeApplicativeSourceFrame,
        projectiveCausativeFrame,
        reflexiveSourceFrame,
        reverentialFrame,
        pejorativeFrame,
        compoundVerbstemFrame,
        currentEngineBoundary: {
          honorificPejorativeBoundaryMetadataImplemented: true,
          ordinaryCausativeApplicativeGenerationPreserved: true,
          honorificGenerationImplemented: false,
          pejorativeGenerationImplemented: false,
          reverentialGenerationImplemented: false,
          preteritEmbedTzinoaRoutingImplemented: true,
          preteritEmbedPuluaRoutingImplemented: true,
          compoundVerbstemTransformGenerationImplemented: false,
          finiteOutputExpansionAllowed: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachHonorificPejorativeGrammarContract(frame, {
        unitKind: "honorific-pejorative-vnc-boundary",
        routeStage: "audit-lesson-33",
        structuralSource: "Andrews Lesson 33",
        andrewsRefs: Array.from(LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 33.1-33.10",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: "orthography-bridge-plus-source-gate-required"
        },
        morphBoundaryFrame: {
          overviewFrame,
          intransitiveCausativeFrame,
          intransitiveApplicativeFrame,
          projectiveApplicativeFrame,
          causativeApplicativeSourceFrame,
          projectiveCausativeFrame,
          reflexiveSourceFrame,
          reverentialFrame,
          pejorativeFrame,
          compoundVerbstemFrame
        },
        stemFrame: {
          stemKind: "honorific-pejorative-vnc",
          honorificOrdinaryRoute: overviewFrame.ordinaryRoute,
          reflexiveHonorificMatrix: reflexiveSourceFrame.matrixStem,
          pejorativeMatrix: pejorativeFrame.matrixStem,
          compoundVerbstemsCanTransform: compoundVerbstemFrame.compoundVerbstemsCanUndergoHonorificPejorativeTransform
        },
        participantFrame: {
          honorificMeaning: overviewFrame.honorificMeaning,
          pejorativeMeaning: pejorativeFrame.pejorativeMeaning,
          honoredEntityMayBeSubjectOrObject: projectiveApplicativeFrame.honoredEntityMayBeSubjectOrObject,
          selfPejorativePermitted: pejorativeFrame.selfPejorativePermitted
        },
        targetContract: {
          metadataKind: "lesson-33-honorific-pejorative-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["honorific-pejorative-diagnostic-only", "honorific-pejorative-source-gated"]
      });
    }
    function attachHonorificPejorativeGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "vnc-derivation-boundary",
        routeFamily: "honorific-pejorative",
        structuralSource: "Andrews Lesson 33",
        andrewsRefs: ["Andrews Lesson 33"],
        ...options
      });
    }
    function normalizeHonorificPejorativeEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeHonorificPejorativePolarity(value = "") {
      return normalizeHonorificPejorativeEnum(value, Object.values(HONORIFIC_PEJORATIVE_POLARITY), HONORIFIC_PEJORATIVE_POLARITY.unknown);
    }
    function normalizeHonorificPejorativeFalsePositiveSource(value = "") {
      return normalizeHonorificPejorativeEnum(value, Object.values(HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE), HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE.unknown);
    }
    function normalizeHonorificPejorativeCandidateSurface(value = "") {
      const raw = String(value || "").trim();
      if (!raw || /[A-Z_]/.test(raw)) {
        return "";
      }
      const source = raw.replace(/\[[^\]]+\]/g, "").replace(/[Øø]/g, "").replace(/\b0\b/g, "").replace(/[#+(){}\s.-]/g, "").trim();
      if (!source || /[A-Z_]/.test(source)) {
        return "";
      }
      const conversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(source, {
        source: "Andrews honorific/pejorative candidate formula",
        slot: "honorific-pejorative-stem"
      }) : {
        output: source,
        diagnostics: []
      };
      return String(conversion?.output || source || "").trim();
    }
    function realizeHonorificPejorativeSegment(segment = "") {
      const raw = String(segment || "").trim();
      if (!raw || raw === "0" || raw === "Ø") {
        return "";
      }
      const conversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(raw, {
        source: "Andrews honorific/pejorative segment",
        slot: "honorific-pejorative-stem"
      }) : {
        output: raw,
        diagnostics: []
      };
      return String(conversion?.output || raw || "").trim();
    }
    function realizeHonorificPejorativeTargetStemFromSegments(segments = []) {
      return (Array.isArray(segments) ? segments : []).map(segment => realizeHonorificPejorativeSegment(segment)).filter(Boolean).join("");
    }
    function buildHonorificPejorativePreteritEmbedSourceFrame({
      preteritEmbedStem = "",
      sourceUnit = "VNC",
      sourceRole = "preterit-embedded-predicate",
      formulaSlots = null
    } = {}) {
      const normalizedEmbedStem = normalizeHonorificPejorativePreteritEmbedStem(preteritEmbedStem);
      if (!normalizedEmbedStem) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-honorific-pejorative-preterit-embed-source-frame",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        sourceUnit,
        sourceRole,
        preteritEmbedStem: normalizedEmbedStem,
        formulaSlots: formulaSlots && typeof formulaSlots === "object" ? Object.freeze({
          ...formulaSlots
        }) : null,
        renderedSurfaceIsNotAuthority: true
      });
    }
    function getHonorificPejorativeAntiConflationRules() {
      return Array.from(HONORIFIC_PEJORATIVE_ANTI_CONFLATION_RULES);
    }
    function getHonorificPejorativeStructuralQuestions() {
      return HONORIFIC_PEJORATIVE_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function buildHonorificPejorativeBoundaryMetadata() {
      const boundary = {
        kind: "honorific-pejorative-boundary",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        lesson: 33,
        status: "partial",
        structuralSource: "Andrews Lesson 33",
        targetAuthority: "Andrews source model plus orthography-bridge user-provided forms",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getHonorificPejorativeStructuralQuestions(),
        boundaries: {
          hasVncGeneration: true,
          hasHonorificGeneration: true,
          hasPejorativeGeneration: true,
          hasPreteritEmbedGeneration: true,
          hasConfirmedFixtureData: false,
          changesCausativeGeneration: false,
          changesApplicativeGeneration: false,
          changesNonactiveGeneration: false,
          changesVncGeneration: false,
          treatsTranslationToneAsEvidence: false
        },
        antiConflationRules: getHonorificPejorativeAntiConflationRules()
      };
      return attachHonorificPejorativeGrammarContract(boundary, {
        metadataKind: "honorific-pejorative-boundary",
        routeStage: "classify-boundary",
        supported: false,
        morphBoundaryFrame: boundary,
        targetContract: {
          metadataKind: "honorific-pejorative-boundary",
          generationAllowed: false,
          hasHonorificGeneration: true,
          hasPejorativeGeneration: true,
          hasPreteritEmbedGeneration: true
        }
      });
    }
    function getHonorificPejorativePreteritEmbedMatrix(polarity = "") {
      const normalizedPolarity = normalizeHonorificPejorativePolarity(polarity);
      if (normalizedPolarity === HONORIFIC_PEJORATIVE_POLARITY.honorific) {
        return {
          ok: true,
          polarity: normalizedPolarity,
          matrixStem: "tzin-o-a",
          matrixSource: "tla-(tzin-o-a)",
          andrewsSection: "33.7",
          routeStage: "honorific-preterit-embed-tzinoa",
          meaning: "cause something to become honored"
        };
      }
      if (normalizedPolarity === HONORIFIC_PEJORATIVE_POLARITY.pejorative) {
        return {
          ok: true,
          polarity: normalizedPolarity,
          matrixStem: "pol-o-a",
          matrixSource: "tla-(pol-o-a)",
          andrewsSection: "33.9",
          routeStage: "pejorative-preterit-embed-poloa",
          meaning: "cause something to become disparaged"
        };
      }
      return {
        ok: false,
        polarity: normalizedPolarity,
        diagnostics: ["honorific-pejorative-preterit-embed-polarity-required"]
      };
    }
    function normalizeHonorificPejorativePreteritEmbedStem(value = "") {
      return String(value || "").trim().replace(/[Øø]/g, "0").replace(/\s+/g, "");
    }
    function isHonorificPejorativePreteritEmbedSourceFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-honorific-pejorative-preterit-embed-source-frame" && String(frame.preteritEmbedStem || "").trim());
    }
    function isHonorificPejorativePreteritEmbedOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-honorific-pejorative-preterit-embed-operation-frame" && isHonorificPejorativePreteritEmbedSourceFrame(frame.sourceFrame) && frame.matrixFrame && typeof frame.matrixFrame === "object" && frame.targetFrame && typeof frame.targetFrame === "object");
    }
    function buildHonorificPejorativePreteritEmbedOperationFrame({
      sourceFrame = null,
      objectPrefix = "",
      personPrefix = "0-0",
      polarity = "",
      tenseMorph = "0",
      num1 = "0",
      num2 = "0"
    } = {}) {
      if (!isHonorificPejorativePreteritEmbedSourceFrame(sourceFrame)) {
        return null;
      }
      const matrix = getHonorificPejorativePreteritEmbedMatrix(polarity);
      if (matrix.ok !== true) {
        return null;
      }
      const matrixSegments = String(matrix.matrixStem || "").split("-").filter(Boolean);
      const embedSegments = String(sourceFrame.preteritEmbedStem || "").split("-").filter(Boolean);
      const targetSegments = Object.freeze([...embedSegments, ...matrixSegments]);
      const targetStemClassical = `${sourceFrame.preteritEmbedStem}-${matrix.matrixStem}`;
      return Object.freeze({
        kind: "andrews-honorific-pejorative-preterit-embed-operation-frame",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        operationId: "lesson-33-preterit-embed-honorific-pejorative",
        operationFamily: "honorific-pejorative-preterit-embed",
        sourceFrame,
        matrixFrame: Object.freeze({
          kind: "andrews-honorific-pejorative-matrix-frame",
          polarity: matrix.polarity,
          matrixStem: matrix.matrixStem,
          matrixSource: matrix.matrixSource,
          andrewsSection: matrix.andrewsSection,
          routeStage: matrix.routeStage,
          meaning: matrix.meaning
        }),
        inflectionFrame: Object.freeze({
          personPrefix: String(personPrefix || "0-0").trim() || "0-0",
          objectPrefix: String(objectPrefix || "").trim(),
          tenseMorph: String(tenseMorph || "0").trim() || "0",
          num1: String(num1 || "0").trim() || "0",
          num2: String(num2 || "0").trim() || "0"
        }),
        targetFrame: Object.freeze({
          kind: "andrews-honorific-pejorative-preterit-embed-target-frame",
          targetUnit: "CNV",
          targetSegments,
          targetStemClassical
        }),
        renderedSurfaceIsNotAuthority: true
      });
    }
    function buildAndrewsHonorificPejorativePreteritEmbedVnc({
      sourceStem = "",
      preteritEmbedStem = "",
      objectPrefix = "",
      personPrefix = "0-0",
      polarity = "",
      tenseMorph = "0",
      num1 = "0",
      num2 = "0",
      operationFrame = null
    } = {}) {
      void preteritEmbedStem;
      void objectPrefix;
      void personPrefix;
      void polarity;
      void tenseMorph;
      void num1;
      void num2;
      if (!isHonorificPejorativePreteritEmbedOperationFrame(operationFrame)) {
        const blocked = {
          kind: "honorific-pejorative-preterit-embed-generation",
          version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
          sourceStem: String(sourceStem || ""),
          preteritEmbedStem: "",
          generationAllowed: false,
          diagnostics: ["honorific-pejorative-preterit-embed-missing-typed-operation-frame"]
        };
        return attachHonorificPejorativeGrammarContract(blocked, {
          metadataKind: "honorific-pejorative-preterit-embed-generation",
          routeStage: "block-preterit-embed-generation",
          sourceInput: blocked.sourceStem,
          supported: false,
          diagnostics: blocked.diagnostics
        });
      }
      const sourceFrame = operationFrame.sourceFrame;
      const matrix = operationFrame.matrixFrame;
      const inflection = operationFrame.inflectionFrame || {};
      const targetFrame = operationFrame.targetFrame || {};
      const expectedTargetStemClassical = [sourceFrame.preteritEmbedStem, ...String(matrix.matrixStem || "").split("-").filter(Boolean)].join("-");
      const targetStemClassical = String(targetFrame.targetStemClassical || "").trim();
      if (!targetStemClassical || targetStemClassical !== expectedTargetStemClassical) {
        const blocked = {
          kind: "honorific-pejorative-preterit-embed-generation",
          version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
          sourceStem: String(sourceFrame.preteritEmbedStem || ""),
          preteritEmbedStem: String(sourceFrame.preteritEmbedStem || ""),
          generationAllowed: false,
          diagnostics: ["honorific-pejorative-preterit-embed-contradictory-typed-operation-frame"]
        };
        return attachHonorificPejorativeGrammarContract(blocked, {
          metadataKind: "honorific-pejorative-preterit-embed-generation",
          routeStage: "block-contradictory-preterit-embed-frame",
          sourceInput: blocked.sourceStem,
          supported: false,
          diagnostics: blocked.diagnostics
        });
      }
      const objectSlot = String(inflection.objectPrefix || "").trim();
      const objectFormula = objectSlot ? `+${objectSlot}` : "";
      const person = String(inflection.personPrefix || "0-0").trim() || "0-0";
      const resolvedTenseMorph = String(inflection.tenseMorph || "0").trim() || "0";
      const resolvedNum1 = String(inflection.num1 || "0").trim() || "0";
      const resolvedNum2 = String(inflection.num2 || "0").trim() || "0";
      const structuralFormula = `#${person}${objectFormula}(${targetStemClassical})${resolvedTenseMorph}+${resolvedNum1}-${resolvedNum2}#`;
      const surface = realizeHonorificPejorativeTargetStemFromSegments(targetFrame.targetSegments);
      const generation = {
        kind: "honorific-pejorative-preterit-embed-generation",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        sourceStem: String(sourceFrame.preteritEmbedStem || ""),
        preteritEmbedStem: sourceFrame.preteritEmbedStem,
        objectPrefix: objectSlot,
        personPrefix: person,
        polarity: matrix.polarity,
        matrixStem: matrix.matrixStem,
        matrixSource: matrix.matrixSource,
        targetStemClassical,
        targetStem: surface,
        structuralFormula,
        surface,
        surfaceForms: surface ? [surface] : [],
        generationAllowed: Boolean(surface),
        formulaSlots: {
          pers: person,
          objectPrefix: objectSlot,
          preteritEmbedStem: sourceFrame.preteritEmbedStem,
          matrixStem: matrix.matrixStem,
          matrixSource: matrix.matrixSource,
          tenseMorph: resolvedTenseMorph,
          num1: resolvedNum1,
          num2: resolvedNum2
        },
        andrewsSection: matrix.andrewsSection,
        diagnostics: [`${matrix.polarity}-preterit-embed-andrews-generated`, "preterit-predicate-replaces-matrix-specific-object", "orthography-bridge-realized"],
        operationFrame
      };
      return attachHonorificPejorativeGrammarContract(generation, {
        metadataKind: "honorific-pejorative-preterit-embed-generation",
        routeStage: "generate-preterit-embed-honorific-pejorative",
        sourceInput: generation.sourceStem || generation.preteritEmbedStem,
        supported: generation.generationAllowed,
        generationAllowed: generation.generationAllowed,
        surface,
        surfaceForms: generation.surfaceForms,
        diagnostics: generation.diagnostics,
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: "orthography-bridge-realized",
          sourceSurface: targetStemClassical,
          surface,
          surfaceForms: generation.surfaceForms
        },
        stemFrame: {
          stemKind: "honorific-pejorative-preterit-embed",
          sourceStem: generation.sourceStem,
          preteritEmbedStem: sourceFrame.preteritEmbedStem,
          targetStem: targetStemClassical,
          realizedTargetStem: surface,
          matrixStem: matrix.matrixStem,
          matrixSource: matrix.matrixSource
        },
        participantFrame: {
          honorificPejorativePolarity: matrix.polarity,
          preteritPredicateReplacesSpecificObject: true
        },
        targetContract: {
          metadataKind: "honorific-pejorative-preterit-embed-generation",
          generationAllowed: generation.generationAllowed,
          andrewsSection: matrix.andrewsSection,
          finiteSurfaceExpansionAllowed: false,
          operationFrame
        }
      });
    }
    function classifyHonorificPejorativeCandidate({
      sourceStem = "",
      sourceFrame = null,
      candidate = "",
      polarity = "",
      morphologicalStrategy = "",
      evidenceSource = "",
      sourceGate = "",
      structuredSource = false,
      falsePositiveSource = "",
      preteritEmbedStem = "",
      objectPrefix = "",
      personPrefix = "0-0"
    } = {}) {
      const normalizedPolarity = normalizeHonorificPejorativePolarity(polarity);
      const normalizedFalsePositive = normalizeHonorificPejorativeFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const andrewsGeneration = !String(candidate || "").trim() ? (() => {
        const effectiveSourceFrame = sourceFrame || null;
        const operationFrame = buildHonorificPejorativePreteritEmbedOperationFrame({
          sourceFrame: effectiveSourceFrame,
          objectPrefix,
          personPrefix,
          polarity: normalizedPolarity
        });
        return buildAndrewsHonorificPejorativePreteritEmbedVnc({
          sourceStem,
          operationFrame
        });
      })() : null;
      const generatedCandidate = andrewsGeneration?.generationAllowed === true ? andrewsGeneration.targetStemClassical : "";
      const sourceSurface = andrewsGeneration?.generationAllowed === true ? andrewsGeneration.surface : "";
      const canGenerate = Boolean(andrewsGeneration?.generationAllowed === true && normalizedPolarity !== HONORIFIC_PEJORATIVE_POLARITY.unknown && normalizedFalsePositive === HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE.unknown);
      const classification = {
        kind: "honorific-pejorative-candidate-classification",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        sourceStem: String(sourceFrame?.preteritEmbedStem || sourceStem || ""),
        candidate: String(candidate || generatedCandidate || ""),
        polarity: normalizedPolarity,
        morphologicalStrategy: String(morphologicalStrategy || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceGate: String(sourceGate || ""),
        structuredSource: structuredSource === true,
        falsePositiveSource: normalizedFalsePositive,
        confirmed: canGenerate,
        supported: canGenerate,
        generationAllowed: canGenerate,
        surface: canGenerate ? sourceSurface : "",
        surfaceForms: canGenerate ? [sourceSurface] : [],
        ...(andrewsGeneration?.generationAllowed === true ? {
          andrewsGeneration,
          structuralFormula: andrewsGeneration.structuralFormula,
          formulaSlots: andrewsGeneration.formulaSlots
        } : {}),
        diagnostics: [andrewsGeneration?.generationAllowed === true ? `${normalizedPolarity}-preterit-embed-andrews-generated` : String(candidate || "").trim() && normalizedFalsePositive === HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE.unknown ? "honorific-pejorative-candidate-diagnostic-only" : hasEvidence ? "honorific-pejorative-needs-validation" : "honorific-pejorative-source-gate-required", normalizedPolarity !== HONORIFIC_PEJORATIVE_POLARITY.unknown ? "honorific-pejorative-category-recognized" : "honorific-pejorative-category-unconfirmed", normalizedFalsePositive !== HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE.unknown ? "honorific-pejorative-false-positive-source" : canGenerate ? "honorific-pejorative-structured-source" : "honorific-pejorative-unconfirmed"],
        boundary: buildHonorificPejorativeBoundaryMetadata()
      };
      return attachHonorificPejorativeGrammarContract(classification, {
        metadataKind: "honorific-pejorative-candidate-classification",
        routeStage: canGenerate ? "generate-structured-honorific-pejorative" : "classify-candidate",
        sourceInput: classification.sourceStem || classification.candidate,
        generationAllowed: canGenerate,
        supported: canGenerate,
        evidenceSource: classification.sourceGate || classification.evidenceSource,
        surfaceForms: classification.surfaceForms,
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: canGenerate ? "orthography-bridge-realized" : "orthography-bridge-required",
          sourceSurface: andrewsGeneration?.targetStemClassical || classification.candidate,
          surface: classification.surface,
          surfaceForms: classification.surfaceForms
        },
        diagnostics: classification.diagnostics,
        stemFrame: {
          stemKind: "honorific-pejorative-candidate",
          sourceStem: classification.sourceStem,
          targetStem: classification.candidate,
          realizedTargetStem: classification.surface,
          morphologicalStrategy: classification.morphologicalStrategy,
          sourceGate: classification.sourceGate
        },
        participantFrame: {
          honorificPejorativePolarity: normalizedPolarity,
          preteritPredicateReplacesSpecificObject: andrewsGeneration?.generationAllowed === true,
          evidenceSource: classification.sourceGate || classification.evidenceSource
        },
        targetContract: {
          metadataKind: "honorific-pejorative-candidate-classification",
          generationAllowed: canGenerate,
          polarity: normalizedPolarity,
          preteritEmbedGenerated: andrewsGeneration?.generationAllowed === true
        }
      });
    }
    function classifyHonorificPejorativeFalsePositive(source = "") {
      const normalizedSource = normalizeHonorificPejorativeFalsePositiveSource(source);
      const classification = {
        kind: "honorific-pejorative-false-positive",
        version: HONORIFIC_PEJORATIVE_BOUNDARY_VERSION,
        source: normalizedSource,
        isHonorificEvidence: false,
        isPejorativeEvidence: false,
        generationAllowed: false,
        diagnostics: ["honorific-pejorative-false-positive-source"],
        antiConflationRules: getHonorificPejorativeAntiConflationRules()
      };
      return attachHonorificPejorativeGrammarContract(classification, {
        metadataKind: "honorific-pejorative-false-positive",
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
        diagnostics: classification.diagnostics
      });
    }

    const api = {};
    Object.defineProperty(api, "HONORIFIC_PEJORATIVE_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return HONORIFIC_PEJORATIVE_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "HONORIFIC_PEJORATIVE_POLARITY", {
        configurable: true,
        enumerable: true,
        get() { return HONORIFIC_PEJORATIVE_POLARITY; },
    });
    Object.defineProperty(api, "HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return HONORIFIC_PEJORATIVE_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "HONORIFIC_PEJORATIVE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return HONORIFIC_PEJORATIVE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "HONORIFIC_PEJORATIVE_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return HONORIFIC_PEJORATIVE_STRUCTURAL_QUESTIONS; },
    });
    Object.defineProperty(api, "LESSON33_HONORIFIC_PEJORATIVE_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_HONORIFIC_PEJORATIVE_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_HONORIFIC_PEJORATIVE_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON33_HONORIFIC_OVERVIEW_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_HONORIFIC_OVERVIEW_FRAME; },
    });
    Object.defineProperty(api, "LESSON33_INTRANSITIVE_CAUSATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_INTRANSITIVE_CAUSATIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON33_INTRANSITIVE_APPLICATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_INTRANSITIVE_APPLICATIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON33_PROJECTIVE_APPLICATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_PROJECTIVE_APPLICATIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON33_CAUSATIVE_APPLICATIVE_SOURCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_CAUSATIVE_APPLICATIVE_SOURCE_FRAME; },
    });
    Object.defineProperty(api, "LESSON33_PROJECTIVE_CAUSATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_PROJECTIVE_CAUSATIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON33_REFLEXIVE_SOURCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_REFLEXIVE_SOURCE_FRAME; },
    });
    Object.defineProperty(api, "LESSON33_REVERENTIAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_REVERENTIAL_FRAME; },
    });
    Object.defineProperty(api, "LESSON33_PEJORATIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_PEJORATIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON33_COMPOUND_VERBSTEM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_COMPOUND_VERBSTEM_FRAME; },
    });
    Object.defineProperty(api, "LESSON33_HONORIFIC_PEJORATIVE_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON33_HONORIFIC_PEJORATIVE_SUBSECTION_INVENTORY; },
    });
    api.cloneHonorificPejorativeLessonRecord = cloneHonorificPejorativeLessonRecord;
    api.getLesson33HonorificPejorativeSubsectionInventory = getLesson33HonorificPejorativeSubsectionInventory;
    api.buildLesson33HonorificPejorativePursuitFrame = buildLesson33HonorificPejorativePursuitFrame;
    api.attachHonorificPejorativeGrammarContract = attachHonorificPejorativeGrammarContract;
    api.normalizeHonorificPejorativeEnum = normalizeHonorificPejorativeEnum;
    api.normalizeHonorificPejorativePolarity = normalizeHonorificPejorativePolarity;
    api.normalizeHonorificPejorativeFalsePositiveSource = normalizeHonorificPejorativeFalsePositiveSource;
    api.normalizeHonorificPejorativeCandidateSurface = normalizeHonorificPejorativeCandidateSurface;
    api.realizeHonorificPejorativeSegment = realizeHonorificPejorativeSegment;
    api.realizeHonorificPejorativeTargetStemFromSegments = realizeHonorificPejorativeTargetStemFromSegments;
    api.buildHonorificPejorativePreteritEmbedSourceFrame = buildHonorificPejorativePreteritEmbedSourceFrame;
    api.getHonorificPejorativeAntiConflationRules = getHonorificPejorativeAntiConflationRules;
    api.getHonorificPejorativeStructuralQuestions = getHonorificPejorativeStructuralQuestions;
    api.buildHonorificPejorativeBoundaryMetadata = buildHonorificPejorativeBoundaryMetadata;
    api.getHonorificPejorativePreteritEmbedMatrix = getHonorificPejorativePreteritEmbedMatrix;
    api.normalizeHonorificPejorativePreteritEmbedStem = normalizeHonorificPejorativePreteritEmbedStem;
    api.isHonorificPejorativePreteritEmbedSourceFrame = isHonorificPejorativePreteritEmbedSourceFrame;
    api.isHonorificPejorativePreteritEmbedOperationFrame = isHonorificPejorativePreteritEmbedOperationFrame;
    api.buildHonorificPejorativePreteritEmbedOperationFrame = buildHonorificPejorativePreteritEmbedOperationFrame;
    api.buildAndrewsHonorificPejorativePreteritEmbedVnc = buildAndrewsHonorificPejorativePreteritEmbedVnc;
    api.classifyHonorificPejorativeCandidate = classifyHonorificPejorativeCandidate;
    api.classifyHonorificPejorativeFalsePositive = classifyHonorificPejorativeFalsePositive;
    return api;
}

export function installHonorificPejorativeGlobals(targetObject = globalThis) {
    const api = createHonorificPejorativeApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
