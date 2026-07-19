// Canonical modern ESM module.

export function createPurposiveApi(targetObject = globalThis) {
    const PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION = 1;
    const PURPOSIVE_DIRECTIONAL_RELATION = Object.freeze({
      directional: "directional",
      purpose: "purpose",
      purposiveDirectional: "purposive-directional",
      unknown: "unknown"
    });
    const PURPOSIVE_DIRECTION = Object.freeze({
      outbound: "outbound",
      inbound: "inbound",
      unknown: "unknown"
    });
    const PURPOSIVE_MOOD = Object.freeze({
      indicative: "indicative",
      optative: "optative",
      unknown: "unknown"
    });
    const PURPOSIVE_TENSE = Object.freeze({
      nonpast: "nonpast",
      past: "past",
      future: "future",
      nonfuture: "nonfuture",
      unknown: "unknown"
    });
    const PURPOSIVE_NUMBER = Object.freeze({
      singular: "singular",
      common: "common",
      plural: "plural",
      unknown: "unknown"
    });
    const PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE = Object.freeze({
      directionalPrefixOnly: "directional-prefix-only",
      parserBracketSyntax: "parser-bracket-syntax",
      composerDirectionalControl: "composer-directional-control",
      translationLabel: "translation-label",
      compoundMarker: "compound-marker",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const PURPOSIVE_DIRECTIONAL_ANTI_CONFLATION_RULES = Object.freeze(["directional prefix mechanics are not purposive VNC generation", "bracketed directional parser syntax is not purposive evidence", "composer directional controls are not confirmed purposive forms", "purpose translations are not Andrews source gates", "compound parsing is not purposive VNC generation", "Andrews purposive categories are architecture, not Classical surface authority"]);
    const PURPOSIVE_DIRECTIONAL_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "sourceStem",
      asks: "Which VNC stem is the source of the purposive or directional candidate?"
    }), Object.freeze({
      field: "directionalPrefix",
      asks: "Is a directional prefix such as wal or un present, and is it evidence-backed?"
    }), Object.freeze({
      field: "relation",
      asks: "Is the relation directional, purposive, both, or unknown?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "Which Andrews source gate or structured source supports purposive status?"
    })]);
    const LESSON29_PURPOSIVE_VALIDATION_REFS = Object.freeze(["src/tests/purposive.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON29_PURPOSIVE_PDF_REFS = Object.freeze(["Andrews Lesson 29.1", "Andrews Lesson 29.2", "Andrews Lesson 29.3", "Andrews Lesson 29.4", "Andrews Lesson 29.5", "Andrews Lesson 29.6", "Andrews Lesson 29.7"]);
    const LESSON29_PURPOSIVE_VERBSTEM_FRAME = Object.freeze({
      kind: "lesson-29-purposive-verbstem-frame",
      sourceSection: "Andrews 29.1",
      compoundType: "future-embed linked connectiveless compound",
      differsFromLesson2811IntegratedFutureEmbed: true,
      differsFromLesson28ConnectiveTCompounds: true,
      embed: Object.freeze({
        predicateTense: "future",
        futureMorph: "silent variant of z",
        classCImperfectiveStem: "final a deletes and remaining i/o lengthens",
        classDImperfectiveStem: "final a remains long",
        embedActionOccursAfterMatrixMovement: true
      }),
      matrix: Object.freeze({
        valence: "intransitive",
        directionalPrefixInsideMatrixStem: true,
        directionalMorphs: Object.freeze([Object.freeze({
          classical: "t",
          direction: "outbound/thither",
          nawatLetterHint: "t"
        }), Object.freeze({
          classical: "c/qu",
          direction: "inbound/hither",
          nawatLetterHint: "k"
        })]),
        directionalMorphsAreNotConnectiveT: true,
        silentFutureMorphAlwaysPrecedesDirectionalPrefix: true,
        baseStemMeaning: "move purposefully",
        imperfectiveBaseStem: "i",
        imperfectiveCompoundVariants: Object.freeze(["i-uh", "i-hui"]),
        perfectiveBaseStem: "o",
        perfectiveBaseStemNotOno: true
      })
    });
    const LESSON29_PURPOSIVE_VNC_PARADIGM_FRAME = Object.freeze({
      kind: "lesson-29-purposive-vnc-paradigm-frame",
      sourceSection: "Andrews 29.2",
      movementSets: Object.freeze(["outbound", "inbound"]),
      moods: Object.freeze(["indicative", "optative"]),
      indicativeTenseSystems: Object.freeze([Object.freeze({
        direction: "outbound",
        contrast: "past/nonpast"
      }), Object.freeze({
        direction: "inbound",
        contrast: "future/nonfuture"
      })]),
      optativeTenseSystem: "nonpast only",
      tenseMorphForAllTenses: "0",
      numberDyads: Object.freeze([Object.freeze({
        number: "singular/common",
        dyad: "0-0"
      }), Object.freeze({
        number: "plural",
        dyad: "0-h"
      })]),
      stemShapeDistinguishesMoodAndTense: true
    });
    const LESSON29_OUTBOUND_PURPOSIVE_FRAME = Object.freeze({
      kind: "lesson-29-outbound-purposive-frame",
      sourceSection: "Andrews 29.3",
      matrixDirection: "outbound",
      matrixDirectionalMorph: "t",
      paradigms: Object.freeze([Object.freeze({
        id: "outbound-nonpast-indicative",
        stemShape: "-t-i-uh / -t-i-hui",
        tenseMeaning: "present or future",
        tenseMorph: "0"
      }), Object.freeze({
        id: "outbound-past-indicative",
        stemShape: "-t-o",
        tenseMeaning: "preterit, imperfect, or distant-past",
        tenseMorph: "0",
        antecessiveOParticleOptional: true
      }), Object.freeze({
        id: "outbound-nonpast-optative",
        stemShape: "-t-i",
        tenseMeaning: "nonpast optative",
        tenseMorph: "0",
        irregularPluralNVariant: true
      })]),
      contrastWithProgressiveYaUh: Object.freeze({
        purposiveEmbedTense: "future",
        progressiveEmbedTense: "preterit",
        purposiveTIsDirectionalInsideMatrix: true,
        progressiveTiIsConnectiveOutsideMatrix: true,
        classASpellingCanBeAmbiguousInTraditionalTexts: true,
        classCDistinctionNeedsVowelLengthOrGlottalEvidence: true,
        classBDistinctByStemShape: true
      }),
      contrastWithAdmonitive: Object.freeze({
        purposivePluralEndings: Object.freeze(["-t-i + 0-h", "-t-i + 0-n"]),
        admonitivePluralDyads: Object.freeze(["t-ih", "t-in"]),
        secondPersonPurposiveOptativeUsesXi: true
      }),
      aberrantEarlySpanishGrammarianSingularFormIsNotRegularParadigm: true
    });
    const LESSON29_INBOUND_PURPOSIVE_FRAME = Object.freeze({
      kind: "lesson-29-inbound-purposive-frame",
      sourceSection: "Andrews 29.4",
      matrixDirection: "inbound",
      matrixDirectionalMorph: "c/qu",
      nawatLetterHint: "k",
      paradigms: Object.freeze([Object.freeze({
        id: "inbound-nonfuture-indicative",
        stemShape: "-c-o",
        tenseMeaning: "present, preterit, imperfect, or distant-past",
        tenseMorph: "0",
        antecessiveOParticleOptionalEvenForPresentMeaning: true
      }), Object.freeze({
        id: "inbound-future-indicative",
        stemShape: "-qu-i-uh / -qu-i-hui",
        tenseMeaning: "future",
        tenseMorph: "0"
      }), Object.freeze({
        id: "inbound-nonpast-optative",
        stemShape: "-qu-i",
        tenseMeaning: "nonpast optative",
        tenseMorph: "0"
      })])
    });
    const LESSON29_NONACTIVE_EMBED_FRAME = Object.freeze({
      kind: "lesson-29-nonactive-embed-frame",
      sourceSection: "Andrews 29.5",
      futurePredicateOnNonactiveStemMayOccupyEmbed: true,
      voices: Object.freeze(["passive", "impersonal"]),
      compareLesson2811FutureEmbed: true,
      generationAllowed: false
    });
    const LESSON29_COMPOUND_EMBED_FRAME = Object.freeze({
      kind: "lesson-29-compound-stemmed-embed-frame",
      sourceSection: "Andrews 29.6",
      compoundStemmedPredicateMayOccupyEmbed: true,
      dependsOnLesson28CompoundFrame: true,
      generationAllowed: false
    });
    const LESSON29_EXTERNAL_DIRECTIONAL_FRAME = Object.freeze({
      kind: "lesson-29-external-directional-frame",
      sourceSection: "Andrews 29.7",
      printedSectionLabelInPdf: "29.1",
      externalDirectionalsCanStandWherePurposiveWouldBeFormal: true,
      externalDirectionals: Object.freeze([Object.freeze({
        classical: "hual",
        currentNawatHint: "wal",
        direction: "toward speaker"
      }), Object.freeze({
        classical: "on",
        currentNawatHint: "un",
        direction: "away/there"
      })]),
      externalDirectionalCanOccurOnPurposiveVnc: true,
      externalAndInternalDirectionCanDisagree: true,
      reasonDirectionCanDisagree: "embed action and matrix movement are separate actions",
      purposiveMeaningCanShiftToFulfilledPurposeOrResult: true,
      movementCanBeMetaphorical: true,
      intentionCanBeMuted: true
    });
    const LESSON29_PURPOSIVE_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson29-purposive-verbstems",
      andrewsSection: "29.1",
      category: "purposive-verbstem",
      directiveEs: "El purposivo es un compuesto futuro-incrustado, ligado y sin conectivo; no es el futuro integrado de 28.11 ni el conectivo t de 28.5.",
      engineSurface: "purposive boundary metadata",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson29-purposive-vncs",
      andrewsSection: "29.2",
      category: "purposive-vnc-paradigm",
      directiveEs: "Hay series entrante y saliente; el indicativo tiene dos contrastes de tiempo y el optativo solo no pasado.",
      engineSurface: "purposive paradigm metadata",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson29-outbound",
      andrewsSection: "29.3",
      category: "outbound-purposive",
      directiveEs: "La matriz saliente usa t direccional dentro del tronco; debe distinguirse del progresivo con ya-uh y del admonitivo.",
      engineSurface: "outbound diagnostic frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson29-inbound",
      andrewsSection: "29.4",
      category: "inbound-purposive",
      directiveEs: "La matriz entrante usa c/qu, adaptado como k por el puente ortografico Nawat/Pipil.",
      engineSurface: "inbound diagnostic frame",
      implementationState: "partial",
      redirectAction: "block-generation"
    }), Object.freeze({
      id: "lesson29-passive-impersonal",
      andrewsSection: "29.5",
      category: "nonactive-embed",
      directiveEs: "El incrustado futuro puede construirse sobre tronco no activo en voz pasiva o impersonal.",
      engineSurface: "nonactive embed diagnostic frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson29-compound-embed",
      andrewsSection: "29.6",
      category: "compound-stemmed-embed",
      directiveEs: "El incrustado del purposivo puede ser un predicado de tronco compuesto.",
      engineSurface: "compound-embed diagnostic frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson29-external-directionals",
      andrewsSection: "29.7",
      category: "external-directional-purposive-notion",
      directiveEs: "Hual/on externos pueden expresar nocion purposiva informal, combinarse con purposivos, o discrepar de la direccion interna.",
      engineSurface: "directional false-positive and boundary metadata",
      implementationState: "partial",
      redirectAction: "source-gated"
    })]);
    function clonePurposiveLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => clonePurposiveLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, clonePurposiveLessonRecord(value)]));
    }
    function getLesson29PurposiveSubsectionInventory() {
      return LESSON29_PURPOSIVE_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: entry.andrewsSection === "29.7" ? "Andrews Lesson 29.7 (printed as 29.1 in the PDF)" : `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-required",
        validationRefs: Array.from(LESSON29_PURPOSIVE_VALIDATION_REFS)
      }));
    }
    function attachPurposiveDirectionalGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "purposive-vnc-boundary",
        routeFamily: "purposive-directional",
        structuralSource: "Andrews Lesson 29",
        andrewsRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
        generationAllowed: false,
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: "orthography-bridge-required"
        },
        ...options
      });
    }
    function normalizePurposiveDirectionalEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizePurposiveDirectionalRelation(value = "") {
      return normalizePurposiveDirectionalEnum(value, Object.values(PURPOSIVE_DIRECTIONAL_RELATION), PURPOSIVE_DIRECTIONAL_RELATION.unknown);
    }
    function normalizePurposiveDirection(value = "") {
      return normalizePurposiveDirectionalEnum(value, Object.values(PURPOSIVE_DIRECTION), PURPOSIVE_DIRECTION.unknown);
    }
    function normalizePurposiveMood(value = "") {
      return normalizePurposiveDirectionalEnum(value, Object.values(PURPOSIVE_MOOD), PURPOSIVE_MOOD.unknown);
    }
    function normalizePurposiveTense(value = "") {
      const normalized = normalizePurposiveDirectionalEnum(value, Object.values(PURPOSIVE_TENSE), PURPOSIVE_TENSE.unknown);
      return normalized;
    }
    function normalizePurposiveNumber(value = "") {
      const normalized = normalizePurposiveDirectionalEnum(value, Object.values(PURPOSIVE_NUMBER), PURPOSIVE_NUMBER.unknown);
      return normalized === PURPOSIVE_NUMBER.common ? PURPOSIVE_NUMBER.singular : normalized;
    }
    function normalizePurposiveDirectionalFalsePositiveSource(value = "") {
      return normalizePurposiveDirectionalEnum(value, Object.values(PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE), PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getPurposiveDirectionalAntiConflationRules() {
      return Array.from(PURPOSIVE_DIRECTIONAL_ANTI_CONFLATION_RULES);
    }
    function getPurposiveDirectionalStructuralQuestions() {
      return PURPOSIVE_DIRECTIONAL_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function getKnownDirectionalPrefixesForPurposiveBoundary() {
      if (typeof targetObject.DIRECTIONAL_PREFIXES !== "undefined" && Array.isArray(targetObject.DIRECTIONAL_PREFIXES)) {
        return Array.from(new Set(targetObject.DIRECTIONAL_PREFIXES.filter(Boolean)));
      }
      return ["wal", "un"];
    }
    function buildPurposiveDirectionalBoundaryMetadata() {
      const subsectionInventory = getLesson29PurposiveSubsectionInventory();
      const boundary = {
        kind: "purposive-directional-boundary",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        lesson: 29,
        status: "partial",
        structuralSource: "Andrews Lesson 29",
        pdfRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
        subsectionInventory,
        targetAuthority: "Andrews slot logic plus Nawat/Pipil orthography bridge",
        generationAllowed: false,
        confirmedExamples: [],
        knownDirectionalPrefixes: getKnownDirectionalPrefixesForPurposiveBoundary(),
        internalMatrixDirectionalMorphs: [{
          classical: "t",
          direction: "outbound",
          nawatLetterHint: "t"
        }, {
          classical: "c/qu",
          direction: "inbound",
          nawatLetterHint: "k"
        }],
        externalDirectionalHints: [{
          classical: "hual",
          currentNawatHint: "wal"
        }, {
          classical: "on",
          currentNawatHint: "un"
        }],
        structuralQuestions: getPurposiveDirectionalStructuralQuestions(),
        boundaries: {
          hasDirectionalPrefixMechanics: true,
          hasPurposiveGeneration: true,
          hasConfirmedPurposiveFixtureData: false,
          hasLesson29PursuitFrame: true,
          changesDirectionalGeneration: false,
          changesVncGeneration: false,
          treatsDirectionalPrefixAsPurposiveEvidence: false,
          treatsInternalDirectionalAsConnectiveT: false
        },
        antiConflationRules: getPurposiveDirectionalAntiConflationRules()
      };
      return attachPurposiveDirectionalGrammarContract(boundary, {
        metadataKind: "purposive-directional-boundary",
        routeStage: "classify-boundary",
        supported: false,
        andrewsRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
        morphBoundaryFrame: boundary,
        targetContract: {
          metadataKind: "purposive-directional-boundary",
          generationAllowed: false,
          hasPurposiveGeneration: false
        }
      });
    }
    function buildLesson29PurposivePursuitFrame() {
      const subsectionInventory = getLesson29PurposiveSubsectionInventory();
      const purposiveVerbstemFrame = clonePurposiveLessonRecord(LESSON29_PURPOSIVE_VERBSTEM_FRAME);
      const vncParadigmFrame = clonePurposiveLessonRecord(LESSON29_PURPOSIVE_VNC_PARADIGM_FRAME);
      const outboundFrame = clonePurposiveLessonRecord(LESSON29_OUTBOUND_PURPOSIVE_FRAME);
      const inboundFrame = clonePurposiveLessonRecord(LESSON29_INBOUND_PURPOSIVE_FRAME);
      const nonactiveEmbedFrame = clonePurposiveLessonRecord(LESSON29_NONACTIVE_EMBED_FRAME);
      const compoundEmbedFrame = clonePurposiveLessonRecord(LESSON29_COMPOUND_EMBED_FRAME);
      const externalDirectionalFrame = clonePurposiveLessonRecord(LESSON29_EXTERNAL_DIRECTIONAL_FRAME);
      const remainingGaps = ["The Andrews outbound and inbound matrix shapes now generate structural purposive target stems without Nawat/Pipil fixture evidence.", "Finite VNC integration still needs full subject/object UI wiring, optional o#, vowel-length/glottal display, and optative/admonitive contrast controls.", "Passive/impersonal purposive embeds, compound-stemmed embeds, external wal/un directional alternatives, fulfilled-purpose readings, and metaphorical movement remain source-gated."];
      const frame = {
        kind: "lesson-29-purposive-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 29,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
        plannedArrows: [{
          id: "lesson-29-purposive-vnc-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 29.1-29.7 against current purposive/directional boundary metadata, stem-internal directional morphs, outbound/inbound paradigms, passive/impersonal embeds, compound-stemmed embeds, and external wal/un directional alternatives.",
          andrewsRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON29_PURPOSIVE_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-29-purposive-vnc-audit",
          result: "hit",
          correction: "Lesson 29 now records Andrews purposive verbstem architecture, generates outbound and inbound target stems from Andrews matrix shapes, and keeps nonactive embeds, compound-stemmed embeds, external directionals, progressive connective-t compounds, and admonitive endings separated.",
          andrewsRefs: Array.from(LESSON29_PURPOSIVE_PDF_REFS),
          feedbackRefs: Array.from(LESSON29_PURPOSIVE_VALIDATION_REFS)
        }],
        subsectionInventory,
        purposiveVerbstemFrame,
        vncParadigmFrame,
        outboundFrame,
        inboundFrame,
        nonactiveEmbedFrame,
        compoundEmbedFrame,
        externalDirectionalFrame,
        currentEngineBoundary: {
          directionalPrefixMechanicsImplemented: true,
          boundaryMetadataImplemented: true,
          candidateClassifierImplemented: true,
          falsePositiveClassifierImplemented: true,
          purposiveGenerationImplemented: true,
          confirmedPurposiveFixtureData: false,
          outboundParadigmGenerationImplemented: true,
          inboundParadigmGenerationImplemented: true,
          nonactiveEmbedGenerationImplemented: false,
          compoundStemmedEmbedGenerationImplemented: false,
          externalDirectionalPurposiveGenerationImplemented: false,
          finiteOutputExpansionAllowed: false
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachPurposiveDirectionalGrammarContract(frame, {
        metadataKind: "lesson-29-purposive-pursuit-frame",
        routeStage: "audit-lesson-29",
        supported: true,
        sourceInput: "Andrews Lesson 29.1-29.7",
        morphBoundaryFrame: {
          purposiveVerbstemFrame,
          outboundFrame,
          inboundFrame,
          nonactiveEmbedFrame,
          compoundEmbedFrame,
          externalDirectionalFrame
        },
        stemFrame: {
          stemKind: "purposive-compound-verbstem",
          compoundType: purposiveVerbstemFrame.compoundType,
          embedPredicateTense: purposiveVerbstemFrame.embed.predicateTense,
          silentFutureMorph: true,
          matrixDirectionalPrefixInsideStem: true,
          internalDirectionalMorphs: purposiveVerbstemFrame.matrix.directionalMorphs,
          baseStemMeaning: purposiveVerbstemFrame.matrix.baseStemMeaning
        },
        nuclearClauseFrame: {
          unitKind: "VNC",
          compoundKind: "purposive VNC",
          sourceFormula: "VNC + VNC = compound VNC",
          linkedConnectiveless: true
        },
        inflectionFrame: {
          outboundIndicativeContrasts: "past/nonpast",
          inboundIndicativeContrasts: "future/nonfuture",
          optativeTenseSystem: "nonpast only",
          tenseMorphForAllTenses: "0"
        },
        targetContract: {
          metadataKind: "lesson-29-purposive-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["purposive-vnc-source-gated", "purposive-vnc-orthography-bridge-required"]
      });
    }
    function normalizePurposiveDirectionalCandidateSurface(value = "") {
      const source = String(value || "").replace(/\[[^\]]+\]\s*\/\s*/g, "").replace(/\[sq0\]/gi, "").replace(/[Ø0□]/g, "").replace(/[#()[\]{}+_\s]/g, "").replace(/-/g, "").trim();
      if (!source || /[A-Z_]/.test(source)) {
        return "";
      }
      const conversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(source, {
        source: "Andrews purposive candidate formula"
      }) : null;
      return conversion?.output || source;
    }
    function realizePurposiveDirectionalSegment(segment = "") {
      const raw = String(segment || "").trim();
      if (!raw || raw === "□" || raw === "0" || raw === "Ø") {
        return "";
      }
      const conversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(raw, {
        source: "Andrews purposive directional segment"
      }) : null;
      return String(conversion?.output || raw || "").trim();
    }
    function realizePurposiveDirectionalTargetStemFromSegments(segments = []) {
      return (Array.isArray(segments) ? segments : []).map(segment => realizePurposiveDirectionalSegment(segment)).filter(Boolean).join("");
    }
    function buildPurposiveDirectionalSourceFrame({
      embedStem = "",
      sourceUnit = "VNC",
      sourceRole = "future-embedded-predicate",
      formulaSlots = null
    } = {}) {
      const normalizedEmbedStem = String(embedStem || "").trim();
      if (!normalizedEmbedStem) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-purposive-directional-source-frame",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        sourceUnit,
        sourceRole,
        embedStem: normalizedEmbedStem,
        formulaSlots: formulaSlots && typeof formulaSlots === "object" ? Object.freeze({
          ...formulaSlots
        }) : null,
        renderedSurfaceIsNotAuthority: true
      });
    }
    function getPurposiveMatrixShape({
      direction = "",
      mood = "",
      tense = "",
      number = ""
    } = {}) {
      const normalizedDirection = normalizePurposiveDirection(direction);
      const normalizedMood = normalizePurposiveMood(mood || PURPOSIVE_MOOD.indicative);
      const normalizedNumber = normalizePurposiveNumber(number || PURPOSIVE_NUMBER.singular);
      const normalizedTense = normalizePurposiveTense(tense || (normalizedMood === PURPOSIVE_MOOD.optative ? PURPOSIVE_TENSE.nonpast : normalizedDirection === PURPOSIVE_DIRECTION.inbound ? PURPOSIVE_TENSE.nonfuture : PURPOSIVE_TENSE.nonpast));
      const plural = normalizedNumber === PURPOSIVE_NUMBER.plural;
      if (normalizedDirection === PURPOSIVE_DIRECTION.outbound && normalizedMood === PURPOSIVE_MOOD.indicative && normalizedTense === PURPOSIVE_TENSE.nonpast) {
        return {
          ok: true,
          direction: normalizedDirection,
          mood: normalizedMood,
          tense: normalizedTense,
          number: normalizedNumber,
          matrixShape: plural ? "t-i-hui" : "t-i-uh",
          matrixDirectionalMorph: "t",
          matrixBaseStem: plural ? "i-hui" : "i-uh",
          tenseMeaning: "present-or-future",
          andrewsSection: "29.3"
        };
      }
      if (normalizedDirection === PURPOSIVE_DIRECTION.outbound && normalizedMood === PURPOSIVE_MOOD.indicative && normalizedTense === PURPOSIVE_TENSE.past) {
        return {
          ok: true,
          direction: normalizedDirection,
          mood: normalizedMood,
          tense: normalizedTense,
          number: normalizedNumber,
          matrixShape: "t-o",
          matrixDirectionalMorph: "t",
          matrixBaseStem: "o",
          tenseMeaning: "preterit-imperfect-distant-past",
          andrewsSection: "29.3",
          antecessiveOParticleOptional: true
        };
      }
      if (normalizedDirection === PURPOSIVE_DIRECTION.outbound && normalizedMood === PURPOSIVE_MOOD.optative && normalizedTense === PURPOSIVE_TENSE.nonpast) {
        return {
          ok: true,
          direction: normalizedDirection,
          mood: normalizedMood,
          tense: normalizedTense,
          number: normalizedNumber,
          matrixShape: "t-i",
          matrixDirectionalMorph: "t",
          matrixBaseStem: "i",
          tenseMeaning: "nonpast-optative",
          andrewsSection: "29.3",
          irregularPluralNAllowed: plural
        };
      }
      if (normalizedDirection === PURPOSIVE_DIRECTION.inbound && normalizedMood === PURPOSIVE_MOOD.indicative && normalizedTense === PURPOSIVE_TENSE.nonfuture) {
        return {
          ok: true,
          direction: normalizedDirection,
          mood: normalizedMood,
          tense: normalizedTense,
          number: normalizedNumber,
          matrixShape: "c-o",
          matrixDirectionalMorph: "c",
          matrixBaseStem: "o",
          tenseMeaning: "present-preterit-imperfect-distant-past",
          andrewsSection: "29.4",
          antecessiveOParticleOptional: true
        };
      }
      if (normalizedDirection === PURPOSIVE_DIRECTION.inbound && normalizedMood === PURPOSIVE_MOOD.indicative && normalizedTense === PURPOSIVE_TENSE.future) {
        return {
          ok: true,
          direction: normalizedDirection,
          mood: normalizedMood,
          tense: normalizedTense,
          number: normalizedNumber,
          matrixShape: plural ? "qu-i-hui" : "qu-i-uh",
          matrixDirectionalMorph: "qu",
          matrixBaseStem: plural ? "i-hui" : "i-uh",
          tenseMeaning: "future",
          andrewsSection: "29.4"
        };
      }
      if (normalizedDirection === PURPOSIVE_DIRECTION.inbound && normalizedMood === PURPOSIVE_MOOD.optative && normalizedTense === PURPOSIVE_TENSE.nonpast) {
        return {
          ok: true,
          direction: normalizedDirection,
          mood: normalizedMood,
          tense: normalizedTense,
          number: normalizedNumber,
          matrixShape: "qu-i",
          matrixDirectionalMorph: "qu",
          matrixBaseStem: "i",
          tenseMeaning: "nonpast-optative",
          andrewsSection: "29.4"
        };
      }
      return {
        ok: false,
        direction: normalizedDirection,
        mood: normalizedMood,
        tense: normalizedTense,
        number: normalizedNumber,
        diagnostics: ["purposive-directional-paradigm-not-andrews-licensed"]
      };
    }
    function isPurposiveDirectionalSourceFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-purposive-directional-source-frame" && String(frame.embedStem || "").trim());
    }
    function isPurposiveDirectionalOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-purposive-directional-operation-frame" && isPurposiveDirectionalSourceFrame(frame.sourceFrame) && frame.matrixFrame && typeof frame.matrixFrame === "object" && frame.targetFrame && typeof frame.targetFrame === "object");
    }
    function buildPurposiveDirectionalOperationFrame({
      sourceFrame = null,
      direction = "",
      mood = "",
      tense = "",
      number = "",
      objectPrefix = "",
      personPrefix = "0-0",
      pluralNumberMorph = ""
    } = {}) {
      if (!isPurposiveDirectionalSourceFrame(sourceFrame)) {
        return null;
      }
      const matrix = getPurposiveMatrixShape({
        direction,
        mood,
        tense,
        number
      });
      if (matrix.ok !== true) {
        return null;
      }
      const normalizedNumber = matrix.number || normalizePurposiveNumber(number || PURPOSIVE_NUMBER.singular);
      const requestedPluralN = String(pluralNumberMorph || "").trim().toLowerCase() === "n";
      const num1 = "0";
      const num2 = normalizedNumber === PURPOSIVE_NUMBER.plural ? requestedPluralN && matrix.irregularPluralNAllowed ? "n" : "h" : "0";
      const objectSlot = String(objectPrefix || "").trim();
      const normalizedPersonPrefix = String(personPrefix || "0-0").trim() || "0-0";
      const targetSegments = Object.freeze([sourceFrame.embedStem, "□", matrix.matrixDirectionalMorph, ...String(matrix.matrixBaseStem || "").split("-").filter(Boolean)]);
      const targetStemClassical = targetSegments.join("-");
      return Object.freeze({
        kind: "andrews-purposive-directional-operation-frame",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        operationId: "lesson-29-purposive-directional",
        operationFamily: "purposive-directional-vnc",
        sourceFrame,
        matrixFrame: Object.freeze({
          kind: "andrews-purposive-directional-matrix-frame",
          direction: matrix.direction,
          mood: matrix.mood,
          tense: matrix.tense,
          number: normalizedNumber,
          matrixDirectionalMorph: matrix.matrixDirectionalMorph,
          matrixBaseStem: matrix.matrixBaseStem,
          matrixShape: matrix.matrixShape,
          andrewsSection: matrix.andrewsSection,
          tenseMeaning: matrix.tenseMeaning
        }),
        inflectionFrame: Object.freeze({
          personPrefix: normalizedPersonPrefix,
          objectPrefix: objectSlot,
          tense: "0",
          num1,
          num2,
          pluralNumberMorph: num2
        }),
        targetFrame: Object.freeze({
          kind: "andrews-purposive-directional-target-frame",
          targetUnit: "CNV",
          targetSegments,
          targetStemClassical
        }),
        renderedSurfaceIsNotAuthority: true
      });
    }
    function buildAndrewsPurposiveDirectionalVnc({
      sourceStem = "",
      embedStem = "",
      objectPrefix = "",
      personPrefix = "0-0",
      direction = "",
      mood = "",
      tense = "",
      number = "",
      pluralNumberMorph = "",
      operationFrame = null
    } = {}) {
      void embedStem;
      void objectPrefix;
      void personPrefix;
      void direction;
      void mood;
      void tense;
      void number;
      void pluralNumberMorph;
      if (!isPurposiveDirectionalOperationFrame(operationFrame)) {
        const blocked = {
          kind: "purposive-directional-andrews-generation",
          version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
          sourceStem: String(sourceStem || ""),
          embedStem: "",
          generationAllowed: false,
          diagnostics: ["purposive-directional-missing-typed-operation-frame"]
        };
        return attachPurposiveDirectionalGrammarContract(blocked, {
          metadataKind: "purposive-directional-andrews-generation",
          routeStage: "block-unsupported-purposive-paradigm",
          sourceInput: blocked.sourceStem,
          supported: false,
          diagnostics: blocked.diagnostics
        });
      }
      const sourceFrame = operationFrame.sourceFrame;
      const matrix = operationFrame.matrixFrame;
      const inflection = operationFrame.inflectionFrame || {};
      const targetFrame = operationFrame.targetFrame || {};
      const expectedTargetStemClassical = [sourceFrame.embedStem, "□", matrix.matrixDirectionalMorph, ...String(matrix.matrixBaseStem || "").split("-").filter(Boolean)].join("-");
      const targetStemClassical = String(targetFrame.targetStemClassical || "").trim();
      if (!targetStemClassical || targetStemClassical !== expectedTargetStemClassical) {
        const blocked = {
          kind: "purposive-directional-andrews-generation",
          version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
          sourceStem: String(sourceFrame.embedStem || ""),
          embedStem: String(sourceFrame.embedStem || ""),
          generationAllowed: false,
          diagnostics: ["purposive-directional-contradictory-typed-operation-frame"]
        };
        return attachPurposiveDirectionalGrammarContract(blocked, {
          metadataKind: "purposive-directional-andrews-generation",
          routeStage: "block-contradictory-purposive-frame",
          sourceInput: blocked.sourceStem,
          supported: false,
          diagnostics: blocked.diagnostics
        });
      }
      const objectSlot = String(inflection.objectPrefix || "").trim();
      const objectFormula = objectSlot ? `+${objectSlot}` : "";
      const num1 = String(inflection.num1 || "0").trim() || "0";
      const num2 = String(inflection.num2 || "0").trim() || "0";
      const person = String(inflection.personPrefix || "0-0").trim() || "0-0";
      const structuralFormula = `#${person}${objectFormula}(${targetStemClassical})0+${num1}-${num2}#`;
      const surface = realizePurposiveDirectionalTargetStemFromSegments(targetFrame.targetSegments);
      const classification = {
        kind: "purposive-directional-andrews-generation",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        sourceStem: String(sourceFrame.embedStem || ""),
        embedStem: String(sourceFrame.embedStem || ""),
        objectPrefix: objectSlot,
        personPrefix: person,
        direction: matrix.direction,
        mood: matrix.mood,
        tense: matrix.tense,
        number: matrix.number,
        pluralNumberMorph: num2,
        targetStemClassical,
        targetStem: surface,
        structuralFormula,
        surface,
        surfaceForms: surface ? [surface] : [],
        generationAllowed: Boolean(surface),
        formulaSlots: {
          pers: person,
          objectPrefix: objectSlot,
          embedStem: sourceFrame.embedStem,
          silentFutureTenseMorph: "□",
          matrixDirectionalMorph: matrix.matrixDirectionalMorph,
          matrixBaseStem: matrix.matrixBaseStem,
          matrixShape: matrix.matrixShape,
          tense: "0",
          num1,
          num2
        },
        andrewsSection: matrix.andrewsSection,
        tenseMeaning: matrix.tenseMeaning,
        diagnostics: ["purposive-directional-andrews-paradigm-generated", "purposive-directional-silent-future-morph", "orthography-bridge-realized"],
        operationFrame
      };
      return attachPurposiveDirectionalGrammarContract(classification, {
        metadataKind: "purposive-directional-andrews-generation",
        routeStage: "generate-andrews-purposive-paradigm",
        sourceInput: classification.sourceStem || classification.embedStem,
        supported: classification.generationAllowed,
        generationAllowed: classification.generationAllowed,
        surface,
        surfaceForms: classification.surfaceForms,
        diagnostics: classification.diagnostics,
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: "orthography-bridge-realized",
          sourceSurface: targetStemClassical,
          surface,
          surfaceForms: classification.surfaceForms
        },
        stemFrame: {
          stemKind: "purposive-compound-verbstem",
          sourceStem: classification.sourceStem,
          targetStem: targetStemClassical,
          realizedTargetStem: surface,
          silentFutureMorph: true,
          matrixDirectionalMorph: matrix.matrixDirectionalMorph,
          matrixBaseStem: matrix.matrixBaseStem
        },
        inflectionFrame: {
          mood: matrix.mood,
          tense: matrix.tense,
          tenseMorph: "0",
          tenseMeaning: matrix.tenseMeaning,
          numberDyad: `${num1}-${num2}`
        },
        targetContract: {
          metadataKind: "purposive-directional-andrews-generation",
          generationAllowed: classification.generationAllowed,
          andrewsSection: matrix.andrewsSection,
          finiteSurfaceExpansionAllowed: false,
          operationFrame
        }
      });
    }
    function classifyPurposiveDirectionalCandidate({
      sourceStem = "",
      sourceFrame = null,
      candidate = "",
      directionalPrefix = "",
      relation = "",
      evidenceSource = "",
      falsePositiveSource = "",
      direction = "",
      mood = "",
      tense = "",
      number = "",
      objectPrefix = "",
      personPrefix = "0-0",
      pluralNumberMorph = ""
    } = {}) {
      const normalizedRelation = normalizePurposiveDirectionalRelation(relation);
      const normalizedFalsePositive = normalizePurposiveDirectionalFalsePositiveSource(falsePositiveSource);
      const knownPrefixes = getKnownDirectionalPrefixesForPurposiveBoundary();
      const normalizedDirectionalPrefix = String(directionalPrefix || "").trim().toLowerCase();
      const hasKnownDirectionalPrefix = knownPrefixes.includes(normalizedDirectionalPrefix);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const relationGenerates = normalizedRelation === PURPOSIVE_DIRECTIONAL_RELATION.purpose || normalizedRelation === PURPOSIVE_DIRECTIONAL_RELATION.purposiveDirectional;
      const andrewsGeneration = !String(candidate || "").trim() && relationGenerates ? (() => {
        const operationFrame = buildPurposiveDirectionalOperationFrame({
          sourceFrame,
          direction,
          mood,
          tense,
          number,
          objectPrefix,
          personPrefix,
          pluralNumberMorph
        });
        return buildAndrewsPurposiveDirectionalVnc({
          sourceStem,
          operationFrame
        });
      })() : null;
      const generatedCandidate = andrewsGeneration?.generationAllowed === true ? andrewsGeneration.targetStemClassical : "";
      const sourceSurface = andrewsGeneration?.generationAllowed === true ? andrewsGeneration.surface : "";
      const generated = relationGenerates && andrewsGeneration?.generationAllowed === true && normalizedFalsePositive === PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE.unknown;
      const classification = {
        kind: "purposive-directional-candidate-classification",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        sourceStem: String(sourceFrame?.embedStem || sourceStem || ""),
        candidate: String(candidate || generatedCandidate || ""),
        directionalPrefix: normalizedDirectionalPrefix,
        hasKnownDirectionalPrefix,
        relation: normalizedRelation,
        evidenceSource: String(evidenceSource || ""),
        falsePositiveSource: normalizedFalsePositive,
        confirmed: false,
        generationAllowed: generated,
        ...(generated ? {
          surface: sourceSurface,
          surfaceForms: [sourceSurface]
        } : {}),
        ...(andrewsGeneration?.generationAllowed === true ? {
          andrewsGeneration,
          structuralFormula: andrewsGeneration.structuralFormula,
          formulaSlots: andrewsGeneration.formulaSlots
        } : {}),
        diagnostics: [andrewsGeneration?.generationAllowed === true ? "purposive-directional-andrews-paradigm-generated" : String(candidate || "").trim() && relationGenerates ? "purposive-directional-candidate-diagnostic-only" : hasEvidence ? "purposive-directional-source-provided" : "purposive-directional-source-gate-required", hasKnownDirectionalPrefix ? "directional-prefix-recognized" : "directional-prefix-unconfirmed", normalizedFalsePositive !== PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE.unknown ? "purposive-directional-false-positive-source" : generated ? "purposive-directional-structured-source" : "purposive-directional-unconfirmed"],
        boundary: buildPurposiveDirectionalBoundaryMetadata()
      };
      return attachPurposiveDirectionalGrammarContract(classification, {
        metadataKind: "purposive-directional-candidate-classification",
        routeStage: generated ? "generate-structured-purposive" : "classify-candidate",
        sourceInput: classification.sourceStem || classification.candidate,
        supported: generated,
        generationAllowed: generated,
        diagnostics: classification.diagnostics,
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: generated ? "orthography-bridge-realized" : "source-gated",
          sourceSurface: andrewsGeneration?.targetStemClassical || classification.candidate,
          surface: sourceSurface,
          surfaceForms: generated ? [sourceSurface] : []
        },
        stemFrame: {
          stemKind: "purposive-directional-candidate",
          sourceStem: classification.sourceStem,
          targetStem: classification.candidate,
          realizedTargetStem: sourceSurface,
          directionalPrefix: normalizedDirectionalPrefix,
          relation: normalizedRelation
        },
        inflectionFrame: andrewsGeneration?.frames?.inflectionFrame || undefined,
        targetContract: {
          metadataKind: "purposive-directional-candidate-classification",
          generationAllowed: generated,
          relation: normalizedRelation,
          hasKnownDirectionalPrefix,
          andrewsParadigmGenerated: andrewsGeneration?.generationAllowed === true
        }
      });
    }
    function classifyPurposiveDirectionalFalsePositive(source = "") {
      const normalizedSource = normalizePurposiveDirectionalFalsePositiveSource(source);
      const classification = {
        kind: "purposive-directional-false-positive",
        version: PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION,
        source: normalizedSource,
        isPurposiveEvidence: false,
        generationAllowed: false,
        diagnostics: ["purposive-directional-false-positive-source"],
        antiConflationRules: getPurposiveDirectionalAntiConflationRules()
      };
      return attachPurposiveDirectionalGrammarContract(classification, {
        metadataKind: "purposive-directional-false-positive",
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false,
        diagnostics: classification.diagnostics
      });
    }

    const api = {};
    Object.defineProperty(api, "PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return PURPOSIVE_DIRECTIONAL_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "PURPOSIVE_DIRECTIONAL_RELATION", {
        configurable: true,
        enumerable: true,
        get() { return PURPOSIVE_DIRECTIONAL_RELATION; },
    });
    Object.defineProperty(api, "PURPOSIVE_DIRECTION", {
        configurable: true,
        enumerable: true,
        get() { return PURPOSIVE_DIRECTION; },
    });
    Object.defineProperty(api, "PURPOSIVE_MOOD", {
        configurable: true,
        enumerable: true,
        get() { return PURPOSIVE_MOOD; },
    });
    Object.defineProperty(api, "PURPOSIVE_TENSE", {
        configurable: true,
        enumerable: true,
        get() { return PURPOSIVE_TENSE; },
    });
    Object.defineProperty(api, "PURPOSIVE_NUMBER", {
        configurable: true,
        enumerable: true,
        get() { return PURPOSIVE_NUMBER; },
    });
    Object.defineProperty(api, "PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return PURPOSIVE_DIRECTIONAL_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "PURPOSIVE_DIRECTIONAL_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return PURPOSIVE_DIRECTIONAL_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "PURPOSIVE_DIRECTIONAL_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return PURPOSIVE_DIRECTIONAL_STRUCTURAL_QUESTIONS; },
    });
    Object.defineProperty(api, "LESSON29_PURPOSIVE_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON29_PURPOSIVE_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON29_PURPOSIVE_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON29_PURPOSIVE_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON29_PURPOSIVE_VERBSTEM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON29_PURPOSIVE_VERBSTEM_FRAME; },
    });
    Object.defineProperty(api, "LESSON29_PURPOSIVE_VNC_PARADIGM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON29_PURPOSIVE_VNC_PARADIGM_FRAME; },
    });
    Object.defineProperty(api, "LESSON29_OUTBOUND_PURPOSIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON29_OUTBOUND_PURPOSIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON29_INBOUND_PURPOSIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON29_INBOUND_PURPOSIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON29_NONACTIVE_EMBED_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON29_NONACTIVE_EMBED_FRAME; },
    });
    Object.defineProperty(api, "LESSON29_COMPOUND_EMBED_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON29_COMPOUND_EMBED_FRAME; },
    });
    Object.defineProperty(api, "LESSON29_EXTERNAL_DIRECTIONAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON29_EXTERNAL_DIRECTIONAL_FRAME; },
    });
    Object.defineProperty(api, "LESSON29_PURPOSIVE_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON29_PURPOSIVE_SUBSECTION_INVENTORY; },
    });
    api.clonePurposiveLessonRecord = clonePurposiveLessonRecord;
    api.getLesson29PurposiveSubsectionInventory = getLesson29PurposiveSubsectionInventory;
    api.attachPurposiveDirectionalGrammarContract = attachPurposiveDirectionalGrammarContract;
    api.normalizePurposiveDirectionalEnum = normalizePurposiveDirectionalEnum;
    api.normalizePurposiveDirectionalRelation = normalizePurposiveDirectionalRelation;
    api.normalizePurposiveDirection = normalizePurposiveDirection;
    api.normalizePurposiveMood = normalizePurposiveMood;
    api.normalizePurposiveTense = normalizePurposiveTense;
    api.normalizePurposiveNumber = normalizePurposiveNumber;
    api.normalizePurposiveDirectionalFalsePositiveSource = normalizePurposiveDirectionalFalsePositiveSource;
    api.getPurposiveDirectionalAntiConflationRules = getPurposiveDirectionalAntiConflationRules;
    api.getPurposiveDirectionalStructuralQuestions = getPurposiveDirectionalStructuralQuestions;
    api.getKnownDirectionalPrefixesForPurposiveBoundary = getKnownDirectionalPrefixesForPurposiveBoundary;
    api.buildPurposiveDirectionalBoundaryMetadata = buildPurposiveDirectionalBoundaryMetadata;
    api.buildLesson29PurposivePursuitFrame = buildLesson29PurposivePursuitFrame;
    api.normalizePurposiveDirectionalCandidateSurface = normalizePurposiveDirectionalCandidateSurface;
    api.realizePurposiveDirectionalSegment = realizePurposiveDirectionalSegment;
    api.realizePurposiveDirectionalTargetStemFromSegments = realizePurposiveDirectionalTargetStemFromSegments;
    api.buildPurposiveDirectionalSourceFrame = buildPurposiveDirectionalSourceFrame;
    api.getPurposiveMatrixShape = getPurposiveMatrixShape;
    api.isPurposiveDirectionalSourceFrame = isPurposiveDirectionalSourceFrame;
    api.isPurposiveDirectionalOperationFrame = isPurposiveDirectionalOperationFrame;
    api.buildPurposiveDirectionalOperationFrame = buildPurposiveDirectionalOperationFrame;
    api.buildAndrewsPurposiveDirectionalVnc = buildAndrewsPurposiveDirectionalVnc;
    api.classifyPurposiveDirectionalCandidate = classifyPurposiveDirectionalCandidate;
    api.classifyPurposiveDirectionalFalsePositive = classifyPurposiveDirectionalFalsePositive;
    return api;
}

export function installPurposiveGlobals(targetObject = globalThis) {
    const api = createPurposiveApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
