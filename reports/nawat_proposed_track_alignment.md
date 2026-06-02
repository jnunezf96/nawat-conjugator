# Nawat Proposed Track Alignment

Date: 2026-06-01
Workspace: `/Users/jaimenunez/Desktop/Nawat_Conjugator`
Status: Proposed design, not as-built.

## Purpose

`railroad_as_built` records what already exists. This file records `proposed_track_alignment`: what should be added next.

The fixed stations are the existing European-convention `adjetivo` and `adverbio` outputs. The proposed tracks must begin in the Nawat convention, travel through the existing generation road network, and end in the Nawat convention. European labels remain hidden aliases for compatibility, not visible destination stations.

## Scope

Current as-built scope covers four of the nine European-convention adjective circuits:

- `adjetivo-preterito-tik`
- `adjetivo-perfecto-tik`
- `adjetivo-preterito-naj`
- `adjetivo-perfecto-naj`

Proposed phase one covers the remaining five in that nine-circuit scope:

| Proposed track | Hidden European alias | Nawat centerline |
| --- | --- | --- |
| `TRK-PROP-ADJ-001` | `adjetivo-preterito` | `V presente -> V preterito` |
| `TRK-PROP-ADJ-002` | `adjetivo-perfecto` | `V presente -> V perfecto` |
| `TRK-PROP-ADJ-003` | `adjetivo-patientivo-no-activo` | `V source -> S patientivo / pasivo-impersonal -> S patientivo surface profile -ti` |
| `TRK-PROP-ADJ-004` | `adjetivo-patientivo-perfectivo` | `V source -> S patientivo / perfectivo -> S patientivo surface profile -ti` |
| `TRK-PROP-ADJ-005` | `potencial-habitual` | `V nonactive -> V presente-habitual` |

Inventory reconciliation: the code also lists `potencial` in the European adjective tab. Strict code inventory therefore finds six uncovered entries, not five. This design keeps `potencial` as `TRK-RES-ADJ-001`, a reserved spur, until the official nine-circuit count is revised or `potencial` is explicitly classified as a Nawat noun route.

The existing adverb route `pasado-remoto-adverbio-activo` already has a profile as `agentive-manner-adverb`; the proposed work is to give it explicit Nawat geometry and a renderer placement so it does not appear to travel to European `adverbio`.

## Design Rule

Every visible route must be driven by Nawat geometry:

- Visible stations use `V`, `S`, `muchiwalis`, `tukayit`, and Nawat route names.
- `legacyMode` and `legacyTenseValue` stay backend aliases.
- No visible breadcrumb may say `Adjetivo`, `Adverbio`, or `Europea:` as its destination.
- Non-tronco routes must not reuse the patientivo-tronco conversion switch.

## Proposed Corridor Schema

Add explicit geometry to `nawatRouteProfiles` before adding more visible tracks:

```json
{
  "routeConvention": "nawat",
  "routePlacement": "direct-finite | patientivo-surface | agentive-manner | nonactive-habitual | patientivo-tronco-conversion",
  "legacyAlias": {
    "mode": "adjetivo",
    "tenseValue": "adjetivo-preterito",
    "visible": false
  },
  "centerline": {
    "id": "CL-direct-preterite",
    "family": "direct-finite",
    "source": { "mode": "verbo", "tenseValue": "presente" },
    "target": { "mode": "verbo", "tenseValue": "preterito" },
    "generation": {
      "mode": "adjetivo",
      "tenseValue": "adjetivo-preterito",
      "surfaceProfile": "legacy-compatible",
      "visibleConvention": "nawat"
    },
    "stationOrder": ["source-mode", "source-tense", "target-mode", "finite-tense"]
  },
  "admission": {
    "valency": "intransitive-only",
    "objectPrefixes": [""]
  }
}
```

The runtime station model should then be selected by `routePlacement`, not by assuming all non-agentive routes pass through patientivo-tronco.

## Centerlines

### Direct Finite Tracks

`TRK-PROP-ADJ-001` and `TRK-PROP-ADJ-002`

| Field | Preterit | Perfect |
| --- | --- | --- |
| Hidden alias | `adjetivo-preterito` | `adjetivo-perfecto` |
| Route placement | `direct-finite` | `direct-finite` |
| Visible path | `V source -> V preterito` | `V source -> V perfecto` |
| Admission | intransitive only | intransitive only |
| Required station model | source mode, source tense, target mode, finite tense | source mode, source tense, target mode, finite tense |
| Required construction | New direct finite route profile and station builder | New direct finite route profile and station builder |

These routes are not patientivo-tronco conversions. They must not show `S patientivo / tronco verbal`, `S stem`, or the `-ti/-na` conversion switch.

