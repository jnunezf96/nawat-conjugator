// Canonical modern ESM module.

export function createClassicalNahuatlVncApplicationModule(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION = 1;
    const CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES = Object.freeze(["buildClassicalNahuatlLesson7VerbstemClassFrame", "getClassicalNahuatlLesson20NonactiveStemOptions", "deriveClassicalNahuatlLesson20NonactiveStemRecord", "buildClassicalNahuatlLesson22InherentImpersonalRecord", "buildClassicalNahuatlLesson22TlaImpersonalStemRecord", "buildClassicalNahuatlLessons20To22DerivedVncFrame", "getDefaultGrammarContractRegistry", "assertRegisteredGrammarContract"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES = Object.freeze(["active", "passive", "impersonal", "inherent-impersonal", "tla-impersonal"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS = Object.freeze(["targetStem", "nonactiveStem", "perfectiveNonactiveStem", "impersonalStem", "suffixFamily", "selectionAuthority", "authorizationStatus", "sourceAuthority", "formula", "selectedFormula", "formulaArtifact", "surface", "surfaceArtifact", "result", "nonactiveStemRecord", "inherentImpersonalRecord", "tlaImpersonalStemRecord", "voiceLayerChainFrame", "sourceObjectClusterFrame", "objectClusterFrame", "activeMachineryFrame", "machineryFrame", "selectedMachineryFrame", "resultFrame", "typedVncSlotFrame", "hostileVoiceLayerTarget", "hostileVoiceLayers", "hostileFormulaArtifact", "hostileSurfaceArtifact"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS = Object.freeze(["objectRequests", "voiceLayer2", "voiceLayer3", "voiceLayer2Operation", "voiceLayer3Operation", "voiceLayerOperations", "orderedVoiceOperations", "voiceLayerRouteId"]);
    function normalizeClassicalNahuatlVncApplicationToken(value = "") {
      return String(value == null ? "" : value).trim();
    }
    function normalizeClassicalNahuatlVncApplicationStem(value = "") {
      return normalizeClassicalNahuatlVncApplicationToken(value).replace(/^\((.*)\)$/u, "$1").trim().normalize("NFC");
    }
    function hasClassicalNahuatlVncApplicationValue(value) {
      if (value == null || value === false) {
        return false;
      }
      if (typeof value === "string") {
        return value.trim().length > 0;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === "object") {
        return true;
      }
      return true;
    }
    function getClassicalNahuatlVncApplicationPresentFields(request = {}, fieldNames = []) {
      if (!request || typeof request !== "object") {
        return Object.freeze([]);
      }
      return Object.freeze(fieldNames.filter(field => Object.prototype.hasOwnProperty.call(request, field) && hasClassicalNahuatlVncApplicationValue(request[field])));
    }
    function getClassicalNahuatlVncApplicationRuntimeTarget(explicitTarget = null) {
      if (explicitTarget && typeof explicitTarget === "object") {
        return explicitTarget;
      }
      if (typeof targetObject !== "undefined" && targetObject && typeof targetObject === "object") {
        return targetObject;
      }
      if (typeof globalThis !== "undefined" && globalThis && typeof globalThis === "object") {
        return globalThis;
      }
      return null;
    }
    function getClassicalNahuatlVncApplicationMissingCapabilities(dependencies = {}) {
      return Object.freeze(CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES.filter(capability => typeof dependencies?.[capability] !== "function"));
    }
    function getClassicalNahuatlVncApplicationObjectKind(sourceValence = "", requestedObjectKind = "") {
      const normalizedValence = normalizeClassicalNahuatlVncApplicationToken(sourceValence);
      return {
        "shuntline-reflexive": "shuntline-reflexive",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman",
        "specific-projective": "specific-projective",
        "mainline-reflexive": "mainline-reflexive",
        "human-reciprocal": "mainline-reflexive"
      }[normalizedValence] || normalizeClassicalNahuatlVncApplicationToken(requestedObjectKind) || "specific-projective";
    }
    function getClassicalNahuatlVncApplicationRequestValue(request = {}, key = "") {
      if (Object.prototype.hasOwnProperty.call(request, key)) {
        return request[key];
      }
      if (request.sentenceOptions && typeof request.sentenceOptions === "object" && Object.prototype.hasOwnProperty.call(request.sentenceOptions, key)) {
        return request.sentenceOptions[key];
      }
      return undefined;
    }
    function buildClassicalNahuatlVncApplicationSentenceOptions(request = {}) {
      const getToken = key => normalizeClassicalNahuatlVncApplicationToken(getClassicalNahuatlVncApplicationRequestValue(request, key));
      const outsidePrefixesValue = getClassicalNahuatlVncApplicationRequestValue(request, "outsidePrefixes");
      const outsidePrefixes = Array.isArray(outsidePrefixesValue) ? outsidePrefixesValue.map(normalizeClassicalNahuatlVncApplicationToken).filter(Boolean) : [];
      const sentenceAntecessive = getClassicalNahuatlVncApplicationRequestValue(request, "sentenceAntecessive") === true || getClassicalNahuatlVncApplicationRequestValue(request, "antecessive") === true;
      return Object.freeze({
        directionalPrefix: getToken("directionalPrefix") || getToken("directional") || getToken("directionalLocativePrefix"),
        incorporatedAdverb: getToken("incorporatedAdverb"),
        adverbPosition: getToken("adverbPosition"),
        sentenceType: getToken("sentenceType"),
        negative: getClassicalNahuatlVncApplicationRequestValue(request, "negative") === true,
        questionMode: getToken("questionMode"),
        introductoryParticle: getToken("introductoryParticle"),
        prefaceParticle: getToken("prefaceParticle"),
        lesson9PrefaceParticle: getToken("lesson9PrefaceParticle") || getToken("prefaceParticle"),
        introductoryModifier: getToken("introductoryModifier"),
        lesson9IntroductoryModifier: getToken("lesson9IntroductoryModifier") || getToken("introductoryModifier"),
        admonitiveTranslationReading: getToken("admonitiveTranslationReading"),
        translationReading: getToken("translationReading"),
        requestedTranslationReading: getToken("requestedTranslationReading"),
        admonitiveContrastReading: getToken("admonitiveContrastReading"),
        contrastReading: getToken("contrastReading"),
        requestedContrastReading: getToken("requestedContrastReading"),
        sentenceAntecessive,
        antecessive: sentenceAntecessive,
        requestedNegativePrefix: getToken("requestedNegativePrefix"),
        negativePrefix: getToken("negativePrefix"),
        outsidePrefixes: Object.freeze(outsidePrefixes),
        construction: getToken("construction"),
        lesson11LexicalReading: getToken("lesson11LexicalReading")
      });
    }
    function normalizeClassicalNahuatlVncApplicationRequest(request = {}) {
      const sourceStem = normalizeClassicalNahuatlVncApplicationStem(request.sourceStem || request.stem);
      const sourceValence = normalizeClassicalNahuatlVncApplicationToken(request.sourceValence || request.valence || "intransitive");
      const requestedVoice = normalizeClassicalNahuatlVncApplicationToken(request.requestedVoice || request.vncVoice || request.voice || "active");
      const normalizedRequestedVoice = CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES.includes(requestedVoice) ? requestedVoice : "active";
      const verbClassValue = normalizeClassicalNahuatlVncApplicationToken(request.verbClass || request.perfectiveClass || "B").toUpperCase();
      const verbClass = ["A", "B", "C", "D"].includes(verbClassValue) ? verbClassValue : "B";
      const outputScope = normalizeClassicalNahuatlVncApplicationToken(request.outputScope || request.vncOutputScope || "single") === "paradigm" ? "paradigm" : "single";
      const sentenceOptions = buildClassicalNahuatlVncApplicationSentenceOptions(request);
      return Object.freeze({
        kind: "classical-nahuatl-vnc-application-request",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        sourceStem,
        subject: normalizeClassicalNahuatlVncApplicationToken(request.subject || "3sg"),
        mood: normalizeClassicalNahuatlVncApplicationToken(request.mood || "indicative"),
        tense: normalizeClassicalNahuatlVncApplicationToken(request.tense || "present"),
        verbClass,
        sourceValence,
        objectKind: getClassicalNahuatlVncApplicationObjectKind(sourceValence, request.objectKind),
        objectPerson: normalizeClassicalNahuatlVncApplicationToken(request.objectPerson || request.object || ""),
        silentSpecificObject: request.silentSpecificObject === true,
        requestedVoice,
        voice: normalizedRequestedVoice,
        requestedVoiceRecognized: requestedVoice === normalizedRequestedVoice,
        nonactiveOptionId: normalizeClassicalNahuatlVncApplicationToken(request.nonactiveOptionId || request.selectedNonactiveOptionId || ""),
        outputScope,
        tlaFusion: request.tlaFusion === true,
        incorporatedAdverb: sentenceOptions.incorporatedAdverb,
        adverbPosition: sentenceOptions.adverbPosition,
        sourceEmbedStem: normalizeClassicalNahuatlVncApplicationStem(request.sourceEmbedStem || request.embedStem),
        sourceMatrixStem: normalizeClassicalNahuatlVncApplicationStem(request.sourceMatrixStem || request.matrixStem),
        sentenceOptions,
        callerSuppliedDerivedAuthorityAllowed: false
      });
    }
    function getClassicalNahuatlVncApplicationAllowedVoices({
      sourceStem = "",
      sourceValence = "",
      outputScope = "single",
      nonactiveOptionInventory = null
    } = {}) {
      if (!sourceStem || outputScope === "paradigm") {
        return Object.freeze(["active"]);
      }
      const voices = ["active"];
      const reflexiveSource = ["mainline-reflexive", "shuntline-reflexive", "human-reciprocal"].includes(sourceValence);
      const nonactiveAvailable = nonactiveOptionInventory?.authorizationStatus === "authorized" && Array.isArray(nonactiveOptionInventory.options) && nonactiveOptionInventory.options.length > 0;
      if (nonactiveAvailable && (sourceValence === "specific-projective" || reflexiveSource)) {
        voices.push("passive");
      }
      if (nonactiveAvailable && (["intransitive", "projective-human", "projective-nonhuman"].includes(sourceValence) || reflexiveSource)) {
        voices.push("impersonal");
      }
      if (sourceValence === "intransitive") {
        voices.push("inherent-impersonal", "tla-impersonal");
      }
      return Object.freeze(voices);
    }
    function buildClassicalNahuatlVncApplicationLesson7Options(normalizedRequest = {}) {
      const sentenceOptions = normalizedRequest.sentenceOptions || {};
      const useSourceParts = normalizedRequest.tlaFusion === true || Boolean(normalizedRequest.sourceEmbedStem);
      const effectiveValence = normalizedRequest.tlaFusion === true ? "projective-nonhuman" : normalizedRequest.sourceValence;
      return {
        tenseMode: "verbo",
        subject: normalizedRequest.subject,
        mood: normalizedRequest.mood,
        tense: normalizedRequest.tense,
        verbClass: normalizedRequest.verbClass,
        perfectiveClass: normalizedRequest.verbClass,
        requestedSourceValence: normalizedRequest.sourceValence,
        transitivity: effectiveValence === "intransitive" ? "intransitive" : "transitive",
        valence: effectiveValence,
        objectKind: getClassicalNahuatlVncApplicationObjectKind(effectiveValence, normalizedRequest.objectKind),
        objectPerson: normalizedRequest.objectPerson,
        object: normalizedRequest.objectPerson,
        silentSpecificObject: normalizedRequest.silentSpecificObject,
        tlaFusion: normalizedRequest.tlaFusion,
        incorporatedAdverb: normalizedRequest.incorporatedAdverb,
        adverbPosition: normalizedRequest.adverbPosition,
        directionalPrefix: sentenceOptions.directionalPrefix,
        embedStem: useSourceParts ? normalizedRequest.sourceEmbedStem : "",
        matrixStem: useSourceParts ? normalizedRequest.sourceMatrixStem : "",
        sourceEmbedStem: useSourceParts ? normalizedRequest.sourceEmbedStem : "",
        sourceMatrixStem: useSourceParts ? normalizedRequest.sourceMatrixStem : "",
        sentenceType: sentenceOptions.sentenceType,
        negative: sentenceOptions.negative,
        questionMode: sentenceOptions.questionMode,
        introductoryParticle: sentenceOptions.introductoryParticle,
        prefaceParticle: sentenceOptions.prefaceParticle,
        lesson9PrefaceParticle: sentenceOptions.lesson9PrefaceParticle,
        introductoryModifier: sentenceOptions.introductoryModifier,
        lesson9IntroductoryModifier: sentenceOptions.lesson9IntroductoryModifier,
        admonitiveTranslationReading: sentenceOptions.admonitiveTranslationReading || sentenceOptions.translationReading || sentenceOptions.requestedTranslationReading,
        translationReading: sentenceOptions.translationReading || sentenceOptions.admonitiveTranslationReading || sentenceOptions.requestedTranslationReading,
        requestedTranslationReading: sentenceOptions.requestedTranslationReading || sentenceOptions.admonitiveTranslationReading || sentenceOptions.translationReading,
        admonitiveContrastReading: sentenceOptions.admonitiveContrastReading || sentenceOptions.contrastReading || sentenceOptions.requestedContrastReading,
        contrastReading: sentenceOptions.contrastReading || sentenceOptions.admonitiveContrastReading || sentenceOptions.requestedContrastReading,
        requestedContrastReading: sentenceOptions.requestedContrastReading || sentenceOptions.admonitiveContrastReading || sentenceOptions.contrastReading,
        sentenceAntecessive: sentenceOptions.sentenceAntecessive,
        antecessive: sentenceOptions.antecessive,
        requestedNegativePrefix: sentenceOptions.requestedNegativePrefix || sentenceOptions.negativePrefix,
        negativePrefix: sentenceOptions.negativePrefix || sentenceOptions.requestedNegativePrefix,
        outsidePrefixes: [...(sentenceOptions.outsidePrefixes || [])],
        construction: sentenceOptions.construction,
        lesson11LexicalReading: sentenceOptions.lesson11LexicalReading
      };
    }
    function getClassicalNahuatlVncApplicationFinalTypedFrame(machineryFrame = null) {
      return machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || machineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame || machineryFrame?.finalBoundaryRealizationFrame?.typedSlotFrame || null;
    }
    function isClassicalNahuatlVncApplicationActiveFrameAuthorized(activeMachineryFrame = null) {
      return Boolean(activeMachineryFrame && activeMachineryFrame.proofFrame?.authorizationStatus === "authorized" && getClassicalNahuatlVncApplicationFinalTypedFrame(activeMachineryFrame));
    }
    function getClassicalNahuatlVncApplicationBlockReason(machineryFrame = null, fallback = "") {
      return normalizeClassicalNahuatlVncApplicationToken(machineryFrame?.blockReason || machineryFrame?.proofFrame?.blockReason || machineryFrame?.proofFrame?.conclusion?.blockReason || fallback);
    }
    function buildClassicalNahuatlVncApplicationFrame({
      normalizedRequest,
      controlFrame,
      activeMachineryFrame = null,
      selectedMachineryFrame = null,
      appliedTypedFrames = [],
      missingCapabilities = [],
      rejectedAuthorityFields = [],
      unsupportedIntentFields = [],
      forcedBlockReason = ""
    } = {}) {
      const selectedAuthorizationStatus = normalizeClassicalNahuatlVncApplicationToken(selectedMachineryFrame?.authorizationStatus || selectedMachineryFrame?.proofFrame?.authorizationStatus);
      const authorizationStatus = forcedBlockReason ? "blocked" : selectedAuthorizationStatus === "authorized" ? "authorized" : "blocked";
      const blockReason = authorizationStatus === "authorized" ? "" : forcedBlockReason || getClassicalNahuatlVncApplicationBlockReason(selectedMachineryFrame, "classical-vnc-application-result-not-authorized");
      const finalTypedVncSlotFrame = authorizationStatus === "authorized" ? getClassicalNahuatlVncApplicationFinalTypedFrame(selectedMachineryFrame) : null;
      const formulaRealization = authorizationStatus === "authorized" ? normalizeClassicalNahuatlVncApplicationToken(selectedMachineryFrame?.formulaRealization || selectedMachineryFrame?.proofFrame?.conclusion?.selectedFormula || selectedMachineryFrame?.proofFrame?.conclusion?.authorizedFormula) : "";
      const resultFrame = Object.freeze({
        kind: "classical-nahuatl-vnc-application-result-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus,
        blockReason,
        selectedVoice: controlFrame?.selectedVoice || normalizedRequest?.voice || "active",
        activeMachineryFrame,
        selectedMachineryFrame,
        finalTypedVncSlotFrame,
        formulaRealization,
        appliedTypedFrames: Object.freeze(appliedTypedFrames.filter(Boolean)),
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false
      });
      return Object.freeze({
        kind: "classical-nahuatl-vnc-application-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus,
        blockReason,
        normalizedRequest,
        controlFrame,
        resultFrame,
        requiredCapabilities: CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES,
        missingCapabilities: Object.freeze([...missingCapabilities]),
        rejectedAuthorityFields: Object.freeze([...rejectedAuthorityFields]),
        unsupportedIntentFields: Object.freeze([...unsupportedIntentFields]),
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
    }
    function createClassicalNahuatlVncApplication(dependencies = {}) {
      const dependencySource = dependencies && typeof dependencies === "object" ? dependencies : {};
      const missingCapabilities = getClassicalNahuatlVncApplicationMissingCapabilities(dependencySource);
      const serviceStatus = missingCapabilities.length ? "blocked" : "authorized";
      const validateSharedApplicationFrame = applicationFrame => {
        const registry = dependencySource.getDefaultGrammarContractRegistry();
        dependencySource.assertRegisteredGrammarContract(registry, applicationFrame.normalizedRequest, {
          contractKind: "classical-nahuatl-vnc-application-request",
          version: 1
        });
        dependencySource.assertRegisteredGrammarContract(registry, applicationFrame.controlFrame, {
          contractKind: "classical-nahuatl-vnc-application-control-frame",
          version: 1
        });
        dependencySource.assertRegisteredGrammarContract(registry, applicationFrame.resultFrame, {
          contractKind: "classical-nahuatl-vnc-application-result-frame",
          version: 1
        });
        return dependencySource.assertRegisteredGrammarContract(registry, applicationFrame, {
          contractKind: "classical-nahuatl-vnc-application-frame",
          version: 1
        });
      };
      const evaluate = (request = {}) => {
        const requestObject = request && typeof request === "object" ? request : {};
        const rejectedAuthorityFields = Object.freeze([...getClassicalNahuatlVncApplicationPresentFields(requestObject, CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS), ...getClassicalNahuatlVncApplicationPresentFields(requestObject.sentenceOptions, CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS).map(field => `sentenceOptions.${field}`)]);
        const unsupportedIntentFields = Object.freeze([...getClassicalNahuatlVncApplicationPresentFields(requestObject, CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS), ...getClassicalNahuatlVncApplicationPresentFields(requestObject.sentenceOptions, CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS).map(field => `sentenceOptions.${field}`)]);
        const normalizedBaseRequest = normalizeClassicalNahuatlVncApplicationRequest(requestObject);
        if (missingCapabilities.length) {
          const normalizedRequest = Object.freeze({
            ...normalizedBaseRequest,
            voice: "active"
          });
          const controlFrame = Object.freeze({
            kind: "classical-nahuatl-vnc-application-control-frame",
            version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
            authorizationStatus: "blocked",
            blockReason: "classical-vnc-application-required-capabilities-unavailable",
            requestedVoice: normalizedBaseRequest.requestedVoice,
            selectedVoice: "active",
            allowedVoices: Object.freeze(["active"]),
            requestedVoiceAccepted: normalizedBaseRequest.requestedVoice === "active",
            voiceNormalizationReason: "required-grammar-capabilities-unavailable",
            nonactiveOptionInventory: null,
            nonactiveSelectorRequired: false,
            selectedNonactiveOptionId: ""
          });
          return buildClassicalNahuatlVncApplicationFrame({
            normalizedRequest,
            controlFrame,
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: "classical-vnc-application-required-capabilities-unavailable"
          });
        }
        const nonactiveOptionInventory = dependencySource.getClassicalNahuatlLesson20NonactiveStemOptions(normalizedBaseRequest.sourceStem, {
          verbClass: normalizedBaseRequest.verbClass,
          sourceValence: normalizedBaseRequest.sourceValence
        });
        let allowedVoices = getClassicalNahuatlVncApplicationAllowedVoices({
          sourceStem: normalizedBaseRequest.sourceStem,
          sourceValence: normalizedBaseRequest.sourceValence,
          outputScope: normalizedBaseRequest.outputScope,
          nonactiveOptionInventory
        });
        let selectedVoice = allowedVoices.includes(normalizedBaseRequest.voice) ? normalizedBaseRequest.voice : "active";
        let voiceNormalizationReason = "";
        if (!normalizedBaseRequest.requestedVoiceRecognized) {
          voiceNormalizationReason = "unknown-voice-normalized-to-active";
        } else if (normalizedBaseRequest.outputScope === "paradigm" && normalizedBaseRequest.voice !== "active") {
          voiceNormalizationReason = "full-paradigm-requires-active-voice";
        } else if (!normalizedBaseRequest.sourceStem && normalizedBaseRequest.voice !== "active") {
          voiceNormalizationReason = "source-stem-required-before-derived-voice";
        } else if (selectedVoice !== normalizedBaseRequest.voice) {
          voiceNormalizationReason = "requested-voice-not-authorized-for-source";
        }
        const lesson7Options = buildClassicalNahuatlVncApplicationLesson7Options(normalizedBaseRequest);
        const effectiveValence = normalizedBaseRequest.tlaFusion === true ? "projective-nonhuman" : normalizedBaseRequest.sourceValence;
        const activeMachineryFrame = dependencySource.buildClassicalNahuatlLesson7VerbstemClassFrame(normalizedBaseRequest.sourceStem, lesson7Options);
        const activeAuthorized = isClassicalNahuatlVncApplicationActiveFrameAuthorized(activeMachineryFrame);
        if (!activeAuthorized && selectedVoice !== "active") {
          allowedVoices = Object.freeze(["active"]);
          selectedVoice = "active";
          voiceNormalizationReason = "active-source-analysis-must-authorize-before-derived-voice";
        }
        const normalizedRequest = Object.freeze({
          ...normalizedBaseRequest,
          voice: selectedVoice,
          effectiveSourceValence: effectiveValence
        });
        const controlFrameBase = {
          kind: "classical-nahuatl-vnc-application-control-frame",
          version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
          authorizationStatus: "authorized",
          blockReason: "",
          requestedVoice: normalizedBaseRequest.requestedVoice,
          selectedVoice,
          allowedVoices,
          requestedVoiceAccepted: selectedVoice === normalizedBaseRequest.requestedVoice,
          voiceNormalizationReason,
          nonactiveOptionInventory,
          nonactiveSelectorRequired: (selectedVoice === "passive" || selectedVoice === "impersonal") && nonactiveOptionInventory?.selectorRequired === true,
          selectedNonactiveOptionId: ""
        };
        if (unsupportedIntentFields.length) {
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: "classical-vnc-application-intent-outside-single-object-voice-scope"
          });
          return validateSharedApplicationFrame(buildClassicalNahuatlVncApplicationFrame({
            normalizedRequest,
            controlFrame,
            activeMachineryFrame,
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: "classical-vnc-application-intent-outside-single-object-voice-scope"
          }));
        }
        let selectedMachineryFrame = activeMachineryFrame;
        let nonactiveStemRecord = null;
        let inherentImpersonalRecord = null;
        let tlaImpersonalStemRecord = null;
        if (activeAuthorized && (selectedVoice === "passive" || selectedVoice === "impersonal")) {
          nonactiveStemRecord = dependencySource.deriveClassicalNahuatlLesson20NonactiveStemRecord(normalizedRequest.sourceStem, {
            verbClass: normalizedRequest.verbClass,
            sourceValence: effectiveValence,
            optionId: normalizedRequest.nonactiveOptionId
          });
        }
        if (activeAuthorized && selectedVoice === "inherent-impersonal") {
          inherentImpersonalRecord = dependencySource.buildClassicalNahuatlLesson22InherentImpersonalRecord(normalizedRequest.sourceStem, {
            selectionAuthority: "andrews-lesson22-voice-selection"
          });
        }
        if (activeAuthorized && selectedVoice === "tla-impersonal") {
          const derivedTlaStem = normalizedRequest.sourceStem ? `tla-${normalizedRequest.sourceStem.replace(/^tla-/u, "")}` : "";
          tlaImpersonalStemRecord = dependencySource.buildClassicalNahuatlLesson22TlaImpersonalStemRecord(normalizedRequest.sourceStem, {
            impersonalStem: derivedTlaStem,
            selectionAuthority: "andrews-lesson22-rule-derivation"
          });
        }
        if (activeAuthorized && selectedVoice !== "active") {
          selectedMachineryFrame = dependencySource.buildClassicalNahuatlLessons20To22DerivedVncFrame(activeMachineryFrame, {
            voice: selectedVoice,
            nonactiveStemRecord,
            inherentImpersonalRecord,
            tlaImpersonalStemRecord,
            sourceValence: effectiveValence,
            sourceSubject: normalizedRequest.subject,
            sourceObjectPerson: normalizedRequest.objectPerson,
            mood: normalizedRequest.mood,
            tense: normalizedRequest.tense,
            verbClass: normalizedRequest.verbClass,
            sentenceOptions: lesson7Options
          });
        }
        const controlFrame = Object.freeze({
          ...controlFrameBase,
          selectedNonactiveOptionId: nonactiveStemRecord?.selectedOptionId || ""
        });
        return validateSharedApplicationFrame(buildClassicalNahuatlVncApplicationFrame({
          normalizedRequest,
          controlFrame,
          activeMachineryFrame,
          selectedMachineryFrame,
          appliedTypedFrames: [nonactiveStemRecord, inherentImpersonalRecord, tlaImpersonalStemRecord, selectedMachineryFrame?.voiceTransformationFrame],
          missingCapabilities,
          rejectedAuthorityFields,
          unsupportedIntentFields
        }));
      };
      const service = Object.freeze({
        kind: "classical-nahuatl-vnc-application-service",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: serviceStatus,
        blockReason: missingCapabilities.length ? "classical-vnc-application-required-capabilities-unavailable" : "",
        requiredCapabilities: CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES,
        missingCapabilities,
        evaluate
      });
      if (missingCapabilities.length) {
        return service;
      }
      return dependencySource.assertRegisteredGrammarContract(dependencySource.getDefaultGrammarContractRegistry(), service, {
        contractKind: "classical-nahuatl-vnc-application-service",
        version: 1
      });
    }
    function evaluateClassicalNahuatlVncApplication(request = {}, dependencies = null) {
      const dependencySource = dependencies && typeof dependencies === "object" ? dependencies : getClassicalNahuatlVncApplicationRuntimeTarget();
      return createClassicalNahuatlVncApplication(dependencySource || {}).evaluate(request);
    }
    function installClassicalNahuatlVncApplicationClassicGlobals(explicitTarget = null) {
      const globalTarget = getClassicalNahuatlVncApplicationRuntimeTarget(explicitTarget);
      if (!globalTarget) {
        return null;
      }
      const service = createClassicalNahuatlVncApplication(globalTarget);
      Object.assign(globalTarget, {
        createClassicalNahuatlVncApplication,
        evaluateClassicalNahuatlVncApplication: service.evaluate,
        getClassicalNahuatlVncApplicationAllowedVoices,
        normalizeClassicalNahuatlVncApplicationRequest,
        classicalNahuatlVncApplication: service
      });
      return globalTarget;
    }
    if (typeof targetObject.module !== "undefined" && targetObject.module.exports) {
      targetObject.module.exports = {
        CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES,
        CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES,
        CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS,
        normalizeClassicalNahuatlVncApplicationRequest,
        getClassicalNahuatlVncApplicationAllowedVoices,
        getClassicalNahuatlVncApplicationMissingCapabilities,
        createClassicalNahuatlVncApplication,
        evaluateClassicalNahuatlVncApplication,
        installClassicalNahuatlVncApplicationClassicGlobals
      };
    }
    if (typeof targetObject.window !== "undefined") {
      installClassicalNahuatlVncApplicationClassicGlobals();
    }

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS; },
    });
    api.normalizeClassicalNahuatlVncApplicationToken = normalizeClassicalNahuatlVncApplicationToken;
    api.normalizeClassicalNahuatlVncApplicationStem = normalizeClassicalNahuatlVncApplicationStem;
    api.hasClassicalNahuatlVncApplicationValue = hasClassicalNahuatlVncApplicationValue;
    api.getClassicalNahuatlVncApplicationPresentFields = getClassicalNahuatlVncApplicationPresentFields;
    api.getClassicalNahuatlVncApplicationRuntimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget;
    api.getClassicalNahuatlVncApplicationMissingCapabilities = getClassicalNahuatlVncApplicationMissingCapabilities;
    api.getClassicalNahuatlVncApplicationObjectKind = getClassicalNahuatlVncApplicationObjectKind;
    api.getClassicalNahuatlVncApplicationRequestValue = getClassicalNahuatlVncApplicationRequestValue;
    api.buildClassicalNahuatlVncApplicationSentenceOptions = buildClassicalNahuatlVncApplicationSentenceOptions;
    api.normalizeClassicalNahuatlVncApplicationRequest = normalizeClassicalNahuatlVncApplicationRequest;
    api.getClassicalNahuatlVncApplicationAllowedVoices = getClassicalNahuatlVncApplicationAllowedVoices;
    api.buildClassicalNahuatlVncApplicationLesson7Options = buildClassicalNahuatlVncApplicationLesson7Options;
    api.getClassicalNahuatlVncApplicationFinalTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame;
    api.isClassicalNahuatlVncApplicationActiveFrameAuthorized = isClassicalNahuatlVncApplicationActiveFrameAuthorized;
    api.getClassicalNahuatlVncApplicationBlockReason = getClassicalNahuatlVncApplicationBlockReason;
    api.buildClassicalNahuatlVncApplicationFrame = buildClassicalNahuatlVncApplicationFrame;
    api.createClassicalNahuatlVncApplication = createClassicalNahuatlVncApplication;
    api.evaluateClassicalNahuatlVncApplication = evaluateClassicalNahuatlVncApplication;
    api.installClassicalNahuatlVncApplicationClassicGlobals = installClassicalNahuatlVncApplicationClassicGlobals;
    return api;
}

export function installClassicalNahuatlVncApplicationGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlVncApplicationModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
