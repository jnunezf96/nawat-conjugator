// Canonical modern ESM module.

export function createClassicalNahuatlVncApplicationModule(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION = 1;
    const CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES = Object.freeze(["buildClassicalNahuatlLesson7VerbstemClassFrame", "buildClassicalNahuatlLesson23MultipleObjectVncFrame", "getClassicalNahuatlLesson20NonactiveStemOptions", "deriveClassicalNahuatlLesson20NonactiveStemRecord", "buildClassicalNahuatlLesson22InherentImpersonalRecord", "buildClassicalNahuatlLesson22TlaImpersonalStemRecord", "buildClassicalNahuatlLessons20To22DerivedVncFrame", "isClassicalNahuatlVncDerivationSourceMachineryFrame", "buildClassicalNahuatlVncDerivationSourceAnalysisFrame", "isClassicalNahuatlVncDerivationSourceAnalysisFrame", "getClassicalNahuatlVncDerivationOptionInventory", "isClassicalNahuatlVncDerivationOptionInventory", "deriveClassicalNahuatlVncDerivationOperationBatchFrame", "isClassicalNahuatlVncDerivationOperationBatchFrame", "deriveClassicalNahuatlVncDerivationOperationFrame", "isClassicalNahuatlVncDerivationOperationFrame", "isClassicalNahuatlCanvasDerivationChoiceFrame", "buildClassicalNahuatlDerivedVncMachineryFrame", "isClassicalNahuatlDerivedVncMachineryFrame", "buildClassicalNahuatlVncFiniteSurfaceFrame", "isClassicalNahuatlVncFiniteSurfaceFrame", "isClassicalNahuatlVncSlotFrame", "renderClassicalNahuatlVncSlotFrameFormula", "getDefaultGrammarContractRegistry", "assertRegisteredGrammarContract"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES = Object.freeze(["active", "passive", "impersonal", "inherent-impersonal", "tla-impersonal"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES = Object.freeze(["active", "passive", "impersonal"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS = Object.freeze(["direct", "causative", "applicative"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_REFERENT_RELATIONS = Object.freeze(["distinct", "coreferential"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_SPECIFIC_SHUNTLINE_REALIZATIONS = Object.freeze(["silent", "sounded"]);
    let classicalNahuatlVncApplicationValidationTransaction = null;
    const classicalNahuatlVncApplicationBuiltResultFrames = new WeakSet();
    const classicalNahuatlVncApplicationBuiltFrames = new WeakSet();
    const classicalNahuatlVncApplicationPersistentCanonicalResultFrames = new WeakSet();
    const classicalNahuatlVncApplicationPersistentCanonicalFrames = new WeakSet();
    function deepFreezeClassicalNahuatlVncApplicationValue(value, seen = new WeakSet()) {
      if (!value || typeof value !== "object" || seen.has(value)) {
        return value;
      }
      seen.add(value);
      Object.values(value).forEach(entry => deepFreezeClassicalNahuatlVncApplicationValue(entry, seen));
      return Object.freeze(value);
    }
    function finalizeBuiltClassicalNahuatlVncApplicationFrame(frame = null) {
      if (!frame || typeof frame !== "object") {
        return frame;
      }
      deepFreezeClassicalNahuatlVncApplicationValue(frame);
      if (frame.resultFrame && typeof frame.resultFrame === "object") {
        classicalNahuatlVncApplicationBuiltResultFrames.add(frame.resultFrame);
      }
      classicalNahuatlVncApplicationBuiltFrames.add(frame);
      return frame;
    }
    function createClassicalNahuatlVncApplicationValidationTransaction() {
      return {
        resultFrames: new WeakSet(),
        applicationFrames: new WeakSet(),
        activeMachineryFrames: new WeakSet(),
        sourceMachineryFrames: new WeakSet(),
        sourceAnalysisFrames: new WeakSet(),
        derivationInventories: new WeakSet(),
        derivationOperationFrames: new WeakSet()
      };
    }
    function runClassicalNahuatlVncApplicationValidationTransaction(callback) {
      if (classicalNahuatlVncApplicationValidationTransaction) {
        return callback();
      }
      classicalNahuatlVncApplicationValidationTransaction = createClassicalNahuatlVncApplicationValidationTransaction();
      try {
        return callback();
      } finally {
        classicalNahuatlVncApplicationValidationTransaction = null;
      }
    }
    const CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS = Object.freeze(["targetStem", "derivedStem", "derivedClass", "nonactiveStem", "perfectiveNonactiveStem", "impersonalStem", "suffixFamily", "selectionAuthority", "authorizationStatus", "sourceAuthority", "formula", "selectedFormula", "formulaArtifact", "surface", "surfaceArtifact", "result", "nonactiveStemRecord", "inherentImpersonalRecord", "tlaImpersonalStemRecord", "sourceVoiceMachineryFrame", "formationSourceMachineryFrame", "sourceMachineryFrame", "sourceAnalysisFrame", "derivationOptionInventory", "derivationOption", "derivedStemOption", "derivationOperationFrame", "participantTransformFrame", "reverseSourceAnalyses", "derivedMachineryFrame", "voiceLayerChainFrame", "sourceObjectClusterFrame", "objectClusterFrame", "activeMachineryFrame", "machineryFrame", "selectedMachineryFrame", "resultFrame", "typedVncSlotFrame", "derivationExplanationProjection", "derivationExplanationFrame", "hostileVoiceLayerTarget", "hostileVoiceLayers", "hostileFormulaArtifact", "hostileSurfaceArtifact"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS = Object.freeze(["voiceLayer2", "voiceLayer3", "voiceLayer2Operation", "voiceLayer3Operation", "voiceLayerOperations", "orderedVoiceOperations", "voiceLayerRouteId"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATION_REFERENCE_DIMENSIONS = Object.freeze(["formation alternatives", "active / passive / impersonal source", "one / two / three objects", "mainline / shuntline / silent", "coreference", "source ambiguity", "supplemented silent object", "mood / sentence force"]);
    function normalizeClassicalNahuatlVncApplicationToken(value = "") {
      return String(value == null ? "" : value).trim();
    }
    function normalizeClassicalNahuatlVncApplicationStem(value = "") {
      return normalizeClassicalNahuatlVncApplicationToken(value).replace(/^\((.*)\)$/u, "$1").trim().normalize("NFC");
    }
    function getClassicalNahuatlVncApplicationCausativeParticipantChoiceControls(operationFrame = null, normalizedRequest = {}) {
      const participantTransformFrame = operationFrame?.participantTransformFrame || null;
      const causativeObjectKindChoiceEligible = false;
      const causativeSpecificShuntlineChoiceEligible = participantTransformFrame?.causativeSpecificShuntlineChoiceEligible === true;
      const selectedCausativeObjectKind = participantTransformFrame?.causativeObjectKind || "";
      const causativeReferentRelationChoiceEligible = participantTransformFrame?.causativeReferentRelationChoiceEligible === true;
      const selectedCausativeReferentRelation = causativeReferentRelationChoiceEligible
        && CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_REFERENT_RELATIONS.includes(normalizedRequest.causativeReferentRelation)
        ? normalizedRequest.causativeReferentRelation
        : "";
      const selectedCausativeSpecificShuntlineRealization = causativeSpecificShuntlineChoiceEligible
        && CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_SPECIFIC_SHUNTLINE_REALIZATIONS.includes(normalizedRequest.causativeSpecificShuntlineRealization)
        ? normalizedRequest.causativeSpecificShuntlineRealization
        : "";
      return Object.freeze({
        causativeObjectKindChoiceEligible,
        allowedCausativeObjectKinds: Object.freeze([]),
        causativeObjectKindSelectionRequired: false,
        selectedCausativeObjectKind,
        causativeReferentRelationChoiceEligible,
        allowedCausativeReferentRelations: causativeReferentRelationChoiceEligible ? CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_REFERENT_RELATIONS : Object.freeze([]),
        causativeReferentRelationSelectionRequired: causativeReferentRelationChoiceEligible,
        selectedCausativeReferentRelation,
        causativeSpecificShuntlineChoiceEligible,
        allowedCausativeSpecificShuntlineRealizations: causativeSpecificShuntlineChoiceEligible ? CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_SPECIFIC_SHUNTLINE_REALIZATIONS : Object.freeze([]),
        causativeSpecificShuntlineSelectionRequired: false,
        selectedCausativeSpecificShuntlineRealization
      });
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
    function normalizeClassicalNahuatlVncApplicationDerivation(value = "direct") {
      const normalized = normalizeClassicalNahuatlVncApplicationToken(value || "direct").toLowerCase();
      return CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS.includes(normalized) ? normalized : "direct";
    }
    function normalizeClassicalNahuatlVncApplicationObjectRequest(request = {}, index = 0) {
      const objectKind = normalizeClassicalNahuatlVncApplicationToken(request?.objectKind);
      const objectPerson = normalizeClassicalNahuatlVncApplicationToken(request?.objectPerson || request?.object);
      const governor = normalizeClassicalNahuatlVncApplicationToken(request?.governor || "directive");
      const derivationalLevel = Number(request?.derivationalLevel || index + 1);
      return Object.freeze({
        objectId: normalizeClassicalNahuatlVncApplicationToken(request?.objectId || `source-object-${index + 1}`),
        objectKind,
        objectPerson,
        governor,
        derivationalLevel
      });
    }
    function getClassicalNahuatlVncApplicationSourceObjectRequests(request = {}, sourceValence = "") {
      const supplied = Array.isArray(request.sourceObjectRequests) ? request.sourceObjectRequests : Array.isArray(request.objectRequests) ? request.objectRequests : null;
      if (supplied) {
        return Object.freeze(supplied.map(normalizeClassicalNahuatlVncApplicationObjectRequest));
      }
      const normalizedValence = normalizeClassicalNahuatlVncApplicationToken(sourceValence);
      if (!normalizedValence || normalizedValence === "intransitive") {
        return Object.freeze([]);
      }
      const objectKind = getClassicalNahuatlVncApplicationObjectKind(normalizedValence, request.objectKind);
      return Object.freeze([normalizeClassicalNahuatlVncApplicationObjectRequest({
        objectId: "source-object-1",
        objectKind: objectKind === "mainline-reflexive" || objectKind === "shuntline-reflexive" ? "reflexive" : objectKind,
        objectPerson: request.objectPerson || request.object || "",
        governor: "directive",
        derivationalLevel: 1
      })]);
    }
    function getClassicalNahuatlVncApplicationValenceForObject(objectKind = "") {
      return {
        reflexive: "mainline-reflexive",
        "nonspecific-human": "projective-human",
        "nonspecific-nonhuman": "projective-nonhuman",
        "specific-projective": "specific-projective"
      }[normalizeClassicalNahuatlVncApplicationToken(objectKind)] || "specific-projective";
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
      const requestedDerivation = normalizeClassicalNahuatlVncApplicationToken(request.requestedDerivation || request.derivationType || request.derivation || "direct").toLowerCase();
      const derivationType = normalizeClassicalNahuatlVncApplicationDerivation(requestedDerivation);
      const requestedVoice = normalizeClassicalNahuatlVncApplicationToken(request.requestedVoice || request.vncVoice || request.voice || "active");
      const normalizedRequestedVoice = CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES.includes(requestedVoice) ? requestedVoice : "active";
      const requestedSourceVoice = normalizeClassicalNahuatlVncApplicationToken(request.requestedSourceVoice || request.sourceVoice || "active").toLowerCase();
      const sourceVoice = CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES.includes(requestedSourceVoice) ? requestedSourceVoice : "active";
      const verbClassValue = normalizeClassicalNahuatlVncApplicationToken(request.verbClass || request.perfectiveClass || "B").toUpperCase();
      const verbClass = ["A", "B", "C", "D"].includes(verbClassValue) ? verbClassValue : "B";
      const outputScope = normalizeClassicalNahuatlVncApplicationToken(request.outputScope || request.vncOutputScope || "single") === "paradigm" ? "paradigm" : "single";
      const sentenceOptions = buildClassicalNahuatlVncApplicationSentenceOptions(request);
      const sourceObjectRequests = getClassicalNahuatlVncApplicationSourceObjectRequests(request, sourceValence);
      const applicativeObjectKindValue = normalizeClassicalNahuatlVncApplicationToken(request.applicativeObjectKind || request.addedObjectKind || "specific-projective");
      const applicativeObjectKind = ["specific-projective", "reflexive", "nonspecific-human", "nonspecific-nonhuman"].includes(applicativeObjectKindValue) ? applicativeObjectKindValue : "specific-projective";
      const causativeReferentRelationValue = normalizeClassicalNahuatlVncApplicationToken(request.causativeReferentRelation);
      const causativeReferentRelation = CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_REFERENT_RELATIONS.includes(causativeReferentRelationValue) ? causativeReferentRelationValue : "";
      const causativeObjectKind = "";
      const causativeSpecificShuntlineRealizationValue = normalizeClassicalNahuatlVncApplicationToken(request.causativeSpecificShuntlineRealization);
      const causativeSpecificShuntlineRealization = CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_SPECIFIC_SHUNTLINE_REALIZATIONS.includes(causativeSpecificShuntlineRealizationValue) ? causativeSpecificShuntlineRealizationValue : "";
      return Object.freeze({
        kind: "classical-nahuatl-vnc-application-request",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        sourceStem,
        subject: normalizeClassicalNahuatlVncApplicationToken(request.subject || "3sg"),
        sourceSubject: normalizeClassicalNahuatlVncApplicationToken(request.sourceSubject || request.embeddedSubject || request.subject || "3sg"),
        mood: normalizeClassicalNahuatlVncApplicationToken(request.mood || "indicative"),
        tense: normalizeClassicalNahuatlVncApplicationToken(request.tense || "present"),
        verbClass,
        sourceValence,
        objectKind: getClassicalNahuatlVncApplicationObjectKind(sourceValence, request.objectKind),
        objectPerson: sourceObjectRequests.length
          ? normalizeClassicalNahuatlVncApplicationToken(request.objectPerson || request.object || "")
          : "",
        sourceObjectRequests,
        requestedDerivation,
        derivationType,
        requestedDerivationRecognized: requestedDerivation === derivationType,
        derivationOptionId: normalizeClassicalNahuatlVncApplicationToken(request.derivationOptionId || request.selectedDerivationOptionId || ""),
        causativeReferentRelation,
        causativeObjectKind,
        causativeSpecificShuntlineRealization,
        applicativeObjectKind,
        applicativeObjectPerson: normalizeClassicalNahuatlVncApplicationToken(request.applicativeObjectPerson || request.addedObjectPerson || ""),
        silentSpecificObject: request.silentSpecificObject === true,
        requestedSourceVoice,
        sourceVoice,
        requestedSourceVoiceRecognized: requestedSourceVoice === sourceVoice,
        sourceNonactiveOptionId: normalizeClassicalNahuatlVncApplicationToken(request.sourceNonactiveOptionId || request.selectedSourceNonactiveOptionId || ""),
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
    function buildClassicalNahuatlVncApplicationDerivationOperationRequest(normalizedRequest = {}) {
      const derivationType = normalizeClassicalNahuatlVncApplicationDerivation(normalizedRequest.derivationType);
      const request = {
        derivationType,
        optionId: normalizedRequest.derivationOptionId,
        targetSubject: normalizedRequest.subject
      };
      if (derivationType === "causative") {
        const causativeReferentRelationChoiceEligible = normalizedRequest.sourceVoice === "active"
          && normalizedRequest.subject === normalizedRequest.sourceSubject
          && !["1sg", "2sg"].includes(normalizedRequest.subject);
        if (causativeReferentRelationChoiceEligible && normalizedRequest.causativeReferentRelation) {
          request.causativeReferentRelation = normalizedRequest.causativeReferentRelation;
        }
        if (normalizedRequest.causativeSpecificShuntlineRealization) {
          request.causativeSpecificShuntlineRealization = normalizedRequest.causativeSpecificShuntlineRealization;
        }
      } else if (derivationType === "applicative") {
        request.applicativeObjectKind = normalizedRequest.applicativeObjectKind;
        request.applicativeObjectPerson = normalizedRequest.applicativeObjectPerson;
      }
      return request;
    }
    function deriveClassicalNahuatlVncApplicationOperationFromCanonicalInventory(dependencySource = {}, sourceMachineryFrame = null, derivationOptionInventory = null, operationRequest = {}) {
      const requestedOptionId = normalizeClassicalNahuatlVncApplicationToken(operationRequest.optionId || operationRequest.derivationOptionId);
      const selectedOptionId = requestedOptionId || derivationOptionInventory?.automaticOptionId || "";
      const selectedOption = derivationOptionInventory?.options?.find(option => option.optionId === selectedOptionId || option.optionAliases?.includes(selectedOptionId)) || null;
      const canvasChoice = selectedOption?.canvasDerivationChoiceFrame || null;
      if (canvasChoice) {
        if (typeof dependencySource.deriveClassicalNahuatlVncDerivationOperationBatchFrame !== "function"
          || typeof dependencySource.isClassicalNahuatlVncDerivationOperationBatchFrame !== "function") {
          return null;
        }
        const batchFrame = dependencySource.deriveClassicalNahuatlVncDerivationOperationBatchFrame(
          sourceMachineryFrame,
          derivationOptionInventory,
          [operationRequest]
        );
        if (!dependencySource.isClassicalNahuatlVncDerivationOperationBatchFrame(batchFrame)) {
          return null;
        }
        const operationFrame = batchFrame.operationFrames[0] || null;
        return operationFrame?.selectedCanvasDerivationChoiceFrame === canvasChoice
          && operationFrame?.selectedChoiceSignature === canvasChoice.canonicalSignature
          ? operationFrame
          : null;
      }
      return dependencySource.deriveClassicalNahuatlVncDerivationOperationFrame(sourceMachineryFrame, operationRequest);
    }
    function getClassicalNahuatlVncApplicationAllowedVoices({
      sourceStem = "",
      sourceValence = "",
      outputScope = "single",
      nonactiveOptionInventory = null,
      objectRequests = []
    } = {}) {
      if (!sourceStem || outputScope === "paradigm") {
        return Object.freeze(["active"]);
      }
      const voices = ["active"];
      const nonactiveAvailable = nonactiveOptionInventory?.authorizationStatus === "authorized" && Array.isArray(nonactiveOptionInventory.options) && nonactiveOptionInventory.options.length > 0;
      const normalizedObjectRequests = Array.isArray(objectRequests) ? objectRequests : [];
      if (normalizedObjectRequests.length > 1) {
        const hasSpecific = normalizedObjectRequests.some(request => request?.objectKind === "specific-projective");
        if (nonactiveAvailable && hasSpecific) {
          voices.push("passive");
        }
        if (nonactiveAvailable && !hasSpecific) {
          voices.push("impersonal");
        }
        return Object.freeze(voices);
      }
      const reflexiveSource = ["mainline-reflexive", "shuntline-reflexive", "human-reciprocal"].includes(sourceValence);
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
    function buildClassicalNahuatlVncApplicationSourceMachinery(dependencySource = {}, normalizedRequest = {}) {
      const sourceObjectRequests = Array.isArray(normalizedRequest.sourceObjectRequests) ? normalizedRequest.sourceObjectRequests : [];
      const sourceSubject = normalizedRequest.derivationType === "causative" ? normalizedRequest.sourceSubject : normalizedRequest.subject;
      const firstSourceObject = sourceObjectRequests[0] || null;
      const sourceValence = sourceObjectRequests.length > 1
        ? getClassicalNahuatlVncApplicationValenceForObject(firstSourceObject.objectKind)
        : normalizedRequest.sourceValence;
      const requiresMultipleObjectBase = sourceObjectRequests.length > 1;
      const sourceRequest = normalizedRequest.derivationType === "direct" && !requiresMultipleObjectBase ? normalizedRequest : Object.freeze({
          ...normalizedRequest,
          subject: sourceSubject,
          sourceValence,
          objectKind: firstSourceObject?.objectKind || normalizedRequest.objectKind || "none",
          objectPerson: firstSourceObject?.objectPerson || normalizedRequest.objectPerson || "",
          tlaFusion: normalizedRequest.derivationType === "direct" ? normalizedRequest.tlaFusion === true : false
        });
      const sourceOptions = buildClassicalNahuatlVncApplicationLesson7Options(sourceRequest);
      let sourceMachineryFrame = dependencySource.buildClassicalNahuatlLesson7VerbstemClassFrame(normalizedRequest.sourceStem, sourceOptions);
      if (sourceObjectRequests.length > 1 && isClassicalNahuatlVncApplicationActiveFrameAuthorized(sourceMachineryFrame)) {
        sourceMachineryFrame = dependencySource.buildClassicalNahuatlLesson23MultipleObjectVncFrame(sourceMachineryFrame, {
          objectRequests: sourceObjectRequests
        });
      }
      return sourceMachineryFrame;
    }
    function buildClassicalNahuatlVncApplicationSourceVoiceMachinery(dependencySource = {}, activeSourceMachineryFrame = null, normalizedRequest = {}, {
      sourceVoice = "active",
      sourceNonactiveOptionInventory = null
    } = {}) {
      const normalizedSourceVoice = CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES.includes(sourceVoice) ? sourceVoice : "active";
      if (normalizedSourceVoice === "active") {
        return Object.freeze({
          sourceVoice: "active",
          selectedSourceNonactiveOptionId: "",
          sourceNonactiveStemRecord: null,
          sourceMachineryFrame: activeSourceMachineryFrame
        });
      }
      const selectedSourceNonactiveOptionId = normalizeClassicalNahuatlVncApplicationToken(normalizedRequest.sourceNonactiveOptionId || sourceNonactiveOptionInventory?.automaticOptionId || "");
      const sourceNonactiveStemRecord = dependencySource.deriveClassicalNahuatlLesson20NonactiveStemRecord(normalizedRequest.sourceStem, {
        verbClass: normalizedRequest.verbClass,
        sourceValence: normalizedRequest.sourceValence,
        optionId: selectedSourceNonactiveOptionId
      });
      const firstSpecificObject = (normalizedRequest.sourceObjectRequests || []).find(request => request.objectKind === "specific-projective") || null;
      const sourceMachineryFrame = dependencySource.buildClassicalNahuatlLessons20To22DerivedVncFrame(activeSourceMachineryFrame, {
        voice: normalizedSourceVoice,
        nonactiveStemRecord: sourceNonactiveStemRecord,
        sourceObjectClusterFrame: activeSourceMachineryFrame?.multipleObjectClusterFrame || null,
        sourceValence: normalizedRequest.sourceValence,
        sourceSubject: normalizedRequest.sourceSubject,
        sourceObjectPerson: firstSpecificObject?.objectPerson || normalizedRequest.objectPerson || "",
        mood: normalizedRequest.mood,
        tense: normalizedRequest.tense,
        verbClass: normalizedRequest.verbClass,
        sentenceOptions: buildClassicalNahuatlVncApplicationSentenceOptions(normalizedRequest)
      });
      return Object.freeze({
        sourceVoice: normalizedSourceVoice,
        selectedSourceNonactiveOptionId: sourceNonactiveStemRecord?.selectedOptionId || "",
        sourceNonactiveStemRecord,
        sourceMachineryFrame
      });
    }
    function getClassicalNahuatlVncApplicationOperationObjectRequests(operationFrame = null) {
      const candidates = [operationFrame?.participantTransformFrame?.targetObjectRequests, operationFrame?.participantFrame?.targetObjectRequests, operationFrame?.targetObjectRequests, operationFrame?.objectRequests];
      return candidates.find(Array.isArray) || [];
    }
    function getClassicalNahuatlVncApplicationOperationTargetStem(operationFrame = null) {
      return normalizeClassicalNahuatlVncApplicationStem(operationFrame?.targetStem || operationFrame?.selectedOption?.targetStem || operationFrame?.derivedStemOption?.targetStem || "");
    }
    function getClassicalNahuatlVncApplicationOperationTargetClass(operationFrame = null, fallback = "B") {
      const targetClass = normalizeClassicalNahuatlVncApplicationToken(operationFrame?.targetClass || operationFrame?.selectedOption?.targetClass || operationFrame?.derivedStemOption?.targetClass || fallback).toUpperCase();
      return ["A", "B", "C", "D"].includes(targetClass) ? targetClass : fallback;
    }
    function getClassicalNahuatlVncApplicationTargetValence(operationFrame = null, fallback = "intransitive") {
      const objectRequests = getClassicalNahuatlVncApplicationOperationObjectRequests(operationFrame);
      if (objectRequests.length > 1) {
        return "multiple-object";
      }
      if (objectRequests.length === 1) {
        return getClassicalNahuatlVncApplicationValenceForObject(objectRequests[0].objectKind);
      }
      return normalizeClassicalNahuatlVncApplicationToken(fallback || "intransitive");
    }
    function getClassicalNahuatlVncApplicationFinalTypedFrame(machineryFrame = null) {
      return machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || machineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame || machineryFrame?.finalBoundaryRealizationFrame?.typedSlotFrame || null;
    }
    function areClassicalNahuatlVncApplicationCanonicalValuesEqual(left = null, right = null) {
      try {
        if (left === right) {
          return true;
        }
        if (!left || !right) {
          return false;
        }
        if (Array.isArray(left) || Array.isArray(right)) {
        if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
          return false;
        }
        for (let index = 0; index < left.length; index += 1) {
          const leftDescriptor = Object.getOwnPropertyDescriptor(left, String(index));
          const rightDescriptor = Object.getOwnPropertyDescriptor(right, String(index));
          if (Boolean(leftDescriptor) !== Boolean(rightDescriptor)) {
            return false;
          }
          if (!leftDescriptor) {
            continue;
          }
          if (!Object.prototype.hasOwnProperty.call(leftDescriptor, "value")
            || !Object.prototype.hasOwnProperty.call(rightDescriptor, "value")
            || !areClassicalNahuatlVncApplicationCanonicalValuesEqual(leftDescriptor.value, rightDescriptor.value)) {
            return false;
          }
        }
        return true;
        }
        if ((left && typeof left === "object") || (right && typeof right === "object")) {
        if (!left || !right || typeof left !== "object" || typeof right !== "object") {
          return false;
        }
        const leftKeys = Object.keys(left).sort();
        const rightKeys = Object.keys(right).sort();
        return leftKeys.length === rightKeys.length
          && leftKeys.every((key, index) => {
            if (key !== rightKeys[index]) {
              return false;
            }
            const leftDescriptor = Object.getOwnPropertyDescriptor(left, key);
            const rightDescriptor = Object.getOwnPropertyDescriptor(right, key);
            return Boolean(leftDescriptor && rightDescriptor)
              && Object.prototype.hasOwnProperty.call(leftDescriptor, "value")
              && Object.prototype.hasOwnProperty.call(rightDescriptor, "value")
              && areClassicalNahuatlVncApplicationCanonicalValuesEqual(leftDescriptor.value, rightDescriptor.value);
          });
        }
        return JSON.stringify(left === undefined ? null : left) === JSON.stringify(right === undefined ? null : right);
      } catch (_error) {
        return false;
      }
    }
    function areClassicalNahuatlVncApplicationDenseArrayValuesIdentical(actual = null, expected = null) {
      if (!Array.isArray(actual) || !Array.isArray(expected) || actual.length !== expected.length) {
        return false;
      }
      for (let index = 0; index < expected.length; index += 1) {
        const actualDescriptor = Object.getOwnPropertyDescriptor(actual, String(index));
        const expectedDescriptor = Object.getOwnPropertyDescriptor(expected, String(index));
        if (!actualDescriptor || !expectedDescriptor
          || !Object.prototype.hasOwnProperty.call(actualDescriptor, "value")
          || !Object.prototype.hasOwnProperty.call(expectedDescriptor, "value")
          || actualDescriptor.value !== expectedDescriptor.value) {
          return false;
        }
      }
      return true;
    }
    function getClassicalNahuatlVncApplicationTypedIdentity(frame = null) {
      return normalizeClassicalNahuatlVncApplicationToken(frame?.semanticIdentity);
    }
    function areClassicalNahuatlVncApplicationTypedFramesEqual(left = null, right = null) {
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(left && right
        && typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncSlotFrame(left)
        && runtimeTarget.isClassicalNahuatlVncSlotFrame(right)
        && getClassicalNahuatlVncApplicationTypedIdentity(left)
        && getClassicalNahuatlVncApplicationTypedIdentity(left) === getClassicalNahuatlVncApplicationTypedIdentity(right)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(left, right));
    }
    function getClassicalNahuatlVncApplicationCanonicalFormula(typedFrame = null) {
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (!(typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame === "function" && runtimeTarget.isClassicalNahuatlVncSlotFrame(typedFrame) && typeof runtimeTarget?.renderClassicalNahuatlVncSlotFrameFormula === "function")) {
        return "";
      }
      return normalizeClassicalNahuatlVncApplicationToken(runtimeTarget.renderClassicalNahuatlVncSlotFrameFormula(typedFrame));
    }
    function areClassicalNahuatlVncApplicationFormulaProjectionsCanonical(machineryFrame = null, canonicalFormula = "") {
      if (!canonicalFormula) {
        return false;
      }
      const conclusion = machineryFrame?.proofFrame?.conclusion || {};
      const projections = [
        machineryFrame?.formulaRealization,
        conclusion.formulaRealization,
        conclusion.selectedFormula,
        conclusion.authorizedFormula,
        conclusion.finalBoundaryRealizationFrame?.formulaRealization,
        machineryFrame?.finalBoundaryRealizationFrame?.formulaRealization
      ].filter(value => typeof value === "string" && value.length > 0).map(normalizeClassicalNahuatlVncApplicationToken);
      return Boolean(projections.length && projections.every(value => value === canonicalFormula));
    }
    function isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(machineryFrame = null) {
      if (machineryFrame && typeof machineryFrame === "object" && classicalNahuatlVncApplicationValidationTransaction?.activeMachineryFrames.has(machineryFrame)) {
        return true;
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (!machineryFrame || machineryFrame.authorizationStatus !== "authorized") {
        return false;
      }
      if (machineryFrame.kind === "classical-nahuatl-vnc-derived-machinery-frame") {
        const canonical = Boolean(typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame === "function" && runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(machineryFrame));
        if (canonical) {
          classicalNahuatlVncApplicationValidationTransaction?.activeMachineryFrames.add(machineryFrame);
        }
        return canonical;
      }
      if (!["classical-nahuatl-lesson7-verbstem-class-machinery-frame", "classical-nahuatl-lesson23-multiple-object-vnc-machinery-frame"].includes(machineryFrame.kind)) {
        return false;
      }
      const typedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(machineryFrame);
      const formula = getClassicalNahuatlVncApplicationCanonicalFormula(typedFrame);
      const canonical = Boolean(machineryFrame.proofFrame?.authorizationStatus === "authorized"
        && machineryFrame.proofFrame?.conclusion?.authorized === true
        && formula
        && areClassicalNahuatlVncApplicationFormulaProjectionsCanonical(machineryFrame, formula));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.activeMachineryFrames.add(machineryFrame);
      }
      return canonical;
    }
    function getClassicalNahuatlVncApplicationCanonicalSentenceOptions(machineryFrame = null) {
      const conclusion = machineryFrame?.proofFrame?.conclusion || {};
      const expandedBoundary = machineryFrame?.expandedVncBoundaryFrame || conclusion.expandedVncBoundaryFrame || {};
      const sentenceFrame = machineryFrame?.sentenceSurfaceFrame || conclusion.sentenceSurfaceFrame || {};
      const sentenceAntecessive = conclusion.antecessiveOutsideVnc === true || sentenceFrame.sentenceAntecessive === true || sentenceFrame.antecessive === true;
      const negative = sentenceFrame.lesson9NegativeRequested === true || sentenceFrame.lesson10NegativeRequested === true || sentenceFrame.sentenceType === "negative-assertion" || Boolean(sentenceFrame.negativePrefix);
      return buildClassicalNahuatlVncApplicationSentenceOptions({
        directionalPrefix: expandedBoundary.directionalPrefix || conclusion.directionalPrefix || "",
        incorporatedAdverb: conclusion.incorporatedAdverb || "",
        adverbPosition: conclusion.adverbPosition || "",
        sentenceType: sentenceFrame.sentenceType || "",
        negative,
        questionMode: sentenceFrame.questionMode || "",
        introductoryParticle: sentenceFrame.introductoryParticle || "",
        prefaceParticle: sentenceFrame.prefaceParticle || "",
        lesson9PrefaceParticle: sentenceFrame.requestedPrefaceParticle || sentenceFrame.prefaceParticle || "",
        introductoryModifier: sentenceFrame.introductoryModifier || "",
        lesson9IntroductoryModifier: sentenceFrame.requestedIntroductoryModifier || sentenceFrame.introductoryModifier || "",
        admonitiveTranslationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        translationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        requestedTranslationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        admonitiveContrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        contrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        requestedContrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        sentenceAntecessive,
        antecessive: sentenceAntecessive,
        requestedNegativePrefix: sentenceFrame.negativePrefix || "",
        negativePrefix: sentenceFrame.negativePrefix || "",
        outsidePrefixes: Array.isArray(conclusion.outsidePrefixes) ? [...conclusion.outsidePrefixes] : [],
        construction: sentenceFrame.lesson11Construction || "",
        lesson11LexicalReading: machineryFrame?.lesson11VncApplicationFrame?.selectedLexicalReading || ""
      });
    }
    function rebuildClassicalNahuatlVncApplicationVoiceMachineryFrame(machineryFrame = null) {
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const activeMachineryFrame = machineryFrame?.activeMachineryFrame || null;
      if (machineryFrame?.kind !== "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame" || !isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(activeMachineryFrame) || typeof runtimeTarget?.buildClassicalNahuatlLessons20To22DerivedVncFrame !== "function") {
        return null;
      }
      const firstSpecificObject = (activeMachineryFrame.targetObjectRequests || []).find(request => request?.objectKind === "specific-projective") || (activeMachineryFrame.targetObjectRequests || [])[0] || null;
      return runtimeTarget.buildClassicalNahuatlLessons20To22DerivedVncFrame(activeMachineryFrame, {
        voice: machineryFrame.voice,
        nonactiveStemRecord: machineryFrame.nonactiveStemRecord,
        inherentImpersonalRecord: machineryFrame.inherentImpersonalRecord,
        tlaImpersonalStemRecord: machineryFrame.tlaImpersonalStemRecord,
        sourceObjectClusterFrame: machineryFrame.sourceObjectClusterFrame,
        sourceValence: machineryFrame.sourceValence,
        sourceSubject: machineryFrame.sourceSubject,
        sourceObjectPerson: firstSpecificObject?.objectPerson || activeMachineryFrame.priorVncFrame?.objectFrame?.objectPerson || "",
        mood: activeMachineryFrame.priorVncFrame?.personDyad?.mood || activeMachineryFrame.priorVncFrame?.mood || "indicative",
        tense: activeMachineryFrame.priorVncFrame?.tense || "present",
        verbClass: activeMachineryFrame.targetClass || activeMachineryFrame.classId || "A",
        sentenceOptions: getClassicalNahuatlVncApplicationCanonicalSentenceOptions(activeMachineryFrame)
      });
    }
    function isClassicalNahuatlVncApplicationCanonicalSelectedMachineryFrame(machineryFrame = null) {
      if (isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(machineryFrame)) {
        const typedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(machineryFrame);
        const formula = getClassicalNahuatlVncApplicationCanonicalFormula(typedFrame);
        return areClassicalNahuatlVncApplicationFormulaProjectionsCanonical(machineryFrame, formula);
      }
      const rebuilt = rebuildClassicalNahuatlVncApplicationVoiceMachineryFrame(machineryFrame);
      const typedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(machineryFrame);
      const rebuiltTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(rebuilt);
      const formula = getClassicalNahuatlVncApplicationCanonicalFormula(typedFrame);
      const rebuiltFormula = getClassicalNahuatlVncApplicationCanonicalFormula(rebuiltTypedFrame);
      return Boolean(rebuilt?.authorizationStatus === "authorized" && machineryFrame?.authorizationStatus === "authorized" && machineryFrame.voice === rebuilt.voice && formula && formula === rebuiltFormula && areClassicalNahuatlVncApplicationTypedFramesEqual(typedFrame, rebuiltTypedFrame) && areClassicalNahuatlVncApplicationFormulaProjectionsCanonical(machineryFrame, formula) && areClassicalNahuatlVncApplicationCanonicalValuesEqual(machineryFrame.voiceTransformationFrame || null, rebuilt.voiceTransformationFrame || null));
    }
    function getClassicalNahuatlVncApplicationExpectedAppliedTypedFrames(frame = null) {
      const sourceAnalysisFrame = frame?.sourceAnalysisFrame || null;
      const sourceMachineryFrame = frame?.sourceMachineryFrame || null;
      const operationFrame = frame?.derivationOperationFrame || null;
      const selectedMachineryFrame = frame?.selectedMachineryFrame || null;
      return [
        sourceMachineryFrame?.nonactiveStemRecord,
        sourceMachineryFrame?.voiceTransformationFrame,
        sourceAnalysisFrame,
        operationFrame,
        operationFrame?.participantTransformFrame,
        selectedMachineryFrame?.nonactiveStemRecord,
        selectedMachineryFrame?.inherentImpersonalRecord,
        selectedMachineryFrame?.tlaImpersonalStemRecord,
        selectedMachineryFrame?.voiceTransformationFrame
      ].filter(Boolean);
    }
    function isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(frame = null, runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget()) {
      if (frame && typeof frame === "object" && classicalNahuatlVncApplicationValidationTransaction?.sourceMachineryFrames.has(frame)) {
        return true;
      }
      const canonical = Boolean(typeof runtimeTarget?.isClassicalNahuatlVncDerivationSourceMachineryFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationSourceMachineryFrame(frame));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.sourceMachineryFrames.add(frame);
      }
      return canonical;
    }
    function isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(frame = null, runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget()) {
      if (frame && typeof frame === "object" && classicalNahuatlVncApplicationValidationTransaction?.sourceAnalysisFrames.has(frame)) {
        return true;
      }
      const canonical = Boolean(typeof runtimeTarget?.isClassicalNahuatlVncDerivationSourceAnalysisFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationSourceAnalysisFrame(frame));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.sourceAnalysisFrames.add(frame);
      }
      return canonical;
    }
    function isCanonicalClassicalNahuatlVncApplicationDerivationInventory(frame = null, runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget()) {
      if (frame && typeof frame === "object" && classicalNahuatlVncApplicationValidationTransaction?.derivationInventories.has(frame)) {
        return true;
      }
      const canonical = Boolean(typeof runtimeTarget?.isClassicalNahuatlVncDerivationOptionInventory === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationOptionInventory(frame));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.derivationInventories.add(frame);
      }
      return canonical;
    }
    function isCanonicalClassicalNahuatlVncApplicationDerivationOperation(frame = null, runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget()) {
      if (frame && typeof frame === "object" && classicalNahuatlVncApplicationValidationTransaction?.derivationOperationFrames.has(frame)) {
        return true;
      }
      const canonical = Boolean(typeof runtimeTarget?.isClassicalNahuatlVncDerivationOperationFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationOperationFrame(frame));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.derivationOperationFrames.add(frame);
      }
      return canonical;
    }
    function isClassicalNahuatlVncApplicationResultFrameInternal(frame = null) {
      if (frame && typeof frame === "object" && (classicalNahuatlVncApplicationPersistentCanonicalResultFrames.has(frame) || classicalNahuatlVncApplicationValidationTransaction?.resultFrames.has(frame))) {
        return true;
      }
      if (!frame || frame.kind !== "classical-nahuatl-vnc-application-result-frame" || frame.version !== CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION || frame.authorizationStatus !== "authorized" || frame.typedFrameAuthority !== true || frame.formulaStringAuthority !== false || frame.surfaceStringAuthority !== false || frame.callerSuppliedAuthorityAccepted !== false) {
        return false;
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const derivationDirect = frame.selectedDerivation === "direct";
      const formationSourceCanonical = isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(frame.formationSourceMachineryFrame);
      const sourceCanonical = derivationDirect
        ? isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(frame.sourceMachineryFrame)
        : isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(frame.sourceMachineryFrame, runtimeTarget);
      const sourceFormationContinuity = frame.selectedSourceVoice === "active"
        ? frame.formationSourceMachineryFrame === frame.sourceMachineryFrame
        : frame.sourceMachineryFrame?.kind === "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame"
          && frame.sourceMachineryFrame?.voice === frame.selectedSourceVoice
          && frame.sourceMachineryFrame.activeMachineryFrame === frame.formationSourceMachineryFrame;
      const activeCanonical = isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(frame.activeMachineryFrame);
      const selectedCanonical = isClassicalNahuatlVncApplicationCanonicalSelectedMachineryFrame(frame.selectedMachineryFrame);
      const selectedTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(frame.selectedMachineryFrame);
      const canonicalFormula = getClassicalNahuatlVncApplicationCanonicalFormula(selectedTypedFrame);
      const sourceAnalysisCanonical = frame.sourceAnalysisFrame == null
        ? derivationDirect
        : isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(frame.sourceAnalysisFrame, runtimeTarget);
      const sourceAnalysisContinuity = frame.sourceAnalysisFrame == null
        ? derivationDirect
        : sourceAnalysisCanonical && frame.sourceAnalysisFrame.sourceMachineryFrame === frame.sourceMachineryFrame;
      const derivationRecognized = CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS.includes(frame.selectedDerivation);
      const directSourceKind = ["classical-nahuatl-lesson7-verbstem-class-machinery-frame", "classical-nahuatl-lesson23-multiple-object-vnc-machinery-frame"].includes(frame.sourceMachineryFrame?.kind);
      const operationCanonical = derivationDirect
        ? frame.derivationOperationFrame == null && directSourceKind
        : Boolean(isCanonicalClassicalNahuatlVncApplicationDerivationOperation(frame.derivationOperationFrame, runtimeTarget)
          && frame.selectedDerivation === frame.derivationOperationFrame.derivationType
          && frame.activeMachineryFrame?.derivationOperationFrame === frame.derivationOperationFrame);
      const canvasChoiceCanonical = derivationDirect
        ? frame.selectedCanvasDerivationChoiceFrame == null
          && frame.selectedChoiceId === ""
          && frame.selectedChoiceSignature === ""
        : Boolean(
          frame.selectedCanvasDerivationChoiceFrame === frame.derivationOperationFrame?.selectedCanvasDerivationChoiceFrame
          && frame.selectedChoiceId === (frame.derivationOperationFrame?.selectedChoiceId || "")
          && frame.selectedChoiceSignature === (frame.derivationOperationFrame?.selectedChoiceSignature || "")
          && (frame.selectedCanvasDerivationChoiceFrame == null
            || (typeof runtimeTarget?.isClassicalNahuatlCanvasDerivationChoiceFrame === "function"
              && runtimeTarget.isClassicalNahuatlCanvasDerivationChoiceFrame(frame.selectedCanvasDerivationChoiceFrame) === true))
        );
      const sourceTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(frame.sourceMachineryFrame);
      const sourceFormula = getClassicalNahuatlVncApplicationCanonicalFormula(sourceTypedFrame);
      const sourceFormulaCanonical = areClassicalNahuatlVncApplicationFormulaProjectionsCanonical(frame.sourceMachineryFrame, sourceFormula);
      const sourceActiveContinuity = derivationDirect
        ? frame.sourceMachineryFrame === frame.activeMachineryFrame
        : frame.activeMachineryFrame?.kind === "classical-nahuatl-vnc-derived-machinery-frame"
          && frame.sourceMachineryFrame === frame.activeMachineryFrame.sourceMachineryFrame;
      const activeTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(frame.activeMachineryFrame);
      const selectedVoiceContinuity = frame.selectedVoice === "active"
        ? areClassicalNahuatlVncApplicationTypedFramesEqual(selectedTypedFrame, activeTypedFrame) && frame.selectedMachineryFrame === frame.activeMachineryFrame
        : frame.selectedMachineryFrame?.kind === "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame"
          && frame.selectedMachineryFrame?.voice === frame.selectedVoice
          && frame.selectedMachineryFrame.activeMachineryFrame === frame.activeMachineryFrame;
      const expectedAppliedTypedFrames = getClassicalNahuatlVncApplicationExpectedAppliedTypedFrames(frame);
      const appliedTypedFramesCanonical = areClassicalNahuatlVncApplicationDenseArrayValuesIdentical(frame.appliedTypedFrames, expectedAppliedTypedFrames);
      const finiteSurfaceCanonical = Boolean(
        typeof runtimeTarget?.isClassicalNahuatlVncFiniteSurfaceFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncFiniteSurfaceFrame(frame.finiteSurfaceFrame) === true
        && frame.finiteSurfaceFrame.machineryFrame === frame.selectedMachineryFrame
        && frame.surfaceRealization === frame.finiteSurfaceFrame.wordRealization
      );
      const canonical = Boolean(derivationRecognized && formationSourceCanonical && sourceCanonical && sourceFormationContinuity && sourceAnalysisCanonical && sourceAnalysisContinuity && sourceFormulaCanonical && activeCanonical && selectedCanonical && operationCanonical && canvasChoiceCanonical && sourceActiveContinuity && selectedVoiceContinuity && appliedTypedFramesCanonical && finiteSurfaceCanonical && canonicalFormula && normalizeClassicalNahuatlVncApplicationToken(frame.formulaRealization) === canonicalFormula && areClassicalNahuatlVncApplicationTypedFramesEqual(frame.finalTypedVncSlotFrame, selectedTypedFrame));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.resultFrames.add(frame);
        if (classicalNahuatlVncApplicationBuiltResultFrames.has(frame)) {
          classicalNahuatlVncApplicationPersistentCanonicalResultFrames.add(frame);
        }
      }
      return canonical;
    }
    function isClassicalNahuatlVncApplicationResultFrame(frame = null) {
      return runClassicalNahuatlVncApplicationValidationTransaction(() => isClassicalNahuatlVncApplicationResultFrameInternal(frame));
    }
    function isClassicalNahuatlVncApplicationFrameInternal(frame = null) {
      if (frame && typeof frame === "object" && (classicalNahuatlVncApplicationPersistentCanonicalFrames.has(frame) || classicalNahuatlVncApplicationValidationTransaction?.applicationFrames.has(frame))) {
        return true;
      }
      if (!frame || frame.kind !== "classical-nahuatl-vnc-application-frame" || frame.version !== CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION || frame.authorizationStatus !== "authorized" || frame.controlFrame?.authorizationStatus !== "authorized" || frame.resultFrame?.authorizationStatus !== "authorized" || !isClassicalNahuatlVncApplicationResultFrame(frame.resultFrame) || frame.normalizedRequest?.kind !== "classical-nahuatl-vnc-application-request" || frame.controlFrame?.kind !== "classical-nahuatl-vnc-application-control-frame" || frame.resultFrame.selectedSourceVoice !== frame.controlFrame.selectedSourceVoice || frame.normalizedRequest.sourceVoice !== frame.controlFrame.selectedSourceVoice || frame.resultFrame.selectedVoice !== frame.controlFrame.selectedVoice || frame.resultFrame.selectedDerivation !== frame.controlFrame.derivationType || frame.normalizedRequest.voice !== frame.controlFrame.selectedVoice || frame.normalizedRequest.derivationType !== frame.controlFrame.derivationType || frame.callerSuppliedAuthorityAccepted !== false || frame.formulaStringAuthority !== false || frame.surfaceStringAuthority !== false) {
        return false;
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const directDerivation = frame.controlFrame.derivationType === "direct";
      const rebuiltFormationSourceMachineryFrame = buildClassicalNahuatlVncApplicationSourceMachinery(runtimeTarget, frame.normalizedRequest);
      const rebuiltSourceNonactiveOptionInventory = runtimeTarget.getClassicalNahuatlLesson20NonactiveStemOptions(frame.normalizedRequest.sourceStem, {
        verbClass: frame.normalizedRequest.verbClass,
        sourceValence: frame.normalizedRequest.sourceValence
      });
      let rebuiltAllowedSourceVoices = frame.normalizedRequest.derivationType === "causative"
        && isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(rebuiltFormationSourceMachineryFrame)
        ? Object.freeze(getClassicalNahuatlVncApplicationAllowedVoices({
          sourceStem: frame.normalizedRequest.sourceStem,
          sourceValence: frame.normalizedRequest.sourceValence,
          outputScope: "single",
          nonactiveOptionInventory: rebuiltSourceNonactiveOptionInventory,
          objectRequests: frame.normalizedRequest.sourceObjectRequests
        }).filter(voice => CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES.includes(voice)))
        : Object.freeze(["active"]);
      if (!rebuiltAllowedSourceVoices.length) {
        rebuiltAllowedSourceVoices = Object.freeze(["active"]);
      }
      const normalizedRequestedSourceVoice = CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES.includes(frame.normalizedRequest.requestedSourceVoice)
        ? frame.normalizedRequest.requestedSourceVoice
        : "active";
      const rebuiltSelectedSourceVoice = rebuiltAllowedSourceVoices.includes(normalizedRequestedSourceVoice)
        ? normalizedRequestedSourceVoice
        : "active";
      let rebuiltSourceVoiceNormalizationReason = "";
      if (!frame.normalizedRequest.requestedSourceVoiceRecognized) {
        rebuiltSourceVoiceNormalizationReason = "unknown-source-voice-normalized-to-active";
      } else if (frame.normalizedRequest.derivationType !== "causative" && normalizedRequestedSourceVoice !== "active") {
        rebuiltSourceVoiceNormalizationReason = "source-voice-applies-only-before-causative-derivation";
      } else if (rebuiltSelectedSourceVoice !== normalizedRequestedSourceVoice) {
        rebuiltSourceVoiceNormalizationReason = "requested-source-voice-not-authorized-for-source";
      }
      const rebuiltSourceVoiceBundle = buildClassicalNahuatlVncApplicationSourceVoiceMachinery(runtimeTarget, rebuiltFormationSourceMachineryFrame, frame.normalizedRequest, {
        sourceVoice: rebuiltSelectedSourceVoice,
        sourceNonactiveOptionInventory: rebuiltSourceNonactiveOptionInventory
      });
      const rebuiltSourceMachineryFrame = rebuiltSourceVoiceBundle.sourceMachineryFrame;
      const sourceRequestContinuity = isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(rebuiltFormationSourceMachineryFrame)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(rebuiltFormationSourceMachineryFrame, frame.resultFrame.formationSourceMachineryFrame)
        && (directDerivation
          ? isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(rebuiltSourceMachineryFrame)
          : isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(rebuiltSourceMachineryFrame, runtimeTarget))
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(rebuiltSourceMachineryFrame, frame.resultFrame.sourceMachineryFrame);
      const rebuiltSourceAnalysisCandidate = sourceRequestContinuity && typeof runtimeTarget?.buildClassicalNahuatlVncDerivationSourceAnalysisFrame === "function"
        ? runtimeTarget.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(rebuiltSourceMachineryFrame)
        : null;
      const rebuiltSourceAnalysisFrame = isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(rebuiltSourceAnalysisCandidate, runtimeTarget)
        ? rebuiltSourceAnalysisCandidate
        : null;
      const expectedAndResultAnalysisMatch = rebuiltSourceAnalysisFrame == null && frame.resultFrame.sourceAnalysisFrame == null
        || areClassicalNahuatlVncApplicationCanonicalValuesEqual(rebuiltSourceAnalysisFrame, frame.resultFrame.sourceAnalysisFrame);
      const controlAndResultAnalysisMatch = frame.controlFrame.sourceAnalysisFrame === frame.resultFrame.sourceAnalysisFrame;
      const sourceAnalysisContinuity = expectedAndResultAnalysisMatch && controlAndResultAnalysisMatch;
      const operationFrame = frame.resultFrame.derivationOperationFrame;
      const rebuiltDerivationOperationFrame = directDerivation || !sourceRequestContinuity
        ? null
        : runtimeTarget.deriveClassicalNahuatlVncDerivationOperationFrame(
          rebuiltSourceMachineryFrame,
          buildClassicalNahuatlVncApplicationDerivationOperationRequest(frame.normalizedRequest)
        );
      const operationParticipantRequestContinuity = directDerivation
        ? operationFrame == null
        : Boolean(
          operationFrame
          && runtimeTarget.isClassicalNahuatlVncDerivationOperationFrame(rebuiltDerivationOperationFrame) === true
          && rebuiltDerivationOperationFrame.canonicalSignature === operationFrame.canonicalSignature
          && rebuiltDerivationOperationFrame.selectedOptionId === operationFrame.selectedOptionId
          && rebuiltDerivationOperationFrame.participantTransformFrame?.canonicalSignature === operationFrame.participantTransformFrame?.canonicalSignature
          && operationFrame.participantTransformFrame?.sourceVoice === frame.normalizedRequest.sourceVoice
          && operationFrame.participantTransformFrame?.targetSubject === frame.normalizedRequest.subject
          && operationFrame.participantTransformFrame?.requestedCausativeObjectKind === (
            frame.normalizedRequest.derivationType === "causative" && frame.normalizedRequest.sourceVoice === "active"
              ? frame.normalizedRequest.causativeObjectKind
              : ""
          )
          && operationFrame.participantTransformFrame?.causativeReferentRelation === (
            frame.normalizedRequest.derivationType === "causative"
              ? frame.normalizedRequest.causativeReferentRelation
              : ""
          )
          && operationFrame.participantTransformFrame?.causativeSpecificShuntlineRealization === (
            frame.normalizedRequest.derivationType === "causative"
              && operationFrame.participantTransformFrame?.causativeSpecificShuntlineChoiceEligible === true
              ? frame.normalizedRequest.causativeSpecificShuntlineRealization || "silent"
              : ""
          )
        );
      const rebuiltCausativeParticipantChoiceControls = getClassicalNahuatlVncApplicationCausativeParticipantChoiceControls(operationFrame, frame.normalizedRequest);
      const sourceObjectRequests = Array.isArray(frame.normalizedRequest.sourceObjectRequests) ? frame.normalizedRequest.sourceObjectRequests : [];
      const effectiveSourceValence = frame.normalizedRequest.effectiveSourceValence || frame.normalizedRequest.sourceValence;
      const expectedTargetValence = directDerivation
        ? sourceObjectRequests.length > 1 ? "multiple-object" : effectiveSourceValence
        : getClassicalNahuatlVncApplicationTargetValence(operationFrame, effectiveSourceValence);
      const expectedTargetObjectRequests = directDerivation
        ? sourceObjectRequests
        : getClassicalNahuatlVncApplicationOperationObjectRequests(operationFrame);
      const rebuiltTargetNonactiveOptionInventory = runtimeTarget.getClassicalNahuatlLesson20NonactiveStemOptions(frame.normalizedRequest.targetStem, {
        verbClass: frame.normalizedRequest.targetClass,
        sourceValence: expectedTargetValence
      });
      const rebuiltAllowedVoices = getClassicalNahuatlVncApplicationAllowedVoices({
        sourceStem: frame.normalizedRequest.targetStem,
        sourceValence: expectedTargetValence,
        outputScope: frame.normalizedRequest.outputScope,
        nonactiveOptionInventory: rebuiltTargetNonactiveOptionInventory,
        objectRequests: expectedTargetObjectRequests
      });
      const normalizedRequestedVoice = CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES.includes(frame.normalizedRequest.requestedVoice)
        ? frame.normalizedRequest.requestedVoice
        : "active";
      const rebuiltSelectedVoice = rebuiltAllowedVoices.includes(normalizedRequestedVoice)
        ? normalizedRequestedVoice
        : "active";
      let rebuiltVoiceNormalizationReason = "";
      if (!frame.normalizedRequest.requestedVoiceRecognized) {
        rebuiltVoiceNormalizationReason = "unknown-voice-normalized-to-active";
      } else if (frame.normalizedRequest.outputScope === "paradigm" && normalizedRequestedVoice !== "active") {
        rebuiltVoiceNormalizationReason = "full-paradigm-requires-active-voice";
      } else if (!frame.normalizedRequest.targetStem && normalizedRequestedVoice !== "active") {
        rebuiltVoiceNormalizationReason = "source-stem-required-before-derived-voice";
      } else if (rebuiltSelectedVoice !== normalizedRequestedVoice) {
        rebuiltVoiceNormalizationReason = "requested-voice-not-authorized-for-source";
      }
      const derivationSelectionContinuity = frame.controlFrame.derivationType === "direct"
        ? operationFrame == null
          && frame.controlFrame.derivationOptionInventory == null
          && frame.controlFrame.selectedDerivationOptionId === ""
          && frame.controlFrame.selectedCanvasDerivationChoiceFrame == null
          && frame.controlFrame.selectedChoiceId === ""
          && frame.controlFrame.selectedChoiceSignature === ""
          && frame.controlFrame.derivedStem === ""
          && frame.controlFrame.derivedClass === ""
          && frame.controlFrame.targetObjectCount === sourceObjectRequests.length
          && frame.normalizedRequest.targetStem === frame.normalizedRequest.sourceStem
          && frame.normalizedRequest.targetClass === frame.normalizedRequest.verbClass
          && frame.normalizedRequest.targetValence === expectedTargetValence
        : Boolean(operationFrame
          && operationFrame.derivationType === frame.controlFrame.derivationType
          && isCanonicalClassicalNahuatlVncApplicationDerivationInventory(frame.controlFrame.derivationOptionInventory, runtimeTarget)
          && frame.controlFrame.derivationOptionInventory.sourceMachineryFrame === frame.resultFrame.sourceMachineryFrame
          && frame.controlFrame.derivationOptionInventory.sourceAnalysisFrame === frame.resultFrame.sourceAnalysisFrame
          && frame.controlFrame.selectedDerivationOptionId === operationFrame.selectedOptionId
          && frame.controlFrame.selectedCanvasDerivationChoiceFrame === operationFrame.selectedCanvasDerivationChoiceFrame
          && frame.controlFrame.selectedChoiceId === (operationFrame.selectedChoiceId || "")
          && frame.controlFrame.selectedChoiceSignature === (operationFrame.selectedChoiceSignature || "")
          && frame.resultFrame.selectedCanvasDerivationChoiceFrame === operationFrame.selectedCanvasDerivationChoiceFrame
          && frame.resultFrame.selectedChoiceId === (operationFrame.selectedChoiceId || "")
          && frame.resultFrame.selectedChoiceSignature === (operationFrame.selectedChoiceSignature || "")
          && frame.controlFrame.derivedStem === operationFrame.targetStem
          && frame.controlFrame.derivedClass === operationFrame.targetClass
          && frame.controlFrame.targetObjectCount === operationFrame.targetObjectRequests?.length
          && frame.normalizedRequest.targetStem === operationFrame.targetStem
          && frame.normalizedRequest.targetClass === operationFrame.targetClass
          && frame.normalizedRequest.targetValence === expectedTargetValence);
      const requestedDerivationAccepted = frame.normalizedRequest.requestedDerivationRecognized === true;
      const requestControlContinuity = frame.controlFrame.requestedDerivation === frame.normalizedRequest.requestedDerivation
        && frame.controlFrame.requestedDerivationAccepted === requestedDerivationAccepted
        && frame.controlFrame.requestedSourceVoice === frame.normalizedRequest.requestedSourceVoice
        && frame.controlFrame.sourceVoice === frame.normalizedRequest.sourceVoice
        && frame.controlFrame.selectedSourceVoice === frame.normalizedRequest.sourceVoice
        && frame.controlFrame.selectedSourceVoice === rebuiltSelectedSourceVoice
        && frame.controlFrame.requestedSourceVoiceAccepted === (frame.controlFrame.selectedSourceVoice === frame.controlFrame.requestedSourceVoice)
        && Array.isArray(frame.controlFrame.allowedSourceVoices)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedSourceVoices, rebuiltAllowedSourceVoices)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.sourceNonactiveOptionInventory, rebuiltSourceNonactiveOptionInventory)
        && frame.controlFrame.sourceNonactiveSelectorRequired === (rebuiltSelectedSourceVoice !== "active" && rebuiltSourceNonactiveOptionInventory?.selectorRequired === true)
        && frame.controlFrame.selectedSourceNonactiveOptionId === rebuiltSourceVoiceBundle.selectedSourceNonactiveOptionId
        && frame.controlFrame.sourceVoiceNormalizationReason === rebuiltSourceVoiceNormalizationReason
        && frame.controlFrame.causativeObjectKindChoiceEligible === rebuiltCausativeParticipantChoiceControls.causativeObjectKindChoiceEligible
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedCausativeObjectKinds, rebuiltCausativeParticipantChoiceControls.allowedCausativeObjectKinds)
        && frame.controlFrame.causativeObjectKindSelectionRequired === rebuiltCausativeParticipantChoiceControls.causativeObjectKindSelectionRequired
        && frame.controlFrame.selectedCausativeObjectKind === rebuiltCausativeParticipantChoiceControls.selectedCausativeObjectKind
        && frame.controlFrame.causativeReferentRelationChoiceEligible === rebuiltCausativeParticipantChoiceControls.causativeReferentRelationChoiceEligible
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedCausativeReferentRelations, rebuiltCausativeParticipantChoiceControls.allowedCausativeReferentRelations)
        && frame.controlFrame.causativeReferentRelationSelectionRequired === rebuiltCausativeParticipantChoiceControls.causativeReferentRelationSelectionRequired
        && frame.controlFrame.selectedCausativeReferentRelation === rebuiltCausativeParticipantChoiceControls.selectedCausativeReferentRelation
        && frame.controlFrame.causativeSpecificShuntlineChoiceEligible === rebuiltCausativeParticipantChoiceControls.causativeSpecificShuntlineChoiceEligible
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedCausativeSpecificShuntlineRealizations, rebuiltCausativeParticipantChoiceControls.allowedCausativeSpecificShuntlineRealizations)
        && frame.controlFrame.causativeSpecificShuntlineSelectionRequired === rebuiltCausativeParticipantChoiceControls.causativeSpecificShuntlineSelectionRequired
        && frame.controlFrame.selectedCausativeSpecificShuntlineRealization === rebuiltCausativeParticipantChoiceControls.selectedCausativeSpecificShuntlineRealization
        && frame.controlFrame.requestedVoice === frame.normalizedRequest.requestedVoice
        && frame.controlFrame.requestedVoiceAccepted === (frame.controlFrame.selectedVoice === frame.controlFrame.requestedVoice)
        && Array.isArray(frame.controlFrame.allowedDerivations)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedDerivations, CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS)
        && Array.isArray(frame.controlFrame.allowedVoices)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedVoices, rebuiltAllowedVoices)
        && frame.controlFrame.selectedVoice === rebuiltSelectedVoice
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.nonactiveOptionInventory, rebuiltTargetNonactiveOptionInventory)
        && frame.controlFrame.nonactiveSelectorRequired === ((rebuiltSelectedVoice === "passive" || rebuiltSelectedVoice === "impersonal") && rebuiltTargetNonactiveOptionInventory?.selectorRequired === true)
        && frame.controlFrame.voiceNormalizationReason === rebuiltVoiceNormalizationReason;
      const selectedNonactiveOptionId = frame.resultFrame.selectedMachineryFrame?.nonactiveStemRecord?.selectedOptionId || "";
      const selectedSourceNonactiveOptionId = frame.resultFrame.sourceMachineryFrame?.nonactiveStemRecord?.selectedOptionId || "";
      const nonactiveSelectionContinuity = frame.controlFrame.selectedNonactiveOptionId === selectedNonactiveOptionId
        && frame.controlFrame.selectedSourceNonactiveOptionId === selectedSourceNonactiveOptionId
        && frame.normalizedRequest.sourceNonactiveOptionId === selectedSourceNonactiveOptionId;
      const baseFrameCanonical = Boolean(sourceRequestContinuity && sourceAnalysisContinuity && operationParticipantRequestContinuity && derivationSelectionContinuity && requestControlContinuity && nonactiveSelectionContinuity);
      if (!baseFrameCanonical) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(frame, "derivationExplanationProjection")) {
        classicalNahuatlVncApplicationValidationTransaction?.applicationFrames.add(frame);
        if (classicalNahuatlVncApplicationBuiltFrames.has(frame)) {
          classicalNahuatlVncApplicationPersistentCanonicalFrames.add(frame);
        }
        return true;
      }
      const canonical = areClassicalNahuatlVncApplicationCanonicalValuesEqual(
        frame.derivationExplanationProjection,
        projectCanonicalClassicalNahuatlVncDerivationExplanation(frame, runtimeTarget)
      );
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.applicationFrames.add(frame);
        if (classicalNahuatlVncApplicationBuiltFrames.has(frame)) {
          classicalNahuatlVncApplicationPersistentCanonicalFrames.add(frame);
        }
      }
      return canonical;
    }
    function isClassicalNahuatlVncApplicationFrame(frame = null) {
      return runClassicalNahuatlVncApplicationValidationTransaction(() => isClassicalNahuatlVncApplicationFrameInternal(frame));
    }
    function freezeClassicalNahuatlVncApplicationProjectionValue(value) {
      if (Array.isArray(value)) {
        return Object.freeze(value.map(freezeClassicalNahuatlVncApplicationProjectionValue));
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      if (value.kind === "classical-nahuatl-canvas-derivation-choice-frame" && Object.isFrozen(value)) {
        return value;
      }
      return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, freezeClassicalNahuatlVncApplicationProjectionValue(entry)])));
    }
    function getClassicalNahuatlVncApplicationSubjectCarrier(typedFrame = null) {
      const subject = typedFrame?.slots?.subject || {};
      const number = typedFrame?.slots?.number || {};
      const pers1 = normalizeClassicalNahuatlVncApplicationToken(subject.pers1 || "0");
      const pers2 = normalizeClassicalNahuatlVncApplicationToken(subject.pers2 || "0");
      const num1 = normalizeClassicalNahuatlVncApplicationToken(number.num1 || "0");
      const num2 = normalizeClassicalNahuatlVncApplicationToken(number.num2 || "0");
      return `${pers1 || "0"}-${pers2 || "0"}…${num1 || "0"}-${num2 || "0"}`;
    }
    function describeClassicalNahuatlVncApplicationObject(request = {}) {
      const objectKind = normalizeClassicalNahuatlVncApplicationToken(request.objectKind);
      const objectPerson = normalizeClassicalNahuatlVncApplicationToken(request.objectPerson);
      if (objectKind === "specific-projective") {
        return `${objectPerson || "unspecified"} specific object`;
      }
      return {
        reflexive: "reflexive object",
        "nonspecific-human": "nonspecific human object",
        "nonspecific-nonhuman": "nonspecific nonhuman object"
      }[objectKind] || "typed object";
    }
    function buildClassicalNahuatlVncDerivationProcedureProjection(selectedOption = {}, derivationType = "") {
      const construction = selectedOption.targetConstruction || {};
      const operation = normalizeClassicalNahuatlVncApplicationToken(construction.baseOperation || construction.operation || selectedOption.procedure || "");
      const preferredProcedure = normalizeClassicalNahuatlVncApplicationToken(selectedOption.preferredProcedure || "");
      const subtype = normalizeClassicalNahuatlVncApplicationToken(selectedOption.derivationSubtype || "");
      let procedureType = "typed-formation";
      let label = "Typed formation";
      let explanation = "The selected Andrews formation supplies the typed source-to-target operation.";
      if (preferredProcedure === "addition") {
        procedureType = "addition";
        label = "Addition";
        explanation = "The derivational material is added while the selected source base is retained.";
      } else if (preferredProcedure === "replacement") {
        procedureType = "replacement";
        label = "Replacement";
        explanation = "Part of the selected source base is replaced by the derivational material.";
      } else if (operation.includes("supplet")) {
        procedureType = "suppletion";
        label = "Suppletion";
        explanation = "A separately licensed base replaces the ordinary source base before the derivation is completed.";
      } else if (operation === "identity-stem-with-valence-increase") {
        procedureType = "valence-addition-without-stem-change";
        label = "Valence addition · stem unchanged";
        explanation = "The applicative participant is added without replacing or suffixing the source stem.";
      } else if (operation === "defuse-tla-and-increase-valence") {
        procedureType = "valence-addition-with-tla-defusion";
        label = "Valence addition · tla defusion";
        explanation = "The applicative participant is added while fused tla is restored as an object carrier outside the stem.";
      } else if (operation.includes("nonactive") || operation === "typed-nonactive-bridge") {
        procedureType = operation.includes("replace") ? "nonactive-base-replacement" : "nonactive-base-formation";
        label = operation.includes("replace") ? "Nonactive-base replacement" : "Nonactive-base formation";
        explanation = operation.includes("replace")
          ? "A typed nonactive base supplies the formation base, and its ending is replaced by the derivational material."
          : "A typed nonactive base supplies the formation base used by the derivational suffix.";
      } else if (operation.includes("recover") && operation.includes("append")) {
        procedureType = "base-recovery-and-addition";
        label = "Base recovery + addition";
        explanation = "The licensed underlying base is recovered and the derivational material is then added.";
      } else if (operation === "typed-o-a-to-huia") {
        procedureType = "replacement";
        label = "Replacement";
        explanation = "The inherited o-a ending is replaced by the applicative huiā formation.";
      } else if (operation.includes("replace") && (operation.includes("append") || derivationType === "applicative" && subtype === "type-one")) {
        procedureType = "replacement-and-addition";
        label = "Replacement + addition";
        explanation = "A replacive base is formed first, then the derivational suffix is added to that base.";
      } else if (operation.includes("append") || operation.includes("add")) {
        procedureType = "addition";
        label = "Addition";
        explanation = "The derivational material is added while the selected source base is retained.";
      } else if (operation.includes("replace") || operation.includes("replacive")) {
        procedureType = "replacement";
        label = "Replacement";
        explanation = "Part of the selected source base is replaced by the derivational material.";
      } else if (operation.includes("recover") && construction.add) {
        procedureType = "base-recovery-and-addition";
        label = "Base recovery + addition";
        explanation = "The licensed underlying base is recovered and the derivational material is then added.";
      } else if (operation.includes("consume-prior")) {
        procedureType = "history-based-replacement";
        label = "History-based replacement";
        explanation = "The prior Andrews formation history identifies the ending replaced by the new derivational material.";
      } else if (operation.includes("recover")) {
        procedureType = "history-based-formation";
        label = "History-based formation";
        explanation = "The selected Andrews history determines the base used for the derived stem.";
      } else if (construction.remove && construction.add) {
        procedureType = "replacement";
        label = "Replacement";
        explanation = "Part of the selected source base is replaced by the derivational material.";
      } else if (construction.add) {
        procedureType = "addition";
        label = "Addition";
        explanation = "The derivational material is added while the selected source base is retained.";
      }
      return {
        frameRole: "classical-nahuatl-vnc-derivation-procedure-projection",
        procedureType,
        label,
        explanation,
        source: "Andrews English formation description",
        grammarAuthority: false
      };
    }
    function buildClassicalNahuatlVncSourceAnalysisDisplayProjection(analysis = {}) {
      const category = normalizeClassicalNahuatlVncApplicationToken(analysis.category || "");
      const destockal = category.includes("destockal");
      const rootPlusYa = category.includes("root-plus-ya");
      const denominalTi = category === "denominal-ti-candidate";
      const hiddenNonactive = category.includes("hidden-nonactive");
      const suppletive = category.includes("suppletive");
      const labels = {
        "destockal-i-a-o-hui": "Destockal vowel + hui analysis",
        "destockal-long-vowel-hua": "Destockal long-vowel + hua analysis",
        "destockal-ni-candidate": "Destockal ni analysis",
        "destockal-hui-candidate": "Destockal hui analysis",
        "fused-destockal-ni-exact": "Fused destockal ni analysis",
        "fused-destockal-hui-exact": "Fused destockal hui analysis",
        "fused-destockal-final-i": "Fused final-i analysis",
        "root-plus-ya": "Root + ya analysis",
        "root-plus-ya-retentive-exception": "Root + ya documented exception",
        "denominal-ti-candidate": "Nominal base + ti analysis",
        "hidden-nonactive-o-hua": "Hidden o-hua nonactive base",
        "hidden-nonactive-lo": "Hidden lō nonactive base",
        "type-one-consonant-alternation": "Type 1 consonant alternation",
        "type-two-consonant-alternation": "Type 2 consonant alternation",
        "suppletive-causative-source": "Suppletive causative source",
        "directional-suppletive-causative-source": "Directional suppletive source"
      };
      const formationEffects = {
        "destockal-i-a-o-hui": "Makes the Andrews destockal replacement routes available.",
        "destockal-long-vowel-hua": "Makes the Andrews destockal replacement route available while preserving the licensed vowel quantity.",
        "destockal-ni-candidate": "Makes the Andrews destockal replacement or addition procedures available.",
        "destockal-hui-candidate": "Makes the Andrews destockal replacement or addition procedures available.",
        "fused-destockal-ni-exact": "Recovers the witnessed root, stock formative, and ni theme before replacement or addition.",
        "fused-destockal-hui-exact": "Recovers the witnessed root, stock formative, and hui theme before addition.",
        "fused-destockal-final-i": "Identifies the final-i base used by the selected Type 1 formation.",
        "root-plus-ya": "Allows Andrews to replace ya, or remove it before adding liā.",
        "root-plus-ya-retentive-exception": "Selects the documented exception that retains y and replaces the source-final a.",
        "denominal-ti-candidate": "Allows liā to be added to the complete denominal ti stem.",
        "hidden-nonactive-o-hua": "Supplies the hidden o-hua base whose ending is replaced by tiā.",
        "hidden-nonactive-lo": "Supplies the hidden lō base whose ending is replaced by tiā.",
        "type-one-consonant-alternation": "Allows the documented consonant replacement before causative a.",
        "type-two-consonant-alternation": "Allows the documented consonant alternation before tiā.",
        "suppletive-causative-source": "Requires the separately licensed suppletive causative base.",
        "directional-suppletive-causative-source": "Preserves the licensed directional element in the suppletive causative formation."
      };
      const segments = Array.isArray(analysis.segments) ? analysis.segments : [];
      const parts = segments.map((segment, index) => {
        let role = index === 0 ? "source base" : "source segment";
        if (destockal) {
          role = index === 0 ? "root" : index === segments.length - 1 ? "stem formative" : "stock formative";
        } else if (rootPlusYa) {
          role = index === 0 ? "root" : "ya stem formative";
        } else if (denominalTi) {
          role = index === 0 ? "nominal base" : "denominal ti formative";
        } else if (hiddenNonactive) {
          role = index === 0 ? "active base" : "source-final segment";
        } else if (suppletive) {
          role = index === 0 ? "suppletive source base" : "suppletive source segment";
        } else if (index === segments.length - 1 && analysis.stemFormative) {
          role = "stem-final formative";
        }
        return { segment, role };
      });
      return {
        label: labels[category] || "Andrews source analysis",
        parts,
        formationEffect: formationEffects[category] || "Identifies the source structure required by the selected Andrews formation."
      };
    }
    function groupClassicalNahuatlVncSourceAnalysisDisplayRows(rows = []) {
      const groups = new Map();
      rows.forEach(row => {
        const key = JSON.stringify((row.segments || []).map(segment => normalizeClassicalNahuatlVncApplicationStem(segment)));
        const existing = groups.get(key);
        if (!existing) {
          groups.set(key, {
            parts: row.display?.parts || [],
            readings: [row.display?.label || "Andrews source analysis"],
            formationEffects: [row.display?.formationEffect || ""].filter(Boolean),
            andrewsSections: [...(row.andrewsSections || [])],
            selectedForFormation: row.selectedForFormation === true
          });
          return;
        }
        if (row.selectedForFormation === true) existing.selectedForFormation = true;
        if (!existing.readings.includes(row.display?.label)) existing.readings.push(row.display?.label || "Andrews source analysis");
        if (row.display?.formationEffect && !existing.formationEffects.includes(row.display.formationEffect)) existing.formationEffects.push(row.display.formationEffect);
        (row.andrewsSections || []).forEach(section => {
          if (!existing.andrewsSections.includes(section)) existing.andrewsSections.push(section);
        });
      });
      return [...groups.values()];
    }
    function buildClassicalNahuatlVncDerivedStemAnalysisDisplayProjection({
      selectedOption = {},
      derivationType = "",
      sourceAnalysisDisplayGroups = [],
      bridgeRecord = null,
      targetStem = ""
    } = {}) {
      if (normalizeClassicalNahuatlVncApplicationToken(derivationType) !== "causative") {
        return null;
      }
      const construction = selectedOption.targetConstruction || {};
      const subtype = normalizeClassicalNahuatlVncApplicationToken(selectedOption.derivationSubtype || selectedOption.subtype || "");
      const addition = normalizeClassicalNahuatlVncApplicationStem(construction.add || selectedOption.suffix || "");
      const normalizedTarget = normalizeClassicalNahuatlVncApplicationStem(targetStem || selectedOption.targetStem || "");
      const selectedSourceGroup = sourceAnalysisDisplayGroups.find(group => group.selectedForFormation === true)
        || sourceAnalysisDisplayGroups[0]
        || null;
      const sourceParts = Array.isArray(selectedSourceGroup?.parts) ? selectedSourceGroup.parts : [];
      const fold = value => normalizeClassicalNahuatlVncApplicationStem(value).replace(/-/gu, "");
      const sourcePartsFolded = fold(sourceParts.map(part => part.segment).join(""));
      const removeTypedAddition = value => {
        if (!addition || !value.endsWith(addition)) return "";
        return value.slice(0, -addition.length).replace(/-+$/gu, "");
      };
      const targetBase = removeTypedAddition(normalizedTarget);
      const copySourcePartsWhenExact = expectedBase => (
        sourceParts.length && sourcePartsFolded === fold(expectedBase)
          ? sourceParts.map(part => ({ segment: part.segment, role: part.role }))
          : [{ segment: expectedBase, role: "typed source base" }]
      );
      const sections = Array.from(new Set((selectedOption.evidenceSections || [selectedOption.andrewsSection]).filter(Boolean)));
      const suffixFamily = normalizeClassicalNahuatlVncApplicationToken(
        selectedOption.licensedLesson20SuffixFamily
        || selectedOption.lesson20SuffixFamily
        || bridgeRecord?.suffixFamily
        || ""
      );
      if (subtype === "type-two" && fold(addition) === "tiā" && targetBase) {
        if (suffixFamily === "lō" && /l$/u.test(targetBase)) {
          const sourceBase = targetBase.replace(/-?l$/u, "");
          return {
            label: "Andrews derived-stem analysis",
            parts: [
              ...copySourcePartsWhenExact(sourceBase),
              { segment: "l", role: "retained nonactive formative" },
              { segment: "ti", role: "empty connective" },
              { segment: "ā", role: "causative formative" }
            ],
            process: "The lō nonactive base loses ō; l remains before tiā. The tiā unit is connective ti plus causative ā.",
            andrewsSections: sections,
            source: "Andrews §§25.1, 25.4",
            grammarAuthority: false
          };
        }
        return {
          label: "Andrews derived-stem analysis",
          parts: [
            ...copySourcePartsWhenExact(targetBase),
            { segment: "ti", role: "empty connective" },
            { segment: "ā", role: "causative formative" }
          ],
          process: "The typed nonactive ending is removed before tiā. The tiā unit is connective ti plus causative ā.",
          andrewsSections: sections,
          source: "Andrews §§25.1–25.4",
          grammarAuthority: false
        };
      }
      if (subtype === "type-two" && ["liā", "huiā"].includes(fold(addition)) && targetBase) {
        return {
          label: "Andrews derived-stem analysis",
          parts: [
            ...copySourcePartsWhenExact(targetBase),
            { segment: addition, role: "type-two causative formative" }
          ],
          process: `${addition} is the exceptional type-two causative unit selected by the typed Andrews route.`,
          andrewsSections: sections,
          source: addition === "liā" ? "Andrews §25.5" : "Andrews §25.6",
          grammarAuthority: false
        };
      }
      if (subtype === "type-one" && addition && targetBase) {
        const additionParts = addition.split("-").filter(Boolean);
        const causativeSegment = additionParts.at(-1) || addition;
        return {
          label: "Andrews derived-stem analysis",
          parts: [
            ...copySourcePartsWhenExact(targetBase),
            ...additionParts.slice(0, -1).map(segment => ({ segment, role: "replacive formation material" })),
            { segment: causativeSegment, role: "causative formative" }
          ],
          process: "The typed Lesson 24 operation supplies the retained or replacive base before the causative formative.",
          andrewsSections: sections,
          source: "Andrews Lesson 24",
          grammarAuthority: false
        };
      }
      return null;
    }
    function getClassicalNahuatlVncApplicationObjectSlotCarrier(typedFrame = null, request = {}, fallbackIndex = 0) {
      const slots = Array.isArray(typedFrame?.slots?.prePredicate) ? typedFrame.slots.prePredicate : [];
      const matchingSlot = slots.find(slot => slot?.objectPositionFrame?.objectId === request.objectId);
      return normalizeClassicalNahuatlVncApplicationToken(matchingSlot?.carrier || slots[fallbackIndex]?.carrier || "");
    }
    function buildBlockedClassicalNahuatlVncDerivationExplanationProjection(blockReason = "classical-vnc-derivation-explanation-canonical-application-required") {
      return freezeClassicalNahuatlVncApplicationProjectionValue({
        frameRole: "classical-nahuatl-vnc-derivation-explanation-projection",
        authorizationStatus: "blocked",
        blockReason,
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        derivationType: "",
        derivationProcedure: null,
        sourceVoice: "",
        selectedVoice: "",
        sourceProfile: null,
        targetProfile: null,
        formationSteps: [],
        participantRows: [],
        reverseSourceAnalyses: [],
        scope: null,
        higherLayers: [],
        evidence: null,
        referenceDimensions: [],
        grammarAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        displayTextAuthority: false
      });
    }
    function projectCanonicalClassicalNahuatlVncDerivationExplanation(applicationFrame = null, runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget()) {
      const resultFrame = applicationFrame.resultFrame;
      const operationFrame = resultFrame.derivationOperationFrame;
      const activeMachineryFrame = resultFrame.activeMachineryFrame;
      const derivationType = normalizeClassicalNahuatlVncApplicationToken(resultFrame.selectedDerivation);
      if (derivationType === "direct" || !operationFrame) {
        return buildBlockedClassicalNahuatlVncDerivationExplanationProjection("classical-vnc-derivation-explanation-derived-result-required");
      }
      const operationAuthorized = isCanonicalClassicalNahuatlVncApplicationDerivationOperation(operationFrame, runtimeTarget);
      const activeAuthorized = typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame === "function" && runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(activeMachineryFrame);
      const sourceAnalysisFrame = resultFrame.sourceAnalysisFrame || null;
      const sourceAnalysisAuthorized = isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(sourceAnalysisFrame, runtimeTarget);
      if (!operationAuthorized || !activeAuthorized || !sourceAnalysisAuthorized) {
        return buildBlockedClassicalNahuatlVncDerivationExplanationProjection();
      }
      const selectedOption = operationFrame.selectedOption || {};
      const sourceVoice = normalizeClassicalNahuatlVncApplicationToken(operationFrame.sourceVoice || operationFrame.participantTransformFrame?.sourceVoice || "active");
      const sourceAnalysisRows = (sourceAnalysisFrame.analyses || []).map(analysis => ({
        analysisId: analysis.analysisId,
        category: analysis.category,
        segments: [...analysis.segments],
        root: analysis.root,
        stockFormative: analysis.stockFormative,
        stemFormative: analysis.stemFormative,
        analysisAuthority: analysis.analysisAuthority,
        lexicalStatus: analysis.lexicalStatus,
        andrewsSections: [...analysis.andrewsSections],
        selectedForFormation: Boolean(selectedOption.sourceAnalysisId && analysis.analysisId === selectedOption.sourceAnalysisId),
        userAuthoredBoundaryRequired: false,
        display: buildClassicalNahuatlVncSourceAnalysisDisplayProjection(analysis)
      }));
      const sourceAnalysisDisplayGroups = groupClassicalNahuatlVncSourceAnalysisDisplayRows(sourceAnalysisRows);
      const sourceAnalysisCategories = Array.from(new Set(sourceAnalysisRows.map(analysis => analysis.category)));
      const participantFrame = operationFrame.participantTransformFrame || {};
      const sourceTypedFrame = operationFrame.sourceTypedVncSlotFrame;
      const formationSourceTypedFrame = operationFrame.formationSourceTypedVncSlotFrame || sourceTypedFrame;
      const activeTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(activeMachineryFrame);
      const finalTypedFrame = resultFrame.finalTypedVncSlotFrame;
      const sourceFormula = getClassicalNahuatlVncApplicationCanonicalFormula(sourceTypedFrame);
      const formationSourceFormula = getClassicalNahuatlVncApplicationCanonicalFormula(formationSourceTypedFrame);
      const activeFormula = getClassicalNahuatlVncApplicationCanonicalFormula(activeTypedFrame);
      const finalFormula = getClassicalNahuatlVncApplicationCanonicalFormula(finalTypedFrame);
      if (!sourceFormula || !formationSourceFormula || !activeFormula || !finalFormula) {
        return buildBlockedClassicalNahuatlVncDerivationExplanationProjection("classical-vnc-derivation-explanation-typed-formula-projection-required");
      }
      const sourceObjectRequests = Array.isArray(participantFrame.sourceObjectRequests) ? participantFrame.sourceObjectRequests : [];
      const targetObjectRequests = Array.isArray(participantFrame.targetObjectRequests) ? participantFrame.targetObjectRequests : [];
      const addedObjectRequest = participantFrame.addedObjectRequest || null;
      const clusterFrame = activeMachineryFrame.targetObjectClusterFrame || activeMachineryFrame.multipleObjectClusterFrame || null;
      const clusterPositions = Array.isArray(clusterFrame?.positions) ? clusterFrame.positions : [];
      const clusterLinearOrder = Array.isArray(clusterFrame?.linearOrder) ? clusterFrame.linearOrder : [];
      const targetTypedSlots = Array.isArray(activeTypedFrame?.slots?.prePredicate) ? activeTypedFrame.slots.prePredicate : [];
      const sourceSubjectCarrier = getClassicalNahuatlVncApplicationSubjectCarrier(sourceTypedFrame);
      const targetSubjectCarrier = getClassicalNahuatlVncApplicationSubjectCarrier(activeTypedFrame);
      const targetPositions = targetObjectRequests.map((request, requestIndex) => {
        const clusterPosition = clusterPositions.find(position => position.objectId === request.objectId) || null;
        const typedSlot = targetTypedSlots.find(slot => slot?.objectPositionFrame?.objectId === request.objectId) || targetTypedSlots[requestIndex] || null;
        const typedPosition = typedSlot?.objectPositionFrame || null;
        const position = clusterPosition || typedPosition;
        const linearOrderIndex = clusterLinearOrder.indexOf(request.objectId);
        const carrier = normalizeClassicalNahuatlVncApplicationToken(position?.carrier || typedSlot?.carrier || "");
        return {
          objectId: request.objectId,
          objectKind: request.objectKind,
          objectPerson: request.objectPerson,
          governor: request.governor,
          derivationalLevel: request.derivationalLevel,
          prominence: normalizeClassicalNahuatlVncApplicationToken(position?.prominence || (targetObjectRequests.length === 1 ? "mainline" : "")),
          carrier,
          sounded: position ? position.sounded === true : Boolean(carrier),
          silencingRule: normalizeClassicalNahuatlVncApplicationToken(position?.silencingRule || ""),
          carrierAuthority: normalizeClassicalNahuatlVncApplicationToken(position?.carrierAuthority || (targetObjectRequests.length === 1 ? "typed single-object VNC slot" : "")),
          linearOrder: linearOrderIndex >= 0 ? linearOrderIndex + 1 : requestIndex + 1
        };
      });
      const targetPositionById = new Map(targetPositions.map(position => [position.objectId, position]));
      const participantRows = [];
      participantRows.push({
        participantId: derivationType === "causative" ? "imported-matrix-subject" : "preserved-source-subject",
        sourceRole: derivationType === "causative" ? `${participantFrame.targetSubject} new matrix subject` : `${participantFrame.sourceSubject} source subject`,
        sourceCarrier: derivationType === "causative" ? "" : sourceSubjectCarrier,
        sourceCarrierKind: derivationType === "causative" ? "" : "subject",
        transformation: derivationType === "causative" ? "imported as outer subject" : "preserved as outer subject",
        targetRole: "outer subject",
        targetCarrier: targetSubjectCarrier,
        targetCarrierKind: "subject",
        governor: "subject",
        derivationalLevel: 0,
        prominence: "subject",
        sounded: true,
        silencingRule: ""
      });
      targetObjectRequests.slice().sort((left, right) => {
        const leftPosition = targetPositionById.get(left.objectId);
        const rightPosition = targetPositionById.get(right.objectId);
        return (leftPosition?.linearOrder || 99) - (rightPosition?.linearOrder || 99) || left.derivationalLevel - right.derivationalLevel;
      }).forEach(request => {
        const position = targetPositionById.get(request.objectId) || {};
        const sourceRequestIndex = sourceObjectRequests.findIndex(sourceRequest => sourceRequest.objectId === request.objectId);
        const isAddedObject = Boolean(addedObjectRequest && addedObjectRequest.objectId === request.objectId);
        let sourceRole = `${describeClassicalNahuatlVncApplicationObject(request)} in the source VNC`;
        let sourceCarrier = sourceRequestIndex >= 0 ? getClassicalNahuatlVncApplicationObjectSlotCarrier(sourceTypedFrame, request, sourceRequestIndex) : "";
        let transformation = "retained from the source VNC";
        let sourceCarrierKind = sourceCarrier ? "object" : "";
        if (isAddedObject && derivationType === "causative") {
          sourceRole = sourceVoice === "active" ? `${participantFrame.sourceSubject} source subject` : `implicit agent of the ${sourceVoice} source`;
          sourceCarrier = sourceVoice === "active" ? sourceSubjectCarrier : "";
          sourceCarrierKind = sourceVoice === "active" ? "subject" : "";
          transformation = sourceVoice === "active" ? "becomes the causative object" : "becomes the nonspecific causative object";
        } else if (isAddedObject && derivationType === "applicative") {
          sourceRole = `new ${describeClassicalNahuatlVncApplicationObject(request)}`;
          sourceCarrier = "";
          sourceCarrierKind = "";
          transformation = "is imported by the applicative";
        } else if (sourceVoice === "passive" && participantFrame.promotedSourceObjectRequest?.objectId === request.objectId) {
          sourceRole = `${participantFrame.participantSurfaceSubject} promoted passive subject`;
          sourceCarrier = sourceSubjectCarrier;
          sourceCarrierKind = "subject";
          transformation = request.objectKind === "reflexive" ? "returns as a coreferential reflexive shuntline object" : "returns as a shuntline source object";
        }
        participantRows.push({
          participantId: request.objectId,
          sourceRole,
          sourceCarrier,
          sourceCarrierKind,
          transformation,
          targetRole: `${position.prominence || "typed"} ${request.governor} object`,
          targetCarrier: position.carrier || "",
          targetCarrierKind: "object",
          governor: request.governor,
          derivationalLevel: request.derivationalLevel,
          prominence: position.prominence || "",
          sounded: position.sounded === true,
          silencingRule: position.silencingRule || "",
          carrierAuthority: position.carrierAuthority || "",
          linearOrder: position.linearOrder || 0
        });
      });
      const bridgeRecord = selectedOption.lesson20NonactiveStemRecord || null;
      const derivedStemAnalysis = buildClassicalNahuatlVncDerivedStemAnalysisDisplayProjection({
        selectedOption,
        derivationType,
        sourceAnalysisDisplayGroups,
        bridgeRecord,
        targetStem: operationFrame.targetStem
      });
      const selectedVoice = normalizeClassicalNahuatlVncApplicationToken(resultFrame.selectedVoice || "active");
      const selectedMachineryFrame = resultFrame.selectedMachineryFrame || null;
      const laterVoiceNonactiveRecord = selectedVoice === "passive" || selectedVoice === "impersonal"
        ? selectedMachineryFrame?.nonactiveStemRecord || null
        : null;
      const finalStem = normalizeClassicalNahuatlVncApplicationStem(selectedMachineryFrame?.voiceTransformationFrame?.targetStem || selectedMachineryFrame?.nonactiveStemRecord?.nonactiveStem || finalTypedFrame?.slots?.predicate?.stem || operationFrame.targetStem);
      const buildParticipantFormulaSegments = (formula = "", typedFrame = null, carrierSide = "target") => {
        const text = String(formula || "");
        const slots = typedFrame?.slots || {};
        const subject = slots.subject || {};
        const predicate = slots.predicate || {};
        const number = slots.number || {};
        const prePredicate = Array.isArray(slots.prePredicate) ? slots.prePredicate : [];
        const carrierKindKey = carrierSide === "source" ? "sourceCarrierKind" : "targetCarrierKind";
        const carrierKey = carrierSide === "source" ? "sourceCarrier" : "targetCarrier";
        const subjectRow = participantRows.find(row => row?.[carrierKindKey] === "subject") || null;
        const participantRowById = new Map(participantRows.map((row, participantIndex) => [row.participantId, { row, participantIndex }]));
        const objectEntries = participantRows
          .map((row, participantIndex) => ({ row, participantIndex }))
          .filter(entry => entry.row?.[carrierKindKey] === "object" && entry.row?.[carrierKey]);
        const linkedObjectIds = new Set();
        const segments = [];
        const appendSegment = (segmentText = "", participantEntry = null) => {
          if (!segmentText) return;
          if (!participantEntry) {
            segments.push({ text: segmentText });
            return;
          }
          segments.push({
            text: segmentText,
            participantId: participantEntry.row.participantId,
            participantIndex: participantEntry.participantIndex,
            carrierSide
          });
        };
        const subjectEntry = subjectRow ? participantRowById.get(subjectRow.participantId) || null : null;
        appendSegment("#");
        appendSegment(`${subject.pers1 || ""}-${subject.pers2 || ""}`, subjectEntry);
        prePredicate.forEach(slot => {
          appendSegment("+");
          const typedObjectId = slot?.objectPositionFrame?.objectId || "";
          let objectEntry = typedObjectId ? participantRowById.get(typedObjectId) || null : null;
          if (!objectEntry || objectEntry.row?.[carrierKindKey] !== "object") {
            objectEntry = objectEntries.find(entry => !linkedObjectIds.has(entry.row.participantId) && entry.row[carrierKey] === slot?.carrier) || null;
          }
          if (objectEntry) linkedObjectIds.add(objectEntry.row.participantId);
          appendSegment(slot?.carrier || "", objectEntry);
        });
        appendSegment(`(${predicate.stem || ""})${predicate.tns || ""}+`);
        appendSegment(`${number.num1 || ""}-${number.num2 || ""}`, subjectEntry);
        appendSegment("#");
        return segments.map(segment => segment.text).join("") === text ? segments : [{ text }];
      };
      const formationSteps = [{
        stage: "source",
        label: sourceVoice === "active" ? "Identified source VNC" : "Active formation basis",
        stem: operationFrame.sourceStem,
        verbClass: applicationFrame.normalizedRequest.verbClass,
        formula: formationSourceFormula,
        status: sourceVoice === "active" ? "authorized typed source" : "authorized active lexical basis",
        provisional: true
      }];
      if (sourceVoice !== "active") {
        formationSteps.push({
          stage: "source-voice",
          label: `${sourceVoice} source VNC`,
          stem: normalizeClassicalNahuatlVncApplicationStem(resultFrame.sourceMachineryFrame?.stem || operationFrame.sourceStem),
          verbClass: resultFrame.sourceMachineryFrame?.nonactiveTargetClass || applicationFrame.normalizedRequest.verbClass,
          formula: sourceFormula,
          status: "canonical participant source before causative transformation",
          provisional: true,
          sourceNonactiveOptionId: resultFrame.sourceMachineryFrame?.nonactiveStemRecord?.selectedOptionId || ""
        });
      }
      formationSteps.push({
        stage: "source-analysis",
        label: "Lessons 24–25 boundary-free source analysis",
        stem: sourceAnalysisFrame.sourceStem,
        verbClass: sourceAnalysisFrame.sourceClass,
        formula: "",
        status: "canonical engine-derived morphology",
        provisional: true,
        analysisCategories: sourceAnalysisCategories,
        analyses: sourceAnalysisRows,
        analysisDisplayGroups: sourceAnalysisDisplayGroups,
        selectedFormation: {
          targetStem: operationFrame.targetStem,
          procedureLabel: buildClassicalNahuatlVncDerivationProcedureProjection(selectedOption, derivationType).label
        },
        explicitBoundaryObserved: sourceAnalysisFrame.explicitBoundaryObserved === true,
        boundaryObservation: sourceAnalysisFrame.explicitBoundaryObserved === true
          ? "Editorial morpheme boundaries were observed in the entered spelling."
          : "No editorial morpheme boundaries were required in the entered spelling.",
        userHyphensAuthority: false,
        authorityStatement: "User-authored hyphens are observations only; they never authorize source analysis."
      });
      if (bridgeRecord) {
        formationSteps.push({
          stage: "nonactive-bridge",
          label: "Lesson 20 nonactive bridge",
          stem: bridgeRecord.nonactiveStem,
          verbClass: bridgeRecord.targetClass || applicationFrame.normalizedRequest.verbClass,
          formula: "",
          status: "required lower formation",
          provisional: true,
          ruleId: bridgeRecord.selectedRuleId
        });
      }
      formationSteps.push({
        stage: "completed-active-derivation",
        label: `Lesson ${selectedOption.formationLesson} ${derivationType}`,
        stem: operationFrame.targetStem,
        verbClass: operationFrame.targetClass,
        formula: activeFormula,
        status: selectedVoice === "active" ? "completed selected derivation" : "completed before later voice",
        provisional: selectedVoice !== "active",
        ruleId: selectedOption.ruleId,
        derivedStemAnalysis
      });
      if (selectedVoice !== "active") {
        formationSteps.push({
          stage: "later-voice",
          label: `Later ${selectedVoice} formation`,
          stem: finalStem,
          verbClass: operationFrame.targetClass,
          formula: finalFormula,
          status: "selected final voice",
          provisional: false,
          sourceStem: operationFrame.targetStem
        });
      }
      const sourceProfile = {
        label: "Identified source",
        stem: operationFrame.sourceStem,
        sourceVoice,
        verbClass: applicationFrame.normalizedRequest.verbClass,
        valence: applicationFrame.normalizedRequest.effectiveSourceValence || applicationFrame.normalizedRequest.sourceValence,
        subject: participantFrame.participantSurfaceSubject || participantFrame.sourceSubject,
        objectCount: sourceObjectRequests.length,
        formula: sourceFormula,
        participantFormulaSegments: buildParticipantFormulaSegments(sourceFormula, sourceTypedFrame, "source"),
        typedFrameKind: sourceTypedFrame.kind
      };
      const targetProfile = {
        label: "Derived active VNC",
        stem: operationFrame.targetStem,
        verbClass: operationFrame.targetClass,
        valence: activeMachineryFrame.valence,
        subject: participantFrame.targetSubject,
        objectCount: targetObjectRequests.length,
        formula: activeFormula,
        participantFormulaSegments: buildParticipantFormulaSegments(activeFormula, activeTypedFrame, "target"),
        typedFrameKind: activeTypedFrame.kind
      };
      const scopeObject = addedObjectRequest ? describeClassicalNahuatlVncApplicationObject(addedObjectRequest) : "typed object";
      const scopeDiagram = derivationType === "causative"
        ? sourceVoice === "active"
          ? `[${participantFrame.sourceSubject} source subject + ${operationFrame.sourceStem} source core] → object of CAUSE`
          : `[implicit source agent + ${sourceVoice} ${operationFrame.sourceStem} source core] → nonspecific object of CAUSE`
        : `${operationFrame.sourceStem} source core + [${scopeObject} ↔ applicative suffix]`;
      const higherLayers = [{
        order: 1,
        label: "Completed active derivation",
        value: operationFrame.targetStem,
        status: "complete"
      }, {
        order: 2,
        label: "Later voice",
        value: selectedVoice === "active" ? "not selected" : `${selectedVoice} → ${finalStem}`,
        status: selectedVoice === "active" ? "available after derivation" : "applied after derivation"
      }, {
        order: 3,
        label: "Final typed VNC",
        value: finalFormula,
        status: "final selected formula"
      }];
      const clusterAuthorities = Array.from(new Set(clusterPositions.map(position => normalizeClassicalNahuatlVncApplicationToken(position.carrierAuthority)).filter(Boolean)));
      return freezeClassicalNahuatlVncApplicationProjectionValue({
        frameRole: "classical-nahuatl-vnc-derivation-explanation-projection",
        authorizationStatus: "authorized",
        blockReason: "",
        sourceDocument: operationFrame.sourceDocument,
        derivationType,
        derivationSubtype: selectedOption.derivationSubtype,
        derivationRoute: selectedOption.derivationRoute,
        derivationProcedure: buildClassicalNahuatlVncDerivationProcedureProjection(selectedOption, derivationType),
        choiceId: operationFrame.selectedChoiceId || "",
        choiceSignature: operationFrame.selectedChoiceSignature || "",
        canvasDerivationChoiceFrame: operationFrame.selectedCanvasDerivationChoiceFrame || null,
        sourceVoice,
        selectedVoice,
        sourceProfile,
        targetProfile,
        depthLabel: `${sourceObjectRequests.length} ${sourceObjectRequests.length === 1 ? "object" : "objects"} → ${targetObjectRequests.length} ${targetObjectRequests.length === 1 ? "object" : "objects"}`,
        formationSteps,
        participantRows,
        reverseSourceAnalyses: (operationFrame.reverseSourceAnalyses || []).map(analysis => ({
          ...analysis,
          grammarAuthority: false,
          displayOnly: true
        })),
        scope: {
          model: selectedOption.scopeModel,
          section: selectedOption.scopeSection,
          rule: selectedOption.scopeRule,
          participantRule: selectedOption.participantRule,
          diagram: scopeDiagram
        },
        higherLayers,
        evidence: {
          lesson: selectedOption.formationLesson,
          sections: selectedOption.evidenceSections,
          sourceAnalysis: {
            sourceVoice: sourceAnalysisFrame.sourceVoice || "active",
            formationSourceSignature: sourceAnalysisFrame.formationSourceSignature || "",
            sourceStem: sourceAnalysisFrame.sourceStem,
            lexicalStem: sourceAnalysisFrame.lexicalStem,
            sourceClass: sourceAnalysisFrame.sourceClass,
            sourceValence: sourceAnalysisFrame.sourceValence,
            analysisCategories: sourceAnalysisCategories,
            analyses: sourceAnalysisRows,
            selectedAnalysisId: selectedOption.sourceAnalysisId || "",
            explicitBoundaryObserved: sourceAnalysisFrame.explicitBoundaryObserved === true,
            boundaryAuthority: sourceAnalysisFrame.boundaryAuthority,
            userHyphensAuthority: false,
            authorityStatement: "User-authored hyphens are observations only; they never authorize source analysis."
          },
          ruleId: selectedOption.ruleId,
          ruleTagId: selectedOption.ruleTagId,
          optionId: operationFrame.selectedOptionId,
          derivationLicenseId: selectedOption.derivationLicenseId,
          licenseStatus: selectedOption.authorityStatus,
          exactWitness: selectedOption.exactWitness === true,
          formationRuleTier: selectedOption.formationRuleTier,
          productivityStatus: selectedOption.productivityStatus,
          lexicalChoiceRequired: selectedOption.lexicalChoiceRequired === true,
          lexicalAttestations: selectedOption.lexicalEvidenceMatches || [],
          targetConstruction: selectedOption.targetConstruction,
          scopeSection: selectedOption.scopeSection,
          lesson20Bridge: bridgeRecord ? {
            sourceStem: bridgeRecord.sourceStem,
            nonactiveStem: bridgeRecord.nonactiveStem,
            suffixFamily: bridgeRecord.suffixFamily,
            ruleId: bridgeRecord.selectedRuleId,
            lexicalAttestations: bridgeRecord.lexicalEvidenceMatches || []
          } : null,
          laterVoiceNonactive: laterVoiceNonactiveRecord ? {
            sourceStem: laterVoiceNonactiveRecord.sourceStem,
            nonactiveStem: laterVoiceNonactiveRecord.nonactiveStem,
            suffixFamily: laterVoiceNonactiveRecord.suffixFamily,
            ruleId: laterVoiceNonactiveRecord.selectedRuleId,
            lexicalAttestations: laterVoiceNonactiveRecord.lexicalEvidenceMatches || []
          } : null,
          lesson23ObjectRouting: clusterFrame ? {
            section: clusterFrame.section,
            linearOrder: clusterFrame.linearOrder,
            linearCarriers: clusterFrame.linearCarriers,
            carrierAuthorities: clusterAuthorities
          } : null,
          appliedFrameKinds: resultFrame.appliedTypedFrames.map(frame => frame.kind || frame.frameRole || "typed-frame"),
          controlBoundary: "Only typed options generated for this canonical source can execute.",
          receiptBoundary: "Formula, labels, and Canvas citations explain the result; they do not authorize it."
        },
        referenceDimensions: CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATION_REFERENCE_DIMENSIONS,
        grammarAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        displayTextAuthority: false
      });
    }
    function buildClassicalNahuatlVncDerivationExplanationProjection(applicationFrame = null) {
      if (!isClassicalNahuatlVncApplicationFrame(applicationFrame)) {
        return buildBlockedClassicalNahuatlVncDerivationExplanationProjection();
      }
      return projectCanonicalClassicalNahuatlVncDerivationExplanation(applicationFrame);
    }
    function attachClassicalNahuatlVncDerivationExplanationProjection(applicationFrame = null, runtimeTarget = null) {
      if (applicationFrame?.authorizationStatus !== "authorized") {
        return applicationFrame;
      }
      const derivationExplanationProjection = projectCanonicalClassicalNahuatlVncDerivationExplanation(applicationFrame, runtimeTarget || getClassicalNahuatlVncApplicationRuntimeTarget());
      return finalizeBuiltClassicalNahuatlVncApplicationFrame({
        ...applicationFrame,
        derivationExplanationProjection
      });
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
      formationSourceMachineryFrame = null,
      sourceMachineryFrame = null,
      sourceAnalysisFrame = null,
      activeMachineryFrame = null,
      derivationOperationFrame = null,
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
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const finiteSurfaceFrame = authorizationStatus === "authorized"
        && typeof runtimeTarget?.buildClassicalNahuatlVncFiniteSurfaceFrame === "function"
        ? runtimeTarget.buildClassicalNahuatlVncFiniteSurfaceFrame(selectedMachineryFrame)
        : null;
      const surfaceRealization = finiteSurfaceFrame?.authorizationStatus === "authorized"
        ? normalizeClassicalNahuatlVncApplicationToken(finiteSurfaceFrame.wordRealization)
        : "";
      const resultFrame = {
        kind: "classical-nahuatl-vnc-application-result-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus,
        blockReason,
        selectedSourceVoice: controlFrame?.selectedSourceVoice || normalizedRequest?.sourceVoice || "active",
        selectedVoice: controlFrame?.selectedVoice || normalizedRequest?.voice || "active",
        selectedDerivation: controlFrame?.derivationType || normalizedRequest?.derivationType || "direct",
        formationSourceMachineryFrame,
        sourceMachineryFrame,
        sourceAnalysisFrame: authorizationStatus === "authorized" ? sourceAnalysisFrame : null,
        activeMachineryFrame,
        derivationOperationFrame,
        selectedCanvasDerivationChoiceFrame: derivationOperationFrame?.selectedCanvasDerivationChoiceFrame || null,
        selectedChoiceId: derivationOperationFrame?.selectedChoiceId || "",
        selectedChoiceSignature: derivationOperationFrame?.selectedChoiceSignature || "",
        selectedMachineryFrame: authorizationStatus === "authorized" ? selectedMachineryFrame : null,
        finalTypedVncSlotFrame,
        formulaRealization,
        finiteSurfaceFrame: authorizationStatus === "authorized" ? finiteSurfaceFrame : null,
        surfaceRealization,
        appliedTypedFrames: Object.freeze(authorizationStatus === "authorized" ? appliedTypedFrames.filter(Boolean) : []),
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false
      };
      return finalizeBuiltClassicalNahuatlVncApplicationFrame({
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
        const previousValidationTransaction = classicalNahuatlVncApplicationValidationTransaction;
        // Evaluation has already admitted source, analysis, and inventory frames
        // through this private transaction. Reusing those identity-bound canonical
        // results keeps the final shared-contract audit synchronous enough for a
        // live control change without weakening validation of hostile copies,
        // which always enter through a fresh public transaction.
        classicalNahuatlVncApplicationValidationTransaction = previousValidationTransaction || createClassicalNahuatlVncApplicationValidationTransaction();
        try {
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
        const validatedApplicationFrame = dependencySource.assertRegisteredGrammarContract(registry, applicationFrame, {
          contractKind: "classical-nahuatl-vnc-application-frame",
          version: 1
        });
        const projectedApplicationFrame = attachClassicalNahuatlVncDerivationExplanationProjection(validatedApplicationFrame, dependencySource);
        return dependencySource.assertRegisteredGrammarContract(registry, projectedApplicationFrame, {
          contractKind: "classical-nahuatl-vnc-application-frame",
          version: 1
        });
        } finally {
          classicalNahuatlVncApplicationValidationTransaction = previousValidationTransaction;
        }
      };
      const evaluate = (request = {}) => runClassicalNahuatlVncApplicationValidationTransaction(() => {
        const requestObject = request && typeof request === "object" ? request : {};
        const rejectedAuthorityFields = Object.freeze([...getClassicalNahuatlVncApplicationPresentFields(requestObject, CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS), ...getClassicalNahuatlVncApplicationPresentFields(requestObject.sentenceOptions, CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS).map(field => `sentenceOptions.${field}`)]);
        const unsupportedIntentFields = Object.freeze([...getClassicalNahuatlVncApplicationPresentFields(requestObject, CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS), ...getClassicalNahuatlVncApplicationPresentFields(requestObject.sentenceOptions, CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS).map(field => `sentenceOptions.${field}`)]);
        const normalizedBaseRequest = normalizeClassicalNahuatlVncApplicationRequest(requestObject);
        if (missingCapabilities.length) {
          const normalizedRequest = Object.freeze({
            ...normalizedBaseRequest,
            derivationType: "direct",
            sourceVoice: "active",
            sourceNonactiveOptionId: "",
            voice: "active"
          });
          const controlFrame = Object.freeze({
            kind: "classical-nahuatl-vnc-application-control-frame",
            version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
            authorizationStatus: "blocked",
            blockReason: "classical-vnc-application-required-capabilities-unavailable",
            requestedDerivation: normalizedBaseRequest.requestedDerivation,
            derivationType: "direct",
            allowedDerivations: Object.freeze(["direct"]),
            requestedDerivationAccepted: normalizedBaseRequest.requestedDerivation === "direct",
            derivationNormalizationReason: "required-grammar-capabilities-unavailable",
            requestedSourceVoice: normalizedBaseRequest.requestedSourceVoice,
            sourceVoice: "active",
            selectedSourceVoice: "active",
            allowedSourceVoices: Object.freeze(["active"]),
            requestedSourceVoiceAccepted: normalizedBaseRequest.requestedSourceVoice === "active",
            sourceVoiceNormalizationReason: "required-grammar-capabilities-unavailable",
            sourceNonactiveOptionInventory: null,
            sourceNonactiveSelectorRequired: false,
            selectedSourceNonactiveOptionId: "",
            sourceAnalysisFrame: null,
            derivationOptionInventory: null,
            derivationSelectorRequired: false,
            selectedDerivationOptionId: "",
            derivedStem: "",
            derivedClass: "",
            targetObjectCount: 0,
            causativeObjectKindChoiceEligible: false,
            allowedCausativeObjectKinds: Object.freeze([]),
            causativeObjectKindSelectionRequired: false,
            selectedCausativeObjectKind: "",
            causativeReferentRelationChoiceEligible: false,
            allowedCausativeReferentRelations: Object.freeze([]),
            causativeReferentRelationSelectionRequired: false,
            selectedCausativeReferentRelation: "",
            causativeSpecificShuntlineChoiceEligible: false,
            allowedCausativeSpecificShuntlineRealizations: Object.freeze([]),
            causativeSpecificShuntlineSelectionRequired: false,
            selectedCausativeSpecificShuntlineRealization: "",
            requestedVoice: normalizedBaseRequest.requestedVoice,
            selectedVoice: "active",
            allowedVoices: Object.freeze(["active"]),
            requestedVoiceAccepted: normalizedBaseRequest.requestedVoice === "active",
            voiceNormalizationReason: "required-grammar-capabilities-unavailable",
            nonactiveOptionInventory: null,
            nonactiveSelectorRequired: false,
            selectedNonactiveOptionId: ""
          });
          return attachClassicalNahuatlVncDerivationExplanationProjection(buildClassicalNahuatlVncApplicationFrame({
            normalizedRequest,
            controlFrame,
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: "classical-vnc-application-required-capabilities-unavailable"
          }), dependencySource);
        }
        const formationSourceMachineryFrame = buildClassicalNahuatlVncApplicationSourceMachinery(dependencySource, normalizedBaseRequest);
        const formationSourceAuthorized = isClassicalNahuatlVncApplicationActiveFrameAuthorized(formationSourceMachineryFrame);
        const sourceNonactiveOptionInventory = dependencySource.getClassicalNahuatlLesson20NonactiveStemOptions(normalizedBaseRequest.sourceStem, {
          verbClass: normalizedBaseRequest.verbClass,
          sourceValence: normalizedBaseRequest.sourceValence
        });
        let allowedSourceVoices = normalizedBaseRequest.derivationType === "causative" && formationSourceAuthorized
          ? Object.freeze(getClassicalNahuatlVncApplicationAllowedVoices({
            sourceStem: normalizedBaseRequest.sourceStem,
            sourceValence: normalizedBaseRequest.sourceValence,
            outputScope: "single",
            nonactiveOptionInventory: sourceNonactiveOptionInventory,
            objectRequests: normalizedBaseRequest.sourceObjectRequests
          }).filter(voice => CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES.includes(voice)))
          : Object.freeze(["active"]);
        if (!allowedSourceVoices.length) {
          allowedSourceVoices = Object.freeze(["active"]);
        }
        const selectedSourceVoice = allowedSourceVoices.includes(normalizedBaseRequest.sourceVoice) ? normalizedBaseRequest.sourceVoice : "active";
        let sourceVoiceNormalizationReason = "";
        if (!normalizedBaseRequest.requestedSourceVoiceRecognized) {
          sourceVoiceNormalizationReason = "unknown-source-voice-normalized-to-active";
        } else if (normalizedBaseRequest.derivationType !== "causative" && normalizedBaseRequest.sourceVoice !== "active") {
          sourceVoiceNormalizationReason = "source-voice-applies-only-before-causative-derivation";
        } else if (selectedSourceVoice !== normalizedBaseRequest.sourceVoice) {
          sourceVoiceNormalizationReason = "requested-source-voice-not-authorized-for-source";
        }
        const selectedSourceNonactiveOptionId = selectedSourceVoice === "active"
          ? ""
          : normalizeClassicalNahuatlVncApplicationToken(normalizedBaseRequest.sourceNonactiveOptionId || sourceNonactiveOptionInventory?.automaticOptionId || "");
        const sourceVoiceBundle = buildClassicalNahuatlVncApplicationSourceVoiceMachinery(dependencySource, formationSourceMachineryFrame, {
          ...normalizedBaseRequest,
          sourceVoice: selectedSourceVoice,
          sourceNonactiveOptionId: selectedSourceNonactiveOptionId
        }, {
          sourceVoice: selectedSourceVoice,
          sourceNonactiveOptionInventory
        });
        const sourceMachineryFrame = sourceVoiceBundle.sourceMachineryFrame;
        const sourceAuthorized = formationSourceAuthorized
          && isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(sourceMachineryFrame, dependencySource);
        const sourceAnalysisCandidate = sourceAuthorized
          ? dependencySource.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceMachineryFrame)
          : null;
        const sourceAnalysisAuthorized = Boolean(sourceAnalysisCandidate
          && isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(sourceAnalysisCandidate, dependencySource)
          && sourceAnalysisCandidate.sourceMachineryFrame === sourceMachineryFrame);
        let sourceAnalysisFrame = sourceAnalysisAuthorized ? sourceAnalysisCandidate : null;
        const requestedDerivation = normalizedBaseRequest.derivationType;
        let derivationOptionInventory = null;
        let derivationOperationFrame = null;
        let participantChoicePreviewOperationFrame = null;
        let causativeReferentRelationChoicePending = false;
        let activeMachineryFrame = sourceMachineryFrame;
        if (requestedDerivation !== "direct" && sourceAnalysisAuthorized) {
          derivationOptionInventory = dependencySource.getClassicalNahuatlVncDerivationOptionInventory(sourceMachineryFrame, {
            derivationType: requestedDerivation,
            sourceValence: normalizedBaseRequest.sourceValence,
            verbClass: normalizedBaseRequest.verbClass
          });
          const inventorySourceAnalysisCanonical = derivationOptionInventory?.authorizationStatus === "authorized"
            && Boolean(derivationOptionInventory.canonicalSignature)
            && isCanonicalClassicalNahuatlVncApplicationDerivationInventory(derivationOptionInventory, dependencySource)
            && derivationOptionInventory.sourceSignature === sourceAnalysisFrame.sourceSignature
            && derivationOptionInventory.sourceMachineryFrame === sourceMachineryFrame
            && isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(derivationOptionInventory.sourceAnalysisFrame, dependencySource)
            && derivationOptionInventory.sourceAnalysisFrame.sourceSignature === sourceAnalysisFrame.sourceSignature
            && areClassicalNahuatlVncApplicationCanonicalValuesEqual(derivationOptionInventory.sourceAnalysisFrame, sourceAnalysisFrame);
          if (inventorySourceAnalysisCanonical) {
            sourceAnalysisFrame = derivationOptionInventory.sourceAnalysisFrame;
          }
          const causativeReferentRelationChoiceRequested = requestedDerivation === "causative"
            && selectedSourceVoice === "active"
            && normalizedBaseRequest.subject === normalizedBaseRequest.sourceSubject
            && !["1sg", "2sg"].includes(normalizedBaseRequest.subject)
            && !normalizedBaseRequest.causativeReferentRelation;
          const derivationOperationRequest = buildClassicalNahuatlVncApplicationDerivationOperationRequest({
            ...normalizedBaseRequest,
            sourceVoice: selectedSourceVoice
          });
          // A sounded/silent specific shuntline is downstream from the typed
          // participant transform. Build the operation without that intent
          // first, then apply it only when the canonical transform says that
          // this choice exists. This keeps stale UI state out of grammar input
          // without making the renderer probe or reconstruct the rule.
          delete derivationOperationRequest.causativeSpecificShuntlineRealization;
          const participantChoicePreviewRequest = causativeReferentRelationChoiceRequested
            ? buildClassicalNahuatlVncApplicationDerivationOperationRequest({
              ...normalizedBaseRequest,
              sourceVoice: selectedSourceVoice,
              // A provisional distinction completes only the typed
              // eligibility probe. The application remains pending until the
              // writer chooses distinct or coreferential participants.
              causativeReferentRelation: "distinct"
            })
            : derivationOperationRequest;
          delete participantChoicePreviewRequest.causativeSpecificShuntlineRealization;
          participantChoicePreviewOperationFrame = inventorySourceAnalysisCanonical
            ? deriveClassicalNahuatlVncApplicationOperationFromCanonicalInventory(dependencySource, sourceMachineryFrame, derivationOptionInventory, participantChoicePreviewRequest)
            : null;
          if (!causativeReferentRelationChoiceRequested
            && participantChoicePreviewOperationFrame?.participantTransformFrame?.causativeSpecificShuntlineChoiceEligible === true
            && CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_SPECIFIC_SHUNTLINE_REALIZATIONS.includes(normalizedBaseRequest.causativeSpecificShuntlineRealization)) {
            participantChoicePreviewOperationFrame = deriveClassicalNahuatlVncApplicationOperationFromCanonicalInventory(dependencySource, sourceMachineryFrame, derivationOptionInventory, {
              ...participantChoicePreviewRequest,
              causativeSpecificShuntlineRealization: normalizedBaseRequest.causativeSpecificShuntlineRealization
            });
          }
          // The participant choice belongs after a canonical formation has been
          // selected. A blocked preview (for example, because several generated
          // formations still require a choice) has no participant transform and
          // must preserve that earlier block instead of manufacturing a
          // participant gate with no eligible controls.
          causativeReferentRelationChoicePending = causativeReferentRelationChoiceRequested
            && participantChoicePreviewOperationFrame?.authorizationStatus === "authorized"
            && participantChoicePreviewOperationFrame?.participantTransformFrame?.causativeReferentRelationChoiceEligible === true;
          derivationOperationFrame = causativeReferentRelationChoicePending ? null : participantChoicePreviewOperationFrame;
          activeMachineryFrame = derivationOperationFrame?.authorizationStatus === "authorized" ? dependencySource.buildClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, derivationOperationFrame, {
            mood: normalizedBaseRequest.mood,
            tense: normalizedBaseRequest.tense,
            targetSubject: normalizedBaseRequest.subject,
            sentenceOptions: buildClassicalNahuatlVncApplicationLesson7Options(normalizedBaseRequest)
          }) : null;
        }
        const derivationOperationAuthorized = requestedDerivation === "direct" || Boolean(
          derivationOperationFrame?.authorizationStatus === "authorized"
          && Boolean(derivationOperationFrame.canonicalSignature)
          && derivationOptionInventory?.sourceAnalysisFrame === sourceAnalysisFrame
        );
        const activeAuthorized = isClassicalNahuatlVncApplicationActiveFrameAuthorized(activeMachineryFrame);
        const targetStem = requestedDerivation === "direct"
          ? normalizedBaseRequest.sourceStem
          : getClassicalNahuatlVncApplicationOperationTargetStem(derivationOperationFrame);
        const targetClass = requestedDerivation === "direct"
          ? normalizedBaseRequest.verbClass
          : getClassicalNahuatlVncApplicationOperationTargetClass(derivationOperationFrame, normalizedBaseRequest.verbClass);
        const targetObjectRequests = requestedDerivation === "direct"
          ? normalizedBaseRequest.sourceObjectRequests
          : getClassicalNahuatlVncApplicationOperationObjectRequests(derivationOperationFrame);
        const effectiveSourceValence = normalizedBaseRequest.tlaFusion === true ? "projective-nonhuman" : normalizedBaseRequest.sourceValence;
        const targetValence = requestedDerivation === "direct"
          ? targetObjectRequests.length > 1 ? "multiple-object" : effectiveSourceValence
          : getClassicalNahuatlVncApplicationTargetValence(derivationOperationFrame, effectiveSourceValence);
        const nonactiveOptionInventory = dependencySource.getClassicalNahuatlLesson20NonactiveStemOptions(targetStem, {
          verbClass: targetClass,
          sourceValence: targetValence
        });
        let allowedVoices = getClassicalNahuatlVncApplicationAllowedVoices({
          sourceStem: activeAuthorized && (requestedDerivation === "direct" || sourceAnalysisAuthorized) ? targetStem : "",
          sourceValence: targetValence,
          outputScope: normalizedBaseRequest.outputScope,
          nonactiveOptionInventory,
          objectRequests: targetObjectRequests
        });
        let selectedVoice = allowedVoices.includes(normalizedBaseRequest.voice) ? normalizedBaseRequest.voice : "active";
        let voiceNormalizationReason = "";
        if (!normalizedBaseRequest.requestedVoiceRecognized) {
          voiceNormalizationReason = "unknown-voice-normalized-to-active";
        } else if (normalizedBaseRequest.outputScope === "paradigm" && normalizedBaseRequest.voice !== "active") {
          voiceNormalizationReason = "full-paradigm-requires-active-voice";
        } else if (!targetStem && normalizedBaseRequest.voice !== "active") {
          voiceNormalizationReason = "source-stem-required-before-derived-voice";
        } else if (selectedVoice !== normalizedBaseRequest.voice) {
          voiceNormalizationReason = "requested-voice-not-authorized-for-source";
        }
        if ((!activeAuthorized || requestedDerivation !== "direct" && !sourceAnalysisAuthorized) && selectedVoice !== "active") {
          allowedVoices = Object.freeze(["active"]);
          selectedVoice = "active";
          voiceNormalizationReason = requestedDerivation === "direct" ? "active-source-analysis-must-authorize-before-derived-voice" : "completed-active-derivation-must-authorize-before-derived-voice";
        }
        const selectedDerivationOptionId = (derivationOperationFrame || participantChoicePreviewOperationFrame)?.selectedOptionId || (derivationOperationFrame || participantChoicePreviewOperationFrame)?.selectedOption?.optionId || "";
        const selectedCanvasDerivationChoiceFrame = (derivationOperationFrame || participantChoicePreviewOperationFrame)?.selectedCanvasDerivationChoiceFrame || null;
        const causativeParticipantChoiceControls = getClassicalNahuatlVncApplicationCausativeParticipantChoiceControls(derivationOperationFrame || participantChoicePreviewOperationFrame, normalizedBaseRequest);
        const derivationNormalizationReason = !normalizedBaseRequest.requestedDerivationRecognized ? "unknown-derivation-normalized-to-direct" : "";
        const normalizedRequest = Object.freeze({
          ...normalizedBaseRequest,
          sourceVoice: selectedSourceVoice,
          sourceNonactiveOptionId: sourceVoiceBundle.selectedSourceNonactiveOptionId || "",
          causativeReferentRelation: causativeParticipantChoiceControls.selectedCausativeReferentRelation || "",
          causativeSpecificShuntlineRealization: causativeParticipantChoiceControls.selectedCausativeSpecificShuntlineRealization || "",
          voice: selectedVoice,
          effectiveSourceValence,
          targetStem,
          targetClass,
          targetValence
        });
        const controlFrameBase = {
          kind: "classical-nahuatl-vnc-application-control-frame",
          version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
          authorizationStatus: "authorized",
          blockReason: "",
          requestedDerivation: normalizedBaseRequest.requestedDerivation,
          derivationType: requestedDerivation,
          allowedDerivations: CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS,
          requestedDerivationAccepted: normalizedBaseRequest.requestedDerivationRecognized
            && (requestedDerivation === "direct" || sourceAnalysisAuthorized)
            && derivationOperationAuthorized,
          derivationNormalizationReason,
          requestedSourceVoice: normalizedBaseRequest.requestedSourceVoice,
          sourceVoice: selectedSourceVoice,
          selectedSourceVoice,
          allowedSourceVoices,
          requestedSourceVoiceAccepted: selectedSourceVoice === normalizedBaseRequest.requestedSourceVoice,
          sourceVoiceNormalizationReason,
          sourceNonactiveOptionInventory,
          sourceNonactiveSelectorRequired: selectedSourceVoice !== "active" && sourceNonactiveOptionInventory?.selectorRequired === true,
          selectedSourceNonactiveOptionId: sourceVoiceBundle.selectedSourceNonactiveOptionId || "",
          sourceAnalysisFrame,
          derivationOptionInventory,
          selectedCanvasDerivationChoiceFrame,
          selectedChoiceId: selectedCanvasDerivationChoiceFrame?.identity?.choiceId || "",
          selectedChoiceSignature: selectedCanvasDerivationChoiceFrame?.canonicalSignature || "",
          derivationSelectorRequired: requestedDerivation !== "direct" && derivationOptionInventory?.selectorRequired === true,
          selectedDerivationOptionId,
          derivedStem: requestedDerivation === "direct" ? "" : targetStem,
          derivedClass: requestedDerivation === "direct" ? "" : targetClass,
          targetObjectCount: targetObjectRequests.length,
          ...causativeParticipantChoiceControls,
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
            blockReason: "classical-vnc-application-intent-outside-derivation-and-single-voice-scope"
          });
          return validateSharedApplicationFrame(buildClassicalNahuatlVncApplicationFrame({
            normalizedRequest,
            controlFrame,
            formationSourceMachineryFrame,
            sourceMachineryFrame,
            sourceAnalysisFrame,
            activeMachineryFrame,
            derivationOperationFrame,
            selectedMachineryFrame: activeMachineryFrame,
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: "classical-vnc-application-intent-outside-derivation-and-single-voice-scope"
          }));
        }
        if (causativeReferentRelationChoicePending && sourceAuthorized && sourceAnalysisAuthorized) {
          const choiceBlockReason = "classical-vnc-causative-equal-person-category-referent-choice-required";
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: choiceBlockReason
          });
          return validateSharedApplicationFrame(buildClassicalNahuatlVncApplicationFrame({
            normalizedRequest,
            controlFrame,
            formationSourceMachineryFrame,
            sourceMachineryFrame,
            sourceAnalysisFrame,
            activeMachineryFrame: null,
            derivationOperationFrame: null,
            selectedMachineryFrame: null,
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: choiceBlockReason
          }));
        }
        if (requestedDerivation !== "direct" && (!sourceAuthorized || !sourceAnalysisAuthorized || !derivationOperationAuthorized || !activeAuthorized)) {
          const derivationBlockReason = !sourceAuthorized
            ? getClassicalNahuatlVncApplicationBlockReason(sourceMachineryFrame, "classical-vnc-derivation-authorized-source-required")
            : !sourceAnalysisAuthorized
              ? "classical-vnc-derivation-source-analysis-not-authorized"
            : !derivationOperationAuthorized
              ? normalizeClassicalNahuatlVncApplicationToken(derivationOperationFrame?.blockReason || derivationOptionInventory?.blockReason || "classical-vnc-derivation-operation-not-authorized")
              : getClassicalNahuatlVncApplicationBlockReason(activeMachineryFrame, "classical-vnc-derived-machinery-not-authorized");
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: derivationBlockReason
          });
          return validateSharedApplicationFrame(buildClassicalNahuatlVncApplicationFrame({
            normalizedRequest,
            controlFrame,
            formationSourceMachineryFrame,
            sourceMachineryFrame,
            sourceAnalysisFrame,
            activeMachineryFrame,
            derivationOperationFrame,
            selectedMachineryFrame: activeMachineryFrame,
            appliedTypedFrames: [sourceMachineryFrame?.nonactiveStemRecord, sourceMachineryFrame?.voiceTransformationFrame, sourceAnalysisFrame, derivationOperationFrame, derivationOperationFrame?.participantTransformFrame],
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: derivationBlockReason
          }));
        }
        let selectedMachineryFrame = activeMachineryFrame;
        let nonactiveStemRecord = null;
        let inherentImpersonalRecord = null;
        let tlaImpersonalStemRecord = null;
        if (activeAuthorized && (selectedVoice === "passive" || selectedVoice === "impersonal")) {
          nonactiveStemRecord = dependencySource.deriveClassicalNahuatlLesson20NonactiveStemRecord(targetStem, {
            verbClass: targetClass,
            sourceValence: targetValence,
            optionId: normalizedRequest.nonactiveOptionId
          });
        }
        if (activeAuthorized && selectedVoice === "inherent-impersonal") {
          inherentImpersonalRecord = dependencySource.buildClassicalNahuatlLesson22InherentImpersonalRecord(targetStem, {
            selectionAuthority: "andrews-lesson22-voice-selection"
          });
        }
        if (activeAuthorized && selectedVoice === "tla-impersonal") {
          const derivedTlaStem = targetStem ? `tla-${targetStem.replace(/^tla-/u, "")}` : "";
          tlaImpersonalStemRecord = dependencySource.buildClassicalNahuatlLesson22TlaImpersonalStemRecord(targetStem, {
            impersonalStem: derivedTlaStem,
            selectionAuthority: "andrews-lesson22-rule-derivation"
          });
        }
        if (activeAuthorized && selectedVoice !== "active") {
          const firstSpecificObject = targetObjectRequests.find(objectRequest => objectRequest?.objectKind === "specific-projective") || targetObjectRequests[0] || null;
          const targetLesson7Options = buildClassicalNahuatlVncApplicationLesson7Options({
            ...normalizedRequest,
            sourceStem: targetStem,
            verbClass: targetClass,
            sourceValence: targetValence,
            objectKind: firstSpecificObject?.objectKind || normalizedRequest.objectKind,
            objectPerson: firstSpecificObject?.objectPerson || normalizedRequest.objectPerson,
            tlaFusion: false
          });
          selectedMachineryFrame = dependencySource.buildClassicalNahuatlLessons20To22DerivedVncFrame(activeMachineryFrame, {
            voice: selectedVoice,
            nonactiveStemRecord,
            inherentImpersonalRecord,
            tlaImpersonalStemRecord,
            sourceObjectClusterFrame: activeMachineryFrame?.targetObjectClusterFrame || activeMachineryFrame?.multipleObjectClusterFrame || null,
            sourceValence: targetValence,
            sourceSubject: normalizedRequest.subject,
            sourceObjectPerson: firstSpecificObject?.objectPerson || activeMachineryFrame?.priorVncFrame?.objectFrame?.objectPerson || "",
            mood: normalizedRequest.mood,
            tense: normalizedRequest.tense,
            verbClass: targetClass,
            sentenceOptions: targetLesson7Options
          });
        }
        const selectedMachineryAuthorized = (requestedDerivation === "direct" || sourceAnalysisAuthorized)
          && isClassicalNahuatlVncApplicationActiveFrameAuthorized(selectedMachineryFrame);
        const controlFrame = Object.freeze({
          ...controlFrameBase,
          authorizationStatus: selectedMachineryAuthorized ? "authorized" : "blocked",
          blockReason: selectedMachineryAuthorized ? "" : getClassicalNahuatlVncApplicationBlockReason(selectedMachineryFrame, "classical-vnc-application-result-not-authorized"),
          selectedNonactiveOptionId: nonactiveStemRecord?.selectedOptionId || ""
        });
        return validateSharedApplicationFrame(buildClassicalNahuatlVncApplicationFrame({
          normalizedRequest,
          controlFrame,
          formationSourceMachineryFrame,
          sourceMachineryFrame,
          sourceAnalysisFrame,
          activeMachineryFrame,
          derivationOperationFrame,
          selectedMachineryFrame,
          appliedTypedFrames: [sourceMachineryFrame?.nonactiveStemRecord, sourceMachineryFrame?.voiceTransformationFrame, sourceAnalysisFrame, derivationOperationFrame, derivationOperationFrame?.participantTransformFrame, nonactiveStemRecord, inherentImpersonalRecord, tlaImpersonalStemRecord, selectedMachineryFrame?.voiceTransformationFrame],
          missingCapabilities,
          rejectedAuthorityFields,
          unsupportedIntentFields
        }));
      });
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
        CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES,
        createClassicalNahuatlVncApplication,
        evaluateClassicalNahuatlVncApplication: service.evaluate,
        isClassicalNahuatlVncApplicationResultFrame,
        isClassicalNahuatlVncApplicationFrame,
        buildClassicalNahuatlVncDerivationExplanationProjection,
        getClassicalNahuatlVncApplicationAllowedVoices,
        normalizeClassicalNahuatlVncApplicationRequest,
        buildClassicalNahuatlVncApplicationSourceVoiceMachinery,
        classicalNahuatlVncApplication: service
      });
      return globalTarget;
    }
    if (typeof targetObject.module !== "undefined" && targetObject.module.exports) {
      targetObject.module.exports = {
        CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES,
        CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES,
        CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES,
        CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS,
        CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS,
        CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATION_REFERENCE_DIMENSIONS,
        normalizeClassicalNahuatlVncApplicationRequest,
        getClassicalNahuatlVncApplicationAllowedVoices,
        buildClassicalNahuatlVncApplicationSourceVoiceMachinery,
        getClassicalNahuatlVncApplicationMissingCapabilities,
        createClassicalNahuatlVncApplication,
        evaluateClassicalNahuatlVncApplication,
        isClassicalNahuatlVncApplicationResultFrame,
        isClassicalNahuatlVncApplicationFrame,
        buildClassicalNahuatlVncDerivationExplanationProjection,
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
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS; },
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
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATION_REFERENCE_DIMENSIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATION_REFERENCE_DIMENSIONS; },
    });
    api.normalizeClassicalNahuatlVncApplicationToken = normalizeClassicalNahuatlVncApplicationToken;
    api.normalizeClassicalNahuatlVncApplicationStem = normalizeClassicalNahuatlVncApplicationStem;
    api.hasClassicalNahuatlVncApplicationValue = hasClassicalNahuatlVncApplicationValue;
    api.getClassicalNahuatlVncApplicationPresentFields = getClassicalNahuatlVncApplicationPresentFields;
    api.getClassicalNahuatlVncApplicationRuntimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget;
    api.getClassicalNahuatlVncApplicationMissingCapabilities = getClassicalNahuatlVncApplicationMissingCapabilities;
    api.getClassicalNahuatlVncApplicationObjectKind = getClassicalNahuatlVncApplicationObjectKind;
    api.normalizeClassicalNahuatlVncApplicationDerivation = normalizeClassicalNahuatlVncApplicationDerivation;
    api.normalizeClassicalNahuatlVncApplicationObjectRequest = normalizeClassicalNahuatlVncApplicationObjectRequest;
    api.getClassicalNahuatlVncApplicationSourceObjectRequests = getClassicalNahuatlVncApplicationSourceObjectRequests;
    api.getClassicalNahuatlVncApplicationValenceForObject = getClassicalNahuatlVncApplicationValenceForObject;
    api.getClassicalNahuatlVncApplicationRequestValue = getClassicalNahuatlVncApplicationRequestValue;
    api.buildClassicalNahuatlVncApplicationSentenceOptions = buildClassicalNahuatlVncApplicationSentenceOptions;
    api.normalizeClassicalNahuatlVncApplicationRequest = normalizeClassicalNahuatlVncApplicationRequest;
    api.getClassicalNahuatlVncApplicationAllowedVoices = getClassicalNahuatlVncApplicationAllowedVoices;
    api.buildClassicalNahuatlVncApplicationLesson7Options = buildClassicalNahuatlVncApplicationLesson7Options;
    api.buildClassicalNahuatlVncApplicationSourceMachinery = buildClassicalNahuatlVncApplicationSourceMachinery;
    api.buildClassicalNahuatlVncApplicationSourceVoiceMachinery = buildClassicalNahuatlVncApplicationSourceVoiceMachinery;
    api.getClassicalNahuatlVncApplicationOperationObjectRequests = getClassicalNahuatlVncApplicationOperationObjectRequests;
    api.getClassicalNahuatlVncApplicationOperationTargetStem = getClassicalNahuatlVncApplicationOperationTargetStem;
    api.getClassicalNahuatlVncApplicationOperationTargetClass = getClassicalNahuatlVncApplicationOperationTargetClass;
    api.getClassicalNahuatlVncApplicationTargetValence = getClassicalNahuatlVncApplicationTargetValence;
    api.getClassicalNahuatlVncApplicationFinalTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame;
    api.isClassicalNahuatlVncApplicationResultFrame = isClassicalNahuatlVncApplicationResultFrame;
    api.isClassicalNahuatlVncApplicationFrame = isClassicalNahuatlVncApplicationFrame;
    api.buildClassicalNahuatlVncDerivationExplanationProjection = buildClassicalNahuatlVncDerivationExplanationProjection;
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
