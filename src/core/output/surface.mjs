// Canonical modern ESM module.

export function createOutputSurfaceApi(targetObject = globalThis) {
    // Phonological category: C = any consonant onset.
    // Uppercase = category marker (standard phonological notation).
    // Built lazily from VALID_CONSONANTS — the consonant inventory is the single source of truth.
    var C = "";
    function ensureC() {
      if (!C) C = [...targetObject.VALID_CONSONANTS].join("");
    }

    // Coda rule regexes — each matches its target before C or word-finally.
    var _codaReKw = null;
    var _codaReY = null;
    var _codaReM = null;
    function buildCodaRe(target) {
      ensureC();
      return new RegExp(`${target}(?=[${C}]|$)`, "g");
    }
    function endsWithAny(value, suffixes) {
      return suffixes.some(suffix => value.endsWith(suffix));
    }
    var OUTPUT_SURFACE_ROLES = Object.freeze(["pers1", "poseedor", "obj1", "tronco", "pers2", "num2", "sufijoNominal", "prefijoExternoFuente", "particulaPrepuesta"]);
    function normalizeOutputSurfaceRole(role = "") {
      const normalizedRole = String(role || "");
      return OUTPUT_SURFACE_ROLES.includes(normalizedRole) ? normalizedRole : normalizedRole;
    }
    function normalizeOutputSurfaceSlotInput(input = {}) {
      const node = input && typeof input === "object" ? input : {};
      const pers1 = String(node.pers1 ?? "");
      const poseedor = String(node.poseedor ?? "");
      const obj1 = String(node.obj1 ?? "");
      const tronco = String(node.tronco ?? "");
      const pers2 = String(node.pers2 ?? node.num2 ?? "");
      return {
        ...node,
        particulaPrepuesta: String(node.particulaPrepuesta ?? ""),
        pers1,
        poseedor,
        obj1,
        tronco,
        pers2,
        sufijoNominal: String(node.sufijoNominal ?? "")
      };
    }
    function cloneSurfaceChainStructuredFrame(value = null) {
      if (Array.isArray(value)) {
        return value.map(entry => cloneSurfaceChainStructuredFrame(entry));
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      const clone = {};
      Object.keys(value).forEach(key => {
        clone[key] = cloneSurfaceChainStructuredFrame(value[key]);
      });
      return clone;
    }
    function normalizeSurfaceChainStructuredFrames(frames = []) {
      return (Array.isArray(frames) ? frames : []).map(frame => cloneSurfaceChainStructuredFrame(frame)).filter(frame => frame && typeof frame === "object" && frame.kind);
    }
    function buildSurfaceChainFinalIAUATrimSourceFrame({
      tronco = "",
      surfaceRuleMeta = null
    } = {}) {
      const meta = surfaceRuleMeta && typeof surfaceRuleMeta === "object" ? surfaceRuleMeta : {};
      const sourceStem = String(tronco || "");
      const requested = meta.trimFinalIAUAVowel === true;
      const sourceSuffix = requested ? targetObject.IA_UA_SUFFIXES.find(suffix => sourceStem.endsWith(suffix)) || "" : "";
      const removedLetter = sourceSuffix ? sourceStem.slice(-1) : "";
      const targetStem = sourceSuffix ? sourceStem.slice(0, -1) : "";
      const diagnostics = [];
      if (!requested) {
        diagnostics.push("trim-final-ia-ua-not-requested");
      }
      if (requested && !sourceStem) {
        diagnostics.push("missing-source-stem");
      }
      if (requested && sourceStem && !sourceSuffix) {
        diagnostics.push("source-stem-not-ia-ua-final");
      }
      return {
        kind: "surface-chain-final-ia-ua-trim-source-frame",
        routeId: "surface-chain-final-ia-ua-trim",
        sourceSlot: "tronco",
        sourceStem,
        sourceSuffix,
        removedLetter,
        targetStem,
        requested,
        supported: requested && Boolean(sourceSuffix && targetStem),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainFinalIAUATrimOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "surface-chain-final-ia-ua-trim-source-frame") {
        return null;
      }
      const sourceStem = String(sourceFrame.sourceStem || "");
      const sourceSuffix = String(sourceFrame.sourceSuffix || "");
      const targetStem = String(sourceFrame.targetStem || "");
      const supported = sourceFrame.supported === true && Boolean(sourceStem && sourceSuffix && targetStem) && targetStem === sourceStem.slice(0, -1);
      return {
        kind: "andrews-surface-chain-final-ia-ua-trim-operation-frame",
        operationId: "andrews-surface-chain-final-ia-ua-trim",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "surface-chain-final-ia-ua-trim-target-frame",
          targetSlot: "tronco",
          sourceStem,
          sourceSuffix,
          removedLetter: String(sourceFrame.removedLetter || ""),
          targetStem
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-final-ia-ua-trim-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainObjectIInitialElisionSourceFrame({
      obj1 = "",
      tronco = "",
      surfaceRuleMeta = null
    } = {}) {
      const meta = surfaceRuleMeta && typeof surfaceRuleMeta === "object" ? surfaceRuleMeta : {};
      const objectPrefix = String(obj1 || "");
      const sourceStem = String(tronco || "");
      const requested = meta.dropVerbInitialIAfterObjectI === true;
      const sourceObjectFinal = requested && objectPrefix.endsWith("i") ? "i" : "";
      const sourceStemInitial = requested && sourceStem.startsWith("i") ? "i" : "";
      const targetStem = sourceObjectFinal && sourceStemInitial ? sourceStem.slice(1) : "";
      const diagnostics = [];
      if (!requested) {
        diagnostics.push("object-i-initial-elision-not-requested");
      }
      if (requested && !objectPrefix) {
        diagnostics.push("missing-object-prefix");
      }
      if (requested && !sourceStem) {
        diagnostics.push("missing-source-stem");
      }
      if (requested && objectPrefix && !sourceObjectFinal) {
        diagnostics.push("object-prefix-not-i-final");
      }
      if (requested && sourceStem && !sourceStemInitial) {
        diagnostics.push("source-stem-not-i-initial");
      }
      return {
        kind: "surface-chain-object-i-initial-elision-source-frame",
        routeId: "surface-chain-object-i-initial-elision",
        sourceObjectSlot: "obj1",
        sourceStemSlot: "tronco",
        objectPrefix,
        sourceStem,
        sourceObjectFinal,
        sourceStemInitial,
        targetStem,
        requested,
        supported: requested && Boolean(sourceObjectFinal && sourceStemInitial && targetStem),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainObjectIInitialElisionOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "surface-chain-object-i-initial-elision-source-frame") {
        return null;
      }
      const objectPrefix = String(sourceFrame.objectPrefix || "");
      const sourceStem = String(sourceFrame.sourceStem || "");
      const targetStem = String(sourceFrame.targetStem || "");
      const supported = sourceFrame.supported === true && Boolean(objectPrefix && sourceStem && targetStem) && objectPrefix.endsWith("i") && sourceStem.startsWith("i") && targetStem === sourceStem.slice(1);
      return {
        kind: "andrews-surface-chain-object-i-initial-elision-operation-frame",
        operationId: "andrews-surface-chain-object-i-initial-elision",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "surface-chain-object-i-initial-elision-target-frame",
          targetSlot: "tronco",
          objectPrefix,
          sourceStem,
          removedLetter: String(sourceFrame.sourceStemInitial || ""),
          targetStem
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-object-i-initial-elision-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainMuIskaliaReductionSourceFrame({
      obj1 = "",
      tronco = "",
      surfaceRuleMeta = null
    } = {}) {
      const meta = surfaceRuleMeta && typeof surfaceRuleMeta === "object" ? surfaceRuleMeta : {};
      const objectPrefix = String(obj1 || "");
      const sourceStem = String(tronco || "");
      const requested = meta.dropInitialIFromIskaliaAfterMu === true;
      const sourceStemInitial = requested && sourceStem.startsWith("iskalia") ? "i" : "";
      const targetStem = sourceStemInitial ? sourceStem.slice(1) : "";
      const diagnostics = [];
      if (!requested) {
        diagnostics.push("mu-iskalia-reduction-not-requested");
      }
      if (requested && objectPrefix !== "mu") {
        diagnostics.push("object-prefix-not-mu");
      }
      if (requested && !sourceStem) {
        diagnostics.push("missing-source-stem");
      }
      if (requested && sourceStem && !sourceStemInitial) {
        diagnostics.push("source-stem-not-iskalia-initial");
      }
      return {
        kind: "surface-chain-mu-iskalia-reduction-source-frame",
        routeId: "surface-chain-mu-iskalia-reduction",
        sourceObjectSlot: "obj1",
        sourceStemSlot: "tronco",
        objectPrefix,
        sourceStem,
        sourceStemInitial,
        targetStem,
        requested,
        supported: requested && objectPrefix === "mu" && Boolean(sourceStemInitial && targetStem),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainMuIskaliaReductionOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "surface-chain-mu-iskalia-reduction-source-frame") {
        return null;
      }
      const objectPrefix = String(sourceFrame.objectPrefix || "");
      const sourceStem = String(sourceFrame.sourceStem || "");
      const targetStem = String(sourceFrame.targetStem || "");
      const supported = sourceFrame.supported === true && objectPrefix === "mu" && sourceStem.startsWith("iskalia") && targetStem === sourceStem.slice(1);
      return {
        kind: "andrews-surface-chain-mu-iskalia-reduction-operation-frame",
        operationId: "andrews-surface-chain-mu-iskalia-reduction",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "surface-chain-mu-iskalia-reduction-target-frame",
          targetSlot: "tronco",
          objectPrefix,
          sourceStem,
          removedLetter: String(sourceFrame.sourceStemInitial || ""),
          targetStem
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-mu-iskalia-reduction-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainSubjectIInitialReductionSourceFrame({
      pers1 = "",
      obj1 = "",
      tronco = ""
    } = {}) {
      const subjectPrefix = String(pers1 || "");
      const objectPrefix = String(obj1 || "");
      const sourceStem = String(tronco || "");
      const sourceStemInitial = sourceStem.startsWith("i") ? "i" : "";
      const targetPrefix = subjectPrefix === "ni" ? "n" : subjectPrefix === "ti" ? "t" : "";
      const requested = Boolean(targetPrefix || sourceStemInitial || objectPrefix);
      const diagnostics = [];
      if (subjectPrefix !== "ni" && subjectPrefix !== "ti") {
        diagnostics.push("subject-prefix-not-ni-ti");
      }
      if (objectPrefix) {
        diagnostics.push("object-prefix-present");
      }
      if (!sourceStem) {
        diagnostics.push("missing-source-stem");
      }
      if (sourceStem && !sourceStemInitial) {
        diagnostics.push("source-stem-not-i-initial");
      }
      return {
        kind: "surface-chain-subject-i-initial-reduction-source-frame",
        routeId: "surface-chain-subject-i-initial-reduction",
        sourceSubjectSlot: "pers1",
        sourceObjectSlot: "obj1",
        sourceStemSlot: "tronco",
        subjectPrefix,
        objectPrefix,
        sourceStem,
        sourceStemInitial,
        targetPrefix,
        requested,
        supported: Boolean(targetPrefix && !objectPrefix && sourceStemInitial),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainSubjectIInitialReductionOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "surface-chain-subject-i-initial-reduction-source-frame") {
        return null;
      }
      const subjectPrefix = String(sourceFrame.subjectPrefix || "");
      const objectPrefix = String(sourceFrame.objectPrefix || "");
      const sourceStem = String(sourceFrame.sourceStem || "");
      const targetPrefix = String(sourceFrame.targetPrefix || "");
      const supported = sourceFrame.supported === true && (subjectPrefix === "ni" || subjectPrefix === "ti") && !objectPrefix && sourceStem.startsWith("i") && (subjectPrefix === "ni" && targetPrefix === "n" || subjectPrefix === "ti" && targetPrefix === "t");
      return {
        kind: "andrews-surface-chain-subject-i-initial-reduction-operation-frame",
        operationId: "andrews-surface-chain-subject-i-initial-reduction",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "surface-chain-subject-i-initial-reduction-target-frame",
          targetSlot: "pers1",
          subjectPrefix,
          objectPrefix,
          sourceStem,
          sourceStemInitial: String(sourceFrame.sourceStemInitial || ""),
          targetPrefix
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-subject-i-initial-reduction-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainOptativeKiReductionSourceFrame({
      obj1 = "",
      tronco = "",
      surfaceRuleMeta = null
    } = {}) {
      const meta = surfaceRuleMeta && typeof surfaceRuleMeta === "object" ? surfaceRuleMeta : {};
      const objectPrefix = String(obj1 || "");
      const nextSegmentRole = "tronco";
      const nextSegmentValue = String(tronco || "");
      const requested = meta.optativeKiReduction === true;
      const nextSegmentStartsWithVowel = Boolean(nextSegmentValue && targetObject.VOWEL_START_RE.test(nextSegmentValue));
      const diagnostics = [];
      if (!requested) {
        diagnostics.push("optative-ki-reduction-not-requested");
      }
      if (requested && objectPrefix !== "ki") {
        diagnostics.push("object-prefix-not-ki");
      }
      if (requested && !nextSegmentValue) {
        diagnostics.push("missing-next-segment");
      }
      if (requested && nextSegmentStartsWithVowel) {
        diagnostics.push("next-segment-vowel-initial");
      }
      return {
        kind: "surface-chain-optative-ki-reduction-source-frame",
        routeId: "surface-chain-optative-ki-reduction",
        sourceObjectSlot: "obj1",
        nextSegmentRole,
        objectPrefix,
        nextSegmentValue,
        nextSegmentStartsWithVowel,
        targetObjectPrefix: objectPrefix === "ki" ? "k" : "",
        requested,
        supported: requested && objectPrefix === "ki" && Boolean(nextSegmentValue) && !nextSegmentStartsWithVowel,
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainOptativeKiReductionOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "surface-chain-optative-ki-reduction-source-frame") {
        return null;
      }
      const objectPrefix = String(sourceFrame.objectPrefix || "");
      const nextSegmentValue = String(sourceFrame.nextSegmentValue || "");
      const targetObjectPrefix = String(sourceFrame.targetObjectPrefix || "");
      const supported = sourceFrame.supported === true && objectPrefix === "ki" && targetObjectPrefix === "k" && Boolean(nextSegmentValue) && !targetObject.VOWEL_START_RE.test(nextSegmentValue);
      return {
        kind: "andrews-surface-chain-optative-ki-reduction-operation-frame",
        operationId: "andrews-surface-chain-optative-ki-reduction",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "surface-chain-optative-ki-reduction-target-frame",
          targetSlot: "obj1",
          objectPrefix,
          targetObjectPrefix,
          nextSegmentRole: String(sourceFrame.nextSegmentRole || ""),
          nextSegmentValue
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-optative-ki-reduction-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainKContactSourceFrame({
      obj1 = "",
      tronco = ""
    } = {}) {
      const objectPrefix = String(obj1 || "");
      const sourceStem = String(tronco || "");
      const sourceObjectFinal = objectPrefix.endsWith("k") ? "k" : "";
      const sourceStemInitial = sourceStem.startsWith("kw") ? "kw" : sourceStem.startsWith("k") ? "k" : "";
      const kContactKind = sourceObjectFinal && sourceStemInitial ? sourceStemInitial === "kw" ? "k-before-kw" : "k-before-k" : "";
      const targetObjectPrefix = kContactKind === "k-before-kw" ? objectPrefix.slice(0, -1) : objectPrefix;
      const targetStem = kContactKind === "k-before-k" ? sourceStem.slice(1) : sourceStem;
      const diagnostics = [];
      if (!sourceObjectFinal) {
        diagnostics.push("object-prefix-not-k-final");
      }
      if (!sourceStem) {
        diagnostics.push("missing-source-stem");
      }
      if (sourceStem && !sourceStemInitial) {
        diagnostics.push("source-stem-not-k-initial");
      }
      return {
        kind: "surface-chain-k-contact-source-frame",
        routeId: "surface-chain-k-contact",
        sourceObjectSlot: "obj1",
        sourceStemSlot: "tronco",
        objectPrefix,
        sourceStem,
        sourceObjectFinal,
        sourceStemInitial,
        kContactKind,
        targetObjectPrefix,
        targetStem,
        supported: Boolean(kContactKind),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainKContactOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "surface-chain-k-contact-source-frame") {
        return null;
      }
      const objectPrefix = String(sourceFrame.objectPrefix || "");
      const sourceStem = String(sourceFrame.sourceStem || "");
      const kContactKind = String(sourceFrame.kContactKind || "");
      const targetObjectPrefix = String(sourceFrame.targetObjectPrefix || "");
      const targetStem = String(sourceFrame.targetStem || "");
      const supported = sourceFrame.supported === true && objectPrefix.endsWith("k") && (sourceStem.startsWith("kw") || sourceStem.startsWith("k")) && (kContactKind === "k-before-kw" && targetObjectPrefix === objectPrefix.slice(0, -1) && targetStem === sourceStem || kContactKind === "k-before-k" && targetObjectPrefix === objectPrefix && targetStem === sourceStem.slice(1));
      return {
        kind: "andrews-surface-chain-k-contact-operation-frame",
        operationId: "andrews-surface-chain-k-contact",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "surface-chain-k-contact-target-frame",
          targetObjectSlot: "obj1",
          targetStemSlot: "tronco",
          objectPrefix,
          sourceStem,
          kContactKind,
          targetObjectPrefix,
          targetStem
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-k-contact-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function getSurfaceChainKwCodaCoalescenceTarget(sourceSegmentValue = "") {
      const sourceValue = String(sourceSegmentValue || "");
      if (!sourceValue || !sourceValue.includes("kw")) {
        return {
          sourceSegmentValue: sourceValue,
          targetSegmentValue: sourceValue,
          coalescenceSiteCount: 0,
          supported: false
        };
      }
      if (!_codaReKw) {
        _codaReKw = buildCodaRe("kw");
      }
      _codaReKw.lastIndex = 0;
      let coalescenceSiteCount = 0;
      const targetSegmentValue = sourceValue.replace(_codaReKw, () => {
        coalescenceSiteCount += 1;
        return "k";
      });
      return {
        sourceSegmentValue: sourceValue,
        targetSegmentValue,
        coalescenceSiteCount,
        supported: coalescenceSiteCount > 0 && targetSegmentValue !== sourceValue
      };
    }
    function buildSurfaceChainKwCodaCoalescenceSourceFrame({
      segmentRole = "",
      segmentSlot = "",
      segmentValue = ""
    } = {}) {
      const sourceSegmentValue = String(segmentValue || "");
      const normalizedRole = normalizeOutputSurfaceRole(segmentRole || segmentSlot || "");
      const normalizedSlot = String(segmentSlot || normalizedRole || "");
      const target = getSurfaceChainKwCodaCoalescenceTarget(sourceSegmentValue);
      const diagnostics = [];
      if (!normalizedRole) {
        diagnostics.push("missing-segment-role");
      }
      if (!sourceSegmentValue) {
        diagnostics.push("missing-source-segment");
      }
      if (sourceSegmentValue && !sourceSegmentValue.includes("kw")) {
        diagnostics.push("source-segment-has-no-kw");
      }
      if (sourceSegmentValue.includes("kw") && !target.supported) {
        diagnostics.push("kw-not-in-coda-position");
      }
      return {
        kind: "surface-chain-kw-coda-coalescence-source-frame",
        routeId: "surface-chain-kw-coda-coalescence",
        segmentRole: normalizedRole,
        segmentSlot: normalizedSlot,
        sourceSegmentValue,
        sourceCoda: target.supported ? "kw" : "",
        targetCoda: target.supported ? "k" : "",
        targetSegmentValue: target.targetSegmentValue,
        coalescenceSiteCount: target.coalescenceSiteCount,
        supported: Boolean(normalizedRole && target.supported),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainKwCodaCoalescenceOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "surface-chain-kw-coda-coalescence-source-frame") {
        return null;
      }
      const segmentRole = normalizeOutputSurfaceRole(sourceFrame.segmentRole || sourceFrame.segmentSlot || "");
      const segmentSlot = String(sourceFrame.segmentSlot || segmentRole || "");
      const sourceSegmentValue = String(sourceFrame.sourceSegmentValue || "");
      const targetSegmentValue = String(sourceFrame.targetSegmentValue || "");
      const target = getSurfaceChainKwCodaCoalescenceTarget(sourceSegmentValue);
      const supported = sourceFrame.supported === true && Boolean(segmentRole && sourceSegmentValue && targetSegmentValue) && target.supported === true && targetSegmentValue === target.targetSegmentValue;
      return {
        kind: "andrews-surface-chain-kw-coda-coalescence-operation-frame",
        operationId: "andrews-surface-chain-kw-coda-coalescence",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "surface-chain-kw-coda-coalescence-target-frame",
          segmentRole,
          segmentSlot,
          sourceSegmentValue,
          sourceCoda: "kw",
          targetCoda: "k",
          targetSegmentValue,
          coalescenceSiteCount: target.coalescenceSiteCount
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-kw-coda-coalescence-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainNhBeforeVowelSourceFrame({
      currentRole = "",
      currentSlot = "",
      currentValue = "",
      nextRole = "",
      nextSlot = "",
      nextValue = "",
      originalCurrentValue = "",
      originalNextValue = "",
      priorOperationFrameKinds = []
    } = {}) {
      const sourceCurrentValue = String(currentValue || "");
      const sourceNextValue = String(nextValue || "");
      const normalizedCurrentRole = normalizeOutputSurfaceRole(currentRole || currentSlot || "");
      const normalizedCurrentSlot = String(currentSlot || normalizedCurrentRole || "");
      const normalizedNextRole = normalizeOutputSurfaceRole(nextRole || nextSlot || "");
      const normalizedNextSlot = String(nextSlot || normalizedNextRole || "");
      const previousLetter = sourceCurrentValue.length >= 2 ? sourceCurrentValue[sourceCurrentValue.length - 2] || "" : "";
      const sourceFinal = sourceCurrentValue.endsWith("n") && !sourceCurrentValue.endsWith("nh") ? "n" : "";
      const nextInitial = sourceNextValue && targetObject.VOWEL_START_RE.test(sourceNextValue) ? sourceNextValue.slice(0, 1) : "";
      const targetCurrentValue = sourceFinal && previousLetter && targetObject.VOWEL_RE.test(previousLetter) && nextInitial ? `${sourceCurrentValue}h` : sourceCurrentValue;
      const diagnostics = [];
      if (!normalizedCurrentRole) {
        diagnostics.push("missing-current-segment-role");
      }
      if (!normalizedNextRole) {
        diagnostics.push("missing-next-segment-role");
      }
      if (!sourceCurrentValue) {
        diagnostics.push("missing-current-segment");
      }
      if (!sourceNextValue) {
        diagnostics.push("missing-next-segment");
      }
      if (sourceCurrentValue && !sourceFinal) {
        diagnostics.push(sourceCurrentValue.endsWith("nh") ? "current-segment-already-nh-final" : "current-segment-not-n-final");
      }
      if (sourceCurrentValue && sourceFinal && !targetObject.VOWEL_RE.test(previousLetter)) {
        diagnostics.push("current-segment-pre-final-not-vowel");
      }
      if (sourceNextValue && !nextInitial) {
        diagnostics.push("next-segment-not-vowel-initial");
      }
      return {
        kind: "surface-chain-nh-before-vowel-source-frame",
        routeId: "surface-chain-nh-before-vowel",
        currentRole: normalizedCurrentRole,
        currentSlot: normalizedCurrentSlot,
        nextRole: normalizedNextRole,
        nextSlot: normalizedNextSlot,
        sourceCurrentValue,
        sourceNextValue,
        sourceCurrentValueBeforePriorOperations: String(originalCurrentValue || sourceCurrentValue || ""),
        sourceNextValueBeforePriorOperations: String(originalNextValue || sourceNextValue || ""),
        priorOperationFrameKinds: (Array.isArray(priorOperationFrameKinds) ? priorOperationFrameKinds : []).map(entry => String(entry || "")).filter(Boolean),
        sourceFinal,
        previousLetter,
        nextInitial,
        targetCurrentValue,
        supported: Boolean(normalizedCurrentRole && normalizedNextRole && sourceFinal && targetObject.VOWEL_RE.test(previousLetter) && nextInitial && targetCurrentValue !== sourceCurrentValue),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainNhBeforeVowelOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "surface-chain-nh-before-vowel-source-frame") {
        return null;
      }
      const currentRole = normalizeOutputSurfaceRole(sourceFrame.currentRole || sourceFrame.currentSlot || "");
      const currentSlot = String(sourceFrame.currentSlot || currentRole || "");
      const nextRole = normalizeOutputSurfaceRole(sourceFrame.nextRole || sourceFrame.nextSlot || "");
      const nextSlot = String(sourceFrame.nextSlot || nextRole || "");
      const sourceCurrentValue = String(sourceFrame.sourceCurrentValue || "");
      const sourceNextValue = String(sourceFrame.sourceNextValue || "");
      const targetCurrentValue = String(sourceFrame.targetCurrentValue || "");
      const previousLetter = sourceCurrentValue.length >= 2 ? sourceCurrentValue[sourceCurrentValue.length - 2] || "" : "";
      const supported = sourceFrame.supported === true && Boolean(currentRole && nextRole && sourceCurrentValue && sourceNextValue && targetCurrentValue) && sourceCurrentValue.endsWith("n") && !sourceCurrentValue.endsWith("nh") && targetObject.VOWEL_RE.test(previousLetter) && targetObject.VOWEL_START_RE.test(sourceNextValue) && targetCurrentValue === `${sourceCurrentValue}h`;
      return {
        kind: "andrews-surface-chain-nh-before-vowel-operation-frame",
        operationId: "andrews-surface-chain-nh-before-vowel",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "surface-chain-nh-before-vowel-target-frame",
          currentRole,
          currentSlot,
          nextRole,
          nextSlot,
          sourceCurrentValue,
          sourceNextValue,
          sourceFinal: "n",
          targetFinal: "nh",
          targetCurrentValue
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-nh-before-vowel-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function getSurfaceChainYShiftTarget({
      sourceSegmentValue = "",
      isTransitive = false
    } = {}) {
      const sourceValue = String(sourceSegmentValue || "");
      if (!sourceValue || !sourceValue.includes("y")) {
        return {
          sourceSegmentValue: sourceValue,
          targetSegmentValue: sourceValue,
          replacementTarget: "",
          shiftSiteCount: 0,
          supported: false
        };
      }
      if (!_codaReY) {
        _codaReY = buildCodaRe("y");
      }
      _codaReY.lastIndex = 0;
      let replacementTarget = "";
      let shiftSiteCount = 0;
      const targetSegmentValue = sourceValue.replace(_codaReY, (match, offset) => {
        shiftSiteCount += 1;
        if (!isTransitive) {
          const before = sourceValue.slice(0, offset);
          const recent = targetObject.splitVerbLetters(before).slice(-5);
          const hasRecentS = recent.some(letter => letter === "s" || letter === "sh");
          if (hasRecentS) {
            replacementTarget = before.endsWith("s") ? "" : "s";
            return replacementTarget;
          }
        }
        replacementTarget = "sh";
        return "sh";
      });
      return {
        sourceSegmentValue: sourceValue,
        targetSegmentValue,
        replacementTarget,
        shiftSiteCount,
        supported: shiftSiteCount > 0 && targetSegmentValue !== sourceValue
      };
    }
    function buildSurfaceChainYShiftSourceFrame({
      segmentRole = "",
      segmentSlot = "",
      segmentValue = "",
      objectSegmentValue = "",
      surfaceRuleMeta = null
    } = {}) {
      const meta = surfaceRuleMeta && typeof surfaceRuleMeta === "object" ? surfaceRuleMeta : {};
      const sourceSegmentValue = String(segmentValue || "");
      const normalizedRole = normalizeOutputSurfaceRole(segmentRole || segmentSlot || "");
      const normalizedSlot = String(segmentSlot || normalizedRole || "");
      const sourceObjectSegmentValue = String(objectSegmentValue || "");
      const preserveCodaY = meta.preserveCodaY === true;
      const isTransitive = sourceObjectSegmentValue !== "";
      const target = preserveCodaY ? {
        sourceSegmentValue,
        targetSegmentValue: sourceSegmentValue,
        replacementTarget: "",
        shiftSiteCount: 0,
        supported: false
      } : getSurfaceChainYShiftTarget({
        sourceSegmentValue,
        isTransitive
      });
      const diagnostics = [];
      if (preserveCodaY) {
        diagnostics.push("preserve-coda-y-requested");
      }
      if (!normalizedRole) {
        diagnostics.push("missing-segment-role");
      }
      if (!sourceSegmentValue) {
        diagnostics.push("missing-source-segment");
      }
      if (sourceSegmentValue && !sourceSegmentValue.includes("y")) {
        diagnostics.push("source-segment-has-no-y");
      }
      if (sourceSegmentValue.includes("y") && !target.supported && !preserveCodaY) {
        diagnostics.push("y-not-in-coda-position-or-no-surface-change");
      }
      return {
        kind: "surface-chain-y-coda-shift-source-frame",
        routeId: "surface-chain-y-coda-shift",
        segmentRole: normalizedRole,
        segmentSlot: normalizedSlot,
        sourceSegmentValue,
        objectSegmentValue: sourceObjectSegmentValue,
        isTransitive,
        preserveCodaY,
        sourceCoda: target.supported ? "y" : "",
        targetCoda: target.supported ? target.replacementTarget : "",
        targetSegmentValue: target.targetSegmentValue,
        shiftSiteCount: target.shiftSiteCount,
        supported: Boolean(normalizedRole && target.supported && !preserveCodaY),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainYShiftOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "surface-chain-y-coda-shift-source-frame") {
        return null;
      }
      const segmentRole = normalizeOutputSurfaceRole(sourceFrame.segmentRole || sourceFrame.segmentSlot || "");
      const segmentSlot = String(sourceFrame.segmentSlot || segmentRole || "");
      const sourceSegmentValue = String(sourceFrame.sourceSegmentValue || "");
      const targetSegmentValue = String(sourceFrame.targetSegmentValue || "");
      const objectSegmentValue = String(sourceFrame.objectSegmentValue || "");
      const isTransitive = sourceFrame.isTransitive === true;
      const target = getSurfaceChainYShiftTarget({
        sourceSegmentValue,
        isTransitive
      });
      const supported = sourceFrame.supported === true && sourceFrame.preserveCodaY !== true && Boolean(segmentRole && sourceSegmentValue && targetSegmentValue) && target.supported === true && targetSegmentValue === target.targetSegmentValue && String(sourceFrame.targetCoda || "") === target.replacementTarget;
      return {
        kind: "andrews-surface-chain-y-coda-shift-operation-frame",
        operationId: "andrews-surface-chain-y-coda-shift",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "surface-chain-y-coda-shift-target-frame",
          segmentRole,
          segmentSlot,
          sourceSegmentValue,
          objectSegmentValue,
          isTransitive,
          sourceCoda: "y",
          targetCoda: target.replacementTarget,
          targetSegmentValue,
          shiftSiteCount: target.shiftSiteCount
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-y-coda-shift-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function getSurfaceChainMCodaAssimilationTarget({
      sourceSegmentValue = "",
      nextSegmentValue = ""
    } = {}) {
      const sourceValue = String(sourceSegmentValue || "");
      const nextValue = String(nextSegmentValue || "");
      if (!sourceValue || !sourceValue.includes("m")) {
        return {
          sourceSegmentValue: sourceValue,
          targetSegmentValue: sourceValue,
          assimilationSiteCount: 0,
          supported: false
        };
      }
      if (!_codaReM) {
        _codaReM = buildCodaRe("m");
      }
      _codaReM.lastIndex = 0;
      let assimilationSiteCount = 0;
      const finalMBeforeVowel = sourceValue.endsWith("m") && targetObject.VOWEL_START_RE.test(nextValue);
      const targetSegmentValue = sourceValue.replace(_codaReM, (match, offset) => {
        const isSegmentFinal = offset + match.length === sourceValue.length;
        if (isSegmentFinal && finalMBeforeVowel) {
          return match;
        }
        assimilationSiteCount += 1;
        return "n";
      });
      return {
        sourceSegmentValue: sourceValue,
        targetSegmentValue,
        assimilationSiteCount,
        finalMBeforeVowel,
        supported: assimilationSiteCount > 0 && targetSegmentValue !== sourceValue
      };
    }
    function buildSurfaceChainMCodaAssimilationSourceFrame({
      segmentRole = "",
      segmentSlot = "",
      segmentValue = "",
      nextRole = "",
      nextSlot = "",
      nextValue = ""
    } = {}) {
      const sourceSegmentValue = String(segmentValue || "");
      const sourceNextValue = String(nextValue || "");
      const normalizedRole = normalizeOutputSurfaceRole(segmentRole || segmentSlot || "");
      const normalizedSlot = String(segmentSlot || normalizedRole || "");
      const normalizedNextRole = normalizeOutputSurfaceRole(nextRole || nextSlot || "");
      const normalizedNextSlot = String(nextSlot || normalizedNextRole || "");
      const target = getSurfaceChainMCodaAssimilationTarget({
        sourceSegmentValue,
        nextSegmentValue: sourceNextValue
      });
      const diagnostics = [];
      if (!normalizedRole) {
        diagnostics.push("missing-segment-role");
      }
      if (!sourceSegmentValue) {
        diagnostics.push("missing-source-segment");
      }
      if (sourceSegmentValue && !sourceSegmentValue.includes("m")) {
        diagnostics.push("source-segment-has-no-m");
      }
      if (sourceSegmentValue.includes("m") && target.finalMBeforeVowel) {
        diagnostics.push("segment-final-m-before-vowel-blocked");
      }
      if (sourceSegmentValue.includes("m") && !target.supported && !target.finalMBeforeVowel) {
        diagnostics.push("m-not-in-coda-position-or-no-surface-change");
      }
      return {
        kind: "surface-chain-m-coda-assimilation-source-frame",
        routeId: "surface-chain-m-coda-assimilation",
        segmentRole: normalizedRole,
        segmentSlot: normalizedSlot,
        nextRole: normalizedNextRole,
        nextSlot: normalizedNextSlot,
        sourceSegmentValue,
        sourceNextValue,
        sourceCoda: target.supported ? "m" : "",
        targetCoda: target.supported ? "n" : "",
        targetSegmentValue: target.targetSegmentValue,
        assimilationSiteCount: target.assimilationSiteCount,
        finalMBeforeVowel: target.finalMBeforeVowel === true,
        supported: Boolean(normalizedRole && target.supported),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainMCodaAssimilationOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "surface-chain-m-coda-assimilation-source-frame") {
        return null;
      }
      const segmentRole = normalizeOutputSurfaceRole(sourceFrame.segmentRole || sourceFrame.segmentSlot || "");
      const segmentSlot = String(sourceFrame.segmentSlot || segmentRole || "");
      const nextRole = normalizeOutputSurfaceRole(sourceFrame.nextRole || sourceFrame.nextSlot || "");
      const nextSlot = String(sourceFrame.nextSlot || nextRole || "");
      const sourceSegmentValue = String(sourceFrame.sourceSegmentValue || "");
      const sourceNextValue = String(sourceFrame.sourceNextValue || "");
      const targetSegmentValue = String(sourceFrame.targetSegmentValue || "");
      const target = getSurfaceChainMCodaAssimilationTarget({
        sourceSegmentValue,
        nextSegmentValue: sourceNextValue
      });
      const supported = sourceFrame.supported === true && Boolean(segmentRole && sourceSegmentValue && targetSegmentValue) && target.supported === true && targetSegmentValue === target.targetSegmentValue;
      return {
        kind: "andrews-surface-chain-m-coda-assimilation-operation-frame",
        operationId: "andrews-surface-chain-m-coda-assimilation",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "surface-chain-m-coda-assimilation-target-frame",
          segmentRole,
          segmentSlot,
          nextRole,
          nextSlot,
          sourceSegmentValue,
          sourceNextValue,
          sourceCoda: "m",
          targetCoda: "n",
          targetSegmentValue,
          assimilationSiteCount: target.assimilationSiteCount
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-m-coda-assimilation-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainOperationFrames(input = {}) {
      const node = input && typeof input === "object" ? input : {};
      const frames = [];
      const subjectIInitialReductionSourceFrame = buildSurfaceChainSubjectIInitialReductionSourceFrame({
        pers1: node.pers1,
        obj1: node.obj1,
        tronco: node.tronco
      });
      if (subjectIInitialReductionSourceFrame.supported) {
        const subjectIInitialReductionOperationFrame = buildSurfaceChainSubjectIInitialReductionOperationFrame(subjectIInitialReductionSourceFrame);
        if (subjectIInitialReductionOperationFrame) {
          frames.push(subjectIInitialReductionOperationFrame);
        }
      }
      const optativeKiReductionSourceFrame = buildSurfaceChainOptativeKiReductionSourceFrame({
        obj1: node.obj1,
        tronco: node.tronco,
        surfaceRuleMeta: node.surfaceRuleMeta
      });
      if (optativeKiReductionSourceFrame.requested) {
        const optativeKiReductionOperationFrame = buildSurfaceChainOptativeKiReductionOperationFrame(optativeKiReductionSourceFrame);
        if (optativeKiReductionOperationFrame) {
          frames.push(optativeKiReductionOperationFrame);
        }
      }
      const kContactSourceFrame = buildSurfaceChainKContactSourceFrame({
        obj1: node.obj1,
        tronco: node.tronco
      });
      if (kContactSourceFrame.supported) {
        const kContactOperationFrame = buildSurfaceChainKContactOperationFrame(kContactSourceFrame);
        if (kContactOperationFrame) {
          frames.push(kContactOperationFrame);
        }
      }
      ["pers1", "poseedor", "prefijoExternoFuente", "obj1", "tronco"].forEach(role => {
        const kwCodaCoalescenceSourceFrame = buildSurfaceChainKwCodaCoalescenceSourceFrame({
          segmentRole: role,
          segmentSlot: role,
          segmentValue: node[role]
        });
        if (kwCodaCoalescenceSourceFrame.supported) {
          const kwCodaCoalescenceOperationFrame = buildSurfaceChainKwCodaCoalescenceOperationFrame(kwCodaCoalescenceSourceFrame);
          if (kwCodaCoalescenceOperationFrame) {
            frames.push(kwCodaCoalescenceOperationFrame);
          }
        }
      });
      ["pers1", "poseedor", "prefijoExternoFuente", "obj1", "tronco"].forEach(role => {
        const yShiftSourceFrame = buildSurfaceChainYShiftSourceFrame({
          segmentRole: role,
          segmentSlot: role,
          segmentValue: node[role],
          objectSegmentValue: node.obj1,
          surfaceRuleMeta: node.surfaceRuleMeta
        });
        if (yShiftSourceFrame.supported) {
          const yShiftOperationFrame = buildSurfaceChainYShiftOperationFrame(yShiftSourceFrame);
          if (yShiftOperationFrame) {
            frames.push(yShiftOperationFrame);
          }
        }
      });
      const mAssimilationSourceSegments = ["pers1", "poseedor", "prefijoExternoFuente", "obj1", "tronco"].map(role => ({
        role,
        slot: role,
        value: String(node[role] || "")
      }));
      mAssimilationSourceSegments.forEach((segment, index) => {
        if (!segment.value) {
          return;
        }
        const nextSegment = mAssimilationSourceSegments.slice(index + 1).find(entry => entry.value) || null;
        const mCodaAssimilationSourceFrame = buildSurfaceChainMCodaAssimilationSourceFrame({
          segmentRole: segment.role,
          segmentSlot: segment.slot,
          segmentValue: segment.value,
          nextRole: nextSegment?.role || "",
          nextSlot: nextSegment?.slot || "",
          nextValue: nextSegment?.value || ""
        });
        if (mCodaAssimilationSourceFrame.supported) {
          const mCodaAssimilationOperationFrame = buildSurfaceChainMCodaAssimilationOperationFrame(mCodaAssimilationSourceFrame);
          if (mCodaAssimilationOperationFrame) {
            frames.push(mCodaAssimilationOperationFrame);
          }
        }
      });
      const sourceSegments = ["pers1", "poseedor", "prefijoExternoFuente", "obj1", "tronco"].map(role => ({
        role,
        slot: role,
        value: String(node[role] || "")
      }));
      const nhStageSegments = sourceSegments.map(segment => ({
        ...segment
      }));
      const priorNhOperationFrameKinds = [];
      const setNhStageSegmentValue = (role = "", value = "") => {
        const normalizedRole = normalizeOutputSurfaceRole(role);
        const segment = nhStageSegments.find(entry => entry.role === normalizedRole || entry.slot === normalizedRole);
        if (segment) {
          segment.value = String(value || "");
        }
      };
      const trimStageSourceFrame = buildSurfaceChainFinalIAUATrimSourceFrame({
        tronco: node.tronco,
        surfaceRuleMeta: node.surfaceRuleMeta
      });
      const trimStageOperationFrame = buildSurfaceChainFinalIAUATrimOperationFrame(trimStageSourceFrame);
      if (trimStageOperationFrame?.supported === true) {
        setNhStageSegmentValue("tronco", trimStageOperationFrame.targetFrame.targetStem);
        priorNhOperationFrameKinds.push(trimStageOperationFrame.kind);
      }
      const muStageSourceFrame = buildSurfaceChainMuIskaliaReductionSourceFrame({
        obj1: node.obj1,
        tronco: node.tronco,
        surfaceRuleMeta: node.surfaceRuleMeta
      });
      const muStageOperationFrame = buildSurfaceChainMuIskaliaReductionOperationFrame(muStageSourceFrame);
      if (muStageOperationFrame?.supported === true) {
        setNhStageSegmentValue("tronco", muStageOperationFrame.targetFrame.targetStem);
        priorNhOperationFrameKinds.push(muStageOperationFrame.kind);
      }
      const subjectStageOperationFrame = buildSurfaceChainSubjectIInitialReductionOperationFrame(subjectIInitialReductionSourceFrame);
      if (subjectStageOperationFrame?.supported === true) {
        setNhStageSegmentValue("pers1", subjectStageOperationFrame.targetFrame.targetPrefix);
        priorNhOperationFrameKinds.push(subjectStageOperationFrame.kind);
      }
      const optativeStageOperationFrame = buildSurfaceChainOptativeKiReductionOperationFrame(optativeKiReductionSourceFrame);
      if (optativeStageOperationFrame?.supported === true) {
        setNhStageSegmentValue("obj1", optativeStageOperationFrame.targetFrame.targetObjectPrefix);
        priorNhOperationFrameKinds.push(optativeStageOperationFrame.kind);
      }
      const objectIStageSourceFrame = buildSurfaceChainObjectIInitialElisionSourceFrame({
        obj1: node.obj1,
        tronco: node.tronco,
        surfaceRuleMeta: node.surfaceRuleMeta
      });
      const objectIStageOperationFrame = buildSurfaceChainObjectIInitialElisionOperationFrame(objectIStageSourceFrame);
      if (objectIStageOperationFrame?.supported === true) {
        setNhStageSegmentValue("tronco", objectIStageOperationFrame.targetFrame.targetStem);
        priorNhOperationFrameKinds.push(objectIStageOperationFrame.kind);
      }
      nhStageSegments.forEach((segment, index) => {
        if (!segment.value) {
          return;
        }
        const nextSegment = nhStageSegments.slice(index + 1).find(entry => entry.value) || null;
        if (!nextSegment) {
          return;
        }
        const originalCurrentSegment = sourceSegments.find(entry => entry.role === segment.role) || segment;
        const originalNextSegment = sourceSegments.find(entry => entry.role === nextSegment.role) || nextSegment;
        const nhBeforeVowelSourceFrame = buildSurfaceChainNhBeforeVowelSourceFrame({
          currentRole: segment.role,
          currentSlot: segment.slot,
          currentValue: segment.value,
          nextRole: nextSegment.role,
          nextSlot: nextSegment.slot,
          nextValue: nextSegment.value,
          originalCurrentValue: originalCurrentSegment.value,
          originalNextValue: originalNextSegment.value,
          priorOperationFrameKinds: priorNhOperationFrameKinds
        });
        if (nhBeforeVowelSourceFrame.supported) {
          const nhBeforeVowelOperationFrame = buildSurfaceChainNhBeforeVowelOperationFrame(nhBeforeVowelSourceFrame);
          if (nhBeforeVowelOperationFrame) {
            frames.push(nhBeforeVowelOperationFrame);
          }
        }
      });
      const trimSourceFrame = buildSurfaceChainFinalIAUATrimSourceFrame({
        tronco: node.tronco,
        surfaceRuleMeta: node.surfaceRuleMeta
      });
      if (trimSourceFrame.requested) {
        const trimOperationFrame = buildSurfaceChainFinalIAUATrimOperationFrame(trimSourceFrame);
        if (trimOperationFrame) {
          frames.push(trimOperationFrame);
        }
      }
      const objectIInitialElisionSourceFrame = buildSurfaceChainObjectIInitialElisionSourceFrame({
        obj1: node.obj1,
        tronco: node.tronco,
        surfaceRuleMeta: node.surfaceRuleMeta
      });
      if (objectIInitialElisionSourceFrame.requested) {
        const objectIInitialElisionOperationFrame = buildSurfaceChainObjectIInitialElisionOperationFrame(objectIInitialElisionSourceFrame);
        if (objectIInitialElisionOperationFrame) {
          frames.push(objectIInitialElisionOperationFrame);
        }
      }
      const muIskaliaReductionSourceFrame = buildSurfaceChainMuIskaliaReductionSourceFrame({
        obj1: node.obj1,
        tronco: node.tronco,
        surfaceRuleMeta: node.surfaceRuleMeta
      });
      if (muIskaliaReductionSourceFrame.requested) {
        const muIskaliaReductionOperationFrame = buildSurfaceChainMuIskaliaReductionOperationFrame(muIskaliaReductionSourceFrame);
        if (muIskaliaReductionOperationFrame) {
          frames.push(muIskaliaReductionOperationFrame);
        }
      }
      return frames;
    }
    function getSurfaceChainOperationFrame(chain = null, kind = "") {
      const requestedKind = String(kind || "");
      return normalizeSurfaceChainStructuredFrames(chain?.surfaceOperationFrames).find(frame => frame.kind === requestedKind) || null;
    }
    function buildSurfaceChainRenderSourceFrame(chain = null) {
      const segments = (Array.isArray(chain?.segments) ? chain.segments : []).map((segment, index) => ({
        kind: "surface-chain-render-segment-source-frame",
        index,
        role: normalizeOutputSurfaceRole(segment?.role || segment?.slot || ""),
        slot: String(segment?.slot || segment?.role || ""),
        value: String(segment?.value || "")
      }));
      const surface = segments.map(segment => segment.value).join("");
      const diagnostics = [];
      if (!segments.length) {
        diagnostics.push("missing-render-segments");
      }
      return {
        kind: "surface-chain-render-source-frame",
        routeId: "surface-chain-render",
        unitKind: "surface-segment-chain",
        segments,
        surface,
        supported: segments.length > 0,
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildSurfaceChainRenderOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "surface-chain-render-source-frame") {
        return null;
      }
      const segments = Array.isArray(sourceFrame.segments) ? sourceFrame.segments : [];
      const surface = segments.map(segment => String(segment?.value || "")).join("");
      const supported = sourceFrame.supported === true && segments.length > 0;
      return {
        kind: "andrews-surface-chain-render-operation-frame",
        operationId: "andrews-surface-chain-render",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "surface-chain-render-target-frame",
          outputKind: "surface-chain-render",
          surface,
          segmentCount: segments.length,
          segmentRoles: segments.map(segment => String(segment?.role || ""))
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-surface-chain-render-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function attachSurfaceChainRenderOperationFrame(chain = null) {
      if (!chain || typeof chain !== "object") {
        return chain;
      }
      const sourceFrame = buildSurfaceChainRenderSourceFrame(chain);
      const operationFrame = buildSurfaceChainRenderOperationFrame(sourceFrame);
      Object.defineProperty(chain, "surfaceRenderOperationFrame", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: operationFrame
      });
      return chain;
    }
    function validateSurfaceChainRenderOperationFrame(chain = null, operationFrame = null) {
      if (!operationFrame || operationFrame.kind !== "andrews-surface-chain-render-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const currentSourceFrame = buildSurfaceChainRenderSourceFrame(chain);
      if (!sourceFrame || !targetFrame || currentSourceFrame.supported !== true) {
        return null;
      }
      const sourceSegments = Array.isArray(sourceFrame.segments) ? sourceFrame.segments : [];
      const currentSegments = Array.isArray(currentSourceFrame.segments) ? currentSourceFrame.segments : [];
      if (sourceSegments.length !== currentSegments.length) {
        return null;
      }
      const segmentsMatch = sourceSegments.every((segment, index) => {
        const currentSegment = currentSegments[index] || {};
        return String(segment.role || "") === String(currentSegment.role || "") && String(segment.slot || "") === String(currentSegment.slot || "") && String(segment.value || "") === String(currentSegment.value || "");
      });
      if (!segmentsMatch) {
        return null;
      }
      const surface = currentSegments.map(segment => String(segment.value || "")).join("");
      if (String(targetFrame.surface || "") !== surface || Number(targetFrame.segmentCount || 0) !== currentSegments.length) {
        return null;
      }
      return {
        surface,
        segmentCount: currentSegments.length,
        segmentRoles: currentSegments.map(segment => String(segment.role || ""))
      };
    }
    function validateSurfaceChainFinalIAUATrimOperationFrame(chain = null, operationFrame = null) {
      if (!operationFrame || operationFrame.kind !== "andrews-surface-chain-final-ia-ua-trim-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const troncoValue = getSurfaceChainSegmentValue(chain, "tronco");
      const sourceStem = String(sourceFrame?.sourceStem || "");
      const sourceSuffix = String(sourceFrame?.sourceSuffix || "");
      const targetStem = String(targetFrame?.targetStem || "");
      if (!sourceFrame || !targetFrame || !sourceStem || !sourceSuffix || !targetStem) {
        return null;
      }
      if (troncoValue !== sourceStem) {
        return null;
      }
      if (!targetObject.IA_UA_SUFFIXES.includes(sourceSuffix) || !sourceStem.endsWith(sourceSuffix)) {
        return null;
      }
      if (String(targetFrame.sourceStem || "") !== sourceStem || targetStem !== sourceStem.slice(0, -1)) {
        return null;
      }
      return {
        sourceStem,
        targetStem,
        removedLetter: String(targetFrame.removedLetter || sourceStem.slice(-1))
      };
    }
    function validateSurfaceChainObjectIInitialElisionOperationFrame(chain = null, operationFrame = null) {
      if (!operationFrame || operationFrame.kind !== "andrews-surface-chain-object-i-initial-elision-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const objectValue = getSurfaceChainSegmentValue(chain, "obj1");
      const troncoValue = getSurfaceChainSegmentValue(chain, "tronco");
      const objectPrefix = String(sourceFrame?.objectPrefix || "");
      const sourceStem = String(sourceFrame?.sourceStem || "");
      const targetStem = String(targetFrame?.targetStem || "");
      if (!sourceFrame || !targetFrame || !objectPrefix || !sourceStem || !targetStem) {
        return null;
      }
      if (objectValue !== objectPrefix || troncoValue !== sourceStem) {
        return null;
      }
      if (!objectPrefix.endsWith("i") || !sourceStem.startsWith("i")) {
        return null;
      }
      if (String(targetFrame.objectPrefix || "") !== objectPrefix || String(targetFrame.sourceStem || "") !== sourceStem) {
        return null;
      }
      if (targetStem !== sourceStem.slice(1)) {
        return null;
      }
      return {
        sourceStem,
        targetStem,
        removedLetter: String(targetFrame.removedLetter || sourceStem.slice(0, 1))
      };
    }
    function validateSurfaceChainMuIskaliaReductionOperationFrame(chain = null, operationFrame = null) {
      if (!operationFrame || operationFrame.kind !== "andrews-surface-chain-mu-iskalia-reduction-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const objectValue = getSurfaceChainSegmentValue(chain, "obj1");
      const troncoValue = getSurfaceChainSegmentValue(chain, "tronco");
      const objectPrefix = String(sourceFrame?.objectPrefix || "");
      const sourceStem = String(sourceFrame?.sourceStem || "");
      const targetStem = String(targetFrame?.targetStem || "");
      if (!sourceFrame || !targetFrame || !objectPrefix || !sourceStem || !targetStem) {
        return null;
      }
      if (objectValue !== objectPrefix || troncoValue !== sourceStem) {
        return null;
      }
      if (objectPrefix !== "mu" || !sourceStem.startsWith("iskalia")) {
        return null;
      }
      if (String(targetFrame.objectPrefix || "") !== objectPrefix || String(targetFrame.sourceStem || "") !== sourceStem) {
        return null;
      }
      if (targetStem !== sourceStem.slice(1)) {
        return null;
      }
      return {
        sourceStem,
        targetStem,
        removedLetter: String(targetFrame.removedLetter || sourceStem.slice(0, 1))
      };
    }
    function validateSurfaceChainSubjectIInitialReductionOperationFrame(chain = null, operationFrame = null) {
      if (!operationFrame || operationFrame.kind !== "andrews-surface-chain-subject-i-initial-reduction-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const subjectValue = getSurfaceChainSegmentValue(chain, "pers1");
      const objectValue = getSurfaceChainSegmentValue(chain, "obj1");
      const troncoValue = getSurfaceChainSegmentValue(chain, "tronco");
      const subjectPrefix = String(sourceFrame?.subjectPrefix || "");
      const objectPrefix = String(sourceFrame?.objectPrefix || "");
      const sourceStem = String(sourceFrame?.sourceStem || "");
      const targetPrefix = String(targetFrame?.targetPrefix || "");
      if (!sourceFrame || !targetFrame || !subjectPrefix || !sourceStem || !targetPrefix) {
        return null;
      }
      if (subjectValue !== subjectPrefix || objectValue !== objectPrefix || troncoValue !== sourceStem) {
        return null;
      }
      if (objectPrefix || !sourceStem.startsWith("i")) {
        return null;
      }
      if (String(targetFrame.subjectPrefix || "") !== subjectPrefix || String(targetFrame.sourceStem || "") !== sourceStem) {
        return null;
      }
      if (!(subjectPrefix === "ni" && targetPrefix === "n" || subjectPrefix === "ti" && targetPrefix === "t")) {
        return null;
      }
      return {
        sourcePrefix: subjectPrefix,
        targetPrefix,
        sourceStem
      };
    }
    function validateSurfaceChainOptativeKiReductionOperationFrame(chain = null, operationFrame = null) {
      if (!operationFrame || operationFrame.kind !== "andrews-surface-chain-optative-ki-reduction-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const segments = Array.isArray(chain?.segments) ? chain.segments : [];
      const objectIndex = segments.findIndex(segment => normalizeOutputSurfaceRole(segment?.role) === "obj1" || segment?.slot === "obj1");
      if (objectIndex < 0) {
        return null;
      }
      const objectPrefix = String(sourceFrame?.objectPrefix || "");
      const targetObjectPrefix = String(targetFrame?.targetObjectPrefix || "");
      const nextSegmentValue = String(sourceFrame?.nextSegmentValue || "");
      const currentObjectValue = String(segments[objectIndex]?.value || "");
      const nextIndex = getSurfaceChainNextNonEmptyIndex(chain, objectIndex);
      const currentNextValue = nextIndex >= 0 ? String(segments[nextIndex]?.value || "") : "";
      const currentNextRole = nextIndex >= 0 ? normalizeOutputSurfaceRole(segments[nextIndex]?.role || segments[nextIndex]?.slot || "") : "";
      if (!sourceFrame || !targetFrame || objectPrefix !== "ki" || targetObjectPrefix !== "k") {
        return null;
      }
      if (currentObjectValue !== objectPrefix || !currentNextValue || currentNextValue !== nextSegmentValue) {
        return null;
      }
      if (String(targetFrame.objectPrefix || "") !== objectPrefix || String(targetFrame.nextSegmentValue || "") !== nextSegmentValue) {
        return null;
      }
      if (String(targetFrame.nextSegmentRole || "") !== String(sourceFrame.nextSegmentRole || "") || currentNextRole !== String(sourceFrame.nextSegmentRole || "")) {
        return null;
      }
      if (targetObject.VOWEL_START_RE.test(currentNextValue)) {
        return null;
      }
      return {
        sourceObjectPrefix: objectPrefix,
        targetObjectPrefix,
        nextSegmentValue
      };
    }
    function validateSurfaceChainKContactOperationFrame(chain = null, operationFrame = null) {
      if (!operationFrame || operationFrame.kind !== "andrews-surface-chain-k-contact-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const objectValue = getSurfaceChainSegmentValue(chain, "obj1");
      const troncoValue = getSurfaceChainSegmentValue(chain, "tronco");
      const objectPrefix = String(sourceFrame?.objectPrefix || "");
      const sourceStem = String(sourceFrame?.sourceStem || "");
      const kContactKind = String(sourceFrame?.kContactKind || "");
      const targetObjectPrefix = String(targetFrame?.targetObjectPrefix ?? "");
      const targetStem = String(targetFrame?.targetStem || "");
      if (!sourceFrame || !targetFrame || !objectPrefix || !sourceStem || !kContactKind || !targetStem) {
        return null;
      }
      if (objectValue !== objectPrefix || troncoValue !== sourceStem) {
        return null;
      }
      if (!objectPrefix.endsWith("k") || !sourceStem.startsWith("k")) {
        return null;
      }
      if (String(targetFrame.objectPrefix || "") !== objectPrefix || String(targetFrame.sourceStem || "") !== sourceStem) {
        return null;
      }
      if (kContactKind === "k-before-kw") {
        if (!sourceStem.startsWith("kw") || targetObjectPrefix !== objectPrefix.slice(0, -1) || targetStem !== sourceStem) {
          return null;
        }
      } else if (kContactKind === "k-before-k") {
        if (sourceStem.startsWith("kw") || targetObjectPrefix !== objectPrefix || targetStem !== sourceStem.slice(1)) {
          return null;
        }
      } else {
        return null;
      }
      return {
        sourceObjectPrefix: objectPrefix,
        sourceStem,
        kContactKind,
        targetObjectPrefix,
        targetStem
      };
    }
    function validateSurfaceChainKwCodaCoalescenceOperationFrame(chain = null, operationFrame = null) {
      if (!operationFrame || operationFrame.kind !== "andrews-surface-chain-kw-coda-coalescence-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const segmentRole = normalizeOutputSurfaceRole(sourceFrame?.segmentRole || sourceFrame?.segmentSlot || "");
      const segmentSlot = String(sourceFrame?.segmentSlot || segmentRole || "");
      const sourceSegmentValue = String(sourceFrame?.sourceSegmentValue || "");
      const targetSegmentValue = String(targetFrame?.targetSegmentValue || "");
      if (!sourceFrame || !targetFrame || !segmentRole || !sourceSegmentValue || !targetSegmentValue) {
        return null;
      }
      const currentSegmentValue = getSurfaceChainSegmentValue(chain, segmentRole);
      if (currentSegmentValue !== sourceSegmentValue) {
        return null;
      }
      if (normalizeOutputSurfaceRole(targetFrame.segmentRole || targetFrame.segmentSlot || "") !== segmentRole || String(targetFrame.segmentSlot || segmentSlot || "") !== segmentSlot || String(targetFrame.sourceSegmentValue || "") !== sourceSegmentValue || String(targetFrame.sourceCoda || "") !== "kw" || String(targetFrame.targetCoda || "") !== "k") {
        return null;
      }
      const target = getSurfaceChainKwCodaCoalescenceTarget(sourceSegmentValue);
      if (target.supported !== true || targetSegmentValue !== target.targetSegmentValue || Number(targetFrame.coalescenceSiteCount || 0) !== target.coalescenceSiteCount) {
        return null;
      }
      return {
        segmentRole,
        segmentSlot,
        sourceSegmentValue,
        targetSegmentValue,
        coalescenceSiteCount: target.coalescenceSiteCount
      };
    }
    function validateSurfaceChainNhBeforeVowelOperationFrame(chain = null, operationFrame = null) {
      if (!operationFrame || operationFrame.kind !== "andrews-surface-chain-nh-before-vowel-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const currentRole = normalizeOutputSurfaceRole(sourceFrame?.currentRole || sourceFrame?.currentSlot || "");
      const currentSlot = String(sourceFrame?.currentSlot || currentRole || "");
      const nextRole = normalizeOutputSurfaceRole(sourceFrame?.nextRole || sourceFrame?.nextSlot || "");
      const nextSlot = String(sourceFrame?.nextSlot || nextRole || "");
      const sourceCurrentValue = String(sourceFrame?.sourceCurrentValue || "");
      const sourceNextValue = String(sourceFrame?.sourceNextValue || "");
      const targetCurrentValue = String(targetFrame?.targetCurrentValue || "");
      if (!sourceFrame || !targetFrame || !currentRole || !nextRole || !sourceCurrentValue || !sourceNextValue || !targetCurrentValue) {
        return null;
      }
      const segments = Array.isArray(chain?.segments) ? chain.segments : [];
      const currentIndex = segments.findIndex(segment => normalizeOutputSurfaceRole(segment?.role || segment?.slot || "") === currentRole || segment?.slot === currentSlot);
      if (currentIndex < 0) {
        return null;
      }
      const currentSegmentValue = String(segments[currentIndex]?.value || "");
      const nextIndex = getSurfaceChainNextNonEmptyIndex(chain, currentIndex);
      const currentNextValue = nextIndex >= 0 ? String(segments[nextIndex]?.value || "") : "";
      const currentNextRole = nextIndex >= 0 ? normalizeOutputSurfaceRole(segments[nextIndex]?.role || segments[nextIndex]?.slot || "") : "";
      const currentNextSlot = nextIndex >= 0 ? String(segments[nextIndex]?.slot || currentNextRole || "") : "";
      if (currentSegmentValue !== sourceCurrentValue || currentNextValue !== sourceNextValue || currentNextRole !== nextRole || currentNextSlot !== nextSlot) {
        return null;
      }
      if (normalizeOutputSurfaceRole(targetFrame.currentRole || targetFrame.currentSlot || "") !== currentRole || normalizeOutputSurfaceRole(targetFrame.nextRole || targetFrame.nextSlot || "") !== nextRole || String(targetFrame.currentSlot || currentSlot || "") !== currentSlot || String(targetFrame.nextSlot || nextSlot || "") !== nextSlot || String(targetFrame.sourceCurrentValue || "") !== sourceCurrentValue || String(targetFrame.sourceNextValue || "") !== sourceNextValue || String(targetFrame.sourceFinal || "") !== "n" || String(targetFrame.targetFinal || "") !== "nh") {
        return null;
      }
      const previousLetter = sourceCurrentValue.length >= 2 ? sourceCurrentValue[sourceCurrentValue.length - 2] || "" : "";
      if (!sourceCurrentValue.endsWith("n") || sourceCurrentValue.endsWith("nh") || !targetObject.VOWEL_RE.test(previousLetter) || !targetObject.VOWEL_START_RE.test(sourceNextValue) || targetCurrentValue !== `${sourceCurrentValue}h`) {
        return null;
      }
      return {
        currentRole,
        currentSlot,
        nextRole,
        nextSlot,
        sourceCurrentValue,
        sourceNextValue,
        targetCurrentValue
      };
    }
    function validateSurfaceChainYShiftOperationFrame(chain = null, operationFrame = null) {
      if (!operationFrame || operationFrame.kind !== "andrews-surface-chain-y-coda-shift-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const segmentRole = normalizeOutputSurfaceRole(sourceFrame?.segmentRole || sourceFrame?.segmentSlot || "");
      const segmentSlot = String(sourceFrame?.segmentSlot || segmentRole || "");
      const sourceSegmentValue = String(sourceFrame?.sourceSegmentValue || "");
      const targetSegmentValue = String(targetFrame?.targetSegmentValue || "");
      const objectSegmentValue = String(sourceFrame?.objectSegmentValue || "");
      if (!sourceFrame || !targetFrame || !segmentRole || !sourceSegmentValue || !targetSegmentValue) {
        return null;
      }
      if (sourceFrame.preserveCodaY === true) {
        return null;
      }
      const currentSegmentValue = getSurfaceChainSegmentValue(chain, segmentRole);
      const currentObjectValue = getSurfaceChainSegmentValue(chain, "obj1");
      if (currentSegmentValue !== sourceSegmentValue || currentObjectValue !== objectSegmentValue) {
        return null;
      }
      if (normalizeOutputSurfaceRole(targetFrame.segmentRole || targetFrame.segmentSlot || "") !== segmentRole || String(targetFrame.segmentSlot || segmentSlot || "") !== segmentSlot || String(targetFrame.sourceSegmentValue || "") !== sourceSegmentValue || String(targetFrame.objectSegmentValue || "") !== objectSegmentValue || targetFrame.isTransitive !== (objectSegmentValue !== "") || String(targetFrame.sourceCoda || "") !== "y") {
        return null;
      }
      const target = getSurfaceChainYShiftTarget({
        sourceSegmentValue,
        isTransitive: objectSegmentValue !== ""
      });
      if (target.supported !== true || targetSegmentValue !== target.targetSegmentValue || String(targetFrame.targetCoda || "") !== target.replacementTarget || Number(targetFrame.shiftSiteCount || 0) !== target.shiftSiteCount) {
        return null;
      }
      return {
        segmentRole,
        segmentSlot,
        sourceSegmentValue,
        objectSegmentValue,
        isTransitive: objectSegmentValue !== "",
        sourceCoda: "y",
        targetCoda: target.replacementTarget,
        targetSegmentValue,
        shiftSiteCount: target.shiftSiteCount
      };
    }
    function validateSurfaceChainMCodaAssimilationOperationFrame(chain = null, operationFrame = null) {
      if (!operationFrame || operationFrame.kind !== "andrews-surface-chain-m-coda-assimilation-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const segmentRole = normalizeOutputSurfaceRole(sourceFrame?.segmentRole || sourceFrame?.segmentSlot || "");
      const segmentSlot = String(sourceFrame?.segmentSlot || segmentRole || "");
      const nextRole = normalizeOutputSurfaceRole(sourceFrame?.nextRole || sourceFrame?.nextSlot || "");
      const nextSlot = String(sourceFrame?.nextSlot || nextRole || "");
      const sourceSegmentValue = String(sourceFrame?.sourceSegmentValue || "");
      const sourceNextValue = String(sourceFrame?.sourceNextValue || "");
      const targetSegmentValue = String(targetFrame?.targetSegmentValue || "");
      if (!sourceFrame || !targetFrame || !segmentRole || !sourceSegmentValue || !targetSegmentValue) {
        return null;
      }
      const segments = Array.isArray(chain?.segments) ? chain.segments : [];
      const segmentIndex = segments.findIndex(segment => normalizeOutputSurfaceRole(segment?.role || segment?.slot || "") === segmentRole || segment?.slot === segmentSlot);
      if (segmentIndex < 0) {
        return null;
      }
      const currentSegmentValue = String(segments[segmentIndex]?.value || "");
      const nextIndex = getSurfaceChainNextNonEmptyIndex(chain, segmentIndex);
      const currentNextValue = nextIndex >= 0 ? String(segments[nextIndex]?.value || "") : "";
      const currentNextRole = nextIndex >= 0 ? normalizeOutputSurfaceRole(segments[nextIndex]?.role || segments[nextIndex]?.slot || "") : "";
      const currentNextSlot = nextIndex >= 0 ? String(segments[nextIndex]?.slot || currentNextRole || "") : "";
      if (currentSegmentValue !== sourceSegmentValue || currentNextValue !== sourceNextValue || currentNextRole !== nextRole || currentNextSlot !== nextSlot) {
        return null;
      }
      if (normalizeOutputSurfaceRole(targetFrame.segmentRole || targetFrame.segmentSlot || "") !== segmentRole || String(targetFrame.segmentSlot || segmentSlot || "") !== segmentSlot || normalizeOutputSurfaceRole(targetFrame.nextRole || targetFrame.nextSlot || "") !== nextRole || String(targetFrame.nextSlot || nextSlot || "") !== nextSlot || String(targetFrame.sourceSegmentValue || "") !== sourceSegmentValue || String(targetFrame.sourceNextValue || "") !== sourceNextValue || String(targetFrame.sourceCoda || "") !== "m" || String(targetFrame.targetCoda || "") !== "n") {
        return null;
      }
      const target = getSurfaceChainMCodaAssimilationTarget({
        sourceSegmentValue,
        nextSegmentValue: sourceNextValue
      });
      if (target.supported !== true || targetSegmentValue !== target.targetSegmentValue || Number(targetFrame.assimilationSiteCount || 0) !== target.assimilationSiteCount) {
        return null;
      }
      return {
        segmentRole,
        segmentSlot,
        nextRole,
        nextSlot,
        sourceSegmentValue,
        sourceNextValue,
        sourceCoda: "m",
        targetCoda: "n",
        targetSegmentValue,
        assimilationSiteCount: target.assimilationSiteCount
      };
    }
    function buildSurfaceChainState(input = {}) {
      const {
        pers1,
        poseedor,
        obj1,
        tronco,
        surfaceRuleMeta = null
      } = normalizeOutputSurfaceSlotInput(input);
      const prefijoExternoFuente = String(surfaceRuleMeta?.prefijoExternoFuente || "");
      const surfaceOperationFrames = buildSurfaceChainOperationFrames({
        pers1,
        poseedor,
        prefijoExternoFuente,
        obj1,
        tronco,
        surfaceRuleMeta
      });
      return attachSurfaceChainRenderOperationFrame({
        surfaceRuleMeta: surfaceRuleMeta && typeof surfaceRuleMeta === "object" ? {
          ...surfaceRuleMeta
        } : null,
        surfaceOperationFrames,
        segments: [{
          role: "pers1",
          slot: "pers1",
          value: String(pers1 || "")
        }, {
          role: "poseedor",
          slot: "poseedor",
          value: String(poseedor || "")
        }, {
          role: "prefijoExternoFuente",
          slot: "prefijoExternoFuente",
          value: prefijoExternoFuente
        }, {
          role: "obj1",
          slot: "obj1",
          value: String(obj1 || "")
        }, {
          role: "tronco",
          slot: "tronco",
          value: String(tronco || "")
        }],
        soundSpellingFrames: []
      });
    }
    function cloneSurfaceChainState(chain = null) {
      const segments = Array.isArray(chain?.segments) ? chain.segments : [];
      return attachSurfaceChainRenderOperationFrame({
        ...chain,
        segments: segments.map(segment => ({
          ...segment,
          value: String(segment?.value || ""),
          soundSpellingFrames: Array.isArray(segment?.soundSpellingFrames) ? segment.soundSpellingFrames.map(frame => ({
            ...frame
          })) : undefined
        })),
        soundSpellingFrames: Array.isArray(chain?.soundSpellingFrames) ? chain.soundSpellingFrames.map(frame => ({
          ...frame
        })) : [],
        surfaceOperationFrames: normalizeSurfaceChainStructuredFrames(chain?.surfaceOperationFrames)
      });
    }
    function getSurfaceSoundSpellingFrameKey(frame = null) {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      return [frame.ruleId || "", frame.grammarSlot || "", frame.syllablePosition || "", frame.sourceSurface || "", frame.target || "", Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "", frame.segmentRole || "", frame.sourceSegmentValue || "", frame.targetSegmentValue || ""].join(":");
    }
    function pushUniqueSurfaceSoundSpellingFrame(list = [], frame = null) {
      if (!Array.isArray(list) || !frame || typeof frame !== "object" || !frame.ruleId) {
        return;
      }
      const key = getSurfaceSoundSpellingFrameKey(frame);
      if (!key || list.some(entry => getSurfaceSoundSpellingFrameKey(entry) === key)) {
        return;
      }
      list.push(frame);
    }
    function appendSurfaceChainLesson2Frame(chain = null, role = "", frameInput = {}, beforeValue = "", afterValue = "") {
      if (!chain || typeof chain !== "object" || typeof targetObject.buildLesson2SoundSpellingFrame !== "function") {
        return;
      }
      const segments = Array.isArray(chain.segments) ? chain.segments : [];
      const normalizedRole = normalizeOutputSurfaceRole(role);
      const segment = segments.find(entry => entry?.role === normalizedRole || entry?.slot === role);
      const frame = targetObject.buildLesson2SoundSpellingFrame(frameInput);
      if (!frame || !frame.ruleId) {
        return;
      }
      const decoratedFrame = {
        ...frame,
        segmentRole: normalizedRole || String(role || ""),
        sourceSegmentValue: String(beforeValue || ""),
        targetSegmentValue: String(afterValue || "")
      };
      if (!Array.isArray(chain.soundSpellingFrames)) {
        chain.soundSpellingFrames = [];
      }
      pushUniqueSurfaceSoundSpellingFrame(chain.soundSpellingFrames, decoratedFrame);
      if (segment) {
        if (!Array.isArray(segment.soundSpellingFrames)) {
          segment.soundSpellingFrames = [];
        }
        pushUniqueSurfaceSoundSpellingFrame(segment.soundSpellingFrames, decoratedFrame);
      }
    }
    function getSurfaceChainSegmentValue(chain = null, role = "") {
      const segments = Array.isArray(chain?.segments) ? chain.segments : [];
      const normalizedRole = normalizeOutputSurfaceRole(role);
      const match = segments.find(segment => segment?.role === normalizedRole || segment?.slot === role);
      return String(match?.value || "");
    }
    function setSurfaceChainSegmentValue(chain = null, role = "", nextValue = "") {
      const segments = Array.isArray(chain?.segments) ? chain.segments : [];
      const normalizedRole = normalizeOutputSurfaceRole(role);
      const match = segments.find(segment => segment?.role === normalizedRole || segment?.slot === role);
      if (match) {
        match.value = String(nextValue || "");
        attachSurfaceChainRenderOperationFrame(chain);
      }
    }
    function getSurfaceChainNextNonEmptyIndex(chain = null, startIndex = -1) {
      const segments = Array.isArray(chain?.segments) ? chain.segments : [];
      for (let index = startIndex + 1; index < segments.length; index += 1) {
        if (String(segments[index]?.value || "")) {
          return index;
        }
      }
      return -1;
    }
    function realizeSurfaceChainSubjectIInitialReduction(chain = null) {
      const nextChain = cloneSurfaceChainState(chain);
      const operationFrame = getSurfaceChainOperationFrame(nextChain, "andrews-surface-chain-subject-i-initial-reduction-operation-frame");
      const validatedOperation = validateSurfaceChainSubjectIInitialReductionOperationFrame(nextChain, operationFrame);
      if (!validatedOperation) {
        return nextChain;
      }
      const sourcePrefix = validatedOperation.sourcePrefix;
      const targetPrefix = validatedOperation.targetPrefix;
      setSurfaceChainSegmentValue(nextChain, "pers1", targetPrefix);
      appendSurfaceChainLesson2Frame(nextChain, "pers1", {
        ruleId: sourcePrefix === "ni" ? "pers1-ni-i-n" : "pers1-ti-i-t",
        source: sourcePrefix,
        target: targetPrefix,
        slot: "pers1",
        syllablePosition: "before-i-stem"
      }, sourcePrefix, targetPrefix);
      return nextChain;
    }
    function realizeSurfaceChainFinalIAUATrim(chain = null) {
      const nextChain = cloneSurfaceChainState(chain);
      const ruleMeta = nextChain?.surfaceRuleMeta && typeof nextChain.surfaceRuleMeta === "object" ? nextChain.surfaceRuleMeta : null;
      if (!ruleMeta || ruleMeta.trimFinalIAUAVowel !== true) {
        return nextChain;
      }
      const operationFrame = getSurfaceChainOperationFrame(nextChain, "andrews-surface-chain-final-ia-ua-trim-operation-frame");
      const validatedOperation = validateSurfaceChainFinalIAUATrimOperationFrame(nextChain, operationFrame);
      if (!validatedOperation) {
        return nextChain;
      }
      const troncoValue = validatedOperation.sourceStem;
      const nextTroncoValue = validatedOperation.targetStem;
      setSurfaceChainSegmentValue(nextChain, "tronco", nextTroncoValue);
      appendSurfaceChainLesson2Frame(nextChain, "tronco", {
        ruleId: "stem-final-a-elision",
        source: validatedOperation.removedLetter || "a",
        target: "",
        slot: "stem-final",
        syllablePosition: "stem-final-vowel"
      }, troncoValue, nextTroncoValue);
      return nextChain;
    }
    function realizeSurfaceChainOptativeKiReduction(chain = null) {
      const nextChain = cloneSurfaceChainState(chain);
      const ruleMeta = nextChain?.surfaceRuleMeta && typeof nextChain.surfaceRuleMeta === "object" ? nextChain.surfaceRuleMeta : null;
      if (!ruleMeta || ruleMeta.optativeKiReduction !== true) {
        return nextChain;
      }
      const operationFrame = getSurfaceChainOperationFrame(nextChain, "andrews-surface-chain-optative-ki-reduction-operation-frame");
      const validatedOperation = validateSurfaceChainOptativeKiReductionOperationFrame(nextChain, operationFrame);
      if (!validatedOperation) {
        return nextChain;
      }
      setSurfaceChainSegmentValue(nextChain, "obj1", validatedOperation.targetObjectPrefix);
      appendSurfaceChainLesson2Frame(nextChain, "obj1", {
        ruleId: "optative-ki-before-c-k",
        source: validatedOperation.sourceObjectPrefix,
        target: validatedOperation.targetObjectPrefix,
        slot: "obj1",
        syllablePosition: "before-consonant"
      }, validatedOperation.sourceObjectPrefix, validatedOperation.targetObjectPrefix);
      return nextChain;
    }
    function realizeSurfaceChainMuIskaliaReduction(chain = null) {
      const nextChain = cloneSurfaceChainState(chain);
      const ruleMeta = nextChain?.surfaceRuleMeta && typeof nextChain.surfaceRuleMeta === "object" ? nextChain.surfaceRuleMeta : null;
      if (!ruleMeta || ruleMeta.dropInitialIFromIskaliaAfterMu !== true) {
        return nextChain;
      }
      const operationFrame = getSurfaceChainOperationFrame(nextChain, "andrews-surface-chain-mu-iskalia-reduction-operation-frame");
      const validatedOperation = validateSurfaceChainMuIskaliaReductionOperationFrame(nextChain, operationFrame);
      if (!validatedOperation) {
        return nextChain;
      }
      const troncoValue = validatedOperation.sourceStem;
      const nextTroncoValue = validatedOperation.targetStem;
      setSurfaceChainSegmentValue(nextChain, "tronco", nextTroncoValue);
      appendSurfaceChainLesson2Frame(nextChain, "tronco", {
        ruleId: "mu-iskalia-i-elision",
        source: validatedOperation.removedLetter || "i",
        target: "",
        slot: "stem-initial",
        syllablePosition: "after-mu"
      }, troncoValue, nextTroncoValue);
      return nextChain;
    }
    function realizeSurfaceChainObjectIInitialElision(chain = null) {
      const nextChain = cloneSurfaceChainState(chain);
      const ruleMeta = nextChain?.surfaceRuleMeta && typeof nextChain.surfaceRuleMeta === "object" ? nextChain.surfaceRuleMeta : null;
      if (!ruleMeta || ruleMeta.dropVerbInitialIAfterObjectI !== true) {
        return nextChain;
      }
      const operationFrame = getSurfaceChainOperationFrame(nextChain, "andrews-surface-chain-object-i-initial-elision-operation-frame");
      const validatedOperation = validateSurfaceChainObjectIInitialElisionOperationFrame(nextChain, operationFrame);
      if (!validatedOperation) {
        return nextChain;
      }
      const troncoValue = validatedOperation.sourceStem;
      const nextTroncoValue = validatedOperation.targetStem;
      setSurfaceChainSegmentValue(nextChain, "tronco", nextTroncoValue);
      appendSurfaceChainLesson2Frame(nextChain, "tronco", {
        ruleId: "object-i-stem-i-elision",
        source: validatedOperation.removedLetter || "i",
        target: "",
        slot: "stem-initial",
        syllablePosition: "after-i-object"
      }, troncoValue, nextTroncoValue);
      return nextChain;
    }
    function realizeSurfaceChainNhBeforeVowel(chain = null) {
      const nextChain = cloneSurfaceChainState(chain);
      const operationFrames = normalizeSurfaceChainStructuredFrames(nextChain.surfaceOperationFrames).filter(frame => frame.kind === "andrews-surface-chain-nh-before-vowel-operation-frame");
      operationFrames.forEach(operationFrame => {
        const validatedOperation = validateSurfaceChainNhBeforeVowelOperationFrame(nextChain, operationFrame);
        if (!validatedOperation) {
          return;
        }
        setSurfaceChainSegmentValue(nextChain, validatedOperation.currentRole, validatedOperation.targetCurrentValue);
        appendSurfaceChainLesson2Frame(nextChain, validatedOperation.currentRole, {
          ruleId: "n-open-transition-nh",
          source: "n",
          target: "nh",
          slot: validatedOperation.currentSlot || "surface-segment",
          syllablePosition: "before-vowel"
        }, validatedOperation.sourceCurrentValue, validatedOperation.targetCurrentValue);
      });
      return nextChain;
    }
    function realizeSurfaceChainKContact(chain = null) {
      const nextChain = cloneSurfaceChainState(chain);
      const operationFrame = getSurfaceChainOperationFrame(nextChain, "andrews-surface-chain-k-contact-operation-frame");
      const validatedOperation = validateSurfaceChainKContactOperationFrame(nextChain, operationFrame);
      if (!validatedOperation) {
        return nextChain;
      }
      const obj1 = validatedOperation.sourceObjectPrefix;
      const tronco = validatedOperation.sourceStem;
      if (validatedOperation.kContactKind === "k-before-kw") {
        setSurfaceChainSegmentValue(nextChain, "obj1", validatedOperation.targetObjectPrefix);
        appendSurfaceChainLesson2Frame(nextChain, "obj1", {
          ruleId: "k-contact-before-kw-elision",
          source: "k+kw",
          target: "kw",
          slot: "obj1-stem-boundary",
          syllablePosition: "before-kw"
        }, `${obj1}+${tronco}`, `${validatedOperation.targetObjectPrefix}+${validatedOperation.targetStem}`);
      } else {
        setSurfaceChainSegmentValue(nextChain, "tronco", validatedOperation.targetStem);
        appendSurfaceChainLesson2Frame(nextChain, "tronco", {
          ruleId: "k-contact-single-k",
          source: "k+k",
          target: "k",
          slot: "obj1-stem-boundary",
          syllablePosition: "before-k"
        }, `${obj1}+${tronco}`, `${validatedOperation.targetObjectPrefix}+${validatedOperation.targetStem}`);
      }
      return nextChain;
    }
    function realizeSurfaceChainKwCoalescence(chain = null) {
      const nextChain = cloneSurfaceChainState(chain);
      const operationFrames = normalizeSurfaceChainStructuredFrames(nextChain.surfaceOperationFrames).filter(frame => frame.kind === "andrews-surface-chain-kw-coda-coalescence-operation-frame");
      operationFrames.forEach(operationFrame => {
        const validatedOperation = validateSurfaceChainKwCodaCoalescenceOperationFrame(nextChain, operationFrame);
        if (!validatedOperation) {
          return;
        }
        setSurfaceChainSegmentValue(nextChain, validatedOperation.segmentRole, validatedOperation.targetSegmentValue);
        appendSurfaceChainLesson2Frame(nextChain, validatedOperation.segmentRole, {
          ruleId: "kw-coda-k",
          source: "kw",
          target: "k",
          slot: validatedOperation.segmentSlot || "surface-segment",
          syllablePosition: "coda"
        }, validatedOperation.sourceSegmentValue, validatedOperation.targetSegmentValue);
      });
      return nextChain;
    }
    function realizeSurfaceChainYShift(chain = null) {
      const nextChain = cloneSurfaceChainState(chain);
      const ruleMeta = nextChain?.surfaceRuleMeta && typeof nextChain.surfaceRuleMeta === "object" ? nextChain.surfaceRuleMeta : {};
      if (ruleMeta.preserveCodaY === true) {
        return nextChain;
      }
      const operationFrames = normalizeSurfaceChainStructuredFrames(nextChain.surfaceOperationFrames).filter(frame => frame.kind === "andrews-surface-chain-y-coda-shift-operation-frame");
      operationFrames.forEach(operationFrame => {
        const validatedOperation = validateSurfaceChainYShiftOperationFrame(nextChain, operationFrame);
        if (!validatedOperation) {
          return;
        }
        setSurfaceChainSegmentValue(nextChain, validatedOperation.segmentRole, validatedOperation.targetSegmentValue);
        appendSurfaceChainLesson2Frame(nextChain, validatedOperation.segmentRole, {
          ruleId: validatedOperation.targetCoda === "s" ? "y-coda-s" : "y-coda-sh",
          source: "y",
          target: validatedOperation.targetCoda,
          slot: validatedOperation.segmentSlot || "surface-segment",
          syllablePosition: "coda"
        }, validatedOperation.sourceSegmentValue, validatedOperation.targetSegmentValue);
      });
      return nextChain;
    }
    function realizeSurfaceChainMCodaAssimilation(chain = null) {
      const nextChain = cloneSurfaceChainState(chain);
      const operationFrames = normalizeSurfaceChainStructuredFrames(nextChain.surfaceOperationFrames).filter(frame => frame.kind === "andrews-surface-chain-m-coda-assimilation-operation-frame");
      operationFrames.forEach(operationFrame => {
        const validatedOperation = validateSurfaceChainMCodaAssimilationOperationFrame(nextChain, operationFrame);
        if (!validatedOperation) {
          return;
        }
        setSurfaceChainSegmentValue(nextChain, validatedOperation.segmentRole, validatedOperation.targetSegmentValue);
        appendSurfaceChainLesson2Frame(nextChain, validatedOperation.segmentRole, {
          ruleId: "m-coda-n",
          source: "m",
          target: "n",
          slot: validatedOperation.segmentSlot || "surface-segment",
          syllablePosition: "coda"
        }, validatedOperation.sourceSegmentValue, validatedOperation.targetSegmentValue);
      });
      return nextChain;
    }
    function realizeSurfaceChain(chain = null) {
      const afterFinalTrim = realizeSurfaceChainFinalIAUATrim(chain);
      const afterMuIskaliaReduction = realizeSurfaceChainMuIskaliaReduction(afterFinalTrim);
      const afterSubjectReduction = realizeSurfaceChainSubjectIInitialReduction(afterMuIskaliaReduction);
      const afterOptativeKiReduction = realizeSurfaceChainOptativeKiReduction(afterSubjectReduction);
      const afterIContactElision = realizeSurfaceChainObjectIInitialElision(afterOptativeKiReduction);
      const afterNhBeforeVowel = realizeSurfaceChainNhBeforeVowel(afterIContactElision);
      const afterKContact = realizeSurfaceChainKContact(afterNhBeforeVowel);
      const afterKwCoalescence = realizeSurfaceChainKwCoalescence(afterKContact);
      const afterYShift = realizeSurfaceChainYShift(afterKwCoalescence);
      return realizeSurfaceChainMCodaAssimilation(afterYShift);
    }
    function joinSurfaceChain(chain = null) {
      const renderFrame = chain?.surfaceRenderOperationFrame && typeof chain.surfaceRenderOperationFrame === "object" ? chain.surfaceRenderOperationFrame : null;
      const validatedRender = validateSurfaceChainRenderOperationFrame(chain, renderFrame);
      return validatedRender ? validatedRender.surface : "";
    }
    function buildPrefixedChain(input = {}) {
      const {
        pers1,
        poseedor,
        obj1,
        tronco,
        surfaceRuleMeta = null
      } = normalizeOutputSurfaceSlotInput(input);
      return joinSurfaceChain(realizeSurfaceChain(buildSurfaceChainState({
        pers1,
        poseedor,
        obj1,
        tronco,
        surfaceRuleMeta
      })));
    }

    // === Output Formatting ===
    function isWjAlternationPair(left, right) {
      if (!left || !right || left.length !== right.length) {
        return false;
      }
      let diffIndex = -1;
      for (let i = 0; i < left.length; i += 1) {
        if (left[i] === right[i]) {
          continue;
        }
        if (diffIndex !== -1) {
          return false;
        }
        diffIndex = i;
        const isWj = left[i] === "w" && right[i] === "j" || left[i] === "j" && right[i] === "w";
        if (!isWj) {
          return false;
        }
      }
      return diffIndex !== -1;
    }
    function getExpectedAbsolutiveSuffix(form) {
      if (!form) {
        return "";
      }
      const letters = targetObject.splitVerbLetters(form);
      const last = letters[letters.length - 1] || "";
      if (!last) {
        return "";
      }
      return targetObject.isVerbLetterVowel(last) ? "t" : "ti";
    }
    function isAbsolutivePair(base, candidate) {
      if (!base || !candidate) {
        return false;
      }
      const suffix = getExpectedAbsolutiveSuffix(base);
      if (!suffix) {
        return false;
      }
      return candidate === `${base}${suffix}`;
    }
    function isPatientivoInPair(base, candidate) {
      if (!base || !candidate) {
        return false;
      }
      return candidate === `${base}in`;
    }
    function getNominalMarkerFamilyBases(form = "") {
      const normalizedForm = String(form || "");
      const bases = [];
      const pushBase = (value = "") => {
        const normalizedValue = String(value || "");
        if (!normalizedValue || bases.includes(normalizedValue)) {
          return;
        }
        bases.push(normalizedValue);
      };
      pushBase(normalizedForm);
      if (normalizedForm.endsWith("in") && normalizedForm.length > 2) {
        pushBase(normalizedForm.slice(0, -2));
      }
      if (normalizedForm.endsWith("ti") && normalizedForm.length > 2) {
        pushBase(normalizedForm.slice(0, -2));
      }
      if (normalizedForm.endsWith("t") && !normalizedForm.endsWith("ti") && normalizedForm.length > 1) {
        pushBase(normalizedForm.slice(0, -1));
      }
      return bases;
    }
    function resolveNominalMarkerFamily(expandedForms = [], used = [], baseIndex = 0) {
      const seedForm = expandedForms[baseIndex] || "";
      if (!seedForm || used[baseIndex]) {
        return null;
      }
      const candidateBases = getNominalMarkerFamilyBases(seedForm);
      let bestFamily = null;
      candidateBases.forEach(base => {
        if (!base) {
          return;
        }
        const absolutiveSuffix = getExpectedAbsolutiveSuffix(base);
        const familyForms = [base];
        if (absolutiveSuffix) {
          familyForms.push(`${base}${absolutiveSuffix}`);
        }
        familyForms.push(`${base}in`);
        const indices = [];
        const matchedForms = [];
        familyForms.forEach(familyForm => {
          const matchIndex = expandedForms.findIndex((candidate, index) => !used[index] && !indices.includes(index) && candidate === familyForm);
          if (matchIndex === -1) {
            return;
          }
          indices.push(matchIndex);
          matchedForms.push({
            form: expandedForms[matchIndex],
            index: matchIndex,
            role: familyForm === `${base}in` ? "patientivo-in" : familyForm === base ? "zero" : "absolutive"
          });
        });
        if (indices.length <= 1) {
          return;
        }
        if (!bestFamily || indices.length > bestFamily.indices.length) {
          const pairForms = matchedForms.filter(entry => entry.role === "zero" || entry.role === "absolutive").sort((left, right) => left.index - right.index).map(entry => entry.form);
          const inForm = matchedForms.find(entry => entry.role === "patientivo-in")?.form || "";
          const textParts = [];
          if (pairForms.length) {
            textParts.push(pairForms.join("/"));
          }
          if (inForm) {
            if (textParts.length) {
              textParts[textParts.length - 1] = `${textParts[textParts.length - 1]}, ${inForm}`;
            } else {
              textParts.push(inForm);
            }
          }
          bestFamily = {
            indices,
            text: textParts.join(" / ")
          };
        }
      });
      return bestFamily;
    }
    function hasOptionalParentheticalForm(forms) {
      if (!Array.isArray(forms) || forms.length === 0) {
        return false;
      }
      return forms.some(form => /\([^()]+\)/.test(form));
    }
    function getOptionalParentheticalFormTargets(form = "") {
      const sourceForm = String(form || "");
      const expandOne = (value = "") => {
        const match = String(value || "").match(/^(.*)\(([^()]+)\)(.*)$/);
        if (!match) {
          return [String(value || "")];
        }
        const before = match[1] || "";
        const optionalPart = match[2] || "";
        const after = match[3] || "";
        return [...expandOne(`${before}${after}`), ...expandOne(`${before}${optionalPart}${after}`)];
      };
      return expandOne(sourceForm).filter(Boolean);
    }
    function buildOptionalParentheticalFormsSourceFrame(forms = [], options = {}) {
      const sourceForms = (Array.isArray(forms) ? forms : []).map(form => String(form || "").trim()).filter(Boolean);
      const sourceSegmentFrames = (Array.isArray(options.sourceSegmentFrames) ? options.sourceSegmentFrames : []).map((segment, index) => ({
        kind: "optional-parenthetical-source-segment-frame",
        index,
        role: normalizeOutputSurfaceRole(segment?.role || segment?.slot || ""),
        slot: String(segment?.slot || segment?.role || ""),
        value: String(segment?.value || "")
      }));
      const formFrames = sourceForms.map((form, index) => ({
        kind: "optional-parenthetical-source-form-frame",
        index,
        sourceForm: form,
        hasOptionalParenthetical: /\([^()]+\)/.test(form),
        optionalMarkers: Array.from(form.matchAll(/\(([^()]+)\)/g)).map((match, markerIndex) => ({
          kind: "optional-parenthetical-marker-frame",
          markerIndex,
          optionalText: String(match[1] || ""),
          startIndex: Number(match.index || 0)
        }))
      }));
      const diagnostics = [];
      if (!sourceForms.length) {
        diagnostics.push("missing-source-forms");
      }
      if (sourceForms.length && !formFrames.some(frame => frame.hasOptionalParenthetical)) {
        diagnostics.push("no-optional-parenthetical-forms");
      }
      return {
        kind: "optional-parenthetical-forms-source-frame",
        routeId: "optional-parenthetical-form-expansion",
        sourceKind: String(options.sourceKind || "surface-form-source"),
        sourceForms,
        sourceSegmentFrames,
        formFrames,
        supported: sourceForms.length > 0 && formFrames.some(frame => frame.hasOptionalParenthetical),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildOptionalParentheticalFormsOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "optional-parenthetical-forms-source-frame") {
        return null;
      }
      const seen = new Set();
      const targetForms = [];
      (Array.isArray(sourceFrame.formFrames) ? sourceFrame.formFrames : []).forEach(formFrame => {
        getOptionalParentheticalFormTargets(formFrame.sourceForm).forEach(targetForm => {
          if (!targetForm || seen.has(targetForm)) {
            return;
          }
          seen.add(targetForm);
          targetForms.push(targetForm);
        });
      });
      const supported = sourceFrame.supported === true && targetForms.length > 0;
      return {
        kind: "andrews-optional-parenthetical-forms-operation-frame",
        operationId: "andrews-optional-parenthetical-form-expansion",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "optional-parenthetical-forms-target-frame",
          targetForms,
          targetCount: targetForms.length
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-optional-parenthetical-forms-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function validateOptionalParentheticalFormsOperationFrame(forms = [], sourceFrame = null, operationFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "optional-parenthetical-forms-source-frame" || !operationFrame || operationFrame.kind !== "andrews-optional-parenthetical-forms-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const sourceForms = (Array.isArray(forms) ? forms : []).map(form => String(form || "").trim()).filter(Boolean);
      if (sourceForms.length !== sourceFrame.sourceForms.length || sourceForms.some((form, index) => form !== sourceFrame.sourceForms[index])) {
        return null;
      }
      const rebuiltOperationFrame = buildOptionalParentheticalFormsOperationFrame(sourceFrame);
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const expectedForms = rebuiltOperationFrame?.targetFrame?.targetForms || [];
      const targetForms = Array.isArray(targetFrame?.targetForms) ? targetFrame.targetForms : [];
      if (targetForms.length !== expectedForms.length || targetForms.some((form, index) => form !== expectedForms[index])) {
        return null;
      }
      return targetForms;
    }
    function expandOptionalParentheticalForms(forms, options = {}) {
      const sourceForms = (Array.isArray(forms) ? forms : []).map(form => String(form || "").trim()).filter(Boolean);
      if (!sourceForms.length) {
        return [];
      }
      if (!hasOptionalParentheticalForm(sourceForms)) {
        return sourceForms.filter((form, index, list) => form && list.indexOf(form) === index);
      }
      const targetForms = validateOptionalParentheticalFormsOperationFrame(sourceForms, options?.sourceFrame || null, options?.operationFrame || null);
      return targetForms || [];
    }
    function formatConjugationDisplay(value) {
      if (!value) {
        return value;
      }
      const forms = value.split(/\s*\/\s*/g).map(form => form.trim()).filter(Boolean);
      const optionalParentheticalSourceFrame = buildOptionalParentheticalFormsSourceFrame(forms, {
        sourceKind: "conjugation-display-source-forms"
      });
      const optionalParentheticalOperationFrame = buildOptionalParentheticalFormsOperationFrame(optionalParentheticalSourceFrame);
      const expandedForms = expandOptionalParentheticalForms(forms, {
        sourceFrame: optionalParentheticalSourceFrame,
        operationFrame: optionalParentheticalOperationFrame
      });
      if (expandedForms.length <= 1) {
        return expandedForms[0] || value.trim();
      }
      if (hasOptionalParentheticalForm(forms)) {
        const seen = new Set();
        const lines = [];
        forms.forEach(form => {
          const groupedSourceFrame = buildOptionalParentheticalFormsSourceFrame([form], {
            sourceKind: "conjugation-display-source-form"
          });
          const groupedOperationFrame = buildOptionalParentheticalFormsOperationFrame(groupedSourceFrame);
          const grouped = expandOptionalParentheticalForms([form], {
            sourceFrame: groupedSourceFrame,
            operationFrame: groupedOperationFrame
          }).filter(variant => {
            if (!variant || seen.has(variant)) {
              return false;
            }
            seen.add(variant);
            return true;
          });
          if (grouped.length) {
            lines.push(grouped.join(" / "));
          }
        });
        if (lines.length) {
          return lines.join("\n");
        }
        return expandedForms.join(" / ");
      }
      const used = new Array(expandedForms.length).fill(false);
      const lines = [];
      for (let i = 0; i < expandedForms.length; i += 1) {
        if (used[i]) {
          continue;
        }
        const nominalFamily = resolveNominalMarkerFamily(expandedForms, used, i);
        if (nominalFamily) {
          lines.push(nominalFamily.text);
          nominalFamily.indices.forEach(index => {
            used[index] = true;
          });
          continue;
        }
        let pairedIndex = -1;
        let pairText = "";
        for (let j = i + 1; j < expandedForms.length; j += 1) {
          if (used[j]) {
            continue;
          }
          const left = expandedForms[i];
          const right = expandedForms[j];
          if (isWjAlternationPair(left, right)) {
            pairedIndex = j;
            pairText = `${left} / ${right}`;
            break;
          }
        }
        if (pairedIndex === -1) {
          for (let j = i + 1; j < expandedForms.length; j += 1) {
            if (used[j]) {
              continue;
            }
            const left = expandedForms[i];
            const right = expandedForms[j];
            if (isAbsolutivePair(left, right)) {
              pairedIndex = j;
              pairText = `${left} / ${right}`;
              break;
            }
            if (isAbsolutivePair(right, left)) {
              pairedIndex = j;
              pairText = `${right} / ${left}`;
              break;
            }
          }
        }
        if (pairedIndex !== -1) {
          lines.push(pairText || `${expandedForms[i]} / ${expandedForms[pairedIndex]}`);
          used[i] = true;
          used[pairedIndex] = true;
        } else {
          lines.push(expandedForms[i]);
          used[i] = true;
        }
      }
      return lines.join("\n");
    }
    function normalizeSupportiveMarkerValue(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      return normalized === "i" || normalized === "y" ? normalized : "";
    }
    function hasSupportiveMarkerValue(value = "") {
      return Boolean(normalizeSupportiveMarkerValue(value));
    }
    function getSupportiveMarkerTokenForLetter(letter = "", format = targetObject.SUPPORTIVE_MARKER_FORMAT.envelope) {
      const normalized = String(letter || "").trim().toLowerCase();
      const resolvedLetter = normalized === "y" ? "y" : "i";
      if (format === targetObject.SUPPORTIVE_MARKER_FORMAT.regex) {
        return resolvedLetter === "y" ? targetObject.REGEX_OPTIONAL_SUPPORTIVE_Y_MARKER : targetObject.REGEX_OPTIONAL_SUPPORTIVE_I_MARKER;
      }
      return resolvedLetter === "y" ? targetObject.OPTIONAL_SUPPORTIVE_Y_MARKER : targetObject.OPTIONAL_SUPPORTIVE_I_MARKER;
    }
    function getSupportiveMarkerLetterFromValue(value = "", format = targetObject.SUPPORTIVE_MARKER_FORMAT.envelope) {
      const source = String(value || "");
      const match = format === targetObject.SUPPORTIVE_MARKER_FORMAT.regex ? source.match(targetObject.REGEX_OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE) : source.match(targetObject.OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE);
      return match ? String(match[1] || match[2] || "").toLowerCase() : "";
    }
    function replaceSupportiveMarkersWithLetters(value = "", format = targetObject.SUPPORTIVE_MARKER_FORMAT.envelope) {
      const source = String(value || "");
      const pattern = format === targetObject.SUPPORTIVE_MARKER_FORMAT.regex ? targetObject.REGEX_OPTIONAL_SUPPORTIVE_MARKER_RE : targetObject.OPTIONAL_SUPPORTIVE_MARKER_RE;
      return source.replace(pattern, (_match, letterA, letterB) => String(letterA || letterB || "").toLowerCase());
    }
    function getOptionalSupportiveMarkerForLetter(letter = "") {
      return getSupportiveMarkerTokenForLetter(letter, targetObject.SUPPORTIVE_MARKER_FORMAT.envelope);
    }
    function getOptionalSupportiveMarkerLetter(value = "") {
      return getSupportiveMarkerLetterFromValue(value, targetObject.SUPPORTIVE_MARKER_FORMAT.envelope);
    }
    function hasOptionalSupportiveMarker(value = "") {
      return Boolean(getOptionalSupportiveMarkerLetter(value));
    }
    function replaceOptionalSupportiveMarkersWithLetters(value = "") {
      return replaceSupportiveMarkersWithLetters(value, targetObject.SUPPORTIVE_MARKER_FORMAT.envelope);
    }
    function stripOptionalSupportiveMarkers(value = "") {
      return String(value || "").replace(targetObject.OPTIONAL_SUPPORTIVE_MARKER_RE, "");
    }
    function getRegexOptionalSupportiveMarkerForLetter(letter = "") {
      return getSupportiveMarkerTokenForLetter(letter, targetObject.SUPPORTIVE_MARKER_FORMAT.regex);
    }
    function getRegexOptionalSupportiveMarkerLetter(value = "") {
      return getSupportiveMarkerLetterFromValue(value, targetObject.SUPPORTIVE_MARKER_FORMAT.regex);
    }
    function convertEnvelopeSupportiveMarkersToRegexInput(value = "") {
      return String(value || "").replace(targetObject.REGEX_OPTIONAL_SUPPORTIVE_MARKER_RE, (_match, letter) => getOptionalSupportiveMarkerForLetter(letter));
    }
    function convertRegexInputSupportiveMarkersToEnvelope(value = "") {
      return String(value || "").replace(targetObject.OPTIONAL_SUPPORTIVE_MARKER_RE, (_match, letterA, letterB) => getRegexOptionalSupportiveMarkerForLetter(letterA || letterB));
    }
    function replaceEnvelopeExplicitValenceMarkersWithRegexMarkers(value = "") {
      return String(value || "").replace(/(^|[-/])\((ta|te|mu|t|m)\)(?=$|[-/])/gi, (_match, separator, token) => `${separator}${String(token || "").toUpperCase()}`);
    }
    function normalizeSupportiveYContextSurface(value = "") {
      return replaceOptionalSupportiveMarkersWithLetters(convertEnvelopeSupportiveMarkersToRegexInput(String(value || ""))).replace(/[^a-z]/gi, "").toLowerCase();
    }
    function getSupportiveYFollowingSurfaceLetters(followingSurface = "") {
      const normalized = normalizeSupportiveYContextSurface(followingSurface);
      if (!normalized) {
        return [];
      }
      const letters = targetObject.splitVerbLetters(normalized);
      if (letters[0] === "y" && targetObject.isVerbLetterVowel(letters[1] || "")) {
        return letters.slice(1);
      }
      return letters;
    }
    function getSupportiveYFollowingVowel(followingSurface = "") {
      const letters = getSupportiveYFollowingSurfaceLetters(followingSurface);
      return letters.find(letter => targetObject.isVerbLetterVowel(letter)) || "";
    }
    function hasInitialReduplicativeSupportiveYPattern(followingSurface = "") {
      const letters = getSupportiveYFollowingSurfaceLetters(followingSurface);
      return letters.length >= 4 && targetObject.isVerbLetterVowel(letters[0] || "") && letters[1] === "j" && letters[2] === "y" && targetObject.isVerbLetterVowel(letters[3] || "");
    }
    function dropReduplicativeYAfterVj(followingSurface = "") {
      return normalizeSupportiveYContextSurface(followingSurface).replace(/^([aeiu]j)y(?=[aeiu])/i, "$1");
    }
    function markReduplicativeYAfterVj(followingSurface = "", format = targetObject.SUPPORTIVE_MARKER_FORMAT.envelope) {
      const normalized = normalizeSupportiveYContextSurface(followingSurface);
      if (!normalized) {
        return "";
      }
      const marker = getSupportiveMarkerTokenForLetter("y", format);
      return normalized.replace(/^([aeiu]j)y(?=[aeiu])/i, `$1${marker}`);
    }
    function markInitialReduplicativeSupportiveYSurface(surface = "", format = targetObject.SUPPORTIVE_MARKER_FORMAT.envelope) {
      const normalized = normalizeSupportiveYContextSurface(surface);
      if (!normalized) {
        return "";
      }
      const leadingMarker = getSupportiveMarkerTokenForLetter("y", format);
      if (!normalized.startsWith("y")) {
        return normalized;
      }
      const remainder = normalized.slice(1);
      return `${leadingMarker}${markReduplicativeYAfterVj(remainder, format) || remainder}`;
    }
    function resolveOptionalSupportiveYBehavior({
      precedingSurface = "",
      followingSurface = ""
    } = {}) {
      const followingVowel = getSupportiveYFollowingVowel(followingSurface);
      const hasReduplicativePattern = hasInitialReduplicativeSupportiveYPattern(followingSurface);
      const normalizedPreceding = normalizeSupportiveYContextSurface(precedingSurface);
      const precedingLetters = targetObject.splitVerbLetters(normalizedPreceding);
      const finalLetter = precedingLetters.length ? precedingLetters[precedingLetters.length - 1] : "";
      const isWordInitial = !finalLetter;
      if (isWordInitial) {
        return {
          deleteMarker: hasReduplicativePattern,
          deleteReduplicativeY: hasReduplicativePattern
        };
      }
      if (targetObject.isVerbLetterConsonant(finalLetter)) {
        return {
          deleteMarker: true,
          deleteReduplicativeY: hasReduplicativePattern
        };
      }
      if (finalLetter === "i") {
        return {
          deleteMarker: true,
          deleteReduplicativeY: hasReduplicativePattern
        };
      }
      if (followingVowel === "e") {
        return {
          deleteMarker: true,
          deleteReduplicativeY: hasReduplicativePattern
        };
      }
      return {
        deleteMarker: false,
        deleteReduplicativeY: false
      };
    }
    function normalizeSupportiveMarkedEnvelopeSurface(value = "", format = targetObject.SUPPORTIVE_MARKER_FORMAT.envelope) {
      const source = String(value || "");
      if (format === targetObject.SUPPORTIVE_MARKER_FORMAT.regex) {
        return convertEnvelopeSupportiveMarkersToRegexInput(source);
      }
      return source;
    }
    function formatResolvedSupportiveMarkedSurface(value = "", format = targetObject.SUPPORTIVE_MARKER_FORMAT.envelope, preserveMarkers = false) {
      const envelopeValue = String(value || "");
      if (!preserveMarkers) {
        return replaceOptionalSupportiveMarkersWithLetters(envelopeValue);
      }
      if (format === targetObject.SUPPORTIVE_MARKER_FORMAT.regex) {
        return convertRegexInputSupportiveMarkersToEnvelope(envelopeValue);
      }
      return envelopeValue;
    }
    function buildOptionalSupportiveMarkedSurfaceSourceFrame({
      precedingSurface = "",
      markedSurface = "",
      inputFormat = targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
      outputFormat = inputFormat,
      preserveMarkers = false,
      sourceKind = "optional-supportive-marked-surface",
      sourceRole = "tronco"
    } = {}) {
      const envelopeMarkedSurface = normalizeSupportiveMarkedEnvelopeSurface(markedSurface, inputFormat);
      const markerMatch = envelopeMarkedSurface.match(targetObject.OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE);
      const markerLetter = markerMatch ? String(markerMatch[1] || "").toLowerCase() : "";
      const markerToken = markerMatch ? markerMatch[0] : "";
      const markerIndex = markerToken ? envelopeMarkedSurface.indexOf(markerToken) : -1;
      const localPrecedingSurface = markerIndex >= 0 ? `${String(precedingSurface || "")}${envelopeMarkedSurface.slice(0, markerIndex)}` : String(precedingSurface || "");
      const followingSurface = markerIndex >= 0 ? envelopeMarkedSurface.slice(markerIndex + markerToken.length) : "";
      const diagnostics = [];
      if (!envelopeMarkedSurface) {
        diagnostics.push("missing-marked-surface");
      }
      if (envelopeMarkedSurface && !markerLetter) {
        diagnostics.push("missing-supportive-marker");
      }
      if (markerLetter && markerLetter !== "y") {
        diagnostics.push("supportive-marker-not-y");
      }
      return {
        kind: "optional-supportive-marked-surface-source-frame",
        routeId: "optional-supportive-marked-surface",
        sourceKind: String(sourceKind || "optional-supportive-marked-surface"),
        sourceRole: normalizeOutputSurfaceRole(sourceRole || "tronco"),
        precedingSurface: String(precedingSurface || ""),
        markedSurface: String(markedSurface || ""),
        envelopeMarkedSurface,
        inputFormat,
        outputFormat,
        preserveMarkers: preserveMarkers === true,
        markerLetter,
        markerToken,
        markerIndex,
        localPrecedingSurface,
        followingSurface,
        supported: Boolean(envelopeMarkedSurface && markerLetter === "y" && markerToken && markerIndex >= 0),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildOptionalSupportiveMarkedSurfaceOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "optional-supportive-marked-surface-source-frame") {
        return null;
      }
      const envelopeMarkedSurface = String(sourceFrame.envelopeMarkedSurface || "");
      const markerLetter = String(sourceFrame.markerLetter || "");
      const markerToken = String(sourceFrame.markerToken || "");
      const markerIndex = Number(sourceFrame.markerIndex);
      const followingSurface = String(sourceFrame.followingSurface || "");
      const preserveMarkers = sourceFrame.preserveMarkers === true;
      const yBehavior = markerLetter === "y" ? resolveOptionalSupportiveYBehavior({
        precedingSurface: String(sourceFrame.localPrecedingSurface || ""),
        followingSurface
      }) : {
        deleteMarker: false,
        deleteReduplicativeY: false
      };
      const resolvedFollowingSurface = yBehavior.deleteReduplicativeY ? dropReduplicativeYAfterVj(followingSurface) : followingSurface;
      const resolvedEnvelopeSurface = sourceFrame.supported === true ? preserveMarkers && yBehavior.deleteReduplicativeY ? envelopeMarkedSurface : `${envelopeMarkedSurface.slice(0, markerIndex)}` + `${yBehavior.deleteMarker ? "" : markerToken}` + `${resolvedFollowingSurface}` : envelopeMarkedSurface;
      const outputSurface = formatResolvedSupportiveMarkedSurface(resolvedEnvelopeSurface, sourceFrame.outputFormat || targetObject.SUPPORTIVE_MARKER_FORMAT.envelope, preserveMarkers);
      const supported = sourceFrame.supported === true && markerLetter === "y" && Boolean(markerToken && markerIndex >= 0 && envelopeMarkedSurface);
      return {
        kind: "andrews-optional-supportive-marked-surface-operation-frame",
        operationId: "andrews-optional-supportive-marked-surface-resolution",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "optional-supportive-marked-surface-target-frame",
          sourceRole: String(sourceFrame.sourceRole || "tronco"),
          markerLetter,
          markerToken,
          deleteMarker: yBehavior.deleteMarker === true,
          deleteReduplicativeY: yBehavior.deleteReduplicativeY === true,
          envelopeMarkedSurface,
          resolvedEnvelopeSurface,
          plainSurface: replaceOptionalSupportiveMarkersWithLetters(resolvedEnvelopeSurface),
          outputSurface
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-optional-supportive-marked-surface-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function validateOptionalSupportiveMarkedSurfaceOperationFrame({
      precedingSurface = "",
      markedSurface = "",
      inputFormat = targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
      outputFormat = inputFormat,
      preserveMarkers = false,
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "optional-supportive-marked-surface-source-frame" || !operationFrame || operationFrame.kind !== "andrews-optional-supportive-marked-surface-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const rebuiltSourceFrame = buildOptionalSupportiveMarkedSurfaceSourceFrame({
        precedingSurface,
        markedSurface,
        inputFormat,
        outputFormat,
        preserveMarkers,
        sourceKind: sourceFrame.sourceKind,
        sourceRole: sourceFrame.sourceRole
      });
      const comparableKeys = ["precedingSurface", "markedSurface", "envelopeMarkedSurface", "inputFormat", "outputFormat", "preserveMarkers", "markerLetter", "markerToken", "markerIndex", "localPrecedingSurface", "followingSurface"];
      const sourceMatches = comparableKeys.every(key => sourceFrame[key] === rebuiltSourceFrame[key]);
      if (!sourceMatches || rebuiltSourceFrame.supported !== true) {
        return null;
      }
      const rebuiltOperationFrame = buildOptionalSupportiveMarkedSurfaceOperationFrame(rebuiltSourceFrame);
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const expectedTargetFrame = rebuiltOperationFrame?.targetFrame || null;
      if (!targetFrame || !expectedTargetFrame) {
        return null;
      }
      const targetMatches = ["markerLetter", "markerToken", "deleteMarker", "deleteReduplicativeY", "envelopeMarkedSurface", "resolvedEnvelopeSurface", "plainSurface", "outputSurface"].every(key => targetFrame[key] === expectedTargetFrame[key]);
      return targetMatches ? targetFrame : null;
    }
    function resolveOptionalSupportiveMarkedSurface({
      precedingSurface = "",
      markedSurface = "",
      inputFormat = targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
      outputFormat = inputFormat,
      preserveMarkers = false,
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const envelopeMarkedSurface = normalizeSupportiveMarkedEnvelopeSurface(markedSurface, inputFormat);
      if (!envelopeMarkedSurface) {
        return {
          markerLetter: "",
          envelopeMarkedSurface: "",
          plainSurface: "",
          outputSurface: ""
        };
      }
      const markerMatch = envelopeMarkedSurface.match(targetObject.OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE);
      const markerLetter = markerMatch ? String(markerMatch[1] || "").toLowerCase() : "";
      if (markerLetter === "y" && markerMatch) {
        const validatedTargetFrame = validateOptionalSupportiveMarkedSurfaceOperationFrame({
          precedingSurface,
          markedSurface,
          inputFormat,
          outputFormat,
          preserveMarkers,
          sourceFrame,
          operationFrame
        });
        if (!validatedTargetFrame) {
          return {
            markerLetter,
            envelopeMarkedSurface,
            plainSurface: "",
            outputSurface: "",
            supported: false,
            diagnostics: [!sourceFrame ? "missing-optional-supportive-marked-surface-source-frame" : "", !operationFrame ? "missing-optional-supportive-marked-surface-operation-frame" : "", sourceFrame && operationFrame ? "invalid-optional-supportive-marked-surface-operation-frame" : ""].filter(Boolean)
          };
        }
        return {
          markerLetter,
          envelopeMarkedSurface: validatedTargetFrame.resolvedEnvelopeSurface,
          plainSurface: validatedTargetFrame.plainSurface,
          outputSurface: validatedTargetFrame.outputSurface,
          supported: true,
          operationFrame: cloneSurfaceChainStructuredFrame(operationFrame)
        };
      }
      let resolvedEnvelopeSurface = envelopeMarkedSurface;
      return {
        markerLetter,
        envelopeMarkedSurface: resolvedEnvelopeSurface,
        plainSurface: replaceOptionalSupportiveMarkersWithLetters(resolvedEnvelopeSurface),
        outputSurface: formatResolvedSupportiveMarkedSurface(resolvedEnvelopeSurface, outputFormat, preserveMarkers)
      };
    }
    function markOptionalSupportiveSurface(value = "", letter = "", format = targetObject.SUPPORTIVE_MARKER_FORMAT.envelope) {
      const normalizedSurface = normalizeSupportiveYContextSurface(value);
      if (!normalizedSurface) {
        return "";
      }
      const supportiveLetter = targetObject.resolveOptionalSupportiveLetter(letter, normalizedSurface);
      if (supportiveLetter === "y") {
        const supportiveYIndex = normalizedSurface.search(/y(?=[aeiu])/i);
        if (supportiveYIndex < 0) {
          return normalizedSurface;
        }
        const prefix = normalizedSurface.slice(0, supportiveYIndex);
        const ySegment = normalizedSurface.slice(supportiveYIndex);
        if (hasInitialReduplicativeSupportiveYPattern(ySegment)) {
          return `${prefix}${markInitialReduplicativeSupportiveYSurface(ySegment, format)}`;
        }
        if (ySegment.startsWith("y")) {
          return `${prefix}${getSupportiveMarkerTokenForLetter("y", format)}${ySegment.slice(1)}`;
        }
        return normalizedSurface;
      }
      if (normalizedSurface.startsWith("i")) {
        return `${getSupportiveMarkerTokenForLetter("i", format)}${normalizedSurface.slice(1)}`;
      }
      return normalizedSurface;
    }
    function buildOptionalSupportiveOutputVerbSourceFrame({
      pers1 = "",
      poseedor = "",
      obj1 = "",
      tronco = "",
      hasOptionalSupportiveI = false,
      optionalSupportiveLetter = ""
    } = {}) {
      const subjectPrefix = String(pers1 || "");
      const possessorPrefix = String(poseedor || "");
      const objectPrefix = String(obj1 || "");
      const sourceStem = String(tronco || "");
      const supportiveRequested = hasOptionalSupportiveI === true;
      const supportiveLetter = normalizeSupportiveMarkerValue(optionalSupportiveLetter);
      const markedStem = supportiveRequested && supportiveLetter === "y" ? markOptionalSupportiveSurface(sourceStem, supportiveLetter, targetObject.SUPPORTIVE_MARKER_FORMAT.envelope) : sourceStem;
      const precedingSurface = `${subjectPrefix}${possessorPrefix}${objectPrefix}`;
      const markedSurfaceSourceFrame = buildOptionalSupportiveMarkedSurfaceSourceFrame({
        precedingSurface,
        markedSurface: markedStem,
        inputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
        outputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
        preserveMarkers: false,
        sourceKind: "optional-supportive-output-verb",
        sourceRole: "tronco"
      });
      const diagnostics = [];
      if (!supportiveRequested) {
        diagnostics.push("optional-supportive-not-requested");
      }
      if (supportiveRequested && supportiveLetter !== "y") {
        diagnostics.push("optional-supportive-letter-not-y");
      }
      if (supportiveRequested && supportiveLetter === "y" && !sourceStem) {
        diagnostics.push("missing-source-stem");
      }
      if (supportiveRequested && supportiveLetter === "y" && !markedSurfaceSourceFrame.supported) {
        diagnostics.push("source-stem-has-no-supportive-y-marker-site");
      }
      return {
        kind: "optional-supportive-output-verb-source-frame",
        routeId: "optional-supportive-output-verb",
        subjectPrefix,
        possessorPrefix,
        objectPrefix,
        sourceStem,
        supportiveRequested,
        supportiveLetter,
        precedingSurface,
        markedStem,
        markedSurfaceSourceFrame,
        supported: Boolean(supportiveRequested && supportiveLetter === "y" && sourceStem && markedSurfaceSourceFrame.supported),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function buildOptionalSupportiveOutputVerbOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "optional-supportive-output-verb-source-frame") {
        return null;
      }
      const markedSurfaceOperationFrame = buildOptionalSupportiveMarkedSurfaceOperationFrame(sourceFrame.markedSurfaceSourceFrame);
      const targetFrame = markedSurfaceOperationFrame?.targetFrame || null;
      const targetStem = targetFrame?.plainSurface || "";
      const supported = sourceFrame.supported === true && markedSurfaceOperationFrame?.supported === true && Boolean(targetStem);
      return {
        kind: "andrews-optional-supportive-output-verb-operation-frame",
        operationId: "andrews-optional-supportive-output-verb-resolution",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        markedSurfaceOperationFrame: cloneSurfaceChainStructuredFrame(markedSurfaceOperationFrame),
        targetFrame: {
          kind: "optional-supportive-output-verb-target-frame",
          targetSlot: "tronco",
          sourceStem: String(sourceFrame.sourceStem || ""),
          markedStem: String(sourceFrame.markedStem || ""),
          targetStem,
          markerLetter: String(targetFrame?.markerLetter || ""),
          deleteMarker: targetFrame?.deleteMarker === true,
          deleteReduplicativeY: targetFrame?.deleteReduplicativeY === true
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-optional-supportive-output-verb-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function validateOptionalSupportiveOutputVerbOperationFrame({
      pers1 = "",
      poseedor = "",
      obj1 = "",
      tronco = "",
      hasOptionalSupportiveI = false,
      optionalSupportiveLetter = "",
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "optional-supportive-output-verb-source-frame" || !operationFrame || operationFrame.kind !== "andrews-optional-supportive-output-verb-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const rebuiltSourceFrame = buildOptionalSupportiveOutputVerbSourceFrame({
        pers1,
        poseedor,
        obj1,
        tronco,
        hasOptionalSupportiveI,
        optionalSupportiveLetter
      });
      const sourceMatches = ["subjectPrefix", "possessorPrefix", "objectPrefix", "sourceStem", "supportiveRequested", "supportiveLetter", "precedingSurface", "markedStem"].every(key => sourceFrame[key] === rebuiltSourceFrame[key]);
      if (!sourceMatches || rebuiltSourceFrame.supported !== true) {
        return null;
      }
      const rebuiltOperationFrame = buildOptionalSupportiveOutputVerbOperationFrame(rebuiltSourceFrame);
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const expectedTargetFrame = rebuiltOperationFrame?.targetFrame || null;
      if (!targetFrame || !expectedTargetFrame) {
        return null;
      }
      const targetMatches = ["targetSlot", "sourceStem", "markedStem", "targetStem", "markerLetter", "deleteMarker", "deleteReduplicativeY"].every(key => targetFrame[key] === expectedTargetFrame[key]);
      return targetMatches ? targetFrame : null;
    }
    function resolveOptionalSupportiveOutputVerb(input = {}) {
      const {
        pers1,
        poseedor,
        obj1,
        tronco,
        hasOptionalSupportiveI = false,
        optionalSupportiveLetter = "",
        optionalSupportiveSourceFrame = null,
        optionalSupportiveOperationFrame = null
      } = normalizeOutputSurfaceSlotInput(input);
      if (!hasOptionalSupportiveI || optionalSupportiveLetter !== "y") {
        return String(tronco || "");
      }
      const validatedTargetFrame = validateOptionalSupportiveOutputVerbOperationFrame({
        pers1,
        poseedor,
        obj1,
        tronco,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        sourceFrame: optionalSupportiveSourceFrame,
        operationFrame: optionalSupportiveOperationFrame
      });
      if (!validatedTargetFrame) {
        return String(tronco || "");
      }
      const markedSurfaceSourceFrame = optionalSupportiveSourceFrame.markedSurfaceSourceFrame;
      const markedSurfaceOperationFrame = optionalSupportiveOperationFrame.markedSurfaceOperationFrame;
      return resolveOptionalSupportiveMarkedSurface({
        precedingSurface: String(optionalSupportiveSourceFrame.precedingSurface || ""),
        markedSurface: String(optionalSupportiveSourceFrame.markedStem || ""),
        inputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
        outputFormat: targetObject.SUPPORTIVE_MARKER_FORMAT.envelope,
        preserveMarkers: false,
        sourceFrame: markedSurfaceSourceFrame,
        operationFrame: markedSurfaceOperationFrame
      }).plainSurface || String(tronco || "");
    }
    function resolveOptionalSupportiveOutputText({
      value = "",
      hasOptionalSupportiveI = false,
      optionalSupportiveLetter = ""
    } = {}) {
      return String(value || "").split(" / ").map(entry => {
        const form = String(entry || "").trim();
        if (!form) {
          return "";
        }
        const optionalSupportiveSourceFrame = buildOptionalSupportiveOutputVerbSourceFrame({
          tronco: form,
          hasOptionalSupportiveI,
          optionalSupportiveLetter
        });
        const optionalSupportiveOperationFrame = buildOptionalSupportiveOutputVerbOperationFrame(optionalSupportiveSourceFrame);
        return resolveOptionalSupportiveOutputVerb({
          tronco: form,
          hasOptionalSupportiveI,
          optionalSupportiveLetter,
          optionalSupportiveSourceFrame,
          optionalSupportiveOperationFrame
        }) || form;
      }).filter(Boolean).join(" / ");
    }
    function buildOutputSurfaceChain(input = {}) {
      const {
        pers1,
        poseedor,
        obj1,
        tronco,
        hasOptionalSupportiveI = false,
        optionalSupportiveLetter = "",
        directionalChainMeta = null,
        surfaceRuleMeta = null
      } = normalizeOutputSurfaceSlotInput(input);
      const realizedDirectionalChain = targetObject.resolveDirectionalOutputChain({
        pers1,
        obj1,
        tronco,
        directionalChainMeta
      });
      const directionalPers1 = String(realizedDirectionalChain.pers1 || "");
      const directionalObj1 = String(realizedDirectionalChain.obj1 || "");
      const directionalTronco = String(realizedDirectionalChain.tronco || "");
      const optionalSupportiveSourceFrame = buildOptionalSupportiveOutputVerbSourceFrame({
        pers1: directionalPers1,
        poseedor,
        obj1: directionalObj1,
        tronco: directionalTronco,
        hasOptionalSupportiveI,
        optionalSupportiveLetter
      });
      const optionalSupportiveOperationFrame = buildOptionalSupportiveOutputVerbOperationFrame(optionalSupportiveSourceFrame);
      const surfaceVerb = resolveOptionalSupportiveOutputVerb({
        pers1: directionalPers1,
        poseedor,
        obj1: directionalObj1,
        tronco: directionalTronco,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        optionalSupportiveSourceFrame,
        optionalSupportiveOperationFrame
      });
      const chain = buildSurfaceChainState({
        pers1: directionalPers1,
        poseedor,
        obj1: directionalObj1,
        tronco: surfaceVerb,
        surfaceRuleMeta
      });
      if (optionalSupportiveOperationFrame?.supported === true) {
        if (!Array.isArray(chain.surfaceOperationFrames)) {
          chain.surfaceOperationFrames = [];
        }
        chain.surfaceOperationFrames.unshift(optionalSupportiveOperationFrame);
      }
      if (Array.isArray(realizedDirectionalChain.soundSpellingFrames)) {
        realizedDirectionalChain.soundSpellingFrames.forEach(frame => {
          if (!frame || typeof frame !== "object") {
            return;
          }
          if (!Array.isArray(chain.soundSpellingFrames)) {
            chain.soundSpellingFrames = [];
          }
          pushUniqueSurfaceSoundSpellingFrame(chain.soundSpellingFrames, frame);
          const segmentRole = normalizeOutputSurfaceRole(frame.segmentRole || frame.grammarSlot || "");
          const segment = Array.isArray(chain.segments) ? chain.segments.find(entry => entry?.role === segmentRole || entry?.slot === frame.grammarSlot) : null;
          if (segment) {
            if (!Array.isArray(segment.soundSpellingFrames)) {
              segment.soundSpellingFrames = [];
            }
            pushUniqueSurfaceSoundSpellingFrame(segment.soundSpellingFrames, frame);
          }
        });
      }
      return chain;
    }
    function buildOutputPrefixedChain(input = {}) {
      return joinSurfaceChain(realizeSurfaceChain(buildOutputSurfaceChain(input)));
    }
    function buildOutputWordSegments(input = {}) {
      const {
        particulaPrepuesta,
        pers1,
        poseedor,
        obj1,
        tronco,
        pers2,
        hasOptionalSupportiveI = false,
        optionalSupportiveLetter = "",
        directionalChainMeta = null,
        surfaceRuleMeta = null
      } = normalizeOutputSurfaceSlotInput(input);
      const realizedCoreChain = realizeSurfaceChain(buildOutputSurfaceChain({
        pers1,
        poseedor,
        obj1,
        tronco,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        directionalChainMeta,
        surfaceRuleMeta
      }));
      const coreSegments = Array.isArray(realizedCoreChain?.segments) ? realizedCoreChain.segments.map(segment => ({
        ...segment,
        value: String(segment?.value || "")
      })) : [];
      const segments = [];
      if (particulaPrepuesta) {
        segments.push({
          role: "particulaPrepuesta",
          slot: "particulaPrepuesta",
          value: String(particulaPrepuesta || "")
        });
      }
      segments.push(...coreSegments);
      if (pers2) {
        segments.push({
          role: "pers2",
          slot: "pers2",
          value: String(pers2 || "")
        });
      }
      const surfaceOperationFrames = normalizeSurfaceChainStructuredFrames(realizedCoreChain?.surfaceOperationFrames);
      if (surfaceOperationFrames.length) {
        Object.defineProperty(segments, "surfaceOperationFrames", {
          configurable: true,
          enumerable: false,
          value: surfaceOperationFrames
        });
      }
      return segments;
    }
    function joinOutputWordSegments(segments = []) {
      return (Array.isArray(segments) ? segments : []).map(segment => String(segment?.value || "")).join("");
    }
    var OUTPUT_SURFACE_ANDREWS_REFS = Object.freeze(["Andrews Lesson 2 2.1 and 2.6", "Andrews Lesson 4 4.4-4.5"]);
    function normalizeOutputSurfaceSegments(segments = []) {
      return (Array.isArray(segments) ? segments : []).map(segment => {
        const soundSpellingFrames = Array.isArray(segment?.soundSpellingFrames) ? segment.soundSpellingFrames.map(frame => ({
          ...frame
        })) : [];
        return {
          role: String(segment?.role || ""),
          slot: String(segment?.slot || ""),
          value: String(segment?.value || ""),
          ...(soundSpellingFrames.length ? {
            soundSpellingFrames
          } : {})
        };
      }).filter(segment => segment.role || segment.slot || segment.value);
    }
    function getOutputSurfaceSegmentValue(segments = [], role = "") {
      const rawRole = String(role || "");
      const normalizedRole = normalizeOutputSurfaceRole(rawRole);
      const match = (Array.isArray(segments) ? segments : []).find(segment => String(segment?.role || "") === normalizedRole || String(segment?.slot || "") === rawRole);
      return String(match?.value || "");
    }
    function buildOutputSurfaceSoundSpellingFrames(segments = []) {
      if (typeof targetObject.buildLesson2SoundSpellingFrame !== "function") {
        return [];
      }
      const frames = [];
      const pushExistingFrame = (frame = null) => {
        pushUniqueSurfaceSoundSpellingFrame(frames, frame);
      };
      const pushFrame = (frameInput = {}) => {
        const frame = targetObject.buildLesson2SoundSpellingFrame(frameInput);
        if (!frame || !frame.ruleId) {
          return;
        }
        pushExistingFrame(frame);
      };
      normalizeOutputSurfaceSegments(segments).forEach(segment => {
        if (Array.isArray(segment.soundSpellingFrames)) {
          segment.soundSpellingFrames.forEach(pushExistingFrame);
        }
        const role = normalizeOutputSurfaceRole(segment.role || segment.slot || "");
        const slot = String(segment.slot || role || "");
        const value = String(segment.value || "");
        if ((role === "pers2" || slot === "pers2" || slot === "num2") && value === "t") {
          pushFrame({
            source: "-h",
            target: "-t",
            slot: "num2",
            syllablePosition: "slot-final"
          });
        }
        if ((role === "sufijoNominal" || slot === "sufijoNominal" || slot === "sufijo-nominal") && value === "t") {
          pushFrame({
            source: "-tl",
            target: "-t",
            slot: "sufijo-nominal",
            syllablePosition: "slot-final"
          });
        }
      });
      return frames;
    }
    function normalizeOutputSurfaceContractSurfaceValue(value = "") {
      const text = String(value || "").trim();
      return text === "—" ? "" : text;
    }
    function splitOutputSurfaceContractSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeOutputSurfaceContractSurfaceValue(entry)).filter(Boolean);
    }
    function getOutputSurfaceResultFrame(record = null, options = {}) {
      const optionFrame = options?.grammarFrame && typeof options.grammarFrame === "object" ? options.grammarFrame : options?.frames && typeof options.frames === "object" ? options.frames : null;
      const recordFrame = record?.grammarFrame && typeof record.grammarFrame === "object" ? record.grammarFrame : record?.frames && typeof record.frames === "object" ? record.frames : null;
      const frame = optionFrame || recordFrame;
      return frame?.resultFrame && typeof frame.resultFrame === "object" ? frame.resultFrame : null;
    }
    function getOutputSurfaceSurfaceForms(record = null, fallbackSurface = "", options = {}) {
      const node = record && typeof record === "object" ? record : {};
      const resultFrame = getOutputSurfaceResultFrame(node, options);
      const hasResultFrame = Boolean(resultFrame);
      const canonicalForms = typeof targetObject.getGrammarResultFrameCanonicalSurfaceForms === "function" ? targetObject.getGrammarResultFrameCanonicalSurfaceForms(resultFrame) : [];
      if (canonicalForms.length) {
        return canonicalForms;
      }
      const candidates = [];
      if (Array.isArray(resultFrame?.surfaceForms)) {
        candidates.push(...resultFrame.surfaceForms);
      }
      if (resultFrame?.surface) {
        candidates.push(resultFrame.surface);
      }
      if (hasResultFrame) {
        return candidates.map(entry => normalizeOutputSurfaceContractSurfaceValue(entry)).filter(entry => entry && !entry.includes("/")).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(node.surfaceForms)) {
        candidates.push(...node.surfaceForms);
      }
      if (!hasResultFrame && node.surface) {
        candidates.push(node.surface);
      }
      if (!hasResultFrame && node.result) {
        candidates.push(node.result);
      }
      if (!hasResultFrame && fallbackSurface) {
        candidates.push(fallbackSurface);
      }
      return candidates.flatMap(entry => splitOutputSurfaceContractSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getOutputSurfacePrimarySurface(record = null, fallbackSurface = "", options = {}) {
      return getOutputSurfaceSurfaceForms(record, fallbackSurface, options)[0] || "";
    }
    function attachOutputSurfaceGrammarContract(record = null, options = {}) {
      if (!record || typeof record !== "object" || typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      const segments = normalizeOutputSurfaceSegments(options.segments || record.segments);
      const surfaceOperationFrames = normalizeSurfaceChainStructuredFrames(options.surfaceOperationFrames || record.surfaceOperationFrames || options.segments?.surfaceOperationFrames || record.segments?.surfaceOperationFrames);
      const fallbackSurface = String(options.surface || joinOutputWordSegments(segments) || "");
      const surfaceForms = getOutputSurfaceSurfaceForms(record, fallbackSurface, options);
      const surface = getOutputSurfacePrimarySurface(record, fallbackSurface, options);
      const optionFrame = options?.grammarFrame && typeof options.grammarFrame === "object" ? options.grammarFrame : options?.frames && typeof options.frames === "object" ? options.frames : null;
      const recordFrame = record?.grammarFrame && typeof record.grammarFrame === "object" ? record.grammarFrame : record?.frames && typeof record.frames === "object" ? record.frames : null;
      const inboundFrame = optionFrame || recordFrame || null;
      const inboundResultFrame = inboundFrame?.resultFrame && typeof inboundFrame.resultFrame === "object" ? inboundFrame.resultFrame : null;
      const sanitizedFrame = inboundResultFrame ? {
        ...inboundFrame,
        resultFrame: {
          ...inboundResultFrame,
          surface,
          surfaceForms
        }
      } : null;
      const sanitizedRecord = sanitizedFrame ? {
        ...record,
        grammarFrame: record.grammarFrame ? sanitizedFrame : record.grammarFrame,
        frames: record.frames ? sanitizedFrame : record.frames,
        surfaceForms
      } : {
        ...record,
        surfaceForms
      };
      const metadataOptions = sanitizedFrame ? {
        ...options,
        grammarFrame: sanitizedFrame
      } : options;
      const supported = options.supported !== undefined ? options.supported === true : Boolean(surface || surfaceForms.length);
      const diagnostics = Array.isArray(options.diagnostics) ? options.diagnostics : [];
      const metadataKind = String(options.metadataKind || "output-surface").trim();
      const routeStage = String(options.routeStage || (supported ? "realize-output-surface" : "blocked")).trim();
      const pers1 = getOutputSurfaceSegmentValue(segments, "pers1");
      const poseedor = getOutputSurfaceSegmentValue(segments, "poseedor");
      const prefijoExternoFuente = getOutputSurfaceSegmentValue(segments, "prefijoExternoFuente");
      const obj1 = getOutputSurfaceSegmentValue(segments, "obj1");
      const tronco = getOutputSurfaceSegmentValue(segments, "tronco");
      const pers2 = getOutputSurfaceSegmentValue(segments, "pers2");
      const sufijoNominal = getOutputSurfaceSegmentValue(segments, "sufijoNominal");
      const soundSpellingFrames = buildOutputSurfaceSoundSpellingFrames(segments);
      return targetObject.attachGrammarMetadataContract(sanitizedRecord, {
        ...metadataOptions,
        enumerable: false,
        metadataKind,
        unitKind: "output-surface",
        routeFamily: "output-surface",
        routeStage,
        generationAllowed: supported,
        supported,
        structuralSource: "Andrews Lesson 2",
        andrewsRefs: OUTPUT_SURFACE_ANDREWS_REFS,
        evidenceStatus: supported ? "surface-realized" : "blocked",
        diagnosticStatus: supported ? "surface-realized" : "blocked",
        surface,
        surfaceForms,
        sourceInput: tronco,
        diagnostics,
        sourceContract: {
          unitKind: "surface-segment-chain",
          segments,
          pers1,
          poseedor,
          obj1,
          tronco,
          pers2,
          prefijoExternoFuente,
          prefijoExternoFuente: prefijoExternoFuente,
          sufijoNominal,
          surfaceOperationFrames
        },
        targetContract: {
          unitKind: "realized-output-surface",
          surface,
          outputKind: metadataKind,
          soundSpellingFrames,
          surfaceOperationFrames
        },
        orthographyFrame: {
          surface,
          surfaceForms,
          segments,
          soundSpellingFrames,
          surfaceOperationFrames,
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: {
          segments,
          segmentRoles: segments.map(segment => segment.role)
        },
        nuclearClauseFrame: {
          surface,
          predicateStem: tronco,
          tronco,
          pers1,
          poseedor,
          obj1,
          pers2,
          prefijoExternoFuente: prefijoExternoFuente,
          sufijoNominal,
          clauseBoundary: "#...#",
          slotOrder: ["pers1", "poseedor", "prefijoExternoFuente", "obj1", "tronco", "pers2", "sufijoNominal"],
          andrewsSlotOrder: ["pers1", "poseedor", "prefijoExternoFuente", "obj1", "tronco", "pers2", "sufijoNominal"]
        },
        participantFrame: {
          pers1Pers2: {
            prefix: pers1,
            suffix: pers2
          },
          obj1: {
            prefix: obj1
          },
          poseedor: {
            prefix: poseedor
          },
          pers1,
          pers2,
          prefijoExternoFuente: prefijoExternoFuente
        },
        inflectionFrame: {
          pers2,
          sufijoNominal
        }
      });
    }
    function buildOutputWordResult(input = {}) {
      const segments = buildOutputWordSegments(input);
      const surface = joinOutputWordSegments(segments);
      return attachOutputSurfaceGrammarContract({
        surface,
        segments
      }, {
        metadataKind: "output-word-surface",
        routeStage: surface ? "realize-output-word" : "blocked",
        supported: Boolean(surface),
        surface,
        segments
      });
    }
    function buildOutputWordText(input = {}) {
      return buildOutputWordResult(input).surface;
    }
    function buildNominalOutputSegments(input = {}) {
      const {
        sufijoNominal
      } = normalizeOutputSurfaceSlotInput(input);
      const segments = buildOutputWordSegments(input);
      if (sufijoNominal) {
        segments.push({
          role: "sufijoNominal",
          slot: "sufijoNominal",
          value: String(sufijoNominal || "")
        });
      }
      return segments;
    }
    function buildNominalOutputText(input = {}) {
      return buildNominalOutputResult(input).surface;
    }
    function buildNominalOutputResult(input = {}) {
      const segments = buildNominalOutputSegments(input);
      const surface = joinOutputWordSegments(segments);
      return attachOutputSurfaceGrammarContract({
        surface,
        segments
      }, {
        metadataKind: "nominal-output-surface",
        routeStage: surface ? "realize-nominal-output" : "blocked",
        supported: Boolean(surface),
        surface,
        segments
      });
    }
    function cloneDerivedMuAlternateForms(alternateForms = []) {
      return (Array.isArray(alternateForms) ? alternateForms : []).map(form => form && typeof form === "object" ? {
        ...form
      } : form);
    }
    function buildDerivedMuStemInteractionSourceFrame({
      obj1 = "",
      tronco = "",
      alternateForms = [],
      enable = false
    } = {}) {
      const objectPrefix = String(obj1 || "");
      const sourceStem = String(tronco || "");
      const alternates = cloneDerivedMuAlternateForms(alternateForms);
      const diagnostics = [];
      if (enable !== true) {
        diagnostics.push("derived-mu-stem-interaction-not-enabled");
      }
      if (!sourceStem) {
        diagnostics.push("missing-source-stem");
      }
      return {
        kind: "derived-mu-stem-interaction-source-frame",
        routeId: "derived-mu-stem-interaction",
        enabled: enable === true,
        sourceObjectSlot: "obj1",
        sourceStemSlot: "tronco",
        objectPrefix,
        sourceStem,
        alternateFormFrames: alternates.map((form, index) => ({
          kind: "derived-mu-stem-interaction-alternate-source-frame",
          index,
          verb: String(form?.verb || ""),
          subjectSuffix: String(form?.subjectSuffix || ""),
          nominalSuffix: String(form?.nominalSuffix || ""),
          source: form && typeof form === "object" ? {
            ...form
          } : form
        })),
        supported: enable === true && Boolean(sourceStem),
        diagnostics,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function getDerivedMuEmbeddedMarkerFromObjectPrefix(objectPrefix = "") {
      const value = String(objectPrefix || "");
      if (value === "ta" || value === "te") {
        return value;
      }
      if (value.startsWith("al") && (value.slice(2) === "ta" || value.slice(2) === "te")) {
        return value.slice(2);
      }
      if (value.startsWith("wal") && (value.slice(3) === "ta" || value.slice(3) === "te")) {
        return value.slice(3);
      }
      return "";
    }
    function getDerivedMuResidualObjectPrefix(objectPrefix = "") {
      const value = String(objectPrefix || "");
      if (value.startsWith("al")) {
        return "al";
      }
      if (value.startsWith("wal")) {
        return "wal";
      }
      return "";
    }
    function realizeDerivedMuAlternateVerbForBranch(verb = "", branch = "", embeddedMarker = "") {
      const sourceVerb = String(verb || "");
      const marker = String(embeddedMarker || "");
      if (branch === "embed-object-marker-in-mu-stem" && marker && sourceVerb.startsWith("mu") && !sourceVerb.startsWith(`mu${marker}`)) {
        return `mu${marker}${sourceVerb.slice(2)}`;
      }
      if (branch === "fronted-embedded-marker-to-mu-stem" && (sourceVerb.startsWith("tamu") || sourceVerb.startsWith("temu"))) {
        return `mu${sourceVerb.slice(0, 2)}${sourceVerb.slice(4)}`;
      }
      return sourceVerb;
    }
    function buildDerivedMuStemInteractionOperationFrame(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "derived-mu-stem-interaction-source-frame") {
        return null;
      }
      const objectPrefix = String(sourceFrame.objectPrefix || "");
      const sourceStem = String(sourceFrame.sourceStem || "");
      let targetObjectPrefix = objectPrefix;
      let targetStem = sourceStem;
      let branch = "";
      let embeddedMarker = "";
      if (sourceStem.startsWith("mu") && objectPrefix.endsWith("mu")) {
        targetObjectPrefix = objectPrefix.slice(0, -2);
        branch = "drop-duplicate-mu-object";
      }
      if (targetObjectPrefix === "mu" && sourceStem.startsWith("mu")) {
        targetObjectPrefix = "";
        branch = "delete-mu-object-before-mu-stem";
      }
      if (sourceStem.startsWith("mu")) {
        embeddedMarker = getDerivedMuEmbeddedMarkerFromObjectPrefix(targetObjectPrefix);
        if (embeddedMarker && !sourceStem.startsWith(`mu${embeddedMarker}`)) {
          targetObjectPrefix = getDerivedMuResidualObjectPrefix(targetObjectPrefix);
          targetStem = `mu${embeddedMarker}${sourceStem.slice(2)}`;
          branch = "embed-object-marker-in-mu-stem";
        }
      } else if (!targetObjectPrefix && (sourceStem.startsWith("tamu") || sourceStem.startsWith("temu"))) {
        embeddedMarker = sourceStem.slice(0, 2);
        targetStem = `mu${embeddedMarker}${sourceStem.slice(4)}`;
        branch = "fronted-embedded-marker-to-mu-stem";
      }
      const targetAlternateFormFrames = (Array.isArray(sourceFrame.alternateFormFrames) ? sourceFrame.alternateFormFrames : []).map(frame => {
        const sourceVerb = String(frame?.verb || "");
        const targetVerb = realizeDerivedMuAlternateVerbForBranch(sourceVerb, branch, embeddedMarker);
        return {
          kind: "derived-mu-stem-interaction-alternate-target-frame",
          index: Number(frame?.index || 0),
          sourceVerb,
          targetVerb,
          subjectSuffix: String(frame?.subjectSuffix || ""),
          nominalSuffix: String(frame?.nominalSuffix || "")
        };
      });
      const changed = targetObjectPrefix !== objectPrefix || targetStem !== sourceStem || targetAlternateFormFrames.some(frame => frame.targetVerb !== frame.sourceVerb);
      const supported = sourceFrame.supported === true && changed;
      return {
        kind: "andrews-derived-mu-stem-interaction-operation-frame",
        operationId: "andrews-derived-mu-stem-interaction",
        sourceFrame: cloneSurfaceChainStructuredFrame(sourceFrame),
        targetFrame: {
          kind: "derived-mu-stem-interaction-target-frame",
          targetObjectSlot: "obj1",
          targetStemSlot: "tronco",
          branch,
          embeddedMarker,
          sourceObjectPrefix: objectPrefix,
          sourceStem,
          targetObjectPrefix,
          targetStem,
          alternateFormFrames: targetAlternateFormFrames
        },
        supported,
        diagnostics: supported ? [] : ["unsupported-derived-mu-stem-interaction-source-frame"],
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
    }
    function validateDerivedMuStemInteractionOperationFrame({
      obj1 = "",
      tronco = "",
      alternateForms = [],
      enable = false,
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "derived-mu-stem-interaction-source-frame" || !operationFrame || operationFrame.kind !== "andrews-derived-mu-stem-interaction-operation-frame" || operationFrame.supported !== true) {
        return null;
      }
      const rebuiltSourceFrame = buildDerivedMuStemInteractionSourceFrame({
        obj1,
        tronco,
        alternateForms,
        enable
      });
      if (sourceFrame.enabled !== rebuiltSourceFrame.enabled || sourceFrame.objectPrefix !== rebuiltSourceFrame.objectPrefix || sourceFrame.sourceStem !== rebuiltSourceFrame.sourceStem || sourceFrame.alternateFormFrames.length !== rebuiltSourceFrame.alternateFormFrames.length) {
        return null;
      }
      const alternateSourcesMatch = sourceFrame.alternateFormFrames.every((frame, index) => frame.verb === rebuiltSourceFrame.alternateFormFrames[index]?.verb && frame.subjectSuffix === rebuiltSourceFrame.alternateFormFrames[index]?.subjectSuffix && frame.nominalSuffix === rebuiltSourceFrame.alternateFormFrames[index]?.nominalSuffix);
      if (!alternateSourcesMatch || rebuiltSourceFrame.supported !== true) {
        return null;
      }
      const rebuiltOperationFrame = buildDerivedMuStemInteractionOperationFrame(rebuiltSourceFrame);
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      const expectedTargetFrame = rebuiltOperationFrame?.targetFrame || null;
      if (!targetFrame || !expectedTargetFrame) {
        return null;
      }
      const targetMatches = ["branch", "embeddedMarker", "sourceObjectPrefix", "sourceStem", "targetObjectPrefix", "targetStem"].every(key => targetFrame[key] === expectedTargetFrame[key]);
      const targetAlternates = Array.isArray(targetFrame.alternateFormFrames) ? targetFrame.alternateFormFrames : [];
      const expectedAlternates = Array.isArray(expectedTargetFrame.alternateFormFrames) ? expectedTargetFrame.alternateFormFrames : [];
      const alternatesMatch = targetAlternates.length === expectedAlternates.length && targetAlternates.every((frame, index) => frame.sourceVerb === expectedAlternates[index]?.sourceVerb && frame.targetVerb === expectedAlternates[index]?.targetVerb && frame.subjectSuffix === expectedAlternates[index]?.subjectSuffix && frame.nominalSuffix === expectedAlternates[index]?.nominalSuffix);
      return targetMatches && alternatesMatch ? targetFrame : null;
    }
    function realizeDerivedMuStemInteraction(input = {}) {
      const {
        obj1,
        tronco,
        alternateForms = [],
        enable = false,
        sourceFrame = null,
        operationFrame = null
      } = normalizeOutputSurfaceSlotInput(input);
      if (!enable) {
        return {
          obj1: String(obj1 || ""),
          tronco: String(tronco || ""),
          alternateForms: Array.isArray(alternateForms) ? alternateForms : []
        };
      }
      const nextAlternateForms = Array.isArray(alternateForms) ? alternateForms : [];
      const targetFrame = validateDerivedMuStemInteractionOperationFrame({
        obj1,
        tronco,
        alternateForms: nextAlternateForms,
        enable,
        sourceFrame,
        operationFrame
      });
      if (!targetFrame) {
        return {
          obj1: String(obj1 || ""),
          tronco: String(tronco || ""),
          alternateForms: nextAlternateForms,
          supported: false,
          diagnostics: [!sourceFrame ? "missing-derived-mu-stem-interaction-source-frame" : "", !operationFrame ? "missing-derived-mu-stem-interaction-operation-frame" : "", sourceFrame && operationFrame ? "invalid-derived-mu-stem-interaction-operation-frame" : ""].filter(Boolean)
        };
      }
      const targetAlternateFrames = Array.isArray(targetFrame.alternateFormFrames) ? targetFrame.alternateFormFrames : [];
      targetAlternateFrames.forEach(targetAlternateFrame => {
        const index = Number(targetAlternateFrame.index);
        if (!Number.isFinite(index) || !nextAlternateForms[index] || typeof nextAlternateForms[index] !== "object") {
          return;
        }
        nextAlternateForms[index].verb = String(targetAlternateFrame.targetVerb || "");
      });
      return {
        obj1: String(targetFrame.targetObjectPrefix || ""),
        tronco: String(targetFrame.targetStem || ""),
        alternateForms: nextAlternateForms,
        operationFrame: cloneSurfaceChainStructuredFrame(operationFrame)
      };
    }

    const api = {};
    Object.defineProperty(api, "C", {
        configurable: true,
        enumerable: true,
        get() { return C; },
        set(value) { C = value; },
    });
    api.ensureC = ensureC;
    Object.defineProperty(api, "_codaReKw", {
        configurable: true,
        enumerable: true,
        get() { return _codaReKw; },
        set(value) { _codaReKw = value; },
    });
    Object.defineProperty(api, "_codaReY", {
        configurable: true,
        enumerable: true,
        get() { return _codaReY; },
        set(value) { _codaReY = value; },
    });
    Object.defineProperty(api, "_codaReM", {
        configurable: true,
        enumerable: true,
        get() { return _codaReM; },
        set(value) { _codaReM = value; },
    });
    api.buildCodaRe = buildCodaRe;
    api.endsWithAny = endsWithAny;
    Object.defineProperty(api, "OUTPUT_SURFACE_ROLES", {
        configurable: true,
        enumerable: true,
        get() { return OUTPUT_SURFACE_ROLES; },
        set(value) { OUTPUT_SURFACE_ROLES = value; },
    });
    api.normalizeOutputSurfaceRole = normalizeOutputSurfaceRole;
    api.normalizeOutputSurfaceSlotInput = normalizeOutputSurfaceSlotInput;
    api.cloneSurfaceChainStructuredFrame = cloneSurfaceChainStructuredFrame;
    api.normalizeSurfaceChainStructuredFrames = normalizeSurfaceChainStructuredFrames;
    api.buildSurfaceChainFinalIAUATrimSourceFrame = buildSurfaceChainFinalIAUATrimSourceFrame;
    api.buildSurfaceChainFinalIAUATrimOperationFrame = buildSurfaceChainFinalIAUATrimOperationFrame;
    api.buildSurfaceChainObjectIInitialElisionSourceFrame = buildSurfaceChainObjectIInitialElisionSourceFrame;
    api.buildSurfaceChainObjectIInitialElisionOperationFrame = buildSurfaceChainObjectIInitialElisionOperationFrame;
    api.buildSurfaceChainMuIskaliaReductionSourceFrame = buildSurfaceChainMuIskaliaReductionSourceFrame;
    api.buildSurfaceChainMuIskaliaReductionOperationFrame = buildSurfaceChainMuIskaliaReductionOperationFrame;
    api.buildSurfaceChainSubjectIInitialReductionSourceFrame = buildSurfaceChainSubjectIInitialReductionSourceFrame;
    api.buildSurfaceChainSubjectIInitialReductionOperationFrame = buildSurfaceChainSubjectIInitialReductionOperationFrame;
    api.buildSurfaceChainOptativeKiReductionSourceFrame = buildSurfaceChainOptativeKiReductionSourceFrame;
    api.buildSurfaceChainOptativeKiReductionOperationFrame = buildSurfaceChainOptativeKiReductionOperationFrame;
    api.buildSurfaceChainKContactSourceFrame = buildSurfaceChainKContactSourceFrame;
    api.buildSurfaceChainKContactOperationFrame = buildSurfaceChainKContactOperationFrame;
    api.getSurfaceChainKwCodaCoalescenceTarget = getSurfaceChainKwCodaCoalescenceTarget;
    api.buildSurfaceChainKwCodaCoalescenceSourceFrame = buildSurfaceChainKwCodaCoalescenceSourceFrame;
    api.buildSurfaceChainKwCodaCoalescenceOperationFrame = buildSurfaceChainKwCodaCoalescenceOperationFrame;
    api.buildSurfaceChainNhBeforeVowelSourceFrame = buildSurfaceChainNhBeforeVowelSourceFrame;
    api.buildSurfaceChainNhBeforeVowelOperationFrame = buildSurfaceChainNhBeforeVowelOperationFrame;
    api.getSurfaceChainYShiftTarget = getSurfaceChainYShiftTarget;
    api.buildSurfaceChainYShiftSourceFrame = buildSurfaceChainYShiftSourceFrame;
    api.buildSurfaceChainYShiftOperationFrame = buildSurfaceChainYShiftOperationFrame;
    api.getSurfaceChainMCodaAssimilationTarget = getSurfaceChainMCodaAssimilationTarget;
    api.buildSurfaceChainMCodaAssimilationSourceFrame = buildSurfaceChainMCodaAssimilationSourceFrame;
    api.buildSurfaceChainMCodaAssimilationOperationFrame = buildSurfaceChainMCodaAssimilationOperationFrame;
    api.buildSurfaceChainOperationFrames = buildSurfaceChainOperationFrames;
    api.getSurfaceChainOperationFrame = getSurfaceChainOperationFrame;
    api.buildSurfaceChainRenderSourceFrame = buildSurfaceChainRenderSourceFrame;
    api.buildSurfaceChainRenderOperationFrame = buildSurfaceChainRenderOperationFrame;
    api.attachSurfaceChainRenderOperationFrame = attachSurfaceChainRenderOperationFrame;
    api.validateSurfaceChainRenderOperationFrame = validateSurfaceChainRenderOperationFrame;
    api.validateSurfaceChainFinalIAUATrimOperationFrame = validateSurfaceChainFinalIAUATrimOperationFrame;
    api.validateSurfaceChainObjectIInitialElisionOperationFrame = validateSurfaceChainObjectIInitialElisionOperationFrame;
    api.validateSurfaceChainMuIskaliaReductionOperationFrame = validateSurfaceChainMuIskaliaReductionOperationFrame;
    api.validateSurfaceChainSubjectIInitialReductionOperationFrame = validateSurfaceChainSubjectIInitialReductionOperationFrame;
    api.validateSurfaceChainOptativeKiReductionOperationFrame = validateSurfaceChainOptativeKiReductionOperationFrame;
    api.validateSurfaceChainKContactOperationFrame = validateSurfaceChainKContactOperationFrame;
    api.validateSurfaceChainKwCodaCoalescenceOperationFrame = validateSurfaceChainKwCodaCoalescenceOperationFrame;
    api.validateSurfaceChainNhBeforeVowelOperationFrame = validateSurfaceChainNhBeforeVowelOperationFrame;
    api.validateSurfaceChainYShiftOperationFrame = validateSurfaceChainYShiftOperationFrame;
    api.validateSurfaceChainMCodaAssimilationOperationFrame = validateSurfaceChainMCodaAssimilationOperationFrame;
    api.buildSurfaceChainState = buildSurfaceChainState;
    api.cloneSurfaceChainState = cloneSurfaceChainState;
    api.getSurfaceSoundSpellingFrameKey = getSurfaceSoundSpellingFrameKey;
    api.pushUniqueSurfaceSoundSpellingFrame = pushUniqueSurfaceSoundSpellingFrame;
    api.appendSurfaceChainLesson2Frame = appendSurfaceChainLesson2Frame;
    api.getSurfaceChainSegmentValue = getSurfaceChainSegmentValue;
    api.setSurfaceChainSegmentValue = setSurfaceChainSegmentValue;
    api.getSurfaceChainNextNonEmptyIndex = getSurfaceChainNextNonEmptyIndex;
    api.realizeSurfaceChainSubjectIInitialReduction = realizeSurfaceChainSubjectIInitialReduction;
    api.realizeSurfaceChainFinalIAUATrim = realizeSurfaceChainFinalIAUATrim;
    api.realizeSurfaceChainOptativeKiReduction = realizeSurfaceChainOptativeKiReduction;
    api.realizeSurfaceChainMuIskaliaReduction = realizeSurfaceChainMuIskaliaReduction;
    api.realizeSurfaceChainObjectIInitialElision = realizeSurfaceChainObjectIInitialElision;
    api.realizeSurfaceChainNhBeforeVowel = realizeSurfaceChainNhBeforeVowel;
    api.realizeSurfaceChainKContact = realizeSurfaceChainKContact;
    api.realizeSurfaceChainKwCoalescence = realizeSurfaceChainKwCoalescence;
    api.realizeSurfaceChainYShift = realizeSurfaceChainYShift;
    api.realizeSurfaceChainMCodaAssimilation = realizeSurfaceChainMCodaAssimilation;
    api.realizeSurfaceChain = realizeSurfaceChain;
    api.joinSurfaceChain = joinSurfaceChain;
    api.buildPrefixedChain = buildPrefixedChain;
    api.isWjAlternationPair = isWjAlternationPair;
    api.getExpectedAbsolutiveSuffix = getExpectedAbsolutiveSuffix;
    api.isAbsolutivePair = isAbsolutivePair;
    api.isPatientivoInPair = isPatientivoInPair;
    api.getNominalMarkerFamilyBases = getNominalMarkerFamilyBases;
    api.resolveNominalMarkerFamily = resolveNominalMarkerFamily;
    api.hasOptionalParentheticalForm = hasOptionalParentheticalForm;
    api.getOptionalParentheticalFormTargets = getOptionalParentheticalFormTargets;
    api.buildOptionalParentheticalFormsSourceFrame = buildOptionalParentheticalFormsSourceFrame;
    api.buildOptionalParentheticalFormsOperationFrame = buildOptionalParentheticalFormsOperationFrame;
    api.validateOptionalParentheticalFormsOperationFrame = validateOptionalParentheticalFormsOperationFrame;
    api.expandOptionalParentheticalForms = expandOptionalParentheticalForms;
    api.formatConjugationDisplay = formatConjugationDisplay;
    api.normalizeSupportiveMarkerValue = normalizeSupportiveMarkerValue;
    api.hasSupportiveMarkerValue = hasSupportiveMarkerValue;
    api.getSupportiveMarkerTokenForLetter = getSupportiveMarkerTokenForLetter;
    api.getSupportiveMarkerLetterFromValue = getSupportiveMarkerLetterFromValue;
    api.replaceSupportiveMarkersWithLetters = replaceSupportiveMarkersWithLetters;
    api.getOptionalSupportiveMarkerForLetter = getOptionalSupportiveMarkerForLetter;
    api.getOptionalSupportiveMarkerLetter = getOptionalSupportiveMarkerLetter;
    api.hasOptionalSupportiveMarker = hasOptionalSupportiveMarker;
    api.replaceOptionalSupportiveMarkersWithLetters = replaceOptionalSupportiveMarkersWithLetters;
    api.stripOptionalSupportiveMarkers = stripOptionalSupportiveMarkers;
    api.getRegexOptionalSupportiveMarkerForLetter = getRegexOptionalSupportiveMarkerForLetter;
    api.getRegexOptionalSupportiveMarkerLetter = getRegexOptionalSupportiveMarkerLetter;
    api.convertEnvelopeSupportiveMarkersToRegexInput = convertEnvelopeSupportiveMarkersToRegexInput;
    api.convertRegexInputSupportiveMarkersToEnvelope = convertRegexInputSupportiveMarkersToEnvelope;
    api.replaceEnvelopeExplicitValenceMarkersWithRegexMarkers = replaceEnvelopeExplicitValenceMarkersWithRegexMarkers;
    api.normalizeSupportiveYContextSurface = normalizeSupportiveYContextSurface;
    api.getSupportiveYFollowingSurfaceLetters = getSupportiveYFollowingSurfaceLetters;
    api.getSupportiveYFollowingVowel = getSupportiveYFollowingVowel;
    api.hasInitialReduplicativeSupportiveYPattern = hasInitialReduplicativeSupportiveYPattern;
    api.dropReduplicativeYAfterVj = dropReduplicativeYAfterVj;
    api.markReduplicativeYAfterVj = markReduplicativeYAfterVj;
    api.markInitialReduplicativeSupportiveYSurface = markInitialReduplicativeSupportiveYSurface;
    api.resolveOptionalSupportiveYBehavior = resolveOptionalSupportiveYBehavior;
    api.normalizeSupportiveMarkedEnvelopeSurface = normalizeSupportiveMarkedEnvelopeSurface;
    api.formatResolvedSupportiveMarkedSurface = formatResolvedSupportiveMarkedSurface;
    api.buildOptionalSupportiveMarkedSurfaceSourceFrame = buildOptionalSupportiveMarkedSurfaceSourceFrame;
    api.buildOptionalSupportiveMarkedSurfaceOperationFrame = buildOptionalSupportiveMarkedSurfaceOperationFrame;
    api.validateOptionalSupportiveMarkedSurfaceOperationFrame = validateOptionalSupportiveMarkedSurfaceOperationFrame;
    api.resolveOptionalSupportiveMarkedSurface = resolveOptionalSupportiveMarkedSurface;
    api.markOptionalSupportiveSurface = markOptionalSupportiveSurface;
    api.buildOptionalSupportiveOutputVerbSourceFrame = buildOptionalSupportiveOutputVerbSourceFrame;
    api.buildOptionalSupportiveOutputVerbOperationFrame = buildOptionalSupportiveOutputVerbOperationFrame;
    api.validateOptionalSupportiveOutputVerbOperationFrame = validateOptionalSupportiveOutputVerbOperationFrame;
    api.resolveOptionalSupportiveOutputVerb = resolveOptionalSupportiveOutputVerb;
    api.resolveOptionalSupportiveOutputText = resolveOptionalSupportiveOutputText;
    api.buildOutputSurfaceChain = buildOutputSurfaceChain;
    api.buildOutputPrefixedChain = buildOutputPrefixedChain;
    api.buildOutputWordSegments = buildOutputWordSegments;
    api.joinOutputWordSegments = joinOutputWordSegments;
    Object.defineProperty(api, "OUTPUT_SURFACE_ANDREWS_REFS", {
        configurable: true,
        enumerable: true,
        get() { return OUTPUT_SURFACE_ANDREWS_REFS; },
        set(value) { OUTPUT_SURFACE_ANDREWS_REFS = value; },
    });
    api.normalizeOutputSurfaceSegments = normalizeOutputSurfaceSegments;
    api.getOutputSurfaceSegmentValue = getOutputSurfaceSegmentValue;
    api.buildOutputSurfaceSoundSpellingFrames = buildOutputSurfaceSoundSpellingFrames;
    api.normalizeOutputSurfaceContractSurfaceValue = normalizeOutputSurfaceContractSurfaceValue;
    api.splitOutputSurfaceContractSurfaceText = splitOutputSurfaceContractSurfaceText;
    api.getOutputSurfaceResultFrame = getOutputSurfaceResultFrame;
    api.getOutputSurfaceSurfaceForms = getOutputSurfaceSurfaceForms;
    api.getOutputSurfacePrimarySurface = getOutputSurfacePrimarySurface;
    api.attachOutputSurfaceGrammarContract = attachOutputSurfaceGrammarContract;
    api.buildOutputWordResult = buildOutputWordResult;
    api.buildOutputWordText = buildOutputWordText;
    api.buildNominalOutputSegments = buildNominalOutputSegments;
    api.buildNominalOutputText = buildNominalOutputText;
    api.buildNominalOutputResult = buildNominalOutputResult;
    api.cloneDerivedMuAlternateForms = cloneDerivedMuAlternateForms;
    api.buildDerivedMuStemInteractionSourceFrame = buildDerivedMuStemInteractionSourceFrame;
    api.getDerivedMuEmbeddedMarkerFromObjectPrefix = getDerivedMuEmbeddedMarkerFromObjectPrefix;
    api.getDerivedMuResidualObjectPrefix = getDerivedMuResidualObjectPrefix;
    api.realizeDerivedMuAlternateVerbForBranch = realizeDerivedMuAlternateVerbForBranch;
    api.buildDerivedMuStemInteractionOperationFrame = buildDerivedMuStemInteractionOperationFrame;
    api.validateDerivedMuStemInteractionOperationFrame = validateDerivedMuStemInteractionOperationFrame;
    api.realizeDerivedMuStemInteraction = realizeDerivedMuStemInteraction;
    return api;
}

export function installOutputSurfaceGlobals(targetObject = globalThis) {
    const api = createOutputSurfaceApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
