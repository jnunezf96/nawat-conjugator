import assert from "node:assert/strict";
import { createUiStateModule } from "../ui/state.mjs";

const api = createUiStateModule({});

assert.equal(api.resolvePanelStackSwipeDirection({
  startX: 200,
  startY: 100,
  endX: 100,
  endY: 104,
  durationMs: 200,
}), 1);
assert.equal(api.resolvePanelStackSwipeDirection({
  startX: 100,
  startY: 100,
  endX: 200,
  endY: 104,
  durationMs: 200,
}), -1);
assert.equal(api.resolvePanelStackSwipeDirection({
  startX: 100,
  startY: 100,
  endX: 170,
  endY: 220,
  durationMs: 200,
}), 0);

assert.equal(api.getPanelStackSwipeTargetMode("inputs", 1), "formula");
assert.equal(api.getPanelStackSwipeTargetMode("formula", 1), "output");
assert.equal(api.getPanelStackSwipeTargetMode("output", 1), "");
assert.equal(api.getPanelStackSwipeTargetMode("inputs", -1), "");

assert.equal(api.getPanelStackSwipeVisualOffset({
  deltaX: 100,
  viewportWidth: 390,
  canNavigate: true,
}), 100);
assert.equal(api.getPanelStackSwipeVisualOffset({
  deltaX: 300,
  viewportWidth: 390,
  canNavigate: true,
}), 125);
assert.equal(api.getPanelStackSwipeVisualOffset({
  deltaX: 100,
  viewportWidth: 390,
  canNavigate: false,
}), 22);

const listeners = new Map();
const classes = new Set();
const styles = new Map();
const root = {
  dataset: {},
  classList: {
    add: (...names) => names.forEach((name) => classes.add(name)),
    remove: (...names) => names.forEach((name) => classes.delete(name)),
    toggle: (name, force) => force ? classes.add(name) : classes.delete(name),
  },
  style: {
    setProperty: (name, value) => styles.set(name, value),
    removeProperty: (name) => styles.delete(name),
  },
  addEventListener: (name, listener) => listeners.set(name, listener),
  setPointerCapture: () => {},
  releasePointerCapture: () => {},
  hasPointerCapture: () => true,
};
const stack = {
  getAttribute: (name) => name === "data-active-pane" ? "inputs" : null,
};
const target = {
  closest: () => null,
  parentElement: root,
  scrollWidth: 100,
  clientWidth: 100,
};
const runtime = {
  document: {
    querySelector: (selector) => selector.startsWith(".panel-grid") ? root : stack,
  },
  window: {
    innerWidth: 390,
    matchMedia: () => ({ matches: false }),
    getComputedStyle: () => ({ overflowX: "visible" }),
  },
  setTimeout: () => 1,
  clearTimeout: () => {},
};
const interactiveApi = createUiStateModule(runtime);

assert.equal(interactiveApi.initPanelStackSwipeNavigation(), true);
listeners.get("pointerdown")({
  pointerType: "touch",
  isPrimary: true,
  pointerId: 1,
  clientX: 260,
  clientY: 200,
  target,
});
let prevented = false;
listeners.get("pointermove")({
  pointerId: 1,
  clientX: 140,
  clientY: 204,
  preventDefault: () => { prevented = true; },
});
assert.equal(prevented, true);
assert.equal(classes.has("is-panel-stack-swiping"), true);
assert.equal(root.dataset.panelStackSwipeIntent, "next");
assert.equal(styles.get("--panel-stack-drag-x"), "-120px");
assert.equal(styles.get("--panel-stack-drag-scale"), "0.988");

listeners.get("pointercancel")();
assert.equal(classes.has("is-panel-stack-swiping"), false);
assert.equal(classes.has("is-panel-stack-snapping-back"), true);
assert.equal(styles.get("--panel-stack-drag-x"), "0px");

console.log("Panel stack swipe tests passed.");
