---
name: Key file locations for causative subtype feature
description: Which files own which parts of the causative subtype (Ambos/Tipo 1/Tipo 2) feature
type: reference
---

| Concern | File | Key symbol |
|---|---|---|
| Global state constants and state object | `script.js` | `CAUSATIVE_SUBTYPE`, `CausativeSubtypeState` |
| State accessors, UI probe, button wiring | `src/ui/state.js` | `getActiveCausativeSubtype`, `setActiveCausativeSubtype`, `updateDerivationTypeControl`, `initDerivationTypeControl` |
| Engine gate logic (type-two eligibility) | `src/core/vnc/allomorphy.js` | `computeAllowTypeTwoCausativeForParsedVerb`, `applyCausativeDerivation` |
| Derivation options builder (passes subtype) | `src/core/vnc/vnc.js` | `buildDerivationOptions` |
| Cache key includes subtype | `src/ui/composer/composer.js` | `buildSilentGenerationCacheKey` |
| Verb refresh pipeline (probe must run here) | `src/ui/composer/composer.js` | `runVerbInputRefresh`, `runDeferredToggleAvailabilityPass` |
| HTML structure | `index.html` | `#causative-subtype-row`, `[data-causative-subtype]` |
| Styling | `style.css` | `.causative-subtype-row`, `.calc-operator-grid--causative-subtype`, `.calc-operator-chip--sm` |
