// Canonical modern ESM module.

export function createDerivationSourceModelContext(targetObject = globalThis) {
    function buildNonactiveSourceChain(verbMeta, verb, analysisVerb) {
      const model = buildDerivationSourceModel(verbMeta, verb, analysisVerb);
      const outerPieces = Array.isArray(model?.outerPieces) ? model.outerPieces : [];
      const directionalPrefixes = outerPieces.filter(piece => piece?.type === "directional" && piece?.value).map(piece => piece.value);
      const lexicalPrefixes = outerPieces.filter(piece => piece?.type === "lexical" && piece?.value).map(piece => piece.value);
      const explicitBoundNonspecificPrefixes = outerPieces.filter(piece => piece?.type === "valence" && piece?.value).map(piece => piece.value);
      const impersonalPrefixes = outerPieces.filter(piece => piece?.type === "impersonal" && piece?.value).map(piece => piece.value);
      const prefixParts = outerPieces.map(piece => piece?.value || "").filter(Boolean);
      const corePrefixParts = Array.isArray(model?.corePrefixParts) ? model.corePrefixParts.filter(piece => piece?.type === "adjacent-embed" && piece?.value).map(piece => piece.value) : [];
      const supportiveMarker = String(model?.supportiveMarker || "");
      const normalizedSourceBase = targetObject.normalizeRuleBase(model?.matrixBase || analysisVerb || verb || "");
      const normalizedSourcePrefix = lexicalPrefixes.join("");
      return {
        baseVerb: normalizedSourceBase,
        prefix: prefixParts.join(""),
        prefixParts,
        corePrefixParts,
        supportiveMarker,
        directionalPrefixes,
        lexicalPrefixes,
        valencePrefixes: explicitBoundNonspecificPrefixes,
        impersonalPrefixes,
        sourceKind: String(model?.sourceKind || "surface"),
        sourceBase: normalizedSourceBase,
        sourcePrefix: normalizedSourcePrefix,
        model
      };
    }
    function buildFullDerivationSourceChain(verbMeta, verb, analysisVerb) {
      return buildNonactiveSourceChain(verbMeta, verb, analysisVerb);
    }
    var FULL_SOURCE_CHAIN_REALIZATION_POLICY = Object.freeze({
      preserveDirectional: true,
      preserveLexical: true,
      preserveValence: true,
      preserveImpersonal: true,
      preserveSupportive: true,
      preserveAdjacentEmbed: true
    });
    const PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY = Object.freeze({
      preserveDirectional: true,
      preserveLexical: true,
      preserveValence: true,
      preserveImpersonal: true,
      preserveSupportive: true,
      preserveAdjacentEmbed: true
    });
    const PATIENTIVO_PERFECTIVO_SOURCE_CHAIN_POLICY = Object.freeze({
      preserveDirectional: true,
      preserveLexical: true,
      preserveValence: true,
      preserveImpersonal: true,
      preserveSupportive: true,
      preserveAdjacentEmbed: true
    });
    const SUSTANTIVO_VERBAL_SOURCE_CHAIN_POLICY = Object.freeze({
      preserveDirectional: true,
      preserveLexical: true,
      preserveValence: true,
      preserveImpersonal: true,
      preserveSupportive: true,
      preserveAdjacentEmbed: true
    });
    const CALIFICATIVO_INSTRUMENTIVO_SOURCE_CHAIN_POLICY = Object.freeze({
      preserveDirectional: true,
      preserveLexical: true,
      preserveValence: true,
      preserveImpersonal: true,
      preserveSupportive: true,
      preserveAdjacentEmbed: true
    });
    function getDerivationContinuationContractTargetInput(record = null) {
      const source = record && typeof record === "object" ? record : {};
      return String(source.prelocativeVerbInput || source.compoundVerbInput || source.ordinaryNncInput || source.ownerhoodVerbInput || source.complementVerbInput || source.adverbialVerbInput || source.compoundStem || "").trim();
    }
    function isGeneratedOutputTypedDerivationContinuationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "generated-output-typed-continuation-frame" && frame.formulaRecord?.kind === "grammar-formula-record" && frame.formulaRealizationRecord?.kind === "grammar-formula-realization-record");
    }
    function normalizeTypedDerivationContinuationSurface(value = "") {
      const text = normalizeDerivationContinuationContractSurface(value);
      return text && !/[\/,\n\r]/u.test(text) ? text : "";
    }
    function getTypedDerivationContinuationFrameSurface(frame = null) {
      if (!isGeneratedOutputTypedDerivationContinuationFrame(frame)) {
        return "";
      }
      return [frame.selectedVariant?.surface, frame.formulaRealizationRecord?.surface, ...(Array.isArray(frame.formulaRealizationRecord?.surfaceForms) ? frame.formulaRealizationRecord.surfaceForms : [])].map(normalizeTypedDerivationContinuationSurface).find(Boolean) || "";
    }
    function getTypedDerivationContinuationFramePredicateStem(frame = null) {
      if (!isGeneratedOutputTypedDerivationContinuationFrame(frame)) {
        return "";
      }
      const slots = frame.formulaSlots && typeof frame.formulaSlots === "object" ? frame.formulaSlots : frame.formulaRecord?.formulaSlots && typeof frame.formulaRecord.formulaSlots === "object" ? frame.formulaRecord.formulaSlots : {};
      const predicateSlot = slots.predicateStem || slots.predicate || {};
      const predicateStem = normalizeTypedDerivationContinuationSurface(predicateSlot.stem || predicateSlot.value || predicateSlot.surface || "");
      return predicateStem || getTypedDerivationContinuationFrameSurface(frame);
    }
    function getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(frame = null) {
      if (!isGeneratedOutputTypedDerivationContinuationFrame(frame)) {
        return "";
      }
      const slots = frame.formulaSlots && typeof frame.formulaSlots === "object" ? frame.formulaSlots : frame.formulaRecord?.formulaSlots && typeof frame.formulaRecord.formulaSlots === "object" ? frame.formulaRecord.formulaSlots : {};
      const predicateSlot = slots.predicateStem || slots.predicate || {};
      const predicateStem = getTypedDerivationContinuationFramePredicateStem(frame);
      const predicateState = String(predicateSlot.state || predicateSlot.stateSlot?.state || frame.nominalizationProfile?.predicateState?.value || "").trim();
      if (!predicateStem) {
        return "";
      }
      return predicateState === "possessive" || predicateStem.endsWith("ka") ? predicateStem : `${predicateStem}ka`;
    }
    function buildActiveActionCompoundEmbedTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      compoundVerbInput = ""
    } = {}) {
      const sourceSurface = getTypedDerivationContinuationFrameSurface(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const targetInput = String(compoundVerbInput || "").trim();
      if (!sourceSurface || !matrixRoot || !targetInput) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "active-action-nounstem-as-compound-embed",
        operationFamily: "active-action-compound-embed",
        andrewsSection: matrix.grammarSource || "Andrews 37.5.4",
        sourceUnit: "CNN",
        targetUnit: "CNV",
        route: "CNN active-action nounstem -> CNV compound verbstem",
        embedRole: "compound-embed",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "CNV",
        targetUnit: "CNV",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "active-action-compound-embed-target-frame",
          generationAllowed: true,
          grammarSource: matrix.grammarSource || "Andrews 37.5.4",
          outputKind: "active-action-compound-embed-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "compound-embed",
            role: "embedded-active-action-nounstem",
            token: sourceSurface,
            sourceFrameId: String(sourceContinuationFrame.selectedVariant?.variantId || sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
            sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "matrix-root",
            role: "compound-verbal-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim()
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          valence: String(matrix.matrixValency || matrix.valency || "").trim(),
          grammarSource: String(matrix.grammarSource || "Andrews 37.5.4").trim()
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function normalizeDerivationContinuationContractSurface(value = "") {
      if (typeof targetObject.normalizeGrammarSurfaceValue === "function") {
        return targetObject.normalizeGrammarSurfaceValue(value);
      }
      const text = String(value || "").trim();
      return text === "—" ? "" : text;
    }
    function splitDerivationContinuationContractSurface(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeDerivationContinuationContractSurface(entry)).filter(Boolean);
    }
    function getDerivationContinuationContractGrammarFrame(record = null) {
      const source = record && typeof record === "object" ? record : {};
      return (source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : null) || (source.frames && typeof source.frames === "object" ? source.frames : null);
    }
    function getDerivationContinuationContractResultFrame(record = null) {
      const grammarFrame = getDerivationContinuationContractGrammarFrame(record);
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function getDerivationContinuationContractSourceInput(record = null) {
      const source = record && typeof record === "object" ? record : {};
      const resultFrame = getDerivationContinuationContractResultFrame(source);
      const framedForms = [];
      if (Array.isArray(resultFrame?.surfaceForms)) {
        framedForms.push(...resultFrame.surfaceForms);
      }
      if (resultFrame?.surface) {
        framedForms.push(resultFrame.surface);
      }
      const normalizedFrameForms = framedForms.map(entry => normalizeDerivationContinuationContractSurface(entry)).filter(entry => entry && !entry.includes("/")).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      if (normalizedFrameForms.length) {
        return normalizedFrameForms[0];
      }
      if (resultFrame) {
        return "";
      }
      const contractForms = [];
      if (Array.isArray(source.surfaceForms)) {
        contractForms.push(...source.surfaceForms);
      }
      if (source.surface) {
        contractForms.push(source.surface);
      }
      if (source.result) {
        contractForms.push(source.result);
      }
      const normalizedContractForms = contractForms.flatMap(entry => splitDerivationContinuationContractSurface(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      if (normalizedContractForms.length) {
        return normalizedContractForms[0];
      }
      return normalizeDerivationContinuationContractSurface(source.sourceSurface || source.patientivoSurface || source.characteristicSurface || source.actionNominalSurface || source.preteritAgentiveStem || source.customaryAgentiveStem || source.nounStem || "");
    }
    function getDerivationContinuationContractAndrewsRefs(record = null) {
      const source = record && typeof record === "object" ? record : {};
      const refs = [source.grammarSource, source.matrix?.grammarSource, source.formationFrame?.grammarSource].map(entry => String(entry || "").trim()).filter(Boolean);
      return refs.filter((entry, index, list) => list.indexOf(entry) === index);
    }
    function getDerivationContinuationSourceAdjunctSurface(record = null) {
      const source = record && typeof record === "object" ? record : {};
      return String(source.patientivoSurface || source.characteristicSurface || source.actionNominalSurface || source.preteritAgentiveStem || source.customaryAgentiveStem || source.nounStem || source.incorporatedRoot || "").trim();
    }
    function getDerivationContinuationSourceAdjunctKind(record = null, outputKind = "") {
      const source = record && typeof record === "object" ? record : {};
      if (source.patientivoSurface) {
        return "patientive-nounstem";
      }
      if (source.characteristicSurface) {
        return "characteristic-property-nounstem";
      }
      if (source.actionNominalSurface) {
        return "active-action-nounstem";
      }
      if (source.preteritAgentiveStem) {
        return "preterit-agentive-nounstem";
      }
      if (source.customaryAgentiveStem) {
        return "customary-agentive-nounstem";
      }
      if (source.nounStem) {
        return "ordinary-nounstem";
      }
      if (/nominal|nnc|noun/i.test(String(outputKind || ""))) {
        return "nounstem";
      }
      return "";
    }
    function getDerivationContinuationEmbedRole(record = null, outputKind = "") {
      const source = record && typeof record === "object" ? record : {};
      const formationFrame = source.formationFrame && typeof source.formationFrame === "object" ? source.formationFrame : {};
      const framedRole = String(formationFrame.incorporated?.role || formationFrame.embed?.role || "").trim();
      if (framedRole) {
        return framedRole;
      }
      const kind = String(outputKind || source.outputKind || "").trim();
      if (/complement/i.test(kind)) {
        return "incorporated-complement";
      }
      if (/adverbial/i.test(kind)) {
        return "incorporated-adverb";
      }
      if (/ownerhood/i.test(kind)) {
        return "incorporated-ownerhood";
      }
      if (/compound-embed/i.test(kind)) {
        return "compound-embed";
      }
      if (/nominal-compound/i.test(kind)) {
        return "nominal-compound-embed";
      }
      return "";
    }
    function getDerivationContinuationEmbeddedRoot(record = null) {
      const source = record && typeof record === "object" ? record : {};
      const formationFrame = source.formationFrame && typeof source.formationFrame === "object" ? source.formationFrame : {};
      return String(formationFrame.incorporated?.root || formationFrame.embed?.root || source.incorporatedRoot || source.nounStem || "").trim();
    }
    function getDerivationContinuationMatrixValence(record = null) {
      const source = record && typeof record === "object" ? record : {};
      const formationFrame = source.formationFrame && typeof source.formationFrame === "object" ? source.formationFrame : {};
      return String(source.matrix?.matrixValency || source.matrix?.valency || formationFrame.matrix?.matrixValency || formationFrame.matrix?.valency || "").trim();
    }
    function getDerivationContinuationMatrixFrame(record = null) {
      const source = record && typeof record === "object" ? record : {};
      const formationFrame = source.formationFrame && typeof source.formationFrame === "object" ? source.formationFrame : {};
      const matrix = source.matrix && typeof source.matrix === "object" ? source.matrix : {};
      const framedMatrix = formationFrame.matrix && typeof formationFrame.matrix === "object" ? formationFrame.matrix : {};
      return {
        id: String(matrix.id || framedMatrix.id || "").trim(),
        root: String(matrix.nawatRoot || matrix.root || framedMatrix.root || source.matrixRoot || "").trim(),
        classicalMatrix: String(matrix.classicalMatrix || framedMatrix.classicalMatrix || "").trim(),
        valence: getDerivationContinuationMatrixValence(source),
        objectPrefix: String(matrix.objectPrefix || source.objectPrefix || "").trim(),
        grammarSource: String(matrix.grammarSource || source.grammarSource || formationFrame.grammarSource || "").trim(),
        status: String(matrix.status || "").trim(),
        supported: matrix.supported === true || source.supported === true
      };
    }
    function getDerivationContinuationFinalFormulaShape(record = null, outputKind = "") {
      const source = record && typeof record === "object" ? record : {};
      const kind = String(outputKind || source.outputKind || "").trim();
      const embeddedRoot = getDerivationContinuationEmbeddedRoot(source);
      const embedRole = getDerivationContinuationEmbedRole(source, kind);
      const matrix = getDerivationContinuationMatrixFrame(source);
      if (/nominal-compound/i.test(kind)) {
        return "compound-nnc-embed-before-matrix";
      }
      if (/ownerhood/i.test(embedRole)) {
        return embeddedRoot && matrix.root ? "adjacent-nnc-ownerhood-matrix" : "";
      }
      if ((embeddedRoot || embedRole) && matrix.root) {
        return "compound-vnc-embed-before-matrix";
      }
      return "";
    }
    function getDerivationContinuationSourceExternalObjectSlots(sourceFormulaSlots = null) {
      const slots = sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : {};
      return ["obj1", "obj2", "obj3", "reflexivo"].map(slotId => {
        const slot = slots[slotId] && typeof slots[slotId] === "object" ? slots[slotId] : null;
        const value = String(slot?.token || slot?.prefix || slot?.displayPrefix || slot?.surface || slot?.value || "").trim();
        return value ? {
          slotId,
          prefix: value,
          sourceLayer: "source-formula-slots"
        } : null;
      }).filter(Boolean);
    }
    function getDerivationContinuationRemainingExternalObjectSlots(record = null) {
      const source = record && typeof record === "object" ? record : {};
      const formationFrame = source.formationFrame && typeof source.formationFrame === "object" ? source.formationFrame : {};
      const prefix = String(source.objectPrefix || source.objectTransfer?.objectPrefix || formationFrame.outsideObject?.prefix || source.matrix?.objectPrefix || "").trim();
      return prefix ? [{
        slotId: "obj1",
        prefix,
        owner: "matrix",
        sourceLayer: "route-frame"
      }] : [];
    }
    function getDerivationContinuationConsumedObjectSlot(embedRole = "") {
      const role = String(embedRole || "").trim();
      if (role === "incorporated-object") {
        return "obj1";
      }
      if (/complement/i.test(role)) {
        return "complement";
      }
      if (/ownerhood|possess/i.test(role)) {
        return "possessor";
      }
      return "";
    }
    function buildDerivationContinuationObjectSlotOwnershipFrame({
      embedRole = "",
      matrixValence = "",
      consumedObjectSlot = "",
      sourceExternalObjectSlots = [],
      remainingExternalObjectSlots = []
    } = {}) {
      const sourceSlots = Array.isArray(sourceExternalObjectSlots) ? sourceExternalObjectSlots : [];
      const remainingSlots = Array.isArray(remainingExternalObjectSlots) ? remainingExternalObjectSlots : [];
      const resolvedMatrixValence = String(matrixValence || "").trim();
      const matrixValenceFrameFixed = Boolean(resolvedMatrixValence);
      return {
        kind: "andrews-incorporation-object-slot-ownership-frame",
        version: 1,
        embedRole: String(embedRole || "").trim(),
        matrixValence: resolvedMatrixValence,
        matrixValenceFrameFixed,
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
        sourceExternalObjectSlotsOwnedBy: sourceSlots.length ? "source-principal-vnc-formula-frame" : "none",
        remainingExternalObjectSlotsOwnedBy: remainingSlots.length ? "matrix-route-frame" : "none",
        embeddedRoleLicensedBy: embedRole ? "andrews-incorporation-route-frame" : "none",
        routeFrameOwnsObjectSlotLicensing: matrixValenceFrameFixed,
        functionUseOwnsObjectSlots: false,
        finalFormulaShapeOwnsObjectSlots: false,
        functionUseMayAnnotateLicensedReadingsOnly: true,
        matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
        objectSlotLicensingOrder: ["source-principal-vnc", "source-adjunct-nnc", "matrix-valence-frame", "route-frame", "function-use-annotation"]
      };
    }
    function buildDerivationContinuationIncorporationRouteFrame(record = null, {
      outputKind = "",
      supported = false,
      targetInput = "",
      routeStage = "",
      andrewsRefs = []
    } = {}) {
      if (!record || typeof record !== "object") {
        return null;
      }
      const kind = String(outputKind || record.outputKind || "").trim();
      const embeddedRoot = getDerivationContinuationEmbeddedRoot(record);
      const embedRole = getDerivationContinuationEmbedRole(record, kind);
      const remainingExternalObjectSlots = getDerivationContinuationRemainingExternalObjectSlots(record);
      const sourceExternalObjectSlots = getDerivationContinuationSourceExternalObjectSlots(record.sourceFormulaSlots);
      const sourceInput = getDerivationContinuationContractSourceInput(record);
      const sourceAdjunctSurface = getDerivationContinuationSourceAdjunctSurface(record);
      const finalFormulaShape = getDerivationContinuationFinalFormulaShape(record, kind);
      if (!embeddedRoot && !embedRole && !finalFormulaShape) {
        return null;
      }
      const stemInternalObjectSlotDelta = embedRole === "incorporated-object" ? 1 : 0;
      const complementSlotDelta = /complement/i.test(embedRole) ? 1 : 0;
      const adverbialFunctionDelta = /adverb/i.test(embedRole) ? 1 : 0;
      const externalObjectSlotDelta = remainingExternalObjectSlots.length - sourceExternalObjectSlots.length;
      const matrixValence = getDerivationContinuationMatrixValence(record);
      const consumedObjectSlot = getDerivationContinuationConsumedObjectSlot(embedRole);
      const objectSlotOwnership = buildDerivationContinuationObjectSlotOwnershipFrame({
        embedRole,
        matrixValence,
        consumedObjectSlot,
        sourceExternalObjectSlots,
        remainingExternalObjectSlots
      });
      const matrixValenceFrameFixed = objectSlotOwnership.matrixValenceFrameFixed === true;
      const refs = (Array.isArray(andrewsRefs) ? andrewsRefs : []).map(entry => String(entry || "").trim()).filter(Boolean);
      return {
        kind: "andrews-incorporation-route-frame",
        version: 1,
        sourcePrincipalVnc: {
          surface: sourceInput,
          formulaSlots: record.sourceFormulaSlots && typeof record.sourceFormulaSlots === "object" ? record.sourceFormulaSlots : null,
          formulaEcho: String(record.sourceFormulaEcho || "").trim()
        },
        sourceAdjunctNnc: {
          surface: sourceAdjunctSurface,
          stem: embeddedRoot,
          kind: getDerivationContinuationSourceAdjunctKind(record, kind),
          role: embedRole
        },
        matrix: getDerivationContinuationMatrixFrame(record),
        matrixValence,
        embedRole,
        embeddedRoot,
        consumedObjectSlot,
        sourceExternalObjectSlots,
        remainingExternalObjectSlots,
        remainingExternalObjectSlotIds: remainingExternalObjectSlots.map(slot => slot.slotId),
        objectSlotOwnership,
        valenceDelta: externalObjectSlotDelta,
        valenceEffects: {
          sourceExternalObjectSlotCount: sourceExternalObjectSlots.length,
          remainingExternalObjectSlotCount: remainingExternalObjectSlots.length,
          externalObjectSlotDelta,
          stemInternalObjectSlotDelta,
          complementSlotDelta,
          adverbialFunctionDelta
        },
        andrewsSection: refs[0] || String(record.grammarSource || record.formationFrame?.grammarSource || "").trim(),
        andrewsRefs: refs,
        generationStatus: supported ? "supported" : "blocked",
        generationAllowed: supported === true,
        routeStage: String(routeStage || "").trim(),
        finalFormulaShape,
        routeFrameLicensesEmbedRole: true,
        routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed,
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseRole: true,
        functionUseDoesNotLicenseObjectSlots: true,
        sourceRouteFrameRequired: true,
        boundaries: {
          matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
          routeFrameOwnsEmbedRoleLicensing: true,
          finalFormulaShapeDoesNotLicenseRole: true,
          functionUseDoesNotLicenseRole: true
        }
      };
    }
    function getDerivationContinuationDiagnosticLayerContract(entry = null) {
      const diagnosticId = typeof entry === "string" ? entry : String(entry?.id || entry?.code || entry?.message || "");
      const id = String(diagnosticId || "").trim();
      if (/missing-(patientivo|characteristic|action-nominal|general-use|fully-nominalized|noun-stem|incorporated-root|surface)/i.test(id)) {
        return {
          failedLayer: "stem",
          contractLayer: "stemFrame"
        };
      }
      if (/unmapped-(possessor|subject)|object-transfer|source-state/i.test(id)) {
        return {
          failedLayer: "agreement",
          contractLayer: "participantFrame"
        };
      }
      if (/missing-(verb-input|nnc-input)|missing-.*input/i.test(id)) {
        return {
          failedLayer: "output",
          contractLayer: "resultFrame"
        };
      }
      if (/unsupported-matrix|class-matrix-mismatch|ambiguous-ti-class|unsupported-noun-class/i.test(id)) {
        return {
          failedLayer: "route",
          contractLayer: "routeContract"
        };
      }
      return {
        failedLayer: "route",
        contractLayer: "routeContract"
      };
    }
    function normalizeDerivationContinuationDiagnosticEntries(diagnostics = [], {
      routeStage = ""
    } = {}) {
      return (Array.isArray(diagnostics) ? diagnostics : []).map(entry => {
        if (!entry) {
          return null;
        }
        const normalizedEntry = typeof entry === "string" ? {
          id: String(entry || "").trim(),
          message: ""
        } : entry && typeof entry === "object" ? {
          ...entry
        } : null;
        if (!normalizedEntry) {
          return null;
        }
        const id = String(normalizedEntry.id || normalizedEntry.code || normalizedEntry.message || "").trim();
        if (!id) {
          return null;
        }
        const layerContract = getDerivationContinuationDiagnosticLayerContract(normalizedEntry);
        return {
          ...normalizedEntry,
          id,
          code: String(normalizedEntry.code || id.toUpperCase().replace(/-/g, "_")).trim(),
          severity: String(normalizedEntry.severity || "error").trim(),
          message: String(normalizedEntry.message || "").trim(),
          failedLayer: normalizedEntry.failedLayer || layerContract.failedLayer,
          contractLayer: normalizedEntry.contractLayer || layerContract.contractLayer,
          routeFamily: normalizedEntry.routeFamily || "derivation-continuation",
          routeStage: normalizedEntry.routeStage || String(routeStage || "").trim()
        };
      }).filter(Boolean).filter((entry, index, list) => {
        const key = `${entry.id || ""}|${entry.severity || ""}|${entry.message || ""}`;
        return list.findIndex(candidate => `${candidate.id || ""}|${candidate.severity || ""}|${candidate.message || ""}` === key) === index;
      });
    }
    function attachDerivationContinuationGrammarContract(record = null) {
      if (!record || typeof record !== "object" || typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      const outputKind = String(record.outputKind || "derivation-continuation-contract").trim();
      const sourceInput = getDerivationContinuationContractSourceInput(record);
      const resultFrame = getDerivationContinuationContractResultFrame(record);
      const structuredSourceMissing = Boolean(resultFrame) && !sourceInput;
      const supported = record.supported === true && !structuredSourceMissing;
      const sourceSurface = sourceInput;
      const targetInput = getDerivationContinuationContractTargetInput(record);
      const inputDiagnostics = [...(Array.isArray(record.diagnostics) ? record.diagnostics : []), ...(structuredSourceMissing ? ["derivation-continuation-structured-source-frame-empty"] : [])];
      const routeStage = supported ? "preview-continuation" : "blocked";
      const diagnostics = normalizeDerivationContinuationDiagnosticEntries(inputDiagnostics, {
        routeStage
      });
      const andrewsRefs = getDerivationContinuationContractAndrewsRefs(record);
      const incorporationRouteFrame = buildDerivationContinuationIncorporationRouteFrame(record, {
        outputKind,
        supported,
        targetInput,
        routeStage,
        andrewsRefs
      });
      const framedRecord = incorporationRouteFrame ? {
        ...record,
        incorporationRouteFrame,
        sourceRouteFrame: incorporationRouteFrame,
        routeFrame: incorporationRouteFrame
      } : record;
      const output = targetObject.attachGrammarMetadataContract({
        ...framedRecord,
        diagnostics: []
      }, {
        enumerable: false,
        metadataKind: outputKind,
        unitKind: "derivation-continuation-contract",
        routeFamily: "derivation-continuation",
        routeStage,
        generationAllowed: supported,
        supported,
        structuralSource: andrewsRefs[0] || "Andrews derivation continuation",
        andrewsRefs,
        evidenceStatus: supported ? "continuation-supported" : "blocked",
        diagnosticStatus: supported ? "continuation-supported" : "blocked",
        surface: "",
        surfaceForms: [],
        sourceInput,
        diagnostics,
        sourceContract: {
          unitKind: "generated-source-output",
          sourceInput,
          sourceSurface,
          patientivoSurface: String(record.patientivoSurface || "").trim(),
          sourceState: String(record.sourceState || "").trim(),
          sourceKind: String(record.sourceKind || "").trim(),
          sourceContinuationFrame: record.sourceContinuationFrame && typeof record.sourceContinuationFrame === "object" ? record.sourceContinuationFrame : null,
          sourceFormulaSlots: record.sourceFormulaSlots && typeof record.sourceFormulaSlots === "object" ? record.sourceFormulaSlots : null,
          sourceFormulaEcho: String(record.sourceFormulaEcho || "").trim(),
          incorporationRouteFrame,
          sourceRouteFrame: incorporationRouteFrame,
          routeFrame: incorporationRouteFrame
        },
        targetContract: {
          unitKind: "continuation-target",
          outputKind,
          targetInput,
          generationAllowed: supported,
          sourceContinuationFrame: record.sourceContinuationFrame && typeof record.sourceContinuationFrame === "object" ? record.sourceContinuationFrame : null,
          targetContinuationFrame: record.targetContinuationFrame && typeof record.targetContinuationFrame === "object" ? record.targetContinuationFrame : null,
          incorporationRouteFrame,
          sourceRouteFrame: incorporationRouteFrame,
          routeFrame: incorporationRouteFrame,
          request: record.prelocativeRequest || record.compoundRequest || record.ownerhoodRequest || record.complementRequest || record.adverbialRequest || record.ordinaryNncRequest || null
        },
        orthographyFrame: {
          surface: "",
          surfaceForms: [],
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          targetInput
        },
        stemFrame: {
          sourceStem: sourceInput,
          incorporatedRoot: String(record.incorporatedRoot || "").trim(),
          matrixRoot: String(record.matrixRoot || "").trim(),
          nounStem: String(record.nounStem || "").trim(),
          compoundStem: String(record.compoundStem || "").trim(),
          targetInput,
          matrix: record.matrix || null,
          formationFrame: record.formationFrame || null,
          sourceContinuationFrame: record.sourceContinuationFrame && typeof record.sourceContinuationFrame === "object" ? record.sourceContinuationFrame : null,
          targetContinuationFrame: record.targetContinuationFrame && typeof record.targetContinuationFrame === "object" ? record.targetContinuationFrame : null,
          incorporationRouteFrame,
          sourceRouteFrame: incorporationRouteFrame,
          routeFrame: incorporationRouteFrame
        },
        morphBoundaryFrame: {
          formationFrame: record.formationFrame || null,
          sourceContinuationFrame: record.sourceContinuationFrame && typeof record.sourceContinuationFrame === "object" ? record.sourceContinuationFrame : null,
          targetContinuationFrame: record.targetContinuationFrame && typeof record.targetContinuationFrame === "object" ? record.targetContinuationFrame : null,
          incorporationRouteFrame,
          sourceRouteFrame: incorporationRouteFrame,
          routeFrame: incorporationRouteFrame,
          objectTransfer: record.objectTransfer || null,
          omittedSuffix: String(record.omittedSuffix || "").trim(),
          nounClass: String(record.nounClass || "").trim(),
          ownerhoodKind: String(record.ownerhoodKind || "").trim(),
          formulaSlots: record.sourceFormulaSlots && typeof record.sourceFormulaSlots === "object" ? record.sourceFormulaSlots : null,
          formulaEcho: String(record.sourceFormulaEcho || "").trim()
        },
        participantFrame: {
          object: record.objectTransfer || {
            prefix: String(record.objectPrefix || "").trim()
          },
          objectSlotOwnership: incorporationRouteFrame?.objectSlotOwnership || null,
          incorporationRouteFrame,
          sourceRouteFrame: incorporationRouteFrame,
          routeFrame: incorporationRouteFrame,
          possessor: {
            prefix: String(record.possessorPrefix || "").trim()
          }
        },
        inflectionFrame: {
          outputKind,
          sourceTenseValue: String(record.sourceTenseValue || "").trim(),
          sourceCombinedMode: String(record.sourceCombinedMode || "").trim()
        }
      });
      Object.defineProperty(output, "diagnostics", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: inputDiagnostics
      });
      return output;
    }
    function normalizeDerivationSourceOuterPiece(piece = null) {
      if (!piece || !piece.type || !piece.value) {
        return null;
      }
      if (piece.type === "lexical") {
        const lexicalValue = targetObject.normalizeRuleBase(piece.value);
        return lexicalValue ? {
          type: "lexical",
          value: lexicalValue
        } : null;
      }
      if (piece.type === "valence") {
        const valenceValue = targetObject.normalizeComposerSecondaryValenceSurfaceToken(piece.value) || targetObject.normalizeComposerValenceToken(piece.value) || targetObject.normalizeComposerStem(piece.value);
        return valenceValue ? {
          type: "valence",
          value: valenceValue
        } : null;
      }
      if (piece.type === "directional") {
        const directionalValue = targetObject.normalizeComposerStem(piece.value);
        return directionalValue ? {
          type: "directional",
          value: directionalValue
        } : null;
      }
      if (piece.type === "impersonal") {
        const impersonalValue = targetObject.normalizeRuleBase(piece.value);
        return impersonalValue ? {
          type: "impersonal",
          value: impersonalValue
        } : null;
      }
      return null;
    }
    function isCurrentRegexDerivationSourceParseTree(value = null) {
      return Boolean(value && typeof value === "object" && value.kind === "current-regex-derivation-source-parse-tree" && value.coreFrame && typeof value.coreFrame === "object");
    }
    function buildCurrentRegexDerivationSourceParseTreeFromParseOperationFrame(rawValue = "", currentRegexParseOperationFrame = null) {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return null;
      }
      const parseFrameMismatch = targetObject.getCurrentRegexParseOperationMismatch(raw, currentRegexParseOperationFrame);
      if (parseFrameMismatch) {
        return null;
      }
      const movingTargetParsed = targetObject.buildMovingTargetParsedFromCurrentRegexParseOperationFrame(currentRegexParseOperationFrame);
      if (!movingTargetParsed || movingTargetParsed.isValid !== true) {
        return null;
      }
      const outerPieces = (Array.isArray(movingTargetParsed.outerPieces) ? movingTargetParsed.outerPieces : []).map(piece => normalizeDerivationSourceOuterPiece(piece)).filter(Boolean);
      const markedCore = targetObject.convertEnvelopeSupportiveMarkersToRegexInput(targetObject.normalizeRegexCoreTokenCase(String(movingTargetParsed.coreText || "").trim()));
      const supportiveMatch = String(markedCore || "").match(/^\[([iy])\]/i);
      const supportiveMarker = supportiveMatch ? String(supportiveMatch[1] || "").toLowerCase() : "";
      const plainCore = String(markedCore || "").replace(/^\[([iy])\]/i, "").trim().toLowerCase();
      const inline = targetObject.parseInlineTiCausativeClassFromBase(targetObject.collapseSerialStemDashInputFromSourceFrame(plainCore));
      const normalizedCoreBase = String(inline.base || plainCore || "").trim().toLowerCase();
      const adjacentCoreEmbed = targetObject.getMovingTargetAdjacentEmbedParts(normalizedCoreBase);
      const matrixBase = targetObject.normalizeRuleBase(adjacentCoreEmbed ? adjacentCoreEmbed.stem : normalizedCoreBase);
      const corePrefixParts = [];
      if (supportiveMarker) {
        corePrefixParts.push({
          type: "supportive",
          value: supportiveMarker
        });
      }
      if (adjacentCoreEmbed?.embed) {
        const normalizedEmbed = targetObject.normalizeRuleBase(adjacentCoreEmbed.embed);
        if (normalizedEmbed) {
          corePrefixParts.push({
            type: "adjacent-embed",
            value: normalizedEmbed
          });
        }
      }
      return Object.freeze({
        kind: "current-regex-derivation-source-parse-tree",
        version: 1,
        parseLanguage: "current-regex",
        rawRegex: String(currentRegexParseOperationFrame?.targetFrame?.regexValue || raw),
        currentRegexParseOperationFrame,
        currentRegexParseTargetSignature: currentRegexParseOperationFrame?.targetSignature || "",
        transitivity: movingTargetParsed.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive,
        outerPieces: Object.freeze(outerPieces.map(piece => Object.freeze({
          kind: "derivation-source-outer-piece",
          role: "outer",
          type: piece.type,
          value: piece.value
        }))),
        coreFrame: Object.freeze({
          kind: "derivation-source-core-frame",
          role: "matrix-core",
          rawCoreText: String(movingTargetParsed.coreText || "").trim(),
          markedCore,
          plainCore,
          supportiveMarker,
          corePrefixParts: Object.freeze(corePrefixParts.map(piece => Object.freeze({
            kind: "derivation-source-core-prefix-piece",
            role: "core-prefix",
            type: piece.type,
            value: piece.value
          }))),
          adjacentCoreEmbed: targetObject.normalizeRuleBase(adjacentCoreEmbed?.embed || ""),
          matrixBase,
          inlineTiCausativeClass: String(inline.tiCausativeClass || "")
        })
      });
    }
    function buildCurrentRegexDerivationSourceParseTree(rawValue = "") {
      const raw = String(rawValue || "").trim();
      if (!raw) {
        return null;
      }
      const currentRegexParseOperationFrame = targetObject.buildCurrentRegexParseOperationFrameFromRawInput(raw);
      return buildCurrentRegexDerivationSourceParseTreeFromParseOperationFrame(raw, currentRegexParseOperationFrame);
    }
    function normalizeCurrentRegexDerivationSourceParseTree(value = null) {
      if (!isCurrentRegexDerivationSourceParseTree(value)) {
        return null;
      }
      const coreFrame = value.coreFrame || {};
      const matrixBase = targetObject.normalizeRuleBase(coreFrame.matrixBase || "");
      if (!matrixBase) {
        return null;
      }
      const outerPieces = (Array.isArray(value.outerPieces) ? value.outerPieces : []).map(piece => normalizeDerivationSourceOuterPiece(piece)).filter(Boolean);
      const corePrefixParts = (Array.isArray(coreFrame.corePrefixParts) ? coreFrame.corePrefixParts : []).map(piece => {
        if (!piece || !piece.type || !piece.value) {
          return null;
        }
        const normalizedValue = targetObject.normalizeRuleBase(piece.value);
        return normalizedValue ? {
          type: String(piece.type || ""),
          value: normalizedValue
        } : null;
      }).filter(Boolean);
      return {
        ...value,
        rawRegex: String(value.rawRegex || "").trim(),
        transitivity: value.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive,
        outerPieces,
        coreFrame: {
          ...coreFrame,
          matrixBase,
          supportiveMarker: String(coreFrame.supportiveMarker || "").trim().toLowerCase(),
          adjacentCoreEmbed: targetObject.normalizeRuleBase(coreFrame.adjacentCoreEmbed || ""),
          corePrefixParts
        }
      };
    }
    function getCurrentRegexDerivationSourceModelSignature(parseTree = null) {
      const normalizedTree = normalizeCurrentRegexDerivationSourceParseTree(parseTree);
      if (!normalizedTree) {
        return "";
      }
      const coreFrame = normalizedTree.coreFrame || {};
      return JSON.stringify({
        parseLanguage: "current-regex",
        transitivity: normalizedTree.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive,
        outerPieces: (Array.isArray(normalizedTree.outerPieces) ? normalizedTree.outerPieces : []).map(piece => ({
          type: piece.type,
          value: piece.value
        })),
        corePrefixParts: (Array.isArray(coreFrame.corePrefixParts) ? coreFrame.corePrefixParts : []).map(piece => ({
          type: piece.type,
          value: piece.value
        })),
        supportiveMarker: String(coreFrame.supportiveMarker || ""),
        adjacentCoreEmbed: targetObject.normalizeRuleBase(coreFrame.adjacentCoreEmbed || ""),
        matrixBase: targetObject.normalizeRuleBase(coreFrame.matrixBase || "")
      });
    }
    function buildCurrentRegexDerivationSourceModelTargetFrame(parseTree = null) {
      const normalizedTree = normalizeCurrentRegexDerivationSourceParseTree(parseTree);
      if (!normalizedTree) {
        return null;
      }
      const coreFrame = normalizedTree.coreFrame || {};
      const matrixBase = targetObject.normalizeRuleBase(coreFrame.matrixBase || "");
      if (!matrixBase) {
        return null;
      }
      const outerPieces = (Array.isArray(normalizedTree.outerPieces) ? normalizedTree.outerPieces : []).map(piece => Object.freeze({
        kind: "current-regex-source-model-outer-piece-target-frame",
        type: String(piece.type || ""),
        value: targetObject.normalizeRuleBase(piece.value || "")
      })).filter(piece => piece.type && piece.value);
      const corePrefixParts = (Array.isArray(coreFrame.corePrefixParts) ? coreFrame.corePrefixParts : []).map(piece => Object.freeze({
        kind: "current-regex-source-model-core-prefix-target-frame",
        type: String(piece.type || ""),
        value: targetObject.normalizeRuleBase(piece.value || "")
      })).filter(piece => piece.type && piece.value);
      const targetFrame = {
        kind: "current-regex-derivation-source-model-target-frame",
        sourceSignature: getCurrentRegexDerivationSourceModelSignature(normalizedTree),
        parseLanguage: "current-regex",
        transitivity: normalizedTree.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive,
        outerPieces: Object.freeze(outerPieces),
        corePrefixParts: Object.freeze(corePrefixParts),
        supportiveMarker: String(coreFrame.supportiveMarker || ""),
        adjacentCoreEmbed: targetObject.normalizeRuleBase(coreFrame.adjacentCoreEmbed || ""),
        matrixBase
      };
      targetFrame.targetSignature = JSON.stringify({
        sourceSignature: targetFrame.sourceSignature,
        parseLanguage: targetFrame.parseLanguage,
        transitivity: targetFrame.transitivity,
        outerPieces: outerPieces.map(piece => ({
          type: piece.type,
          value: piece.value
        })),
        corePrefixParts: corePrefixParts.map(piece => ({
          type: piece.type,
          value: piece.value
        })),
        supportiveMarker: targetFrame.supportiveMarker,
        adjacentCoreEmbed: targetFrame.adjacentCoreEmbed,
        matrixBase: targetFrame.matrixBase
      });
      return Object.freeze(targetFrame);
    }
    function buildCurrentRegexDerivationSourceModelOperationFrame(parseTree = null) {
      const normalizedTree = normalizeCurrentRegexDerivationSourceParseTree(parseTree);
      const targetFrame = buildCurrentRegexDerivationSourceModelTargetFrame(normalizedTree);
      if (!normalizedTree || !targetFrame) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "andrews-current-regex-derivation-source-model",
        routeFamily: "derivation-source-model",
        routeStage: "current-regex-source-model",
        operationApplied: "current-regex-parse-tree-to-source-model",
        sourceFrameKind: normalizedTree.kind,
        sourceSignature: getCurrentRegexDerivationSourceModelSignature(normalizedTree),
        targetFrame,
        targetSignature: targetFrame.targetSignature,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function getCurrentRegexDerivationSourceModelOperationMismatch({
      parseTree = null,
      operationFrame = null
    } = {}) {
      const normalizedTree = normalizeCurrentRegexDerivationSourceParseTree(parseTree);
      if (!normalizedTree) {
        return "current-regex-source-parse-tree-required";
      }
      const expectedSourceSignature = getCurrentRegexDerivationSourceModelSignature(normalizedTree);
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "andrews-current-regex-derivation-source-model" || operationFrame.routeFamily !== "derivation-source-model" || operationFrame.routeStage !== "current-regex-source-model" || operationFrame.operationApplied !== "current-regex-parse-tree-to-source-model" || operationFrame.sourceFrameKind !== normalizedTree.kind || operationFrame.sourceSignature !== expectedSourceSignature || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "current-regex-source-model-operation-frame-required";
      }
      const expectedTargetFrame = buildCurrentRegexDerivationSourceModelTargetFrame(normalizedTree);
      const targetFrame = operationFrame.targetFrame || null;
      if (!expectedTargetFrame || !targetFrame || targetFrame.kind !== expectedTargetFrame.kind || targetFrame.sourceSignature !== expectedTargetFrame.sourceSignature || targetFrame.parseLanguage !== expectedTargetFrame.parseLanguage || targetFrame.transitivity !== expectedTargetFrame.transitivity || targetFrame.supportiveMarker !== expectedTargetFrame.supportiveMarker || targetFrame.adjacentCoreEmbed !== expectedTargetFrame.adjacentCoreEmbed || targetFrame.matrixBase !== expectedTargetFrame.matrixBase || targetFrame.targetSignature !== expectedTargetFrame.targetSignature || operationFrame.targetSignature !== expectedTargetFrame.targetSignature) {
        return "current-regex-source-model-contradictory-target-frame";
      }
      return "";
    }
    function buildCurrentRegexDerivationSourceModel(rawValue = "", options = {}) {
      const parseTree = isCurrentRegexDerivationSourceParseTree(rawValue) ? normalizeCurrentRegexDerivationSourceParseTree(rawValue) : null;
      const operationFrame = options?.operationFrame || null;
      if (!parseTree || getCurrentRegexDerivationSourceModelOperationMismatch({
        parseTree,
        operationFrame
      })) {
        return null;
      }
      const targetFrame = operationFrame.targetFrame || {};
      return {
        sourceKind: "current-regex",
        parseLanguage: "current-regex",
        rawRegex: String(parseTree.rawRegex || "").trim(),
        transitivity: targetFrame.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive,
        outerPieces: Array.isArray(targetFrame.outerPieces) ? targetFrame.outerPieces : [],
        corePrefixParts: Array.isArray(targetFrame.corePrefixParts) ? targetFrame.corePrefixParts : [],
        supportiveMarker: String(targetFrame.supportiveMarker || ""),
        adjacentCoreEmbed: targetObject.normalizeRuleBase(targetFrame.adjacentCoreEmbed || ""),
        matrixBase: targetObject.normalizeRuleBase(targetFrame.matrixBase || ""),
        sourceParseTree: parseTree,
        parseTree,
        sourceModelOperationFrame: operationFrame,
        operationFrame
      };
    }
    function buildCurrentRegexDerivationSourceModelFromParseTree(parseTree = null) {
      const normalizedTree = normalizeCurrentRegexDerivationSourceParseTree(parseTree);
      const operationFrame = buildCurrentRegexDerivationSourceModelOperationFrame(normalizedTree);
      return buildCurrentRegexDerivationSourceModel(normalizedTree, {
        operationFrame
      });
    }
    function buildFallbackDerivationSourceModel(verbMeta = {}, verb = "", analysisVerb = "") {
      const meta = verbMeta || {};
      const parseLanguage = String(meta?.parseLanguage || meta?.canonical?.parseLanguage || "");
      const splitSource = targetObject.resolveCanonicalSourceSplit(meta, {
        verb: verb || "",
        analysisVerb: analysisVerb || ""
      });
      const structuralOuterPieces = Array.isArray(meta?.structuralOuterPieces) ? meta.structuralOuterPieces : Array.isArray(meta?.canonical?.structuralOuterPieces) ? meta.canonical.structuralOuterPieces : null;
      const structuralCorePrefixParts = Array.isArray(meta?.coreStructuralPrefixParts) ? meta.coreStructuralPrefixParts : Array.isArray(meta?.canonical?.coreStructuralPrefixParts) ? meta.canonical.coreStructuralPrefixParts : null;
      const boundPrefixes = Array.isArray(meta?.boundPrefixes) ? meta.boundPrefixes : [];
      const boundExplicitFlags = Array.isArray(meta?.boundExplicitFlags) ? meta.boundExplicitFlags : [];
      const outerPieces = parseLanguage === "current-regex" && Array.isArray(structuralOuterPieces) ? structuralOuterPieces.map(piece => normalizeDerivationSourceOuterPiece(piece)).filter(Boolean) : (() => {
        const lexicalPieces = (Array.isArray(meta?.lexicalBoundPrefixes) && meta.lexicalBoundPrefixes.length ? meta.lexicalBoundPrefixes : targetObject.getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags)).map(value => targetObject.normalizeRuleBase(value)).filter(Boolean).map(value => ({
          type: "lexical",
          value
        }));
        const valencePieces = targetObject.getExplicitBoundNonspecificPrefixes(boundPrefixes, boundExplicitFlags).map(value => targetObject.normalizeComposerSecondaryValenceSurfaceToken(value) || targetObject.normalizeComposerValenceToken(value)).filter(Boolean).map(value => ({
          type: "valence",
          value
        }));
        const directionalPrefix = targetObject.normalizeComposerStem(meta?.directionalPrefix || splitSource?.directionalPrefix || "");
        const directionalPieces = directionalPrefix ? [{
          type: "directional",
          value: directionalPrefix
        }] : [];
        const impersonalPieces = meta?.hasImpersonalTaPrefix === true ? [{
          type: "impersonal",
          value: "ta"
        }] : [];
        return [...directionalPieces, ...lexicalPieces, ...valencePieces, ...impersonalPieces];
      })();
      const sourcePrefix = targetObject.normalizeRuleBase(meta?.sourcePrefix || meta?.canonical?.sourcePrefix || splitSource?.sourcePrefix || "");
      const supportiveMarker = parseLanguage === "current-regex" && Array.isArray(structuralCorePrefixParts) ? structuralCorePrefixParts.find(piece => piece?.type === "supportive" && piece?.value)?.value || "" : meta?.hasOptionalSupportiveI === true ? String(meta?.optionalSupportiveLetter || "").toLowerCase() : "";
      const corePrefixParts = parseLanguage === "current-regex" && Array.isArray(structuralCorePrefixParts) ? structuralCorePrefixParts.map(piece => {
        if (!piece || !piece.type || !piece.value) {
          return null;
        }
        const normalizedType = String(piece.type || "").trim();
        const normalizedValue = targetObject.normalizeRuleBase(piece.value);
        if (!normalizedType || !normalizedValue) {
          return null;
        }
        return {
          type: normalizedType,
          value: normalizedValue
        };
      }).filter(Boolean) : (() => {
        const embeddedPrefix = targetObject.normalizeRuleBase(targetObject.getEmbeddedVerbPrefix(meta) || "");
        const nextCorePrefixParts = [];
        if (supportiveMarker) {
          nextCorePrefixParts.push({
            type: "supportive",
            value: supportiveMarker
          });
        }
        if (embeddedPrefix && embeddedPrefix !== sourcePrefix) {
          nextCorePrefixParts.push({
            type: "adjacent-embed",
            value: embeddedPrefix
          });
        }
        return nextCorePrefixParts;
      })();
      const adjacentCoreEmbed = Array.isArray(corePrefixParts) ? corePrefixParts.find(piece => piece?.type === "adjacent-embed" && piece?.value)?.value || "" : "";
      return {
        sourceKind: "fallback",
        parseLanguage,
        rawRegex: "",
        transitivity: meta?.isMarkedTransitive ? Number.isFinite(meta?.semanticObjectSlotCount) && Number(meta.semanticObjectSlotCount) >= 2 ? targetObject.COMPOSER_TRANSITIVITY.bitransitive : targetObject.COMPOSER_TRANSITIVITY.transitive : targetObject.COMPOSER_TRANSITIVITY.intransitive,
        outerPieces,
        corePrefixParts,
        supportiveMarker,
        adjacentCoreEmbed,
        matrixBase: targetObject.normalizeRuleBase(meta?.exactBaseVerb || meta?.sourceBase || meta?.canonical?.sourceBase || meta?.canonicalRuleBase || splitSource?.matrixBase || analysisVerb || verb || "")
      };
    }
    function buildDerivationSourceModel(verbMeta = {}, verb = "", analysisVerb = "") {
      const meta = verbMeta || {};
      const explicitCurrentRegexParseTree = normalizeCurrentRegexDerivationSourceParseTree(meta?.currentRegexSourceParseTree || meta?.sourceParseTree || meta?.canonical?.currentRegexSourceParseTree || null);
      if (explicitCurrentRegexParseTree) {
        return buildCurrentRegexDerivationSourceModelFromParseTree(explicitCurrentRegexParseTree);
      }
      const rawRegexCandidate = String(meta?.sourceRawVerb || verb || "").trim();
      const currentRegexParseTree = buildCurrentRegexDerivationSourceParseTree(rawRegexCandidate);
      const currentRegexModel = buildCurrentRegexDerivationSourceModelFromParseTree(currentRegexParseTree);
      if (currentRegexModel) {
        return currentRegexModel;
      }
      return buildFallbackDerivationSourceModel(meta, verb, analysisVerb);
    }
    function getDerivationSourceOuterSurface(sourceModel = null) {
      const outerPieces = Array.isArray(sourceModel?.outerPieces) ? sourceModel.outerPieces : [];
      return outerPieces.map(piece => String(piece?.value || "").trim().toLowerCase()).filter(Boolean).join("");
    }
    function buildSupportivePrecedingSurfaceFromVerbMeta(meta = null, verb = "", analysisVerb = "") {
      const normalizedMeta = meta && typeof meta === "object" ? meta : {};
      const sourceModel = buildDerivationSourceModel(normalizedMeta, normalizedMeta?.sourceRawVerb || verb || normalizedMeta?.verb || "", analysisVerb || normalizedMeta?.analysisVerb || verb || normalizedMeta?.verb || "");
      return getDerivationSourceOuterSurface(sourceModel);
    }
    function buildSupportivePrecedingSurfaceFromMorphologyInput({
      sourceRawVerb = "",
      directionalPrefix = "",
      sourcePrefix = "",
      hasImpersonalTaPrefix = false,
      boundPrefixes = [],
      boundExplicitFlags = []
    } = {}) {
      const currentRegexParseTree = buildCurrentRegexDerivationSourceParseTree(sourceRawVerb || "");
      const currentRegexModel = buildCurrentRegexDerivationSourceModelFromParseTree(currentRegexParseTree);
      if (currentRegexModel) {
        return getDerivationSourceOuterSurface(currentRegexModel);
      }
      const lexicalPrefix = targetObject.normalizeRuleBase(sourcePrefix || "");
      const explicitPrefixes = targetObject.getExplicitBoundNonspecificPrefixes(boundPrefixes, boundExplicitFlags).map(value => targetObject.normalizeComposerSecondaryValenceSurfaceToken(value) || targetObject.normalizeComposerValenceToken(value)).filter(Boolean);
      return [targetObject.normalizeComposerStem(directionalPrefix || ""), lexicalPrefix, ...explicitPrefixes, hasImpersonalTaPrefix ? "ta" : ""].filter(Boolean).join("");
    }
    function getCurrentRegexStructuralOccupiedLexicalSourceSlots(verbMeta = null) {
      if (!verbMeta || typeof verbMeta !== "object") {
        return 0;
      }
      const sourceModel = buildDerivationSourceModel(verbMeta, verbMeta?.sourceRawVerb || verbMeta?.verb || "", verbMeta?.analysisVerb || verbMeta?.verb || "");
      if (!sourceModel || sourceModel.sourceKind !== "current-regex") {
        return 0;
      }
      const transitivity = sourceModel.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        return 0;
      }
      const outerPieces = Array.isArray(sourceModel.outerPieces) ? sourceModel.outerPieces : [];
      const lexicalPieceCount = outerPieces.filter(piece => piece?.type === "lexical" && piece?.value).length;
      if (!lexicalPieceCount) {
        return 0;
      }
      const hasExplicitValenceOuterPiece = outerPieces.some(piece => piece?.type === "valence" && piece?.value);
      if (hasExplicitValenceOuterPiece) {
        return 0;
      }
      const maxStructuralSlots = transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive ? 2 : 1;
      return Math.min(maxStructuralSlots, lexicalPieceCount);
    }
    function getDerivationSourceChainPrefixParts(chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
      if (!chain || typeof chain !== "object") {
        return [];
      }
      const resolvedPolicy = policy && typeof policy === "object" ? policy : FULL_SOURCE_CHAIN_REALIZATION_POLICY;
      const preserveDirectional = resolvedPolicy.preserveDirectional !== false;
      const preserveLexical = resolvedPolicy.preserveLexical !== false;
      const preserveValence = resolvedPolicy.preserveValence !== false;
      const preserveImpersonal = resolvedPolicy.preserveImpersonal !== false;
      const modelOuterPieces = Array.isArray(chain?.model?.outerPieces) ? chain.model.outerPieces : null;
      if (modelOuterPieces) {
        return modelOuterPieces.filter(piece => {
          if (!piece || !piece.type || !piece.value) {
            return false;
          }
          if (piece.type === "directional") {
            return preserveDirectional;
          }
          if (piece.type === "lexical") {
            return preserveLexical;
          }
          if (piece.type === "valence") {
            return preserveValence;
          }
          if (piece.type === "impersonal") {
            return preserveImpersonal;
          }
          return false;
        }).map(piece => piece.value).filter(Boolean);
      }
      const prefixParts = [];
      if (preserveDirectional && Array.isArray(chain.directionalPrefixes)) {
        prefixParts.push(...chain.directionalPrefixes.filter(Boolean));
      }
      if (preserveLexical && Array.isArray(chain.lexicalPrefixes)) {
        prefixParts.push(...chain.lexicalPrefixes.filter(Boolean));
      }
      if (preserveValence && Array.isArray(chain.valencePrefixes)) {
        prefixParts.push(...chain.valencePrefixes.filter(Boolean));
      }
      if (preserveImpersonal && Array.isArray(chain.impersonalPrefixes)) {
        prefixParts.push(...chain.impersonalPrefixes.filter(Boolean));
      }
      if (!prefixParts.length && preserveDirectional && preserveLexical && preserveValence && preserveImpersonal && Array.isArray(chain.prefixParts)) {
        return chain.prefixParts.filter(Boolean);
      }
      return prefixParts;
    }
    function getDerivationSourceChainCorePrefixParts(chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
      if (!chain || typeof chain !== "object") {
        return [];
      }
      const resolvedPolicy = policy && typeof policy === "object" ? policy : FULL_SOURCE_CHAIN_REALIZATION_POLICY;
      const preserveSupportive = resolvedPolicy.preserveSupportive !== false;
      const preserveAdjacentEmbed = resolvedPolicy.preserveAdjacentEmbed !== false;
      const modelCorePrefixParts = Array.isArray(chain?.model?.corePrefixParts) ? chain.model.corePrefixParts : null;
      if (modelCorePrefixParts) {
        return modelCorePrefixParts.filter(piece => {
          if (!piece || !piece.type || !piece.value) {
            return false;
          }
          if (piece.type === "supportive") {
            return preserveSupportive;
          }
          if (piece.type === "adjacent-embed") {
            return preserveAdjacentEmbed;
          }
          return false;
        }).map(piece => piece.value).filter(Boolean);
      }
      const corePrefixParts = [];
      if (preserveSupportive && chain.supportiveMarker) {
        corePrefixParts.push(chain.supportiveMarker);
      }
      if (preserveAdjacentEmbed && Array.isArray(chain.corePrefixParts)) {
        corePrefixParts.push(...chain.corePrefixParts.filter(Boolean));
      }
      return corePrefixParts;
    }
    function applySourceChainStemSpecByPolicy(stemSpec = null, fallbackStem = "", chain = null, {
      sourceSuffix = "",
      policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY
    } = {}) {
      const resolvedSpec = stemSpec && typeof stemSpec === "object" && stemSpec.kind ? stemSpec : fallbackStem ? targetObject.buildLiteralMorphStemSpec(fallbackStem) : null;
      if (!resolvedSpec) {
        return null;
      }
      const prefixParts = [...getDerivationSourceChainPrefixParts(chain, policy), ...getDerivationSourceChainCorePrefixParts(chain, policy)];
      if (!prefixParts.length) {
        return resolvedSpec;
      }
      return prefixParts.reduceRight((current, prefixPart) => targetObject.buildPrependMorphStemSpec(current, prefixPart, {
        sourceBase: prefixPart,
        sourceSuffix
      }), resolvedSpec);
    }
    function realizeSourceChainStemByPolicy(stem = "", chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
      const normalizedStem = String(stem || "");
      if (!normalizedStem) {
        return "";
      }
      const prefixParts = [...getDerivationSourceChainPrefixParts(chain, policy), ...getDerivationSourceChainCorePrefixParts(chain, policy)];
      return `${prefixParts.join("")}${normalizedStem}`;
    }
    function getNonactiveDerivationSource(verbMeta, verb, analysisVerb) {
      const chain = buildNonactiveSourceChain(verbMeta, verb, analysisVerb);
      return {
        baseVerb: chain.baseVerb,
        prefix: chain.prefix,
        chain
      };
    }
    function getNonactiveSourceChainPrefixParts(chain = null) {
      return getDerivationSourceChainPrefixParts(chain, FULL_SOURCE_CHAIN_REALIZATION_POLICY);
    }
    function applyNonactiveSourceChainStemSpec(stemSpec = null, fallbackStem = "", chain = null, {
      sourceSuffix = "",
      policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY
    } = {}) {
      return applySourceChainStemSpecByPolicy(stemSpec, fallbackStem, chain, {
        sourceSuffix,
        policy
      });
    }
    function realizeNonactiveSourceChainStem(stem = "", chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
      return realizeSourceChainStemByPolicy(stem, chain, policy);
    }
    function buildPatientivoImperfectiveSourceChain(verbMeta, verb, analysisVerb) {
      return buildFullDerivationSourceChain(verbMeta, verb, analysisVerb);
    }
    function resolvePatientivoImperfectiveBaseStemSpec(chain = null) {
      const baseVerb = targetObject.normalizeDerivationStemValue(chain?.baseVerb || "");
      if (!baseVerb) {
        return null;
      }
      const normalizedSourceBase = targetObject.normalizeRuleBase(chain?.sourceBase || baseVerb);
      let sourceStemSpec = null;
      if (targetObject.endsWithAny(baseVerb, targetObject.IA_UA_SUFFIXES)) {
        sourceStemSpec = targetObject.buildReplaceSuffixMorphStemSpec(baseVerb, "a", "", {
          sourceBase: normalizedSourceBase,
          sourceSuffix: "a"
        });
      }
      const baseStemSpec = sourceStemSpec || targetObject.buildLiteralMorphStemSpec(baseVerb, {
        sourceBase: normalizedSourceBase
      });
      return baseStemSpec;
    }
    function applyPatientivoImperfectiveSourceChainStemSpec(stemSpec = null, fallbackStem = "", chain = null) {
      return applySourceChainStemSpecByPolicy(stemSpec, fallbackStem, chain, {
        policy: PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY
      });
    }
    function realizePatientivoImperfectiveSourceChainStem(stem = "", chain = null) {
      return realizeSourceChainStemByPolicy(stem, chain, PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY);
    }
    const DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT = "tajtani";
    const PATIENTIVO_PRELOCATIVE_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "tla-itta",
      classicalMatrix: "te- ~ tla-(itta)",
      nawatRoot: "ita",
      aliases: ["itta"],
      label: "perceive/see",
      status: "orthography-bridge-data-backed",
      sourceStates: ["absolutive"],
      evidence: ["data/data.csv: -ita", "data/basic-data.csv: -itta", "Andrews 39.7"]
    }), Object.freeze({
      id: "tla-mati",
      classicalMatrix: "te- ~ tla-(mati)",
      nawatRoot: "mati",
      label: "consider/know",
      status: "orthography-bridge-data-backed",
      sourceStates: ["absolutive"],
      evidence: ["data/data.csv: -mati", "Andrews 30.15.2", "Andrews 39.7"]
    }), Object.freeze({
      id: "tla-nequi",
      classicalMatrix: "te- ~ tla-(nequi)",
      nawatRoot: "neki",
      aliases: ["nejneki"],
      label: "want/pretend",
      status: "orthography-bridge-data-backed",
      sourceStates: ["absolutive"],
      evidence: ["data/data.csv: -neki", "data/basic-data.csv: -nejneki", "Andrews 30.15.2", "Andrews 39.7"]
    }), Object.freeze({
      id: "tla-toca",
      classicalMatrix: "te- ~ tla-(toca)",
      nawatRoot: "tuka",
      label: "consider without foundation",
      status: "orthography-bridge-data-backed",
      sourceStates: ["absolutive", "possessive"],
      evidence: ["data/data.csv: -tuka", "Andrews 30.15.2", "Andrews 39.7"]
    }), Object.freeze({
      id: "tla-tlani",
      classicalMatrix: "tla-(tlani)",
      nawatRoot: "tajtani",
      label: "want/request",
      status: "orthography-bridge-data-backed",
      sourceStates: ["absolutive", "possessive"],
      evidence: ["data/data.csv: -tajtani", "Andrews 39.7", "Andrews 39.8"]
    }), Object.freeze({
      id: "tla-ih-tlani",
      classicalMatrix: "tla-(ih-tlani)",
      nawatRoot: "tatajtania",
      label: "request",
      status: "orthography-bridge-data-backed",
      sourceStates: ["possessive"],
      evidence: ["data/basic-data.csv: -tatajtania", "Andrews 39.8"]
    }), Object.freeze({
      id: "tla-tem-o-a",
      classicalMatrix: "tla-(tem-o-a)",
      nawatRoot: "temua",
      label: "seek",
      status: "orthography-bridge-data-backed",
      sourceStates: ["possessive"],
      evidence: ["data/basic-data.csv: -ishtemua/-shuchitemua", "Andrews 39.8"]
    })]);
    const DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT = "miki";
    const PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "miqui",
      classicalMatrix: "(miqui)",
      nawatRoot: "miki",
      aliases: ["miqui"],
      label: "die/be affected as",
      status: "orthography-bridge-data-backed",
      matrixValency: "intransitive",
      evidence: ["data/data.csv: miki", "Andrews 39.6"]
    })]);
    const DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT = "kal";
    const PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "cal-li",
      classicalMatrix: "(cal)-li",
      nawatRoot: "kal",
      nounClass: "zero",
      animacy: "inanimate",
      label: "house/place noun matrix",
      status: "orthography-bridge-data-backed",
      evidence: ["data/static_nnc.json: kal", "data/basic-data.csv: kal", "Andrews 39.6"]
    })]);
    const PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX = "yut";
    const PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX = "yu";
    const DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT = "chikawa";
    const PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "chic-a-hu-a",
      classicalMatrix: "(chic-a-hu-a)",
      nawatRoot: "chikawa",
      label: "strengthen/intensify by the embedded property",
      status: "orthography-bridge-data-backed",
      matrixValency: "transitive",
      evidence: ["data/basic-data.csv: -yulchikawa", "data/exact_rules.json: kakchikawa/akchikawa", "Andrews 39.9"]
    })]);
    const DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT = "tzajtzi";
    const ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "tzahtzi",
      classicalMatrix: "(tzahtzi)",
      nawatRoot: "tzajtzi",
      aliases: ["tzahtzi"],
      label: "shout with the embedded action",
      status: "orthography-bridge-data-backed",
      matrixValency: "intransitive",
      evidence: ["data/data.csv: tzajtzi", "data/basic-data.csv: tzajtzi", "Andrews 37.5.4"]
    })]);
    const DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT = "kal";
    const ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "cal-li",
      classicalMatrix: "(cal)-li",
      nawatRoot: "kal",
      nounClass: "zero",
      animacy: "inanimate",
      label: "house/place noun matrix",
      status: "orthography-bridge-data-backed",
      evidence: ["data/static_nnc.json: kal", "data/basic-data.csv: kal", "Andrews 37.5.4"]
    })]);
    const DEFAULT_PRETERIT_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT = DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT;
    const DEFAULT_PRETERIT_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT = DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT;
    const DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT = "tuka";
    const DEFAULT_CUSTOMARY_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT = DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT;
    const DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT = "wa";
    const DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT = "mati";
    const DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT = "nemi";
    const CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "toca-incorporated-complement",
      classicalMatrix: "(toca)",
      nawatRoot: "tuka",
      grammarSource: "Andrews 36.3",
      status: "andrews-authoritative-orthography-bridge-data-backed",
      matrixValency: "transitive",
      objectPrefix: "ki",
      label: "consider as the embedded fully nominalized customary-agentive entity",
      evidence: ["Andrews 36.3: fully nominalized customary-present agentive stems can fill compound embed position", "data/basic-data.csv/data.csv: -tuka"]
    })]);
    const PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "tla-hua-ownerhood",
      classicalMatrix: "*tla-(-hua)",
      nawatRoot: "wa",
      surfaceMatrix: "waj",
      ownerhoodKind: "ownerhood",
      grammarSource: "Andrews 35.9",
      status: "andrews-authoritative-matrix-orthography-bridge",
      matrixValency: "transitive",
      label: "ownerhood matrix",
      evidence: ["Andrews 35.9: general-use preterit-agentive stems incorporate into *tla-(-hua)", "data/basic-data.csv: ashkawajkati"]
    }), Object.freeze({
      id: "tla-yo-a-abundant-ownerhood",
      classicalMatrix: "*tla-(-yo-a)",
      nawatRoot: "yua",
      surfaceMatrix: "yuj",
      ownerhoodKind: "abundant-ownerhood",
      grammarSource: "Andrews 35.10",
      status: "andrews-authoritative-matrix-orthography-bridge",
      matrixValency: "transitive",
      label: "abundant ownerhood matrix",
      evidence: ["Andrews 35.10: abundant ownerhood uses *tla-(-yo-a)", "data/basic-data.csv: shuchiyua/shuchiyuj"]
    })]);
    const PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "te-tlalia",
      classicalMatrix: "te-(tlal-i-a)",
      nawatRoot: "talia",
      grammarSource: "Andrews 35.12",
      status: "andrews-authoritative-orthography-bridge-data-backed",
      matrixValency: "transitive",
      objectPrefix: "ki",
      label: "establish as the embedded preterit-agentive entity",
      evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv: -talia"]
    }), Object.freeze({
      id: "te-cahua",
      classicalMatrix: "te-(cahua)",
      nawatRoot: "kawa",
      grammarSource: "Andrews 35.12",
      status: "andrews-authoritative-orthography-bridge-data-backed",
      matrixValency: "transitive",
      objectPrefix: "ki",
      label: "leave as the embedded preterit-agentive entity",
      evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv/data.csv: -kawa"]
    }), Object.freeze({
      id: "te-pehpena",
      classicalMatrix: "te-(peh-pena)",
      nawatRoot: "pejpena",
      grammarSource: "Andrews 35.12",
      status: "andrews-authoritative-orthography-bridge-data-backed",
      matrixValency: "transitive",
      objectPrefix: "ki",
      label: "choose as the embedded preterit-agentive entity",
      evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv/data.csv: -pejpena"]
    }), Object.freeze({
      id: "te-tla-mati",
      classicalMatrix: "te- ~ tla-(mati)",
      nawatRoot: "mati",
      grammarSource: "Andrews 35.12",
      status: "andrews-authoritative-orthography-bridge-data-backed",
      matrixValency: "transitive",
      objectPrefix: "ki",
      label: "consider as the embedded preterit-agentive entity",
      evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv/data.csv: -mati"]
    }), Object.freeze({
      id: "te-toca",
      classicalMatrix: "te- ~ tla-(toca)",
      nawatRoot: "tuka",
      grammarSource: "Andrews 35.12",
      status: "andrews-authoritative-orthography-bridge-data-backed",
      matrixValency: "transitive",
      objectPrefix: "ki",
      label: "treat as the embedded preterit-agentive entity",
      evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv/data.csv: -tuka"]
    }), Object.freeze({
      id: "te-nehnequi",
      classicalMatrix: "te- ~ tla-(neh-nequi)",
      nawatRoot: "nejneki",
      grammarSource: "Andrews 35.12",
      status: "andrews-authoritative-orthography-bridge-data-backed",
      matrixValency: "transitive",
      objectPrefix: "ki",
      label: "pretend as the embedded preterit-agentive entity",
      evidence: ["Andrews 35.12: incorporated-complement VNC", "data/basic-data.csv: -nejneki"]
    })]);
    const PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "nemi-adverbial-manner",
      classicalMatrix: "(nemi)",
      nawatRoot: "nemi",
      grammarSource: "Andrews 35.12",
      status: "andrews-authoritative-orthography-bridge-data-backed",
      matrixValency: "intransitive",
      adverbialFocus: "subject",
      label: "live/go in the manner of the embedded preterit-agentive entity",
      evidence: ["Andrews 35.12: preterit-agentive nounstem as incorporated adverb of manner", "data/basic-data.csv: tamatkanemi"]
    })]);
    const ORDINARY_NOUN_OWNERHOOD_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "tla-e-ownerhood",
      classicalMatrix: "*tla-(-e)",
      nawatRoot: "e",
      surfaceMatrix: "ej",
      ownerhoodKind: "ownerhood",
      grammarSource: "Andrews 35.9",
      status: "andrews-authoritative-orthography-bridge",
      matrixValency: "transitive",
      defaultForNounClasses: ["t"],
      label: "ownerhood matrix for compatible t-class nouns",
      evidence: ["Andrews 35.9: *tla-(-e) incorporates tli-class nounstems", "Nawat preterit engine: (tupil)-(e) -> tupilejka"]
    }), Object.freeze({
      id: "tla-hua-ownerhood",
      classicalMatrix: "*tla-(-hua)",
      nawatRoot: "wa",
      surfaceMatrix: "waj",
      ownerhoodKind: "ownerhood",
      grammarSource: "Andrews 35.9",
      status: "andrews-authoritative-orthography-bridge",
      matrixValency: "transitive",
      defaultForNounClasses: ["in", "zero"],
      label: "ownerhood matrix for compatible in/zero-class nouns",
      evidence: ["Andrews 35.9: *tla-(-hua) incorporates in and zero nounstems", "data/basic-data.csv: ashkawajkati"]
    }), Object.freeze({
      id: "tla-yo-a-abundant-ownerhood",
      classicalMatrix: "*tla-(-yo-a)",
      nawatRoot: "yua",
      surfaceMatrix: "yuj",
      ownerhoodKind: "abundant-ownerhood",
      grammarSource: "Andrews 35.10",
      status: "andrews-authoritative-orthography-bridge",
      matrixValency: "transitive",
      defaultForNounClasses: ["t", "ti", "in", "zero"],
      label: "abundant ownerhood matrix",
      evidence: ["Andrews 35.10: abundant ownerhood uses *tla-(-yo-a)", "data/basic-data.csv: shuchiyua/shuchiyuj"]
    })]);
    function getPatientivoPrelocativeMatrixInventory() {
      return PATIENTIVO_PRELOCATIVE_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function resolvePatientivoPrelocativeMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT;
      const spec = PATIENTIVO_PRELOCATIVE_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot));
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        label: "",
        status: "unsupported",
        supported: false,
        diagnostics: ["patientivo-prelocative-unsupported-matrix"]
      };
    }
    function resolvePatientivoPrelocativeConnectorSuffix(patientivoNominalSuffix = "") {
      const normalized = typeof targetObject.normalizePatientivoNominalSuffixSelection === "function" ? targetObject.normalizePatientivoNominalSuffixSelection(patientivoNominalSuffix) : String(patientivoNominalSuffix || "").trim();
      return normalized === null ? "t" : normalized;
    }
    function getPatientivoCompoundEmbedMatrixInventory() {
      return PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function getPatientivoNominalCompoundMatrixInventory() {
      return PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function getPatientivoCharacteristicPropertyMatrixInventory() {
      return PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function getActiveActionCompoundEmbedMatrixInventory() {
      return ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function getActiveActionNominalCompoundMatrixInventory() {
      return ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function getPreteritAgentiveCompoundEmbedMatrixInventory() {
      return ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_SPECS.map(entry => ({
        ...entry,
        grammarSource: "Andrews 35.7"
      }));
    }
    function getPreteritAgentiveNominalCompoundMatrixInventory() {
      return ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS.map(entry => ({
        ...entry,
        grammarSource: "Andrews 35.7"
      }));
    }
    function getCustomaryAgentiveCompoundEmbedMatrixInventory() {
      return CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function getCustomaryAgentiveNominalCompoundMatrixInventory() {
      return ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS.map(entry => ({
        ...entry,
        grammarSource: "Andrews 36.3"
      }));
    }
    function getPreteritAgentiveOwnerhoodMatrixInventory() {
      return PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function getPreteritAgentiveComplementMatrixInventory() {
      return PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function getPreteritAgentiveAdverbialMatrixInventory() {
      return PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function getOrdinaryNounOwnerhoodMatrixInventory() {
      return ORDINARY_NOUN_OWNERHOOD_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function resolvePatientivoCompoundEmbedMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT;
      const spec = PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot));
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        label: "",
        status: "unsupported",
        matrixValency: "",
        supported: false,
        diagnostics: ["patientivo-compound-embed-unsupported-matrix"]
      };
    }
    function resolvePatientivoNominalCompoundMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT;
      const spec = PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot));
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        nounClass: "",
        animacy: "",
        label: "",
        status: "unsupported",
        supported: false,
        diagnostics: ["patientivo-nominal-compound-unsupported-matrix"]
      };
    }
    function resolvePatientivoCharacteristicPropertyMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT;
      const spec = PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot));
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        label: "",
        status: "unsupported",
        matrixValency: "",
        supported: false,
        diagnostics: ["patientivo-characteristic-property-unsupported-matrix"]
      };
    }
    function resolveActiveActionCompoundEmbedMatrixSpec(matrixRoot = DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT;
      const spec = ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot));
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        label: "",
        status: "unsupported",
        matrixValency: "",
        supported: false,
        diagnostics: ["active-action-compound-embed-unsupported-matrix"]
      };
    }
    function resolveActiveActionNominalCompoundMatrixSpec(matrixRoot = DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT;
      const spec = ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot));
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        nounClass: "",
        animacy: "",
        label: "",
        status: "unsupported",
        supported: false,
        diagnostics: ["active-action-nominal-compound-unsupported-matrix"]
      };
    }
    function resolvePreteritAgentiveCompoundEmbedMatrixSpec(matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT) {
      const resolved = resolveActiveActionCompoundEmbedMatrixSpec(matrixRoot);
      return resolved.supported ? {
        ...resolved,
        grammarSource: "Andrews 35.7"
      } : {
        ...resolved,
        diagnostics: (resolved.diagnostics || []).map(diagnostic => diagnostic === "active-action-compound-embed-unsupported-matrix" ? "preterit-agentive-compound-embed-unsupported-matrix" : diagnostic)
      };
    }
    function resolvePreteritAgentiveNominalCompoundMatrixSpec(matrixRoot = DEFAULT_PRETERIT_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT) {
      const resolved = resolveActiveActionNominalCompoundMatrixSpec(matrixRoot);
      return resolved.supported ? {
        ...resolved,
        grammarSource: "Andrews 35.7"
      } : {
        ...resolved,
        diagnostics: (resolved.diagnostics || []).map(diagnostic => diagnostic === "active-action-nominal-compound-unsupported-matrix" ? "preterit-agentive-nominal-compound-unsupported-matrix" : diagnostic)
      };
    }
    function resolveCustomaryAgentiveCompoundEmbedMatrixSpec(matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT;
      const spec = CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || entry.id === normalizedRoot || entry.classicalMatrix === normalizedRoot);
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        grammarSource: "",
        status: "unsupported",
        matrixValency: "",
        objectPrefix: "",
        label: "",
        supported: false,
        diagnostics: ["customary-agentive-compound-embed-unsupported-matrix"]
      };
    }
    function resolveCustomaryAgentiveNominalCompoundMatrixSpec(matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT) {
      const resolved = resolveActiveActionNominalCompoundMatrixSpec(matrixRoot);
      return resolved.supported ? {
        ...resolved,
        grammarSource: "Andrews 36.3"
      } : {
        ...resolved,
        diagnostics: (resolved.diagnostics || []).map(diagnostic => diagnostic === "active-action-nominal-compound-unsupported-matrix" ? "customary-agentive-nominal-compound-unsupported-matrix" : diagnostic)
      };
    }
    function resolvePreteritAgentiveOwnerhoodMatrixSpec(matrixRoot = DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT;
      const spec = PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || entry.surfaceMatrix === normalizedRoot || entry.id === normalizedRoot);
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        surfaceMatrix: "",
        ownerhoodKind: "",
        grammarSource: "",
        status: "unsupported",
        matrixValency: "",
        label: "",
        supported: false,
        diagnostics: ["preterit-agentive-ownerhood-unsupported-matrix"]
      };
    }
    function resolvePreteritAgentiveComplementMatrixSpec(matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT;
      const spec = PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || entry.id === normalizedRoot || entry.classicalMatrix === normalizedRoot);
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        grammarSource: "",
        status: "unsupported",
        matrixValency: "",
        objectPrefix: "",
        label: "",
        supported: false,
        diagnostics: ["preterit-agentive-complement-unsupported-matrix"]
      };
    }
    function resolvePreteritAgentiveAdverbialMatrixSpec(matrixRoot = DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT;
      const spec = PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || entry.id === normalizedRoot || entry.classicalMatrix === normalizedRoot);
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        grammarSource: "",
        status: "unsupported",
        matrixValency: "",
        adverbialFocus: "",
        label: "",
        supported: false,
        diagnostics: ["preterit-agentive-adverbial-unsupported-matrix"]
      };
    }
    function normalizeOrdinaryNounOwnerhoodNounClass(nounClass = "") {
      const normalized = String(nounClass || "").trim().toLowerCase();
      if (normalized === "0" || normalized === "ø") {
        return "zero";
      }
      return ["t", "ti", "in", "zero"].includes(normalized) ? normalized : "";
    }
    function resolveOrdinaryNounOwnerhoodMatrixSpec(matrixRoot = "") {
      const normalizedRoot = String(matrixRoot || "").trim().toLowerCase();
      const spec = ORDINARY_NOUN_OWNERHOOD_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || entry.surfaceMatrix === normalizedRoot || entry.id === normalizedRoot);
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        surfaceMatrix: "",
        ownerhoodKind: "",
        grammarSource: "",
        status: "unsupported",
        matrixValency: "",
        defaultForNounClasses: [],
        label: "",
        supported: false,
        diagnostics: ["ordinary-noun-ownerhood-unsupported-matrix"]
      };
    }
    function resolveOrdinaryNounOwnerhoodDefaultMatrixRoot({
      nounClass = "",
      ownerhoodKind = "ownerhood"
    } = {}) {
      const normalizedClass = normalizeOrdinaryNounOwnerhoodNounClass(nounClass);
      const normalizedKind = String(ownerhoodKind || "ownerhood").trim();
      if (normalizedKind === "abundant-ownerhood") {
        return "yua";
      }
      if (normalizedClass === "t") {
        return "e";
      }
      if (normalizedClass === "in" || normalizedClass === "zero") {
        return "wa";
      }
      return "";
    }
    function isOrdinaryNounOwnerhoodMatrixCompatibleWithNounClass(matrixSpec = null, nounClass = "") {
      if (!matrixSpec || matrixSpec.supported === false) {
        return false;
      }
      const normalizedClass = normalizeOrdinaryNounOwnerhoodNounClass(nounClass);
      if (!normalizedClass) {
        return false;
      }
      const defaultClasses = Array.isArray(matrixSpec.defaultForNounClasses) ? matrixSpec.defaultForNounClasses : [];
      return defaultClasses.includes(normalizedClass);
    }
    function buildPatientivoCompoundEmbedVerbInput({
      incorporatedRoot = "",
      matrixRoot = DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT
    } = {}) {
      const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
      const matrixSpec = resolvePatientivoCompoundEmbedMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
      }
      const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
      return `${transitiveMarker}(${normalizedIncorporatedRoot}/${normalizedMatrixRoot})`;
    }
    function getTypedPatientivoContinuationSourceFramePayload(frame = null) {
      if (!isGeneratedOutputTypedDerivationContinuationFrame(frame)) {
        return null;
      }
      const formulaRecord = frame.formulaRecord && typeof frame.formulaRecord === "object" ? frame.formulaRecord : null;
      const formulaRealizationRecord = frame.formulaRealizationRecord && typeof frame.formulaRealizationRecord === "object" ? frame.formulaRealizationRecord : null;
      const predicateSlot = formulaRecord?.formulaSlots?.predicateStem || frame.formulaSlots?.predicateStem || null;
      const patientivoStem = String(predicateSlot?.stem || predicateSlot?.value || predicateSlot?.formulaValue || "").trim();
      if (!formulaRecord?.id || !formulaRealizationRecord?.id || !patientivoStem) {
        return null;
      }
      return {
        patientivoStem,
        formulaRecord,
        formulaRealizationRecord,
        selectedVariant: frame.selectedVariant && typeof frame.selectedVariant === "object" ? frame.selectedVariant : null
      };
    }
    function buildPatientivoCompoundEmbedTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      compoundVerbInput = ""
    } = {}) {
      const sourcePayload = getTypedPatientivoContinuationSourceFramePayload(sourceContinuationFrame);
      const sourceRoot = String(sourcePayload?.patientivoStem || "").trim();
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const targetInput = String(compoundVerbInput || "").trim();
      if (!sourceRoot || !matrixRoot || !targetInput) {
        return null;
      }
      const targetStem = `${sourceRoot}${matrixRoot}`;
      const objectPrefix = matrix.matrixValency === "transitive" ? "ki" : "";
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "patientivo-nounstem-as-compound-vnc-embed",
        operationFamily: "patientivo-compound-embed",
        andrewsSection: "Andrews 39.6",
        sourceUnit: "CNN",
        targetUnit: "CNV",
        route: "CNN patientive nounstem -> CNV compound verbstem embed",
        embedRole: "compound-embed",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "CNV",
        targetUnit: "CNV",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourcePayload.formulaRecord.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourcePayload.formulaRealizationRecord.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "patientivo-compound-embed-target-frame",
          generationAllowed: true,
          grammarSource: "Andrews 39.6",
          outputKind: "patientivo-compound-embed-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "compound-embed",
            role: "embedded-patientive-nounstem",
            token: sourceRoot,
            root: sourceRoot,
            sourceFrameId: String(sourcePayload.selectedVariant?.variantId || sourcePayload.formulaRealizationRecord.id || "").trim(),
            sourceFormulaRecordId: String(sourcePayload.formulaRecord.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourcePayload.formulaRealizationRecord.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "compound-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            valency: String(matrix.matrixValency || "").trim(),
            objectPrefix
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "compound-verbstem",
            stem: targetStem,
            objectPrefix
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          valency: String(matrix.matrixValency || "").trim(),
          objectPrefix,
          grammarSource: "Andrews 39.6"
        }),
        targetFrame: Object.freeze({
          kind: "patientivo-compound-embed-target-frame",
          unit: "CNV",
          targetUnit: "CNV",
          stem: targetStem,
          compoundVerbInput: targetInput,
          targetInput,
          displayInput: targetInput,
          objectPrefix
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildPatientivoCompoundEmbedOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null
    } = {}) {
      const sourcePayload = getTypedPatientivoContinuationSourceFramePayload(sourceContinuationFrame);
      const sourceRoot = String(sourcePayload?.patientivoStem || "").trim();
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const targetStem = String(targetFrame.stem || "").trim();
      const targetInput = String(targetFrame.compoundVerbInput || targetFrame.targetInput || "").trim();
      if (!sourceRoot || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      if (targetStem !== `${sourceRoot}${matrixRoot}`) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-patientivo-compound-embed-operation-frame",
        version: 1,
        grammarSource: "Andrews 39.6",
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "patientivo-nounstem-as-compound-vnc-embed",
          operationFamily: "patientivo-compound-embed",
          sourceUnit: "CNN",
          targetUnit: "CNV",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "patientivo-compound-embed-source-frame",
          role: "compound-embed",
          root: sourceRoot,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourcePayload?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourcePayload?.formulaRealizationRecord?.id || ""),
          source: "generated-patientive-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "patientivo-compound-embed-matrix-frame",
          role: "compound-matrix",
          type: "verbal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          valency: String(matrix.matrixValency || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "patientivo-compound-embed-target-frame",
          unit: "CNV",
          stem: targetStem,
          objectPrefix: matrix.matrixValency === "transitive" ? "ki" : "",
          displayInput: targetInput,
          compoundVerbInput: targetInput,
          targetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "patientivo-compound-embed",
          routeStage: "typed-operation-frame",
          grammarSource: "Andrews 39.6",
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          compoundEmbed: Object.freeze({
            slot: "compound-embed",
            role: "embedded-patientive-nounstem",
            root: sourceRoot
          }),
          compoundMatrix: Object.freeze({
            slot: "compound-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            valency: String(matrix.matrixValency || "")
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "compound-verbstem",
            stem: targetStem
          })
        })
      });
    }
    function isPatientivoCompoundEmbedOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-patientivo-compound-embed-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildPatientivoCompoundEmbedGenerationRequestFromOperationFrame(operationFrame = null, {
      subjectPrefix = "",
      subjectSuffix = "",
      tense = "presente"
    } = {}) {
      if (!isPatientivoCompoundEmbedOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["patientivo-compound-embed-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const objectPrefix = String(operationFrame.targetFrame.objectPrefix || "").trim();
      return {
        supported: true,
        diagnostics: [],
        request: {
          posicionesFormula: {
            pers1: String(subjectPrefix || ""),
            obj1: objectPrefix,
            tronco: targetStem,
            pers2: String(subjectSuffix || ""),
            num2: String(subjectSuffix || ""),
            poseedor: "",
            tiempo: String(tense || "presente")
          },
          options: {
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: "verbo",
              combinedMode: "active",
              derivationMode: "active",
              voiceMode: "active",
              typedCompoundOperationFrame: operationFrame
            }
          }
        }
      };
    }
    function resolvePatientivoCompoundEmbedFormationFrame({
      matrixSpec = null,
      incorporatedRoot = "",
      patientivoSurface = "",
      sourceSurface = "",
      compoundVerbInput = "",
      operationFrame = null
    } = {}) {
      return {
        kind: "patientivo-compound-embed-formation-frame",
        version: 1,
        grammarSource: "Andrews 39.6",
        compoundStemType: "verbal",
        sourceSurface: String(sourceSurface || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        embed: {
          role: "compound-embed",
          root: String(incorporatedRoot || "").trim(),
          source: "generated-patientive-nounstem",
          insideStem: true
        },
        matrix: {
          role: "compound-matrix",
          type: "verbal",
          id: String(matrixSpec?.id || "").trim(),
          root: matrixSpec?.supported ? matrixSpec.nawatRoot : "",
          classicalMatrix: String(matrixSpec?.classicalMatrix || ""),
          valency: String(matrixSpec?.matrixValency || "")
        },
        output: {
          kind: "compound-vnc-input",
          verbInput: String(compoundVerbInput || "").trim(),
          targetStem: String(operationFrame?.targetFrame?.stem || ""),
          operationFrameKind: String(operationFrame?.kind || ""),
          displayInputIsNotAuthority: operationFrame?.operationFrame?.displayInputIsNotAuthority === true
        },
        evidencePolicy: {
          matrixRequiresStructuredMatrixSource: true,
          matrixDataBacked: Boolean(matrixSpec?.supported),
          patientiveSurfaceComesFromSalida: true,
          createsOrdinaryNncFixture: false,
          copiesClassicalSurface: false
        }
      };
    }
    function buildPatientivoNominalCompoundStem({
      incorporatedRoot = "",
      matrixRoot = DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT
    } = {}) {
      const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
      const matrixSpec = resolvePatientivoNominalCompoundMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
      }
      return `${normalizedIncorporatedRoot}${normalizedMatrixRoot}`;
    }
    function formatPatientivoNominalCompoundOrdinaryNncInput({
      compoundStem = "",
      nounClass = ""
    } = {}) {
      const normalizedStem = String(compoundStem || "").trim();
      if (!normalizedStem) {
        return "";
      }
      const normalizedClass = String(nounClass || "").trim();
      const connector = ["t", "ti", "in"].includes(normalizedClass) ? normalizedClass : "";
      return `(${normalizedStem})${connector}`;
    }
    function buildNominalCompoundOrdinaryNncRequest({
      compoundStem = "",
      nounClass = "zero",
      animacy = "inanimate",
      operationFrame = null,
      sourceFrame = null,
      targetFrame = null,
      routeStage = "nominal-compound-continuation"
    } = {}) {
      const normalizedStem = String(compoundStem || "").trim();
      if (!normalizedStem) {
        return null;
      }
      const normalizedClass = String(nounClass || "zero").trim() || "zero";
      const normalizedAnimacy = String(animacy || "inanimate").trim() || "inanimate";
      return {
        stem: normalizedStem,
        state: "absolutive",
        number: "singular",
        pluralType: "auto",
        nounClass: normalizedClass,
        animacy: normalizedAnimacy,
        formulaSlots: {
          predicateStem: {
            role: "predicate",
            slot: "STEM",
            stem: normalizedStem,
            state: "absolutive"
          },
          num1Num2: {
            role: "subject-number-connector",
            slot: "num1-num2",
            nounClass: normalizedClass,
            referenceNumber: "singular",
            pluralType: ""
          }
        },
        routeContract: {
          routeFamily: "ordinary-nnc",
          routeStage: String(routeStage || "nominal-compound-continuation").trim() || "nominal-compound-continuation",
          operationFrame: operationFrame && typeof operationFrame === "object" ? operationFrame : null,
          sourceFrame: sourceFrame && typeof sourceFrame === "object" ? sourceFrame : null,
          targetFrame: targetFrame && typeof targetFrame === "object" ? targetFrame : null,
          formulaSlots: {
            predicateStem: {
              role: "predicate",
              slot: "STEM",
              stem: normalizedStem,
              state: "absolutive"
            },
            num1Num2: {
              role: "subject-number-connector",
              slot: "num1-num2",
              nounClass: normalizedClass,
              referenceNumber: "singular",
              pluralType: ""
            }
          }
        }
      };
    }
    function stripPatientivoCharacteristicPropertySuffix(surface = "", {
      suffix = PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
      possessivePrefix = ""
    } = {}) {
      const normalized = String(surface || "").trim();
      const normalizedSuffix = String(suffix || PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX).trim();
      if (!normalized) {
        return "";
      }
      if (normalizedSuffix && normalized.length > normalizedSuffix.length && normalized.endsWith(normalizedSuffix)) {
        return normalized.slice(0, -normalizedSuffix.length);
      }
      const normalizedPossessivePrefix = String(possessivePrefix || "").trim();
      const possessiveSuffix = PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX;
      if (normalizedPossessivePrefix && normalized.startsWith(normalizedPossessivePrefix) && normalized.length > normalizedPossessivePrefix.length + possessiveSuffix.length && normalized.endsWith(possessiveSuffix)) {
        return normalized.slice(normalizedPossessivePrefix.length, -possessiveSuffix.length);
      }
      return "";
    }
    function resolvePatientivoCharacteristicPropertyEmbedSource({
      characteristicSurface = "",
      possessorPrefix = ""
    } = {}) {
      const normalizedSurface = String(characteristicSurface || "").trim();
      const absolutiveRoot = stripPatientivoCharacteristicPropertySuffix(normalizedSurface);
      if (absolutiveRoot) {
        return {
          sourceState: "absolutive",
          sourceRole: "subject",
          incorporatedRoot: absolutiveRoot,
          omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
          possessorPrefix: "",
          objectPrefix: "ki",
          objectTransfer: {
            sourceState: "absolutive",
            sourceRole: "subject",
            objectPrefix: "ki",
            objectCase: "objective",
            objectLine: "mainline",
            diagnostics: []
          },
          diagnostics: []
        };
      }
      const normalizedPossessor = String(possessorPrefix || "").trim();
      if (!normalizedPossessor) {
        return {
          sourceState: "",
          sourceRole: "",
          incorporatedRoot: "",
          omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
          possessorPrefix: "",
          objectPrefix: "",
          objectTransfer: null,
          diagnostics: ["patientivo-characteristic-property-missing-yut-suffix"]
        };
      }
      const map = getPatientivoPrelocativePossessiveObjectMap();
      const objectPrefix = String(map[normalizedPossessor] || "").trim();
      if (!objectPrefix) {
        return {
          sourceState: "possessive",
          sourceRole: "possessor",
          incorporatedRoot: "",
          omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX,
          possessorPrefix: normalizedPossessor,
          objectPrefix: "",
          objectTransfer: null,
          diagnostics: ["patientivo-characteristic-property-unmapped-possessor"]
        };
      }
      const possessiveRoot = stripPatientivoCharacteristicPropertySuffix(normalizedSurface, {
        possessivePrefix: normalizedPossessor
      });
      return {
        sourceState: "possessive",
        sourceRole: "possessor",
        incorporatedRoot: possessiveRoot,
        omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX,
        possessorPrefix: normalizedPossessor,
        objectPrefix,
        objectTransfer: {
          sourceState: "possessive",
          sourceRole: "possessor",
          sourcePrefix: normalizedPossessor,
          objectPrefix,
          objectCase: "objective",
          objectLine: "mainline",
          diagnostics: []
        },
        diagnostics: possessiveRoot ? [] : ["patientivo-characteristic-property-missing-yu-suffix"]
      };
    }
    function buildPatientivoCharacteristicPropertyEmbedVerbInput({
      incorporatedRoot = "",
      matrixRoot = DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT
    } = {}) {
      const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
      const matrixSpec = resolvePatientivoCharacteristicPropertyMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
      }
      const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
      return `${transitiveMarker}(${normalizedIncorporatedRoot}/${normalizedMatrixRoot})`;
    }
    function getTypedCharacteristicPropertyEmbedSourcePayload(frame = null, {
      possessorPrefix = ""
    } = {}) {
      if (!isGeneratedOutputTypedDerivationContinuationFrame(frame)) {
        return null;
      }
      const formulaRecord = frame.formulaRecord && typeof frame.formulaRecord === "object" ? frame.formulaRecord : null;
      const formulaRealizationRecord = frame.formulaRealizationRecord && typeof frame.formulaRealizationRecord === "object" ? frame.formulaRealizationRecord : null;
      const predicateSlot = formulaRecord?.formulaSlots?.predicateStem || frame.formulaSlots?.predicateStem || null;
      const characteristicStem = String(predicateSlot?.stem || predicateSlot?.value || predicateSlot?.formulaValue || "").trim();
      if (!formulaRecord?.id || !formulaRealizationRecord?.id || !characteristicStem) {
        return null;
      }
      const embedSource = resolvePatientivoCharacteristicPropertyEmbedSource({
        characteristicSurface: characteristicStem,
        possessorPrefix
      });
      if (!embedSource?.incorporatedRoot) {
        return {
          characteristicStem,
          formulaRecord,
          formulaRealizationRecord,
          selectedVariant: frame.selectedVariant && typeof frame.selectedVariant === "object" ? frame.selectedVariant : null,
          embedSource
        };
      }
      return {
        characteristicStem,
        formulaRecord,
        formulaRealizationRecord,
        selectedVariant: frame.selectedVariant && typeof frame.selectedVariant === "object" ? frame.selectedVariant : null,
        embedSource
      };
    }
    function buildPatientivoCharacteristicPropertyTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      embedSource = null,
      compoundVerbInput = ""
    } = {}) {
      const sourcePayload = getTypedCharacteristicPropertyEmbedSourcePayload(sourceContinuationFrame, {
        possessorPrefix: embedSource?.possessorPrefix || ""
      });
      if (!sourcePayload || !sourceContinuationFrame) {
        return null;
      }
      const sourceRoot = String(sourcePayload?.embedSource?.incorporatedRoot || embedSource?.incorporatedRoot || "").trim();
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const objectPrefix = String(embedSource?.objectPrefix || "").trim();
      const omittedSuffix = String(embedSource?.omittedSuffix || "").trim();
      const targetInput = String(compoundVerbInput || "").trim();
      if (!sourceRoot || !matrixRoot || !objectPrefix || !targetInput || !omittedSuffix) {
        return null;
      }
      const targetStem = `${sourceRoot}${matrixRoot}`;
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "patientivo-characteristic-property-nounstem-as-incorporated-object",
        operationFamily: "patientivo-characteristic-property-embed",
        andrewsSection: "Andrews 39.9",
        sourceUnit: "CNN",
        targetUnit: "CNV",
        route: "CNN characteristic-property nounstem -> CNV incorporated object",
        embedRole: "incorporated-object",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        objectTransferRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "CNV",
        targetUnit: "CNV",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourcePayload.formulaRecord.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourcePayload.formulaRealizationRecord.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "patientivo-characteristic-property-target-frame",
          generationAllowed: true,
          grammarSource: "Andrews 39.9",
          outputKind: "patientivo-characteristic-property-embed-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "compound-embed",
            role: "incorporated-object",
            token: sourceRoot,
            root: sourceRoot,
            omittedSuffix,
            sourceStem: String(sourcePayload.characteristicStem || ""),
            sourceState: String(embedSource?.sourceState || ""),
            sourceFrameId: String(sourcePayload.selectedVariant?.variantId || sourcePayload.formulaRealizationRecord.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "compound-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            valency: String(matrix.matrixValency || "").trim()
          }),
          outsideObject: Object.freeze({
            slot: "obj1",
            role: "outside-object",
            originRole: String(embedSource?.sourceRole || ""),
            prefix: objectPrefix,
            line: String(embedSource?.objectTransfer?.objectLine || "mainline").trim(),
            case: String(embedSource?.objectTransfer?.objectCase || "objective").trim()
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "compound-verbstem",
            stem: targetStem,
            objectPrefix
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          valency: String(matrix.matrixValency || "").trim(),
          grammarSource: "Andrews 39.9"
        }),
        objectTransferFrame: embedSource?.objectTransfer && typeof embedSource.objectTransfer === "object" ? Object.freeze({
          ...embedSource.objectTransfer
        }) : null,
        targetFrame: Object.freeze({
          kind: "patientivo-characteristic-property-target-frame",
          unit: "CNV",
          targetUnit: "CNV",
          stem: targetStem,
          compoundVerbInput: targetInput,
          targetInput,
          displayInput: targetInput,
          objectPrefix,
          sourceState: String(embedSource?.sourceState || ""),
          omittedSuffix
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildPatientivoCharacteristicPropertyEmbedOperationFrame({
      embedSource = null,
      matrixSpec = null,
      sourceContinuationFrame = null,
      targetContinuationFrame = null
    } = {}) {
      const sourcePayload = getTypedCharacteristicPropertyEmbedSourcePayload(sourceContinuationFrame, {
        possessorPrefix: embedSource?.possessorPrefix || ""
      });
      if (!sourcePayload) {
        return null;
      }
      const sourceRoot = String(sourcePayload?.embedSource?.incorporatedRoot || embedSource?.incorporatedRoot || "").trim();
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const targetStem = String(targetFrame.stem || "").trim();
      const targetInput = String(targetFrame.compoundVerbInput || targetFrame.targetInput || "").trim();
      if (!sourceRoot || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      if (targetStem !== `${sourceRoot}${matrixRoot}`) {
        return null;
      }
      const objectPrefix = String(embedSource?.objectPrefix || "").trim();
      return Object.freeze({
        kind: "andrews-patientivo-characteristic-property-embed-operation-frame",
        version: 1,
        grammarSource: "Andrews 39.9",
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "patientivo-characteristic-property-nounstem-as-incorporated-object",
          operationFamily: "patientivo-characteristic-property-embed",
          sourceUnit: "CNN",
          targetUnit: "CNV",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "patientivo-characteristic-property-embed-source-frame",
          role: "incorporated-object",
          root: sourceRoot,
          sourceState: String(embedSource?.sourceState || ""),
          sourceRole: String(embedSource?.sourceRole || ""),
          characteristicStem: String(sourcePayload?.characteristicStem || ""),
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourcePayload?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourcePayload?.formulaRealizationRecord?.id || ""),
          omittedSuffix: String(embedSource?.omittedSuffix || ""),
          possessorPrefix: String(embedSource?.possessorPrefix || ""),
          source: "generated-characteristic-property-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "patientivo-characteristic-property-matrix-frame",
          role: "compound-matrix",
          type: "verbal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          valency: String(matrix.matrixValency || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "patientivo-characteristic-property-target-frame",
          unit: "CNV",
          stem: targetStem,
          objectPrefix,
          displayInput: targetInput,
          compoundVerbInput: targetInput,
          targetInput
        }),
        objectTransferFrame: embedSource?.objectTransfer && typeof embedSource.objectTransfer === "object" ? Object.freeze({
          ...embedSource.objectTransfer
        }) : null,
        routeContract: Object.freeze({
          routeFamily: "patientivo-characteristic-property-embed",
          routeStage: "typed-operation-frame",
          grammarSource: "Andrews 39.9",
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          incorporatedObject: Object.freeze({
            slot: "compound-embed",
            role: "embedded-characteristic-property-root",
            root: sourceRoot
          }),
          compoundMatrix: Object.freeze({
            slot: "compound-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            valency: String(matrix.matrixValency || "")
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "compound-verbstem",
            stem: targetStem
          })
        })
      });
    }
    function isPatientivoCharacteristicPropertyEmbedOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-patientivo-characteristic-property-embed-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildPatientivoCharacteristicPropertyEmbedGenerationRequestFromOperationFrame(operationFrame = null, {
      subjectPrefix = "",
      subjectSuffix = "",
      tense = "presente"
    } = {}) {
      if (!isPatientivoCharacteristicPropertyEmbedOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["patientivo-characteristic-property-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const objectPrefix = String(operationFrame.targetFrame.objectPrefix || "").trim();
      return {
        supported: true,
        diagnostics: [],
        request: {
          posicionesFormula: {
            pers1: String(subjectPrefix || ""),
            obj1: objectPrefix,
            tronco: targetStem,
            pers2: String(subjectSuffix || ""),
            num2: String(subjectSuffix || ""),
            poseedor: "",
            tiempo: String(tense || "presente")
          },
          options: {
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: "verbo",
              combinedMode: "active",
              derivationMode: "active",
              voiceMode: "active",
              typedCompoundOperationFrame: operationFrame
            }
          }
        }
      };
    }
    function resolvePatientivoCharacteristicPropertyFormationFrame({
      embedSource = null,
      matrixSpec = null,
      characteristicSurface = "",
      sourceSurface = "",
      compoundVerbInput = "",
      operationFrame = null
    } = {}) {
      const sourceState = String(embedSource?.sourceState || "").trim();
      const omittedSuffix = String(embedSource?.omittedSuffix || "").trim();
      const objectPrefix = String(embedSource?.objectPrefix || "").trim();
      return {
        kind: "patientivo-characteristic-property-formation-frame",
        version: 1,
        grammarSource: "Andrews 39.9",
        sourceState,
        sourceSurface: String(sourceSurface || "").trim(),
        characteristicSurface: String(characteristicSurface || "").trim(),
        omittedMatrix: {
          classical: "(-yo)-tl",
          nawat: omittedSuffix,
          omissionScope: "matrix-only",
          leavesEmbedMeaning: true
        },
        incorporated: {
          role: "incorporated-object",
          root: String(embedSource?.incorporatedRoot || "").trim(),
          source: "generated-characteristic-property-nounstem",
          insideVerbStem: true
        },
        outsideObject: {
          role: objectPrefix ? "matrix-object" : "",
          originRole: sourceState === "possessive" ? "possessor" : "matrix-default-object",
          originPrefix: String(embedSource?.possessorPrefix || "").trim(),
          prefix: objectPrefix,
          line: String(embedSource?.objectTransfer?.objectLine || "mainline").trim(),
          case: String(embedSource?.objectTransfer?.objectCase || "objective").trim()
        },
        matrix: {
          id: String(matrixSpec?.id || "").trim(),
          root: matrixSpec?.supported ? matrixSpec.nawatRoot : "",
          classicalMatrix: String(matrixSpec?.classicalMatrix || ""),
          valency: String(matrixSpec?.matrixValency || "")
        },
        valencePolicy: {
          hasObjectInsideVerbStem: Boolean(embedSource?.incorporatedRoot),
          hasObjectOutsideVerbStem: Boolean(objectPrefix),
          possessorBecomesOutsideObject: sourceState === "possessive" && Boolean(objectPrefix),
          doesNotPreserveYoMatrix: true
        },
        verbInput: String(compoundVerbInput || "").trim(),
        targetStem: String(operationFrame?.targetFrame?.stem || ""),
        operationFrameKind: String(operationFrame?.kind || ""),
        displayInputIsNotAuthority: operationFrame?.operationFrame?.displayInputIsNotAuthority === true
      };
    }
    function buildActiveActionCompoundEmbedVerbInput({
      actionNominalSurface = "",
      matrixRoot = DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT
    } = {}) {
      const normalizedActionNominalSurface = String(actionNominalSurface || "").trim();
      const matrixSpec = resolveActiveActionCompoundEmbedMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedActionNominalSurface || !normalizedMatrixRoot) {
        return "";
      }
      const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
      return `${transitiveMarker}(${normalizedActionNominalSurface}/${normalizedMatrixRoot})`;
    }
    function buildActiveActionCompoundEmbedOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null
    } = {}) {
      const sourceSurface = getTypedDerivationContinuationFrameSurface(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      if (!sourceSurface || !matrixRoot) {
        return null;
      }
      const targetStem = `${sourceSurface}${matrixRoot}`;
      return Object.freeze({
        kind: "andrews-active-action-compound-embed-operation-frame",
        version: 1,
        grammarSource: "Andrews 37.5.4",
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "active-action-nounstem-as-compound-embed",
          operationFamily: "active-action-compound-embed",
          sourceUnit: "CNN",
          targetUnit: "CNV",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "active-action-compound-embed-source-frame",
          role: "compound-embed",
          root: sourceSurface,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourceContinuationFrame?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourceContinuationFrame?.formulaRealizationRecord?.id || ""),
          source: "generated-active-action-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "active-action-compound-embed-matrix-frame",
          role: "compound-matrix",
          type: "verbal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          valency: String(matrix.matrixValency || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "active-action-compound-embed-target-frame",
          unit: "CNV",
          stem: targetStem,
          objectPrefix: matrix.matrixValency === "transitive" ? "ki" : "",
          displayInput: String(targetContinuationFrame?.targetInput || "")
        }),
        routeContract: Object.freeze({
          routeFamily: "active-action-compound-embed",
          routeStage: "typed-operation-frame",
          grammarSource: "Andrews 37.5.4",
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          compoundEmbed: Object.freeze({
            slot: "compound-embed",
            role: "embedded-active-action-nounstem",
            root: sourceSurface
          }),
          compoundMatrix: Object.freeze({
            slot: "compound-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            valency: String(matrix.matrixValency || "")
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "compound-verbstem",
            stem: targetStem
          })
        })
      });
    }
    function isActiveActionCompoundEmbedOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-active-action-compound-embed-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildActiveActionCompoundEmbedGenerationRequestFromOperationFrame(operationFrame = null, {
      subjectPrefix = "",
      subjectSuffix = "",
      tense = "presente"
    } = {}) {
      if (!isActiveActionCompoundEmbedOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["active-action-compound-embed-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const objectPrefix = String(operationFrame.targetFrame.objectPrefix || "").trim();
      return {
        supported: true,
        diagnostics: [],
        request: {
          posicionesFormula: {
            pers1: String(subjectPrefix || ""),
            obj1: objectPrefix,
            tronco: targetStem,
            pers2: String(subjectSuffix || ""),
            num2: String(subjectSuffix || ""),
            poseedor: "",
            tiempo: String(tense || "presente")
          },
          options: {
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: "verbo",
              combinedMode: "active",
              derivationMode: "active",
              voiceMode: "active",
              typedCompoundOperationFrame: operationFrame
            }
          }
        }
      };
    }
    function buildActiveActionNominalCompoundStem({
      actionNominalSurface = "",
      matrixRoot = DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT
    } = {}) {
      const normalizedActionNominalSurface = String(actionNominalSurface || "").trim();
      const matrixSpec = resolveActiveActionNominalCompoundMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedActionNominalSurface || !normalizedMatrixRoot) {
        return "";
      }
      return `${normalizedActionNominalSurface}${normalizedMatrixRoot}`;
    }
    function buildActiveActionNominalCompoundTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      compoundStem = "",
      ordinaryNncInput = ""
    } = {}) {
      const sourceSurface = getTypedDerivationContinuationFrameSurface(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const targetStem = String(compoundStem || "").trim();
      const targetInput = String(ordinaryNncInput || "").trim();
      const nounClass = String(matrix.nounClass || "zero").trim() || "zero";
      const animacy = String(matrix.animacy || "inanimate").trim() || "inanimate";
      if (!sourceSurface || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "active-action-nounstem-as-nominal-compound",
        operationFamily: "active-action-nominal-compound",
        andrewsSection: matrix.grammarSource || "Andrews 37.5.4",
        sourceUnit: "CNN",
        targetUnit: "NNC",
        route: "CNN active-action nounstem -> NNC nominal compound stem",
        embedRole: "nominal-compound-embed",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "NNC",
        targetUnit: "NNC",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "active-action-nominal-compound-target-frame",
          generationAllowed: true,
          grammarSource: matrix.grammarSource || "Andrews 37.5.4",
          outputKind: "active-action-nominal-compound-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "nominal-compound-embed",
            role: "embedded-active-action-nounstem",
            token: sourceSurface,
            root: sourceSurface,
            sourceFrameId: String(sourceContinuationFrame.selectedVariant?.variantId || sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
            sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "nominal-matrix-root",
            role: "nominal-compound-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            nounClass,
            animacy
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ordinary-nnc-predicate-stem",
            stem: targetStem,
            nounClass,
            animacy
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          nounClass,
          animacy,
          grammarSource: String(matrix.grammarSource || "Andrews 37.5.4").trim()
        }),
        targetFrame: Object.freeze({
          kind: "active-action-nominal-compound-target-frame",
          unit: "NNC",
          targetUnit: "NNC",
          stem: targetStem,
          compoundStem: targetStem,
          nounClass,
          animacy,
          ordinaryNncInput: targetInput,
          targetInput,
          displayInput: targetInput
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildActiveActionNominalCompoundOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null
    } = {}) {
      const sourceSurface = getTypedDerivationContinuationFrameSurface(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const targetStem = String(targetFrame.stem || targetFrame.compoundStem || "").trim();
      const targetInput = String(targetFrame.ordinaryNncInput || targetFrame.targetInput || "").trim();
      const nounClass = String(targetFrame.nounClass || matrix.nounClass || "zero").trim() || "zero";
      const animacy = String(targetFrame.animacy || matrix.animacy || "inanimate").trim() || "inanimate";
      if (!sourceSurface || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      const expectedStem = `${sourceSurface}${matrixRoot}`;
      if (targetStem !== expectedStem) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-active-action-nominal-compound-operation-frame",
        version: 1,
        grammarSource: "Andrews 37.5.4",
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "active-action-nounstem-as-nominal-compound",
          operationFamily: "active-action-nominal-compound",
          sourceUnit: "CNN",
          targetUnit: "NNC",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "active-action-nominal-compound-source-frame",
          role: "nominal-compound-embed",
          root: sourceSurface,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourceContinuationFrame?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourceContinuationFrame?.formulaRealizationRecord?.id || ""),
          source: "generated-active-action-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "active-action-nominal-compound-matrix-frame",
          role: "nominal-compound-matrix",
          type: "nominal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          nounClass: String(matrix.nounClass || ""),
          animacy: String(matrix.animacy || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "active-action-nominal-compound-target-frame",
          unit: "NNC",
          stem: targetStem,
          nounClass,
          animacy,
          ordinaryNncInput: targetInput,
          displayInput: targetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "active-action-nominal-compound",
          routeStage: "typed-operation-frame",
          grammarSource: "Andrews 37.5.4",
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          compoundEmbed: Object.freeze({
            slot: "nominal-compound-embed",
            role: "embedded-active-action-nounstem",
            root: sourceSurface
          }),
          compoundMatrix: Object.freeze({
            slot: "nominal-matrix-root",
            role: "nominal-compound-matrix",
            root: matrixRoot,
            nounClass: String(matrix.nounClass || ""),
            animacy: String(matrix.animacy || "")
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ordinary-nnc-predicate-stem",
            stem: targetStem
          })
        })
      });
    }
    function isActiveActionNominalCompoundOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-active-action-nominal-compound-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildActiveActionNominalCompoundOrdinaryNncRequestFromOperationFrame(operationFrame = null) {
      if (!isActiveActionNominalCompoundOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["active-action-nominal-compound-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const nounClass = String(operationFrame.targetFrame.nounClass || "zero").trim() || "zero";
      const animacy = String(operationFrame.targetFrame.animacy || "inanimate").trim() || "inanimate";
      const request = buildNominalCompoundOrdinaryNncRequest({
        compoundStem: targetStem,
        nounClass,
        animacy,
        operationFrame,
        sourceFrame: operationFrame.sourceFrame,
        targetFrame: operationFrame.targetFrame,
        routeStage: "active-action-nominal-compound-continuation"
      });
      return {
        supported: Boolean(request),
        diagnostics: request ? [] : ["active-action-nominal-compound-missing-nnc-request"],
        request
      };
    }
    function buildCustomaryAgentiveNominalCompoundTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      compoundStem = "",
      ordinaryNncInput = ""
    } = {}) {
      const sourceStem = getTypedDerivationContinuationFramePredicateStem(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const targetStem = String(compoundStem || "").trim();
      const targetInput = String(ordinaryNncInput || "").trim();
      const nounClass = String(matrix.nounClass || "zero").trim() || "zero";
      const animacy = String(matrix.animacy || "inanimate").trim() || "inanimate";
      if (!sourceStem || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "customary-agentive-nounstem-as-nominal-compound",
        operationFamily: "customary-agentive-nominal-compound",
        andrewsSection: matrix.grammarSource || "Andrews 36.3",
        sourceUnit: "CNN",
        targetUnit: "NNC",
        route: "CNN fully nominalized customary-agentive nounstem -> NNC nominal compound stem",
        embedRole: "nominal-compound-embed",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "NNC",
        targetUnit: "NNC",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "customary-agentive-nominal-compound-target-frame",
          generationAllowed: true,
          grammarSource: matrix.grammarSource || "Andrews 36.3",
          outputKind: "customary-agentive-nominal-compound-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "nominal-compound-embed",
            role: "embedded-customary-agentive-nounstem",
            token: sourceStem,
            root: sourceStem,
            sourceFrameId: String(sourceContinuationFrame.selectedVariant?.variantId || sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
            sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "nominal-matrix-root",
            role: "nominal-compound-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            nounClass,
            animacy
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ordinary-nnc-predicate-stem",
            stem: targetStem,
            nounClass,
            animacy
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          nounClass,
          animacy,
          grammarSource: String(matrix.grammarSource || "Andrews 36.3").trim()
        }),
        targetFrame: Object.freeze({
          kind: "customary-agentive-nominal-compound-target-frame",
          unit: "NNC",
          targetUnit: "NNC",
          stem: targetStem,
          compoundStem: targetStem,
          nounClass,
          animacy,
          ordinaryNncInput: targetInput,
          targetInput,
          displayInput: targetInput
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildCustomaryAgentiveNominalCompoundOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null
    } = {}) {
      const sourceStem = getTypedDerivationContinuationFramePredicateStem(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const targetStem = String(targetFrame.stem || targetFrame.compoundStem || "").trim();
      const targetInput = String(targetFrame.ordinaryNncInput || targetFrame.targetInput || "").trim();
      const nounClass = String(targetFrame.nounClass || matrix.nounClass || "zero").trim() || "zero";
      const animacy = String(targetFrame.animacy || matrix.animacy || "inanimate").trim() || "inanimate";
      if (!sourceStem || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      const expectedStem = `${sourceStem}${matrixRoot}`;
      if (targetStem !== expectedStem) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-customary-agentive-nominal-compound-operation-frame",
        version: 1,
        grammarSource: "Andrews 36.3",
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "customary-agentive-nounstem-as-nominal-compound",
          operationFamily: "customary-agentive-nominal-compound",
          sourceUnit: "CNN",
          targetUnit: "NNC",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "customary-agentive-nominal-compound-source-frame",
          role: "nominal-compound-embed",
          root: sourceStem,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourceContinuationFrame?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourceContinuationFrame?.formulaRealizationRecord?.id || ""),
          source: "generated-customary-agentive-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "customary-agentive-nominal-compound-matrix-frame",
          role: "nominal-compound-matrix",
          type: "nominal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          nounClass: String(matrix.nounClass || ""),
          animacy: String(matrix.animacy || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "customary-agentive-nominal-compound-target-frame",
          unit: "NNC",
          stem: targetStem,
          nounClass,
          animacy,
          ordinaryNncInput: targetInput,
          displayInput: targetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "customary-agentive-nominal-compound",
          routeStage: "typed-operation-frame",
          grammarSource: "Andrews 36.3",
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          compoundEmbed: Object.freeze({
            slot: "nominal-compound-embed",
            role: "embedded-customary-agentive-nounstem",
            root: sourceStem
          }),
          compoundMatrix: Object.freeze({
            slot: "nominal-matrix-root",
            role: "nominal-compound-matrix",
            root: matrixRoot,
            nounClass: String(matrix.nounClass || ""),
            animacy: String(matrix.animacy || "")
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ordinary-nnc-predicate-stem",
            stem: targetStem
          })
        })
      });
    }
    function isCustomaryAgentiveNominalCompoundOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-customary-agentive-nominal-compound-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildCustomaryAgentiveNominalCompoundOrdinaryNncRequestFromOperationFrame(operationFrame = null) {
      if (!isCustomaryAgentiveNominalCompoundOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["customary-agentive-nominal-compound-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const nounClass = String(operationFrame.targetFrame.nounClass || "zero").trim() || "zero";
      const animacy = String(operationFrame.targetFrame.animacy || "inanimate").trim() || "inanimate";
      const request = buildNominalCompoundOrdinaryNncRequest({
        compoundStem: targetStem,
        nounClass,
        animacy,
        operationFrame,
        sourceFrame: operationFrame.sourceFrame,
        targetFrame: operationFrame.targetFrame,
        routeStage: "customary-agentive-nominal-compound-continuation"
      });
      return {
        supported: Boolean(request),
        diagnostics: request ? [] : ["customary-agentive-nominal-compound-missing-nnc-request"],
        request
      };
    }
    function buildPreteritAgentiveCompoundEmbedVerbInput({
      preteritAgentiveStem = "",
      matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT
    } = {}) {
      const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
      const matrixSpec = resolvePreteritAgentiveCompoundEmbedMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot) {
        return "";
      }
      const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
      return `${transitiveMarker}(${normalizedPreteritAgentiveStem}/${normalizedMatrixRoot})`;
    }
    function buildPreteritAgentiveCompoundEmbedTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      compoundVerbInput = ""
    } = {}) {
      const sourceStem = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const objectPrefix = matrix.matrixValency === "transitive" ? String(matrix.objectPrefix || "ki").trim() || "ki" : "";
      const targetStem = sourceStem && matrixRoot ? `${sourceStem}${matrixRoot}` : "";
      const targetInput = String(compoundVerbInput || "").trim();
      if (!sourceStem || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "preterit-agentive-nounstem-as-compound-embed",
        operationFamily: "preterit-agentive-compound-embed",
        andrewsSection: matrix.grammarSource || "Andrews 35.7",
        sourceUnit: "CNN",
        targetUnit: "CNV",
        route: "CNN preterit-agentive general-use nounstem -> CNV compound verbstem",
        embedRole: "compound-embed",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "CNV",
        targetUnit: "CNV",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "preterit-agentive-compound-embed-target-frame",
          generationAllowed: true,
          grammarSource: matrix.grammarSource || "Andrews 35.7",
          outputKind: "preterit-agentive-compound-embed-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "compound-embed",
            role: "embedded-preterit-agentive-general-use-nounstem",
            token: sourceStem,
            root: sourceStem,
            sourceFrameId: String(sourceContinuationFrame.selectedVariant?.variantId || sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
            sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "matrix-root",
            role: "compound-verbal-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            valency: String(matrix.matrixValency || "").trim()
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "compound-verbstem",
            stem: targetStem,
            objectPrefix
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          valence: String(matrix.matrixValency || matrix.valency || "").trim(),
          grammarSource: String(matrix.grammarSource || "Andrews 35.7").trim(),
          objectPrefix
        }),
        targetFrame: Object.freeze({
          kind: "preterit-agentive-compound-embed-target-frame",
          unit: "CNV",
          targetUnit: "CNV",
          stem: targetStem,
          compoundVerbInput: targetInput,
          targetInput,
          displayInput: targetInput,
          objectPrefix
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildPreteritAgentiveCompoundEmbedOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null
    } = {}) {
      const sourceRoot = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      if (!sourceRoot || !matrixRoot) {
        return null;
      }
      const targetStem = `${sourceRoot}${matrixRoot}`;
      const objectPrefix = matrix.matrixValency === "transitive" ? String(matrix.objectPrefix || "ki").trim() || "ki" : "";
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const frameTargetStem = String(targetFrame.stem || "").trim();
      const frameTargetInput = String(targetFrame.compoundVerbInput || targetFrame.targetInput || "").trim();
      const frameObjectPrefix = String(targetFrame.objectPrefix || "").trim();
      const expectedDisplayInput = buildPreteritAgentiveCompoundEmbedVerbInput({
        preteritAgentiveStem: sourceRoot,
        matrixRoot
      });
      if (!frameTargetStem || frameTargetStem !== targetStem || frameTargetInput !== expectedDisplayInput || frameObjectPrefix !== objectPrefix) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-preterit-agentive-compound-embed-operation-frame",
        version: 1,
        grammarSource: matrix.grammarSource || "Andrews 35.7",
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "preterit-agentive-nounstem-as-compound-embed",
          operationFamily: "preterit-agentive-compound-embed",
          sourceUnit: "CNN",
          targetUnit: "CNV",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "preterit-agentive-compound-embed-source-frame",
          role: "compound-embed",
          root: sourceRoot,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourceContinuationFrame?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourceContinuationFrame?.formulaRealizationRecord?.id || ""),
          source: "generated-preterit-agentive-general-use-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "preterit-agentive-compound-embed-matrix-frame",
          role: "compound-matrix",
          type: "verbal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          valency: String(matrix.matrixValency || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "preterit-agentive-compound-embed-target-frame",
          unit: "CNV",
          stem: targetStem,
          objectPrefix,
          compoundVerbInput: frameTargetInput,
          displayInput: frameTargetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "preterit-agentive-compound-embed",
          routeStage: "typed-operation-frame",
          grammarSource: matrix.grammarSource || "Andrews 35.7",
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          compoundEmbed: Object.freeze({
            slot: "compound-embed",
            role: "embedded-preterit-agentive-nounstem",
            root: sourceRoot
          }),
          compoundMatrix: Object.freeze({
            slot: "compound-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            valency: String(matrix.matrixValency || "")
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "compound-verbstem",
            stem: targetStem
          })
        })
      });
    }
    function isPreteritAgentiveCompoundEmbedOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-preterit-agentive-compound-embed-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildPreteritAgentiveCompoundEmbedGenerationRequestFromOperationFrame(operationFrame = null, {
      subjectPrefix = "",
      subjectSuffix = "",
      tense = "presente"
    } = {}) {
      if (!isPreteritAgentiveCompoundEmbedOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["preterit-agentive-compound-embed-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const objectPrefix = String(operationFrame.targetFrame.objectPrefix || "").trim();
      return {
        supported: true,
        diagnostics: [],
        request: {
          posicionesFormula: {
            pers1: String(subjectPrefix || ""),
            obj1: objectPrefix,
            tronco: targetStem,
            pers2: String(subjectSuffix || ""),
            num2: String(subjectSuffix || ""),
            poseedor: "",
            tiempo: String(tense || "presente")
          },
          options: {
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: "verbo",
              combinedMode: "active",
              derivationMode: "active",
              voiceMode: "active",
              typedCompoundOperationFrame: operationFrame
            }
          }
        }
      };
    }
    function buildPreteritAgentiveNominalCompoundStem({
      preteritAgentiveStem = "",
      matrixRoot = DEFAULT_PRETERIT_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT
    } = {}) {
      const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
      const matrixSpec = resolvePreteritAgentiveNominalCompoundMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot) {
        return "";
      }
      return `${normalizedPreteritAgentiveStem}${normalizedMatrixRoot}`;
    }
    function buildPreteritAgentiveNominalCompoundTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      compoundStem = "",
      ordinaryNncInput = ""
    } = {}) {
      const sourceStem = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const targetStem = String(compoundStem || "").trim();
      const targetInput = String(ordinaryNncInput || "").trim();
      const nounClass = String(matrix.nounClass || "zero").trim() || "zero";
      const animacy = String(matrix.animacy || "inanimate").trim() || "inanimate";
      if (!sourceStem || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "preterit-agentive-nounstem-as-nominal-compound",
        operationFamily: "preterit-agentive-nominal-compound",
        andrewsSection: matrix.grammarSource || "Andrews 35.7",
        sourceUnit: "CNN",
        targetUnit: "NNC",
        route: "CNN preterit-agentive general-use nounstem -> NNC nominal compound stem",
        embedRole: "nominal-compound-embed",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "NNC",
        targetUnit: "NNC",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "preterit-agentive-nominal-compound-target-frame",
          generationAllowed: true,
          grammarSource: matrix.grammarSource || "Andrews 35.7",
          outputKind: "preterit-agentive-nominal-compound-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "nominal-compound-embed",
            role: "embedded-preterit-agentive-general-use-nounstem",
            token: sourceStem,
            root: sourceStem,
            sourceFrameId: String(sourceContinuationFrame.selectedVariant?.variantId || sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
            sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "nominal-matrix-root",
            role: "nominal-compound-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            nounClass,
            animacy
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ordinary-nnc-predicate-stem",
            stem: targetStem,
            nounClass,
            animacy
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          nounClass,
          animacy,
          grammarSource: String(matrix.grammarSource || "Andrews 35.7").trim()
        }),
        targetFrame: Object.freeze({
          kind: "preterit-agentive-nominal-compound-target-frame",
          unit: "NNC",
          targetUnit: "NNC",
          stem: targetStem,
          compoundStem: targetStem,
          nounClass,
          animacy,
          ordinaryNncInput: targetInput,
          targetInput,
          displayInput: targetInput
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildPreteritAgentiveNominalCompoundOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null
    } = {}) {
      const sourceStem = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const targetStem = String(targetFrame.stem || targetFrame.compoundStem || "").trim();
      const targetInput = String(targetFrame.ordinaryNncInput || targetFrame.targetInput || "").trim();
      const nounClass = String(targetFrame.nounClass || matrix.nounClass || "zero").trim() || "zero";
      const animacy = String(targetFrame.animacy || matrix.animacy || "inanimate").trim() || "inanimate";
      if (!sourceStem || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      const expectedStem = `${sourceStem}${matrixRoot}`;
      if (targetStem !== expectedStem) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-preterit-agentive-nominal-compound-operation-frame",
        version: 1,
        grammarSource: "Andrews 35.7",
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "preterit-agentive-nounstem-as-nominal-compound",
          operationFamily: "preterit-agentive-nominal-compound",
          sourceUnit: "CNN",
          targetUnit: "NNC",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "preterit-agentive-nominal-compound-source-frame",
          role: "nominal-compound-embed",
          root: sourceStem,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourceContinuationFrame?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourceContinuationFrame?.formulaRealizationRecord?.id || ""),
          source: "generated-preterit-agentive-general-use-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "preterit-agentive-nominal-compound-matrix-frame",
          role: "nominal-compound-matrix",
          type: "nominal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          nounClass: String(matrix.nounClass || ""),
          animacy: String(matrix.animacy || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "preterit-agentive-nominal-compound-target-frame",
          unit: "NNC",
          stem: targetStem,
          nounClass,
          animacy,
          ordinaryNncInput: targetInput,
          displayInput: targetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "preterit-agentive-nominal-compound",
          routeStage: "typed-operation-frame",
          grammarSource: "Andrews 35.7",
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          compoundEmbed: Object.freeze({
            slot: "nominal-compound-embed",
            role: "embedded-preterit-agentive-general-use-nounstem",
            root: sourceStem
          }),
          compoundMatrix: Object.freeze({
            slot: "nominal-matrix-root",
            role: "nominal-compound-matrix",
            root: matrixRoot,
            nounClass: String(matrix.nounClass || ""),
            animacy: String(matrix.animacy || "")
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ordinary-nnc-predicate-stem",
            stem: targetStem
          })
        })
      });
    }
    function isPreteritAgentiveNominalCompoundOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-preterit-agentive-nominal-compound-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildPreteritAgentiveNominalCompoundOrdinaryNncRequestFromOperationFrame(operationFrame = null) {
      if (!isPreteritAgentiveNominalCompoundOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["preterit-agentive-nominal-compound-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const nounClass = String(operationFrame.targetFrame.nounClass || "zero").trim() || "zero";
      const animacy = String(operationFrame.targetFrame.animacy || "inanimate").trim() || "inanimate";
      const request = buildNominalCompoundOrdinaryNncRequest({
        compoundStem: targetStem,
        nounClass,
        animacy,
        operationFrame,
        sourceFrame: operationFrame.sourceFrame,
        targetFrame: operationFrame.targetFrame,
        routeStage: "preterit-agentive-nominal-compound-continuation"
      });
      return {
        supported: Boolean(request),
        diagnostics: request ? [] : ["preterit-agentive-nominal-compound-missing-nnc-request"],
        request
      };
    }
    function buildCustomaryAgentiveNominalCompoundStem({
      customaryAgentiveStem = "",
      matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT
    } = {}) {
      const normalizedCustomaryAgentiveStem = String(customaryAgentiveStem || "").trim();
      const matrixSpec = resolveCustomaryAgentiveNominalCompoundMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedCustomaryAgentiveStem || !normalizedMatrixRoot) {
        return "";
      }
      return `${normalizedCustomaryAgentiveStem}${normalizedMatrixRoot}`;
    }
    function buildCustomaryAgentiveCompoundEmbedVerbInput({
      customaryAgentiveStem = "",
      matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT
    } = {}) {
      const normalizedCustomaryAgentiveStem = String(customaryAgentiveStem || "").trim();
      const matrixSpec = resolveCustomaryAgentiveCompoundEmbedMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedCustomaryAgentiveStem || !normalizedMatrixRoot) {
        return "";
      }
      const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
      return `${transitiveMarker}(${normalizedCustomaryAgentiveStem}/${normalizedMatrixRoot})`;
    }
    function buildCustomaryAgentiveCompoundEmbedTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      objectPrefix = "",
      compoundVerbInput = ""
    } = {}) {
      const sourceStem = getTypedDerivationContinuationFramePredicateStem(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const resolvedObjectPrefix = matrix.matrixValency === "transitive" ? String(objectPrefix || matrix.objectPrefix || "ki").trim() || "ki" : "";
      const targetStem = sourceStem && matrixRoot ? `${sourceStem}${matrixRoot}` : "";
      const targetInput = String(compoundVerbInput || "").trim();
      if (!sourceStem || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "customary-agentive-nounstem-as-compound-embed",
        operationFamily: "customary-agentive-compound-embed",
        andrewsSection: matrix.grammarSource || "Andrews 36.3",
        sourceUnit: "CNN",
        targetUnit: "CNV",
        route: "CNN fully nominalized customary-agentive nounstem -> CNV compound verbstem",
        embedRole: "compound-embed",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "CNV",
        targetUnit: "CNV",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "customary-agentive-compound-embed-target-frame",
          generationAllowed: true,
          grammarSource: matrix.grammarSource || "Andrews 36.3",
          outputKind: "customary-agentive-compound-embed-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "compound-embed",
            role: "embedded-customary-agentive-nounstem",
            token: sourceStem,
            root: sourceStem,
            sourceFrameId: String(sourceContinuationFrame.selectedVariant?.variantId || sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
            sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "matrix-root",
            role: "compound-verbal-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            valency: String(matrix.matrixValency || "").trim()
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "compound-verbstem",
            stem: targetStem,
            objectPrefix: resolvedObjectPrefix
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          valence: String(matrix.matrixValency || matrix.valency || "").trim(),
          grammarSource: String(matrix.grammarSource || "Andrews 36.3").trim(),
          objectPrefix: resolvedObjectPrefix
        }),
        targetFrame: Object.freeze({
          kind: "customary-agentive-compound-embed-target-frame",
          unit: "CNV",
          targetUnit: "CNV",
          stem: targetStem,
          compoundVerbInput: targetInput,
          targetInput,
          displayInput: targetInput,
          objectPrefix: resolvedObjectPrefix
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildCustomaryAgentiveCompoundEmbedOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null,
      objectPrefix = ""
    } = {}) {
      const sourceRoot = getTypedDerivationContinuationFramePredicateStem(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      if (!sourceRoot || !matrixRoot) {
        return null;
      }
      const targetStem = `${sourceRoot}${matrixRoot}`;
      const resolvedObjectPrefix = matrix.matrixValency === "transitive" ? String(objectPrefix || matrix.objectPrefix || "ki").trim() || "ki" : "";
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const frameTargetStem = String(targetFrame.stem || "").trim();
      const frameTargetInput = String(targetFrame.compoundVerbInput || targetFrame.targetInput || "").trim();
      const frameObjectPrefix = String(targetFrame.objectPrefix || "").trim();
      const expectedDisplayInput = buildCustomaryAgentiveCompoundEmbedVerbInput({
        customaryAgentiveStem: sourceRoot,
        matrixRoot
      });
      if (!frameTargetStem || frameTargetStem !== targetStem || frameTargetInput !== expectedDisplayInput || frameObjectPrefix !== resolvedObjectPrefix) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-customary-agentive-compound-embed-operation-frame",
        version: 1,
        grammarSource: matrix.grammarSource || "Andrews 36.3",
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "customary-agentive-nounstem-as-compound-embed",
          operationFamily: "customary-agentive-compound-embed",
          sourceUnit: "CNN",
          targetUnit: "CNV",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "customary-agentive-compound-embed-source-frame",
          role: "compound-embed",
          root: sourceRoot,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourceContinuationFrame?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourceContinuationFrame?.formulaRealizationRecord?.id || ""),
          source: "generated-customary-agentive-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "customary-agentive-compound-embed-matrix-frame",
          role: "compound-matrix",
          type: "verbal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          valency: String(matrix.matrixValency || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "customary-agentive-compound-embed-target-frame",
          unit: "CNV",
          stem: targetStem,
          objectPrefix: resolvedObjectPrefix,
          compoundVerbInput: frameTargetInput,
          displayInput: frameTargetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "customary-agentive-compound-embed",
          routeStage: "typed-operation-frame",
          grammarSource: matrix.grammarSource || "Andrews 36.3",
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          compoundEmbed: Object.freeze({
            slot: "compound-embed",
            role: "embedded-customary-agentive-nounstem",
            root: sourceRoot
          }),
          compoundMatrix: Object.freeze({
            slot: "compound-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            valency: String(matrix.matrixValency || "")
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "compound-verbstem",
            stem: targetStem
          })
        })
      });
    }
    function isCustomaryAgentiveCompoundEmbedOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-customary-agentive-compound-embed-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildCustomaryAgentiveCompoundEmbedGenerationRequestFromOperationFrame(operationFrame = null, {
      subjectPrefix = "",
      subjectSuffix = "",
      tense = "presente"
    } = {}) {
      if (!isCustomaryAgentiveCompoundEmbedOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["customary-agentive-compound-embed-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const objectPrefix = String(operationFrame.targetFrame.objectPrefix || "").trim();
      return {
        supported: true,
        diagnostics: [],
        request: {
          posicionesFormula: {
            pers1: String(subjectPrefix || ""),
            obj1: objectPrefix,
            tronco: targetStem,
            pers2: String(subjectSuffix || ""),
            num2: String(subjectSuffix || ""),
            poseedor: "",
            tiempo: String(tense || "presente")
          },
          options: {
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: "verbo",
              combinedMode: "active",
              derivationMode: "active",
              voiceMode: "active",
              typedCompoundOperationFrame: operationFrame
            }
          }
        }
      };
    }
    function formatPreteritAgentiveNominalCompoundOrdinaryNncInput({
      compoundStem = "",
      nounClass = ""
    } = {}) {
      return formatPatientivoNominalCompoundOrdinaryNncInput({
        compoundStem,
        nounClass
      });
    }
    function formatCustomaryAgentiveNominalCompoundOrdinaryNncInput({
      compoundStem = "",
      nounClass = ""
    } = {}) {
      return formatPatientivoNominalCompoundOrdinaryNncInput({
        compoundStem,
        nounClass
      });
    }
    function buildPreteritAgentiveOwnerhoodVerbInput({
      preteritAgentiveStem = "",
      matrixRoot = DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT
    } = {}) {
      const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
      const matrixSpec = resolvePreteritAgentiveOwnerhoodMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot) {
        return "";
      }
      return `(${normalizedPreteritAgentiveStem})-(${normalizedMatrixRoot})`;
    }
    function buildPreteritAgentiveOwnerhoodTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      ownerhoodVerbInput = ""
    } = {}) {
      const sourceStem = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const targetStem = sourceStem && matrixRoot ? `${sourceStem}${matrixRoot}` : "";
      const targetInput = String(ownerhoodVerbInput || "").trim();
      const parsedVerb = buildTypedOwnerhoodParsedVerbFrame({
        sourceRoot: sourceStem,
        matrixRoot,
        targetStem,
        operationFamily: "preterit-agentive-ownerhood"
      });
      if (!sourceStem || !matrixRoot || !targetStem || !targetInput || !parsedVerb) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "preterit-agentive-general-use-stem-as-ownerhood-embed",
        operationFamily: "preterit-agentive-ownerhood",
        andrewsSection: matrix.grammarSource || "Andrews 35.9-35.10",
        sourceUnit: "CNN",
        targetUnit: "CNV",
        route: "CNN preterit-agentive general-use nounstem -> CNV ownerhood verbstem",
        embedRole: "ownerhood-embed",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        parsedTargetFrameRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "CNV",
        targetUnit: "CNV",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "preterit-agentive-ownerhood-target-frame",
          generationAllowed: true,
          grammarSource: matrix.grammarSource || "Andrews 35.9-35.10",
          outputKind: "preterit-agentive-ownerhood-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "ownerhood-embed",
            role: "embedded-preterit-agentive-general-use-nounstem",
            token: sourceStem,
            root: sourceStem,
            sourceFrameId: String(sourceContinuationFrame.selectedVariant?.variantId || sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
            sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "ownerhood-matrix",
            role: "ownerhood-verbal-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            surfaceMatrix: String(matrix.surfaceMatrix || "").trim(),
            ownerhoodKind: String(matrix.ownerhoodKind || "").trim()
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ownerhood-verbstem",
            stem: targetStem
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          surfaceMatrix: String(matrix.surfaceMatrix || "").trim(),
          ownerhoodKind: String(matrix.ownerhoodKind || "").trim(),
          valence: String(matrix.matrixValency || matrix.valency || "").trim(),
          grammarSource: String(matrix.grammarSource || "Andrews 35.9-35.10").trim()
        }),
        targetFrame: Object.freeze({
          kind: "preterit-agentive-ownerhood-target-frame",
          unit: "CNV",
          targetUnit: "CNV",
          stem: targetStem,
          ownerhoodVerbInput: targetInput,
          targetInput,
          displayInput: targetInput,
          parsedVerb
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildTypedOwnerhoodParsedVerbFrame({
      sourceRoot = "",
      matrixRoot = "",
      targetStem = "",
      operationFamily = "ownerhood"
    } = {}) {
      const normalizedSourceRoot = String(sourceRoot || "").trim();
      const normalizedMatrixRoot = String(matrixRoot || "").trim();
      const normalizedTargetStem = String(targetStem || `${normalizedSourceRoot}${normalizedMatrixRoot}`).trim();
      if (!normalizedSourceRoot || !normalizedMatrixRoot || !normalizedTargetStem) {
        return null;
      }
      const verbSegment = `${normalizedSourceRoot}-${normalizedMatrixRoot}`;
      return Object.freeze({
        parseLanguage: "andrews-typed-operation-frame",
        sourceRawVerb: normalizedTargetStem,
        verb: normalizedTargetStem,
        analysisVerb: normalizedTargetStem,
        rawAnalysisVerb: normalizedTargetStem,
        ruleBase: normalizedMatrixRoot,
        fullRuleBase: normalizedTargetStem,
        exactBaseVerb: normalizedMatrixRoot,
        sourceBase: normalizedMatrixRoot,
        sourcePrefix: normalizedSourceRoot,
        parts: Object.freeze([normalizedSourceRoot, normalizedMatrixRoot]),
        verbSegment,
        embeddedPrefix: normalizedSourceRoot,
        hasSuffixSeparator: false,
        hasSlashMarker: false,
        hasCompoundMarker: true,
        isTaFusion: false,
        hasLeadingDash: true,
        dashCount: 1,
        hasDoubleDash: false,
        isMarkedTransitive: true,
        valenceSlotCount: 1,
        totalValenceSlotCount: 1,
        embeddedValenceCount: 0,
        hasSpecificValence: false,
        hasNonspecificValence: false,
        hasNonactiveSpecificValence: false,
        hasNonactiveNonspecificValence: false,
        directObjectToken: "",
        indirectObjectMarker: "",
        objectSegment: "",
        objectToken: "",
        boundPrefixes: Object.freeze([]),
        boundExplicitFlags: Object.freeze([]),
        lexicalBoundPrefixes: Object.freeze([normalizedSourceRoot]),
        lexicalBoundPrefix: normalizedSourceRoot,
        fusionPrefixes: Object.freeze([]),
        directionalPrefix: "",
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: "",
        directionalRuleMode: "",
        hasImpersonalTaPrefix: false,
        hasOptionalSupportiveI: false,
        optionalSupportiveLetter: "",
        hasBoundMarker: false,
        isYawi: false,
        isWeya: false,
        hasFinalYaSuffix: false,
        finalYaHost: "",
        finalYaHostKind: "",
        bareRootPlusYaBase: "",
        bareRootPlusYaBasePronounceable: "",
        rootPlusYaBase: "",
        rootPlusYaBasePronounceable: "",
        isRootPlusYa: false,
        displayVerb: normalizedTargetStem,
        displayCore: normalizedTargetStem,
        coreText: normalizedTargetStem,
        dashPrefix: "-",
        hasExternalObjectDash: true,
        semanticObjectSlotCount: 1,
        compoundAst: Object.freeze({
          version: 1,
          kind: "compound",
          operationFamily,
          matrix: Object.freeze({
            role: "matrix",
            stem: normalizedMatrixRoot,
            ruleBase: normalizedMatrixRoot
          }),
          embeds: Object.freeze([Object.freeze({
            role: "outer-lexical",
            kind: "lexical",
            value: normalizedSourceRoot,
            source: "typed-operation-frame",
            index: 0,
            explicit: false
          })]),
          source: Object.freeze({
            rawInput: normalizedTargetStem,
            displayVerb: normalizedTargetStem,
            displayCore: normalizedTargetStem,
            verb: normalizedTargetStem,
            analysisVerb: normalizedTargetStem,
            embeddedPrefix: normalizedSourceRoot,
            sourcePrefix: normalizedSourceRoot,
            sourceBase: normalizedMatrixRoot,
            verbSegment,
            parts: Object.freeze([normalizedSourceRoot, normalizedMatrixRoot])
          }),
          valency: Object.freeze({
            transitivity: "transitive",
            tokens: Object.freeze([]),
            slotCount: 1,
            hasSpecific: false,
            hasNonspecific: false,
            isMarkedTransitive: true,
            isTaFusion: false
          }),
          flags: Object.freeze({
            hasCompoundMarker: true,
            hasSlashMarker: false,
            hasSuffixSeparator: false,
            hasBoundMarker: false,
            hasImpersonalTaPrefix: false
          }),
          outerPieces: Object.freeze([Object.freeze({
            type: "lexical",
            value: normalizedSourceRoot,
            index: 0
          })]),
          corePieces: Object.freeze([]),
          lexicalPrefixes: Object.freeze([normalizedSourceRoot])
        }),
        ordinaryNncFixtureClassifications: Object.freeze([]),
        canonicalRuleBase: normalizedMatrixRoot,
        canonicalFullRuleBase: normalizedTargetStem
      });
    }
    function buildPreteritAgentiveOwnerhoodOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null
    } = {}) {
      const sourceRoot = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      if (!sourceRoot || !matrixRoot) {
        return null;
      }
      const targetStem = `${sourceRoot}${matrixRoot}`;
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const frameTargetStem = String(targetFrame.stem || "").trim();
      const frameTargetInput = String(targetFrame.ownerhoodVerbInput || targetFrame.targetInput || "").trim();
      const parsedVerb = targetFrame.parsedVerb && typeof targetFrame.parsedVerb === "object" ? targetFrame.parsedVerb : null;
      const expectedDisplayInput = buildPreteritAgentiveOwnerhoodVerbInput({
        preteritAgentiveStem: sourceRoot,
        matrixRoot
      });
      if (!frameTargetStem || frameTargetStem !== targetStem || frameTargetInput !== expectedDisplayInput || parsedVerb?.sourceRawVerb !== targetStem) {
        return null;
      }
      const grammarSource = String(matrix.grammarSource || "Andrews 35.9-35.10");
      return Object.freeze({
        kind: "andrews-preterit-agentive-ownerhood-operation-frame",
        version: 1,
        grammarSource,
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "preterit-agentive-general-use-stem-as-ownerhood-embed",
          operationFamily: "preterit-agentive-ownerhood",
          sourceUnit: "CNN",
          targetUnit: "CNV",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          parsedTargetFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "preterit-agentive-ownerhood-source-frame",
          role: "incorporated-ownerhood-embed",
          root: sourceRoot,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourceContinuationFrame?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourceContinuationFrame?.formulaRealizationRecord?.id || ""),
          source: "generated-preterit-agentive-general-use-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "preterit-agentive-ownerhood-matrix-frame",
          role: "ownerhood-matrix",
          type: "verbal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          surfaceMatrix: String(matrix.surfaceMatrix || ""),
          classicalMatrix: String(matrix.classicalMatrix || ""),
          valency: String(matrix.matrixValency || ""),
          ownerhoodKind: String(matrix.ownerhoodKind || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "preterit-agentive-ownerhood-target-frame",
          unit: "CNV",
          stem: targetStem,
          parsedVerb,
          ownerhoodVerbInput: frameTargetInput,
          displayInput: frameTargetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "preterit-agentive-ownerhood",
          routeStage: "typed-operation-frame",
          grammarSource,
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          ownerhoodEmbed: Object.freeze({
            slot: "ownerhood-embed",
            role: "preterit-agentive-general-use-stem",
            root: sourceRoot
          }),
          ownerhoodMatrix: Object.freeze({
            slot: "ownerhood-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            ownerhoodKind: String(matrix.ownerhoodKind || "")
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ownerhood-verbstem",
            stem: targetStem
          })
        })
      });
    }
    function isPreteritAgentiveOwnerhoodOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-preterit-agentive-ownerhood-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem && frame.targetFrame?.parsedVerb?.sourceRawVerb === frame.targetFrame.stem);
    }
    function buildPreteritAgentiveOwnerhoodGenerationRequestFromOperationFrame(operationFrame = null, {
      subjectPrefix = "",
      subjectSuffix = "",
      tense = "pasado-remoto"
    } = {}) {
      if (!isPreteritAgentiveOwnerhoodOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["preterit-agentive-ownerhood-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      return {
        supported: true,
        diagnostics: [],
        request: {
          posicionesFormula: {
            pers1: String(subjectPrefix || ""),
            obj1: "",
            tronco: targetStem,
            pers2: String(subjectSuffix || ""),
            num2: String(subjectSuffix || ""),
            poseedor: "",
            tiempo: String(tense || "pasado-remoto")
          },
          options: {
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: "verbo",
              combinedMode: "active",
              derivationMode: "active",
              voiceMode: "active",
              typedCompoundOperationFrame: operationFrame,
              parsedVerb: operationFrame.targetFrame.parsedVerb
            }
          }
        }
      };
    }
    function buildOrdinaryNounOwnerhoodOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null,
      ownerhoodKind = "ownerhood"
    } = {}) {
      const sourcePayload = getTypedOrdinaryNounOwnerhoodSourceFramePayload(sourceContinuationFrame);
      const sourceRoot = sourcePayload.nounStem;
      const normalizedClass = sourcePayload.nounClass;
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      if (!sourceRoot || !normalizedClass || !matrixRoot) {
        return null;
      }
      const targetStem = `${sourceRoot}${matrixRoot}`;
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const frameTargetStem = String(targetFrame.stem || "").trim();
      const frameTargetInput = String(targetFrame.ownerhoodVerbInput || targetFrame.targetInput || "").trim();
      const frameNounClass = normalizeOrdinaryNounOwnerhoodNounClass(targetFrame.nounClass);
      const parsedVerb = targetFrame.parsedVerb && typeof targetFrame.parsedVerb === "object" ? targetFrame.parsedVerb : null;
      const expectedDisplayInput = buildOrdinaryNounOwnerhoodVerbInput({
        nounStem: sourceRoot,
        nounClass: normalizedClass,
        matrixRoot,
        ownerhoodKind: String(matrix.ownerhoodKind || ownerhoodKind || "ownerhood").trim()
      });
      if (!frameTargetStem || frameTargetStem !== targetStem || frameTargetInput !== expectedDisplayInput || frameNounClass !== normalizedClass || parsedVerb?.sourceRawVerb !== targetStem) {
        return null;
      }
      const grammarSource = String(matrix.grammarSource || "Andrews 35.9-35.10");
      const resolvedKind = String(matrix.ownerhoodKind || ownerhoodKind || "ownerhood").trim();
      return Object.freeze({
        kind: "andrews-ordinary-noun-ownerhood-operation-frame",
        version: 1,
        grammarSource,
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "ordinary-nounstem-as-ownerhood-embed",
          operationFamily: "ordinary-noun-ownerhood",
          sourceUnit: "CNN",
          targetUnit: "CNV",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          nounClassFrameRequired: true,
          parsedTargetFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "ordinary-noun-ownerhood-source-frame",
          role: "incorporated-ownerhood-embed",
          root: sourceRoot,
          nounClass: normalizedClass,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourceContinuationFrame?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourceContinuationFrame?.formulaRealizationRecord?.id || ""),
          sourceKind: sourcePayload.sourceKind,
          source: "generated-or-fixture-ordinary-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "ordinary-noun-ownerhood-matrix-frame",
          role: "ownerhood-matrix",
          type: "verbal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          surfaceMatrix: String(matrix.surfaceMatrix || ""),
          classicalMatrix: String(matrix.classicalMatrix || ""),
          valency: String(matrix.matrixValency || ""),
          ownerhoodKind: resolvedKind,
          defaultForNounClasses: Object.freeze(Array.isArray(matrix.defaultForNounClasses) ? matrix.defaultForNounClasses.slice() : []),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "ordinary-noun-ownerhood-target-frame",
          unit: "CNV",
          stem: targetStem,
          parsedVerb,
          nounClass: normalizedClass,
          ownerhoodVerbInput: frameTargetInput,
          displayInput: frameTargetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "ordinary-noun-ownerhood",
          routeStage: "typed-operation-frame",
          grammarSource,
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          ownerhoodEmbed: Object.freeze({
            slot: "ownerhood-embed",
            role: "ordinary-nounstem",
            root: sourceRoot,
            nounClass: normalizedClass
          }),
          ownerhoodMatrix: Object.freeze({
            slot: "ownerhood-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            ownerhoodKind: resolvedKind
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ownerhood-verbstem",
            stem: targetStem
          })
        })
      });
    }
    function getTypedOrdinaryNounOwnerhoodSourceFramePayload(frame = null) {
      if (!isGeneratedOutputTypedDerivationContinuationFrame(frame)) {
        return {
          nounStem: "",
          nounClass: "",
          sourceKind: ""
        };
      }
      const slots = frame.formulaSlots && typeof frame.formulaSlots === "object" ? frame.formulaSlots : frame.formulaRecord?.formulaSlots && typeof frame.formulaRecord.formulaSlots === "object" ? frame.formulaRecord.formulaSlots : {};
      const predicateSlot = slots.predicateStem || slots.predicate || {};
      const nounStem = normalizeTypedDerivationContinuationSurface(predicateSlot.stem || predicateSlot.value || "");
      const nounClass = normalizeOrdinaryNounOwnerhoodNounClass(frame.nounClass || frame.formulaRecord?.nounClass || frame.sourceFrame?.nounClass || "");
      const sourceKind = String(frame.sourceKind || frame.sourceFrame?.sourceKind || "").trim();
      return {
        nounStem,
        nounClass,
        sourceKind
      };
    }
    function buildOrdinaryNounOwnerhoodTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      ownerhoodKind = "ownerhood",
      ownerhoodVerbInput = ""
    } = {}) {
      const sourcePayload = getTypedOrdinaryNounOwnerhoodSourceFramePayload(sourceContinuationFrame);
      const sourceRoot = sourcePayload.nounStem;
      const nounClass = sourcePayload.nounClass;
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const resolvedKind = String(matrix.ownerhoodKind || ownerhoodKind || "ownerhood").trim();
      const targetStem = sourceRoot && matrixRoot ? `${sourceRoot}${matrixRoot}` : "";
      const targetInput = String(ownerhoodVerbInput || "").trim();
      const parsedVerb = buildTypedOwnerhoodParsedVerbFrame({
        sourceRoot,
        matrixRoot,
        targetStem,
        operationFamily: "ordinary-noun-ownerhood"
      });
      if (!sourceRoot || !nounClass || !matrixRoot || !targetStem || !targetInput || !parsedVerb) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "ordinary-nounstem-as-ownerhood-embed",
        operationFamily: "ordinary-noun-ownerhood",
        andrewsSection: matrix.grammarSource || "Andrews 35.9-35.10",
        sourceUnit: "CNN",
        targetUnit: "CNV",
        route: "CNN ordinary nounstem -> CNV ownerhood verbstem",
        embedRole: "ownerhood-embed",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        nounClassFrameRequired: true,
        parsedTargetFrameRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "CNV",
        targetUnit: "CNV",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "ordinary-noun-ownerhood-target-frame",
          generationAllowed: true,
          grammarSource: matrix.grammarSource || "Andrews 35.9-35.10",
          outputKind: "ordinary-noun-ownerhood-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "ownerhood-embed",
            role: "embedded-ordinary-nounstem",
            token: sourceRoot,
            root: sourceRoot,
            nounClass,
            sourceFrameId: String(sourceContinuationFrame.selectedVariant?.variantId || sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
            sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim()
          }),
          nounClass: Object.freeze({
            slot: "noun-class",
            role: "ordinary-nounstem-class",
            value: nounClass
          }),
          matrixRoot: Object.freeze({
            slot: "ownerhood-matrix",
            role: "ownerhood-verbal-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            surfaceMatrix: String(matrix.surfaceMatrix || "").trim(),
            ownerhoodKind: resolvedKind
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ownerhood-verbstem",
            stem: targetStem
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          surfaceMatrix: String(matrix.surfaceMatrix || "").trim(),
          ownerhoodKind: resolvedKind,
          valence: String(matrix.matrixValency || matrix.valency || "").trim(),
          grammarSource: String(matrix.grammarSource || "Andrews 35.9-35.10").trim()
        }),
        targetFrame: Object.freeze({
          kind: "ordinary-noun-ownerhood-target-frame",
          unit: "CNV",
          targetUnit: "CNV",
          stem: targetStem,
          nounClass,
          ownerhoodVerbInput: targetInput,
          targetInput,
          displayInput: targetInput,
          parsedVerb
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function isOrdinaryNounOwnerhoodOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-ordinary-noun-ownerhood-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.sourceFrame?.nounClass && frame.matrixFrame?.root && frame.targetFrame?.stem && frame.targetFrame?.parsedVerb?.sourceRawVerb === frame.targetFrame.stem);
    }
    function buildOrdinaryNounOwnerhoodGenerationRequestFromOperationFrame(operationFrame = null, {
      subjectPrefix = "",
      subjectSuffix = "",
      tense = "pasado-remoto"
    } = {}) {
      if (!isOrdinaryNounOwnerhoodOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["ordinary-noun-ownerhood-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      return {
        supported: true,
        diagnostics: [],
        request: {
          posicionesFormula: {
            pers1: String(subjectPrefix || ""),
            obj1: "",
            tronco: targetStem,
            pers2: String(subjectSuffix || ""),
            num2: String(subjectSuffix || ""),
            poseedor: "",
            tiempo: String(tense || "pasado-remoto")
          },
          options: {
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: "verbo",
              combinedMode: "active",
              derivationMode: "active",
              voiceMode: "active",
              typedCompoundOperationFrame: operationFrame,
              parsedVerb: operationFrame.targetFrame.parsedVerb
            }
          }
        }
      };
    }
    function buildPreteritAgentiveComplementVerbInput({
      preteritAgentiveStem = "",
      matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT
    } = {}) {
      const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
      const matrixSpec = resolvePreteritAgentiveComplementMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot) {
        return "";
      }
      return `-(${normalizedPreteritAgentiveStem}/${normalizedMatrixRoot})`;
    }
    function buildPreteritAgentiveComplementTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      objectPrefix = "",
      complementVerbInput = ""
    } = {}) {
      const sourceStem = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const resolvedObjectPrefix = String(objectPrefix || matrix.objectPrefix || "ki").trim() || "ki";
      const targetStem = sourceStem && matrixRoot ? `${sourceStem}${matrixRoot}` : "";
      const targetInput = String(complementVerbInput || "").trim();
      if (!sourceStem || !matrixRoot || !targetStem || !targetInput || !resolvedObjectPrefix) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "preterit-agentive-general-use-stem-as-incorporated-complement",
        operationFamily: "preterit-agentive-complement",
        andrewsSection: matrix.grammarSource || "Andrews 35.12",
        sourceUnit: "CNN",
        targetUnit: "CNV",
        route: "CNN preterit-agentive general-use nounstem -> CNV incorporated-complement verbstem",
        embedRole: "incorporated-complement",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        objectTransferRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "CNV",
        targetUnit: "CNV",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "preterit-agentive-complement-target-frame",
          generationAllowed: true,
          grammarSource: matrix.grammarSource || "Andrews 35.12",
          outputKind: "preterit-agentive-complement-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "complement-embed",
            role: "embedded-preterit-agentive-general-use-nounstem",
            token: sourceStem,
            root: sourceStem,
            sourceFrameId: String(sourceContinuationFrame.selectedVariant?.variantId || sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
            sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "complement-matrix",
            role: "complement-verbal-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            valency: String(matrix.matrixValency || "").trim()
          }),
          outsideObject: Object.freeze({
            slot: "obj1",
            role: "outside-object",
            prefix: resolvedObjectPrefix
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "complement-verbstem",
            stem: targetStem,
            objectPrefix: resolvedObjectPrefix
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          valence: String(matrix.matrixValency || matrix.valency || "").trim(),
          grammarSource: String(matrix.grammarSource || "Andrews 35.12").trim(),
          objectPrefix: resolvedObjectPrefix
        }),
        targetFrame: Object.freeze({
          kind: "preterit-agentive-complement-target-frame",
          unit: "CNV",
          targetUnit: "CNV",
          stem: targetStem,
          complementVerbInput: targetInput,
          targetInput,
          displayInput: targetInput,
          objectPrefix: resolvedObjectPrefix
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildPreteritAgentiveComplementOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null,
      objectPrefix = ""
    } = {}) {
      const sourceRoot = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      if (!sourceRoot || !matrixRoot) {
        return null;
      }
      const targetStem = `${sourceRoot}${matrixRoot}`;
      const resolvedObjectPrefix = String(objectPrefix || matrix.objectPrefix || "ki").trim() || "ki";
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const frameTargetStem = String(targetFrame.stem || "").trim();
      const frameTargetInput = String(targetFrame.complementVerbInput || targetFrame.targetInput || "").trim();
      const frameObjectPrefix = String(targetFrame.objectPrefix || "").trim();
      const expectedDisplayInput = buildPreteritAgentiveComplementVerbInput({
        preteritAgentiveStem: sourceRoot,
        matrixRoot
      });
      if (!frameTargetStem || frameTargetStem !== targetStem || frameTargetInput !== expectedDisplayInput || frameObjectPrefix !== resolvedObjectPrefix) {
        return null;
      }
      const grammarSource = String(matrix.grammarSource || "Andrews 35.12");
      return Object.freeze({
        kind: "andrews-preterit-agentive-complement-operation-frame",
        version: 1,
        grammarSource,
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "preterit-agentive-general-use-stem-as-incorporated-complement",
          operationFamily: "preterit-agentive-complement",
          sourceUnit: "CNN",
          targetUnit: "CNV",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          objectTransferRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "preterit-agentive-complement-source-frame",
          role: "incorporated-complement",
          root: sourceRoot,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourceContinuationFrame?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourceContinuationFrame?.formulaRealizationRecord?.id || ""),
          source: "generated-preterit-agentive-general-use-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "preterit-agentive-complement-matrix-frame",
          role: "complement-matrix",
          type: "verbal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          valency: String(matrix.matrixValency || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "preterit-agentive-complement-target-frame",
          unit: "CNV",
          stem: targetStem,
          objectPrefix: resolvedObjectPrefix,
          complementVerbInput: frameTargetInput,
          displayInput: frameTargetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "preterit-agentive-complement",
          routeStage: "typed-operation-frame",
          grammarSource,
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          complementEmbed: Object.freeze({
            slot: "complement-embed",
            role: "preterit-agentive-general-use-stem",
            root: sourceRoot
          }),
          complementMatrix: Object.freeze({
            slot: "complement-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            valency: String(matrix.matrixValency || "")
          }),
          outsideObject: Object.freeze({
            slot: "obj1",
            role: "outside-object",
            prefix: resolvedObjectPrefix
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "complement-verbstem",
            stem: targetStem
          })
        })
      });
    }
    function isPreteritAgentiveComplementOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-preterit-agentive-complement-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildPreteritAgentiveComplementGenerationRequestFromOperationFrame(operationFrame = null, {
      subjectPrefix = "",
      subjectSuffix = "",
      tense = "presente"
    } = {}) {
      if (!isPreteritAgentiveComplementOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["preterit-agentive-complement-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const objectPrefix = String(operationFrame.targetFrame.objectPrefix || "").trim();
      return {
        supported: true,
        diagnostics: [],
        request: {
          posicionesFormula: {
            pers1: String(subjectPrefix || ""),
            obj1: objectPrefix,
            tronco: targetStem,
            pers2: String(subjectSuffix || ""),
            num2: String(subjectSuffix || ""),
            poseedor: "",
            tiempo: String(tense || "presente")
          },
          options: {
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: "verbo",
              combinedMode: "active",
              derivationMode: "active",
              voiceMode: "active",
              typedCompoundOperationFrame: operationFrame
            }
          }
        }
      };
    }
    function buildPreteritAgentiveAdverbialVerbInput({
      preteritAgentiveStem = "",
      matrixRoot = DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT
    } = {}) {
      const normalizedPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
      const matrixSpec = resolvePreteritAgentiveAdverbialMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot) {
        return "";
      }
      return matrixSpec.matrixValency === "transitive" ? `-(${normalizedPreteritAgentiveStem}/${normalizedMatrixRoot})` : `(${normalizedPreteritAgentiveStem}/${normalizedMatrixRoot})`;
    }
    function buildPreteritAgentiveAdverbialTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      objectPrefix = "",
      adverbialVerbInput = ""
    } = {}) {
      const sourceStem = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const resolvedObjectPrefix = matrix.matrixValency === "transitive" ? String(objectPrefix || matrix.objectPrefix || "ki").trim() || "ki" : "";
      const targetStem = sourceStem && matrixRoot ? `${sourceStem}${matrixRoot}` : "";
      const targetInput = String(adverbialVerbInput || "").trim();
      if (!sourceStem || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "preterit-agentive-general-use-stem-as-adverbial-manner",
        operationFamily: "preterit-agentive-adverbial",
        andrewsSection: matrix.grammarSource || "Andrews 35.12",
        sourceUnit: "CNN",
        targetUnit: "CNV",
        route: "CNN preterit-agentive general-use nounstem -> CNV adverbial-manner verbstem",
        embedRole: "adverbial-manner",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "CNV",
        targetUnit: "CNV",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "preterit-agentive-adverbial-target-frame",
          generationAllowed: true,
          grammarSource: matrix.grammarSource || "Andrews 35.12",
          outputKind: "preterit-agentive-adverbial-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "adverbial-embed",
            role: "embedded-preterit-agentive-general-use-nounstem",
            token: sourceStem,
            root: sourceStem,
            sourceFrameId: String(sourceContinuationFrame.selectedVariant?.variantId || sourceContinuationFrame.formulaRealizationRecord?.id || "").trim(),
            sourceFormulaRecordId: String(sourceContinuationFrame.formulaRecord?.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourceContinuationFrame.formulaRealizationRecord?.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "adverbial-matrix",
            role: "adverbial-verbal-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            valency: String(matrix.matrixValency || "").trim(),
            adverbialFocus: String(matrix.adverbialFocus || "").trim()
          }),
          outsideObject: Object.freeze({
            slot: "obj1",
            role: "outside-object",
            prefix: resolvedObjectPrefix
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "adverbial-verbstem",
            stem: targetStem,
            objectPrefix: resolvedObjectPrefix
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          valence: String(matrix.matrixValency || matrix.valency || "").trim(),
          grammarSource: String(matrix.grammarSource || "Andrews 35.12").trim(),
          adverbialFocus: String(matrix.adverbialFocus || "").trim(),
          objectPrefix: resolvedObjectPrefix
        }),
        targetFrame: Object.freeze({
          kind: "preterit-agentive-adverbial-target-frame",
          unit: "CNV",
          targetUnit: "CNV",
          stem: targetStem,
          adverbialVerbInput: targetInput,
          targetInput,
          displayInput: targetInput,
          objectPrefix: resolvedObjectPrefix
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildPreteritAgentiveAdverbialOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null,
      objectPrefix = ""
    } = {}) {
      const sourceRoot = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      if (!sourceRoot || !matrixRoot) {
        return null;
      }
      const targetStem = `${sourceRoot}${matrixRoot}`;
      const resolvedObjectPrefix = matrix.matrixValency === "transitive" ? String(objectPrefix || "ki").trim() || "ki" : "";
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const frameTargetStem = String(targetFrame.stem || "").trim();
      const frameTargetInput = String(targetFrame.adverbialVerbInput || targetFrame.targetInput || "").trim();
      const frameObjectPrefix = String(targetFrame.objectPrefix || "").trim();
      const expectedDisplayInput = buildPreteritAgentiveAdverbialVerbInput({
        preteritAgentiveStem: sourceRoot,
        matrixRoot
      });
      if (!frameTargetStem || frameTargetStem !== targetStem || frameTargetInput !== expectedDisplayInput || frameObjectPrefix !== resolvedObjectPrefix) {
        return null;
      }
      const grammarSource = String(matrix.grammarSource || "Andrews 35.12");
      return Object.freeze({
        kind: "andrews-preterit-agentive-adverbial-operation-frame",
        version: 1,
        grammarSource,
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "preterit-agentive-general-use-stem-as-adverbial-manner",
          operationFamily: "preterit-agentive-adverbial",
          sourceUnit: "CNN",
          targetUnit: "CNV",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "preterit-agentive-adverbial-source-frame",
          role: "incorporated-adverbial-manner",
          root: sourceRoot,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourceContinuationFrame?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourceContinuationFrame?.formulaRealizationRecord?.id || ""),
          source: "generated-preterit-agentive-general-use-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "preterit-agentive-adverbial-matrix-frame",
          role: "adverbial-matrix",
          type: "verbal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          valency: String(matrix.matrixValency || ""),
          adverbialFocus: String(matrix.adverbialFocus || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "preterit-agentive-adverbial-target-frame",
          unit: "CNV",
          stem: targetStem,
          objectPrefix: resolvedObjectPrefix,
          adverbialVerbInput: frameTargetInput,
          displayInput: frameTargetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "preterit-agentive-adverbial",
          routeStage: "typed-operation-frame",
          grammarSource,
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          adverbialEmbed: Object.freeze({
            slot: "adverbial-embed",
            role: "preterit-agentive-general-use-stem",
            root: sourceRoot
          }),
          adverbialMatrix: Object.freeze({
            slot: "adverbial-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            valency: String(matrix.matrixValency || ""),
            adverbialFocus: String(matrix.adverbialFocus || "")
          }),
          outsideObject: Object.freeze({
            slot: "obj1",
            role: "outside-object",
            prefix: resolvedObjectPrefix
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "adverbial-verbstem",
            stem: targetStem
          })
        })
      });
    }
    function isPreteritAgentiveAdverbialOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-preterit-agentive-adverbial-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildPreteritAgentiveAdverbialGenerationRequestFromOperationFrame(operationFrame = null, {
      subjectPrefix = "",
      subjectSuffix = "",
      tense = "presente"
    } = {}) {
      if (!isPreteritAgentiveAdverbialOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["preterit-agentive-adverbial-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const objectPrefix = String(operationFrame.targetFrame.objectPrefix || "").trim();
      return {
        supported: true,
        diagnostics: [],
        request: {
          posicionesFormula: {
            pers1: String(subjectPrefix || ""),
            obj1: objectPrefix,
            tronco: targetStem,
            pers2: String(subjectSuffix || ""),
            num2: String(subjectSuffix || ""),
            poseedor: "",
            tiempo: String(tense || "presente")
          },
          options: {
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: "verbo",
              combinedMode: "active",
              derivationMode: "active",
              voiceMode: "active",
              typedCompoundOperationFrame: operationFrame
            }
          }
        }
      };
    }
    function buildOrdinaryNounOwnerhoodVerbInput({
      nounStem = "",
      nounClass = "",
      matrixRoot = "",
      ownerhoodKind = "ownerhood"
    } = {}) {
      const normalizedNounStem = String(nounStem || "").trim();
      const normalizedClass = normalizeOrdinaryNounOwnerhoodNounClass(nounClass);
      const resolvedMatrixRoot = String(matrixRoot || "").trim() || resolveOrdinaryNounOwnerhoodDefaultMatrixRoot({
        nounClass: normalizedClass,
        ownerhoodKind
      });
      const matrixSpec = resolveOrdinaryNounOwnerhoodMatrixSpec(resolvedMatrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedNounStem || !normalizedMatrixRoot || !isOrdinaryNounOwnerhoodMatrixCompatibleWithNounClass(matrixSpec, normalizedClass)) {
        return "";
      }
      return `(${normalizedNounStem})-(${normalizedMatrixRoot})`;
    }
    function formatActiveActionNominalCompoundOrdinaryNncInput({
      compoundStem = "",
      nounClass = ""
    } = {}) {
      return formatPatientivoNominalCompoundOrdinaryNncInput({
        compoundStem,
        nounClass
      });
    }
    function resolvePatientivoNominalCompoundFormationFrame({
      matrixSpec = null,
      incorporatedRoot = "",
      patientivoSurface = "",
      sourceSurface = "",
      compoundStem = "",
      ordinaryNncInput = ""
    } = {}) {
      return {
        kind: "patientivo-nominal-compound-formation-frame",
        version: 1,
        grammarSource: "Andrews 39.6",
        compoundStemType: "nominal",
        sourceSurface: String(sourceSurface || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        embed: {
          role: "compound-embed",
          root: String(incorporatedRoot || "").trim(),
          source: "generated-patientive-nounstem",
          insideStem: true
        },
        matrix: {
          role: "compound-matrix",
          type: "nominal",
          id: String(matrixSpec?.id || "").trim(),
          root: matrixSpec?.supported ? matrixSpec.nawatRoot : "",
          classicalMatrix: String(matrixSpec?.classicalMatrix || ""),
          nounClass: String(matrixSpec?.nounClass || ""),
          animacy: String(matrixSpec?.animacy || "")
        },
        output: {
          kind: "ordinary-nnc-compound-input",
          compoundStem: String(compoundStem || "").trim(),
          ordinaryNncInput: String(ordinaryNncInput || "").trim(),
          sourceKind: "open-stem",
          fixtureBacked: false
        },
        evidencePolicy: {
          matrixRequiresStructuredMatrixSource: true,
          matrixDataBacked: Boolean(matrixSpec?.supported),
          patientiveSurfaceComesFromSalida: true,
          createsOrdinaryNncFixture: false,
          copiesClassicalSurface: false
        }
      };
    }
    function getTypedPatientivoNominalCompoundSourceFramePayload(frame = null) {
      return getTypedPatientivoContinuationSourceFramePayload(frame);
    }
    function buildPatientivoNominalCompoundTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      compoundStem = "",
      ordinaryNncInput = ""
    } = {}) {
      const sourcePayload = getTypedPatientivoNominalCompoundSourceFramePayload(sourceContinuationFrame);
      const sourceRoot = String(sourcePayload?.patientivoStem || "").trim();
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const targetStem = String(compoundStem || "").trim();
      const targetInput = String(ordinaryNncInput || "").trim();
      const nounClass = String(matrix.nounClass || "zero").trim() || "zero";
      const animacy = String(matrix.animacy || "inanimate").trim() || "inanimate";
      if (!sourceRoot || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "patientivo-nounstem-as-nominal-compound",
        operationFamily: "patientivo-nominal-compound",
        andrewsSection: "Andrews 39.6",
        sourceUnit: "CNN",
        targetUnit: "NNC",
        route: "CNN patientive nounstem -> NNC nominal compound stem",
        embedRole: "nominal-compound-embed",
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "NNC",
        targetUnit: "NNC",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourcePayload.formulaRecord.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourcePayload.formulaRealizationRecord.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "patientivo-nominal-compound-target-frame",
          generationAllowed: true,
          grammarSource: "Andrews 39.6",
          outputKind: "patientivo-nominal-compound-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "nominal-compound-embed",
            role: "embedded-patientive-nounstem",
            token: sourceRoot,
            root: sourceRoot,
            sourceFrameId: String(sourcePayload.selectedVariant?.variantId || sourcePayload.formulaRealizationRecord.id || "").trim(),
            sourceFormulaRecordId: String(sourcePayload.formulaRecord.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourcePayload.formulaRealizationRecord.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "nominal-matrix-root",
            role: "nominal-compound-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            nounClass,
            animacy
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ordinary-nnc-predicate-stem",
            stem: targetStem,
            nounClass,
            animacy
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          nounClass,
          animacy,
          grammarSource: "Andrews 39.6"
        }),
        targetFrame: Object.freeze({
          kind: "patientivo-nominal-compound-target-frame",
          unit: "NNC",
          targetUnit: "NNC",
          stem: targetStem,
          compoundStem: targetStem,
          nounClass,
          animacy,
          ordinaryNncInput: targetInput,
          targetInput,
          displayInput: targetInput
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildPatientivoNominalCompoundOperationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      targetContinuationFrame = null
    } = {}) {
      const sourcePayload = getTypedPatientivoNominalCompoundSourceFramePayload(sourceContinuationFrame);
      const sourceRoot = String(sourcePayload?.patientivoStem || "").trim();
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const targetStem = String(targetFrame.stem || targetFrame.compoundStem || "").trim();
      const targetInput = String(targetFrame.ordinaryNncInput || targetFrame.targetInput || "").trim();
      const nounClass = String(targetFrame.nounClass || matrix.nounClass || "zero").trim() || "zero";
      const animacy = String(targetFrame.animacy || matrix.animacy || "inanimate").trim() || "inanimate";
      if (!sourceRoot || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      if (targetStem !== `${sourceRoot}${matrixRoot}`) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-patientivo-nominal-compound-operation-frame",
        version: 1,
        grammarSource: "Andrews 39.6",
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "patientivo-nounstem-as-nominal-compound",
          operationFamily: "patientivo-nominal-compound",
          sourceUnit: "CNN",
          targetUnit: "NNC",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "patientivo-nominal-compound-source-frame",
          role: "nominal-compound-embed",
          root: sourceRoot,
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourcePayload?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourcePayload?.formulaRealizationRecord?.id || ""),
          source: "generated-patientive-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "patientivo-nominal-compound-matrix-frame",
          role: "nominal-compound-matrix",
          type: "nominal",
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          nounClass: String(matrix.nounClass || ""),
          animacy: String(matrix.animacy || ""),
          supported: matrix.supported === true
        }),
        targetFrame: Object.freeze({
          kind: "patientivo-nominal-compound-target-frame",
          unit: "NNC",
          stem: targetStem,
          nounClass,
          animacy,
          ordinaryNncInput: targetInput,
          displayInput: targetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "patientivo-nominal-compound",
          routeStage: "typed-operation-frame",
          grammarSource: "Andrews 39.6",
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          compoundEmbed: Object.freeze({
            slot: "nominal-compound-embed",
            role: "embedded-patientive-nounstem",
            root: sourceRoot
          }),
          compoundMatrix: Object.freeze({
            slot: "nominal-matrix-root",
            role: "nominal-compound-matrix",
            root: matrixRoot,
            nounClass: String(matrix.nounClass || ""),
            animacy: String(matrix.animacy || "")
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "ordinary-nnc-predicate-stem",
            stem: targetStem
          })
        })
      });
    }
    function isPatientivoNominalCompoundOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-patientivo-nominal-compound-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildPatientivoNominalCompoundOrdinaryNncRequestFromOperationFrame(operationFrame = null) {
      if (!isPatientivoNominalCompoundOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["patientivo-nominal-compound-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const nounClass = String(operationFrame.targetFrame.nounClass || "zero").trim() || "zero";
      const animacy = String(operationFrame.targetFrame.animacy || "inanimate").trim() || "inanimate";
      const request = buildNominalCompoundOrdinaryNncRequest({
        compoundStem: targetStem,
        nounClass,
        animacy,
        operationFrame,
        sourceFrame: operationFrame.sourceFrame,
        targetFrame: operationFrame.targetFrame,
        routeStage: "patientivo-nominal-compound-continuation"
      });
      return {
        supported: Boolean(request),
        diagnostics: request ? [] : ["patientivo-nominal-compound-missing-nnc-request"],
        request
      };
    }
    function stripPatientivoPrelocativeConnector(surface = "", {
      patientivoNominalSuffix = ""
    } = {}) {
      const normalized = String(surface || "").trim();
      if (!normalized) {
        return "";
      }
      const suffix = resolvePatientivoPrelocativeConnectorSuffix(patientivoNominalSuffix);
      if (suffix && normalized.endsWith(suffix)) {
        return normalized.slice(0, -suffix.length);
      }
      return normalized.endsWith("t") ? normalized.slice(0, -1) : normalized;
    }
    function buildPatientivoPrelocativeVerbInput({
      incorporatedRoot = "",
      matrixRoot = DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT
    } = {}) {
      const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
      const matrixSpec = resolvePatientivoPrelocativeMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
      }
      return `-(${normalizedIncorporatedRoot}/${normalizedMatrixRoot})`;
    }
    function resolvePatientivoPrelocativeIncorporatedRole({
      matrixSpec = null,
      objectTransfer = null
    } = {}) {
      const sourceState = String(objectTransfer?.sourceState || "").trim();
      const matrixId = String(matrixSpec?.id || "").trim();
      const isPossessive = sourceState === "possessive";
      return isPossessive && (matrixId === "tla-ih-tlani" || matrixId === "tla-tem-o-a" || matrixId === "tla-tlani") ? "incorporated-object" : "object-complement";
    }
    function buildPatientivoPrelocativeTargetContinuationFrame({
      sourceContinuationFrame = null,
      matrixSpec = null,
      objectTransfer = null,
      prelocativeVerbInput = ""
    } = {}) {
      const sourcePayload = getTypedPatientivoContinuationSourceFramePayload(sourceContinuationFrame);
      const sourceRoot = String(sourcePayload?.patientivoStem || "").trim();
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = String(matrix.nawatRoot || matrix.root || "").trim();
      const objectPrefix = String(objectTransfer?.objectPrefix || "").trim();
      const targetInput = String(prelocativeVerbInput || "").trim();
      if (!sourceRoot || !matrixRoot || !objectPrefix || !targetInput) {
        return null;
      }
      const incorporatedRole = resolvePatientivoPrelocativeIncorporatedRole({
        matrixSpec: matrix,
        objectTransfer
      });
      const sourceState = String(objectTransfer?.sourceState || "").trim();
      const grammarSource = sourceState === "possessive" && incorporatedRole === "incorporated-object" ? "Andrews 39.8" : "Andrews 39.7";
      const targetStem = `${sourceRoot}${matrixRoot}`;
      const operationFrame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "patientivo-prelocative-nounstem-as-verbal-incorporate",
        operationFamily: "patientivo-prelocative",
        andrewsSection: grammarSource,
        sourceUnit: "CNN",
        targetUnit: "CNV",
        route: "CNN patientive nounstem -> CNV prelocative verbstem",
        embedRole: incorporatedRole,
        sourceFrameRequired: true,
        matrixFrameRequired: true,
        objectTransferRequired: true,
        renderedSurfaceIsNotAuthority: true
      });
      return Object.freeze({
        kind: "andrews-typed-operation-continuation-frame",
        version: 1,
        role: "target",
        unit: "CNV",
        targetUnit: "CNV",
        sourceFrame: sourceContinuationFrame,
        sourceFrameKind: sourceContinuationFrame.kind,
        sourceFormulaRecordId: String(sourcePayload.formulaRecord.id || "").trim(),
        sourceFormulaRealizationRecordId: String(sourcePayload.formulaRealizationRecord.id || "").trim(),
        operationFrame,
        routeContract: Object.freeze({
          routeFamily: "derivation-continuation",
          routeStage: "patientivo-prelocative-target-frame",
          generationAllowed: true,
          grammarSource,
          outputKind: "patientivo-prelocative-continuation-contract"
        }),
        formulaSlots: Object.freeze({
          embeddedRoot: Object.freeze({
            slot: "prelocative-embed",
            role: incorporatedRole,
            token: sourceRoot,
            root: sourceRoot,
            sourceFrameId: String(sourcePayload.selectedVariant?.variantId || sourcePayload.formulaRealizationRecord.id || "").trim(),
            sourceFormulaRecordId: String(sourcePayload.formulaRecord.id || "").trim(),
            sourceFormulaRealizationRecordId: String(sourcePayload.formulaRealizationRecord.id || "").trim()
          }),
          matrixRoot: Object.freeze({
            slot: "prelocative-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            matrixSpecId: String(matrix.id || "").trim(),
            classicalMatrix: String(matrix.classicalMatrix || "").trim(),
            valency: String(matrix.matrixValency || "").trim(),
            sourceStates: Object.freeze(Array.isArray(matrix.sourceStates) ? matrix.sourceStates.slice() : [])
          }),
          outsideObject: Object.freeze({
            slot: "obj1",
            role: "outside-object",
            originRole: String(objectTransfer?.sourceRole || ""),
            prefix: objectPrefix,
            line: String(objectTransfer?.objectLine || "mainline").trim(),
            case: String(objectTransfer?.objectCase || "objective").trim()
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "prelocative-verbstem",
            stem: targetStem,
            objectPrefix
          })
        }),
        matrixFrame: Object.freeze({
          id: String(matrix.id || "").trim(),
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || "").trim(),
          valency: String(matrix.matrixValency || "").trim(),
          sourceStates: Object.freeze(Array.isArray(matrix.sourceStates) ? matrix.sourceStates.slice() : []),
          grammarSource
        }),
        objectFrame: Object.freeze({
          kind: "patientivo-prelocative-object-transfer-frame",
          role: "outside-object",
          originRole: String(objectTransfer?.sourceRole || ""),
          originPrefix: String(objectTransfer?.sourcePrefix || "").trim(),
          originSuffix: String(objectTransfer?.sourceSuffix || "").trim(),
          prefix: objectPrefix,
          line: String(objectTransfer?.objectLine || "mainline").trim(),
          case: String(objectTransfer?.objectCase || "objective").trim()
        }),
        targetFrame: Object.freeze({
          kind: "patientivo-prelocative-target-frame",
          unit: "CNV",
          targetUnit: "CNV",
          stem: targetStem,
          prelocativeVerbInput: targetInput,
          targetInput,
          displayInput: targetInput,
          objectPrefix,
          sourceState,
          incorporatedRole
        }),
        resultFrame: Object.freeze({
          kind: "andrews-typed-target-result-frame",
          targetInput,
          displayOnly: true,
          displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
        }),
        targetInput,
        displayInput: targetInput,
        displayOnlyFieldsExcluded: Object.freeze(["result", "surface", "formulaEcho"])
      });
    }
    function buildPatientivoPrelocativeOperationFrame({
      matrixSpec = null,
      objectTransfer = null,
      sourceContinuationFrame = null,
      targetContinuationFrame = null
    } = {}) {
      const sourcePayload = getTypedPatientivoContinuationSourceFramePayload(sourceContinuationFrame);
      const sourceRoot = String(sourcePayload?.patientivoStem || "").trim();
      const matrix = matrixSpec && typeof matrixSpec === "object" ? matrixSpec : {};
      const matrixRoot = matrix.supported ? String(matrix.nawatRoot || "").trim() : "";
      const targetFrame = targetContinuationFrame?.targetFrame && typeof targetContinuationFrame.targetFrame === "object" ? targetContinuationFrame.targetFrame : {};
      const targetStem = String(targetFrame.stem || "").trim();
      const targetInput = String(targetFrame.prelocativeVerbInput || targetFrame.targetInput || "").trim();
      if (!sourceRoot || !matrixRoot || !targetStem || !targetInput) {
        return null;
      }
      if (targetStem !== `${sourceRoot}${matrixRoot}`) {
        return null;
      }
      const sourceState = String(objectTransfer?.sourceState || "").trim();
      const matrixId = String(matrix.id || "").trim();
      const incorporatedRole = resolvePatientivoPrelocativeIncorporatedRole({
        matrixSpec: matrix,
        objectTransfer
      });
      const isPossessive = sourceState === "possessive";
      const grammarSource = isPossessive && incorporatedRole === "incorporated-object" ? "Andrews 39.8" : "Andrews 39.7";
      const objectPrefix = String(objectTransfer?.objectPrefix || "").trim();
      return Object.freeze({
        kind: "andrews-patientivo-prelocative-operation-frame",
        version: 1,
        grammarSource,
        operationFrame: Object.freeze({
          kind: "andrews-typed-operation-frame",
          operationId: "patientivo-prelocative-nounstem-as-verbal-incorporate",
          operationFamily: "patientivo-prelocative",
          sourceUnit: "CNN",
          targetUnit: "CNV",
          sourceFrameRequired: true,
          matrixFrameRequired: true,
          objectTransferRequired: true,
          displayInputIsNotAuthority: true
        }),
        sourceFrame: Object.freeze({
          kind: "patientivo-prelocative-source-frame",
          role: incorporatedRole,
          root: sourceRoot,
          sourceState,
          sourceRole: String(objectTransfer?.sourceRole || ""),
          sourceContinuationFrameKind: String(sourceContinuationFrame?.kind || ""),
          sourceFormulaRecordId: String(sourcePayload?.formulaRecord?.id || ""),
          sourceFormulaRealizationRecordId: String(sourcePayload?.formulaRealizationRecord?.id || ""),
          source: "generated-patientive-nounstem"
        }),
        matrixFrame: Object.freeze({
          kind: "patientivo-prelocative-matrix-frame",
          role: "prelocative-matrix",
          type: "verbal",
          id: matrixId,
          root: matrixRoot,
          classicalMatrix: String(matrix.classicalMatrix || ""),
          valency: String(matrix.matrixValency || ""),
          supported: matrix.supported === true,
          sourceStates: Object.freeze(Array.isArray(matrix.sourceStates) ? matrix.sourceStates.slice() : [])
        }),
        objectFrame: Object.freeze({
          kind: "patientivo-prelocative-object-transfer-frame",
          role: "outside-object",
          originRole: String(objectTransfer?.sourceRole || ""),
          originPrefix: String(objectTransfer?.sourcePrefix || "").trim(),
          originSuffix: String(objectTransfer?.sourceSuffix || "").trim(),
          prefix: objectPrefix,
          line: String(objectTransfer?.objectLine || "mainline").trim(),
          case: String(objectTransfer?.objectCase || "objective").trim()
        }),
        targetFrame: Object.freeze({
          kind: "patientivo-prelocative-target-frame",
          unit: "CNV",
          stem: targetStem,
          objectPrefix,
          displayInput: targetInput,
          prelocativeVerbInput: targetInput,
          targetInput
        }),
        routeContract: Object.freeze({
          routeFamily: "patientivo-prelocative",
          routeStage: "typed-operation-frame",
          grammarSource,
          generationAllowed: true
        }),
        formulaSlots: Object.freeze({
          prelocativeEmbed: Object.freeze({
            slot: "prelocative-embed",
            role: incorporatedRole,
            root: sourceRoot
          }),
          prelocativeMatrix: Object.freeze({
            slot: "prelocative-matrix",
            role: "verbal-matrix",
            root: matrixRoot,
            valency: String(matrix.matrixValency || "")
          }),
          outsideObject: Object.freeze({
            slot: "obj1",
            role: "outside-object",
            prefix: objectPrefix
          }),
          targetStem: Object.freeze({
            slot: "STEM",
            role: "prelocative-verbstem",
            stem: targetStem
          })
        })
      });
    }
    function isPatientivoPrelocativeOperationFrame(frame = null) {
      return Boolean(frame && typeof frame === "object" && frame.kind === "andrews-patientivo-prelocative-operation-frame" && frame.operationFrame?.kind === "andrews-typed-operation-frame" && frame.sourceFrame?.root && frame.matrixFrame?.root && frame.targetFrame?.stem);
    }
    function buildPatientivoPrelocativeGenerationRequestFromOperationFrame(operationFrame = null, {
      subjectPrefix = "",
      subjectSuffix = "",
      tense = "presente"
    } = {}) {
      if (!isPatientivoPrelocativeOperationFrame(operationFrame)) {
        return {
          supported: false,
          diagnostics: ["patientivo-prelocative-missing-typed-operation-frame"],
          request: null
        };
      }
      const targetStem = String(operationFrame.targetFrame.stem || "").trim();
      const objectPrefix = String(operationFrame.targetFrame.objectPrefix || "").trim();
      return {
        supported: true,
        diagnostics: [],
        request: {
          posicionesFormula: {
            pers1: String(subjectPrefix || ""),
            obj1: objectPrefix,
            tronco: targetStem,
            pers2: String(subjectSuffix || ""),
            num2: String(subjectSuffix || ""),
            poseedor: "",
            tiempo: String(tense || "presente")
          },
          options: {
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: "verbo",
              combinedMode: "active",
              derivationMode: "active",
              voiceMode: "active",
              typedCompoundOperationFrame: operationFrame
            }
          }
        }
      };
    }
    function isPatientivoPrelocativeMatrixCompatibleWithSourceState(matrixSpec = null, sourceState = "") {
      if (!matrixSpec || matrixSpec.supported === false) {
        return false;
      }
      const allowedStates = Array.isArray(matrixSpec.sourceStates) ? matrixSpec.sourceStates : [];
      return !allowedStates.length || allowedStates.includes(String(sourceState || "").trim());
    }
    function resolvePatientivoPrelocativeFormationFrame({
      matrixSpec = null,
      objectTransfer = null,
      incorporatedRoot = "",
      patientivoSurface = "",
      sourceSurface = "",
      prelocativeVerbInput = "",
      operationFrame = null
    } = {}) {
      const sourceState = String(objectTransfer?.sourceState || "").trim();
      const matrixId = String(matrixSpec?.id || "").trim();
      const isPossessive = sourceState === "possessive";
      const isStrictIncorporatedObjectMatrix = matrixId === "tla-ih-tlani" || matrixId === "tla-tem-o-a";
      const isRareTlaniIncorporatedObjectMatrix = matrixId === "tla-tlani" && isPossessive;
      const lessonRef = isPossessive && (isStrictIncorporatedObjectMatrix || isRareTlaniIncorporatedObjectMatrix) ? "Andrews 39.8" : "Andrews 39.7";
      const incorporatedRole = isPossessive && (isStrictIncorporatedObjectMatrix || isRareTlaniIncorporatedObjectMatrix) ? "incorporated-object" : "object-complement";
      const outsideObjectOriginRole = isPossessive ? "possessor" : "subject";
      return {
        kind: "patientivo-prelocative-formation-frame",
        version: 1,
        grammarSource: lessonRef,
        sourceState,
        sourceSurface: String(sourceSurface || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        incorporated: {
          role: incorporatedRole,
          root: String(incorporatedRoot || "").trim(),
          source: "generated-patientive-nounstem",
          insideVerbStem: true
        },
        outsideObject: {
          role: "matrix-object",
          originRole: outsideObjectOriginRole,
          originPrefix: String(objectTransfer?.sourcePrefix || "").trim(),
          originSuffix: String(objectTransfer?.sourceSuffix || "").trim(),
          prefix: String(objectTransfer?.objectPrefix || "").trim(),
          line: String(objectTransfer?.objectLine || "mainline").trim(),
          case: String(objectTransfer?.objectCase || "objective").trim()
        },
        valencePolicy: {
          preservesSourceValence: isPossessive,
          possessorBecomesObjectWithoutApplicativeSuffix: isPossessive,
          absolutiveSubjectBecomesObject: sourceState === "absolutive",
          hasObjectInsideVerbStem: Boolean(incorporatedRoot),
          hasObjectOutsideVerbStem: Boolean(objectTransfer?.objectPrefix)
        },
        matrix: {
          id: matrixId,
          root: matrixSpec?.supported ? matrixSpec.nawatRoot : "",
          classicalMatrix: String(matrixSpec?.classicalMatrix || ""),
          sourceCompatible: isPatientivoPrelocativeMatrixCompatibleWithSourceState(matrixSpec, sourceState)
        },
        verbInput: String(prelocativeVerbInput || "").trim(),
        targetStem: String(operationFrame?.targetFrame?.stem || ""),
        operationFrameKind: String(operationFrame?.kind || ""),
        displayInputIsNotAuthority: operationFrame?.operationFrame?.displayInputIsNotAuthority === true
      };
    }
    function getPatientivoPrelocativePossessiveObjectMap(explicitMap = null) {
      if (explicitMap && typeof explicitMap === "object") {
        return explicitMap;
      }
      return typeof targetObject.POSSESSIVE_TO_OBJECT_PREFIX !== "undefined" ? targetObject.POSSESSIVE_TO_OBJECT_PREFIX : {};
    }
    function getPatientivoPrelocativeSubjectObjectMap(explicitMap = null) {
      if (explicitMap && typeof explicitMap === "object") {
        return explicitMap;
      }
      const subjectObjectMap = {};
      const objectSubjectMap = typeof targetObject.PASSIVE_IMPERSONAL_SUBJECT_MAP !== "undefined" ? targetObject.PASSIVE_IMPERSONAL_SUBJECT_MAP : {};
      Object.entries(objectSubjectMap || {}).forEach(([objectPrefix, subject]) => {
        const key = `${subject?.pers1 || ""}|${subject?.pers2 || ""}`;
        if (objectPrefix && key && !subjectObjectMap[key]) {
          subjectObjectMap[key] = objectPrefix;
        }
      });
      if (Object.keys(subjectObjectMap).length) {
        return subjectObjectMap;
      }
      const possessiveMap = getPatientivoPrelocativePossessiveObjectMap();
      if (typeof targetObject.getPoseedorPrefixForPers1Pers2 !== "function") {
        return subjectObjectMap;
      }
      [{
        subjectPrefix: "ni",
        subjectSuffix: ""
      }, {
        subjectPrefix: "ti",
        subjectSuffix: ""
      }, {
        subjectPrefix: "",
        subjectSuffix: ""
      }, {
        subjectPrefix: "ti",
        subjectSuffix: "t"
      }, {
        subjectPrefix: "an",
        subjectSuffix: "t"
      }, {
        subjectPrefix: "",
        subjectSuffix: "t"
      }].forEach(subject => {
        const possessivePrefix = targetObject.getPoseedorPrefixForPers1Pers2(subject.subjectPrefix, subject.subjectSuffix);
        const objectPrefix = possessivePrefix ? String(possessiveMap[possessivePrefix] || "").trim() : "";
        const key = `${subject.subjectPrefix}|${subject.subjectSuffix}`;
        if (objectPrefix && !subjectObjectMap[key]) {
          subjectObjectMap[key] = objectPrefix;
        }
      });
      return subjectObjectMap;
    }
    function resolvePatientivoPrelocativeSubjectObjectTransfer({
      selection = {},
      subjectToObjectPrefix = null
    } = {}) {
      const subjectPrefix = String(selection?.subjectPrefix || "").trim();
      const subjectSuffix = String(selection?.subjectSuffix || "").trim();
      const key = `${subjectPrefix}|${subjectSuffix}`;
      const map = getPatientivoPrelocativeSubjectObjectMap(subjectToObjectPrefix);
      const objectPrefix = String(map[key] || "").trim();
      return {
        available: Boolean(objectPrefix),
        sourceState: "absolutive",
        sourceRole: "subject",
        sourcePrefix: subjectPrefix,
        sourceSuffix: subjectSuffix,
        sourceSubject: {
          subjectPrefix,
          subjectSuffix
        },
        objectPrefix,
        objectCase: "objective",
        objectLine: "mainline",
        label: objectPrefix ? `sujeto NNC > objeto ${objectPrefix}` : "sujeto NNC sin objeto configurado",
        diagnostics: objectPrefix ? [] : ["patientivo-prelocative-unmapped-subject"]
      };
    }
    function resolvePatientivoPrelocativeObjectTransfer({
      selection = {},
      possessorPrefix = "",
      possessiveToObjectPrefix = null,
      subjectToObjectPrefix = null
    } = {}) {
      const map = getPatientivoPrelocativePossessiveObjectMap(possessiveToObjectPrefix);
      const normalizedPossessor = String(possessorPrefix || "").trim();
      if (normalizedPossessor) {
        const objectPrefix = String(map[normalizedPossessor] || "").trim();
        return {
          available: Boolean(objectPrefix),
          sourceState: "possessive",
          sourceRole: "possessor",
          sourcePrefix: normalizedPossessor,
          objectPrefix,
          objectCase: "objective",
          objectLine: "mainline",
          label: objectPrefix ? `poseedor ${normalizedPossessor} > objeto ${objectPrefix}` : `poseedor ${normalizedPossessor} sin objeto configurado`,
          diagnostics: objectPrefix ? [] : ["patientivo-prelocative-unmapped-possessor"]
        };
      }
      return resolvePatientivoPrelocativeSubjectObjectTransfer({
        selection,
        subjectToObjectPrefix
      });
    }
    function buildPatientivoCharacteristicPropertyEmbedContinuationContract({
      characteristicSurface = "",
      sourceSurface = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      possessorPrefix = "",
      matrixRoot = DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const sourcePayload = getTypedCharacteristicPropertyEmbedSourcePayload(sourceContinuationFrame, {
        possessorPrefix
      });
      const normalizedCharacteristicSurface = String(characteristicSurface || "").trim();
      const displayEmbedSource = resolvePatientivoCharacteristicPropertyEmbedSource({
        characteristicSurface: normalizedCharacteristicSurface,
        possessorPrefix
      });
      const embedSource = sourcePayload?.embedSource || displayEmbedSource;
      const incorporatedRoot = embedSource.incorporatedRoot;
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("patientivo-characteristic-property-missing-typed-source-frame");
      }
      if (!sourcePayload?.characteristicStem) {
        diagnostics.push("patientivo-characteristic-property-missing-typed-characteristic-stem");
      }
      if (!incorporatedRoot) {
        diagnostics.push(...embedSource.diagnostics);
      }
      if (normalizedCharacteristicSurface && displayEmbedSource?.incorporatedRoot && incorporatedRoot && displayEmbedSource.incorporatedRoot !== incorporatedRoot) {
        diagnostics.push("patientivo-characteristic-property-display-surface-contradicts-source-frame");
      }
      const matrixSpec = resolvePatientivoCharacteristicPropertyMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundVerbInput = matrixSpec.supported && incorporatedRoot ? buildPatientivoCharacteristicPropertyEmbedVerbInput({
        incorporatedRoot,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("patientivo-characteristic-property-missing-verb-input");
      }
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildPatientivoCharacteristicPropertyTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        embedSource,
        compoundVerbInput
      });
      if (!resolvedTargetContinuationFrame) {
        diagnostics.push("patientivo-characteristic-property-missing-typed-target-frame");
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("patientivo-characteristic-property-target-source-frame-mismatch");
        }
        if (String(targetFrame.stem || "").trim() !== `${incorporatedRoot}${matrixSpec.supported ? matrixSpec.nawatRoot : ""}`) {
          diagnostics.push("patientivo-characteristic-property-target-stem-mismatch");
        }
        if (String(targetFrame.compoundVerbInput || targetFrame.targetInput || "").trim() !== compoundVerbInput) {
          diagnostics.push("patientivo-characteristic-property-target-input-mismatch");
        }
        if (String(targetFrame.objectPrefix || "").trim() !== String(embedSource.objectPrefix || "").trim()) {
          diagnostics.push("patientivo-characteristic-property-target-object-mismatch");
        }
        if (String(targetFrame.omittedSuffix || "").trim() !== String(embedSource.omittedSuffix || "").trim()) {
          diagnostics.push("patientivo-characteristic-property-target-suffix-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildPatientivoCharacteristicPropertyEmbedOperationFrame({
        embedSource,
        matrixSpec,
        sourceContinuationFrame,
        targetContinuationFrame: resolvedTargetContinuationFrame
      }) : null;
      const compoundRequest = buildPatientivoCharacteristicPropertyEmbedGenerationRequestFromOperationFrame(operationFrame);
      const formationFrame = resolvePatientivoCharacteristicPropertyFormationFrame({
        embedSource,
        matrixSpec,
        characteristicSurface: normalizedCharacteristicSurface,
        sourceSurface,
        compoundVerbInput,
        operationFrame
      });
      return attachDerivationContinuationGrammarContract({
        outputKind: "patientivo-characteristic-property-embed-continuation-contract",
        grammarSource: "Andrews 39.9",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        characteristicSurface: normalizedCharacteristicSurface,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        sourceState: embedSource.sourceState,
        sourceRole: embedSource.sourceRole,
        possessorPrefix: embedSource.possessorPrefix,
        omittedSuffix: embedSource.omittedSuffix || PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
        incorporatedRoot,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundVerbInput,
        objectPrefix: embedSource.objectPrefix || "ki",
        objectTransfer: embedSource.objectTransfer,
        compoundOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        compoundRequest,
        formationFrame,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildPatientivoPrelocativeContinuationContract({
      patientivoSurface = "",
      sourceSurface = "",
      selection = {},
      possessorPrefix = "",
      patientivoSource = "",
      sourceTenseValue = "",
      sourceCombinedMode = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      patientivoNominalSuffix = "",
      matrixRoot = DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT,
      possessiveToObjectPrefix = null,
      subjectToObjectPrefix = null
    } = {}) {
      const diagnostics = [];
      const typedSourcePayload = getTypedPatientivoContinuationSourceFramePayload(sourceContinuationFrame);
      const normalizedPatientivoSurface = String(patientivoSurface || "").trim();
      const displayIncorporatedRoot = stripPatientivoPrelocativeConnector(normalizedPatientivoSurface, {
        patientivoNominalSuffix
      });
      const incorporatedRoot = String(typedSourcePayload?.patientivoStem || "").trim();
      const normalizedPatientivoSource = String(patientivoSource || "").trim();
      const normalizedSourceCombinedMode = String(sourceCombinedMode || "").trim();
      const normalizedSourceTenseValue = String(sourceTenseValue || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("patientivo-prelocative-missing-typed-source-frame");
      }
      if (!incorporatedRoot) {
        diagnostics.push("patientivo-prelocative-missing-typed-patientive-stem");
      }
      if (normalizedPatientivoSurface && displayIncorporatedRoot && incorporatedRoot && displayIncorporatedRoot !== incorporatedRoot) {
        diagnostics.push("patientivo-prelocative-display-surface-contradicts-source-frame");
      }
      const objectTransfer = resolvePatientivoPrelocativeObjectTransfer({
        selection,
        possessorPrefix,
        possessiveToObjectPrefix,
        subjectToObjectPrefix
      });
      if (!objectTransfer.available) {
        diagnostics.push(...objectTransfer.diagnostics);
      }
      const matrixSpec = resolvePatientivoPrelocativeMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const matrixSourceCompatible = isPatientivoPrelocativeMatrixCompatibleWithSourceState(matrixSpec, objectTransfer.sourceState);
      if (matrixSpec.supported && !matrixSourceCompatible) {
        diagnostics.push("patientivo-prelocative-matrix-source-state-unsupported");
      }
      const prelocativeVerbInput = matrixSpec.supported && matrixSourceCompatible ? buildPatientivoPrelocativeVerbInput({
        incorporatedRoot,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!prelocativeVerbInput) {
        if (!matrixSpec.supported) {
          diagnostics.push("patientivo-prelocative-missing-verb-input");
        }
      }
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildPatientivoPrelocativeTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        objectTransfer,
        prelocativeVerbInput
      });
      if (!resolvedTargetContinuationFrame) {
        diagnostics.push("patientivo-prelocative-missing-typed-target-frame");
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("patientivo-prelocative-target-source-frame-mismatch");
        }
        if (String(targetFrame.stem || "").trim() !== `${incorporatedRoot}${matrixSpec.supported ? matrixSpec.nawatRoot : ""}`) {
          diagnostics.push("patientivo-prelocative-target-stem-mismatch");
        }
        if (String(targetFrame.prelocativeVerbInput || targetFrame.targetInput || "").trim() !== prelocativeVerbInput) {
          diagnostics.push("patientivo-prelocative-target-input-mismatch");
        }
        if (String(targetFrame.objectPrefix || "").trim() !== String(objectTransfer.objectPrefix || "").trim()) {
          diagnostics.push("patientivo-prelocative-target-object-mismatch");
        }
        if (String(targetFrame.sourceState || "").trim() !== String(objectTransfer.sourceState || "").trim()) {
          diagnostics.push("patientivo-prelocative-target-source-state-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildPatientivoPrelocativeOperationFrame({
        matrixSpec,
        objectTransfer,
        sourceContinuationFrame,
        targetContinuationFrame: resolvedTargetContinuationFrame
      }) : null;
      const prelocativeRequest = buildPatientivoPrelocativeGenerationRequestFromOperationFrame(operationFrame);
      const formationFrame = resolvePatientivoPrelocativeFormationFrame({
        matrixSpec,
        objectTransfer,
        incorporatedRoot,
        patientivoSurface: normalizedPatientivoSurface,
        sourceSurface,
        prelocativeVerbInput,
        operationFrame
      });
      return attachDerivationContinuationGrammarContract({
        outputKind: "patientivo-prelocative-continuation-contract",
        grammarSource: "Andrews 39.7-39.8",
        supported: uniqueDiagnostics.length === 0,
        patientivoSource: normalizedPatientivoSource,
        sourceTenseValue: normalizedSourceTenseValue,
        sourceCombinedMode: normalizedSourceCombinedMode,
        sourceState: objectTransfer.sourceState,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        patientivoSurface: normalizedPatientivoSurface,
        incorporatedRoot,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        matrixSourceCompatible,
        prelocativeVerbInput,
        objectTransfer,
        prelocativeOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        prelocativeRequest,
        formationFrame,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildPatientivoCompoundEmbedContinuationContract({
      patientivoSurface = "",
      sourceSurface = "",
      patientivoSource = "",
      sourceTenseValue = "",
      sourceCombinedMode = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      patientivoNominalSuffix = "",
      matrixRoot = DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const typedSourcePayload = getTypedPatientivoContinuationSourceFramePayload(sourceContinuationFrame);
      const normalizedPatientivoSurface = String(patientivoSurface || "").trim();
      const displayIncorporatedRoot = stripPatientivoPrelocativeConnector(normalizedPatientivoSurface, {
        patientivoNominalSuffix
      });
      const incorporatedRoot = String(typedSourcePayload?.patientivoStem || "").trim();
      const normalizedPatientivoSource = String(patientivoSource || "").trim();
      const normalizedSourceCombinedMode = String(sourceCombinedMode || "").trim();
      const normalizedSourceTenseValue = String(sourceTenseValue || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("patientivo-compound-embed-missing-typed-source-frame");
      }
      if (!incorporatedRoot) {
        diagnostics.push("patientivo-compound-embed-missing-typed-patientive-stem");
      }
      if (normalizedPatientivoSurface && displayIncorporatedRoot && incorporatedRoot && displayIncorporatedRoot !== incorporatedRoot) {
        diagnostics.push("patientivo-compound-embed-display-surface-contradicts-source-frame");
      }
      const matrixSpec = resolvePatientivoCompoundEmbedMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundVerbInput = matrixSpec.supported ? buildPatientivoCompoundEmbedVerbInput({
        incorporatedRoot,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("patientivo-compound-embed-missing-verb-input");
      }
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildPatientivoCompoundEmbedTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        compoundVerbInput
      });
      if (!resolvedTargetContinuationFrame) {
        diagnostics.push("patientivo-compound-embed-missing-typed-target-frame");
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("patientivo-compound-embed-target-source-frame-mismatch");
        }
        if (String(targetFrame.stem || "").trim() !== `${incorporatedRoot}${matrixSpec.supported ? matrixSpec.nawatRoot : ""}`) {
          diagnostics.push("patientivo-compound-embed-target-stem-mismatch");
        }
        if (String(targetFrame.compoundVerbInput || targetFrame.targetInput || "").trim() !== compoundVerbInput) {
          diagnostics.push("patientivo-compound-embed-target-input-mismatch");
        }
        if (String(targetFrame.objectPrefix || "").trim() !== (matrixSpec.matrixValency === "transitive" ? "ki" : "")) {
          diagnostics.push("patientivo-compound-embed-target-object-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildPatientivoCompoundEmbedOperationFrame({
        matrixSpec,
        sourceContinuationFrame,
        targetContinuationFrame: resolvedTargetContinuationFrame
      }) : null;
      const compoundRequest = buildPatientivoCompoundEmbedGenerationRequestFromOperationFrame(operationFrame);
      const formationFrame = resolvePatientivoCompoundEmbedFormationFrame({
        matrixSpec,
        incorporatedRoot,
        patientivoSurface,
        sourceSurface,
        compoundVerbInput,
        operationFrame
      });
      return attachDerivationContinuationGrammarContract({
        outputKind: "patientivo-compound-embed-continuation-contract",
        grammarSource: "Andrews 39.6",
        supported: uniqueDiagnostics.length === 0,
        patientivoSource: normalizedPatientivoSource,
        sourceTenseValue: normalizedSourceTenseValue,
        sourceCombinedMode: normalizedSourceCombinedMode,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        patientivoSurface: normalizedPatientivoSurface,
        incorporatedRoot,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundVerbInput,
        compoundOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        compoundRequest,
        formationFrame,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildPatientivoNominalCompoundContinuationContract({
      patientivoSurface = "",
      sourceSurface = "",
      patientivoSource = "",
      sourceTenseValue = "",
      sourceCombinedMode = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      patientivoNominalSuffix = "",
      matrixRoot = DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const typedSourcePayload = getTypedPatientivoNominalCompoundSourceFramePayload(sourceContinuationFrame);
      const normalizedPatientivoSurface = String(patientivoSurface || "").trim();
      const displayIncorporatedRoot = stripPatientivoPrelocativeConnector(normalizedPatientivoSurface, {
        patientivoNominalSuffix
      });
      const incorporatedRoot = String(typedSourcePayload?.patientivoStem || "").trim();
      const normalizedPatientivoSource = String(patientivoSource || "").trim();
      const normalizedSourceCombinedMode = String(sourceCombinedMode || "").trim();
      const normalizedSourceTenseValue = String(sourceTenseValue || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("patientivo-nominal-compound-missing-typed-source-frame");
      }
      if (!incorporatedRoot) {
        diagnostics.push("patientivo-nominal-compound-missing-typed-patientive-stem");
      }
      if (normalizedPatientivoSurface && displayIncorporatedRoot && incorporatedRoot && displayIncorporatedRoot !== incorporatedRoot) {
        diagnostics.push("patientivo-nominal-compound-display-surface-contradicts-source-frame");
      }
      const matrixSpec = resolvePatientivoNominalCompoundMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundStem = matrixSpec.supported ? buildPatientivoNominalCompoundStem({
        incorporatedRoot,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundStem && !matrixSpec.supported) {
        diagnostics.push("patientivo-nominal-compound-missing-nnc-input");
      }
      const ordinaryNncInput = compoundStem ? formatPatientivoNominalCompoundOrdinaryNncInput({
        compoundStem,
        nounClass: matrixSpec.nounClass || "zero"
      }) : "";
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildPatientivoNominalCompoundTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        compoundStem,
        ordinaryNncInput
      });
      if (!resolvedTargetContinuationFrame) {
        diagnostics.push("patientivo-nominal-compound-missing-typed-target-frame");
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("patientivo-nominal-compound-target-source-frame-mismatch");
        }
        if (String(targetFrame.stem || targetFrame.compoundStem || "").trim() !== compoundStem) {
          diagnostics.push("patientivo-nominal-compound-target-stem-mismatch");
        }
        if (String(targetFrame.ordinaryNncInput || targetFrame.targetInput || "").trim() !== ordinaryNncInput) {
          diagnostics.push("patientivo-nominal-compound-target-input-mismatch");
        }
        if (String(targetFrame.nounClass || "").trim() !== String(matrixSpec.nounClass || "zero").trim()) {
          diagnostics.push("patientivo-nominal-compound-target-class-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildPatientivoNominalCompoundOperationFrame({
        sourceContinuationFrame,
        matrixSpec,
        targetContinuationFrame: resolvedTargetContinuationFrame
      }) : null;
      const ordinaryNncRequest = buildPatientivoNominalCompoundOrdinaryNncRequestFromOperationFrame(operationFrame);
      const formationFrame = resolvePatientivoNominalCompoundFormationFrame({
        matrixSpec,
        incorporatedRoot,
        patientivoSurface: normalizedPatientivoSurface,
        sourceSurface,
        compoundStem,
        ordinaryNncInput
      });
      return attachDerivationContinuationGrammarContract({
        outputKind: "patientivo-nominal-compound-continuation-contract",
        grammarSource: "Andrews 39.6",
        supported: uniqueDiagnostics.length === 0,
        patientivoSource: normalizedPatientivoSource,
        sourceTenseValue: normalizedSourceTenseValue,
        sourceCombinedMode: normalizedSourceCombinedMode,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        patientivoSurface: normalizedPatientivoSurface,
        incorporatedRoot,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundStem,
        ordinaryNncInput,
        nominalCompoundOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        ordinaryNncRequest: ordinaryNncRequest.request,
        formationFrame,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildActiveActionCompoundEmbedContinuationContract({
      actionNominalSurface = "",
      sourceSurface = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      matrixRoot = DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const typedSourceSurface = getTypedDerivationContinuationFrameSurface(sourceContinuationFrame);
      const normalizedActionNominalSurface = typedSourceSurface;
      const displayActionNominalSurface = String(actionNominalSurface || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("active-action-compound-embed-missing-typed-source-frame");
      }
      if (displayActionNominalSurface && typedSourceSurface && displayActionNominalSurface !== typedSourceSurface) {
        diagnostics.push("active-action-compound-embed-display-surface-contradicts-source-frame");
      }
      if (!normalizedActionNominalSurface) {
        diagnostics.push("active-action-compound-embed-missing-typed-action-nominal-realization");
      }
      const matrixSpec = resolveActiveActionCompoundEmbedMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundVerbInput = matrixSpec.supported && normalizedActionNominalSurface ? buildActiveActionCompoundEmbedVerbInput({
        actionNominalSurface: normalizedActionNominalSurface,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("active-action-compound-embed-missing-verb-input");
      }
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildActiveActionCompoundEmbedTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        compoundVerbInput
      });
      if (!resolvedTargetContinuationFrame) {
        diagnostics.push("active-action-compound-embed-missing-typed-target-frame");
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildActiveActionCompoundEmbedOperationFrame({
        sourceContinuationFrame,
        matrixSpec,
        targetContinuationFrame: resolvedTargetContinuationFrame
      }) : null;
      const compoundRequest = buildActiveActionCompoundEmbedGenerationRequestFromOperationFrame(operationFrame);
      return attachDerivationContinuationGrammarContract({
        outputKind: "active-action-compound-embed-continuation-contract",
        grammarSource: "Andrews 37.5.4",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        actionNominalSurface: normalizedActionNominalSurface,
        incorporatedRoot: normalizedActionNominalSurface,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundVerbInput,
        compoundOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        compoundRequest,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildActiveActionNominalCompoundContinuationContract({
      actionNominalSurface = "",
      sourceSurface = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      matrixRoot = DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const typedSourceSurface = getTypedDerivationContinuationFrameSurface(sourceContinuationFrame);
      const normalizedActionNominalSurface = typedSourceSurface;
      const displayActionNominalSurface = String(actionNominalSurface || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("active-action-nominal-compound-missing-typed-source-frame");
      }
      if (displayActionNominalSurface && typedSourceSurface && displayActionNominalSurface !== typedSourceSurface) {
        diagnostics.push("active-action-nominal-compound-display-surface-contradicts-source-frame");
      }
      if (!normalizedActionNominalSurface) {
        diagnostics.push("active-action-nominal-compound-missing-typed-action-nominal-realization");
      }
      const matrixSpec = resolveActiveActionNominalCompoundMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundStem = matrixSpec.supported && normalizedActionNominalSurface ? buildActiveActionNominalCompoundStem({
        actionNominalSurface: normalizedActionNominalSurface,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundStem && !matrixSpec.supported) {
        diagnostics.push("active-action-nominal-compound-missing-nnc-input");
      }
      const ordinaryNncInput = compoundStem ? formatActiveActionNominalCompoundOrdinaryNncInput({
        compoundStem,
        nounClass: matrixSpec.nounClass || "zero"
      }) : "";
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildActiveActionNominalCompoundTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        compoundStem,
        ordinaryNncInput
      });
      if (!resolvedTargetContinuationFrame) {
        diagnostics.push("active-action-nominal-compound-missing-typed-target-frame");
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("active-action-nominal-compound-target-source-frame-mismatch");
        }
        if (String(targetFrame.stem || targetFrame.compoundStem || "").trim() !== compoundStem) {
          diagnostics.push("active-action-nominal-compound-target-stem-mismatch");
        }
        if (String(targetFrame.ordinaryNncInput || targetFrame.targetInput || "").trim() !== ordinaryNncInput) {
          diagnostics.push("active-action-nominal-compound-target-input-mismatch");
        }
        if (String(targetFrame.nounClass || "").trim() !== String(matrixSpec.nounClass || "zero").trim()) {
          diagnostics.push("active-action-nominal-compound-target-class-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildActiveActionNominalCompoundOperationFrame({
        sourceContinuationFrame,
        matrixSpec,
        targetContinuationFrame: resolvedTargetContinuationFrame
      }) : null;
      const ordinaryNncRequest = buildActiveActionNominalCompoundOrdinaryNncRequestFromOperationFrame(operationFrame);
      return attachDerivationContinuationGrammarContract({
        outputKind: "active-action-nominal-compound-continuation-contract",
        grammarSource: "Andrews 37.5.4",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        actionNominalSurface: normalizedActionNominalSurface,
        incorporatedRoot: normalizedActionNominalSurface,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundStem,
        ordinaryNncInput,
        nominalCompoundOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        ordinaryNncRequest: ordinaryNncRequest.request,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildPreteritAgentiveCompoundEmbedContinuationContract({
      preteritAgentiveStem = "",
      sourceSurface = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const typedPreteritAgentiveStem = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const normalizedPreteritAgentiveStem = typedPreteritAgentiveStem;
      const displayPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("preterit-agentive-compound-embed-missing-typed-source-frame");
      }
      if (displayPreteritAgentiveStem && typedPreteritAgentiveStem && displayPreteritAgentiveStem !== typedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-compound-embed-display-stem-contradicts-source-frame");
      }
      if (!normalizedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-compound-embed-missing-typed-general-use-stem");
      }
      const matrixSpec = resolvePreteritAgentiveCompoundEmbedMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundVerbInput = matrixSpec.supported && normalizedPreteritAgentiveStem ? buildPreteritAgentiveCompoundEmbedVerbInput({
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("preterit-agentive-compound-embed-missing-verb-input");
      }
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildPreteritAgentiveCompoundEmbedTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        compoundVerbInput
      });
      if (!resolvedTargetContinuationFrame) {
        if (matrixSpec.supported) {
          diagnostics.push("preterit-agentive-compound-embed-missing-typed-target-frame");
        }
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("preterit-agentive-compound-embed-target-source-frame-mismatch");
        }
        if (String(targetFrame.stem || "").trim() !== `${normalizedPreteritAgentiveStem}${matrixSpec.supported ? matrixSpec.nawatRoot : ""}`) {
          diagnostics.push("preterit-agentive-compound-embed-target-stem-mismatch");
        }
        if (String(targetFrame.compoundVerbInput || targetFrame.targetInput || "").trim() !== compoundVerbInput) {
          diagnostics.push("preterit-agentive-compound-embed-target-input-mismatch");
        }
        const expectedObjectPrefix = matrixSpec.matrixValency === "transitive" ? String(matrixSpec.objectPrefix || "ki").trim() || "ki" : "";
        if (String(targetFrame.objectPrefix || "").trim() !== expectedObjectPrefix) {
          diagnostics.push("preterit-agentive-compound-embed-target-object-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildPreteritAgentiveCompoundEmbedOperationFrame({
        sourceContinuationFrame,
        matrixSpec,
        targetContinuationFrame: resolvedTargetContinuationFrame
      }) : null;
      const compoundRequest = buildPreteritAgentiveCompoundEmbedGenerationRequestFromOperationFrame(operationFrame);
      return attachDerivationContinuationGrammarContract({
        outputKind: "preterit-agentive-compound-embed-continuation-contract",
        grammarSource: "Andrews 35.7",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        incorporatedRoot: normalizedPreteritAgentiveStem,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundVerbInput,
        compoundOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        compoundRequest,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildPreteritAgentiveNominalCompoundContinuationContract({
      preteritAgentiveStem = "",
      sourceSurface = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      matrixRoot = DEFAULT_PRETERIT_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const typedPreteritAgentiveStem = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const normalizedPreteritAgentiveStem = typedPreteritAgentiveStem;
      const displayPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("preterit-agentive-nominal-compound-missing-typed-source-frame");
      }
      if (displayPreteritAgentiveStem && typedPreteritAgentiveStem && displayPreteritAgentiveStem !== typedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-nominal-compound-display-stem-contradicts-source-frame");
      }
      if (!normalizedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-nominal-compound-missing-typed-general-use-stem");
      }
      const matrixSpec = resolvePreteritAgentiveNominalCompoundMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundStem = matrixSpec.supported && normalizedPreteritAgentiveStem ? buildPreteritAgentiveNominalCompoundStem({
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundStem && !matrixSpec.supported) {
        diagnostics.push("preterit-agentive-nominal-compound-missing-nnc-input");
      }
      const ordinaryNncInput = compoundStem ? formatPreteritAgentiveNominalCompoundOrdinaryNncInput({
        compoundStem,
        nounClass: matrixSpec.nounClass || "zero"
      }) : "";
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildPreteritAgentiveNominalCompoundTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        compoundStem,
        ordinaryNncInput
      });
      if (!resolvedTargetContinuationFrame) {
        if (matrixSpec.supported) {
          diagnostics.push("preterit-agentive-nominal-compound-missing-typed-target-frame");
        }
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("preterit-agentive-nominal-compound-target-source-frame-mismatch");
        }
        if (String(targetFrame.stem || targetFrame.compoundStem || "").trim() !== compoundStem) {
          diagnostics.push("preterit-agentive-nominal-compound-target-stem-mismatch");
        }
        if (String(targetFrame.ordinaryNncInput || targetFrame.targetInput || "").trim() !== ordinaryNncInput) {
          diagnostics.push("preterit-agentive-nominal-compound-target-input-mismatch");
        }
        if (String(targetFrame.nounClass || "").trim() !== String(matrixSpec.nounClass || "zero").trim()) {
          diagnostics.push("preterit-agentive-nominal-compound-target-class-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildPreteritAgentiveNominalCompoundOperationFrame({
        sourceContinuationFrame,
        matrixSpec,
        targetContinuationFrame: resolvedTargetContinuationFrame
      }) : null;
      const ordinaryNncRequest = buildPreteritAgentiveNominalCompoundOrdinaryNncRequestFromOperationFrame(operationFrame);
      return attachDerivationContinuationGrammarContract({
        outputKind: "preterit-agentive-nominal-compound-continuation-contract",
        grammarSource: "Andrews 35.7",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        incorporatedRoot: normalizedPreteritAgentiveStem,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundStem,
        ordinaryNncInput,
        nominalCompoundOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        ordinaryNncRequest: ordinaryNncRequest.request,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildCustomaryAgentiveNominalCompoundContinuationContract({
      customaryAgentiveStem = "",
      sourceSurface = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const typedCustomaryAgentiveStem = getTypedDerivationContinuationFramePredicateStem(sourceContinuationFrame);
      const normalizedCustomaryAgentiveStem = typedCustomaryAgentiveStem;
      const displayCustomaryAgentiveStem = String(customaryAgentiveStem || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("customary-agentive-nominal-compound-missing-typed-source-frame");
      }
      if (displayCustomaryAgentiveStem && typedCustomaryAgentiveStem && displayCustomaryAgentiveStem !== typedCustomaryAgentiveStem) {
        diagnostics.push("customary-agentive-nominal-compound-display-stem-contradicts-source-frame");
      }
      if (!normalizedCustomaryAgentiveStem) {
        diagnostics.push("customary-agentive-nominal-compound-missing-typed-customary-agentive-stem");
      }
      const matrixSpec = resolveCustomaryAgentiveNominalCompoundMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundStem = matrixSpec.supported && normalizedCustomaryAgentiveStem ? buildCustomaryAgentiveNominalCompoundStem({
        customaryAgentiveStem: normalizedCustomaryAgentiveStem,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundStem && !matrixSpec.supported) {
        diagnostics.push("customary-agentive-nominal-compound-missing-nnc-input");
      }
      const ordinaryNncInput = compoundStem ? formatCustomaryAgentiveNominalCompoundOrdinaryNncInput({
        compoundStem,
        nounClass: matrixSpec.nounClass || "zero"
      }) : "";
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildCustomaryAgentiveNominalCompoundTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        compoundStem,
        ordinaryNncInput
      });
      if (!resolvedTargetContinuationFrame) {
        if (matrixSpec.supported) {
          diagnostics.push("customary-agentive-nominal-compound-missing-typed-target-frame");
        }
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("customary-agentive-nominal-compound-target-source-frame-mismatch");
        }
        if (String(targetFrame.stem || targetFrame.compoundStem || "").trim() !== compoundStem) {
          diagnostics.push("customary-agentive-nominal-compound-target-stem-mismatch");
        }
        if (String(targetFrame.ordinaryNncInput || targetFrame.targetInput || "").trim() !== ordinaryNncInput) {
          diagnostics.push("customary-agentive-nominal-compound-target-input-mismatch");
        }
        if (String(targetFrame.nounClass || "").trim() !== String(matrixSpec.nounClass || "zero").trim()) {
          diagnostics.push("customary-agentive-nominal-compound-target-class-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildCustomaryAgentiveNominalCompoundOperationFrame({
        sourceContinuationFrame,
        matrixSpec,
        targetContinuationFrame: resolvedTargetContinuationFrame
      }) : null;
      const ordinaryNncRequest = buildCustomaryAgentiveNominalCompoundOrdinaryNncRequestFromOperationFrame(operationFrame);
      return attachDerivationContinuationGrammarContract({
        outputKind: "customary-agentive-nominal-compound-continuation-contract",
        grammarSource: "Andrews 36.3",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        customaryAgentiveStem: normalizedCustomaryAgentiveStem,
        incorporatedRoot: normalizedCustomaryAgentiveStem,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundStem,
        ordinaryNncInput,
        nominalCompoundOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        ordinaryNncRequest: ordinaryNncRequest.request,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildCustomaryAgentiveCompoundEmbedContinuationContract({
      customaryAgentiveStem = "",
      sourceSurface = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      matrixRoot = DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT,
      objectPrefix = ""
    } = {}) {
      const diagnostics = [];
      const typedCustomaryAgentiveStem = getTypedDerivationContinuationFramePredicateStem(sourceContinuationFrame);
      const normalizedCustomaryAgentiveStem = typedCustomaryAgentiveStem;
      const displayCustomaryAgentiveStem = String(customaryAgentiveStem || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("customary-agentive-compound-embed-missing-typed-source-frame");
      }
      if (displayCustomaryAgentiveStem && typedCustomaryAgentiveStem && displayCustomaryAgentiveStem !== typedCustomaryAgentiveStem) {
        diagnostics.push("customary-agentive-compound-embed-display-stem-contradicts-source-frame");
      }
      if (!normalizedCustomaryAgentiveStem) {
        diagnostics.push("customary-agentive-compound-embed-missing-typed-customary-agentive-stem");
      }
      const matrixSpec = resolveCustomaryAgentiveCompoundEmbedMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundVerbInput = matrixSpec.supported && normalizedCustomaryAgentiveStem ? buildCustomaryAgentiveCompoundEmbedVerbInput({
        customaryAgentiveStem: normalizedCustomaryAgentiveStem,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("customary-agentive-compound-embed-missing-verb-input");
      }
      const resolvedObjectPrefix = matrixSpec.matrixValency === "transitive" ? String(objectPrefix || matrixSpec.objectPrefix || "ki").trim() || "ki" : "";
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildCustomaryAgentiveCompoundEmbedTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        objectPrefix: resolvedObjectPrefix,
        compoundVerbInput
      });
      if (!resolvedTargetContinuationFrame) {
        if (matrixSpec.supported) {
          diagnostics.push("customary-agentive-compound-embed-missing-typed-target-frame");
        }
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("customary-agentive-compound-embed-target-source-frame-mismatch");
        }
        if (String(targetFrame.stem || "").trim() !== `${normalizedCustomaryAgentiveStem}${matrixSpec.supported ? matrixSpec.nawatRoot : ""}`) {
          diagnostics.push("customary-agentive-compound-embed-target-stem-mismatch");
        }
        if (String(targetFrame.compoundVerbInput || targetFrame.targetInput || "").trim() !== compoundVerbInput) {
          diagnostics.push("customary-agentive-compound-embed-target-input-mismatch");
        }
        if (String(targetFrame.objectPrefix || "").trim() !== resolvedObjectPrefix) {
          diagnostics.push("customary-agentive-compound-embed-target-object-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildCustomaryAgentiveCompoundEmbedOperationFrame({
        sourceContinuationFrame,
        matrixSpec,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        objectPrefix: resolvedObjectPrefix
      }) : null;
      const compoundRequest = buildCustomaryAgentiveCompoundEmbedGenerationRequestFromOperationFrame(operationFrame);
      return attachDerivationContinuationGrammarContract({
        outputKind: "customary-agentive-compound-embed-continuation-contract",
        grammarSource: matrixSpec.grammarSource || "Andrews 36.3",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        customaryAgentiveStem: normalizedCustomaryAgentiveStem,
        incorporatedRoot: normalizedCustomaryAgentiveStem,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        objectPrefix: resolvedObjectPrefix,
        compoundVerbInput,
        compoundOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        compoundRequest,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildPreteritAgentiveOwnerhoodContinuationContract({
      preteritAgentiveStem = "",
      sourceSurface = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      matrixRoot = DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const typedPreteritAgentiveStem = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const normalizedPreteritAgentiveStem = typedPreteritAgentiveStem;
      const displayPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("preterit-agentive-ownerhood-missing-typed-source-frame");
      }
      if (displayPreteritAgentiveStem && typedPreteritAgentiveStem && displayPreteritAgentiveStem !== typedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-ownerhood-display-stem-contradicts-source-frame");
      }
      if (!normalizedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-ownerhood-missing-typed-general-use-stem");
      }
      const matrixSpec = resolvePreteritAgentiveOwnerhoodMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const ownerhoodVerbInput = matrixSpec.supported && normalizedPreteritAgentiveStem ? buildPreteritAgentiveOwnerhoodVerbInput({
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!ownerhoodVerbInput && !matrixSpec.supported) {
        diagnostics.push("preterit-agentive-ownerhood-missing-verb-input");
      }
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildPreteritAgentiveOwnerhoodTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        ownerhoodVerbInput
      });
      if (!resolvedTargetContinuationFrame) {
        if (matrixSpec.supported) {
          diagnostics.push("preterit-agentive-ownerhood-missing-typed-target-frame");
        }
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        const targetFrameStem = String(targetFrame.stem || "").trim();
        const expectedTargetStem = `${normalizedPreteritAgentiveStem}${matrixSpec.supported ? matrixSpec.nawatRoot : ""}`;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("preterit-agentive-ownerhood-target-source-frame-mismatch");
        }
        if (targetFrameStem !== expectedTargetStem) {
          diagnostics.push("preterit-agentive-ownerhood-target-stem-mismatch");
        }
        if (String(targetFrame.ownerhoodVerbInput || targetFrame.targetInput || "").trim() !== ownerhoodVerbInput) {
          diagnostics.push("preterit-agentive-ownerhood-target-input-mismatch");
        }
        if (targetFrameStem === expectedTargetStem && targetFrame.parsedVerb?.sourceRawVerb !== targetFrameStem) {
          diagnostics.push("preterit-agentive-ownerhood-target-parse-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildPreteritAgentiveOwnerhoodOperationFrame({
        sourceContinuationFrame,
        matrixSpec,
        targetContinuationFrame: resolvedTargetContinuationFrame
      }) : null;
      const ownerhoodRequest = buildPreteritAgentiveOwnerhoodGenerationRequestFromOperationFrame(operationFrame);
      return attachDerivationContinuationGrammarContract({
        outputKind: "preterit-agentive-ownerhood-continuation-contract",
        grammarSource: matrixSpec.grammarSource || "Andrews 35.9-35.10",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        incorporatedRoot: normalizedPreteritAgentiveStem,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        surfaceMatrix: matrixSpec.surfaceMatrix || "",
        ownerhoodKind: matrixSpec.ownerhoodKind || "",
        matrix: matrixSpec,
        ownerhoodVerbInput,
        ownerhoodOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame || null,
        ownerhoodRequest,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildPreteritAgentiveComplementContinuationContract({
      preteritAgentiveStem = "",
      sourceSurface = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      matrixRoot = DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT,
      objectPrefix = ""
    } = {}) {
      const diagnostics = [];
      const typedPreteritAgentiveStem = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const normalizedPreteritAgentiveStem = typedPreteritAgentiveStem;
      const displayPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("preterit-agentive-complement-missing-typed-source-frame");
      }
      if (displayPreteritAgentiveStem && typedPreteritAgentiveStem && displayPreteritAgentiveStem !== typedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-complement-display-stem-contradicts-source-frame");
      }
      if (!normalizedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-complement-missing-typed-general-use-stem");
      }
      const matrixSpec = resolvePreteritAgentiveComplementMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const complementVerbInput = matrixSpec.supported && normalizedPreteritAgentiveStem ? buildPreteritAgentiveComplementVerbInput({
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!complementVerbInput && !matrixSpec.supported) {
        diagnostics.push("preterit-agentive-complement-missing-verb-input");
      }
      const resolvedObjectPrefix = String(objectPrefix || matrixSpec.objectPrefix || "ki").trim() || "ki";
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildPreteritAgentiveComplementTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        objectPrefix: resolvedObjectPrefix,
        complementVerbInput
      });
      if (!resolvedTargetContinuationFrame) {
        if (matrixSpec.supported) {
          diagnostics.push("preterit-agentive-complement-missing-typed-target-frame");
        }
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        const targetFrameStem = String(targetFrame.stem || "").trim();
        const expectedTargetStem = `${normalizedPreteritAgentiveStem}${matrixSpec.supported ? matrixSpec.nawatRoot : ""}`;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("preterit-agentive-complement-target-source-frame-mismatch");
        }
        if (targetFrameStem !== expectedTargetStem) {
          diagnostics.push("preterit-agentive-complement-target-stem-mismatch");
        }
        if (String(targetFrame.complementVerbInput || targetFrame.targetInput || "").trim() !== complementVerbInput) {
          diagnostics.push("preterit-agentive-complement-target-input-mismatch");
        }
        if (String(targetFrame.objectPrefix || "").trim() !== resolvedObjectPrefix) {
          diagnostics.push("preterit-agentive-complement-target-object-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildPreteritAgentiveComplementOperationFrame({
        sourceContinuationFrame,
        matrixSpec,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        objectPrefix: resolvedObjectPrefix
      }) : null;
      const complementRequest = buildPreteritAgentiveComplementGenerationRequestFromOperationFrame(operationFrame);
      return attachDerivationContinuationGrammarContract({
        outputKind: "preterit-agentive-complement-continuation-contract",
        grammarSource: matrixSpec.grammarSource || "Andrews 35.12",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        incorporatedRoot: normalizedPreteritAgentiveStem,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame || null,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        objectPrefix: resolvedObjectPrefix,
        complementVerbInput,
        complementOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        complementRequest,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildPreteritAgentiveAdverbialContinuationContract({
      preteritAgentiveStem = "",
      sourceSurface = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      matrixRoot = DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT,
      objectPrefix = ""
    } = {}) {
      const diagnostics = [];
      const typedPreteritAgentiveStem = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame(sourceContinuationFrame);
      const normalizedPreteritAgentiveStem = typedPreteritAgentiveStem;
      const displayPreteritAgentiveStem = String(preteritAgentiveStem || "").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("preterit-agentive-adverbial-missing-typed-source-frame");
      }
      if (displayPreteritAgentiveStem && typedPreteritAgentiveStem && displayPreteritAgentiveStem !== typedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-adverbial-display-stem-contradicts-source-frame");
      }
      if (!normalizedPreteritAgentiveStem) {
        diagnostics.push("preterit-agentive-adverbial-missing-typed-general-use-stem");
      }
      const matrixSpec = resolvePreteritAgentiveAdverbialMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const adverbialVerbInput = matrixSpec.supported && normalizedPreteritAgentiveStem ? buildPreteritAgentiveAdverbialVerbInput({
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!adverbialVerbInput && !matrixSpec.supported) {
        diagnostics.push("preterit-agentive-adverbial-missing-verb-input");
      }
      const resolvedObjectPrefix = matrixSpec.matrixValency === "transitive" ? String(objectPrefix || "ki").trim() || "ki" : "";
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildPreteritAgentiveAdverbialTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        objectPrefix: resolvedObjectPrefix,
        adverbialVerbInput
      });
      if (!resolvedTargetContinuationFrame) {
        if (matrixSpec.supported) {
          diagnostics.push("preterit-agentive-adverbial-missing-typed-target-frame");
        }
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        const targetFrameStem = String(targetFrame.stem || "").trim();
        const expectedTargetStem = `${normalizedPreteritAgentiveStem}${matrixSpec.supported ? matrixSpec.nawatRoot : ""}`;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("preterit-agentive-adverbial-target-source-frame-mismatch");
        }
        if (targetFrameStem !== expectedTargetStem) {
          diagnostics.push("preterit-agentive-adverbial-target-stem-mismatch");
        }
        if (String(targetFrame.adverbialVerbInput || targetFrame.targetInput || "").trim() !== adverbialVerbInput) {
          diagnostics.push("preterit-agentive-adverbial-target-input-mismatch");
        }
        if (String(targetFrame.objectPrefix || "").trim() !== resolvedObjectPrefix) {
          diagnostics.push("preterit-agentive-adverbial-target-object-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildPreteritAgentiveAdverbialOperationFrame({
        sourceContinuationFrame,
        matrixSpec,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        objectPrefix: resolvedObjectPrefix
      }) : null;
      const adverbialRequest = buildPreteritAgentiveAdverbialGenerationRequestFromOperationFrame(operationFrame);
      return attachDerivationContinuationGrammarContract({
        outputKind: "preterit-agentive-adverbial-continuation-contract",
        grammarSource: matrixSpec.grammarSource || "Andrews 35.12",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        preteritAgentiveStem: normalizedPreteritAgentiveStem,
        incorporatedRoot: normalizedPreteritAgentiveStem,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame || null,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        adverbialFocus: matrixSpec.adverbialFocus || "",
        objectPrefix: resolvedObjectPrefix,
        adverbialVerbInput,
        adverbialOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        adverbialRequest,
        diagnostics: uniqueDiagnostics
      });
    }
    function buildOrdinaryNounOwnerhoodContinuationContract({
      nounStem = "",
      nounClass = "",
      sourceSurface = "",
      sourceKind = "",
      sourceFormulaSlots = null,
      sourceFormulaEcho = "",
      sourceContinuationFrame = null,
      targetContinuationFrame = null,
      matrixRoot = "",
      ownerhoodKind = "ownerhood"
    } = {}) {
      const diagnostics = [];
      const typedSourcePayload = getTypedOrdinaryNounOwnerhoodSourceFramePayload(sourceContinuationFrame);
      const normalizedNounStem = typedSourcePayload.nounStem;
      const normalizedClass = typedSourcePayload.nounClass;
      const displayNounStem = String(nounStem || "").trim();
      const displayNounClass = normalizeOrdinaryNounOwnerhoodNounClass(nounClass);
      const normalizedKind = String(ownerhoodKind || "ownerhood").trim();
      if (!isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame)) {
        diagnostics.push("ordinary-noun-ownerhood-missing-typed-source-frame");
      }
      if (displayNounStem && normalizedNounStem && displayNounStem !== normalizedNounStem) {
        diagnostics.push("ordinary-noun-ownerhood-display-stem-contradicts-source-frame");
      }
      if (displayNounClass && normalizedClass && displayNounClass !== normalizedClass) {
        diagnostics.push("ordinary-noun-ownerhood-display-class-contradicts-source-frame");
      }
      if (!normalizedNounStem) {
        diagnostics.push("ordinary-noun-ownerhood-missing-typed-noun-stem");
      }
      if (!normalizedClass) {
        diagnostics.push("ordinary-noun-ownerhood-missing-typed-noun-class");
      }
      const resolvedMatrixRoot = String(matrixRoot || "").trim() || resolveOrdinaryNounOwnerhoodDefaultMatrixRoot({
        nounClass: normalizedClass,
        ownerhoodKind: normalizedKind
      });
      if (!resolvedMatrixRoot && normalizedClass === "ti" && normalizedKind !== "abundant-ownerhood") {
        diagnostics.push("ordinary-noun-ownerhood-ambiguous-ti-class");
      }
      const matrixSpec = resolveOrdinaryNounOwnerhoodMatrixSpec(resolvedMatrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const classIsAllowed = isOrdinaryNounOwnerhoodMatrixCompatibleWithNounClass(matrixSpec, normalizedClass);
      if (matrixSpec.supported && !classIsAllowed) {
        diagnostics.push("ordinary-noun-ownerhood-class-matrix-mismatch");
      }
      const ownerhoodVerbInput = matrixSpec.supported && classIsAllowed && normalizedNounStem ? buildOrdinaryNounOwnerhoodVerbInput({
        nounStem: normalizedNounStem,
        nounClass: normalizedClass,
        matrixRoot: matrixSpec.nawatRoot,
        ownerhoodKind: normalizedKind
      }) : "";
      if (!ownerhoodVerbInput && (!matrixSpec.supported || !classIsAllowed)) {
        diagnostics.push("ordinary-noun-ownerhood-missing-verb-input");
      }
      const resolvedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object" && targetContinuationFrame.kind === "andrews-typed-operation-continuation-frame" ? targetContinuationFrame : buildOrdinaryNounOwnerhoodTargetContinuationFrame({
        sourceContinuationFrame,
        matrixSpec,
        ownerhoodKind: normalizedKind,
        ownerhoodVerbInput
      });
      if (!resolvedTargetContinuationFrame) {
        if (matrixSpec.supported && classIsAllowed) {
          diagnostics.push("ordinary-noun-ownerhood-missing-typed-target-frame");
        }
      } else {
        const targetFrame = resolvedTargetContinuationFrame.targetFrame || {};
        const targetSourceFrame = resolvedTargetContinuationFrame.sourceFrame || null;
        const targetFrameStem = String(targetFrame.stem || "").trim();
        const expectedTargetStem = `${normalizedNounStem}${matrixSpec.supported ? matrixSpec.nawatRoot : ""}`;
        if (targetSourceFrame && targetSourceFrame !== sourceContinuationFrame) {
          diagnostics.push("ordinary-noun-ownerhood-target-source-frame-mismatch");
        }
        if (targetFrameStem !== expectedTargetStem) {
          diagnostics.push("ordinary-noun-ownerhood-target-stem-mismatch");
        }
        if (String(targetFrame.ownerhoodVerbInput || targetFrame.targetInput || "").trim() !== ownerhoodVerbInput) {
          diagnostics.push("ordinary-noun-ownerhood-target-input-mismatch");
        }
        if (normalizeOrdinaryNounOwnerhoodNounClass(targetFrame.nounClass) !== normalizedClass) {
          diagnostics.push("ordinary-noun-ownerhood-target-class-mismatch");
        }
        if (targetFrameStem === expectedTargetStem && targetFrame.parsedVerb?.sourceRawVerb !== targetFrameStem) {
          diagnostics.push("ordinary-noun-ownerhood-target-parse-mismatch");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      const operationFrame = uniqueDiagnostics.length === 0 ? buildOrdinaryNounOwnerhoodOperationFrame({
        sourceContinuationFrame,
        matrixSpec,
        targetContinuationFrame: resolvedTargetContinuationFrame,
        ownerhoodKind: normalizedKind
      }) : null;
      const ownerhoodRequest = buildOrdinaryNounOwnerhoodGenerationRequestFromOperationFrame(operationFrame);
      return attachDerivationContinuationGrammarContract({
        outputKind: "ordinary-noun-ownerhood-continuation-contract",
        grammarSource: matrixSpec.grammarSource || "Andrews 35.9-35.10",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        sourceKind: String(sourceKind || "").trim(),
        sourceFormulaSlots: sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        evidenceStatus: String(typedSourcePayload.sourceKind || sourceKind || "").trim() === "fixture" ? "source-fixture-backed" : "structural-open-stem",
        nounStem: normalizedNounStem,
        incorporatedRoot: normalizedNounStem,
        nounClass: normalizedClass,
        sourceContinuationFrame: isGeneratedOutputTypedDerivationContinuationFrame(sourceContinuationFrame) ? sourceContinuationFrame : null,
        targetContinuationFrame: resolvedTargetContinuationFrame || null,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : resolvedMatrixRoot,
        surfaceMatrix: matrixSpec.surfaceMatrix || "",
        ownerhoodKind: matrixSpec.ownerhoodKind || normalizedKind,
        matrix: matrixSpec,
        ownerhoodVerbInput,
        ownerhoodOperationFrame: operationFrame,
        typedOperationFrame: operationFrame,
        ownerhoodRequest,
        diagnostics: uniqueDiagnostics
      });
    }

    const api = {};
    api.buildNonactiveSourceChain = buildNonactiveSourceChain;
    api.buildFullDerivationSourceChain = buildFullDerivationSourceChain;
    Object.defineProperty(api, "FULL_SOURCE_CHAIN_REALIZATION_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return FULL_SOURCE_CHAIN_REALIZATION_POLICY; },
        set(value) { FULL_SOURCE_CHAIN_REALIZATION_POLICY = value; },
    });
    Object.defineProperty(api, "PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY; },
    });
    Object.defineProperty(api, "PATIENTIVO_PERFECTIVO_SOURCE_CHAIN_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_PERFECTIVO_SOURCE_CHAIN_POLICY; },
    });
    Object.defineProperty(api, "SUSTANTIVO_VERBAL_SOURCE_CHAIN_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return SUSTANTIVO_VERBAL_SOURCE_CHAIN_POLICY; },
    });
    Object.defineProperty(api, "CALIFICATIVO_INSTRUMENTIVO_SOURCE_CHAIN_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return CALIFICATIVO_INSTRUMENTIVO_SOURCE_CHAIN_POLICY; },
    });
    api.getDerivationContinuationContractTargetInput = getDerivationContinuationContractTargetInput;
    api.isGeneratedOutputTypedDerivationContinuationFrame = isGeneratedOutputTypedDerivationContinuationFrame;
    api.normalizeTypedDerivationContinuationSurface = normalizeTypedDerivationContinuationSurface;
    api.getTypedDerivationContinuationFrameSurface = getTypedDerivationContinuationFrameSurface;
    api.getTypedDerivationContinuationFramePredicateStem = getTypedDerivationContinuationFramePredicateStem;
    api.getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame = getTypedPreteritAgentiveGeneralUseStemFromContinuationFrame;
    api.buildActiveActionCompoundEmbedTargetContinuationFrame = buildActiveActionCompoundEmbedTargetContinuationFrame;
    api.normalizeDerivationContinuationContractSurface = normalizeDerivationContinuationContractSurface;
    api.splitDerivationContinuationContractSurface = splitDerivationContinuationContractSurface;
    api.getDerivationContinuationContractGrammarFrame = getDerivationContinuationContractGrammarFrame;
    api.getDerivationContinuationContractResultFrame = getDerivationContinuationContractResultFrame;
    api.getDerivationContinuationContractSourceInput = getDerivationContinuationContractSourceInput;
    api.getDerivationContinuationContractAndrewsRefs = getDerivationContinuationContractAndrewsRefs;
    api.getDerivationContinuationSourceAdjunctSurface = getDerivationContinuationSourceAdjunctSurface;
    api.getDerivationContinuationSourceAdjunctKind = getDerivationContinuationSourceAdjunctKind;
    api.getDerivationContinuationEmbedRole = getDerivationContinuationEmbedRole;
    api.getDerivationContinuationEmbeddedRoot = getDerivationContinuationEmbeddedRoot;
    api.getDerivationContinuationMatrixValence = getDerivationContinuationMatrixValence;
    api.getDerivationContinuationMatrixFrame = getDerivationContinuationMatrixFrame;
    api.getDerivationContinuationFinalFormulaShape = getDerivationContinuationFinalFormulaShape;
    api.getDerivationContinuationSourceExternalObjectSlots = getDerivationContinuationSourceExternalObjectSlots;
    api.getDerivationContinuationRemainingExternalObjectSlots = getDerivationContinuationRemainingExternalObjectSlots;
    api.getDerivationContinuationConsumedObjectSlot = getDerivationContinuationConsumedObjectSlot;
    api.buildDerivationContinuationObjectSlotOwnershipFrame = buildDerivationContinuationObjectSlotOwnershipFrame;
    api.buildDerivationContinuationIncorporationRouteFrame = buildDerivationContinuationIncorporationRouteFrame;
    api.getDerivationContinuationDiagnosticLayerContract = getDerivationContinuationDiagnosticLayerContract;
    api.normalizeDerivationContinuationDiagnosticEntries = normalizeDerivationContinuationDiagnosticEntries;
    api.attachDerivationContinuationGrammarContract = attachDerivationContinuationGrammarContract;
    api.normalizeDerivationSourceOuterPiece = normalizeDerivationSourceOuterPiece;
    api.isCurrentRegexDerivationSourceParseTree = isCurrentRegexDerivationSourceParseTree;
    api.buildCurrentRegexDerivationSourceParseTreeFromParseOperationFrame = buildCurrentRegexDerivationSourceParseTreeFromParseOperationFrame;
    api.buildCurrentRegexDerivationSourceParseTree = buildCurrentRegexDerivationSourceParseTree;
    api.normalizeCurrentRegexDerivationSourceParseTree = normalizeCurrentRegexDerivationSourceParseTree;
    api.getCurrentRegexDerivationSourceModelSignature = getCurrentRegexDerivationSourceModelSignature;
    api.buildCurrentRegexDerivationSourceModelTargetFrame = buildCurrentRegexDerivationSourceModelTargetFrame;
    api.buildCurrentRegexDerivationSourceModelOperationFrame = buildCurrentRegexDerivationSourceModelOperationFrame;
    api.getCurrentRegexDerivationSourceModelOperationMismatch = getCurrentRegexDerivationSourceModelOperationMismatch;
    api.buildCurrentRegexDerivationSourceModel = buildCurrentRegexDerivationSourceModel;
    api.buildCurrentRegexDerivationSourceModelFromParseTree = buildCurrentRegexDerivationSourceModelFromParseTree;
    api.buildFallbackDerivationSourceModel = buildFallbackDerivationSourceModel;
    api.buildDerivationSourceModel = buildDerivationSourceModel;
    api.getDerivationSourceOuterSurface = getDerivationSourceOuterSurface;
    api.buildSupportivePrecedingSurfaceFromVerbMeta = buildSupportivePrecedingSurfaceFromVerbMeta;
    api.buildSupportivePrecedingSurfaceFromMorphologyInput = buildSupportivePrecedingSurfaceFromMorphologyInput;
    api.getCurrentRegexStructuralOccupiedLexicalSourceSlots = getCurrentRegexStructuralOccupiedLexicalSourceSlots;
    api.getDerivationSourceChainPrefixParts = getDerivationSourceChainPrefixParts;
    api.getDerivationSourceChainCorePrefixParts = getDerivationSourceChainCorePrefixParts;
    api.applySourceChainStemSpecByPolicy = applySourceChainStemSpecByPolicy;
    api.realizeSourceChainStemByPolicy = realizeSourceChainStemByPolicy;
    api.getNonactiveDerivationSource = getNonactiveDerivationSource;
    api.getNonactiveSourceChainPrefixParts = getNonactiveSourceChainPrefixParts;
    api.applyNonactiveSourceChainStemSpec = applyNonactiveSourceChainStemSpec;
    api.realizeNonactiveSourceChainStem = realizeNonactiveSourceChainStem;
    api.buildPatientivoImperfectiveSourceChain = buildPatientivoImperfectiveSourceChain;
    api.resolvePatientivoImperfectiveBaseStemSpec = resolvePatientivoImperfectiveBaseStemSpec;
    api.applyPatientivoImperfectiveSourceChainStemSpec = applyPatientivoImperfectiveSourceChainStemSpec;
    api.realizePatientivoImperfectiveSourceChainStem = realizePatientivoImperfectiveSourceChainStem;
    Object.defineProperty(api, "DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "PATIENTIVO_PRELOCATIVE_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_PRELOCATIVE_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX; },
    });
    Object.defineProperty(api, "PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX; },
    });
    Object.defineProperty(api, "DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return ACTIVE_ACTION_COMPOUND_EMBED_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return ACTIVE_ACTION_NOMINAL_COMPOUND_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "DEFAULT_PRETERIT_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PRETERIT_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "DEFAULT_PRETERIT_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PRETERIT_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "DEFAULT_CUSTOMARY_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_CUSTOMARY_AGENTIVE_NOMINAL_COMPOUND_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return CUSTOMARY_AGENTIVE_COMPOUND_EMBED_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return PRETERIT_AGENTIVE_OWNERHOOD_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return PRETERIT_AGENTIVE_COMPLEMENT_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return PRETERIT_AGENTIVE_ADVERBIAL_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "ORDINARY_NOUN_OWNERHOOD_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return ORDINARY_NOUN_OWNERHOOD_MATRIX_SPECS; },
    });
    api.getPatientivoPrelocativeMatrixInventory = getPatientivoPrelocativeMatrixInventory;
    api.resolvePatientivoPrelocativeMatrixSpec = resolvePatientivoPrelocativeMatrixSpec;
    api.resolvePatientivoPrelocativeConnectorSuffix = resolvePatientivoPrelocativeConnectorSuffix;
    api.getPatientivoCompoundEmbedMatrixInventory = getPatientivoCompoundEmbedMatrixInventory;
    api.getPatientivoNominalCompoundMatrixInventory = getPatientivoNominalCompoundMatrixInventory;
    api.getPatientivoCharacteristicPropertyMatrixInventory = getPatientivoCharacteristicPropertyMatrixInventory;
    api.getActiveActionCompoundEmbedMatrixInventory = getActiveActionCompoundEmbedMatrixInventory;
    api.getActiveActionNominalCompoundMatrixInventory = getActiveActionNominalCompoundMatrixInventory;
    api.getPreteritAgentiveCompoundEmbedMatrixInventory = getPreteritAgentiveCompoundEmbedMatrixInventory;
    api.getPreteritAgentiveNominalCompoundMatrixInventory = getPreteritAgentiveNominalCompoundMatrixInventory;
    api.getCustomaryAgentiveCompoundEmbedMatrixInventory = getCustomaryAgentiveCompoundEmbedMatrixInventory;
    api.getCustomaryAgentiveNominalCompoundMatrixInventory = getCustomaryAgentiveNominalCompoundMatrixInventory;
    api.getPreteritAgentiveOwnerhoodMatrixInventory = getPreteritAgentiveOwnerhoodMatrixInventory;
    api.getPreteritAgentiveComplementMatrixInventory = getPreteritAgentiveComplementMatrixInventory;
    api.getPreteritAgentiveAdverbialMatrixInventory = getPreteritAgentiveAdverbialMatrixInventory;
    api.getOrdinaryNounOwnerhoodMatrixInventory = getOrdinaryNounOwnerhoodMatrixInventory;
    api.resolvePatientivoCompoundEmbedMatrixSpec = resolvePatientivoCompoundEmbedMatrixSpec;
    api.resolvePatientivoNominalCompoundMatrixSpec = resolvePatientivoNominalCompoundMatrixSpec;
    api.resolvePatientivoCharacteristicPropertyMatrixSpec = resolvePatientivoCharacteristicPropertyMatrixSpec;
    api.resolveActiveActionCompoundEmbedMatrixSpec = resolveActiveActionCompoundEmbedMatrixSpec;
    api.resolveActiveActionNominalCompoundMatrixSpec = resolveActiveActionNominalCompoundMatrixSpec;
    api.resolvePreteritAgentiveCompoundEmbedMatrixSpec = resolvePreteritAgentiveCompoundEmbedMatrixSpec;
    api.resolvePreteritAgentiveNominalCompoundMatrixSpec = resolvePreteritAgentiveNominalCompoundMatrixSpec;
    api.resolveCustomaryAgentiveCompoundEmbedMatrixSpec = resolveCustomaryAgentiveCompoundEmbedMatrixSpec;
    api.resolveCustomaryAgentiveNominalCompoundMatrixSpec = resolveCustomaryAgentiveNominalCompoundMatrixSpec;
    api.resolvePreteritAgentiveOwnerhoodMatrixSpec = resolvePreteritAgentiveOwnerhoodMatrixSpec;
    api.resolvePreteritAgentiveComplementMatrixSpec = resolvePreteritAgentiveComplementMatrixSpec;
    api.resolvePreteritAgentiveAdverbialMatrixSpec = resolvePreteritAgentiveAdverbialMatrixSpec;
    api.normalizeOrdinaryNounOwnerhoodNounClass = normalizeOrdinaryNounOwnerhoodNounClass;
    api.resolveOrdinaryNounOwnerhoodMatrixSpec = resolveOrdinaryNounOwnerhoodMatrixSpec;
    api.resolveOrdinaryNounOwnerhoodDefaultMatrixRoot = resolveOrdinaryNounOwnerhoodDefaultMatrixRoot;
    api.isOrdinaryNounOwnerhoodMatrixCompatibleWithNounClass = isOrdinaryNounOwnerhoodMatrixCompatibleWithNounClass;
    api.buildPatientivoCompoundEmbedVerbInput = buildPatientivoCompoundEmbedVerbInput;
    api.getTypedPatientivoContinuationSourceFramePayload = getTypedPatientivoContinuationSourceFramePayload;
    api.buildPatientivoCompoundEmbedTargetContinuationFrame = buildPatientivoCompoundEmbedTargetContinuationFrame;
    api.buildPatientivoCompoundEmbedOperationFrame = buildPatientivoCompoundEmbedOperationFrame;
    api.isPatientivoCompoundEmbedOperationFrame = isPatientivoCompoundEmbedOperationFrame;
    api.buildPatientivoCompoundEmbedGenerationRequestFromOperationFrame = buildPatientivoCompoundEmbedGenerationRequestFromOperationFrame;
    api.resolvePatientivoCompoundEmbedFormationFrame = resolvePatientivoCompoundEmbedFormationFrame;
    api.buildPatientivoNominalCompoundStem = buildPatientivoNominalCompoundStem;
    api.formatPatientivoNominalCompoundOrdinaryNncInput = formatPatientivoNominalCompoundOrdinaryNncInput;
    api.buildNominalCompoundOrdinaryNncRequest = buildNominalCompoundOrdinaryNncRequest;
    api.stripPatientivoCharacteristicPropertySuffix = stripPatientivoCharacteristicPropertySuffix;
    api.resolvePatientivoCharacteristicPropertyEmbedSource = resolvePatientivoCharacteristicPropertyEmbedSource;
    api.buildPatientivoCharacteristicPropertyEmbedVerbInput = buildPatientivoCharacteristicPropertyEmbedVerbInput;
    api.getTypedCharacteristicPropertyEmbedSourcePayload = getTypedCharacteristicPropertyEmbedSourcePayload;
    api.buildPatientivoCharacteristicPropertyTargetContinuationFrame = buildPatientivoCharacteristicPropertyTargetContinuationFrame;
    api.buildPatientivoCharacteristicPropertyEmbedOperationFrame = buildPatientivoCharacteristicPropertyEmbedOperationFrame;
    api.isPatientivoCharacteristicPropertyEmbedOperationFrame = isPatientivoCharacteristicPropertyEmbedOperationFrame;
    api.buildPatientivoCharacteristicPropertyEmbedGenerationRequestFromOperationFrame = buildPatientivoCharacteristicPropertyEmbedGenerationRequestFromOperationFrame;
    api.resolvePatientivoCharacteristicPropertyFormationFrame = resolvePatientivoCharacteristicPropertyFormationFrame;
    api.buildActiveActionCompoundEmbedVerbInput = buildActiveActionCompoundEmbedVerbInput;
    api.buildActiveActionCompoundEmbedOperationFrame = buildActiveActionCompoundEmbedOperationFrame;
    api.isActiveActionCompoundEmbedOperationFrame = isActiveActionCompoundEmbedOperationFrame;
    api.buildActiveActionCompoundEmbedGenerationRequestFromOperationFrame = buildActiveActionCompoundEmbedGenerationRequestFromOperationFrame;
    api.buildActiveActionNominalCompoundStem = buildActiveActionNominalCompoundStem;
    api.buildActiveActionNominalCompoundTargetContinuationFrame = buildActiveActionNominalCompoundTargetContinuationFrame;
    api.buildActiveActionNominalCompoundOperationFrame = buildActiveActionNominalCompoundOperationFrame;
    api.isActiveActionNominalCompoundOperationFrame = isActiveActionNominalCompoundOperationFrame;
    api.buildActiveActionNominalCompoundOrdinaryNncRequestFromOperationFrame = buildActiveActionNominalCompoundOrdinaryNncRequestFromOperationFrame;
    api.buildCustomaryAgentiveNominalCompoundTargetContinuationFrame = buildCustomaryAgentiveNominalCompoundTargetContinuationFrame;
    api.buildCustomaryAgentiveNominalCompoundOperationFrame = buildCustomaryAgentiveNominalCompoundOperationFrame;
    api.isCustomaryAgentiveNominalCompoundOperationFrame = isCustomaryAgentiveNominalCompoundOperationFrame;
    api.buildCustomaryAgentiveNominalCompoundOrdinaryNncRequestFromOperationFrame = buildCustomaryAgentiveNominalCompoundOrdinaryNncRequestFromOperationFrame;
    api.buildPreteritAgentiveCompoundEmbedVerbInput = buildPreteritAgentiveCompoundEmbedVerbInput;
    api.buildPreteritAgentiveCompoundEmbedTargetContinuationFrame = buildPreteritAgentiveCompoundEmbedTargetContinuationFrame;
    api.buildPreteritAgentiveCompoundEmbedOperationFrame = buildPreteritAgentiveCompoundEmbedOperationFrame;
    api.isPreteritAgentiveCompoundEmbedOperationFrame = isPreteritAgentiveCompoundEmbedOperationFrame;
    api.buildPreteritAgentiveCompoundEmbedGenerationRequestFromOperationFrame = buildPreteritAgentiveCompoundEmbedGenerationRequestFromOperationFrame;
    api.buildPreteritAgentiveNominalCompoundStem = buildPreteritAgentiveNominalCompoundStem;
    api.buildPreteritAgentiveNominalCompoundTargetContinuationFrame = buildPreteritAgentiveNominalCompoundTargetContinuationFrame;
    api.buildPreteritAgentiveNominalCompoundOperationFrame = buildPreteritAgentiveNominalCompoundOperationFrame;
    api.isPreteritAgentiveNominalCompoundOperationFrame = isPreteritAgentiveNominalCompoundOperationFrame;
    api.buildPreteritAgentiveNominalCompoundOrdinaryNncRequestFromOperationFrame = buildPreteritAgentiveNominalCompoundOrdinaryNncRequestFromOperationFrame;
    api.buildCustomaryAgentiveNominalCompoundStem = buildCustomaryAgentiveNominalCompoundStem;
    api.buildCustomaryAgentiveCompoundEmbedVerbInput = buildCustomaryAgentiveCompoundEmbedVerbInput;
    api.buildCustomaryAgentiveCompoundEmbedTargetContinuationFrame = buildCustomaryAgentiveCompoundEmbedTargetContinuationFrame;
    api.buildCustomaryAgentiveCompoundEmbedOperationFrame = buildCustomaryAgentiveCompoundEmbedOperationFrame;
    api.isCustomaryAgentiveCompoundEmbedOperationFrame = isCustomaryAgentiveCompoundEmbedOperationFrame;
    api.buildCustomaryAgentiveCompoundEmbedGenerationRequestFromOperationFrame = buildCustomaryAgentiveCompoundEmbedGenerationRequestFromOperationFrame;
    api.formatPreteritAgentiveNominalCompoundOrdinaryNncInput = formatPreteritAgentiveNominalCompoundOrdinaryNncInput;
    api.formatCustomaryAgentiveNominalCompoundOrdinaryNncInput = formatCustomaryAgentiveNominalCompoundOrdinaryNncInput;
    api.buildPreteritAgentiveOwnerhoodVerbInput = buildPreteritAgentiveOwnerhoodVerbInput;
    api.buildPreteritAgentiveOwnerhoodTargetContinuationFrame = buildPreteritAgentiveOwnerhoodTargetContinuationFrame;
    api.buildTypedOwnerhoodParsedVerbFrame = buildTypedOwnerhoodParsedVerbFrame;
    api.buildPreteritAgentiveOwnerhoodOperationFrame = buildPreteritAgentiveOwnerhoodOperationFrame;
    api.isPreteritAgentiveOwnerhoodOperationFrame = isPreteritAgentiveOwnerhoodOperationFrame;
    api.buildPreteritAgentiveOwnerhoodGenerationRequestFromOperationFrame = buildPreteritAgentiveOwnerhoodGenerationRequestFromOperationFrame;
    api.buildOrdinaryNounOwnerhoodOperationFrame = buildOrdinaryNounOwnerhoodOperationFrame;
    api.getTypedOrdinaryNounOwnerhoodSourceFramePayload = getTypedOrdinaryNounOwnerhoodSourceFramePayload;
    api.buildOrdinaryNounOwnerhoodTargetContinuationFrame = buildOrdinaryNounOwnerhoodTargetContinuationFrame;
    api.isOrdinaryNounOwnerhoodOperationFrame = isOrdinaryNounOwnerhoodOperationFrame;
    api.buildOrdinaryNounOwnerhoodGenerationRequestFromOperationFrame = buildOrdinaryNounOwnerhoodGenerationRequestFromOperationFrame;
    api.buildPreteritAgentiveComplementVerbInput = buildPreteritAgentiveComplementVerbInput;
    api.buildPreteritAgentiveComplementTargetContinuationFrame = buildPreteritAgentiveComplementTargetContinuationFrame;
    api.buildPreteritAgentiveComplementOperationFrame = buildPreteritAgentiveComplementOperationFrame;
    api.isPreteritAgentiveComplementOperationFrame = isPreteritAgentiveComplementOperationFrame;
    api.buildPreteritAgentiveComplementGenerationRequestFromOperationFrame = buildPreteritAgentiveComplementGenerationRequestFromOperationFrame;
    api.buildPreteritAgentiveAdverbialVerbInput = buildPreteritAgentiveAdverbialVerbInput;
    api.buildPreteritAgentiveAdverbialTargetContinuationFrame = buildPreteritAgentiveAdverbialTargetContinuationFrame;
    api.buildPreteritAgentiveAdverbialOperationFrame = buildPreteritAgentiveAdverbialOperationFrame;
    api.isPreteritAgentiveAdverbialOperationFrame = isPreteritAgentiveAdverbialOperationFrame;
    api.buildPreteritAgentiveAdverbialGenerationRequestFromOperationFrame = buildPreteritAgentiveAdverbialGenerationRequestFromOperationFrame;
    api.buildOrdinaryNounOwnerhoodVerbInput = buildOrdinaryNounOwnerhoodVerbInput;
    api.formatActiveActionNominalCompoundOrdinaryNncInput = formatActiveActionNominalCompoundOrdinaryNncInput;
    api.resolvePatientivoNominalCompoundFormationFrame = resolvePatientivoNominalCompoundFormationFrame;
    api.getTypedPatientivoNominalCompoundSourceFramePayload = getTypedPatientivoNominalCompoundSourceFramePayload;
    api.buildPatientivoNominalCompoundTargetContinuationFrame = buildPatientivoNominalCompoundTargetContinuationFrame;
    api.buildPatientivoNominalCompoundOperationFrame = buildPatientivoNominalCompoundOperationFrame;
    api.isPatientivoNominalCompoundOperationFrame = isPatientivoNominalCompoundOperationFrame;
    api.buildPatientivoNominalCompoundOrdinaryNncRequestFromOperationFrame = buildPatientivoNominalCompoundOrdinaryNncRequestFromOperationFrame;
    api.stripPatientivoPrelocativeConnector = stripPatientivoPrelocativeConnector;
    api.buildPatientivoPrelocativeVerbInput = buildPatientivoPrelocativeVerbInput;
    api.resolvePatientivoPrelocativeIncorporatedRole = resolvePatientivoPrelocativeIncorporatedRole;
    api.buildPatientivoPrelocativeTargetContinuationFrame = buildPatientivoPrelocativeTargetContinuationFrame;
    api.buildPatientivoPrelocativeOperationFrame = buildPatientivoPrelocativeOperationFrame;
    api.isPatientivoPrelocativeOperationFrame = isPatientivoPrelocativeOperationFrame;
    api.buildPatientivoPrelocativeGenerationRequestFromOperationFrame = buildPatientivoPrelocativeGenerationRequestFromOperationFrame;
    api.isPatientivoPrelocativeMatrixCompatibleWithSourceState = isPatientivoPrelocativeMatrixCompatibleWithSourceState;
    api.resolvePatientivoPrelocativeFormationFrame = resolvePatientivoPrelocativeFormationFrame;
    api.getPatientivoPrelocativePossessiveObjectMap = getPatientivoPrelocativePossessiveObjectMap;
    api.getPatientivoPrelocativeSubjectObjectMap = getPatientivoPrelocativeSubjectObjectMap;
    api.resolvePatientivoPrelocativeSubjectObjectTransfer = resolvePatientivoPrelocativeSubjectObjectTransfer;
    api.resolvePatientivoPrelocativeObjectTransfer = resolvePatientivoPrelocativeObjectTransfer;
    api.buildPatientivoCharacteristicPropertyEmbedContinuationContract = buildPatientivoCharacteristicPropertyEmbedContinuationContract;
    api.buildPatientivoPrelocativeContinuationContract = buildPatientivoPrelocativeContinuationContract;
    api.buildPatientivoCompoundEmbedContinuationContract = buildPatientivoCompoundEmbedContinuationContract;
    api.buildPatientivoNominalCompoundContinuationContract = buildPatientivoNominalCompoundContinuationContract;
    api.buildActiveActionCompoundEmbedContinuationContract = buildActiveActionCompoundEmbedContinuationContract;
    api.buildActiveActionNominalCompoundContinuationContract = buildActiveActionNominalCompoundContinuationContract;
    api.buildPreteritAgentiveCompoundEmbedContinuationContract = buildPreteritAgentiveCompoundEmbedContinuationContract;
    api.buildPreteritAgentiveNominalCompoundContinuationContract = buildPreteritAgentiveNominalCompoundContinuationContract;
    api.buildCustomaryAgentiveNominalCompoundContinuationContract = buildCustomaryAgentiveNominalCompoundContinuationContract;
    api.buildCustomaryAgentiveCompoundEmbedContinuationContract = buildCustomaryAgentiveCompoundEmbedContinuationContract;
    api.buildPreteritAgentiveOwnerhoodContinuationContract = buildPreteritAgentiveOwnerhoodContinuationContract;
    api.buildPreteritAgentiveComplementContinuationContract = buildPreteritAgentiveComplementContinuationContract;
    api.buildPreteritAgentiveAdverbialContinuationContract = buildPreteritAgentiveAdverbialContinuationContract;
    api.buildOrdinaryNounOwnerhoodContinuationContract = buildOrdinaryNounOwnerhoodContinuationContract;
    return api;
}

export function installDerivationSourceModelGlobals(targetObject = globalThis) {
    const api = createDerivationSourceModelContext(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
