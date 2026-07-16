// Canonical modern ESM module.

export function createClassicalNahuatlVncLayerEvaluatorApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_VNC_SLOT_FRAME_VERSION = 1;
    const CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO = "\u2395";
    function cloneClassicalNahuatlVncSlotValue(value) {
      if (Array.isArray(value)) {
        return value.map(entry => cloneClassicalNahuatlVncSlotValue(entry));
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneClassicalNahuatlVncSlotValue(entry)]));
    }
    function normalizeClassicalNahuatlVncSlotCarrier(value = "") {
      return String(value == null ? "" : value).trim();
    }
    function normalizeClassicalNahuatlVncSlotStem(value = "") {
      return normalizeClassicalNahuatlVncSlotCarrier(value).replace(/^\((.*)\)$/u, "$1").normalize("NFC").trim();
    }
    function getClassicalNahuatlVncSlotFirstSound(value = "") {
      const normalized = normalizeClassicalNahuatlVncSlotCarrier(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const match = normalized.match(/[a-z]/u);
      return match ? match[0] : "";
    }
    function getClassicalNahuatlVncSlotLastSound(value = "") {
      const normalized = normalizeClassicalNahuatlVncSlotCarrier(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const matches = normalized.match(/[a-z]/gu);
      return matches?.length ? matches[matches.length - 1] : "";
    }
    function isClassicalNahuatlVncSlotVowelSound(value = "") {
      return /^[aeio]$/u.test(String(value || "").toLowerCase());
    }
    function getClassicalNahuatlVncSubjectCarrierFamily(carrier = "") {
      const normalized = normalizeClassicalNahuatlVncSlotCarrier(carrier);
      if (["n", "ni", "no"].includes(normalized)) {
        return {
          bare: "n",
          supportive: "ni",
          onSupportive: "no"
        };
      }
      if (["t", "ti", "to"].includes(normalized)) {
        return {
          bare: "t",
          supportive: "ti",
          onSupportive: "to"
        };
      }
      if (["x", "xi", "xo"].includes(normalized)) {
        return {
          bare: "x",
          supportive: "xi",
          onSupportive: "xo"
        };
      }
      return null;
    }
    function buildClassicalNahuatlVncSlotFrame({
      sourceFrameKind = "",
      sourceAuthorizationStatus = "",
      stem = "",
      personDyad = null,
      tenseFrame = null,
      numberDyad = null,
      objectFrame = null,
      formulaArtifact = ""
    } = {}) {
      const pers1 = normalizeClassicalNahuatlVncSlotCarrier(personDyad?.pers1);
      const pers2 = normalizeClassicalNahuatlVncSlotCarrier(personDyad?.pers2);
      const predicateStem = normalizeClassicalNahuatlVncSlotStem(objectFrame?.stemRealization || stem);
      const tns = normalizeClassicalNahuatlVncSlotCarrier(tenseFrame?.tns);
      const num1 = normalizeClassicalNahuatlVncSlotCarrier(numberDyad?.num1);
      const num2 = normalizeClassicalNahuatlVncSlotCarrier(numberDyad?.num2);
      const valenceArity = objectFrame?.valenceArity === "multiple" ? "multiple" : objectFrame?.valenceArity === "monadic" ? "monadic" : objectFrame?.valenceArity === "dyadic" ? "dyadic" : "vacant";
      const prePredicateSlots = [];
      if (valenceArity === "multiple") {
        (Array.isArray(objectFrame?.positions) ? objectFrame.positions : []).forEach((position, index) => {
          const positionArity = position?.valenceArity === "monadic" ? "monadic" : "dyadic";
          if (positionArity === "monadic") {
            const va = normalizeClassicalNahuatlVncSlotCarrier(position?.va);
            prePredicateSlots.push({
              id: `valence-${index + 1}`,
              role: `va-${index + 1}`,
              kind: "monadic-valence",
              carrier: va,
              va,
              objectPositionFrame: cloneClassicalNahuatlVncSlotValue(position)
            });
          } else {
            const va1 = normalizeClassicalNahuatlVncSlotCarrier(position?.va1);
            const va2 = normalizeClassicalNahuatlVncSlotCarrier(position?.va2);
            prePredicateSlots.push({
              id: `valence-${index + 1}`,
              role: `va1-va2-${index + 1}`,
              kind: "dyadic-valence",
              carrier: `${va1}-${va2}`,
              va1,
              va2,
              objectPositionFrame: cloneClassicalNahuatlVncSlotValue(position)
            });
          }
        });
      } else if (valenceArity === "monadic") {
        const va = normalizeClassicalNahuatlVncSlotCarrier(objectFrame?.va);
        prePredicateSlots.push({
          id: "valence",
          role: "va",
          kind: "monadic-valence",
          carrier: va,
          va
        });
      } else if (valenceArity === "dyadic") {
        const va1 = normalizeClassicalNahuatlVncSlotCarrier(objectFrame?.va1);
        const va2 = normalizeClassicalNahuatlVncSlotCarrier(objectFrame?.va2);
        prePredicateSlots.push({
          id: "valence",
          role: "va1-va2",
          kind: "dyadic-valence",
          carrier: `${va1}-${va2}`,
          va1,
          va2,
          morphIdentityFrame: cloneClassicalNahuatlVncSlotValue(objectFrame?.va1MorphIdentityFrame || null)
        });
      }
      const valenceComplete = valenceArity === "vacant" || valenceArity === "multiple" && prePredicateSlots.length >= 1 && prePredicateSlots.every(slot => slot.kind === "monadic-valence" ? Boolean(slot.va) : Boolean(slot.va1 && slot.va2)) || valenceArity === "monadic" && Boolean(prePredicateSlots[0]?.va) || valenceArity === "dyadic" && Boolean(prePredicateSlots[0]?.va1 && prePredicateSlots[0]?.va2);
      const complete = Boolean(sourceAuthorizationStatus === "authorized" && pers1 && pers2 && predicateStem && tns && num1 && num2 && valenceComplete);
      const semanticIdentity = [pers1, pers2, ...prePredicateSlots.map(slot => slot.carrier), predicateStem, tns, num1, num2].join("|");
      return {
        kind: "classical-nahuatl-vnc-slot-frame",
        version: CLASSICAL_NAHUATL_VNC_SLOT_FRAME_VERSION,
        frameRole: "typed-vnc-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        sourceFrameKind: normalizeClassicalNahuatlVncSlotCarrier(sourceFrameKind),
        sourceAuthorizationStatus,
        authorizationStatus: complete ? "authorized" : "blocked",
        blockReason: complete ? "" : "incomplete-or-unauthorized-typed-vnc-slots",
        semanticIdentity,
        slotOrder: ["pers1", "pers2", ...prePredicateSlots.map(slot => slot.role), "stem", "tns", "num1", "num2"],
        slots: {
          subject: {
            pers1,
            pers2,
            baseMorph: normalizeClassicalNahuatlVncSlotCarrier(personDyad?.pers1BaseMorph || pers1),
            supportivePolicy: personDyad?.pers1SupportiveISurfacePolicy || ""
          },
          prePredicate: prePredicateSlots,
          predicate: {
            stem: predicateStem,
            tns
          },
          number: {
            num1,
            num2,
            variantRule: numberDyad?.num1VariantRule || "",
            condition: numberDyad?.condition || "",
            supportiveRuleRefs: cloneClassicalNahuatlVncSlotValue(numberDyad?.num1SupportiveVowelFrame?.ruleRefs || [])
          }
        },
        valenceArity,
        objectMorphIdentityFrame: cloneClassicalNahuatlVncSlotValue(objectFrame?.va1MorphIdentityFrame || null),
        sourceFormulaArtifact: normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact),
        formulaArtifactAuthority: "display-only-not-authority",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function isClassicalNahuatlVncSlotFrame(frame = null) {
      if (!frame || frame.kind !== "classical-nahuatl-vnc-slot-frame" || frame.authorizationStatus !== "authorized") {
        return false;
      }
      const subject = frame.slots?.subject || {};
      const predicate = frame.slots?.predicate || {};
      const number = frame.slots?.number || {};
      const prePredicate = Array.isArray(frame.slots?.prePredicate) ? frame.slots.prePredicate : null;
      if (!subject.pers1 || !subject.pers2 || !predicate.stem || !predicate.tns || !number.num1 || !number.num2 || !prePredicate) {
        return false;
      }
      const unknownSlots = prePredicate.filter(slot => !["monadic-valence", "dyadic-valence", "vnc-internal-directional"].includes(slot?.kind));
      const valenceSlots = prePredicate.filter(slot => /^valence(?:-|$)/u.test(slot?.id || ""));
      const directionalSlots = prePredicate.filter(slot => slot?.kind === "vnc-internal-directional");
      if (unknownSlots.length || directionalSlots.length > 1 || directionalSlots.some(slot => !slot.carrier)) {
        return false;
      }
      if (frame.valenceArity === "monadic") {
        return valenceSlots.length === 1 && valenceSlots[0]?.kind === "monadic-valence" && Boolean(valenceSlots[0]?.va);
      }
      if (frame.valenceArity === "dyadic") {
        return valenceSlots.length === 1 && valenceSlots[0]?.kind === "dyadic-valence" && Boolean(valenceSlots[0]?.va1 && valenceSlots[0]?.va2);
      }
      if (frame.valenceArity === "multiple") {
        return valenceSlots.length >= 1 && valenceSlots.length <= 3 && valenceSlots.every(slot => slot?.kind === "monadic-valence" && Boolean(slot?.va) || slot?.kind === "dyadic-valence" && Boolean(slot?.va1 && slot?.va2));
      }
      return frame.valenceArity === "vacant" && valenceSlots.length === 0;
    }
    function renderClassicalNahuatlVncSlotFrameFormula(frame = null) {
      if (!isClassicalNahuatlVncSlotFrame(frame)) {
        return "";
      }
      const subject = frame.slots.subject;
      const predicate = frame.slots.predicate;
      const number = frame.slots.number;
      const prePredicate = frame.slots.prePredicate;
      const prePredicateSurface = prePredicate.length ? `+${prePredicate.map(slot => slot.carrier).join("+")}` : "";
      return `#${subject.pers1}-${subject.pers2}${prePredicateSurface}(${predicate.stem})${predicate.tns}+${number.num1}-${number.num2}#`;
    }
    function getClassicalNahuatlVncGeneralFormulaProjection(valenceArity = "vacant") {
      const coreExpression = valenceArity === "multiple" ? "+va+va...(STEM)" : valenceArity === "monadic" ? "+va(STEM)" : valenceArity === "dyadic" ? "+va¹-va²(STEM)" : "(STEM)";
      const linearFormula = valenceArity === "monadic" ? "#pers¹-pers²+va(STEM)tns+num¹-num²#" : valenceArity === "dyadic" ? "#pers¹-pers²+va¹-va²(STEM)tns+num¹-num²#" : valenceArity === "multiple" ? "#pers¹-pers²+va+va...(STEM)tns+num¹-num²#" : "#pers¹-pers²(STEM)tns+num¹-num²#";
      return {
        linearFormula,
        rows: [{
          role: "Subject",
          expression: "#pers¹-pers²+ ... +num¹-num²#",
          hierarchyLevel: 4,
          discontinuousConstituent: true
        }, {
          role: "Core",
          expression: coreExpression,
          hierarchyLevel: 2,
          foundation: "STEM",
          predicateMember: true
        }, {
          role: "Tense",
          expression: ")tns+",
          hierarchyLevel: 3,
          predicateMember: true
        }]
      };
    }
    function buildClassicalNahuatlVncDiagrammaticFrame(frame = null) {
      if (!isClassicalNahuatlVncSlotFrame(frame)) {
        return {
          kind: "classical-nahuatl-vnc-diagrammatic-frame",
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
          authorizationStatus: "blocked",
          blockReason: "authorized-typed-vnc-slot-frame-required",
          projectionAuthority: "typed-vnc-slots",
          formulaStringAuthority: false,
          rows: []
        };
      }
      const subject = frame.slots.subject;
      const predicate = frame.slots.predicate;
      const number = frame.slots.number;
      const prePredicate = frame.slots.prePredicate;
      const prePredicateCarriers = prePredicate.map(slot => slot.carrier);
      const corePrefix = prePredicateCarriers.length ? `+${prePredicateCarriers.join("+")}` : "";
      const subjectExpression = `#${subject.pers1}-${subject.pers2}+ ... +${number.num1}-${number.num2}#`;
      const coreExpression = `${corePrefix}(${predicate.stem})`;
      const tenseExpression = `)${predicate.tns}+`;
      const generalProjection = getClassicalNahuatlVncGeneralFormulaProjection(frame.valenceArity);
      const section = frame.valenceArity === "vacant" ? "5.1" : frame.valenceArity === "monadic" ? "6.2" : "6.3";
      const lineStart = frame.valenceArity === "vacant" ? 2449 : frame.valenceArity === "monadic" ? 2716 : 2744;
      const lineEnd = frame.valenceArity === "vacant" ? 2456 : frame.valenceArity === "monadic" ? 2723 : 2757;
      return {
        kind: "classical-nahuatl-vnc-diagrammatic-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        projectionAuthority: "typed-vnc-slots",
        formulaStringAuthority: false,
        linearFormula: renderClassicalNahuatlVncSlotFrameFormula(frame),
        generalLinearFormula: generalProjection.linearFormula,
        generalRows: generalProjection.rows,
        valenceArity: frame.valenceArity,
        prePredicateCarriers,
        predicateStem: predicate.stem,
        tenseCarrier: predicate.tns,
        hierarchy: ["verbstem", "core", "predicate", "VNC"],
        predicateGroup: {
          role: "Predicate",
          memberRoles: ["Core", "Tense"],
          hierarchyLevel: 3
        },
        rows: [{
          role: "Subject",
          expression: subjectExpression,
          hierarchyLevel: 4,
          discontinuousConstituent: true
        }, {
          role: "Core",
          expression: coreExpression,
          hierarchyLevel: 2,
          foundation: predicate.stem,
          predicateMember: true
        }, {
          role: "Tense",
          expression: tenseExpression,
          hierarchyLevel: 3,
          predicateMember: true
        }],
        ruleRefs: [{
          section: "4.4",
          transcriptionLineStart: 2310,
          transcriptionLineEnd: 2321,
          exactWitness: "The VNC diagram separates Subject from a Predicate composed of Core and Tense."
        }, {
          section: "4.4 note",
          transcriptionLineStart: 2326,
          transcriptionLineEnd: 2339,
          exactWitness: "The VNC hierarchy is verbstem, verbcore, predicate, and VNC, with the stem as foundation."
        }, {
          section,
          transcriptionLineStart: lineStart,
          transcriptionLineEnd: lineEnd,
          exactWitness: frame.valenceArity === "vacant" ? "The intransitive VNC has an implicitly present vacant Valence position in its Core." : frame.valenceArity === "monadic" ? "The monadic transitive VNC diagram places +va(STEM) in the Core and tns in Tense." : "The dyadic transitive VNC diagram places +va1-va2(STEM) in the Core and tns in Tense."
        }]
      };
    }
    function getClassicalNahuatlVncNextCarrierAfterSubject(frame = null) {
      const firstPrePredicate = frame?.slots?.prePredicate?.[0]?.carrier || "";
      return firstPrePredicate || frame?.slots?.predicate?.stem || "";
    }
    function getClassicalNahuatlVncCarrierBeforeSlot(frame = null, slotIndex = 0) {
      if (slotIndex <= 0) {
        return frame?.slots?.subject?.pers1 || "";
      }
      return frame?.slots?.prePredicate?.[slotIndex - 1]?.carrier || "";
    }
    function getClassicalNahuatlVncCarrierAfterSlot(frame = null, slotIndex = 0) {
      return frame?.slots?.prePredicate?.[slotIndex + 1]?.carrier || frame?.slots?.predicate?.stem || "";
    }
    function isClassicalNahuatlVncSilentCarrier(value = "") {
      const normalized = normalizeClassicalNahuatlVncSlotCarrier(value);
      return !normalized || normalized === "0" || normalized === "\u00d8" || normalized === CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO;
    }
    function isClassicalNahuatlVncNum1KContext(number = {}) {
      const rule = String(number.variantRule || "").toLowerCase();
      const condition = String(number.condition || "").toLowerCase();
      if (condition === "future-preterit-indicative" || rule.includes("future") || rule.includes("preterit") || rule.includes("qui-after") || rule.includes("square-zero-replaces-obsolescent")) {
        return true;
      }
      if (rule.includes("optative") || rule.includes("admonitive")) {
        return false;
      }
      return number.num2 === "eh" && number.num1 === "qu";
    }
    function insertClassicalNahuatlDirectionalSlot(frame = null, expandedVncBoundaryFrame = null) {
      const directionalPrefix = normalizeClassicalNahuatlVncSlotCarrier(expandedVncBoundaryFrame?.directionalPrefix);
      const placement = normalizeClassicalNahuatlVncSlotCarrier(expandedVncBoundaryFrame?.directionalPlacement);
      if (!directionalPrefix) {
        return {
          directionalPrefix,
          placement,
          inserted: false
        };
      }
      const directionalSlot = {
        id: "directional",
        role: "directional-locative",
        kind: "vnc-internal-directional",
        carrier: directionalPrefix
      };
      if (placement === "before-monadic-valence" || placement === "before-reflexive-reciprocal-valence") {
        frame.slots.prePredicate.unshift(directionalSlot);
      } else {
        frame.slots.prePredicate.push(directionalSlot);
      }
      return {
        directionalPrefix,
        placement,
        inserted: true
      };
    }
    function getClassicalNahuatlVncLayerRuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function applyClassicalNahuatlDirectionalProgressiveAssimilation(frame = null, directional = {}) {
      const predicate = frame?.slots?.predicate || null;
      const sourceStem = normalizeClassicalNahuatlVncSlotStem(predicate?.stem || "");
      const directionalPrefix = normalizeClassicalNahuatlVncSlotCarrier(directional?.directionalPrefix || "");
      const lesson210BoundaryRequired = directionalPrefix === "huāl" && /^(?:tl|y)/u.test(sourceStem);
      if (!lesson210BoundaryRequired) {
        return {
          required: false,
          applied: false,
          authorizationStatus: "not-applicable",
          sourcePredicateStem: sourceStem,
          realizedPredicateStem: sourceStem,
          operationFrame: null
        };
      }
      const runtimeTarget = getClassicalNahuatlVncLayerRuntimeTarget();
      if (typeof runtimeTarget?.buildClassicalNahuatlLesson210ProgressiveAssimilationFrame !== "function") {
        return {
          required: true,
          applied: false,
          authorizationStatus: "blocked",
          blockReason: "lesson2-10-boundary-authority-unavailable",
          sourcePredicateStem: sourceStem,
          realizedPredicateStem: "",
          operationFrame: null
        };
      }
      const operationFrame = runtimeTarget.buildClassicalNahuatlLesson210ProgressiveAssimilationFrame(`${directionalPrefix}-${sourceStem}`);
      const realizedPredicateStem = Array.isArray(operationFrame.realizedMorphs) ? operationFrame.realizedMorphs.slice(1).join("-") : "";
      const authorized = operationFrame.authorizationStatus === "authorized" && operationFrame.transformationApplied === true && Boolean(realizedPredicateStem);
      if (authorized && predicate) {
        predicate.stem = realizedPredicateStem;
      }
      return {
        required: true,
        applied: authorized,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : operationFrame.blockReason || "lesson2-10-directional-boundary-not-realized",
        sourcePredicateStem: sourceStem,
        realizedPredicateStem: authorized ? realizedPredicateStem : "",
        selectedRuleIds: operationFrame.appliedRuleIds || [],
        operationFrame
      };
    }
    function realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
      vncSlotFrame = null,
      expandedVncBoundaryFrame = null,
      objectRelationshipRuleFrame = null
    } = {}) {
      if (!isClassicalNahuatlVncSlotFrame(vncSlotFrame)) {
        return {
          kind: "classical-nahuatl-lesson8-final-boundary-realization-frame",
          authorizationStatus: "blocked",
          blockReason: "missing-or-contradictory-typed-vnc-slot-frame",
          typedSlotAuthority: true,
          formulaStringAuthority: false,
          formulaRealization: "",
          actions: []
        };
      }
      const realizedFrame = cloneClassicalNahuatlVncSlotValue(vncSlotFrame);
      realizedFrame.phase = "final-boundary-realization";
      realizedFrame.sourceSemanticIdentity = vncSlotFrame.semanticIdentity;
      const actions = ["assemble-slot-order-before-final-boundary-realization", "realize-final-formula-boundaries-after-slot-order"];
      const directional = insertClassicalNahuatlDirectionalSlot(realizedFrame, expandedVncBoundaryFrame);
      const directionalProgressiveAssimilation = applyClassicalNahuatlDirectionalProgressiveAssimilation(realizedFrame, directional);
      if (directionalProgressiveAssimilation.applied) {
        actions.push("realize-lesson2-10-progressive-assimilation-at-directional-predicate-boundary");
      }
      if (directionalProgressiveAssimilation.authorizationStatus === "blocked") {
        return {
          kind: "classical-nahuatl-lesson8-final-boundary-realization-frame",
          lesson: "Andrews Lesson 8",
          layerRole: "typed-final-boundary-realization",
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
          authorizationStatus: "blocked",
          blockReason: directionalProgressiveAssimilation.blockReason,
          typedSlotAuthority: true,
          formulaStringAuthority: false,
          formulaRealization: "",
          directionalProgressiveAssimilation,
          actions
        };
      }
      const subject = realizedFrame.slots.subject;
      const subjectBefore = subject.pers1;
      const subjectFamily = getClassicalNahuatlVncSubjectCarrierFamily(subject.pers1);
      const nextCarrier = getClassicalNahuatlVncNextCarrierAfterSubject(realizedFrame);
      const nextSound = getClassicalNahuatlVncSlotFirstSound(nextCarrier);
      const nextNeedsSupport = Boolean(nextSound && !isClassicalNahuatlVncSlotVowelSound(nextSound));
      const secondPluralSubject = ["am", "an", "az", "ax"].includes(subject.pers1);
      if (secondPluralSubject) {
        subject.pers1 = nextSound === "z" || nextSound === "x" ? `a${nextSound}` : isClassicalNahuatlVncSlotVowelSound(nextSound) || nextSound === "m" || nextSound === "p" ? "am" : "an";
        if (subject.pers1 !== subjectBefore) {
          actions.push("realize-second-plural-subject-nasal-after-slot-order");
        }
      } else if (subjectFamily) {
        subject.pers1 = nextNeedsSupport ? subjectFamily.supportive : subjectFamily.bare;
        if (subject.pers1 !== subjectBefore) {
          actions.push("realize-pers1-supportive-vowel-after-slot-order");
        }
      }
      const prePredicate = realizedFrame.slots.prePredicate;
      const valenceIndex = prePredicate.findIndex(slot => slot.id === "valence");
      const valenceSlot = valenceIndex >= 0 ? prePredicate[valenceIndex] : null;
      const objectMorphIdentityFrame = cloneClassicalNahuatlVncSlotValue(valenceSlot?.morphIdentityFrame || realizedFrame.objectMorphIdentityFrame || null);
      const selectedObjectSlotBefore = objectRelationshipRuleFrame?.selectedObjectSlot || valenceSlot?.carrier || "";
      let spellingSelectedAfterSlotOrder = "";
      let pluralObjectVa2BeforeFinalBoundary = "";
      let finalPluralObjectVa2 = "";
      if (valenceSlot?.kind === "dyadic-valence" && objectMorphIdentityFrame?.morphIdentity === "/k/") {
        const leftCarrier = getClassicalNahuatlVncCarrierBeforeSlot(realizedFrame, valenceIndex);
        const rightCarrier = getClassicalNahuatlVncCarrierAfterSlot(realizedFrame, valenceIndex);
        const leftSound = getClassicalNahuatlVncSlotLastSound(leftCarrier);
        const rightSound = getClassicalNahuatlVncSlotFirstSound(rightCarrier);
        if (String(objectMorphIdentityFrame.va2 || "") === "im" || ["im", "in"].includes(valenceSlot.va2)) {
          pluralObjectVa2BeforeFinalBoundary = valenceSlot.va2;
          valenceSlot.va1 = "qu";
          if (rightCarrier === "on") {
            valenceSlot.va2 = "im";
          } else if (rightCarrier === "hu\u0101l") {
            valenceSlot.va2 = "in";
          }
          finalPluralObjectVa2 = valenceSlot.va2;
          spellingSelectedAfterSlotOrder = "qu";
          if (finalPluralObjectVa2 !== pluralObjectVa2BeforeFinalBoundary) {
            actions.push("realize-third-plural-object-number-before-directional-neighbor");
          }
        } else {
          if (rightCarrier === "on") {
            valenceSlot.va1 = "c";
            actions.push("realize-third-singular-k-object-as-c-before-on");
          } else if (rightCarrier === "hu\u0101l") {
            valenceSlot.va1 = isClassicalNahuatlVncSlotVowelSound(leftSound) ? "c" : "qui";
          } else if (isClassicalNahuatlVncSlotVowelSound(leftSound) || isClassicalNahuatlVncSlotVowelSound(rightSound)) {
            valenceSlot.va1 = rightSound === "e" || rightSound === "i" ? "qu" : "c";
          } else {
            valenceSlot.va1 = "qui";
          }
          spellingSelectedAfterSlotOrder = valenceSlot.va1;
          actions.push("realize-third-singular-k-object-after-directional-neighbor");
        }
        valenceSlot.carrier = `${valenceSlot.va1}-${valenceSlot.va2}`;
      }
      let pers1SupportiveIToOApplied = false;
      const firstSlot = prePredicate[0] || null;
      const secondSlot = prePredicate[1] || null;
      const finalSubjectFamily = getClassicalNahuatlVncSubjectCarrierFamily(subject.pers1);
      if (finalSubjectFamily && firstSlot?.kind === "dyadic-valence" && firstSlot.va1 === "c" && firstSlot.va2 === "0" && secondSlot?.carrier === "on") {
        const beforeO = subject.pers1;
        subject.pers1 = finalSubjectFamily.onSupportive;
        pers1SupportiveIToOApplied = subject.pers1 !== beforeO;
        if (pers1SupportiveIToOApplied) {
          actions.push("replace-pers1-supportive-i-with-o-before-c-on");
        }
      }
      const number = realizedFrame.slots.number;
      const num1Before = number.num1;
      const num1LeftCarrierSource = !isClassicalNahuatlVncSilentCarrier(realizedFrame.slots.predicate.tns) ? "tns" : "stem";
      const num1LeftCarrier = num1LeftCarrierSource === "tns" ? realizedFrame.slots.predicate.tns : realizedFrame.slots.predicate.stem;
      const num1LeftSound = getClassicalNahuatlVncSlotLastSound(num1LeftCarrier);
      const num1KContext = isClassicalNahuatlVncNum1KContext(number);
      const lesson11Num1Override = String(realizedFrame.lesson11Alternative?.num1Override || realizedFrame.lesson11Plan?.num1Override || "");
      const lesson11DeletesPostStemK = realizedFrame.lesson11Alternative?.deletePostStemK === true || realizedFrame.lesson11Plan?.deletePostStemK === true || realizedFrame.lesson11Plan?.kDeletionAfterStem === true;
      let num1SupportiveVowelAction = "not-supportive";
      let num1SquareZeroReplacesQui = false;
      if (lesson11Num1Override || lesson11DeletesPostStemK && num1KContext) {
        number.num1 = lesson11Num1Override || CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO;
        num1SupportiveVowelAction = lesson11Num1Override ? "lesson11-paradigm-cell-finalizes-num1" : "lesson11-deletes-post-stem-k-with-silent-num1-carrier";
        num1SquareZeroReplacesQui = number.num1 === CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO;
        actions.push(lesson11Num1Override ? "preserve-lesson11-num1-override-at-final-boundary" : "preserve-lesson11-post-stem-k-deletion-at-final-boundary");
      } else if (num1KContext) {
        if (number.num2 === "eh") {
          number.num1 = "qu";
          num1SupportiveVowelAction = "not-needed-before-plural-eh";
        } else if (number.num2 === "0") {
          if (isClassicalNahuatlVncSlotVowelSound(num1LeftSound)) {
            number.num1 = "c";
            num1SupportiveVowelAction = "not-needed-after-vowel";
          } else {
            number.num1 = CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO;
            num1SupportiveVowelAction = "suppress-supportive-qui-with-square-zero";
            num1SquareZeroReplacesQui = true;
          }
        }
        actions.push("realize-num1-k-connector-after-final-predicate");
      }
      realizedFrame.semanticIdentity = [subject.pers1, subject.pers2, ...prePredicate.map(slot => slot.carrier), realizedFrame.slots.predicate.stem, realizedFrame.slots.predicate.tns, number.num1, number.num2].join("|");
      const formulaRealization = renderClassicalNahuatlVncSlotFrameFormula(realizedFrame);
      return {
        kind: "classical-nahuatl-lesson8-final-boundary-realization-frame",
        lesson: "Andrews Lesson 8",
        layerRole: "typed-final-boundary-realization",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: formulaRealization ? "authorized" : "blocked",
        blockReason: formulaRealization ? "" : "typed-vnc-slot-render-failed",
        typedSlotAuthority: true,
        formulaStringAuthority: false,
        inputFormula: vncSlotFrame.sourceFormulaArtifact || "",
        inputFormulaRole: "display-artifact-not-authority",
        formulaRealization,
        typedSlotFrame: realizedFrame,
        sourceTypedSlotFrame: cloneClassicalNahuatlVncSlotValue(vncSlotFrame),
        sourceSemanticIdentity: vncSlotFrame.semanticIdentity,
        finalSemanticIdentity: realizedFrame.semanticIdentity,
        directionalPrefix: directional.directionalPrefix,
        directionalPlacement: directional.placement,
        directionalProgressiveAssimilation,
        directionalProgressiveAssimilationApplied: directionalProgressiveAssimilation.applied === true,
        directionalProgressiveAssimilationRuleIds: directionalProgressiveAssimilation.selectedRuleIds || [],
        predicateStemBeforeDirectionalAssimilation: directionalProgressiveAssimilation.sourcePredicateStem || "",
        predicateStemAfterDirectionalAssimilation: directionalProgressiveAssimilation.realizedPredicateStem || realizedFrame.slots.predicate.stem,
        finalBoundaryRealizationApplies: true,
        actions,
        objectMorphIdentityFrame,
        objectMorphIdentity: objectMorphIdentityFrame?.morphIdentity || "",
        objectMorphIdentityKind: objectMorphIdentityFrame?.morphIdentityKind || "",
        objectRegularSpellings: objectMorphIdentityFrame?.regularSpellings || [],
        objectSupportiveSpelling: objectMorphIdentityFrame?.supportiveSpelling || "",
        selectedObjectSlotBeforeFinalBoundary: selectedObjectSlotBefore,
        finalObjectSlot: valenceSlot?.carrier || selectedObjectSlotBefore,
        spellingSelectedAfterSlotOrder,
        thirdSingularKObjectBeforeOn: Boolean(objectMorphIdentityFrame?.morphIdentity === "/k/" && valenceSlot?.va1 === "c" && prePredicate[valenceIndex + 1]?.carrier === "on"),
        pluralObjectVa2BeforeFinalBoundary,
        finalPluralObjectVa2,
        subjectCarrierBeforeFinalBoundary: subjectBefore,
        finalSubjectCarrier: subject.pers1,
        subjectSupportiveVowelAction: nextNeedsSupport ? "surface-i-before-following-consonant" : "drop-i-before-following-vowel",
        nextCarrierAfterSubject: nextCarrier,
        nextSoundAfterSubject: nextSound,
        pers1SupportiveIToOApplied,
        finalNum1RuleRefs: number.supportiveRuleRefs || [],
        num1BeforeFinalBoundary: num1Before,
        finalNum1: number.num1,
        finalNum2: number.num2,
        finalNum1LeftCarrierSource: num1LeftCarrierSource,
        finalNum1LeftSound: num1LeftSound,
        finalNum1RealizationApplies: num1KContext,
        finalNum1SupportiveVowelAction: num1SupportiveVowelAction,
        finalNum1SquareZeroReplacesQui: num1SquareZeroReplacesQui,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    const CLASSICAL_NAHUATL_NONACTIVE_SUFFIX_FAMILIES = Object.freeze(["lō", "ō", "hua", "o-hua", "lo-hua", "hua-lō"]);
    const CLASSICAL_NAHUATL_NONACTIVE_FORMATION_CORES = Object.freeze(["o", "lo", "hua"]);
    const CLASSICAL_NAHUATL_NONACTIVE_FORMATION_STRUCTURES = Object.freeze({
      "ō": Object.freeze({
        formationCore: "o",
        continuation: "terminal",
        sequence: Object.freeze(["o"])
      }),
      "o-hua": Object.freeze({
        formationCore: "o",
        continuation: "hua",
        sequence: Object.freeze(["o", "hua"])
      }),
      "lō": Object.freeze({
        formationCore: "lo",
        continuation: "terminal",
        sequence: Object.freeze(["lo"])
      }),
      "lo-hua": Object.freeze({
        formationCore: "lo",
        continuation: "hua",
        sequence: Object.freeze(["lo", "hua"])
      }),
      "hua": Object.freeze({
        formationCore: "hua",
        continuation: "terminal",
        sequence: Object.freeze(["hua"])
      }),
      "hua-lō": Object.freeze({
        formationCore: "hua",
        continuation: "lo",
        sequence: Object.freeze(["hua", "lo"])
      })
    });

    // Final /e/ is not a fourth productive imperfective ending. Andrews identifies
    // the few e-final stems as lexical variants of a-final stems (§24.1), so their
    // identity must be known before Lesson 20 can license a nonactive formation.
    // A recognized active allomorph with no attested nonactive output remains
    // explicitly unresolved; it must not fall through to an invented generic rule.
    const CLASSICAL_NAHUATL_LESSON20_ACTIVE_STEM_IDENTITIES = Object.freeze([Object.freeze({
      identityId: "chiya-chiye-wait",
      canonicalImperfectiveStem: "chiya",
      allowedAllomorphs: Object.freeze(["chiya", "chiye"]),
      verbClasses: Object.freeze(["B"]),
      sourceValenceModes: Object.freeze(["transitive"]),
      allomorphy: "final-a-e-variant-with-intervocalic-y",
      identityRuleId: "cn-l7-74-chiya-chiye-active-allomorphs",
      andrewsSections: Object.freeze(["7.4", "28.7", "48.6"]),
      exactNonactiveFormations: Object.freeze({
        chiye: Object.freeze([Object.freeze({
          nonactiveStem: "chiye-lō",
          suffixFamily: "lō",
          ruleId: "cn-l28-7-chiye-lo-source",
          formationAuthority: "later-canvas-source-witness",
          andrewsSection: "28.7/48.6",
          attestationStatus: "formula-backed-passive-and-impersonal-stem",
          sourceValenceMode: "transitive"
        })])
      })
    }), Object.freeze({
      identityId: "piya-piye-guard",
      canonicalImperfectiveStem: "piya",
      allowedAllomorphs: Object.freeze(["piya", "piye"]),
      verbClasses: Object.freeze(["B"]),
      sourceValenceModes: Object.freeze(["transitive"]),
      allomorphy: "final-a-e-lexical-variant",
      identityRuleId: "cn-l24-1-piya-piye-active-allomorphs",
      andrewsSections: Object.freeze(["24.1", "37.9.1.a"]),
      exactNonactiveFormations: Object.freeze({
        piye: Object.freeze([Object.freeze({
          nonactiveStem: "piye-lō",
          suffixFamily: "lō",
          ruleId: "cn-l37-9-piya-piye-lo-source",
          formationAuthority: "later-canvas-source-witness",
          andrewsSection: "37.9.1.a",
          attestationStatus: "passive-patientive-vowel-variant-source-reconstruction",
          sourceValenceMode: "transitive"
        })])
      })
    }), Object.freeze({
      identityId: "mama-meme-carry-on-back",
      canonicalImperfectiveStem: "māmā",
      allowedAllomorphs: Object.freeze(["māmā", "mēmē"]),
      verbClasses: Object.freeze(["D"]),
      sourceValenceModes: Object.freeze(["transitive"]),
      allomorphy: "long-final-a-e-lexical-variant",
      identityRuleId: "cn-l24-1-mama-meme-active-allomorphs",
      andrewsSections: Object.freeze(["7.6", "20.2", "24.1"]),
      exactNonactiveFormations: Object.freeze({}),
      unresolvedAllomorphs: Object.freeze({
        mēmē: "canvas-identifies-the-active-allomorph-but-does-not-license-an-exact-nonactive-stem"
      })
    })]);

    // This is an override/alternative inventory, never a whitelist. Any well-shaped
    // stem absent here continues through the productive Lesson 20 ending rules.
    const CLASSICAL_NAHUATL_LESSON20_FIXED_FORMATIONS = Object.freeze({
      "ahci": Object.freeze([Object.freeze({
        nonactiveStem: "ahxī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-6-ahci",
        formationAuthority: "obligatory-exception"
      })]),
      "cuīca": Object.freeze([Object.freeze({
        nonactiveStem: "cuic-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-5-cuica-exception",
        formationAuthority: "obligatory-exception"
      })]),
      "ca-h": Object.freeze([Object.freeze({
        nonactiveStem: "ye-lo-hua",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-cah-suppletive",
        formationAuthority: "suppletive-lexical-rule"
      })]),
      "chihua": Object.freeze([Object.freeze({
        nonactiveStem: "chihua-lō",
        perfectiveNonactiveStem: "chīhua-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-2-chihua",
        formationAuthority: "productive-lexical-class-rule"
      })]),
      "choca": Object.freeze([Object.freeze({
        nonactiveStem: "chōc-o-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l20-5-choca",
        vowelLengthRuleId: "cn-l20-5-choca-lexical-o-lengthening",
        formationAuthority: "obligatory-exception"
      })]),
      "coco-ya": Object.freeze([Object.freeze({
        nonactiveStem: "coco-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-b-root-plus-ya-cocoya",
        formationAuthority: "productive-lexical-class-rule"
      })]),
      "cui": Object.freeze([Object.freeze({
        nonactiveStem: "cuī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-6-cui",
        formationAuthority: "productive-rule"
      }), Object.freeze({
        nonactiveStem: "cui-hua-lō",
        suffixFamily: "hua-lō",
        ruleId: "cn-l20-7-cui-hua-lo-variant",
        formationAuthority: "optional-variant"
      })]),
      "hui-tz": Object.freeze([Object.freeze({
        nonactiveStem: "huī-lo-hua-tz",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-huitz",
        formationAuthority: "suppletive-lexical-rule",
        attachmentSite: "first-compound-member"
      })]),
      "huī-tz": Object.freeze([Object.freeze({
        nonactiveStem: "huī-lo-hua-tz",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-huitz",
        vowelLengthRuleId: "cn-l20-3-huitz-preserve-source-long-i",
        formationAuthority: "suppletive-lexical-rule",
        attachmentSite: "first-compound-member"
      })]),
      "hue-tz-ca": Object.freeze([Object.freeze({
        nonactiveStem: "hue-tz-c-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-huetzca",
        formationAuthority: "obligatory-exception"
      })]),
      "huāl-la-uh": Object.freeze([Object.freeze({
        nonactiveStem: "huāl-hui-lo-hua",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-huallauh",
        formationAuthority: "suppletive-lexical-rule"
      })]),
      "huica-tz": Object.freeze([Object.freeze({
        nonactiveStem: "huica-lo-hua-tz",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-huicatz",
        formationAuthority: "suppletive-lexical-rule",
        attachmentSite: "first-compound-member"
      }), Object.freeze({
        nonactiveStem: "huīc-o-hua-tz",
        suffixFamily: "o-hua",
        ruleId: "cn-l20-3-huicatz-variant",
        formationAuthority: "optional-variant"
      })]),
      "ihcali": Object.freeze([Object.freeze({
        nonactiveStem: "ihcali-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-6-ihcali-variant",
        formationAuthority: "optional-variant"
      })]),
      "ihcuani-ā": Object.freeze([Object.freeze({
        nonactiveStem: "ihcuanī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-6-ihcuania-hua-variant",
        formationAuthority: "optional-variant"
      })]),
      "ihnecui": Object.freeze([Object.freeze({
        nonactiveStem: "ihnec-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-ihnecui",
        formationAuthority: "productive-lexical-class-rule"
      }), Object.freeze({
        nonactiveStem: "ihnecu-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-ihnecui-variant",
        formationAuthority: "optional-variant"
      })]),
      "ilō-ti": Object.freeze([Object.freeze({
        nonactiveStem: "īlō-ch-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-iloti",
        formationAuthority: "obligatory-exception"
      })]),
      "itta": Object.freeze([Object.freeze({
        nonactiveStem: "itt-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-itta",
        formationAuthority: "productive-lexical-class-rule"
      }), Object.freeze({
        nonactiveStem: "itta-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-4-itta-lo-variant",
        formationAuthority: "optional-variant"
      })]),
      "itqui-tz": Object.freeze([Object.freeze({
        nonactiveStem: "itqui-lo-hua-tz",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-itquitz",
        formationAuthority: "suppletive-lexical-rule",
        attachmentSite: "first-compound-member"
      })]),
      "itqui": Object.freeze([Object.freeze({
        nonactiveStem: "itc-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-itqui",
        formationAuthority: "productive-rule"
      }), Object.freeze({
        nonactiveStem: "itquī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-4-itqui-variant",
        formationAuthority: "optional-variant"
      })]),
      "mani": Object.freeze([Object.freeze({
        nonactiveStem: "man-o-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l20-5-mani",
        formationAuthority: "productive-rule"
      }), Object.freeze({
        nonactiveStem: "mani-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-5-mani-variant",
        formationAuthority: "optional-variant"
      })]),
      "mamali": Object.freeze([Object.freeze({
        nonactiveStem: "mamali-o-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l20-5-mamali-transitive",
        formationAuthority: "productive-lexical-class-rule"
      }), Object.freeze({
        nonactiveStem: "mamalī-hua-lō",
        suffixFamily: "hua-lō",
        ruleId: "cn-l20-7-mamali-hua-lo-variant",
        formationAuthority: "optional-variant"
      })]),
      "mati": Object.freeze([Object.freeze({
        nonactiveStem: "mach-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-mati",
        formationAuthority: "obligatory-exception"
      })]),
      "panō": Object.freeze([Object.freeze({
        nonactiveStem: "panō-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-6-pano-variant",
        formationAuthority: "optional-variant"
      })]),
      "pīn-ā-hua": Object.freeze([Object.freeze({
        nonactiveStem: "pīn-ā-hua-lō",
        suffixFamily: "hua-lō",
        ruleId: "cn-l20-5-pinahua-exception",
        formationAuthority: "obligatory-exception"
      })]),
      "pā-tz-ca": Object.freeze([Object.freeze({
        nonactiveStem: "pā-tz-ca-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-a-patzca",
        formationAuthority: "productive-lexical-class-rule"
      })]),
      "pitza": Object.freeze([Object.freeze({
        nonactiveStem: "pitza-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-b-pitza",
        formationAuthority: "productive-lexical-class-rule"
      })]),
      "quetza": Object.freeze([Object.freeze({
        nonactiveStem: "quetza-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-b-quetza",
        formationAuthority: "productive-lexical-class-rule"
      })]),
      "teci": Object.freeze([Object.freeze({
        nonactiveStem: "tecī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-5-teci",
        vowelLengthRuleId: "cn-l20-5-teci-lexical-final-i-lengthening",
        formationAuthority: "obligatory-exception",
        sourceValenceMode: "intransitive"
      }), Object.freeze({
        nonactiveStem: "tex-ō",
        suffixFamily: "ō",
        ruleId: "cn-l24-2-teci-transitive-o",
        formationAuthority: "productive-lexical-class-rule",
        andrewsSection: "24.2",
        attestationStatus: "valence-neutral-transitive-nonactive",
        sourceValenceMode: "transitive"
      }), Object.freeze({
        nonactiveStem: "tex-o-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l24-2-teci-transitive-ohua",
        formationAuthority: "optional-variant",
        andrewsSection: "24.2",
        attestationStatus: "valence-neutral-transitive-nonactive",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "tēmi": Object.freeze([Object.freeze({
        nonactiveStem: "tēmi-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-5-temi",
        formationAuthority: "obligatory-exception"
      })]),
      "tiāmiqui": Object.freeze([Object.freeze({
        nonactiveStem: "tiāmic-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-5-tiamique-exception",
        vowelLengthRuleId: "cn-l20-5-tiamiqui-preserve-source-long-a",
        formationAuthority: "obligatory-exception"
      })]),
      "tzahtzi": Object.freeze([Object.freeze({
        nonactiveStem: "tzahtzī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-5-tzahtzi",
        vowelLengthRuleId: "cn-l20-5-tzahtzi-lexical-final-i-lengthening",
        formationAuthority: "obligatory-exception"
      })]),
      "yōli": Object.freeze([Object.freeze({
        nonactiveStem: "yōli-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-6-yoli",
        formationAuthority: "obligatory-exception"
      })]),
      "ya-uh": Object.freeze([Object.freeze({
        nonactiveStem: "hui-lo-hua",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-yauh",
        formationAuthority: "suppletive-lexical-rule"
      })]),
      "ye": Object.freeze([Object.freeze({
        nonactiveStem: "ye-lo-hua",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-ye",
        formationAuthority: "suppletive-lexical-rule"
      })]),
      "zō": Object.freeze([Object.freeze({
        nonactiveStem: "zō-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-6-zo",
        formationAuthority: "productive-rule"
      }), Object.freeze({
        nonactiveStem: "zō-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-6-zo-variant",
        formationAuthority: "optional-variant"
      })])
    });

    // Later Canvas lessons can preserve an additional nonactive base even when it
    // is described as hypothetical, unexpected, obsolete, or causative-source
    // only.  Under the Canvas "more the merrier" policy those witnesses supplement
    // the ordinary Lesson 20 inventory as explicit user options; they never replace
    // the productive/default Lesson 20 result.
    const CLASSICAL_NAHUATL_CROSS_LESSON_NONACTIVE_SUPPLEMENTS = Object.freeze({
      "caqui": Object.freeze([Object.freeze({
        nonactiveStem: "caqui-hua",
        suffixFamily: "hua",
        ruleId: "cn-l25-2-caqui-hua-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.2",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "transitive",
        userSelectable: true
      }), Object.freeze({
        nonactiveStem: "caqui-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-caqui-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "chihcha": Object.freeze([Object.freeze({
        nonactiveStem: "chihchi-hua",
        suffixFamily: "hua",
        ruleId: "cn-l38-1-chihcha-hua-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.1.c",
        attestationStatus: "impersonal-patientive-source-witness",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "chīchi": Object.freeze([Object.freeze({
        nonactiveStem: "chīchi-hua-lō",
        suffixFamily: "hua-lō",
        ruleId: "cn-l38-1-chichi-hua-lo-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.1.d",
        attestationStatus: "impersonal-patientive-source-witness",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "chōca": Object.freeze([Object.freeze({
        nonactiveStem: "chōquī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l25-2-choca-hua-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.2",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      }), Object.freeze({
        nonactiveStem: "chōca-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-choca-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      }), Object.freeze({
        nonactiveStem: "chōqui-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-choqui-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "cāhui": Object.freeze([Object.freeze({
        nonactiveStem: "cāhui-hua",
        suffixFamily: "hua",
        ruleId: "cn-l38-1-cahui-hua-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.3.c",
        attestationStatus: "impersonal-patientive-source-reconstruction",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "cē-hua": Object.freeze([Object.freeze({
        nonactiveStem: "cē-hua-lō",
        suffixFamily: "lō",
        ruleId: "cn-l38-1-cehua-lo-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.1.a",
        attestationStatus: "impersonal-patientive-source-reconstruction",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "cual-ā-ni": Object.freeze([Object.freeze({
        nonactiveStem: "cual-ā-ni-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-cualani-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      }), Object.freeze({
        nonactiveStem: "cual-ā-na-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-cualana-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "icza": Object.freeze([Object.freeze({
        nonactiveStem: "icxi-hua",
        suffixFamily: "hua",
        ruleId: "cn-l37-9-icza-hua-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "37.9.1.c",
        attestationStatus: "passive-patientive-source-witness",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "huica": Object.freeze([Object.freeze({
        nonactiveStem: "huica-lō",
        suffixFamily: "lō",
        ruleId: "cn-l38-1-huica-lo-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.4",
        attestationStatus: "exceptional-impersonal-patientive-source-reconstruction",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "ī": Object.freeze([Object.freeze({
        nonactiveStem: "ī-lō",
        suffixFamily: "lō",
        ruleId: "cn-l38-1-i-lo-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.3.a",
        attestationStatus: "impersonal-patientive-source-reconstruction",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "ichcua": Object.freeze([Object.freeze({
        nonactiveStem: "ichcui-hua",
        suffixFamily: "hua",
        ruleId: "cn-l38-1-ichcua-hua-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.3.c",
        attestationStatus: "impersonal-patientive-source-reconstruction",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "ihyā-ya": Object.freeze([Object.freeze({
        nonactiveStem: "ihye-lō",
        suffixFamily: "lō",
        ruleId: "cn-l38-1-ihyaya-lo-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.1.a",
        attestationStatus: "impersonal-patientive-source-reconstruction-with-vowel-raising",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "ihza": Object.freeze([Object.freeze({
        nonactiveStem: "ihxi-hua",
        suffixFamily: "hua",
        ruleId: "cn-l25-2-ihza-hua-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.2",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      }), Object.freeze({
        nonactiveStem: "ihxi-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-ihza-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "il-hui": Object.freeze([Object.freeze({
        nonactiveStem: "il-huī-lō",
        suffixFamily: "lō",
        ruleId: "cn-l21-2-ilhui-passive-stem",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "21.2.4",
        attestationStatus: "formula-backed-multiple-object-passive-stem",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "imacaci": Object.freeze([Object.freeze({
        nonactiveStem: "imacaxi-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-imacaci-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "iuc-ci": Object.freeze([Object.freeze({
        nonactiveStem: "iuc-xi-hua",
        suffixFamily: "hua",
        ruleId: "cn-l25-2-iucci-hua-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.2",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "itta": Object.freeze([Object.freeze({
        nonactiveStem: "itt-ī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l25-2-itta-hua-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.2",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "transitive",
        userSelectable: true
      }), Object.freeze({
        nonactiveStem: "itz-ti-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-itta-itztli-route",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4.7",
        attestationStatus: "hypothetical-intermediate-verbstem-source",
        sourceValenceMode: "transitive",
        userSelectable: true
      }), Object.freeze({
        nonactiveStem: "it-hu-a-lō",
        suffixFamily: "lō",
        ruleId: "cn-l36-5-itta-ithualo-witness",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "36.5",
        attestationStatus: "formula-backed-passive-stem",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "it-hu-a": Object.freeze([Object.freeze({
        nonactiveStem: "it-hui-hua",
        suffixFamily: "hua",
        ruleId: "cn-l38-1-ithua-hua-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.3.c",
        attestationStatus: "impersonal-patientive-source-reconstruction",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "ixca": Object.freeze([Object.freeze({
        nonactiveStem: "ixqui-hua",
        suffixFamily: "hua",
        ruleId: "cn-l38-1-ixca-hua-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.3.c",
        attestationStatus: "impersonal-patientive-source-reconstruction",
        sourceValenceMode: "transitive",
        userSelectable: true
      }), Object.freeze({
        nonactiveStem: "ixca-lō",
        suffixFamily: "lō",
        ruleId: "cn-l38-1-ixca-lo-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.3.c",
        attestationStatus: "alternate-impersonal-patientive-source-reconstruction",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "ix-tlā-hu-a": Object.freeze([Object.freeze({
        nonactiveStem: "ix-tlā-hu-i-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-ixtlahua-i-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "mahui": Object.freeze([Object.freeze({
        nonactiveStem: "mahu-o-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l25-3-mahui-hypothetical-nonactive-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.3",
        attestationStatus: "hypothetical-nonactive-base-preserved-by-causative",
        allowedSourceValences: Object.freeze(["intransitive"]),
        userSelectable: true
      })]),
      "maca": Object.freeze([Object.freeze({
        nonactiveStem: "maqui-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-maca-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "mamali": Object.freeze([Object.freeze({
        nonactiveStem: "mamalī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l36-6-mamali-hua-witness",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "36.6",
        attestationStatus: "formula-backed-impersonal-stem",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "mati": Object.freeze([Object.freeze({
        nonactiveStem: "machi-hua",
        suffixFamily: "hua",
        ruleId: "cn-l25-2-mati-hua-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.2",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "transitive",
        userSelectable: true
      }), Object.freeze({
        nonactiveStem: "machi-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-mati-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "moh-mōtla": Object.freeze([Object.freeze({
        nonactiveStem: "moh-mōchī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l37-9-mohmotla-hua-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "37.9.1.c",
        attestationStatus: "passive-patientive-source-witness",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "nēci": Object.freeze([Object.freeze({
        nonactiveStem: "nēxi-hua",
        suffixFamily: "hua",
        ruleId: "cn-l25-2-neci-hua-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.2",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "ohza": Object.freeze([Object.freeze({
        nonactiveStem: "ohxi-hua",
        suffixFamily: "hua",
        ruleId: "cn-l37-9-ohza-hua-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "37.9.1.c",
        attestationStatus: "passive-patientive-source-witness",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "ō-ya": Object.freeze([Object.freeze({
        nonactiveStem: "ō-ya-lō",
        suffixFamily: "lō",
        ruleId: "cn-l38-1-oya-full-stem-lo-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.3.a",
        attestationStatus: "full-stem-impersonal-patientive-source-reconstruction",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "on-o": Object.freeze([Object.freeze({
        nonactiveStem: "on-o-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-6-ono-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.6",
        attestationStatus: "presupposed-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "panō": Object.freeze([Object.freeze({
        nonactiveStem: "panō-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-6-pano-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.6",
        attestationStatus: "presupposed-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "pā-tz-ca": Object.freeze([Object.freeze({
        nonactiveStem: "pā-tz-qui-hua",
        suffixFamily: "hua",
        ruleId: "cn-l38-1-patzca-hua-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.3.c",
        attestationStatus: "impersonal-patientive-source-reconstruction",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "piya": Object.freeze([Object.freeze({
        nonactiveStem: "piye-lō",
        suffixFamily: "lō",
        ruleId: "cn-l37-9-piya-piye-lo-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "37.9.1.a",
        attestationStatus: "passive-patientive-vowel-variant-source-reconstruction",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "pix-ca": Object.freeze([Object.freeze({
        nonactiveStem: "pix-qui-hua",
        suffixFamily: "hua",
        ruleId: "cn-l38-1-pixca-hua-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.1.c",
        attestationStatus: "impersonal-patientive-source-witness",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "quēmi": Object.freeze([Object.freeze({
        nonactiveStem: "quēm-o-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l25-3-quemi-ohua-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.3",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "transitive",
        userSelectable: true
      }), Object.freeze({
        nonactiveStem: "quēmi-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-quemi-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "causative-source-witness",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "quetza": Object.freeze([Object.freeze({
        nonactiveStem: "quech-ō",
        suffixFamily: "ō",
        ruleId: "cn-l37-9-quetza-quecho-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "37.9.1.b",
        attestationStatus: "explicit-passive-stem",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "tlacō-ti": Object.freeze([Object.freeze({
        nonactiveStem: "tlacō-ch-ō",
        suffixFamily: "ō",
        ruleId: "cn-l38-1-tlacoti-cho-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.1.b",
        attestationStatus: "explicit-impersonal-stem",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "tlehcō": Object.freeze([Object.freeze({
        nonactiveStem: "tlehcō-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-6-tlehco-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.6",
        attestationStatus: "presupposed-causative-source",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "tzacu-a": Object.freeze([Object.freeze({
        nonactiveStem: "tzacu-i-lō",
        suffixFamily: "lō",
        ruleId: "cn-l25-4-tzacua-lo-base",
        formationAuthority: "hypothetical-causative-source",
        andrewsSection: "25.4",
        attestationStatus: "unexpected-causative-source",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "tzāhua": Object.freeze([Object.freeze({
        nonactiveStem: "tzāhua-lō",
        suffixFamily: "lō",
        ruleId: "cn-l38-1-tzahua-lo-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.1.a",
        attestationStatus: "explicit-impersonal-stem",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "tequi-ti-ā": Object.freeze([Object.freeze({
        nonactiveStem: "tequi-tī-lō",
        suffixFamily: "lō",
        ruleId: "cn-l21-2-tequitia-passive-stem",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "21.2.3",
        attestationStatus: "formula-backed-multiple-object-passive-and-impersonal-stem",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "xō-tla": Object.freeze([Object.freeze({
        nonactiveStem: "xō-chī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l38-1-xotla-hua-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.1.c",
        attestationStatus: "impersonal-patientive-source-witness",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })]),
      "yohua": Object.freeze([Object.freeze({
        nonactiveStem: "yohua-lō",
        suffixFamily: "lō",
        ruleId: "cn-l38-1-yohua-lo-source",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "38.1.1.a",
        attestationStatus: "impersonal-patientive-source-reconstruction",
        sourceValenceMode: "intransitive",
        userSelectable: true
      })])
    });
    function getClassicalNahuatlNonactiveFormationAuthorityLabel(formationAuthority = "") {
      return {
        "optional-variant": "optional variant",
        "obligatory-exception": "obligatory exception",
        "suppletive-lexical-rule": "suppletive rule",
        "productive-lexical-class-rule": "lexically classified rule",
        "shape-licensed-possibility": "shape-licensed possibility",
        "hypothetical-causative-source": "Lesson 25 hypothetical option",
        "later-canvas-source-witness": "later Canvas witness"
      }[formationAuthority] || "rule";
    }
    function getClassicalNahuatlLesson20NonactiveTargetClass(suffixFamily = "", nonactiveStem = "") {
      const normalizedFamily = normalizeClassicalNahuatlVncSlotCarrier(suffixFamily);
      const normalizedStem = normalizeClassicalNahuatlVncSlotStem(nonactiveStem);
      if (["hua", "o-hua", "lo-hua"].includes(normalizedFamily) && /hua$/u.test(normalizedStem)) {
        return "A-1";
      }
      if (["lō", "ō", "hua-lō"].includes(normalizedFamily)) {
        return "A-2";
      }
      return "A";
    }
    function isClassicalNahuatlLesson20PerfectiveEnvironment({
      mood = "",
      tense = ""
    } = {}) {
      const normalizedMood = normalizeClassicalNahuatlVncSlotCarrier(mood).toLowerCase();
      const normalizedTense = normalizeClassicalNahuatlVncSlotCarrier(tense).toLowerCase();
      if (normalizedMood === "admonitive") {
        return true;
      }
      if (normalizedMood === "optative" && ["past", "preterit"].includes(normalizedTense)) {
        return true;
      }
      return ["preterit", "distant-past", "general-past", "past"].includes(normalizedTense);
    }
    function getClassicalNahuatlLesson20FinalShapeTail(units = [], size = 1) {
      return units.slice(Math.max(0, units.length - size)).join("");
    }
    function getClassicalNahuatlLesson20FinalShapeSound(value = "") {
      return normalizeClassicalNahuatlVncSlotCarrier(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
    }
    function buildClassicalNahuatlLesson20StemFinalShapeFrame(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlVncSlotStem(stem);
      const orthographicUnits = Array.from(normalizedStem);
      const letterUnits = orthographicUnits.filter(unit => unit !== "-");
      const morphemes = normalizedStem ? normalizedStem.split("-") : [];
      const rightEdgeMorpheme = morphemes[morphemes.length - 1] || "";
      const precedingMorpheme = morphemes[morphemes.length - 2] || "";
      const finalLetter = letterUnits[letterUnits.length - 1] || "";
      const precedingLetter = letterUnits[letterUnits.length - 2] || "";
      const longVowels = new Set(["ā", "ē", "ī", "ō"]);
      const orthographicTail = Object.freeze({
        one: getClassicalNahuatlLesson20FinalShapeTail(orthographicUnits, 1),
        two: getClassicalNahuatlLesson20FinalShapeTail(orthographicUnits, 2),
        three: getClassicalNahuatlLesson20FinalShapeTail(orthographicUnits, 3)
      });
      const letterTail = Object.freeze({
        one: getClassicalNahuatlLesson20FinalShapeTail(letterUnits, 1),
        two: getClassicalNahuatlLesson20FinalShapeTail(letterUnits, 2),
        three: getClassicalNahuatlLesson20FinalShapeTail(letterUnits, 3)
      });
      const soundTail = Object.freeze({
        one: getClassicalNahuatlLesson20FinalShapeSound(letterTail.one),
        two: getClassicalNahuatlLesson20FinalShapeSound(letterTail.two),
        three: getClassicalNahuatlLesson20FinalShapeSound(letterTail.three)
      });
      const morphemeTail = Object.freeze({
        one: morphemes.slice(-1).join("-"),
        two: morphemes.slice(-2).join("-"),
        three: morphemes.slice(-3).join("-")
      });
      return Object.freeze({
        kind: "classical-nahuatl-lesson20-stem-final-shape-frame",
        version: 1,
        sourceAuthority: "derived-from-active-stem-orthography",
        authorizationStatus: normalizedStem ? "authorized" : "blocked",
        blockReason: normalizedStem ? "" : "lesson20-final-shape-source-stem-required",
        stem: normalizedStem,
        unitLimit: 3,
        orthographicTail,
        letterTail,
        soundTail,
        morphemeTail,
        morphemes: Object.freeze([...morphemes]),
        morphemeCount: morphemes.length,
        rightEdgeMorpheme,
        precedingMorpheme,
        finalLetter,
        precedingLetter,
        finalSound: getClassicalNahuatlLesson20FinalShapeSound(finalLetter),
        precedingSound: getClassicalNahuatlLesson20FinalShapeSound(precedingLetter),
        finalVowelLength: longVowels.has(finalLetter) ? "long" : /^[aeio]$/u.test(finalLetter) ? "short" : "not-vowel",
        finalLetterHasMacron: longVowels.has(finalLetter),
        finalThreeContainsMacron: /[āēīō]/u.test(letterTail.three),
        hasMorphemeBoundary: morphemes.length > 1,
        finalThreeContainsBoundary: orthographicTail.three.includes("-"),
        initialMorpheme: morphemes[0] || ""
      });
    }
    function isClassicalNahuatlLesson20TransitiveValence(sourceValence = "") {
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      return Boolean(normalizedValence && normalizedValence !== "intransitive");
    }
    function buildClassicalNahuatlLesson20ActiveStemIdentityFrame(sourceStem = "", {
      verbClass = "",
      sourceValence = ""
    } = {}) {
      const enteredStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const normalizedClass = normalizeClassicalNahuatlVncSlotCarrier(verbClass).toUpperCase();
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      const sourceFinalShapeFrame = buildClassicalNahuatlLesson20StemFinalShapeFrame(enteredStem);
      const identity = CLASSICAL_NAHUATL_LESSON20_ACTIVE_STEM_IDENTITIES.find(candidate => candidate.allowedAllomorphs.includes(enteredStem)) || null;
      const transitiveSource = isClassicalNahuatlLesson20TransitiveValence(normalizedValence);
      const requestedValenceMode = transitiveSource ? "transitive" : "intransitive";
      const classCompatible = !identity || !normalizedClass || identity.verbClasses.includes(normalizedClass);
      const valenceCompatible = !identity || !normalizedValence || identity.sourceValenceModes.includes(requestedValenceMode);
      const exactNonactiveFormations = identity?.exactNonactiveFormations?.[enteredStem] || [];
      const explicitRootPlusYaBoundary = normalizedClass === "B" && sourceFinalShapeFrame.orthographicTail.three === "-ya";
      const hiddenIntervocalicY = Boolean(identity && /intervocalic-y/u.test(identity.allomorphy));
      const identityResolved = Boolean(identity);
      const allomorphLicenseAuthorized = Boolean(identityResolved && classCompatible && valenceCompatible);
      const exactNonactiveLicenseStatus = exactNonactiveFormations.length && allomorphLicenseAuthorized ? "licensed" : identity?.unresolvedAllomorphs?.[enteredStem] ? "documented-unresolved" : identityResolved && !allomorphLicenseAuthorized ? "context-mismatch" : "none";
      return Object.freeze({
        kind: "classical-nahuatl-lesson20-active-stem-identity-frame",
        version: 1,
        sourceAuthority: identityResolved ? "Andrews active-stem identity and allomorph evidence" : "active imperfective stem shape supplied to the engine",
        authorizationStatus: enteredStem ? "authorized" : "blocked",
        blockReason: enteredStem ? "" : "lesson20-active-source-stem-required",
        enteredStem,
        enteredAllomorph: enteredStem,
        canonicalImperfectiveStem: identity?.canonicalImperfectiveStem || enteredStem,
        lexicalIdentityId: identity?.identityId || "",
        identityResolution: identityResolved ? "licensed-active-identity" : "shape-only-unlisted-identity",
        identityRuleId: identity?.identityRuleId || "",
        allowedAllomorphs: Object.freeze([...(identity?.allowedAllomorphs || [enteredStem].filter(Boolean))]),
        allomorphy: identity?.allomorphy || "none-recorded",
        andrewsSections: Object.freeze([...(identity?.andrewsSections || [])]),
        verbClass: normalizedClass,
        sourceValence: normalizedValence,
        classCompatible,
        valenceCompatible,
        allomorphLicenseAuthorized,
        exactNonactiveLicenseStatus,
        exactNonactiveFormationCount: allomorphLicenseAuthorized ? exactNonactiveFormations.length : 0,
        documentedUnresolvedReason: identity?.unresolvedAllomorphs?.[enteredStem] || "",
        sourceFinalShapeFrame,
        internalMorphology: Object.freeze({
          morphemes: sourceFinalShapeFrame.morphemes,
          hasExplicitBoundary: sourceFinalShapeFrame.hasMorphemeBoundary,
          explicitRootPlusYaBoundary,
          rootPlusYaBoundaryStatus: explicitRootPlusYaBoundary ? "engine-visible-class-b-root-plus-ya" : "not-explicitly-licensed",
          hiddenIntervocalicY,
          finalVowelAllomorph: identityResolved && /final-a-e/u.test(identity.allomorphy) ? sourceFinalShapeFrame.finalLetter : ""
        }),
        exactNonactiveFormations: Object.freeze(allomorphLicenseAuthorized ? exactNonactiveFormations.map(formation => Object.freeze({
          ...formation
        })) : []),
        callerSuppliedIdentityAllowed: false
      });
    }
    function replaceClassicalNahuatlLesson20FinalShape(shapeFrame = null, ending = "", replacement = "") {
      const normalizedEnding = normalizeClassicalNahuatlVncSlotStem(ending);
      const sourceUnits = Array.from(shapeFrame?.stem || "");
      const endingUnits = Array.from(normalizedEnding);
      if (!shapeFrame || shapeFrame.authorizationStatus !== "authorized" || !endingUnits.length) {
        return "";
      }
      const currentEnding = sourceUnits.slice(-endingUnits.length).join("");
      if (currentEnding !== normalizedEnding) {
        return "";
      }
      return `${sourceUnits.slice(0, -endingUnits.length).join("")}${replacement}`;
    }
    function buildClassicalNahuatlLesson20NonactiveFinalShapeRelation(sourceStem = "", nonactiveStem = "", {
      suffixFamily = "",
      ruleId = ""
    } = {}) {
      const sourceFinalShapeFrame = buildClassicalNahuatlLesson20StemFinalShapeFrame(sourceStem);
      const nonactiveFinalShapeFrame = buildClassicalNahuatlLesson20StemFinalShapeFrame(nonactiveStem);
      const sourceUnits = Array.from(sourceFinalShapeFrame.stem);
      const targetUnits = Array.from(nonactiveFinalShapeFrame.stem);
      let commonUnitCount = 0;
      while (commonUnitCount < sourceUnits.length && commonUnitCount < targetUnits.length && sourceUnits[commonUnitCount] === targetUnits[commonUnitCount]) {
        commonUnitCount += 1;
      }
      const retainedStem = sourceUnits.slice(0, commonUnitCount).join("");
      const removedFinalShape = sourceUnits.slice(commonUnitCount).join("");
      const addedFinalShape = targetUnits.slice(commonUnitCount).join("");
      const authorized = Boolean(sourceFinalShapeFrame.authorizationStatus === "authorized" && nonactiveFinalShapeFrame.authorizationStatus === "authorized" && sourceFinalShapeFrame.stem !== nonactiveFinalShapeFrame.stem && normalizeClassicalNahuatlVncSlotCarrier(suffixFamily) && normalizeClassicalNahuatlVncSlotCarrier(ruleId));
      return Object.freeze({
        kind: "classical-nahuatl-lesson20-nonactive-final-shape-relation",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "lesson20-complete-source-target-final-shape-relation-required",
        sourceFinalShapeFrame,
        nonactiveFinalShapeFrame,
        suffixFamily: normalizeClassicalNahuatlVncSlotCarrier(suffixFamily),
        ruleId: normalizeClassicalNahuatlVncSlotCarrier(ruleId),
        retainedStem,
        removedFinalShape,
        addedFinalShape,
        replacementShape: `${removedFinalShape || "∅"} > ${addedFinalShape || "∅"}`,
        macronChange: sourceFinalShapeFrame.letterTail.three !== nonactiveFinalShapeFrame.letterTail.three && (sourceFinalShapeFrame.finalThreeContainsMacron || nonactiveFinalShapeFrame.finalThreeContainsMacron),
        boundaryChange: sourceFinalShapeFrame.hasMorphemeBoundary !== nonactiveFinalShapeFrame.hasMorphemeBoundary || removedFinalShape.includes("-") || addedFinalShape.includes("-"),
        shapeAuthority: "computed-from-generated-source-and-target-stems",
        callerSuppliedShapeAllowed: false
      });
    }
    function getClassicalNahuatlLesson20NonactiveFormationStructure(suffixFamily = "", nonactiveFinalShapeFrame = null) {
      const surfaceFamily = normalizeClassicalNahuatlVncSlotCarrier(suffixFamily);
      const specification = CLASSICAL_NAHUATL_NONACTIVE_FORMATION_STRUCTURES[surfaceFamily] || null;
      if (!specification) {
        return Object.freeze({
          kind: "classical-nahuatl-lesson20-nonactive-formation-structure",
          version: 1,
          authorizationStatus: "blocked",
          blockReason: "lesson20-unknown-nonactive-formation-family",
          surfaceFamily,
          formationCore: "",
          continuation: "",
          sequence: Object.freeze([]),
          surfaceAllomorph: ""
        });
      }
      const targetShape = nonactiveFinalShapeFrame?.authorizationStatus === "authorized" ? nonactiveFinalShapeFrame : null;
      const finalMorpheme = targetShape?.morphemeTail?.one || "";
      const familyMorphemes = finalMorpheme === "tz" ? (targetShape?.morphemes || []).slice(-3, -1) : (targetShape?.morphemes || []).slice(-2);
      const extendedCoreSurface = familyMorphemes[0] || "";
      const surfaceAllomorph = surfaceFamily === "o-hua" && /ō$/u.test(extendedCoreSurface) ? "ō-hua" : surfaceFamily;
      return Object.freeze({
        kind: "classical-nahuatl-lesson20-nonactive-formation-structure",
        version: 1,
        sourceAuthority: "Andrews Lesson 20 three-core nonactive system",
        authorizationStatus: "authorized",
        blockReason: "",
        surfaceFamily,
        formationCore: specification.formationCore,
        continuation: specification.continuation,
        sequence: specification.sequence,
        isExtended: specification.continuation !== "terminal",
        surfaceAllomorph,
        terminalCore: specification.sequence[specification.sequence.length - 1],
        familyIsSurfaceRealizationNotIndependentCore: true
      });
    }
    function doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily(shapeFrame = null, suffixFamily = "") {
      if (!shapeFrame || shapeFrame.authorizationStatus !== "authorized") {
        return false;
      }
      const formationStructure = getClassicalNahuatlLesson20NonactiveFormationStructure(suffixFamily, shapeFrame);
      if (formationStructure.authorizationStatus !== "authorized") {
        return false;
      }
      const formationCore = formationStructure.formationCore;
      const continuation = formationStructure.continuation;
      const finalMorpheme = shapeFrame.morphemeTail.one;
      const finalTwoMorphemes = shapeFrame.morphemeTail.two;
      if (formationCore === "lo" && continuation === "terminal") {
        return finalMorpheme === "lō" || shapeFrame.letterTail.two === "lō";
      }
      if (formationCore === "o" && continuation === "terminal") {
        return shapeFrame.finalLetter === "ō";
      }
      if (formationCore === "hua" && continuation === "terminal") {
        return shapeFrame.letterTail.three === "hua";
      }
      if (formationCore === "o" && continuation === "hua") {
        const familyMorphemes = finalMorpheme === "tz" ? shapeFrame.morphemes.slice(-3, -1) : shapeFrame.morphemes.slice(-2);
        const familyOnset = familyMorphemes[0] || "";
        return familyMorphemes[1] === "hua" && /[oō]$/u.test(familyOnset);
      }
      if (formationCore === "lo" && continuation === "hua") {
        const familyMorphemes = finalMorpheme === "tz" ? shapeFrame.morphemes.slice(-3, -1) : shapeFrame.morphemes.slice(-2);
        return familyMorphemes[1] === "hua" && /lo$/u.test(familyMorphemes[0] || "");
      }
      if (formationCore === "hua" && continuation === "lo") {
        return finalTwoMorphemes === "hua-lō";
      }
      return false;
    }

    // Andrews §20.2 states the Class C operation over final i + ā, but vowel
    // length belongs to the active source identity.  The PDF distinguishes the
    // two lengthening witnesses from the short-i witnesses; this table classifies
    // the source, while the rule below (not the table) constructs the output.
    const CLASSICAL_NAHUATL_LESSON20_CLASS_C_FINAL_I_LENGTH_CLASSES = Object.freeze({
      "ce-liā": "lengthen-final-i",
      "ihcuani-ā": "lengthen-final-i",
      "tla-ti-ā": "preserve-short-final-i",
      "icn-ēl-iā": "preserve-short-final-i",
      "tlā-ti-ā": "preserve-short-final-i"
    });

    // tequi-ti is the §20.6 final-i + hua formation.  Its visible -ti boundary is
    // not the §20.4 postvocalic-ti replacive route licensed for stems such as
    // pa-ti; keep that lexical/morphological distinction engine-owned.
    const CLASSICAL_NAHUATL_LESSON20_POSTVOCALIC_TI_CHO_EXCLUSIONS = Object.freeze(["tequi-ti"]);
    function buildClassicalNahuatlLesson20ClassCFinalIVowelLengthRuleFrame(sourceStem = "") {
      const sourceFinalShapeFrame = buildClassicalNahuatlLesson20StemFinalShapeFrame(sourceStem);
      const normalizedSourceStem = sourceFinalShapeFrame.stem;
      const sourceEnding = sourceFinalShapeFrame.orthographicTail.three === "i-ā" ? "i-ā" : sourceFinalShapeFrame.letterTail.two === "iā" ? "iā" : "";
      const lengthClass = CLASSICAL_NAHUATL_LESSON20_CLASS_C_FINAL_I_LENGTH_CLASSES[normalizedSourceStem] || "preserve-short-final-i";
      const realizedBaseFinalVowel = lengthClass === "lengthen-final-i" ? "ī" : "i";
      const authorized = Boolean(normalizedSourceStem && sourceEnding);
      return Object.freeze({
        kind: "classical-nahuatl-lesson20-class-c-final-i-vowel-length-rule-frame",
        version: 1,
        sourceAuthority: "Andrews §20.2 visually verified Class C source classes",
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "lesson20-class-c-final-i-a-shape-required",
        sourceStem: normalizedSourceStem,
        sourceEnding,
        sourceLengthClass: lengthClass,
        operation: lengthClass === "lengthen-final-i" ? "replace-final-i-plus-a-with-long-i-plus-lo" : "replace-final-i-plus-a-with-short-i-plus-lo",
        realizedBaseFinalVowel,
        realizedEnding: `${realizedBaseFinalVowel}-lō`,
        ruleId: lengthClass === "lengthen-final-i" ? "cn-l20-2-class-c-final-i-lengthening" : "cn-l20-2-class-c-final-i-short",
        directSurfaceStringAuthority: false
      });
    }
    function buildClassicalNahuatlLesson20FinalIOHuaVowelLengthRuleFrame(sourceStem = "") {
      const sourceFinalShapeFrame = buildClassicalNahuatlLesson20StemFinalShapeFrame(sourceStem);
      const sourceFinalVowel = sourceFinalShapeFrame.finalLetter;
      const authorized = ["i", "ī", "o", "ō"].includes(sourceFinalVowel);
      const lengthensShortI = sourceFinalVowel === "i";
      return Object.freeze({
        kind: "classical-nahuatl-lesson20-final-i-o-hua-vowel-length-rule-frame",
        version: 1,
        sourceAuthority: "Andrews §20.6 visually verified final-i/o + hua rule",
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "lesson20-final-i-o-shape-required",
        sourceStem: sourceFinalShapeFrame.stem,
        sourceFinalVowel,
        operation: lengthensShortI ? "lengthen-short-final-i-before-hua" : "preserve-source-final-vowel-before-hua",
        realizedFinalVowel: lengthensShortI ? "ī" : sourceFinalVowel,
        ruleId: lengthensShortI ? "cn-l20-6-short-final-i-lengthening-before-hua" : "cn-l20-6-preserve-final-long-i-or-o-before-hua",
        directSurfaceStringAuthority: false
      });
    }
    function buildClassicalNahuatlLesson20ProductiveCandidateSet(sourceStem = "", {
      verbClass = "",
      sourceValence = ""
    } = {}) {
      const sourceFinalShapeFrame = buildClassicalNahuatlLesson20StemFinalShapeFrame(sourceStem);
      const normalizedSourceStem = sourceFinalShapeFrame.stem;
      const normalizedClass = normalizeClassicalNahuatlVncSlotCarrier(verbClass).toUpperCase();
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      const finalLetters = sourceFinalShapeFrame.letterTail;
      const finalOrthography = sourceFinalShapeFrame.orthographicTail;
      const transitiveSource = isClassicalNahuatlLesson20TransitiveValence(normalizedValence);
      const orderedVoiceLayerIntermediate = isClassicalNahuatlOrderedVoiceLayerIntermediateStem(normalizedSourceStem);
      const routeEvaluations = [];
      const addRoute = (applies, decisionCategory, priority, options = []) => {
        if (!applies || orderedVoiceLayerIntermediate) {
          return;
        }
        const candidates = options.filter(option => option?.nonactiveStem && option?.suffixFamily && option?.ruleId).map(option => ({
          ...option,
          candidateSource: "productive-final-shape",
          decisionCategory,
          candidatePriority: priority
        }));
        if (candidates.length) {
          routeEvaluations.push({
            decisionCategory,
            priority,
            candidates
          });
        }
      };
      addRoute(normalizedSourceStem && normalizedClass === "B" && finalOrthography.three === "-ya", "class-b-explicit-root-plus-ya", 600, [{
        nonactiveStem: `${replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "-ya", "")}-lō`,
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-b-root-plus-ya-deletion",
        formationAuthority: "productive-rule",
        vowelLengthRuleFrame: Object.freeze({
          kind: "classical-nahuatl-lesson20-root-vowel-preservation-rule-frame",
          authorizationStatus: "authorized",
          operation: "delete-final-ya-and-preserve-root-vowel-length",
          sourceStem: normalizedSourceStem,
          ruleId: "cn-l20-2-class-b-preserve-root-vowel-length",
          directSurfaceStringAuthority: false
        })
      }]);
      if (normalizedSourceStem && transitiveSource) {
        addRoute(finalLetters.three === "cui", "transitive-final-cui", 520, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "cui", "c-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-cui",
          formationAuthority: "productive-rule"
        }]);
        addRoute(finalLetters.two === "ta", "transitive-final-ta", 510, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "a", "-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-ta",
          formationAuthority: "productive-rule"
        }]);
        addRoute(/^[aeioāēīō]ti$/u.test(finalLetters.three), "transitive-postvocalic-ti", 500, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "ti", "ch-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-postvocalic-ti",
          formationAuthority: "productive-rule"
        }]);
        addRoute(["ca", "ka", "cā", "kā"].includes(finalLetters.two), "transitive-final-ka", 490, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, sourceFinalShapeFrame.finalLetter, "-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-ka",
          formationAuthority: "productive-rule"
        }]);
        addRoute(finalLetters.two === "na", "transitive-final-na", 480, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "a", "-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-na",
          formationAuthority: "productive-rule"
        }, {
          nonactiveStem: `${normalizedSourceStem}-lō`,
          suffixFamily: "lō",
          ruleId: "cn-l20-4-final-na-lo-variant",
          formationAuthority: "optional-variant"
        }]);
        addRoute(["za", "sa"].includes(finalLetters.two), "transitive-final-sa", 480, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, finalLetters.two, "x-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-sa",
          formationAuthority: "productive-rule"
        }, {
          nonactiveStem: `${normalizedSourceStem}-lō`,
          suffixFamily: "lō",
          ruleId: "cn-l20-4-final-sa-lo-variant",
          formationAuthority: "optional-variant"
        }]);
        const transitiveQuiEnding = finalLetters.three === "qui" ? "qui" : finalLetters.two === "ki" ? "ki" : "";
        addRoute(Boolean(transitiveQuiEnding), "transitive-final-qui", 480, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, transitiveQuiEnding, transitiveQuiEnding === "qui" ? "c-ō" : "k-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-qui",
          formationAuthority: "productive-rule"
        }]);
        addRoute(finalLetters.two === "ni", "transitive-final-ni", 480, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "i", "-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-ni",
          formationAuthority: "productive-rule"
        }, {
          nonactiveStem: `${normalizedSourceStem}-lō`,
          suffixFamily: "lō",
          ruleId: "cn-l20-4-final-ni-lo-variant",
          formationAuthority: "optional-variant"
        }]);
        addRoute(["ci", "zi", "si"].includes(finalLetters.two), "transitive-final-si", 480, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, finalLetters.two, "x-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-si",
          formationAuthority: "productive-rule"
        }]);
      }
      if (normalizedSourceStem && normalizedClass === "C") {
        addRoute(finalOrthography.three === "o-ā", "class-c-final-o-a", 450, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "o-ā", "ō-lō"),
          suffixFamily: "lō",
          ruleId: "cn-l20-2-class-c-o-a",
          formationAuthority: "productive-rule"
        }]);
        const classCFinalIa = finalOrthography.three === "i-ā" || finalLetters.two === "iā";
        const classCVowelLengthRuleFrame = buildClassicalNahuatlLesson20ClassCFinalIVowelLengthRuleFrame(normalizedSourceStem);
        addRoute(classCFinalIa, "class-c-final-ia", 450, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, classCVowelLengthRuleFrame.sourceEnding, classCVowelLengthRuleFrame.realizedEnding),
          suffixFamily: "lō",
          ruleId: classCVowelLengthRuleFrame.ruleId,
          formationAuthority: "productive-rule",
          vowelLengthRuleFrame: classCVowelLengthRuleFrame
        }]);
      }
      addRoute(normalizedSourceStem && normalizedClass === "D" && sourceFinalShapeFrame.finalLetter === "ā", "class-d-reduced-long-a", 450, [{
        nonactiveStem: `${replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "ā", "a")}-lō`,
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-d-reduced-long-before-lo",
        formationAuthority: "productive-rule"
      }]);
      if (normalizedSourceStem && !transitiveSource) {
        addRoute(["ca", "ka"].includes(finalLetters.two), "intransitive-final-ka", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "a", "-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-ca",
          formationAuthority: "productive-rule"
        }]);
        const intransitiveQuiEnding = finalLetters.three === "qui" ? "qui" : finalLetters.two === "ki" ? "ki" : "";
        addRoute(Boolean(intransitiveQuiEnding), "intransitive-final-qui", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, intransitiveQuiEnding, intransitiveQuiEnding === "qui" ? "c-o-hua" : "k-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-qui",
          formationAuthority: "productive-rule"
        }]);
        addRoute(finalLetters.two === "mi", "intransitive-final-mi", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "mi", "m-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-mi",
          formationAuthority: "productive-rule"
        }]);
        addRoute(["za", "sa"].includes(finalLetters.two), "intransitive-final-sa", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, finalLetters.two, "x-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-za",
          formationAuthority: "productive-rule"
        }]);
        addRoute(finalLetters.three === "tzi", "intransitive-final-tzi", 410, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "tzi", "ch-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-tzi",
          formationAuthority: "productive-rule"
        }]);
        addRoute(["ci", "zi", "si"].includes(finalLetters.two), "intransitive-final-si", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, finalLetters.two, "x-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-ci",
          formationAuthority: "productive-rule"
        }]);
        const intransitiveWEnding = ["hua", "hui"].includes(finalLetters.three) ? finalLetters.three : ["wa", "wi"].includes(finalLetters.two) ? finalLetters.two : "";
        const finalWReplacementWouldCreateAdjacentO = Boolean(intransitiveWEnding && /[oō]-?(?:hua|hui)$/u.test(normalizedSourceStem));
        addRoute(Boolean(intransitiveWEnding) && !finalWReplacementWouldCreateAdjacentO, "intransitive-final-w", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, intransitiveWEnding, "ō-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-w",
          formationAuthority: "productive-rule"
        }]);
        const intransitivePostvocalicTi = /^[aeioāēīō]ti$/u.test(finalLetters.three) && sourceFinalShapeFrame.initialMorpheme !== "tla" && !CLASSICAL_NAHUATL_LESSON20_POSTVOCALIC_TI_CHO_EXCLUSIONS.includes(normalizedSourceStem);
        addRoute(intransitivePostvocalicTi, "intransitive-postvocalic-ti", 420, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "i", "ī-hua"),
          suffixFamily: "hua",
          ruleId: "cn-l20-6-intransitive-postvocalic-ti-hua",
          formationAuthority: "productive-rule"
        }, {
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "ti", "ch-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-intransitive-postvocalic-ti-cho-possibility",
          formationAuthority: "shape-licensed-possibility",
          userSelectable: true
        }]);
        addRoute(finalLetters.two === "ni", "intransitive-final-ni", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "i", "ī-hua"),
          suffixFamily: "hua",
          ruleId: "cn-l20-6-intransitive-final-ni-hua",
          formationAuthority: "productive-rule"
        }, {
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "ni", "n-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-ni-ohua-possibility",
          formationAuthority: "shape-licensed-possibility",
          userSelectable: true
        }]);
      }
      addRoute(normalizedSourceStem && ["a", "ā"].includes(sourceFinalShapeFrame.finalLetter), "general-final-a", 100, [{
        nonactiveStem: `${sourceFinalShapeFrame.finalLetter === "ā" ? replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "ā", "a") : normalizedSourceStem}-lō`,
        suffixFamily: "lō",
        ruleId: "cn-l20-2-final-a",
        formationAuthority: "productive-rule"
      }]);
      const finalIOHuaVowelLengthRuleFrame = buildClassicalNahuatlLesson20FinalIOHuaVowelLengthRuleFrame(normalizedSourceStem);
      addRoute(normalizedSourceStem && finalIOHuaVowelLengthRuleFrame.authorizationStatus === "authorized", "general-final-i-o", 100, [{
        nonactiveStem: finalIOHuaVowelLengthRuleFrame.operation === "lengthen-short-final-i-before-hua" ? replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "i", "ī-hua") : `${normalizedSourceStem}-hua`,
        suffixFamily: "hua",
        ruleId: "cn-l20-6-final-i-o",
        formationAuthority: "productive-rule",
        vowelLengthRuleFrame: finalIOHuaVowelLengthRuleFrame
      }]);
      const highestPriority = routeEvaluations.reduce((current, evaluation) => Math.max(current, evaluation.priority), 0);
      const resolvedOptions = routeEvaluations.filter(evaluation => evaluation.priority === highestPriority).flatMap(evaluation => evaluation.candidates);
      const typedRouteEvaluations = routeEvaluations.map(evaluation => Object.freeze({
        decisionCategory: evaluation.decisionCategory,
        priority: evaluation.priority,
        resolution: evaluation.priority === highestPriority ? "selected" : "superseded-by-more-specific-rule",
        candidateCount: evaluation.candidates.length,
        candidates: Object.freeze(evaluation.candidates.map(candidate => Object.freeze({
          ...candidate
        })))
      }));
      return Object.freeze({
        kind: "classical-nahuatl-lesson20-productive-candidate-set",
        version: 1,
        sourceStem: normalizedSourceStem,
        verbClass: normalizedClass,
        sourceValence: normalizedValence,
        sourceFinalShapeFrame,
        orderedVoiceLayerIntermediate,
        candidateResolutionPolicy: "collect-all-applicable-routes-then-keep-highest-specificity-tier",
        routeEvaluations: Object.freeze(typedRouteEvaluations),
        highestPriority,
        resolvedOptions: Object.freeze(resolvedOptions.map(option => Object.freeze({
          ...option
        })))
      });
    }
    function buildClassicalNahuatlLesson20ProductiveOptions(sourceStem = "", options = {}) {
      return buildClassicalNahuatlLesson20ProductiveCandidateSet(sourceStem, options).resolvedOptions;
    }
    function filterClassicalNahuatlLesson20FormationsForContext(formations = [], {
      sourceValence = ""
    } = {}) {
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      const transitiveSource = isClassicalNahuatlLesson20TransitiveValence(normalizedValence);
      return formations.filter(option => !normalizedValence || option.sourceValenceMode !== "intransitive" || !transitiveSource).filter(option => !normalizedValence || option.sourceValenceMode !== "transitive" || transitiveSource).filter(option => !option.allowedSourceValences?.length || option.allowedSourceValences.includes(normalizedValence));
    }
    function getClassicalNahuatlLesson20NonactiveUnresolvedReason(identityFrame = null) {
      if (identityFrame?.exactNonactiveLicenseStatus === "documented-unresolved") {
        return "lesson20-active-allomorph-nonactive-formation-documented-unresolved";
      }
      if (identityFrame?.exactNonactiveLicenseStatus === "context-mismatch") {
        return "lesson20-active-allomorph-context-mismatch";
      }
      if (["e", "ē"].includes(identityFrame?.sourceFinalShapeFrame?.finalLetter)) {
        return "lesson20-final-e-requires-licensed-active-identity-and-nonactive-witness";
      }
      if (identityFrame?.sourceFinalShapeFrame?.finalVowelLength === "not-vowel") {
        return "lesson20-consonant-final-source-requires-lexical-or-suppletive-license";
      }
      return "lesson20-no-rule-derived-nonactive-formation";
    }
    function buildClassicalNahuatlLesson20NonactiveCandidateLattice(sourceStem = "", {
      verbClass = "",
      sourceValence = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const normalizedClass = normalizeClassicalNahuatlVncSlotCarrier(verbClass).toUpperCase();
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      const sourceIdentityFrame = buildClassicalNahuatlLesson20ActiveStemIdentityFrame(normalizedSourceStem, {
        verbClass: normalizedClass,
        sourceValence: normalizedValence
      });
      const sourceFinalShapeFrame = sourceIdentityFrame.sourceFinalShapeFrame;
      const contextualFixedFormations = filterClassicalNahuatlLesson20FormationsForContext(CLASSICAL_NAHUATL_LESSON20_FIXED_FORMATIONS[normalizedSourceStem] || [], {
        sourceValence: normalizedValence
      });
      const fixedCandidates = contextualFixedFormations.filter(option => option.formationAuthority !== "optional-variant").map(option => ({
        ...option,
        candidateSource: "exact-lesson20-formation",
        decisionCategory: "exact-fixed-formation",
        candidatePriority: 1000
      }));
      const lesson20AlternativeCandidates = contextualFixedFormations.filter(option => option.formationAuthority === "optional-variant").map(option => ({
        ...option,
        candidateSource: "lesson20-licensed-alternative",
        decisionCategory: "lesson20-licensed-alternative",
        candidatePriority: 800,
        userSelectable: true
      }));
      const identityCandidates = sourceIdentityFrame.exactNonactiveFormations.map(option => ({
        ...option,
        candidateSource: "licensed-active-allomorph",
        decisionCategory: "licensed-active-allomorph-formation",
        candidatePriority: 900,
        identityRuleId: sourceIdentityFrame.identityRuleId
      }));
      const productiveCandidateSet = buildClassicalNahuatlLesson20ProductiveCandidateSet(normalizedSourceStem, {
        verbClass: normalizedClass,
        sourceValence: normalizedValence
      });
      let baseResolutionSource = "productive-final-shape";
      let baseCandidates = [...productiveCandidateSet.resolvedOptions];
      if (identityCandidates.length) {
        baseResolutionSource = "licensed-active-allomorph";
        baseCandidates = identityCandidates;
      }
      if (fixedCandidates.length) {
        baseResolutionSource = "exact-lesson20-formation";
        baseCandidates = fixedCandidates;
      }
      const transitiveSource = isClassicalNahuatlLesson20TransitiveValence(normalizedValence);
      const fixedSupplementalCandidates = baseCandidates.length ? filterClassicalNahuatlLesson20FormationsForContext(CLASSICAL_NAHUATL_CROSS_LESSON_NONACTIVE_SUPPLEMENTS[normalizedSourceStem] || [], {
        sourceValence: normalizedValence
      }).map(option => ({
        ...option,
        candidateSource: "cross-lesson-supplement",
        decisionCategory: "licensed-cross-lesson-supplement",
        candidatePriority: 200
      })) : [];
      const productiveSupplementalCandidates = baseCandidates.length && !transitiveSource && sourceFinalShapeFrame.morphemeTail.two === "a-ca" ? [{
        nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "ca", "c-ō"),
        suffixFamily: "ō",
        ruleId: "cn-l27-4-frequentative-destockal-ca-o",
        formationAuthority: "later-canvas-source-witness",
        andrewsSection: "27.4.1",
        attestationStatus: "productive-frequentative-destockal-nonactive",
        userSelectable: true,
        candidateSource: "cross-lesson-productive-supplement",
        decisionCategory: "frequentative-destockal-supplement",
        candidatePriority: 200
      }] : [];
      const supplementalCandidates = [...(baseCandidates.length ? lesson20AlternativeCandidates : []), ...fixedSupplementalCandidates, ...productiveSupplementalCandidates];
      const resolvedCandidates = [...baseCandidates];
      supplementalCandidates.forEach(option => {
        const existingIndex = resolvedCandidates.findIndex(candidate => candidate.nonactiveStem === option.nonactiveStem && candidate.suffixFamily === option.suffixFamily);
        if (existingIndex < 0) {
          resolvedCandidates.push(option);
          return;
        }
        const baseCandidate = resolvedCandidates[existingIndex];
        const preserveLesson20Alternative = baseCandidate.candidateSource === "lesson20-licensed-alternative";
        resolvedCandidates[existingIndex] = {
          ...(preserveLesson20Alternative ? option : baseCandidate),
          ...(preserveLesson20Alternative ? baseCandidate : option),
          candidateSource: "base-plus-cross-lesson-witness",
          candidateRoutes: Object.freeze([baseCandidate.candidateSource, option.candidateSource]),
          supportingProductiveRuleId: baseCandidate.ruleId,
          supportingProductiveFormationAuthority: baseCandidate.formationAuthority,
          userSelectable: option.userSelectable === true || baseCandidate.userSelectable === true
        };
      });
      const resolutionStatus = resolvedCandidates.length > 1 ? "selectable-alternatives" : resolvedCandidates.length === 1 ? "determinate" : "documented-unresolved";
      const unresolvedReason = resolvedCandidates.length ? "" : getClassicalNahuatlLesson20NonactiveUnresolvedReason(sourceIdentityFrame);
      const candidateChannels = Object.freeze([Object.freeze({
        channel: "exact-lesson20-formation",
        candidateCount: fixedCandidates.length,
        resolution: baseResolutionSource === "exact-lesson20-formation" ? "selected" : "not-selected"
      }), Object.freeze({
        channel: "lesson20-licensed-alternative",
        candidateCount: lesson20AlternativeCandidates.length,
        resolution: baseCandidates.length && lesson20AlternativeCandidates.length ? "merged-as-user-options" : "not-applicable"
      }), Object.freeze({
        channel: "licensed-active-allomorph",
        candidateCount: identityCandidates.length,
        resolution: baseResolutionSource === "licensed-active-allomorph" ? "selected" : "not-selected"
      }), Object.freeze({
        channel: "productive-final-shape",
        candidateCount: productiveCandidateSet.resolvedOptions.length,
        resolution: baseResolutionSource === "productive-final-shape" && baseCandidates.length ? "selected" : productiveCandidateSet.resolvedOptions.length ? "superseded" : "not-applicable"
      }), Object.freeze({
        channel: "cross-lesson-supplement",
        candidateCount: supplementalCandidates.length,
        resolution: supplementalCandidates.length ? "merged-as-user-options" : "not-applicable"
      })]);
      return Object.freeze({
        kind: "classical-nahuatl-lesson20-nonactive-candidate-lattice",
        version: 1,
        sourceAuthority: "Andrews active identity, class, valence, internal morphology, and final shape",
        sourceStem: normalizedSourceStem,
        verbClass: normalizedClass,
        sourceValence: normalizedValence,
        sourceIdentityFrame,
        sourceFinalShapeFrame,
        productiveCandidateSet,
        candidateChannels,
        baseResolutionSource,
        resolutionStatus,
        unresolvedReason,
        authorizationStatus: resolvedCandidates.length ? "authorized" : "blocked",
        resolvedCandidateCount: resolvedCandidates.length,
        resolvedCandidates: Object.freeze(resolvedCandidates.map(candidate => Object.freeze({
          ...candidate
        }))),
        userSuppliedCandidateAllowed: false
      });
    }
    function getClassicalNahuatlLesson20NonactiveStemOptions(sourceStem = "", {
      verbClass = "",
      sourceValence = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const normalizedClass = normalizeClassicalNahuatlVncSlotCarrier(verbClass).toUpperCase();
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      const candidateLattice = buildClassicalNahuatlLesson20NonactiveCandidateLattice(normalizedSourceStem, {
        verbClass: normalizedClass,
        sourceValence: normalizedValence
      });
      const sourceIdentityFrame = candidateLattice.sourceIdentityFrame;
      const sourceFinalShapeFrame = candidateLattice.sourceFinalShapeFrame;
      const derivedOptions = [...candidateLattice.resolvedCandidates];
      const selectorRequired = derivedOptions.length > 1;
      const options = derivedOptions.map((option, index) => {
        const finalShapeRelation = buildClassicalNahuatlLesson20NonactiveFinalShapeRelation(normalizedSourceStem, option.nonactiveStem, {
          suffixFamily: option.suffixFamily,
          ruleId: option.ruleId
        });
        const formationStructure = getClassicalNahuatlLesson20NonactiveFormationStructure(option.suffixFamily, finalShapeRelation.nonactiveFinalShapeFrame);
        return Object.freeze({
          kind: "classical-nahuatl-lesson20-nonactive-option",
          optionId: `${option.suffixFamily}:${option.nonactiveStem}`,
          label: `${option.nonactiveStem} (${option.suffixFamily} · ${getClassicalNahuatlNonactiveFormationAuthorityLabel(option.formationAuthority)})`,
          nonactiveStem: option.nonactiveStem,
          suffixFamily: option.suffixFamily,
          ruleId: option.ruleId,
          formationAuthority: option.formationAuthority || "productive-rule",
          candidateSource: option.candidateSource || "productive-final-shape",
          candidateRoutes: option.candidateRoutes || Object.freeze([option.candidateSource || "productive-final-shape"]),
          decisionCategory: option.decisionCategory || "licensed-nonactive-formation",
          candidatePriority: option.candidatePriority || 0,
          identityRuleId: option.identityRuleId || sourceIdentityFrame.identityRuleId,
          supportingProductiveRuleId: option.supportingProductiveRuleId || "",
          supportingProductiveFormationAuthority: option.supportingProductiveFormationAuthority || "",
          vowelLengthRuleId: option.vowelLengthRuleId || option.vowelLengthRuleFrame?.ruleId || "",
          vowelLengthRuleFrame: option.vowelLengthRuleFrame || null,
          attachmentSite: option.attachmentSite || "whole-stem-right-edge",
          andrewsSection: option.andrewsSection || "20",
          attestationStatus: option.attestationStatus || "lesson20-licensed-formation",
          imperfectiveNonactiveStem: option.nonactiveStem,
          perfectiveNonactiveStem: option.perfectiveNonactiveStem || option.nonactiveStem,
          targetClass: option.targetClass || getClassicalNahuatlLesson20NonactiveTargetClass(option.suffixFamily, option.nonactiveStem),
          sourceFinalShapeFrame: finalShapeRelation.sourceFinalShapeFrame,
          sourceIdentityFrame,
          sourceInternalMorphology: sourceIdentityFrame.internalMorphology,
          nonactiveFinalShapeFrame: finalShapeRelation.nonactiveFinalShapeFrame,
          finalShapeRelation,
          formationStructure,
          formationCore: formationStructure.formationCore,
          formationContinuation: formationStructure.continuation,
          formationSequence: formationStructure.sequence,
          surfaceFamilyIsRealization: true,
          optionRole: selectorRequired ? "user-choice" : "determinate",
          optionalForUser: selectorRequired,
          isDefault: false,
          variantIndex: index,
          variantStatus: selectorRequired ? "andrews-licensed-user-option" : option.formationAuthority === "obligatory-exception" ? "obligatory-exception" : "single-rule-derived-formation"
        });
      });
      return {
        kind: "classical-nahuatl-lesson20-nonactive-option-inventory",
        version: 6,
        lesson: "Andrews Lesson 20 with later Canvas supplements",
        sourceAuthority: "Andrews transcription",
        sourceStem: normalizedSourceStem,
        sourceIdentityFrame,
        sourceFinalShapeFrame,
        candidateLattice,
        candidateResolutionStatus: candidateLattice.resolutionStatus,
        candidateResolutionSource: candidateLattice.baseResolutionSource,
        finalShapeDecisionAuthority: "typed-active-identity-internal-morphology-final-shape-class-valence-and-licensed-exceptions",
        formationCoreAuthority: "andrews-three-core-system-with-six-surface-realizations",
        formationCores: CLASSICAL_NAHUATL_NONACTIVE_FORMATION_CORES,
        finalShapeUnitLimit: 3,
        macronAndHyphenPreserved: true,
        sourceValence: normalizedValence,
        verbClass: normalizedClass,
        authorizationStatus: options.length ? "authorized" : "blocked",
        blockReason: options.length ? "" : candidateLattice.unresolvedReason,
        options,
        defaultOptionId: "",
        automaticOptionId: selectorRequired ? "" : options[0]?.optionId || "",
        selectorRequired,
        selectionRequired: selectorRequired,
        alternativeSelectionPolicy: "explicit-user-choice-required-no-default",
        exceptionSelectionPolicy: "all-canvas-witnessed-alternatives-including-hypothetical-bases-are-user-selectable",
        userSuppliedDerivedStemAllowed: false
      };
    }
    function deriveClassicalNahuatlLesson20NonactiveStemRecord(sourceStem = "", {
      verbClass = "",
      sourceValence = "",
      optionId = "",
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const inventory = getClassicalNahuatlLesson20NonactiveStemOptions(sourceStem, {
        verbClass,
        sourceValence
      });
      const normalizedOptionId = normalizeClassicalNahuatlVncSlotCarrier(optionId);
      const generatedOptionRequested = Boolean(normalizedOptionId);
      const selectedOption = normalizedOptionId ? inventory.options.find(option => option.optionId === normalizedOptionId) || null : inventory.selectionRequired ? null : inventory.options[0] || null;
      const record = finalizeClassicalNahuatlLesson20NonactiveStemRecord(sourceStem, {
        selectedOption,
        formulaArtifact,
        surfaceArtifact
      });
      return {
        ...record,
        blockReason: inventory.authorizationStatus === "blocked" ? inventory.blockReason : inventory.selectionRequired && !normalizedOptionId ? "lesson20-nonactive-option-selection-required" : generatedOptionRequested && !selectedOption ? "lesson20-selected-option-was-not-generated" : record.blockReason,
        optionInventory: inventory,
        selectedOptionId: selectedOption?.optionId || "",
        selectedRuleId: selectedOption?.ruleId || "",
        selectedFormationAuthority: selectedOption?.formationAuthority || "",
        selectedOptionRole: selectedOption?.optionRole || "",
        selectedOptionWasUserOptional: selectedOption?.optionalForUser === true,
        selectorRequired: inventory.selectorRequired,
        selectionRequired: inventory.selectionRequired
      };
    }
    function finalizeClassicalNahuatlLesson20NonactiveStemRecord(sourceStem = "", {
      selectedOption = null,
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const sourceIdentityFrame = selectedOption?.sourceIdentityFrame || buildClassicalNahuatlLesson20ActiveStemIdentityFrame(normalizedSourceStem);
      const normalizedNonactiveStem = normalizeClassicalNahuatlVncSlotStem(selectedOption?.nonactiveStem);
      const normalizedPerfectiveNonactiveStem = normalizeClassicalNahuatlVncSlotStem(selectedOption?.perfectiveNonactiveStem) || normalizedNonactiveStem;
      const normalizedSuffixFamily = normalizeClassicalNahuatlVncSlotCarrier(selectedOption?.suffixFamily);
      const finalShapeRelation = buildClassicalNahuatlLesson20NonactiveFinalShapeRelation(normalizedSourceStem, normalizedNonactiveStem, {
        suffixFamily: normalizedSuffixFamily,
        ruleId: selectedOption?.ruleId || ""
      });
      const formationStructure = getClassicalNahuatlLesson20NonactiveFormationStructure(normalizedSuffixFamily, finalShapeRelation.nonactiveFinalShapeFrame);
      const familyAuthorized = Boolean(CLASSICAL_NAHUATL_NONACTIVE_SUFFIX_FAMILIES.includes(normalizedSuffixFamily) && CLASSICAL_NAHUATL_NONACTIVE_FORMATION_CORES.includes(formationStructure.formationCore) && formationStructure.authorizationStatus === "authorized");
      const ruleOptionAuthorized = Boolean(selectedOption && selectedOption.kind === "classical-nahuatl-lesson20-nonactive-option" && selectedOption.optionId === `${normalizedSuffixFamily}:${normalizedNonactiveStem}` && selectedOption.ruleId && selectedOption.formationAuthority && finalShapeRelation.authorizationStatus === "authorized" && selectedOption.finalShapeRelation?.authorizationStatus === "authorized" && selectedOption.finalShapeRelation.sourceFinalShapeFrame?.stem === normalizedSourceStem && selectedOption.finalShapeRelation.nonactiveFinalShapeFrame?.stem === normalizedNonactiveStem && selectedOption.finalShapeRelation.suffixFamily === normalizedSuffixFamily && selectedOption.finalShapeRelation.ruleId === selectedOption.ruleId && selectedOption.formationStructure?.authorizationStatus === "authorized" && selectedOption.formationCore === formationStructure.formationCore && selectedOption.formationContinuation === formationStructure.continuation && selectedOption.formationSequence?.length === formationStructure.sequence.length && selectedOption.formationSequence.every((core, index) => core === formationStructure.sequence[index]) && selectedOption.sourceIdentityFrame?.authorizationStatus === "authorized" && selectedOption.sourceIdentityFrame.enteredStem === normalizedSourceStem && selectedOption.sourceIdentityFrame.callerSuppliedIdentityAllowed === false && selectedOption.sourceInternalMorphology === selectedOption.sourceIdentityFrame.internalMorphology);
      // Lesson 20.5 names the family o-hua, while final -hua/-hui sources
      // realize its first member as long ō. Compounds may add final -tz.
      // The typed morpheme tail retains both the macron and those boundaries.
      const suffixShapeAuthorized = doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily(finalShapeRelation.nonactiveFinalShapeFrame, normalizedSuffixFamily);
      const authorized = Boolean(normalizedSourceStem && normalizedNonactiveStem && normalizedSourceStem !== normalizedNonactiveStem && sourceIdentityFrame.authorizationStatus === "authorized" && sourceIdentityFrame.enteredStem === normalizedSourceStem && familyAuthorized && ruleOptionAuthorized && suffixShapeAuthorized);
      const blockReason = authorized ? "" : !normalizedSourceStem ? "lesson20-active-source-stem-required" : !normalizedNonactiveStem ? "lesson20-exact-nonactive-stem-required" : normalizedSourceStem === normalizedNonactiveStem ? "lesson20-nonactive-stem-must-differ-from-active-source" : !familyAuthorized ? "lesson20-nonactive-suffix-family-not-authorized" : !ruleOptionAuthorized ? "lesson20-generated-rule-option-required" : "lesson20-nonactive-stem-does-not-match-selected-suffix-family";
      return {
        kind: "classical-nahuatl-lesson20-nonactive-stem-record",
        version: 4,
        lesson: "Andrews Lesson 20",
        sourceAuthority: "Andrews Lesson 20 rule derivation",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sourceStem: normalizedSourceStem,
        sourceIdentityFrame,
        sourceInternalMorphology: sourceIdentityFrame.internalMorphology,
        lexicalIdentityId: sourceIdentityFrame.lexicalIdentityId,
        enteredAllomorph: sourceIdentityFrame.enteredAllomorph,
        canonicalImperfectiveStem: sourceIdentityFrame.canonicalImperfectiveStem,
        nonactiveStem: authorized ? normalizedNonactiveStem : "",
        requestedNonactiveStem: normalizedNonactiveStem,
        suffixFamily: normalizedSuffixFamily,
        imperfectiveNonactiveStem: authorized ? normalizedNonactiveStem : "",
        perfectiveNonactiveStem: authorized ? normalizedPerfectiveNonactiveStem : "",
        targetClass: authorized ? getClassicalNahuatlLesson20NonactiveTargetClass(normalizedSuffixFamily, normalizedNonactiveStem) : "",
        selectedOptionId: authorized ? selectedOption.optionId : "",
        selectedRuleId: authorized ? selectedOption.ruleId : "",
        selectedFormationAuthority: authorized ? selectedOption.formationAuthority : "",
        attachmentSite: authorized ? selectedOption.attachmentSite : "",
        sourceFinalShapeFrame: finalShapeRelation.sourceFinalShapeFrame,
        nonactiveFinalShapeFrame: authorized ? finalShapeRelation.nonactiveFinalShapeFrame : null,
        finalShapeRelation: authorized ? finalShapeRelation : null,
        finalShapeAuthority: authorized ? "computed-generated-option-relation" : "",
        formationStructure: authorized ? formationStructure : null,
        formationCore: authorized ? formationStructure.formationCore : "",
        formationContinuation: authorized ? formationStructure.continuation : "",
        formationSequence: authorized ? formationStructure.sequence : Object.freeze([]),
        surfaceFamilyIsRealization: true,
        finalShapeUnitLimit: 3,
        macronAndHyphenPreserved: true,
        sourceIsImperfectiveActiveStem: true,
        nonactiveStemRemainsPredicateInternal: true,
        selectionAuthority: authorized ? "andrews-lesson20-rule-derivation" : "",
        candidateSource: authorized ? selectedOption.candidateSource : "",
        decisionCategory: authorized ? selectedOption.decisionCategory : "",
        formulaArtifact: normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact),
        surfaceArtifact: normalizeClassicalNahuatlVncSlotCarrier(surfaceArtifact),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }

    // Compatibility entry point. A caller may request derivation inputs, but may
    // not authorize a result by supplying the answer, suffix family, or an
    // authority string. Those fields are deliberately rejected.
    function buildClassicalNahuatlLesson20NonactiveStemRecord(sourceStem = "", {
      verbClass = "",
      sourceValence = "",
      optionId = "",
      nonactiveStem = "",
      perfectiveNonactiveStem = "",
      suffixFamily = "",
      selectionAuthority = "",
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const userSuppliedAnswer = Boolean(normalizeClassicalNahuatlVncSlotStem(nonactiveStem) || normalizeClassicalNahuatlVncSlotStem(perfectiveNonactiveStem) || normalizeClassicalNahuatlVncSlotCarrier(suffixFamily) || normalizeClassicalNahuatlVncSlotCarrier(selectionAuthority));
      if (userSuppliedAnswer) {
        const blocked = finalizeClassicalNahuatlLesson20NonactiveStemRecord(sourceStem, {
          selectedOption: null,
          formulaArtifact,
          surfaceArtifact
        });
        return {
          ...blocked,
          blockReason: "lesson20-user-supplied-derived-stem-not-authorized",
          requestedNonactiveStem: normalizeClassicalNahuatlVncSlotStem(nonactiveStem),
          requestedPerfectiveNonactiveStem: normalizeClassicalNahuatlVncSlotStem(perfectiveNonactiveStem),
          requestedSuffixFamily: normalizeClassicalNahuatlVncSlotCarrier(suffixFamily),
          userSuppliedDerivedStemAllowed: false
        };
      }
      return deriveClassicalNahuatlLesson20NonactiveStemRecord(sourceStem, {
        verbClass,
        sourceValence,
        optionId,
        formulaArtifact,
        surfaceArtifact
      });
    }
    function isClassicalNahuatlLesson20NonactiveStemRecord(record = null, sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const recomputedFormationStructure = getClassicalNahuatlLesson20NonactiveFormationStructure(record?.suffixFamily, record?.nonactiveFinalShapeFrame);
      return Boolean(record && record.kind === "classical-nahuatl-lesson20-nonactive-stem-record" && record.authorizationStatus === "authorized" && record.selectionAuthority === "andrews-lesson20-rule-derivation" && record.selectedOptionId && record.selectedRuleId && record.sourceStem === normalizedSourceStem && record.sourceIdentityFrame?.authorizationStatus === "authorized" && record.sourceIdentityFrame.enteredStem === normalizedSourceStem && record.sourceIdentityFrame.callerSuppliedIdentityAllowed === false && record.sourceInternalMorphology === record.sourceIdentityFrame.internalMorphology && record.nonactiveStem && record.finalShapeAuthority === "computed-generated-option-relation" && record.finalShapeRelation?.authorizationStatus === "authorized" && record.finalShapeRelation.sourceFinalShapeFrame?.stem === normalizedSourceStem && record.finalShapeRelation.nonactiveFinalShapeFrame?.stem === record.nonactiveStem && record.formationStructure?.authorizationStatus === "authorized" && record.formationCore === recomputedFormationStructure.formationCore && record.formationContinuation === recomputedFormationStructure.continuation && record.formationSequence?.length === recomputedFormationStructure.sequence.length && record.formationSequence.every((core, index) => core === recomputedFormationStructure.sequence[index]) && doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily(record.nonactiveFinalShapeFrame, record.suffixFamily) && record.formulaArtifactAuthority === false && record.surfaceArtifactAuthority === false);
    }
    function buildClassicalNahuatlLesson22InherentImpersonalRecord(sourceStem = "", {
      selectionAuthority = "",
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const authorized = Boolean(normalizedSourceStem && ["user-supplied-lexical-analysis", "andrews-lesson22-voice-selection"].includes(selectionAuthority));
      return {
        kind: "classical-nahuatl-lesson22-inherent-impersonal-record",
        version: 1,
        lesson: "Andrews Lesson 22.1",
        sourceAuthority: "Andrews transcription plus user-supplied lexical analysis",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : !normalizedSourceStem ? "lesson22-inherent-impersonal-source-stem-required" : "lesson22-inherent-impersonal-typed-lexical-selection-required",
        sourceStem: normalizedSourceStem,
        inherentImpersonalStem: authorized ? normalizedSourceStem : "",
        selectionAuthority,
        formulaArtifact: normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact),
        surfaceArtifact: normalizeClassicalNahuatlVncSlotCarrier(surfaceArtifact),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function isClassicalNahuatlLesson22InherentImpersonalRecord(record = null, sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      return Boolean(record && record.kind === "classical-nahuatl-lesson22-inherent-impersonal-record" && record.authorizationStatus === "authorized" && ["user-supplied-lexical-analysis", "andrews-lesson22-voice-selection"].includes(record.selectionAuthority) && record.sourceStem === normalizedSourceStem && record.inherentImpersonalStem === normalizedSourceStem && record.formulaArtifactAuthority === false && record.surfaceArtifactAuthority === false);
    }
    function buildClassicalNahuatlLesson22TlaImpersonalStemRecord(sourceStem = "", {
      impersonalStem = "",
      selectionAuthority = "",
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const normalizedImpersonalStem = normalizeClassicalNahuatlVncSlotStem(impersonalStem);
      const lexicalSelectionAuthorized = ["user-supplied-lexical-analysis", "andrews-lesson22-rule-derivation"].includes(selectionAuthority);
      const tlaShapeAuthorized = /^tla-/u.test(normalizedImpersonalStem);
      const authorized = Boolean(normalizedSourceStem && normalizedImpersonalStem && normalizedSourceStem !== normalizedImpersonalStem && lexicalSelectionAuthorized && tlaShapeAuthorized);
      const blockReason = authorized ? "" : !normalizedSourceStem ? "lesson22-tla-impersonal-source-stem-required" : !normalizedImpersonalStem ? "lesson22-exact-tla-impersonal-stem-required" : normalizedSourceStem === normalizedImpersonalStem ? "lesson22-tla-impersonal-stem-must-differ-from-source" : !lexicalSelectionAuthorized ? "lesson22-tla-impersonal-typed-lexical-selection-required" : "lesson22-tla-impersonal-stem-must-begin-with-tla";
      return {
        kind: "classical-nahuatl-lesson22-tla-impersonal-stem-record",
        version: 1,
        lesson: "Andrews Lesson 22.6",
        sourceAuthority: "Andrews transcription plus user-supplied lexical analysis",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sourceStem: normalizedSourceStem,
        impersonalStem: authorized ? normalizedImpersonalStem : "",
        requestedImpersonalStem: normalizedImpersonalStem,
        selectionAuthority,
        formulaArtifact: normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact),
        surfaceArtifact: normalizeClassicalNahuatlVncSlotCarrier(surfaceArtifact),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function isClassicalNahuatlLesson22TlaImpersonalStemRecord(record = null, sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      return Boolean(record && record.kind === "classical-nahuatl-lesson22-tla-impersonal-stem-record" && record.authorizationStatus === "authorized" && ["user-supplied-lexical-analysis", "andrews-lesson22-rule-derivation"].includes(record.selectionAuthority) && record.sourceStem === normalizedSourceStem && /^tla-/u.test(record.impersonalStem || "") && record.formulaArtifactAuthority === false && record.surfaceArtifactAuthority === false);
    }
    const CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS = Object.freeze([Object.freeze({
      routeId: "cn-l38-yohua-doubly-impersonal",
      label: "inherent impersonal → nonactive lō",
      sourceStem: "yohua",
      sourceVoice: "lexical-source",
      sourceImpersonalDepth: 0,
      sourceValence: "intransitive",
      andrewsSection: "38.1.1.a",
      steps: Object.freeze([Object.freeze({
        operationId: "inherent-impersonal",
        targetStem: "yohua",
        targetVoice: "inherent-impersonal",
        impersonalDepth: 1
      }), Object.freeze({
        operationId: "nonactive-lō",
        targetStem: "yohua-lō",
        targetVoice: "impersonal",
        impersonalDepth: 2,
        suffixFamily: "lō",
        ruleId: "cn-l38-1-yohua-lo-source"
      })])
    }), Object.freeze({
      routeId: "cn-l38-yohua-triply-impersonal",
      label: "inherent impersonal → tla-impersonal → nonactive lō",
      sourceStem: "yohua",
      sourceVoice: "lexical-source",
      sourceImpersonalDepth: 0,
      sourceValence: "intransitive",
      andrewsSection: "38.1.1.a",
      steps: Object.freeze([Object.freeze({
        operationId: "inherent-impersonal",
        targetStem: "yohua",
        targetVoice: "inherent-impersonal",
        impersonalDepth: 1
      }), Object.freeze({
        operationId: "tla-impersonal",
        targetStem: "tla-yohua",
        targetVoice: "tla-impersonal",
        impersonalDepth: 2
      }), Object.freeze({
        operationId: "nonactive-lō",
        targetStem: "tla-yohua-lō",
        targetVoice: "impersonal",
        impersonalDepth: 3,
        suffixFamily: "lō",
        ruleId: "cn-l38-1-tla-yohua-lo-source"
      })])
    }), Object.freeze({
      routeId: "cn-l38-tla-hyaya-doubly-impersonal",
      label: "tla-impersonal → nonactive lō",
      sourceStem: "ihyā-ya",
      sourceVoice: "active",
      sourceImpersonalDepth: 0,
      sourceValence: "intransitive",
      andrewsSection: "38.1.1.a",
      steps: Object.freeze([Object.freeze({
        operationId: "tla-impersonal",
        targetStem: "tla-hyā-ya",
        targetVoice: "tla-impersonal",
        impersonalDepth: 1
      }), Object.freeze({
        operationId: "nonactive-lō",
        targetStem: "tla-hye-lō",
        targetVoice: "impersonal",
        impersonalDepth: 2,
        suffixFamily: "lō",
        ruleId: "cn-l38-1-tla-hyaya-lo-source"
      })])
    }), Object.freeze({
      routeId: "cn-l38-tla-coloti-doubly-impersonal",
      label: "typed tla-impersonal source → nonactive ō",
      sourceStem: "tla-cōl-ō-ti",
      sourceVoice: "tla-impersonal",
      sourceImpersonalDepth: 1,
      sourceValence: "intransitive",
      andrewsSection: "38.1.1.b",
      steps: Object.freeze([Object.freeze({
        operationId: "nonactive-ō",
        targetStem: "tla-cōl-ō-ch-ō",
        targetVoice: "impersonal",
        impersonalDepth: 2,
        suffixFamily: "ō",
        ruleId: "cn-l38-1-tla-coloti-cho-source"
      })])
    }), Object.freeze({
      routeId: "cn-l38-tla-neci-doubly-impersonal",
      label: "tla-impersonal → nonactive ō",
      sourceStem: "nēci",
      sourceVoice: "active",
      sourceImpersonalDepth: 0,
      sourceValence: "intransitive",
      andrewsSection: "38.1.1.b",
      steps: Object.freeze([Object.freeze({
        operationId: "tla-impersonal",
        targetStem: "tla-nēci",
        targetVoice: "tla-impersonal",
        impersonalDepth: 1
      }), Object.freeze({
        operationId: "nonactive-ō",
        targetStem: "tla-nex-ō",
        targetVoice: "impersonal",
        impersonalDepth: 2,
        suffixFamily: "ō",
        ruleId: "cn-l38-1-tla-neci-nexo-source"
      })])
    }), Object.freeze({
      routeId: "cn-l38-pachoia-impersonalized-passive",
      label: "passive → impersonalized passive",
      sourceStem: "pach-o-ā",
      sourceVoice: "active",
      sourceImpersonalDepth: 0,
      sourceValence: "specific-projective",
      andrewsSection: "38.1.4.a",
      steps: Object.freeze([Object.freeze({
        operationId: "passive-lō",
        targetStem: "pach-ō-lō",
        targetVoice: "passive",
        impersonalDepth: 0,
        suffixFamily: "lō",
        ruleId: "cn-l38-1-pachoia-passive-lo-source"
      }), Object.freeze({
        operationId: "impersonalize-passive",
        targetStem: "tla-pach-ō-lō",
        targetVoice: "impersonalized-passive",
        impersonalDepth: 1
      })])
    }), Object.freeze({
      routeId: "cn-l38-titlani-impersonalized-passive",
      label: "passive → impersonalized passive",
      sourceStem: "tītlani",
      sourceVoice: "active",
      sourceImpersonalDepth: 0,
      sourceValence: "specific-projective",
      andrewsSection: "38.1.4.b",
      steps: Object.freeze([Object.freeze({
        operationId: "passive-ō",
        targetStem: "tītlan-ō",
        targetVoice: "passive",
        impersonalDepth: 0,
        suffixFamily: "ō",
        ruleId: "cn-l37-9-titlani-o-source"
      }), Object.freeze({
        operationId: "impersonalize-passive",
        targetStem: "tla-tītlan-ō",
        targetVoice: "impersonalized-passive",
        impersonalDepth: 1
      })])
    }), Object.freeze({
      routeId: "cn-l38-ahci-impersonalized-passive",
      label: "passive → impersonalized passive",
      sourceStem: "ahci",
      sourceVoice: "active",
      sourceImpersonalDepth: 0,
      sourceValence: "specific-projective",
      andrewsSection: "38.1.4.c",
      steps: Object.freeze([Object.freeze({
        operationId: "passive-hua",
        targetStem: "ahxī-hua",
        targetVoice: "passive",
        impersonalDepth: 0,
        suffixFamily: "hua",
        ruleId: "cn-l20-6-ahci"
      }), Object.freeze({
        operationId: "impersonalize-passive",
        targetStem: "tla-ahxi-hua",
        targetVoice: "impersonalized-passive",
        impersonalDepth: 1
      })])
    })]);
    function isClassicalNahuatlOrderedVoiceLayerIntermediateStem(sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      if (!normalizedSourceStem) {
        return false;
      }
      return CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.some(route => route.sourceStem === normalizedSourceStem && !["active", "lexical-source"].includes(route.sourceVoice) || route.steps.some((step, index) => index + 1 < route.steps.length && step.targetStem === normalizedSourceStem && step.targetStem !== route.sourceStem));
    }
    function getClassicalNahuatlOrderedVoiceLayerOptions(sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const options = CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.filter(route => route.sourceStem === normalizedSourceStem).map(route => Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-option",
        routeId: route.routeId,
        label: route.label,
        sourceStem: route.sourceStem,
        targetStem: route.steps[route.steps.length - 1]?.targetStem || route.sourceStem,
        layerCount: route.steps.length,
        operations: Object.freeze(route.steps.map(step => step.operationId)),
        andrewsSection: route.andrewsSection,
        selectionAuthority: "engine-owned-andrews-route-id",
        callerSuppliedTargetAllowed: false
      }));
      return Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-option-inventory",
        version: 1,
        sourceAuthority: "Andrews Lessons 22 and 38 ordered voice derivations",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        sourceStem: normalizedSourceStem,
        authorizationStatus: normalizedSourceStem && options.length ? "authorized" : "blocked",
        blockReason: !normalizedSourceStem ? "ordered-voice-layer-source-stem-required" : options.length ? "" : "ordered-voice-layer-route-not-attested",
        options: Object.freeze(options),
        selectorRequired: options.length > 1,
        callerSuppliedTargetAllowed: false
      });
    }
    function getClassicalNahuatlOrderedVoiceLayerCascadeOptions(sourceStem = "", appliedOperations = []) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const normalizedOperations = Array.isArray(appliedOperations) ? appliedOperations.map(operation => normalizeClassicalNahuatlVncSlotCarrier(operation)).filter(Boolean) : [];
      const matchingRoutes = CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.filter(route => route.sourceStem === normalizedSourceStem && normalizedOperations.every((operation, index) => route.steps[index]?.operationId === operation));
      const currentStepIndex = normalizedOperations.length - 1;
      const currentStems = Array.from(new Set(matchingRoutes.map(route => currentStepIndex >= 0 ? route.steps[currentStepIndex]?.targetStem : route.sourceStem).filter(Boolean)));
      const nextOptionsByKey = new Map();
      matchingRoutes.forEach(route => {
        const step = route.steps[normalizedOperations.length];
        if (!step) {
          return;
        }
        const key = `${step.operationId}::${step.targetStem}`;
        if (!nextOptionsByKey.has(key)) {
          nextOptionsByKey.set(key, Object.freeze({
            kind: "classical-nahuatl-ordered-voice-layer-cascade-option",
            operationId: step.operationId,
            sourceStem: currentStems[0] || normalizedSourceStem,
            targetStem: step.targetStem,
            targetVoice: step.targetVoice,
            impersonalDepth: step.impersonalDepth,
            suffixFamily: step.suffixFamily || "",
            selectionAuthority: "engine-owned-andrews-next-operation",
            callerSuppliedTargetAllowed: false
          }));
        }
      });
      const completeRouteIds = matchingRoutes.filter(route => route.steps.length === normalizedOperations.length).map(route => route.routeId);
      return Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-cascade-inventory",
        version: 1,
        sourceAuthority: "Andrews ordered voice-layer derivation",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        sourceStem: normalizedSourceStem,
        appliedOperations: Object.freeze(normalizedOperations),
        currentStem: currentStems.length === 1 ? currentStems[0] : "",
        authorizationStatus: normalizedSourceStem && matchingRoutes.length ? "authorized" : "blocked",
        blockReason: !normalizedSourceStem ? "ordered-voice-layer-source-stem-required" : matchingRoutes.length ? "" : "ordered-voice-layer-operation-prefix-not-authorized",
        options: Object.freeze(Array.from(nextOptionsByKey.values())),
        completeRouteIds: Object.freeze(completeRouteIds),
        mayStopAtCurrentLayer: normalizedOperations.length > 0,
        callerSuppliedTargetAllowed: false
      });
    }
    function getClassicalNahuatlOrderedVoiceLayerSignature(frame = null) {
      return JSON.stringify({
        kind: frame?.kind || "",
        routeId: frame?.routeId || "",
        sourceStem: frame?.sourceStem || "",
        targetStem: frame?.targetStem || "",
        operations: Array.isArray(frame?.operations) ? frame.operations : [],
        completeRoute: frame?.completeRoute === true,
        layerCount: frame?.layerCount || 0,
        layers: (Array.isArray(frame?.layers) ? frame.layers : []).map(layer => ({
          layerIndex: layer.layerIndex,
          operationId: layer.operationId,
          sourceStem: layer.sourceStem,
          targetStem: layer.targetStem,
          sourceFrameKind: layer.sourceFrameKind,
          sourceFrameTargetStem: layer.sourceFrame?.targetStem,
          impersonalDepth: layer.impersonalDepth
        }))
      });
    }
    function deriveClassicalNahuatlOrderedVoiceLayerChain(sourceStem = "", {
      routeId = "",
      operations = null,
      targetStem = "",
      layers = null,
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const normalizedRouteId = normalizeClassicalNahuatlVncSlotCarrier(routeId);
      const normalizedOperations = Array.isArray(operations) ? operations.map(operation => normalizeClassicalNahuatlVncSlotCarrier(operation)).filter(Boolean) : [];
      const route = normalizedRouteId ? CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.find(candidate => candidate.sourceStem === normalizedSourceStem && candidate.routeId === normalizedRouteId) || null : CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.find(candidate => candidate.sourceStem === normalizedSourceStem && normalizedOperations.length > 0 && normalizedOperations.every((operation, index) => candidate.steps[index]?.operationId === operation)) || null;
      const selectedSteps = route ? normalizedRouteId ? route.steps : route.steps.slice(0, normalizedOperations.length) : [];
      if (!route || !selectedSteps.length) {
        return Object.freeze({
          kind: "classical-nahuatl-ordered-voice-layer-chain-frame",
          version: 1,
          authorizationStatus: "blocked",
          blockReason: !normalizedSourceStem ? "ordered-voice-layer-source-stem-required" : "ordered-voice-layer-engine-route-required",
          routeId: normalizedRouteId,
          sourceStem: normalizedSourceStem,
          targetStem: "",
          operations: Object.freeze(normalizedOperations),
          completeRoute: false,
          layers: Object.freeze([]),
          callerSuppliedTargetAllowed: false,
          callerSuppliedLayersAllowed: false,
          formulaArtifactAuthority: false,
          surfaceArtifactAuthority: false
        });
      }
      let previousFrame = Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-seed-frame",
        authorizationStatus: "authorized",
        sourceStem: normalizedSourceStem,
        targetStem: normalizedSourceStem,
        voice: route.sourceVoice,
        impersonalDepth: route.sourceImpersonalDepth,
        sourceValence: route.sourceValence,
        sourceAuthority: "Andrews typed source frame"
      });
      const derivedLayers = selectedSteps.map((step, index) => {
        const sourceFrame = previousFrame;
        const layer = Object.freeze({
          kind: "classical-nahuatl-ordered-voice-layer-frame",
          version: 1,
          authorizationStatus: "authorized",
          routeId: route.routeId,
          layerIndex: index + 1,
          operationId: step.operationId,
          sourceFrame,
          sourceFrameKind: sourceFrame.kind,
          sourceStem: sourceFrame.targetStem,
          targetStem: step.targetStem,
          targetVoice: step.targetVoice,
          suffixFamily: step.suffixFamily || "",
          ruleId: step.ruleId || "",
          impersonalDepth: step.impersonalDepth,
          consumesPreviousTypedOutput: sourceFrame.authorizationStatus === "authorized" && Boolean(sourceFrame.targetStem),
          sourceAuthority: `Andrews ${route.andrewsSection}`,
          callerSuppliedTargetAllowed: false,
          formulaArtifactAuthority: false,
          surfaceArtifactAuthority: false
        });
        previousFrame = layer;
        return layer;
      });
      const chain = {
        kind: "classical-nahuatl-ordered-voice-layer-chain-frame",
        version: 1,
        sourceAuthority: "Andrews ordered voice-layer derivation",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        routeId: selectedSteps.length === route.steps.length ? route.routeId : "",
        routeFamilyIds: Object.freeze(CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.filter(candidate => candidate.sourceStem === normalizedSourceStem && selectedSteps.every((step, index) => candidate.steps[index]?.operationId === step.operationId)).map(candidate => candidate.routeId)),
        label: selectedSteps.map(step => step.operationId).join(" → "),
        andrewsSection: route.andrewsSection,
        sourceStem: normalizedSourceStem,
        targetStem: previousFrame.targetStem,
        sourceVoice: route.sourceVoice,
        targetVoice: previousFrame.targetVoice,
        sourceValence: route.sourceValence,
        operations: Object.freeze(derivedLayers.map(layer => layer.operationId)),
        layerCount: derivedLayers.length,
        impersonalDepth: previousFrame.impersonalDepth,
        completeRoute: selectedSteps.length === route.steps.length,
        layers: Object.freeze(derivedLayers),
        finalLayerFrame: previousFrame,
        sourceTargetContinuity: derivedLayers.every((layer, index) => layer.sourceStem === (index === 0 ? normalizedSourceStem : derivedLayers[index - 1].targetStem) && layer.sourceFrame === (index === 0 ? derivedLayers[0].sourceFrame : derivedLayers[index - 1])),
        requestedArtifactsDiscarded: Boolean(normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact) || normalizeClassicalNahuatlVncSlotCarrier(surfaceArtifact) || normalizeClassicalNahuatlVncSlotStem(targetStem) || Array.isArray(layers)),
        callerSuppliedTargetAllowed: false,
        callerSuppliedLayersAllowed: false,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      };
      chain.canonicalSignature = getClassicalNahuatlOrderedVoiceLayerSignature(chain);
      return Object.freeze(chain);
    }
    function isClassicalNahuatlOrderedVoiceLayerChain(frame = null, sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem || frame?.sourceStem || "");
      if (!frame || frame.authorizationStatus !== "authorized" || frame.sourceStem !== normalizedSourceStem) {
        return false;
      }
      const rebuilt = deriveClassicalNahuatlOrderedVoiceLayerChain(normalizedSourceStem, frame.completeRoute === true ? {
        routeId: frame.routeId
      } : {
        operations: frame.operations
      });
      return Boolean(rebuilt.authorizationStatus === "authorized" && frame.canonicalSignature === rebuilt.canonicalSignature && getClassicalNahuatlOrderedVoiceLayerSignature(frame) === rebuilt.canonicalSignature && frame.sourceTargetContinuity === true && frame.formulaArtifactAuthority === false && frame.surfaceArtifactAuthority === false);
    }
    const CLASSICAL_NAHUATL_LESSON23_OBJECT_SEQUENCE_PRIORITY = Object.freeze({
      "specific-projective": 1,
      reflexive: 2,
      "nonspecific-human": 3,
      "nonspecific-nonhuman": 4
    });
    const CLASSICAL_NAHUATL_LESSON23_OBJECT_GOVERNORS = Object.freeze(["directive", "causative", "applicative"]);
    function getClassicalNahuatlLesson23ReflexiveVa1(subject = "") {
      const normalizedSubject = normalizeClassicalNahuatlVncSlotCarrier(subject);
      if (normalizedSubject === "1sg") {
        return "n";
      }
      if (normalizedSubject === "1pl") {
        return "t";
      }
      return "m";
    }
    function getClassicalNahuatlLesson23SpecificDyad(objectPerson = "", {
      sounded = true,
      soundedSpecificPerson = "",
      leftCarrier = "",
      rightCarrier = ""
    } = {}) {
      const normalizedPerson = normalizeClassicalNahuatlVncSlotCarrier(objectPerson);
      if (!sounded) {
        return normalizedPerson === "3pl" && soundedSpecificPerson !== "3pl" ? {
          va1: "0",
          va2: "im",
          carrier: "0-im",
          silencingRule: "shuntline-third-plural-keeps-number"
        } : {
          va1: "0",
          va2: "0",
          carrier: "0-0",
          silencingRule: "incompatible-specific-projective-silenced"
        };
      }
      const fixed = {
        "1sg": ["n", "ech"],
        "1pl": ["t", "ech"],
        "2sg": ["m", "itz"],
        "2pl": ["am", "ech"],
        "3pl": ["qu", "im"]
      }[normalizedPerson];
      if (fixed) {
        return {
          va1: fixed[0],
          va2: fixed[1],
          carrier: `${fixed[0]}-${fixed[1]}`,
          silencingRule: ""
        };
      }
      const leftSound = getClassicalNahuatlVncSlotLastSound(leftCarrier);
      const rightSound = getClassicalNahuatlVncSlotFirstSound(rightCarrier);
      const va1 = rightSound === "e" || rightSound === "i" ? "qu" : isClassicalNahuatlVncSlotVowelSound(leftSound) || isClassicalNahuatlVncSlotVowelSound(rightSound) ? "c" : "qui";
      return {
        va1,
        va2: "0",
        carrier: `${va1}-0`,
        silencingRule: ""
      };
    }
    function getClassicalNahuatlLesson23PositionPreviewCarrier(position = {}, subject = "") {
      if (position.objectKind === "reflexive") {
        return position.prominence === "mainline" ? `${getClassicalNahuatlLesson23ReflexiveVa1(subject)}-o` : "ne";
      }
      if (position.objectKind === "nonspecific-human") {
        return "te";
      }
      if (position.objectKind === "nonspecific-nonhuman") {
        return "tla";
      }
      if (position.objectPerson === "3sg") {
        return "c-0";
      }
      return getClassicalNahuatlLesson23SpecificDyad(position.objectPerson).carrier;
    }
    function buildClassicalNahuatlLesson23ObjectClusterFrame(sourceStem = "", {
      subject = "",
      subjectCarrier = "",
      predicateStem = "",
      tense = "",
      objectRequests = [],
      minimumPositionCount = 2,
      maximumPositionCount = 3,
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const normalizedSubject = normalizeClassicalNahuatlVncSlotCarrier(subject);
      const normalizedPredicateStem = normalizeClassicalNahuatlVncSlotStem(predicateStem || sourceStem);
      const normalizedTense = normalizeClassicalNahuatlVncSlotCarrier(tense);
      const normalizedRequests = (Array.isArray(objectRequests) ? objectRequests : []).map((request, index) => ({
        objectId: normalizeClassicalNahuatlVncSlotCarrier(request?.objectId || `object-${index + 1}`),
        objectKind: normalizeClassicalNahuatlVncSlotCarrier(request?.objectKind),
        objectPerson: normalizeClassicalNahuatlVncSlotCarrier(request?.objectPerson),
        governor: normalizeClassicalNahuatlVncSlotCarrier(request?.governor),
        derivationalLevel: Number(request?.derivationalLevel)
      }));
      const levels = normalizedRequests.map(request => request.derivationalLevel);
      const maximumLevel = levels.length ? Math.max(...levels) : 0;
      const requestShapeAuthorized = normalizedRequests.length >= minimumPositionCount && normalizedRequests.length <= maximumPositionCount && normalizedRequests.every(request => Object.prototype.hasOwnProperty.call(CLASSICAL_NAHUATL_LESSON23_OBJECT_SEQUENCE_PRIORITY, request.objectKind) && CLASSICAL_NAHUATL_LESSON23_OBJECT_GOVERNORS.includes(request.governor) && Number.isInteger(request.derivationalLevel) && request.derivationalLevel >= 1 && request.derivationalLevel <= 3 && (request.objectKind !== "specific-projective" || ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].includes(request.objectPerson))) && new Set(levels).size === levels.length && levels.includes(maximumLevel);
      const rankedPositions = normalizedRequests.map(request => ({
        ...request,
        prominence: request.derivationalLevel === maximumLevel ? "mainline" : "shuntline",
        sequencePriority: CLASSICAL_NAHUATL_LESSON23_OBJECT_SEQUENCE_PRIORITY[request.objectKind] || 99
      })).sort((left, right) => left.sequencePriority - right.sequencePriority || right.derivationalLevel - left.derivationalLevel);
      const specificPositions = rankedPositions.filter(position => position.objectKind === "specific-projective");
      const soundedSpecific = specificPositions.slice().sort((left, right) => right.derivationalLevel - left.derivationalLevel)[0] || null;
      const positions = rankedPositions.map((position, index) => {
        const previousCarrier = index === 0 ? normalizeClassicalNahuatlVncSlotCarrier(subjectCarrier) : getClassicalNahuatlLesson23PositionPreviewCarrier(rankedPositions[index - 1], normalizedSubject);
        const nextCarrier = index + 1 < rankedPositions.length ? getClassicalNahuatlLesson23PositionPreviewCarrier(rankedPositions[index + 1], normalizedSubject) : normalizedPredicateStem;
        if (position.objectKind === "specific-projective") {
          const dyad = getClassicalNahuatlLesson23SpecificDyad(position.objectPerson, {
            sounded: position.objectId === soundedSpecific?.objectId,
            soundedSpecificPerson: soundedSpecific?.objectPerson || "",
            leftCarrier: previousCarrier,
            rightCarrier: nextCarrier
          });
          return {
            ...position,
            kind: "classical-nahuatl-lesson23-object-position-frame",
            valenceArity: "dyadic",
            va1: dyad.va1,
            va2: dyad.va2,
            carrier: dyad.carrier,
            sounded: position.objectId === soundedSpecific?.objectId,
            silencingRule: dyad.silencingRule,
            carrierAuthority: "Andrews Lesson 23.4"
          };
        }
        if (position.objectKind === "reflexive" && position.prominence === "mainline") {
          const va1 = getClassicalNahuatlLesson23ReflexiveVa1(normalizedSubject);
          return {
            ...position,
            kind: "classical-nahuatl-lesson23-object-position-frame",
            valenceArity: "dyadic",
            va1,
            va2: "o",
            carrier: `${va1}-o`,
            sounded: true,
            carrierAuthority: "Andrews Lesson 23.3.2"
          };
        }
        const va = position.objectKind === "reflexive" ? "ne" : position.objectKind === "nonspecific-human" ? "te" : "tla";
        return {
          ...position,
          kind: "classical-nahuatl-lesson23-object-position-frame",
          valenceArity: "monadic",
          va,
          carrier: va,
          sounded: true,
          carrierAuthority: position.objectKind === "reflexive" ? "Andrews Lesson 23.4 shuntline reflexive" : "Andrews Lesson 23.5 ordering priorities"
        };
      });
      const mainlineCount = positions.filter(position => position.prominence === "mainline").length;
      const futureSpecificCooccurrenceUsesZeroNumber = normalizedTense === "future" && normalizedSubject === "3sg" && positions.filter(position => position.objectKind === "specific-projective").length > 1;
      const authorized = Boolean(normalizedSourceStem && normalizedSubject && normalizedPredicateStem && requestShapeAuthorized && mainlineCount === 1 && positions.every(position => position.carrier));
      const blockReason = authorized ? "" : !normalizedSourceStem ? "lesson23-source-stem-required" : !normalizedSubject ? "lesson23-source-subject-required" : !requestShapeAuthorized ? "lesson23-typed-object-request-inventory-invalid" : "lesson23-object-position-realization-incomplete";
      return {
        kind: "classical-nahuatl-lesson23-object-cluster-frame",
        version: 1,
        lesson: "Andrews Lesson 23",
        section: "23.1-23.5",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sourceStem: normalizedSourceStem,
        predicateStem: normalizedPredicateStem,
        subject: normalizedSubject,
        subjectCarrier: normalizeClassicalNahuatlVncSlotCarrier(subjectCarrier),
        tense: normalizedTense,
        objectRequests: normalizedRequests,
        positions,
        positionCount: positions.length,
        valenceArity: "multiple",
        soundedSpecificObjectId: soundedSpecific?.objectId || "",
        linearOrder: positions.map(position => position.objectId),
        linearCarriers: positions.map(position => position.carrier),
        numberDyadOverride: futureSpecificCooccurrenceUsesZeroNumber ? {
          num1: "0",
          num2: "0",
          rule: "lesson23-canvas-future-specific-cooccurrence-zero-number"
        } : null,
        orderingRules: ["specific-projective-before-reflexive", "specific-projective-before-nonspecific-projective", "reflexive-before-nonspecific-projective", "human-before-nonhuman"],
        formulaArtifact: normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact),
        surfaceArtifact: normalizeClassicalNahuatlVncSlotCarrier(surfaceArtifact),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function isClassicalNahuatlLesson23ObjectClusterFrame(frame = null, sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem || frame?.sourceStem);
      if (!frame || frame.kind !== "classical-nahuatl-lesson23-object-cluster-frame" || frame.authorizationStatus !== "authorized" || frame.sourceStem !== normalizedSourceStem || frame.formulaArtifactAuthority !== false || frame.surfaceArtifactAuthority !== false) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlLesson23ObjectClusterFrame(frame.sourceStem, {
        subject: frame.subject,
        subjectCarrier: frame.subjectCarrier,
        predicateStem: frame.predicateStem,
        tense: frame.tense,
        objectRequests: frame.objectRequests,
        minimumPositionCount: frame.positionCount,
        maximumPositionCount: frame.positionCount
      });
      return rebuilt.authorizationStatus === "authorized" && JSON.stringify(rebuilt.positions) === JSON.stringify(frame.positions);
    }
    function buildClassicalNahuatlLesson23VoiceObjectClusterFrame(sourceObjectClusterFrame = null, {
      voice = "passive",
      tense = ""
    } = {}) {
      const normalizedVoice = normalizeClassicalNahuatlVncSlotCarrier(voice);
      const normalizedTense = normalizeClassicalNahuatlVncSlotCarrier(tense || sourceObjectClusterFrame?.tense);
      const sourceAuthorized = isClassicalNahuatlLesson23ObjectClusterFrame(sourceObjectClusterFrame);
      const specificPositions = sourceAuthorized ? sourceObjectClusterFrame.positions.filter(position => position.objectKind === "specific-projective") : [];
      const promotedPosition = specificPositions.slice().sort((left, right) => right.derivationalLevel - left.derivationalLevel)[0] || null;
      const passive = normalizedVoice === "passive";
      const impersonal = normalizedVoice === "impersonal";
      const voiceAuthorized = sourceAuthorized && (passive && Boolean(promotedPosition) || impersonal && specificPositions.length === 0);
      const transformedPositions = voiceAuthorized ? sourceObjectClusterFrame.positions.filter(position => !passive || position.objectId !== promotedPosition.objectId).map(position => {
        if (position.objectKind === "reflexive") {
          return {
            ...cloneClassicalNahuatlVncSlotValue(position),
            prominence: "shuntline",
            valenceArity: "monadic",
            va: "ne",
            va1: "",
            va2: "",
            carrier: "ne",
            voiceTransformation: "retain-reflexivity-as-shuntline-ne"
          };
        }
        if (passive && position.objectKind === "specific-projective" && position.carrier === "0-im") {
          return {
            ...cloneClassicalNahuatlVncSlotValue(position),
            valenceArity: "dyadic",
            va1: "qu",
            va2: "im",
            carrier: "qu-im",
            sounded: true,
            voiceTransformation: "restore-third-plural-k-in-passive-transform"
          };
        }
        return {
          ...cloneClassicalNahuatlVncSlotValue(position),
          voiceTransformation: "retain-object-position"
        };
      }) : [];
      const blockReason = voiceAuthorized ? "" : !sourceAuthorized ? "lesson23-authorized-source-object-cluster-required" : passive ? "lesson21-passive-requires-specific-projective-object-in-cluster" : impersonal ? "lesson22-impersonal-blocks-specific-projective-object-cluster" : "lesson23-unknown-derived-voice";
      return {
        kind: "classical-nahuatl-lessons21-23-voice-object-cluster-frame",
        version: 1,
        lesson: passive ? "Andrews Lessons 21 and 23" : "Andrews Lessons 22 and 23",
        authorizationStatus: voiceAuthorized ? "authorized" : "blocked",
        blockReason,
        voice: normalizedVoice,
        sourceObjectClusterFrame,
        sourceObjectClusterIdentity: sourceAuthorized ? sourceObjectClusterFrame.positions.map(position => `${position.objectId}:${position.carrier}`).join("|") : "",
        promotedObjectId: passive ? promotedPosition?.objectId || "" : "",
        promotedObjectPerson: passive ? promotedPosition?.objectPerson || "" : "",
        positions: transformedPositions,
        retainedObjectIds: transformedPositions.map(position => position.objectId),
        retainedCarriers: transformedPositions.map(position => position.carrier),
        numberDyadOverride: passive && normalizedTense === "future" && transformedPositions.length > 0 && !String(promotedPosition?.objectPerson || "").endsWith("pl") ? {
          num1: "0",
          num2: "0",
          rule: "lesson21-transitive-passive-future-singular-number"
        } : null,
        sourceSubjectDeleted: voiceAuthorized,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(lowerMachineryFrame = null, objectClusterFrame = null, {
      sourceFrameKind = "classical-nahuatl-lesson23-multiple-object-vnc-machinery-frame"
    } = {}) {
      const lowerTypedFrame = lowerMachineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || lowerMachineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame;
      const clusterAuthorized = objectClusterFrame?.authorizationStatus === "authorized" && Array.isArray(objectClusterFrame?.positions) && objectClusterFrame.positions.length >= 1;
      if (!isClassicalNahuatlVncSlotFrame(lowerTypedFrame) || !clusterAuthorized) {
        return null;
      }
      const personDyad = cloneClassicalNahuatlVncSlotValue(lowerTypedFrame.slots.subject);
      const firstObjectCarrier = objectClusterFrame.positions[0]?.carrier || "";
      const subjectCarrierFamily = getClassicalNahuatlVncSubjectCarrierFamily(personDyad.pers1);
      if (subjectCarrierFamily) {
        const nextSound = getClassicalNahuatlVncSlotFirstSound(firstObjectCarrier);
        personDyad.pers1 = nextSound ? !isClassicalNahuatlVncSlotVowelSound(nextSound) ? subjectCarrierFamily.supportive : subjectCarrierFamily.bare : subjectCarrierFamily.bare === "n" ? subjectCarrierFamily.supportive : subjectCarrierFamily.bare;
      }
      const numberDyad = {
        ...cloneClassicalNahuatlVncSlotValue(lowerTypedFrame.slots.number),
        ...(cloneClassicalNahuatlVncSlotValue(objectClusterFrame.numberDyadOverride) || {})
      };
      const typedSlotFrame = buildClassicalNahuatlVncSlotFrame({
        sourceFrameKind,
        sourceAuthorizationStatus: "authorized",
        stem: lowerTypedFrame.slots.predicate.stem,
        personDyad,
        tenseFrame: cloneClassicalNahuatlVncSlotValue(lowerTypedFrame.slots.predicate),
        numberDyad,
        objectFrame: {
          valenceArity: "multiple",
          positions: cloneClassicalNahuatlVncSlotValue(objectClusterFrame.positions),
          stemRealization: lowerTypedFrame.slots.predicate.stem
        },
        formulaArtifact: objectClusterFrame.formulaArtifact || ""
      });
      if (!isClassicalNahuatlVncSlotFrame(typedSlotFrame)) {
        return null;
      }
      const formula = renderClassicalNahuatlVncSlotFrameFormula(typedSlotFrame);
      const proofFrame = cloneClassicalNahuatlVncSlotValue(lowerMachineryFrame.proofFrame);
      proofFrame.kind = "classical-nahuatl-lesson23-multiple-object-vnc-proof-frame";
      proofFrame.authorizationStatus = formula ? "authorized" : "blocked";
      proofFrame.formulaStringAuthority = false;
      proofFrame.surfaceStringAuthority = false;
      proofFrame.conclusion = {
        ...proofFrame.conclusion,
        authorized: Boolean(formula),
        selectedFormula: formula,
        authorizedFormula: formula,
        formulaRealization: formula,
        finalTypedVncSlotFrame: typedSlotFrame,
        finalBoundaryRealizationFrame: {
          kind: "classical-nahuatl-lesson23-multiple-object-final-boundary-frame",
          authorizationStatus: formula ? "authorized" : "blocked",
          typedSlotFrame,
          formulaRealization: formula,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        objectClusterFrame
      };
      const selectedOutputLogicFrame = {
        ...cloneClassicalNahuatlVncSlotValue(lowerMachineryFrame.selectedOutputLogicFrame),
        kind: "classical-nahuatl-lesson23-multiple-object-selected-output-logic-frame",
        authorizationStatus: formula ? "authorized" : "blocked",
        selectedFormula: formula,
        formulaStringAuthority: false,
        outputFillers: {
          ...(cloneClassicalNahuatlVncSlotValue(lowerMachineryFrame.selectedOutputLogicFrame?.outputFillers) || {}),
          objectPositionCount: objectClusterFrame.positions.length,
          objectCarriers: objectClusterFrame.positions.map(position => position.carrier)
        }
      };
      return {
        ...cloneClassicalNahuatlVncSlotValue(lowerMachineryFrame),
        kind: sourceFrameKind,
        lesson: "Andrews Lesson 23",
        lessonTitle: "Multiple-Valence VNC Object Positions",
        authorizationStatus: formula ? "authorized" : "blocked",
        blockReason: formula ? "" : "lesson23-typed-slot-realization-failed",
        valence: "multiple-object",
        multipleObjectClusterFrame: objectClusterFrame,
        proofFrame,
        selectedOutputLogicFrame,
        formulaRealization: formula,
        ruleLogicFrames: [objectClusterFrame, ...(Array.isArray(lowerMachineryFrame.ruleLogicFrames) ? cloneClassicalNahuatlVncSlotValue(lowerMachineryFrame.ruleLogicFrames) : [])],
        formulaOutputAllowed: true,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function buildClassicalNahuatlLesson23MultipleObjectVncFrame(lowerActiveMachineryFrame = null, {
      objectRequests = [],
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const lowerTypedFrame = lowerActiveMachineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || lowerActiveMachineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame;
      const sourceStem = normalizeClassicalNahuatlVncSlotStem(lowerActiveMachineryFrame?.sourceVerbstem || lowerActiveMachineryFrame?.stem);
      if (!isClassicalNahuatlVncSlotFrame(lowerTypedFrame)) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: "active",
          blockReason: "lesson23-authorized-lower-active-vnc-required",
          activeMachineryFrame: lowerActiveMachineryFrame,
          sourceValence: "multiple-object"
        });
      }
      const objectClusterFrame = buildClassicalNahuatlLesson23ObjectClusterFrame(sourceStem, {
        subject: lowerActiveMachineryFrame?.priorVncFrame?.subject || lowerActiveMachineryFrame?.subject || "",
        subjectCarrier: lowerTypedFrame.slots.subject.pers1,
        predicateStem: lowerTypedFrame.slots.predicate.stem,
        tense: lowerActiveMachineryFrame?.priorVncFrame?.tense || lowerActiveMachineryFrame?.tense || "",
        objectRequests,
        minimumPositionCount: 2,
        maximumPositionCount: 3,
        formulaArtifact,
        surfaceArtifact
      });
      if (!isClassicalNahuatlLesson23ObjectClusterFrame(objectClusterFrame, sourceStem)) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: "active",
          blockReason: objectClusterFrame.blockReason || "lesson23-authorized-object-cluster-required",
          activeMachineryFrame: lowerActiveMachineryFrame,
          sourceValence: "multiple-object"
        });
      }
      return applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(lowerActiveMachineryFrame, objectClusterFrame) || buildClassicalNahuatlLesson20To22BlockedFrame({
        voice: "active",
        blockReason: "lesson23-multiple-object-slot-application-failed",
        activeMachineryFrame: lowerActiveMachineryFrame,
        sourceValence: "multiple-object"
      });
    }
    function getClassicalNahuatlLesson20To22VoiceRuleRefs() {
      return [{
        id: "cn-l23-multiple-valence-object-sequence",
        tagId: "cn-l23-multiple-valence-object-sequence",
        lesson: "Andrews Lesson 23",
        lineStart: 7513,
        lineEnd: 7687,
        rule: "Two or three typed Valence positions are ordered by object form: specific before reflexive, specific before nonspecific, reflexive before nonspecific, and human before nonhuman; incompatible specific projectives retain only one sounded representative."
      }, {
        id: "cn-l20-nonactive-stem",
        tagId: "cn-l20-nonactive-stem",
        lesson: "Andrews Lesson 20",
        lineStart: 6841,
        lineEnd: 7020,
        rule: "The nonactive stem is a typed derived predicate stem and belongs to Class A-2."
      }, {
        id: "cn-l21-passive-specific-object",
        tagId: "cn-l21-passive-specific-object",
        lesson: "Andrews Lesson 21",
        lineStart: 7026,
        lineEnd: 7092,
        rule: "Passive deletes the active subject, substitutes the nonactive stem, and promotes one specific projective or reflexive object to subject."
      }, {
        id: "cn-l22-impersonal-complement",
        tagId: "cn-l22-impersonal-complement",
        lesson: "Andrews Lesson 22",
        lineStart: 7265,
        lineEnd: 7365,
        rule: "Impersonal replaces the active subject with an external third-singular impersonal subject and preserves only Canvas-compatible valence."
      }, {
        id: "cn-l22-inherent-impersonal",
        tagId: "cn-l22-inherent-impersonal",
        lesson: "Andrews Lesson 22.1",
        lineStart: 7225,
        lineEnd: 7264,
        rule: "An inherently impersonal lexical VNC has only an external referentially empty third-singular subject."
      }, {
        id: "cn-l22-tla-impersonal",
        tagId: "cn-l22-tla-impersonal",
        lesson: "Andrews Lesson 22.6",
        lineStart: 7386,
        lineEnd: 7445,
        rule: "A typed tla-impersonal derivation is a new intransitive impersonal stem, not an object-prefix substitution."
      }];
    }
    function buildClassicalNahuatlLesson20To22BlockedFrame({
      voice = "",
      blockReason = "classical-lessons20-22-authority-blocked",
      activeMachineryFrame = null,
      nonactiveStemRecord = null,
      inherentImpersonalRecord = null,
      tlaImpersonalStemRecord = null,
      sourceObjectClusterFrame = null,
      sourceValence = ""
    } = {}) {
      const proofFrame = {
        kind: "classical-nahuatl-lessons20-22-voice-proof-frame",
        authorizationStatus: "blocked",
        blockReason,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        conclusion: {
          authorized: false,
          blockReason,
          selectedFormula: "",
          authorizedFormula: "",
          finalBoundaryRealizationFrame: null,
          finalTypedVncSlotFrame: null
        }
      };
      return {
        kind: "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame",
        version: 1,
        lesson: "Andrews Lessons 20-22",
        lessonTitle: "Nonactive, passive, and impersonal VNCs",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: "blocked",
        blockReason,
        voice,
        sourceValence,
        activeMachineryFrame,
        nonactiveStemRecord,
        inherentImpersonalRecord,
        tlaImpersonalStemRecord,
        sourceObjectClusterFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-lessons20-22-selected-output-logic-frame",
          authorizationStatus: "blocked",
          blockReason,
          selectedFormula: "",
          formulaStringAuthority: false
        },
        ruleRefs: getClassicalNahuatlLesson20To22VoiceRuleRefs(),
        ruleLogicFrames: [nonactiveStemRecord, inherentImpersonalRecord, tlaImpersonalStemRecord, sourceObjectClusterFrame].filter(Boolean),
        ruleLogicFrameKinds: [nonactiveStemRecord?.kind, inherentImpersonalRecord?.kind, tlaImpersonalStemRecord?.kind, sourceObjectClusterFrame?.kind].filter(Boolean),
        grammarGenerationAllowed: false,
        formulaOutputAllowed: false,
        surfaceGenerationAllowed: false,
        blocksInput: true
      };
    }
    function buildClassicalNahuatlLessons20To22DerivedVncFrame(activeMachineryFrame = null, {
      voice = "active",
      nonactiveStemRecord = null,
      inherentImpersonalRecord = null,
      tlaImpersonalStemRecord = null,
      sourceObjectClusterFrame = null,
      sourceValence = "",
      sourceSubject = "",
      sourceObjectPerson = "",
      mood = "indicative",
      tense = "present",
      verbClass = "A",
      sentenceOptions = {}
    } = {}) {
      const normalizedVoice = normalizeClassicalNahuatlVncSlotCarrier(voice);
      if (normalizedVoice === "active") {
        return activeMachineryFrame;
      }
      const activeAuthorized = activeMachineryFrame?.proofFrame?.authorizationStatus === "authorized" && isClassicalNahuatlVncSlotFrame(activeMachineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || activeMachineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame);
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(activeMachineryFrame?.sourceVerbstem || activeMachineryFrame?.stem);
      const normalizedSourceValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence || activeMachineryFrame?.valence);
      const normalizedSourceSubject = normalizeClassicalNahuatlVncSlotCarrier(sourceSubject || activeMachineryFrame?.priorVncFrame?.subject);
      const normalizedObjectPerson = normalizeClassicalNahuatlVncSlotCarrier(sourceObjectPerson || activeMachineryFrame?.priorVncFrame?.objectFrame?.objectPerson);
      const requestedSourceObjectClusterFrame = sourceObjectClusterFrame || activeMachineryFrame?.multipleObjectClusterFrame || null;
      const multipleObjectSource = isClassicalNahuatlLesson23ObjectClusterFrame(requestedSourceObjectClusterFrame, normalizedSourceStem);
      const typedSourceObjectClusterFrame = multipleObjectSource ? requestedSourceObjectClusterFrame : null;
      const sourceClusterPositions = multipleObjectSource ? typedSourceObjectClusterFrame.positions : [];
      const sourceClusterSpecificPositions = sourceClusterPositions.filter(position => position.objectKind === "specific-projective");
      const passive = normalizedVoice === "passive";
      const impersonal = normalizedVoice === "impersonal";
      const inherentImpersonal = normalizedVoice === "inherent-impersonal";
      const tlaImpersonal = normalizedVoice === "tla-impersonal";
      if (!activeAuthorized) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: "lessons20-22-authorized-active-vnc-source-required",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (!passive && !impersonal && !inherentImpersonal && !tlaImpersonal) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: "lessons20-22-unknown-derived-voice",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if ((passive || impersonal) && !isClassicalNahuatlLesson20NonactiveStemRecord(nonactiveStemRecord, normalizedSourceStem)) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: nonactiveStemRecord?.blockReason || "lesson20-authorized-typed-nonactive-stem-record-required",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (inherentImpersonal && !isClassicalNahuatlLesson22InherentImpersonalRecord(inherentImpersonalRecord, normalizedSourceStem)) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: inherentImpersonalRecord?.blockReason || "lesson22-authorized-inherent-impersonal-record-required",
          activeMachineryFrame,
          inherentImpersonalRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (tlaImpersonal && !isClassicalNahuatlLesson22TlaImpersonalStemRecord(tlaImpersonalStemRecord, normalizedSourceStem)) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: tlaImpersonalStemRecord?.blockReason || "lesson22-authorized-tla-impersonal-stem-record-required",
          activeMachineryFrame,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      const reflexiveSource = ["mainline-reflexive", "shuntline-reflexive", "human-reciprocal"].includes(normalizedSourceValence) || sourceClusterPositions.some(position => position.objectKind === "reflexive");
      const specificProjectiveSource = normalizedSourceValence === "specific-projective" || sourceClusterSpecificPositions.length > 0;
      const nonspecificOrIntransitiveSource = ["intransitive", "projective-human", "projective-nonhuman"].includes(normalizedSourceValence);
      if (passive && multipleObjectSource && sourceClusterSpecificPositions.length === 0) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson21-passive-requires-specific-projective-object-in-cluster",
          activeMachineryFrame,
          nonactiveStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (passive && !multipleObjectSource && !specificProjectiveSource && !reflexiveSource) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson21-passive-requires-specific-projective-or-reflexive-object",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (impersonal && multipleObjectSource && sourceClusterSpecificPositions.length > 0) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson22-impersonal-blocks-specific-projective-object-cluster",
          activeMachineryFrame,
          nonactiveStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (impersonal && !multipleObjectSource && !nonspecificOrIntransitiveSource && !reflexiveSource) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson22-impersonal-blocks-specific-projective-object-source",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if ((inherentImpersonal || tlaImpersonal) && normalizedSourceValence !== "intransitive") {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: inherentImpersonal ? "lesson22-inherent-impersonal-requires-lexical-intransitive-source" : "lesson22-tla-impersonal-requires-intransitive-source",
          activeMachineryFrame,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      const voiceObjectClusterFrame = multipleObjectSource && (passive || impersonal) ? buildClassicalNahuatlLesson23VoiceObjectClusterFrame(typedSourceObjectClusterFrame, {
        voice: normalizedVoice,
        tense
      }) : null;
      if (voiceObjectClusterFrame && voiceObjectClusterFrame.authorizationStatus !== "authorized") {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: voiceObjectClusterFrame.blockReason,
          activeMachineryFrame,
          nonactiveStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      const targetSubject = passive ? multipleObjectSource ? voiceObjectClusterFrame.promotedObjectPerson : specificProjectiveSource ? normalizedObjectPerson : normalizedSourceSubject : "3sg";
      if (!targetSubject) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson21-promoted-specific-object-subject-required",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      const retainedObjectPositions = voiceObjectClusterFrame?.positions || [];
      const getSingleTargetValence = (position = null) => {
        if (!position) {
          return "intransitive";
        }
        return {
          reflexive: "shuntline-reflexive",
          "nonspecific-human": "projective-human",
          "nonspecific-nonhuman": "projective-nonhuman",
          "specific-projective": "specific-projective"
        }[position.objectKind] || "intransitive";
      };
      const targetValence = multipleObjectSource ? retainedObjectPositions.length > 1 ? "multiple-object" : getSingleTargetValence(retainedObjectPositions[0]) : passive ? specificProjectiveSource ? "intransitive" : "shuntline-reflexive" : inherentImpersonal || tlaImpersonal ? "intransitive" : reflexiveSource ? "shuntline-reflexive" : normalizedSourceValence;
      const targetBuilderValence = targetValence === "multiple-object" ? getSingleTargetValence(retainedObjectPositions[0]) : targetValence;
      const sourceLesson11Plan = activeMachineryFrame?.lesson11ParadigmPlan;
      const inheritedIrregularEnvironment = sourceLesson11Plan?.applies === true && sourceLesson11Plan.authorizationStatus === "authorized";
      const targetTense = inheritedIrregularEnvironment ? sourceLesson11Plan.morphologicalTense || tense : tense;
      const selectedNonactiveAspect = isClassicalNahuatlLesson20PerfectiveEnvironment({
        mood,
        tense: targetTense
      }) ? "perfective" : "imperfective";
      const targetStem = passive || impersonal ? selectedNonactiveAspect === "perfective" ? nonactiveStemRecord.perfectiveNonactiveStem || nonactiveStemRecord.nonactiveStem : nonactiveStemRecord.imperfectiveNonactiveStem || nonactiveStemRecord.nonactiveStem : inherentImpersonal ? inherentImpersonalRecord.inherentImpersonalStem : tlaImpersonalStemRecord.impersonalStem;
      const formulaTargetStem = multipleObjectSource && passive && nonactiveStemRecord?.suffixFamily === "ō" && retainedObjectPositions.length > 0 && !retainedObjectPositions.some(position => position.carrier === "qu-im") ? targetStem.replace(/ō$/u, "o") : targetStem;
      const targetClass = passive || impersonal ? "A" : verbClass;
      const targetClassProfile = passive || impersonal ? nonactiveStemRecord.targetClass || "A" : verbClass;
      const lexicalDerivationRecord = nonactiveStemRecord || inherentImpersonalRecord || tlaImpersonalStemRecord;
      const targetObjectKind = {
        "shuntline-reflexive": "shuntline-reflexive",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman",
        "mainline-reflexive": "mainline-reflexive",
        "human-reciprocal": "mainline-reflexive",
        "specific-projective": "specific-projective"
      }[targetBuilderValence] || "specific-projective";
      const derivedBuilder = getClassicalNahuatlVncLayerRuntimeTarget()?.buildClassicalNahuatlLesson7VerbstemClassFrame;
      if (typeof derivedBuilder !== "function") {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: "lessons20-22-derived-vnc-builder-unavailable",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceValence: normalizedSourceValence
        });
      }
      let derivedMachineryFrame = derivedBuilder(formulaTargetStem, {
        ...cloneClassicalNahuatlVncSlotValue(sentenceOptions),
        subject: targetSubject,
        mood,
        tense: targetTense,
        predicateTnsOverride: inheritedIrregularEnvironment ? sourceLesson11Plan.tnsOverride || "" : "",
        verbClass: targetClass,
        perfectiveClass: targetClass,
        valence: targetBuilderValence,
        transitivity: targetBuilderValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: targetObjectKind,
        objectPerson: targetBuilderValence === "specific-projective" ? retainedObjectPositions[0]?.objectPerson || normalizedObjectPerson : "",
        tlaFusion: false
      });
      if (voiceObjectClusterFrame?.positions?.length) {
        derivedMachineryFrame = applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(derivedMachineryFrame, voiceObjectClusterFrame, {
          sourceFrameKind: "classical-nahuatl-lessons21-23-derived-multiple-object-vnc-machinery-frame"
        });
      }
      const derivedAuthorized = derivedMachineryFrame?.proofFrame?.authorizationStatus === "authorized";
      if (!derivedAuthorized) {
        return buildClassicalNahuatlLesson20To22BlockedFrame({
          voice: normalizedVoice,
          blockReason: derivedMachineryFrame?.blockReason || derivedMachineryFrame?.proofFrame?.conclusion?.blockReason || "lessons20-22-derived-vnc-not-authorized",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      const derivedProofConclusion = cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.proofFrame.conclusion);
      const formula = derivedProofConclusion.selectedFormula || derivedProofConclusion.authorizedFormula || "";
      const voiceTransformationFrame = {
        kind: `classical-nahuatl-lesson${passive ? "21-passive" : `22-${normalizedVoice}`}-transformation-frame`,
        authorizationStatus: "authorized",
        voice: normalizedVoice,
        sourceStem: normalizedSourceStem,
        targetStem,
        realizedTargetStem: formulaTargetStem,
        sourceSubject: normalizedSourceSubject,
        sourceSubjectDeleted: true,
        sourceValence: normalizedSourceValence,
        targetValence,
        sourceSpecificObject: normalizedObjectPerson,
        sourceObjectClusterFrame: typedSourceObjectClusterFrame,
        sourceObjectPositionCount: sourceClusterPositions.length,
        sourceObjectCarriers: sourceClusterPositions.map(position => position.carrier),
        targetObjectClusterFrame: voiceObjectClusterFrame,
        retainedObjectCarriers: retainedObjectPositions.map(position => position.carrier),
        targetSubject,
        targetClass: targetClassProfile,
        selectedNonactiveAspect,
        promotedObjectBecomesSubject: passive,
        impersonalSubjectImportedFromOutsideSource: impersonal || inherentImpersonal || tlaImpersonal,
        impersonalSubjectReferent: passive ? "specific-patient" : "none",
        agentExpressible: false,
        lexicalDerivationRecordKind: lexicalDerivationRecord.kind,
        nonactiveStemRecordKind: nonactiveStemRecord?.kind || "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
      const proofFrame = {
        ...cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.proofFrame),
        kind: "classical-nahuatl-lessons20-22-voice-proof-frame",
        lesson: passive ? "Andrews Lesson 21" : "Andrews Lesson 22",
        authorizationStatus: "authorized",
        blockReason: "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        premises: [{
          lesson: passive || impersonal ? "Andrews Lesson 20" : "Andrews Lesson 22",
          passed: true,
          rule: passive || impersonal ? "One typed nonactive option supplies its aspect stem and routes through its Andrews Class A-1 or A-2 profile." : inherentImpersonal ? "A typed lexical classification authorizes this stem as inherently impersonal." : "One exact typed tla-impersonal stem replaces the intransitive source stem.",
          sourceStem: normalizedSourceStem,
          targetStem,
          suffixFamily: nonactiveStemRecord?.suffixFamily || ""
        }, {
          lesson: passive ? "Andrews Lesson 21" : "Andrews Lesson 22",
          passed: true,
          rule: passive ? "A specific patient becomes the subject; the active agent is deleted and cannot be expressed." : tlaImpersonal ? "The exact tla-impersonal derivation is intransitive and carries a referentially empty third-singular subject." : "The source has a referentially empty third-singular impersonal subject; specific projective objects are forbidden.",
          sourceValence: normalizedSourceValence,
          targetValence,
          targetSubject,
          sourceObjectClusterFrameKind: typedSourceObjectClusterFrame?.kind || "",
          targetObjectClusterFrameKind: voiceObjectClusterFrame?.kind || ""
        }],
        conclusion: {
          ...derivedProofConclusion,
          authorized: true,
          blockReason: "",
          selectedFormula: formula,
          authorizedFormula: formula,
          voiceTransformationFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          voiceObjectClusterFrame
        }
      };
      const selectedOutputLogicFrame = {
        ...cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.selectedOutputLogicFrame),
        kind: "classical-nahuatl-lessons20-22-selected-output-logic-frame",
        authorizationStatus: "authorized",
        selectedFormula: formula,
        formulaStringAuthority: false,
        outputFillers: {
          ...(cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.selectedOutputLogicFrame?.outputFillers) || {}),
          voice: normalizedVoice,
          activeSourceStem: normalizedSourceStem,
          derivedStem: targetStem,
          realizedDerivedStem: formulaTargetStem,
          targetClass: targetClassProfile,
          selectedNonactiveAspect,
          nonactiveStem: nonactiveStemRecord?.nonactiveStem || "",
          nonactiveSuffixFamily: nonactiveStemRecord?.suffixFamily || "",
          sourceValence: normalizedSourceValence,
          targetValence,
          sourceSubject: normalizedSourceSubject,
          targetSubject,
          sourceObjectCarriers: sourceClusterPositions.map(position => position.carrier),
          targetObjectCarriers: retainedObjectPositions.map(position => position.carrier)
        }
      };
      const ruleRefs = [...getClassicalNahuatlLesson20To22VoiceRuleRefs(), ...(Array.isArray(derivedMachineryFrame.ruleRefs) ? cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.ruleRefs) : [])];
      const ruleLogicFrames = [lexicalDerivationRecord, typedSourceObjectClusterFrame, voiceObjectClusterFrame, voiceTransformationFrame, ...(Array.isArray(derivedMachineryFrame.ruleLogicFrames) ? cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.ruleLogicFrames) : [])];
      return {
        ...cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame),
        kind: "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame",
        version: 1,
        lesson: passive ? "Andrews Lesson 21" : "Andrews Lesson 22",
        lessonTitle: passive ? "The Passive-Voice VNC" : "Impersonal VNCs",
        machineryScope: passive || impersonal ? "typed-active-source-to-nonactive-derived-voice-vnc" : "typed-source-to-lexically-authorized-impersonal-vnc",
        authorizationStatus: "authorized",
        blockReason: "",
        voice: normalizedVoice,
        stem: targetStem,
        nonactiveTargetClass: targetClassProfile,
        selectedNonactiveAspect,
        sourceVerbstem: normalizedSourceStem,
        sourceValence: normalizedSourceValence,
        valence: targetValence,
        subject: targetSubject,
        sourceSubject: normalizedSourceSubject,
        activeMachineryFrame,
        derivedMachineryFrame,
        nonactiveStemRecord,
        inherentImpersonalRecord,
        tlaImpersonalStemRecord,
        sourceObjectClusterFrame: typedSourceObjectClusterFrame,
        voiceObjectClusterFrame,
        voiceTransformationFrame,
        proofFrame,
        selectedOutputLogicFrame,
        formulaRealization: formula,
        ruleRefs,
        ruleLogicFrames,
        ruleLogicFrameKinds: ruleLogicFrames.map(frame => frame?.kind).filter(Boolean),
        grammarGenerationAllowed: false,
        formulaOutputAllowed: true,
        surfaceGenerationAllowed: false,
        blocksInput: false
      };
    }
    function buildClassicalNahuatlCanvasLayerContract({
      layerId = "",
      rank = 0,
      consumesFrameKind = "",
      producesFrameKind = "",
      operation = "transform",
      leavesInputProvisional = false,
      finalizes = "",
      witnessRefs = [],
      conflicts = []
    } = {}) {
      const complete = Boolean(layerId && consumesFrameKind && producesFrameKind);
      return {
        kind: "classical-nahuatl-canvas-layer-contract",
        layerId,
        rank: Number(rank) || 0,
        consumesFrameKind,
        producesFrameKind,
        operation,
        leavesInputProvisional: leavesInputProvisional === true,
        finalizes,
        witnessRefs: cloneClassicalNahuatlVncSlotValue(witnessRefs),
        conflicts: cloneClassicalNahuatlVncSlotValue(conflicts),
        authorizationStatus: complete ? "authorized" : "blocked",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT
      };
    }
    const CLASSICAL_NAHUATL_VNC_LAYER_CONTRACTS = Object.freeze([Object.freeze(buildClassicalNahuatlCanvasLayerContract({
      layerId: "lesson5-vnc-subject-tense",
      rank: 50,
      consumesFrameKind: "classical-nahuatl-lesson4-nuclear-clause-frame",
      producesFrameKind: "classical-nahuatl-vnc-slot-frame",
      operation: "establish-typed-vnc-slots",
      leavesInputProvisional: true,
      witnessRefs: ["cn-l5-intransitive-vnc-formula", "cn-l5-subject-positions", "cn-l5-num1-num2-variants", "cn-l5-predicate-tense-position"]
    })), Object.freeze(buildClassicalNahuatlCanvasLayerContract({
      layerId: "lesson6-vnc-object-valence",
      rank: 60,
      consumesFrameKind: "classical-nahuatl-vnc-slot-frame",
      producesFrameKind: "classical-nahuatl-vnc-slot-frame",
      operation: "transform-object-valence-slots",
      leavesInputProvisional: true,
      witnessRefs: ["cn-l6-transitive-vnc-formulas", "cn-l6-object-pronoun-categories", "cn-l6-projective-object-fillers"]
    })), Object.freeze(buildClassicalNahuatlCanvasLayerContract({
      layerId: "lesson7-verbstem-class",
      rank: 70,
      consumesFrameKind: "classical-nahuatl-vnc-slot-frame",
      producesFrameKind: "classical-nahuatl-vnc-slot-frame",
      operation: "transform-predicate-stem",
      leavesInputProvisional: true,
      witnessRefs: ["cn-l7-verbstem-classes", "cn-l7-core-tense-predicate-formation"]
    })), Object.freeze(buildClassicalNahuatlCanvasLayerContract({
      layerId: "lesson23-multiple-object-valence",
      rank: 75,
      consumesFrameKind: "classical-nahuatl-vnc-slot-frame",
      producesFrameKind: "classical-nahuatl-vnc-slot-frame",
      operation: "transform-ordered-multiple-object-valence-slots",
      leavesInputProvisional: true,
      witnessRefs: ["cn-l23-multiple-valence-object-sequence"]
    })), Object.freeze(buildClassicalNahuatlCanvasLayerContract({
      layerId: "lesson8-vnc-final-boundary",
      rank: 80,
      consumesFrameKind: "classical-nahuatl-vnc-slot-frame",
      producesFrameKind: "classical-nahuatl-lesson8-final-boundary-realization-frame",
      operation: "finalize-vnc-boundary-and-contextual-spelling",
      leavesInputProvisional: false,
      finalizes: "selected-vnc-formula",
      witnessRefs: ["cn-l8-81-expanded-vnc-boundary"]
    })), Object.freeze(buildClassicalNahuatlCanvasLayerContract({
      layerId: "lesson8-10-sentence-surface",
      rank: 90,
      consumesFrameKind: "classical-nahuatl-lesson8-final-boundary-realization-frame",
      producesFrameKind: "classical-nahuatl-sentence-surface-frame",
      operation: "finalize-sentence-force-and-outside-particles",
      leavesInputProvisional: false,
      finalizes: "sentence-surface",
      witnessRefs: ["cn-l8-82-86-sentence-surface", "cn-l9-95-99-optative-wish-command-sentence-layer", "cn-l10-101-105-admonitive-sentence-layer"]
    }))]);
    function getClassicalNahuatlVncLayerContracts() {
      return CLASSICAL_NAHUATL_VNC_LAYER_CONTRACTS.map(contract => cloneClassicalNahuatlVncSlotValue(contract));
    }
    function buildClassicalNahuatlCanvasLayerEvaluationFrame({
      priorVncFrame = null,
      finalBoundaryFrame = null,
      sentenceSurfaceFrame = null
    } = {}) {
      const typedVncFrame = priorVncFrame?.vncSlotFrame || priorVncFrame;
      const typedVncAuthorized = isClassicalNahuatlVncSlotFrame(typedVncFrame);
      const finalBoundaryAuthorized = finalBoundaryFrame?.kind === "classical-nahuatl-lesson8-final-boundary-realization-frame" && finalBoundaryFrame?.authorizationStatus === "authorized" && finalBoundaryFrame?.typedSlotAuthority === true && finalBoundaryFrame?.formulaStringAuthority === false;
      const sentenceRequested = Boolean(sentenceSurfaceFrame);
      const sentenceAuthorized = !sentenceRequested || sentenceSurfaceFrame?.authorizationStatus === "authorized";
      const activeLayerIds = [typedVncAuthorized ? "lesson5-vnc-subject-tense" : "", priorVncFrame?.kind === "classical-nahuatl-lesson6-transitive-vnc-object-frame" ? "lesson6-vnc-object-valence" : "", finalBoundaryAuthorized ? "lesson7-verbstem-class" : "", finalBoundaryAuthorized ? "lesson8-vnc-final-boundary" : "", sentenceRequested && sentenceAuthorized ? "lesson8-10-sentence-surface" : ""].filter(Boolean);
      const finalizerLayerId = sentenceRequested && sentenceAuthorized ? "lesson8-10-sentence-surface" : finalBoundaryAuthorized ? "lesson8-vnc-final-boundary" : "";
      const authorized = typedVncAuthorized && finalBoundaryAuthorized && sentenceAuthorized;
      return {
        kind: "classical-nahuatl-canvas-layer-evaluation-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : !typedVncAuthorized ? "missing-or-contradictory-typed-vnc-input" : !finalBoundaryAuthorized ? "typed-vnc-final-boundary-not-authorized" : "sentence-finalizer-not-authorized",
        activeLayerIds,
        contracts: getClassicalNahuatlVncLayerContracts().filter(contract => activeLayerIds.includes(contract.layerId)),
        provisionalFrameKind: finalBoundaryAuthorized ? "" : "classical-nahuatl-vnc-slot-frame",
        finalizerLayerId,
        finalSurfaceKind: sentenceRequested ? "sentence-surface" : "selected-vnc-formula",
        typedSlotAuthority: true,
        formulaStringAuthority: false
      };
    }
    function getClassicalNahuatlAuthorityCapabilityFrame(surfaceFrame = null) {
      const basalUnit = normalizeClassicalNahuatlVncSlotCarrier(surfaceFrame?.basalUnit);
      const machinery = surfaceFrame?.machineryFrame || {};
      const frameKinds = new Set([...(Array.isArray(machinery.ruleLogicFrameKinds) ? machinery.ruleLogicFrameKinds : []), machinery.kind, machinery.priorVncFrame?.kind, machinery.expandedVncBoundaryFrame?.kind, machinery.sentenceSurfaceFrame?.kind, surfaceFrame?.selectedOutputLogicFrame?.kind].filter(Boolean));
      const isVnc = basalUnit === "vnc";
      const isNnc = basalUnit === "nnc";
      const hasTypedNnc = isNnc && Boolean(machinery.nncSlotFrame?.kind === "classical-nahuatl-nnc-slot-frame" || machinery.selectedOutputLogicFrame?.selectedNncSlotFrame?.kind === "classical-nahuatl-nnc-slot-frame");
      const hasLesson5 = isVnc && (frameKinds.has("classical-nahuatl-lesson5-vnc-subject-tense-frame") || frameKinds.has("classical-nahuatl-lesson6-transitive-vnc-object-frame") || frameKinds.has("classical-nahuatl-lesson7-verbstem-class-machinery-frame") || frameKinds.has("classical-nahuatl-lessons20-22-derived-vnc-machinery-frame"));
      const hasLesson7 = isVnc && (frameKinds.has("classical-nahuatl-lesson7-verbstem-class-machinery-frame") || frameKinds.has("classical-nahuatl-lessons20-22-derived-vnc-machinery-frame") || Boolean(machinery.classRuleFrame && machinery.predicateFormationRuleFrame));
      const hasExpandedVnc = hasLesson7 && Boolean(machinery.expandedVncBoundaryFrame || frameKinds.has("classical-nahuatl-lesson8-expanded-vnc-boundary-frame"));
      const hasSentenceSurface = hasLesson7 && Boolean(machinery.sentenceSurfaceFrame || frameKinds.has("classical-nahuatl-lesson8-sentence-surface-frame"));
      return {
        kind: "classical-nahuatl-authority-capability-frame",
        authorizationStatus: isVnc || hasTypedNnc ? "authorized" : "not-applicable",
        basalUnit,
        frameKinds: Array.from(frameKinds),
        capabilities: {
          subject: isVnc || hasTypedNnc,
          mood: hasLesson5,
          tense: hasLesson5,
          verbstemClass: hasLesson7,
          valence: hasLesson7,
          object: hasLesson7,
          voice: hasLesson7,
          nonactiveStem: hasLesson7,
          tlaFusion: hasLesson7,
          directionalLocative: hasExpandedVnc,
          outsidePrefixStack: hasExpandedVnc,
          polarity: hasSentenceSurface || hasTypedNnc,
          sentenceSurface: hasSentenceSurface || hasTypedNnc,
          introductoryParticle: hasSentenceSurface,
          prefaceParticle: hasSentenceSurface,
          introductoryModifier: hasSentenceSurface
        },
        capabilityAuthority: "derived-from-authorized-machine-frames",
        lessonNumberAuthority: false
      };
    }
    function validateClassicalNahuatlAuthorityOptionLedger({
      authorityOptionTags = [],
      visibleOptionTagIds = [],
      transcriptionLineCount = 0
    } = {}) {
      const requiredFields = ["tagId", "controlId", "value", "canvasStatus", "applicability", "outputBehavior", "transcriptionLineStart", "transcriptionLineEnd", "exactWitness"];
      const allowedStatuses = new Set(["required", "optional", "conditioned-optional", "authorized", "required-choice-prompt", "not-applicable", "blocked", "not-implemented-yet"]);
      const records = Array.isArray(authorityOptionTags) ? authorityOptionTags : [];
      const visibleIds = Array.isArray(visibleOptionTagIds) ? visibleOptionTagIds.map(tagId => normalizeClassicalNahuatlVncSlotCarrier(tagId)).filter(Boolean) : [];
      const duplicateTagIds = records.map(record => normalizeClassicalNahuatlVncSlotCarrier(record?.tagId)).filter((tagId, index, all) => tagId && all.indexOf(tagId) !== index);
      const duplicateControlValues = records.map(record => `${normalizeClassicalNahuatlVncSlotCarrier(record?.controlId)}::${normalizeClassicalNahuatlVncSlotCarrier(record?.value)}`).filter((key, index, all) => key !== "::" && all.indexOf(key) !== index);
      const incompleteRecords = records.filter(record => requiredFields.some(field => {
        const value = record?.[field];
        if (field === "value" && (record?.canvasStatus === "required-choice-prompt" || record?.allowEmptyValue === true) && value === "") {
          return false;
        }
        return value === undefined || value === null || String(value).trim() === "";
      })).map(record => record?.tagId || "<untagged>");
      const invalidStatuses = records.filter(record => !allowedStatuses.has(String(record?.canvasStatus || ""))).map(record => record?.tagId || "<untagged>");
      const invalidWitnessRanges = records.filter(record => {
        const start = Number(record?.transcriptionLineStart) || 0;
        const end = Number(record?.transcriptionLineEnd) || 0;
        return start < 1 || end < start || transcriptionLineCount > 0 && end > transcriptionLineCount;
      }).map(record => record?.tagId || "<untagged>");
      const recordIds = new Set(records.map(record => String(record?.tagId || "")).filter(Boolean));
      const missingVisibleTags = visibleIds.filter(tagId => !recordIds.has(tagId));
      const duplicateVisibleTags = visibleIds.filter((tagId, index, all) => all.indexOf(tagId) !== index);
      const authorized = Boolean(records.length && visibleIds.length && !duplicateTagIds.length && !duplicateControlValues.length && !incompleteRecords.length && !invalidStatuses.length && !invalidWitnessRanges.length && !missingVisibleTags.length && !duplicateVisibleTags.length);
      return {
        kind: "classical-nahuatl-authority-option-ledger-validation-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        recordCount: records.length,
        visibleOptionCount: visibleIds.length,
        requiredFields,
        duplicateTagIds: Array.from(new Set(duplicateTagIds)),
        duplicateControlValues: Array.from(new Set(duplicateControlValues)),
        incompleteRecords,
        invalidStatuses,
        invalidWitnessRanges,
        missingVisibleTags,
        duplicateVisibleTags: Array.from(new Set(duplicateVisibleTags)),
        futureOptionPolicy: "a-visible-authority-option-without-a-complete-canvas-tag-fails-validation"
      };
    }
    function installClassicalNahuatlVncLayerEvaluatorClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        buildClassicalNahuatlVncSlotFrame,
        isClassicalNahuatlVncSlotFrame,
        renderClassicalNahuatlVncSlotFrameFormula,
        buildClassicalNahuatlVncDiagrammaticFrame,
        applyClassicalNahuatlDirectionalProgressiveAssimilation,
        realizeClassicalNahuatlVncSlotFrameAtFinalBoundary,
        buildClassicalNahuatlLesson20StemFinalShapeFrame,
        buildClassicalNahuatlLesson20ActiveStemIdentityFrame,
        buildClassicalNahuatlLesson20NonactiveFinalShapeRelation,
        getClassicalNahuatlLesson20NonactiveFormationStructure,
        doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily,
        buildClassicalNahuatlLesson20ClassCFinalIVowelLengthRuleFrame,
        buildClassicalNahuatlLesson20FinalIOHuaVowelLengthRuleFrame,
        buildClassicalNahuatlLesson20ProductiveCandidateSet,
        buildClassicalNahuatlLesson20NonactiveCandidateLattice,
        getClassicalNahuatlLesson20NonactiveStemOptions,
        deriveClassicalNahuatlLesson20NonactiveStemRecord,
        buildClassicalNahuatlLesson20NonactiveStemRecord,
        isClassicalNahuatlLesson20NonactiveStemRecord,
        buildClassicalNahuatlLesson22InherentImpersonalRecord,
        isClassicalNahuatlLesson22InherentImpersonalRecord,
        buildClassicalNahuatlLesson22TlaImpersonalStemRecord,
        isClassicalNahuatlLesson22TlaImpersonalStemRecord,
        getClassicalNahuatlOrderedVoiceLayerOptions,
        getClassicalNahuatlOrderedVoiceLayerCascadeOptions,
        deriveClassicalNahuatlOrderedVoiceLayerChain,
        isClassicalNahuatlOrderedVoiceLayerChain,
        buildClassicalNahuatlLesson23ObjectClusterFrame,
        isClassicalNahuatlLesson23ObjectClusterFrame,
        buildClassicalNahuatlLesson23VoiceObjectClusterFrame,
        applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame,
        buildClassicalNahuatlLesson23MultipleObjectVncFrame,
        getClassicalNahuatlLesson20To22VoiceRuleRefs,
        buildClassicalNahuatlLessons20To22DerivedVncFrame,
        buildClassicalNahuatlCanvasLayerContract,
        getClassicalNahuatlVncLayerContracts,
        buildClassicalNahuatlCanvasLayerEvaluationFrame,
        getClassicalNahuatlAuthorityCapabilityFrame,
        validateClassicalNahuatlAuthorityOptionLedger
      });
      return globalTarget;
    }
    if (typeof targetObject.module !== "undefined" && targetObject.module.exports) {
      targetObject.module.exports = {
        buildClassicalNahuatlVncSlotFrame,
        isClassicalNahuatlVncSlotFrame,
        renderClassicalNahuatlVncSlotFrameFormula,
        buildClassicalNahuatlVncDiagrammaticFrame,
        applyClassicalNahuatlDirectionalProgressiveAssimilation,
        realizeClassicalNahuatlVncSlotFrameAtFinalBoundary,
        buildClassicalNahuatlLesson20StemFinalShapeFrame,
        buildClassicalNahuatlLesson20ActiveStemIdentityFrame,
        buildClassicalNahuatlLesson20NonactiveFinalShapeRelation,
        getClassicalNahuatlLesson20NonactiveFormationStructure,
        doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily,
        buildClassicalNahuatlLesson20ClassCFinalIVowelLengthRuleFrame,
        buildClassicalNahuatlLesson20FinalIOHuaVowelLengthRuleFrame,
        buildClassicalNahuatlLesson20ProductiveCandidateSet,
        buildClassicalNahuatlLesson20NonactiveCandidateLattice,
        getClassicalNahuatlLesson20NonactiveStemOptions,
        deriveClassicalNahuatlLesson20NonactiveStemRecord,
        buildClassicalNahuatlLesson20NonactiveStemRecord,
        isClassicalNahuatlLesson20NonactiveStemRecord,
        buildClassicalNahuatlLesson22InherentImpersonalRecord,
        isClassicalNahuatlLesson22InherentImpersonalRecord,
        buildClassicalNahuatlLesson22TlaImpersonalStemRecord,
        isClassicalNahuatlLesson22TlaImpersonalStemRecord,
        getClassicalNahuatlOrderedVoiceLayerOptions,
        getClassicalNahuatlOrderedVoiceLayerCascadeOptions,
        deriveClassicalNahuatlOrderedVoiceLayerChain,
        isClassicalNahuatlOrderedVoiceLayerChain,
        buildClassicalNahuatlLesson23ObjectClusterFrame,
        isClassicalNahuatlLesson23ObjectClusterFrame,
        buildClassicalNahuatlLesson23VoiceObjectClusterFrame,
        applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame,
        buildClassicalNahuatlLesson23MultipleObjectVncFrame,
        getClassicalNahuatlLesson20To22VoiceRuleRefs,
        buildClassicalNahuatlLessons20To22DerivedVncFrame,
        buildClassicalNahuatlCanvasLayerContract,
        getClassicalNahuatlVncLayerContracts,
        buildClassicalNahuatlCanvasLayerEvaluationFrame,
        getClassicalNahuatlAuthorityCapabilityFrame,
        validateClassicalNahuatlAuthorityOptionLedger,
        installClassicalNahuatlVncLayerEvaluatorClassicGlobals
      };
    }
    if (typeof targetObject.window !== "undefined") {
      installClassicalNahuatlVncLayerEvaluatorClassicGlobals();
    }

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_SLOT_FRAME_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_SLOT_FRAME_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO; },
    });
    api.cloneClassicalNahuatlVncSlotValue = cloneClassicalNahuatlVncSlotValue;
    api.normalizeClassicalNahuatlVncSlotCarrier = normalizeClassicalNahuatlVncSlotCarrier;
    api.normalizeClassicalNahuatlVncSlotStem = normalizeClassicalNahuatlVncSlotStem;
    api.getClassicalNahuatlVncSlotFirstSound = getClassicalNahuatlVncSlotFirstSound;
    api.getClassicalNahuatlVncSlotLastSound = getClassicalNahuatlVncSlotLastSound;
    api.isClassicalNahuatlVncSlotVowelSound = isClassicalNahuatlVncSlotVowelSound;
    api.getClassicalNahuatlVncSubjectCarrierFamily = getClassicalNahuatlVncSubjectCarrierFamily;
    api.buildClassicalNahuatlVncSlotFrame = buildClassicalNahuatlVncSlotFrame;
    api.isClassicalNahuatlVncSlotFrame = isClassicalNahuatlVncSlotFrame;
    api.renderClassicalNahuatlVncSlotFrameFormula = renderClassicalNahuatlVncSlotFrameFormula;
    api.getClassicalNahuatlVncGeneralFormulaProjection = getClassicalNahuatlVncGeneralFormulaProjection;
    api.buildClassicalNahuatlVncDiagrammaticFrame = buildClassicalNahuatlVncDiagrammaticFrame;
    api.getClassicalNahuatlVncNextCarrierAfterSubject = getClassicalNahuatlVncNextCarrierAfterSubject;
    api.getClassicalNahuatlVncCarrierBeforeSlot = getClassicalNahuatlVncCarrierBeforeSlot;
    api.getClassicalNahuatlVncCarrierAfterSlot = getClassicalNahuatlVncCarrierAfterSlot;
    api.isClassicalNahuatlVncSilentCarrier = isClassicalNahuatlVncSilentCarrier;
    api.isClassicalNahuatlVncNum1KContext = isClassicalNahuatlVncNum1KContext;
    api.insertClassicalNahuatlDirectionalSlot = insertClassicalNahuatlDirectionalSlot;
    api.getClassicalNahuatlVncLayerRuntimeTarget = getClassicalNahuatlVncLayerRuntimeTarget;
    api.applyClassicalNahuatlDirectionalProgressiveAssimilation = applyClassicalNahuatlDirectionalProgressiveAssimilation;
    api.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary = realizeClassicalNahuatlVncSlotFrameAtFinalBoundary;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NONACTIVE_SUFFIX_FAMILIES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NONACTIVE_SUFFIX_FAMILIES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NONACTIVE_FORMATION_CORES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NONACTIVE_FORMATION_CORES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NONACTIVE_FORMATION_STRUCTURES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NONACTIVE_FORMATION_STRUCTURES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON20_ACTIVE_STEM_IDENTITIES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON20_ACTIVE_STEM_IDENTITIES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON20_FIXED_FORMATIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON20_FIXED_FORMATIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_CROSS_LESSON_NONACTIVE_SUPPLEMENTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_CROSS_LESSON_NONACTIVE_SUPPLEMENTS; },
    });
    api.getClassicalNahuatlNonactiveFormationAuthorityLabel = getClassicalNahuatlNonactiveFormationAuthorityLabel;
    api.getClassicalNahuatlLesson20NonactiveTargetClass = getClassicalNahuatlLesson20NonactiveTargetClass;
    api.isClassicalNahuatlLesson20PerfectiveEnvironment = isClassicalNahuatlLesson20PerfectiveEnvironment;
    api.getClassicalNahuatlLesson20FinalShapeTail = getClassicalNahuatlLesson20FinalShapeTail;
    api.getClassicalNahuatlLesson20FinalShapeSound = getClassicalNahuatlLesson20FinalShapeSound;
    api.buildClassicalNahuatlLesson20StemFinalShapeFrame = buildClassicalNahuatlLesson20StemFinalShapeFrame;
    api.isClassicalNahuatlLesson20TransitiveValence = isClassicalNahuatlLesson20TransitiveValence;
    api.buildClassicalNahuatlLesson20ActiveStemIdentityFrame = buildClassicalNahuatlLesson20ActiveStemIdentityFrame;
    api.replaceClassicalNahuatlLesson20FinalShape = replaceClassicalNahuatlLesson20FinalShape;
    api.buildClassicalNahuatlLesson20NonactiveFinalShapeRelation = buildClassicalNahuatlLesson20NonactiveFinalShapeRelation;
    api.getClassicalNahuatlLesson20NonactiveFormationStructure = getClassicalNahuatlLesson20NonactiveFormationStructure;
    api.doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily = doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON20_CLASS_C_FINAL_I_LENGTH_CLASSES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON20_CLASS_C_FINAL_I_LENGTH_CLASSES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON20_POSTVOCALIC_TI_CHO_EXCLUSIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON20_POSTVOCALIC_TI_CHO_EXCLUSIONS; },
    });
    api.buildClassicalNahuatlLesson20ClassCFinalIVowelLengthRuleFrame = buildClassicalNahuatlLesson20ClassCFinalIVowelLengthRuleFrame;
    api.buildClassicalNahuatlLesson20FinalIOHuaVowelLengthRuleFrame = buildClassicalNahuatlLesson20FinalIOHuaVowelLengthRuleFrame;
    api.buildClassicalNahuatlLesson20ProductiveCandidateSet = buildClassicalNahuatlLesson20ProductiveCandidateSet;
    api.buildClassicalNahuatlLesson20ProductiveOptions = buildClassicalNahuatlLesson20ProductiveOptions;
    api.filterClassicalNahuatlLesson20FormationsForContext = filterClassicalNahuatlLesson20FormationsForContext;
    api.getClassicalNahuatlLesson20NonactiveUnresolvedReason = getClassicalNahuatlLesson20NonactiveUnresolvedReason;
    api.buildClassicalNahuatlLesson20NonactiveCandidateLattice = buildClassicalNahuatlLesson20NonactiveCandidateLattice;
    api.getClassicalNahuatlLesson20NonactiveStemOptions = getClassicalNahuatlLesson20NonactiveStemOptions;
    api.deriveClassicalNahuatlLesson20NonactiveStemRecord = deriveClassicalNahuatlLesson20NonactiveStemRecord;
    api.finalizeClassicalNahuatlLesson20NonactiveStemRecord = finalizeClassicalNahuatlLesson20NonactiveStemRecord;
    api.buildClassicalNahuatlLesson20NonactiveStemRecord = buildClassicalNahuatlLesson20NonactiveStemRecord;
    api.isClassicalNahuatlLesson20NonactiveStemRecord = isClassicalNahuatlLesson20NonactiveStemRecord;
    api.buildClassicalNahuatlLesson22InherentImpersonalRecord = buildClassicalNahuatlLesson22InherentImpersonalRecord;
    api.isClassicalNahuatlLesson22InherentImpersonalRecord = isClassicalNahuatlLesson22InherentImpersonalRecord;
    api.buildClassicalNahuatlLesson22TlaImpersonalStemRecord = buildClassicalNahuatlLesson22TlaImpersonalStemRecord;
    api.isClassicalNahuatlLesson22TlaImpersonalStemRecord = isClassicalNahuatlLesson22TlaImpersonalStemRecord;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS; },
    });
    api.isClassicalNahuatlOrderedVoiceLayerIntermediateStem = isClassicalNahuatlOrderedVoiceLayerIntermediateStem;
    api.getClassicalNahuatlOrderedVoiceLayerOptions = getClassicalNahuatlOrderedVoiceLayerOptions;
    api.getClassicalNahuatlOrderedVoiceLayerCascadeOptions = getClassicalNahuatlOrderedVoiceLayerCascadeOptions;
    api.getClassicalNahuatlOrderedVoiceLayerSignature = getClassicalNahuatlOrderedVoiceLayerSignature;
    api.deriveClassicalNahuatlOrderedVoiceLayerChain = deriveClassicalNahuatlOrderedVoiceLayerChain;
    api.isClassicalNahuatlOrderedVoiceLayerChain = isClassicalNahuatlOrderedVoiceLayerChain;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON23_OBJECT_SEQUENCE_PRIORITY", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON23_OBJECT_SEQUENCE_PRIORITY; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON23_OBJECT_GOVERNORS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON23_OBJECT_GOVERNORS; },
    });
    api.getClassicalNahuatlLesson23ReflexiveVa1 = getClassicalNahuatlLesson23ReflexiveVa1;
    api.getClassicalNahuatlLesson23SpecificDyad = getClassicalNahuatlLesson23SpecificDyad;
    api.getClassicalNahuatlLesson23PositionPreviewCarrier = getClassicalNahuatlLesson23PositionPreviewCarrier;
    api.buildClassicalNahuatlLesson23ObjectClusterFrame = buildClassicalNahuatlLesson23ObjectClusterFrame;
    api.isClassicalNahuatlLesson23ObjectClusterFrame = isClassicalNahuatlLesson23ObjectClusterFrame;
    api.buildClassicalNahuatlLesson23VoiceObjectClusterFrame = buildClassicalNahuatlLesson23VoiceObjectClusterFrame;
    api.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame = applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame;
    api.buildClassicalNahuatlLesson23MultipleObjectVncFrame = buildClassicalNahuatlLesson23MultipleObjectVncFrame;
    api.getClassicalNahuatlLesson20To22VoiceRuleRefs = getClassicalNahuatlLesson20To22VoiceRuleRefs;
    api.buildClassicalNahuatlLesson20To22BlockedFrame = buildClassicalNahuatlLesson20To22BlockedFrame;
    api.buildClassicalNahuatlLessons20To22DerivedVncFrame = buildClassicalNahuatlLessons20To22DerivedVncFrame;
    api.buildClassicalNahuatlCanvasLayerContract = buildClassicalNahuatlCanvasLayerContract;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_LAYER_CONTRACTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_LAYER_CONTRACTS; },
    });
    api.getClassicalNahuatlVncLayerContracts = getClassicalNahuatlVncLayerContracts;
    api.buildClassicalNahuatlCanvasLayerEvaluationFrame = buildClassicalNahuatlCanvasLayerEvaluationFrame;
    api.getClassicalNahuatlAuthorityCapabilityFrame = getClassicalNahuatlAuthorityCapabilityFrame;
    api.validateClassicalNahuatlAuthorityOptionLedger = validateClassicalNahuatlAuthorityOptionLedger;
    api.installClassicalNahuatlVncLayerEvaluatorClassicGlobals = installClassicalNahuatlVncLayerEvaluatorClassicGlobals;
    return api;
}

export function installClassicalNahuatlVncLayerEvaluatorGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlVncLayerEvaluatorApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
