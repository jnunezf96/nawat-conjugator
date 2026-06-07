// Native wrapper generated from src/core/nnc/nnc.js.

export function createNncGlobals(targetObject = globalThis) {
    const ORDINARY_NNC_STATE = Object.freeze({
      absolutive: "absolutive",
      possessive: "possessive"
    });
    const ORDINARY_NNC_CLAUSE_KIND = "nominal-nuclear-clause";
    const ORDINARY_NNC_PLURAL_TYPE = Object.freeze({
      auto: "auto",
      count: "count",
      distributive: "distributive"
    });
    const ORDINARY_NNC_POSSESSION_KIND = Object.freeze({
      ordinary: "ordinary",
      organic: "organic"
    });
    const ORDINARY_NNC_DIAGNOSTIC_IDS = Object.freeze({
      unsupportedStem: "ordinary-nnc-unsupported-stem",
      unsupportedState: "ordinary-nnc-unsupported-state",
      unsupportedPossessiveState: "ordinary-nnc-unsupported-possessive-state",
      unsupportedPossessor: "ordinary-nnc-unsupported-possessor",
      unsupportedNumber: "ordinary-nnc-unsupported-number",
      unsupportedPluralType: "ordinary-nnc-unsupported-plural-type",
      unsupportedSubject: "ordinary-nnc-unsupported-subject",
      nounClassMismatch: "ordinary-nnc-noun-class-mismatch",
      classStemIncompatible: "ordinary-nnc-class-stem-incompatible",
      organicPossessionRequiresPossessiveState: "ordinary-nnc-organic-possession-requires-possessive-state",
      organicPossessionRequiresPossessor: "ordinary-nnc-organic-possession-requires-possessor"
    });
    function normalizeOrdinaryNncText(value = "") {
      return String(value || "").trim().toLowerCase();
    }
    function normalizeOrdinaryNncNumber(value = "") {
      const normalized = normalizeOrdinaryNncText(value || "singular");
      if (normalized === "sg") {
        return "singular";
      }
      if (normalized === "pl") {
        return "plural";
      }
      return normalized || "singular";
    }
    function normalizeOrdinaryNncPluralType(value = "") {
      const normalized = normalizeOrdinaryNncText(value || ORDINARY_NNC_PLURAL_TYPE.auto);
      if (normalized === "met" || normalized === "count" || normalized === "ordinary") {
        return ORDINARY_NNC_PLURAL_TYPE.count;
      }
      if (normalized === "reduplicative" || normalized === "reduplicated" || normalized === "distributive" || normalized === "distr") {
        return ORDINARY_NNC_PLURAL_TYPE.distributive;
      }
      return ORDINARY_NNC_PLURAL_TYPE.auto;
    }
    function normalizeOrdinaryNncPossessionKind(value = "") {
      const normalized = normalizeOrdinaryNncText(value);
      if (!normalized || normalized === "ordinary" || normalized === "optional") {
        return ORDINARY_NNC_POSSESSION_KIND.ordinary;
      }
      if (normalized === "organic" || normalized === "integral" || normalized === "inalienable" || normalized === "natural" || normalized === "organic-possession" || normalized === "natural-possession") {
        return ORDINARY_NNC_POSSESSION_KIND.organic;
      }
      return normalized;
    }
    function isOrdinaryNncOrganicPossessionKind(value = "") {
      return normalizeOrdinaryNncPossessionKind(value) === ORDINARY_NNC_POSSESSION_KIND.organic;
    }
    function normalizeOrdinaryNncAnimacy(value = "", fallback = "inanimate") {
      const normalized = normalizeOrdinaryNncText(value);
      if (normalized === "animate" || normalized === "animado") {
        return "animate";
      }
      if (normalized === "inanimate" || normalized === "nonanimate" || normalized === "no-animado" || normalized === "noanimado") {
        return "inanimate";
      }
      return fallback;
    }
    function getEffectiveOrdinaryNncPluralType(pluralType = ORDINARY_NNC_PLURAL_TYPE.auto, animacy = "") {
      const normalized = normalizeOrdinaryNncPluralType(pluralType);
      if (normalized !== ORDINARY_NNC_PLURAL_TYPE.auto) {
        return normalized;
      }
      return animacy === "animate" ? ORDINARY_NNC_PLURAL_TYPE.count : ORDINARY_NNC_PLURAL_TYPE.distributive;
    }
    function normalizeOrdinaryNncAgreementNumber(value = "") {
      const normalized = normalizeOrdinaryNncText(value);
      return normalized === "sg" ? "singular" : normalized === "pl" ? "plural" : normalized;
    }
    function normalizeOrdinaryNncState(value = "", possessor = null) {
      const normalized = normalizeOrdinaryNncText(value);
      if (!normalized) {
        return possessor?.prefix ? ORDINARY_NNC_STATE.possessive : ORDINARY_NNC_STATE.absolutive;
      }
      if (normalized === "absolutive" || normalized === "absolutivo") {
        return ORDINARY_NNC_STATE.absolutive;
      }
      if (normalized === "possessive" || normalized === "possessed" || normalized === "posesivo") {
        return ORDINARY_NNC_STATE.possessive;
      }
      return normalized;
    }
    function getOrdinaryNncFixtureEntries() {
      return typeof targetObject.ORDINARY_NNC_FIXTURES !== "undefined" && Array.isArray(targetObject.ORDINARY_NNC_FIXTURES) ? targetObject.ORDINARY_NNC_FIXTURES : [];
    }
    function getOrdinaryNncPossessiveEntries() {
      return typeof targetObject.POSSESSIVE_PREFIXES !== "undefined" && Array.isArray(targetObject.POSSESSIVE_PREFIXES) ? targetObject.POSSESSIVE_PREFIXES : [];
    }
    function getOrdinaryNncSubjectEntries() {
      return typeof targetObject.SUBJECT_COMBINATIONS !== "undefined" && Array.isArray(targetObject.SUBJECT_COMBINATIONS) ? targetObject.SUBJECT_COMBINATIONS : [];
    }
    function buildOrdinaryNncDiagnostic(id = "", message = "", severity = "unsupported") {
      return {
        id,
        severity,
        message
      };
    }
    function parseOrdinaryNncPersonSubKey(personSubKey = "") {
      const match = String(personSubKey || "").match(/^([123])(?:s|sg|p|pl)$/i);
      if (!match) {
        return {
          person: null,
          number: ""
        };
      }
      return {
        person: Number(match[1]),
        number: /p/i.test(personSubKey) ? "plural" : "singular"
      };
    }
    function resolveOrdinaryNncSubject(subject = null) {
      const source = subject && typeof subject === "object" ? subject : {};
      const requestedId = typeof subject === "string" ? subject : source.id || source.personSubKey || "";
      const subjectPrefix = typeof source.subjectPrefix === "string" ? source.subjectPrefix : typeof source.prefix === "string" ? source.prefix : "";
      const subjectSuffix = typeof source.subjectSuffix === "string" ? source.subjectSuffix : typeof source.suffix === "string" ? source.suffix : "";
      const entries = getOrdinaryNncSubjectEntries();
      const entry = entries.find(candidate => requestedId && (candidate.id === requestedId || candidate.personSubKey === requestedId) || String(candidate.subjectPrefix || "") === subjectPrefix && String(candidate.subjectSuffix || "") === subjectSuffix) || entries.find(candidate => String(candidate.subjectPrefix || "") === "" && String(candidate.subjectSuffix || "") === "");
      const prefix = entry ? String(entry.subjectPrefix || "") : subjectPrefix;
      const suffix = entry ? String(entry.subjectSuffix || "") : subjectSuffix;
      const agreementInfo = typeof targetObject.getSubjectPersonInfo === "function" ? targetObject.getSubjectPersonInfo(prefix, suffix) : null;
      const parsed = parseOrdinaryNncPersonSubKey(entry?.personSubKey || "");
      return {
        subjectPrefix: prefix,
        subjectSuffix: suffix,
        person: agreementInfo?.person || parsed.person || 3,
        number: normalizeOrdinaryNncAgreementNumber(agreementInfo?.number || parsed.number || "singular"),
        personSubKey: entry?.personSubKey || `${agreementInfo?.person || parsed.person || 3}${normalizeOrdinaryNncAgreementNumber(agreementInfo?.number || parsed.number || "singular") === "plural" ? "pl" : "sg"}`
      };
    }
    function hasExplicitOrdinaryNncSubject(subject = null) {
      if (typeof subject === "string") {
        return String(subject || "").trim() !== "";
      }
      if (!subject || typeof subject !== "object") {
        return false;
      }
      return ["id", "personSubKey", "subjectPrefix", "prefix", "subjectSuffix", "suffix"].some(key => Object.prototype.hasOwnProperty.call(subject, key));
    }
    function resolveOrdinaryNncClauseSubject(subject = null, number = "singular", animacy = "") {
      if (!hasExplicitOrdinaryNncSubject(subject) && animacy === "animate" && number === "plural") {
        return resolveOrdinaryNncSubject({
          personSubKey: "3pl"
        });
      }
      return resolveOrdinaryNncSubject(subject);
    }
    function resolveOrdinaryNncPossessor(possessor = null, possessivePrefix = "") {
      const raw = possessor && typeof possessor === "object" ? possessor.prefix || possessor.value || possessor.id || "" : possessor || possessivePrefix || "";
      const normalized = String(raw || "").trim();
      if (!normalized || normalized === "none") {
        return null;
      }
      const entry = getOrdinaryNncPossessiveEntries().find(candidate => candidate.value === normalized || candidate.id === normalized || candidate.personSubKey === normalized);
      if (!entry) {
        return {
          id: "",
          prefix: normalized,
          personSubKey: "",
          number: "",
          unsupported: true
        };
      }
      return {
        id: entry.id || "",
        prefix: entry.value || "",
        personSubKey: entry.personSubKey || "",
        number: entry.number || ""
      };
    }
    function findOrdinaryNncFixture(stem = "") {
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
      return getOrdinaryNncFixtureEntries().find(fixture => {
        const keys = [fixture.id, fixture.stem, fixture.lemma, ...(Array.isArray(fixture.aliases) ? fixture.aliases : [])].map(normalizeOrdinaryNncText).filter(Boolean);
        return keys.includes(normalizedStem);
      }) || null;
    }
    function isOrdinaryNncVowelFinalStem(stem = "") {
      return /[aeiou]$/i.test(normalizeOrdinaryNncText(stem));
    }
    function getOrdinaryNncStemShapeLabel(stem = "") {
      return isOrdinaryNncVowelFinalStem(stem) ? "vowel-final" : "consonant-final";
    }
    function getOrdinaryNncClassStemCompatibility(nounClass = "", stem = "") {
      const normalizedClass = normalizeOrdinaryNncSubjectConnectorClass(nounClass) || "zero";
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
      if (!normalizedStem || normalizedClass === "zero") {
        return {
          compatible: true,
          nounClass: normalizedClass,
          stem: normalizedStem,
          requiredStemShape: "consonant-or-vowel-final",
          actualStemShape: normalizedStem ? getOrdinaryNncStemShapeLabel(normalizedStem) : ""
        };
      }
      const vowelFinal = isOrdinaryNncVowelFinalStem(normalizedStem);
      const requiredStemShape = normalizedClass === "t" ? "vowel-final" : "consonant-final";
      const compatible = normalizedClass === "t" ? vowelFinal : !vowelFinal;
      return {
        compatible,
        nounClass: normalizedClass,
        stem: normalizedStem,
        requiredStemShape,
        actualStemShape: getOrdinaryNncStemShapeLabel(normalizedStem)
      };
    }
    function buildOrdinaryNncClassStemCompatibilityDiagnostic(compatibility = {}) {
      return buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.classStemIncompatible, `Nominal nuclear clause class "${compatibility.nounClass || ""}" requires a ${compatibility.requiredStemShape || "compatible"} stem; "${compatibility.stem || ""}" is ${compatibility.actualStemShape || "not compatible"}.`);
    }
    function buildOrdinaryNncOrganicPossessionStem(stem = "") {
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
      if (!normalizedStem) {
        return "";
      }
      return normalizedStem.endsWith("yu") ? normalizedStem : `${normalizedStem}yu`;
    }
    function buildOrdinaryNncOrganicPossessionFrame({
      sourceStem = "",
      organicStem = "",
      possessor = null
    } = {}) {
      const resolvedSourceStem = normalizeOrdinaryNncText(sourceStem).replace(/[()]/g, "");
      const resolvedOrganicStem = normalizeOrdinaryNncText(organicStem).replace(/[()]/g, "") || buildOrdinaryNncOrganicPossessionStem(resolvedSourceStem);
      return {
        version: 1,
        outputKind: "ordinary-nnc-organic-possession",
        lessonRef: "Andrews 39.3.4",
        stateCase: "organic-possession",
        possessionKind: ORDINARY_NNC_POSSESSION_KIND.organic,
        sourceStem: resolvedSourceStem,
        matrixStem: "yu",
        classicalAnalogue: "(-yo)-tl",
        nawatMatrix: "-yu",
        predicateStem: resolvedOrganicStem,
        requiredState: ORDINARY_NNC_STATE.possessive,
        possessorPrefix: String(possessor?.prefix || ""),
        semanticRelation: "integral-part-to-whole",
        spellingAuthority: "Nawat/Pipil orthography",
        grammarAuthority: "Andrews PDF"
      };
    }
    function buildOrdinaryNncSurfaceChainText({
      subjectPrefix = "",
      possessivePrefix = "",
      core = ""
    } = {}) {
      const normalizedCore = String(core || "");
      if (!normalizedCore) {
        return "";
      }
      if (typeof targetObject.buildOutputPrefixedChain === "function") {
        return targetObject.buildOutputPrefixedChain({
          subjectPrefix: String(subjectPrefix || ""),
          possessivePrefix: String(possessivePrefix || ""),
          objectPrefix: "",
          verb: normalizedCore
        });
      }
      return `${subjectPrefix || ""}${possessivePrefix || ""}${normalizedCore}`;
    }
    function isOrdinaryNncPluralPossessor(possessor = null) {
      const prefix = String(possessor?.prefix || possessor || "");
      return possessor?.number === "plural" || ["tu", "anmu", "in"].includes(prefix);
    }
    function buildOrdinaryNncOpenStemPossessiveSurface(stem = "", possessivePrefix = "", animacy = "") {
      const prefix = String(possessivePrefix || "");
      const resolvedPossessor = resolveOrdinaryNncPossessor(prefix);
      const isAnimate = normalizeOrdinaryNncAnimacy(animacy) === "animate";
      const usesPluralPossessorShape = isAnimate && isOrdinaryNncPluralPossessor(resolvedPossessor);
      const core = isAnimate && prefix === "in" ? buildOrdinaryNncReduplicatedSurface(stem) : stem;
      return buildOrdinaryNncSurfaceChainText({
        possessivePrefix: prefix,
        core: `${core}${usesPluralPossessorShape ? "wan" : ""}`
      });
    }
    function buildOrdinaryNncOpenStemFixture(stem = "", {
      nounClass = "",
      animacy = ""
    } = {}) {
      const normalizedClass = normalizeOrdinaryNncSubjectConnectorClass(nounClass);
      const normalizedStem = stripOrdinaryNncSubjectConnectorFromInput(stem, normalizedClass);
      if (!normalizedStem) {
        return null;
      }
      const absolutiveSurface = `${normalizedStem}${getOrdinaryNncSubjectConnectorSurface(normalizedClass)}`;
      const singularPossessives = {};
      getOrdinaryNncPossessorInventory().forEach(prefix => {
        singularPossessives[prefix] = {
          surfaceForms: [buildOrdinaryNncOpenStemPossessiveSurface(normalizedStem, prefix, animacy)]
        };
      });
      const states = {
        [ORDINARY_NNC_STATE.absolutive]: {
          numberForms: {
            singular: {
              surfaceForms: [absolutiveSurface || normalizedStem]
            }
          }
        }
      };
      if (Object.keys(singularPossessives).length) {
        states[ORDINARY_NNC_STATE.possessive] = {
          numberFormsByPossessor: {
            singular: singularPossessives
          }
        };
      }
      return {
        id: `open:${normalizedStem}`,
        stem: normalizedStem,
        lemma: absolutiveSurface || normalizedStem,
        nounClass: normalizedClass || "zero",
        animacy: normalizeOrdinaryNncAnimacy(animacy),
        openStem: true,
        sourceRefs: [],
        states
      };
    }
    function getOrdinaryNncSurfaceFormsFromCell(cell = null, {
      pluralType = ""
    } = {}) {
      if (Array.isArray(cell)) {
        return cell.filter(Boolean);
      }
      if (cell && typeof cell === "object" && pluralType && cell.formsByPluralType) {
        const byPluralType = cell.formsByPluralType?.[normalizeOrdinaryNncPluralType(pluralType)];
        const pluralTypeForms = getOrdinaryNncSurfaceFormsFromCell(byPluralType);
        if (pluralTypeForms.length) {
          return pluralTypeForms;
        }
      }
      if (cell && typeof cell === "object" && Array.isArray(cell.surfaceForms)) {
        return cell.surfaceForms.filter(Boolean);
      }
      return [];
    }
    function getOrdinaryNncFixtureStateForms(fixture = null, state = "", {
      number = "singular",
      possessor = null,
      pluralType = ""
    } = {}) {
      const stateData = fixture?.states?.[state] || null;
      if (!stateData) {
        return [];
      }
      if (state === ORDINARY_NNC_STATE.possessive) {
        const possessorPrefix = possessor?.prefix || "";
        const byNumber = stateData.numberFormsByPossessor?.[number]?.[possessorPrefix];
        const formsByNumber = getOrdinaryNncSurfaceFormsFromCell(byNumber, {
          pluralType
        });
        if (formsByNumber.length) {
          return formsByNumber;
        }
        const byPossessor = stateData.surfaceByPossessor?.[possessorPrefix];
        return getOrdinaryNncSurfaceFormsFromCell(byPossessor, {
          pluralType
        });
      }
      const byNumber = stateData.numberForms?.[number];
      const formsByNumber = getOrdinaryNncSurfaceFormsFromCell(byNumber, {
        pluralType
      });
      if (formsByNumber.length) {
        return formsByNumber;
      }
      return getOrdinaryNncSurfaceFormsFromCell(stateData, {
        pluralType
      });
    }
    function isOrdinaryNncThirdSingularSubject(subject = null) {
      return !subject || String(subject.subjectPrefix || "") === "" && String(subject.subjectSuffix || "") === "";
    }
    function buildOrdinaryNncReduplicatedSurface(surface = "") {
      const normalized = String(surface || "").trim();
      if (!normalized) {
        return "";
      }
      const syllables = typeof targetObject.splitVerbSyllables === "function" ? targetObject.splitVerbSyllables(normalized) : [];
      const first = syllables?.[0] || null;
      if (!first || !first.nucleus) {
        return normalized;
      }
      return `${first.onset || ""}${first.nucleus || ""}j${normalized}`;
    }
    function applyOrdinaryNncSubjectPrefix(surface = "", subject = null, state = ORDINARY_NNC_STATE.absolutive, animacy = "") {
      if (animacy !== "animate") {
        return surface;
      }
      return buildOrdinaryNncSurfaceChainText({
        subjectPrefix: subject?.subjectPrefix || "",
        core: surface
      });
    }
    function stripOrdinaryNncPossessiveSurfacePrefix(surface = "", possessor = null) {
      const normalizedSurface = String(surface || "").trim();
      const prefix = String(possessor?.prefix || "").trim();
      if (!normalizedSurface || !prefix) {
        return normalizedSurface;
      }
      const candidates = prefix === "in" ? ["inh", "in"] : [prefix];
      const matched = candidates.sort((a, b) => b.length - a.length).find(candidate => normalizedSurface.startsWith(candidate) && normalizedSurface.length > candidate.length);
      return matched ? normalizedSurface.slice(matched.length) : normalizedSurface;
    }
    function buildOrdinaryNncPossessiveDistributiveSurface(surface = "", possessor = null) {
      const core = stripOrdinaryNncPossessiveSurfacePrefix(surface, possessor);
      const distributiveCore = buildOrdinaryNncReduplicatedSurface(core);
      return buildOrdinaryNncSurfaceChainText({
        possessivePrefix: possessor?.prefix || "",
        core: distributiveCore
      }) || buildOrdinaryNncReduplicatedSurface(surface);
    }
    function buildOrdinaryNncAnimatePossessivePluralForms(singularForms = [], {
      possessor = null,
      pluralType = ORDINARY_NNC_PLURAL_TYPE.auto
    } = {}) {
      const effectivePluralType = normalizeOrdinaryNncPluralType(pluralType);
      if (String(possessor?.prefix || "") === "in") {
        return singularForms.filter(Boolean);
      }
      if (!isOrdinaryNncPluralPossessor(possessor)) {
        return singularForms.filter(Boolean);
      }
      if (effectivePluralType !== ORDINARY_NNC_PLURAL_TYPE.distributive) {
        return singularForms.filter(Boolean);
      }
      return singularForms.map(form => buildOrdinaryNncPossessiveDistributiveSurface(form, possessor)).filter(Boolean);
    }
    function buildOrdinaryNncDerivedPluralForms(singularForms = [], {
      state = ORDINARY_NNC_STATE.absolutive,
      subject = null,
      possessor = null,
      animacy = "",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.auto
    } = {}) {
      const effectivePluralType = getEffectiveOrdinaryNncPluralType(pluralType, animacy);
      if (state === ORDINARY_NNC_STATE.possessive && animacy === "animate") {
        return {
          pluralType: effectivePluralType,
          forms: buildOrdinaryNncAnimatePossessivePluralForms(singularForms, {
            possessor,
            pluralType: effectivePluralType
          }).map(form => applyOrdinaryNncSubjectPrefix(form, subject, state, animacy))
        };
      }
      if (effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count) {
        if (animacy !== "animate") {
          return {
            forms: [],
            pluralType: effectivePluralType
          };
        }
        return {
          pluralType: effectivePluralType,
          forms: singularForms.map(form => `${form}met`).map(form => applyOrdinaryNncSubjectPrefix(form, subject, state, animacy)).filter(Boolean)
        };
      }
      if (state !== ORDINARY_NNC_STATE.absolutive && state !== ORDINARY_NNC_STATE.possessive) {
        return {
          forms: [],
          pluralType: effectivePluralType
        };
      }
      return {
        pluralType: effectivePluralType,
        forms: singularForms.map(form => state === ORDINARY_NNC_STATE.possessive ? buildOrdinaryNncPossessiveDistributiveSurface(form, possessor) : buildOrdinaryNncReduplicatedSurface(form)).map(form => animacy === "animate" ? `${form}met` : form).map(form => applyOrdinaryNncSubjectPrefix(form, subject, state, animacy)).filter(Boolean)
      };
    }
    function normalizeOrdinaryNncSubjectConnectorClass(nounClass = "") {
      const normalized = normalizeOrdinaryNncText(nounClass);
      if (normalized === "0" || normalized === "ø" || normalized === "zero") {
        return "zero";
      }
      return ["t", "ti", "in"].includes(normalized) ? normalized : "";
    }
    function formatOrdinaryNncSubjectConnectorClass(nounClass = "") {
      const normalized = normalizeOrdinaryNncSubjectConnectorClass(nounClass);
      return normalized === "zero" ? "Ø" : normalized;
    }
    function getOrdinaryNncSubjectConnectorSurface(nounClass = "") {
      const normalized = normalizeOrdinaryNncSubjectConnectorClass(nounClass);
      if (normalized === "zero") {
        return "";
      }
      return ["t", "ti", "in"].includes(normalized) ? normalized : "";
    }
    function parseOrdinaryNncPredicateFormulaInput(value = "") {
      const raw = String(value || "").trim().toLowerCase();
      const match = raw.match(/^\(\s*([^()]+?)\s*\)\s*(ti|in|t|0|ø|zero)?$/i);
      if (!match) {
        return null;
      }
      const stem = normalizeOrdinaryNncText(match[1]).replace(/[()]/g, "");
      if (!stem) {
        return null;
      }
      const nounClass = normalizeOrdinaryNncSubjectConnectorClass(match[2] || "zero") || "zero";
      return {
        stem,
        nounClass,
        connectorSurface: getOrdinaryNncSubjectConnectorSurface(nounClass),
        predicateFormula: buildOrdinaryNncPredicateFormula({
          stem,
          nounClass
        })
      };
    }
    function stripOrdinaryNncSubjectConnectorFromInput(stem = "", nounClass = "") {
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
      const connector = getOrdinaryNncSubjectConnectorSurface(nounClass);
      if (!normalizedStem || !connector || normalizedStem.length <= connector.length) {
        return normalizedStem;
      }
      return normalizedStem.endsWith(connector) ? normalizedStem.slice(0, -connector.length) : normalizedStem;
    }
    function buildOrdinaryNncPredicateFormula({
      stem = "",
      nounClass = ""
    } = {}) {
      const normalizedStem = normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
      if (!normalizedStem) {
        return "";
      }
      const connector = getOrdinaryNncSubjectConnectorSurface(nounClass);
      return `(${normalizedStem})${connector}`;
    }
    function buildOrdinaryNncSubjectNumberConnector({
      nounClass = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = ""
    } = {}) {
      const connectorClass = normalizeOrdinaryNncSubjectConnectorClass(nounClass);
      const surface = getOrdinaryNncSubjectConnectorSurface(connectorClass);
      return {
        role: "subject-number-connector",
        slot: "subject.num1-num2",
        belongsTo: "subject",
        nounStemClass: connectorClass,
        classLabel: formatOrdinaryNncSubjectConnectorClass(connectorClass),
        surface,
        displaySurface: surface || "Ø",
        predicateState: state,
        referenceNumber: number,
        pluralType: pluralType || "",
        notNounSuffix: true,
        notStatePosition: true
      };
    }
    function getOrdinaryNncSubjectAffixLabel(subject = null) {
      const prefix = String(subject?.subjectPrefix || "");
      const suffix = String(subject?.subjectSuffix || "");
      return `${prefix || "Ø"}...${suffix || "Ø"}`;
    }
    function buildOrdinaryNncFormulaSlots({
      stem = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      subject = null,
      nounClass = ""
    } = {}) {
      const connector = buildOrdinaryNncSubjectNumberConnector({
        nounClass,
        state,
        number,
        pluralType
      });
      return {
        subjectPerson: {
          role: "subject-person",
          slot: "pers1-pers2",
          prefix: String(subject?.subjectPrefix || ""),
          suffix: String(subject?.subjectSuffix || ""),
          displayPrefix: String(subject?.subjectPrefix || "") || "Ø",
          displaySuffix: String(subject?.subjectSuffix || "") || "Ø",
          label: String(subject?.personSubKey || "")
        },
        predicate: {
          role: "predicate",
          slot: "STEM",
          stem,
          state
        },
        subjectNumberConnector: {
          role: "subject-number-connector",
          slot: "num1-num2",
          nounClass: connector.nounStemClass,
          connector: connector.displaySurface,
          surface: connector.surface,
          label: "subject number connector",
          belongsTo: connector.belongsTo,
          referenceNumber: connector.referenceNumber,
          pluralType: connector.pluralType
        }
      };
    }
    function buildOrdinaryNncFormulaEchoFromSlots(formulaSlots = null) {
      if (!formulaSlots || typeof formulaSlots !== "object") {
        return "";
      }
      const subject = formulaSlots.subjectPerson || {};
      const predicate = formulaSlots.predicate || {};
      const numberConnector = formulaSlots.subjectNumberConnector || {};
      const stem = String(predicate.stem || "").trim();
      if (!stem) {
        return "";
      }
      const prefix = String(subject.displayPrefix || subject.prefix || "Ø") || "Ø";
      const suffix = String(subject.displaySuffix || subject.suffix || "Ø") || "Ø";
      const connector = String(numberConnector.connector || numberConnector.surface || "Ø") || "Ø";
      return `#${prefix}...${suffix}(${stem})${connector}#`;
    }
    function buildOrdinaryNncPredicateStateFrame({
      state = ORDINARY_NNC_STATE.absolutive,
      possessor = null
    } = {}) {
      const normalizedState = normalizeOrdinaryNncState(state, possessor);
      const isPossessive = normalizedState === ORDINARY_NNC_STATE.possessive;
      const resolvedPossessor = isPossessive && possessor ? possessor : null;
      return {
        role: "predicate-state",
        slot: "predicate.state",
        state: normalizedState,
        statePosition: isPossessive ? "possessor" : "vacant",
        isVacant: !isPossessive,
        hasPossessor: Boolean(resolvedPossessor),
        participantRole: isPossessive ? "possessor" : "",
        possessor: resolvedPossessor,
        notSubjectConnector: true,
        notTense: true
      };
    }
    function getOrdinaryNncPredicateStateCategoryLabel(state = "") {
      const normalized = normalizeOrdinaryNncState(state);
      if (normalized === ORDINARY_NNC_STATE.possessive) {
        return "posesivo";
      }
      if (normalized === ORDINARY_NNC_STATE.absolutive) {
        return "absolutivo";
      }
      return normalized || "desconocido";
    }
    function getOrdinaryNncAnimacyCategoryLabel(animacy = "") {
      return normalizeOrdinaryNncAnimacy(animacy) === "animate" ? "animado" : "inanimado";
    }
    function buildOrdinaryNncCategoryProfile({
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      possessor = null,
      animacy = "",
      formulaSlots = null,
      markingRequested = false,
      markingAvailable = false
    } = {}) {
      const normalizedState = normalizeOrdinaryNncState(state, possessor);
      const normalizedAnimacy = normalizeOrdinaryNncAnimacy(animacy);
      const normalizedNumber = normalizeOrdinaryNncNumber(number);
      const effectivePluralType = normalizedNumber === "plural" ? getEffectiveOrdinaryNncPluralType(pluralType || ORDINARY_NNC_PLURAL_TYPE.auto, normalizedAnimacy) : "";
      const isPossessive = normalizedState === ORDINARY_NNC_STATE.possessive;
      const isKnownState = normalizedState === ORDINARY_NNC_STATE.absolutive || normalizedState === ORDINARY_NNC_STATE.possessive;
      const connectorSlot = formulaSlots?.subjectNumberConnector?.slot || "num1-num2";
      return {
        predicateState: {
          value: normalizedState,
          label: getOrdinaryNncPredicateStateCategoryLabel(normalizedState),
          slot: "predicate.state",
          isSupportedState: isKnownState
        },
        possessiveState: {
          isPossessive,
          possessorPrefix: isPossessive ? String(possessor?.prefix || "") : "",
          markingRequested: Boolean(markingRequested || isPossessive),
          markingAvailable: Boolean(isPossessive && markingAvailable)
        },
        animacy: {
          value: normalizedAnimacy,
          label: getOrdinaryNncAnimacyCategoryLabel(normalizedAnimacy),
          affectsSubjectAgreement: true,
          affectsReferencePlural: normalizedNumber === "plural"
        },
        reference: {
          number: normalizedNumber,
          pluralType: effectivePluralType,
          label: normalizedNumber,
          connectorSlot
        }
      };
    }
    function buildOrdinaryNncBasicMetadata({
      stem = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      subject = null,
      possessor = null,
      nounClass = "",
      animacy = "",
      predicateFormula = "",
      sourceKind = "",
      markingRequested = false,
      markingAvailable = false
    } = {}) {
      const numberConnector = buildOrdinaryNncSubjectNumberConnector({
        nounClass,
        state,
        number,
        pluralType
      });
      const predicateState = buildOrdinaryNncPredicateStateFrame({
        state,
        possessor
      });
      const isAnimate = animacy === "animate";
      const isPlural = number === "plural";
      const effectivePluralType = isPlural ? getEffectiveOrdinaryNncPluralType(pluralType || ORDINARY_NNC_PLURAL_TYPE.auto, animacy) : "";
      const referenceLabel = !isPlural ? "referencia comun" : effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count ? "plural -met" : "distributivo";
      const formulaSlots = buildOrdinaryNncFormulaSlots({
        stem,
        state,
        number,
        pluralType,
        subject,
        nounClass
      });
      const categoryProfile = buildOrdinaryNncCategoryProfile({
        state,
        number,
        pluralType,
        possessor,
        animacy,
        formulaSlots,
        markingRequested,
        markingAvailable
      });
      return {
        version: 1,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        curriculumRef: {
          source: "Andrews",
          range: "12-19",
          role: "curriculum-index"
        },
        formula: "#pers1-pers2(STEM)num1-num2#",
        formulaSlots,
        formulaEcho: buildOrdinaryNncFormulaEchoFromSlots(formulaSlots),
        categoryProfile,
        hasTensePosition: false,
        stateReplacesValence: true,
        sourceKind: sourceKind || "",
        subject: {
          role: "subject",
          prefix: String(subject?.subjectPrefix || ""),
          suffix: String(subject?.subjectSuffix || ""),
          affixLabel: getOrdinaryNncSubjectAffixLabel(subject),
          personSubKey: String(subject?.personSubKey || ""),
          agreementNumber: subject?.number || "",
          numberConnector,
          nonanimateThirdOnly: !isAnimate
        },
        predicate: {
          role: "predicate",
          stem,
          formula: predicateFormula || buildOrdinaryNncPredicateFormula({
            stem,
            nounClass
          }),
          state,
          stateLabel: state === ORDINARY_NNC_STATE.possessive ? "predicado posesivo" : "predicado absolutivo",
          stateSlot: predicateState,
          nounClass,
          animacy
        },
        possessor: state === ORDINARY_NNC_STATE.possessive ? possessor || null : null,
        reference: {
          number,
          pluralType: effectivePluralType,
          label: referenceLabel,
          countSuffix: isPlural && isAnimate && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count ? "met" : "",
          animateCountSuffix: isAnimate ? "met" : "",
          distributiveReduplication: isPlural && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.distributive,
          nonanimatePluralIsDistributive: !isAnimate && isPlural && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.distributive
        },
        futureSyntaxLayer: ["pronominal-nnc", "supplementation", "included-referent-clause"]
      };
    }
    function buildOrdinaryNncClauseFrame({
      stem = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      subject = null,
      possessor = null,
      nounClass = "",
      animacy = ""
    } = {}) {
      const numberConnector = buildOrdinaryNncSubjectNumberConnector({
        nounClass,
        state,
        number,
        pluralType
      });
      const subjectFrame = subject && typeof subject === "object" ? {
        ...subject,
        numberConnector
      } : subject;
      const stateSlot = buildOrdinaryNncPredicateStateFrame({
        state,
        possessor
      });
      const predicateFormula = buildOrdinaryNncPredicateFormula({
        stem,
        nounClass
      });
      const formulaSlots = buildOrdinaryNncFormulaSlots({
        stem,
        state,
        number,
        pluralType,
        subject: subjectFrame,
        nounClass
      });
      return {
        kind: ORDINARY_NNC_CLAUSE_KIND,
        formula: "#pers1-pers2(STEM)num1-num2#",
        formulaSlots,
        formulaEcho: buildOrdinaryNncFormulaEchoFromSlots(formulaSlots),
        predicateFormula,
        hasTensePosition: false,
        tense: null,
        subject: subjectFrame,
        predicate: {
          state,
          stateSlot,
          formula: predicateFormula,
          stem,
          nounClass,
          animacy
        },
        stateSlot,
        possessor: state === ORDINARY_NNC_STATE.possessive ? possessor : null,
        referenceNumber: number,
        surfaceStrategy: pluralType || "plain"
      };
    }
    function buildOrdinaryNncUnsupportedResult({
      stem = "",
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      subject = null,
      possessor = null,
      nounClass = "",
      animacy = "",
      openStem = false,
      diagnostic,
      markingAvailable = false
    } = {}) {
      const clauseFrame = buildOrdinaryNncClauseFrame({
        stem,
        state,
        nounClass,
        animacy,
        number,
        pluralType,
        subject,
        possessor
      });
      const nncBasic = buildOrdinaryNncBasicMetadata({
        stem,
        state,
        nounClass,
        animacy,
        number,
        pluralType,
        subject,
        possessor,
        predicateFormula: clauseFrame.predicateFormula,
        sourceKind: openStem ? "open-stem" : "fixture",
        markingRequested: state === ORDINARY_NNC_STATE.possessive,
        markingAvailable
      });
      return {
        outputKind: ORDINARY_NNC_CLAUSE_KIND,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        supported: false,
        result: "",
        surfaceForms: [],
        stem,
        state,
        nounClass,
        animacy,
        openStem,
        number,
        pluralType,
        subject,
        possessor,
        predicateFormula: clauseFrame.predicateFormula,
        clauseFrame,
        nncBasic,
        diagnostics: diagnostic ? [diagnostic] : []
      };
    }
    function generateOrdinaryNncParadigm({
      stem = "",
      state = "",
      subject = null,
      possessor = null,
      possessivePrefix = "",
      number = "singular",
      pluralType = ORDINARY_NNC_PLURAL_TYPE.auto,
      nounClass = "",
      animacy = "",
      possessionKind = "",
      stateCase = "",
      possessionType = ""
    } = {}) {
      const analogueInput = parseOrdinaryNncPredicateFormulaInput(stem);
      const requestedNounClass = normalizeOrdinaryNncSubjectConnectorClass(nounClass || analogueInput?.nounClass || "");
      const normalizedStem = analogueInput?.stem || normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
      let resolvedSubject = resolveOrdinaryNncSubject(subject);
      const resolvedPossessor = resolveOrdinaryNncPossessor(possessor, possessivePrefix);
      const normalizedState = normalizeOrdinaryNncState(state, resolvedPossessor);
      const normalizedNumber = normalizeOrdinaryNncNumber(number);
      const normalizedPluralType = normalizeOrdinaryNncPluralType(pluralType);
      const normalizedPossessionKind = normalizeOrdinaryNncPossessionKind(possessionKind || stateCase || possessionType);
      if (normalizedPossessionKind === ORDINARY_NNC_POSSESSION_KIND.organic) {
        const organicStem = buildOrdinaryNncOrganicPossessionStem(normalizedStem);
        const organicNounClass = requestedNounClass || "t";
        const organicAnimacy = normalizeOrdinaryNncAnimacy(animacy);
        resolvedSubject = resolveOrdinaryNncClauseSubject(subject, normalizedNumber, organicAnimacy);
        const organicFrame = buildOrdinaryNncOrganicPossessionFrame({
          sourceStem: normalizedStem,
          organicStem,
          possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor
        });
        if (normalizedState !== ORDINARY_NNC_STATE.possessive) {
          return {
            ...buildOrdinaryNncUnsupportedResult({
              stem: organicStem,
              state: normalizedState,
              number: normalizedNumber,
              pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
              subject: resolvedSubject,
              possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
              nounClass: organicNounClass,
              animacy: organicAnimacy,
              openStem: true,
              diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.organicPossessionRequiresPossessiveState, "Organic possession NNCs require possessive predicate state; absolutive output would name a characteristic property instead.")
            }),
            possessionKind: normalizedPossessionKind,
            organicPossessionFrame: organicFrame,
            source: {
              fixtureId: "",
              sourceRefs: ["Andrews 39.3.4"],
              sourceKind: "open-stem",
              sourceStem: normalizedStem
            }
          };
        }
        if (!resolvedPossessor || resolvedPossessor.unsupported) {
          return {
            ...buildOrdinaryNncUnsupportedResult({
              stem: organicStem,
              state: normalizedState,
              number: normalizedNumber,
              pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
              subject: resolvedSubject,
              possessor: null,
              nounClass: organicNounClass,
              animacy: organicAnimacy,
              openStem: true,
              diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.organicPossessionRequiresPossessor, "Organic possession NNCs require a possessor prefix because the whole is expressed in possessive state.")
            }),
            possessionKind: normalizedPossessionKind,
            organicPossessionFrame: organicFrame,
            source: {
              fixtureId: "",
              sourceRefs: ["Andrews 39.3.4"],
              sourceKind: "open-stem",
              sourceStem: normalizedStem
            }
          };
        }
        const classStemCompatibility = getOrdinaryNncClassStemCompatibility(organicNounClass, organicStem);
        if (!classStemCompatibility.compatible) {
          return {
            ...buildOrdinaryNncUnsupportedResult({
              stem: organicStem,
              state: normalizedState,
              number: normalizedNumber,
              pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
              subject: resolvedSubject,
              possessor: resolvedPossessor,
              nounClass: organicNounClass,
              animacy: organicAnimacy,
              openStem: true,
              diagnostic: buildOrdinaryNncClassStemCompatibilityDiagnostic(classStemCompatibility)
            }),
            possessionKind: normalizedPossessionKind,
            organicPossessionFrame: organicFrame,
            source: {
              fixtureId: "",
              sourceRefs: ["Andrews 39.3.4"],
              sourceKind: "open-stem",
              sourceStem: normalizedStem
            }
          };
        }
        const singularSurface = buildOrdinaryNncSurfaceChainText({
          possessivePrefix: resolvedPossessor.prefix,
          core: organicStem
        });
        const derivedPlural = normalizedNumber === "plural" ? buildOrdinaryNncDerivedPluralForms([singularSurface], {
          state: ORDINARY_NNC_STATE.possessive,
          subject: resolvedSubject,
          possessor: resolvedPossessor,
          animacy: organicAnimacy,
          pluralType: normalizedPluralType
        }) : null;
        const resolvedSurfaceForms = normalizedNumber === "plural" ? derivedPlural?.forms || [] : [singularSurface].filter(Boolean);
        const effectivePluralType = normalizedNumber === "plural" ? getEffectiveOrdinaryNncPluralType(normalizedPluralType, organicAnimacy) : "";
        const clauseFrame = buildOrdinaryNncClauseFrame({
          stem: organicStem,
          state: ORDINARY_NNC_STATE.possessive,
          nounClass: organicNounClass,
          animacy: organicAnimacy,
          number: normalizedNumber,
          pluralType: effectivePluralType,
          subject: resolvedSubject,
          possessor: resolvedPossessor
        });
        const nncBasic = buildOrdinaryNncBasicMetadata({
          stem: organicStem,
          state: ORDINARY_NNC_STATE.possessive,
          nounClass: organicNounClass,
          animacy: organicAnimacy,
          number: normalizedNumber,
          pluralType: effectivePluralType,
          subject: resolvedSubject,
          possessor: resolvedPossessor,
          predicateFormula: clauseFrame.predicateFormula,
          sourceKind: "open-stem",
          markingRequested: true,
          markingAvailable: true
        });
        return {
          outputKind: ORDINARY_NNC_CLAUSE_KIND,
          clauseKind: ORDINARY_NNC_CLAUSE_KIND,
          supported: resolvedSurfaceForms.length > 0,
          result: resolvedSurfaceForms.join(" / "),
          surfaceForms: resolvedSurfaceForms,
          stem: organicStem,
          sourceStem: normalizedStem,
          state: ORDINARY_NNC_STATE.possessive,
          possessionKind: normalizedPossessionKind,
          stateCase: "organic-possession",
          nounClass: organicNounClass,
          animacy: organicAnimacy,
          openStem: true,
          number: normalizedNumber,
          pluralType: effectivePluralType,
          subject: resolvedSubject,
          possessor: resolvedPossessor,
          predicateFormula: clauseFrame.predicateFormula,
          clauseFrame,
          nncBasic,
          organicPossessionFrame: organicFrame,
          diagnostics: [],
          source: {
            fixtureId: "",
            sourceRefs: ["Andrews 39.3.4"],
            sourceKind: "open-stem",
            sourceStem: normalizedStem
          }
        };
      }
      const fixture = findOrdinaryNncFixture(normalizedStem) || buildOrdinaryNncOpenStemFixture(normalizedStem, {
        nounClass: requestedNounClass,
        animacy
      });
      if (!fixture) {
        return buildOrdinaryNncUnsupportedResult({
          stem: normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
          subject: resolvedSubject,
          possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
          nounClass: requestedNounClass,
          animacy,
          diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedStem, `No nominal nuclear clause fixture is configured for stem "${normalizedStem}".`)
        });
      }
      const isOpenStemFixture = fixture.openStem === true;
      const fixtureClass = String(fixture.nounClass || "");
      const fixtureAnimacy = fixture.animacy || "";
      resolvedSubject = resolveOrdinaryNncClauseSubject(subject, normalizedNumber, fixtureAnimacy);
      const classStemCompatibility = getOrdinaryNncClassStemCompatibility(fixtureClass, fixture.stem || normalizedStem);
      if (!classStemCompatibility.compatible) {
        return buildOrdinaryNncUnsupportedResult({
          stem: fixture.stem || normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
          subject: resolvedSubject,
          possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
          nounClass: fixtureClass,
          animacy: fixtureAnimacy,
          openStem: isOpenStemFixture,
          diagnostic: buildOrdinaryNncClassStemCompatibilityDiagnostic(classStemCompatibility)
        });
      }
      if (!isOpenStemFixture && requestedNounClass && fixtureClass && requestedNounClass !== fixtureClass) {
        return buildOrdinaryNncUnsupportedResult({
          stem: fixture.stem || normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
          subject: resolvedSubject,
          possessor: resolvedPossessor?.unsupported ? null : resolvedPossessor,
          nounClass: fixtureClass,
          animacy: fixtureAnimacy,
          openStem: isOpenStemFixture,
          diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.nounClassMismatch, `Nominal nuclear clause fixture "${fixture.id || normalizedStem}" is class "${fixtureClass}", not "${requestedNounClass}".`)
        });
      }
      if (normalizedState === ORDINARY_NNC_STATE.possessive && (!resolvedPossessor || resolvedPossessor.unsupported)) {
        return buildOrdinaryNncUnsupportedResult({
          stem: fixture.stem || normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: normalizedNumber === "plural" ? normalizedPluralType : "",
          subject: resolvedSubject,
          possessor: null,
          nounClass: fixtureClass,
          animacy: fixtureAnimacy,
          openStem: isOpenStemFixture,
          diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPossessor, `No nominal nuclear clause possessive fixture is configured for possessor "${possessor || possessivePrefix || ""}".`)
        });
      }
      const effectivePluralType = normalizedNumber === "plural" ? getEffectiveOrdinaryNncPluralType(normalizedPluralType, fixtureAnimacy) : "";
      if (fixtureAnimacy === "inanimate" && !isOrdinaryNncThirdSingularSubject(resolvedSubject)) {
        return buildOrdinaryNncUnsupportedResult({
          stem: fixture.stem || normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: effectivePluralType,
          subject: resolvedSubject,
          possessor: resolvedPossessor,
          nounClass: fixtureClass,
          animacy: fixtureAnimacy,
          openStem: isOpenStemFixture,
          diagnostic: buildOrdinaryNncDiagnostic(ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedSubject, `Nominal nuclear clause ${isOpenStemFixture ? "open stem" : "fixture"} "${fixture.stem || normalizedStem}" is nonanimate and only supports 3rd singular subject agreement.`)
        });
      }
      const surfaceForms = getOrdinaryNncFixtureStateForms(fixture, normalizedState, {
        number: normalizedNumber,
        possessor: resolvedPossessor,
        pluralType: normalizedPluralType
      });
      const singularForms = normalizedNumber === "plural" ? getOrdinaryNncFixtureStateForms(fixture, normalizedState, {
        number: "singular",
        possessor: resolvedPossessor
      }) : [];
      const derivedPlural = normalizedNumber === "plural" && !surfaceForms.length ? buildOrdinaryNncDerivedPluralForms(singularForms, {
        state: normalizedState,
        subject: resolvedSubject,
        possessor: resolvedPossessor,
        animacy: fixtureAnimacy,
        pluralType: normalizedPluralType
      }) : null;
      const resolvedSurfaceForms = surfaceForms.length ? surfaceForms.map(form => applyOrdinaryNncSubjectPrefix(form, resolvedSubject, normalizedState, fixtureAnimacy)) : derivedPlural?.forms || [];
      if (!resolvedSurfaceForms.length) {
        const stateData = fixture.states?.[normalizedState] || null;
        const missingPossessiveState = normalizedState === ORDINARY_NNC_STATE.possessive && !stateData;
        const diagnosticId = missingPossessiveState ? ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPossessiveState : stateData ? normalizedNumber === "plural" && effectivePluralType === ORDINARY_NNC_PLURAL_TYPE.count && fixtureAnimacy !== "animate" ? ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPluralType : ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedNumber : ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedState;
        const diagnosticMessage = missingPossessiveState ? `No nominal nuclear clause possessive forms are configured for stem "${fixture.stem || normalizedStem}".` : diagnosticId === ORDINARY_NNC_DIAGNOSTIC_IDS.unsupportedPluralType ? `Nominal nuclear clause ${isOpenStemFixture ? "open stem" : "fixture"} "${fixture.stem || normalizedStem}" is nonanimate; plural count -met is only configured for animate nouns.` : `No nominal nuclear clause ${normalizedState} ${normalizedNumber} form is configured for stem "${fixture.stem || normalizedStem}".`;
        return buildOrdinaryNncUnsupportedResult({
          stem: fixture.stem || normalizedStem,
          state: normalizedState,
          number: normalizedNumber,
          pluralType: effectivePluralType,
          subject: resolvedSubject,
          possessor: resolvedPossessor,
          nounClass: fixtureClass,
          animacy: fixtureAnimacy,
          openStem: isOpenStemFixture,
          diagnostic: buildOrdinaryNncDiagnostic(diagnosticId, diagnosticMessage),
          markingAvailable: normalizedState === ORDINARY_NNC_STATE.possessive && !missingPossessiveState && singularForms.length > 0
        });
      }
      const clauseFrame = buildOrdinaryNncClauseFrame({
        stem: fixture.stem || normalizedStem,
        state: normalizedState,
        nounClass: fixtureClass,
        animacy: fixtureAnimacy,
        number: normalizedNumber,
        pluralType: effectivePluralType,
        subject: resolvedSubject,
        possessor: normalizedState === ORDINARY_NNC_STATE.possessive ? resolvedPossessor : null
      });
      const nncBasic = buildOrdinaryNncBasicMetadata({
        stem: fixture.stem || normalizedStem,
        state: normalizedState,
        nounClass: fixtureClass,
        animacy: fixtureAnimacy,
        number: normalizedNumber,
        pluralType: effectivePluralType,
        subject: resolvedSubject,
        possessor: normalizedState === ORDINARY_NNC_STATE.possessive ? resolvedPossessor : null,
        predicateFormula: clauseFrame.predicateFormula,
        sourceKind: isOpenStemFixture ? "open-stem" : "fixture",
        markingRequested: normalizedState === ORDINARY_NNC_STATE.possessive,
        markingAvailable: normalizedState === ORDINARY_NNC_STATE.possessive
      });
      return {
        outputKind: ORDINARY_NNC_CLAUSE_KIND,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        supported: true,
        result: resolvedSurfaceForms.join(" / "),
        surfaceForms: resolvedSurfaceForms,
        stem: fixture.stem || normalizedStem,
        state: normalizedState,
        nounClass: fixtureClass,
        animacy: fixtureAnimacy,
        openStem: isOpenStemFixture,
        number: normalizedNumber,
        pluralType: effectivePluralType,
        subject: resolvedSubject,
        possessor: normalizedState === ORDINARY_NNC_STATE.possessive ? resolvedPossessor : null,
        predicateFormula: clauseFrame.predicateFormula,
        clauseFrame,
        nncBasic,
        diagnostics: [],
        source: isOpenStemFixture ? {
          fixtureId: "",
          sourceRefs: [],
          sourceKind: "open-stem"
        } : {
          fixtureId: fixture.id || "",
          sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : [],
          sourceKind: "fixture"
        }
      };
    }
    function normalizeOrdinaryNncRequestedList(values = null, normalizer = value => value) {
      const source = Array.isArray(values) ? values : values === null || typeof values === "undefined" ? [] : [values];
      const seen = new Set();
      const normalizedValues = [];
      source.forEach(value => {
        const normalized = normalizer(value);
        if (!normalized || seen.has(normalized)) {
          return;
        }
        seen.add(normalized);
        normalizedValues.push(normalized);
      });
      return normalizedValues;
    }
    function getOrdinaryNncFixtureStates(fixture = null) {
      return Object.keys(fixture?.states || {}).map(state => normalizeOrdinaryNncState(state)).filter(Boolean);
    }
    function getOrdinaryNncFixtureNumbersForState(fixture = null, state = "") {
      const stateData = fixture?.states?.[state] || null;
      if (!stateData) {
        return [];
      }
      if (state === ORDINARY_NNC_STATE.possessive) {
        const numbers = Object.keys(stateData.numberFormsByPossessor || {});
        const normalizedNumbers = numbers.map(normalizeOrdinaryNncNumber).filter(Boolean);
        if (fixture?.animacy === "animate" && normalizedNumbers.includes("singular") && !normalizedNumbers.includes("plural")) {
          normalizedNumbers.push("plural");
        }
        return normalizedNumbers;
      }
      const numbers = Object.keys(stateData.numberForms || {});
      if (numbers.length) {
        const normalizedNumbers = numbers.map(normalizeOrdinaryNncNumber).filter(Boolean);
        if (normalizedNumbers.includes("singular") && state === ORDINARY_NNC_STATE.absolutive && !normalizedNumbers.includes("plural")) {
          normalizedNumbers.push("plural");
        }
        return normalizedNumbers;
      }
      return Array.isArray(stateData.surfaceForms) && stateData.surfaceForms.length ? ["singular"] : [];
    }
    function getOrdinaryNncDefaultPluralTypesForFixture(fixture = null, state = ORDINARY_NNC_STATE.absolutive) {
      if (state === ORDINARY_NNC_STATE.possessive) {
        return fixture?.animacy === "animate" ? [ORDINARY_NNC_PLURAL_TYPE.count] : [ORDINARY_NNC_PLURAL_TYPE.distributive];
      }
      return fixture?.animacy === "animate" ? [ORDINARY_NNC_PLURAL_TYPE.count, ORDINARY_NNC_PLURAL_TYPE.distributive] : [ORDINARY_NNC_PLURAL_TYPE.distributive];
    }
    function getOrdinaryNncPossessorInventory() {
      return getOrdinaryNncPossessiveEntries().map(entry => String(entry.value || "")).filter(Boolean);
    }
    function normalizeOrdinaryNncRequestedPossessor(value = "") {
      const resolved = resolveOrdinaryNncPossessor(value);
      if (resolved && !resolved.unsupported && resolved.prefix) {
        return resolved.prefix;
      }
      if (value && typeof value === "object") {
        return String(value.prefix || value.value || value.id || value.personSubKey || "").trim();
      }
      return String(value || "").trim();
    }
    function getOrdinaryNncFixturePossessorsForStateNumber(fixture = null, state = "", number = "singular") {
      if (state !== ORDINARY_NNC_STATE.possessive) {
        return [];
      }
      const stateData = fixture?.states?.[state] || null;
      if (!stateData) {
        return [];
      }
      const byNumber = stateData.numberFormsByPossessor?.[number] || {};
      const numberPossessors = Object.keys(byNumber).filter(Boolean);
      if (numberPossessors.length) {
        return numberPossessors;
      }
      if (number === "plural" && fixture?.animacy === "animate") {
        const singularPossessors = Object.keys(stateData.numberFormsByPossessor?.singular || {}).filter(Boolean);
        if (singularPossessors.length) {
          return singularPossessors;
        }
      }
      return Object.keys(stateData.surfaceByPossessor || {}).filter(Boolean);
    }
    function buildOrdinaryNncParadigmSetDiagnostic(diagnostic = null, {
      state = ORDINARY_NNC_STATE.absolutive,
      number = "singular",
      pluralType = "",
      possessor = null
    } = {}) {
      if (!diagnostic) {
        return null;
      }
      const entry = {
        ...diagnostic,
        state,
        number
      };
      if (pluralType) {
        entry.pluralType = pluralType;
      }
      entry.possessor = possessor || null;
      return entry;
    }
    function buildOrdinaryNncParadigmSetResult({
      supported = false,
      stem = "",
      nounClass = "",
      animacy = "",
      openStem = false,
      entries = [],
      diagnostics = [],
      source = null
    } = {}) {
      return {
        outputKind: ORDINARY_NNC_CLAUSE_KIND,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        supported,
        stem,
        nounClass,
        animacy,
        openStem,
        entries,
        diagnostics,
        source
      };
    }
    function generateOrdinaryNncParadigmSet({
      stem = "",
      states = null,
      numbers = null,
      pluralTypes = null,
      possessors = null,
      subject = null,
      nounClass = "",
      animacy = ""
    } = {}) {
      const analogueInput = parseOrdinaryNncPredicateFormulaInput(stem);
      const requestedNounClass = normalizeOrdinaryNncSubjectConnectorClass(nounClass || analogueInput?.nounClass || "");
      const normalizedStem = analogueInput?.stem || normalizeOrdinaryNncText(stem).replace(/[()]/g, "");
      const fixture = findOrdinaryNncFixture(normalizedStem) || buildOrdinaryNncOpenStemFixture(normalizedStem, {
        nounClass: requestedNounClass,
        animacy
      });
      const requestedStates = normalizeOrdinaryNncRequestedList(states, value => normalizeOrdinaryNncState(value));
      const requestedNumbers = normalizeOrdinaryNncRequestedList(numbers, normalizeOrdinaryNncNumber);
      const requestedPluralTypes = normalizeOrdinaryNncRequestedList(pluralTypes, normalizeOrdinaryNncPluralType);
      const requestedPossessors = normalizeOrdinaryNncRequestedList(possessors, normalizeOrdinaryNncRequestedPossessor);
      if (!fixture) {
        const state = requestedStates[0] || ORDINARY_NNC_STATE.absolutive;
        const number = requestedNumbers[0] || "singular";
        const pluralType = number === "plural" ? requestedPluralTypes[0] || ORDINARY_NNC_PLURAL_TYPE.auto : "";
        const possessor = state === ORDINARY_NNC_STATE.possessive ? requestedPossessors[0] || null : null;
        const directResult = generateOrdinaryNncParadigm({
          stem: normalizedStem,
          state,
          number,
          pluralType,
          subject,
          possessor,
          nounClass: requestedNounClass,
          animacy
        });
        return buildOrdinaryNncParadigmSetResult({
          supported: false,
          stem: normalizedStem,
          entries: [],
          diagnostics: (directResult.diagnostics || []).map(diagnostic => buildOrdinaryNncParadigmSetDiagnostic(diagnostic, {
            state,
            number,
            pluralType: directResult.pluralType || pluralType,
            possessor
          })).filter(Boolean),
          source: null
        });
      }
      const isOpenStemFixture = fixture.openStem === true;
      const fixtureClass = String(fixture.nounClass || "");
      const setStates = requestedStates.length ? requestedStates : getOrdinaryNncFixtureStates(fixture);
      const entries = [];
      const diagnostics = [];
      setStates.forEach(state => {
        const stateNumbers = requestedNumbers.length ? requestedNumbers : getOrdinaryNncFixtureNumbersForState(fixture, state);
        const effectiveNumbers = stateNumbers.length ? stateNumbers : ["singular"];
        effectiveNumbers.forEach(number => {
          const statePluralTypes = number === "plural" ? requestedPluralTypes.length ? requestedPluralTypes : getOrdinaryNncDefaultPluralTypesForFixture(fixture, state) : [""];
          statePluralTypes.forEach(pluralType => {
            if (state === ORDINARY_NNC_STATE.possessive) {
              const fixturePossessors = getOrdinaryNncFixturePossessorsForStateNumber(fixture, state, number);
              const statePossessors = requestedPossessors.length ? requestedPossessors : fixturePossessors.length ? fixturePossessors : getOrdinaryNncPossessorInventory();
              statePossessors.forEach(possessor => {
                const directResult = generateOrdinaryNncParadigm({
                  stem: fixture.stem || normalizedStem,
                  state,
                  number,
                  pluralType,
                  subject,
                  possessor,
                  nounClass: requestedNounClass,
                  animacy
                });
                if (directResult.supported) {
                  entries.push(directResult);
                  return;
                }
                (directResult.diagnostics || []).forEach(diagnostic => {
                  diagnostics.push(buildOrdinaryNncParadigmSetDiagnostic(diagnostic, {
                    state,
                    number,
                    pluralType: directResult.pluralType || pluralType,
                    possessor
                  }));
                });
              });
              return;
            }
            const directResult = generateOrdinaryNncParadigm({
              stem: fixture.stem || normalizedStem,
              state,
              number,
              pluralType,
              subject,
              nounClass: requestedNounClass,
              animacy
            });
            if (directResult.supported) {
              entries.push(directResult);
              return;
            }
            (directResult.diagnostics || []).forEach(diagnostic => {
              diagnostics.push(buildOrdinaryNncParadigmSetDiagnostic(diagnostic, {
                state,
                number,
                pluralType: directResult.pluralType || pluralType,
                possessor: null
              }));
            });
          });
        });
      });
      return buildOrdinaryNncParadigmSetResult({
        supported: entries.length > 0,
        stem: fixture.stem || normalizedStem,
        nounClass: fixtureClass,
        animacy: fixture.animacy || "",
        openStem: isOpenStemFixture,
        entries,
        diagnostics: diagnostics.filter(Boolean),
        source: isOpenStemFixture ? {
          fixtureId: "",
          sourceRefs: [],
          sourceKind: "open-stem"
        } : {
          fixtureId: fixture.id || "",
          sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : []
        }
      });
    }
    function generateOrdinaryNncClause(request = {}) {
      return generateOrdinaryNncParadigm(request);
    }
    function generateOrdinaryNncClauseSet(request = {}) {
      return generateOrdinaryNncParadigmSet(request);
    }
    function resolveOrdinaryNncFixture(request = {}) {
      const source = request && typeof request === "object" ? request : {
        stem: request
      };
      const rawInput = source.stem ?? source.input ?? source.rawStem ?? source.rawInput ?? source.value ?? "";
      const analogueInput = parseOrdinaryNncPredicateFormulaInput(rawInput);
      const normalizedInput = analogueInput?.stem || normalizeOrdinaryNncText(rawInput).replace(/[()]/g, "");
      const fixture = findOrdinaryNncFixture(normalizedInput);
      if (!fixture) {
        return null;
      }
      const fixtureStem = fixture.stem || normalizedInput;
      const paradigmSet = generateOrdinaryNncParadigmSet({
        stem: fixtureStem,
        states: source.states ?? source.state ?? null,
        numbers: source.numbers ?? source.number ?? null,
        pluralTypes: source.pluralTypes ?? source.pluralType ?? null,
        possessors: source.possessors ?? source.possessor ?? source.possessivePrefix ?? null,
        subject: source.subject ?? null,
        nounClass: source.nounClass || ""
      });
      return {
        outputKind: ORDINARY_NNC_CLAUSE_KIND,
        clauseKind: ORDINARY_NNC_CLAUSE_KIND,
        supported: true,
        kind: "ordinary-nnc-fixture",
        input: String(rawInput || ""),
        normalizedInput,
        fixture: {
          id: fixture.id || "",
          stem: fixtureStem,
          lemma: fixture.lemma || "",
          nounClass: String(fixture.nounClass || ""),
          animacy: fixture.animacy || "",
          aliases: Array.isArray(fixture.aliases) ? [...fixture.aliases] : [],
          sourceRefs: Array.isArray(fixture.sourceRefs) ? [...fixture.sourceRefs] : []
        },
        paradigmSet
      };
    }
    function getInstrumentivoResult({
      rawVerb,
      verbMeta,
      subjectPrefix,
      subjectSuffix,
      objectPrefix,
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      mode,
      possessivePrefix
    }) {
      const commonNumberSuffix = "";
      const context = targetObject.buildVerbDerivedNominalBuilderContext({
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
        rawVerb,
        verbMeta,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker
      });
      if (context.error) {
        return {
          error: true
        };
      }
      const {
        nounSourceModel,
        directionalPrefix,
        derivedIsYawi,
        derivedIsWeya,
        derivationIsTransitive,
        resolvedDirectionalRuleMode,
        forwardStemContexts,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker
      } = context;
      if (mode === targetObject.INSTRUMENTIVO_MODE.absolutivo) {
        const entries = [];
        forwardStemContexts.forEach(stemContext => {
          const nonactiveSourceChain = targetObject.buildNonactiveSourceChain(verbMeta, stemContext.verb, stemContext.analysisVerb);
          const baseVerb = targetObject.normalizeDerivationStemValue(nonactiveSourceChain?.baseVerb || "");
          const nonactiveRuleBase = targetObject.getNounNonactiveRuleBase(baseVerb, verbMeta);
          let options = targetObject.getVisibleNonactiveDerivationOptions(baseVerb, baseVerb, {
            isTransitive: derivationIsTransitive,
            isYawi: derivedIsYawi,
            ruleBase: nonactiveRuleBase,
            rootPlusYaBase: verbMeta.rootPlusYaBase
          });
          const selectedNonactiveSuffix = targetObject.shouldForceAllNonactiveOptions() ? null : targetObject.getSelectedNonactiveSuffix();
          if (selectedNonactiveSuffix && options.some(option => option.suffix === selectedNonactiveSuffix)) {
            options = options.filter(option => option.suffix === selectedNonactiveSuffix);
          }
          options.forEach(option => {
            const rawOptionStemSpec = option?.stemSpec || targetObject.buildLiteralMorphStemSpec(targetObject.realizeMorphStemSpec(option?.stemSpec, option?.stem || ""));
            const stemSpec = targetObject.applyNonactiveSourceChainStemSpec(rawOptionStemSpec, option?.stem || "", nonactiveSourceChain, {
              sourceSuffix: option?.suffix || ""
            });
            const stem = targetObject.realizeMorphStemSpec(stemSpec, "");
            const analysisStem = directionalPrefix && stem.startsWith(directionalPrefix) ? stem.slice(directionalPrefix.length) : targetObject.realizeMorphStemSpec(rawOptionStemSpec, option?.stem || "");
            const applied = targetObject.applyMorphologyRules({
              subjectPrefix,
              objectPrefix: stemContext.morphologyObjectPrefix,
              subjectSuffix: commonNumberSuffix,
              verb: stem,
              tense: "presente-habitual",
              analysisVerb: analysisStem,
              sourceRawVerb: rawVerb,
              isYawi: false,
              isWeya: false,
              directionalPrefix,
              directionalRuleMode: resolvedDirectionalRuleMode,
              isNounContext: true,
              ...targetObject.buildMorphologyMetaOptions(verbMeta),
              indirectObjectMarker: resolvedIndirectObjectMarker,
              thirdObjectMarker: resolvedThirdObjectMarker
            });
            if (!applied || !applied.verb) {
              return;
            }
            const nominalSurface = targetObject.resolveNominalSourceOuterSurfacePlacement({
              sourceModel: nounSourceModel,
              runtimeObjectPrefix: stemContext.morphologyObjectPrefix,
              objectPrefix: applied.objectPrefix,
              verb: applied.verb,
              surfaceRuleMeta: applied.surfaceRuleMeta || null
            });
            const placedStemSpec = targetObject.resolvePlacedNominalStemSpec(nominalSurface, applied.verb, stemSpec);
            const core = targetObject.buildOutputPrefixedChain({
              subjectPrefix: applied.subjectPrefix,
              objectPrefix: nominalSurface.objectPrefix,
              verb: nominalSurface.verb,
              hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
              optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
              surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null
            });
            const coreStemSpec = targetObject.buildStructuredPrefixedStemSpec({
              stemSpec: placedStemSpec,
              verb: nominalSurface.verb,
              subjectPrefix: applied.subjectPrefix,
              objectPrefix: nominalSurface.objectPrefix,
              output: core,
              hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
              optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
              surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null
            }) || targetObject.buildLiteralMorphStemSpec(core);
            entries.push(targetObject.buildVerbDerivedNominalEntry({
              kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
              sourceModel: nounSourceModel,
              verb: core,
              subjectSuffix: applied.subjectSuffix,
              stemSpec: coreStemSpec,
              sourceTense: "presente-habitual",
              provenance: {
                nonactiveSuffix: option?.suffix || "",
                forward: stemContext.derivationProvenance || null
              },
              metadata: {
                runtimeObjectPrefix: stemContext.morphologyObjectPrefix
              }
            }));
          });
        });
        const result = targetObject.buildVerbDerivedNominalResult(entries, {
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo
        });
        if (!result.result) {
          return {
            error: true
          };
        }
        return result;
      }
      const resolvedPossessivePrefix = typeof possessivePrefix === "string" ? possessivePrefix : "";
      const entries = [];
      forwardStemContexts.forEach(stemContext => {
        const applied = targetObject.applyMorphologyRules({
          subjectPrefix,
          objectPrefix: stemContext.morphologyObjectPrefix,
          subjectSuffix: commonNumberSuffix,
          verb: stemContext.verb,
          tense: "imperfecto",
          analysisVerb: stemContext.analysisVerb,
          sourceRawVerb: rawVerb,
          isYawi: derivedIsYawi,
          isWeya: derivedIsWeya,
          directionalPrefix,
          directionalRuleMode: resolvedDirectionalRuleMode,
          isNounContext: true,
          ...targetObject.buildMorphologyMetaOptions(verbMeta),
          indirectObjectMarker: resolvedIndirectObjectMarker,
          thirdObjectMarker: resolvedThirdObjectMarker
        });
        if (!applied || !applied.verb) {
          return;
        }
        const nominalSurface = targetObject.resolveNominalSourceOuterSurfacePlacement({
          sourceModel: nounSourceModel,
          runtimeObjectPrefix: stemContext.morphologyObjectPrefix,
          objectPrefix: applied.objectPrefix,
          verb: applied.verb,
          surfaceRuleMeta: applied.surfaceRuleMeta || null
        });
        const placedStemSpec = targetObject.resolvePlacedNominalStemSpec(nominalSurface, applied.verb, stemContext.stemSpec);
        entries.push(targetObject.buildVerbDerivedNominalEntry({
          kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
          sourceModel: nounSourceModel,
          verb: nominalSurface.verb,
          subjectSuffix: applied.subjectSuffix,
          stemSpec: placedStemSpec,
          surfaceObjectPrefix: nominalSurface.objectPrefix,
          runtimeObjectPrefix: stemContext.morphologyObjectPrefix,
          surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
          sourceTense: "imperfecto",
          provenance: {
            forward: stemContext.derivationProvenance || null
          }
        }));
      });
      const result = targetObject.buildVerbDerivedNominalResult(entries, {
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.instrumentivo,
        possessivePrefix: resolvedPossessivePrefix,
        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || ""
      });
      if (!result.result) {
        return {
          error: true
        };
      }
      return result;
    }
    function getCalificativoInstrumentivoResult({
      rawVerb,
      verbMeta,
      subjectPrefix,
      subjectSuffix,
      objectPrefix,
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      possessivePrefix,
      actionNounStemUse = "",
      combinedMode = ""
    }) {
      const resolvedActionNounStemUse = String(actionNounStemUse || "");
      const context = targetObject.buildVerbDerivedNominalBuilderContext({
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
        rawVerb,
        verbMeta,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        actionNounStemUse: resolvedActionNounStemUse,
        combinedMode,
        requireNonanimateSubject: true
      });
      if (context.error) {
        return {
          error: true
        };
      }
      const {
        nounSourceModel,
        directionalPrefix,
        derivedIsYawi,
        forwardStemContexts,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker
      } = context;
      const resolvedPossessivePrefix = typeof possessivePrefix === "string" ? possessivePrefix : "";
      const useGeneralActionStem = resolvedActionNounStemUse === "general-use";
      if (useGeneralActionStem && !resolvedPossessivePrefix) {
        return {
          error: true
        };
      }
      const isActiveGeneralActionStem = useGeneralActionStem && String(combinedMode || "") !== targetObject.COMBINED_MODE.nonactive;
      const isActiveActionSource = String(combinedMode || "") !== targetObject.COMBINED_MODE.nonactive;
      const activeActionRootPlusYaBase = isActiveActionSource ? targetObject.normalizeRuleBase(verbMeta?.rootPlusYaBasePronounceable || verbMeta?.rootPlusYaBase || "") : "";
      const sourceHasActiveObjectSlot = Boolean(targetObject.getBaseObjectSlots(verbMeta) > 0 || verbMeta?.isMarkedTransitive || verbMeta?.isTaFusion);
      const sourceHasReflexiveObject = resolvedObjectPrefix === "mu";
      if (isActiveGeneralActionStem && sourceHasActiveObjectSlot && !sourceHasReflexiveObject) {
        return {
          error: true
        };
      }
      const shouldCollapseMarkerEcho = Boolean(targetObject.getForwardDerivationConfig(targetObject.getNounDerivationTypeFromMeta(verbMeta)) && (resolvedIndirectObjectMarker || resolvedThirdObjectMarker));
      const calificativoMatrixBase = targetObject.normalizeRuleBase(verbMeta?.exactBaseVerb || verbMeta?.sourceBase || verbMeta?.canonical?.sourceBase || nounSourceModel?.matrixBase || "");
      const pasadoRemotoIsTransitive = Boolean(targetObject.getBaseObjectSlots(verbMeta) > 0 || verbMeta?.isMarkedTransitive || verbMeta?.isTaFusion);
      const entries = [];
      forwardStemContexts.forEach(stemContext => {
        const activeActionMorphologyObjectPrefix = isActiveGeneralActionStem && stemContext.morphologyObjectPrefix === "mu" ? "ne" : stemContext.morphologyObjectPrefix;
        let pasadoRemotoStemEntries = targetObject.buildPasadoRemotoStemEntries({
          verb: stemContext.verb || "",
          analysisVerb: stemContext.analysisVerb || stemContext.verb || "",
          rawAnalysisVerb: stemContext.analysisVerb || stemContext.verb || "",
          sourceRawVerb: rawVerb,
          isTransitive: pasadoRemotoIsTransitive,
          directionalPrefix,
          boundPrefix: verbMeta?.hasBoundMarker ? verbMeta?.sourcePrefix || "" : "",
          boundPrefixes: Array.isArray(verbMeta?.boundPrefixes) ? verbMeta.boundPrefixes : [],
          boundExplicitFlags: Array.isArray(verbMeta?.boundExplicitFlags) ? verbMeta.boundExplicitFlags : [],
          directionalPrefixFromSlash: verbMeta?.directionalPrefixFromSlash || "",
          sourceSplitPrefix: verbMeta?.hasBoundMarker ? verbMeta?.sourcePrefix || "" : "",
          sourcePrefix: verbMeta?.sourcePrefix || "",
          sourceBase: verbMeta?.sourceBase || verbMeta?.canonical?.sourceBase || verbMeta?.canonicalRuleBase || "",
          sourceCompositeBase: verbMeta?.canonical?.slashCompositeRuleBase || "",
          isYawi: derivedIsYawi,
          hasImpersonalTaPrefix: verbMeta?.hasImpersonalTaPrefix === true,
          hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
          hasSlashMarker: verbMeta?.hasSlashMarker === true,
          hasSuffixSeparator: verbMeta?.hasSuffixSeparator === true,
          hasLeadingDash: verbMeta?.hasLeadingDash === true,
          hasBoundMarker: verbMeta?.hasBoundMarker === true,
          hasCompoundMarker: verbMeta?.hasCompoundMarker === true,
          hasNonspecificValence: targetObject.resolveHasNonspecificValence(verbMeta),
          exactBaseVerb: calificativoMatrixBase,
          suppletiveStemSet: targetObject.getSuppletiveStemSet(verbMeta),
          rootPlusYaBase: verbMeta?.rootPlusYaBase || "",
          rootPlusYaBasePronounceable: verbMeta?.rootPlusYaBasePronounceable || "",
          matrixBaseOverride: calificativoMatrixBase
        });
        if (activeActionRootPlusYaBase) {
          const obsoleteRootEntries = pasadoRemotoStemEntries.filter(entry => targetObject.normalizeRuleBase(entry?.verb || "") === activeActionRootPlusYaBase);
          if (obsoleteRootEntries.length) {
            pasadoRemotoStemEntries = obsoleteRootEntries;
          }
        }
        if (!pasadoRemotoStemEntries.length) {
          return;
        }
        const composedObjectPrefix = targetObject.composeProjectiveObjectPrefix({
          objectPrefix: activeActionMorphologyObjectPrefix,
          markers: [resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || ""],
          subjectPrefix: ""
        });
        pasadoRemotoStemEntries.forEach(pasadoRemotoEntry => {
          const predicateStemSpec = targetObject.buildCalificativoInstrumentivoPredicateStemSpec(pasadoRemotoEntry.stemSpec || null, pasadoRemotoEntry.verb || "");
          const predicateStem = targetObject.realizeMorphStemSpec(predicateStemSpec, `${pasadoRemotoEntry.verb || ""}ka`);
          if (!predicateStem || predicateStem === "—") {
            return;
          }
          const baseForms = [predicateStem].map(form => targetObject.collapseCalificativoMarkerEcho({
            form,
            morphologyObjectPrefix: composedObjectPrefix || stemContext.morphologyObjectPrefix,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
            enable: shouldCollapseMarkerEcho
          }));
          if (!baseForms.length) {
            return;
          }
          baseForms.forEach(form => {
            const baseStemSpec = form === predicateStem && predicateStemSpec && typeof predicateStemSpec === "object" && predicateStemSpec.kind ? predicateStemSpec : targetObject.buildLiteralMorphStemSpec(form);
            const nominalSurface = targetObject.resolveNominalSourceOuterSurfacePlacement({
              sourceModel: nounSourceModel,
              runtimeObjectPrefix: composedObjectPrefix || activeActionMorphologyObjectPrefix,
              objectPrefix: composedObjectPrefix || "",
              verb: form,
              surfaceRuleMeta: null
            });
            const placedStemSpec = targetObject.resolvePlacedNominalStemSpec(nominalSurface, form, baseStemSpec);
            const objectChainForm = targetObject.buildOutputPrefixedChain({
              objectPrefix: nominalSurface.objectPrefix,
              verb: nominalSurface.verb,
              hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
              optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
              surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null
            });
            const objectChainStemSpec = targetObject.buildStructuredPrefixedStemSpec({
              stemSpec: placedStemSpec,
              verb: nominalSurface.verb,
              subjectPrefix: "",
              objectPrefix: nominalSurface.objectPrefix,
              output: objectChainForm,
              hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
              optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
              surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null
            }) || targetObject.buildLiteralMorphStemSpec(objectChainForm);
            entries.push(targetObject.buildVerbDerivedNominalEntry({
              kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
              sourceModel: nounSourceModel,
              verb: objectChainForm,
              subjectSuffix: "",
              stemSpec: objectChainStemSpec,
              trailingSuffix: useGeneralActionStem ? "" : resolvedPossessivePrefix === "" ? "yut" : "yu",
              sourceTense: "pasado-remoto",
              provenance: {
                pasadoRemotoEntry,
                forward: stemContext.derivationProvenance || null
              }
            }));
          });
        });
      });
      const result = targetObject.buildVerbDerivedNominalResult(entries, {
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
        possessivePrefix: resolvedPossessivePrefix,
        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || ""
      });
      if (!result.result) {
        return {
          error: true
        };
      }
      return result;
    }
    function getLocativoTemporalResult({
      rawVerb,
      verbMeta,
      objectPrefix,
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      possessivePrefix,
      combinedMode
    }) {
      const resolvedMode = combinedMode || targetObject.getCombinedMode();
      const isNonactive = resolvedMode === targetObject.COMBINED_MODE.nonactive;
      const context = targetObject.buildVerbDerivedNominalBuilderContext({
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
        rawVerb,
        verbMeta,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        combinedMode: resolvedMode
      });
      if (context.error) {
        return {
          error: true
        };
      }
      const {
        nounSourceModel,
        directionalPrefix,
        derivedIsYawi,
        derivedIsWeya,
        derivationIsTransitive,
        resolvedDirectionalRuleMode,
        forwardStemContexts,
        objectPrefix: resolvedObjectPrefix,
        indirectObjectMarker: resolvedIndirectObjectMarker,
        thirdObjectMarker: resolvedThirdObjectMarker
      } = context;
      const possessorInput = typeof possessivePrefix === "string" ? possessivePrefix : "";
      const isImpersonal = isNonactive && !possessorInput;
      const entries = [];
      forwardStemContexts.forEach(stemContext => {
        let nonactiveStemSpecs = [stemContext.stemSpec || targetObject.buildLiteralMorphStemSpec(stemContext.verb)];
        if (isNonactive) {
          const nonactiveSourceChain = targetObject.buildNonactiveSourceChain(verbMeta, stemContext.verb, stemContext.analysisVerb);
          const nonactiveBaseVerb = targetObject.normalizeDerivationStemValue(nonactiveSourceChain?.baseVerb || "");
          const nonactiveRuleBase = targetObject.getNounNonactiveRuleBase(nonactiveBaseVerb, verbMeta);
          const selection = targetObject.resolveNonactiveStemSelection(nonactiveBaseVerb, nonactiveBaseVerb, {
            isTransitive: derivationIsTransitive,
            isYawi: derivedIsYawi,
            forceAll: targetObject.shouldForceAllNonactiveOptions(),
            ruleBase: nonactiveRuleBase,
            rootPlusYaBase: verbMeta.rootPlusYaBase
          });
          const selectedStemSpecList = Array.isArray(selection.selectedStemSpecs) ? selection.selectedStemSpecs.filter(Boolean) : [];
          const rawStemSpecs = !selection.selectedSuffix && Array.isArray(selection.allStemSpecs) && selection.allStemSpecs.length > 1 ? selection.allStemSpecs : selection.selectedSuffix && selectedStemSpecList.length > 1 ? selectedStemSpecList : [selection.selectedStemSpec || targetObject.buildLiteralMorphStemSpec(selection.selectedStem)];
          nonactiveStemSpecs = rawStemSpecs.map((spec, index) => targetObject.applyNonactiveSourceChainStemSpec(spec, Array.isArray(selection.selectedStems) ? selection.selectedStems[index] || selection.selectedStem || "" : selection.selectedStem || "", nonactiveSourceChain, {
            sourceSuffix: selection.selectedSuffix || ""
          })).filter(Boolean);
        }
        const nonactiveStemEntries = (nonactiveStemSpecs || []).map(spec => ({
          stemSpec: spec,
          stem: targetObject.realizeMorphStemSpec(spec, "")
        })).filter(entry => Boolean(entry.stem));
        if (!nonactiveStemEntries.length) {
          return;
        }
        let sourceObjectPrefix = resolvedObjectPrefix;
        if (isNonactive) {
          const passive = targetObject.applyPassiveImpersonal({
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: resolvedObjectPrefix,
            analysisVerb: targetObject.stripDirectionalPrefixFromStem(nonactiveStemEntries[0].stem, directionalPrefix)
          });
          sourceObjectPrefix = passive.objectPrefix;
        }
        const locativeObjectPrefix = sourceObjectPrefix === resolvedObjectPrefix ? stemContext.morphologyObjectPrefix : sourceObjectPrefix;
        nonactiveStemEntries.forEach(({
          stemSpec,
          stem
        }) => {
          const stemAnalysisLocal = targetObject.stripDirectionalPrefixFromStem(stem, directionalPrefix);
          const applied = targetObject.applyMorphologyRules({
            subjectPrefix: "",
            objectPrefix: locativeObjectPrefix,
            subjectSuffix: "",
            verb: stem,
            tense: "imperfecto",
            analysisVerb: stemAnalysisLocal,
            sourceRawVerb: rawVerb,
            isYawi: isNonactive ? false : derivedIsYawi,
            isWeya: isNonactive ? false : derivedIsWeya,
            directionalPrefix,
            directionalRuleMode: resolvedDirectionalRuleMode,
            isNounContext: true,
            ...targetObject.buildMorphologyMetaOptions(verbMeta),
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker
          });
          if (!applied || !applied.verb) {
            return;
          }
          const nominalSurface = targetObject.resolveNominalSourceOuterSurfacePlacement({
            sourceModel: nounSourceModel,
            runtimeObjectPrefix: locativeObjectPrefix,
            objectPrefix: applied.objectPrefix,
            verb: applied.verb,
            surfaceRuleMeta: applied.surfaceRuleMeta || null
          });
          const placedStemSpec = targetObject.resolvePlacedNominalStemSpec(nominalSurface, applied.verb, isNonactive ? stemSpec : null);
          entries.push(targetObject.buildVerbDerivedNominalEntry({
            kind: targetObject.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
            sourceModel: nounSourceModel,
            verb: nominalSurface.verb,
            subjectSuffix: applied.subjectSuffix,
            stemSpec: placedStemSpec,
            runtimeObjectPrefix: locativeObjectPrefix,
            surfaceObjectPrefix: nominalSurface.objectPrefix,
            surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
            trailingSuffix: "n",
            sourceTense: isNonactive ? "imperfecto-no-activo" : "imperfecto",
            provenance: {
              forward: stemContext.derivationProvenance || null
            }
          }));
        });
      });
      const result = targetObject.buildVerbDerivedNominalResult(entries, {
        kind: targetObject.VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
        possessivePrefix: possessorInput
      });
      if (!result.result) {
        return {
          error: true
        };
      }
      return {
        ...result,
        possessorPrefix: possessorInput,
        isImpersonal
      };
    }

    const api = {};
    Object.defineProperty(api, "ORDINARY_NNC_STATE", {
        configurable: true,
        enumerable: true,
        get() { return ORDINARY_NNC_STATE; },
    });
    Object.defineProperty(api, "ORDINARY_NNC_CLAUSE_KIND", {
        configurable: true,
        enumerable: true,
        get() { return ORDINARY_NNC_CLAUSE_KIND; },
    });
    Object.defineProperty(api, "ORDINARY_NNC_PLURAL_TYPE", {
        configurable: true,
        enumerable: true,
        get() { return ORDINARY_NNC_PLURAL_TYPE; },
    });
    Object.defineProperty(api, "ORDINARY_NNC_POSSESSION_KIND", {
        configurable: true,
        enumerable: true,
        get() { return ORDINARY_NNC_POSSESSION_KIND; },
    });
    Object.defineProperty(api, "ORDINARY_NNC_DIAGNOSTIC_IDS", {
        configurable: true,
        enumerable: true,
        get() { return ORDINARY_NNC_DIAGNOSTIC_IDS; },
    });
    api.normalizeOrdinaryNncText = normalizeOrdinaryNncText;
    api.normalizeOrdinaryNncNumber = normalizeOrdinaryNncNumber;
    api.normalizeOrdinaryNncPluralType = normalizeOrdinaryNncPluralType;
    api.normalizeOrdinaryNncPossessionKind = normalizeOrdinaryNncPossessionKind;
    api.isOrdinaryNncOrganicPossessionKind = isOrdinaryNncOrganicPossessionKind;
    api.normalizeOrdinaryNncAnimacy = normalizeOrdinaryNncAnimacy;
    api.getEffectiveOrdinaryNncPluralType = getEffectiveOrdinaryNncPluralType;
    api.normalizeOrdinaryNncAgreementNumber = normalizeOrdinaryNncAgreementNumber;
    api.normalizeOrdinaryNncState = normalizeOrdinaryNncState;
    api.getOrdinaryNncFixtureEntries = getOrdinaryNncFixtureEntries;
    api.getOrdinaryNncPossessiveEntries = getOrdinaryNncPossessiveEntries;
    api.getOrdinaryNncSubjectEntries = getOrdinaryNncSubjectEntries;
    api.buildOrdinaryNncDiagnostic = buildOrdinaryNncDiagnostic;
    api.parseOrdinaryNncPersonSubKey = parseOrdinaryNncPersonSubKey;
    api.resolveOrdinaryNncSubject = resolveOrdinaryNncSubject;
    api.hasExplicitOrdinaryNncSubject = hasExplicitOrdinaryNncSubject;
    api.resolveOrdinaryNncClauseSubject = resolveOrdinaryNncClauseSubject;
    api.resolveOrdinaryNncPossessor = resolveOrdinaryNncPossessor;
    api.findOrdinaryNncFixture = findOrdinaryNncFixture;
    api.isOrdinaryNncVowelFinalStem = isOrdinaryNncVowelFinalStem;
    api.getOrdinaryNncStemShapeLabel = getOrdinaryNncStemShapeLabel;
    api.getOrdinaryNncClassStemCompatibility = getOrdinaryNncClassStemCompatibility;
    api.buildOrdinaryNncClassStemCompatibilityDiagnostic = buildOrdinaryNncClassStemCompatibilityDiagnostic;
    api.buildOrdinaryNncOrganicPossessionStem = buildOrdinaryNncOrganicPossessionStem;
    api.buildOrdinaryNncOrganicPossessionFrame = buildOrdinaryNncOrganicPossessionFrame;
    api.buildOrdinaryNncSurfaceChainText = buildOrdinaryNncSurfaceChainText;
    api.isOrdinaryNncPluralPossessor = isOrdinaryNncPluralPossessor;
    api.buildOrdinaryNncOpenStemPossessiveSurface = buildOrdinaryNncOpenStemPossessiveSurface;
    api.buildOrdinaryNncOpenStemFixture = buildOrdinaryNncOpenStemFixture;
    api.getOrdinaryNncSurfaceFormsFromCell = getOrdinaryNncSurfaceFormsFromCell;
    api.getOrdinaryNncFixtureStateForms = getOrdinaryNncFixtureStateForms;
    api.isOrdinaryNncThirdSingularSubject = isOrdinaryNncThirdSingularSubject;
    api.buildOrdinaryNncReduplicatedSurface = buildOrdinaryNncReduplicatedSurface;
    api.applyOrdinaryNncSubjectPrefix = applyOrdinaryNncSubjectPrefix;
    api.stripOrdinaryNncPossessiveSurfacePrefix = stripOrdinaryNncPossessiveSurfacePrefix;
    api.buildOrdinaryNncPossessiveDistributiveSurface = buildOrdinaryNncPossessiveDistributiveSurface;
    api.buildOrdinaryNncAnimatePossessivePluralForms = buildOrdinaryNncAnimatePossessivePluralForms;
    api.buildOrdinaryNncDerivedPluralForms = buildOrdinaryNncDerivedPluralForms;
    api.normalizeOrdinaryNncSubjectConnectorClass = normalizeOrdinaryNncSubjectConnectorClass;
    api.formatOrdinaryNncSubjectConnectorClass = formatOrdinaryNncSubjectConnectorClass;
    api.getOrdinaryNncSubjectConnectorSurface = getOrdinaryNncSubjectConnectorSurface;
    api.parseOrdinaryNncPredicateFormulaInput = parseOrdinaryNncPredicateFormulaInput;
    api.stripOrdinaryNncSubjectConnectorFromInput = stripOrdinaryNncSubjectConnectorFromInput;
    api.buildOrdinaryNncPredicateFormula = buildOrdinaryNncPredicateFormula;
    api.buildOrdinaryNncSubjectNumberConnector = buildOrdinaryNncSubjectNumberConnector;
    api.getOrdinaryNncSubjectAffixLabel = getOrdinaryNncSubjectAffixLabel;
    api.buildOrdinaryNncFormulaSlots = buildOrdinaryNncFormulaSlots;
    api.buildOrdinaryNncFormulaEchoFromSlots = buildOrdinaryNncFormulaEchoFromSlots;
    api.buildOrdinaryNncPredicateStateFrame = buildOrdinaryNncPredicateStateFrame;
    api.getOrdinaryNncPredicateStateCategoryLabel = getOrdinaryNncPredicateStateCategoryLabel;
    api.getOrdinaryNncAnimacyCategoryLabel = getOrdinaryNncAnimacyCategoryLabel;
    api.buildOrdinaryNncCategoryProfile = buildOrdinaryNncCategoryProfile;
    api.buildOrdinaryNncBasicMetadata = buildOrdinaryNncBasicMetadata;
    api.buildOrdinaryNncClauseFrame = buildOrdinaryNncClauseFrame;
    api.buildOrdinaryNncUnsupportedResult = buildOrdinaryNncUnsupportedResult;
    api.generateOrdinaryNncParadigm = generateOrdinaryNncParadigm;
    api.normalizeOrdinaryNncRequestedList = normalizeOrdinaryNncRequestedList;
    api.getOrdinaryNncFixtureStates = getOrdinaryNncFixtureStates;
    api.getOrdinaryNncFixtureNumbersForState = getOrdinaryNncFixtureNumbersForState;
    api.getOrdinaryNncDefaultPluralTypesForFixture = getOrdinaryNncDefaultPluralTypesForFixture;
    api.getOrdinaryNncPossessorInventory = getOrdinaryNncPossessorInventory;
    api.normalizeOrdinaryNncRequestedPossessor = normalizeOrdinaryNncRequestedPossessor;
    api.getOrdinaryNncFixturePossessorsForStateNumber = getOrdinaryNncFixturePossessorsForStateNumber;
    api.buildOrdinaryNncParadigmSetDiagnostic = buildOrdinaryNncParadigmSetDiagnostic;
    api.buildOrdinaryNncParadigmSetResult = buildOrdinaryNncParadigmSetResult;
    api.generateOrdinaryNncParadigmSet = generateOrdinaryNncParadigmSet;
    api.generateOrdinaryNncClause = generateOrdinaryNncClause;
    api.generateOrdinaryNncClauseSet = generateOrdinaryNncClauseSet;
    api.resolveOrdinaryNncFixture = resolveOrdinaryNncFixture;
    api.getInstrumentivoResult = getInstrumentivoResult;
    api.getCalificativoInstrumentivoResult = getCalificativoInstrumentivoResult;
    api.getLocativoTemporalResult = getLocativoTemporalResult;
    return api;
}

export function installNncGlobals(targetObject = globalThis) {
    const api = createNncGlobals(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
