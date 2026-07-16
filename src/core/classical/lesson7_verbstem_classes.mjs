// Canonical modern ESM module.

export function createClassicalNahuatlLesson7VerbstemClassesRuntime(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_LESSON7_VERBSTEM_CLASSES_VERSION = 1;
    const CLASSICAL_NAHUATL_LESSON7_PROFILE_ID = "classical-nahuatl";
    const CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO = "\u2395";
    const CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY = "Transcription line ranges are the legal deed; digest anchors are navigation aids only.";
    const CLASSICAL_NAHUATL_LESSON7_OUTPUTABLE_SLOTS = Object.freeze(["verbcore-citation", "stem-class", "aspect-stem", "conditioned-optional-irregular-stem", "tns", "formula"]);
    const CLASSICAL_NAHUATL_LESSON7_SUPPORTIVE_I_SURFACE_POLICY = "conditional-support-vowel-boundary-action";
    const CLASSICAL_NAHUATL_LESSON7_SUPPORTIVE_I_SURFACE_ACTIONS = Object.freeze({
      DROP: "drop",
      RETAIN: "retain",
      NOT_SUPPORTIVE: "not-supportive"
    });
    const CLASSICAL_NAHUATL_LESSON7_STRUCTURE_ACTIONS = Object.freeze({
      KEEP_INSIDE_VERBSTEM: "keep-stem-internal-morphs-inside-one-verbstem",
      BLOCK_FORMULA_SLOT_SPLIT: "block-stem-internal-morphs-as-formula-slots",
      AUTHORIZE_UNKNOWN_WITHOUT_GLOSS: "authorize-unknown-internal-morph-without-invented-gloss",
      PRESERVE_CONTRASTIVE_BOUNDARIES: "preserve-contrastive-analysis-boundaries",
      BLOCK_HYPHEN_AS_EMBED_MATRIX: "block-hyphen-only-embed-matrix-inference",
      AUTHORIZE_CANVAS_EMBED_MATRIX: "authorize-canvas-witnessed-embed-matrix-roles"
    });
    const CLASSICAL_NAHUATL_LESSON7_SOURCE_SELECTION_ACTIONS = Object.freeze({
      SELECT_WHOLE_STEM: "select-canvas-whole-stem-source",
      SELECT_INTERNAL_MORPHEMES: "select-canvas-internal-morpheme-source",
      SELECT_EMBED_MATRIX: "select-canvas-embed-matrix-source",
      ACCEPT_USER_CANVAS_SELECTION: "accept-user-source-selection-when-canvas-permits",
      BLOCK_USER_SOURCE_SELECTION: "block-user-source-selection-not-authorized-by-canvas",
      CARRY_TO_SELECTED_OUTPUT: "carry-source-selection-to-selected-output"
    });
    const CLASSICAL_NAHUATL_LESSON7_CITATION_ACTIONS = Object.freeze({
      REQUIRE_VERBCORE: "cite-valence-plus-stem-verbcore",
      REPRESENT_PROJECTIVE_WITH_TE_TLA: "represent-projective-object-with-te-or-tla",
      BLOCK_FORMULA_SLOT_PLACEHOLDER: "block-formula-slot-placeholder-as-citation-marker",
      PRESERVE_REFLEXIVE_RECIPROCAL_DYAD: "preserve-reflexive-reciprocal-dyad-as-citation-marker"
    });
    const CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS = Object.freeze({
      DETERMINE_BY_PERFECTIVE_STEM: "determine-class-by-perfective-stem-shape",
      DISTINGUISH_CLASS_B_KINDS: "distinguish-class-b-vowel-loss-from-silent-causative-carrier",
      REQUIRE_TYPE_ONE_CAUSATIVE_A_WITNESS: "require-type-one-causative-a-witness",
      PRESERVE_SILENT_CAUSATIVE_CARRIER: "preserve-silent-causative-carrier-under-analysis-omission",
      BLOCK_PHONOLOGICAL_COLLAPSE: "block-phonological-identity-from-erasing-morphology",
      SELECT_TENSE_CONDITIONED_IMPERFECTIVE_SHAPE: "select-tense-conditioned-imperfective-shape",
      BLOCK_FREE_IMPERFECTIVE_SHAPE_SWITCH: "block-free-imperfective-shape-switch",
      PRESERVE_SILENT_TRUNCATED_CARRIER: "preserve-silent-truncated-derivational-carrier",
      APPLY_TRADITIONAL_SPELLING_WARNING: "apply-traditional-spelling-warning",
      BLOCK_TRADITIONAL_SPELLING_CLASS_C_MISREAD: "block-traditional-oa-ia-class-c-misread",
      PRESERVE_HIDDEN_W_Y_CLASS_B_CHANGE: "preserve-hidden-w-y-class-b-change",
      APPLY_GUIDELINE_WITNESS: "apply-canvas-guideline-class-witness",
      PRESERVE_GUIDELINE_CLASS_OPTIONS: "preserve-guideline-class-options",
      PRESERVE_GUIDELINE_SEMANTIC_CONDITION: "preserve-guideline-semantic-condition",
      BLOCK_CONTRADICTORY_GUIDELINE_CLASS: "block-contradictory-guideline-class-selection"
    });
    const CLASSICAL_NAHUATL_LESSON7_PREDICATE_ACTIONS = Object.freeze({
      SELECT_CANVAS_TABLE_CELL: "select-canvas-7.7-predicate-table-cell",
      REQUIRE_CORE_BEFORE_TENSE: "require-core-before-tense-in-predicate-carrier",
      CARRY_TABLE_CELL_TO_SELECTED_OUTPUT: "carry-predicate-table-cell-to-selected-output",
      BLOCK_HOSTILE_PREDICATE_CARRIER: "block-hostile-predicate-carrier"
    });
    const CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_ACTIONS = Object.freeze({
      SELECT_CANVAS_RELATIONSHIP: "select-canvas-7.9-object-relationship",
      PRESERVE_INDEFINITE_SPECIFIC_DISTINCTION: "preserve-indefinite-specific-object-distinction",
      PRESERVE_REFLEXIVE_RECIPROCAL_POSSIBILITY: "preserve-human-reflexive-reciprocal-possibility",
      CARRY_RELATIONSHIP_TO_SELECTED_OUTPUT: "carry-object-relationship-to-selected-output",
      BLOCK_CONTRADICTORY_RELATIONSHIP: "block-contradictory-object-relationship"
    });
    const CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_ACTIONS = Object.freeze({
      APPLY_ADVERB_BOUNDARY_TEST: "apply-adverb-before-tla-boundary-test",
      BUILD_MATRIX_TLA_FUSION: "build-matrix-plus-tla-fusion",
      BUILD_EMBED_MATRIX_TLA_FUSION: "build-embed-matrix-plus-tla-fusion",
      MOVE_TLA_INSIDE_VERBSTEM: "move-tla-inside-derived-verbstem",
      REQUIRE_DERIVED_INTRANSITIVE: "require-derived-intransitive-vnc-after-fusion",
      PRESERVE_TRANSITIVE_TLA_OBJECT: "preserve-unfused-transitive-tla-object",
      CARRY_FUSION_TO_SELECTED_OUTPUT: "carry-tla-fusion-analysis-to-selected-output",
      BLOCK_CONTRADICTORY_FUSION: "block-contradictory-tla-fusion-analysis"
    });
    const CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS = Object.freeze({
      PLACE_DIRECTIONAL_INSIDE_VNC_CORE: "place-directional-locative-inside-vnc-core",
      PLACE_DIRECTIONAL_BEFORE_STEM: "place-directional-locative-before-intransitive-stem",
      PLACE_DIRECTIONAL_BEFORE_MONADIC_VALENCE: "place-directional-locative-before-monadic-valence",
      PLACE_DIRECTIONAL_BEFORE_REFLEXIVE_RECIPROCAL: "place-directional-locative-before-reflexive-reciprocal-valence",
      PLACE_DIRECTIONAL_AFTER_SPECIFIC_PROJECTIVE: "place-directional-locative-after-specific-projective-valence",
      REALIZE_FINAL_FORMULA_BOUNDARIES: "realize-final-formula-boundaries-after-slot-order",
      REALIZE_PERS1_SUPPORT_AFTER_SLOT_ORDER: "realize-pers1-supportive-vowel-after-slot-order",
      REALIZE_THIRD_SINGULAR_OBJECT_AFTER_DIRECTIONAL: "realize-third-singular-k-object-after-directional-neighbor",
      REALIZE_THIRD_PLURAL_OBJECT_AFTER_DIRECTIONAL: "realize-third-plural-object-number-before-directional-neighbor",
      REALIZE_NUM1_K_CONNECTOR_AFTER_FINAL_PREDICATE: "realize-num1-k-connector-after-final-predicate",
      REPLACE_PERS1_SUPPORTIVE_I_WITH_O: "replace-pers1-supportive-i-with-o-before-c-on",
      KEEP_ANTECESSIVE_OUTSIDE_VNC: "keep-antecessive-order-prefix-outside-vnc-boundary",
      KEEP_NEGATIVE_OUTSIDE_VNC: "keep-negative-prefix-outside-vnc-boundary",
      ATTRACT_NEGATIVE_TO_ANTECESSIVE: "attract-negative-prefix-to-antecessive-prefix",
      PRESERVE_OBJECT_SHAPE_UNDER_OUTSIDE_PREFIX: "preserve-object-shape-under-outside-prefix",
      BLOCK_OUTSIDE_PREFIX_AS_FORMULA_SLOT: "block-outside-prefix-as-vnc-formula-slot",
      CARRY_BOUNDARY_TO_SELECTED_OUTPUT: "carry-expanded-vnc-boundary-to-selected-output"
    });
    const CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS = Object.freeze({
      REWRITE_INDICATIVE_VNC_AS_AFFIRMATIVE_ASSERTION: "rewrite-indicative-vnc-as-simple-affirmative-assertion",
      ADD_NEGATIVE_OUTSIDE_VNC: "add-negative-prefix-outside-vnc-for-negative-assertion",
      ADD_EMPHATIC_CA_TO_SENTENCE_LEFT_EDGE: "add-emphatic-ca-to-sentence-left-edge",
      MARK_YES_NO_BY_INTONATION: "mark-yes-no-question-by-intonation",
      ADD_CUIX_TO_SENTENCE_LEFT_EDGE: "add-cuix-to-sentence-left-edge",
      KEEP_SENTENCE_PARTICLES_OUT_OF_VNC_FORMULA: "keep-sentence-particles-out-of-vnc-formula",
      BLOCK_SENTENCE_PARTICLE_FORMULA_SLOT: "block-sentence-particle-as-vnc-formula-slot",
      CARRY_SENTENCE_SURFACE_TO_SELECTED_OUTPUT: "carry-sentence-surface-to-selected-output"
    });
    const CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS = Object.freeze({
      MARK_LOWER_VNC_PROVISIONAL: "mark-lower-vnc-output-provisional-under-lesson9-sentence-layer",
      SUBSTITUTE_OPTATIVE_VNC_FOR_INDICATIVE: "substitute-optative-vnc-for-indicative-in-wish-command-sentence",
      ACCEPT_FUTURE_INDICATIVE_AS_OPTATIVE: "accept-future-indicative-as-future-optative-by-use",
      ADD_INTRODUCTORY_PARTICLE_OUTSIDE_VNC: "add-ma-or-tla-introductory-particle-outside-vnc",
      REQUIRE_INTRODUCTORY_PARTICLE_FOR_WISH: "require-ma-or-tla-for-wish-sentence",
      REQUIRE_INTRODUCTORY_PARTICLE_FOR_FIRST_THIRD: "require-ma-or-tla-for-first-third-person-optative-command",
      REQUIRE_INTRODUCTORY_PARTICLE_FOR_FUTURE_COMMAND: "require-ma-or-tla-for-future-indicative-as-optative-command",
      ALLOW_SECOND_PERSON_COMMAND_OMISSION: "allow-second-person-command-to-omit-introductory-particle",
      DERIVE_COMMAND_EXHORTATION_ROLE_FROM_SUBJECT: "derive-command-exhortation-role-from-subject-person",
      CHANGE_NEGATIVE_AH_TO_CA_WITH_INTRODUCTORY_PARTICLE: "change-negative-ah-to-ca-under-ma-or-tla",
      KEEP_AH_FOR_BRUSQUE_NEGATIVE_COMMAND_WITHOUT_MA: "keep-ah-for-brusque-negative-command-without-ma",
      ADD_PREFACE_PARTICLE_OUTSIDE_VNC: "add-lesson9-preface-particle-outside-vnc",
      ADD_INTRODUCTORY_MODIFIER_OUTSIDE_VNC: "add-lesson9-introductory-modifier-outside-vnc",
      KEEP_INTRODUCTORY_PARTICLE_OUT_OF_VNC_FORMULA: "keep-introductory-particle-out-of-vnc-formula",
      BLOCK_INTRODUCTORY_PARTICLE_FORMULA_SLOT: "block-introductory-particle-as-vnc-formula-slot",
      CARRY_SENTENCE_FINALIZER_TO_SELECTED_OUTPUT: "carry-lesson9-sentence-finalizer-to-selected-output"
    });
    const CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS = Object.freeze({
      MARK_LOWER_VNC_PROVISIONAL: "mark-lower-vnc-output-provisional-under-lesson10-admonitive-sentence-layer",
      CLASSIFY_ADMONITIVE_AS_POSITIVE_WARNING: "classify-admonitive-as-positive-cautionary-warning",
      REJECT_VETITIVE_PROHIBITION_READING: "reject-vetitive-prohibition-reading",
      BLOCK_DONT_TRANSLATION_AUTHORITY: "block-dont-or-may-not-translation-as-admonitive-authority",
      REQUIRE_ADMONITIVE_VNC: "require-admonitive-vnc-for-admonition-sentence",
      ENFORCE_NONPAST_ONLY: "enforce-admonitive-nonpast-only",
      USE_PERFECTIVE_STEM: "use-perfective-stem-for-nonpast-admonitive",
      RECORD_CLASS_A_H_CONTRAST: "record-class-a-h-vs-preterit-zero-contrast",
      RECORD_ADMONITIVE_NUMBER_DYADS: "record-admonitive-number-dyads-square-zero-and-t-in-t-ih",
      MARK_NO_TRANSLATION_OUTSIDE_SENTENCE: "mark-admonitive-vnc-no-translation-value-outside-sentence",
      REQUIRE_NONPAST_PERFECTIVE_STEM: "require-nonpast-admonitive-perfective-stem",
      SUBSTITUTE_ADMONITIVE_FOR_PRESENT_INDICATIVE: "substitute-admonitive-vnc-for-present-indicative-assertion",
      ADD_MA_OUTSIDE_VNC: "add-ma-obligatory-admonitive-particle-outside-vnc",
      REQUIRE_MA_SENTENCE_BEGINNING: "require-ma-at-beginning-of-admonition-sentence",
      ADD_NEN_OUTSIDE_VNC: "add-nen-admonitive-collocation-outside-vnc",
      RECORD_NEN_ADVERBIALIZED_NNC: "record-nen-as-adverbialized-nnc-strengthener",
      RECORD_MANEN_TRADITIONAL_SOLID_SPELLING: "record-ma-nen-traditional-solid-spelling-manen",
      DERIVE_ADMONITION_ROLE_FROM_SUBJECT: "derive-admonition-comparison-role-from-subject-person",
      AUTHORIZE_WARNING_RENDERINGS: "authorize-warning-sense-renderings-not-example-whitelist",
      REQUIRE_MA_NEN_FOR_NEGATIVE_ADMONITION: "require-ma-nen-for-negative-admonition",
      TRANSFORM_NEGATIVE_ASSERTION_TO_NEGATIVE_ADMONITION: "transform-negative-present-indicative-assertion-to-negative-admonition",
      AFFIX_AH_TO_ADMONITIVE_VNC: "affix-ah-negative-prefix-to-admonitive-vnc",
      RECORD_NEGATIVE_ADMONITION_CANCELS_WARNING: "record-negative-admonition-cancels-warning-and-rejects-caution",
      REJECT_POSITIVE_VETATIVE_TERM_AUTHORITY: "reject-positive-vetative-term-as-authority-label",
      KEEP_NEGATIVE_AH_IN_ADMONITION: "keep-ah-negative-after-ma-in-admonition",
      BLOCK_CA_FOR_ADMONITION: "block-ca-negative-for-admonition",
      RECORD_ADMONITIVE_OPTATIVE_PRESENT_PRETERIT_CONTRASTS: "record-admonitive-optative-present-preterit-contrast-set",
      RECORD_SECOND_PERSON_X_XI_OPTATIVE_DISTINCTION: "record-second-person-optative-x-xi-distinction",
      RECORD_PLURAL_SUBJECTS_ALWAYS_DISTINCTIVE: "record-plural-subjects-always-distinctive",
      RECORD_MA_AS_ADMONITIVE_SENTENCE_DISTINGUISHER: "record-ma-as-admonitive-sentence-layer-distinguisher",
      RECORD_GLOTTAL_STOP_AMBIGUITY_WARNING: "record-glottal-stop-omission-ambiguity-warning",
      RECORD_H_TENSE_VS_NUM1_ROLE_CONTRAST: "record-h-tense-morph-vs-num1-filler-role-contrast",
      BLOCK_ANTECESSIVE_WITH_ADMONITIVE: "block-antecessive-order-prefix-with-nonpast-admonitive",
      BLOCK_CONTRAST_READING_AS_ADMONITIVE_AUTHORITY: "block-contrast-vnc-reading-as-admonitive-authority",
      KEEP_ADMONITIVE_PARTICLES_OUT_OF_VNC_FORMULA: "keep-admonitive-particles-out-of-vnc-formula",
      CARRY_SENTENCE_FINALIZER_TO_SELECTED_OUTPUT: "carry-lesson10-admonitive-finalizer-to-selected-output"
    });
    const CLASSICAL_NAHUATL_LESSON7_UNKNOWN_INTERNAL_MORPH_RECORDS = Object.freeze({
      "chip-a-hua": Object.freeze([Object.freeze({
        morph: "chip",
        meaningKnown: false,
        existenceEstablished: true,
        evidenceKind: "morphological-analysis",
        inventedGlossAllowed: false,
        lineStart: 2860,
        lineEnd: 2875,
        exactWitness: "its meaning is even less ascertainable, although its existence as a morph is equally justifiable."
      })]),
      "patl-a-ni": Object.freeze([Object.freeze({
        morph: "patl",
        meaningKnown: false,
        existenceEstablished: true,
        evidenceKind: "contrastive-participation-and-productive-pattern",
        evidenceStems: Object.freeze(["patl-a-hua", "-a-ni"]),
        inventedGlossAllowed: false,
        lineStart: 2860,
        lineEnd: 2873,
        exactWitness: "the exact meaning of (patl-) remains uncertain."
      })]),
      "patl-a-hua": Object.freeze([Object.freeze({
        morph: "patl",
        meaningKnown: false,
        existenceEstablished: true,
        evidenceKind: "contrastive-participation",
        inventedGlossAllowed: false,
        lineStart: 2860,
        lineEnd: 2873,
        exactWitness: "its participation in the verbstem (patl-a-hua)"
      })])
    });
    const CLASSICAL_NAHUATL_LESSON7_CONTRASTIVE_BOUNDARY_STEMS = Object.freeze({
      "a-l-ti-a": Object.freeze({
        boundaryJustification: "contrastive-analysis",
        lineStart: 2875,
        lineEnd: 2879,
        exactWitness: "each constituent morph can be justified by contrastive analysis."
      }),
      "a-i-ti-a": Object.freeze({
        boundaryJustification: "contrastive-analysis",
        lineStart: 2875,
        lineEnd: 2879,
        exactWitness: "each constituent morph can be justified by contrastive analysis."
      })
    });
    const CLASSICAL_NAHUATL_LESSON7_SOURCE_BOUNDARY_ROLE_RECORDS = Object.freeze({
      "tom-a": Object.freeze({
        sourceKind: "derived-verbstem",
        stemRelationshipKind: "type-one-causative-a",
        embedMatrixAuthorized: false,
        embedStem: "",
        matrixStem: "",
        boundaryRole: "base-plus-causative-morpheme",
        lineStart: 7770,
        lineEnd: 7785,
        exactWitness: "(tomi) = nonan, to become/be loose> tla-(tom-a) = to loosen/unties.th., to opens.th.",
        notes: "The hyphen in tom-a marks internal derivation; it is not an embed/matrix divider."
      }),
      "tem-a": Object.freeze({
        sourceKind: "derived-verbstem",
        stemRelationshipKind: "type-one-causative-a",
        embedMatrixAuthorized: false,
        embedStem: "",
        matrixStem: "",
        boundaryRole: "base-plus-causative-morpheme",
        lineStart: 7792,
        lineEnd: 7795,
        exactWitness: "(tēmi) = to become brimming full ... > tla-(tēm-a) = to causes.th. to fill a container",
        notes: "The hyphen in tēm-a marks internal derivation; it is not an embed/matrix divider."
      }),
      "huel-mati": Object.freeze({
        sourceKind: "compound-vnc",
        stemRelationshipKind: "incorporated-adverb compound verbstem",
        embedMatrixAuthorized: true,
        embedStem: "huel",
        matrixStem: "mati",
        canonicalStemVariant: "huel-mati",
        tlaFusionSourceStemVariant: "huel-mati",
        tlaFusionDerivedStem: "huel-la-mati",
        boundaryRole: "incorporated-adverb-embed-plus-vnc-matrix",
        lineStart: 3279,
        lineEnd: 3285,
        exactWitness: "if an adverb precedes tla in the VNC, the tla is part of the verbstem.\nNitlahuelmati. = #ni-Ø+tla(huel-mati)Ø+Ø-Ø#\nNihuellamati. = #ni-Ø(huel-la-mati)Ø+Ø-Ø#",
        notes: "Canvas uses the incorporated adverb huel as the boundary test: when huel precedes tla, tla belongs inside the derived intransitive verbstem."
      }),
      "chico-mati": Object.freeze({
        sourceKind: "compound-vnc",
        stemRelationshipKind: "witnessed lexicalized tla-fusion compound verbstem",
        embedMatrixAuthorized: true,
        embedStem: "chico",
        matrixStem: "mati",
        canonicalStemVariant: "chico-mati",
        tlaFusionSourceStemVariant: "chico-mati",
        tlaFusionDerivedStem: "chico-tla-mati",
        boundaryRole: "witnessed-chico-tla-fusion-source",
        lineStart: 22556,
        lineEnd: 22557,
        exactWitness: "+tē(tech) (chico-tla-mati) = to be suspicious of s.o., to suspect s.o. [As in: Motech\ntichicotlamatiyah. \"We were suspicious of you.\"]",
        notes: "Canvas witnesses the exact derived stem chico-tla-mati in a lexicalized association. This authorizes that target without turning every hyphenated compound into a generic adverb-before-tla case."
      }),
      "ixi-mati": Object.freeze({
        sourceKind: "compound-vnc",
        stemRelationshipKind: "incorporated body-part adverb compound verbstem",
        embedMatrixAuthorized: true,
        embedStem: "ixi",
        matrixStem: "mati",
        canonicalStemVariant: "ixi-mati",
        boundaryRole: "incorporated-body-part-adverb-embed-plus-vnc-matrix",
        lineStart: 11061,
        lineEnd: 11078,
        exactWitness: "tiquīximati = #ti-Ø+qu-Ø(ixi-mati)Ø+Ø-Ø# = you face-know him; you know him by his\nface; i.e., you recognize him, you are acquainted with him [ < (īx)-tli-, \"face\" + tē-(mati),\n\"to know s.o.\" The incorporated nounstem is irregular in that it has an added [i], as if the\nstem were *(ixi)-tl-.]",
        notes: "Canvas authorizes ixi as a body-part adverbial embed before the matrix mati. This is a compound-stem boundary, not a 7.10 adverb-before-tla fusion witness."
      }),
      "ix-mati": Object.freeze({
        sourceKind: "compound-vnc",
        stemRelationshipKind: "incorporated body-part adverb compound verbstem",
        embedMatrixAuthorized: true,
        embedStem: "ix",
        matrixStem: "mati",
        canonicalStemVariant: "ix-mati",
        canvasWitnessStemVariant: "ixi-mati",
        boundaryRole: "incorporated-body-part-adverb-embed-plus-vnc-matrix",
        lineStart: 11061,
        lineEnd: 11078,
        exactWitness: "tiquīximati = #ti-Ø+qu-Ø(ixi-mati)Ø+Ø-Ø# = you face-know him; you know him by his\nface; i.e., you recognize him, you are acquainted with him [ < (īx)-tli-, \"face\" + tē-(mati),\n\"to know s.o.\" The incorporated nounstem is irregular in that it has an added [i], as if the\nstem were *(ixi)-tl-.]",
        notes: "The user-facing ix-mati input preserves the user-defined ix embed. Canvas witnesses ixi-mati as an added-[i] variant, but Fuente must not rewrite ix to ixi automatically."
      }),
      "xō-chi-tēm-o-a": Object.freeze({
        sourceKind: "compound-vnc",
        stemRelationshipKind: "NNC+VNC compound VNC",
        embedMatrixAuthorized: true,
        embedStem: "xō-chi",
        matrixStem: "tēm-o-a",
        boundaryRole: "incorporated-object-embed-plus-vnc-matrix",
        lineStart: 10920,
        lineEnd: 10927,
        exactWitness: "Nixōchitēmoa. = #ni-Ø(xō-chi-tēm-o-a)Ø+Ø-Ø# = I flower-seek; i.e., I seek flowers.",
        notes: "Canvas gives both the NNC source and VNC matrix source before the compound VNC result."
      }),
      "a-l-tepe-tzin-ti-a": Object.freeze({
        sourceKind: "compound-vnc",
        stemRelationshipKind: "incorporated-object causative stem",
        embedMatrixAuthorized: true,
        embedStem: "a-l-tepe",
        matrixStem: "tzin-ti-a",
        boundaryRole: "incorporated-causative-object-plus-causative-matrix",
        lineStart: 24069,
        lineEnd: 24071,
        exactWitness: "(a-l-tepe-tzin-ti-a) = to cause a town/city to have a beginning; i.e., to found a town/city [ < (a-l-tepe)-tl-, \"town/city\"]",
        notes: "Canvas explicitly says the causative stem can have an incorporated causative object."
      }),
      "cal-tzin-ti-a": Object.freeze({
        sourceKind: "compound-vnc",
        stemRelationshipKind: "pattern-authorized incorporated-object causative stem",
        embedMatrixAuthorized: true,
        embedStem: "cal",
        matrixStem: "tzin-ti-a",
        boundaryRole: "incorporated-causative-object-plus-causative-matrix",
        lineStart: 24069,
        lineEnd: 24071,
        exactWitness: "The causative stem can have an incorporated causative object.",
        notes: "This is pattern-authorized by the cited Canvas rule; the exact cal-tzin-ti-a form is not quoted in this witness."
      })
    });
    const CLASSICAL_NAHUATL_LESSON7_STRUCTURE_RULES = Object.freeze([Object.freeze({
      id: "cn-l7-71-verbstem-lexical-locus",
      tagId: "cn-l7-verbstem-structure",
      section: "7.1",
      lineStart: 2843,
      lineEnd: 2854,
      exactWitness: "a verbstem is the locus for the\nlexical meaning expressed by a VNC",
      rule: "The verbstem is the lexical-meaning locus of a VNC.",
      stemRole: "lexical-meaning-locus"
    }), Object.freeze({
      id: "cn-l7-71-internal-morphs-unified-translation",
      tagId: "cn-l7-verbstem-structure",
      section: "7.1",
      lineStart: 2850,
      lineEnd: 2854,
      exactWitness: "morphs of an analyzed stem will not be glossed individually; the translation given will be of\nthe stem as a unified whole.",
      rule: "A polymorphemic stem may show internal hyphens, but its translation remains a unified stem translation.",
      stemTranslationPolicy: "unified-whole"
    }), Object.freeze({
      id: "cn-l7-71-position-internal-hyphen-boundaries",
      tagId: "cn-l7-verbstem-structure",
      section: "7.1",
      lineStart: 2849,
      lineEnd: 2852,
      exactWitness: "constituent morphs isolated\nby hyphens (as with all position-internal constituents)",
      rule: "Hyphenated morphs inside an analyzed verbstem are position-internal constituents; they remain inside the verbstem position.",
      internalBoundaryScope: "position-internal",
      formulaSlotSplitAllowed: false
    }), Object.freeze({
      id: "cn-l7-71-unknown-morph-authorized-without-gloss",
      tagId: "cn-l7-verbstem-structure",
      section: "7.1",
      lineStart: 2860,
      lineEnd: 2875,
      exactWitness: "the meaning of a stem-internal morpheme may not be known, even if its\nexistence is absolutely established by morphological analysis",
      rule: "A stem-internal morph can be morphologically authorized even when its individual meaning is unknown.",
      unknownMorphPolicy: "authorize-existence-without-invented-gloss"
    }), Object.freeze({
      id: "cn-l7-71-contrastive-analysis-boundaries",
      tagId: "cn-l7-verbstem-structure",
      section: "7.1",
      lineStart: 2875,
      lineEnd: 2879,
      exactWitness: "each constituent morph can be justified by contrastive\nanalysis.",
      rule: "Even excessive-looking stem-internal hyphenation can be authorized by contrastive analysis.",
      boundaryJustification: "contrastive-analysis"
    })]);
    const CLASSICAL_NAHUATL_LESSON7_CITATION_RULES = Object.freeze([Object.freeze({
      id: "cn-l7-72-cite-verbcore-not-isolated-stem",
      tagId: "cn-l7-citation-form",
      section: "7.2",
      lineStart: 2877,
      lineEnd: 2885,
      exactWitness: "It is, therefore, important not to cite the verbstem\nbut, rather, the verbcore (i.e., the valence-plus-stem unit).",
      rule: "Citation authority is the verbcore, not an isolated verbstem, whenever valence is required.",
      citationUnit: "verbcore"
    }), Object.freeze({
      id: "cn-l7-72-citation-object-markers",
      tagId: "cn-l7-citation-form",
      section: "7.2",
      lineStart: 2886,
      lineEnd: 2901,
      exactWitness: "cited with the verb object appropriate to it, with the verb-object prefixes te and tla representing\nany human or nonhuman projective-object pronoun",
      rule: "Citation forms expose the appropriate object marker: te, tla, m-o/m-square, or t-o/t-square.",
      citationMarkers: Object.freeze(["te", "tla", "m-o", `m-${CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO}`, "t-o", `t-${CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO}`])
    }), Object.freeze({
      id: "cn-l7-72-projective-citation-representatives-not-formula-slots",
      tagId: "cn-l7-citation-form",
      section: "7.2",
      lineStart: 2886,
      lineEnd: 2889,
      exactWitness: "the verb-object prefixes te and tla representing\nany human or nonhuman projective-object pronoun",
      rule: "Projective citation uses te or tla as representative object markers; formula slot names such as va1-va2 do not cite a verbcore.",
      citationMarkers: Object.freeze(["te", "tla"]),
      blockedCitationMarkers: Object.freeze(["va1-va2"])
    })]);
    const CLASSICAL_NAHUATL_LESSON7_CLASS_RULES = Object.freeze([Object.freeze({
      id: "cn-l7-73-class-basis-perfective-stem",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3",
      lineStart: 2902,
      lineEnd: 2905,
      exactWitness: "Verbstems belong to one of four classes, depending on the nature of\ntheir perfective stems.",
      rule: "Verbstem class is decided by the perfective stem in relation to the basic imperfective stem.",
      classBasis: "perfective-stem-shape"
    }), Object.freeze({
      id: "cn-l7-73-class-a",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.1",
      lineStart: 2907,
      lineEnd: 2912,
      exactWitness: "Class A: There are two subclasses in Class A.",
      rule: "Class A has A-1 same-shape short-final stems and A-2 long-final /o:/ or /i:/ alternants.",
      classId: "A"
    }), Object.freeze({
      id: "cn-l7-73-class-b",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.1",
      lineStart: 2917,
      lineEnd: 2930,
      exactWitness: "Class B: There are two kinds of Class B stems",
      rule: "Class B perfectives lose the final vowel or carry a silently present causative carrier.",
      classId: "B"
    }), Object.freeze({
      id: "cn-l7-73-class-b-two-kinds",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.1",
      lineStart: 2917,
      lineEnd: 2923,
      exactWitness: "There are two kinds of Class B stems, depending or whether the vowel of the\nimperfective stem's final \"CV\" (consonant+ vowel) syllable",
      rule: "Class B must distinguish plain final-vowel disappearance from the causative /a/ that survives as a silent carrier.",
      classId: "B"
    }), Object.freeze({
      id: "cn-l7-73-class-b-object-pronoun-distinguishes-identical-perfectives",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.1",
      lineStart: 2924,
      lineEnd: 2928,
      exactWitness: "The absence or presence\nof the verb-object pronoun distinguishes the two perfective stems.",
      rule: "Phonologically identical Class B perfectives do not erase morphology; object-pronoun presence keeps the kinds distinct.",
      classId: "B"
    }), Object.freeze({
      id: "cn-l7-73-class-b-analysis-omits-silent-causative-carrier",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.1",
      lineStart: 2926,
      lineEnd: 2929,
      exactWitness: "the silently-present causative morph will not be indicated\n(i.e., the second kind of class B perfective stem will be analyzed as if it were the first kind).",
      rule: "Lesson analysis may omit the silent causative carrier in print, but the machine must preserve it as underlying authority.",
      classId: "B"
    }), Object.freeze({
      id: "cn-l7-73-class-c",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.1",
      lineStart: 2931,
      lineEnd: 2933,
      exactWitness: "Class C: The imperfective stem of Class C verbs always ends in a final /a:/ preceded by\neither Joi or Iii.",
      rule: "Class C replaces final /a:/ after /o/ or /i/ with glottal stop in the perfective.",
      classId: "C"
    }), Object.freeze({
      id: "cn-l7-73-class-d",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.1",
      lineStart: 2934,
      lineEnd: 2936,
      exactWitness: "Class D: The imperfective stem of Class D verbs always ends in a syllable consisting of a\nconsonant and /a:/.",
      rule: "Class D adds glottal stop after final /a:/ and shortens that vowel.",
      classId: "D"
    }), Object.freeze({
      id: "cn-l7-73-imperfective-shape-counts",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.2",
      lineStart: 2937,
      lineEnd: 2957,
      exactWitness: "an imperfective stem may have one, two, or four different\nshapes depending on its verbstem class.",
      rule: "Imperfective stem shape counts depend on class: A one/two, B one, C four, D two.",
      classShapeCounts: Object.freeze({
        A: "one-or-two",
        B: "one",
        C: "four",
        D: "two"
      })
    }), Object.freeze({
      id: "cn-l7-73-cd-imperfective-shapes-tense-correlated",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.2",
      lineStart: 2943,
      lineEnd: 2949,
      exactWitness: "In the instance of Class C and Class D verbs, the shape of the imperfective stem is correlated\nwith the tense morphs",
      rule: "Class C and D imperfective shapes are selected by tense/number context; the machine cannot freely substitute full, short, or truncated stems.",
      classIds: Object.freeze(["C", "D"])
    }), Object.freeze({
      id: "cn-l7-73-class-c-truncated-nonpast-optative-singular",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.2",
      lineStart: 2948,
      lineEnd: 2951,
      exactWitness: "the truncated Class C imperfective stem with a short final vowel\noccurs only in the three singular forms of the nonpast optative",
      rule: "Class C truncated short imperfective stems are legal in singular nonpast optative, not as general Class C stems.",
      classId: "C"
    }), Object.freeze({
      id: "cn-l7-73-a2-short-imperfective-admonitive",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.2",
      lineStart: 2950,
      lineEnd: 2952,
      exactWitness: "The imperfective\nstem of Class A verbs with a long stem-final vowel has a short vowel in the same circumstances,\nbut also in all forms of the nonpast admonitive.",
      rule: "Class A-2 long-final stems have a short-vowel shape in the same vocable-final/0-h environments and all nonpast admonitive forms.",
      classId: "A-2"
    }), Object.freeze({
      id: "cn-l7-73-class-c-truncated-silent-carrier",
      tagId: "cn-l7-verbstem-classes",
      section: "7.3.2 Note",
      lineStart: 2953,
      lineEnd: 2956,
      exactWitness: "The final /a:/ of Class C verbs is the carrier of a derivational morph",
      rule: "Class C truncated imperfective stems preserve an underlying silent derivational carrier even when lesson analysis does not print it.",
      classId: "C"
    })]);
    const CLASSICAL_NAHUATL_LESSON7_CLASS_B_CHANGE_RULES = Object.freeze([Object.freeze({
      id: "cn-l7-74-class-b-loss-silencing-trigger",
      tagId: "cn-l7-class-b-perfective-changes",
      section: "7.4",
      lineStart: 2962,
      lineEnd: 2964,
      exactWitness: "With Class B perfective stems, the loss or silencing\nof the final vowel of the imperfective stem entails spelling changes",
      rule: "Class B perfective formation is triggered by loss or silencing of the final imperfective vowel.",
      trigger: "final-vowel-loss-or-silencing"
    }), Object.freeze({
      id: "cn-l7-74-spelling-changes-k-s",
      tagId: "cn-l7-class-b-perfective-changes",
      section: "7.4.1",
      lineStart: 2965,
      lineEnd: 2967,
      exactWitness: "/k/: -qu- > -c: (miqui) > (mic)\n/s/: -c- > -z: (nēci) > (nēz)",
      rule: "Class B loss can expose Lesson 2 spelling changes: qu to c and c to z.",
      changeKind: "spelling-change"
    }), Object.freeze({
      id: "cn-l7-74-phonological-changes",
      tagId: "cn-l7-class-b-perfective-changes",
      section: "7.4.2",
      lineStart: 2968,
      lineEnd: 2974,
      exactWitness: "/m/ > [n]: (nemi) > (nen)",
      rule: "Class B loss can trigger phonological changes including w, kw, m, and y changes.",
      changeKind: "phonological-change"
    }), Object.freeze({
      id: "cn-l7-74-traditional-spelling-warning",
      tagId: "cn-l7-class-b-perfective-changes",
      section: "7.4",
      lineStart: 2975,
      lineEnd: 2983,
      exactWitness: "traditional spellings oa and ia mislead one into thinking that the verb belongs to Class C.",
      rule: "Traditional oa/ia spelling can obscure w/y and mislead class assignment.",
      warning: "traditional-spelling-can-misclassify"
    })]);
    const CLASSICAL_NAHUATL_LESSON7_VARIABLE_CLASS_RULES = Object.freeze([Object.freeze({
      id: "cn-l7-75-variable-a-b-membership",
      tagId: "cn-l7-variable-class-membership",
      section: "7.5",
      lineStart: 2984,
      lineEnd: 2989,
      exactWitness: "may be nondistinctively either Class A or Class B",
      rule: "Some verbs, mostly intransitive, may have nondistinctive Class A or Class B perfective alternatives.",
      classOptions: Object.freeze(["A", "B"])
    })]);
    const CLASSICAL_NAHUATL_LESSON7_GUIDELINE_RULES = Object.freeze([Object.freeze({
      id: "cn-l7-76-guidelines-not-majority-prediction",
      tagId: "cn-l7-class-guidelines",
      section: "7.6",
      lineStart: 2990,
      lineEnd: 2992,
      exactWitness: "there are, nevertheless, rules\nthat govern the formation in certain instances.",
      rule: "Class guidelines govern certain instances but do not predict the perfective stem in the majority of cases."
    }), Object.freeze({
      id: "cn-l7-761-monosyllabic-long-a-d",
      tagId: "cn-l7-class-guidelines",
      section: "7.6.1",
      lineStart: 2993,
      lineEnd: 3000,
      exactWitness: "Monosyllabic verbstems ending in long /a:/belong to Class D",
      rule: "Monosyllabic final long /a:/ points to Class D; otherwise monosyllabic stems point to Class A.",
      guidelineClass: "D-or-A"
    }), Object.freeze({
      id: "cn-l7-762-final-vowel-after-cluster-a",
      tagId: "cn-l7-class-guidelines",
      section: "7.6.2",
      lineStart: 3001,
      lineEnd: 3014,
      exactWitness: "Verbstems whose final vowel is preceded by two consonants or by a long consonant\nbelong to Class A",
      rule: "A final vowel preceded by two consonants or a long consonant points to Class A.",
      guidelineClass: "A"
    }), Object.freeze({
      id: "cn-l7-763-final-ka-a",
      tagId: "cn-l7-class-guidelines",
      section: "7.6.3",
      lineStart: 3015,
      lineEnd: 3018,
      exactWitness: "Verbstems whose final syllable is /ka/ belong to Class A",
      rule: "Final /ka/ points to Class A, with source-gated exceptions such as tla-(pāca).",
      guidelineClass: "A"
    }), Object.freeze({
      id: "cn-l7-764-final-tla-a",
      tagId: "cn-l7-class-guidelines",
      section: "7.6.4",
      lineStart: 3019,
      lineEnd: 3020,
      exactWitness: "Verbstems whose final syllable is /λa/ belong to Class A",
      rule: "Final /tla/ points to Class A.",
      guidelineClass: "A"
    }), Object.freeze({
      id: "cn-l7-765-intransitive-wa-change-a",
      tagId: "cn-l7-class-guidelines",
      section: "7.6.5",
      lineStart: 3021,
      lineEnd: 3023,
      exactWitness: "Intransitive Verbstems that end in /wa/ and signify change belong to Class A",
      rule: "Intransitive /wa/ change-of-state stems point to Class A.",
      guidelineClass: "A"
    }), Object.freeze({
      id: "cn-l7-766-final-ya-b",
      tagId: "cn-l7-class-guidelines",
      section: "7.6.6",
      lineStart: 3025,
      lineEnd: 3032,
      exactWitness: "Verbstems whose final syllable is /ya/ belong to Class B.",
      rule: "Final /ya/ points to Class B; intransitives usually also allow a Class A option.",
      guidelineClass: "B"
    }), Object.freeze({
      id: "cn-l7-767-final-o-a",
      tagId: "cn-l7-class-guidelines",
      section: "7.6.7",
      lineStart: 3033,
      lineEnd: 3034,
      exactWitness: "Verbs ending in /o/ or /o:/ belong to Class A",
      rule: "Final /o/ or /o:/ points to Class A.",
      guidelineClass: "A"
    }), Object.freeze({
      id: "cn-l7-768-eight-class-d-stems",
      tagId: "cn-l7-class-guidelines",
      section: "7.6.8",
      lineStart: 3035,
      lineEnd: 3044,
      exactWitness: "The following eight verbstems belong to Class D",
      rule: "The listed eight verbstem heads are Class D authority.",
      guidelineClass: "D"
    }), Object.freeze({
      id: "cn-l7-768-class-d-variant-stem",
      tagId: "cn-l7-class-guidelines",
      section: "7.6.8",
      lineStart: 3040,
      lineEnd: 3041,
      exactWitness: "There is a variant stem tla-(mēmē) > tla-(mēmeh).",
      rule: "The mēmē stem is a variant stem under tla-(māmā), not a ninth independent Class D head.",
      guidelineClass: "D"
    })]);
    const CLASSICAL_NAHUATL_LESSON7_PREDICATE_RULES = Object.freeze([Object.freeze({
      id: "cn-l7-77-core-tense-constituents",
      tagId: "cn-l7-core-tense-predicate-formation",
      section: "7.7",
      lineStart: 3045,
      lineEnd: 3057,
      exactWitness: "They cooperate with the subject pronouns presented in § 5.4 to form VNCs.",
      rule: "Stem variants cooperate with Lesson 5 subject pronouns and tense morphs to form VNC predicates.",
      consumesPriorLesson: "Andrews Lesson 5"
    }), Object.freeze({
      id: "cn-l7-77-class-a-predicate-shapes",
      tagId: "cn-l7-core-tense-predicate-formation",
      section: "7.7",
      lineStart: 3058,
      lineEnd: 3080,
      exactWitness: "Class A Verbal Predicates. When the stem-final vowel is short, only one stem shape is used.",
      rule: "Class A predicates use one shape for A-1 and two shapes for A-2 long-final stems.",
      classId: "A"
    }), Object.freeze({
      id: "cn-l7-77-class-a2-predicate-table-cells",
      tagId: "cn-l7-core-tense-predicate-formation",
      section: "7.7",
      lineStart: 3068,
      lineEnd: 3080,
      exactWitness: "(temō)ni+ (temō)ya+ (temō)z+ (temō)Ø+\n(temo)Ø+ (temo)Ø+",
      rule: "Class A-2 long-final stems use long and short predicate carriers according to the 7.7 tense table.",
      classId: "A",
      subclass: "A-2"
    }), Object.freeze({
      id: "cn-l7-77-class-b-predicate-shapes",
      tagId: "cn-l7-core-tense-predicate-formation",
      section: "7.7",
      lineStart: 3081,
      lineEnd: 3095,
      exactWitness: "Class B Verbal Predicates. Two stem shapes are used.",
      rule: "Class B predicates use an imperfective shape and a perfective shape after final-vowel loss.",
      classId: "B"
    }), Object.freeze({
      id: "cn-l7-77-class-c-predicate-shapes",
      tagId: "cn-l7-core-tense-predicate-formation",
      section: "7.7",
      lineStart: 3096,
      lineEnd: 3110,
      exactWitness: "Class C Verbal Predicates. Five stem shapes are used.",
      rule: "Class C predicates use five total imperfective/perfective shapes.",
      classId: "C"
    }), Object.freeze({
      id: "cn-l7-77-class-c-predicate-table-cells",
      tagId: "cn-l7-core-tense-predicate-formation",
      section: "7.7",
      lineStart: 3096,
      lineEnd: 3110,
      exactWitness: "(chol-o-ā)ni+ ... (chol-ō)z+ (chol-ō)Ø+ (chol-o)Ø+ ... (chol-o-h)Ø+",
      rule: "Class C predicate carriers use full-long, full-short, truncated, and h-perfective shapes only in their 7.7 table cells.",
      classId: "C"
    }), Object.freeze({
      id: "cn-l7-77-class-d-predicate-shapes",
      tagId: "cn-l7-core-tense-predicate-formation",
      section: "7.7",
      lineStart: 3111,
      lineEnd: 3120,
      exactWitness: "Class D Verbal Predicates. Three stem shapes are used.",
      rule: "Class D predicates use two imperfective shapes and a perfective h shape.",
      classId: "D"
    }), Object.freeze({
      id: "cn-l7-77-class-d-predicate-table-cells",
      tagId: "cn-l7-core-tense-predicate-formation",
      section: "7.7",
      lineStart: 3111,
      lineEnd: 3120,
      exactWitness: "+tla(cuā)ni+ +tla(cuā)ya+ +tla(cuā)z+ +tla(cua)Ø+ +tla(cuā)ni+\n+tla(cuā)Ø+ +tla(cua)Ø+\n+tla(cuah)Ø+ +tla(cuah)ca+ +tla(cuah)Ø+",
      rule: "Class D predicate carriers use long, short, and h-perfective shapes only in their 7.7 table cells.",
      classId: "D"
    })]);
    const CLASSICAL_NAHUATL_LESSON7_ANALYSIS_RULES = Object.freeze([Object.freeze({
      id: "cn-l7-78-subject-predicate-division",
      tagId: "cn-l7-analysis-translation",
      section: "7.8",
      lineStart: 3125,
      lineEnd: 3138,
      exactWitness: "the importance\nof the subject-plus-predicate structure OBLIGATORILY occurring in all VNCs",
      rule: "Complete VNC analysis must preserve the obligatory subject-plus-predicate division.",
      requiredDivision: "subject-plus-predicate"
    }), Object.freeze({
      id: "cn-l7-78-supportive-initial-i-boundary",
      tagId: "cn-l7-supportive-initial-i",
      section: "7.8 Note 1",
      lineStart: 3200,
      lineEnd: 3224,
      exactWitness: "supportive\n[i], the [i] is no longer needed and is omitted.",
      rule: "Supportive initial i can be omitted after mainline reflexive or nonspecific nonhuman tla, but real initial vowels remain.",
      boundaryKind: "supportive-initial-i"
    }), Object.freeze({
      id: "cn-l7-78-class-d-ambiguity",
      tagId: "cn-l7-analysis-translation",
      section: "7.8 Note 2",
      lineStart: 3225,
      lineEnd: 3236,
      exactWitness: "Although morphologically different, the first-person plural present indicative and the second-person singular\npreterit VNCs built on a Class D verbstem are phonologically identical",
      rule: "Class D surface identity can require structural analysis to distinguish present from preterit.",
      ambiguityKind: "class-d-present-preterit"
    })]);
    const CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_RULES = Object.freeze([Object.freeze({
      id: "cn-l7-79-indefinite-personal-object-relationship",
      tagId: "cn-l7-indefinite-personal-object-relationship",
      section: "7.9",
      lineStart: 3237,
      lineEnd: 3241,
      exactWitness: "The indefinite\npronouns tē and tla have the following relationships",
      rule: "Indefinite te and tla relate to, but do not collapse into, specific reflexive and projective personal-pronoun objects.",
      relationKind: "indefinite-to-personal-object"
    }), Object.freeze({
      id: "cn-l7-79-human-object-specified",
      tagId: "cn-l7-indefinite-personal-object-relationship",
      section: "7.9.1",
      lineStart: 3242,
      lineEnd: 3259,
      exactWitness: "nitēitta = #ni-Ø+tē(itt-a)Ø+Ø-Ø# = I see s.o./people/everyone",
      rule: "Human indefinite te sits in relation to reflexive and specific human projective object forms.",
      objectKind: "human"
    }), Object.freeze({
      id: "cn-l7-79-nonhuman-object-specified",
      tagId: "cn-l7-indefinite-personal-object-relationship",
      section: "7.9.2",
      lineStart: 3260,
      lineEnd: 3264,
      exactWitness: "nitlatta = #ni-Ø+tla(tt-a)Ø+Ø-Ø# = I see s.th./things/everything",
      rule: "Nonhuman indefinite tla sits in relation to third-person specific projective object forms.",
      objectKind: "nonhuman"
    })]);
    const CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_RULES = Object.freeze([Object.freeze({
      id: "cn-l7-710-tla-fusion-derivation",
      tagId: "cn-l7-tla-fusion",
      section: "7.10",
      lineStart: 3265,
      lineEnd: 3271,
      exactWitness: "The result\nof this tla fusion is a new verbstem, an intransitive one.",
      rule: "Tla fusion is derivational: tla plus a transitive stem becomes a new intransitive verbstem.",
      processKind: "derivational"
    }), Object.freeze({
      id: "cn-l7-710-tla-fusion-analysis-contrast",
      tagId: "cn-l7-tla-fusion",
      section: "7.10",
      lineStart: 3268,
      lineEnd: 3274,
      exactWitness: "is not analyzed as #ni-Ø+tla(chiya)Ø+Ø-Ø# but rather as #ni-Ø(tla-chiya)Ø+Ø-Ø#.",
      rule: "After fusion, tla belongs inside the derived stem boundary, not in the Valence object slot.",
      sourceObjectSlot: "tla",
      targetObjectSlot: "none"
    }), Object.freeze({
      id: "cn-l7-710-matrix-tla-fusion-build",
      tagId: "cn-l7-tla-fusion",
      section: "7.10",
      lineStart: 3268,
      lineEnd: 3274,
      exactWitness: "The result of this tla fusion is a new verbstem, an intransitive one.",
      rule: "A matrix-only tla fusion build constructs the derived intransitive stem as tla plus the matrix stem.",
      buildKind: "matrix-plus-tla-fusion",
      buildLogic: "tla + matrix"
    }), Object.freeze({
      id: "cn-l7-710-embed-matrix-tla-fusion-build",
      tagId: "cn-l7-tla-fusion",
      section: "7.10",
      lineStart: 3279,
      lineEnd: 3285,
      exactWitness: "if an adverb precedes tla in the VNC, the tla is part of the verbstem.",
      rule: "When the source supplies an embed plus a matrix, tla fusion builds the derived stem inside that compound boundary as embed plus fused tla plus matrix; exact Canvas witnesses may override the constructed spelling.",
      buildKind: "embed-matrix-plus-tla-fusion",
      buildLogic: "embed + fused-tla + matrix"
    }), Object.freeze({
      id: "cn-l7-710-adverb-boundary-test",
      tagId: "cn-l7-tla-fusion",
      section: "7.10",
      lineStart: 3279,
      lineEnd: 3285,
      exactWitness: "if an adverb precedes tla in the VNC, the tla is part of the verbstem.",
      rule: "An incorporated adverb before tla is a boundary test for fused tla inside the stem.",
      boundaryTest: "adverb-precedes-tla"
    }), Object.freeze({
      id: "cn-l7-710-huel-la-mati-exact-boundary",
      tagId: "cn-l7-tla-fusion",
      section: "7.10",
      lineStart: 3283,
      lineEnd: 3284,
      exactWitness: "Nitlahuelmati. = #ni-Ø+tla(huel-mati)Ø+Ø-Ø#\nNihuellamati. = #ni-Ø(huel-la-mati)Ø+Ø-Ø#",
      rule: "The Canvas-witnessed fused analysis is huel-la-mati; a generic tla-huel-mati stem is not authorized for this boundary.",
      sourceStemVariant: "huel-mati",
      derivedStem: "huel-la-mati",
      boundaryTest: "huel-before-tla-exact-witness"
    }), Object.freeze({
      id: "cn-l51-chico-tla-mati-derived-target",
      tagId: "cn-l7-tla-fusion",
      section: "51.7",
      lineStart: 22556,
      lineEnd: 22557,
      exactWitness: "+tē(tech) (chico-tla-mati) = to be suspicious of s.o., to suspect s.o. [As in: Motech\ntichicotlamatiyah. \"We were suspicious of you.\"]",
      rule: "Canvas witnesses chico-tla-mati as an exact derived stem; a generic tla-chico-mati target is not authorized for this source.",
      sourceStemVariant: "chico-mati",
      derivedStem: "chico-tla-mati",
      boundaryTest: "chico-tla-mati-exact-witness"
    })]);
    const CLASSICAL_NAHUATL_LESSON7_RECEIPT_RULES = Object.freeze([Object.freeze({
      id: "cn-l7-receipt-mirrors-selected-output-logic",
      tagId: "cn-l7-receipt-not-authority",
      section: "7.1-7.10",
      lineStart: 2841,
      lineEnd: 3285,
      exactWitness: "Verbstem Classes",
      rule: "The Lesson 7 receipt may display selected verbstem-class logic only; it cannot authorize citation, class, predicate, object-boundary, or tla-fusion decisions.",
      receiptRole: "display-only",
      authorityRole: "not-authority"
    })]);
    const CLASSICAL_NAHUATL_LESSON11_OPTIONAL_IRREGULAR_PERFECTIVE_RULES = Object.freeze([Object.freeze({
      id: "cn-l11-113-ti-stem-regular-irregular-pair",
      tagId: "cn-l11-optional-irregular-ti-perfective",
      section: "11.3.2",
      lineStart: 4009,
      lineEnd: 4015,
      exactWitness: "Certain Class B verbstems that end in ti have alternate perfective stems",
      rule: "Certain Class B ti-stems keep a regular perfective stem while licensing an irregular h-stem alternative.",
      irregularityKind: "conditioned-optional-irregular"
    }), Object.freeze({
      id: "cn-l11-113-singular-preterit-admonitive-condition",
      tagId: "cn-l11-optional-irregular-ti-perfective",
      section: "11.3.2",
      lineStart: 4020,
      lineEnd: 4024,
      exactWitness: "The irregular stem occurs only in VNCs with a singular-number subject",
      rule: "The irregular h-stem is authorized only with singular-number subject plus preterit tense or admonitive mood.",
      conditions: Object.freeze(["singular-subject", "preterit-or-admonitive"])
    }), Object.freeze({
      id: "cn-l11-113-regular-stem-remains-legal",
      tagId: "cn-l11-optional-irregular-ti-perfective",
      section: "11.3.2",
      lineStart: 4025,
      lineEnd: 4031,
      exactWitness: "The regular perfective stem may be used in a preterit singular VNC, but the irregular formation\nis preferable.",
      rule: "The irregular h-stem does not erase the regular perfective stem; regular mat remains legal beside optional mah.",
      regularStemRetained: true
    })]);
    const CLASSICAL_NAHUATL_LESSON24_TYPE_ONE_CAUSATIVE_RULES = Object.freeze([Object.freeze({
      id: "cn-l24-243-type-one-causative-a",
      tagId: "cn-l24-type-one-causative-a",
      lesson: 24,
      section: "24.3",
      lineStart: 7754,
      lineEnd: 7765,
      exactWitness: "The causative suffix a converts an intransitive verbstem ending in /i/ into a causative verbstem.",
      rule: "Type-one causative a is a derivational suffix, not a final-vowel spelling accident."
    }), Object.freeze({
      id: "cn-l24-243-replacement-i-to-a",
      tagId: "cn-l24-type-one-causative-a",
      lesson: 24,
      section: "24.3.1.a",
      lineStart: 7770,
      lineEnd: 7785,
      exactWitness: "(tomi) = nonan, to become/be loose> tla-(tom-a) = to loosen/unties.th., to opens.th.",
      rule: "Replacement type-one causative removes source-final i before adding causative a.",
      derivationProcedure: "replacement"
    }), Object.freeze({
      id: "cn-l24-243-replacement-i-to-a-semantic-shift",
      tagId: "cn-l24-type-one-causative-a",
      lesson: 24,
      section: "24.3.1.a",
      lineStart: 7792,
      lineEnd: 7795,
      exactWitness: "(tēmi) = to become brimming full ... > tla-(tēm-a) = to causes.th. to fill a container",
      rule: "Replacement type-one causative also authorizes semantically shifted causative stems such as tēmi to tēm-a.",
      derivationProcedure: "replacement"
    }), Object.freeze({
      id: "cn-l24-243-class-b-source-causative-distinction",
      tagId: "cn-l24-type-one-causative-a",
      lesson: 24,
      section: "24.3.1.a",
      lineStart: 7797,
      lineEnd: 7800,
      exactWitness: "Both the intransitive stem and the derived causative stem of this kind of verb belong to Class B ... see § 7.3.1 for the class difference",
      rule: "A Class B intransitive source and its type-one causative counterpart may both be Class B while still differing by the silent causative carrier described in Lesson 7.",
      derivationProcedure: "replacement"
    }), Object.freeze({
      id: "cn-l24-243-right-edge-causative-matrix-carrier",
      tagId: "cn-l24-type-one-causative-a",
      lesson: 24,
      section: "24.3 + 30.3",
      lineStart: 10920,
      lineEnd: 10927,
      exactWitness: "Principal ... [source of the matrix stem] ... Transform: Nixōchitēmoa. = #ni-Ø(xō-chi-tēm-o-a)Ø+Ø-Ø#",
      rule: "When a compound verbstem has a right-edge matrix stem, the matrix keeps its own class and derivational carrier authority inside the larger stem.",
      derivationProcedure: "right-edge-matrix-carrier-propagation"
    })]);
    const CLASSICAL_NAHUATL_LESSON7_CLASS_SHAPES = Object.freeze({
      A: Object.freeze({
        id: "A",
        basis: "same perfective carrier shape, with A-2 long-vowel alternants",
        imperfectiveShapeCount: "one-or-two",
        perfectiveShapeCount: "one-or-two",
        totalShapeCount: "one-or-two"
      }),
      B: Object.freeze({
        id: "B",
        basis: "final vowel disappears or is silently present",
        imperfectiveShapeCount: "one",
        perfectiveShapeCount: "one",
        totalShapeCount: "two"
      }),
      C: Object.freeze({
        id: "C",
        basis: "final a after o/i replaced by h in the perfective",
        imperfectiveShapeCount: "four",
        perfectiveShapeCount: "one",
        totalShapeCount: "five"
      }),
      D: Object.freeze({
        id: "D",
        basis: "final long a adds h and shortens",
        imperfectiveShapeCount: "two",
        perfectiveShapeCount: "one",
        totalShapeCount: "three"
      })
    });
    const CLASSICAL_NAHUATL_LESSON7_CLASS_D_HEAD_STEMS = Object.freeze(["cua", "cuā", "ma", "mā", "pa", "pā", "ihua", "ihuā", "mama", "māmā", "nahua", "nāhuā", "ya", "yā", "zoma", "zōma", "zōmā"]);
    function makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
      sourceStem = "",
      citedForm = "",
      section = "7.6",
      lineStart = 2990,
      lineEnd = 3044,
      exactWitness = "",
      relationRuleId = "cn-l7-76-guidelines-not-majority-prediction",
      defaultClassId = "A",
      allowedClassIds = [],
      classOptions = [],
      alternativeClassIds = [],
      perfectiveStemsByClass = {},
      conditionKind = "",
      exceptionKind = "",
      notes = ""
    } = {}) {
      const normalizedDefault = normalizeClassicalNahuatlLesson7ClassId(defaultClassId);
      const normalizedAllowed = Array.from(new Set((allowedClassIds.length ? allowedClassIds : [normalizedDefault, ...alternativeClassIds]).map(normalizeClassicalNahuatlLesson7ClassId).filter(Boolean)));
      const normalizedOptions = Array.from(new Set((classOptions.length ? classOptions : normalizedAllowed).map(normalizeClassicalNahuatlLesson7ClassId).filter(Boolean)));
      return Object.freeze({
        sourceStem,
        citedForm,
        section,
        lineStart,
        lineEnd,
        exactWitness,
        relationRuleId,
        defaultClassId: normalizedDefault,
        allowedClassIds: Object.freeze(normalizedAllowed),
        classOptions: Object.freeze(normalizedOptions),
        alternativeClassIds: Object.freeze(alternativeClassIds.map(normalizeClassicalNahuatlLesson7ClassId).filter(Boolean)),
        perfectiveStemsByClass: Object.freeze({
          ...perfectiveStemsByClass
        }),
        conditionKind,
        exceptionKind,
        notes
      });
    }
    const CLASSICAL_NAHUATL_LESSON7_GUIDELINE_AUTHORITY_STEMS = Object.freeze({
      pi: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "pī",
        citedForm: "tla-(pī)",
        section: "7.6.1",
        lineStart: 2993,
        lineEnd: 2996,
        exactWitness: "tla-(pī) > tla-(pī)",
        relationRuleId: "cn-l7-761-monosyllabic-long-a-d",
        defaultClassId: "A",
        perfectiveStemsByClass: {
          A: "pī"
        }
      }),
      i: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "ī",
        citedForm: "tla-(ī)",
        section: "7.6.1",
        lineStart: 2993,
        lineEnd: 2997,
        exactWitness: "tla-(ī) > tla-(ī)",
        relationRuleId: "cn-l7-761-monosyllabic-long-a-d",
        defaultClassId: "A",
        perfectiveStemsByClass: {
          A: "ī"
        }
      }),
      o: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "o",
        citedForm: "(o)",
        section: "7.6.1",
        lineStart: 2993,
        lineEnd: 2998,
        exactWitness: "(o) > (o)",
        relationRuleId: "cn-l7-761-monosyllabic-long-a-d",
        defaultClassId: "A",
        perfectiveStemsByClass: {
          A: "o"
        }
      }),
      cui: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "cui",
        citedForm: "tla-(cui)",
        section: "7.6.1",
        lineStart: 2993,
        lineEnd: 2999,
        exactWitness: "tla-(cui) > tla-(cui)",
        relationRuleId: "cn-l7-761-monosyllabic-long-a-d",
        defaultClassId: "A",
        perfectiveStemsByClass: {
          A: "cui"
        }
      }),
      zo: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "zō",
        citedForm: "m-o-(zō)",
        section: "7.6.1",
        lineStart: 2993,
        lineEnd: 3000,
        exactWitness: "m-o-(zō) > m-o-(zō)",
        relationRuleId: "cn-l7-761-monosyllabic-long-a-d",
        defaultClassId: "A",
        perfectiveStemsByClass: {
          A: "zō"
        }
      }),
      a: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "ā",
        citedForm: "*(ā)",
        section: "7.6.1",
        lineStart: 2993,
        lineEnd: 3000,
        exactWitness: "*(ā) > (ā) [See § 11.4.4; this is an exception.]",
        relationRuleId: "cn-l7-761-monosyllabic-long-a-d",
        defaultClassId: "A",
        perfectiveStemsByClass: {
          A: "ā"
        },
        exceptionKind: "monosyllabic-long-a-class-d-exception"
      }),
      paca: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "pāca",
        citedForm: "tla-(pāca)",
        section: "7.6.3",
        lineStart: 3015,
        lineEnd: 3018,
        exactWitness: "But tla-(pāca) may also belong to Class B",
        relationRuleId: "cn-l7-763-final-ka-a",
        defaultClassId: "A",
        classOptions: ["A", "B"],
        allowedClassIds: ["A", "B"],
        alternativeClassIds: ["B"],
        perfectiveStemsByClass: {
          A: "pāca",
          B: "pāc"
        },
        exceptionKind: "source-gated-class-b-option"
      }),
      tomahua: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "tom-ā-hua",
        citedForm: "(tom-ā-hua)",
        section: "7.6.5",
        lineStart: 3021,
        lineEnd: 3023,
        exactWitness: "(tom-ā-hua) > (tom-ā-hua) = to become plump",
        relationRuleId: "cn-l7-765-intransitive-wa-change-a",
        defaultClassId: "A",
        perfectiveStemsByClass: {
          A: "tom-ā-hua"
        },
        conditionKind: "intransitive-change-of-state"
      }),
      chipahua: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "chip-ā-hua",
        citedForm: "(chip-ā-hua)",
        section: "7.6.5",
        lineStart: 3021,
        lineEnd: 3023,
        exactWitness: "(chip-ā-hua) > (chip-ā-hua) = to become clean",
        relationRuleId: "cn-l7-765-intransitive-wa-change-a",
        defaultClassId: "A",
        perfectiveStemsByClass: {
          A: "chip-ā-hua"
        },
        conditionKind: "intransitive-change-of-state"
      }),
      yocoya: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "yōcoya",
        citedForm: "tla-(yōcoya)",
        section: "7.6.6",
        lineStart: 3025,
        lineEnd: 3026,
        exactWitness: "tla-(yōcoya) > tla-(yōcox)",
        relationRuleId: "cn-l7-766-final-ya-b",
        defaultClassId: "B",
        perfectiveStemsByClass: {
          B: "yōcox"
        }
      }),
      oya: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "ō-ya",
        citedForm: "tla-(ō-ya)",
        section: "7.6.6",
        lineStart: 3025,
        lineEnd: 3026,
        exactWitness: "tla-(ō-ya) > tla-(ō-x)",
        relationRuleId: "cn-l7-766-final-ya-b",
        defaultClassId: "B",
        perfectiveStemsByClass: {
          B: "ō-x"
        }
      }),
      iztaya: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "izta-ya",
        citedForm: "(izta-ya)",
        section: "7.6.6",
        lineStart: 3027,
        lineEnd: 3031,
        exactWitness: "(izta-ya) > (izta-ya) ~ (izta-z)",
        relationRuleId: "cn-l7-766-final-ya-b",
        defaultClassId: "B",
        classOptions: ["B", "A"],
        allowedClassIds: ["B", "A"],
        alternativeClassIds: ["A"],
        perfectiveStemsByClass: {
          B: "izta-z",
          A: "izta-ya"
        },
        conditionKind: "intransitive-final-ya-usually-class-a-option"
      }),
      celiya: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "cel-i-ya",
        citedForm: "(cel-i-ya)",
        section: "7.6.6",
        lineStart: 3027,
        lineEnd: 3029,
        exactWitness: "(cel-i-ya) > (cel-i-z)",
        relationRuleId: "cn-l7-766-final-ya-b",
        defaultClassId: "B",
        classOptions: ["B", "A"],
        allowedClassIds: ["B", "A"],
        alternativeClassIds: ["A"],
        perfectiveStemsByClass: {
          B: "cel-i-z",
          A: "cel-i-ya"
        },
        conditionKind: "root-s-sound-y-to-s"
      }),
      chichiya: makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: "chichi-ya",
        citedForm: "(chichi-ya)",
        section: "7.6.6",
        lineStart: 3030,
        lineEnd: 3032,
        exactWitness: "(chichi-ya)> (chichi-ya)~ (chichi-x)",
        relationRuleId: "cn-l7-766-final-ya-b",
        defaultClassId: "B",
        classOptions: ["B", "A"],
        allowedClassIds: ["B", "A"],
        alternativeClassIds: ["A"],
        perfectiveStemsByClass: {
          B: "chichi-x",
          A: "chichi-ya"
        },
        conditionKind: "intransitive-final-ya-usually-class-a-option"
      })
    });
    const CLASSICAL_NAHUATL_LESSON7_STEM_RELATIONSHIPS = Object.freeze({
      meme: Object.freeze({
        relationshipKind: "variant-stem",
        variantStemOf: "māmā",
        variantStemOfUnmarked: "mama",
        relationRuleId: "cn-l7-768-class-d-variant-stem",
        exactWitness: "There is a variant stem tla-(mēmē) > tla-(mēmeh)."
      }),
      mēmē: Object.freeze({
        relationshipKind: "variant-stem",
        variantStemOf: "māmā",
        variantStemOfUnmarked: "mama",
        relationRuleId: "cn-l7-768-class-d-variant-stem",
        exactWitness: "There is a variant stem tla-(mēmē) > tla-(mēmeh)."
      })
    });
    const CLASSICAL_NAHUATL_LESSON11_OPTIONAL_IRREGULAR_PERFECTIVE_STEMS = Object.freeze({
      mati: Object.freeze({
        stem: "mati",
        classId: "B",
        regularPerfectiveStem: "mat",
        optionalIrregularPerfectiveStem: "mah",
        irregularityKind: "conditioned-optional-irregular",
        relationRuleId: "cn-l11-113-ti-stem-regular-irregular-pair",
        conditionRuleId: "cn-l11-113-singular-preterit-admonitive-condition",
        regularRetainedRuleId: "cn-l11-113-regular-stem-remains-legal",
        tagId: "cn-l11-optional-irregular-ti-perfective",
        exactWitness: "(mati) >(mat)~ (mah)= to be knowledgeable",
        examples: Object.freeze(["(mati) > (mat) ~ (mah)", "tla-(mati) > tla-(mat) ~ tla-(mah)", "m-o-(mati) > m-o-(mat) ~ m-o-(mah)"]),
        preference: "irregular-preferable-where-authorized"
      })
    });
    const CLASSICAL_NAHUATL_LESSON7_EXACT_PERFECTIVE_STEM_OVERRIDES = Object.freeze({
      "A|tzīn-ti": Object.freeze({
        perfectiveStem: "tzin-ti",
        changeRule: "class-a-transcription-exact-perfective-stem"
      }),
      "D|zoma": Object.freeze({
        perfectiveStem: "zōmah",
        changeRule: "class-d-transcription-exact-perfective-stem"
      }),
      "D|zōma": Object.freeze({
        perfectiveStem: "zōmah",
        changeRule: "class-d-transcription-exact-perfective-stem"
      }),
      "D|zōmā": Object.freeze({
        perfectiveStem: "zōmah",
        changeRule: "class-d-transcription-exact-perfective-stem"
      })
    });
    const CLASSICAL_NAHUATL_LESSON7_CLASS_B_SILENT_CAUSATIVE_CARRIER_STEMS = Object.freeze({
      "tom-a": Object.freeze({
        sourceStem: "tomi",
        causativeStem: "tom-a",
        derivationKind: "type-one-causative-a",
        derivationProcedure: "replacement",
        sourceLineStart: 7770,
        sourceLineEnd: 7785,
        sourceExactWitness: "(tomi) = nonan, to become/be loose> tla-(tom-a) = to loosen/unties.th., to opens.th.",
        classDifferenceLineStart: 7797,
        classDifferenceLineEnd: 7800,
        classDifferenceExactWitness: "see § 7.3.1 for the class difference that exists between intransitive source stems and type-one causative stems derived from them.",
        lineStart: 2921,
        lineEnd: 2928,
        exactWitness: "In the second kind, the final vowel is the causative morpheme /a/ ... represented by the irregular (silently present) morphic carrier[ ⎕]: e.g., tla-(tom-a) > tla-(ton-Ø).",
        analyzedOmissionWitness: "the silently-present causative morph will not be indicated"
      }),
      "tem-a": Object.freeze({
        sourceStem: "tēmi",
        causativeStem: "tēm-a",
        derivationKind: "type-one-causative-a",
        derivationProcedure: "replacement",
        sourceLineStart: 7792,
        sourceLineEnd: 7795,
        sourceExactWitness: "(tēmi) = to become brimming full ... > tla-(tēm-a) = to causes.th. to fill a container",
        classDifferenceLineStart: 7797,
        classDifferenceLineEnd: 7800,
        classDifferenceExactWitness: "see § 7.3.1 for the class difference that exists between intransitive source stems and type-one causative stems derived from them.",
        lineStart: 2921,
        lineEnd: 2928,
        exactWitness: "In the second kind, the final vowel is the causative morpheme /a/ ... represented by the irregular (silently present) morphic carrier[ ⎕].",
        analyzedOmissionWitness: "the silently-present causative morph will not be indicated"
      })
    });
    const CLASSICAL_NAHUATL_LESSON7_TRADITIONAL_SPELLING_WARNING_STEMS = Object.freeze({
      zohua: Object.freeze({
        sourceStem: "zōhua",
        citedForm: "tla-(zōhua)",
        traditionalSpelling: "tla-(zoa)",
        hiddenSequence: "owa",
        hiddenSound: "w",
        classId: "B",
        perfectiveStem: "zōuh",
        changeRule: "class-b-traditional-hidden-w-owa-to-uh",
        lineStart: 2975,
        lineEnd: 2982,
        exactWitness: "tla-(zōhua) [traditionally spelled tla-(zoa)] > tla-(zōuh)",
        relationRuleId: "cn-l7-74-traditional-spelling-warning"
      }),
      chiya: Object.freeze({
        sourceStem: "chiya",
        citedForm: "tē-(chiya)",
        traditionalSpelling: "te-(chia)",
        hiddenSequence: "iya",
        hiddenSound: "y",
        classId: "B",
        perfectiveStem: "chix",
        changeRule: "class-b-traditional-hidden-y-iya-to-x",
        lineStart: 2975,
        lineEnd: 2982,
        exactWitness: "tē-(chiya) [traditionally spelled te-(chia)] > tē-(chix)",
        relationRuleId: "cn-l7-74-traditional-spelling-warning"
      }),
      chiye: Object.freeze({
        sourceStem: "chiye",
        citedForm: "tē-(chiye)",
        traditionalSpelling: "te-(chie)",
        hiddenSequence: "iye",
        hiddenSound: "y",
        classId: "B",
        perfectiveStem: "chix",
        changeRule: "class-b-traditional-hidden-y-iye-to-x",
        lineStart: 2975,
        lineEnd: 2982,
        exactWitness: "tē-(chiye) [traditionally spelled te-(chie)] > tē-(chix)",
        relationRuleId: "cn-l7-74-traditional-spelling-warning"
      }),
      ceya: Object.freeze({
        sourceStem: "ce-ya",
        citedForm: "(ce-ya)",
        traditionalSpelling: "(cea) and (cia)",
        hiddenSequence: "eya",
        hiddenSound: "y",
        classId: "B",
        perfectiveStem: "ce-z",
        changeRule: "class-b-traditional-hidden-y-eya-to-z",
        lineStart: 2975,
        lineEnd: 2982,
        exactWitness: "(ce-ya) [traditionally spelled (cea) and (cia)] > (ce-ya) ~ (ce-z)",
        relationRuleId: "cn-l7-74-traditional-spelling-warning"
      }),
      ayi: Object.freeze({
        sourceStem: "āyi",
        citedForm: "tla-(āyi)",
        traditionalSpelling: "tla-(ai)",
        hiddenSequence: "ayi",
        hiddenSound: "y",
        classId: "B",
        perfectiveStem: "āx",
        changeRule: "class-b-traditional-hidden-y-ayi-to-x",
        lineStart: 2975,
        lineEnd: 2982,
        exactWitness: "tla-(āyi) [traditionally spelled tla-(ai)] > tla-(āx)",
        relationRuleId: "cn-l7-74-traditional-spelling-warning"
      })
    });
    function getClassicalNahuatlLesson7RuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function buildClassicalNahuatlLesson210BoundaryFrameForLesson7(stem = "") {
      const runtimeTarget = getClassicalNahuatlLesson7RuntimeTarget();
      if (typeof runtimeTarget?.buildClassicalNahuatlLesson210ProgressiveAssimilationFrame !== "function") {
        return null;
      }
      return runtimeTarget.buildClassicalNahuatlLesson210ProgressiveAssimilationFrame(stem);
    }
    function cloneClassicalNahuatlLesson7Record(value) {
      if (Array.isArray(value)) {
        return value.map(entry => cloneClassicalNahuatlLesson7Record(entry));
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneClassicalNahuatlLesson7Record(entry)]));
    }
    function cloneClassicalNahuatlLesson7Rule(rule = {}) {
      return cloneClassicalNahuatlLesson7Record(rule);
    }
    function getClassicalNahuatlLesson7StructureRules() {
      return CLASSICAL_NAHUATL_LESSON7_STRUCTURE_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson7CitationRules() {
      return CLASSICAL_NAHUATL_LESSON7_CITATION_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson7ClassRules() {
      return CLASSICAL_NAHUATL_LESSON7_CLASS_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson24TypeOneCausativeRules() {
      return CLASSICAL_NAHUATL_LESSON24_TYPE_ONE_CAUSATIVE_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson7ClassBChangeRules() {
      return CLASSICAL_NAHUATL_LESSON7_CLASS_B_CHANGE_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson7VariableClassRules() {
      return CLASSICAL_NAHUATL_LESSON7_VARIABLE_CLASS_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson7GuidelineRules() {
      return CLASSICAL_NAHUATL_LESSON7_GUIDELINE_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson7PredicateRules() {
      return CLASSICAL_NAHUATL_LESSON7_PREDICATE_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson7AnalysisRules() {
      return CLASSICAL_NAHUATL_LESSON7_ANALYSIS_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson7ObjectRelationshipRules() {
      return CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson7TlaFusionRules() {
      return CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson7ReceiptRules() {
      return CLASSICAL_NAHUATL_LESSON7_RECEIPT_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson11OptionalIrregularPerfectiveRules() {
      return CLASSICAL_NAHUATL_LESSON11_OPTIONAL_IRREGULAR_PERFECTIVE_RULES.map(cloneClassicalNahuatlLesson7Rule);
    }
    function getClassicalNahuatlLesson7RuleLogicRules() {
      return {
        structure: getClassicalNahuatlLesson7StructureRules(),
        citation: getClassicalNahuatlLesson7CitationRules(),
        classes: getClassicalNahuatlLesson7ClassRules(),
        classBChanges: getClassicalNahuatlLesson7ClassBChangeRules(),
        variableClass: getClassicalNahuatlLesson7VariableClassRules(),
        guidelines: getClassicalNahuatlLesson7GuidelineRules(),
        predicateFormation: getClassicalNahuatlLesson7PredicateRules(),
        analysis: getClassicalNahuatlLesson7AnalysisRules(),
        objectRelationship: getClassicalNahuatlLesson7ObjectRelationshipRules(),
        tlaFusion: getClassicalNahuatlLesson7TlaFusionRules(),
        optionalIrregularPerfective: getClassicalNahuatlLesson11OptionalIrregularPerfectiveRules(),
        receipt: getClassicalNahuatlLesson7ReceiptRules()
      };
    }
    function normalizeClassicalNahuatlLesson7Token(value = "") {
      return String(value == null ? "" : value).trim().toLowerCase();
    }
    function normalizeClassicalNahuatlLesson7Stem(value = "") {
      const raw = String(value == null ? "" : value).trim();
      const parenMatches = Array.from(raw.matchAll(/\(([^()]*)\)/gu));
      const source = parenMatches.length ? parenMatches[parenMatches.length - 1][1] : raw;
      return String(source || "").trim().replace(/^\++/u, "").replace(/^\((.*)\)$/u, "$1").trim();
    }
    function getClassicalNahuatlLesson7ExplicitTlaFusionDerivedStem(options = {}) {
      return normalizeClassicalNahuatlLesson7Stem(options.derivedStem || options.fusedStem || options.tlaFusionDerivedStem || "");
    }
    function removeClassicalNahuatlLesson7Marks(value = "") {
      return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
    }
    function getClassicalNahuatlLesson7StemForShape(value = "") {
      return removeClassicalNahuatlLesson7Marks(normalizeClassicalNahuatlLesson7Stem(value)).replace(/[^a-z-]/gu, "").replace(/-/gu, "");
    }
    function wrapClassicalNahuatlLesson7Stem(value = "") {
      return `(${normalizeClassicalNahuatlLesson7Stem(value) || "STEM"})`;
    }
    function getClassicalNahuatlLesson7StructureLookupKey(stem = "") {
      return removeClassicalNahuatlLesson7Marks(normalizeClassicalNahuatlLesson7Stem(stem)).replace(/[^a-z-]/gu, "").toLowerCase();
    }
    function getClassicalNahuatlLesson7TlaFusionCanvasBoundaryExample(stem = "") {
      const normalized = normalizeClassicalNahuatlLesson7Stem(stem);
      const boundaryRecord = getClassicalNahuatlLesson7SourceBoundaryRoleRecord(normalized);
      if (!boundaryRecord?.embedMatrixAuthorized) {
        return null;
      }
      const embedStem = normalizeClassicalNahuatlLesson7Stem(boundaryRecord.embedStem || "");
      const matrixStem = normalizeClassicalNahuatlLesson7Stem(boundaryRecord.matrixStem || "");
      const derivedStem = normalizeClassicalNahuatlLesson7Stem(boundaryRecord.tlaFusionDerivedStem || "");
      const adverbialBoundary = /adverb/iu.test(boundaryRecord.boundaryRole || "");
      return {
        kind: "classical-nahuatl-lesson7-tla-fusion-canvas-boundary-example",
        tagId: "cn-l7-tla-fusion",
        ruleId: derivedStem ? "cn-l7-710-exact-derived-tla-fusion-boundary" : "cn-l7-710-embed-matrix-tla-fusion-build",
        lineStart: boundaryRecord.lineStart || 3279,
        lineEnd: boundaryRecord.lineEnd || 3285,
        exactWitness: boundaryRecord.exactWitness || "",
        inputStem: normalized,
        sourceStemVariant: boundaryRecord.tlaFusionSourceStemVariant || boundaryRecord.canonicalStemVariant || [embedStem, matrixStem].filter(Boolean).join("-") || normalized,
        stemVariant: matrixStem,
        incorporatedAdverb: adverbialBoundary ? embedStem : "",
        embedStem,
        matrixStem,
        fusedTlaSegment: adverbialBoundary ? getClassicalNahuatlLesson7FusedTlaSegment({
          incorporatedAdverb: embedStem
        }) : "tla",
        adverbPosition: adverbialBoundary ? "before-tla" : "",
        derivedStem,
        exactOutputOverride: Boolean(derivedStem),
        proofAnchorOnly: true,
        witnessUsePolicy: "proof-anchor-not-whitelist",
        sourceBoundaryRecord: cloneClassicalNahuatlLesson7Record(boundaryRecord),
        rejectedGenericDerivedStem: derivedStem ? `tla-${boundaryRecord.canonicalStemVariant || normalized}` : ""
      };
    }
    function getClassicalNahuatlLesson7UnknownInternalMorphRecords(stem = "") {
      const key = getClassicalNahuatlLesson7StructureLookupKey(stem);
      return cloneClassicalNahuatlLesson7Record(CLASSICAL_NAHUATL_LESSON7_UNKNOWN_INTERNAL_MORPH_RECORDS[key] || []);
    }
    function getClassicalNahuatlLesson7ContrastiveBoundaryRecord(stem = "") {
      const key = getClassicalNahuatlLesson7StructureLookupKey(stem);
      return cloneClassicalNahuatlLesson7Record(CLASSICAL_NAHUATL_LESSON7_CONTRASTIVE_BOUNDARY_STEMS[key] || null);
    }
    function buildClassicalNahuatlLesson7UserDefinedEmbedMatrixBoundaryRecord(stem = "", options = {}) {
      const key = getClassicalNahuatlLesson7StructureLookupKey(stem);
      const solidKey = key.replace(/-/gu, "");
      const embedStem = normalizeClassicalNahuatlLesson7Stem(getClassicalNahuatlLesson7ExplicitTlaFusionEmbedStem(options));
      const matrixStem = normalizeClassicalNahuatlLesson7Stem(getClassicalNahuatlLesson7ExplicitTlaFusionMatrixStem(options));
      const embedKey = getClassicalNahuatlLesson7StructureLookupKey(embedStem);
      const matrixKey = getClassicalNahuatlLesson7StructureLookupKey(matrixStem);
      const matrixSolidKey = matrixKey.replace(/-/gu, "");
      if (!embedKey || !matrixKey) {
        return null;
      }
      const matchingStaticRecordEntry = Object.entries(CLASSICAL_NAHUATL_LESSON7_SOURCE_BOUNDARY_ROLE_RECORDS).find(([_recordKey, record]) => record?.embedMatrixAuthorized === true && getClassicalNahuatlLesson7StructureLookupKey(record.embedStem || "") === embedKey && getClassicalNahuatlLesson7StructureLookupKey(record.matrixStem || "") === matrixKey);
      if (matchingStaticRecordEntry) {
        return {
          ...cloneClassicalNahuatlLesson7Record(matchingStaticRecordEntry[1]),
          boundaryRecordKey: matchingStaticRecordEntry[0],
          inputBoundarySpelling: "user-defined",
          solidBoundaryInferred: false,
          witnessUsePolicy: "proof-anchor-not-whitelist"
        };
      }
      if (embedKey === "huel" && (key === `huel-${matrixKey}` || solidKey === `huel${matrixSolidKey}`)) {
        return {
          sourceKind: "compound-vnc",
          stemRelationshipKind: "incorporated-adverb compound verbstem",
          embedMatrixAuthorized: true,
          embedStem: "huel",
          matrixStem,
          canonicalStemVariant: key,
          tlaFusionSourceStemVariant: key,
          boundaryRole: "incorporated-adverb-embed-plus-vnc-matrix",
          lineStart: 11438,
          lineEnd: 11441,
          exactWitness: "ninotlahtōlhuelitta = #ni-Ø+n-o(tla-ht-ō-l-huel-itt-a)Ø+Ø-Ø# ... For huel, which is an incorporated adverb here, see § 44.5.2.",
          notes: "Canvas witnesses huel as an incorporated adverb. When Fuente marks huel as embed and the following stem as matrix, the machine can build tla fusion inside that user-defined embed/matrix boundary.",
          boundaryRecordKey: "user-defined-embed-matrix:huel",
          inputBoundarySpelling: "user-defined",
          solidBoundaryInferred: false,
          witnessUsePolicy: "proof-anchor-not-whitelist"
        };
      }
      if ((embedKey === "ix" || embedKey === "ixi") && (key === `ix-${matrixKey}` || key === `ixi-${matrixKey}` || solidKey === `ix${matrixSolidKey}` || solidKey === `ixi${matrixSolidKey}`)) {
        const surfaceEmbedStem = embedKey === "ixi" ? "ixi" : "ix";
        return {
          sourceKind: "compound-vnc",
          stemRelationshipKind: "incorporated body-part adverb compound verbstem",
          embedMatrixAuthorized: true,
          embedStem: surfaceEmbedStem,
          matrixStem,
          canonicalStemVariant: `${surfaceEmbedStem}-${matrixStem}`,
          canvasWitnessStemVariant: "ixi-mati",
          tlaFusionSourceStemVariant: `${surfaceEmbedStem}-${matrixStem}`,
          boundaryRole: "incorporated-body-part-adverb-embed-plus-vnc-matrix",
          lineStart: 11053,
          lineEnd: 11078,
          exactWitness: "a stem signifying a body part can appear in the embed subposition ... tiquīximati = #ti-Ø+qu-Ø(ixi-mati)Ø+Ø-Ø# ... The incorporated nounstem is irregular in that it has an added [i], as if the stem were *(ixi)-tl-.",
          notes: "Canvas uses body-part stems as incorporated adverbial embeds and witnesses īx/ixi with added [i]. Fuente preserves the user-entered embed spelling; ix remains ix and ixi remains ixi.",
          boundaryRecordKey: `user-defined-embed-matrix:${surfaceEmbedStem}`,
          inputBoundarySpelling: "user-defined",
          solidBoundaryInferred: false,
          witnessUsePolicy: "proof-anchor-not-whitelist"
        };
      }
      const enteredPartsMatchStem = key === `${embedKey}-${matrixKey}` || solidKey === `${embedKey.replace(/-/gu, "")}${matrixSolidKey}`;
      if (!enteredPartsMatchStem) {
        return null;
      }
      return {
        sourceKind: "user-analyzed-compound-stem",
        stemRelationshipKind: "Canvas embed-before-matrix compound stem",
        embedMatrixAuthorized: true,
        embedStem,
        matrixStem,
        canonicalStemVariant: `${embedStem}-${matrixStem}`,
        tlaFusionSourceStemVariant: `${embedStem}-${matrixStem}`,
        boundaryRole: "user-defined-embed-plus-matrix",
        lineStart: 9893,
        lineEnd: 9931,
        exactWitness: "the matrix subposition ALWAYS comes after the embed subposition ... the embed subposition of a compound verbstem can come from either an NNC or a VNC",
        notes: "Fuente records an explicit embed-before-matrix analysis for one compound (STEM). This authorizes the source structure only; higher Canvas logic must still decide function, valence, derivation, and final output.",
        boundaryRecordKey: `user-defined-embed-matrix:${embedKey}:${matrixKey}`,
        inputBoundarySpelling: "user-defined",
        solidBoundaryInferred: false,
        witnessUsePolicy: "general-rule-authority-witnesses-as-proof-anchors"
      };
    }
    function getClassicalNahuatlLesson7SourceBoundaryRoleRecord(stem = "", options = {}) {
      const key = getClassicalNahuatlLesson7StructureLookupKey(stem);
      const compactKey = key.replace(/-/gu, "");
      const exactRecord = CLASSICAL_NAHUATL_LESSON7_SOURCE_BOUNDARY_ROLE_RECORDS[key];
      if (exactRecord) {
        return {
          ...cloneClassicalNahuatlLesson7Record(exactRecord),
          boundaryRecordKey: key,
          inputBoundarySpelling: "as-witnessed",
          solidBoundaryInferred: false,
          witnessUsePolicy: "proof-anchor-not-whitelist"
        };
      }
      const matchedEntry = Object.entries(CLASSICAL_NAHUATL_LESSON7_SOURCE_BOUNDARY_ROLE_RECORDS).find(([recordKey]) => getClassicalNahuatlLesson7StructureLookupKey(recordKey) === key);
      if (matchedEntry) {
        return {
          ...cloneClassicalNahuatlLesson7Record(matchedEntry[1]),
          boundaryRecordKey: matchedEntry[0],
          inputBoundarySpelling: "as-witnessed",
          solidBoundaryInferred: false,
          witnessUsePolicy: "proof-anchor-not-whitelist"
        };
      }
      const compactMatchedEntry = Object.entries(CLASSICAL_NAHUATL_LESSON7_SOURCE_BOUNDARY_ROLE_RECORDS).find(([recordKey, record]) => record?.embedMatrixAuthorized === true && getClassicalNahuatlLesson7StructureLookupKey(recordKey).replace(/-/gu, "") === compactKey);
      if (compactMatchedEntry) {
        return {
          ...cloneClassicalNahuatlLesson7Record(compactMatchedEntry[1]),
          boundaryRecordKey: compactMatchedEntry[0],
          inputBoundarySpelling: "solid",
          solidBoundaryInferred: true,
          witnessUsePolicy: "proof-anchor-not-whitelist"
        };
      }
      if (/^cal-tzin-ti-a$/u.test(key)) {
        return {
          ...cloneClassicalNahuatlLesson7Record(CLASSICAL_NAHUATL_LESSON7_SOURCE_BOUNDARY_ROLE_RECORDS["cal-tzin-ti-a"]),
          boundaryRecordKey: "cal-tzin-ti-a",
          inputBoundarySpelling: "as-witnessed",
          solidBoundaryInferred: false,
          witnessUsePolicy: "proof-anchor-not-whitelist"
        };
      }
      const userDefinedEmbedMatrixRecord = buildClassicalNahuatlLesson7UserDefinedEmbedMatrixBoundaryRecord(stem, options);
      if (userDefinedEmbedMatrixRecord) {
        return userDefinedEmbedMatrixRecord;
      }
      return null;
    }
    function getClassicalNahuatlLesson7NearbySourceBoundaryRecordKey(stem = "") {
      const key = getClassicalNahuatlLesson7StructureLookupKey(stem);
      const compactKey = key.replace(/-/gu, "");
      if (!compactKey) {
        return "";
      }
      const nearbyEntry = Object.entries(CLASSICAL_NAHUATL_LESSON7_SOURCE_BOUNDARY_ROLE_RECORDS).find(([recordKey, record]) => {
        if (record?.embedMatrixAuthorized !== true) {
          return false;
        }
        const compactRecordKey = getClassicalNahuatlLesson7StructureLookupKey(recordKey).replace(/-/gu, "");
        return compactRecordKey && compactRecordKey !== compactKey && (compactKey.startsWith(compactRecordKey) || compactRecordKey.startsWith(compactKey));
      });
      return nearbyEntry ? nearbyEntry[0] : "";
    }
    function dedupeClassicalNahuatlLesson7RuleRefs(refs = []) {
      const seen = new Set();
      return (Array.isArray(refs) ? refs : []).filter(Boolean).filter(ref => {
        const key = `${ref.id || ""}:${ref.tagId || ""}:${ref.lineStart || ""}:${ref.lineEnd || ""}`;
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      }).map(cloneClassicalNahuatlLesson7Rule);
    }
    function buildClassicalNahuatlLesson7SourceBoundaryRoleFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem || options.source || "");
      const structureRuleFrame = buildClassicalNahuatlLesson7VerbstemStructureRuleFrame(normalizedStem);
      const boundaryRecord = getClassicalNahuatlLesson7SourceBoundaryRoleRecord(normalizedStem, options);
      const internalMorphs = structureRuleFrame.internalMorphs || [];
      const hasInternalHyphen = internalMorphs.length > 1;
      const embedMatrixAuthorized = boundaryRecord?.embedMatrixAuthorized === true;
      const sourceKind = boundaryRecord?.sourceKind || (hasInternalHyphen ? "analyzed-verbstem" : "simple-verbstem");
      const structureActions = [...(structureRuleFrame.structureActions || [])];
      if (hasInternalHyphen && !embedMatrixAuthorized) {
        structureActions.push(CLASSICAL_NAHUATL_LESSON7_STRUCTURE_ACTIONS.BLOCK_HYPHEN_AS_EMBED_MATRIX);
      }
      if (embedMatrixAuthorized) {
        structureActions.push(CLASSICAL_NAHUATL_LESSON7_STRUCTURE_ACTIONS.AUTHORIZE_CANVAS_EMBED_MATRIX);
      }
      return {
        kind: "classical-nahuatl-lesson7-source-boundary-role-frame",
        lesson: "Andrews Lesson 7",
        section: boundaryRecord?.lineStart ? "Canvas witnessed source-boundary role" : "7.1",
        ruleLogicRole: "source-boundary-role-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        stem: normalizedStem,
        sourceKind,
        stemRelationshipKind: boundaryRecord?.stemRelationshipKind || "",
        boundaryRole: boundaryRecord?.boundaryRole || (hasInternalHyphen ? "position-internal-morph-boundary" : "none"),
        boundaryRoleKnown: Boolean(boundaryRecord),
        boundaryRecordKey: boundaryRecord?.boundaryRecordKey || "",
        inputBoundarySpelling: boundaryRecord?.inputBoundarySpelling || (hasInternalHyphen ? "hyphenated" : "solid"),
        solidBoundaryInferred: boundaryRecord?.solidBoundaryInferred === true,
        witnessUsePolicy: boundaryRecord?.witnessUsePolicy || "proof-anchor-not-whitelist",
        canonicalStemVariant: boundaryRecord?.canonicalStemVariant || normalizedStem,
        internalMorphs,
        internalMorphBoundaryScope: structureRuleFrame.internalMorphBoundaryScope,
        internalMorphsRemainInsideVerbstem: true,
        internalMorphsBecomeFormulaSlots: false,
        formulaSlotSplitAllowed: false,
        hyphenOnlyBoundary: hasInternalHyphen,
        hyphenOnlyEmbedMatrixInferenceBlocked: hasInternalHyphen && !embedMatrixAuthorized,
        hyphenOnlyCannotPopulateEmbedMatrix: hasInternalHyphen && !embedMatrixAuthorized,
        embedMatrixAuthorized,
        compoundStemAuthorized: embedMatrixAuthorized,
        embedStem: boundaryRecord?.embedStem || "",
        matrixStem: boundaryRecord?.matrixStem || "",
        tlaFusionSourceStemVariant: boundaryRecord?.tlaFusionSourceStemVariant || "",
        tlaFusionDerivedStem: boundaryRecord?.tlaFusionDerivedStem || "",
        tlaFusionDerivedTargetWitnessed: Boolean(boundaryRecord?.tlaFusionDerivedStem),
        explicitSlashMaySeparateEmbedMatrix: true,
        sourceReadoutRole: embedMatrixAuthorized ? `${boundaryRecord.embedStem || "embed"} | ${boundaryRecord.matrixStem || "matrix"}` : hasInternalHyphen ? "one verbstem; no embed/matrix from hyphen" : "one verbstem",
        structureActions: Array.from(new Set(structureActions)),
        ruleRefs: dedupeClassicalNahuatlLesson7RuleRefs([...(structureRuleFrame.ruleRefs || []), boundaryRecord ? {
          id: "cn-l7-source-boundary-role-canvas-witness",
          tagId: "cn-l7-source-boundary-role",
          section: boundaryRecord.sourceKind || "",
          lineStart: boundaryRecord.lineStart,
          lineEnd: boundaryRecord.lineEnd,
          exactWitness: boundaryRecord.exactWitness,
          rule: boundaryRecord.notes || ""
        } : null].filter(Boolean)),
        authorizationStatus: normalizedStem ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function normalizeClassicalNahuatlLesson7SourceSelectionKind(value = "") {
      const raw = String(value || "").trim().toLowerCase().replace(/[_\s]+/gu, "-");
      const aliases = {
        stem: "whole-stem",
        whole: "whole-stem",
        "whole-stem": "whole-stem",
        verbstem: "whole-stem",
        morphs: "internal-morphemes",
        morphemes: "internal-morphemes",
        "internal-morphs": "internal-morphemes",
        "internal-morphemes": "internal-morphemes",
        "stem-internal-morphs": "internal-morphemes",
        embed: "embed-matrix",
        matrix: "embed-matrix",
        "embed-matrix": "embed-matrix",
        "matrix-embed": "embed-matrix",
        "embed+matrix": "embed-matrix",
        compound: "embed-matrix",
        "compound-vnc": "embed-matrix"
      };
      return aliases[raw] || "";
    }
    function buildClassicalNahuatlLesson7FuenteSourceSelectionFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem || options.source || "");
      const sourceBoundaryRoleFrame = options.sourceBoundaryRoleFrame || buildClassicalNahuatlLesson7SourceBoundaryRoleFrame(normalizedStem, options);
      const explicitEmbedStem = getClassicalNahuatlLesson7ExplicitTlaFusionEmbedStem(options);
      const explicitMatrixStem = getClassicalNahuatlLesson7ExplicitTlaFusionMatrixStem(options);
      const requestedSelectionKind = normalizeClassicalNahuatlLesson7SourceSelectionKind(options.sourceSelectionKind || options.fuenteSourceSelectionKind || options.sourceKind || options.userSourceSelectionKind || "");
      const userSelectionKind = requestedSelectionKind || (explicitEmbedStem || explicitMatrixStem ? "embed-matrix" : "");
      const selectedSourceKind = sourceBoundaryRoleFrame.embedMatrixAuthorized === true ? "embed-matrix" : sourceBoundaryRoleFrame.hyphenOnlyBoundary ? "internal-morphemes" : "whole-stem";
      const canvasEmbedStem = normalizeClassicalNahuatlLesson7Stem(sourceBoundaryRoleFrame.embedStem || "");
      const canvasMatrixStem = normalizeClassicalNahuatlLesson7Stem(sourceBoundaryRoleFrame.matrixStem || "");
      const explicitPartsPresent = Boolean(explicitEmbedStem || explicitMatrixStem);
      const userEmbedMatchesCanvas = !explicitEmbedStem || explicitEmbedStem === canvasEmbedStem;
      const userMatrixMatchesCanvas = !explicitMatrixStem || explicitMatrixStem === canvasMatrixStem;
      const userSelectionMatchesCanvasKind = !userSelectionKind || userSelectionKind === selectedSourceKind;
      const userSelectionPartsMatchCanvas = userSelectionKind !== "embed-matrix" || sourceBoundaryRoleFrame.embedMatrixAuthorized === true && userEmbedMatchesCanvas && userMatrixMatchesCanvas && Boolean(canvasEmbedStem && canvasMatrixStem);
      const userSelectionCanvasPermitted = Boolean(userSelectionKind && userSelectionMatchesCanvasKind && userSelectionPartsMatchCanvas);
      const userSelectionContradictsCanvas = Boolean(userSelectionKind && !userSelectionCanvasPermitted);
      const selectedBy = userSelectionCanvasPermitted && (requestedSelectionKind || explicitPartsPresent) ? "user-canvas-permitted" : sourceBoundaryRoleFrame.boundaryRoleKnown ? "canvas-witness" : "canvas-default";
      const sourceSelectionActions = Array.from(new Set([selectedSourceKind === "embed-matrix" ? CLASSICAL_NAHUATL_LESSON7_SOURCE_SELECTION_ACTIONS.SELECT_EMBED_MATRIX : selectedSourceKind === "internal-morphemes" ? CLASSICAL_NAHUATL_LESSON7_SOURCE_SELECTION_ACTIONS.SELECT_INTERNAL_MORPHEMES : CLASSICAL_NAHUATL_LESSON7_SOURCE_SELECTION_ACTIONS.SELECT_WHOLE_STEM, ...(userSelectionCanvasPermitted ? [CLASSICAL_NAHUATL_LESSON7_SOURCE_SELECTION_ACTIONS.ACCEPT_USER_CANVAS_SELECTION] : []), ...(userSelectionContradictsCanvas ? [CLASSICAL_NAHUATL_LESSON7_SOURCE_SELECTION_ACTIONS.BLOCK_USER_SOURCE_SELECTION] : []), CLASSICAL_NAHUATL_LESSON7_SOURCE_SELECTION_ACTIONS.CARRY_TO_SELECTED_OUTPUT]));
      return {
        kind: "classical-nahuatl-lesson7-fuente-source-selection-frame",
        lesson: "Andrews Lesson 7",
        section: "7.1 + Canvas witnessed compound examples",
        ruleLogicRole: "fuente-source-selection-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        stem: normalizedStem,
        selectedSourceKind,
        selectedBy,
        sourceBoundaryRecordKey: sourceBoundaryRoleFrame.boundaryRecordKey || "",
        sourceBoundaryInputSpelling: sourceBoundaryRoleFrame.inputBoundarySpelling || "",
        sourceBoundarySolidInferred: sourceBoundaryRoleFrame.solidBoundaryInferred === true,
        witnessUsePolicy: sourceBoundaryRoleFrame.witnessUsePolicy || "proof-anchor-not-whitelist",
        canvasSelectsWholeStem: selectedSourceKind === "whole-stem",
        canvasSelectsInternalMorphemes: selectedSourceKind === "internal-morphemes",
        canvasSelectsEmbedMatrix: selectedSourceKind === "embed-matrix",
        canvasAllowsUserSourceSelection: selectedSourceKind === "embed-matrix" && sourceBoundaryRoleFrame.embedMatrixAuthorized === true,
        userSelectionKind,
        requestedSelectionKind,
        explicitEmbedStem,
        explicitMatrixStem,
        userSelectionCanvasPermitted,
        userSelectionContradictsCanvas,
        userSelectionContradictionReason: userSelectionContradictsCanvas ? "requested-source-selection-not-authorized-by-canvas-source-boundary" : "",
        selectedEmbedStem: selectedSourceKind === "embed-matrix" ? canvasEmbedStem : "",
        selectedMatrixStem: selectedSourceKind === "embed-matrix" ? canvasMatrixStem : "",
        selectedInternalMorphs: selectedSourceKind === "internal-morphemes" ? sourceBoundaryRoleFrame.internalMorphs || [] : [],
        selectedWholeStem: selectedSourceKind === "whole-stem" ? normalizedStem : "",
        sourceReadoutRole: sourceBoundaryRoleFrame.sourceReadoutRole || "",
        sourceBoundaryRoleFrameKind: sourceBoundaryRoleFrame.kind || "",
        sourceBoundaryRole: sourceBoundaryRoleFrame.boundaryRole || "",
        sourceBoundaryKnown: sourceBoundaryRoleFrame.boundaryRoleKnown === true,
        sourceSelectionActions,
        ruleRefs: dedupeClassicalNahuatlLesson7RuleRefs(sourceBoundaryRoleFrame.ruleRefs || []),
        authorizationStatus: userSelectionContradictsCanvas ? "blocked" : "authorized",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function getClassicalNahuatlLesson7ClassBSilentCausativeCarrierRecord(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const key = getClassicalNahuatlLesson7StructureLookupKey(stem);
      const exactRecord = CLASSICAL_NAHUATL_LESSON7_CLASS_B_SILENT_CAUSATIVE_CARRIER_STEMS[key] || null;
      if (exactRecord) {
        return cloneClassicalNahuatlLesson7Record(exactRecord);
      }
      const rightEdgeEntry = Object.entries(CLASSICAL_NAHUATL_LESSON7_CLASS_B_SILENT_CAUSATIVE_CARRIER_STEMS).find(([recordKey]) => {
        const compactRecordKey = recordKey.replace(/-/gu, "");
        return key.endsWith(`-${recordKey}`) || key.endsWith(compactRecordKey);
      });
      if (!rightEdgeEntry) {
        return null;
      }
      const [recordKey, record] = rightEdgeEntry;
      const recordPartCount = recordKey.split("-").length;
      const normalizedParts = normalizedStem.split("-").filter(Boolean);
      const compactRecordKey = recordKey.replace(/-/gu, "");
      const hyphenatedRightEdgeMatch = key.endsWith(`-${recordKey}`);
      const solidBoundaryMatch = !hyphenatedRightEdgeMatch && key.endsWith(compactRecordKey);
      const solidStem = normalizedStem.normalize("NFC");
      const rightEdgeStem = hyphenatedRightEdgeMatch ? normalizedParts.slice(-recordPartCount).join("-") || record.causativeStem : solidBoundaryMatch ? solidStem.slice(-compactRecordKey.length) : record.causativeStem;
      const compoundPrefix = hyphenatedRightEdgeMatch ? normalizedParts.slice(0, -recordPartCount).join("-") : solidBoundaryMatch ? solidStem.slice(0, Math.max(0, solidStem.length - compactRecordKey.length)) : "";
      return {
        ...cloneClassicalNahuatlLesson7Record(record),
        causativeStem: rightEdgeStem,
        canonicalCausativeStem: record.causativeStem,
        compoundStem: normalizedStem,
        compoundPrefix,
        rightEdgeMatrixStem: rightEdgeStem,
        rightEdgeCausativeStem: rightEdgeStem,
        rightEdgeMatrixCarrierInherited: true,
        carrierStaysInsideCompoundVerbstem: true,
        solidCausativeBoundaryInferred: solidBoundaryMatch,
        analyzedBoundaryInInput: hyphenatedRightEdgeMatch,
        causativeMorphemeRecognizedByRule: true,
        rightEdgeMatrixLineStart: 10920,
        rightEdgeMatrixLineEnd: 10927,
        rightEdgeMatrixExactWitness: "Principal ... [source of the matrix stem] ... Transform: Nixōchitēmoa. = #ni-Ø(xō-chi-tēm-o-a)Ø+Ø-Ø#"
      };
    }
    function getClassicalNahuatlLesson7TraditionalSpellingWarningRecord(stem = "") {
      const key = getClassicalNahuatlLesson7StructureLookupKey(stem);
      const compactKey = key.replace(/-/gu, "");
      return cloneClassicalNahuatlLesson7Record(CLASSICAL_NAHUATL_LESSON7_TRADITIONAL_SPELLING_WARNING_STEMS[key] || CLASSICAL_NAHUATL_LESSON7_TRADITIONAL_SPELLING_WARNING_STEMS[compactKey] || null);
    }
    function getClassicalNahuatlLesson7ShapeConsonantUnits(stem = "") {
      const beforeFinalVowel = getClassicalNahuatlLesson7StemForShape(stem).replace(/[aeio]$/u, "");
      const consonantRun = beforeFinalVowel.match(/(?:ch|cu|hu|qu|tl|tz|[bcdfghjklmnpqrstvwxyz])+$/u)?.[0] || "";
      return consonantRun.match(/ch|cu|hu|qu|tl|tz|[bcdfghjklmnpqrstvwxyz]/gu) || [];
    }
    function isClassicalNahuatlLesson7FinalVowelAfterConsonantCluster(stem = "") {
      const units = getClassicalNahuatlLesson7ShapeConsonantUnits(stem);
      return units.length >= 2;
    }
    function isClassicalNahuatlLesson7MonosyllabicStem(stem = "") {
      const normalized = normalizeClassicalNahuatlLesson7Stem(stem).replace(/[^a-zāēīō-]/giu, "").replace(/-/gu, "");
      return (normalized.match(/[aeioāēīō]+/giu) || []).length === 1;
    }
    function makeClassicalNahuatlLesson7GeneralClassAuthorityRecord({
      stem = "",
      section = "7.6",
      lineStart = 2990,
      lineEnd = 3044,
      exactWitness = "",
      relationRuleId = "cn-l7-76-guidelines-not-majority-prediction",
      defaultClassId = "A",
      allowedClassIds = [],
      classOptions = [],
      alternativeClassIds = [],
      conditionKind = "form-rule"
    } = {}) {
      return makeClassicalNahuatlLesson76GuidelineAuthorityRecord({
        sourceStem: normalizeClassicalNahuatlLesson7Stem(stem),
        section,
        lineStart,
        lineEnd,
        exactWitness,
        relationRuleId,
        defaultClassId,
        allowedClassIds,
        classOptions,
        alternativeClassIds,
        conditionKind,
        notes: "General Canvas form rule; cited verbs are witnesses, not a whitelist."
      });
    }
    function getClassicalNahuatlLesson76GuidelineAuthorityRecord(stem = "", options = {}) {
      const normalized = normalizeClassicalNahuatlLesson7Stem(stem);
      const key = getClassicalNahuatlLesson7StructureLookupKey(stem);
      const compactKey = key.replace(/-/gu, "");
      const shapeStem = getClassicalNahuatlLesson7StemForShape(normalized);
      const valence = normalizeClassicalNahuatlLesson7Valence(options.valence || options.transitivity || "");

      // These are the lexical exceptions or enumerated memberships stated by Canvas.
      if (compactKey === "paca") {
        return cloneClassicalNahuatlLesson7Record(CLASSICAL_NAHUATL_LESSON7_GUIDELINE_AUTHORITY_STEMS.paca);
      }
      if (compactKey === "a") {
        return cloneClassicalNahuatlLesson7Record(CLASSICAL_NAHUATL_LESSON7_GUIDELINE_AUTHORITY_STEMS.a);
      }
      if (CLASSICAL_NAHUATL_LESSON7_CLASS_D_HEAD_STEMS.includes(shapeStem)) {
        return makeClassicalNahuatlLesson7GeneralClassAuthorityRecord({
          stem: normalized,
          section: "7.6.8",
          lineStart: 3035,
          lineEnd: 3044,
          exactWitness: "The following eight verbstems belong to Class D",
          relationRuleId: "cn-l7-768-eight-class-d-stems",
          defaultClassId: "D",
          allowedClassIds: ["D"],
          conditionKind: "canvas-enumerated-class-d-membership"
        });
      }

      // Productive form rules apply to any submitted verbstem with the same structure.
      if (/(?:[oi]-[aā]|[oi]ā)$/iu.test(normalized)) {
        return makeClassicalNahuatlLesson7GeneralClassAuthorityRecord({
          stem: normalized,
          section: "7.3.1",
          lineStart: 2930,
          lineEnd: 2934,
          exactWitness: "The imperfective stem of Class C verbs always ends in a final /a:/ preceded by either /o/ or /i/.",
          relationRuleId: "cn-l7-73-class-c",
          defaultClassId: "C",
          allowedClassIds: ["C"],
          conditionKind: "final-long-a-after-o-or-i-morph"
        });
      }
      if (getClassicalNahuatlLesson7FinalVowelInfo(normalized).finalVowel && isClassicalNahuatlLesson7MonosyllabicStem(normalized)) {
        const finalLongA = /ā$/iu.test(normalized);
        return makeClassicalNahuatlLesson7GeneralClassAuthorityRecord({
          stem: normalized,
          section: "7.6.1",
          lineStart: 2993,
          lineEnd: 3000,
          exactWitness: "Monosyllabic verbstems ending in long /a:/ belong to Class D; otherwise, monosyllabic verbstems belong to Class A.",
          relationRuleId: "cn-l7-761-monosyllabic-long-a-d",
          defaultClassId: finalLongA ? "D" : "A",
          allowedClassIds: [finalLongA ? "D" : "A"],
          conditionKind: finalLongA ? "monosyllabic-final-long-a" : "monosyllabic-non-final-long-a"
        });
      }
      if (/ya$/u.test(shapeStem)) {
        const intransitiveOptions = valence === "intransitive" ? ["B", "A"] : ["B"];
        return makeClassicalNahuatlLesson7GeneralClassAuthorityRecord({
          stem: normalized,
          section: "7.6.6",
          lineStart: 3025,
          lineEnd: 3032,
          exactWitness: "Verbstems whose final syllable is /ya/ belong to Class B; intransitive verbstems ending in /ya/ usually have the option of also belonging to Class A.",
          relationRuleId: "cn-l7-766-final-ya-b",
          defaultClassId: "B",
          allowedClassIds: intransitiveOptions,
          classOptions: intransitiveOptions,
          alternativeClassIds: intransitiveOptions.slice(1),
          conditionKind: valence === "intransitive" ? "intransitive-final-ya-variable-a-b" : "final-ya-class-b"
        });
      }
      if (isClassicalNahuatlLesson7FinalVowelAfterConsonantCluster(normalized)) {
        return makeClassicalNahuatlLesson7GeneralClassAuthorityRecord({
          stem: normalized,
          section: "7.6.2",
          lineStart: 3001,
          lineEnd: 3014,
          exactWitness: "Verbstems whose final vowel is preceded by two consonants or by a long consonant belong to Class A.",
          relationRuleId: "cn-l7-762-final-vowel-after-cluster-a",
          defaultClassId: "A",
          allowedClassIds: ["A"],
          conditionKind: "final-vowel-after-two-or-long-consonant"
        });
      }
      if (/-a$/u.test(normalized) && options.finalMorphRole === "causative") {
        return makeClassicalNahuatlLesson7GeneralClassAuthorityRecord({
          stem: normalized,
          section: "7.3.1",
          lineStart: 2921,
          lineEnd: 2928,
          exactWitness: "the final vowel is the causative morpheme /a/, which in the perfective stem is represented by the irregular silently present morphic carrier",
          relationRuleId: "cn-l7-73-class-b-causative-final-a-morph",
          defaultClassId: "B",
          allowedClassIds: ["B"],
          conditionKind: "analyzed-final-causative-a-morph"
        });
      }
      if (/ka$/u.test(shapeStem) || /ca$/u.test(shapeStem)) {
        return makeClassicalNahuatlLesson7GeneralClassAuthorityRecord({
          stem: normalized,
          section: "7.6.3",
          lineStart: 3015,
          lineEnd: 3018,
          exactWitness: "Verbstems whose final syllable is /ka/ belong to Class A.",
          relationRuleId: "cn-l7-763-final-ka-a",
          defaultClassId: "A",
          allowedClassIds: ["A"],
          conditionKind: "final-ka"
        });
      }
      if (/tla$/u.test(shapeStem)) {
        return makeClassicalNahuatlLesson7GeneralClassAuthorityRecord({
          stem: normalized,
          section: "7.6.4",
          lineStart: 3019,
          lineEnd: 3020,
          exactWitness: "Verbstems whose final syllable is /tla/ belong to Class A.",
          relationRuleId: "cn-l7-764-final-tla-a",
          defaultClassId: "A",
          allowedClassIds: ["A"],
          conditionKind: "final-tla"
        });
      }
      if (/hua$/u.test(shapeStem) && valence === "intransitive" && options.signifiesChange === true) {
        return makeClassicalNahuatlLesson7GeneralClassAuthorityRecord({
          stem: normalized,
          section: "7.6.5",
          lineStart: 3021,
          lineEnd: 3023,
          exactWitness: "Intransitive verbstems that end in /wa/ and signify change belong to Class A.",
          relationRuleId: "cn-l7-765-intransitive-wa-change-a",
          defaultClassId: "A",
          allowedClassIds: ["A"],
          conditionKind: "intransitive-final-wa-signifies-change"
        });
      }
      if (/o$/u.test(shapeStem)) {
        return makeClassicalNahuatlLesson7GeneralClassAuthorityRecord({
          stem: normalized,
          section: "7.6.7",
          lineStart: 3033,
          lineEnd: 3034,
          exactWitness: "Verbs ending in /o/ or /o:/ belong to Class A.",
          relationRuleId: "cn-l7-767-final-o-a",
          defaultClassId: "A",
          allowedClassIds: ["A"],
          conditionKind: "final-o-or-long-o"
        });
      }
      return null;
    }
    function getClassicalNahuatlLesson7FinalVowelInfo(stem = "") {
      const normalized = normalizeClassicalNahuatlLesson7Stem(stem);
      const match = normalized.match(/[aeioāēīō]$/iu);
      if (!match) {
        return {
          finalVowel: "",
          long: false
        };
      }
      return {
        finalVowel: match[0].toLowerCase(),
        long: /[āēīō]/iu.test(match[0])
      };
    }
    function normalizeClassicalNahuatlLesson7Valence(value = "") {
      const raw = normalizeClassicalNahuatlLesson7Token(value || "intransitive").replace(/\s+/gu, "-");
      const aliases = {
        intr: "intransitive",
        intransitive: "intransitive",
        transitive: "projective-nonhuman",
        "projective-human": "projective-human",
        human: "projective-human",
        te: "projective-human",
        tē: "projective-human",
        "projective-nonhuman": "projective-nonhuman",
        nonhuman: "projective-nonhuman",
        tla: "projective-nonhuman",
        "specific-projective": "specific-projective",
        "projective-specific": "specific-projective",
        specific: "specific-projective",
        "va1-va2": "specific-projective",
        ne: "shuntline-reflexive",
        "shuntline-reflexive": "shuntline-reflexive",
        "shuntline-reflexive-reciprocative": "shuntline-reflexive",
        reflexive: "mainline-reflexive",
        "mainline-reflexive": "mainline-reflexive",
        reciprocal: "human-reciprocal",
        "human-reciprocal": "human-reciprocal"
      };
      return aliases[raw] || raw || "intransitive";
    }
    function getClassicalNahuatlLesson7InitialVowelKind(stem = "", options = {}) {
      const explicit = normalizeClassicalNahuatlLesson7Token(options.initialVowelKind || "");
      if (explicit === "real" || explicit === "supportive") {
        return explicit;
      }
      const normalized = normalizeClassicalNahuatlLesson7Stem(stem);
      if (!/^[aeioāēīō]/iu.test(normalized)) {
        return "consonant-or-supportive-i";
      }
      if (/^i/i.test(normalized) && options.supportiveInitialI === true) {
        return "supportive";
      }
      return "real";
    }
    function omitClassicalNahuatlLesson7InitialSupportiveI(stem = "") {
      return normalizeClassicalNahuatlLesson7Stem(stem).replace(/^[iī]/iu, "");
    }
    function buildClassicalNahuatlLesson7InitialSupportiveIFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const valence = normalizeClassicalNahuatlLesson7Valence(options.valence || options.transitivity || options.objectKind || options.object || "");
      const initialVowelKind = getClassicalNahuatlLesson7InitialVowelKind(normalizedStem, options);
      const boundaryCanDrop = valence === "projective-nonhuman" || valence === "mainline-reflexive" || valence === "human-reciprocal";
      const initialSupportiveIDropped = Boolean(boundaryCanDrop && initialVowelKind === "supportive");
      const supportiveISurfaceAction = initialSupportiveIDropped ? CLASSICAL_NAHUATL_LESSON7_SUPPORTIVE_I_SURFACE_ACTIONS.DROP : initialVowelKind === "supportive" ? CLASSICAL_NAHUATL_LESSON7_SUPPORTIVE_I_SURFACE_ACTIONS.RETAIN : CLASSICAL_NAHUATL_LESSON7_SUPPORTIVE_I_SURFACE_ACTIONS.NOT_SUPPORTIVE;
      const supportiveISurfaceReason = initialSupportiveIDropped ? "boundary-removes-need-for-support" : initialVowelKind === "supportive" ? "boundary-does-not-license-supportive-i-drop" : initialVowelKind === "real" ? "real-initial-vowel-remains" : "stem-does-not-begin-with-supportive-i";
      return {
        kind: "classical-nahuatl-lesson7-initial-supportive-i-boundary-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson7AnalysisRules().filter(rule => rule.tagId === "cn-l7-supportive-initial-i"),
        inputStem: normalizedStem,
        stemRealization: initialSupportiveIDropped ? omitClassicalNahuatlLesson7InitialSupportiveI(normalizedStem) : normalizedStem,
        valence,
        initialVowelKind,
        boundaryCanDrop,
        initialSupportiveIDropped,
        supportiveISurfacePolicy: CLASSICAL_NAHUATL_LESSON7_SUPPORTIVE_I_SURFACE_POLICY,
        supportiveISurfaceAction,
        supportiveISurfaceReason,
        supportiveIIsOnlyAdditionOrDeletion: false,
        realInitialVowelRemains: initialVowelKind === "real",
        humanProjectiveBlocksDrop: valence === "projective-human",
        environmentRule: initialSupportiveIDropped ? "lesson-7.8-note1-initial-supportive-i-drops-after-object-boundary" : initialVowelKind === "real" ? "lesson-7.8-note1-real-initial-vowel-remains" : "lesson-7.8-note1-initial-supportive-i-not-applicable"
      };
    }
    function getClassicalNahuatlLesson7ProjectiveCitationRepresentative(options = {}) {
      const explicit = normalizeClassicalNahuatlLesson7Token(options.citationRepresentative || options.projectiveCitationRepresentative || options.projectiveObjectRepresentative || "");
      if (explicit === "te" || explicit === "tē" || explicit === "human" || explicit === "projective-human") {
        return {
          marker: "te",
          objectRole: "human-projective-citation-representative",
          source: "explicit-human-projective-representative",
          ambiguous: false
        };
      }
      if (explicit === "tla" || explicit === "nonhuman" || explicit === "projective-nonhuman") {
        return {
          marker: "tla",
          objectRole: "nonhuman-projective-citation-representative",
          source: "explicit-nonhuman-projective-representative",
          ambiguous: false
        };
      }
      const animacy = normalizeClassicalNahuatlLesson7Token(options.objectAnimacy || options.citationObjectAnimacy || "");
      if (animacy === "human" || animacy === "person") {
        return {
          marker: "te",
          objectRole: "human-projective-citation-representative",
          source: "object-animacy-human",
          ambiguous: false
        };
      }
      if (animacy === "nonhuman" || animacy === "thing") {
        return {
          marker: "tla",
          objectRole: "nonhuman-projective-citation-representative",
          source: "object-animacy-nonhuman",
          ambiguous: false
        };
      }
      const objectKind = normalizeClassicalNahuatlLesson7Token(options.objectKind || options.object || "");
      if (objectKind.includes("human")) {
        return {
          marker: objectKind.includes("nonhuman") ? "tla" : "te",
          objectRole: objectKind.includes("nonhuman") ? "nonhuman-projective-citation-representative" : "human-projective-citation-representative",
          source: "object-kind-projective-representative",
          ambiguous: false
        };
      }
      const objectPerson = normalizeClassicalNahuatlLesson7Subject(options.objectPerson || "");
      if (objectPerson === "1sg" || objectPerson === "1pl" || objectPerson === "2sg" || objectPerson === "2pl") {
        return {
          marker: "te",
          objectRole: "human-projective-citation-representative",
          source: "object-person-human",
          ambiguous: false
        };
      }
      return {
        marker: "te",
        objectRole: "human-projective-citation-representative",
        source: "default-projective-representative-needs-lexical-refinement",
        ambiguous: true
      };
    }
    function buildClassicalNahuatlLesson7CitationValenceFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const valence = normalizeClassicalNahuatlLesson7Valence(options.valence || options.transitivity || options.objectKind || options.object || "");
      const initialSupportiveIFrame = buildClassicalNahuatlLesson7InitialSupportiveIFrame(normalizedStem, {
        ...options,
        valence
      });
      const initialVowelKind = initialSupportiveIFrame.initialVowelKind;
      const citationStem = initialSupportiveIFrame.stemRealization;
      let marker = "";
      let citationForm = wrapClassicalNahuatlLesson7Stem(normalizedStem);
      let objectRole = "none";
      let formulaAuthority = "Andrews Lesson 5";
      let projectiveCitationRepresentative = "";
      let projectiveCitationRepresentativeSource = "";
      let projectiveCitationRepresentativeAmbiguous = false;
      const citationActions = [CLASSICAL_NAHUATL_LESSON7_CITATION_ACTIONS.REQUIRE_VERBCORE];
      if (valence === "shuntline-reflexive") {
        marker = "ne";
        citationForm = `ne-${wrapClassicalNahuatlLesson7Stem(normalizedStem)}`;
        objectRole = "shuntline-reflexive-reciprocative-citation";
        formulaAuthority = "Andrews Lesson 6";
      } else if (valence === "projective-human") {
        marker = "te";
        citationForm = `te-${wrapClassicalNahuatlLesson7Stem(normalizedStem)}`;
        objectRole = "nonspecific-human-projective-citation";
        formulaAuthority = "Andrews Lesson 6";
        projectiveCitationRepresentative = marker;
        projectiveCitationRepresentativeSource = "valence-projective-human";
        citationActions.push(CLASSICAL_NAHUATL_LESSON7_CITATION_ACTIONS.REPRESENT_PROJECTIVE_WITH_TE_TLA);
      } else if (valence === "projective-nonhuman") {
        marker = "tla";
        citationForm = `tla-${wrapClassicalNahuatlLesson7Stem(citationStem)}`;
        objectRole = "nonspecific-nonhuman-projective-citation";
        formulaAuthority = "Andrews Lesson 6";
        projectiveCitationRepresentative = marker;
        projectiveCitationRepresentativeSource = "valence-projective-nonhuman";
        citationActions.push(CLASSICAL_NAHUATL_LESSON7_CITATION_ACTIONS.REPRESENT_PROJECTIVE_WITH_TE_TLA);
      } else if (valence === "specific-projective") {
        const representative = getClassicalNahuatlLesson7ProjectiveCitationRepresentative(options);
        marker = representative.marker;
        citationForm = `${marker}-${wrapClassicalNahuatlLesson7Stem(normalizedStem)}`;
        objectRole = representative.objectRole;
        formulaAuthority = "Andrews Lesson 6";
        projectiveCitationRepresentative = marker;
        projectiveCitationRepresentativeSource = representative.source;
        projectiveCitationRepresentativeAmbiguous = representative.ambiguous;
        citationActions.push(CLASSICAL_NAHUATL_LESSON7_CITATION_ACTIONS.REPRESENT_PROJECTIVE_WITH_TE_TLA, CLASSICAL_NAHUATL_LESSON7_CITATION_ACTIONS.BLOCK_FORMULA_SLOT_PLACEHOLDER);
      } else if (valence === "mainline-reflexive") {
        marker = initialVowelKind === "real" ? `m-${CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO}` : "m-o";
        citationForm = `${marker}-${wrapClassicalNahuatlLesson7Stem(citationStem)}`;
        objectRole = "mainline-reflexive-citation";
        formulaAuthority = "Andrews Lesson 6";
        citationActions.push(CLASSICAL_NAHUATL_LESSON7_CITATION_ACTIONS.PRESERVE_REFLEXIVE_RECIPROCAL_DYAD);
      } else if (valence === "human-reciprocal") {
        marker = initialVowelKind === "real" ? `t-${CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO}` : "t-o";
        citationForm = `${marker}-${wrapClassicalNahuatlLesson7Stem(citationStem)}`;
        objectRole = "human-reciprocal-citation";
        formulaAuthority = "Andrews Lesson 6";
        citationActions.push(CLASSICAL_NAHUATL_LESSON7_CITATION_ACTIONS.PRESERVE_REFLEXIVE_RECIPROCAL_DYAD);
      }
      const citationUsesFormulaSlotPlaceholder = marker === "va1-va2" || /^va1-va2-/u.test(citationForm);
      const formulaSlotCitationBlocked = valence === "specific-projective";
      return {
        kind: "classical-nahuatl-lesson7-citation-valence-frame",
        citationUnit: valence === "intransitive" ? "intransitive-verbcore" : "verbcore",
        verbcoreFormula: valence === "intransitive" ? "stem" : "valence-plus-stem",
        stem: normalizedStem,
        valence,
        marker,
        objectRole,
        citationForm,
        citationActions,
        projectiveCitationRepresentative,
        projectiveCitationRepresentativeSource,
        projectiveCitationRepresentativeAmbiguous,
        formulaSlotCitationAllowed: false,
        formulaSlotCitationBlocked,
        blockedCitationMarkers: ["va1-va2"],
        citationUsesFormulaSlotPlaceholder,
        citationMarkerAuthority: "cn-l7-citation-form",
        hostileCitationMarkerRejected: !citationUsesFormulaSlotPlaceholder,
        initialVowelKind,
        stemRealization: citationStem,
        initialSupportiveIDropped: initialSupportiveIFrame.initialSupportiveIDropped,
        initialSupportiveISurfacePolicy: initialSupportiveIFrame.supportiveISurfacePolicy,
        initialSupportiveISurfaceAction: initialSupportiveIFrame.supportiveISurfaceAction,
        initialSupportiveISurfaceReason: initialSupportiveIFrame.supportiveISurfaceReason,
        initialSupportiveIIsOnlyAdditionOrDeletion: initialSupportiveIFrame.supportiveIIsOnlyAdditionOrDeletion,
        initialSupportiveIFrame,
        formulaAuthority,
        sourceAuthority: "Andrews transcription",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function normalizeClassicalNahuatlLesson7ClassId(value = "") {
      const raw = normalizeClassicalNahuatlLesson7Token(value).replace(/^class\s*/u, "").replace(/[^a-d12]/gu, "").toUpperCase();
      if (raw === "A1") {
        return "A-1";
      }
      if (raw === "A2") {
        return "A-2";
      }
      if (raw === "A" || raw === "B" || raw === "C" || raw === "D" || raw === "A-1" || raw === "A-2") {
        return raw;
      }
      return "";
    }
    function getClassicalNahuatlLesson7StemRelationship(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const relationship = CLASSICAL_NAHUATL_LESSON7_STEM_RELATIONSHIPS[normalizedStem];
      return relationship ? cloneClassicalNahuatlLesson7Record(relationship) : null;
    }
    function getClassicalNahuatlLesson11OptionalIrregularPerfectiveRecord(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const record = CLASSICAL_NAHUATL_LESSON11_OPTIONAL_IRREGULAR_PERFECTIVE_STEMS[normalizedStem];
      return record ? cloneClassicalNahuatlLesson7Record(record) : null;
    }
    function normalizeClassicalNahuatlLesson7Subject(value = "") {
      const raw = normalizeClassicalNahuatlLesson7Token(value || "3sg").replace(/[^a-z0-9]/gu, "");
      const aliases = {
        "1": "1sg",
        "1s": "1sg",
        "1sg": "1sg",
        firstsingular: "1sg",
        "2": "2sg",
        "2s": "2sg",
        "2sg": "2sg",
        secondsingular: "2sg",
        "3": "3sg",
        "3s": "3sg",
        "3sg": "3sg",
        thirdsingular: "3sg",
        "1p": "1pl",
        "1pl": "1pl",
        firstplural: "1pl",
        "2p": "2pl",
        "2pl": "2pl",
        secondplural: "2pl",
        "3p": "3pl",
        "3pl": "3pl",
        thirdplural: "3pl"
      };
      return aliases[raw] || raw || "3sg";
    }
    function isClassicalNahuatlLesson11OptionalIrregularEnvironment({
      subject = "3sg",
      mood = "indicative",
      tense = "present",
      aspect = ""
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlLesson7Subject(subject);
      const normalizedMood = normalizeClassicalNahuatlLesson7Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson7Tense(tense, normalizedMood);
      const singularSubject = normalizedSubject.endsWith("sg");
      const preteritOrAdmonitive = normalizedMood === "indicative" && normalizedTense === "preterit" || normalizedMood === "admonitive";
      return Boolean(singularSubject && preteritOrAdmonitive && (!aspect || aspect === "perfective"));
    }
    function inferClassicalNahuatlLesson7ClassProfile(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const shapeStem = getClassicalNahuatlLesson7StemForShape(normalizedStem);
      const stemRelationship = getClassicalNahuatlLesson7StemRelationship(normalizedStem);
      const optionalIrregularRecord = getClassicalNahuatlLesson11OptionalIrregularPerfectiveRecord(normalizedStem);
      const traditionalSpellingWarningRecord = getClassicalNahuatlLesson7TraditionalSpellingWarningRecord(normalizedStem);
      const valence = normalizeClassicalNahuatlLesson7Valence(options.valence || options.transitivity || "");
      const guidelineAuthorityRecord = getClassicalNahuatlLesson76GuidelineAuthorityRecord(normalizedStem, {
        ...options,
        valence
      });
      const explicit = normalizeClassicalNahuatlLesson7ClassId(options.verbClass || options.stemClass || options.classId || options.perfectiveClass || "");
      const finalInfo = getClassicalNahuatlLesson7FinalVowelInfo(normalizedStem);
      const classOptions = [];
      let classId = explicit || "";
      let subclass = "";
      let guidelineId = "cn-l7-76-guidelines-not-majority-prediction";
      const guidelineAllowedClassIds = guidelineAuthorityRecord?.allowedClassIds || [];
      const guidelineClassOptions = guidelineAuthorityRecord?.classOptions || [];
      const higherLayerClassOverride = normalizeClassicalNahuatlLesson7ClassId(options.canvasHigherLayerClassOverride || "");
      const higherLayerClassOverrideApplies = Boolean(explicit && higherLayerClassOverride && explicit === higherLayerClassOverride);
      const guidelineContradictionBlocked = Boolean(explicit && guidelineAllowedClassIds.length && !guidelineAllowedClassIds.includes(explicit) && !higherLayerClassOverrideApplies);
      const guidelineSelectedClassAllowed = Boolean(!explicit || !guidelineAllowedClassIds.length || guidelineAllowedClassIds.includes(explicit));
      if (guidelineAuthorityRecord?.relationRuleId) {
        guidelineId = guidelineAuthorityRecord.relationRuleId;
      }
      if (classId === "D") {
        if (stemRelationship?.relationRuleId) {
          guidelineId = stemRelationship.relationRuleId;
        } else if (guidelineAuthorityRecord?.relationRuleId) {
          guidelineId = guidelineAuthorityRecord.relationRuleId;
        } else if (CLASSICAL_NAHUATL_LESSON7_CLASS_D_HEAD_STEMS.includes(shapeStem)) {
          guidelineId = "cn-l7-768-eight-class-d-stems";
        }
      }
      if (!classId) {
        if (stemRelationship?.relationshipKind === "variant-stem") {
          classId = "D";
          guidelineId = stemRelationship.relationRuleId;
        } else if (optionalIrregularRecord?.classId) {
          classId = optionalIrregularRecord.classId;
          guidelineId = optionalIrregularRecord.relationRuleId;
        } else if (guidelineAuthorityRecord?.defaultClassId) {
          classId = guidelineAuthorityRecord.defaultClassId;
          guidelineId = guidelineAuthorityRecord.relationRuleId;
          classOptions.push(...guidelineClassOptions.filter(classOption => classOption !== classId));
        } else {
          classId = "A";
          guidelineId = "cn-l7-76-guidelines-not-majority-prediction";
        }
      } else if (guidelineAuthorityRecord?.relationRuleId) {
        guidelineId = guidelineAuthorityRecord.relationRuleId;
        classOptions.push(...guidelineClassOptions.filter(classOption => classOption !== classId));
      }
      if (classId === "A-1" || classId === "A-2") {
        subclass = classId;
        classId = "A";
      } else if (classId === "A") {
        subclass = finalInfo.long && /[īō]/iu.test(finalInfo.finalVowel) ? "A-2" : "A-1";
      }
      const classShape = CLASSICAL_NAHUATL_LESSON7_CLASS_SHAPES[classId] || CLASSICAL_NAHUATL_LESSON7_CLASS_SHAPES.A;
      return {
        kind: "classical-nahuatl-lesson7-stem-class-profile",
        stem: normalizedStem,
        classId,
        subclass,
        classOptions: Array.from(new Set([classId, ...classOptions])),
        guidelineId,
        finalVowel: finalInfo.finalVowel,
        finalVowelLong: finalInfo.long,
        classBasis: "perfective-stem-shape",
        shapeSummary: cloneClassicalNahuatlLesson7Record(classShape),
        stemRelationship,
        stemRelationshipKind: stemRelationship?.relationshipKind || "independent-stem",
        variantStemOf: stemRelationship?.variantStemOf || "",
        variantStemOfUnmarked: stemRelationship?.variantStemOfUnmarked || "",
        optionalIrregularPerfectiveRecord: optionalIrregularRecord,
        optionalIrregularPerfectiveKind: optionalIrregularRecord?.irregularityKind || "",
        traditionalSpellingWarningRecord,
        traditionalSpellingWarningPresent: Boolean(traditionalSpellingWarningRecord),
        traditionalSpellingMisclassificationBlocked: Boolean(traditionalSpellingWarningRecord),
        hiddenTraditionalSpellingSound: traditionalSpellingWarningRecord?.hiddenSound || "",
        hiddenTraditionalSpellingSequence: traditionalSpellingWarningRecord?.hiddenSequence || "",
        classGuidelineAuthorityRecord: guidelineAuthorityRecord,
        classGuidelineWitnessPresent: Boolean(guidelineAuthorityRecord),
        classGuidelineRuleId: guidelineAuthorityRecord?.relationRuleId || "",
        classGuidelineDefaultClassId: guidelineAuthorityRecord?.defaultClassId || "",
        classGuidelineAllowedClassIds: guidelineAllowedClassIds,
        classGuidelineClassOptions: guidelineClassOptions,
        classGuidelineAlternativeClassIds: guidelineAuthorityRecord?.alternativeClassIds || [],
        classGuidelineSemanticCondition: guidelineAuthorityRecord?.conditionKind || "",
        classGuidelineExceptionKind: guidelineAuthorityRecord?.exceptionKind || "",
        classGuidelineSelectedClassAllowed: guidelineSelectedClassAllowed,
        classGuidelineContradictionBlocked: guidelineContradictionBlocked,
        classGuidelineContradictionReason: guidelineContradictionBlocked ? "explicit-class-not-authorized-by-canvas-guideline-witness" : "",
        higherLayerClassOverride,
        higherLayerClassOverrideApplies,
        classDeterminedByGeneralFormRule: Boolean(guidelineAuthorityRecord && guidelineAuthorityRecord.conditionKind !== "canvas-enumerated-class-d-membership" && !guidelineAuthorityRecord.exceptionKind),
        classDeterminedByLexicalException: Boolean(guidelineAuthorityRecord && (guidelineAuthorityRecord.conditionKind === "canvas-enumerated-class-d-membership" || guidelineAuthorityRecord.exceptionKind)),
        canvasExamplesAreWitnessesNotWhitelist: true,
        sourceAuthority: "Andrews transcription"
      };
    }
    function stripClassicalNahuatlLesson7FinalVowel(stem = "") {
      return normalizeClassicalNahuatlLesson7Stem(stem).replace(/[aeioāēīō]$/iu, "");
    }
    function trimClassicalNahuatlLesson7StemRightBoundary(value = "") {
      return String(value || "").replace(/-+$/u, "");
    }
    function doesClassicalNahuatlLesson7FinalCRepresentS(stem = "") {
      const shape = removeClassicalNahuatlLesson7Marks(normalizeClassicalNahuatlLesson7Stem(stem));
      return /c[ei]$/iu.test(shape);
    }
    function doesClassicalNahuatlLesson7RootContainSSound(root = "") {
      const shape = removeClassicalNahuatlLesson7Marks(root).toLowerCase();
      return /[sz]/u.test(shape) || /c(?=[ei])/u.test(shape);
    }
    function shortenClassicalNahuatlLesson7FinalLongVowel(value = "") {
      return String(value || "").replace(/[āēīōaeio]$/iu, match => ({
        ā: "a",
        ē: "e",
        ī: "i",
        ō: "o",
        a: "a",
        e: "e",
        i: "i",
        o: "o"
      })[match.toLowerCase()] || match);
    }
    function lengthenClassicalNahuatlLesson7FinalVowel(value = "") {
      return String(value || "").replace(/[aeioāēīō]$/iu, match => ({
        a: "ā",
        e: "ē",
        i: "ī",
        o: "ō",
        ā: "ā",
        ē: "ē",
        ī: "ī",
        ō: "ō"
      })[match.toLowerCase()] || match);
    }
    function getClassicalNahuatlLesson7ClassCTruncatedStem(value = "") {
      return normalizeClassicalNahuatlLesson7Stem(value).replace(/-?[aā]$/iu, "");
    }
    function isClassicalNahuatlLesson7SingularSubject(subject = "") {
      return normalizeClassicalNahuatlLesson7Subject(subject).endsWith("sg");
    }
    function buildClassicalNahuatlLesson7ImperfectiveShapeEligibilityFrame({
      stem = "",
      classProfile = null,
      mood = "indicative",
      tense = "present",
      subject = "3sg",
      aspect = "imperfective",
      perfectiveStem = ""
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const profile = classProfile || inferClassicalNahuatlLesson7ClassProfile(normalizedStem);
      const normalizedMood = normalizeClassicalNahuatlLesson7Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson7Tense(tense, normalizedMood);
      const normalizedSubject = normalizeClassicalNahuatlLesson7Subject(subject);
      const singularSubject = isClassicalNahuatlLesson7SingularSubject(normalizedSubject);
      const pluralSubject = normalizedSubject.endsWith("pl");
      const isNonpastOptative = normalizedMood === "optative" && normalizedTense === "nonpast";
      const isNonpastAdmonitive = normalizedMood === "admonitive" && normalizedTense === "nonpast";
      const isFutureIndicative = normalizedMood === "indicative" && normalizedTense === "future";
      const isPresentIndicative = normalizedMood === "indicative" && normalizedTense === "present";
      const baseStem = aspect === "perfective" ? perfectiveStem || normalizedStem : normalizedStem;
      let selectedStemVariant = baseStem;
      let selectedShape = aspect === "perfective" ? "perfective-shape" : "basic-imperfective-shape";
      let selectedShapeReason = "";
      let underlyingStemVariant = selectedStemVariant;
      let analyzedStemVariant = selectedStemVariant;
      let silentCarrier = "";
      let silentCarrierPreserved = false;
      let vowelLengthOperation = "preserve-source-vowel-length";
      let vowelLengthEnvironment = `${normalizedMood}:${normalizedTense}:${singularSubject ? "singular" : "plural"}`;
      const shapeActions = [CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.BLOCK_FREE_IMPERFECTIVE_SHAPE_SWITCH];
      const hostileRejectedStemVariants = [];
      const authorizedStemVariants = [selectedStemVariant];
      if (profile.classId === "C" && aspect === "imperfective") {
        const truncatedShort = getClassicalNahuatlLesson7ClassCTruncatedStem(normalizedStem);
        const truncatedLong = lengthenClassicalNahuatlLesson7FinalVowel(truncatedShort);
        const fullShort = shortenClassicalNahuatlLesson7FinalLongVowel(normalizedStem);
        if (fullShort !== normalizedStem && isPresentIndicative) {
          selectedStemVariant = fullShort;
          analyzedStemVariant = fullShort;
          underlyingStemVariant = normalizedStem;
          selectedShape = singularSubject ? "class-c-full-short-imperfective-vocable-final" : "class-c-full-short-imperfective-before-plural-0-h";
          selectedShapeReason = singularSubject ? "class-c-present-short-vowel-at-vocable-boundary" : "class-c-short-vowel-before-present-plural-0-h";
          vowelLengthOperation = "shorten-final-long-a-in-present-cell";
          shapeActions.push(CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.SELECT_TENSE_CONDITIONED_IMPERFECTIVE_SHAPE);
          hostileRejectedStemVariants.push(normalizedStem);
        } else if (truncatedShort && (isFutureIndicative || isNonpastOptative)) {
          const useShortTruncated = isNonpastOptative && singularSubject;
          selectedStemVariant = useShortTruncated ? truncatedShort : truncatedLong;
          analyzedStemVariant = selectedStemVariant;
          underlyingStemVariant = `${selectedStemVariant}-${CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO}`;
          silentCarrier = CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO;
          silentCarrierPreserved = true;
          selectedShape = isFutureIndicative ? "class-c-truncated-long-imperfective-before-future-z" : useShortTruncated ? "class-c-truncated-short-imperfective-vocable-final" : "class-c-truncated-long-imperfective-before-plural-0-h";
          selectedShapeReason = isFutureIndicative ? "class-c-future-truncated-long-stem-from-7.7-paradigm" : useShortTruncated ? "class-c-singular-nonpast-optative-short-vocable-final" : "class-c-plural-nonpast-optative-long-before-0-h";
          vowelLengthOperation = useShortTruncated ? "select-truncated-short-vowel-at-vocable-boundary" : "select-truncated-long-vowel-before-following-morph";
          shapeActions.push(CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.SELECT_TENSE_CONDITIONED_IMPERFECTIVE_SHAPE, CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.PRESERVE_SILENT_TRUNCATED_CARRIER);
          hostileRejectedStemVariants.push(normalizedStem, useShortTruncated ? truncatedLong : truncatedShort);
        }
      } else if (profile.classId === "D" && aspect === "imperfective") {
        const shortened = shortenClassicalNahuatlLesson7FinalLongVowel(normalizedStem);
        const shouldShorten = isPresentIndicative || isNonpastOptative && singularSubject;
        if (shortened !== normalizedStem && shouldShorten) {
          selectedStemVariant = shortened;
          analyzedStemVariant = shortened;
          underlyingStemVariant = shortened;
          selectedShape = isPresentIndicative ? pluralSubject ? "class-d-short-imperfective-before-plural-0-h" : "class-d-short-imperfective-vocable-final" : "class-d-short-imperfective-vocable-final";
          selectedShapeReason = `class-d-7.7-${normalizedMood}-${normalizedTense}-short-vowel-cell`;
          vowelLengthOperation = "shorten-class-d-final-long-a-in-selected-7.7-cell";
          shapeActions.push(CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.SELECT_TENSE_CONDITIONED_IMPERFECTIVE_SHAPE);
          hostileRejectedStemVariants.push(normalizedStem);
        }
      } else if (profile.classId === "A" && profile.subclass === "A-2") {
        const shortened = shortenClassicalNahuatlLesson7FinalLongVowel(baseStem);
        const shouldShorten = aspect === "imperfective" && isNonpastOptative && singularSubject || isPresentIndicative || isNonpastAdmonitive;
        if (shortened !== baseStem && shouldShorten) {
          selectedStemVariant = shortened;
          analyzedStemVariant = shortened;
          underlyingStemVariant = shortened;
          selectedShape = isNonpastAdmonitive ? "class-a2-short-shape-in-nonpast-admonitive" : isPresentIndicative && pluralSubject ? "class-a2-short-imperfective-before-plural-0-h" : "class-a2-short-imperfective-vocable-final";
          selectedShapeReason = isNonpastAdmonitive ? "class-a2-short-vowel-in-all-nonpast-admonitive" : isPresentIndicative && pluralSubject ? "class-a2-short-vowel-before-present-plural-0-h" : "class-a2-short-vowel-in-vocable-final-environment";
          vowelLengthOperation = isNonpastAdmonitive ? "shorten-class-a2-vowel-in-nonpast-admonitive" : "shorten-class-a2-vowel-at-zero-tense-boundary";
          shapeActions.push(CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.SELECT_TENSE_CONDITIONED_IMPERFECTIVE_SHAPE);
          hostileRejectedStemVariants.push(baseStem);
        }
      }
      if (!authorizedStemVariants.includes(selectedStemVariant)) {
        authorizedStemVariants[0] = selectedStemVariant;
      }
      return {
        kind: "classical-nahuatl-lesson7-imperfective-shape-eligibility-frame",
        lesson: "Andrews Lesson 7",
        section: "7.3.2",
        ruleLogicRole: "tense-conditioned-imperfective-shape-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson7ClassRules().filter(rule => rule.id === "cn-l7-73-imperfective-shape-counts" || rule.id === "cn-l7-73-cd-imperfective-shapes-tense-correlated" || rule.id === "cn-l7-73-class-c-truncated-nonpast-optative-singular" || rule.id === "cn-l7-73-a2-short-imperfective-admonitive" || rule.id === "cn-l7-73-class-c-truncated-silent-carrier"),
        stem: normalizedStem,
        classId: profile.classId,
        subclass: profile.subclass,
        mood: normalizedMood,
        tense: normalizedTense,
        subject: normalizedSubject,
        aspect,
        selectedStemVariant,
        selectedShape,
        selectedShapeReason,
        analyzedStemVariant,
        underlyingStemVariant,
        silentCarrier,
        silentCarrierPreserved,
        silentCarrierPrintedInLessonAnalysis: false,
        vowelLengthOperation,
        vowelLengthEnvironment,
        sourceFinalVowel: getClassicalNahuatlLesson7FinalVowelInfo(normalizedStem).finalVowel,
        selectedFinalVowel: getClassicalNahuatlLesson7FinalVowelInfo(selectedStemVariant).finalVowel,
        selectedFinalVowelLong: getClassicalNahuatlLesson7FinalVowelInfo(selectedStemVariant).long,
        shapeActions: Array.from(new Set(shapeActions)),
        freeShapeSwitchAllowed: false,
        hostileRejectedStemVariants: Array.from(new Set(hostileRejectedStemVariants.filter(Boolean))),
        authorizedStemVariants: Array.from(new Set(authorizedStemVariants.filter(Boolean))),
        authorizationStatus: selectedStemVariant ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function getClassicalNahuatlLesson7ExactPerfectiveStemOverride(stem = "", classId = "") {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const key = `${normalizeClassicalNahuatlLesson7ClassId(classId) || classId}|${normalizedStem}`;
      const override = CLASSICAL_NAHUATL_LESSON7_EXACT_PERFECTIVE_STEM_OVERRIDES[key];
      if (!override) {
        return null;
      }
      return {
        imperfectiveStem: normalizedStem,
        perfectiveStem: override.perfectiveStem,
        changeRule: override.changeRule
      };
    }
    function applyClassicalNahuatlLesson7ClassBChanges(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const finalDropped = trimClassicalNahuatlLesson7StemRightBoundary(stripClassicalNahuatlLesson7FinalVowel(normalizedStem));
      let perfective = finalDropped;
      let changeRule = "class-b-final-vowel-disappears";
      if (/qu$/iu.test(perfective)) {
        perfective = perfective.replace(/qu$/iu, "c");
        changeRule = "class-b-spelling-qu-to-c";
      } else if (/c$/iu.test(perfective) && doesClassicalNahuatlLesson7FinalCRepresentS(normalizedStem)) {
        perfective = perfective.replace(/c$/iu, "z");
        changeRule = "class-b-spelling-c-to-z";
      } else if (/hu$/iu.test(perfective)) {
        perfective = perfective.replace(/hu$/iu, "uh");
        changeRule = "class-b-w-change-hu-to-uh";
      } else if (/cu$/iu.test(perfective)) {
        perfective = perfective.replace(/cu$/iu, "uc");
        changeRule = "class-b-kw-change-cu-to-uc";
      } else if (/m$/iu.test(perfective)) {
        perfective = perfective.replace(/m$/iu, "n");
        changeRule = "class-b-m-to-n";
      } else if (/y$/iu.test(perfective)) {
        const rootContainsS = doesClassicalNahuatlLesson7RootContainSSound(perfective.replace(/y$/iu, ""));
        perfective = perfective.replace(/y$/iu, rootContainsS ? "z" : "x");
        changeRule = rootContainsS ? "class-b-y-to-s" : "class-b-y-to-x";
      }
      return {
        imperfectiveStem: normalizedStem,
        finalDropped,
        perfectiveStem: perfective,
        changeRule
      };
    }
    function getClassicalNahuatlLesson7ClassBPerfectiveCarrierFrame(stem = "", classProfile = null, perfective = null) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const profile = classProfile || inferClassicalNahuatlLesson7ClassProfile(normalizedStem);
      const perfectiveFrame = perfective || getClassicalNahuatlLesson7PerfectiveStem(normalizedStem, profile);
      const classActions = [CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.DETERMINE_BY_PERFECTIVE_STEM];
      if (profile.classId !== "B") {
        return {
          classActions,
          classBPerfectiveKind: "not-applicable",
          classBSilentCausativeCarrierPresent: false,
          classBSilentCausativeCarrier: "",
          classBUnderlyingPerfectiveStem: perfectiveFrame.perfectiveStem,
          classBAnalyzedPerfectiveStem: perfectiveFrame.perfectiveStem,
          classBAnalysisPrintsSilentCarrier: false,
          classBAnalysisOmissionPolicy: "not-applicable",
          classBObjectPronounDistinguishesMorphology: false,
          classBPhonologicalIdentityDoesNotEraseMorphology: false
        };
      }
      classActions.push(CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.DISTINGUISH_CLASS_B_KINDS);
      const silentCarrierRecord = getClassicalNahuatlLesson7ClassBSilentCausativeCarrierRecord(normalizedStem);
      const classBSilentCausativeCarrierPresent = Boolean(silentCarrierRecord);
      if (classBSilentCausativeCarrierPresent) {
        classActions.push(CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.REQUIRE_TYPE_ONE_CAUSATIVE_A_WITNESS, CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.PRESERVE_SILENT_CAUSATIVE_CARRIER, CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.BLOCK_PHONOLOGICAL_COLLAPSE);
      }
      return {
        classActions,
        classBPerfectiveKind: classBSilentCausativeCarrierPresent ? "silent-causative-carrier" : "final-vowel-disappears",
        classBSilentCausativeCarrierPresent,
        classBSilentCausativeCarrier: classBSilentCausativeCarrierPresent ? CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO : "",
        classBUnderlyingPerfectiveStem: classBSilentCausativeCarrierPresent ? `${perfectiveFrame.perfectiveStem}-${CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO}` : perfectiveFrame.perfectiveStem,
        classBAnalyzedPerfectiveStem: perfectiveFrame.perfectiveStem,
        classBAnalysisPrintsSilentCarrier: false,
        classBAnalysisOmissionPolicy: classBSilentCausativeCarrierPresent ? "silent-causative-carrier-not-printed-in-lessons" : "final-vowel-loss-printed-directly",
        classBSilentCausativeCarrierWitness: silentCarrierRecord,
        classBTypeOneCausativeWitness: silentCarrierRecord,
        classBTypeOneCausativeWitnessRequired: classBSilentCausativeCarrierPresent,
        classBObjectPronounDistinguishesMorphology: classBSilentCausativeCarrierPresent,
        classBPhonologicalIdentityDoesNotEraseMorphology: classBSilentCausativeCarrierPresent
      };
    }
    function getClassicalNahuatlLesson7PerfectiveStem(stem = "", classProfile = null) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const profile = classProfile || inferClassicalNahuatlLesson7ClassProfile(normalizedStem);
      const exactOverride = getClassicalNahuatlLesson7ExactPerfectiveStemOverride(normalizedStem, profile.classId);
      if (exactOverride) {
        return exactOverride;
      }
      const guidelinePerfectiveStem = profile.classGuidelineAuthorityRecord?.perfectiveStemsByClass?.[profile.classId];
      if (guidelinePerfectiveStem) {
        return {
          imperfectiveStem: normalizedStem,
          perfectiveStem: guidelinePerfectiveStem,
          changeRule: `${profile.classGuidelineRuleId || "cn-l7-76-guideline"}-exact-perfective`,
          classGuidelineAuthorityRecord: cloneClassicalNahuatlLesson7Record(profile.classGuidelineAuthorityRecord)
        };
      }
      if (profile.classId === "B" && profile.traditionalSpellingWarningRecord?.perfectiveStem) {
        return {
          imperfectiveStem: normalizedStem,
          perfectiveStem: profile.traditionalSpellingWarningRecord.perfectiveStem,
          changeRule: profile.traditionalSpellingWarningRecord.changeRule,
          traditionalSpellingWarningRecord: cloneClassicalNahuatlLesson7Record(profile.traditionalSpellingWarningRecord)
        };
      }
      if (profile.classId === "B") {
        return applyClassicalNahuatlLesson7ClassBChanges(normalizedStem);
      }
      if (profile.classId === "C") {
        return {
          imperfectiveStem: normalizedStem,
          perfectiveStem: normalizedStem.replace(/[aā]$/iu, "h"),
          changeRule: "class-c-final-a-replaced-by-h"
        };
      }
      if (profile.classId === "D") {
        return {
          imperfectiveStem: normalizedStem,
          perfectiveStem: shortenClassicalNahuatlLesson7FinalLongVowel(normalizedStem) + "h",
          changeRule: "class-d-final-long-a-adds-h-and-shortens"
        };
      }
      return {
        imperfectiveStem: normalizedStem,
        perfectiveStem: normalizedStem,
        changeRule: profile.subclass === "A-2" ? "class-a2-same-or-short-vowel-alternant" : "class-a1-same-shape"
      };
    }
    function buildClassicalNahuatlLesson11OptionalIrregularPerfectiveFrame({
      stem = "",
      classProfile = null,
      perfective = null,
      subject = "3sg",
      mood = "indicative",
      tense = "present",
      aspect = ""
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const profile = classProfile || inferClassicalNahuatlLesson7ClassProfile(normalizedStem);
      const record = profile.optionalIrregularPerfectiveRecord || getClassicalNahuatlLesson11OptionalIrregularPerfectiveRecord(normalizedStem);
      const normalizedSubject = normalizeClassicalNahuatlLesson7Subject(subject);
      const normalizedMood = normalizeClassicalNahuatlLesson7Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson7Tense(tense, normalizedMood);
      const regularPerfectiveStem = perfective?.perfectiveStem || record?.regularPerfectiveStem || "";
      const conditionPassed = Boolean(record && isClassicalNahuatlLesson11OptionalIrregularEnvironment({
        subject: normalizedSubject,
        mood: normalizedMood,
        tense: normalizedTense,
        aspect
      }));
      const optionalIrregularStemVariants = conditionPassed ? [record.optionalIrregularPerfectiveStem] : [];
      return {
        kind: "classical-nahuatl-lesson11-optional-irregular-perfective-frame",
        lesson: "Andrews Lesson 11",
        section: "11.3.2",
        ruleLogicRole: "conditioned-optional-irregular-perfective-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson11OptionalIrregularPerfectiveRules(),
        stem: normalizedStem,
        classId: profile.classId,
        subject: normalizedSubject,
        mood: normalizedMood,
        tense: normalizedTense,
        aspect,
        regularPerfectiveStem,
        optionalIrregularStemVariants,
        optionalIrregularPerfectiveStem: record?.optionalIrregularPerfectiveStem || "",
        authorizedStemVariants: Array.from(new Set([regularPerfectiveStem, ...optionalIrregularStemVariants].filter(Boolean))),
        optionalIrregularAuthorized: conditionPassed,
        optionalIrregularAuthorizationStatus: conditionPassed ? "authorized" : record ? "blocked" : "not-applicable",
        regularPerfectiveRemainsLegal: Boolean(record),
        preference: conditionPassed ? record.preference || "" : "",
        condition: "singular subject plus preterit tense or admonitive mood",
        conditionPassed,
        blockedReason: conditionPassed ? "" : !record ? "no-optional-irregular-record" : "outside-singular-preterit-or-admonitive",
        evidenceTagId: record?.tagId || "",
        evidenceRuleIds: record ? [record.relationRuleId, record.conditionRuleId, record.regularRetainedRuleId].filter(Boolean) : [],
        exactWitness: record?.exactWitness || "",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function normalizeClassicalNahuatlLesson7Mood(value = "") {
      const normalizer = getClassicalNahuatlLesson7RuntimeTarget()?.normalizeClassicalNahuatlLesson5Mood;
      return typeof normalizer === "function" ? normalizer(value) : normalizeClassicalNahuatlLesson7Token(value || "indicative") || "indicative";
    }
    function normalizeClassicalNahuatlLesson7Tense(value = "", mood = "indicative") {
      const normalizedMood = normalizeClassicalNahuatlLesson7Mood(mood);
      const rawTense = normalizeClassicalNahuatlLesson7Token(value || "");
      const borrowedOptativeTense = {
        futuro: "future",
        future: "future",
        preterito: "preterit",
        "pretérito": "preterit",
        preterit: "preterit"
      }[rawTense] || "";
      if (normalizedMood === "optative" && borrowedOptativeTense) {
        return borrowedOptativeTense;
      }
      const normalizer = getClassicalNahuatlLesson7RuntimeTarget()?.normalizeClassicalNahuatlLesson5Tense;
      return typeof normalizer === "function" ? normalizer(value, normalizedMood) : normalizeClassicalNahuatlLesson7Token(value || (normalizedMood === "indicative" ? "present" : "nonpast"));
    }
    function getClassicalNahuatlLesson9BorrowedIndicativeFormUse({
      mood = "indicative",
      tense = "present"
    } = {}) {
      const normalizedMood = normalizeClassicalNahuatlLesson7Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson7Tense(tense, normalizedMood);
      const borrowed = normalizedMood === "optative" && ["future", "preterit"].includes(normalizedTense);
      return {
        borrowed,
        semanticMood: normalizedMood,
        semanticTense: normalizedTense,
        formMood: borrowed ? "indicative" : normalizedMood,
        formTense: normalizedTense,
        borrowedFormRule: borrowed ? normalizedTense === "future" ? "lesson-9.2-future-optative-borrows-future-indicative-form-by-use" : "lesson-9.2-preterit-optative-borrows-preterit-indicative-form-by-use" : "",
        antecessiveObligatory: borrowed && normalizedTense === "preterit"
      };
    }
    function getClassicalNahuatlLesson7AspectForTense({
      mood = "indicative",
      tense = "present"
    } = {}) {
      const normalizedMood = normalizeClassicalNahuatlLesson7Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson7Tense(tense, normalizedMood);
      if (normalizedTense === "preterit" || normalizedTense === "distant-past" || normalizedMood === "admonitive") {
        return "perfective";
      }
      return "imperfective";
    }
    function normalizeClassicalNahuatlLesson77PredicateCarrier(value = "") {
      return String(value || "").trim().replace(/\s+/gu, "").replace(/Ø/gu, "0").replace(/\u2395/gu, "⎕");
    }
    function getClassicalNahuatlLesson77PredicateRuleId(classProfile = {}) {
      if (classProfile.classId === "A" && classProfile.subclass === "A-2") {
        return "cn-l7-77-class-a2-predicate-table-cells";
      }
      if (classProfile.classId === "A") {
        return "cn-l7-77-class-a-predicate-shapes";
      }
      if (classProfile.classId === "B") {
        return "cn-l7-77-class-b-predicate-shapes";
      }
      if (classProfile.classId === "C") {
        return "cn-l7-77-class-c-predicate-table-cells";
      }
      if (classProfile.classId === "D") {
        return "cn-l7-77-class-d-predicate-table-cells";
      }
      return "cn-l7-77-core-tense-constituents";
    }
    function getClassicalNahuatlLesson77PredicateTableSide({
      mood = "indicative"
    } = {}) {
      const normalizedMood = normalizeClassicalNahuatlLesson7Mood(mood);
      if (normalizedMood === "indicative") {
        return "indicative";
      }
      if (normalizedMood === "optative") {
        return "optative";
      }
      if (normalizedMood === "admonitive") {
        return "admonitive";
      }
      return normalizedMood || "unknown";
    }
    function buildClassicalNahuatlLesson77PredicateTableFrame({
      stem = "",
      classProfile = null,
      stemVariantFrame = null,
      tenseFrame = null,
      mood = "indicative",
      tense = "present",
      subject = "3sg",
      options = {}
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const profile = classProfile || inferClassicalNahuatlLesson7ClassProfile(normalizedStem, options);
      const normalizedMood = normalizeClassicalNahuatlLesson7Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson7Tense(tense, normalizedMood);
      const normalizedSubject = normalizeClassicalNahuatlLesson7Subject(subject);
      const expectedStemVariant = stemVariantFrame?.stemVariant || normalizedStem;
      const expectedTenseMorph = tenseFrame?.tns || "0";
      const expectedPredicateCarrier = `${wrapClassicalNahuatlLesson7Stem(expectedStemVariant)}${expectedTenseMorph}+`;
      const predicateRules = getClassicalNahuatlLesson7PredicateRules();
      const ruleId = getClassicalNahuatlLesson77PredicateRuleId(profile);
      const rule = predicateRules.find(entry => entry.id === ruleId) || predicateRules.find(entry => entry.id === "cn-l7-77-core-tense-constituents");
      const requestedStemVariant = normalizeClassicalNahuatlLesson7Stem(options.predicateStemVariantOverride || options.requestedPredicateStemVariant || options.hostilePredicateStemVariant || "");
      const requestedTenseMorph = String(options.predicateTenseMorphOverride || options.requestedPredicateTenseMorph || options.hostilePredicateTenseMorph || "").trim();
      const requestedPredicateCarrier = String(options.predicateCarrierOverride || options.requestedPredicateCarrier || options.hostilePredicateCarrier || "").trim();
      const expectedCarrierKey = normalizeClassicalNahuatlLesson77PredicateCarrier(expectedPredicateCarrier);
      const requestedCarrierKey = normalizeClassicalNahuatlLesson77PredicateCarrier(requestedPredicateCarrier);
      const stemContradiction = Boolean(requestedStemVariant && requestedStemVariant !== expectedStemVariant);
      const tenseContradiction = Boolean(requestedTenseMorph && requestedTenseMorph !== expectedTenseMorph);
      const carrierContradiction = Boolean(requestedCarrierKey && requestedCarrierKey !== expectedCarrierKey);
      const contradictionBlocked = stemContradiction || tenseContradiction || carrierContradiction;
      const hostileRejectedPredicateCarriers = [...(stemVariantFrame?.hostileRejectedStemVariants || []).map(variant => `${wrapClassicalNahuatlLesson7Stem(variant)}${expectedTenseMorph}+`), ...(requestedPredicateCarrier && carrierContradiction ? [requestedPredicateCarrier] : []), ...(requestedStemVariant && stemContradiction ? [`${wrapClassicalNahuatlLesson7Stem(requestedStemVariant)}${expectedTenseMorph}+`] : []), ...(requestedTenseMorph && tenseContradiction ? [`${wrapClassicalNahuatlLesson7Stem(expectedStemVariant)}${requestedTenseMorph}+`] : [])];
      return {
        kind: "classical-nahuatl-lesson7-predicate-table-frame",
        lesson: "Andrews Lesson 7",
        section: "7.7",
        ruleLogicRole: "predicate-table-cell-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRef: cloneClassicalNahuatlLesson7Rule(rule),
        ruleRefs: [predicateRules.find(entry => entry.id === "cn-l7-77-core-tense-constituents"), rule].filter(Boolean).map(cloneClassicalNahuatlLesson7Rule),
        classId: profile.classId,
        subclass: profile.subclass,
        mood: normalizedMood,
        tense: normalizedTense,
        subject: normalizedSubject,
        tableSide: getClassicalNahuatlLesson77PredicateTableSide({
          mood: normalizedMood
        }),
        tableCell: `${profile.classId || "unknown"}${profile.subclass ? `:${profile.subclass}` : ""}:${normalizedMood}:${normalizedTense}`,
        expectedStemVariant,
        expectedTenseMorph,
        expectedPredicateCarrier,
        predicateConstituentOrder: ["core", "tense"],
        predicateActions: Array.from(new Set([CLASSICAL_NAHUATL_LESSON7_PREDICATE_ACTIONS.SELECT_CANVAS_TABLE_CELL, CLASSICAL_NAHUATL_LESSON7_PREDICATE_ACTIONS.REQUIRE_CORE_BEFORE_TENSE, CLASSICAL_NAHUATL_LESSON7_PREDICATE_ACTIONS.CARRY_TABLE_CELL_TO_SELECTED_OUTPUT, ...(contradictionBlocked ? [CLASSICAL_NAHUATL_LESSON7_PREDICATE_ACTIONS.BLOCK_HOSTILE_PREDICATE_CARRIER] : [])])),
        requestedStemVariant,
        requestedTenseMorph,
        requestedPredicateCarrier,
        hostileRejectedPredicateCarriers: Array.from(new Set(hostileRejectedPredicateCarriers.filter(Boolean))),
        predicateCarrierContradictionBlocked: contradictionBlocked,
        predicateCarrierContradictionReason: contradictionBlocked ? "requested-predicate-carrier-not-authorized-by-canvas-7.7-table" : "",
        authorizationStatus: contradictionBlocked ? "blocked" : "authorized",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function getClassicalNahuatlLesson7StemVariant({
      stem = "",
      classProfile = null,
      mood = "indicative",
      tense = "present",
      subject = "3sg"
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const profile = classProfile || inferClassicalNahuatlLesson7ClassProfile(normalizedStem);
      const perfective = getClassicalNahuatlLesson7PerfectiveStem(normalizedStem, profile);
      const classBPerfectiveCarrierFrame = getClassicalNahuatlLesson7ClassBPerfectiveCarrierFrame(normalizedStem, profile, perfective);
      const selectedPerfectiveStem = classBPerfectiveCarrierFrame.classBUnderlyingPerfectiveStem || perfective.perfectiveStem;
      const aspect = getClassicalNahuatlLesson7AspectForTense({
        mood,
        tense
      });
      const imperfectiveShapeEligibilityFrame = buildClassicalNahuatlLesson7ImperfectiveShapeEligibilityFrame({
        stem: normalizedStem,
        classProfile: profile,
        mood,
        tense,
        subject,
        aspect,
        perfectiveStem: selectedPerfectiveStem
      });
      const stemVariant = imperfectiveShapeEligibilityFrame.selectedStemVariant || (aspect === "perfective" ? selectedPerfectiveStem : normalizedStem);
      const optionalIrregularPerfectiveFrame = buildClassicalNahuatlLesson11OptionalIrregularPerfectiveFrame({
        stem: normalizedStem,
        classProfile: profile,
        perfective: {
          ...perfective,
          perfectiveStem: selectedPerfectiveStem
        },
        subject,
        mood,
        tense,
        aspect
      });
      return {
        kind: "classical-nahuatl-lesson7-stem-variant-frame",
        stem: normalizedStem,
        stemVariant,
        aspect,
        classId: profile.classId,
        subclass: profile.subclass,
        changeRule: aspect === "perfective" ? perfective.changeRule : "imperfective-basic-shape",
        imperfectiveStem: normalizedStem,
        perfectiveStem: selectedPerfectiveStem,
        analyzedPerfectiveStem: classBPerfectiveCarrierFrame.classBAnalyzedPerfectiveStem || perfective.perfectiveStem,
        classBPerfectiveKind: classBPerfectiveCarrierFrame.classBPerfectiveKind,
        classBSilentCausativeCarrierPresent: classBPerfectiveCarrierFrame.classBSilentCausativeCarrierPresent,
        classBSilentCausativeCarrier: classBPerfectiveCarrierFrame.classBSilentCausativeCarrier,
        classBUnderlyingPerfectiveStem: classBPerfectiveCarrierFrame.classBUnderlyingPerfectiveStem,
        classBAnalyzedPerfectiveStem: classBPerfectiveCarrierFrame.classBAnalyzedPerfectiveStem,
        classBAnalysisPrintsSilentCarrier: classBPerfectiveCarrierFrame.classBAnalysisPrintsSilentCarrier,
        classBAnalysisOmissionPolicy: classBPerfectiveCarrierFrame.classBAnalysisOmissionPolicy,
        stemRelationship: cloneClassicalNahuatlLesson7Record(profile.stemRelationship),
        stemRelationshipKind: profile.stemRelationshipKind,
        variantStemOf: profile.variantStemOf,
        optionalIrregularPerfectiveFrame,
        optionalIrregularStemVariants: optionalIrregularPerfectiveFrame.optionalIrregularStemVariants,
        authorizedStemVariants: aspect === "perfective" ? Array.from(new Set([stemVariant, ...(optionalIrregularPerfectiveFrame.authorizedStemVariants || [])].filter(Boolean))) : imperfectiveShapeEligibilityFrame.authorizedStemVariants,
        imperfectiveShapeEligibilityFrame,
        selectedImperfectiveShape: imperfectiveShapeEligibilityFrame.selectedShape,
        selectedImperfectiveShapeReason: imperfectiveShapeEligibilityFrame.selectedShapeReason,
        shapeActions: imperfectiveShapeEligibilityFrame.shapeActions,
        freeShapeSwitchAllowed: imperfectiveShapeEligibilityFrame.freeShapeSwitchAllowed,
        hostileRejectedStemVariants: imperfectiveShapeEligibilityFrame.hostileRejectedStemVariants,
        analyzedStemVariant: imperfectiveShapeEligibilityFrame.analyzedStemVariant,
        underlyingStemVariant: imperfectiveShapeEligibilityFrame.underlyingStemVariant,
        silentTruncatedCarrier: imperfectiveShapeEligibilityFrame.silentCarrier,
        silentTruncatedCarrierPreserved: imperfectiveShapeEligibilityFrame.silentCarrierPreserved,
        silentTruncatedCarrierPrintedInLessonAnalysis: imperfectiveShapeEligibilityFrame.silentCarrierPrintedInLessonAnalysis,
        vowelLengthOperation: imperfectiveShapeEligibilityFrame.vowelLengthOperation,
        vowelLengthEnvironment: imperfectiveShapeEligibilityFrame.vowelLengthEnvironment,
        sourceFinalVowel: imperfectiveShapeEligibilityFrame.sourceFinalVowel,
        selectedFinalVowel: imperfectiveShapeEligibilityFrame.selectedFinalVowel,
        selectedFinalVowelLong: imperfectiveShapeEligibilityFrame.selectedFinalVowelLong,
        optionalIrregularAuthorized: optionalIrregularPerfectiveFrame.optionalIrregularAuthorized,
        regularPerfectiveRemainsLegal: optionalIrregularPerfectiveFrame.regularPerfectiveRemainsLegal,
        sourceAuthority: "Andrews transcription"
      };
    }
    function buildClassicalNahuatlLesson7VerbstemStructureRuleFrame(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const internalMorphs = normalizedStem.split(/-/u).filter(Boolean);
      const isPolymorphemic = internalMorphs.length > 1;
      const unknownButAuthorizedMorphs = getClassicalNahuatlLesson7UnknownInternalMorphRecords(normalizedStem);
      const unknownMorphKeys = new Set(unknownButAuthorizedMorphs.map(record => getClassicalNahuatlLesson7StructureLookupKey(record.morph || "")).filter(Boolean));
      const contrastiveBoundaryRecord = getClassicalNahuatlLesson7ContrastiveBoundaryRecord(normalizedStem);
      const internalMorphFrames = internalMorphs.map(morph => {
        const morphKey = getClassicalNahuatlLesson7StructureLookupKey(morph);
        const unknownRecord = unknownButAuthorizedMorphs.find(record => getClassicalNahuatlLesson7StructureLookupKey(record.morph || "") === morphKey) || null;
        return {
          morph,
          role: "position-internal-constituent",
          formulaSlotAuthorized: false,
          glossAuthority: unknownRecord ? "unknown-but-morphologically-authorized" : "unified-stem-translation-only",
          meaningKnown: unknownRecord ? false : null,
          existenceEstablished: unknownRecord ? unknownRecord.existenceEstablished === true : true,
          inventedGlossAllowed: false,
          exactWitness: unknownRecord?.exactWitness || ""
        };
      });
      const structureActions = [CLASSICAL_NAHUATL_LESSON7_STRUCTURE_ACTIONS.KEEP_INSIDE_VERBSTEM];
      if (isPolymorphemic) {
        structureActions.push(CLASSICAL_NAHUATL_LESSON7_STRUCTURE_ACTIONS.BLOCK_FORMULA_SLOT_SPLIT);
      }
      if (unknownButAuthorizedMorphs.length) {
        structureActions.push(CLASSICAL_NAHUATL_LESSON7_STRUCTURE_ACTIONS.AUTHORIZE_UNKNOWN_WITHOUT_GLOSS);
      }
      if (contrastiveBoundaryRecord) {
        structureActions.push(CLASSICAL_NAHUATL_LESSON7_STRUCTURE_ACTIONS.PRESERVE_CONTRASTIVE_BOUNDARIES);
      }
      return {
        kind: "classical-nahuatl-lesson7-verbstem-structure-rule-frame",
        lesson: "Andrews Lesson 7",
        section: "7.1",
        ruleLogicRole: "verbstem-structure-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson7StructureRules(),
        stem: normalizedStem,
        morphology: isPolymorphemic ? "polymorphemic" : "monomorphemic",
        structureActions,
        internalMorphs,
        internalMorphFrames,
        internalMorphBoundary: "-",
        internalMorphBoundaryScope: isPolymorphemic ? "position-internal" : "none",
        stemBoundary: "()",
        stemAsFormulaPredicate: normalizedStem,
        internalMorphsRemainInsideVerbstem: true,
        internalMorphsAreFormulaSlots: false,
        internalMorphsBecomeFormulaSlots: false,
        formulaSlotSplitAllowed: false,
        formulaSlotMaterialFromInternalMorphs: [],
        internalMorphsGlossedIndividually: false,
        internalMorphGlossPolicy: "do-not-gloss-individually",
        stemTranslationPolicy: "unified-whole",
        stemTranslationUnit: "whole-verbstem",
        inventedInternalMorphGlossAllowed: false,
        inventedInternalMorphGlosses: [],
        unknownButAuthorizedMorphs,
        unknownInternalMorphKeys: Array.from(unknownMorphKeys),
        unknownMeaningDoesNotBlockStem: unknownButAuthorizedMorphs.length > 0,
        unknownInternalMorphsBlockStem: false,
        contrastiveAnalysisBoundaryJustified: Boolean(contrastiveBoundaryRecord),
        contrastiveBoundaryRecord,
        morphBoundaryJustification: contrastiveBoundaryRecord ? "contrastive-analysis" : isPolymorphemic ? "position-internal-constituents" : "not-applicable",
        authorizationStatus: normalizedStem ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function buildClassicalNahuatlLesson7CitationRuleFrame(stem = "", options = {}) {
      const citationValenceFrame = buildClassicalNahuatlLesson7CitationValenceFrame(stem, options);
      const authorized = (citationValenceFrame.valence === "intransitive" || Boolean(citationValenceFrame.marker)) && citationValenceFrame.citationUsesFormulaSlotPlaceholder !== true;
      return {
        ...citationValenceFrame,
        kind: "classical-nahuatl-lesson7-citation-rule-frame",
        lesson: "Andrews Lesson 7",
        section: "7.2",
        ruleLogicRole: "verbcore-citation-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson7CitationRules(),
        isolatedVerbstemCitationAllowed: false,
        authorizationStatus: authorized ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function buildClassicalNahuatlLesson7VerbstemClassRuleFrame(stem = "", options = {}) {
      const classProfile = inferClassicalNahuatlLesson7ClassProfile(stem, options);
      const perfective = getClassicalNahuatlLesson7PerfectiveStem(stem, classProfile);
      const classBPerfectiveCarrierFrame = getClassicalNahuatlLesson7ClassBPerfectiveCarrierFrame(stem, classProfile, perfective);
      const hasOptionalIrregularPerfective = Boolean(classProfile.optionalIrregularPerfectiveRecord);
      const traditionalSpellingWarningRecord = classProfile.traditionalSpellingWarningRecord;
      const classGuidelineAuthorityRecord = classProfile.classGuidelineAuthorityRecord;
      const classActions = [...classBPerfectiveCarrierFrame.classActions, ...(traditionalSpellingWarningRecord ? [CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.APPLY_TRADITIONAL_SPELLING_WARNING, CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.BLOCK_TRADITIONAL_SPELLING_CLASS_C_MISREAD, CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.PRESERVE_HIDDEN_W_Y_CLASS_B_CHANGE] : []), ...(classGuidelineAuthorityRecord ? [CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.APPLY_GUIDELINE_WITNESS] : []), ...((classProfile.classGuidelineClassOptions || []).length > 1 ? [CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.PRESERVE_GUIDELINE_CLASS_OPTIONS] : []), ...(classProfile.classGuidelineSemanticCondition ? [CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.PRESERVE_GUIDELINE_SEMANTIC_CONDITION] : []), ...(classProfile.classGuidelineContradictionBlocked ? [CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS.BLOCK_CONTRADICTORY_GUIDELINE_CLASS] : [])];
      const ruleRefs = [...getClassicalNahuatlLesson7ClassRules(), ...getClassicalNahuatlLesson7VariableClassRules(), ...getClassicalNahuatlLesson7GuidelineRules(), ...(classProfile.classId === "B" ? getClassicalNahuatlLesson7ClassBChangeRules() : []), ...(classBPerfectiveCarrierFrame.classBSilentCausativeCarrierPresent ? getClassicalNahuatlLesson24TypeOneCausativeRules() : []), ...(hasOptionalIrregularPerfective ? getClassicalNahuatlLesson11OptionalIrregularPerfectiveRules() : [])];
      return {
        kind: "classical-nahuatl-lesson7-verbstem-class-rule-frame",
        lesson: "Andrews Lesson 7",
        section: "7.3-7.6",
        ruleLogicRole: "verbstem-class-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs,
        classProfile,
        stem: classProfile.stem,
        imperfectiveStem: perfective.imperfectiveStem,
        perfectiveStem: classBPerfectiveCarrierFrame.classBUnderlyingPerfectiveStem || perfective.perfectiveStem,
        analyzedPerfectiveStem: classBPerfectiveCarrierFrame.classBAnalyzedPerfectiveStem || perfective.perfectiveStem,
        classId: classProfile.classId,
        subclass: classProfile.subclass,
        classOptions: classProfile.classOptions,
        classActions: Array.from(new Set(classActions)),
        guidelineId: classProfile.guidelineId,
        perfectiveChangeRule: perfective.changeRule,
        shapeSummary: cloneClassicalNahuatlLesson7Record(classProfile.shapeSummary),
        imperfectiveShapeCount: classProfile.shapeSummary?.imperfectiveShapeCount || "",
        perfectiveShapeCount: classProfile.shapeSummary?.perfectiveShapeCount || "",
        totalShapeCount: classProfile.shapeSummary?.totalShapeCount || "",
        classBPerfectiveKind: classBPerfectiveCarrierFrame.classBPerfectiveKind,
        classBSilentCausativeCarrierPresent: classBPerfectiveCarrierFrame.classBSilentCausativeCarrierPresent,
        classBSilentCausativeCarrier: classBPerfectiveCarrierFrame.classBSilentCausativeCarrier,
        classBUnderlyingPerfectiveStem: classBPerfectiveCarrierFrame.classBUnderlyingPerfectiveStem,
        classBAnalyzedPerfectiveStem: classBPerfectiveCarrierFrame.classBAnalyzedPerfectiveStem,
        classBAnalysisPrintsSilentCarrier: classBPerfectiveCarrierFrame.classBAnalysisPrintsSilentCarrier,
        classBAnalysisOmissionPolicy: classBPerfectiveCarrierFrame.classBAnalysisOmissionPolicy,
        classBSilentCausativeCarrierWitness: cloneClassicalNahuatlLesson7Record(classBPerfectiveCarrierFrame.classBSilentCausativeCarrierWitness),
        classBTypeOneCausativeWitness: cloneClassicalNahuatlLesson7Record(classBPerfectiveCarrierFrame.classBTypeOneCausativeWitness),
        classBTypeOneCausativeWitnessRequired: classBPerfectiveCarrierFrame.classBTypeOneCausativeWitnessRequired === true,
        classBObjectPronounDistinguishesMorphology: classBPerfectiveCarrierFrame.classBObjectPronounDistinguishesMorphology,
        classBPhonologicalIdentityDoesNotEraseMorphology: classBPerfectiveCarrierFrame.classBPhonologicalIdentityDoesNotEraseMorphology,
        stemRelationship: cloneClassicalNahuatlLesson7Record(classProfile.stemRelationship),
        stemRelationshipKind: classProfile.stemRelationshipKind,
        variantStemOf: classProfile.variantStemOf,
        variantStemOfUnmarked: classProfile.variantStemOfUnmarked,
        optionalIrregularPerfectiveRecord: cloneClassicalNahuatlLesson7Record(classProfile.optionalIrregularPerfectiveRecord),
        optionalIrregularPerfectiveKind: classProfile.optionalIrregularPerfectiveKind,
        traditionalSpellingWarningRecord: cloneClassicalNahuatlLesson7Record(traditionalSpellingWarningRecord),
        traditionalSpellingWarningPresent: Boolean(traditionalSpellingWarningRecord),
        traditionalSpellingMisclassificationBlocked: Boolean(traditionalSpellingWarningRecord),
        traditionalSpellingBlocksClassCMisread: Boolean(traditionalSpellingWarningRecord),
        hiddenTraditionalSpellingSound: traditionalSpellingWarningRecord?.hiddenSound || "",
        hiddenTraditionalSpellingSequence: traditionalSpellingWarningRecord?.hiddenSequence || "",
        traditionalSpellingPerfectiveStem: traditionalSpellingWarningRecord?.perfectiveStem || "",
        traditionalSpellingChangeRule: traditionalSpellingWarningRecord?.changeRule || "",
        classGuidelineAuthorityRecord: cloneClassicalNahuatlLesson7Record(classGuidelineAuthorityRecord),
        classGuidelineWitnessPresent: Boolean(classGuidelineAuthorityRecord),
        classGuidelineRuleId: classProfile.classGuidelineRuleId,
        classGuidelineExactWitness: classGuidelineAuthorityRecord?.exactWitness || "",
        classGuidelineLineStart: classGuidelineAuthorityRecord?.lineStart || 0,
        classGuidelineLineEnd: classGuidelineAuthorityRecord?.lineEnd || 0,
        classGuidelineDefaultClassId: classProfile.classGuidelineDefaultClassId,
        classGuidelineAllowedClassIds: classProfile.classGuidelineAllowedClassIds,
        classGuidelineClassOptions: classProfile.classGuidelineClassOptions,
        classGuidelineAlternativeClassIds: classProfile.classGuidelineAlternativeClassIds,
        classGuidelineSemanticCondition: classProfile.classGuidelineSemanticCondition,
        classGuidelineExceptionKind: classProfile.classGuidelineExceptionKind,
        classGuidelineSelectedClassAllowed: classProfile.classGuidelineSelectedClassAllowed,
        classGuidelineContradictionBlocked: classProfile.classGuidelineContradictionBlocked,
        classGuidelineContradictionReason: classProfile.classGuidelineContradictionReason,
        classGuidelinePerfectiveStem: classGuidelineAuthorityRecord?.perfectiveStemsByClass?.[classProfile.classId] || "",
        authorizationStatus: classProfile.classId && !classProfile.classGuidelineContradictionBlocked ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function buildClassicalNahuatlLesson7PredicateFormationRuleFrame(stem = "", options = {}) {
      const mood = normalizeClassicalNahuatlLesson7Mood(options.mood || options.sentenceMood || "");
      const tense = normalizeClassicalNahuatlLesson7Tense(options.tense || options.tenseKey || "", mood);
      const borrowedIndicativeFormUse = getClassicalNahuatlLesson9BorrowedIndicativeFormUse({
        mood,
        tense
      });
      const formMood = borrowedIndicativeFormUse.formMood;
      const formTense = borrowedIndicativeFormUse.formTense;
      const subject = normalizeClassicalNahuatlLesson7Subject(options.subject || options.subjectPerson || options.subj || "");
      const classProfile = options.classProfile || inferClassicalNahuatlLesson7ClassProfile(stem, options);
      const stemVariantFrame = getClassicalNahuatlLesson7StemVariant({
        stem,
        classProfile,
        mood: formMood,
        tense: formTense,
        subject
      });
      const optionalIrregularActive = stemVariantFrame.optionalIrregularAuthorized === true;
      const tenseBuilder = getClassicalNahuatlLesson7RuntimeTarget()?.getClassicalNahuatlLesson5TenseFrame;
      const tenseFrame = typeof tenseBuilder === "function" ? tenseBuilder({
        mood: formMood,
        tense: formTense,
        verbClass: classProfile.classId
      }) : {
        kind: "classical-nahuatl-lesson5-tense-frame",
        mood: formMood,
        tense: formTense,
        tns: "0"
      };
      const predicateTableFrame = buildClassicalNahuatlLesson77PredicateTableFrame({
        stem,
        classProfile,
        stemVariantFrame,
        tenseFrame,
        mood: formMood,
        tense: formTense,
        subject,
        options
      });
      return {
        kind: "classical-nahuatl-lesson7-predicate-formation-rule-frame",
        lesson: "Andrews Lesson 7",
        section: "7.7",
        ruleLogicRole: "core-plus-tense-predicate-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: [...getClassicalNahuatlLesson7PredicateRules(), ...(stemVariantFrame.imperfectiveShapeEligibilityFrame?.ruleRefs || []), ...(predicateTableFrame.ruleRefs || []), ...(stemVariantFrame.optionalIrregularPerfectiveFrame?.regularPerfectiveRemainsLegal ? getClassicalNahuatlLesson11OptionalIrregularPerfectiveRules() : [])],
        consumesPriorLesson: "Andrews Lesson 5",
        stem: normalizeClassicalNahuatlLesson7Stem(stem),
        classId: classProfile.classId,
        subclass: classProfile.subclass,
        subject,
        mood,
        tense,
        borrowedIndicativeForm: borrowedIndicativeFormUse.borrowed,
        borrowedIndicativeFormRule: borrowedIndicativeFormUse.borrowedFormRule,
        formMood,
        formTense,
        antecessiveObligatoryForBorrowedPreteritOptative: borrowedIndicativeFormUse.antecessiveObligatory,
        aspect: stemVariantFrame.aspect,
        stemVariant: stemVariantFrame.stemVariant,
        stemVariantFrame,
        imperfectiveShapeEligibilityFrame: stemVariantFrame.imperfectiveShapeEligibilityFrame,
        selectedImperfectiveShape: stemVariantFrame.selectedImperfectiveShape,
        selectedImperfectiveShapeReason: stemVariantFrame.selectedImperfectiveShapeReason,
        shapeActions: stemVariantFrame.shapeActions,
        freeShapeSwitchAllowed: stemVariantFrame.freeShapeSwitchAllowed,
        hostileRejectedStemVariants: stemVariantFrame.hostileRejectedStemVariants,
        analyzedStemVariant: stemVariantFrame.analyzedStemVariant,
        underlyingStemVariant: stemVariantFrame.underlyingStemVariant,
        silentTruncatedCarrier: stemVariantFrame.silentTruncatedCarrier,
        silentTruncatedCarrierPreserved: stemVariantFrame.silentTruncatedCarrierPreserved,
        silentTruncatedCarrierPrintedInLessonAnalysis: stemVariantFrame.silentTruncatedCarrierPrintedInLessonAnalysis,
        vowelLengthOperation: stemVariantFrame.vowelLengthOperation,
        vowelLengthEnvironment: stemVariantFrame.vowelLengthEnvironment,
        sourceFinalVowel: stemVariantFrame.sourceFinalVowel,
        selectedFinalVowel: stemVariantFrame.selectedFinalVowel,
        selectedFinalVowelLong: stemVariantFrame.selectedFinalVowelLong,
        authorizedStemVariants: stemVariantFrame.authorizedStemVariants,
        optionalIrregularStemVariants: stemVariantFrame.optionalIrregularStemVariants,
        optionalIrregularPerfectiveFrame: stemVariantFrame.optionalIrregularPerfectiveFrame,
        optionalIrregularActive,
        optionalIrregularPreference: optionalIrregularActive ? stemVariantFrame.optionalIrregularPerfectiveFrame?.preference || "" : "",
        tenseFrame,
        predicateTableFrame,
        predicateTableCell: predicateTableFrame.tableCell,
        predicateTableSide: predicateTableFrame.tableSide,
        predicateTableRuleId: predicateTableFrame.ruleRef?.id || "",
        predicateTableExactWitness: predicateTableFrame.ruleRef?.exactWitness || "",
        predicateExpectedStemVariant: predicateTableFrame.expectedStemVariant,
        predicateExpectedTenseMorph: predicateTableFrame.expectedTenseMorph,
        predicateExpectedCarrier: predicateTableFrame.expectedPredicateCarrier,
        predicateActions: predicateTableFrame.predicateActions,
        predicateCarrierContradictionBlocked: predicateTableFrame.predicateCarrierContradictionBlocked,
        predicateCarrierContradictionReason: predicateTableFrame.predicateCarrierContradictionReason,
        hostileRejectedPredicateCarriers: predicateTableFrame.hostileRejectedPredicateCarriers,
        predicateConstituents: ["core", "tense"],
        predicateCarrier: `${wrapClassicalNahuatlLesson7Stem(stemVariantFrame.stemVariant)}${tenseFrame.tns || "0"}+`,
        alternatePredicateCarriers: optionalIrregularActive ? stemVariantFrame.optionalIrregularStemVariants.map(variant => `${wrapClassicalNahuatlLesson7Stem(variant)}${tenseFrame.tns || "0"}+`) : [],
        authorizationStatus: stemVariantFrame.stemVariant && predicateTableFrame.authorizationStatus === "authorized" ? "authorized" : "blocked",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function buildClassicalNahuatlLesson7AnalysisRuleFrame(stem = "", options = {}) {
      const initialVowelKind = getClassicalNahuatlLesson7InitialVowelKind(stem, options);
      return {
        kind: "classical-nahuatl-lesson7-analysis-rule-frame",
        lesson: "Andrews Lesson 7",
        section: "7.8",
        ruleLogicRole: "vnc-analysis-translation-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson7AnalysisRules(),
        stem: normalizeClassicalNahuatlLesson7Stem(stem),
        requiredDivision: "subject-plus-predicate",
        linearAnalysisOrder: ["morphic-carrier", "morphic-content", "translation"],
        diagrammaticAnalysisOrder: ["morphic-carrier", "function-unit", "translation-equivalent"],
        supportiveInitialVowelPolicy: "supportive initial i can drop after mainline reflexive or tla; real initial vowels remain",
        initialVowelKind,
        ambiguityPolicy: "surface identity requires structural analysis",
        authorizationStatus: "authorized",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function normalizeClassicalNahuatlLesson7ObjectRelationshipToken(value = "") {
      return removeClassicalNahuatlLesson7Marks(value).replace(/ø/gu, "0").replace(/[^a-z0-9āēīō⎕-]+/gu, "-").replace(/-+/gu, "-").replace(/^-|-$/gu, "");
    }
    function normalizeClassicalNahuatlLesson7IndefiniteObject(value = "") {
      const raw = normalizeClassicalNahuatlLesson7ObjectRelationshipToken(value);
      if (["te", "human", "person", "people", "someone", "everybody", "everyone"].includes(raw)) {
        return "tē";
      }
      if (["tla", "nonhuman", "thing", "things", "something", "everything"].includes(raw)) {
        return "tla";
      }
      return "";
    }
    function normalizeClassicalNahuatlLesson7ObjectRelationshipKind(value = "") {
      const raw = normalizeClassicalNahuatlLesson7ObjectRelationshipToken(value);
      const aliases = {
        "not-applicable": "not-applicable",
        none: "not-applicable",
        intransitive: "not-applicable",
        human: "human-indefinite",
        te: "human-indefinite",
        "human-indefinite": "human-indefinite",
        "nonspecific-human": "human-indefinite",
        "projective-human": "human-indefinite",
        nonhuman: "nonhuman-indefinite",
        tla: "nonhuman-indefinite",
        "nonhuman-indefinite": "nonhuman-indefinite",
        "nonspecific-nonhuman": "nonhuman-indefinite",
        "projective-nonhuman": "nonhuman-indefinite",
        reflexive: "human-reflexive-reciprocal",
        reciprocal: "human-reflexive-reciprocal",
        "mainline-reflexive": "human-reflexive-reciprocal",
        "human-reciprocal": "human-reflexive-reciprocal",
        "human-reflexive": "human-reflexive-reciprocal",
        "human-reflexive-reciprocal": "human-reflexive-reciprocal",
        "specific-human": "specific-human-projective",
        "specific-human-projective": "specific-human-projective",
        "human-specific-projective": "specific-human-projective",
        "specific-nonhuman": "specific-nonhuman-projective",
        "specific-nonhuman-projective": "specific-nonhuman-projective",
        "nonhuman-specific-projective": "specific-nonhuman-projective",
        "specific-projective": "ambiguous-specific-projective",
        "third-projective": "ambiguous-specific-projective",
        "ambiguous-specific-projective": "ambiguous-specific-projective"
      };
      return aliases[raw] || "";
    }
    function getClassicalNahuatlLesson7ObjectRelationshipGroup(relationshipKind = "") {
      if (["human-indefinite", "human-reflexive-reciprocal", "specific-human-projective"].includes(relationshipKind)) {
        return "human";
      }
      if (["nonhuman-indefinite", "specific-nonhuman-projective"].includes(relationshipKind)) {
        return "nonhuman";
      }
      if (relationshipKind === "ambiguous-specific-projective") {
        return "human-or-nonhuman";
      }
      return "";
    }
    function getClassicalNahuatlLesson7ObjectRelationshipWitness(relationshipGroup = "") {
      const rules = getClassicalNahuatlLesson7ObjectRelationshipRules();
      if (relationshipGroup === "human") {
        return rules.find(rule => rule.id === "cn-l7-79-human-object-specified") || rules[0] || null;
      }
      if (relationshipGroup === "nonhuman") {
        return rules.find(rule => rule.id === "cn-l7-79-nonhuman-object-specified") || rules[0] || null;
      }
      return rules.find(rule => rule.id === "cn-l7-79-indefinite-personal-object-relationship") || rules[0] || null;
    }
    function getClassicalNahuatlLesson7SpecificProjectiveRelationshipKind({
      objectPerson = "",
      objectHumanness = ""
    } = {}) {
      const person = normalizeClassicalNahuatlLesson7ObjectRelationshipToken(objectPerson);
      const humanness = normalizeClassicalNahuatlLesson7ObjectRelationshipToken(objectHumanness);
      if (humanness === "human" || humanness === "animate-human") {
        return "specific-human-projective";
      }
      if (["nonhuman", "inanimate", "thing"].includes(humanness)) {
        return "specific-nonhuman-projective";
      }
      if (["1sg", "1pl", "2sg", "2pl"].includes(person)) {
        return "specific-human-projective";
      }
      if (["3sg", "3pl"].includes(person)) {
        return "ambiguous-specific-projective";
      }
      return "ambiguous-specific-projective";
    }
    function getClassicalNahuatlLesson7SelectedObjectRelationship({
      valence = "",
      objectFrame = null,
      options = {}
    } = {}) {
      const normalizedValence = normalizeClassicalNahuatlLesson7Valence(valence);
      const objectKind = normalizeClassicalNahuatlLesson7ObjectRelationshipToken(objectFrame?.objectKind || options.objectKind || "");
      const objectPerson = normalizeClassicalNahuatlLesson7ObjectRelationshipToken(objectFrame?.objectPerson || options.objectPerson || options.object || options.obj || "");
      const objectHumanness = normalizeClassicalNahuatlLesson7ObjectRelationshipToken(objectFrame?.humanness || options.objectHumanness || options.objectAnimacy || options.animacy || "");
      let relationshipKind = "not-applicable";
      if (normalizedValence === "projective-human" || objectKind === "nonspecific-human") {
        relationshipKind = "human-indefinite";
      } else if (normalizedValence === "projective-nonhuman" || objectKind === "nonspecific-nonhuman") {
        relationshipKind = "nonhuman-indefinite";
      } else if (normalizedValence === "mainline-reflexive" || normalizedValence === "human-reciprocal" || objectKind === "mainline-reflexive") {
        relationshipKind = "human-reflexive-reciprocal";
      } else if (normalizedValence === "specific-projective" || objectKind === "specific-projective") {
        relationshipKind = getClassicalNahuatlLesson7SpecificProjectiveRelationshipKind({
          objectPerson,
          objectHumanness
        });
      }
      const relationshipGroup = getClassicalNahuatlLesson7ObjectRelationshipGroup(relationshipKind);
      const possibleIndefiniteObjects = relationshipGroup === "human" ? ["tē"] : relationshipGroup === "nonhuman" ? ["tla"] : relationshipGroup === "human-or-nonhuman" ? ["tē", "tla"] : [];
      const selectedIndefiniteObject = possibleIndefiniteObjects.length === 1 ? possibleIndefiniteObjects[0] : "";
      const selectedIndefiniteObjectSurface = selectedIndefiniteObject === "tē" ? "te" : selectedIndefiniteObject;
      const relatedSpecificObjectKinds = relationshipGroup === "human" ? ["mainline-reflexive", "n-o", "m-itz", "qu-0", "t-ēch", "am-ēch", "qu-im"] : relationshipGroup === "nonhuman" ? ["qu-0", "qu-im"] : [];
      const pluralReflexiveReciprocalPossible = Boolean((objectFrame?.pluralMayBeReciprocal === true || normalizedValence === "human-reciprocal") && relationshipKind === "human-reflexive-reciprocal");
      const witness = getClassicalNahuatlLesson7ObjectRelationshipWitness(relationshipGroup);
      return {
        selectedObjectRelationshipKind: relationshipKind,
        selectedObjectRelationshipGroup: relationshipGroup,
        selectedObjectKind: objectFrame?.objectKind || objectKind,
        selectedObjectPerson: objectFrame?.objectPerson || objectPerson,
        selectedObjectHumanness: objectFrame?.humanness || objectHumanness,
        selectedObjectPronounClass: objectFrame?.pronounClass || "",
        selectedObjectValenceArity: objectFrame?.valenceArity || "",
        selectedObjectSlot: objectFrame?.valenceArity === "monadic" ? objectFrame?.va || "" : [objectFrame?.va1 || "", objectFrame?.va2 || ""].filter(Boolean).join("-"),
        selectedIndefiniteObject,
        selectedIndefiniteObjectSurface,
        possibleIndefiniteObjects,
        relatedSpecificObjectKinds,
        relationshipRange: selectedIndefiniteObject ? ["nonspecific", "vague", "total"] : [],
        objectRelationshipApplies: relationshipKind !== "not-applicable",
        pluralReflexiveReciprocalPossible,
        selectedObjectRelationshipRuleId: witness?.id || "",
        selectedObjectRelationshipExactWitness: witness?.exactWitness || "",
        selectedObjectRelationshipLineStart: witness?.lineStart || 0,
        selectedObjectRelationshipLineEnd: witness?.lineEnd || 0
      };
    }
    function buildClassicalNahuatlLesson7ObjectRelationshipRuleFrame(stem = "", options = {}, priorVncFrame = null) {
      const valence = normalizeClassicalNahuatlLesson7Valence(options.valence || options.transitivity || options.objectKind || options.object || "");
      const objectFrame = priorVncFrame?.objectFrame || null;
      const selectedRelationship = getClassicalNahuatlLesson7SelectedObjectRelationship({
        valence,
        objectFrame,
        options
      });
      const requestedRelationshipKind = normalizeClassicalNahuatlLesson7ObjectRelationshipKind(options.requestedObjectRelationshipKind || options.objectRelationshipKind || options.hostileObjectRelationshipKind || "");
      const requestedIndefiniteObject = normalizeClassicalNahuatlLesson7IndefiniteObject(options.requestedIndefiniteObject || options.indefiniteObject || options.hostileIndefiniteObject || "");
      const requestedRelationshipGroup = getClassicalNahuatlLesson7ObjectRelationshipGroup(requestedRelationshipKind);
      const selectedGroup = selectedRelationship.selectedObjectRelationshipGroup;
      const requestedRelationshipContradicts = Boolean(requestedRelationshipGroup && selectedGroup && selectedGroup !== "human-or-nonhuman" && requestedRelationshipGroup !== "human-or-nonhuman" && requestedRelationshipGroup !== selectedGroup);
      const requestedIndefiniteContradicts = Boolean(requestedIndefiniteObject && selectedRelationship.possibleIndefiniteObjects.length && !selectedRelationship.possibleIndefiniteObjects.includes(requestedIndefiniteObject));
      const contradictionBlocked = requestedRelationshipContradicts || requestedIndefiniteContradicts;
      const objectRelationshipActions = Array.from(new Set([...(selectedRelationship.objectRelationshipApplies ? [CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_ACTIONS.SELECT_CANVAS_RELATIONSHIP, CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_ACTIONS.PRESERVE_INDEFINITE_SPECIFIC_DISTINCTION, CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_ACTIONS.CARRY_RELATIONSHIP_TO_SELECTED_OUTPUT] : []), ...(selectedRelationship.pluralReflexiveReciprocalPossible ? [CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_ACTIONS.PRESERVE_REFLEXIVE_RECIPROCAL_POSSIBILITY] : []), ...(contradictionBlocked ? [CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_ACTIONS.BLOCK_CONTRADICTORY_RELATIONSHIP] : [])]));
      return {
        kind: "classical-nahuatl-lesson7-object-relationship-rule-frame",
        lesson: "Andrews Lesson 7",
        section: "7.9",
        ruleLogicRole: "indefinite-personal-object-relationship-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson7ObjectRelationshipRules(),
        stem: normalizeClassicalNahuatlLesson7Stem(stem),
        valence,
        indefiniteObjects: {
          human: {
            morph: "tē",
            range: ["nonspecific", "vague", "total"],
            relatesTo: ["mainline-reflexive", "specific-projective-personal-objects"]
          },
          nonhuman: {
            morph: "tla",
            range: ["nonspecific", "vague", "total"],
            relatesTo: ["third-singular-projective", "third-plural-projective"]
          }
        },
        ...selectedRelationship,
        objectRelationshipActions,
        requestedObjectRelationshipKind: requestedRelationshipKind,
        requestedObjectRelationshipGroup: requestedRelationshipGroup,
        requestedIndefiniteObject,
        hostileRejectedObjectRelationships: contradictionBlocked ? Array.from(new Set([requestedRelationshipKind, requestedIndefiniteObject].filter(Boolean))) : [],
        objectRelationshipContradictionBlocked: contradictionBlocked,
        objectRelationshipContradictionReason: contradictionBlocked ? "requested-object-relationship-not-authorized-by-canvas-7.9" : "",
        collapseIndefiniteIntoSpecificAllowed: false,
        authorizationStatus: contradictionBlocked ? "blocked" : "authorized",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function normalizeClassicalNahuatlLesson7TlaFusionAnalysisKind(value = "") {
      const raw = normalizeClassicalNahuatlLesson7ObjectRelationshipToken(value);
      const aliases = {
        fused: "fused-derived-intransitive",
        fusion: "fused-derived-intransitive",
        "tla-fusion": "fused-derived-intransitive",
        "derived-intransitive": "fused-derived-intransitive",
        "fused-derived-intransitive": "fused-derived-intransitive",
        intransitive: "fused-derived-intransitive",
        unfused: "unfused-transitive-tla-object",
        separate: "unfused-transitive-tla-object",
        transitive: "unfused-transitive-tla-object",
        "tla-object": "unfused-transitive-tla-object",
        "transitive-tla-object": "unfused-transitive-tla-object",
        "unfused-transitive-tla-object": "unfused-transitive-tla-object",
        none: "not-applicable",
        "not-applicable": "not-applicable"
      };
      return aliases[raw] || "";
    }
    function normalizeClassicalNahuatlLesson7AdverbPosition(value = "") {
      const raw = normalizeClassicalNahuatlLesson7ObjectRelationshipToken(value);
      const aliases = {
        before: "before-tla",
        "before-tla": "before-tla",
        "adverb-before-tla": "before-tla",
        "precedes-tla": "before-tla",
        after: "after-tla",
        "after-tla": "after-tla",
        "adverb-after-tla": "after-tla",
        "follows-tla": "after-tla",
        "inside-stem-after-tla": "after-tla",
        none: "",
        "": ""
      };
      return aliases[raw] || "";
    }
    function getClassicalNahuatlLesson7FusedTlaSegment({
      incorporatedAdverb = "",
      options = {}
    } = {}) {
      const explicit = normalizeClassicalNahuatlLesson7Stem(options.fusedTlaSegment || options.tlaFusionSegment || options.tlaInsideStem || "");
      if (explicit) {
        return explicit;
      }
      return removeClassicalNahuatlLesson7Marks(incorporatedAdverb).endsWith("l") ? "la" : "tla";
    }
    function getClassicalNahuatlLesson7ExplicitTlaFusionEmbedStem(options = {}) {
      return normalizeClassicalNahuatlLesson7Stem(options.embedStem || options.embeddedStem || options.sourceEmbedStem || options.sourceEmbed || options.tlaFusionEmbedStem || "");
    }
    function getClassicalNahuatlLesson7ExplicitTlaFusionMatrixStem(options = {}) {
      return normalizeClassicalNahuatlLesson7Stem(options.matrixStem || options.matrixStemVariant || options.sourceMatrixStem || options.sourceMatrix || options.tlaFusionMatrixStem || "");
    }
    function buildClassicalNahuatlLesson7ConstructiveTlaFusionTargetFrame(stem = "", options = {}) {
      const stemVariant = normalizeClassicalNahuatlLesson7Stem(options.stemVariant || stem);
      const sourceBoundaryRecord = options.sourceBoundaryRecord || null;
      const canvasBoundaryExample = options.canvasBoundaryExample || null;
      const explicitEmbedStem = getClassicalNahuatlLesson7ExplicitTlaFusionEmbedStem(options);
      const sourceBoundaryEmbedStem = normalizeClassicalNahuatlLesson7Stem(sourceBoundaryRecord?.embedMatrixAuthorized === true ? sourceBoundaryRecord?.embedStem || "" : "");
      const embedStem = normalizeClassicalNahuatlLesson7Stem(explicitEmbedStem || options.incorporatedAdverb || options.adverb || canvasBoundaryExample?.incorporatedAdverb || sourceBoundaryEmbedStem || "");
      const matrixStem = normalizeClassicalNahuatlLesson7Stem(getClassicalNahuatlLesson7ExplicitTlaFusionMatrixStem(options) || canvasBoundaryExample?.stemVariant || (sourceBoundaryRecord?.embedMatrixAuthorized === true ? sourceBoundaryRecord?.matrixStem || "" : "") || stemVariant);
      const fusedTlaSegment = embedStem ? getClassicalNahuatlLesson7FusedTlaSegment({
        incorporatedAdverb: embedStem,
        options
      }) : "tla";
      const constructedDerivedStem = embedStem ? [embedStem, fusedTlaSegment, matrixStem].filter(Boolean).join("-") : ["tla", matrixStem || stemVariant].filter(Boolean).join("-");
      const exactDerivedStem = normalizeClassicalNahuatlLesson7Stem(sourceBoundaryRecord?.tlaFusionDerivedStem || canvasBoundaryExample?.derivedStem || "");
      return {
        kind: "classical-nahuatl-lesson7-constructive-tla-fusion-target-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        buildKind: embedStem ? "embed-matrix-plus-tla-fusion" : "matrix-plus-tla-fusion",
        sourceStemVariant: embedStem ? [embedStem, matrixStem].filter(Boolean).join("-") : matrixStem || stemVariant,
        embedStem,
        matrixStem,
        fusedTlaSegment,
        constructedDerivedStem,
        exactDerivedStem,
        derivedStem: exactDerivedStem || constructedDerivedStem,
        exactWitnessOverridesConstructedShape: Boolean(exactDerivedStem && exactDerivedStem !== constructedDerivedStem),
        buildLogic: embedStem ? "embed + fused-tla + matrix" : "tla + matrix"
      };
    }
    function buildClassicalNahuatlLesson7TlaFusionDerivedStem(stem = "", options = {}) {
      const canvasBoundaryExample = options.canvasBoundaryExample || null;
      const sourceBoundaryRecord = options.sourceBoundaryRecord || null;
      const explicitDerivedStem = getClassicalNahuatlLesson7ExplicitTlaFusionDerivedStem(options);
      if (explicitDerivedStem) {
        return explicitDerivedStem;
      }
      return buildClassicalNahuatlLesson7ConstructiveTlaFusionTargetFrame(stem, {
        ...options,
        canvasBoundaryExample,
        sourceBoundaryRecord
      }).derivedStem;
    }
    function buildClassicalNahuatlLesson7TlaFusionSourceStem(stem = "", options = {}) {
      const stemVariant = normalizeClassicalNahuatlLesson7Stem(options.stemVariant || stem);
      const canvasBoundaryExample = options.canvasBoundaryExample || null;
      if (canvasBoundaryExample?.sourceStemVariant) {
        return canvasBoundaryExample.sourceStemVariant;
      }
      const explicitEmbedStem = getClassicalNahuatlLesson7ExplicitTlaFusionEmbedStem(options);
      const explicitMatrixStem = getClassicalNahuatlLesson7ExplicitTlaFusionMatrixStem(options);
      if (explicitEmbedStem && explicitMatrixStem) {
        return [explicitEmbedStem, explicitMatrixStem].filter(Boolean).join("-");
      }
      if (explicitMatrixStem) {
        return explicitMatrixStem;
      }
      const sourceBoundaryRecord = options.sourceBoundaryRecord || getClassicalNahuatlLesson7SourceBoundaryRoleRecord(stemVariant);
      if (sourceBoundaryRecord?.canonicalStemVariant) {
        return normalizeClassicalNahuatlLesson7Stem(sourceBoundaryRecord.canonicalStemVariant);
      }
      const incorporatedAdverb = normalizeClassicalNahuatlLesson7Stem(options.incorporatedAdverb || options.adverb || "");
      const adverbPosition = normalizeClassicalNahuatlLesson7AdverbPosition(options.adverbPosition || "");
      if (incorporatedAdverb && adverbPosition === "after-tla") {
        return [incorporatedAdverb, stemVariant].filter(Boolean).join("-");
      }
      return stemVariant;
    }
    function buildClassicalNahuatlLesson7TlaFusionRuleFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const stemVariant = normalizeClassicalNahuatlLesson7Stem(options.stemVariant || normalizedStem);
      const canvasBoundaryExample = getClassicalNahuatlLesson7TlaFusionCanvasBoundaryExample(normalizedStem);
      const sourceBoundaryRecord = getClassicalNahuatlLesson7SourceBoundaryRoleRecord(normalizedStem, options);
      const sourceBoundaryTlaFusionDerivedStem = normalizeClassicalNahuatlLesson7Stem(sourceBoundaryRecord?.tlaFusionDerivedStem || "");
      const sourceBoundaryHasEmbedMatrix = Boolean(sourceBoundaryRecord?.embedMatrixAuthorized === true && sourceBoundaryRecord?.embedStem && sourceBoundaryRecord?.matrixStem);
      const sourceBoundaryHasAdverbEmbed = Boolean(sourceBoundaryHasEmbedMatrix && sourceBoundaryRecord?.boundaryRole === "incorporated-adverb-embed-plus-vnc-matrix");
      const sourceBoundaryEmbedStem = sourceBoundaryHasEmbedMatrix ? normalizeClassicalNahuatlLesson7Stem(sourceBoundaryRecord.embedStem) : "";
      const sourceBoundaryAdverb = sourceBoundaryHasAdverbEmbed ? sourceBoundaryEmbedStem : "";
      const sourceBoundaryMatrixStem = sourceBoundaryHasEmbedMatrix ? normalizeClassicalNahuatlLesson7Stem(sourceBoundaryRecord.matrixStem) : "";
      const explicitFusionRequested = options.fused === true || options.tlaFusion === true;
      const explicitEmbedStem = getClassicalNahuatlLesson7ExplicitTlaFusionEmbedStem(options);
      const explicitMatrixStem = getClassicalNahuatlLesson7ExplicitTlaFusionMatrixStem(options);
      const explicitIncorporatedAdverb = normalizeClassicalNahuatlLesson7Stem(options.incorporatedAdverb || options.adverb || "");
      const incorporatedAdverb = explicitIncorporatedAdverb || (explicitFusionRequested ? canvasBoundaryExample?.incorporatedAdverb || sourceBoundaryAdverb || "" : "");
      const explicitAdverbPosition = normalizeClassicalNahuatlLesson7AdverbPosition(options.adverbPosition || "");
      const adverbPosition = explicitAdverbPosition || (explicitFusionRequested ? canvasBoundaryExample?.adverbPosition || (sourceBoundaryAdverb ? "before-tla" : "") : "");
      const adverbPrecedesTla = adverbPosition === "before-tla";
      const adverbFollowsTla = adverbPosition === "after-tla";
      const fused = adverbFollowsTla ? false : explicitFusionRequested || adverbPrecedesTla;
      const requestedSourceValence = normalizeClassicalNahuatlLesson7Valence(options.requestedSourceValence || options.requestedValence || options.sourceValence || options.valence || options.transitivity || options.objectKind || options.object || "");
      const valence = explicitFusionRequested ? "projective-nonhuman" : normalizeClassicalNahuatlLesson7Valence(options.valence || options.transitivity || options.objectKind || options.object || "");
      const fusionSuppliesTlaSourceValence = Boolean(explicitFusionRequested && requestedSourceValence !== "projective-nonhuman");
      const tlaEligible = fused || valence === "projective-nonhuman";
      const tlaSourceVariantApplies = Boolean(tlaEligible || explicitFusionRequested);
      const sourceStemVariant = tlaSourceVariantApplies ? buildClassicalNahuatlLesson7TlaFusionSourceStem(normalizedStem, {
        ...options,
        stemVariant,
        incorporatedAdverb,
        adverbPosition,
        canvasBoundaryExample,
        sourceBoundaryRecord
      }) : stemVariant;
      const matrixStemVariant = normalizeClassicalNahuatlLesson7Stem(canvasBoundaryExample?.stemVariant || sourceBoundaryMatrixStem || explicitMatrixStem || stemVariant);
      const constructiveTlaFusionTargetFrame = buildClassicalNahuatlLesson7ConstructiveTlaFusionTargetFrame(normalizedStem, {
        ...options,
        stemVariant: sourceStemVariant || stemVariant,
        embedStem: explicitEmbedStem || (explicitFusionRequested ? sourceBoundaryEmbedStem : ""),
        matrixStem: matrixStemVariant,
        incorporatedAdverb,
        adverbPosition,
        canvasBoundaryExample,
        sourceBoundaryRecord
      });
      const explicitDerivedStem = getClassicalNahuatlLesson7ExplicitTlaFusionDerivedStem(options);
      const authoritativeDerivedStem = normalizeClassicalNahuatlLesson7Stem(canvasBoundaryExample?.derivedStem || sourceBoundaryTlaFusionDerivedStem || "");
      const expectedDerivedStem = normalizeClassicalNahuatlLesson7Stem(authoritativeDerivedStem || constructiveTlaFusionTargetFrame.derivedStem || "");
      const derivedStem = fused ? expectedDerivedStem : "";
      const sourceFormula = `#pers1-pers2+tla(${sourceStemVariant || "STEM"})tns+num1-num2#`;
      const targetFormula = `#pers1-pers2(${derivedStem || `tla-${stemVariant || "STEM"}`})tns+num1-num2#`;
      const selectedAnalysisKind = fused ? "fused-derived-intransitive" : tlaEligible ? "unfused-transitive-tla-object" : "not-applicable";
      const requestedAnalysisKind = normalizeClassicalNahuatlLesson7TlaFusionAnalysisKind(options.requestedTlaFusionAnalysis || options.tlaFusionAnalysis || options.hostileTlaFusionAnalysis || (typeof options.requestedTlaFusion === "boolean" ? options.requestedTlaFusion ? "fused" : "unfused" : "") || (typeof options.hostileTlaFusion === "boolean" ? options.hostileTlaFusion ? "fused" : "unfused" : ""));
      const canvasDerivedStemContradicts = Boolean(fused && expectedDerivedStem && explicitDerivedStem && explicitDerivedStem !== expectedDerivedStem);
      const canvasDerivedStemContradictionIsHuelBoundary = Boolean(canvasBoundaryExample?.sourceBoundaryRecord?.boundaryRecordKey === "huel-mati");
      const canvasDerivedStemContradictionReason = canvasDerivedStemContradicts ? canvasDerivedStemContradictionIsHuelBoundary ? "requested-derived-stem-not-authorized-by-canvas-7.10-huel-boundary-test" : authoritativeDerivedStem ? "requested-derived-stem-not-authorized-by-canvas-witnessed-tla-fusion-boundary" : "requested-derived-stem-not-authorized-by-constructed-tla-fusion-rule" : "";
      const contradictionBlocked = Boolean(requestedAnalysisKind && selectedAnalysisKind !== "not-applicable" && requestedAnalysisKind !== selectedAnalysisKind || canvasDerivedStemContradicts);
      const tlaFusionActions = Array.from(new Set([...(adverbPrecedesTla || adverbFollowsTla ? [CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_ACTIONS.APPLY_ADVERB_BOUNDARY_TEST] : []), ...(fused ? [constructiveTlaFusionTargetFrame.buildKind === "embed-matrix-plus-tla-fusion" ? CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_ACTIONS.BUILD_EMBED_MATRIX_TLA_FUSION : CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_ACTIONS.BUILD_MATRIX_TLA_FUSION, CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_ACTIONS.MOVE_TLA_INSIDE_VERBSTEM, CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_ACTIONS.REQUIRE_DERIVED_INTRANSITIVE] : []), ...(!fused && tlaEligible ? [CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_ACTIONS.PRESERVE_TRANSITIVE_TLA_OBJECT] : []), ...(tlaEligible ? [CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_ACTIONS.CARRY_FUSION_TO_SELECTED_OUTPUT] : []), ...(contradictionBlocked ? [CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_ACTIONS.BLOCK_CONTRADICTORY_FUSION] : [])]));
      const sourceBoundaryProofAnchor = sourceBoundaryRecord ? {
        id: "cn-l7-source-boundary-proof-anchor",
        tagId: "cn-l7-source-boundary-role",
        section: sourceBoundaryRecord.sourceKind || "",
        lineStart: sourceBoundaryRecord.lineStart || 0,
        lineEnd: sourceBoundaryRecord.lineEnd || 0,
        exactWitness: sourceBoundaryRecord.exactWitness || "",
        rule: sourceBoundaryRecord.notes || ""
      } : null;
      const tlaFusionProofAnchors = dedupeClassicalNahuatlLesson7RuleRefs([...getClassicalNahuatlLesson7TlaFusionRules(), sourceBoundaryProofAnchor].filter(Boolean));
      const sourceBoundaryVariablesMatched = Boolean(sourceBoundaryRecord?.embedMatrixAuthorized === true && sourceBoundaryRecord?.embedStem && sourceBoundaryRecord?.matrixStem);
      const nearbySourceBoundaryRecordKey = !sourceBoundaryRecord ? getClassicalNahuatlLesson7NearbySourceBoundaryRecordKey(normalizedStem) : "";
      const nearbyFormExcludedBySourceBoundaryVariables = Boolean(explicitFusionRequested && !sourceBoundaryVariablesMatched && nearbySourceBoundaryRecordKey);
      const ruleVariables = {
        sourceObjectSlot: tlaEligible ? "tla" : "",
        sourceValence: valence,
        requestedSourceValence,
        fusionSuppliesTlaSourceValence,
        targetValence: fused ? "intransitive" : valence,
        sourceStemVariant,
        embedStem: constructiveTlaFusionTargetFrame.embedStem || "",
        matrixStem: constructiveTlaFusionTargetFrame.matrixStem || matrixStemVariant || "",
        fusedTlaSegment: constructiveTlaFusionTargetFrame.fusedTlaSegment || "",
        constructedDerivedStem: constructiveTlaFusionTargetFrame.constructedDerivedStem || "",
        exactDerivedStem: constructiveTlaFusionTargetFrame.exactDerivedStem || "",
        boundaryPosition: adverbPosition || "",
        sourceBoundaryRole: sourceBoundaryRecord?.boundaryRole || "",
        sourceBoundaryRecordKey: sourceBoundaryRecord?.boundaryRecordKey || "",
        sourceBoundaryInputSpelling: sourceBoundaryRecord?.inputBoundarySpelling || "",
        sourceBoundarySolidInferred: sourceBoundaryRecord?.solidBoundaryInferred === true,
        sourceBoundaryVariablesMatched,
        nearbySourceBoundaryRecordKey
      };
      const ruleInputs = {
        stem: normalizedStem,
        stemVariant,
        valence,
        requestedSourceValence,
        explicitFusionRequested,
        requestedTlaFusionAnalysisKind: requestedAnalysisKind,
        incorporatedAdverb,
        adverbPosition,
        sourceBoundaryKnown: Boolean(sourceBoundaryRecord),
        sourceBoundaryRecordKey: sourceBoundaryRecord?.boundaryRecordKey || "",
        exactWitnessDerivedStem: authoritativeDerivedStem,
        requestedDerivedStem: explicitDerivedStem,
        sourceFormula
      };
      const ruleOutputs = {
        selectedAnalysisKind,
        fused,
        derivedStem,
        selectedAnalysis: fused ? targetFormula : tlaEligible ? sourceFormula : "",
        sourceFormula,
        targetFormula,
        objectSlotAfterFusion: fused ? "none" : tlaEligible ? "tla" : "not-applicable",
        targetObjectSlot: fused ? "none" : tlaEligible ? "tla" : "not-applicable",
        exactWitnessOverridesConstructedShape: constructiveTlaFusionTargetFrame.exactWitnessOverridesConstructedShape === true,
        nearbySourceBoundaryRecordKey,
        nearbyFormExcludedBySourceBoundaryVariables
      };
      return {
        kind: "classical-nahuatl-lesson7-tla-fusion-rule-frame",
        lesson: "Andrews Lesson 7",
        section: "7.10",
        ruleLogicRole: "tla-fusion-derivation-boundary",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: tlaFusionProofAnchors,
        generalRule: "tla-fusion-builds-a-derived-intransitive-verbstem-from-rule-variables",
        ruleVariables,
        ruleInputs,
        ruleOutputs,
        proofAnchors: tlaFusionProofAnchors,
        witnessUsePolicy: "proof-anchor-not-whitelist",
        witnessesAreWhitelist: false,
        sourceStructure: "tla-plus-transitive-stem",
        targetStructure: "derived-intransitive-verbstem",
        stem: normalizedStem,
        stemVariant,
        sourceStemVariant,
        fused,
        explicitFusionRequested,
        tlaEligible,
        canvasBoundaryExample,
        sourceBoundaryRecord,
        sourceBoundaryHasEmbedMatrix,
        sourceBoundaryHasAdverbEmbed,
        sourceBoundaryEmbedStem,
        sourceBoundaryTlaFusionDerivedStem,
        sourceBoundaryTlaFusionWitnessed: Boolean(sourceBoundaryTlaFusionDerivedStem),
        canvasBoundaryExampleInferred: Boolean(canvasBoundaryExample && explicitFusionRequested && (!explicitIncorporatedAdverb || !explicitAdverbPosition)),
        sourceBoundaryAdverbInferred: Boolean(sourceBoundaryHasAdverbEmbed && explicitFusionRequested && !explicitIncorporatedAdverb),
        incorporatedAdverb,
        explicitEmbedStem,
        explicitMatrixStem,
        constructiveTlaFusionTargetFrame,
        tlaFusionBuildKind: fused ? constructiveTlaFusionTargetFrame.buildKind : "",
        tlaFusionBuildLogic: fused ? constructiveTlaFusionTargetFrame.buildLogic : "",
        tlaFusionBuildEmbedStem: fused ? constructiveTlaFusionTargetFrame.embedStem : "",
        tlaFusionBuildMatrixStem: fused ? constructiveTlaFusionTargetFrame.matrixStem : "",
        tlaFusionBuildSegment: fused ? constructiveTlaFusionTargetFrame.fusedTlaSegment : "",
        tlaFusionConstructedDerivedStem: fused ? constructiveTlaFusionTargetFrame.constructedDerivedStem : "",
        adverbPosition,
        matrixStemVariant,
        explicitIncorporatedAdverb,
        explicitAdverbPosition,
        adverbPrecedesTla,
        adverbFollowsTla,
        adverbBoundaryTestApplied: adverbPrecedesTla || adverbFollowsTla,
        adverbBoundaryDecision: adverbPrecedesTla ? sourceBoundaryTlaFusionDerivedStem ? "canvas-witness-authorizes-exact-derived-tla-fusion-stem" : canvasBoundaryExample ? "canvas-source-boundary-variables-authorize-tla-fusion" : "adverb-before-tla-authorizes-fusion" : sourceBoundaryTlaFusionDerivedStem && fused ? "canvas-witness-authorizes-exact-derived-tla-fusion-stem" : fused ? constructiveTlaFusionTargetFrame.buildKind === "embed-matrix-plus-tla-fusion" ? "build-embed-matrix-tla-fusion" : "build-matrix-tla-fusion" : adverbFollowsTla ? "adverb-after-tla-preserves-transitive-tla-object" : "",
        sourceFormula,
        targetFormula,
        selectedAnalysis: fused ? targetFormula : tlaEligible ? sourceFormula : "",
        selectedAnalysisKind,
        selectedTlaFusionAnalysisKind: selectedAnalysisKind,
        requestedTlaFusionAnalysisKind: requestedAnalysisKind,
        objectSlotAfterFusion: fused ? "none" : tlaEligible ? "tla" : "not-applicable",
        sourceObjectSlot: tlaEligible ? "tla" : "",
        targetObjectSlot: fused ? "none" : tlaEligible ? "tla" : "not-applicable",
        derivedStem,
        derivedStemVariant: derivedStem,
        processKind: "derivational",
        meaningMayShift: true,
        adverbBoundaryTest: "adverb-before-tla-means-tla-is-inside-the-verbstem",
        tlaFusionActions,
        tlaFusionContradictionBlocked: contradictionBlocked,
        tlaFusionContradictionReason: contradictionBlocked ? canvasDerivedStemContradicts ? canvasDerivedStemContradictionReason : "requested-tla-fusion-analysis-not-authorized-by-canvas-7.10-boundary-test" : "",
        hostileRejectedTlaFusionAnalyses: contradictionBlocked ? [requestedAnalysisKind].filter(Boolean) : [],
        hostileRejectedDerivedStems: canvasDerivedStemContradicts ? [explicitDerivedStem] : [],
        authorizationStatus: contradictionBlocked ? "blocked" : "authorized",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function getClassicalNahuatlLesson81ExpandedVncRules() {
      return [{
        tagId: "cn-l8-81-expanded-vnc-boundary",
        section: "8.1",
        transcriptionLineStart: 3291,
        transcriptionLineEnd: 3296,
        exactWitness: "The first kind creates the only true expansion, since it occurs inside the boundaries of a VNC. The other two result in only seeming expansions, since they occur outside a VNC's boundaries.",
        ruleAction: "separate-true-vnc-expansion-from-outside-seeming-expansions"
      }, {
        tagId: "cn-l8-811-directional-locative-inside-core",
        section: "8.1.1",
        transcriptionLineStart: 3297,
        transcriptionLineEnd: 3315,
        exactWitness: "The prefix functions as an adverbial modifier of the predicate and is therefore positioned inside it, forming part of the core.",
        ruleAction: CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.PLACE_DIRECTIONAL_INSIDE_VNC_CORE
      }, {
        tagId: "cn-l8-811-transitive-directional-placement",
        section: "8.1.1",
        transcriptionLineStart: 3324,
        transcriptionLineEnd: 3335,
        exactWitness: "If the transitive VNC has a dyadic valence position filled with a specific projective pronoun, the direction prefix is placed after the valence position",
        ruleAction: "place-directional-by-valence-position"
      }, {
        tagId: "cn-l8-811-pers1-i-to-o-before-c-on",
        section: "8.1.1",
        transcriptionLineStart: 3336,
        transcriptionLineEnd: 3345,
        exactWitness: "The supportive vowel [i] on a pers¹ morph is replaced by [o] when followed by the va¹-va² dyadic filler c-Ø when this is followed by the directional prefix on",
        ruleAction: CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.REPLACE_PERS1_SUPPORTIVE_I_WITH_O
      }, {
        tagId: "cn-l8-812-antecessive-outside-vnc",
        section: "8.1.2",
        transcriptionLineStart: 3387,
        transcriptionLineEnd: 3408,
        exactWitness: "Since the particle lies outside the boundary of the VNC formula, it has no impact on the shape or spelling of the third-person objective-case morph in the va1 subposition.",
        ruleAction: CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.KEEP_ANTECESSIVE_OUTSIDE_VNC
      }, {
        tagId: "cn-l8-813-negative-outside-vnc",
        section: "8.1.3",
        transcriptionLineStart: 3418,
        transcriptionLineEnd: 3433,
        exactWitness: "The negative particle ah#, \"not\" ... stands outside the leftward boundary of a VNC or one of the VNC's fore-lying clausemates.",
        ruleAction: CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.KEEP_NEGATIVE_OUTSIDE_VNC
      }];
    }
    function normalizeClassicalNahuatlLesson8DirectionalPrefix(value = "") {
      const raw = String(value || "").trim();
      const normalized = raw.normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase().replace(/[#\s_-]/gu, "");
      if (normalized === "on") {
        return "on";
      }
      if (normalized === "hual" || normalized === "huall" || normalized === "wal") {
        return "huāl";
      }
      return "";
    }
    function normalizeClassicalNahuatlLesson8OutsidePrefix(value = "") {
      const raw = String(value || "").trim();
      const normalized = raw.normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase().replace(/[#\s_-]/gu, "");
      if (normalized === "o") {
        return "ō#";
      }
      if (normalized === "ah") {
        return "ah#";
      }
      if (normalized === "ca") {
        return "ca#";
      }
      return "";
    }
    function getClassicalNahuatlLesson81OutsidePrefixes(options = {}) {
      const prefixes = Array.isArray(options.outsidePrefixes) ? options.outsidePrefixes : [];
      const requested = [...prefixes, options.antecessivePrefix, options.negativePrefix, options.sentencePrefix, options.clausePrefix, options.antecessive === true ? "ō" : "", options.negative === true ? "ah" : "", options.caNegative === true ? "ca" : ""];
      return Array.from(new Set(requested.map(normalizeClassicalNahuatlLesson8OutsidePrefix).filter(Boolean)));
    }
    function getClassicalNahuatlLesson81HostileFormulaSlots(options = {}) {
      const slots = [...(Array.isArray(options.hostileLesson8FormulaSlots) ? options.hostileLesson8FormulaSlots : []), ...(Array.isArray(options.hostileFormulaSlots) ? options.hostileFormulaSlots : []), ...(Array.isArray(options.requestedFormulaSlots) ? options.requestedFormulaSlots : [])];
      return Array.from(new Set(slots.map(slot => String(slot || "").trim()).filter(Boolean)));
    }
    function getClassicalNahuatlLesson81DirectionalPlacement({
      valence = "",
      objectRelationshipRuleFrame = null
    } = {}) {
      const normalizedValence = normalizeClassicalNahuatlLesson7Valence(valence);
      const relationshipKind = objectRelationshipRuleFrame?.selectedObjectRelationshipKind || "";
      if (normalizedValence === "intransitive") {
        return "before-intransitive-stem";
      }
      if (normalizedValence === "specific-projective" || relationshipKind.includes("specific")) {
        return "after-specific-projective-valence";
      }
      if (normalizedValence === "mainline-reflexive" || normalizedValence === "human-reciprocal") {
        return "before-reflexive-reciprocal-valence";
      }
      if (normalizedValence === "projective-human" || normalizedValence === "projective-nonhuman") {
        return "before-monadic-valence";
      }
      return "";
    }
    function isClassicalNahuatlLesson81ThirdSingularProjectiveOnObjectSlot(objectSlot = "") {
      return ["c-0", "qu-0", "qui-0"].includes(String(objectSlot || "").trim());
    }
    function getClassicalNahuatlLesson81ObjectMorphIdentityFrame(priorVncFrame = null) {
      return priorVncFrame?.objectFrame?.va1MorphIdentityFrame || priorVncFrame?.selectedOutputLogicFrame?.outputFillers?.va1MorphIdentityFrame || null;
    }
    function getClassicalNahuatlLesson81FirstSound(value = "") {
      const normalized = normalizeClassicalNahuatlLesson7Stem(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const match = normalized.match(/[a-z]/u);
      return match ? match[0] : "";
    }
    function getClassicalNahuatlLesson81LastSound(value = "") {
      const normalized = normalizeClassicalNahuatlLesson7Stem(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const matches = normalized.match(/[a-z]/gu);
      return matches?.length ? matches[matches.length - 1] : "";
    }
    function isClassicalNahuatlLesson81VowelSound(sound = "") {
      return /^[aeio]$/u.test(String(sound || "").toLowerCase());
    }
    function getClassicalNahuatlLesson81Pers1Carrier(formula = "") {
      const match = String(formula || "").match(/^#(n|ni|no|t|ti|to|x|xi|xo)-0/u);
      return match ? match[1] : "";
    }
    function setClassicalNahuatlLesson81Pers1Carrier(formula = "", carrier = "") {
      if (!carrier) {
        return String(formula || "");
      }
      return String(formula || "").replace(/^#(?:n|ni|no|t|ti|to|x|xi|xo)-0/u, `#${carrier}-0`);
    }
    function getClassicalNahuatlLesson81Pers1CarrierFamily(carrier = "") {
      if (["n", "ni", "no"].includes(carrier)) {
        return {
          bare: "n",
          supportive: "ni",
          onSupportive: "no"
        };
      }
      if (["t", "ti", "to"].includes(carrier)) {
        return {
          bare: "t",
          supportive: "ti",
          onSupportive: "to"
        };
      }
      if (["x", "xi", "xo"].includes(carrier)) {
        return {
          bare: "x",
          supportive: "xi",
          onSupportive: "xo"
        };
      }
      return null;
    }
    function getClassicalNahuatlLesson81NextCarrierAfterPers1(formula = "") {
      const afterSubject = String(formula || "").replace(/^#(?:n|ni|no|t|ti|to|x|xi|xo)-0/u, "");
      if (!afterSubject) {
        return "";
      }
      if (afterSubject.startsWith("(")) {
        const stemMatch = afterSubject.match(/^\(([^)]*)\)/u);
        return stemMatch ? stemMatch[1] : "";
      }
      const slotMatch = afterSubject.match(/^\+([^+()]*)/u);
      return slotMatch ? slotMatch[1] : "";
    }
    function applyClassicalNahuatlLesson81Pers1FinalSupport({
      formula = "",
      actions = []
    } = {}) {
      const sourceFormula = String(formula || "");
      const carrier = getClassicalNahuatlLesson81Pers1Carrier(sourceFormula);
      const family = getClassicalNahuatlLesson81Pers1CarrierFamily(carrier);
      if (!family) {
        return {
          formula: sourceFormula,
          subjectCarrierBeforeFinalBoundary: carrier,
          finalSubjectCarrier: carrier,
          subjectSupportiveVowelAction: "not-applicable",
          nextCarrierAfterSubject: "",
          nextSoundAfterSubject: ""
        };
      }
      const nextCarrier = getClassicalNahuatlLesson81NextCarrierAfterPers1(sourceFormula);
      const nextSound = getClassicalNahuatlLesson81FirstSound(nextCarrier);
      const nextNeedsSupport = Boolean(nextSound && !isClassicalNahuatlLesson81VowelSound(nextSound));
      const finalCarrier = nextNeedsSupport ? family.supportive : family.bare;
      const realized = setClassicalNahuatlLesson81Pers1Carrier(sourceFormula, finalCarrier);
      if (realized !== sourceFormula) {
        actions.push(CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.REALIZE_PERS1_SUPPORT_AFTER_SLOT_ORDER);
      }
      return {
        formula: realized,
        subjectCarrierBeforeFinalBoundary: carrier,
        finalSubjectCarrier: finalCarrier,
        subjectSupportiveVowelAction: nextNeedsSupport ? "surface-i-before-following-consonant" : "drop-i-before-following-vowel",
        nextCarrierAfterSubject: nextCarrier,
        nextSoundAfterSubject: nextSound
      };
    }
    function getClassicalNahuatlLesson81SpecificObjectSlotFromFormula(formula = "") {
      const match = String(formula || "").match(/^#[^+()]+\+([^+()]+)(?:\+(?:on|huāl))?\(/u);
      return match ? match[1] : "";
    }
    function getClassicalNahuatlLesson81FormulaStemInitialAfterObject(formula = "") {
      const match = String(formula || "").match(/^#[^+()]+\+[^+()]+(?:\+(?:on|huāl))?\(([^)]*)\)/u);
      return match ? getClassicalNahuatlLesson81FirstSound(match[1]) : "";
    }
    function getClassicalNahuatlLesson81SoundBeforeObject(formula = "") {
      const carrier = getClassicalNahuatlLesson81Pers1Carrier(formula);
      if (!carrier) {
        return "";
      }
      return getClassicalNahuatlLesson81FirstSound(carrier.slice(-1));
    }
    function applyClassicalNahuatlLesson81ThirdPersonObjectFinalRealization({
      formula = "",
      selectedObjectSlot = "",
      objectMorphIdentityFrame = null,
      actions = []
    } = {}) {
      const sourceFormula = String(formula || "");
      const sourceObjectSlot = String(selectedObjectSlot || getClassicalNahuatlLesson81SpecificObjectSlotFromFormula(sourceFormula) || "");
      const thirdPersonKObject = objectMorphIdentityFrame?.morphIdentity === "/k/";
      if (!thirdPersonKObject || !sourceObjectSlot) {
        return {
          formula: sourceFormula,
          selectedObjectSlotBeforeFinalBoundary: sourceObjectSlot,
          finalObjectSlot: sourceObjectSlot,
          spellingSelectedAfterSlotOrder: "",
          pluralObjectVa2BeforeFinalBoundary: "",
          finalPluralObjectVa2: ""
        };
      }
      let realized = sourceFormula;
      let spellingSelectedAfterSlotOrder = "";
      let pluralObjectVa2BeforeFinalBoundary = "";
      let finalPluralObjectVa2 = "";
      if (String(objectMorphIdentityFrame.va2 || "") === "im" || /^qu-i[mn]$/u.test(sourceObjectSlot)) {
        const beforePlural = realized;
        pluralObjectVa2BeforeFinalBoundary = sourceObjectSlot.split("-")[1] || "";
        if (/\+qu-in\+on\(/u.test(realized)) {
          realized = realized.replace(/\+qu-in\+on\(/u, "+qu-im+on(");
          finalPluralObjectVa2 = "im";
        } else if (/\+qu-im\+huāl\(/u.test(realized)) {
          realized = realized.replace(/\+qu-im\+huāl\(/u, "+qu-in+huāl(");
          finalPluralObjectVa2 = "in";
        } else {
          finalPluralObjectVa2 = pluralObjectVa2BeforeFinalBoundary;
        }
        if (realized !== beforePlural) {
          actions.push(CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.REALIZE_THIRD_PLURAL_OBJECT_AFTER_DIRECTIONAL);
        }
        return {
          formula: realized,
          selectedObjectSlotBeforeFinalBoundary: sourceObjectSlot,
          finalObjectSlot: getClassicalNahuatlLesson81SpecificObjectSlotFromFormula(realized) || sourceObjectSlot,
          spellingSelectedAfterSlotOrder: "qu",
          pluralObjectVa2BeforeFinalBoundary,
          finalPluralObjectVa2
        };
      }
      const beforeSingular = realized;
      if (/\+(?:qu|qui)-0\+on\(/u.test(realized)) {
        realized = realized.replace(/\+(?:qu|qui)-0\+on\(/u, "+c-0+on(");
        spellingSelectedAfterSlotOrder = "c";
        actions.push("realize-third-singular-k-object-as-c-before-on");
      } else if (/\+(?:c|qu|qui)-0\+huāl\(/u.test(realized)) {
        const leftSound = getClassicalNahuatlLesson81SoundBeforeObject(realized);
        const leftVowel = isClassicalNahuatlLesson81VowelSound(leftSound);
        const finalVa1 = leftVowel ? "c" : "qui";
        realized = realized.replace(/\+(?:c|qu|qui)-0\+huāl\(/u, `+${finalVa1}-0+huāl(`);
        spellingSelectedAfterSlotOrder = finalVa1;
      } else if (/\+(?:c|qu|qui)-0\(/u.test(realized)) {
        const leftSound = getClassicalNahuatlLesson81SoundBeforeObject(realized);
        const rightSound = getClassicalNahuatlLesson81FormulaStemInitialAfterObject(realized);
        const finalVa1 = isClassicalNahuatlLesson81VowelSound(leftSound) || isClassicalNahuatlLesson81VowelSound(rightSound) ? rightSound === "e" || rightSound === "i" ? "qu" : "c" : "qui";
        realized = realized.replace(/\+(?:c|qu|qui)-0\(/u, `+${finalVa1}-0(`);
        spellingSelectedAfterSlotOrder = finalVa1;
      }
      if (realized !== beforeSingular) {
        actions.push(CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.REALIZE_THIRD_SINGULAR_OBJECT_AFTER_DIRECTIONAL);
      }
      return {
        formula: realized,
        selectedObjectSlotBeforeFinalBoundary: sourceObjectSlot,
        finalObjectSlot: getClassicalNahuatlLesson81SpecificObjectSlotFromFormula(realized) || sourceObjectSlot,
        spellingSelectedAfterSlotOrder,
        pluralObjectVa2BeforeFinalBoundary,
        finalPluralObjectVa2
      };
    }
    function applyClassicalNahuatlLesson81Pers1OBeforeCOn({
      formula = "",
      actions = []
    } = {}) {
      const sourceFormula = String(formula || "");
      const carrier = getClassicalNahuatlLesson81Pers1Carrier(sourceFormula);
      const family = getClassicalNahuatlLesson81Pers1CarrierFamily(carrier);
      if (!family || !/^#(?:n|ni|no|t|ti|to|x|xi|xo)-0\+c-0\+on/u.test(sourceFormula)) {
        return {
          formula: sourceFormula,
          pers1SupportiveIToOApplied: false
        };
      }
      const realized = setClassicalNahuatlLesson81Pers1Carrier(sourceFormula, family.onSupportive);
      if (realized !== sourceFormula) {
        actions.push(CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.REPLACE_PERS1_SUPPORTIVE_I_WITH_O);
      }
      return {
        formula: realized,
        pers1SupportiveIToOApplied: realized !== sourceFormula
      };
    }
    function getClassicalNahuatlLesson81NumberDyadFrame(priorVncFrame = null) {
      return priorVncFrame?.numberDyad || priorVncFrame?.selectedOutputLogicFrame?.outputFillers || null;
    }
    function parseClassicalNahuatlLesson81FinalPredicateNumber(formula = "") {
      const match = String(formula || "").match(/\(([^()]*)\)([^()+#]*)\+([^+#-]+)-([^#]+)#$/u);
      if (!match) {
        return {
          stem: "",
          tns: "",
          num1: "",
          num2: ""
        };
      }
      return {
        stem: normalizeClassicalNahuatlLesson7Stem(match[1] || ""),
        tns: String(match[2] || ""),
        num1: String(match[3] || ""),
        num2: String(match[4] || "")
      };
    }
    function isClassicalNahuatlLesson81SilentCarrier(value = "") {
      const normalized = String(value || "").trim();
      return !normalized || normalized === "0" || normalized === "Ø" || normalized === CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO;
    }
    function getClassicalNahuatlLesson81Num1LeftSound(parsed = {}) {
      if (!isClassicalNahuatlLesson81SilentCarrier(parsed.tns || "")) {
        return {
          source: "tns",
          carrier: parsed.tns || "",
          sound: getClassicalNahuatlLesson81LastSound(parsed.tns || "")
        };
      }
      return {
        source: "stem",
        carrier: parsed.stem || "",
        sound: getClassicalNahuatlLesson81LastSound(parsed.stem || "")
      };
    }
    function isClassicalNahuatlLesson81Num1KConnectorContext(parsed = {}, numberDyadFrame = null) {
      const rule = String(numberDyadFrame?.num1VariantRule || "").toLowerCase();
      const condition = String(numberDyadFrame?.condition || "").toLowerCase();
      if (condition === "future-preterit-indicative" || rule.includes("future") || rule.includes("preterit") || rule.includes("qui-after") || rule.includes("square-zero-replaces-obsolescent")) {
        return true;
      }
      if (rule.includes("optative") || rule.includes("admonitive")) {
        return false;
      }
      return parsed.num2 === "eh" && parsed.num1 === "qu";
    }
    function replaceClassicalNahuatlLesson81FinalNumberDyad(formula = "", num1 = "", num2 = "") {
      if (!num1 || !num2) {
        return String(formula || "");
      }
      return String(formula || "").replace(/(\([^()]*\)[^()+#]*)\+[^+#-]+-[^#]+#$/u, `$1+${num1}-${num2}#`);
    }
    function applyClassicalNahuatlLesson81Num1FinalRealization({
      formula = "",
      priorVncFrame = null,
      actions = []
    } = {}) {
      const sourceFormula = String(formula || "");
      const parsed = parseClassicalNahuatlLesson81FinalPredicateNumber(sourceFormula);
      const numberDyadFrame = getClassicalNahuatlLesson81NumberDyadFrame(priorVncFrame);
      const kConnectorContext = Boolean(parsed.num1 && parsed.num2 && isClassicalNahuatlLesson81Num1KConnectorContext(parsed, numberDyadFrame));
      const leftCarrier = getClassicalNahuatlLesson81Num1LeftSound(parsed);
      if (!kConnectorContext) {
        return {
          formula: sourceFormula,
          finalNum1RuleRefs: numberDyadFrame?.num1SupportiveVowelFrame?.ruleRefs || [],
          num1BeforeFinalBoundary: parsed.num1,
          finalNum1: parsed.num1,
          finalNum2: parsed.num2,
          finalNum1LeftCarrierSource: leftCarrier.source,
          finalNum1LeftSound: leftCarrier.sound,
          finalNum1RealizationApplies: false,
          finalNum1SupportiveVowelAction: "not-supportive",
          finalNum1SquareZeroReplacesQui: false
        };
      }
      let finalNum1 = parsed.num1;
      let supportiveAction = "not-needed";
      let squareZeroReplacesQui = false;
      if (parsed.num2 === "eh") {
        finalNum1 = "qu";
        supportiveAction = "not-needed-before-plural-eh";
      } else if (parsed.num2 === "0") {
        if (isClassicalNahuatlLesson81VowelSound(leftCarrier.sound)) {
          finalNum1 = "c";
          supportiveAction = "not-needed-after-vowel";
        } else {
          finalNum1 = CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO;
          supportiveAction = "suppress-supportive-qui-with-square-zero";
          squareZeroReplacesQui = true;
        }
      }
      const realized = replaceClassicalNahuatlLesson81FinalNumberDyad(sourceFormula, finalNum1, parsed.num2);
      actions.push(CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.REALIZE_NUM1_K_CONNECTOR_AFTER_FINAL_PREDICATE);
      return {
        formula: realized,
        finalNum1RuleRefs: numberDyadFrame?.num1SupportiveVowelFrame?.ruleRefs || [],
        num1BeforeFinalBoundary: parsed.num1,
        finalNum1,
        finalNum2: parsed.num2,
        finalNum1LeftCarrierSource: leftCarrier.source,
        finalNum1LeftSound: leftCarrier.sound,
        finalNum1RealizationApplies: true,
        finalNum1SupportiveVowelAction: supportiveAction,
        finalNum1SquareZeroReplacesQui: squareZeroReplacesQui
      };
    }
    function buildClassicalNahuatlLesson81LegacyStringBoundaryRealizationFrame({
      formula = "",
      expandedVncBoundaryFrame = null,
      objectRelationshipRuleFrame = null,
      priorVncFrame = null
    } = {}) {
      const sourceFormula = String(formula || "");
      const directionalPrefix = expandedVncBoundaryFrame?.directionalPrefix || "";
      const objectMorphIdentityFrame = getClassicalNahuatlLesson81ObjectMorphIdentityFrame(priorVncFrame);
      const selectedObjectSlot = objectRelationshipRuleFrame?.selectedObjectSlot || "";
      const placement = expandedVncBoundaryFrame?.directionalPlacement || "";
      const actions = [];
      let withDirectional = sourceFormula;
      let formulaAfterSlotOrder = sourceFormula;
      if (!sourceFormula) {
        return {
          kind: "classical-nahuatl-lesson8-final-boundary-realization-frame",
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
          legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
          inputFormula: sourceFormula,
          formulaRealization: sourceFormula,
          directionalPrefix,
          directionalPlacement: placement,
          objectMorphIdentityFrame,
          objectMorphIdentity: objectMorphIdentityFrame?.morphIdentity || "",
          finalBoundaryRealizationApplies: false,
          actions,
          finalObjectSlot: selectedObjectSlot,
          selectedObjectSlotBeforeFinalBoundary: selectedObjectSlot
        };
      }
      if (!directionalPrefix) {
        formulaAfterSlotOrder = sourceFormula;
      } else if (placement === "before-monadic-valence" || placement === "before-reflexive-reciprocal-valence") {
        formulaAfterSlotOrder = sourceFormula.replace("+", `+${directionalPrefix}+`);
      } else {
        formulaAfterSlotOrder = sourceFormula.replace("(", `+${directionalPrefix}(`);
      }
      withDirectional = formulaAfterSlotOrder;
      actions.push("assemble-slot-order-before-final-boundary-realization");
      actions.push(CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.REALIZE_FINAL_FORMULA_BOUNDARIES);
      const subjectRealization = applyClassicalNahuatlLesson81Pers1FinalSupport({
        formula: withDirectional,
        actions
      });
      withDirectional = subjectRealization.formula;
      const objectRealization = applyClassicalNahuatlLesson81ThirdPersonObjectFinalRealization({
        formula: withDirectional,
        selectedObjectSlot,
        objectMorphIdentityFrame,
        actions
      });
      withDirectional = objectRealization.formula;
      const supportiveORealization = applyClassicalNahuatlLesson81Pers1OBeforeCOn({
        formula: withDirectional,
        actions
      });
      withDirectional = supportiveORealization.formula;
      const num1Realization = applyClassicalNahuatlLesson81Num1FinalRealization({
        formula: withDirectional,
        priorVncFrame,
        actions
      });
      withDirectional = num1Realization.formula;
      const finalSubjectCarrier = getClassicalNahuatlLesson81Pers1Carrier(withDirectional) || subjectRealization.finalSubjectCarrier;
      const thirdSingularKObjectBeforeOn = Boolean(directionalPrefix === "on" && placement === "after-specific-projective-valence" && objectMorphIdentityFrame?.morphIdentity === "/k/" && String(objectMorphIdentityFrame?.va2 || "") === "0" && objectRealization.finalObjectSlot === "c-0");
      return {
        kind: "classical-nahuatl-lesson8-final-boundary-realization-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        inputFormula: sourceFormula,
        formulaAfterSlotOrder,
        formulaRealization: withDirectional,
        directionalPrefix,
        directionalPlacement: placement,
        objectMorphIdentityFrame,
        objectMorphIdentity: objectMorphIdentityFrame?.morphIdentity || "",
        objectMorphIdentityKind: objectMorphIdentityFrame?.morphIdentityKind || "",
        objectRegularSpellings: objectMorphIdentityFrame?.regularSpellings || [],
        objectSupportiveSpelling: objectMorphIdentityFrame?.supportiveSpelling || "",
        selectedObjectSlotBeforeFinalBoundary: objectRealization.selectedObjectSlotBeforeFinalBoundary,
        finalObjectSlot: objectRealization.finalObjectSlot,
        finalBoundaryRealizationApplies: true,
        thirdSingularKObjectBeforeOn,
        spellingSelectedAfterSlotOrder: objectRealization.spellingSelectedAfterSlotOrder,
        subjectCarrierBeforeFinalBoundary: subjectRealization.subjectCarrierBeforeFinalBoundary,
        finalSubjectCarrier,
        subjectSupportiveVowelAction: subjectRealization.subjectSupportiveVowelAction,
        nextCarrierAfterSubject: subjectRealization.nextCarrierAfterSubject,
        nextSoundAfterSubject: subjectRealization.nextSoundAfterSubject,
        pers1SupportiveIToOApplied: supportiveORealization.pers1SupportiveIToOApplied,
        pluralObjectVa2BeforeFinalBoundary: objectRealization.pluralObjectVa2BeforeFinalBoundary,
        finalPluralObjectVa2: objectRealization.finalPluralObjectVa2,
        num1BeforeFinalBoundary: num1Realization.num1BeforeFinalBoundary,
        finalNum1: num1Realization.finalNum1,
        finalNum2: num1Realization.finalNum2,
        finalNum1LeftCarrierSource: num1Realization.finalNum1LeftCarrierSource,
        finalNum1LeftSound: num1Realization.finalNum1LeftSound,
        finalNum1RealizationApplies: num1Realization.finalNum1RealizationApplies === true,
        finalNum1SupportiveVowelAction: num1Realization.finalNum1SupportiveVowelAction,
        finalNum1SquareZeroReplacesQui: num1Realization.finalNum1SquareZeroReplacesQui === true,
        finalNum1RuleRefs: num1Realization.finalNum1RuleRefs || [],
        supportiveVowelBelongsToObjectIdentity: false,
        actions
      };
    }
    function buildClassicalNahuatlLesson81FinalBoundaryRealizationFrame({
      vncSlotFrame = null,
      expandedVncBoundaryFrame = null,
      objectRelationshipRuleFrame = null,
      priorVncFrame = null
    } = {}) {
      const runtimeTarget = getClassicalNahuatlLesson7RuntimeTarget();
      const typedFrame = vncSlotFrame || priorVncFrame?.vncSlotFrame || null;
      if (typeof runtimeTarget?.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary === "function") {
        return runtimeTarget.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
          vncSlotFrame: typedFrame,
          expandedVncBoundaryFrame,
          objectRelationshipRuleFrame
        });
      }
      return {
        kind: "classical-nahuatl-lesson8-final-boundary-realization-frame",
        authorizationStatus: "blocked",
        blockReason: "typed-vnc-final-boundary-evaluator-unavailable",
        typedSlotAuthority: true,
        formulaStringAuthority: false,
        formulaRealization: "",
        actions: []
      };
    }
    function applyClassicalNahuatlLesson81DirectionalToFormula(formula = "", expandedVncBoundaryFrame = null) {
      return buildClassicalNahuatlLesson81FinalBoundaryRealizationFrame({
        formulaArtifact: formula,
        expandedVncBoundaryFrame
      }).formulaRealization;
    }
    function buildClassicalNahuatlLesson81ExpandedVncBoundaryFrame({
      stem = "",
      valence = "",
      mood = "indicative",
      tense = "",
      objectRelationshipRuleFrame = null,
      directionalPrefix = "",
      outsidePrefixes = [],
      caNegativeTrigger = "",
      hostileFormulaSlots = []
    } = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const normalizedMood = normalizeClassicalNahuatlLesson7Mood(mood);
      const normalizedTense = normalizeClassicalNahuatlLesson7Tense(tense);
      const normalizedDirectional = normalizeClassicalNahuatlLesson8DirectionalPrefix(directionalPrefix);
      const normalizedOutsidePrefixes = Array.from(new Set(outsidePrefixes.map(normalizeClassicalNahuatlLesson8OutsidePrefix).filter(Boolean)));
      const hostileSlots = getClassicalNahuatlLesson81HostileFormulaSlots({
        hostileLesson8FormulaSlots: hostileFormulaSlots
      });
      const hostileOutsideSlots = hostileSlots.filter(slot => normalizeClassicalNahuatlLesson8OutsidePrefix(slot));
      const boundaryApplies = Boolean(normalizedDirectional || normalizedOutsidePrefixes.length || hostileOutsideSlots.length);
      const directionalPlacement = normalizedDirectional ? getClassicalNahuatlLesson81DirectionalPlacement({
        valence,
        objectRelationshipRuleFrame
      }) : "";
      const directionalActions = !normalizedDirectional ? [] : [CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.PLACE_DIRECTIONAL_INSIDE_VNC_CORE, directionalPlacement === "before-intransitive-stem" ? CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.PLACE_DIRECTIONAL_BEFORE_STEM : directionalPlacement === "before-monadic-valence" ? CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.PLACE_DIRECTIONAL_BEFORE_MONADIC_VALENCE : directionalPlacement === "before-reflexive-reciprocal-valence" ? CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.PLACE_DIRECTIONAL_BEFORE_REFLEXIVE_RECIPROCAL : CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.PLACE_DIRECTIONAL_AFTER_SPECIFIC_PROJECTIVE];
      const antecessivePresent = normalizedOutsidePrefixes.includes("ō#");
      const antecessiveTenseAuthorized = !antecessivePresent || ["preterit", "distant-past", "imperfect", "past"].includes(normalizedTense);
      const caNegativePresent = normalizedOutsidePrefixes.includes("ca#");
      const normalizedCaNegativeTrigger = String(caNegativeTrigger || "").normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase().replace(/[#\s_-]/gu, "");
      const caNegativeTriggerAuthorized = !caNegativePresent || ["ma", "tla", "mah"].includes(normalizedCaNegativeTrigger);
      const negativePresent = normalizedOutsidePrefixes.includes("ah#") || caNegativePresent;
      const negativeAttractedToAntecessive = Boolean(antecessivePresent && negativePresent);
      const supportiveOContext = Boolean(normalizedDirectional === "on" && directionalPlacement === "after-specific-projective-valence" && isClassicalNahuatlLesson81ThirdSingularProjectiveOnObjectSlot(objectRelationshipRuleFrame?.selectedObjectSlot));
      const actions = [...directionalActions, ...(supportiveOContext ? [CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.REPLACE_PERS1_SUPPORTIVE_I_WITH_O] : []), ...(antecessivePresent ? [CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.KEEP_ANTECESSIVE_OUTSIDE_VNC, CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.PRESERVE_OBJECT_SHAPE_UNDER_OUTSIDE_PREFIX] : []), ...(negativePresent ? [CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.KEEP_NEGATIVE_OUTSIDE_VNC] : []), ...(negativeAttractedToAntecessive ? [CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.ATTRACT_NEGATIVE_TO_ANTECESSIVE] : []), ...(hostileOutsideSlots.length ? [CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.BLOCK_OUTSIDE_PREFIX_AS_FORMULA_SLOT] : []), CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS.CARRY_BOUNDARY_TO_SELECTED_OUTPUT];
      const blocked = hostileOutsideSlots.length > 0 || !antecessiveTenseAuthorized || !caNegativeTriggerAuthorized;
      return {
        kind: "classical-nahuatl-lesson8-expanded-vnc-boundary-frame",
        lesson: "Andrews Lesson 8",
        section: "8.1",
        ruleLogicRole: "expanded-vnc-boundary-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson81ExpandedVncRules(),
        boundaryApplies,
        stem: normalizedStem,
        mood: normalizedMood,
        tense: normalizedTense,
        valence: normalizeClassicalNahuatlLesson7Valence(valence),
        directionalPrefix: normalizedDirectional,
        directionalMeaning: normalizedDirectional === "on" ? "distance-thither-away-there" : normalizedDirectional === "huāl" ? "proximity-hither-here" : "",
        directionalInsideVncCore: Boolean(normalizedDirectional),
        directionalFormulaSlotAuthorized: Boolean(normalizedDirectional),
        directionalPlacement,
        vncInternalPrefixSlots: normalizedDirectional ? ["directional-locative"] : [],
        outsidePrefixes: normalizedOutsidePrefixes,
        vncExternalPrefixSlots: normalizedOutsidePrefixes.map(prefix => prefix === "ō#" ? "antecessive-order" : prefix === "ca#" ? "negative-ca" : "negative-ah"),
        antecessivePrefix: antecessivePresent ? "ō#" : "",
        antecessiveOutsideVnc: antecessivePresent,
        antecessiveTenseAuthorized,
        antecessiveBlockReason: antecessivePresent && !antecessiveTenseAuthorized ? "antecessive-prefix-requires-past-tense-vnc" : "",
        negativePrefixes: normalizedOutsidePrefixes.filter(prefix => prefix === "ah#" || prefix === "ca#"),
        negativeOutsideVnc: negativePresent,
        caNegativeTrigger: normalizedCaNegativeTrigger,
        caNegativeTriggerAuthorized,
        negativeAttractedToAntecessive,
        outsidePrefixesBecomeFormulaSlots: false,
        outsidePrefixFormulaSlotAuthorized: false,
        formulaSlotMaterialFromOutsidePrefixes: [],
        objectShapePreservedByOutsidePrefixes: true,
        objectSpellingAffectedByOutsidePrefixes: false,
        supportivePers1IToOContext: supportiveOContext,
        supportivePers1ISurfacePolicy: supportiveOContext ? "replace-i-with-o-before-c-on" : "",
        hostileFormulaSlots: hostileSlots,
        hostileRejectedFormulaSlots: hostileOutsideSlots,
        boundaryActions: Array.from(new Set(actions)),
        authorizationStatus: blocked ? "blocked" : "authorized",
        blockReason: hostileOutsideSlots.length ? "outside-prefix-cannot-be-vnc-formula-slot" : antecessivePresent && !antecessiveTenseAuthorized ? "antecessive-prefix-requires-past-tense-vnc" : caNegativePresent && !caNegativeTriggerAuthorized ? "ca-negative-prefix-requires-ma-tla-or-mah-trigger" : "",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function getClassicalNahuatlLesson82SentenceSurfaceRules() {
      return [{
        tagId: "cn-l8-82-86-sentence-surface",
        section: "8.2",
        transcriptionLineStart: 3434,
        transcriptionLineEnd: 3445,
        exactWitness: "A basic sentence is a simple affrrmative assertion; a transform sentence is any of the other kinds",
        ruleAction: "distinguish-basic-sentence-from-transform-sentence"
      }, {
        tagId: "cn-l8-83-simple-affirmative-assertion",
        section: "8.3",
        transcriptionLineStart: 3446,
        transcriptionLineEnd: 3460,
        exactWitness: "If it is a verbal nuclear clause, it must be in the indicative mode.",
        ruleAction: CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.REWRITE_INDICATIVE_VNC_AS_AFFIRMATIVE_ASSERTION
      }, {
        tagId: "cn-l8-84-negative-assertion",
        section: "8.4",
        transcriptionLineStart: 3462,
        transcriptionLineEnd: 3470,
        exactWitness: "An affirmative assertion can be converted into a negative assertion by adding the negative prefix ah#, \"not,\" to the VNC",
        ruleAction: CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.ADD_NEGATIVE_OUTSIDE_VNC
      }, {
        tagId: "cn-l8-85-emphatic-assertion-ca",
        section: "8.5",
        transcriptionLineStart: 3471,
        transcriptionLineEnd: 3481,
        exactWitness: "the emphatic particle ca, \"indeed,\" at the beginning of the sentence",
        ruleAction: CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.ADD_EMPHATIC_CA_TO_SENTENCE_LEFT_EDGE
      }, {
        tagId: "cn-l8-86-yes-no-question",
        section: "8.6",
        transcriptionLineStart: 3482,
        transcriptionLineEnd: 3501,
        exactWitness: "By inserting the interrogative particle cuix? \"perhaps? perchance?\" at the beginning of the sentence.",
        ruleAction: CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.ADD_CUIX_TO_SENTENCE_LEFT_EDGE
      }];
    }
    function normalizeClassicalNahuatlLesson8SentenceType(options = {}) {
      const raw = String(options.sentenceType || options.sentenceKind || options.assertionKind || "").trim();
      const normalized = raw.toLowerCase().replace(/[\s_]/gu, "-");
      if (options.yesNoQuestion === true || options.question === true || normalized === "yes-no-question" || normalized === "question") {
        return "yes-no-question";
      }
      if (options.emphatic === true || options.emphaticAssertion === true || normalized === "emphatic" || normalized === "emphatic-assertion") {
        return "emphatic-assertion";
      }
      if (options.negative === true || options.negativeAssertion === true || normalized === "negative" || normalized === "negative-assertion") {
        return "negative-assertion";
      }
      if (options.sentenceSurface === true || options.sentence === true || normalized === "affirmative" || normalized === "affirmative-assertion") {
        return "affirmative-assertion";
      }
      return "";
    }
    function normalizeClassicalNahuatlLesson9SentenceType(options = {}) {
      const raw = String(options.sentenceType || options.sentenceKind || options.wishKind || options.commandKind || options.speechAct || "").trim();
      const normalized = raw.toLowerCase().replace(/[\s_]/gu, "-");
      if (options.wishSentence === true || normalized === "wish" || normalized === "wish-sentence" || normalized === "affirmative-wish" || normalized === "negative-wish" || normalized === "negative-wish-sentence" || normalized === "optative-wish") {
        return "wish-sentence";
      }
      if (options.commandSentence === true || normalized === "command" || normalized === "direct-command" || normalized === "command-sentence" || normalized === "affirmative-command" || normalized === "negative-command" || normalized === "negative-command-sentence") {
        return "command-sentence";
      }
      if (options.exhortationSentence === true || normalized === "exhortation" || normalized === "exhortation-sentence" || normalized === "affirmative-exhortation" || normalized === "negative-exhortation" || normalized === "negative-exhortation-sentence") {
        return "exhortation-sentence";
      }
      return "";
    }
    function isClassicalNahuatlLesson9NegativeSentenceRequested(options = {}) {
      const raw = String(options.sentenceType || options.sentenceKind || options.speechAct || "").trim();
      const normalized = raw.toLowerCase().replace(/[\s_]/gu, "-");
      return options.negative === true || options.negativeWish === true || options.negativeCommand === true || options.negativeExhortation === true || normalized.startsWith("negative-") || normalized.includes("-negative-");
    }
    function normalizeClassicalNahuatlLesson9IntroductoryParticle(value = "") {
      const normalized = String(value || "").trim().normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase().replace(/[#\s_-]/gu, "");
      if (normalized === "ma" || normalized === "mah") {
        return "mā";
      }
      if (normalized === "tla") {
        return "tlā";
      }
      return "";
    }
    function getClassicalNahuatlLesson9IntroductoryParticle(options = {}) {
      return normalizeClassicalNahuatlLesson9IntroductoryParticle(options.introductoryParticle || options.introParticle || options.lesson9IntroductoryParticle || options.wishParticle || options.commandParticle || (options.useTlaIntroductoryParticle === true ? "tlā" : "") || (options.useMaIntroductoryParticle === true ? "mā" : ""));
    }
    function normalizeClassicalNahuatlLesson9PrefaceParticle(value = "") {
      const normalized = String(value || "").trim().normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase().replace(/[#\s_-]/gu, "");
      if (normalized === "ihyo") {
        return "ihyo";
      }
      if (normalized === "ye") {
        return "ye";
      }
      return "";
    }
    function normalizeClassicalNahuatlLesson9IntroductoryModifier(value = "") {
      const normalized = String(value || "").trim().normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase().replace(/[#\s_]/gu, "-").replace(/^-+|-+$/gu, "");
      if (normalized === "cuel") {
        return "cuēl";
      }
      if (normalized === "ye-cuel") {
        return "ye-cuēl";
      }
      if (normalized === "cuel-eh") {
        return "cuēl-eh";
      }
      if (normalized === "ye-cuel-eh") {
        return "ye-cuēl-eh";
      }
      if (normalized === "tel") {
        return "tēl";
      }
      if (normalized === "quin") {
        return "quin";
      }
      if (normalized === "nen") {
        return "nēn";
      }
      return "";
    }
    function getClassicalNahuatlLesson9PrefaceParticle(options = {}) {
      return normalizeClassicalNahuatlLesson9PrefaceParticle(options.prefaceParticle || options.lesson9PrefaceParticle || options.beforeIntroductoryParticle || "");
    }
    function getClassicalNahuatlLesson9IntroductoryModifier(options = {}) {
      return normalizeClassicalNahuatlLesson9IntroductoryModifier(options.introductoryModifier || options.lesson9IntroductoryModifier || options.afterIntroductoryModifier || "");
    }
    function isClassicalNahuatlLesson9PrefaceParticleAuthorized({
      particle = "",
      introductoryParticle = ""
    } = {}) {
      if (!particle) {
        return true;
      }
      if (particle === "ihyo") {
        return introductoryParticle === "mā" || introductoryParticle === "tlā";
      }
      if (particle === "ye") {
        return introductoryParticle === "tlā";
      }
      return false;
    }
    function isClassicalNahuatlLesson9IntroductoryModifierAuthorized({
      modifier = "",
      introductoryParticle = "",
      tense = ""
    } = {}) {
      if (!modifier) {
        return true;
      }
      if (["cuēl", "ye-cuēl", "cuēl-eh", "ye-cuēl-eh"].includes(modifier)) {
        return introductoryParticle === "mā" || introductoryParticle === "tlā";
      }
      if (modifier === "tēl") {
        return introductoryParticle === "mā";
      }
      if (modifier === "quin") {
        return introductoryParticle === "mā" && tense === "future";
      }
      return false;
    }
    function isClassicalNahuatlLesson10NenAuthorized({
      modifier = "",
      negative = false
    } = {}) {
      if (!modifier) {
        return !negative;
      }
      return modifier === "nēn";
    }
    function getClassicalNahuatlLesson9SubjectPersonClass(options = {}) {
      const subject = String(options.subject || options.subjectPerson || options.subj || "").trim().toLowerCase();
      if (subject.startsWith("2")) {
        return "second-person";
      }
      if (subject.startsWith("1")) {
        return "first-person";
      }
      if (subject.startsWith("3")) {
        return "third-person";
      }
      return "";
    }
    function deriveClassicalNahuatlLesson9SentenceTypeFromMood({
      explicitSentenceType = "",
      mood = "",
      tense = "",
      introductoryParticle = "",
      introductoryModifier = "",
      subjectPersonClass = ""
    } = {}) {
      if (explicitSentenceType) {
        return explicitSentenceType;
      }
      if (mood === "optative") {
        if (introductoryModifier === "tēl" || introductoryModifier === "quin") {
          return "command-sentence";
        }
        if (tense === "future" && introductoryParticle && subjectPersonClass === "second-person") {
          return "command-sentence";
        }
        if (subjectPersonClass === "second-person" && !introductoryParticle && (!tense || tense === "nonpast")) {
          return "command-sentence";
        }
        return "wish-sentence";
      }
      return "";
    }
    function getClassicalNahuatlLesson9CanvasSentenceRole(sentenceType = "", subjectPersonClass = "") {
      if (sentenceType === "wish-sentence") {
        return "wish";
      }
      if (!["command-sentence", "exhortation-sentence"].includes(sentenceType)) {
        return "";
      }
      if (subjectPersonClass === "second-person") {
        return "direct-command";
      }
      if (subjectPersonClass === "third-person") {
        return "indirect-command";
      }
      if (subjectPersonClass === "first-person") {
        return "exhortation";
      }
      return "command-or-exhortation";
    }
    function getClassicalNahuatlLesson9CanvasSentenceRoleNotice(sentenceRole = "", subjectPersonClass = "") {
      if (sentenceRole === "direct-command") {
        return "Canvas derives direct command from a second-person subject";
      }
      if (sentenceRole === "indirect-command") {
        return "Canvas derives indirect command from a third-person subject";
      }
      if (sentenceRole === "exhortation") {
        return "Canvas derives exhortation from a first-person subject";
      }
      if (sentenceRole === "wish") {
        return "Canvas keeps this as a wish sentence";
      }
      return subjectPersonClass ? "Canvas derives the sentence role from subject person" : "";
    }
    function getClassicalNahuatlLesson10CanvasSentenceRole(subjectPersonClass = "") {
      if (subjectPersonClass === "second-person") {
        return "direct-admonition";
      }
      if (subjectPersonClass === "third-person") {
        return "indirect-admonition";
      }
      if (subjectPersonClass === "first-person") {
        return "admonitive-exhortation";
      }
      return "admonition";
    }
    function getClassicalNahuatlLesson10CanvasSentenceRoleNotice(sentenceRole = "") {
      if (sentenceRole === "direct-admonition") {
        return "Canvas compares second-person admonition to a direct command, but it remains admonitive warning";
      }
      if (sentenceRole === "indirect-admonition") {
        return "Canvas compares third-person admonition to an indirect command, but it remains admonitive warning";
      }
      if (sentenceRole === "admonitive-exhortation") {
        return "Canvas compares first-person admonition to exhortation, but it remains admonitive warning";
      }
      return "Canvas treats the sentence as warning, advice, or admonition";
    }
    function getClassicalNahuatlLesson10SubjectNumberClass(options = {}) {
      const subject = normalizeClassicalNahuatlLesson7Subject(options.subject || options.subjectPerson || "");
      return subject.endsWith("pl") ? "plural" : "singular";
    }
    function getClassicalNahuatlLesson10ContrastReadingRequest(options = {}) {
      const normalized = normalizeClassicalNahuatlLesson7Token(options.admonitiveContrastReading || options.contrastReading || options.requestedContrastReading || "");
      const aliases = {
        "": "",
        admonitive: "admonitive",
        optative: "nonpast-optative",
        "nonpast-optative": "nonpast-optative",
        present: "present-indicative",
        "present-indicative": "present-indicative",
        preterit: "preterit-indicative",
        "preterit-indicative": "preterit-indicative",
        "preterite-indicative": "preterit-indicative",
        "preterit-optative": "preterit-optative",
        "opposite-meaning": "opposite-meaning"
      };
      return aliases[normalized] || normalized;
    }
    function getClassicalNahuatlLesson10ClassContrastProfile({
      classId = "",
      subjectPersonClass = "",
      subjectNumberClass = ""
    } = {}) {
      const normalizedClassId = String(classId || "").trim().toUpperCase();
      const firstOrThirdSingular = subjectNumberClass === "singular" && (subjectPersonClass === "first-person" || subjectPersonClass === "third-person");
      const profileByClass = {
        A: {
          classContrastKind: "class-a-admonitive-optative-present-preterit-contrast",
          optativeContrast: "admonitive-and-nonpast-optative-distinctive-all-forms",
          presentIndicativeContrast: "first-third-plural-present-can-superficially-match-second-third-singular-admonitive",
          preteritIndicativeContrast: "preterit-indicative-contrasted-in-paradigm-and-by-sentence-layer",
          glottalStopAmbiguityWarning: firstOrThirdSingular,
          glottalStopAmbiguityScope: firstOrThirdSingular ? "first-and-third-person-singular-if-glottal-stop-not-represented" : "",
          hMorphRoleContrast: "h-is-tense-morph-in-admonitive-but-num1-filler-in-present-indicative"
        },
        B: {
          classContrastKind: "class-b-admonitive-optative-preterit-contrast",
          optativeContrast: "admonitive-clearly-distinguished-from-optative-in-all-vncs",
          presentIndicativeContrast: "first-third-singular-present-indicative-and-nonpast-optative-identical-but-ma-distinguishes-optative",
          preteritIndicativeContrast: "singular-admonitive-identical-to-singular-preterit-indicative-but-ma-distinguishes-admonitive",
          glottalStopAmbiguityWarning: false,
          glottalStopAmbiguityScope: "",
          hMorphRoleContrast: ""
        },
        C: {
          classContrastKind: "class-c-admonitive-optative-preterit-contrast",
          optativeContrast: "admonitive-and-nonpast-optative-distinctive-all-forms",
          presentIndicativeContrast: "present-indicative-contrasted-by-vnc-shape-and-sentence-layer",
          preteritIndicativeContrast: "singular-admonitive-identical-to-singular-preterit-indicative-but-ma-distinguishes-admonitive",
          glottalStopAmbiguityWarning: firstOrThirdSingular,
          glottalStopAmbiguityScope: firstOrThirdSingular ? "first-and-third-person-singular-if-glottal-stop-not-represented" : "",
          hMorphRoleContrast: ""
        },
        D: {
          classContrastKind: "class-d-admonitive-optative-present-preterit-contrast",
          optativeContrast: "singular-admonitive-and-nonpast-optative-distinguished-by-glottal-stop",
          presentIndicativeContrast: "present-indicative-contrasted-in-paradigm-and-by-sentence-layer",
          preteritIndicativeContrast: "preterit-indicative-contrasted-in-paradigm-and-by-sentence-layer",
          glottalStopAmbiguityWarning: firstOrThirdSingular,
          glottalStopAmbiguityScope: firstOrThirdSingular ? "first-and-third-person-singular-if-glottal-stop-not-represented" : "",
          hMorphRoleContrast: ""
        }
      };
      return profileByClass[normalizedClassId] || {
        classContrastKind: "admonitive-contrast-profile-unclassified",
        optativeContrast: "",
        presentIndicativeContrast: "",
        preteritIndicativeContrast: "",
        glottalStopAmbiguityWarning: false,
        glottalStopAmbiguityScope: "",
        hMorphRoleContrast: ""
      };
    }
    function getClassicalNahuatlLesson9WishCommandSentenceRules() {
      return [{
        tagId: "cn-l9-95-99-optative-wish-command-sentence-layer",
        section: "9.5-9.9",
        transcriptionLineStart: 3595,
        transcriptionLineEnd: 3728,
        exactWitness: "Mā nicochi.",
        ruleAction: "finalize-optative-wish-command-at-highest-active-sentence-layer"
      }, {
        tagId: "cn-l9-95-affirmative-wish-introductory-particle",
        section: "9.5",
        transcriptionLineStart: 3595,
        transcriptionLineEnd: 3602,
        exactWitness: "By substituting an optative VNC for an indicative one and inserting the introductory particle mā",
        ruleAction: CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.ADD_INTRODUCTORY_PARTICLE_OUTSIDE_VNC
      }, {
        tagId: "cn-l9-97-command-introductory-particle-condition",
        section: "9.7",
        transcriptionLineStart: 3664,
        transcriptionLineEnd: 3679,
        exactWitness: "The particle mā or tlā is obligatory if the nonpast-optative VNC has a first- or third-person subject. When the subject is second person, however, the particle may be omitted",
        ruleAction: CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.REQUIRE_INTRODUCTORY_PARTICLE_FOR_FIRST_THIRD
      }, {
        tagId: "cn-l9-97-command-exhortation-role-by-subject",
        section: "9.7",
        transcriptionLineStart: 3667,
        transcriptionLineEnd: 3669,
        exactWitness: "A wish sentence with a second-person subject may express a direct command, one with a third-person subject an indirect command ... and one with a first-person subject an exhortation.",
        ruleAction: CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.DERIVE_COMMAND_EXHORTATION_ROLE_FROM_SUBJECT
      }, {
        tagId: "cn-l9-96-negative-wish-ca-prefix",
        section: "9.6",
        transcriptionLineStart: 3645,
        transcriptionLineEnd: 3662,
        exactWitness: "inserting the introductory\nparticle mā or tlā, and changing the negative prefix from ah# to ca#",
        ruleAction: CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.CHANGE_NEGATIVE_AH_TO_CA_WITH_INTRODUCTORY_PARTICLE
      }, {
        tagId: "cn-l9-98-future-command-indicative-as-optative",
        section: "9.8",
        transcriptionLineStart: 3706,
        transcriptionLineEnd: 3713,
        exactWitness: "a future-optative VNC\nand a future-indicative VNC are identical in every respect",
        ruleAction: CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.ACCEPT_FUTURE_INDICATIVE_AS_OPTATIVE
      }, {
        tagId: "cn-l9-99-negative-command-brusque-ah",
        section: "9.9",
        transcriptionLineStart: 3714,
        transcriptionLineEnd: 3728,
        exactWitness: "since the mā that is the prerequisite for the negative prefix\nca# is absent, the negative prefix ah# must be used",
        ruleAction: CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.KEEP_AH_FOR_BRUSQUE_NEGATIVE_COMMAND_WITHOUT_MA
      }, {
        tagId: "cn-l9-layer-highest-active-finalizer",
        section: "9.5-9.9",
        transcriptionLineStart: 3595,
        transcriptionLineEnd: 3728,
        exactWitness: "one uses a wish sentence containing a nonpast-optative VNC",
        ruleAction: CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.MARK_LOWER_VNC_PROVISIONAL
      }];
    }
    function getClassicalNahuatlLesson10AdmonitionSentenceRules() {
      return [{
        tagId: "cn-l10-101-admonitive-not-negative",
        section: "10.1",
        transcriptionLineStart: 3733,
        transcriptionLineEnd: 3756,
        exactWitness: "A VNC in the admonitive mood does NOT prohibit or forbid. It is NOT negative either in shape or meaning.",
        ruleAction: "keep-admonitive-as-positive-warning-not-vetitive"
      }, {
        tagId: "cn-l10-102-nonpast-admonitive-perfective-stem",
        section: "10.2",
        transcriptionLineStart: 3756,
        transcriptionLineEnd: 3772,
        exactWitness: "VNCs manifesting it are formed on a perfective stem.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.REQUIRE_NONPAST_PERFECTIVE_STEM
      }, {
        tagId: "cn-l10-103-substitute-admonitive-vnc-for-present-indicative",
        section: "10.3",
        transcriptionLineStart: 3773,
        transcriptionLineEnd: 3777,
        exactWitness: "By substituting an admonitive VNC for a present indicative VNC and inserting the introductory particle mā, an affirmative assertion sentence is converted into a sentence expressing a warning or admonition.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.SUBSTITUTE_ADMONITIVE_FOR_PRESENT_INDICATIVE
      }, {
        tagId: "cn-l10-103-ma-obligatory-admonition",
        section: "10.3",
        transcriptionLineStart: 3773,
        transcriptionLineEnd: 3777,
        exactWitness: "The particle mā is obligatory.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.ADD_MA_OUTSIDE_VNC
      }, {
        tagId: "cn-l10-103-ma-begins-admonition-sentence",
        section: "10.3",
        transcriptionLineStart: 3773,
        transcriptionLineEnd: 3777,
        exactWitness: "The particle mā must occur at the beginning of the admonition sentence.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.REQUIRE_MA_SENTENCE_BEGINNING
      }, {
        tagId: "cn-l10-103-optional-ma-nen",
        section: "10.3",
        transcriptionLineStart: 3775,
        transcriptionLineEnd: 3824,
        exactWitness: "It may optionally be strengthened by the adverbialized NNC nēn",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.ADD_NEN_OUTSIDE_VNC
      }, {
        tagId: "cn-l10-103-nen-adverbialized-nnc",
        section: "10.3",
        transcriptionLineStart: 3775,
        transcriptionLineEnd: 3777,
        exactWitness: "It may optionally be strengthened by the adverbialized NNC nēn, \"in vain, uselessly\"",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_NEN_ADVERBIALIZED_NNC
      }, {
        tagId: "cn-l10-103-manen-traditional-solid-spelling",
        section: "10.3",
        transcriptionLineStart: 3775,
        transcriptionLineEnd: 3777,
        exactWitness: "mā and nēn, which are here written separately, are traditionally written solid: manen.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_MANEN_TRADITIONAL_SOLID_SPELLING
      }, {
        tagId: "cn-l10-103-subject-person-admonition-comparison",
        section: "10.3",
        transcriptionLineStart: 3777,
        transcriptionLineEnd: 3781,
        exactWitness: "The admonition sentence with a second-person subject is like a direct command ... with a third-person subject it is like an indirect command ... and with a first-person subject it is like an exhortation",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.DERIVE_ADMONITION_ROLE_FROM_SUBJECT
      }, {
        tagId: "cn-l10-103-warning-renderings-not-example-whitelist",
        section: "10.3",
        transcriptionLineStart: 3781,
        transcriptionLineEnd: 3785,
        exactWitness: "the translations need not be limited to the ones in these examples; any rendering that conveys a sense of warning is valid",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.AUTHORIZE_WARNING_RENDERINGS
      }, {
        tagId: "cn-l10-104-negative-assertion-transformation",
        section: "10.4",
        transcriptionLineStart: 3830,
        transcriptionLineEnd: 3834,
        exactWitness: "A sentence expressing a negative admonition ... results from a transformation of a negative assertion containing a present indicative VNC.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.TRANSFORM_NEGATIVE_ASSERTION_TO_NEGATIVE_ADMONITION
      }, {
        tagId: "cn-l10-104-positive-vetative-not-authority-label",
        section: "10.4",
        transcriptionLineStart: 3830,
        transcriptionLineEnd: 3832,
        exactWitness: "traditionally called by the unfortunate term \"positive vetative\"",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.REJECT_POSITIVE_VETATIVE_TERM_AUTHORITY
      }, {
        tagId: "cn-l10-104-ah-affixed-to-admonitive-vnc",
        section: "10.4",
        transcriptionLineStart: 3832,
        transcriptionLineEnd: 3835,
        exactWitness: "The negative prefix ah# is affixed to the admonitive VNC",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.AFFIX_AH_TO_ADMONITIVE_VNC
      }, {
        tagId: "cn-l10-104-negative-admonition-ah-ma-nen",
        section: "10.4",
        transcriptionLineStart: 3830,
        transcriptionLineEnd: 3854,
        exactWitness: "The negative prefix ah# is affixed to the admonitive VNC, and the collocation mā nen obligatorily introduces the sentence.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.REQUIRE_MA_NEN_FOR_NEGATIVE_ADMONITION
      }, {
        tagId: "cn-l10-104-negative-admonition-cancels-warning",
        section: "10.4",
        transcriptionLineStart: 3835,
        transcriptionLineEnd: 3837,
        exactWitness: "The negative admonition sentence expresses a cancellation of a warning. It is a recommendation to reject caution.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_NEGATIVE_ADMONITION_CANCELS_WARNING
      }, {
        tagId: "cn-l10-105-admonitive-contrast-layer",
        section: "10.5",
        transcriptionLineStart: 3856,
        transcriptionLineEnd: 3985,
        exactWitness: "the following paradigms summarize the contrasts between the admonitive, the nonpast optative, the present indicative, and the preterit indicative VNCs.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_ADMONITIVE_OPTATIVE_PRESENT_PRETERIT_CONTRASTS
      }, {
        tagId: "cn-l10-105-second-person-x-xi-optative-distinction",
        section: "10.5",
        transcriptionLineStart: 3859,
        transcriptionLineEnd: 3862,
        exactWitness: "The pers1 morphs x and xi always distinguish a second-person optative VNC from an admonitive VNC.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_SECOND_PERSON_X_XI_OPTATIVE_DISTINCTION
      }, {
        tagId: "cn-l10-105-plural-subjects-always-distinctive",
        section: "10.5",
        transcriptionLineStart: 3862,
        transcriptionLineEnd: 3863,
        exactWitness: "The VNCs with plural subjects are always distinctive.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_PLURAL_SUBJECTS_ALWAYS_DISTINCTIVE
      }, {
        tagId: "cn-l10-105-ma-distinguishes-admonitive-layer",
        section: "10.5",
        transcriptionLineStart: 3871,
        transcriptionLineEnd: 3933,
        exactWitness: "the latter are distinguished by the presence of mā",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_MA_AS_ADMONITIVE_SENTENCE_DISTINGUISHER
      }, {
        tagId: "cn-l10-105-glottal-stop-omission-ambiguity",
        section: "10.5",
        transcriptionLineStart: 3871,
        transcriptionLineEnd: 3985,
        exactWitness: "In texts that do not represent the glottal stop, however, care must be taken",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_GLOTTAL_STOP_AMBIGUITY_WARNING
      }, {
        tagId: "cn-l10-105-h-tense-vs-num1-role-contrast",
        section: "10.5",
        transcriptionLineStart: 3878,
        transcriptionLineEnd: 3881,
        exactWitness: "the h suffix is a tense morph in the admonitive and a num1 filler in the present indicative.",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_H_TENSE_VS_NUM1_ROLE_CONTRAST
      }, {
        tagId: "cn-l10-105-antecessive-cannot-occur-with-admonitive",
        section: "10.5",
        transcriptionLineStart: 3905,
        transcriptionLineEnd: 3910,
        exactWitness: "that particle cannot occur with the admonitive (as it is a nonpast tense).",
        ruleAction: CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.BLOCK_ANTECESSIVE_WITH_ADMONITIVE
      }];
    }
    function normalizeClassicalNahuatlLesson8QuestionMode(options = {}) {
      const normalized = String(options.questionMode || options.interrogativeMode || "").trim().toLowerCase();
      if (normalized === "cuix" || normalized === "particle") {
        return "cuix";
      }
      if (normalized === "intonation" || normalized === "punctuation") {
        return "intonation";
      }
      return options.interrogativeParticle === "cuix" || options.cuix === true ? "cuix" : "intonation";
    }
    function getClassicalNahuatlLesson8SentenceHostileFormulaSlots(options = {}) {
      return Array.from(new Set([...(Array.isArray(options.hostileSentenceFormulaSlots) ? options.hostileSentenceFormulaSlots : []), ...(Array.isArray(options.hostileSentenceParticleFormulaSlots) ? options.hostileSentenceParticleFormulaSlots : [])].map(slot => String(slot || "").trim()).filter(Boolean)));
    }
    function buildClassicalNahuatlLesson8SentencePrefixalStack({
      sentenceParticles = [],
      expandedVncBoundaryFrame = null
    } = {}) {
      const normalizedSentenceParticles = Array.isArray(sentenceParticles) ? sentenceParticles.map(particle => {
        const raw = String(particle || "").trim();
        if (raw === "ca" || raw === "cuix" || raw === "cuix?") {
          return "";
        }
        return normalizeClassicalNahuatlLesson8OutsidePrefix(raw);
      }).filter(Boolean) : [];
      const outsidePrefixes = Array.isArray(expandedVncBoundaryFrame?.outsidePrefixes) ? expandedVncBoundaryFrame.outsidePrefixes.map(normalizeClassicalNahuatlLesson8OutsidePrefix).filter(Boolean) : [];
      const prefixes = Array.from(new Set([...outsidePrefixes, ...normalizedSentenceParticles]));
      const negativePrefix = prefixes.includes("ca#") ? "ca#" : prefixes.includes("ah#") ? "ah#" : "";
      return [negativePrefix, prefixes.includes("ō#") ? "ō#" : ""].filter(Boolean);
    }
    function buildClassicalNahuatlLesson82SentenceSurfaceFrame({
      selectedFormula = "",
      mood = "indicative",
      expandedVncBoundaryFrame = null,
      priorVncFrame = null,
      predicateFormationRuleFrame = null,
      options = {}
    } = {}) {
      const normalizedMood = normalizeClassicalNahuatlLesson7Mood(mood);
      const lesson11Construction = String(options.construction || options.lesson11Construction || "").trim();
      const lesson11ConstructionParticles = lesson11Construction === "quēn-mach" ? ["quēn", "mach"] : lesson11Construction === "quēn" ? ["quēn"] : [];
      const normalizedTense = normalizeClassicalNahuatlLesson7Tense(options.tense || options.sentenceTense || "", normalizedMood);
      const requestedTenseToken = normalizeClassicalNahuatlLesson7Token(options.tense || options.sentenceTense || "");
      const requestedTenseCanonical = {
        "": "nonpast",
        "non-past": "nonpast",
        nonpast: "nonpast",
        future: "future",
        futuro: "future",
        past: "past",
        pasado: "past",
        preterit: "preterit",
        preterito: "preterit",
        "pretérito": "preterit",
        present: "present",
        presente: "present"
      }[requestedTenseToken] || requestedTenseToken || "nonpast";
      const subjectPersonClass = getClassicalNahuatlLesson9SubjectPersonClass(options);
      const subjectNumberClass = getClassicalNahuatlLesson10SubjectNumberClass(options);
      const explicitLesson9SentenceType = normalizeClassicalNahuatlLesson9SentenceType(options);
      const introductoryParticleForDerivation = getClassicalNahuatlLesson9IntroductoryParticle(options);
      const requestedLesson9PrefaceParticle = getClassicalNahuatlLesson9PrefaceParticle(options);
      const requestedLesson9IntroductoryModifier = getClassicalNahuatlLesson9IntroductoryModifier(options);
      const lesson9PrefaceParticleAuthorized = isClassicalNahuatlLesson9PrefaceParticleAuthorized({
        particle: requestedLesson9PrefaceParticle,
        introductoryParticle: introductoryParticleForDerivation
      });
      const lesson9IntroductoryModifierAuthorized = isClassicalNahuatlLesson9IntroductoryModifierAuthorized({
        modifier: requestedLesson9IntroductoryModifier,
        introductoryParticle: introductoryParticleForDerivation,
        tense: normalizedTense
      });
      const lesson9PrefaceParticleForDerivation = lesson9PrefaceParticleAuthorized ? requestedLesson9PrefaceParticle : "";
      const lesson9IntroductoryModifierForDerivation = lesson9IntroductoryModifierAuthorized ? requestedLesson9IntroductoryModifier : "";
      const lesson10Applies = normalizedMood === "admonitive";
      const lesson10NegativeRequested = Boolean(lesson10Applies && isClassicalNahuatlLesson9NegativeSentenceRequested(options));
      const requestedLesson10Nen = requestedLesson9IntroductoryModifier === "nēn" || lesson10NegativeRequested ? "nēn" : "";
      const lesson10NenAuthorized = isClassicalNahuatlLesson10NenAuthorized({
        modifier: requestedLesson10Nen,
        negative: lesson10NegativeRequested
      });
      const lesson10Nen = lesson10NenAuthorized ? requestedLesson10Nen : "";
      const requestedLesson10TranslationReadingToken = lesson10Applies ? normalizeClassicalNahuatlLesson7Token(options.admonitiveTranslationReading || options.translationReading || options.requestedTranslationReading || "") : "";
      const lesson10RequestedTranslationReading = {
        "": lesson10NegativeRequested ? "reject-caution-sense" : "warning-sense",
        warning: "warning-sense",
        "warning-sense": "warning-sense",
        caution: "warning-sense",
        advice: "warning-sense",
        beware: "warning-sense",
        careful: "warning-sense",
        "watch-out": "warning-sense",
        "take-care": "warning-sense",
        "reject-caution": "reject-caution-sense",
        "reject-caution-sense": "reject-caution-sense",
        "cancel-warning": "reject-caution-sense",
        cancellation: "reject-caution-sense",
        "be-sure": "reject-caution-sense",
        "be-sure-to": "reject-caution-sense",
        "by-all-means": "reject-caution-sense",
        dont: "dont-negative-command",
        "don't": "dont-negative-command",
        "do-not": "dont-negative-command",
        "negative-command": "dont-negative-command",
        "may-not": "may-not-wish",
        "may-not-wish": "may-not-wish",
        wish: "may-not-wish"
      }[requestedLesson10TranslationReadingToken] || requestedLesson10TranslationReadingToken || (lesson10NegativeRequested ? "reject-caution-sense" : "warning-sense");
      const lesson10RequestedTranslationReadingAuthorized = Boolean(!lesson10Applies || (lesson10NegativeRequested ? lesson10RequestedTranslationReading === "reject-caution-sense" : lesson10RequestedTranslationReading === "warning-sense"));
      const lesson9SentenceType = deriveClassicalNahuatlLesson9SentenceTypeFromMood({
        explicitSentenceType: explicitLesson9SentenceType,
        mood: normalizedMood,
        tense: normalizedTense,
        introductoryParticle: introductoryParticleForDerivation,
        introductoryModifier: lesson9IntroductoryModifierForDerivation,
        subjectPersonClass
      });
      const lesson10SentenceType = lesson10Applies ? "admonition-sentence" : "";
      const lesson8SentenceType = lesson9SentenceType || lesson10SentenceType ? "" : normalizeClassicalNahuatlLesson8SentenceType(options);
      const sentenceType = lesson10SentenceType || lesson9SentenceType || lesson8SentenceType;
      const lesson8Applies = Boolean(lesson8SentenceType);
      const lesson9Applies = Boolean(lesson9SentenceType);
      const lesson9Or10Applies = lesson9Applies || lesson10Applies;
      const applies = Boolean(sentenceType);
      const questionMode = lesson8SentenceType === "yes-no-question" ? normalizeClassicalNahuatlLesson8QuestionMode(options) : "";
      const lesson9CanvasSentenceRole = getClassicalNahuatlLesson9CanvasSentenceRole(lesson9SentenceType, subjectPersonClass);
      const lesson9RoleDerivedFromSubject = Boolean(lesson9Applies && ["command-sentence", "exhortation-sentence"].includes(lesson9SentenceType));
      const lesson9CanvasSentenceRoleNotice = getClassicalNahuatlLesson9CanvasSentenceRoleNotice(lesson9CanvasSentenceRole, subjectPersonClass);
      const lesson9IntroductoryParticle = lesson9Applies ? introductoryParticleForDerivation : "";
      const lesson9IntroductoryParticlePresent = Boolean(lesson9IntroductoryParticle);
      const lesson9PrefaceParticle = lesson9Applies ? lesson9PrefaceParticleForDerivation : "";
      const lesson9IntroductoryModifier = lesson9Applies ? lesson9IntroductoryModifierForDerivation : "";
      const lesson9FutureIndicativeAsOptative = Boolean(lesson9Applies && normalizedMood === "optative" && normalizedTense === "future");
      const lesson9IntroductoryParticleOmissionAllowed = Boolean(lesson9Applies && lesson9SentenceType === "command-sentence" && subjectPersonClass === "second-person" && normalizedMood === "optative" && (!normalizedTense || normalizedTense === "nonpast"));
      const lesson9IntroductoryParticleRequired = Boolean(lesson9Applies && !lesson9IntroductoryParticleOmissionAllowed);
      const lesson9IntroductoryParticleSatisfied = Boolean(!lesson9Applies || lesson9IntroductoryParticlePresent || lesson9IntroductoryParticleOmissionAllowed);
      const lesson9OptativeVncPresent = Boolean(!lesson9Applies || normalizedMood === "optative" || lesson9FutureIndicativeAsOptative);
      const lesson10AdmonitiveVncPresent = Boolean(!lesson10Applies || normalizedMood === "admonitive");
      const lesson10RequestedTenseAuthorized = Boolean(!lesson10Applies || requestedTenseCanonical === "nonpast");
      const lesson10NonpastTensePresent = Boolean(!lesson10Applies || normalizedTense === "nonpast" && lesson10RequestedTenseAuthorized);
      const lesson10StemAspect = lesson10Applies ? predicateFormationRuleFrame?.aspect || "" : "";
      const lesson10PerfectiveStemPresent = Boolean(!lesson10Applies || lesson10StemAspect === "perfective");
      const lesson10ClassId = lesson10Applies ? String(predicateFormationRuleFrame?.classId || priorVncFrame?.tenseFrame?.verbClass || "").trim().toUpperCase() : "";
      const lesson10ClassContrastProfile = lesson10Applies ? getClassicalNahuatlLesson10ClassContrastProfile({
        classId: lesson10ClassId,
        subjectPersonClass,
        subjectNumberClass
      }) : {};
      const requestedLesson10ContrastReading = lesson10Applies ? getClassicalNahuatlLesson10ContrastReadingRequest(options) : "";
      const lesson10ContrastReadingAuthorized = Boolean(!lesson10Applies || !requestedLesson10ContrastReading || requestedLesson10ContrastReading === "admonitive");
      const lesson10TenseMorph = lesson10Applies ? priorVncFrame?.tenseFrame?.tns || "" : "";
      const lesson10NumberDyad = lesson10Applies ? priorVncFrame?.numberDyad || {} : {};
      const lesson10CurrentNumberDyad = lesson10Applies ? `${lesson10NumberDyad.num1 || ""}-${lesson10NumberDyad.num2 || ""}` : "";
      const lesson10ClassATenseMorphContrast = lesson10Applies && lesson10ClassId === "A" ? "admonitive-h-vs-preterit-indicative-0" : lesson10Applies ? "non-class-a-admonitive-0-shares-preterit-indicative-0" : "";
      const lesson10TenseMorphContrastAuthorized = Boolean(!lesson10Applies || lesson10ClassId === "A" && lesson10TenseMorph === "h" || lesson10ClassId !== "A" && lesson10TenseMorph === "0");
      const lesson10IntroductoryParticle = lesson10Applies ? introductoryParticleForDerivation : "";
      const lesson10IntroductoryParticlePresent = lesson10IntroductoryParticle === "mā";
      const lesson10IntroductoryParticleSatisfied = Boolean(!lesson10Applies || lesson10IntroductoryParticlePresent);
      const lesson10CanvasSentenceRole = lesson10Applies ? getClassicalNahuatlLesson10CanvasSentenceRole(subjectPersonClass) : "";
      const lesson10CanvasSentenceRoleNotice = lesson10Applies ? getClassicalNahuatlLesson10CanvasSentenceRoleNotice(lesson10CanvasSentenceRole) : "";
      const lesson10AdmonitiveForce = lesson10Applies ? lesson10NegativeRequested ? "cancel-warning-recommend-reject-caution" : "positive-cautionary-warning-advice" : "";
      const lesson10MoodPolarity = lesson10Applies ? "positive-not-negative-by-mood" : "";
      const lesson10VetitiveTermAccepted = false;
      const lesson10ProhibitionReadingAllowed = false;
      const lesson10NegativeCommandReadingAllowed = false;
      const lesson10DontTranslationAuthority = "not-authority";
      const lesson10MayNotTranslationAuthority = "not-authority";
      const lesson10ProhibitionReplacementLayer = "Lesson 9 negative command/exhortation sentence layer";
      const lesson10AssertionConversionSource = lesson10Applies ? "affirmative-present-indicative-assertion" : "";
      const lesson10AssertionConversionTarget = lesson10Applies ? "affirmative-admonition-warning-sentence" : "";
      const lesson10VncSubstitution = lesson10Applies ? "admonitive-vnc-substitutes-for-present-indicative-vnc" : "";
      const lesson10MaPosition = lesson10Applies ? "beginning-of-admonition-sentence" : "";
      const lesson10NenStrengtheningKind = lesson10Applies ? "optional-adverbialized-nnc-strengthener" : "";
      const lesson10NenLexicalMeaning = lesson10Applies ? "in-vain-uselessly" : "";
      const lesson10MaNenWritingPolicy = lesson10Applies ? "canvas-writes-ma-nen-separately-traditional-spelling-is-solid" : "";
      const lesson10TraditionalSolidSpelling = lesson10Applies ? "manen" : "";
      const lesson10WarningRenderingPolicy = lesson10Applies ? "any-rendering-with-warning-sense-is-valid-not-example-whitelist" : "";
      const lesson10PositiveDontTranslationAuthority = lesson10Applies ? "not-authority-for-positive-admonition" : "";
      const lesson10MayNotWishTranslationAuthority = lesson10Applies ? "not-authority-because-admonition-is-not-wish" : "";
      const boundaryNegativePrefixes = Array.isArray(expandedVncBoundaryFrame?.negativePrefixes) ? expandedVncBoundaryFrame.negativePrefixes.filter(prefix => prefix === "ah#" || prefix === "ca#") : [];
      const requestedOutsidePrefixes = Array.isArray(options.outsidePrefixes) ? options.outsidePrefixes.map(normalizeClassicalNahuatlLesson8OutsidePrefix).filter(Boolean) : [];
      const lesson10AntecessiveRequested = Boolean(lesson10Applies && (requestedOutsidePrefixes.includes("ō#") || Array.isArray(expandedVncBoundaryFrame?.outsidePrefixes) && expandedVncBoundaryFrame.outsidePrefixes.includes("ō#") || options.antecessive === true || options.antecessiveOrder === true || options.sentenceAntecessive === true || options.admonitiveAntecessive === true || options.admonitiveAntecessiveRequested === true || options.prefixStackMode === "antecessive"));
      const lesson10AntecessiveAllowed = !lesson10Applies;
      const lesson10CaNegativeRequested = Boolean(lesson10Applies && (boundaryNegativePrefixes.includes("ca#") || options.caNegative === true || normalizeClassicalNahuatlLesson8OutsidePrefix(options.negativePrefix || "") === "ca#" || normalizeClassicalNahuatlLesson8OutsidePrefix(options.requestedNegativePrefix || "") === "ca#"));
      const boundaryNegativePrefix = boundaryNegativePrefixes.includes("ca#") ? "ca#" : boundaryNegativePrefixes.includes("ah#") ? "ah#" : "";
      const lesson9NegativeRequested = Boolean(lesson9Applies && isClassicalNahuatlLesson9NegativeSentenceRequested(options));
      const lesson9BrusqueNegativeCommand = Boolean(lesson9NegativeRequested && lesson9SentenceType === "command-sentence" && lesson9IntroductoryParticleOmissionAllowed && !lesson9IntroductoryParticlePresent);
      const negativeRequested = lesson10NegativeRequested || lesson9NegativeRequested || boundaryNegativePrefix || options.negative === true || options.negativeAssertion === true || lesson8SentenceType === "negative-assertion" || lesson8SentenceType === "emphatic-assertion" && (options.negative === true || options.negativeAssertion === true);
      const sentenceNegativePrefix = lesson10NegativeRequested ? "ah#" : lesson9NegativeRequested ? lesson9BrusqueNegativeCommand ? "ah#" : "ca#" : boundaryNegativePrefix || (negativeRequested ? "ah#" : "");
      const lesson10NegativeAssertionConversionSource = lesson10NegativeRequested ? "negative-present-indicative-assertion" : "";
      const lesson10NegativeAssertionConversionTarget = lesson10NegativeRequested ? "negative-admonition-cancellation-sentence" : "";
      const lesson10NegativePrefixAttachment = lesson10NegativeRequested ? "ah#-affixed-to-admonitive-vnc" : "";
      const lesson10NegativeIntroductoryCollocation = lesson10NegativeRequested ? "mā nēn" : "";
      const lesson10NegativeIntroductoryCollocationRequired = Boolean(lesson10NegativeRequested);
      const lesson10NegativeForceDefinition = lesson10NegativeRequested ? "cancellation-of-warning-recommendation-to-reject-caution" : "";
      const lesson10PositiveVetativeTermAuthority = lesson10NegativeRequested ? "not-authority-unfortunate-traditional-term" : "";
      const lesson10CaNegativeFromLesson9Blocked = Boolean(lesson10NegativeRequested || lesson10CaNegativeRequested);
      const emphaticRequested = lesson8SentenceType === "emphatic-assertion";
      const sentenceParticles = [...lesson11ConstructionParticles, ...(lesson9PrefaceParticle ? [lesson9PrefaceParticle] : []), ...(lesson10Applies ? ["mā"] : lesson9IntroductoryParticle ? [lesson9IntroductoryParticle] : []), ...(lesson10Nen ? [lesson10Nen] : lesson9IntroductoryModifier ? [lesson9IntroductoryModifier] : []), ...(questionMode === "cuix" ? ["cuix"] : []), ...(emphaticRequested ? ["ca"] : []), ...(sentenceNegativePrefix === "ah#" ? ["ah#"] : []), ...(sentenceNegativePrefix === "ca#" ? ["ca#"] : [])];
      const sentencePrefixalStack = buildClassicalNahuatlLesson8SentencePrefixalStack({
        sentenceParticles,
        expandedVncBoundaryFrame
      });
      const hostileSlots = getClassicalNahuatlLesson8SentenceHostileFormulaSlots(options);
      const sentenceParticleSet = new Set(["ca", "cuix", "cuix?", "ah#", "ca#", "mā", "ma", "tlā", "tla", "ihyo", "ye", "cuēl", "cuel", "ye-cuēl", "ye-cuel", "cuēl-eh", "cuel-eh", "ye-cuēl-eh", "ye-cuel-eh", "tēl", "tel", "quin", "nēn", "nen", "quēn", "quen", "mach"]);
      const hostileRejectedFormulaSlots = hostileSlots.filter(slot => sentenceParticleSet.has(slot));
      const lesson8IndicativeVncPresent = Boolean(!lesson8Applies || normalizedMood === "indicative");
      const actions = !applies ? [] : [...(lesson8SentenceType === "affirmative-assertion" ? [CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.REWRITE_INDICATIVE_VNC_AS_AFFIRMATIVE_ASSERTION] : []), ...(lesson8Applies && negativeRequested ? [CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.ADD_NEGATIVE_OUTSIDE_VNC] : []), ...(lesson8Applies && emphaticRequested ? [CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.ADD_EMPHATIC_CA_TO_SENTENCE_LEFT_EDGE] : []), ...(lesson8SentenceType === "yes-no-question" && questionMode === "intonation" ? [CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.MARK_YES_NO_BY_INTONATION] : []), ...(lesson8SentenceType === "yes-no-question" && questionMode === "cuix" ? [CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.ADD_CUIX_TO_SENTENCE_LEFT_EDGE] : []), ...(lesson9Applies ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.MARK_LOWER_VNC_PROVISIONAL, ...(lesson9FutureIndicativeAsOptative ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.ACCEPT_FUTURE_INDICATIVE_AS_OPTATIVE] : [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.SUBSTITUTE_OPTATIVE_VNC_FOR_INDICATIVE]), ...(lesson9IntroductoryParticle ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.ADD_INTRODUCTORY_PARTICLE_OUTSIDE_VNC] : []), ...(lesson9PrefaceParticle ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.ADD_PREFACE_PARTICLE_OUTSIDE_VNC] : []), ...(lesson9IntroductoryModifier ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.ADD_INTRODUCTORY_MODIFIER_OUTSIDE_VNC] : []), ...(lesson9IntroductoryParticleRequired && lesson9SentenceType === "wish-sentence" ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.REQUIRE_INTRODUCTORY_PARTICLE_FOR_WISH] : []), ...(lesson9IntroductoryParticleRequired && ["command-sentence", "exhortation-sentence"].includes(lesson9SentenceType) && !lesson9FutureIndicativeAsOptative ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.REQUIRE_INTRODUCTORY_PARTICLE_FOR_FIRST_THIRD] : []), ...(lesson9FutureIndicativeAsOptative ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.REQUIRE_INTRODUCTORY_PARTICLE_FOR_FUTURE_COMMAND] : []), ...(lesson9IntroductoryParticleOmissionAllowed ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.ALLOW_SECOND_PERSON_COMMAND_OMISSION] : []), ...(lesson9RoleDerivedFromSubject ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.DERIVE_COMMAND_EXHORTATION_ROLE_FROM_SUBJECT] : []), ...(lesson9NegativeRequested && !lesson9BrusqueNegativeCommand ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.CHANGE_NEGATIVE_AH_TO_CA_WITH_INTRODUCTORY_PARTICLE] : []), ...(lesson9BrusqueNegativeCommand ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.KEEP_AH_FOR_BRUSQUE_NEGATIVE_COMMAND_WITHOUT_MA] : []), CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.KEEP_INTRODUCTORY_PARTICLE_OUT_OF_VNC_FORMULA] : []), ...(lesson10Applies ? [CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.MARK_LOWER_VNC_PROVISIONAL, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.CLASSIFY_ADMONITIVE_AS_POSITIVE_WARNING, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.REJECT_VETITIVE_PROHIBITION_READING, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.BLOCK_DONT_TRANSLATION_AUTHORITY, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.REQUIRE_ADMONITIVE_VNC, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.ENFORCE_NONPAST_ONLY, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.USE_PERFECTIVE_STEM, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_CLASS_A_H_CONTRAST, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_ADMONITIVE_NUMBER_DYADS, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.MARK_NO_TRANSLATION_OUTSIDE_SENTENCE, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.REQUIRE_NONPAST_PERFECTIVE_STEM, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.SUBSTITUTE_ADMONITIVE_FOR_PRESENT_INDICATIVE, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.ADD_MA_OUTSIDE_VNC, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.REQUIRE_MA_SENTENCE_BEGINNING, ...(lesson10Nen ? [CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.ADD_NEN_OUTSIDE_VNC] : []), ...(lesson10Nen ? [CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_NEN_ADVERBIALIZED_NNC, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_MANEN_TRADITIONAL_SOLID_SPELLING] : []), CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.DERIVE_ADMONITION_ROLE_FROM_SUBJECT, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.AUTHORIZE_WARNING_RENDERINGS, ...(lesson10NegativeRequested ? [CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.REQUIRE_MA_NEN_FOR_NEGATIVE_ADMONITION, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.TRANSFORM_NEGATIVE_ASSERTION_TO_NEGATIVE_ADMONITION, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.AFFIX_AH_TO_ADMONITIVE_VNC, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_NEGATIVE_ADMONITION_CANCELS_WARNING, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.REJECT_POSITIVE_VETATIVE_TERM_AUTHORITY, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.KEEP_NEGATIVE_AH_IN_ADMONITION, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.BLOCK_CA_FOR_ADMONITION] : []), ...(lesson10CaNegativeRequested && !lesson10NegativeRequested ? [CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.BLOCK_CA_FOR_ADMONITION] : []), CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_ADMONITIVE_OPTATIVE_PRESENT_PRETERIT_CONTRASTS, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_SECOND_PERSON_X_XI_OPTATIVE_DISTINCTION, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_PLURAL_SUBJECTS_ALWAYS_DISTINCTIVE, CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_MA_AS_ADMONITIVE_SENTENCE_DISTINGUISHER, ...(lesson10ClassContrastProfile.glottalStopAmbiguityWarning ? [CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_GLOTTAL_STOP_AMBIGUITY_WARNING] : []), ...(lesson10ClassContrastProfile.hMorphRoleContrast ? [CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.RECORD_H_TENSE_VS_NUM1_ROLE_CONTRAST] : []), ...(lesson10AntecessiveRequested ? [CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.BLOCK_ANTECESSIVE_WITH_ADMONITIVE] : []), ...(!lesson10ContrastReadingAuthorized ? [CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.BLOCK_CONTRAST_READING_AS_ADMONITIVE_AUTHORITY] : []), CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.KEEP_ADMONITIVE_PARTICLES_OUT_OF_VNC_FORMULA] : []), CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.KEEP_SENTENCE_PARTICLES_OUT_OF_VNC_FORMULA, ...(hostileRejectedFormulaSlots.length ? [...(lesson9Applies ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.BLOCK_INTRODUCTORY_PARTICLE_FORMULA_SLOT] : []), ...(lesson10Applies ? [CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.KEEP_ADMONITIVE_PARTICLES_OUT_OF_VNC_FORMULA] : []), CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.BLOCK_SENTENCE_PARTICLE_FORMULA_SLOT] : []), ...(lesson9Applies ? [CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS.CARRY_SENTENCE_FINALIZER_TO_SELECTED_OUTPUT] : []), ...(lesson10Applies ? [CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS.CARRY_SENTENCE_FINALIZER_TO_SELECTED_OUTPUT] : []), CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS.CARRY_SENTENCE_SURFACE_TO_SELECTED_OUTPUT];
      const blocked = Boolean(applies && (lesson8Applies && !lesson8IndicativeVncPresent || lesson9Applies && !lesson9OptativeVncPresent || lesson9Applies && !lesson9IntroductoryParticleSatisfied || lesson9Applies && !lesson9PrefaceParticleAuthorized || lesson9Applies && !lesson9IntroductoryModifierAuthorized || lesson10Applies && !lesson10AdmonitiveVncPresent || lesson10Applies && !lesson10NonpastTensePresent || lesson10Applies && !lesson10PerfectiveStemPresent || lesson10Applies && !lesson10TenseMorphContrastAuthorized || lesson10Applies && !lesson10IntroductoryParticleSatisfied || lesson10Applies && !lesson10NenAuthorized || lesson10Applies && !lesson10RequestedTranslationReadingAuthorized || lesson10Applies && lesson10CaNegativeRequested || lesson10Applies && lesson10AntecessiveRequested || lesson10Applies && !lesson10ContrastReadingAuthorized || lesson10Applies && sentenceNegativePrefix === "ca#" || hostileRejectedFormulaSlots.length));
      let blockReason = "";
      if (applies) {
        if (lesson8Applies && !lesson8IndicativeVncPresent) {
          blockReason = "lesson-8-assertion-sentence-requires-indicative-vnc";
        } else if (lesson9Applies && !lesson9OptativeVncPresent) {
          blockReason = "lesson-9-wish-command-requires-optative-or-future-optative-vnc";
        } else if (lesson9Applies && !lesson9IntroductoryParticleSatisfied) {
          blockReason = "lesson-9-wish-command-requires-ma-or-tla";
        } else if (lesson9Applies && !lesson9PrefaceParticleAuthorized) {
          blockReason = "lesson-9-preface-particle-not-authorized-in-current-environment";
        } else if (lesson9Applies && !lesson9IntroductoryModifierAuthorized) {
          blockReason = "lesson-9-introductory-modifier-not-authorized-in-current-environment";
        } else if (lesson10Applies && !lesson10NonpastTensePresent) {
          blockReason = "lesson-10-admonitive-requires-nonpast-tense";
        } else if (lesson10Applies && !lesson10PerfectiveStemPresent) {
          blockReason = "lesson-10-admonitive-requires-perfective-stem";
        } else if (lesson10Applies && !lesson10TenseMorphContrastAuthorized) {
          blockReason = "lesson-10-admonitive-tense-morph-contradicts-class-contrast";
        } else if (lesson10Applies && !lesson10IntroductoryParticleSatisfied) {
          blockReason = "lesson-10-admonition-requires-ma";
        } else if (lesson10Applies && !lesson10NenAuthorized) {
          blockReason = "lesson-10-negative-admonition-requires-ma-nen";
        } else if (lesson10Applies && !lesson10RequestedTranslationReadingAuthorized) {
          blockReason = lesson10NegativeRequested ? "lesson-10-negative-admonition-requires-reject-caution-reading" : "lesson-10-positive-admonition-translation-reading-not-authorized";
        } else if (lesson10Applies && lesson10CaNegativeRequested) {
          blockReason = "lesson-10-admonition-keeps-ah-not-ca";
        } else if (lesson10Applies && lesson10AntecessiveRequested) {
          blockReason = "lesson-10-admonitive-nonpast-blocks-antecessive-order-prefix";
        } else if (lesson10Applies && !lesson10ContrastReadingAuthorized) {
          blockReason = "lesson-10-contrast-reading-cannot-authorize-admonitive-sentence";
        } else if (lesson10Applies && sentenceNegativePrefix === "ca#") {
          blockReason = "lesson-10-admonition-keeps-ah-not-ca";
        } else if (hostileRejectedFormulaSlots.length) {
          blockReason = "sentence-particle-cannot-be-vnc-formula-slot";
        }
      }
      return {
        kind: lesson10Applies ? "classical-nahuatl-lesson10-admonitive-sentence-surface-frame" : lesson9Applies ? "classical-nahuatl-lesson8-9-sentence-surface-frame" : "classical-nahuatl-lesson8-sentence-surface-frame",
        parentLedgerTagId: lesson10Applies ? "cn-l10-101-105-admonitive-sentence-layer" : "",
        lesson: lesson10Applies ? "Andrews Lesson 10" : lesson9Applies ? "Andrews Lesson 9" : "Andrews Lesson 8",
        section: lesson10Applies ? "10.1-10.5" : lesson9Applies ? "9.5-9.9" : "8.2-8.6",
        ruleLogicRole: "sentence-surface-use-of-vnc-result",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: lesson10Applies ? getClassicalNahuatlLesson10AdmonitionSentenceRules() : lesson9Applies ? getClassicalNahuatlLesson9WishCommandSentenceRules() : getClassicalNahuatlLesson82SentenceSurfaceRules(),
        sentenceSurfaceApplies: applies,
        sentenceType,
        lesson8SentenceType,
        lesson9SentenceType,
        lesson10SentenceType,
        sentenceCombinationRule: lesson10Applies ? "lesson10-admonition-sentence-finalizes-lower-admonitive-vnc" : lesson9Applies ? "lesson9-wish-command-sentence-finalizes-lower-optative-vnc" : "affirmative-or-negative-assertion-can-transform-to-yes-no-question",
        sentenceCombinationSubrule: lesson10Applies ? "ma-obligatory-nen-optional-or-required-negative-ah-stays-ah" : lesson9Applies ? "ma-tla-licenses-ca-negative-except-brusque-second-command-keeps-ah" : "prefixal-negative-stays-outside-vnc-cuix-stays-sentence-left",
        negativeQuestionAuthorized: lesson8SentenceType === "yes-no-question" && Boolean(negativeRequested),
        sentenceOperationType: lesson10Applies ? "lesson10-admonitive-warning-finalizer" : lesson9Applies ? "lesson9-optative-wish-command-finalizer" : sentenceType === "affirmative-assertion" ? "basic-sentence" : applies ? "single-base-transform" : "",
        baseVncFormula: selectedFormula,
        vncFormulaAuthorityRole: lesson10Applies ? "lower-vnc-result-consumed-as-provisional-by-lesson10-admonitive-sentence-layer" : lesson9Applies ? "lower-vnc-result-consumed-as-provisional-by-lesson9-sentence-layer" : "input-result-not-modified-by-sentence-surface",
        lowerLayerSelectedOutputRole: lesson9Or10Applies ? "provisional-vnc-result" : "selected-vnc-result",
        lowerLessonOutputIsProvisional: lesson9Or10Applies,
        highestActiveCanvasLayer: lesson10Applies ? "Andrews Lesson 10 sentence layer" : lesson9Applies ? "Andrews Lesson 9 sentence layer" : lesson8Applies ? "Andrews Lesson 8 sentence layer" : "",
        sentenceFinalizerLayer: lesson10Applies ? "Lesson 10 admonitive warning/advice sentence layer" : lesson9Applies ? "Lesson 9 optative wish/command/future-negative sentence layer" : lesson8Applies ? "Lesson 8 assertion/question sentence layer" : "",
        expandedVncBoundaryFrameKind: expandedVncBoundaryFrame?.kind || "",
        expandedVncBoundaryResultConsumed: expandedVncBoundaryFrame?.boundaryApplies === true,
        mood: normalizedMood,
        tense: normalizedTense,
        indicativeVncRequired: lesson8Applies,
        indicativeVncPresent: lesson8IndicativeVncPresent,
        optativeVncRequired: lesson9Applies,
        optativeVncPresent: lesson9OptativeVncPresent,
        admonitiveVncRequired: lesson10Applies,
        admonitiveVncPresent: lesson10AdmonitiveVncPresent,
        admonitiveNonpastRequired: lesson10Applies,
        admonitiveNonpastPresent: lesson10NonpastTensePresent,
        admonitiveRequestedTense: lesson10Applies ? requestedTenseCanonical : "",
        admonitiveRequestedTenseAuthorized: lesson10RequestedTenseAuthorized,
        admonitiveOnlyNonpastTense: lesson10Applies,
        admonitivePerfectiveStemRequired: lesson10Applies,
        admonitivePerfectiveStemPresent: lesson10PerfectiveStemPresent,
        admonitiveStemAspect: lesson10StemAspect,
        admonitiveVncTranslationValueOutsideSentence: lesson10Applies ? "none" : "",
        admonitiveClassId: lesson10ClassId,
        admonitiveTenseMorph: lesson10TenseMorph,
        admonitiveClassATenseMorphContrast: lesson10ClassATenseMorphContrast,
        admonitiveTenseMorphContrastAuthorized: lesson10TenseMorphContrastAuthorized,
        admonitiveContrastSet: lesson10Applies ? ["admonitive", "nonpast-optative", "present-indicative", "preterit-indicative"] : [],
        admonitiveContrastClassProfile: lesson10ClassContrastProfile.classContrastKind || "",
        admonitiveOptativeContrast: lesson10ClassContrastProfile.optativeContrast || "",
        admonitivePresentIndicativeContrast: lesson10ClassContrastProfile.presentIndicativeContrast || "",
        admonitivePreteritIndicativeContrast: lesson10ClassContrastProfile.preteritIndicativeContrast || "",
        admonitiveSecondPersonOptativeDistinction: lesson10Applies ? "x-or-xi-pers1-morph-distinguishes-second-person-optative-from-admonitive" : "",
        admonitivePluralSubjectsAlwaysDistinctive: Boolean(lesson10Applies && subjectNumberClass === "plural"),
        admonitiveMaDistinguishesSentenceLayer: lesson10Applies,
        admonitiveGlottalStopAmbiguityWarning: Boolean(lesson10ClassContrastProfile.glottalStopAmbiguityWarning),
        admonitiveGlottalStopAmbiguityScope: lesson10ClassContrastProfile.glottalStopAmbiguityScope || "",
        admonitiveOppositeMeaningRiskIfGlottalUnrepresented: Boolean(lesson10ClassContrastProfile.glottalStopAmbiguityWarning),
        admonitiveHMorphRoleContrast: lesson10ClassContrastProfile.hMorphRoleContrast || "",
        admonitiveAntecessivePrefixAllowed: lesson10AntecessiveAllowed,
        admonitiveAntecessivePrefixRequested: lesson10AntecessiveRequested,
        admonitiveAntecessiveContrast: lesson10Applies ? "antecessive-order-prefix-cannot-occur-with-admonitive-because-admonitive-is-nonpast" : "",
        admonitiveRequestedContrastReading: requestedLesson10ContrastReading,
        admonitiveRequestedContrastReadingAuthorized: lesson10ContrastReadingAuthorized,
        admonitiveNumberDyad: lesson10CurrentNumberDyad,
        admonitiveNumberDyadKind: lesson10NumberDyad.condition || "",
        admonitiveNum1Morpheme: lesson10Applies ? "/ti" : "",
        admonitiveNum1RegularMorphCondition: lesson10Applies ? "only-with-plural-num2" : "",
        admonitiveSingularNumberDyad: lesson10Applies ? `${CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO}-0` : "",
        admonitivePluralNumberDyads: lesson10Applies ? ["t-in", "t-ih"] : [],
        admonitiveNum2SingularMorph: lesson10Applies ? "0" : "",
        admonitiveNum2PluralMorphs: lesson10Applies ? ["in", "ih"] : [],
        admonitiveForce: lesson10AdmonitiveForce,
        admonitiveMoodPolarity: lesson10MoodPolarity,
        admonitiveIsPositiveByMood: lesson10Applies,
        admonitiveVetitiveTermAccepted: lesson10Applies ? lesson10VetitiveTermAccepted : null,
        admonitiveProhibitionReadingAllowed: lesson10Applies ? lesson10ProhibitionReadingAllowed : null,
        admonitiveNegativeCommandReadingAllowed: lesson10Applies ? lesson10NegativeCommandReadingAllowed : null,
        admonitiveDontTranslationAuthority: lesson10Applies ? lesson10DontTranslationAuthority : "",
        admonitiveMayNotTranslationAuthority: lesson10Applies ? lesson10MayNotTranslationAuthority : "",
        admonitiveProhibitionReplacementLayer: lesson10Applies ? lesson10ProhibitionReplacementLayer : "",
        admonitiveAssertionConversionSource: lesson10AssertionConversionSource,
        admonitiveAssertionConversionTarget: lesson10AssertionConversionTarget,
        admonitiveVncSubstitution: lesson10VncSubstitution,
        admonitiveMaPosition: lesson10MaPosition,
        admonitiveNenStrengtheningKind: lesson10NenStrengtheningKind,
        admonitiveNenLexicalMeaning: lesson10NenLexicalMeaning,
        admonitiveMaNenWritingPolicy: lesson10MaNenWritingPolicy,
        admonitiveTraditionalSolidSpelling: lesson10TraditionalSolidSpelling,
        admonitiveWarningRenderingPolicy: lesson10WarningRenderingPolicy,
        admonitiveRequestedTranslationReading: lesson10Applies ? lesson10RequestedTranslationReading : "",
        admonitiveRequestedTranslationReadingAuthorized: lesson10RequestedTranslationReadingAuthorized,
        admonitivePositiveDontTranslationAuthority: lesson10PositiveDontTranslationAuthority,
        admonitiveMayNotWishTranslationAuthority: lesson10MayNotWishTranslationAuthority,
        futureIndicativeAsOptative: lesson9FutureIndicativeAsOptative,
        futureCommandIntroductoryParticleRequired: Boolean(lesson9FutureIndicativeAsOptative && lesson9SentenceType === "command-sentence"),
        subjectPersonClass,
        canvasSentenceRole: lesson10Applies ? lesson10CanvasSentenceRole : lesson9CanvasSentenceRole,
        canvasSentenceRoleNotice: lesson10Applies ? lesson10CanvasSentenceRoleNotice : lesson9CanvasSentenceRoleNotice,
        sentenceRoleDerivedFromSubject: lesson10Applies || lesson9RoleDerivedFromSubject,
        sentenceRoleAuthority: lesson10Applies ? "Andrews 10.3 subject-person admonition comparison" : lesson9RoleDerivedFromSubject ? "Andrews 9.7 subject-person role rule" : lesson9Applies ? "Andrews 9.5-9.9 sentence force rule" : "",
        introductoryParticle: lesson10Applies ? lesson10IntroductoryParticle : lesson9IntroductoryParticle,
        introductoryParticleRequired: lesson10Applies || lesson9IntroductoryParticleRequired,
        introductoryParticlePresent: lesson10Applies ? lesson10IntroductoryParticlePresent : lesson9IntroductoryParticlePresent,
        introductoryParticleOmissionAllowed: lesson10Applies ? false : lesson9IntroductoryParticleOmissionAllowed,
        introductoryParticleOmissionReason: !lesson10Applies && lesson9IntroductoryParticleOmissionAllowed ? "second-person direct command may omit mā/tlā because x/xi is distinctly optative" : "",
        prefaceParticle: lesson9PrefaceParticle,
        requestedPrefaceParticle: requestedLesson9PrefaceParticle,
        prefaceParticleAuthorized: lesson9PrefaceParticleAuthorized,
        introductoryModifier: lesson10Applies ? lesson10Nen : lesson9IntroductoryModifier,
        requestedIntroductoryModifier: requestedLesson9IntroductoryModifier,
        introductoryModifierAuthorized: lesson10Applies ? lesson10NenAuthorized : lesson9IntroductoryModifierAuthorized,
        lesson9NegativeRequested,
        lesson10NegativeRequested,
        lesson10NegativeTransformation: lesson10NegativeRequested ? "negative-admonition-keeps-ah-and-requires-ma-nen" : "",
        admonitiveNegativeAssertionConversionSource: lesson10NegativeAssertionConversionSource,
        admonitiveNegativeAssertionConversionTarget: lesson10NegativeAssertionConversionTarget,
        admonitiveNegativePrefixAttachment: lesson10NegativePrefixAttachment,
        admonitiveNegativeIntroductoryCollocation: lesson10NegativeIntroductoryCollocation,
        admonitiveNegativeIntroductoryCollocationRequired: lesson10NegativeIntroductoryCollocationRequired,
        admonitiveNegativeForceDefinition: lesson10NegativeForceDefinition,
        admonitivePositiveVetativeTermAuthority: lesson10PositiveVetativeTermAuthority,
        admonitiveCaNegativeRequested: lesson10CaNegativeRequested,
        admonitiveCaNegativeFromLesson9Blocked: lesson10CaNegativeFromLesson9Blocked,
        admonitiveNenRequired: lesson10NegativeRequested,
        admonitiveNenPresent: Boolean(lesson10Nen),
        admonitiveNenOptional: Boolean(lesson10Applies && !lesson10NegativeRequested),
        admonitiveMaNenCollocation: lesson10Nen ? "mā nēn" : "mā",
        caNegativeBlockedByAdmonitive: Boolean(lesson10NegativeRequested),
        lesson9NegativeTransformation: lesson9NegativeRequested ? lesson9BrusqueNegativeCommand ? "brusque-command-keeps-ah" : "ma-tla-changes-ah-to-ca" : "",
        caNegativeLicensedByIntroductoryParticle: Boolean(lesson9NegativeRequested && !lesson9BrusqueNegativeCommand),
        ahNegativeRequiredWithoutIntroductoryParticle: lesson9BrusqueNegativeCommand,
        negativePrefixSource: lesson10NegativeRequested ? "Lesson 10 negative admonition sentence layer" : lesson9NegativeRequested ? "Lesson 9 negative wish/command sentence layer" : negativeRequested ? "Lesson 8 sentence or expanded-boundary layer" : "",
        sentenceParticles,
        sentencePrefixalStack,
        sentencePrefixalStackAttachment: sentencePrefixalStack.length ? "prefixal-stack-attached-at-left-edge" : "",
        sentenceParticlePositions: sentenceParticles.map(particle => ({
          particle,
          position: "sentence-left-edge-or-vnc-outside-prefix",
          vncFormulaSlotAuthorized: false
        })),
        sentenceParticlesBecomeFormulaSlots: false,
        formulaSlotMaterialFromSentenceParticles: [],
        finalPunctuation: lesson11Construction === "quēn" ? "?" : lesson11Construction === "quēn-mach" ? "!" : sentenceType === "yes-no-question" ? "?" : applies ? "." : "",
        lesson11Construction,
        lesson11ConstructionParticles,
        lesson11ConstructionPosition: lesson11ConstructionParticles.length ? "sentence-left-before-vnc" : "",
        questionMode,
        emphaticParticle: emphaticRequested ? "ca" : "",
        negativePrefix: sentenceNegativePrefix,
        negativePrefixOutsideVnc: Boolean(negativeRequested),
        sentenceActions: actions,
        hostileFormulaSlots: hostileSlots,
        hostileRejectedFormulaSlots,
        authorizationStatus: blocked ? "blocked" : applies ? "authorized" : "not-applicable",
        blockReason,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function getClassicalNahuatlLesson7PriorVncFrame(stemVariant = "", options = {}) {
      const valence = normalizeClassicalNahuatlLesson7Valence(options.valence || options.transitivity || options.objectKind || options.object || "");
      const runtimeTarget = getClassicalNahuatlLesson7RuntimeTarget();
      if (valence === "intransitive") {
        const builder = runtimeTarget?.buildClassicalNahuatlLesson5VncSubjectTenseFrame;
        return typeof builder === "function" ? builder(stemVariant, {
          ...options,
          transitivity: "intransitive"
        }) : null;
      }
      const builder = runtimeTarget?.buildClassicalNahuatlLesson6TransitiveVncObjectFrame;
      if (typeof builder !== "function") {
        return null;
      }
      const objectKindByValence = {
        "shuntline-reflexive": "shuntline-reflexive",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman",
        "mainline-reflexive": "mainline-reflexive",
        "human-reciprocal": "mainline-reflexive"
      };
      return builder(stemVariant, {
        ...options,
        transitivity: "transitive",
        objectKind: options.objectKind || objectKindByValence[valence] || "specific-projective"
      });
    }
    function buildClassicalNahuatlLesson7LogicProofFrame({
      structureRuleFrame = null,
      sourceSelectionFrame = null,
      zeroRootLowerLessonBridgeFrame = null,
      progressiveAssimilationFrame = null,
      lesson11ParadigmPlan = null,
      lesson11VncApplicationFrame = null,
      citationRuleFrame = null,
      classRuleFrame = null,
      predicateFormationRuleFrame = null,
      analysisRuleFrame = null,
      objectRelationshipRuleFrame = null,
      tlaFusionRuleFrame = null,
      expandedVncBoundaryFrame = null,
      priorVncFrame = null,
      optionalIrregularPriorVncFrames = []
    } = {}) {
      const priorProof = priorVncFrame?.proofFrame || {};
      const priorConclusion = priorProof.conclusion || {};
      const priorAuthorized = priorConclusion.authorized === true;
      const runtimeTarget = getClassicalNahuatlLesson7RuntimeTarget();
      const priorVncSlotFrame = priorVncFrame?.vncSlotFrame || null;
      const priorVncSlotAuthorized = typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame === "function" && runtimeTarget.isClassicalNahuatlVncSlotFrame(priorVncSlotFrame);
      const predicateAuthorized = predicateFormationRuleFrame?.authorizationStatus === "authorized";
      const expandedVncBoundaryApplies = expandedVncBoundaryFrame?.boundaryApplies === true;
      const lowerOptionalIrregularFormulaRealizations = optionalIrregularPriorVncFrames.filter(frame => frame?.proofFrame?.conclusion?.authorized === true).map(frame => frame.formulaRealization).filter(Boolean);
      const baseAuthorized = Boolean(structureRuleFrame?.authorizationStatus === "authorized" && (!zeroRootLowerLessonBridgeFrame || zeroRootLowerLessonBridgeFrame.authorizationStatus === "authorized") && (!progressiveAssimilationFrame || progressiveAssimilationFrame.authorizationStatus === "authorized") && (!lesson11ParadigmPlan || lesson11ParadigmPlan.authorizationStatus === "authorized") && (!lesson11VncApplicationFrame || lesson11VncApplicationFrame.authorizationStatus === "authorized") && sourceSelectionFrame?.authorizationStatus === "authorized" && citationRuleFrame?.authorizationStatus === "authorized" && classRuleFrame?.authorizationStatus === "authorized" && predicateAuthorized && analysisRuleFrame?.authorizationStatus === "authorized" && objectRelationshipRuleFrame?.authorizationStatus === "authorized" && tlaFusionRuleFrame?.authorizationStatus === "authorized" && (!expandedVncBoundaryApplies || expandedVncBoundaryFrame?.authorizationStatus === "authorized") && priorAuthorized && priorVncSlotAuthorized);
      const finalBoundaryRealizationFrame = baseAuthorized && typeof runtimeTarget?.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary === "function" ? runtimeTarget.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
        vncSlotFrame: priorVncSlotFrame,
        expandedVncBoundaryFrame,
        objectRelationshipRuleFrame
      }) : null;
      const finalBoundaryAuthorized = finalBoundaryRealizationFrame?.authorizationStatus === "authorized";
      const lesson11AlternativeBoundaryFrames = baseAuthorized && typeof runtimeTarget?.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary === "function" ? (lesson11VncApplicationFrame?.alternativeTypedVncSlotFrames || []).map(vncSlotFrame => runtimeTarget.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
        vncSlotFrame,
        expandedVncBoundaryFrame,
        objectRelationshipRuleFrame
      })).filter(frame => frame?.authorizationStatus === "authorized") : [];
      const lesson11AlternativeFormulaRealizations = lesson11AlternativeBoundaryFrames.map(frame => frame.formulaRealization).filter(Boolean);
      const optionalIrregularFormulaRealizations = Array.from(new Set([...lowerOptionalIrregularFormulaRealizations, ...lesson11AlternativeFormulaRealizations]));
      const canvasLayerEvaluationFrame = typeof runtimeTarget?.buildClassicalNahuatlCanvasLayerEvaluationFrame === "function" ? runtimeTarget.buildClassicalNahuatlCanvasLayerEvaluationFrame({
        priorVncFrame,
        finalBoundaryFrame: finalBoundaryRealizationFrame
      }) : null;
      const authorized = baseAuthorized && finalBoundaryAuthorized;
      const selectedFormula = authorized ? finalBoundaryRealizationFrame.formulaRealization || "" : "";
      return {
        kind: "classical-nahuatl-lesson7-logic-proof-frame",
        lesson: "Andrews Lesson 7",
        proofKind: "logic-proof",
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        canvasLayerEvaluationFrame,
        premises: [{
          lesson: "Andrews Lessons 5-8",
          layer: "typed-vnc-slot-authority",
          rule: "Later Canvas layers consume typed VNC slots; the printed lower formula is a display artifact only.",
          passed: priorVncSlotAuthorized,
          sourceFrameKind: priorVncSlotFrame?.sourceFrameKind || "",
          sourceSemanticIdentity: priorVncSlotFrame?.semanticIdentity || "",
          formulaArtifactAuthority: priorVncSlotFrame?.formulaArtifactAuthority || "",
          finalizerKind: finalBoundaryRealizationFrame?.kind || "",
          typedSlotAuthority: finalBoundaryRealizationFrame?.typedSlotAuthority === true,
          formulaStringAuthority: finalBoundaryRealizationFrame?.formulaStringAuthority === true,
          legalWitnessTagIds: ["cn-l8-81-expanded-vnc-boundary"],
          ruleFrameKind: priorVncSlotFrame?.kind || ""
        }, {
          lesson: "Andrews Lesson 7",
          layer: "verbstem-structure",
          rule: "Stem is a lexical unit even when internal morphs are marked.",
          passed: structureRuleFrame?.authorizationStatus === "authorized",
          stem: structureRuleFrame?.stem || "",
          morphology: structureRuleFrame?.morphology || "",
          internalMorphs: structureRuleFrame?.internalMorphs || [],
          internalMorphBoundaryScope: structureRuleFrame?.internalMorphBoundaryScope || "",
          internalMorphsRemainInsideVerbstem: structureRuleFrame?.internalMorphsRemainInsideVerbstem === true,
          internalMorphsBecomeFormulaSlots: structureRuleFrame?.internalMorphsBecomeFormulaSlots === true,
          formulaSlotSplitAllowed: structureRuleFrame?.formulaSlotSplitAllowed === true,
          stemTranslationPolicy: structureRuleFrame?.stemTranslationPolicy || "",
          internalMorphGlossPolicy: structureRuleFrame?.internalMorphGlossPolicy || "",
          inventedInternalMorphGlossAllowed: structureRuleFrame?.inventedInternalMorphGlossAllowed === true,
          unknownButAuthorizedMorphs: structureRuleFrame?.unknownButAuthorizedMorphs || [],
          legalWitnessTagId: "cn-l7-verbstem-structure",
          ruleFrameKind: structureRuleFrame?.kind || ""
        }, ...(zeroRootLowerLessonBridgeFrame ? [{
          lesson: "Andrews Lesson 11",
          layer: "source-zero-root",
          rule: "A source 0 is a silent structural root only when the selected verbstem has typed Lesson 11 zero-root authority.",
          passed: zeroRootLowerLessonBridgeFrame.authorizationStatus === "authorized",
          sourceStem: zeroRootLowerLessonBridgeFrame.sourceStem || "",
          sourceRootMorpheme: zeroRootLowerLessonBridgeFrame.sourceRootMorpheme || "",
          sourceRootRole: zeroRootLowerLessonBridgeFrame.sourceRootRole || "",
          lowerOrthographicCarrierStem: zeroRootLowerLessonBridgeFrame.lowerOrthographicCarrierStem || "",
          zeroIsPronouncedGrapheme: zeroRootLowerLessonBridgeFrame.zeroIsPronouncedGrapheme === true,
          legalWitnessTagIds: (zeroRootLowerLessonBridgeFrame.ruleRefs || []).map(ref => ref.tagId).filter(Boolean),
          ruleFrameKind: zeroRootLowerLessonBridgeFrame.kind || ""
        }] : []), ...(progressiveAssimilationFrame ? [{
          lesson: "Andrews Lesson 2",
          layer: "progressive-assimilation-2-10",
          rule: "A grammatical internal morph boundary realizes only the progressive assimilation pair authorized by Lesson 2.10.",
          passed: progressiveAssimilationFrame.authorizationStatus === "authorized",
          sourceStem: progressiveAssimilationFrame.sourceStem || "",
          realizedAnalyzedStem: progressiveAssimilationFrame.realizedAnalyzedStem || "",
          realizedSolidStem: progressiveAssimilationFrame.realizedSolidStem || "",
          transformationApplied: progressiveAssimilationFrame.transformationApplied === true,
          appliedRuleIds: progressiveAssimilationFrame.appliedRuleIds || [],
          llRestrictedToLesson210Rules: progressiveAssimilationFrame.llRestrictedToLesson210Rules === true,
          legalWitnessTagIds: progressiveAssimilationFrame.appliedRuleIds || [],
          ruleFrameKind: progressiveAssimilationFrame.kind || ""
        }] : []), ...(lesson11ParadigmPlan?.applies ? [{
          lesson: "Andrews Lesson 11",
          layer: "irregular-paradigm-plan",
          rule: "Lesson 11 changes a regular typed candidate only through a scoped paradigm action authorized for the selected lexeme and environment.",
          passed: lesson11ParadigmPlan.authorizationStatus === "authorized" && lesson11VncApplicationFrame?.authorizationStatus === "authorized",
          lexemeId: lesson11ParadigmPlan.lexemeId || "",
          irregularityKind: lesson11ParadigmPlan.irregularityKind || "",
          requestedSemanticTense: lesson11ParadigmPlan.requestedSemanticTense || "",
          morphologicalTense: lesson11ParadigmPlan.morphologicalTense || "",
          selectedStemOverride: lesson11ParadigmPlan.selectedStemOverride || "",
          alternatives: lesson11ParadigmPlan.alternatives || [],
          actions: lesson11ParadigmPlan.actions || [],
          paradigmRelation: lesson11ParadigmPlan.paradigmRelationFrame?.relationDisplay || "",
          paradigmRelationFrameKind: lesson11ParadigmPlan.paradigmRelationFrame?.kind || "",
          legalWitnessTagIds: (lesson11ParadigmPlan.ruleRefs || []).map(ref => ref.tagId).filter(Boolean),
          ruleFrameKind: lesson11ParadigmPlan.kind || ""
        }] : []), {
          lesson: "Andrews Lesson 7",
          layer: "fuente-source-selection",
          rule: "Fuente selection follows Canvas: whole stem, internal morphemes, or witnessed embed plus matrix.",
          passed: sourceSelectionFrame?.authorizationStatus === "authorized",
          selectedSourceKind: sourceSelectionFrame?.selectedSourceKind || "",
          selectedBy: sourceSelectionFrame?.selectedBy || "",
          selectedEmbedStem: sourceSelectionFrame?.selectedEmbedStem || "",
          selectedMatrixStem: sourceSelectionFrame?.selectedMatrixStem || "",
          selectedInternalMorphs: sourceSelectionFrame?.selectedInternalMorphs || [],
          selectedWholeStem: sourceSelectionFrame?.selectedWholeStem || "",
          canvasAllowsUserSourceSelection: sourceSelectionFrame?.canvasAllowsUserSourceSelection === true,
          userSelectionCanvasPermitted: sourceSelectionFrame?.userSelectionCanvasPermitted === true,
          userSelectionContradictsCanvas: sourceSelectionFrame?.userSelectionContradictsCanvas === true,
          userSelectionContradictionReason: sourceSelectionFrame?.userSelectionContradictionReason || "",
          sourceSelectionActions: sourceSelectionFrame?.sourceSelectionActions || [],
          legalWitnessTagId: "cn-l7-source-boundary-role",
          ruleFrameKind: sourceSelectionFrame?.kind || ""
        }, {
          lesson: "Andrews Lesson 7",
          layer: "verbcore-citation",
          rule: "Citation form must include the valence-plus-stem unit when valence is required.",
          passed: citationRuleFrame?.authorizationStatus === "authorized",
          citationForm: citationRuleFrame?.citationForm || "",
          citationActions: citationRuleFrame?.citationActions || [],
          marker: citationRuleFrame?.marker || "",
          projectiveCitationRepresentative: citationRuleFrame?.projectiveCitationRepresentative || "",
          formulaSlotCitationBlocked: citationRuleFrame?.formulaSlotCitationBlocked === true,
          citationUsesFormulaSlotPlaceholder: citationRuleFrame?.citationUsesFormulaSlotPlaceholder === true,
          legalWitnessTagId: "cn-l7-citation-form",
          ruleFrameKind: citationRuleFrame?.kind || ""
        }, {
          lesson: "Andrews Lesson 7",
          layer: "verbstem-class",
          rule: "Stem class is a perfective/imperfective relation, not a surface spelling shortcut.",
          passed: classRuleFrame?.authorizationStatus === "authorized",
          classId: classRuleFrame?.classId || "",
          classTargetStem: classRuleFrame?.classTargetStem || classRuleFrame?.imperfectiveStem || "",
          classTargetRole: classRuleFrame?.classTargetRole || "",
          classTargetValence: classRuleFrame?.classTargetValence || "",
          classTargetDerivedFromTlaFusion: classRuleFrame?.classTargetDerivedFromTlaFusion === true,
          sourceVerbstem: classRuleFrame?.sourceVerbstem || "",
          derivedFusedVerbstem: classRuleFrame?.derivedFusedVerbstem || "",
          perfectiveStem: classRuleFrame?.perfectiveStem || "",
          classActions: classRuleFrame?.classActions || [],
          classBPerfectiveKind: classRuleFrame?.classBPerfectiveKind || "",
          classBUnderlyingPerfectiveStem: classRuleFrame?.classBUnderlyingPerfectiveStem || "",
          classBSilentCausativeCarrierPresent: classRuleFrame?.classBSilentCausativeCarrierPresent === true,
          classBTypeOneCausativeWitnessRequired: classRuleFrame?.classBTypeOneCausativeWitnessRequired === true,
          traditionalSpellingWarningPresent: classRuleFrame?.traditionalSpellingWarningPresent === true,
          traditionalSpellingMisclassificationBlocked: classRuleFrame?.traditionalSpellingMisclassificationBlocked === true,
          hiddenTraditionalSpellingSound: classRuleFrame?.hiddenTraditionalSpellingSound || "",
          classGuidelineWitnessPresent: classRuleFrame?.classGuidelineWitnessPresent === true,
          classGuidelineRuleId: classRuleFrame?.classGuidelineRuleId || "",
          classGuidelineAllowedClassIds: classRuleFrame?.classGuidelineAllowedClassIds || [],
          classGuidelineClassOptions: classRuleFrame?.classGuidelineClassOptions || [],
          classGuidelineContradictionBlocked: classRuleFrame?.classGuidelineContradictionBlocked === true,
          classGuidelineContradictionReason: classRuleFrame?.classGuidelineContradictionReason || "",
          legalWitnessTagId: "cn-l7-verbstem-classes",
          legalWitnessTagIds: ["cn-l7-verbstem-classes", ...(classRuleFrame?.classGuidelineWitnessPresent ? ["cn-l7-class-guidelines"] : []), ...(classRuleFrame?.classBTypeOneCausativeWitnessRequired ? ["cn-l24-type-one-causative-a"] : [])],
          ruleFrameKind: classRuleFrame?.kind || ""
        }, {
          lesson: "Andrews Lesson 7",
          layer: "predicate-formation",
          rule: "Class-specific stem variant cooperates with Lesson 5 tense and subject logic.",
          passed: predicateAuthorized && priorAuthorized,
          aspect: predicateFormationRuleFrame?.aspect || "",
          stemVariant: predicateFormationRuleFrame?.stemVariant || "",
          selectedImperfectiveShape: predicateFormationRuleFrame?.selectedImperfectiveShape || "",
          selectedImperfectiveShapeReason: predicateFormationRuleFrame?.selectedImperfectiveShapeReason || "",
          shapeActions: predicateFormationRuleFrame?.shapeActions || [],
          freeShapeSwitchAllowed: predicateFormationRuleFrame?.freeShapeSwitchAllowed === true,
          hostileRejectedStemVariants: predicateFormationRuleFrame?.hostileRejectedStemVariants || [],
          predicateTableCell: predicateFormationRuleFrame?.predicateTableCell || "",
          predicateTableSide: predicateFormationRuleFrame?.predicateTableSide || "",
          predicateTableRuleId: predicateFormationRuleFrame?.predicateTableRuleId || "",
          predicateExpectedCarrier: predicateFormationRuleFrame?.predicateExpectedCarrier || "",
          predicateActions: predicateFormationRuleFrame?.predicateActions || [],
          predicateCarrierContradictionBlocked: predicateFormationRuleFrame?.predicateCarrierContradictionBlocked === true,
          predicateCarrierContradictionReason: predicateFormationRuleFrame?.predicateCarrierContradictionReason || "",
          hostileRejectedPredicateCarriers: predicateFormationRuleFrame?.hostileRejectedPredicateCarriers || [],
          underlyingStemVariant: predicateFormationRuleFrame?.underlyingStemVariant || "",
          analyzedStemVariant: predicateFormationRuleFrame?.analyzedStemVariant || "",
          silentTruncatedCarrierPreserved: predicateFormationRuleFrame?.silentTruncatedCarrierPreserved === true,
          vowelLengthOperation: predicateFormationRuleFrame?.vowelLengthOperation || "",
          vowelLengthEnvironment: predicateFormationRuleFrame?.vowelLengthEnvironment || "",
          sourceFinalVowel: predicateFormationRuleFrame?.sourceFinalVowel || "",
          selectedFinalVowel: predicateFormationRuleFrame?.selectedFinalVowel || "",
          selectedFinalVowelLong: predicateFormationRuleFrame?.selectedFinalVowelLong === true,
          authorizedStemVariants: predicateFormationRuleFrame?.authorizedStemVariants || [],
          optionalIrregularStemVariants: predicateFormationRuleFrame?.optionalIrregularStemVariants || [],
          optionalIrregularFormulaRealizations,
          priorVncProofKind: priorProof.kind || "",
          legalWitnessTagId: "cn-l7-core-tense-predicate-formation",
          legalWitnessTagIds: ["cn-l7-core-tense-predicate-formation", ...(predicateFormationRuleFrame?.optionalIrregularActive ? ["cn-l11-optional-irregular-ti-perfective"] : [])],
          ruleFrameKind: predicateFormationRuleFrame?.kind || ""
        }, {
          lesson: "Andrews Lesson 7",
          layer: "analysis-translation",
          rule: "VNC interpretation must preserve subject-plus-predicate structure and object-boundary notes.",
          passed: analysisRuleFrame?.authorizationStatus === "authorized",
          legalWitnessTagId: "cn-l7-analysis-translation",
          ruleFrameKind: analysisRuleFrame?.kind || ""
        }, {
          lesson: "Andrews Lesson 7",
          layer: "object-relationship-and-tla-fusion",
          rule: "Indefinite object relationships and tla fusion stay separated from nuclear-clause authority.",
          passed: objectRelationshipRuleFrame?.authorizationStatus === "authorized" && tlaFusionRuleFrame?.authorizationStatus === "authorized",
          selectedObjectRelationshipKind: objectRelationshipRuleFrame?.selectedObjectRelationshipKind || "",
          selectedObjectRelationshipGroup: objectRelationshipRuleFrame?.selectedObjectRelationshipGroup || "",
          selectedIndefiniteObject: objectRelationshipRuleFrame?.selectedIndefiniteObject || "",
          possibleIndefiniteObjects: objectRelationshipRuleFrame?.possibleIndefiniteObjects || [],
          relatedSpecificObjectKinds: objectRelationshipRuleFrame?.relatedSpecificObjectKinds || [],
          objectRelationshipActions: objectRelationshipRuleFrame?.objectRelationshipActions || [],
          objectRelationshipContradictionBlocked: objectRelationshipRuleFrame?.objectRelationshipContradictionBlocked === true,
          objectRelationshipContradictionReason: objectRelationshipRuleFrame?.objectRelationshipContradictionReason || "",
          objectSlotAfterFusion: tlaFusionRuleFrame?.objectSlotAfterFusion || "",
          selectedTlaFusionAnalysisKind: tlaFusionRuleFrame?.selectedTlaFusionAnalysisKind || "",
          tlaFusionGeneralRule: tlaFusionRuleFrame?.generalRule || "",
          tlaFusionRuleVariables: tlaFusionRuleFrame?.ruleVariables || {},
          tlaFusionRuleInputs: tlaFusionRuleFrame?.ruleInputs || {},
          tlaFusionRuleOutputs: tlaFusionRuleFrame?.ruleOutputs || {},
          tlaFusionProofAnchors: tlaFusionRuleFrame?.proofAnchors || [],
          tlaFusionWitnessUsePolicy: tlaFusionRuleFrame?.witnessUsePolicy || "",
          tlaFusionWitnessesAreWhitelist: tlaFusionRuleFrame?.witnessesAreWhitelist === true,
          tlaFusionActions: tlaFusionRuleFrame?.tlaFusionActions || [],
          adverbBoundaryTestApplied: tlaFusionRuleFrame?.adverbBoundaryTestApplied === true,
          adverbBoundaryDecision: tlaFusionRuleFrame?.adverbBoundaryDecision || "",
          incorporatedAdverb: tlaFusionRuleFrame?.incorporatedAdverb || "",
          adverbPosition: tlaFusionRuleFrame?.adverbPosition || "",
          tlaFusionBuildKind: tlaFusionRuleFrame?.tlaFusionBuildKind || "",
          tlaFusionBuildLogic: tlaFusionRuleFrame?.tlaFusionBuildLogic || "",
          tlaFusionBuildEmbedStem: tlaFusionRuleFrame?.tlaFusionBuildEmbedStem || "",
          tlaFusionBuildMatrixStem: tlaFusionRuleFrame?.tlaFusionBuildMatrixStem || "",
          tlaFusionBuildSegment: tlaFusionRuleFrame?.tlaFusionBuildSegment || "",
          tlaFusionConstructedDerivedStem: tlaFusionRuleFrame?.tlaFusionConstructedDerivedStem || "",
          sourceStemVariant: tlaFusionRuleFrame?.sourceStemVariant || "",
          derivedStem: tlaFusionRuleFrame?.derivedStem || "",
          sourceFormula: tlaFusionRuleFrame?.sourceFormula || "",
          targetFormula: tlaFusionRuleFrame?.targetFormula || "",
          selectedAnalysis: tlaFusionRuleFrame?.selectedAnalysis || "",
          tlaFusionContradictionBlocked: tlaFusionRuleFrame?.tlaFusionContradictionBlocked === true,
          tlaFusionContradictionReason: tlaFusionRuleFrame?.tlaFusionContradictionReason || "",
          legalWitnessTagIds: ["cn-l7-indefinite-personal-object-relationship", "cn-l7-tla-fusion"],
          ruleFrameKinds: [objectRelationshipRuleFrame?.kind || "", tlaFusionRuleFrame?.kind || ""].filter(Boolean)
        }, ...(expandedVncBoundaryApplies ? [{
          lesson: "Andrews Lesson 8",
          layer: "expanded-vnc-boundary",
          rule: "Directional/locative prefixes are VNC-internal; antecessive and negative prefixes are outside the VNC formula.",
          passed: expandedVncBoundaryFrame?.authorizationStatus === "authorized",
          directionalPrefix: expandedVncBoundaryFrame?.directionalPrefix || "",
          directionalInsideVncCore: expandedVncBoundaryFrame?.directionalInsideVncCore === true,
          directionalPlacement: expandedVncBoundaryFrame?.directionalPlacement || "",
          outsidePrefixes: expandedVncBoundaryFrame?.outsidePrefixes || [],
          outsidePrefixesBecomeFormulaSlots: expandedVncBoundaryFrame?.outsidePrefixesBecomeFormulaSlots === true,
          hostileRejectedFormulaSlots: expandedVncBoundaryFrame?.hostileRejectedFormulaSlots || [],
          objectShapePreservedByOutsidePrefixes: expandedVncBoundaryFrame?.objectShapePreservedByOutsidePrefixes === true,
          legalWitnessTagIds: ["cn-l8-81-expanded-vnc-boundary", ...(expandedVncBoundaryFrame?.directionalPrefix ? ["cn-l8-811-directional-locative-inside-core"] : []), ...(expandedVncBoundaryFrame?.antecessiveOutsideVnc ? ["cn-l8-812-antecessive-outside-vnc"] : []), ...(expandedVncBoundaryFrame?.negativeOutsideVnc ? ["cn-l8-813-negative-outside-vnc"] : [])],
          ruleFrameKind: expandedVncBoundaryFrame?.kind || ""
        }] : [])],
        conclusion: {
          authorized,
          blockReason: authorized ? "" : lesson11ParadigmPlan?.blockReason || lesson11VncApplicationFrame?.blockReason || zeroRootLowerLessonBridgeFrame?.blockReason || finalBoundaryRealizationFrame?.blockReason || "classical-vnc-proof-not-authorized",
          verbstem: authorized ? structureRuleFrame?.stem || "" : "",
          progressiveAssimilationSourceStem: authorized ? progressiveAssimilationFrame?.sourceStem || "" : "",
          progressiveAssimilationAnalyzedStem: authorized ? progressiveAssimilationFrame?.realizedAnalyzedStem || "" : "",
          progressiveAssimilationSolidStem: authorized ? progressiveAssimilationFrame?.realizedSolidStem || "" : "",
          progressiveAssimilationApplied: authorized ? progressiveAssimilationFrame?.transformationApplied === true : false,
          progressiveAssimilationRuleIds: authorized ? progressiveAssimilationFrame?.appliedRuleIds || [] : [],
          lesson11ParadigmPlan: authorized ? lesson11ParadigmPlan || null : null,
          lesson11VncApplicationFrame: authorized ? lesson11VncApplicationFrame || null : null,
          lesson11LexemeId: authorized ? lesson11ParadigmPlan?.lexemeId || "" : "",
          lesson11IrregularityKind: authorized ? lesson11ParadigmPlan?.irregularityKind || "" : "",
          lesson11RequestedSemanticTense: authorized ? lesson11ParadigmPlan?.requestedSemanticTense || "" : "",
          lesson11MorphologicalTense: authorized ? lesson11ParadigmPlan?.morphologicalTense || "" : "",
          lesson11SelectedStem: authorized ? lesson11VncApplicationFrame?.selectedPredicateStem || "" : "",
          lesson11Alternatives: authorized ? lesson11ParadigmPlan?.alternatives || [] : [],
          lesson11AuthorizedAlternatives: authorized ? lesson11ParadigmPlan?.authorizedAlternatives || [] : [],
          lesson11RejectedVariants: authorized ? lesson11ParadigmPlan?.rejectedVariants || [] : [],
          lesson11AlternativeFormulaRealizations: authorized ? lesson11AlternativeFormulaRealizations : [],
          lesson11Actions: authorized ? lesson11ParadigmPlan?.actions || [] : [],
          lesson11ZeroRootOperationFrame: authorized ? lesson11ParadigmPlan?.zeroRootOperationFrame || null : null,
          lesson11ParadigmRelationFrame: authorized ? lesson11ParadigmPlan?.paradigmRelationFrame || null : null,
          lesson11ParadigmRelation: authorized ? lesson11ParadigmPlan?.paradigmRelationFrame?.relationDisplay || "" : "",
          morphology: authorized ? structureRuleFrame?.morphology || "" : "",
          internalMorphs: authorized ? structureRuleFrame?.internalMorphs || [] : [],
          internalMorphFrames: authorized ? structureRuleFrame?.internalMorphFrames || [] : [],
          internalMorphBoundaryScope: authorized ? structureRuleFrame?.internalMorphBoundaryScope || "" : "",
          stemAsFormulaPredicate: authorized ? structureRuleFrame?.stemAsFormulaPredicate || "" : "",
          internalMorphsRemainInsideVerbstem: authorized ? structureRuleFrame?.internalMorphsRemainInsideVerbstem === true : false,
          internalMorphsBecomeFormulaSlots: authorized ? structureRuleFrame?.internalMorphsBecomeFormulaSlots === true : false,
          formulaSlotSplitAllowed: authorized ? structureRuleFrame?.formulaSlotSplitAllowed === true : false,
          formulaSlotMaterialFromInternalMorphs: authorized ? structureRuleFrame?.formulaSlotMaterialFromInternalMorphs || [] : [],
          stemTranslationPolicy: authorized ? structureRuleFrame?.stemTranslationPolicy || "" : "",
          stemTranslationUnit: authorized ? structureRuleFrame?.stemTranslationUnit || "" : "",
          internalMorphGlossPolicy: authorized ? structureRuleFrame?.internalMorphGlossPolicy || "" : "",
          internalMorphsGlossedIndividually: authorized ? structureRuleFrame?.internalMorphsGlossedIndividually === true : false,
          inventedInternalMorphGlossAllowed: authorized ? structureRuleFrame?.inventedInternalMorphGlossAllowed === true : false,
          inventedInternalMorphGlosses: authorized ? structureRuleFrame?.inventedInternalMorphGlosses || [] : [],
          unknownButAuthorizedMorphs: authorized ? structureRuleFrame?.unknownButAuthorizedMorphs || [] : [],
          unknownInternalMorphKeys: authorized ? structureRuleFrame?.unknownInternalMorphKeys || [] : [],
          unknownMeaningDoesNotBlockStem: authorized ? structureRuleFrame?.unknownMeaningDoesNotBlockStem === true : false,
          unknownInternalMorphsBlockStem: authorized ? structureRuleFrame?.unknownInternalMorphsBlockStem === true : false,
          contrastiveAnalysisBoundaryJustified: authorized ? structureRuleFrame?.contrastiveAnalysisBoundaryJustified === true : false,
          morphBoundaryJustification: authorized ? structureRuleFrame?.morphBoundaryJustification || "" : "",
          citationForm: authorized ? citationRuleFrame?.citationForm || "" : "",
          selectedSourceKind: authorized ? sourceSelectionFrame?.selectedSourceKind || "" : "",
          fuenteSourceSelectedBy: authorized ? sourceSelectionFrame?.selectedBy || "" : "",
          sourceSelectionActions: authorized ? sourceSelectionFrame?.sourceSelectionActions || [] : [],
          canvasAllowsUserSourceSelection: authorized ? sourceSelectionFrame?.canvasAllowsUserSourceSelection === true : false,
          userSelectionCanvasPermitted: authorized ? sourceSelectionFrame?.userSelectionCanvasPermitted === true : false,
          userSelectionContradictsCanvas: authorized ? sourceSelectionFrame?.userSelectionContradictsCanvas === true : false,
          userSelectionContradictionReason: authorized ? sourceSelectionFrame?.userSelectionContradictionReason || "" : "",
          selectedSourceEmbedStem: authorized ? sourceSelectionFrame?.selectedEmbedStem || "" : "",
          selectedSourceMatrixStem: authorized ? sourceSelectionFrame?.selectedMatrixStem || "" : "",
          selectedSourceInternalMorphs: authorized ? sourceSelectionFrame?.selectedInternalMorphs || [] : [],
          selectedSourceWholeStem: authorized ? sourceSelectionFrame?.selectedWholeStem || "" : "",
          citationActions: authorized ? citationRuleFrame?.citationActions || [] : [],
          citationMarker: authorized ? citationRuleFrame?.marker || "" : "",
          projectiveCitationRepresentative: authorized ? citationRuleFrame?.projectiveCitationRepresentative || "" : "",
          projectiveCitationRepresentativeSource: authorized ? citationRuleFrame?.projectiveCitationRepresentativeSource || "" : "",
          projectiveCitationRepresentativeAmbiguous: authorized ? citationRuleFrame?.projectiveCitationRepresentativeAmbiguous === true : false,
          formulaSlotCitationAllowed: authorized ? citationRuleFrame?.formulaSlotCitationAllowed === true : false,
          formulaSlotCitationBlocked: authorized ? citationRuleFrame?.formulaSlotCitationBlocked === true : false,
          blockedCitationMarkers: authorized ? citationRuleFrame?.blockedCitationMarkers || [] : [],
          citationUsesFormulaSlotPlaceholder: authorized ? citationRuleFrame?.citationUsesFormulaSlotPlaceholder === true : false,
          hostileCitationMarkerRejected: authorized ? citationRuleFrame?.hostileCitationMarkerRejected === true : false,
          classId: authorized ? classRuleFrame?.classId || "" : "",
          classTargetStem: authorized ? classRuleFrame?.classTargetStem || "" : "",
          classTargetRole: authorized ? classRuleFrame?.classTargetRole || "" : "",
          classTargetValence: authorized ? classRuleFrame?.classTargetValence || "" : "",
          classTargetDerivedFromTlaFusion: authorized ? classRuleFrame?.classTargetDerivedFromTlaFusion === true : false,
          sourceVerbstem: authorized ? classRuleFrame?.sourceVerbstem || "" : "",
          derivedFusedVerbstem: authorized ? classRuleFrame?.derivedFusedVerbstem || "" : "",
          subclass: authorized ? classRuleFrame?.subclass || "" : "",
          classActions: authorized ? classRuleFrame?.classActions || [] : [],
          imperfectiveShapeCount: authorized ? classRuleFrame?.imperfectiveShapeCount || "" : "",
          perfectiveShapeCount: authorized ? classRuleFrame?.perfectiveShapeCount || "" : "",
          totalShapeCount: authorized ? classRuleFrame?.totalShapeCount || "" : "",
          classBPerfectiveKind: authorized ? classRuleFrame?.classBPerfectiveKind || "" : "",
          classBSilentCausativeCarrierPresent: authorized ? classRuleFrame?.classBSilentCausativeCarrierPresent === true : false,
          classBSilentCausativeCarrier: authorized ? classRuleFrame?.classBSilentCausativeCarrier || "" : "",
          classBUnderlyingPerfectiveStem: authorized ? classRuleFrame?.classBUnderlyingPerfectiveStem || "" : "",
          classBAnalyzedPerfectiveStem: authorized ? classRuleFrame?.classBAnalyzedPerfectiveStem || "" : "",
          classBAnalysisPrintsSilentCarrier: authorized ? classRuleFrame?.classBAnalysisPrintsSilentCarrier === true : false,
          classBAnalysisOmissionPolicy: authorized ? classRuleFrame?.classBAnalysisOmissionPolicy || "" : "",
          classBSilentCausativeCarrierWitness: authorized ? classRuleFrame?.classBSilentCausativeCarrierWitness || null : null,
          classBTypeOneCausativeWitness: authorized ? classRuleFrame?.classBTypeOneCausativeWitness || null : null,
          classBTypeOneCausativeWitnessRequired: authorized ? classRuleFrame?.classBTypeOneCausativeWitnessRequired === true : false,
          classBObjectPronounDistinguishesMorphology: authorized ? classRuleFrame?.classBObjectPronounDistinguishesMorphology === true : false,
          classBPhonologicalIdentityDoesNotEraseMorphology: authorized ? classRuleFrame?.classBPhonologicalIdentityDoesNotEraseMorphology === true : false,
          traditionalSpellingWarningRecord: authorized ? classRuleFrame?.traditionalSpellingWarningRecord || null : null,
          traditionalSpellingWarningPresent: authorized ? classRuleFrame?.traditionalSpellingWarningPresent === true : false,
          traditionalSpellingMisclassificationBlocked: authorized ? classRuleFrame?.traditionalSpellingMisclassificationBlocked === true : false,
          traditionalSpellingBlocksClassCMisread: authorized ? classRuleFrame?.traditionalSpellingBlocksClassCMisread === true : false,
          hiddenTraditionalSpellingSound: authorized ? classRuleFrame?.hiddenTraditionalSpellingSound || "" : "",
          hiddenTraditionalSpellingSequence: authorized ? classRuleFrame?.hiddenTraditionalSpellingSequence || "" : "",
          traditionalSpellingPerfectiveStem: authorized ? classRuleFrame?.traditionalSpellingPerfectiveStem || "" : "",
          traditionalSpellingChangeRule: authorized ? classRuleFrame?.traditionalSpellingChangeRule || "" : "",
          classGuidelineAuthorityRecord: authorized ? classRuleFrame?.classGuidelineAuthorityRecord || null : null,
          classGuidelineWitnessPresent: authorized ? classRuleFrame?.classGuidelineWitnessPresent === true : false,
          classGuidelineRuleId: authorized ? classRuleFrame?.classGuidelineRuleId || "" : "",
          classGuidelineExactWitness: authorized ? classRuleFrame?.classGuidelineExactWitness || "" : "",
          classGuidelineLineStart: authorized ? classRuleFrame?.classGuidelineLineStart || 0 : 0,
          classGuidelineLineEnd: authorized ? classRuleFrame?.classGuidelineLineEnd || 0 : 0,
          classGuidelineDefaultClassId: authorized ? classRuleFrame?.classGuidelineDefaultClassId || "" : "",
          classGuidelineAllowedClassIds: authorized ? classRuleFrame?.classGuidelineAllowedClassIds || [] : [],
          classGuidelineClassOptions: authorized ? classRuleFrame?.classGuidelineClassOptions || [] : [],
          classGuidelineAlternativeClassIds: authorized ? classRuleFrame?.classGuidelineAlternativeClassIds || [] : [],
          classGuidelineSemanticCondition: authorized ? classRuleFrame?.classGuidelineSemanticCondition || "" : "",
          classGuidelineExceptionKind: authorized ? classRuleFrame?.classGuidelineExceptionKind || "" : "",
          classGuidelineSelectedClassAllowed: authorized ? classRuleFrame?.classGuidelineSelectedClassAllowed === true : false,
          classGuidelineContradictionBlocked: authorized ? classRuleFrame?.classGuidelineContradictionBlocked === true : false,
          classGuidelineContradictionReason: authorized ? classRuleFrame?.classGuidelineContradictionReason || "" : "",
          classGuidelinePerfectiveStem: authorized ? classRuleFrame?.classGuidelinePerfectiveStem || "" : "",
          aspect: authorized ? predicateFormationRuleFrame?.aspect || "" : "",
          stemVariant: authorized ? predicateFormationRuleFrame?.stemVariant || "" : "",
          selectedImperfectiveShape: authorized ? predicateFormationRuleFrame?.selectedImperfectiveShape || "" : "",
          selectedImperfectiveShapeReason: authorized ? predicateFormationRuleFrame?.selectedImperfectiveShapeReason || "" : "",
          shapeActions: authorized ? predicateFormationRuleFrame?.shapeActions || [] : [],
          freeShapeSwitchAllowed: authorized ? predicateFormationRuleFrame?.freeShapeSwitchAllowed === true : false,
          hostileRejectedStemVariants: authorized ? predicateFormationRuleFrame?.hostileRejectedStemVariants || [] : [],
          predicateTableFrame: authorized ? predicateFormationRuleFrame?.predicateTableFrame || null : null,
          predicateTableCell: authorized ? predicateFormationRuleFrame?.predicateTableCell || "" : "",
          predicateTableSide: authorized ? predicateFormationRuleFrame?.predicateTableSide || "" : "",
          predicateTableRuleId: authorized ? predicateFormationRuleFrame?.predicateTableRuleId || "" : "",
          predicateTableExactWitness: authorized ? predicateFormationRuleFrame?.predicateTableExactWitness || "" : "",
          predicateExpectedStemVariant: authorized ? predicateFormationRuleFrame?.predicateExpectedStemVariant || "" : "",
          predicateExpectedTenseMorph: authorized ? predicateFormationRuleFrame?.predicateExpectedTenseMorph || "" : "",
          predicateExpectedCarrier: authorized ? predicateFormationRuleFrame?.predicateExpectedCarrier || "" : "",
          predicateActions: authorized ? predicateFormationRuleFrame?.predicateActions || [] : [],
          predicateCarrierContradictionBlocked: authorized ? predicateFormationRuleFrame?.predicateCarrierContradictionBlocked === true : false,
          predicateCarrierContradictionReason: authorized ? predicateFormationRuleFrame?.predicateCarrierContradictionReason || "" : "",
          hostileRejectedPredicateCarriers: authorized ? predicateFormationRuleFrame?.hostileRejectedPredicateCarriers || [] : [],
          underlyingStemVariant: authorized ? predicateFormationRuleFrame?.underlyingStemVariant || "" : "",
          analyzedStemVariant: authorized ? predicateFormationRuleFrame?.analyzedStemVariant || "" : "",
          silentTruncatedCarrier: authorized ? predicateFormationRuleFrame?.silentTruncatedCarrier || "" : "",
          silentTruncatedCarrierPreserved: authorized ? predicateFormationRuleFrame?.silentTruncatedCarrierPreserved === true : false,
          silentTruncatedCarrierPrintedInLessonAnalysis: authorized ? predicateFormationRuleFrame?.silentTruncatedCarrierPrintedInLessonAnalysis === true : false,
          ...(authorized && predicateFormationRuleFrame?.vowelLengthOperation && predicateFormationRuleFrame.vowelLengthOperation !== "preserve-source-vowel-length" ? {
            vowelLengthOperation: predicateFormationRuleFrame.vowelLengthOperation,
            vowelLengthEnvironment: predicateFormationRuleFrame.vowelLengthEnvironment || "",
            sourceFinalVowel: predicateFormationRuleFrame.sourceFinalVowel || "",
            selectedFinalVowel: predicateFormationRuleFrame.selectedFinalVowel || "",
            selectedFinalVowelLong: predicateFormationRuleFrame.selectedFinalVowelLong === true
          } : {}),
          authorizedStemVariants: authorized ? predicateFormationRuleFrame?.authorizedStemVariants || [] : [],
          optionalIrregularStemVariants: authorized ? predicateFormationRuleFrame?.optionalIrregularStemVariants || [] : [],
          optionalIrregularFormulaRealizations: authorized ? optionalIrregularFormulaRealizations : [],
          optionalIrregularPreference: authorized ? predicateFormationRuleFrame?.optionalIrregularPreference || "" : "",
          selectedFormula,
          selectedFormulaWithoutExpandedVncBoundary: authorized ? priorConclusion.formulaRealization || "" : "",
          priorVncSlotFrame: authorized ? priorVncSlotFrame : null,
          typedVncSlotAuthority: authorized ? finalBoundaryRealizationFrame?.typedSlotAuthority === true : false,
          formulaStringAuthority: authorized ? finalBoundaryRealizationFrame?.formulaStringAuthority === true : false,
          finalTypedVncSlotFrame: authorized ? finalBoundaryRealizationFrame?.typedSlotFrame || null : null,
          finalTypedVncSemanticIdentity: authorized ? finalBoundaryRealizationFrame?.finalSemanticIdentity || "" : "",
          finalBoundaryRealizationFrame: authorized ? finalBoundaryRealizationFrame : null,
          canvasLayerEvaluationFrame: authorized ? canvasLayerEvaluationFrame : null,
          activeCanvasLayerIds: authorized ? canvasLayerEvaluationFrame?.activeLayerIds || [] : [],
          finalizerLayerId: authorized ? canvasLayerEvaluationFrame?.finalizerLayerId || "" : "",
          finalBoundaryRealizationKind: authorized ? finalBoundaryRealizationFrame?.kind || "" : "",
          finalBoundaryRealizationActions: authorized ? finalBoundaryRealizationFrame?.actions || [] : [],
          finalBoundaryInputFormula: authorized ? finalBoundaryRealizationFrame?.inputFormula || "" : "",
          finalBoundaryObjectMorphIdentity: authorized ? finalBoundaryRealizationFrame?.objectMorphIdentity || "" : "",
          finalBoundaryObjectMorphIdentityKind: authorized ? finalBoundaryRealizationFrame?.objectMorphIdentityKind || "" : "",
          finalBoundaryObjectRegularSpellings: authorized ? finalBoundaryRealizationFrame?.objectRegularSpellings || [] : [],
          finalBoundaryObjectSupportiveSpelling: authorized ? finalBoundaryRealizationFrame?.objectSupportiveSpelling || "" : "",
          finalBoundarySelectedObjectSlotBeforeRealization: authorized ? finalBoundaryRealizationFrame?.selectedObjectSlotBeforeFinalBoundary || "" : "",
          finalBoundaryFinalObjectSlot: authorized ? finalBoundaryRealizationFrame?.finalObjectSlot || "" : "",
          finalBoundarySpellingSelectedAfterSlotOrder: authorized ? finalBoundaryRealizationFrame?.spellingSelectedAfterSlotOrder || "" : "",
          finalBoundaryThirdSingularKObjectBeforeOn: authorized ? finalBoundaryRealizationFrame?.thirdSingularKObjectBeforeOn === true : false,
          finalBoundarySubjectCarrierBeforeRealization: authorized ? finalBoundaryRealizationFrame?.subjectCarrierBeforeFinalBoundary || "" : "",
          finalBoundaryFinalSubjectCarrier: authorized ? finalBoundaryRealizationFrame?.finalSubjectCarrier || "" : "",
          finalBoundarySubjectSupportiveVowelAction: authorized ? finalBoundaryRealizationFrame?.subjectSupportiveVowelAction || "" : "",
          finalBoundaryNextCarrierAfterSubject: authorized ? finalBoundaryRealizationFrame?.nextCarrierAfterSubject || "" : "",
          finalBoundaryNextSoundAfterSubject: authorized ? finalBoundaryRealizationFrame?.nextSoundAfterSubject || "" : "",
          finalBoundaryPers1SupportiveIToOApplied: authorized ? finalBoundaryRealizationFrame?.pers1SupportiveIToOApplied === true : false,
          finalBoundaryPluralObjectVa2BeforeRealization: authorized ? finalBoundaryRealizationFrame?.pluralObjectVa2BeforeFinalBoundary || "" : "",
          finalBoundaryFinalPluralObjectVa2: authorized ? finalBoundaryRealizationFrame?.finalPluralObjectVa2 || "" : "",
          finalBoundaryNum1BeforeRealization: authorized ? finalBoundaryRealizationFrame?.num1BeforeFinalBoundary || "" : "",
          finalBoundaryFinalNum1: authorized ? finalBoundaryRealizationFrame?.finalNum1 || "" : "",
          finalBoundaryFinalNum2: authorized ? finalBoundaryRealizationFrame?.finalNum2 || "" : "",
          finalBoundaryNum1LeftCarrierSource: authorized ? finalBoundaryRealizationFrame?.finalNum1LeftCarrierSource || "" : "",
          finalBoundaryNum1LeftSound: authorized ? finalBoundaryRealizationFrame?.finalNum1LeftSound || "" : "",
          finalBoundaryNum1RealizationApplies: authorized ? finalBoundaryRealizationFrame?.finalNum1RealizationApplies === true : false,
          finalBoundaryNum1SupportiveVowelAction: authorized ? finalBoundaryRealizationFrame?.finalNum1SupportiveVowelAction || "" : "",
          finalBoundaryNum1SquareZeroReplacesQui: authorized ? finalBoundaryRealizationFrame?.finalNum1SquareZeroReplacesQui === true : false,
          expandedVncBoundaryApplies: authorized ? expandedVncBoundaryApplies : false,
          expandedVncBoundaryActions: authorized ? expandedVncBoundaryFrame?.boundaryActions || [] : [],
          directionalPrefix: authorized ? expandedVncBoundaryFrame?.directionalPrefix || "" : "",
          directionalMeaning: authorized ? expandedVncBoundaryFrame?.directionalMeaning || "" : "",
          directionalInsideVncCore: authorized ? expandedVncBoundaryFrame?.directionalInsideVncCore === true : false,
          directionalFormulaSlotAuthorized: authorized ? expandedVncBoundaryFrame?.directionalFormulaSlotAuthorized === true : false,
          directionalPlacement: authorized ? expandedVncBoundaryFrame?.directionalPlacement || "" : "",
          vncInternalPrefixSlots: authorized ? expandedVncBoundaryFrame?.vncInternalPrefixSlots || [] : [],
          outsidePrefixes: authorized ? expandedVncBoundaryFrame?.outsidePrefixes || [] : [],
          vncExternalPrefixSlots: authorized ? expandedVncBoundaryFrame?.vncExternalPrefixSlots || [] : [],
          outsidePrefixesBecomeFormulaSlots: authorized ? expandedVncBoundaryFrame?.outsidePrefixesBecomeFormulaSlots === true : false,
          outsidePrefixFormulaSlotAuthorized: authorized ? expandedVncBoundaryFrame?.outsidePrefixFormulaSlotAuthorized === true : false,
          formulaSlotMaterialFromOutsidePrefixes: authorized ? expandedVncBoundaryFrame?.formulaSlotMaterialFromOutsidePrefixes || [] : [],
          antecessiveOutsideVnc: authorized ? expandedVncBoundaryFrame?.antecessiveOutsideVnc === true : false,
          antecessiveTenseAuthorized: authorized ? expandedVncBoundaryFrame?.antecessiveTenseAuthorized === true : false,
          negativeOutsideVnc: authorized ? expandedVncBoundaryFrame?.negativeOutsideVnc === true : false,
          caNegativeTrigger: authorized ? expandedVncBoundaryFrame?.caNegativeTrigger || "" : "",
          caNegativeTriggerAuthorized: authorized ? expandedVncBoundaryFrame?.caNegativeTriggerAuthorized === true : false,
          negativeAttractedToAntecessive: authorized ? expandedVncBoundaryFrame?.negativeAttractedToAntecessive === true : false,
          objectShapePreservedByOutsidePrefixes: authorized ? expandedVncBoundaryFrame?.objectShapePreservedByOutsidePrefixes === true : false,
          objectSpellingAffectedByOutsidePrefixes: authorized ? expandedVncBoundaryFrame?.objectSpellingAffectedByOutsidePrefixes === true : false,
          supportivePers1IToOContext: authorized ? expandedVncBoundaryFrame?.supportivePers1IToOContext === true : false,
          hostileRejectedExpandedVncFormulaSlots: authorized ? expandedVncBoundaryFrame?.hostileRejectedFormulaSlots || [] : [],
          objectRelationshipApplies: authorized ? objectRelationshipRuleFrame?.objectRelationshipApplies === true : false,
          selectedObjectRelationshipKind: authorized ? objectRelationshipRuleFrame?.selectedObjectRelationshipKind || "" : "",
          selectedObjectRelationshipGroup: authorized ? objectRelationshipRuleFrame?.selectedObjectRelationshipGroup || "" : "",
          selectedObjectRelationshipRuleId: authorized ? objectRelationshipRuleFrame?.selectedObjectRelationshipRuleId || "" : "",
          selectedObjectRelationshipExactWitness: authorized ? objectRelationshipRuleFrame?.selectedObjectRelationshipExactWitness || "" : "",
          selectedObjectRelationshipLineStart: authorized ? objectRelationshipRuleFrame?.selectedObjectRelationshipLineStart || 0 : 0,
          selectedObjectRelationshipLineEnd: authorized ? objectRelationshipRuleFrame?.selectedObjectRelationshipLineEnd || 0 : 0,
          selectedObjectKind: authorized ? objectRelationshipRuleFrame?.selectedObjectKind || "" : "",
          selectedObjectPerson: authorized ? objectRelationshipRuleFrame?.selectedObjectPerson || "" : "",
          selectedObjectHumanness: authorized ? objectRelationshipRuleFrame?.selectedObjectHumanness || "" : "",
          selectedObjectPronounClass: authorized ? objectRelationshipRuleFrame?.selectedObjectPronounClass || "" : "",
          selectedObjectValenceArity: authorized ? objectRelationshipRuleFrame?.selectedObjectValenceArity || "" : "",
          selectedObjectSlot: authorized ? objectRelationshipRuleFrame?.selectedObjectSlot || "" : "",
          selectedIndefiniteObject: authorized ? objectRelationshipRuleFrame?.selectedIndefiniteObject || "" : "",
          selectedIndefiniteObjectSurface: authorized ? objectRelationshipRuleFrame?.selectedIndefiniteObjectSurface || "" : "",
          possibleIndefiniteObjects: authorized ? objectRelationshipRuleFrame?.possibleIndefiniteObjects || [] : [],
          relatedSpecificObjectKinds: authorized ? objectRelationshipRuleFrame?.relatedSpecificObjectKinds || [] : [],
          relationshipRange: authorized ? objectRelationshipRuleFrame?.relationshipRange || [] : [],
          pluralReflexiveReciprocalPossible: authorized ? objectRelationshipRuleFrame?.pluralReflexiveReciprocalPossible === true : false,
          objectRelationshipActions: authorized ? objectRelationshipRuleFrame?.objectRelationshipActions || [] : [],
          objectRelationshipContradictionBlocked: authorized ? objectRelationshipRuleFrame?.objectRelationshipContradictionBlocked === true : false,
          objectRelationshipContradictionReason: authorized ? objectRelationshipRuleFrame?.objectRelationshipContradictionReason || "" : "",
          collapseIndefiniteIntoSpecificAllowed: authorized ? objectRelationshipRuleFrame?.collapseIndefiniteIntoSpecificAllowed === true : false,
          objectSlotAfterFusion: authorized ? tlaFusionRuleFrame?.objectSlotAfterFusion || "" : "",
          selectedTlaFusionAnalysisKind: authorized ? tlaFusionRuleFrame?.selectedTlaFusionAnalysisKind || "" : "",
          tlaFusionGeneralRule: authorized ? tlaFusionRuleFrame?.generalRule || "" : "",
          tlaFusionRuleVariables: authorized ? tlaFusionRuleFrame?.ruleVariables || {} : {},
          tlaFusionRuleInputs: authorized ? tlaFusionRuleFrame?.ruleInputs || {} : {},
          tlaFusionRuleOutputs: authorized ? tlaFusionRuleFrame?.ruleOutputs || {} : {},
          tlaFusionProofAnchors: authorized ? tlaFusionRuleFrame?.proofAnchors || [] : [],
          tlaFusionWitnessUsePolicy: authorized ? tlaFusionRuleFrame?.witnessUsePolicy || "" : "",
          tlaFusionWitnessesAreWhitelist: authorized ? tlaFusionRuleFrame?.witnessesAreWhitelist === true : false,
          tlaFusionActions: authorized ? tlaFusionRuleFrame?.tlaFusionActions || [] : [],
          tlaFusionFused: authorized ? tlaFusionRuleFrame?.fused === true : false,
          tlaFusionEligible: authorized ? tlaFusionRuleFrame?.tlaEligible === true : false,
          explicitTlaFusionRequested: authorized ? tlaFusionRuleFrame?.explicitFusionRequested === true : false,
          incorporatedAdverb: authorized ? tlaFusionRuleFrame?.incorporatedAdverb || "" : "",
          adverbPosition: authorized ? tlaFusionRuleFrame?.adverbPosition || "" : "",
          adverbPrecedesTla: authorized ? tlaFusionRuleFrame?.adverbPrecedesTla === true : false,
          adverbFollowsTla: authorized ? tlaFusionRuleFrame?.adverbFollowsTla === true : false,
          adverbBoundaryTestApplied: authorized ? tlaFusionRuleFrame?.adverbBoundaryTestApplied === true : false,
          adverbBoundaryDecision: authorized ? tlaFusionRuleFrame?.adverbBoundaryDecision || "" : "",
          tlaFusionBuildKind: authorized ? tlaFusionRuleFrame?.tlaFusionBuildKind || "" : "",
          tlaFusionBuildLogic: authorized ? tlaFusionRuleFrame?.tlaFusionBuildLogic || "" : "",
          tlaFusionBuildEmbedStem: authorized ? tlaFusionRuleFrame?.tlaFusionBuildEmbedStem || "" : "",
          tlaFusionBuildMatrixStem: authorized ? tlaFusionRuleFrame?.tlaFusionBuildMatrixStem || "" : "",
          tlaFusionBuildSegment: authorized ? tlaFusionRuleFrame?.tlaFusionBuildSegment || "" : "",
          tlaFusionConstructedDerivedStem: authorized ? tlaFusionRuleFrame?.tlaFusionConstructedDerivedStem || "" : "",
          tlaFusionSourceStemVariant: authorized ? tlaFusionRuleFrame?.sourceStemVariant || "" : "",
          tlaFusionDerivedStem: authorized ? tlaFusionRuleFrame?.derivedStem || "" : "",
          tlaFusionSourceFormula: authorized ? tlaFusionRuleFrame?.sourceFormula || "" : "",
          tlaFusionTargetFormula: authorized ? tlaFusionRuleFrame?.targetFormula || "" : "",
          tlaFusionSelectedAnalysis: authorized ? tlaFusionRuleFrame?.selectedAnalysis || "" : "",
          tlaFusionContradictionBlocked: authorized ? tlaFusionRuleFrame?.tlaFusionContradictionBlocked === true : false,
          tlaFusionContradictionReason: authorized ? tlaFusionRuleFrame?.tlaFusionContradictionReason || "" : ""
        }
      };
    }
    function buildClassicalNahuatlLesson7SelectedOutputLogicFrame({
      proofFrame = null,
      structureRuleFrame = null,
      sourceSelectionFrame = null,
      progressiveAssimilationFrame = null,
      lesson11ParadigmPlan = null,
      lesson11VncApplicationFrame = null,
      citationRuleFrame = null,
      classRuleFrame = null,
      predicateFormationRuleFrame = null,
      analysisRuleFrame = null,
      objectRelationshipRuleFrame = null,
      tlaFusionRuleFrame = null,
      expandedVncBoundaryFrame = null,
      sentenceSurfaceFrame = null
    } = {}) {
      const authorized = proofFrame?.conclusion?.authorized === true;
      const ruleFrames = [structureRuleFrame, sourceSelectionFrame, progressiveAssimilationFrame, lesson11ParadigmPlan, lesson11VncApplicationFrame, citationRuleFrame, classRuleFrame, predicateFormationRuleFrame, analysisRuleFrame, objectRelationshipRuleFrame, tlaFusionRuleFrame, ...(expandedVncBoundaryFrame?.boundaryApplies === true ? [expandedVncBoundaryFrame] : []), ...(sentenceSurfaceFrame?.sentenceSurfaceApplies === true ? [sentenceSurfaceFrame] : [])].filter(Boolean);
      return {
        kind: "classical-nahuatl-lesson7-selected-output-logic-frame",
        lesson: "Andrews Lesson 7",
        logicRole: "selected-output-logic",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        authorizationStatus: authorized ? "authorized" : "blocked",
        outputableSlots: [...CLASSICAL_NAHUATL_LESSON7_OUTPUTABLE_SLOTS],
        selectedFormula: authorized ? proofFrame.conclusion.selectedFormula : "",
        outputFillers: authorized ? {
          verbstem: proofFrame.conclusion.verbstem,
          ...(progressiveAssimilationFrame ? {
            progressiveAssimilationSourceStem: proofFrame.conclusion.progressiveAssimilationSourceStem,
            progressiveAssimilationAnalyzedStem: proofFrame.conclusion.progressiveAssimilationAnalyzedStem,
            progressiveAssimilationSolidStem: proofFrame.conclusion.progressiveAssimilationSolidStem,
            progressiveAssimilationApplied: proofFrame.conclusion.progressiveAssimilationApplied,
            progressiveAssimilationRuleIds: proofFrame.conclusion.progressiveAssimilationRuleIds
          } : {}),
          ...(lesson11ParadigmPlan?.applies ? {
            lesson11LexemeId: proofFrame.conclusion.lesson11LexemeId,
            lesson11IrregularityKind: proofFrame.conclusion.lesson11IrregularityKind,
            lesson11RequestedSemanticTense: proofFrame.conclusion.lesson11RequestedSemanticTense,
            lesson11MorphologicalTense: proofFrame.conclusion.lesson11MorphologicalTense,
            lesson11SelectedStem: proofFrame.conclusion.lesson11SelectedStem,
            lesson11Alternatives: proofFrame.conclusion.lesson11Alternatives,
            lesson11AuthorizedAlternatives: proofFrame.conclusion.lesson11AuthorizedAlternatives,
            lesson11RejectedVariants: proofFrame.conclusion.lesson11RejectedVariants,
            lesson11AlternativeFormulaRealizations: proofFrame.conclusion.lesson11AlternativeFormulaRealizations,
            lesson11Actions: proofFrame.conclusion.lesson11Actions,
            lesson11ZeroRootOperationFrame: proofFrame.conclusion.lesson11ZeroRootOperationFrame,
            lesson11ParadigmRelationFrame: proofFrame.conclusion.lesson11ParadigmRelationFrame,
            lesson11ParadigmRelation: proofFrame.conclusion.lesson11ParadigmRelation
          } : {}),
          morphology: proofFrame.conclusion.morphology,
          internalMorphs: proofFrame.conclusion.internalMorphs,
          internalMorphBoundaryScope: proofFrame.conclusion.internalMorphBoundaryScope,
          stemAsFormulaPredicate: proofFrame.conclusion.stemAsFormulaPredicate,
          internalMorphsRemainInsideVerbstem: proofFrame.conclusion.internalMorphsRemainInsideVerbstem,
          internalMorphsBecomeFormulaSlots: proofFrame.conclusion.internalMorphsBecomeFormulaSlots,
          formulaSlotSplitAllowed: proofFrame.conclusion.formulaSlotSplitAllowed,
          formulaSlotMaterialFromInternalMorphs: proofFrame.conclusion.formulaSlotMaterialFromInternalMorphs,
          stemTranslationPolicy: proofFrame.conclusion.stemTranslationPolicy,
          stemTranslationUnit: proofFrame.conclusion.stemTranslationUnit,
          internalMorphGlossPolicy: proofFrame.conclusion.internalMorphGlossPolicy,
          internalMorphsGlossedIndividually: proofFrame.conclusion.internalMorphsGlossedIndividually,
          inventedInternalMorphGlossAllowed: proofFrame.conclusion.inventedInternalMorphGlossAllowed,
          inventedInternalMorphGlosses: proofFrame.conclusion.inventedInternalMorphGlosses,
          unknownButAuthorizedMorphs: proofFrame.conclusion.unknownButAuthorizedMorphs,
          unknownInternalMorphKeys: proofFrame.conclusion.unknownInternalMorphKeys,
          unknownMeaningDoesNotBlockStem: proofFrame.conclusion.unknownMeaningDoesNotBlockStem,
          unknownInternalMorphsBlockStem: proofFrame.conclusion.unknownInternalMorphsBlockStem,
          contrastiveAnalysisBoundaryJustified: proofFrame.conclusion.contrastiveAnalysisBoundaryJustified,
          morphBoundaryJustification: proofFrame.conclusion.morphBoundaryJustification,
          selectedSourceKind: proofFrame.conclusion.selectedSourceKind,
          fuenteSourceSelectedBy: proofFrame.conclusion.fuenteSourceSelectedBy,
          sourceSelectionActions: proofFrame.conclusion.sourceSelectionActions,
          canvasAllowsUserSourceSelection: proofFrame.conclusion.canvasAllowsUserSourceSelection,
          userSelectionCanvasPermitted: proofFrame.conclusion.userSelectionCanvasPermitted,
          userSelectionContradictsCanvas: proofFrame.conclusion.userSelectionContradictsCanvas,
          userSelectionContradictionReason: proofFrame.conclusion.userSelectionContradictionReason,
          selectedSourceEmbedStem: proofFrame.conclusion.selectedSourceEmbedStem,
          selectedSourceMatrixStem: proofFrame.conclusion.selectedSourceMatrixStem,
          selectedSourceInternalMorphs: proofFrame.conclusion.selectedSourceInternalMorphs,
          selectedSourceWholeStem: proofFrame.conclusion.selectedSourceWholeStem,
          citationForm: proofFrame.conclusion.citationForm,
          citationActions: proofFrame.conclusion.citationActions,
          citationMarker: proofFrame.conclusion.citationMarker,
          projectiveCitationRepresentative: proofFrame.conclusion.projectiveCitationRepresentative,
          projectiveCitationRepresentativeSource: proofFrame.conclusion.projectiveCitationRepresentativeSource,
          projectiveCitationRepresentativeAmbiguous: proofFrame.conclusion.projectiveCitationRepresentativeAmbiguous,
          formulaSlotCitationAllowed: proofFrame.conclusion.formulaSlotCitationAllowed,
          formulaSlotCitationBlocked: proofFrame.conclusion.formulaSlotCitationBlocked,
          blockedCitationMarkers: proofFrame.conclusion.blockedCitationMarkers,
          citationUsesFormulaSlotPlaceholder: proofFrame.conclusion.citationUsesFormulaSlotPlaceholder,
          hostileCitationMarkerRejected: proofFrame.conclusion.hostileCitationMarkerRejected,
          classId: proofFrame.conclusion.classId,
          classTargetStem: proofFrame.conclusion.classTargetStem,
          classTargetRole: proofFrame.conclusion.classTargetRole,
          classTargetValence: proofFrame.conclusion.classTargetValence,
          classTargetDerivedFromTlaFusion: proofFrame.conclusion.classTargetDerivedFromTlaFusion,
          sourceVerbstem: proofFrame.conclusion.sourceVerbstem,
          derivedFusedVerbstem: proofFrame.conclusion.derivedFusedVerbstem,
          subclass: proofFrame.conclusion.subclass,
          classActions: proofFrame.conclusion.classActions,
          imperfectiveShapeCount: proofFrame.conclusion.imperfectiveShapeCount,
          perfectiveShapeCount: proofFrame.conclusion.perfectiveShapeCount,
          totalShapeCount: proofFrame.conclusion.totalShapeCount,
          classBPerfectiveKind: proofFrame.conclusion.classBPerfectiveKind,
          classBSilentCausativeCarrierPresent: proofFrame.conclusion.classBSilentCausativeCarrierPresent,
          classBSilentCausativeCarrier: proofFrame.conclusion.classBSilentCausativeCarrier,
          classBUnderlyingPerfectiveStem: proofFrame.conclusion.classBUnderlyingPerfectiveStem,
          classBAnalyzedPerfectiveStem: proofFrame.conclusion.classBAnalyzedPerfectiveStem,
          classBAnalysisPrintsSilentCarrier: proofFrame.conclusion.classBAnalysisPrintsSilentCarrier,
          classBAnalysisOmissionPolicy: proofFrame.conclusion.classBAnalysisOmissionPolicy,
          classBSilentCausativeCarrierWitness: proofFrame.conclusion.classBSilentCausativeCarrierWitness,
          classBTypeOneCausativeWitness: proofFrame.conclusion.classBTypeOneCausativeWitness,
          classBTypeOneCausativeWitnessRequired: proofFrame.conclusion.classBTypeOneCausativeWitnessRequired,
          classBObjectPronounDistinguishesMorphology: proofFrame.conclusion.classBObjectPronounDistinguishesMorphology,
          classBPhonologicalIdentityDoesNotEraseMorphology: proofFrame.conclusion.classBPhonologicalIdentityDoesNotEraseMorphology,
          traditionalSpellingWarningRecord: proofFrame.conclusion.traditionalSpellingWarningRecord,
          traditionalSpellingWarningPresent: proofFrame.conclusion.traditionalSpellingWarningPresent,
          traditionalSpellingMisclassificationBlocked: proofFrame.conclusion.traditionalSpellingMisclassificationBlocked,
          traditionalSpellingBlocksClassCMisread: proofFrame.conclusion.traditionalSpellingBlocksClassCMisread,
          hiddenTraditionalSpellingSound: proofFrame.conclusion.hiddenTraditionalSpellingSound,
          hiddenTraditionalSpellingSequence: proofFrame.conclusion.hiddenTraditionalSpellingSequence,
          traditionalSpellingPerfectiveStem: proofFrame.conclusion.traditionalSpellingPerfectiveStem,
          traditionalSpellingChangeRule: proofFrame.conclusion.traditionalSpellingChangeRule,
          classGuidelineAuthorityRecord: proofFrame.conclusion.classGuidelineAuthorityRecord,
          classGuidelineWitnessPresent: proofFrame.conclusion.classGuidelineWitnessPresent,
          classGuidelineRuleId: proofFrame.conclusion.classGuidelineRuleId,
          classGuidelineExactWitness: proofFrame.conclusion.classGuidelineExactWitness,
          classGuidelineLineStart: proofFrame.conclusion.classGuidelineLineStart,
          classGuidelineLineEnd: proofFrame.conclusion.classGuidelineLineEnd,
          classGuidelineDefaultClassId: proofFrame.conclusion.classGuidelineDefaultClassId,
          classGuidelineAllowedClassIds: proofFrame.conclusion.classGuidelineAllowedClassIds,
          classGuidelineClassOptions: proofFrame.conclusion.classGuidelineClassOptions,
          classGuidelineAlternativeClassIds: proofFrame.conclusion.classGuidelineAlternativeClassIds,
          classGuidelineSemanticCondition: proofFrame.conclusion.classGuidelineSemanticCondition,
          classGuidelineExceptionKind: proofFrame.conclusion.classGuidelineExceptionKind,
          classGuidelineSelectedClassAllowed: proofFrame.conclusion.classGuidelineSelectedClassAllowed,
          classGuidelineContradictionBlocked: proofFrame.conclusion.classGuidelineContradictionBlocked,
          classGuidelineContradictionReason: proofFrame.conclusion.classGuidelineContradictionReason,
          classGuidelinePerfectiveStem: proofFrame.conclusion.classGuidelinePerfectiveStem,
          aspect: proofFrame.conclusion.aspect,
          stemVariant: proofFrame.conclusion.stemVariant,
          selectedImperfectiveShape: proofFrame.conclusion.selectedImperfectiveShape,
          selectedImperfectiveShapeReason: proofFrame.conclusion.selectedImperfectiveShapeReason,
          shapeActions: proofFrame.conclusion.shapeActions,
          freeShapeSwitchAllowed: proofFrame.conclusion.freeShapeSwitchAllowed,
          hostileRejectedStemVariants: proofFrame.conclusion.hostileRejectedStemVariants,
          predicateTableCell: proofFrame.conclusion.predicateTableCell,
          predicateTableSide: proofFrame.conclusion.predicateTableSide,
          predicateTableRuleId: proofFrame.conclusion.predicateTableRuleId,
          predicateTableExactWitness: proofFrame.conclusion.predicateTableExactWitness,
          predicateExpectedStemVariant: proofFrame.conclusion.predicateExpectedStemVariant,
          predicateExpectedTenseMorph: proofFrame.conclusion.predicateExpectedTenseMorph,
          predicateExpectedCarrier: proofFrame.conclusion.predicateExpectedCarrier,
          predicateActions: proofFrame.conclusion.predicateActions,
          predicateCarrierContradictionBlocked: proofFrame.conclusion.predicateCarrierContradictionBlocked,
          predicateCarrierContradictionReason: proofFrame.conclusion.predicateCarrierContradictionReason,
          hostileRejectedPredicateCarriers: proofFrame.conclusion.hostileRejectedPredicateCarriers,
          underlyingStemVariant: proofFrame.conclusion.underlyingStemVariant,
          analyzedStemVariant: proofFrame.conclusion.analyzedStemVariant,
          silentTruncatedCarrier: proofFrame.conclusion.silentTruncatedCarrier,
          silentTruncatedCarrierPreserved: proofFrame.conclusion.silentTruncatedCarrierPreserved,
          silentTruncatedCarrierPrintedInLessonAnalysis: proofFrame.conclusion.silentTruncatedCarrierPrintedInLessonAnalysis,
          ...(proofFrame.conclusion.vowelLengthOperation ? {
            vowelLengthOperation: proofFrame.conclusion.vowelLengthOperation,
            vowelLengthEnvironment: proofFrame.conclusion.vowelLengthEnvironment,
            sourceFinalVowel: proofFrame.conclusion.sourceFinalVowel,
            selectedFinalVowel: proofFrame.conclusion.selectedFinalVowel,
            selectedFinalVowelLong: proofFrame.conclusion.selectedFinalVowelLong
          } : {}),
          authorizedStemVariants: proofFrame.conclusion.authorizedStemVariants,
          optionalIrregularStemVariants: proofFrame.conclusion.optionalIrregularStemVariants,
          optionalIrregularFormulaRealizations: proofFrame.conclusion.optionalIrregularFormulaRealizations,
          optionalIrregularPreference: proofFrame.conclusion.optionalIrregularPreference,
          ...(proofFrame.conclusion.expandedVncBoundaryApplies ? {
            selectedFormulaWithoutExpandedVncBoundary: proofFrame.conclusion.selectedFormulaWithoutExpandedVncBoundary,
            finalBoundaryRealizationFrame: proofFrame.conclusion.finalBoundaryRealizationFrame,
            finalBoundaryRealizationKind: proofFrame.conclusion.finalBoundaryRealizationKind,
            finalBoundaryRealizationActions: proofFrame.conclusion.finalBoundaryRealizationActions,
            finalBoundaryInputFormula: proofFrame.conclusion.finalBoundaryInputFormula,
            finalBoundaryObjectMorphIdentity: proofFrame.conclusion.finalBoundaryObjectMorphIdentity,
            finalBoundaryObjectMorphIdentityKind: proofFrame.conclusion.finalBoundaryObjectMorphIdentityKind,
            finalBoundaryObjectRegularSpellings: proofFrame.conclusion.finalBoundaryObjectRegularSpellings,
            finalBoundaryObjectSupportiveSpelling: proofFrame.conclusion.finalBoundaryObjectSupportiveSpelling,
            finalBoundarySelectedObjectSlotBeforeRealization: proofFrame.conclusion.finalBoundarySelectedObjectSlotBeforeRealization,
            finalBoundaryFinalObjectSlot: proofFrame.conclusion.finalBoundaryFinalObjectSlot,
            finalBoundarySpellingSelectedAfterSlotOrder: proofFrame.conclusion.finalBoundarySpellingSelectedAfterSlotOrder,
            finalBoundaryThirdSingularKObjectBeforeOn: proofFrame.conclusion.finalBoundaryThirdSingularKObjectBeforeOn,
            finalBoundarySubjectCarrierBeforeRealization: proofFrame.conclusion.finalBoundarySubjectCarrierBeforeRealization,
            finalBoundaryFinalSubjectCarrier: proofFrame.conclusion.finalBoundaryFinalSubjectCarrier,
            finalBoundarySubjectSupportiveVowelAction: proofFrame.conclusion.finalBoundarySubjectSupportiveVowelAction,
            finalBoundaryNextCarrierAfterSubject: proofFrame.conclusion.finalBoundaryNextCarrierAfterSubject,
            finalBoundaryNextSoundAfterSubject: proofFrame.conclusion.finalBoundaryNextSoundAfterSubject,
            finalBoundaryPers1SupportiveIToOApplied: proofFrame.conclusion.finalBoundaryPers1SupportiveIToOApplied,
            finalBoundaryPluralObjectVa2BeforeRealization: proofFrame.conclusion.finalBoundaryPluralObjectVa2BeforeRealization,
            finalBoundaryFinalPluralObjectVa2: proofFrame.conclusion.finalBoundaryFinalPluralObjectVa2,
            finalBoundaryNum1BeforeRealization: proofFrame.conclusion.finalBoundaryNum1BeforeRealization,
            finalBoundaryFinalNum1: proofFrame.conclusion.finalBoundaryFinalNum1,
            finalBoundaryFinalNum2: proofFrame.conclusion.finalBoundaryFinalNum2,
            finalBoundaryNum1LeftCarrierSource: proofFrame.conclusion.finalBoundaryNum1LeftCarrierSource,
            finalBoundaryNum1LeftSound: proofFrame.conclusion.finalBoundaryNum1LeftSound,
            finalBoundaryNum1RealizationApplies: proofFrame.conclusion.finalBoundaryNum1RealizationApplies,
            finalBoundaryNum1SupportiveVowelAction: proofFrame.conclusion.finalBoundaryNum1SupportiveVowelAction,
            finalBoundaryNum1SquareZeroReplacesQui: proofFrame.conclusion.finalBoundaryNum1SquareZeroReplacesQui,
            expandedVncBoundaryActions: proofFrame.conclusion.expandedVncBoundaryActions,
            directionalPrefix: proofFrame.conclusion.directionalPrefix,
            directionalMeaning: proofFrame.conclusion.directionalMeaning,
            directionalInsideVncCore: proofFrame.conclusion.directionalInsideVncCore,
            directionalFormulaSlotAuthorized: proofFrame.conclusion.directionalFormulaSlotAuthorized,
            directionalPlacement: proofFrame.conclusion.directionalPlacement,
            vncInternalPrefixSlots: proofFrame.conclusion.vncInternalPrefixSlots,
            outsidePrefixes: proofFrame.conclusion.outsidePrefixes,
            vncExternalPrefixSlots: proofFrame.conclusion.vncExternalPrefixSlots,
            outsidePrefixesBecomeFormulaSlots: proofFrame.conclusion.outsidePrefixesBecomeFormulaSlots,
            outsidePrefixFormulaSlotAuthorized: proofFrame.conclusion.outsidePrefixFormulaSlotAuthorized,
            formulaSlotMaterialFromOutsidePrefixes: proofFrame.conclusion.formulaSlotMaterialFromOutsidePrefixes,
            antecessiveOutsideVnc: proofFrame.conclusion.antecessiveOutsideVnc,
            antecessiveTenseAuthorized: proofFrame.conclusion.antecessiveTenseAuthorized,
            negativeOutsideVnc: proofFrame.conclusion.negativeOutsideVnc,
            caNegativeTrigger: proofFrame.conclusion.caNegativeTrigger,
            caNegativeTriggerAuthorized: proofFrame.conclusion.caNegativeTriggerAuthorized,
            negativeAttractedToAntecessive: proofFrame.conclusion.negativeAttractedToAntecessive,
            objectShapePreservedByOutsidePrefixes: proofFrame.conclusion.objectShapePreservedByOutsidePrefixes,
            objectSpellingAffectedByOutsidePrefixes: proofFrame.conclusion.objectSpellingAffectedByOutsidePrefixes,
            supportivePers1IToOContext: proofFrame.conclusion.supportivePers1IToOContext,
            hostileRejectedExpandedVncFormulaSlots: proofFrame.conclusion.hostileRejectedExpandedVncFormulaSlots
          } : {}),
          ...(sentenceSurfaceFrame?.sentenceSurfaceApplies === true ? {
            sentenceSurfaceStatus: sentenceSurfaceFrame.authorizationStatus,
            sentenceSurfaceKind: sentenceSurfaceFrame.kind,
            sentenceType: sentenceSurfaceFrame.sentenceType,
            lesson8SentenceType: sentenceSurfaceFrame.lesson8SentenceType,
            lesson9SentenceType: sentenceSurfaceFrame.lesson9SentenceType,
            lesson10SentenceType: sentenceSurfaceFrame.lesson10SentenceType,
            lowerLayerSelectedOutputRole: sentenceSurfaceFrame.lowerLayerSelectedOutputRole,
            lowerLessonOutputIsProvisional: sentenceSurfaceFrame.lowerLessonOutputIsProvisional,
            highestActiveCanvasLayer: sentenceSurfaceFrame.highestActiveCanvasLayer,
            sentenceFinalizerLayer: sentenceSurfaceFrame.sentenceFinalizerLayer,
            sentenceCombinationRule: sentenceSurfaceFrame.sentenceCombinationRule,
            sentenceCombinationSubrule: sentenceSurfaceFrame.sentenceCombinationSubrule,
            negativeQuestionAuthorized: sentenceSurfaceFrame.negativeQuestionAuthorized,
            sentenceOperationType: sentenceSurfaceFrame.sentenceOperationType,
            sentenceBaseVncFormula: sentenceSurfaceFrame.baseVncFormula,
            sentenceVncFormulaAuthorityRole: sentenceSurfaceFrame.vncFormulaAuthorityRole,
            sentenceParticles: sentenceSurfaceFrame.sentenceParticles,
            sentencePrefixalStack: sentenceSurfaceFrame.sentencePrefixalStack,
            sentencePrefixalStackAttachment: sentenceSurfaceFrame.sentencePrefixalStackAttachment,
            sentenceLesson11Construction: sentenceSurfaceFrame.lesson11Construction || "",
            sentenceLesson11ConstructionParticles: sentenceSurfaceFrame.lesson11ConstructionParticles || [],
            sentenceLesson11ConstructionPosition: sentenceSurfaceFrame.lesson11ConstructionPosition || "",
            sentenceParticlePositions: sentenceSurfaceFrame.sentenceParticlePositions,
            sentenceParticlesBecomeFormulaSlots: sentenceSurfaceFrame.sentenceParticlesBecomeFormulaSlots,
            formulaSlotMaterialFromSentenceParticles: sentenceSurfaceFrame.formulaSlotMaterialFromSentenceParticles,
            sentenceFinalPunctuation: sentenceSurfaceFrame.finalPunctuation,
            sentenceQuestionMode: sentenceSurfaceFrame.questionMode,
            sentenceEmphaticParticle: sentenceSurfaceFrame.emphaticParticle,
            sentenceNegativePrefix: sentenceSurfaceFrame.negativePrefix,
            sentenceNegativePrefixOutsideVnc: sentenceSurfaceFrame.negativePrefixOutsideVnc,
            sentenceIntroductoryParticle: sentenceSurfaceFrame.introductoryParticle,
            sentenceIntroductoryParticleRequired: sentenceSurfaceFrame.introductoryParticleRequired,
            sentenceIntroductoryParticlePresent: sentenceSurfaceFrame.introductoryParticlePresent,
            sentenceIntroductoryParticleOmissionAllowed: sentenceSurfaceFrame.introductoryParticleOmissionAllowed,
            sentenceIntroductoryParticleOmissionReason: sentenceSurfaceFrame.introductoryParticleOmissionReason,
            sentencePrefaceParticle: sentenceSurfaceFrame.prefaceParticle,
            sentenceRequestedPrefaceParticle: sentenceSurfaceFrame.requestedPrefaceParticle,
            sentencePrefaceParticleAuthorized: sentenceSurfaceFrame.prefaceParticleAuthorized,
            sentenceIntroductoryModifier: sentenceSurfaceFrame.introductoryModifier,
            sentenceRequestedIntroductoryModifier: sentenceSurfaceFrame.requestedIntroductoryModifier,
            sentenceIntroductoryModifierAuthorized: sentenceSurfaceFrame.introductoryModifierAuthorized,
            sentenceOptativeVncRequired: sentenceSurfaceFrame.optativeVncRequired,
            sentenceOptativeVncPresent: sentenceSurfaceFrame.optativeVncPresent,
            sentenceAdmonitiveVncRequired: sentenceSurfaceFrame.admonitiveVncRequired,
            sentenceAdmonitiveVncPresent: sentenceSurfaceFrame.admonitiveVncPresent,
            sentenceAdmonitiveNonpastRequired: sentenceSurfaceFrame.admonitiveNonpastRequired,
            sentenceAdmonitiveNonpastPresent: sentenceSurfaceFrame.admonitiveNonpastPresent,
            sentenceAdmonitiveRequestedTense: sentenceSurfaceFrame.admonitiveRequestedTense,
            sentenceAdmonitiveRequestedTenseAuthorized: sentenceSurfaceFrame.admonitiveRequestedTenseAuthorized,
            sentenceAdmonitiveOnlyNonpastTense: sentenceSurfaceFrame.admonitiveOnlyNonpastTense,
            sentenceAdmonitivePerfectiveStemRequired: sentenceSurfaceFrame.admonitivePerfectiveStemRequired,
            sentenceAdmonitivePerfectiveStemPresent: sentenceSurfaceFrame.admonitivePerfectiveStemPresent,
            sentenceAdmonitiveStemAspect: sentenceSurfaceFrame.admonitiveStemAspect,
            sentenceAdmonitiveVncTranslationValueOutsideSentence: sentenceSurfaceFrame.admonitiveVncTranslationValueOutsideSentence,
            sentenceAdmonitiveClassId: sentenceSurfaceFrame.admonitiveClassId,
            sentenceAdmonitiveTenseMorph: sentenceSurfaceFrame.admonitiveTenseMorph,
            sentenceAdmonitiveClassATenseMorphContrast: sentenceSurfaceFrame.admonitiveClassATenseMorphContrast,
            sentenceAdmonitiveTenseMorphContrastAuthorized: sentenceSurfaceFrame.admonitiveTenseMorphContrastAuthorized,
            sentenceAdmonitiveContrastSet: sentenceSurfaceFrame.admonitiveContrastSet,
            sentenceAdmonitiveContrastClassProfile: sentenceSurfaceFrame.admonitiveContrastClassProfile,
            sentenceAdmonitiveOptativeContrast: sentenceSurfaceFrame.admonitiveOptativeContrast,
            sentenceAdmonitivePresentIndicativeContrast: sentenceSurfaceFrame.admonitivePresentIndicativeContrast,
            sentenceAdmonitivePreteritIndicativeContrast: sentenceSurfaceFrame.admonitivePreteritIndicativeContrast,
            sentenceAdmonitiveSecondPersonOptativeDistinction: sentenceSurfaceFrame.admonitiveSecondPersonOptativeDistinction,
            sentenceAdmonitivePluralSubjectsAlwaysDistinctive: sentenceSurfaceFrame.admonitivePluralSubjectsAlwaysDistinctive,
            sentenceAdmonitiveMaDistinguishesSentenceLayer: sentenceSurfaceFrame.admonitiveMaDistinguishesSentenceLayer,
            sentenceAdmonitiveGlottalStopAmbiguityWarning: sentenceSurfaceFrame.admonitiveGlottalStopAmbiguityWarning,
            sentenceAdmonitiveGlottalStopAmbiguityScope: sentenceSurfaceFrame.admonitiveGlottalStopAmbiguityScope,
            sentenceAdmonitiveOppositeMeaningRiskIfGlottalUnrepresented: sentenceSurfaceFrame.admonitiveOppositeMeaningRiskIfGlottalUnrepresented,
            sentenceAdmonitiveHMorphRoleContrast: sentenceSurfaceFrame.admonitiveHMorphRoleContrast,
            sentenceAdmonitiveAntecessivePrefixAllowed: sentenceSurfaceFrame.admonitiveAntecessivePrefixAllowed,
            sentenceAdmonitiveAntecessivePrefixRequested: sentenceSurfaceFrame.admonitiveAntecessivePrefixRequested,
            sentenceAdmonitiveAntecessiveContrast: sentenceSurfaceFrame.admonitiveAntecessiveContrast,
            sentenceAdmonitiveRequestedContrastReading: sentenceSurfaceFrame.admonitiveRequestedContrastReading,
            sentenceAdmonitiveRequestedContrastReadingAuthorized: sentenceSurfaceFrame.admonitiveRequestedContrastReadingAuthorized,
            sentenceAdmonitiveNumberDyad: sentenceSurfaceFrame.admonitiveNumberDyad,
            sentenceAdmonitiveNumberDyadKind: sentenceSurfaceFrame.admonitiveNumberDyadKind,
            sentenceAdmonitiveNum1Morpheme: sentenceSurfaceFrame.admonitiveNum1Morpheme,
            sentenceAdmonitiveNum1RegularMorphCondition: sentenceSurfaceFrame.admonitiveNum1RegularMorphCondition,
            sentenceAdmonitiveSingularNumberDyad: sentenceSurfaceFrame.admonitiveSingularNumberDyad,
            sentenceAdmonitivePluralNumberDyads: sentenceSurfaceFrame.admonitivePluralNumberDyads,
            sentenceAdmonitiveNum2SingularMorph: sentenceSurfaceFrame.admonitiveNum2SingularMorph,
            sentenceAdmonitiveNum2PluralMorphs: sentenceSurfaceFrame.admonitiveNum2PluralMorphs,
            sentenceAdmonitiveForce: sentenceSurfaceFrame.admonitiveForce,
            sentenceAdmonitiveMoodPolarity: sentenceSurfaceFrame.admonitiveMoodPolarity,
            sentenceAdmonitiveIsPositiveByMood: sentenceSurfaceFrame.admonitiveIsPositiveByMood,
            sentenceAdmonitiveVetitiveTermAccepted: sentenceSurfaceFrame.admonitiveVetitiveTermAccepted,
            sentenceAdmonitiveProhibitionReadingAllowed: sentenceSurfaceFrame.admonitiveProhibitionReadingAllowed,
            sentenceAdmonitiveNegativeCommandReadingAllowed: sentenceSurfaceFrame.admonitiveNegativeCommandReadingAllowed,
            sentenceAdmonitiveDontTranslationAuthority: sentenceSurfaceFrame.admonitiveDontTranslationAuthority,
            sentenceAdmonitiveMayNotTranslationAuthority: sentenceSurfaceFrame.admonitiveMayNotTranslationAuthority,
            sentenceAdmonitiveProhibitionReplacementLayer: sentenceSurfaceFrame.admonitiveProhibitionReplacementLayer,
            sentenceAdmonitiveAssertionConversionSource: sentenceSurfaceFrame.admonitiveAssertionConversionSource,
            sentenceAdmonitiveAssertionConversionTarget: sentenceSurfaceFrame.admonitiveAssertionConversionTarget,
            sentenceAdmonitiveVncSubstitution: sentenceSurfaceFrame.admonitiveVncSubstitution,
            sentenceAdmonitiveMaPosition: sentenceSurfaceFrame.admonitiveMaPosition,
            sentenceAdmonitiveNenStrengtheningKind: sentenceSurfaceFrame.admonitiveNenStrengtheningKind,
            sentenceAdmonitiveNenLexicalMeaning: sentenceSurfaceFrame.admonitiveNenLexicalMeaning,
            sentenceAdmonitiveMaNenWritingPolicy: sentenceSurfaceFrame.admonitiveMaNenWritingPolicy,
            sentenceAdmonitiveTraditionalSolidSpelling: sentenceSurfaceFrame.admonitiveTraditionalSolidSpelling,
            sentenceAdmonitiveWarningRenderingPolicy: sentenceSurfaceFrame.admonitiveWarningRenderingPolicy,
            sentenceAdmonitiveRequestedTranslationReading: sentenceSurfaceFrame.admonitiveRequestedTranslationReading,
            sentenceAdmonitiveRequestedTranslationReadingAuthorized: sentenceSurfaceFrame.admonitiveRequestedTranslationReadingAuthorized,
            sentenceAdmonitivePositiveDontTranslationAuthority: sentenceSurfaceFrame.admonitivePositiveDontTranslationAuthority,
            sentenceAdmonitiveMayNotWishTranslationAuthority: sentenceSurfaceFrame.admonitiveMayNotWishTranslationAuthority,
            sentenceFutureIndicativeAsOptative: sentenceSurfaceFrame.futureIndicativeAsOptative,
            sentenceFutureCommandIntroductoryParticleRequired: sentenceSurfaceFrame.futureCommandIntroductoryParticleRequired,
            sentenceCanvasRole: sentenceSurfaceFrame.canvasSentenceRole,
            sentenceCanvasRoleNotice: sentenceSurfaceFrame.canvasSentenceRoleNotice,
            sentenceRoleDerivedFromSubject: sentenceSurfaceFrame.sentenceRoleDerivedFromSubject,
            sentenceRoleAuthority: sentenceSurfaceFrame.sentenceRoleAuthority,
            sentenceLesson9NegativeRequested: sentenceSurfaceFrame.lesson9NegativeRequested,
            sentenceLesson9NegativeTransformation: sentenceSurfaceFrame.lesson9NegativeTransformation,
            sentenceLesson10NegativeRequested: sentenceSurfaceFrame.lesson10NegativeRequested,
            sentenceLesson10NegativeTransformation: sentenceSurfaceFrame.lesson10NegativeTransformation,
            sentenceAdmonitiveNegativeAssertionConversionSource: sentenceSurfaceFrame.admonitiveNegativeAssertionConversionSource,
            sentenceAdmonitiveNegativeAssertionConversionTarget: sentenceSurfaceFrame.admonitiveNegativeAssertionConversionTarget,
            sentenceAdmonitiveNegativePrefixAttachment: sentenceSurfaceFrame.admonitiveNegativePrefixAttachment,
            sentenceAdmonitiveNegativeIntroductoryCollocation: sentenceSurfaceFrame.admonitiveNegativeIntroductoryCollocation,
            sentenceAdmonitiveNegativeIntroductoryCollocationRequired: sentenceSurfaceFrame.admonitiveNegativeIntroductoryCollocationRequired,
            sentenceAdmonitiveNegativeForceDefinition: sentenceSurfaceFrame.admonitiveNegativeForceDefinition,
            sentenceAdmonitivePositiveVetativeTermAuthority: sentenceSurfaceFrame.admonitivePositiveVetativeTermAuthority,
            sentenceAdmonitiveCaNegativeRequested: sentenceSurfaceFrame.admonitiveCaNegativeRequested,
            sentenceAdmonitiveCaNegativeFromLesson9Blocked: sentenceSurfaceFrame.admonitiveCaNegativeFromLesson9Blocked,
            sentenceAdmonitiveNenRequired: sentenceSurfaceFrame.admonitiveNenRequired,
            sentenceAdmonitiveNenPresent: sentenceSurfaceFrame.admonitiveNenPresent,
            sentenceAdmonitiveNenOptional: sentenceSurfaceFrame.admonitiveNenOptional,
            sentenceAdmonitiveMaNenCollocation: sentenceSurfaceFrame.admonitiveMaNenCollocation,
            sentenceCaNegativeBlockedByAdmonitive: sentenceSurfaceFrame.caNegativeBlockedByAdmonitive,
            sentenceCaNegativeLicensedByIntroductoryParticle: sentenceSurfaceFrame.caNegativeLicensedByIntroductoryParticle,
            sentenceAhNegativeRequiredWithoutIntroductoryParticle: sentenceSurfaceFrame.ahNegativeRequiredWithoutIntroductoryParticle,
            sentenceNegativePrefixSource: sentenceSurfaceFrame.negativePrefixSource,
            sentenceActions: sentenceSurfaceFrame.sentenceActions,
            sentenceHostileRejectedFormulaSlots: sentenceSurfaceFrame.hostileRejectedFormulaSlots,
            sentenceBlockReason: sentenceSurfaceFrame.blockReason
          } : {}),
          ...(proofFrame.conclusion.objectRelationshipApplies ? {
            selectedObjectRelationshipKind: proofFrame.conclusion.selectedObjectRelationshipKind,
            selectedObjectRelationshipGroup: proofFrame.conclusion.selectedObjectRelationshipGroup,
            selectedObjectRelationshipRuleId: proofFrame.conclusion.selectedObjectRelationshipRuleId,
            selectedObjectRelationshipExactWitness: proofFrame.conclusion.selectedObjectRelationshipExactWitness,
            selectedObjectRelationshipLineStart: proofFrame.conclusion.selectedObjectRelationshipLineStart,
            selectedObjectRelationshipLineEnd: proofFrame.conclusion.selectedObjectRelationshipLineEnd,
            selectedObjectKind: proofFrame.conclusion.selectedObjectKind,
            selectedObjectPerson: proofFrame.conclusion.selectedObjectPerson,
            selectedObjectHumanness: proofFrame.conclusion.selectedObjectHumanness,
            selectedObjectPronounClass: proofFrame.conclusion.selectedObjectPronounClass,
            selectedObjectValenceArity: proofFrame.conclusion.selectedObjectValenceArity,
            selectedObjectSlot: proofFrame.conclusion.selectedObjectSlot,
            selectedIndefiniteObject: proofFrame.conclusion.selectedIndefiniteObject,
            selectedIndefiniteObjectSurface: proofFrame.conclusion.selectedIndefiniteObjectSurface,
            possibleIndefiniteObjects: proofFrame.conclusion.possibleIndefiniteObjects,
            relatedSpecificObjectKinds: proofFrame.conclusion.relatedSpecificObjectKinds,
            relationshipRange: proofFrame.conclusion.relationshipRange,
            pluralReflexiveReciprocalPossible: proofFrame.conclusion.pluralReflexiveReciprocalPossible,
            objectRelationshipActions: proofFrame.conclusion.objectRelationshipActions,
            collapseIndefiniteIntoSpecificAllowed: proofFrame.conclusion.collapseIndefiniteIntoSpecificAllowed
          } : {}),
          ...(proofFrame.conclusion.tlaFusionEligible ? {
            selectedTlaFusionAnalysisKind: proofFrame.conclusion.selectedTlaFusionAnalysisKind,
            tlaFusionGeneralRule: proofFrame.conclusion.tlaFusionGeneralRule,
            tlaFusionRuleVariables: proofFrame.conclusion.tlaFusionRuleVariables,
            tlaFusionRuleInputs: proofFrame.conclusion.tlaFusionRuleInputs,
            tlaFusionRuleOutputs: proofFrame.conclusion.tlaFusionRuleOutputs,
            tlaFusionProofAnchors: proofFrame.conclusion.tlaFusionProofAnchors,
            tlaFusionWitnessUsePolicy: proofFrame.conclusion.tlaFusionWitnessUsePolicy,
            tlaFusionWitnessesAreWhitelist: proofFrame.conclusion.tlaFusionWitnessesAreWhitelist,
            tlaFusionActions: proofFrame.conclusion.tlaFusionActions,
            tlaFusionFused: proofFrame.conclusion.tlaFusionFused,
            explicitTlaFusionRequested: proofFrame.conclusion.explicitTlaFusionRequested,
            incorporatedAdverb: proofFrame.conclusion.incorporatedAdverb,
            adverbPosition: proofFrame.conclusion.adverbPosition,
            adverbPrecedesTla: proofFrame.conclusion.adverbPrecedesTla,
            adverbFollowsTla: proofFrame.conclusion.adverbFollowsTla,
            adverbBoundaryTestApplied: proofFrame.conclusion.adverbBoundaryTestApplied,
            adverbBoundaryDecision: proofFrame.conclusion.adverbBoundaryDecision,
            tlaFusionBuildKind: proofFrame.conclusion.tlaFusionBuildKind,
            tlaFusionBuildLogic: proofFrame.conclusion.tlaFusionBuildLogic,
            tlaFusionBuildEmbedStem: proofFrame.conclusion.tlaFusionBuildEmbedStem,
            tlaFusionBuildMatrixStem: proofFrame.conclusion.tlaFusionBuildMatrixStem,
            tlaFusionBuildSegment: proofFrame.conclusion.tlaFusionBuildSegment,
            tlaFusionConstructedDerivedStem: proofFrame.conclusion.tlaFusionConstructedDerivedStem,
            tlaFusionSourceStemVariant: proofFrame.conclusion.tlaFusionSourceStemVariant,
            tlaFusionDerivedStem: proofFrame.conclusion.tlaFusionDerivedStem,
            tlaFusionSourceFormula: proofFrame.conclusion.tlaFusionSourceFormula,
            tlaFusionTargetFormula: proofFrame.conclusion.tlaFusionTargetFormula,
            tlaFusionSelectedAnalysis: proofFrame.conclusion.tlaFusionSelectedAnalysis,
            objectSlotAfterFusion: proofFrame.conclusion.objectSlotAfterFusion
          } : {
            objectSlotAfterFusion: proofFrame.conclusion.objectSlotAfterFusion
          })
        } : {},
        ruleFrameKinds: authorized ? ruleFrames.map(frame => frame.kind) : [],
        legalWitnessTagIds: authorized ? Array.from(new Set(ruleFrames.flatMap(frame => frame.ruleRefs || []).map(rule => rule.tagId).filter(Boolean))) : [],
        steps: authorized ? [{
          layer: "verbstem-structure",
          value: proofFrame.conclusion.verbstem,
          internalMorphs: proofFrame.conclusion.internalMorphs,
          internalMorphBoundaryScope: proofFrame.conclusion.internalMorphBoundaryScope,
          internalMorphsRemainInsideVerbstem: proofFrame.conclusion.internalMorphsRemainInsideVerbstem,
          internalMorphsBecomeFormulaSlots: proofFrame.conclusion.internalMorphsBecomeFormulaSlots,
          formulaSlotSplitAllowed: proofFrame.conclusion.formulaSlotSplitAllowed,
          stemTranslationPolicy: proofFrame.conclusion.stemTranslationPolicy,
          internalMorphGlossPolicy: proofFrame.conclusion.internalMorphGlossPolicy,
          unknownButAuthorizedMorphs: proofFrame.conclusion.unknownButAuthorizedMorphs,
          inventedInternalMorphGlossAllowed: proofFrame.conclusion.inventedInternalMorphGlossAllowed
        }, {
          layer: "fuente-source-selection",
          value: proofFrame.conclusion.selectedSourceKind,
          selectedBy: proofFrame.conclusion.fuenteSourceSelectedBy,
          selectedEmbedStem: proofFrame.conclusion.selectedSourceEmbedStem,
          selectedMatrixStem: proofFrame.conclusion.selectedSourceMatrixStem,
          selectedInternalMorphs: proofFrame.conclusion.selectedSourceInternalMorphs,
          selectedWholeStem: proofFrame.conclusion.selectedSourceWholeStem,
          canvasAllowsUserSourceSelection: proofFrame.conclusion.canvasAllowsUserSourceSelection,
          userSelectionCanvasPermitted: proofFrame.conclusion.userSelectionCanvasPermitted,
          sourceSelectionActions: proofFrame.conclusion.sourceSelectionActions
        }, {
          layer: "verbcore-citation",
          value: proofFrame.conclusion.citationForm,
          citationActions: proofFrame.conclusion.citationActions,
          marker: proofFrame.conclusion.citationMarker,
          projectiveCitationRepresentative: proofFrame.conclusion.projectiveCitationRepresentative,
          formulaSlotCitationBlocked: proofFrame.conclusion.formulaSlotCitationBlocked,
          citationUsesFormulaSlotPlaceholder: proofFrame.conclusion.citationUsesFormulaSlotPlaceholder
        }, {
          layer: "verbstem-class",
          value: proofFrame.conclusion.classId,
          classTargetStem: proofFrame.conclusion.classTargetStem,
          classTargetRole: proofFrame.conclusion.classTargetRole,
          classTargetValence: proofFrame.conclusion.classTargetValence,
          classTargetDerivedFromTlaFusion: proofFrame.conclusion.classTargetDerivedFromTlaFusion,
          sourceVerbstem: proofFrame.conclusion.sourceVerbstem,
          derivedFusedVerbstem: proofFrame.conclusion.derivedFusedVerbstem,
          classActions: proofFrame.conclusion.classActions,
          classBPerfectiveKind: proofFrame.conclusion.classBPerfectiveKind,
          classBUnderlyingPerfectiveStem: proofFrame.conclusion.classBUnderlyingPerfectiveStem,
          classBSilentCausativeCarrierPresent: proofFrame.conclusion.classBSilentCausativeCarrierPresent,
          classBTypeOneCausativeWitnessRequired: proofFrame.conclusion.classBTypeOneCausativeWitnessRequired,
          classBTypeOneCausativeWitness: proofFrame.conclusion.classBTypeOneCausativeWitness,
          traditionalSpellingWarningPresent: proofFrame.conclusion.traditionalSpellingWarningPresent,
          traditionalSpellingMisclassificationBlocked: proofFrame.conclusion.traditionalSpellingMisclassificationBlocked,
          hiddenTraditionalSpellingSound: proofFrame.conclusion.hiddenTraditionalSpellingSound,
          traditionalSpellingChangeRule: proofFrame.conclusion.traditionalSpellingChangeRule,
          classGuidelineWitnessPresent: proofFrame.conclusion.classGuidelineWitnessPresent,
          classGuidelineRuleId: proofFrame.conclusion.classGuidelineRuleId,
          classGuidelineClassOptions: proofFrame.conclusion.classGuidelineClassOptions,
          classGuidelineAllowedClassIds: proofFrame.conclusion.classGuidelineAllowedClassIds,
          classGuidelineContradictionBlocked: proofFrame.conclusion.classGuidelineContradictionBlocked,
          classGuidelineContradictionReason: proofFrame.conclusion.classGuidelineContradictionReason,
          classGuidelinePerfectiveStem: proofFrame.conclusion.classGuidelinePerfectiveStem
        }, {
          layer: "aspect-stem",
          value: proofFrame.conclusion.stemVariant,
          selectedImperfectiveShape: proofFrame.conclusion.selectedImperfectiveShape,
          selectedImperfectiveShapeReason: proofFrame.conclusion.selectedImperfectiveShapeReason,
          shapeActions: proofFrame.conclusion.shapeActions,
          freeShapeSwitchAllowed: proofFrame.conclusion.freeShapeSwitchAllowed,
          hostileRejectedStemVariants: proofFrame.conclusion.hostileRejectedStemVariants,
          predicateTableCell: proofFrame.conclusion.predicateTableCell,
          predicateTableSide: proofFrame.conclusion.predicateTableSide,
          predicateTableRuleId: proofFrame.conclusion.predicateTableRuleId,
          predicateExpectedCarrier: proofFrame.conclusion.predicateExpectedCarrier,
          predicateActions: proofFrame.conclusion.predicateActions,
          predicateCarrierContradictionBlocked: proofFrame.conclusion.predicateCarrierContradictionBlocked,
          hostileRejectedPredicateCarriers: proofFrame.conclusion.hostileRejectedPredicateCarriers,
          underlyingStemVariant: proofFrame.conclusion.underlyingStemVariant,
          analyzedStemVariant: proofFrame.conclusion.analyzedStemVariant,
          silentTruncatedCarrierPreserved: proofFrame.conclusion.silentTruncatedCarrierPreserved,
          ...(proofFrame.conclusion.vowelLengthOperation ? {
            vowelLengthOperation: proofFrame.conclusion.vowelLengthOperation,
            vowelLengthEnvironment: proofFrame.conclusion.vowelLengthEnvironment,
            sourceFinalVowel: proofFrame.conclusion.sourceFinalVowel,
            selectedFinalVowel: proofFrame.conclusion.selectedFinalVowel,
            selectedFinalVowelLong: proofFrame.conclusion.selectedFinalVowelLong
          } : {})
        }, ...(lesson11ParadigmPlan?.applies ? [{
          layer: "lesson11-irregular-paradigm",
          value: proofFrame.conclusion.lesson11SelectedStem,
          consumedProvisionalStem: proofFrame.conclusion.stemVariant,
          lowerOutputRole: "provisional-input",
          finalizerLayer: "Andrews Lesson 11 irregular paradigm",
          zeroRootOperationFrame: proofFrame.conclusion.lesson11ZeroRootOperationFrame,
          actions: proofFrame.conclusion.lesson11Actions
        }] : []), ...((proofFrame.conclusion.optionalIrregularStemVariants || []).length ? [{
          layer: "conditioned-optional-irregular",
          value: (proofFrame.conclusion.optionalIrregularStemVariants || []).join(" ~ "),
          formulas: proofFrame.conclusion.optionalIrregularFormulaRealizations || []
        }] : []), ...(proofFrame.conclusion.objectRelationshipApplies ? [{
          layer: "object-relationship",
          value: proofFrame.conclusion.selectedObjectRelationshipKind,
          selectedObjectRelationshipGroup: proofFrame.conclusion.selectedObjectRelationshipGroup,
          selectedIndefiniteObject: proofFrame.conclusion.selectedIndefiniteObject,
          possibleIndefiniteObjects: proofFrame.conclusion.possibleIndefiniteObjects,
          relatedSpecificObjectKinds: proofFrame.conclusion.relatedSpecificObjectKinds,
          pluralReflexiveReciprocalPossible: proofFrame.conclusion.pluralReflexiveReciprocalPossible,
          objectRelationshipActions: proofFrame.conclusion.objectRelationshipActions,
          exactWitness: proofFrame.conclusion.selectedObjectRelationshipExactWitness
        }] : []), ...(proofFrame.conclusion.expandedVncBoundaryApplies ? [{
          layer: "expanded-vnc-boundary",
          value: proofFrame.conclusion.directionalPrefix || proofFrame.conclusion.outsidePrefixes.join(" "),
          selectedFormulaWithoutExpandedVncBoundary: proofFrame.conclusion.selectedFormulaWithoutExpandedVncBoundary,
          directionalPrefix: proofFrame.conclusion.directionalPrefix,
          directionalInsideVncCore: proofFrame.conclusion.directionalInsideVncCore,
          directionalPlacement: proofFrame.conclusion.directionalPlacement,
          vncInternalPrefixSlots: proofFrame.conclusion.vncInternalPrefixSlots,
          outsidePrefixes: proofFrame.conclusion.outsidePrefixes,
          vncExternalPrefixSlots: proofFrame.conclusion.vncExternalPrefixSlots,
          outsidePrefixesBecomeFormulaSlots: proofFrame.conclusion.outsidePrefixesBecomeFormulaSlots,
          outsidePrefixFormulaSlotAuthorized: proofFrame.conclusion.outsidePrefixFormulaSlotAuthorized,
          formulaSlotMaterialFromOutsidePrefixes: proofFrame.conclusion.formulaSlotMaterialFromOutsidePrefixes,
          negativeAttractedToAntecessive: proofFrame.conclusion.negativeAttractedToAntecessive,
          objectShapePreservedByOutsidePrefixes: proofFrame.conclusion.objectShapePreservedByOutsidePrefixes,
          actions: proofFrame.conclusion.expandedVncBoundaryActions
        }] : []), ...(sentenceSurfaceFrame?.sentenceSurfaceApplies === true ? [{
          layer: "sentence-surface",
          value: sentenceSurfaceFrame.sentenceType,
          status: sentenceSurfaceFrame.authorizationStatus,
          operationType: sentenceSurfaceFrame.sentenceOperationType,
          baseVncFormula: sentenceSurfaceFrame.baseVncFormula,
          lowerLayerSelectedOutputRole: sentenceSurfaceFrame.lowerLayerSelectedOutputRole,
          lowerLessonOutputIsProvisional: sentenceSurfaceFrame.lowerLessonOutputIsProvisional,
          highestActiveCanvasLayer: sentenceSurfaceFrame.highestActiveCanvasLayer,
          sentenceFinalizerLayer: sentenceSurfaceFrame.sentenceFinalizerLayer,
          sentenceParticles: sentenceSurfaceFrame.sentenceParticles,
          sentencePrefixalStack: sentenceSurfaceFrame.sentencePrefixalStack,
          sentencePrefixalStackAttachment: sentenceSurfaceFrame.sentencePrefixalStackAttachment,
          sentenceParticlesBecomeFormulaSlots: sentenceSurfaceFrame.sentenceParticlesBecomeFormulaSlots,
          formulaSlotMaterialFromSentenceParticles: sentenceSurfaceFrame.formulaSlotMaterialFromSentenceParticles,
          finalPunctuation: sentenceSurfaceFrame.finalPunctuation,
          questionMode: sentenceSurfaceFrame.questionMode,
          introductoryParticle: sentenceSurfaceFrame.introductoryParticle,
          introductoryParticleRequired: sentenceSurfaceFrame.introductoryParticleRequired,
          introductoryParticleOmissionAllowed: sentenceSurfaceFrame.introductoryParticleOmissionAllowed,
          lesson10SentenceType: sentenceSurfaceFrame.lesson10SentenceType,
          admonitiveVncRequired: sentenceSurfaceFrame.admonitiveVncRequired,
          admonitiveNonpastRequired: sentenceSurfaceFrame.admonitiveNonpastRequired,
          admonitiveRequestedTense: sentenceSurfaceFrame.admonitiveRequestedTense,
          admonitiveOnlyNonpastTense: sentenceSurfaceFrame.admonitiveOnlyNonpastTense,
          admonitivePerfectiveStemRequired: sentenceSurfaceFrame.admonitivePerfectiveStemRequired,
          admonitivePerfectiveStemPresent: sentenceSurfaceFrame.admonitivePerfectiveStemPresent,
          admonitiveStemAspect: sentenceSurfaceFrame.admonitiveStemAspect,
          admonitiveVncTranslationValueOutsideSentence: sentenceSurfaceFrame.admonitiveVncTranslationValueOutsideSentence,
          admonitiveClassId: sentenceSurfaceFrame.admonitiveClassId,
          admonitiveTenseMorph: sentenceSurfaceFrame.admonitiveTenseMorph,
          admonitiveClassATenseMorphContrast: sentenceSurfaceFrame.admonitiveClassATenseMorphContrast,
          admonitiveContrastSet: sentenceSurfaceFrame.admonitiveContrastSet,
          admonitiveContrastClassProfile: sentenceSurfaceFrame.admonitiveContrastClassProfile,
          admonitiveOptativeContrast: sentenceSurfaceFrame.admonitiveOptativeContrast,
          admonitivePresentIndicativeContrast: sentenceSurfaceFrame.admonitivePresentIndicativeContrast,
          admonitivePreteritIndicativeContrast: sentenceSurfaceFrame.admonitivePreteritIndicativeContrast,
          admonitiveSecondPersonOptativeDistinction: sentenceSurfaceFrame.admonitiveSecondPersonOptativeDistinction,
          admonitivePluralSubjectsAlwaysDistinctive: sentenceSurfaceFrame.admonitivePluralSubjectsAlwaysDistinctive,
          admonitiveMaDistinguishesSentenceLayer: sentenceSurfaceFrame.admonitiveMaDistinguishesSentenceLayer,
          admonitiveGlottalStopAmbiguityWarning: sentenceSurfaceFrame.admonitiveGlottalStopAmbiguityWarning,
          admonitiveGlottalStopAmbiguityScope: sentenceSurfaceFrame.admonitiveGlottalStopAmbiguityScope,
          admonitiveOppositeMeaningRiskIfGlottalUnrepresented: sentenceSurfaceFrame.admonitiveOppositeMeaningRiskIfGlottalUnrepresented,
          admonitiveHMorphRoleContrast: sentenceSurfaceFrame.admonitiveHMorphRoleContrast,
          admonitiveAntecessivePrefixAllowed: sentenceSurfaceFrame.admonitiveAntecessivePrefixAllowed,
          admonitiveAntecessivePrefixRequested: sentenceSurfaceFrame.admonitiveAntecessivePrefixRequested,
          admonitiveAntecessiveContrast: sentenceSurfaceFrame.admonitiveAntecessiveContrast,
          admonitiveRequestedContrastReading: sentenceSurfaceFrame.admonitiveRequestedContrastReading,
          admonitiveRequestedContrastReadingAuthorized: sentenceSurfaceFrame.admonitiveRequestedContrastReadingAuthorized,
          admonitiveNumberDyad: sentenceSurfaceFrame.admonitiveNumberDyad,
          admonitiveNumberDyadKind: sentenceSurfaceFrame.admonitiveNumberDyadKind,
          admonitiveSingularNumberDyad: sentenceSurfaceFrame.admonitiveSingularNumberDyad,
          admonitivePluralNumberDyads: sentenceSurfaceFrame.admonitivePluralNumberDyads,
          admonitiveForce: sentenceSurfaceFrame.admonitiveForce,
          admonitiveMoodPolarity: sentenceSurfaceFrame.admonitiveMoodPolarity,
          admonitiveIsPositiveByMood: sentenceSurfaceFrame.admonitiveIsPositiveByMood,
          admonitiveVetitiveTermAccepted: sentenceSurfaceFrame.admonitiveVetitiveTermAccepted,
          admonitiveProhibitionReadingAllowed: sentenceSurfaceFrame.admonitiveProhibitionReadingAllowed,
          admonitiveNegativeCommandReadingAllowed: sentenceSurfaceFrame.admonitiveNegativeCommandReadingAllowed,
          admonitiveDontTranslationAuthority: sentenceSurfaceFrame.admonitiveDontTranslationAuthority,
          admonitiveMayNotTranslationAuthority: sentenceSurfaceFrame.admonitiveMayNotTranslationAuthority,
          admonitiveProhibitionReplacementLayer: sentenceSurfaceFrame.admonitiveProhibitionReplacementLayer,
          admonitiveAssertionConversionSource: sentenceSurfaceFrame.admonitiveAssertionConversionSource,
          admonitiveAssertionConversionTarget: sentenceSurfaceFrame.admonitiveAssertionConversionTarget,
          admonitiveVncSubstitution: sentenceSurfaceFrame.admonitiveVncSubstitution,
          admonitiveMaPosition: sentenceSurfaceFrame.admonitiveMaPosition,
          admonitiveNenStrengtheningKind: sentenceSurfaceFrame.admonitiveNenStrengtheningKind,
          admonitiveNenLexicalMeaning: sentenceSurfaceFrame.admonitiveNenLexicalMeaning,
          admonitiveMaNenWritingPolicy: sentenceSurfaceFrame.admonitiveMaNenWritingPolicy,
          admonitiveTraditionalSolidSpelling: sentenceSurfaceFrame.admonitiveTraditionalSolidSpelling,
          admonitiveWarningRenderingPolicy: sentenceSurfaceFrame.admonitiveWarningRenderingPolicy,
          admonitiveRequestedTranslationReading: sentenceSurfaceFrame.admonitiveRequestedTranslationReading,
          admonitiveRequestedTranslationReadingAuthorized: sentenceSurfaceFrame.admonitiveRequestedTranslationReadingAuthorized,
          admonitivePositiveDontTranslationAuthority: sentenceSurfaceFrame.admonitivePositiveDontTranslationAuthority,
          admonitiveMayNotWishTranslationAuthority: sentenceSurfaceFrame.admonitiveMayNotWishTranslationAuthority,
          admonitiveNegativeAssertionConversionSource: sentenceSurfaceFrame.admonitiveNegativeAssertionConversionSource,
          admonitiveNegativeAssertionConversionTarget: sentenceSurfaceFrame.admonitiveNegativeAssertionConversionTarget,
          admonitiveNegativePrefixAttachment: sentenceSurfaceFrame.admonitiveNegativePrefixAttachment,
          admonitiveNegativeIntroductoryCollocation: sentenceSurfaceFrame.admonitiveNegativeIntroductoryCollocation,
          admonitiveNegativeIntroductoryCollocationRequired: sentenceSurfaceFrame.admonitiveNegativeIntroductoryCollocationRequired,
          admonitiveNegativeForceDefinition: sentenceSurfaceFrame.admonitiveNegativeForceDefinition,
          admonitivePositiveVetativeTermAuthority: sentenceSurfaceFrame.admonitivePositiveVetativeTermAuthority,
          admonitiveCaNegativeRequested: sentenceSurfaceFrame.admonitiveCaNegativeRequested,
          admonitiveCaNegativeFromLesson9Blocked: sentenceSurfaceFrame.admonitiveCaNegativeFromLesson9Blocked,
          admonitiveNenRequired: sentenceSurfaceFrame.admonitiveNenRequired,
          admonitiveNenPresent: sentenceSurfaceFrame.admonitiveNenPresent,
          admonitiveMaNenCollocation: sentenceSurfaceFrame.admonitiveMaNenCollocation,
          futureIndicativeAsOptative: sentenceSurfaceFrame.futureIndicativeAsOptative,
          negativeTransformation: sentenceSurfaceFrame.lesson9NegativeTransformation,
          lesson10NegativeTransformation: sentenceSurfaceFrame.lesson10NegativeTransformation,
          negativePrefix: sentenceSurfaceFrame.negativePrefix,
          negativePrefixSource: sentenceSurfaceFrame.negativePrefixSource,
          actions: sentenceSurfaceFrame.sentenceActions,
          hostileRejectedFormulaSlots: sentenceSurfaceFrame.hostileRejectedFormulaSlots
        }] : []), {
          layer: "selected-formula",
          value: proofFrame.conclusion.selectedFormula
        }, {
          layer: "tla-fusion-boundary",
          value: proofFrame.conclusion.objectSlotAfterFusion,
          selectedTlaFusionAnalysisKind: proofFrame.conclusion.selectedTlaFusionAnalysisKind,
          generalRule: proofFrame.conclusion.tlaFusionGeneralRule,
          ruleVariables: proofFrame.conclusion.tlaFusionRuleVariables,
          ruleInputs: proofFrame.conclusion.tlaFusionRuleInputs,
          ruleOutputs: proofFrame.conclusion.tlaFusionRuleOutputs,
          proofAnchors: proofFrame.conclusion.tlaFusionProofAnchors,
          witnessUsePolicy: proofFrame.conclusion.tlaFusionWitnessUsePolicy,
          witnessesAreWhitelist: proofFrame.conclusion.tlaFusionWitnessesAreWhitelist,
          tlaFusionActions: proofFrame.conclusion.tlaFusionActions,
          tlaFusionFused: proofFrame.conclusion.tlaFusionFused,
          adverbBoundaryTestApplied: proofFrame.conclusion.adverbBoundaryTestApplied,
          adverbBoundaryDecision: proofFrame.conclusion.adverbBoundaryDecision,
          incorporatedAdverb: proofFrame.conclusion.incorporatedAdverb,
          adverbPosition: proofFrame.conclusion.adverbPosition,
          sourceStemVariant: proofFrame.conclusion.tlaFusionSourceStemVariant,
          derivedStem: proofFrame.conclusion.tlaFusionDerivedStem,
          sourceFormula: proofFrame.conclusion.tlaFusionSourceFormula,
          targetFormula: proofFrame.conclusion.tlaFusionTargetFormula,
          selectedAnalysis: proofFrame.conclusion.tlaFusionSelectedAnalysis
        }] : [],
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function buildClassicalNahuatlLesson7ReceiptInventory() {
      return {
        kind: "classical-nahuatl-lesson7-display-receipt-inventory",
        receiptRole: "display-only",
        authorityRole: "not-authority",
        outputableSlots: [...CLASSICAL_NAHUATL_LESSON7_OUTPUTABLE_SLOTS],
        classSummaries: cloneClassicalNahuatlLesson7Record(CLASSICAL_NAHUATL_LESSON7_CLASS_SHAPES),
        guidelineCount: CLASSICAL_NAHUATL_LESSON7_GUIDELINE_RULES.length,
        objectRelationshipCount: CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_RULES.length,
        tlaFusionRuleCount: CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_RULES.length
      };
    }
    function buildClassicalNahuatlLesson7DisplayReceiptFrame({
      proofFrame = null,
      selectedOutputLogicFrame = null,
      receiptInventory = null
    } = {}) {
      const authorized = proofFrame?.conclusion?.authorized === true;
      const firstFailedPremise = Array.isArray(proofFrame?.premises) ? proofFrame.premises.find(premise => premise.passed !== true) : null;
      return {
        kind: "classical-nahuatl-lesson7-display-receipt-frame",
        lesson: "Andrews Lesson 7",
        receiptRole: "display-only",
        authorityRole: "not-authority",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson7ReceiptRules(),
        status: proofFrame?.authorizationStatus || "blocked",
        selectedFormula: authorized ? proofFrame.conclusion.selectedFormula : "",
        selectedOutputLogicKind: authorized ? selectedOutputLogicFrame?.kind || "" : "",
        selectedOutputLogicStatus: selectedOutputLogicFrame?.authorizationStatus || "blocked",
        receiptInventoryKind: receiptInventory?.kind || "",
        classSummaryCount: receiptInventory ? Object.keys(receiptInventory.classSummaries || {}).length : 0,
        blockedBy: authorized ? "" : firstFailedPremise?.layer || "logic-proof",
        slotSummary: authorized ? selectedOutputLogicFrame?.outputFillers || {} : {},
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function buildClassicalNahuatlLesson7ReceiptAuthorityFrame({
      proofFrame = null,
      selectedOutputLogicFrame = null,
      displayReceiptFrame = null
    } = {}) {
      const proofAuthorized = proofFrame?.conclusion?.authorized === true;
      const selectedOutputAuthorized = selectedOutputLogicFrame?.authorizationStatus === "authorized";
      const receiptMirrorsSelectedOutput = displayReceiptFrame?.selectedFormula === selectedOutputLogicFrame?.selectedFormula && displayReceiptFrame?.status === selectedOutputLogicFrame?.authorizationStatus;
      const receiptCanDisplay = Boolean(proofAuthorized && selectedOutputAuthorized && receiptMirrorsSelectedOutput);
      return {
        kind: "classical-nahuatl-lesson7-receipt-authority-rule-frame",
        lesson: "Andrews Lesson 7",
        section: "7.1-7.10",
        ruleLogicRole: "display-receipt-boundary",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        legalWitnessAuthority: CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY,
        ruleRefs: getClassicalNahuatlLesson7ReceiptRules(),
        receiptRole: "display-only",
        authorityRole: "not-authority",
        proofFrameKind: proofFrame?.kind || "",
        selectedOutputLogicKind: selectedOutputLogicFrame?.kind || "",
        displayReceiptKind: displayReceiptFrame?.kind || "",
        proofAuthorized,
        selectedOutputAuthorized,
        receiptMirrorsSelectedOutput,
        receiptCanDisplay,
        receiptCannotAuthorize: true,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied"
      };
    }
    function buildClassicalNahuatlLesson7VerbstemClassFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlLesson7Stem(stem);
      const requestedLesson11Options = {
        ...options
      };
      const lesson11RuntimeTarget = getClassicalNahuatlLesson7RuntimeTarget();
      const lesson11ParadigmPlan = typeof lesson11RuntimeTarget?.buildClassicalNahuatlLesson11ParadigmPlan === "function" ? lesson11RuntimeTarget.buildClassicalNahuatlLesson11ParadigmPlan(normalizedStem, {
        ...requestedLesson11Options,
        requestedMood: requestedLesson11Options.mood || requestedLesson11Options.sentenceMood,
        requestedSemanticTense: requestedLesson11Options.semanticTense || requestedLesson11Options.tense
      }) : null;
      if (lesson11ParadigmPlan?.applies) {
        options = {
          ...options,
          mood: lesson11ParadigmPlan.morphologicalMood || options.mood,
          tense: lesson11ParadigmPlan.morphologicalTense || options.tense,
          verbClass: lesson11ParadigmPlan.selectedClassOverride || options.verbClass,
          stemClass: lesson11ParadigmPlan.selectedClassOverride || options.stemClass
        };
      }
      const explicitTlaFusionRequested = options.fused === true || options.tlaFusion === true;
      const requestedSourceValence = normalizeClassicalNahuatlLesson7Valence(options.requestedSourceValence || options.requestedValence || options.sourceValence || options.valence || options.transitivity || options.objectKind || options.object || "");
      const effectiveSourceValence = explicitTlaFusionRequested ? "projective-nonhuman" : requestedSourceValence;
      const sourceOptions = explicitTlaFusionRequested ? {
        ...options,
        requestedSourceValence,
        valence: "projective-nonhuman",
        transitivity: "transitive",
        objectKind: "nonspecific-nonhuman"
      } : options;
      const structureRuleFrame = buildClassicalNahuatlLesson7VerbstemStructureRuleFrame(normalizedStem);
      const sourceSelectionFrame = buildClassicalNahuatlLesson7FuenteSourceSelectionFrame(normalizedStem, sourceOptions);
      const citationRuleFrame = buildClassicalNahuatlLesson7CitationRuleFrame(normalizedStem, sourceOptions);
      const tlaFusionRuleFrame = buildClassicalNahuatlLesson7TlaFusionRuleFrame(normalizedStem, {
        ...sourceOptions,
        valence: citationRuleFrame.valence,
        stemVariant: normalizedStem
      });
      const preAssimilationClassTargetStem = tlaFusionRuleFrame.fused ? tlaFusionRuleFrame.derivedStemVariant || tlaFusionRuleFrame.derivedStem || normalizedStem : tlaFusionRuleFrame.sourceStemVariant || normalizedStem;
      // Tla-fusion currently supplies an already-realized derived stem (for example
      // huel-la-mati); do not reinterpret that output as a new l+l source boundary.
      const lesson11SupersedesLesson210 = lesson11ParadigmPlan?.supersededLowerRuleIds?.includes("cn-l2-210-progressive-assimilation-boundary-realization") === true;
      const progressiveAssimilationFrame = tlaFusionRuleFrame.fused || lesson11SupersedesLesson210 ? null : buildClassicalNahuatlLesson210BoundaryFrameForLesson7(preAssimilationClassTargetStem);
      const activeProgressiveAssimilationFrame = progressiveAssimilationFrame && (progressiveAssimilationFrame.transformationApplied === true || progressiveAssimilationFrame.authorizationStatus === "blocked") ? progressiveAssimilationFrame : null;
      const classTargetStem = progressiveAssimilationFrame?.authorizationStatus === "authorized" ? progressiveAssimilationFrame.realizedAnalyzedStem || preAssimilationClassTargetStem : preAssimilationClassTargetStem;
      const classTargetRole = tlaFusionRuleFrame.fused ? "derived-fused-verbstem" : "source-verbstem";
      const classTargetValence = tlaFusionRuleFrame.fused ? "intransitive" : citationRuleFrame.valence;
      const classRuleFrame = buildClassicalNahuatlLesson7VerbstemClassRuleFrame(classTargetStem, {
        ...options,
        valence: classTargetValence,
        canvasHigherLayerClassOverride: lesson11ParadigmPlan?.selectedClassOverride || ""
      });
      classRuleFrame.classTargetStem = classTargetStem;
      classRuleFrame.classTargetRole = classTargetRole;
      classRuleFrame.classTargetValence = classTargetValence;
      classRuleFrame.classTargetDerivedFromTlaFusion = tlaFusionRuleFrame.fused === true;
      classRuleFrame.preAssimilationClassTargetStem = preAssimilationClassTargetStem;
      classRuleFrame.progressiveAssimilationApplied = progressiveAssimilationFrame?.transformationApplied === true;
      classRuleFrame.progressiveAssimilationRuleIds = progressiveAssimilationFrame?.appliedRuleIds || [];
      classRuleFrame.sourceVerbstem = tlaFusionRuleFrame.sourceStemVariant || normalizedStem;
      classRuleFrame.derivedFusedVerbstem = tlaFusionRuleFrame.fused ? tlaFusionRuleFrame.derivedStem || tlaFusionRuleFrame.derivedStemVariant || "" : "";
      const predicateFormationRuleFrame = buildClassicalNahuatlLesson7PredicateFormationRuleFrame(classTargetStem, {
        ...options,
        classProfile: classRuleFrame.classProfile
      });
      const borrowedFormOptions = predicateFormationRuleFrame.borrowedIndicativeForm ? {
        ...options,
        mood: predicateFormationRuleFrame.formMood,
        tense: predicateFormationRuleFrame.formTense,
        sentenceMood: options.mood || options.sentenceMood || "optative",
        sentenceTense: options.tense || options.sentenceTense || predicateFormationRuleFrame.tense
      } : options;
      predicateFormationRuleFrame.classTargetStem = classTargetStem;
      predicateFormationRuleFrame.classTargetRole = classTargetRole;
      predicateFormationRuleFrame.classTargetDerivedFromTlaFusion = tlaFusionRuleFrame.fused === true;
      const analysisRuleFrame = buildClassicalNahuatlLesson7AnalysisRuleFrame(normalizedStem, options);
      const priorVncStem = tlaFusionRuleFrame.fused ? predicateFormationRuleFrame.stemVariant : predicateFormationRuleFrame.stemVariant || tlaFusionRuleFrame.sourceStemVariant || normalizedStem;
      const priorVncOptions = tlaFusionRuleFrame.fused ? {
        ...borrowedFormOptions,
        valence: "intransitive",
        transitivity: "intransitive",
        verbClass: classRuleFrame.classId,
        stemClass: classRuleFrame.classId
      } : {
        ...borrowedFormOptions,
        valence: citationRuleFrame.valence,
        verbClass: classRuleFrame.classId,
        stemClass: classRuleFrame.classId
      };
      const explicitSourceZeroRoot = sourceSelectionFrame?.selectedSourceKind === "internal-morphemes" && sourceSelectionFrame?.selectedInternalMorphs?.[0] === "0";
      const licensedSourceZeroRoot = explicitSourceZeroRoot && lesson11ParadigmPlan?.identity?.lexemeId === "0-i-ā" && lesson11ParadigmPlan?.zeroRootOperationFrame?.authorizationStatus === "authorized" && lesson11ParadigmPlan?.zeroRootOperationFrame?.formulaRootMorpheme === "0";
      const zeroRootLowerLessonBridgeFrame = explicitSourceZeroRoot ? {
        kind: "classical-nahuatl-lesson11-zero-root-lower-lesson-bridge-frame",
        lesson: "Andrews Lesson 11",
        sourceAuthority: "Andrews transcription",
        sourceDocument: lesson11ParadigmPlan?.zeroRootOperationFrame?.sourceDocument || CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        sourceStem: normalizedStem,
        sourceRootMorpheme: "0",
        sourceRootPosition: 0,
        sourceRootRole: licensedSourceZeroRoot ? "verbstem-root" : "unlicensed-zero-marker",
        lowerOrthographicCarrierStem: licensedSourceZeroRoot ? priorVncStem.replace(/^0-/u, "") : priorVncStem,
        formulaStemRestoredBy: licensedSourceZeroRoot ? "classical-nahuatl-lesson11-zero-root-operation-frame" : "none",
        zeroIsPronouncedGrapheme: false,
        authorizationStatus: licensedSourceZeroRoot ? "authorized" : "blocked",
        blockReason: licensedSourceZeroRoot ? "" : "source-zero-root-not-authorized-for-selected-verbstem",
        formulaStringsAreAuthority: false,
        ruleRefs: lesson11ParadigmPlan?.zeroRootOperationFrame?.ruleRefs || []
      } : null;
      const lowerLessonPriorVncStem = licensedSourceZeroRoot ? zeroRootLowerLessonBridgeFrame.lowerOrthographicCarrierStem : priorVncStem;
      const basePriorVncFrame = getClassicalNahuatlLesson7PriorVncFrame(lowerLessonPriorVncStem, priorVncOptions);
      const predicateTnsOverride = normalizeClassicalNahuatlLesson7Token(options.predicateTnsOverride || "");
      const predicateEnvironmentPriorVncFrame = predicateTnsOverride && basePriorVncFrame?.vncSlotFrame?.slots?.predicate ? (() => {
        const overriddenSlotFrame = cloneClassicalNahuatlLesson7Record(basePriorVncFrame.vncSlotFrame);
        overriddenSlotFrame.slots.predicate.tns = predicateTnsOverride;
        overriddenSlotFrame.semanticIdentity = [overriddenSlotFrame.slots.subject.pers1, overriddenSlotFrame.slots.subject.pers2, ...overriddenSlotFrame.slots.prePredicate.map(slot => slot.carrier), overriddenSlotFrame.slots.predicate.stem, overriddenSlotFrame.slots.predicate.tns, overriddenSlotFrame.slots.number.num1, overriddenSlotFrame.slots.number.num2].join("|");
        return {
          ...basePriorVncFrame,
          vncSlotFrame: overriddenSlotFrame,
          predicateTnsOverride
        };
      })() : basePriorVncFrame;
      const activeLesson11ParadigmPlan = lesson11ParadigmPlan && (lesson11ParadigmPlan.applies === true || lesson11ParadigmPlan.authorizationStatus === "blocked") ? lesson11ParadigmPlan : null;
      const lesson11VncApplicationFrame = activeLesson11ParadigmPlan?.applies && typeof lesson11RuntimeTarget?.applyClassicalNahuatlLesson11PlanToVncSlotFrame === "function" ? lesson11RuntimeTarget.applyClassicalNahuatlLesson11PlanToVncSlotFrame(activeLesson11ParadigmPlan, predicateEnvironmentPriorVncFrame?.vncSlotFrame || null) : null;
      const priorVncFrame = lesson11VncApplicationFrame?.authorizationStatus === "authorized" ? {
        ...basePriorVncFrame,
        vncSlotFrame: lesson11VncApplicationFrame.typedVncSlotFrame,
        lesson11ParadigmPlan: activeLesson11ParadigmPlan,
        lesson11VncApplicationFrame
      } : predicateEnvironmentPriorVncFrame;
      const objectRelationshipRuleFrame = buildClassicalNahuatlLesson7ObjectRelationshipRuleFrame(normalizedStem, {
        ...sourceOptions,
        valence: effectiveSourceValence || citationRuleFrame.valence
      }, priorVncFrame);
      const requestedOutsidePrefixes = getClassicalNahuatlLesson81OutsidePrefixes(options);
      const outsidePrefixes = predicateFormationRuleFrame.antecessiveObligatoryForBorrowedPreteritOptative ? Array.from(new Set([...requestedOutsidePrefixes, "ō#"])) : requestedOutsidePrefixes;
      const expandedVncBoundaryFrame = buildClassicalNahuatlLesson81ExpandedVncBoundaryFrame({
        stem: priorVncStem,
        valence: tlaFusionRuleFrame.fused ? "intransitive" : effectiveSourceValence || citationRuleFrame.valence,
        mood: borrowedFormOptions.mood || options.mood || "indicative",
        tense: borrowedFormOptions.tense || options.tense || "",
        objectRelationshipRuleFrame,
        directionalPrefix: options.directionalPrefix || options.directional || options.directionalLocativePrefix || "",
        outsidePrefixes,
        caNegativeTrigger: options.caNegativeTrigger || options.negativeTrigger || options.triggerParticle || "",
        hostileFormulaSlots: getClassicalNahuatlLesson81HostileFormulaSlots(options)
      });
      const activeExpandedVncBoundaryFrame = expandedVncBoundaryFrame.boundaryApplies ? expandedVncBoundaryFrame : null;
      const optionalIrregularStemVariants = activeLesson11ParadigmPlan?.alternatives?.length ? activeLesson11ParadigmPlan.alternatives : predicateFormationRuleFrame.optionalIrregularStemVariants || [];
      const selectedIrregularStemVariant = activeLesson11ParadigmPlan?.selectedStemOverride || predicateFormationRuleFrame.stemVariant;
      const optionalIrregularPriorVncFrames = optionalIrregularStemVariants.filter(variant => variant && variant !== selectedIrregularStemVariant).map(variant => getClassicalNahuatlLesson7PriorVncFrame(variant, tlaFusionRuleFrame.fused ? {
        ...borrowedFormOptions,
        valence: "intransitive",
        transitivity: "intransitive",
        verbClass: classRuleFrame.classId,
        stemClass: classRuleFrame.classId
      } : {
        ...borrowedFormOptions,
        valence: citationRuleFrame.valence,
        verbClass: classRuleFrame.classId,
        stemClass: classRuleFrame.classId
      })).filter(Boolean);
      const proofFrame = buildClassicalNahuatlLesson7LogicProofFrame({
        structureRuleFrame,
        sourceSelectionFrame,
        zeroRootLowerLessonBridgeFrame,
        progressiveAssimilationFrame: activeProgressiveAssimilationFrame,
        lesson11ParadigmPlan: activeLesson11ParadigmPlan,
        lesson11VncApplicationFrame,
        citationRuleFrame,
        classRuleFrame,
        predicateFormationRuleFrame,
        analysisRuleFrame,
        objectRelationshipRuleFrame,
        tlaFusionRuleFrame,
        expandedVncBoundaryFrame: activeExpandedVncBoundaryFrame,
        priorVncFrame,
        optionalIrregularPriorVncFrames
      });
      const sentenceSurfaceFrame = buildClassicalNahuatlLesson82SentenceSurfaceFrame({
        selectedFormula: proofFrame.conclusion.selectedFormula || "",
        mood: options.mood || options.sentenceMood || "indicative",
        expandedVncBoundaryFrame: activeExpandedVncBoundaryFrame,
        priorVncFrame,
        predicateFormationRuleFrame,
        options
      });
      const canvasLayerEvaluationFrame = typeof getClassicalNahuatlLesson7RuntimeTarget()?.buildClassicalNahuatlCanvasLayerEvaluationFrame === "function" ? getClassicalNahuatlLesson7RuntimeTarget().buildClassicalNahuatlCanvasLayerEvaluationFrame({
        priorVncFrame,
        finalBoundaryFrame: proofFrame.conclusion.finalBoundaryRealizationFrame,
        sentenceSurfaceFrame: sentenceSurfaceFrame.sentenceSurfaceApplies ? sentenceSurfaceFrame : null
      }) : proofFrame.canvasLayerEvaluationFrame || null;
      const selectedOutputLogicFrame = buildClassicalNahuatlLesson7SelectedOutputLogicFrame({
        proofFrame,
        structureRuleFrame,
        sourceSelectionFrame,
        progressiveAssimilationFrame: activeProgressiveAssimilationFrame,
        lesson11ParadigmPlan: activeLesson11ParadigmPlan,
        lesson11VncApplicationFrame,
        citationRuleFrame,
        classRuleFrame,
        predicateFormationRuleFrame,
        analysisRuleFrame,
        objectRelationshipRuleFrame,
        tlaFusionRuleFrame,
        expandedVncBoundaryFrame: activeExpandedVncBoundaryFrame,
        sentenceSurfaceFrame
      });
      const receiptInventory = buildClassicalNahuatlLesson7ReceiptInventory();
      const displayReceiptFrame = buildClassicalNahuatlLesson7DisplayReceiptFrame({
        proofFrame,
        selectedOutputLogicFrame,
        receiptInventory
      });
      const receiptAuthorityFrame = buildClassicalNahuatlLesson7ReceiptAuthorityFrame({
        proofFrame,
        selectedOutputLogicFrame,
        displayReceiptFrame
      });
      const ruleLogicFrames = [structureRuleFrame, sourceSelectionFrame, zeroRootLowerLessonBridgeFrame, activeProgressiveAssimilationFrame, activeLesson11ParadigmPlan, lesson11VncApplicationFrame, citationRuleFrame, classRuleFrame, predicateFormationRuleFrame, analysisRuleFrame, objectRelationshipRuleFrame, tlaFusionRuleFrame, activeExpandedVncBoundaryFrame, sentenceSurfaceFrame.sentenceSurfaceApplies ? sentenceSurfaceFrame : null, canvasLayerEvaluationFrame, receiptAuthorityFrame].filter(Boolean);
      return {
        kind: "classical-nahuatl-lesson7-verbstem-class-machinery-frame",
        version: CLASSICAL_NAHUATL_LESSON7_VERBSTEM_CLASSES_VERSION,
        lesson: "Andrews Lesson 7",
        lessonTitle: "Verbstem Classes",
        machineryScope: "verbcore-citation-verbstem-class-predicate-formation",
        activeAuthority: "Andrews transcription",
        sourceAuthority: "Andrews transcription",
        grammarAuthority: "Andrews transcription",
        outputAuthority: "Andrews transcription",
        authorizationStatus: proofFrame.authorizationStatus,
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT,
        sourceProfileId: CLASSICAL_NAHUATL_LESSON7_PROFILE_ID,
        targetProfileId: CLASSICAL_NAHUATL_LESSON7_PROFILE_ID,
        outputLanguage: "Classical Nahuatl",
        orthographyPolicy: "transcription-direct",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied",
        stem: normalizedStem,
        sourceSelectionFrame,
        zeroRootLowerLessonBridgeFrame,
        progressiveAssimilationFrame: activeProgressiveAssimilationFrame,
        lesson11ParadigmPlan: activeLesson11ParadigmPlan,
        lesson11VncApplicationFrame,
        classTargetStem,
        classTargetRole,
        classTargetValence,
        classTargetDerivedFromTlaFusion: tlaFusionRuleFrame.fused === true,
        sourceVerbstem: tlaFusionRuleFrame.sourceStemVariant || normalizedStem,
        derivedFusedVerbstem: tlaFusionRuleFrame.fused ? tlaFusionRuleFrame.derivedStem || tlaFusionRuleFrame.derivedStemVariant || "" : "",
        citationForm: citationRuleFrame.citationForm,
        citationRuleFrame,
        structureRuleFrame,
        classRuleFrame,
        predicateFormationRuleFrame,
        analysisRuleFrame,
        objectRelationshipRuleFrame,
        tlaFusionRuleFrame,
        expandedVncBoundaryFrame,
        sentenceSurfaceFrame,
        canvasLayerEvaluationFrame,
        priorVncFrame,
        optionalIrregularPriorVncFrames,
        receiptAuthorityFrame,
        ruleLogicFrames,
        ruleLogicFrameKinds: ruleLogicFrames.map(frame => frame.kind),
        ruleRefs: getClassicalNahuatlLesson7RuleLogicRules(),
        classProfile: classRuleFrame.classProfile,
        classId: classRuleFrame.classId,
        subclass: classRuleFrame.subclass,
        classActions: classRuleFrame.classActions,
        imperfectiveStem: classRuleFrame.imperfectiveStem,
        perfectiveStem: classRuleFrame.perfectiveStem,
        imperfectiveShapeCount: classRuleFrame.imperfectiveShapeCount,
        perfectiveShapeCount: classRuleFrame.perfectiveShapeCount,
        totalShapeCount: classRuleFrame.totalShapeCount,
        classBPerfectiveKind: classRuleFrame.classBPerfectiveKind,
        classBSilentCausativeCarrierPresent: classRuleFrame.classBSilentCausativeCarrierPresent,
        classBSilentCausativeCarrier: classRuleFrame.classBSilentCausativeCarrier,
        classBUnderlyingPerfectiveStem: classRuleFrame.classBUnderlyingPerfectiveStem,
        classBAnalyzedPerfectiveStem: classRuleFrame.classBAnalyzedPerfectiveStem,
        classBAnalysisPrintsSilentCarrier: classRuleFrame.classBAnalysisPrintsSilentCarrier,
        classBAnalysisOmissionPolicy: classRuleFrame.classBAnalysisOmissionPolicy,
        classBSilentCausativeCarrierWitness: classRuleFrame.classBSilentCausativeCarrierWitness,
        classBTypeOneCausativeWitness: classRuleFrame.classBTypeOneCausativeWitness,
        classBTypeOneCausativeWitnessRequired: classRuleFrame.classBTypeOneCausativeWitnessRequired,
        classBObjectPronounDistinguishesMorphology: classRuleFrame.classBObjectPronounDistinguishesMorphology,
        classBPhonologicalIdentityDoesNotEraseMorphology: classRuleFrame.classBPhonologicalIdentityDoesNotEraseMorphology,
        classGuidelineAuthorityRecord: classRuleFrame.classGuidelineAuthorityRecord,
        classGuidelineWitnessPresent: classRuleFrame.classGuidelineWitnessPresent,
        classGuidelineRuleId: classRuleFrame.classGuidelineRuleId,
        classGuidelineClassOptions: classRuleFrame.classGuidelineClassOptions,
        classGuidelineAllowedClassIds: classRuleFrame.classGuidelineAllowedClassIds,
        classGuidelineContradictionBlocked: classRuleFrame.classGuidelineContradictionBlocked,
        classGuidelineContradictionReason: classRuleFrame.classGuidelineContradictionReason,
        stemVariantFrame: predicateFormationRuleFrame.stemVariantFrame,
        predicateTableFrame: predicateFormationRuleFrame.predicateTableFrame,
        predicateTableCell: predicateFormationRuleFrame.predicateTableCell,
        predicateTableRuleId: predicateFormationRuleFrame.predicateTableRuleId,
        predicateExpectedCarrier: predicateFormationRuleFrame.predicateExpectedCarrier,
        predicateActions: predicateFormationRuleFrame.predicateActions,
        predicateCarrierContradictionBlocked: predicateFormationRuleFrame.predicateCarrierContradictionBlocked,
        hostileRejectedPredicateCarriers: predicateFormationRuleFrame.hostileRejectedPredicateCarriers,
        optionalIrregularPriorVncFrames,
        optionalIrregularStemVariants: predicateFormationRuleFrame.optionalIrregularStemVariants || [],
        optionalIrregularFormulaRealizations: proofFrame.conclusion.optionalIrregularFormulaRealizations || [],
        formulaRealization: proofFrame.conclusion.selectedFormula,
        blockReason: proofFrame.conclusion.blockReason || "",
        proofFrame,
        selectedOutputLogicFrame,
        receiptInventory,
        displayReceiptFrame,
        grammarGenerationAllowed: false,
        formulaOutputAllowed: proofFrame.conclusion.authorized,
        surfaceGenerationAllowed: false,
        blocksInput: proofFrame.conclusion.authorized !== true
      };
    }
    function installClassicalNahuatlLesson7VerbstemClassesClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        getClassicalNahuatlLesson7StructureRules,
        getClassicalNahuatlLesson7CitationRules,
        getClassicalNahuatlLesson7ClassRules,
        getClassicalNahuatlLesson24TypeOneCausativeRules,
        getClassicalNahuatlLesson7ClassBChangeRules,
        getClassicalNahuatlLesson7VariableClassRules,
        getClassicalNahuatlLesson7GuidelineRules,
        getClassicalNahuatlLesson7PredicateRules,
        getClassicalNahuatlLesson7AnalysisRules,
        getClassicalNahuatlLesson7ObjectRelationshipRules,
        getClassicalNahuatlLesson7TlaFusionRules,
        getClassicalNahuatlLesson81ExpandedVncRules,
        getClassicalNahuatlLesson82SentenceSurfaceRules,
        getClassicalNahuatlLesson9WishCommandSentenceRules,
        getClassicalNahuatlLesson7ReceiptRules,
        getClassicalNahuatlLesson11OptionalIrregularPerfectiveRules,
        getClassicalNahuatlLesson7RuleLogicRules,
        normalizeClassicalNahuatlLesson7Stem,
        buildClassicalNahuatlLesson7InitialSupportiveIFrame,
        buildClassicalNahuatlLesson7CitationValenceFrame,
        inferClassicalNahuatlLesson7ClassProfile,
        getClassicalNahuatlLesson7PerfectiveStem,
        buildClassicalNahuatlLesson77PredicateTableFrame,
        getClassicalNahuatlLesson7SourceBoundaryRoleRecord,
        getClassicalNahuatlLesson7ClassBSilentCausativeCarrierRecord,
        getClassicalNahuatlLesson7TraditionalSpellingWarningRecord,
        getClassicalNahuatlLesson76GuidelineAuthorityRecord,
        buildClassicalNahuatlLesson7ImperfectiveShapeEligibilityFrame,
        getClassicalNahuatlLesson7StemVariant,
        getClassicalNahuatlLesson11OptionalIrregularPerfectiveRecord,
        buildClassicalNahuatlLesson11OptionalIrregularPerfectiveFrame,
        buildClassicalNahuatlLesson7SourceBoundaryRoleFrame,
        buildClassicalNahuatlLesson7FuenteSourceSelectionFrame,
        buildClassicalNahuatlLesson7VerbstemStructureRuleFrame,
        buildClassicalNahuatlLesson7CitationRuleFrame,
        buildClassicalNahuatlLesson7VerbstemClassRuleFrame,
        buildClassicalNahuatlLesson7PredicateFormationRuleFrame,
        buildClassicalNahuatlLesson7AnalysisRuleFrame,
        buildClassicalNahuatlLesson7ObjectRelationshipRuleFrame,
        buildClassicalNahuatlLesson7TlaFusionRuleFrame,
        buildClassicalNahuatlLesson81ExpandedVncBoundaryFrame,
        buildClassicalNahuatlLesson82SentenceSurfaceFrame,
        getClassicalNahuatlLesson81ObjectMorphIdentityFrame,
        buildClassicalNahuatlLesson81FinalBoundaryRealizationFrame,
        applyClassicalNahuatlLesson81DirectionalToFormula,
        buildClassicalNahuatlLesson7LogicProofFrame,
        buildClassicalNahuatlLesson7SelectedOutputLogicFrame,
        buildClassicalNahuatlLesson7ReceiptInventory,
        buildClassicalNahuatlLesson7DisplayReceiptFrame,
        buildClassicalNahuatlLesson7ReceiptAuthorityFrame,
        buildClassicalNahuatlLesson7VerbstemClassFrame
      });
      return globalTarget;
    }
    installClassicalNahuatlLesson7VerbstemClassesClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_VERBSTEM_CLASSES_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_VERBSTEM_CLASSES_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_SQUARE_ZERO; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_LEGAL_WITNESS_AUTHORITY; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_OUTPUTABLE_SLOTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_OUTPUTABLE_SLOTS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_SUPPORTIVE_I_SURFACE_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_SUPPORTIVE_I_SURFACE_POLICY; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_SUPPORTIVE_I_SURFACE_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_SUPPORTIVE_I_SURFACE_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_STRUCTURE_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_STRUCTURE_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_SOURCE_SELECTION_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_SOURCE_SELECTION_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_CITATION_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_CITATION_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_CLASS_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_PREDICATE_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_PREDICATE_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON8_EXPANDED_VNC_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON8_SENTENCE_SURFACE_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON9_SENTENCE_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON10_SENTENCE_ACTIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_UNKNOWN_INTERNAL_MORPH_RECORDS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_UNKNOWN_INTERNAL_MORPH_RECORDS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_CONTRASTIVE_BOUNDARY_STEMS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_CONTRASTIVE_BOUNDARY_STEMS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_SOURCE_BOUNDARY_ROLE_RECORDS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_SOURCE_BOUNDARY_ROLE_RECORDS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_STRUCTURE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_STRUCTURE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_CITATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_CITATION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_CLASS_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_CLASS_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_CLASS_B_CHANGE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_CLASS_B_CHANGE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_VARIABLE_CLASS_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_VARIABLE_CLASS_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_GUIDELINE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_GUIDELINE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_PREDICATE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_PREDICATE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_ANALYSIS_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_ANALYSIS_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_OBJECT_RELATIONSHIP_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_TLA_FUSION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_RECEIPT_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_RECEIPT_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON11_OPTIONAL_IRREGULAR_PERFECTIVE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON11_OPTIONAL_IRREGULAR_PERFECTIVE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON24_TYPE_ONE_CAUSATIVE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON24_TYPE_ONE_CAUSATIVE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_CLASS_SHAPES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_CLASS_SHAPES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_CLASS_D_HEAD_STEMS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_CLASS_D_HEAD_STEMS; },
    });
    api.makeClassicalNahuatlLesson76GuidelineAuthorityRecord = makeClassicalNahuatlLesson76GuidelineAuthorityRecord;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_GUIDELINE_AUTHORITY_STEMS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_GUIDELINE_AUTHORITY_STEMS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_STEM_RELATIONSHIPS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_STEM_RELATIONSHIPS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON11_OPTIONAL_IRREGULAR_PERFECTIVE_STEMS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON11_OPTIONAL_IRREGULAR_PERFECTIVE_STEMS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_EXACT_PERFECTIVE_STEM_OVERRIDES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_EXACT_PERFECTIVE_STEM_OVERRIDES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_CLASS_B_SILENT_CAUSATIVE_CARRIER_STEMS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_CLASS_B_SILENT_CAUSATIVE_CARRIER_STEMS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON7_TRADITIONAL_SPELLING_WARNING_STEMS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON7_TRADITIONAL_SPELLING_WARNING_STEMS; },
    });
    api.getClassicalNahuatlLesson7RuntimeTarget = getClassicalNahuatlLesson7RuntimeTarget;
    api.buildClassicalNahuatlLesson210BoundaryFrameForLesson7 = buildClassicalNahuatlLesson210BoundaryFrameForLesson7;
    api.cloneClassicalNahuatlLesson7Record = cloneClassicalNahuatlLesson7Record;
    api.cloneClassicalNahuatlLesson7Rule = cloneClassicalNahuatlLesson7Rule;
    api.getClassicalNahuatlLesson7StructureRules = getClassicalNahuatlLesson7StructureRules;
    api.getClassicalNahuatlLesson7CitationRules = getClassicalNahuatlLesson7CitationRules;
    api.getClassicalNahuatlLesson7ClassRules = getClassicalNahuatlLesson7ClassRules;
    api.getClassicalNahuatlLesson24TypeOneCausativeRules = getClassicalNahuatlLesson24TypeOneCausativeRules;
    api.getClassicalNahuatlLesson7ClassBChangeRules = getClassicalNahuatlLesson7ClassBChangeRules;
    api.getClassicalNahuatlLesson7VariableClassRules = getClassicalNahuatlLesson7VariableClassRules;
    api.getClassicalNahuatlLesson7GuidelineRules = getClassicalNahuatlLesson7GuidelineRules;
    api.getClassicalNahuatlLesson7PredicateRules = getClassicalNahuatlLesson7PredicateRules;
    api.getClassicalNahuatlLesson7AnalysisRules = getClassicalNahuatlLesson7AnalysisRules;
    api.getClassicalNahuatlLesson7ObjectRelationshipRules = getClassicalNahuatlLesson7ObjectRelationshipRules;
    api.getClassicalNahuatlLesson7TlaFusionRules = getClassicalNahuatlLesson7TlaFusionRules;
    api.getClassicalNahuatlLesson7ReceiptRules = getClassicalNahuatlLesson7ReceiptRules;
    api.getClassicalNahuatlLesson11OptionalIrregularPerfectiveRules = getClassicalNahuatlLesson11OptionalIrregularPerfectiveRules;
    api.getClassicalNahuatlLesson7RuleLogicRules = getClassicalNahuatlLesson7RuleLogicRules;
    api.normalizeClassicalNahuatlLesson7Token = normalizeClassicalNahuatlLesson7Token;
    api.normalizeClassicalNahuatlLesson7Stem = normalizeClassicalNahuatlLesson7Stem;
    api.getClassicalNahuatlLesson7ExplicitTlaFusionDerivedStem = getClassicalNahuatlLesson7ExplicitTlaFusionDerivedStem;
    api.removeClassicalNahuatlLesson7Marks = removeClassicalNahuatlLesson7Marks;
    api.getClassicalNahuatlLesson7StemForShape = getClassicalNahuatlLesson7StemForShape;
    api.wrapClassicalNahuatlLesson7Stem = wrapClassicalNahuatlLesson7Stem;
    api.getClassicalNahuatlLesson7StructureLookupKey = getClassicalNahuatlLesson7StructureLookupKey;
    api.getClassicalNahuatlLesson7TlaFusionCanvasBoundaryExample = getClassicalNahuatlLesson7TlaFusionCanvasBoundaryExample;
    api.getClassicalNahuatlLesson7UnknownInternalMorphRecords = getClassicalNahuatlLesson7UnknownInternalMorphRecords;
    api.getClassicalNahuatlLesson7ContrastiveBoundaryRecord = getClassicalNahuatlLesson7ContrastiveBoundaryRecord;
    api.buildClassicalNahuatlLesson7UserDefinedEmbedMatrixBoundaryRecord = buildClassicalNahuatlLesson7UserDefinedEmbedMatrixBoundaryRecord;
    api.getClassicalNahuatlLesson7SourceBoundaryRoleRecord = getClassicalNahuatlLesson7SourceBoundaryRoleRecord;
    api.getClassicalNahuatlLesson7NearbySourceBoundaryRecordKey = getClassicalNahuatlLesson7NearbySourceBoundaryRecordKey;
    api.dedupeClassicalNahuatlLesson7RuleRefs = dedupeClassicalNahuatlLesson7RuleRefs;
    api.buildClassicalNahuatlLesson7SourceBoundaryRoleFrame = buildClassicalNahuatlLesson7SourceBoundaryRoleFrame;
    api.normalizeClassicalNahuatlLesson7SourceSelectionKind = normalizeClassicalNahuatlLesson7SourceSelectionKind;
    api.buildClassicalNahuatlLesson7FuenteSourceSelectionFrame = buildClassicalNahuatlLesson7FuenteSourceSelectionFrame;
    api.getClassicalNahuatlLesson7ClassBSilentCausativeCarrierRecord = getClassicalNahuatlLesson7ClassBSilentCausativeCarrierRecord;
    api.getClassicalNahuatlLesson7TraditionalSpellingWarningRecord = getClassicalNahuatlLesson7TraditionalSpellingWarningRecord;
    api.getClassicalNahuatlLesson7ShapeConsonantUnits = getClassicalNahuatlLesson7ShapeConsonantUnits;
    api.isClassicalNahuatlLesson7FinalVowelAfterConsonantCluster = isClassicalNahuatlLesson7FinalVowelAfterConsonantCluster;
    api.isClassicalNahuatlLesson7MonosyllabicStem = isClassicalNahuatlLesson7MonosyllabicStem;
    api.makeClassicalNahuatlLesson7GeneralClassAuthorityRecord = makeClassicalNahuatlLesson7GeneralClassAuthorityRecord;
    api.getClassicalNahuatlLesson76GuidelineAuthorityRecord = getClassicalNahuatlLesson76GuidelineAuthorityRecord;
    api.getClassicalNahuatlLesson7FinalVowelInfo = getClassicalNahuatlLesson7FinalVowelInfo;
    api.normalizeClassicalNahuatlLesson7Valence = normalizeClassicalNahuatlLesson7Valence;
    api.getClassicalNahuatlLesson7InitialVowelKind = getClassicalNahuatlLesson7InitialVowelKind;
    api.omitClassicalNahuatlLesson7InitialSupportiveI = omitClassicalNahuatlLesson7InitialSupportiveI;
    api.buildClassicalNahuatlLesson7InitialSupportiveIFrame = buildClassicalNahuatlLesson7InitialSupportiveIFrame;
    api.getClassicalNahuatlLesson7ProjectiveCitationRepresentative = getClassicalNahuatlLesson7ProjectiveCitationRepresentative;
    api.buildClassicalNahuatlLesson7CitationValenceFrame = buildClassicalNahuatlLesson7CitationValenceFrame;
    api.normalizeClassicalNahuatlLesson7ClassId = normalizeClassicalNahuatlLesson7ClassId;
    api.getClassicalNahuatlLesson7StemRelationship = getClassicalNahuatlLesson7StemRelationship;
    api.getClassicalNahuatlLesson11OptionalIrregularPerfectiveRecord = getClassicalNahuatlLesson11OptionalIrregularPerfectiveRecord;
    api.normalizeClassicalNahuatlLesson7Subject = normalizeClassicalNahuatlLesson7Subject;
    api.isClassicalNahuatlLesson11OptionalIrregularEnvironment = isClassicalNahuatlLesson11OptionalIrregularEnvironment;
    api.inferClassicalNahuatlLesson7ClassProfile = inferClassicalNahuatlLesson7ClassProfile;
    api.stripClassicalNahuatlLesson7FinalVowel = stripClassicalNahuatlLesson7FinalVowel;
    api.trimClassicalNahuatlLesson7StemRightBoundary = trimClassicalNahuatlLesson7StemRightBoundary;
    api.doesClassicalNahuatlLesson7FinalCRepresentS = doesClassicalNahuatlLesson7FinalCRepresentS;
    api.doesClassicalNahuatlLesson7RootContainSSound = doesClassicalNahuatlLesson7RootContainSSound;
    api.shortenClassicalNahuatlLesson7FinalLongVowel = shortenClassicalNahuatlLesson7FinalLongVowel;
    api.lengthenClassicalNahuatlLesson7FinalVowel = lengthenClassicalNahuatlLesson7FinalVowel;
    api.getClassicalNahuatlLesson7ClassCTruncatedStem = getClassicalNahuatlLesson7ClassCTruncatedStem;
    api.isClassicalNahuatlLesson7SingularSubject = isClassicalNahuatlLesson7SingularSubject;
    api.buildClassicalNahuatlLesson7ImperfectiveShapeEligibilityFrame = buildClassicalNahuatlLesson7ImperfectiveShapeEligibilityFrame;
    api.getClassicalNahuatlLesson7ExactPerfectiveStemOverride = getClassicalNahuatlLesson7ExactPerfectiveStemOverride;
    api.applyClassicalNahuatlLesson7ClassBChanges = applyClassicalNahuatlLesson7ClassBChanges;
    api.getClassicalNahuatlLesson7ClassBPerfectiveCarrierFrame = getClassicalNahuatlLesson7ClassBPerfectiveCarrierFrame;
    api.getClassicalNahuatlLesson7PerfectiveStem = getClassicalNahuatlLesson7PerfectiveStem;
    api.buildClassicalNahuatlLesson11OptionalIrregularPerfectiveFrame = buildClassicalNahuatlLesson11OptionalIrregularPerfectiveFrame;
    api.normalizeClassicalNahuatlLesson7Mood = normalizeClassicalNahuatlLesson7Mood;
    api.normalizeClassicalNahuatlLesson7Tense = normalizeClassicalNahuatlLesson7Tense;
    api.getClassicalNahuatlLesson9BorrowedIndicativeFormUse = getClassicalNahuatlLesson9BorrowedIndicativeFormUse;
    api.getClassicalNahuatlLesson7AspectForTense = getClassicalNahuatlLesson7AspectForTense;
    api.normalizeClassicalNahuatlLesson77PredicateCarrier = normalizeClassicalNahuatlLesson77PredicateCarrier;
    api.getClassicalNahuatlLesson77PredicateRuleId = getClassicalNahuatlLesson77PredicateRuleId;
    api.getClassicalNahuatlLesson77PredicateTableSide = getClassicalNahuatlLesson77PredicateTableSide;
    api.buildClassicalNahuatlLesson77PredicateTableFrame = buildClassicalNahuatlLesson77PredicateTableFrame;
    api.getClassicalNahuatlLesson7StemVariant = getClassicalNahuatlLesson7StemVariant;
    api.buildClassicalNahuatlLesson7VerbstemStructureRuleFrame = buildClassicalNahuatlLesson7VerbstemStructureRuleFrame;
    api.buildClassicalNahuatlLesson7CitationRuleFrame = buildClassicalNahuatlLesson7CitationRuleFrame;
    api.buildClassicalNahuatlLesson7VerbstemClassRuleFrame = buildClassicalNahuatlLesson7VerbstemClassRuleFrame;
    api.buildClassicalNahuatlLesson7PredicateFormationRuleFrame = buildClassicalNahuatlLesson7PredicateFormationRuleFrame;
    api.buildClassicalNahuatlLesson7AnalysisRuleFrame = buildClassicalNahuatlLesson7AnalysisRuleFrame;
    api.normalizeClassicalNahuatlLesson7ObjectRelationshipToken = normalizeClassicalNahuatlLesson7ObjectRelationshipToken;
    api.normalizeClassicalNahuatlLesson7IndefiniteObject = normalizeClassicalNahuatlLesson7IndefiniteObject;
    api.normalizeClassicalNahuatlLesson7ObjectRelationshipKind = normalizeClassicalNahuatlLesson7ObjectRelationshipKind;
    api.getClassicalNahuatlLesson7ObjectRelationshipGroup = getClassicalNahuatlLesson7ObjectRelationshipGroup;
    api.getClassicalNahuatlLesson7ObjectRelationshipWitness = getClassicalNahuatlLesson7ObjectRelationshipWitness;
    api.getClassicalNahuatlLesson7SpecificProjectiveRelationshipKind = getClassicalNahuatlLesson7SpecificProjectiveRelationshipKind;
    api.getClassicalNahuatlLesson7SelectedObjectRelationship = getClassicalNahuatlLesson7SelectedObjectRelationship;
    api.buildClassicalNahuatlLesson7ObjectRelationshipRuleFrame = buildClassicalNahuatlLesson7ObjectRelationshipRuleFrame;
    api.normalizeClassicalNahuatlLesson7TlaFusionAnalysisKind = normalizeClassicalNahuatlLesson7TlaFusionAnalysisKind;
    api.normalizeClassicalNahuatlLesson7AdverbPosition = normalizeClassicalNahuatlLesson7AdverbPosition;
    api.getClassicalNahuatlLesson7FusedTlaSegment = getClassicalNahuatlLesson7FusedTlaSegment;
    api.getClassicalNahuatlLesson7ExplicitTlaFusionEmbedStem = getClassicalNahuatlLesson7ExplicitTlaFusionEmbedStem;
    api.getClassicalNahuatlLesson7ExplicitTlaFusionMatrixStem = getClassicalNahuatlLesson7ExplicitTlaFusionMatrixStem;
    api.buildClassicalNahuatlLesson7ConstructiveTlaFusionTargetFrame = buildClassicalNahuatlLesson7ConstructiveTlaFusionTargetFrame;
    api.buildClassicalNahuatlLesson7TlaFusionDerivedStem = buildClassicalNahuatlLesson7TlaFusionDerivedStem;
    api.buildClassicalNahuatlLesson7TlaFusionSourceStem = buildClassicalNahuatlLesson7TlaFusionSourceStem;
    api.buildClassicalNahuatlLesson7TlaFusionRuleFrame = buildClassicalNahuatlLesson7TlaFusionRuleFrame;
    api.getClassicalNahuatlLesson81ExpandedVncRules = getClassicalNahuatlLesson81ExpandedVncRules;
    api.normalizeClassicalNahuatlLesson8DirectionalPrefix = normalizeClassicalNahuatlLesson8DirectionalPrefix;
    api.normalizeClassicalNahuatlLesson8OutsidePrefix = normalizeClassicalNahuatlLesson8OutsidePrefix;
    api.getClassicalNahuatlLesson81OutsidePrefixes = getClassicalNahuatlLesson81OutsidePrefixes;
    api.getClassicalNahuatlLesson81HostileFormulaSlots = getClassicalNahuatlLesson81HostileFormulaSlots;
    api.getClassicalNahuatlLesson81DirectionalPlacement = getClassicalNahuatlLesson81DirectionalPlacement;
    api.isClassicalNahuatlLesson81ThirdSingularProjectiveOnObjectSlot = isClassicalNahuatlLesson81ThirdSingularProjectiveOnObjectSlot;
    api.getClassicalNahuatlLesson81ObjectMorphIdentityFrame = getClassicalNahuatlLesson81ObjectMorphIdentityFrame;
    api.getClassicalNahuatlLesson81FirstSound = getClassicalNahuatlLesson81FirstSound;
    api.getClassicalNahuatlLesson81LastSound = getClassicalNahuatlLesson81LastSound;
    api.isClassicalNahuatlLesson81VowelSound = isClassicalNahuatlLesson81VowelSound;
    api.getClassicalNahuatlLesson81Pers1Carrier = getClassicalNahuatlLesson81Pers1Carrier;
    api.setClassicalNahuatlLesson81Pers1Carrier = setClassicalNahuatlLesson81Pers1Carrier;
    api.getClassicalNahuatlLesson81Pers1CarrierFamily = getClassicalNahuatlLesson81Pers1CarrierFamily;
    api.getClassicalNahuatlLesson81NextCarrierAfterPers1 = getClassicalNahuatlLesson81NextCarrierAfterPers1;
    api.applyClassicalNahuatlLesson81Pers1FinalSupport = applyClassicalNahuatlLesson81Pers1FinalSupport;
    api.getClassicalNahuatlLesson81SpecificObjectSlotFromFormula = getClassicalNahuatlLesson81SpecificObjectSlotFromFormula;
    api.getClassicalNahuatlLesson81FormulaStemInitialAfterObject = getClassicalNahuatlLesson81FormulaStemInitialAfterObject;
    api.getClassicalNahuatlLesson81SoundBeforeObject = getClassicalNahuatlLesson81SoundBeforeObject;
    api.applyClassicalNahuatlLesson81ThirdPersonObjectFinalRealization = applyClassicalNahuatlLesson81ThirdPersonObjectFinalRealization;
    api.applyClassicalNahuatlLesson81Pers1OBeforeCOn = applyClassicalNahuatlLesson81Pers1OBeforeCOn;
    api.getClassicalNahuatlLesson81NumberDyadFrame = getClassicalNahuatlLesson81NumberDyadFrame;
    api.parseClassicalNahuatlLesson81FinalPredicateNumber = parseClassicalNahuatlLesson81FinalPredicateNumber;
    api.isClassicalNahuatlLesson81SilentCarrier = isClassicalNahuatlLesson81SilentCarrier;
    api.getClassicalNahuatlLesson81Num1LeftSound = getClassicalNahuatlLesson81Num1LeftSound;
    api.isClassicalNahuatlLesson81Num1KConnectorContext = isClassicalNahuatlLesson81Num1KConnectorContext;
    api.replaceClassicalNahuatlLesson81FinalNumberDyad = replaceClassicalNahuatlLesson81FinalNumberDyad;
    api.applyClassicalNahuatlLesson81Num1FinalRealization = applyClassicalNahuatlLesson81Num1FinalRealization;
    api.buildClassicalNahuatlLesson81LegacyStringBoundaryRealizationFrame = buildClassicalNahuatlLesson81LegacyStringBoundaryRealizationFrame;
    api.buildClassicalNahuatlLesson81FinalBoundaryRealizationFrame = buildClassicalNahuatlLesson81FinalBoundaryRealizationFrame;
    api.applyClassicalNahuatlLesson81DirectionalToFormula = applyClassicalNahuatlLesson81DirectionalToFormula;
    api.buildClassicalNahuatlLesson81ExpandedVncBoundaryFrame = buildClassicalNahuatlLesson81ExpandedVncBoundaryFrame;
    api.getClassicalNahuatlLesson82SentenceSurfaceRules = getClassicalNahuatlLesson82SentenceSurfaceRules;
    api.normalizeClassicalNahuatlLesson8SentenceType = normalizeClassicalNahuatlLesson8SentenceType;
    api.normalizeClassicalNahuatlLesson9SentenceType = normalizeClassicalNahuatlLesson9SentenceType;
    api.isClassicalNahuatlLesson9NegativeSentenceRequested = isClassicalNahuatlLesson9NegativeSentenceRequested;
    api.normalizeClassicalNahuatlLesson9IntroductoryParticle = normalizeClassicalNahuatlLesson9IntroductoryParticle;
    api.getClassicalNahuatlLesson9IntroductoryParticle = getClassicalNahuatlLesson9IntroductoryParticle;
    api.normalizeClassicalNahuatlLesson9PrefaceParticle = normalizeClassicalNahuatlLesson9PrefaceParticle;
    api.normalizeClassicalNahuatlLesson9IntroductoryModifier = normalizeClassicalNahuatlLesson9IntroductoryModifier;
    api.getClassicalNahuatlLesson9PrefaceParticle = getClassicalNahuatlLesson9PrefaceParticle;
    api.getClassicalNahuatlLesson9IntroductoryModifier = getClassicalNahuatlLesson9IntroductoryModifier;
    api.isClassicalNahuatlLesson9PrefaceParticleAuthorized = isClassicalNahuatlLesson9PrefaceParticleAuthorized;
    api.isClassicalNahuatlLesson9IntroductoryModifierAuthorized = isClassicalNahuatlLesson9IntroductoryModifierAuthorized;
    api.isClassicalNahuatlLesson10NenAuthorized = isClassicalNahuatlLesson10NenAuthorized;
    api.getClassicalNahuatlLesson9SubjectPersonClass = getClassicalNahuatlLesson9SubjectPersonClass;
    api.deriveClassicalNahuatlLesson9SentenceTypeFromMood = deriveClassicalNahuatlLesson9SentenceTypeFromMood;
    api.getClassicalNahuatlLesson9CanvasSentenceRole = getClassicalNahuatlLesson9CanvasSentenceRole;
    api.getClassicalNahuatlLesson9CanvasSentenceRoleNotice = getClassicalNahuatlLesson9CanvasSentenceRoleNotice;
    api.getClassicalNahuatlLesson10CanvasSentenceRole = getClassicalNahuatlLesson10CanvasSentenceRole;
    api.getClassicalNahuatlLesson10CanvasSentenceRoleNotice = getClassicalNahuatlLesson10CanvasSentenceRoleNotice;
    api.getClassicalNahuatlLesson10SubjectNumberClass = getClassicalNahuatlLesson10SubjectNumberClass;
    api.getClassicalNahuatlLesson10ContrastReadingRequest = getClassicalNahuatlLesson10ContrastReadingRequest;
    api.getClassicalNahuatlLesson10ClassContrastProfile = getClassicalNahuatlLesson10ClassContrastProfile;
    api.getClassicalNahuatlLesson9WishCommandSentenceRules = getClassicalNahuatlLesson9WishCommandSentenceRules;
    api.getClassicalNahuatlLesson10AdmonitionSentenceRules = getClassicalNahuatlLesson10AdmonitionSentenceRules;
    api.normalizeClassicalNahuatlLesson8QuestionMode = normalizeClassicalNahuatlLesson8QuestionMode;
    api.getClassicalNahuatlLesson8SentenceHostileFormulaSlots = getClassicalNahuatlLesson8SentenceHostileFormulaSlots;
    api.buildClassicalNahuatlLesson8SentencePrefixalStack = buildClassicalNahuatlLesson8SentencePrefixalStack;
    api.buildClassicalNahuatlLesson82SentenceSurfaceFrame = buildClassicalNahuatlLesson82SentenceSurfaceFrame;
    api.getClassicalNahuatlLesson7PriorVncFrame = getClassicalNahuatlLesson7PriorVncFrame;
    api.buildClassicalNahuatlLesson7LogicProofFrame = buildClassicalNahuatlLesson7LogicProofFrame;
    api.buildClassicalNahuatlLesson7SelectedOutputLogicFrame = buildClassicalNahuatlLesson7SelectedOutputLogicFrame;
    api.buildClassicalNahuatlLesson7ReceiptInventory = buildClassicalNahuatlLesson7ReceiptInventory;
    api.buildClassicalNahuatlLesson7DisplayReceiptFrame = buildClassicalNahuatlLesson7DisplayReceiptFrame;
    api.buildClassicalNahuatlLesson7ReceiptAuthorityFrame = buildClassicalNahuatlLesson7ReceiptAuthorityFrame;
    api.buildClassicalNahuatlLesson7VerbstemClassFrame = buildClassicalNahuatlLesson7VerbstemClassFrame;
    api.installClassicalNahuatlLesson7VerbstemClassesClassicGlobals = installClassicalNahuatlLesson7VerbstemClassesClassicGlobals;
    return api;
}

export function installClassicalNahuatlLesson7VerbstemClassesGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlLesson7VerbstemClassesRuntime(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
