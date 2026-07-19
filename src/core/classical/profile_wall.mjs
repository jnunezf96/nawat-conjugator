// Canonical modern ESM module.

export function createClassicalNahuatlProfileWallApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_PROFILE_WALL_VERSION = 1;
    const CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID = "classical-nahuatl";
    const CLASSICAL_NAHUATL_WALL_NAWAT_PIPIL_PROFILE_ID = "nawat-pipil";
    const CLASSICAL_NAHUATL_WALL_TRANSCRIPTION_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    function normalizeClassicalNahuatlProfileWallMode(mode = "") {
      return mode === CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID ? CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID : CLASSICAL_NAHUATL_WALL_NAWAT_PIPIL_PROFILE_ID;
    }
    function buildClassicalNahuatlProfileWallFrame(mode = CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID, options = {}) {
      const activeProfileId = normalizeClassicalNahuatlProfileWallMode(mode);
      const classicalLaneActive = activeProfileId === CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID;
      return {
        kind: "classical-nahuatl-profile-wall-frame",
        version: CLASSICAL_NAHUATL_PROFILE_WALL_VERSION,
        activeProfileId,
        classicalProfileId: CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID,
        nawatPipilProfileId: CLASSICAL_NAHUATL_WALL_NAWAT_PIPIL_PROFILE_ID,
        classicalLaneActive,
        authorityScope: "selected-language-profile",
        separationMechanism: "profile-selection",
        spellingInspection: "not-performed",
        sourceAuthority: "Andrews transcription",
        grammarAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_WALL_TRANSCRIPTION_SOURCE_DOCUMENT,
        outputLanguage: "Classical Nahuatl",
        outputAuthority: "Andrews transcription",
        orthographyAuthority: "Andrews transcription",
        orthographyPolicy: "transcription-direct",
        classicalOutputImport: classicalLaneActive ? "authorized-within-classical-lane" : "inactive-outside-classical-lane",
        oldNawatPipilConjugatorAuthority: "not-authority-for-classical-lane",
        nawatPipilGrammarAuthorityForClassical: "not-authority-for-classical-lane",
        nawatPipilOrthographyBridge: "not-applied",
        nawatPipilOutputAuthority: "not-authority-for-classical-lane",
        modernNawatPipilAuthority: "not-authority-for-classical-lane",
        sharedRuntimePolicy: "shared-ui-shell-only",
        mayInspectNawatPipilSpellingFromClassical: false,
        mayUseNawatPipilGrammarForClassical: false,
        mayUseOldConjugatorForClassical: false
      };
    }
    function isClassicalNahuatlLaneActive(mode = CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID) {
      return buildClassicalNahuatlProfileWallFrame(mode).classicalLaneActive;
    }
    function installClassicalNahuatlProfileWallClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        CLASSICAL_NAHUATL_PROFILE_WALL_VERSION,
        normalizeClassicalNahuatlProfileWallMode,
        buildClassicalNahuatlProfileWallFrame,
        isClassicalNahuatlLaneActive
      });
      return globalTarget;
    }
    installClassicalNahuatlProfileWallClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_PROFILE_WALL_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_PROFILE_WALL_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_WALL_CLASSICAL_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_WALL_NAWAT_PIPIL_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_WALL_NAWAT_PIPIL_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_WALL_TRANSCRIPTION_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_WALL_TRANSCRIPTION_SOURCE_DOCUMENT; },
    });
    api.normalizeClassicalNahuatlProfileWallMode = normalizeClassicalNahuatlProfileWallMode;
    api.buildClassicalNahuatlProfileWallFrame = buildClassicalNahuatlProfileWallFrame;
    api.isClassicalNahuatlLaneActive = isClassicalNahuatlLaneActive;
    api.installClassicalNahuatlProfileWallClassicGlobals = installClassicalNahuatlProfileWallClassicGlobals;
    return api;
}

export function installClassicalNahuatlProfileWallGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlProfileWallApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
