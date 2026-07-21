import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createUiPanelsContext } from "../ui/panels/panels.mjs";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDirectory, "..", "..");
const readProjectFile = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

const activeClasses = new Set(["is-language-nawat-pipil"]);
const body = {
  dataset: {},
  classList: {
    add: value => activeClasses.add(value),
    remove: value => activeClasses.delete(value)
  }
};
const runtimeTarget = {
  document: { body },
  CLASSICAL_NAHUATL_PUBLIC_RUNTIME: Object.freeze({
    profileId: "classical-nahuatl",
    outputLanguage: "Classical Nahuatl",
    active: true
  }),
  isClassicalNahuatlPublicRuntime: () => true
};
Object.defineProperties(runtimeTarget, Object.getOwnPropertyDescriptors(createUiPanelsContext(runtimeTarget)));

assert.deepEqual(runtimeTarget.CLASSICAL_NAHUATL_PUBLIC_RUNTIME, {
  profileId: "classical-nahuatl",
  outputLanguage: "Classical Nahuatl",
  active: true
});
assert.equal(runtimeTarget.isClassicalNahuatlPublicRuntime(), true);
const authorityFrame = runtimeTarget.initializeClassicalNahuatlPublicRuntime();
assert.equal(activeClasses.has("is-language-nawat-pipil"), false);
assert.equal(activeClasses.has("is-language-classical"), true);
assert.equal(authorityFrame.active, true);
assert.equal(authorityFrame.activeMode, "classical-nahuatl");

const panels = readProjectFile("src/ui/panels/panels.mjs");
const scriptRuntime = readProjectFile("src/bootstrap/script_runtime.mjs");
const state = readProjectFile("src/ui/state.mjs");
const css = readProjectFile("style.css");
const i18n = readProjectFile("src/ui/i18n/i18n.mjs");
const staticLabels = readProjectFile("data/static_labels.json");

for (const obsoleteName of [
  "normalizeLanguageProfileMode",
  "getActiveLanguageProfileMode",
  "getDefaultLanguageProfileMode",
  "getStoredLanguageProfileMode",
  "getLanguageProfileButtons",
  "applyLanguageProfileMode",
  "initLanguageProfileControl"
]) {
  assert.equal(panels.includes(obsoleteName), false, `${obsoleteName} must not remain in the public panel runtime`);
}
assert.equal(scriptRuntime.includes("LANGUAGE_PROFILE_STORAGE_KEY"), false);
assert.equal(state.includes("--panel-stack-drag-progress"), false);
assert.equal(css.includes("--panel-stack-drag-progress"), false);
assert.equal(css.includes("language-profile-control"), false);
assert.equal(css.includes("language-profile-buttons"), false);
assert.equal(css.includes("interface-language-control"), false);
assert.equal(i18n.includes("language-profile-nawat-pipil"), false);
assert.equal(staticLabels.includes("language-profile-nawat-pipil"), false);

console.log("Public Classical runtime boundary tests passed.");
