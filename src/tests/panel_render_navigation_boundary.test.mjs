import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createUiRenderingApi } from "../ui/rendering/rendering.mjs";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDirectory, "..", "..");

const api = createUiRenderingApi({});
const renderAllOutputsSource = String(api.renderAllOutputs);

assert.match(renderAllOutputsSource, /renderActiveConjugations\s*\(/);
assert.doesNotMatch(
  renderAllOutputsSource,
  /setLeftPanelStackMode|data-active-pane/,
  "the shared renderer must not own panel navigation"
);

const indexHtml = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const browserMain = fs.readFileSync(path.join(projectRoot, "src", "browser", "main.mjs"), "utf8");
const bootstrap = fs.readFileSync(path.join(projectRoot, "src", "bootstrap", "bootstrap.mjs"), "utf8");
const createRuntime = fs.readFileSync(path.join(projectRoot, "src", "runtime", "create_runtime.mjs"), "utf8");
const cacheBoundaryVersion = "20260721-classical-public-runtime-002";

assert.match(indexHtml, /main\.mjs\?v=20260721-classical-public-runtime-002/);
assert.ok(browserMain.includes(`bootstrap.mjs?v=${cacheBoundaryVersion}`));
assert.ok(bootstrap.includes(`create_runtime.mjs?v=${cacheBoundaryVersion}`));
assert.ok(createRuntime.includes(`rendering.mjs?v=${cacheBoundaryVersion}`));

console.log("Panel render/navigation boundary tests passed.");
