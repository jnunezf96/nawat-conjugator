// Native wrapper generated from src/core/clause/complement/complement.js.

export function createComplementClauseGlobals(targetObject = globalThis) {
    const COMPLEMENT_CLAUSE_BOUNDARY_VERSION = 1;
    const COMPLEMENT_CLAUSE_ROLE = Object.freeze({
      objectComplement: "object-complement",
      subjectComplement: "subject-complement",
      adverbialComplement: "adverbial-complement",
      doubleNucleus: "double-nucleus",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_UNIT = Object.freeze({
      vnc: "vnc",
      nnc: "nnc",
      clause: "clause",
      sentence: "sentence",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY = Object.freeze({
      change: "change",
      materialComposition: "material-composition",
      designation: "designation",
      state: "state",
      identity: "identity",
      composition: "composition",
      coverage: "coverage",
      beginning: "beginning",
      satisfaction: "satisfaction",
      daring: "daring",
      cessation: "cessation",
      tarrying: "tarrying",
      relationalLexicalized: "relational-lexicalized",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_LINK = Object.freeze({
      objectPronounToComplementSubject: "object-pronoun-to-complement-subject",
      subjectPronounToComplementSubject: "subject-pronoun-to-complement-subject",
      possessorPronounToComplement: "possessor-pronoun-to-complement",
      principalSubjectToAdjoinedSubject: "principal-subject-to-adjoined-subject",
      relationalNncToCompatibleVerbstem: "relational-nnc-to-compatible-verbstem",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_ORDER = Object.freeze({
      complementPrincipal: "complement-principal",
      principalComplement: "principal-complement",
      discontinuous: "discontinuous",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE = Object.freeze({
      ordinaryVncOutput: "ordinary-vnc-output",
      ordinaryNncOutput: "ordinary-nnc-output",
      nominalizationProfile: "nominalization-profile",
      objectControlLabel: "object-control-label",
      subjectLabel: "subject-label",
      adverbTranslation: "adverb-translation",
      singleGeneratedWord: "single-generated-word",
      csvVerbSurface: "csv-verb-surface",
      routeLabel: "route-label",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES = Object.freeze(["complement-clause boundary metadata is not generation", "object controls and subject labels are not complement-clause evidence", "ordinary VNC or NNC output is not a complement AST", "nominalizationProfile is not a clause-level complement relation", "single generated words do not prove object, subject, or adverbial complements", "Andrews complementation categories are architecture, not Nawat/Pipil form authority"]);
    const COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "principalClause",
      asks: "Which Nawat/Pipil principal clause hosts the complement?"
    }), Object.freeze({
      field: "complement",
      asks: "Which Nawat/Pipil VNC, NNC, clause, or sentence functions as complement?"
    }), Object.freeze({
      field: "complementRole",
      asks: "Is the relation object complement, subject complement, adverbial complement, double nucleus, or unknown?"
    }), Object.freeze({
      field: "complementUnitType",
      asks: "Is the complement unit a VNC, NNC, clause, sentence, or unknown?"
    }), Object.freeze({
      field: "linkingEvidence",
      asks: "What marking, order, valency, or shared-argument evidence supports complement status?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Nawat/Pipil repo or user-provided clause evidence supports complementation?"
    })]);
    function normalizeComplementClauseEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeComplementClauseRole(value = "") {
      return normalizeComplementClauseEnum(value, Object.values(COMPLEMENT_CLAUSE_ROLE), COMPLEMENT_CLAUSE_ROLE.unknown);
    }
    function normalizeComplementClauseUnit(value = "") {
      return normalizeComplementClauseEnum(value, Object.values(COMPLEMENT_CLAUSE_UNIT), COMPLEMENT_CLAUSE_UNIT.unknown);
    }
    function normalizeComplementClauseSemanticCategory(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        material: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.materialComposition,
        composition: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.composition,
        composed: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.composition,
        name: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.designation,
        naming: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.designation,
        begin: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.beginning,
        start: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.beginning,
        covered: COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.coverage,
        "relational": COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.relationalLexicalized,
        "relational-idiom": COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.relationalLexicalized
      };
      return aliases[normalized] || normalizeComplementClauseEnum(normalized, Object.values(COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY), COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown);
    }
    function normalizeComplementClauseLink(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        object: COMPLEMENT_CLAUSE_LINK.objectPronounToComplementSubject,
        subject: COMPLEMENT_CLAUSE_LINK.subjectPronounToComplementSubject,
        possessor: COMPLEMENT_CLAUSE_LINK.possessorPronounToComplement,
        adverbial: COMPLEMENT_CLAUSE_LINK.principalSubjectToAdjoinedSubject,
        relational: COMPLEMENT_CLAUSE_LINK.relationalNncToCompatibleVerbstem
      };
      return aliases[normalized] || normalizeComplementClauseEnum(normalized, Object.values(COMPLEMENT_CLAUSE_LINK), COMPLEMENT_CLAUSE_LINK.unknown);
    }
    function normalizeComplementClauseOrder(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        preposed: COMPLEMENT_CLAUSE_ORDER.complementPrincipal,
        "complement-precedes-principal": COMPLEMENT_CLAUSE_ORDER.complementPrincipal,
        postposed: COMPLEMENT_CLAUSE_ORDER.principalComplement,
        "complement-follows-principal": COMPLEMENT_CLAUSE_ORDER.principalComplement
      };
      return aliases[normalized] || normalizeComplementClauseEnum(normalized, Object.values(COMPLEMENT_CLAUSE_ORDER), COMPLEMENT_CLAUSE_ORDER.unknown);
    }
    function normalizeComplementClauseFalsePositiveSource(value = "") {
      return normalizeComplementClauseEnum(value, Object.values(COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE), COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getComplementClauseAntiConflationRules() {
      return Array.from(COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES);
    }
    function getComplementClauseStructuralQuestions() {
      return COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachComplementClauseGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "complement-clause-boundary",
        routeFamily: "complement-clause",
        ...options
      });
    }
    const LESSON51_COMPLEMENT_VALIDATION_REFS = Object.freeze(["src/tests/complement.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON51_COMPLEMENT_PDF_REFS = Object.freeze(["Andrews Lesson 51.1", "Andrews Lesson 51.2", "Andrews Lesson 51.3", "Andrews Lesson 51.4"]);
    const LESSON51_DOUBLE_NUCLEUS_FRAME = Object.freeze({
      kind: "lesson-51-double-nucleus-complement-frame",
      sourceSection: "Andrews 51.1",
      complementIsAdjoinedNnc: true,
      complementKinds: Object.freeze([COMPLEMENT_CLAUSE_ROLE.objectComplement, COMPLEMENT_CLAUSE_ROLE.subjectComplement, COMPLEMENT_CLAUSE_ROLE.adverbialComplement]),
      incorporatedComplementCompoundVerbstemsRemainSeparate: true,
      doubleNucleusStructureNotWordGeneration: true
    });
    const LESSON51_OBJECT_COMPLEMENT_FRAME = Object.freeze({
      kind: "lesson-51-object-complement-frame",
      sourceSection: "Andrews 51.2",
      role: COMPLEMENT_CLAUSE_ROLE.objectComplement,
      link: COMPLEMENT_CLAUSE_LINK.objectPronounToComplementSubject,
      headPronounSlot: "object",
      onlyCertainPrincipalVerbstemsPermitComplementedObjects: true,
      distinctFromSharedReferentSupplementation: true,
      semanticCategories: Object.freeze({
        change: Object.freeze({
          sourceSection: "Andrews 51.2.1",
          complementNamesRoleAssumedByObjectReferent: true,
          reflexiveObjectCanBeComplemented: true,
          complementMayBeSubstantivalOrAdjectivalNnc: true
        }),
        materialComposition: Object.freeze({
          sourceSection: "Andrews 51.2.2",
          complementNounstemNamesMaterial: true,
          canSourceTransformedSentences: true
        }),
        designation: Object.freeze({
          sourceSection: "Andrews 51.2.3",
          complementNamesEntity: true,
          agreementVariantsPossible: true,
          nonspecificTlaCanHaveLocativeSupplementAndPlaceNameObjectComplement: true,
          possessiveNameConstructionChangesObjectComplementToPossessorComplement: true
        }),
        state: Object.freeze({
          sourceSection: "Andrews 51.2.4",
          adjectivalNncIndicatesObjectReferentState: true,
          compareIncorporatedComplementAndConnectiveTCompounds: true
        })
      })
    });
    const LESSON51_SUBJECT_COMPLEMENT_FRAME = Object.freeze({
      kind: "lesson-51-subject-complement-frame",
      sourceSection: "Andrews 51.3",
      role: COMPLEMENT_CLAUSE_ROLE.subjectComplement,
      link: COMPLEMENT_CLAUSE_LINK.subjectPronounToComplementSubject,
      headPronounSlot: "subject",
      complementStemMayBeSubstantivalOrAdjectival: true,
      semanticCategories: Object.freeze({
        identity: Object.freeze({
          sourceSection: "Andrews 51.3.1",
          complementIndicatesNatureOfSubjectReferent: true
        }),
        composition: Object.freeze({
          sourceSection: "Andrews 51.3.2",
          complementIndicatesMaterialOfSubjectReferent: true
        }),
        state: Object.freeze({
          sourceSection: "Andrews 51.3.3",
          complementIndicatesSubjectReferentState: true,
          resemblesAdverbialMannerButCentersOnSubjectPronoun: true,
          frequentNounstems: Object.freeze(["ce-l", "el", "iyo-h-0"]),
          possessorPronounInsideStemCanShareWithPrincipalSubject: true
        }),
        passiveObjectComplementTransform: Object.freeze({
          sourceSection: "Andrews 51.3.4",
          passiveTransformOfObjectComplementPossible: true
        })
      })
    });
    const LESSON51_ADVERBIAL_COMPLEMENT_FRAME = Object.freeze({
      kind: "lesson-51-adverbial-complement-frame",
      sourceSection: "Andrews 51.4",
      role: COMPLEMENT_CLAUSE_ROLE.adverbialComplement,
      complementHasAdverbLikeCapabilities: true,
      semanticCategories: Object.freeze({
        coverage: Object.freeze({
          sourceSection: "Andrews 51.4.1",
          principalStem: "mo-ca",
          complementMayBePreteritAgentiveAbundantOwnerhoodNnc: true,
          complementNncUsuallySingularEvenWhenAnimate: true
        }),
        beginning: Object.freeze({
          sourceSection: "Andrews 51.4.2",
          principalStem: "pehua",
          resemblesPurposeOrConjunctionButBelongsFullyToNeither: true,
          adjoinedSubjectSharesWithPrincipalSubject: true,
          adjoinedClauseUsuallyPresentTenseRegardlessOfPrincipalTense: true,
          futureTenseOccasionallyFound: true,
          impersonalConstructionPossible: true,
          contrastSupplementaryObjectConstruction: true
        }),
        satisfaction: Object.freeze({
          sourceSection: "Andrews 51.4.3",
          principalStem: "pach-i-hui",
          sameConstructionAsPehua: true,
          adjoinedClauseUsuallyPresentTense: true
        }),
        daring: Object.freeze({
          sourceSection: "Andrews 51.4.4",
          principalStems: Object.freeze(["tlahpal-i-hui", "m-o-tlahpal-o-a"]),
          adjoinedTenseDeterminedByPrincipalAndUsuallySubsequent: true,
          optativeCanSignalInsecurity: true
        }),
        cessation: Object.freeze({
          sourceSection: "Andrews 51.4.5",
          principalStem: "m-o-cahua"
        }),
        tarrying: Object.freeze({
          sourceSection: "Andrews 51.4.6",
          principalStem: "hueh-cahua"
        }),
        relationalLexicalized: Object.freeze({
          sourceSection: "Andrews 51.4.7",
          relationalNncCooperatesWithMeaningCompatibleVerbstem: true,
          combinationMustBeLearnedAsVocabulary: true,
          activeActionDerivationCanIncorporateAdverbializedNnc: true,
          personDyadBlocksDirectCommerceWithIncorporatedNncPossessor: true
        })
      })
    });
    const LESSON51_COMPLEMENT_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson51-double-nucleus-overview",
      andrewsSection: "51.1",
      category: "double-nucleus-complementation",
      directiveEs: "La complementacion de esta leccion usa una CNN adyacente como complemento; no es generacion de palabra.",
      engineSurface: "diagnostic complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-object-complement-overview",
      andrewsSection: "51.2",
      category: "object-complement",
      directiveEs: "El complemento de objeto enlaza el pronombre de objeto principal con el sujeto de la CNN complemento y se distingue de suplementacion.",
      engineSurface: "diagnostic object-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-object-change",
      andrewsSection: "51.2.1",
      category: "object-complement-change",
      directiveEs: "El complemento nombra el papel que asume el referente del objeto; tambien puede haber objeto reflexivo.",
      engineSurface: "diagnostic object-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-object-material",
      andrewsSection: "51.2.2",
      category: "object-complement-material",
      directiveEs: "El complemento de objeto puede nombrar el material del referente del objeto.",
      engineSurface: "diagnostic object-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-object-designation",
      andrewsSection: "51.2.3",
      category: "object-complement-designation",
      directiveEs: "El complemento puede designar nombre; con posesivo cambia a complemento de poseedor.",
      engineSurface: "diagnostic object-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-object-state",
      andrewsSection: "51.2.4",
      category: "object-complement-state",
      directiveEs: "Una CNN adjetival puede indicar el estado del referente del objeto.",
      engineSurface: "diagnostic object-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-complement-overview",
      andrewsSection: "51.3",
      category: "subject-complement",
      directiveEs: "El complemento de sujeto enlaza el sujeto de la CNN complemento con el sujeto de la CNV principal.",
      engineSurface: "diagnostic subject-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-identity",
      andrewsSection: "51.3.1",
      category: "subject-complement-identity",
      directiveEs: "El complemento de sujeto puede indicar identidad o naturaleza del referente.",
      engineSurface: "diagnostic subject-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-composition",
      andrewsSection: "51.3.2",
      category: "subject-complement-composition",
      directiveEs: "El complemento de sujeto puede indicar material o composicion.",
      engineSurface: "diagnostic subject-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-state",
      andrewsSection: "51.3.3",
      category: "subject-complement-state",
      directiveEs: "El estado de sujeto puede parecer manera adverbial, pero el enlace se centra en el pronombre de sujeto.",
      engineSurface: "diagnostic subject-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-subject-passive-transform",
      andrewsSection: "51.3.4",
      category: "passive-object-complement-transform",
      directiveEs: "Una construccion de complemento de sujeto puede ser transformacion pasiva de complemento de objeto.",
      engineSurface: "diagnostic subject-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-complement-overview",
      andrewsSection: "51.4",
      category: "adverbial-complement",
      directiveEs: "El complemento adverbial tiene capacidad adverbial y se licencia por familias de troncos principales.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-coverage",
      andrewsSection: "51.4.1",
      category: "coverage-complement",
      directiveEs: "Mo-ca toma complementos de cobertura o llenura; la CNN complemento suele ser singular incluso con tronco animado.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-beginning",
      andrewsSection: "51.4.2",
      category: "beginning-complement",
      directiveEs: "Pehua toma complemento que se parece a proposito o conjuncion, pero no se asigna completamente a ninguno.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-satisfaction",
      andrewsSection: "51.4.3",
      category: "satisfaction-complement",
      directiveEs: "Pachihui sigue el patron de pehua y normalmente lleva presente en la clausula adyacente.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-daring",
      andrewsSection: "51.4.4",
      category: "daring-complement",
      directiveEs: "Tlahpalihui o motlahpaloa determinan el tiempo del complemento, normalmente posterior.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-cessation",
      andrewsSection: "51.4.5",
      category: "cessation-complement",
      directiveEs: "Mocahua puede tomar complemento de cesacion.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-tarrying",
      andrewsSection: "51.4.6",
      category: "tarrying-complement",
      directiveEs: "Huehcahua puede tomar complemento de tardanza.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson51-adverbial-relational-lexicalized",
      andrewsSection: "51.4.7",
      category: "relational-lexicalized-complement",
      directiveEs: "Una CNN relacional puede asociarse idiomaticamente con tronco compatible; se aprende como vocabulario.",
      engineSurface: "diagnostic adverbial-complement frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    })]);
    function cloneComplementClauseLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneComplementClauseLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneComplementClauseLessonRecord(value)]));
    }
    function getLesson51ComplementClauseSubsectionInventory() {
      return LESSON51_COMPLEMENT_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: Array.from(LESSON51_COMPLEMENT_VALIDATION_REFS)
      }));
    }
    function buildLesson51ComplementClausePursuitFrame() {
      const subsectionInventory = getLesson51ComplementClauseSubsectionInventory();
      const doubleNucleusFrame = cloneComplementClauseLessonRecord(LESSON51_DOUBLE_NUCLEUS_FRAME);
      const objectComplementFrame = cloneComplementClauseLessonRecord(LESSON51_OBJECT_COMPLEMENT_FRAME);
      const subjectComplementFrame = cloneComplementClauseLessonRecord(LESSON51_SUBJECT_COMPLEMENT_FRAME);
      const adverbialComplementFrame = cloneComplementClauseLessonRecord(LESSON51_ADVERBIAL_COMPLEMENT_FRAME);
      const remainingGaps = ["Current Lesson 51 support records Andrews' complementation architecture as diagnostics and supplied-surface AST frames; it does not implement static complement data, complement parser/search detection, or surface generation.", "Classical examples and spelling-sensitive forms remain structural references only; Nawat/Pipil slot-scoped orthography and lexical surfaces require confirmed Nawat/Pipil evidence before visible output.", "Object-complement verbstem inventories, subject-complement state parsing, adverbial-complement stem-family routing, relational lexicalized vocabulary, passive transform detection, acciones de interfaz, and confirmed Nawat/Pipil examples remain partial or evidence-needed."];
      const frame = {
        kind: "lesson-51-complement-clause-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 51,
        aimStatus: "shooting",
        routeStage: "audit-lesson-51",
        pdfRefs: Array.from(LESSON51_COMPLEMENT_PDF_REFS),
        plannedArrows: [{
          id: "lesson-51-complement-clause-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 51.1-51.4 against current complement boundary metadata, supplied-surface AST behavior, double-nucleus structure, object/subject/adverbial complement categories, shared-pronoun links, passive transforms, and relational lexicalized adverbial complements.",
          andrewsRefs: Array.from(LESSON51_COMPLEMENT_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON51_COMPLEMENT_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-51-complement-clause-audit",
          result: "hit",
          correction: "Lesson 51 now records Andrews complementation architecture across double-nucleus complement structure, object complement categories, subject complement categories, adverbial complement stem families, passive object-complement transforms, and relational lexicalized complement behavior while keeping generation blocked.",
          andrewsRefs: Array.from(LESSON51_COMPLEMENT_PDF_REFS),
          feedbackRefs: Array.from(LESSON51_COMPLEMENT_VALIDATION_REFS)
        }],
        subsectionInventory,
        doubleNucleusFrame,
        objectComplementFrame,
        subjectComplementFrame,
        adverbialComplementFrame,
        currentEngineBoundary: {
          complementBoundaryMetadataImplemented: true,
          complementAstImplemented: true,
          relationContractImplemented: true,
          objectComplementFrameDiagnosticOnly: true,
          subjectComplementFrameDiagnosticOnly: true,
          adverbialComplementFrameDiagnosticOnly: true,
          passiveTransformDiagnosticOnly: true,
          relationalLexicalizedFrameDiagnosticOnly: true,
          parserDetectionImplemented: false,
          staticComplementDataImplemented: false,
          newWordGenerationAllowed: false,
          fullLesson51GenerationImplemented: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachComplementClauseGrammarContract(frame, {
        metadataKind: "lesson-51-complement-clause-pursuit-frame",
        unitKind: "complement-clause-boundary",
        routeStage: "audit-lesson-51",
        structuralSource: "Andrews Lesson 51",
        andrewsRefs: Array.from(LESSON51_COMPLEMENT_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 51.1-51.4",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil complement-clause evidence",
          noClassicalSurfaceImport: true,
          slotScopedOrthographyRequiredBeforeVisibleNawatSurface: true,
          orthographyStatus: "not-surface-bearing"
        },
        morphBoundaryFrame: {
          doubleNucleusFrame,
          objectComplementFrame,
          subjectComplementFrame,
          adverbialComplementFrame
        },
        nuclearClauseFrame: {
          sourceClauseKind: "double-nucleus complement structure",
          objectSubjectAndAdverbialComplementRolesTracked: true,
          objectComplementSharesPrincipalObjectWithComplementSubject: true,
          subjectComplementSharesPrincipalSubjectWithComplementSubject: true,
          adverbialComplementStemFamilyMustLicenseRelation: true
        },
        participantFrame: {
          semanticRole: "object complement, subject complement, adverbial complement, possessor complement, or relational lexicalized complement participant",
          translationComplementIsNotMorphology: true,
          supplementationPurposeAndConjunctionContrastsEvidenceGated: true
        },
        targetContract: {
          metadataKind: "lesson-51-complement-clause-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["complement-clause-lesson-51-diagnostic-partial", "complement-clause-needs-nawat-clause-evidence"]
      });
    }
    function buildComplementClauseBoundaryMetadata() {
      return {
        kind: "complement-clause-boundary",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        lesson: 51,
        status: "partial",
        structuralSource: "Andrews Lesson 51",
        targetAuthority: "Nawat/Pipil repo data and user-provided clauses",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getComplementClauseStructuralQuestions(),
        boundaries: {
          hasVncGeneration: true,
          hasNncGeneration: true,
          hasNominalizationProfileMetadata: true,
          hasComplementAst: true,
          hasConfirmedClauseExamples: false,
          hasStaticComplementData: false,
          changesVncGeneration: false,
          changesNncGeneration: false,
          changesNominalizationGeneration: false,
          changesValencyBehavior: false,
          treatsGeneratedWordAsComplementEvidence: false,
          treatsObjectControlAsComplementEvidence: false
        },
        antiConflationRules: getComplementClauseAntiConflationRules()
      };
    }
    function getComplementClauseSurface(input = "", fallback = "") {
      if (typeof input === "string") {
        return String(input || fallback || "").trim();
      }
      if (!input || typeof input !== "object") {
        return String(fallback || "").trim();
      }
      const surface = getComplementClauseSurfaceForms(input)[0];
      if (getComplementClauseResultFrame(input)?.resultFrame) {
        return String(surface || "").trim();
      }
      return String(surface || fallback || "").trim();
    }
    function splitComplementClauseSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => String(entry || "").trim()).filter(entry => entry && entry !== "—");
    }
    function getComplementClauseResultFrame(input = null) {
      return (input?.grammarFrame && typeof input.grammarFrame === "object" ? input.grammarFrame : null) || (input?.frames && typeof input.frames === "object" ? input.frames : null);
    }
    function getComplementClauseSurfaceForms(input = null) {
      if (typeof input === "string") {
        return splitComplementClauseSurfaceText(input);
      }
      if (!input || typeof input !== "object") {
        return [];
      }
      const grammarFrame = getComplementClauseResultFrame(input);
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
        return forms.flatMap(entry => splitComplementClauseSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(input.surfaceForms)) {
        forms.push(...input.surfaceForms);
      }
      if (!hasResultFrame && input.surface) {
        forms.push(input.surface);
      }
      if (!hasResultFrame && input.surfaceDisplay) {
        forms.push(input.surfaceDisplay);
      }
      if (!hasResultFrame && input.result) {
        forms.push(input.result);
      }
      if (!hasResultFrame && input.word) {
        forms.push(input.word);
      }
      return forms.flatMap(entry => splitComplementClauseSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function buildComplementClauseNode(input = "", role = "unknown", fallbackSurface = "") {
      const surface = getComplementClauseSurface(input, fallbackSurface);
      return {
        kind: "complement-clause-node",
        role: String(role || "unknown"),
        surface,
        clauseKind: typeof input === "object" && input ? String(input.clauseKind || input.nuclearClauseShell?.clauseKind || input.outputKind || "unknown") : "unknown",
        formulaEcho: typeof input === "object" && input ? String(input.formulaEcho || input.nuclearClauseShell?.formulaEcho || input.nncBasic?.formulaEcho || "") : "",
        preservesSurface: true
      };
    }
    function getDefaultComplementClauseLink(complementRole = "") {
      const normalizedRole = normalizeComplementClauseRole(complementRole);
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement) {
        return COMPLEMENT_CLAUSE_LINK.objectPronounToComplementSubject;
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.subjectComplement) {
        return COMPLEMENT_CLAUSE_LINK.subjectPronounToComplementSubject;
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.adverbialComplement) {
        return COMPLEMENT_CLAUSE_LINK.principalSubjectToAdjoinedSubject;
      }
      return COMPLEMENT_CLAUSE_LINK.unknown;
    }
    function buildComplementClauseSurfaceSequence({
      principalSurface = "",
      complementSurface = "",
      order = COMPLEMENT_CLAUSE_ORDER.complementPrincipal
    } = {}) {
      const principal = String(principalSurface || "").trim();
      const complement = String(complementSurface || "").trim();
      const normalizedOrder = normalizeComplementClauseOrder(order);
      if (normalizedOrder === COMPLEMENT_CLAUSE_ORDER.principalComplement) {
        return [principal, complement].filter(Boolean);
      }
      if (normalizedOrder === COMPLEMENT_CLAUSE_ORDER.discontinuous) {
        return [complement, "...", principal].filter(Boolean);
      }
      return [complement, principal].filter(Boolean);
    }
    function buildComplementClauseRelationContract({
      complementRole = "",
      semanticCategory = "",
      link = "",
      principalVerbStem = "",
      complementState = "",
      complementTense = "",
      passiveTransformOfObjectComplement = false
    } = {}) {
      const normalizedRole = normalizeComplementClauseRole(complementRole);
      const normalizedCategory = normalizeComplementClauseSemanticCategory(semanticCategory);
      const normalizedLink = normalizeComplementClauseLink(link || getDefaultComplementClauseLink(normalizedRole));
      const base = {
        role: normalizedRole,
        semanticCategory: normalizedCategory,
        link: normalizedLink,
        principalVerbStem: String(principalVerbStem || ""),
        complementState: String(complementState || ""),
        complementTense: String(complementTense || ""),
        distinctFromSupplementation: true,
        incorporatedComplementAlternative: normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement
      };
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement) {
        return {
          ...base,
          headPronounSlot: "object",
          complementSubjectSharesWith: "principal-object-pronoun",
          objectComplementTypes: ["change", "material-composition", "designation", "state"],
          possessiveNameComplementPossible: normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.designation
        };
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.subjectComplement) {
        return {
          ...base,
          headPronounSlot: "subject",
          complementSubjectSharesWith: "principal-subject-pronoun",
          subjectComplementTypes: ["identity", "composition", "state"],
          passiveTransformOfObjectComplement: passiveTransformOfObjectComplement === true
        };
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.adverbialComplement) {
        return {
          ...base,
          headPronounSlot: "principal-subject-or-compatible-relation",
          complementSubjectSharesWith: normalizedLink === COMPLEMENT_CLAUSE_LINK.relationalNncToCompatibleVerbstem ? "relational-nnc-compatible-verbstem" : "principal-subject-pronoun",
          adverbialComplementTypes: ["coverage", "beginning", "satisfaction", "daring", "cessation", "tarrying", "relational-lexicalized"],
          pehuaComplementUsuallyPresentTense: normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.beginning,
          activeActionCanIncorporateRelationalNnc: normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.relationalLexicalized
        };
      }
      return base;
    }
    function buildComplementClauseAst({
      principalClause = "",
      complement = "",
      principalSurface = "",
      complementSurface = "",
      complementRole = COMPLEMENT_CLAUSE_ROLE.unknown,
      complementUnitType = COMPLEMENT_CLAUSE_UNIT.unknown,
      semanticCategory = COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown,
      link = "",
      order = COMPLEMENT_CLAUSE_ORDER.complementPrincipal,
      principalVerbStem = "",
      complementState = "",
      complementTense = "",
      passiveTransformOfObjectComplement = false,
      evidenceSource = "",
      confirmed = false
    } = {}) {
      const normalizedRole = normalizeComplementClauseRole(complementRole);
      const normalizedUnit = normalizeComplementClauseUnit(complementUnitType);
      const normalizedCategory = normalizeComplementClauseSemanticCategory(semanticCategory);
      const normalizedLink = normalizeComplementClauseLink(link || getDefaultComplementClauseLink(normalizedRole));
      const normalizedOrder = normalizeComplementClauseOrder(order);
      const principalNode = buildComplementClauseNode(principalClause, "principal", principalSurface);
      const complementNode = buildComplementClauseNode(complement, "complement", complementSurface);
      const diagnostics = [];
      if (!principalNode.surface) {
        diagnostics.push("complement-clause-requires-principal-surface");
      }
      if (!complementNode.surface) {
        diagnostics.push("complement-clause-requires-complement-surface");
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.unknown) {
        diagnostics.push("complement-clause-role-unconfirmed");
      }
      if (normalizedUnit === COMPLEMENT_CLAUSE_UNIT.unknown) {
        diagnostics.push("complement-clause-unit-unconfirmed");
      }
      if (normalizedCategory === COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown) {
        diagnostics.push("complement-clause-semantic-category-unconfirmed");
      }
      if (normalizedOrder === COMPLEMENT_CLAUSE_ORDER.unknown) {
        diagnostics.push("complement-clause-order-unconfirmed");
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.objectComplement && normalizedLink !== COMPLEMENT_CLAUSE_LINK.objectPronounToComplementSubject && normalizedLink !== COMPLEMENT_CLAUSE_LINK.possessorPronounToComplement) {
        diagnostics.push("object-complement-requires-object-pronoun-link");
      }
      if (normalizedRole === COMPLEMENT_CLAUSE_ROLE.subjectComplement && normalizedLink !== COMPLEMENT_CLAUSE_LINK.subjectPronounToComplementSubject) {
        diagnostics.push("subject-complement-requires-subject-pronoun-link");
      }
      if (!String(evidenceSource || "").trim()) {
        diagnostics.push("complement-clause-needs-nawat-clause-evidence");
      }
      const supported = Boolean(principalNode.surface && complementNode.surface && normalizedRole !== COMPLEMENT_CLAUSE_ROLE.unknown && normalizedUnit !== COMPLEMENT_CLAUSE_UNIT.unknown && normalizedCategory !== COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY.unknown && normalizedOrder !== COMPLEMENT_CLAUSE_ORDER.unknown && !diagnostics.includes("object-complement-requires-object-pronoun-link") && !diagnostics.includes("subject-complement-requires-subject-pronoun-link"));
      const surfaceSequence = supported ? buildComplementClauseSurfaceSequence({
        principalSurface: principalNode.surface,
        complementSurface: complementNode.surface,
        order: normalizedOrder
      }) : [];
      return targetObject.attachGrammarAstContract({
        kind: "complement-clause-ast",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        lesson: 51,
        structuralSource: "Andrews Lesson 51",
        targetAuthority: "Nawat/Pipil clause outputs supplied to this builder",
        supported,
        confirmed: confirmed === true && Boolean(String(evidenceSource || "").trim()),
        complementRole: normalizedRole,
        complementUnitType: normalizedUnit,
        semanticCategory: normalizedCategory,
        order: normalizedOrder,
        principalClause: principalNode,
        complement: complementNode,
        link: {
          type: normalizedLink,
          sharedReferenceRequired: true,
          distinguishesFromSupplementation: true
        },
        relationContract: buildComplementClauseRelationContract({
          complementRole: normalizedRole,
          semanticCategory: normalizedCategory,
          link: normalizedLink,
          principalVerbStem,
          complementState,
          complementTense,
          passiveTransformOfObjectComplement
        }),
        surfaceSequence,
        surface: surfaceSequence.join(" "),
        evidenceSource: String(evidenceSource || ""),
        changesNawatSurfaceForms: false,
        changesValencyBehavior: false,
        newWordGenerationAllowed: false,
        generationAllowed: false,
        diagnostics,
        boundary: buildComplementClauseBoundaryMetadata()
      }, {
        astKind: "complement-clause-ast",
        lessons: [51],
        structuralSource: "Andrews Lesson 51"
      });
    }
    function classifyComplementClauseCandidate({
      principalClause = "",
      complement = "",
      candidate = "",
      complementRole = "",
      complementUnitType = "",
      linkingEvidence = "",
      evidenceSource = "",
      falsePositiveSource = ""
    } = {}) {
      const normalizedRole = normalizeComplementClauseRole(complementRole);
      const normalizedUnit = normalizeComplementClauseUnit(complementUnitType);
      const normalizedFalsePositive = normalizeComplementClauseFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      return {
        kind: "complement-clause-candidate-classification",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        principalClause: String(principalClause || ""),
        complement: String(complement || ""),
        candidate: String(candidate || ""),
        complementRole: normalizedRole,
        complementUnitType: normalizedUnit,
        linkingEvidence: String(linkingEvidence || ""),
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: false,
        diagnostics: [hasEvidence ? "complement-clause-needs-validation" : "complement-clause-needs-nawat-clause-evidence", normalizedRole !== COMPLEMENT_CLAUSE_ROLE.unknown ? "complement-clause-role-recognized" : "complement-clause-role-unconfirmed", normalizedUnit !== COMPLEMENT_CLAUSE_UNIT.unknown ? "complement-clause-unit-recognized" : "complement-clause-unit-unconfirmed", normalizedFalsePositive !== COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE.unknown ? "complement-clause-false-positive-source" : "complement-clause-unconfirmed"],
        boundary: buildComplementClauseBoundaryMetadata()
      };
    }
    function classifyComplementClauseFalsePositive(source = "") {
      const normalizedSource = normalizeComplementClauseFalsePositiveSource(source);
      return {
        kind: "complement-clause-false-positive",
        version: COMPLEMENT_CLAUSE_BOUNDARY_VERSION,
        source: normalizedSource,
        isComplementClauseEvidence: false,
        isComplementAstEvidence: false,
        generationAllowed: false,
        diagnostics: ["complement-clause-false-positive-source"],
        antiConflationRules: getComplementClauseAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_ROLE", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_ROLE; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_UNIT", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_UNIT; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_SEMANTIC_CATEGORY; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_LINK", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_LINK; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_ORDER; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return COMPLEMENT_CLAUSE_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeComplementClauseEnum = normalizeComplementClauseEnum;
    api.normalizeComplementClauseRole = normalizeComplementClauseRole;
    api.normalizeComplementClauseUnit = normalizeComplementClauseUnit;
    api.normalizeComplementClauseSemanticCategory = normalizeComplementClauseSemanticCategory;
    api.normalizeComplementClauseLink = normalizeComplementClauseLink;
    api.normalizeComplementClauseOrder = normalizeComplementClauseOrder;
    api.normalizeComplementClauseFalsePositiveSource = normalizeComplementClauseFalsePositiveSource;
    api.getComplementClauseAntiConflationRules = getComplementClauseAntiConflationRules;
    api.getComplementClauseStructuralQuestions = getComplementClauseStructuralQuestions;
    api.attachComplementClauseGrammarContract = attachComplementClauseGrammarContract;
    Object.defineProperty(api, "LESSON51_COMPLEMENT_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON51_COMPLEMENT_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON51_COMPLEMENT_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON51_COMPLEMENT_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON51_DOUBLE_NUCLEUS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON51_DOUBLE_NUCLEUS_FRAME; },
    });
    Object.defineProperty(api, "LESSON51_OBJECT_COMPLEMENT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON51_OBJECT_COMPLEMENT_FRAME; },
    });
    Object.defineProperty(api, "LESSON51_SUBJECT_COMPLEMENT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON51_SUBJECT_COMPLEMENT_FRAME; },
    });
    Object.defineProperty(api, "LESSON51_ADVERBIAL_COMPLEMENT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON51_ADVERBIAL_COMPLEMENT_FRAME; },
    });
    Object.defineProperty(api, "LESSON51_COMPLEMENT_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON51_COMPLEMENT_SUBSECTION_INVENTORY; },
    });
    api.cloneComplementClauseLessonRecord = cloneComplementClauseLessonRecord;
    api.getLesson51ComplementClauseSubsectionInventory = getLesson51ComplementClauseSubsectionInventory;
    api.buildLesson51ComplementClausePursuitFrame = buildLesson51ComplementClausePursuitFrame;
    api.buildComplementClauseBoundaryMetadata = buildComplementClauseBoundaryMetadata;
    api.getComplementClauseSurface = getComplementClauseSurface;
    api.splitComplementClauseSurfaceText = splitComplementClauseSurfaceText;
    api.getComplementClauseResultFrame = getComplementClauseResultFrame;
    api.getComplementClauseSurfaceForms = getComplementClauseSurfaceForms;
    api.buildComplementClauseNode = buildComplementClauseNode;
    api.getDefaultComplementClauseLink = getDefaultComplementClauseLink;
    api.buildComplementClauseSurfaceSequence = buildComplementClauseSurfaceSequence;
    api.buildComplementClauseRelationContract = buildComplementClauseRelationContract;
    api.buildComplementClauseAst = buildComplementClauseAst;
    api.classifyComplementClauseCandidate = classifyComplementClauseCandidate;
    api.classifyComplementClauseFalsePositive = classifyComplementClauseFalsePositive;
    return api;
}

export function installComplementClauseGlobals(targetObject = globalThis) {
    const api = createComplementClauseGlobals(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
