# Nawat Breadcrumb Rail Certification

Date: 2026-06-01
Record ID: `NAWAT-RAIL-ASBUILT-2026-06-01`
Status: Accepted as the current authoritative as-built record.

Scope: current Nawat tracks reach only four of the nine European-convention adjective circuits: `adjetivo-preterito-tik`, `adjetivo-perfecto-tik`, `adjetivo-preterito-naj`, and `adjetivo-perfecto-naj`.

## Review

The previous as-built report was rejected as stale because it recorded patientivo as a fixed `S patientivo -> S tronco verbal` path and omitted the new branch dropdown. The corrected record now treats `S patientivo` as the branch station and records `tronco verbal` as the substation that opens the conversion fast track.

## Corrections Accepted

- `activePatientivoBranch` is declared in `NawatRouteState`.
- Patientivo branch options and state are shared by the ordinary breadcrumb and conversion approach.
- The conversion approach no longer forces the selected branch to `tronco-verbal`.
- The conversion approach is guarded so non-tronco patientivo branches keep the ordinary patientivo breadcrumb.
- Active conversion trails now include `S patientivo / tronco verbal` before the stem station in the official map.
- GIS/CAD-style layers and an asset inventory were produced.
- The accepted map is explicitly limited to 4 of 9 European-convention adjective circuits.

## Conditions

This certification is for the current rail as built. Future-Nawat work still has open boundaries:

- European `routeMode` and `routeTenseValue` metadata now back route generation.
- Five European-convention adjective circuits remain unmapped by the current Nawat tracks.
- Particle mode exists in Nawat mode data but has no breadcrumb route yet.
- Ordinary fallback station clicks still navigate UI panels rather than using active route station travel for every movement.
- The rail shell still has the compatibility HTML id `conversion-rail-block` and aria label `Conversión actual`.

## Accepted Records

- `reports/nawat_breadcrumb_railroad_as_built.md`
- `reports/nawat_breadcrumb_railroad_layers.json`
- `reports/nawat_breadcrumb_asset_inventory.csv`
