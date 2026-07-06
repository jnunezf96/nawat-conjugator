// Native wrapper generated from src/core/irregulars/irregulars.js.

export function createIrregularsApi(targetObject = globalThis) {
    const IRREGULARS_LESSON11_VALIDATION_REFS = Object.freeze(["src/tests/irregulars.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const IRREGULARS_LESSON11_PDF_REFS = Object.freeze(["Andrews Lesson 11.1", "Andrews Lesson 11.2", "Andrews Lesson 11.3", "Andrews Lesson 11.4", "Andrews Lesson 11.5", "Andrews Lesson 11.6"]);
    const IRREGULARS_LESSON11_NATURE_FRAME = Object.freeze({
      kind: "lesson-11-irregular-vnc-nature-frame",
      sourceSection: "Andrews §11.1",
      category: "irregular-vnc-nature",
      generationAllowed: false,
      primaryIrregularityLoci: Object.freeze(["perfective-stem-formation", "tense-form-meaning-alignment"]),
      occasionalIrregularityLoci: Object.freeze(["tense-morph-shape", "number-morph-shape"]),
      engineBoundary: "Irregularity is taxonomy plus evidence routing; it is not permission to import Classical surfaces as Nawat/Pipil generated forms."
    });
    const IRREGULARS_LESSON11_PERFECTIVE_STEM_FRAME = Object.freeze({
      kind: "lesson-11-irregular-perfective-stem-frame",
      sourceSections: Object.freeze(["Andrews §11.2", "Andrews §11.3"]),
      irregularityCriterion: "speech-not-spelling",
      regularSoundChangeIsNotIrregular: true,
      classBYToZAlreadyHandledByLesson7: true,
      types: Object.freeze([Object.freeze({
        id: "compound-class-shift",
        directiveEs: "Un compuesto normalmente conserva la clase de su tronco matriz; si una matriz de clase A pasa a comportamiento de clase B en compuesto, Andrews lo trata como irregular.",
        andrewsExamples: Object.freeze(["tla-(cui)", "tla-(ahco-cui)", "(ce-cui)"]),
        nawatStatus: "orthography-bridge-required; no fixture generated from Andrews alone",
        generationAllowed: false
      }), Object.freeze({
        id: "ti-final-alternate-perfective",
        directiveEs: "Algunos troncos de clase B terminados en ti tienen un tronco perfectivo alternante con saltillo en lugar de t final.",
        andrewsExamples: Object.freeze(["(mati) > (mat) ~ (mah)", "tla-(mati) > tla-(mat) ~ tla-(mah)", "m-o-(mati) > m-o-(mat) ~ m-o-(mah)", "*(ca-ti) > (ca-t) ~ (ca-h)"]),
        distribution: Object.freeze({
          irregularPreferredIn: Object.freeze(["singular-preterit", "singular-admonitive"]),
          regularAllowedIn: Object.freeze(["singular-preterit"]),
          regularRequiredIn: Object.freeze(["plural-preterit", "plural-admonitive", "distant-past"])
        }),
        nawatStatus: "saltillo/h/j realization requires local Andrews source logic plus the orthography bridge before generation",
        generationAllowed: false
      })])
    });
    const IRREGULARS_LESSON11_FORM_MEANING_ALIGNMENT_FRAME = Object.freeze({
      kind: "lesson-11-form-meaning-alignment-frame",
      sourceSection: "Andrews §11.4",
      generationAllowed: false,
      dislocations: Object.freeze({
        preteritAsPresent: Object.freeze({
          formSource: "preterit-tense VNC",
          meaning: "present-indicative",
          blocksAntecessiveO: true,
          blocksPresentIndicativeTenseMorph: true
        }),
        distantPastAsPast: Object.freeze({
          formSource: "distant-past-tense VNC",
          meaning: "general-past-indicative",
          imperfectYaOftenAlternate: true
        })
      }),
      irregularInventory: Object.freeze([Object.freeze({
        id: "ih-ca",
        function: "standing",
        pattern: "preterit-as-present plus distant-past-as-past",
        classMajority: "A"
      }), Object.freeze({
        id: "on-o",
        function: "lying",
        pattern: "fused locative on plus preterit-as-present plus distant-past-as-past"
      }), Object.freeze({
        id: "pil-ca",
        function: "hanging",
        pattern: "preterit-as-present plus distant-past-as-past"
      }), Object.freeze({
        id: "a",
        function: "present-or-absent",
        pattern: "defective perfective-only preterit-as-present"
      }), Object.freeze({
        id: "itzi",
        function: "come-go",
        pattern: "defective perfective-only preterit-as-present plus distant-past-as-past; never simple VNC"
      }), Object.freeze({
        id: "am-i-a",
        function: "exist",
        pattern: "defective class C preterit-as-present in quen constructions"
      }), Object.freeze({
        id: "0-i-a",
        function: "exist",
        pattern: "defective class C preterit-as-present with certain pronominal NNCs"
      }), Object.freeze({
        id: "mani",
        function: "extend-be",
        pattern: "preterit predicates not built on perfective; distant-past-as-past"
      }), Object.freeze({
        id: "nemi",
        function: "live",
        pattern: "regular tenses; distant-past sometimes used as past"
      })]),
      currentEngineBoundary: "No full dislocation generator exists; Andrews source models plus orthography-bridge support must license each surface and meaning."
    });
    const IRREGULARS_LESSON11_SUPPLETION_FRAME = Object.freeze({
      kind: "lesson-11-suppletion-frame",
      sourceSections: Object.freeze(["Andrews §11.5", "Andrews §11.5.1", "Andrews §11.5.2", "Andrews §11.5.3"]),
      generationAllowed: false,
      definition: "Suppletion fills one paradigm with stems that are not predictable from one verbstem.",
      andrewsSuppletiveParadigms: Object.freeze([Object.freeze({
        id: "ye-ca",
        sourceSection: "Andrews §11.5.1",
        function: "be-exist-found-in-place",
        stems: Object.freeze(["(ye)", "(ca-t)", "(ca-h)"]),
        constraints: Object.freeze(["present indicative is absent from (ye)", "(ca-t)/(ca-h) carry preterit-as-present and distant-past-as-past", "(ca-h) is singular preterit-as-present only"])
      }), Object.freeze({
        id: "ya-hui",
        sourceSection: "Andrews §11.5.2",
        function: "go",
        stems: Object.freeze(["(ya)", "(ya-uh)", "(hui)", "(yah)"]),
        constraints: Object.freeze(["(ya-uh) singular/common and (hui) plural for present indicative and nonpast optative", "(ya) does not form present indicative or nonpast optative", "(yah) forms preterit and nonpast admonitive"])
      }), Object.freeze({
        id: "hual-la-hui",
        sourceSection: "Andrews §11.5.3",
        function: "come",
        stems: Object.freeze(["(hual-la)", "(hual-la-uh)", "(hual-hui)"]),
        constraints: Object.freeze(["same suppletive pattern as go", "directional/locative hual is fused to the suppletive stems"])
      })]),
      currentNawatSuppletiveSubset: Object.freeze([Object.freeze({
        id: "kati",
        status: "implemented from repo orthography-bridge examples, not a complete Andrews ye-ca import"
      }), Object.freeze({
        id: "yawi",
        status: "implemented from repo orthography-bridge examples, aligned only where current tests confirm it"
      }), Object.freeze({
        id: "witzi",
        status: "implemented from repo orthography-bridge examples, defective route remains source-gated"
      }), Object.freeze({
        id: "weya",
        status: "implemented from repo orthography-bridge examples, separate from Andrews Lesson 11 taxonomy unless explicitly mapped"
      })])
    });
    const IRREGULARS_LESSON11_IDIOM_FRAME = Object.freeze({
      kind: "lesson-11-irregular-vnc-idiom-frame",
      sourceSection: "Andrews §11.6",
      generationAllowed: false,
      directiveEs: "Las CNV irregulares aparecen frecuentemente en modismos; los ejemplos de Andrews son inventario diagnostico hasta que haya fuente Andrews concreta y puente ortografico local.",
      andrewsExamples: Object.freeze(["Quen tonyezqueh?", "Ahquen nicmati.", "Ahquen nocommati.", "Zan huitz.", "Quin yez.", "Nihuallamati.", "Ma ammomattin.", "Oc onyauh."]),
      currentEngineBoundary: "No idiom generator exists; idioms need confirmed lexical, spelling, and usage evidence."
    });
    const IRREGULARS_LESSON11_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson11-nature",
      andrewsSection: "11.1",
      category: "irregular-vnc-nature",
      directiveEs: "Ubicar la irregularidad principalmente en el tronco perfectivo y en la relacion forma-tiempo/significado.",
      engineSurface: "taxonomy metadata over current irregular engine",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson11-irregular-perfective-stems",
      andrewsSection: "11.2",
      category: "irregular-perfective-stem",
      directiveEs: "Juzgar irregularidad por habla, no por ortografia; un cambio regular de sonido no cuenta como irregular.",
      engineSurface: "perfective-stem diagnostic metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson11-two-perfective-types",
      andrewsSection: "11.3",
      category: "perfective-irregularity-types",
      directiveEs: "Separar cambio de clase en compuestos y alternancia t/saltillo en troncos terminados en ti.",
      engineSurface: "blocked taxonomy; no new generated surfaces",
      redirectAction: "block-generation",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson11-form-meaning-alignments",
      andrewsSection: "11.4",
      category: "tense-form-meaning-dislocation",
      directiveEs: "Registrar preterito-como-presente y pasado-remoto-como-pasado como dislocaciones de forma y significado.",
      engineSurface: "diagnostic-only tense-use metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson11-suppletion",
      andrewsSection: "11.5",
      category: "suppletion",
      directiveEs: "Modelar suplecion como paradigma llenado por varios troncos, manteniendo separado el subconjunto Nawat ya confirmado.",
      engineSurface: "current suppletive engine plus Andrews taxonomy frame",
      redirectAction: "source-gated",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    }), Object.freeze({
      id: "lesson11-idioms",
      andrewsSection: "11.6",
      category: "irregular-vnc-idioms",
      directiveEs: "Mantener modismos como inventario diagnostico; no generarlos sin evidencia lexical y ortografica Nawat/Pipil.",
      engineSurface: "idiom boundary metadata",
      redirectAction: "diagnostic-only",
      evidenceStatus: "direct-pdf-partial",
      implementationState: "partial"
    })]);
    const IRREGULARS_LESSON11_REMAINING_GAPS = Object.freeze(["The full Andrews Lesson 11 irregular taxonomy is not mapped to Nawat/Pipil generation.", "Perfective-stem irregularities, form-meaning dislocations, and defective paradigms require direct Andrews source logic plus orthography-bridge support before surfaces are generated.", "Lesson 11 idioms are diagnostic inventory only until lexical, spelling, and usage evidence confirms them."]);
    const CURRENT_SUPPLETIVE_STEM_FRAME_KIND = "lesson-11-current-suppletive-stem-frame";
    const CURRENT_SUPPLETIVE_PRETERIT_VARIANT_FRAME_KIND = "lesson-11-current-suppletive-preterit-variant-frame";
    const CURRENT_SUPPLETIVE_STEM_INVENTORY = Object.freeze({
      yawi: Object.freeze({
        kind: "lesson-11-current-suppletive-paradigm-frame",
        paradigmId: "yawi",
        sourceSection: "Andrews §11.5.2",
        routeRole: "current-Nawat-suppletive-subset",
        stems: Object.freeze({
          canonical: Object.freeze({
            kind: CURRENT_SUPPLETIVE_STEM_FRAME_KIND,
            paradigmId: "yawi",
            stemSlot: "canonical",
            surfaceStem: "yawi"
          }),
          imperfective: Object.freeze({
            kind: CURRENT_SUPPLETIVE_STEM_FRAME_KIND,
            paradigmId: "yawi",
            stemSlot: "imperfective",
            surfaceStem: "ya"
          }),
          short: Object.freeze({
            kind: CURRENT_SUPPLETIVE_STEM_FRAME_KIND,
            paradigmId: "yawi",
            stemSlot: "short",
            surfaceStem: "yaw"
          }),
          yuVariant: Object.freeze({
            kind: CURRENT_SUPPLETIVE_STEM_FRAME_KIND,
            paradigmId: "yawi",
            stemSlot: "yu-variant",
            surfaceStem: "yu"
          }),
          causativeActive: Object.freeze({
            kind: CURRENT_SUPPLETIVE_STEM_FRAME_KIND,
            paradigmId: "yawi",
            stemSlot: "causative-active",
            surfaceStem: "wika"
          }),
          causativeNonactive: Object.freeze({
            kind: CURRENT_SUPPLETIVE_STEM_FRAME_KIND,
            paradigmId: "yawi",
            stemSlot: "causative-nonactive",
            surfaceStem: "wikalu"
          })
        }),
        preteritVariants: Object.freeze([Object.freeze({
          kind: CURRENT_SUPPLETIVE_PRETERIT_VARIANT_FRAME_KIND,
          paradigmId: "yawi",
          pretClass: "D",
          base: "yaj",
          suffix: "ki"
        })])
      }),
      weya: Object.freeze({
        kind: "lesson-11-current-suppletive-paradigm-frame",
        paradigmId: "weya",
        sourceSection: "current-Nawat-suppletive-subset",
        routeRole: "current-Nawat-suppletive-subset",
        stems: Object.freeze({
          rootPlusYaBase: Object.freeze({
            kind: CURRENT_SUPPLETIVE_STEM_FRAME_KIND,
            paradigmId: "weya",
            stemSlot: "root-plus-ya-base",
            surfaceStem: "wey"
          }),
          canonical: Object.freeze({
            kind: CURRENT_SUPPLETIVE_STEM_FRAME_KIND,
            paradigmId: "weya",
            stemSlot: "canonical",
            surfaceStem: "weyya"
          })
        }),
        preteritVariants: Object.freeze([Object.freeze({
          kind: CURRENT_SUPPLETIVE_PRETERIT_VARIANT_FRAME_KIND,
          paradigmId: "weya",
          pretClass: "A",
          base: "wey",
          suffix: "ki",
          surfaceRuleMeta: Object.freeze({
            preserveCodaY: true
          })
        }), Object.freeze({
          kind: CURRENT_SUPPLETIVE_PRETERIT_VARIANT_FRAME_KIND,
          paradigmId: "weya",
          pretClass: "A",
          base: "weyya",
          suffix: "k",
          surfaceRuleMeta: Object.freeze({
            preserveCodaY: true
          })
        })])
      })
    });
    function isIntransitiveOnlySuppletiveId(id = "") {
      return targetObject.INTRANSITIVE_ONLY_SUPPLETIVE_IDS.has(String(id || "").toLowerCase());
    }
    function isSuppletiveIntransitiveOnlyContext(parsedVerb, options = {}) {
      if (!parsedVerb) {
        return false;
      }
      const hasObjectSelection = options.hasObjectSelection === true;
      // Evaluate intransitive-only suppletives from the source/direct valency,
      // not from derived valency (causative/applicative adds slots).
      const sourceObjectSlots = targetObject.getDirectActiveObjectSlots(parsedVerb);
      return sourceObjectSlots === 0 && !hasObjectSelection;
    }
    function dropFinalVowel(stem) {
      if (!stem) {
        return stem;
      }
      return targetObject.VOWEL_END_RE.test(stem) ? stem.slice(0, -1) : stem;
    }
    function buildCurrentSuppletiveStemDiagnostic(id, details = {}) {
      return {
        id,
        layer: "irregular-suppletive-stem-inventory",
        ...details
      };
    }
    function blockCurrentSuppletiveStem(id, details = {}) {
      return {
        error: true,
        surfaceForms: [],
        diagnostics: [buildCurrentSuppletiveStemDiagnostic(id, details)]
      };
    }
    function getCurrentSuppletiveParadigmFrame(paradigmId = "") {
      const frame = CURRENT_SUPPLETIVE_STEM_INVENTORY[String(paradigmId || "").toLowerCase()] || null;
      return frame ? cloneIrregularsLessonRecord(frame) : null;
    }
    function getCurrentSuppletiveStemFrame(paradigmId = "", stemSlot = "") {
      const paradigmFrame = CURRENT_SUPPLETIVE_STEM_INVENTORY[String(paradigmId || "").toLowerCase()] || null;
      const frame = paradigmFrame?.stems?.[stemSlot] || null;
      return frame ? cloneIrregularsLessonRecord(frame) : null;
    }
    function getCurrentSuppletivePreteritVariantFrames(paradigmId = "", pretClass = "") {
      const paradigmFrame = CURRENT_SUPPLETIVE_STEM_INVENTORY[String(paradigmId || "").toLowerCase()] || null;
      const classKey = String(pretClass || "").toUpperCase();
      const frames = Array.isArray(paradigmFrame?.preteritVariants) ? paradigmFrame.preteritVariants.filter(frame => !classKey || frame.pretClass === classKey) : [];
      return frames.map(frame => cloneIrregularsLessonRecord(frame));
    }
    function realizeCurrentSuppletiveStemFrame(frame = null, expected = {}) {
      if (!frame || typeof frame !== "object") {
        return blockCurrentSuppletiveStem("current-suppletive-missing-stem-frame", {
          expectedParadigmId: expected.paradigmId || "",
          expectedStemSlot: expected.stemSlot || ""
        });
      }
      const surfaceStem = typeof frame.surfaceStem === "string" ? frame.surfaceStem : "";
      const paradigmMatches = !expected.paradigmId || frame.paradigmId === expected.paradigmId;
      const slotMatches = !expected.stemSlot || frame.stemSlot === expected.stemSlot;
      const surfaceMatches = !expected.surfaceStem || surfaceStem === expected.surfaceStem;
      if (frame.kind !== CURRENT_SUPPLETIVE_STEM_FRAME_KIND || !surfaceStem || !paradigmMatches || !slotMatches || !surfaceMatches) {
        return blockCurrentSuppletiveStem("current-suppletive-contradictory-stem-frame", {
          expectedParadigmId: expected.paradigmId || "",
          actualParadigmId: frame.paradigmId || "",
          expectedStemSlot: expected.stemSlot || "",
          actualStemSlot: frame.stemSlot || "",
          expectedSurfaceStem: expected.surfaceStem || "",
          actualSurfaceStem: surfaceStem
        });
      }
      return {
        ok: true,
        surfaceStem,
        frame: cloneIrregularsLessonRecord(frame)
      };
    }
    function realizeCurrentSuppletivePreteritVariantFrame(frame = null, expected = {}) {
      if (!frame || typeof frame !== "object") {
        return blockCurrentSuppletiveStem("current-suppletive-missing-preterit-variant-frame", {
          expectedParadigmId: expected.paradigmId || "",
          expectedPretClass: expected.pretClass || ""
        });
      }
      const base = typeof frame.base === "string" ? frame.base : "";
      const suffix = typeof frame.suffix === "string" ? frame.suffix : "";
      const paradigmMatches = !expected.paradigmId || frame.paradigmId === expected.paradigmId;
      const classMatches = !expected.pretClass || frame.pretClass === expected.pretClass;
      const baseMatches = !expected.base || base === expected.base;
      const suffixMatches = !expected.suffix || suffix === expected.suffix;
      if (frame.kind !== CURRENT_SUPPLETIVE_PRETERIT_VARIANT_FRAME_KIND || !base || !paradigmMatches || !classMatches || !baseMatches || !suffixMatches) {
        return blockCurrentSuppletiveStem("current-suppletive-contradictory-preterit-variant-frame", {
          expectedParadigmId: expected.paradigmId || "",
          actualParadigmId: frame.paradigmId || "",
          expectedPretClass: expected.pretClass || "",
          actualPretClass: frame.pretClass || "",
          expectedBase: expected.base || "",
          actualBase: base,
          expectedSuffix: expected.suffix || "",
          actualSuffix: suffix
        });
      }
      return {
        ok: true,
        variant: {
          base,
          suffix,
          ...(frame.surfaceRuleMeta ? {
            surfaceRuleMeta: cloneIrregularsLessonRecord(frame.surfaceRuleMeta)
          } : {})
        },
        frame: cloneIrregularsLessonRecord(frame)
      };
    }
    function getSuppletiveYawiCanonical() {
      const result = realizeCurrentSuppletiveStemFrame(getCurrentSuppletiveStemFrame("yawi", "canonical"), {
        paradigmId: "yawi",
        stemSlot: "canonical",
        surfaceStem: "yawi"
      });
      return result.ok ? result.surfaceStem : "yawi";
    }
    function getSuppletiveYawiImperfective() {
      const result = realizeCurrentSuppletiveStemFrame(getCurrentSuppletiveStemFrame("yawi", "imperfective"), {
        paradigmId: "yawi",
        stemSlot: "imperfective",
        surfaceStem: "ya"
      });
      return result.ok ? result.surfaceStem : "ya";
    }
    function getSuppletiveYawiShort() {
      const result = realizeCurrentSuppletiveStemFrame(getCurrentSuppletiveStemFrame("yawi", "short"), {
        paradigmId: "yawi",
        stemSlot: "short",
        surfaceStem: "yaw"
      });
      return result.ok ? result.surfaceStem : "yaw";
    }
    function getSuppletiveYawiYuVariant() {
      const result = realizeCurrentSuppletiveStemFrame(getCurrentSuppletiveStemFrame("yawi", "yuVariant"), {
        paradigmId: "yawi",
        stemSlot: "yu-variant",
        surfaceStem: "yu"
      });
      return result.ok ? result.surfaceStem : "yu";
    }
    function getSuppletiveYawiCausativeActive() {
      const result = realizeCurrentSuppletiveStemFrame(getCurrentSuppletiveStemFrame("yawi", "causativeActive"), {
        paradigmId: "yawi",
        stemSlot: "causative-active",
        surfaceStem: "wika"
      });
      return result.ok ? result.surfaceStem : "wika";
    }
    function getSuppletiveYawiCausativeNonactive() {
      const result = realizeCurrentSuppletiveStemFrame(getCurrentSuppletiveStemFrame("yawi", "causativeNonactive"), {
        paradigmId: "yawi",
        stemSlot: "causative-nonactive",
        surfaceStem: "wikalu"
      });
      return result.ok ? result.surfaceStem : "wikalu";
    }
    function getSuppletiveWeyaRootPlusYaBase() {
      const result = realizeCurrentSuppletiveStemFrame(getCurrentSuppletiveStemFrame("weya", "rootPlusYaBase"), {
        paradigmId: "weya",
        stemSlot: "root-plus-ya-base",
        surfaceStem: "wey"
      });
      return result.ok ? result.surfaceStem : "wey";
    }
    function getSuppletiveWeyaCanonical() {
      const result = realizeCurrentSuppletiveStemFrame(getCurrentSuppletiveStemFrame("weya", "canonical"), {
        paradigmId: "weya",
        stemSlot: "canonical",
        surfaceStem: "weyya"
      });
      return result.ok ? result.surfaceStem : "weyya";
    }
    function buildSuppletiveKatiStemSet() {
      const variantsByClass = new Map();
      variantsByClass.set("A", [{
        base: dropFinalVowel(targetObject.SUPPLETIVE_KATI_CLASS_A),
        suffix: "ki"
      }]);
      const compoundPerfectTenses = ["perfecto", "pluscuamperfecto", "condicional-perfecto"];
      const tenseVariantsByClass = compoundPerfectTenses.reduce((acc, tenseKey) => {
        const perTenseVariants = new Map();
        perTenseVariants.set("A", [{
          base: targetObject.SUPPLETIVE_KATI_IMPERFECTIVE,
          suffix: ""
        }]);
        acc[tenseKey] = perTenseVariants;
        return acc;
      }, {});
      return {
        imperfective: {
          verb: targetObject.SUPPLETIVE_KATI_IMPERFECTIVE,
          analysisVerb: targetObject.SUPPLETIVE_KATI_IMPERFECTIVE
        },
        variantsByClass,
        tenseVariantsByClass,
        pretPluralSuffix: "et",
        pretPluralClasses: new Set(["A"]),
        classExclusionsByTense: targetObject.SUPPLETIVE_KATI_CLASS_EXCLUSIONS
      };
    }
    function buildSuppletiveYawiStemSetFromFrames(frameSet = null) {
      if (!frameSet || typeof frameSet !== "object") {
        return blockCurrentSuppletiveStem("current-suppletive-yawi-missing-stem-set-frame", {
          expectedParadigmId: "yawi"
        });
      }
      const imperfective = realizeCurrentSuppletiveStemFrame(frameSet.imperfective, {
        paradigmId: "yawi",
        stemSlot: "imperfective",
        surfaceStem: "ya"
      });
      if (!imperfective.ok) {
        return imperfective;
      }
      const pretVariantFrame = Array.isArray(frameSet.preteritVariants) ? frameSet.preteritVariants[0] : null;
      const preteritVariant = realizeCurrentSuppletivePreteritVariantFrame(pretVariantFrame, {
        paradigmId: "yawi",
        pretClass: "D",
        base: "yaj",
        suffix: "ki"
      });
      if (!preteritVariant.ok) {
        return preteritVariant;
      }
      const variantsByClass = new Map();
      variantsByClass.set("D", [preteritVariant.variant]);
      return {
        imperfective: {
          verb: imperfective.surfaceStem,
          analysisVerb: imperfective.surfaceStem
        },
        variantsByClass
      };
    }
    function buildSuppletiveYawiStemSet() {
      return buildSuppletiveYawiStemSetFromFrames({
        imperfective: getCurrentSuppletiveStemFrame("yawi", "imperfective"),
        preteritVariants: getCurrentSuppletivePreteritVariantFrames("yawi", "D")
      });
    }
    function buildSuppletiveWitziStemSet() {
      const imperfective = targetObject.SUPPLETIVE_WITZI_IMPERFECTIVE || "witzi";
      const base = targetObject.SUPPLETIVE_WITZI_PERFECTIVE || "witz";
      const variantsByClass = new Map();
      variantsByClass.set("A", [{
        base,
        suffix: ""
      }]);
      return {
        imperfective: {
          verb: imperfective,
          analysisVerb: imperfective
        },
        variantsByClass,
        pretPluralSuffix: "et",
        pretPluralClasses: new Set(["A"])
      };
    }
    function buildSuppletiveWeyaStemSet(parsedVerb = null) {
      const inputVerb = parsedVerb?.rawAnalysisVerb || parsedVerb?.analysisVerb || parsedVerb?.exactBaseVerb || parsedVerb?.verb || getSuppletiveWeyaCanonical();
      const imperfectiveVerb = targetObject.SUPPLETIVE_WEYA_FORMS.has(inputVerb) ? inputVerb : getSuppletiveWeyaCanonical();
      const rootBase = getSuppletiveWeyaRootPlusYaBase();
      const canonical = getSuppletiveWeyaCanonical();
      const preserveCodaY = {
        preserveCodaY: true
      };
      const variantsByClass = new Map();
      variantsByClass.set("A", [{
        base: rootBase,
        suffix: "ki",
        surfaceRuleMeta: preserveCodaY
      }, {
        base: canonical,
        suffix: "k",
        surfaceRuleMeta: preserveCodaY
      }]);
      return {
        imperfective: {
          verb: imperfectiveVerb,
          analysisVerb: imperfectiveVerb
        },
        variantsByClass,
        surfaceRuleMeta: preserveCodaY
      };
    }
    function getSuppletiveStemPath(parsedVerb) {
      if (!parsedVerb) {
        return null;
      }
      const resolveEntryValue = value => {
        if (!value) {
          return null;
        }
        if (typeof value === "function") {
          return value(parsedVerb);
        }
        return value;
      };
      for (const entry of targetObject.SUPPLETIVE_STEM_PATHS) {
        if (entry.match(parsedVerb)) {
          if (isIntransitiveOnlySuppletiveId(entry.id) && !isSuppletiveIntransitiveOnlyContext(parsedVerb)) {
            continue;
          }
          return {
            path: "suppletive",
            id: entry.id,
            stemSet: resolveEntryValue(entry.active),
            nonactiveOptions: resolveEntryValue(entry.nonactive),
            activeTenses: entry.activeTenses || null,
            tenseSuffixOverrides: entry.tenseSuffixOverrides || null,
            verbOverrides: entry.verbOverrides || null,
            nonactiveTenses: entry.nonactiveTenses || null
          };
        }
      }
      return null;
    }
    function getSuppletiveStemSet(parsedVerb) {
      return getSuppletiveStemPath(parsedVerb)?.stemSet || null;
    }
    function getSuppletiveNonactiveOptions(parsedVerb) {
      const path = getSuppletiveStemPath(parsedVerb);
      const options = path?.nonactiveOptions || null;
      return options && options.length ? options : null;
    }
    function attachIrregularsGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "irregular-vnc-metadata",
        routeFamily: "irregular-vnc",
        structuralSource: "Andrews Lesson 11",
        andrewsRefs: ["Andrews Lesson 11.1-11.6"],
        ...options
      });
    }
    function cloneIrregularsLessonRecord(value) {
      if (Array.isArray(value)) {
        return value.map(entry => cloneIrregularsLessonRecord(entry));
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneIrregularsLessonRecord(entry)]));
    }
    function getIrregularsLesson11NatureFrame() {
      return cloneIrregularsLessonRecord(IRREGULARS_LESSON11_NATURE_FRAME);
    }
    function getIrregularsLesson11PerfectiveStemFrame() {
      return cloneIrregularsLessonRecord(IRREGULARS_LESSON11_PERFECTIVE_STEM_FRAME);
    }
    function getIrregularsLesson11FormMeaningAlignmentFrame() {
      return cloneIrregularsLessonRecord(IRREGULARS_LESSON11_FORM_MEANING_ALIGNMENT_FRAME);
    }
    function getIrregularsLesson11SuppletionFrame() {
      return cloneIrregularsLessonRecord(IRREGULARS_LESSON11_SUPPLETION_FRAME);
    }
    function getIrregularsLesson11IdiomFrame() {
      return cloneIrregularsLessonRecord(IRREGULARS_LESSON11_IDIOM_FRAME);
    }
    function getIrregularsLesson11SubsectionInventory() {
      return IRREGULARS_LESSON11_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        pdfRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(IRREGULARS_LESSON11_VALIDATION_REFS),
        generationPolicy: "diagnostico; no importa superficies clasicas ni genera CNV irregulares sin fuente Andrews concreta y puente ortografico"
      }));
    }
    function getIrregularsLesson11RemainingGaps() {
      return Array.from(IRREGULARS_LESSON11_REMAINING_GAPS);
    }
    function buildIrregularsLesson11PursuitFrame() {
      const inventory = getIrregularsLesson11SubsectionInventory();
      const perfectiveStemFrame = getIrregularsLesson11PerfectiveStemFrame();
      const formMeaningAlignmentFrame = getIrregularsLesson11FormMeaningAlignmentFrame();
      const suppletionFrame = getIrregularsLesson11SuppletionFrame();
      const frame = {
        kind: "lesson-11-pursuit-frame",
        mainTarget: "fully Andrews-directed Nawat Conjugador",
        stepNumber: 11,
        aimStatus: "shooting",
        pdfRefs: Array.from(IRREGULARS_LESSON11_PDF_REFS),
        plannedArrows: [{
          id: "lesson-11-irregular-vnc-audit",
          type: "metadata-diagnostic-test",
          aim: "Audit Andrews Lesson 11.1-11.6 against irregular VNC nature, perfective-stem irregularity, tense-form meaning dislocation, suppletion, and idiom boundaries.",
          andrewsRefs: Array.from(IRREGULARS_LESSON11_PDF_REFS),
          expectedFeedbackRefs: Array.from(IRREGULARS_LESSON11_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-11-irregular-vnc-audit",
          result: "hit",
          correction: "Lesson 11 now carries subsection PDF refs, Spanish directives, irregular perfective-stem taxonomy, tense-form/meaning dislocation metadata, suppletion frames, idiom boundaries, and explicit blockers against unlicensed Classical-to-Nawat irregular generation.",
          andrewsRefs: Array.from(IRREGULARS_LESSON11_PDF_REFS),
          feedbackRefs: Array.from(IRREGULARS_LESSON11_VALIDATION_REFS)
        }],
        subsectionInventory: inventory,
        natureFrame: getIrregularsLesson11NatureFrame(),
        perfectiveStemFrame,
        formMeaningAlignmentFrame,
        suppletionFrame,
        idiomFrame: getIrregularsLesson11IdiomFrame(),
        hitCount: 1,
        missCount: 0,
        remainingGaps: getIrregularsLesson11RemainingGaps(),
        closestPass: false,
        generationAllowed: false
      };
      return attachIrregularsGrammarContract(frame, {
        metadataKind: "lesson-11-pursuit-frame",
        routeStage: "audit-lesson-11",
        sourceInput: "Andrews Lesson 11.1-11.6",
        supported: false,
        diagnostics: ["lesson-11-irregular-vnc-taxonomy-partial"],
        stemFrame: perfectiveStemFrame,
        inflectionFrame: formMeaningAlignmentFrame,
        nuclearClauseFrame: {
          clauseKind: "verbal-nuclear-clause",
          irregularVncStatus: "partial",
          generationRequiresAndrewsSourceGate: true
        },
        routeContract: {
          metadataKind: "lesson-11-pursuit-frame",
          generationAllowed: false,
          closestPass: false
        },
        targetContract: {
          metadataKind: "lesson-11-pursuit-frame",
          generationAllowed: false,
          closestPass: false
        },
        astFrame: suppletionFrame
      });
    }

    const api = {};
    Object.defineProperty(api, "IRREGULARS_LESSON11_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return IRREGULARS_LESSON11_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "IRREGULARS_LESSON11_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return IRREGULARS_LESSON11_PDF_REFS; },
    });
    Object.defineProperty(api, "IRREGULARS_LESSON11_NATURE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return IRREGULARS_LESSON11_NATURE_FRAME; },
    });
    Object.defineProperty(api, "IRREGULARS_LESSON11_PERFECTIVE_STEM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return IRREGULARS_LESSON11_PERFECTIVE_STEM_FRAME; },
    });
    Object.defineProperty(api, "IRREGULARS_LESSON11_FORM_MEANING_ALIGNMENT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return IRREGULARS_LESSON11_FORM_MEANING_ALIGNMENT_FRAME; },
    });
    Object.defineProperty(api, "IRREGULARS_LESSON11_SUPPLETION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return IRREGULARS_LESSON11_SUPPLETION_FRAME; },
    });
    Object.defineProperty(api, "IRREGULARS_LESSON11_IDIOM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return IRREGULARS_LESSON11_IDIOM_FRAME; },
    });
    Object.defineProperty(api, "IRREGULARS_LESSON11_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return IRREGULARS_LESSON11_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "IRREGULARS_LESSON11_REMAINING_GAPS", {
        configurable: true,
        enumerable: true,
        get() { return IRREGULARS_LESSON11_REMAINING_GAPS; },
    });
    Object.defineProperty(api, "CURRENT_SUPPLETIVE_STEM_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() { return CURRENT_SUPPLETIVE_STEM_FRAME_KIND; },
    });
    Object.defineProperty(api, "CURRENT_SUPPLETIVE_PRETERIT_VARIANT_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() { return CURRENT_SUPPLETIVE_PRETERIT_VARIANT_FRAME_KIND; },
    });
    Object.defineProperty(api, "CURRENT_SUPPLETIVE_STEM_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return CURRENT_SUPPLETIVE_STEM_INVENTORY; },
    });
    api.isIntransitiveOnlySuppletiveId = isIntransitiveOnlySuppletiveId;
    api.isSuppletiveIntransitiveOnlyContext = isSuppletiveIntransitiveOnlyContext;
    api.dropFinalVowel = dropFinalVowel;
    api.buildCurrentSuppletiveStemDiagnostic = buildCurrentSuppletiveStemDiagnostic;
    api.blockCurrentSuppletiveStem = blockCurrentSuppletiveStem;
    api.getCurrentSuppletiveParadigmFrame = getCurrentSuppletiveParadigmFrame;
    api.getCurrentSuppletiveStemFrame = getCurrentSuppletiveStemFrame;
    api.getCurrentSuppletivePreteritVariantFrames = getCurrentSuppletivePreteritVariantFrames;
    api.realizeCurrentSuppletiveStemFrame = realizeCurrentSuppletiveStemFrame;
    api.realizeCurrentSuppletivePreteritVariantFrame = realizeCurrentSuppletivePreteritVariantFrame;
    api.getSuppletiveYawiCanonical = getSuppletiveYawiCanonical;
    api.getSuppletiveYawiImperfective = getSuppletiveYawiImperfective;
    api.getSuppletiveYawiShort = getSuppletiveYawiShort;
    api.getSuppletiveYawiYuVariant = getSuppletiveYawiYuVariant;
    api.getSuppletiveYawiCausativeActive = getSuppletiveYawiCausativeActive;
    api.getSuppletiveYawiCausativeNonactive = getSuppletiveYawiCausativeNonactive;
    api.getSuppletiveWeyaRootPlusYaBase = getSuppletiveWeyaRootPlusYaBase;
    api.getSuppletiveWeyaCanonical = getSuppletiveWeyaCanonical;
    api.buildSuppletiveKatiStemSet = buildSuppletiveKatiStemSet;
    api.buildSuppletiveYawiStemSetFromFrames = buildSuppletiveYawiStemSetFromFrames;
    api.buildSuppletiveYawiStemSet = buildSuppletiveYawiStemSet;
    api.buildSuppletiveWitziStemSet = buildSuppletiveWitziStemSet;
    api.buildSuppletiveWeyaStemSet = buildSuppletiveWeyaStemSet;
    api.getSuppletiveStemPath = getSuppletiveStemPath;
    api.getSuppletiveStemSet = getSuppletiveStemSet;
    api.getSuppletiveNonactiveOptions = getSuppletiveNonactiveOptions;
    api.attachIrregularsGrammarContract = attachIrregularsGrammarContract;
    api.cloneIrregularsLessonRecord = cloneIrregularsLessonRecord;
    api.getIrregularsLesson11NatureFrame = getIrregularsLesson11NatureFrame;
    api.getIrregularsLesson11PerfectiveStemFrame = getIrregularsLesson11PerfectiveStemFrame;
    api.getIrregularsLesson11FormMeaningAlignmentFrame = getIrregularsLesson11FormMeaningAlignmentFrame;
    api.getIrregularsLesson11SuppletionFrame = getIrregularsLesson11SuppletionFrame;
    api.getIrregularsLesson11IdiomFrame = getIrregularsLesson11IdiomFrame;
    api.getIrregularsLesson11SubsectionInventory = getIrregularsLesson11SubsectionInventory;
    api.getIrregularsLesson11RemainingGaps = getIrregularsLesson11RemainingGaps;
    api.buildIrregularsLesson11PursuitFrame = buildIrregularsLesson11PursuitFrame;
    return api;
}

export function installIrregularGlobals(targetObject = globalThis) {
    const api = createIrregularsApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
