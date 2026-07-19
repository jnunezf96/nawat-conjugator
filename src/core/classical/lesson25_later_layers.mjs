// Canonical modern ESM module.

export function createClassicalNahuatlLesson25LaterLayersRuntime(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION = 1;
    const CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_LESSON25_MOOD_TRANSFORMATION_KIND = "classical-nahuatl-lesson25-mood-transformation-frame";
    const CLASSICAL_NAHUATL_LESSON25_EXACT_QUANTITY_FINALIZER_KIND = "classical-nahuatl-lesson25-exact-quantity-finalizer-frame";
    const CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND = "classical-nahuatl-vnc-finite-surface-frame";
    const CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND = "classical-nahuatl-lessons24-25-canvas-citation-projection-frame";
    const CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_INVENTORY_KIND = "classical-nahuatl-lessons24-25-canvas-citation-projection-inventory";
    const CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CITATION_POSSIBILITY_INVENTORY_KIND = "classical-nahuatl-lessons24-25-canvas-schematic-citation-possibility-inventory";
    const CLASSICAL_NAHUATL_LESSON2513_ALTERNATIVE_SOURCE_PROJECTION_KIND = "classical-nahuatl-lesson25-13-alternative-source-projection-frame";
    const CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES = Object.freeze([
      Object.freeze({ profileId: "specific-projective-distinct", causativeObjectKind: "specific-projective", targetSubject: "1sg", causativeReferentRelation: "" }),
      Object.freeze({ profileId: "nonspecific-human", causativeObjectKind: "nonspecific-human", targetSubject: "1sg", causativeReferentRelation: "" }),
      Object.freeze({ profileId: "nonspecific-nonhuman", causativeObjectKind: "nonspecific-nonhuman", targetSubject: "1sg", causativeReferentRelation: "" }),
      Object.freeze({ profileId: "coreferential-reflexive", causativeObjectKind: "specific-projective", targetSubject: "3sg", causativeReferentRelation: "coreferential" })
    ]);
    const CLASSICAL_NAHUATL_LESSON25_MOOD_TARGETS = Object.freeze([
      "wish",
      "command",
      "exhortation",
      "indirect-admonition"
    ]);
    const CLASSICAL_NAHUATL_LESSON25_MOOD_RULE_REFS = Object.freeze([Object.freeze({
      id: "cn-l25-2514-causative-vnc-mood-transformations",
      lesson: 25,
      section: "25.14",
      transcriptionLineStart: 8819,
      transcriptionLineEnd: 8834,
      rule: "An authorized causative assertion may be rebuilt in the finite environment required by a wish, command, exhortation, or admonition sentence."
    }), Object.freeze({
      id: "cn-l25-2514-lower-mood-machinery-remains-authority",
      lesson: 25,
      section: "25.14",
      transcriptionLineStart: 8819,
      transcriptionLineEnd: 8834,
      rule: "Lesson 25 preserves the causative stem and participants while Lessons 9 and 10 determine mood, sentence role, and introductory particle."
    })]);
    const CLASSICAL_NAHUATL_LESSON25_FORBIDDEN_OUTPUT_FIELDS = Object.freeze([
      "formula",
      "formulaRealization",
      "introductoryParticle",
      "mood",
      "objectRequests",
      "particle",
      "result",
      "sentenceRealization",
      "sentenceRole",
      "sourcePredicateQuantityFrame",
      "sourceWordRealization",
      "subject",
      "surface",
      "targetFormula",
      "targetStem",
      "targetSurface",
      "targetWord",
      "tense",
      "wordRealization"
    ]);
    const CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SURFACE_FORBIDDEN_FIELDS = Object.freeze([
      "citationRealization",
      "expected",
      "formula",
      "result",
      "sourcePredicateQuantityFrame",
      "sourceWordRealization",
      "surface",
      "target",
      "targetCitation",
      "targetSurface",
      "targetWord",
      "word",
      "wordRealization"
    ]);

    function getClassicalNahuatlLesson25RuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function normalizeClassicalNahuatlLesson25Token(value = "") {
      return String(value == null ? "" : value).trim();
    }
    function normalizeClassicalNahuatlLesson25Key(value = "") {
      return normalizeClassicalNahuatlLesson25Token(value).toLowerCase().replace(/[\s_]+/gu, "-");
    }
    function stableSerializeClassicalNahuatlLesson25Value(value) {
      if (value === null) {
        return "null";
      }
      if (Array.isArray(value)) {
        return `[${value.map(stableSerializeClassicalNahuatlLesson25Value).join(",")}]`;
      }
      if (typeof value === "object") {
        return `{${Object.keys(value).sort().filter(key => value[key] !== undefined).map(key => `${JSON.stringify(key)}:${stableSerializeClassicalNahuatlLesson25Value(value[key])}`).join(",")}}`;
      }
      return JSON.stringify(value);
    }
    function signClassicalNahuatlLesson25Value(value) {
      const serialized = stableSerializeClassicalNahuatlLesson25Value(value);
      let hash = 2166136261;
      for (let index = 0; index < serialized.length; index += 1) {
        hash ^= serialized.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
      }
      return `v1:${(hash >>> 0).toString(16).padStart(8, "0")}`;
    }
    function areClassicalNahuatlLesson25ValuesEqual(left, right) {
      return stableSerializeClassicalNahuatlLesson25Value(left) === stableSerializeClassicalNahuatlLesson25Value(right);
    }
    function haveSameClassicalNahuatlLesson25OwnPropertyNames(left = null, right = null) {
      if (!left || !right || typeof left !== "object" || typeof right !== "object") {
        return false;
      }
      const leftNames = Object.getOwnPropertyNames(left).sort();
      const rightNames = Object.getOwnPropertyNames(right).sort();
      return areClassicalNahuatlLesson25ValuesEqual(leftNames, rightNames);
    }
    function freezeClassicalNahuatlLesson25Value(value) {
      if (!value || typeof value !== "object" || Object.isFrozen(value)) {
        return value;
      }
      Object.values(value).forEach(freezeClassicalNahuatlLesson25Value);
      return Object.freeze(value);
    }
    function getClassicalNahuatlLesson25FinalTypedVncSlotFrame(machineryFrame = null) {
      return machineryFrame?.finalTypedVncSlotFrame
        || machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame
        || machineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame
        || machineryFrame?.targetTypedVncSlotFrame
        || null;
    }
    function getClassicalNahuatlLesson25AssertionEnvironment(frame = null) {
      const priorVncFrame = frame?.targetLesson7MachineryFrame?.priorVncFrame || frame?.priorVncFrame || null;
      return Object.freeze({
        subject: normalizeClassicalNahuatlLesson25Key(frame?.targetSubject || priorVncFrame?.subject || ""),
        mood: normalizeClassicalNahuatlLesson25Key(priorVncFrame?.mood || ""),
        tense: normalizeClassicalNahuatlLesson25Key(priorVncFrame?.tense || "")
      });
    }
    function isClassicalNahuatlLesson2514DerivedCausativeAssertionFrame(frame = null) {
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      const typedFrame = getClassicalNahuatlLesson25FinalTypedVncSlotFrame(frame);
      const environment = getClassicalNahuatlLesson25AssertionEnvironment(frame);
      const operationFrame = frame?.derivationOperationFrame || null;
      if (typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame !== "function"
        || runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(frame) !== true
        || typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame !== "function"
        || runtimeTarget.isClassicalNahuatlVncSlotFrame(typedFrame) !== true) {
        return false;
      }
      return Boolean(operationFrame?.authorizationStatus === "authorized"
        && operationFrame.derivationType === "causative"
        && operationFrame.targetStem === frame.targetStem
        && operationFrame.targetClass === frame.targetClass
        && operationFrame.participantTransformFrame?.authorizationStatus === "authorized"
        && operationFrame.participantTransformFrame?.canonicalSignature
        && frame.participantTransformFrame?.canonicalSignature === operationFrame.participantTransformFrame.canonicalSignature
        && environment.subject === normalizeClassicalNahuatlLesson25Key(operationFrame.targetSubject)
        && environment.mood === "indicative"
        && environment.tense === "present"
        && typedFrame.semanticIdentity === frame.targetTypedVncSlotFrame?.semanticIdentity
        && Array.isArray(frame.targetObjectRequests)
        && frame.targetObjectRequests.length >= 1
        && frame.targetObjectRequests.length <= 3);
    }
    function normalizeClassicalNahuatlLesson2514MoodTarget(options = {}) {
      const raw = normalizeClassicalNahuatlLesson25Key(options.target || options.targetKind || options.transformation || options.sentenceType || "");
      const aliases = {
        wish: "wish",
        "wish-sentence": "wish",
        optative: "wish",
        command: "command",
        "command-sentence": "command",
        exhortation: "exhortation",
        "exhortation-sentence": "exhortation",
        admonition: "indirect-admonition",
        "admonition-sentence": "indirect-admonition",
        "indirect-admonition": "indirect-admonition"
      };
      return aliases[raw] || raw;
    }
    function getClassicalNahuatlLesson2514MoodTargetProfile(target = "") {
      return {
        wish: Object.freeze({
          mood: "optative",
          tense: "nonpast",
          sentenceType: "wish-sentence",
          allowedSubjectPersonClasses: Object.freeze(["first-person", "second-person", "third-person"]),
          expectedRole: "wish"
        }),
        command: Object.freeze({
          mood: "optative",
          tense: "nonpast",
          sentenceType: "command-sentence",
          allowedSubjectPersonClasses: Object.freeze(["second-person"]),
          expectedRole: "direct-command"
        }),
        exhortation: Object.freeze({
          mood: "optative",
          tense: "nonpast",
          sentenceType: "exhortation-sentence",
          allowedSubjectPersonClasses: Object.freeze(["first-person"]),
          expectedRole: "exhortation"
        }),
        "indirect-admonition": Object.freeze({
          mood: "admonitive",
          tense: "nonpast",
          sentenceType: "admonition-sentence",
          allowedSubjectPersonClasses: Object.freeze(["third-person"]),
          expectedRole: "indirect-admonition"
        })
      }[target] || null;
    }
    function getClassicalNahuatlLesson25SubjectPersonClass(subject = "") {
      const normalized = normalizeClassicalNahuatlLesson25Key(subject);
      if (normalized.startsWith("1")) {
        return "first-person";
      }
      if (normalized.startsWith("2")) {
        return "second-person";
      }
      if (normalized.startsWith("3")) {
        return "third-person";
      }
      return "";
    }
    function getClassicalNahuatlLesson25ValenceForObjectKind(objectKind = "") {
      return {
        reflexive: "mainline-reflexive",
        "nonspecific-human": "projective-human",
        "nonspecific-nonhuman": "projective-nonhuman",
        "specific-projective": "specific-projective"
      }[normalizeClassicalNahuatlLesson25Key(objectKind)] || "";
    }
    function getClassicalNahuatlLesson25TypedCarrierSurface(carrier = "") {
      const silent = new Set(["", "0", "Ø", "⎕"]);
      return normalizeClassicalNahuatlLesson25Token(carrier)
        .split("-")
        .map(segment => segment.trim())
        .filter(segment => !silent.has(segment))
        .join("");
    }
    function getClassicalNahuatlVncFollowingSoundedCarrier(carriers = [], index = -1, predicateStem = "") {
      for (let nextIndex = index + 1; nextIndex < carriers.length; nextIndex += 1) {
        if (getClassicalNahuatlLesson25TypedCarrierSurface(carriers[nextIndex])) {
          return carriers[nextIndex];
        }
      }
      return predicateStem;
    }
    function realizeClassicalNahuatlLesson25TypedVncWord(typedFrame = null) {
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      if (typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame !== "function" || runtimeTarget.isClassicalNahuatlVncSlotFrame(typedFrame) !== true) {
        return "";
      }
      const slots = typedFrame.slots;
      const prePredicateCarriers = slots.prePredicate.map(slot => slot.carrier);
      const participantSurfaces = slots.prePredicate.map((slot, index) => realizeClassicalNahuatlLessons2425CanvasCarrier(
        slot.carrier,
        slot.objectPositionFrame || null,
        getClassicalNahuatlVncFollowingSoundedCarrier(prePredicateCarriers, index, slots.predicate.stem)
      ));
      const predicateSurface = getClassicalNahuatlLesson25TypedCarrierSurface(slots.predicate.stem);
      const followingSurface = participantSurfaces.find(Boolean) || predicateSurface;
      let subjectSurface = [slots.subject.pers1, slots.subject.pers2].map(getClassicalNahuatlLesson25TypedCarrierSurface).join("");
      if (["n", "t"].includes(subjectSurface) && followingSurface && !isClassicalNahuatlLessons2425CanvasVowelSound(followingSurface)) {
        subjectSurface = `${subjectSurface}i`;
      }
      return [
        subjectSurface,
        ...participantSurfaces,
        predicateSurface,
        getClassicalNahuatlLesson25TypedCarrierSurface(slots.predicate.tns),
        getClassicalNahuatlLesson25TypedCarrierSurface(slots.number.num1),
        getClassicalNahuatlLesson25TypedCarrierSurface(slots.number.num2)
      ].join("").normalize("NFC");
    }
    function getClassicalNahuatlVncVoiceFiniteAuthorityProjection(frame = null) {
      const finalTypedFrame = getClassicalNahuatlLesson25FinalTypedVncSlotFrame(frame);
      const selectedOutputFillers = frame?.selectedOutputLogicFrame?.outputFillers || null;
      return {
        kind: frame?.kind || "",
        version: frame?.version || 0,
        authorizationStatus: frame?.authorizationStatus || "",
        blockReason: frame?.blockReason || "",
        voice: frame?.voice || "",
        stem: frame?.stem || "",
        sourceVerbstem: frame?.sourceVerbstem || "",
        sourceValence: frame?.sourceValence || "",
        valence: frame?.valence || "",
        sourceSubject: frame?.sourceSubject || "",
        subject: frame?.subject || "",
        selectedNonactiveAspect: frame?.selectedNonactiveAspect || "",
        nonactiveStemRecord: frame?.nonactiveStemRecord || null,
        sourceObjectClusterFrame: frame?.sourceObjectClusterFrame || null,
        voiceObjectClusterFrame: frame?.voiceObjectClusterFrame || null,
        voiceTransformationFrame: frame?.voiceTransformationFrame || null,
        derivedRequestedSourceValence: frame?.derivedMachineryFrame?.priorVncFrame?.requestedSourceValence || "",
        derivedObjectRelationshipRuleFrame: frame?.derivedMachineryFrame?.objectRelationshipRuleFrame || null,
        finalTypedFrame,
        formulaRealization: frame?.formulaRealization || "",
        // The finite-VNC canonical check consumes only the VNC receipt. Lesson
        // 8-10 sentence metadata in the same display payload is a higher-layer
        // projection and must not decide whether the lower voice machinery is
        // canonical.
        selectedOutputFillers: selectedOutputFillers ? {
          verbstem: selectedOutputFillers.verbstem || "",
          stemAsFormulaPredicate: selectedOutputFillers.stemAsFormulaPredicate || "",
          classId: selectedOutputFillers.classId || "",
          classTargetStem: selectedOutputFillers.classTargetStem || "",
          classTargetValence: selectedOutputFillers.classTargetValence || "",
          sourceVerbstem: selectedOutputFillers.sourceVerbstem || "",
          aspect: selectedOutputFillers.aspect || "",
          stemVariant: selectedOutputFillers.stemVariant || "",
          selectedObjectRelationshipKind: selectedOutputFillers.selectedObjectRelationshipKind || "",
          selectedObjectKind: selectedOutputFillers.selectedObjectKind || "",
          selectedObjectPerson: selectedOutputFillers.selectedObjectPerson || "",
          voice: selectedOutputFillers.voice || "",
          activeSourceStem: selectedOutputFillers.activeSourceStem || "",
          derivedStem: selectedOutputFillers.derivedStem || "",
          realizedDerivedStem: selectedOutputFillers.realizedDerivedStem || "",
          targetClass: selectedOutputFillers.targetClass || "",
          selectedNonactiveAspect: selectedOutputFillers.selectedNonactiveAspect || "",
          nonactiveStem: selectedOutputFillers.nonactiveStem || "",
          nonactiveSuffixFamily: selectedOutputFillers.nonactiveSuffixFamily || "",
          sourceValence: selectedOutputFillers.sourceValence || "",
          targetValence: selectedOutputFillers.targetValence || "",
          sourceSubject: selectedOutputFillers.sourceSubject || "",
          targetSubject: selectedOutputFillers.targetSubject || "",
          sourceObjectCarriers: selectedOutputFillers.sourceObjectCarriers || [],
          targetObjectCarriers: selectedOutputFillers.targetObjectCarriers || []
        } : null,
        grammarGenerationAllowed: frame?.grammarGenerationAllowed,
        formulaOutputAllowed: frame?.formulaOutputAllowed,
        surfaceGenerationAllowed: frame?.surfaceGenerationAllowed
      };
    }
    function isCanonicalClassicalNahuatlDirectVncFiniteSourceFrame(machineryFrame = null) {
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      if (!machineryFrame
        || !["classical-nahuatl-lesson7-verbstem-class-machinery-frame", "classical-nahuatl-lesson23-multiple-object-vnc-machinery-frame"].includes(machineryFrame.kind)
        || machineryFrame.authorizationStatus !== "authorized"
        || machineryFrame.proofFrame?.authorizationStatus !== "authorized"
        || machineryFrame.proofFrame?.conclusion?.authorized !== true
        || typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame !== "function"
        || typeof runtimeTarget?.renderClassicalNahuatlVncSlotFrameFormula !== "function") {
        return false;
      }
      const finalTypedFrame = getClassicalNahuatlLesson25FinalTypedVncSlotFrame(machineryFrame);
      if (runtimeTarget.isClassicalNahuatlVncSlotFrame(finalTypedFrame) !== true) return false;
      const canonicalFormula = normalizeClassicalNahuatlLesson25Token(runtimeTarget.renderClassicalNahuatlVncSlotFrameFormula(finalTypedFrame));
      if (!canonicalFormula) return false;
      const conclusion = machineryFrame.proofFrame.conclusion || {};
      const formulaProjections = [
        machineryFrame.formulaRealization,
        conclusion.formulaRealization,
        conclusion.selectedFormula,
        conclusion.authorizedFormula,
        conclusion.finalBoundaryRealizationFrame?.formulaRealization,
        machineryFrame.finalBoundaryRealizationFrame?.formulaRealization
      ].filter(value => typeof value === "string" && value.length > 0).map(normalizeClassicalNahuatlLesson25Token);
      return Boolean(formulaProjections.length && formulaProjections.every(formula => formula === canonicalFormula));
    }
    function isCanonicalClassicalNahuatlLessons2425CanvasMachineryFrame(machineryFrame = null) {
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      if (!machineryFrame || machineryFrame.authorizationStatus !== "authorized") {
        return false;
      }
      if (machineryFrame.kind === "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame") {
        const activeMachineryFrame = machineryFrame.activeMachineryFrame || null;
        const finalTypedFrame = getClassicalNahuatlLesson25FinalTypedVncSlotFrame(machineryFrame);
        const activeCanonical = isCanonicalClassicalNahuatlDirectVncFiniteSourceFrame(activeMachineryFrame)
          || typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame === "function"
          && runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(activeMachineryFrame) === true
          || typeof runtimeTarget?.isClassicalNahuatlVncDerivationSourceMachineryFrame === "function"
          && runtimeTarget.isClassicalNahuatlVncDerivationSourceMachineryFrame(activeMachineryFrame) === true;
        const canonicalActivePriorVncFrame = activeMachineryFrame?.targetLesson7MachineryFrame?.priorVncFrame
          || activeMachineryFrame?.priorVncFrame
          || null;
        const canonicalActiveObjectRequests = activeMachineryFrame?.derivationOperationFrame?.targetObjectRequests
          || activeMachineryFrame?.targetObjectRequests
          || [];
        const canonicalActiveSpecificObject = canonicalActiveObjectRequests.find(request => request?.objectKind === "specific-projective") || null;
        const canonicalActiveRequestedSourceValence = normalizeClassicalNahuatlLesson25Key(
          machineryFrame?.sourceValence
          || activeMachineryFrame?.targetValence
          || activeMachineryFrame?.classTargetValence
          || activeMachineryFrame?.valence
          || canonicalActivePriorVncFrame?.requestedSourceValence
          || ""
        );
        const canonicalActiveObjectPerson = normalizeClassicalNahuatlLesson25Key(
          canonicalActiveSpecificObject?.objectPerson
          || (normalizeClassicalNahuatlLesson25Key(canonicalActivePriorVncFrame?.objectFrame?.objectKind) === "specific-projective"
            ? canonicalActivePriorVncFrame?.objectFrame?.objectPerson
            : "")
        );
        const canonicalActiveConclusion = activeMachineryFrame?.proofFrame?.conclusion || {};
        const canonicalActiveExpandedBoundary = activeMachineryFrame?.expandedVncBoundaryFrame
          || canonicalActiveConclusion.expandedVncBoundaryFrame
          || {};
        const canonicalVncSentenceOptions = {
          requestedSourceValence: canonicalActiveRequestedSourceValence,
          object: canonicalActiveObjectPerson,
          directionalPrefix: canonicalActiveExpandedBoundary.directionalPrefix
            || canonicalActiveConclusion.directionalPrefix
            || "",
          incorporatedAdverb: canonicalActiveConclusion.incorporatedAdverb || "",
          adverbPosition: canonicalActiveConclusion.adverbPosition || ""
        };
        const canonicalRebuildOptions = {
            voice: machineryFrame.voice,
            nonactiveStemRecord: machineryFrame.nonactiveStemRecord,
            inherentImpersonalRecord: machineryFrame.inherentImpersonalRecord,
            tlaImpersonalStemRecord: machineryFrame.tlaImpersonalStemRecord,
            sourceObjectClusterFrame: machineryFrame.sourceObjectClusterFrame,
            sourceValence: machineryFrame.sourceValence,
            sourceSubject: machineryFrame.sourceSubject,
            sourceObjectPerson: machineryFrame.voiceTransformationFrame?.sourceSpecificObject || "",
            mood: activeMachineryFrame?.priorVncFrame?.personDyad?.mood || activeMachineryFrame?.priorVncFrame?.mood || "indicative",
            tense: activeMachineryFrame?.priorVncFrame?.tense || "present",
            verbClass: activeMachineryFrame?.targetClass || activeMachineryFrame?.classId || "A"
          };
        const rebuiltCandidates = activeCanonical && typeof runtimeTarget?.buildClassicalNahuatlLessons20To22DerivedVncFrame === "function"
          ? [
            runtimeTarget.buildClassicalNahuatlLessons20To22DerivedVncFrame(activeMachineryFrame, canonicalRebuildOptions),
            runtimeTarget.buildClassicalNahuatlLessons20To22DerivedVncFrame(activeMachineryFrame, {
              ...canonicalRebuildOptions,
              sentenceOptions: canonicalVncSentenceOptions
            })
          ].filter(candidate => candidate?.authorizationStatus === "authorized")
          : [];
        const rebuilt = rebuiltCandidates.find(candidate => areClassicalNahuatlLesson25ValuesEqual(
          getClassicalNahuatlVncVoiceFiniteAuthorityProjection(machineryFrame),
          getClassicalNahuatlVncVoiceFiniteAuthorityProjection(candidate)
        )) || null;
        const sourceObjectClusterFrame = machineryFrame.sourceObjectClusterFrame;
        const voiceObjectClusterFrame = machineryFrame.voiceObjectClusterFrame;
        const hasCanonicalVoiceObjectClusterRelation = sourceObjectClusterFrame === null
          ? voiceObjectClusterFrame === null
          : sourceObjectClusterFrame?.authorizationStatus === "authorized"
            && voiceObjectClusterFrame?.authorizationStatus === "authorized";
        return Boolean(activeCanonical
          && rebuilt?.authorizationStatus === "authorized"
          && typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame === "function"
          && runtimeTarget.isClassicalNahuatlVncSlotFrame(finalTypedFrame) === true
          && machineryFrame.voiceTransformationFrame?.authorizationStatus === "authorized"
          && hasCanonicalVoiceObjectClusterRelation
          && machineryFrame.proofFrame?.authorizationStatus === "authorized"
          && machineryFrame.proofFrame?.conclusion?.authorized === true
          && machineryFrame.selectedOutputLogicFrame?.authorizationStatus === "authorized"
          && machineryFrame.formulaRealization === machineryFrame.selectedOutputLogicFrame.selectedFormula
          && rebuilt);
      }
      if (machineryFrame.kind === "classical-nahuatl-vnc-derived-machinery-frame") {
        return typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame === "function"
          && runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(machineryFrame) === true;
      }
      if (["classical-nahuatl-lesson7-verbstem-class-machinery-frame", "classical-nahuatl-lesson23-multiple-object-vnc-machinery-frame"].includes(machineryFrame.kind)) {
        return isCanonicalClassicalNahuatlDirectVncFiniteSourceFrame(machineryFrame);
      }
      return typeof runtimeTarget?.isClassicalNahuatlVncDerivationSourceMachineryFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationSourceMachineryFrame(machineryFrame) === true;
    }
    function normalizeClassicalNahuatlLessons2425CanvasObjectKind(value = "") {
      const normalized = normalizeClassicalNahuatlLesson25Key(value);
      return {
        "mainline-reflexive": "reflexive",
        "shuntline-reflexive": "reflexive",
        "human-reciprocal": "reflexive",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman"
      }[normalized] || normalized;
    }
    function getClassicalNahuatlLessons2425CanvasSyntheticObjectPosition(machineryFrame = null) {
      const objectFrame = machineryFrame?.priorVncFrame?.objectFrame || null;
      const objectKind = normalizeClassicalNahuatlLessons2425CanvasObjectKind(objectFrame?.objectKind || "");
      if (!objectKind || objectFrame?.valenceArity === "vacant") {
        return null;
      }
      return Object.freeze({
        objectId: "source-object-1",
        objectKind,
        objectPerson: normalizeClassicalNahuatlLesson25Key(objectFrame?.objectPerson || ""),
        governor: "directive",
        derivationalLevel: 1,
        prominence: "mainline",
        carrier: normalizeClassicalNahuatlLesson25Token(objectFrame?.carrier || ""),
        sounded: true
      });
    }
    function getClassicalNahuatlLessons2425CanvasParticipantPositions(machineryFrame = null, typedFrame = null) {
      const clusterCandidates = [
        machineryFrame?.targetObjectClusterFrame,
        machineryFrame?.voiceObjectClusterFrame,
        machineryFrame?.multipleObjectClusterFrame,
        machineryFrame?.sourceObjectClusterFrame
      ];
      const cluster = clusterCandidates.find(candidate => Array.isArray(candidate?.positions)) || null;
      if (cluster) {
        return Object.freeze(cluster.positions.map(position => Object.freeze({ ...position })));
      }
      const typedPositions = (typedFrame?.slots?.prePredicate || [])
        .map(slot => slot?.objectPositionFrame || null)
        .filter(Boolean);
      if (typedPositions.length) {
        return Object.freeze(typedPositions.map(position => Object.freeze({ ...position })));
      }
      const synthetic = getClassicalNahuatlLessons2425CanvasSyntheticObjectPosition(machineryFrame);
      return Object.freeze(synthetic ? [synthetic] : []);
    }
    function orderClassicalNahuatlLessons2425CanvasParticipants(machineryFrame = null, values = [], getPosition = value => value) {
      const ordered = Array.isArray(values) ? values.slice() : [];
      const positions = ordered.map(value => getPosition(value)).filter(Boolean);
      const operationFrame = machineryFrame?.derivationOperationFrame || null;
      const impersonalRetainedReflexive = operationFrame?.sourceVoice === "impersonal"
        && positions.some(position => position.objectKind === "reflexive" && position.governor === "directive")
        && positions.some(position => position.objectKind === "nonspecific-human" && position.governor === "causative");
      if (!impersonalRetainedReflexive) return ordered;
      return ordered.sort((left, right) => {
        const priority = value => {
          const position = getPosition(value);
          return position?.governor === "causative" && position?.objectKind === "nonspecific-human" ? 0 : 1;
        };
        return priority(left) - priority(right);
      });
    }
    function getClassicalNahuatlLessons2425CanvasParticipantEntries(machineryFrame = null, typedFrame = null) {
      const positionsById = new Map(getClassicalNahuatlLessons2425CanvasParticipantPositions(machineryFrame, typedFrame)
        .map(position => [position.objectId, position]));
      const entries = (typedFrame?.slots?.prePredicate || []).map((slot, index) => {
        const position = slot?.objectPositionFrame
          || positionsById.get(slot?.objectPositionFrame?.objectId)
          || getClassicalNahuatlLessons2425CanvasParticipantPositions(machineryFrame, typedFrame)[index]
          || null;
        return {
          slotId: slot?.id || `valence-${index + 1}`,
          carrier: normalizeClassicalNahuatlLesson25Token(slot?.carrier || ""),
          position
        };
      });
      return Object.freeze(orderClassicalNahuatlLessons2425CanvasParticipants(
        machineryFrame,
        entries,
        entry => entry.position
      ).map(entry => Object.freeze(entry)));
    }
    function isClassicalNahuatlLessons2425CanvasIttaReflexiveORetention(carrier = "", position = null, followingCarrier = "") {
      const compactCarrier = normalizeClassicalNahuatlLesson25Token(carrier).replace(/[+\s-]/gu, "").toLowerCase();
      const followingSurface = getClassicalNahuatlLesson25TypedCarrierSurface(followingCarrier).toLowerCase();
      return normalizeClassicalNahuatlLessons2425CanvasObjectKind(position?.objectKind || "") === "reflexive"
        && /^m(?:0|ø|⎕)?$/u.test(compactCarrier)
        && /^itta/u.test(followingSurface);
    }
    function realizeClassicalNahuatlLessons2425CanvasCarrier(carrier = "", position = null, followingCarrier = "") {
      const raw = normalizeClassicalNahuatlLesson25Token(carrier);
      const compact = raw.replace(/[+\s-]/gu, "").toLowerCase();
      if (!compact || /^(?:0|00|ø|⎕)$/u.test(compact)) {
        return "";
      }
      const objectKind = normalizeClassicalNahuatlLessons2425CanvasObjectKind(position?.objectKind || "");
      if (isClassicalNahuatlLessons2425CanvasIttaReflexiveORetention(raw, position, followingCarrier)) return "mo";
      if (objectKind === "reflexive" && /^(?:m|mo)$/u.test(compact)) return "mo";
      if (objectKind === "reflexive" && /^(?:n|no)$/u.test(compact)) return "no";
      if (objectKind === "reflexive" && /^(?:t|to)$/u.test(compact)) return "to";
      if (compact === "nech") return "nēch";
      if (compact === "tech") return "tēch";
      if (compact === "mech") return "mēch";
      if (compact === "te") return "tē";
      if (compact === "quim") return /^[mpb]/u.test(getClassicalNahuatlLessons2425CanvasFirstSound(followingCarrier)) ? "quim" : "quin";
      if (compact === "0im" || compact === "im") return /^[mpb]/u.test(getClassicalNahuatlLessons2425CanvasFirstSound(followingCarrier)) ? "im" : "in";
      if (compact === "c0") return "c";
      if (compact === "qui0") return "qui";
      return getClassicalNahuatlLesson25TypedCarrierSurface(raw);
    }
    function getClassicalNahuatlLessons2425CanvasFirstSound(value = "") {
      return normalizeClassicalNahuatlLesson25Token(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "")[0]?.toLowerCase() || "";
    }
    function isClassicalNahuatlLessons2425CanvasVowelSound(value = "") {
      return /^[aeiou]$/u.test(getClassicalNahuatlLessons2425CanvasFirstSound(value));
    }
    function realizeClassicalNahuatlLessons2425CanvasPredicate(machineryFrame = null, rawPredicate = "", precedingCarrier = "") {
      const operationFrame = machineryFrame?.derivationOperationFrame || null;
      let segmented = normalizeClassicalNahuatlLesson25Token(rawPredicate);
      const ruleFrames = [];
      const targetStem = normalizeClassicalNahuatlLesson25Token(machineryFrame?.targetStem);
      if (/^caqu(?:i|ī)-ti-l-tiā$/u.test(targetStem) && /caqu(?:i|ī)-ti-l/u.test(segmented)) {
        segmented = segmented.replace(/caqu(?:i|ī)-ti-l/u, "caqui-tī-l");
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-2512-caqui-ti-l-internal-quantity",
          section: "25.12",
          operation: "place-long-i-in-the-first-causative-before-l-tia"
        }));
      }
      if (normalizeClassicalNahuatlLesson25Token(machineryFrame?.nonactiveStemRecord?.nonactiveStem) === "caquī-ti-lō"
        && /caquī-ti-l/u.test(segmented)) {
        segmented = segmented.replace(/caquī-ti-l/u, "caqui-tī-l");
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-25123-caqui-ti-lo-internal-quantity",
          section: "25.12.3",
          operation: "relocate-the-long-i-to-the-causative-ti-before-nonactive-lo"
        }));
      }
      const activeCausativeTargetStem = normalizeClassicalNahuatlLesson25Token(machineryFrame?.activeMachineryFrame?.targetStem);
      const selectedNonactiveStem = normalizeClassicalNahuatlLesson25Token(machineryFrame?.nonactiveStemRecord?.nonactiveStem);
      if (/-l-tiā$/u.test(activeCausativeTargetStem)
        && /-ti-lō$/u.test(selectedNonactiveStem)
        && /-ti-l(?:o|ō)/u.test(segmented)) {
        segmented = segmented.replace(/-ti-l(?=(?:o|ō)(?:-|$))/u, "-tī-l");
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-2515-derived-causative-nonactive-ti-quantity",
          section: "25.15",
          operation: "preserve-causative-long-i-before-nonactive-lo"
        }));
      }
      let solid = getClassicalNahuatlLesson25TypedCarrierSurface(segmented);
      if (normalizeClassicalNahuatlLesson25Token(machineryFrame?.targetStem) === "iuc-xi-tiā" && precedingCarrier === "tla" && /^iuc/u.test(solid)) {
        solid = solid.replace(/^iuc/u, "uc");
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-2522-iuc-xi-supportive-i-suppression",
          section: "25.2.2",
          operation: "suppress-initial-supportive-i-after-tla"
        }));
      }
      if (normalizeClassicalNahuatlLesson25Token(machineryFrame?.targetStem) === "quīx-tiā" && precedingCarrier === "c" && /^quīx/u.test(solid)) {
        solid = solid.replace(/^quīx/u, "quix");
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-2510-c-quix-finite-quantity",
          section: "25.10",
          operation: "shorten-quix-after-the-third-singular-specific-object-carrier"
        }));
      }
      if (/^ittī/u.test(solid) && precedingCarrier === "no") {
        solid = solid.replace(/^i/u, "");
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-25111b-no-itta-initial-i-suppression",
          section: "25.11.1.b",
          operation: "suppress-initial-i-after-mainline-reflexive-no"
        }));
      }
      return Object.freeze({ surface: solid.normalize("NFC"), ruleFrames: Object.freeze(ruleFrames) });
    }
    function getClassicalNahuatlLessons2425CanvasSurfaceSignaturePayload(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        lesson: frame.lesson,
        section: frame.section,
        sourceAuthority: frame.sourceAuthority,
        sourceDocument: frame.sourceDocument,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        machineryKind: frame.machineryFrame?.kind || "",
        machineryCanonicalSignature: frame.machineryFrame?.canonicalSignature || "",
        operationCanonicalSignature: frame.machineryFrame?.derivationOperationFrame?.canonicalSignature || "",
        typedSemanticIdentity: frame.typedFrame?.semanticIdentity || "",
        participantPositions: frame.participantPositions || [],
        orderedParticipantRoles: frame.orderedParticipantRoles || [],
        participantCount: frame.participantCount || 0,
        predicateStem: frame.predicateStem || "",
        citationStages: frame.citationStages || [],
        sourceHistoryRealization: frame.sourceHistoryRealization || "",
        relationRealization: frame.relationRealization || "",
        ruleFrames: frame.ruleFrames || [],
        wordRealization: frame.wordRealization || "",
        citationRealization: frame.citationRealization || "",
        typedFrameAuthority: frame.typedFrameAuthority,
        grammarAuthority: frame.grammarAuthority,
        formulaStringAuthority: frame.formulaStringAuthority,
        surfaceStringAuthority: frame.surfaceStringAuthority,
        callerSuppliedAuthorityAccepted: frame.callerSuppliedAuthorityAccepted,
        catalogTargetAuthority: frame.catalogTargetAuthority,
        grammarGenerationAllowed: frame.grammarGenerationAllowed,
        surfaceGenerationAllowed: frame.surfaceGenerationAllowed,
        rejectedAuthorityFields: frame.rejectedAuthorityFields || []
      };
    }
    function buildBlockedClassicalNahuatlLessons2425CanvasSurfaceFrame(kind = "", machineryFrame = null, blockReason = "classical-lessons24-25-canonical-machinery-required", rejectedAuthorityFields = []) {
      const genericFiniteSurface = kind === CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND;
      return Object.freeze({
        kind,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: genericFiniteSurface ? "Classical Nahuatl typed VNC" : "Andrews Lessons 24-25",
        section: genericFiniteSurface ? "5-26" : "24.1-25.16",
        sourceAuthority: genericFiniteSurface ? "canonical typed Classical VNC machinery with operation-aware Andrews finalizers" : "Andrews transcription and canonical typed projective roles",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "blocked",
        blockReason,
        machineryFrame,
        typedFrame: null,
        participantPositions: Object.freeze([]),
        orderedParticipantRoles: Object.freeze([]),
        participantCount: 0,
        predicateStem: "",
        citationStages: Object.freeze([]),
        sourceHistoryRealization: "",
        relationRealization: "",
        ruleFrames: Object.freeze([]),
        wordRealization: "",
        citationRealization: "",
        typedFrameAuthority: true,
        grammarAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        rejectedAuthorityFields: Object.freeze([...rejectedAuthorityFields]),
        canonicalSignature: ""
      });
    }
    function getClassicalNahuatlLessons2425CanvasRejectedAuthorityFields(options = {}) {
      return CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SURFACE_FORBIDDEN_FIELDS.filter(field => Object.prototype.hasOwnProperty.call(options || {}, field));
    }
    function buildClassicalNahuatlVncFiniteSurfaceFrameInternal(machineryFrame = null, options = {}) {
      const rejectedAuthorityFields = getClassicalNahuatlLessons2425CanvasRejectedAuthorityFields(options);
      if (rejectedAuthorityFields.length) {
        return buildBlockedClassicalNahuatlLessons2425CanvasSurfaceFrame(CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND, machineryFrame, "classical-vnc-caller-supplied-surface-authority-rejected", rejectedAuthorityFields);
      }
      const typedFrame = getClassicalNahuatlLesson25FinalTypedVncSlotFrame(machineryFrame);
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      if (!isCanonicalClassicalNahuatlLessons2425CanvasMachineryFrame(machineryFrame)
        || typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame !== "function"
        || runtimeTarget.isClassicalNahuatlVncSlotFrame(typedFrame) !== true) {
        return buildBlockedClassicalNahuatlLessons2425CanvasSurfaceFrame(CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND, machineryFrame, "classical-vnc-canonical-machinery-required");
      }
      const participantEntries = getClassicalNahuatlLessons2425CanvasParticipantEntries(machineryFrame, typedFrame);
      const participantCarriers = participantEntries.map(entry => entry.carrier);
      const participantSurfaces = participantEntries.map((entry, index) => realizeClassicalNahuatlLessons2425CanvasCarrier(
        entry.carrier,
        entry.position,
        getClassicalNahuatlVncFollowingSoundedCarrier(participantCarriers, index, typedFrame.slots.predicate.stem)
      ));
      const lastParticipantSurface = participantSurfaces.filter(Boolean).at(-1) || "";
      const predicate = realizeClassicalNahuatlLessons2425CanvasPredicate(machineryFrame, typedFrame.slots.predicate.stem, lastParticipantSurface);
      const followingSurface = participantSurfaces.find(Boolean) || predicate.surface;
      let subjectSurface = [typedFrame.slots.subject.pers1, typedFrame.slots.subject.pers2]
        .map(getClassicalNahuatlLesson25TypedCarrierSurface)
        .join("");
      if (["n", "t"].includes(subjectSurface) && followingSurface && !isClassicalNahuatlLessons2425CanvasVowelSound(followingSurface)) {
        subjectSurface = `${subjectSurface}i`;
      }
      const tenseSurface = getClassicalNahuatlLesson25TypedCarrierSurface(typedFrame.slots.predicate.tns);
      const numberSurface = [typedFrame.slots.number.num1, typedFrame.slots.number.num2]
        .map(getClassicalNahuatlLesson25TypedCarrierSurface)
        .join("");
      const orderingRuleFrames = machineryFrame?.derivationOperationFrame?.sourceVoice === "impersonal"
        && participantEntries[0]?.position?.governor === "causative"
        ? [Object.freeze({
          ruleId: "cn-l25-25113-impersonal-causative-object-before-retained-reciprocative",
          section: "25.11.3.b",
          operation: "place-sounded-causative-human-before-retained-reciprocative-ne"
        })]
        : [];
      const boundaryRuleFrames = participantEntries.some((entry, index) => isClassicalNahuatlLessons2425CanvasIttaReflexiveORetention(
        entry.carrier,
        entry.position,
        getClassicalNahuatlVncFollowingSoundedCarrier(participantCarriers, index, typedFrame.slots.predicate.stem)
      )) ? [Object.freeze({
        ruleId: "cn-vnc-itta-reflexive-o-retention",
        section: "7.9 / 25.11.1.b",
        operation: "retain-reflexive-o-before-itta-in-the-coreferential-source"
      })] : [];
      const participantPositions = Object.freeze(participantEntries.map(entry => entry.position).filter(Boolean));
      const frame = {
        kind: CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Classical Nahuatl typed VNC",
        section: machineryFrame?.derivationOperationFrame?.selectedOption?.andrewsSection || "5-26",
        sourceAuthority: "canonical typed Classical VNC machinery with operation-aware Andrews finalizers",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        machineryFrame,
        typedFrame,
        participantPositions,
        orderedParticipantRoles: Object.freeze(participantEntries.map((entry, index) => entry.position ? Object.freeze({
          objectId: entry.position.objectId || "",
          objectKind: entry.position.objectKind || "",
          objectPerson: entry.position.objectPerson || "",
          governor: entry.position.governor || "",
          derivationalLevel: entry.position.derivationalLevel || 0,
          surface: realizeClassicalNahuatlLessons2425CanvasCarrier(entry.carrier, entry.position, getClassicalNahuatlVncFollowingSoundedCarrier(participantCarriers, index, typedFrame.slots.predicate.stem))
        }) : Object.freeze({ objectId: entry.slotId, surface: realizeClassicalNahuatlLessons2425CanvasCarrier(entry.carrier, null, getClassicalNahuatlVncFollowingSoundedCarrier(participantCarriers, index, typedFrame.slots.predicate.stem)) }))),
        participantCount: participantPositions.length,
        predicateStem: typedFrame.slots.predicate.stem,
        citationStages: Object.freeze([]),
        sourceHistoryRealization: "",
        relationRealization: "",
        ruleFrames: Object.freeze([Object.freeze({
          ruleId: "cn-vnc-typed-finite-word-projection",
          section: "5-26",
          operation: "realize-canonical-typed-vnc-slots-with-operation-aware-boundary-rules"
        }), ...orderingRuleFrames, ...boundaryRuleFrames, ...predicate.ruleFrames]),
        wordRealization: `${subjectSurface}${participantSurfaces.join("")}${predicate.surface}${tenseSurface}${numberSurface}`.normalize("NFC"),
        citationRealization: "",
        typedFrameAuthority: true,
        grammarAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        grammarGenerationAllowed: true,
        surfaceGenerationAllowed: true,
        rejectedAuthorityFields: Object.freeze([])
      };
      frame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasSurfaceSignaturePayload(frame));
      return Object.freeze(frame);
    }
    function buildClassicalNahuatlVncFiniteSurfaceFrame(machineryFrame = null, options = {}) {
      return buildClassicalNahuatlVncFiniteSurfaceFrameInternal(machineryFrame, options);
    }
    function isClassicalNahuatlVncFiniteSurfaceFrame(frame = null) {
      if (!frame
        || frame.kind !== CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND
        || frame.version !== CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.grammarAuthority !== true
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.catalogTargetAuthority !== false
        || frame.grammarGenerationAllowed !== true
        || frame.surfaceGenerationAllowed !== true) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlVncFiniteSurfaceFrameInternal(frame.machineryFrame);
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.machineryFrame === frame.machineryFrame
        && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuilt, frame)
        && frame.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasSurfaceSignaturePayload(frame))
        && rebuilt.canonicalSignature === frame.canonicalSignature
        && areClassicalNahuatlLesson25ValuesEqual(getClassicalNahuatlLessons2425CanvasSurfaceSignaturePayload(rebuilt), getClassicalNahuatlLessons2425CanvasSurfaceSignaturePayload(frame)));
    }
    function getClassicalNahuatlLesson2513AlternativeSourceProjectionSignaturePayload(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        lesson: frame.lesson,
        section: frame.section,
        sourceAuthority: frame.sourceAuthority,
        sourceDocument: frame.sourceDocument,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        operationSignature: frame.operationFrame?.canonicalSignature || "",
        reverseSourceAnalysisSignature: frame.reverseSourceAnalysis?.canonicalSignature || "",
        sourceFiniteSurfaceSignature: frame.sourceFiniteSurfaceFrame?.canonicalSignature || "",
        sourceVoice: frame.sourceVoice,
        sourcePredicateQuantityFrame: frame.sourcePredicateQuantityFrame || null,
        sourceWordRealization: frame.sourceWordRealization,
        ruleFrames: frame.ruleFrames || [],
        typedFrameAuthority: frame.typedFrameAuthority,
        grammarAuthority: frame.grammarAuthority,
        formulaStringAuthority: frame.formulaStringAuthority,
        surfaceStringAuthority: frame.surfaceStringAuthority,
        callerSuppliedAuthorityAccepted: frame.callerSuppliedAuthorityAccepted,
        catalogTargetAuthority: frame.catalogTargetAuthority,
        rejectedAuthorityFields: frame.rejectedAuthorityFields || []
      };
    }
    function buildBlockedClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(operationFrame = null, blockReason = "classical-lesson25-13-canonical-recursive-causative-operation-required", rejectedAuthorityFields = []) {
      return Object.freeze({
        kind: CLASSICAL_NAHUATL_LESSON2513_ALTERNATIVE_SOURCE_PROJECTION_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lesson 25",
        section: "25.13",
        sourceAuthority: "canonical recursive causative operation and signed reverse-source analysis",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "blocked",
        blockReason,
        operationFrame,
        sourceMachineryFrame: operationFrame?.sourceMachineryFrame || null,
        reverseSourceAnalysis: null,
        sourceFiniteSurfaceFrame: null,
        sourceVoice: "",
        sourcePredicateQuantityFrame: null,
        sourceWordRealization: "",
        ruleFrames: Object.freeze([]),
        typedFrameAuthority: true,
        grammarAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        rejectedAuthorityFields: Object.freeze([...rejectedAuthorityFields]),
        canonicalSignature: ""
      });
    }
    function buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrameInternal(operationFrame = null, options = {}) {
      const rejectedAuthorityFields = getClassicalNahuatlLessons2425CanvasRejectedAuthorityFields(options);
      if (rejectedAuthorityFields.length) {
        return buildBlockedClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(
          operationFrame,
          "classical-lesson25-13-caller-supplied-surface-authority-rejected",
          rejectedAuthorityFields
        );
      }
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      const sourceVoice = normalizeClassicalNahuatlLesson25Key(operationFrame?.sourceVoice || "");
      const analysisId = sourceVoice === "active"
        ? "cn-l25-2513-caquitiltia-from-active-first-causative"
        : sourceVoice === "passive"
          ? "cn-l25-2513-caquitiltia-from-passive-first-causative"
          : "";
      const reverseSourceAnalysis = (operationFrame?.reverseSourceAnalyses || []).find(analysis => analysis?.analysisId === analysisId) || null;
      if (typeof runtimeTarget?.isClassicalNahuatlVncDerivationOperationFrame !== "function"
        || runtimeTarget.isClassicalNahuatlVncDerivationOperationFrame(operationFrame) !== true
        || normalizeClassicalNahuatlLesson25Token(operationFrame.targetStem) !== "caqui-ti-l-tiā"
        || !reverseSourceAnalysis
        || !analysisId) {
        return buildBlockedClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(operationFrame);
      }
      const sourceFiniteSurfaceFrame = buildClassicalNahuatlVncFiniteSurfaceFrameInternal(operationFrame.sourceMachineryFrame);
      if (!isClassicalNahuatlVncFiniteSurfaceFrame(sourceFiniteSurfaceFrame)) {
        return buildBlockedClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(
          operationFrame,
          sourceFiniteSurfaceFrame?.blockReason || "classical-lesson25-13-canonical-source-finite-surface-required"
        );
      }
      const sourcePredicateStem = normalizeClassicalNahuatlLesson25Token(sourceFiniteSurfaceFrame.predicateStem);
      const sourceWord = normalizeClassicalNahuatlLesson25Token(sourceFiniteSurfaceFrame.wordRealization);
      const projectedPredicateStem = sourceVoice === "active"
        ? sourcePredicateStem.replace(/caquī-tia/u, "caqui-tīa")
        : sourcePredicateStem;
      const sourceWordRealization = sourceVoice === "active"
        ? sourceWord.replace(/caquītia/u, "caquitīa")
        : sourceWord;
      if (!sourceWordRealization
        || sourceVoice === "active" && (projectedPredicateStem === sourcePredicateStem || sourceWordRealization === sourceWord)) {
        return buildBlockedClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(
          operationFrame,
          "classical-lesson25-13-active-source-quantity-environment-not-found"
        );
      }
      const sourcePredicateQuantityFrame = Object.freeze({
        kind: "classical-nahuatl-lesson25-13-source-predicate-quantity-frame",
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        authorizationStatus: "authorized",
        sourceVoice,
        sourcePredicateStem,
        projectedPredicateStem,
        operation: sourceVoice === "active"
          ? "relocate-long-i-from-caqui-to-the-first-causative-ti-in-the-lesson25-13-alternative-source-reading"
          : "preserve-the-passive-source-quantity-already-finalized-by-lesson25-12-3",
        ruleId: sourceVoice === "active"
          ? "cn-l25-2513-active-alternative-source-caqui-ti-quantity"
          : "cn-l25-2513-passive-alternative-source-quantity-identity",
        andrewsSection: "25.13",
        typedFrameAuthority: true,
        surfaceStringAuthority: false
      });
      const frame = {
        kind: CLASSICAL_NAHUATL_LESSON2513_ALTERNATIVE_SOURCE_PROJECTION_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lesson 25",
        section: "25.13",
        sourceAuthority: "canonical recursive causative operation and signed reverse-source analysis",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        operationFrame,
        sourceMachineryFrame: operationFrame.sourceMachineryFrame,
        reverseSourceAnalysis,
        sourceFiniteSurfaceFrame,
        sourceVoice,
        sourcePredicateQuantityFrame,
        sourceWordRealization,
        ruleFrames: Object.freeze([Object.freeze({
          ruleId: sourcePredicateQuantityFrame.ruleId,
          section: "25.13",
          operation: sourcePredicateQuantityFrame.operation
        })]),
        typedFrameAuthority: true,
        grammarAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        rejectedAuthorityFields: Object.freeze([])
      };
      frame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlLesson2513AlternativeSourceProjectionSignaturePayload(frame));
      return Object.freeze(frame);
    }
    function buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(operationFrame = null, options = {}) {
      return buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrameInternal(operationFrame, options);
    }
    function isClassicalNahuatlLesson2513AlternativeSourceProjectionFrame(frame = null) {
      if (!frame
        || frame.kind !== CLASSICAL_NAHUATL_LESSON2513_ALTERNATIVE_SOURCE_PROJECTION_KIND
        || frame.version !== CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.sourceMachineryFrame !== frame.operationFrame?.sourceMachineryFrame
        || frame.reverseSourceAnalysis == null
        || frame.sourceFiniteSurfaceFrame == null
        || frame.sourcePredicateQuantityFrame?.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.grammarAuthority !== true
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.catalogTargetAuthority !== false) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrameInternal(frame.operationFrame);
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.operationFrame === frame.operationFrame
        && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuilt, frame)
        && frame.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlLesson2513AlternativeSourceProjectionSignaturePayload(frame))
        && rebuilt.canonicalSignature === frame.canonicalSignature
        && areClassicalNahuatlLesson25ValuesEqual(
          getClassicalNahuatlLesson2513AlternativeSourceProjectionSignaturePayload(rebuilt),
          getClassicalNahuatlLesson2513AlternativeSourceProjectionSignaturePayload(frame)
        ));
    }
    function getClassicalNahuatlLessons2425CanvasCitationPositions(machineryFrame = null, typedFrame = null) {
      const canonicalPositions = getClassicalNahuatlLessons2425CanvasParticipantPositions(machineryFrame, typedFrame);
      if (canonicalPositions.length) {
        return Object.freeze(orderClassicalNahuatlLessons2425CanvasParticipants(machineryFrame, canonicalPositions));
      }
      const requests = Array.isArray(machineryFrame?.targetObjectRequests) ? machineryFrame.targetObjectRequests : [];
      const maximumLevel = requests.reduce((maximum, request) => Math.max(maximum, Number(request?.derivationalLevel) || 0), 0);
      const priority = { "specific-projective": 1, reflexive: 2, "nonspecific-human": 3, "nonspecific-nonhuman": 4 };
      const normalized = requests.map(request => Object.freeze({
        ...request,
        objectKind: normalizeClassicalNahuatlLessons2425CanvasObjectKind(request.objectKind),
        prominence: Number(request.derivationalLevel) === maximumLevel ? "mainline" : "shuntline"
      })).sort((left, right) => (priority[left.objectKind] || 99) - (priority[right.objectKind] || 99) || right.derivationalLevel - left.derivationalLevel);
      return Object.freeze(orderClassicalNahuatlLessons2425CanvasParticipants(machineryFrame, normalized));
    }
    function isClassicalNahuatlLessons2425CanvasRetainedReflexiveShuntline(machineryFrame = null, position = {}) {
      const retainedRuleFrame = machineryFrame?.derivationOperationFrame?.participantTransformFrame?.retainedSourceReflexiveShuntlineRuleFrame || null;
      return retainedRuleFrame?.authorizationStatus === "authorized"
        && Array.isArray(retainedRuleFrame.sourceReflexiveObjectIds)
        && retainedRuleFrame.sourceReflexiveObjectIds.includes(position.objectId);
    }
    function getClassicalNahuatlLessons2425CanvasCitationRole(position = {}, initialVowelKind = "", machineryFrame = null) {
      const objectKind = normalizeClassicalNahuatlLessons2425CanvasObjectKind(position.objectKind);
      if (objectKind === "nonspecific-nonhuman") return "tla";
      if (objectKind === "reflexive") {
        if (isClassicalNahuatlLessons2425CanvasRetainedReflexiveShuntline(machineryFrame, position)) return "ne";
        return normalizeClassicalNahuatlLesson25Key(initialVowelKind) === "real" ? "m-Ø" : "m-o";
      }
      if (["specific-projective", "nonspecific-human"].includes(objectKind)) return "tē";
      return "";
    }
    function normalizeClassicalNahuatlLessons2425CanvasCitationPredicateStem(value = "") {
      return normalizeClassicalNahuatlLesson25Token(value).replace(/-(?:0|⎕|Ø|ø)$/u, "");
    }
    function getClassicalNahuatlLessons2425CanvasCitationPredicateStem(machineryFrame = null, typedFrame = null) {
      if (machineryFrame?.kind === "classical-nahuatl-vnc-derived-machinery-frame") {
        return normalizeClassicalNahuatlLessons2425CanvasCitationPredicateStem(machineryFrame.targetStem);
      }
      const tense = normalizeClassicalNahuatlLesson25Key(
        machineryFrame?.priorVncFrame?.tense
        || machineryFrame?.priorVncFrame?.tenseFrame?.tense
        || ""
      );
      const predicateStem = tense === "preterit"
        ? machineryFrame?.classRuleFrame?.perfectiveStem
          || machineryFrame?.perfectiveStem
          || typedFrame?.slots?.predicate?.stem
        : machineryFrame?.citationRuleFrame?.stemRealization
          || machineryFrame?.citationRuleFrame?.stem
          || machineryFrame?.sourceVerbstem
          || machineryFrame?.stem
          || typedFrame?.slots?.predicate?.stem;
      return normalizeClassicalNahuatlLessons2425CanvasCitationPredicateStem(predicateStem);
    }
    function buildClassicalNahuatlLessons2425CanvasCitationStage({
      stageRole = "",
      predicateStem = "",
      positions = [],
      initialVowelKind = "",
      directionalPrefix = "",
      hypothetical = false,
      sourceAuthority = "canonical-typed-machinery",
      causativeCitationRole = "",
      machineryFrame = null
    } = {}) {
      const normalizedCausativeCitationRole = ["tē", "tla", "m-o", "m-Ø"].includes(causativeCitationRole)
        ? causativeCitationRole
        : "";
      const orderedParticipantRoles = Object.freeze((Array.isArray(positions) ? positions : []).map(position => Object.freeze({
        objectId: position.objectId || "",
        objectKind: normalizeClassicalNahuatlLessons2425CanvasObjectKind(position.objectKind),
        objectPerson: position.objectPerson || "",
        governor: position.governor || "",
        derivationalLevel: position.derivationalLevel || 0,
        prominence: position.prominence || "",
        surface: normalizedCausativeCitationRole && position.prominence === "mainline"
          ? normalizedCausativeCitationRole
          : getClassicalNahuatlLessons2425CanvasCitationRole(position, initialVowelKind, machineryFrame)
      })).filter(role => role.surface));
      const prefixes = [normalizeClassicalNahuatlLesson25Token(directionalPrefix), ...orderedParticipantRoles.map(role => role.surface)].filter(Boolean);
      const normalizedPredicateStem = normalizeClassicalNahuatlLessons2425CanvasCitationPredicateStem(predicateStem);
      const citationCore = `${prefixes.length ? `${prefixes.join("+")}-` : ""}(${normalizedPredicateStem})`.normalize("NFC");
      return Object.freeze({
        kind: "classical-nahuatl-lessons24-25-canvas-citation-stage-frame",
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        stageRole,
        predicateStem: normalizedPredicateStem,
        initialVowelKind: normalizeClassicalNahuatlLesson25Key(initialVowelKind),
        participantPositions: Object.freeze((Array.isArray(positions) ? positions : []).map(position => Object.freeze({ ...position }))),
        orderedParticipantRoles,
        participantCount: orderedParticipantRoles.length,
        directionalPrefix: normalizeClassicalNahuatlLesson25Token(directionalPrefix),
        hypothetical: hypothetical === true,
        sourceAuthority,
        causativeCitationRole: normalizedCausativeCitationRole,
        citationRealization: `${hypothetical ? "*" : ""}${citationCore}`
      });
    }
    function getClassicalNahuatlLessons2425CanvasTypedBridgeDescriptor(derivationOption = null) {
      const bridgeRecord = derivationOption?.lesson20NonactiveStemRecord || null;
      const exactBridgeFrame = derivationOption?.exactNonactiveBridgeFrame || null;
      const stem = normalizeClassicalNahuatlLesson25Token(
        derivationOption?.citationBridgeStem
        || exactBridgeFrame?.nonactiveStem
        || bridgeRecord?.nonactiveStem
        || derivationOption?.licensedLesson20NonactiveStem
        || derivationOption?.lesson20NonactiveStem
        || ""
      );
      const visibility = normalizeClassicalNahuatlLesson25Key(
        derivationOption?.citationBridgeVisibility
        || exactBridgeFrame?.citationVisibility
        || "visible"
      );
      const recordAuthority = normalizeClassicalNahuatlLesson25Key(bridgeRecord?.selectedFormationAuthority || "");
      const hasExplicitHypothetical = typeof derivationOption?.citationBridgeHypothetical === "boolean";
      return Object.freeze({
        stem,
        visibility,
        hypothetical: hasExplicitHypothetical
          ? derivationOption.citationBridgeHypothetical
          : exactBridgeFrame
            ? exactBridgeFrame.hypothetical === true
            : Boolean(recordAuthority && recordAuthority !== "productive-rule" && recordAuthority !== "exact-attested-formation"),
        sourceAuthority: derivationOption?.citationBridgeAuthority
          || exactBridgeFrame?.sourceAuthority
          || bridgeRecord?.selectedFormationAuthority
          || "typed-lesson20-nonactive-bridge"
      });
    }
    function buildClassicalNahuatlLessons2425CanvasSourcePrehistoryStage(derivationOption = null, {
      positions = [],
      initialVowelKind = "",
      machineryFrame = null
    } = {}) {
      const underlyingSource = normalizeClassicalNahuatlLesson25Token(derivationOption?.targetConstruction?.underlyingSource || "");
      if (!underlyingSource || !String(derivationOption?.derivationRoute || "").includes("fused-destockal")) return null;
      return buildClassicalNahuatlLessons2425CanvasCitationStage({
        stageRole: "typed-source-prehistory",
        predicateStem: underlyingSource,
        positions,
        initialVowelKind,
        hypothetical: true,
        sourceAuthority: "signed-andrews-fused-destockal-source-analysis",
        machineryFrame
      });
    }
    function buildClassicalNahuatlLessons2425CanvasCitationProjectionFrameInternal(machineryFrame = null, options = {}) {
      const rejectedAuthorityFields = getClassicalNahuatlLessons2425CanvasRejectedAuthorityFields(options);
      if (rejectedAuthorityFields.length) {
        return buildBlockedClassicalNahuatlLessons2425CanvasSurfaceFrame(CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND, machineryFrame, "classical-lessons24-25-caller-supplied-surface-authority-rejected", rejectedAuthorityFields);
      }
      const typedFrame = getClassicalNahuatlLesson25FinalTypedVncSlotFrame(machineryFrame);
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      if (!isCanonicalClassicalNahuatlLessons2425CanvasMachineryFrame(machineryFrame)
        || typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame !== "function"
        || runtimeTarget.isClassicalNahuatlVncSlotFrame(typedFrame) !== true) {
        return buildBlockedClassicalNahuatlLessons2425CanvasSurfaceFrame(CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND, machineryFrame);
      }
      const positions = getClassicalNahuatlLessons2425CanvasCitationPositions(machineryFrame, typedFrame);
      const predicateStem = getClassicalNahuatlLessons2425CanvasCitationPredicateStem(machineryFrame, typedFrame);
      const orderedParticipantRoles = Object.freeze(positions.map(position => Object.freeze({
        objectId: position.objectId || "",
        objectKind: normalizeClassicalNahuatlLessons2425CanvasObjectKind(position.objectKind),
        objectPerson: position.objectPerson || "",
        governor: position.governor || "",
        derivationalLevel: position.derivationalLevel || 0,
        prominence: position.prominence || "",
        surface: getClassicalNahuatlLessons2425CanvasCitationRole(position, machineryFrame?.citationRuleFrame?.initialVowelKind || "", machineryFrame)
      })).filter(role => role.surface));
      const directionalPrefix = normalizeClassicalNahuatlLesson25Token(machineryFrame?.targetEnvironment?.directionalPrefix || "");
      const operationFrame = machineryFrame?.derivationOperationFrame || null;
      const selectedOption = operationFrame?.selectedOption || null;
      const sourceMachineryFrame = operationFrame?.sourceMachineryFrame || null;
      const sourceTypedFrame = sourceMachineryFrame ? getClassicalNahuatlLesson25FinalTypedVncSlotFrame(sourceMachineryFrame) : null;
      const sourcePositions = sourceMachineryFrame && sourceTypedFrame
        ? getClassicalNahuatlLessons2425CanvasCitationPositions(sourceMachineryFrame, sourceTypedFrame)
        : Object.freeze([]);
      const sourceStage = buildClassicalNahuatlLessons2425CanvasCitationStage({
        stageRole: "source",
        predicateStem: operationFrame?.sourceStem || predicateStem,
        positions: operationFrame ? sourcePositions : positions,
        initialVowelKind: operationFrame ? sourceMachineryFrame?.citationRuleFrame?.initialVowelKind || "" : machineryFrame?.citationRuleFrame?.initialVowelKind || "",
        sourceAuthority: operationFrame ? "canonical-derivation-source-machinery" : "canonical-typed-machinery",
        machineryFrame: operationFrame ? sourceMachineryFrame : machineryFrame
      });
      const sourcePrehistoryStage = buildClassicalNahuatlLessons2425CanvasSourcePrehistoryStage(selectedOption, {
        positions: sourcePositions,
        initialVowelKind: sourceMachineryFrame?.citationRuleFrame?.initialVowelKind || "",
        machineryFrame: sourceMachineryFrame
      });
      const bridgeDescriptor = getClassicalNahuatlLessons2425CanvasTypedBridgeDescriptor(selectedOption);
      const bridgeStage = bridgeDescriptor.stem && bridgeDescriptor.visibility !== "implicit" ? buildClassicalNahuatlLessons2425CanvasCitationStage({
        stageRole: "lesson20-nonactive-bridge",
        predicateStem: bridgeDescriptor.stem,
        positions: [],
        hypothetical: bridgeDescriptor.hypothetical,
        sourceAuthority: bridgeDescriptor.sourceAuthority,
        machineryFrame
      }) : null;
      const targetStage = buildClassicalNahuatlLessons2425CanvasCitationStage({
        stageRole: operationFrame ? "derivation-target" : "surface",
        predicateStem,
        positions,
        initialVowelKind: machineryFrame?.citationRuleFrame?.initialVowelKind || "",
        directionalPrefix,
        sourceAuthority: operationFrame ? "canonical-derivation-operation-and-participant-transform" : "canonical-typed-machinery",
        causativeCitationRole: selectedOption?.causativeCitationRole || "",
        machineryFrame
      });
      const citationStages = Object.freeze(operationFrame
        ? [...(sourcePrehistoryStage ? [sourcePrehistoryStage] : []), sourceStage, ...(bridgeStage ? [bridgeStage] : []), targetStage]
        : [targetStage]);
      const sourceHistoryRealization = operationFrame
        ? [...(sourcePrehistoryStage ? [sourcePrehistoryStage] : []), sourceStage, ...(bridgeStage ? [bridgeStage] : [])].map(stage => stage.citationRealization).join(" > ")
        : targetStage.citationRealization;
      const frame = {
        kind: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lessons 24-25",
        section: machineryFrame?.derivationOperationFrame?.selectedOption?.andrewsSection || "24.1-25.9",
        sourceAuthority: "Andrews transcription and canonical typed projective roles",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        machineryFrame,
        typedFrame,
        participantPositions: positions,
        orderedParticipantRoles,
        participantCount: orderedParticipantRoles.length,
        predicateStem,
        citationStages,
        sourceHistoryRealization,
        relationRealization: operationFrame ? `${sourceHistoryRealization} > ${targetStage.citationRealization}` : targetStage.citationRealization,
        ruleFrames: Object.freeze([Object.freeze({
          ruleId: "cn-l24-25-citation-projective-role-order",
          section: "24.1-25.9",
          operation: "project-canonical-object-position-kinds-as-citation-level-projective-roles"
        })]),
        wordRealization: "",
        citationRealization: targetStage.citationRealization,
        typedFrameAuthority: true,
        grammarAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        grammarGenerationAllowed: true,
        surfaceGenerationAllowed: true,
        rejectedAuthorityFields: Object.freeze([])
      };
      frame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasSurfaceSignaturePayload(frame));
      return Object.freeze(frame);
    }
    function buildClassicalNahuatlLessons2425CanvasCitationProjectionFrame(machineryFrame = null, options = {}) {
      return buildClassicalNahuatlLessons2425CanvasCitationProjectionFrameInternal(machineryFrame, options);
    }
    function isClassicalNahuatlLessons2425CanvasCitationProjectionFrame(frame = null) {
      if (!frame
        || frame.kind !== CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND
        || frame.version !== CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.grammarAuthority !== true
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.catalogTargetAuthority !== false
        || frame.grammarGenerationAllowed !== true
        || frame.surfaceGenerationAllowed !== true) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlLessons2425CanvasCitationProjectionFrameInternal(frame.machineryFrame);
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.machineryFrame === frame.machineryFrame
        && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuilt, frame)
        && frame.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasSurfaceSignaturePayload(frame))
        && rebuilt.canonicalSignature === frame.canonicalSignature
        && areClassicalNahuatlLesson25ValuesEqual(getClassicalNahuatlLessons2425CanvasSurfaceSignaturePayload(rebuilt), getClassicalNahuatlLessons2425CanvasSurfaceSignaturePayload(frame)));
    }
    function getClassicalNahuatlLessons2425CanvasCitationInventorySignaturePayload(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        lesson: frame.lesson,
        section: frame.section,
        sourceAuthority: frame.sourceAuthority,
        sourceDocument: frame.sourceDocument,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        sourceKind: frame.sourceMachineryFrame?.kind || "",
        sourceCanonicalSignature: frame.sourceMachineryFrame?.canonicalSignature || "",
        sourceTypedSemanticIdentity: getClassicalNahuatlLesson25FinalTypedVncSlotFrame(frame.sourceMachineryFrame)?.semanticIdentity || "",
        derivationType: frame.derivationType,
        targetSubject: frame.targetSubject,
        derivationInventorySignature: frame.derivationOptionInventory?.canonicalSignature || "",
        options: (frame.options || []).map(option => ({
          optionId: option.optionId,
          derivationOptionId: option.derivationOptionId,
          operationSignature: option.operationFrame?.canonicalSignature || "",
          machinerySignature: option.machineryFrame?.canonicalSignature || "",
          projectionSignature: option.projectionFrame?.canonicalSignature || "",
          requestedCausativeObjectKind: option.requestedCausativeObjectKind,
          causativeObjectKind: option.causativeObjectKind,
          causativeReferentRelation: option.causativeReferentRelation,
          causativeSpecificShuntlineRealization: option.causativeSpecificShuntlineRealization,
          relationRealization: option.relationRealization
        })),
        typedFrameAuthority: frame.typedFrameAuthority,
        formulaStringAuthority: frame.formulaStringAuthority,
        surfaceStringAuthority: frame.surfaceStringAuthority,
        callerSuppliedAuthorityAccepted: frame.callerSuppliedAuthorityAccepted,
        catalogTargetAuthority: frame.catalogTargetAuthority,
        rejectedAuthorityFields: frame.rejectedAuthorityFields || []
      };
    }
    function getClassicalNahuatlLessons2425CanvasCitationInventoryOptionSignaturePayload(option = {}) {
      return {
        kind: option.kind,
        version: option.version,
        optionId: option.optionId,
        derivationOptionId: option.derivationOptionId,
        requestedCausativeObjectKind: option.requestedCausativeObjectKind,
        causativeObjectKind: option.causativeObjectKind,
        causativeReferentRelation: option.causativeReferentRelation,
        causativeSpecificShuntlineRealization: option.causativeSpecificShuntlineRealization,
        operationSignature: option.operationFrame?.canonicalSignature || "",
        machinerySignature: option.machineryFrame?.canonicalSignature || "",
        projectionSignature: option.projectionFrame?.canonicalSignature || "",
        relationRealization: option.relationRealization,
        formulaStringAuthority: option.formulaStringAuthority,
        surfaceStringAuthority: option.surfaceStringAuthority,
        catalogTargetAuthority: option.catalogTargetAuthority
      };
    }
    function buildBlockedClassicalNahuatlLessons2425CanvasCitationProjectionInventory(sourceMachineryFrame = null, blockReason = "classical-lessons24-25-canonical-source-machinery-required", rejectedAuthorityFields = []) {
      return Object.freeze({
        kind: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_INVENTORY_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lessons 24-25",
        section: "24.1-25.16",
        sourceAuthority: "Andrews transcription and canonical typed derivation-option inventory",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "blocked",
        blockReason,
        sourceMachineryFrame,
        derivationType: "causative",
        targetSubject: "",
        derivationOptionInventory: null,
        options: Object.freeze([]),
        optionCount: 0,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        rejectedAuthorityFields: Object.freeze([...rejectedAuthorityFields]),
        canonicalSignature: ""
      });
    }
    function getClassicalNahuatlLessons2425CanvasSourceSubject(sourceMachineryFrame = null) {
      return normalizeClassicalNahuatlLesson25Key(
        sourceMachineryFrame?.priorVncFrame?.personDyad?.subject
        || sourceMachineryFrame?.priorVncFrame?.subject
        || sourceMachineryFrame?.multipleObjectClusterFrame?.subject
        || sourceMachineryFrame?.subject
        || ""
      );
    }
    function getClassicalNahuatlLessons2425CanvasCitationProjectionInventoryInternal(sourceMachineryFrame = null, options = {}) {
      const rejectedAuthorityFields = getClassicalNahuatlLessons2425CanvasRejectedAuthorityFields(options);
      if (rejectedAuthorityFields.length) {
        return buildBlockedClassicalNahuatlLessons2425CanvasCitationProjectionInventory(sourceMachineryFrame, "classical-lessons24-25-caller-supplied-surface-authority-rejected", rejectedAuthorityFields);
      }
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      const derivationType = normalizeClassicalNahuatlLesson25Key(options.derivationType || "causative");
      const sourceSubject = getClassicalNahuatlLessons2425CanvasSourceSubject(sourceMachineryFrame);
      const targetSubject = normalizeClassicalNahuatlLesson25Key(options.targetSubject || sourceSubject);
      if (!isCanonicalClassicalNahuatlLessons2425CanvasMachineryFrame(sourceMachineryFrame)
        || derivationType !== "causative"
        || !["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].includes(targetSubject)
        || typeof runtimeTarget?.getClassicalNahuatlVncDerivationOptionInventory !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlVncDerivationOptionInventory !== "function"
        || typeof runtimeTarget?.deriveClassicalNahuatlVncDerivationOperationFrame !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlVncDerivationOperationFrame !== "function"
        || typeof runtimeTarget?.buildClassicalNahuatlDerivedVncMachineryFrame !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame !== "function") {
        return buildBlockedClassicalNahuatlLessons2425CanvasCitationProjectionInventory(sourceMachineryFrame);
      }
      const derivationOptionInventory = runtimeTarget.getClassicalNahuatlVncDerivationOptionInventory(sourceMachineryFrame, { derivationType });
      if (runtimeTarget.isClassicalNahuatlVncDerivationOptionInventory(derivationOptionInventory) !== true) {
        return buildBlockedClassicalNahuatlLessons2425CanvasCitationProjectionInventory(sourceMachineryFrame, derivationOptionInventory?.blockReason || "classical-lessons24-25-canonical-derivation-option-inventory-required");
      }
      const candidates = [];
      const operationSignatures = new Set();
      const sourceVoice = normalizeClassicalNahuatlLesson25Key(derivationOptionInventory.sourceAnalysisFrame?.sourceVoice || "active");
      const causativeObjectKindChoices = sourceVoice === "active"
        ? ["specific-projective", "nonspecific-human", "nonspecific-nonhuman"]
        : [""];
      for (const derivationOption of derivationOptionInventory.options || []) {
        for (const requestedCausativeObjectKind of causativeObjectKindChoices) {
          const referentRelationChoices = requestedCausativeObjectKind === "specific-projective"
            ? ["", "distinct", "coreferential"]
            : [""];
          for (const causativeReferentRelation of referentRelationChoices) {
            const baseRequest = {
              derivationType,
              optionId: derivationOption.optionId,
              targetSubject,
              ...(requestedCausativeObjectKind ? { causativeObjectKind: requestedCausativeObjectKind } : {}),
              ...(causativeReferentRelation ? { causativeReferentRelation } : {})
            };
            const preliminary = runtimeTarget.deriveClassicalNahuatlVncDerivationOperationFrame(sourceMachineryFrame, baseRequest);
            if (preliminary?.authorizationStatus !== "authorized") continue;
            const shuntlineChoices = preliminary.participantTransformFrame?.causativeSpecificShuntlineChoiceEligible === true
              ? ["silent", "sounded"]
              : [""];
            for (const causativeSpecificShuntlineRealization of shuntlineChoices) {
              const operationFrame = causativeSpecificShuntlineRealization
                ? runtimeTarget.deriveClassicalNahuatlVncDerivationOperationFrame(sourceMachineryFrame, {
                  ...baseRequest,
                  causativeSpecificShuntlineRealization
                })
                : preliminary;
              if (runtimeTarget.isClassicalNahuatlVncDerivationOperationFrame(operationFrame) !== true
                || operationSignatures.has(operationFrame.canonicalSignature)) continue;
              const machineryFrame = runtimeTarget.buildClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, {
                mood: normalizeClassicalNahuatlLesson25Key(sourceMachineryFrame?.priorVncFrame?.personDyad?.mood || sourceMachineryFrame?.priorVncFrame?.mood || "indicative"),
                tense: normalizeClassicalNahuatlLesson25Key(sourceMachineryFrame?.priorVncFrame?.tense || "present"),
                targetSubject
              });
              if (runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(machineryFrame) !== true) continue;
              const projectionFrame = buildClassicalNahuatlLessons2425CanvasCitationProjectionFrameInternal(machineryFrame);
              if (!isClassicalNahuatlLessons2425CanvasCitationProjectionFrame(projectionFrame)) continue;
              operationSignatures.add(operationFrame.canonicalSignature);
              const optionFrame = {
                kind: "classical-nahuatl-lessons24-25-canvas-citation-projection-option",
                version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
                optionId: `canvas-citation:${operationFrame.canonicalSignature}`,
                derivationOptionId: derivationOption.optionId,
                requestedCausativeObjectKind,
                causativeObjectKind: operationFrame.participantTransformFrame.causativeObjectKind,
                causativeReferentRelation: operationFrame.participantTransformFrame.causativeReferentRelation,
                causativeSpecificShuntlineRealization: operationFrame.participantTransformFrame.causativeSpecificShuntlineRealization,
                operationFrame,
                machineryFrame,
                projectionFrame,
                relationRealization: projectionFrame.relationRealization,
                formulaStringAuthority: false,
                surfaceStringAuthority: false,
                catalogTargetAuthority: false
              };
              optionFrame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasCitationInventoryOptionSignaturePayload(optionFrame));
              candidates.push(Object.freeze(optionFrame));
            }
          }
        }
      }
      const frame = {
        kind: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_INVENTORY_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lessons 24-25",
        section: "24.1-25.16",
        sourceAuthority: "Andrews transcription and canonical typed derivation-option inventory",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: candidates.length ? "authorized" : "blocked",
        blockReason: candidates.length ? "" : "classical-lessons24-25-no-canonical-citation-projection-options",
        sourceMachineryFrame,
        derivationType,
        targetSubject,
        derivationOptionInventory,
        options: Object.freeze(candidates),
        optionCount: candidates.length,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        rejectedAuthorityFields: Object.freeze([])
      };
      frame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasCitationInventorySignaturePayload(frame));
      return Object.freeze(frame);
    }
    function getClassicalNahuatlLessons2425CanvasCitationProjectionInventory(sourceMachineryFrame = null, options = {}) {
      return getClassicalNahuatlLessons2425CanvasCitationProjectionInventoryInternal(sourceMachineryFrame, options);
    }
    function isClassicalNahuatlLessons2425CanvasCitationProjectionInventory(frame = null) {
      if (!frame
        || frame.kind !== CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_INVENTORY_KIND
        || frame.version !== CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.catalogTargetAuthority !== false
        || frame.optionCount !== frame.options?.length
        || !(frame.options || []).every(option => isClassicalNahuatlLessons2425CanvasCitationProjectionFrame(option.projectionFrame))) {
        return false;
      }
      const rebuilt = getClassicalNahuatlLessons2425CanvasCitationProjectionInventoryInternal(frame.sourceMachineryFrame, {
        derivationType: frame.derivationType,
        targetSubject: frame.targetSubject
      });
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.sourceMachineryFrame === frame.sourceMachineryFrame
        && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuilt, frame)
        && frame.options.every((option, index) => {
          const rebuiltOption = rebuilt.options[index];
          return Boolean(rebuiltOption
            && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuiltOption, option)
            && option.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasCitationInventoryOptionSignaturePayload(option))
            && rebuiltOption.canonicalSignature === option.canonicalSignature
            && areClassicalNahuatlLesson25ValuesEqual(getClassicalNahuatlLessons2425CanvasCitationInventoryOptionSignaturePayload(rebuiltOption), getClassicalNahuatlLessons2425CanvasCitationInventoryOptionSignaturePayload(option)));
        })
        && frame.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasCitationInventorySignaturePayload(frame))
        && rebuilt.canonicalSignature === frame.canonicalSignature
        && areClassicalNahuatlLesson25ValuesEqual(getClassicalNahuatlLessons2425CanvasCitationInventorySignaturePayload(rebuilt), getClassicalNahuatlLessons2425CanvasCitationInventorySignaturePayload(frame)));
    }
    function getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilitySignaturePayload(possibility = {}) {
      return {
        kind: possibility.kind,
        version: possibility.version,
        profile: possibility.profile,
        derivationOptionId: possibility.derivationOptionId,
        derivationOptionSignature: possibility.derivationOptionSignature,
        operationSignature: possibility.operationFrame?.canonicalSignature || "",
        section: possibility.section,
        sourceCitationRealization: possibility.sourceCitationRealization,
        sourceHistoryRealization: possibility.sourceHistoryRealization,
        citationRealization: possibility.citationRealization,
        relationRealization: possibility.relationRealization,
        participantPositions: possibility.participantPositions || [],
        orderedParticipantRoles: possibility.orderedParticipantRoles || [],
        participantCount: possibility.participantCount || 0,
        typedFrameAuthority: possibility.typedFrameAuthority,
        formulaStringAuthority: possibility.formulaStringAuthority,
        surfaceStringAuthority: possibility.surfaceStringAuthority,
        callerSuppliedAuthorityAccepted: possibility.callerSuppliedAuthorityAccepted,
        catalogTargetAuthority: possibility.catalogTargetAuthority
      };
    }
    function getClassicalNahuatlLessons2425CanvasSchematicCitationInventorySignaturePayload(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        lesson: frame.lesson,
        section: frame.section,
        sourceAuthority: frame.sourceAuthority,
        sourceDocument: frame.sourceDocument,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        sourceKind: frame.sourceMachineryFrame?.kind || "",
        sourceCanonicalSignature: frame.sourceMachineryFrame?.canonicalSignature || "",
        derivationInventorySignature: frame.derivationOptionInventory?.canonicalSignature || "",
        sourceProjectionSignature: frame.sourceProjectionFrame?.canonicalSignature || "",
        participantProfiles: frame.participantProfiles || [],
        possibilities: (frame.possibilities || []).map(possibility => possibility.canonicalSignature || ""),
        possibilityCount: frame.possibilityCount || 0,
        typedFrameAuthority: frame.typedFrameAuthority,
        formulaStringAuthority: frame.formulaStringAuthority,
        surfaceStringAuthority: frame.surfaceStringAuthority,
        callerSuppliedAuthorityAccepted: frame.callerSuppliedAuthorityAccepted,
        catalogTargetAuthority: frame.catalogTargetAuthority
      };
    }
    function buildBlockedClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(sourceMachineryFrame = null, derivationOptionInventory = null, blockReason = "classical-lessons24-25-canonical-source-and-inventory-required") {
      return Object.freeze({
        kind: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CITATION_POSSIBILITY_INVENTORY_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lessons 24-25",
        section: "24.1-25.16",
        sourceAuthority: "canonical typed source, derivation-option inventory, participant transform, and Lesson 23 ordering",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "blocked",
        blockReason,
        sourceMachineryFrame,
        derivationOptionInventory,
        sourceProjectionFrame: null,
        participantProfiles: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES,
        possibilities: Object.freeze([]),
        possibilityCount: 0,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        canonicalSignature: ""
      });
    }
    function getClassicalNahuatlLessons2425CanvasSchematicCitationPositions(runtimeTarget = null, operationFrame = null) {
      const objectRequests = Array.isArray(operationFrame?.targetObjectRequests) ? operationFrame.targetObjectRequests : [];
      if (objectRequests.length === 1) {
        return Object.freeze([Object.freeze({
          objectId: "source-object-1",
          objectKind: objectRequests[0].objectKind,
          objectPerson: objectRequests[0].objectKind === "reflexive" && /^3(?:sg|pl)$/u.test(objectRequests[0].objectPerson)
            ? "nonfirst-common"
            : objectRequests[0].objectPerson,
          governor: "directive",
          derivationalLevel: 1,
          prominence: "mainline",
          sounded: true
        })]);
      }
      if (objectRequests.length < 2
        || typeof runtimeTarget?.buildClassicalNahuatlLesson23ObjectClusterFrame !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlLesson23ObjectClusterFrame !== "function") {
        return null;
      }
      const cluster = runtimeTarget.buildClassicalNahuatlLesson23ObjectClusterFrame(operationFrame.targetStem, {
        subject: operationFrame.targetSubject,
        subjectCarrier: "",
        predicateStem: operationFrame.targetStem,
        tense: operationFrame.sourceMachineryFrame?.priorVncFrame?.tense || "present",
        objectRequests,
        causativeSpecificShuntlineRealization: operationFrame.causativeSpecificShuntlineRealization,
        minimumPositionCount: objectRequests.length,
        maximumPositionCount: objectRequests.length
      });
      return runtimeTarget.isClassicalNahuatlLesson23ObjectClusterFrame(cluster, operationFrame.targetStem) === true
        ? Object.freeze(cluster.positions.map(position => Object.freeze({ ...position })))
        : null;
    }
    function buildClassicalNahuatlLessons2425CanvasSchematicBridgeStage(derivationOption = null, operationFrame = null) {
      const bridgeDescriptor = getClassicalNahuatlLessons2425CanvasTypedBridgeDescriptor(derivationOption);
      if (!bridgeDescriptor.stem || bridgeDescriptor.visibility === "implicit") return null;
      return buildClassicalNahuatlLessons2425CanvasCitationStage({
        stageRole: "lesson20-nonactive-bridge",
        predicateStem: bridgeDescriptor.stem,
        positions: [],
        hypothetical: bridgeDescriptor.hypothetical,
        sourceAuthority: bridgeDescriptor.sourceAuthority,
        machineryFrame: Object.freeze({ derivationOperationFrame: operationFrame })
      });
    }
    function getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventoryInternal(sourceMachineryFrame = null, derivationOptionInventory = null) {
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      if (!isCanonicalClassicalNahuatlLessons2425CanvasMachineryFrame(sourceMachineryFrame)
        || typeof runtimeTarget?.isClassicalNahuatlVncDerivationOptionInventory !== "function"
        || runtimeTarget.isClassicalNahuatlVncDerivationOptionInventory(derivationOptionInventory) !== true
        || derivationOptionInventory?.derivationType !== "causative"
        || derivationOptionInventory?.sourceMachineryFrame !== sourceMachineryFrame
        || typeof runtimeTarget?.deriveClassicalNahuatlVncDerivationOperationBatchFrame !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlVncDerivationOperationBatchFrame !== "function") {
        return buildBlockedClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(sourceMachineryFrame, derivationOptionInventory);
      }
      const sourceProjectionFrame = buildClassicalNahuatlLessons2425CanvasCitationProjectionFrameInternal(sourceMachineryFrame);
      if (!isClassicalNahuatlLessons2425CanvasCitationProjectionFrame(sourceProjectionFrame)) {
        return buildBlockedClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(sourceMachineryFrame, derivationOptionInventory, sourceProjectionFrame?.blockReason || "classical-lessons24-25-canonical-source-citation-required");
      }
      const operationEntries = [];
      for (const derivationOption of derivationOptionInventory.options || []) {
        for (const profile of CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES) {
          operationEntries.push(Object.freeze({
            derivationOption,
            profile,
            request: Object.freeze({
              derivationType: "causative",
              optionId: derivationOption.optionId,
              targetSubject: profile.targetSubject,
              causativeObjectKind: profile.causativeObjectKind,
              causativeReferentRelation: profile.causativeReferentRelation
            })
          }));
        }
      }
      const operationBatchFrame = runtimeTarget.deriveClassicalNahuatlVncDerivationOperationBatchFrame(
        sourceMachineryFrame,
        derivationOptionInventory,
        operationEntries.map(entry => entry.request)
      );
      if (runtimeTarget.isClassicalNahuatlVncDerivationOperationBatchFrame(operationBatchFrame) !== true) {
        return buildBlockedClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(
          sourceMachineryFrame,
          derivationOptionInventory,
          operationBatchFrame?.blockReason || "classical-lessons24-25-canonical-operation-batch-required"
        );
      }
      const possibilities = [];
      operationEntries.forEach((entry, index) => {
          const { derivationOption, profile } = entry;
          const operationFrame = operationBatchFrame.operationFrames[index];
          if (operationFrame?.authorizationStatus !== "authorized") return;
          const participantPositions = getClassicalNahuatlLessons2425CanvasSchematicCitationPositions(runtimeTarget, operationFrame);
          if (!participantPositions) return;
          const sourcePrehistoryStage = buildClassicalNahuatlLessons2425CanvasSourcePrehistoryStage(derivationOption, {
            positions: sourceProjectionFrame.participantPositions,
            initialVowelKind: sourceMachineryFrame?.citationRuleFrame?.initialVowelKind || "",
            machineryFrame: sourceMachineryFrame
          });
          const bridgeStage = buildClassicalNahuatlLessons2425CanvasSchematicBridgeStage(derivationOption, operationFrame);
          const targetStage = buildClassicalNahuatlLessons2425CanvasCitationStage({
            stageRole: "derivation-target",
            predicateStem: operationFrame.targetStem,
            positions: participantPositions,
            initialVowelKind: sourceMachineryFrame?.citationRuleFrame?.initialVowelKind || "",
            directionalPrefix: operationFrame.targetEnvironment?.directionalPrefix || "",
            sourceAuthority: "canonical-derivation-operation-and-lesson23-participant-order",
            causativeCitationRole: derivationOption.causativeCitationRole || "",
            machineryFrame: Object.freeze({ derivationOperationFrame: operationFrame })
          });
          const sourceHistoryRealization = [
            ...(sourcePrehistoryStage ? [sourcePrehistoryStage.citationRealization] : []),
            sourceProjectionFrame.citationRealization,
            ...(bridgeStage ? [bridgeStage.citationRealization] : [])
          ].join(" > ");
          const possibility = {
            kind: "classical-nahuatl-lessons24-25-canvas-schematic-citation-possibility",
            version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
            profile,
            derivationOptionId: derivationOption.optionId,
            derivationOptionSignature: derivationOption.canonicalSignature,
            operationFrame,
            section: derivationOption.andrewsSection || "24.1-25.16",
            sourceCitationRealization: sourceProjectionFrame.citationRealization,
            sourceHistoryRealization,
            citationRealization: targetStage.citationRealization,
            relationRealization: `${sourceHistoryRealization} > ${targetStage.citationRealization}`,
            participantPositions,
            orderedParticipantRoles: targetStage.orderedParticipantRoles,
            participantCount: targetStage.participantCount,
            typedFrameAuthority: true,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
            callerSuppliedAuthorityAccepted: false,
            catalogTargetAuthority: false
          };
          possibility.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilitySignaturePayload(possibility));
          possibilities.push(Object.freeze(possibility));
      });
      const frame = {
        kind: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CITATION_POSSIBILITY_INVENTORY_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lessons 24-25",
        section: "24.1-25.16",
        sourceAuthority: "canonical typed source, derivation-option inventory, participant transform, and Lesson 23 ordering",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: possibilities.length ? "authorized" : "blocked",
        blockReason: possibilities.length ? "" : "classical-lessons24-25-no-canonical-schematic-citation-possibilities",
        sourceMachineryFrame,
        derivationOptionInventory,
        sourceProjectionFrame,
        participantProfiles: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES,
        possibilities: Object.freeze(possibilities),
        possibilityCount: possibilities.length,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false
      };
      frame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasSchematicCitationInventorySignaturePayload(frame));
      return Object.freeze(frame);
    }
    function getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(sourceMachineryFrame = null, derivationOptionInventory = null) {
      return getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventoryInternal(sourceMachineryFrame, derivationOptionInventory);
    }
    function isClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory(frame = null) {
      if (!frame
        || frame.kind !== CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CITATION_POSSIBILITY_INVENTORY_KIND
        || frame.version !== CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.catalogTargetAuthority !== false
        || frame.participantProfiles !== CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES
        || frame.possibilityCount !== frame.possibilities?.length) {
        return false;
      }
      const rebuilt = getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventoryInternal(frame.sourceMachineryFrame, frame.derivationOptionInventory);
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.sourceMachineryFrame === frame.sourceMachineryFrame
        && rebuilt.derivationOptionInventory === frame.derivationOptionInventory
        && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuilt, frame)
        && frame.possibilities.every((possibility, index) => {
          const rebuiltPossibility = rebuilt.possibilities[index];
          return Boolean(rebuiltPossibility
            && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuiltPossibility, possibility)
            && possibility.operationFrame?.sourceMachineryFrame === frame.sourceMachineryFrame
            && possibility.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilitySignaturePayload(possibility))
            && rebuiltPossibility.canonicalSignature === possibility.canonicalSignature
            && areClassicalNahuatlLesson25ValuesEqual(
              getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilitySignaturePayload(rebuiltPossibility),
              getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilitySignaturePayload(possibility)
            ));
        })
        && frame.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlLessons2425CanvasSchematicCitationInventorySignaturePayload(frame))
        && rebuilt.canonicalSignature === frame.canonicalSignature
        && areClassicalNahuatlLesson25ValuesEqual(
          getClassicalNahuatlLessons2425CanvasSchematicCitationInventorySignaturePayload(rebuilt),
          getClassicalNahuatlLessons2425CanvasSchematicCitationInventorySignaturePayload(frame)
        ));
    }
    function capitalizeClassicalNahuatlLesson25Surface(value = "") {
      const normalized = normalizeClassicalNahuatlLesson25Token(value);
      return normalized ? `${normalized[0].toLocaleUpperCase()}${normalized.slice(1)}` : "";
    }
    function realizeClassicalNahuatlLesson25Sentence({
      word = "",
      sentenceParticles = [],
      punctuation = "."
    } = {}) {
      const particles = (Array.isArray(sentenceParticles) ? sentenceParticles : [])
        .map(getClassicalNahuatlLesson25TypedCarrierSurface)
        .filter(Boolean);
      const words = particles.length
        ? [capitalizeClassicalNahuatlLesson25Surface(particles[0]), ...particles.slice(1), word]
        : [capitalizeClassicalNahuatlLesson25Surface(word)];
      return `${words.filter(Boolean).join(" ")}${punctuation || "."}`;
    }
    function getClassicalNahuatlLesson25RejectedOutputFields(options = {}) {
      return CLASSICAL_NAHUATL_LESSON25_FORBIDDEN_OUTPUT_FIELDS.filter(field => (
        Object.prototype.hasOwnProperty.call(options || {}, field)
        && options[field] !== undefined
        && options[field] !== null
        && options[field] !== ""
        && options[field] !== false
      ));
    }
    function buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame = null, requestedTarget = "", blockReason = "classical-lesson25-14-derived-causative-assertion-required", rejectedAuthorityFields = []) {
      return Object.freeze({
        kind: CLASSICAL_NAHUATL_LESSON25_MOOD_TRANSFORMATION_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lesson 25",
        section: "25.14",
        authorizationStatus: "blocked",
        blockReason,
        sourceFrame,
        sourceTypedFrame: null,
        targetTypedFrame: null,
        transformationType: requestedTarget,
        rejectedAuthorityFields: Object.freeze([...rejectedAuthorityFields]),
        sourceFormulaRealization: "",
        targetFormulaRealization: "",
        sourceWordRealization: "",
        wordRealization: "",
        sentenceRealization: "",
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        canonicalSignature: ""
      });
    }
    function getClassicalNahuatlLesson25ObjectIdentity(objectRequest = {}) {
      return Object.freeze({
        objectId: normalizeClassicalNahuatlLesson25Token(objectRequest.objectId),
        objectKind: normalizeClassicalNahuatlLesson25Key(objectRequest.objectKind),
        objectPerson: normalizeClassicalNahuatlLesson25Key(objectRequest.objectPerson),
        governor: normalizeClassicalNahuatlLesson25Key(objectRequest.governor),
        derivationalLevel: Number(objectRequest.derivationalLevel) || 0
      });
    }
    function getClassicalNahuatlLesson25TransformationSignaturePayload(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        lesson: frame.lesson,
        section: frame.section,
        sourceAuthority: frame.sourceAuthority,
        sourceDocument: frame.sourceDocument,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        ruleRefs: frame.ruleRefs,
        sourceCanonicalSignature: frame.sourceFrame?.canonicalSignature || "",
        sourceOperationSignature: frame.sourceFrame?.derivationOperationFrame?.canonicalSignature || "",
        sourceTypedFrame: frame.sourceTypedFrame,
        sourceAssertionSentenceFrame: frame.sourceAssertionSentenceFrame,
        lowerTargetMachineryFrame: frame.lowerTargetMachineryFrame,
        targetMachineryFrame: frame.targetMachineryFrame,
        targetTypedFrame: frame.targetTypedFrame,
        targetSentenceFrame: frame.targetSentenceFrame,
        targetObjectClusterFrame: frame.targetObjectClusterFrame,
        transformationType: frame.transformationType,
        sourceMood: frame.sourceMood,
        sourceTense: frame.sourceTense,
        targetMood: frame.targetMood,
        targetTense: frame.targetTense,
        targetSentenceType: frame.targetSentenceType,
        targetSentenceRole: frame.targetSentenceRole,
        targetSentenceRoleAuthority: frame.targetSentenceRoleAuthority,
        exactQuantityFinalizerFrame: frame.exactQuantityFinalizerFrame,
        introductoryParticle: frame.introductoryParticle,
        particleRealization: frame.particleRealization,
        sentenceParticles: frame.sentenceParticles,
        sourceFormulaRealization: frame.sourceFormulaRealization,
        targetFormulaRealization: frame.targetFormulaRealization,
        sourceWordRealization: frame.sourceWordRealization,
        sourceSentenceRealization: frame.sourceSentenceRealization,
        wordRealization: frame.wordRealization,
        sentenceRealization: frame.sentenceRealization,
        lexicalDerivationIdentity: frame.lexicalDerivationIdentity,
        participantIdentity: frame.participantIdentity,
        lexicalDerivationIdentityPreserved: frame.lexicalDerivationIdentityPreserved,
        participantIdentityPreserved: frame.participantIdentityPreserved,
        sourceTargetTypedFrames: frame.sourceTargetTypedFrames,
        targetObjectPositions: frame.targetObjectClusterFrame?.positions || [],
        targetObjectClusterChoice: frame.targetObjectClusterFrame ? {
          causativeSpecificShuntlineRealization: frame.targetObjectClusterFrame.causativeSpecificShuntlineRealization || "",
          causativeSpecificShuntlineChoiceEligible: frame.targetObjectClusterFrame.causativeSpecificShuntlineChoiceEligible === true,
          causativeSpecificShuntlineObjectId: frame.targetObjectClusterFrame.causativeSpecificShuntlineObjectId || "",
          causativeSpecificShuntlineRuleFrame: frame.targetObjectClusterFrame.causativeSpecificShuntlineRuleFrame || null
        } : null,
        typedFrameAuthority: frame.typedFrameAuthority,
        formulaStringAuthority: frame.formulaStringAuthority,
        surfaceStringAuthority: frame.surfaceStringAuthority,
        callerSuppliedAuthorityAccepted: frame.callerSuppliedAuthorityAccepted,
        catalogTargetAuthority: frame.catalogTargetAuthority,
        grammarGenerationAllowed: frame.grammarGenerationAllowed,
        formulaOutputAllowed: frame.formulaOutputAllowed,
        surfaceGenerationAllowed: frame.surfaceGenerationAllowed,
        rejectedAuthorityFields: frame.rejectedAuthorityFields
      };
    }
    function getClassicalNahuatlLesson25ObjectFrameFromTypedVncFrame(typedFrame = null, predicateStem = "") {
      const prePredicate = Array.isArray(typedFrame?.slots?.prePredicate) ? typedFrame.slots.prePredicate : [];
      if (typedFrame?.valenceArity === "multiple") {
        const positions = prePredicate.map(slot => slot.objectPositionFrame || (slot.kind === "monadic-valence" ? {
          valenceArity: "monadic",
          va: slot.va,
          carrier: slot.carrier
        } : {
          valenceArity: "dyadic",
          va1: slot.va1,
          va2: slot.va2,
          carrier: slot.carrier
        }));
        return {
          valenceArity: "multiple",
          positions,
          stemRealization: predicateStem
        };
      }
      const slot = prePredicate[0] || null;
      if (typedFrame?.valenceArity === "monadic") {
        return {
          valenceArity: "monadic",
          va: slot?.va || "",
          stemRealization: predicateStem
        };
      }
      if (typedFrame?.valenceArity === "dyadic") {
        return {
          valenceArity: "dyadic",
          va1: slot?.va1 || "",
          va2: slot?.va2 || "",
          va1MorphIdentityFrame: typedFrame?.objectMorphIdentityFrame || null,
          stemRealization: predicateStem
        };
      }
      return {
        valenceArity: "vacant",
        stemRealization: predicateStem
      };
    }
    function applyClassicalNahuatlLesson2514ExactQuantityFinalizer(sourceFrame = null, targetTypedFrame = null, {
      requestedTarget = "",
      targetSubject = ""
    } = {}) {
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      const exactCommandApplies = Boolean(
        requestedTarget === "command"
        && normalizeClassicalNahuatlLesson25Key(targetSubject) === "2pl"
        && normalizeClassicalNahuatlLesson25Token(sourceFrame?.targetStem) === "chīhua-l-tiā"
        && targetTypedFrame?.slots?.predicate?.stem === "chīhua-l-tī"
      );
      if (!exactCommandApplies) {
        return Object.freeze({
          typedFrame: targetTypedFrame,
          operationFrame: null
        });
      }
      const predicateStem = "chīhua-l-ti";
      const exactTypedFrame = runtimeTarget.buildClassicalNahuatlVncSlotFrame({
        sourceFrameKind: CLASSICAL_NAHUATL_LESSON25_EXACT_QUANTITY_FINALIZER_KIND,
        sourceAuthorizationStatus: "authorized",
        stem: predicateStem,
        personDyad: targetTypedFrame.slots.subject,
        tenseFrame: {
          tns: targetTypedFrame.slots.predicate.tns
        },
        numberDyad: targetTypedFrame.slots.number,
        objectFrame: getClassicalNahuatlLesson25ObjectFrameFromTypedVncFrame(targetTypedFrame, predicateStem),
        formulaArtifact: "Mā xictlachīhualticān."
      });
      if (runtimeTarget.isClassicalNahuatlVncSlotFrame(exactTypedFrame) !== true) {
        return Object.freeze({
          typedFrame: null,
          operationFrame: Object.freeze({
            kind: CLASSICAL_NAHUATL_LESSON25_EXACT_QUANTITY_FINALIZER_KIND,
            authorizationStatus: "blocked",
            blockReason: "classical-lesson25-14-exact-command-quantity-rebuild-failed"
          })
        });
      }
      const operationFrame = {
        kind: CLASSICAL_NAHUATL_LESSON25_EXACT_QUANTITY_FINALIZER_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lesson 25",
        section: "25.14",
        authorizationStatus: "authorized",
        blockReason: "",
        ruleId: "cn-l25-2514-command-short-ti-exact-finalizer",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        transcriptionLineStart: 8828,
        transcriptionLineEnd: 8828,
        environment: Object.freeze({
          transformationType: requestedTarget,
          targetSubject: normalizeClassicalNahuatlLesson25Key(targetSubject),
          targetStem: sourceFrame.targetStem
        }),
        lowerPredicateStem: targetTypedFrame.slots.predicate.stem,
        finalPredicateStem: predicateStem,
        quantityOperation: "replace-final-causative-tī-with-command-ti",
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        exactWitness: "Command: Mā xictlachīhualticān."
      };
      operationFrame.canonicalSignature = signClassicalNahuatlLesson25Value(operationFrame);
      return Object.freeze({
        typedFrame: exactTypedFrame,
        operationFrame: Object.freeze(operationFrame)
      });
    }
    function buildClassicalNahuatlLesson2514MoodTransformationFrameInternal(sourceFrame = null, options = {}) {
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      const requestedTarget = normalizeClassicalNahuatlLesson2514MoodTarget(options);
      const profile = getClassicalNahuatlLesson2514MoodTargetProfile(requestedTarget);
      const rejectedAuthorityFields = getClassicalNahuatlLesson25RejectedOutputFields(options);
      if (rejectedAuthorityFields.length) {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, "classical-lesson25-14-caller-output-authority-forbidden", rejectedAuthorityFields);
      }
      if (!isClassicalNahuatlLesson2514DerivedCausativeAssertionFrame(sourceFrame)) {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget);
      }
      if (!CLASSICAL_NAHUATL_LESSON25_MOOD_TARGETS.includes(requestedTarget) || !profile) {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, "classical-lesson25-14-mood-target-not-recognized");
      }
      const assertionEnvironment = getClassicalNahuatlLesson25AssertionEnvironment(sourceFrame);
      const subjectPersonClass = getClassicalNahuatlLesson25SubjectPersonClass(assertionEnvironment.subject);
      if (!profile.allowedSubjectPersonClasses.includes(subjectPersonClass)) {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, "classical-lesson25-14-target-role-subject-mismatch");
      }
      const requiredCapabilities = [
        "buildClassicalNahuatlVncSlotFrame",
        "buildClassicalNahuatlLesson7VerbstemClassFrame",
        "buildClassicalNahuatlLesson23ObjectClusterFrame",
        "isClassicalNahuatlLesson23ObjectClusterFrame",
        "applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame",
        "buildClassicalNahuatlLesson82SentenceSurfaceFrame",
        "isClassicalNahuatlVncSlotFrame",
        "renderClassicalNahuatlVncSlotFrameFormula"
      ];
      const missingCapabilities = requiredCapabilities.filter(capability => typeof runtimeTarget?.[capability] !== "function");
      if (missingCapabilities.length) {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, `classical-lesson25-14-runtime-capabilities-missing:${missingCapabilities.join(",")}`);
      }
      const targetObjectRequests = sourceFrame.targetObjectRequests.map(getClassicalNahuatlLesson25ObjectIdentity);
      const baseObjectRequest = [...targetObjectRequests].sort((left, right) => left.derivationalLevel - right.derivationalLevel)[0] || null;
      const baseValence = getClassicalNahuatlLesson25ValenceForObjectKind(baseObjectRequest?.objectKind || "");
      if (!baseObjectRequest || !baseValence) {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, "classical-lesson25-14-typed-causative-object-required");
      }
      const sentenceOptions = Object.freeze({
        subject: assertionEnvironment.subject,
        mood: profile.mood,
        tense: profile.tense,
        verbClass: sourceFrame.targetClass,
        perfectiveClass: sourceFrame.targetClass,
        valence: baseValence,
        transitivity: "transitive",
        objectKind: baseObjectRequest.objectKind,
        objectPerson: baseObjectRequest.objectPerson,
        object: baseObjectRequest.objectPerson,
        sentenceType: profile.sentenceType,
        introductoryParticle: "mā"
      });
      const lowerTargetMachineryFrame = runtimeTarget.buildClassicalNahuatlLesson7VerbstemClassFrame(sourceFrame.targetStem, sentenceOptions);
      const lowerTargetTypedFrame = getClassicalNahuatlLesson25FinalTypedVncSlotFrame(lowerTargetMachineryFrame);
      if (lowerTargetMachineryFrame?.authorizationStatus !== "authorized" || runtimeTarget.isClassicalNahuatlVncSlotFrame(lowerTargetTypedFrame) !== true) {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, lowerTargetMachineryFrame?.blockReason || "classical-lesson25-14-lower-finite-machinery-blocked");
      }
      let targetMachineryFrame = lowerTargetMachineryFrame;
      let targetObjectClusterFrame = null;
      if (targetObjectRequests.length > 1) {
        targetObjectClusterFrame = runtimeTarget.buildClassicalNahuatlLesson23ObjectClusterFrame(sourceFrame.targetStem, {
          subject: assertionEnvironment.subject,
          subjectCarrier: lowerTargetTypedFrame.slots.subject.pers1,
          predicateStem: lowerTargetTypedFrame.slots.predicate.stem,
          tense: profile.tense,
          objectRequests: targetObjectRequests,
          causativeSpecificShuntlineRealization: sourceFrame.participantTransformFrame?.causativeSpecificShuntlineRealization || "",
          minimumPositionCount: targetObjectRequests.length,
          maximumPositionCount: targetObjectRequests.length
        });
        if (runtimeTarget.isClassicalNahuatlLesson23ObjectClusterFrame(targetObjectClusterFrame, sourceFrame.targetStem) !== true) {
          return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, targetObjectClusterFrame?.blockReason || "classical-lesson25-14-object-cluster-blocked");
        }
        targetMachineryFrame = runtimeTarget.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(lowerTargetMachineryFrame, targetObjectClusterFrame);
      }
      const lowerFinalTargetTypedFrame = getClassicalNahuatlLesson25FinalTypedVncSlotFrame(targetMachineryFrame);
      if (targetMachineryFrame?.authorizationStatus !== "authorized" || runtimeTarget.isClassicalNahuatlVncSlotFrame(lowerFinalTargetTypedFrame) !== true) {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, targetMachineryFrame?.blockReason || "classical-lesson25-14-target-typed-frame-blocked");
      }
      const exactQuantityFinalization = applyClassicalNahuatlLesson2514ExactQuantityFinalizer(sourceFrame, lowerFinalTargetTypedFrame, {
        requestedTarget,
        targetSubject: assertionEnvironment.subject
      });
      const targetTypedFrame = exactQuantityFinalization.typedFrame;
      const exactQuantityFinalizerFrame = exactQuantityFinalization.operationFrame;
      if (runtimeTarget.isClassicalNahuatlVncSlotFrame(targetTypedFrame) !== true) {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, exactQuantityFinalizerFrame?.blockReason || "classical-lesson25-14-exact-quantity-finalizer-blocked");
      }
      const sourceTypedFrame = getClassicalNahuatlLesson25FinalTypedVncSlotFrame(sourceFrame);
      const sourceFormulaRealization = runtimeTarget.renderClassicalNahuatlVncSlotFrameFormula(sourceTypedFrame);
      const targetFormulaRealization = runtimeTarget.renderClassicalNahuatlVncSlotFrameFormula(targetTypedFrame);
      const sourceAssertionSentenceFrame = runtimeTarget.buildClassicalNahuatlLesson82SentenceSurfaceFrame({
        selectedFormula: sourceFormulaRealization,
        mood: "indicative",
        expandedVncBoundaryFrame: sourceFrame.expandedVncBoundaryFrame || null,
        priorVncFrame: sourceFrame.priorVncFrame || sourceFrame.targetLesson7MachineryFrame?.priorVncFrame || null,
        predicateFormationRuleFrame: sourceFrame.predicateFormationRuleFrame || sourceFrame.targetLesson7MachineryFrame?.predicateFormationRuleFrame || null,
        options: {
          subject: assertionEnvironment.subject,
          mood: "indicative",
          tense: "present",
          sentenceType: "affirmative-assertion"
        }
      });
      const targetSentenceFrame = runtimeTarget.buildClassicalNahuatlLesson82SentenceSurfaceFrame({
        selectedFormula: targetFormulaRealization,
        mood: profile.mood,
        expandedVncBoundaryFrame: targetMachineryFrame.expandedVncBoundaryFrame || null,
        priorVncFrame: targetMachineryFrame.priorVncFrame || lowerTargetMachineryFrame.priorVncFrame || null,
        predicateFormationRuleFrame: targetMachineryFrame.predicateFormationRuleFrame || lowerTargetMachineryFrame.predicateFormationRuleFrame || null,
        options: sentenceOptions
      });
      if (sourceAssertionSentenceFrame?.authorizationStatus !== "authorized") {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, sourceAssertionSentenceFrame?.blockReason || "classical-lesson25-14-source-assertion-finalizer-blocked");
      }
      if (targetSentenceFrame?.authorizationStatus !== "authorized") {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, targetSentenceFrame?.blockReason || "classical-lesson25-14-target-sentence-finalizer-blocked");
      }
      if (targetSentenceFrame.canvasSentenceRole !== profile.expectedRole) {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, "classical-lesson25-14-lower-sentence-role-contradiction");
      }
      const sourceWordRealization = realizeClassicalNahuatlLesson25TypedVncWord(sourceTypedFrame);
      const wordRealization = realizeClassicalNahuatlLesson25TypedVncWord(targetTypedFrame);
      if (!sourceWordRealization || !wordRealization) {
        return buildBlockedClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame, requestedTarget, "classical-lesson25-14-typed-word-realization-failed");
      }
      const sourceSentenceRealization = realizeClassicalNahuatlLesson25Sentence({
        word: sourceWordRealization,
        sentenceParticles: sourceAssertionSentenceFrame.sentenceParticles,
        punctuation: sourceAssertionSentenceFrame.finalPunctuation
      });
      const sentenceRealization = realizeClassicalNahuatlLesson25Sentence({
        word: wordRealization,
        sentenceParticles: targetSentenceFrame.sentenceParticles,
        punctuation: targetSentenceFrame.finalPunctuation
      });
      const operationFrame = sourceFrame.derivationOperationFrame;
      const lexicalDerivationIdentity = freezeClassicalNahuatlLesson25Value({
        sourceSignature: sourceFrame.sourceSignature,
        operationSignature: operationFrame.canonicalSignature,
        selectedOptionId: operationFrame.selectedOptionId,
        derivationRoute: operationFrame.selectedOption?.derivationRoute || "",
        targetStem: sourceFrame.targetStem,
        targetClass: sourceFrame.targetClass
      });
      const participantIdentity = freezeClassicalNahuatlLesson25Value({
        participantTransformSignature: sourceFrame.participantTransformFrame.canonicalSignature,
        targetSubject: assertionEnvironment.subject,
        targetObjectRequests
      });
      const frame = {
        kind: CLASSICAL_NAHUATL_LESSON25_MOOD_TRANSFORMATION_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lesson 25",
        section: "25.14",
        sourceAuthority: "Andrews transcription and canonical typed lower-lesson frames",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        ruleRefs: CLASSICAL_NAHUATL_LESSON25_MOOD_RULE_REFS,
        sourceFrame,
        sourceTypedFrame,
        sourceAssertionSentenceFrame: freezeClassicalNahuatlLesson25Value(sourceAssertionSentenceFrame),
        lowerTargetMachineryFrame: freezeClassicalNahuatlLesson25Value(lowerTargetMachineryFrame),
        targetMachineryFrame: freezeClassicalNahuatlLesson25Value(targetMachineryFrame),
        targetTypedFrame,
        targetSentenceFrame: freezeClassicalNahuatlLesson25Value(targetSentenceFrame),
        targetObjectClusterFrame: freezeClassicalNahuatlLesson25Value(targetObjectClusterFrame),
        exactQuantityFinalizerFrame: freezeClassicalNahuatlLesson25Value(exactQuantityFinalizerFrame),
        transformationType: requestedTarget,
        sourceMood: "indicative",
        sourceTense: "present",
        targetMood: profile.mood,
        targetTense: profile.tense,
        targetSentenceType: targetSentenceFrame.sentenceType,
        targetSentenceRole: targetSentenceFrame.canvasSentenceRole,
        targetSentenceRoleAuthority: targetSentenceFrame.sentenceRoleAuthority,
        introductoryParticle: targetSentenceFrame.introductoryParticle,
        particleRealization: capitalizeClassicalNahuatlLesson25Surface(targetSentenceFrame.introductoryParticle),
        sentenceParticles: Object.freeze([...targetSentenceFrame.sentenceParticles]),
        sourceFormulaRealization,
        targetFormulaRealization,
        sourceWordRealization,
        sourceSentenceRealization,
        wordRealization,
        sentenceRealization,
        lexicalDerivationIdentity,
        participantIdentity,
        lexicalDerivationIdentityPreserved: true,
        participantIdentityPreserved: true,
        sourceTargetTypedFrames: Object.freeze({
          source: sourceTypedFrame,
          target: targetTypedFrame
        }),
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        grammarGenerationAllowed: true,
        formulaOutputAllowed: true,
        surfaceGenerationAllowed: true,
        rejectedAuthorityFields: Object.freeze([])
      };
      frame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlLesson25TransformationSignaturePayload(frame));
      return Object.freeze(frame);
    }
    function buildClassicalNahuatlLesson2514MoodTransformationFrame(sourceFrame = null, options = {}) {
      return buildClassicalNahuatlLesson2514MoodTransformationFrameInternal(sourceFrame, options);
    }
    function isClassicalNahuatlLesson2514MoodTransformationFrame(frame = null) {
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      if (!frame
        || frame.kind !== CLASSICAL_NAHUATL_LESSON25_MOOD_TRANSFORMATION_KIND
        || frame.version !== CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.catalogTargetAuthority !== false
        || frame.lexicalDerivationIdentityPreserved !== true
        || frame.participantIdentityPreserved !== true
        || !isClassicalNahuatlLesson2514DerivedCausativeAssertionFrame(frame.sourceFrame)
        || typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame !== "function"
        || runtimeTarget.isClassicalNahuatlVncSlotFrame(frame.sourceTypedFrame) !== true
        || runtimeTarget.isClassicalNahuatlVncSlotFrame(frame.targetTypedFrame) !== true) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlLesson2514MoodTransformationFrameInternal(frame.sourceFrame, {
        target: frame.transformationType
      });
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.sourceFrame === frame.sourceFrame
        && frame.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlLesson25TransformationSignaturePayload(frame))
        && frame.canonicalSignature === rebuilt.canonicalSignature
        && areClassicalNahuatlLesson25ValuesEqual(getClassicalNahuatlLesson25TransformationSignaturePayload(frame), getClassicalNahuatlLesson25TransformationSignaturePayload(rebuilt)));
    }
    function installClassicalNahuatlLesson25LaterLayersClassicGlobals() {
      const runtimeTarget = getClassicalNahuatlLesson25RuntimeTarget();
      if (!runtimeTarget || typeof runtimeTarget !== "object") {
        return null;
      }
      Object.assign(runtimeTarget, {
        isClassicalNahuatlLesson2514DerivedCausativeAssertionFrame,
        realizeClassicalNahuatlLesson25TypedVncWord,
        buildClassicalNahuatlVncFiniteSurfaceFrame,
        isClassicalNahuatlVncFiniteSurfaceFrame,
        buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrame,
        isClassicalNahuatlLesson2513AlternativeSourceProjectionFrame,
        buildClassicalNahuatlLessons2425CanvasCitationProjectionFrame,
        isClassicalNahuatlLessons2425CanvasCitationProjectionFrame,
        getClassicalNahuatlLessons2425CanvasCitationProjectionInventory,
        isClassicalNahuatlLessons2425CanvasCitationProjectionInventory,
        getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory,
        isClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory,
        buildClassicalNahuatlLesson2514MoodTransformationFrame,
        isClassicalNahuatlLesson2514MoodTransformationFrame
      });
      return runtimeTarget;
    }
    installClassicalNahuatlLesson25LaterLayersClassicGlobals();

    return {
      CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
      CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
      CLASSICAL_NAHUATL_LESSON25_MOOD_TRANSFORMATION_KIND,
      CLASSICAL_NAHUATL_LESSON25_EXACT_QUANTITY_FINALIZER_KIND,
      CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND,
      CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND,
      CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_INVENTORY_KIND,
      CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CITATION_POSSIBILITY_INVENTORY_KIND,
      CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES,
      CLASSICAL_NAHUATL_LESSON25_MOOD_TARGETS,
      CLASSICAL_NAHUATL_LESSON25_MOOD_RULE_REFS,
      isClassicalNahuatlLesson2514DerivedCausativeAssertionFrame,
      realizeClassicalNahuatlLesson25TypedVncWord,
      buildClassicalNahuatlVncFiniteSurfaceFrame,
      isClassicalNahuatlVncFiniteSurfaceFrame,
      buildClassicalNahuatlLesson2513AlternativeSourceProjectionFrame,
      isClassicalNahuatlLesson2513AlternativeSourceProjectionFrame,
      buildClassicalNahuatlLessons2425CanvasCitationProjectionFrame,
      isClassicalNahuatlLessons2425CanvasCitationProjectionFrame,
      getClassicalNahuatlLessons2425CanvasCitationProjectionInventory,
      isClassicalNahuatlLessons2425CanvasCitationProjectionInventory,
      getClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory,
      isClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory,
      buildClassicalNahuatlLesson2514MoodTransformationFrame,
      isClassicalNahuatlLesson2514MoodTransformationFrame,
      installClassicalNahuatlLesson25LaterLayersClassicGlobals
    };
}

export function installClassicalNahuatlLesson25LaterLayersGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlLesson25LaterLayersRuntime(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