### Patientivo Surface Tracks

`TRK-PROP-ADJ-003` and `TRK-PROP-ADJ-004`

| Field | Nonactive patientivo surface | Perfective patientivo surface |
| --- | --- | --- |
| Hidden alias | `adjetivo-patientivo-no-activo` | `adjetivo-patientivo-perfectivo` |
| Route placement | `patientivo-surface` | `patientivo-surface` |
| Visible path | `V source -> S patientivo / pasivo-impersonal -> S patientivo + -ti` | `V source -> S patientivo / perfectivo -> S patientivo + -ti` |
| Admission | active/nonactive-compatible object prefixes | active/nonactive-compatible object prefixes |
| Required station model | source, patientivo branch switch, surface profile, finite patientivo | source, patientivo branch switch, surface profile, finite patientivo |
| Required construction | `patientivoSource`, surface-profile metadata, focused tests | `patientivoSource`, surface-profile metadata, focused tests |

The perfective path can probably use existing native patientivo source handling. The nonactive path needs a dedicated `surfaceProfile: "patientivo-adjectival-ti"` because the legacy output includes surfaces that native `patientivoNominalSuffix: "ti"` does not fully cover yet.

### Nonactive Habitual Track

`TRK-PROP-ADJ-005`

| Field | Value |
| --- | --- |
| Hidden alias | `potencial-habitual` |
| Route placement | `nonactive-habitual` |
| Visible path | `V nonactive -> V presente-habitual` |
| Admission | nonactive-compatible |
| Required station model | source mode, nonactive signal, habitual target |
| Required construction | route target derivation/voice/combined-mode fields |

This track should not be sent to `S agentivo`. It is better modeled as a Nawat verb-side nonactive habitual route.

### Existing Adverb Track Formalization

`TRK-PROP-ADV-001`

| Field | Value |
| --- | --- |
| Hidden alias | `pasado-remoto-adverbio-activo` |
| Existing profile | `agentive-manner-adverb` |
| Route placement | `agentive-manner` |
| Visible path | `V source -> S agentivo / manera` |
| Required construction | renderer placement so the route is visible from the adverb output without naming European `adverbio` |

This stays within existing right-of-way if it uses the current `routePlacement: "agentivo"` schema and station model.

### Reserved Spur

`TRK-RES-ADJ-001`

| Field | Value |
| --- | --- |
| Hidden alias | `potencial` |
| Candidate path | `V presente -> S sustantivo-verbal` |
| Status | reserved pending station-count decision |

The code lists this in the adjective tab, but the current official scope is four of nine, leaving five. Do not build this until the count is explicitly revised or `potencial` is reclassified as a Nawat noun route.

## Engineering Requirements

1. Add a route manifest with statuses: `wired`, `proposed`, `reserved`, `legacy-only`, `not-a-route`.
2. Add route-profile validation to `scripts/check_grammar_data.js`.
3. Add `routePlacement` station builders for:
   - `direct-finite`
   - `patientivo-surface`
   - `nonactive-habitual`
   - `agentive-manner`
   - existing `patientivo-tronco-conversion`
4. Gate the current patientivo branch/conversion injection behind `routePlacement === "patientivo-tronco-conversion"`.
5. Preserve active route state across valid `verbo` and `sustantivo` station travel.
6. Let route profiles specify target derivation/voice/combined mode instead of hard-coding active generation.
7. Extend renderer placement discovery beyond the current hard-coded patientivo-tronco and agentivo cases.
8. Keep generated `.mjs` wrappers synced after source edits.

## Conflict Review

Major conflicts are recorded in `reports/nawat_proposed_track_alignment_conflicts.csv`.

Highest-risk conflicts:

- Station model currently assumes non-agentive means patientivo-tronco.
- Renderer currently injects patientivo branch/conversion around any non-agentive stem.
- Route validation does not yet cover `nawatRouteProfiles`.
- Route state can clear when moving outside European adjective mode.
- The adjective inventory count needs an explicit authority decision for `potencial`.

## Construction Sequence

1. Build route manifest and validation first.
2. Add route-placement station builders.
3. Retrofit existing five route profiles with explicit `routeConvention`, `legacyAlias`, and `centerline`.
4. Add the five phase-one proposed profiles.
5. Add renderer placement rules and guard patientivo-tronco-only switches.
6. Add state and morphology tests for each route family.
7. Regenerate `.mjs` wrappers.
8. Run `node scripts/check_grammar_data.js`, `npm test`, and `npm run test:module`.

## Deliverables

- `reports/nawat_proposed_track_alignment.md`
- `reports/nawat_proposed_track_alignment_layers.json`
- `reports/nawat_proposed_track_alignment_conflicts.csv`
