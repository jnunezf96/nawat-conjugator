// Native wrapper generated from src/ui/rendering/rendering.js.

export function createUiRenderingApi(targetObject = globalThis) {
    var ActiveNawatDenominalAndrewsContractRouteRenderContext = null;
    function getNawatDenominalAndrewsRenderContextComparableInputs(context = null) {
      const targetInput = String(context?.targetInput || "").trim();
      const targetVerbStem = String(context?.targetVerbStem || "").trim();
      return [targetInput, targetVerbStem ? `(${targetVerbStem})` : "", targetVerbStem].filter(Boolean);
    }
    function setActiveNawatDenominalAndrewsContractRouteRenderContext(route = null) {
      if (!route || typeof route !== "object") {
        ActiveNawatDenominalAndrewsContractRouteRenderContext = null;
        return null;
      }
      const nextSourcePreview = typeof targetObject.previewNawatDenominalAndrewsContractRouteNextSource === "function" ? targetObject.previewNawatDenominalAndrewsContractRouteNextSource(route) : null;
      const context = {
        version: 1,
        outputKind: "active-denominal-andrews-contract-route-render-context",
        contractId: route.contractId || "",
        routeTemplateId: route.routeTemplateId || "",
        executableRuleId: route.executableRuleId || "",
        sourceStem: route.sourceStem || "",
        targetInput: route.targetInputValue || route.targetInput || route.targetVerbStem || "",
        targetVerbStem: route.targetVerbStem || "",
        route,
        nextSourcePreview,
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          activeContextMustMatchCurrentInput: true,
          sourceEvidenceFromAndrewsContractRoute: Boolean(nextSourcePreview?.sourceEvidence)
        }
      };
      ActiveNawatDenominalAndrewsContractRouteRenderContext = context;
      if (typeof targetObject.document !== "undefined") {
        const dataset = targetObject.document.documentElement?.dataset;
        if (dataset) {
          dataset.activeAndrewsContractId = context.contractId;
          dataset.activeAndrewsRouteTemplateId = context.routeTemplateId;
          dataset.activeAndrewsExecutableRuleId = context.executableRuleId;
          dataset.activeAndrewsSourceStem = context.sourceStem;
          dataset.activeAndrewsTargetInput = context.targetInput;
          dataset.activeAndrewsTargetVerbStem = context.targetVerbStem;
        }
      }
      return context;
    }
    function getActiveNawatDenominalAndrewsContractRouteRenderContextFromDocument() {
      return null;
    }
    function getActiveNawatDenominalAndrewsContractRouteRenderContextFromModel(options = {}) {
      const contextFns = [typeof targetObject.getActiveNawatDenominalAndrewsContractRouteContext === "function" ? targetObject.getActiveNawatDenominalAndrewsContractRouteContext : null, typeof globalThis !== "undefined" && typeof globalThis.getActiveNawatDenominalAndrewsContractRouteContext === "function" ? globalThis.getActiveNawatDenominalAndrewsContractRouteContext : null].filter(candidate => typeof candidate === "function");
      for (const getContext of contextFns) {
        const context = getContext(options);
        if (context?.route) {
          return context;
        }
      }
      return null;
    }
    function previewActiveNawatDenominalAndrewsContractRouteNextSourceForRendering({
      inputValue = "",
      targetInput = "",
      targetVerbStem = ""
    } = {}) {
      const context = ActiveNawatDenominalAndrewsContractRouteRenderContext || getActiveNawatDenominalAndrewsContractRouteRenderContextFromModel({
        inputValue,
        targetInput,
        targetVerbStem
      });
      if (!context?.route) {
        return null;
      }
      const requestedInput = String(inputValue || targetInput || targetVerbStem || "").trim();
      if (requestedInput && !getNawatDenominalAndrewsRenderContextComparableInputs(context).includes(requestedInput)) {
        return null;
      }
      if (context.nextSourcePreview) {
        return context.nextSourcePreview;
      }
      return typeof targetObject.previewNawatDenominalAndrewsContractRouteNextSource === "function" ? targetObject.previewNawatDenominalAndrewsContractRouteNextSource(context.route) : null;
    }
    function renderAllOutputs({
      verb,
      objectPrefix,
      tense,
      onlyTense = null
    }) {
      renderActiveConjugations({
        verb,
        objectPrefix,
        onlyTense,
        tense
      });
      if (!targetObject.isThreeColumnPanelLayout() && verb) {
        targetObject.setLeftPanelStackMode("output");
      }
    }
    function applyOutputPanelShellForTenseMode(tenseMode = "") {
      const isParticleMode = tenseMode === targetObject.TENSE_MODE.particula;
      const outputPanel = targetObject.document.getElementById("container-tense-grid");
      const metaStrip = outputPanel?.querySelector(".output-meta-strip") || targetObject.document.querySelector(".output-meta-strip");
      const resultControls = targetObject.document.getElementById("output-result-controls");
      const outputList = targetObject.document.getElementById("all-tense-conjugations");
      const titleText = outputPanel?.querySelector(":scope > .panel-block-title .panel-block-text");
      if (outputPanel) {
        outputPanel.classList.toggle("container-tense-grid--particle", isParticleMode);
        if (isParticleMode) {
          outputPanel.dataset.outputMode = "particula";
        } else {
          delete outputPanel.dataset.outputMode;
        }
      }
      if (titleText) {
        titleText.textContent = isParticleMode ? "PARTÍCULAS" : "SALIDA";
      }
      if (metaStrip) {
        metaStrip.classList.toggle("output-meta-strip--particle", isParticleMode);
      }
      if (resultControls) {
        resultControls.classList.toggle("output-result-controls--particle", isParticleMode);
        resultControls.setAttribute("aria-hidden", String(isParticleMode));
      }
      if (outputList) {
        outputList.classList.toggle("all-tense-conjugations--particle", isParticleMode);
      }
    }
    function getActiveAndrewsOutputJourneyReceipt() {
      if (typeof targetObject.getAndrewsRouteBoardActiveJourneyReceipt !== "function") {
        return null;
      }
      const journey = targetObject.getAndrewsRouteBoardActiveJourneyReceipt();
      if (journey && Array.isArray(journey.routeIds) && journey.routeIds.length) {
        return {
          ...journey,
          outputJourneyState: journey.outputJourneyState || "active-arrival"
        };
      }
      if (typeof targetObject.getAndrewsRouteBoardContinuedJourneyReceipt === "function") {
        const continuedJourney = targetObject.getAndrewsRouteBoardContinuedJourneyReceipt();
        if (continuedJourney && Array.isArray(continuedJourney.routeIds) && continuedJourney.routeIds.length) {
          return {
            ...continuedJourney,
            outputJourneyState: continuedJourney.outputJourneyState || "continued-as-next-source"
          };
        }
      }
      return null;
    }
    function appendOutputJourneyStopRail(parent, stops = []) {
      const routeStops = Array.isArray(stops) ? stops : [];
      if (!routeStops.length) {
        return null;
      }
      const stopRail = targetObject.document.createElement("span");
      stopRail.className = "output-journey-strip__stops";
      routeStops.forEach((stop, index) => {
        if (index > 0) {
          const arrow = targetObject.document.createElement("span");
          arrow.className = "output-journey-strip__stop-arrow";
          arrow.textContent = ">";
          stopRail.appendChild(arrow);
        }
        const chip = targetObject.document.createElement("span");
        chip.className = "output-journey-strip__stop";
        chip.textContent = stop?.label || stop?.key || "";
        if (stop?.key) {
          chip.dataset.routeStopKey = stop.key;
        }
        stopRail.appendChild(chip);
      });
      parent.appendChild(stopRail);
      return stopRail;
    }
    function getOutputJourneyGateDomainLabel(domain = "") {
      if (typeof targetObject.getAndrewsRouteBoardGateDomainLabel === "function") {
        return targetObject.getAndrewsRouteBoardGateDomainLabel(domain);
      }
      const normalized = String(domain || "").trim();
      const labels = {
        "formula-boundary": "Frontera",
        "valence-object": "Valencia",
        "stem-rank-class": "Tronco",
        "operation-suffix": "Operacion",
        "function-use": "Funcion",
        "source-evidence": "Evidencia",
        "orthography-surface": "Superficie",
        "state-possessor-number": "Estado",
        "route-gate": "Ruta"
      };
      return labels[normalized] || normalized;
    }
    function serializeOutputJourneyGateDomains(gateDomainCounts = []) {
      return (Array.isArray(gateDomainCounts) ? gateDomainCounts : []).map(item => `${item.value}:${Number(item.count || 0)}`).join("|");
    }
    function getOutputJourneyRouteConditionFrames(journey = null) {
      const frames = Array.isArray(journey?.routeConditionFrames) && journey.routeConditionFrames.length ? journey.routeConditionFrames : journey?.routeConditionFrame && typeof journey.routeConditionFrame === "object" ? [journey.routeConditionFrame] : [];
      return frames.filter(frame => frame && typeof frame === "object").map(frame => ({
        ...frame,
        ifStage: frame.ifStage && typeof frame.ifStage === "object" ? {
          ...frame.ifStage
        } : null,
        thenStage: frame.thenStage && typeof frame.thenStage === "object" ? {
          ...frame.thenStage
        } : null,
        conditions: Array.isArray(frame.conditions) ? frame.conditions.map(condition => ({
          ...condition
        })) : []
      }));
    }
    function serializeOutputJourneyRouteConditionFrames(frames = []) {
      return (Array.isArray(frames) ? frames : []).map(frame => [frame.sourceKey || frame.ifStage?.key || "", frame.targetKey || frame.thenStage?.key || "", frame.operation || ""].join(">")).join("|");
    }
    function serializeOutputJourneyStationLineStops(stops = []) {
      return (Array.isArray(stops) ? stops : []).map(entry => [entry.id || "", entry.status || "", entry.stationKey || ""].map(part => String(part || "").replace(/[|:]/g, "")).join(":")).join("|");
    }
    function serializeOutputJourneyHistoryLegs(history = []) {
      return (Array.isArray(history) ? history : []).map((entry, index) => [entry.journeySequence || index + 1, Array.isArray(entry.routeIds) ? entry.routeIds.join("+") : "", entry.sourceKey || "", entry.destinationKey || "", getOutputJourneyRoutePathLabel(entry)].map(part => String(part || "").replace(/[|:]/g, "")).join(":")).join("|");
    }
    function getOutputJourneyRoutePathLabel(journey = null) {
      const explicitPath = String(journey?.routePathLabel || journey?.routeTicket?.routePathLabel || "").trim();
      if (explicitPath) {
        return explicitPath;
      }
      const stops = Array.isArray(journey?.routeStops) ? journey.routeStops : [];
      const stopLabels = stops.map(stop => String(stop?.label || stop?.key || "").trim()).filter(Boolean);
      if (stopLabels.length >= 2) {
        return stopLabels.join(" > ");
      }
      return [journey?.sourceLabel || "", journey?.destinationLabel || ""].filter(Boolean).join(" > ");
    }
    function serializeOutputJourneyConcourseStops(stops = []) {
      return (Array.isArray(stops) ? stops : []).map(entry => [entry.id || "", entry.status || "", entry.stationKey || ""].map(part => String(part || "").replace(/[|:]/g, "")).join(":")).join("|");
    }
    function serializeOutputJourneyPlatformTracks(tracks = []) {
      return (Array.isArray(tracks) ? tracks : []).map(entry => [entry.id || "", entry.recommendationRole || "", entry.sourceKey || "", entry.destinationKey || "", Array.isArray(entry.routeIds) ? entry.routeIds.join("+") : ""].map(part => String(part || "").replace(/[|:]/g, "")).join(":")).join("|");
    }
    function getOutputJourneySourceLayerRoleLabel(role = "") {
      if (typeof targetObject.getAndrewsRouteBoardSourceLayerRoleLabel === "function") {
        return targetObject.getAndrewsRouteBoardSourceLayerRoleLabel(role);
      }
      const normalized = String(role || "").trim();
      const labels = {
        "received-source": "recibida",
        "contained-verbal-core": "nucleo",
        "contained-verbstem": "tronco",
        "route-source": "ruta"
      };
      return labels[normalized] || normalized;
    }
    function serializeOutputJourneySourceLayers(layers = []) {
      return (Array.isArray(layers) ? layers : []).map(entry => [entry.key || "", entry.sourceRole || "", entry.formulaType || "", entry.formulaPosition || "", entry.stemRank || "", entry.active === true ? "active" : ""].map(part => String(part || "").replace(/[|:]/g, "")).join(":")).join("|");
    }
    function getActiveAndrewsStationLineFrameForRendering() {
      if (typeof targetObject.document === "undefined") {
        return null;
      }
      const outputStrip = targetObject.document.getElementById("output-journey-strip");
      const routeBoard = targetObject.document.getElementById("andrews-route-board");
      const source = outputStrip && outputStrip.hidden !== true && outputStrip.dataset.stationLineModel ? outputStrip : routeBoard;
      if (!source?.dataset?.stationLineModel) {
        return null;
      }
      return {
        lineModel: source.dataset.stationLineModel || "",
        intentMode: source.dataset.stationLineIntentMode || "",
        activeStopId: source.dataset.stationLineActiveStop || "",
        routeKey: source.dataset.stationLineRouteKey || "",
        routePathLabel: source.dataset.routePathLabel || source.dataset.passengerPrimaryRoutePathLabel || source.dataset.activeJourneyRoutePathLabel || "",
        stops: source.dataset.stationLineStops || ""
      };
    }
    function getActiveAndrewsRouteConditionFrameForRendering() {
      if (typeof targetObject.document === "undefined") {
        return null;
      }
      const outputStrip = targetObject.document.getElementById("output-journey-strip");
      const routeBoard = targetObject.document.getElementById("andrews-route-board");
      const source = outputStrip && outputStrip.hidden !== true && outputStrip.dataset.routeConditionFrames ? outputStrip : routeBoard;
      const conditionFrames = source?.dataset?.routeConditionFrames || source?.dataset?.activeJourneyConditionFrames || "";
      if (!conditionFrames) {
        return null;
      }
      return {
        conditionFrames,
        ifStage: source.dataset.routeIfStage || source.dataset.activeJourneyIfStage || "",
        thenStage: source.dataset.routeThenStage || source.dataset.activeJourneyThenStage || ""
      };
    }
    function getActiveAndrewsSourceLayerFrameForRendering() {
      if (typeof targetObject.document === "undefined") {
        return null;
      }
      const outputStrip = targetObject.document.getElementById("output-journey-strip");
      const routeBoard = targetObject.document.getElementById("andrews-route-board");
      const source = outputStrip && outputStrip.hidden !== true && outputStrip.dataset.sourceLayerModel ? outputStrip : routeBoard;
      const sourceLayers = source?.dataset?.sourceLayers || source?.dataset?.sourceCandidateStages || "";
      if (!sourceLayers) {
        return null;
      }
      return {
        layerModel: source.dataset.sourceLayerModel || "formula-source-layers-route-board",
        sourceLayerCount: source.dataset.sourceLayerCount || source.dataset.sourceCandidateStageCount || "",
        sourceLayers,
        activeSourceStation: source.dataset.sourceLayerActiveStation || source.dataset.currentStation || source.dataset.sourceStation || "",
        activeSourceRole: source.dataset.sourceLayerActiveRole || ""
      };
    }
    function getActiveAndrewsRideFrameForRendering() {
      if (typeof targetObject.document === "undefined") {
        return null;
      }
      const outputStrip = targetObject.document.getElementById("output-journey-strip");
      const routeBoard = targetObject.document.getElementById("andrews-route-board");
      const source = outputStrip && outputStrip.hidden !== true && outputStrip.dataset.rideExperienceModel ? outputStrip : routeBoard;
      if (!source?.dataset?.rideExperienceModel) {
        return null;
      }
      return {
        experienceModel: source.dataset.rideExperienceModel || "",
        outputJourneyModel: source.dataset.rideOutputJourneyModel || "",
        operatingPrinciple: source.dataset.rideOperatingPrinciple || "",
        choiceModel: source.dataset.rideChoiceModel || "",
        currentSignLabel: source.dataset.rideCurrentSignLabel || "",
        nextSignLabel: source.dataset.rideNextSignLabel || "",
        destinationSignLabel: source.dataset.rideDestinationSignLabel || "",
        primaryActionLabel: source.dataset.ridePrimaryActionLabel || source.dataset.passengerPrimaryActionLabel || "",
        primaryRoutePathLabel: source.dataset.ridePrimaryRoutePathLabel || source.dataset.passengerPrimaryRoutePathLabel || source.dataset.routePathLabel || source.dataset.activeJourneyRoutePathLabel || "",
        primaryClickCount: source.dataset.ridePrimaryClickCount || "",
        switchingRequired: source.dataset.rideSwitchingRequired || "",
        events: source.dataset.rideEvents || ""
      };
    }
    function applyAndrewsStationLineDatasetToSurfaceElement(element = null, stationLineFrame = null) {
      if (!element?.dataset || !stationLineFrame?.lineModel) {
        return null;
      }
      element.dataset.stationLineModel = stationLineFrame.lineModel || "";
      element.dataset.stationLineIntentMode = stationLineFrame.intentMode || "";
      element.dataset.stationLineActiveStop = stationLineFrame.activeStopId || "";
      element.dataset.stationLineRouteKey = stationLineFrame.routeKey || "";
      element.dataset.routePathLabel = stationLineFrame.routePathLabel || "";
      element.dataset.stationLineStops = stationLineFrame.stops || "";
      return element;
    }
    function applyAndrewsRouteConditionDatasetToSurfaceElement(element = null, routeConditionFrame = null) {
      if (!element?.dataset || !routeConditionFrame?.conditionFrames) {
        return null;
      }
      element.dataset.routeConditionFrames = routeConditionFrame.conditionFrames || "";
      element.dataset.routeIfStage = routeConditionFrame.ifStage || "";
      element.dataset.routeThenStage = routeConditionFrame.thenStage || "";
      return element;
    }
    function applyAndrewsSourceLayerDatasetToSurfaceElement(element = null, sourceLayerFrame = null) {
      if (!element?.dataset || !sourceLayerFrame?.sourceLayers) {
        return null;
      }
      element.dataset.sourceLayerModel = sourceLayerFrame.layerModel || "";
      element.dataset.sourceLayerCount = sourceLayerFrame.sourceLayerCount || "";
      element.dataset.sourceLayers = sourceLayerFrame.sourceLayers || "";
      element.dataset.sourceLayerActiveStation = sourceLayerFrame.activeSourceStation || "";
      element.dataset.sourceLayerActiveRole = sourceLayerFrame.activeSourceRole || "";
      return element;
    }
    function applyAndrewsRideDatasetToSurfaceElement(element = null, rideFrame = null) {
      if (!element?.dataset || !rideFrame?.experienceModel) {
        return null;
      }
      element.dataset.rideExperienceModel = rideFrame.experienceModel || "";
      element.dataset.rideOutputJourneyModel = rideFrame.outputJourneyModel || "";
      element.dataset.rideOperatingPrinciple = rideFrame.operatingPrinciple || "";
      element.dataset.rideChoiceModel = rideFrame.choiceModel || "";
      element.dataset.rideCurrentSignLabel = rideFrame.currentSignLabel || "";
      element.dataset.rideNextSignLabel = rideFrame.nextSignLabel || "";
      element.dataset.rideDestinationSignLabel = rideFrame.destinationSignLabel || "";
      element.dataset.ridePrimaryActionLabel = rideFrame.primaryActionLabel || "";
      element.dataset.ridePrimaryRoutePathLabel = rideFrame.primaryRoutePathLabel || "";
      element.dataset.ridePrimaryClickCount = rideFrame.primaryClickCount || "";
      element.dataset.rideSwitchingRequired = rideFrame.switchingRequired || "";
      element.dataset.rideEvents = rideFrame.events || "";
      return element;
    }
    function appendOutputJourneyStationLine(parent, journey = null) {
      const frame = journey?.stationLineFrame && typeof journey.stationLineFrame === "object" ? journey.stationLineFrame : journey?.passengerFrame?.stationLineFrame && typeof journey.passengerFrame.stationLineFrame === "object" ? journey.passengerFrame.stationLineFrame : null;
      const stops = Array.isArray(frame?.stops) ? frame.stops : [];
      if (!frame || !stops.length) {
        return null;
      }
      const line = targetObject.document.createElement("span");
      line.className = "output-journey-strip__station-line";
      line.dataset.lineModel = frame.lineModel || "";
      line.dataset.intentMode = frame.intentMode || "";
      line.dataset.activeStop = frame.activeStopId || "";
      line.dataset.sourceStation = frame.sourceKey || "";
      line.dataset.destinationStation = frame.destinationKey || "";
      line.dataset.routeKey = frame.routeKey || "";
      line.dataset.stationStops = serializeOutputJourneyStationLineStops(stops);
      stops.forEach(entry => {
        const stop = targetObject.document.createElement("span");
        stop.className = "output-journey-strip__station-stop";
        stop.dataset.stopId = entry.id || "";
        stop.dataset.stopStatus = entry.status || "";
        stop.dataset.stationKey = entry.stationKey || "";
        if (entry.id && entry.id === frame.activeStopId) {
          stop.dataset.stopActive = "true";
        }
        const label = targetObject.document.createElement("span");
        label.className = "output-journey-strip__station-label";
        label.textContent = entry.label || entry.block || entry.id || "";
        const value = targetObject.document.createElement("span");
        value.className = "output-journey-strip__station-value";
        value.textContent = entry.displayLabel || "";
        stop.append(label, value);
        line.appendChild(stop);
      });
      parent.appendChild(line);
      return line;
    }
    function appendOutputJourneyConcourse(parent, journey = null) {
      const frame = journey?.concourseFrame && typeof journey.concourseFrame === "object" ? journey.concourseFrame : null;
      const stops = Array.isArray(frame?.stops) ? frame.stops : [];
      if (!frame || !stops.length) {
        return null;
      }
      const concourse = targetObject.document.createElement("span");
      concourse.className = "output-journey-strip__concourse";
      concourse.dataset.concourseModel = frame.concourseModel || "";
      concourse.dataset.lineModel = frame.lineModel || "";
      concourse.dataset.currentIntention = frame.currentIntention || "";
      concourse.dataset.sourceStation = frame.sourceKey || "";
      concourse.dataset.nextStation = frame.nextStationKey || "";
      concourse.dataset.destinationStation = frame.destinationKey || "";
      concourse.dataset.routeKey = frame.routeKey || "";
      concourse.dataset.routeIds = Array.isArray(frame.routeIds) ? frame.routeIds.join("|") : "";
      concourse.dataset.stops = serializeOutputJourneyConcourseStops(stops);
      concourse.dataset.passengerEvents = Array.isArray(frame.passengerEvents) ? frame.passengerEvents.join("|") : "";
      const labels = [];
      stops.forEach((entry, index) => {
        if (index > 0) {
          const arrow = targetObject.document.createElement("span");
          arrow.className = "output-journey-strip__concourse-arrow";
          arrow.textContent = ">";
          concourse.appendChild(arrow);
        }
        const stop = targetObject.document.createElement("span");
        stop.className = "output-journey-strip__concourse-stop";
        stop.dataset.stopId = entry.id || "";
        stop.dataset.stopStatus = entry.status || "";
        stop.dataset.stationKey = entry.stationKey || "";
        const label = targetObject.document.createElement("span");
        label.className = "output-journey-strip__concourse-label";
        label.textContent = entry.label || entry.id || "";
        const value = targetObject.document.createElement("span");
        value.className = "output-journey-strip__concourse-value";
        value.textContent = entry.displayLabel || "";
        const stopLabel = [label.textContent, value.textContent].filter(Boolean).join(" · ");
        if (stopLabel) {
          stop.setAttribute("aria-label", stopLabel);
          labels.push(stopLabel);
        }
        stop.append(label, value);
        concourse.appendChild(stop);
      });
      if (frame.actionLabel) {
        const action = targetObject.document.createElement("span");
        action.className = "output-journey-strip__concourse-action";
        action.textContent = frame.actionLabel;
        concourse.appendChild(action);
        labels.push(frame.actionLabel);
      }
      if (labels.length) {
        concourse.setAttribute("aria-label", labels.join(" · "));
      }
      parent.appendChild(concourse);
      return concourse;
    }
    function appendOutputJourneyItinerary(parent, journey = null) {
      const history = Array.isArray(journey?.journeyHistory) ? journey.journeyHistory : [];
      if (!history.length) {
        return null;
      }
      const itinerary = targetObject.document.createElement("span");
      itinerary.className = "output-journey-strip__itinerary";
      itinerary.dataset.journeyHistoryLegCount = String(history.length);
      itinerary.dataset.journeyHistoryLegs = serializeOutputJourneyHistoryLegs(history);
      itinerary.dataset.journeyHistoryRouteIds = history.map(entry => Array.isArray(entry.routeIds) ? entry.routeIds.join("|") : "").filter(Boolean).join("||");
      itinerary.dataset.journeyHistoryStations = history.map(entry => [entry.sourceKey || "", entry.destinationKey || ""].filter(Boolean).join(">")).filter(Boolean).join("|");
      const label = targetObject.document.createElement("span");
      label.className = "output-journey-strip__itinerary-label";
      label.textContent = "Ruta";
      itinerary.appendChild(label);
      history.forEach((entry, index) => {
        const leg = targetObject.document.createElement("span");
        leg.className = "output-journey-strip__itinerary-leg";
        leg.dataset.legIndex = String(entry.journeySequence || index + 1);
        leg.dataset.routeIds = Array.isArray(entry.routeIds) ? entry.routeIds.join("|") : "";
        leg.dataset.sourceStation = entry.sourceKey || "";
        leg.dataset.destinationStation = entry.destinationKey || "";
        leg.dataset.routePathLabel = getOutputJourneyRoutePathLabel(entry);
        leg.dataset.resistanceScore = String(entry.resistanceScore || 0);
        const main = targetObject.document.createElement("span");
        main.className = "output-journey-strip__itinerary-main";
        main.textContent = `${entry.journeySequence || index + 1}. ${leg.dataset.routePathLabel}`;
        const meta = targetObject.document.createElement("span");
        meta.className = "output-journey-strip__itinerary-meta";
        meta.textContent = [entry.routeActionFrame?.actionLabel || entry.targetActionLabel || "", entry.resistanceScore ? `R${entry.resistanceScore}` : ""].filter(Boolean).join(" · ");
        leg.append(main, meta);
        itinerary.appendChild(leg);
      });
      parent.appendChild(itinerary);
      return itinerary;
    }
    function appendOutputJourneySourceLayers(parent, journey = null) {
      const frame = journey?.sourceLayerFrame && typeof journey.sourceLayerFrame === "object" ? journey.sourceLayerFrame : null;
      const layers = Array.isArray(frame?.layers) ? frame.layers : [];
      if (!frame || layers.length < 2) {
        return null;
      }
      const rail = targetObject.document.createElement("span");
      rail.className = "output-journey-strip__source-layers";
      rail.dataset.sourceLayerModel = frame.layerModel || "";
      rail.dataset.sourceLayerCount = String(frame.sourceLayerCount || layers.length);
      rail.dataset.sourceLayers = serializeOutputJourneySourceLayers(layers);
      rail.dataset.sourceLayerActiveStation = frame.activeSourceKey || "";
      rail.dataset.sourceLayerActiveRole = frame.activeSourceRole || "";
      rail.dataset.activeSourceStation = frame.activeSourceKey || "";
      rail.dataset.activeSourceRole = frame.activeSourceRole || "";
      const label = targetObject.document.createElement("span");
      label.className = "output-journey-strip__source-layer-label";
      label.textContent = "Origen";
      rail.appendChild(label);
      const ariaLabels = [];
      layers.forEach(entry => {
        const chip = targetObject.document.createElement("span");
        chip.className = "output-journey-strip__source-layer";
        chip.dataset.sourceLayerStation = entry.key || "";
        chip.dataset.sourceStation = entry.key || "";
        chip.dataset.sourceStageKey = entry.key || "";
        chip.dataset.sourceLayerRole = entry.sourceRole || "";
        chip.dataset.sourceRole = entry.sourceRole || "";
        chip.dataset.sourceStageRole = entry.sourceRole || "";
        chip.dataset.sourceLayerActive = String(entry.active === true);
        chip.dataset.formulaType = entry.formulaType || "";
        chip.dataset.formulaPosition = entry.formulaPosition || "";
        chip.dataset.stemRank = entry.stemRank || "";
        const name = targetObject.document.createElement("span");
        name.className = "output-journey-strip__source-layer-name";
        name.textContent = entry.label || entry.key || "";
        const role = targetObject.document.createElement("span");
        role.className = "output-journey-strip__source-layer-role";
        role.textContent = getOutputJourneySourceLayerRoleLabel(entry.sourceRole || "");
        chip.append(name, role);
        const ariaLabel = [name.textContent, role.textContent].filter(Boolean).join(" · ");
        if (ariaLabel) {
          chip.setAttribute("aria-label", ariaLabel);
          ariaLabels.push(ariaLabel);
        }
        rail.appendChild(chip);
      });
      if (ariaLabels.length) {
        rail.setAttribute("aria-label", ariaLabels.join(" · "));
      }
      parent.appendChild(rail);
      return rail;
    }
    function appendOutputJourneyRouteConditions(parent, frames = []) {
      const conditionFrames = (Array.isArray(frames) ? frames : []).filter(frame => frame && typeof frame === "object");
      if (!conditionFrames.length) {
        return null;
      }
      const first = conditionFrames[0];
      const last = conditionFrames[conditionFrames.length - 1];
      const rail = targetObject.document.createElement("span");
      rail.className = "output-journey-strip__conditions";
      rail.dataset.conditionModel = first.conditionModel || "";
      rail.dataset.conditionSegments = String(conditionFrames.length);
      rail.dataset.conditionFrames = serializeOutputJourneyRouteConditionFrames(conditionFrames);
      const appendChip = (role = "", text = "", title = "") => {
        if (!text) {
          return;
        }
        const chip = targetObject.document.createElement("span");
        chip.className = "output-journey-strip__condition";
        chip.dataset.conditionRole = role;
        chip.textContent = text;
        if (title) {
          chip.title = title;
        }
        rail.appendChild(chip);
      };
      appendChip("if", `Si ${first.ifStage?.label || first.sourceLabel || ""}`, first.formula || "");
      appendChip("then", `Entonces ${last.thenStage?.label || last.targetLabel || ""}`, last.formula || "");
      if (conditionFrames.length > 1) {
        appendChip("transfer", `${conditionFrames.length} tramos`, conditionFrames.map(frame => frame.passengerCue).join(" | "));
      }
      const functionUseCondition = conditionFrames.flatMap(frame => Array.isArray(frame.conditions) ? frame.conditions : []).find(entry => entry.dimension === "function-use");
      appendChip("function-use", functionUseCondition?.label || "Función final", functionUseCondition?.expected || "");
      parent.appendChild(rail);
      return rail;
    }
    function appendOutputJourneyDimensions(parent, gateDomainCounts = []) {
      const dimensions = (Array.isArray(gateDomainCounts) ? gateDomainCounts : []).slice(0, 4);
      if (!dimensions.length) {
        return null;
      }
      const rail = targetObject.document.createElement("span");
      rail.className = "output-journey-strip__dimensions";
      dimensions.forEach(item => {
        const chip = targetObject.document.createElement("span");
        chip.className = "output-journey-strip__dimension";
        chip.dataset.gateDomain = item.value || "";
        chip.dataset.gateDomainCount = String(item.count || 0);
        chip.textContent = `${getOutputJourneyGateDomainLabel(item.value)} ${item.count}`;
        rail.appendChild(chip);
      });
      parent.appendChild(rail);
      return rail;
    }
    function appendOutputJourneyPassengerFrame(parent, journey = null) {
      const frame = journey?.passengerFrame && typeof journey.passengerFrame === "object" ? journey.passengerFrame : null;
      if (!frame) {
        return null;
      }
      const pass = targetObject.document.createElement("span");
      pass.className = "output-journey-strip__pass";
      pass.dataset.routeBoardModel = frame.routeBoardModel || "";
      pass.dataset.journeyModel = frame.journeyModel || "";
      pass.dataset.currentIntention = frame.currentIntention || "";
      pass.dataset.primaryActionLabel = frame.primaryActionLabel || "";
      pass.dataset.primaryRecommendationRole = frame.primaryRecommendationRole || "";
      pass.dataset.primaryRouteIds = Array.isArray(frame.primaryRouteIds) ? frame.primaryRouteIds.join("|") : "";
      pass.dataset.primaryNextSource = frame.primaryNextSourceStageKey || "";
      pass.dataset.primaryRoutePathLabel = frame.primaryRoutePathLabel || frame.routePathLabel || getOutputJourneyRoutePathLabel(journey);
      pass.dataset.handoffEntryBoard = frame.handoffEntryBoard || "";
      pass.dataset.handoffUnitMode = frame.handoffUnitMode || "";
      pass.dataset.passengerEvents = Array.isArray(frame.passengerEvents) ? frame.passengerEvents.join("|") : "";
      const label = targetObject.document.createElement("span");
      label.className = "output-journey-strip__pass-label";
      label.textContent = "Pase";
      const main = targetObject.document.createElement("span");
      main.className = "output-journey-strip__pass-main";
      main.textContent = frame.primaryActionLabel || journey?.routeActionFrame?.actionLabel || "Siguiente";
      const meta = targetObject.document.createElement("span");
      meta.className = "output-journey-strip__pass-meta";
      meta.textContent = [frame.handoffActionLabel || journey?.targetActionLabel || "", pass.dataset.primaryRoutePathLabel || frame.destinationLabel || journey?.destinationLabel || ""].filter(Boolean).join(" · ");
      pass.append(label, main, meta);
      parent.appendChild(pass);
      return pass;
    }
    function appendOutputJourneyPlatform(parent, journey = null) {
      const frame = journey?.platformFrame && typeof journey.platformFrame === "object" ? journey.platformFrame : null;
      const tracks = Array.isArray(frame?.tracks) ? frame.tracks : [];
      if (!frame || !tracks.length) {
        return null;
      }
      const selected = tracks.find(entry => entry.recommendationRole === "arrival" || entry.recommendationRole === "next") || tracks[0];
      const routePathLabel = selected.routePathLabel || [selected.sourceLabel || "", selected.destinationLabel || ""].filter(Boolean).join(" > ");
      const platform = targetObject.document.createElement("span");
      platform.className = "output-journey-strip__platform";
      platform.dataset.platformModel = frame.platformModel || "";
      platform.dataset.platformTracks = serializeOutputJourneyPlatformTracks(tracks);
      platform.dataset.platformId = selected.id || "";
      platform.dataset.routeRecommendation = selected.recommendationRole || "";
      platform.dataset.sourceStation = selected.sourceKey || "";
      platform.dataset.sourceLabel = selected.sourceLabel || "";
      platform.dataset.destinationStation = selected.destinationKey || "";
      platform.dataset.destinationLabel = selected.destinationLabel || "";
      platform.dataset.routePathLabel = routePathLabel;
      platform.dataset.routeIds = Array.isArray(selected.routeIds) ? selected.routeIds.join("|") : "";
      platform.dataset.segmentCount = String(selected.segmentCount || 1);
      platform.dataset.transferCount = String(selected.transferCount || 0);
      platform.dataset.tripKind = selected.tripKind || "";
      platform.dataset.resistanceScore = String(selected.resistanceScore || 0);
      const label = targetObject.document.createElement("span");
      label.className = "output-journey-strip__platform-label";
      label.textContent = selected.label || "Anden";
      const main = targetObject.document.createElement("span");
      main.className = "output-journey-strip__platform-main";
      main.textContent = routePathLabel || selected.destinationLabel || "";
      const meta = targetObject.document.createElement("span");
      meta.className = "output-journey-strip__platform-meta";
      meta.textContent = [selected.actionLabel || "", selected.resistanceScore ? `R${selected.resistanceScore}` : ""].filter(Boolean).join(" · ");
      platform.append(label, main, meta);
      platform.setAttribute("aria-label", [label.textContent, main.textContent, meta.textContent].filter(Boolean).join(" · "));
      parent.appendChild(platform);
      return platform;
    }
    function appendOutputJourneyRideFrame(parent, journey = null) {
      const frame = journey?.rideFrame && typeof journey.rideFrame === "object" ? journey.rideFrame : null;
      if (!frame) {
        return null;
      }
      const ride = targetObject.document.createElement("span");
      ride.className = "output-journey-strip__ride";
      ride.dataset.experienceModel = frame.experienceModel || "";
      ride.dataset.outputJourneyModel = frame.outputJourneyModel || "";
      ride.dataset.operatingPrinciple = frame.operatingPrinciple || "";
      ride.dataset.choiceModel = frame.choiceModel || "";
      ride.dataset.currentIntention = frame.currentIntention || "";
      ride.dataset.sourceStation = frame.sourceKey || "";
      ride.dataset.sourceLabel = frame.sourceLabel || "";
      ride.dataset.destinationStation = frame.destinationKey || "";
      ride.dataset.destinationLabel = frame.destinationLabel || frame.destinationSignLabel || "";
      ride.dataset.currentSignLabel = frame.currentSignLabel || "";
      ride.dataset.nextSignLabel = frame.nextSignLabel || "";
      ride.dataset.destinationSignLabel = frame.destinationSignLabel || "";
      ride.dataset.primaryActionLabel = frame.primaryActionLabel || "";
      ride.dataset.primaryRoutePathLabel = frame.primaryRoutePathLabel || getOutputJourneyRoutePathLabel(journey);
      ride.dataset.activeStop = frame.activeStopId || "";
      ride.dataset.activeStopIndex = String(frame.activeStopIndex || 0);
      ride.dataset.progressStopCount = String(frame.progressStopCount || 0);
      ride.dataset.progressStops = serializeOutputJourneyStationLineStops(frame.progressStops || []);
      ride.dataset.routeOptionCount = String(frame.routeOptionCount || 0);
      ride.dataset.destinationOptionCount = String(frame.destinationOptionCount || 0);
      ride.dataset.visibleTrackCount = String(frame.visibleTrackCount || 0);
      ride.dataset.primaryClickCount = String(frame.decisionLoad?.primaryClickCount || 0);
      ride.dataset.switchingRequired = String(frame.decisionLoad?.switchingRequired === true);
      ride.dataset.passengerEvents = Array.isArray(frame.passengerEvents) ? frame.passengerEvents.join("|") : "";
      const label = targetObject.document.createElement("span");
      label.className = "output-journey-strip__ride-label";
      label.textContent = "Viaje";
      const main = targetObject.document.createElement("span");
      main.className = "output-journey-strip__ride-main";
      main.textContent = ride.dataset.primaryRoutePathLabel || [frame.currentSignLabel, frame.destinationSignLabel || frame.nextSignLabel].filter(Boolean).join(" > ");
      const meta = targetObject.document.createElement("span");
      meta.className = "output-journey-strip__ride-meta";
      meta.textContent = [frame.primaryActionLabel || "", frame.visibleTrackCount ? `${frame.visibleTrackCount} andenes` : "", frame.destinationOptionCount ? `${frame.destinationOptionCount} destinos` : "", frame.activeStopIndex && frame.progressStopCount ? `${frame.activeStopIndex}/${frame.progressStopCount}` : ""].filter(Boolean).join(" · ");
      ride.append(label, main, meta);
      ride.setAttribute("aria-label", [label.textContent, main.textContent, meta.textContent].filter(Boolean).join(" · "));
      parent.appendChild(ride);
      return ride;
    }
    function appendOutputJourneyNextSource(parent, journey = null) {
      if (journey?.outputJourneyState === "continued-as-next-source" || journey?.continuationState) {
        return null;
      }
      const targetAction = journey?.targetAction && typeof journey.targetAction === "object" ? journey.targetAction : {};
      const passengerFrame = journey?.passengerFrame && typeof journey.passengerFrame === "object" ? journey.passengerFrame : {};
      const nextSourceKey = journey?.nextSourceKey || journey?.destinationKey || "";
      const nextSourceLabel = journey?.nextSourceLabel || journey?.destinationLabel || "";
      const actionLabel = journey?.targetActionLabel || targetAction.label || "";
      if (!nextSourceKey && !nextSourceLabel && !actionLabel) {
        return null;
      }
      const chip = typeof targetObject.continueAndrewsRouteBoardFromActiveJourney === "function" ? targetObject.document.createElement("button") : targetObject.document.createElement("span");
      chip.className = "output-journey-strip__next-source";
      if (chip.tagName === "BUTTON") {
        chip.type = "button";
        chip.addEventListener("click", () => {
          targetObject.continueAndrewsRouteBoardFromActiveJourney();
        });
      }
      chip.dataset.nextSourceStation = nextSourceKey;
      chip.dataset.nextSourceLabel = nextSourceLabel;
      chip.dataset.nextSourceEntryBoard = journey?.nextSourceEntryBoard || targetAction.entryBoard || "";
      chip.dataset.nextSourceUnitMode = journey?.nextSourceUnitMode || targetAction.unitMode || "";
      chip.dataset.targetActionLabel = actionLabel;
      chip.dataset.passengerPrimaryActionLabel = passengerFrame.primaryActionLabel || "";
      chip.dataset.passengerPrimaryRouteIds = Array.isArray(passengerFrame.primaryRouteIds) ? passengerFrame.primaryRouteIds.join("|") : "";
      chip.dataset.passengerPrimaryNextSource = passengerFrame.primaryNextSourceStageKey || "";
      chip.dataset.passengerPrimaryRoutePathLabel = passengerFrame.primaryRoutePathLabel || getOutputJourneyRoutePathLabel(journey) || "";
      chip.dataset.routePathLabel = chip.dataset.passengerPrimaryRoutePathLabel;
      chip.textContent = ["Siguiente", actionLabel, chip.dataset.routePathLabel || nextSourceLabel].filter(Boolean).join(" · ");
      chip.setAttribute("aria-label", chip.textContent);
      parent.appendChild(chip);
      return chip;
    }
    function renderOutputJourneyStrip() {
      const container = targetObject.document.getElementById("output-journey-strip");
      if (!container) {
        return null;
      }
      const journey = getActiveAndrewsOutputJourneyReceipt();
      container.replaceChildren();
      if (!journey) {
        container.hidden = true;
        delete container.dataset.routeIds;
        delete container.dataset.routeStops;
        delete container.dataset.routePathLabel;
        delete container.dataset.sourceStation;
        delete container.dataset.destinationStation;
        delete container.dataset.resistanceScore;
        delete container.dataset.resistanceRole;
        delete container.dataset.nextSourceStation;
        delete container.dataset.nextSourceLabel;
        delete container.dataset.nextSourceEntryBoard;
        delete container.dataset.nextSourceUnitMode;
        delete container.dataset.targetActionLabel;
        delete container.dataset.routeActionLabel;
        delete container.dataset.routeRecommendation;
        delete container.dataset.outputJourneyState;
        delete container.dataset.routeBoardModel;
        delete container.dataset.journeyModel;
        delete container.dataset.passengerIntention;
        delete container.dataset.passengerPrimaryActionLabel;
        delete container.dataset.passengerPrimaryRouteIds;
        delete container.dataset.passengerPrimaryNextSource;
        delete container.dataset.passengerPrimaryRoutePathLabel;
        delete container.dataset.passengerEvents;
        delete container.dataset.stationLineModel;
        delete container.dataset.stationLineIntentMode;
        delete container.dataset.stationLineActiveStop;
        delete container.dataset.stationLineRouteKey;
        delete container.dataset.stationLineStops;
        delete container.dataset.platformModel;
        delete container.dataset.platformTracks;
        delete container.dataset.platformVisibleTrackCount;
        delete container.dataset.platformRecommendedRouteIds;
        delete container.dataset.rideExperienceModel;
        delete container.dataset.rideOutputJourneyModel;
        delete container.dataset.rideOperatingPrinciple;
        delete container.dataset.rideChoiceModel;
        delete container.dataset.rideCurrentSignLabel;
        delete container.dataset.rideNextSignLabel;
        delete container.dataset.rideDestinationSignLabel;
        delete container.dataset.ridePrimaryActionLabel;
        delete container.dataset.ridePrimaryRoutePathLabel;
        delete container.dataset.ridePrimaryClickCount;
        delete container.dataset.rideSwitchingRequired;
        delete container.dataset.rideEvents;
        delete container.dataset.concourseModel;
        delete container.dataset.concourseLineModel;
        delete container.dataset.concourseStops;
        delete container.dataset.concourseNextStation;
        delete container.dataset.concourseDestinationStation;
        delete container.dataset.concourseRouteKey;
        delete container.dataset.sourceLayerModel;
        delete container.dataset.sourceLayerCount;
        delete container.dataset.sourceLayers;
        delete container.dataset.sourceLayerActiveStation;
        delete container.dataset.sourceLayerActiveRole;
        delete container.dataset.journeyHistoryLegCount;
        delete container.dataset.journeyHistoryLegs;
        delete container.dataset.journeyHistoryRouteIds;
        delete container.dataset.journeyHistoryStations;
        delete container.dataset.journeyHistoryRoutePaths;
        delete container.dataset.routeConditionFrames;
        delete container.dataset.routeIfStage;
        delete container.dataset.routeThenStage;
        return null;
      }
      const targetAction = journey.targetAction && typeof journey.targetAction === "object" ? journey.targetAction : {};
      const routeActionFrame = journey.routeActionFrame && typeof journey.routeActionFrame === "object" ? journey.routeActionFrame : {};
      const passengerFrame = journey.passengerFrame && typeof journey.passengerFrame === "object" ? journey.passengerFrame : {};
      const routeConditionFrames = getOutputJourneyRouteConditionFrames(journey);
      container.hidden = false;
      container.dataset.routeIds = journey.routeIds.join("|");
      container.dataset.routeStops = (journey.routeStops || []).map(stop => stop.key || stop.label || "").filter(Boolean).join("|");
      container.dataset.routePathLabel = getOutputJourneyRoutePathLabel(journey);
      container.dataset.sourceStation = journey.sourceKey || "";
      container.dataset.destinationStation = journey.destinationKey || "";
      container.dataset.resistanceScore = String(journey.resistanceScore || 0);
      container.dataset.resistanceRole = journey.resistanceRole || "";
      container.dataset.gateDomains = serializeOutputJourneyGateDomains(journey.gateDomainCounts || []);
      container.dataset.routeConditionFrames = serializeOutputJourneyRouteConditionFrames(routeConditionFrames);
      container.dataset.routeIfStage = routeConditionFrames[0]?.sourceKey || routeConditionFrames[0]?.ifStage?.key || "";
      container.dataset.routeThenStage = routeConditionFrames[routeConditionFrames.length - 1]?.targetKey || routeConditionFrames[routeConditionFrames.length - 1]?.thenStage?.key || "";
      container.dataset.obstacleCount = String(journey.obstacleCount || 0);
      container.dataset.segmentCount = String(journey.segmentCount || 1);
      container.dataset.transferCount = String(journey.transferCount || 0);
      container.dataset.tripKind = journey.tripKind || "";
      container.dataset.nextSourceStation = journey.nextSourceKey || journey.destinationKey || "";
      container.dataset.nextSourceLabel = journey.nextSourceLabel || journey.destinationLabel || "";
      container.dataset.nextSourceEntryBoard = journey.nextSourceEntryBoard || targetAction.entryBoard || "";
      container.dataset.nextSourceUnitMode = journey.nextSourceUnitMode || targetAction.unitMode || "";
      container.dataset.targetActionLabel = journey.targetActionLabel || targetAction.label || "";
      container.dataset.routeActionLabel = routeActionFrame.actionLabel || "";
      container.dataset.routeRecommendation = routeActionFrame.recommendationRole || "";
      container.dataset.outputJourneyState = journey.outputJourneyState || "";
      container.dataset.routeBoardModel = passengerFrame.routeBoardModel || "";
      container.dataset.journeyModel = passengerFrame.journeyModel || "";
      container.dataset.passengerIntention = passengerFrame.currentIntention || "";
      container.dataset.passengerPrimaryActionLabel = passengerFrame.primaryActionLabel || "";
      container.dataset.passengerPrimaryRouteIds = Array.isArray(passengerFrame.primaryRouteIds) ? passengerFrame.primaryRouteIds.join("|") : "";
      container.dataset.passengerPrimaryNextSource = passengerFrame.primaryNextSourceStageKey || "";
      container.dataset.passengerPrimaryRoutePathLabel = passengerFrame.primaryRoutePathLabel || container.dataset.routePathLabel || "";
      container.dataset.passengerEvents = Array.isArray(passengerFrame.passengerEvents) ? passengerFrame.passengerEvents.join("|") : "";
      const stationLineFrame = journey.stationLineFrame && typeof journey.stationLineFrame === "object" ? journey.stationLineFrame : passengerFrame.stationLineFrame && typeof passengerFrame.stationLineFrame === "object" ? passengerFrame.stationLineFrame : null;
      container.dataset.stationLineModel = stationLineFrame?.lineModel || "";
      container.dataset.stationLineIntentMode = stationLineFrame?.intentMode || "";
      container.dataset.stationLineActiveStop = stationLineFrame?.activeStopId || "";
      container.dataset.stationLineRouteKey = stationLineFrame?.routeKey || "";
      container.dataset.stationLineStops = serializeOutputJourneyStationLineStops(stationLineFrame?.stops || []);
      const platformFrame = journey.platformFrame && typeof journey.platformFrame === "object" ? journey.platformFrame : null;
      container.dataset.platformModel = platformFrame?.platformModel || "";
      container.dataset.platformTracks = serializeOutputJourneyPlatformTracks(platformFrame?.tracks || []);
      container.dataset.platformVisibleTrackCount = String(platformFrame?.visibleTrackCount || 0);
      container.dataset.platformRecommendedRouteIds = Array.isArray(platformFrame?.recommendedRouteIds) ? platformFrame.recommendedRouteIds.join("|") : "";
      const rideFrame = journey.rideFrame && typeof journey.rideFrame === "object" ? journey.rideFrame : null;
      container.dataset.rideExperienceModel = rideFrame?.experienceModel || "";
      container.dataset.rideOutputJourneyModel = rideFrame?.outputJourneyModel || "";
      container.dataset.rideOperatingPrinciple = rideFrame?.operatingPrinciple || "";
      container.dataset.rideChoiceModel = rideFrame?.choiceModel || "";
      container.dataset.rideCurrentSignLabel = rideFrame?.currentSignLabel || "";
      container.dataset.rideNextSignLabel = rideFrame?.nextSignLabel || "";
      container.dataset.rideDestinationSignLabel = rideFrame?.destinationSignLabel || "";
      container.dataset.ridePrimaryActionLabel = rideFrame?.primaryActionLabel || "";
      container.dataset.ridePrimaryRoutePathLabel = rideFrame?.primaryRoutePathLabel || container.dataset.routePathLabel || "";
      container.dataset.ridePrimaryClickCount = String(rideFrame?.decisionLoad?.primaryClickCount || 0);
      container.dataset.rideSwitchingRequired = String(rideFrame?.decisionLoad?.switchingRequired === true);
      container.dataset.rideEvents = Array.isArray(rideFrame?.passengerEvents) ? rideFrame.passengerEvents.join("|") : "";
      const concourseFrame = journey.concourseFrame && typeof journey.concourseFrame === "object" ? journey.concourseFrame : null;
      container.dataset.concourseModel = concourseFrame?.concourseModel || "";
      container.dataset.concourseLineModel = concourseFrame?.lineModel || "";
      container.dataset.concourseStops = serializeOutputJourneyConcourseStops(concourseFrame?.stops || []);
      container.dataset.concourseNextStation = concourseFrame?.nextStationKey || "";
      container.dataset.concourseDestinationStation = concourseFrame?.destinationKey || "";
      container.dataset.concourseRouteKey = concourseFrame?.routeKey || "";
      const sourceLayerFrame = journey.sourceLayerFrame && typeof journey.sourceLayerFrame === "object" ? journey.sourceLayerFrame : null;
      container.dataset.sourceLayerModel = sourceLayerFrame?.layerModel || "";
      container.dataset.sourceLayerCount = String(sourceLayerFrame?.sourceLayerCount || 0);
      container.dataset.sourceLayers = serializeOutputJourneySourceLayers(sourceLayerFrame?.layers || []);
      container.dataset.sourceLayerActiveStation = sourceLayerFrame?.activeSourceKey || "";
      container.dataset.sourceLayerActiveRole = sourceLayerFrame?.activeSourceRole || "";
      const journeyHistory = Array.isArray(journey.journeyHistory) ? journey.journeyHistory : [];
      container.dataset.journeyHistoryLegCount = String(journeyHistory.length);
      container.dataset.journeyHistoryLegs = serializeOutputJourneyHistoryLegs(journeyHistory);
      container.dataset.journeyHistoryRouteIds = journeyHistory.map(entry => Array.isArray(entry.routeIds) ? entry.routeIds.join("|") : "").filter(Boolean).join("||");
      container.dataset.journeyHistoryStations = journeyHistory.map(entry => [entry.sourceKey || "", entry.destinationKey || ""].filter(Boolean).join(">")).filter(Boolean).join("|");
      container.dataset.journeyHistoryRoutePaths = journeyHistory.map(entry => getOutputJourneyRoutePathLabel(entry)).filter(Boolean).join("|");
      const label = targetObject.document.createElement("span");
      label.className = "output-journey-strip__label";
      label.textContent = journey.outputJourneyState === "continued-as-next-source" ? "Trasbordo" : "Trayecto";
      const main = targetObject.document.createElement("span");
      main.className = "output-journey-strip__main";
      main.textContent = container.dataset.routePathLabel;
      const meta = targetObject.document.createElement("span");
      meta.className = "output-journey-strip__meta";
      meta.textContent = [journey.resistanceRoleLabel || "", journey.resistanceScore ? `R${journey.resistanceScore}` : "", journey.segmentCount === 1 ? "1 tramo" : `${journey.segmentCount} tramos`, journey.hiddenCoordinateCount ? `${journey.hiddenCoordinateCount} coords` : "", journey.tripKind === "transfer" ? "trasbordo" : ""].filter(Boolean).join(" · ");
      container.append(label, main, meta);
      appendOutputJourneyConcourse(container, journey);
      appendOutputJourneyItinerary(container, journey);
      appendOutputJourneyStationLine(container, journey);
      appendOutputJourneySourceLayers(container, journey);
      appendOutputJourneyRouteConditions(container, routeConditionFrames);
      appendOutputJourneyRideFrame(container, journey);
      appendOutputJourneyPassengerFrame(container, journey);
      appendOutputJourneyPlatform(container, journey);
      appendOutputJourneyStopRail(container, journey.routeStops);
      appendOutputJourneyDimensions(container, journey.gateDomainCounts);
      appendOutputJourneyNextSource(container, journey);
      return container;
    }
    function createLesson4InspectorChip(text = "", className = "") {
      const chip = targetObject.document.createElement("span");
      chip.className = ["lesson4-inspector__chip", className].filter(Boolean).join(" ");
      chip.textContent = String(text || "");
      return chip;
    }
    function createLesson4InspectorLine(label = "", value = "", className = "") {
      const line = targetObject.document.createElement("div");
      line.className = ["lesson4-inspector__line", className].filter(Boolean).join(" ");
      line.dataset.lineLabel = String(label || "").toLowerCase();
      const labelEl = targetObject.document.createElement("span");
      labelEl.className = "lesson4-inspector__line-label";
      labelEl.textContent = String(label || "");
      const valueEl = targetObject.document.createElement("span");
      valueEl.className = "lesson4-inspector__line-value";
      valueEl.textContent = String(value || "");
      line.append(labelEl, valueEl);
      return line;
    }
    function getVisibleNuclearClauseTypeLabel(type = "", fallback = "cláusula nuclear") {
      const normalized = String(type || "").trim().toLowerCase();
      if (normalized === "cnv" || normalized === "vnc" || normalized === "verbal") {
        return "cláusula verbal";
      }
      if (normalized === "cnn" || normalized === "nnc" || normalized === "nominal") {
        return "cláusula nominal";
      }
      if (normalized === "cn" || normalized === "nuclear") {
        return "cláusula nuclear";
      }
      return String(fallback || "cláusula nuclear").replace(/\s*\((?:CNV|CNN|VNC|NNC|CN)\)\s*/g, "").trim();
    }
    function getVisibleNuclearClauseShellLabel(shell = null) {
      return getVisibleNuclearClauseTypeLabel(shell?.formulaAbbreviation || shell?.formulaType || "", shell?.displayLabel || "cláusula nuclear");
    }
    function getAndrewsFirstOutputBlockHoverTitle({
      mode = "",
      tenseValue = "",
      blockKind = ""
    } = {}) {
      const resolvedMode = String(mode || "").trim();
      if (resolvedMode === "verb" || resolvedMode === targetObject.TENSE_MODE.verbo) {
        const tenseTitle = typeof targetObject.getAndrewsFirstTenseHoverTitle === "function" ? targetObject.getAndrewsFirstTenseHoverTitle(tenseValue, targetObject.TENSE_MODE.verbo) : "Andrews dirige la arquitectura de CNV; Nawat/Pipil confirma la superficie.";
        return `Andrews Lecciones 4-7: bloque de cláusula nuclear verbal. ${tenseTitle}`;
      }
      if (resolvedMode === "noun" || resolvedMode === targetObject.TENSE_MODE.sustantivo) {
        return "Andrews Lecciones 4 y 12-19: cláusula nuclear nominal; sin ranura tiempo ordinaria.";
      }
      if (resolvedMode === targetObject.TENSE_MODE.adjetivo) {
        return "Andrews dirige la función adjectival nominal; Nawat/Pipil confirma la superficie.";
      }
      if (resolvedMode === targetObject.TENSE_MODE.adverbio) {
        return "Andrews dirige la función adverbial; Nawat/Pipil confirma la superficie.";
      }
      return blockKind ? `Andrews dirige la arquitectura de ${blockKind}; Nawat/Pipil confirma la superficie.` : "Andrews dirige la arquitectura; Nawat/Pipil confirma la superficie.";
    }
    function formatVisibleAndrewsSlotToken(value = "") {
      const normalized = String(value || "").trim();
      const labels = {
        "pers1": "persona1",
        "pers2": "persona2",
        "pers1-pers2": "persona1-persona2",
        "obj1": "objeto 1",
        "obj2": "objeto 2",
        "obj3": "objeto 3",
        "reflexivo": "reflexivo",
        "STEM": "base",
        "tns": "tiempo",
        "va1-va2": "valencia1-valencia2",
        "va": "valencia",
        "st1-st2": "estado1-estado2",
        "st": "estado",
        "num1-num2": "número1-número2"
      };
      return labels[normalized] || normalized;
    }
    function formatVisibleAndrewsFormula(value = "") {
      let text = String(value || "");
      const replacements = [[/\bSubject\b/g, "sujeto"], [/\bPredicate\b/g, "predicado"], [/\bpersona1-persona2\b/g, "pers1-pers2"], [/\bpersona1\b/g, "pers1"], [/\bpersona2\b/g, "pers2"], [/\bobjeto\s*1\b/g, "obj1"], [/\bobjeto\s*2\b/g, "obj2"], [/\bobjeto\s*3\b/g, "obj3"], [/\bvalencia1-valencia2\b/g, "val1-val2"], [/\bva1-va2\b/g, "val1-val2"], [/\bvalence\b/g, "val"], [/\bvalencia\b/g, "val"], [/\bva\b/g, "val"], [/\bestado1-estado2\b/g, "est1-est2"], [/\bst1-st2\b/g, "est1-est2"], [/\bstate\b/g, "est"], [/\bestado\b/g, "est"], [/\bst\b/g, "est"], [/\btense\b/g, "tiempo"], [/\btns\b/g, "tiempo"], [/\bnúmero1-número2\b/g, "núm1-núm2"], [/\bnum1-num2\b/g, "núm1-núm2"], [/\bnumber\b/g, "núm"], [/\bnúmero\b/g, "núm"], [/\bperson\b/g, "pers"], [/\bSTEM\b/g, "base"]];
      replacements.forEach(([pattern, replacement]) => {
        text = text.replace(pattern, replacement);
      });
      return text;
    }
    function getVisibleCnvFormulaSurfacePath(source = null) {
      if (!source || typeof source !== "object") {
        return null;
      }
      return source.cnvFormulaSurfacePath || source.grammarFrame?.morphBoundaryFrame?.cnvFormulaSurfacePath || source.frames?.morphBoundaryFrame?.cnvFormulaSurfacePath || null;
    }
    function normalizeVisibleCnvFormulaSurfaceZero(value = "") {
      return String(value || "").split("/").map(variant => variant.split("-").map(slot => slot === "Ø" ? "0" : slot).join("-")).join("/");
    }
    function normalizeVisibleCnvFormulaSlotEchoForSurfaceLine(value = "") {
      return String(value || "").replace(/Ø/g, "0");
    }
    function projectVisibleCnvFormulaEchoToSurface(value = "") {
      return String(value || "").replace(/^Fórmula CNV:\s*/i, "").replace(/[>#]/g, "").replace(/[()]/g, "").replace(/[+\-]/g, "").replace(/[Ø0∅]/g, "").replace(/\s+/g, "").trim();
    }
    function projectVisibleCnvFormulaSegmentToSurface(value = "") {
      return String(value || "").replace(/[()]/g, "").replace(/[+\-]/g, "").replace(/[Ø0∅]/g, "").replace(/\s+/g, "").trim();
    }
    function isVisibleCnvFormulaDirectionalPart(value = "") {
      return ["wal", "al", "un"].includes(String(value || "").trim());
    }
    function normalizeVisibleCnvFormulaAlignmentToken(value = "", fallback = "0") {
      const token = String(value ?? "").trim();
      if (!token || token === "Ø" || token === "∅") {
        return fallback;
      }
      return token;
    }
    function cloneVisibleCnvFormulaAlignmentFeatures(value = null) {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return {};
      }
      return Object.keys(value).sort().reduce((acc, key) => {
        acc[key] = String(value[key] ?? "");
        return acc;
      }, {});
    }
    function getVisibleCnvFormulaAlignmentSlotFrame(sourceFrame = null, slotKey = "") {
      return (Array.isArray(sourceFrame?.slotFrames) ? sourceFrame.slotFrames : []).find(entry => entry.slotKey === slotKey) || null;
    }
    function getVisibleCnvFormulaAlignmentSlotValue(sourceFrame = null, slotKey = "", fallback = "0", {
      preferSurface = true
    } = {}) {
      const slot = getVisibleCnvFormulaAlignmentSlotFrame(sourceFrame, slotKey);
      if (!slot) {
        return fallback;
      }
      const surfaceValue = String(slot.surfaceValue ?? "").trim();
      const formulaMorph = String(slot.formulaMorph ?? "").trim();
      const value = preferSurface ? surfaceValue || formulaMorph : formulaMorph || surfaceValue;
      return normalizeVisibleCnvFormulaAlignmentToken(value, fallback);
    }
    function getVisibleCnvFormulaAlignmentObjectMorph(sourceFrame = null) {
      const va = getVisibleCnvFormulaAlignmentSlotFrame(sourceFrame, "va");
      if (va) {
        return normalizeVisibleCnvFormulaAlignmentToken(String(va.surfaceValue || va.formulaMorph || ""), "");
      }
      const va1 = getVisibleCnvFormulaAlignmentSlotFrame(sourceFrame, "va1");
      const va2 = getVisibleCnvFormulaAlignmentSlotFrame(sourceFrame, "va2");
      if (!va1 && !va2) {
        return "";
      }
      const visible = String(va1?.visibleLinearMorph || va2?.visibleLinearMorph || "").trim();
      const va2Formula = String(va2?.formulaMorph || "").trim();
      const va2Surface = String(va2?.surfaceValue || "").trim();
      if (visible && va2Formula && va2Surface && va2Surface !== "0" && va2Surface !== "Ø" && va2Surface !== va2Formula && visible.endsWith(va2Formula)) {
        return normalizeVisibleCnvFormulaAlignmentToken(`${visible.slice(0, -va2Formula.length)}${va2Surface}`, "");
      }
      if (visible) {
        return normalizeVisibleCnvFormulaAlignmentToken(visible, "");
      }
      const va1Value = normalizeVisibleCnvFormulaAlignmentToken(String(va1?.surfaceValue || va1?.formulaMorph || ""), "");
      const va2Value = normalizeVisibleCnvFormulaAlignmentToken(String(va2?.surfaceValue || va2?.formulaMorph || ""), "0");
      return va1Value ? `${va1Value}-${va2Value}` : "";
    }
    function splitVisibleCnvFormulaAlignmentConnector(connector = "") {
      const [num1 = "0", num2 = "0"] = String(connector || "0-0").split("-");
      return {
        num1: normalizeVisibleCnvFormulaAlignmentToken(num1, "0"),
        num2: normalizeVisibleCnvFormulaAlignmentToken(num2, "0")
      };
    }
    function resolveVisibleCnvFormulaAlignmentSurfaceSlots(sourceFrame = null, slots = {}) {
      const fallbackBase = slots.base || "STEM";
      const fallbackConnector = `${slots.num1 || "0"}-${slots.num2 || "0"}`;
      let coreSurface = String(sourceFrame?.surface || "").replace(/\s+/g, "").trim();
      const stripLeading = (segment = "") => {
        const surface = projectVisibleCnvFormulaSegmentToSurface(segment);
        if (surface && coreSurface.startsWith(surface)) {
          coreSurface = coreSurface.slice(surface.length);
          return true;
        }
        return false;
      };
      stripLeading(slots.pers1);
      const directionalSurface = projectVisibleCnvFormulaSegmentToSurface(slots.directional);
      const objectSurface = projectVisibleCnvFormulaSegmentToSurface(slots.objectMorph);
      const objectThenDirectional = objectSurface && directionalSurface && coreSurface.startsWith(`${objectSurface}${directionalSurface}`);
      const prePredicateParts = [];
      if (objectThenDirectional) {
        if (stripLeading(slots.objectMorph)) {
          prePredicateParts.push(slots.objectMorph);
        }
        if (stripLeading(slots.directional)) {
          prePredicateParts.push(slots.directional);
        }
      } else {
        if (stripLeading(slots.directional)) {
          prePredicateParts.push(slots.directional);
        }
        if (stripLeading(slots.objectMorph)) {
          prePredicateParts.push(slots.objectMorph);
        }
      }
      if (slots.directional && !prePredicateParts.includes(slots.directional)) {
        prePredicateParts.push(slots.directional);
      }
      if (slots.objectMorph && !prePredicateParts.includes(slots.objectMorph)) {
        prePredicateParts.push(slots.objectMorph);
      }
      const suffixCandidates = [fallbackConnector, ...(fallbackConnector === "ki-0" ? ["k-0"] : []), ...(fallbackConnector !== "0-0" ? ["0-0"] : [])].map(connector => {
        const {
          num1,
          num2
        } = splitVisibleCnvFormulaAlignmentConnector(connector);
        return {
          connector,
          num1,
          num2
        };
      }).filter((candidate, index, list) => list.findIndex(entry => entry.connector === candidate.connector) === index);
      const matchedSuffix = suffixCandidates.find(candidate => {
        const suffixSurface = `${projectVisibleCnvFormulaSegmentToSurface(slots.tns)}${projectVisibleCnvFormulaSegmentToSurface(candidate.connector)}`;
        if (!suffixSurface) {
          return false;
        }
        return coreSurface.endsWith(suffixSurface);
      });
      if (matchedSuffix) {
        const suffixSurface = `${projectVisibleCnvFormulaSegmentToSurface(slots.tns)}${projectVisibleCnvFormulaSegmentToSurface(matchedSuffix.connector)}`;
        coreSurface = suffixSurface ? coreSurface.slice(0, -suffixSurface.length) : coreSurface;
      }
      const base = coreSurface || fallbackBase;
      const connectorFrame = matchedSuffix || splitVisibleCnvFormulaAlignmentConnector(fallbackConnector);
      return {
        base: normalizeVisibleCnvFormulaAlignmentToken(base, fallbackBase),
        num1: connectorFrame.num1 || slots.num1 || "0",
        num2: connectorFrame.num2 || slots.num2 || "0",
        prePredicateParts
      };
    }
    function buildVisibleCnvFormulaAlignmentTargetFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "visible-cnv-formula-alignment-source-frame") {
        return null;
      }
      const pers1 = getVisibleCnvFormulaAlignmentSlotValue(sourceFrame, "pers1", "0");
      const pers2 = getVisibleCnvFormulaAlignmentSlotValue(sourceFrame, "pers2", "0");
      const directional = getVisibleCnvFormulaAlignmentSlotValue(sourceFrame, "directional", "");
      const objectMorph = getVisibleCnvFormulaAlignmentObjectMorph(sourceFrame);
      const directionalFrame = getVisibleCnvFormulaAlignmentSlotFrame(sourceFrame, "directional");
      const objectFrame = getVisibleCnvFormulaAlignmentSlotFrame(sourceFrame, "va") || getVisibleCnvFormulaAlignmentSlotFrame(sourceFrame, "va1") || getVisibleCnvFormulaAlignmentSlotFrame(sourceFrame, "va2");
      const directionalIndex = Number.isFinite(directionalFrame?.index) ? directionalFrame.index : -1;
      const objectIndex = Number.isFinite(objectFrame?.index) ? objectFrame.index : -1;
      let prePredicateParts = [];
      if (directional && objectMorph) {
        if (objectIndex >= 0 && directionalIndex >= 0 && objectIndex < directionalIndex) {
          prePredicateParts.push(objectMorph, directional);
        } else {
          prePredicateParts.push(directional, objectMorph);
        }
      } else {
        if (directional) {
          prePredicateParts.push(directional);
        }
        if (objectMorph) {
          prePredicateParts.push(objectMorph);
        }
      }
      const base = getVisibleCnvFormulaAlignmentSlotValue(sourceFrame, "base", "STEM");
      const tns = getVisibleCnvFormulaAlignmentSlotValue(sourceFrame, "tns", "0");
      const num1 = getVisibleCnvFormulaAlignmentSlotValue(sourceFrame, "num1", "0");
      const num2 = getVisibleCnvFormulaAlignmentSlotValue(sourceFrame, "num2", "0");
      const surfaceSlots = resolveVisibleCnvFormulaAlignmentSurfaceSlots(sourceFrame, {
        pers1,
        pers2,
        directional,
        objectMorph,
        base,
        tns,
        num1,
        num2
      });
      prePredicateParts = surfaceSlots.prePredicateParts.length ? surfaceSlots.prePredicateParts : prePredicateParts;
      const prePredicate = prePredicateParts.length ? `+${prePredicateParts.join("+")}` : "";
      return Object.freeze({
        kind: "visible-cnv-formula-alignment-target-frame",
        version: 1,
        formula: `#${pers1}-${pers2}${prePredicate}(${surfaceSlots.base})${tns}+${surfaceSlots.num1}-${surfaceSlots.num2}#`,
        surface: sourceFrame.surface,
        sourceSignature: sourceFrame.sourceSignature,
        slotSummary: Object.freeze({
          pers1,
          pers2,
          directional,
          objectMorph,
          base: surfaceSlots.base,
          tns,
          num1: surfaceSlots.num1,
          num2: surfaceSlots.num2
        })
      });
    }
    function buildVisibleCnvFormulaAlignmentSourceFrame(record = null) {
      const paths = Array.isArray(record?.paths) ? record.paths : [];
      if (!paths.length) {
        return null;
      }
      const slotFrames = paths.map((path, index) => ({
        kind: "visible-cnv-formula-alignment-slot-frame",
        index,
        slotKey: String(path?.formulaSlotKey || "").trim(),
        formulaSlot: String(path?.formulaSlot || path?.formulaSlotKey || "").trim(),
        formulaRole: String(path?.formulaRole || "").trim(),
        formulaMorph: String(path?.formulaMorph ?? "").trim(),
        surfaceValue: String(path?.surfaceValue ?? "").trim(),
        visibleLinearMorph: String(path?.visibleLinearMorph || "").trim(),
        formulaFeatures: cloneVisibleCnvFormulaAlignmentFeatures(path?.formulaFeatures),
        linearPieces: Array.isArray(path?.linearPieces) ? path.linearPieces.map(piece => String(piece ?? "").trim()).filter(Boolean) : [],
        status: String(path?.status || "").trim()
      })).filter(entry => entry.slotKey);
      if (!slotFrames.length) {
        return null;
      }
      const sourceSignature = JSON.stringify(slotFrames.map(entry => ({
        index: entry.index,
        slotKey: entry.slotKey,
        formulaSlot: entry.formulaSlot,
        formulaRole: entry.formulaRole,
        formulaMorph: entry.formulaMorph,
        surfaceValue: entry.surfaceValue,
        visibleLinearMorph: entry.visibleLinearMorph,
        formulaFeatures: entry.formulaFeatures,
        linearPieces: entry.linearPieces,
        status: entry.status
      })));
      return Object.freeze({
        kind: "visible-cnv-formula-alignment-source-frame",
        version: 1,
        authority: "cnvFormulaSurfacePath.pathsBySurface.path-slot-frames",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        formulaEchoAuthority: false,
        surfaceTextAuthority: false,
        surface: String(record?.surface || "").trim(),
        slotFrames: Object.freeze(slotFrames.map(entry => Object.freeze({
          ...entry,
          formulaFeatures: Object.freeze({
            ...entry.formulaFeatures
          }),
          linearPieces: Object.freeze(entry.linearPieces.slice())
        }))),
        sourceSignature
      });
    }
    function buildVisibleCnvFormulaAlignmentOperationFrame(sourceFrame = null) {
      const targetFrame = buildVisibleCnvFormulaAlignmentTargetFrame(sourceFrame);
      if (!sourceFrame || !targetFrame) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-visible-cnv-formula-alignment-operation-frame",
        version: 1,
        operationId: "visible-cnv-formula-path-slot-alignment",
        authority: "Andrews CNV formula path slots",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        formulaEchoAuthority: false,
        surfaceTextAuthority: false,
        sourceSignature: sourceFrame.sourceSignature,
        targetFrame
      });
    }
    function getVisibleCnvFormulaAlignmentMismatch(record = null, sourceFrame = null, operationFrame = null) {
      const rebuiltSourceFrame = buildVisibleCnvFormulaAlignmentSourceFrame(record);
      if (!rebuiltSourceFrame || !sourceFrame || sourceFrame.kind !== "visible-cnv-formula-alignment-source-frame") {
        return "visible-cnv-formula-alignment-source-frame-required";
      }
      if (String(rebuiltSourceFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "visible-cnv-formula-alignment-contradictory-source-frame";
      }
      if (!operationFrame || operationFrame.kind !== "andrews-visible-cnv-formula-alignment-operation-frame" || operationFrame.operationId !== "visible-cnv-formula-path-slot-alignment" || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || operationFrame.formulaEchoAuthority !== false || operationFrame.surfaceTextAuthority !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "visible-cnv-formula-alignment-operation-frame-required";
      }
      const rebuiltOperationFrame = buildVisibleCnvFormulaAlignmentOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame) {
        return "visible-cnv-formula-alignment-target-frame-required";
      }
      if (JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "visible-cnv-formula-alignment-contradictory-target-frame";
      }
      return "";
    }
    function isVisibleCnvFormulaAlignmentSourceFrameComplete(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "visible-cnv-formula-alignment-source-frame") {
        return false;
      }
      const slotKeys = new Set((Array.isArray(sourceFrame.slotFrames) ? sourceFrame.slotFrames : []).map(entry => String(entry?.slotKey || "")));
      return ["pers1", "pers2", "base", "tns", "num1", "num2"].every(slotKey => slotKeys.has(slotKey));
    }
    function getVisibleCnvFormulaAlignmentPathRecords(path = null) {
      return (Array.isArray(path?.pathsBySurface) ? path.pathsBySurface : []).filter(record => isVisibleCnvFormulaAlignmentSourceFrameComplete(buildVisibleCnvFormulaAlignmentSourceFrame(record)));
    }
    function alignVisibleCnvFormulaEchoToSurface(formulaEcho = "", surface = "", record = null, sourceFrame = null, operationFrame = null) {
      if (record) {
        const mismatch = getVisibleCnvFormulaAlignmentMismatch(record, sourceFrame, operationFrame);
        return mismatch ? "" : String(operationFrame?.targetFrame?.formula || "");
      }
      const formula = String(formulaEcho || "").trim();
      const surfaceText = String(surface || "").replace(/\s+/g, "").trim();
      if (!formula || !surfaceText || projectVisibleCnvFormulaEchoToSurface(formula) === surfaceText) {
        return formula;
      }
      const match = formula.match(/^#([^+#()]*)(\+[^()]*)?\(([^)]*)\)([^+#]*)\+([^#]*)#$/);
      if (!match) {
        return formula;
      }
      const subjectText = match[1] || "";
      let objectText = match[2] ? match[2].slice(1) : "";
      const tenseText = match[4] || "0";
      const connectorText = match[5] || "0-0";
      const subjectSurface = projectVisibleCnvFormulaSegmentToSurface(subjectText);
      let objectSurface = projectVisibleCnvFormulaSegmentToSurface(objectText);
      let coreSurface = surfaceText;
      if (subjectSurface && coreSurface.startsWith(subjectSurface)) {
        coreSurface = coreSurface.slice(subjectSurface.length);
      }
      if (objectText === "k-in" && coreSurface.startsWith("kinh")) {
        objectText = "k-inh";
        objectSurface = "kinh";
      }
      if (objectSurface && coreSurface.startsWith(objectSurface)) {
        coreSurface = coreSurface.slice(objectSurface.length);
      }
      const baseHint = "";
      const tenseSurface = projectVisibleCnvFormulaSegmentToSurface(tenseText);
      const connectorSurface = projectVisibleCnvFormulaSegmentToSurface(connectorText);
      const suffixCandidates = [{
        tense: tenseText,
        connector: connectorText
      }, ...(connectorSurface === "ki" ? [{
        tense: tenseText,
        connector: "k-0"
      }] : []), ...(connectorSurface ? [{
        tense: tenseText,
        connector: "0-0"
      }] : [])];
      const candidates = suffixCandidates.map(candidate => {
        const suffixSurface = `${projectVisibleCnvFormulaSegmentToSurface(candidate.tense)}${projectVisibleCnvFormulaSegmentToSurface(candidate.connector)}`;
        if (suffixSurface && !coreSurface.endsWith(suffixSurface)) {
          return null;
        }
        const base = suffixSurface ? coreSurface.slice(0, -suffixSurface.length) : coreSurface;
        if (!base) {
          return null;
        }
        let score = 0;
        if (candidate.connector === connectorText) {
          score += 4;
        }
        if (projectVisibleCnvFormulaSegmentToSurface(candidate.connector)) {
          score += 2;
        }
        if (baseHint) {
          if (base === baseHint) {
            score += 10;
          } else if (base.endsWith(baseHint)) {
            score += 7;
          } else if (baseHint.startsWith(base)) {
            score += 4;
          }
        }
        if (`${projectVisibleCnvFormulaSegmentToSurface(candidate.tense)}${projectVisibleCnvFormulaSegmentToSurface(candidate.connector)}` === `${tenseSurface}${connectorSurface}`) {
          score += 1;
        }
        return {
          formula: `#${subjectText}${objectText ? `+${objectText}` : ""}(${base})${candidate.tense}+${candidate.connector}#`,
          score
        };
      }).filter(Boolean).sort((left, right) => right.score - left.score);
      return candidates[0]?.formula || formula;
    }
    function getVisibleCnvFormulaSurfaceForms(source = null) {
      const path = getVisibleCnvFormulaSurfacePath(source);
      const pathForms = getVisibleCnvFormulaAlignmentPathRecords(path).map(record => String(record?.surface || "").trim()).filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
      if (pathForms.length) {
        return pathForms;
      }
      const forms = typeof getConjugationSurfaceForms === "function" ? getConjugationSurfaceForms(source) : [];
      if (forms.length) {
        return forms;
      }
      return (Array.isArray(path?.pathsBySurface) ? path.pathsBySurface : []).map(record => String(record?.surface || "").trim()).filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
    }
    function getVisibleCnvFormulaSurfaceDisplay(source = null) {
      const forms = getVisibleCnvFormulaSurfaceForms(source);
      if (forms.length) {
        return forms.join(" / ");
      }
      return typeof getConjugationDisplaySurface === "function" ? getConjugationDisplaySurface(source) : "";
    }
    function buildVisibleCnvFormulaSurfaceFrame(source = null, entry = null) {
      const path = getVisibleCnvFormulaSurfacePath(source);
      const stationLineFrame = getActiveAndrewsStationLineFrameForRendering();
      const routeConditionFrame = getActiveAndrewsRouteConditionFrameForRendering();
      const sourceLayerFrame = getActiveAndrewsSourceLayerFrameForRendering();
      const rideFrame = getActiveAndrewsRideFrameForRendering();
      const entrySurface = String(entry?.surface || "").trim();
      const surfaceForms = entrySurface ? entrySurface.split(/\s*\/\s*/).map(item => item.trim()).filter(Boolean) : getVisibleCnvFormulaSurfaceForms(source);
      if (!surfaceForms.length && !path) {
        return null;
      }
      const obstacleGateIds = Array.isArray(path?.andrewsRouteObstacleGateIds) ? path.andrewsRouteObstacleGateIds.map(item => String(item || "").trim()).filter(Boolean) : [];
      return {
        kind: "visible-cnv-formula-surface-frame",
        version: 1,
        pathModel: "surface-line-priority-formula-chip-receives",
        sourcePriority: "surface-line",
        formulaValue: String(entry?.value || "").trim(),
        surfaceForms,
        routeRecordId: String(path?.andrewsRouteRecordId || "").trim(),
        routePathLabel: stationLineFrame?.routePathLabel || "",
        routeObstacleGateIds: obstacleGateIds,
        routeObstacleGateCount: obstacleGateIds.length,
        stationLineFrame,
        routeConditionFrame,
        sourceLayerFrame,
        rideFrame
      };
    }
    function normalizeGeneratedOutputVisibleCnvSlotValue(result = null, value = "") {
      const normalized = String(value || "");
      return getVisibleCnvFormulaSurfaceForms(result).length ? normalizeVisibleCnvFormulaSlotEchoForSurfaceLine(normalized) : normalized;
    }
    function visibleCnvFormulaEchoesCoverSurfaceForms(echoes = [], surfaceForms = []) {
      const projectedSurfaces = (Array.isArray(echoes) ? echoes : []).map(entry => projectVisibleCnvFormulaEchoToSurface(typeof entry === "object" ? entry?.value : entry)).filter(Boolean);
      const normalizedSurfaceForms = (Array.isArray(surfaceForms) ? surfaceForms : []).map(entry => String(entry || "").replace(/\s+/g, "").trim()).filter(Boolean);
      if (!normalizedSurfaceForms.length) {
        return true;
      }
      return normalizedSurfaceForms.every(surface => projectedSurfaces.includes(surface));
    }
    function dedupeVisibleCnvFormulaEchoEntries(entries = []) {
      return (Array.isArray(entries) ? entries : []).filter(entry => entry?.value).filter((entry, index, list) => list.findIndex(candidate => candidate.value === entry.value && candidate.surface === entry.surface) === index);
    }
    function getCanonicalVisibleCnvFormulaEchoEntries(source = null) {
      return getFormulaSurfacePairsForGeneratedOutput(source).filter(pair => pair?.formulaRealizationRecord?.kind === "grammar-formula-realization-record").map(pair => ({
        value: String(pair.targetFormulaEcho || pair.conjugatorFormulaEcho || "").trim(),
        surface: String(pair.surface || "").trim(),
        sourceFormulaEcho: String(pair.sourceFormulaEcho || "").trim(),
        andrewsFormulaEcho: String(pair.andrewsFormulaEcho || "").trim(),
        targetFormulaEcho: String(pair.targetFormulaEcho || "").trim(),
        conjugatorFormulaEcho: String(pair.conjugatorFormulaEcho || "").trim(),
        sourceToTargetFormulaEcho: String(pair.sourceToTargetFormulaEcho || "").trim(),
        andrewsToConjugatorFormulaEcho: String(pair.andrewsToConjugatorFormulaEcho || "").trim(),
        formulaPair: pair
      })).filter(entry => entry.value);
    }
    function getVisibleCnvFormulaBaseRealizations(source = null) {
      const path = getVisibleCnvFormulaSurfacePath(source);
      const directRealizations = Array.isArray(path?.surfaceStemRealizations) ? path.surfaceStemRealizations : [];
      const pathRealizations = (Array.isArray(path?.pathsBySurface) ? path.pathsBySurface : []).map(record => (Array.isArray(record?.paths) ? record.paths : []).find(entry => entry?.formulaSlotKey === "base")?.surfaceValue || "").filter(Boolean);
      const primaryRealizations = (Array.isArray(path?.paths) ? path.paths : []).filter(entry => entry?.formulaSlotKey === "base").flatMap(entry => [...(Array.isArray(entry.surfaceRealizations) ? entry.surfaceRealizations : []), entry.surfaceValue || ""]);
      return [...directRealizations, ...pathRealizations, ...primaryRealizations].map(entry => String(entry || "").trim()).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getVisibleCnvFormulaConnectorRealizations(source = null) {
      const path = getVisibleCnvFormulaSurfacePath(source);
      const directRealizations = Array.isArray(path?.surfaceNumberConnectorRealizations) ? path.surfaceNumberConnectorRealizations : [];
      const pathRealizations = (Array.isArray(path?.pathsBySurface) ? path.pathsBySurface : []).map(record => {
        const num1 = getVisibleCnvFormulaPathRecordSurfaceValue(record, "num1");
        const num2 = getVisibleCnvFormulaPathRecordSurfaceValue(record, "num2");
        if (!num1 && !num2) {
          return "";
        }
        return `${num1 || "0"}-${num2 || "0"}`;
      });
      return [...directRealizations, ...pathRealizations].map(entry => normalizeVisibleCnvFormulaSurfaceZero(entry).trim()).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getVisibleCnvFormulaPathRecordValue(record = null, slotKey = "") {
      const match = getVisibleCnvFormulaPathRecordEntry(record, slotKey);
      return String(match?.surfaceValue || "");
    }
    function getVisibleCnvFormulaPathRecordEntry(record = null, slotKey = "") {
      return (Array.isArray(record?.paths) ? record.paths : []).find(entry => entry?.formulaSlotKey === slotKey);
    }
    function getVisibleCnvFormulaPathRecordSurfaceValue(record = null, slotKey = "") {
      const match = getVisibleCnvFormulaPathRecordEntry(record, slotKey);
      if (!match) {
        return "";
      }
      const surfaceValue = String(match.surfaceValue || "");
      if (surfaceValue === "Ø" || surfaceValue === "0") {
        return "0";
      }
      if (surfaceValue) {
        return surfaceValue;
      }
      const formulaMorph = String(match.formulaMorph || "");
      if (formulaMorph === "Ø" || formulaMorph === "0") {
        return "0";
      }
      return formulaMorph;
    }
    function getVisibleCnvFormulaPathRecordVisibleObjectMorph(record = null, fallbackObjectText = "") {
      const va = getVisibleCnvFormulaPathRecordEntry(record, "va");
      if (va) {
        return String(va.surfaceValue || va.formulaMorph || fallbackObjectText || "");
      }
      const va1 = getVisibleCnvFormulaPathRecordEntry(record, "va1");
      const va2 = getVisibleCnvFormulaPathRecordEntry(record, "va2");
      if (!va1 && !va2) {
        return "";
      }
      const visible = String(va1?.visibleLinearMorph || va2?.visibleLinearMorph || fallbackObjectText || "");
      const va2Formula = String(va2?.formulaMorph || "");
      const va2Surface = String(va2?.surfaceValue || "");
      if (visible && va2Formula && va2Surface && va2Surface !== "0" && va2Surface !== "Ø" && va2Surface !== va2Formula && visible.endsWith(va2Formula)) {
        return `${visible.slice(0, -va2Formula.length)}${va2Surface}`;
      }
      return visible;
    }
    function formatVisibleCnvFormulaEchoForPath(formulaEcho = "", record = null, sourceFrame = null, operationFrame = null) {
      void formulaEcho;
      if (!record) {
        return String(formulaEcho || "").trim();
      }
      const mismatch = getVisibleCnvFormulaAlignmentMismatch(record, sourceFrame, operationFrame);
      return mismatch ? "" : String(operationFrame?.targetFrame?.formula || "");
    }
    function getVisibleCnvFormulaEchoEntries(formulaEcho = "", source = null) {
      const canonicalEntries = getCanonicalVisibleCnvFormulaEchoEntries(source);
      if (canonicalEntries.length) {
        return dedupeVisibleCnvFormulaEchoEntries(canonicalEntries);
      }
      const formula = String(formulaEcho || "").trim();
      if (!formula) {
        return [];
      }
      const surfaceForms = getVisibleCnvFormulaSurfaceForms(source);
      const surfaceDisplay = surfaceForms.join(" / ");
      const slotEcho = getVisibleCnvFormulaSurfaceForms(source).length ? normalizeVisibleCnvFormulaSlotEchoForSurfaceLine(formula) : formula;
      const slotEntries = [{
        value: surfaceForms.length === 1 ? alignVisibleCnvFormulaEchoToSurface(slotEcho, surfaceForms[0]) : slotEcho,
        surface: surfaceDisplay
      }];
      if (!surfaceForms.length || visibleCnvFormulaEchoesCoverSurfaceForms(slotEntries, surfaceForms)) {
        return dedupeVisibleCnvFormulaEchoEntries(slotEntries);
      }
      const path = getVisibleCnvFormulaSurfacePath(source);
      const surfaceSet = new Set(surfaceForms);
      const pathEntries = (Array.isArray(path?.pathsBySurface) ? path.pathsBySurface : []).filter(record => surfaceSet.has(String(record?.surface || "").trim())).map(record => {
        const sourceFrame = buildVisibleCnvFormulaAlignmentSourceFrame(record);
        const operationFrame = buildVisibleCnvFormulaAlignmentOperationFrame(sourceFrame);
        const pathFormula = formatVisibleCnvFormulaEchoForPath(formula, record, sourceFrame, operationFrame);
        return {
          value: alignVisibleCnvFormulaEchoToSurface(pathFormula, String(record?.surface || "").trim(), record, sourceFrame, operationFrame),
          surface: String(record?.surface || "").trim(),
          alignmentSourceFrame: sourceFrame,
          alignmentOperationFrame: operationFrame
        };
      });
      const alignedEntries = dedupeVisibleCnvFormulaEchoEntries(pathEntries);
      if (alignedEntries.length) {
        return alignedEntries;
      }
      return dedupeVisibleCnvFormulaEchoEntries([...alignedEntries, ...slotEntries]);
    }
    function getVisibleCnvFormulaEchoes(formulaEcho = "", source = null) {
      const canonicalEntries = getCanonicalVisibleCnvFormulaEchoEntries(source);
      if (canonicalEntries.length) {
        return canonicalEntries.map(entry => entry.value).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      const formula = String(formulaEcho || "").trim();
      if (!formula) {
        return [];
      }
      return getVisibleCnvFormulaEchoEntries(formula, source).map(entry => entry.value).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function formatVisibleCnvFormulaEcho(formulaEcho = "", source = null) {
      const formulaEchoes = getVisibleCnvFormulaEchoes(formulaEcho, source);
      if (formulaEchoes.length > 1) {
        return formulaEchoes.join(" / ");
      }
      let formula = formulaEchoes[0] || String(formulaEcho || "").trim();
      if (!formula) {
        return "";
      }
      return formula;
    }
    function buildVisibleCnvFormulaEchoChips(formulaEcho = "", source = null) {
      const canonicalEntries = getCanonicalVisibleCnvFormulaEchoEntries(source);
      if (canonicalEntries.length) {
        return dedupeVisibleCnvFormulaEchoEntries(canonicalEntries);
      }
      const formula = String(formulaEcho || "").trim();
      if (!formula) {
        return [];
      }
      return getVisibleCnvFormulaEchoEntries(formula, source);
    }
    function formatVisibleCnvFormulaSurfacePairEcho(result = null, pair = null) {
      const formula = String(pair?.targetFormulaEcho || "").trim();
      if (!formula) {
        return "";
      }
      const surfaceKey = normalizeAndrewsCnvCnnNominalSurfaceKey(pair?.surface || "");
      const path = getVisibleCnvFormulaSurfacePath(result);
      const record = (Array.isArray(path?.pathsBySurface) ? path.pathsBySurface : []).find(entry => normalizeAndrewsCnvCnnNominalSurfaceKey(entry?.surface || "") === surfaceKey);
      if (pair?.formulaRealizationRecord?.kind === "grammar-formula-realization-record" && !record) {
        return formula;
      }
      if (!record) {
        return formatVisibleCnvFormulaEcho(formula, result);
      }
      const sourceFrame = buildVisibleCnvFormulaAlignmentSourceFrame(record);
      const operationFrame = buildVisibleCnvFormulaAlignmentOperationFrame(sourceFrame);
      return alignVisibleCnvFormulaEchoToSurface(formatVisibleCnvFormulaEchoForPath(formula, record, sourceFrame, operationFrame), pair?.surface || "", record, sourceFrame, operationFrame);
    }
    function createLesson4InspectorPanel(title = "", sourceLabel = "") {
      const panel = targetObject.document.createElement("div");
      panel.className = "lesson4-inspector__panel";
      const heading = targetObject.document.createElement("div");
      heading.className = "lesson4-inspector__panel-heading";
      const titleEl = targetObject.document.createElement("span");
      titleEl.className = "lesson4-inspector__panel-title";
      titleEl.textContent = String(title || "");
      heading.appendChild(titleEl);
      if (sourceLabel) {
        const sourceEl = targetObject.document.createElement("span");
        sourceEl.className = "lesson4-inspector__panel-source";
        sourceEl.textContent = String(sourceLabel || "");
        heading.appendChild(sourceEl);
      }
      panel.appendChild(heading);
      return panel;
    }
    function collectLesson4TreeNodes(node = null, depth = 0, entries = []) {
      if (!node || typeof node !== "object") {
        return entries;
      }
      entries.push({
        ...node,
        depth
      });
      const children = Array.isArray(node.children) ? node.children : [];
      children.forEach(child => collectLesson4TreeNodes(child, depth + 1, entries));
      return entries;
    }
    function getLesson4DiagramNodeLabel(node = null) {
      if (!node || typeof node !== "object") {
        return "";
      }
      if (node.key === "nuclear-clause") {
        return "CN";
      }
      if (node.key === "stem") {
        return "Base";
      }
      return node.labelEs || node.key || "";
    }
    function getLesson4DiagramNodeMeta(node = null, shell = null) {
      if (!node || typeof node !== "object") {
        return "";
      }
      if (node.key === "nuclear-clause") {
        return "sujeto + predicado";
      }
      if (node.key === "predicate") {
        return String(shell?.formulaType || "").toUpperCase() === "NNC" ? "núcleo nominal" : "núcleo verbal + tiempo";
      }
      if (node.key === "subject") {
        return "persona + número";
      }
      if (node.key === "verbcore") {
        return "valencia + base";
      }
      if (node.key === "nouncore") {
        return "estado + base";
      }
      if (node.role === "predicate-position" && node.slot === "Ø") {
        return "vacante";
      }
      return "";
    }
    function appendLesson4DiagramNode(parent = null, node = null, shell = null, depth = 0) {
      if (!parent || !node || typeof node !== "object") {
        return;
      }
      const nodeEl = targetObject.document.createElement("div");
      const roleClass = node.role ? `lesson4-inspector__diagram-node--${node.role}` : "";
      const keyClass = node.key && node.key !== node.role ? `lesson4-inspector__diagram-node--${node.key}` : "";
      nodeEl.className = ["lesson4-inspector__diagram-node", roleClass, keyClass, node.role === "predicate-position" && node.slot === "Ø" ? "is-vacant" : ""].filter(Boolean).join(" ");
      nodeEl.dataset.depth = String(depth);
      if (node.slot) {
        nodeEl.dataset.slot = String(node.slot);
      }
      const row = targetObject.document.createElement("div");
      row.className = "lesson4-inspector__diagram-node-row";
      const label = targetObject.document.createElement("span");
      label.className = "lesson4-inspector__diagram-node-label";
      label.textContent = getLesson4DiagramNodeLabel(node);
      row.appendChild(label);
      if (node.slot) {
        row.appendChild(createLesson4InspectorChip(formatVisibleAndrewsSlotToken(node.slot), "lesson4-inspector__chip--slot"));
      }
      const meta = getLesson4DiagramNodeMeta(node, shell);
      if (meta) {
        const metaEl = targetObject.document.createElement("span");
        metaEl.className = "lesson4-inspector__diagram-node-meta";
        metaEl.textContent = meta;
        row.appendChild(metaEl);
      }
      nodeEl.appendChild(row);
      const children = Array.isArray(node.children) ? node.children : [];
      if (children.length) {
        const childList = targetObject.document.createElement("div");
        childList.className = "lesson4-inspector__diagram-children";
        children.forEach(child => appendLesson4DiagramNode(childList, child, shell, depth + 1));
        nodeEl.appendChild(childList);
      }
      parent.appendChild(nodeEl);
    }
    function appendLesson4CompactDiagram(parent = null, shell = null) {
      const root = shell?.lesson4?.diagramTree?.root || shell?.diagramTree?.root || null;
      if (!parent || !root) {
        return;
      }
      const diagram = targetObject.document.createElement("div");
      diagram.className = "lesson4-inspector__diagram";
      diagram.setAttribute("aria-label", "diagrama Andrews: CN, sujeto, predicado y subposiciones");
      appendLesson4DiagramNode(diagram, root, shell, 0);
      parent.appendChild(diagram);
    }
    function getLesson4InspectorFormulaOptions(shell = null) {
      const lesson4 = shell?.lesson4 && typeof shell.lesson4 === "object" ? shell.lesson4 : null;
      const control = lesson4?.predicatePositionControl || shell?.predicatePositionControl || null;
      return Array.isArray(control?.options) ? control.options : [];
    }
    function getLesson4InspectorPronounLabels(shell = null) {
      const frame = shell?.lesson4?.personalPronounFrame || shell?.personalPronounFrame || null;
      const fillers = Array.isArray(frame?.fillers) ? frame.fillers : [];
      return fillers.filter(entry => entry?.isPresent).map(entry => {
        const featureLabel = entry.features ? `${entry.features.personLabelEs}, ${entry.features.numberLabelEs}` : "sin resolver";
        return `${entry.caseLabelEs}: ${entry.display} (${featureLabel})`;
      });
    }
    function getLesson4InspectorPronounCategoryLabel(category = "") {
      const labels = {
        person: "persona",
        animacy: "animacidad",
        humanness: "humanidad",
        number: "número",
        case: "caso"
      };
      return labels[String(category || "").trim()] || String(category || "").trim();
    }
    function appendLesson4NuclearClauseInspector(panel = null, shell = null) {
      const lesson4 = shell?.lesson4 && typeof shell.lesson4 === "object" ? shell.lesson4 : null;
      if (!panel || !lesson4) {
        return;
      }
      const section = targetObject.document.createElement("section");
      section.className = "lesson4-inspector";
      section.dataset.formulaType = shell.formulaType || "";
      section.setAttribute("aria-label", "Andrews Lección 4");
      const heading = targetObject.document.createElement("div");
      heading.className = "lesson4-inspector__heading";
      const title = targetObject.document.createElement("div");
      title.className = "lesson4-inspector__title";
      title.textContent = `Arquitectura CN · ${getVisibleNuclearClauseShellLabel(shell)}`;
      title.title = "Andrews Lección 4";
      const chips = targetObject.document.createElement("div");
      chips.className = "lesson4-inspector__chips";
      chips.append(createLesson4InspectorChip("Cláusula nuclear"), createLesson4InspectorChip("clasificación"), createLesson4InspectorChip(`§4.1 ${lesson4.useFrame?.activeRoleLabelEs || "uso sin fijar"}`));
      heading.append(title, chips);
      section.appendChild(heading);
      const body = targetObject.document.createElement("div");
      body.className = "lesson4-inspector__body";
      const structurePanel = createLesson4InspectorPanel("Estructura Andrews", "§4.2-4.5");
      const profile = lesson4.predicateFunctionProfile || shell.predicateFunctionProfile || null;
      const formulaType = String(shell.formulaType || "").toUpperCase();
      const structureFacts = targetObject.document.createElement("div");
      structureFacts.className = "lesson4-inspector__facts lesson4-inspector__facts--structure";
      structureFacts.appendChild(createLesson4InspectorLine("CN", "sujeto + predicado", "lesson4-inspector__line--thesis"));
      structureFacts.appendChild(createLesson4InspectorLine("sujeto", "persona1-persona2 + número1-número2"));
      const predicateStructure = formulaType === "NNC" ? "núcleo nominal = estado + base" : "núcleo verbal = valencia + base + tiempo";
      structureFacts.appendChild(createLesson4InspectorLine("predicado", predicateStructure));
      if (profile?.labelEs) {
        const values = Array.isArray(profile.predicatorValuesEs) && profile.predicatorValuesEs.length ? ` · ${profile.predicatorValuesEs.join(" / ")}` : "";
        structureFacts.appendChild(createLesson4InspectorLine("valores", `${profile.predicateRoleEs || profile.labelEs}${values}`));
      }
      structurePanel.appendChild(structureFacts);
      appendLesson4CompactDiagram(structurePanel, shell);
      const detailPanel = createLesson4InspectorPanel("Clasificación", "§4.1-4.6");
      const facts = targetObject.document.createElement("div");
      facts.className = "lesson4-inspector__facts";
      facts.appendChild(createLesson4InspectorLine("tipo", getVisibleNuclearClauseShellLabel(shell)));
      const useLabel = lesson4.useFrame?.activeRoleLabelEs || "";
      if (useLabel) {
        const useClass = /^sin\b/i.test(useLabel) ? "lesson4-inspector__line--context" : "";
        facts.appendChild(createLesson4InspectorLine("uso", useLabel, useClass));
      }
      const activeFormula = lesson4.activeFormula && typeof lesson4.activeFormula === "object" ? lesson4.activeFormula : null;
      const predicatePosition = [activeFormula?.predicatePositionLabel || "", activeFormula?.predicatePositionStatusLabel || ""].filter(Boolean).join(": ");
      if (predicatePosition) {
        facts.appendChild(createLesson4InspectorLine("posición", predicatePosition));
      }
      const pronounFrame = lesson4.personalPronounFrame || shell.personalPronounFrame || null;
      if (pronounFrame) {
        const pronounRule = [pronounFrame.form === "affixal-only" ? "afijal" : "", pronounFrame.onlyReferringElements === true ? "referente único" : ""].filter(Boolean).join(" · ");
        if (pronounRule) {
          facts.appendChild(createLesson4InspectorLine("pronombre", pronounRule));
        }
        const categories = Array.isArray(pronounFrame.categories) ? pronounFrame.categories.map(entry => getLesson4InspectorPronounCategoryLabel(entry)).filter(Boolean) : [];
        if (categories.length) {
          facts.appendChild(createLesson4InspectorLine("categorías", categories.join(" · ")));
        }
        if (pronounFrame.noGender === true) {
          facts.appendChild(createLesson4InspectorLine("género", "no"));
        }
        facts.appendChild(createLesson4InspectorLine("casos", "nominativo: sujeto · objetivo: predicado CNV · posesivo: predicado CNN"));
      }
      const pronouns = getLesson4InspectorPronounLabels(shell);
      if (pronouns.length) {
        facts.appendChild(createLesson4InspectorLine("pronombres", pronouns.join(" · ")));
      }
      const referenceStatus = lesson4.personalPronounFrame?.referenceResolution?.status || "";
      const commonNumberStatus = lesson4.personalPronounFrame?.commonNumberResolution?.status || "";
      const diagnostics = [referenceStatus === "context-required" ? "referencia: contexto" : "", commonNumberStatus === "context-required" ? "número común: contexto" : ""].filter(Boolean);
      if (diagnostics.length) {
        facts.appendChild(createLesson4InspectorLine("contexto", diagnostics.join(" · "), "lesson4-inspector__line--context"));
      }
      if (facts.childElementCount) {
        detailPanel.appendChild(facts);
      }
      const options = getLesson4InspectorFormulaOptions(shell);
      if (options.length) {
        const optionRow = targetObject.document.createElement("div");
        optionRow.className = "lesson4-inspector__formula-options";
        optionRow.setAttribute("aria-label", "opciones Andrews sección 4.5");
        options.forEach(entry => {
          const option = targetObject.document.createElement("span");
          option.className = "lesson4-inspector__formula-option";
          option.dataset.status = entry.predicatePositionStatus || "";
          option.dataset.active = String(Boolean(entry.isActive));
          option.textContent = entry.roleLabelEs || formatVisibleAndrewsFormula(entry.labelEs || entry.predicatePositionSlot || "");
          if (entry.isActive) {
            option.classList.add("is-active");
          }
          option.title = formatVisibleAndrewsFormula(entry.formula || "");
          optionRow.appendChild(option);
        });
        detailPanel.appendChild(optionRow);
      }
      body.append(structurePanel, detailPanel);
      section.appendChild(body);
      panel.appendChild(section);
    }
    function ensureTenseDescriptionBody(panel = null) {
      if (!panel) {
        return null;
      }
      const tagName = String(panel.tagName || "").toLowerCase();
      if (tagName !== "details") {
        return panel;
      }
      const children = () => Array.from(panel.children || []);
      let summary = children().find(child => child.classList?.contains("tense-description__summary"));
      if (!summary) {
        summary = targetObject.document.createElement("summary");
        summary.className = "tense-description__summary";
        panel.prepend(summary);
      }
      let title = Array.from(summary.children || []).find(child => child.classList?.contains("tense-description__summary-title"));
      if (!title) {
        title = targetObject.document.createElement("span");
        title.className = "tense-description__summary-title";
        title.textContent = "Descripción";
        summary.prepend(title);
      }
      let value = Array.from(summary.children || []).find(child => child.classList?.contains("tense-description__summary-value"));
      if (!value) {
        value = targetObject.document.createElement("span");
        value.className = "tense-description__summary-value";
        summary.appendChild(value);
      }
      let body = children().find(child => child.classList?.contains("tense-description__body"));
      if (!body) {
        body = targetObject.document.createElement("div");
        body.className = "tense-description__body";
        panel.appendChild(body);
      }
      return body;
    }
    function updateTenseDescriptionSummary(panel = null, entries = []) {
      if (!panel || String(panel.tagName || "").toLowerCase() !== "details") {
        return;
      }
      const summary = Array.from(panel.children || []).find(child => child.classList?.contains("tense-description__summary"));
      const value = Array.from(summary?.children || []).find(child => child.classList?.contains("tense-description__summary-value"));
      if (!value) {
        return;
      }
      const labels = (Array.isArray(entries) ? entries : []).map(entry => String(entry?.label || "").trim()).filter(Boolean);
      value.textContent = labels.slice(0, 2).join(" · ");
    }
    function appendTenseDescriptionEntries(body = null, entries = []) {
      if (!body) {
        return;
      }
      body.innerHTML = "";
      (Array.isArray(entries) ? entries : []).forEach(entry => {
        if (!entry || !entry.label) {
          return;
        }
        const item = targetObject.document.createElement("div");
        item.className = "tense-description__item";
        const label = targetObject.document.createElement("div");
        label.className = "tense-description__label";
        label.textContent = entry.label;
        if (entry.hoverTitle) {
          label.title = entry.hoverTitle;
        }
        item.appendChild(label);
        if (entry.description) {
          const text = targetObject.document.createElement("div");
          text.className = "tense-description__text";
          text.textContent = entry.description;
          item.appendChild(text);
        }
        body.appendChild(item);
      });
    }
    function updateTensePanelDescription() {
      const panel = targetObject.document.getElementById("tense-description");
      if (!panel) {
        return;
      }
      const body = ensureTenseDescriptionBody(panel);
      const entries = [];
      const tenseMode = targetObject.getActiveTenseMode();
      applyOutputPanelShellForTenseMode(tenseMode);
      const selectionState = targetObject.getCurrentResolvedConjugationSelectionState({
        tenseMode
      });
      const selectedTense = selectionState.tenseValue;
      const isNawat = Boolean(targetObject.document.getElementById("language")?.checked);
      if (tenseMode === targetObject.TENSE_MODE.particula) {
        entries.push({
          label: "Partículas",
          hoverTitle: "Andrews Lección 3",
          description: "Inventario diagnóstico: partículas, negativas, colocaciones e interjecciones; sin generación verbal o nominal."
        });
        updateTenseDescriptionSummary(panel, entries);
        appendTenseDescriptionEntries(body, entries);
        return;
      }
      if (tenseMode === targetObject.TENSE_MODE.verbo) {
        const isNonactive = targetObject.getCombinedMode() === targetObject.COMBINED_MODE.nonactive;
        if (isNonactive) {
          const suffix = targetObject.getSelectedNonactiveSuffix();
          if (suffix) {
            const nonactivePrefix = targetObject.getLocalizedLabel(targetObject.NONACTIVE_PREFIX_LABEL, isNawat, "no activo");
            entries.push({
              label: `${nonactivePrefix} ${targetObject.getLocalizedLabel(targetObject.NONACTIVE_SUFFIX_LABELS[suffix], isNawat, suffix)}`,
              description: targetObject.getLocalizedDescription(targetObject.NONACTIVE_SUFFIX_DESCRIPTIONS[suffix], isNawat)
            });
          }
        }
        if (selectionState.group === targetObject.CONJUGATION_GROUPS.universal) {
          const selected = selectionState.universalTenseValue;
          const classDetail = targetObject.getPretUniversalClassDetail(selected);
          entries.push({
            label: classDetail ? targetObject.getLocalizedLabel(classDetail.label, isNawat, selected) : selected,
            description: classDetail ? targetObject.getLocalizedDescription(classDetail.description, isNawat) : ""
          });
        } else {
          entries.push({
            label: targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[selectedTense], isNawat, selectedTense),
            description: targetObject.getLocalizedDescription(targetObject.TENSE_DESCRIPTIONS[selectedTense], isNawat)
          });
          if (targetObject.PRETERITO_CLASS_TENSES.has(selectedTense) && selectionState.classFilter) {
            const classDetail = targetObject.PRETERITO_CLASS_DETAIL_BY_KEY[selectionState.classFilter];
            if (classDetail) {
              entries.push({
                label: targetObject.getLocalizedLabel(classDetail.label, isNawat, classDetail.label || ""),
                description: targetObject.getLocalizedDescription(classDetail.description, isNawat)
              });
            }
          }
        }
      } else {
        entries.push({
          label: targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[selectedTense], isNawat, selectedTense),
          description: targetObject.getLocalizedDescription(targetObject.TENSE_DESCRIPTIONS[selectedTense], isNawat)
        });
      }
      const clauseShell = typeof targetObject.getCurrentNuclearClauseShell === "function" ? targetObject.getCurrentNuclearClauseShell({
        mode: tenseMode
      }) : null;
      updateTenseDescriptionSummary(panel, entries);
      appendTenseDescriptionEntries(body, entries);
      appendLesson4NuclearClauseInspector(body, clauseShell);
    }
    function getExplainabilitySelectedTense(tenseOverride = null) {
      if (tenseOverride) {
        return String(tenseOverride || "");
      }
      const selectionState = targetObject.buildConjugationSelectionState();
      return String(selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue);
    }
    function resolveOutputPanelProvenance({
      verb = "",
      objectPrefix = "",
      tenseOverride = null
    }) {
      if (targetObject.getActiveTenseMode() !== targetObject.TENSE_MODE.verbo) {
        return null;
      }
      const resolvedVerb = String(verb || "");
      if (!resolvedVerb) {
        return null;
      }
      const resolvedTense = getExplainabilitySelectedTense(tenseOverride);
      if (!resolvedTense) {
        return null;
      }
      const resolvedObjectPrefix = typeof objectPrefix === "string" ? objectPrefix : targetObject.getCurrentObjectPrefix();
      const silentResult = targetObject.getCachedSilentGenerateWord({
        silent: true,
        skipValidation: true,
        allowPassiveObject: targetObject.getCombinedMode() === targetObject.COMBINED_MODE.nonactive,
        override: {
          tenseMode: targetObject.getActiveTenseMode(),
          derivationMode: targetObject.getActiveDerivationMode(),
          derivationType: targetObject.getActiveDerivationType(),
          voiceMode: targetObject.getActiveVoiceMode()
        },
        posicionesFormula: {
          pers1: "",
          obj1: resolvedObjectPrefix,
          tronco: resolvedVerb,
          pers2: "",
          num2: "",
          poseedor: "",
          tiempo: resolvedTense
        }
      });
      if (silentResult && !silentResult.error && silentResult.stemProvenance) {
        return silentResult.stemProvenance;
      }
      if (targetObject.VerbScreenAnsState.tense === resolvedTense && targetObject.VerbScreenAnsState.provenance) {
        return targetObject.VerbScreenAnsState.provenance;
      }
      return null;
    }
    function activateCnnOutputModeForContinuation({
      clearRoute = true
    } = {}) {
      if (typeof targetObject.TENSE_MODE === "undefined" || !targetObject.TENSE_MODE?.sustantivo) {
        return;
      }
      if (typeof targetObject.setActiveNawatTenseMode === "function") {
        targetObject.setActiveNawatTenseMode(targetObject.TENSE_MODE.sustantivo, {
          syncOutput: true
        });
      } else if (typeof targetObject.setActiveTenseMode === "function") {
        targetObject.setActiveTenseMode(targetObject.TENSE_MODE.sustantivo, {
          modeSystem: typeof targetObject.TENSE_MODE_SYSTEM !== "undefined" ? targetObject.TENSE_MODE_SYSTEM.nawat || targetObject.TENSE_MODE_SYSTEM.unit || "nawat" : "nawat",
          clearRoute
        });
      }
      if (typeof targetObject.setActiveTenseMode === "function") {
        targetObject.setActiveTenseMode(targetObject.TENSE_MODE.sustantivo, {
          modeSystem: typeof targetObject.TENSE_MODE_SYSTEM !== "undefined" ? targetObject.TENSE_MODE_SYSTEM.function || targetObject.TENSE_MODE_SYSTEM.european || "function" : "function",
          syncConventionState: true,
          clearRoute: false
        });
      }
      if (typeof targetObject.updateTenseModeTabs === "function") {
        targetObject.updateTenseModeTabs();
      }
    }
    function getSharedLetterPrefixLength(leftValue = "", rightValue = "") {
      const leftLetters = targetObject.splitVerbLetters(targetObject.normalizeDerivationStemValue(leftValue));
      const rightLetters = targetObject.splitVerbLetters(targetObject.normalizeDerivationStemValue(rightValue));
      const limit = Math.min(leftLetters.length, rightLetters.length);
      let index = 0;
      while (index < limit && leftLetters[index] === rightLetters[index]) {
        index += 1;
      }
      return index;
    }
    function getSurfaceFamilyBaseCutIndex(surface = "") {
      const normalizedSurface = targetObject.normalizeDerivationStemValue(surface);
      const letters = targetObject.splitVerbLetters(normalizedSurface);
      if (!letters.length) {
        return 0;
      }
      const syllables = targetObject.splitVerbSyllables(normalizedSurface);
      if (!syllables.length) {
        return Math.max(letters.length - 1, 0);
      }
      const syllableStartIndexes = [];
      let cursor = 0;
      syllables.forEach(syllable => {
        syllableStartIndexes.push(cursor);
        cursor += Array.isArray(syllable?.letters) ? syllable.letters.length : 0;
      });
      for (let index = syllables.length - 1; index >= 0; index -= 1) {
        const syllable = syllables[index];
        if (!syllable?.nucleus) {
          continue;
        }
        if (syllable.onset) {
          return syllableStartIndexes[index];
        }
        if (index > 0) {
          const previousSyllable = syllables[index - 1];
          const previousStart = syllableStartIndexes[index - 1];
          if (previousSyllable?.nucleus) {
            if (previousSyllable.coda) {
              return previousStart;
            }
            return Math.max(previousStart + (previousSyllable.letters?.length || 1) - 1, 0);
          }
        }
        return syllableStartIndexes[index];
      }
      return Math.max(letters.length - 1, 0);
    }
    function getLetterSliceText(surface = "", startIndex = 0) {
      const letters = targetObject.splitVerbLetters(targetObject.normalizeDerivationStemValue(surface));
      if (!letters.length) {
        return "";
      }
      const clampedStart = Math.max(0, Math.min(startIndex, letters.length - 1));
      return letters.slice(clampedStart).join("");
    }
    const NAWAT_PATIENTIVO_BRANCH_OPTIONS = [{
      id: "passive",
      label: "pasivo",
      sourceScope: "nonactive"
    }, {
      id: "impersonal",
      label: "impersonal",
      sourceScope: "nonactive"
    }, {
      id: "perfectivo",
      label: "perfectivo",
      sourceScope: "active"
    }, {
      id: "imperfectivo",
      label: "imperfectivo",
      sourceScope: "active"
    }, {
      id: "tronco-verbal",
      label: "tronco verbal",
      sourceScope: "active"
    }];
    const DEFAULT_NAWAT_PATIENTIVO_BRANCH = "imperfectivo";
    const NAWAT_TRONCO_CONVERSION_ROUTE_SPECS = [{
      routeKey: "denominal-vi-ti-preterit",
      line: "-ti",
      tenseValue: "preterito"
    }, {
      routeKey: "denominal-vi-ti-perfect",
      line: "-ti",
      tenseValue: "perfecto"
    }, {
      routeKey: "denominal-vi-iwi-preterit",
      line: "-iwi",
      tenseValue: "preterito"
    }, {
      routeKey: "denominal-vi-iwi-perfect",
      line: "-iwi",
      tenseValue: "perfecto"
    }, {
      routeKey: "denominal-vi-awi-preterit",
      line: "-awi",
      tenseValue: "preterito"
    }, {
      routeKey: "denominal-vi-awi-perfect",
      line: "-awi",
      tenseValue: "perfecto"
    }, {
      routeKey: "denominal-vt-na-preterit",
      line: "-na",
      tenseValue: "preterito"
    }, {
      routeKey: "denominal-vt-na-perfect",
      line: "-na",
      tenseValue: "perfecto"
    }];
    const NAWAT_VERB_NOUN_CONVERSION_ROUTE_KEYS = ["patientivo-nonactive-t", "patientivo-perfective-ti-noun", "patientivo-imperfective-t"];
    const NAWAT_PATIENTIVO_SOURCE_TENSE_OPTIONS = [{
      sourceCombinedMode: "active",
      tenseValue: "presente"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "presente-habitual"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "presente-desiderativo"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "imperfecto"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "preterito"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "pasado-remoto"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "perfecto"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "pluscuamperfecto"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "condicional-perfecto"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "futuro"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "condicional"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "optativo"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "presente"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "presente-habitual"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "presente-desiderativo"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "imperfecto"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "preterito"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "pasado-remoto"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "perfecto"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "pluscuamperfecto"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "condicional-perfecto"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "futuro"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "condicional"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "optativo"
    }];
    const NAWAT_PATIENTIVO_SOURCE_TENSE_MENU_GROUPS = [{
      label: "optativo",
      tenseValues: ["optativo"]
    }, {
      label: "presente",
      tenseValues: ["presente", "presente-habitual", "presente-desiderativo"]
    }, {
      label: "pasado",
      tenseValues: ["imperfecto", "preterito", "pasado-remoto", "perfecto", "pluscuamperfecto", "condicional-perfecto"]
    }, {
      label: "futuro",
      tenseValues: ["futuro", "condicional"]
    }];
    function getNawatPatientivoBranchOption(branchId = "") {
      return NAWAT_PATIENTIVO_BRANCH_OPTIONS.find(option => option.id === branchId) || NAWAT_PATIENTIVO_BRANCH_OPTIONS[0];
    }
    function getNawatPatientivoBranchStateStore() {
      return typeof targetObject.getNawatRouteStateStore === "function" ? targetObject.getNawatRouteStateStore() : null;
    }
    function getActiveNawatPatientivoBranch() {
      return getNawatPatientivoBranchOption(getNawatPatientivoBranchStateStore()?.activePatientivoBranch || targetObject.window.__NAWAT_ACTIVE_PATIENTIVO_BRANCH__ || DEFAULT_NAWAT_PATIENTIVO_BRANCH).id;
    }
    function setActiveNawatPatientivoBranch(branchId = "") {
      const option = getNawatPatientivoBranchOption(branchId);
      const store = getNawatPatientivoBranchStateStore();
      if (store) {
        store.activePatientivoBranch = option.id;
      }
      targetObject.window.__NAWAT_ACTIVE_PATIENTIVO_BRANCH__ = option.id;
    }
    function isPatientivoTroncoRouteProfile(profile = null) {
      if (typeof targetObject.isPatientivoTroncoConversionRoute === "function") {
        return targetObject.isPatientivoTroncoConversionRoute(profile);
      }
      return profile?.routePlacement === "patientivo-tronco-conversion" || !profile?.routePlacement && Boolean(profile?.verbalizer);
    }
    function isAgentiveMannerRouteProfile(profile = null) {
      return false;
    }
    function isPatientivoSurfaceRouteProfile(profile = null) {
      if (typeof targetObject.isPatientivoSurfaceRoute === "function") {
        return targetObject.isPatientivoSurfaceRoute(profile);
      }
      return profile?.routePlacement === "patientivo-surface";
    }
    function isVerbNounConversionRouteProfile(profile = null) {
      return isPatientivoSurfaceRouteProfile(profile) || profile?.targetMode === targetObject.TENSE_MODE.sustantivo || profile?.nawatMode === targetObject.TENSE_MODE.sustantivo;
    }
    function getNawatRoutePlacementName(profile = null) {
      if (typeof targetObject.getNawatRoutePlacement === "function") {
        return targetObject.getNawatRoutePlacement(profile);
      }
      if (isPatientivoTroncoRouteProfile(profile)) {
        return "patientivo-tronco-conversion";
      }
      return profile?.routePlacement || "";
    }
    function getNawatPatientivoBranchLabel(branchId = "") {
      const option = getNawatPatientivoBranchOption(branchId);
      const isNawat = Boolean(targetObject.document.getElementById("language")?.checked);
      return typeof targetObject.getPatientivoSourceTenseLabel === "function" ? targetObject.getPatientivoSourceTenseLabel(option.id, isNawat) : option.label;
    }
    function getNawatPatientivoBranchClassLabel(branchId = "") {
      const option = getNawatPatientivoBranchOption(branchId);
      return option.sourceScope === "nonactive" ? "NA" : "A";
    }
    function getNawatPatientivoSourceClassCode(sourceCombinedMode = "") {
      return String(sourceCombinedMode || "").trim() === "nonactive" ? "NA" : "A";
    }
    function getNawatPatientivoSourceTenseOptionLabel(option = {}, isNawat = false) {
      const tenseValue = String(option.tenseValue || "").trim();
      const tenseLabel = tenseValue && typeof targetObject.getLocalizedLabel === "function" ? targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[tenseValue], isNawat, tenseValue) : tenseValue;
      return [getNawatPatientivoSourceClassCode(option.sourceCombinedMode), tenseLabel].filter(Boolean).join(" ");
    }
    function getNawatPatientivoTenseOptionLabel(tenseValue = "", isNawat = false) {
      const normalizedTenseValue = String(tenseValue || "").trim();
      return normalizedTenseValue && typeof targetObject.getLocalizedLabel === "function" ? targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[normalizedTenseValue], isNawat, normalizedTenseValue) : normalizedTenseValue;
    }
    const NOMINALIZATION_SOURCE_UNITS = Object.freeze({
      vncCoreStem: "vnc-core-stem",
      vncPredicate: "vnc-predicate"
    });
    function getNominalizationSourceUnitLabel(sourceUnit = "") {
      const normalized = String(sourceUnit || "").trim();
      if (normalized === NOMINALIZATION_SOURCE_UNITS.vncCoreStem) {
        return "VNC core/stem";
      }
      if (normalized === NOMINALIZATION_SOURCE_UNITS.vncPredicate) {
        return "VNC predicate";
      }
      return normalized;
    }
    function appendNominalizationSourceUnitSubLabel(baseLabel = "", sourceUnit = "") {
      return [baseLabel, getNominalizationSourceUnitLabel(sourceUnit)].filter(Boolean).join(" · ");
    }
    function getVerbDerivedNominalizationProfileLabel(map = {}, value = "", fallback = "") {
      const normalized = String(value || "").trim();
      if (!normalized) {
        return fallback;
      }
      return map[normalized] || fallback || normalized;
    }
    function buildVerbDerivedNominalizationProfileSubLabels(profile = null, {
      isNawat = false
    } = {}) {
      if (!profile || profile.outputKind !== "verb-derived-nominal") {
        return [];
      }
      const kindLabels = {
        "action-nominal": "accion/proceso",
        agentive: "agentivo",
        patientive: "patientivo",
        instrumentive: "instrumentivo",
        "quality-result": "calificativo",
        "potential-patient": "paciente potencial",
        "locative-temporal": "locativo-temporal",
        "patientive-adjectival": "adjetivo patientivo",
        "adjectival-surface": "adjetivo"
      };
      const roleLabels = {
        "action/process": "accion/proceso",
        agent: "agente",
        "patient/result": "paciente/resultado",
        "potential-patient": "paciente potencial",
        instrument: "instrumento",
        "quality/result": "cualidad/resultado",
        "place/time": "lugar/tiempo",
        property: "propiedad"
      };
      const patientiveFamilyLabels = {
        nonactive: "no activo",
        perfectivo: "perfectivo",
        imperfectivo: "imperfectivo",
        "tronco-verbal": "tronco verbal"
      };
      const adjectivalFunctionLabels = {
        "predicate-surface": "predicado"
      };
      const role = profile.role || {};
      const source = profile.source || {};
      const boundaries = profile.boundaries || {};
      const labels = [];
      if (boundaries.nominalizationScope === "structural-word-output") {
        labels.push("ambito: salida estructural");
      }
      const operationalFrame = getAndrewsCnvCnnNominalRenderingFrame({
        nominalizationProfile: profile
      });
      if (operationalFrame?.formulaEcho) {
        labels.push(`Andrews CNV->CNN: ${operationalFrame.formulaEcho}`);
      }
      if (operationalFrame?.routeFormulaEcho || operationalFrame?.sourceToTargetFormulaEcho) {
        labels.push(`ruta formula: ${operationalFrame.routeFormulaEcho || operationalFrame.sourceToTargetFormulaEcho}`);
      }
      if (Array.isArray(operationalFrame?.formulaSurfacePairs) && operationalFrame.formulaSurfacePairs.length) {
        labels.push(`formas: ${operationalFrame.formulaSurfacePairs.map(entry => `${entry.surface}: ${entry.sourceFormulaEcho || "SOURCE"} -> ${entry.targetFormulaEcho}`).join(" / ")}`);
      }
      if (operationalFrame?.operationApplied) {
        labels.push(`operacion Andrews: ${operationalFrame.operationApplied}`);
      }
      if (operationalFrame?.generationAllowed === true && operationalFrame?.surface) {
        labels.push(`salida por Andrews: ${operationalFrame.surface}`);
      }
      const nominalizationKindLabel = getVerbDerivedNominalizationProfileLabel(kindLabels, role.nominalizationKind || profile.nominalKind, profile.nominalKind || "");
      if (nominalizationKindLabel) {
        labels.push(`${ANDREWS_RENDERING_TERMS.nominalization}: ${nominalizationKindLabel}`);
      }
      const semanticRoleLabel = getVerbDerivedNominalizationProfileLabel(roleLabels, role.semanticRole, "");
      if (semanticRoleLabel) {
        labels.push(`rol nominal: ${semanticRoleLabel}`);
      }
      const sourceTense = String(source.sourceTense || "").trim();
      if (sourceTense) {
        labels.push(`${ANDREWS_RENDERING_TERMS.sourceVnc}: ${getNawatPatientivoTenseOptionLabel(sourceTense, isNawat)}`);
      }
      const sourceUnitLabel = getNominalizationSourceUnitLabel(source.sourceUnit || "");
      if (sourceUnitLabel) {
        labels.push(`${ANDREWS_RENDERING_TERMS.sourceVnc}: ${sourceUnitLabel}`);
      }
      if (profile.instrumentiveNote2Frame?.grammarSource === "Andrews 36.6 note 2") {
        labels.push("36.6 n.2: excepciones de estado");
      }
      const patientiveFamilyLabel = getVerbDerivedNominalizationProfileLabel(patientiveFamilyLabels, role.patientiveFamily, "");
      if (patientiveFamilyLabel) {
        labels.push(`familia patientiva: ${patientiveFamilyLabel}`);
      }
      const patientiveFamilyProfile = profile.patientiveFamilyProfile || null;
      if (patientiveFamilyProfile?.sourcePatternLabel) {
        labels.push(`${ANDREWS_RENDERING_TERMS.patientiveSource}: ${patientiveFamilyProfile.sourcePatternLabel}`);
      }
      if (patientiveFamilyProfile?.sourceFamilyLabel) {
        labels.push(`familias Andrews: ${patientiveFamilyProfile.sourceFamilyLabel}`);
      }
      if (patientiveFamilyProfile?.sourceFamilyBoundary) {
        labels.push(`limite patientivo: ${patientiveFamilyProfile.sourceFamilyBoundary}`);
      }
      if (patientiveFamilyProfile?.sourceStageModel?.slot) {
        labels.push(`etapa salida: ${patientiveFamilyProfile.sourceStageModel.slot}`);
      }
      if (patientiveFamilyProfile && patientiveFamilyProfile.isCompletePatientiveTaxonomy === false) {
        labels.push("taxonomía patientiva: parcial");
      }
      const adjectivalFunctionLabel = getVerbDerivedNominalizationProfileLabel(adjectivalFunctionLabels, role.adjectivalFunction, "");
      if (adjectivalFunctionLabel) {
        labels.push(`función adjetival: ${adjectivalFunctionLabel}`);
      }
      if (adjectivalFunctionLabel && boundaries.doesNotImplementLessons42_43) {
        labels.push("modificación: no modelada");
      }
      return labels;
    }
    function appendVerbDerivedNominalizationProfileSubLabels(baseLabel = "", profile = null, {
      isNawat = false
    } = {}) {
      return [baseLabel, ...buildVerbDerivedNominalizationProfileSubLabels(profile, {
        isNawat
      })].filter(Boolean).join(" · ");
    }
    function getVisibleDenominalRouteFamilyLabel(routeFamily = "", fallback = "") {
      const familyLabels = {
        "vi-ti": "intransitiva -ti",
        "vi-iwi": "intransitiva -iwi",
        "vi-awi": "intransitiva -awi",
        "vt-na": "transitiva -na"
      };
      const normalized = String(routeFamily || "").trim();
      return familyLabels[normalized] || fallback || normalized;
    }
    function buildDenominalFamilyProfileSubLabels(profile = null) {
      if (!profile || profile.outputKind !== "denominal-route") {
        return [];
      }
      const labels = [];
      const routeFamily = String(profile.routeFamily || "").trim();
      if (routeFamily) {
        labels.push(`Familia denominal: ${getVisibleDenominalRouteFamilyLabel(routeFamily, routeFamily)}`);
      }
      const verbalizer = String(profile.verbalizer || "").trim();
      if (verbalizer) {
        labels.push(`Verbalizador denominal: ${verbalizer}`);
      }
      const suffixContract = profile.suffixContract && typeof profile.suffixContract === "object" ? profile.suffixContract : null;
      if (suffixContract?.classicalSuffix && suffixContract?.nawatVerbalizer) {
        labels.push(`Contrato Andrews: ${suffixContract.classicalSuffix} -> ${suffixContract.nawatVerbalizer}`);
      }
      if (profile.boundaries?.noAndrewsSuffixContract === true) {
        labels.push("Contrato Andrews: no confirmado");
      }
      const contractCoverage = profile.andrewsContractCoverage && typeof profile.andrewsContractCoverage === "object" ? profile.andrewsContractCoverage : null;
      const pendingCount = Number(contractCoverage?.unmodeledContractCount || 0) + Number(contractCoverage?.targetUnmodeledContractCount || 0);
      if (pendingCount > 0) {
        labels.push(`Contratos Andrews pendientes: ${pendingCount}`);
      }
      if (Array.isArray(contractCoverage?.nawatOnlyRouteFamilies) && contractCoverage.nawatOnlyRouteFamilies.length) {
        const nawatOnlyRouteLabels = contractCoverage.nawatOnlyRouteFamilies.map(family => getVisibleDenominalRouteFamilyLabel(family, family)).filter(Boolean);
        labels.push(`Rutas Nawat sin contrato Andrews: ${nawatOnlyRouteLabels.join(", ")}`);
      }
      const contractRoutePreview = profile.andrewsContractRoutePreview && typeof profile.andrewsContractRoutePreview === "object" ? profile.andrewsContractRoutePreview : null;
      labels.push(...buildNawatDenominalSourceEvidenceSubLabels(profile.sourceEvidence || contractRoutePreview?.sourceEvidence));
      const routeTargetCount = Number(contractRoutePreview?.routeCount || 0);
      if (routeTargetCount > 0) {
        labels.push(`Objetivos Andrews nominales/verbales: ${routeTargetCount}`);
      }
      const finiteRouteRequestCount = Number(contractRoutePreview?.finiteRouteRequestCount || 0);
      if (finiteRouteRequestCount > 0) {
        labels.push(`Solicitudes verbales Andrews: ${finiteRouteRequestCount} con tiempo explícito`);
      }
      const objectPrefixRequiredCount = Number(contractRoutePreview?.finiteRouteObjectPrefixRequiredCount || 0);
      if (objectPrefixRequiredCount > 0) {
        labels.push(`Solicitudes verbales Andrews con objeto: ${objectPrefixRequiredCount}`);
      }
      const stemClassContractCount = Number(contractRoutePreview?.finiteRouteStemClassContractCount || 0);
      if (stemClassContractCount > 0) {
        labels.push(`Clases verbales Andrews: ${stemClassContractCount}`);
      }
      const sourceContextRequiredCount = Number(contractRoutePreview?.finiteRouteSourceContextRequiredCount || contractRoutePreview?.finiteRouteSourceEvidenceRequiredCount || 0);
      if (sourceContextRequiredCount > 0) {
        labels.push(`Contextos Andrews pendientes: ${sourceContextRequiredCount}`);
      }
      const routeWarningCount = Number(contractRoutePreview?.routeWarningCount || 0);
      if (routeWarningCount > 0) {
        labels.push(`Avisos verbales Andrews: ${routeWarningCount}`);
      }
      const routeNoteCount = Number(contractRoutePreview?.routeNoteCount || 0);
      if (routeNoteCount > 0) {
        labels.push(`Notas verbales Andrews: ${routeNoteCount}`);
      }
      const routeTargetSamples = Array.isArray(contractRoutePreview?.routes) ? contractRoutePreview.routes.map(route => String(route?.targetInputValue || route?.targetInput || route?.targetVerbStem || "").trim()).filter(Boolean).slice(0, 3) : [];
      if (routeTargetSamples.length) {
        labels.push(`Entradas verbales Andrews: ${routeTargetSamples.join(", ")}`);
      }
      if (profile.isCompleteLesson54_55 === false) {
        labels.push("Cobertura denominal: parcial");
      }
      return labels;
    }
    function appendDenominalFamilyProfileSubLabels(baseLabel = "", profile = null) {
      return [baseLabel, ...buildDenominalFamilyProfileSubLabels(profile)].filter(Boolean).join(" · ");
    }
    function buildNawatDenominalSourceEvidenceSubLabels(sourceEvidence = null) {
      const evidence = sourceEvidence && typeof sourceEvidence === "object" ? sourceEvidence : null;
      if (!evidence) {
        return [];
      }
      const sourceCategory = String(evidence.sourceCategory || "").trim();
      const labels = [];
      if (evidence.iHuiOrAHuiSource === true || sourceCategory === "i-hui-a-hui-source") {
        labels.push("Fuente Andrews: i-hui/a-hui generada");
      } else if (evidence.intransitiveOaSource === true || sourceCategory === "intransitive-o-a") {
        labels.push("Fuente Andrews: o-a intransitiva generada");
      } else if (evidence.tlaCausativeSource === true || sourceCategory === "causative-tla") {
        labels.push("Fuente Andrews: tla causativa generada");
      } else if (evidence.tlaIntransitiveSource === true || sourceCategory === "intransitive-tla") {
        labels.push("Fuente Andrews: tla intransitiva generada");
      } else if (evidence.possessionTiVerbstemSource === true || sourceCategory === "possession-ti-verbstem-source") {
        labels.push("Fuente Andrews: ti de posesión generada");
      } else if (evidence.tiSource === true || sourceCategory === "inceptive-stative-ti-source" || sourceCategory === "intransitive-ti-source") {
        labels.push("Fuente Andrews: ti intransitiva generada");
      } else if (evidence.huiSource === true || sourceCategory === "inceptive-stative-hui-source" || sourceCategory === "intransitive-hui-source") {
        labels.push("Fuente Andrews: hui/wi intransitiva generada");
      } else if (evidence.yaSource === true || sourceCategory === "inceptive-stative-ya-source" || sourceCategory === "intransitive-ya-source") {
        labels.push("Fuente Andrews: ya intransitiva generada");
      } else if (evidence.deverbalYuSource === true || evidence.deverbalYoSource === true || sourceCategory === "deverbal-yu-nounstem" || sourceCategory === "deverbal-yu-nounstem-source") {
        labels.push("Fuente Andrews: cláusula nominal deverbal -yu generada");
      } else if (evidence.possessiveState === true || sourceCategory === "possessive-state-nnc-predicate") {
        labels.push("Fuente Andrews: cláusula nominal posesiva generada");
      } else if (evidence.inceptiveTiSource === true || evidence.inceptiveASource === true || sourceCategory === "absolutive-state-nnc-predicate" || sourceCategory === "absolutive-nounstem") {
        labels.push("Fuente Andrews: cláusula nominal absolutiva generada");
      } else if (evidence.rootPlusYaSource === true || sourceCategory === "nounstem-as-root") {
        labels.push("Fuente Andrews: cláusula nominal en rango raíz");
      } else if (evidence.possessionTiSource === true || sourceCategory === "ordinary-nnc-predicate-nounstem") {
        labels.push("Fuente Andrews: tronco nominal generado");
      } else if (evidence.temporalCompoundSource === true) {
        labels.push("Fuente Andrews: compuesto temporal");
      } else if (evidence.adverbialSource === true || sourceCategory === "adverbial-nounstem") {
        labels.push("Fuente Andrews: tronco adverbial");
      } else if (evidence.relationalCompoundSource === true || sourceCategory.includes("relational")) {
        labels.push("Fuente Andrews: relacional");
      } else if (sourceCategory) {
        labels.push(`Fuente Andrews: ${sourceCategory}`);
      }
      const sourceBaseStem = String(evidence.sourceBaseStem || "").trim();
      if (sourceBaseStem) {
        labels.push(`Base Andrews: ${sourceBaseStem}`);
      }
      const sourceSurface = String(evidence.sourceSurface || "").trim();
      if (sourceSurface && sourceSurface !== sourceBaseStem) {
        labels.push(`Fuente Nawat: ${sourceSurface}`);
      }
      const sourcePossessorPrefix = String(evidence.sourcePossessorPrefix || "").trim();
      if (sourcePossessorPrefix) {
        labels.push(`poseedor fuente: ${sourcePossessorPrefix}`);
      }
      const timeSegmentMatrix = String(evidence.timeSegmentMatrix || "").trim();
      if (timeSegmentMatrix) {
        labels.push(`Matriz temporal: ${timeSegmentMatrix}`);
      }
      const numeralEmbed = String(evidence.numeralEmbed || "").trim();
      if (numeralEmbed) {
        labels.push(`Numeral embed: ${numeralEmbed}`);
      }
      if (evidence.boundaries?.sourceContextFromSelectedGeneratedStage === true || evidence.boundaries?.sourceEvidenceFromSelectedGeneratedStage === true) {
        labels.push("Contexto: etapa generada");
      }
      if (evidence.boundaries?.sourceContextFromAndrewsContractRoute === true || evidence.boundaries?.sourceEvidenceFromAndrewsContractRoute === true) {
        labels.push("Contexto: ruta Andrews");
      }
      if (evidence.boundaries?.sourceEvidenceFromGeneratedOrdinaryNnc === true) {
        labels.push("Evidencia: salida nominal");
      }
      if (evidence.boundaries?.sourceEvidenceFromExplicitSourceClassification === true) {
        labels.push("Contexto: fuente clasificada");
      }
      return labels;
    }
    function getNawatLinkedGrammarStageDisplaySurface(stage = null) {
      const nextSource = stage?.nextSource && typeof stage.nextSource === "object" ? stage.nextSource : null;
      const nextSourceDisplay = getConjugationDisplaySurface(nextSource);
      if (nextSourceDisplay) {
        return nextSourceDisplay;
      }
      if (hasConjugationResultFrame(nextSource)) {
        return "";
      }
      const stageDisplay = getConjugationDisplaySurface(stage);
      if (stageDisplay) {
        return stageDisplay;
      }
      if (hasConjugationResultFrame(stage)) {
        return "";
      }
      const displaySurface = String(nextSource?.displaySurface || stage?.displaySurface || stage?.surface || "").trim();
      return displaySurface === "—" ? "" : displaySurface;
    }
    function getNawatLinkedGrammarStageSourceVerb(stage = null) {
      const nextSource = stage?.nextSource && typeof stage.nextSource === "object" ? stage.nextSource : null;
      const nextSourceSurface = getPrimaryConjugationSurface(nextSource);
      if (nextSourceSurface) {
        return nextSourceSurface;
      }
      if (hasConjugationResultFrame(nextSource)) {
        return "";
      }
      const stageSurface = getPrimaryConjugationSurface(stage);
      if (hasConjugationResultFrame(stage)) {
        return stageSurface || "";
      }
      const sourceInput = String(nextSource?.sourceVerb || stage?.sourceVerb || stage?.inputValue || stage?.renderVerb || "").trim();
      if (sourceInput && sourceInput !== "—") {
        return sourceInput;
      }
      const routeSurface = String(stage?.surface || "").trim();
      return routeSurface === "—" ? "" : routeSurface;
    }
    function buildNawatLinkedGrammarStageSubLabels(stage = null, {
      nextPreview = null
    } = {}) {
      const nextSource = stage?.nextSource && typeof stage.nextSource === "object" ? stage.nextSource : null;
      if (!nextSource || nextSource.canBecomeSource !== true) {
        return [];
      }
      const sourceVerb = getNawatLinkedGrammarStageSourceVerb(stage);
      if (!sourceVerb) {
        return [];
      }
      const displaySurface = getNawatLinkedGrammarStageDisplaySurface(stage);
      const candidateRouteCount = Number(nextPreview?.candidateRouteCount || 0);
      const sourceContext = nextSource.sourceContext && typeof nextSource.sourceContext === "object" ? nextSource.sourceContext : stage?.sourceContext && typeof stage.sourceContext === "object" ? stage.sourceContext : nextSource.sourceEvidence && typeof nextSource.sourceEvidence === "object" ? nextSource.sourceEvidence : stage?.sourceEvidence && typeof stage.sourceEvidence === "object" ? stage.sourceEvidence : null;
      return [`Siguiente fuente: ${sourceVerb}`, displaySurface && displaySurface !== sourceVerb ? `Salida de etapa: ${displaySurface}` : "", Number.isFinite(candidateRouteCount) && candidateRouteCount > 0 ? `Continuaciones: ${candidateRouteCount}` : "", ...buildNawatDenominalSourceEvidenceSubLabels(sourceContext)].filter(Boolean);
    }
    function getNawatLinkedGrammarCompactRouteLabel(routeOrId = "") {
      const routeId = String(routeOrId && typeof routeOrId === "object" ? routeOrId.routeFamily || routeOrId.routeId || routeOrId.id || "" : routeOrId).trim();
      if (!routeId) {
        return "";
      }
      const compactRoute = routeId.replace(/^denominal-/, "").replace(/-(?:preterit|perfect)$/, "");
      return getVisibleDenominalRouteFamilyLabel(compactRoute, compactRoute);
    }
    function getNawatLinkedGrammarCompactStageLabel(stageKey = "") {
      const key = String(stageKey || "").trim();
      const labels = {
        "source-mode": "fuente",
        "source-tense": "estado",
        stem: "tronco",
        verbalizer: "verbalizador",
        "target-mode": "destino",
        "finite-surface": "salida",
        "finite-tense": "salida"
      };
      return labels[key] || key;
    }
    function formatNawatLinkedGrammarCompactChoiceLabel(choice = {}) {
      const routeLabel = getNawatLinkedGrammarCompactRouteLabel(choice.routeFamily || choice.routeId || choice.route || "");
      const stageLabel = getNawatLinkedGrammarCompactStageLabel(choice.stageKey || choice.stationKey || choice.selection?.stageKey || "");
      return [routeLabel, stageLabel].filter(Boolean).join(" · ");
    }
    function createConjugationConversionActionsContainer() {
      const actions = targetObject.document.createElement("div");
      actions.className = "conjugation-conversion-actions";
      return actions;
    }
    function getConjugationConversionActionsForValue(value = null) {
      return value?.querySelector?.(".conjugation-conversion-actions") || value?.closest?.(".conjugation-row")?.querySelector?.(".conjugation-conversion-actions") || null;
    }
    function syncConjugationConversionSurfaceRouteFrame(surfaceText = null, actions = null) {
      if (!surfaceText?.dataset) {
        return null;
      }
      const stationLineFrame = getActiveAndrewsStationLineFrameForRendering();
      const routeConditionFrame = getActiveAndrewsRouteConditionFrameForRendering();
      const sourceLayerFrame = getActiveAndrewsSourceLayerFrameForRendering();
      const rideFrame = getActiveAndrewsRideFrameForRendering();
      const routeSource = actions?.querySelector?.("[data-andrews-route-record-id], [data-andrews-route-record-group-id]");
      if (!routeSource?.dataset && !stationLineFrame && !routeConditionFrame && !sourceLayerFrame && !rideFrame) {
        return null;
      }
      const routeRecordId = String(routeSource?.dataset?.andrewsRouteRecordId || routeSource?.dataset?.andrewsRouteRecordGroupId || "").trim();
      if (routeRecordId) {
        surfaceText.dataset.andrewsRouteRecordId = routeRecordId;
        surfaceText.dataset.andrewsRouteRecordTransition = routeSource.dataset.andrewsRouteRecordTransition || "";
        surfaceText.dataset.andrewsRouteObstacleGates = routeSource.dataset.andrewsRouteObstacleGates || "";
        surfaceText.dataset.andrewsRouteObstacleGateCount = routeSource.dataset.andrewsRouteObstacleGateCount || "0";
      }
      surfaceText.dataset.andrewsRouteSurfacePriority = "surface-line";
      surfaceText.dataset.andrewsRouteSurfacePathModel = routeRecordId ? "surface-line-receives-route-frame" : "surface-line-receives-active-route-frame";
      applyAndrewsStationLineDatasetToSurfaceElement(surfaceText, stationLineFrame);
      applyAndrewsRouteConditionDatasetToSurfaceElement(surfaceText, routeConditionFrame);
      applyAndrewsSourceLayerDatasetToSurfaceElement(surfaceText, sourceLayerFrame);
      applyAndrewsRideDatasetToSurfaceElement(surfaceText, rideFrame);
      Array.from(surfaceText.querySelectorAll?.(".conjugation-conversion-surface-line") || []).forEach(line => {
        if (!line?.dataset) {
          return;
        }
        if (routeRecordId) {
          line.dataset.andrewsRouteRecordId = routeRecordId;
        }
        line.dataset.andrewsRouteSurfacePriority = "surface-line";
        line.dataset.andrewsRouteSurfacePathModel = routeRecordId ? "surface-line-receives-route-frame" : "surface-line-receives-active-route-frame";
        applyAndrewsStationLineDatasetToSurfaceElement(line, stationLineFrame);
        applyAndrewsRouteConditionDatasetToSurfaceElement(line, routeConditionFrame);
        applyAndrewsSourceLayerDatasetToSurfaceElement(line, sourceLayerFrame);
        applyAndrewsRideDatasetToSurfaceElement(line, rideFrame);
      });
      return routeRecordId || stationLineFrame?.routePathLabel || rideFrame?.primaryRoutePathLabel || "";
    }
    function getAndrewsCnvCnnNominalRenderingFrame(frameLike = null) {
      if (!frameLike || typeof frameLike !== "object") {
        return null;
      }
      const candidates = [frameLike?.nominalizationProfile?.operationalSuboperationFrame, frameLike?.result?.nominalizationProfile?.operationalSuboperationFrame, frameLike?.frames?.nominalizationProfile?.operationalSuboperationFrame, frameLike?.grammarFrame?.nominalizationProfile?.operationalSuboperationFrame, frameLike?.operationalSuboperationFrame, frameLike];
      return candidates.find(candidate => candidate && typeof candidate === "object" && candidate.kind === "andrews-cnv-cnn-operational-suboperation-frame") || null;
    }
    function normalizeAndrewsCnvCnnNominalSurfaceKey(value = "") {
      return String(value || "").replace(/\s+/g, "").trim();
    }
    function getAndrewsCnvCnnNominalFormulaSurfacePairs(frame = null) {
      return Array.isArray(frame?.formulaSurfacePairs) ? frame.formulaSurfacePairs.map(entry => entry && typeof entry === "object" ? {
        surface: String(entry.surface || "").trim(),
        sourceFormulaEcho: String(entry.sourceFormulaEcho || "").trim(),
        andrewsFormulaEcho: String(entry.andrewsFormulaEcho || entry.sourceFormulaEcho || "").trim(),
        targetFormulaEcho: String(entry.targetFormulaEcho || "").trim(),
        conjugatorFormulaEcho: String(entry.conjugatorFormulaEcho || entry.targetFormulaEcho || "").trim(),
        sourceToTargetFormulaEcho: String(entry.sourceToTargetFormulaEcho || "").trim(),
        andrewsToConjugatorFormulaEcho: String(entry.andrewsToConjugatorFormulaEcho || entry.sourceToTargetFormulaEcho || "").trim()
      } : null).filter(entry => entry && entry.surface && entry.targetFormulaEcho) : [];
    }
    function getAndrewsCnvCnnNominalFormulaSurfacePairForSurface(frame = null, surface = "") {
      const surfaceKey = normalizeAndrewsCnvCnnNominalSurfaceKey(surface);
      if (!surfaceKey) {
        return null;
      }
      return getAndrewsCnvCnnNominalFormulaSurfacePairs(frame).find(entry => normalizeAndrewsCnvCnnNominalSurfaceKey(entry.surface) === surfaceKey) || null;
    }
    function getGeneratedOutputResultFrame(result = null) {
      const grammarFrame = getConjugationResultFrame(result);
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function getGeneratedOutputCanonicalFormulaRecords(result = null) {
      const resultFrame = getGeneratedOutputResultFrame(result);
      if (!resultFrame) {
        return [];
      }
      const records = Array.isArray(resultFrame.formulaRecords) && resultFrame.formulaRecords.length ? resultFrame.formulaRecords : resultFrame.formulaRecord ? [resultFrame.formulaRecord] : [];
      return records.filter(record => record && typeof record === "object" && record.kind === "grammar-formula-record");
    }
    function getGeneratedOutputCanonicalFormulaRecord(result = null) {
      return getGeneratedOutputCanonicalFormulaRecords(result)[0] || null;
    }
    function getGeneratedOutputCanonicalFormulaSlots(result = null) {
      return getGeneratedOutputCanonicalFormulaRecords(result).map(record => record.formulaSlots).find(slots => slots && typeof slots === "object") || null;
    }
    function getGeneratedOutputCanonicalFormulaText(result = null) {
      const record = getGeneratedOutputCanonicalFormulaRecord(result);
      return String(record?.formulaText || record?.formula || "").trim();
    }
    function getGeneratedOutputStructuredContinuationFormulaSlots(result = null) {
      const source = result && typeof result === "object" ? result : {};
      const canonicalSlots = getGeneratedOutputCanonicalFormulaSlots(source);
      if (canonicalSlots) {
        return canonicalSlots;
      }
      const frame = source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : source.frames && typeof source.frames === "object" ? source.frames : null;
      const formulaSlots = source.nuclearClauseShell?.formulaSlots || source.nuclearClauseShell?.slots || source.nncBasic?.formulaSlots || source.clauseFrame?.formulaSlots || source.formulaSlots || frame?.morphBoundaryFrame?.formulaSlots || frame?.nuclearClauseFrame?.formulaSlots || null;
      return formulaSlots && typeof formulaSlots === "object" ? formulaSlots : null;
    }
    function getGeneratedOutputStructuredContinuationFormulaEcho(result = null, formulaSlots = null) {
      const canonicalFormula = getGeneratedOutputCanonicalFormulaText(result);
      if (canonicalFormula) {
        return canonicalFormula;
      }
      if (formulaSlots && typeof formulaSlots === "object" && typeof targetObject.buildOrdinaryNncFormulaEchoFromSlots === "function") {
        return String(targetObject.buildOrdinaryNncFormulaEchoFromSlots(formulaSlots) || "").trim();
      }
      return "";
    }
    function normalizeGeneratedOutputStructuredContinuationStem(value = "") {
      const text = String(value || "").trim();
      return text && text !== "—" && !/[\/,\n\r]/u.test(text) ? text : "";
    }
    function getGeneratedOutputStructuredContinuationPredicateStem(result = null) {
      const formulaSlots = getGeneratedOutputStructuredContinuationFormulaSlots(result);
      if (!formulaSlots || typeof formulaSlots !== "object") {
        return "";
      }
      const predicateSlot = formulaSlots.predicateStem || formulaSlots.predicate || formulaSlots.stem || null;
      if (!predicateSlot || typeof predicateSlot !== "object") {
        return "";
      }
      return [predicateSlot.stem, predicateSlot.root, predicateSlot.formulaValue].map(normalizeGeneratedOutputStructuredContinuationStem).find(Boolean) || "";
    }
    function getGeneratedOutputCanonicalRealizationRecords(result = null) {
      const resultFrame = getGeneratedOutputResultFrame(result);
      if (!resultFrame) {
        return [];
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      return records.filter(record => record && typeof record === "object" && record.kind === "grammar-formula-realization-record");
    }
    function getCanonicalFormulaRealizationSurfaceForms(record = null) {
      if (!record || typeof record !== "object") {
        return [];
      }
      const forms = [];
      if (Array.isArray(record.surfaceForms)) {
        forms.push(...record.surfaceForms);
      }
      if (record.surface) {
        forms.push(record.surface);
      }
      return forms.map(entry => String(entry || "").trim()).filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
    }
    function getGeneratedOutputCanonicalRealizationSurfaceForms(result = null) {
      return getGeneratedOutputCanonicalRealizationRecords(result).flatMap(getCanonicalFormulaRealizationSurfaceForms).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getGeneratedOutputSelectedRealizationVariant(result = null, variantIndex = 0) {
      const selectedIndex = Number.isInteger(Number(variantIndex)) && Number(variantIndex) >= 0 ? Number(variantIndex) : 0;
      let currentIndex = 0;
      for (const record of getGeneratedOutputCanonicalRealizationRecords(result)) {
        const surfaces = getCanonicalFormulaRealizationSurfaceForms(record);
        for (const surface of surfaces) {
          const localIndex = currentIndex;
          currentIndex += 1;
          if (localIndex !== selectedIndex) {
            continue;
          }
          const formulaRealizationRecordId = String(record.id || "").trim();
          const formulaRecordId = String(record.formulaRecordId || "").trim();
          const variantId = [formulaRealizationRecordId || formulaRecordId, `variant:${localIndex}`].filter(Boolean).join("#");
          return {
            kind: "grammar-formula-realization-selected-variant",
            surface,
            variantIndex: localIndex,
            variantId,
            selectedVariantId: variantId,
            formulaRealizationRecordId,
            formulaRecordId
          };
        }
      }
      return null;
    }
    function getGeneratedOutputCanonicalFormulaRecordById(result = null, recordId = "") {
      const id = String(recordId || "").trim();
      return getGeneratedOutputCanonicalFormulaRecords(result).find(record => [record.id, record.formulaRecordId, record.formula, record.formulaText].map(entry => String(entry || "").trim()).includes(id)) || null;
    }
    function getGeneratedOutputCanonicalRealizationRecordById(result = null, recordId = "") {
      const id = String(recordId || "").trim();
      return getGeneratedOutputCanonicalRealizationRecords(result).find(record => [record.id, record.formulaRealizationRecordId].map(entry => String(entry || "").trim()).includes(id)) || null;
    }
    function buildGeneratedOutputTypedContinuationFrame(result = null, selectedVariant = null, {
      role = "",
      unit = ""
    } = {}) {
      const grammarFrame = getConjugationResultFrame(result);
      const formulaRecord = getGeneratedOutputCanonicalFormulaRecordById(result, selectedVariant?.formulaRecordId || "") || getGeneratedOutputCanonicalFormulaRecord(result);
      const formulaRealizationRecord = getGeneratedOutputCanonicalRealizationRecordById(result, selectedVariant?.formulaRealizationRecordId || "") || getGeneratedOutputCanonicalRealizationRecords(result)[0] || null;
      if (!formulaRecord || !formulaRealizationRecord) {
        return null;
      }
      return {
        kind: "generated-output-typed-continuation-frame",
        role: String(role || ""),
        unit: String(unit || formulaRecord.unit || ""),
        formulaRecord,
        formulaRealizationRecord,
        selectedVariant: selectedVariant && typeof selectedVariant === "object" ? selectedVariant : null,
        formulaSlots: formulaRecord.formulaSlots || null,
        sourceFrame: formulaRecord.sourceFrame || null,
        routeContract: grammarFrame?.routeContract || formulaRecord.routeContract || null,
        resultFrame: getGeneratedOutputResultFrame(result)
      };
    }
    function getCanonicalFormulaSurfacePairsForGeneratedOutput(result = null) {
      const formulaRecords = getGeneratedOutputCanonicalFormulaRecords(result);
      const realizationRecords = getGeneratedOutputCanonicalRealizationRecords(result);
      if (!formulaRecords.length || !realizationRecords.length) {
        return [];
      }
      const formulaById = new Map();
      formulaRecords.forEach(record => {
        [record.id, record.formula, record.formulaText].map(entry => String(entry || "").trim()).filter(Boolean).forEach(id => formulaById.set(id, record));
      });
      return realizationRecords.flatMap(realizationRecord => {
        const formulaRecord = formulaById.get(String(realizationRecord.formulaRecordId || "").trim()) || formulaRecords[0] || null;
        const formula = String(formulaRecord?.formulaText || formulaRecord?.formula || "").trim();
        if (!formula) {
          return [];
        }
        const sourceFormula = String(formulaRecord?.sourceFrame?.formula || formulaRecord?.sourceFrame?.formulaText || "").trim();
        const routeFormula = String(formulaRecord?.sourceFrame?.label || formulaRecord?.sourceFrame?.formula || formulaRecord?.sourceFrame?.formulaText || formula).trim();
        return getCanonicalFormulaRealizationSurfaceForms(realizationRecord).map(surface => ({
          surface,
          sourceFormulaEcho: sourceFormula,
          andrewsFormulaEcho: formula,
          targetFormulaEcho: formula,
          conjugatorFormulaEcho: formula,
          sourceToTargetFormulaEcho: `${routeFormula} -> ${formula}`,
          andrewsToConjugatorFormulaEcho: `${routeFormula} -> ${formula}`,
          formulaRecord,
          formulaRealizationRecord: realizationRecord
        }));
      });
    }
    function getGeneratedOutputRouteContractIdentityParts(result = null) {
      if (Array.isArray(result)) {
        return result.flatMap(entry => getGeneratedOutputRouteContractIdentityParts(entry));
      }
      const grammarFrame = getConjugationResultFrame(result);
      const routeContract = grammarFrame?.routeContract && typeof grammarFrame.routeContract === "object" ? grammarFrame.routeContract : null;
      if (!routeContract) {
        return [];
      }
      return [routeContract.routeId ? `route-id:${routeContract.routeId}` : "", routeContract.contractId ? `contract-id:${routeContract.contractId}` : "", routeContract.routeFamily ? `route-family:${routeContract.routeFamily}` : "", routeContract.routeStage ? `route-stage:${routeContract.routeStage}` : "", routeContract.outputKind ? `output-kind:${routeContract.outputKind}` : "", routeContract.unitKind ? `unit-kind:${routeContract.unitKind}` : "", routeContract.sourceContract?.sourceCategory ? `source-category:${routeContract.sourceContract.sourceCategory}` : "", routeContract.sourceContract?.sourceClauseKind ? `source-clause:${routeContract.sourceContract.sourceClauseKind}` : "", routeContract.sourceContract?.sourceVerb ? `source-verb:${routeContract.sourceContract.sourceVerb}` : "", routeContract.sourceContract?.sourceTenseValue ? `source-tense:${routeContract.sourceContract.sourceTenseValue}` : "", routeContract.sourceContract?.sourceCombinedMode ? `source-mode:${routeContract.sourceContract.sourceCombinedMode}` : "", routeContract.targetContract?.outputKind ? `target-output:${routeContract.targetContract.outputKind}` : "", routeContract.targetContract?.functionKind ? `target-function:${routeContract.targetContract.functionKind}` : "", routeContract.targetContract?.generationRoute ? `target-route:${routeContract.targetContract.generationRoute}` : ""].filter(Boolean);
    }
    function getGeneratedOutputCanonicalContinuationIdentityParts(result = null) {
      const sources = Array.isArray(result) ? result : [result];
      const formulaParts = sources.flatMap(source => getGeneratedOutputCanonicalFormulaRecords(source)).flatMap(record => {
        const formulaId = String(record.id || record.formula || record.formulaText || "").trim();
        const sourceFrameId = String(record.sourceFrame?.id || record.sourceFrame?.sourceFrameId || "").trim();
        const routeId = String(record.routeContract?.routeId || record.routeContract?.contractId || "").trim();
        return [formulaId ? `formula:${formulaId}` : "", sourceFrameId ? `formula-source:${sourceFrameId}` : "", routeId ? `formula-route:${routeId}` : ""].filter(Boolean);
      });
      const realizationParts = sources.flatMap(source => getGeneratedOutputCanonicalRealizationRecords(source)).flatMap(record => {
        const realizationId = String(record.id || "").trim();
        const formulaRecordId = String(record.formulaRecordId || "").trim();
        return [realizationId ? `realization:${realizationId}` : "", formulaRecordId ? `realization-formula:${formulaRecordId}` : ""].filter(Boolean);
      });
      return [...sources.flatMap(source => getGeneratedOutputRouteContractIdentityParts(source)), ...formulaParts, ...realizationParts].filter(Boolean);
    }
    function getGeneratedOutputContinuationIdentityKey(result = null, context = {}) {
      const contextObject = context && typeof context === "object" ? context : {};
      const contextParts = [contextObject.namespace ? `namespace:${contextObject.namespace}` : "", contextObject.targetTense ? `target-tense:${contextObject.targetTense}` : "", contextObject.sourceUnit ? `source-unit:${contextObject.sourceUnit}` : "", contextObject.predicateNominalSourceTense ? `predicate-source-tense:${contextObject.predicateNominalSourceTense}` : "", contextObject.sourceObjectPrefix ? `source-object:${contextObject.sourceObjectPrefix}` : "", contextObject.sourceVariantId ? `source-variant:${contextObject.sourceVariantId}` : "", contextObject.targetVariantId ? `target-variant:${contextObject.targetVariantId}` : ""].filter(Boolean);
      const canonicalParts = getGeneratedOutputCanonicalContinuationIdentityParts(result);
      const routeParts = canonicalParts.length ? [] : getGeneratedOutputRouteContractIdentityParts(result);
      const identityParts = canonicalParts.length ? canonicalParts : routeParts;
      if (!identityParts.length) {
        return "";
      }
      return ["generated-output-continuation", ...contextParts, ...identityParts].join("|");
    }
    function applyGeneratedOutputContinuationIdentityDataset(element = null, result = null, context = {}) {
      if (!element?.dataset) {
        return "";
      }
      const identityKey = getGeneratedOutputContinuationIdentityKey(result, context);
      if (!identityKey) {
        return "";
      }
      element.dataset.continuationIdentityKey = identityKey;
      element.dataset.continuationIdentitySource = getGeneratedOutputCanonicalContinuationIdentityParts(result).length ? "canonical-formula-realization-record" : "route-contract";
      return identityKey;
    }
    function getDenominalAndrewsRouteContinuationIdentityKey(route = null, context = {}) {
      if (!route || typeof route !== "object") {
        return "";
      }
      const contextObject = context && typeof context === "object" ? context : {};
      const parts = ["denominal-andrews-route-continuation", contextObject.namespace ? `namespace:${contextObject.namespace}` : "", contextObject.routeRecordId ? `route-record:${contextObject.routeRecordId}` : "", contextObject.targetTense ? `target-tense:${contextObject.targetTense}` : "", contextObject.objectPrefix ? `object-prefix:${contextObject.objectPrefix}` : "", route.contractId ? `contract:${route.contractId}` : "", route.routeTemplateId ? `template:${route.routeTemplateId}` : "", route.executableRuleId ? `rule:${route.executableRuleId}` : "", route.routeId ? `route-id:${route.routeId}` : "", route.sourceStem ? `source-stem:${route.sourceStem}` : "", route.targetVerbStem ? `target-stem:${route.targetVerbStem}` : "", route.targetInputValue ? `target-input:${route.targetInputValue}` : "", !route.targetInputValue && route.targetInput ? `target-input:${route.targetInput}` : "", route.targetStemClass ? `target-class:${route.targetStemClass}` : "", route.sourceEvidence?.id ? `source-evidence:${route.sourceEvidence.id}` : ""].map(entry => String(entry || "").trim()).filter(Boolean);
      return parts.length > 4 ? parts.join("|") : "";
    }
    function getFormulaSurfacePairsForGeneratedOutput(result = null) {
      const source = result && typeof result === "object" ? result : {};
      const grammarFrame = source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : source.frames && typeof source.frames === "object" ? source.frames : null;
      const canonicalPairs = getCanonicalFormulaSurfacePairsForGeneratedOutput(result);
      const candidates = [canonicalPairs, grammarFrame?.resultFrame?.formulaSurfacePairs, grammarFrame?.nuclearClauseFrame?.formulaSurfacePairs, grammarFrame?.morphBoundaryFrame?.cnvFormulaSurfacePath?.formulaSurfacePairs, grammarFrame?.morphBoundaryFrame?.formulaSurfacePairs, grammarFrame?.nominalizationProfile?.operationalSuboperationFrame?.formulaSurfacePairs, source.formulaSurfacePairs, source.cnvFormulaSurfacePath?.formulaSurfacePairs, source.nuclearClauseShell?.formulaSurfacePairs, source.nominalizationProfile?.operationalSuboperationFrame?.formulaSurfacePairs];
      const pairs = candidates.find(candidate => Array.isArray(candidate) && candidate.length) || [];
      return pairs.map(entry => {
        if (!entry || typeof entry !== "object") {
          return null;
        }
        const formulaRecord = entry.formulaRecord && typeof entry.formulaRecord === "object" ? entry.formulaRecord : null;
        const realizationRecord = entry.formulaRealizationRecord && typeof entry.formulaRealizationRecord === "object" ? entry.formulaRealizationRecord : null;
        const canonicalFormula = String(formulaRecord?.formulaText || formulaRecord?.formula || "").trim();
        const canonicalSurface = getCanonicalFormulaRealizationSurfaceForms(realizationRecord)[0] || "";
        const targetFormulaEcho = canonicalFormula || String(entry.targetFormulaEcho || "").trim();
        const sourceFormulaEcho = String(formulaRecord?.sourceFrame?.formula || formulaRecord?.sourceFrame?.formulaText || entry.sourceFormulaEcho || "").trim();
        const routeFormula = String(formulaRecord?.sourceFrame?.label || formulaRecord?.sourceFrame?.formula || formulaRecord?.sourceFrame?.formulaText || sourceFormulaEcho || targetFormulaEcho).trim();
        const surface = canonicalSurface || String(entry.surface || "").trim();
        return {
          surface,
          sourceFormulaEcho,
          andrewsFormulaEcho: canonicalFormula || String(entry.andrewsFormulaEcho || entry.sourceFormulaEcho || "").trim(),
          targetFormulaEcho,
          conjugatorFormulaEcho: canonicalFormula || String(entry.conjugatorFormulaEcho || entry.targetFormulaEcho || "").trim(),
          sourceToTargetFormulaEcho: canonicalFormula ? `${routeFormula} -> ${canonicalFormula}` : String(entry.sourceToTargetFormulaEcho || "").trim(),
          andrewsToConjugatorFormulaEcho: canonicalFormula ? `${routeFormula} -> ${canonicalFormula}` : String(entry.andrewsToConjugatorFormulaEcho || entry.sourceToTargetFormulaEcho || "").trim(),
          formulaRecord,
          formulaRealizationRecord: realizationRecord
        };
      }).filter(entry => entry && entry.surface && entry.targetFormulaEcho).filter((entry, index, list) => list.findIndex(candidate => candidate.surface === entry.surface && candidate.targetFormulaEcho === entry.targetFormulaEcho && String(candidate.formulaRealizationRecord?.id || "") === String(entry.formulaRealizationRecord?.id || "")) === index);
    }
    function getFormulaSurfacePairForGeneratedOutput(result = null, surface = "") {
      const pairs = getFormulaSurfacePairsForGeneratedOutput(result);
      if (!pairs.length) {
        return null;
      }
      const requestedSurface = normalizeAndrewsCnvCnnNominalSurfaceKey(surface);
      if (requestedSurface) {
        const requestedPair = pairs.find(entry => normalizeAndrewsCnvCnnNominalSurfaceKey(entry.surface) === requestedSurface);
        if (requestedPair) {
          return requestedPair;
        }
      }
      return pairs[0] || null;
    }
    function applyFormulaSurfacePairDatasetToSurfaceLine(element = null, result = null, surface = "") {
      if (!element?.dataset) {
        return null;
      }
      const pair = getFormulaSurfacePairForGeneratedOutput(result, surface);
      if (!pair) {
        return null;
      }
      element.dataset.formulaSurfacePair = "true";
      element.dataset.formulaSurface = pair.surface;
      element.dataset.sourceFormulaEcho = pair.sourceFormulaEcho;
      element.dataset.andrewsFormulaEcho = pair.andrewsFormulaEcho;
      element.dataset.targetFormulaEcho = pair.targetFormulaEcho;
      element.dataset.conjugatorFormulaEcho = pair.conjugatorFormulaEcho;
      element.dataset.sourceToTargetFormulaEcho = pair.sourceToTargetFormulaEcho;
      element.dataset.andrewsToConjugatorFormulaEcho = pair.andrewsToConjugatorFormulaEcho;
      element.title = pair.andrewsToConjugatorFormulaEcho || pair.sourceToTargetFormulaEcho || pair.targetFormulaEcho;
      return pair;
    }
    function appendFormulaSurfacePairDetailToSurfaceLine(element = null, pair = null, surface = "") {
      if (!element || !pair) {
        return null;
      }
      const surfaceValue = String(surface || pair.surface || "").trim();
      element.textContent = "";
      const surfaceSpan = targetObject.document.createElement("span");
      surfaceSpan.className = "conjugation-conversion-surface-form";
      surfaceSpan.textContent = surfaceValue;
      element.appendChild(surfaceSpan);
      const andrewsFormula = String(pair.andrewsFormulaEcho || pair.sourceFormulaEcho || "").trim();
      const conjugatorFormula = String(pair.conjugatorFormulaEcho || pair.targetFormulaEcho || "").trim();
      if (andrewsFormula || conjugatorFormula) {
        const route = targetObject.document.createElement("span");
        route.className = "conjugation-conversion-formula-route";
        if (andrewsFormula) {
          const source = targetObject.document.createElement("span");
          source.className = "conjugation-conversion-formula-route-part conjugation-conversion-formula-route-part--andrews";
          source.textContent = `Andrews ${andrewsFormula}`;
          route.appendChild(source);
        }
        if (conjugatorFormula) {
          const target = targetObject.document.createElement("span");
          target.className = "conjugation-conversion-formula-route-part conjugation-conversion-formula-route-part--conjugator";
          target.textContent = `Conjugador ${conjugatorFormula}`;
          route.appendChild(target);
        }
        element.appendChild(route);
      }
      return element;
    }
    function applyAndrewsCnvCnnNominalRenderingDataset(element = null, frameLike = null, options = {}) {
      if (!element?.dataset) {
        return null;
      }
      const frame = getAndrewsCnvCnnNominalRenderingFrame(frameLike);
      if (!frame) {
        return null;
      }
      const source = frame.source && typeof frame.source === "object" ? frame.source : {};
      const orthography = frame.orthography && typeof frame.orthography === "object" ? frame.orthography : {};
      const missingRequirements = Array.isArray(frame.missingRequirements) ? frame.missingRequirements.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      const diagnostics = Array.isArray(frame.diagnostics) ? frame.diagnostics.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      const lineSurface = String(options.surface || "").trim();
      const formulaSurfacePairs = getAndrewsCnvCnnNominalFormulaSurfacePairs(frame);
      const lineFormulaPair = getAndrewsCnvCnnNominalFormulaSurfacePairForSurface(frame, lineSurface);
      const visibleFormulaEcho = lineFormulaPair?.targetFormulaEcho || String(frame.formulaEcho || "").trim();
      const visibleSourceFormulaEcho = lineFormulaPair?.sourceFormulaEcho || String(frame.sourceFormulaEcho || "").trim();
      const visibleAndrewsFormulaEcho = lineFormulaPair?.andrewsFormulaEcho || visibleSourceFormulaEcho;
      const visibleConjugatorFormulaEcho = lineFormulaPair?.conjugatorFormulaEcho || visibleFormulaEcho;
      const visibleSourceToTargetFormulaEcho = lineFormulaPair?.sourceToTargetFormulaEcho || String(frame.sourceToTargetFormulaEcho || frame.formulaEcho || "").trim();
      const visibleAndrewsToConjugatorFormulaEcho = lineFormulaPair?.andrewsToConjugatorFormulaEcho || visibleSourceToTargetFormulaEcho;
      const visibleSurface = lineFormulaPair?.surface || lineSurface || String(frame.surface || "").trim();
      element.classList?.add("conjugation-rendering--andrews-cnv-cnn-nominal");
      element.dataset.andrewsCnvCnnNominalRender = "true";
      element.dataset.andrewsCnvCnnNominalAuthority = "Andrews";
      element.dataset.andrewsCnvCnnNominalTransition = String(frame.formulaTransition || "CNV->CNN").trim();
      element.dataset.andrewsCnvCnnNominalSourceFormulaType = String(frame.sourceFormulaType || "CNV").trim();
      element.dataset.andrewsCnvCnnNominalTargetFormulaType = String(frame.targetFormulaType || "CNN").trim();
      element.dataset.andrewsCnvCnnNominalOperationId = String(frame.operationId || "").trim();
      element.dataset.andrewsCnvCnnNominalLabel = String(frame.label || frame.nominalKind || "").trim();
      element.dataset.andrewsCnvCnnNominalFamily = String(frame.family || "").trim();
      element.dataset.andrewsCnvCnnNominalSection = String(frame.andrewsSection || "").trim();
      element.dataset.andrewsCnvCnnNominalExecutionKind = String(frame.executionKind || "").trim();
      element.dataset.andrewsCnvCnnNominalExecutableLogic = String(frame.executableLogic === true);
      element.dataset.andrewsCnvCnnNominalCanAttemptSurface = String(frame.canAttemptSurface === true);
      element.dataset.andrewsCnvCnnNominalGenerationAllowed = String(frame.generationAllowed === true);
      element.dataset.andrewsCnvCnnNominalStatus = String(frame.status || "").trim();
      element.dataset.andrewsCnvCnnNominalRouteStage = String(frame.routeStage || "").trim();
      element.dataset.andrewsCnvCnnNominalOperationApplied = String(frame.operationApplied || "").trim();
      element.dataset.andrewsCnvCnnNominalSourceFormulaEcho = visibleSourceFormulaEcho;
      element.dataset.andrewsCnvCnnNominalAndrewsFormulaEcho = visibleAndrewsFormulaEcho;
      element.dataset.andrewsCnvCnnNominalFormulaEcho = visibleFormulaEcho;
      element.dataset.andrewsCnvCnnNominalConjugatorFormulaEcho = visibleConjugatorFormulaEcho;
      element.dataset.andrewsCnvCnnNominalSourceToTargetFormulaEcho = visibleSourceToTargetFormulaEcho;
      element.dataset.andrewsCnvCnnNominalAndrewsToConjugatorFormulaEcho = visibleAndrewsToConjugatorFormulaEcho;
      element.dataset.andrewsCnvCnnNominalFormulaSurfacePairs = formulaSurfacePairs.map(entry => `${entry.surface}=>${entry.andrewsFormulaEcho || entry.sourceFormulaEcho || ""}=>${entry.conjugatorFormulaEcho || entry.targetFormulaEcho}`).join("|");
      element.dataset.andrewsCnvCnnNominalFormulaSurfacePairCount = String(formulaSurfacePairs.length);
      element.dataset.andrewsCnvCnnNominalFormulaSurfacePairMatched = String(Boolean(lineFormulaPair));
      element.dataset.andrewsCnvCnnNominalSurface = visibleSurface;
      element.dataset.andrewsCnvCnnNominalSourceStem = String(source.stem || "").trim();
      element.dataset.andrewsCnvCnnNominalSourceTense = String(source.tense || "").trim();
      element.dataset.andrewsCnvCnnNominalSourceVoice = String(source.voice || "").trim();
      element.dataset.andrewsCnvCnnNominalMissingRequirements = missingRequirements.join("|");
      element.dataset.andrewsCnvCnnNominalDiagnostics = diagnostics.join("|");
      element.dataset.andrewsCnvCnnNominalSpellingAuthority = String(orthography.spellingAuthority || "Nawat/Pipil orthography bridge").trim();
      element.dataset.andrewsCnvCnnNominalClassicalSpellingRole = String(orthography.classicalSpellingRole || "structural-only").trim();
      element.dataset.andrewsCnvCnnNominalClassicalSurfaceImport = orthography.noClassicalSurfaceImport === false ? "allowed" : "blocked";
      return frame;
    }
    function getAndrewsCnvCnnNominalRenderedSurface(frameLike = null) {
      const frame = getAndrewsCnvCnnNominalRenderingFrame(frameLike);
      if (!frame || frame.generationAllowed !== true) {
        return "";
      }
      const formulaPairSurfaces = getAndrewsCnvCnnNominalFormulaSurfacePairs(frame).map(entry => entry.surface).filter(Boolean);
      if (formulaPairSurfaces.length > 1) {
        return formulaPairSurfaces.join(" / ");
      }
      const surface = String(frame.surface || "").trim();
      if (surface) {
        return surface;
      }
      const forms = Array.isArray(frame.surfaceForms) ? frame.surfaceForms.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      return forms[0] || "";
    }
    function appendConjugationConversionSurfaceLines(surfaceText = null, surfaceDisplay = "", frameLike = null) {
      if (!surfaceText) {
        return [];
      }
      const renderedSurface = getAndrewsCnvCnnNominalRenderedSurface(frameLike);
      const resolvedSurfaceDisplay = renderedSurface || surfaceDisplay;
      const groupedSurfaceDisplay = typeof targetObject.formatConjugationDisplay === "function" ? targetObject.formatConjugationDisplay(resolvedSurfaceDisplay) : resolvedSurfaceDisplay;
      return String(groupedSurfaceDisplay || "").split(/\n+/).map(line => line.trim()).filter(Boolean).flatMap(line => {
        const surfaceParts = line.split(/\s*\/\s*/).map(part => part.trim()).filter(Boolean);
        const parts = surfaceParts.length ? surfaceParts : [line];
        return parts.map((surface, index) => {
          if (index) {
            surfaceText.appendChild(targetObject.document.createTextNode(" / "));
          }
          const lineElement = targetObject.document.createElement("span");
          lineElement.className = "conjugation-conversion-surface-line";
          applyAndrewsCnvCnnNominalRenderingDataset(lineElement, frameLike, {
            surface
          });
          const formulaPair = applyFormulaSurfacePairDatasetToSurfaceLine(lineElement, frameLike, surface);
          appendFormulaSurfacePairDetailToSurfaceLine(lineElement, formulaPair, surface);
          if (!formulaPair) {
            lineElement.textContent = surface;
          }
          surfaceText.appendChild(lineElement);
          return lineElement;
        });
      });
    }
    function syncConjugationConversionSurfaceRouteFrameFromActions(actions = null) {
      if (!actions) {
        return null;
      }
      const column = actions.closest?.(".conjugation-conversion-target-column");
      const value = actions.closest?.(".conjugation-value--conversion-picker");
      const surfaceText = column?.querySelector?.(".conjugation-conversion-surface") || value?.querySelector?.(".conjugation-conversion-surface") || actions.parentElement?.querySelector?.(".conjugation-conversion-surface") || null;
      return syncConjugationConversionSurfaceRouteFrame(surfaceText, actions);
    }
    function applyConjugationConversionColumnLayout(value = null, surfaceText = null, actions = null) {
      if (!value || !surfaceText || !actions) {
        return;
      }
      const row = value.closest?.(".conjugation-row");
      if (!row) {
        return;
      }
      row.classList.add("conjugation-row--conversion-columns");
      value.classList.add("conjugation-value--conversion-source");
      let sourceColumn = row.querySelector(":scope > .conjugation-conversion-source-column");
      if (!sourceColumn) {
        sourceColumn = targetObject.document.createElement("div");
        sourceColumn.className = "conjugation-conversion-source-column";
        row.insertBefore(sourceColumn, row.firstChild);
      }
      const label = row.querySelector(":scope > .conjugation-label");
      if (label && label.parentElement !== sourceColumn) {
        sourceColumn.appendChild(label);
      }
      if (surfaceText.parentElement !== value) {
        value.prepend(surfaceText);
      }
      let continuationColumn = row.querySelector(":scope > .conjugation-conversion-target-column");
      if (!continuationColumn) {
        continuationColumn = targetObject.document.createElement("div");
        continuationColumn.className = "conjugation-conversion-target-column";
        row.appendChild(continuationColumn);
      }
      if (value.parentElement !== continuationColumn) {
        continuationColumn.appendChild(value);
      }
      Array.from(continuationColumn.children).filter(child => child !== value && child !== actions).forEach(child => child.remove());
      if (actions.parentElement !== continuationColumn) {
        continuationColumn.appendChild(actions);
      }
      syncConjugationConversionSurfaceRouteFrame(surfaceText, actions);
    }
    function resolveAndrewsCnvCnnRouteRecordContinuationGroupMeta(routeRecordId = "") {
      switch (String(routeRecordId || "").trim()) {
        case "cnv-predicate-to-cnn-nounstem-nominalization":
          return {
            key: "registro-cnv-cnn-nominalizada",
            routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
            mode: "sustantivo",
            eyebrow: "Registro",
            title: "CNV → CNN nominalizada"
          };
        case "cnv-core-to-cnn-nounstem-deverbal":
          return {
            key: "registro-cnv-cnn-deverbal",
            routeRecordId: "cnv-core-to-cnn-nounstem-deverbal",
            mode: "sustantivo",
            eyebrow: "Registro",
            title: "núcleo CNV → CNN deverbal"
          };
        case "cnn-nounstem-to-cnv-verbstem-denominal":
          return {
            key: "registro-cnn-cnv-denominal",
            routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
            mode: "verbo",
            eyebrow: "Registro",
            title: "CNN → CNV denominal"
          };
        case "cnv-verbstem-to-cnv-verbstem-deverbal":
          return {
            key: "registro-cnv-cnv-deverbal",
            routeRecordId: "cnv-verbstem-to-cnv-verbstem-deverbal",
            mode: "verbo",
            eyebrow: "Registro",
            title: "CNV → CNV deverbal"
          };
        case "cnv-to-cnn-to-cnv-loop":
          return {
            key: "registro-cnv-cnn-cnv",
            routeRecordId: "cnv-to-cnn-to-cnv-loop",
            mode: "verbo",
            eyebrow: "Registro",
            title: "CNV → CNN → CNV"
          };
        case "cnn-to-cnv-to-cnn-active-action-loop":
          return {
            key: "registro-cnn-cnv-cnn-accion",
            routeRecordId: "cnn-to-cnv-to-cnn-active-action-loop",
            mode: "sustantivo",
            eyebrow: "Registro",
            title: "CNN → CNV → CNN acción"
          };
        case "cnn-to-cnv-to-cnv-deverbal-chain":
          return {
            key: "registro-cnn-cnv-cnv",
            routeRecordId: "cnn-to-cnv-to-cnv-deverbal-chain",
            mode: "verbo",
            eyebrow: "Registro",
            title: "CNN → CNV → CNV"
          };
        default:
          return null;
      }
    }
    function getVisibleContinuationChipRouteExpectation(chip = null) {
      const dataset = chip?.dataset || {};
      const has = key => Boolean(dataset[key]);
      const expected = ({
        datasetKey = "",
        routeRecordId = "",
        operationEs = ""
      } = {}) => ({
        datasetKey,
        routeRecordId,
        operationEs
      });
      if (has("denominalAndrewsContractRouteContinuation") || has("ordinaryNncOwnerhoodContinuation")) {
        return expected({
          datasetKey: has("ordinaryNncOwnerhoodContinuation") ? "ordinaryNncOwnerhoodContinuation" : "denominalAndrewsContractRouteContinuation",
          routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
          operationEs: has("ordinaryNncOwnerhoodContinuation") ? "posesion denominal" : "verbalizacion denominal"
        });
      }
      if (has("verbPatientivoContinuation") || has("patientivoPrelocativeContinuation")) {
        return expected({
          datasetKey: has("patientivoPrelocativeContinuation") ? "patientivoPrelocativeContinuation" : "verbPatientivoContinuation",
          routeRecordId: "cnv-core-to-cnn-nounstem-deverbal",
          operationEs: has("patientivoPrelocativeContinuation") ? "patientivo prelocativo" : "patientivo"
        });
      }
      if (has("patientivoTroncoConversion") || has("huaDeverbalYuContinuation")) {
        return expected({
          datasetKey: has("huaDeverbalYuContinuation") ? "huaDeverbalYuContinuation" : "patientivoTroncoConversion",
          routeRecordId: "cnv-to-cnn-to-cnv-loop",
          operationEs: has("huaDeverbalYuContinuation") ? "yu deverbal a verbalizacion" : "tronco patientivo reincorporable"
        });
      }
      if (has("verbNominalContinuation")) {
        const targetTense = String(dataset.targetTense || "").trim();
        const isAgentive = targetTense.startsWith("agentivo");
        return expected({
          datasetKey: "verbNominalContinuation",
          routeRecordId: isAgentive ? "cnv-predicate-to-cnn-nounstem-nominalization" : "cnv-core-to-cnn-nounstem-deverbal",
          operationEs: isAgentive ? "nominalizacion agentiva" : `nominal deverbal ${targetTense || ""}`.trim()
        });
      }
      if (has("vncAdjectivalFunctionContinuation") || has("nominalizedVncAdjectivalFunctionContinuation") || has("preteritAgentiveNominalCompoundContinuation") || has("customaryAgentiveNominalCompoundContinuation") || has("preteritAgentiveComplementContinuation") || has("preteritAgentiveAdverbialContinuation")) {
        return expected({
          datasetKey: ["vncAdjectivalFunctionContinuation", "nominalizedVncAdjectivalFunctionContinuation", "preteritAgentiveNominalCompoundContinuation", "customaryAgentiveNominalCompoundContinuation", "preteritAgentiveComplementContinuation", "preteritAgentiveAdverbialContinuation"].find(has) || "",
          routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
          operationEs: "nominalizacion o funcion derivada de predicado CNV"
        });
      }
      if (has("ordinaryNncAdjectivalFunctionContinuation") || has("patientivoAdjectivalFunctionContinuation") || has("intensifiedAdjectivalFunctionContinuation") || has("compoundSourceAdjectivalFunctionContinuation") || has("activeActionNominalCompoundContinuation") || has("patientivoNominalCompoundContinuation") || has("actionNounSourceSubjectPossessor") || has("instrumentivoSourceSubjectPossessor")) {
        return expected({
          datasetKey: ["ordinaryNncAdjectivalFunctionContinuation", "patientivoAdjectivalFunctionContinuation", "intensifiedAdjectivalFunctionContinuation", "compoundSourceAdjectivalFunctionContinuation", "activeActionNominalCompoundContinuation", "patientivoNominalCompoundContinuation", "actionNounSourceSubjectPossessor", "instrumentivoSourceSubjectPossessor"].find(has) || "",
          routeRecordId: "cnv-core-to-cnn-nounstem-deverbal",
          operationEs: "funcion o composicion sobre tronco nominal deverbal"
        });
      }
      if (has("activeActionCompoundEmbedContinuation") || has("customaryAgentiveCompoundEmbedContinuation") || has("preteritAgentiveCompoundEmbedContinuation") || has("patientivoCompoundEmbedContinuation") || has("patientivoCharacteristicPropertyEmbedContinuation") || has("preteritAgentiveOwnerhoodContinuation") || has("denominalCompoundAdjectivalFunctionContinuation")) {
        return expected({
          datasetKey: ["activeActionCompoundEmbedContinuation", "customaryAgentiveCompoundEmbedContinuation", "preteritAgentiveCompoundEmbedContinuation", "patientivoCompoundEmbedContinuation", "patientivoCharacteristicPropertyEmbedContinuation", "preteritAgentiveOwnerhoodContinuation", "denominalCompoundAdjectivalFunctionContinuation"].find(has) || "",
          routeRecordId: "cnv-to-cnn-to-cnv-loop",
          operationEs: "bucle CNV-CNN-CNV"
        });
      }
      return null;
    }
    function isAndrewsCnvCnnRouteRecordContinuationGroup(group = null) {
      const dataset = group?.dataset || {};
      const routeRecordId = String(dataset.andrewsRouteRecordGroupId || "").trim();
      return Boolean(resolveAndrewsCnvCnnRouteRecordContinuationGroupMeta(routeRecordId));
    }
    function auditVisibleContinuationRouteRecordGroups(root = null) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      const groups = Array.from(scope?.querySelectorAll?.(".conjugation-conversion-actions .conjugation-continuation-group") || []);
      const missingRouteRecordGroups = groups.filter(group => !isAndrewsCnvCnnRouteRecordContinuationGroup(group)).map(group => ({
        key: String(group?.dataset?.continuationGroup || "").trim(),
        eyebrow: String(group?.querySelector?.(".conjugation-continuation-group__eyebrow")?.textContent || "").trim(),
        title: String(group?.querySelector?.(".conjugation-continuation-group__title")?.textContent || "").trim(),
        chipCount: Number(group?.querySelectorAll?.(".calc-guidance__chip")?.length || 0)
      }));
      return {
        ok: missingRouteRecordGroups.length === 0,
        groupCount: groups.length,
        missingRouteRecordGroups
      };
    }
    function auditVisibleContinuationRouteOutputConsistency(root = null) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      const groups = Array.from(scope?.querySelectorAll?.(".conjugation-conversion-actions .conjugation-continuation-group") || []);
      const inconsistencies = [];
      groups.forEach(group => {
        const groupRouteRecordId = String(group?.dataset?.andrewsRouteRecordGroupId || "").trim();
        const groupKey = String(group?.dataset?.continuationGroup || "").trim();
        const chips = Array.from(group?.querySelectorAll?.(".calc-guidance__chip") || []);
        chips.forEach(chip => {
          const dataset = chip?.dataset || {};
          const chipRouteRecordId = String(dataset.andrewsRouteRecordId || "").trim();
          const expected = getVisibleContinuationChipRouteExpectation(chip);
          const chipInfo = {
            groupKey,
            groupRouteRecordId,
            chipRouteRecordId,
            expectedRouteRecordId: expected?.routeRecordId || "",
            datasetKey: expected?.datasetKey || "",
            operationEs: String(dataset.andrewsUiOperation || expected?.operationEs || "").trim(),
            label: String(chip?.textContent || "").replace(/\s+/g, " ").trim()
          };
          if (!chipRouteRecordId) {
            inconsistencies.push({
              kind: "missing-chip-route-record",
              ...chipInfo
            });
          }
          if (groupRouteRecordId && chipRouteRecordId && groupRouteRecordId !== chipRouteRecordId) {
            inconsistencies.push({
              kind: "group-chip-route-mismatch",
              ...chipInfo
            });
          }
          if (expected?.routeRecordId && chipRouteRecordId && expected.routeRecordId !== chipRouteRecordId) {
            inconsistencies.push({
              kind: "ui-operation-andrews-route-mismatch",
              ...chipInfo
            });
          }
          if (!expected && chipRouteRecordId) {
            inconsistencies.push({
              kind: "unknown-ui-operation-route-record",
              ...chipInfo
            });
          }
          if (chipRouteRecordId && !String(dataset.andrewsRouteActionAllowed || "").trim()) {
            inconsistencies.push({
              kind: "missing-allowed-action-state",
              ...chipInfo
            });
          }
        });
      });
      return {
        ok: inconsistencies.length === 0,
        groupCount: groups.length,
        chipCount: groups.reduce((count, group) => count + Number(group?.querySelectorAll?.(".calc-guidance__chip")?.length || 0), 0),
        inconsistencies
      };
    }
    function resolveContinuationActionGroupMeta(action = null) {
      const dataset = action?.dataset || {};
      const classList = action?.classList || {
        contains: () => false
      };
      const routeRecordGroup = resolveAndrewsCnvCnnRouteRecordContinuationGroupMeta(dataset.andrewsRouteRecordId);
      if (routeRecordGroup) {
        return routeRecordGroup;
      }
      if (classList.contains("calc-guidance__chip--mode-adjetivo")) {
        return {
          key: "registro-pendiente-adjetivo",
          mode: "sustantivo",
          eyebrow: "Registro pendiente",
          title: "continuación sin registro Andrews"
        };
      }
      if (classList.contains("calc-guidance__chip--mode-sustantivo")) {
        return {
          key: "registro-pendiente-sustantivo",
          mode: "sustantivo",
          eyebrow: "Registro pendiente",
          title: "continuación sin registro Andrews"
        };
      }
      return {
        key: "registro-pendiente-verbo",
        mode: "verbo",
        eyebrow: "Registro pendiente",
        title: "continuación sin registro Andrews"
      };
    }
    function getOrCreateContinuationActionGroup(actions = null, meta = {}) {
      if (!actions) {
        return null;
      }
      const key = String(meta.key || "continuacion").trim();
      const existing = actions.querySelector?.(`[data-continuation-group="${key}"] .conjugation-continuation-group__chips`);
      if (existing) {
        return existing;
      }
      const group = targetObject.document.createElement("section");
      group.className = ["conjugation-continuation-group", meta.mode ? `conjugation-continuation-group--${meta.mode}` : ""].filter(Boolean).join(" ");
      group.dataset.continuationGroup = key;
      if (meta.routeRecordId) {
        group.dataset.andrewsRouteRecordGroup = "true";
        group.dataset.andrewsRouteRecordGroupId = meta.routeRecordId;
      }
      const header = targetObject.document.createElement("header");
      header.className = "conjugation-continuation-group__header";
      const eyebrow = targetObject.document.createElement("span");
      eyebrow.className = "conjugation-continuation-group__eyebrow";
      eyebrow.textContent = meta.eyebrow || "Continuación";
      const title = targetObject.document.createElement("span");
      title.className = "conjugation-continuation-group__title";
      title.textContent = meta.title || "Salida";
      header.append(eyebrow, title);
      const chips = targetObject.document.createElement("div");
      chips.className = "conjugation-continuation-group__chips";
      group.append(header, chips);
      actions.appendChild(group);
      return chips;
    }
    function appendContinuationAction(actions = null, action = null) {
      if (!actions || !action) {
        return null;
      }
      applyAndrewsCnvCnnRouteActionDataset(action, action);
      const meta = resolveContinuationActionGroupMeta(action);
      const group = getOrCreateContinuationActionGroup(actions, meta);
      if (!group) {
        actions.appendChild(action);
        syncConjugationConversionSurfaceRouteFrameFromActions(actions);
        return action;
      }
      group.appendChild(action);
      syncConjugationConversionSurfaceRouteFrameFromActions(actions);
      return action;
    }
    function ensureDenominalAndrewsRouteContinuationDisplay({
      value,
      evaluation
    } = {}) {
      if (!value) {
        return null;
      }
      let actions = getConjugationConversionActionsForValue(value);
      if (value.classList.contains("conjugation-value--conversion-picker") && actions) {
        return actions;
      }
      const surfaceDisplay = getConjugationDisplaySurface(evaluation?.result);
      if (!surfaceDisplay || surfaceDisplay === "—") {
        return null;
      }
      value.replaceChildren();
      value.classList.add("conjugation-value--conversion-picker");
      const surfaceText = targetObject.document.createElement("span");
      surfaceText.className = "conjugation-conversion-surface";
      appendConjugationConversionSurfaceLines(surfaceText, surfaceDisplay, evaluation?.result);
      actions = createConjugationConversionActionsContainer();
      value.append(surfaceText, actions);
      applyConjugationConversionColumnLayout(value, surfaceText, actions);
      return actions;
    }
    function getAndrewsCnvCnnRouteSourceRequirementIdsForRendering(frameLike = null) {
      const sourceRequirements = Array.isArray(frameLike?.sourceRequirement?.requirements) ? frameLike.sourceRequirement.requirements : [];
      const routeDiagnostics = Array.isArray(frameLike?.routeDiagnostics) ? frameLike.routeDiagnostics : [];
      return [...sourceRequirements.map(entry => String(entry?.id || entry || "").trim()), ...routeDiagnostics.map(entry => String(entry?.id || entry?.code || "").trim())].filter(Boolean);
    }
    function getAndrewsCnvCnnRouteActionContractForRendering(frameLike = null) {
      if (!frameLike || typeof frameLike !== "object") {
        return null;
      }
      const frame = getGrammarFrameForRendering(frameLike);
      const embedded = frame?.morphBoundaryFrame?.andrewsRouteActionContract || frame?.routeContract?.sourceContract?.andrewsRouteActionContract || frame?.routeContract?.targetContract?.andrewsRouteActionContract || frameLike.andrewsRouteActionContract || null;
      if (embedded?.routeRecordId) {
        return embedded;
      }
      if (typeof targetObject.buildAndrewsCnvCnnBackAndForthRouteActionContract === "function") {
        return targetObject.buildAndrewsCnvCnnBackAndForthRouteActionContract(frameLike, {
          sourceRequirementIds: getAndrewsCnvCnnRouteSourceRequirementIdsForRendering(frameLike)
        });
      }
      const dataset = frameLike.dataset || {};
      const routeRecordId = String(frameLike.routeRecordId || "").trim();
      if (!routeRecordId) {
        return null;
      }
      return {
        routeRecordId,
        transition: String(dataset.andrewsRouteRecordTransition || "").trim(),
        sourceUnit: String(dataset.andrewsRouteSourceUnit || "").trim(),
        targetUnit: String(dataset.andrewsRouteTargetUnit || "").trim(),
        obstacleGateIds: String(dataset.andrewsRouteObstacleGates || "").split("|").filter(Boolean),
        obstacleGates: []
      };
    }
    function getVerbNominalContinuationRouteRecordIdFromSourceUnit(sourceUnit = "") {
      const normalizedSourceUnit = String(sourceUnit || "").trim();
      if (normalizedSourceUnit === NOMINALIZATION_SOURCE_UNITS.vncPredicate) {
        return "cnv-predicate-to-cnn-nounstem-nominalization";
      }
      if (normalizedSourceUnit === NOMINALIZATION_SOURCE_UNITS.vncCoreStem) {
        return "cnv-core-to-cnn-nounstem-deverbal";
      }
      return "";
    }
    function buildVerbNominalContinuationRouteActionContractForRendering({
      preview = null,
      sourceUnit = ""
    } = {}) {
      if (!preview || typeof preview !== "object" || typeof targetObject.buildAndrewsCnvCnnBackAndForthRouteActionContract !== "function") {
        return null;
      }
      const routeRecordId = getVerbNominalContinuationRouteRecordIdFromSourceUnit(sourceUnit);
      if (!routeRecordId) {
        return null;
      }
      const frame = getGrammarFrameForRendering(preview);
      const routeContract = frame?.routeContract && typeof frame.routeContract === "object" ? frame.routeContract : null;
      const resultFrame = frame?.resultFrame && typeof frame.resultFrame === "object" ? frame.resultFrame : null;
      if (!routeContract || !resultFrame || resultFrame.ok !== true) {
        return null;
      }
      return targetObject.buildAndrewsCnvCnnBackAndForthRouteActionContract(preview, {
        routeRecordId,
        sourceRequirementIds: getAndrewsCnvCnnRouteSourceRequirementIdsForRendering(preview),
        obstacleLimit: 8,
        generationAllowed: true
      });
    }
    function formatAndrewsCnvCnnRouteTransitionForRendering(transition = "") {
      const value = String(transition || "").trim();
      if (!value) {
        return "";
      }
      return value.replace(/\bCNV predicate\b/g, "predicado CNV").replace(/\bCNV core\b/g, "núcleo CNV").replace(/\bCNV verbstem\b/g, "tronco CNV").replace(/\bCNN deverbal nounstem\b/g, "tronco deverbal CNN").replace(/\bCNN active-action nounstem\b/g, "tronco de acción activa CNN").replace(/\bCNN nounstem or root-ranked noun source\b/g, "fuente nominal CNN o raíz nominal").replace(/\bCNN nounstem through ti\/hui denominal verbstem\b/g, "tronco CNN vía verbalización ti/hui").replace(/\bCNN nounstem\b/g, "tronco CNN").replace(/\bCNN denominal verbstem\b/g, "tronco denominal CNV").replace(/\bCNV denominal\/deverbal verbstem\b/g, "tronco denominal/deverbal CNV").replace(/\bCNV denominal verbstem\b/g, "tronco denominal CNV").replace(/\bCNV deverbal verbstem\b/g, "tronco deverbal CNV").replace(/->/g, "→");
    }
    function appendAndrewsCnvCnnRouteActionTitle(element = null, contract = null) {
      if (!element || !contract?.routeRecordId) {
        return;
      }
      const transition = formatAndrewsCnvCnnRouteTransitionForRendering(contract.transition);
      const obstacleGateIds = Array.isArray(contract.obstacleGateIds) ? contract.obstacleGateIds.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      const details = [`registro Andrews: ${transition || contract.routeRecordId}`, obstacleGateIds.length ? `compuertas Andrews: ${obstacleGateIds.join(", ")}` : ""].filter(Boolean);
      if (!details.length || String(element.title || "").includes("registro Andrews:")) {
        return;
      }
      element.title = [element.title || "", ...details].filter(Boolean).join("; ");
      if (typeof element.setAttribute === "function") {
        const currentLabel = String(element.getAttribute("aria-label") || element.textContent || "").trim();
        const nextLabel = [currentLabel, transition ? `registro ${transition}` : "", obstacleGateIds.length ? `${obstacleGateIds.length} compuertas Andrews` : ""].filter(Boolean).join(" · ");
        if (nextLabel) {
          element.setAttribute("aria-label", nextLabel);
        }
      }
    }
    function clearAndrewsCnvCnnRouteActionDataset(element = null) {
      if (!element?.dataset) {
        return false;
      }
      ["andrewsRouteRecordId", "andrewsRouteRecordTransition", "andrewsRouteRecordKind", "andrewsRouteSourceUnit", "andrewsRouteTargetUnit", "andrewsRouteObstacleGates", "andrewsRouteObstacleGateCount", "andrewsRouteRankingAllowed", "andrewsRouteFunctionUseValenceGate", "andrewsRouteFunctionUseValenceReason", "andrewsRouteActionAllowed", "andrewsRouteDiagnosticOnly", "andrewsRouteHardGateBlocked", "andrewsRouteActionBlocked", "functionUseValenceHardGate", "andrewsUiDatasetKey", "andrewsUiExpectedRouteRecordId", "andrewsUiOperation"].forEach(key => {
        delete element.dataset[key];
      });
      return true;
    }
    function applyAndrewsCnvCnnRouteActionDataset(element = null, frameLike = null) {
      if (!element?.dataset) {
        return null;
      }
      const contract = getAndrewsCnvCnnRouteActionContractForRendering(frameLike);
      if (!contract?.routeRecordId) {
        clearAndrewsCnvCnnRouteActionDataset(element);
        return null;
      }
      const expectation = getVisibleContinuationChipRouteExpectation(element);
      const obstacleGateIds = Array.isArray(contract.obstacleGateIds) ? contract.obstacleGateIds.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      element.dataset.andrewsRouteRecordId = contract.routeRecordId;
      element.dataset.andrewsRouteRecordTransition = String(contract.transition || "").trim();
      element.dataset.andrewsRouteRecordKind = String(contract.routeKind || "").trim();
      element.dataset.andrewsRouteSourceUnit = String(contract.sourceUnit || "").trim();
      element.dataset.andrewsRouteTargetUnit = String(contract.targetUnit || "").trim();
      element.dataset.andrewsRouteObstacleGates = obstacleGateIds.join("|");
      element.dataset.andrewsRouteObstacleGateCount = String(obstacleGateIds.length);
      const routeRankingAllowed = contract.routeRankingAllowed !== false;
      const functionUseValenceGate = contract.functionUseValenceGate && typeof contract.functionUseValenceGate === "object" ? contract.functionUseValenceGate : null;
      const generationAllowed = routeRankingAllowed && (typeof contract.generationAllowed === "boolean" ? contract.generationAllowed : !(element.disabled === true || element.classList?.contains?.("is-unavailable")));
      element.dataset.andrewsRouteRankingAllowed = String(routeRankingAllowed);
      element.dataset.andrewsRouteFunctionUseValenceGate = String(functionUseValenceGate?.status || "");
      element.dataset.andrewsRouteFunctionUseValenceReason = String(functionUseValenceGate?.reason || "");
      element.dataset.andrewsRouteActionAllowed = String(generationAllowed);
      element.dataset.andrewsRouteDiagnosticOnly = String(contract.diagnosticOnly === true || generationAllowed !== true);
      applyAndrewsCnvCnnRouteActionHardGateState(element, contract);
      if (expectation) {
        element.dataset.andrewsUiDatasetKey = expectation.datasetKey;
        element.dataset.andrewsUiExpectedRouteRecordId = expectation.routeRecordId;
        element.dataset.andrewsUiOperation = expectation.operationEs;
      }
      appendAndrewsCnvCnnRouteActionTitle(element, contract);
      return contract;
    }
    function getFunctionUseContinuationRouteOwnershipOptions(contract = null) {
      const source = contract && typeof contract === "object" ? contract : {};
      const grammarFrame = source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : source.frames && typeof source.frames === "object" ? source.frames : null;
      const sourceRouteFrame = source.sourceRouteFrame || source.routeFrame || source.incorporationRouteFrame || source.sourceContract?.sourceRouteFrame || source.sourceContract?.routeFrame || source.targetContract?.sourceRouteFrame || source.targetContract?.routeFrame || source.entryRouteContract?.sourceRouteFrame || source.entryRouteContract?.routeFrame || grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame || grammarFrame?.routeContract?.sourceContract?.routeFrame || grammarFrame?.routeContract?.targetContract?.sourceRouteFrame || grammarFrame?.routeContract?.targetContract?.routeFrame || grammarFrame?.sourceContract?.sourceRouteFrame || grammarFrame?.sourceContract?.routeFrame || grammarFrame?.targetContract?.sourceRouteFrame || grammarFrame?.targetContract?.routeFrame || grammarFrame?.participantFrame?.sourceRouteFrame || grammarFrame?.participantFrame?.routeFrame || source.adjectivalNncFunctionFrame?.sourceRouteFrame || source.adjectivalNncFunctionFrame?.routeFrame || source.adverbialNuclearFrame?.sourceRouteFrame || source.adverbialNuclearFrame?.routeFrame || null;
      const objectSlotOwnership = source.objectSlotOwnership || sourceRouteFrame?.objectSlotOwnership || source.sourceContract?.objectSlotOwnership || source.targetContract?.objectSlotOwnership || source.entryRouteContract?.objectSlotOwnership || source.entryRouteContract?.sourceContract?.objectSlotOwnership || source.entryRouteContract?.targetContract?.objectSlotOwnership || grammarFrame?.participantFrame?.objectSlotOwnership || grammarFrame?.sourceContract?.objectSlotOwnership || grammarFrame?.targetContract?.objectSlotOwnership || grammarFrame?.routeContract?.sourceContract?.objectSlotOwnership || grammarFrame?.routeContract?.targetContract?.objectSlotOwnership || null;
      const functionUseValenceGate = source.functionUseValenceGate || source.sourceContract?.functionUseValenceGate || source.targetContract?.functionUseValenceGate || source.entryRouteContract?.functionUseValenceGate || source.entryRouteContract?.sourceContract?.functionUseValenceGate || source.entryRouteContract?.targetContract?.functionUseValenceGate || grammarFrame?.routeContract?.sourceContract?.functionUseValenceGate || grammarFrame?.routeContract?.targetContract?.functionUseValenceGate || grammarFrame?.routeContract?.functionUseValenceGate || null;
      return {
        grammarFrame,
        sourceRouteFrame,
        routeFrame: source.routeFrame || sourceRouteFrame || null,
        incorporationRouteFrame: source.incorporationRouteFrame || sourceRouteFrame || null,
        objectSlotOwnership,
        functionUseValenceGate: functionUseValenceGate && typeof functionUseValenceGate === "object" ? functionUseValenceGate : null
      };
    }
    function isAndrewsCnvCnnRouteActionFunctionUseHardBlocked(element = null) {
      const dataset = element?.dataset || {};
      const gateStatus = String(dataset.andrewsRouteFunctionUseValenceGate || "").trim();
      const rankingAllowed = String(dataset.andrewsRouteRankingAllowed || "").trim();
      const hardGateBlocked = String(dataset.andrewsRouteHardGateBlocked || "").trim();
      return gateStatus === "blocked" || rankingAllowed === "false" || hardGateBlocked === "true";
    }
    function blockAndrewsCnvCnnRouteActionHardGateEvent(element = null, event = null) {
      if (!isAndrewsCnvCnnRouteActionFunctionUseHardBlocked(element)) {
        return false;
      }
      if (event && typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      if (event && typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      } else if (event && typeof event.stopPropagation === "function") {
        event.stopPropagation();
      }
      if (typeof targetObject.dispatchAppEvent === "function") {
        const dataset = element?.dataset || {};
        targetObject.dispatchAppEvent("nawat:function-use-valence-route-blocked", {
          routeRecordId: String(dataset.andrewsRouteRecordId || "").trim(),
          reason: String(dataset.andrewsRouteFunctionUseValenceReason || "").trim(),
          diagnosticId: "function-use-valence-object-frame-unfixed",
          source: "route-action-element"
        });
      }
      return true;
    }
    function attachAndrewsCnvCnnRouteActionHardGateClickGuard(element = null) {
      if (!element?.dataset || typeof element.addEventListener !== "function") {
        return false;
      }
      if (element.dataset.andrewsRouteHardGateClickGuardBound === "true") {
        return true;
      }
      element.dataset.andrewsRouteHardGateClickGuardBound = "true";
      element.addEventListener("click", event => {
        blockAndrewsCnvCnnRouteActionHardGateEvent(element, event);
      }, true);
      return true;
    }
    function applyAndrewsCnvCnnRouteActionHardGateState(element = null, contract = null) {
      if (!element?.dataset || !contract) {
        return false;
      }
      const functionUseValenceGate = contract.functionUseValenceGate && typeof contract.functionUseValenceGate === "object" ? contract.functionUseValenceGate : null;
      const blocked = contract.routeRankingAllowed === false || functionUseValenceGate?.status === "blocked" || functionUseValenceGate?.routeRankingAllowed === false || functionUseValenceGate?.generationAllowed === false;
      element.dataset.andrewsRouteHardGateBlocked = String(blocked);
      attachAndrewsCnvCnnRouteActionHardGateClickGuard(element);
      if (!blocked) {
        return false;
      }
      element.dataset.andrewsRouteActionBlocked = "function-use-valence-object";
      element.dataset.functionUseValenceHardGate = "true";
      if ("disabled" in element) {
        element.disabled = true;
      }
      if (typeof element.setAttribute === "function") {
        element.setAttribute("aria-disabled", "true");
      }
      if (element.classList && typeof element.classList.add === "function") {
        element.classList.add("is-unavailable", "is-function-use-valence-gated");
      }
      return true;
    }
    function renderDenominalAndrewsContractRouteContinuationForValue({
      value,
      evaluation,
      targetTense = ""
    } = {}) {
      if (!value || evaluation?.shouldMaskRow || typeof targetObject.activateNawatDenominalAndrewsContractRouteTarget !== "function") {
        return false;
      }
      const profile = evaluation?.result?.denominalFamilyProfile;
      let preview = profile?.andrewsContractRoutePreview;
      let activeNextSourcePreview = null;
      const previewActiveAndrewsNextSourceFns = [typeof targetObject.previewActiveNawatDenominalAndrewsContractRouteNextSource === "function" ? targetObject.previewActiveNawatDenominalAndrewsContractRouteNextSource : null, typeof globalThis !== "undefined" && typeof globalThis.previewActiveNawatDenominalAndrewsContractRouteNextSource === "function" ? globalThis.previewActiveNawatDenominalAndrewsContractRouteNextSource : null, typeof previewActiveNawatDenominalAndrewsContractRouteNextSourceForRendering === "function" ? previewActiveNawatDenominalAndrewsContractRouteNextSourceForRendering : null].filter(candidate => typeof candidate === "function");
      if ((!preview || !Array.isArray(preview.routes) || !preview.routes.length) && previewActiveAndrewsNextSourceFns.length) {
        const currentVerbInputValue = typeof targetObject.document !== "undefined" ? String(targetObject.document.getElementById("verb")?.value || "").trim() : "";
        for (const previewActiveAndrewsNextSource of previewActiveAndrewsNextSourceFns) {
          activeNextSourcePreview = previewActiveAndrewsNextSource({
            inputValue: currentVerbInputValue
          });
          preview = activeNextSourcePreview?.routePreview || null;
          if (preview && Array.isArray(preview.routes) && preview.routes.length) {
            break;
          }
        }
      }
      const routes = Array.isArray(preview?.routes) ? preview.routes.filter(route => route?.finiteGenerationContractAvailable === true) : [];
      const resolvedTargetTense = String(profile?.targetTense || targetTense || "").trim();
      if (!routes.length || !resolvedTargetTense) {
        return false;
      }
      const currentObjectPrefix = typeof targetObject.getCurrentObjectPrefix === "function" ? String(targetObject.getCurrentObjectPrefix() || "").trim() : "";
      const actions = ensureDenominalAndrewsRouteContinuationDisplay({
        value,
        evaluation
      });
      if (!actions) {
        return false;
      }
      const objectPrefixChoices = Array.isArray(targetObject.OBJECT_PREFIXES) ? targetObject.OBJECT_PREFIXES.map(prefix => String(typeof prefix === "object" ? prefix?.value : prefix || "").trim()).filter(prefix => ["ta", "te", "mu"].includes(prefix)) : ["ta", "te", "mu"];
      const renderObjectPrefixChoice = ({
        route,
        targetInput,
        objectPrefix,
        hasRouteWarning = false,
        hasRouteNote = false,
        sourceFinalPatternLabel = "",
        sourceEvidenceSatisfied = false
      } = {}) => {
        const prefix = String(objectPrefix || "").trim();
        if (!route || !targetInput || !prefix) {
          return;
        }
        const sourceRequirementIds = Array.isArray(route.sourceRequirement?.requirements) ? route.sourceRequirement.requirements.map(requirement => String(requirement?.id || "").trim()) : [];
        const sourceContextRequired = route.finiteGenerationRequiresSourceContext === true || route.sourceRequirement?.finiteGenerationRequiresSourceContext === true;
        const sourceEvidenceRequired = sourceContextRequired || route.finiteGenerationRequiresSourceEvidence === true || route.sourceRequirement?.finiteGenerationRequiresSourceEvidence === true;
        const resolvedSourceContextSatisfied = route.sourceRequirement?.sourceContextValidationStatus === "source-context-satisfied";
        const resolvedSourceEvidenceSatisfied = sourceEvidenceSatisfied || resolvedSourceContextSatisfied || route.sourceRequirement?.validationStatus === "source-evidence-satisfied";
        const sourceEvidencePending = sourceEvidenceRequired && !resolvedSourceEvidenceSatisfied;
        const objectButton = targetObject.document.createElement("button");
        objectButton.type = "button";
        objectButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo", "calc-guidance__chip--denominal-andrews", "calc-guidance__chip--object-prefix-choice", resolvedSourceEvidenceSatisfied ? "is-source-satisfied" : "", sourceEvidencePending ? "is-source-pending" : "", sourceEvidencePending ? "is-andrews-source-diagnostic" : ""].filter(Boolean).join(" ");
        objectButton.dataset.denominalAndrewsContractRouteContinuation = "true";
        objectButton.dataset.denominalAndrewsObjectPrefixChoice = "true";
        objectButton.dataset.andrewsRouteRecordId = "cnn-nounstem-to-cnv-verbstem-denominal";
        objectButton.dataset.contractId = route.contractId || "";
        objectButton.dataset.routeTemplateId = route.routeTemplateId || "";
        objectButton.dataset.targetInput = targetInput;
        objectButton.dataset.targetTense = resolvedTargetTense;
        objectButton.dataset.objectPrefix = prefix;
        objectButton.dataset.objectPrefixSatisfied = "true";
        objectButton.dataset.sourceContextRequired = sourceContextRequired ? "true" : "";
        objectButton.dataset.sourceEvidenceRequired = sourceEvidenceRequired ? "true" : "";
        objectButton.dataset.sourceEvidenceSatisfied = resolvedSourceEvidenceSatisfied ? "true" : "";
        objectButton.dataset.sourceEvidencePending = sourceEvidencePending ? "true" : "";
        objectButton.dataset.sourceRequirementGate = sourceEvidencePending ? "andrews-source-context-diagnostic-not-generation-gate" : "satisfied-or-not-required";
        if (route.executableRuleId) {
          objectButton.dataset.executableRuleId = route.executableRuleId;
          objectButton.classList.add("calc-guidance__chip--andrews-rule-executable");
        }
        if (sourceRequirementIds.includes("intransitive-ti-verbstem-source")) {
          objectButton.dataset.tiSourceRequired = "true";
          objectButton.classList.add("is-ti-source");
        }
        if (sourceRequirementIds.includes("intransitive-hui-verbstem-source")) {
          objectButton.dataset.huiSourceRequired = "true";
          objectButton.classList.add("is-hui-source");
        }
        if (sourceRequirementIds.includes("intransitive-ya-verbstem-source")) {
          objectButton.dataset.yaSourceRequired = "true";
          objectButton.classList.add("is-ya-source");
        }
        if (sourceRequirementIds.includes("intransitive-tla-verbstem-source")) {
          objectButton.dataset.tlaIntransitiveSourceRequired = "true";
          objectButton.classList.add("is-tla-intransitive-source");
        }
        if (sourceRequirementIds.includes("intransitive-o-a-verbstem-source")) {
          objectButton.dataset.intransitiveOaSourceRequired = "true";
          objectButton.classList.add("is-intransitive-o-a-source");
        }
        if (sourceRequirementIds.includes("i-hui-a-hui-source")) {
          objectButton.dataset.iHuiAHuiSourceRequired = "true";
          objectButton.classList.add("is-i-hui-a-hui-source");
        }
        applyGrammarFrameRouteDataset(objectButton, route);
        const objectRouteActionContract = applyAndrewsCnvCnnRouteActionDataset(objectButton, {
          ...route,
          routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal"
        });
        const objectLabel = targetObject.document.createElement("span");
        objectLabel.className = "calc-guidance__chip-label";
        objectLabel.textContent = `${prefix} → ${targetInput}`;
        objectButton.appendChild(objectLabel);
        const objectSubLabel = targetObject.document.createElement("span");
        objectSubLabel.className = "calc-guidance__chip-sublabel";
        objectSubLabel.textContent = [`Andrews ${route.range || ""}`, `objeto ${prefix}`, hasRouteWarning ? "aviso" : "", !hasRouteWarning && hasRouteNote ? "nota" : "", sourceFinalPatternLabel, "registro CNN -> CNV", objectRouteActionContract?.obstacleGateIds?.length ? `compuertas ${objectRouteActionContract.obstacleGateIds.length}` : "", "fuente Andrews", resolvedTargetTense].filter(Boolean).join(" · ");
        objectButton.appendChild(objectSubLabel);
        objectButton.title = [`contrato: ${route.contractId || ""}`, route.executableRuleId ? `regla: ${route.executableRuleId}` : "", `ruta: ${route.routeTemplateId || ""}`, `objeto verbal: ${prefix}`, `entrada verbal: ${targetInput}`, `tiempo: ${resolvedTargetTense}`, objectRouteActionContract?.requiredBoundary ? `límite Andrews: ${objectRouteActionContract.requiredBoundary}` : "", objectRouteActionContract?.obstacleGateIds?.length ? `compuertas Andrews: ${objectRouteActionContract.obstacleGateIds.join(", ")}` : "", "objeto verbal seleccionado explícitamente", "no crea ficha lexical"].filter(Boolean).join("; ");
        objectButton.addEventListener("click", () => {
          setActiveNawatDenominalAndrewsContractRouteRenderContext(route);
          targetObject.activateNawatDenominalAndrewsContractRouteTarget(route, {
            targetTense: resolvedTargetTense,
            objectPrefix: prefix,
            render: true,
            anchorElement: objectButton
          });
        });
        appendContinuationAction(actions, objectButton);
      };
      routes.forEach(route => {
        const targetInput = String(route.targetInputValue || route.targetInput || route.targetVerbStem || "").trim();
        if (!targetInput) {
          return;
        }
        const continuationIdentityKey = getDenominalAndrewsRouteContinuationIdentityKey(route, {
          namespace: "denominal-andrews-route-continuation",
          routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
          targetTense: resolvedTargetTense
        });
        if (!continuationIdentityKey) {
          return;
        }
        const alreadyRendered = Array.from(actions.querySelectorAll("[data-denominal-andrews-contract-route-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
        if (alreadyRendered) {
          return;
        }
        const continueButton = targetObject.document.createElement("button");
        continueButton.type = "button";
        continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo", "calc-guidance__chip--denominal-andrews"].join(" ");
        continueButton.dataset.denominalAndrewsContractRouteContinuation = "true";
        continueButton.dataset.andrewsRouteRecordId = "cnn-nounstem-to-cnv-verbstem-denominal";
        continueButton.dataset.contractId = route.contractId || "";
        continueButton.dataset.routeTemplateId = route.routeTemplateId || "";
        if (route.executableRuleId) {
          continueButton.dataset.executableRuleId = route.executableRuleId;
          continueButton.classList.add("calc-guidance__chip--andrews-rule-executable");
        }
        continueButton.dataset.targetInput = targetInput;
        continueButton.dataset.targetTense = resolvedTargetTense;
        continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
        continueButton.dataset.continuationIdentitySource = "route-contract";
        applyGrammarFrameRouteDataset(continueButton, route);
        const continueRouteActionContract = applyAndrewsCnvCnnRouteActionDataset(continueButton, {
          ...route,
          routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal"
        });
        const routeDiagnostics = Array.isArray(route.routeDiagnostics) ? route.routeDiagnostics : [];
        const hasRouteWarning = routeDiagnostics.some(diagnostic => diagnostic?.severity === "warning");
        const hasRouteNote = routeDiagnostics.some(diagnostic => diagnostic?.severity === "info");
        if (hasRouteWarning) {
          continueButton.dataset.andrewsRouteWarning = "true";
          continueButton.classList.add("is-warning");
        } else if (hasRouteNote) {
          continueButton.dataset.andrewsRouteNote = "true";
          continueButton.classList.add("is-note");
        }
        const sourceFinalPatternStatus = String(route.sourceFinalPatternStatus || route.boundaries?.sourceFinalPatternStatus || "").trim();
        const sourceFinalPatternLabel = String(route.sourceFinalPatternLabel || route.boundaries?.sourceFinalPatternLabel || "").trim();
        if (sourceFinalPatternStatus) {
          continueButton.dataset.sourceFinalPatternStatus = sourceFinalPatternStatus;
          continueButton.classList.add("is-source-final-pattern");
          if (sourceFinalPatternStatus === "attested-minority") {
            continueButton.classList.add("is-source-final-minority");
          }
          if (sourceFinalPatternStatus === "unlisted" || sourceFinalPatternStatus === "w-final-huia-ambiguous") {
            continueButton.classList.add("is-source-final-needs-confirmation");
          }
        }
        const sourceFinalDeterminesTargetStemClass = route.boundaries?.sourceFinalDeterminesTargetStemClass === true;
        const targetStemClassRule = String(route.targetStemClassRule || route.boundaries?.targetStemClassRule || "").trim();
        if (sourceFinalDeterminesTargetStemClass) {
          continueButton.dataset.sourceFinalClassContract = "true";
          continueButton.classList.add("is-source-final-class-contract");
        }
        const traditionalSpelling = String(route.traditionalSpelling || route.boundaries?.traditionalSpelling || "").trim();
        const traditionalSpellingConfusableWith = String(route.traditionalSpellingConfusableWith || route.boundaries?.traditionalSpellingConfusableWith || "").trim();
        if (traditionalSpellingConfusableWith) {
          continueButton.dataset.traditionalSpellingAmbiguous = "true";
          continueButton.classList.add("is-traditional-spelling-ambiguous");
        }
        const objectPrefixRequired = route.finiteGenerationRequiresObjectPrefix === true || route.objectSlotExpected === true;
        const sourceContextRequired = route.finiteGenerationRequiresSourceContext === true || route.sourceRequirement?.finiteGenerationRequiresSourceContext === true;
        const sourceEvidenceRequired = sourceContextRequired || route.finiteGenerationRequiresSourceEvidence === true || route.sourceRequirement?.finiteGenerationRequiresSourceEvidence === true;
        const sourceContextSatisfied = route.sourceRequirement?.sourceContextValidationStatus === "source-context-satisfied";
        const sourceEvidenceSatisfied = sourceContextSatisfied || route.sourceRequirement?.validationStatus === "source-evidence-satisfied";
        const sourceEvidencePending = sourceEvidenceRequired && !sourceEvidenceSatisfied;
        const sourceRequirementIds = Array.isArray(route.sourceRequirement?.requirements) ? route.sourceRequirement.requirements.map(requirement => String(requirement?.id || "").trim()) : [];
        if (sourceEvidenceRequired) {
          continueButton.dataset.sourceContextRequired = sourceContextRequired ? "true" : "";
          continueButton.dataset.sourceEvidenceRequired = "true";
          continueButton.classList.add("is-source-required");
        }
        if (sourceEvidencePending) {
          continueButton.dataset.sourceEvidencePending = "true";
          continueButton.dataset.sourceRequirementGate = "andrews-source-context-diagnostic-not-generation-gate";
          continueButton.classList.add("is-source-pending", "is-andrews-source-diagnostic");
        } else {
          continueButton.dataset.sourceRequirementGate = "satisfied-or-not-required";
        }
        if (sourceContextSatisfied) {
          continueButton.dataset.sourceContextSatisfied = "true";
        }
        if (sourceEvidenceSatisfied) {
          continueButton.dataset.sourceEvidenceSatisfied = "true";
          continueButton.classList.add("is-source-satisfied");
        }
        if (sourceRequirementIds.includes("intransitive-ti-verbstem-source")) {
          continueButton.dataset.tiSourceRequired = "true";
          continueButton.classList.add("is-ti-source");
        }
        if (sourceRequirementIds.includes("intransitive-hui-verbstem-source")) {
          continueButton.dataset.huiSourceRequired = "true";
          continueButton.classList.add("is-hui-source");
        }
        if (sourceRequirementIds.includes("intransitive-ya-verbstem-source")) {
          continueButton.dataset.yaSourceRequired = "true";
          continueButton.classList.add("is-ya-source");
        }
        if (sourceRequirementIds.includes("intransitive-tla-verbstem-source")) {
          continueButton.dataset.tlaIntransitiveSourceRequired = "true";
          continueButton.classList.add("is-tla-intransitive-source");
        }
        if (sourceRequirementIds.includes("intransitive-o-a-verbstem-source")) {
          continueButton.dataset.intransitiveOaSourceRequired = "true";
          continueButton.classList.add("is-intransitive-o-a-source");
        }
        if (sourceRequirementIds.includes("i-hui-a-hui-source")) {
          continueButton.dataset.iHuiAHuiSourceRequired = "true";
          continueButton.classList.add("is-i-hui-a-hui-source");
        }
        if (sourceRequirementIds.includes("deverbal-yu-nounstem")) {
          continueButton.dataset.deverbalYuSourceRequired = "true";
          continueButton.classList.add("is-deverbal-yu-source");
        }
        if (sourceRequirementIds.includes("temporal-compound-nounstem")) {
          continueButton.dataset.temporalSourceRequired = "true";
          continueButton.classList.add("is-temporal-source");
        }
        if (sourceRequirementIds.includes("adverbial-nounstem")) {
          continueButton.dataset.adverbialSourceRequired = "true";
          continueButton.classList.add("is-adverbial-source");
        }
        if (sourceRequirementIds.includes("relational-compound-or-possessive-relational-predicate")) {
          continueButton.dataset.relationalCompoundSourceRequired = "true";
          continueButton.classList.add("is-relational-source");
        }
        if (objectPrefixRequired) {
          continueButton.dataset.objectPrefixRequired = "true";
        }
        if (objectPrefixRequired && !currentObjectPrefix) {
          continueButton.disabled = true;
          continueButton.setAttribute("aria-disabled", "true");
          continueButton.classList.add("is-unavailable");
          continueButton.dataset.objectPrefixMissing = "true";
          continueButton.classList.add("is-object-prefix-required");
        }
        const continueLabel = targetObject.document.createElement("span");
        continueLabel.className = "calc-guidance__chip-label";
        continueLabel.textContent = `→ ${targetInput}`;
        continueButton.appendChild(continueLabel);
        const continueSubLabel = targetObject.document.createElement("span");
        continueSubLabel.className = "calc-guidance__chip-sublabel";
        continueSubLabel.textContent = [`Andrews ${route.range || ""}`, route.targetStemClass ? `Clase ${route.targetStemClass}` : "", hasRouteWarning ? "aviso" : "", !hasRouteWarning && hasRouteNote ? "nota" : "", sourceFinalPatternLabel, sourceFinalDeterminesTargetStemClass ? "clase por segmento final" : "", traditionalSpellingConfusableWith ? "grafía ambigua" : "", "registro CNN -> CNV", continueRouteActionContract?.obstacleGateIds?.length ? `compuertas ${continueRouteActionContract.obstacleGateIds.length}` : "", sourceEvidencePending ? "contexto Andrews pendiente" : "", sourceEvidenceSatisfied ? "fuente Andrews" : "", objectPrefixRequired && !currentObjectPrefix ? "objeto pendiente" : "", resolvedTargetTense].filter(Boolean).join(" · ");
        continueButton.appendChild(continueSubLabel);
        continueButton.title = [`contrato: ${route.contractId || ""}`, route.executableRuleId ? `regla: ${route.executableRuleId}` : "", `ruta: ${route.routeTemplateId || ""}`, `sufijo: ${route.classicalSuffixSequence || ""} -> ${route.nawatRuleSuffix || ""}`, route.targetStemClass ? `clase: ${route.targetStemClass}` : "", `entrada verbal: ${targetInput}`, `tiempo: ${resolvedTargetTense}`, sourceEvidencePending ? "contexto Andrews pendiente; no bloquea generacion" : "", sourceEvidenceSatisfied ? "fuente Andrews satisfecha por etapa generada" : "", objectPrefixRequired ? "requiere objeto verbal" : "", continueRouteActionContract?.requiredBoundary ? `límite Andrews: ${continueRouteActionContract.requiredBoundary}` : "", continueRouteActionContract?.obstacleGateIds?.length ? `compuertas Andrews: ${continueRouteActionContract.obstacleGateIds.join(", ")}` : "", sourceFinalPatternLabel, targetStemClassRule ? `regla de clase: ${targetStemClassRule}` : "", traditionalSpellingConfusableWith ? `grafía ${traditionalSpelling} puede confundirse con ${traditionalSpellingConfusableWith}` : "", routeDiagnostics.map(diagnostic => diagnostic?.message || "").filter(Boolean).join(" "), "no crea ficha lexical"].filter(Boolean).join("; ");
        continueButton.addEventListener("click", () => {
          setActiveNawatDenominalAndrewsContractRouteRenderContext(route);
          targetObject.activateNawatDenominalAndrewsContractRouteTarget(route, {
            targetTense: resolvedTargetTense,
            objectPrefix: currentObjectPrefix,
            render: true,
            anchorElement: continueButton
          });
        });
        appendContinuationAction(actions, continueButton);
        if (objectPrefixRequired && !currentObjectPrefix) {
          objectPrefixChoices.forEach(objectPrefixChoice => {
            renderObjectPrefixChoice({
              route,
              targetInput,
              objectPrefix: objectPrefixChoice,
              hasRouteWarning,
              hasRouteNote,
              sourceFinalPatternLabel,
              sourceEvidenceSatisfied
            });
          });
        }
      });
      return true;
    }
    function getVerbToNominalContinuationSpecsForTense(tenseValue = "") {
      const sourceTense = String(tenseValue || "").trim();
      const predicateSourceUnit = NOMINALIZATION_SOURCE_UNITS.vncPredicate;
      const predicateNominalSpec = {
        targetTense: "predicado-nominal",
        subLabel: "S predicado nominal",
        sourceUnit: predicateSourceUnit,
        predicateNominalSourceTense: sourceTense
      };
      const specsBySourceTense = {
        presente: [predicateNominalSpec, {
          targetTense: "agentivo-presente",
          subLabel: "S agentivo presente",
          sourceUnit: predicateSourceUnit
        }],
        "presente-habitual": [predicateNominalSpec, {
          targetTense: "agentivo",
          subLabel: "S agentivo habitual",
          sourceUnit: predicateSourceUnit
        }, {
          targetTense: "instrumentivo",
          subLabel: "S instrumentivo",
          sourceUnit: predicateSourceUnit
        }],
        preterito: [predicateNominalSpec, {
          targetTense: "agentivo-preterito",
          subLabel: "S agentivo pretérito",
          sourceUnit: predicateSourceUnit
        }],
        perfecto: [predicateNominalSpec, {
          targetTense: "agentivo-preterito",
          subLabel: "S agentivo pretérito",
          sourceUnit: predicateSourceUnit
        }],
        pluscuamperfecto: [predicateNominalSpec, {
          targetTense: "agentivo-preterito",
          subLabel: "S agentivo pretérito",
          sourceUnit: predicateSourceUnit
        }],
        "condicional-perfecto": [predicateNominalSpec, {
          targetTense: "agentivo-preterito",
          subLabel: "S agentivo pretérito",
          sourceUnit: predicateSourceUnit
        }],
        futuro: [predicateNominalSpec, {
          targetTense: "agentivo-futuro",
          subLabel: "S agentivo futuro",
          sourceUnit: predicateSourceUnit
        }, {
          targetTense: "sustantivo-verbal",
          subLabel: "S acción",
          sourceUnit: predicateSourceUnit
        }],
        condicional: [predicateNominalSpec, {
          targetTense: "agentivo-futuro",
          subLabel: "S agentivo futuro",
          sourceUnit: predicateSourceUnit
        }, {
          targetTense: "sustantivo-verbal",
          subLabel: "S acción",
          sourceUnit: predicateSourceUnit
        }],
        imperfecto: [predicateNominalSpec, {
          targetTense: "locativo-temporal",
          subLabel: "S locativo/temporal",
          sourceUnit: predicateSourceUnit
        }],
        "pasado-remoto": [predicateNominalSpec, {
          targetTense: "calificativo-instrumentivo",
          subLabel: "S calificativo",
          sourceUnit: predicateSourceUnit
        }]
      };
      return specsBySourceTense[sourceTense] || [];
    }
    function appendNawatLinkedGrammarStageSubLabels(baseLabel = "", stage = null, options = {}) {
      return [baseLabel, ...buildNawatLinkedGrammarStageSubLabels(stage, options)].filter(Boolean).join(" · ");
    }
    function buildNawatLinkedGrammarSelectionSummarySubLabels(summary = null, {
      maxRoutes = 3,
      maxStagesPerRoute = 1,
      includeCurrentSource = true,
      includeOptionCount = true,
      includeDiagnostics = true
    } = {}) {
      if (!summary || summary.outputKind !== "linked-grammar-path-selection-summary") {
        return [];
      }
      const labels = [];
      const currentSourceVerb = String(summary.currentSource?.sourceVerb || summary.initialSource?.sourceVerb || "").trim();
      if (includeCurrentSource && currentSourceVerb) {
        labels.push(`Fuente actual: ${currentSourceVerb}`);
      }
      const appendableSelectionCount = Number(summary.appendableSelectionCount || 0);
      if (includeOptionCount && Number.isFinite(appendableSelectionCount) && appendableSelectionCount > 0) {
        labels.push(`Opciones siguientes: ${appendableSelectionCount}`);
      }
      const routeLimit = Math.max(0, Number.isFinite(Number(maxRoutes)) ? Number(maxRoutes) : 0);
      const stageLimit = Math.max(0, Number.isFinite(Number(maxStagesPerRoute)) ? Number(maxStagesPerRoute) : 0);
      const nextRoutes = Array.isArray(summary.nextRoutes) ? summary.nextRoutes : [];
      nextRoutes.slice(0, routeLimit).forEach(route => {
        const routeId = String(route?.routeId || "").trim();
        const appendableStages = Array.isArray(route?.appendableStages) ? route.appendableStages : [];
        appendableStages.slice(0, stageLimit).forEach(stage => {
          const selection = stage?.selection && typeof stage.selection === "object" ? stage.selection : null;
          const stageKey = String(selection?.stageKey || stage?.stageKey || stage?.stationKey || "").trim();
          const sourceVerb = getNawatLinkedGrammarStageSourceVerb(stage);
          const routeStageLabel = formatNawatLinkedGrammarCompactChoiceLabel({
            routeId,
            routeFamily: route?.routeFamily || "",
            stageKey
          });
          if (!sourceVerb && (hasConjugationResultFrame(stage) || hasConjugationResultFrame(stage?.nextSource))) {
            return;
          }
          if (routeStageLabel && sourceVerb) {
            labels.push(`Siguiente salida: ${routeStageLabel} → ${sourceVerb}`);
            return;
          }
          if (routeStageLabel) {
            labels.push(`Siguiente salida: ${routeStageLabel}`);
            return;
          }
          if (sourceVerb) {
            labels.push(`Siguiente salida: ${sourceVerb}`);
          }
        });
      });
      if (includeDiagnostics) {
        const diagnostics = Array.isArray(summary.diagnostics) ? summary.diagnostics : [];
        diagnostics.forEach(diagnostic => {
          const message = String(diagnostic?.message || diagnostic || "").trim();
          if (message) {
            labels.push(`Diagnóstico: ${message}`);
          }
        });
      }
      return labels.filter(Boolean);
    }
    function appendNawatLinkedGrammarSelectionSummarySubLabels(baseLabel = "", summary = null, options = {}) {
      return [baseLabel, ...buildNawatLinkedGrammarSelectionSummarySubLabels(summary, options)].filter(Boolean).join(" · ");
    }
    function buildNawatLinkedGrammarSelectedPathSubLabels(summary = null) {
      if (!summary || summary.outputKind !== "linked-grammar-path-selection-summary") {
        return [];
      }
      const selectedSteps = Array.isArray(summary.selectedSteps) ? summary.selectedSteps : [];
      const selectedLabels = selectedSteps.map(step => {
        return formatNawatLinkedGrammarCompactChoiceLabel({
          routeId: step?.selection?.routeId || step?.route?.routeId || "",
          routeFamily: step?.route?.routeFamily || "",
          stageKey: step?.selection?.stageKey || step?.selectedStage?.stationKey || ""
        });
      }).filter(Boolean);
      const labels = [];
      if (selectedLabels.length) {
        labels.push(`Trayecto: ${selectedLabels.join(" → ")}`);
      }
      labels.push(...buildNawatLinkedGrammarSelectionSummarySubLabels(summary, {
        maxRoutes: 1,
        maxStagesPerRoute: 1
      }));
      return labels.filter(Boolean);
    }
    function getNawatLinkedGrammarAppendableSelections(summary = null, {
      maxChoices = 6
    } = {}) {
      if (!summary || summary.outputKind !== "linked-grammar-path-selection-summary") {
        return [];
      }
      const limit = Math.max(0, Number.isFinite(Number(maxChoices)) ? Number(maxChoices) : 6);
      if (!limit) {
        return [];
      }
      const choices = [];
      const nextRoutes = Array.isArray(summary.nextRoutes) ? summary.nextRoutes : [];
      for (const route of nextRoutes) {
        const routeId = String(route?.routeId || "").trim();
        const appendableStages = Array.isArray(route?.appendableStages) ? route.appendableStages : [];
        for (const stage of appendableStages) {
          const selection = stage?.selection && typeof stage.selection === "object" ? stage.selection : {};
          const selectedRouteId = String(selection.routeId || routeId || "").trim();
          const selectedStageKey = String(selection.stageKey || stage?.stageKey || stage?.stationKey || "").trim();
          if (!selectedRouteId || !selectedStageKey) {
            continue;
          }
          const sourceVerb = getNawatLinkedGrammarStageSourceVerb(stage);
          if (!sourceVerb) {
            continue;
          }
          const displaySurface = getNawatLinkedGrammarStageDisplaySurface(stage) || sourceVerb;
          choices.push({
            routeId: selectedRouteId,
            routeFamily: route?.routeFamily || "",
            stageKey: selectedStageKey,
            stationKey: stage?.stationKey || "",
            sourceVerb,
            displaySurface,
            sourceObjectPrefix: String(stage?.objectPrefix || "").trim(),
            selection: {
              routeId: selectedRouteId,
              stageKey: selectedStageKey
            }
          });
          if (choices.length >= limit) {
            return choices;
          }
        }
      }
      return choices;
    }
    function getFirstNawatLinkedGrammarAppendableSelection(summary = null) {
      return getNawatLinkedGrammarAppendableSelections(summary, {
        maxChoices: 1
      })[0] || null;
    }
    function buildNawatLinkedGrammarPathExecutionSubLabels(execution = null) {
      if (!execution || execution.outputKind !== "linked-grammar-path-chain-execution") {
        return [];
      }
      const steps = Array.isArray(execution.steps) ? execution.steps : [];
      const executedSteps = steps.filter(step => step?.status === "executed");
      const lastGenerated = executedSteps[executedSteps.length - 1]?.generated || null;
      const finalSurface = getPrimaryConjugationSurface(lastGenerated);
      return [executedSteps.length ? `Trayecto generado: ${executedSteps.length}` : "", finalSurface ? `Salida final: ${finalSurface}` : "", execution.stoppedReason ? `Alto: ${execution.stoppedReason}` : ""].filter(Boolean);
    }
    function buildNawatLinkedGrammarPromotedSourceSubLabels(promotedSource = null) {
      const framedSourceVerb = getPrimaryConjugationSurface(promotedSource);
      const hasSourceResultFrame = hasConjugationResultFrame(promotedSource);
      const sourceVerb = String(framedSourceVerb || (!hasSourceResultFrame ? promotedSource?.sourceVerb : "") || "").trim();
      if (!sourceVerb) {
        return [];
      }
      const displaySurface = getConjugationDisplaySurface(promotedSource) || (!hasSourceResultFrame ? String(promotedSource?.displaySurface || "").trim() : "");
      const sourceInput = String(promotedSource?.sourceInputDisplay || promotedSource?.sourceInput || "").trim();
      return [`Fuente: ${sourceVerb}`, displaySurface && displaySurface !== sourceVerb ? `Salida: ${displaySurface}` : "", sourceInput && sourceInput !== sourceVerb ? `Entrada previa: ${sourceInput}` : ""].filter(Boolean);
    }
    function getNawatLinkedGrammarStageRailKey(stage = null) {
      const stageKey = String(stage?.key || "").trim();
      const stationKey = String(stage?.stationKey || "").trim();
      const key = stationKey || stageKey;
      if (key === "source-mode" || key === "source-tense" || stageKey === "source-mode" || stageKey === "source-tense") {
        return "source";
      }
      if (key === "stem" || stageKey === "stem") {
        return "tronco";
      }
      if (key === "verbalizer" || key === "target-mode" || stageKey === "verbalizer" || stageKey === "target-mode") {
        return "verbalizer";
      }
      if (key === "finite-tense" || stageKey === "finite-surface") {
        return "finite";
      }
      if (key === "patientivo-branch" || key === "surface-profile") {
        return "patientivo";
      }
      return key;
    }
    function attachNawatLinkedGrammarStagesToRailStations(stations = [], linkedStages = [], {
      routeKey = "",
      sourceVerb = "",
      sourceObjectPrefix = "",
      activateStation = null,
      previewNextSource = null,
      buildSelectionSummary = null,
      appendSelection = null
    } = {}) {
      if (!Array.isArray(stations) || !stations.length || !Array.isArray(linkedStages) || !linkedStages.length) {
        return Array.isArray(stations) ? stations : [];
      }
      const stageByRailKey = new Map();
      linkedStages.forEach(stage => {
        const railKey = getNawatLinkedGrammarStageRailKey(stage);
        if (!railKey || stageByRailKey.has(railKey)) {
          return;
        }
        const nextPreview = typeof previewNextSource === "function" ? previewNextSource(stage) : null;
        const linkedLabels = buildNawatLinkedGrammarStageSubLabels(stage, {
          nextPreview
        });
        if (!linkedLabels.length) {
          return;
        }
        const selectionSummary = typeof buildSelectionSummary === "function" ? buildSelectionSummary(stage, {
          nextPreview
        }) : null;
        const selectionLabels = buildNawatLinkedGrammarSelectionSummarySubLabels(selectionSummary, {
          includeCurrentSource: false,
          includeOptionCount: false,
          maxRoutes: 1,
          maxStagesPerRoute: 1
        });
        const firstAppendableChoice = (Array.isArray(selectionSummary?.nextRoutes) ? selectionSummary.nextRoutes : []).flatMap(route => Array.isArray(route?.appendableStages) ? route.appendableStages : []).find(choice => choice?.selection?.routeId && choice?.selection?.stageKey) || null;
        stageByRailKey.set(railKey, {
          stage,
          nextPreview,
          linkedLabels,
          selectionSummary,
          selectionLabels,
          firstAppendableChoice
        });
      });
      if (!stageByRailKey.size) {
        return stations;
      }
      return stations.map(station => {
        const railKey = String(station?.key || "").trim();
        const entry = stageByRailKey.get(railKey);
        if (!entry?.stage) {
          return station;
        }
        const {
          stage,
          nextPreview,
          linkedLabels,
          selectionSummary,
          selectionLabels,
          firstAppendableChoice
        } = entry;
        const linkedLabel = linkedLabels.join(" · ");
        const selectionLabel = selectionLabels.join(" · ");
        const firstAppendableSelection = firstAppendableChoice?.selection || null;
        const firstAppendableActivation = firstAppendableSelection ? {
          routeKey: firstAppendableSelection.routeId || "",
          stationKey: firstAppendableSelection.stageKey || "",
          sourceVerb: stage.nextSource?.sourceVerb || "",
          sourceObjectPrefix: stage.nextSource?.objectPrefix || ""
        } : null;
        const canAppendSelection = Boolean(firstAppendableActivation) && typeof appendSelection === "function";
        const stageRouteKey = String(routeKey || stage.nextSource?.routeId || "").trim();
        const routeStationKey = String(stage.stationKey || stage.key || "").trim();
        const stageRouteSourceVerb = String(stage.routeContext?.sourceVerb || sourceVerb || "").trim();
        const stageRouteSourceObjectPrefix = stage.routeContext?.sourceObjectPrefix || sourceObjectPrefix || "";
        const canActivate = stageRouteKey && routeStationKey && typeof activateStation === "function";
        return {
          ...station,
          linkedGrammarPathStage: stage,
          linkedNextSource: stage.nextSource || null,
          linkedNextSourcePreview: nextPreview,
          linkedNextRouteCount: nextPreview?.candidateRouteCount || 0,
          linkedSelectionSummary: selectionSummary || null,
          linkedAppendableSelectionCount: selectionSummary?.appendableSelectionCount || 0,
          linkedAppendableSelection: firstAppendableSelection,
          linkedAppendableActivation: firstAppendableActivation,
          linkedAppendableAction: canAppendSelection ? anchorElement => appendSelection(firstAppendableSelection, {
            anchorElement,
            sourceVerb: firstAppendableActivation.sourceVerb,
            sourceObjectPrefix: firstAppendableActivation.sourceObjectPrefix,
            stage,
            selectionSummary
          }) : null,
          linkedAppendableChoiceLabel: selectionLabel,
          linkedNextSourceLabel: linkedLabel,
          sublabel: [station.sublabel, linkedLabel, selectionLabel].filter(Boolean).join(" · "),
          action: canActivate ? anchorElement => activateStation(stageRouteKey, routeStationKey, {
            render: true,
            anchorElement,
            sourceVerb: stageRouteSourceVerb,
            sourceObjectPrefix: stageRouteSourceObjectPrefix
          }) : station.action
        };
      });
    }
    function buildNuclearClauseShellSubLabels(shell = null, source = null) {
      if (!shell || shell.kind !== "nuclear-clause-shell") {
        return [];
      }
      const label = getVisibleNuclearClauseShellLabel(shell);
      const lesson4 = shell.lesson4 && typeof shell.lesson4 === "object" ? shell.lesson4 : null;
      const activeFormula = lesson4?.activeFormula && typeof lesson4.activeFormula === "object" ? lesson4.activeFormula : null;
      const formula = String(activeFormula?.formula || shell.formula || "").trim();
      const predicateLabel = activeFormula?.predicatePositionLabel && activeFormula?.predicatePositionStatusLabel ? `§4.5 ${activeFormula.predicatePositionLabel}: ${activeFormula.predicatePositionStatusLabel}` : "";
      const layers = Array.isArray(lesson4?.organizationalLayers) ? lesson4.organizationalLayers : Array.isArray(shell.organizationalLayers) ? shell.organizationalLayers : [];
      const layerLabel = layers.length ? `jerarquía ${getVisibleNuclearClauseShellLabel(shell)}: ${layers.map(layer => layer.labelEs || layer.label || layer.key || "").filter(Boolean).join(" > ")}` : "";
      const formulaEcho = formatVisibleCnvFormulaEcho(shell.formulaEcho || "", source || shell);
      const formulaEchoLabel = formulaEcho && shell.formulaType === "VNC" ? `${ANDREWS_RENDERING_TERMS.vncFormula}: ${formulaEcho}` : "";
      return [formula ? `${label}: ${formatVisibleAndrewsFormula(formula)}` : label, predicateLabel, layerLabel, formulaEchoLabel].filter(Boolean);
    }
    function appendNuclearClauseShellSubLabels(baseLabel = "", shell = null, source = null) {
      return [baseLabel, ...buildNuclearClauseShellSubLabels(shell, source)].filter(Boolean).join(" · ");
    }
    function normalizeGeneratedOutputSlotChipValue(value = "", fallback = "") {
      const normalized = String(value ?? "").trim();
      if (normalized) {
        return normalized;
      }
      return String(fallback ?? "").trim();
    }
    function buildGeneratedOutputSlotPredicateValue(predicateSlot = null) {
      const stem = normalizeGeneratedOutputSlotChipValue(predicateSlot?.displayStem || predicateSlot?.stem || predicateSlot?.formula || predicateSlot?.sourceFormula || predicateSlot?.surface || "", "");
      if (!stem) {
        return "";
      }
      return stem.includes("(") && stem.includes(")") ? stem : `(${stem})`;
    }
    function isLesson46PreteritAgentiveLocativeResult(result = null) {
      return Boolean(result && typeof result === "object" && (result.kind === "lesson-46-3-1-a-preterit-agentive-locative-nnc" || result.andrewsSection === "46.3.1.a"));
    }
    function buildGeneratedOutputVisibleCnvPredicateValue(result = null, predicateSlot = null) {
      return normalizeGeneratedOutputVisibleCnvSlotValue(result, buildGeneratedOutputSlotPredicateValue(predicateSlot));
    }
    function buildGeneratedOutputVisibleCnvConnectorValue(result = null, connectorSlot = null) {
      return normalizeGeneratedOutputVisibleCnvSlotValue(result, normalizeGeneratedOutputSlotChipValue(connectorSlot?.displayConnector || connectorSlot?.displaySurface || connectorSlot?.connector || connectorSlot?.surface || "", "Ø-Ø"));
    }
    function getGeneratedOutputVisibleSurfaceForms(result = null) {
      const forms = typeof getConjugationSurfaceForms === "function" ? getConjugationSurfaceForms(result) : [];
      if (forms.length) {
        return forms;
      }
      const path = getVisibleCnvFormulaSurfacePath(result);
      return (Array.isArray(path?.pathsBySurface) ? path.pathsBySurface : []).map(record => String(record?.surface || "").trim()).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function buildGeneratedOutputSlotSubjectValue(subjectSlot = null) {
      if (!subjectSlot || typeof subjectSlot !== "object") {
        return "";
      }
      const prefix = normalizeGeneratedOutputSlotChipValue(subjectSlot.displayPrefix || subjectSlot.prefix || "", "Ø");
      const suffix = normalizeGeneratedOutputSlotChipValue(subjectSlot.displaySuffix || subjectSlot.suffix || "", "Ø");
      return `${prefix || "Ø"}...${suffix || "Ø"}`;
    }
    function buildGeneratedOutputVncSubjectValue(subjectSlot = null) {
      if (!subjectSlot || typeof subjectSlot !== "object") {
        return "";
      }
      const prefix = normalizeGeneratedOutputSlotChipValue(subjectSlot.displayPrefix || subjectSlot.prefix || "", "Ø");
      const caseSlot = normalizeGeneratedOutputSlotChipValue(subjectSlot.displayCase || subjectSlot.case || subjectSlot.pers2 || "", "Ø");
      return `${prefix || "Ø"}-${caseSlot || "Ø"}`;
    }
    function buildGeneratedOutputVisibleCnvSubjectValue(result = null, subjectSlot = null) {
      return normalizeGeneratedOutputVisibleCnvSlotValue(result, buildGeneratedOutputVncSubjectValue(subjectSlot));
    }
    function getGeneratedOutputFormulaSlot(slots = null, canonicalKey = "") {
      if (!slots || typeof slots !== "object") {
        return null;
      }
      if (slots[canonicalKey] && typeof slots[canonicalKey] === "object") {
        return slots[canonicalKey];
      }
      return null;
    }
    const ANDREWS_RENDERING_TERMS = Object.freeze({
      vncFormula: "Fórmula CNV",
      nncFormula: "Fórmula CNN",
      pers1Pers2: "persona1-persona2",
      directional: "direccional",
      obj1: "objeto 1",
      obj2: "objeto 2",
      obj3: "objeto 3",
      reflexivo: "reflexivo",
      predicateStem: "base",
      tiempo: "tiempo",
      predicateState: "estado del predicado",
      num1Num2: "número1-número2",
      nominalization: "nominalización",
      sourceVnc: "fuente verbal",
      patientiveStage: "etapa #3 salida",
      patientiveSource: "fuente patientiva",
      patientiveProcedures: "procedimientos patientivos",
      num1Num2Connector: "conector número",
      surfaceOutput: "salida"
    });
    const GENERATED_OUTPUT_TENSE_CHIP_LABELS = Object.freeze({
      presente: "pres",
      "presente-habitual": "pres-hab",
      "presente-desiderativo": "pres-des",
      imperfecto: "impf",
      "preterito-imperfecto": "impf",
      preterito: "pret",
      "pasado-remoto": "rem",
      perfecto: "perf",
      pluscuamperfecto: "plup",
      futuro: "fut",
      condicional: "cond",
      "condicional-perfecto": "cond-perf",
      optativo: "opt"
    });
    function getGeneratedOutputCompactTenseValue(value = "") {
      const fullValue = normalizeGeneratedOutputSlotChipValue(value, "");
      if (!fullValue) {
        return "";
      }
      const key = fullValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
      return GENERATED_OUTPUT_TENSE_CHIP_LABELS[key] || fullValue;
    }
    function getGeneratedOutputShellSlots(result = null) {
      if (!result || typeof result !== "object") {
        return null;
      }
      const shell = result.nuclearClauseShell && typeof result.nuclearClauseShell === "object" ? result.nuclearClauseShell : null;
      const canonicalFormulaSlots = getGeneratedOutputCanonicalFormulaSlots(result);
      const cnvPathFormulaSlots = buildGeneratedOutputFormulaSlotsFromCnvPath(result);
      const candidates = [canonicalFormulaSlots, shell?.formulaSlots, shell?.slots, cnvPathFormulaSlots, result.nncBasic?.formulaSlots, result.clauseFrame?.formulaSlots, result.formulaSlots, result.vncValencyFrame?.nuclearClauseFormulaSlots, result.grammarFrame?.morphBoundaryFrame?.formulaSlots, result.frames?.morphBoundaryFrame?.formulaSlots];
      return candidates.find(candidate => candidate && typeof candidate === "object") || null;
    }
    function buildGeneratedOutputFormulaSlotsFromCnvPath(result = null) {
      const path = getVisibleCnvFormulaSurfacePath(result);
      const records = Array.isArray(path?.pathsBySurface) ? path.pathsBySurface : [];
      const firstRecord = records[0] || null;
      const firstPaths = Array.isArray(firstRecord?.paths) ? firstRecord.paths : [];
      if (!firstPaths.length && !Array.isArray(path?.surfaceNumberConnectorRealizations)) {
        return null;
      }
      const getPathFormulaValue = (slotKey = "") => {
        const entry = firstPaths.find(candidate => candidate?.formulaSlotKey === slotKey);
        const value = String(entry?.formulaMorph || entry?.visibleLinearMorph || entry?.surfaceValue || "").trim();
        return value === "Ø" ? "0" : value;
      };
      const pers1 = getPathFormulaValue("pers1") || "0";
      const pers2 = getPathFormulaValue("pers2") || "0";
      const base = getPathFormulaValue("base");
      const tns = getPathFormulaValue("tns") || "0";
      const connector = Array.isArray(path?.surfaceNumberConnectorRealizations) && path.surfaceNumberConnectorRealizations[0] ? normalizeVisibleCnvFormulaSurfaceZero(path.surfaceNumberConnectorRealizations[0]) : `${getPathFormulaValue("num1") || "0"}-${getPathFormulaValue("num2") || "0"}`;
      if (!base && !connector && !pers1 && !pers2) {
        return null;
      }
      return {
        pers1Pers2: {
          displayPrefix: pers1 || "0",
          prefix: pers1 === "0" ? "" : pers1,
          displayCase: pers2 || "0",
          case: pers2 === "0" ? "" : pers2,
          slot: "pers1-pers2",
          source: "cnv-formula-surface-path"
        },
        predicateStem: base ? {
          displayStem: `(${base})`,
          stem: base,
          slot: "STEM",
          source: "cnv-formula-surface-path"
        } : null,
        tensePosition: {
          label: tns || "0",
          tenseValue: tns || "0",
          slot: "tiempo",
          source: "cnv-formula-surface-path"
        },
        num1Num2: {
          displayConnector: connector || "0-0",
          connector: connector || "",
          slot: "num1-num2",
          source: "cnv-formula-surface-path"
        }
      };
    }
    function getGeneratedOutputSlotFormulaType(result = null, slots = null) {
      const canonicalFormulaRecord = getGeneratedOutputCanonicalFormulaRecord(result);
      const canonicalUnit = String(canonicalFormulaRecord?.unit || "").trim().toUpperCase();
      if (canonicalUnit === "VNC" || canonicalUnit === "CNV") {
        return "VNC";
      }
      if (canonicalUnit === "NNC" || canonicalUnit === "CNN") {
        return "NNC";
      }
      const canonicalFormula = String(canonicalFormulaRecord?.formulaText || canonicalFormulaRecord?.formula || "").trim();
      if (canonicalFormula) {
        return /\)[^#)]*\+/.test(canonicalFormula) ? "VNC" : "NNC";
      }
      const shellFormulaType = String(result?.nuclearClauseShell?.formulaType || "").trim().toUpperCase();
      if (shellFormulaType === "VNC" || shellFormulaType === "NNC") {
        return shellFormulaType;
      }
      if (slots?.obj1 || slots?.tensePosition) {
        return "VNC";
      }
      if (slots?.num1Num2 || result?.nncBasic || result?.nominalizationProfile) {
        return "NNC";
      }
      return "";
    }
    function getFormulaSurfacePairFormulaType(pair = null) {
      const targetFormulaEcho = String(pair?.targetFormulaEcho || "").trim();
      if (!targetFormulaEcho) {
        return "";
      }
      return /\)[^#)]*\+/.test(targetFormulaEcho) ? "VNC" : "NNC";
    }
    function parseGeneratedOutputVncFormulaEchoSlots(formulaEcho = "") {
      void formulaEcho;
      return null;
    }
    function mergeGeneratedOutputFormulaSlots(primarySlots = null, fallbackSlots = null) {
      if (!primarySlots || typeof primarySlots !== "object") {
        return fallbackSlots && typeof fallbackSlots === "object" ? fallbackSlots : primarySlots;
      }
      if (!fallbackSlots || typeof fallbackSlots !== "object") {
        return primarySlots;
      }
      const {
        ...fallbackRest
      } = fallbackSlots;
      const {
        ...primaryRest
      } = primarySlots;
      const merged = {
        ...fallbackRest,
        ...primaryRest,
        pers1Pers2: primarySlots.pers1Pers2 || fallbackSlots.pers1Pers2,
        obj1: primarySlots.obj1 || fallbackSlots.obj1,
        obj2: primarySlots.obj2 || fallbackSlots.obj2,
        obj3: primarySlots.obj3 || fallbackSlots.obj3,
        reflexivo: primarySlots.reflexivo || fallbackSlots.reflexivo,
        directional: primarySlots.directional || fallbackSlots.directional,
        predicateStem: primarySlots.predicateStem || fallbackSlots.predicateStem,
        tensePosition: primarySlots.tensePosition || fallbackSlots.tensePosition,
        num1Num2: primarySlots.num1Num2 || fallbackSlots.num1Num2
      };
      if (merged.obj1 || merged.obj2 || merged.obj3 || merged.reflexivo || merged.tensePosition) {
        return merged;
      }
      if (merged.num1Num2) {
        return merged;
      }
      return merged;
    }
    function buildGeneratedOutputPatientiveStageValue(stage = null) {
      if (!stage || typeof stage !== "object") {
        return "";
      }
      const outputStem = normalizeGeneratedOutputSlotChipValue(stage.outputStem || "", "");
      const outputConnector = normalizeGeneratedOutputSlotChipValue(stage.outputConnector || "", "Ø");
      const outputPrefix = normalizeGeneratedOutputSlotChipValue(stage.outputPrefix || "", "");
      if (outputStem) {
        const prefix = outputPrefix ? `${outputPrefix}-` : "";
        return `${prefix}(${outputStem})${outputConnector || "Ø"}`;
      }
      return normalizeGeneratedOutputSlotChipValue(stage.outputSurface || "", "");
    }
    function getGeneratedOutputLesson2SoundSpellingFrames(result = null) {
      if (!result || typeof result !== "object") {
        return [];
      }
      const frameContainers = [result.grammarFrame?.orthographyFrame, result.frames?.orthographyFrame, result.orthographyFrame, result.targetContract].filter(candidate => candidate && typeof candidate === "object");
      const frames = [];
      const seen = new Set();
      frameContainers.forEach(container => {
        const candidates = [...(Array.isArray(container.soundSpellingFrames) ? container.soundSpellingFrames : []), ...(container.soundSpellingFrame && typeof container.soundSpellingFrame === "object" ? [container.soundSpellingFrame] : [])];
        candidates.forEach(frame => {
          if (!frame || typeof frame !== "object") {
            return;
          }
          const key = [frame.ruleId || "", frame.andrewsSection || "", frame.grammarSlot || "", frame.sourceSurface || frame.sourceDisplay || frame.normalizedSource || "", frame.target || "", Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "", frame.sourceSegmentValue || "", frame.targetSegmentValue || ""].join("|");
          if (!key.trim() || seen.has(key)) {
            return;
          }
          seen.add(key);
          frames.push(frame);
        });
      });
      return frames;
    }
    function buildGeneratedOutputLesson2ChipValue(frame = null) {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      const source = normalizeGeneratedOutputSlotChipValue(frame.sourceSurface || frame.sourceDisplay || frame.normalizedSource || "", "");
      const hasExplicitTarget = Object.prototype.hasOwnProperty.call(frame, "target") && frame.target !== undefined && frame.target !== null;
      const candidateTarget = Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "";
      const rawTarget = hasExplicitTarget ? String(frame.target) : candidateTarget;
      const target = rawTarget ? normalizeGeneratedOutputSlotChipValue(rawTarget, "") : candidateTarget ? normalizeGeneratedOutputSlotChipValue(candidateTarget, "") : hasExplicitTarget ? "Ø" : "";
      const arrow = source && target ? `${source}→${target}` : "";
      return arrow || normalizeGeneratedOutputSlotChipValue(frame.spanishProcess || frame.andrewsProcess || "", "proceso");
    }
    function getGeneratedOutputLesson2PositionLabel(position = "") {
      const normalized = String(position || "").trim();
      const labels = {
        "after-i-object": "despues de objeto en -i",
        "after-mu": "despues de mu",
        "after-object": "despues de objeto",
        "before-al-object": "antes de al",
        "before-al-stem": "antes de al",
        "before-a-cvl-stem": "antes de aCVl",
        "before-consonant": "antes de consonante",
        "before-i-stem": "antes de tronco en i",
        "before-k": "antes de k",
        "before-kw": "antes de kw",
        "before-vowel": "antes de vocal",
        "coda": "coda",
        "consonant-contact": "contacto consonantico",
        "final": "final",
        "open-transition": "transicion abierta",
        "pers1-obj1-boundary": "limite persona1-objeto1",
        "slash-boundary": "limite de composicion",
        "stem-final-vowel": "vocal final del tronco",
        "supportive-vowel": "vocal de apoyo",
        "syllable-final": "final de silaba",
        "vowel-contact": "contacto vocalico",
        "word-final": "final de palabra"
      };
      return labels[normalized] || normalized;
    }
    function getGeneratedOutputLesson2SlotLabel(slot = "") {
      const normalized = String(slot || "").trim();
      const labels = {
        "obj1": "objeto 1",
        "obj1-stem-boundary": "limite objeto 1-tronco",
        "pers1": "persona1",
        "pers1-pers2": "persona1-persona2",
        "poseedor": "poseedor",
        "predicate-stem": "tronco predicativo",
        "reflexivo": "reflexivo",
        "stem-final": "final del tronco",
        "stem-initial": "inicio del tronco",
        "surface-segment": "segmento de superficie",
        "tronco": "tronco"
      };
      return labels[normalized] || normalized;
    }
    function buildGeneratedOutputLesson2ChipDetail(frame = null) {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      const section = normalizeGeneratedOutputSlotChipValue(frame.andrewsSection || "", "");
      const process = normalizeGeneratedOutputSlotChipValue(frame.spanishProcess || "", "") || normalizeGeneratedOutputSlotChipValue(frame.andrewsProcess || "", "");
      const position = getGeneratedOutputLesson2PositionLabel(frame.syllablePosition || "");
      const slot = getGeneratedOutputLesson2SlotLabel(frame.grammarSlot || "");
      const detailParts = [section ? `Andrews L2 ${section}` : "Andrews L2", process, position ? `posición: ${position}` : "", slot ? `casilla: ${slot}` : ""].filter(Boolean);
      return detailParts.join(" · ");
    }
    function buildGeneratedOutputSlotChips(result = null, {
      includeFormula = true
    } = {}) {
      if (!result || typeof result !== "object") {
        return [];
      }
      const chips = [];
      const seen = new Set();
      const pushChip = (kind = "", label = "", value = "", options = {}) => {
        const normalizedLabel = normalizeGeneratedOutputSlotChipValue(label, "");
        const normalizedValue = normalizeGeneratedOutputSlotChipValue(value, "");
        if (!normalizedLabel && options.allowEmptyLabel !== true || !normalizedValue) {
          return;
        }
        const key = `${kind}|${normalizedLabel}|${normalizedValue}`;
        if (seen.has(key)) {
          return;
        }
        seen.add(key);
        chips.push({
          kind: kind || "slot",
          label: normalizedLabel,
          value: normalizedValue,
          title: normalizeGeneratedOutputSlotChipValue(options.title || "", ""),
          detail: normalizeGeneratedOutputSlotChipValue(options.detail || options.title || "", ""),
          surfaceFrame: options.surfaceFrame && typeof options.surfaceFrame === "object" ? options.surfaceFrame : null,
          formulaPair: options.formulaPair && typeof options.formulaPair === "object" ? options.formulaPair : null
        });
      };
      const shell = result.nuclearClauseShell && typeof result.nuclearClauseShell === "object" ? result.nuclearClauseShell : null;
      const primarySlots = getGeneratedOutputShellSlots(result);
      const formulaSurfacePairs = getFormulaSurfacePairsForGeneratedOutput(result);
      const formulaSurfacePair = getFormulaSurfacePairForGeneratedOutput(result);
      const formulaType = getGeneratedOutputSlotFormulaType(result, primarySlots) || getFormulaSurfacePairFormulaType(formulaSurfacePair);
      const shellFormulaEcho = normalizeGeneratedOutputSlotChipValue(shell?.formulaEcho || result.nncBasic?.formulaEcho || result.clauseFrame?.formulaEcho || "", "");
      const formulaEcho = normalizeGeneratedOutputSlotChipValue(formulaType === "NNC" ? shellFormulaEcho || formulaSurfacePair?.targetFormulaEcho || "" : formulaSurfacePair?.targetFormulaEcho || shellFormulaEcho || "", "");
      const visibleFormulaEcho = formulaType === "VNC" ? formatVisibleCnvFormulaEcho(formulaEcho, result) : formulaEcho;
      const slots = mergeGeneratedOutputFormulaSlots(primarySlots, null);
      if (includeFormula && formulaEcho && formulaType === "VNC") {
        const formulaChipEntries = formulaSurfacePairs.length ? formulaSurfacePairs.map(pair => ({
          value: formatVisibleCnvFormulaSurfacePairEcho(result, pair) || pair.targetFormulaEcho,
          surface: pair.surface,
          sourceFormulaEcho: pair.sourceFormulaEcho,
          andrewsFormulaEcho: pair.andrewsFormulaEcho,
          targetFormulaEcho: pair.targetFormulaEcho,
          conjugatorFormulaEcho: pair.conjugatorFormulaEcho,
          sourceToTargetFormulaEcho: pair.sourceToTargetFormulaEcho,
          andrewsToConjugatorFormulaEcho: pair.andrewsToConjugatorFormulaEcho
        })) : buildVisibleCnvFormulaEchoChips(formulaEcho, result);
        formulaChipEntries.forEach(entry => {
          const surfaceFrame = buildVisibleCnvFormulaSurfaceFrame(result, entry);
          const routePathLabel = String(surfaceFrame?.routePathLabel || "").trim();
          const title = [`${ANDREWS_RENDERING_TERMS.vncFormula}: ${entry.value}`, entry.surface ? `salida: ${entry.surface}` : "", entry.andrewsToConjugatorFormulaEcho || entry.sourceToTargetFormulaEcho ? `formula: ${entry.andrewsToConjugatorFormulaEcho || entry.sourceToTargetFormulaEcho}` : "", routePathLabel ? `ruta: ${routePathLabel}` : ""].filter(Boolean).join(" · ");
          pushChip("formula", ANDREWS_RENDERING_TERMS.vncFormula, entry.value, {
            title,
            detail: entry.andrewsToConjugatorFormulaEcho || entry.sourceToTargetFormulaEcho || "",
            surfaceFrame,
            formulaPair: entry
          });
        });
      } else if (includeFormula && formulaEcho && formulaType) {
        const useShellFormulaChip = formulaType === "NNC" && shellFormulaEcho && shellFormulaEcho !== String(formulaSurfacePair?.targetFormulaEcho || "").trim();
        const formulaChipPairs = !useShellFormulaChip && formulaSurfacePairs.length ? formulaSurfacePairs : formulaSurfacePair ? [formulaSurfacePair] : [];
        if (!useShellFormulaChip && formulaChipPairs.length) {
          formulaChipPairs.forEach(pair => {
            pushChip("formula", ANDREWS_RENDERING_TERMS.nncFormula, pair.targetFormulaEcho, {
              title: `${pair.surface}: ${pair.sourceToTargetFormulaEcho}`,
              detail: `${pair.surface}: ${pair.andrewsFormulaEcho || pair.sourceFormulaEcho || ""} -> ${pair.conjugatorFormulaEcho || pair.targetFormulaEcho}`,
              formulaPair: pair
            });
          });
        } else {
          pushChip("formula", ANDREWS_RENDERING_TERMS.nncFormula, visibleFormulaEcho, {
            title: "",
            detail: ""
          });
        }
      }
      if (formulaType === "VNC") {
        const subjectSlot = getGeneratedOutputFormulaSlot(slots, "pers1Pers2") || result.vncValencyFrame?.pers1Pers2 || null;
        const objectSlot = getGeneratedOutputFormulaSlot(slots, "obj1") || result.vncValencyFrame?.obj1 || null;
        const object2Slot = getGeneratedOutputFormulaSlot(slots, "obj2") || result.vncValencyFrame?.obj2 || null;
        const object3Slot = getGeneratedOutputFormulaSlot(slots, "obj3") || result.vncValencyFrame?.obj3 || null;
        const reflexiveSlot = getGeneratedOutputFormulaSlot(slots, "reflexivo") || null;
        const directionalSlot = getGeneratedOutputFormulaSlot(slots, "directional") || null;
        const predicateSlot = getGeneratedOutputFormulaSlot(slots, "predicateStem") || null;
        const tenseSlot = getGeneratedOutputFormulaSlot(slots, "tensePosition") || null;
        const connectorSlot = getGeneratedOutputFormulaSlot(slots, "num1Num2") || null;
        const hasStructuredSlotAuthority = Boolean(slots || result.vncValencyFrame);
        if (hasStructuredSlotAuthority) {
          pushChip("pers1-pers2", ANDREWS_RENDERING_TERMS.pers1Pers2, buildGeneratedOutputVisibleCnvSubjectValue(result, subjectSlot));
        }
        if (hasStructuredSlotAuthority && (directionalSlot?.isPresent || directionalSlot?.prefix && directionalSlot.prefix !== "Ø")) {
          pushChip("directional", ANDREWS_RENDERING_TERMS.directional, normalizeGeneratedOutputSlotChipValue(directionalSlot?.displayPrefix || directionalSlot?.prefix || "", ""));
        }
        if (hasStructuredSlotAuthority && objectSlot) {
          pushChip("obj1", ANDREWS_RENDERING_TERMS.obj1, normalizeGeneratedOutputSlotChipValue(objectSlot?.displayPrefix || objectSlot?.prefix || "", "Ø"));
        }
        if (hasStructuredSlotAuthority) {
          pushChip("obj2", ANDREWS_RENDERING_TERMS.obj2, object2Slot?.prefix || "");
          pushChip("obj3", ANDREWS_RENDERING_TERMS.obj3, object3Slot?.prefix || "");
        }
        if (hasStructuredSlotAuthority && (result.isReflexive === true || reflexiveSlot?.isPresent || objectSlot?.prefix === "mu" || result.vncValencyFrame?.obj1?.prefix === "mu")) {
          pushChip("reflexivo", ANDREWS_RENDERING_TERMS.reflexivo, reflexiveSlot?.prefix || "mu");
        }
        if (hasStructuredSlotAuthority) {
          pushChip("STEM", ANDREWS_RENDERING_TERMS.predicateStem, buildGeneratedOutputVisibleCnvPredicateValue(result, predicateSlot));
          const tenseValue = normalizeGeneratedOutputSlotChipValue(tenseSlot?.label || tenseSlot?.tenseValue || "", "");
          pushChip("tiempo", ANDREWS_RENDERING_TERMS.tiempo, getGeneratedOutputCompactTenseValue(tenseValue), {
            title: tenseValue ? `${ANDREWS_RENDERING_TERMS.tiempo}: ${tenseValue}` : ANDREWS_RENDERING_TERMS.tiempo
          });
          pushChip("num1-num2", ANDREWS_RENDERING_TERMS.num1Num2, buildGeneratedOutputVisibleCnvConnectorValue(result, connectorSlot));
        }
        const surfaceForms = getGeneratedOutputVisibleSurfaceForms(result);
        if (formulaSurfacePairs.length) {
          const surfaceDisplay = surfaceForms.length ? surfaceForms.join(" / ") : formulaSurfacePairs.map(pair => pair.surface).filter(Boolean).join(" / ");
          const surfaceFrame = buildVisibleCnvFormulaSurfaceFrame(result, {
            surface: surfaceDisplay,
            value: visibleFormulaEcho
          });
          pushChip("surface", ANDREWS_RENDERING_TERMS.surfaceOutput, surfaceDisplay, {
            surfaceFrame
          });
        } else {
          const surfaceDisplay = surfaceForms.join(" / ");
          const surfaceFrame = buildVisibleCnvFormulaSurfaceFrame(result, {
            surface: surfaceDisplay,
            value: visibleFormulaEcho
          });
          pushChip("surface", ANDREWS_RENDERING_TERMS.surfaceOutput, surfaceDisplay, {
            surfaceFrame
          });
        }
      } else if (formulaType === "NNC") {
        const subjectSlot = getGeneratedOutputFormulaSlot(slots, "pers1Pers2") || result.nncBasic?.formulaSlots?.pers1Pers2 || null;
        const predicateSlot = getGeneratedOutputFormulaSlot(slots, "predicateStem") || result.nncBasic?.formulaSlots?.predicateStem || null;
        const connectorSlot = getGeneratedOutputFormulaSlot(slots, "num1Num2") || result.nncBasic?.formulaSlots?.num1Num2 || null;
        const predicateState = predicateSlot?.stateLabel || (isLesson46PreteritAgentiveLocativeResult(result) ? "adverbializado -0-" : "") || predicateSlot?.state || result.nncBasic?.categoryProfile?.predicateState?.label || result.nominalizationProfile?.predicateState?.value || "";
        const predicateStemLabel = isLesson46PreteritAgentiveLocativeResult(result) ? "STEM" : ANDREWS_RENDERING_TERMS.predicateStem;
        pushChip("pers1-pers2", ANDREWS_RENDERING_TERMS.pers1Pers2, buildGeneratedOutputSlotSubjectValue(subjectSlot));
        pushChip("STEM", predicateStemLabel, buildGeneratedOutputSlotPredicateValue(predicateSlot));
        pushChip("state", ANDREWS_RENDERING_TERMS.predicateState, predicateState);
        pushChip("num1-num2", ANDREWS_RENDERING_TERMS.num1Num2, normalizeGeneratedOutputSlotChipValue(connectorSlot?.displayConnector || connectorSlot?.displaySurface || connectorSlot?.connector || connectorSlot?.surface || "", "Ø"));
        const surfaceForms = getGeneratedOutputVisibleSurfaceForms(result);
        if (formulaSurfacePairs.length) {
          formulaSurfacePairs.forEach(pair => {
            pushChip("surface", ANDREWS_RENDERING_TERMS.surfaceOutput, pair.surface, {
              title: `${pair.surface}: ${pair.andrewsToConjugatorFormulaEcho || pair.sourceToTargetFormulaEcho || pair.targetFormulaEcho}`,
              detail: pair.andrewsToConjugatorFormulaEcho || pair.sourceToTargetFormulaEcho || "",
              formulaPair: pair
            });
          });
        } else {
          pushChip("surface", ANDREWS_RENDERING_TERMS.surfaceOutput, surfaceForms.join(" / "));
        }
      }
      const profile = result.nominalizationProfile && typeof result.nominalizationProfile === "object" ? result.nominalizationProfile : null;
      if (profile?.outputKind === "verb-derived-nominal") {
        const role = profile.role || {};
        const source = profile.source || {};
        const nominalKind = role.nominalizationKind || profile.nominalKind || "";
        pushChip("nominalization", ANDREWS_RENDERING_TERMS.nominalization, nominalKind);
        const sourceTense = normalizeGeneratedOutputSlotChipValue(source.sourceTense || "", "");
        pushChip("source", ANDREWS_RENDERING_TERMS.sourceVnc, getGeneratedOutputCompactTenseValue(sourceTense), {
          title: sourceTense ? `${ANDREWS_RENDERING_TERMS.sourceVnc}: ${sourceTense}` : ""
        });
        const patientiveStage = profile.patientiveSourceStageFrame || profile.patientiveFamilyProfile?.sourceStageFrame || result.patientiveSourceStageFrame || null;
        const patientiveStageValue = buildGeneratedOutputPatientiveStageValue(patientiveStage);
        if (patientiveStageValue) {
          pushChip("patientive", ANDREWS_RENDERING_TERMS.patientiveStage, patientiveStageValue);
        }
        pushChip("patientive", ANDREWS_RENDERING_TERMS.patientiveSource, patientiveStage?.sourceType || role.patientiveFamily || profile.patientiveFamilyProfile?.label || "");
        const multipleContract = profile.patientiveMultipleDerivationContract || result.patientiveMultipleDerivationContract || null;
        if (multipleContract?.hasMultipleAvailableProcedures === true) {
          pushChip("patientive", ANDREWS_RENDERING_TERMS.patientiveProcedures, Array.isArray(multipleContract.availableSourceFamilies) ? multipleContract.availableSourceFamilies.join("/") : String(multipleContract.availableProcedureCount || ""));
        }
      }
      const connector = result.num1Num2 && typeof result.num1Num2 === "object" ? result.num1Num2 : profile?.num1Num2;
      if (connector) {
        pushChip("connector", ANDREWS_RENDERING_TERMS.num1Num2Connector, normalizeGeneratedOutputSlotChipValue(connector.displaySurface || connector.displayConnector || connector.surface || "", "Ø"));
      }
      getGeneratedOutputLesson2SoundSpellingFrames(result).forEach(frame => {
        pushChip("lesson2", "", buildGeneratedOutputLesson2ChipValue(frame), {
          allowEmptyLabel: true,
          title: buildGeneratedOutputLesson2ChipDetail(frame)
        });
      });
      return chips;
    }
    function buildGeneratedOutputCompactSubLabel(text = "", result = null) {
      const parts = String(text || "").split(/\s*·\s*/g).map(part => part.trim()).filter(Boolean);
      if (!parts.length) {
        const formulaType = String(result?.nuclearClauseShell?.formulaType || "").trim();
        return formulaType ? `cláusula nuclear ${formulaType}` : "";
      }
      const saturatedPrefixes = ["clausula nuclear VNC:", "clausula nuclear NNC:", "cláusula nuclear VNC:", "cláusula nuclear NNC:", "cláusula nuclear CNV:", "cláusula nuclear CNN:", "cláusula verbal:", "cláusula nominal:", "Formula VNC:", "Formula NNC:", "Formula CNV:", "Formula CNN:", "Fórmula VNC:", "Fórmula NNC:", "Fórmula CNV:", "Fórmula CNN:", "pers1-pers2:", "obj1:", "obj2:", "obj3:", "reflexivo:", "STEM:", "tiempo:", "sujeto:", "objeto:", "objeto 2:", "objeto 3:", "objeto reflexivo:", "predicado:", "estado del predicado:", "nominalización:", "nominalizacion:", "fuente VNC:", "fuente patientiva:", "procedimientos patientivos:", "conector sujeto:", "Clausula VNC:", "Clausula NNC:", "Clausula CNV:", "Clausula CNN:", "Formula VNC:", "Formula NNC:", "Formula CNV:", "Formula CNN:", "Fórmula VNC:", "Fórmula NNC:", "Fórmula CNV:", "Fórmula CNN:", "Valencia VNC:", "Objeto VNC:", "valencia verbal:", "objeto verbal:", "Estado de contrato:", "Ruta de contrato:", "Generación de contrato:", "Evidencia:", "Andrews:", "realización Nawat:", "Realización Nawat:", "Realizacion Nawat:", "ámbito:", "Ámbito:", "Ambito:", "Nominalización:", "Nominalizacion:", "Rol nominal:", "Fuente VNC:", "Fuente CNV:", "Familia patientiva:", "Fuente patientiva:", "Familias Andrews:", "Etapa salida:", "taxonomía patientiva:", "Taxonomía patientiva:", "Taxonomia patientiva:", "función adjetival:", "Función adjetival:", "Funcion adjetival:", "modificación:", "Modificación:", "Modificacion:", "Conector sujeto:", "Conector num1-num2:", "Conector:", "Estado del predicado:", "Animacidad:", "Referencia:", "marcación posesiva:", "Marcación posesiva:", "Marcacion posesiva:", "Proceso L2", "clase "];
      const compactParts = parts.filter(part => !saturatedPrefixes.some(prefix => part.startsWith(prefix))).slice(0, 2);
      const diagnosticPart = parts.find(part => part.startsWith("Diagnóstico de contrato:") || part.startsWith("Falla de contrato:") || part.startsWith("Sin salida") || part.startsWith("Ruta bloqueada"));
      if (diagnosticPart && !compactParts.includes(diagnosticPart)) {
        compactParts.push(diagnosticPart);
      }
      if (compactParts.length) {
        return compactParts.join(" · ");
      }
      const formulaType = String(result?.nuclearClauseShell?.formulaType || "").trim();
      return formulaType ? `cláusula nuclear ${formulaType}` : parts[0];
    }
    function renderGeneratedOutputSlotChips(container = null, result = null, options = {}) {
      if (!container || typeof targetObject.document === "undefined" || typeof container.appendChild !== "function") {
        return null;
      }
      const chips = buildGeneratedOutputSlotChips(result, options);
      if (!chips.length) {
        return null;
      }
      const fullSubLabel = String(container.textContent || "").trim();
      container.dataset.outputSlotChips = "true";
      if (fullSubLabel) {
        container.dataset.fullSubLabel = fullSubLabel;
        container.setAttribute("aria-label", fullSubLabel);
        container.replaceChildren();
        const compactText = buildGeneratedOutputCompactSubLabel(fullSubLabel, result);
        if (compactText) {
          const compact = targetObject.document.createElement("span");
          compact.className = "person-sub__compact-text";
          compact.textContent = compactText;
          compact.title = fullSubLabel;
          container.appendChild(compact);
        }
      }
      const strip = targetObject.document.createElement("div");
      strip.className = "person-sub__slot-strip";
      strip.dataset.slotChipCount = String(chips.length);
      chips.forEach(chip => {
        const chipEl = targetObject.document.createElement("span");
        chipEl.className = `person-sub__slot-chip person-sub__slot-chip--${chip.kind}`;
        const surfaceFrame = chip.surfaceFrame && typeof chip.surfaceFrame === "object" ? chip.surfaceFrame : null;
        if (surfaceFrame) {
          chipEl.dataset.surfaceFrameKind = surfaceFrame.kind || "";
          chipEl.dataset.surfacePathModel = surfaceFrame.pathModel || "";
          chipEl.dataset.surfacePriority = surfaceFrame.sourcePriority || "";
          chipEl.dataset.surfaceForms = Array.isArray(surfaceFrame.surfaceForms) ? surfaceFrame.surfaceForms.join("|") : "";
          chipEl.dataset.andrewsRouteRecordId = surfaceFrame.routeRecordId || "";
          chipEl.dataset.andrewsRouteObstacleGates = Array.isArray(surfaceFrame.routeObstacleGateIds) ? surfaceFrame.routeObstacleGateIds.join("|") : "";
          chipEl.dataset.andrewsRouteObstacleGateCount = String(surfaceFrame.routeObstacleGateCount || 0);
          chipEl.dataset.surfaceRoutePathLabel = surfaceFrame.routePathLabel || "";
          applyAndrewsStationLineDatasetToSurfaceElement(chipEl, surfaceFrame.stationLineFrame);
          applyAndrewsRouteConditionDatasetToSurfaceElement(chipEl, surfaceFrame.routeConditionFrame);
          applyAndrewsSourceLayerDatasetToSurfaceElement(chipEl, surfaceFrame.sourceLayerFrame);
          applyAndrewsRideDatasetToSurfaceElement(chipEl, surfaceFrame.rideFrame);
        }
        const formulaPair = chip.formulaPair && typeof chip.formulaPair === "object" ? chip.formulaPair : null;
        if (formulaPair) {
          chipEl.dataset.formulaSurface = String(formulaPair.surface || chip.value || "").trim();
          chipEl.dataset.sourceFormulaEcho = String(formulaPair.sourceFormulaEcho || "").trim();
          chipEl.dataset.andrewsFormulaEcho = String(formulaPair.andrewsFormulaEcho || formulaPair.sourceFormulaEcho || "").trim();
          chipEl.dataset.targetFormulaEcho = String(formulaPair.targetFormulaEcho || "").trim();
          chipEl.dataset.conjugatorFormulaEcho = String(formulaPair.conjugatorFormulaEcho || formulaPair.targetFormulaEcho || "").trim();
          chipEl.dataset.sourceToTargetFormulaEcho = String(formulaPair.sourceToTargetFormulaEcho || "").trim();
          chipEl.dataset.andrewsToConjugatorFormulaEcho = String(formulaPair.andrewsToConjugatorFormulaEcho || formulaPair.sourceToTargetFormulaEcho || "").trim();
        }
        if (chip.title) {
          chipEl.title = chip.title;
          chipEl.setAttribute("aria-label", chip.title);
          chipEl.dataset.detail = chip.title;
          chipEl.tabIndex = 0;
        }
        const value = targetObject.document.createElement("span");
        value.className = "person-sub__slot-chip-value";
        value.textContent = chip.label ? ` ${chip.value}` : chip.value;
        if (chip.label) {
          const label = targetObject.document.createElement("span");
          label.className = "person-sub__slot-chip-label";
          label.textContent = `${chip.label}: `;
          chipEl.append(label);
        }
        chipEl.append(value);
        if (chip.kind === "surface" && chip.detail) {
          const route = targetObject.document.createElement("span");
          route.className = "person-sub__slot-chip-detail";
          route.textContent = chip.detail;
          chipEl.append(route);
        }
        strip.appendChild(chipEl);
      });
      container.appendChild(strip);
      return strip;
    }
    function getGrammarFrameForRendering(frameLike = null) {
      if (!frameLike || typeof frameLike !== "object") {
        return null;
      }
      const candidates = [frameLike.grammarFrame, frameLike.frames, frameLike];
      return candidates.find(candidate => candidate && typeof candidate === "object" && (candidate.authorityFrame || candidate.routeContract || candidate.resultFrame || candidate.diagnosticFrame)) || null;
    }
    function inferGrammarFrameDiagnosticLayerForRendering(frame = null) {
      if (!frame || typeof frame !== "object") {
        return {
          failedLayer: "",
          contractLayer: ""
        };
      }
      const authorityFrame = frame.authorityFrame || {};
      const routeContract = frame.routeContract || {};
      const resultFrame = frame.resultFrame || {};
      if (authorityFrame.supported === false) {
        return {
          failedLayer: "authority",
          contractLayer: "authorityFrame"
        };
      }
      if (routeContract.generationAllowed === false) {
        return {
          failedLayer: "route",
          contractLayer: "routeContract"
        };
      }
      if (resultFrame.ok === false) {
        return {
          failedLayer: "output",
          contractLayer: "resultFrame"
        };
      }
      return {
        failedLayer: "",
        contractLayer: ""
      };
    }
    function buildGrammarFrameRouteAuditModelForRendering(frame = null) {
      if (!frame || typeof frame !== "object") {
        return null;
      }
      const authorityFrame = frame.authorityFrame || {};
      const routeContract = frame.routeContract || {};
      const orthographyFrame = frame.orthographyFrame || {};
      const diagnosticFrame = frame.diagnosticFrame || {};
      const resultFrame = frame.resultFrame || {};
      const primaryDiagnostic = (Array.isArray(diagnosticFrame.diagnostics) ? diagnosticFrame.diagnostics : []).find(entry => entry && typeof entry === "object" && String(entry.id || entry.code || "").trim()) || {};
      const sourceContext = authorityFrame.sourceContext && typeof authorityFrame.sourceContext === "object" ? authorityFrame.sourceContext : authorityFrame.sourceEvidence && typeof authorityFrame.sourceEvidence === "object" ? authorityFrame.sourceEvidence : {};
      const sourceEvidence = authorityFrame.sourceEvidence && typeof authorityFrame.sourceEvidence === "object" ? authorityFrame.sourceEvidence : sourceContext;
      const spellingAuthority = String(orthographyFrame.spellingAuthority || authorityFrame.spellingAuthority || "Nawat/Pipil orthography bridge").trim();
      const sourceFrame = {
        kind: "andrews-tense-block-output-row-audit-source-frame",
        version: 1,
        authorityFrame: {
          grammarAuthority: String(authorityFrame.grammarAuthority || "Andrews").trim(),
          sourceContextTargetAuthority: String(sourceContext.targetAuthority || "").trim(),
          sourceEvidenceTargetAuthority: String(sourceEvidence.targetAuthority || "").trim()
        },
        routeContract: {
          routeFamily: String(routeContract.routeFamily || "").trim(),
          routeStage: String(routeContract.routeStage || "").trim(),
          generationAllowed: routeContract.generationAllowed === true
        },
        orthographyFrame: {
          spellingEvidenceRole: "orthography-realization-only",
          classicalSpellingRole: "structural-only",
          orthographyBoundary: "nawat-pipil-realization",
          spellingAuthority,
          classicalSurfaceImport: orthographyFrame.noClassicalSurfaceImport === false ? "allowed" : "blocked"
        },
        diagnosticFrame: {
          diagnosticId: String(primaryDiagnostic.id || primaryDiagnostic.code || "").trim()
        },
        resultFrame: {
          ok: resultFrame.ok === true
        }
      };
      const targetFrame = {
        kind: "andrews-tense-block-output-row-audit-target-frame",
        version: 1,
        grammarRouteFamily: sourceFrame.routeContract.routeFamily,
        grammarRouteStage: sourceFrame.routeContract.routeStage,
        grammarGenerationAllowed: String(sourceFrame.routeContract.generationAllowed === true),
        grammarDiagnosticId: sourceFrame.diagnosticFrame.diagnosticId,
        grammarLogicAuthority: sourceFrame.authorityFrame.grammarAuthority,
        grammarSpellingEvidenceRole: sourceFrame.orthographyFrame.spellingEvidenceRole,
        grammarClassicalSpellingRole: sourceFrame.orthographyFrame.classicalSpellingRole,
        grammarOrthographyBoundary: sourceFrame.orthographyFrame.orthographyBoundary,
        grammarSpellingAuthority: sourceFrame.orthographyFrame.spellingAuthority,
        grammarClassicalSurfaceImport: sourceFrame.orthographyFrame.classicalSurfaceImport,
        grammarResultOk: String(sourceFrame.resultFrame.ok === true),
        grammarSourceContextTargetAuthority: sourceFrame.authorityFrame.sourceContextTargetAuthority,
        grammarSourceEvidenceTargetAuthority: sourceFrame.authorityFrame.sourceEvidenceTargetAuthority
      };
      return {
        kind: "andrews-tense-block-output-row-audit-model",
        version: 1,
        sourceFrame,
        operationFrame: {
          kind: "andrews-tense-block-output-row-audit-operation-frame",
          version: 1,
          status: "authorized",
          operation: "audit-output-row-from-grammar-frame",
          sourceFrame,
          targetFrame
        },
        targetFrame
      };
    }
    function applyGrammarFrameRouteDataset(element = null, frameLike = null) {
      if (!element?.dataset) {
        return null;
      }
      const frame = getGrammarFrameForRendering(frameLike);
      if (!frame) {
        applyAndrewsCnvCnnRouteActionDataset(element, frameLike);
        applyAndrewsCnvCnnNominalRenderingDataset(element, frameLike);
        return null;
      }
      const auditModel = buildGrammarFrameRouteAuditModelForRendering(frame);
      if (auditModel) {
        Object.defineProperty(element, "andrewsTenseBlockOutputRowAuditModel", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: auditModel
        });
      }
      const authorityFrame = frame.authorityFrame || {};
      const unitFrame = frame.unitFrame || {};
      const orthographyFrame = frame.orthographyFrame || {};
      const routeContract = frame.routeContract || {};
      const resultFrame = frame.resultFrame || {};
      const diagnosticFrame = frame.diagnosticFrame || {};
      const primaryDiagnostic = (Array.isArray(diagnosticFrame.diagnostics) ? diagnosticFrame.diagnostics : []).find(entry => entry && typeof entry === "object" && (String(entry.id || entry.code || "").trim() || String(entry.failedLayer || entry.contractLayer || "").trim())) || {};
      const inferredLayer = inferGrammarFrameDiagnosticLayerForRendering(frame);
      const sourceContext = authorityFrame.sourceContext && typeof authorityFrame.sourceContext === "object" ? authorityFrame.sourceContext : authorityFrame.sourceEvidence && typeof authorityFrame.sourceEvidence === "object" ? authorityFrame.sourceEvidence : {};
      const sourceEvidence = authorityFrame.sourceEvidence && typeof authorityFrame.sourceEvidence === "object" ? authorityFrame.sourceEvidence : sourceContext;
      const sourceContextBoundaries = sourceContext.boundaries && typeof sourceContext.boundaries === "object" ? sourceContext.boundaries : {};
      const authorityRefs = Array.isArray(authorityFrame.andrewsRefs) ? authorityFrame.andrewsRefs.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      const orthographyRefs = Array.isArray(authorityFrame.orthographyRefs) ? authorityFrame.orthographyRefs.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      const sourceEvidenceBoundaries = sourceEvidence.boundaries && typeof sourceEvidence.boundaries === "object" ? sourceEvidence.boundaries : {};
      const sourceContextFlags = Object.keys(sourceContextBoundaries).filter(key => sourceContextBoundaries[key] === true).sort();
      const sourceEvidenceFlags = Object.keys(sourceEvidenceBoundaries).filter(key => sourceEvidenceBoundaries[key] === true).sort();
      const formulaSurfacePair = getFormulaSurfacePairForGeneratedOutput(frameLike);
      element.dataset.grammarAuthorityRef = authorityRefs[0] || "";
      element.dataset.grammarAuthorityRefs = authorityRefs.join("|");
      element.dataset.grammarLogicAuthority = String(authorityFrame.grammarAuthority || "Andrews").trim();
      element.dataset.grammarEvidenceStatus = String(authorityFrame.evidenceStatus || "").trim();
      element.dataset.grammarSpellingEvidenceRole = "orthography-realization-only";
      element.dataset.grammarClassicalSpellingRole = "structural-only";
      element.dataset.grammarOrthographyRef = orthographyRefs[0] || "";
      element.dataset.grammarOrthographyRefs = orthographyRefs.join("|");
      element.dataset.grammarOrthographyBoundary = "nawat-pipil-realization";
      element.dataset.grammarOrthographyStatus = String(orthographyFrame.orthographyStatus || "").trim();
      element.dataset.grammarSpellingAuthority = String(orthographyFrame.spellingAuthority || authorityFrame.spellingAuthority || "Nawat/Pipil orthography bridge").trim();
      element.dataset.grammarClassicalSurfaceImport = orthographyFrame.noClassicalSurfaceImport === false ? "allowed" : "blocked";
      element.dataset.grammarSourceContextKind = String(sourceContext.kind || sourceContext.sourceKind || sourceContext.type || "").trim();
      element.dataset.grammarSourceContextStatus = String(sourceContext.status || sourceContext.sourceContextStatus || sourceContext.evidenceStatus || sourceContext.validationStatus || "").trim();
      element.dataset.grammarSourceContextTargetAuthority = String(sourceContext.targetAuthority || "").trim();
      element.dataset.grammarSourceContextSource = String(sourceContext.contextSource || sourceContext.evidenceSource || "").trim();
      element.dataset.grammarSourceContextFlags = sourceContextFlags.join("|");
      element.dataset.grammarSourceEvidenceKind = String(sourceEvidence.kind || sourceEvidence.sourceKind || sourceEvidence.type || "").trim();
      element.dataset.grammarSourceEvidenceStatus = String(sourceEvidence.status || sourceEvidence.evidenceStatus || sourceEvidence.validationStatus || "").trim();
      element.dataset.grammarSourceEvidenceTargetAuthority = String(sourceEvidence.targetAuthority || "").trim();
      element.dataset.grammarSourceEvidenceSource = String(sourceEvidence.evidenceSource || sourceEvidence.contextSource || "").trim();
      element.dataset.grammarSourceEvidenceFlags = sourceEvidenceFlags.join("|");
      element.dataset.grammarUnitKind = String(unitFrame.unitKind || "").trim();
      element.dataset.grammarRouteFamily = String(routeContract.routeFamily || "").trim();
      element.dataset.grammarRouteStage = String(routeContract.routeStage || "").trim();
      element.dataset.grammarGenerationAllowed = String(routeContract.generationAllowed === true);
      element.dataset.grammarDiagnosticStatus = String(diagnosticFrame.status || "").trim();
      element.dataset.grammarDiagnosticId = String(primaryDiagnostic.id || primaryDiagnostic.code || "").trim();
      element.dataset.grammarDiagnosticLayer = String(primaryDiagnostic.failedLayer || inferredLayer.failedLayer || "").trim();
      element.dataset.grammarDiagnosticContractLayer = String(primaryDiagnostic.contractLayer || inferredLayer.contractLayer || "").trim();
      element.dataset.grammarResultOk = String(resultFrame.ok === true);
      if (formulaSurfacePair) {
        element.dataset.sourceFormulaEcho = formulaSurfacePair.sourceFormulaEcho;
        element.dataset.andrewsFormulaEcho = formulaSurfacePair.andrewsFormulaEcho;
        element.dataset.targetFormulaEcho = formulaSurfacePair.targetFormulaEcho;
        element.dataset.conjugatorFormulaEcho = formulaSurfacePair.conjugatorFormulaEcho;
        element.dataset.sourceToTargetFormulaEcho = formulaSurfacePair.sourceToTargetFormulaEcho;
        element.dataset.andrewsToConjugatorFormulaEcho = formulaSurfacePair.andrewsToConjugatorFormulaEcho;
        element.dataset.formulaSurfacePairs = getFormulaSurfacePairsForGeneratedOutput(frameLike).map(entry => `${entry.surface}=>${entry.andrewsFormulaEcho || entry.sourceFormulaEcho || ""}=>${entry.conjugatorFormulaEcho || entry.targetFormulaEcho}`).join("|");
      }
      applyAndrewsCnvCnnRouteActionDataset(element, frameLike);
      applyAndrewsCnvCnnNominalRenderingDataset(element, frameLike);
      return frame;
    }
    function attachUiRouteControlGrammarContract(record = null, {
      outputKind = "ui-route-control",
      routeFamily = "ui-route-control",
      routeStage = "preview-control",
      unitKind = "ui-route-control",
      sourceInput = "",
      targetInput = "",
      targetSurface = "",
      andrewsRefs = [],
      orthographyRefs = [],
      generationAllowed = true,
      supported = true,
      evidenceStatus = "route-control",
      diagnosticStatus = "route-control",
      sourceContract = null,
      targetContract = null,
      orthographyFrame = null,
      morphBoundaryFrame = null,
      stemFrame = null,
      nuclearClauseFrame = null,
      participantFrame = null,
      inflectionFrame = null,
      diagnostics = []
    } = {}) {
      if (!record || typeof record !== "object" || typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      const surface = String(targetSurface || "").trim();
      const forms = surface ? [surface] : [];
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        metadataKind: outputKind,
        unitKind,
        routeFamily,
        routeStage,
        generationAllowed,
        supported,
        andrewsRefs,
        orthographyRefs,
        evidenceStatus,
        diagnosticStatus,
        sourceInput,
        surface,
        surfaceForms: forms,
        diagnostics,
        sourceContract,
        targetContract,
        orthographyFrame: orthographyFrame || {
          surface,
          surfaceForms: forms,
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true,
          targetInput
        },
        morphBoundaryFrame,
        stemFrame,
        nuclearClauseFrame,
        participantFrame,
        inflectionFrame
      });
    }
    function getPatientivoRouteControlAndrewsRefs(patientivoSource = "") {
      const source = String(patientivoSource || "").trim();
      if (source === "passive") {
        return ["Andrews Lesson 37"];
      }
      if (source === "impersonal" || source === "nonactive") {
        return ["Andrews Lesson 38"];
      }
      if (source === "perfectivo" || source === "imperfectivo") {
        return ["Andrews Lesson 39"];
      }
      if (source === "tronco-verbal") {
        return ["Andrews Lesson 39"];
      }
      return ["Andrews Lessons 38-39"];
    }
    function getGrammarFrameDiagnosticLabelForRendering(diagnostic = null) {
      if (!diagnostic) {
        return "";
      }
      if (typeof targetObject.getConjugationDiagnosticDisplayLabel === "function") {
        return targetObject.getConjugationDiagnosticDisplayLabel(diagnostic);
      }
      if (typeof diagnostic === "string") {
        return diagnostic;
      }
      return String(diagnostic.message || diagnostic.id || diagnostic.code || "").trim();
    }
    const VISIBLE_LCM_EXACT_LABELS = Object.freeze({
      "andrews-authoritative-nawat-data-backed": "Andrews autoritativo; puente ortográfico nawat",
      "andrews-authoritative-matrix-orthography-bridge": "Andrews autoritativo; puente ortográfico matriz",
      "andrews-authoritative-nawat-orthography": "Andrews autoritativo con ortografía nawat",
      "andrews-orthography-adapted": "ortografía Andrews adaptada",
      "composition-ast": "composición de árbol",
      "context-required": "requiere contexto",
      "diagnostic-only": "solo diagnóstico",
      "direct-pdf": "PDF directo",
      "direct-pdf-diagnostic": "diagnóstico de PDF directo",
      "direct-pdf-partial": "PDF directo parcial",
      "metadata-supported": "metadatos respaldados",
      "nawat-data-backed": "puente ortográfico nawat",
      "not-particle-syntax": "no es sintaxis de partícula",
      "route-control": "control de ruta",
      "source-evidence-satisfied": "contexto fuente satisfecho",
      "visible-diagnostic": "diagnóstico visible"
    });
    const VISIBLE_LCM_ROUTE_LABELS = Object.freeze({
      "adjectival-modification": "modificación adjetival",
      "adjectival-nnc": "cláusula nominal adjetival",
      "adverbial-adjunction": "adjunción adverbial",
      "adverbial-nuclear": "nuclear adverbial",
      "agreement-valence": "concordancia de valencia",
      "adjective-active-valency-gate": "control de valencia activa adjetival",
      "audit-lesson-23": "auditar lección 23",
      "audit-lesson-27": "auditar lección 27",
      "audit-lesson-42": "auditar lección 42",
      "audit-lesson-43": "auditar lección 43",
      "audit-lesson-44": "auditar lección 44",
      "audit-lesson-49": "auditar lección 49",
      "audit-lesson-50": "auditar lección 50",
      "audit-lesson-51": "auditar lección 51",
      "audit-lesson-52": "auditar lección 52",
      "audit-lesson-53": "auditar lección 53",
      "build-context": "construir contexto",
      "calendar-name": "nombre calendárico",
      "classify-boundary": "clasificar límite",
      "classify-candidate": "clasificar candidato",
      "classify-concept-entry": "clasificar entrada de concepto",
      "classify-false-positive": "clasificar falso positivo",
      "classify-glossary": "clasificar glosario",
      "classify-registry": "clasificar registro",
      "classify-route": "clasificar ruta",
      "classify-shell": "clasificar esqueleto",
      "classify-token": "clasificar token",
      "comparison": "comparación",
      "complement-clause": "cláusula complemento",
      "concept-registry": "registro de conceptos",
      "conjunction-clause": "cláusula conjuntiva",
      "derivation-continuation": "continuación derivacional",
      "describe-existing-output": "describir salida existente",
      "denominal-vi-ti-preterit": "denominal intransitiva -ti pretérito",
      "execute": "ejecutar",
      "finite-tense-preview": "vista previa de tiempo finito",
      "forward-derivation": "derivación directa",
      "forward-derivation-gate": "control de derivación directa",
      "forward-stem-context-gate": "control de contexto de tronco directo",
      "frequentative": "frecuentativo",
      "inventory-preview": "vista previa de inventario",
      "morphology-application": "aplicación morfológica",
      "no-stem-mask": "máscara sin tronco",
      "nuclear-clause-shell": "esqueleto de cláusula nuclear",
      "object-slot-gate": "control de casilla de objeto",
      "ordinary-nnc": "cláusula nominal ordinaria",
      "parse-input": "analizar entrada",
      "parse-stem": "analizar tronco",
      "patientivo-possessive-suffix": "sufijo posesivo patientivo",
      "particle-placement": "colocación de partícula",
      "preview-control": "control de vista previa",
      "raw-input-final-vowel-gate": "control de vocal final en entrada cruda",
      "raw-input-stem-syllable-gate": "control de sílaba de tronco en entrada cruda",
      "render-glossary": "mostrar glosario",
      "render-mode": "modo visual",
      "subject-gate": "control de sujeto",
      "target-mode-preview": "vista previa de modo destino",
      "textual-analysis": "análisis textual",
      "ui-route-control": "control de ruta de interfaz",
      "validate": "validar",
      "vi-awi": "intransitiva -awi",
      "vi-iwi": "intransitiva -iwi",
      "vi-ti": "intransitiva -ti",
      "vnc": "cláusula verbal",
      "vt-na": "transitiva -na"
    });
    const VISIBLE_LCM_LAYER_LABELS = Object.freeze({
      agreement: "concordancia",
      authority: "autoridad",
      authorityFrame: "marco de autoridad",
      diagnosticFrame: "marco diagnóstico",
      orthography: "ortografía",
      orthographyFrame: "marco ortográfico",
      output: "salida",
      participantFrame: "marco de participantes",
      result: "resultado",
      resultFrame: "marco de resultado",
      route: "ruta",
      routeContract: "contrato de ruta",
      stem: "tronco",
      stemFrame: "marco de tronco",
      unitFrame: "marco de unidad"
    });
    const VISIBLE_LCM_DIAGNOSTIC_LABELS = Object.freeze({
      "comparison-source-gated": "comparación necesita evidencia de cláusula nawat",
      "particle-candidate-empty": "candidata de partícula vacía",
      "particle-candidate-unconfirmed": "candidata de partícula no confirmada",
      "particle-seed-inventory-entry": "entrada de inventario de partícula"
    });
    const VISIBLE_LCM_TOKEN_LABELS = Object.freeze({
      active: "activo",
      adjectival: "adjetival",
      adjective: "adjetivo",
      adverbial: "adverbial",
      agreement: "concordancia",
      allowed: "autorizada",
      analysis: "análisis",
      andrews: "Andrews",
      ast: "árbol",
      audit: "auditar",
      authority: "autoridad",
      backed: "respaldado",
      boundary: "límite",
      builder: "constructor",
      calendar: "calendario",
      candidate: "candidato",
      class: "clase",
      classification: "clasificación",
      classify: "clasificar",
      clause: "cláusula",
      comparison: "comparación",
      complement: "complemento",
      compound: "compuesto",
      concept: "concepto",
      conjunction: "conjunción",
      context: "contexto",
      contract: "contrato",
      control: "control",
      conversion: "conversión",
      data: "datos",
      denominal: "denominal",
      derivation: "derivación",
      derived: "derivado",
      describe: "describir",
      diagnostic: "diagnóstico",
      display: "visual",
      empty: "vacía",
      entry: "entrada",
      evidence: "evidencia",
      execute: "ejecutar",
      existing: "existente",
      false: "falso",
      family: "familia",
      finite: "finito",
      final: "final",
      form: "forma",
      forward: "directa",
      frame: "marco",
      frequentative: "frecuentativo",
      generation: "generación",
      gate: "control",
      glossary: "glosario",
      grammar: "gramática",
      honorific: "honorífico",
      input: "entrada",
      kind: "tipo",
      layer: "capa",
      lesson: "lección",
      matrix: "matriz",
      metadata: "metadatos",
      model: "modelo",
      mode: "modo",
      modification: "modificación",
      morphology: "morfología",
      nawat: "nawat",
      needs: "necesita",
      nominal: "nominal",
      nominalization: "nominalización",
      nuclear: "nuclear",
      object: "objeto",
      only: "solo",
      ordinary: "ordinaria",
      orthography: "ortografía",
      output: "salida",
      partial: "parcial",
      participant: "participante",
      particle: "partícula",
      patientive: "patientivo",
      pending: "pendiente",
      pejorative: "peyorativo",
      positive: "positivo",
      possessive: "posesivo",
      preterit: "pretérito",
      preview: "vista previa",
      provenance: "procedencia",
      purposive: "final",
      realization: "realización",
      registry: "registro",
      relational: "relacional",
      required: "requerida",
      render: "mostrar",
      result: "resultado",
      route: "ruta",
      raw: "cruda",
      satisfied: "satisfecha",
      shell: "esqueleto",
      source: "fuente",
      spelling: "ortografía",
      stage: "etapa",
      state: "estado",
      stem: "tronco",
      subject: "sujeto",
      suffix: "sufijo",
      supported: "respaldado",
      surface: "superficie",
      syllable: "sílaba",
      syntax: "sintaxis",
      target: "destino",
      tense: "tiempo",
      textual: "textual",
      token: "token",
      unit: "unidad",
      unsupported: "no respaldado",
      validation: "validación",
      valence: "valencia",
      valency: "valencia",
      verb: "verbo",
      visible: "visible",
      vowel: "vocal",
      word: "palabra"
    });
    function getVisibleLcmExactLabel(value = "", exactLabels = {}) {
      const raw = String(value || "").trim();
      if (!raw) {
        return "";
      }
      return exactLabels[raw] || exactLabels[raw.toLowerCase()] || "";
    }
    function formatVisibleLcmTokenSequence(value = "", exactLabels = {}) {
      const raw = String(value || "").trim();
      if (!raw) {
        return "";
      }
      const exact = getVisibleLcmExactLabel(raw, exactLabels) || getVisibleLcmExactLabel(raw, VISIBLE_LCM_EXACT_LABELS);
      if (exact) {
        return exact;
      }
      return raw.replace(/([a-záéíóúñ])([A-Z])/g, "$1-$2").split(/[-_\s]+/g).map(token => {
        if (!token) {
          return "";
        }
        if (/^[A-Z]{2,}$/.test(token)) {
          return token;
        }
        const lower = token.toLowerCase();
        return VISIBLE_LCM_TOKEN_LABELS[lower] || token;
      }).filter(Boolean).join(" ");
    }
    function formatVisibleLcmStatusLabel(value = "") {
      return formatVisibleLcmTokenSequence(value, VISIBLE_LCM_EXACT_LABELS);
    }
    function formatVisibleLcmRoutePartLabel(value = "") {
      return formatVisibleLcmTokenSequence(value, VISIBLE_LCM_ROUTE_LABELS);
    }
    function formatVisibleLcmLayerLabel(value = "") {
      return formatVisibleLcmTokenSequence(value, VISIBLE_LCM_LAYER_LABELS);
    }
    function formatVisibleLcmDiagnosticLabel(value = "") {
      return formatVisibleLcmTokenSequence(value, VISIBLE_LCM_DIAGNOSTIC_LABELS);
    }
    function buildGrammarFrameSubLabels(frameLike = null, {
      includeResult = true,
      includeRoute = true,
      includeAuthority = true,
      includeOrthography = true,
      includeDiagnostics = true,
      maxDiagnostics = 2
    } = {}) {
      const frame = getGrammarFrameForRendering(frameLike);
      if (!frame) {
        return [];
      }
      const labels = [];
      const resultFrame = frame.resultFrame || {};
      const routeContract = frame.routeContract || {};
      const authorityFrame = frame.authorityFrame || {};
      const orthographyFrame = frame.orthographyFrame || {};
      const diagnosticFrame = frame.diagnosticFrame || {};
      if (includeResult && typeof resultFrame.ok === "boolean") {
        labels.push(`Estado de contrato: ${resultFrame.ok ? "generado" : "bloqueado"}`);
      }
      if (includeRoute) {
        const routeFamily = String(routeContract.routeFamily || resultFrame.generationRoute || "").trim();
        const routeStage = String(routeContract.routeStage || "").trim();
        if (routeFamily || routeStage) {
          labels.push(`Ruta de contrato: ${[routeFamily, routeStage].map(formatVisibleLcmRoutePartLabel).filter(Boolean).join(" / ")}`);
        }
        if (routeContract.generationAllowed === false) {
          labels.push("Generación de contrato: no autorizada");
        }
      }
      if (includeAuthority) {
        const refs = Array.isArray(authorityFrame.andrewsRefs) ? authorityFrame.andrewsRefs.map(entry => String(entry || "").trim()).filter(Boolean) : [];
        if (refs.length) {
          labels.push(`Andrews: ${refs.slice(0, 2).join(", ")}`);
        }
        const evidenceStatus = String(authorityFrame.evidenceStatus || "").trim();
        if (evidenceStatus) {
          labels.push(`Evidencia: ${formatVisibleLcmStatusLabel(evidenceStatus)}`);
        }
      }
      if (includeOrthography) {
        const hasResultFrame = Boolean(frame.resultFrame && typeof frame.resultFrame === "object");
        const resultSurfaceForms = [...(Array.isArray(resultFrame.surfaceForms) ? resultFrame.surfaceForms : []), resultFrame.surface].flatMap(form => splitConjugationSurfaceText(form)).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index);
        const orthographySurfaceForms = !hasResultFrame ? [...(Array.isArray(orthographyFrame.surfaceForms) ? orthographyFrame.surfaceForms : []), orthographyFrame.surface].flatMap(form => splitConjugationSurfaceText(form)).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index) : [];
        const rawSurface = String(resultSurfaceForms[0] || orthographySurfaceForms[0] || "").trim();
        const surface = rawSurface === "—" ? "" : rawSurface;
        const nawatRuleSpelling = !hasResultFrame ? String(orthographyFrame.nawatRuleSpelling || "").trim() : "";
        const spellingLabel = surface || (nawatRuleSpelling === "—" ? "" : nawatRuleSpelling);
        if (spellingLabel) {
          labels.push(`Realización Nawat: ${spellingLabel}`);
        } else if (!hasResultFrame && orthographyFrame.noClassicalSurfaceImport === true) {
          labels.push("Realización Nawat: pendiente");
        }
        const soundSpellingFrames = [...(Array.isArray(orthographyFrame.soundSpellingFrames) ? orthographyFrame.soundSpellingFrames : []), ...(orthographyFrame.soundSpellingFrame && typeof orthographyFrame.soundSpellingFrame === "object" ? [orthographyFrame.soundSpellingFrame] : [])];
        soundSpellingFrames.slice(0, 2).forEach(soundFrame => {
          const source = String(soundFrame?.sourceSurface || soundFrame?.sourceDisplay || soundFrame?.normalizedSource || "").trim();
          const target = String(soundFrame?.target || (Array.isArray(soundFrame?.targetCandidates) ? soundFrame.targetCandidates.join("/") : "") || "").trim();
          const slot = String(soundFrame?.grammarSlot || soundFrame?.slot || "").trim();
          const process = String(soundFrame?.spanishProcess || soundFrame?.andrewsProcess || "").trim();
          const section = String(soundFrame?.andrewsSection || "").trim();
          if (source && target) {
            labels.push([`Proceso L2${section ? ` ${section}` : ""}:`, process || "sonido/escritura", `${source} -> ${target}${slot ? ` (${slot})` : ""}`].filter(Boolean).join(" "));
          }
        });
      }
      if (includeDiagnostics) {
        const failedLayerDiagnostics = [...(Array.isArray(diagnosticFrame.diagnostics) ? diagnosticFrame.diagnostics : []), ...(Array.isArray(routeContract.blockingDiagnostics) ? routeContract.blockingDiagnostics : [])];
        const failedLayerEntry = failedLayerDiagnostics.find(entry => entry && typeof entry === "object" && String(entry.failedLayer || entry.contractLayer || "").trim()) || null;
        let failedLayer = String(failedLayerEntry?.failedLayer || "").trim();
        let contractLayer = String(failedLayerEntry?.contractLayer || "").trim();
        if (!failedLayer && authorityFrame.supported === false) {
          failedLayer = "authority";
          contractLayer = contractLayer || "authorityFrame";
        } else if (!failedLayer && routeContract.generationAllowed === false) {
          failedLayer = "route";
          contractLayer = contractLayer || "routeContract";
        } else if (!failedLayer && resultFrame.ok === false) {
          failedLayer = "output";
          contractLayer = contractLayer || "resultFrame";
        }
        if (failedLayer || contractLayer) {
          labels.push(`Falla de contrato: ${[failedLayer, contractLayer].map(formatVisibleLcmLayerLabel).filter(Boolean).join(" / ")}`);
        }
        const diagnosticLabels = (Array.isArray(diagnosticFrame.diagnostics) ? diagnosticFrame.diagnostics : []).map(entry => getGrammarFrameDiagnosticLabelForRendering(entry)).filter(Boolean);
        diagnosticLabels.slice(0, Math.max(0, maxDiagnostics)).forEach(label => {
          labels.push(`Diagnóstico de contrato: ${formatVisibleLcmDiagnosticLabel(label)}`);
        });
      }
      return labels.filter(Boolean);
    }
    function appendGrammarFrameSubLabels(baseLabel = "", frameLike = null, options = {}) {
      return [baseLabel, ...buildGrammarFrameSubLabels(frameLike, options)].filter(Boolean).join(" · ");
    }
    function buildVncValencyFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "vnc-valency-frame") {
        return [];
      }
      const labels = [];
      const valencyLabel = String(frame.valencyLabel || frame.valency || "").trim();
      if (valencyLabel) {
        labels.push(`valencia verbal: ${valencyLabel}`);
      }
      const objectDisplay = String(frame.obj1?.displayPrefix || frame.object?.displayPrefix || "").trim();
      if (objectDisplay) {
        labels.push(`objeto 1 verbal: ${objectDisplay}`);
      }
      const lesson6Object = frame.lesson6DirectNawatObject || frame.obj1?.lesson6DirectNawatDyad || null;
      const formulaPosition = String(lesson6Object?.formulaPosition || frame.lesson6ValencePosition || frame.obj1?.formulaPosition || "").trim();
      const visibleFormulaPrefix = String(lesson6Object?.visibleFormulaPrefix || frame.lesson6VisibleFormulaObjectPrefix || frame.obj1?.formulaPrefix || "").trim();
      if (formulaPosition) {
        labels.push(`posición de valencia: ${formulaPosition === "va" ? "val" : "val1-val2"}`);
      }
      if (visibleFormulaPrefix) {
        labels.push(`subcasillas Nawat: ${visibleFormulaPrefix}`);
      }
      return labels;
    }
    function appendVncValencyFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildVncValencyFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildDerivedVoiceFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "derived-voice-frame") {
        return [];
      }
      const labels = [];
      const voiceLabel = String(frame.voice?.label || "").trim();
      if (voiceLabel) {
        labels.push(`voz derivada: ${voiceLabel}`);
      }
      const sourceValency = frame.valency?.sourceValency;
      const targetValency = frame.valency?.targetValency;
      if (Number.isFinite(sourceValency) && Number.isFinite(targetValency)) {
        labels.push(`valencia derivada: ${sourceValency}->${targetValency}`);
      }
      const baseObject = String(frame.valency?.baseObj1 || "").trim();
      const selectedObject = String(frame.valency?.selectedObj1 || "").trim() || "Ø";
      if (baseObject && baseObject !== selectedObject) {
        labels.push(`objeto base: ${baseObject}->${selectedObject}`);
      }
      return labels;
    }
    function appendDerivedVoiceFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildDerivedVoiceFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildForwardDerivationFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "forward-derivation-frame") {
        return [];
      }
      const labels = [];
      const derivationLabel = String(frame.derivation?.label || frame.derivation?.type || "").trim();
      if (derivationLabel) {
        labels.push(`derivación verbal: ${derivationLabel}`);
      }
      const sourceValency = frame.valency?.sourceValency;
      const derivedValency = frame.valency?.derivedValency;
      if (Number.isFinite(sourceValency) && Number.isFinite(derivedValency)) {
        labels.push(`valencia derivada: ${sourceValency}->${derivedValency}`);
      }
      const selectedStem = String(frame.stem?.selectedStem || "").trim();
      if (selectedStem) {
        labels.push(`tronco derivado: ${selectedStem}`);
      }
      return labels;
    }
    function appendForwardDerivationFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildForwardDerivationFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildCompoundFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "compound-frame") {
        return [];
      }
      const labels = [];
      const matrixStem = String(frame.matrix?.stem || "").trim();
      if (matrixStem) {
        labels.push(`compuesto verbal: ${matrixStem}`);
      }
      const embedValues = (Array.isArray(frame.embeds) ? frame.embeds : []).map(entry => {
        const role = String(entry?.role || "").trim();
        const value = String(entry?.value || "").trim();
        return value ? `${role || "embed"} ${value}`.trim() : "";
      }).filter(Boolean);
      if (embedValues.length) {
        labels.push(`incrustado: ${embedValues.join(", ")}`);
      }
      return labels;
    }
    function appendCompoundFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildCompoundFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildAdverbialNuclearFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "adverbial-nuclear-frame") {
        return [];
      }
      const labels = [];
      const adverbialLabel = String(frame.adverbial?.label || "").trim();
      if (adverbialLabel) {
        labels.push(`adverbial nuclear: ${adverbialLabel}`);
      }
      const sourceStem = String(frame.sourceVnc?.stem || "").trim();
      if (sourceStem) {
        labels.push(`${ANDREWS_RENDERING_TERMS.sourceVnc}: ${sourceStem}`);
      }
      const sourceValency = String(frame.sourceVnc?.valency || "").trim();
      if (sourceValency) {
        labels.push(`valencia fuente: ${sourceValency === "transitive" ? "transitiva" : sourceValency === "intransitive" ? "intransitiva" : sourceValency}`);
      }
      const clauseFrame = frame.adverbialNuclearClauseFrame || null;
      const degree = String(clauseFrame?.adverbialization?.degree || "").trim();
      if (degree) {
        labels.push(`grado: ${degree === "first-degree" ? "primer grado" : degree === "second-degree" ? "segundo grado" : degree}`);
      }
      const domain = String(clauseFrame?.adverbialization?.semanticDomain || "").trim();
      if (domain) {
        labels.push(`dominio: ${domain === "manner" ? "manera" : domain}`);
      }
      if (frame.boundaries?.configuredAdverbioSurfaceOnly === true) {
        labels.push("alcance: adverbio heredado");
      }
      return labels;
    }
    function appendAdverbialNuclearFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildAdverbialNuclearFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildRelationalNncBoundaryFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "relational-nnc-boundary-frame") {
        return [];
      }
      const labels = [];
      const statusLabel = String(frame.statusLabel || "").trim();
      if (statusLabel) {
        labels.push(`Relacional nominal: ${statusLabel}`);
      }
      const candidateLabel = String(frame.candidate?.kindLabel || frame.candidate?.nominalKind || "").trim();
      if (candidateLabel) {
        labels.push(`Candidato: ${candidateLabel}`);
      }
      if (frame.boundaries?.locativeTemporalNominalIsEvidence === false) {
        labels.push("Evidencia relacional: no confirmada");
      }
      return labels;
    }
    function appendRelationalNncBoundaryFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildRelationalNncBoundaryFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildPlaceGentilicNncBoundaryFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "place-gentilic-nnc-boundary-frame") {
        return [];
      }
      const labels = [];
      const statusLabel = String(frame.statusLabel || "").trim();
      if (statusLabel) {
        labels.push(`Lugar/gentilicio: ${statusLabel}`);
      }
      const candidateLabel = String(frame.candidate?.kindLabel || frame.candidate?.nominalKind || "").trim();
      if (candidateLabel) {
        labels.push(`Candidato L/G: ${candidateLabel}`);
      }
      if (frame.boundaries?.locativeTemporalNominalIsEvidence === false) {
        labels.push("Evidencia L/G: no confirmada");
      }
      return labels;
    }
    function appendPlaceGentilicNncBoundaryFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildPlaceGentilicNncBoundaryFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildAdverbialAdjunctionBoundaryFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "adverbial-adjunction-boundary-frame") {
        return [];
      }
      const labels = [];
      const statusLabel = String(frame.statusLabel || "").trim();
      if (statusLabel) {
        labels.push(`Adjunción: ${statusLabel}`);
      }
      const candidateLabel = String(frame.candidate?.label || "").trim();
      if (candidateLabel) {
        labels.push(`Unidad adjunta: ${candidateLabel}`);
      }
      if (frame.boundaries?.singleGeneratedWordIsEvidence === false) {
        labels.push("Evidencia adjunción: no confirmada");
      }
      return labels;
    }
    function appendAdverbialAdjunctionBoundaryFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildAdverbialAdjunctionBoundaryFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildVncVerbstemClassProfileSubLabels(profile = null) {
      if (!profile || profile.kind !== "vnc-verbstem-class-profile") {
        return [];
      }
      const classKey = String(profile.classKey || profile.selectedClass || "").trim();
      if (!classKey) {
        return [];
      }
      const labels = [`Clase de tronco: ${classKey}`];
      const ruleLabel = String(profile.ruleSummary?.ruleLabel || "").trim();
      if (ruleLabel && ruleLabel !== "default class rules") {
        labels.push(`Diagnóstico de tronco: ${ruleLabel}`);
      }
      return labels;
    }
    function appendVncVerbstemClassProfileSubLabels(baseLabel = "", profile = null) {
      return [baseLabel, ...buildVncVerbstemClassProfileSubLabels(profile)].filter(Boolean).join(" · ");
    }
    const VISIBLE_SENTENCE_LAYER_SLOT_VALUES = Object.freeze({
      polarity: Object.freeze({
        affirmative: "afirmativa",
        negative: "negativa",
        unknown: "desconocida"
      }),
      question: Object.freeze({
        none: "ninguna",
        "yes-no": "sí/no",
        content: "de contenido",
        unknown: "desconocida"
      }),
      emphasis: Object.freeze({
        none: "ninguno",
        focus: "foco",
        emphatic: "enfática",
        unknown: "desconocido"
      }),
      mood: Object.freeze({
        declarative: "declarativo",
        wish: "deseo",
        command: "mandato",
        exhortation: "exhortación",
        admonition: "admonitivo",
        unknown: "desconocido"
      })
    });
    function formatVisibleSentenceLayerSlotValue(slot = "", value = "") {
      const slotKey = String(slot || "").trim();
      const normalized = String(value || "").trim().toLowerCase();
      return VISIBLE_SENTENCE_LAYER_SLOT_VALUES[slotKey]?.[normalized] || String(value || "").trim();
    }
    function buildSentenceLayerSubLabels(sentenceLayer = null) {
      if (!sentenceLayer || sentenceLayer.kind !== "sentence-layer-metadata") {
        return [];
      }
      const slots = sentenceLayer.slots || {};
      const labels = ["Capa oracional: diagnóstica"];
      const polarity = String(slots.polarity?.value || "").trim();
      const question = String(slots.question?.value || "").trim();
      const emphasis = String(slots.emphasis?.value || "").trim();
      const mood = String(slots.mood?.value || "").trim();
      if (polarity && polarity !== "affirmative") {
        labels.push(`Negación: ${formatVisibleSentenceLayerSlotValue("polarity", polarity)}`);
      }
      if (question && question !== "none") {
        labels.push(`Pregunta: ${formatVisibleSentenceLayerSlotValue("question", question)}`);
      }
      if (emphasis && emphasis !== "none") {
        labels.push(`Énfasis: ${formatVisibleSentenceLayerSlotValue("emphasis", emphasis)}`);
      }
      if (mood && mood !== "declarative") {
        labels.push(`Modo oracional: ${formatVisibleSentenceLayerSlotValue("mood", mood)}`);
      }
      return labels;
    }
    function appendSentenceLayerSubLabels(baseLabel = "", sentenceLayer = null) {
      return [baseLabel, ...buildSentenceLayerSubLabels(sentenceLayer)].filter(Boolean).join(" · ");
    }
    function getDefaultNawatPatientivoSourceTenseValue(patientivoSource = "") {
      return String(patientivoSource || "").trim() === "perfectivo" ? "preterito" : "presente";
    }
    function getNawatPatientivoRouteSpec(option = {}) {
      const sourceCombinedMode = String(option.sourceCombinedMode || "").trim();
      const sourceTenseValue = String(option.tenseValue || option.sourceTenseValue || "").trim();
      const patientivoSource = String(option.patientivoSource || "").trim();
      if (typeof targetObject.resolveNawatPatientivoRouteSpec === "function") {
        return targetObject.resolveNawatPatientivoRouteSpec({
          sourceTenseValue,
          sourceCombinedMode,
          patientivoSource
        });
      }
      const perfectiveSourceTenses = new Set(["preterito", "preterito-clase", "perfecto", "pluscuamperfecto", "condicional-perfecto"]);
      const resolvedPatientivoSource = sourceCombinedMode === "nonactive" ? "nonactive" : perfectiveSourceTenses.has(sourceTenseValue) ? "perfectivo" : "imperfectivo";
      const routeKey = resolvedPatientivoSource === "nonactive" ? "patientivo-nonactive-t" : resolvedPatientivoSource === "perfectivo" ? "patientivo-perfective-ti-noun" : "patientivo-imperfective-t";
      return {
        sourceTenseValue,
        sourceCombinedMode,
        patientivoSource: resolvedPatientivoSource,
        routeKey,
        suffix: resolvedPatientivoSource === "perfectivo" ? "ti" : "t",
        surfaceSuffix: resolvedPatientivoSource === "perfectivo" ? "-ti" : "-t"
      };
    }
    function getNawatPatientivoSourceRouteKey(option = {}) {
      return getNawatPatientivoRouteSpec(option).routeKey;
    }
    function getNawatVerbNounConversionProfiles() {
      return NAWAT_VERB_NOUN_CONVERSION_ROUTE_KEYS.map(routeKey => typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(routeKey) : null).filter(profile => profile && isVerbNounConversionRouteProfile(profile));
    }
    function getNawatVerbNounConversionLabel(profile = null, isNawat = false) {
      if (!profile || typeof profile !== "object") {
        return "";
      }
      if (isPatientivoSurfaceRouteProfile(profile)) {
        const sourceLabel = typeof targetObject.getPatientivoSourceTenseLabel === "function" ? targetObject.getPatientivoSourceTenseLabel(profile.patientivoSource || "nonactive", isNawat) : profile.patientivoSource || "patientivo";
        const suffix = String(profile.surfaceSuffix || (profile.patientivoNominalSuffix ? `-${String(profile.patientivoNominalSuffix).replace(/^-+/, "")}` : "")).trim();
        return ["patientivo", sourceLabel, suffix].filter(Boolean).join(" · ");
      }
      return typeof targetObject.formatNawatRouteProfileMetaLabel === "function" ? targetObject.formatNawatRouteProfileMetaLabel(profile, isNawat) : profile.id || "";
    }
    function getNawatVerbNounConversionHierarchyParts(profile = null, isNawat = false, {
      sourceTenseValue = "",
      sourceCombinedMode = ""
    } = {}) {
      if (!profile || typeof profile !== "object") {
        return {};
      }
      if (isPatientivoSurfaceRouteProfile(profile)) {
        const surfaceSpec = typeof targetObject.getNawatRoutePatientivoSurfaceSpec === "function" ? targetObject.getNawatRoutePatientivoSurfaceSpec(profile, {
          sourceTenseValue,
          sourceCombinedMode
        }) : null;
        const branchId = surfaceSpec?.patientivoSource || profile.patientivoSource || "nonactive";
        const suffix = String(surfaceSpec?.surfaceSuffix || profile.surfaceSuffix || (profile.patientivoNominalSuffix ? `-${String(profile.patientivoNominalSuffix).replace(/^-+/, "")}` : "")).trim();
        return {
          label: isNawat ? "tachiwal" : "patientivo",
          classCode: getNawatPatientivoBranchClassLabel(branchId),
          sublabel: getNawatPatientivoBranchLabel(branchId),
          suffix,
          routeKey: surfaceSpec?.routeKey || profile.id || profile.routeTenseValue || "",
          sourceTenseValue: surfaceSpec?.sourceTenseValue || sourceTenseValue || "",
          sourceCombinedMode: surfaceSpec?.sourceCombinedMode || sourceCombinedMode || "",
          patientivoSource: branchId
        };
      }
      return {
        label: getNawatVerbNounConversionLabel(profile, isNawat)
      };
    }
    function formatNawatVerbNounConversionHierarchyLabel(profile = null, isNawat = false, {
      includeSuffix = false,
      sourceTenseValue = "",
      sourceCombinedMode = ""
    } = {}) {
      const parts = getNawatVerbNounConversionHierarchyParts(profile, isNawat, {
        sourceTenseValue,
        sourceCombinedMode
      });
      return ["V→S", parts.classCode, parts.label, parts.sublabel, includeSuffix ? parts.suffix : ""].filter(Boolean).join(" · ");
    }
    function getNawatTroncoConversionSpec({
      routeKey = "",
      line = "",
      tenseValue = ""
    } = {}) {
      const normalizedRouteKey = String(routeKey || "").trim();
      if (normalizedRouteKey) {
        const byRoute = NAWAT_TRONCO_CONVERSION_ROUTE_SPECS.find(spec => spec.routeKey === normalizedRouteKey);
        if (byRoute) {
          return byRoute;
        }
      }
      const normalizedLine = String(line || "").trim();
      const normalizedTense = String(tenseValue || "").trim();
      return NAWAT_TRONCO_CONVERSION_ROUTE_SPECS.find(spec => (!normalizedLine || spec.line === normalizedLine) && (!normalizedTense || spec.tenseValue === normalizedTense)) || NAWAT_TRONCO_CONVERSION_ROUTE_SPECS[0];
    }
    function getNawatTroncoTenseShortLabel(tenseValue = "", isNawat = false) {
      const value = String(tenseValue || "").trim();
      if (value === "preterito") {
        return "pret";
      }
      if (value === "perfecto") {
        return "perf";
      }
      return targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[value], isNawat, value);
    }
    function buildNawatTroncoConversionTrack({
      routeKey = "",
      line = "",
      tenseValue = "",
      stem = "",
      sourceVerb = "",
      sourceObjectPrefix = ""
    } = {}) {
      const spec = getNawatTroncoConversionSpec({
        routeKey,
        line,
        tenseValue
      });
      const profile = typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(spec.routeKey) : null;
      if (!profile) {
        return null;
      }
      const routeTarget = typeof targetObject.resolveNawatRouteTarget === "function" ? targetObject.resolveNawatRouteTarget(profile, {
        sourceVerb,
        sourceObjectPrefix,
        sourceStem: stem
      }) : null;
      const finiteSurface = typeof targetObject.getNawatRouteFiniteSurfaceForm === "function" ? targetObject.getNawatRouteFiniteSurfaceForm(profile, {
        sourceVerb,
        sourceObjectPrefix,
        routeTarget
      }) : "";
      const targetVerb = String(routeTarget?.targetVerb || "").trim();
      const routeStem = String(routeTarget?.sourceStem || stem || "").trim();
      const targetInput = targetVerb && typeof targetObject.formatNawatRouteTargetInputValue === "function" ? targetObject.formatNawatRouteTargetInputValue(profile, {
        routeStem,
        targetVerb
      }) : targetVerb && typeof targetObject.wrapNawatRouteInputValue === "function" ? targetObject.wrapNawatRouteInputValue(targetVerb) : targetVerb;
      const destination = finiteSurface || profile.surfaceSuffix || spec.routeKey;
      const track = {
        routeKey: spec.routeKey,
        line: spec.line,
        tenseValue: spec.tenseValue,
        targetInput,
        targetVerb,
        destination
      };
      const hasAndrewsSuffixContract = String(profile.structuralAnalogue || "").trim() !== "nawat-transitive-route-no-andrews-suffix";
      return attachUiRouteControlGrammarContract(track, {
        outputKind: "patientivo-tronco-conversion-route-control",
        unitKind: "ui-route-control",
        routeFamily: "patientivo-tronco-conversion",
        routeStage: "finite-tense-preview",
        generationAllowed: true,
        supported: true,
        andrewsRefs: hasAndrewsSuffixContract ? ["Andrews Lessons 54-55"] : [],
        orthographyRefs: ["data/static_modes.json"],
        evidenceStatus: hasAndrewsSuffixContract ? "denominal-route-preview" : "nawat-route-no-andrews-suffix",
        diagnosticStatus: "route-control",
        sourceInput: sourceVerb || stem,
        targetInput,
        targetSurface: destination,
        sourceContract: {
          unitKind: "patientivo-tronco",
          sourceVerb,
          sourceStem: stem,
          sourceObjectPrefix
        },
        targetContract: {
          unitKind: "vnc",
          routeKey: spec.routeKey,
          targetMode: targetObject.TENSE_MODE.verbo,
          targetTense: spec.tenseValue,
          targetVerb,
          targetInput,
          verbalizer: profile.verbalizer || "",
          structuralAnalogue: profile.structuralAnalogue || ""
        },
        morphBoundaryFrame: {
          verbalizer: profile.verbalizer || "",
          verbalizerType: profile.verbalizerType || "",
          surfaceSuffix: profile.surfaceSuffix || "",
          noAndrewsSuffixContract: !hasAndrewsSuffixContract
        },
        stemFrame: {
          sourceStem: routeStem,
          targetStem: targetVerb,
          routeKey: spec.routeKey
        },
        participantFrame: {
          objectPrefix: sourceObjectPrefix
        },
        inflectionFrame: {
          targetTense: spec.tenseValue,
          finiteTense: profile.finiteTense || ""
        }
      });
    }
    function normalizeDerivationalInputFamilyToken(token = "") {
      const normalizedToken = targetObject.normalizeDerivationStemValue(token);
      if (/^[aeiu]w[ai]$/.test(normalizedToken)) {
        return normalizedToken.slice(1);
      }
      return normalizedToken;
    }
    function isSameDerivationalGuidanceRow(left = null, right = null) {
      if (!left || !right) {
        return false;
      }
      return String(left.stem || "") === String(right.stem || "") && String(left.rule || "") === String(right.rule || "") && String(left.patternType || "") === String(right.patternType || "");
    }
    function buildDerivationalFamilySummaryEntries({
      inputStem = "",
      rows = [],
      activeRow = null
    } = {}) {
      const normalizedInputStem = targetObject.normalizeDerivationStemValue(inputStem);
      const normalizedRows = (Array.isArray(rows) ? rows : []).filter(row => targetObject.normalizeDerivationStemValue(row?.stem || ""));
      if (!normalizedInputStem || !normalizedRows.length) {
        return [];
      }
      let cutIndex = getSurfaceFamilyBaseCutIndex(normalizedInputStem);
      normalizedRows.forEach(row => {
        cutIndex = Math.min(cutIndex, getSharedLetterPrefixLength(normalizedInputStem, row.stem || ""));
      });
      const inputFamily = normalizeDerivationalInputFamilyToken(getLetterSliceText(normalizedInputStem, cutIndex));
      if (!inputFamily) {
        return [];
      }
      const entries = [];
      const seen = new Map();
      normalizedRows.forEach(row => {
        const outputFamily = getLetterSliceText(row.stem || "", cutIndex);
        if (!outputFamily) {
          return;
        }
        const text = `${inputFamily} → ${outputFamily}`;
        const existingIndex = seen.get(text);
        if (typeof existingIndex === "number") {
          if (isSameDerivationalGuidanceRow(row, activeRow)) {
            entries[existingIndex].active = true;
          }
          return;
        }
        seen.set(text, entries.length);
        entries.push({
          text,
          active: isSameDerivationalGuidanceRow(row, activeRow) || !activeRow && row.preferred === true
        });
      });
      return entries;
    }
    function resolveCurrentDerivationalGuidanceEntries(verb = "", derivationType = "", activeRow = null) {
      const resolvedVerb = String(verb || "");
      if (!resolvedVerb) {
        return [];
      }
      const parsedVerb = targetObject.parseVerbInput(resolvedVerb);
      if (!parsedVerb) {
        return [];
      }
      const traced = targetObject.traceDerivationalFunction(resolvedVerb, {
        includeBothTransitivity: false,
        isTransitive: targetObject.getBaseObjectSlots(parsedVerb) > 0
      });
      const normalizedDerivationType = Object.values(targetObject.DERIVATION_TYPE).includes(derivationType) ? derivationType : targetObject.DERIVATION_TYPE.direct;
      const derivationRows = Array.isArray(traced?.[normalizedDerivationType]) ? traced[normalizedDerivationType] : [];
      const selectedRow = derivationRows.find(row => row?.preferred) || derivationRows[0] || null;
      const summaryEntries = buildDerivationalFamilySummaryEntries({
        inputStem: resolvedVerb,
        rows: derivationRows,
        activeRow: activeRow || selectedRow
      });
      return summaryEntries;
    }
    function renderOutputGuidancePanel({
      verb = ""
    } = {}) {
      const panel = targetObject.document.getElementById("calc-guidance");
      if (!panel) {
        return;
      }
      panel.innerHTML = "";
      panel.hidden = true;
      panel.classList.add("is-empty");
    }
    function resolveRenderableVerbValue(verb = "") {
      const explicitVerb = String(verb || "").trim();
      if (explicitVerb) {
        return explicitVerb;
      }
      const verbInput = typeof targetObject.document !== "undefined" ? targetObject.document.getElementById("verb") : null;
      const troncoInputSource = targetObject.resolveVerbInputSource(verbInput?.value || "");
      const candidate = String(troncoInputSource.displayValue || troncoInputSource.regexValue || troncoInputSource.parseValue || troncoInputSource.rawValue || "").trim();
      const baseValue = targetObject.getSearchInputBase(candidate);
      return targetObject.isComposerTemplateOnlyBaseValue(baseValue) ? "" : candidate;
    }
    function renderOutputSelectionRequiredPlaceholder({
      containerId = "all-tense-conjugations",
      titleText = "Salida",
      message = "",
      tenseValue = "selection-required",
      mode = typeof targetObject.getActiveTenseMode === "function" ? targetObject.getActiveTenseMode() : targetObject.TENSE_MODE.verbo,
      blockKind = "seleccion requerida",
      blockClassName = ""
    } = {}) {
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return;
      }
      const {
        grid
      } = createObjectSectionGrid(container);
      const block = targetObject.document.createElement("div");
      block.className = "tense-block tense-block--selection-required";
      if (blockClassName) {
        block.classList.add(blockClassName);
      }
      if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
        targetObject.applyAndrewsTenseAuthorityDataset(block, {
          tenseValue,
          mode,
          blockKind
        });
      }
      const title = targetObject.document.createElement("div");
      title.className = "tense-block__title";
      const label = targetObject.document.createElement("span");
      label.className = "tense-block__label";
      label.textContent = titleText;
      title.appendChild(label);
      block.appendChild(title);
      const list = targetObject.document.createElement("div");
      list.className = "conjugation-list";
      const placeholder = targetObject.document.createElement("div");
      placeholder.className = "tense-placeholder";
      placeholder.textContent = message;
      list.appendChild(placeholder);
      block.appendChild(list);
      grid.appendChild(block);
    }
    function getParticleModeCandidateValue(fallbackCandidate = "") {
      const verbInput = targetObject.document.getElementById("verb");
      const rawValue = String(verbInput?.value || fallbackCandidate || "").trim();
      if (!rawValue) {
        return "";
      }
      const source = typeof targetObject.resolveVerbInputSource === "function" ? targetObject.resolveVerbInputSource(rawValue) : null;
      return String(source?.rawValue || source?.displayValue || source?.regexValue || rawValue).trim();
    }
    function createParticleModeCell(className = "", text = "", label = "") {
      const cell = targetObject.document.createElement("div");
      cell.className = className;
      cell.textContent = String(text || "—");
      if (label) {
        cell.dataset.label = label;
      }
      return cell;
    }
    function appendParticleModeHeader(list) {
      const header = targetObject.document.createElement("div");
      header.className = "particle-row particle-row--header";
      [["particle-row__form", "Nawat"], ["particle-row__source", "Andrews"], ["particle-row__class", "Función"], ["particle-row__position", "Posición"], ["particle-row__gloss", "Glosa"], ["particle-row__status", "Estado"]].forEach(([className, text]) => {
        header.appendChild(createParticleModeCell(className, text));
      });
      list.appendChild(header);
    }
    function formatParticleModeSourceCell(seedEntry = null) {
      if (!seedEntry) {
        return "—";
      }
      return [seedEntry.sourceForm || "", seedEntry.section ? `sec. ${seedEntry.section}` : ""].filter(Boolean).join(" · ") || "—";
    }
    function getParticleModeStatusText(frameModel = null, seedEntry = null) {
      const evidenceStatus = String(seedEntry?.evidenceStatus || frameModel?.grammarFrame?.authorityFrame?.evidenceStatus || "");
      const generationAllowed = seedEntry ? seedEntry.generationAllowed === true : frameModel?.generationAllowed === true;
      const isConfirmedNawat = seedEntry?.isConfirmedNawat === true;
      if (seedEntry || evidenceStatus === "andrews-orthography-adapted") {
        return ["ortografía adaptada", isConfirmedNawat ? "confirmado Nawat" : "no confirmado Nawat", generationAllowed ? "genera" : "sin generación"].join(" · ");
      }
      if (evidenceStatus === "not-particle-syntax") {
        return "fuera de Partícula · sin generación";
      }
      return "diagnóstico · sin generación";
    }
    function appendParticleModeRow(list, model, {
      label = "",
      value = "",
      detail = "",
      rowId = "",
      rowModel = null,
      exportInput = null
    } = {}) {
      const row = targetObject.document.createElement("div");
      row.className = "particle-row conjugation-row--particle";
      row.dataset.particleRow = rowId || "";
      if (exportInput !== null) {
        row.dataset.exportInput = String(exportInput || "");
      }
      const frameModel = rowModel || model;
      const isSeedInventoryRow = frameModel?.kind === "particle-seed-inventory-entry";
      const seedEntry = isSeedInventoryRow ? frameModel : frameModel?.classification?.seedEntry || null;
      const placement = seedEntry?.placement || frameModel?.classification?.placement || null;
      const functionClass = seedEntry?.functionClass || frameModel?.classification?.functionClass || null;
      row.dataset.particleEntryKind = isSeedInventoryRow ? "andrews-seed" : rowId === "candidate" ? "candidate-diagnostic" : "mode-diagnostic";
      const nawatForm = String(seedEntry?.displayForm || seedEntry?.nawatForm || frameModel?.candidateDisplay || label || value || "");
      const functionLabel = String(functionClass?.label || seedEntry?.functionScope || frameModel?.classification?.functionScope || value || "");
      const placementLabel = String(placement?.label || "");
      const glossText = String(seedEntry?.gloss || detail || "");
      const statusText = getParticleModeStatusText(frameModel, seedEntry);
      row.dataset.particleNawatForm = nawatForm;
      row.dataset.particleSourceForm = String(seedEntry?.sourceForm || "");
      row.dataset.particleSection = String(seedEntry?.section || "");
      row.dataset.particleFunctionClass = functionLabel;
      row.dataset.particlePlacement = placementLabel;
      row.dataset.particleHostLayer = String(placement?.hostLayer || "");
      row.dataset.particleGloss = String(seedEntry?.gloss || "");
      row.dataset.particleEvidenceStatus = statusText;
      row.dataset.particleConfirmedNawat = String(seedEntry?.isConfirmedNawat === true);
      row.appendChild(createParticleModeCell("particle-row__form person-label", nawatForm || "Ø", "Nawat"));
      row.appendChild(createParticleModeCell("particle-row__source", formatParticleModeSourceCell(seedEntry), "Andrews"));
      row.appendChild(createParticleModeCell("particle-row__class", functionLabel || "—", "Función"));
      row.appendChild(createParticleModeCell("particle-row__position", placementLabel || "—", "Posición"));
      row.appendChild(createParticleModeCell("particle-row__gloss person-sub", glossText || "—", "Glosa"));
      row.appendChild(createParticleModeCell("particle-row__status person-sub", statusText || "—", "Estado"));
      const particleDiagnostics = Array.isArray(frameModel?.grammarFrame?.diagnosticFrame?.diagnostics) ? frameModel.grammarFrame.diagnosticFrame.diagnostics : [];
      const particleEvaluation = {
        availabilityState: typeof targetObject.CONJUGATION_AVAILABILITY_STATE !== "undefined" ? targetObject.CONJUGATION_AVAILABILITY_STATE.impossible : "impossible",
        diagnosticIds: particleDiagnostics.map(entry => String(entry?.id || entry?.code || "").trim()).filter(Boolean),
        diagnostics: particleDiagnostics,
        result: frameModel
      };
      if (typeof targetObject.applyConjugationEvaluationPresentation === "function") {
        targetObject.applyConjugationEvaluationPresentation({
          row,
          value: null,
          evaluation: particleEvaluation,
          formattedValue: String(nawatForm || "")
        });
      }
      if (typeof applyGrammarFrameRouteDataset === "function") {
        applyGrammarFrameRouteDataset(row, frameModel);
      }
      list.appendChild(row);
    }
    function renderParticleModeConjugations({
      candidate = "",
      containerId = "all-tense-conjugations"
    } = {}) {
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return;
      }
      const {
        grid
      } = createObjectSectionGrid(container);
      grid.classList.add("particle-mode-grid");
      const resolvedCandidate = getParticleModeCandidateValue(candidate);
      const model = typeof targetObject.buildParticleModeDisplayModel === "function" ? targetObject.buildParticleModeDisplayModel({
        candidate: resolvedCandidate
      }) : null;
      if (!model) {
        const block = targetObject.document.createElement("div");
        block.className = "tense-block particle-panel tense-block--particle-mode";
        block.dataset.tenseBlock = "particle-mode";
        block.title = "Andrews Lección 3";
        if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
          targetObject.applyAndrewsTenseAuthorityDataset(block, {
            tenseValue: "particle-mode",
            mode: targetObject.TENSE_MODE.particula,
            blockKind: "Particula"
          });
        }
        const list = targetObject.document.createElement("div");
        list.className = "particle-table";
        block.appendChild(list);
        const placeholder = targetObject.document.createElement("div");
        placeholder.className = "tense-placeholder";
        placeholder.textContent = "El marco de partículas no está disponible.";
        list.appendChild(placeholder);
        grid.appendChild(block);
        return;
      }
      if (resolvedCandidate) {
        const block = targetObject.document.createElement("div");
        block.className = "tense-block particle-panel particle-panel--candidate tense-block--particle-mode";
        block.dataset.tenseBlock = "particle-mode";
        block.title = "Andrews Lección 3";
        if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
          targetObject.applyAndrewsTenseAuthorityDataset(block, {
            tenseValue: "particle-mode",
            mode: targetObject.TENSE_MODE.particula,
            blockKind: "Particula candidata"
          });
        }
        const title = targetObject.document.createElement("div");
        title.className = "tense-block__title";
        const titleLabel = targetObject.document.createElement("span");
        titleLabel.className = "tense-block__label";
        titleLabel.textContent = "Partículas";
        titleLabel.title = block.title;
        title.appendChild(titleLabel);
        block.appendChild(title);
        const list = targetObject.document.createElement("div");
        list.className = "particle-table";
        block.appendChild(list);
        grid.appendChild(block);
        appendParticleModeHeader(list);
        const candidateRow = (model.rows || []).find(entry => entry.id === "candidate") || {};
        const functionRow = (model.rows || []).find(entry => entry.id === "function") || {};
        appendParticleModeRow(list, model, {
          label: model.candidateDisplay || resolvedCandidate,
          value: functionRow.value || "",
          detail: candidateRow.detail || "",
          rowId: "candidate",
          rowModel: model,
          exportInput: resolvedCandidate
        });
      }
      const candidateSeedId = resolvedCandidate ? String(model.classification?.seedEntry?.id || "") : "";
      const groupedInventory = Array.isArray(model.inventoryGroups) ? model.inventoryGroups.map(group => ({
        ...group,
        entries: Array.isArray(group.entries) ? group.entries.filter(entry => !candidateSeedId || entry.id !== candidateSeedId) : []
      })).filter(group => group.entries.length > 0) : [];
      if (groupedInventory.length) {
        groupedInventory.forEach(group => {
          const groupBlock = targetObject.document.createElement("div");
          groupBlock.className = "tense-block particle-panel particle-panel--inventory particle-panel--group tense-block--particle-boundary";
          groupBlock.dataset.tenseBlock = "particle-boundary";
          groupBlock.title = "Andrews Lección 3";
          if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
            targetObject.applyAndrewsTenseAuthorityDataset(groupBlock, {
              tenseValue: "particle-boundary",
              mode: targetObject.TENSE_MODE.particula,
              blockKind: "Particula inventario"
            });
          }
          groupBlock.dataset.particleInventoryGroup = group.id || "";
          groupBlock.dataset.particleSection = group.sectionLabel || group.sectionPrefix || "";
          const groupTitle = targetObject.document.createElement("div");
          groupTitle.className = "tense-block__title particle-group-title";
          const groupLabel = targetObject.document.createElement("span");
          groupLabel.className = "tense-block__label";
          groupLabel.textContent = group.label || "Ejemplos del PDF";
          groupLabel.title = groupBlock.title;
          groupTitle.appendChild(groupLabel);
          const groupCount = targetObject.document.createElement("span");
          groupCount.className = "particle-group-title__count";
          groupCount.textContent = `${group.entries.length} ejemplos · ortografía adaptada`;
          groupTitle.appendChild(groupCount);
          groupBlock.appendChild(groupTitle);
          const groupList = targetObject.document.createElement("div");
          groupList.className = "particle-table";
          groupBlock.appendChild(groupList);
          grid.appendChild(groupBlock);
          appendParticleModeHeader(groupList);
          group.entries.forEach(entry => {
            appendParticleModeRow(groupList, model, {
              label: entry.displayForm || entry.nawatForm || entry.sourceForm,
              value: entry.functionClass?.label || entry.functionScope || "",
              detail: [entry.sourceForm ? `fuente: ${entry.sourceForm}` : "", entry.gloss || "", "sin generación"].filter(Boolean).join("; "),
              rowId: entry.id,
              rowModel: entry,
              exportInput: entry.displayForm || entry.nawatForm || entry.sourceForm || ""
            });
          });
        });
        return;
      }
      const boundaryBlock = targetObject.document.createElement("div");
      boundaryBlock.className = "tense-block particle-panel particle-panel--inventory tense-block--particle-boundary";
      boundaryBlock.dataset.tenseBlock = "particle-boundary";
      boundaryBlock.title = "Andrews Lección 3";
      if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
        targetObject.applyAndrewsTenseAuthorityDataset(boundaryBlock, {
          tenseValue: "particle-boundary",
          mode: targetObject.TENSE_MODE.particula,
          blockKind: "Particula inventario"
        });
      }
      const boundaryTitle = targetObject.document.createElement("div");
      boundaryTitle.className = "tense-block__title";
      const boundaryLabel = targetObject.document.createElement("span");
      boundaryLabel.className = "tense-block__label";
      boundaryLabel.textContent = "Clases funcionales";
      boundaryLabel.title = boundaryBlock.title;
      boundaryTitle.appendChild(boundaryLabel);
      boundaryBlock.appendChild(boundaryTitle);
      const boundaryList = targetObject.document.createElement("div");
      boundaryList.className = "particle-table";
      boundaryBlock.appendChild(boundaryList);
      grid.appendChild(boundaryBlock);
      appendParticleModeHeader(boundaryList);
      (model.functionClassFrames || []).forEach(frame => {
        appendParticleModeRow(boundaryList, model, {
          label: frame.label,
          value: frame.scope,
          detail: `capa: ${frame.hostLayer}; generación: no`,
          rowId: frame.id
        });
      });
    }
    function renderOrdinaryNncConjugations({
      stem,
      containerId = "all-tense-conjugations"
    } = {}) {
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return;
      }
      const isNawat = targetObject.getIsNawat();
      const analogueInput = typeof targetObject.parseOrdinaryNncGenerationAnalogueInput === "function" ? targetObject.parseOrdinaryNncGenerationAnalogueInput(stem) : null;
      const normalizedStem = analogueInput?.stem || String(stem || "").trim();
      const {
        objSection,
        grid
      } = createObjectSectionGrid(container);
      const state = targetObject.getOrdinaryNncGenerationState();
      const fixtureProbe = normalizedStem && typeof targetObject.resolveOrdinaryNncFixture === "function" ? targetObject.resolveOrdinaryNncFixture({
        stem: normalizedStem,
        states: ["absolutive"],
        numbers: ["singular"]
      }) : null;
      const normalizeOrdinaryNncUiNounClass = (value = "") => {
        const normalized = String(value || "").trim().toLowerCase();
        if (normalized === "0" || normalized === "ø" || normalized === "zero") {
          return "zero";
        }
        return ["t", "ti", "in"].includes(normalized) ? normalized : "";
      };
      const fixtureNounClass = normalizeOrdinaryNncUiNounClass(fixtureProbe?.fixture?.nounClass || "");
      const activeNounClass = normalizeOrdinaryNncUiNounClass(analogueInput?.nounClass || state.nounClass || fixtureNounClass);
      const requestNounClass = fixtureProbe ? "" : activeNounClass;
      const fixtureAnimacy = fixtureProbe?.fixture?.animacy || "";
      const selectedAnimacy = fixtureAnimacy || (state.animacy === "animate" || state.animacy === "inanimate" ? state.animacy : "");
      const activeAnimacy = selectedAnimacy || "inanimate";
      const isAnimateNnc = activeAnimacy === "animate";
      const activePluralType = state.pluralType === "auto" ? isAnimateNnc ? "count" : "distributive" : state.pluralType;
      const nounSubjectOptionById = new Map((typeof targetObject.getSubjectToggleOptions === "function" ? targetObject.getSubjectToggleOptions() : []).map(entry => [entry.id, entry]));
      const subjectEntries = (Array.isArray(targetObject.SUBJECT_COMBINATIONS) ? targetObject.SUBJECT_COMBINATIONS : []).filter(entry => isAnimateNnc || entry.personSubKey === "3sg");
      const getOrdinaryNncSubjectMarkerLabel = entry => {
        const prefix = String(entry?.subjectPrefix || "");
        const suffix = String(entry?.subjectSuffix || "");
        return `${prefix || "Ø"}...${suffix || "Ø"}`;
      };
      const getSubjectNumber = entry => String(entry?.personSubKey || "").endsWith("pl") ? "plural" : "singular";
      const getOrdinaryNncNounClassLabel = (value = "") => {
        const normalized = normalizeOrdinaryNncUiNounClass(value);
        return normalized === "zero" ? "Ø" : normalized;
      };
      const getOrdinaryNncPredicateStateLabel = (stateSlot = null, fallbackState = "") => {
        const stateValue = stateSlot?.state || fallbackState || "absolutive";
        return stateValue === "possessive" ? "predicado posesivo" : "predicado absolutivo";
      };
      const rerender = () => {
        renderActiveConjugations({
          verb: normalizedStem,
          objectPrefix: ""
        });
      };
      const candidateProbeCache = new Map();
      const probeOrdinaryNncCandidate = ({
        candidateState = state.state,
        candidateNumber = state.number,
        candidatePluralType = state.pluralType,
        candidatePossessor = state.possessor,
        candidateSubject = null
      } = {}) => {
        if (!normalizedStem || !fixtureProbe && !requestNounClass || !fixtureProbe && !selectedAnimacy || typeof targetObject.buildOrdinaryNncGenerateWordRequest !== "function" || typeof targetObject.executeGenerateWordRequest !== "function") {
          return null;
        }
        const subjectSource = candidateSubject || {
          subjectPrefix: state.subjectPrefix || "",
          subjectSuffix: state.subjectSuffix || "",
          personSubKey: state.subjectKey || ""
        };
        const cacheKey = JSON.stringify({
          stem: normalizedStem,
          state: candidateState,
          number: candidateNumber,
          pluralType: candidatePluralType,
          possessor: candidatePossessor || "",
          nounClass: requestNounClass,
          animacy: activeAnimacy,
          subjectPrefix: subjectSource.subjectPrefix || "",
          subjectSuffix: subjectSource.subjectSuffix || "",
          subjectKey: subjectSource.personSubKey || subjectSource.subjectKey || ""
        });
        if (candidateProbeCache.has(cacheKey)) {
          return candidateProbeCache.get(cacheKey);
        }
        const request = targetObject.buildOrdinaryNncGenerateWordRequest({
          stem: normalizedStem,
          explicit: true,
          state: candidateState,
          number: candidateNumber,
          pluralType: candidatePluralType,
          possessor: candidatePossessor || "",
          nounClass: requestNounClass,
          animacy: activeAnimacy,
          subjectPrefix: subjectSource.subjectPrefix || "",
          subjectSuffix: subjectSource.subjectSuffix || "",
          subjectKey: subjectSource.personSubKey || subjectSource.subjectKey || ""
        });
        const result = targetObject.executeNuclearClauseSurfaceRequest(request) || {};
        candidateProbeCache.set(cacheKey, result);
        return result;
      };
      const getPossessorAvailability = (possessorId = "") => {
        const normalizedPossessor = String(possessorId || "");
        if (!normalizedPossessor) {
          return {
            disabled: false,
            availabilityState: "available",
            markingAvailable: true,
            diagnosticIds: ""
          };
        }
        const candidate = probeOrdinaryNncCandidate({
          candidateState: "possessive",
          candidatePossessor: normalizedPossessor
        });
        const possessiveProfile = candidate?.nncBasic?.categoryProfile?.possessiveState || null;
        const markingAvailable = possessiveProfile?.markingAvailable === true && candidate?.supported === true;
        return {
          disabled: !markingAvailable,
          availabilityState: markingAvailable ? "available" : "unavailable",
          markingAvailable,
          diagnosticIds: (candidate?.diagnostics || []).map(entry => entry.id).filter(Boolean).join(",")
        };
      };
      const controlsBlock = targetObject.document.createElement("div");
      controlsBlock.className = "tense-block tense-block--noun-shared-controls tense-block--ordinary-nnc-controls";
      controlsBlock.title = getAndrewsFirstOutputBlockHoverTitle({
        mode: targetObject.TENSE_MODE.sustantivo,
        blockKind: "controles CNN ordinaria"
      });
      if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
        targetObject.applyAndrewsTenseAuthorityDataset(controlsBlock, {
          mode: targetObject.TENSE_MODE.sustantivo,
          blockKind: "controles CNN ordinaria"
        });
      }
      const controlsTitle = targetObject.document.createElement("div");
      controlsTitle.className = "tense-block__title";
      const controlsLabel = targetObject.document.createElement("span");
      controlsLabel.className = "tense-block__label";
      controlsLabel.textContent = targetObject.getToggleLabel("controls", isNawat, "Controles");
      controlsLabel.title = controlsBlock.title;
      controlsTitle.appendChild(controlsLabel);
      const controls = targetObject.document.createElement("div");
      controls.className = "tense-block__controls tense-block__controls--stacked";
      const nounClassToggle = buildToggleControl({
        options: [{
          id: "t",
          label: "t",
          title: "conector t: (...V)t"
        }, {
          id: "ti",
          label: "ti",
          title: "conector ti: (...C)ti"
        }, {
          id: "in",
          label: "in",
          title: "conector in: (...C)in"
        }, {
          id: "zero",
          label: "Ø",
          title: "conector Ø: (...C/V)"
        }].map(entry => ({
          ...entry,
          title: fixtureNounClass && entry.id !== fixtureNounClass ? `${entry.title}; ficha registrada: ${getOrdinaryNncNounClassLabel(fixtureNounClass)}` : entry.title
        })),
        activeId: activeNounClass,
        ariaLabel: "conector num1-num2 de la cláusula nuclear nominal",
        visibleLabel: "Conector num1-num2",
        onSelect: id => {
          targetObject.setOrdinaryNncGenerationState({
            nounClass: id || "zero"
          });
          rerender();
        },
        getTitle: entry => entry.title
      });
      nounClassToggle.toggle.dataset.toggleType = "meta";
      nounClassToggle.toggle.dataset.toggleSlot = "num1-num2";
      controls.appendChild(nounClassToggle.toggle);
      const hasFixtureAnimacy = Boolean(fixtureAnimacy);
      const animacyToggle = buildToggleControl({
        options: [{
          id: "inanimate",
          label: "Inanim",
          title: hasFixtureAnimacy && fixtureAnimacy !== "inanimate" ? "ficha registrada: animado" : "solo sujeto Ø; plural distributivo"
        }, {
          id: "animate",
          label: "Anim",
          title: hasFixtureAnimacy && fixtureAnimacy !== "animate" ? "ficha registrada: inanimado" : "sujeto personal; plural -met o distributivo"
        }],
        activeId: selectedAnimacy,
        ariaLabel: "animacidad de la cláusula nuclear nominal",
        visibleLabel: "Animacidad",
        onSelect: id => {
          targetObject.setOrdinaryNncGenerationState({
            animacy: id,
            subjectKey: id === "animate" ? state.subjectKey : "3sg",
            subjectPrefix: id === "animate" ? state.subjectPrefix : "",
            subjectSuffix: id === "animate" ? state.subjectSuffix : "",
            pluralType: "auto"
          });
          rerender();
        },
        getTitle: entry => entry.title
      });
      animacyToggle.toggle.dataset.toggleType = "meta";
      animacyToggle.toggle.dataset.toggleSlot = "animacy";
      controls.appendChild(animacyToggle.toggle);
      const subjectToggle = buildToggleControl({
        options: (subjectEntries.length ? subjectEntries : [{
          personSubKey: "3sg",
          subjectPrefix: "",
          subjectSuffix: ""
        }]).map(entry => ({
          id: entry.personSubKey || "3sg",
          label: getOrdinaryNncSubjectMarkerLabel(entry),
          title: nounSubjectOptionById.get(entry.id)?.title || targetObject.getSubjectPersonLabelByAgreement(entry.subjectPrefix || "", entry.subjectSuffix || "", isNawat),
          entry
        })),
        activeId: isAnimateNnc ? state.subjectKey || "3sg" : "3sg",
        ariaLabel: "ranura persona1-persona2 de la cláusula nuclear nominal",
        visibleLabel: ANDREWS_RENDERING_TERMS.pers1Pers2,
        onSelect: id => {
          const selected = subjectEntries.find(entry => entry.personSubKey === id) || subjectEntries[0];
          if (!selected) {
            return;
          }
          targetObject.setOrdinaryNncGenerationState({
            subjectKey: selected.personSubKey || "3sg",
            subjectPrefix: selected.subjectPrefix || "",
            subjectSuffix: selected.subjectSuffix || "",
            number: isAnimateNnc ? getSubjectNumber(selected) : state.number
          });
          rerender();
        },
        getTitle: entry => entry.title
      });
      controls.appendChild(subjectToggle.toggle);
      const possessorOptions = [{
        id: "",
        label: "Ø",
        title: "predicado absolutivo: poseedor Ø"
      }, ...targetObject.POSSESSIVE_PREFIXES.map(entry => entry.value).filter(Boolean).map(value => ({
        id: value,
        label: value,
        title: `predicado posesivo: ${targetObject.getPossessorPersonLabel(value, isNawat) || value}`
      }))].map(entry => {
        const availability = getPossessorAvailability(entry.id);
        const isSelectedUnsupported = Boolean(availability.disabled && state.state === "possessive" && (state.possessor || "nu") === entry.id);
        return {
          ...entry,
          ...availability,
          title: availability.disabled ? `${entry.title}; no disponible para este estado (${availability.diagnosticIds || "sin diagnostico"})` : entry.title,
          selectedUnsupported: isSelectedUnsupported
        };
      });
      const possessorToggle = buildToggleControl({
        options: possessorOptions,
        activeId: state.state === "possessive" ? state.possessor || "nu" : "",
        ariaLabel: "Estado/poseedor",
        visibleLabel: "Estado/poseedor",
        onSelect: id => {
          targetObject.setOrdinaryNncGenerationState({
            state: id ? "possessive" : "absolutive",
            possessor: id || ""
          });
          rerender();
        },
        getTitle: entry => entry.title,
        getIsDisabled: entry => entry.disabled === true
      });
      possessorToggle.toggle.dataset.toggleType = "meta";
      possessorToggle.toggle.dataset.toggleSlot = "possessor";
      controls.appendChild(possessorToggle.toggle);
      if (!isAnimateNnc) {
        const numberToggle = buildToggleControl({
          options: [{
            id: "singular",
            label: "Comun",
            title: "referencia singular/comun"
          }, {
            id: "plural",
            label: "Distr",
            title: "referencia distributiva no animada"
          }],
          activeId: state.number,
          ariaLabel: "referencia nominal",
          visibleLabel: "Referencia",
          onSelect: id => {
            targetObject.setOrdinaryNncGenerationState({
              number: id,
              pluralType: id === "plural" ? "distributive" : "auto",
              subjectKey: "3sg",
              subjectPrefix: "",
              subjectSuffix: ""
            });
            rerender();
          },
          getTitle: entry => entry.title
        });
        controls.appendChild(numberToggle.toggle);
      }
      if (isAnimateNnc && state.number === "plural") {
        const pluralTypeToggle = buildToggleControl({
          options: [{
            id: "count",
            label: "-met",
            title: "plural animado comun"
          }, {
            id: "distributive",
            label: "Distr",
            title: "plural animado distributivo"
          }],
          activeId: activePluralType,
          ariaLabel: "referencia plural animada",
          visibleLabel: "Referencia plural",
          onSelect: id => {
            targetObject.setOrdinaryNncGenerationState({
              pluralType: id || "auto"
            });
            rerender();
          },
          getTitle: entry => entry.title
        });
        controls.appendChild(pluralTypeToggle.toggle);
      }
      controlsBlock.appendChild(controlsTitle);
      controlsBlock.appendChild(controls);
      objSection.insertBefore(controlsBlock, grid);
      const block = targetObject.document.createElement("div");
      block.className = "tense-block tense-block--ordinary-nnc";
      block.dataset.tenseBlock = "ordinary-nnc";
      block.title = getAndrewsFirstOutputBlockHoverTitle({
        mode: targetObject.TENSE_MODE.sustantivo,
        blockKind: "CNN ordinaria"
      });
      if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
        targetObject.applyAndrewsTenseAuthorityDataset(block, {
          mode: targetObject.TENSE_MODE.sustantivo,
          blockKind: "CNN ordinaria"
        });
      }
      const title = targetObject.document.createElement("div");
      title.className = "tense-block__title";
      const label = targetObject.document.createElement("span");
      label.className = "tense-block__label";
      label.textContent = "CNN ordinaria";
      label.title = block.title;
      title.appendChild(label);
      block.appendChild(title);
      const list = targetObject.document.createElement("div");
      list.className = "conjugation-list";
      block.appendChild(list);
      grid.appendChild(block);
      if (!normalizedStem) {
        const placeholder = targetObject.document.createElement("div");
        placeholder.className = "tense-placeholder";
        placeholder.textContent = targetObject.getPlaceholderLabel("conjugations", isNawat, "Ingresa una base nominal para ver la cláusula.");
        list.appendChild(placeholder);
        return;
      }
      if (!fixtureProbe && !activeNounClass) {
        const placeholder = targetObject.document.createElement("div");
        placeholder.className = "tense-placeholder";
        placeholder.textContent = "Selecciona un conector de número para saber su salida.";
        list.appendChild(placeholder);
        return;
      }
      if (!fixtureProbe && !selectedAnimacy) {
        const placeholder = targetObject.document.createElement("div");
        placeholder.className = "tense-placeholder";
        placeholder.textContent = "Selecciona una animacidad para saber su salida.";
        list.appendChild(placeholder);
        return;
      }
      const request = targetObject.buildOrdinaryNncGenerateWordRequest({
        stem: normalizedStem,
        nounClass: requestNounClass
      });
      const result = targetObject.executeNuclearClauseSurfaceRequest(request) || {};
      const row = targetObject.document.createElement("div");
      row.className = "conjugation-row";
      row.dataset.generationRoute = result.generationRoute || "";
      row.dataset.pluralType = result.pluralType || "";
      applyGrammarFrameRouteDataset(row, result);
      const rowLabel = targetObject.document.createElement("div");
      rowLabel.className = "conjugation-label";
      const personLabel = targetObject.document.createElement("div");
      personLabel.className = "person-label";
      const rowSubject = result.subject || {
        subjectPrefix: state.subjectPrefix || "",
        subjectSuffix: state.subjectSuffix || ""
      };
      personLabel.textContent = `${ANDREWS_RENDERING_TERMS.pers1Pers2} ${result.nncBasic?.subject?.affixLabel || getOrdinaryNncSubjectMarkerLabel(rowSubject)}`;
      personLabel.title = targetObject.getSubjectPersonLabelByAgreement(rowSubject.subjectPrefix || "", rowSubject.subjectSuffix || "", isNawat);
      const personSub = targetObject.document.createElement("div");
      personSub.className = "person-sub";
      const rowNounClassLabel = getOrdinaryNncNounClassLabel(result.nounClass || activeNounClass);
      const rowCategoryProfile = result.nncBasic?.categoryProfile || null;
      const rowStateSlot = result.nncBasic?.predicate?.stateSlot || result.clauseFrame?.predicate?.stateSlot || result.clauseFrame?.stateSlot || null;
      const rowPredicateFormula = result.nncBasic?.predicate?.formula || result.predicateFormula || result.clauseFrame?.predicate?.formula || "";
      const rowFormulaSlots = result.nncBasic?.formulaSlots || result.clauseFrame?.formulaSlots || null;
      const rowFormulaPair = getFormulaSurfacePairForGeneratedOutput(result);
      const rowFormulaEcho = rowFormulaPair?.targetFormulaEcho || (typeof targetObject.buildOrdinaryNncFormulaEchoFromSlots === "function" ? targetObject.buildOrdinaryNncFormulaEchoFromSlots(rowFormulaSlots) : result.nncBasic?.formulaEcho || result.clauseFrame?.formulaEcho || "");
      const rowConnectorSlot = rowFormulaSlots?.num1Num2 || null;
      const rowConnectorSurface = rowConnectorSlot ? resolveNominalNum1Num2Surface(rowConnectorSlot, rowConnectorSlot.connector || rowConnectorSlot.surface || "") : "";
      const rowConnectorSlotLabel = rowConnectorSlot ? `${rowConnectorSlot.slot || ANDREWS_RENDERING_TERMS.num1Num2}: ${rowConnectorSurface || "Ø"}` : "";
      const rowPredicateStateLabel = rowCategoryProfile?.predicateState?.label || (rowStateSlot?.state === "possessive" ? "posesivo" : "absolutivo");
      const rowAnimacyLabel = rowCategoryProfile?.animacy?.label || (result.animacy === "animate" ? "animado" : "inanimado");
      const rowReferenceLabel = rowCategoryProfile?.reference?.label || (state.number === "plural" ? "plural" : "singular");
      const rowPossessiveState = rowCategoryProfile?.possessiveState || null;
      const rowPossessiveMarkingLabel = rowPossessiveState?.isPossessive ? `marcacion posesiva: ${rowPossessiveState.markingAvailable ? "disponible" : "no disponible"}` : "";
      personSub.textContent = appendGrammarFrameSubLabels([...buildNuclearClauseShellSubLabels(result.nuclearClauseShell, result), ...buildSentenceLayerSubLabels(result.sentenceLayer), rowFormulaEcho ? `${ANDREWS_RENDERING_TERMS.nncFormula}: ${rowFormulaEcho}` : "", rowPredicateFormula, rowNounClassLabel ? `clase sustantiva ${rowNounClassLabel}` : "", rowConnectorSlotLabel, `${ANDREWS_RENDERING_TERMS.predicateState}: ${rowPredicateStateLabel}`, `animacidad: ${rowAnimacyLabel}`, `referencia: ${rowReferenceLabel}`, rowPossessiveMarkingLabel, state.state === "possessive" ? `poseedor ${result.possessor?.prefix || state.possessor || "nu"}` : ""].filter(Boolean).join(" · "), result, {
        maxDiagnostics: 1
      });
      renderGeneratedOutputSlotChips(personSub, result);
      rowLabel.appendChild(personLabel);
      rowLabel.appendChild(personSub);
      const value = targetObject.document.createElement("div");
      value.className = "conjugation-value";
      const surfaceDisplay = getConjugationDisplaySurface(result);
      if (result.supported === true) {
        const displayValue = typeof targetObject.normalizeConjugationDisplayText === "function" ? targetObject.normalizeConjugationDisplayText(targetObject.formatConjugationDisplay(surfaceDisplay)) : String(targetObject.formatConjugationDisplay(surfaceDisplay) || "").trim();
        if (displayValue) {
          value.textContent = displayValue;
        } else {
          value.textContent = typeof targetObject.getConjugationNoOutputDisplay === "function" ? targetObject.getConjugationNoOutputDisplay({
            result,
            diagnostics: result.diagnostics || []
          }) : "Sin salida para esta configuración.";
          value.classList.add("conjugation-error", "conjugation-value--no-output");
        }
      } else {
        value.textContent = typeof targetObject.getConjugationNoOutputDisplay === "function" ? targetObject.getConjugationNoOutputDisplay({
          result,
          diagnostics: result.diagnostics || [],
          diagnosticIds: (result.diagnostics || []).map(entry => entry.id).filter(Boolean),
          shouldMaskRow: true,
          isErrorRow: true
        }, "Sin salida nominal para esta configuración.") : result.diagnostics?.[0]?.message || "Sin salida nominal para esta configuración.";
        value.classList.add("conjugation-error");
        value.classList.add("conjugation-value--no-output");
        row.dataset.availabilityState = targetObject.CONJUGATION_AVAILABILITY_STATE.impossible;
        row.dataset.diagnosticIds = (result.diagnostics || []).map(entry => entry.id).filter(Boolean).join(",");
      }
      let ordinaryNncConversionActions = null;
      const ensureOrdinaryNncConversionActions = () => {
        if (ordinaryNncConversionActions) {
          return ordinaryNncConversionActions;
        }
        if (!surfaceDisplay) {
          return null;
        }
        value.replaceChildren();
        value.classList.add("conjugation-value--conversion-picker");
        const surfaceText = targetObject.document.createElement("span");
        surfaceText.className = "conjugation-conversion-surface";
        appendConjugationConversionSurfaceLines(surfaceText, surfaceDisplay, result);
        ordinaryNncConversionActions = createConjugationConversionActionsContainer();
        value.append(surfaceText, ordinaryNncConversionActions);
        applyConjugationConversionColumnLayout(value, surfaceText, ordinaryNncConversionActions);
        return ordinaryNncConversionActions;
      };
      const renderOrdinaryNncAdjectivalFunctionContinuation = () => {
        if (result.supported !== true || !surfaceDisplay || rowStateSlot?.state === "possessive" || typeof targetObject.buildStructuredOrdinaryAdjectivalNncFunctionOutput !== "function" || typeof targetObject.applyAdjectivalNncFunctionToVerbEntry !== "function") {
          return false;
        }
        const sourceFormulaSlots = getGeneratedOutputStructuredContinuationFormulaSlots(result);
        const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(result, 0);
        const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(result, sourceSelectedVariant, {
          role: "source",
          unit: "NNC"
        });
        if (!sourceFormulaSlots || !sourceSelectedVariant || !sourceContinuationFrame) {
          return false;
        }
        const contract = targetObject.buildStructuredOrdinaryAdjectivalNncFunctionOutput({
          sourceContinuationFrame,
          sourceFormulaSlots,
          state: "absolutive",
          role: "modifier-candidate"
        });
        if (!contract?.supported) {
          return false;
        }
        const targetSelectedVariant = getGeneratedOutputSelectedRealizationVariant(contract, 0);
        const targetContinuationFrame = buildGeneratedOutputTypedContinuationFrame(contract, targetSelectedVariant, {
          role: "target",
          unit: "NNC"
        });
        const targetSurface = targetSelectedVariant?.surface || "";
        if (!targetSurface || !targetSelectedVariant || !targetContinuationFrame) {
          return false;
        }
        const actions = ensureOrdinaryNncConversionActions();
        if (!actions) {
          return false;
        }
        const continuationIdentityKey = getGeneratedOutputContinuationIdentityKey([result, contract], {
          namespace: "ordinary-nnc-adjectival-function-continuation",
          sourceUnit: "ordinary-nnc",
          sourceVariantId: sourceSelectedVariant?.variantId || "",
          targetVariantId: targetSelectedVariant?.variantId || "adjectival-function"
        });
        if (!continuationIdentityKey) {
          return false;
        }
        const alreadyRendered = Array.from(actions.querySelectorAll("[data-ordinary-nnc-adjectival-function-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
        if (alreadyRendered) {
          return true;
        }
        const continueButton = targetObject.document.createElement("button");
        continueButton.type = "button";
        continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-adjetivo", "calc-guidance__chip--ordinary-nnc-adjectival-function"].join(" ");
        continueButton.dataset.ordinaryNncAdjectivalFunctionContinuation = "true";
        continueButton.dataset.targetSurface = targetSurface;
        if (sourceSelectedVariant?.variantId) {
          continueButton.dataset.sourceSelectedVariantId = sourceSelectedVariant.variantId;
        }
        if (targetSelectedVariant?.variantId) {
          continueButton.dataset.targetSelectedVariantId = targetSelectedVariant.variantId;
        }
        applyGeneratedOutputContinuationIdentityDataset(continueButton, [result, contract], {
          namespace: "ordinary-nnc-adjectival-function-continuation",
          sourceUnit: "ordinary-nnc",
          sourceVariantId: sourceSelectedVariant?.variantId || "",
          targetVariantId: targetSelectedVariant?.variantId || "adjectival-function"
        });
        applyGrammarFrameRouteDataset(continueButton, contract);
        const continueLabel = targetObject.document.createElement("span");
        continueLabel.className = "calc-guidance__chip-label";
        continueLabel.textContent = `→ ${targetSurface}`;
        continueButton.appendChild(continueLabel);
        const continueSubLabel = targetObject.document.createElement("span");
        continueSubLabel.className = "calc-guidance__chip-sublabel";
        continueSubLabel.textContent = "Adjetival nominal";
        continueButton.appendChild(continueSubLabel);
        continueButton.title = [`#3 salida nominal: ${targetSurface}`, "Andrews 40.1/40.3: cláusula nominal absolutiva en función adjetival", rowFormulaEcho ? `${ANDREWS_RENDERING_TERMS.nncFormula}: ${rowFormulaEcho}` : "", "no crea modificación lecciones 42-43"].filter(Boolean).join("; ");
        continueButton.addEventListener("click", () => {
          targetObject.applyAdjectivalNncFunctionToVerbEntry({
            formation: "ordinary-absolutive",
            grammarFrame: contract.grammarFrame || contract.frames || null,
            sourceSelectedVariant,
            targetSelectedVariant,
            sourceContinuationFrame,
            targetContinuationFrame,
            requireCanonicalFormulaRecords: true
          });
        });
        appendContinuationAction(actions, continueButton);
        return true;
      };
      const renderOrdinaryNncOwnerhoodContinuations = () => {
        if (result.supported !== true || typeof targetObject.buildOrdinaryNounOwnerhoodContinuationContract !== "function") {
          return false;
        }
        const nounStem = String(result.stem || result.nncBasic?.predicate?.stem || "").trim();
        const nounClass = String(result.nounClass || activeNounClass || "").trim();
        if (!nounStem || !nounClass) {
          return false;
        }
        const matrixInventory = typeof targetObject.getOrdinaryNounOwnerhoodMatrixInventory === "function" ? targetObject.getOrdinaryNounOwnerhoodMatrixInventory() : [];
        const contracts = matrixInventory.map(matrixSpec => targetObject.buildOrdinaryNounOwnerhoodContinuationContract({
          nounStem,
          nounClass,
          sourceSurface: surfaceDisplay,
          sourceKind: result.source?.sourceKind || "",
          sourceFormulaSlots: rowFormulaSlots,
          sourceFormulaEcho: rowFormulaEcho,
          matrixRoot: matrixSpec.nawatRoot || "",
          ownerhoodKind: matrixSpec.ownerhoodKind || "ownerhood"
        })).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensureOrdinaryNncConversionActions();
        if (!actions) {
          return false;
        }
        const getOwnerhoodPreviewSurface = (ownerhoodVerbInput = "") => {
          if (!ownerhoodVerbInput || typeof targetObject.getCachedSilentGenerateWord !== "function") {
            return "";
          }
          const preview = targetObject.getCachedSilentGenerateWord({
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: targetObject.TENSE_MODE.verbo,
              derivationMode: targetObject.DERIVATION_MODE.active,
              voiceMode: targetObject.VOICE_MODE.active
            },
            posicionesFormula: {
              pers1: "",
              obj1: "",
              tronco: ownerhoodVerbInput,
              pers2: "",
              num2: "",
              poseedor: "",
              tiempo: "pasado-remoto"
            }
          }) || {};
          const surface = getPrimaryConjugationSurface(preview);
          return surface && surface !== "—" ? surface : "";
        };
        const applyOrdinaryNounOwnerhoodContract = contract => {
          if (typeof targetObject.applyOrdinaryNounOwnerhoodRootsToVerbEntry === "function") {
            targetObject.applyOrdinaryNounOwnerhoodRootsToVerbEntry({
              nounStem: contract.nounStem,
              nounClass: contract.nounClass,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              ownerhoodVerbInput: contract.ownerhoodVerbInput,
              sourceFormulaSlots: contract.sourceFormulaSlots || rowFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || rowFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        contracts.forEach(contract => {
          const previewSurface = getOwnerhoodPreviewSurface(contract.ownerhoodVerbInput);
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.ordinaryNncOwnerhoodContinuation = "true";
          continueButton.dataset.ownerhoodVerbInput = contract.ownerhoodVerbInput;
          continueButton.dataset.nounStem = contract.nounStem;
          continueButton.dataset.ownerhoodMatrixRoot = contract.matrixRoot;
          continueButton.dataset.ownerhoodMatrixId = contract.matrix?.id || "";
          continueButton.dataset.ownerhoodKind = contract.ownerhoodKind || "";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || contract.ownerhoodVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida nominal: ${contract.sourceSurface || surfaceDisplay}`, `raíz nominal: ${contract.nounStem}`, `clase: ${contract.nounClass}`, `matriz de posesión: ${contract.matrixRoot}`, contract.ownerhoodKind ? `tipo: ${contract.ownerhoodKind}` : "", contract.matrix?.classicalMatrix ? `${contract.grammarSource}: ${contract.matrix.classicalMatrix}` : "", `V pretérito: ${contract.ownerhoodVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyOrdinaryNounOwnerhoodContract(contract);
          });
          appendContinuationAction(actions, continueButton);
        });
        return true;
      };
      const renderOrdinaryNncIncludedPossessorContinuations = () => {
        if (result.supported !== true || typeof targetObject.previewNawatDenominalAndrewsIncludedPossessorRouteFromOrdinaryNncOutput !== "function" || typeof targetObject.activateNawatDenominalAndrewsContractRouteTarget !== "function") {
          return false;
        }
        const includedPreview = targetObject.previewNawatDenominalAndrewsIncludedPossessorRouteFromOrdinaryNncOutput(result);
        const routes = Array.isArray(includedPreview?.routePreview?.routes) ? includedPreview.routePreview.routes.filter(route => route?.finiteGenerationContractAvailable === true) : [];
        if (!routes.length) {
          return false;
        }
        const actions = ensureOrdinaryNncConversionActions();
        if (!actions) {
          return false;
        }
        const targetTense = "presente";
        routes.forEach(route => {
          const targetInput = String(route.targetInputValue || route.targetInput || route.targetVerbStem || "").trim();
          if (!targetInput) {
            return;
          }
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo", "calc-guidance__chip--denominal-andrews", "is-source-satisfied", "is-possessive-source", "is-included-possessor-source"].join(" ");
          continueButton.dataset.denominalAndrewsContractRouteContinuation = "true";
          continueButton.dataset.sourceEvidenceSatisfied = "true";
          continueButton.dataset.sourceEvidenceFromOrdinaryNnc = "true";
          continueButton.dataset.possessorIncludedInsideVerbstem = "true";
          continueButton.dataset.possessiveCaseNotObject = "true";
          continueButton.dataset.contractId = route.contractId || "";
          continueButton.dataset.routeTemplateId = route.routeTemplateId || "";
          if (route.executableRuleId) {
            continueButton.dataset.executableRuleId = route.executableRuleId;
            continueButton.classList.add("calc-guidance__chip--andrews-rule-executable");
          }
          continueButton.dataset.targetInput = targetInput;
          continueButton.dataset.targetTense = targetTense;
          applyGrammarFrameRouteDataset(continueButton, route);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetInput}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = [`Andrews ${route.range || "54.3"}`, route.targetStemClass ? `Clase ${route.targetStemClass}` : "", "nominal posesivo", "poseedor interno", targetTense].filter(Boolean).join(" · ");
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`#3 salida nominal: ${surfaceDisplay}`, `contrato: ${route.contractId || ""}`, route.executableRuleId ? `regla: ${route.executableRuleId}` : "", `ruta: ${route.routeTemplateId || ""}`, `entrada verbal: ${targetInput}`, "el poseedor queda dentro del tronco", "no se convierte en objeto", "no crea ficha lexical"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            setActiveNawatDenominalAndrewsContractRouteRenderContext(route);
            targetObject.activateNawatDenominalAndrewsContractRouteTarget(route, {
              targetTense,
              render: true,
              anchorElement: continueButton
            });
          });
          appendContinuationAction(actions, continueButton);
        });
        return true;
      };
      const renderOrdinaryNncInceptiveTiContinuations = () => {
        if (result.supported !== true || typeof targetObject.previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput !== "function" || typeof targetObject.activateNawatDenominalAndrewsContractRouteTarget !== "function") {
          return false;
        }
        const inceptivePreview = targetObject.previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput(result);
        const routes = Array.isArray(inceptivePreview?.routePreview?.routes) ? inceptivePreview.routePreview.routes.filter(route => route?.finiteGenerationContractAvailable === true) : [];
        if (!routes.length) {
          return false;
        }
        const actions = ensureOrdinaryNncConversionActions();
        if (!actions) {
          return false;
        }
        const targetTense = "presente";
        routes.forEach(route => {
          const targetInput = String(route.targetInputValue || route.targetInput || route.targetVerbStem || "").trim();
          if (!targetInput) {
            return;
          }
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo", "calc-guidance__chip--denominal-andrews", "is-source-satisfied", "is-absolutive-source"].join(" ");
          continueButton.dataset.denominalAndrewsContractRouteContinuation = "true";
          continueButton.dataset.sourceEvidenceSatisfied = "true";
          continueButton.dataset.sourceEvidenceFromOrdinaryNnc = "true";
          continueButton.dataset.contractId = route.contractId || "";
          continueButton.dataset.routeTemplateId = route.routeTemplateId || "";
          if (route.executableRuleId) {
            continueButton.dataset.executableRuleId = route.executableRuleId;
            continueButton.classList.add("calc-guidance__chip--andrews-rule-executable");
          }
          continueButton.dataset.targetInput = targetInput;
          continueButton.dataset.targetTense = targetTense;
          applyGrammarFrameRouteDataset(continueButton, route);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetInput}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = [`Andrews ${route.range || "54.2.1"}`, route.targetStemClass ? `Clase ${route.targetStemClass}` : "", "nominal absolutivo", targetTense].filter(Boolean).join(" · ");
          continueButton.appendChild(continueSubLabel);
          const sourceEvidence = inceptivePreview?.sourceEvidence || {};
          continueButton.title = [`#3 salida nominal: ${sourceEvidence.sourceSurface || surfaceDisplay}`, `predicado: ${sourceEvidence.sourcePredicateStem || route.sourceStem || ""}`, `contrato: ${route.contractId || ""}`, route.executableRuleId ? `regla: ${route.executableRuleId}` : "", `ruta: ${route.routeTemplateId || ""}`, `entrada verbal: ${targetInput}`, "ti se adjunta al predicado absolutivo", "no crea ficha lexical"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            setActiveNawatDenominalAndrewsContractRouteRenderContext(route);
            targetObject.activateNawatDenominalAndrewsContractRouteTarget(route, {
              targetTense,
              render: true,
              anchorElement: continueButton
            });
          });
          appendContinuationAction(actions, continueButton);
        });
        return true;
      };
      const renderOrdinaryNncInceptiveHuiContinuations = () => {
        if (result.supported !== true || typeof targetObject.previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput !== "function" || typeof targetObject.activateNawatDenominalAndrewsContractRouteTarget !== "function") {
          return false;
        }
        const inceptivePreview = targetObject.previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput(result);
        const routes = Array.isArray(inceptivePreview?.routePreview?.routes) ? inceptivePreview.routePreview.routes.filter(route => route?.finiteGenerationContractAvailable === true) : [];
        if (!routes.length) {
          return false;
        }
        const actions = ensureOrdinaryNncConversionActions();
        if (!actions) {
          return false;
        }
        const targetTense = "presente";
        routes.forEach(route => {
          const targetInput = String(route.targetInputValue || route.targetInput || route.targetVerbStem || "").trim();
          if (!targetInput) {
            return;
          }
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo", "calc-guidance__chip--denominal-andrews", "is-source-satisfied", "is-absolutive-source"].join(" ");
          continueButton.dataset.denominalAndrewsContractRouteContinuation = "true";
          continueButton.dataset.sourceEvidenceSatisfied = "true";
          continueButton.dataset.sourceEvidenceFromOrdinaryNnc = "true";
          continueButton.dataset.contractId = route.contractId || "";
          continueButton.dataset.routeTemplateId = route.routeTemplateId || "";
          if (route.executableRuleId) {
            continueButton.dataset.executableRuleId = route.executableRuleId;
            continueButton.classList.add("calc-guidance__chip--andrews-rule-executable");
          }
          continueButton.dataset.targetInput = targetInput;
          continueButton.dataset.targetTense = targetTense;
          applyGrammarFrameRouteDataset(continueButton, route);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetInput}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = [`Andrews ${route.range || "54.2.2"}`, route.targetStemClass ? `Clase ${route.targetStemClass}` : "", "nominal absolutivo", targetTense].filter(Boolean).join(" · ");
          continueButton.appendChild(continueSubLabel);
          const sourceEvidence = inceptivePreview?.sourceEvidence || {};
          continueButton.title = [`#3 salida nominal: ${sourceEvidence.sourceSurface || surfaceDisplay}`, `predicado: ${sourceEvidence.sourcePredicateStem || route.sourceStem || ""}`, `contrato: ${route.contractId || ""}`, route.executableRuleId ? `regla: ${route.executableRuleId}` : "", `ruta: ${route.routeTemplateId || ""}`, `entrada verbal: ${targetInput}`, "hui/wi se adjunta al predicado absolutivo", "no crea ficha lexical"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            setActiveNawatDenominalAndrewsContractRouteRenderContext(route);
            targetObject.activateNawatDenominalAndrewsContractRouteTarget(route, {
              targetTense,
              render: true,
              anchorElement: continueButton
            });
          });
          appendContinuationAction(actions, continueButton);
        });
        return true;
      };
      const renderOrdinaryNncRootPlusYaContinuations = () => {
        if (result.supported !== true || typeof targetObject.previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput !== "function" || typeof targetObject.activateNawatDenominalAndrewsContractRouteTarget !== "function") {
          return false;
        }
        const rootPlusYaPreview = targetObject.previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput(result);
        const routes = Array.isArray(rootPlusYaPreview?.routePreview?.routes) ? rootPlusYaPreview.routePreview.routes.filter(route => route?.finiteGenerationContractAvailable === true) : [];
        if (!routes.length) {
          return false;
        }
        const actions = ensureOrdinaryNncConversionActions();
        if (!actions) {
          return false;
        }
        const targetTense = "presente";
        routes.forEach(route => {
          const targetInput = String(route.targetInputValue || route.targetInput || route.targetVerbStem || "").trim();
          if (!targetInput) {
            return;
          }
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo", "calc-guidance__chip--denominal-andrews", "is-source-satisfied", "is-root-source"].join(" ");
          continueButton.dataset.denominalAndrewsContractRouteContinuation = "true";
          continueButton.dataset.sourceEvidenceSatisfied = "true";
          continueButton.dataset.sourceEvidenceFromOrdinaryNnc = "true";
          continueButton.dataset.contractId = route.contractId || "";
          continueButton.dataset.routeTemplateId = route.routeTemplateId || "";
          if (route.executableRuleId) {
            continueButton.dataset.executableRuleId = route.executableRuleId;
            continueButton.classList.add("calc-guidance__chip--andrews-rule-executable");
          }
          continueButton.dataset.targetInput = targetInput;
          continueButton.dataset.targetTense = targetTense;
          applyGrammarFrameRouteDataset(continueButton, route);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetInput}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = [`Andrews ${route.range || "54.2.3"}`, route.targetStemClass ? `Clase ${route.targetStemClass}` : "", "raíz nominal", targetTense].filter(Boolean).join(" · ");
          continueButton.appendChild(continueSubLabel);
          const sourceEvidence = rootPlusYaPreview?.sourceEvidence || {};
          continueButton.title = [`#3 salida nominal: ${sourceEvidence.sourceSurface || surfaceDisplay}`, `predicado: ${sourceEvidence.sourcePredicateStem || route.sourceStem || ""}`, `contrato: ${route.contractId || ""}`, route.executableRuleId ? `regla: ${route.executableRuleId}` : "", `ruta: ${route.routeTemplateId || ""}`, `entrada verbal: ${targetInput}`, "ya se adjunta al tronco nominal en rango raíz", "no crea ficha lexical"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            setActiveNawatDenominalAndrewsContractRouteRenderContext(route);
            targetObject.activateNawatDenominalAndrewsContractRouteTarget(route, {
              targetTense,
              render: true,
              anchorElement: continueButton
            });
          });
          appendContinuationAction(actions, continueButton);
        });
        return true;
      };
      const renderOrdinaryNncInceptiveAContinuations = () => {
        if (result.supported !== true || typeof targetObject.previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput !== "function" || typeof targetObject.activateNawatDenominalAndrewsContractRouteTarget !== "function") {
          return false;
        }
        const inceptiveAPreview = targetObject.previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput(result);
        const routes = Array.isArray(inceptiveAPreview?.routePreview?.routes) ? inceptiveAPreview.routePreview.routes.filter(route => route?.finiteGenerationContractAvailable === true) : [];
        if (!routes.length) {
          return false;
        }
        const actions = ensureOrdinaryNncConversionActions();
        if (!actions) {
          return false;
        }
        const targetTense = "presente";
        routes.forEach(route => {
          const targetInput = String(route.targetInputValue || route.targetInput || route.targetVerbStem || "").trim();
          if (!targetInput) {
            return;
          }
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo", "calc-guidance__chip--denominal-andrews", "is-source-satisfied", "is-absolutive-source", "is-limited-use"].join(" ");
          continueButton.dataset.denominalAndrewsContractRouteContinuation = "true";
          continueButton.dataset.sourceEvidenceSatisfied = "true";
          continueButton.dataset.sourceEvidenceFromOrdinaryNnc = "true";
          continueButton.dataset.limitedUse = "true";
          continueButton.dataset.notCausativeA = "true";
          continueButton.dataset.contractId = route.contractId || "";
          continueButton.dataset.routeTemplateId = route.routeTemplateId || "";
          if (route.executableRuleId) {
            continueButton.dataset.executableRuleId = route.executableRuleId;
            continueButton.classList.add("calc-guidance__chip--andrews-rule-executable");
          }
          continueButton.dataset.targetInput = targetInput;
          continueButton.dataset.targetTense = targetTense;
          applyGrammarFrameRouteDataset(continueButton, route);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetInput}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = [`Andrews ${route.range || "54.2.4"}`, route.targetStemClass ? `Clase ${route.targetStemClass}` : "", "nominal absolutivo", "uso limitado", targetTense].filter(Boolean).join(" · ");
          continueButton.appendChild(continueSubLabel);
          const sourceEvidence = inceptiveAPreview?.sourceEvidence || {};
          continueButton.title = [`#3 salida nominal: ${sourceEvidence.sourceSurface || surfaceDisplay}`, `predicado: ${sourceEvidence.sourcePredicateStem || route.sourceStem || ""}`, `contrato: ${route.contractId || ""}`, route.executableRuleId ? `regla: ${route.executableRuleId}` : "", `ruta: ${route.routeTemplateId || ""}`, `entrada verbal: ${targetInput}`, "a inceptiva/estativa se adjunta al tronco nominal", "uso limitado", "no es a causativa", "Clase C intransitiva", "no crea ficha lexical"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            setActiveNawatDenominalAndrewsContractRouteRenderContext(route);
            targetObject.activateNawatDenominalAndrewsContractRouteTarget(route, {
              targetTense,
              render: true,
              anchorElement: continueButton
            });
          });
          appendContinuationAction(actions, continueButton);
        });
        return true;
      };
      const renderOrdinaryNncPossessionTiContinuations = () => {
        if (result.supported !== true || typeof targetObject.previewNawatDenominalAndrewsPossessionTiRouteFromOrdinaryNncOutput !== "function" || typeof targetObject.activateNawatDenominalAndrewsContractRouteTarget !== "function") {
          return false;
        }
        const possessionPreview = targetObject.previewNawatDenominalAndrewsPossessionTiRouteFromOrdinaryNncOutput(result);
        const routes = Array.isArray(possessionPreview?.routePreview?.routes) ? possessionPreview.routePreview.routes.filter(route => route?.finiteGenerationContractAvailable === true) : [];
        if (!routes.length) {
          return false;
        }
        const actions = ensureOrdinaryNncConversionActions();
        if (!actions) {
          return false;
        }
        const targetTense = "presente";
        routes.forEach(route => {
          const targetInput = String(route.targetInputValue || route.targetInput || route.targetVerbStem || "").trim();
          if (!targetInput) {
            return;
          }
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo", "calc-guidance__chip--denominal-andrews", "is-nounstem-source"].join(" ");
          continueButton.dataset.denominalAndrewsContractRouteContinuation = "true";
          continueButton.dataset.sourceEvidenceFromOrdinaryNnc = "true";
          continueButton.dataset.contractId = route.contractId || "";
          continueButton.dataset.routeTemplateId = route.routeTemplateId || "";
          if (route.executableRuleId) {
            continueButton.dataset.executableRuleId = route.executableRuleId;
            continueButton.classList.add("calc-guidance__chip--andrews-rule-executable");
          }
          continueButton.dataset.targetInput = targetInput;
          continueButton.dataset.targetTense = targetTense;
          applyGrammarFrameRouteDataset(continueButton, route);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetInput}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = [`Andrews ${route.range || "54.4"}`, route.targetStemClass ? `Clase ${route.targetStemClass}` : "", "tronco nominal", targetTense].filter(Boolean).join(" · ");
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`#3 salida nominal: ${surfaceDisplay}`, `contrato: ${route.contractId || ""}`, route.executableRuleId ? `regla: ${route.executableRuleId}` : "", `ruta: ${route.routeTemplateId || ""}`, `entrada verbal: ${targetInput}`, "ti de posesión enfoca el tronco nominal", "no forma deverbal ya", "no crea ficha lexical"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            setActiveNawatDenominalAndrewsContractRouteRenderContext(route);
            targetObject.activateNawatDenominalAndrewsContractRouteTarget(route, {
              targetTense,
              render: true,
              anchorElement: continueButton
            });
          });
          appendContinuationAction(actions, continueButton);
        });
        return true;
      };
      renderOrdinaryNncAdjectivalFunctionContinuation();
      renderOrdinaryNncOwnerhoodContinuations();
      renderOrdinaryNncInceptiveTiContinuations();
      renderOrdinaryNncInceptiveHuiContinuations();
      renderOrdinaryNncRootPlusYaContinuations();
      renderOrdinaryNncInceptiveAContinuations();
      renderOrdinaryNncPossessionTiContinuations();
      renderOrdinaryNncIncludedPossessorContinuations();
      row.appendChild(rowLabel);
      row.appendChild(value);
      list.appendChild(row);
    }
    function renderActiveConjugations({
      verb,
      objectPrefix,
      onlyTense = null,
      tense = null,
      predicateNominalSourceTense = ""
    }) {
      let renderVerb = resolveRenderableVerbValue(verb);
      let renderObjectPrefix = objectPrefix;
      const tenseOverride = onlyTense || tense || "";
      const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
      const activeTenseMode = targetObject.getActiveTenseMode();
      renderOutputJourneyStrip();
      const selectedFunctionTense = selectionState.tenseValue || tenseOverride || "";
      const activeFormalTenseMode = typeof targetObject.getActiveNawatTenseModeForCurrentSelection === "function" ? targetObject.getActiveNawatTenseModeForCurrentSelection() : activeTenseMode;
      const isFormalCnvAdjectivalTense = activeFormalTenseMode === targetObject.TENSE_MODE.verbo && typeof targetObject.isFormalCnvFunctionTense === "function" && targetObject.isFormalCnvFunctionTense(selectedFunctionTense) && selectedFunctionTense !== "pasado-remoto-adverbio-activo";
      const isFormalCnvAdverbialTense = activeFormalTenseMode === targetObject.TENSE_MODE.verbo && selectedFunctionTense === "pasado-remoto-adverbio-activo";
      const isFormalCnnAdjectivalTense = activeFormalTenseMode === targetObject.TENSE_MODE.sustantivo && typeof targetObject.isFormalCnnFunctionTense === "function" && targetObject.isFormalCnnFunctionTense(selectedFunctionTense);
      const adjectivalFunctionOverride = (activeTenseMode === targetObject.TENSE_MODE.adjetivo || isFormalCnvAdjectivalTense || isFormalCnnAdjectivalTense) && typeof targetObject.resolveAdjectivalNncFunctionOverrideFromInput === "function" ? targetObject.resolveAdjectivalNncFunctionOverrideFromInput(targetObject.document.getElementById("verb")) : null;
      const activeRoute = typeof targetObject.getActiveNawatRouteProfile === "function" ? targetObject.getActiveNawatRouteProfile() : null;
      if (!adjectivalFunctionOverride && activeRoute?.targetVerb && activeRoute?.targetMode && activeRoute?.targetTenseValue && targetObject.getActiveTenseMode() === (targetObject.TENSE_MODE[activeRoute.targetMode] || activeRoute.targetMode) && selectionState.tenseValue === activeRoute.targetTenseValue) {
        renderVerb = activeRoute.activeStationVerb || activeRoute.activeStationInput || activeRoute.targetVerb;
        renderObjectPrefix = activeRoute.activeStationObjectPrefix || activeRoute.targetObjectPrefix || "";
      }
      const routeStore = typeof targetObject.getNawatRouteStateStore === "function" ? targetObject.getNawatRouteStateStore() : null;
      const activeLocativePrelocativeVerb = String(routeStore?.activeLocativePrelocativeVerb || "").trim();
      const activeLocativePromotedObjectPrefix = String(routeStore?.activeLocativePromotedObjectPrefix || "").trim();
      if (activeTenseMode === targetObject.TENSE_MODE.verbo && activeLocativePrelocativeVerb && activeLocativePrelocativeVerb === renderVerb && activeLocativePromotedObjectPrefix) {
        renderObjectPrefix = activeLocativePromotedObjectPrefix;
      }
      updateTensePanelDescription();
      if (targetObject.isOrdinaryNncGenerationModeEnabled() && !tenseOverride) {
        renderOutputGuidancePanel({
          verb: ""
        });
        clearUnifiedVerbOutputDataset();
        renderOrdinaryNncConjugations({
          stem: renderVerb,
          containerId: "all-tense-conjugations"
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      if (activeTenseMode === targetObject.TENSE_MODE.particula) {
        renderOutputGuidancePanel({
          verb: ""
        });
        clearUnifiedVerbOutputDataset();
        renderParticleModeConjugations({
          candidate: renderVerb,
          containerId: "all-tense-conjugations"
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      if (activeTenseMode === targetObject.TENSE_MODE.verbo && typeof targetObject.isVerbInputModeComposer === "function" && targetObject.isVerbInputModeComposer() && typeof targetObject.isComposerTransitivitySelected === "function" && !targetObject.isComposerTransitivitySelected()) {
        renderOutputGuidancePanel({
          verb: ""
        });
        clearUnifiedVerbOutputDataset();
        renderOutputSelectionRequiredPlaceholder({
          message: "Selecciona una transitividad para saber su salida."
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      const isPatientivoSalidaMode = activeTenseMode === targetObject.TENSE_MODE.sustantivo && selectionState.tenseValue === "patientivo";
      const guidanceVerb = adjectivalFunctionOverride ? targetObject.document.getElementById("verb")?.value || renderVerb : renderVerb;
      renderOutputGuidancePanel({
        verb: isPatientivoSalidaMode ? "" : guidanceVerb
      });
      if (isFormalCnvAdjectivalTense) {
        clearUnifiedVerbOutputDataset();
        renderAdjectiveConjugations({
          verb: renderVerb,
          containerId: "all-tense-conjugations",
          tenseValue: tenseOverride || null
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      if (isFormalCnvAdverbialTense) {
        clearUnifiedVerbOutputDataset();
        renderAdverbConjugations({
          verb: renderVerb,
          containerId: "all-tense-conjugations",
          tenseValue: tenseOverride || null
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      if (activeTenseMode === targetObject.TENSE_MODE.sustantivo) {
        clearUnifiedVerbOutputDataset();
        if (isFormalCnnAdjectivalTense) {
          renderAdjectiveConjugations({
            verb: renderVerb,
            containerId: "all-tense-conjugations",
            tenseValue: tenseOverride || null
          });
        } else {
          renderNounConjugations({
            verb: renderVerb,
            containerId: "all-tense-conjugations",
            tenseValue: tenseOverride || null,
            predicateNominalSourceTense
          });
        }
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      if (activeTenseMode === targetObject.TENSE_MODE.adjetivo) {
        clearUnifiedVerbOutputDataset();
        renderAdjectiveConjugations({
          verb: renderVerb,
          containerId: "all-tense-conjugations",
          tenseValue: tenseOverride || null
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      if (activeTenseMode === targetObject.TENSE_MODE.adverbio) {
        clearUnifiedVerbOutputDataset();
        renderAdverbConjugations({
          verb: renderVerb,
          containerId: "all-tense-conjugations",
          tenseValue: tenseOverride || null
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      if (selectionState.group === targetObject.CONJUGATION_GROUPS.universal) {
        renderPretUniversalConjugations({
          verb: renderVerb,
          objectPrefix: renderObjectPrefix,
          containerId: "all-tense-conjugations",
          tenseValue: tenseOverride || null
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      renderAllTenseConjugations({
        verb: renderVerb,
        objectPrefix: renderObjectPrefix,
        onlyTense: tenseOverride || null
      });
      targetObject.updateCalcSummaryAndStatus();
    }
    function renderNonactiveConjugationRows({
      list,
      verb,
      tenseValue,
      prefixes,
      isDirectGroup,
      allowObjectToggle,
      allowSubjectToggle,
      objectTogglePrefixes,
      activeObjectPrefix,
      passiveSubjectPrefixes,
      activePassiveSubject,
      forceImpersonal = false,
      isNawat = false,
      generationModeOverride = null,
      buildOutputRowEntry = null,
      afterRowRendered = null
    }) {
      const modeOverride = generationModeOverride && typeof generationModeOverride === "object" ? generationModeOverride : targetObject.buildVerbModeGenerateOverride({
        isNonactiveMode: true
      });
      const buildNonactiveRow = (labelText, subText, prefix, subjectOverride = null) => {
        const row = targetObject.document.createElement("div");
        row.className = "conjugation-row";
        targetObject.applyConjugationRowClasses(row, prefix);
        const label = targetObject.document.createElement("div");
        label.className = "conjugation-label";
        const personLabel = targetObject.document.createElement("div");
        personLabel.className = "person-label";
        personLabel.textContent = labelText;
        const personSub = targetObject.document.createElement("div");
        personSub.className = "person-sub";
        personSub.textContent = subText;
        label.appendChild(personLabel);
        label.appendChild(personSub);
        const value = targetObject.document.createElement("div");
        value.className = "conjugation-value";
        const overridePayload = {
          ...modeOverride,
          objectPrefix: prefix,
          verb,
          tense: tenseValue
        };
        if (subjectOverride) {
          overridePayload.subjectPrefix = subjectOverride.pers1;
          overridePayload.subjectSuffix = subjectOverride.pers2;
          overridePayload.preservePassiveSubject = true;
        }
        const subjectPers1 = subjectOverride?.pers1 || "";
        const subjectPers2 = subjectOverride?.pers2 || "";
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          allowPassiveObject: isDirectGroup && allowObjectToggle,
          override: overridePayload,
          posicionesFormula: {
            pers1: subjectPers1,
            obj1: prefix,
            tronco: verb,
            pers2: subjectPers2,
            num2: subjectPers2,
            poseedor: "",
            tiempo: tenseValue
          }
        }) || {};
        const mappedSubjectInfo = subjectOverride ? targetObject.getPers1Pers2Info(subjectOverride.pers1 || "", subjectOverride.pers2 || "") : null;
        const shouldBypassPassiveMappedConstraints = isDirectGroup && !!subjectOverride && mappedSubjectInfo?.person === 3;
        const maskState = targetObject.getConjugationMaskState({
          result,
          subjectPrefix: subjectOverride?.subjectPrefix || "",
          subjectSuffix: subjectOverride?.subjectSuffix || "",
          objectPrefix: prefix,
          invalidComboSet: targetObject.INVALID_COMBINATION_KEYS,
          controllerObjectMarker: shouldBypassPassiveMappedConstraints ? "" : null,
          enforceInvalidCombo: true
        });
        const hideReflexive = !!(result && result.isReflexive && targetObject.getObjectCategory(prefix) !== "reflexive");
        const evaluation = targetObject.buildConjugationEvaluationRecord({
          result,
          maskState,
          extraDiagnostics: hideReflexive ? [targetObject.buildConjugationDiagnosticEntry(targetObject.CONJUGATION_DIAGNOSTIC_IDS.reflexiveHidden, "masked", {
            source: "result"
          })] : []
        });
        personSub.textContent = appendGrammarFrameSubLabels(subText, result, {
          maxDiagnostics: 1
        });
        renderGeneratedOutputSlotChips(personSub, result);
        const renderedValue = targetObject.formatConjugationDisplay(getConjugationDisplaySurface(result));
        value.dataset.exportForm = renderedValue;
        targetObject.applyConjugationEvaluationPresentation({
          row,
          value,
          evaluation,
          formattedValue: renderedValue
        });
        applyGrammarFrameRouteDataset(row, result);
        row.dataset.objectPrefix = targetObject.getZeroObjectDisplayValue(prefix || "");
        row.appendChild(label);
        row.appendChild(value);
        list.appendChild(row);
        if (typeof afterRowRendered === "function") {
          afterRowRendered({
            row,
            value,
            evaluation,
            result,
            prefix,
            subjectOverride
          });
        }
        if (typeof buildOutputRowEntry === "function") {
          buildOutputRowEntry({
            row,
            person: labelText,
            personSub: subText,
            form: renderedValue,
            grammarMetadata: typeof targetObject.getUnifiedVerbOutputGrammarDatasetMetadata === "function" ? targetObject.getUnifiedVerbOutputGrammarDatasetMetadata(row.dataset) : {},
            slotValuesById: {
              object: targetObject.getZeroObjectDisplayValue(prefix || "")
            },
            prefix,
            subjectOverride
          });
        }
      };
      const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
      if (forceImpersonal) {
        const rowLabel = targetObject.getNonactiveRowLabelModel("", {
          isIntransitive: true,
          isNawat
        });
        buildNonactiveRow(rowLabel.label, rowLabel.subLabel, "");
        return;
      }
      if (isIntransitiveOnly) {
        const rowLabel = targetObject.getNonactiveRowLabelModel("", {
          isIntransitive: true,
          isNawat
        });
        buildNonactiveRow(rowLabel.label, rowLabel.subLabel, "");
        return;
      }
      const objectSelectionPool = allowObjectToggle ? objectTogglePrefixes : [""];
      const objectSelections = allowObjectToggle ? activeObjectPrefix === targetObject.OBJECT_TOGGLE_ALL ? objectSelectionPool : [activeObjectPrefix] : [""];
      if (isDirectGroup) {
        const subjectSelectionPool = passiveSubjectPrefixes.filter(prefix => prefix !== "");
        const subjectSelections = allowSubjectToggle ? activePassiveSubject === targetObject.OBJECT_TOGGLE_ALL ? subjectSelectionPool : [activePassiveSubject] : subjectSelectionPool;
        subjectSelections.forEach(subjectPrefix => {
          const subjectOverride = targetObject.getPassiveSubjectOverride(subjectPrefix);
          if (!subjectOverride) {
            return;
          }
          objectSelections.forEach(objectPrefix => {
            const rowLabel = targetObject.getNonactiveRowLabelModel(subjectPrefix, {
              isDirectGroup: true,
              isNawat,
              subjectOverride,
              retainedObjectPrefix: objectPrefix
            });
            buildNonactiveRow(rowLabel.label, rowLabel.subLabel, objectPrefix, subjectOverride);
          });
        });
        return;
      }
      objectSelections.forEach(prefix => {
        if (!prefix) {
          return;
        }
        const rowLabel = targetObject.getNonactiveRowLabelModel(prefix, {
          isNawat
        });
        buildNonactiveRow(rowLabel.label, rowLabel.subLabel, prefix);
      });
    }
    function splitConjugationSurfaceText(surface = "") {
      return String(surface || "").split(/\s*(?:\/|,|\n)\s*/).map(form => form.trim()).filter(Boolean);
    }
    function getStructuredConjugationResultFrameSurfaceForms(resultFrame = null) {
      if (!resultFrame || typeof resultFrame !== "object") {
        return [];
      }
      const forms = [];
      const addStructuredForm = (value = "") => {
        const form = String(value || "").trim();
        if (!form || form === "—" || /[\/,\n]/.test(form)) {
          return;
        }
        forms.push(form);
      };
      if (Array.isArray(resultFrame.surfaceForms)) {
        resultFrame.surfaceForms.forEach(addStructuredForm);
      }
      addStructuredForm(resultFrame.surface);
      return forms.filter((form, index, list) => list.indexOf(form) === index);
    }
    function getConjugationResultFrame(result = null) {
      return (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null) || (result?.frames && typeof result.frames === "object" ? result.frames : null);
    }
    function hasConjugationResultFrame(result = null) {
      const grammarFrame = getConjugationResultFrame(result);
      return Boolean(grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object");
    }
    function getConjugationFrameSurfaceForms(result = null) {
      const grammarFrame = getConjugationResultFrame(result);
      const resultFrame = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      const canonicalForms = getGeneratedOutputCanonicalRealizationSurfaceForms(result);
      if (canonicalForms.length) {
        return canonicalForms;
      }
      return getStructuredConjugationResultFrameSurfaceForms(resultFrame);
    }
    function getConjugationSurfaceForms(result = null) {
      const grammarFrame = getConjugationResultFrame(result);
      const hasResultFrame = Boolean(grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object");
      const canonicalForms = getGeneratedOutputCanonicalRealizationSurfaceForms(result);
      if (canonicalForms.length) {
        return canonicalForms;
      }
      const forms = [...getConjugationFrameSurfaceForms(result)];
      if (hasResultFrame) {
        return forms;
      }
      if (!hasResultFrame && Array.isArray(result?.surfaceForms) && result.surfaceForms.length) {
        forms.push(...result.surfaceForms);
      }
      if (!hasResultFrame && result?.surface) {
        forms.push(result.surface);
      }
      if (!hasResultFrame && !forms.length && result?.result) {
        forms.push(result.result);
      }
      return forms.flatMap(form => splitConjugationSurfaceText(form)).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index);
    }
    function getPrimaryConjugationSurface(result = null) {
      return getConjugationSurfaceForms(result).find(surface => surface && surface !== "—") || "";
    }
    function getConjugationDisplaySurface(result = null) {
      return getConjugationSurfaceForms(result).filter(surface => surface && surface !== "—").join(" / ");
    }
    function resolveNominalNum1Num2Surface(connector = null, fallbackSurface = "") {
      const framedSurface = getConjugationFrameSurfaceForms(connector)[0] || "";
      if (framedSurface) {
        return framedSurface;
      }
      if (hasConjugationResultFrame(connector)) {
        return "";
      }
      const surface = String(connector?.displaySurface || connector?.displayConnector || connector?.surface || fallbackSurface || "").trim();
      return surface === "—" ? "" : surface;
    }
    function buildVerbTenseBlock({
      verb,
      tenseValue,
      objectGroup,
      sectionEl,
      isNonactiveMode,
      isNawat,
      modeKey,
      subjectKeyPrefix,
      subjectSubMode,
      derivationType,
      activeValency,
      modeObjectSlots = 0,
      nonactiveAvailableSlots = 0,
      hasPromotableObject = false,
      embeddedObjectFilled = false,
      fusionMarkers,
      forceDefaultTodosKi = false,
      allowIndirectObjectToggle = false,
      indirectTogglePrefixes = [],
      preferredObjectPrefix = "",
      grammarState = null,
      grammarUiConfig = null
    }) {
      const {
        prefixes
      } = objectGroup;
      const resolvedGrammarState = grammarState || targetObject.buildCanonicalGrammarState({
        parsedVerb: targetObject.getParsedVerbForTab(modeKey || "verb", verb || ""),
        derivationType,
        voiceMode: isNonactiveMode ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active,
        isNonactiveMode
      });
      const configuredVisibleSlotIds = Array.isArray(grammarUiConfig?.visibleSlotIds) && grammarUiConfig.visibleSlotIds.length ? grammarUiConfig.visibleSlotIds : null;
      const groupKey = prefixes.join("|") || "intrans";
      const objectStateKey = targetObject.getObjectStateKey({
        groupKey,
        tenseValue,
        mode: modeKey,
        isNonactive: isNonactiveMode
      });
      const isDirectGroup = prefixes.every(prefix => targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix));
      const isPassiveNonactive = isNonactiveMode && isDirectGroup;
      const forceImpersonal = isPassiveNonactive && !hasPromotableObject;
      const allowSubjectToggle = isPassiveNonactive && activeValency >= 2 && !forceImpersonal;
      const allowObjectToggle = isPassiveNonactive && nonactiveAvailableSlots > 0;
      let passiveSubjectPrefixes = allowSubjectToggle ? Array.from(targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS) : [];
      let objectTogglePrefixes = isNonactiveMode && isDirectGroup && allowObjectToggle ? Array.from(new Set([...passiveSubjectPrefixes, ...Array.from(targetObject.OBJECT_MARKERS)])) : prefixes;
      const resolvedFusionMarkers = Array.isArray(fusionMarkers) ? fusionMarkers : [];
      if (allowSubjectToggle && allowObjectToggle && resolvedFusionMarkers.length >= 2) {
        const subjectMarker = resolvedFusionMarkers[0];
        const objectMarker = resolvedFusionMarkers[1];
        const constrainedSubject = targetObject.getNonactiveSlotPrefixes(subjectMarker, "subject");
        const constrainedObject = targetObject.getNonactiveSlotPrefixes(objectMarker, "object");
        if (constrainedSubject) {
          passiveSubjectPrefixes = constrainedSubject;
        }
        if (constrainedObject) {
          objectTogglePrefixes = constrainedObject;
        }
      }
      const objectSlotSchema = targetObject.getVerbObjectSlotSchema({
        isNawat,
        derivationType,
        isNonactiveMode,
        activeValency,
        modeObjectSlots,
        allowIndirectObjectToggle,
        primaryTogglePrefixes: objectTogglePrefixes,
        indirectTogglePrefixes,
        visibleSlotIds: configuredVisibleSlotIds
      });
      const objectSlotStates = objectSlotSchema.map(slot => {
        const options = targetObject.getObjectToggleOptions(slot.toggleValues, {
          includeAll: true,
          labelForPrefix: slot.labelForPrefix,
          isNawat
        });
        return {
          ...slot,
          options,
          optionMap: new Map(options.map(entry => [entry.id, entry])),
          stateKey: slot.stateSuffix ? `${objectStateKey}|${slot.stateSuffix}` : objectStateKey,
          activeId: "",
          buttons: new Map(),
          toggleEl: null,
          setActive: null
        };
      });
      const objectSlotStateById = new Map(objectSlotStates.map(slot => [slot.id, slot]));
      const primaryObjectSlot = objectSlotStateById.get("object");
      const thirdObjectSlot = objectSlotStateById.get("object3") || null;
      const objectOptions = primaryObjectSlot ? primaryObjectSlot.options : [];
      const objectOptionMap = primaryObjectSlot ? primaryObjectSlot.optionMap : new Map();
      const allowThirdObjectToggle = Boolean(thirdObjectSlot);
      const passiveSubjectOptions = allowSubjectToggle ? targetObject.getObjectToggleOptions(passiveSubjectPrefixes, {
        labelForPrefix: targetObject.getPassiveToggleLabel
      }) : [];
      const passiveSubjectOptionMap = new Map(passiveSubjectOptions.map(entry => [entry.id, entry]));
      const subjectOptions = targetObject.getSubjectToggleOptions();
      const subjectOptionMap = new Map(subjectOptions.map(entry => [entry.id, entry]));
      const passiveSubjectStateKey = allowSubjectToggle ? `${objectStateKey}|subject` : "";
      const verbKey = verb || "";
      const shouldDefaultBitransitiveObjects = modeObjectSlots >= 2 && verbKey;
      const bitransitiveObjectSeedKey = shouldDefaultBitransitiveObjects ? `${verbKey}|objects-${modeObjectSlots}|${isNonactiveMode ? "nonactive" : "active"}` : verbKey;
      const uiDefaultObjectBySlot = grammarUiConfig?.defaultToggles?.objectBySlotId || null;
      const uiDefaultPrimaryObjectId = uiDefaultObjectBySlot?.object;
      const bitransitiveDefaultObjectId = shouldDefaultBitransitiveObjects ? targetObject.getDefaultOutputToggleSelection({
        context: "verb-primary-object",
        values: Array.from(objectOptionMap.keys()),
        preferredId: uiDefaultPrimaryObjectId || "ki",
        fallbackIds: [targetObject.getPreferredObjectPrefix(prefixes), ""],
        isNonactiveMode
      }) : "";
      const shouldDefaultTripleValencySubject = !isNonactiveMode && activeValency >= 3 && verbKey;
      const tripleValencySubjectSeedKey = shouldDefaultTripleValencySubject ? `${verbKey}|valency-3` : verbKey;
      const uiDefaultSubjectId = grammarUiConfig?.defaultToggles?.subject || targetObject.getDefaultOutputToggleSelection({
        context: "verb-subject",
        values: Array.from(subjectOptionMap.keys())
      });
      const tripleDefaultSubjectId = shouldDefaultTripleValencySubject ? targetObject.getDefaultOutputToggleSelection({
        context: "verb-subject",
        values: Array.from(subjectOptionMap.keys()),
        preferredId: uiDefaultSubjectId
      }) : targetObject.getDefaultOutputToggleSelection({
        context: "verb-subject",
        values: Array.from(subjectOptionMap.keys())
      });
      const shouldForceDefaults = forceDefaultTodosKi && verbKey;
      if (shouldForceDefaults && objectOptionMap.has("ki")) {
        targetObject.applyDefaultToggleStateOnce(targetObject.ObjectToggleState, objectStateKey, verbKey, "ki");
      }
      if (shouldDefaultBitransitiveObjects) {
        targetObject.applyDefaultToggleStateOnce(targetObject.ObjectToggleState, objectStateKey, bitransitiveObjectSeedKey, bitransitiveDefaultObjectId);
      }
      const isIntransitiveGroup = prefixes.length === 1 && prefixes[0] === "";
      const shouldMapAllTenses = prefixes.includes("ki");
      const shouldSeedAllTensesDefault = shouldMapAllTenses;
      const resolveTenseBlockPrefix = prefix => {
        if (shouldMapAllTenses && prefix === "ki") {
          return targetObject.OBJECT_TOGGLE_ALL;
        }
        return prefix || "intrans";
      };
      const defaultObjectPrefix = targetObject.getDefaultOutputToggleSelection({
        context: "verb-primary-object",
        values: Array.from(objectOptionMap.keys()),
        preferredId: uiDefaultPrimaryObjectId || targetObject.getPreferredObjectPrefix(prefixes),
        isNonactiveMode,
        fallbackIds: [targetObject.getPreferredObjectPrefix(prefixes)]
      });
      const explicitPreferredObjectPrefix = String(preferredObjectPrefix || "").trim();
      const hasExplicitPreferredObject = !isIntransitiveGroup && explicitPreferredObjectPrefix && objectOptionMap.has(explicitPreferredObjectPrefix);
      let activeObjectPrefix = isIntransitiveGroup ? "" : defaultObjectPrefix;
      if (shouldSeedAllTensesDefault && !targetObject.ObjectToggleState.has(objectStateKey)) {
        targetObject.setToggleStateValue(targetObject.ObjectToggleState, objectStateKey, "ki", {
          syncLock: false
        });
      }
      const storedObjectPrefix = targetObject.getToggleStateValue(targetObject.ObjectToggleState, objectStateKey);
      if (hasExplicitPreferredObject) {
        activeObjectPrefix = explicitPreferredObjectPrefix;
      } else if (!isIntransitiveGroup && storedObjectPrefix !== undefined && objectOptionMap.has(storedObjectPrefix)) {
        activeObjectPrefix = storedObjectPrefix;
      }
      if (isPassiveNonactive && !allowObjectToggle) {
        activeObjectPrefix = "";
      }
      if (primaryObjectSlot) {
        primaryObjectSlot.activeId = activeObjectPrefix;
      }
      const defaultPassiveSubjectId = allowSubjectToggle ? targetObject.getDefaultOutputToggleSelection({
        context: "verb-passive-subject",
        values: Array.from(passiveSubjectOptionMap.keys())
      }) : null;
      let activePassiveSubject = allowSubjectToggle ? defaultPassiveSubjectId : null;
      const storedPassiveSubject = allowSubjectToggle ? targetObject.getToggleStateValue(targetObject.ObjectToggleState, passiveSubjectStateKey) : undefined;
      if (allowSubjectToggle && storedPassiveSubject !== undefined && passiveSubjectOptionMap.has(storedPassiveSubject)) {
        activePassiveSubject = storedPassiveSubject;
      }
      const tenseBlock = targetObject.document.createElement("div");
      tenseBlock.className = "tense-block";
      tenseBlock.dataset.tenseBlock = `${resolveTenseBlockPrefix(activeObjectPrefix)}-${tenseValue}`;
      tenseBlock.title = getAndrewsFirstOutputBlockHoverTitle({
        mode: targetObject.TENSE_MODE.verbo,
        tenseValue,
        blockKind: "CNV"
      });
      if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
        targetObject.applyAndrewsTenseAuthorityDataset(tenseBlock, {
          tenseValue,
          mode: targetObject.TENSE_MODE.verbo,
          blockKind: "CNV"
        });
      }
      const transitiveLabel = targetObject.getVerbBlockLabel("transitive", isNawat, "verbo transitivo");
      const intransitiveLabel = targetObject.getVerbBlockLabel("intransitive", isNawat, "verbo intransitivo");
      const passiveLabel = targetObject.getVerbBlockLabel("passive", isNawat, "pasivo");
      const impersonalLabel = targetObject.getVerbBlockLabel("impersonal", isNawat, "impersonal");
      const labelValency = Number.isFinite(grammarUiConfig?.labelValency) ? grammarUiConfig.labelValency : Number.isFinite(activeValency) ? isNonactiveMode ? Math.max(0, activeValency - 1) : activeValency : null;
      const activeBlockLabelType = targetObject.getActiveVerbBlockLabelType({
        labelValency,
        activeValency,
        embeddedObjectFilled
      });
      const getActiveSlotToggleValue = slotId => objectSlotStateById.get(slotId)?.activeId || "";
      const updateVerbTenseBlockPalette = () => {
        const signature = targetObject.buildBlockComboPaletteSignature({
          mode: "verb",
          valency: Number.isFinite(labelValency) ? labelValency : activeValency,
          objectPrefix: getActiveSlotToggleValue("object"),
          indirectObjectMarker: getActiveSlotToggleValue("object2"),
          thirdObjectMarker: getActiveSlotToggleValue("object3"),
          derivationType
        });
        targetObject.applyTenseBlockComboPalette(tenseBlock, signature);
      };
      const valencyLabel = Number.isFinite(labelValency) ? `valencia total: ${labelValency}` : "";
      const buildBlockLabel = () => {
        const baseLabel = activeBlockLabelType === "transitive" ? transitiveLabel : intransitiveLabel;
        return valencyLabel ? `${baseLabel} · ${valencyLabel}` : baseLabel;
      };
      const tenseTitle = targetObject.document.createElement("div");
      tenseTitle.className = "tense-block__title";
      const titleLabel = targetObject.document.createElement("span");
      titleLabel.className = "tense-block__label";
      titleLabel.textContent = buildBlockLabel();
      titleLabel.title = tenseBlock.title;
      tenseTitle.appendChild(titleLabel);
      const titleControls = targetObject.document.createElement("div");
      titleControls.className = "tense-block__controls";
      const shouldStackControls = !isNonactiveMode || prefixes.length > 1;
      if (shouldStackControls) {
        titleControls.classList.add("tense-block__controls--stacked");
      }
      const resolvedSubjectKeyPrefix = subjectKeyPrefix || modeKey;
      const subjectKey = `${resolvedSubjectKeyPrefix}|${tenseValue}|${groupKey}`;
      if (shouldForceDefaults) {
        if (!isNonactiveMode) {
          targetObject.applyDefaultToggleStateOnce(targetObject.SubjectToggleState, subjectKey, verbKey, targetObject.SUBJECT_TOGGLE_ALL);
        } else if (allowSubjectToggle && passiveSubjectStateKey) {
          targetObject.applyDefaultToggleStateOnce(targetObject.ObjectToggleState, passiveSubjectStateKey, verbKey, targetObject.OBJECT_TOGGLE_ALL);
        }
      }
      if (shouldDefaultTripleValencySubject) {
        targetObject.applyDefaultToggleStateOnce(targetObject.SubjectToggleState, subjectKey, tripleValencySubjectSeedKey, tripleDefaultSubjectId);
      }
      if (shouldSeedAllTensesDefault && !targetObject.SubjectToggleState.has(subjectKey)) {
        targetObject.setToggleStateValue(targetObject.SubjectToggleState, subjectKey, tripleDefaultSubjectId, {
          syncLock: false
        });
      }
      let activeSubject = targetObject.getToggleStateValue(targetObject.SubjectToggleState, subjectKey, tripleDefaultSubjectId) ?? tripleDefaultSubjectId;
      if (!subjectOptionMap.has(activeSubject)) {
        activeSubject = tripleDefaultSubjectId;
        targetObject.setToggleStateValue(targetObject.SubjectToggleState, subjectKey, activeSubject, {
          syncLock: false
        });
      }
      let toggleButtons = new Map();
      let passiveSubjectButtons = new Map();
      let subjectButtons = new Map();
      const objectSlotSetters = new Map();
      const controllerRole = targetObject.getCanonicalControllerRole(resolvedGrammarState.derivationType || derivationType);
      const controllerSlotId = targetObject.getCanonicalSlotIdForRole(controllerRole) || "object";
      const isSilentControllerMarker = value => targetObject.VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value || "");
      const isShuntlineSlot = slotId => slotId === "object2" || slotId === "object3";
      const isSilentShuntlineMarker = value => {
        if (!value || value === targetObject.OBJECT_TOGGLE_ALL) {
          return true;
        }
        return Number(activeValency) >= 4 && targetObject.VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value);
      };
      const updateObjectToggleStyling = () => {
        objectSlotStates.forEach(slotState => {
          if (!slotState.toggleEl) {
            return;
          }
          const controllerIsSilent = slotState.id === controllerSlotId && isSilentControllerMarker(slotState.activeId);
          slotState.buttons.forEach((button, key) => {
            const isActiveButton = key === slotState.activeId;
            const shuntlineOptionIsOvert = isShuntlineSlot(slotState.id) && !isSilentShuntlineMarker(key);
            const shuntlineOptionIsSilent = isShuntlineSlot(slotState.id) && key !== targetObject.OBJECT_TOGGLE_ALL && isSilentShuntlineMarker(key);
            button.classList.toggle("object-toggle-button--controller-silent", controllerIsSilent && isActiveButton);
            button.classList.toggle("object-toggle-button--shuntline-overt", shuntlineOptionIsOvert);
            button.classList.toggle("object-toggle-button--silent-zero", shuntlineOptionIsSilent);
          });
        });
      };
      const TOGGLE_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--viable", "object-toggle-button--masked", "object-toggle-button--impossible"];
      const TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--selected-viable", "object-toggle-button--selected-masked", "object-toggle-button--selected-impossible"];
      const clearToggleAvailabilityClasses = button => {
        if (!button) {
          return;
        }
        TOGGLE_AVAILABILITY_CLASS_NAMES.forEach(className => {
          button.classList.remove(className);
        });
        TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES.forEach(className => {
          button.classList.remove(className);
        });
      };
      const applyToggleAvailabilityClass = (button, state) => {
        clearToggleAvailabilityClasses(button);
        if (!button || !state) {
          return;
        }
        if (state === "viable") {
          button.classList.add("object-toggle-button--viable");
          return;
        }
        if (state === "masked") {
          button.classList.add("object-toggle-button--masked");
          return;
        }
        if (state === "impossible") {
          button.classList.add("object-toggle-button--impossible");
        }
      };
      const applySelectedAvailabilityClass = (button, state, isSelected) => {
        if (!button || !isSelected) {
          return;
        }
        if (state === "viable") {
          button.classList.add("object-toggle-button--selected-viable");
          return;
        }
        if (state === "masked") {
          button.classList.add("object-toggle-button--selected-masked");
          return;
        }
        if (state === "impossible") {
          button.classList.add("object-toggle-button--selected-impossible");
        }
      };
      const staticViableOptionSetBySlot = new Map();
      if (grammarUiConfig && grammarUiConfig.viableOptionsPerSlot && typeof grammarUiConfig.viableOptionsPerSlot === "object") {
        Object.entries(grammarUiConfig.viableOptionsPerSlot).forEach(([slotId, values]) => {
          if (!Array.isArray(values) || !values.length) {
            return;
          }
          staticViableOptionSetBySlot.set(slotId, new Set(values));
        });
      }
      let setActiveSubject = null;
      let setActivePassiveSubject = null;
      if (!isNonactiveMode) {
        const subjectToggleControl = buildToggleControl({
          options: subjectOptions,
          activeId: activeSubject,
          ariaLabel: targetObject.getToggleLabel("subject", isNawat, "sujeto"),
          onSelect: id => setActiveSubject(id),
          getActiveId: () => activeSubject
        });
        subjectToggleControl.toggle.dataset.toggleType = "subject";
        subjectToggleControl.toggle.dataset.toggleSlot = "subject";
        subjectButtons = subjectToggleControl.buttons;
        titleControls.appendChild(subjectToggleControl.toggle);
        setActiveSubject = (subjectId, options = {}) => {
          activeSubject = subjectId;
          targetObject.setToggleStateValue(targetObject.SubjectToggleState, subjectKey, subjectId, {
            syncLock: true
          });
          setToggleActiveState(subjectButtons, subjectId);
          if (options.render !== false) {
            renderRows();
          }
        };
      }
      if (allowSubjectToggle) {
        const passiveSubjectToggleControl = buildToggleControl({
          options: passiveSubjectOptions,
          activeId: activePassiveSubject,
          ariaLabel: targetObject.getToggleLabel("subject", isNawat, "sujeto"),
          onSelect: id => setActivePassiveSubject(id),
          getActiveId: () => activePassiveSubject
        });
        passiveSubjectToggleControl.toggle.dataset.toggleType = "subject";
        passiveSubjectToggleControl.toggle.dataset.toggleSlot = "subject";
        passiveSubjectButtons = passiveSubjectToggleControl.buttons;
        titleControls.appendChild(passiveSubjectToggleControl.toggle);
        setActivePassiveSubject = (subjectId, options = {}) => {
          activePassiveSubject = subjectId;
          targetObject.setToggleStateValue(targetObject.ObjectToggleState, passiveSubjectStateKey, subjectId, {
            syncLock: true
          });
          setToggleActiveState(passiveSubjectButtons, subjectId);
          if (options.render !== false) {
            renderRows();
          }
        };
      }
      const showObjectToggle = !isNonactiveMode && prefixes.length > 1 || isNonactiveMode && (!isDirectGroup ? prefixes.length > 1 : allowObjectToggle);
      if (showObjectToggle) {
        const objectToggleControl = buildToggleControl({
          options: objectOptions,
          activeId: activeObjectPrefix,
          ariaLabel: primaryObjectSlot ? primaryObjectSlot.toggleAriaLabel : targetObject.getToggleLabel("object", isNawat, "objeto"),
          onSelect: id => setActivePrefix(id),
          getActiveId: () => activeObjectPrefix
        });
        objectToggleControl.toggle.dataset.toggleType = "object";
        objectToggleControl.toggle.dataset.toggleSlot = "object";
        toggleButtons = objectToggleControl.buttons;
        if (primaryObjectSlot) {
          primaryObjectSlot.buttons = objectToggleControl.buttons;
          primaryObjectSlot.toggleEl = objectToggleControl.toggle;
        }
        titleControls.appendChild(objectToggleControl.toggle);
      }
      const getExtraSlotBitransitiveDefaults = slotId => {
        const preferredId = uiDefaultObjectBySlot?.[slotId] || "ki";
        return {
          preferredId,
          fallbackIds: [targetObject.OBJECT_TOGGLE_ALL, ""]
        };
      };
      objectSlotStates.filter(slotState => !slotState.isPrimary).forEach(slotState => {
        if (!slotState.options.length) {
          slotState.activeId = "";
          return;
        }
        if (shouldDefaultBitransitiveObjects) {
          const defaults = getExtraSlotBitransitiveDefaults(slotState.id);
          const defaultId = targetObject.getDefaultOutputToggleSelection({
            context: "verb-extra-object",
            values: Array.from(slotState.optionMap.keys()),
            preferredId: defaults.preferredId,
            fallbackIds: defaults.fallbackIds
          });
          targetObject.applyDefaultToggleStateOnce(targetObject.ObjectToggleState, slotState.stateKey, bitransitiveObjectSeedKey, defaultId);
        }
        const storedValue = targetObject.getToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey);
        if (storedValue !== undefined && slotState.optionMap.has(storedValue)) {
          slotState.activeId = storedValue;
        }
        if (!slotState.optionMap.has(slotState.activeId)) {
          slotState.activeId = "";
          targetObject.setToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey, slotState.activeId, {
            syncLock: false
          });
        }
        const toggleControl = buildToggleControl({
          options: slotState.options,
          activeId: slotState.activeId,
          ariaLabel: slotState.toggleAriaLabel,
          onSelect: id => {
            const setter = objectSlotSetters.get(slotState.id);
            if (setter) {
              setter(id);
            }
          },
          getActiveId: () => slotState.activeId
        });
        toggleControl.toggle.dataset.toggleType = "object";
        toggleControl.toggle.dataset.toggleSlot = slotState.id;
        slotState.buttons = toggleControl.buttons;
        slotState.toggleEl = toggleControl.toggle;
        titleControls.appendChild(toggleControl.toggle);
        slotState.setActive = (markerId, options = {}) => {
          slotState.activeId = markerId;
          targetObject.setToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey, markerId, {
            syncLock: true
          });
          setToggleActiveState(slotState.buttons, markerId);
          updateObjectToggleStyling();
          updateVerbTenseBlockPalette();
          if (options.render !== false) {
            renderRows();
          }
        };
        objectSlotSetters.set(slotState.id, slotState.setActive);
      });
      const destinationSlot = targetObject.document.createElement("div");
      destinationSlot.className = "tense-block__destination";
      destinationSlot.hidden = true;
      const resolveDestinationSourceObjectPrefix = () => {
        const objectPrefixValue = getActiveSlotToggleValue("object");
        if (objectPrefixValue === targetObject.OBJECT_TOGGLE_ALL) {
          return targetObject.getPreferredObjectPrefix(prefixes) || "";
        }
        return objectPrefixValue || "";
      };
      const updateVerbTenseBlockDestination = () => {
        destinationSlot.replaceChildren();
        destinationSlot.hidden = true;
        tenseBlock.classList.remove("tense-block--has-destination-menu");
      };
      tenseTitle.appendChild(titleControls);
      tenseTitle.appendChild(destinationSlot);
      tenseBlock.appendChild(tenseTitle);
      const list = targetObject.document.createElement("div");
      list.className = "conjugation-list";
      const blockOutputRows = [];
      tenseBlock.__outputRows = blockOutputRows;
      const getSubjectToggleLabelForExport = () => {
        if (isNonactiveMode && allowSubjectToggle) {
          return passiveSubjectOptionMap.get(activePassiveSubject)?.label || "";
        }
        return subjectOptionMap.get(activeSubject)?.label || "";
      };
      const getObjectSlotCountForExport = () => targetObject.normalizeUnifiedVerbOutputObjectSlotCount(objectSlotStates.filter(slotState => Boolean(slotState.toggleEl)).length);
      const appendBlockOutputRow = ({
        person = "",
        personSub = "",
        form = "",
        slotValuesById = {},
        grammarMetadata = {}
      } = {}) => {
        blockOutputRows.push(targetObject.normalizeUnifiedVerbOutputEntry({
          sourceMode: isNonactiveMode ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active,
          block: String(titleLabel?.textContent || "").trim(),
          person,
          personSub,
          subjectToggle: getSubjectToggleLabelForExport(),
          object: slotValuesById.object || "",
          object2: slotValuesById.object2 || "",
          object3: slotValuesById.object3 || "",
          form,
          objectSlotCount: getObjectSlotCountForExport(),
          ...grammarMetadata
        }));
      };
      const ensureVerbRowConversionActions = ({
        value,
        sourceDisplay = "",
        frameLike = null
      } = {}) => {
        if (!value) {
          return null;
        }
        let actions = getConjugationConversionActionsForValue(value);
        if (actions) {
          return actions;
        }
        const display = String(sourceDisplay || "").trim();
        if (!display || display === "—") {
          return null;
        }
        value.replaceChildren();
        value.classList.add("conjugation-value--conversion-picker");
        const surfaceText = targetObject.document.createElement("span");
        surfaceText.className = "conjugation-conversion-surface";
        appendConjugationConversionSurfaceLines(surfaceText, display, frameLike);
        actions = createConjugationConversionActionsContainer();
        value.append(surfaceText, actions);
        applyConjugationConversionColumnLayout(value, surfaceText, actions);
        return actions;
      };
      const getVerbRowSourceDisplay = (evaluation = null) => {
        return getConjugationDisplaySurface(evaluation?.result);
      };
      const appendVerbToPatientivoRowContinuation = ({
        value,
        evaluation,
        sourceObjectPrefix = ""
      } = {}) => {
        if (!value || isNonactiveMode || !verb || !tenseValue || typeof getNawatPatientivoSourceRouteKey !== "function" || typeof targetObject.getNawatRouteProfile !== "function" || typeof isPatientivoSurfaceRouteProfile !== "function" || typeof targetObject.resolveNawatRouteTarget !== "function" || typeof targetObject.getNawatRouteFiniteSurfaceForm !== "function" || typeof targetObject.activateNawatRouteStation !== "function") {
          return false;
        }
        const routeKey = getNawatPatientivoSourceRouteKey({
          sourceCombinedMode: targetObject.COMBINED_MODE.active,
          tenseValue
        });
        const routeProfile = routeKey ? targetObject.getNawatRouteProfile(routeKey) : null;
        if (!routeProfile || !isPatientivoSurfaceRouteProfile(routeProfile)) {
          return false;
        }
        const routeTarget = targetObject.resolveNawatRouteTarget(routeProfile, {
          sourceVerb: verb,
          sourceObjectPrefix,
          sourceTenseValue: tenseValue,
          sourceCombinedMode: targetObject.COMBINED_MODE.active
        }) || {};
        const patientivoSurface = targetObject.getNawatRouteFiniteSurfaceForm(routeProfile, {
          sourceVerb: verb,
          sourceObjectPrefix,
          routeTarget
        });
        if (!patientivoSurface) {
          return false;
        }
        const sourceDisplay = getVerbRowSourceDisplay(evaluation);
        if (!sourceDisplay || sourceDisplay === "—") {
          return false;
        }
        const actions = ensureVerbRowConversionActions({
          value,
          sourceDisplay,
          frameLike: evaluation?.result
        });
        if (!actions) {
          return false;
        }
        const continueButton = targetObject.document.createElement("button");
        continueButton.type = "button";
        continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
        continueButton.dataset.verbPatientivoContinuation = "true";
        continueButton.dataset.nawatRouteKey = routeKey;
        continueButton.dataset.nominalizationSourceUnit = NOMINALIZATION_SOURCE_UNITS.vncCoreStem;
        const routeControlContract = attachUiRouteControlGrammarContract({
          outputKind: "verb-to-patientivo-row-continuation-control",
          supported: true,
          routeKey,
          patientivoSurface,
          patientivoSource: routeTarget.patientivoSource || routeProfile.patientivoSource || "",
          sourceTenseValue: tenseValue,
          sourceCombinedMode: targetObject.COMBINED_MODE.active,
          sourceObjectPrefix,
          sourceVerb: verb,
          targetInput: routeTarget.targetInput || routeTarget.targetVerb || patientivoSurface
        }, {
          outputKind: "verb-to-patientivo-row-continuation-control",
          unitKind: "ui-route-control",
          routeFamily: "verb-to-patientivo-row-continuation",
          routeStage: "target-mode-preview",
          generationAllowed: true,
          supported: true,
          andrewsRefs: getPatientivoRouteControlAndrewsRefs(routeTarget.patientivoSource || routeProfile.patientivoSource || ""),
          evidenceStatus: "row-continuation-preview",
          diagnosticStatus: "route-control",
          sourceInput: verb,
          targetInput: routeTarget.targetInput || routeTarget.targetVerb || patientivoSurface,
          targetSurface: patientivoSurface,
          sourceContract: {
            unitKind: "vnc",
            sourceUnit: NOMINALIZATION_SOURCE_UNITS.vncCoreStem,
            sourceMode: targetObject.TENSE_MODE.verbo,
            sourceTenseValue: tenseValue,
            sourceCombinedMode: targetObject.COMBINED_MODE.active,
            sourceVerb: verb,
            sourceObjectPrefix
          },
          targetContract: {
            unitKind: "nnc",
            targetMode: targetObject.TENSE_MODE.sustantivo,
            targetTense: "patientivo",
            routeKey,
            patientivoSource: routeTarget.patientivoSource || routeProfile.patientivoSource || "",
            patientivoNominalSuffix: routeProfile.patientivoNominalSuffix || ""
          },
          stemFrame: {
            sourceStem: verb,
            targetStem: routeTarget.targetVerb || patientivoSurface,
            routeKey
          },
          participantFrame: {
            objectPrefix: sourceObjectPrefix
          },
          inflectionFrame: {
            sourceTenseValue: tenseValue,
            targetTense: "patientivo"
          }
        });
        applyGrammarFrameRouteDataset(continueButton, routeControlContract);
        const continueLabel = targetObject.document.createElement("span");
        continueLabel.className = "calc-guidance__chip-label";
        continueLabel.textContent = `→ ${patientivoSurface}`;
        continueButton.appendChild(continueLabel);
        const continueSubLabel = targetObject.document.createElement("span");
        continueSubLabel.className = "calc-guidance__chip-sublabel";
        continueSubLabel.textContent = appendNominalizationSourceUnitSubLabel("S patientivo", NOMINALIZATION_SOURCE_UNITS.vncCoreStem);
        continueButton.appendChild(continueSubLabel);
        continueButton.addEventListener("click", () => {
          targetObject.activateNawatRouteStation(routeKey, "target-mode", {
            render: true,
            anchorElement: continueButton,
            sourceVerb: verb,
            sourceObjectPrefix,
            sourceTenseValue: tenseValue,
            sourceCombinedMode: targetObject.COMBINED_MODE.active
          });
        });
        appendContinuationAction(actions, continueButton);
        return true;
      };
      const appendVerbToNominalRowContinuations = ({
        value,
        evaluation,
        sourceObjectPrefix = ""
      } = {}) => {
        if (!value || isNonactiveMode || !verb || !tenseValue || typeof targetObject.getCachedSilentGenerateWord !== "function" || typeof targetObject.setActiveTenseMode !== "function" || typeof targetObject.setSelectedTenseTab !== "function" || typeof renderActiveConjugations !== "function") {
          return 0;
        }
        const specs = getVerbToNominalContinuationSpecsForTense(tenseValue);
        if (!specs.length) {
          return 0;
        }
        const sourceDisplay = getVerbRowSourceDisplay(evaluation);
        const actions = ensureVerbRowConversionActions({
          value,
          sourceDisplay,
          frameLike: evaluation?.result
        });
        if (!actions) {
          return 0;
        }
        let appended = 0;
        const seenContinuationKeys = new Set();
        specs.forEach(spec => {
          const targetTense = String(spec.targetTense || "").trim();
          if (!targetTense) {
            return;
          }
          const nominalDerivationMode = typeof targetObject.getNominalDerivationModeForTense === "function" ? targetObject.getNominalDerivationModeForTense(targetTense) : targetObject.DERIVATION_MODE.active;
          const isPredicateNominalTarget = targetObject.isPredicateNominalTense(targetTense);
          const predicateNominalSourceTense = String(spec.predicateNominalSourceTense || "").trim();
          const preview = targetObject.getCachedSilentGenerateWord({
            silent: true,
            skipValidation: true,
            override: {
              tenseMode: targetObject.TENSE_MODE.sustantivo,
              derivationMode: nominalDerivationMode,
              ...(predicateNominalSourceTense ? {
                predicateNominalSourceTense
              } : {})
            },
            posicionesFormula: {
              pers1: "",
              obj1: sourceObjectPrefix,
              tronco: verb,
              pers2: isPredicateNominalTarget ? "t" : "",
              num2: isPredicateNominalTarget ? "t" : "",
              poseedor: "",
              tiempo: targetTense
            }
          }) || {};
          if (preview.error || preview.shouldMaskRow) {
            return;
          }
          const previewForms = getConjugationSurfaceForms(preview).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index);
          const previewSurface = previewForms.join(" / ");
          const sourceUnit = String(spec.sourceUnit || NOMINALIZATION_SOURCE_UNITS.vncPredicate);
          const continuationIdentityKey = getGeneratedOutputContinuationIdentityKey(preview, {
            namespace: "verb-to-nominal-row-continuation",
            targetTense,
            sourceUnit,
            predicateNominalSourceTense,
            sourceObjectPrefix
          });
          if (!previewSurface || !continuationIdentityKey || seenContinuationKeys.has(continuationIdentityKey)) {
            return;
          }
          const routeActionContract = buildVerbNominalContinuationRouteActionContractForRendering({
            preview,
            sourceUnit
          });
          if (!routeActionContract) {
            return;
          }
          seenContinuationKeys.add(continuationIdentityKey);
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
          continueButton.dataset.verbNominalContinuation = "true";
          continueButton.dataset.targetMode = "sustantivo";
          continueButton.dataset.targetTense = targetTense;
          continueButton.dataset.targetSurface = previewSurface;
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "canonical-formula-realization-record";
          continueButton.dataset.nominalizationSourceUnit = sourceUnit;
          continueButton.dataset.predicateNominalSourceTense = predicateNominalSourceTense;
          continueButton.andrewsRouteActionContract = routeActionContract;
          applyGrammarFrameRouteDataset(continueButton, preview);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = appendNominalizationSourceUnitSubLabel(spec.subLabel || "S nominal", sourceUnit);
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`V ${tenseValue}: ${sourceDisplay}`, `nominalización: ${getNominalizationSourceUnitLabel(sourceUnit)}`, `S ${targetTense}: ${previewSurface}`].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            activateCnnOutputModeForContinuation({
              clearRoute: true
            });
            targetObject.setSelectedTenseTab(targetTense);
            renderActiveConjugations({
              verb,
              objectPrefix: sourceObjectPrefix,
              tense: targetTense,
              predicateNominalSourceTense
            });
          });
          appendContinuationAction(actions, continueButton);
          appended += 1;
        });
        return appended;
      };
      const appendVncAdjectivalFunctionRowContinuation = ({
        value,
        evaluation,
        sourceObjectPrefix = "",
        sourceCombinedMode = targetObject.COMBINED_MODE.active,
        sourceVoiceMode = ""
      } = {}) => {
        if (!value || !verb || !tenseValue || evaluation?.shouldMaskRow || typeof targetObject.buildVncAdjectivalNncFunctionOutput !== "function" || typeof targetObject.buildVncAdjectivalNncOperationFrame !== "function" || typeof targetObject.applyAdjectivalNncFunctionToVerbEntry !== "function") {
          return false;
        }
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index);
        if (!forms.length) {
          return false;
        }
        const sourceDisplay = getVerbRowSourceDisplay(evaluation);
        const actions = ensureVerbRowConversionActions({
          value,
          sourceDisplay,
          frameLike: evaluation?.result
        });
        if (!actions) {
          return false;
        }
        const contracts = forms.map((form, index) => {
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(evaluation?.result, index);
          const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(evaluation?.result, sourceSelectedVariant, {
            role: "source",
            unit: "VNC"
          });
          if (!sourceSelectedVariant || !sourceContinuationFrame) {
            return null;
          }
          const operationFrame = targetObject.buildVncAdjectivalNncOperationFrame({
            sourceContinuationFrame,
            role: "predicate-surface"
          });
          const targetContinuationFrame = {
            ...sourceContinuationFrame,
            role: "target",
            operationFrame,
            formulaRecord: {
              ...sourceContinuationFrame.formulaRecord,
              operationFrames: [...(Array.isArray(sourceContinuationFrame.formulaRecord?.operationFrames) ? sourceContinuationFrame.formulaRecord.operationFrames : []), operationFrame]
            }
          };
          return targetObject.buildVncAdjectivalNncFunctionOutput({
            vncSurface: form,
            sourceVerb: verb,
            sourceTenseValue: tenseValue,
            sourceCombinedMode,
            sourceVoiceMode,
            sourceContinuationFrame,
            targetContinuationFrame,
            operationFrame,
            requireStructuredContinuation: true
          });
        }).filter(entry => entry?.supported);
        let appended = false;
        contracts.forEach((contract, index) => {
          const targetSurface = getPrimaryConjugationSurface(contract);
          if (!targetSurface) {
            return;
          }
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(evaluation?.result, index);
          const targetSelectedVariant = getGeneratedOutputSelectedRealizationVariant(contract, 0);
          const continuationIdentityKey = getGeneratedOutputContinuationIdentityKey([evaluation?.result, contract], {
            namespace: "vnc-adjectival-function-continuation",
            targetTense: tenseValue,
            sourceUnit: "vnc-predicate",
            sourceObjectPrefix,
            sourceVariantId: sourceSelectedVariant?.variantId || String(index),
            targetVariantId: targetSelectedVariant?.variantId || ""
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-vnc-adjectival-function-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (alreadyRendered) {
            return;
          }
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-adjetivo", "calc-guidance__chip--vnc-adjectival-function"].join(" ");
          continueButton.dataset.vncAdjectivalFunctionContinuation = "true";
          continueButton.dataset.targetSurface = targetSurface;
          continueButton.dataset.sourceTenseValue = tenseValue;
          continueButton.dataset.sourceCombinedMode = sourceCombinedMode || "";
          continueButton.dataset.sourceObjectPrefix = sourceObjectPrefix || "";
          if (sourceSelectedVariant?.variantId) {
            continueButton.dataset.sourceSelectedVariantId = sourceSelectedVariant.variantId;
          }
          if (targetSelectedVariant?.variantId) {
            continueButton.dataset.targetSelectedVariantId = targetSelectedVariant.variantId;
          }
          applyGeneratedOutputContinuationIdentityDataset(continueButton, [evaluation?.result, contract], {
            namespace: "vnc-adjectival-function-continuation",
            targetTense: tenseValue,
            sourceUnit: "vnc-predicate",
            sourceObjectPrefix,
            sourceVariantId: sourceSelectedVariant?.variantId || String(index),
            targetVariantId: targetSelectedVariant?.variantId || ""
          });
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetSurface}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = "Adjetival verbal";
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`#3 salida verbal: ${targetSurface}`, "Andrews 40.3: cláusula verbal en función adjetival", sourceObjectPrefix ? `objeto: ${sourceObjectPrefix}` : "", "no crea tronco nominal"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            targetObject.applyAdjectivalNncFunctionToVerbEntry({
              surface: targetSurface,
              formation: "vnc-adjectival",
              grammarFrame: contract.grammarFrame || contract.frames || null,
              sourceSelectedVariant,
              targetSelectedVariant,
              sourceContinuationFrame: contract.sourceContinuationFrame || null,
              targetContinuationFrame: contract.targetContinuationFrame || null,
              operationFrame: contract.operationFrame || null,
              requireCanonicalFormulaRecords: true
            });
          });
          appendContinuationAction(actions, continueButton);
          appended = true;
        });
        return appended;
      };
      const updateSectionCategory = prefix => {
        targetObject.applyObjectSectionCategory(sectionEl, prefix);
      };
      const getSubjectSelectionsForId = (subjectId = activeSubject) => {
        let selections = targetObject.getSubjectPersonSelections();
        if (subjectId !== targetObject.SUBJECT_TOGGLE_ALL) {
          const entry = subjectOptionMap.get(subjectId);
          if (!entry) {
            return [];
          }
          selections = selections.filter(({
            selection
          }) => selection.subjectPrefix === entry.subjectPrefix && selection.subjectSuffix === entry.subjectSuffix);
        }
        return selections;
      };
      const buildObjectSlotModelsForState = (slotOverrides = {}) => objectSlotStates.map(slotState => {
        const overrideId = Object.prototype.hasOwnProperty.call(slotOverrides, slotState.id) ? slotOverrides[slotState.id] : slotState.activeId;
        return {
          id: slotState.id,
          datasetKey: slotState.datasetKey,
          roleLabel: slotState.roleLabel,
          rawValues: overrideId === targetObject.OBJECT_TOGGLE_ALL ? slotState.toggleValues : [overrideId]
        };
      });
      const iterateObjectSlotValues = (slotModels, slotIndex, rawBySlot, callback) => {
        if (slotIndex >= slotModels.length) {
          callback(rawBySlot);
          return;
        }
        const slotModel = slotModels[slotIndex];
        const values = Array.isArray(slotModel.rawValues) && slotModel.rawValues.length ? slotModel.rawValues : [""];
        values.forEach(slotValue => {
          rawBySlot[slotModel.id] = slotValue || "";
          iterateObjectSlotValues(slotModels, slotIndex + 1, rawBySlot, callback);
        });
      };
      const combinationEvaluationCache = new Map();
      const nonactiveCombinationEvaluationCache = new Map();
      let toggleAvailabilityMemo = new Map();
      const generationModeOverride = targetObject.buildVerbModeGenerateOverride({
        isNonactiveMode,
        derivationType
      });
      const toggleAvailabilityMemoContext = ["toggle-availability", modeKey || "", derivationType || "", isNonactiveMode ? "nonactive" : "active", verb || "", tenseValue || "", String(activeValency || 0), String(modeObjectSlots || 0), String(nonactiveAvailableSlots || 0), String(allowIndirectObjectToggle), String(allowSubjectToggle), String(allowObjectToggle), hasPromotableObject ? "1" : "0"].join("|");
      const evaluateObjectCombinationState = (selection, rawBySlot) => {
        const slotValuesByRole = targetObject.mapSlotValuesByRole(rawBySlot);
        const grammarConstraintState = targetObject.evaluateGrammarConstraintSet({
          grammarState: resolvedGrammarState,
          subjectSelection: selection,
          slotValuesByRole,
          enforceValence4Matrix: allowThirdObjectToggle && Number(activeValency) >= 4
        });
        const rawObjectPrefix = grammarConstraintState.rawSlotValuesById.object || "";
        const rawIndirectMarker = grammarConstraintState.rawSlotValuesById.object2 || "";
        const rawThirdMarker = grammarConstraintState.rawSlotValuesById.object3 || "";
        const cacheKey = [selection.subjectPrefix, selection.subjectSuffix, rawObjectPrefix, rawIndirectMarker, rawThirdMarker].join("|");
        const cached = combinationEvaluationCache.get(cacheKey);
        if (cached) {
          return cached;
        }
        const shouldEnforceValence4Matrix = allowThirdObjectToggle && Number(activeValency) >= 4;
        const hasValenceStructureError = grammarConstraintState.valence4Violation;
        const resolvedValence = {
          objectPrefix: grammarConstraintState.normalizedSlotValuesById.object || "",
          indirectObjectMarker: grammarConstraintState.normalizedSlotValuesById.object2 || ""
        };
        const displaySlotValues = shouldEnforceValence4Matrix ? {
          object: rawObjectPrefix,
          object2: targetObject.collapseSilentSpecificForDisplay(rawIndirectMarker),
          object3: targetObject.collapseSilentSpecificForDisplay(rawThirdMarker)
        } : {
          object: resolvedValence.objectPrefix || "",
          object2: resolvedValence.indirectObjectMarker || "",
          object3: rawThirdMarker || ""
        };
        const generatedIndirectMarker = shouldEnforceValence4Matrix ? targetObject.collapseSilentSpecificForDisplay(rawIndirectMarker) : rawIndirectMarker;
        const generatedThirdMarker = shouldEnforceValence4Matrix ? targetObject.collapseSilentSpecificForDisplay(rawThirdMarker) : rawThirdMarker;
        const controllerForValidation = grammarConstraintState.controllerPrefix || "";
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            ...generationModeOverride
          },
          posicionesFormula: {
            pers1: selection.subjectPrefix,
            obj1: rawObjectPrefix,
            obj2: generatedIndirectMarker,
            obj3: generatedThirdMarker,
            tronco: verb,
            pers2: selection.subjectSuffix,
            num2: selection.subjectSuffix,
            poseedor: "",
            tiempo: tenseValue
          }
        }) || {};
        const maskState = targetObject.getConjugationMaskState({
          result,
          subjectPrefix: selection.subjectPrefix,
          subjectSuffix: selection.subjectSuffix,
          objectPrefix: rawObjectPrefix,
          comboObjectPrefix: controllerForValidation
        });
        const evaluation = {
          ...targetObject.buildConjugationEvaluationRecord({
            result,
            maskState,
            grammarConstraintState,
            hasValenceStructureError
          }),
          rawObjectPrefix,
          rawIndirectMarker,
          rawThirdMarker,
          displaySlotValues
        };
        combinationEvaluationCache.set(cacheKey, evaluation);
        return evaluation;
      };
      const resolveToggleAvailabilityState = ({
        subjectSelections,
        objectSlotModels
      }) => {
        const memoKey = [toggleAvailabilityMemoContext, "active", subjectSelections.map(({
          selection
        }) => `${selection.subjectPrefix || ""}:${selection.subjectSuffix || ""}`).join(","), objectSlotModels.map(slotModel => `${slotModel.id}:${(slotModel.rawValues || []).join(",")}`).join(";")].join("|");
        if (toggleAvailabilityMemo.has(memoKey)) {
          return toggleAvailabilityMemo.get(memoKey);
        }
        const summary = targetObject.createToggleAvailabilityRealizationSummary();
        subjectSelections.forEach(({
          selection
        }) => {
          iterateObjectSlotValues(objectSlotModels, 0, {}, rawBySlot => {
            const evaluation = evaluateObjectCombinationState(selection, rawBySlot);
            targetObject.recordToggleAvailabilityRealization(summary, evaluation);
          });
        });
        const resolvedRecord = targetObject.realizeToggleAvailabilitySummary(summary);
        toggleAvailabilityMemo.set(memoKey, resolvedRecord);
        return resolvedRecord;
      };
      const clearToggleAvailabilityStyling = () => {
        subjectButtons.forEach(button => clearToggleAvailabilityClasses(button));
        passiveSubjectButtons.forEach(button => clearToggleAvailabilityClasses(button));
        objectSlotStates.forEach(slotState => {
          slotState.buttons.forEach(button => clearToggleAvailabilityClasses(button));
        });
      };
      const evaluateNonactiveCombinationState = ({
        objectPrefixCandidate = "",
        passiveSubjectPrefixCandidate = null
      }) => {
        const cacheKey = `${objectPrefixCandidate || ""}|${passiveSubjectPrefixCandidate || ""}`;
        const cachedEvaluation = nonactiveCombinationEvaluationCache.get(cacheKey);
        if (cachedEvaluation) {
          return cachedEvaluation;
        }
        const overridePayload = {
          ...generationModeOverride,
          objectPrefix: objectPrefixCandidate,
          verb,
          tense: tenseValue
        };
        let subjectOverride = null;
        if (isDirectGroup && passiveSubjectPrefixCandidate) {
          subjectOverride = targetObject.getPassiveSubjectOverride(passiveSubjectPrefixCandidate);
          if (!subjectOverride) {
            return targetObject.buildConjugationEvaluationRecord({
              result: {},
              extraDiagnostics: [targetObject.buildConjugationDiagnosticEntry(targetObject.CONJUGATION_DIAGNOSTIC_IDS.invalidCombo, "error", {
                source: "grammar-constraint"
              })]
            });
          }
          overridePayload.subjectPrefix = subjectOverride.pers1;
          overridePayload.subjectSuffix = subjectOverride.pers2;
          overridePayload.preservePassiveSubject = true;
        }
        const subjectPers1 = subjectOverride?.pers1 || "";
        const subjectPers2 = subjectOverride?.pers2 || "";
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          allowPassiveObject: isDirectGroup && allowObjectToggle,
          override: overridePayload,
          posicionesFormula: {
            pers1: subjectPers1,
            obj1: objectPrefixCandidate,
            tronco: verb,
            pers2: subjectPers2,
            num2: subjectPers2,
            poseedor: "",
            tiempo: tenseValue
          }
        }) || {};
        const mappedSubjectInfo = subjectOverride ? targetObject.getPers1Pers2Info(subjectOverride.pers1 || "", subjectOverride.pers2 || "") : null;
        const shouldBypassPassiveMappedConstraints = isDirectGroup && !!subjectOverride && mappedSubjectInfo?.person === 3;
        const maskState = targetObject.getConjugationMaskState({
          result,
          subjectPrefix: subjectOverride?.subjectPrefix || "",
          subjectSuffix: subjectOverride?.subjectSuffix || "",
          objectPrefix: objectPrefixCandidate,
          invalidComboSet: targetObject.INVALID_COMBINATION_KEYS,
          controllerObjectMarker: shouldBypassPassiveMappedConstraints ? "" : null,
          enforceInvalidCombo: true
        });
        const hideReflexive = !!(result && result.isReflexive && targetObject.getObjectCategory(objectPrefixCandidate) !== "reflexive");
        const evaluation = targetObject.buildConjugationEvaluationRecord({
          result,
          maskState,
          extraDiagnostics: hideReflexive ? [targetObject.buildConjugationDiagnosticEntry(targetObject.CONJUGATION_DIAGNOSTIC_IDS.reflexiveHidden, "masked", {
            source: "result"
          })] : []
        });
        nonactiveCombinationEvaluationCache.set(cacheKey, evaluation);
        return evaluation;
      };
      const updateToggleOptionAvailabilityStyling = () => {
        if (!verb) {
          clearToggleAvailabilityStyling();
          return;
        }
        if (targetObject.VerbRenderContext === "typing") {
          targetObject.scheduleDeferredToggleAvailabilityPass();
          return;
        }
        if (isNonactiveMode) {
          clearToggleAvailabilityStyling();
          const objectSelectionPool = allowObjectToggle ? objectTogglePrefixes : [""];
          const resolveObjectSelections = objectToggleId => allowObjectToggle ? objectToggleId === targetObject.OBJECT_TOGGLE_ALL ? objectSelectionPool : [objectToggleId] : [""];
          const directSubjectPool = passiveSubjectPrefixes.filter(prefix => prefix !== "");
          const resolveSubjectSelections = subjectToggleId => {
            if (!isDirectGroup) {
              return [null];
            }
            if (allowSubjectToggle) {
              return subjectToggleId === targetObject.OBJECT_TOGGLE_ALL ? directSubjectPool : [subjectToggleId];
            }
            return directSubjectPool.length ? directSubjectPool : [null];
          };
          const classifyNonactiveSummary = (objectToggleId, subjectToggleId) => {
            const objectSelections = resolveObjectSelections(objectToggleId);
            const subjectSelections = resolveSubjectSelections(subjectToggleId);
            const memoKey = [toggleAvailabilityMemoContext, "nonactive", objectToggleId || "", subjectToggleId || "", objectSelections.join(","), subjectSelections.map(value => value || "").join(",")].join("|");
            if (toggleAvailabilityMemo.has(memoKey)) {
              return toggleAvailabilityMemo.get(memoKey);
            }
            const summary = targetObject.createToggleAvailabilityRealizationSummary();
            objectSelections.forEach(objectPrefixCandidate => {
              subjectSelections.forEach(passiveSubjectPrefixCandidate => {
                const evaluation = evaluateNonactiveCombinationState({
                  objectPrefixCandidate,
                  passiveSubjectPrefixCandidate
                });
                targetObject.recordToggleAvailabilityRealization(summary, evaluation);
              });
            });
            const resolvedRecord = targetObject.realizeToggleAvailabilitySummary(summary);
            toggleAvailabilityMemo.set(memoKey, resolvedRecord);
            return resolvedRecord;
          };
          const primarySlotState = objectSlotStateById.get("object");
          if (primarySlotState) {
            primarySlotState.buttons.forEach((button, objectToggleId) => {
              const availabilityRecord = classifyNonactiveSummary(objectToggleId, activePassiveSubject);
              const availabilityState = availabilityRecord.availabilityState;
              applyToggleAvailabilityClass(button, availabilityState);
              applySelectedAvailabilityClass(button, availabilityState, objectToggleId === activeObjectPrefix);
            });
          }
          if (allowSubjectToggle) {
            passiveSubjectButtons.forEach((button, subjectToggleId) => {
              const availabilityRecord = classifyNonactiveSummary(activeObjectPrefix, subjectToggleId);
              const availabilityState = availabilityRecord.availabilityState;
              applyToggleAvailabilityClass(button, availabilityState);
              applySelectedAvailabilityClass(button, availabilityState, subjectToggleId === activePassiveSubject);
            });
          }
          return;
        }
        const activeSubjectSelections = getSubjectSelectionsForId(activeSubject);
        objectSlotStates.forEach(slotState => {
          slotState.buttons.forEach((button, optionId) => {
            const staticViableSet = staticViableOptionSetBySlot.get(slotState.id);
            if (staticViableSet && optionId !== targetObject.OBJECT_TOGGLE_ALL && !staticViableSet.has(optionId)) {
              applyToggleAvailabilityClass(button, targetObject.CONJUGATION_AVAILABILITY_STATE.impossible);
              applySelectedAvailabilityClass(button, targetObject.CONJUGATION_AVAILABILITY_STATE.impossible, optionId === slotState.activeId);
              return;
            }
            const optionObjectModels = buildObjectSlotModelsForState({
              [slotState.id]: optionId
            });
            const availabilityRecord = resolveToggleAvailabilityState({
              subjectSelections: activeSubjectSelections,
              objectSlotModels: optionObjectModels
            });
            const availabilityState = availabilityRecord.availabilityState;
            applyToggleAvailabilityClass(button, availabilityState);
            applySelectedAvailabilityClass(button, availabilityState, optionId === slotState.activeId);
          });
        });
        if (subjectButtons.size) {
          const activeObjectModels = buildObjectSlotModelsForState();
          subjectButtons.forEach((button, subjectId) => {
            const subjectSelections = getSubjectSelectionsForId(subjectId);
            const availabilityRecord = resolveToggleAvailabilityState({
              subjectSelections,
              objectSlotModels: activeObjectModels
            });
            const availabilityState = availabilityRecord.availabilityState;
            applyToggleAvailabilityClass(button, availabilityState);
            applySelectedAvailabilityClass(button, availabilityState, subjectId === activeSubject);
          });
        }
      };
      const renderRows = () => {
        combinationEvaluationCache.clear();
        nonactiveCombinationEvaluationCache.clear();
        toggleAvailabilityMemo = new Map();
        blockOutputRows.length = 0;
        list.innerHTML = "";
        if (!verb) {
          const placeholder = targetObject.document.createElement("div");
          placeholder.className = "tense-placeholder";
          placeholder.textContent = targetObject.getPlaceholderLabel("conjugations", isNawat, "Ingresa un verbo para ver las conjugaciones.");
          list.appendChild(placeholder);
          updateToggleOptionAvailabilityStyling();
          return;
        }
        if (isNonactiveMode) {
          renderNonactiveConjugationRows({
            list,
            verb,
            tenseValue,
            prefixes,
            isDirectGroup,
            allowObjectToggle,
            allowSubjectToggle,
            objectTogglePrefixes,
            activeObjectPrefix,
            passiveSubjectPrefixes,
            activePassiveSubject,
            forceImpersonal,
            isNawat,
            generationModeOverride,
            afterRowRendered: ({
              value,
              evaluation,
              prefix
            }) => {
              appendVncAdjectivalFunctionRowContinuation({
                value,
                evaluation,
                sourceObjectPrefix: prefix || "",
                sourceCombinedMode: targetObject.COMBINED_MODE.nonactive,
                sourceVoiceMode: generationModeOverride?.voiceMode || targetObject.VOICE_MODE.passive
              });
            },
            buildOutputRowEntry: ({
              person,
              personSub,
              form,
              slotValuesById,
              grammarMetadata
            }) => {
              appendBlockOutputRow({
                person,
                personSub,
                form,
                slotValuesById,
                grammarMetadata
              });
            }
          });
          updateToggleOptionAvailabilityStyling();
          return;
        }
        const subjectSelections = getSubjectSelectionsForId(activeSubject);
        const objectSlotModels = buildObjectSlotModelsForState();
        const seenRows = new Set();
        const seenCanonicalBitransitiveRows = new Set();
        const isBitransitiveGrid = allowIndirectObjectToggle;
        let activeDenominalAndrewsContinuationRendered = false;
        const renderForObjectCombination = (group, selection, rawBySlot) => {
          const evaluation = evaluateObjectCombinationState(selection, rawBySlot);
          const displaySlotValues = evaluation.displaySlotValues;
          const canonicalKey = [selection.subjectPrefix, selection.subjectSuffix, ...objectSlotModels.map(slotModel => displaySlotValues[slotModel.id] || "")].join("|");
          if (isBitransitiveGrid && seenCanonicalBitransitiveRows.has(canonicalKey)) {
            return;
          }
          const row = targetObject.document.createElement("div");
          row.className = "conjugation-row";
          targetObject.applyConjugationRowClasses(row, displaySlotValues.object);
          objectSlotModels.forEach(slotModel => {
            if (!slotModel.datasetKey) {
              return;
            }
            row.dataset[slotModel.datasetKey] = displaySlotValues[slotModel.id] || "";
          });
          const label = targetObject.document.createElement("div");
          label.className = "conjugation-label";
          const personLabel = targetObject.document.createElement("div");
          personLabel.className = "person-label";
          personLabel.textContent = targetObject.getSubjectPersonLabel(group, selection, isNawat);
          const personSub = targetObject.document.createElement("div");
          personSub.className = "person-sub";
          label.appendChild(personLabel);
          label.appendChild(personSub);
          const value = targetObject.document.createElement("div");
          value.className = "conjugation-value";
          const shouldMaskRow = evaluation.shouldMaskRow;
          const isErrorRow = evaluation.isErrorRow;
          const basePersonSub = targetObject.getSubjectSubLabel(selection, {
            isNawat,
            mode: subjectSubMode,
            tenseValue
          });
          const showZeroObjectRoles = isBitransitiveGrid && Number(activeValency) >= 4;
          const useObjectOnlyPersonSub = Number(activeValency) >= 3;
          const objectOnlyParts = [];
          const roleParts = [];
          objectSlotModels.forEach(slotModel => {
            const displayValue = displaySlotValues[slotModel.id] || "";
            const slotLabel = displayValue ? targetObject.getObjectComboLabel(displayValue, isNawat) : showZeroObjectRoles ? "Ø" : "";
            if (!slotLabel) {
              return;
            }
            objectOnlyParts.push(slotLabel);
            roleParts.push(`${slotModel.roleLabel} ${slotLabel}`.trim());
          });
          const rowPersonSub = useObjectOnlyPersonSub ? targetObject.formatActiveValence3PlusPersonSub(basePersonSub, objectOnlyParts, isNawat) : roleParts.length ? [basePersonSub, ...roleParts].filter(Boolean).join(" · ") : [basePersonSub].filter(Boolean).join(" · ");
          personSub.textContent = appendGrammarFrameSubLabels(appendSentenceLayerSubLabels(appendVncVerbstemClassProfileSubLabels(appendCompoundFrameSubLabels(appendForwardDerivationFrameSubLabels(appendDerivedVoiceFrameSubLabels(appendVncValencyFrameSubLabels(appendNuclearClauseShellSubLabels(rowPersonSub, evaluation.result?.nuclearClauseShell, evaluation.result), evaluation.result?.vncValencyFrame), evaluation.result?.derivedVoiceFrame), evaluation.result?.forwardDerivationFrame), evaluation.result?.compoundFrame), evaluation.result?.verbstemClassProfile || evaluation.result?.stemProvenance?.verbstemClassProfile || null), evaluation.result?.sentenceLayer), evaluation.result, {
            maxDiagnostics: 1
          });
          renderGeneratedOutputSlotChips(personSub, evaluation.result);
          const renderedValue = shouldMaskRow ? typeof targetObject.getConjugationNoOutputDisplay === "function" ? targetObject.getConjugationNoOutputDisplay(evaluation) : "Sin salida para esta configuración." : targetObject.formatConjugationDisplay(getConjugationDisplaySurface(evaluation.result));
          const dedupeKey = isBitransitiveGrid ? canonicalKey : [selection.subjectPrefix, selection.subjectSuffix, ...objectSlotModels.map(slotModel => displaySlotValues[slotModel.id] || ""), renderedValue].join("|");
          if (seenRows.has(dedupeKey)) {
            return;
          }
          seenRows.add(dedupeKey);
          if (isBitransitiveGrid) {
            seenCanonicalBitransitiveRows.add(canonicalKey);
          }
          targetObject.applyConjugationEvaluationPresentation({
            row,
            value,
            evaluation,
            formattedValue: renderedValue
          });
          value.dataset.exportForm = renderedValue;
          applyGrammarFrameRouteDataset(row, evaluation.result);
          row.appendChild(label);
          row.appendChild(value);
          list.appendChild(row);
          if (!activeDenominalAndrewsContinuationRendered) {
            activeDenominalAndrewsContinuationRendered = renderDenominalAndrewsContractRouteContinuationForValue({
              value,
              evaluation,
              targetTense: tenseValue
            });
          }
          appendVncAdjectivalFunctionRowContinuation({
            value,
            evaluation,
            sourceObjectPrefix: displaySlotValues.object || "",
            sourceCombinedMode: targetObject.COMBINED_MODE.active,
            sourceVoiceMode: targetObject.VOICE_MODE.active
          });
          appendVerbToPatientivoRowContinuation({
            value,
            evaluation,
            sourceObjectPrefix: displaySlotValues.object || ""
          });
          appendVerbToNominalRowContinuations({
            value,
            evaluation,
            sourceObjectPrefix: displaySlotValues.object || ""
          });
          appendBlockOutputRow({
            person: personLabel.textContent.trim(),
            personSub: personSub.textContent.trim(),
            form: renderedValue,
            slotValuesById: displaySlotValues,
            grammarMetadata: typeof targetObject.getUnifiedVerbOutputGrammarDatasetMetadata === "function" ? targetObject.getUnifiedVerbOutputGrammarDatasetMetadata(row.dataset) : {}
          });
        };
        subjectSelections.forEach(({
          group,
          selection
        }) => {
          iterateObjectSlotValues(objectSlotModels, 0, {}, rawBySlot => {
            renderForObjectCombination(group, selection, rawBySlot);
          });
        });
        updateToggleOptionAvailabilityStyling();
      };
      const resolveSectionPrefix = prefix => {
        if (prefix !== targetObject.OBJECT_TOGGLE_ALL) {
          return prefix;
        }
        if (isNonactiveMode) {
          return prefixes[0] || "";
        }
        return "";
      };
      const setActivePrefix = (prefix, options = {}) => {
        activeObjectPrefix = prefix;
        if (primaryObjectSlot) {
          primaryObjectSlot.activeId = prefix;
        }
        targetObject.setToggleStateValue(targetObject.ObjectToggleState, objectStateKey, prefix, {
          syncLock: true
        });
        if (!isNonactiveMode) {
          titleLabel.textContent = buildBlockLabel();
        }
        tenseBlock.dataset.tenseBlock = `${resolveTenseBlockPrefix(prefix)}-${tenseValue}`;
        updateSectionCategory(resolveSectionPrefix(prefix));
        setToggleActiveState(toggleButtons, prefix);
        updateObjectToggleStyling();
        updateVerbTenseBlockPalette();
        updateVerbTenseBlockDestination();
        if (options.render !== false) {
          renderRows();
        }
      };
      tenseBlock.appendChild(list);
      if (isNonactiveMode) {
        const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
        const nonactiveBaseLabel = isIntransitiveOnly ? impersonalLabel : isDirectGroup ? passiveLabel : impersonalLabel;
        titleLabel.textContent = valencyLabel ? `${nonactiveBaseLabel} · ${valencyLabel}` : nonactiveBaseLabel;
        setActivePrefix(activeObjectPrefix, {
          render: false
        });
        if (setActivePassiveSubject) {
          setActivePassiveSubject(activePassiveSubject, {
            render: false
          });
        }
      } else {
        setActivePrefix(activeObjectPrefix, {
          render: false
        });
        if (setActiveSubject) {
          setActiveSubject(activeSubject, {
            render: false
          });
        }
      }
      objectSlotStates.filter(slotState => !slotState.isPrimary && typeof slotState.setActive === "function").forEach(slotState => {
        slotState.setActive(slotState.activeId, {
          render: false
        });
      });
      updateVerbTenseBlockPalette();
      renderRows();
      return tenseBlock;
    }
    function clearUnifiedVerbOutputDataset() {
      targetObject.VerbUnifiedOutputState.rows = [];
      targetObject.VerbUnifiedOutputState.bySourceKey = new Map();
      targetObject.VerbUnifiedOutputState.grouped = new Map();
      targetObject.VerbUnifiedOutputState.updatedAt = Date.now();
    }
    function rebuildUnifiedVerbOutputDataset(container, {
      tenseValue = "",
      groupKey = ""
    } = {}) {
      if (!container || typeof container.querySelectorAll !== "function") {
        clearUnifiedVerbOutputDataset();
        return;
      }
      const structuredRows = targetObject.collectStructuredUnifiedVerbOutputRows(container, {
        tenseValue,
        groupKey
      });
      if (structuredRows.length) {
        targetObject.setUnifiedVerbOutputDatasetRows(structuredRows, {
          tenseValue,
          groupKey
        });
        return;
      }
      const rows = [];
      const bySourceKey = new Map();
      const grouped = new Map();
      const rowNodes = Array.from(container.querySelectorAll(".tense-block .conjugation-row"));
      rowNodes.forEach(row => {
        const block = row.closest(".tense-block");
        if (!block) {
          return;
        }
        const sourceColumn = row.closest(".tense-grid-source-column");
        const sourceMode = sourceColumn?.dataset?.sourceMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : sourceColumn?.dataset?.sourceMode === "mixed" ? "mixed" : targetObject.COMBINED_MODE.active;
        const blockLabel = block.querySelector(".tense-block__label")?.textContent?.trim() || "";
        const person = row.querySelector(".person-label")?.textContent?.trim() || "";
        const personSub = row.querySelector(".person-sub")?.textContent?.trim() || "";
        const form = typeof targetObject.getVisibleConjugationValueExportText === "function" ? targetObject.getVisibleConjugationValueExportText(row) : row.querySelector(".conjugation-value")?.textContent?.trim() || "";
        const object = row.dataset.objectPrefix || "";
        const object2 = row.dataset.indirectObjectPrefix || "";
        const object3 = row.dataset.thirdObjectPrefix || "";
        const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
        const entry = {
          tenseValue: tenseValue || (selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue) || "",
          groupKey: groupKey || selectionState.group || "",
          sourceMode,
          block: blockLabel,
          person,
          personSub,
          object,
          object2,
          object3,
          form,
          ...(typeof targetObject.getUnifiedVerbOutputGrammarDatasetMetadata === "function" ? targetObject.getUnifiedVerbOutputGrammarDatasetMetadata(row.dataset) : {}),
          ...(typeof targetObject.getVisibleConjugationFormulaSurfaceExportMetadata === "function" ? targetObject.getVisibleConjugationFormulaSurfaceExportMetadata(row) : {})
        };
        rows.push(entry);
        const baseKey = [entry.groupKey, entry.tenseValue, entry.block, entry.person, entry.personSub, entry.object, entry.object2, entry.object3].join("|");
        const sourceKey = `${baseKey}|${sourceMode}`;
        bySourceKey.set(sourceKey, entry);
        const groupedEntry = grouped.get(baseKey) || {};
        groupedEntry[sourceMode] = entry;
        grouped.set(baseKey, groupedEntry);
      });
      targetObject.VerbUnifiedOutputState.rows = rows;
      targetObject.VerbUnifiedOutputState.bySourceKey = bySourceKey;
      targetObject.VerbUnifiedOutputState.grouped = grouped;
      targetObject.VerbUnifiedOutputState.updatedAt = Date.now();
    }
    function renderVerbConjugationBlocks({
      container,
      tenseValue,
      buildBlock,
      objectPrefixGroupsByMode = null,
      modesToRender = [targetObject.COMBINED_MODE.active],
      isNawat = false
    }) {
      container.innerHTML = "";
      const normalizedModes = Array.isArray(modesToRender) && modesToRender.length ? Array.from(new Set(modesToRender.map(mode => mode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active))) : [targetObject.COMBINED_MODE.active];
      const groupsByMode = new Map();
      normalizedModes.forEach(mode => {
        const groups = objectPrefixGroupsByMode instanceof Map ? objectPrefixGroupsByMode.get(mode) || [] : [];
        groupsByMode.set(mode, Array.isArray(groups) ? groups : []);
      });
      const maxGroupCount = normalizedModes.reduce((max, mode) => Math.max(max, (groupsByMode.get(mode) || []).length), 0);
      for (let groupIndex = 0; groupIndex < maxGroupCount; groupIndex += 1) {
        const objSection = targetObject.document.createElement("div");
        objSection.className = "object-section";
        const grid = targetObject.document.createElement("div");
        grid.className = "tense-grid";
        const useSourceColumns = normalizedModes.length > 1;
        const sourceColumns = useSourceColumns ? createSourceModeColumns(grid, isNawat) : null;
        normalizedModes.forEach(mode => {
          const objectGroup = (groupsByMode.get(mode) || [])[groupIndex];
          if (!objectGroup) {
            return;
          }
          const block = buildBlock(tenseValue, objectGroup, objSection, mode);
          if (!block) {
            return;
          }
          if (sourceColumns) {
            sourceColumns.appendBlock(block, mode);
            return;
          }
          grid.appendChild(block);
        });
        if (sourceColumns) {
          sourceColumns.finalize();
        }
        objSection.appendChild(grid);
        container.appendChild(objSection);
      }
    }
    function createObjectSectionGrid(container) {
      container.innerHTML = "";
      const objSection = targetObject.document.createElement("div");
      objSection.className = "object-section";
      const grid = targetObject.document.createElement("div");
      grid.className = "tense-grid";
      objSection.appendChild(grid);
      container.appendChild(objSection);
      return {
        objSection,
        grid
      };
    }
    function createSourceModeColumns(grid, isNawat = false) {
      if (!grid) {
        return null;
      }
      grid.classList.add("tense-grid--source-columns");
      const buildColumn = (mode, fallbackLabel = "") => {
        const column = targetObject.document.createElement("div");
        column.className = "tense-grid-source-column";
        column.dataset.sourceMode = mode;
        const heading = targetObject.document.createElement("div");
        heading.className = "tense-grid-source-column__heading";
        const labelKey = mode === targetObject.COMBINED_MODE.nonactive ? "tense-tabs-mode-nonactive" : "tense-tabs-mode-active";
        heading.textContent = targetObject.getLocalizedLabel(targetObject.UI_LABELS[labelKey], isNawat, fallbackLabel);
        const blocks = targetObject.document.createElement("div");
        blocks.className = "tense-grid-source-column__blocks";
        column.appendChild(heading);
        column.appendChild(blocks);
        grid.appendChild(column);
        return {
          column,
          blocks,
          mode
        };
      };
      const activeColumn = buildColumn(targetObject.COMBINED_MODE.active, "activo");
      const nonactiveColumn = buildColumn(targetObject.COMBINED_MODE.nonactive, "no activo");
      const mixedColumn = buildColumn("mixed", "activo / no activo");
      mixedColumn.column.classList.add("tense-grid-source-column--mixed");
      const clearEmptyPlaceholder = blocks => {
        blocks.querySelectorAll(".tense-grid-source-column__empty").forEach(empty => {
          empty.remove();
        });
      };
      return {
        appendBlock(block, mode = targetObject.COMBINED_MODE.active) {
          if (!block) {
            return;
          }
          const target = mode === "mixed" ? mixedColumn.blocks : mode === targetObject.COMBINED_MODE.nonactive ? nonactiveColumn.blocks : activeColumn.blocks;
          clearEmptyPlaceholder(target);
          target.appendChild(block);
        },
        finalize() {
          [activeColumn.blocks, nonactiveColumn.blocks].forEach(blocks => {
            clearEmptyPlaceholder(blocks);
            if (blocks.children.length > 0) {
              return;
            }
            const empty = targetObject.document.createElement("div");
            empty.className = "tense-grid-source-column__empty";
            empty.textContent = "Sin salidas en este grupo.";
            blocks.appendChild(empty);
          });
          clearEmptyPlaceholder(mixedColumn.blocks);
          mixedColumn.column.hidden = mixedColumn.blocks.children.length === 0;
        }
      };
    }
    function buildToggleControl({
      options,
      activeId,
      onSelect,
      ariaLabel,
      visibleLabel = "",
      getTitle,
      getIsDisabled,
      getActiveId,
      stacked = true,
      toggleClassName = "",
      allowDeselect = false
    }) {
      const toggle = targetObject.document.createElement("div");
      toggle.className = stacked ? "object-toggle object-toggle--stacked" : "object-toggle";
      if (toggleClassName) {
        toggle.classList.add(toggleClassName);
      }
      toggle.setAttribute("role", "group");
      toggle.setAttribute("aria-label", ariaLabel);
      const normalizedVisibleLabel = String(visibleLabel || "").trim();
      if (normalizedVisibleLabel) {
        toggle.classList.add("object-toggle--with-label");
        const label = targetObject.document.createElement("span");
        label.className = "object-toggle__label";
        label.textContent = normalizedVisibleLabel;
        label.setAttribute("aria-hidden", "true");
        toggle.appendChild(label);
      }
      const buttons = new Map();
      options.forEach(option => {
        const button = targetObject.document.createElement("button");
        button.type = "button";
        button.className = "object-toggle-button";
        button.textContent = option.label;
        if (option.availabilityState) {
          button.dataset.availabilityState = option.availabilityState;
        }
        if (option.diagnosticIds) {
          button.dataset.diagnosticIds = option.diagnosticIds;
        }
        if (option.selectedUnsupported) {
          button.dataset.selectedUnsupported = "true";
          button.classList.add("is-selected-unsupported");
        }
        const isActive = option.id === activeId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        const title = typeof getTitle === "function" ? getTitle(option) : option.title;
        if (title) {
          button.title = title;
        }
        const isDisabled = option.disabled === true || (typeof getIsDisabled === "function" ? getIsDisabled(option) : false);
        if (isDisabled) {
          button.disabled = true;
          button.setAttribute("aria-disabled", "true");
          button.classList.add("is-unavailable");
        }
        button.addEventListener("click", () => {
          const resolvedActiveId = typeof getActiveId === "function" ? getActiveId() : activeId;
          if (allowDeselect && resolvedActiveId === option.id) {
            targetObject.preserveViewportAnchorPosition(button, () => {
              onSelect(null);
            });
            return;
          }
          if (targetObject.isToggleLockEnabled() && resolvedActiveId === option.id) {
            targetObject.preserveViewportAnchorPosition(button, () => {
              targetObject.setToggleLockEnabled(false, {
                resetToDefaults: true,
                persist: true,
                refreshUi: true
              });
            });
            return;
          }
          targetObject.preserveViewportAnchorPosition(button, () => {
            onSelect(option.id);
          });
        });
        buttons.set(option.id, button);
        toggle.appendChild(button);
      });
      return {
        toggle,
        buttons
      };
    }
    function setToggleActiveState(buttons, activeId) {
      buttons.forEach((button, key) => {
        const isActive = key === activeId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
    }
    function getVerbObjectPrefixGroups(parsedVerb, isNonactiveMode, nonactiveConfig) {
      const objectPrefixes = targetObject.getObjectPrefixesForTransitividad(parsedVerb);
      if (isNonactiveMode && nonactiveConfig) {
        return nonactiveConfig.groups;
      }
      if (!isNonactiveMode && targetObject.getTransitividadSelection(parsedVerb) === "transitivo") {
        const orderedPrefixes = ["nech", "metz", "ki", "tech", "metzin", "kin", "ta", "te", "mu"].filter(prefix => objectPrefixes.includes(prefix));
        return [{
          prefixes: orderedPrefixes.length ? orderedPrefixes : objectPrefixes
        }];
      }
      return targetObject.buildObjectPrefixGroups(objectPrefixes);
    }
    function resolveVerbTenseValue({
      modeKey,
      tenseValue
    }) {
      const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
      if (modeKey === "universal") {
        return targetObject.PRETERITO_UNIVERSAL_ORDER.includes(tenseValue) ? tenseValue : selectionState.universalTenseValue;
      }
      return tenseValue || selectionState.tenseValue;
    }
    function buildVerbTabRenderContext({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = "",
      modeKey,
      subjectKeyPrefix,
      subjectSubMode,
      combinedMode = null,
      includeDiagnostics = false
    }) {
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return null;
      }
      const resolvedCombinedMode = combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : combinedMode === targetObject.COMBINED_MODE.active ? targetObject.COMBINED_MODE.active : targetObject.getCombinedMode();
      const isNonactiveMode = targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.verbo && resolvedCombinedMode === targetObject.COMBINED_MODE.nonactive;
      const languageSwitch = targetObject.document.getElementById("language");
      const isNawat = languageSwitch && languageSwitch.checked;
      const resolvedTenseValue = resolveVerbTenseValue({
        modeKey,
        tenseValue
      });
      const parsedVerb = targetObject.getParsedVerbForTab(modeKey || "verb", verb);
      const derivationType = parsedVerb.derivationType || targetObject.getActiveDerivationType();
      const initialGrammarState = targetObject.buildCanonicalGrammarState({
        parsedVerb,
        derivationType,
        voiceMode: isNonactiveMode ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active,
        isNonactiveMode
      });
      const forceDefaultTodosKi = parsedVerb.hasConsecutiveSpecificValences;
      const nonactiveConfig = isNonactiveMode ? targetObject.getNonactiveObjectPrefixGroups(parsedVerb) : null;
      const valencySummary = initialGrammarState.valencySummary;
      const activeValency = initialGrammarState.valencyActive;
      const nonactiveAvailableSlots = isNonactiveMode ? valencySummary.nonactiveObjectSlots : 0;
      const modeObjectSlots = Array.isArray(initialGrammarState.modeSlots) ? initialGrammarState.modeSlots.length : isNonactiveMode ? valencySummary.nonactiveObjectSlots : valencySummary.availableObjectSlots;
      const hasPromotableObject = isNonactiveMode ? valencySummary.baseObjectSlots > valencySummary.fusionObjectSlots : false;
      const embeddedObjectFilled = parsedVerb.embeddedValenceCount > 0 && targetObject.getAvailableObjectSlots(parsedVerb) <= 0;
      const fusionMarkers = parsedVerb.isTaFusion ? (parsedVerb.fusionPrefixes || []).filter(prefix => targetObject.FUSION_PREFIXES.has(prefix)) : [];
      const baseObjectPrefixGroups = getVerbObjectPrefixGroups(parsedVerb, isNonactiveMode, nonactiveConfig);
      const allowIndirectObjectToggleFinal = modeObjectSlots > 1;
      let objectPrefixGroups = baseObjectPrefixGroups;
      if (allowIndirectObjectToggleFinal && !isNonactiveMode) {
        const mergedPrefixes = Array.from(new Set(baseObjectPrefixGroups.flatMap(group => group.prefixes || []))).filter(prefix => prefix !== "");
        if (mergedPrefixes.length) {
          objectPrefixGroups = [{
            prefixes: mergedPrefixes
          }];
        }
      }
      const indirectTogglePrefixes = allowIndirectObjectToggleFinal ? [...targetObject.SPECIFIC_VALENCE_PREFIXES, "ta", "te", "mu"] : [];
      const primaryTogglePrefixes = Array.from(new Set(objectPrefixGroups.flatMap(group => group.prefixes || [])));
      const grammarPipeline = targetObject.runVerbGrammarPipeline({
        verb,
        modeKey: modeKey || "verb",
        parsedVerb,
        derivationType,
        voiceMode: isNonactiveMode ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active,
        isNonactiveMode,
        primaryTogglePrefixes,
        indirectTogglePrefixes,
        includeDiagnostics
      });
      const grammarState = grammarPipeline.state || initialGrammarState;
      const grammarUiConfig = grammarPipeline.uiConfig || null;
      const resolvedActiveValency = Number.isFinite(grammarState?.valencyActive) ? grammarState.valencyActive : activeValency;
      const resolvedModeObjectSlots = Array.isArray(grammarState?.modeSlots) ? grammarState.modeSlots.length : modeObjectSlots;
      const resolvedNonactiveAvailableSlots = isNonactiveMode ? grammarState?.valencySummary?.nonactiveObjectSlots ?? nonactiveAvailableSlots : 0;
      const context = {
        container,
        verb,
        resolvedTenseValue,
        combinedMode: resolvedCombinedMode,
        isNonactiveMode,
        isNawat,
        modeKey,
        subjectKeyPrefix,
        subjectSubMode,
        derivationType,
        activeValency: resolvedActiveValency,
        modeObjectSlots: resolvedModeObjectSlots,
        nonactiveAvailableSlots: resolvedNonactiveAvailableSlots,
        hasPromotableObject,
        embeddedObjectFilled,
        fusionMarkers,
        objectPrefixGroups,
        forceDefaultTodosKi,
        allowIndirectObjectToggle: resolvedModeObjectSlots > 1,
        indirectTogglePrefixes,
        grammarState,
        grammarUiConfig
      };
      if (includeDiagnostics) {
        context.grammarConstraintContext = grammarPipeline.constraintStep || null;
        context.grammarStemPairs = grammarPipeline.stemStep?.stemPairs || [];
      }
      return context;
    }
    function renderVerbConjugationsCore({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = "",
      modeKey,
      subjectKeyPrefix,
      subjectSubMode,
      objectPrefix = "",
      includeDiagnostics = false
    }) {
      const resolvedOutputTenseValue = resolveVerbTenseValue({
        modeKey,
        tenseValue
      });
      if (modeKey !== "universal" && typeof targetObject.isAndrewsCnvTenseGenerationGateAllowed === "function" && !targetObject.isAndrewsCnvTenseGenerationGateAllowed(resolvedOutputTenseValue, targetObject.TENSE_MODE.verbo)) {
        clearUnifiedVerbOutputDataset();
        renderOutputSelectionRequiredPlaceholder({
          containerId,
          titleText: "Andrews",
          tenseValue: resolvedOutputTenseValue,
          mode: targetObject.TENSE_MODE.verbo,
          blockKind: "CNV generation gate blocked",
          blockClassName: "tense-block--cnv-generation-gate-blocked",
          message: "La salida CNV queda bloqueada hasta que la ranura tiempo tenga una puerta de generacion Andrews."
        });
        const container = targetObject.document.getElementById(containerId);
        if (typeof targetObject.syncAndrewsTenseAuthorityDomAudit === "function") {
          targetObject.syncAndrewsTenseAuthorityDomAudit(container, {
            mode: targetObject.TENSE_MODE.verbo
          });
        }
        return;
      }
      const selectedCombinedMode = targetObject.getCombinedMode();
      const sourceScope = targetObject.getVerbSourceScope();
      const isSimpleUi = targetObject.getActiveUiDensityMode() === targetObject.UI_DENSITY_MODE.simple;
      const modesToRender = isSimpleUi ? [targetObject.COMBINED_MODE.active] : sourceScope === targetObject.VERB_SOURCE_SCOPE.active ? [targetObject.COMBINED_MODE.active] : sourceScope === targetObject.VERB_SOURCE_SCOPE.nonactive ? [targetObject.COMBINED_MODE.nonactive] : [targetObject.COMBINED_MODE.active, targetObject.COMBINED_MODE.nonactive];
      const contextByMode = new Map();
      modesToRender.forEach(mode => {
        const modeContext = buildVerbTabRenderContext({
          verb,
          containerId,
          tenseValue,
          modeKey,
          subjectKeyPrefix,
          subjectSubMode,
          combinedMode: mode,
          includeDiagnostics: includeDiagnostics && mode === selectedCombinedMode
        });
        if (modeContext) {
          contextByMode.set(mode, modeContext);
        }
      });
      const context = contextByMode.get(selectedCombinedMode) || contextByMode.get(targetObject.COMBINED_MODE.active) || contextByMode.get(targetObject.COMBINED_MODE.nonactive) || null;
      if (!context) {
        clearUnifiedVerbOutputDataset();
        return;
      }
      const objectPrefixGroupsByMode = new Map();
      contextByMode.forEach((modeContext, mode) => {
        objectPrefixGroupsByMode.set(mode, modeContext.objectPrefixGroups || []);
      });
      const buildBlock = (blockTenseValue, objectGroup, sectionEl, mode = selectedCombinedMode) => {
        const modeContext = contextByMode.get(mode) || context;
        return buildVerbTenseBlock({
          verb: modeContext.verb,
          tenseValue: blockTenseValue,
          objectGroup,
          sectionEl,
          isNonactiveMode: modeContext.isNonactiveMode,
          isNawat: modeContext.isNawat,
          modeKey: modeContext.modeKey,
          subjectKeyPrefix: modeContext.subjectKeyPrefix,
          subjectSubMode: modeContext.subjectSubMode,
          derivationType: modeContext.derivationType,
          activeValency: modeContext.activeValency,
          modeObjectSlots: modeContext.modeObjectSlots,
          nonactiveAvailableSlots: modeContext.nonactiveAvailableSlots,
          hasPromotableObject: modeContext.hasPromotableObject,
          embeddedObjectFilled: modeContext.embeddedObjectFilled,
          fusionMarkers: modeContext.fusionMarkers,
          forceDefaultTodosKi: modeContext.forceDefaultTodosKi,
          allowIndirectObjectToggle: modeContext.allowIndirectObjectToggle,
          indirectTogglePrefixes: modeContext.indirectTogglePrefixes,
          preferredObjectPrefix: objectPrefix,
          grammarState: modeContext.grammarState,
          grammarUiConfig: modeContext.grammarUiConfig
        });
      };
      renderVerbConjugationBlocks({
        container: context.container,
        tenseValue: context.resolvedTenseValue,
        buildBlock,
        objectPrefixGroupsByMode,
        modesToRender,
        isNawat: context.isNawat
      });
      const resolvedGroup = modeKey === "universal" ? targetObject.CONJUGATION_GROUPS.universal : targetObject.CONJUGATION_GROUPS.tense;
      rebuildUnifiedVerbOutputDataset(context.container, {
        tenseValue: context.resolvedTenseValue,
        groupKey: resolvedGroup
      });
    }
    function renderPretUniversalConjugations({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = ""
    }) {
      renderVerbConjugationsCore({
        verb,
        containerId,
        tenseValue,
        modeKey: "universal",
        subjectKeyPrefix: "universal",
        subjectSubMode: "verb"
      });
    }
    function renderLocativoTemporalConjugations({
      verb,
      containerId = "all-tense-conjugations",
      modeFilter = null
    }) {
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return;
      }
      const languageSwitch = targetObject.document.getElementById("language");
      const isNawat = languageSwitch && languageSwitch.checked;
      const placeholderText = targetObject.getPlaceholderLabel("conjugations", isNawat, "Ingresa un verbo para ver las conjugaciones.");
      const allToggleLabel = targetObject.getToggleLabel("all", isNawat, "todos");
      const impersonalLabel = targetObject.getVerbBlockLabel("impersonal", isNawat, "impersonal");
      const possessorToggleLabel = targetObject.getToggleLabel("possessor", isNawat, "poseedor");
      const objectToggleLabel = targetObject.getToggleLabel("object", isNawat, "objeto");
      const verbMeta = targetObject.getParsedVerbForTab("noun", verb);
      const possessorValues = targetObject.POSSESSIVE_PREFIXES.map(entry => entry.value).filter(value => value);
      const activeObjectKey = targetObject.getObjectStateKey({
        groupKey: "locativo-temporal|active|objects",
        tenseValue: "locativo-temporal",
        mode: "noun"
      });
      const activePossessorKey = "noun|locativo-temporal|active|possessor";
      const nonactiveObjectKey = targetObject.getObjectStateKey({
        groupKey: "locativo-temporal|nonactive|objects",
        tenseValue: "locativo-temporal",
        mode: "noun"
      });
      const nonactivePrimaryKey = "noun|locativo-temporal|nonactive|primary";
      const slotBundlesByMode = {
        [targetObject.COMBINED_MODE.active]: targetObject.buildNounObjectSlotToggleStates({
          verbMeta,
          tenseValue: "locativo-temporal",
          baseObjectStateKey: activeObjectKey,
          isNawat,
          combinedMode: targetObject.COMBINED_MODE.active
        }),
        [targetObject.COMBINED_MODE.nonactive]: targetObject.buildNounObjectSlotToggleStates({
          verbMeta,
          tenseValue: "locativo-temporal",
          baseObjectStateKey: nonactiveObjectKey,
          isNawat,
          combinedMode: targetObject.COMBINED_MODE.nonactive
        })
      };
      const resolveStoredPossessor = ({
        stateKey,
        allowedValues,
        fallbackValue = ""
      }) => {
        const allowedSet = new Set([targetObject.OBJECT_TOGGLE_ALL, ...allowedValues]);
        let value = targetObject.getToggleStateValue(targetObject.PossessorToggleState, stateKey);
        if (!allowedSet.has(value)) {
          value = fallbackValue;
        }
        targetObject.setToggleStateValue(targetObject.PossessorToggleState, stateKey, value, {
          syncLock: false
        });
        return value;
      };
      const {
        grid
      } = createObjectSectionGrid(container);
      const sourceColumns = modeFilter == null && !targetObject.isPreteritAgentiveLocativeNnc ? createSourceModeColumns(grid, isNawat) : null;
      const buildPossessorOptions = values => {
        const options = [{
          id: targetObject.OBJECT_TOGGLE_ALL,
          label: allToggleLabel,
          value: ""
        }];
        values.forEach(value => {
          options.push({
            id: value,
            label: value || "Ø",
            value
          });
        });
        return options;
      };
      const buildBlock = ({
        mode
      }) => {
        const isNonactive = mode === targetObject.COMBINED_MODE.nonactive;
        const slotBundle = slotBundlesByMode[mode] || slotBundlesByMode[targetObject.COMBINED_MODE.active];
        const mutableSlotStates = slotBundle.slotStates.map(slot => ({
          ...slot
        }));
        const nonactiveObjectToggleValues = Array.from(targetObject.SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES).map(value => String(value || "")).filter(Boolean);
        if (isNonactive && nonactiveObjectToggleValues.length) {
          mutableSlotStates.forEach(slotState => {
            slotState.toggleValues = nonactiveObjectToggleValues;
            slotState.options = targetObject.getObjectToggleOptions(slotState.toggleValues, {
              includeAll: true,
              labelForPrefix: targetObject.getNonspecificToggleLabel,
              isNawat
            });
            slotState.optionMap = new Map(slotState.options.map(entry => [entry.id, entry]));
            slotState.showToggle = slotState.toggleValues.length > 1;
            const isActiveValid = slotState.activeId !== undefined && (slotState.toggleValues.includes(slotState.activeId) || slotState.showToggle && slotState.activeId === targetObject.OBJECT_TOGGLE_ALL);
            if (!isActiveValid) {
              slotState.activeId = targetObject.getDefaultOutputToggleSelection({
                context: "noun-extra-object",
                values: slotState.toggleValues,
                isAddedSlot: slotState.isAddedSlot
              });
            }
            targetObject.setToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey, slotState.activeId, {
              syncLock: false
            });
          });
        }
        const buildNonactivePrimaryOptions = () => {
          const isIntransitiveNonactiveLocativo = slotBundle.availableObjectSlots <= 0;
          if (isIntransitiveNonactiveLocativo) {
            return [{
              id: "impersonal",
              label: impersonalLabel,
              value: "",
              type: "impersonal"
            }];
          }
          const options = [{
            id: targetObject.OBJECT_TOGGLE_ALL,
            label: allToggleLabel,
            type: "all",
            value: ""
          }];
          possessorValues.forEach(value => {
            options.push({
              id: `pos:${value}`,
              label: value,
              value,
              type: "possessor"
            });
          });
          nonactiveObjectToggleValues.forEach(value => {
            options.push({
              id: `obj:${value}`,
              label: value,
              value,
              type: "object"
            });
          });
          return options;
        };
        const slotStateById = new Map(mutableSlotStates.map(slot => [slot.id, slot]));
        const slotButtonsById = new Map();
        const resolveActiveSlotValue = slotId => slotStateById.get(slotId)?.activeId || "";
        const possessorStateKey = activePossessorKey;
        const possessorToggleValues = possessorValues;
        const defaultPossessor = targetObject.getDefaultOutputToggleSelection({
          context: "noun-possessor",
          values: possessorValues
        });
        let activePossessor = resolveStoredPossessor({
          stateKey: possessorStateKey,
          allowedValues: possessorToggleValues,
          fallbackValue: defaultPossessor
        });
        const nonactivePrimaryOptions = isNonactive ? buildNonactivePrimaryOptions() : [];
        const nonactivePrimaryOptionMap = new Map(nonactivePrimaryOptions.map(option => [option.id, option]));
        let activeNonactivePrimary = targetObject.getToggleStateValue(targetObject.ObjectToggleState, nonactivePrimaryKey);
        if (isNonactive) {
          const hasStoredPrimary = activeNonactivePrimary === targetObject.OBJECT_TOGGLE_ALL || nonactivePrimaryOptionMap.has(activeNonactivePrimary);
          if (!hasStoredPrimary) {
            const firstSpecificNonactivePrimary = nonactivePrimaryOptions.find(option => option.id !== targetObject.OBJECT_TOGGLE_ALL)?.id;
            activeNonactivePrimary = targetObject.getDefaultOutputToggleSelection({
              context: "noun-nonactive-primary",
              values: Array.from(nonactivePrimaryOptionMap.keys()),
              fallbackIds: [firstSpecificNonactivePrimary, targetObject.OBJECT_TOGGLE_ALL]
            });
          }
          targetObject.setToggleStateValue(targetObject.ObjectToggleState, nonactivePrimaryKey, activeNonactivePrimary, {
            syncLock: false
          });
        }
        const resolveNonactivePrimarySelection = selectionId => {
          const option = nonactivePrimaryOptionMap.get(selectionId);
          if (!option) {
            return {
              objectPrefix: "",
              possessorPrefix: ""
            };
          }
          if (option.type === "possessor") {
            return {
              objectPrefix: targetObject.POSSESSIVE_TO_OBJECT_PREFIX[option.value] || "",
              possessorPrefix: option.value || ""
            };
          }
          if (option.type === "object") {
            return {
              objectPrefix: option.value || "",
              possessorPrefix: ""
            };
          }
          return {
            objectPrefix: "",
            possessorPrefix: ""
          };
        };
        const tenseBlock = targetObject.document.createElement("div");
        tenseBlock.className = "tense-block";
        tenseBlock.dataset.tenseBlock = `${mode}-locativo-temporal`;
        if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
          targetObject.applyAndrewsTenseAuthorityDataset(tenseBlock, {
            tenseValue: "locativo-temporal",
            mode,
            blockKind: "CNN locativo/temporal"
          });
        }
        const tenseTitle = targetObject.document.createElement("div");
        tenseTitle.className = "tense-block__title";
        const titleLabel = targetObject.document.createElement("span");
        titleLabel.className = "tense-block__label";
        const locativoLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS["locativo-temporal"], isNawat, "locativo/temporal");
        const locativoSourceMode = targetObject.getNominalSourceModeForTense("locativo-temporal", {
          blockMode: mode
        });
        const locativoSourceTenseLabel = targetObject.getNominalSourceTenseLabel("locativo-temporal", {
          isNawat
        });
        titleLabel.textContent = targetObject.buildNominalSourceTaggedLabel(locativoLabel, locativoSourceMode, isNawat, {
          sourceTenseLabel: locativoSourceTenseLabel
        });
        tenseTitle.appendChild(titleLabel);
        const titleControls = targetObject.document.createElement("div");
        titleControls.className = "tense-block__controls tense-block__controls--stacked";
        const list = targetObject.document.createElement("div");
        list.className = "conjugation-list";
        const resolveLocativoBlockPaletteSignature = () => {
          if (isNonactive) {
            const hasMixedObjectSlot = mutableSlotStates.filter(slotState => slotState.id !== "object").some(slotState => slotState.activeId === targetObject.OBJECT_TOGGLE_ALL);
            if (hasMixedObjectSlot || activeNonactivePrimary === targetObject.OBJECT_TOGGLE_ALL) {
              return "mixed";
            }
            const primarySelection = resolveNonactivePrimarySelection(activeNonactivePrimary);
            return targetObject.buildBlockComboPaletteSignature({
              mode: "noun",
              valency: Math.max(1, mutableSlotStates.length + 1),
              objectPrefix: primarySelection.objectPrefix,
              indirectObjectMarker: resolveActiveSlotValue("object2"),
              thirdObjectMarker: resolveActiveSlotValue("object3"),
              possessorPrefix: primarySelection.possessorPrefix
            });
          }
          const hasMixedObjectSlot = mutableSlotStates.some(slotState => slotState.activeId === targetObject.OBJECT_TOGGLE_ALL);
          if (hasMixedObjectSlot || activePossessor === targetObject.OBJECT_TOGGLE_ALL) {
            return "mixed";
          }
          const objectPrefix = resolveActiveSlotValue("object");
          return targetObject.buildBlockComboPaletteSignature({
            mode: "noun",
            valency: Math.max(1, mutableSlotStates.length + 1),
            objectPrefix,
            indirectObjectMarker: resolveActiveSlotValue("object2"),
            thirdObjectMarker: resolveActiveSlotValue("object3"),
            possessorPrefix: activePossessor || ""
          });
        };
        const updateLocativoBlockPalette = () => {
          targetObject.applyTenseBlockComboPalette(tenseBlock, resolveLocativoBlockPaletteSignature());
        };
        const TOGGLE_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--viable", "object-toggle-button--masked", "object-toggle-button--impossible"];
        const TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--selected-viable", "object-toggle-button--selected-masked", "object-toggle-button--selected-impossible"];
        const clearToggleAvailabilityClasses = button => {
          if (!button) {
            return;
          }
          TOGGLE_AVAILABILITY_CLASS_NAMES.forEach(className => {
            button.classList.remove(className);
          });
          TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES.forEach(className => {
            button.classList.remove(className);
          });
        };
        const applyToggleAvailabilityClass = (button, state) => {
          clearToggleAvailabilityClasses(button);
          if (!button || !state) {
            return;
          }
          if (state === "viable") {
            button.classList.add("object-toggle-button--viable");
            return;
          }
          if (state === "masked") {
            button.classList.add("object-toggle-button--masked");
            return;
          }
          if (state === "impossible") {
            button.classList.add("object-toggle-button--impossible");
          }
        };
        const applySelectedAvailabilityClass = (button, state, isSelected) => {
          if (!button || !isSelected) {
            return;
          }
          if (state === "viable") {
            button.classList.add("object-toggle-button--selected-viable");
            return;
          }
          if (state === "masked") {
            button.classList.add("object-toggle-button--selected-masked");
            return;
          }
          if (state === "impossible") {
            button.classList.add("object-toggle-button--selected-impossible");
          }
        };
        const buildLocativoObjectSlotModelsForState = ({
          slotOverrides = {},
          includeObjectSlot = !isNonactive
        } = {}) => mutableSlotStates.filter(slotState => includeObjectSlot || slotState.id !== "object").map(slotState => {
          const hasOverride = Object.prototype.hasOwnProperty.call(slotOverrides, slotState.id);
          const overrideId = hasOverride ? slotOverrides[slotState.id] : slotState.activeId;
          const values = overrideId === targetObject.OBJECT_TOGGLE_ALL ? slotState.toggleValues : [overrideId];
          return {
            id: slotState.id,
            values: values.length ? values : [""]
          };
        });
        const getActivePossessorSelections = (possessorId = activePossessor) => {
          if (possessorId === targetObject.OBJECT_TOGGLE_ALL) {
            return possessorToggleValues.length ? possessorToggleValues : [defaultPossessor];
          }
          if (possessorToggleValues.includes(possessorId)) {
            return [possessorId];
          }
          return [defaultPossessor];
        };
        const getNonactivePrimarySelectionIds = (selectionId = activeNonactivePrimary) => {
          const allPrimarySelectionIds = nonactivePrimaryOptions.filter(option => option.id !== targetObject.OBJECT_TOGGLE_ALL).map(option => option.id);
          if (selectionId === targetObject.OBJECT_TOGGLE_ALL) {
            return allPrimarySelectionIds;
          }
          if (nonactivePrimaryOptionMap.has(selectionId)) {
            return [selectionId];
          }
          return allPrimarySelectionIds.length ? [allPrimarySelectionIds[0]] : [];
        };
        const locativoCombinationEvaluationCache = new Map();
        let locativoAvailabilityMemo = new Map();
        const evaluateLocativoCombinationState = ({
          objectPrefix = "",
          indirectObjectMarker = "",
          thirdObjectMarker = "",
          possessorPrefix = ""
        }) => {
          const cacheKey = [objectPrefix || "", indirectObjectMarker || "", thirdObjectMarker || "", possessorPrefix || ""].join("|");
          const cached = locativoCombinationEvaluationCache.get(cacheKey);
          if (cached) {
            return cached;
          }
          const result = targetObject.getLocativoTemporalResult({
            rawVerb: verb,
            verbMeta,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            possessivePrefix: possessorPrefix,
            combinedMode: mode
          }) || {};
          const maskState = targetObject.getLocativoTemporalMaskState({
            result,
            objectPrefix
          });
          const evaluation = targetObject.buildConjugationEvaluationRecord({
            result,
            maskState
          });
          locativoCombinationEvaluationCache.set(cacheKey, evaluation);
          return evaluation;
        };
        const resolveActiveToggleAvailabilityState = ({
          possessorSelections,
          objectSlotModels
        }) => {
          const memoKey = ["active", possessorSelections.join(","), objectSlotModels.map(slotModel => `${slotModel.id}:${(slotModel.values || []).join(",")}`).join(";")].join("|");
          if (locativoAvailabilityMemo.has(memoKey)) {
            return locativoAvailabilityMemo.get(memoKey);
          }
          const summary = targetObject.createToggleAvailabilityRealizationSummary();
          targetObject.iterateNounObjectSlotSelections(objectSlotModels, selectedBySlot => {
            const objectPrefix = selectedBySlot.object || "";
            const indirectObjectMarker = selectedBySlot.object2 || "";
            const thirdObjectMarker = selectedBySlot.object3 || "";
            possessorSelections.forEach(possessorPrefix => {
              const evaluation = evaluateLocativoCombinationState({
                objectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                possessorPrefix
              });
              targetObject.recordToggleAvailabilityRealization(summary, evaluation);
            });
          });
          const resolvedRecord = targetObject.realizeToggleAvailabilitySummary(summary);
          locativoAvailabilityMemo.set(memoKey, resolvedRecord);
          return resolvedRecord;
        };
        const resolveNonactiveToggleAvailabilityState = ({
          primarySelectionIds,
          objectSlotModels
        }) => {
          const memoKey = ["nonactive", primarySelectionIds.join(","), objectSlotModels.map(slotModel => `${slotModel.id}:${(slotModel.values || []).join(",")}`).join(";")].join("|");
          if (locativoAvailabilityMemo.has(memoKey)) {
            return locativoAvailabilityMemo.get(memoKey);
          }
          const summary = targetObject.createToggleAvailabilityRealizationSummary();
          primarySelectionIds.forEach(selectionId => {
            const selection = resolveNonactivePrimarySelection(selectionId);
            targetObject.iterateNounObjectSlotSelections(objectSlotModels, selectedBySlot => {
              const indirectObjectMarker = selectedBySlot.object2 || "";
              const thirdObjectMarker = selectedBySlot.object3 || "";
              const evaluation = evaluateLocativoCombinationState({
                objectPrefix: selection.objectPrefix || "",
                indirectObjectMarker,
                thirdObjectMarker,
                possessorPrefix: selection.possessorPrefix || ""
              });
              targetObject.recordToggleAvailabilityRealization(summary, evaluation);
            });
          });
          const resolvedRecord = targetObject.realizeToggleAvailabilitySummary(summary);
          locativoAvailabilityMemo.set(memoKey, resolvedRecord);
          return resolvedRecord;
        };
        let primaryButtons = new Map();
        let possessorButtons = new Map();
        const clearLocativoToggleAvailabilityStyling = () => {
          possessorButtons.forEach(button => clearToggleAvailabilityClasses(button));
          primaryButtons.forEach(button => clearToggleAvailabilityClasses(button));
          slotButtonsById.forEach(slotButtons => {
            slotButtons.forEach(button => clearToggleAvailabilityClasses(button));
          });
        };
        const updateLocativoToggleOptionAvailabilityStyling = () => {
          clearLocativoToggleAvailabilityStyling();
          if (!verb) {
            return;
          }
          if (isNonactive) {
            const activePrimarySelections = getNonactivePrimarySelectionIds(activeNonactivePrimary);
            const activeObjectSlotModels = buildLocativoObjectSlotModelsForState({
              includeObjectSlot: false
            });
            if (primaryButtons.size) {
              primaryButtons.forEach((button, selectionId) => {
                const primarySelectionIds = getNonactivePrimarySelectionIds(selectionId);
                const availabilityRecord = resolveNonactiveToggleAvailabilityState({
                  primarySelectionIds,
                  objectSlotModels: activeObjectSlotModels
                });
                const availabilityState = availabilityRecord.availabilityState;
                applyToggleAvailabilityClass(button, availabilityState);
                applySelectedAvailabilityClass(button, availabilityState, selectionId === activeNonactivePrimary);
              });
            }
            mutableSlotStates.filter(slotState => slotState.id !== "object").forEach(slotState => {
              const slotButtons = slotButtonsById.get(slotState.id);
              if (!slotButtons || !slotButtons.size) {
                return;
              }
              slotButtons.forEach((button, optionId) => {
                const objectSlotModels = buildLocativoObjectSlotModelsForState({
                  slotOverrides: {
                    [slotState.id]: optionId
                  },
                  includeObjectSlot: false
                });
                const availabilityRecord = resolveNonactiveToggleAvailabilityState({
                  primarySelectionIds: activePrimarySelections,
                  objectSlotModels
                });
                const availabilityState = availabilityRecord.availabilityState;
                applyToggleAvailabilityClass(button, availabilityState);
                applySelectedAvailabilityClass(button, availabilityState, optionId === slotState.activeId);
              });
            });
            return;
          }
          const activePossessorSelections = getActivePossessorSelections(activePossessor);
          const activeObjectSlotModels = buildLocativoObjectSlotModelsForState({
            includeObjectSlot: true
          });
          if (possessorButtons.size) {
            possessorButtons.forEach((button, possessorId) => {
              const possessorSelections = getActivePossessorSelections(possessorId);
              const availabilityRecord = resolveActiveToggleAvailabilityState({
                possessorSelections,
                objectSlotModels: activeObjectSlotModels
              });
              const availabilityState = availabilityRecord.availabilityState;
              applyToggleAvailabilityClass(button, availabilityState);
              applySelectedAvailabilityClass(button, availabilityState, possessorId === activePossessor);
            });
          }
          mutableSlotStates.forEach(slotState => {
            const slotButtons = slotButtonsById.get(slotState.id);
            if (!slotButtons || !slotButtons.size) {
              return;
            }
            slotButtons.forEach((button, optionId) => {
              const objectSlotModels = buildLocativoObjectSlotModelsForState({
                slotOverrides: {
                  [slotState.id]: optionId
                },
                includeObjectSlot: true
              });
              const availabilityRecord = resolveActiveToggleAvailabilityState({
                possessorSelections: activePossessorSelections,
                objectSlotModels
              });
              const availabilityState = availabilityRecord.availabilityState;
              applyToggleAvailabilityClass(button, availabilityState);
              applySelectedAvailabilityClass(button, availabilityState, optionId === slotState.activeId);
            });
          });
        };
        const renderRows = () => {
          locativoCombinationEvaluationCache.clear();
          locativoAvailabilityMemo = new Map();
          list.innerHTML = "";
          if (!verb) {
            const placeholder = targetObject.document.createElement("div");
            placeholder.className = "tense-placeholder";
            placeholder.textContent = placeholderText;
            list.appendChild(placeholder);
            updateLocativoBlockPalette();
            updateLocativoToggleOptionAvailabilityStyling();
            return;
          }
          const objectSlotSelectionModels = targetObject.buildNounObjectSlotSelectionModels(mutableSlotStates, {
            includeSlot: slotState => !isNonactive || slotState.id !== "object"
          });
          targetObject.iterateNounObjectSlotSelections(objectSlotSelectionModels, selectedBySlot => {
            const indirectObjectMarker = selectedBySlot.object2 || "";
            const thirdObjectMarker = selectedBySlot.object3 || "";
            const rowSelections = isNonactive ? (activeNonactivePrimary === targetObject.OBJECT_TOGGLE_ALL ? nonactivePrimaryOptions.filter(option => option.id !== targetObject.OBJECT_TOGGLE_ALL).map(option => option.id) : [activeNonactivePrimary]).map(selectionId => resolveNonactivePrimarySelection(selectionId)) : (activePossessor === targetObject.OBJECT_TOGGLE_ALL ? possessorToggleValues : [activePossessor]).map(possessorPrefix => ({
              objectPrefix: selectedBySlot.object || "",
              possessorPrefix
            }));
            rowSelections.forEach(({
              objectPrefix = "",
              possessorPrefix = ""
            }) => {
              const row = targetObject.document.createElement("div");
              row.className = "conjugation-row";
              targetObject.applyConjugationRowClasses(row, objectPrefix);
              const label = targetObject.document.createElement("div");
              label.className = "conjugation-label";
              const personLabel = targetObject.document.createElement("div");
              personLabel.className = "person-label";
              personLabel.textContent = isNonactive ? possessorPrefix ? targetObject.getPossessorPersonLabel(possessorPrefix, isNawat) : impersonalLabel : targetObject.getPossessorPersonLabel(possessorPrefix, isNawat);
              const personSub = targetObject.document.createElement("div");
              personSub.className = "person-sub";
              const objectMarkers = [objectPrefix, indirectObjectMarker, thirdObjectMarker].filter(Boolean);
              const isDummyImpersonalRow = isNonactive && !possessorPrefix && objectMarkers.length === 0;
              const objectLabel = objectMarkers.length ? objectMarkers.map(prefix => targetObject.getNounObjectComboLabel(prefix, isNawat)).join(" + ") : targetObject.getNounZeroObjectComboLabel(isNawat, {
                isImpersonalDummy: isDummyImpersonalRow
              });
              label.appendChild(personLabel);
              label.appendChild(personSub);
              const value = targetObject.document.createElement("div");
              value.className = "conjugation-value";
              const evaluation = evaluateLocativoCombinationState({
                objectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                possessorPrefix
              });
              const possessorLabel = evaluation.result.possessorPrefix ? targetObject.getPossessorLabel(evaluation.result.possessorPrefix, isNawat) : "";
              personSub.textContent = appendGrammarFrameSubLabels(appendSentenceLayerSubLabels(appendNuclearClauseShellSubLabels(appendAdverbialAdjunctionBoundaryFrameSubLabels(appendAdverbialNuclearFrameSubLabels(appendRelationalNncBoundaryFrameSubLabels(appendPlaceGentilicNncBoundaryFrameSubLabels(appendDenominalFamilyProfileSubLabels(appendVerbDerivedNominalizationProfileSubLabels(targetObject.buildPersonSub({
                subjectLabel: "",
                possessorLabel,
                objectLabel
              }), evaluation.result?.nominalizationProfile, {
                isNawat
              }), evaluation.result?.denominalFamilyProfile), evaluation.result?.placeGentilicNncBoundaryFrame), evaluation.result?.relationalNncBoundaryFrame), evaluation.result?.adverbialNuclearFrame), evaluation.result?.adverbialAdjunctionBoundaryFrame), evaluation.result?.nuclearClauseShell, evaluation.result), evaluation.result?.sentenceLayer), evaluation.result, {
                maxDiagnostics: 1
              });
              renderGeneratedOutputSlotChips(personSub, evaluation.result);
              targetObject.applyConjugationEvaluationPresentation({
                row,
                value,
                evaluation,
                formattedValue: targetObject.formatConjugationDisplay(getConjugationDisplaySurface(evaluation.result))
              });
              applyGrammarFrameRouteDataset(row, evaluation.result);
              if (typeof targetObject.renderPatientivoPrelocativeContinuation === "function") {
                targetObject.renderPatientivoPrelocativeContinuation({
                  value,
                  evaluation,
                  selection: targetObject.normalizedSelection,
                  number: targetObject.number,
                  possessorPrefix,
                  patientivoSource: targetObject.patientivoSource,
                  sourceTenseValue: targetObject.resolvedPatientivoSourceTenseValue,
                  sourceCombinedMode: targetObject.resolvedPatientivoSourceCombinedMode
                });
              }
              if (typeof targetObject.renderPatientivoCompoundEmbedContinuation === "function") {
                targetObject.renderPatientivoCompoundEmbedContinuation({
                  value,
                  evaluation,
                  patientivoSource: targetObject.patientivoSource
                });
              }
              if (typeof targetObject.renderPatientivoNominalCompoundContinuation === "function") {
                targetObject.renderPatientivoNominalCompoundContinuation({
                  value,
                  evaluation,
                  patientivoSource: targetObject.patientivoSource
                });
              }
              row.appendChild(label);
              row.appendChild(value);
              list.appendChild(row);
            });
          });
          updateLocativoBlockPalette();
          updateLocativoToggleOptionAvailabilityStyling();
        };
        if (isNonactive) {
          const showPrimaryToggle = nonactivePrimaryOptions.length > 1;
          if (showPrimaryToggle) {
            const {
              toggle: primaryToggle,
              buttons
            } = buildToggleControl({
              options: nonactivePrimaryOptions.map(option => ({
                id: option.id,
                label: option.label
              })),
              activeId: activeNonactivePrimary,
              ariaLabel: possessorToggleLabel,
              onSelect: id => {
                activeNonactivePrimary = id;
                targetObject.setToggleStateValue(targetObject.ObjectToggleState, nonactivePrimaryKey, id, {
                  syncLock: true
                });
                setToggleActiveState(primaryButtons, id);
                renderRows();
              },
              getActiveId: () => activeNonactivePrimary
            });
            primaryToggle.dataset.toggleType = "meta";
            primaryToggle.dataset.toggleSlot = "nonactive-primary";
            primaryButtons = buttons;
            titleControls.appendChild(primaryToggle);
          }
        } else {
          const showPossessorToggle = possessorToggleValues.length > 1;
          if (showPossessorToggle) {
            const possessorOptions = buildPossessorOptions(possessorToggleValues);
            const {
              toggle: possessorToggle,
              buttons
            } = buildToggleControl({
              options: possessorOptions,
              activeId: activePossessor,
              ariaLabel: possessorToggleLabel,
              onSelect: id => {
                activePossessor = id;
                targetObject.setToggleStateValue(targetObject.PossessorToggleState, possessorStateKey, id, {
                  syncLock: true
                });
                setToggleActiveState(possessorButtons, id);
                renderRows();
              },
              getActiveId: () => activePossessor
            });
            possessorToggle.dataset.toggleType = "meta";
            possessorToggle.dataset.toggleSlot = "possessor";
            possessorButtons = buttons;
            titleControls.appendChild(possessorToggle);
          }
        }
        const objectSlotsForToggle = isNonactive ? mutableSlotStates.filter(slotState => slotState.id !== "object") : mutableSlotStates;
        const showObjectToggle = objectSlotsForToggle.some(slotState => slotState.showToggle);
        if (showObjectToggle) {
          objectSlotsForToggle.forEach((slotState, index) => {
            if (!slotState.showToggle) {
              return;
            }
            const slotAriaLabel = slotState.id === "object" ? objectToggleLabel : `${targetObject.getValence3PlusSlotRoleLabel(slotState.id, isNawat) || objectToggleLabel} (${index + 1})`;
            const {
              toggle: objectToggle,
              buttons
            } = buildToggleControl({
              options: slotState.options,
              activeId: slotState.activeId,
              ariaLabel: slotAriaLabel,
              onSelect: id => {
                slotState.activeId = id;
                targetObject.setToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey, id, {
                  syncLock: true
                });
                const slotButtons = slotButtonsById.get(slotState.id);
                if (slotButtons) {
                  setToggleActiveState(slotButtons, id);
                }
                renderRows();
              },
              getActiveId: () => slotState.activeId
            });
            objectToggle.dataset.toggleType = "object";
            objectToggle.dataset.toggleSlot = slotState.id;
            slotButtonsById.set(slotState.id, buttons);
            titleControls.appendChild(objectToggle);
          });
        }
        renderRows();
        tenseTitle.appendChild(titleControls);
        tenseBlock.appendChild(tenseTitle);
        tenseBlock.appendChild(list);
        return tenseBlock;
      };
      const modesToRender = modeFilter === targetObject.COMBINED_MODE.active ? [targetObject.COMBINED_MODE.active] : modeFilter === targetObject.COMBINED_MODE.nonactive ? [targetObject.COMBINED_MODE.nonactive] : [targetObject.COMBINED_MODE.active, targetObject.COMBINED_MODE.nonactive];
      modesToRender.forEach(mode => {
        const block = buildBlock({
          mode
        });
        if (sourceColumns) {
          sourceColumns.appendBlock(block, mode);
          return;
        }
        grid.appendChild(block);
      });
      if (sourceColumns) {
        sourceColumns.finalize();
      }
    }
    function buildNounTabRenderContext({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = "",
      predicateNominalSourceTense = "",
      modeKey = "noun"
    }) {
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return null;
      }
      const languageSwitch = targetObject.document.getElementById("language");
      const isNawat = languageSwitch && languageSwitch.checked;
      const tenseMode = targetObject.getActiveTenseMode();
      const combinedMode = targetObject.getCombinedMode();
      const sourceScope = targetObject.getVerbSourceScope();
      const nominalSourceModeFilter = sourceScope === targetObject.VERB_SOURCE_SCOPE.active ? targetObject.COMBINED_MODE.active : sourceScope === targetObject.VERB_SOURCE_SCOPE.nonactive ? targetObject.COMBINED_MODE.nonactive : null;
      const isNominalMode = targetObject.isNominalTenseMode(tenseMode);
      const showDualVoiceColumns = isNominalMode && nominalSourceModeFilter === null;
      const modeFilter = isNominalMode ? nominalSourceModeFilter : combinedMode;
      const nominalControlCombinedMode = modeFilter || combinedMode;
      const allowedNounTenses = isNominalMode ? modeFilter ? targetObject.getNounTenseOrderForCombinedMode(modeFilter, tenseMode) : targetObject.getTenseOrderForMode(tenseMode) : targetObject.getNounTenseOrderForCombinedMode(combinedMode, tenseMode);
      const selectionState = targetObject.getCurrentResolvedConjugationSelectionState({
        tenseMode
      });
      const selectedTense = tenseValue || selectionState.tenseValue;
      const fallbackTense = allowedNounTenses[0] || "sustantivo-verbal";
      const resolvedTense = allowedNounTenses.includes(selectedTense) ? selectedTense : fallbackTense;
      const isPreteritAgentiveLocativeNnc = resolvedTense === "locativo-agentivo-preterito";
      if (resolvedTense === "locativo-temporal") {
        return {
          container,
          isNawat,
          resolvedTense,
          isLocativoTemporal: true,
          combinedMode,
          modeFilter
        };
      }
      const isInstrumentivo = resolvedTense === "instrumentivo";
      const isCalificativoInstrumentivo = resolvedTense === "calificativo-instrumentivo";
      const isPotencial = targetObject.isPotencialProfileTense(resolvedTense);
      const isPatientivoAdjective = targetObject.isPatientivoAdjectiveTense(resolvedTense);
      const isSubjectlessTense = targetObject.isSubjectlessNominalTense(resolvedTense);
      const isPossessionSplit = targetObject.isNounPossessionSplitTense(resolvedTense);
      const isPotencialHabitual = targetObject.isPotencialHabitualTense(resolvedTense);
      const resolvedNominalControlCombinedMode = targetObject.getResolvedNominalCombinedModeForTense(resolvedTense, nominalControlCombinedMode);
      const prefixes = Array.from(targetObject.SUSTANTIVO_VERBAL_PREFIXES);
      const groupKey = prefixes.join("|");
      const possessorKey = `${modeKey}|${resolvedTense}|${groupKey}|possessor`;
      const ownershipKey = targetObject.getPatientivoOwnershipKey(groupKey);
      const patientivoNominalSuffixKey = targetObject.getPatientivoNominalSuffixKey(groupKey);
      const objectStateKey = targetObject.getObjectStateKey({
        groupKey,
        tenseValue: resolvedTense,
        mode: modeKey
      });
      const subjectKey = `${modeKey}|${resolvedTense}|${groupKey}`;
      const verbMeta = targetObject.getParsedVerbForTab(modeKey, verb);
      const isPotencialHabitualIntransitive = isPotencialHabitual && targetObject.getBaseObjectSlots(verbMeta) <= 0;
      const usePotencialHabitualNonactiveSubjects = isPotencialHabitual && !isPotencialHabitualIntransitive;
      const subjectOptions = usePotencialHabitualNonactiveSubjects ? targetObject.getPotencialHabitualNonactiveSubjectToggleOptions() : targetObject.getSubjectToggleOptions();
      const subjectOptionMap = new Map(subjectOptions.map(entry => [entry.id, entry]));
      const showNonanimateOnly = targetObject.isNonanimateNounTense(resolvedTense) || isPotencialHabitualIntransitive;
      const nounObjectSlotBundle = targetObject.buildNounObjectSlotToggleStates({
        verbMeta,
        tenseValue: resolvedTense,
        baseObjectStateKey: objectStateKey,
        isNawat,
        combinedMode: resolvedNominalControlCombinedMode
      });
      const nounObjectSlotStates = nounObjectSlotBundle.slotStates;
      const primaryObjectSlot = nounObjectSlotStates.find(slot => slot.id === "object") || null;
      const allowedPrefixes = primaryObjectSlot ? primaryObjectSlot.toggleValues : [""];
      let activeObjectPrefix = primaryObjectSlot ? primaryObjectSlot.activeId : "";
      const objectOptions = primaryObjectSlot ? primaryObjectSlot.options : targetObject.getObjectToggleOptions(allowedPrefixes, {
        labelForPrefix: targetObject.getNonspecificToggleLabel
      });
      const objectOptionMap = primaryObjectSlot ? primaryObjectSlot.optionMap : new Map(objectOptions.map(entry => [entry.id, entry]));
      const possessorValues = targetObject.POSSESSIVE_PREFIXES.map(entry => entry.value);
      const possessedInstrumentivoValues = possessorValues.filter(value => value);
      const visiblePossessorValues = isPotencial || isPatientivoAdjective || isPreteritAgentiveLocativeNnc ? [""] : isPossessionSplit ? showDualVoiceColumns ? possessorValues : nominalControlCombinedMode === targetObject.COMBINED_MODE.nonactive ? [""] : possessedInstrumentivoValues : possessorValues;
      let activePossessor = targetObject.getToggleStateValue(targetObject.PossessorToggleState, possessorKey);
      const canSelectAllPossessors = visiblePossessorValues.length > 1;
      if (activePossessor === undefined || activePossessor !== targetObject.OBJECT_TOGGLE_ALL && !visiblePossessorValues.includes(activePossessor) || activePossessor === targetObject.OBJECT_TOGGLE_ALL && !canSelectAllPossessors) {
        if (visiblePossessorValues.includes("")) {
          activePossessor = "";
        } else if (visiblePossessorValues.includes("i")) {
          activePossessor = "i";
        } else {
          activePossessor = visiblePossessorValues[0] ?? "";
        }
      }
      const ownershipOptions = targetObject.PATIENTIVO_OWNERSHIP_OPTIONS.map(entry => entry.id);
      let activeOwnership = targetObject.getToggleStateValue(targetObject.PatientivoOwnershipState, ownershipKey);
      if (activeOwnership !== null && !ownershipOptions.includes(activeOwnership)) {
        activeOwnership = null;
      }
      const patientivoNominalSuffixOptions = targetObject.PATIENTIVO_NOMINAL_SUFFIX_OPTIONS.map(entry => entry.id);
      let activePatientivoNominalSuffix = targetObject.getPatientivoNominalSuffixToggleValue(targetObject.getToggleStateValue(targetObject.PatientivoNominalSuffixState, patientivoNominalSuffixKey, null));
      if (!patientivoNominalSuffixOptions.includes(activePatientivoNominalSuffix)) {
        activePatientivoNominalSuffix = null;
      }
      if (resolvedTense !== "patientivo") {
        activeOwnership = null;
        activePatientivoNominalSuffix = null;
      }
      const isSubjectOptionAllowed = entry => !showNonanimateOnly || entry.id === targetObject.SUBJECT_TOGGLE_ALL || targetObject.isNonanimatePers1Pers2(entry.subjectPrefix, entry.subjectSuffix);
      const showSubjectToggle = !showNonanimateOnly && !isSubjectlessTense;
      const showObjectToggle = !isPreteritAgentiveLocativeNnc && nounObjectSlotStates.some(slot => slot.showToggle);
      const hasImplicitAbsolutePossessor = visiblePossessorValues.includes("");
      const explicitPossessorToggleValues = hasImplicitAbsolutePossessor ? visiblePossessorValues.filter(value => value) : visiblePossessorValues;
      const showPossessorToggle = hasImplicitAbsolutePossessor ? explicitPossessorToggleValues.length > 0 : explicitPossessorToggleValues.length > 1;
      const showPatientivoPossessionControls = resolvedTense === "patientivo" && Boolean(activePossessor);
      const defaultSubjectId = targetObject.getDefaultNounSubjectId(subjectOptions);
      let activeSubject = targetObject.getToggleStateValue(targetObject.SubjectToggleState, subjectKey, defaultSubjectId) ?? defaultSubjectId;
      if (!subjectOptionMap.has(activeSubject) || !isSubjectOptionAllowed(subjectOptionMap.get(activeSubject))) {
        activeSubject = defaultSubjectId;
        targetObject.setToggleStateValue(targetObject.SubjectToggleState, subjectKey, activeSubject, {
          syncLock: false
        });
      }
      return {
        container,
        isNawat,
        combinedMode,
        modeFilter,
        resolvedTense,
        predicateNominalSourceTense,
        isPossessionSplit,
        isInstrumentivo,
        isCalificativoInstrumentivo,
        isPreteritAgentiveLocativeNnc,
        isLocativoTemporal: false,
        isSubjectlessTense,
        showNonanimateOnly,
        possessorKey,
        ownershipKey,
        patientivoNominalSuffixKey,
        objectStateKey,
        subjectKey,
        subjectOptions,
        subjectOptionMap,
        verbMeta,
        allowedPrefixes,
        objectOptions,
        objectOptionMap,
        nounObjectSlotStates,
        nounObjectSlotSummary: nounObjectSlotBundle,
        visiblePossessorValues,
        explicitPossessorToggleValues,
        hasImplicitAbsolutePossessor,
        activeOwnership,
        activePatientivoNominalSuffix,
        activeObjectPrefix,
        activePossessor,
        activeSubject,
        isSubjectOptionAllowed,
        showSubjectToggle,
        showObjectToggle,
        showPossessorToggle,
        showOwnershipToggle: showPatientivoPossessionControls,
        showPatientivoNominalSuffixToggle: resolvedTense === "patientivo"
      };
    }
    function renderNounConjugations({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = "",
      predicateNominalSourceTense = "",
      modeKey = "noun"
    }) {
      const context = buildNounTabRenderContext({
        verb,
        containerId,
        tenseValue,
        predicateNominalSourceTense,
        modeKey
      });
      if (!context) {
        return;
      }
      if (context.isLocativoTemporal) {
        renderLocativoTemporalConjugations({
          verb,
          containerId,
          modeFilter: context.modeFilter
        });
        return;
      }
      const {
        container,
        isNawat,
        combinedMode,
        modeFilter,
        resolvedTense,
        predicateNominalSourceTense: contextPredicateNominalSourceTense,
        isPossessionSplit,
        isInstrumentivo,
        isCalificativoInstrumentivo,
        isPreteritAgentiveLocativeNnc,
        isLocativoTemporal,
        isSubjectlessTense,
        showNonanimateOnly,
        possessorKey,
        ownershipKey,
        patientivoNominalSuffixKey,
        objectStateKey,
        subjectKey,
        subjectOptions,
        subjectOptionMap,
        verbMeta,
        allowedPrefixes,
        objectOptions,
        nounObjectSlotStates,
        nounObjectSlotSummary,
        visiblePossessorValues,
        explicitPossessorToggleValues,
        hasImplicitAbsolutePossessor,
        activeOwnership,
        activePatientivoNominalSuffix: initialPatientivoNominalSuffix,
        isSubjectOptionAllowed,
        showSubjectToggle,
        showObjectToggle,
        showPossessorToggle,
        showOwnershipToggle,
        showPatientivoNominalSuffixToggle
      } = context;
      let {
        activeObjectPrefix,
        activePossessor,
        activeSubject
      } = context;
      let activePatientivoOwnership = activeOwnership;
      let activePatientivoNominalSuffix = initialPatientivoNominalSuffix;
      const mutableNounObjectSlots = nounObjectSlotStates.map(slot => ({
        ...slot
      }));
      const nounObjectSlotStateById = new Map(mutableNounObjectSlots.map(slot => [slot.id, slot]));
      const nounObjectToggleButtonsById = new Map();
      const getActiveNounSlotValue = slotId => nounObjectSlotStateById.get(slotId)?.activeId || "";
      activeObjectPrefix = getActiveNounSlotValue("object");
      const resolvedNominalControlCombinedMode = targetObject.getResolvedNominalCombinedModeForTense(resolvedTense, modeFilter || combinedMode);
      const isPredicateNominalTenseSelected = targetObject.isPredicateNominalTense(resolvedTense);
      const predicateNominalSourceTenseKey = `${modeKey}|${resolvedTense}|predicate-source-tense`;
      const storedPredicateNominalSourceTense = isPredicateNominalTenseSelected ? targetObject.getToggleStateValue(targetObject.ObjectToggleState, predicateNominalSourceTenseKey) : "";
      let activePredicateNominalSourceTense = isPredicateNominalTenseSelected ? targetObject.normalizePredicateNominalSourceTense(contextPredicateNominalSourceTense || storedPredicateNominalSourceTense || targetObject.getPredicateNominalSourceTenseForTarget(resolvedTense)) : "";
      if (isPredicateNominalTenseSelected) {
        targetObject.setToggleStateValue(targetObject.ObjectToggleState, predicateNominalSourceTenseKey, activePredicateNominalSourceTense, {
          syncLock: false
        });
      }
      const getPredicateNominalSourceTenseLabel = (sourceTense = activePredicateNominalSourceTense) => {
        const normalizedSourceTense = targetObject.normalizePredicateNominalSourceTense(sourceTense);
        return targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[normalizedSourceTense], isNawat, normalizedSourceTense);
      };
      const resolvedPredicateNominalSourceTense = String(activePredicateNominalSourceTense || "").trim();
      const {
        objSection,
        grid
      } = createObjectSectionGrid(container);
      const sourceColumns = modeFilter == null ? createSourceModeColumns(grid, isNawat) : null;
      const placeholderText = targetObject.getPlaceholderLabel("conjugations", isNawat, "Ingresa un verbo para ver las conjugaciones.");
      const allToggleLabel = targetObject.getToggleLabel("all", isNawat, "todos");
      const subjectToggleLabel = targetObject.getToggleLabel("subject", isNawat, "sujeto");
      const possessorToggleLabel = targetObject.getToggleLabel("possessor", isNawat, "poseedor");
      const ownershipToggleLabel = targetObject.getToggleLabel("ownership", isNawat, "posesion");
      const objectToggleLabel = targetObject.getToggleLabel("object", isNawat, "objeto");
      const suffixToggleLabel = targetObject.getToggleLabel("suffix", isNawat, "Sufijo");
      const sourceTenseToggleLabel = targetObject.getToggleLabel("source-tense", isNawat, "tiempo fuente");
      const buildNominalNum1Num2SubLabel = ({
        evaluation = null,
        selection = null,
        displaySelection = null
      } = {}) => {
        const connector = evaluation?.result?.num1Num2 || evaluation?.result?.nominalClauseFrame?.subject?.numberConnector || null;
        const connectorSurface = resolveNominalNum1Num2Surface(connector, (displaySelection || selection || {}).subjectSuffix || "");
        return `conector ${connectorSurface || "Ø"}`;
      };
      const appendNominalNum1Num2SubLabel = (baseLabel = "", connectorLabel = "") => [baseLabel, connectorLabel].filter(Boolean).join(" · ");
      const tenseLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[resolvedTense], isNawat, resolvedTense);
      const resolvedNounBlockMode = (() => {
        if (isPossessionSplit) {
          return null;
        }
        return targetObject.getResolvedNominalCombinedModeForTense(resolvedTense, targetObject.COMBINED_MODE.active);
      })();
      const isPatientivoTense = resolvedTense === "patientivo";
      const hasNounControls = showSubjectToggle || showPossessorToggle || showOwnershipToggle || showPatientivoNominalSuffixToggle || showObjectToggle || isPredicateNominalTenseSelected;
      const useSharedPatientivoControls = isPatientivoTense && hasNounControls;
      const defaultNominalSourceMode = targetObject.getNominalSourceModeForTense(resolvedTense);
      const getPossessorSelectionsForId = (possessorId = activePossessor) => {
        const fallback = visiblePossessorValues[0] ?? "";
        if (possessorId === targetObject.OBJECT_TOGGLE_ALL) {
          return visiblePossessorValues.length ? visiblePossessorValues : [fallback];
        }
        if (visiblePossessorValues.includes(possessorId)) {
          return [possessorId];
        }
        return [fallback];
      };
      const resolveInstrumentivoSourcePlacement = (possessorId = activePossessor) => {
        if (resolvedTense !== "instrumentivo") {
          return defaultNominalSourceMode;
        }
        const possessorSelections = getPossessorSelectionsForId(possessorId);
        const hasPossessed = possessorSelections.some(value => Boolean(value));
        const hasUnpossessed = possessorSelections.some(value => !value);
        if (hasPossessed && hasUnpossessed) {
          return "mixed";
        }
        return hasPossessed ? targetObject.COMBINED_MODE.active : targetObject.COMBINED_MODE.nonactive;
      };
      const patientivoDefaultSourceTenseLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS.presente, isNawat, "presente");
      const patientivoPerfectiveSourceTenseLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS.preterito, isNawat, "pretérito perfecto simple");
      const predicateNominalBlockConfigs = isPredicateNominalTenseSelected ? [{
        id: `${resolvedTense}-active-source`,
        label: targetObject.getVerbBlockLabel("predicado-nominal-activo", isNawat, "predicado nominal · activo"),
        sourceMode: targetObject.COMBINED_MODE.active,
        sourceTenseLabel: getPredicateNominalSourceTenseLabel(),
        mode: targetObject.COMBINED_MODE.active,
        predicateNominalSourceMode: targetObject.COMBINED_MODE.active,
        showControls: true
      }, {
        id: `${resolvedTense}-passive-source`,
        label: targetObject.getVerbBlockLabel("predicado-nominal-pasivo", isNawat, "predicado nominal · pasivo"),
        sourceMode: targetObject.COMBINED_MODE.nonactive,
        sourceTenseLabel: getPredicateNominalSourceTenseLabel(),
        mode: targetObject.COMBINED_MODE.nonactive,
        predicateNominalSourceMode: targetObject.COMBINED_MODE.nonactive,
        showControls: true
      }] : null;
      const blockConfigs = isPatientivoTense ? [{
        id: "patientivo-pasivo",
        label: targetObject.getVerbBlockLabel("patientivo-pasivo", isNawat, "patientivo · pasivo"),
        patientivoSource: "passive",
        sourceMode: targetObject.COMBINED_MODE.nonactive,
        sourceTenseLabel: patientivoPerfectiveSourceTenseLabel,
        mode: targetObject.COMBINED_MODE.nonactive,
        showControls: false
      }, {
        id: "patientivo-impersonal",
        label: targetObject.getVerbBlockLabel("patientivo-impersonal", isNawat, "patientivo · impersonal"),
        patientivoSource: "impersonal",
        sourceMode: targetObject.COMBINED_MODE.nonactive,
        sourceTenseLabel: patientivoPerfectiveSourceTenseLabel,
        mode: targetObject.COMBINED_MODE.nonactive,
        showControls: false
      }, {
        id: "patientivo-perfectivo",
        label: targetObject.getVerbBlockLabel("patientivo-perfectivo", isNawat, "patientivo · perfectivo"),
        patientivoSource: "perfectivo",
        sourceMode: targetObject.COMBINED_MODE.active,
        sourceTenseLabel: patientivoPerfectiveSourceTenseLabel,
        mode: targetObject.COMBINED_MODE.active,
        showControls: false
      }, {
        id: "patientivo-imperfectivo",
        label: targetObject.getVerbBlockLabel("patientivo-imperfectivo", isNawat, "patientivo · imperfectivo"),
        patientivoSource: "imperfectivo",
        sourceMode: targetObject.COMBINED_MODE.active,
        sourceTenseLabel: patientivoDefaultSourceTenseLabel,
        mode: targetObject.COMBINED_MODE.active,
        showControls: false
      }, {
        id: "patientivo-tronco",
        label: targetObject.getVerbBlockLabel("patientivo-tronco", isNawat, "patientivo · raíz verbal"),
        patientivoSource: "tronco-verbal",
        sourceMode: targetObject.COMBINED_MODE.active,
        sourceTenseLabel: targetObject.getNominalSourceTenseLabel("patientivo", {
          patientivoSource: "tronco-verbal",
          isNawat
        }),
        mode: targetObject.COMBINED_MODE.active,
        showControls: false
      }] : predicateNominalBlockConfigs || [{
        id: resolvedTense,
        label: tenseLabel,
        sourceMode: resolveInstrumentivoSourcePlacement(),
        sourceTenseLabel: isPredicateNominalTenseSelected ? getPredicateNominalSourceTenseLabel() : targetObject.getNominalSourceTenseLabel(resolvedTense, {
          isNawat
        }),
        mode: resolvedNounBlockMode,
        showControls: true
      }];
      const visibleBlockConfigs = blockConfigs.filter(entry => modeFilter == null || !entry.mode || entry.mode === modeFilter);
      let toggleButtons = new Map();
      let possessorButtons = new Map();
      let ownershipButtons = new Map();
      let patientivoNominalSuffixButtons = new Map();
      let predicateNominalSourceTenseButtons = new Map();
      let subjectButtons = new Map();
      const blocks = [];
      const resolveNounBlockPaletteSignature = () => {
        const hasMixedSlotSelection = mutableNounObjectSlots.some(slotState => slotState.activeId === targetObject.OBJECT_TOGGLE_ALL);
        if (hasMixedSlotSelection || activePossessor === targetObject.OBJECT_TOGGLE_ALL) {
          return "mixed";
        }
        const effectiveValency = Math.max(1, mutableNounObjectSlots.length + 1);
        return targetObject.buildBlockComboPaletteSignature({
          mode: "noun",
          valency: effectiveValency,
          objectPrefix: getActiveNounSlotValue("object"),
          indirectObjectMarker: getActiveNounSlotValue("object2"),
          thirdObjectMarker: getActiveNounSlotValue("object3"),
          possessorPrefix: showPossessorToggle ? activePossessor || "" : "",
          ownership: showOwnershipToggle ? activePatientivoOwnership || "" : ""
        });
      };
      const getDefaultPatientivoSourceTenseValue = (patientivoSource = "") => patientivoSource === "perfectivo" ? "preterito" : "presente";
      const getPatientivoSourceCombinedModeForBranch = (patientivoSource = "") => typeof targetObject.isNawatPatientivoNonactiveSource === "function" ? targetObject.isNawatPatientivoNonactiveSource(patientivoSource) ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active : patientivoSource === "nonactive" || patientivoSource === "passive" || patientivoSource === "impersonal" ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
      const getPatientivoBlockActiveRoute = (patientivoSource = "") => {
        const activeRoute = typeof targetObject.getActiveNawatRouteProfile === "function" ? targetObject.getActiveNawatRouteProfile() : null;
        if (!activeRoute || activeRoute.activeRouteTravelSource !== "chip" || !isPatientivoSurfaceRouteProfile(activeRoute) || (activeRoute.patientivoSource || "nonactive") !== (patientivoSource || "nonactive")) {
          return null;
        }
        return activeRoute;
      };
      const getPatientivoBlockSourceCombinedMode = (patientivoSource = "") => getPatientivoBlockActiveRoute(patientivoSource)?.sourceCombinedMode || getPatientivoSourceCombinedModeForBranch(patientivoSource);
      const getPatientivoBlockSourceTenseValue = (patientivoSource = "") => getPatientivoBlockActiveRoute(patientivoSource)?.sourceTenseValue || getDefaultPatientivoSourceTenseValue(patientivoSource);
      const getPatientivoSourceRouteKey = ({
        patientivoSource = "",
        sourceTenseValue = "",
        sourceCombinedMode = ""
      } = {}) => {
        const combinedMode = sourceCombinedMode || getPatientivoSourceCombinedModeForBranch(patientivoSource);
        const tenseValue = sourceTenseValue || getDefaultPatientivoSourceTenseValue(patientivoSource);
        return getNawatPatientivoRouteSpec({
          sourceCombinedMode: combinedMode,
          sourceTenseValue: tenseValue,
          patientivoSource
        }).routeKey;
      };
      const getDirectPatientivoSourceTenseValue = (patientivoSource = "", sourceTenseValue = "") => sourceTenseValue || getDefaultPatientivoSourceTenseValue(patientivoSource);
      const getDirectPatientivoSourceSurface = ({
        patientivoSource = "",
        objectPrefix = "",
        sourceTenseValue = "",
        sourceCombinedMode = ""
      } = {}) => {
        const selectedSourceCombinedMode = sourceCombinedMode || getPatientivoSourceCombinedModeForBranch(patientivoSource);
        const selectedSourceTenseValue = getDirectPatientivoSourceTenseValue(patientivoSource, sourceTenseValue);
        const isNonactiveSource = selectedSourceCombinedMode === targetObject.COMBINED_MODE.nonactive;
        const routeVerb = verbMeta?.parseInputVerb || verbMeta?.regexInputVerb || verb;
        const routeKey = getPatientivoSourceRouteKey({
          patientivoSource,
          sourceTenseValue: selectedSourceTenseValue,
          sourceCombinedMode: selectedSourceCombinedMode
        });
        const routeProfile = typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(routeKey) : null;
        if (routeProfile && routeVerb && typeof targetObject.getNawatRouteSourceSurfaceForm === "function") {
          const routeTarget = {
            ...routeProfile,
            sourceVerb: routeVerb,
            sourceObjectPrefix: objectPrefix,
            sourceTenseValue: selectedSourceTenseValue,
            sourceCombinedMode: selectedSourceCombinedMode
          };
          const routeSurface = targetObject.getNawatRouteSourceSurfaceForm(routeProfile, {
            sourceVerb: routeVerb,
            sourceObjectPrefix: objectPrefix,
            routeTarget
          });
          if (routeSurface) {
            return routeSurface;
          }
        }
        const presentResult = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            derivationMode: isNonactiveSource ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active,
            voiceMode: isNonactiveSource ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active
          },
          posicionesFormula: {
            pers1: "",
            obj1: objectPrefix,
            tronco: verb,
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: selectedSourceTenseValue
          }
        }) || {};
        const sourceSurface = getPrimaryConjugationSurface(presentResult);
        return sourceSurface && sourceSurface !== "—" ? sourceSurface : "";
      };
      const resolvePatientivoOriginSourceObjectPrefix = (patientivoSource = "") => {
        const isActiveSource = typeof targetObject.isNawatPatientivoNonactiveSource === "function" ? !targetObject.isNawatPatientivoNonactiveSource(patientivoSource) : !(patientivoSource === "nonactive" || patientivoSource === "passive" || patientivoSource === "impersonal");
        const isTransitiveSource = Number(targetObject.getBaseObjectSlots(verbMeta)) > 0;
        const selectedObjectPrefix = activeObjectPrefix === targetObject.OBJECT_TOGGLE_ALL ? "" : activeObjectPrefix || "";
        if (isActiveSource && isTransitiveSource) {
          return selectedObjectPrefix || "ki";
        }
        return selectedObjectPrefix;
      };
      const getPatientivoBlockOriginText = (entry = {}) => {
        const patientivoSource = entry.patientivoSource || "";
        if (!isPatientivoTense || !patientivoSource || patientivoSource === "tronco-verbal" || !verb) {
          return "";
        }
        const sourceObjectPrefix = resolvePatientivoOriginSourceObjectPrefix(patientivoSource);
        const sourceTenseValue = getPatientivoBlockSourceTenseValue(patientivoSource);
        const sourceCombinedMode = getPatientivoBlockSourceCombinedMode(patientivoSource);
        const sourceSurface = getDirectPatientivoSourceSurface({
          patientivoSource,
          objectPrefix: sourceObjectPrefix,
          sourceTenseValue,
          sourceCombinedMode
        });
        if (!sourceSurface) {
          return "";
        }
        const sourceClassLabel = getNawatPatientivoBranchClassLabel(patientivoSource);
        const sourceLabel = ["V", sourceClassLabel, getNominalizationSourceUnitLabel(NOMINALIZATION_SOURCE_UNITS.vncCoreStem)].filter(Boolean).join(" · ");
        return `origen: ${sourceLabel}: ${sourceSurface}`;
      };
      const getPatientivoBlockSourceTenseOptions = (patientivoSource = "") => {
        if (!patientivoSource || patientivoSource === "tronco-verbal") {
          return [];
        }
        return NAWAT_PATIENTIVO_SOURCE_TENSE_OPTIONS.filter(option => {
          if (!option || option.sourceCombinedMode !== getPatientivoSourceCombinedModeForBranch(patientivoSource)) {
            return false;
          }
          const routeSpec = getNawatPatientivoRouteSpec({
            sourceTenseValue: option.tenseValue,
            sourceCombinedMode: option.sourceCombinedMode
          });
          if (routeSpec.patientivoSource !== patientivoSource) {
            return false;
          }
          const profile = typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(routeSpec.routeKey) : null;
          return profile && isPatientivoSurfaceRouteProfile(profile);
        });
      };
      const activatePatientivoOriginInNoun = ({
        routeKey = "",
        patientivoSource = "",
        sourceVerb = "",
        sourceObjectPrefix = "",
        sourceTenseValue = "",
        sourceCombinedMode = "",
        anchorElement = null
      } = {}) => {
        if (!routeKey || !patientivoSource || !sourceVerb || typeof targetObject.getNawatRouteProfile !== "function" || typeof targetObject.resolveNawatRouteTarget !== "function" || typeof targetObject.setActiveNawatRouteProfile !== "function") {
          return;
        }
        const profile = targetObject.getNawatRouteProfile(routeKey);
        if (!profile) {
          return;
        }
        const update = () => {
          const routeTarget = targetObject.resolveNawatRouteTarget(profile, {
            sourceVerb,
            sourceObjectPrefix,
            sourceTenseValue,
            sourceCombinedMode
          }) || {};
          const patientivoNominalSuffix = typeof targetObject.resolveNawatRoutePatientivoNominalSuffix === "function" ? targetObject.resolveNawatRoutePatientivoNominalSuffix(profile, {
            sourceTenseValue,
            sourceCombinedMode
          }) : "";
          activateCnnOutputModeForContinuation({
            clearRoute: true
          });
          setActiveNawatPatientivoBranch(patientivoSource);
          if (patientivoNominalSuffix && typeof targetObject.setToggleStateValue === "function" && typeof targetObject.getPatientivoNominalSuffixKey === "function" && typeof targetObject.SUSTANTIVO_VERBAL_PREFIXES !== "undefined" && typeof targetObject.PatientivoNominalSuffixState !== "undefined" && targetObject.PatientivoNominalSuffixState) {
            targetObject.setToggleStateValue(targetObject.PatientivoNominalSuffixState, targetObject.getPatientivoNominalSuffixKey(Array.from(targetObject.SUSTANTIVO_VERBAL_PREFIXES).join("|")), patientivoNominalSuffix, {
              syncLock: true
            });
          }
          targetObject.setActiveNawatRouteProfile(routeKey, {
            ...routeTarget,
            activeRouteTravelSource: "chip",
            sourceVerb,
            sourceObjectPrefix,
            sourceTenseValue,
            sourceCombinedMode,
            activePatientivoBranch: patientivoSource,
            activePatientivoNominalSuffix: patientivoNominalSuffix
          });
          targetObject.mutateConjugationSelectionState({
            tenseMode: targetObject.TENSE_MODE.sustantivo,
            group: targetObject.CONJUGATION_GROUPS.tense,
            tenseValue: "patientivo",
            classFilter: null
          }, {
            tenseMode: targetObject.TENSE_MODE.sustantivo,
            availabilityEntries: []
          });
          if (typeof targetObject.updateTenseModeTabs === "function") {
            targetObject.updateTenseModeTabs();
          }
          if (typeof targetObject.updateCombinedModeTabs === "function") {
            targetObject.updateCombinedModeTabs();
          }
          if (typeof targetObject.syncVerbSourceScopeControl === "function") {
            targetObject.syncVerbSourceScopeControl();
          }
          if (typeof targetObject.renderTenseTabs === "function") {
            targetObject.renderTenseTabs();
          }
          renderActiveConjugations({
            verb: sourceVerb,
            objectPrefix: typeof targetObject.getCurrentObjectPrefix === "function" ? targetObject.getCurrentObjectPrefix() : "",
            tense: "patientivo"
          });
          targetObject.requestAnimationFrame(() => {
            const targetBlock = targetObject.document.querySelector(`[data-nawat-patientivo-source="${patientivoSource}"]`);
            if (!targetBlock) {
              return;
            }
            targetBlock.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });
            targetBlock.classList.add("tense-block--route-focus");
            targetObject.window.setTimeout(() => {
              targetBlock.classList.remove("tense-block--route-focus");
            }, 900);
          });
        };
        if (anchorElement && typeof targetObject.preserveViewportAnchorPosition === "function") {
          targetObject.preserveViewportAnchorPosition(anchorElement, update);
          return;
        }
        update();
      };
      const updatePatientivoBlockOrigin = (entry = {}) => {
        if (!entry.originSlot) {
          return;
        }
        entry.originSlot.replaceChildren();
        entry.originSlot.hidden = true;
        entry.block?.classList.remove("tense-block--has-origin-menu");
      };
      const getTroncoDestinationCandidateKey = (candidate = {}) => [candidate.stem || "", candidate.sourceVerb || "", candidate.sourceObjectPrefix || ""].join("\u0000");
      const getUniqueTroncoDestinationCandidates = (candidates = []) => {
        const seen = new Set();
        return (Array.isArray(candidates) ? candidates : []).map(candidate => ({
          stem: String(candidate?.stem || "").trim(),
          sourceVerb: String(candidate?.sourceVerb || "").trim(),
          sourceObjectPrefix: String(candidate?.sourceObjectPrefix || "")
        })).filter(candidate => {
          if (!candidate.stem || !candidate.sourceVerb) {
            return false;
          }
          const key = getTroncoDestinationCandidateKey(candidate);
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        });
      };
      const addTroncoDestinationCandidates = (entry = {}, candidates = []) => {
        if (!entry || entry.patientivoSource !== "tronco-verbal") {
          return;
        }
        entry.destinationCandidates = getUniqueTroncoDestinationCandidates([...(Array.isArray(entry.destinationCandidates) ? entry.destinationCandidates : []), ...(Array.isArray(candidates) ? candidates : [])]);
      };
      const getTroncoDestinationLineSpecs = () => {
        const lineSpecs = new Map();
        NAWAT_TRONCO_CONVERSION_ROUTE_SPECS.forEach(spec => {
          if (!lineSpecs.has(spec.line)) {
            lineSpecs.set(spec.line, spec);
          }
        });
        return Array.from(lineSpecs.values());
      };
      const stripPrelocativePatientivoConnector = (surface = "") => {
        return typeof targetObject.stripPatientivoPrelocativeConnector === "function" ? targetObject.stripPatientivoPrelocativeConnector(surface, {
          patientivoNominalSuffix: activePatientivoNominalSuffix
        }) : "";
      };
      const resolvePrelocativeObjectFromPatientiveRow = ({
        selection = {},
        possessorPrefix = ""
      } = {}) => {
        const transfer = typeof targetObject.resolvePatientivoPrelocativeObjectTransfer === "function" ? targetObject.resolvePatientivoPrelocativeObjectTransfer({
          selection,
          possessorPrefix
        }) : null;
        return transfer?.available ? transfer : null;
      };
      const buildPrelocativeVerbInput = ({
        incorporatedRoot = "",
        matrixRoot = "ni"
      } = {}) => {
        return typeof targetObject.buildPatientivoPrelocativeVerbInput === "function" ? targetObject.buildPatientivoPrelocativeVerbInput({
          incorporatedRoot,
          matrixRoot
        }) : "";
      };
      const getPrelocativeFinitePreviewSurface = ({
        incorporatedRoot = "",
        matrixRoot = "ni",
        objectPrefix = "",
        prelocativeVerb = ""
      } = {}) => {
        const resolvedPrelocativeVerb = prelocativeVerb || buildPrelocativeVerbInput({
          incorporatedRoot,
          matrixRoot
        });
        const promotedObjectPrefix = String(objectPrefix || "").trim();
        if (!resolvedPrelocativeVerb || !promotedObjectPrefix) {
          return "";
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            tenseMode: targetObject.TENSE_MODE.verbo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active
          },
          posicionesFormula: {
            pers1: "",
            obj1: promotedObjectPrefix,
            tronco: resolvedPrelocativeVerb,
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "presente"
          }
        }) || {};
        const surface = getPrimaryConjugationSurface(result);
        return surface && surface !== "—" ? surface : "";
      };
      const resolvePatientivoSurfaceFromEvaluation = (evaluation = {}) => {
        return getPrimaryConjugationSurface(evaluation?.result);
      };
      const resolvePatientivoSourceSurfaceForContinuation = ({
        evaluation = {},
        patientivoSource = "",
        objectPrefix = "",
        sourceTenseValue = "",
        sourceCombinedMode = ""
      } = {}) => {
        const profileSource = evaluation?.result?.nominalizationProfile?.source || {};
        const profileSurface = getPrimaryConjugationSurface(profileSource);
        if (profileSurface && profileSurface !== "—") {
          return profileSurface;
        }
        if (hasConjugationResultFrame(profileSource)) {
          return "";
        }
        const fallbackProfileSurface = String(profileSource.sourceSurface || profileSource.surface || profileSource.generatedSurface || "").trim();
        if (fallbackProfileSurface && fallbackProfileSurface !== "—") {
          return fallbackProfileSurface;
        }
        return getDirectPatientivoSourceSurface({
          patientivoSource,
          objectPrefix,
          sourceTenseValue,
          sourceCombinedMode
        });
      };
      const ensurePatientivoContinuationDisplay = ({
        value,
        evaluation
      } = {}) => {
        if (!value) {
          return null;
        }
        let actions = getConjugationConversionActionsForValue(value);
        if (value.classList.contains("conjugation-value--conversion-picker") && actions) {
          return actions;
        }
        const surfaceDisplay = getConjugationDisplaySurface(evaluation?.result);
        if (!surfaceDisplay || surfaceDisplay === "—") {
          return null;
        }
        value.replaceChildren();
        value.classList.add("conjugation-value--conversion-picker");
        const surfaceText = targetObject.document.createElement("span");
        surfaceText.className = "conjugation-conversion-surface";
        appendConjugationConversionSurfaceLines(surfaceText, surfaceDisplay, evaluation?.result);
        actions = createConjugationConversionActionsContainer();
        value.append(surfaceText, actions);
        applyConjugationConversionColumnLayout(value, surfaceText, actions);
        return actions;
      };
      const renderDenominalAndrewsContractRouteContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || typeof targetObject.activateNawatDenominalAndrewsContractRouteTarget !== "function") {
          return false;
        }
        const profile = evaluation?.result?.denominalFamilyProfile;
        let preview = profile?.andrewsContractRoutePreview;
        let activeNextSourcePreview = null;
        const previewActiveAndrewsNextSourceFns = [typeof targetObject.previewActiveNawatDenominalAndrewsContractRouteNextSource === "function" ? targetObject.previewActiveNawatDenominalAndrewsContractRouteNextSource : null, typeof globalThis !== "undefined" && typeof globalThis.previewActiveNawatDenominalAndrewsContractRouteNextSource === "function" ? globalThis.previewActiveNawatDenominalAndrewsContractRouteNextSource : null, typeof previewActiveNawatDenominalAndrewsContractRouteNextSourceForRendering === "function" ? previewActiveNawatDenominalAndrewsContractRouteNextSourceForRendering : null].filter(candidate => typeof candidate === "function");
        if ((!preview || !Array.isArray(preview.routes) || !preview.routes.length) && previewActiveAndrewsNextSourceFns.length) {
          const currentVerbInputValue = typeof targetObject.document !== "undefined" ? String(targetObject.document.getElementById("verb")?.value || "").trim() : "";
          for (const previewActiveAndrewsNextSource of previewActiveAndrewsNextSourceFns) {
            activeNextSourcePreview = previewActiveAndrewsNextSource({
              inputValue: currentVerbInputValue
            });
            preview = activeNextSourcePreview?.routePreview || null;
            if (preview && Array.isArray(preview.routes) && preview.routes.length) {
              break;
            }
          }
        }
        const routes = Array.isArray(preview?.routes) ? preview.routes.filter(route => route?.finiteGenerationContractAvailable === true) : [];
        const targetTense = String(profile?.targetTense || resolvedTense || "").trim();
        if (!routes.length || !targetTense) {
          return false;
        }
        const currentObjectPrefix = typeof targetObject.getCurrentObjectPrefix === "function" ? String(targetObject.getCurrentObjectPrefix() || "").trim() : "";
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const objectPrefixChoices = Array.isArray(targetObject.OBJECT_PREFIXES) ? targetObject.OBJECT_PREFIXES.map(prefix => String(typeof prefix === "object" ? prefix?.value : prefix || "").trim()).filter(prefix => ["ta", "te", "mu"].includes(prefix)) : ["ta", "te", "mu"];
        const renderObjectPrefixChoice = ({
          route,
          targetInput,
          objectPrefix,
          hasRouteWarning = false,
          hasRouteNote = false,
          sourceFinalPatternLabel = "",
          sourceEvidenceSatisfied = false
        } = {}) => {
          const prefix = String(objectPrefix || "").trim();
          if (!route || !targetInput || !prefix) {
            return;
          }
          const sourceRequirementIds = Array.isArray(route.sourceRequirement?.requirements) ? route.sourceRequirement.requirements.map(requirement => String(requirement?.id || "").trim()) : [];
          const sourceContextRequired = route.finiteGenerationRequiresSourceContext === true || route.sourceRequirement?.finiteGenerationRequiresSourceContext === true;
          const sourceEvidenceRequired = sourceContextRequired || route.finiteGenerationRequiresSourceEvidence === true || route.sourceRequirement?.finiteGenerationRequiresSourceEvidence === true;
          const resolvedSourceContextSatisfied = route.sourceRequirement?.sourceContextValidationStatus === "source-context-satisfied";
          const resolvedSourceEvidenceSatisfied = sourceEvidenceSatisfied || resolvedSourceContextSatisfied || route.sourceRequirement?.validationStatus === "source-evidence-satisfied";
          const sourceEvidencePending = sourceEvidenceRequired && !resolvedSourceEvidenceSatisfied;
          const objectButton = targetObject.document.createElement("button");
          objectButton.type = "button";
          objectButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo", "calc-guidance__chip--denominal-andrews", "calc-guidance__chip--object-prefix-choice", resolvedSourceEvidenceSatisfied ? "is-source-satisfied" : "", sourceEvidencePending ? "is-source-pending" : "", sourceEvidencePending ? "is-andrews-source-diagnostic" : ""].filter(Boolean).join(" ");
          objectButton.dataset.denominalAndrewsContractRouteContinuation = "true";
          objectButton.dataset.denominalAndrewsObjectPrefixChoice = "true";
          objectButton.dataset.contractId = route.contractId || "";
          objectButton.dataset.routeTemplateId = route.routeTemplateId || "";
          objectButton.dataset.targetInput = targetInput;
          objectButton.dataset.targetTense = targetTense;
          objectButton.dataset.objectPrefix = prefix;
          objectButton.dataset.objectPrefixSatisfied = "true";
          objectButton.dataset.sourceContextRequired = sourceContextRequired ? "true" : "";
          objectButton.dataset.sourceEvidenceRequired = sourceEvidenceRequired ? "true" : "";
          objectButton.dataset.sourceEvidenceSatisfied = resolvedSourceEvidenceSatisfied ? "true" : "";
          objectButton.dataset.sourceEvidencePending = sourceEvidencePending ? "true" : "";
          objectButton.dataset.sourceRequirementGate = sourceEvidencePending ? "andrews-source-context-diagnostic-not-generation-gate" : "satisfied-or-not-required";
          if (route.executableRuleId) {
            objectButton.dataset.executableRuleId = route.executableRuleId;
            objectButton.classList.add("calc-guidance__chip--andrews-rule-executable");
          }
          if (sourceRequirementIds.includes("intransitive-ti-verbstem-source")) {
            objectButton.dataset.tiSourceRequired = "true";
            objectButton.classList.add("is-ti-source");
          }
          if (sourceRequirementIds.includes("intransitive-hui-verbstem-source")) {
            objectButton.dataset.huiSourceRequired = "true";
            objectButton.classList.add("is-hui-source");
          }
          if (sourceRequirementIds.includes("intransitive-ya-verbstem-source")) {
            objectButton.dataset.yaSourceRequired = "true";
            objectButton.classList.add("is-ya-source");
          }
          if (sourceRequirementIds.includes("intransitive-tla-verbstem-source")) {
            objectButton.dataset.tlaIntransitiveSourceRequired = "true";
            objectButton.classList.add("is-tla-intransitive-source");
          }
          if (sourceRequirementIds.includes("intransitive-o-a-verbstem-source")) {
            objectButton.dataset.intransitiveOaSourceRequired = "true";
            objectButton.classList.add("is-intransitive-o-a-source");
          }
          if (sourceRequirementIds.includes("i-hui-a-hui-source")) {
            objectButton.dataset.iHuiAHuiSourceRequired = "true";
            objectButton.classList.add("is-i-hui-a-hui-source");
          }
          applyGrammarFrameRouteDataset(objectButton, route);
          const objectLabel = targetObject.document.createElement("span");
          objectLabel.className = "calc-guidance__chip-label";
          objectLabel.textContent = `${prefix} → ${targetInput}`;
          objectButton.appendChild(objectLabel);
          const objectSubLabel = targetObject.document.createElement("span");
          objectSubLabel.className = "calc-guidance__chip-sublabel";
          objectSubLabel.textContent = [`Andrews ${route.range || ""}`, `objeto ${prefix}`, hasRouteWarning ? "aviso" : "", !hasRouteWarning && hasRouteNote ? "nota" : "", sourceFinalPatternLabel, "fuente Andrews", targetTense].filter(Boolean).join(" · ");
          objectButton.appendChild(objectSubLabel);
          objectButton.title = [`contrato: ${route.contractId || ""}`, route.executableRuleId ? `regla: ${route.executableRuleId}` : "", `ruta: ${route.routeTemplateId || ""}`, `objeto verbal: ${prefix}`, `entrada verbal: ${targetInput}`, `tiempo: ${targetTense}`, "objeto verbal seleccionado explícitamente", "no crea ficha lexical"].filter(Boolean).join("; ");
          objectButton.addEventListener("click", () => {
            setActiveNawatDenominalAndrewsContractRouteRenderContext(route);
            targetObject.activateNawatDenominalAndrewsContractRouteTarget(route, {
              targetTense,
              objectPrefix: prefix,
              render: true,
              anchorElement: objectButton
            });
          });
          appendContinuationAction(actions, objectButton);
        };
        routes.forEach(route => {
          const targetInput = String(route.targetInputValue || route.targetInput || route.targetVerbStem || "").trim();
          if (!targetInput) {
            return;
          }
          const continuationIdentityKey = getDenominalAndrewsRouteContinuationIdentityKey(route, {
            namespace: "denominal-andrews-linked-route-continuation",
            routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
            targetTense
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-denominal-andrews-contract-route-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (alreadyRendered) {
            return;
          }
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo", "calc-guidance__chip--denominal-andrews"].join(" ");
          continueButton.dataset.denominalAndrewsContractRouteContinuation = "true";
          continueButton.dataset.contractId = route.contractId || "";
          continueButton.dataset.routeTemplateId = route.routeTemplateId || "";
          if (route.executableRuleId) {
            continueButton.dataset.executableRuleId = route.executableRuleId;
            continueButton.classList.add("calc-guidance__chip--andrews-rule-executable");
          }
          continueButton.dataset.targetInput = targetInput;
          continueButton.dataset.targetTense = targetTense;
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          applyGrammarFrameRouteDataset(continueButton, route);
          const routeDiagnostics = Array.isArray(route.routeDiagnostics) ? route.routeDiagnostics : [];
          const hasRouteWarning = routeDiagnostics.some(diagnostic => diagnostic?.severity === "warning");
          const hasRouteNote = routeDiagnostics.some(diagnostic => diagnostic?.severity === "info");
          if (hasRouteWarning) {
            continueButton.dataset.andrewsRouteWarning = "true";
            continueButton.classList.add("is-warning");
          } else if (hasRouteNote) {
            continueButton.dataset.andrewsRouteNote = "true";
            continueButton.classList.add("is-note");
          }
          const sourceFinalPatternStatus = String(route.sourceFinalPatternStatus || route.boundaries?.sourceFinalPatternStatus || "").trim();
          const sourceFinalPatternLabel = String(route.sourceFinalPatternLabel || route.boundaries?.sourceFinalPatternLabel || "").trim();
          if (sourceFinalPatternStatus) {
            continueButton.dataset.sourceFinalPatternStatus = sourceFinalPatternStatus;
            continueButton.classList.add("is-source-final-pattern");
            if (sourceFinalPatternStatus === "attested-minority") {
              continueButton.classList.add("is-source-final-minority");
            }
            if (sourceFinalPatternStatus === "unlisted" || sourceFinalPatternStatus === "w-final-huia-ambiguous") {
              continueButton.classList.add("is-source-final-needs-confirmation");
            }
          }
          const sourceFinalDeterminesTargetStemClass = route.boundaries?.sourceFinalDeterminesTargetStemClass === true;
          const targetStemClassRule = String(route.targetStemClassRule || route.boundaries?.targetStemClassRule || "").trim();
          if (sourceFinalDeterminesTargetStemClass) {
            continueButton.dataset.sourceFinalClassContract = "true";
            continueButton.classList.add("is-source-final-class-contract");
          }
          const traditionalSpelling = String(route.traditionalSpelling || route.boundaries?.traditionalSpelling || "").trim();
          const traditionalSpellingConfusableWith = String(route.traditionalSpellingConfusableWith || route.boundaries?.traditionalSpellingConfusableWith || "").trim();
          if (traditionalSpellingConfusableWith) {
            continueButton.dataset.traditionalSpellingAmbiguous = "true";
            continueButton.classList.add("is-traditional-spelling-ambiguous");
          }
          const objectPrefixRequired = route.finiteGenerationRequiresObjectPrefix === true || route.objectSlotExpected === true;
          const sourceContextRequired = route.finiteGenerationRequiresSourceContext === true || route.sourceRequirement?.finiteGenerationRequiresSourceContext === true;
          const sourceEvidenceRequired = sourceContextRequired || route.finiteGenerationRequiresSourceEvidence === true || route.sourceRequirement?.finiteGenerationRequiresSourceEvidence === true;
          const sourceContextSatisfied = route.sourceRequirement?.sourceContextValidationStatus === "source-context-satisfied";
          const sourceEvidenceSatisfied = sourceContextSatisfied || route.sourceRequirement?.validationStatus === "source-evidence-satisfied";
          const sourceEvidencePending = sourceEvidenceRequired && !sourceEvidenceSatisfied;
          const sourceRequirementIds = Array.isArray(route.sourceRequirement?.requirements) ? route.sourceRequirement.requirements.map(requirement => String(requirement?.id || "").trim()) : [];
          if (sourceEvidenceRequired) {
            continueButton.dataset.sourceContextRequired = sourceContextRequired ? "true" : "";
            continueButton.dataset.sourceEvidenceRequired = "true";
            continueButton.classList.add("is-source-required");
          }
          if (sourceEvidencePending) {
            continueButton.dataset.sourceEvidencePending = "true";
            continueButton.dataset.sourceRequirementGate = "andrews-source-context-diagnostic-not-generation-gate";
            continueButton.classList.add("is-source-pending", "is-andrews-source-diagnostic");
          } else {
            continueButton.dataset.sourceRequirementGate = "satisfied-or-not-required";
          }
          if (sourceContextSatisfied) {
            continueButton.dataset.sourceContextSatisfied = "true";
          }
          if (sourceEvidenceSatisfied) {
            continueButton.dataset.sourceEvidenceSatisfied = "true";
            continueButton.classList.add("is-source-satisfied");
          }
          if (sourceRequirementIds.includes("intransitive-ti-verbstem-source")) {
            continueButton.dataset.tiSourceRequired = "true";
            continueButton.classList.add("is-ti-source");
          }
          if (sourceRequirementIds.includes("intransitive-hui-verbstem-source")) {
            continueButton.dataset.huiSourceRequired = "true";
            continueButton.classList.add("is-hui-source");
          }
          if (sourceRequirementIds.includes("intransitive-ya-verbstem-source")) {
            continueButton.dataset.yaSourceRequired = "true";
            continueButton.classList.add("is-ya-source");
          }
          if (sourceRequirementIds.includes("intransitive-tla-verbstem-source")) {
            continueButton.dataset.tlaIntransitiveSourceRequired = "true";
            continueButton.classList.add("is-tla-intransitive-source");
          }
          if (sourceRequirementIds.includes("intransitive-o-a-verbstem-source")) {
            continueButton.dataset.intransitiveOaSourceRequired = "true";
            continueButton.classList.add("is-intransitive-o-a-source");
          }
          if (sourceRequirementIds.includes("i-hui-a-hui-source")) {
            continueButton.dataset.iHuiAHuiSourceRequired = "true";
            continueButton.classList.add("is-i-hui-a-hui-source");
          }
          if (sourceRequirementIds.includes("temporal-compound-nounstem")) {
            continueButton.dataset.temporalSourceRequired = "true";
            continueButton.classList.add("is-temporal-source");
          }
          if (sourceRequirementIds.includes("adverbial-nounstem")) {
            continueButton.dataset.adverbialSourceRequired = "true";
            continueButton.classList.add("is-adverbial-source");
          }
          if (sourceRequirementIds.includes("relational-compound-or-possessive-relational-predicate")) {
            continueButton.dataset.relationalCompoundSourceRequired = "true";
            continueButton.classList.add("is-relational-source");
          }
          if (objectPrefixRequired) {
            continueButton.dataset.objectPrefixRequired = "true";
          }
          if (objectPrefixRequired && !currentObjectPrefix) {
            continueButton.disabled = true;
            continueButton.setAttribute("aria-disabled", "true");
            continueButton.classList.add("is-unavailable");
            continueButton.dataset.objectPrefixMissing = "true";
            continueButton.classList.add("is-object-prefix-required");
          }
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetInput}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = [`Andrews ${route.range || ""}`, route.targetStemClass ? `Clase ${route.targetStemClass}` : "", hasRouteWarning ? "aviso" : "", !hasRouteWarning && hasRouteNote ? "nota" : "", sourceFinalPatternLabel, sourceFinalDeterminesTargetStemClass ? "clase por segmento final" : "", traditionalSpellingConfusableWith ? "grafía ambigua" : "", sourceEvidencePending ? "contexto Andrews pendiente" : "", sourceEvidenceSatisfied ? "fuente Andrews" : "", objectPrefixRequired && !currentObjectPrefix ? "objeto pendiente" : "", targetTense].filter(Boolean).join(" · ");
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`contrato: ${route.contractId || ""}`, route.executableRuleId ? `regla: ${route.executableRuleId}` : "", `ruta: ${route.routeTemplateId || ""}`, `sufijo: ${route.classicalSuffixSequence || ""} -> ${route.nawatRuleSuffix || ""}`, route.targetStemClass ? `clase: ${route.targetStemClass}` : "", `entrada verbal: ${targetInput}`, `tiempo: ${targetTense}`, sourceEvidencePending ? "contexto Andrews pendiente; no bloquea generacion" : "", sourceEvidenceSatisfied ? "fuente Andrews satisfecha por etapa generada" : "", objectPrefixRequired ? "requiere objeto verbal" : "", sourceFinalPatternLabel, targetStemClassRule ? `regla de clase: ${targetStemClassRule}` : "", traditionalSpellingConfusableWith ? `grafía ${traditionalSpelling} puede confundirse con ${traditionalSpellingConfusableWith}` : "", routeDiagnostics.map(diagnostic => diagnostic?.message || "").filter(Boolean).join(" "), "no crea ficha lexical"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            setActiveNawatDenominalAndrewsContractRouteRenderContext(route);
            targetObject.activateNawatDenominalAndrewsContractRouteTarget(route, {
              targetTense,
              objectPrefix: currentObjectPrefix,
              render: true,
              anchorElement: continueButton
            });
          });
          appendContinuationAction(actions, continueButton);
          if (objectPrefixRequired && !currentObjectPrefix) {
            objectPrefixChoices.forEach(objectPrefixChoice => {
              renderObjectPrefixChoice({
                route,
                targetInput,
                objectPrefix: objectPrefixChoice,
                hasRouteWarning,
                hasRouteNote,
                sourceFinalPatternLabel,
                sourceEvidenceSatisfied
              });
            });
          }
        });
        return true;
      };
      const getCompoundEmbedFinitePreviewSurface = ({
        compoundVerb = "",
        objectPrefix = ""
      } = {}) => {
        if (!compoundVerb) {
          return "";
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            tenseMode: targetObject.TENSE_MODE.verbo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active
          },
          posicionesFormula: {
            pers1: "",
            obj1: objectPrefix,
            tronco: compoundVerb,
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "presente"
          }
        }) || {};
        const surface = getPrimaryConjugationSurface(result);
        return surface && surface !== "—" ? surface : "";
      };
      const getCharacteristicPropertyEmbedFinitePreviewSurface = ({
        compoundVerb = "",
        objectPrefix = "ki"
      } = {}) => getCompoundEmbedFinitePreviewSurface({
        compoundVerb,
        objectPrefix
      });
      const getPreteritAgentiveOwnerhoodPreviewSurface = ({
        ownerhoodVerbInput = ""
      } = {}) => {
        if (!ownerhoodVerbInput) {
          return "";
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            tenseMode: targetObject.TENSE_MODE.verbo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active
          },
          posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: ownerhoodVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "pasado-remoto"
          }
        }) || {};
        const surface = getPrimaryConjugationSurface(result);
        return surface && surface !== "—" ? surface : "";
      };
      const getNominalCompoundPreviewSurface = ({
        ordinaryNncRequest = null
      } = {}) => {
        if (!ordinaryNncRequest || !ordinaryNncRequest.stem) {
          return "";
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            tenseMode: targetObject.TENSE_MODE.sustantivo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active,
            ordinaryNnc: {
              enabled: true,
              ...ordinaryNncRequest
            }
          },
          posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: ordinaryNncRequest.stem,
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "ordinary-nnc"
          }
        }) || {};
        const surface = getPrimaryConjugationSurface(result);
        return surface && surface !== "—" ? surface : "";
      };
      const getActionNominalSurfacesFromEvaluation = (evaluation = {}) => {
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        return forms;
      };
      const getActionNominalSourceEntriesFromEvaluation = (evaluation = {}) => {
        const result = evaluation?.result || {};
        return getActionNominalSurfacesFromEvaluation(evaluation).map((surface, index) => {
          const selectedVariant = getGeneratedOutputSelectedRealizationVariant(result, index);
          const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(result, selectedVariant, {
            role: "source",
            unit: "NNC"
          });
          const sourceVariantId = selectedVariant?.variantId || (hasConjugationResultFrame(result) ? `structured-result-frame:${index}` : `legacy-display:${index}`);
          return {
            surface,
            sourceVariantId,
            selectedVariant,
            sourceContinuationFrame
          };
        });
      };
      const getFunctionUseContinuationFormulaSlotsFromResult = (result = null) => {
        return getGeneratedOutputStructuredContinuationFormulaSlots(result);
      };
      const getFunctionUseContinuationFormulaEchoFromResult = (result = null, formulaSlots = null) => {
        return getGeneratedOutputStructuredContinuationFormulaEcho(result, formulaSlots);
      };
      const getFunctionUseContinuationIdentityKey = (evaluation = {}, contract = null, context = {}) => {
        return getGeneratedOutputContinuationIdentityKey([evaluation?.result, contract], context);
      };
      const getCustomaryAgentiveStemsFromEvaluation = (evaluation = {}) => {
        const result = evaluation?.result || {};
        if (result?.nominalizationProfile?.nominalKind !== "agentivo") {
          return [];
        }
        const surfaceForms = getConjugationSurfaceForms(result);
        const hasResultFrame = hasConjugationResultFrame(result);
        const predicateStem = getGeneratedOutputStructuredContinuationPredicateStem(result);
        const slots = !hasResultFrame ? result?.nuclearClauseShell?.slots || {} : {};
        const subjectPrefix = String((slots.pers1Pers2 || slots.subject)?.prefix || "").trim();
        const connector = String(slots.num1Num2?.connector || "").trim();
        const stems = [];
        const addStem = (stem = "") => {
          const normalized = String(stem || "").trim();
          if (normalized && !stems.includes(normalized)) {
            stems.push(normalized);
          }
        };
        if (hasResultFrame) {
          addStem(predicateStem);
          return stems;
        }
        if (!hasResultFrame) {
          addStem(predicateStem);
        }
        surfaceForms.forEach(surfaceForm => {
          let core = String(surfaceForm || "").trim();
          if (!core || core === "—") {
            return;
          }
          if (subjectPrefix && core.startsWith(subjectPrefix)) {
            core = core.slice(subjectPrefix.length);
          }
          if (connector && core.length > connector.length && core.endsWith(connector)) {
            core = core.slice(0, -connector.length);
          }
          addStem(core);
        });
        return stems;
      };
      const getPreteritAgentiveGeneralUseStemsFromEvaluation = (evaluation = {}) => {
        const result = evaluation?.result || {};
        if (result?.nominalizationProfile?.nominalKind !== "agentivo-preterito") {
          return [];
        }
        const surfaceForms = getConjugationSurfaceForms(result);
        const hasResultFrame = hasConjugationResultFrame(result);
        const slots = !hasResultFrame ? result?.nuclearClauseShell?.slots || {} : {};
        const subjectPrefix = String(slots.subject?.prefix || "").trim();
        const predicateStem = getGeneratedOutputStructuredContinuationPredicateStem(result);
        const structuredFormulaSlots = hasResultFrame ? getGeneratedOutputStructuredContinuationFormulaSlots(result) || {} : {};
        const structuredPredicateSlot = structuredFormulaSlots.predicateStem || structuredFormulaSlots.predicate || {};
        const predicateState = String((hasResultFrame ? structuredPredicateSlot?.state : slots.predicate?.state) || result?.nominalizationProfile?.predicateState?.value || "").trim();
        const possessorPrefix = String((hasResultFrame ? structuredPredicateSlot?.stateSlot?.possessorPrefix : slots.predicate?.stateSlot?.possessorPrefix) || result?.nominalizationProfile?.predicateState?.possessorPrefix || "").trim();
        const stems = [];
        const addStem = (stem = "") => {
          const normalized = String(stem || "").trim();
          if (normalized && !stems.includes(normalized)) {
            stems.push(normalized);
          }
        };
        if (hasResultFrame) {
          if (predicateStem) {
            addStem(predicateState === "possessive" || predicateStem.endsWith("ka") ? predicateStem : `${predicateStem}ka`);
          }
          return stems;
        }
        if (!hasResultFrame && predicateStem) {
          addStem(predicateState === "possessive" || predicateStem.endsWith("ka") ? predicateStem : `${predicateStem}ka`);
        }
        surfaceForms.forEach(surfaceForm => {
          let core = String(surfaceForm || "").trim();
          if (!core || core === "—") {
            return;
          }
          if (subjectPrefix && core.startsWith(subjectPrefix)) {
            core = core.slice(subjectPrefix.length);
          }
          if (possessorPrefix && core.startsWith(possessorPrefix)) {
            core = core.slice(possessorPrefix.length);
          }
          if (predicateState === "possessive") {
            for (const connector of ["wan", "w"]) {
              if (core.length > connector.length && core.endsWith(connector)) {
                addStem(core.slice(0, -connector.length));
                return;
              }
            }
            return;
          }
          for (const connector of ["ket", "ki", "k"]) {
            if (core.length > connector.length && core.endsWith(connector)) {
              addStem(`${core.slice(0, -connector.length)}ka`);
              return;
            }
          }
        });
        return stems;
      };
      const renderActiveActionCompoundEmbedContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "sustantivo-verbal" || typeof targetObject.buildActiveActionCompoundEmbedContinuationContract !== "function") {
          return false;
        }
        const actionNominalEntries = getActionNominalSourceEntriesFromEvaluation(evaluation);
        if (!actionNominalEntries.length) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getActiveActionCompoundEmbedMatrixInventory === "function" ? targetObject.getActiveActionCompoundEmbedMatrixInventory() : [{
          id: "tzahtzi",
          nawatRoot: "tzajtzi",
          label: "shout with the embedded action"
        }];
        const contracts = actionNominalEntries.flatMap(sourceEntry => matrixInventory.map(matrixSpec => ({
          ...targetObject.buildActiveActionCompoundEmbedContinuationContract({
            actionNominalSurface: sourceEntry.surface,
            sourceSurface: sourceEntry.surface,
            sourceFormulaSlots,
            sourceFormulaEcho,
            sourceContinuationFrame: sourceEntry.sourceContinuationFrame,
            matrixRoot: matrixSpec.nawatRoot || "tzajtzi"
          }),
          sourceSelectedVariant: sourceEntry.selectedVariant,
          sourceVariantId: sourceEntry.sourceVariantId,
          sourceContinuationFrame: sourceEntry.sourceContinuationFrame
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyActiveActionCompoundContract = contract => {
          if (typeof targetObject.applyActiveActionCompoundEmbedRootsToVerbEntry === "function") {
            targetObject.applyActiveActionCompoundEmbedRootsToVerbEntry({
              actionNominalSurface: contract.actionNominalSurface,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              sourceContinuationFrame: contract.sourceContinuationFrame || null,
              targetContinuationFrame: contract.targetContinuationFrame || null,
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createActiveActionCompoundButton = (contract, continuationIdentityKey = "") => {
          const compoundVerbInput = contract.compoundVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: compoundVerbInput
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.activeActionCompoundEmbedContinuation = "true";
          continueButton.dataset.compoundVerb = compoundVerbInput;
          continueButton.dataset.actionNominalSurface = contract.actionNominalSurface;
          continueButton.dataset.compoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.compoundMatrixId = contract.matrix?.id || "";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          if (contract.sourceSelectedVariant?.variantId) {
            continueButton.dataset.sourceSelectedVariantId = contract.sourceSelectedVariant.variantId;
          }
          if (contract.sourceContinuationFrame?.formulaRealizationRecord?.id) {
            continueButton.dataset.sourceFormulaRealizationRecordId = contract.sourceContinuationFrame.formulaRealizationRecord.id;
          }
          if (contract.targetContinuationFrame?.targetInput) {
            continueButton.dataset.targetContinuationFrame = "true";
          }
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida: ${contract.actionNominalSurface}`, `incrustado: ${contract.incorporatedRoot}`, `raíz matriz: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 37.5.4: ${contract.matrix.classicalMatrix}` : "", `V: ${compoundVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyActiveActionCompoundContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "active-action-compound-embed-continuation",
            targetTense: resolvedTense,
            sourceUnit: "action-noun",
            sourceVariantId: contract.sourceSelectedVariant?.variantId || contract.sourceVariantId || "",
            targetVariantId: [contract.matrix?.id || "", contract.compoundVerbInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-active-action-compound-embed-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createActiveActionCompoundButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const renderActiveActionNominalCompoundContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "sustantivo-verbal" || typeof targetObject.buildActiveActionNominalCompoundContinuationContract !== "function") {
          return false;
        }
        const actionNominalEntries = getActionNominalSourceEntriesFromEvaluation(evaluation);
        if (!actionNominalEntries.length) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getActiveActionNominalCompoundMatrixInventory === "function" ? targetObject.getActiveActionNominalCompoundMatrixInventory() : [{
          id: "cal-li",
          nawatRoot: "kal",
          nounClass: "zero",
          animacy: "inanimate"
        }];
        const contracts = actionNominalEntries.flatMap(sourceEntry => matrixInventory.map(matrixSpec => ({
          ...targetObject.buildActiveActionNominalCompoundContinuationContract({
            actionNominalSurface: sourceEntry.surface,
            sourceSurface: sourceEntry.surface,
            sourceFormulaSlots,
            sourceFormulaEcho,
            matrixRoot: matrixSpec.nawatRoot || "kal"
          }),
          sourceSelectedVariant: sourceEntry.selectedVariant,
          sourceVariantId: sourceEntry.sourceVariantId
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyActiveActionNominalContract = contract => {
          if (typeof targetObject.applyActiveActionNominalCompoundToOrdinaryNncEntry === "function") {
            targetObject.applyActiveActionNominalCompoundToOrdinaryNncEntry({
              actionNominalSurface: contract.actionNominalSurface,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              nounClass: contract.matrix?.nounClass || "zero",
              animacy: contract.matrix?.animacy || "inanimate",
              compoundStem: contract.compoundStem,
              ordinaryNncInput: contract.ordinaryNncInput,
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createActiveActionNominalButton = (contract, continuationIdentityKey = "") => {
          const previewSurface = getNominalCompoundPreviewSurface({
            ordinaryNncRequest: contract.ordinaryNncRequest
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
          continueButton.dataset.activeActionNominalCompoundContinuation = "true";
          continueButton.dataset.ordinaryNncInput = contract.ordinaryNncInput;
          continueButton.dataset.actionNominalSurface = contract.actionNominalSurface;
          continueButton.dataset.nominalCompoundStem = contract.compoundStem;
          continueButton.dataset.nominalCompoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.nominalCompoundMatrixId = contract.matrix?.id || "";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          if (contract.sourceSelectedVariant?.variantId) {
            continueButton.dataset.sourceSelectedVariantId = contract.sourceSelectedVariant.variantId;
          }
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = previewSurface ? `→ ${previewSurface}` : `S→ ${contract.ordinaryNncInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida: ${contract.actionNominalSurface}`, `incrustado: ${contract.incorporatedRoot}`, `matriz nominal: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 37.5.4: ${contract.matrix.classicalMatrix}` : "", `S: ${contract.ordinaryNncInput}`, previewSurface ? `salida S: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyActiveActionNominalContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "active-action-nominal-compound-continuation",
            targetTense: resolvedTense,
            sourceUnit: "action-noun",
            sourceVariantId: contract.sourceSelectedVariant?.variantId || contract.sourceVariantId || "",
            targetVariantId: [contract.matrix?.id || "", contract.ordinaryNncInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-active-action-nominal-compound-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createActiveActionNominalButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const renderCustomaryAgentiveNominalCompoundContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo" || typeof targetObject.buildCustomaryAgentiveNominalCompoundContinuationContract !== "function") {
          return false;
        }
        const customaryAgentiveStems = getCustomaryAgentiveStemsFromEvaluation(evaluation);
        if (!customaryAgentiveStems.length) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getCustomaryAgentiveNominalCompoundMatrixInventory === "function" ? targetObject.getCustomaryAgentiveNominalCompoundMatrixInventory() : [{
          id: "cal-li",
          nawatRoot: "kal",
          nounClass: "zero",
          animacy: "inanimate"
        }];
        const contracts = customaryAgentiveStems.flatMap(customaryAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildCustomaryAgentiveNominalCompoundContinuationContract({
          customaryAgentiveStem,
          sourceSurface: customaryAgentiveStem,
          sourceFormulaSlots,
          sourceFormulaEcho,
          matrixRoot: matrixSpec.nawatRoot || "kal"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyCustomaryAgentiveNominalContract = contract => {
          if (typeof targetObject.applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry === "function") {
            targetObject.applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry({
              customaryAgentiveStem: contract.customaryAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              nounClass: contract.matrix?.nounClass || "zero",
              animacy: contract.matrix?.animacy || "inanimate",
              compoundStem: contract.compoundStem,
              ordinaryNncInput: contract.ordinaryNncInput,
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createCustomaryAgentiveNominalButton = (contract, continuationIdentityKey = "") => {
          const previewSurface = getNominalCompoundPreviewSurface({
            ordinaryNncRequest: contract.ordinaryNncRequest
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
          continueButton.dataset.customaryAgentiveNominalCompoundContinuation = "true";
          continueButton.dataset.ordinaryNncInput = contract.ordinaryNncInput;
          continueButton.dataset.customaryAgentiveStem = contract.customaryAgentiveStem;
          continueButton.dataset.nominalCompoundStem = contract.compoundStem;
          continueButton.dataset.nominalCompoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.nominalCompoundMatrixId = contract.matrix?.id || "";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = previewSurface ? `→ ${previewSurface}` : `S→ ${contract.ordinaryNncInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva habitual: ${contract.sourceSurface || contract.customaryAgentiveStem}`, `nominalizado completo: ${contract.customaryAgentiveStem}`, `matriz nominal: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 36.3: ${contract.matrix.classicalMatrix}` : "", `S: ${contract.ordinaryNncInput}`, previewSurface ? `salida S: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyCustomaryAgentiveNominalContract(contract);
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "customary-agentive-nominal-compound-continuation",
            targetTense: resolvedTense,
            sourceUnit: "customary-agentive",
            sourceVariantId: String(index),
            targetVariantId: [contract.matrix?.id || "", contract.ordinaryNncInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-customary-agentive-nominal-compound-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createCustomaryAgentiveNominalButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const renderCustomaryAgentiveCompoundEmbedContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo" || typeof targetObject.buildCustomaryAgentiveCompoundEmbedContinuationContract !== "function") {
          return false;
        }
        const customaryAgentiveStems = getCustomaryAgentiveStemsFromEvaluation(evaluation);
        if (!customaryAgentiveStems.length) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getCustomaryAgentiveCompoundEmbedMatrixInventory === "function" ? targetObject.getCustomaryAgentiveCompoundEmbedMatrixInventory() : [{
          id: "toca-incorporated-complement",
          nawatRoot: "tuka",
          objectPrefix: "ki",
          label: "consider as the embedded fully nominalized customary-agentive entity"
        }];
        const contracts = customaryAgentiveStems.flatMap(customaryAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildCustomaryAgentiveCompoundEmbedContinuationContract({
          customaryAgentiveStem,
          sourceSurface: customaryAgentiveStem,
          sourceFormulaSlots,
          sourceFormulaEcho,
          matrixRoot: matrixSpec.nawatRoot || "tuka",
          objectPrefix: matrixSpec.objectPrefix || "ki"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyCustomaryAgentiveCompoundEmbedContract = contract => {
          if (typeof targetObject.applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry === "function") {
            targetObject.applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry({
              customaryAgentiveStem: contract.customaryAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              objectPrefix: contract.objectPrefix,
              compoundVerbInput: contract.compoundVerbInput,
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createCustomaryAgentiveCompoundEmbedButton = (contract, continuationIdentityKey = "") => {
          const compoundVerbInput = contract.compoundVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: compoundVerbInput,
            objectPrefix: contract.objectPrefix
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.customaryAgentiveCompoundEmbedContinuation = "true";
          continueButton.dataset.compoundVerb = compoundVerbInput;
          continueButton.dataset.customaryAgentiveStem = contract.customaryAgentiveStem;
          continueButton.dataset.compoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.compoundMatrixId = contract.matrix?.id || "";
          continueButton.dataset.objectPrefix = contract.objectPrefix || "";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva habitual: ${contract.sourceSurface || contract.customaryAgentiveStem}`, `nominalizado completo: ${contract.customaryAgentiveStem}`, `raíz matriz: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 36.3: ${contract.matrix.classicalMatrix}` : "", contract.objectPrefix ? `objeto: ${contract.objectPrefix}` : "", `V: ${compoundVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyCustomaryAgentiveCompoundEmbedContract(contract);
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "customary-agentive-compound-embed-continuation",
            targetTense: resolvedTense,
            sourceUnit: "customary-agentive",
            sourceVariantId: String(index),
            targetVariantId: [contract.matrix?.id || "", contract.objectPrefix || "", contract.compoundVerbInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-customary-agentive-compound-embed-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createCustomaryAgentiveCompoundEmbedButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const renderPreteritAgentiveCompoundEmbedContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo-preterito" || typeof targetObject.buildPreteritAgentiveCompoundEmbedContinuationContract !== "function") {
          return false;
        }
        const generalUseStems = getPreteritAgentiveGeneralUseStemsFromEvaluation(evaluation);
        if (!generalUseStems.length) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getPreteritAgentiveCompoundEmbedMatrixInventory === "function" ? targetObject.getPreteritAgentiveCompoundEmbedMatrixInventory() : [{
          id: "tzahtzi",
          nawatRoot: "tzajtzi",
          label: "shout with the embedded preterit-agentive stem"
        }];
        const contracts = generalUseStems.flatMap(preteritAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildPreteritAgentiveCompoundEmbedContinuationContract({
          preteritAgentiveStem,
          sourceSurface: preteritAgentiveStem,
          sourceFormulaSlots,
          sourceFormulaEcho,
          matrixRoot: matrixSpec.nawatRoot || "tzajtzi"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyPreteritAgentiveCompoundContract = contract => {
          if (typeof targetObject.applyActiveActionCompoundEmbedRootsToVerbEntry === "function") {
            targetObject.applyActiveActionCompoundEmbedRootsToVerbEntry({
              actionNominalSurface: contract.preteritAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createPreteritAgentiveCompoundButton = (contract, continuationIdentityKey = "") => {
          const compoundVerbInput = contract.compoundVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: compoundVerbInput
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.preteritAgentiveCompoundEmbedContinuation = "true";
          continueButton.dataset.compoundVerb = compoundVerbInput;
          continueButton.dataset.preteritAgentiveStem = contract.preteritAgentiveStem;
          continueButton.dataset.compoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.compoundMatrixId = contract.matrix?.id || "";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva pretérita: ${contract.sourceSurface || contract.preteritAgentiveStem}`, `uso general: ${contract.preteritAgentiveStem}`, `raíz matriz: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 35.7: ${contract.matrix.classicalMatrix}` : "", `V: ${compoundVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPreteritAgentiveCompoundContract(contract);
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "preterit-agentive-compound-embed-continuation",
            targetTense: resolvedTense,
            sourceUnit: "preterit-agentive",
            sourceVariantId: String(index),
            targetVariantId: [contract.matrix?.id || "", contract.compoundVerbInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-preterit-agentive-compound-embed-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createPreteritAgentiveCompoundButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const renderPreteritAgentiveNominalCompoundContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo-preterito" || typeof targetObject.buildPreteritAgentiveNominalCompoundContinuationContract !== "function") {
          return false;
        }
        const generalUseStems = getPreteritAgentiveGeneralUseStemsFromEvaluation(evaluation);
        if (!generalUseStems.length) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getPreteritAgentiveNominalCompoundMatrixInventory === "function" ? targetObject.getPreteritAgentiveNominalCompoundMatrixInventory() : [{
          id: "cal-li",
          nawatRoot: "kal",
          nounClass: "zero",
          animacy: "inanimate"
        }];
        const contracts = generalUseStems.flatMap(preteritAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildPreteritAgentiveNominalCompoundContinuationContract({
          preteritAgentiveStem,
          sourceSurface: preteritAgentiveStem,
          sourceFormulaSlots,
          sourceFormulaEcho,
          matrixRoot: matrixSpec.nawatRoot || "kal"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyPreteritAgentiveNominalContract = contract => {
          if (typeof targetObject.applyActiveActionNominalCompoundToOrdinaryNncEntry === "function") {
            targetObject.applyActiveActionNominalCompoundToOrdinaryNncEntry({
              actionNominalSurface: contract.preteritAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              nounClass: contract.matrix?.nounClass || "zero",
              animacy: contract.matrix?.animacy || "inanimate",
              compoundStem: contract.compoundStem,
              ordinaryNncInput: contract.ordinaryNncInput,
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
              routeDataset: {
                preteritAgentiveNominalCompoundContinuation: "true"
              },
              eventSource: "preterit-agentive-nominal-compound-entry",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createPreteritAgentiveNominalButton = (contract, continuationIdentityKey = "") => {
          const previewSurface = getNominalCompoundPreviewSurface({
            ordinaryNncRequest: contract.ordinaryNncRequest
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
          continueButton.dataset.preteritAgentiveNominalCompoundContinuation = "true";
          continueButton.dataset.ordinaryNncInput = contract.ordinaryNncInput;
          continueButton.dataset.preteritAgentiveStem = contract.preteritAgentiveStem;
          continueButton.dataset.nominalCompoundStem = contract.compoundStem;
          continueButton.dataset.nominalCompoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.nominalCompoundMatrixId = contract.matrix?.id || "";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = previewSurface ? `→ ${previewSurface}` : `S→ ${contract.ordinaryNncInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva pretérita: ${contract.sourceSurface || contract.preteritAgentiveStem}`, `uso general: ${contract.preteritAgentiveStem}`, `matriz nominal: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 35.7: ${contract.matrix.classicalMatrix}` : "", `S: ${contract.ordinaryNncInput}`, previewSurface ? `salida S: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPreteritAgentiveNominalContract(contract);
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "preterit-agentive-nominal-compound-continuation",
            targetTense: resolvedTense,
            sourceUnit: "preterit-agentive",
            sourceVariantId: String(index),
            targetVariantId: [contract.matrix?.id || "", contract.ordinaryNncInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-preterit-agentive-nominal-compound-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createPreteritAgentiveNominalButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const renderPreteritAgentiveOwnerhoodContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo-preterito" || typeof targetObject.buildPreteritAgentiveOwnerhoodContinuationContract !== "function") {
          return false;
        }
        const generalUseStems = getPreteritAgentiveGeneralUseStemsFromEvaluation(evaluation);
        if (!generalUseStems.length) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getPreteritAgentiveOwnerhoodMatrixInventory === "function" ? targetObject.getPreteritAgentiveOwnerhoodMatrixInventory() : [{
          id: "tla-hua-ownerhood",
          nawatRoot: "wa",
          surfaceMatrix: "waj",
          ownerhoodKind: "ownerhood"
        }];
        const contracts = generalUseStems.flatMap(preteritAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildPreteritAgentiveOwnerhoodContinuationContract({
          preteritAgentiveStem,
          sourceSurface: preteritAgentiveStem,
          sourceFormulaSlots,
          sourceFormulaEcho,
          matrixRoot: matrixSpec.nawatRoot || "wa"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyPreteritAgentiveOwnerhoodContract = contract => {
          if (typeof targetObject.applyPreteritAgentiveOwnerhoodRootsToVerbEntry === "function") {
            targetObject.applyPreteritAgentiveOwnerhoodRootsToVerbEntry({
              preteritAgentiveStem: contract.preteritAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              ownerhoodVerbInput: contract.ownerhoodVerbInput,
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createPreteritAgentiveOwnerhoodButton = (contract, continuationIdentityKey = "") => {
          const ownerhoodVerbInput = contract.ownerhoodVerbInput;
          const previewSurface = getPreteritAgentiveOwnerhoodPreviewSurface({
            ownerhoodVerbInput
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.preteritAgentiveOwnerhoodContinuation = "true";
          continueButton.dataset.ownerhoodVerbInput = ownerhoodVerbInput;
          continueButton.dataset.preteritAgentiveStem = contract.preteritAgentiveStem;
          continueButton.dataset.ownerhoodMatrixRoot = contract.matrixRoot;
          continueButton.dataset.ownerhoodMatrixId = contract.matrix?.id || "";
          continueButton.dataset.ownerhoodKind = contract.ownerhoodKind || "";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || ownerhoodVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva pretérita: ${contract.sourceSurface || contract.preteritAgentiveStem}`, `uso general: ${contract.preteritAgentiveStem}`, `matriz de posesión: ${contract.matrixRoot}`, contract.ownerhoodKind ? `tipo: ${contract.ownerhoodKind}` : "", contract.matrix?.classicalMatrix ? `${contract.grammarSource}: ${contract.matrix.classicalMatrix}` : "", `V pretérito: ${ownerhoodVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPreteritAgentiveOwnerhoodContract(contract);
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "preterit-agentive-ownerhood-continuation",
            targetTense: resolvedTense,
            sourceUnit: "preterit-agentive",
            sourceVariantId: String(index),
            targetVariantId: [contract.matrix?.id || "", contract.ownerhoodKind || "", contract.ownerhoodVerbInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-preterit-agentive-ownerhood-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createPreteritAgentiveOwnerhoodButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const renderPreteritAgentiveComplementContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo-preterito" || typeof targetObject.buildPreteritAgentiveComplementContinuationContract !== "function") {
          return false;
        }
        const generalUseStems = getPreteritAgentiveGeneralUseStemsFromEvaluation(evaluation);
        if (!generalUseStems.length) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getPreteritAgentiveComplementMatrixInventory === "function" ? targetObject.getPreteritAgentiveComplementMatrixInventory() : [{
          id: "te-tla-mati",
          nawatRoot: "mati",
          objectPrefix: "ki"
        }];
        const contracts = generalUseStems.flatMap(preteritAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildPreteritAgentiveComplementContinuationContract({
          preteritAgentiveStem,
          sourceSurface: preteritAgentiveStem,
          sourceFormulaSlots,
          sourceFormulaEcho,
          matrixRoot: matrixSpec.nawatRoot || "mati",
          objectPrefix: matrixSpec.objectPrefix || "ki"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyPreteritAgentiveComplementContract = contract => {
          if (typeof targetObject.applyPreteritAgentiveComplementRootsToVerbEntry === "function") {
            targetObject.applyPreteritAgentiveComplementRootsToVerbEntry({
              preteritAgentiveStem: contract.preteritAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              objectPrefix: contract.objectPrefix || "ki",
              complementVerbInput: contract.complementVerbInput,
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createPreteritAgentiveComplementButton = (contract, continuationIdentityKey = "") => {
          const complementVerbInput = contract.complementVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: complementVerbInput,
            objectPrefix: contract.objectPrefix || "ki"
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.preteritAgentiveComplementContinuation = "true";
          continueButton.dataset.complementVerbInput = complementVerbInput;
          continueButton.dataset.preteritAgentiveStem = contract.preteritAgentiveStem;
          continueButton.dataset.complementMatrixRoot = contract.matrixRoot;
          continueButton.dataset.complementMatrixId = contract.matrix?.id || "";
          continueButton.dataset.objectPrefix = contract.objectPrefix || "ki";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || complementVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva pretérita: ${contract.sourceSurface || contract.preteritAgentiveStem}`, `uso general: ${contract.preteritAgentiveStem}`, `matriz de complemento: ${contract.matrixRoot}`, `objeto: ${contract.objectPrefix || "ki"}`, contract.matrix?.classicalMatrix ? `Andrews 35.12: ${contract.matrix.classicalMatrix}` : "", `V: ${complementVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPreteritAgentiveComplementContract(contract);
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "preterit-agentive-complement-continuation",
            targetTense: resolvedTense,
            sourceUnit: "preterit-agentive",
            sourceVariantId: String(index),
            targetVariantId: [contract.matrix?.id || "", contract.objectPrefix || "", contract.complementVerbInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-preterit-agentive-complement-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createPreteritAgentiveComplementButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const renderPreteritAgentiveAdverbialContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo-preterito" || typeof targetObject.buildPreteritAgentiveAdverbialContinuationContract !== "function") {
          return false;
        }
        const generalUseStems = getPreteritAgentiveGeneralUseStemsFromEvaluation(evaluation);
        if (!generalUseStems.length) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getPreteritAgentiveAdverbialMatrixInventory === "function" ? targetObject.getPreteritAgentiveAdverbialMatrixInventory() : [{
          id: "nemi-adverbial-manner",
          nawatRoot: "nemi",
          objectPrefix: "",
          matrixValency: "intransitive"
        }];
        const contracts = generalUseStems.flatMap(preteritAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildPreteritAgentiveAdverbialContinuationContract({
          preteritAgentiveStem,
          sourceSurface: preteritAgentiveStem,
          sourceFormulaSlots,
          sourceFormulaEcho,
          matrixRoot: matrixSpec.nawatRoot || "nemi",
          objectPrefix: matrixSpec.objectPrefix || ""
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyPreteritAgentiveAdverbialContract = contract => {
          if (typeof targetObject.applyPreteritAgentiveAdverbialRootsToVerbEntry === "function") {
            targetObject.applyPreteritAgentiveAdverbialRootsToVerbEntry({
              preteritAgentiveStem: contract.preteritAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              objectPrefix: contract.objectPrefix || "",
              adverbialVerbInput: contract.adverbialVerbInput,
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createPreteritAgentiveAdverbialButton = (contract, continuationIdentityKey = "") => {
          const adverbialVerbInput = contract.adverbialVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: adverbialVerbInput,
            objectPrefix: contract.objectPrefix || ""
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.preteritAgentiveAdverbialContinuation = "true";
          continueButton.dataset.adverbialVerbInput = adverbialVerbInput;
          continueButton.dataset.preteritAgentiveStem = contract.preteritAgentiveStem;
          continueButton.dataset.adverbialMatrixRoot = contract.matrixRoot;
          continueButton.dataset.adverbialMatrixId = contract.matrix?.id || "";
          continueButton.dataset.objectPrefix = contract.objectPrefix || "";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || adverbialVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva pretérita: ${contract.sourceSurface || contract.preteritAgentiveStem}`, `uso general: ${contract.preteritAgentiveStem}`, `matriz adverbial: ${contract.matrixRoot}`, contract.adverbialFocus ? `foco: ${contract.adverbialFocus}` : "", contract.objectPrefix ? `objeto: ${contract.objectPrefix}` : "", contract.matrix?.classicalMatrix ? `Andrews 35.12: ${contract.matrix.classicalMatrix}` : "", `V: ${adverbialVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPreteritAgentiveAdverbialContract(contract);
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "preterit-agentive-adverbial-continuation",
            targetTense: resolvedTense,
            sourceUnit: "preterit-agentive",
            sourceVariantId: String(index),
            targetVariantId: [contract.matrix?.id || "", contract.objectPrefix || "", contract.adverbialVerbInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-preterit-agentive-adverbial-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createPreteritAgentiveAdverbialButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const renderPatientivoNominalCompoundContinuation = ({
        value,
        evaluation,
        patientivoSource = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || patientivoSource === "tronco-verbal" || typeof targetObject.buildPatientivoNominalCompoundContinuationContract !== "function") {
          return false;
        }
        const patientivoSurface = resolvePatientivoSurfaceFromEvaluation(evaluation);
        if (!patientivoSurface) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getPatientivoNominalCompoundMatrixInventory === "function" ? targetObject.getPatientivoNominalCompoundMatrixInventory() : [{
          id: "cal-li",
          nawatRoot: "kal",
          nounClass: "zero",
          animacy: "inanimate"
        }];
        const contracts = matrixInventory.map(matrixSpec => targetObject.buildPatientivoNominalCompoundContinuationContract({
          patientivoSurface,
          sourceSurface: "",
          patientivoSource,
          sourceTenseValue: getPatientivoBlockSourceTenseValue(patientivoSource),
          sourceCombinedMode: getPatientivoBlockSourceCombinedMode(patientivoSource),
          sourceFormulaSlots,
          sourceFormulaEcho,
          patientivoNominalSuffix: activePatientivoNominalSuffix,
          matrixRoot: matrixSpec.nawatRoot || "kal"
        })).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyNominalCompoundContinuationContract = contract => {
          if (typeof targetObject.applyPatientivoNominalCompoundToOrdinaryNncEntry === "function") {
            targetObject.applyPatientivoNominalCompoundToOrdinaryNncEntry({
              incorporatedRoot: contract.incorporatedRoot,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              nounClass: contract.matrix?.nounClass || "zero",
              animacy: contract.matrix?.animacy || "inanimate",
              compoundStem: contract.compoundStem,
              ordinaryNncInput: contract.ordinaryNncInput,
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createNominalCompoundContinuationButton = (contract, continuationIdentityKey = "") => {
          const incorporatedRoot = contract.incorporatedRoot;
          const matrixRoot = contract.matrixRoot;
          const ordinaryNncInput = contract.ordinaryNncInput;
          const previewSurface = getNominalCompoundPreviewSurface({
            ordinaryNncRequest: contract.ordinaryNncRequest
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
          continueButton.dataset.patientivoNominalCompoundContinuation = "true";
          continueButton.dataset.ordinaryNncInput = ordinaryNncInput;
          continueButton.dataset.nominalCompoundStem = contract.compoundStem;
          continueButton.dataset.nominalCompoundMatrixRoot = matrixRoot;
          continueButton.dataset.nominalCompoundMatrixId = contract.matrix?.id || "";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = previewSurface ? `→ ${previewSurface}` : `S→ ${ordinaryNncInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida patientiva: ${patientivoSurface}`, `raíz incorporada: ${incorporatedRoot}`, `matriz nominal: ${matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 39.6: ${contract.matrix.classicalMatrix}` : "", `S: ${ordinaryNncInput}`, previewSurface ? `salida S: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyNominalCompoundContinuationContract(contract);
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "patientivo-nominal-compound-continuation",
            targetTense: resolvedTense,
            sourceUnit: patientivoSource || "patientivo",
            sourceVariantId: String(index),
            targetVariantId: [contract.matrix?.id || "", contract.ordinaryNncInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-patientivo-nominal-compound-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createNominalCompoundContinuationButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const getAdjectivalNncFormulaSlotsForContinuation = (result = null) => {
        const formulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(result);
        return formulaSlots && typeof formulaSlots === "object" ? formulaSlots : null;
      };
      const getAdjectivalNncFormulaEchoForContinuation = (result = null, formulaSlots = null) => {
        return getFunctionUseContinuationFormulaEchoFromResult(result, formulaSlots);
      };
      const isAndrews41ReduplicativeAdjectivalSource = (result = null) => {
        const source = result && typeof result === "object" ? result : {};
        const functionFrame = source.adjectivalNncFunctionFrame || source.rootPlusYaAdjectivalNncFrame || {};
        const outputKind = String(source.outputKind || functionFrame.outputKind || "").trim();
        return ["adjectival-nnc-root-plus-ya", "adjectival-nnc-patientive-function", "adjectival-nnc-nominalized-vnc-function"].includes(outputKind);
      };
      const renderCompoundSourceAdjectivalFunctionContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || typeof targetObject.buildCompoundSourceAdjectivalNncFunctionOutput !== "function" || typeof targetObject.buildCompoundSourceAdjectivalNncOperationFrame !== "function" || typeof targetObject.applyAdjectivalNncFunctionToVerbEntry !== "function") {
          return false;
        }
        const sourceResult = evaluation?.result || null;
        const compoundSourceFrame = sourceResult?.adjectivalCompoundSourceFrame || null;
        const sourceCompoundFrame = compoundSourceFrame?.sourceCompoundFrame || sourceResult?.compoundFrame || null;
        if (!compoundSourceFrame || !sourceCompoundFrame) {
          return false;
        }
        const sourceFormulaSlots = compoundSourceFrame.sourceFormulaSlots || getAdjectivalNncFormulaSlotsForContinuation(sourceResult);
        const sourceFormulaEcho = getAdjectivalNncFormulaEchoForContinuation(sourceResult, sourceFormulaSlots);
        const nominalizedVncKind = compoundSourceFrame.nominalizationKind || "adjectival-surface";
        const forms = getConjugationSurfaceForms(sourceResult).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index);
        if (!forms.length) {
          return false;
        }
        const contracts = forms.map((form, index) => {
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(sourceResult, index);
          const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(sourceResult, sourceSelectedVariant, {
            role: "source",
            unit: "NNC"
          });
          if (!sourceSelectedVariant || !sourceContinuationFrame) {
            return null;
          }
          const operationFrame = targetObject.buildCompoundSourceAdjectivalNncOperationFrame({
            sourceContinuationFrame,
            sourceCompoundFrame,
            nominalizationKind: nominalizedVncKind,
            role: "predicate-surface"
          });
          const targetContinuationFrame = {
            ...sourceContinuationFrame,
            role: "target",
            operationFrame,
            formulaRecord: {
              ...sourceContinuationFrame.formulaRecord,
              operationFrames: [...(Array.isArray(sourceContinuationFrame.formulaRecord?.operationFrames) ? sourceContinuationFrame.formulaRecord.operationFrames : []), operationFrame]
            }
          };
          return targetObject.buildCompoundSourceAdjectivalNncFunctionOutput({
            compoundSourceSurface: form,
            sourceCompoundFrame,
            nominalizationKind: nominalizedVncKind,
            formulaSlots: sourceFormulaSlots,
            formulaEcho: sourceFormulaEcho,
            sourceContinuationFrame,
            targetContinuationFrame,
            operationFrame,
            requireStructuredContinuation: true
          });
        }).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const createCompoundSourceAdjectivalButton = (contract, targetSurface, sourceSurface, continuationIdentityKey = "", {
          sourceSelectedVariant = null,
          targetSelectedVariant = null
        } = {}) => {
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-adjetivo", "calc-guidance__chip--compound-source-adjectival-function"].join(" ");
          continueButton.dataset.compoundSourceAdjectivalFunctionContinuation = "true";
          continueButton.dataset.targetSurface = targetSurface;
          continueButton.dataset.sourceSurface = sourceSurface;
          continueButton.dataset.sourceFormulaEcho = sourceFormulaEcho;
          continueButton.dataset.sourceCompoundMatrix = sourceCompoundFrame?.matrix?.stem || "";
          if (sourceSelectedVariant?.variantId) {
            continueButton.dataset.sourceSelectedVariantId = sourceSelectedVariant.variantId;
          }
          if (targetSelectedVariant?.variantId) {
            continueButton.dataset.targetSelectedVariantId = targetSelectedVariant.variantId;
          }
          if (continuationIdentityKey) {
            continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
            continueButton.dataset.continuationIdentitySource = "route-contract";
          } else {
            applyGeneratedOutputContinuationIdentityDataset(continueButton, contract, {
              namespace: "compound-source-adjectival-function-continuation"
            });
          }
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetSurface}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = "Adj comp";
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`#3 salida compuesta: ${sourceSurface}`, "Andrews 41.2: cláusula nominal adjetival desde verbo compuesto con incrustado nominal", sourceCompoundFrame?.matrix?.stem ? `matriz: ${sourceCompoundFrame.matrix.stem}` : "", sourceFormulaEcho ? `${ANDREWS_RENDERING_TERMS.nncFormula}: ${sourceFormulaEcho}` : "", "conserva la superficie generada"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            targetObject.applyAdjectivalNncFunctionToVerbEntry({
              surface: targetSurface,
              formation: "compound-source-adjectival",
              formulaEcho: sourceFormulaEcho,
              sourceFormulaSlots,
              sourceFormulaEcho,
              sourceCompoundFrame,
              nominalizedVncKind,
              grammarFrame: contract.grammarFrame || contract.frames || null,
              sourceSelectedVariant,
              targetSelectedVariant,
              sourceContinuationFrame: contract.sourceContinuationFrame || null,
              targetContinuationFrame: contract.targetContinuationFrame || null,
              operationFrame: contract.operationFrame || null,
              requireCanonicalFormulaRecords: true
            });
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const targetSurface = getPrimaryConjugationSurface(contract);
          const sourceSurface = forms[index] || forms[0] || "";
          if (!targetSurface || !sourceSurface) {
            return;
          }
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(sourceResult, index);
          const targetSelectedVariant = getGeneratedOutputSelectedRealizationVariant(contract, 0);
          const continuationIdentityKey = getGeneratedOutputContinuationIdentityKey(contract, {
            namespace: "compound-source-adjectival-function-continuation",
            sourceVariantId: sourceSelectedVariant?.variantId || String(index),
            targetVariantId: targetSelectedVariant?.variantId || ""
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-compound-source-adjectival-function-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createCompoundSourceAdjectivalButton(contract, targetSurface, sourceSurface, continuationIdentityKey, {
              sourceSelectedVariant,
              targetSelectedVariant
            }));
          }
        });
        return true;
      };
      const renderDenominalCompoundAdjectivalFunctionContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || typeof targetObject.buildDenominalCompoundAdjectivalNncFunctionOutput !== "function" || typeof targetObject.buildDenominalCompoundAdjectivalNncOperationFrame !== "function" || typeof targetObject.applyAdjectivalNncFunctionToVerbEntry !== "function") {
          return false;
        }
        const sourceResult = evaluation?.result || null;
        const denominalCompoundFrame = sourceResult?.denominalCompoundSourceFrame || sourceResult?.rootPlusYaAdjectivalNncFrame?.denominalCompoundSourceFrame || null;
        if (!denominalCompoundFrame) {
          return false;
        }
        const sourceFormulaSlots = sourceResult?.rootPlusYaAdjectivalNncFrame?.sourceFormulaSlots || getAdjectivalNncFormulaSlotsForContinuation(sourceResult);
        const sourceFormulaEcho = getAdjectivalNncFormulaEchoForContinuation(sourceResult, sourceFormulaSlots);
        const forms = getConjugationSurfaceForms(sourceResult).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index);
        if (!forms.length) {
          return false;
        }
        const contracts = forms.map((form, index) => {
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(sourceResult, index);
          const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(sourceResult, sourceSelectedVariant, {
            role: "source",
            unit: "NNC"
          });
          if (!sourceSelectedVariant || !sourceContinuationFrame) {
            return null;
          }
          const operationFrame = targetObject.buildDenominalCompoundAdjectivalNncOperationFrame({
            sourceContinuationFrame,
            sourceDenominalCompoundFrame: denominalCompoundFrame,
            role: "predicate-surface"
          });
          const targetContinuationFrame = {
            ...sourceContinuationFrame,
            role: "target",
            operationFrame,
            formulaRecord: {
              ...sourceContinuationFrame.formulaRecord,
              operationFrames: [...(Array.isArray(sourceContinuationFrame.formulaRecord?.operationFrames) ? sourceContinuationFrame.formulaRecord.operationFrames : []), operationFrame]
            }
          };
          return targetObject.buildDenominalCompoundAdjectivalNncFunctionOutput({
            denominalCompoundSurface: form,
            sourceDenominalCompoundFrame: denominalCompoundFrame,
            formulaSlots: sourceFormulaSlots,
            formulaEcho: sourceFormulaEcho,
            sourceContinuationFrame,
            targetContinuationFrame,
            operationFrame,
            requireStructuredContinuation: true
          });
        }).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const createDenominalCompoundAdjectivalButton = (contract, targetSurface, sourceSurface, continuationIdentityKey = "", {
          sourceSelectedVariant = null,
          targetSelectedVariant = null
        } = {}) => {
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-adjetivo", "calc-guidance__chip--denominal-compound-adjectival-function"].join(" ");
          continueButton.dataset.denominalCompoundAdjectivalFunctionContinuation = "true";
          continueButton.dataset.targetSurface = targetSurface;
          continueButton.dataset.sourceSurface = sourceSurface;
          continueButton.dataset.sourceFormulaEcho = sourceFormulaEcho;
          continueButton.dataset.sourceCompoundMatrix = denominalCompoundFrame?.matrix?.stem || "";
          if (sourceSelectedVariant?.variantId) {
            continueButton.dataset.sourceSelectedVariantId = sourceSelectedVariant.variantId;
          }
          if (targetSelectedVariant?.variantId) {
            continueButton.dataset.targetSelectedVariantId = targetSelectedVariant.variantId;
          }
          if (continuationIdentityKey) {
            continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
            continueButton.dataset.continuationIdentitySource = "route-contract";
          } else {
            applyGeneratedOutputContinuationIdentityDataset(continueButton, contract, {
              namespace: "denominal-compound-adjectival-function-continuation"
            });
          }
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetSurface}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = "Adj denom";
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`#3 salida denominal: ${sourceSurface}`, "Andrews 41.3: cláusula nominal adjetival desde verbo denominal ti de sustantivo compuesto", denominalCompoundFrame?.matrix?.stem ? `matriz nominal: ${denominalCompoundFrame.matrix.stem}` : "", sourceFormulaEcho ? `${ANDREWS_RENDERING_TERMS.nncFormula}: ${sourceFormulaEcho}` : "", "conserva la superficie generada"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            targetObject.applyAdjectivalNncFunctionToVerbEntry({
              surface: targetSurface,
              formation: "denominal-compound-adjectival",
              formulaEcho: sourceFormulaEcho,
              sourceFormulaSlots,
              sourceFormulaEcho,
              sourceDenominalCompoundFrame: denominalCompoundFrame,
              nominalizedVncKind: "preterit-agentive",
              grammarFrame: contract.grammarFrame || contract.frames || null,
              sourceSelectedVariant,
              targetSelectedVariant,
              sourceContinuationFrame: contract.sourceContinuationFrame || null,
              targetContinuationFrame: contract.targetContinuationFrame || null,
              operationFrame: contract.operationFrame || null,
              requireCanonicalFormulaRecords: true
            });
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const targetSurface = getPrimaryConjugationSurface(contract);
          const sourceSurface = forms[index] || forms[0] || "";
          if (!targetSurface || !sourceSurface) {
            return;
          }
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(sourceResult, index);
          const targetSelectedVariant = getGeneratedOutputSelectedRealizationVariant(contract, 0);
          const continuationIdentityKey = getGeneratedOutputContinuationIdentityKey(contract, {
            namespace: "denominal-compound-adjectival-function-continuation",
            sourceVariantId: sourceSelectedVariant?.variantId || String(index),
            targetVariantId: targetSelectedVariant?.variantId || ""
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-denominal-compound-adjectival-function-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createDenominalCompoundAdjectivalButton(contract, targetSurface, sourceSurface, continuationIdentityKey, {
              sourceSelectedVariant,
              targetSelectedVariant
            }));
          }
        });
        return true;
      };
      const renderIntensifiedAdjectivalFunctionContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || typeof targetObject.buildIntensifiedAdjectivalNncOutput !== "function" || typeof targetObject.buildIntensifiedAdjectivalNncOperationFrame !== "function" || typeof targetObject.applyAdjectivalNncFunctionToVerbEntry !== "function") {
          return false;
        }
        const sourceResult = evaluation?.result || null;
        if (!isAndrews41ReduplicativeAdjectivalSource(sourceResult)) {
          return false;
        }
        const sourceFormulaSlots = getAdjectivalNncFormulaSlotsForContinuation(sourceResult);
        if (!sourceFormulaSlots?.predicateStem || !sourceFormulaSlots?.num1Num2) {
          return false;
        }
        const sourceFormulaEcho = getAdjectivalNncFormulaEchoForContinuation(sourceResult, sourceFormulaSlots);
        const forms = getConjugationSurfaceForms(sourceResult).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index);
        if (!forms.length) {
          return false;
        }
        const contractEntries = forms.map((form, index) => {
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(sourceResult, index);
          const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(sourceResult, sourceSelectedVariant, {
            role: "source",
            unit: "NNC"
          });
          if (!sourceSelectedVariant || !sourceContinuationFrame) {
            return null;
          }
          const operationFrame = targetObject.buildIntensifiedAdjectivalNncOperationFrame({
            sourceContinuationFrame,
            role: "predicate-surface"
          });
          const contract = targetObject.buildIntensifiedAdjectivalNncOutput({
            sourceSurface: form,
            sourceFormulaSlots,
            sourceFormulaEcho,
            sourceContinuationFrame,
            operationFrame
          });
          if (!contract?.supported) {
            return null;
          }
          const targetSelectedVariant = getGeneratedOutputSelectedRealizationVariant(contract, 0);
          const targetContinuationFrame = buildGeneratedOutputTypedContinuationFrame(contract, targetSelectedVariant, {
            role: "target",
            unit: "NNC"
          });
          if (!targetSelectedVariant || !targetContinuationFrame) {
            return null;
          }
          return {
            contract,
            sourceContinuationFrame,
            targetContinuationFrame: {
              ...targetContinuationFrame,
              operationFrame,
              sourceFrame: sourceContinuationFrame
            },
            operationFrame,
            sourceSelectedVariant,
            targetSelectedVariant
          };
        }).filter(Boolean);
        const contracts = contractEntries.map(entry => entry.contract);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const createIntensifiedAdjectivalButton = (contract, targetSurface, sourceSurface, continuationIdentityKey = "", {
          sourceSelectedVariant = null,
          targetSelectedVariant = null
        } = {}) => {
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-adjetivo", "calc-guidance__chip--intensified-adjectival-function"].join(" ");
          continueButton.dataset.intensifiedAdjectivalFunctionContinuation = "true";
          continueButton.dataset.targetSurface = targetSurface;
          continueButton.dataset.sourceSurface = sourceSurface;
          continueButton.dataset.sourceFormulaEcho = sourceFormulaEcho;
          continueButton.dataset.intensifiedStem = contract.adjectivalNncFunctionFrame?.intensifiedStem || "";
          if (sourceSelectedVariant?.variantId) {
            continueButton.dataset.sourceSelectedVariantId = sourceSelectedVariant.variantId;
          }
          if (targetSelectedVariant?.variantId) {
            continueButton.dataset.targetSelectedVariantId = targetSelectedVariant.variantId;
          }
          if (continuationIdentityKey) {
            continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
            continueButton.dataset.continuationIdentitySource = "route-contract";
          } else {
            applyGeneratedOutputContinuationIdentityDataset(continueButton, contract, {
              namespace: "intensified-adjectival-function-continuation"
            });
          }
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetSurface}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = "Intensifica";
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`#3 salida adjetival: ${sourceSurface}`, "Andrews 41.1: intensificación adjetival por reduplicación", sourceFormulaEcho ? `Fórmula fuente: ${formatVisibleAndrewsFormula(sourceFormulaEcho)}` : "", contract.formulaEcho ? `Fórmula intensificada: ${formatVisibleAndrewsFormula(contract.formulaEcho)}` : "", "no usa el frecuentativo lección 27"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            targetObject.applyAdjectivalNncFunctionToVerbEntry({
              surface: targetSurface,
              formation: "intensified-adjectival",
              formulaEcho: sourceFormulaEcho,
              sourceFormulaSlots,
              sourceFormulaEcho,
              grammarFrame: contract.grammarFrame || contract.frames || null,
              sourceSelectedVariant,
              targetSelectedVariant,
              sourceContinuationFrame: contract.sourceContinuationFrame || null,
              targetContinuationFrame: contract.targetContinuationFrame || null,
              operationFrame: contract.operationFrame || null,
              requireCanonicalFormulaRecords: true
            });
          });
          return continueButton;
        };
        contractEntries.forEach((entry, index) => {
          const contract = entry.contract;
          const targetSurface = getPrimaryConjugationSurface(contract);
          const sourceSurface = forms[index] || forms[0] || "";
          if (!targetSurface || !sourceSurface) {
            return;
          }
          const sourceSelectedVariant = entry.sourceSelectedVariant;
          const targetSelectedVariant = entry.targetSelectedVariant;
          const continuationIdentityKey = getGeneratedOutputContinuationIdentityKey(contract, {
            namespace: "intensified-adjectival-function-continuation",
            sourceVariantId: sourceSelectedVariant?.variantId || String(index),
            targetVariantId: targetSelectedVariant?.variantId || ""
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-intensified-adjectival-function-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            const contractForClick = {
              ...contract,
              sourceContinuationFrame: entry.sourceContinuationFrame,
              targetContinuationFrame: entry.targetContinuationFrame,
              operationFrame: entry.operationFrame
            };
            appendContinuationAction(actions, createIntensifiedAdjectivalButton(contractForClick, targetSurface, sourceSurface, continuationIdentityKey, {
              sourceSelectedVariant,
              targetSelectedVariant
            }));
          }
        });
        return true;
      };
      const renderPatientivoAdjectivalFunctionContinuation = ({
        value,
        evaluation,
        patientivoSource = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || typeof targetObject.buildPatientivoAdjectivalNncFunctionOutput !== "function" || typeof targetObject.buildPatientivoAdjectivalNncOperationFrame !== "function") {
          return false;
        }
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        if (!forms.length) {
          return false;
        }
        const contracts = forms.map((form, index) => {
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(evaluation?.result, index);
          const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(evaluation?.result, sourceSelectedVariant, {
            role: "source",
            unit: "NNC"
          });
          if (!sourceSelectedVariant || !sourceContinuationFrame) {
            return null;
          }
          const operationFrame = targetObject.buildPatientivoAdjectivalNncOperationFrame({
            sourceContinuationFrame,
            patientivoSource,
            role: "predicate-surface"
          });
          const targetContinuationFrame = {
            ...sourceContinuationFrame,
            role: "target",
            operationFrame,
            formulaRecord: {
              ...sourceContinuationFrame.formulaRecord,
              operationFrames: [...(Array.isArray(sourceContinuationFrame.formulaRecord?.operationFrames) ? sourceContinuationFrame.formulaRecord.operationFrames : []), operationFrame]
            }
          };
          return targetObject.buildPatientivoAdjectivalNncFunctionOutput({
            patientivoSurface: form,
            patientivoSource,
            nominalizationProfile: evaluation?.result?.nominalizationProfile || null,
            formulaSlots: evaluation?.result?.nuclearClauseShell?.formulaSlots || null,
            formulaEcho: evaluation?.result?.nuclearClauseShell?.formulaEcho || "",
            sourceContinuationFrame,
            targetContinuationFrame,
            operationFrame,
            requireStructuredContinuation: true
          });
        }).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const createAdjectivalFunctionButton = (contract, targetSurface, continuationIdentityKey = "", {
          sourceSelectedVariant = null,
          targetSelectedVariant = null
        } = {}) => {
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-adjetivo"].join(" ");
          continueButton.dataset.patientivoAdjectivalFunctionContinuation = "true";
          continueButton.dataset.targetSurface = targetSurface;
          continueButton.dataset.adjectivalFunction = contract.adjectivalNncFunctionFrame?.functionKind || "";
          if (sourceSelectedVariant?.variantId) {
            continueButton.dataset.sourceSelectedVariantId = sourceSelectedVariant.variantId;
          }
          if (targetSelectedVariant?.variantId) {
            continueButton.dataset.targetSelectedVariantId = targetSelectedVariant.variantId;
          }
          if (continuationIdentityKey) {
            continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
            continueButton.dataset.continuationIdentitySource = "route-contract";
          } else {
            applyGeneratedOutputContinuationIdentityDataset(continueButton, contract, {
              namespace: "patientivo-adjectival-function-continuation"
            });
          }
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetSurface}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = "Adjetival nominal";
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`#3 salida patientiva: ${targetSurface}`, "Andrews 40.4: cláusula nominal patientiva en función adjetival", contract.formulaEcho ? `${ANDREWS_RENDERING_TERMS.nncFormula}: ${contract.formulaEcho}` : "", contract.adjectivalNncFunctionFrame?.patientivoSource ? `fuente patientiva: ${contract.adjectivalNncFunctionFrame.patientivoSource}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            if (typeof targetObject.applyAdjectivalNncFunctionToVerbEntry === "function") {
              targetObject.applyAdjectivalNncFunctionToVerbEntry({
                surface: targetSurface,
                formation: "patientive-adjectival",
                formulaEcho: contract.formulaEcho || "",
                patientivoSource: contract.adjectivalNncFunctionFrame?.patientivoSource || "",
                grammarFrame: contract.grammarFrame || contract.frames || null,
                sourceSelectedVariant,
                targetSelectedVariant,
                sourceContinuationFrame: contract.sourceContinuationFrame || null,
                targetContinuationFrame: contract.targetContinuationFrame || null,
                operationFrame: contract.operationFrame || null,
                requireCanonicalFormulaRecords: true
              });
            }
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const targetSurface = getPrimaryConjugationSurface(contract);
          if (!targetSurface) {
            return;
          }
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(evaluation?.result, index);
          const targetSelectedVariant = getGeneratedOutputSelectedRealizationVariant(contract, 0);
          const continuationIdentityKey = getGeneratedOutputContinuationIdentityKey(contract, {
            namespace: "patientivo-adjectival-function-continuation",
            sourceVariantId: sourceSelectedVariant?.variantId || String(index),
            targetVariantId: targetSelectedVariant?.variantId || ""
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-patientivo-adjectival-function-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createAdjectivalFunctionButton(contract, targetSurface, continuationIdentityKey, {
              sourceSelectedVariant,
              targetSelectedVariant
            }));
          }
        });
        return true;
      };
      const renderNominalizedVncAdjectivalFunctionContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || typeof targetObject.buildNominalizedVncAdjectivalNncFunctionOutput !== "function" || typeof targetObject.buildNominalizedVncAdjectivalNncOperationFrame !== "function") {
          return false;
        }
        const nominalizationProfile = evaluation?.result?.nominalizationProfile || null;
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        if (!forms.length || !nominalizationProfile) {
          return false;
        }
        const predicateState = nominalizationProfile?.predicateState?.value || "absolutive";
        const contracts = forms.map((form, index) => {
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(evaluation?.result, index);
          const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(evaluation?.result, sourceSelectedVariant, {
            role: "source",
            unit: "NNC"
          });
          if (!sourceSelectedVariant || !sourceContinuationFrame) {
            return null;
          }
          const operationFrame = targetObject.buildNominalizedVncAdjectivalNncOperationFrame({
            sourceContinuationFrame,
            nominalizationProfile,
            role: "predicate-surface"
          });
          const targetContinuationFrame = {
            ...sourceContinuationFrame,
            role: "target",
            operationFrame,
            formulaRecord: {
              ...sourceContinuationFrame.formulaRecord,
              operationFrames: [...(Array.isArray(sourceContinuationFrame.formulaRecord?.operationFrames) ? sourceContinuationFrame.formulaRecord.operationFrames : []), operationFrame]
            }
          };
          return targetObject.buildNominalizedVncAdjectivalNncFunctionOutput({
            nominalizedSurface: form,
            state: predicateState,
            nominalizationProfile,
            formulaSlots: evaluation?.result?.nuclearClauseShell?.formulaSlots || null,
            formulaEcho: evaluation?.result?.nuclearClauseShell?.formulaEcho || "",
            sourceContinuationFrame,
            targetContinuationFrame,
            operationFrame,
            requireStructuredContinuation: true
          });
        }).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const createNominalizedVncAdjectivalButton = (contract, targetSurface, continuationIdentityKey = "", {
          sourceSelectedVariant = null,
          targetSelectedVariant = null
        } = {}) => {
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-adjetivo"].join(" ");
          continueButton.dataset.nominalizedVncAdjectivalFunctionContinuation = "true";
          continueButton.dataset.targetSurface = targetSurface;
          continueButton.dataset.nominalizedVncKind = contract.adjectivalNncFunctionFrame?.nominalizationKind || "";
          if (sourceSelectedVariant?.variantId) {
            continueButton.dataset.sourceSelectedVariantId = sourceSelectedVariant.variantId;
          }
          if (targetSelectedVariant?.variantId) {
            continueButton.dataset.targetSelectedVariantId = targetSelectedVariant.variantId;
          }
          if (continuationIdentityKey) {
            continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
            continueButton.dataset.continuationIdentitySource = "route-contract";
          } else {
            applyGeneratedOutputContinuationIdentityDataset(continueButton, contract, {
              namespace: "nominalized-vnc-adjectival-function-continuation"
            });
          }
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetSurface}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = "Adjetival nominal";
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`#3 salida nominalizada: ${targetSurface}`, `${contract.adjectivalNncFunctionFrame?.lessonRef}: cláusula nominal nominalizada en función adjetival`, contract.formulaEcho ? `${ANDREWS_RENDERING_TERMS.nncFormula}: ${contract.formulaEcho}` : "", contract.adjectivalNncFunctionFrame?.nominalizationKind ? `nominalización: ${contract.adjectivalNncFunctionFrame.nominalizationKind}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            if (typeof targetObject.applyAdjectivalNncFunctionToVerbEntry === "function") {
              targetObject.applyAdjectivalNncFunctionToVerbEntry({
                surface: targetSurface,
                formation: "nominalized-vnc-adjectival",
                formulaEcho: contract.formulaEcho || "",
                nominalizedVncKind: contract.adjectivalNncFunctionFrame?.nominalizationKind || "",
                grammarFrame: contract.grammarFrame || contract.frames || null,
                sourceSelectedVariant,
                targetSelectedVariant,
                sourceContinuationFrame: contract.sourceContinuationFrame || null,
                targetContinuationFrame: contract.targetContinuationFrame || null,
                operationFrame: contract.operationFrame || null,
                requireCanonicalFormulaRecords: true
              });
            }
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const targetSurface = getPrimaryConjugationSurface(contract);
          if (!targetSurface) {
            return;
          }
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(evaluation?.result, index);
          const targetSelectedVariant = getGeneratedOutputSelectedRealizationVariant(contract, 0);
          const continuationIdentityKey = getGeneratedOutputContinuationIdentityKey(contract, {
            namespace: "nominalized-vnc-adjectival-function-continuation",
            sourceVariantId: sourceSelectedVariant?.variantId || String(index),
            targetVariantId: targetSelectedVariant?.variantId || ""
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-nominalized-vnc-adjectival-function-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createNominalizedVncAdjectivalButton(contract, targetSurface, continuationIdentityKey, {
              sourceSelectedVariant,
              targetSelectedVariant
            }));
          }
        });
        return true;
      };
      const renderPatientivoCompoundEmbedContinuation = ({
        value,
        evaluation,
        patientivoSource = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || patientivoSource === "tronco-verbal" || typeof targetObject.buildPatientivoCompoundEmbedContinuationContract !== "function") {
          return false;
        }
        const patientivoSurface = resolvePatientivoSurfaceFromEvaluation(evaluation);
        if (!patientivoSurface) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getPatientivoCompoundEmbedMatrixInventory === "function" ? targetObject.getPatientivoCompoundEmbedMatrixInventory() : [{
          id: "miqui",
          nawatRoot: "miki",
          label: "die/be affected as"
        }];
        const contracts = matrixInventory.map(matrixSpec => targetObject.buildPatientivoCompoundEmbedContinuationContract({
          patientivoSurface,
          sourceSurface: "",
          patientivoSource,
          sourceTenseValue: getPatientivoBlockSourceTenseValue(patientivoSource),
          sourceCombinedMode: getPatientivoBlockSourceCombinedMode(patientivoSource),
          sourceFormulaSlots,
          sourceFormulaEcho,
          patientivoNominalSuffix: activePatientivoNominalSuffix,
          matrixRoot: matrixSpec.nawatRoot || "miki"
        })).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyCompoundEmbedContinuationContract = contract => {
          if (typeof targetObject.applyPatientivoCompoundEmbedRootsToVerbEntry === "function") {
            targetObject.applyPatientivoCompoundEmbedRootsToVerbEntry({
              incorporatedRoot: contract.incorporatedRoot,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createCompoundEmbedContinuationButton = (contract, continuationIdentityKey = "") => {
          const incorporatedRoot = contract.incorporatedRoot;
          const matrixRoot = contract.matrixRoot;
          const compoundVerbInput = contract.compoundVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: compoundVerbInput
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.patientivoCompoundEmbedContinuation = "true";
          continueButton.dataset.compoundVerb = compoundVerbInput;
          continueButton.dataset.compoundMatrixRoot = matrixRoot;
          continueButton.dataset.compoundMatrixId = contract.matrix?.id || "";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida patientiva: ${patientivoSurface}`, `raíz incorporada: ${incorporatedRoot}`, `raíz matriz: ${matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 39.6: ${contract.matrix.classicalMatrix}` : "", `V: ${compoundVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyCompoundEmbedContinuationContract(contract);
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "patientivo-compound-embed-continuation",
            targetTense: resolvedTense,
            sourceUnit: patientivoSource || "patientivo",
            sourceVariantId: String(index),
            targetVariantId: [contract.matrix?.id || "", contract.compoundVerbInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-patientivo-compound-embed-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createCompoundEmbedContinuationButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const renderPatientivoCharacteristicPropertyEmbedContinuation = ({
        value,
        evaluation,
        possessorPrefix = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "calificativo-instrumentivo" || typeof targetObject.buildPatientivoCharacteristicPropertyEmbedContinuationContract !== "function") {
          return false;
        }
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        if (!forms.length) {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getPatientivoCharacteristicPropertyMatrixInventory === "function" ? targetObject.getPatientivoCharacteristicPropertyMatrixInventory() : [{
          id: "chic-a-hu-a",
          nawatRoot: "chikawa",
          matrixValency: "transitive"
        }];
        const contracts = forms.flatMap(form => matrixInventory.map(matrixSpec => targetObject.buildPatientivoCharacteristicPropertyEmbedContinuationContract({
          characteristicSurface: form,
          sourceSurface: form,
          sourceFormulaSlots,
          sourceFormulaEcho,
          possessorPrefix,
          matrixRoot: matrixSpec.nawatRoot || "chikawa"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyCharacteristicPropertyEmbedContract = contract => {
          if (typeof targetObject.applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry === "function") {
            targetObject.applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry({
              incorporatedRoot: contract.incorporatedRoot,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              objectPrefix: contract.objectPrefix || "ki",
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createCharacteristicPropertyContinuationButton = (contract, continuationIdentityKey = "") => {
          const compoundVerbInput = contract.compoundVerbInput;
          const previewSurface = getCharacteristicPropertyEmbedFinitePreviewSurface({
            compoundVerb: compoundVerbInput,
            objectPrefix: contract.objectPrefix || "ki"
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.patientivoCharacteristicPropertyEmbedContinuation = "true";
          continueButton.dataset.compoundVerb = compoundVerbInput;
          continueButton.dataset.compoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.compoundMatrixId = contract.matrix?.id || "";
          continueButton.dataset.omittedSuffix = contract.omittedSuffix || "";
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida: ${contract.characteristicSurface}`, `raíz incorporada: ${contract.incorporatedRoot}`, `omite: -${contract.omittedSuffix}`, `raíz matriz: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 39.9: ${contract.matrix.classicalMatrix}` : "", `V: ${compoundVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyCharacteristicPropertyEmbedContract(contract);
          });
          return continueButton;
        };
        contracts.forEach((contract, index) => {
          const continuationIdentityKey = getFunctionUseContinuationIdentityKey(evaluation, contract, {
            namespace: "patientivo-characteristic-property-embed-continuation",
            targetTense: resolvedTense,
            sourceUnit: "characteristic-property",
            sourceVariantId: String(index),
            targetVariantId: [contract.matrix?.id || "", contract.objectPrefix || "", contract.compoundVerbInput || ""].filter(Boolean).join(":")
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-patientivo-characteristic-property-embed-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (!alreadyRendered) {
            appendContinuationAction(actions, createCharacteristicPropertyContinuationButton(contract, continuationIdentityKey));
          }
        });
        return true;
      };
      const renderCalificativoInstrumentivoHuaContinuations = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "calificativo-instrumentivo" || typeof targetObject.previewNawatDenominalAndrewsHuaRouteFromCharacteristicPropertyOutput !== "function" || typeof targetObject.activateNawatDenominalAndrewsContractRouteTarget !== "function") {
          return false;
        }
        const preview = targetObject.previewNawatDenominalAndrewsHuaRouteFromCharacteristicPropertyOutput(evaluation?.result);
        const routes = Array.isArray(preview?.routePreview?.routes) ? preview.routePreview.routes.filter(route => route?.finiteGenerationContractAvailable === true) : [];
        if (!routes.length) {
          return false;
        }
        const actions = ensureDenominalAndrewsRouteContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const targetTense = "presente";
        routes.forEach(route => {
          const targetInput = String(route.targetInputValue || route.targetInput || route.targetVerbStem || "").trim();
          if (!targetInput) {
            return;
          }
          const continuationIdentityKey = getDenominalAndrewsRouteContinuationIdentityKey(route, {
            namespace: "denominal-andrews-hua-deverbal-yu-continuation",
            routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
            targetTense
          });
          if (!continuationIdentityKey) {
            return;
          }
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-denominal-andrews-contract-route-continuation]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
          if (alreadyRendered) {
            return;
          }
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo", "calc-guidance__chip--denominal-andrews", "calc-guidance__chip--andrews-rule-executable", "is-source-satisfied", "is-deverbal-yu-source"].join(" ");
          continueButton.dataset.denominalAndrewsContractRouteContinuation = "true";
          continueButton.dataset.huaDeverbalYuContinuation = "true";
          continueButton.dataset.contractId = route.contractId || "";
          continueButton.dataset.routeTemplateId = route.routeTemplateId || "";
          continueButton.dataset.executableRuleId = route.executableRuleId || "";
          continueButton.dataset.targetInput = targetInput;
          continueButton.dataset.targetTense = targetTense;
          continueButton.dataset.continuationIdentityKey = continuationIdentityKey;
          continueButton.dataset.continuationIdentitySource = "route-contract";
          continueButton.dataset.sourceEvidenceSatisfied = "true";
          continueButton.dataset.deverbalYuSourceRequired = "true";
          continueButton.dataset.sourceEvidenceFromCharacteristicProperty = "true";
          continueButton.dataset.notOaFormation = "true";
          applyGrammarFrameRouteDataset(continueButton, route);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${targetInput}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = [`Andrews ${route.range || ""}`, route.targetStemClass ? `Clase ${route.targetStemClass}` : "", "fuente -yu(t)", "no 55.3 o-a", targetTense].filter(Boolean).join(" · ");
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`contrato: ${route.contractId || ""}`, route.executableRuleId ? `regla: ${route.executableRuleId}` : "", "fuente: calificativo-instrumentivo generado", `fuente yu: ${route.sourceStem || ""}`, `sufijo: ${route.classicalSuffixSequence || ""} -> ${route.nawatRuleSuffix || ""}`, route.targetStemClass ? `clase: ${route.targetStemClass}` : "", `entrada verbal: ${targetInput}`, "hua/wa no es la formacion o-a de 55.3", "no crea ficha lexical"].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            setActiveNawatDenominalAndrewsContractRouteRenderContext(route);
            targetObject.activateNawatDenominalAndrewsContractRouteTarget(route, {
              targetTense,
              render: true,
              anchorElement: continueButton
            });
          });
          appendContinuationAction(actions, continueButton);
        });
        return true;
      };
      const renderPatientivoPrelocativeContinuation = ({
        value,
        evaluation,
        selection = {},
        number = "",
        possessorPrefix = "",
        patientivoSource = "",
        sourceTenseValue = "",
        sourceCombinedMode = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || patientivoSource === "tronco-verbal") {
          return false;
        }
        const sourceObjectPrefix = resolvePatientivoOriginSourceObjectPrefix(patientivoSource);
        const sourceSurface = resolvePatientivoSourceSurfaceForContinuation({
          evaluation,
          patientivoSource,
          objectPrefix: sourceObjectPrefix,
          sourceTenseValue,
          sourceCombinedMode
        });
        const patientivoSurface = resolvePatientivoSurfaceFromEvaluation(evaluation);
        if (typeof targetObject.buildPatientivoPrelocativeContinuationContract !== "function") {
          return false;
        }
        const sourceFormulaSlots = getFunctionUseContinuationFormulaSlotsFromResult(evaluation?.result);
        const sourceFormulaEcho = getFunctionUseContinuationFormulaEchoFromResult(evaluation?.result, sourceFormulaSlots);
        const matrixInventory = typeof targetObject.getPatientivoPrelocativeMatrixInventory === "function" ? targetObject.getPatientivoPrelocativeMatrixInventory() : [{
          id: "tla-tlani",
          nawatRoot: "tajtani",
          label: "want/request"
        }];
        const contracts = matrixInventory.map(matrixSpec => targetObject.buildPatientivoPrelocativeContinuationContract({
          patientivoSurface,
          sourceSurface,
          selection,
          possessorPrefix,
          patientivoSource,
          sourceTenseValue,
          sourceCombinedMode,
          sourceFormulaSlots,
          sourceFormulaEcho,
          patientivoNominalSuffix: activePatientivoNominalSuffix,
          matrixRoot: matrixSpec.nawatRoot || "ni"
        })).filter(entry => entry?.supported);
        if (!sourceSurface || !patientivoSurface || !contracts.length) {
          return false;
        }
        const applyPrelocativeContinuationContract = contract => {
          const objectTransfer = contract.objectTransfer;
          const incorporatedRoot = contract.incorporatedRoot;
          const matrixRoot = contract.matrixRoot;
          const routeStore = typeof targetObject.getNawatRouteStateStore === "function" ? targetObject.getNawatRouteStateStore() : null;
          if (routeStore) {
            routeStore.activeNawatLineId = "locative";
            routeStore.__NAWAT_ACTIVE_LINE_ID__ = "locative";
            routeStore.activeNawatLineStationKey = "prelocative";
            routeStore.activeLocativeSourceVerb = verb;
            routeStore.activeLocativeSourceTenseValue = sourceTenseValue;
            routeStore.activeLocativeSourceSurface = sourceSurface;
            routeStore.activeLocativePatientivoSurface = patientivoSurface;
            routeStore.activeLocativeIncorporatedRoot = incorporatedRoot;
            routeStore.activeLocativeMatrixRoot = matrixRoot;
            routeStore.activeLocativePromotedObjectPrefix = objectTransfer.objectPrefix;
            routeStore.activeLocativeSourcePossessorPrefix = possessorPrefix || "";
            routeStore.activeLocativeMatrixSpecId = contract.matrix?.id || "";
          }
          if (typeof targetObject.applyPrelocativeRootsToVerbEntry === "function") {
            targetObject.applyPrelocativeRootsToVerbEntry({
              incorporatedRoot,
              matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              objectPrefix: objectTransfer.objectPrefix,
              possessorPrefix: possessorPrefix || "",
              sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null,
              sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
              ...getFunctionUseContinuationRouteOwnershipOptions(contract)
            });
          }
        };
        const createPrelocativeContinuationButton = contract => {
          const objectTransfer = contract.objectTransfer;
          const incorporatedRoot = contract.incorporatedRoot;
          const matrixRoot = contract.matrixRoot;
          const prelocativeVerbInput = contract.prelocativeVerbInput;
          const previewSurface = getPrelocativeFinitePreviewSurface({
            incorporatedRoot,
            matrixRoot,
            objectPrefix: objectTransfer.objectPrefix,
            prelocativeVerb: prelocativeVerbInput
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.patientivoPrelocativeContinuation = "true";
          continueButton.dataset.prelocativeVerb = prelocativeVerbInput;
          continueButton.dataset.prelocativeObjectPrefix = objectTransfer.objectPrefix;
          continueButton.dataset.prelocativeMatrixRoot = matrixRoot;
          continueButton.dataset.prelocativeMatrixId = contract.matrix?.id || "";
          applyGrammarFrameRouteDataset(continueButton, contract);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || prelocativeVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida patientiva: ${patientivoSurface}`, `raíz incorporada: ${incorporatedRoot}`, `raíz matriz: ${matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 39.8: ${contract.matrix.classicalMatrix}` : "", `V: ${prelocativeVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : "", objectTransfer.label].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPrelocativeContinuationContract(contract);
          });
          return continueButton;
        };
        const surfaceDisplay = getConjugationDisplaySurface(evaluation?.result);
        value.replaceChildren();
        value.classList.add("conjugation-value--conversion-picker");
        const surfaceText = targetObject.document.createElement("span");
        surfaceText.className = "conjugation-conversion-surface";
        appendConjugationConversionSurfaceLines(surfaceText, surfaceDisplay, evaluation?.result);
        const continuationActions = createConjugationConversionActionsContainer();
        contracts.forEach(contract => {
          appendContinuationAction(continuationActions, createPrelocativeContinuationButton(contract));
        });
        value.append(surfaceText, continuationActions);
        applyConjugationConversionColumnLayout(value, surfaceText, continuationActions);
        return true;
      };
      const updatePatientivoBlockDestination = (entry = {}) => {
        if (!entry.destinationSlot) {
          return;
        }
        entry.destinationSlot.replaceChildren();
        entry.destinationSlot.hidden = true;
        entry.block?.classList.remove("tense-block--has-destination-menu");
      };
      const updateNounBlockPalettes = () => {
        const signature = resolveNounBlockPaletteSignature();
        blocks.forEach(entry => {
          targetObject.applyTenseBlockComboPalette(entry.block, signature);
        });
      };
      const subjectlessSelection = (() => {
        const thirdSingularSelection = targetObject.getSubjectPersonSelections().find(({
          group,
          selection,
          number
        }) => number === "singular" && group?.id === "third" && selection?.subjectPrefix === "" && selection?.subjectSuffix === "");
        if (thirdSingularSelection) {
          return Object.freeze({
            group: thirdSingularSelection.group || null,
            selection: Object.freeze({
              ...thirdSingularSelection.selection
            }),
            number: thirdSingularSelection.number || ""
          });
        }
        return Object.freeze({
          group: null,
          selection: Object.freeze({
            subjectPrefix: "",
            subjectSuffix: ""
          }),
          number: ""
        });
      })();
      const TOGGLE_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--viable", "object-toggle-button--masked", "object-toggle-button--impossible"];
      const TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--selected-viable", "object-toggle-button--selected-masked", "object-toggle-button--selected-impossible"];
      const clearToggleAvailabilityClasses = button => {
        if (!button) {
          return;
        }
        TOGGLE_AVAILABILITY_CLASS_NAMES.forEach(className => {
          button.classList.remove(className);
        });
        TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES.forEach(className => {
          button.classList.remove(className);
        });
      };
      const applyToggleAvailabilityClass = (button, state) => {
        clearToggleAvailabilityClasses(button);
        if (!button || !state) {
          return;
        }
        if (state === "viable") {
          button.classList.add("object-toggle-button--viable");
          return;
        }
        if (state === "masked") {
          button.classList.add("object-toggle-button--masked");
          return;
        }
        if (state === "impossible") {
          button.classList.add("object-toggle-button--impossible");
        }
      };
      const applySelectedAvailabilityClass = (button, state, isSelected) => {
        if (!button || !isSelected) {
          return;
        }
        if (state === "viable") {
          button.classList.add("object-toggle-button--selected-viable");
          return;
        }
        if (state === "masked") {
          button.classList.add("object-toggle-button--selected-masked");
          return;
        }
        if (state === "impossible") {
          button.classList.add("object-toggle-button--selected-impossible");
        }
      };
      const getSubjectSelectionsForId = (subjectId = activeSubject) => {
        if (isSubjectlessTense) {
          return [subjectlessSelection];
        }
        let selections = targetObject.getNominalSubjectSelectionEntries({
          mode: targetObject.getActiveTenseMode(),
          tenseValue: resolvedTense
        });
        if (subjectId !== targetObject.SUBJECT_TOGGLE_ALL) {
          selections = selections.filter(entry => entry.toggleId === subjectId);
        }
        if (showNonanimateOnly) {
          selections = selections.filter(({
            selection
          }) => targetObject.isNonanimatePers1Pers2(selection.subjectPrefix, selection.subjectSuffix));
        }
        return selections;
      };
      const resolveInstrumentivoHeaderSourceMeta = () => {
        const possessorSelections = getPossessorSelectionsForId(activePossessor);
        const hasPossessed = possessorSelections.some(value => Boolean(value));
        const hasUnpossessed = possessorSelections.some(value => !value);
        const habitualLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS["presente-habitual"], isNawat, "presente habitual");
        const imperfectoLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS.imperfecto, isNawat, "pretérito imperfecto");
        if (hasPossessed && !hasUnpossessed) {
          return {
            sourceMode: targetObject.COMBINED_MODE.active,
            sourceTenseLabel: imperfectoLabel
          };
        }
        if (hasUnpossessed && !hasPossessed) {
          return {
            sourceMode: targetObject.COMBINED_MODE.nonactive,
            sourceTenseLabel: habitualLabel
          };
        }
        const activeLabel = targetObject.getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-active"], isNawat, "activo");
        const nonactiveLabel = targetObject.getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-nonactive"], isNawat, "no activo");
        return {
          sourceMode: `${activeLabel} / ${nonactiveLabel}`,
          sourceTenseLabel: `${habitualLabel} / ${imperfectoLabel}`
        };
      };
      const resolveNounBlockSourceMeta = (entry = {}) => {
        const resolvedSourceMode = entry.sourceMode ?? defaultNominalSourceMode;
        const labelSlotSummary = targetObject.getNounObjectSlotSummary(verbMeta, resolvedTense, {
          combinedMode: resolvedSourceMode
        });
        const labelValency = Number.isFinite(labelSlotSummary?.availableObjectSlots) ? Math.max(1, Number(labelSlotSummary.availableObjectSlots) + 1) : null;
        if (resolvedTense === "instrumentivo") {
          return {
            ...resolveInstrumentivoHeaderSourceMeta(),
            labelValency
          };
        }
        if (isPreteritAgentiveLocativeNnc) {
          return {
            sourceMode: "",
            sourceTenseLabel: "",
            labelValency: null
          };
        }
        return {
          sourceMode: resolvedSourceMode,
          sourceTenseLabel: entry.sourceTenseLabel || "",
          labelValency
        };
      };
      const resolveNounBlockTitleText = (entry = {}) => {
        const meta = resolveNounBlockSourceMeta(entry);
        if (resolvedTense === "patientivo") {
          const valencyPart = Number.isFinite(meta.labelValency) ? ` · valencia total: ${meta.labelValency}` : "";
          return `${entry.label || ""}${valencyPart}`;
        }
        if (isPreteritAgentiveLocativeNnc) {
          return entry.label || "";
        }
        return targetObject.buildNominalSourceTaggedLabel(entry.label || "", meta.sourceMode, isNawat, {
          sourceTenseLabel: meta.sourceTenseLabel,
          labelValency: meta.labelValency
        });
      };
      const refreshNounBlockTitles = () => {
        blocks.forEach(entry => {
          if (!entry.titleLabel) {
            return;
          }
          entry.titleLabel.textContent = resolveNounBlockTitleText(entry);
        });
      };
      const refreshNounBlockSourcePlacement = () => {
        if (!sourceColumns || resolvedTense !== "instrumentivo") {
          return;
        }
        blocks.forEach(entry => {
          const sourceMode = resolveInstrumentivoSourcePlacement(activePossessor);
          entry.sourceMode = sourceMode;
          sourceColumns.appendBlock(entry.block, sourceMode);
        });
        sourceColumns.finalize();
      };
      const buildNounObjectSlotModelsForState = (slotOverrides = {}) => mutableNounObjectSlots.map(slotState => {
        const hasOverride = Object.prototype.hasOwnProperty.call(slotOverrides, slotState.id);
        const overrideId = hasOverride ? slotOverrides[slotState.id] : slotState.activeId;
        const values = overrideId === targetObject.OBJECT_TOGGLE_ALL ? slotState.toggleValues : [overrideId];
        return {
          id: slotState.id,
          values: values.length ? values : [""]
        };
      });
      const nounAvailabilityPatientivoSources = (() => {
        if (resolvedTense !== "patientivo") {
          return [null];
        }
        const sources = visibleBlockConfigs.map(entry => entry.patientivoSource || "").filter(Boolean);
        return Array.from(new Set(sources));
      })();
      const nounCombinationEvaluationCache = new Map();
      let nounToggleAvailabilityMemo = new Map();
      const TRONCO_INTERMEDIARY_CONSONANTS = new Set(["k", "ch", "s", "sh", "j", "t"]);
      const stripPatientivoNominalMarker = (surface = "") => {
        const normalized = typeof targetObject.normalizeDerivationStemValue === "function" ? targetObject.normalizeDerivationStemValue(surface) : String(surface || "").trim().toLowerCase();
        if (!normalized) {
          return "";
        }
        if (normalized.endsWith("ti") && normalized.length > 2) {
          return normalized.slice(0, -2);
        }
        if (normalized.endsWith("in") && normalized.length > 2) {
          return normalized.slice(0, -2);
        }
        if (normalized.endsWith("t") && normalized.length > 1) {
          return normalized.slice(0, -1);
        }
        return normalized;
      };
      const hasBareTroncoIntermediaryConsonant = (stem = "") => {
        const letters = typeof targetObject.splitVerbLetters === "function" ? targetObject.splitVerbLetters(stem) : stem.split("");
        const last = letters[letters.length - 1] || "";
        return TRONCO_INTERMEDIARY_CONSONANTS.has(last);
      };
      const hasTroncoIntermediaryConsonant = (surface = "") => hasBareTroncoIntermediaryConsonant(stripPatientivoNominalMarker(surface));
      const getTroncoConversionStems = (forms = []) => {
        const stems = [];
        forms.forEach(form => {
          const stem = stripPatientivoNominalMarker(form);
          if (!stem || !hasBareTroncoIntermediaryConsonant(stem) || stems.includes(stem)) {
            return;
          }
          stems.push(stem);
        });
        return stems;
      };
      const renderTroncoConversionForms = ({
        value,
        evaluation,
        sourceVerb = "",
        sourceObjectPrefix = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || typeof targetObject.activateNawatRouteStation !== "function") {
          return;
        }
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => list.indexOf(form) === index);
        const conversionStems = getTroncoConversionStems(forms);
        if (!conversionStems.length) {
          return [];
        }
        const conversionEntries = [];
        const seenConversionEntries = new Set();
        conversionStems.forEach(stem => {
          NAWAT_TRONCO_CONVERSION_ROUTE_SPECS.forEach(spec => {
            const track = buildNawatTroncoConversionTrack({
              routeKey: spec.routeKey,
              stem,
              sourceVerb,
              sourceObjectPrefix
            });
            if (!track?.routeKey || !track.destination) {
              return;
            }
            const key = [track.routeKey, track.targetInput || "", track.destination || ""].join("|");
            if (seenConversionEntries.has(key)) {
              return;
            }
            seenConversionEntries.add(key);
            conversionEntries.push({
              stem,
              track
            });
          });
        });
        if (!conversionEntries.length) {
          return conversionStems;
        }
        value.replaceChildren();
        value.classList.add("conjugation-value--conversion-picker");
        const surfaceText = targetObject.document.createElement("span");
        surfaceText.className = "conjugation-conversion-surface";
        const surfaceDisplay = forms.join(" / ");
        appendConjugationConversionSurfaceLines(surfaceText, surfaceDisplay, evaluation?.result);
        const conversionActions = createConjugationConversionActionsContainer();
        conversionEntries.forEach(({
          stem,
          track
        }) => {
          const routeProfile = typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(track.routeKey) : null;
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.patientivoTroncoConversion = "true";
          continueButton.dataset.nawatRouteKey = track.routeKey;
          continueButton.dataset.troncoStem = stem;
          continueButton.dataset.targetInput = track.targetInput || "";
          continueButton.dataset.targetSurface = track.destination || "";
          applyGrammarFrameRouteDataset(continueButton, track);
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${track.destination || track.targetInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida patientiva: ${forms.join(" / ")}`, `tronco incorporable: ${stem}`, routeProfile?.verbalizer ? `verbalizador: ${routeProfile.verbalizer}` : "", routeProfile?.nawatTenseValue ? `tiempo: ${routeProfile.nawatTenseValue}` : "", track.targetInput ? `V: ${track.targetInput}` : "", track.destination ? `salida V: ${track.destination}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            targetObject.activateNawatRouteStation(track.routeKey, "finite-tense", {
              render: true,
              anchorElement: continueButton,
              sourceVerb,
              sourceObjectPrefix,
              sourceStem: stem
            });
          });
          appendContinuationAction(conversionActions, continueButton);
        });
        value.append(surfaceText, conversionActions);
        applyConjugationConversionColumnLayout(value, surfaceText, conversionActions);
        return conversionStems;
      };
      const evaluateNounCombinationState = ({
        selection,
        number = "",
        possessorPrefix = "",
        objectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        patientivoSource = null,
        patientivoOwnership = activePatientivoOwnership,
        patientivoNominalSuffix = activePatientivoNominalSuffix,
        instrumentivoMode = "",
        actionNounStemUse = "",
        predicateNominalSourceMode = "",
        useReduplicatedSingularSurface = false,
        sourceSubjectFrame = null,
        sourceSubjectPossessorOperationFrame = null
      }) => {
        const isAgentivo = resolvedTense === "agentivo";
        const isPatientivo = resolvedTense === "patientivo";
        const isPredicateNominal = targetObject.isPredicateNominalTense(resolvedTense);
        const resolvedPatientivoSource = isPatientivo ? patientivoSource || getActiveNawatPatientivoBranch() : null;
        const resolvedPatientivoSourceTenseValue = isPatientivo ? getPatientivoBlockSourceTenseValue(resolvedPatientivoSource) : "";
        const resolvedPatientivoSourceCombinedMode = isPatientivo ? getPatientivoBlockSourceCombinedMode(resolvedPatientivoSource) : "";
        const normalizedProbeSelection = targetObject.resolveNominalAvailabilityProbeSelection({
          tenseValue: resolvedTense,
          patientivoSource: resolvedPatientivoSource,
          verbMeta,
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker
        });
        const resolvedObjectPrefix = normalizedProbeSelection.objectPrefix;
        const resolvedIndirectObjectMarker = normalizedProbeSelection.indirectObjectMarker;
        const resolvedThirdObjectMarker = normalizedProbeSelection.thirdObjectMarker;
        const ownershipSelections = isPatientivo && possessorPrefix !== "" && (patientivoOwnership === null || patientivoOwnership === undefined || patientivoOwnership === "") ? targetObject.PATIENTIVO_OWNERSHIP_OPTIONS.map(entry => entry.id) : [patientivoOwnership || targetObject.DEFAULT_PATIENTIVO_OWNERSHIP];
        const resolvedPatientivoNominalSuffix = targetObject.normalizePatientivoNominalSuffixSelection(patientivoNominalSuffix);
        const cacheKey = [selection.subjectPrefix || "", selection.subjectSuffix || "", number || "", possessorPrefix || "", resolvedObjectPrefix || "", resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || "", resolvedPatientivoSource || "", resolvedPatientivoSourceTenseValue, resolvedPatientivoSourceCombinedMode, ownershipSelections.join(","), resolvedPatientivoNominalSuffix === null ? "*" : resolvedPatientivoNominalSuffix, resolvedNominalControlCombinedMode || "", instrumentivoMode || "", actionNounStemUse || "", resolvedPredicateNominalSourceTense || "", predicateNominalSourceMode || "", useReduplicatedSingularSurface ? "redup" : "plain"].join("|");
        const cached = nounCombinationEvaluationCache.get(cacheKey);
        if (cached) {
          return cached;
        }
        const isPossessed = possessorPrefix !== "";
        let subjectSuffixOverride = "";
        const isAdjectiveMode = targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.adjetivo;
        if (isAdjectiveMode) {
          subjectSuffixOverride = selection?.subjectSuffix || "";
        }
        if (isPredicateNominal) {
          subjectSuffixOverride = "t";
        }
        if ((isAgentivo || isPatientivo) && number === "plural") {
          subjectSuffixOverride = isPossessed ? "p" : "t";
        }
        const evaluateForOwnership = resolvedPatientivoOwnership => {
          let result = {};
          if (isInstrumentivo) {
            const resolvedInstrumentivoMode = instrumentivoMode || (possessorPrefix === "" ? targetObject.INSTRUMENTIVO_MODE.absolutivo : targetObject.INSTRUMENTIVO_MODE.posesivo);
            result = targetObject.getInstrumentivoResult({
              rawVerb: verb,
              verbMeta,
              subjectPrefix: selection.subjectPrefix,
              subjectSuffix: selection.subjectSuffix,
              objectPrefix: resolvedObjectPrefix,
              indirectObjectMarker: resolvedIndirectObjectMarker,
              thirdObjectMarker: resolvedThirdObjectMarker,
              mode: resolvedInstrumentivoMode,
              possessivePrefix: possessorPrefix,
              sourceSubjectFrame,
              sourceSubjectPossessorOperationFrame
            }) || {};
          } else if (isCalificativoInstrumentivo) {
            result = targetObject.getCalificativoInstrumentivoResult({
              rawVerb: verb,
              verbMeta,
              subjectPrefix: selection.subjectPrefix,
              subjectSuffix: selection.subjectSuffix,
              objectPrefix: resolvedObjectPrefix,
              indirectObjectMarker: resolvedIndirectObjectMarker,
              thirdObjectMarker: resolvedThirdObjectMarker,
              possessivePrefix: possessorPrefix,
              actionNounStemUse,
              combinedMode: resolvedNominalControlCombinedMode,
              sourceSubjectFrame,
              sourceSubjectPossessorOperationFrame
            }) || {};
          } else {
            const nominalDerivationMode = targetObject.getNominalDerivationModeForTense(tenseValue);
            const predicateNominalDerivationMode = isPredicateNominal && predicateNominalSourceMode === targetObject.COMBINED_MODE.nonactive ? targetObject.DERIVATION_MODE.nonactive : nominalDerivationMode;
            result = targetObject.getCachedSilentGenerateWord({
              silent: true,
              skipValidation: true,
              override: {
                derivationMode: predicateNominalDerivationMode,
                patientivoOwnership: resolvedPatientivoOwnership,
                patientivoSource: resolvedPatientivoSource,
                patientivoNominalSuffix: resolvedPatientivoNominalSuffix,
                ...(resolvedPredicateNominalSourceTense ? {
                  predicateNominalSourceTense: resolvedPredicateNominalSourceTense
                } : {})
              },
              posicionesFormula: {
                pers1: selection.subjectPrefix,
                obj1: resolvedObjectPrefix,
                obj2: resolvedIndirectObjectMarker,
                obj3: resolvedThirdObjectMarker,
                tronco: verb,
                pers2: subjectSuffixOverride,
                num2: subjectSuffixOverride,
                poseedor: possessorPrefix,
                tiempo: tenseValue
              }
            }) || {};
            if (useReduplicatedSingularSurface && getPrimaryConjugationSurface(result)) {
              const prefixChain = targetObject.buildPrefixedChain({
                pers1: selection.subjectPrefix,
                poseedor: possessorPrefix,
                obj1: targetObject.composeObj1Chain({
                  obj1: resolvedObjectPrefix,
                  markers: [resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || ""],
                  pers1: selection.subjectPrefix
                }),
                tronco: ""
              });
              result = targetObject.buildReduplicatedConjugationResult(result, {
                prefixChain,
                applyMissingPrefixChain: true
              });
            }
          }
          const maskState = targetObject.getConjugationMaskState({
            result,
            subjectPrefix: selection.subjectPrefix,
            subjectSuffix: selection.subjectSuffix,
            objectPrefix: resolvedObjectPrefix,
            possessivePrefix: possessorPrefix,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            derivationType: nounObjectSlotSummary.derivationType,
            comboObjectPrefix: undefined,
            requireDistinctPossessor: isAgentivo || isPatientivo,
            enforceInvalidCombo: !useReduplicatedSingularSurface
          });
          const valence4Violation = mutableNounObjectSlots.length >= 3 && !targetObject.isValidObj1Obj2Obj3Combo({
            obj1: resolvedObjectPrefix,
            obj2: resolvedIndirectObjectMarker,
            obj3: resolvedThirdObjectMarker
          });
          return {
            ...targetObject.buildConjugationEvaluationRecord({
              result,
              maskState,
              hasValenceStructureError: valence4Violation
            }),
            normalizedSelection: normalizedProbeSelection
          };
        };
        const evaluations = ownershipSelections.map(ownership => evaluateForOwnership(ownership));
        const visibleEvaluations = evaluations.filter(entry => entry.hasVisibleResult);
        const evaluation = visibleEvaluations.length ? {
          ...targetObject.buildConjugationEvaluationRecord({
            result: {
              ...visibleEvaluations[0].result,
              result: Array.from(new Set(visibleEvaluations.flatMap(entry => getConjugationSurfaceForms(entry.result)))).join(" / ")
            }
          }),
          normalizedSelection: visibleEvaluations[0].normalizedSelection || normalizedProbeSelection
        } : evaluations[0] || {
          ...targetObject.buildConjugationEvaluationRecord({
            result: {}
          }),
          normalizedSelection: normalizedProbeSelection
        };
        nounCombinationEvaluationCache.set(cacheKey, evaluation);
        return evaluation;
      };
      const renderCalificativoInstrumentivoSourceSubjectGeneralUseContinuation = ({
        row = null,
        value,
        selection,
        number,
        possessorPrefix = "",
        objectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        evaluation = null
      } = {}) => {
        if (resolvedTense !== "calificativo-instrumentivo" || !value || possessorPrefix || typeof targetObject.resolveNawatPossessorPrefixFromSourceSubject !== "function") {
          return false;
        }
        const derivedPossessorPrefix = targetObject.resolveNawatPossessorPrefixFromSourceSubject(selection?.subjectPrefix || "", selection?.subjectSuffix || "");
        if (!derivedPossessorPrefix) {
          return false;
        }
        const sourceSubjectFrame = typeof targetObject.buildAndrewsSourceSubjectFrame === "function" ? targetObject.buildAndrewsSourceSubjectFrame({
          subjectPrefix: selection?.subjectPrefix || "",
          subjectSuffix: selection?.subjectSuffix || "",
          sourceUnit: "CNV",
          sourceTense: resolvedNominalControlCombinedMode === targetObject.COMBINED_MODE.nonactive ? "distant-past-passive" : "distant-past-active"
        }) : null;
        const sourceSubjectPossessorOperationFrame = typeof targetObject.buildSourceSubjectPossessorOperationFrame === "function" ? targetObject.buildSourceSubjectPossessorOperationFrame({
          sourceSubjectFrame,
          targetPossessivePrefix: derivedPossessorPrefix,
          nominalKind: "calificativo-instrumentivo",
          operationId: "andrews-36-11-active-action-source-subject-to-possessor",
          andrewsRef: resolvedNominalControlCombinedMode === targetObject.COMBINED_MODE.nonactive ? "Andrews 36.10" : "Andrews 36.11"
        }) : null;
        const generalUseEvaluation = evaluateNounCombinationState({
          selection,
          number,
          possessorPrefix: "",
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          actionNounStemUse: "general-use",
          sourceSubjectFrame,
          sourceSubjectPossessorOperationFrame
        });
        const generalUseTargetSurface = getPrimaryConjugationSurface(generalUseEvaluation?.result);
        const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(evaluation?.result, 0);
        const targetSelectedVariant = getGeneratedOutputSelectedRealizationVariant(generalUseEvaluation?.result, 0);
        const fallbackSourceVariantId = [selection?.subjectPrefix || "", selection?.subjectSuffix || "", number || "", indirectObjectMarker || "", thirdObjectMarker || ""].filter(Boolean).join(":");
        const identityContext = {
          namespace: "action-noun-source-subject-possessor-continuation",
          targetTense: resolvedTense,
          sourceUnit: "action-noun",
          sourceObjectPrefix: objectPrefix,
          sourceVariantId: sourceSelectedVariant?.variantId || fallbackSourceVariantId,
          targetVariantId: targetSelectedVariant?.variantId || "general-use"
        };
        const sourceIdentityKey = getGeneratedOutputContinuationIdentityKey(evaluation?.result, identityContext);
        const targetIdentityKey = getGeneratedOutputContinuationIdentityKey(generalUseEvaluation?.result, identityContext);
        const continuationIdentityKey = getGeneratedOutputContinuationIdentityKey([evaluation?.result, generalUseEvaluation?.result], identityContext);
        if (generalUseEvaluation?.shouldMaskRow || !generalUseTargetSurface || !sourceIdentityKey || !targetIdentityKey || sourceIdentityKey === targetIdentityKey || !continuationIdentityKey) {
          return false;
        }
        let actions = getConjugationConversionActionsForValue(value);
        if (!actions) {
          const sourceSurface = getConjugationDisplaySurface(evaluation?.result);
          value.replaceChildren();
          value.classList.remove("conjugation-error", "conjugation-reflexive");
          value.classList.add("conjugation-value--conversion-picker");
          let surfaceText = null;
          if (sourceSurface && sourceSurface !== "—") {
            surfaceText = targetObject.document.createElement("span");
            surfaceText.className = "conjugation-conversion-surface";
            appendConjugationConversionSurfaceLines(surfaceText, sourceSurface, evaluation?.result);
            value.appendChild(surfaceText);
          }
          actions = createConjugationConversionActionsContainer();
          value.appendChild(actions);
          if (surfaceText) {
            applyConjugationConversionColumnLayout(value, surfaceText, actions);
          }
        }
        const alreadyRendered = Array.from(actions.querySelectorAll("[data-action-noun-source-subject-possessor]")).some(button => button.dataset.continuationIdentityKey === continuationIdentityKey);
        if (alreadyRendered) {
          return true;
        }
        const action = targetObject.document.createElement("button");
        action.type = "button";
        action.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
        action.dataset.actionNounSourceSubjectPossessor = derivedPossessorPrefix;
        action.dataset.actionNounStemUse = "general-use";
        action.dataset.targetSurface = generalUseTargetSurface;
        if (sourceSelectedVariant?.variantId) {
          action.dataset.sourceSelectedVariantId = sourceSelectedVariant.variantId;
        }
        if (targetSelectedVariant?.variantId) {
          action.dataset.targetSelectedVariantId = targetSelectedVariant.variantId;
        }
        applyGeneratedOutputContinuationIdentityDataset(action, [evaluation?.result, generalUseEvaluation?.result], identityContext);
        applyGrammarFrameRouteDataset(action, generalUseEvaluation.result);
        const label = targetObject.document.createElement("span");
        label.className = "calc-guidance__chip-label";
        label.textContent = `→ ${generalUseTargetSurface}`;
        action.appendChild(label);
        action.title = ["Andrews 36.10-36.11: sujeto fuente → poseedor", `poseedor: ${derivedPossessorPrefix}`, `uso general: ${generalUseTargetSurface}`].join("; ");
        appendContinuationAction(actions, action);
        if (row) {
          row.dataset.availabilityState = targetObject.CONJUGATION_AVAILABILITY_STATE.viable;
          row.dataset.diagnosticState = targetObject.CONJUGATION_AVAILABILITY_STATE.viable;
          row.dataset.diagnosticIds = "";
        }
        value.dataset.availabilityState = targetObject.CONJUGATION_AVAILABILITY_STATE.viable;
        value.dataset.diagnosticState = targetObject.CONJUGATION_AVAILABILITY_STATE.viable;
        value.dataset.diagnosticIds = "";
        return true;
      };
      const renderInstrumentivoSourceSubjectPossessiveContinuation = ({
        value,
        selection,
        number,
        objectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        evaluation = null
      } = {}) => {
        if (resolvedTense !== "instrumentivo" || !value || evaluation?.shouldMaskRow || typeof targetObject.resolveInstrumentivoPossessorPrefixFromSourceSubject !== "function") {
          return;
        }
        const actionsToRender = [];
        const possessivePrefix = targetObject.resolveInstrumentivoPossessorPrefixFromSourceSubject(selection?.subjectPrefix || "", selection?.subjectSuffix || "");
        if (possessivePrefix) {
          const sourceSubjectFrame = typeof targetObject.buildAndrewsSourceSubjectFrame === "function" ? targetObject.buildAndrewsSourceSubjectFrame({
            subjectPrefix: selection?.subjectPrefix || "",
            subjectSuffix: selection?.subjectSuffix || "",
            sourceUnit: "CNV",
            sourceTense: "imperfect-active"
          }) : null;
          const sourceSubjectPossessorOperationFrame = typeof targetObject.buildSourceSubjectPossessorOperationFrame === "function" ? targetObject.buildSourceSubjectPossessorOperationFrame({
            sourceSubjectFrame,
            targetPossessivePrefix: possessivePrefix,
            nominalKind: "instrumentivo",
            operationId: "andrews-36-6-instrumentive-source-subject-to-possessor",
            andrewsRef: "Andrews 36.6"
          }) : null;
          const possessiveEvaluation = evaluateNounCombinationState({
            selection,
            number,
            possessorPrefix: "",
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            instrumentivoMode: targetObject.INSTRUMENTIVO_MODE.posesivo,
            sourceSubjectFrame,
            sourceSubjectPossessorOperationFrame
          });
          const possessiveTargetSurface = getPrimaryConjugationSurface(possessiveEvaluation?.result);
          const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(evaluation?.result, 0);
          const targetSelectedVariant = getGeneratedOutputSelectedRealizationVariant(possessiveEvaluation?.result, 0);
          const identityContext = {
            namespace: "instrumentivo-source-subject-possessive-continuation",
            targetTense: resolvedTense,
            sourceUnit: "instrumentivo",
            sourceObjectPrefix: objectPrefix,
            sourceVariantId: sourceSelectedVariant?.variantId || [selection?.subjectPrefix || "", selection?.subjectSuffix || "", number || "", indirectObjectMarker || "", thirdObjectMarker || ""].filter(Boolean).join(":"),
            targetVariantId: targetSelectedVariant?.variantId || `possessive:${possessivePrefix}`
          };
          const sourceIdentityKey = getGeneratedOutputContinuationIdentityKey(evaluation?.result, identityContext);
          const targetIdentityKey = getGeneratedOutputContinuationIdentityKey(possessiveEvaluation?.result, identityContext);
          const continuationIdentityKey = getGeneratedOutputContinuationIdentityKey([evaluation?.result, possessiveEvaluation?.result], identityContext);
          if (!possessiveEvaluation?.shouldMaskRow && sourceIdentityKey && targetIdentityKey && sourceIdentityKey !== targetIdentityKey && continuationIdentityKey) {
            actionsToRender.push({
              datasetFlag: "instrumentivoSourceSubjectPossessor",
              datasetValue: possessivePrefix,
              targetSurface: possessiveTargetSurface,
              evaluation: possessiveEvaluation,
              continuationIdentityKey,
              identityContext,
              sourceSelectedVariant,
              targetSelectedVariant,
              title: ["Andrews 36.6: sujeto fuente → poseedor", `poseedor: ${possessivePrefix}`, `salida posesiva: ${possessiveTargetSurface}`].join("; "),
              subLabel: "sujeto fuente → poseedor"
            });
          }
        }
        if (!actionsToRender.length) {
          return;
        }
        const forms = getConjugationSurfaceForms(evaluation?.result);
        value.replaceChildren();
        value.classList.add("conjugation-value--conversion-picker");
        const surfaceText = targetObject.document.createElement("span");
        surfaceText.className = "conjugation-conversion-surface";
        const surfaceDisplay = forms.join(" / ") || getConjugationDisplaySurface(evaluation?.result);
        appendConjugationConversionSurfaceLines(surfaceText, surfaceDisplay, evaluation?.result);
        const actions = createConjugationConversionActionsContainer();
        actionsToRender.forEach(entry => {
          const action = targetObject.document.createElement("button");
          action.type = "button";
          action.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
          action.dataset[entry.datasetFlag] = entry.datasetValue;
          action.dataset.targetSurface = entry.targetSurface;
          action.dataset.continuationIdentityKey = entry.continuationIdentityKey;
          action.dataset.continuationIdentitySource = "canonical-formula-realization-record";
          if (entry.sourceSelectedVariant?.variantId) {
            action.dataset.sourceSelectedVariantId = entry.sourceSelectedVariant.variantId;
          }
          if (entry.targetSelectedVariant?.variantId) {
            action.dataset.targetSelectedVariantId = entry.targetSelectedVariant.variantId;
          }
          applyGeneratedOutputContinuationIdentityDataset(action, [evaluation?.result, entry.evaluation?.result], entry.identityContext);
          applyGrammarFrameRouteDataset(action, entry.evaluation.result);
          const label = targetObject.document.createElement("span");
          label.className = "calc-guidance__chip-label";
          label.textContent = `→ ${entry.targetSurface}`;
          action.appendChild(label);
          const subLabel = targetObject.document.createElement("span");
          subLabel.className = "calc-guidance__chip-sublabel";
          subLabel.textContent = entry.subLabel;
          action.appendChild(subLabel);
          action.title = entry.title;
          appendContinuationAction(actions, action);
        });
        value.append(surfaceText, actions);
        applyConjugationConversionColumnLayout(value, surfaceText, actions);
      };
      const resolveNounToggleAvailabilityState = ({
        subjectSelections,
        possessorSelections,
        objectSlotModels,
        patientivoOwnership = activePatientivoOwnership,
        patientivoNominalSuffix = activePatientivoNominalSuffix
      }) => {
        const memoKey = [subjectSelections.map(({
          selection,
          number
        }) => `${selection.subjectPrefix || ""}:${selection.subjectSuffix || ""}:${number || ""}`).join(","), possessorSelections.join(","), objectSlotModels.map(slotModel => `${slotModel.id}:${(slotModel.values || []).join(",")}`).join(";"), patientivoOwnership || "", targetObject.getPatientivoNominalSuffixCacheToken(patientivoNominalSuffix), nounAvailabilityPatientivoSources.join(",")].join("|");
        if (nounToggleAvailabilityMemo.has(memoKey)) {
          return nounToggleAvailabilityMemo.get(memoKey);
        }
        const summary = targetObject.createToggleAvailabilityRealizationSummary();
        nounAvailabilityPatientivoSources.forEach(source => {
          targetObject.iterateNounObjectSlotSelections(objectSlotModels, selectedBySlot => {
            const objectPrefix = selectedBySlot.object || "";
            const indirectObjectMarker = selectedBySlot.object2 || "";
            const thirdObjectMarker = selectedBySlot.object3 || "";
            subjectSelections.forEach(({
              selection,
              number,
              useReduplicatedSingularSurface
            }) => {
              possessorSelections.forEach(possessorPrefix => {
                const evaluation = evaluateNounCombinationState({
                  selection,
                  number,
                  possessorPrefix,
                  objectPrefix,
                  indirectObjectMarker,
                  thirdObjectMarker,
                  patientivoSource: source,
                  patientivoOwnership,
                  patientivoNominalSuffix,
                  useReduplicatedSingularSurface
                });
                targetObject.recordToggleAvailabilityRealization(summary, evaluation);
              });
            });
          });
        });
        const resolvedRecord = targetObject.realizeToggleAvailabilitySummary(summary);
        nounToggleAvailabilityMemo.set(memoKey, resolvedRecord);
        return resolvedRecord;
      };
      const clearNounToggleAvailabilityStyling = () => {
        subjectButtons.forEach(button => clearToggleAvailabilityClasses(button));
        possessorButtons.forEach(button => clearToggleAvailabilityClasses(button));
        ownershipButtons.forEach(button => clearToggleAvailabilityClasses(button));
        patientivoNominalSuffixButtons.forEach(button => {
          clearToggleAvailabilityClasses(button);
          button.disabled = false;
        });
        nounObjectToggleButtonsById.forEach(slotButtons => {
          slotButtons.forEach(button => clearToggleAvailabilityClasses(button));
        });
      };
      const updateNounToggleOptionAvailabilityStyling = () => {
        clearNounToggleAvailabilityStyling();
        if (!verb) {
          return;
        }
        const activeSubjectSelections = getSubjectSelectionsForId(activeSubject);
        const activePossessorSelections = getPossessorSelectionsForId(activePossessor);
        mutableNounObjectSlots.forEach(slotState => {
          const slotButtons = nounObjectToggleButtonsById.get(slotState.id);
          if (!slotButtons || !slotButtons.size) {
            return;
          }
          slotButtons.forEach((button, optionId) => {
            const objectSlotModels = buildNounObjectSlotModelsForState({
              [slotState.id]: optionId
            });
            const availabilityRecord = resolveNounToggleAvailabilityState({
              subjectSelections: activeSubjectSelections,
              possessorSelections: activePossessorSelections,
              objectSlotModels,
              patientivoOwnership: activePatientivoOwnership
            });
            const availabilityState = availabilityRecord.availabilityState;
            applyToggleAvailabilityClass(button, availabilityState);
            applySelectedAvailabilityClass(button, availabilityState, optionId === slotState.activeId);
          });
        });
        if (subjectButtons.size) {
          const activeObjectSlotModels = buildNounObjectSlotModelsForState();
          subjectButtons.forEach((button, subjectId) => {
            const subjectSelections = getSubjectSelectionsForId(subjectId);
            const availabilityRecord = resolveNounToggleAvailabilityState({
              subjectSelections,
              possessorSelections: activePossessorSelections,
              objectSlotModels: activeObjectSlotModels,
              patientivoOwnership: activePatientivoOwnership
            });
            const availabilityState = availabilityRecord.availabilityState;
            applyToggleAvailabilityClass(button, availabilityState);
            applySelectedAvailabilityClass(button, availabilityState, subjectId === activeSubject);
          });
        }
        if (possessorButtons.size) {
          const activeObjectSlotModels = buildNounObjectSlotModelsForState();
          possessorButtons.forEach((button, possessorId) => {
            const possessorSelections = getPossessorSelectionsForId(possessorId);
            const availabilityRecord = resolveNounToggleAvailabilityState({
              subjectSelections: activeSubjectSelections,
              possessorSelections,
              objectSlotModels: activeObjectSlotModels,
              patientivoOwnership: activePatientivoOwnership
            });
            const availabilityState = availabilityRecord.availabilityState;
            applyToggleAvailabilityClass(button, availabilityState);
            applySelectedAvailabilityClass(button, availabilityState, possessorId === activePossessor);
          });
        }
        if (ownershipButtons.size) {
          const activeObjectSlotModels = buildNounObjectSlotModelsForState();
          ownershipButtons.forEach((button, ownershipId) => {
            const availabilityRecord = resolveNounToggleAvailabilityState({
              subjectSelections: activeSubjectSelections,
              possessorSelections: activePossessorSelections,
              objectSlotModels: activeObjectSlotModels,
              patientivoOwnership: ownershipId
            });
            const availabilityState = availabilityRecord.availabilityState;
            applyToggleAvailabilityClass(button, availabilityState);
            applySelectedAvailabilityClass(button, availabilityState, ownershipId === activePatientivoOwnership);
          });
        }
        if (patientivoNominalSuffixButtons.size) {
          const activeObjectSlotModels = buildNounObjectSlotModelsForState();
          patientivoNominalSuffixButtons.forEach((button, suffixId) => {
            const normalizedSuffix = targetObject.normalizePatientivoNominalSuffixSelection(suffixId);
            const availabilityRecord = resolveNounToggleAvailabilityState({
              subjectSelections: activeSubjectSelections,
              possessorSelections: activePossessorSelections,
              objectSlotModels: activeObjectSlotModels,
              patientivoOwnership: activePatientivoOwnership,
              patientivoNominalSuffix: normalizedSuffix
            });
            const availabilityState = availabilityRecord.availabilityState;
            applyToggleAvailabilityClass(button, availabilityState);
            applySelectedAvailabilityClass(button, availabilityState, suffixId === activePatientivoNominalSuffix);
            button.disabled = availabilityState === targetObject.CONJUGATION_AVAILABILITY_STATE.impossible;
          });
        }
      };
      const buildNounTitleControls = () => {
        if (!hasNounControls) {
          return null;
        }
        const titleControls = targetObject.document.createElement("div");
        titleControls.className = "tense-block__controls";
        titleControls.classList.add("tense-block__controls--stacked");
        toggleButtons = new Map();
        possessorButtons = new Map();
        ownershipButtons = new Map();
        patientivoNominalSuffixButtons = new Map();
        predicateNominalSourceTenseButtons = new Map();
        subjectButtons = new Map();
        nounObjectToggleButtonsById.clear();
        if (showSubjectToggle) {
          const {
            toggle: subjectToggle,
            buttons
          } = buildToggleControl({
            options: subjectOptions,
            activeId: activeSubject,
            ariaLabel: subjectToggleLabel,
            visibleLabel: useSharedPatientivoControls ? subjectToggleLabel : "",
            onSelect: id => {
              setActiveSubject(id);
            },
            getTitle: entry => entry.title,
            getIsDisabled: entry => !isSubjectOptionAllowed(entry),
            getActiveId: () => activeSubject
          });
          subjectToggle.dataset.toggleType = "subject";
          subjectToggle.dataset.toggleSlot = "subject";
          subjectButtons = buttons;
          titleControls.appendChild(subjectToggle);
        }
        if (showPossessorToggle) {
          const possessorOptions = [{
            id: targetObject.OBJECT_TOGGLE_ALL,
            label: allToggleLabel,
            value: targetObject.OBJECT_TOGGLE_ALL
          }, ...explicitPossessorToggleValues.map(value => ({
            id: value,
            label: value,
            value,
            title: targetObject.getPossessorPersonLabel(value, isNawat)
          }))];
          const {
            toggle: possessorToggle,
            buttons
          } = buildToggleControl({
            options: possessorOptions,
            activeId: activePossessor,
            ariaLabel: possessorToggleLabel,
            visibleLabel: useSharedPatientivoControls ? possessorToggleLabel : "",
            onSelect: id => {
              setActivePossessor(id);
            },
            getTitle: entry => entry.title,
            getActiveId: () => activePossessor,
            allowDeselect: hasImplicitAbsolutePossessor
          });
          possessorToggle.dataset.toggleType = "meta";
          possessorToggle.dataset.toggleSlot = "possessor";
          possessorButtons = buttons;
          titleControls.appendChild(possessorToggle);
        } else {
          activePossessor = hasImplicitAbsolutePossessor ? "" : explicitPossessorToggleValues[0] ?? visiblePossessorValues[0] ?? "";
        }
        if (showOwnershipToggle) {
          const ownershipToggleOptions = targetObject.PATIENTIVO_OWNERSHIP_OPTIONS.map(entry => ({
            ...entry,
            label: entry.id === "zero" ? "Ø" : entry.id
          }));
          targetObject.setToggleStateValue(targetObject.PatientivoOwnershipState, ownershipKey, activePatientivoOwnership, {
            syncLock: false
          });
          const {
            toggle: ownershipToggle,
            buttons
          } = buildToggleControl({
            options: ownershipToggleOptions,
            activeId: activePatientivoOwnership,
            ariaLabel: ownershipToggleLabel,
            visibleLabel: useSharedPatientivoControls ? ownershipToggleLabel : "",
            onSelect: id => {
              setActivePatientivoOwnership(id);
            },
            getTitle: entry => targetObject.getLocalizedLabel(targetObject.PATIENTIVO_OWNERSHIP_LABELS[entry.id], isNawat, entry.title || ""),
            getActiveId: () => activePatientivoOwnership,
            stacked: false,
            toggleClassName: "object-toggle--ownership-corner",
            allowDeselect: true
          });
          ownershipToggle.dataset.toggleType = "meta";
          ownershipToggle.dataset.toggleSlot = "ownership";
          ownershipButtons = buttons;
          titleControls.appendChild(ownershipToggle);
        }
        if (showPatientivoNominalSuffixToggle) {
          const patientivoNominalSuffixToggleOptions = targetObject.PATIENTIVO_NOMINAL_SUFFIX_OPTIONS.map(entry => ({
            ...entry
          }));
          const {
            toggle: patientivoNominalSuffixToggle,
            buttons
          } = buildToggleControl({
            options: patientivoNominalSuffixToggleOptions,
            activeId: activePatientivoNominalSuffix,
            ariaLabel: suffixToggleLabel,
            visibleLabel: useSharedPatientivoControls ? suffixToggleLabel : "",
            onSelect: id => {
              setActivePatientivoNominalSuffix(id);
            },
            getTitle: entry => entry.title,
            getActiveId: () => activePatientivoNominalSuffix,
            stacked: false,
            toggleClassName: "object-toggle--patientivo-suffix-corner",
            allowDeselect: true
          });
          patientivoNominalSuffixToggle.dataset.toggleType = "meta";
          patientivoNominalSuffixToggle.dataset.toggleSlot = "patientivo-suffix";
          patientivoNominalSuffixButtons = buttons;
          titleControls.appendChild(patientivoNominalSuffixToggle);
        }
        if (isPredicateNominalTenseSelected) {
          const sourceTenseOptions = targetObject.getPredicateNominalSourceTenses().map(tenseValue => ({
            id: tenseValue,
            label: targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[tenseValue], isNawat, tenseValue),
            title: `VNC predicate source: ${tenseValue}`
          }));
          const {
            toggle: predicateSourceTenseToggle,
            buttons
          } = buildToggleControl({
            options: sourceTenseOptions,
            activeId: activePredicateNominalSourceTense,
            ariaLabel: sourceTenseToggleLabel,
            visibleLabel: sourceTenseToggleLabel,
            onSelect: id => {
              setActivePredicateNominalSourceTense(id);
            },
            getTitle: entry => entry.title,
            getActiveId: () => activePredicateNominalSourceTense,
            stacked: false,
            toggleClassName: "object-toggle--predicate-source-tense"
          });
          predicateSourceTenseToggle.dataset.toggleType = "meta";
          predicateSourceTenseToggle.dataset.toggleSlot = "predicate-source-tense";
          predicateNominalSourceTenseButtons = buttons;
          titleControls.appendChild(predicateSourceTenseToggle);
        }
        if (showObjectToggle) {
          mutableNounObjectSlots.forEach((slotState, index) => {
            if (!slotState.showToggle) {
              return;
            }
            const slotAriaLabel = slotState.id === "object" ? objectToggleLabel : `${targetObject.getValence3PlusSlotRoleLabel(slotState.id, isNawat) || objectToggleLabel} (${index + 1})`;
            const {
              toggle: objectToggle,
              buttons
            } = buildToggleControl({
              options: slotState.options,
              activeId: slotState.activeId,
              ariaLabel: slotAriaLabel,
              visibleLabel: useSharedPatientivoControls ? slotAriaLabel : "",
              onSelect: id => {
                setActiveObjectSlot(slotState.id, id);
              },
              getActiveId: () => slotState.activeId
            });
            objectToggle.dataset.toggleType = "object";
            objectToggle.dataset.toggleSlot = slotState.id;
            if (slotState.id === "object") {
              toggleButtons = buttons;
            }
            nounObjectToggleButtonsById.set(slotState.id, buttons);
            titleControls.appendChild(objectToggle);
          });
        }
        return titleControls;
      };
      if (useSharedPatientivoControls) {
        const controlsBlock = targetObject.document.createElement("div");
        controlsBlock.className = "tense-block tense-block--noun-shared-controls";
        controlsBlock.title = getAndrewsFirstOutputBlockHoverTitle({
          mode: targetObject.TENSE_MODE.sustantivo,
          blockKind: "controles CNN"
        });
        if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
          targetObject.applyAndrewsTenseAuthorityDataset(controlsBlock, {
            mode: targetObject.TENSE_MODE.sustantivo,
            blockKind: "controles CNN"
          });
        }
        const controlsTitle = targetObject.document.createElement("div");
        controlsTitle.className = "tense-block__title";
        const controlsLabel = targetObject.document.createElement("span");
        controlsLabel.className = "tense-block__label";
        controlsLabel.textContent = targetObject.getToggleLabel("controls", isNawat, "Controles");
        controlsLabel.title = controlsBlock.title;
        controlsTitle.appendChild(controlsLabel);
        const controls = buildNounTitleControls();
        if (controls) {
          controls.querySelectorAll(".object-toggle--ownership-corner, .object-toggle--patientivo-suffix-corner").forEach(control => {
            controlsTitle.appendChild(control);
          });
        }
        controlsBlock.appendChild(controlsTitle);
        if (controls) {
          controlsBlock.appendChild(controls);
        }
        objSection.insertBefore(controlsBlock, grid);
      }
      const createTenseBlock = ({
        id,
        label,
        patientivoSource,
        sourceMode = defaultNominalSourceMode,
        sourceTenseLabel = "",
        predicateNominalSourceMode = "",
        showControls
      }) => {
        const tenseBlock = targetObject.document.createElement("div");
        tenseBlock.className = "tense-block";
        tenseBlock.dataset.tenseBlock = `${activeObjectPrefix || "intrans"}-${id}`;
        tenseBlock.title = getAndrewsFirstOutputBlockHoverTitle({
          mode: targetObject.TENSE_MODE.sustantivo,
          tenseValue: id,
          blockKind: "CNN"
        });
        if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
          targetObject.applyAndrewsTenseAuthorityDataset(tenseBlock, {
            tenseValue: id,
            mode: targetObject.TENSE_MODE.sustantivo,
            blockKind: "CNN"
          });
        }
        if (isPatientivoTense && patientivoSource) {
          tenseBlock.dataset.nawatPatientivoSource = patientivoSource;
        }
        const tenseTitle = targetObject.document.createElement("div");
        tenseTitle.className = "tense-block__title";
        const titleLabel = targetObject.document.createElement("span");
        titleLabel.className = "tense-block__label";
        titleLabel.textContent = resolveNounBlockTitleText({
          label,
          sourceMode,
          sourceTenseLabel
        });
        titleLabel.title = tenseBlock.title;
        tenseTitle.appendChild(titleLabel);
        const shouldRenderControls = !useSharedPatientivoControls && showControls && hasNounControls;
        if (shouldRenderControls) {
          const titleControls = buildNounTitleControls();
          if (titleControls) {
            tenseTitle.appendChild(titleControls);
          }
        }
        const originSlot = targetObject.document.createElement("div");
        originSlot.className = "tense-block__origin";
        originSlot.hidden = true;
        if (isPatientivoTense && patientivoSource) {
          tenseTitle.appendChild(originSlot);
        }
        const destinationSlot = targetObject.document.createElement("div");
        destinationSlot.className = "tense-block__destination";
        destinationSlot.hidden = true;
        if (isPatientivoTense && (patientivoSource === "tronco-verbal" || patientivoSource === "perfectivo" || patientivoSource === "imperfectivo")) {
          tenseTitle.appendChild(destinationSlot);
        }
        tenseBlock.appendChild(tenseTitle);
        const list = targetObject.document.createElement("div");
        list.className = "conjugation-list";
        tenseBlock.appendChild(list);
        if (sourceColumns) {
          sourceColumns.appendBlock(tenseBlock, sourceMode);
        } else {
          grid.appendChild(tenseBlock);
        }
        blocks.push({
          block: tenseBlock,
          list,
          label,
          sourceMode,
          sourceTenseLabel,
          patientivoSource,
          predicateNominalSourceMode,
          blockKey: id,
          titleLabel,
          originSlot,
          destinationSlot,
          destinationCandidates: []
        });
        updatePatientivoBlockOrigin(blocks[blocks.length - 1]);
        updatePatientivoBlockDestination(blocks[blocks.length - 1]);
        updateNounBlockPalettes();
      };
      const updateSectionCategory = prefix => {
        targetObject.applyObjectSectionCategory(objSection, prefix);
      };
      const getTroncoDestinationSourceVerb = () => verbMeta?.parseInputVerb || verbMeta?.regexInputVerb || resolveRenderableVerbValue(verb) || verb;
      const renderRowsForList = (entry = {}) => {
        const targetList = entry.list;
        const patientivoSource = entry.patientivoSource;
        entry.destinationCandidates = [];
        targetList.innerHTML = "";
        if (!verb) {
          const placeholder = targetObject.document.createElement("div");
          placeholder.className = "tense-placeholder";
          placeholder.textContent = placeholderText;
          targetList.appendChild(placeholder);
          return;
        }
        const selections = getSubjectSelectionsForId(activeSubject);
        const objectSlotSelectionModels = isPreteritAgentiveLocativeNnc ? [] : buildNounObjectSlotModelsForState();
        const possessorSelections = getPossessorSelectionsForId(activePossessor);
        targetObject.iterateNounObjectSlotSelections(objectSlotSelectionModels, selectedBySlot => {
          const objectPrefix = selectedBySlot.object || "";
          const indirectObjectMarker = selectedBySlot.object2 || "";
          const thirdObjectMarker = selectedBySlot.object3 || "";
          selections.forEach(subjectEntry => {
            const {
              group,
              selection,
              displaySelection = selection,
              displayPersonSubLabel = "",
              number,
              useReduplicatedSingularSurface = false
            } = subjectEntry;
            possessorSelections.forEach(possessorPrefix => {
              const evaluation = evaluateNounCombinationState({
                selection,
                number,
                possessorPrefix,
                objectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                patientivoSource,
                patientivoOwnership: activePatientivoOwnership,
                patientivoNominalSuffix: activePatientivoNominalSuffix,
                predicateNominalSourceMode: entry.predicateNominalSourceMode || "",
                useReduplicatedSingularSurface
              });
              const normalizedSelection = evaluation.normalizedSelection || {};
              const displayObjectPrefix = normalizedSelection.objectPrefix ?? objectPrefix;
              const displayIndirectObjectMarker = normalizedSelection.indirectObjectMarker ?? indirectObjectMarker;
              const displayThirdObjectMarker = normalizedSelection.thirdObjectMarker ?? thirdObjectMarker;
              const row = targetObject.document.createElement("div");
              row.className = "conjugation-row";
              targetObject.applyConjugationRowClasses(row, displayObjectPrefix);
              row.dataset.objectPrefix = displayObjectPrefix;
              row.dataset.indirectObjectPrefix = displayIndirectObjectMarker;
              row.dataset.thirdObjectPrefix = displayThirdObjectMarker;
              if (isPreteritAgentiveLocativeNnc) {
                row.dataset.exportSourceLabel = "CNN derivada de CNV";
              }
              const label = targetObject.document.createElement("div");
              label.className = "conjugation-label";
              const personLabel = targetObject.document.createElement("div");
              personLabel.className = "person-label";
              personLabel.textContent = isPreteritAgentiveLocativeNnc ? "CNN" : displaySelection ? targetObject.getSubjectPersonLabel(group, displaySelection, isNawat) : "";
              const personSub = targetObject.document.createElement("div");
              personSub.className = "person-sub";
              const basePersonSub = isPreteritAgentiveLocativeNnc ? "" : displayPersonSubLabel ? targetObject.getLocalizedLabel(displayPersonSubLabel, isNawat, "") : displaySelection ? targetObject.getSubjectSubLabel(displaySelection, {
                isNawat,
                mode: "noun",
                tenseValue: resolvedTense
              }) : "";
              const objectMarkers = [displayObjectPrefix, displayIndirectObjectMarker, displayThirdObjectMarker].filter(Boolean);
              const suppressZeroObjectLabel = targetObject.isPotencialProfileTense(resolvedTense) || isPreteritAgentiveLocativeNnc;
              const isDummyImpersonalRow = combinedMode === targetObject.COMBINED_MODE.nonactive && isSubjectlessTense && !selection.subjectPrefix && !selection.subjectSuffix && !possessorPrefix && objectMarkers.length === 0;
              const objectLabel = objectMarkers.length ? objectMarkers.map(prefix => targetObject.getNounObjectComboLabel(prefix, isNawat)).join(" + ") : suppressZeroObjectLabel ? "" : targetObject.getNounZeroObjectComboLabel(isNawat, {
                isImpersonalDummy: isDummyImpersonalRow
              });
              let possessorLabel = isPreteritAgentiveLocativeNnc ? "" : targetObject.getPossessorLabel(possessorPrefix, isNawat);
              label.appendChild(personLabel);
              label.appendChild(personSub);
              const value = targetObject.document.createElement("div");
              value.className = "conjugation-value";
              const num1Num2Label = buildNominalNum1Num2SubLabel({
                evaluation,
                selection: normalizedSelection,
                displaySelection
              });
              personSub.textContent = appendGrammarFrameSubLabels(appendSentenceLayerSubLabels(appendNuclearClauseShellSubLabels(appendAdverbialAdjunctionBoundaryFrameSubLabels(appendAdverbialNuclearFrameSubLabels(appendRelationalNncBoundaryFrameSubLabels(appendPlaceGentilicNncBoundaryFrameSubLabels(appendDenominalFamilyProfileSubLabels(appendVerbDerivedNominalizationProfileSubLabels(targetObject.buildPersonSub({
                subjectLabel: appendNominalNum1Num2SubLabel(basePersonSub, num1Num2Label),
                possessorLabel,
                objectLabel
              }), evaluation.result?.nominalizationProfile, {
                isNawat
              }), evaluation.result?.denominalFamilyProfile), evaluation.result?.placeGentilicNncBoundaryFrame), evaluation.result?.relationalNncBoundaryFrame), evaluation.result?.adverbialNuclearFrame), evaluation.result?.adverbialAdjunctionBoundaryFrame), evaluation.result?.nuclearClauseShell, evaluation.result), evaluation.result?.sentenceLayer), evaluation.result, {
                maxDiagnostics: 1,
                includeDiagnostics: !isPreteritAgentiveLocativeNnc
              });
              renderGeneratedOutputSlotChips(personSub, evaluation.result);
              targetObject.applyConjugationEvaluationPresentation({
                row,
                value,
                evaluation,
                formattedValue: targetObject.formatConjugationDisplay(getConjugationDisplaySurface(evaluation.result))
              });
              applyGrammarFrameRouteDataset(row, evaluation.result);
              renderDenominalAndrewsContractRouteContinuation({
                value,
                evaluation
              });
              if (resolvedTense === "adjetivo-preterito") {
                renderCompoundSourceAdjectivalFunctionContinuation({
                  value,
                  evaluation
                });
                renderDenominalCompoundAdjectivalFunctionContinuation({
                  value,
                  evaluation
                });
                renderIntensifiedAdjectivalFunctionContinuation({
                  value,
                  evaluation
                });
              }
              if (resolvedTense === "patientivo") {
                renderPatientivoAdjectivalFunctionContinuation({
                  value,
                  evaluation,
                  patientivoSource
                });
                renderPatientivoCompoundEmbedContinuation({
                  value,
                  evaluation,
                  patientivoSource
                });
                renderPatientivoNominalCompoundContinuation({
                  value,
                  evaluation,
                  patientivoSource
                });
              }
              if (resolvedTense === "sustantivo-verbal") {
                renderActiveActionCompoundEmbedContinuation({
                  value,
                  evaluation
                });
                renderActiveActionNominalCompoundContinuation({
                  value,
                  evaluation
                });
              }
              if (resolvedTense === "agentivo") {
                renderNominalizedVncAdjectivalFunctionContinuation({
                  value,
                  evaluation
                });
                renderCustomaryAgentiveCompoundEmbedContinuation({
                  value,
                  evaluation
                });
                renderCustomaryAgentiveNominalCompoundContinuation({
                  value,
                  evaluation
                });
              }
              if (resolvedTense === "agentivo-preterito") {
                renderNominalizedVncAdjectivalFunctionContinuation({
                  value,
                  evaluation
                });
                renderPreteritAgentiveCompoundEmbedContinuation({
                  value,
                  evaluation
                });
                renderPreteritAgentiveNominalCompoundContinuation({
                  value,
                  evaluation
                });
                renderPreteritAgentiveOwnerhoodContinuation({
                  value,
                  evaluation
                });
                renderPreteritAgentiveComplementContinuation({
                  value,
                  evaluation
                });
                renderPreteritAgentiveAdverbialContinuation({
                  value,
                  evaluation
                });
              }
              if (resolvedTense === "calificativo-instrumentivo") {
                renderPatientivoCharacteristicPropertyEmbedContinuation({
                  value,
                  evaluation,
                  possessorPrefix
                });
                renderCalificativoInstrumentivoHuaContinuations({
                  value,
                  evaluation
                });
                renderCalificativoInstrumentivoSourceSubjectGeneralUseContinuation({
                  row,
                  value,
                  selection,
                  number,
                  possessorPrefix,
                  objectPrefix: displayObjectPrefix || "",
                  indirectObjectMarker: displayIndirectObjectMarker || "",
                  thirdObjectMarker: displayThirdObjectMarker || "",
                  evaluation
                });
              }
              if (resolvedTense === "instrumentivo" && !possessorPrefix) {
                renderInstrumentivoSourceSubjectPossessiveContinuation({
                  value,
                  selection,
                  number,
                  objectPrefix: displayObjectPrefix || "",
                  indirectObjectMarker: displayIndirectObjectMarker || "",
                  thirdObjectMarker: displayThirdObjectMarker || "",
                  evaluation
                });
              }
              if (resolvedTense === "potencial" || resolvedTense === "potencial-habitual") {
                renderNominalizedVncAdjectivalFunctionContinuation({
                  value,
                  evaluation
                });
              }
              row.appendChild(label);
              row.appendChild(value);
              if (patientivoSource === "tronco-verbal") {
                const troncoSourceVerb = getTroncoDestinationSourceVerb();
                const conversionStems = renderTroncoConversionForms({
                  value,
                  evaluation,
                  sourceVerb: troncoSourceVerb,
                  sourceObjectPrefix: displayObjectPrefix || ""
                });
                addTroncoDestinationCandidates(entry, (conversionStems || []).map(stem => ({
                  stem,
                  sourceVerb: troncoSourceVerb,
                  sourceObjectPrefix: displayObjectPrefix || ""
                })));
                if (value.classList.contains("conjugation-value--conversion-picker")) {
                  targetList.closest(".tense-block")?.classList.add("tense-block--has-conversion-menu");
                }
              }
              targetList.appendChild(row);
            });
          });
        });
      };
      const renderRows = () => {
        nounCombinationEvaluationCache.clear();
        nounToggleAvailabilityMemo = new Map();
        blocks.forEach(entry => {
          renderRowsForList(entry);
          updatePatientivoBlockOrigin(entry);
          updatePatientivoBlockDestination(entry);
        });
        updateNounToggleOptionAvailabilityStyling();
      };
      const setActiveObjectSlot = (slotId, prefix) => {
        const slotState = nounObjectSlotStateById.get(slotId);
        if (!slotState || !slotState.optionMap.has(prefix)) {
          return;
        }
        slotState.activeId = prefix;
        targetObject.setToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey, prefix, {
          syncLock: true
        });
        const slotButtons = nounObjectToggleButtonsById.get(slotId);
        if (slotButtons) {
          setToggleActiveState(slotButtons, prefix);
        }
        if (slotId === "object") {
          activeObjectPrefix = prefix;
          blocks.forEach(entry => {
            if (entry.titleLabel) {
              entry.titleLabel.textContent = resolveNounBlockTitleText(entry);
            }
            entry.block.dataset.tenseBlock = `${prefix}-${entry.blockKey}`;
          });
          updateSectionCategory(prefix === targetObject.OBJECT_TOGGLE_ALL ? "" : prefix);
          if (toggleButtons.size) {
            setToggleActiveState(toggleButtons, prefix);
          }
        }
        updateNounBlockPalettes();
        renderRows();
      };
      const setActivePrefix = prefix => {
        setActiveObjectSlot("object", prefix);
      };
      const setActivePossessor = prefix => {
        const hadPossessor = Boolean(activePossessor);
        const resolvedPrefix = typeof prefix === "string" ? prefix : "";
        activePossessor = resolvedPrefix;
        targetObject.setToggleStateValue(targetObject.PossessorToggleState, possessorKey, resolvedPrefix, {
          syncLock: true
        });
        const hasPossessor = Boolean(resolvedPrefix);
        if (resolvedTense === "patientivo" && hadPossessor !== hasPossessor) {
          renderNounConjugations({
            verb,
            containerId,
            tenseValue: resolvedTense,
            modeKey
          });
          return;
        }
        possessorButtons.forEach((button, key) => {
          const isActive = key === resolvedPrefix;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-pressed", String(isActive));
        });
        refreshNounBlockTitles();
        refreshNounBlockSourcePlacement();
        updateNounBlockPalettes();
        renderRows();
      };
      const setActivePatientivoOwnership = ownership => {
        activePatientivoOwnership = ownership;
        targetObject.setToggleStateValue(targetObject.PatientivoOwnershipState, ownershipKey, ownership, {
          syncLock: true
        });
        setToggleActiveState(ownershipButtons, ownership);
        updateNounBlockPalettes();
        renderRows();
      };
      const setActivePatientivoNominalSuffix = suffix => {
        activePatientivoNominalSuffix = targetObject.getPatientivoNominalSuffixToggleValue(suffix);
        targetObject.setToggleStateValue(targetObject.PatientivoNominalSuffixState, patientivoNominalSuffixKey, activePatientivoNominalSuffix, {
          syncLock: true
        });
        setToggleActiveState(patientivoNominalSuffixButtons, activePatientivoNominalSuffix);
        renderRows();
      };
      const setActivePredicateNominalSourceTense = sourceTense => {
        const normalizedSourceTense = targetObject.normalizePredicateNominalSourceTense(sourceTense);
        activePredicateNominalSourceTense = normalizedSourceTense;
        targetObject.setToggleStateValue(targetObject.ObjectToggleState, predicateNominalSourceTenseKey, normalizedSourceTense, {
          syncLock: true
        });
        setToggleActiveState(predicateNominalSourceTenseButtons, normalizedSourceTense);
        renderNounConjugations({
          verb,
          containerId,
          tenseValue: resolvedTense,
          predicateNominalSourceTense: normalizedSourceTense,
          modeKey
        });
      };
      const setActiveSubject = subjectId => {
        activeSubject = subjectId;
        targetObject.setToggleStateValue(targetObject.SubjectToggleState, subjectKey, subjectId, {
          syncLock: true
        });
        subjectButtons.forEach((button, key) => {
          const isActive = key === subjectId;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-pressed", String(isActive));
        });
        renderRows();
      };
      visibleBlockConfigs.forEach(entry => createTenseBlock(entry));
      if (sourceColumns) {
        sourceColumns.finalize();
      }
      setActivePrefix(activeObjectPrefix);
      setActiveSubject(activeSubject);
      if (showPossessorToggle) {
        setActivePossessor(activePossessor);
      } else {
        renderRows();
      }
    }
    function buildAdjectiveTabRenderContext({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = ""
    }) {
      return buildNounTabRenderContext({
        verb,
        containerId,
        tenseValue,
        modeKey: "adjetivo"
      });
    }
    function renderAdjectiveConjugations({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = ""
    }) {
      if (renderAdjectivalNncFunctionConjugations({
        verb,
        containerId
      })) {
        return;
      }
      renderNounConjugations({
        verb,
        containerId,
        tenseValue,
        modeKey: "adjetivo"
      });
    }
    function resolveAdjectivalNncFunctionTargetSurface(override = null) {
      const adjectivalNnc = override?.adjectivalNnc && typeof override.adjectivalNnc === "object" ? override.adjectivalNnc : null;
      const framedSurface = getPrimaryConjugationSurface(adjectivalNnc);
      if (framedSurface) {
        return framedSurface;
      }
      if (hasConjugationResultFrame(adjectivalNnc)) {
        return "";
      }
      return String(override?.posicionesFormula?.tronco || override?.tronco || "").trim();
    }
    function renderAdjectivalNncFunctionConjugations({
      verb,
      containerId = "all-tense-conjugations"
    } = {}) {
      if (typeof targetObject.resolveAdjectivalNncFunctionOverrideFromInput !== "function" || typeof targetObject.buildConjugationEvaluationRecord !== "function" || typeof targetObject.applyConjugationEvaluationPresentation !== "function") {
        return false;
      }
      const verbInput = targetObject.document.getElementById("verb");
      const override = targetObject.resolveAdjectivalNncFunctionOverrideFromInput(verbInput);
      const targetSurface = resolveAdjectivalNncFunctionTargetSurface(override);
      if (!override?.adjectivalNnc?.enabled || !targetSurface) {
        return false;
      }
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return false;
      }
      const result = typeof targetObject.getCachedSilentGenerateWord === "function" ? targetObject.getCachedSilentGenerateWord({
        silent: true,
        skipValidation: true,
        override
      }) || {} : {};
      const evaluation = targetObject.buildConjugationEvaluationRecord({
        result
      });
      const languageSwitch = targetObject.document.getElementById("language");
      const isNawat = languageSwitch && languageSwitch.checked;
      const frame = result?.adjectivalNncFunctionFrame || {};
      const {
        grid
      } = createObjectSectionGrid(container);
      const tenseBlock = targetObject.document.createElement("div");
      tenseBlock.className = "tense-block tense-block--adjectival-nnc-function";
      tenseBlock.dataset.tenseBlock = "adjetivo-nnc-funcion";
      tenseBlock.dataset.andrewsFunctionBlock = String(frame.lessonRef || "Andrews 40").trim();
      if (typeof targetObject.applyAndrewsTenseAuthorityDataset === "function") {
        targetObject.applyAndrewsTenseAuthorityDataset(tenseBlock, {
          tenseValue: "adjetivo-nnc-funcion",
          mode: targetObject.TENSE_MODE.adjetivo,
          blockKind: "CNN funcion adjetival"
        });
      }
      applyGrammarFrameRouteDataset(tenseBlock, result);
      if (typeof targetObject.applyTenseBlockComboPalette === "function") {
        targetObject.applyTenseBlockComboPalette(tenseBlock, "adjetivo|nnc-funcion");
      }
      const tenseTitle = targetObject.document.createElement("div");
      tenseTitle.className = "tense-block__title";
      const titleLabel = targetObject.document.createElement("span");
      titleLabel.className = "tense-block__label";
      titleLabel.textContent = "CNN en función adjetival";
      tenseTitle.appendChild(titleLabel);
      tenseBlock.appendChild(tenseTitle);
      const list = targetObject.document.createElement("div");
      list.className = "conjugation-list";
      const row = targetObject.document.createElement("div");
      row.className = "conjugation-row";
      row.dataset.objectPrefix = "";
      row.dataset.indirectObjectPrefix = "";
      row.dataset.thirdObjectPrefix = "";
      const label = targetObject.document.createElement("div");
      label.className = "conjugation-label";
      const personLabel = targetObject.document.createElement("div");
      personLabel.className = "person-label";
      personLabel.textContent = "CNN";
      const personSub = targetObject.document.createElement("div");
      personSub.className = "person-sub";
      personSub.textContent = appendGrammarFrameSubLabels([frame.lessonRef || "Andrews 40", frame.functionKind || ""].filter(Boolean).join(" · "), result, {
        maxDiagnostics: 1
      });
      renderGeneratedOutputSlotChips(personSub, result);
      label.append(personLabel, personSub);
      const value = targetObject.document.createElement("div");
      value.className = "conjugation-value";
      targetObject.applyConjugationEvaluationPresentation({
        row,
        value,
        evaluation,
        formattedValue: targetObject.formatConjugationDisplay(getConjugationDisplaySurface(result))
      });
      applyGrammarFrameRouteDataset(row, result);
      row.append(label, value);
      list.appendChild(row);
      tenseBlock.appendChild(list);
      grid.appendChild(tenseBlock);
      renderOutputGuidancePanel({
        verb: targetSurface
      });
      targetObject.updateCalcSummaryAndStatus();
      return true;
    }
    function buildAdverbTabRenderContext({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = ""
    }) {
      return buildNounTabRenderContext({
        verb,
        containerId,
        tenseValue,
        modeKey: "adverbio"
      });
    }
    function renderAdverbConjugations({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = ""
    }) {
      renderNounConjugations({
        verb,
        containerId,
        tenseValue,
        modeKey: "adverbio"
      });
    }
    function renderAllTenseConjugations({
      verb,
      objectPrefix = "",
      onlyTense = null
    }) {
      renderVerbConjugationsCore({
        verb,
        containerId: "all-tense-conjugations",
        tenseValue: onlyTense,
        modeKey: "standard",
        subjectKeyPrefix: "standard",
        subjectSubMode: "universal",
        objectPrefix
      });
    }
    function shouldExposeDeveloperHooks() {
      if (typeof targetObject.window === "undefined") {
        return false;
      }
      try {
        const search = String(targetObject.window.location?.search || "");
        const params = new targetObject.URLSearchParams(search);
        if (params.get("dev-hooks") === "1" || params.get("devhooks") === "1") {
          return true;
        }
        if (params.get("dev") === "1") {
          return true;
        }
      } catch (_error) {
        // Ignore URL parsing failures in non-browser runtimes.
      }
      try {
        return targetObject.window.localStorage?.getItem("nawat_dev_hooks") === "1";
      } catch (_error) {
        return false;
      }
    }
    var DEVELOPER_HOOK_NAMES = Object.freeze(["runRegexEnvelopeLanguageTests", "runComposerDisplayBridgeTests", "runComposerButtonCombinatorialAudit"]);
    var DEV_RUNTIME_CHECKS_ASSET_VERSION = "20260402-dev-checks-115";
    function getDeveloperHookMap(windowObject = null) {
      const scope = windowObject || (typeof targetObject.window !== "undefined" ? targetObject.window : null);
      const hooks = {};
      if (!scope || typeof scope !== "object") {
        return hooks;
      }
      DEVELOPER_HOOK_NAMES.forEach(name => {
        if (typeof scope[name] === "function") {
          hooks[name] = scope[name];
        }
      });
      return hooks;
    }
    var DEV_RUNTIME_CHECKS_LOADING_STATE = "idle";
    function loadDeveloperRuntimeChecksIfEnabled() {
      if (typeof targetObject.window === "undefined" || typeof targetObject.document === "undefined") {
        return Promise.resolve(false);
      }
      if (DEV_RUNTIME_CHECKS_LOADING_STATE !== "idle") {
        return Promise.resolve(DEV_RUNTIME_CHECKS_LOADING_STATE === "loaded");
      }
      const existing = targetObject.document.querySelector("script[data-dev-runtime-checks=\"true\"]");
      if (existing) {
        DEV_RUNTIME_CHECKS_LOADING_STATE = "loaded";
        return Promise.resolve(true);
      }
      DEV_RUNTIME_CHECKS_LOADING_STATE = "loading";
      return new Promise(resolve => {
        const script = targetObject.document.createElement("script");
        script.defer = true;
        script.dataset.devRuntimeChecks = "true";
        script.src = new targetObject.URL(`./scripts/browser_runtime_checks.js?v=${DEV_RUNTIME_CHECKS_ASSET_VERSION}`, targetObject.window.location.href).href;
        script.addEventListener("load", () => {
          DEV_RUNTIME_CHECKS_LOADING_STATE = "loaded";
          resolve(true);
        });
        script.addEventListener("error", () => {
          DEV_RUNTIME_CHECKS_LOADING_STATE = "failed";
          resolve(false);
        });
        targetObject.document.head.appendChild(script);
      });
    }
    var DEV_HOOKS_MODULE_LOADING_STATE = "idle";
    async function installDeveloperHooksIfEnabled() {
      if (typeof targetObject.window === "undefined") {
        return false;
      }
      if (DEV_HOOKS_MODULE_LOADING_STATE !== "idle") {
        return DEV_HOOKS_MODULE_LOADING_STATE === "loaded";
      }
      if (!shouldExposeDeveloperHooks()) {
        return false;
      }
      DEV_HOOKS_MODULE_LOADING_STATE = "loading";
      try {
        await loadDeveloperRuntimeChecksIfEnabled();
        const hooksModuleUrl = new targetObject.URL("./scripts/dev_hooks.mjs", targetObject.window.location.href).href;
        const hooksModule = await import(hooksModuleUrl);
        if (hooksModule && typeof hooksModule.installDeveloperHooks === "function") {
          hooksModule.installDeveloperHooks(getDeveloperHookMap(targetObject.window), {
            windowObject: targetObject.window
          });
          DEV_HOOKS_MODULE_LOADING_STATE = "loaded";
          return true;
        }
        DEV_HOOKS_MODULE_LOADING_STATE = "failed";
        return false;
      } catch (error) {
        DEV_HOOKS_MODULE_LOADING_STATE = "failed";
        console.warn("Developer hooks module not loaded.", error);
        return false;
      }
    }

    const api = {};
    Object.defineProperty(api, "ActiveNawatDenominalAndrewsContractRouteRenderContext", {
        configurable: true,
        enumerable: true,
        get() { return ActiveNawatDenominalAndrewsContractRouteRenderContext; },
        set(value) { ActiveNawatDenominalAndrewsContractRouteRenderContext = value; },
    });
    api.getNawatDenominalAndrewsRenderContextComparableInputs = getNawatDenominalAndrewsRenderContextComparableInputs;
    api.setActiveNawatDenominalAndrewsContractRouteRenderContext = setActiveNawatDenominalAndrewsContractRouteRenderContext;
    api.getActiveNawatDenominalAndrewsContractRouteRenderContextFromDocument = getActiveNawatDenominalAndrewsContractRouteRenderContextFromDocument;
    api.getActiveNawatDenominalAndrewsContractRouteRenderContextFromModel = getActiveNawatDenominalAndrewsContractRouteRenderContextFromModel;
    api.previewActiveNawatDenominalAndrewsContractRouteNextSourceForRendering = previewActiveNawatDenominalAndrewsContractRouteNextSourceForRendering;
    api.renderAllOutputs = renderAllOutputs;
    api.applyOutputPanelShellForTenseMode = applyOutputPanelShellForTenseMode;
    api.getActiveAndrewsOutputJourneyReceipt = getActiveAndrewsOutputJourneyReceipt;
    api.appendOutputJourneyStopRail = appendOutputJourneyStopRail;
    api.getOutputJourneyGateDomainLabel = getOutputJourneyGateDomainLabel;
    api.serializeOutputJourneyGateDomains = serializeOutputJourneyGateDomains;
    api.getOutputJourneyRouteConditionFrames = getOutputJourneyRouteConditionFrames;
    api.serializeOutputJourneyRouteConditionFrames = serializeOutputJourneyRouteConditionFrames;
    api.serializeOutputJourneyStationLineStops = serializeOutputJourneyStationLineStops;
    api.serializeOutputJourneyHistoryLegs = serializeOutputJourneyHistoryLegs;
    api.getOutputJourneyRoutePathLabel = getOutputJourneyRoutePathLabel;
    api.serializeOutputJourneyConcourseStops = serializeOutputJourneyConcourseStops;
    api.serializeOutputJourneyPlatformTracks = serializeOutputJourneyPlatformTracks;
    api.getOutputJourneySourceLayerRoleLabel = getOutputJourneySourceLayerRoleLabel;
    api.serializeOutputJourneySourceLayers = serializeOutputJourneySourceLayers;
    api.getActiveAndrewsStationLineFrameForRendering = getActiveAndrewsStationLineFrameForRendering;
    api.getActiveAndrewsRouteConditionFrameForRendering = getActiveAndrewsRouteConditionFrameForRendering;
    api.getActiveAndrewsSourceLayerFrameForRendering = getActiveAndrewsSourceLayerFrameForRendering;
    api.getActiveAndrewsRideFrameForRendering = getActiveAndrewsRideFrameForRendering;
    api.applyAndrewsStationLineDatasetToSurfaceElement = applyAndrewsStationLineDatasetToSurfaceElement;
    api.applyAndrewsRouteConditionDatasetToSurfaceElement = applyAndrewsRouteConditionDatasetToSurfaceElement;
    api.applyAndrewsSourceLayerDatasetToSurfaceElement = applyAndrewsSourceLayerDatasetToSurfaceElement;
    api.applyAndrewsRideDatasetToSurfaceElement = applyAndrewsRideDatasetToSurfaceElement;
    api.appendOutputJourneyStationLine = appendOutputJourneyStationLine;
    api.appendOutputJourneyConcourse = appendOutputJourneyConcourse;
    api.appendOutputJourneyItinerary = appendOutputJourneyItinerary;
    api.appendOutputJourneySourceLayers = appendOutputJourneySourceLayers;
    api.appendOutputJourneyRouteConditions = appendOutputJourneyRouteConditions;
    api.appendOutputJourneyDimensions = appendOutputJourneyDimensions;
    api.appendOutputJourneyPassengerFrame = appendOutputJourneyPassengerFrame;
    api.appendOutputJourneyPlatform = appendOutputJourneyPlatform;
    api.appendOutputJourneyRideFrame = appendOutputJourneyRideFrame;
    api.appendOutputJourneyNextSource = appendOutputJourneyNextSource;
    api.renderOutputJourneyStrip = renderOutputJourneyStrip;
    api.createLesson4InspectorChip = createLesson4InspectorChip;
    api.createLesson4InspectorLine = createLesson4InspectorLine;
    api.getVisibleNuclearClauseTypeLabel = getVisibleNuclearClauseTypeLabel;
    api.getVisibleNuclearClauseShellLabel = getVisibleNuclearClauseShellLabel;
    api.getAndrewsFirstOutputBlockHoverTitle = getAndrewsFirstOutputBlockHoverTitle;
    api.formatVisibleAndrewsSlotToken = formatVisibleAndrewsSlotToken;
    api.formatVisibleAndrewsFormula = formatVisibleAndrewsFormula;
    api.getVisibleCnvFormulaSurfacePath = getVisibleCnvFormulaSurfacePath;
    api.normalizeVisibleCnvFormulaSurfaceZero = normalizeVisibleCnvFormulaSurfaceZero;
    api.normalizeVisibleCnvFormulaSlotEchoForSurfaceLine = normalizeVisibleCnvFormulaSlotEchoForSurfaceLine;
    api.projectVisibleCnvFormulaEchoToSurface = projectVisibleCnvFormulaEchoToSurface;
    api.projectVisibleCnvFormulaSegmentToSurface = projectVisibleCnvFormulaSegmentToSurface;
    api.isVisibleCnvFormulaDirectionalPart = isVisibleCnvFormulaDirectionalPart;
    api.normalizeVisibleCnvFormulaAlignmentToken = normalizeVisibleCnvFormulaAlignmentToken;
    api.cloneVisibleCnvFormulaAlignmentFeatures = cloneVisibleCnvFormulaAlignmentFeatures;
    api.getVisibleCnvFormulaAlignmentSlotFrame = getVisibleCnvFormulaAlignmentSlotFrame;
    api.getVisibleCnvFormulaAlignmentSlotValue = getVisibleCnvFormulaAlignmentSlotValue;
    api.getVisibleCnvFormulaAlignmentObjectMorph = getVisibleCnvFormulaAlignmentObjectMorph;
    api.splitVisibleCnvFormulaAlignmentConnector = splitVisibleCnvFormulaAlignmentConnector;
    api.resolveVisibleCnvFormulaAlignmentSurfaceSlots = resolveVisibleCnvFormulaAlignmentSurfaceSlots;
    api.buildVisibleCnvFormulaAlignmentTargetFrame = buildVisibleCnvFormulaAlignmentTargetFrame;
    api.buildVisibleCnvFormulaAlignmentSourceFrame = buildVisibleCnvFormulaAlignmentSourceFrame;
    api.buildVisibleCnvFormulaAlignmentOperationFrame = buildVisibleCnvFormulaAlignmentOperationFrame;
    api.getVisibleCnvFormulaAlignmentMismatch = getVisibleCnvFormulaAlignmentMismatch;
    api.isVisibleCnvFormulaAlignmentSourceFrameComplete = isVisibleCnvFormulaAlignmentSourceFrameComplete;
    api.getVisibleCnvFormulaAlignmentPathRecords = getVisibleCnvFormulaAlignmentPathRecords;
    api.alignVisibleCnvFormulaEchoToSurface = alignVisibleCnvFormulaEchoToSurface;
    api.getVisibleCnvFormulaSurfaceForms = getVisibleCnvFormulaSurfaceForms;
    api.getVisibleCnvFormulaSurfaceDisplay = getVisibleCnvFormulaSurfaceDisplay;
    api.buildVisibleCnvFormulaSurfaceFrame = buildVisibleCnvFormulaSurfaceFrame;
    api.normalizeGeneratedOutputVisibleCnvSlotValue = normalizeGeneratedOutputVisibleCnvSlotValue;
    api.visibleCnvFormulaEchoesCoverSurfaceForms = visibleCnvFormulaEchoesCoverSurfaceForms;
    api.dedupeVisibleCnvFormulaEchoEntries = dedupeVisibleCnvFormulaEchoEntries;
    api.getCanonicalVisibleCnvFormulaEchoEntries = getCanonicalVisibleCnvFormulaEchoEntries;
    api.getVisibleCnvFormulaBaseRealizations = getVisibleCnvFormulaBaseRealizations;
    api.getVisibleCnvFormulaConnectorRealizations = getVisibleCnvFormulaConnectorRealizations;
    api.getVisibleCnvFormulaPathRecordValue = getVisibleCnvFormulaPathRecordValue;
    api.getVisibleCnvFormulaPathRecordEntry = getVisibleCnvFormulaPathRecordEntry;
    api.getVisibleCnvFormulaPathRecordSurfaceValue = getVisibleCnvFormulaPathRecordSurfaceValue;
    api.getVisibleCnvFormulaPathRecordVisibleObjectMorph = getVisibleCnvFormulaPathRecordVisibleObjectMorph;
    api.formatVisibleCnvFormulaEchoForPath = formatVisibleCnvFormulaEchoForPath;
    api.getVisibleCnvFormulaEchoEntries = getVisibleCnvFormulaEchoEntries;
    api.getVisibleCnvFormulaEchoes = getVisibleCnvFormulaEchoes;
    api.formatVisibleCnvFormulaEcho = formatVisibleCnvFormulaEcho;
    api.buildVisibleCnvFormulaEchoChips = buildVisibleCnvFormulaEchoChips;
    api.formatVisibleCnvFormulaSurfacePairEcho = formatVisibleCnvFormulaSurfacePairEcho;
    api.createLesson4InspectorPanel = createLesson4InspectorPanel;
    api.collectLesson4TreeNodes = collectLesson4TreeNodes;
    api.getLesson4DiagramNodeLabel = getLesson4DiagramNodeLabel;
    api.getLesson4DiagramNodeMeta = getLesson4DiagramNodeMeta;
    api.appendLesson4DiagramNode = appendLesson4DiagramNode;
    api.appendLesson4CompactDiagram = appendLesson4CompactDiagram;
    api.getLesson4InspectorFormulaOptions = getLesson4InspectorFormulaOptions;
    api.getLesson4InspectorPronounLabels = getLesson4InspectorPronounLabels;
    api.getLesson4InspectorPronounCategoryLabel = getLesson4InspectorPronounCategoryLabel;
    api.appendLesson4NuclearClauseInspector = appendLesson4NuclearClauseInspector;
    api.ensureTenseDescriptionBody = ensureTenseDescriptionBody;
    api.updateTenseDescriptionSummary = updateTenseDescriptionSummary;
    api.appendTenseDescriptionEntries = appendTenseDescriptionEntries;
    api.updateTensePanelDescription = updateTensePanelDescription;
    api.getExplainabilitySelectedTense = getExplainabilitySelectedTense;
    api.resolveOutputPanelProvenance = resolveOutputPanelProvenance;
    api.activateCnnOutputModeForContinuation = activateCnnOutputModeForContinuation;
    api.getSharedLetterPrefixLength = getSharedLetterPrefixLength;
    api.getSurfaceFamilyBaseCutIndex = getSurfaceFamilyBaseCutIndex;
    api.getLetterSliceText = getLetterSliceText;
    Object.defineProperty(api, "NAWAT_PATIENTIVO_BRANCH_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_PATIENTIVO_BRANCH_OPTIONS; },
    });
    Object.defineProperty(api, "DEFAULT_NAWAT_PATIENTIVO_BRANCH", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_NAWAT_PATIENTIVO_BRANCH; },
    });
    Object.defineProperty(api, "NAWAT_TRONCO_CONVERSION_ROUTE_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_TRONCO_CONVERSION_ROUTE_SPECS; },
    });
    Object.defineProperty(api, "NAWAT_VERB_NOUN_CONVERSION_ROUTE_KEYS", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_VERB_NOUN_CONVERSION_ROUTE_KEYS; },
    });
    Object.defineProperty(api, "NAWAT_PATIENTIVO_SOURCE_TENSE_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_PATIENTIVO_SOURCE_TENSE_OPTIONS; },
    });
    Object.defineProperty(api, "NAWAT_PATIENTIVO_SOURCE_TENSE_MENU_GROUPS", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_PATIENTIVO_SOURCE_TENSE_MENU_GROUPS; },
    });
    api.getNawatPatientivoBranchOption = getNawatPatientivoBranchOption;
    api.getNawatPatientivoBranchStateStore = getNawatPatientivoBranchStateStore;
    api.getActiveNawatPatientivoBranch = getActiveNawatPatientivoBranch;
    api.setActiveNawatPatientivoBranch = setActiveNawatPatientivoBranch;
    api.isPatientivoTroncoRouteProfile = isPatientivoTroncoRouteProfile;
    api.isAgentiveMannerRouteProfile = isAgentiveMannerRouteProfile;
    api.isPatientivoSurfaceRouteProfile = isPatientivoSurfaceRouteProfile;
    api.isVerbNounConversionRouteProfile = isVerbNounConversionRouteProfile;
    api.getNawatRoutePlacementName = getNawatRoutePlacementName;
    api.getNawatPatientivoBranchLabel = getNawatPatientivoBranchLabel;
    api.getNawatPatientivoBranchClassLabel = getNawatPatientivoBranchClassLabel;
    api.getNawatPatientivoSourceClassCode = getNawatPatientivoSourceClassCode;
    api.getNawatPatientivoSourceTenseOptionLabel = getNawatPatientivoSourceTenseOptionLabel;
    api.getNawatPatientivoTenseOptionLabel = getNawatPatientivoTenseOptionLabel;
    Object.defineProperty(api, "NOMINALIZATION_SOURCE_UNITS", {
        configurable: true,
        enumerable: true,
        get() { return NOMINALIZATION_SOURCE_UNITS; },
    });
    api.getNominalizationSourceUnitLabel = getNominalizationSourceUnitLabel;
    api.appendNominalizationSourceUnitSubLabel = appendNominalizationSourceUnitSubLabel;
    api.getVerbDerivedNominalizationProfileLabel = getVerbDerivedNominalizationProfileLabel;
    api.buildVerbDerivedNominalizationProfileSubLabels = buildVerbDerivedNominalizationProfileSubLabels;
    api.appendVerbDerivedNominalizationProfileSubLabels = appendVerbDerivedNominalizationProfileSubLabels;
    api.getVisibleDenominalRouteFamilyLabel = getVisibleDenominalRouteFamilyLabel;
    api.buildDenominalFamilyProfileSubLabels = buildDenominalFamilyProfileSubLabels;
    api.appendDenominalFamilyProfileSubLabels = appendDenominalFamilyProfileSubLabels;
    api.buildNawatDenominalSourceEvidenceSubLabels = buildNawatDenominalSourceEvidenceSubLabels;
    api.getNawatLinkedGrammarStageDisplaySurface = getNawatLinkedGrammarStageDisplaySurface;
    api.getNawatLinkedGrammarStageSourceVerb = getNawatLinkedGrammarStageSourceVerb;
    api.buildNawatLinkedGrammarStageSubLabels = buildNawatLinkedGrammarStageSubLabels;
    api.getNawatLinkedGrammarCompactRouteLabel = getNawatLinkedGrammarCompactRouteLabel;
    api.getNawatLinkedGrammarCompactStageLabel = getNawatLinkedGrammarCompactStageLabel;
    api.formatNawatLinkedGrammarCompactChoiceLabel = formatNawatLinkedGrammarCompactChoiceLabel;
    api.createConjugationConversionActionsContainer = createConjugationConversionActionsContainer;
    api.getConjugationConversionActionsForValue = getConjugationConversionActionsForValue;
    api.syncConjugationConversionSurfaceRouteFrame = syncConjugationConversionSurfaceRouteFrame;
    api.getAndrewsCnvCnnNominalRenderingFrame = getAndrewsCnvCnnNominalRenderingFrame;
    api.normalizeAndrewsCnvCnnNominalSurfaceKey = normalizeAndrewsCnvCnnNominalSurfaceKey;
    api.getAndrewsCnvCnnNominalFormulaSurfacePairs = getAndrewsCnvCnnNominalFormulaSurfacePairs;
    api.getAndrewsCnvCnnNominalFormulaSurfacePairForSurface = getAndrewsCnvCnnNominalFormulaSurfacePairForSurface;
    api.getGeneratedOutputResultFrame = getGeneratedOutputResultFrame;
    api.getGeneratedOutputCanonicalFormulaRecords = getGeneratedOutputCanonicalFormulaRecords;
    api.getGeneratedOutputCanonicalFormulaRecord = getGeneratedOutputCanonicalFormulaRecord;
    api.getGeneratedOutputCanonicalFormulaSlots = getGeneratedOutputCanonicalFormulaSlots;
    api.getGeneratedOutputCanonicalFormulaText = getGeneratedOutputCanonicalFormulaText;
    api.getGeneratedOutputStructuredContinuationFormulaSlots = getGeneratedOutputStructuredContinuationFormulaSlots;
    api.getGeneratedOutputStructuredContinuationFormulaEcho = getGeneratedOutputStructuredContinuationFormulaEcho;
    api.normalizeGeneratedOutputStructuredContinuationStem = normalizeGeneratedOutputStructuredContinuationStem;
    api.getGeneratedOutputStructuredContinuationPredicateStem = getGeneratedOutputStructuredContinuationPredicateStem;
    api.getGeneratedOutputCanonicalRealizationRecords = getGeneratedOutputCanonicalRealizationRecords;
    api.getCanonicalFormulaRealizationSurfaceForms = getCanonicalFormulaRealizationSurfaceForms;
    api.getGeneratedOutputCanonicalRealizationSurfaceForms = getGeneratedOutputCanonicalRealizationSurfaceForms;
    api.getGeneratedOutputSelectedRealizationVariant = getGeneratedOutputSelectedRealizationVariant;
    api.getGeneratedOutputCanonicalFormulaRecordById = getGeneratedOutputCanonicalFormulaRecordById;
    api.getGeneratedOutputCanonicalRealizationRecordById = getGeneratedOutputCanonicalRealizationRecordById;
    api.buildGeneratedOutputTypedContinuationFrame = buildGeneratedOutputTypedContinuationFrame;
    api.getCanonicalFormulaSurfacePairsForGeneratedOutput = getCanonicalFormulaSurfacePairsForGeneratedOutput;
    api.getGeneratedOutputRouteContractIdentityParts = getGeneratedOutputRouteContractIdentityParts;
    api.getGeneratedOutputCanonicalContinuationIdentityParts = getGeneratedOutputCanonicalContinuationIdentityParts;
    api.getGeneratedOutputContinuationIdentityKey = getGeneratedOutputContinuationIdentityKey;
    api.applyGeneratedOutputContinuationIdentityDataset = applyGeneratedOutputContinuationIdentityDataset;
    api.getDenominalAndrewsRouteContinuationIdentityKey = getDenominalAndrewsRouteContinuationIdentityKey;
    api.getFormulaSurfacePairsForGeneratedOutput = getFormulaSurfacePairsForGeneratedOutput;
    api.getFormulaSurfacePairForGeneratedOutput = getFormulaSurfacePairForGeneratedOutput;
    api.applyFormulaSurfacePairDatasetToSurfaceLine = applyFormulaSurfacePairDatasetToSurfaceLine;
    api.appendFormulaSurfacePairDetailToSurfaceLine = appendFormulaSurfacePairDetailToSurfaceLine;
    api.applyAndrewsCnvCnnNominalRenderingDataset = applyAndrewsCnvCnnNominalRenderingDataset;
    api.getAndrewsCnvCnnNominalRenderedSurface = getAndrewsCnvCnnNominalRenderedSurface;
    api.appendConjugationConversionSurfaceLines = appendConjugationConversionSurfaceLines;
    api.syncConjugationConversionSurfaceRouteFrameFromActions = syncConjugationConversionSurfaceRouteFrameFromActions;
    api.applyConjugationConversionColumnLayout = applyConjugationConversionColumnLayout;
    api.resolveAndrewsCnvCnnRouteRecordContinuationGroupMeta = resolveAndrewsCnvCnnRouteRecordContinuationGroupMeta;
    api.getVisibleContinuationChipRouteExpectation = getVisibleContinuationChipRouteExpectation;
    api.isAndrewsCnvCnnRouteRecordContinuationGroup = isAndrewsCnvCnnRouteRecordContinuationGroup;
    api.auditVisibleContinuationRouteRecordGroups = auditVisibleContinuationRouteRecordGroups;
    api.auditVisibleContinuationRouteOutputConsistency = auditVisibleContinuationRouteOutputConsistency;
    api.resolveContinuationActionGroupMeta = resolveContinuationActionGroupMeta;
    api.getOrCreateContinuationActionGroup = getOrCreateContinuationActionGroup;
    api.appendContinuationAction = appendContinuationAction;
    api.ensureDenominalAndrewsRouteContinuationDisplay = ensureDenominalAndrewsRouteContinuationDisplay;
    api.getAndrewsCnvCnnRouteSourceRequirementIdsForRendering = getAndrewsCnvCnnRouteSourceRequirementIdsForRendering;
    api.getAndrewsCnvCnnRouteActionContractForRendering = getAndrewsCnvCnnRouteActionContractForRendering;
    api.getVerbNominalContinuationRouteRecordIdFromSourceUnit = getVerbNominalContinuationRouteRecordIdFromSourceUnit;
    api.buildVerbNominalContinuationRouteActionContractForRendering = buildVerbNominalContinuationRouteActionContractForRendering;
    api.formatAndrewsCnvCnnRouteTransitionForRendering = formatAndrewsCnvCnnRouteTransitionForRendering;
    api.appendAndrewsCnvCnnRouteActionTitle = appendAndrewsCnvCnnRouteActionTitle;
    api.clearAndrewsCnvCnnRouteActionDataset = clearAndrewsCnvCnnRouteActionDataset;
    api.applyAndrewsCnvCnnRouteActionDataset = applyAndrewsCnvCnnRouteActionDataset;
    api.getFunctionUseContinuationRouteOwnershipOptions = getFunctionUseContinuationRouteOwnershipOptions;
    api.isAndrewsCnvCnnRouteActionFunctionUseHardBlocked = isAndrewsCnvCnnRouteActionFunctionUseHardBlocked;
    api.blockAndrewsCnvCnnRouteActionHardGateEvent = blockAndrewsCnvCnnRouteActionHardGateEvent;
    api.attachAndrewsCnvCnnRouteActionHardGateClickGuard = attachAndrewsCnvCnnRouteActionHardGateClickGuard;
    api.applyAndrewsCnvCnnRouteActionHardGateState = applyAndrewsCnvCnnRouteActionHardGateState;
    api.renderDenominalAndrewsContractRouteContinuationForValue = renderDenominalAndrewsContractRouteContinuationForValue;
    api.getVerbToNominalContinuationSpecsForTense = getVerbToNominalContinuationSpecsForTense;
    api.appendNawatLinkedGrammarStageSubLabels = appendNawatLinkedGrammarStageSubLabels;
    api.buildNawatLinkedGrammarSelectionSummarySubLabels = buildNawatLinkedGrammarSelectionSummarySubLabels;
    api.appendNawatLinkedGrammarSelectionSummarySubLabels = appendNawatLinkedGrammarSelectionSummarySubLabels;
    api.buildNawatLinkedGrammarSelectedPathSubLabels = buildNawatLinkedGrammarSelectedPathSubLabels;
    api.getNawatLinkedGrammarAppendableSelections = getNawatLinkedGrammarAppendableSelections;
    api.getFirstNawatLinkedGrammarAppendableSelection = getFirstNawatLinkedGrammarAppendableSelection;
    api.buildNawatLinkedGrammarPathExecutionSubLabels = buildNawatLinkedGrammarPathExecutionSubLabels;
    api.buildNawatLinkedGrammarPromotedSourceSubLabels = buildNawatLinkedGrammarPromotedSourceSubLabels;
    api.getNawatLinkedGrammarStageRailKey = getNawatLinkedGrammarStageRailKey;
    api.attachNawatLinkedGrammarStagesToRailStations = attachNawatLinkedGrammarStagesToRailStations;
    api.buildNuclearClauseShellSubLabels = buildNuclearClauseShellSubLabels;
    api.appendNuclearClauseShellSubLabels = appendNuclearClauseShellSubLabels;
    api.normalizeGeneratedOutputSlotChipValue = normalizeGeneratedOutputSlotChipValue;
    api.buildGeneratedOutputSlotPredicateValue = buildGeneratedOutputSlotPredicateValue;
    api.isLesson46PreteritAgentiveLocativeResult = isLesson46PreteritAgentiveLocativeResult;
    api.buildGeneratedOutputVisibleCnvPredicateValue = buildGeneratedOutputVisibleCnvPredicateValue;
    api.buildGeneratedOutputVisibleCnvConnectorValue = buildGeneratedOutputVisibleCnvConnectorValue;
    api.getGeneratedOutputVisibleSurfaceForms = getGeneratedOutputVisibleSurfaceForms;
    api.buildGeneratedOutputSlotSubjectValue = buildGeneratedOutputSlotSubjectValue;
    api.buildGeneratedOutputVncSubjectValue = buildGeneratedOutputVncSubjectValue;
    api.buildGeneratedOutputVisibleCnvSubjectValue = buildGeneratedOutputVisibleCnvSubjectValue;
    api.getGeneratedOutputFormulaSlot = getGeneratedOutputFormulaSlot;
    Object.defineProperty(api, "ANDREWS_RENDERING_TERMS", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_RENDERING_TERMS; },
    });
    Object.defineProperty(api, "GENERATED_OUTPUT_TENSE_CHIP_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return GENERATED_OUTPUT_TENSE_CHIP_LABELS; },
    });
    api.getGeneratedOutputCompactTenseValue = getGeneratedOutputCompactTenseValue;
    api.getGeneratedOutputShellSlots = getGeneratedOutputShellSlots;
    api.buildGeneratedOutputFormulaSlotsFromCnvPath = buildGeneratedOutputFormulaSlotsFromCnvPath;
    api.getGeneratedOutputSlotFormulaType = getGeneratedOutputSlotFormulaType;
    api.getFormulaSurfacePairFormulaType = getFormulaSurfacePairFormulaType;
    api.parseGeneratedOutputVncFormulaEchoSlots = parseGeneratedOutputVncFormulaEchoSlots;
    api.mergeGeneratedOutputFormulaSlots = mergeGeneratedOutputFormulaSlots;
    api.buildGeneratedOutputPatientiveStageValue = buildGeneratedOutputPatientiveStageValue;
    api.getGeneratedOutputLesson2SoundSpellingFrames = getGeneratedOutputLesson2SoundSpellingFrames;
    api.buildGeneratedOutputLesson2ChipValue = buildGeneratedOutputLesson2ChipValue;
    api.getGeneratedOutputLesson2PositionLabel = getGeneratedOutputLesson2PositionLabel;
    api.getGeneratedOutputLesson2SlotLabel = getGeneratedOutputLesson2SlotLabel;
    api.buildGeneratedOutputLesson2ChipDetail = buildGeneratedOutputLesson2ChipDetail;
    api.buildGeneratedOutputSlotChips = buildGeneratedOutputSlotChips;
    api.buildGeneratedOutputCompactSubLabel = buildGeneratedOutputCompactSubLabel;
    api.renderGeneratedOutputSlotChips = renderGeneratedOutputSlotChips;
    api.getGrammarFrameForRendering = getGrammarFrameForRendering;
    api.inferGrammarFrameDiagnosticLayerForRendering = inferGrammarFrameDiagnosticLayerForRendering;
    api.buildGrammarFrameRouteAuditModelForRendering = buildGrammarFrameRouteAuditModelForRendering;
    api.applyGrammarFrameRouteDataset = applyGrammarFrameRouteDataset;
    api.attachUiRouteControlGrammarContract = attachUiRouteControlGrammarContract;
    api.getPatientivoRouteControlAndrewsRefs = getPatientivoRouteControlAndrewsRefs;
    api.getGrammarFrameDiagnosticLabelForRendering = getGrammarFrameDiagnosticLabelForRendering;
    Object.defineProperty(api, "VISIBLE_LCM_EXACT_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return VISIBLE_LCM_EXACT_LABELS; },
    });
    Object.defineProperty(api, "VISIBLE_LCM_ROUTE_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return VISIBLE_LCM_ROUTE_LABELS; },
    });
    Object.defineProperty(api, "VISIBLE_LCM_LAYER_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return VISIBLE_LCM_LAYER_LABELS; },
    });
    Object.defineProperty(api, "VISIBLE_LCM_DIAGNOSTIC_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return VISIBLE_LCM_DIAGNOSTIC_LABELS; },
    });
    Object.defineProperty(api, "VISIBLE_LCM_TOKEN_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return VISIBLE_LCM_TOKEN_LABELS; },
    });
    api.getVisibleLcmExactLabel = getVisibleLcmExactLabel;
    api.formatVisibleLcmTokenSequence = formatVisibleLcmTokenSequence;
    api.formatVisibleLcmStatusLabel = formatVisibleLcmStatusLabel;
    api.formatVisibleLcmRoutePartLabel = formatVisibleLcmRoutePartLabel;
    api.formatVisibleLcmLayerLabel = formatVisibleLcmLayerLabel;
    api.formatVisibleLcmDiagnosticLabel = formatVisibleLcmDiagnosticLabel;
    api.buildGrammarFrameSubLabels = buildGrammarFrameSubLabels;
    api.appendGrammarFrameSubLabels = appendGrammarFrameSubLabels;
    api.buildVncValencyFrameSubLabels = buildVncValencyFrameSubLabels;
    api.appendVncValencyFrameSubLabels = appendVncValencyFrameSubLabels;
    api.buildDerivedVoiceFrameSubLabels = buildDerivedVoiceFrameSubLabels;
    api.appendDerivedVoiceFrameSubLabels = appendDerivedVoiceFrameSubLabels;
    api.buildForwardDerivationFrameSubLabels = buildForwardDerivationFrameSubLabels;
    api.appendForwardDerivationFrameSubLabels = appendForwardDerivationFrameSubLabels;
    api.buildCompoundFrameSubLabels = buildCompoundFrameSubLabels;
    api.appendCompoundFrameSubLabels = appendCompoundFrameSubLabels;
    api.buildAdverbialNuclearFrameSubLabels = buildAdverbialNuclearFrameSubLabels;
    api.appendAdverbialNuclearFrameSubLabels = appendAdverbialNuclearFrameSubLabels;
    api.buildRelationalNncBoundaryFrameSubLabels = buildRelationalNncBoundaryFrameSubLabels;
    api.appendRelationalNncBoundaryFrameSubLabels = appendRelationalNncBoundaryFrameSubLabels;
    api.buildPlaceGentilicNncBoundaryFrameSubLabels = buildPlaceGentilicNncBoundaryFrameSubLabels;
    api.appendPlaceGentilicNncBoundaryFrameSubLabels = appendPlaceGentilicNncBoundaryFrameSubLabels;
    api.buildAdverbialAdjunctionBoundaryFrameSubLabels = buildAdverbialAdjunctionBoundaryFrameSubLabels;
    api.appendAdverbialAdjunctionBoundaryFrameSubLabels = appendAdverbialAdjunctionBoundaryFrameSubLabels;
    api.buildVncVerbstemClassProfileSubLabels = buildVncVerbstemClassProfileSubLabels;
    api.appendVncVerbstemClassProfileSubLabels = appendVncVerbstemClassProfileSubLabels;
    Object.defineProperty(api, "VISIBLE_SENTENCE_LAYER_SLOT_VALUES", {
        configurable: true,
        enumerable: true,
        get() { return VISIBLE_SENTENCE_LAYER_SLOT_VALUES; },
    });
    api.formatVisibleSentenceLayerSlotValue = formatVisibleSentenceLayerSlotValue;
    api.buildSentenceLayerSubLabels = buildSentenceLayerSubLabels;
    api.appendSentenceLayerSubLabels = appendSentenceLayerSubLabels;
    api.getDefaultNawatPatientivoSourceTenseValue = getDefaultNawatPatientivoSourceTenseValue;
    api.getNawatPatientivoRouteSpec = getNawatPatientivoRouteSpec;
    api.getNawatPatientivoSourceRouteKey = getNawatPatientivoSourceRouteKey;
    api.getNawatVerbNounConversionProfiles = getNawatVerbNounConversionProfiles;
    api.getNawatVerbNounConversionLabel = getNawatVerbNounConversionLabel;
    api.getNawatVerbNounConversionHierarchyParts = getNawatVerbNounConversionHierarchyParts;
    api.formatNawatVerbNounConversionHierarchyLabel = formatNawatVerbNounConversionHierarchyLabel;
    api.getNawatTroncoConversionSpec = getNawatTroncoConversionSpec;
    api.getNawatTroncoTenseShortLabel = getNawatTroncoTenseShortLabel;
    api.buildNawatTroncoConversionTrack = buildNawatTroncoConversionTrack;
    api.normalizeDerivationalInputFamilyToken = normalizeDerivationalInputFamilyToken;
    api.isSameDerivationalGuidanceRow = isSameDerivationalGuidanceRow;
    api.buildDerivationalFamilySummaryEntries = buildDerivationalFamilySummaryEntries;
    api.resolveCurrentDerivationalGuidanceEntries = resolveCurrentDerivationalGuidanceEntries;
    api.renderOutputGuidancePanel = renderOutputGuidancePanel;
    api.resolveRenderableVerbValue = resolveRenderableVerbValue;
    api.renderOutputSelectionRequiredPlaceholder = renderOutputSelectionRequiredPlaceholder;
    api.getParticleModeCandidateValue = getParticleModeCandidateValue;
    api.createParticleModeCell = createParticleModeCell;
    api.appendParticleModeHeader = appendParticleModeHeader;
    api.formatParticleModeSourceCell = formatParticleModeSourceCell;
    api.getParticleModeStatusText = getParticleModeStatusText;
    api.appendParticleModeRow = appendParticleModeRow;
    api.renderParticleModeConjugations = renderParticleModeConjugations;
    api.renderOrdinaryNncConjugations = renderOrdinaryNncConjugations;
    api.renderActiveConjugations = renderActiveConjugations;
    api.renderNonactiveConjugationRows = renderNonactiveConjugationRows;
    api.splitConjugationSurfaceText = splitConjugationSurfaceText;
    api.getStructuredConjugationResultFrameSurfaceForms = getStructuredConjugationResultFrameSurfaceForms;
    api.getConjugationResultFrame = getConjugationResultFrame;
    api.hasConjugationResultFrame = hasConjugationResultFrame;
    api.getConjugationFrameSurfaceForms = getConjugationFrameSurfaceForms;
    api.getConjugationSurfaceForms = getConjugationSurfaceForms;
    api.getPrimaryConjugationSurface = getPrimaryConjugationSurface;
    api.getConjugationDisplaySurface = getConjugationDisplaySurface;
    api.resolveNominalNum1Num2Surface = resolveNominalNum1Num2Surface;
    api.buildVerbTenseBlock = buildVerbTenseBlock;
    api.clearUnifiedVerbOutputDataset = clearUnifiedVerbOutputDataset;
    api.rebuildUnifiedVerbOutputDataset = rebuildUnifiedVerbOutputDataset;
    api.renderVerbConjugationBlocks = renderVerbConjugationBlocks;
    api.createObjectSectionGrid = createObjectSectionGrid;
    api.createSourceModeColumns = createSourceModeColumns;
    api.buildToggleControl = buildToggleControl;
    api.setToggleActiveState = setToggleActiveState;
    api.getVerbObjectPrefixGroups = getVerbObjectPrefixGroups;
    api.resolveVerbTenseValue = resolveVerbTenseValue;
    api.buildVerbTabRenderContext = buildVerbTabRenderContext;
    api.renderVerbConjugationsCore = renderVerbConjugationsCore;
    api.renderPretUniversalConjugations = renderPretUniversalConjugations;
    api.renderLocativoTemporalConjugations = renderLocativoTemporalConjugations;
    api.buildNounTabRenderContext = buildNounTabRenderContext;
    api.renderNounConjugations = renderNounConjugations;
    api.buildAdjectiveTabRenderContext = buildAdjectiveTabRenderContext;
    api.renderAdjectiveConjugations = renderAdjectiveConjugations;
    api.resolveAdjectivalNncFunctionTargetSurface = resolveAdjectivalNncFunctionTargetSurface;
    api.renderAdjectivalNncFunctionConjugations = renderAdjectivalNncFunctionConjugations;
    api.buildAdverbTabRenderContext = buildAdverbTabRenderContext;
    api.renderAdverbConjugations = renderAdverbConjugations;
    api.renderAllTenseConjugations = renderAllTenseConjugations;
    api.shouldExposeDeveloperHooks = shouldExposeDeveloperHooks;
    Object.defineProperty(api, "DEVELOPER_HOOK_NAMES", {
        configurable: true,
        enumerable: true,
        get() { return DEVELOPER_HOOK_NAMES; },
        set(value) { DEVELOPER_HOOK_NAMES = value; },
    });
    Object.defineProperty(api, "DEV_RUNTIME_CHECKS_ASSET_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return DEV_RUNTIME_CHECKS_ASSET_VERSION; },
        set(value) { DEV_RUNTIME_CHECKS_ASSET_VERSION = value; },
    });
    api.getDeveloperHookMap = getDeveloperHookMap;
    Object.defineProperty(api, "DEV_RUNTIME_CHECKS_LOADING_STATE", {
        configurable: true,
        enumerable: true,
        get() { return DEV_RUNTIME_CHECKS_LOADING_STATE; },
        set(value) { DEV_RUNTIME_CHECKS_LOADING_STATE = value; },
    });
    api.loadDeveloperRuntimeChecksIfEnabled = loadDeveloperRuntimeChecksIfEnabled;
    Object.defineProperty(api, "DEV_HOOKS_MODULE_LOADING_STATE", {
        configurable: true,
        enumerable: true,
        get() { return DEV_HOOKS_MODULE_LOADING_STATE; },
        set(value) { DEV_HOOKS_MODULE_LOADING_STATE = value; },
    });
    api.installDeveloperHooksIfEnabled = installDeveloperHooksIfEnabled;
    return api;
}

export function installUiRenderingGlobals(targetObject = globalThis) {
    const api = createUiRenderingApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
