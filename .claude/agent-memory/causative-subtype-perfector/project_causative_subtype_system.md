---
name: Causative subtype system overview
description: Subtypes all/one/two; globals; probe logic; reset rules; engine fallback
type: project
---

## Global state

- `CAUSATIVE_SUBTYPE = Object.freeze({ all, one, two })` in `script.js`
- `CausativeSubtypeState = { subtype: CAUSATIVE_SUBTYPE.all }` in `script.js`
- `getActiveCausativeSubtype()` / `setActiveCausativeSubtype(subtype)` in `src/ui/state.js`

## UI: subtype row

- DOM: `.causative-subtype-row#causative-subtype-row` inside `.calc-operator--derivation` in `index.html`
- Hidden by default (`hidden` attribute); shown only when active derivation type is "causative"
- Buttons use `data-causative-subtype="all|one|two"` and class `calc-operator-chip calc-operator-chip--sm`
- Labels: Ambos / Tipo 1 / Tipo 2 (Spanish UI)

## Probe logic (updateDerivationTypeControl in state.js)

- On each call, if active derivation type != causative: hide row, reset subtype to "all", return early
- If causative: call `computeAllowTypeTwoCausativeForParsedVerb(verbMeta)` to get `allowTypeTwo`, then call `getCausativeDerivationOptions(...)` to probe available types
- `typeAvailable.one = probeOpts.some((o) => o.type !== "type-two")`
- `typeAvailable.two = probeOpts.some((o) => o.type === "type-two")`
- If active subtype is unavailable for current verb, auto-reset to "all"
- Disable buttons for unavailable subtypes; "Ambos" is always available

## Reset rules

- Non-causative derivation selected → reset to "all" (early return in updateDerivationTypeControl)
- Verb changes → updateDerivationTypeControl runs and auto-resets if needed (fixed in 2026-04-03 session)
- Init: `initDerivationTypeControl()` calls `updateDerivationTypeControl()` at end

## Engine: applyCausativeDerivation (allomorphy.js)

- Reads `causativeSubtype` from derivation options
- Filters: one = exclude type-two; two = only type-two; all = no filter
- `effectiveOptions = filteredOptions.length ? filteredOptions : options` — safety fallback prevents blank output if UI state somehow gets ahead of engine

## computeAllowTypeTwoCausativeForParsedVerb (allomorphy.js)

- Accepts a `parsedVerb`-shaped object (the same shape as `getVerbInputMeta()` returns)
- Key fields used: `canonicalRuleBase`, `verb`, `analysisVerb`, `isMarkedTransitive`, `hasLeadingDash`, `rootPlusYaBase`, `totalValenceSlotCount`, `hasNonspecificValence`, `hasSpecificValence`
- Transitive verbs always allow type-two
- Intransitive verbs: type-two gated by phonological/morphological conditions (ends with -u, -a with type-two list, -ni/-uwa, -lu monosyllable, -ki CV pattern)

**Why:** This function is the single source of truth for type-two availability, used by both the UI probe and the engine, ensuring they stay in sync.
