import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClassicalNahuatlSourceStemInventoryApi } from "../core/classical/source_stem_inventory.mjs";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDirectory, "..", "..");
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

const shell = read("src/ui/shell/classical_shell.mjs");
const rendering = read("src/ui/rendering/rendering.mjs");
const composer = read("src/ui/composer/composer.mjs");
const application = read("src/application/classical/vnc_application.mjs");
const css = read("style.css");

const authorityStart = shell.indexOf("function ClassicalAuthorityPanel");
const resultStart = shell.indexOf("function ClassicalResultPanel");
const footerStart = shell.indexOf("function ClassicalFooter", resultStart);
assert.ok(authorityStart >= 0 && resultStart > authorityStart && footerStart > resultStart);
const authorityPanel = shell.slice(authorityStart, resultStart);
const resultPanel = shell.slice(resultStart, footerStart);
const sourcePanel = shell.slice(shell.indexOf("function ClassicalSourcePanel"), authorityStart);

for (const controlId of [
  "classical-rule-logic-valence",
  "classical-rule-logic-class"
]) {
  assert.equal(sourcePanel.includes(controlId), true, `${controlId} must remain in Source`);
  assert.equal(authorityPanel.includes(controlId), false, `${controlId} must not return to Authority`);
}

for (const controlId of [
  "classical-rule-logic-nnc-output-scope",
  "classical-rule-logic-vnc-output-scope"
]) {
  assert.equal(authorityPanel.includes(controlId), false, `${controlId} must not return to Authority`);
  assert.equal(resultPanel.includes(controlId), true, `${controlId} must remain in Result`);
}
assert.match(resultPanel, /data-classical-result-scope-controls="true"/);

assert.match(rendering, /createElement\("details"\)[\s\S]{0,900}classical-authority-receipt--result/);
assert.ok(rendering.includes("authorityReceiptCount"));
assert.ok(rendering.includes('className = "classical-authority-receipt__items"'));
assert.ok(css.includes(".classical-authority-receipt:not([open]) > .classical-authority-receipt__items"));

assert.ok(rendering.includes('classicalVncDerivationDefaultState = "collapsed"'));
assert.ok(rendering.includes('classicalVncDerivationEvidence = "canvas-andrews-only"'));
assert.ok(css.includes(".classical-vnc-derivation-explainer:not([open]) > :not(.classical-vnc-derivation-explainer__header)"));
assert.ok(application.includes("participantFormulaSegments"));
assert.ok(rendering.includes("appendParticipantLinkedFormula"));
assert.ok(rendering.includes("dataset.classicalVncParticipant"));

const inventoryAudit = createClassicalNahuatlSourceStemInventoryApi().auditClassicalNahuatlCanonicalSourceStemInventory();
assert.deepEqual(
  {
    vncCount: inventoryAudit.vncCount,
    nncCount: inventoryAudit.nncCount,
    duplicateCount: inventoryAudit.duplicateCount,
    invalidRecordCount: inventoryAudit.invalidRecordCount,
    ok: inventoryAudit.ok
  },
  { vncCount: 160, nncCount: 39, duplicateCount: 0, invalidRecordCount: 0, ok: true }
);
assert.ok(shell.includes('id="classical-vnc-source-stem"'));
assert.ok(composer.includes("getClassicalVncSourceStemStarterPreset"));
assert.ok(composer.includes("applyClassicalVncSourceStemSelection"));

assert.ok(shell.includes('data-derivation-type="causative"'));
assert.ok(shell.includes('data-derivation-type="applicative"'));
assert.equal(shell.includes("rule-generated"), false);

assert.match(composer, /key: "panel",[\s\S]{0,100}segment: "screen"/);
assert.match(composer, /key: "derivationType",[\s\S]{0,100}segment: "derivation"/);
assert.ok(composer.includes("targetObject.setLeftPanelStackMode(normalized.panel)"));
assert.ok(composer.includes("targetObject.setActiveDerivationType(normalized.derivationType)"));

console.log("Public UI decision contract tests passed.");
