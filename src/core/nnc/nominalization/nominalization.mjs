// Canonical modern ESM module.

export function createNominalizationBoundaryModule(targetObject = globalThis) {
    const NOMINALIZATION_BOUNDARY_VERSION = 1;
    const NOMINALIZATION_BOUNDARY_KIND = Object.freeze({
      structuralNominalization: "structural-nominalization",
      preteritAgentive: "preterit-agentive",
      ownerhood: "ownerhood",
      customaryAgentive: "customary-agentive",
      deverbalZ: "deverbal-z",
      deverbalLiz: "deverbal-liz",
      patientiveFamily: "patientive-family",
      unknown: "unknown"
    });
    const NOMINALIZATION_FALSE_POSITIVE_SOURCE = Object.freeze({
      generatedNominalSurface: "generated-nominal-surface",
      nominalizationProfile: "nominalization-profile",
      patientiveFamilyProfile: "patientive-family-profile",
      ordinaryNncFixture: "ordinary-nnc-fixture",
      ordinaryNncOpenStem: "ordinary-nnc-open-stem",
      adjetivoRoute: "adjetivo-route",
      compoundAst: "compound-ast",
      translationLabel: "translation-label",
      andrewsExample: "andrews-example",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const NOMINALIZATION_ANTI_CONFLATION_RULES = Object.freeze(["generated sustantivo/adjetivo surfaces are partial motors, not complete Lessons 35-39 coverage", "sustantivo-verbal s/lis output is the current Nawat active-action motor, not complete z/liz fixture coverage", "nominalizationProfile is explanatory metadata, not ownerhood or complete z/liz generation", "patientiveFamilyProfile is a current-output taxonomy, not full Lessons 37.9-39 patientive data", "ordinary NNC fixtures and open-stem previews are not deverbal or ownerhood fixture evidence", "adjetivo route output is not adjectival modification syntax", "Andrews nominalization categories are engine authority, not Nawat/Pipil orthography authority"]);
    const NOMINALIZATION_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "nominalizationKind",
      asks: "Is the candidate agentive, ownerhood, deverbal z/liz, patientive, action/result, or unknown?"
    }), Object.freeze({
      field: "sourceVnc",
      asks: "Which Andrews VNC source, tense/aspect, voice, and valency license the route?"
    }), Object.freeze({
      field: "stemUse",
      asks: "Is the stem restricted, general-use, compound-embed, generated surface only, or unknown?"
    }), Object.freeze({
      field: "semanticRole",
      asks: "Does the nounstem name agent, patient, instrument, action, result, owner, property, or unknown?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "Which Andrews source gate or structured route licenses generation before Nawat/Pipil orthography realizes it?"
    })]);
    function freezeNominalizationOperationalLayerOperation(operation = {}) {
      return Object.freeze({
        id: String(operation.id || ""),
        broadLabel: String(operation.broadLabel || ""),
        family: String(operation.family || ""),
        andrewsSection: String(operation.andrewsSection || ""),
        sourceUnit: String(operation.sourceUnit || "CNV"),
        sourceFormula: String(operation.sourceFormula || "CNV"),
        targetFormula: String(operation.targetFormula || "CNN"),
        operation: String(operation.operation || ""),
        requires: Object.freeze({
          ...(operation.requires || {})
        }),
        transform: Object.freeze({
          ...(operation.transform || {})
        }),
        builds: Object.freeze({
          ...(operation.builds || {})
        }),
        generationStatus: String(operation.generationStatus || "source-gated"),
        routeStage: String(operation.routeStage || "cnv-cnn-operational-layer"),
        diagnostics: Object.freeze(Array.isArray(operation.diagnostics) ? Array.from(operation.diagnostics) : [])
      });
    }
    function freezeNominalizationOperationalLayerOperations(operations = []) {
      return Object.freeze(operations.map(freezeNominalizationOperationalLayerOperation));
    }
    const ANDREWS_CNV_CNN_OPERATIONAL_LAYER_BY_LABEL = Object.freeze({
      "predicado-nominal": freezeNominalizationOperationalLayerOperations([{
        id: "predicado-nominal-source-tense-inside-stem",
        broadLabel: "predicado-nominal",
        family: "predicate-nominal",
        andrewsSection: "4.4/35-36",
        operation: "reanalyze-cnv-predicate-as-cnn-predicate-stem",
        requires: {
          sourceUnit: "CNV predicate",
          sourceTense: "Andrews VNC source tense"
        },
        transform: {
          sourceTense: "kept inside CNN predicate stem",
          vncTenseSlot: "not copied outside CNN stem"
        },
        builds: {
          targetShell: "CNN",
          targetState: "nominal predicate",
          targetTenseSlot: "none"
        }
      }, {
        id: "predicado-nominal-andrews-source-tense-inventory",
        broadLabel: "predicado-nominal",
        family: "predicate-nominal",
        andrewsSection: "4.5/5.5/35-36",
        operation: "limit-predicate-nominal-source-to-andrews-vnc-tense-inventory",
        requires: {
          sourceTense: "present/customary/imperfect/preterit/distant-past/future"
        },
        transform: {
          nonAndrewsFiniteExtensions: "diagnostic only",
          sourcePredicate: "kept as source predicate before CNN reanalysis"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "source-tense-gate"
        }
      }, {
        id: "predicado-nominal-future-s-inside-stem",
        broadLabel: "predicado-nominal",
        family: "predicate-nominal",
        andrewsSection: "36.8/46.3.1.a",
        operation: "keep-future-s-inside-reanalyzed-predicate-stem",
        requires: {
          sourceTense: "future",
          sourceUnit: "CNV predicate"
        },
        transform: {
          futureTns: "inside CNN predicate stem",
          numberConnector: "outside parentheses"
        },
        builds: {
          targetShell: "CNN",
          targetTenseSlot: "none"
        }
      }, {
        id: "predicado-nominal-absolutive-t-ti-connector",
        broadLabel: "predicado-nominal",
        family: "predicate-nominal",
        andrewsSection: "12.2/46.3.1.a",
        operation: "resolve-absolutive-t-ti-after-predicate-stem",
        requires: {
          targetState: "absolutive",
          selector: "previous non-zero predicate-stem segment"
        },
        transform: {
          connector: "t/ti as subject-number operation",
          stem: "unchanged inside parentheses"
        },
        builds: {
          targetShell: "CNN",
          targetNumberConnector: "t/ti allomorph"
        }
      }]),
      agentivo: freezeNominalizationOperationalLayerOperations([{
        id: "customary-agentive-reanalysis",
        broadLabel: "agentivo",
        family: "customary-present-agentive",
        andrewsSection: "36.2",
        operation: "customary-present-active-predicate-reanalysis",
        requires: {
          sourceVoice: "active",
          sourceTense: "customary-present",
          sourceTns: "ni"
        },
        transform: {
          sourcePredicate: "becomes CNN nounstem",
          valenceMaterial: "moves inside nounstem",
          numberDyads: "VNC dyads retained"
        },
        builds: {
          targetShell: "CNN",
          targetState: "mostly absolutive",
          targetStemFinal: "ni"
        }
      }, {
        id: "customary-agentive-full-nominalization",
        broadLabel: "agentivo",
        family: "customary-present-agentive",
        andrewsSection: "36.3",
        operation: "customary-present-full-nominalization",
        requires: {
          sourceVoice: "active",
          sourceTense: "customary-present",
          sourceTns: "ni"
        },
        transform: {
          numberDyads: "replaced by CNN ti subclass 1-A number",
          sourcePredicate: "becomes fully nominal nounstem"
        },
        builds: {
          targetShell: "CNN",
          targetState: "fully nominal",
          targetUse: "compound-eligible"
        }
      }, {
        id: "customary-agentive-translation-contrast",
        broadLabel: "agentivo",
        family: "customary-present-agentive",
        andrewsSection: "36.4",
        operation: "keep-preterit-vs-customary-agentive-contrast",
        requires: {
          contrastSource: "preterit-agentive or customary-present agentive"
        },
        transform: {
          translation: "diagnostic only",
          structure: "not merged by gloss"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "diagnostic contrast"
        },
        generationStatus: "diagnostic-only"
      }]),
      "agentivo-presente": freezeNominalizationOperationalLayerOperations([{
        id: "present-agentive-absolutive",
        broadLabel: "agentivo-presente",
        family: "present-agentive",
        andrewsSection: "36.7",
        operation: "present-indicative-predicate-to-agentive-nounstem",
        requires: {
          sourceTense: "present-indicative",
          sourceUnit: "VNC predicate"
        },
        transform: {
          sourcePredicate: "converted to absolutive-state CNN nounstem"
        },
        builds: {
          targetShell: "CNN",
          targetState: "absolutive",
          targetUse: "agentive nounstem"
        }
      }]),
      "agentivo-preterito": freezeNominalizationOperationalLayerOperations([{
        id: "preterit-agentive-restricted-use",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive",
        andrewsSection: "35.3",
        operation: "preterit-predicate-to-restricted-agentive-nounstem",
        requires: {
          sourceTense: "preterit",
          sourceUnit: "VNC predicate"
        },
        transform: {
          sourcePredicate: "becomes restricted CNN nounstem",
          preteritMorph: "final inside nounstem",
          sourceSubjectNumber: "continues in absolutive reanalysis"
        },
        builds: {
          targetShell: "CNN",
          targetState: "absolutive",
          targetUse: "restricted"
        }
      }, {
        id: "preterit-agentive-number-position",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive",
        andrewsSection: "35.4",
        operation: "resolve-preterit-agentive-number-position",
        requires: {
          sourceClass: "Class B/C/D or class-conditioned source",
          animacyTendency: "available when meaningful"
        },
        transform: {
          numberDyad: "qui/zero alternation preserved",
          projectiveObject: "may activate into hybrid"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "number-position branch"
        }
      }, {
        id: "preterit-agentive-general-use-ca",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive",
        andrewsSection: "35.5",
        operation: "embed-restricted-preterit-stem-before-ca-matrix",
        requires: {
          sourceStem: "restricted preterit-agentive nounstem"
        },
        transform: {
          restrictedStem: "embed",
          reflexiveSource: "mainline reflexive becomes shuntline ne"
        },
        builds: {
          targetShell: "CNN",
          targetState: "general-use or possessive-eligible",
          targetMatrix: "(ca)-tl"
        }
      }, {
        id: "preterit-agentive-possessive-state",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive",
        andrewsSection: "35.6",
        operation: "general-use-stem-to-possessive-state-agentive",
        requires: {
          sourceStem: "general-use preterit-agentive nounstem",
          possessor: "external possessor"
        },
        transform: {
          possessor: "external to source VNC subject",
          numberDyad: "uh-0/hu-an"
        },
        builds: {
          targetShell: "CNN",
          targetState: "possessive",
          targetClass: "ti subclass 1-A"
        }
      }, {
        id: "preterit-agentive-compound-embed",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive",
        andrewsSection: "35.7",
        operation: "general-use-preterit-agentive-as-compound-embed",
        requires: {
          sourceStem: "general-use preterit-agentive stem",
          matrix: "CNN/CNV compound matrix"
        },
        transform: {
          sourceStem: "compound embed",
          targetMatrix: "kept explicit"
        },
        builds: {
          targetShell: "CNN/CNV compound",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "preterit-agentive-old-woman-man",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive-old-person",
        andrewsSection: "35.8",
        operation: "old-woman-old-man-preterit-agentive-formation",
        requires: {
          sourceStem: "old-person noun/adjectival source",
          sourcePredicate: "become old woman/man"
        },
        transform: {
          simpleNounstem: "kept distinct from preterit-agentive stem",
          preteritEnding: "inside derived nounstem"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "old-person agentive formation"
        },
        generationStatus: "source-gated"
      }, {
        id: "preterit-agentive-ownerhood",
        broadLabel: "agentivo-preterito",
        family: "ownerhood-preterit-agentive",
        andrewsSection: "35.9",
        operation: "incorporated-object-ownerhood-matrix-to-preterit-agentive",
        requires: {
          sourceCompound: "incorporated-object compound",
          matrix: "tla-e or tla-hua"
        },
        transform: {
          incorporatedObject: "inside source compound",
          matrixChoice: "by class and preceding sound"
        },
        builds: {
          targetShell: "CNN",
          targetMeaningRole: "ownerhood"
        }
      }, {
        id: "preterit-agentive-abundant-ownerhood",
        broadLabel: "agentivo-preterito",
        family: "abundant-ownerhood",
        andrewsSection: "35.10",
        operation: "abundant-ownerhood-yua-yuwa-matrix-nominalization",
        requires: {
          sourceEnvironment: "preterit/connective-t ownerhood environment"
        },
        transform: {
          yAssimilation: "applies",
          preteritAgentiveStem: "may incorporate as object"
        },
        builds: {
          targetShell: "CNN",
          targetMeaningRole: "abundant ownerhood"
        }
      }, {
        id: "preterit-agentive-ownerhood-analysis",
        broadLabel: "agentivo-preterito",
        family: "ownerhood-preterit-agentive",
        andrewsSection: "35.11",
        operation: "analyze-ownerhood-translation-without-changing-route",
        requires: {
          sourceStem: "ownerhood preterit-agentive NNC"
        },
        transform: {
          translation: "diagnostic only",
          route: "kept as ownerhood matrix plus preterit-agentive"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "analysis diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "preterit-agentive-vnc-embed-adverbial",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive-adverbial",
        andrewsSection: "35.12",
        operation: "preterit-agentive-as-incorporated-object-or-adverb",
        requires: {
          sourceStem: "preterit-agentive nounstem",
          matrixValence: "intransitive or transitive VNC matrix"
        },
        transform: {
          embeddedRole: "incorporated object or manner adverb",
          reflexiveShape: "depends on matrix valence"
        },
        builds: {
          targetShell: "CNV matrix with CNN embed",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "preterit-agentive-vocative-particle-boundary",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive-vocative",
        andrewsSection: "35.13",
        operation: "keep-vocative-particle-outside-preterit-agentive-nnc",
        requires: {
          particleContext: "vocative",
          sourceStem: "preterit-agentive nounstem"
        },
        transform: {
          particle: "not a CNN stem operation",
          numberDyad: "kept with NNC when present"
        },
        builds: {
          targetShell: "particle plus CNN",
          targetStatus: "particle-boundary diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "preterit-agentive-vocative-c-zero-boundary",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive-vocative",
        andrewsSection: "35.13.1",
        operation: "vocative-boundary-with-c-zero-singular-number-dyad",
        requires: {
          particleContext: "vocative",
          numberDyad: "c-0"
        },
        transform: {
          particle: "outside NNC",
          support: "number dyad remains part of preterit-agentive structure"
        },
        builds: {
          targetShell: "particle plus CNN",
          targetStatus: "particle-boundary diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "preterit-agentive-vocative-qui-zero-supportive-i",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive-vocative",
        andrewsSection: "35.13.2",
        operation: "vocative-boundary-with-qui-zero-supportive-i-loss",
        requires: {
          particleContext: "vocative",
          numberDyad: "qui-0"
        },
        transform: {
          supportiveI: "kept as source-conditioned and may be lost before vocative particle",
          particle: "outside CNN stem"
        },
        builds: {
          targetShell: "particle plus CNN",
          targetStatus: "particle-boundary diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "preterit-agentive-vocative-perfective-class-band",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive-vocative",
        andrewsSection: "35.13.3",
        operation: "vocative-boundary-keeps-perfective-class-band",
        requires: {
          sourceClass: "perfective-ending class band",
          particleContext: "vocative"
        },
        transform: {
          classBand: "diagnostic source metadata",
          particle: "not a stem suffix"
        },
        builds: {
          targetShell: "particle plus CNN",
          targetStatus: "particle-boundary diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "preterit-agentive-vocative-intervocalic-boundary",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive-vocative",
        andrewsSection: "35.13.4",
        operation: "vocative-boundary-with-intervocalic-problem-diagnostic",
        requires: {
          particleContext: "vocative",
          phonologicalContext: "intervocalic boundary"
        },
        transform: {
          intervocalicEffect: "diagnostic only",
          formulaBoundary: "NNC and particle remain separate"
        },
        builds: {
          targetShell: "particle plus CNN",
          targetStatus: "particle-boundary diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "preterit-agentive-double-nucleus-compound",
        broadLabel: "agentivo-preterito",
        family: "preterit-agentive-compound",
        andrewsSection: "35.14",
        operation: "compound-nnc-with-double-nucleus-embed",
        requires: {
          compoundStem: "double nucleus source",
          sourceEmbeds: "two nucleus embeds"
        },
        transform: {
          nuclei: "preserved as distinct embeds",
          flattening: "blocked"
        },
        builds: {
          targetShell: "compound CNN",
          targetStatus: "source-gated continuation"
        }
      }]),
      "agentivo-futuro": freezeNominalizationOperationalLayerOperations([{
        id: "future-agentive-restricted-use",
        broadLabel: "agentivo-futuro",
        family: "future-agentive",
        andrewsSection: "36.8.1",
        operation: "future-predicate-to-restricted-agentive-nounstem",
        requires: {
          sourceTense: "future",
          sourceUnit: "VNC predicate"
        },
        transform: {
          futureZ: "kept final in restricted stem",
          singularNumber: "qui-0",
          pluralNumber: "qu-eh"
        },
        builds: {
          targetShell: "CNN",
          targetState: "absolutive",
          targetUse: "restricted"
        }
      }, {
        id: "future-agentive-general-use-ca",
        broadLabel: "agentivo-futuro",
        family: "future-agentive",
        andrewsSection: "36.8.2",
        operation: "future-restricted-stem-before-ca-matrix",
        requires: {
          sourceStem: "future-agentive restricted stem"
        },
        transform: {
          restrictedStem: "embedded before ca matrix",
          possessor: "imported from outside source VNC"
        },
        builds: {
          targetShell: "CNN",
          targetState: "general-use",
          targetClass: "ti subclass 1-A"
        }
      }]),
      "sustantivo-verbal": freezeNominalizationOperationalLayerOperations([{
        id: "active-action-z",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.2",
        operation: "future-verbcore-plus-z-active-action",
        requires: {
          sourceCore: "future-tense verbcore",
          stemClass: "normally i-final"
        },
        transform: {
          classicalZ: "Nawat s",
          possessor: "responsible source subject"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "tli",
          targetRole: "active action"
        }
      }, {
        id: "active-action-z-replacive-imperfective",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.2.1",
        operation: "active-action-z-from-replacive-imperfective-source",
        requires: {
          sourceCore: "future/imperfective-related verbcore",
          sourceEnding: "replacive imperfective change"
        },
        transform: {
          sourceEnding: "replaced before z active-action build",
          classConditioning: "retained as source metadata"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "active action"
        }
      }, {
        id: "active-action-z-base-replacive",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.2.2",
        operation: "active-action-z-from-base-with-replacive-change",
        requires: {
          sourceBase: "verbcore base with replacive behavior"
        },
        transform: {
          base: "selected before z operation",
          replaciveChange: "applied as source-conditioned"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "active action"
        }
      }, {
        id: "active-action-z-class-sensitive-replacive",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.2.3",
        operation: "active-action-z-class-sensitive-replacive-variant",
        requires: {
          sourceClass: "Andrews class-conditioned source",
          sourceEnding: "replacive imperfective variant"
        },
        transform: {
          classCondition: "selects active-action variant",
          ending: "not inferred from surface alone"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "class-conditioned active-action"
        }
      }, {
        id: "active-action-z-root-source",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.2.4",
        operation: "active-action-z-from-intransitive-root-source",
        requires: {
          sourceCore: "intransitive root-plus-source",
          sourceReference: "Andrews root class"
        },
        transform: {
          rootSource: "kept distinct from stem surface",
          zOperation: "applies after source core is fixed"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "active action from root source"
        }
      }, {
        id: "active-action-liz",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.3",
        operation: "future-verbcore-plus-liz-active-action",
        requires: {
          sourceCore: "future-tense verbcore",
          projectiveSources: "te/tla when transitive"
        },
        transform: {
          classicalLiz: "Nawat lis",
          reflexiveSource: "shuntline ne",
          classAlternations: "preserved"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "action/process/manner nounstem"
        }
      }, {
        id: "active-action-liz-translation-value",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.4",
        operation: "keep-liz-translation-value-out-of-route-choice",
        requires: {
          sourceStem: "liz nounstem"
        },
        transform: {
          translation: "way/nature/appearance diagnostic only",
          route: "not changed by gloss"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "translation diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "active-action-compound-source",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.5.1",
        operation: "derive-active-action-from-compound-verbstem-source",
        requires: {
          sourceCore: "compound verbstem core"
        },
        transform: {
          compoundSource: "preserved before z/liz operation"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "active action from compound source"
        }
      }, {
        id: "potential-patient-action",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.5.2",
        operation: "active-action-potential-patient-branch",
        requires: {
          sourceValence: "transitive or intransitive source disambiguated"
        },
        transform: {
          objectPronoun: "dropped for potential patient branch",
          doubleObjectReflexive: "exception stays active-action"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "potential patient or active action"
        }
      }, {
        id: "potential-patient-action-intransitive-branch",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.5.2.a",
        operation: "intransitive-source-potential-patient-active-action-branch",
        requires: {
          sourceValence: "intransitive",
          sourceCore: "active-action compatible core"
        },
        transform: {
          patientRole: "potential patient by source semantics",
          objectPronoun: "none introduced"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "potential patient from intransitive source"
        }
      }, {
        id: "potential-patient-action-transitive-branch",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.5.2.b",
        operation: "transitive-source-potential-patient-active-action-branch",
        requires: {
          sourceValence: "transitive",
          objectSource: "source object path disambiguated"
        },
        transform: {
          objectPronoun: "dropped or retained only by Andrews branch",
          doubleObjectReflexive: "not collapsed into simple patientive"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "potential patient from transitive source"
        }
      }, {
        id: "impersonal-action-liz",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.5.3",
        operation: "impersonal-core-to-action-nounstem",
        requires: {
          sourceCore: "impersonal core"
        },
        transform: {
          nonactiveOrTlaImpersonal: "source retained as branch",
          shortZSubtype: "not licensed"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal action"
        }
      }, {
        id: "impersonal-action-nonactive-suffix-source",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.5.3.a",
        operation: "impersonal-action-from-nonactive-suffix-source",
        requires: {
          sourceCore: "impersonal nonactive-suffix source"
        },
        transform: {
          nonactiveSuffix: "kept as source branch",
          lizOperation: "added to impersonal core"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal action nounstem"
        }
      }, {
        id: "impersonal-action-tla-source",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.5.3.b",
        operation: "impersonal-action-from-tla-source",
        requires: {
          sourceCore: "impersonal tla source"
        },
        transform: {
          tla: "source impersonal marker, not target object",
          lizOperation: "builds action nounstem"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal action nounstem"
        }
      }, {
        id: "active-action-compound-embed",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.5.4",
        operation: "active-action-nounstem-as-compound-embed",
        requires: {
          sourceStem: "active-action nounstem",
          matrix: "CNN or CNV compound matrix"
        },
        transform: {
          sourceStem: "compound embed",
          matrixSubposition: "kept explicit"
        },
        builds: {
          targetShell: "CNN/CNV compound",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "active-action-compound-embed-nominal-matrix",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.5.4.a",
        operation: "active-action-nounstem-fills-nominal-compound-matrix-subposition",
        requires: {
          sourceStem: "active-action nounstem",
          matrix: "nominal compound matrix"
        },
        transform: {
          embed: "fills matrix subposition",
          outputFormula: "compound CNN"
        },
        builds: {
          targetShell: "compound CNN",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "active-action-compound-embed-verbal-matrix",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.5.4.b",
        operation: "active-action-nounstem-fills-verbal-compound-matrix-subposition",
        requires: {
          sourceStem: "active-action nounstem",
          matrix: "verbal compound matrix"
        },
        transform: {
          embed: "fills matrix subposition",
          outputFormula: "CNV matrix with CNN embed"
        },
        builds: {
          targetShell: "compound CNV",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "active-action-affective-tzin-assimilation",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.5.5",
        operation: "active-action-liz-plus-tzin-affective-assimilation",
        requires: {
          sourceStem: "liz nounstem",
          affectiveMatrix: "tzin"
        },
        transform: {
          assimilation: "licensed by Andrews; Nawat realization still separated"
        },
        builds: {
          targetShell: "compound CNN",
          targetStatus: "orthography-bridge continuation"
        }
      }, {
        id: "passive-action-nnc",
        broadLabel: "sustantivo-verbal",
        family: "action-nnc",
        andrewsSection: "36.10",
        operation: "distant-past-passive-to-passive-action-nnc",
        requires: {
          sourceVoice: "passive",
          sourceTense: "distant-past"
        },
        transform: {
          sourceSubject: "becomes possessor",
          ca: "final in general-use stem",
          restrictedStem: "yo compound"
        },
        builds: {
          targetShell: "CNN",
          targetState: "possessive/general or absolutive restricted",
          targetRole: "passive action"
        }
      }, {
        id: "active-action-first-type",
        broadLabel: "sustantivo-verbal",
        family: "action-nnc",
        andrewsSection: "36.11",
        operation: "distant-past-active-to-active-action-nnc",
        requires: {
          sourceVoice: "active",
          sourceTense: "distant-past",
          sourceScope: "mostly intransitive or reflexive"
        },
        transform: {
          sourceSubject: "becomes possessor",
          reflexiveSource: "mainline becomes shuntline",
          restrictedStem: "yo compound"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "active action/result/state"
        }
      }, {
        id: "active-action-passive-action-possessor-role-contrast",
        broadLabel: "sustantivo-verbal",
        family: "action-nnc",
        andrewsSection: "37.6",
        operation: "distinguish-active-vs-passive-action-possessor-role",
        requires: {
          sourceStem: "active-action or passive-action nounstem"
        },
        transform: {
          activePossessor: "agent",
          passivePossessor: "patient"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "role diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "active-action-multiple-nucleus-supplement",
        broadLabel: "sustantivo-verbal",
        family: "active-action",
        andrewsSection: "37.7",
        operation: "active-action-nnc-as-multiple-nucleus-supplement",
        requires: {
          sourceStem: "active-action NNC",
          sentenceFrame: "multiple nucleus construction"
        },
        transform: {
          supplement: "sentence-level function, not word-internal suffix"
        },
        builds: {
          targetShell: "sentence-level supplement",
          targetStatus: "diagnostic-only"
        },
        generationStatus: "diagnostic-only"
      }]),
      patientivo: freezeNominalizationOperationalLayerOperations([{
        id: "customary-present-patientive",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "36.5",
        operation: "customary-present-passive-to-patientive",
        requires: {
          sourceVoice: "passive",
          sourceTense: "customary-present"
        },
        transform: {
          passivePredicate: "becomes patientive nounstem",
          projectiveObject: "not retained as outside object",
          reflexiveSource: "shuntline ne"
        },
        builds: {
          targetShell: "CNN",
          targetState: "absolutive",
          targetRole: "patient/undergoer"
        }
      }, {
        id: "patientive-source-family-overview",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "37.8",
        operation: "classify-patientive-source-family-before-output",
        requires: {
          sourceFamily: "passive/impersonal/perfective/imperfective/root-or-stock"
        },
        transform: {
          family: "kept as route branch",
          translation: "not used as source evidence"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "source-family-gate"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "passive-patientive",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "37.9",
        operation: "passive-core-to-patientive-nounstem",
        requires: {
          sourceCore: "passive VNC core",
          ultimateSource: "not intransitive"
        },
        transform: {
          nonactiveSuffix: "deletion family lo/o/hua",
          objectMaterial: "only licensed source objects retained"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "passive patientive"
        }
      }, {
        id: "passive-patientive-nonactive-suffix-family",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "37.9.1",
        operation: "derive-passive-patientive-from-nonactive-suffix-family",
        requires: {
          sourceCore: "passive VNC core",
          nonactiveSuffixFamily: "lo/o/hua variants"
        },
        transform: {
          suffixDeletion: "source-family conditioned",
          classEffects: "preserved"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "passive patientive"
        }
      }, {
        id: "passive-patientive-reflexive-shuntline",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "37.9.2",
        operation: "passive-reflexive-source-uses-shuntline-ne",
        requires: {
          sourceCore: "passive reflexive source"
        },
        transform: {
          reflexive: "mainline source becomes shuntline ne",
          passiveSource: "kept passive, not impersonal"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "passive patientive"
        }
      }, {
        id: "passive-patientive-projective-source",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "37.9.3",
        operation: "passive-projective-source-object-pronoun-routing",
        requires: {
          sourceCore: "passive source with projective objects"
        },
        transform: {
          objectPronouns: "retained/deleted by Andrews passive source contract",
          doubleProjective: "keeps one licensed object"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "passive patientive"
        }
      }, {
        id: "passive-patientive-lo-suffix-family",
        broadLabel: "patientivo",
        family: "patientive-passive-suffix-family",
        andrewsSection: "37.9.1.a",
        operation: "passive-patientive-from-lo-nonactive-source",
        requires: {
          sourceCore: "passive voice core",
          nonactiveSuffixFamily: "lo"
        },
        transform: {
          nonactiveSuffix: "deleted or retained by passive-patientive family rule",
          patientiveStem: "not inferred from surface alone"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "passive patientive"
        }
      }, {
        id: "passive-patientive-o-suffix-family",
        broadLabel: "patientivo",
        family: "patientive-passive-suffix-family",
        andrewsSection: "37.9.1.b",
        operation: "passive-patientive-from-o-nonactive-source",
        requires: {
          sourceCore: "passive voice core",
          nonactiveSuffixFamily: "o"
        },
        transform: {
          nonactiveSuffix: "source-family conditioned",
          patientiveStem: "keeps passive-source metadata"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "passive patientive"
        }
      }, {
        id: "passive-patientive-hua-suffix-family",
        broadLabel: "patientivo",
        family: "patientive-passive-suffix-family",
        andrewsSection: "37.9.1.c",
        operation: "passive-patientive-from-hua-nonactive-source",
        requires: {
          sourceCore: "passive voice core",
          nonactiveSuffixFamily: "hua"
        },
        transform: {
          huaSource: "converted through passive-patientive source contract",
          classEffects: "preserved before Nawat realization"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "passive patientive"
        }
      }, {
        id: "impersonal-patientive",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "38.1",
        operation: "impersonal-core-to-patientive-nounstem",
        requires: {
          sourceCore: "impersonal VNC core"
        },
        transform: {
          sourceVoice: "kept distinct from passive",
          nonspecificProjective: "depends on source",
          reflexive: "shuntline ne"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-intransitive-source",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "38.1.1",
        operation: "intransitive-active-source-to-impersonal-patientive",
        requires: {
          sourceCore: "intransitive active source impersonalized"
        },
        transform: {
          rootPlusYa: "may use root not stem",
          nonactiveFamily: "source-conditioned"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-intransitive-nonactive-derived-a",
        broadLabel: "patientivo",
        family: "patientive-impersonal-source-family",
        andrewsSection: "38.1.1.a",
        operation: "intransitive-source-through-derived-impersonal-core-a",
        requires: {
          sourceCore: "intransitive active source",
          impersonalCore: "derived impersonal voice core"
        },
        transform: {
          activeSource: "impersonalized before patientive",
          nonactiveFamily: "source-conditioned"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-intransitive-nonactive-derived-b",
        broadLabel: "patientivo",
        family: "patientive-impersonal-source-family",
        andrewsSection: "38.1.1.b",
        operation: "intransitive-source-through-derived-impersonal-core-b",
        requires: {
          sourceCore: "intransitive active source",
          impersonalCore: "derived impersonal voice core"
        },
        transform: {
          sourceRoot: "may differ from visible stem",
          nonactiveFamily: "not collapsed with passive"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-intransitive-built-core-c",
        broadLabel: "patientivo",
        family: "patientive-impersonal-source-family",
        andrewsSection: "38.1.1.c",
        operation: "intransitive-source-built-impersonal-core-c",
        requires: {
          sourceCore: "intransitive active source",
          impersonalCore: "built impersonal core"
        },
        transform: {
          impersonalCore: "explicit intermediate source",
          patientiveStem: "built from impersonal core"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-intransitive-built-core-d",
        broadLabel: "patientivo",
        family: "patientive-impersonal-source-family",
        andrewsSection: "38.1.1.d",
        operation: "intransitive-source-built-impersonal-core-d",
        requires: {
          sourceCore: "intransitive active source",
          impersonalCore: "built impersonal core"
        },
        transform: {
          derivationHistory: "retained before patientive",
          finalSurface: "not source authority"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-reflexive-source",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "38.1.2",
        operation: "transitive-reflexive-source-to-impersonal-patientive",
        requires: {
          sourceCore: "transitive active reflexive source"
        },
        transform: {
          reflexive: "mainline object becomes shuntline ne",
          objectPronoun: "not treated as external target object"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-projective-nonhuman-source",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "38.1.3",
        operation: "projective-nonhuman-source-to-impersonal-patientive",
        requires: {
          sourceCore: "transitive active projective source",
          directObject: "nonhuman"
        },
        transform: {
          projective: "tla source routing",
          nonhumanPatient: "kept structural"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-projective-nonhuman-derived-a",
        broadLabel: "patientivo",
        family: "patientive-impersonal-source-family",
        andrewsSection: "38.1.3.a",
        operation: "projective-nonhuman-source-derived-impersonal-core-a",
        requires: {
          sourceCore: "transitive active projective source",
          projectiveObject: "nonhuman/tla"
        },
        transform: {
          projectiveObject: "inside source core",
          impersonalCore: "intermediate source before patientive"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-projective-nonhuman-derived-b",
        broadLabel: "patientivo",
        family: "patientive-impersonal-source-family",
        andrewsSection: "38.1.3.b",
        operation: "projective-nonhuman-source-derived-impersonal-core-b",
        requires: {
          sourceCore: "transitive active projective source",
          projectiveObject: "nonhuman/tla"
        },
        transform: {
          sourceVoice: "impersonal, not passive",
          objectPronoun: "not copied outside target CNN"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-projective-nonhuman-derived-c",
        broadLabel: "patientivo",
        family: "patientive-impersonal-source-family",
        andrewsSection: "38.1.3.c",
        operation: "projective-nonhuman-source-derived-impersonal-core-c",
        requires: {
          sourceCore: "transitive active projective source",
          projectiveObject: "nonhuman/tla"
        },
        transform: {
          impersonalCore: "built before patientive operation",
          patientiveFamily: "kept distinct from active-action overlap"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-projective-human-te-source",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "38.1.4",
        operation: "projective-human-te-source-through-impersonalized-passive",
        requires: {
          sourceCore: "projective human te source"
        },
        transform: {
          teSource: "routes through impersonalized passive/tla pattern",
          passiveVsImpersonal: "not collapsed"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-human-te-nonactive-a",
        broadLabel: "patientivo",
        family: "patientive-human-projective-source",
        andrewsSection: "38.1.4.a",
        operation: "human-te-source-through-nonactive-derived-branch-a",
        requires: {
          sourceCore: "projective human active source",
          projectiveObject: "te"
        },
        transform: {
          humanProjective: "routes through nonactive/impersonalized branch",
          passiveContrast: "kept visible"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "human-source impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-human-te-nonactive-b",
        broadLabel: "patientivo",
        family: "patientive-human-projective-source",
        andrewsSection: "38.1.4.b",
        operation: "human-te-source-through-nonactive-derived-branch-b",
        requires: {
          sourceCore: "projective human active source",
          nonactiveSuffix: "source-conditioned"
        },
        transform: {
          teSource: "not a target object",
          nonactiveSuffix: "intermediate source branch"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "human-source impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-human-te-hua-branch",
        broadLabel: "patientivo",
        family: "patientive-human-projective-source",
        andrewsSection: "38.1.4.c",
        operation: "human-te-source-through-hua-nonactive-branch",
        requires: {
          sourceCore: "projective human active source",
          nonactiveSuffixFamily: "hua"
        },
        transform: {
          huaBranch: "kept as impersonalized source",
          targetObject: "none outside CNN"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "human-source impersonal patientive"
        }
      }, {
        id: "impersonal-patientive-human-nonhuman-contrast",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "38.1.5",
        operation: "preserve-human-vs-nonhuman-patientive-contrast",
        requires: {
          sourceContrast: "human/nonhuman projective source"
        },
        transform: {
          anomalousTe: "diagnostic contrast",
          translation: "not route authority"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "contrast diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "impersonal-patientive-active-action-overlap",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "38.1.6",
        operation: "keep-impersonal-patientive-and-active-action-overlap-separate",
        requires: {
          nearSurfacePair: "impersonal patientive or active-action nounstem"
        },
        transform: {
          overlap: "translation overlap only",
          route: "kept by source family"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "anti-conflation diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "compound-patientive-source",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "38.2.1",
        operation: "compound-verbstem-source-to-patientive",
        requires: {
          sourceCore: "compound verbstem source"
        },
        transform: {
          embeddedObjects: "do not invert analysis",
          compoundSource: "preserved before patientive derivation"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "compound-source patientive"
        }
      }, {
        id: "compound-patientive-matrix",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "38.2.2",
        operation: "deverbal-nounstem-as-compound-matrix",
        requires: {
          sourceStem: "patientive deverbal nounstem",
          embed: "compound embed"
        },
        transform: {
          matrixRole: "patientive acts as matrix",
          embeddedStem: "kept distinct"
        },
        builds: {
          targetShell: "compound CNN",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "perfective-patientive",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.1",
        operation: "perfective-active-core-to-patientive",
        requires: {
          sourceCore: "perfective active verbstem"
        },
        transform: {
          analogy: "passive or impersonal",
          sourceEnding: "class-limited"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "tli",
          targetRole: "perfective patientive"
        }
      }, {
        id: "perfective-patientive-ending-gate",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.1.1",
        operation: "perfective-core-ending-gate",
        requires: {
          sourceCore: "perfective active core",
          sourceEnding: "Andrews-allowed ending"
        },
        transform: {
          ending: "selects patientive class/variant",
          invalidEnding: "blocks route"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "tli"
        }
      }, {
        id: "perfective-patientive-compound-source",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.1.3",
        operation: "perfective-compound-source-patientive",
        requires: {
          sourceCore: "compound perfective active source"
        },
        transform: {
          compoundSource: "preserved before patientive operation"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "source-gated"
        }
      }, {
        id: "imperfective-patientive",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.2",
        operation: "imperfective-active-stem-to-patientive",
        requires: {
          sourceCore: "imperfective active stem"
        },
        transform: {
          analogy: "passive or impersonal",
          classCOrD: "preserved"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "ti",
          targetRole: "imperfective patientive"
        }
      }, {
        id: "imperfective-patientive-transitive-source",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.2.1",
        operation: "transitive-imperfective-source-to-patientive",
        requires: {
          sourceStem: "transitive imperfective active stem"
        },
        transform: {
          objectSource: "controlled by source valence",
          targetClass: "ti"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "ti"
        }
      }, {
        id: "imperfective-patientive-intransitive-source",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.2.2",
        operation: "intransitive-imperfective-source-to-patientive",
        requires: {
          sourceStem: "intransitive imperfective active stem"
        },
        transform: {
          sourceValence: "kept in source metadata",
          targetClass: "ti"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "ti"
        }
      }, {
        id: "characteristic-property-patientive",
        broadLabel: "patientivo",
        family: "characteristic-property",
        andrewsSection: "39.3",
        operation: "imperfective-patientive-characteristic-property",
        requires: {
          sourceStem: "patientive characteristic source"
        },
        transform: {
          yoMatrix: "kept as characteristic-property matrix",
          state: "quality/property role"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "characteristic property"
        }
      }, {
        id: "characteristic-property-state-quality",
        broadLabel: "patientivo",
        family: "characteristic-property",
        andrewsSection: "39.3.1",
        operation: "patientive-state-quality-meaning",
        requires: {
          sourceStem: "characteristic property patientive"
        },
        transform: {
          meaning: "state/quality/inherent entity diagnostic"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "semantic role diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "characteristic-property-pertaining-thing",
        broadLabel: "patientivo",
        family: "characteristic-property",
        andrewsSection: "39.3.2",
        operation: "patientive-thing-pertaining-to-incorporated-source",
        requires: {
          incorporatedSource: "nominal or verbal source inside property stem"
        },
        transform: {
          sourceRelation: "pertaining-to role retained"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "characteristic property"
        }
      }, {
        id: "characteristic-property-intrinsic-thing",
        broadLabel: "patientivo",
        family: "characteristic-property",
        andrewsSection: "39.3.3",
        operation: "patientive-intrinsic-thing-incorporated-source",
        requires: {
          incorporatedSource: "source stem naming intrinsic quality"
        },
        transform: {
          sourceRelation: "intrinsic role retained"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "characteristic property"
        }
      }, {
        id: "characteristic-property-organic-possession",
        broadLabel: "patientivo",
        family: "characteristic-property",
        andrewsSection: "39.3.4",
        operation: "organic-possession-characteristic-property",
        requires: {
          sourceRelation: "organic/integral possession"
        },
        transform: {
          state: "possessive-state only",
          possessor: "part-whole relation"
        },
        builds: {
          targetShell: "CNN",
          targetState: "possessive"
        }
      }, {
        id: "characteristic-property-compound-matrix",
        broadLabel: "patientivo",
        family: "characteristic-property",
        andrewsSection: "39.3.5",
        operation: "characteristic-property-as-compound-matrix",
        requires: {
          sourceStem: "characteristic-property nounstem",
          embed: "compound embed"
        },
        transform: {
          matrixSubposition: "filled by source",
          derivationHistory: "retained"
        },
        builds: {
          targetShell: "compound CNN",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "characteristic-property-action-embed",
        broadLabel: "patientivo",
        family: "characteristic-property",
        andrewsSection: "39.3.6",
        operation: "passive-or-active-action-nounstem-as-characteristic-property-embed",
        requires: {
          sourceEmbed: "passive-action or active-action nounstem"
        },
        transform: {
          actionEmbed: "kept as embed before property matrix",
          yoTlOmission: "possible in later function use"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "characteristic property with action embed"
        }
      }, {
        id: "characteristic-property-passive-action-embed",
        broadLabel: "patientivo",
        family: "characteristic-property",
        andrewsSection: "39.3.6.a",
        operation: "passive-action-nounstem-as-characteristic-property-embed",
        requires: {
          sourceEmbed: "passive-action nounstem",
          matrix: "characteristic-property matrix"
        },
        transform: {
          passiveActionHistory: "retained inside property embed",
          matrix: "yo/tl property layer"
        },
        builds: {
          targetShell: "CNN characteristic property"
        }
      }, {
        id: "characteristic-property-active-action-embed",
        broadLabel: "patientivo",
        family: "characteristic-property",
        andrewsSection: "39.3.6.b",
        operation: "active-action-nounstem-as-characteristic-property-embed",
        requires: {
          sourceEmbed: "active-action nounstem",
          matrix: "characteristic-property matrix"
        },
        transform: {
          activeActionHistory: "retained inside property embed",
          matrix: "yo/tl property layer"
        },
        builds: {
          targetShell: "CNN characteristic property"
        }
      }, {
        id: "root-stock-patientive",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.4",
        operation: "root-or-stock-to-patientive",
        requires: {
          sourceCore: "destockal root or stock"
        },
        transform: {
          suffixChoice: "c/x/z/ch or stock-conditioned",
          exactVariant: "not inferred from final surface alone"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "tli",
          targetRole: "root/stock patientive"
        }
      }, {
        id: "root-stock-patientive-ni-destockal",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.4.1",
        operation: "ni-destockal-root-to-patientive",
        requires: {
          sourceCore: "intransitive destockal root"
        },
        transform: {
          suffixChoice: "c/x/z/ch",
          class: "tli"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "tli"
        }
      }, {
        id: "root-stock-patientive-hua-destockal",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.4.2",
        operation: "hua-destockal-stock-to-patientive",
        requires: {
          sourceCore: "hua destockal stock"
        },
        transform: {
          sourceClass: "stock-based",
          suffixChoice: "source-conditioned"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "tli"
        }
      }, {
        id: "root-stock-patientive-ihui-ahui-destockal",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.4.3",
        operation: "ihui-ahui-destockal-stock-to-patientive",
        requires: {
          sourceCore: "i-hui/a-hui destockal source"
        },
        transform: {
          sourceClass: "stock-based",
          suffixChoice: "source-conditioned"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "tli"
        }
      }, {
        id: "root-stock-patientive-agentive-stock-meaning",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.4.4",
        operation: "stock-patientive-with-agentive-meaning-diagnostic",
        requires: {
          sourceCore: "certain intransitive destockal stock"
        },
        transform: {
          meaning: "can read agentively without changing route"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "semantic diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "multiple-patientive-derivation",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.5",
        operation: "preserve-multiple-patientive-procedures",
        requires: {
          sourceVerb: "one allowing multiple patientive procedures"
        },
        transform: {
          translation: "not used to merge outputs",
          procedure: "kept as route branch"
        },
        builds: {
          targetShell: "CNN",
          targetStatus: "multi-derivation diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "patientive-compound-embed",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.6",
        operation: "patientive-nounstem-as-compound-embed",
        requires: {
          sourceStem: "patientive nounstem",
          matrix: "nominal or verbal compound"
        },
        transform: {
          derivationalHistory: "controls shape and meaning"
        },
        builds: {
          targetShell: "CNN/CNV compound",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "patientive-nominal-compound-embed",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.6.1",
        operation: "patientive-nounstem-as-nominal-compound-embed",
        requires: {
          sourceStem: "patientive nounstem",
          matrix: "nominal compound matrix"
        },
        transform: {
          embed: "inside nominal compound",
          surfaceMeaning: "matrix-controlled"
        },
        builds: {
          targetShell: "compound CNN"
        }
      }, {
        id: "patientive-verbal-compound-embed",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.6.2",
        operation: "patientive-nounstem-as-verbal-compound-embed",
        requires: {
          sourceStem: "patientive nounstem",
          matrix: "verbal compound matrix"
        },
        transform: {
          embed: "inside verbal compound",
          valence: "matrix controls object slots"
        },
        builds: {
          targetShell: "CNV matrix with CNN embed"
        }
      }, {
        id: "patientive-incorporated-complement",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.7",
        operation: "patientive-as-incorporated-complement",
        requires: {
          sourceStem: "absolutive or possessive patientive nounstem",
          matrix: "object-complement matrix"
        },
        transform: {
          possessorPronoun: "may become mainline object"
        },
        builds: {
          targetShell: "CNV matrix with CNN complement",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "patientive-incorporated-complement-absolutive",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.7.1",
        operation: "absolutive-patientive-as-incorporated-complement",
        requires: {
          sourceStem: "absolutive patientive nounstem",
          matrix: "object-complement matrix"
        },
        transform: {
          sourceSubject: "may map to outside object by matrix function",
          complementSlot: "consumed inside matrix"
        },
        builds: {
          targetShell: "CNV matrix with CNN complement"
        }
      }, {
        id: "patientive-incorporated-complement-perception-matrix",
        broadLabel: "patientivo",
        family: "patientive-incorporated-complement",
        andrewsSection: "39.7.1.a",
        operation: "absolutive-patientive-complement-with-perception-matrix",
        requires: {
          sourceStem: "absolutive patientive nounstem",
          matrix: "perception verb matrix"
        },
        transform: {
          complement: "incorporated inside matrix",
          outsideObject: "licensed only by matrix role"
        },
        builds: {
          targetShell: "CNV matrix with CNN complement"
        }
      }, {
        id: "patientive-incorporated-complement-mentioned-matrix",
        broadLabel: "patientivo",
        family: "patientive-incorporated-complement",
        andrewsSection: "39.7.1.b",
        operation: "absolutive-patientive-complement-with-mentioned-matrix-family",
        requires: {
          sourceStem: "absolutive patientive nounstem",
          matrix: "Andrews-mentioned complement matrix"
        },
        transform: {
          complement: "inside matrix source",
          routeFamily: "kept source-gated"
        },
        builds: {
          targetShell: "CNV matrix with CNN complement"
        }
      }, {
        id: "patientive-incorporated-complement-desire-matrix",
        broadLabel: "patientivo",
        family: "patientive-incorporated-complement",
        andrewsSection: "39.7.1.c",
        operation: "absolutive-patientive-complement-with-desire-matrix",
        requires: {
          sourceStem: "absolutive patientive nounstem",
          matrix: "m-o/tla/tlani desire matrix"
        },
        transform: {
          complementSlot: "incorporated",
          matrixValence: "controls object behavior"
        },
        builds: {
          targetShell: "CNV matrix with CNN complement"
        }
      }, {
        id: "patientive-possessive-incorporated-complement",
        broadLabel: "patientivo",
        family: "patientive-incorporated-complement",
        andrewsSection: "39.7.2",
        operation: "possessive-patientive-as-incorporated-complement",
        requires: {
          sourceStem: "possessive-state patientive nounstem",
          matrix: "object-complement matrix"
        },
        transform: {
          possessorPronoun: "may be promoted by matrix",
          possessiveState: "retained in embedded source"
        },
        builds: {
          targetShell: "CNV matrix with possessive CNN complement"
        }
      }, {
        id: "patientive-possessive-complement-toca-matrix",
        broadLabel: "patientivo",
        family: "patientive-incorporated-complement",
        andrewsSection: "39.7.2.a",
        operation: "possessive-patientive-complement-with-toca-matrix",
        requires: {
          sourceStem: "possessive-state patientive nounstem",
          matrix: "m-o/toca consider matrix"
        },
        transform: {
          possessorPronoun: "matrix-controlled",
          complementRole: "incorporated complement"
        },
        builds: {
          targetShell: "CNV matrix with possessive CNN complement"
        }
      }, {
        id: "patientive-possessive-complement-desire-matrix",
        broadLabel: "patientivo",
        family: "patientive-incorporated-complement",
        andrewsSection: "39.7.2.b",
        operation: "possessive-patientive-complement-with-desire-matrix",
        requires: {
          sourceStem: "possessive-state patientive nounstem",
          matrix: "tla/tlani desire matrix"
        },
        transform: {
          possessorPronoun: "may become outside object by matrix",
          complementSlot: "inside matrix"
        },
        builds: {
          targetShell: "CNV matrix with possessive CNN complement"
        }
      }, {
        id: "patientive-incorporated-object",
        broadLabel: "patientivo",
        family: "patientive",
        andrewsSection: "39.8",
        operation: "patientive-as-incorporated-object",
        requires: {
          sourceStem: "patientive nounstem",
          matrix: "tlani/ihtlani/temoa family"
        },
        transform: {
          possessorPronoun: "becomes applicative object",
          matrixValence: "licenses inside and outside objects"
        },
        builds: {
          targetShell: "CNV matrix with incorporated CNN object",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "patientive-characteristic-property-embed-continuation",
        broadLabel: "patientivo",
        family: "characteristic-property",
        andrewsSection: "39.9",
        operation: "characteristic-property-patientive-as-incorporated-object-with-yo-t-omission",
        requires: {
          sourceStem: "characteristic-property patientive nounstem",
          matrix: "supported incorporated-object matrix"
        },
        transform: {
          yoTlMatrix: "may be omitted with full derived meaning",
          possessor: "may become outside object"
        },
        builds: {
          targetShell: "CNV matrix with incorporated CNN object",
          targetStatus: "source-gated continuation"
        }
      }]),
      "patientivo-pasivo": freezeNominalizationOperationalLayerOperations([{
        id: "passive-patientive",
        broadLabel: "patientivo-pasivo",
        family: "patientive",
        andrewsSection: "37.9",
        operation: "passive-core-to-patientive-nounstem",
        requires: {
          sourceCore: "passive VNC core"
        },
        transform: {
          objectMaterial: "only licensed source objects retained"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "passive patientive"
        }
      }]),
      "patientivo-impersonal": freezeNominalizationOperationalLayerOperations([{
        id: "impersonal-patientive",
        broadLabel: "patientivo-impersonal",
        family: "patientive",
        andrewsSection: "38.1",
        operation: "impersonal-core-to-patientive-nounstem",
        requires: {
          sourceCore: "impersonal VNC core"
        },
        transform: {
          passiveVsImpersonal: "not collapsed",
          projectiveWitness: "tla/ta by source"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "impersonal patientive"
        }
      }]),
      "patientivo-perfectivo": freezeNominalizationOperationalLayerOperations([{
        id: "perfective-patientive",
        broadLabel: "patientivo-perfectivo",
        family: "patientive",
        andrewsSection: "39.1",
        operation: "perfective-active-core-to-patientive",
        requires: {
          sourceCore: "perfective active verbstem"
        },
        transform: {
          analogy: "passive or impersonal"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "tli"
        }
      }]),
      "patientivo-imperfectivo": freezeNominalizationOperationalLayerOperations([{
        id: "imperfective-patientive",
        broadLabel: "patientivo-imperfectivo",
        family: "patientive",
        andrewsSection: "39.2",
        operation: "imperfective-active-stem-to-patientive",
        requires: {
          sourceCore: "imperfective active stem"
        },
        transform: {
          analogy: "passive or impersonal"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "ti"
        }
      }]),
      "patientivo-tronco": freezeNominalizationOperationalLayerOperations([{
        id: "root-stock-patientive",
        broadLabel: "patientivo-tronco",
        family: "patientive",
        andrewsSection: "39.4",
        operation: "root-or-stock-to-patientive",
        requires: {
          sourceCore: "destockal root or stock"
        },
        transform: {
          suffixChoice: "source-conditioned",
          exactVariant: "diagnostic until source fixed"
        },
        builds: {
          targetShell: "CNN",
          targetClass: "tli"
        }
      }]),
      instrumentivo: freezeNominalizationOperationalLayerOperations([{
        id: "instrumentive-absolutive",
        broadLabel: "instrumentivo",
        family: "instrumentive",
        andrewsSection: "36.6",
        operation: "impersonal-customary-source-to-absolutive-instrumentive",
        requires: {
          sourceVoice: "impersonal",
          sourceTense: "customary-present"
        },
        transform: {
          sourcePredicate: "becomes nounstem",
          participant: "no specific possessor available"
        },
        builds: {
          targetShell: "CNN",
          targetState: "absolutive",
          targetRole: "instrument/faculty/means"
        }
      }, {
        id: "instrumentive-possessive",
        broadLabel: "instrumentivo",
        family: "instrumentive",
        andrewsSection: "36.6",
        operation: "imperfect-active-source-to-possessive-instrumentive",
        requires: {
          sourceVoice: "active",
          sourceTense: "imperfect-indicative"
        },
        transform: {
          sourceSubject: "becomes possessor",
          reflexiveSource: "mainline becomes shuntline",
          importedSubject: "outer nonanimate 0-0"
        },
        builds: {
          targetShell: "CNN",
          targetState: "possessive",
          targetClass: "ti subclass 1-B"
        }
      }, {
        id: "instrumentive-cutting-tool",
        broadLabel: "instrumentivo",
        family: "instrumentive-example-operation",
        andrewsSection: "36.6.1",
        operation: "instrumentive-tool-from-cutting-source",
        requires: {
          sourcePredicate: "cutting-type source",
          sourceVoice: "impersonal/customary instrumentive source"
        },
        transform: {
          toolRole: "instrument rather than agent/patient",
          projectiveMaterial: "kept in source predicate where licensed"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "cutting instrument"
        }
      }, {
        id: "instrumentive-sleeping-means",
        broadLabel: "instrumentivo",
        family: "instrumentive-example-operation",
        andrewsSection: "36.6.2",
        operation: "instrumentive-means-or-faculty-from-intransitive-source",
        requires: {
          sourcePredicate: "means/faculty source",
          sourceValence: "intransitive or impersonalized source"
        },
        transform: {
          sourceSubject: "not copied as target subject",
          meansRole: "names means/faculty"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "means/faculty"
        }
      }, {
        id: "instrumentive-reflexive-curing-means",
        broadLabel: "instrumentivo",
        family: "instrumentive-example-operation",
        andrewsSection: "36.6.3",
        operation: "instrumentive-from-reflexive-curing-source",
        requires: {
          sourcePredicate: "reflexive curing-type source",
          reflexiveSource: "mainline reflexive present"
        },
        transform: {
          reflexiveSource: "routes through shuntline/possessive interpretation when required",
          participantRole: "instrument/means, not patientive"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "means of self-action"
        }
      }]),
      "calificativo-instrumentivo": freezeNominalizationOperationalLayerOperations([{
        id: "characteristic-property",
        broadLabel: "calificativo-instrumentivo",
        family: "characteristic-property",
        andrewsSection: "39.3",
        operation: "tla-yo-a-characteristic-property-to-cnn",
        requires: {
          sourceMatrix: "tla-yo-a abundant/characteristic source"
        },
        transform: {
          matrix: "yo-tl/yu-t realized after source fixed",
          embedMeaning: "kept separate from target function"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "quality/characteristic property"
        }
      }, {
        id: "organic-possession",
        broadLabel: "calificativo-instrumentivo",
        family: "characteristic-property",
        andrewsSection: "39.3.4",
        operation: "organic-possession-yo-matrix",
        requires: {
          sourceRelation: "organic or integral possession"
        },
        transform: {
          possessionType: "organic uses possessive-state yo matrix"
        },
        builds: {
          targetShell: "CNN",
          targetState: "possessive",
          targetRole: "organic characteristic"
        }
      }, {
        id: "characteristic-action-embed",
        broadLabel: "calificativo-instrumentivo",
        family: "characteristic-property",
        andrewsSection: "39.3.6",
        operation: "action-noun-as-characteristic-property-embed",
        requires: {
          sourceEmbed: "passive-action or active-action nounstem"
        },
        transform: {
          derivationalSequence: "multi-step and retained"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "characteristic property with action embed"
        }
      }, {
        id: "exceptional-adjectival-huei",
        broadLabel: "calificativo-instrumentivo",
        family: "adjectival-nnc",
        andrewsSection: "40.2.1",
        operation: "exceptional-adjectival-nnc-huei-type",
        requires: {
          sourceStem: "exceptional adjectival NNC source"
        },
        transform: {
          adjectiveFunction: "function use, not new formal adjective class",
          nounstem: "kept as CNN predicate"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "adjectival function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "exceptional-adjectival-nepapan",
        broadLabel: "calificativo-instrumentivo",
        family: "adjectival-nnc",
        andrewsSection: "40.2.2",
        operation: "exceptional-adjectival-nnc-nepapan-type",
        requires: {
          sourceStem: "exceptional adjectival NNC source"
        },
        transform: {
          relationalAffinity: "not flattened into ordinary adjective",
          nounstem: "kept as CNN"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "adjectival function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "anomalous-adjectival-ce-l",
        broadLabel: "calificativo-instrumentivo",
        family: "adjectival-nnc",
        andrewsSection: "40.2.3.a",
        operation: "anomalous-adjectival-nnc-ce-l-type",
        requires: {
          sourceStem: "ce-l anomalous source"
        },
        transform: {
          translation: "not route authority",
          numeralRelation: "diagnostic"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "adjectival function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "anomalous-adjectival-is",
        broadLabel: "calificativo-instrumentivo",
        family: "adjectival-nnc",
        andrewsSection: "40.2.3.b",
        operation: "anomalous-adjectival-nnc-is-type",
        requires: {
          sourceStem: "0-is anomalous source"
        },
        transform: {
          translation: "diagnostic only",
          sourceStem: "kept separate from lexical adjective"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "adjectival function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "vnc-predicate-as-adjective",
        broadLabel: "calificativo-instrumentivo",
        family: "adjectival-function",
        andrewsSection: "40.3.1",
        operation: "vnc-predicate-functions-as-adjective",
        requires: {
          sourceUnit: "CNV predicate",
          functionUse: "adjectival modifier or predicate adjective"
        },
        transform: {
          sourceShell: "kept CNV",
          adjectiveUse: "function layer only"
        },
        builds: {
          targetShell: "CNV function use",
          targetStatus: "adjectival function diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "nnc-predicate-as-adjective",
        broadLabel: "calificativo-instrumentivo",
        family: "adjectival-function",
        andrewsSection: "40.3.2",
        operation: "nnc-predicate-functions-as-adjective",
        requires: {
          sourceUnit: "CNN predicate",
          functionUse: "adjectival modifier or predicate adjective"
        },
        transform: {
          sourceShell: "kept CNN",
          adjectiveUse: "function layer only"
        },
        builds: {
          targetShell: "CNN function use",
          targetStatus: "adjectival function diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "patientive-passive-adjectival-function",
        broadLabel: "calificativo-instrumentivo",
        family: "patientive-adjectival-function",
        andrewsSection: "40.4.1.a",
        operation: "passive-patientive-nounstem-functions-as-adjective",
        requires: {
          sourceStem: "passive patientive nounstem"
        },
        transform: {
          patientiveRoute: "retained as source",
          adjectiveFunction: "added without changing source family"
        },
        builds: {
          targetShell: "CNN adjectival function"
        }
      }, {
        id: "patientive-impersonal-adjectival-function",
        broadLabel: "calificativo-instrumentivo",
        family: "patientive-adjectival-function",
        andrewsSection: "40.4.1.b",
        operation: "impersonal-patientive-nounstem-functions-as-adjective",
        requires: {
          sourceStem: "impersonal patientive nounstem"
        },
        transform: {
          patientiveRoute: "retained as source",
          adjectiveFunction: "added without changing source family"
        },
        builds: {
          targetShell: "CNN adjectival function"
        }
      }, {
        id: "patientive-perfective-adjectival-function",
        broadLabel: "calificativo-instrumentivo",
        family: "patientive-adjectival-function",
        andrewsSection: "40.4.1.c",
        operation: "perfective-patientive-nounstem-functions-as-adjective",
        requires: {
          sourceStem: "perfective patientive nounstem"
        },
        transform: {
          patientiveRoute: "retained as source",
          adjectiveFunction: "added without changing source family"
        },
        builds: {
          targetShell: "CNN adjectival function"
        }
      }, {
        id: "patientive-root-stock-adjectival-function",
        broadLabel: "calificativo-instrumentivo",
        family: "patientive-adjectival-function",
        andrewsSection: "40.4.1.d",
        operation: "root-stock-patientive-nounstem-functions-as-adjective",
        requires: {
          sourceStem: "root/stock patientive nounstem"
        },
        transform: {
          patientiveRoute: "retained as source",
          adjectiveFunction: "added without changing source family"
        },
        builds: {
          targetShell: "CNN adjectival function"
        }
      }, {
        id: "potential-patient-adjectival-function",
        broadLabel: "calificativo-instrumentivo",
        family: "patientive-adjectival-function",
        andrewsSection: "40.4.2",
        operation: "potential-patient-nounstem-functions-as-adjective",
        requires: {
          sourceStem: "potential-patient derived nounstem"
        },
        transform: {
          potentialPatient: "kept distinct from active-action noun",
          adjectiveFunction: "function layer"
        },
        builds: {
          targetShell: "CNN adjectival function"
        }
      }, {
        id: "customary-agentive-predicate-adjective",
        broadLabel: "calificativo-instrumentivo",
        family: "agentive-adjectival-function",
        andrewsSection: "40.6",
        operation: "customary-present-agentive-predicate-functions-as-adjective",
        requires: {
          sourceStem: "customary-present agentive NNC predicate"
        },
        transform: {
          agentiveSource: "retained",
          adjectiveFunction: "function layer"
        },
        builds: {
          targetShell: "CNN adjectival function"
        }
      }, {
        id: "customary-patientive-predicate-adjective",
        broadLabel: "calificativo-instrumentivo",
        family: "patientive-adjectival-function",
        andrewsSection: "40.7",
        operation: "customary-present-patientive-predicate-functions-as-adjective",
        requires: {
          sourceStem: "customary-present patientive NNC predicate"
        },
        transform: {
          patientiveSource: "retained",
          adjectiveFunction: "function layer"
        },
        builds: {
          targetShell: "CNN adjectival function"
        }
      }, {
        id: "preterit-agentive-predicate-adjective",
        broadLabel: "calificativo-instrumentivo",
        family: "agentive-adjectival-function",
        andrewsSection: "40.8",
        operation: "preterit-agentive-predicate-functions-as-adjective",
        requires: {
          sourceStem: "preterit-agentive NNC predicate"
        },
        transform: {
          numberPosition: "retained by source subclass",
          adjectiveFunction: "function layer"
        },
        builds: {
          targetShell: "CNN adjectival function"
        }
      }, {
        id: "preterit-agentive-adjective-class-branch",
        broadLabel: "calificativo-instrumentivo",
        family: "agentive-adjectival-function",
        andrewsSection: "40.8.1",
        operation: "preterit-agentive-adjectival-class-branch",
        requires: {
          sourceStem: "preterit-agentive including passive-source class"
        },
        transform: {
          class: "controls adjectival behavior",
          sourceFamily: "not collapsed by translation"
        },
        builds: {
          targetShell: "CNN adjectival function"
        }
      }, {
        id: "preterit-agentive-adjective-number-position-branch",
        broadLabel: "calificativo-instrumentivo",
        family: "agentive-adjectival-function",
        andrewsSection: "40.8.2-40.8.4",
        operation: "preterit-agentive-adjectival-number-position-branches",
        requires: {
          sourceStem: "preterit-agentive NNC",
          numberPosition: "Andrews subclass branch"
        },
        transform: {
          singularCommonNumber: "source-conditioned",
          subjectPronoun: "retained structurally"
        },
        builds: {
          targetShell: "CNN adjectival function"
        }
      }, {
        id: "preterit-agentive-compound-stem-adjective",
        broadLabel: "calificativo-instrumentivo",
        family: "agentive-adjectival-function",
        andrewsSection: "40.8.5",
        operation: "compound-stemmed-preterit-agentive-functions-as-adjective",
        requires: {
          sourceStem: "compound-stemmed preterit-agentive"
        },
        transform: {
          compoundSource: "kept explicit",
          adjectiveFunction: "function layer"
        },
        builds: {
          targetShell: "CNN adjectival function"
        }
      }, {
        id: "obsolete-preterit-predicate-adjective",
        broadLabel: "calificativo-instrumentivo",
        family: "obsolete-preterit-adjectival",
        andrewsSection: "40.9",
        operation: "obsolete-preterit-vnc-predicate-functions-as-adjective",
        requires: {
          sourceUnit: "obsolete preterit VNC predicate"
        },
        transform: {
          obsoleteSource: "diagnostic source, not Nawat evidence",
          adjectiveFunction: "function layer"
        },
        builds: {
          targetShell: "CNV/CNN adjectival function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "synonymous-adjectival-hui-pair",
        broadLabel: "calificativo-instrumentivo",
        family: "synonymous-adjectival-nnc",
        andrewsSection: "40.10.1",
        operation: "synonymous-adjectival-pair-from-hui-destockal-source",
        requires: {
          sourceStem: "intransitive destockal hui source"
        },
        transform: {
          pairMembers: "kept as sibling routes",
          synonymy: "not used to merge source histories"
        },
        builds: {
          targetShell: "CNN adjectival pair"
        }
      }, {
        id: "synonymous-adjectival-hua-pair",
        broadLabel: "calificativo-instrumentivo",
        family: "synonymous-adjectival-nnc",
        andrewsSection: "40.10.2",
        operation: "synonymous-adjectival-pair-from-hua-destockal-source",
        requires: {
          sourceStem: "intransitive destockal hua source"
        },
        transform: {
          pairMembers: "kept as sibling routes",
          synonymy: "not used to merge source histories"
        },
        builds: {
          targetShell: "CNN adjectival pair"
        }
      }, {
        id: "synonymous-adjectival-ihui-ahui-pair",
        broadLabel: "calificativo-instrumentivo",
        family: "synonymous-adjectival-nnc",
        andrewsSection: "40.10.3",
        operation: "synonymous-adjectival-pair-from-ihui-ahui-destockal-source",
        requires: {
          sourceStem: "i-hui/a-hui destockal source"
        },
        transform: {
          pairMembers: "kept as sibling routes",
          synonymy: "not used to merge source histories"
        },
        builds: {
          targetShell: "CNN adjectival pair"
        }
      }, {
        id: "synonymous-adjectival-triplet",
        broadLabel: "calificativo-instrumentivo",
        family: "synonymous-adjectival-nnc",
        andrewsSection: "40.11",
        operation: "synonymous-adjectival-triplet-keeps-three-source-histories",
        requires: {
          sourceSet: "Andrews synonym triplet"
        },
        transform: {
          tripletMembers: "not collapsed by gloss",
          sourceHistory: "tracked per member"
        },
        builds: {
          targetShell: "CNN adjectival triplet"
        }
      }, {
        id: "intensified-adjectival-result-route",
        broadLabel: "calificativo-instrumentivo",
        family: "intensified-adjectival-nnc",
        andrewsSection: "41.1.1",
        operation: "intensified-adjectival-result-from-nominalization-or-deverbalization",
        requires: {
          sourceRoute: "nominalization or deverbalization source"
        },
        transform: {
          sourceRoute: "kept as history",
          intensification: "added as compound/function layer"
        },
        builds: {
          targetShell: "compound CNN adjectival"
        }
      }, {
        id: "intensified-adjectival-compound-template",
        broadLabel: "calificativo-instrumentivo",
        family: "intensified-adjectival-nnc",
        andrewsSection: "41.1.2",
        operation: "intensified-adjectival-compound-template",
        requires: {
          sourceStem: "adjectival source",
          matrix: "intensifying compound matrix"
        },
        transform: {
          embed: "source adjective fills embed",
          matrix: "intensifier controls final compound"
        },
        builds: {
          targetShell: "compound CNN adjectival"
        }
      }, {
        id: "intensified-adjectival-ti-embed",
        broadLabel: "calificativo-instrumentivo",
        family: "intensified-adjectival-nnc",
        andrewsSection: "41.1.2.a",
        operation: "intensified-adjectival-with-ti-0-kind-embed",
        requires: {
          sourceEmbed: "ti-0 adjectival kind embed"
        },
        transform: {
          embed: "kept distinct from matrix",
          intensification: "compound layer"
        },
        builds: {
          targetShell: "compound CNN adjectival"
        }
      }, {
        id: "intensified-adjectival-root-preterit-agentive-embed",
        broadLabel: "calificativo-instrumentivo",
        family: "intensified-adjectival-nnc",
        andrewsSection: "41.1.2.b",
        operation: "intensified-adjectival-with-root-preterit-agentive-embed",
        requires: {
          sourceEmbed: "root adjectival preterit-agentive"
        },
        transform: {
          preteritAgentiveHistory: "retained",
          matrix: "intensifying compound matrix"
        },
        builds: {
          targetShell: "compound CNN adjectival"
        }
      }, {
        id: "intensified-adjectival-general-use-preterit-agentive-embed",
        broadLabel: "calificativo-instrumentivo",
        family: "intensified-adjectival-nnc",
        andrewsSection: "41.1.2.c",
        operation: "intensified-adjectival-with-general-use-preterit-agentive-embed",
        requires: {
          sourceEmbed: "general-use adjectival preterit-agentive"
        },
        transform: {
          generalUseStem: "kept explicit",
          matrix: "intensifying compound matrix"
        },
        builds: {
          targetShell: "compound CNN adjectival"
        }
      }, {
        id: "intensified-adjectival-reduplication-embed",
        broadLabel: "calificativo-instrumentivo",
        family: "intensified-adjectival-nnc",
        andrewsSection: "41.1.2.d",
        operation: "intensified-adjectival-reduplication-embed",
        requires: {
          sourceEmbed: "reduplicated adjectival source"
        },
        transform: {
          reduplication: "source operation before matrix",
          matrix: "intensifying compound matrix"
        },
        builds: {
          targetShell: "compound CNN adjectival"
        }
      }, {
        id: "intensified-adjectival-internal-expansion-matrix",
        broadLabel: "calificativo-instrumentivo",
        family: "intensified-adjectival-nnc",
        andrewsSection: "41.1.2.e",
        operation: "intensified-adjectival-matrix-internal-expansion",
        requires: {
          matrix: "augmented/internal expansion matrix"
        },
        transform: {
          matrixExpansion: "kept in matrix, not source embed",
          soundPattern: "diagnostic/source-conditioned"
        },
        builds: {
          targetShell: "compound CNN adjectival"
        }
      }, {
        id: "compound-verbstem-nominal-embed-adjectival",
        broadLabel: "calificativo-instrumentivo",
        family: "compound-verbstem-adjectival-nnc",
        andrewsSection: "41.2",
        operation: "adjectival-nounstem-from-compound-verbstem-with-nominal-embed",
        requires: {
          sourceUnit: "compound verbstem with nominal embed"
        },
        transform: {
          nominalEmbed: "kept inside source compound",
          adjectivalTarget: "CNN function/output"
        },
        builds: {
          targetShell: "CNN adjectival nounstem"
        }
      }, {
        id: "compound-verbstem-incorporated-adverb-adjectival",
        broadLabel: "calificativo-instrumentivo",
        family: "compound-verbstem-adjectival-nnc",
        andrewsSection: "41.2.1",
        operation: "adjectival-nounstem-from-incorporated-adverb-compound",
        requires: {
          sourceCompound: "incorporated-adverb compound"
        },
        transform: {
          adverbEmbed: "source embed",
          matrix: "controls target adjectival role"
        },
        builds: {
          targetShell: "CNN adjectival nounstem"
        }
      }, {
        id: "compound-verbstem-incorporated-complement-adjectival",
        broadLabel: "calificativo-instrumentivo",
        family: "compound-verbstem-adjectival-nnc",
        andrewsSection: "41.2.2",
        operation: "adjectival-nounstem-from-incorporated-complement-compound",
        requires: {
          sourceCompound: "incorporated-complement compound"
        },
        transform: {
          complementEmbed: "source embed",
          matrix: "controls target adjectival role"
        },
        builds: {
          targetShell: "CNN adjectival nounstem"
        }
      }, {
        id: "compound-verbstem-incorporated-object-adjectival",
        broadLabel: "calificativo-instrumentivo",
        family: "compound-verbstem-adjectival-nnc",
        andrewsSection: "41.2.3",
        operation: "adjectival-nounstem-from-incorporated-object-compound",
        requires: {
          sourceCompound: "incorporated-object compound"
        },
        transform: {
          objectEmbed: "source embed",
          matrix: "controls target adjectival role"
        },
        builds: {
          targetShell: "CNN adjectival nounstem"
        }
      }, {
        id: "denominal-verbstem-compound-nounstem-adjectival",
        broadLabel: "calificativo-instrumentivo",
        family: "compound-verbstem-adjectival-nnc",
        andrewsSection: "41.3",
        operation: "adjectival-nnc-from-denominal-verbstem-from-compound-nounstem",
        requires: {
          sourceRoute: "CNN compound nounstem -> CNV denominal verbstem"
        },
        transform: {
          routeHistory: "CNN->CNV->CNN retained",
          adjectiveFunction: "target function layer"
        },
        builds: {
          targetShell: "CNN adjectival nounstem"
        }
      }, {
        id: "adjectival-nounstem-compound-embed",
        broadLabel: "calificativo-instrumentivo",
        family: "adjectival-compound-continuation",
        andrewsSection: "41.4",
        operation: "adjectival-nounstem-as-embed-in-compound-nnc",
        requires: {
          sourceStem: "adjectival nounstem",
          matrix: "compound NNC matrix"
        },
        transform: {
          adjectiveStem: "embed",
          matrix: "controls compound output"
        },
        builds: {
          targetShell: "compound CNN"
        }
      }]),
      "locativo-temporal": freezeNominalizationOperationalLayerOperations([{
        id: "imperfective-locative-temporal",
        broadLabel: "locativo-temporal",
        family: "locative-temporal",
        andrewsSection: "46",
        operation: "imperfect-source-to-locative-temporal-nounstem",
        requires: {
          sourceTense: "imperfect",
          sourceUnit: "VNC predicate or core"
        },
        transform: {
          sourcePredicate: "becomes locative/temporal nominal stem",
          connector: "locative n after source frame"
        },
        builds: {
          targetShell: "CNN",
          targetRole: "place/time of action"
        }
      }, {
        id: "adverbialized-vnc-first-degree",
        broadLabel: "locativo-temporal",
        family: "adverbial-nuclear-clause",
        andrewsSection: "44.3",
        operation: "vnc-functions-as-adverbial-nuclear-clause",
        requires: {
          sourceUnit: "CNV",
          functionUse: "adverbial"
        },
        transform: {
          sourceShell: "kept CNV",
          adverbializationDegree: "source-dependent"
        },
        builds: {
          targetShell: "CNV adverbial function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "adverbialized-nnc-first-degree",
        broadLabel: "locativo-temporal",
        family: "adverbial-nuclear-clause",
        andrewsSection: "44.4.1",
        operation: "nnc-first-degree-adverbialization",
        requires: {
          sourceUnit: "CNN",
          adverbializationDegree: "first degree"
        },
        transform: {
          sourceNnc: "kept as NNC",
          adverbialFunction: "function layer only"
        },
        builds: {
          targetShell: "CNN adverbial function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "adverbialized-nnc-second-degree-absolutive",
        broadLabel: "locativo-temporal",
        family: "adverbial-nuclear-clause",
        andrewsSection: "44.4.2",
        operation: "nnc-second-degree-adverbialization-as-absolutive-state",
        requires: {
          sourceUnit: "CNN",
          targetState: "absolutive"
        },
        transform: {
          sourceNnc: "adverbialized",
          state: "absolutive required"
        },
        builds: {
          targetShell: "CNN adverbial function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "particle-looking-nnc-boundary",
        broadLabel: "locativo-temporal",
        family: "adverbial-nuclear-clause",
        andrewsSection: "44.5",
        operation: "classify-particle-looking-nnc-as-nnc-not-particle",
        requires: {
          sourceUnit: "particle-looking CNN"
        },
        transform: {
          particleAppearance: "diagnostic only",
          shell: "kept CNN"
        },
        builds: {
          targetShell: "CNN adverbial/particle-looking boundary"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "adverbialized-absolutive-nnc-examples",
        broadLabel: "locativo-temporal",
        family: "adverbial-nuclear-clause",
        andrewsSection: "44.6",
        operation: "absolutive-state-nnc-functions-adverbially",
        requires: {
          sourceUnit: "absolutive-state CNN"
        },
        transform: {
          sourceState: "absolutive",
          adverbialRole: "function layer"
        },
        builds: {
          targetShell: "CNN adverbial function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "adverbialized-preterit-agentive-nnc",
        broadLabel: "locativo-temporal",
        family: "adverbial-nuclear-clause",
        andrewsSection: "44.7",
        operation: "preterit-agentive-nnc-functions-adverbially",
        requires: {
          sourceStem: "preterit-agentive NNC"
        },
        transform: {
          preteritAgentiveHistory: "retained",
          adverbialFunction: "function layer"
        },
        builds: {
          targetShell: "CNN adverbial function"
        }
      }, {
        id: "possessive-state-adverbialized-nnc",
        broadLabel: "locativo-temporal",
        family: "adverbial-nuclear-clause",
        andrewsSection: "44.8",
        operation: "possessive-state-nnc-functions-adverbially",
        requires: {
          sourceUnit: "possessive-state CNN"
        },
        transform: {
          possessiveState: "retained",
          adverbialFunction: "function layer"
        },
        builds: {
          targetShell: "CNN adverbial function"
        }
      }, {
        id: "possessive-adverbial-iyo-a-source",
        broadLabel: "locativo-temporal",
        family: "adverbial-nuclear-clause",
        andrewsSection: "44.8.1",
        operation: "possessive-state-adverbial-built-with-iyo-a-source",
        requires: {
          sourceStem: "iyo-a possessive-state source"
        },
        transform: {
          sourceHistory: "retained",
          adverbialFunction: "function layer"
        },
        builds: {
          targetShell: "CNN adverbial function"
        }
      }, {
        id: "possessive-adverbial-nohmati-conjectural",
        broadLabel: "locativo-temporal",
        family: "adverbial-nuclear-clause",
        andrewsSection: "44.8.2",
        operation: "conjectural-nohmati-possessive-adverbial-analysis",
        requires: {
          sourceStem: "noh-mati analysis source"
        },
        transform: {
          conjecture: "diagnostic source boundary",
          route: "not generated without source confirmation"
        },
        builds: {
          targetShell: "CNN adverbial diagnostic"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "possessive-adverbial-perfective-patientive-source",
        broadLabel: "locativo-temporal",
        family: "adverbial-nuclear-clause",
        andrewsSection: "44.8.2.a",
        operation: "possessive-adverbial-from-perfective-patientive-source",
        requires: {
          sourceStem: "perfective patientive source"
        },
        transform: {
          patientiveHistory: "retained",
          adverbialFunction: "function layer"
        },
        builds: {
          targetShell: "CNN adverbial function"
        }
      }, {
        id: "possessive-adverbial-active-action-source",
        broadLabel: "locativo-temporal",
        family: "adverbial-nuclear-clause",
        andrewsSection: "44.8.2.b",
        operation: "possessive-adverbial-from-active-action-source",
        requires: {
          sourceStem: "active-action source"
        },
        transform: {
          activeActionHistory: "retained",
          adverbialFunction: "function layer"
        },
        builds: {
          targetShell: "CNN adverbial function"
        }
      }, {
        id: "relational-option-one-huan-company",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.1",
        operation: "relational-nounstem-option-one-company",
        requires: {
          sourceStem: "huan relational nounstem",
          usageOption: "option one only"
        },
        transform: {
          relationalRole: "company/with",
          usageOption: "not generalized to all relationals"
        },
        builds: {
          targetShell: "CNN relational function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-option-one-tloc-proximity",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.2",
        operation: "relational-nounstem-option-one-proximity",
        requires: {
          sourceStem: "tloc relational nounstem",
          usageOption: "option one only"
        },
        transform: {
          relationalRole: "side/proximity",
          usageOption: "not generalized to all relationals"
        },
        builds: {
          targetShell: "CNN relational function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-option-one-pal-sake",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.3",
        operation: "relational-nounstem-option-one-sake-favor-help",
        requires: {
          sourceStem: "pal relational nounstem",
          usageOption: "option one only"
        },
        transform: {
          relationalRole: "grace/favor/sake/help",
          usageOption: "not generalized to all relationals"
        },
        builds: {
          targetShell: "CNN relational function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-means-purpose-reason-time",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.4",
        operation: "relational-nounstem-means-purpose-reason-time-family",
        requires: {
          sourceStem: "relational option-one family",
          semanticRole: "means/purpose/reason/cause/time"
        },
        transform: {
          semanticRole: "diagnostic selector",
          nounstem: "kept relational CNN"
        },
        builds: {
          targetShell: "CNN relational function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-means-function",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.4.a",
        operation: "relational-nounstem-means-function",
        requires: {
          sourceStem: "means relational source"
        },
        transform: {
          role: "means",
          usageOption: "option one"
        },
        builds: {
          targetShell: "CNN relational function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-purpose-function",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.4.b",
        operation: "relational-nounstem-purpose-function",
        requires: {
          sourceStem: "purpose relational source"
        },
        transform: {
          role: "purpose",
          usageOption: "option one"
        },
        builds: {
          targetShell: "CNN relational function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-reason-function",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.4.c",
        operation: "relational-nounstem-reason-function",
        requires: {
          sourceStem: "reason/cause relational source"
        },
        transform: {
          role: "reason/cause",
          usageOption: "option one"
        },
        builds: {
          targetShell: "CNN relational function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-time-function",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.4.d",
        operation: "relational-nounstem-time-function",
        requires: {
          sourceStem: "time relational source"
        },
        transform: {
          role: "time",
          usageOption: "option one"
        },
        builds: {
          targetShell: "CNN relational function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-special-call-function",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.4.e",
        operation: "relational-nounstem-special-call-function",
        requires: {
          sourceStem: "special relational source",
          semanticRole: "special among/call use"
        },
        transform: {
          role: "special relation",
          usageOption: "option one"
        },
        builds: {
          targetShell: "CNN relational function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-preceding-numeral-quantitive-equivalent",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.4.i",
        operation: "relational-preceding-numeral-quantitive-equivalent-function",
        requires: {
          sourceStem: "preceding numeral/quantitive source"
        },
        transform: {
          quantitiveEquivalent: "function metadata",
          relationalStem: "kept as CNN"
        },
        builds: {
          targetShell: "CNN relational/adjectival function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-adjectival-supplementary-possessor",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.4.i.ii",
        operation: "relational-adjectival-supplementary-possessor-function",
        requires: {
          sourceStem: "relational/adjectival source",
          possessor: "supplementary possessor context"
        },
        transform: {
          possessorScope: "supplementary function",
          relationalStem: "not flattened into adjective"
        },
        builds: {
          targetShell: "CNN relational/adjectival function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-cooperating-adjectival-descriptive",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.4.i.iii",
        operation: "relational-cooperation-with-adjectival-descriptive-function",
        requires: {
          sourceStem: "relational source",
          modifierContext: "cooperating adjectival descriptive"
        },
        transform: {
          cooperation: "syntax/function layer",
          relationalStem: "kept distinct"
        },
        builds: {
          targetShell: "CNN relational/adjectival function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-preceding-adjectival-size-shape",
        broadLabel: "locativo-temporal",
        family: "relational-nnc",
        andrewsSection: "45.4.4.i.iv",
        operation: "relational-preceding-adjectival-size-length-shape-function",
        requires: {
          sourceStem: "preceding adjectival size/length/shape source"
        },
        transform: {
          adjectivalMeasure: "function metadata",
          relationalStem: "kept as CNN"
        },
        builds: {
          targetShell: "CNN relational/adjectival function"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "locative-n-tli-option-two",
        broadLabel: "locativo-temporal",
        family: "locative-n-matrix",
        andrewsSection: "46.2",
        operation: "locative-n-tli-nounstem-option-two",
        requires: {
          matrix: "(-n)-tli",
          usageOption: "option two locative"
        },
        transform: {
          locativeN: "matrix nounstem",
          embed: "source-dependent"
        },
        builds: {
          targetShell: "CNN locative relational"
        }
      }, {
        id: "locative-n-tli-with-ca-tl-embed",
        broadLabel: "locativo-temporal",
        family: "locative-n-matrix",
        andrewsSection: "46.3",
        operation: "locative-n-tli-matrix-with-ca-tl-embed",
        requires: {
          matrix: "(-n)-tli",
          embed: "(ca)-tl source"
        },
        transform: {
          embed: "precedes locative matrix",
          locativeN: "matrix element"
        },
        builds: {
          targetShell: "compound CNN locative"
        }
      }, {
        id: "locative-active-action-ca-tl-embed",
        broadLabel: "locativo-temporal",
        family: "locative-n-matrix",
        andrewsSection: "46.3.1.b",
        operation: "active-action-ca-tl-embed-plus-locative-n-matrix",
        requires: {
          sourceStem: "active-action general-use stem",
          matrix: "locative (-n)-tli"
        },
        transform: {
          activeAction: "embed",
          locative: "matrix n",
          connector: "outer zero when adverbialized"
        },
        builds: {
          targetShell: "compound CNN/adverbial locative"
        }
      }, {
        id: "locative-n-tli-ca-n-result-absent-component",
        broadLabel: "locativo-temporal",
        family: "locative-n-matrix",
        andrewsSection: "46.3.2.a",
        operation: "locative-n-tli-formation-with-absent-component",
        requires: {
          sourceComponent: "absent component in ca-n formation"
        },
        transform: {
          caN: "resultant locative compound",
          missingComponent: "diagnostic source boundary"
        },
        builds: {
          targetShell: "compound CNN locative"
        }
      }, {
        id: "locative-n-tli-ca-n-result-present-component",
        broadLabel: "locativo-temporal",
        family: "locative-n-matrix",
        andrewsSection: "46.3.2.b",
        operation: "locative-n-tli-formation-with-present-component",
        requires: {
          sourceComponent: "present represented component"
        },
        transform: {
          caN: "resultant locative compound",
          component: "kept visible as source"
        },
        builds: {
          targetShell: "compound CNN locative"
        }
      }, {
        id: "imperfect-active-locative-result",
        broadLabel: "locativo-temporal",
        family: "locative-imperfect-source",
        andrewsSection: "46.4.1",
        operation: "active-imperfect-predicate-to-resultant-locative",
        requires: {
          sourceVoice: "active",
          sourceTense: "imperfect"
        },
        transform: {
          sourcePredicate: "nominalized as locative embed",
          locativeMatrix: "(-n)-tli"
        },
        builds: {
          targetShell: "compound CNN locative"
        }
      }, {
        id: "imperfect-passive-locative-result",
        broadLabel: "locativo-temporal",
        family: "locative-imperfect-source",
        andrewsSection: "46.4.2",
        operation: "passive-imperfect-predicate-to-resultant-locative",
        requires: {
          sourceVoice: "passive",
          sourceTense: "imperfect"
        },
        transform: {
          sourcePredicate: "nominalized as locative embed",
          passiveHistory: "retained"
        },
        builds: {
          targetShell: "compound CNN locative"
        }
      }, {
        id: "imperfect-impersonal-locative-result",
        broadLabel: "locativo-temporal",
        family: "locative-imperfect-source",
        andrewsSection: "46.4.3",
        operation: "impersonal-imperfect-predicate-to-resultant-locative",
        requires: {
          sourceVoice: "impersonal",
          sourceTense: "imperfect"
        },
        transform: {
          sourcePredicate: "nominalized as locative embed",
          impersonalHistory: "retained"
        },
        builds: {
          targetShell: "compound CNN locative"
        }
      }, {
        id: "locative-yii-n-tli-matrix",
        broadLabel: "locativo-temporal",
        family: "relational-locative-matrix",
        andrewsSection: "46.5",
        operation: "locative-yii-n-tli-matrix-operation",
        requires: {
          matrix: "(-yii-n)-tli"
        },
        transform: {
          relationalMatrix: "source-specific locative",
          embed: "source-gated"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "locative-tlah-tli-matrix",
        broadLabel: "locativo-temporal",
        family: "relational-locative-matrix",
        andrewsSection: "46.6",
        operation: "locative-tlah-tli-matrix-operation",
        requires: {
          matrix: "(-tlah)-tli"
        },
        transform: {
          relationalMatrix: "source-specific locative",
          embed: "source-gated"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "locative-co-c-tli-matrix",
        broadLabel: "locativo-temporal",
        family: "relational-locative-matrix",
        andrewsSection: "46.7",
        operation: "locative-co-c-tli-matrix-operation",
        requires: {
          matrix: "(-co)-0 or (-c)-tli"
        },
        transform: {
          relationalMatrix: "source-specific locative",
          spelling: "structural Classical only before Nawat conversion"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "seeming-compound-matrix-relational-overview",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8",
        operation: "seeming-compound-matrix-relational-nounstem-family",
        requires: {
          sourceStem: "relational nounstem with seeming compound matrix behavior"
        },
        transform: {
          matrixAppearance: "diagnostic, not flattened",
          embed: "simple or compound source retained"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "nahuac-simple-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.1.a",
        operation: "nahua-c-relational-with-simple-stemmed-embed",
        requires: {
          matrix: "nahua-c",
          embed: "simple-stemmed source"
        },
        transform: {
          relationalRole: "place/audible distance",
          embed: "kept simple"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "nahuac-compound-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.1.b",
        operation: "nahua-c-relational-with-compound-stemmed-embed",
        requires: {
          matrix: "nahua-c",
          embed: "compound-stemmed source"
        },
        transform: {
          relationalRole: "place/audible distance",
          compoundEmbed: "kept explicit"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "ihtic-simple-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.2.a",
        operation: "ihti-c-relational-with-simple-stemmed-embed",
        requires: {
          matrix: "ihti-c/ihte-c",
          embed: "simple-stemmed source"
        },
        transform: {
          relationalRole: "interior/stomach/location",
          embed: "kept simple"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "ihtic-compound-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.2.b",
        operation: "ihti-c-relational-with-compound-stemmed-embed",
        requires: {
          matrix: "ihti-c/ihte-c",
          embed: "compound-stemmed source"
        },
        transform: {
          relationalRole: "interior/stomach/location",
          compoundEmbed: "kept explicit"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "ixco-simple-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.3.a",
        operation: "ix-co-relational-with-simple-stemmed-embed",
        requires: {
          matrix: "ix-co",
          embed: "simple-stemmed source"
        },
        transform: {
          relationalRole: "face/eyes/visual presence",
          embed: "kept simple"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "ixco-compound-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.3.b",
        operation: "ix-co-relational-with-compound-stemmed-embed",
        requires: {
          matrix: "ix-co",
          embed: "compound-stemmed source"
        },
        transform: {
          relationalRole: "face/eyes/visual presence",
          compoundEmbed: "kept explicit"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "tepotzco-simple-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.4.a",
        operation: "tepotz-co-relational-with-simple-stemmed-embed",
        requires: {
          matrix: "tepotz-co",
          embed: "simple-stemmed source"
        },
        transform: {
          relationalRole: "back/rear",
          embed: "kept simple"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "tepotzco-compound-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.4.b",
        operation: "tepotz-co-relational-with-compound-stemmed-embed",
        requires: {
          matrix: "tepotz-co",
          embed: "compound-stemmed source"
        },
        transform: {
          relationalRole: "back/rear",
          compoundEmbed: "kept explicit"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "tzonco-simple-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.5.a",
        operation: "tzon-co-relational-with-simple-stemmed-embed",
        requires: {
          matrix: "tzon-co",
          embed: "simple-stemmed source"
        },
        transform: {
          relationalRole: "hair/top/upper part",
          embed: "kept simple"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "tzonco-compound-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.5.b",
        operation: "tzon-co-relational-with-compound-stemmed-embed",
        requires: {
          matrix: "tzon-co",
          embed: "compound-stemmed source"
        },
        transform: {
          relationalRole: "hair/top/upper part",
          compoundEmbed: "kept explicit"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "yolloco-simple-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.6.a",
        operation: "yol-lo-h-co-relational-with-simple-stemmed-embed",
        requires: {
          matrix: "yol-lo-h-co",
          embed: "simple-stemmed source"
        },
        transform: {
          relationalRole: "heart/middle",
          embed: "kept simple"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "yolloco-compound-embed-relational",
        broadLabel: "locativo-temporal",
        family: "seeming-compound-relational",
        andrewsSection: "46.8.6.b",
        operation: "yol-lo-h-co-relational-with-compound-stemmed-embed",
        requires: {
          matrix: "yol-lo-h-co",
          embed: "compound-stemmed source"
        },
        transform: {
          relationalRole: "heart/middle",
          compoundEmbed: "kept explicit"
        },
        builds: {
          targetShell: "CNN relational locative"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-ca-zero-nounstem",
        broadLabel: "locativo-temporal",
        family: "relational-locative-matrix",
        andrewsSection: "46.9",
        operation: "relational-ca-zero-nounstem-operation",
        requires: {
          matrix: "(-ca)-0"
        },
        transform: {
          relationalMatrix: "source-specific",
          outputRole: "relational function"
        },
        builds: {
          targetShell: "CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "directional-pa-zero-nounstem",
        broadLabel: "locativo-temporal",
        family: "relational-locative-matrix",
        andrewsSection: "46.10",
        operation: "directional-pa-zero-nounstem-operation",
        requires: {
          matrix: "(-pa)-0",
          role: "directional"
        },
        transform: {
          directionalMatrix: "source-specific",
          outputRole: "directional function"
        },
        builds: {
          targetShell: "CNN directional relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "frequency-pa-zero-nounstem",
        broadLabel: "locativo-temporal",
        family: "relational-locative-matrix",
        andrewsSection: "46.11",
        operation: "frequency-pa-zero-nounstem-operation",
        requires: {
          matrix: "(-pa)-0",
          role: "frequency"
        },
        transform: {
          frequencyMatrix: "kept distinct from directional pa",
          outputRole: "frequency function"
        },
        builds: {
          targetShell: "CNN frequency relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-nal-li-nounstem",
        broadLabel: "locativo-temporal",
        family: "relational-locative-matrix",
        andrewsSection: "46.12.1",
        operation: "relational-nal-li-far-bank-other-side-operation",
        requires: {
          matrix: "(nal)-li",
          embed: "source-gated"
        },
        transform: {
          relationalRole: "far bank/other side",
          embed: "kept explicit"
        },
        builds: {
          targetShell: "CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-chi-direction-nounstem",
        broadLabel: "locativo-temporal",
        family: "relational-locative-matrix",
        andrewsSection: "46.12.2",
        operation: "relational-chi-direction-toward-operation",
        requires: {
          matrix: "(chi)-0",
          groundSource: "tlal/ground or directional source"
        },
        transform: {
          directionalRole: "toward",
          matrix: "kept relational"
        },
        builds: {
          targetShell: "CNN directional relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "another-directional-nounstem",
        broadLabel: "locativo-temporal",
        family: "relational-locative-matrix",
        andrewsSection: "46.13",
        operation: "additional-directional-nounstem-operation",
        requires: {
          sourceStem: "Andrews directional nounstem"
        },
        transform: {
          directionalRole: "source-specific",
          targetShell: "relational CNN"
        },
        builds: {
          targetShell: "CNN directional relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-teuh-zero-nounstem",
        broadLabel: "locativo-temporal",
        family: "relational-locative-matrix",
        andrewsSection: "46.14",
        operation: "relational-teuh-zero-nounstem-operation",
        requires: {
          matrix: "(teuh)-0"
        },
        transform: {
          relationalMatrix: "source-specific",
          targetShell: "relational CNN"
        },
        builds: {
          targetShell: "CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-tech-option-three-family",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.1",
        operation: "tech-tli-side-surface-contact-relational-options",
        requires: {
          matrix: "tech-tli",
          usageOptions: "one/two/three"
        },
        transform: {
          relationalRole: "side/surface/contact",
          option: "selected by source context"
        },
        builds: {
          targetShell: "CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-tech-possessive-state",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.1.a",
        operation: "tech-tli-possessive-state-relational-use",
        requires: {
          matrix: "tech-tli",
          targetState: "possessive"
        },
        transform: {
          state: "possessive-state option",
          relation: "surface/contact"
        },
        builds: {
          targetShell: "possessive CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-tech-integrated-compound",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.1.b",
        operation: "tech-tli-integrated-structure-compound-use",
        requires: {
          matrix: "tech-tli",
          compoundType: "integrated structure"
        },
        transform: {
          compound: "integrated structure",
          stateOptions: "absolutive/possessive retained"
        },
        builds: {
          targetShell: "compound CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-tech-connective-t-compound",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.1.c",
        operation: "tech-tli-connective-t-compound-use",
        requires: {
          matrix: "tech-tli",
          compoundType: "connective-t"
        },
        transform: {
          connectiveT: "compound boundary",
          stateOptions: "absolutive/possessive retained"
        },
        builds: {
          targetShell: "compound CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-tlan-option-three-family",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.2",
        operation: "tlan-bottom-under-low-location-relational-options",
        requires: {
          matrix: "tlan",
          usageOptions: "one/two/three"
        },
        transform: {
          relationalRole: "bottom/under/low location",
          option: "selected by source context"
        },
        builds: {
          targetShell: "CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-tlan-possessive-state",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.2.a",
        operation: "tlan-possessive-state-relational-use",
        requires: {
          matrix: "tlan",
          targetState: "possessive"
        },
        transform: {
          state: "possessive-state option",
          relation: "under/bottom"
        },
        builds: {
          targetShell: "possessive CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-tlan-integrated-compound",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.2.b",
        operation: "tlan-integrated-structure-compound-use",
        requires: {
          matrix: "tlan",
          compoundType: "integrated structure"
        },
        transform: {
          compound: "integrated structure",
          stateOptions: "absolutive/possessive retained"
        },
        builds: {
          targetShell: "compound CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-ixtlan-adjacency-subtype",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.2.i",
        operation: "ix-tlan-eyes-adjacency-place-under-gaze-subtype",
        requires: {
          matrix: "ix-tlan",
          semanticSubtype: "eyes/adjacency/gaze"
        },
        transform: {
          subtype: "kept as relational source",
          matrix: "tlan family"
        },
        builds: {
          targetShell: "CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-tzintlan-adjacency-subtype",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.2.i.ii",
        operation: "tzin-tlan-beneath-fundament-base-subtype",
        requires: {
          matrix: "tzin-tlan",
          semanticSubtype: "beneath/base"
        },
        transform: {
          subtype: "kept as relational source",
          matrix: "tlan family"
        },
        builds: {
          targetShell: "CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-tlan-connective-t-compound",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.2.c",
        operation: "tlan-connective-t-compound-use",
        requires: {
          matrix: "tlan",
          compoundType: "connective-t"
        },
        transform: {
          connectiveT: "compound boundary",
          stateOptions: "absolutive/possessive retained"
        },
        builds: {
          targetShell: "compound CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-pan-option-three-family",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.3",
        operation: "pan-upper-surface-appearance-location-relational-options",
        requires: {
          matrix: "pan",
          usageOptions: "one/two/three"
        },
        transform: {
          relationalRole: "upper/surface/appearance/location",
          option: "selected by source context"
        },
        builds: {
          targetShell: "CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-pan-possessive-state",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.3.a",
        operation: "pan-possessive-state-relational-use",
        requires: {
          matrix: "pan",
          targetState: "possessive"
        },
        transform: {
          state: "possessive-state option",
          relation: "surface/upper"
        },
        builds: {
          targetShell: "possessive CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-pan-integrated-compound",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.3.b",
        operation: "pan-integrated-structure-compound-use",
        requires: {
          matrix: "pan",
          compoundType: "integrated structure"
        },
        transform: {
          compound: "integrated structure",
          stateOptions: "absolutive/possessive retained"
        },
        builds: {
          targetShell: "compound CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "relational-pan-connective-t-compound",
        broadLabel: "locativo-temporal",
        family: "relational-option-one-two-three",
        andrewsSection: "47.3.3.c",
        operation: "pan-connective-t-compound-use",
        requires: {
          matrix: "pan",
          compoundType: "connective-t"
        },
        transform: {
          connectiveT: "compound boundary",
          stateOptions: "absolutive/possessive retained"
        },
        builds: {
          targetShell: "compound CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "associated-entity-nnc",
        broadLabel: "locativo-temporal",
        family: "relational-associated-entity",
        andrewsSection: "47.4",
        operation: "associated-entity-nnc-relation",
        requires: {
          sourceUnit: "associated-entity CNN"
        },
        transform: {
          association: "relation function, not lexical adjective",
          shell: "CNN retained"
        },
        builds: {
          targetShell: "CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "pertinency-nnc-adverbialized-embed",
        broadLabel: "locativo-temporal",
        family: "relational-pertinency",
        andrewsSection: "47.5.1",
        operation: "pertinency-nnc-with-directly-adverbialized-embed",
        requires: {
          sourceUnit: "pertinency CNN",
          embed: "adverbialized source"
        },
        transform: {
          embed: "directly adverbialized",
          meaning: "pertinency relation"
        },
        builds: {
          targetShell: "CNN relational"
        },
        generationStatus: "diagnostic-only"
      }, {
        id: "pertinency-nnc-associated-entity-compound",
        broadLabel: "locativo-temporal",
        family: "relational-pertinency",
        andrewsSection: "47.5.2",
        operation: "pertinency-nnc-matrix-with-associated-entity-compound-embed",
        requires: {
          matrix: "pertinency relation",
          embed: "associated-entity compound"
        },
        transform: {
          matrix: "pertinency",
          associatedEntity: "compound embed"
        },
        builds: {
          targetShell: "compound CNN relational"
        },
        generationStatus: "diagnostic-only"
      }]),
      "locativo-agentivo-preterito": freezeNominalizationOperationalLayerOperations([{
        id: "preterit-agentive-locative-46-3-1-a",
        broadLabel: "locativo-agentivo-preterito",
        family: "locative-agentive-preterit",
        andrewsSection: "46.3.1.a",
        operation: "preterit-agentive-general-use-plus-locative-n-plus-zero-connector",
        requires: {
          sourceStem: "preterit-agentive general-use stem",
          routeStack: "ordered IF->THEN operations"
        },
        transform: {
          preterit: "inside source stem",
          generalUse: "ka matrix",
          locative: "n",
          connector: "outer zero"
        },
        builds: {
          targetShell: "CNN/adverbial route",
          targetRole: "locative/adverbial from preterit-agentive"
        }
      }, {
        id: "active-action-locative-46-3-1-b",
        broadLabel: "locativo-agentivo-preterito",
        family: "locative-active-action",
        andrewsSection: "46.3.1.b",
        operation: "active-action-general-use-plus-locative-n-plus-zero-connector",
        requires: {
          sourceStem: "active-action general-use stem",
          routeStack: "embed plus locative matrix"
        },
        transform: {
          activeAction: "inside source stem",
          generalUse: "ca/tl source matrix",
          locative: "n",
          connector: "outer zero"
        },
        builds: {
          targetShell: "CNN/adverbial route",
          targetRole: "locative/adverbial from active-action"
        }
      }, {
        id: "locative-ca-n-absent-component-46-3-2-a",
        broadLabel: "locativo-agentivo-preterito",
        family: "locative-ca-n-formation",
        andrewsSection: "46.3.2.a",
        operation: "locative-ca-n-formation-with-absent-component",
        requires: {
          sourceComponent: "absent component",
          matrix: "locative n/tli"
        },
        transform: {
          caN: "resultant locative formation",
          component: "recorded as absent"
        },
        builds: {
          targetShell: "CNN locative route",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "locative-ca-n-present-component-46-3-2-b",
        broadLabel: "locativo-agentivo-preterito",
        family: "locative-ca-n-formation",
        andrewsSection: "46.3.2.b",
        operation: "locative-ca-n-formation-with-present-component",
        requires: {
          sourceComponent: "present represented component",
          matrix: "locative n/tli"
        },
        transform: {
          caN: "resultant locative formation",
          component: "kept visible"
        },
        builds: {
          targetShell: "CNN locative route",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "locative-imperfect-active-46-4-1",
        broadLabel: "locativo-agentivo-preterito",
        family: "locative-imperfect-source",
        andrewsSection: "46.4.1",
        operation: "active-imperfect-source-plus-locative-n-matrix",
        requires: {
          sourceTense: "imperfect",
          sourceVoice: "active"
        },
        transform: {
          sourcePredicate: "nominalized before locative n matrix",
          route: "not preterit-agentive despite same output host"
        },
        builds: {
          targetShell: "CNN locative route",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "locative-imperfect-passive-46-4-2",
        broadLabel: "locativo-agentivo-preterito",
        family: "locative-imperfect-source",
        andrewsSection: "46.4.2",
        operation: "passive-imperfect-source-plus-locative-n-matrix",
        requires: {
          sourceTense: "imperfect",
          sourceVoice: "passive"
        },
        transform: {
          passiveSource: "retained",
          route: "resultant locative"
        },
        builds: {
          targetShell: "CNN locative route",
          targetStatus: "source-gated continuation"
        }
      }, {
        id: "locative-imperfect-impersonal-46-4-3",
        broadLabel: "locativo-agentivo-preterito",
        family: "locative-imperfect-source",
        andrewsSection: "46.4.3",
        operation: "impersonal-imperfect-source-plus-locative-n-matrix",
        requires: {
          sourceTense: "imperfect",
          sourceVoice: "impersonal"
        },
        transform: {
          impersonalSource: "retained",
          route: "resultant locative"
        },
        builds: {
          targetShell: "CNN locative route",
          targetStatus: "source-gated continuation"
        }
      }])
    });
    const ANDREWS_CNV_CNN_OPERATIONAL_EXPECTED_SECTION_REFS_BY_LABEL = Object.freeze({
      "predicado-nominal": Object.freeze(["4.4/35-36", "4.5/5.5/35-36", "36.8/46.3.1.a", "12.2/46.3.1.a"]),
      agentivo: Object.freeze(["36.2", "36.3", "36.4"]),
      "agentivo-presente": Object.freeze(["36.7"]),
      "agentivo-preterito": Object.freeze(["35.3", "35.4", "35.5", "35.6", "35.7", "35.8", "35.9", "35.10", "35.11", "35.12", "35.13", "35.13.1", "35.13.2", "35.13.3", "35.13.4", "35.14"]),
      "agentivo-futuro": Object.freeze(["36.8.1", "36.8.2"]),
      "sustantivo-verbal": Object.freeze(["36.10", "36.11", "37.2", "37.2.1", "37.2.2", "37.2.3", "37.2.4", "37.3", "37.4", "37.5.1", "37.5.2", "37.5.2.a", "37.5.2.b", "37.5.3", "37.5.3.a", "37.5.3.b", "37.5.4", "37.5.4.a", "37.5.4.b", "37.5.5", "37.6", "37.7"]),
      patientivo: Object.freeze(["36.5", "37.8", "37.9", "37.9.1", "37.9.1.a", "37.9.1.b", "37.9.1.c", "37.9.2", "37.9.3", "38.1", "38.1.1", "38.1.1.a", "38.1.1.b", "38.1.1.c", "38.1.1.d", "38.1.2", "38.1.3", "38.1.3.a", "38.1.3.b", "38.1.3.c", "38.1.4", "38.1.4.a", "38.1.4.b", "38.1.4.c", "38.1.5", "38.1.6", "38.2.1", "38.2.2", "39.1", "39.1.1", "39.1.3", "39.2", "39.2.1", "39.2.2", "39.3", "39.3.1", "39.3.2", "39.3.3", "39.3.4", "39.3.5", "39.3.6", "39.3.6.a", "39.3.6.b", "39.4", "39.4.1", "39.4.2", "39.4.3", "39.4.4", "39.5", "39.6", "39.6.1", "39.6.2", "39.7", "39.7.1", "39.7.1.a", "39.7.1.b", "39.7.1.c", "39.7.2", "39.7.2.a", "39.7.2.b", "39.8", "39.9"]),
      "patientivo-pasivo": Object.freeze(["37.9"]),
      "patientivo-impersonal": Object.freeze(["38.1"]),
      "patientivo-perfectivo": Object.freeze(["39.1"]),
      "patientivo-imperfectivo": Object.freeze(["39.2"]),
      "patientivo-tronco": Object.freeze(["39.4"]),
      instrumentivo: Object.freeze(["36.6", "36.6.1", "36.6.2", "36.6.3"]),
      "calificativo-instrumentivo": Object.freeze(["39.3", "39.3.4", "39.3.6", "40.2.1", "40.2.2", "40.2.3.a", "40.2.3.b", "40.3.1", "40.3.2", "40.4.1.a", "40.4.1.b", "40.4.1.c", "40.4.1.d", "40.4.2", "40.6", "40.7", "40.8", "40.8.1", "40.8.2-40.8.4", "40.8.5", "40.9", "40.10.1", "40.10.2", "40.10.3", "40.11", "41.1.1", "41.1.2", "41.1.2.a", "41.1.2.b", "41.1.2.c", "41.1.2.d", "41.1.2.e", "41.2", "41.2.1", "41.2.2", "41.2.3", "41.3", "41.4"]),
      "locativo-temporal": Object.freeze(["44.3", "44.4.1", "44.4.2", "44.5", "44.6", "44.7", "44.8", "44.8.1", "44.8.2", "44.8.2.a", "44.8.2.b", "45.4.1", "45.4.2", "45.4.3", "45.4.4", "45.4.4.a", "45.4.4.b", "45.4.4.c", "45.4.4.d", "45.4.4.e", "45.4.4.i", "45.4.4.i.ii", "45.4.4.i.iii", "45.4.4.i.iv", "46.2", "46.3", "46.3.1.b", "46.3.2.a", "46.3.2.b", "46.4.1", "46.4.2", "46.4.3", "46.5", "46.6", "46.7", "46.8", "46.8.1.a", "46.8.1.b", "46.8.2.a", "46.8.2.b", "46.8.3.a", "46.8.3.b", "46.8.4.a", "46.8.4.b", "46.8.5.a", "46.8.5.b", "46.8.6.a", "46.8.6.b", "46.9", "46.10", "46.11", "46.12.1", "46.12.2", "46.13", "46.14", "47.3.1", "47.3.1.a", "47.3.1.b", "47.3.1.c", "47.3.2", "47.3.2.a", "47.3.2.b", "47.3.2.i", "47.3.2.i.ii", "47.3.2.c", "47.3.3", "47.3.3.a", "47.3.3.b", "47.3.3.c", "47.4", "47.5.1", "47.5.2"]),
      "locativo-agentivo-preterito": Object.freeze(["46.3.1.a", "46.3.1.b", "46.3.2.a", "46.3.2.b", "46.4.1", "46.4.2", "46.4.3"])
    });
    function cloneNominalizationOperationalLayerOperation(operation = null) {
      if (!operation || typeof operation !== "object") {
        return null;
      }
      return {
        ...operation,
        requires: {
          ...(operation.requires || {})
        },
        transform: {
          ...(operation.transform || {})
        },
        builds: {
          ...(operation.builds || {})
        },
        diagnostics: Array.isArray(operation.diagnostics) ? Array.from(operation.diagnostics) : []
      };
    }
    function getAndrewsCnvCnnOperationalLayerKeys() {
      return Object.keys(ANDREWS_CNV_CNN_OPERATIONAL_LAYER_BY_LABEL);
    }
    function getAndrewsCnvCnnOperationalLayer(label = "") {
      const key = String(label || "").trim();
      const operations = ANDREWS_CNV_CNN_OPERATIONAL_LAYER_BY_LABEL[key] || Object.freeze([]);
      const clonedOperations = operations.map(operation => cloneNominalizationOperationalLayerOperation(operation)).filter(Boolean);
      const operationPlans = clonedOperations.map(operation => compileAndrewsCnvCnnOperationalSuboperationPlan(operation)).filter(Boolean);
      const generatedCount = clonedOperations.filter(operation => operation.generationStatus === "andrews-logic-generated").length;
      const sourceGatedCount = clonedOperations.filter(operation => operation.generationStatus !== "diagnostic-only").length - generatedCount;
      const diagnosticOnlyCount = clonedOperations.filter(operation => operation.generationStatus === "diagnostic-only").length;
      return {
        kind: "andrews-cnv-cnn-operational-layer",
        version: 1,
        label: key,
        formulaTransition: clonedOperations.length ? "CNV->CNN" : "",
        sourceFormulaType: clonedOperations.length ? "CNV" : "",
        targetFormulaType: clonedOperations.length ? "CNN" : "",
        operationCount: clonedOperations.length,
        operationIds: clonedOperations.map(operation => operation.id),
        operations: clonedOperations,
        operationPlans,
        sourceRequirementKeys: Array.from(new Set(clonedOperations.flatMap(operation => Object.keys(operation.requires || {})))),
        transformKeys: Array.from(new Set(clonedOperations.flatMap(operation => Object.keys(operation.transform || {})))),
        buildKeys: Array.from(new Set(clonedOperations.flatMap(operation => Object.keys(operation.builds || {})))),
        logicSummary: {
          executablePlanCount: operationPlans.filter(plan => plan.executableLogic).length,
          surfaceCapableCount: operationPlans.filter(plan => plan.canAttemptSurface).length,
          diagnosticOnlyCount: operationPlans.filter(plan => plan.diagnosticOnly).length,
          executionKinds: Array.from(new Set(operationPlans.map(plan => plan.executionKind))).sort()
        },
        generationSummary: {
          generatedCount,
          sourceGatedCount: Math.max(0, sourceGatedCount),
          diagnosticOnlyCount,
          complete: false
        }
      };
    }
    function getAndrewsCnvCnnOperationalLayerExpectedSections(label = "") {
      const key = String(label || "").trim();
      const refs = ANDREWS_CNV_CNN_OPERATIONAL_EXPECTED_SECTION_REFS_BY_LABEL[key] || Object.freeze([]);
      return Array.from(refs);
    }
    function auditAndrewsCnvCnnOperationalLayerCoverage(label = "") {
      const key = String(label || "").trim();
      const expectedSections = getAndrewsCnvCnnOperationalLayerExpectedSections(key);
      const layer = getAndrewsCnvCnnOperationalLayer(key);
      const representedSections = Array.from(new Set(layer.operations.map(operation => operation.andrewsSection).filter(Boolean)));
      const missingSections = expectedSections.filter(section => !representedSections.includes(section));
      const uncoveredOperationIds = layer.operations.filter(operation => !expectedSections.includes(operation.andrewsSection)).map(operation => operation.id);
      return {
        kind: "andrews-cnv-cnn-operational-layer-coverage-audit",
        version: 1,
        label: key,
        expectedSectionCount: expectedSections.length,
        representedSectionCount: representedSections.length,
        operationCount: layer.operationCount,
        expectedSections,
        representedSections,
        missingSections,
        uncoveredOperationIds,
        complete: missingSections.length === 0
      };
    }
    function auditAllAndrewsCnvCnnOperationalLayerCoverage() {
      const labels = getAndrewsCnvCnnOperationalLayerKeys();
      const labelAudits = labels.map(label => auditAndrewsCnvCnnOperationalLayerCoverage(label));
      return {
        kind: "andrews-cnv-cnn-operational-layer-coverage-audit-set",
        version: 1,
        labelCount: labels.length,
        completeLabelCount: labelAudits.filter(audit => audit.complete).length,
        missingSectionCount: labelAudits.reduce((count, audit) => count + audit.missingSections.length, 0),
        labels,
        labelAudits,
        complete: labelAudits.every(audit => audit.complete)
      };
    }
    function normalizeAndrewsCnvCnnOperationalToken(value = "") {
      return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }
    function classifyAndrewsCnvCnnOperationalExecutionKind(operation = null) {
      const text = normalizeAndrewsCnvCnnOperationalToken([operation?.id, operation?.family, operation?.operation, ...Object.keys(operation?.requires || {}), ...Object.keys(operation?.transform || {}), ...Object.keys(operation?.builds || {})].filter(Boolean).join(" "));
      if (!text) {
        return "unknown";
      }
      if (operation?.generationStatus === "diagnostic-only") {
        return "diagnostic-boundary";
      }
      if (text.includes("patientive")) {
        return "patientive-source";
      }
      if (text.includes("instrumentive")) {
        return "instrumentive-source";
      }
      if (text.includes("locative") || text.includes("relational") || text.includes("adverbial")) {
        return "locative-relational-route";
      }
      if (text.includes("compound") || text.includes("embed") || text.includes("matrix")) {
        return "compound-route";
      }
      if (text.includes("adject") || text.includes("quality") || text.includes("characteristic")) {
        return "adjectival-function-route";
      }
      if (text.includes("append") || text.includes("plus") || text.includes("suffix") || text.includes("future")) {
        return "affixal-stem-operation";
      }
      if (text.includes("reanaly") || text.includes("predicate-to") || text.includes("source-to")) {
        return "source-target-reanalysis";
      }
      if (text.includes("classify") || text.includes("contrast") || text.includes("translation")) {
        return "classification-route";
      }
      return "structural-route";
    }
    function compileAndrewsCnvCnnOperationalSuboperationPlan(operation = null) {
      if (!operation || typeof operation !== "object" || !operation.id) {
        return null;
      }
      const requires = operation.requires && typeof operation.requires === "object" ? operation.requires : {};
      const transform = operation.transform && typeof operation.transform === "object" ? operation.transform : {};
      const builds = operation.builds && typeof operation.builds === "object" ? operation.builds : {};
      const executionKind = classifyAndrewsCnvCnnOperationalExecutionKind(operation);
      const diagnosticOnly = operation.generationStatus === "diagnostic-only";
      const requirementChecks = Object.entries(requires).map(([slot, expected]) => ({
        slot,
        expected: String(expected || ""),
        check: `require:${slot}`
      }));
      const transformSteps = Object.entries(transform).map(([slot, action], index) => ({
        order: index + 1,
        slot,
        action: String(action || ""),
        step: `transform:${slot}`
      }));
      const buildSteps = Object.entries(builds).map(([slot, value], index) => ({
        order: index + 1,
        slot,
        value: String(value || ""),
        step: `build:${slot}`
      }));
      return {
        kind: "andrews-cnv-cnn-operational-suboperation-plan",
        version: 1,
        operationId: operation.id,
        label: operation.broadLabel || "",
        family: operation.family || "",
        andrewsSection: operation.andrewsSection || "",
        executionKind,
        executableLogic: requirementChecks.length > 0 || transformSteps.length > 0 || buildSteps.length > 0,
        canAttemptSurface: !diagnosticOnly && ["affixal-stem-operation", "source-target-reanalysis", "patientive-source", "instrumentive-source", "locative-relational-route", "compound-route", "adjectival-function-route"].includes(executionKind),
        diagnosticOnly,
        requirementChecks,
        transformSteps,
        buildSteps,
        structuralBoundary: {
          sourceFormula: operation.sourceFormula || "CNV",
          targetFormula: operation.targetFormula || "CNN",
          transition: "CNV->CNN",
          classicalSpellingRole: "structural-only",
          outputSpellingAuthority: "Nawat/Pipil orthography bridge"
        }
      };
    }
    function getAndrewsCnvCnnOperationalSuboperationPlan(operationId = "") {
      const operation = findAndrewsCnvCnnOperationalSuboperation(operationId);
      return compileAndrewsCnvCnnOperationalSuboperationPlan(operation);
    }
    function auditAndrewsCnvCnnOperationalLogicCoverage(label = "") {
      const layer = getAndrewsCnvCnnOperationalLayer(label);
      const plans = layer.operations.map(operation => compileAndrewsCnvCnnOperationalSuboperationPlan(operation)).filter(Boolean);
      const missingPlanIds = layer.operations.filter(operation => !plans.some(plan => plan.operationId === operation.id && plan.executableLogic)).map(operation => operation.id);
      return {
        kind: "andrews-cnv-cnn-operational-logic-coverage-audit",
        version: 1,
        label: layer.label,
        operationCount: layer.operationCount,
        executablePlanCount: plans.filter(plan => plan.executableLogic).length,
        surfaceCapableCount: plans.filter(plan => plan.canAttemptSurface).length,
        diagnosticOnlyCount: plans.filter(plan => plan.diagnosticOnly).length,
        executionKinds: Array.from(new Set(plans.map(plan => plan.executionKind))).sort(),
        missingPlanIds,
        complete: layer.operationCount > 0 && missingPlanIds.length === 0
      };
    }
    function auditAllAndrewsCnvCnnOperationalLogicCoverage() {
      const labels = getAndrewsCnvCnnOperationalLayerKeys();
      const labelAudits = labels.map(label => auditAndrewsCnvCnnOperationalLogicCoverage(label));
      return {
        kind: "andrews-cnv-cnn-operational-logic-coverage-audit-set",
        version: 1,
        labelCount: labels.length,
        operationCount: labelAudits.reduce((sum, audit) => sum + audit.operationCount, 0),
        executablePlanCount: labelAudits.reduce((sum, audit) => sum + audit.executablePlanCount, 0),
        surfaceCapableCount: labelAudits.reduce((sum, audit) => sum + audit.surfaceCapableCount, 0),
        diagnosticOnlyCount: labelAudits.reduce((sum, audit) => sum + audit.diagnosticOnlyCount, 0),
        missingPlanIds: labelAudits.flatMap(audit => audit.missingPlanIds),
        labelAudits,
        complete: labelAudits.every(audit => audit.complete)
      };
    }
    const ANDREWS_CNV_CNN_OPERATIONAL_ROUTE_BY_NOMINAL_KIND = Object.freeze({
      "agentivo": "customary-agentive-reanalysis",
      "agentivo-presente": "present-agentive-absolutive",
      "agentivo-preterito": "preterit-agentive-restricted-use",
      "agentivo-futuro": "future-agentive-restricted-use",
      "sustantivo-verbal": "active-action-liz",
      "patientivo": "patientive-source-family-overview",
      "patientivo-pasivo": "passive-patientive",
      "patientivo-impersonal": "impersonal-patientive",
      "patientivo-perfectivo": "perfective-patientive",
      "patientivo-imperfectivo": "imperfective-patientive",
      "patientivo-tronco": "root-stock-patientive",
      "instrumentivo": "instrumentive-absolutive",
      "calificativo-instrumentivo": "characteristic-property",
      "locativo-temporal": "imperfective-locative-temporal",
      "locativo-agentivo-preterito": "preterit-agentive-locative-46-3-1-a"
    });
    function normalizeAndrewsCnvCnnOperationalSourceStem(value = "") {
      return String(value || "").trim().replace(/^CNV\(/, "").replace(/^VNC\(/, "").replace(/\)$/, "").replace(/[#+]/g, "").replace(/\s+/g, "").replace(/^-+|-+$/g, "");
    }
    function realizeAndrewsCnvCnnOperationalSurface(value = "", meta = {}) {
      const operationFrame = meta && typeof meta === "object" ? meta.operationFrame : null;
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "andrews-cnv-cnn-operational-suboperation-realization") {
        return "";
      }
      const normalizedInput = String(value || "").replace(/[()#\s-]/g, "");
      const framedInput = `${operationFrame.targetStem || ""}${operationFrame.connector && operationFrame.connector !== "Ø" ? operationFrame.connector : ""}`.replace(/[()#\s-]/g, "");
      if (normalizedInput && normalizedInput !== framedInput) {
        return "";
      }
      return String(operationFrame.targetSurface || "");
    }
    function findAndrewsCnvCnnOperationalSuboperation(operationId = "") {
      const id = String(operationId || "").trim();
      if (!id) {
        return null;
      }
      for (const label of getAndrewsCnvCnnOperationalLayerKeys()) {
        const operation = getAndrewsCnvCnnOperationalLayer(label).operations.find(entry => entry.id === id);
        if (operation) {
          return operation;
        }
      }
      return null;
    }
    function resolveAndrewsCnvCnnOperationalSuboperationId({
      operationId = "",
      nominalKind = "",
      nominalizationKind = "",
      patientiveFamily = "",
      predicateState = ""
    } = {}) {
      const explicit = String(operationId || "").trim();
      if (explicit) {
        return explicit;
      }
      const kind = String(nominalKind || "").trim();
      const role = String(nominalizationKind || "").trim();
      const family = String(patientiveFamily || "").trim();
      if (kind === "agentivo-preterito" && String(predicateState || "") === "possessive") {
        return "preterit-agentive-general-use-ca";
      }
      if (kind === "patientivo") {
        if (family === "passive" || family === "nonactive") {
          return "passive-patientive";
        }
        if (family === "impersonal") {
          return "impersonal-patientive";
        }
        if (family === "perfectivo") {
          return "perfective-patientive";
        }
        if (family === "imperfectivo") {
          return "imperfective-patientive";
        }
        if (family === "tronco-verbal") {
          return "root-stock-patientive";
        }
      }
      if (role === "passive-action-nominal") {
        return "passive-action-nnc";
      }
      if (role === "active-action-nominal") {
        return "active-action-first-type";
      }
      if (role === "impersonal-action-nominal") {
        return "impersonal-action-liz";
      }
      return ANDREWS_CNV_CNN_OPERATIONAL_ROUTE_BY_NOMINAL_KIND[kind] || "";
    }
    function buildAndrewsCnvCnnOperationalSuboperationMissingRequirements(operation = null, input = {}) {
      const requires = operation?.requires && typeof operation.requires === "object" ? operation.requires : {};
      const sourceStem = normalizeAndrewsCnvCnnOperationalSourceStem(input.sourceStem || input.sourceCore || input.sourcePredicate || input.sourceVnc || input.stem || "");
      const sourceTense = String(input.sourceTense || "").trim();
      const sourceVoice = String(input.sourceVoice || input.sourceCombinedMode || "").trim();
      const missing = [];
      if ((requires.sourceStem || requires.sourceCore || requires.sourcePredicate || requires.sourceUnit) && !sourceStem) {
        missing.push("sourceStem");
      }
      if (requires.sourceTense && !sourceTense) {
        missing.push("sourceTense");
      }
      if (requires.sourceVoice && !sourceVoice) {
        missing.push("sourceVoice");
      }
      if (requires.sourceFamily && !String(input.patientiveFamily || input.sourceFamily || "").trim()) {
        missing.push("sourceFamily");
      }
      return Array.from(new Set(missing));
    }
    function buildAndrewsCnvCnnOperationalFormulaEcho({
      sourceStem = "",
      targetStem = "",
      connector = ""
    } = {}) {
      const stem = String(targetStem || sourceStem || "").trim() || "TARGET_STEM";
      const num = String(connector || "").trim() || "Ø";
      return `#Ø-Ø(${stem})${num}#`;
    }
    function buildAndrewsCnvCnnOperationalSourceFormulaEcho({
      sourceStem = ""
    } = {}) {
      return `CNV(${String(sourceStem || "SOURCE_CORE")})`;
    }
    function realizeAndrewsCnvCnnOperationalTargetRawSurface(value = "", meta = {}) {
      const source = String(value || "").replace(/[()#\s-]/g, "");
      if (!source) {
        return "";
      }
      const conversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(source, {
        source: "Andrews CNV->CNN typed operational target",
        ...meta
      }) : {
        output: source
      };
      return String(conversion?.output || source || "");
    }
    function buildAndrewsCnvCnnOperationalSourceFrame({
      operationId = "",
      nominalKind = "",
      nominalizationKind = "",
      patientiveFamily = "",
      sourceStem = "",
      sourceCore = "",
      sourcePredicate = "",
      sourceVnc = "",
      sourceTense = "",
      sourceVoice = "",
      sourceCombinedMode = "",
      subjectNumber = "",
      subjectSuffix = "",
      predicateState = "",
      possessorPrefix = "",
      connector = "",
      preteritStem = "",
      patientiveStem = "",
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const resolvedOperationId = resolveAndrewsCnvCnnOperationalSuboperationId({
        operationId,
        nominalKind,
        nominalizationKind,
        patientiveFamily,
        predicateState
      });
      const operation = findAndrewsCnvCnnOperationalSuboperation(resolvedOperationId);
      if (!operation) {
        return null;
      }
      const missingRequirements = buildAndrewsCnvCnnOperationalSuboperationMissingRequirements(operation, {
        sourceStem,
        sourceCore,
        sourcePredicate,
        sourceVnc,
        sourceTense,
        sourceVoice,
        sourceCombinedMode,
        patientiveFamily
      });
      if (missingRequirements.length) {
        return null;
      }
      const normalizedSourceStem = normalizeAndrewsCnvCnnOperationalSourceStem(sourceStem || sourceCore || sourcePredicate || sourceVnc || "");
      if (!normalizedSourceStem) {
        return null;
      }
      const normalizedSubjectNumber = String(subjectNumber || subjectSuffix || "").trim();
      const sourceSignature = [resolvedOperationId, normalizedSourceStem, String(sourceTense || ""), String(sourceVoice || sourceCombinedMode || ""), String(patientiveFamily || ""), normalizedSubjectNumber, String(predicateState || ""), String(possessorPrefix || ""), String(connector || ""), String(preteritStem || ""), String(patientiveStem || "")].join("|");
      return Object.freeze({
        kind: "andrews-cnv-cnn-operational-source-frame",
        version: 1,
        operationId: resolvedOperationId,
        nominalKind: String(nominalKind || ""),
        nominalizationKind: String(nominalizationKind || ""),
        patientiveFamily: String(patientiveFamily || ""),
        sourceStem: normalizedSourceStem,
        sourceTense: String(sourceTense || ""),
        sourceVoice: String(sourceVoice || sourceCombinedMode || ""),
        sourceCombinedMode: String(sourceCombinedMode || ""),
        subjectNumber: normalizedSubjectNumber,
        predicateState: String(predicateState || ""),
        possessorPrefix: String(possessorPrefix || ""),
        connector: String(connector || ""),
        preteritStem: String(preteritStem || ""),
        patientiveStem: String(patientiveStem || ""),
        sourceSignature,
        operationPlan: compileAndrewsCnvCnnOperationalSuboperationPlan(operation),
        operationRecord: operation,
        authority: "Andrews CNV->CNN operational source frame",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function buildAndrewsCnvCnnOperationalHandledTarget(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "andrews-cnv-cnn-operational-source-frame") {
        return null;
      }
      const id = String(sourceFrame.operationId || "");
      const sourceStem = String(sourceFrame.sourceStem || "");
      const subjectNumber = String(sourceFrame.subjectNumber || "").trim();
      const plural = subjectNumber === "t" || subjectNumber === "p" || subjectNumber === "plural";
      const possessive = String(sourceFrame.predicateState || "") === "possessive" || Boolean(String(sourceFrame.possessorPrefix || "").trim());
      const genericConnector = plural ? "ket" : "ki";
      const handlers = {
        "customary-agentive-reanalysis": () => ({
          targetStem: `${sourceStem}ni`,
          connector: plural ? "wan" : "Ø",
          operationApplied: "append-customary-present-ni-inside-nounstem"
        }),
        "present-agentive-absolutive": () => ({
          targetStem: sourceStem,
          connector: subjectNumber || "Ø",
          operationApplied: "reanalyze-present-predicate-as-agentive-nounstem"
        }),
        "preterit-agentive-restricted-use": () => ({
          targetStem: sourceFrame.preteritStem || sourceStem,
          connector: sourceFrame.connector || genericConnector,
          operationApplied: "reanalyze-preterit-predicate-as-restricted-agentive-nounstem"
        }),
        "preterit-agentive-general-use-ca": () => ({
          targetStem: `${sourceFrame.preteritStem || sourceStem}ka`,
          connector: sourceFrame.connector || (possessive ? "w" : "Ø"),
          operationApplied: "embed-restricted-preterit-agentive-before-ca-matrix"
        }),
        "future-agentive-restricted-use": () => ({
          targetStem: `${sourceStem}s`,
          connector: sourceFrame.connector || genericConnector,
          operationApplied: "keep-future-s-inside-agentive-nounstem"
        }),
        "active-action-z": () => ({
          targetStem: `${sourceStem}z`,
          connector: "Ø",
          operationApplied: "append-active-action-z-to-source-core"
        }),
        "active-action-liz": () => ({
          targetStem: `${sourceStem}liz`,
          connector: "Ø",
          operationApplied: "append-active-action-liz-to-source-core"
        }),
        "impersonal-action-liz": () => ({
          targetStem: `${sourceStem}liz`,
          connector: "Ø",
          operationApplied: "build-impersonal-action-nounstem-from-source-core"
        }),
        "passive-action-nnc": () => ({
          targetStem: sourceStem,
          connector: "Ø",
          operationApplied: "reanalyze-distant-past-passive-as-passive-action-nnc"
        }),
        "active-action-first-type": () => ({
          targetStem: sourceStem,
          connector: "Ø",
          operationApplied: "reanalyze-distant-past-active-as-active-action-nnc"
        }),
        "passive-patientive": () => ({
          targetStem: sourceFrame.patientiveStem || sourceStem,
          connector: sourceFrame.connector || "t",
          operationApplied: "derive-passive-core-to-patientive-nounstem"
        }),
        "impersonal-patientive": () => ({
          targetStem: sourceFrame.patientiveStem || sourceStem,
          connector: sourceFrame.connector || "t",
          operationApplied: "derive-impersonal-core-to-patientive-nounstem"
        }),
        "perfective-patientive": () => ({
          targetStem: sourceFrame.patientiveStem || sourceStem,
          connector: sourceFrame.connector || "t",
          operationApplied: "derive-perfective-active-core-to-patientive-nounstem"
        }),
        "imperfective-patientive": () => ({
          targetStem: sourceFrame.patientiveStem || sourceStem,
          connector: sourceFrame.connector || "t",
          operationApplied: "derive-imperfective-active-core-to-patientive-nounstem"
        }),
        "root-stock-patientive": () => ({
          targetStem: sourceFrame.patientiveStem || sourceStem,
          connector: sourceFrame.connector || "t",
          operationApplied: "derive-root-or-stock-to-patientive-nounstem"
        }),
        "instrumentive-absolutive": () => ({
          targetStem: sourceStem,
          connector: sourceFrame.connector || "Ø",
          operationApplied: "derive-customary-impersonal-source-to-instrumentive-nounstem"
        }),
        "instrumentive-possessive": () => ({
          targetStem: sourceStem,
          connector: sourceFrame.connector || "w",
          operationApplied: "derive-imperfect-active-source-to-possessive-instrumentive"
        }),
        "characteristic-property": () => ({
          targetStem: `${sourceStem}yo`,
          connector: sourceFrame.connector || "Ø",
          operationApplied: "derive-characteristic-property-through-yo-matrix"
        }),
        "imperfective-locative-temporal": () => ({
          targetStem: sourceStem,
          connector: sourceFrame.connector || "yan",
          operationApplied: "derive-imperfect-source-to-locative-temporal-nounstem"
        }),
        "preterit-agentive-locative-46-3-1-a": () => ({
          targetStem: `${sourceStem}kan`,
          connector: sourceFrame.connector || "Ø",
          operationApplied: "stack-preterit-agentive-general-use-plus-locative-n-plus-zero-connector"
        })
      };
      const handler = handlers[id];
      return handler ? handler() : null;
    }
    function buildAndrewsCnvCnnOperationalOperationFrame(sourceFrame = null) {
      const handled = buildAndrewsCnvCnnOperationalHandledTarget(sourceFrame);
      if (!sourceFrame || !handled) {
        return null;
      }
      const connector = String(handled.connector || "");
      const targetRaw = `${handled.targetStem || ""}${connector && connector !== "Ø" ? connector : ""}`;
      const targetSurface = realizeAndrewsCnvCnnOperationalTargetRawSurface(targetRaw, {
        operationId: sourceFrame.operationId
      });
      if (!targetSurface) {
        return null;
      }
      const targetSegmentFrames = Object.freeze([Object.freeze({
        slot: "target-stem",
        role: "cnv-cnn-operational-target-stem",
        formulaValue: handled.targetStem || "",
        surface: realizeAndrewsCnvCnnOperationalTargetRawSurface(handled.targetStem || "", {
          operationId: sourceFrame.operationId,
          slot: "target-stem"
        })
      }), Object.freeze({
        slot: "target-connector",
        role: "cnv-cnn-operational-target-connector",
        formulaValue: connector || "Ø",
        surface: connector && connector !== "Ø" ? realizeAndrewsCnvCnnOperationalTargetRawSurface(connector, {
          operationId: sourceFrame.operationId,
          slot: "target-connector"
        }) : ""
      })]);
      const formulaEcho = buildAndrewsCnvCnnOperationalFormulaEcho({
        sourceStem: sourceFrame.sourceStem,
        targetStem: handled.targetStem,
        connector
      });
      const sourceFormulaEcho = buildAndrewsCnvCnnOperationalSourceFormulaEcho({
        sourceStem: sourceFrame.sourceStem
      });
      const targetSignature = [handled.targetStem || "", connector, targetSurface, formulaEcho].join("|");
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-cnv-cnn-operational-suboperation-realization",
        suboperationId: sourceFrame.operationId,
        routeFamily: "cnv-cnn-operational-suboperation",
        routeStage: "execute-typed-operation-frame",
        operationApplied: handled.operationApplied || "",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature,
        targetSignature,
        targetStem: handled.targetStem || "",
        connector,
        sourceFormulaEcho,
        targetFormulaEcho: formulaEcho,
        renderedFormulaEcho: formulaEcho,
        formulaEcho: `${sourceFormulaEcho} -> ${formulaEcho}`,
        targetSegmentFrames,
        targetSurface,
        surfaceForms: [targetSurface],
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function getAndrewsCnvCnnOperationalFrameMismatch({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "andrews-cnv-cnn-operational-source-frame") {
        return "source-frame-required";
      }
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "andrews-cnv-cnn-operational-suboperation-realization" || operationFrame.routeFamily !== "cnv-cnn-operational-suboperation" || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "operation-frame-required";
      }
      if (operationFrame.sourceFrameKind !== sourceFrame.kind || operationFrame.sourceSignature !== sourceFrame.sourceSignature || operationFrame.suboperationId !== sourceFrame.operationId) {
        return "contradictory-source-frame";
      }
      const targetSurface = Array.isArray(operationFrame.targetSegmentFrames) ? operationFrame.targetSegmentFrames.map(segment => String(segment?.surface || "")).join("") : "";
      if (!targetSurface || targetSurface !== String(operationFrame.targetSurface || "") || !String(operationFrame.targetStem || "").trim() || !String(operationFrame.targetSignature || "").includes(String(operationFrame.targetSurface || ""))) {
        return "contradictory-target-frame";
      }
      return "";
    }
    function executeAndrewsCnvCnnOperationalHandler(operation = null, input = {}) {
      const mismatch = getAndrewsCnvCnnOperationalFrameMismatch({
        sourceFrame: input.sourceFrame,
        operationFrame: input.operationFrame
      });
      if (mismatch || String(operation?.id || "") !== String(input.sourceFrame?.operationId || "")) {
        return null;
      }
      return {
        sourceStem: input.sourceFrame.sourceStem,
        targetStem: input.operationFrame.targetStem,
        connector: input.operationFrame.connector,
        operationApplied: input.operationFrame.operationApplied,
        surface: input.operationFrame.targetSurface,
        surfaceForms: input.operationFrame.surfaceForms,
        sourceFormulaEcho: input.operationFrame.sourceFormulaEcho,
        formulaEcho: input.operationFrame.targetFormulaEcho,
        operationFrame: input.operationFrame
      };
    }
    function buildAndrewsCnvCnnOperationalSuboperationFrame({
      operationId = "",
      nominalKind = "",
      nominalizationKind = "",
      patientiveFamily = "",
      sourceStem = "",
      sourceCore = "",
      sourcePredicate = "",
      sourceVnc = "",
      sourceTense = "",
      sourceVoice = "",
      sourceCombinedMode = "",
      subjectNumber = "",
      subjectSuffix = "",
      predicateState = "",
      possessorPrefix = "",
      connector = "",
      preteritStem = "",
      patientiveStem = "",
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const resolvedOperationId = resolveAndrewsCnvCnnOperationalSuboperationId({
        operationId,
        nominalKind,
        nominalizationKind,
        patientiveFamily,
        predicateState
      });
      const operation = findAndrewsCnvCnnOperationalSuboperation(resolvedOperationId);
      const operationPlan = compileAndrewsCnvCnnOperationalSuboperationPlan(operation);
      const missingRequirements = buildAndrewsCnvCnnOperationalSuboperationMissingRequirements(operation, {
        sourceStem,
        sourceCore,
        sourcePredicate,
        sourceVnc,
        sourceTense,
        sourceVoice,
        sourceCombinedMode,
        patientiveFamily
      });
      const frameMismatch = getAndrewsCnvCnnOperationalFrameMismatch({
        sourceFrame,
        operationFrame
      });
      const handled = operation && !frameMismatch ? executeAndrewsCnvCnnOperationalHandler(operation, {
        sourceFrame,
        operationFrame
      }) : null;
      const generated = Boolean(handled?.surface);
      const sourceFormulaEcho = handled?.sourceFormulaEcho || buildAndrewsCnvCnnOperationalSourceFormulaEcho({
        sourceStem: sourceStem || sourceCore || sourcePredicate || sourceVnc
      });
      const targetFormulaEcho = handled?.formulaEcho || "";
      const sourceToTargetFormulaEcho = sourceFormulaEcho && targetFormulaEcho ? `${sourceFormulaEcho} -> ${targetFormulaEcho}` : "";
      return {
        kind: "andrews-cnv-cnn-operational-suboperation-frame",
        version: 1,
        operationId: resolvedOperationId,
        nominalKind: String(nominalKind || ""),
        nominalizationKind: String(nominalizationKind || ""),
        label: operation?.broadLabel || "",
        family: operation?.family || "",
        andrewsSection: operation?.andrewsSection || "",
        formulaTransition: operation ? "CNV->CNN" : "",
        sourceFormulaType: operation?.sourceFormula || "CNV",
        targetFormulaType: operation?.targetFormula || "CNN",
        operationPlan,
        executionKind: operationPlan?.executionKind || "",
        executableLogic: operationPlan?.executableLogic === true,
        canAttemptSurface: operationPlan?.canAttemptSurface === true,
        routeStage: generated ? "execute-cnv-cnn-operational-suboperation" : "classify-cnv-cnn-operational-suboperation",
        generationAllowed: generated,
        status: generated ? "andrews-logic-generated" : operation ? "source-gated" : "unknown-suboperation",
        source: {
          stem: sourceFrame?.sourceStem || "",
          tense: sourceFrame?.sourceTense || "",
          voice: sourceFrame?.sourceVoice || "",
          patientiveFamily: sourceFrame?.patientiveFamily || "",
          sourceFrameKind: sourceFrame?.kind || "",
          operationFrameId: operationFrame?.operationId || ""
        },
        requirements: operation?.requires ? {
          ...operation.requires
        } : {},
        transform: operation?.transform ? {
          ...operation.transform
        } : {},
        builds: operation?.builds ? {
          ...operation.builds
        } : {},
        missingRequirements: frameMismatch === "source-frame-required" ? ["sourceFrame"] : frameMismatch === "operation-frame-required" ? ["operationFrame"] : missingRequirements,
        frameMismatch,
        operationApplied: handled?.operationApplied || "",
        targetStem: handled?.targetStem || "",
        connector: handled?.connector || "",
        sourceFormulaEcho,
        targetFormulaEcho,
        renderedFormulaEcho: targetFormulaEcho,
        formulaEcho: sourceToTargetFormulaEcho || targetFormulaEcho,
        sourceToTargetFormulaEcho,
        surface: handled?.surface || "",
        surfaceForms: handled?.surfaceForms || [],
        ...(sourceFrame ? {
          sourceFrame
        } : {}),
        ...(operationFrame ? {
          operationFrame
        } : {}),
        diagnostics: [operation ? "andrews-cnv-cnn-suboperation-recognized" : "andrews-cnv-cnn-suboperation-unknown", generated ? "andrews-cnv-cnn-suboperation-generated" : "andrews-cnv-cnn-suboperation-source-gated", ...(frameMismatch ? [`andrews-cnv-cnn-operational-${frameMismatch}`] : []), ...(frameMismatch === "source-frame-required" ? ["missing-sourceFrame"] : frameMismatch === "operation-frame-required" ? ["missing-operationFrame"] : frameMismatch ? [] : missingRequirements.map(key => `missing-${key}`))],
        orthography: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          classicalSpellingRole: "structural-only",
          noClassicalSurfaceImport: true
        }
      };
    }
    const LESSON35_PRETERIT_AGENTIVE_VALIDATION_REFS = Object.freeze(["src/tests/nnc_nominalization.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON35_PRETERIT_AGENTIVE_PDF_REFS = Object.freeze(["Andrews Lesson 35.1", "Andrews Lesson 35.2", "Andrews Lesson 35.3", "Andrews Lesson 35.4", "Andrews Lesson 35.5", "Andrews Lesson 35.6", "Andrews Lesson 35.7", "Andrews Lesson 35.8", "Andrews Lesson 35.9", "Andrews Lesson 35.10", "Andrews Lesson 35.11", "Andrews Lesson 35.12"]);
    const LESSON35_NOMINALIZATION_OVERVIEW_FRAME = Object.freeze({
      kind: "lesson-35-nominalization-overview-frame",
      sourceSections: Object.freeze(["Andrews 35.1", "Andrews 35.2"]),
      process: "VNC takes on NNC characteristics",
      functionalNominalizationIsSupplementation: true,
      structuralNominalizationFocus: true,
      eightNominalizedVncKinds: true,
      lesson35Kind: "preterit-agentive-nnc",
      preteritAgentiveNamesAgentOfAction: true,
      restrictedUseStem: "preterit-tense VNC predicate reanalyzed as nounstem",
      generalUseStem: "compound nounstem with restricted preterit predicate as embed"
    });
    const LESSON35_ABSOLUTIVE_PRETERIT_AGENTIVE_FRAME = Object.freeze({
      kind: "lesson-35-absolutive-preterit-agentive-frame",
      sourceSection: "Andrews 35.3",
      conversion: "preterit-tense VNC predicate reanalyzed into absolutive-state NNC formula",
      vncPredicateBecomesNounstem: true,
      projectiveObjectInsideNounstem: Object.freeze(["te", "tla"]),
      mainlineReflexiveObjectInsideNounstem: Object.freeze(["n-o", "t-o", "m-o"]),
      preteritTenseMorphAlwaysFinalInRestrictedStem: true,
      sourceSubjectNumberMorphsContinue: true,
      oftenKeepsQuiInsteadOfSilentZero: true,
      antecessiveOrderParticleDoesNotAppearOnNnc: true,
      monomorphemicClassATendsToUseCustomaryPresentAgentiveInstead: true,
      classFamiliesCovered: Object.freeze(["Class A dimorphemic", "Class B", "Class C", "Class D"]),
      singleObjectSourcesSupportedStructurally: true,
      pluralAffinityStemCanBeObligatoryOrOptional: true,
      preteritAsPresentAgentivePossible: true,
      passiveSourceCanYieldRarePreteritPatientiveNnc: true,
      compoundStemSourcesPossible: true
    });
    const LESSON35_NUMBER_POSITION_FRAME = Object.freeze({
      kind: "lesson-35-number-position-frame",
      sourceSection: "Andrews 35.4",
      classBCDNormallySingularCommonQui: true,
      silentZeroCanBeExpectedOrCommonInSomeLexemes: true,
      quiAndZeroCanAlternate: true,
      silentZeroTendsTowardNonanimateAgencyMeansMeaning: true,
      tendencyIsNotRule: true,
      quiZeroAlternationCanSeparateAnimateFromNonanimateMeaning: true,
      nonspecificProjectiveCanActivateAndEscapeNounstem: true,
      activatedProjectiveCreatesVerbalNominalHybrid: true
    });
    const LESSON35_GENERAL_USE_FRAME = Object.freeze({
      kind: "lesson-35-general-use-preterit-agentive-frame",
      sourceSection: "Andrews 35.5",
      stemKind: "general-use-preterit-agentive-nounstem",
      formation: "restricted preterit predicate embed plus (ca)-tl matrix",
      strictlyNounstem: true,
      occursInPossessiveState: true,
      occursInAdverbializedNncs: true,
      occursAsEmbedInNominalAndVerbalCompoundStems: true,
      reflexiveSourceUsesShuntlineNeWhenDemotedToEmbed: true,
      preteritTenseMorphImmediatelyLeftOfCa: true,
      rareAbsolutiveQueMatrixVariant: true
    });
    const LESSON35_POSSESSIVE_STATE_FRAME = Object.freeze({
      kind: "lesson-35-possessive-state-preterit-agentive-frame",
      sourceSection: "Andrews 35.6",
      generalUseStemClass: "Subclass 1-A ti nounstem",
      singularSubjectNumberDyad: "uh-0",
      pluralSubjectNumberDyad: "hu-an",
      possessorIsExternalToSourceVncSubject: true,
      sourceReflexiveMapsToShuntlineNeInGeneralUseStem: true,
      irregularYoMatrixPossessivesPossible: true,
      preteritPatientivePossessiveCounterpartPossible: true,
      yaUhGeneralUseWithTePossessorBlursToTi: true
    });
    const LESSON35_COMPOUND_EMBED_FRAME = Object.freeze({
      kind: "lesson-35-compound-embed-frame",
      sourceSection: "Andrews 35.7",
      generalUsePreteritAgentiveEmbedsInCompoundStems: true,
      ordinaryCompoundNncsSupportedStructurally: true,
      compoundVncsSupportedStructurally: true,
      compoundAffectiveNncsSupportedStructurally: true,
      activatedProjectiveHybridCanOccurInAffectiveNncs: true,
      finiteExpansionRequiresStructuredMatrixSource: true
    });
    const LESSON35_OLD_PERSON_FRAME = Object.freeze({
      kind: "lesson-35-old-woman-old-man-frame",
      sourceSection: "Andrews 35.8",
      usesPreteritAgentiveNncsForOldWomanAndOldMan: true,
      oldWomanSource: "(ilama-ti)",
      oldManSource: "(hue-hue-ti)",
      singularSubjectNumberNormallySilentZero: true,
      generalUseEmbedsInAffectiveStems: true,
      generalUseEmbedsWithYoMatrixForOldPersonhood: true,
      distinguishesSimpleNounstemFromPreteritAgentiveStem: true,
      huehuehEmbedStemIsNotSameAsPreteritAgentiveStem: true,
      flawedSubjectAffectiveVariantExists: true
    });
    const LESSON35_OWNERHOOD_FRAME = Object.freeze({
      kind: "lesson-35-ownerhood-frame",
      sourceSection: "Andrews 35.9",
      role: "preterit-agentive NNC of ownerhood",
      languageLacksSingleStemHavePossessVnc: true,
      sourceFormation: "incorporated-object compound plus ownerhood matrix, then nominalized preterit",
      ownerhoodMatrices: Object.freeze(["*tla-(-e)", "*tla-(-hua)"]),
      matricesOnlyOccurInThisIncorporatedObjectFormation: true,
      vncUseLimitedToConnectiveTCompoundEmbeds: true,
      preteritTenseMorphOnlyAssociatingTense: true,
      singularCommonNumberNormallySilentZero: true,
      quiPossible: true,
      incorporatedNounstemUsesGeneralUseShape: true,
      matrixChoiceDeterminedPrimarilyByForelyingSoundAndNounstemClass: true,
      tlaEIncorporates: Object.freeze(["most tli class except final w or glottal", "ti subclass 2-B", "ti subclass 2-C without supportive i", "ti subclass 2-A glottalized embeds"]),
      tlaHuaIncorporates: Object.freeze(["ti subclass 1", "tli stems ending in w or glottal", "in stems", "zero stems"]),
      preteritAgentiveNounstemCanBeIncorporatedByTlaHua: true,
      recursiveOwnerhoodPossible: true
    });
    const LESSON35_ABUNDANT_OWNERHOOD_FRAME = Object.freeze({
      kind: "lesson-35-abundant-ownerhood-frame",
      sourceSection: "Andrews 35.10",
      matrix: "*tla-(-yo-a)",
      meaning: "own abundantly, characteristically, or in every part",
      compoundVerbstemLimitedToPreteritAndConnectiveTEmbed: true,
      nominalizingTransformationCreatesNounstem: true,
      stemInitialYAssimilationApplies: true,
      canIncorporatePreteritAgentiveNounstemAsObject: true
    });
    const LESSON35_OWNERHOOD_ANALYSIS_FRAME = Object.freeze({
      kind: "lesson-35-ownerhood-analysis-frame",
      sourceSection: "Andrews 35.11",
      ownerhoodNncsCanBeRestrictedOrGeneralUse: true,
      ownerhoodTranslationRequiresAnimacyAndContext: true,
      abundantOwnerhoodCanDifferFromPlainOwnerhoodByAnimacyMeaning: true,
      ownerhoodNounstemsCanEmbedInCompoundAffectiveNncs: true,
      literalHaveTranslationsAreDiagnosticsNotSurfaceAuthority: true
    });
    const LESSON35_VNC_EMBED_ADVERBIAL_FRAME = Object.freeze({
      kind: "lesson-35-vnc-embed-adverbial-frame",
      sourceSection: "Andrews 35.12",
      preteritAgentiveNounstemCanBeIncorporatedObjectInVnc: true,
      moreFrequentUse: "incorporated adverb of manner",
      adverbialModificationCanFocusSubjectOrObject: true,
      reflexiveShapeDependsOnMatrixValence: true,
      intransitiveMatrixKeepsMainlineReflexiveRespondingToSubject: true,
      transitiveMatrixUsesShuntlineReflexive: true,
      tlaFusionCanMakeMatrixIntransitive: true,
      lexicalizedEmbedMayKeepNonFirstPersonMainlineReflexive: true
    });
    const LESSON35_PRETERIT_AGENTIVE_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson35-nominalization",
      andrewsSection: "35.1",
      category: "structural-nominalization",
      directiveEs: "La nominalizacion estructural convierte una CNV en una CNN; la suplementacion funcional queda fuera del motor de palabra.",
      engineSurface: "diagnostic nominalization overview frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson35-preterit-agentive",
      andrewsSection: "35.2",
      category: "preterit-agentive-nnc",
      directiveEs: "El agentivo preterito nombra al agente y separa tronco de uso restringido y tronco de uso general.",
      engineSurface: "diagnostic preterit-agentive overview frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson35-absolutive-preterit-agentive",
      andrewsSection: "35.3",
      category: "absolutive-preterit-agentive",
      directiveEs: "La CNN absolutiva reanaliza el predicado preterito como tronco nominal; el morfo preterito queda al final del tronco restringido.",
      engineSurface: "partial generated preterit-agentive output plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson35-number-position",
      andrewsSection: "35.4",
      category: "preterit-agentive-number-position",
      directiveEs: "La posicion de numero alterna qui y cero segun clase, uso y tendencia animada/no animada; no debe ocultarse como regla unica.",
      engineSurface: "diagnostic number-position frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson35-general-use",
      andrewsSection: "35.5",
      category: "general-use-preterit-agentive",
      directiveEs: "El uso general es compuesto: predicado preterito incrustado mas matriz ca; el reflexivo de fuente pasa a ne.",
      engineSurface: "partial general-use stem continuations plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson35-possessive-state",
      andrewsSection: "35.6",
      category: "possessive-preterit-agentive",
      directiveEs: "La CNN posesiva usa el tronco general con conectores w/wan; el poseedor es externo al sujeto de la CNV fuente.",
      engineSurface: "partial possessive preterit-agentive output plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson35-compound-embeds",
      andrewsSection: "35.7",
      category: "preterit-agentive-compound-embed",
      directiveEs: "El tronco general puede incrustarse en CNN/CNV compuestas y afectivas; matrices nuevas requieren fuente Andrews concreta y puente ortografico.",
      engineSurface: "partial compound continuation contracts plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson35-old-person",
      andrewsSection: "35.8",
      category: "old-woman-old-man",
      directiveEs: "Anciana y anciano suelen expresarse como agentivos preteritos; no se confunden con troncos simples ni con incrustados homofonos.",
      engineSurface: "diagnostic old-person boundary frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson35-ownerhood",
      andrewsSection: "35.9",
      category: "ownerhood-preterit-agentive",
      directiveEs: "La posesion se forma con compuestos de objeto incorporado y matrices e/wa; la seleccion depende de clase y sonido anterior.",
      engineSurface: "partial ownerhood continuation contracts plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson35-abundant-ownerhood",
      andrewsSection: "35.10",
      category: "abundant-ownerhood",
      directiveEs: "La posesion abundante usa matriz yua/yuwa estructural, restringida al entorno preterito/conectivo documentado.",
      engineSurface: "partial abundant-ownerhood continuation contracts plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson35-ownerhood-analysis",
      andrewsSection: "35.11",
      category: "ownerhood-analysis-translation",
      directiveEs: "La glosa de tener depende de analisis, animacidad y contexto; la traduccion no autoriza formas.",
      engineSurface: "diagnostic ownerhood analysis frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson35-vnc-embed-adverbial",
      andrewsSection: "35.12",
      category: "preterit-agentive-vnc-embed-adverbial",
      directiveEs: "El agentivo preterito puede ser objeto incorporado o adverbio de modo; el reflexivo depende de la valencia de la matriz.",
      engineSurface: "partial incorporated-complement/adverbial continuations plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    })]);
    function cloneNominalizationLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneNominalizationLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneNominalizationLessonRecord(value)]));
    }
    function buildLesson35PreteritAgentiveIncorporationObjectSlotOwnershipFrame({
      embedRole = "",
      matrixValence = "",
      consumedObjectSlot = "",
      sourceExternalObjectSlots = [],
      remainingExternalObjectSlots = []
    } = {}) {
      const sourceSlots = Array.isArray(sourceExternalObjectSlots) ? sourceExternalObjectSlots : [];
      const remainingSlots = Array.isArray(remainingExternalObjectSlots) ? remainingExternalObjectSlots : [];
      const resolvedMatrixValence = String(matrixValence || "").trim();
      return {
        kind: "lesson-35-preterit-agentive-incorporation-object-slot-ownership-frame",
        version: 1,
        embedRole: String(embedRole || "").trim(),
        matrixValence: resolvedMatrixValence,
        matrixValenceFrameFixed: Boolean(resolvedMatrixValence),
        consumedObjectSlot: String(consumedObjectSlot || "").trim(),
        consumedObjectSlotOwnedBy: consumedObjectSlot ? "route-frame" : "none",
        sourceExternalObjectSlots: sourceSlots.map(slot => ({
          ...slot
        })),
        remainingExternalObjectSlots: remainingSlots.map(slot => ({
          ...slot
        })),
        sourceExternalObjectSlotIds: sourceSlots.map(slot => String(slot?.slotId || "")).filter(Boolean),
        remainingExternalObjectSlotIds: remainingSlots.map(slot => String(slot?.slotId || "")).filter(Boolean),
        remainingExternalObjectSlotsOwnedBy: remainingSlots.length ? "matrix-route-frame" : "none",
        embeddedRoleLicensedBy: embedRole ? "lesson-35-preterit-agentive-incorporation-route-frame" : "none",
        routeFrameOwnsObjectSlotLicensing: Boolean(resolvedMatrixValence),
        functionUseOwnsObjectSlots: false,
        finalFormulaShapeOwnsObjectSlots: false,
        functionUseMayAnnotateLicensedReadingsOnly: true,
        objectSlotLicensingOrder: ["source-principal-vnc", "preterit-agentive-nnc", "matrix-valence-frame", "route-frame", "function-use-annotation"]
      };
    }
    function buildLesson35PreteritAgentiveIncorporationRouteFrame({
      embedRole = "",
      matrixValence = "",
      matrixFamilies = [],
      consumedObjectSlot = "",
      sourceExternalObjectSlots = [],
      remainingExternalObjectSlots = [],
      valenceDelta = {},
      generationStatus = "diagnostic-only-source-gated"
    } = {}) {
      const sourceSlots = Array.isArray(sourceExternalObjectSlots) ? sourceExternalObjectSlots : [];
      const remainingSlots = Array.isArray(remainingExternalObjectSlots) ? remainingExternalObjectSlots : [];
      const objectSlotOwnership = buildLesson35PreteritAgentiveIncorporationObjectSlotOwnershipFrame({
        embedRole,
        matrixValence,
        consumedObjectSlot,
        sourceExternalObjectSlots: sourceSlots,
        remainingExternalObjectSlots: remainingSlots
      });
      return {
        kind: "lesson-35-preterit-agentive-incorporation-route-frame",
        version: 1,
        sourcePrincipalVnc: {
          formulaType: "CNV",
          sourceSection: "Andrews 35.12",
          surface: "",
          generationStatus
        },
        sourceAdjunctNnc: {
          formulaType: "CNN",
          stemKind: "preterit-agentive-nounstem",
          role: String(embedRole || "").trim(),
          sourceSection: "Andrews 35.12"
        },
        matrix: {
          valence: String(matrixValence || "").trim(),
          families: Array.from(matrixFamilies || [])
        },
        matrixValence,
        embedRole: String(embedRole || "").trim(),
        consumedObjectSlot: String(consumedObjectSlot || "").trim(),
        sourceExternalObjectSlots: sourceSlots.map(slot => ({
          ...slot
        })),
        remainingExternalObjectSlots: remainingSlots.map(slot => ({
          ...slot
        })),
        remainingExternalObjectSlotIds: remainingSlots.map(slot => String(slot?.slotId || "")).filter(Boolean),
        objectSlotOwnership,
        valenceDelta: {
          ...valenceDelta
        },
        andrewsSection: "Andrews 35.12",
        generationStatus,
        routeFrameLicensesEmbedRole: true,
        routeFrameLicensesObjectSlotOwnership: objectSlotOwnership.matrixValenceFrameFixed === true,
        finalFormulaShape: "preterit-agentive-nounstem-incorporated-in-vnc-matrix",
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseObjectSlots: true,
        sourceRouteFrameRequired: true
      };
    }
    function getLesson35PreteritAgentiveSubsectionInventory() {
      return LESSON35_PRETERIT_AGENTIVE_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
        validationRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_VALIDATION_REFS)
      }));
    }
    function buildLesson35PreteritAgentivePursuitFrame() {
      const subsectionInventory = getLesson35PreteritAgentiveSubsectionInventory();
      const overviewFrame = cloneNominalizationLessonRecord(LESSON35_NOMINALIZATION_OVERVIEW_FRAME);
      const absolutiveFrame = cloneNominalizationLessonRecord(LESSON35_ABSOLUTIVE_PRETERIT_AGENTIVE_FRAME);
      const numberPositionFrame = cloneNominalizationLessonRecord(LESSON35_NUMBER_POSITION_FRAME);
      const generalUseFrame = cloneNominalizationLessonRecord(LESSON35_GENERAL_USE_FRAME);
      const possessiveStateFrame = cloneNominalizationLessonRecord(LESSON35_POSSESSIVE_STATE_FRAME);
      const compoundEmbedFrame = cloneNominalizationLessonRecord(LESSON35_COMPOUND_EMBED_FRAME);
      const oldPersonFrame = cloneNominalizationLessonRecord(LESSON35_OLD_PERSON_FRAME);
      const ownerhoodFrame = cloneNominalizationLessonRecord(LESSON35_OWNERHOOD_FRAME);
      const abundantOwnerhoodFrame = cloneNominalizationLessonRecord(LESSON35_ABUNDANT_OWNERHOOD_FRAME);
      const ownerhoodAnalysisFrame = cloneNominalizationLessonRecord(LESSON35_OWNERHOOD_ANALYSIS_FRAME);
      const vncEmbedAdverbialFrame = cloneNominalizationLessonRecord(LESSON35_VNC_EMBED_ADVERBIAL_FRAME);
      const incorporatedObjectRouteFrame = buildLesson35PreteritAgentiveIncorporationRouteFrame({
        embedRole: "incorporated-object",
        matrixValence: "object-incorporating-vnc-matrix-valence",
        matrixFamilies: ["preterit-agentive-object-incorporation"],
        consumedObjectSlot: "obj1",
        valenceDelta: {
          incorporatedObjectSlots: 1,
          adverbialFunctionSlots: 0,
          remainingExternalObjectSlots: 0
        }
      });
      const incorporatedAdverbRouteFrame = buildLesson35PreteritAgentiveIncorporationRouteFrame({
        embedRole: "incorporated-adverb",
        matrixValence: "adverbial-manner-vnc-matrix-valence",
        matrixFamilies: ["intransitive-matrix", "transitive-matrix"],
        consumedObjectSlot: "",
        valenceDelta: {
          incorporatedObjectSlots: 0,
          adverbialFunctionSlots: 1,
          remainingExternalObjectSlots: 0
        }
      });
      vncEmbedAdverbialFrame.incorporatedObjectRouteFrame = incorporatedObjectRouteFrame;
      vncEmbedAdverbialFrame.incorporatedAdverbRouteFrame = incorporatedAdverbRouteFrame;
      vncEmbedAdverbialFrame.routeFrames = [incorporatedObjectRouteFrame, incorporatedAdverbRouteFrame];
      vncEmbedAdverbialFrame.objectSlotOwnershipFrames = [incorporatedObjectRouteFrame.objectSlotOwnership, incorporatedAdverbRouteFrame.objectSlotOwnership];
      const remainingGaps = ["Current preterit-agentive generation and continuations are partial, not complete Lesson 35 coverage.", "Number-position alternations, affinity-stem selection, activated projective-object hybrids, old-person lexical boundaries, and all matrix subclass selections remain diagnostic.", "Ownerhood e/wa/yua continuations are limited to current Nawat data-backed matrices and class-compatible defaults.", "Object-focused adverbial matrices, lexicalized reflexive exceptions, rare que-matrix absolutives, and complete orthography-bridge examples remain evidence-needed."];
      const frame = {
        kind: "lesson-35-preterit-agentive-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 35,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_PDF_REFS),
        plannedArrows: [{
          id: "lesson-35-preterit-agentive-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 35.1-35.12 against current nominalization boundary metadata, preterit-agentive restricted/general-use stems, possessive state, compound embeds, old-person formations, ownerhood, abundant ownerhood, and VNC embed/adverbial continuations.",
          andrewsRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-35-preterit-agentive-audit",
          result: "hit",
          correction: "Lesson 35 now records Andrews preterit-agentive nominalization architecture, restricted and general-use stems, number-position alternations, possessive-state behavior, compound embeds, old-person formations, ownerhood and abundant-ownerhood matrices, translation boundaries, and VNC embed/adverbial roles while preserving evidence gates.",
          andrewsRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_PDF_REFS),
          feedbackRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_VALIDATION_REFS)
        }],
        subsectionInventory,
        overviewFrame,
        absolutiveFrame,
        numberPositionFrame,
        generalUseFrame,
        possessiveStateFrame,
        compoundEmbedFrame,
        oldPersonFrame,
        ownerhoodFrame,
        abundantOwnerhoodFrame,
        ownerhoodAnalysisFrame,
        vncEmbedAdverbialFrame,
        currentEngineBoundary: {
          nominalizationBoundaryMetadataImplemented: true,
          preteritAgentiveRestrictedUseOutputPartial: true,
          preteritAgentiveGeneralUseContinuationPartial: true,
          possessivePreteritAgentiveOutputPartial: true,
          ownerhoodContinuationPartial: true,
          abundantOwnerhoodContinuationPartial: true,
          incorporatedComplementContinuationPartial: true,
          adverbialMannerContinuationPartial: true,
          fullLesson35GenerationImplemented: false,
          finiteOutputExpansionAllowedOnlyWithAndrewsSource: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachNominalizationGrammarContract(frame, {
        metadataKind: "lesson-35-preterit-agentive-pursuit-frame",
        unitKind: "preterit-agentive-nnc-boundary",
        routeStage: "audit-lesson-35",
        structuralSource: "Andrews Lesson 35",
        andrewsRefs: Array.from(LESSON35_PRETERIT_AGENTIVE_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 35.1-35.12",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: "orthography-bridge-plus-source-gate-required"
        },
        morphBoundaryFrame: {
          overviewFrame,
          absolutiveFrame,
          numberPositionFrame,
          generalUseFrame,
          possessiveStateFrame,
          compoundEmbedFrame,
          oldPersonFrame,
          ownerhoodFrame,
          abundantOwnerhoodFrame,
          ownerhoodAnalysisFrame,
          vncEmbedAdverbialFrame
        },
        stemFrame: {
          stemKind: "preterit-agentive-nnc",
          restrictedUseStem: overviewFrame.restrictedUseStem,
          generalUseStem: overviewFrame.generalUseStem,
          generalUseMatrix: "(ca)-tl",
          ownerhoodMatrices: ownerhoodFrame.ownerhoodMatrices,
          abundantOwnerhoodMatrix: abundantOwnerhoodFrame.matrix
        },
        nuclearClauseFrame: {
          categoryTransition: "VNC -> NNC",
          sourceClauseKind: "CNV",
          targetClauseKind: "CNN",
          structuralNominalization: true,
          functionalSupplementationOutOfScope: true,
          preteritTenseMorphInsideNominalStem: true
        },
        participantFrame: {
          semanticRole: "agent or owner",
          projectiveObjectInsideRestrictedStem: absolutiveFrame.projectiveObjectInsideNounstem,
          possessorSource: "external possessor in possessive preterit-agentive NNC",
          adverbialFocusCanTargetSubjectOrObject: vncEmbedAdverbialFrame.adverbialModificationCanFocusSubjectOrObject,
          incorporatedObjectRouteFrame,
          incorporatedAdverbRouteFrame
        },
        targetContract: {
          metadataKind: "lesson-35-preterit-agentive-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["preterit-agentive-diagnostic-partial", "preterit-agentive-source-gated"]
      });
    }
    const LESSON36_NOMINALIZED_VNC_VALIDATION_REFS = Object.freeze(["src/tests/nnc_nominalization.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON36_NOMINALIZED_VNC_PDF_REFS = Object.freeze(["Andrews Lesson 36.1", "Andrews Lesson 36.2", "Andrews Lesson 36.3", "Andrews Lesson 36.4", "Andrews Lesson 36.5", "Andrews Lesson 36.6", "Andrews Lesson 36.7", "Andrews Lesson 36.8", "Andrews Lesson 36.9", "Andrews Lesson 36.10", "Andrews Lesson 36.11", "Andrews Lesson 36.12"]);
    const LESSON36_CUSTOMARY_PRESENT_AGENTIVE_FRAME = Object.freeze({
      kind: "lesson-36-customary-present-agentive-frame",
      sourceSections: Object.freeze(["Andrews 36.1", "Andrews 36.2", "Andrews 36.3", "Andrews 36.4"]),
      sourceVoice: "active",
      sourceTense: "customary-present",
      twoDegreesOfNominalization: Object.freeze(["reanalysis", "fully nominalized"]),
      reanalysisFrame: Object.freeze({
        sourcePredicateBecomesNounstem: true,
        valencePositionMovesInsideNounstem: true,
        projectiveObjectInsideNounstem: Object.freeze(["te", "tla"]),
        reflexiveObjectInsideNounstem: Object.freeze(["n-o", "t-o", "m-o"]),
        customaryPresentNiAlwaysFinalConstituent: true,
        vncNumberDyadsRemain: Object.freeze(["0-0", "0-h"]),
        mostlyAbsolutiveState: true,
        possessiveParadigmNormallyFilledByPreteritAgentive: true,
        rarePossessiveReanalysisKeepsVncNumberDyads: true,
        finalIOfNiMayDropInSingularPossessive: true
      }),
      fullyNominalizedFrame: Object.freeze({
        numberFillersBecomeTiSubclass1A: true,
        absolutiveSingularTlIsUncommon: true,
        normalSingularUsesZeroVariant: true,
        canFillEmbedSubpositionOfCompoundStem: true,
        affectiveCompoundsNormallyPreferPreteritAgentiveStem: true,
        affectiveExceptionsExist: true,
        niFinalIMayDropInEmbedOrVocative: true,
        projectiveObjectCanActivateIntoHybrid: true,
        incorporatedComplementHybridUsesLesson35Procedure: true
      }),
      contrastWithPreteritAgentive: Object.freeze({
        customaryPresentMayNotAlwaysMeanHabitualInTranslation: true,
        synonymyMayBeTranslationMirage: true,
        preteritAndCustomaryPresentMayDistinguishPunctualFromHabitualOrStateMeaning: true
      })
    });
    const LESSON36_CUSTOMARY_PRESENT_PATIENTIVE_FRAME = Object.freeze({
      kind: "lesson-36-customary-present-patientive-frame",
      sourceSection: "Andrews 36.5",
      sourceVoice: "passive",
      sourceTense: "customary-present",
      sourcePredicateBecomesNounstem: true,
      semanticRole: "patient-or-undergoer",
      meaningExtension: "customarily treated, worthy or fit to be treated",
      equivalentToPotentialPatientInSomeMeanings: true,
      notInstrumentive: true,
      singleObjectProjectiveSourceDropsProjectiveObject: true,
      reflexiveObjectUsesShuntlineNe: true,
      possessiveStateAllowed: false,
      passiveStemVariantsCanCreateNounstemVariants: true,
      doubleProjectivePassiveTeNamesNonanimateEntity: true,
      doubleProjectivePassiveTlaNamesAnimateEntity: true,
      pluralSubjectUsesMeh: true,
      pluralMehPresupposesFullNominalization: true
    });
    const LESSON36_INSTRUMENTIVE_FRAME = Object.freeze({
      kind: "lesson-36-instrumentive-frame",
      sourceSection: "Andrews 36.6",
      semanticRole: "instrument-faculty-means",
      paradigmRequiresTwoDifferentNominalizedStems: true,
      absolutiveStateSource: Object.freeze({
        sourceVoice: "impersonal",
        sourceTense: "customary-present",
        sourcePredicateBecomesNounstem: true,
        noSpecificParticipantForPossessorTransform: true,
        possessiveNormallyImpossible: true
      }),
      possessiveStateSource: Object.freeze({
        sourceVoice: "active",
        sourceTense: "imperfect-indicative",
        sourcePredicateBecomesNounstem: true,
        sourceSubjectTransformsToPossessor: true,
        mainlineReflexiveBecomesShuntline: true,
        importedNonanimateSubjectCommonNumber: true,
        nounstemClass: "ti Subclass 1-B"
      }),
      nonactiveHuaCanHaveHualoVariant: true,
      supportiveInitialIDropsAfterTlaAndOftenAfterNe: true,
      absolutiveAndPossessiveCanDifferPragmatically: true,
      exceptionsToStateDistributionExist: true,
      instrumentiveNounstemsNameSetDefinedEntities: true
    });
    const LESSON36_PRESENT_AGENTIVE_FRAME = Object.freeze({
      kind: "lesson-36-present-agentive-frame",
      sourceSection: "Andrews 36.7",
      sourceTense: "present-indicative",
      sourcePredicateBecomesNounstem: true,
      stateRestriction: "absolutive-only",
      canLexicalizeAsProperOrMetaphoricalNounstem: true,
      lexicalizedStemCanOccurInPossessiveStateByMeaningExtension: true,
      canServeAsMatrixInCompoundNounstemWhenLexicalized: true
    });
    const LESSON36_FUTURE_AGENTIVE_FRAME = Object.freeze({
      kind: "lesson-36-future-agentive-frame",
      sourceSection: "Andrews 36.8",
      rarity: "rare",
      restrictedUseStem: "future-tense VNC predicate",
      futureTenseMorphZFinalInRestrictedStem: true,
      singularSubjectNumberDyad: "qui-0",
      pluralSubjectNumberDyad: "qu-eh",
      singularDoesNotUseSilentFutureVncDyad: true,
      generalUseStem: "future restricted stem embedded before (ca)-tl matrix",
      generalUseClass: "ti Subclass 1-A",
      possessorImportedFromOutsideSourceVnc: true,
      generalUseCanEmbedInCompoundStems: true,
      restrictedUseCanLexicalizeAsEmbedStem: true
    });
    const LESSON36_ACTION_NNC_FRAME = Object.freeze({
      kind: "lesson-36-action-nnc-frame",
      sourceSections: Object.freeze(["Andrews 36.9", "Andrews 36.10", "Andrews 36.11", "Andrews 36.12"]),
      semanticRange: Object.freeze(["action", "process", "event", "resultant state", "instance or result of action"]),
      types: Object.freeze(["passive-action", "active-action"]),
      restrictedUseStemIsCompoundedForActionNncs: true,
      passiveActionFrame: Object.freeze({
        sourceSection: "Andrews 36.10",
        sourceVoice: "passive",
        sourceTense: "distant-past",
        generalUseInPossessiveState: true,
        distantPastCaFinalInGeneralUseStem: true,
        objectPronounsDeterminedByPassiveSource: true,
        sourceSubjectTransformsToPossessor: true,
        importedNonanimateSubjectCommonNumber: true,
        nounstemClass: "ti Subclass 1-B",
        restrictedAbsolutiveStem: "general-use stem embedded before *(-yo)-tl matrix",
        absolutiveCommonNumberOnly: true,
        yoCompoundCanAlsoFormSynonymousPossessiveState: true
      }),
      activeActionFrame: Object.freeze({
        sourceSection: "Andrews 36.11",
        sourceVoice: "active",
        sourceTense: "distant-past",
        sourceScope: "intransitive sources and a few reflexive-object transitive sources",
        generalUseInPossessiveState: true,
        distantPastCaFinalInGeneralUseStem: true,
        mainlineReflexiveBecomesShuntline: true,
        sourceSubjectTransformsToPossessor: true,
        importedNonanimateSubjectCommonNumber: true,
        nounstemClass: "ti Subclass 1-B",
        idiomaticMeansOrSourceMeaningsCommon: true,
        resultOrResultantStateMeaningsCommon: true,
        rootPlusYaUsesObsoleteDistantPastRootPredicate: true,
        restrictedAbsolutiveStem: "general-use stem embedded before *(-yo)-tl matrix",
        yoCompoundCanAlsoFormSynonymousPossessiveState: true
      }),
      contrastFrame: Object.freeze({
        sourceSection: "Andrews 36.12",
        activeActionStemHasDistantPastCa: true,
        preteritAgentiveStemHasPreteritZeroPlusCaMatrix: true,
        activeActionSourceSubjectBecomesPossessor: true,
        preteritAgentiveSourceSubjectRemainsNncSubject: true,
        activeActionMeansActionResultOrCondition: true,
        preteritAgentiveNamesDoerOrStateEntrant: true,
        passiveActionDiffersFromPreteritPatientiveByActionVersusUndergoneEntity: true
      })
    });
    const LESSON36_NOMINALIZED_VNC_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson36-customary-present-agentive",
      andrewsSection: "36.1",
      category: "customary-present-agentive-overview",
      directiveEs: "El agentivo presente habitual tiene dos grados: reanalisis y nominalizacion plena.",
      engineSurface: "partial customary-agentive output plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson36-customary-present-reanalysis",
      andrewsSection: "36.2",
      category: "customary-present-agentive-reanalysis",
      directiveEs: "El reanalisis conserva dyadas de CNV y deja ni como ultimo constituyente del tronco.",
      engineSurface: "diagnostic reanalysis frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson36-fully-nominalized-customary-present",
      andrewsSection: "36.3",
      category: "fully-nominalized-customary-present-agentive",
      directiveEs: "La nominalizacion plena cambia a conectores de CNN de clase ti 1-A y puede incrustarse en compuestos.",
      engineSurface: "partial generated customary-agentive continuations plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson36-agentive-contrast",
      andrewsSection: "36.4",
      category: "preterit-vs-customary-present-agentive",
      directiveEs: "La sinonimia puede ser espejismo de traduccion; el contraste temporal-semantic debe mantenerse visible en metadatos.",
      engineSurface: "diagnostic contrast frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson36-customary-present-patientive",
      andrewsSection: "36.5",
      category: "customary-present-patientive",
      directiveEs: "El patientivo presente habitual viene de pasiva, no toma posesivo, y expresa entidad apta o digna de ser tratada asi.",
      engineSurface: "partial patientive output plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson36-instrumentive",
      andrewsSection: "36.6",
      category: "instrumentive-nnc",
      directiveEs: "El instrumentivo usa dos fuentes: impersonal presente habitual para absolutivo y activa imperfecta para posesivo.",
      engineSurface: "partial instrumentive output plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson36-present-agentive",
      andrewsSection: "36.7",
      category: "present-agentive",
      directiveEs: "El agentivo presente convierte el predicado indicativo presente y se restringe normalmente al absolutivo.",
      engineSurface: "partial present-agentive output plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson36-future-agentive",
      andrewsSection: "36.8",
      category: "future-agentive",
      directiveEs: "El agentivo futuro es raro; el tronco restringido termina en z y el general usa matriz ca.",
      engineSurface: "partial future-agentive output plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson36-action-nncs",
      andrewsSection: "36.9",
      category: "action-nnc-overview",
      directiveEs: "Las CNN de accion nombran accion, proceso, evento, estado resultante o resultado; no son una sola etiqueta superficial.",
      engineSurface: "diagnostic action overview frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson36-passive-action",
      andrewsSection: "36.10",
      category: "passive-action-nnc",
      directiveEs: "La accion pasiva posesiva viene de pasiva remota con ca; el absolutivo restringido usa matriz yo.",
      engineSurface: "partial passive-action output plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson36-active-action",
      andrewsSection: "36.11",
      category: "active-action-first-type",
      directiveEs: "La accion activa nominalizada usa fuentes intransitivas o reflexivas remotas; el sujeto fuente se vuelve poseedor.",
      engineSurface: "partial active-action output plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson36-active-action-vs-preterit-agentive",
      andrewsSection: "36.12",
      category: "active-action-preterit-agentive-contrast",
      directiveEs: "Accion activa y agentivo preterito pueden sonar parecidos, pero difieren en estructura, clase, poseedor y significado.",
      engineSurface: "diagnostic contrast frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    })]);
    function getLesson36NominalizedVncSubsectionInventory() {
      return LESSON36_NOMINALIZED_VNC_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
        validationRefs: Array.from(LESSON36_NOMINALIZED_VNC_VALIDATION_REFS)
      }));
    }
    function buildLesson36NominalizedVncPursuitFrame() {
      const subsectionInventory = getLesson36NominalizedVncSubsectionInventory();
      const customaryPresentAgentiveFrame = cloneNominalizationLessonRecord(LESSON36_CUSTOMARY_PRESENT_AGENTIVE_FRAME);
      const customaryPresentPatientiveFrame = cloneNominalizationLessonRecord(LESSON36_CUSTOMARY_PRESENT_PATIENTIVE_FRAME);
      const instrumentiveFrame = cloneNominalizationLessonRecord(LESSON36_INSTRUMENTIVE_FRAME);
      const presentAgentiveFrame = cloneNominalizationLessonRecord(LESSON36_PRESENT_AGENTIVE_FRAME);
      const futureAgentiveFrame = cloneNominalizationLessonRecord(LESSON36_FUTURE_AGENTIVE_FRAME);
      const actionNncFrame = cloneNominalizationLessonRecord(LESSON36_ACTION_NNC_FRAME);
      const remainingGaps = ["Current Lesson 36 nominalized VNC routes are partial and do not complete all customary-present, present, future, patientive, instrumentive, passive-action, or active-action paradigms.", "Customary-present reanalysis versus full nominalization, rare possessive reanalysis, object-activation hybrids, and translation contrasts remain diagnostic.", "Instrumentive state-source exceptions, patientive passive variants, future-agentive rarity, and action-NNC restricted/general-use alternations need more Andrews source logic plus orthography-bridge support.", "Complete nounstem class routing, lexicalized exceptions, and Andrews source models plus orthography-bridge fixtures remain evidence-needed."];
      const frame = {
        kind: "lesson-36-nominalized-vnc-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 36,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON36_NOMINALIZED_VNC_PDF_REFS),
        plannedArrows: [{
          id: "lesson-36-nominalized-vnc-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 36.1-36.12 against current nominalization boundary metadata, customary-present agentive reanalysis/full nominalization, customary-present patientives, instrumentives, present/future agentives, action NNCs, passive-action, active-action, and active-action versus preterit-agentive contrasts.",
          andrewsRefs: Array.from(LESSON36_NOMINALIZED_VNC_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON36_NOMINALIZED_VNC_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-36-nominalized-vnc-audit",
          result: "hit",
          correction: "Lesson 36 now records Andrews nominalized VNC architecture for customary-present agentive reanalysis and full nominalization, customary-present patientives, instrumentives, present and future agentives, action NNCs, passive-action and active-action sources, and contrastive boundaries while preserving current evidence gates.",
          andrewsRefs: Array.from(LESSON36_NOMINALIZED_VNC_PDF_REFS),
          feedbackRefs: Array.from(LESSON36_NOMINALIZED_VNC_VALIDATION_REFS)
        }],
        subsectionInventory,
        customaryPresentAgentiveFrame,
        customaryPresentPatientiveFrame,
        instrumentiveFrame,
        presentAgentiveFrame,
        futureAgentiveFrame,
        actionNncFrame,
        currentEngineBoundary: {
          nominalizationBoundaryMetadataImplemented: true,
          customaryAgentiveGenerationPartial: true,
          customaryPresentPatientiveGenerationPartial: true,
          instrumentiveGenerationPartial: true,
          presentAgentiveGenerationPartial: true,
          futureAgentiveGenerationPartial: true,
          passiveActionGenerationPartial: true,
          activeActionGenerationPartial: true,
          fullLesson36GenerationImplemented: false,
          finiteOutputExpansionAllowedOnlyWithAndrewsSource: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachNominalizationGrammarContract(frame, {
        metadataKind: "lesson-36-nominalized-vnc-pursuit-frame",
        unitKind: "nominalized-vnc-boundary",
        routeStage: "audit-lesson-36",
        structuralSource: "Andrews Lesson 36",
        andrewsRefs: Array.from(LESSON36_NOMINALIZED_VNC_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 36.1-36.12",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: "orthography-bridge-plus-source-gate-required"
        },
        morphBoundaryFrame: {
          customaryPresentAgentiveFrame,
          customaryPresentPatientiveFrame,
          instrumentiveFrame,
          presentAgentiveFrame,
          futureAgentiveFrame,
          actionNncFrame
        },
        stemFrame: {
          stemKind: "nominalized-vnc",
          customaryPresentAgentiveDegrees: customaryPresentAgentiveFrame.twoDegreesOfNominalization,
          patientiveSourceVoice: customaryPresentPatientiveFrame.sourceVoice,
          instrumentiveParadigmRequiresTwoStems: instrumentiveFrame.paradigmRequiresTwoDifferentNominalizedStems,
          futureAgentiveGeneralUseStem: futureAgentiveFrame.generalUseStem,
          actionTypes: actionNncFrame.types
        },
        nuclearClauseFrame: {
          categoryTransition: "VNC -> NNC",
          sourceClauseKind: "CNV",
          targetClauseKind: "CNN",
          structuralNominalization: true,
          actionNncRestrictedUseStemIsCompounded: true
        },
        participantFrame: {
          customaryPresentAgentiveRole: "agent",
          patientiveRole: customaryPresentPatientiveFrame.semanticRole,
          instrumentiveRole: instrumentiveFrame.semanticRole,
          actionNncRange: actionNncFrame.semanticRange,
          activeActionSourceSubjectBecomesPossessor: actionNncFrame.activeActionFrame.sourceSubjectTransformsToPossessor,
          preteritAgentiveSourceSubjectRemainsNncSubject: actionNncFrame.contrastFrame.preteritAgentiveSourceSubjectRemainsNncSubject
        },
        targetContract: {
          metadataKind: "lesson-36-nominalized-vnc-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["nominalized-vnc-diagnostic-partial", "nominalized-vnc-source-gated"]
      });
    }
    const LESSON37_DEVERBAL_NOUNSTEM_VALIDATION_REFS = Object.freeze(["src/tests/nnc_nominalization.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS = Object.freeze(["Andrews Lesson 37.1", "Andrews Lesson 37.2", "Andrews Lesson 37.3", "Andrews Lesson 37.4", "Andrews Lesson 37.5", "Andrews Lesson 37.6", "Andrews Lesson 37.7", "Andrews Lesson 37.8", "Andrews Lesson 37.9"]);
    const LESSON37_DEVERBAL_OVERVIEW_FRAME = Object.freeze({
      kind: "lesson-37-deverbal-overview-frame",
      sourceSection: "Andrews 37.1",
      derivedFromVncCoreNotPredicate: true,
      sourceUnit: "VNC core",
      targetUnit: "deverbal nounstem",
      notMereVncReanalysis: true,
      notRelabeledConstituents: true,
      finiteOutputExpansionRequiresAndrewsSourceGate: true
    });
    const LESSON37_ACTIVE_ACTION_Z_FRAME = Object.freeze({
      kind: "lesson-37-active-action-z-frame",
      sourceSection: "Andrews 37.2",
      suffix: "z",
      nawatSuffix: "s",
      nounstemClass: "tli",
      activeActionSecondType: true,
      sourceCore: "future-tense verbcore",
      distinctFromFutureTenseMorph: true,
      possessorRepresentsResponsibleSourceSubject: true,
      subjectRestriction: "common nonanimate or nonspecific subject",
      normallyFollowsIFinalStem: true,
      aFinalUsesReplaciveImperfectiveI: true,
      fewTransitiveSources: true,
      nonIVowelExceptionsExist: true
    });
    const LESSON37_ACTIVE_ACTION_LIZ_FRAME = Object.freeze({
      kind: "lesson-37-active-action-liz-frame",
      sourceSection: "Andrews 37.3",
      suffixalUnit: "liz",
      nawatSuffixalUnit: "lis",
      compoundSuffixParts: Object.freeze(["l", "i", "z"]),
      notHamperedByZRestrictions: true,
      addedToFutureTenseVerbcore: true,
      classCDeletesFinalAAndLengthensIO: true,
      classDKeepsFinalALength: true,
      classAEndingOKeepsLongVowel: true,
      transitiveSourcesUseProjectives: Object.freeze(["te", "tla"]),
      reflexiveSourceUsesShuntlineNe: true,
      supportiveInitialIDropsAfterTla: true,
      supportiveInitialIDropsSometimesAfterNe: true,
      replaciveImperfectivePatterns: Object.freeze(["ka -> ki", "wa variants", "si/ci -> xi", "ti -> chi optional", "root+ya deletes ya", "denominal ti/hui+ya may delete or keep ya by subtype"])
    });
    const LESSON37_LIZ_TRANSLATION_FRAME = Object.freeze({
      kind: "lesson-37-liz-translation-frame",
      sourceSection: "Andrews 37.4",
      wayOfDoingTranslationValue: true,
      natureOrAppearanceTranslationValue: true,
      translationValueIsDiagnosticNotSurfaceAuthority: true
    });
    const LESSON37_ACTIVE_ACTION_PARTICULARS_FRAME = Object.freeze({
      kind: "lesson-37-active-action-particulars-frame",
      sourceSection: "Andrews 37.5",
      compoundVerbstemSourcesAllowed: true,
      potentialPatientFrame: Object.freeze({
        sourceSection: "Andrews 37.5.2",
        potentialPatientValueAllowed: true,
        zLizCanNamePotentialPatient: true,
        intransitiveSourceCanBeHomophonousWithActiveAction: true,
        thirdSingularCanBeAmbiguous: true,
        transitivePotentialPatientLacksObjectPronoun: true,
        activeActionTransitiveKeepsObjectPronoun: true,
        doubleObjectReflexiveExceptionStaysActiveAction: true,
        doubleObjectReflexiveCanDropProjectiveObject: true
      }),
      impersonalActionFrame: Object.freeze({
        sourceSection: "Andrews 37.5.3",
        lizCanDeriveActionFromImpersonalCore: true,
        sourceCanUseNonactiveSuffixOrImpersonalTla: true,
        shortZSubtypeNotLicensed: true
      }),
      compoundEmbedFrame: Object.freeze({
        sourceSection: "Andrews 37.5.4",
        activeActionNounstemCanEmbedInVnc: true,
        activeActionNounstemCanEmbedInNnc: true,
        finiteMatrixRequiresAndrewsSourceGate: true
      }),
      affectiveAssimilationFrame: Object.freeze({
        sourceSection: "Andrews 37.5.5",
        zLizPlusTzinAssimilationExists: true,
        outputRequiresConfirmedNawatRealization: true
      })
    });
    const LESSON37_ACTIVE_PASSIVE_ACTION_CONTRAST_FRAME = Object.freeze({
      kind: "lesson-37-active-passive-action-contrast-frame",
      sourceSection: "Andrews 37.6",
      activeActionPossessorRepresentsAgent: true,
      passiveActionPossessorRepresentsPatient: true,
      possessorRoleDistinguishesNearSurfacePairs: true
    });
    const LESSON37_MULTIPLE_NUCLEUS_FRAME = Object.freeze({
      kind: "lesson-37-multiple-nucleus-frame",
      sourceSection: "Andrews 37.7",
      vncCanServeAsSupplement: true,
      activeActionNncCanServeAsSupplement: true,
      supplementaryObjectConstruction: true,
      sentenceLevelDiagnosticNotWordGeneration: true
    });
    const LESSON37_PATIENTIVE_OVERVIEW_FRAME = Object.freeze({
      kind: "lesson-37-patientive-overview-frame",
      sourceSection: "Andrews 37.8",
      deverbalPatientiveBroaderThanNominalizedPreteritPatientive: true,
      mayDeriveFromIntransitiveOrTransitiveSources: true,
      semanticRange: Object.freeze(["capable", "been", "become", "product", "result"]),
      highGenerality: true,
      sourceFamilies: Object.freeze(["passive-core", "impersonal-core", "perfective-active-core", "imperfective-active-core", "verb-root-or-stock"]),
      passiveAndImpersonalDistinguishedByNonspecificObjectPronouns: true,
      nonactiveSourceSuffixFamilies: Object.freeze(["lo", "lo-hua", "o", "o-hua", "hua", "hua-lo"]),
      nonactiveTruncationAndClassEffectsMatter: true,
      exactRulesCanBeIdiosyncratic: true
    });
    const LESSON37_PASSIVE_PATIENTIVE_FRAME = Object.freeze({
      kind: "lesson-37-passive-patientive-frame",
      sourceSection: "Andrews 37.9",
      passiveSourceCannotHaveIntransitiveUltimateSource: true,
      sourceUnit: "passive VNC core",
      includesNonspecificProjectiveOrShuntlineReflexiveFromPassiveSource: true,
      noObjectPassiveSourcesCanDeleteLoOOrHua: true,
      sourceSuffixDeletionFamilies: Object.freeze(["lo", "o", "hua"]),
      irregularNonactiveSourceWarning: true,
      culturalSemanticPerspectiveWarning: true,
      reflexivePassiveSourceUsesNe: true,
      doubleProjectivePassiveKeepsOnlyOneObjectPronoun: true,
      teMayDeleteInDoubleProjectivePassive: true
    });
    const LESSON37_DEVERBAL_NOUNSTEM_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson37-deverbal-nounstem-overview",
      andrewsSection: "37.1",
      category: "deverbal-nounstem-overview",
      directiveEs: "El tronco nominal deverbal deriva del nucleo de la CNV, no de un simple predicado CNV reetiquetado.",
      engineSurface: "diagnostic deverbal overview frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson37-active-action-z",
      andrewsSection: "37.2",
      category: "active-action-z",
      directiveEs: "La accion activa de segundo tipo usa z estructural, clase tli, fuente futura y restricciones de fuente; Nawat realiza la letra como s.",
      engineSurface: "partial sustantivo-verbal s subtype plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson37-active-action-liz",
      andrewsSection: "37.3",
      category: "active-action-liz",
      directiveEs: "Liz se agrega al nucleo futuro y conserva reglas de clase, proyectivos, reflexivo ne y alternancias de imperfectivo reemplazante.",
      engineSurface: "partial sustantivo-verbal lis subtype plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson37-liz-translation-value",
      andrewsSection: "37.4",
      category: "liz-translation-value",
      directiveEs: "Liz puede glosarse como modo, naturaleza o apariencia; la traduccion no autoriza superficie.",
      engineSurface: "diagnostic translation frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson37-active-action-particulars",
      andrewsSection: "37.5",
      category: "active-action-particulars",
      directiveEs: "Los particulares incluyen fuentes compuestas, valor de paciente potencial, accion impersonal, incrustacion en compuestos y asimilacion con tzin.",
      engineSurface: "partial potential/impersonal action routes plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson37-active-vs-passive-action",
      andrewsSection: "37.6",
      category: "active-passive-action-contrast",
      directiveEs: "En accion activa el poseedor representa agente; en accion pasiva representa paciente.",
      engineSurface: "diagnostic possessor-role contrast frame",
      implementationState: "partial",
      redirectAction: "reframe-metadata"
    }), Object.freeze({
      id: "lesson37-multiple-nucleus-action-nnc",
      andrewsSection: "37.7",
      category: "multiple-nucleus-action-nnc",
      directiveEs: "La CNN de accion activa puede funcionar como suplemento de nucleo multiple; eso es sintaxis, no generacion de palabra.",
      engineSurface: "diagnostic sentence-layer frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson37-patientive-nounstem-overview",
      andrewsSection: "37.8",
      category: "patientive-nounstem-overview",
      directiveEs: "El patientivo deverbal tiene cinco familias de fuente y significados amplios de capacidad, resultado o estado.",
      engineSurface: "partial patientiveFamilyProfile plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson37-passive-patientive",
      andrewsSection: "37.9",
      category: "passive-patientive",
      directiveEs: "El patientivo pasivo viene de nucleo pasivo, bloquea fuentes ultimas intransitivas y conserva solo los objetos licenciados por la fuente.",
      engineSurface: "partial passive patientivo generation gates plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    })]);
    function getLesson37DeverbalNounstemSubsectionInventory() {
      return LESSON37_DEVERBAL_NOUNSTEM_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
        validationRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_VALIDATION_REFS)
      }));
    }
    function buildLesson37DeverbalNounstemPursuitFrame() {
      const subsectionInventory = getLesson37DeverbalNounstemSubsectionInventory();
      const deverbalOverviewFrame = cloneNominalizationLessonRecord(LESSON37_DEVERBAL_OVERVIEW_FRAME);
      const activeActionZFrame = cloneNominalizationLessonRecord(LESSON37_ACTIVE_ACTION_Z_FRAME);
      const activeActionLizFrame = cloneNominalizationLessonRecord(LESSON37_ACTIVE_ACTION_LIZ_FRAME);
      const lizTranslationFrame = cloneNominalizationLessonRecord(LESSON37_LIZ_TRANSLATION_FRAME);
      const activeActionParticularsFrame = cloneNominalizationLessonRecord(LESSON37_ACTIVE_ACTION_PARTICULARS_FRAME);
      const activePassiveActionContrastFrame = cloneNominalizationLessonRecord(LESSON37_ACTIVE_PASSIVE_ACTION_CONTRAST_FRAME);
      const multipleNucleusFrame = cloneNominalizationLessonRecord(LESSON37_MULTIPLE_NUCLEUS_FRAME);
      const patientiveOverviewFrame = cloneNominalizationLessonRecord(LESSON37_PATIENTIVE_OVERVIEW_FRAME);
      const passivePatientiveFrame = cloneNominalizationLessonRecord(LESSON37_PASSIVE_PATIENTIVE_FRAME);
      const remainingGaps = ["Current Lesson 37 deverbal nounstem routes are partial and do not complete active-action z/liz, potential-patient, impersonal-action, compound-embed, multiple-nucleus, or passive-patientive coverage.", "Active-action z/liz generation has Nawat s/lis support, but full fixture-backed source restrictions, a-final replacement, non-i vowel exceptions, tzin assimilation, and Andrews source models plus orthography-bridge fixtures remain evidence-needed.", "Potential-patient and impersonal-action routes are implemented only for current data-backed paths and must not be treated as complete action-noun coverage.", "Passive-patientive gates are partial; nonactive suffix deletion, irregular passive source warnings, cultural semantic perspective, and double-projective alternatives need continued evidence and tests."];
      const frame = {
        kind: "lesson-37-deverbal-nounstem-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 37,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS),
        plannedArrows: [{
          id: "lesson-37-deverbal-nounstem-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 37.1-37.9 against current nominalization boundary metadata, active-action z/liz generation, translation boundaries, potential-patient and impersonal-action values, active/passive action contrasts, multiple-nucleus supplements, patientive source families, and passive-patientive source gates.",
          andrewsRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-37-deverbal-nounstem-audit",
          result: "hit",
          correction: "Lesson 37 now records Andrews deverbal nounstem architecture, active-action z/liz, liz translation values, potential-patient and impersonal-action particulars, active/passive action possessor-role contrast, multiple-nucleus supplement use, patientive source families, and passive-patientive source gates while preserving current evidence boundaries.",
          andrewsRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS),
          feedbackRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_VALIDATION_REFS)
        }],
        subsectionInventory,
        deverbalOverviewFrame,
        activeActionZFrame,
        activeActionLizFrame,
        lizTranslationFrame,
        activeActionParticularsFrame,
        activePassiveActionContrastFrame,
        multipleNucleusFrame,
        patientiveOverviewFrame,
        passivePatientiveFrame,
        currentEngineBoundary: {
          nominalizationBoundaryMetadataImplemented: true,
          activeActionSLisGenerationPartial: true,
          potentialPatientGenerationPartial: true,
          impersonalActionGenerationPartial: true,
          passivePatientiveGenerationPartial: true,
          multipleNucleusSupplementGenerationImplemented: false,
          fullLesson37GenerationImplemented: false,
          finiteOutputExpansionAllowedOnlyWithAndrewsSource: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachNominalizationGrammarContract(frame, {
        metadataKind: "lesson-37-deverbal-nounstem-pursuit-frame",
        unitKind: "deverbal-nounstem-boundary",
        routeStage: "audit-lesson-37",
        structuralSource: "Andrews Lesson 37",
        andrewsRefs: Array.from(LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 37.1-37.9",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: "orthography-bridge-plus-source-gate-required",
          activeActionRuleLetters: Object.freeze({
            classical: Object.freeze(["z", "liz"]),
            nawat: Object.freeze(["s", "lis"])
          })
        },
        morphBoundaryFrame: {
          deverbalOverviewFrame,
          activeActionZFrame,
          activeActionLizFrame,
          lizTranslationFrame,
          activeActionParticularsFrame,
          activePassiveActionContrastFrame,
          multipleNucleusFrame,
          patientiveOverviewFrame,
          passivePatientiveFrame
        },
        stemFrame: {
          stemKind: "deverbal-nounstem",
          activeActionSources: Object.freeze(["future-tense verbcore", "impersonal core"]),
          activeActionRuleSuffixes: Object.freeze(["z", "liz"]),
          activeActionNawatSuffixes: Object.freeze(["s", "lis"]),
          patientiveSourceFamilies: patientiveOverviewFrame.sourceFamilies,
          passivePatientiveSourceUnit: passivePatientiveFrame.sourceUnit
        },
        nuclearClauseFrame: {
          categoryTransition: "VNC core -> NNC nounstem",
          sourceClauseKind: "CNV",
          targetClauseKind: "CNN",
          deverbalDerivation: true,
          simplePredicateReanalysis: false,
          multipleNucleusUseIsSentenceLevel: true
        },
        participantFrame: {
          activeActionPossessorRole: "agent",
          passiveActionPossessorRole: "patient",
          potentialPatientDropsObjectPronoun: activeActionParticularsFrame.potentialPatientFrame.transitivePotentialPatientLacksObjectPronoun,
          passivePatientiveKeepsOnlyLicensedObjects: passivePatientiveFrame.doubleProjectivePassiveKeepsOnlyOneObjectPronoun
        },
        targetContract: {
          metadataKind: "lesson-37-deverbal-nounstem-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["deverbal-nounstem-diagnostic-partial", "deverbal-nounstem-source-gated"]
      });
    }
    const LESSON38_IMPERSONAL_PATIENTIVE_VALIDATION_REFS = Object.freeze(["src/tests/nnc_nominalization.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS = Object.freeze(["Andrews Lesson 38.1", "Andrews Lesson 38.1.1", "Andrews Lesson 38.1.1.a", "Andrews Lesson 38.1.1.b", "Andrews Lesson 38.1.1.c", "Andrews Lesson 38.1.1.d", "Andrews Lesson 38.1.2", "Andrews Lesson 38.1.3", "Andrews Lesson 38.1.3.a", "Andrews Lesson 38.1.3.b", "Andrews Lesson 38.1.3.c", "Andrews Lesson 38.1.4", "Andrews Lesson 38.1.4.a", "Andrews Lesson 38.1.4.b", "Andrews Lesson 38.1.4.c", "Andrews Lesson 38.1.5", "Andrews Lesson 38.1.6", "Andrews Lesson 38.2", "Andrews Lesson 38.2.1", "Andrews Lesson 38.2.2"]);
    const LESSON38_IMPERSONAL_PATIENTIVE_OVERVIEW_FRAME = Object.freeze({
      kind: "lesson-38-impersonal-patientive-overview-frame",
      sourceSection: "Andrews 38.1",
      sourceCore: "impersonal VNC core",
      sameFormationAsPassivePatientiveExceptSourceVoice: true,
      sourceVoiceDistinctionControlsObjectMaterial: true,
      nonspecificProjectiveOrShuntlineReflexiveDependsOnSource: true,
      passiveAndImpersonalMustNotBeCollapsed: true
    });
    const LESSON38_INTRANSITIVE_SOURCE_FRAME = Object.freeze({
      kind: "lesson-38-intransitive-source-frame",
      sourceSection: "Andrews 38.1.1",
      sourceKind: "intransitive active source",
      agentiveNamesDoerPatientiveNamesResult: true,
      participleAnalogyIsTranslationOnly: true,
      patientiveNounstemsAreEntitiesInNncs: true,
      loSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.1.a",
        nonactiveSuffix: "lo",
        doublyImpersonalSourcesPossible: true,
        triplyImpersonalSourcesPossible: true,
        rootPlusYaMayUseRootNotStem: true,
        irregularReductionWarningsPossible: true
      }),
      oSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.1.b",
        nonactiveSuffixes: Object.freeze(["o", "o-hua"]),
        resultEntityReadingsCommon: true,
        doublyImpersonalSourcesPossible: true,
        soundShiftWarningsPossible: true
      }),
      huaSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.1.c",
        nonactiveSuffix: "hua",
        deletesHua: true,
        longIBecomesShortIWhenHuaDeleted: true,
        soundShiftWarningsPossible: true
      }),
      huaLoSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.1.d",
        nonactiveSuffix: "hua-lo",
        sourceBuiltOnHuaLo: true
      })
    });
    const LESSON38_REFLEXIVE_SOURCE_FRAME = Object.freeze({
      kind: "lesson-38-reflexive-source-frame",
      sourceSection: "Andrews 38.1.2",
      sourceKind: "transitive active source with reflexive object",
      reflexiveObjectUsesShuntlineNe: true,
      hardToDistinguishFromPassiveWithoutProjectiveObject: true,
      projectiveObjectClarifiesImpersonalVsPassive: true
    });
    const LESSON38_PROJECTIVE_NONHUMAN_SOURCE_FRAME = Object.freeze({
      kind: "lesson-38-projective-nonhuman-source-frame",
      sourceSection: "Andrews 38.1.3",
      sourceKind: "transitive active source with projective tla or te+tla",
      directObjectMustBeNonhuman: true,
      representedByMainlineTlaOrShuntlineTla: true,
      tePlusTlaKeepsShuntlineTlaForNonhumanPatient: true,
      loSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.3.a",
        nonactiveSuffix: "lo",
        rareYaDeletionBeforeLo: true,
        fullYaStemAlternativeCanExist: true,
        contrastsWithPassivePatientive: true
      }),
      oSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.3.b",
        nonactiveSuffix: "o",
        contrastsWithPassivePatientive: true
      }),
      huaSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.3.c",
        nonactiveSuffix: "hua",
        vowelBeforeHuaShortensUnlessLongInActiveStem: true,
        finalAReplacedByI: true,
        humanObjectHomonymsPossible: true
      })
    });
    const LESSON38_PROJECTIVE_TE_SOURCE_FRAME = Object.freeze({
      kind: "lesson-38-projective-te-source-frame",
      sourceSection: "Andrews 38.1.4",
      sourceKind: "single-object active source with human te",
      impersonalPatientiveDoesNotContainTe: true,
      usesImpersonalTlaPrefix: true,
      sourceIsImpersonalizedPassiveNotImpersonalizedActive: true,
      homonymsWithNonhumanTlaSourcesPossible: true,
      exceptionalHumanTePatientivesPossible: true,
      loSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.4.a",
        nonactiveSuffix: "lo",
        sequence: Object.freeze(["active specific-human core", "passive stem", "impersonalized passive stem", "impersonal patientive nounstem"])
      }),
      oSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.4.b",
        nonactiveSuffix: "o",
        sequence: Object.freeze(["active specific-human core", "passive stem", "impersonalized passive stem", "impersonal patientive nounstem"])
      }),
      huaSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.1.4.c",
        nonactiveSuffix: "hua",
        longIBecomesShortIWhenHuaDeleted: true,
        sequence: Object.freeze(["active specific-human core", "passive stem", "impersonalized passive stem", "impersonal patientive nounstem"])
      })
    });
    const LESSON38_HUMAN_NONHUMAN_CONTRAST_FRAME = Object.freeze({
      kind: "lesson-38-human-nonhuman-contrast-frame",
      sourceSection: "Andrews 38.1.5",
      applicativeHumanNonhumanObjectContrastPossible: true,
      tlaCanNameHumanEntityInImpersonalizedPassivePattern: true,
      teCanNameNonhumanEntityAsAnomalousPattern: true,
      sameVerbcoreCanYieldContrastivePatientives: true,
      contrastCanAlsoReflectImpersonalSingleObjectVsPassiveDoubleObject: true,
      translationMayMislead: true
    });
    const LESSON38_TRANSLATION_OVERLAP_FRAME = Object.freeze({
      kind: "lesson-38-translation-overlap-frame",
      sourceSection: "Andrews 38.1.6",
      impersonalPatientiveAndActiveActionCanShareTranslationValue: true,
      sharedTranslationDoesNotMeanSameStructure: true,
      translationValueIsDiagnosticNotSurfaceAuthority: true
    });
    const LESSON38_COMPOUND_PATIENTIVE_FRAME = Object.freeze({
      kind: "lesson-38-compound-patientive-frame",
      sourceSection: "Andrews 38.2",
      passiveAndImpersonalPatientivesCanBeCompoundInTwoWays: true,
      compoundSourceFrame: Object.freeze({
        sourceSection: "Andrews 38.2.1",
        sourceMayBeCompoundVerbstem: true,
        adverbialEmbedUsuallyTranslatesStraightforwardly: true,
        embeddedObjectTranslationCanReverseGovernedToGoverningRelation: true,
        objectEmbedRequiresTranslationCaution: true,
        matrixAndEmbedMustRemainDistinct: true
      }),
      compoundMatrixFrame: Object.freeze({
        sourceSection: "Andrews 38.2.2",
        deverbalNounstemCanBeMatrixOfCompoundNounstem: true,
        patientiveAsEmbedDeferredToLesson39Point6: true,
        compoundNounstemGenerationRequiresAndrewsSourceGate: true
      })
    });
    const LESSON38_IMPERSONAL_PATIENTIVE_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson38-impersonal-patientive-overview",
      andrewsSection: "38.1",
      category: "impersonal-patientive-overview",
      directiveEs: "El patientivo impersonal toma como fuente el nucleo de una CNV impersonal y no debe colapsarse con el pasivo.",
      engineSurface: "partial impersonal patientivo route plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson38-intransitive-active-source",
      andrewsSection: "38.1.1",
      category: "intransitive-active-source",
      directiveEs: "Con fuente intransitiva, el agentivo nombra hacedor y el patientivo nombra resultado; ambos son entidades en CNN.",
      engineSurface: "partial impersonal patientivo route plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson38-intransitive-lo-source",
      andrewsSection: "38.1.1.a",
      category: "intransitive-lo-source",
      directiveEs: "La fuente con lo puede ser doble o triplemente impersonal; algunos troncos raiz+ya usan la raiz, no todo el tronco.",
      engineSurface: "diagnostic nonactive suffix-source frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson38-intransitive-o-source",
      andrewsSection: "38.1.1.b",
      category: "intransitive-o-source",
      directiveEs: "La fuente con o u o-hua produce lecturas de resultado y puede llevar cambios fonicos o doble impersonalidad.",
      engineSurface: "diagnostic nonactive suffix-source frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson38-intransitive-hua-source",
      andrewsSection: "38.1.1.c",
      category: "intransitive-hua-source",
      directiveEs: "La fuente con hua borra hua; i larga puede realizarse como i corta y los cambios fonicos quedan como diagnostico.",
      engineSurface: "diagnostic nonactive suffix-source frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson38-intransitive-hua-lo-source",
      andrewsSection: "38.1.1.d",
      category: "intransitive-hua-lo-source",
      directiveEs: "La fuente con hua-lo se conserva como subfamilia impersonal separada.",
      engineSurface: "diagnostic nonactive suffix-source frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson38-reflexive-source",
      andrewsSection: "38.1.2",
      category: "reflexive-source",
      directiveEs: "La fuente transitiva reflexiva usa ne de linea desviada; sin proyectivo puede parecerse al patientivo pasivo.",
      engineSurface: "partial reflexive patientivo route plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson38-projective-nonhuman-source",
      andrewsSection: "38.1.3",
      category: "projective-nonhuman-source",
      directiveEs: "La fuente con ta o te+ta debe tener objeto no humano; el patientivo conserva ta principal o ta desviada.",
      engineSurface: "partial impersonal patientivo projective route plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson38-projective-nonhuman-lo-source",
      andrewsSection: "38.1.3.a",
      category: "projective-nonhuman-lo-source",
      directiveEs: "La subfamilia con lo permite borrado raro de ya y debe contrastarse con patientivos pasivos homofonos.",
      engineSurface: "diagnostic nonactive suffix-source frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson38-projective-nonhuman-o-source",
      andrewsSection: "38.1.3.b",
      category: "projective-nonhuman-o-source",
      directiveEs: "La subfamilia con o mantiene el contraste con patientivos pasivos de fuente correspondiente.",
      engineSurface: "diagnostic nonactive suffix-source frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson38-projective-nonhuman-hua-source",
      andrewsSection: "38.1.3.c",
      category: "projective-nonhuman-hua-source",
      directiveEs: "La subfamilia con hua acorta la vocal anterior salvo vocal larga fuente y reemplaza a final por i.",
      engineSurface: "diagnostic nonactive suffix-source frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson38-projective-te-source",
      andrewsSection: "38.1.4",
      category: "projective-human-te-source",
      directiveEs: "Con te humano de un solo objeto, el patientivo impersonal no lleva te; usa ta impersonal desde un pasivo impersonalizado.",
      engineSurface: "partial te-to-ta patientivo route plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson38-projective-te-lo-source",
      andrewsSection: "38.1.4.a",
      category: "projective-te-lo-source",
      directiveEs: "La subfamilia con lo debe registrar la secuencia nucleo activo, pasivo, pasivo impersonalizado, patientivo impersonal.",
      engineSurface: "diagnostic source-sequence frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson38-projective-te-o-source",
      andrewsSection: "38.1.4.b",
      category: "projective-te-o-source",
      directiveEs: "La subfamilia con o conserva la misma secuencia y no autoriza retener te como salida normal.",
      engineSurface: "diagnostic source-sequence frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson38-projective-te-hua-source",
      andrewsSection: "38.1.4.c",
      category: "projective-te-hua-source",
      directiveEs: "La subfamilia con hua borra hua y registra i larga como i corta al borrar.",
      engineSurface: "diagnostic source-sequence frame",
      implementationState: "partial",
      redirectAction: "refactor-engine"
    }), Object.freeze({
      id: "lesson38-human-nonhuman-contrast",
      andrewsSection: "38.1.5",
      category: "human-nonhuman-contrast",
      directiveEs: "Algunas fuentes aplicativas contrastan humano/no humano; las formas con te son anomalas y no deben normalizarse.",
      engineSurface: "diagnostic contrast frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson38-translation-overlap",
      andrewsSection: "38.1.6",
      category: "translation-overlap",
      directiveEs: "Un patientivo impersonal y una accion activa pueden compartir traduccion sin compartir estructura.",
      engineSurface: "diagnostic translation frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson38-compound-patientive",
      andrewsSection: "38.2",
      category: "compound-patientive",
      directiveEs: "Los patientivos pasivos e impersonales pueden ser compuestos de fuente compuesta o matrices de compuestos nominales.",
      engineSurface: "partial patientive compound continuations plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson38-compound-source",
      andrewsSection: "38.2.1",
      category: "compound-source-patientive",
      directiveEs: "La fuente puede ser un tronco verbal compuesto; los objetos incrustados exigen cautela de traduccion y no invierten el analisis.",
      engineSurface: "partial compound-source patientive metadata",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson38-compound-matrix",
      andrewsSection: "38.2.2",
      category: "compound-matrix-patientive",
      directiveEs: "El tronco deverbal puede servir como matriz de un compuesto nominal; el patientivo como incrustado queda para 39.6.",
      engineSurface: "partial compound-nounstem continuation metadata",
      implementationState: "partial",
      redirectAction: "source-gated"
    })]);
    function getLesson38ImpersonalPatientiveSubsectionInventory() {
      return LESSON38_IMPERSONAL_PATIENTIVE_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
        validationRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_VALIDATION_REFS)
      }));
    }
    function buildLesson38ImpersonalPatientivePursuitFrame() {
      const subsectionInventory = getLesson38ImpersonalPatientiveSubsectionInventory();
      const impersonalPatientiveOverviewFrame = cloneNominalizationLessonRecord(LESSON38_IMPERSONAL_PATIENTIVE_OVERVIEW_FRAME);
      const intransitiveSourceFrame = cloneNominalizationLessonRecord(LESSON38_INTRANSITIVE_SOURCE_FRAME);
      const reflexiveSourceFrame = cloneNominalizationLessonRecord(LESSON38_REFLEXIVE_SOURCE_FRAME);
      const projectiveNonhumanSourceFrame = cloneNominalizationLessonRecord(LESSON38_PROJECTIVE_NONHUMAN_SOURCE_FRAME);
      const projectiveTeSourceFrame = cloneNominalizationLessonRecord(LESSON38_PROJECTIVE_TE_SOURCE_FRAME);
      const humanNonhumanContrastFrame = cloneNominalizationLessonRecord(LESSON38_HUMAN_NONHUMAN_CONTRAST_FRAME);
      const translationOverlapFrame = cloneNominalizationLessonRecord(LESSON38_TRANSLATION_OVERLAP_FRAME);
      const compoundPatientiveFrame = cloneNominalizationLessonRecord(LESSON38_COMPOUND_PATIENTIVE_FRAME);
      const remainingGaps = ["Current Lesson 38 impersonal-patientive routes are partial and do not complete every nonactive suffix source family, human/nonhuman contrast, exceptional te patientive, or compound patientive pattern.", "Intransitive root-plus-ya source selection, lo/o/o-hua/hua/hua-lo source details, vowel shortening, final-a replacement, and sound-shift warnings remain diagnostic or evidence-needed.", "Projective te-to-ta routing is implemented for current paths, but anomalous te contrasts and homonym disambiguation require Andrews source logic plus orthography-bridge support.", "Compound patientive source and matrix behavior is limited to current data-backed continuations and must not be treated as full compound-patientive generation."];
      const frame = {
        kind: "lesson-38-impersonal-patientive-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 38,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS),
        plannedArrows: [{
          id: "lesson-38-impersonal-patientive-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 38.1-38.2 against current patientive family metadata, impersonal patientive source-core routing, intransitive source families, reflexive shuntline ne, projective nonhuman tla, human te-to-tla impersonalized passive routing, human/nonhuman contrast, translation overlap, and compound patientive nounstem boundaries.",
          andrewsRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-38-impersonal-patientive-audit",
          result: "hit",
          correction: "Lesson 38 now records Andrews impersonal patientive architecture, intransitive source families, reflexive shuntline behavior, nonhuman projective routing, human te-to-tla impersonalized passive routing, human/nonhuman contrast, translation overlap with active-action nouns, and compound patientive boundaries while preserving evidence gates.",
          andrewsRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS),
          feedbackRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_VALIDATION_REFS)
        }],
        subsectionInventory,
        impersonalPatientiveOverviewFrame,
        intransitiveSourceFrame,
        reflexiveSourceFrame,
        projectiveNonhumanSourceFrame,
        projectiveTeSourceFrame,
        humanNonhumanContrastFrame,
        translationOverlapFrame,
        compoundPatientiveFrame,
        currentEngineBoundary: {
          nominalizationBoundaryMetadataImplemented: true,
          patientiveFamilyProfileImplemented: true,
          impersonalPatientiveGenerationPartial: true,
          reflexiveNeGenerationPartial: true,
          projectiveTaGenerationPartial: true,
          projectiveTeToTaGenerationPartial: true,
          compoundPatientiveContinuationPartial: true,
          fullLesson38GenerationImplemented: false,
          finiteOutputExpansionAllowedOnlyWithAndrewsSource: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachNominalizationGrammarContract(frame, {
        metadataKind: "lesson-38-impersonal-patientive-pursuit-frame",
        unitKind: "impersonal-patientive-boundary",
        routeStage: "audit-lesson-38",
        structuralSource: "Andrews Lesson 38",
        andrewsRefs: Array.from(LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 38.1-38.2",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: "orthography-bridge-plus-source-gate-required",
          projectiveBridge: Object.freeze({
            classical: "tla",
            nawat: "ta"
          })
        },
        morphBoundaryFrame: {
          impersonalPatientiveOverviewFrame,
          intransitiveSourceFrame,
          reflexiveSourceFrame,
          projectiveNonhumanSourceFrame,
          projectiveTeSourceFrame,
          humanNonhumanContrastFrame,
          translationOverlapFrame,
          compoundPatientiveFrame
        },
        stemFrame: {
          stemKind: "impersonal-patientive-nounstem",
          sourceCore: impersonalPatientiveOverviewFrame.sourceCore,
          nonactiveSourceFamilies: Object.freeze(["lo", "o", "o-hua", "hua", "hua-lo"]),
          projectiveNonhumanObject: "tla",
          projectiveTeHumanRoute: "impersonalized passive with tla",
          compoundPatientiveModes: Object.freeze(["compound-verbstem-source", "deverbal-nounstem-as-compound-matrix"])
        },
        nuclearClauseFrame: {
          categoryTransition: "impersonal VNC core -> patientive NNC nounstem",
          sourceClauseKind: "CNV",
          targetClauseKind: "CNN",
          patientiveNounstemsOccurInNncs: true,
          compoundTranslationDoesNotInvertAnalysis: true
        },
        participantFrame: {
          semanticRole: "patient/result entity",
          reflexiveWitness: "ne",
          nonhumanProjectiveWitness: "tla",
          humanTeSourceDoesNotSurfaceAsTeNormally: true,
          humanNonhumanContrastIsDiagnostic: true
        },
        targetContract: {
          metadataKind: "lesson-38-impersonal-patientive-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["impersonal-patientive-diagnostic-partial", "impersonal-patientive-source-gated"]
      });
    }
    const LESSON39_PATIENTIVE_OPERATIONS_VALIDATION_REFS = Object.freeze(["src/tests/nnc_nominalization.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS = Object.freeze(["Andrews Lesson 39.1", "Andrews Lesson 39.1.1", "Andrews Lesson 39.1.2", "Andrews Lesson 39.1.3", "Andrews Lesson 39.2", "Andrews Lesson 39.2.1", "Andrews Lesson 39.2.2", "Andrews Lesson 39.3", "Andrews Lesson 39.3.1", "Andrews Lesson 39.3.2", "Andrews Lesson 39.3.3", "Andrews Lesson 39.3.4", "Andrews Lesson 39.3.5", "Andrews Lesson 39.3.6", "Andrews Lesson 39.4", "Andrews Lesson 39.4.1", "Andrews Lesson 39.4.2", "Andrews Lesson 39.4.3", "Andrews Lesson 39.4.4", "Andrews Lesson 39.5", "Andrews Lesson 39.6", "Andrews Lesson 39.7", "Andrews Lesson 39.8", "Andrews Lesson 39.9"]);
    const LESSON39_PERFECTIVE_PATIENTIVE_FRAME = Object.freeze({
      kind: "lesson-39-perfective-patientive-frame",
      sourceSection: "Andrews 39.1",
      sourceCore: "perfective active verbstem",
      modeledAfterPassiveOrImpersonalPatientive: true,
      belongsToTliClass: true,
      allowedPerfectiveCoreEndingsNawat: Object.freeze(["w", "k", "kw", "s", "sh", "n", "glottal", "l", "tz"]),
      passiveAnalogyFrame: Object.freeze({
        sourceSection: "Andrews 39.1.1",
        transitiveSourceCanUsePassiveAnalogy: true,
        objectPronounsAppropriateToPassiveSource: true
      }),
      impersonalAnalogyFrame: Object.freeze({
        sourceSection: "Andrews 39.1.2",
        transitiveOrIntransitiveSourceCanUseImpersonalAnalogy: true,
        teMayRouteToTlaByNonactiveAnalogy: true
      }),
      compoundSourceFrame: Object.freeze({
        sourceSection: "Andrews 39.1.3",
        sourceVerbstemMayBeCompound: true,
        ownerhoodMatrixHuaRestrictedToAcquiredRelations: true,
        ownerhoodMatrixYoaHasLimitedExamples: true,
        honorificAndDenominalEnvironmentsCommon: true
      })
    });
    const LESSON39_IMPERFECTIVE_PATIENTIVE_FRAME = Object.freeze({
      kind: "lesson-39-imperfective-patientive-frame",
      sourceSection: "Andrews 39.2",
      sourceCore: "imperfective active stem",
      modeledAfterPassiveOrImpersonalPatientive: true,
      belongsToTiClass: true,
      classCUsesTruncatedLongOOrI: true,
      classDUsesFinalLongA: true,
      passiveAnalogyFrame: Object.freeze({
        sourceSection: "Andrews 39.2.1",
        transitiveSourceCanUsePassiveAnalogy: true,
        projectiveObjectAbsentUnlessPassiveCoreContainsIt: true,
        patientiveGlossCanBeStrainedOrAgentiveByWorldview: true
      }),
      impersonalAnalogyFrame: Object.freeze({
        sourceSection: "Andrews 39.2.2",
        transitiveOrIntransitiveSourceCanUseImpersonalAnalogy: true,
        deverbalAnalysisCanBlockCompoundMatrixMisread: true
      })
    });
    const LESSON39_CHARACTERISTIC_PROPERTY_FRAME = Object.freeze({
      kind: "lesson-39-characteristic-property-frame",
      sourceSection: "Andrews 39.3",
      sourceMatrix: "*tla-(-yo-a)",
      nounstemMatrix: "(-yo)-tl",
      meansPertainingOrCharacterizedBy: true,
      yAssimilationApplies: true,
      possessiveStateLosesOLengthBeforeZeroDyad: true,
      stateQualityFrame: Object.freeze({
        sourceSection: "Andrews 39.3.1",
        mayNameInherentStateOrQuality: true,
        embedsMayBePassivePatientivePreteritAgentiveOwnerhoodOrOtherNounstems: true
      }),
      pertainingFrame: Object.freeze({
        sourceSection: "Andrews 39.3.2",
        mayNameThingPertainingToEmbed: true,
        traditionalMisspellingCanMisleadSourceAnalysis: true
      }),
      intrinsicFrame: Object.freeze({
        sourceSection: "Andrews 39.3.3",
        mayNameIntrinsicOrEssentialAspect: true,
        derivedStemCanTakeOverLostEmbedMeaning: true,
        possessiveStateCanOccasionallyUseEmbedInsteadOfCompound: true,
        generalUsePossessiveStemCanBeIncorporated: true
      }),
      organicPossessionFrame: Object.freeze({
        sourceSection: "Andrews 39.3.4",
        organicPossessionOnlyPossessiveState: true,
        adventitiousPossessionUsesNormalNounstem: true,
        organicPossessionUsesYoMatrix: true,
        contrastAppliesToPartWholeRelationsButNotEveryBodyPart: true,
        nonLivingIntegralPartsCanParticipate: true
      }),
      preteritAgentiveEmbedFrame: Object.freeze({
        sourceSection: "Andrews 39.3.5",
        preteritAgentiveCanFillEmbed: true,
        absolutiveStateMustNotBeMisreadAsPossessiveState: true
      }),
      actionNounEmbedFrame: Object.freeze({
        sourceSection: "Andrews 39.3.6",
        passiveActionCanFillEmbed: true,
        activeActionFirstTypeCanFillEmbed: true,
        homophonousAbsolutiveStateNncsCanBeAmbiguous: true,
        derivationalSequenceCanBeMultiStep: true
      })
    });
    const LESSON39_ROOT_STOCK_PATIENTIVE_FRAME = Object.freeze({
      kind: "lesson-39-root-stock-patientive-frame",
      sourceSection: "Andrews 39.4",
      sourceCore: "destockal root or stock",
      exactVariantChoiceNotRecoverableFromSurfaceGrammar: true,
      tliClassOutputRequired: true,
      niDestockalFrame: Object.freeze({
        sourceSection: "Andrews 39.4.1",
        suffixChoices: Object.freeze(["c", "x", "z", "ch"]),
        stockFormativeLongVowelShortens: true,
        irregularFusedVowelKeepsLength: true,
        frequentativeDestockalCanDerivePatientive: true,
        frequentativeCaMatrixCanDerivePatientive: true,
        compoundCaSourceCanDerivePatientive: true
      }),
      huaDestockalFrame: Object.freeze({
        sourceSection: "Andrews 39.4.2",
        normallyAddsCToStock: true,
        eFormativeOftenMeansSomewhatCharacteristic: true,
        downgradedNounstemCanServeAsRoot: true,
        chOrBareStockAlternativesPossible: true
      }),
      ihuiAhuiDestockalFrame: Object.freeze({
        sourceSection: "Andrews 39.4.3",
        canAddXOrCToStock: true,
        rootBasedPatientivePossible: true,
        causativeOaDerivativeRequiresTlaObjectPronoun: true,
        sourceDirectionCanBeUncertainWithoutObjectPronounEvidence: true
      }),
      agentiveMeaningFrame: Object.freeze({
        sourceSection: "Andrews 39.4.4",
        stockCanBeUsedWithAgentiveMeaning: true,
        unknownSourceCanStillShowVerbObjectPronouns: true
      })
    });
    const LESSON39_MULTIPLE_DERIVATION_FRAME = Object.freeze({
      kind: "lesson-39-multiple-derivation-frame",
      sourceSection: "Andrews 39.5",
      verbsMayAllowMoreThanOnePatientiveProcedure: true,
      procedures: Object.freeze(["passive-core", "impersonal-core", "perfective-active-core", "imperfective-active-core", "root-or-stock"]),
      translationsOftenSynonymousButMeaningsNeedNotBe: true,
      idiomaticRestrictionsCanChangeTranslationValue: true,
      doNotMergeOutputsByTranslation: true
    });
    const LESSON39_PATIENTIVE_COMPOUND_EMBED_FRAME = Object.freeze({
      kind: "lesson-39-patientive-compound-embed-frame",
      sourceSection: "Andrews 39.6",
      patientiveNounstemCanEmbedInNominalCompound: true,
      patientiveNounstemCanEmbedInVerbalCompound: true,
      derivationalHistoryControlsShapeAndMeaning: true,
      cannotInferCompoundFromFinalSurfaceAlone: true
    });
    const LESSON39_INCORPORATED_COMPLEMENT_FRAME = Object.freeze({
      kind: "lesson-39-incorporated-complement-frame",
      sourceSection: "Andrews 39.7",
      patientiveNounstemCanBeObjectComplement: true,
      absolutiveSourceFrame: Object.freeze({
        sourceSection: "Andrews 39.7.1",
        discardedSubjectSameReferentAsMatrixObject: true,
        matrixFamilies: Object.freeze(["perception", "section-30-15-matrices", "tlani"]),
        yeMatrixCompoundEmbedPossible: true,
        tlaniMatrixOnlyInMatrixSubposition: true
      }),
      possessiveSourceFrame: Object.freeze({
        sourceSection: "Andrews 39.7.2",
        possessorPronounTransformsToMainlineObjectPronoun: true,
        singleObjectMatrixCanInflateToDoubleObjectWithoutSuffix: true,
        violatesValencePrinciple: true,
        typeThreeCausativeUsesMatrixVerbNotSuffix: true,
        sourceReciprocalBecomesShuntlineWhenCausativeObjectIsMainline: true
      })
    });
    const LESSON39_INCORPORATED_OBJECT_FRAME = Object.freeze({
      kind: "lesson-39-incorporated-object-frame",
      sourceSection: "Andrews 39.8",
      patientiveNounstemCanBeIncorporatedObject: true,
      matrices: Object.freeze(["tla-(tlani)", "tla-(ih-tlani)", "tla-(tem-o-a)"]),
      possessorPronounTransformsToApplicativeObject: true,
      matrixTransitiveForceDischargedOnInsideAndOutsideObjects: true,
      violatesValencePrinciple: true,
      tlaniUseIsRare: true
    });
    const LESSON39_CHARACTERISTIC_PROPERTY_EMBED_FRAME = Object.freeze({
      kind: "lesson-39-characteristic-property-embed-frame",
      sourceSection: "Andrews 39.9",
      characteristicPropertyPatientiveCanEmbedInCompound: true,
      oftenOnlyEmbedOfDerivedNounstemIsUsed: true,
      yoTlMatrixCanBeOmittedWithFullDerivedMeaning: true,
      preteritAgentiveYoTlOmissionAlsoOccurs: true,
      mistranslationWarningForTonacatepetl: true
    });
    function buildLesson39PatientiveIncorporationObjectSlotOwnershipFrame({
      embedRole = "",
      matrixValence = "",
      consumedObjectSlot = "",
      sourceExternalObjectSlots = [],
      remainingExternalObjectSlots = []
    } = {}) {
      const sourceSlots = Array.isArray(sourceExternalObjectSlots) ? sourceExternalObjectSlots : [];
      const remainingSlots = Array.isArray(remainingExternalObjectSlots) ? remainingExternalObjectSlots : [];
      const resolvedMatrixValence = String(matrixValence || "").trim();
      return {
        kind: "lesson-39-patientive-incorporation-object-slot-ownership-frame",
        version: 1,
        embedRole: String(embedRole || "").trim(),
        matrixValence: resolvedMatrixValence,
        matrixValenceFrameFixed: Boolean(resolvedMatrixValence),
        consumedObjectSlot: String(consumedObjectSlot || "").trim(),
        consumedObjectSlotOwnedBy: consumedObjectSlot ? "route-frame" : "none",
        sourceExternalObjectSlots: sourceSlots.map(slot => ({
          ...slot
        })),
        remainingExternalObjectSlots: remainingSlots.map(slot => ({
          ...slot
        })),
        sourceExternalObjectSlotIds: sourceSlots.map(slot => String(slot?.slotId || "")).filter(Boolean),
        remainingExternalObjectSlotIds: remainingSlots.map(slot => String(slot?.slotId || "")).filter(Boolean),
        remainingExternalObjectSlotsOwnedBy: remainingSlots.length ? "matrix-route-frame" : "none",
        routeFrameOwnsObjectSlotLicensing: Boolean(resolvedMatrixValence),
        functionUseOwnsObjectSlots: false,
        finalFormulaShapeOwnsObjectSlots: false,
        functionUseMayAnnotateLicensedReadingsOnly: true,
        objectSlotLicensingOrder: ["source-principal-vnc", "patientive-source-nnc", "matrix-valence-frame", "route-frame", "function-use-annotation"]
      };
    }
    function buildLesson39PatientiveIncorporationRouteFrame({
      sourceSection = "",
      embedRole = "",
      matrixValence = "",
      matrixFamilies = [],
      consumedObjectSlot = "",
      sourceExternalObjectSlots = [],
      remainingExternalObjectSlots = [],
      valenceDelta = {},
      generationStatus = "diagnostic-only-source-gated"
    } = {}) {
      const sourceSlots = Array.isArray(sourceExternalObjectSlots) ? sourceExternalObjectSlots : [];
      const remainingSlots = Array.isArray(remainingExternalObjectSlots) ? remainingExternalObjectSlots : [];
      const objectSlotOwnership = buildLesson39PatientiveIncorporationObjectSlotOwnershipFrame({
        embedRole,
        matrixValence,
        consumedObjectSlot,
        sourceExternalObjectSlots: sourceSlots,
        remainingExternalObjectSlots: remainingSlots
      });
      return {
        kind: "lesson-39-patientive-incorporation-route-frame",
        version: 1,
        sourcePrincipalVnc: {
          formulaType: "CNV",
          sourceSection: String(sourceSection || ""),
          surface: "",
          generationStatus
        },
        sourceAdjunctNnc: {
          formulaType: "CNN",
          stemKind: "patientive-nounstem",
          role: String(embedRole || "").trim(),
          sourceSection: String(sourceSection || "")
        },
        matrix: {
          valence: String(matrixValence || "").trim(),
          families: Array.from(matrixFamilies || [])
        },
        matrixValence,
        embedRole: String(embedRole || "").trim(),
        consumedObjectSlot: String(consumedObjectSlot || "").trim(),
        sourceExternalObjectSlots: sourceSlots.map(slot => ({
          ...slot
        })),
        remainingExternalObjectSlots: remainingSlots.map(slot => ({
          ...slot
        })),
        remainingExternalObjectSlotIds: remainingSlots.map(slot => String(slot?.slotId || "")).filter(Boolean),
        objectSlotOwnership,
        valenceDelta: {
          ...valenceDelta
        },
        andrewsSection: String(sourceSection || ""),
        generationStatus,
        routeFrameLicensesEmbedRole: true,
        routeFrameLicensesObjectSlotOwnership: objectSlotOwnership.matrixValenceFrameFixed === true,
        finalFormulaShape: "patientive-nounstem-incorporated-in-matrix",
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseObjectSlots: true,
        sourceRouteFrameRequired: true
      };
    }
    const LESSON39_PATIENTIVE_OPERATIONS_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson39-perfective-patientive",
      andrewsSection: "39.1",
      category: "perfective-patientive",
      directiveEs: "El patientivo perfectivo viene del tronco activo perfectivo, clase tli, y se modela por analogia pasiva o impersonal.",
      engineSurface: "partial perfective patientivo route plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-perfective-passive-analogy",
      andrewsSection: "39.1.1",
      category: "perfective-passive-analogy",
      directiveEs: "Una fuente transitiva puede seguir analogia pasiva y usar los objetos que corresponderian a una CNV pasiva.",
      engineSurface: "partial perfective patientivo passive-analogy gate",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-perfective-impersonal-analogy",
      andrewsSection: "39.1.2",
      category: "perfective-impersonal-analogy",
      directiveEs: "Una fuente transitiva o intransitiva puede seguir analogia impersonal, incluso con reemplazo te por ta segun la ruta.",
      engineSurface: "partial perfective patientivo impersonal-analogy gate",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-perfective-compound-source",
      andrewsSection: "39.1.3",
      category: "perfective-compound-source",
      directiveEs: "La fuente perfectiva puede ser compuesta; las matrices de posesion adquirida quedan restringidas por parentesco y entorno.",
      engineSurface: "diagnostic compound-source frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-imperfective-patientive",
      andrewsSection: "39.2",
      category: "imperfective-patientive",
      directiveEs: "El patientivo imperfectivo viene del tronco activo imperfectivo, clase ti, con clases C/D y analogia pasiva o impersonal.",
      engineSurface: "partial imperfective patientivo route plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-imperfective-passive-analogy",
      andrewsSection: "39.2.1",
      category: "imperfective-passive-analogy",
      directiveEs: "La analogia pasiva no conserva te/ta salvo que el nucleo pasivo fuente lo contenga.",
      engineSurface: "partial imperfective passive-analogy gate",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-imperfective-impersonal-analogy",
      andrewsSection: "39.2.2",
      category: "imperfective-impersonal-analogy",
      directiveEs: "La analogia impersonal puede venir de fuente transitiva o intransitiva y debe evitar lecturas de compuesto equivocadas.",
      engineSurface: "partial imperfective impersonal-analogy gate",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-characteristic-property",
      andrewsSection: "39.3",
      category: "characteristic-property",
      directiveEs: "La propiedad caracteristica deriva de posesion abundante con matriz yo y expresa pertenencia o caracterizacion.",
      engineSurface: "partial characteristic-property route plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-characteristic-state-quality",
      andrewsSection: "39.3.1",
      category: "characteristic-state-quality",
      directiveEs: "Puede nombrar estado o cualidad inherente de la entidad incrustada.",
      engineSurface: "diagnostic characteristic-property frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-characteristic-pertaining",
      andrewsSection: "39.3.2",
      category: "characteristic-pertaining",
      directiveEs: "Puede nombrar cosa que pertenece al incrustado; la ortografia tradicional puede ocultar la fuente.",
      engineSurface: "diagnostic characteristic-property frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-characteristic-intrinsic",
      andrewsSection: "39.3.3",
      category: "characteristic-intrinsic",
      directiveEs: "Puede nombrar aspecto esencial o intrinseco; a veces el derivado reemplaza el significado del incrustado.",
      engineSurface: "diagnostic characteristic-property frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-organic-possession",
      andrewsSection: "39.3.4",
      category: "organic-possession",
      directiveEs: "La posesion organica usa matriz yo solo en estado posesivo; la posesion adventicia usa el tronco normal.",
      engineSurface: "partial organic possession route plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-preterit-agentive-embed",
      andrewsSection: "39.3.5",
      category: "preterit-agentive-characteristic-embed",
      directiveEs: "Un agentivo preterito puede llenar el incrustado de la matriz yo y no debe leerse como posesivo si es absolutivo.",
      engineSurface: "diagnostic characteristic-property frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-action-noun-embed",
      andrewsSection: "39.3.6",
      category: "action-noun-characteristic-embed",
      directiveEs: "Accion pasiva o activa puede llenar el incrustado; homofonos absolutivos pueden ser ambiguos.",
      engineSurface: "diagnostic characteristic-property frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-root-stock-patientive",
      andrewsSection: "39.4",
      category: "root-stock-patientive",
      directiveEs: "Los patientivos de raiz o stock derivan de destockales; la seleccion exacta de variante no siempre se recupera en superficie.",
      engineSurface: "partial root-stock patientivo route plus diagnostic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-ni-destockal-stock",
      andrewsSection: "39.4.1",
      category: "ni-destockal-stock",
      directiveEs: "Los destockales ni pueden agregar k/sh/s/ch al stock y acortar la vocal formativa salvo irregularidades.",
      engineSurface: "partial root-stock suffix contract",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-hua-destockal-stock",
      andrewsSection: "39.4.2",
      category: "hua-destockal-stock",
      directiveEs: "Los destockales hua suelen agregar k, a veces ch o stock desnudo, con lecturas de color o textura parcial.",
      engineSurface: "partial root-stock suffix contract",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-ihui-ahui-destockal-stock",
      andrewsSection: "39.4.3",
      category: "ihui-ahui-destockal-stock",
      directiveEs: "Los destockales ihui/ahui pueden agregar sh/k al stock; derivados causativos o-a requieren ta dentro del tronco.",
      engineSurface: "partial root-stock suffix contract",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-agentive-stock-meaning",
      andrewsSection: "39.4.4",
      category: "agentive-stock-meaning",
      directiveEs: "Algunos stocks destockales funcionan como troncos nominales con sentido agentivo o fuente desconocida con objetos visibles.",
      engineSurface: "diagnostic root-stock frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson39-multiple-derivation",
      andrewsSection: "39.5",
      category: "multiple-patientive-derivation",
      directiveEs: "Una fuente puede permitir varias derivaciones patientivas; traducciones sinonimas no significan misma estructura.",
      engineSurface: "partial multiple-derivation metadata",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson39-patientive-compound-embed",
      andrewsSection: "39.6",
      category: "patientive-compound-embed",
      directiveEs: "El patientivo puede incrustarse en compuestos nominales o verbales; la historia derivacional controla forma y significado.",
      engineSurface: "partial patientive compound continuations",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-incorporated-complement",
      andrewsSection: "39.7",
      category: "patientive-incorporated-complement",
      directiveEs: "Como complemento incorporado, el patientivo puede venir de CNN absolutiva o posesiva; el poseedor puede volverse objeto.",
      engineSurface: "partial incorporated-complement continuations",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-incorporated-object",
      andrewsSection: "39.8",
      category: "patientive-incorporated-object",
      directiveEs: "Como objeto incorporado, el patientivo usa matrices tlani/ihtlani/temoa y transfiere el poseedor a objeto aplicativo.",
      engineSurface: "partial incorporated-object continuations",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson39-characteristic-property-embed",
      andrewsSection: "39.9",
      category: "characteristic-property-embed",
      directiveEs: "El patientivo de propiedad caracteristica puede incrustarse completo o con omision de yo-t, sin cambiar el analisis.",
      engineSurface: "partial characteristic-property embed continuations",
      implementationState: "partial",
      redirectAction: "source-gated"
    })]);
    function getLesson39PatientiveOperationsSubsectionInventory() {
      return LESSON39_PATIENTIVE_OPERATIONS_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
        validationRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_VALIDATION_REFS)
      }));
    }
    function buildLesson39PatientiveOperationsPursuitFrame() {
      const subsectionInventory = getLesson39PatientiveOperationsSubsectionInventory();
      const perfectivePatientiveFrame = cloneNominalizationLessonRecord(LESSON39_PERFECTIVE_PATIENTIVE_FRAME);
      const imperfectivePatientiveFrame = cloneNominalizationLessonRecord(LESSON39_IMPERFECTIVE_PATIENTIVE_FRAME);
      const characteristicPropertyFrame = cloneNominalizationLessonRecord(LESSON39_CHARACTERISTIC_PROPERTY_FRAME);
      const rootStockPatientiveFrame = cloneNominalizationLessonRecord(LESSON39_ROOT_STOCK_PATIENTIVE_FRAME);
      const multipleDerivationFrame = cloneNominalizationLessonRecord(LESSON39_MULTIPLE_DERIVATION_FRAME);
      const patientiveCompoundEmbedFrame = cloneNominalizationLessonRecord(LESSON39_PATIENTIVE_COMPOUND_EMBED_FRAME);
      const incorporatedComplementFrame = cloneNominalizationLessonRecord(LESSON39_INCORPORATED_COMPLEMENT_FRAME);
      const incorporatedObjectFrame = cloneNominalizationLessonRecord(LESSON39_INCORPORATED_OBJECT_FRAME);
      const characteristicPropertyEmbedFrame = cloneNominalizationLessonRecord(LESSON39_CHARACTERISTIC_PROPERTY_EMBED_FRAME);
      const complementRemainingExternalObjectSlots = [{
        slotId: "mainline-object",
        role: "possessor-pronoun-transformed-to-object",
        source: "possessive-source-frame",
        owner: "matrix-route-frame"
      }];
      const objectRemainingExternalObjectSlots = [{
        slotId: "applicative-object",
        role: "possessor-pronoun-transformed-to-applicative-object",
        source: "possessive-source-frame",
        owner: "matrix-route-frame"
      }];
      const incorporatedComplementRouteFrame = buildLesson39PatientiveIncorporationRouteFrame({
        sourceSection: "Andrews 39.7",
        embedRole: "incorporated-complement",
        matrixValence: "object-complement-matrix-valence",
        matrixFamilies: incorporatedComplementFrame.absolutiveSourceFrame.matrixFamilies,
        consumedObjectSlot: "complement-slot",
        remainingExternalObjectSlots: complementRemainingExternalObjectSlots,
        valenceDelta: {
          complementSlots: 1,
          incorporatedObjectSlots: 0,
          remainingExternalObjectSlots: complementRemainingExternalObjectSlots.length
        }
      });
      incorporatedComplementFrame.incorporationRouteFrame = incorporatedComplementRouteFrame;
      incorporatedComplementFrame.routeFrame = incorporatedComplementRouteFrame;
      incorporatedComplementFrame.objectSlotOwnership = incorporatedComplementRouteFrame.objectSlotOwnership;
      const incorporatedObjectRouteFrame = buildLesson39PatientiveIncorporationRouteFrame({
        sourceSection: "Andrews 39.8",
        embedRole: "incorporated-object",
        matrixValence: "inside-and-outside-object-matrix-valence",
        matrixFamilies: incorporatedObjectFrame.matrices,
        consumedObjectSlot: "obj1",
        remainingExternalObjectSlots: objectRemainingExternalObjectSlots,
        valenceDelta: {
          complementSlots: 0,
          incorporatedObjectSlots: 1,
          remainingExternalObjectSlots: objectRemainingExternalObjectSlots.length
        }
      });
      incorporatedObjectFrame.incorporationRouteFrame = incorporatedObjectRouteFrame;
      incorporatedObjectFrame.routeFrame = incorporatedObjectRouteFrame;
      incorporatedObjectFrame.objectSlotOwnership = incorporatedObjectRouteFrame.objectSlotOwnership;
      const remainingGaps = ["Current Lesson 39 patientive operations are partial and do not complete every perfective, imperfective, characteristic-property, root/stock, multiple-derivation, compound-embed, incorporated-complement, incorporated-object, or characteristic-property-embed pattern.", "Perfective and imperfective patientive generation has current source gates, but full lexical source coverage, passive/impersonal analogies, compound ownerhood restrictions, and orthography-bridge examples remain evidence-needed.", "Characteristic-property and organic-possession routes are partial; inherited/intrinsic/pertaining meanings, homophonous action embeds, and yo-t omission need focused evidence.", "Root/stock patientives, multiple derivation, and compound continuations preserve diagnostics because exact variant choice, matrix inventories, valence violations, and idiomatic restrictions remain incomplete."];
      const frame = {
        kind: "lesson-39-patientive-operations-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 39,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS),
        plannedArrows: [{
          id: "lesson-39-patientive-operations-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 39.1-39.9 against current patientive family metadata, perfective and imperfective patientive source gates, characteristic-property yo-matrix behavior, root/stock patientive contracts, multiple-derivation metadata, compound embeds, incorporated complements, incorporated objects, and characteristic-property embed continuations.",
          andrewsRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-39-patientive-operations-audit",
          result: "hit",
          correction: "Lesson 39 now records Andrews patientive operations for perfective, imperfective, characteristic-property, root/stock, multiple-derivation, compound-embed, incorporated-complement, incorporated-object, and characteristic-property-embed behavior while preserving current evidence gates.",
          andrewsRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS),
          feedbackRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_VALIDATION_REFS)
        }],
        subsectionInventory,
        perfectivePatientiveFrame,
        imperfectivePatientiveFrame,
        characteristicPropertyFrame,
        rootStockPatientiveFrame,
        multipleDerivationFrame,
        patientiveCompoundEmbedFrame,
        incorporatedComplementFrame,
        incorporatedObjectFrame,
        characteristicPropertyEmbedFrame,
        currentEngineBoundary: {
          nominalizationBoundaryMetadataImplemented: true,
          patientiveFamilyProfileImplemented: true,
          perfectivePatientiveGenerationPartial: true,
          imperfectivePatientiveGenerationPartial: true,
          characteristicPropertyGenerationPartial: true,
          rootStockPatientiveGenerationPartial: true,
          multiplePatientiveDerivationMetadataPartial: true,
          patientiveCompoundEmbedContinuationPartial: true,
          incorporatedComplementContinuationPartial: true,
          incorporatedObjectContinuationPartial: true,
          characteristicPropertyEmbedContinuationPartial: true,
          fullLesson39GenerationImplemented: false,
          finiteOutputExpansionAllowedOnlyWithAndrewsSource: true
        },
        hitCount: 1,
        missCount: 0,
        remainingGaps,
        closestPass: false,
        generationAllowed: false
      };
      return attachNominalizationGrammarContract(frame, {
        metadataKind: "lesson-39-patientive-operations-pursuit-frame",
        unitKind: "patientive-family-boundary",
        routeStage: "audit-lesson-39",
        structuralSource: "Andrews Lesson 39",
        andrewsRefs: Array.from(LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS),
        generationAllowed: false,
        supported: true,
        sourceInput: "Andrews Lesson 39.1-39.9",
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: "orthography-bridge-plus-source-gate-required",
          rootStockRuleLettersNawat: Object.freeze(["k", "sh", "s", "ch"])
        },
        morphBoundaryFrame: {
          perfectivePatientiveFrame,
          imperfectivePatientiveFrame,
          characteristicPropertyFrame,
          rootStockPatientiveFrame,
          multipleDerivationFrame,
          patientiveCompoundEmbedFrame,
          incorporatedComplementFrame,
          incorporatedObjectFrame,
          characteristicPropertyEmbedFrame
        },
        stemFrame: {
          stemKind: "patientive-family",
          patientiveProcedures: multipleDerivationFrame.procedures,
          perfectiveAllowedEndings: perfectivePatientiveFrame.allowedPerfectiveCoreEndingsNawat,
          imperfectiveTargetClass: "ti",
          characteristicPropertyMatrix: characteristicPropertyFrame.nounstemMatrix,
          rootStockSuffixChoices: rootStockPatientiveFrame.niDestockalFrame.suffixChoices
        },
        nuclearClauseFrame: {
          categoryTransition: "VNC core/root/stock -> patientive NNC nounstem",
          sourceClauseKind: "CNV",
          targetClauseKind: "CNN",
          organicPossessionIsPossessiveStateOnly: characteristicPropertyFrame.organicPossessionFrame.organicPossessionOnlyPossessiveState,
          compoundContinuationsAreDerivedFromGeneratedNounstems: true
        },
        participantFrame: {
          semanticRole: "patient/result/property entity",
          possessorCanTransformToObjectInIncorporatedComplement: incorporatedComplementFrame.possessiveSourceFrame.possessorPronounTransformsToMainlineObjectPronoun,
          possessorCanTransformToApplicativeObjectInIncorporatedObject: incorporatedObjectFrame.possessorPronounTransformsToApplicativeObject,
          incorporatedComplementRouteFrame,
          incorporatedObjectRouteFrame,
          valencePrincipleViolationsAreDiagnostic: true
        },
        targetContract: {
          metadataKind: "lesson-39-patientive-operations-pursuit-frame",
          generationAllowed: false,
          closestPass: false,
          remainingGaps
        },
        diagnostics: ["patientive-operations-diagnostic-partial", "patientive-operations-source-gated"]
      });
    }
    function normalizeNominalizationBoundaryEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeNominalizationBoundaryKind(value = "") {
      return normalizeNominalizationBoundaryEnum(value, Object.values(NOMINALIZATION_BOUNDARY_KIND), NOMINALIZATION_BOUNDARY_KIND.unknown);
    }
    function normalizeNominalizationFalsePositiveSource(value = "") {
      return normalizeNominalizationBoundaryEnum(value, Object.values(NOMINALIZATION_FALSE_POSITIVE_SOURCE), NOMINALIZATION_FALSE_POSITIVE_SOURCE.unknown);
    }
    function normalizeNominalizationCandidateSurface(value = "") {
      const raw = String(value || "").trim();
      if (!raw || /[A-Z_]/.test(raw)) {
        return "";
      }
      const source = raw.replace(/\[[^\]]+\]/g, "").replace(/[Øø]/g, "").replace(/\b0\b/g, "").replace(/[#+(){}\s.-]/g, "").trim();
      if (!source || /[A-Z_]/.test(source)) {
        return "";
      }
      const conversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(source, {
        source: "Andrews nominalization candidate formula",
        slot: "nominalized-stem"
      }) : {
        output: source,
        diagnostics: []
      };
      return String(conversion?.output || source || "").trim();
    }
    function hasNominalizationAndrewsSourceGate({
      sourceGate = "",
      structuredSource = false
    } = {}) {
      return structuredSource === true || Boolean(String(sourceGate || "").trim());
    }
    function buildNominalizationBoundarySourceFrame({
      candidate = "",
      nominalizationKind = "",
      sourceVnc = "",
      stemUse = "",
      semanticRole = "",
      evidenceSource = "",
      sourceGate = "",
      targetFormulaSlots = null,
      targetSegmentFrames = []
    } = {}) {
      const normalizedKind = normalizeNominalizationBoundaryKind(nominalizationKind);
      if (normalizedKind === NOMINALIZATION_BOUNDARY_KIND.unknown) {
        return null;
      }
      const segments = Array.isArray(targetSegmentFrames) ? targetSegmentFrames.map(segment => {
        const surface = String(segment?.surface || "").trim();
        if (!surface || /[A-Z_]/.test(surface)) {
          return null;
        }
        return Object.freeze({
          slot: String(segment?.slot || ""),
          role: String(segment?.role || ""),
          formulaValue: String(segment?.formulaValue || ""),
          sourceStem: String(segment?.sourceStem || ""),
          surface,
          orthographyBridge: "Nawat/Pipil orthography bridge"
        });
      }).filter(Boolean) : [];
      if (!segments.length) {
        return null;
      }
      const targetSurface = segments.map(segment => segment.surface).join("");
      if (!targetSurface) {
        return null;
      }
      return Object.freeze({
        kind: "nominalization-boundary-source-frame",
        version: NOMINALIZATION_BOUNDARY_VERSION,
        routeFamily: "nominalization-boundary",
        nominalizationKind: normalizedKind,
        candidate: String(candidate || ""),
        sourceVnc: String(sourceVnc || ""),
        stemUse: String(stemUse || ""),
        semanticRole: String(semanticRole || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceGate: String(sourceGate || ""),
        targetFormulaSlots,
        targetSegmentFrames: Object.freeze(segments),
        targetSurface,
        authority: "Andrews Lessons 35-39 nominalization source frame",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function buildNominalizationBoundaryOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "nominalization-boundary-source-frame") {
        return null;
      }
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-35-39-nominalization-boundary-realization",
        routeFamily: "nominalization-boundary",
        routeStage: "execute-typed-operation-frame",
        operationApplied: "realize-nominalization-boundary-from-source-frame",
        sourceFrameKind: sourceFrame.kind,
        sourceNominalizationKind: sourceFrame.nominalizationKind,
        sourceVnc: sourceFrame.sourceVnc,
        sourceStemUse: sourceFrame.stemUse,
        sourceSemanticRole: sourceFrame.semanticRole,
        targetFormulaSlots: sourceFrame.targetFormulaSlots,
        targetSegmentFrames: sourceFrame.targetSegmentFrames,
        targetSurface: sourceFrame.targetSurface,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function getNominalizationBoundaryOperationFrameMismatch({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "nominalization-boundary-source-frame") {
        return "source-frame-required";
      }
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "andrews-35-39-nominalization-boundary-realization" || operationFrame.routeFamily !== "nominalization-boundary" || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "operation-frame-required";
      }
      if (String(operationFrame.sourceFrameKind || "") !== sourceFrame.kind || String(operationFrame.sourceNominalizationKind || "") !== String(sourceFrame.nominalizationKind || "") || String(operationFrame.sourceVnc || "") !== String(sourceFrame.sourceVnc || "") || String(operationFrame.sourceStemUse || "") !== String(sourceFrame.stemUse || "") || String(operationFrame.sourceSemanticRole || "") !== String(sourceFrame.semanticRole || "")) {
        return "contradictory-source-frame";
      }
      const targetSegmentFrames = Array.isArray(operationFrame.targetSegmentFrames) ? operationFrame.targetSegmentFrames : [];
      if (!targetSegmentFrames.length) {
        return "operation-frame-required";
      }
      const targetSurface = targetSegmentFrames.map(segment => String(segment?.surface || "")).join("");
      if (targetSurface !== String(sourceFrame.targetSurface || "") || String(operationFrame.targetSurface || "") !== String(sourceFrame.targetSurface || "")) {
        return "contradictory-target-frame";
      }
      if (sourceFrame.targetFormulaSlots && operationFrame.targetFormulaSlots !== sourceFrame.targetFormulaSlots) {
        return "contradictory-target-frame";
      }
      return "";
    }
    function getNominalizationBoundaryBlockedDiagnostic({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const mismatch = getNominalizationBoundaryOperationFrameMismatch({
        sourceFrame,
        operationFrame
      });
      return mismatch ? `nominalization-${mismatch}` : "";
    }
    function getNominalizationBoundaryAntiConflationRules() {
      return Array.from(NOMINALIZATION_ANTI_CONFLATION_RULES);
    }
    function getNominalizationBoundaryStructuralQuestions() {
      return NOMINALIZATION_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachNominalizationGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "nominalization",
        routeFamily: "nominalization",
        ...options
      });
    }
    function buildNominalizationBoundaryMetadata() {
      const boundary = {
        kind: "nominalization-boundary",
        version: NOMINALIZATION_BOUNDARY_VERSION,
        lessons: [35, 36, 37, 38, 39],
        status: "partial",
        grammarAuthority: "Andrews PDF Lessons 35-39",
        orthographyAuthority: "Modern Nawat/Pipil orthography and confirmed orthographic realization examples",
        targetAuthority: "Andrews grammar rules with Nawat/Pipil orthographic realization",
        generationAllowed: false,
        confirmedExamples: [],
        structuralQuestions: getNominalizationBoundaryStructuralQuestions(),
        boundaries: {
          hasGeneratedNominalSurfaces: true,
          hasGeneratedSLisActionNominalSurfaces: true,
          hasNominalizationProfile: true,
          hasPatientiveFamilyProfile: true,
          hasOwnerhoodGeneration: false,
          hasDeverbalLizZGeneration: false,
          hasFullPatientiveFamilyGeneration: false,
          hasStaticNominalizedVncData: false,
          changesGeneratedSurfaces: false,
          changesOrdinaryNncGeneration: false,
          changesVncGeneration: false
        },
        antiConflationRules: getNominalizationBoundaryAntiConflationRules()
      };
      return attachNominalizationGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary
      });
    }
    function classifyNominalizationBoundaryCandidate({
      candidate = "",
      nominalizationKind = "",
      sourceVnc = "",
      stemUse = "",
      semanticRole = "",
      evidenceSource = "",
      sourceGate = "",
      structuredSource = false,
      falsePositiveSource = "",
      hasNominalizationProfile = false,
      hasPatientiveFamilyProfile = false,
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const normalizedKind = normalizeNominalizationBoundaryKind(nominalizationKind);
      const normalizedFalsePositive = normalizeNominalizationFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const resolvedSourceFrame = sourceFrame && typeof sourceFrame === "object" ? sourceFrame : null;
      const requiresTypedOperation = normalizedKind !== NOMINALIZATION_BOUNDARY_KIND.unknown && normalizedFalsePositive === NOMINALIZATION_FALSE_POSITIVE_SOURCE.unknown;
      const blockedDiagnostic = requiresTypedOperation ? getNominalizationBoundaryBlockedDiagnostic({
        sourceFrame: resolvedSourceFrame,
        operationFrame
      }) : "";
      const sourceSurface = blockedDiagnostic ? "" : String(operationFrame?.targetSurface || "");
      const canGenerate = Boolean(sourceSurface && !blockedDiagnostic && normalizedKind !== NOMINALIZATION_BOUNDARY_KIND.unknown && normalizedFalsePositive === NOMINALIZATION_FALSE_POSITIVE_SOURCE.unknown);
      const targetFormulaSlots = canGenerate ? operationFrame.targetFormulaSlots : null;
      const targetSegmentFrames = canGenerate && Array.isArray(operationFrame.targetSegmentFrames) ? operationFrame.targetSegmentFrames : [];
      const classification = {
        kind: "nominalization-boundary-candidate-classification",
        version: NOMINALIZATION_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        nominalizationKind: normalizedKind,
        sourceVnc: String(sourceVnc || ""),
        stemUse: String(stemUse || ""),
        semanticRole: String(semanticRole || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceGate: String(sourceGate || ""),
        structuredSource: structuredSource === true,
        falsePositiveSource: normalizedFalsePositive,
        hasNominalizationProfile: hasNominalizationProfile === true,
        hasPatientiveFamilyProfile: hasPatientiveFamilyProfile === true,
        ...(resolvedSourceFrame ? {
          sourceFrame: resolvedSourceFrame
        } : {}),
        ...(operationFrame ? {
          operationFrame
        } : {}),
        confirmed: canGenerate,
        supported: canGenerate,
        generationAllowed: canGenerate,
        surface: canGenerate ? sourceSurface : "",
        surfaceForms: canGenerate ? [sourceSurface] : [],
        ...(canGenerate ? {
          formulaSlots: targetFormulaSlots,
          targetSegmentFrames
        } : {}),
        diagnostics: [canGenerate ? "nominalization-andrews-source-generated" : blockedDiagnostic || (hasEvidence ? "nominalization-needs-validation" : "nominalization-source-gate-required"), normalizedKind !== NOMINALIZATION_BOUNDARY_KIND.unknown ? "nominalization-category-recognized" : "nominalization-category-unconfirmed", hasNominalizationProfile ? "nominalization-profile-is-metadata-only" : "nominalization-profile-absent", hasPatientiveFamilyProfile ? "patientive-family-profile-is-partial" : "patientive-family-profile-absent", normalizedFalsePositive !== NOMINALIZATION_FALSE_POSITIVE_SOURCE.unknown ? "nominalization-false-positive-source" : canGenerate ? "nominalization-structured-source" : "nominalization-unconfirmed"],
        boundary: buildNominalizationBoundaryMetadata()
      };
      return attachNominalizationGrammarContract(classification, {
        routeStage: canGenerate ? "generate-structured-nominalization" : "classify-boundary",
        sourceInput: classification.candidate || classification.sourceVnc,
        generationAllowed: canGenerate,
        supported: canGenerate,
        evidenceSource: classification.sourceGate || classification.evidenceSource,
        surfaceForms: classification.surfaceForms,
        orthographyFrame: {
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          orthographyStatus: canGenerate ? "orthography-bridge-realized" : "orthography-bridge-required",
          surface: classification.surface,
          surfaceForms: classification.surfaceForms,
          sourceFrame: resolvedSourceFrame,
          operationFrame
        },
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
          stemKind: "nominalization-source-candidate",
          sourceKind: classification.stemUse,
          sourceStem: classification.sourceVnc,
          targetStem: classification.surface,
          sourceGate: resolvedSourceFrame?.sourceGate || classification.sourceGate,
          sourceFrame: resolvedSourceFrame,
          operationFrame
        },
        nuclearClauseFrame: canGenerate ? {
          formulaFamily: "nominalization",
          nominalizationKind: normalizedKind,
          sourceVnc: classification.sourceVnc,
          semanticRole: classification.semanticRole,
          formulaSlots: targetFormulaSlots,
          targetSegmentFrames
        } : null,
        targetContract: {
          metadataKind: "nominalization-boundary-candidate-classification",
          generationAllowed: canGenerate,
          consumesRenderedInput: false,
          displayStringsAuthorizeGrammar: false
        }
      });
    }
    function classifyNominalizationFalsePositive(source = "") {
      const normalizedSource = normalizeNominalizationFalsePositiveSource(source);
      const classification = {
        kind: "nominalization-false-positive",
        version: NOMINALIZATION_BOUNDARY_VERSION,
        source: normalizedSource,
        isNominalizationEvidence: false,
        isOwnerhoodEvidence: false,
        isDeverbalLizZEvidence: false,
        isFullPatientiveFamilyEvidence: false,
        generationAllowed: false,
        diagnostics: ["nominalization-false-positive-source"],
        antiConflationRules: getNominalizationBoundaryAntiConflationRules()
      };
      return attachNominalizationGrammarContract(classification, {
        routeStage: "classify-false-positive",
        sourceInput: normalizedSource,
        supported: false
      });
    }

    const api = {};
    Object.defineProperty(api, "NOMINALIZATION_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return NOMINALIZATION_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "NOMINALIZATION_BOUNDARY_KIND", {
        configurable: true,
        enumerable: true,
        get() { return NOMINALIZATION_BOUNDARY_KIND; },
    });
    Object.defineProperty(api, "NOMINALIZATION_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return NOMINALIZATION_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "NOMINALIZATION_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return NOMINALIZATION_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "NOMINALIZATION_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NOMINALIZATION_STRUCTURAL_QUESTIONS; },
    });
    api.freezeNominalizationOperationalLayerOperation = freezeNominalizationOperationalLayerOperation;
    api.freezeNominalizationOperationalLayerOperations = freezeNominalizationOperationalLayerOperations;
    Object.defineProperty(api, "ANDREWS_CNV_CNN_OPERATIONAL_LAYER_BY_LABEL", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_CNV_CNN_OPERATIONAL_LAYER_BY_LABEL; },
    });
    Object.defineProperty(api, "ANDREWS_CNV_CNN_OPERATIONAL_EXPECTED_SECTION_REFS_BY_LABEL", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_CNV_CNN_OPERATIONAL_EXPECTED_SECTION_REFS_BY_LABEL; },
    });
    api.cloneNominalizationOperationalLayerOperation = cloneNominalizationOperationalLayerOperation;
    api.getAndrewsCnvCnnOperationalLayerKeys = getAndrewsCnvCnnOperationalLayerKeys;
    api.getAndrewsCnvCnnOperationalLayer = getAndrewsCnvCnnOperationalLayer;
    api.getAndrewsCnvCnnOperationalLayerExpectedSections = getAndrewsCnvCnnOperationalLayerExpectedSections;
    api.auditAndrewsCnvCnnOperationalLayerCoverage = auditAndrewsCnvCnnOperationalLayerCoverage;
    api.auditAllAndrewsCnvCnnOperationalLayerCoverage = auditAllAndrewsCnvCnnOperationalLayerCoverage;
    api.normalizeAndrewsCnvCnnOperationalToken = normalizeAndrewsCnvCnnOperationalToken;
    api.classifyAndrewsCnvCnnOperationalExecutionKind = classifyAndrewsCnvCnnOperationalExecutionKind;
    api.compileAndrewsCnvCnnOperationalSuboperationPlan = compileAndrewsCnvCnnOperationalSuboperationPlan;
    api.getAndrewsCnvCnnOperationalSuboperationPlan = getAndrewsCnvCnnOperationalSuboperationPlan;
    api.auditAndrewsCnvCnnOperationalLogicCoverage = auditAndrewsCnvCnnOperationalLogicCoverage;
    api.auditAllAndrewsCnvCnnOperationalLogicCoverage = auditAllAndrewsCnvCnnOperationalLogicCoverage;
    Object.defineProperty(api, "ANDREWS_CNV_CNN_OPERATIONAL_ROUTE_BY_NOMINAL_KIND", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_CNV_CNN_OPERATIONAL_ROUTE_BY_NOMINAL_KIND; },
    });
    api.normalizeAndrewsCnvCnnOperationalSourceStem = normalizeAndrewsCnvCnnOperationalSourceStem;
    api.realizeAndrewsCnvCnnOperationalSurface = realizeAndrewsCnvCnnOperationalSurface;
    api.findAndrewsCnvCnnOperationalSuboperation = findAndrewsCnvCnnOperationalSuboperation;
    api.resolveAndrewsCnvCnnOperationalSuboperationId = resolveAndrewsCnvCnnOperationalSuboperationId;
    api.buildAndrewsCnvCnnOperationalSuboperationMissingRequirements = buildAndrewsCnvCnnOperationalSuboperationMissingRequirements;
    api.buildAndrewsCnvCnnOperationalFormulaEcho = buildAndrewsCnvCnnOperationalFormulaEcho;
    api.buildAndrewsCnvCnnOperationalSourceFormulaEcho = buildAndrewsCnvCnnOperationalSourceFormulaEcho;
    api.realizeAndrewsCnvCnnOperationalTargetRawSurface = realizeAndrewsCnvCnnOperationalTargetRawSurface;
    api.buildAndrewsCnvCnnOperationalSourceFrame = buildAndrewsCnvCnnOperationalSourceFrame;
    api.buildAndrewsCnvCnnOperationalHandledTarget = buildAndrewsCnvCnnOperationalHandledTarget;
    api.buildAndrewsCnvCnnOperationalOperationFrame = buildAndrewsCnvCnnOperationalOperationFrame;
    api.getAndrewsCnvCnnOperationalFrameMismatch = getAndrewsCnvCnnOperationalFrameMismatch;
    api.executeAndrewsCnvCnnOperationalHandler = executeAndrewsCnvCnnOperationalHandler;
    api.buildAndrewsCnvCnnOperationalSuboperationFrame = buildAndrewsCnvCnnOperationalSuboperationFrame;
    Object.defineProperty(api, "LESSON35_PRETERIT_AGENTIVE_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_PRETERIT_AGENTIVE_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON35_PRETERIT_AGENTIVE_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_PRETERIT_AGENTIVE_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON35_NOMINALIZATION_OVERVIEW_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_NOMINALIZATION_OVERVIEW_FRAME; },
    });
    Object.defineProperty(api, "LESSON35_ABSOLUTIVE_PRETERIT_AGENTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_ABSOLUTIVE_PRETERIT_AGENTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON35_NUMBER_POSITION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_NUMBER_POSITION_FRAME; },
    });
    Object.defineProperty(api, "LESSON35_GENERAL_USE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_GENERAL_USE_FRAME; },
    });
    Object.defineProperty(api, "LESSON35_POSSESSIVE_STATE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_POSSESSIVE_STATE_FRAME; },
    });
    Object.defineProperty(api, "LESSON35_COMPOUND_EMBED_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_COMPOUND_EMBED_FRAME; },
    });
    Object.defineProperty(api, "LESSON35_OLD_PERSON_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_OLD_PERSON_FRAME; },
    });
    Object.defineProperty(api, "LESSON35_OWNERHOOD_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_OWNERHOOD_FRAME; },
    });
    Object.defineProperty(api, "LESSON35_ABUNDANT_OWNERHOOD_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_ABUNDANT_OWNERHOOD_FRAME; },
    });
    Object.defineProperty(api, "LESSON35_OWNERHOOD_ANALYSIS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_OWNERHOOD_ANALYSIS_FRAME; },
    });
    Object.defineProperty(api, "LESSON35_VNC_EMBED_ADVERBIAL_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_VNC_EMBED_ADVERBIAL_FRAME; },
    });
    Object.defineProperty(api, "LESSON35_PRETERIT_AGENTIVE_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON35_PRETERIT_AGENTIVE_SUBSECTION_INVENTORY; },
    });
    api.cloneNominalizationLessonRecord = cloneNominalizationLessonRecord;
    api.buildLesson35PreteritAgentiveIncorporationObjectSlotOwnershipFrame = buildLesson35PreteritAgentiveIncorporationObjectSlotOwnershipFrame;
    api.buildLesson35PreteritAgentiveIncorporationRouteFrame = buildLesson35PreteritAgentiveIncorporationRouteFrame;
    api.getLesson35PreteritAgentiveSubsectionInventory = getLesson35PreteritAgentiveSubsectionInventory;
    api.buildLesson35PreteritAgentivePursuitFrame = buildLesson35PreteritAgentivePursuitFrame;
    Object.defineProperty(api, "LESSON36_NOMINALIZED_VNC_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON36_NOMINALIZED_VNC_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON36_NOMINALIZED_VNC_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON36_NOMINALIZED_VNC_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON36_CUSTOMARY_PRESENT_AGENTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON36_CUSTOMARY_PRESENT_AGENTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON36_CUSTOMARY_PRESENT_PATIENTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON36_CUSTOMARY_PRESENT_PATIENTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON36_INSTRUMENTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON36_INSTRUMENTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON36_PRESENT_AGENTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON36_PRESENT_AGENTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON36_FUTURE_AGENTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON36_FUTURE_AGENTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON36_ACTION_NNC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON36_ACTION_NNC_FRAME; },
    });
    Object.defineProperty(api, "LESSON36_NOMINALIZED_VNC_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON36_NOMINALIZED_VNC_SUBSECTION_INVENTORY; },
    });
    api.getLesson36NominalizedVncSubsectionInventory = getLesson36NominalizedVncSubsectionInventory;
    api.buildLesson36NominalizedVncPursuitFrame = buildLesson36NominalizedVncPursuitFrame;
    Object.defineProperty(api, "LESSON37_DEVERBAL_NOUNSTEM_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_DEVERBAL_NOUNSTEM_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_DEVERBAL_NOUNSTEM_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON37_DEVERBAL_OVERVIEW_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_DEVERBAL_OVERVIEW_FRAME; },
    });
    Object.defineProperty(api, "LESSON37_ACTIVE_ACTION_Z_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_ACTIVE_ACTION_Z_FRAME; },
    });
    Object.defineProperty(api, "LESSON37_ACTIVE_ACTION_LIZ_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_ACTIVE_ACTION_LIZ_FRAME; },
    });
    Object.defineProperty(api, "LESSON37_LIZ_TRANSLATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_LIZ_TRANSLATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON37_ACTIVE_ACTION_PARTICULARS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_ACTIVE_ACTION_PARTICULARS_FRAME; },
    });
    Object.defineProperty(api, "LESSON37_ACTIVE_PASSIVE_ACTION_CONTRAST_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_ACTIVE_PASSIVE_ACTION_CONTRAST_FRAME; },
    });
    Object.defineProperty(api, "LESSON37_MULTIPLE_NUCLEUS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_MULTIPLE_NUCLEUS_FRAME; },
    });
    Object.defineProperty(api, "LESSON37_PATIENTIVE_OVERVIEW_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_PATIENTIVE_OVERVIEW_FRAME; },
    });
    Object.defineProperty(api, "LESSON37_PASSIVE_PATIENTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_PASSIVE_PATIENTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON37_DEVERBAL_NOUNSTEM_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON37_DEVERBAL_NOUNSTEM_SUBSECTION_INVENTORY; },
    });
    api.getLesson37DeverbalNounstemSubsectionInventory = getLesson37DeverbalNounstemSubsectionInventory;
    api.buildLesson37DeverbalNounstemPursuitFrame = buildLesson37DeverbalNounstemPursuitFrame;
    Object.defineProperty(api, "LESSON38_IMPERSONAL_PATIENTIVE_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON38_IMPERSONAL_PATIENTIVE_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON38_IMPERSONAL_PATIENTIVE_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON38_IMPERSONAL_PATIENTIVE_OVERVIEW_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON38_IMPERSONAL_PATIENTIVE_OVERVIEW_FRAME; },
    });
    Object.defineProperty(api, "LESSON38_INTRANSITIVE_SOURCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON38_INTRANSITIVE_SOURCE_FRAME; },
    });
    Object.defineProperty(api, "LESSON38_REFLEXIVE_SOURCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON38_REFLEXIVE_SOURCE_FRAME; },
    });
    Object.defineProperty(api, "LESSON38_PROJECTIVE_NONHUMAN_SOURCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON38_PROJECTIVE_NONHUMAN_SOURCE_FRAME; },
    });
    Object.defineProperty(api, "LESSON38_PROJECTIVE_TE_SOURCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON38_PROJECTIVE_TE_SOURCE_FRAME; },
    });
    Object.defineProperty(api, "LESSON38_HUMAN_NONHUMAN_CONTRAST_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON38_HUMAN_NONHUMAN_CONTRAST_FRAME; },
    });
    Object.defineProperty(api, "LESSON38_TRANSLATION_OVERLAP_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON38_TRANSLATION_OVERLAP_FRAME; },
    });
    Object.defineProperty(api, "LESSON38_COMPOUND_PATIENTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON38_COMPOUND_PATIENTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON38_IMPERSONAL_PATIENTIVE_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON38_IMPERSONAL_PATIENTIVE_SUBSECTION_INVENTORY; },
    });
    api.getLesson38ImpersonalPatientiveSubsectionInventory = getLesson38ImpersonalPatientiveSubsectionInventory;
    api.buildLesson38ImpersonalPatientivePursuitFrame = buildLesson38ImpersonalPatientivePursuitFrame;
    Object.defineProperty(api, "LESSON39_PATIENTIVE_OPERATIONS_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_PATIENTIVE_OPERATIONS_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_PATIENTIVE_OPERATIONS_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON39_PERFECTIVE_PATIENTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_PERFECTIVE_PATIENTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON39_IMPERFECTIVE_PATIENTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_IMPERFECTIVE_PATIENTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON39_CHARACTERISTIC_PROPERTY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_CHARACTERISTIC_PROPERTY_FRAME; },
    });
    Object.defineProperty(api, "LESSON39_ROOT_STOCK_PATIENTIVE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_ROOT_STOCK_PATIENTIVE_FRAME; },
    });
    Object.defineProperty(api, "LESSON39_MULTIPLE_DERIVATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_MULTIPLE_DERIVATION_FRAME; },
    });
    Object.defineProperty(api, "LESSON39_PATIENTIVE_COMPOUND_EMBED_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_PATIENTIVE_COMPOUND_EMBED_FRAME; },
    });
    Object.defineProperty(api, "LESSON39_INCORPORATED_COMPLEMENT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_INCORPORATED_COMPLEMENT_FRAME; },
    });
    Object.defineProperty(api, "LESSON39_INCORPORATED_OBJECT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_INCORPORATED_OBJECT_FRAME; },
    });
    Object.defineProperty(api, "LESSON39_CHARACTERISTIC_PROPERTY_EMBED_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_CHARACTERISTIC_PROPERTY_EMBED_FRAME; },
    });
    api.buildLesson39PatientiveIncorporationObjectSlotOwnershipFrame = buildLesson39PatientiveIncorporationObjectSlotOwnershipFrame;
    api.buildLesson39PatientiveIncorporationRouteFrame = buildLesson39PatientiveIncorporationRouteFrame;
    Object.defineProperty(api, "LESSON39_PATIENTIVE_OPERATIONS_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON39_PATIENTIVE_OPERATIONS_SUBSECTION_INVENTORY; },
    });
    api.getLesson39PatientiveOperationsSubsectionInventory = getLesson39PatientiveOperationsSubsectionInventory;
    api.buildLesson39PatientiveOperationsPursuitFrame = buildLesson39PatientiveOperationsPursuitFrame;
    api.normalizeNominalizationBoundaryEnum = normalizeNominalizationBoundaryEnum;
    api.normalizeNominalizationBoundaryKind = normalizeNominalizationBoundaryKind;
    api.normalizeNominalizationFalsePositiveSource = normalizeNominalizationFalsePositiveSource;
    api.normalizeNominalizationCandidateSurface = normalizeNominalizationCandidateSurface;
    api.hasNominalizationAndrewsSourceGate = hasNominalizationAndrewsSourceGate;
    api.buildNominalizationBoundarySourceFrame = buildNominalizationBoundarySourceFrame;
    api.buildNominalizationBoundaryOperationFrame = buildNominalizationBoundaryOperationFrame;
    api.getNominalizationBoundaryOperationFrameMismatch = getNominalizationBoundaryOperationFrameMismatch;
    api.getNominalizationBoundaryBlockedDiagnostic = getNominalizationBoundaryBlockedDiagnostic;
    api.getNominalizationBoundaryAntiConflationRules = getNominalizationBoundaryAntiConflationRules;
    api.getNominalizationBoundaryStructuralQuestions = getNominalizationBoundaryStructuralQuestions;
    api.attachNominalizationGrammarContract = attachNominalizationGrammarContract;
    api.buildNominalizationBoundaryMetadata = buildNominalizationBoundaryMetadata;
    api.classifyNominalizationBoundaryCandidate = classifyNominalizationBoundaryCandidate;
    api.classifyNominalizationFalsePositive = classifyNominalizationFalsePositive;
    return api;
}

export function installNominalizationBoundaryGlobals(targetObject = globalThis) {
    const api = createNominalizationBoundaryModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
