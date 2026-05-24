---
name: Causative subtype bug fixes applied 2026-04-03
description: Three fixes applied: verb-change probe missing, CSS missing, deferred pass missing updateDerivationTypeControl
type: project
---

## Fix 1: Verb change did not re-probe subtype availability

**File:** `src/ui/composer/composer.js`, `runVerbInputRefresh()`

**Problem:** When the user typed a new verb, `runVerbInputRefresh` ran `renderTenseTabs()` and `generateWord()` but never called `updateDerivationTypeControl()`. So the Tipo 1 / Tipo 2 buttons would show stale availability (e.g., Tipo 2 enabled for a verb that has no type-two causative, or an already-selected Tipo 2 subtype not being reset when switching to an incompatible verb).

**Fix:** Added `if (typeof updateDerivationTypeControl === "function") { updateDerivationTypeControl(); }` inside `runVerbInputRefresh`, between `renderTenseTabs()` and `generateWord()`.

**Why placed before generateWord:** The subtype state must be corrected (auto-reset to "all" if needed) before `generateWord` runs, so that generation uses the correct effective subtype.

## Fix 2: Deferred availability pass also did not re-probe subtype

**File:** `src/ui/composer/composer.js`, `runDeferredToggleAvailabilityPass()`

**Problem:** Same as Fix 1 but for the idle-typing deferred pass. After the user stops typing and the deferred pass fires, it called `renderTenseTabs()` and `renderActiveConjugations()` but not `updateDerivationTypeControl()`.

**Fix:** Added the same guarded `updateDerivationTypeControl()` call inside `runDeferredToggleAvailabilityPass`, between `renderTenseTabs()` and `renderActiveConjugations()`.

## Fix 3: CSS for causative subtype row was missing entirely

**File:** `style.css`

**Problem:** `.causative-subtype-row`, `.calc-operator-grid--causative-subtype`, and `.calc-operator-chip--sm` had no CSS declarations. The row appeared with no top margin (visually flush against the derivation buttons above), the grid had no explicit column layout, and the `--sm` size modifier did nothing.

**Fix:** Added after `.calc-operator-grid--derivation {}`:
- `.causative-subtype-row { margin-top: var(--layout-gap-tight); }` — separates the subtype row from derivation buttons
- `.calc-operator-grid--causative-subtype { grid-template-columns: repeat(3, minmax(0, 1fr)); }` — explicit 3-column grid for 3 subtype buttons
- `.calc-operator-chip--sm { font-size: calc(var(--font-size-label) - 0.14rem); padding-top: 3px; padding-bottom: 3px; }` — slightly smaller to visually subordinate the subtype row

## Items verified as already correct (no fix needed)

- **Reset on derivation change (issue 1/8):** `updateDerivationTypeControl` early-returns with reset when not causative — correct.
- **typeAvailable.one computation (issue 4):** `probeOpts.some((o) => o.type !== "type-two")` correctly returns false if all options are type-two — correct.
- **effectiveOptions fallback (issue 5):** Kept as safety net. With the verb-change probe now running, the fallback rarely triggers; when it does (timing edge case) it prevents blank output — correct behavior.
- **Cache invalidation (issue 6):** Cache key includes `override.verb` (passed per-call), `getActiveCausativeSubtype()`, and all other relevant state — correct.
- **Labels (issue 3):** "Ambos / Tipo 1 / Tipo 2" — appropriate Spanish labels for this Spanish-language UI.
