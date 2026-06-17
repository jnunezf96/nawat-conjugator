# Nahuatl To Nawat Letter Conversion Notes

These notes describe the current project convention for realizing Classical
Nahuatl grammar-rule spellings from Andrews in modern Nawat/Pipil letters.
They are a bridge for rule surfaces and diagnostics, not lexical evidence and
not a full historical phonology.

## Authority Boundary

- Andrews is authority for grammar architecture: operations, slots, roles,
  derivational categories, and boundaries.
- Nawat/Pipil orthography is authority for spelling realization.
- Repo evidence and user-provided Nawat forms decide lexical exceptions and
  fixture-backed surfaces.
- A converted Classical spelling does not become a Nawat fixture by itself.

## Current Letter Bridge

| Classical spelling | Nawat spelling | Example |
| --- | --- | --- |
| `tl` | `t` | `(xochi)-tl` -> `(shuchi)-t` |
| `tla` | `ta` | `tla-(pa-tla)` -> `ta-(pa-ta)` |
| `z` | `s` | `z/liz` -> `s/lis` |
| `x` | `sh` | `xochitl` -> `shuchit` |
| `qu` | `k` | `quetza` -> `ketza` as rule spelling |
| `c` before `e/i` | `s` | `cihuatl` -> `siwat` |
| `c` elsewhere | `k` | `c-ti-ya` -> `k-ti-ya` |
| `cu`, `uc` | `kw` | rule spelling only |
| `hu`, `uh` | `w` | `lo-hua` -> `lu-wa`; `hua-lo` -> `wa-lu` |
| `hui` | `wi` | `hui-lia` -> `wi-lia` |
| `hua` | `wa` | `hua` -> `wa` |
| `o` | `u` | `o-a` -> `u-a` |
| `ch` | `ch` | unchanged |
| `tz` | `tz` | unchanged |
| vowel length `:` | removed | diagnostic-only loss |

## Syllable-Initial Guide

Use this table for Classical spellings at the beginning of a syllable or stem
segment. These are rule-spelling notes; fixture-backed Nawat data can still
override a particular lexical item.

| Classical syllable-initial spelling | Nawat spelling | Notes |
| --- | --- | --- |
| `a`, `e`, `i`, `u` | `a`, `e`, `i`, `u` | Plain vowels stay plain. Classical `u` should not be treated as consonantal `w` unless it is part of `cu`, `hu`, `qu`, `uc`, or `uh`. |
| `o` | `u` | Current bridge realizes Classical `o` as Nawat `u`. |
| `p`, `t`, `m`, `n`, `l`, `y` | same | Shared simple consonants. |
| `ch` | `ch` | Shared digraph. |
| `tz` | `tz` | Shared digraph in the current project profile. |
| `tl` | `t` | Includes `tla- -> ta-`; keep the grammar slot/connector separate from the letter conversion. |
| `c` before `e/i` | `s` | Front-vowel environment. |
| `c` elsewhere | `k` | Includes `c` before `a`, `o/u`, consonant, or boundary. |
| `qu` | `k` | Classical `qu` is the `k` spelling before front vowels. |
| `cu` | `kw` | Syllable-initial labialized onset. |
| `hu` | `w` | Syllable-initial `hu` before a vowel. |
| `h` | `j` or slot-specific value | Bare consonantal `h` maps to Nawat `j`; if the `h` is a num2 subposition morph, the agreement/connector slot realizes it as `t`. |
| `z` | `s` | Current bridge uses `z -> s`. |
| `x` | `sh` | Current bridge uses `x -> sh`. |

## Syllable-Final Guide

Some Classical spellings need a second, context-sensitive step after the basic
letter bridge. These variants depend on syllable position, morphology, and the
current Nawat spelling convention for the specific route or fixture.

| Classical syllable-final spelling | Nawat possibilities | Notes |
| --- | --- | --- |
| final vowel `a`, `e`, `i`, `u` | same | Plain final vowels stay plain unless a later morphophonemic rule applies. |
| final vowel `o` | `u` | Same `o -> u` bridge as elsewhere. |
| `-p`, `-t`, `-n`, `-l` | same | Shared final consonants in the current note set. |
| `-m` | `-n` | Nawat surface cleanup: coda `m` assimilates to `n` before a consonant or word-finally. |
| `-y` | `-sh` or `-s` | Nawat surface cleanup: coda `y` shifts to `sh`; some intransitive recent-`s` environments use `s`. |
| `-ch` | `-ch` | Shared final digraph. |
| `-tz` | `-tz` | Current project spelling; `ts` would be an orthography-profile decision, not a grammar change. |
| `-tl` | `-t` | Especially important for nounstem/NNC connector outputs. |
| `-c` | `-k` | Classical final `c` realizes as Nawat `k`. |
| `-qu` | `-k` | Rare/final spelling should resolve to `k` if it represents the same velar stop. |
| `-z` | `-s` | Current bridge uses `z -> s`. |
| `-x` | `-sh` | Current bridge uses `x -> sh`. |
| `-uh` | `-w`, `-uj`, `-j` | Syllable-final output may need `w`, `uj`, or `j` depending on the stem and slot. |
| `-uc` | `-k`, `-ku` | Syllable-final realization may reduce to `k` or show `ku` with support vowel/segmentation. |
| `-kw` after conversion | `-k` | Nawat surface cleanup: coda `kw` reduces to `k` before a consonant or word-finally. |
| `-h` | `-j` or `-t` | Slot-sensitive. Consonantal `-h` maps to Nawat `-j`; `-h` in the num2 subposition maps through the Nawat agreement/connector slot as `-t`. The current generic bridge leaves bare `-h` unconverted to avoid false morphology. |

Initial and final rules should not be collapsed into one global replacement
table. A future engine rule should ask which slot produced the segment before
choosing among the surface variants.

## Grammar-Slot Realization

Letter conversion should happen after the grammar slot is known. Andrews
formulas use subpositions such as `pers1`, `pers2`, `num1`, and `num2`; those
subpositions can have different Nawat realizations even when the Classical
letter string looks similar.

For ordinary NNC work, the structural formula is:

```text
#pers1-pers2(STEM)num1-num2#
```

The current engine records this through `formulaSlots`:

- `subjectPerson.slot = "pers1-pers2"`
- `predicate.slot = "STEM"`
- `subjectNumberConnector.slot = "num1-num2"`

| Grammar slot | What it controls | Current Nawat realization principle |
| --- | --- | --- |
| `pers1` | Left side of the person dyad | Use the Nawat participant inventory, e.g. subject `ni`, `ti`, `Ø`, `an`, or possessor/object inventory where that role is active. |
| `pers2` | Right side of the person dyad | Do not infer a letter conversion without role metadata. If it is vacant, show `Ø`; if a route supplies material, realize it from that route's participant inventory. |
| `STEM` | Predicate/core stem | Apply the letter bridge and stem morphophonemics appropriate to the source route; do not mix stem letters with connector letters. |
| `num1` | First part of the number connector | Use the NNC/VNC connector contract. For ordinary NNC noun classes, the current combined connector is `t`, `ti`, `in`, or `Ø`. |
| `num2` | Second part of the number connector | This is where Classical `-h` can correspond to Nawat `-t` when the grammar says the `-h` is the num2 filler. |
| possessor slot | Possessive predicate state | Use Nawat possessor prefixes such as `nu`, `mu`, `i`, `tu`, `anmu`, `in`; do not treat them as ordinary stem letters. |
| object slot | VNC object/valence position | Use the Nawat object inventory and shuntline/mainline rules; do not derive object prefixes from English or Spanish labels. |
| reflexive slot | VNC same-participant object relation | Mainline reflexive uses the object/valence slot (`mo` structurally, Nawat `mu`); shuntline reflexive uses `ne` where the route requires it. |
| tense/mood slot | VNC inflectional position | VNC-only. Do not add a tense slot to NNC output; do not derive tense/mood surfaces from letter conversion alone. |
| derivational/source slot | Route operation before or around the stem | Apply Andrews' operation first, then realize the rule spelling in Nawat letters. This is route metadata, not a blind suffix replacement. |

Important split:

- Consonantal `h` in a stem or ordinary spelling position maps to Nawat `j`.
- Classical `-h` in the `num2` subposition maps to Nawat `-t`.
- A bare string `-h` cannot decide between those two by itself. The engine must
  know whether it is looking at stem spelling or at the `num2` slot.
- Current ordinary NNC code still exposes a combined
  `subjectNumberConnector` object for `num1-num2`; if a later phase needs exact
  internal `num1` versus `num2` display, it should split that object without
  changing generated surfaces first.

## Classical/Nawat Slot Analogue Inventory

Use these tables as slot analogues, not as permission to copy Classical
surfaces. The left side names the Classical/Andrews structural slot or common
Classical spelling; the right side names the Nawat/Pipil slot realization used
or expected by the current project.

### NNC Formula Slots

| Slot | Classical/Andrews analogue | Nawat/Pipil analogue | Current project field |
| --- | --- | --- | --- |
| `pers1` | Left member of subject-person dyad | Subject prefix such as `ni`, `ti`, `Ø`, `an` according to Nawat participant inventory | `formulaSlots.subjectPerson.prefix` |
| `pers2` | Right member of subject-person dyad | Subject suffix/right member; often `Ø` in singular/common NNC rows, `t` where Nawat plural subject agreement is active | `formulaSlots.subjectPerson.suffix` |
| `STEM` | Predicate nounstem or VNC core used as predicate | Nawat stem surface after source-route spelling and morphophonemic rules | `formulaSlots.predicate.stem` |
| `num1` | First member of subject-number connector | Part of the connector contract; currently bundled with `num2` for ordinary NNC output | `formulaSlots.subjectNumberConnector` |
| `num2` | Second member of subject-number connector; Classical `-h` can occur here | Nawat `-t` when `-h` is the num2 filler; otherwise slot-specific connector value | `formulaSlots.subjectNumberConnector` |
| predicate state | Absolutive or possessive state of the predicate | `absolutive` or `possessive`; state belongs to the predicate, not to the connector | `categoryProfile.predicateState` |
| possessor | Possessor participant in possessive-state NNCs | Nawat possessor prefix, e.g. `nu`, `mu`, `i`, `tu`, `anmu`, `in` | `possessor`, `categoryProfile.possessiveState` |

### Subject-Person Slot Analogues

| Person/number | Classical subject analogue | Nawat subject analogue | Slot note |
| --- | --- | --- | --- |
| 1sg | `ni...Ø` | `ni...Ø` | `pers1 = ni`, `pers2/num2 = Ø` |
| 2sg | `ti...Ø` | `ti...Ø` | `pers1 = ti`, `pers2/num2 = Ø` |
| 3sg | `Ø...Ø` | `Ø...Ø` | Silent subject person remains a real slot filler. |
| 1pl | `ti...h` where the Classical formula uses plural `-h` | `ti...t` | Classical num2 `-h` corresponds to Nawat num2 `-t`. |
| 2pl | `an...h` where the Classical formula uses plural `-h` | `an...t` | Same num2 mapping. |
| 3pl | `Ø...h` where the Classical formula uses plural `-h` | `Ø...t` | Same num2 mapping. |

### Possessor Slot Analogues

| Person/number | Classical possessor analogue | Nawat possessor analogue | Notes |
| --- | --- | --- | --- |
| 1sg | `no-/no` | `nu` | Current Nawat possessor prefix. |
| 2sg | `mo-/mo` | `mu` | Current Nawat possessor prefix. |
| 3sg | `i-/i` | `i` | Current Nawat possessor prefix. |
| 1pl | `to-/to` | `tu` | Current Nawat possessor prefix. |
| 2pl | `amo-/amo` | `anmu` | Current Nawat possessor prefix. |
| 3pl | `in-/in` | `in` | Current Nawat possessor prefix. |

Possessor prefixes are predicate-state participants. They are not part of the
stem and are not the same thing as the subject `pers1-pers2` dyad.

### Object/Valence Slot Analogues

| Object role | Classical analogue | Nawat analogue | Notes |
| --- | --- | --- | --- |
| 1sg specific object | `nech` | `nech` | Specific object inventory. |
| 2sg specific object | `mitz` | `metz` | Nawat spelling/lexical inventory. |
| 3sg specific object | `c-/qu-` | `ki-/k-` | Nawat object prefix has `ki~k` behavior. |
| 1pl specific object | `tech` | `tech` | Specific object inventory. |
| 2pl specific object | `amech` | `metzin` | Current Nawat object inventory uses `metzin`. |
| 3pl specific object | `quin` | `kin` | Classical `qu` maps to Nawat `k`. |
| nonhuman nonspecific object | `tla` | `ta` | Classical `tla` maps to Nawat `ta`. |
| human nonspecific object | `te` | `te` | Shared slot value in the current project. |
| reflexive mainline object | `n-o`, `t-o`, `m-o` | `mu` for all persons | Andrews has person-shaped mainline reflexives; Nawat has one visible mainline reflexive object, and person comes from the subject slot. |
| shuntline reflexive object | `ne` | `ne` | Used where the grammar requires the shuntline reflexive. |

Object prefixes belong to the VNC valence/object slot. They should not be
created from NNC possessor labels or from translation labels.

### Reflexive Slot Analogues

Reflexive material is a participant/valence relation, not a noun possessor and
not a generic letter conversion. The engine must know whether the surface is
inside an object/reflexive slot, a possessor slot, or a source-route slot before
choosing the Nawat spelling.

Andrews treats reflexive forms as a full object-pronoun class, not as one
surface prefix. Appendix C groups the mainline reflexive objects as `m-o`,
`n-o`, and `t-o`, while using `m-o` as the representative label for the class in
combination tables. Nawat realizes the mainline reflexive object with one
visible form, `mu`, for all persons. Person and number belong to the subject
slot; reflexive history still belongs in metadata because derivational routing
depends on whether the reflexive is mainline, shuntline, imported,
source-inherited, or reduplicated.

| Reflexive relation | Classical/Andrews analogue | Nawat/Pipil analogue | Slot boundary |
| --- | --- | --- | --- |
| first-person mainline reflexive | `n-o` | `mu`; subject slot carries first person | VNC object/valence slot; do not rewrite Nawat subject or possessor slots from this form. |
| first-plural mainline reflexive | `t-o` | `mu`; subject slot carries first plural | VNC object/valence slot; Classical person shape is structural, not a separate Nawat surface fixture. |
| non-first mainline reflexive / representative reflexive class | `m-o` | `mu`; subject slot carries the actual person/number | VNC object/valence slot; Appendix C uses `m-o` as a representative for the full class. |
| shuntline reflexive object | `ne` reflexive object | `ne` | VNC shuntline object/valence slot. |
| same-person reflexive selection | subject and object refer to the same participant | route selects reflexive object behavior, normally `mu` in mainline VNC rows | Participant-frame relation; do not infer from a label alone. |
| reflexive source feeding nonactive/patientive routes | source reflexive may be represented through shuntline behavior | route may expose `ne` even when the active source is reflexive `mu` | Derivational/source route, not a new object inventory item. |
| reduplicated mainline reflexive | `n-oh-o`, `t-oh-o`, `m-oh-o` | route-specific Nawat reflexive reduplication; current data includes `mujmu`/`m` as reflexive-affix variants, not a global rule | Lesson 27 frequentative/reflexive route; the `h` belongs to the reduplicated reflexive slot, not to `num2`. |
| reflexive/reciprocative object | reflexive class can also serve reciprocative readings in multiple-object routes | current Nawat needs route evidence before adding a distinct visible form | Participant relation; do not derive from translation alone. |
| 2sg possessor homograph | Classical `mo-` possessor | Nawat `mu` possessor | Possessor slot. This is not the reflexive `mu` object slot. |

The same visible Nawat string can belong to different slots. For example,
`mu` can be a 2sg possessor in a possessive-state NNC, or a reflexive object in
a VNC. Those are different grammar slots and should stay different in metadata,
diagnostics, and UI controls.

### Reflexive Combination Families

These are the Andrews reflexive slot families to preserve before any future UI
chip or engine route tries to display them. They are structural families, not a
complete license to generate every Nawat surface.

| Family | Classical/Andrews structural forms | Nawat/Pipil analogue | Why it matters |
| --- | --- | --- | --- |
| single mainline reflexive | `n-o`, `t-o`, `m-o` | `mu` for all persons; subject slot carries person/number | A single-object reflexive VNC is not the same as a possessive-state NNC with `mu`. |
| added mainline reflexive over nonspecific source | `m-o+te`, `m-o+tla` | `mu+te`, `mu+ta` when Nawat route permits it | Object order follows form priorities, not English direct/indirect labels. |
| added mainline reflexive over specific source | `qu-im+m-o`, `qui-0+m-o`, `n-ech+m-o` and related combinations | projective object plus `mu`, with shuntline/silent metadata where needed | Specific projective objects can remain visible before a mainline reflexive. |
| source reflexive downgraded by a new mainline object | `te+ne`, `tla+ne`, `qu-in+ne`, `qui-0+ne`, `n-ech+ne` | new mainline object plus shuntline `ne` | Passive, causative, applicative, nominal, and patientive routes often need `mu -> ne`. |
| added reflexive over source reflexive | `m-o2+ne`, and in larger histories `m-o3+ne2+ne` | visible `mu` plus one or more shuntline `ne` layers if a route ever supports it | Appendix C distinguishes repeated reflexive histories by levels; do not flatten them. |
| reflexive with silent shuntline projective | `m-o+0-0`, `m-o+0-im`, `m-o+0-0`-type histories | visible `mu` plus silent-object metadata | Silent object morphs remain real grammar slots and may need supplements or diagnostics. |
| triple-object reflexive histories | mainline `m-o` with first/second-level shuntline objects, or shuntline `ne` with new mainline object | Nawat should preserve mainline vs first/second shuntline levels before rendering | Ambiguous surfaces need provenance: direct/causative/applicative function is not recoverable from prefix order alone. |

Andrews' order rule for object prefixes is form-based: specific projective
before reflexive, specific projective before nonspecific projective, reflexive
before nonspecific projective, and human nonspecific before nonhuman
nonspecific. This means a future display should not sort chips by English
roles. It should show the slot stack: mainline, first shuntline, second
shuntline, silent replacements, and route source.

### Reflexive Route Effects

| Route/context | Andrews structural effect | Nawat/Pipil realization principle |
| --- | --- | --- |
| passive from active reflexive source | source mainline reflexive becomes passive subject and leaves shuntline `ne` | current patientive/passive routes map source `mu` to `ne` where the source is reflexive. |
| impersonal from reflexive source | source reflexive can surface through shuntline `ne` in the impersonal/nonactive core | keep passive and impersonal source-family metadata separate even when surfaces match. |
| type-one causative from intransitive source | source subject becomes causative object; if coreferential with new subject, it is reflexive | current Nawat can use visible `mu` for the reflexive causative object. |
| type-two causative from transitive source | source object may become shuntline; source reflexive normally becomes `ne`, with coreference exceptions that keep mainline shape | the route needs mainline/shuntline and coreference metadata before output chips are reliable. |
| applicative from reflexive source | imported applicative reflexive can be mainline; source reflexive normally becomes shuntline `ne` | distinguish "for myself" mainline applicative reflexive from "hide from someone" source-reflexive `ne`. |
| frequentative reflexive | mainline `n-o`, `t-o`, `m-o` can be partially reduplicated as `n-oh-o`, `t-oh-o`, `m-oh-o` | Nawat spelling must be route-specific; do not treat `mujmu` as a universal replacement without evidence. |
| honorific/reverential | reflexive object may mark action for the honored entity's own sake, not ordinary self-action alone | keep honorific reflexive use separate from ordinary reflexive generation. |
| active-action and patientive nominal routes | source reflexive often becomes shuntline material inside the nounstem | generated NNC row should explain `ne` as source/reflexive provenance, not as a new possessor. |

### VNC Formula Slots

Current clause-shell metadata uses the structural VNC formula:

```text
#subject-object(PREDICATE)-tense#
```

This formula is not the ordinary NNC formula. It has an object/valence slot and
a tense/mood slot, while ordinary NNC has `pers1-pers2`, `STEM`, and
`num1-num2` with no tense position.

| Slot | Classical/Andrews analogue | Nawat/Pipil analogue | Current project boundary |
| --- | --- | --- | --- |
| `subject` | Subject participant prefix/suffix complex | Nawat subject participant inventory; plural `-h` analogues realize through Nawat `-t` where the slot requires it | `participantFrame.subject`, generation subject selection |
| `object` | Specific object, nonspecific object, reflexive object, or vacant object slot | Nawat object inventory such as `ki/k`, `nech`, `metz`, `tech`, `metzin`, `kin`, `ta`, `te`, `mu`, `ne` | `participantFrame.object`, object/valence controls |
| `reflexive` | Same-participant object relation, often expressed by the object slot | Mainline `mu`; shuntline `ne` where route metadata requires it | A relation inside object/valence metadata, not a separate possessor state |
| `PREDICATE` | Verb stem/core plus derivational material | Nawat VNC stem/core after route spelling and morphophonemics | `stemFrame`, generated result stem metadata |
| `tense` | Tense/aspect/mood inflectional position | Current Nawat tense/mood generator output | `inflectionFrame`, tense/mood generation path |
| `route/source` | Derivational operation, nonactive source, applicative/causative/denominal source, or nominalization source | Nawat route output after Andrews operation plus Nawat spelling realization | `routeContract`, source-route metadata |

### All Slot Boundaries To Preserve

This is the working slot map to keep future patches from mixing letter
conversion, morphology, and UI labels.

| Slot/frame | What it means | Classical-to-Nawat rule |
| --- | --- | --- |
| authority/evidence | Whether Andrews supplies structure and whether Nawat evidence supplies a fixture | Andrews can authorize the operation; it does not by itself create a Nawat lexical fixture. |
| orthography | Letter realization after the grammar slot is known | Apply the letter bridge here: `tl -> t`, `tla -> ta`, `hu/uh -> w`, `qu/c -> k/s`, etc. |
| morph boundary | Where a stem, connector, suffix, or route operation begins/ends | Preserve boundaries such as `(siwa)t` and `(pa-ti)-t`; do not flatten them into opaque strings. |
| stem/core | Lexical or route-derived predicate material | Convert stem spelling separately from connector and participant slots. |
| nuclear clause | VNC, NNC, or other nuclear-clause family | Use the right formula: VNC has object and tense; ordinary NNC has no tense. |
| participant | Subject, object, possessor, reflexive relation, and included/excluded participant roles | Use the role inventory for the active slot; do not let identical surface strings collapse roles. |
| state | Predicate state such as absolutive or possessive | State belongs to the predicate; it is not the subject connector. |
| number/reference | Singular, plural, distributive/common reference, and `num1-num2` connector behavior | Classical `-h` maps to Nawat `-t` only when it is the slot filler, not as blind spelling. |
| inflection | VNC tense/aspect/mood | VNC-only. NNC formulas do not receive a tense slot. |
| derivation/source route | Causative, applicative, nonactive, patientive, denominal, stock/formative, and nominalization routes | Apply the Andrews operation structurally, then realize Nawat spelling; keep route diagnostics if Nawat evidence is incomplete. |
| AST/sentence relation | Compound, supplementation, topic, included-referent, or clause-level relation | Clause/sentence metadata. Do not force it into ordinary NNC noun classes or VNC tense slots. |
| result/diagnostic | Generated surface or blocked/unsupported explanation | Output is valid only when the active slot/route supports it; otherwise keep diagnostics visible. |

### Andrews Slot Availability In The Nawat Conjugator

This matrix analogizes Andrews/Classical slot availability to the current Nawat
Conjugator. It is a status map, not a request to generate every Andrews example.

Status labels:

- `engine-active`: current code can generate or transform this slot.
- `opt-in`: available only when an explicit mode/route requests it.
- `metadata-only`: current code can describe or classify the slot, but should
  not generate a new Nawat surface from it.
- `evidence-gated`: Andrews supplies the architecture, but Nawat/Pipil fixture
  evidence is still needed before generation expands.
- `pending`: do not implement from labels, translations, or Classical examples
  alone.

| Andrews/Classical slot family | Nawat Conjugator availability | Current rule |
| --- | --- | --- |
| orthography bridge | metadata-only | `convertClassicalLettersToNawat()` may convert rule spellings, but converted spellings are not fixtures. |
| VNC subject `pers1-pers2` plus `num1-num2` | engine-active | Nawat subject inventory supplies `ni`, `ti`, `Ø`, `an`, and plural `t`; Classical subject `-h` analogizes to Nawat slot `-t`. |
| VNC predicate/stem/core | engine-active | Current VNC generation owns stem class, preterit/perfective behavior, irregulars, and stem morphophonemics. |
| VNC tense/aspect/mood slot | engine-active for finite VNC forms; sentence layer partial | Finite tense/mood rows generate; optative/admonitive sentence constructions remain sentence-layer metadata unless explicitly modeled. |
| specific projective object class | engine-active for current Nawat inventory | `nech`, `metz`, `ki/k`, `tech`, `metzin`, `kin`; full Appendix C history should be metadata when combinations become ambiguous. |
| nonspecific projective object class | engine-active | Classical `tla` maps to Nawat `ta`; `te` remains `te`. Keep human/nonhuman role separate from translation labels. |
| mainline reflexive object class | engine-active as one Nawat surface | Andrews has `n-o`, `t-o`, `m-o`; Nawat uses `mu` for all persons, with person/number supplied by the subject slot. |
| shuntline reflexive object replacement | route-active / metadata-sensitive | Andrews `ne` maps to Nawat `ne`; it appears through passive, impersonal, causative/applicative, active-action, patientive, and other source routes, not as an ordinary possessor. |
| silent shuntline projective replacements | partial / metadata-sensitive | Silent `0-0`, `0-im`, `0-0`-type histories are real slots; preserve them in provenance before trying to render every combination. |
| object ordering priorities | partial / evidence-gated for full Appendix C | Order is form-based: specific projective, reflexive, nonspecific human, nonspecific nonhuman; do not sort UI chips by English object-role labels. |
| directional/locative object-prefix position | metadata-only or route-specific | Keep `hual/on`-type structure separate from object/reflexive classes; Nawat route data decides `wal/un` or other surfaces. |
| nonactive stem source suffixes | engine-active | Current nonactive/passive/impersonal and patientive routes preserve source suffix contracts and Nawat orthography. |
| passive voice | engine-active | Passive rejects intransitive ultimate sources, clears or preserves object slots according to source contract, and maps source reflexive `mu` to shuntline `ne` where Andrews requires it. |
| impersonal voice | engine-active | Impersonal keeps passive/impersonal source categories distinct and handles `ta`, `te`, `mu -> ne`, and double-projective source cases through route metadata. |
| causative type one / type two | engine-active | Current forward derivation handles causative routes; mainline/shuntline object history should remain visible as metadata when object chips multiply. |
| applicative | engine-active | Current forward derivation handles applicative routes; source reflexive versus imported reflexive must stay distinct. |
| frequentative and object-pronoun reduplication | metadata-only / evidence-gated | Lesson 27 boundary exists; do not generate reduplicated object/reflexive forms from Andrews alone. |
| verbal and nominal compound embeds | partial | Parser/composer/generation support selected compound inputs and `compoundAst`; full compound semantics remain metadata/evidence-gated. |
| purposive/directional VNCs | metadata-only | Boundary metadata exists; no broad purposive generation from Classical examples. |
| honorific/pejorative reflexive use | metadata-only | Andrews uses reflexive architecture in honorific/reverential routes; current project keeps this as boundary metadata unless confirmed Nawat behavior is implemented. |
| ordinary NNC `#pers1-pers2(STEM)num1-num2#` | opt-in engine-active | Ordinary noun generation is explicit opt-in; `formulaSlots` is source-of-truth structure. |
| NNC predicate state | partial / evidence-gated | Absolutive and ordinary possessive states exist for supported data; natural/required possession and state-case behavior remain Lesson 15 pending. |
| NNC possessor participant | partial | Nawat `nu`, `mu`, `i`, `tu`, `anmu`, `in`; do not confuse possessor `mu` with reflexive object `mu`. |
| NNC nounstem class connector | partial | Valid classes are `t`, `ti`, `in`, `zero`; fixture-backed `t` and `zero` exist, while `ti` and `in` remain open/evidence-gated. |
| NNC animacy/reference/plural behavior | partial | Current metadata and UI expose animate/inanimate and reference labels; broader paradigms need evidence-backed fixtures. |
| pronominal NNCs | pending | Lesson 16 is documented as evidence-blocked; pronoun labels are not fixture evidence. |
| supplementation/topic | pending | Lessons 17-19 need clause/sentence metadata and confirmed examples; do not force them into ordinary NNC or VNC word generation. |
| nominalized/deverbal NNCs | partial opt-in engine-active | Selected `sustantivo` and `adjetivo` motors generate; current outputs are partial route coverage, not a complete nounstem taxonomy. |
| patientive families | partial opt-in engine-active | Current routes distinguish passive, impersonal, perfective, imperfective, root/stock, compound/complement/object metadata where implemented; do not infer complete taxonomy. |
| relational/place/gentilic/name/numeral NNCs | metadata-only | Boundary/usage frames exist; confirmed Nawat fixture data is required before generation. |
| adjectival/adverbial modification | metadata-only / AST-only | Current AST/boundary routes may compose supplied surfaces and record structure; they must not generate new Nawat forms. |
| complement/conjunction/comparison | metadata-only / AST-only | Clause-level relation metadata exists; no generation from single words, parser separators, translations, or Classical examples. |
| denominal source routes | partial opt-in engine-active | Current route previews/generation cover selected configured Nawat routes and Andrews-backed suffix contracts; source evidence gates continuations. |
| analysis/miscellany/textual diagnostics | metadata-only | Keep Lessons 57-58 as analysis boundaries until confirmed examples justify behavior. |

The implementation rule is: first preserve the Andrews slot as metadata, then
decide whether Nawat evidence permits generation. UI chips should show available
slots only when the active route actually supports them; otherwise they should
show diagnostics or remain metadata.

### NNC Subject-Number Connector Analogues

| Source/stem condition | Classical connector analogue | Nawat connector analogue | Current ordinary NNC class |
| --- | --- | --- | --- |
| vowel-final t-class stem | `(...V)-tl` / `(...V)tl` | `(...V)t` | `t` |
| consonant-final tli/ti-class stem | `(...C)-tli` | `(...C)ti` | `ti` |
| consonant-final in-class stem | `(...C)-in` | `(...C)in` | `in` |
| zero-class stem | `(...C/V)-Ø` | `(...C/V)Ø` | `zero` |

The connector belongs outside the predicate stem in the NNC formula. For
example, `siwat` should be represented structurally as `(siwa)t`, not
`(siwat)`, when the final `t` is the `num1-num2` connector.

### Common Derivational Slot Analogues

| Derivational slot | Classical/Andrews spelling | Nawat/Pipil analogue | Notes |
| --- | --- | --- | --- |
| active-action nominalizer | `z/liz` | `s/lis` | Letter bridge only; not automatic fixture evidence. |
| nonactive source suffix | `lo` | `lu` | Patientive/nonactive source contracts use route metadata. |
| nonactive source suffix | `lo-hua` | `lu-wa` / `luwa` | Segmentation depends on display context. |
| nonactive source suffix | `o` | `u` | Current bridge `o -> u`. |
| nonactive source suffix | `o-hua` | `u-wa` / `uwa` | Segmentation depends on display context. |
| nonactive source suffix | `hua-lo` | `wa-lu` / `walu` | Classical `hua` maps to Nawat `wa`. |
| denominal inceptive/stative | `ti` | `ti` | Slot category remains Andrews; spelling is shared. |
| denominal inceptive/stative | `hui` | `wi` | `hu` maps to `w`. |
| denominal `hua` family | `hua` | `wa` | Keep separate from `o-a`/`huia` families. |
| denominal causative | `tla` | `ta` | Example: `tla-(pa-tla)` -> `ta-(pa-ta)`. |
| applicative from `tla` source | `tla -> ti-lia` | `ta -> ti-lia` | Requires source-route evidence, not a bare string. |
| intransitive `o-a` | `o-a` | `u-a` / `ua` | Route spelling, not broad `-na` evidence. |
| applicative `huia` | `huia` | `wia` | `hu` maps to `w`. |
| `i-hui` / `a-hui` source | `i-hui`, `a-hui` | `i-wi`, `a-wi` | Current route surfaces use `iwi` / `awi`. |

## Morphology, Not Blind Letter Conversion

Some correspondences belong to grammar slots rather than generic spelling
conversion.

- Classical `-h` should not be blindly converted by the orthography bridge.
  Consonantal `-h` maps to Nawat `-j`; `-h` in the num2 subposition maps
  through the relevant agreement or connector slot as `-t`.
- The current generic bridge intentionally leaves `-h` as `-h`; the engine's
  subject and connector data provide Nawat `t` where the grammar slot calls for
  it.
- `tl` in a nounstem connector still converts to Nawat `t`, but the engine
  should remember whether that `t` is a connector, a derivational suffix, or
  part of a stem.

## Derivational Examples

These examples are structurally valid because Andrews supplies the grammar
operation and the project realizes the surface in Nawat letters:

- `tla-(pa-tla)` corresponds to Nawat `ta-(pa-ta)`.
- `(pa-ti)-tl` corresponds to Nawat `(pa-ti)-t`.
- `tla -> ti-lia` corresponds to Nawat `ta -> ti-lia` when the source route
  requires replacing the `ta/tla` source suffix before adding `lia`.
- `i-hui` and `a-hui` correspond to Nawat `i-wi` and `a-wi`.
- `huia` corresponds to Nawat `wia`.

## Current Engine Hooks

- `src/core/orthography/orthography.js` exposes
  `convertClassicalLettersToNawat()` and `getClassicalLettersAsNawat()`.
- `src/tests/orthography.test.js` locks the current conversion examples:
  `z/liz -> s/lis`, `lo-hua -> lu-wa`, `hua-lo -> wa-lu`,
  `(xochi)-tl -> (shuchi)-t`, `c-ti-ya -> k-ti-ya`, and
  `cihuatl -> siwat`.
- Denominal route contracts in `src/ui/state.js` keep both the Classical
  spelling and the Nawat rule spelling, for example `classicalSuffix: "tla"`
  with `suffix: "ta"`.

## Do Not Conflate

- Letter conversion is not morphology.
- Orthography matching is not lexical evidence.
- Classical examples from Andrews are not Nawat/Pipil fixtures.
- Open-stem examples are structural diagnostics, not evidence-backed data.
- Nawat-specific exceptions such as `panu -> panawia` or `tejku -> tejkultia`
  must remain grounded in repo or user evidence even when Andrews supplies the
  structural category.

## Recommended Future Tests

If this note becomes an engine contract, add explicit tests for:

- `getClassicalLettersAsNawat("tla-(pa-tla)") === "ta-(pa-ta)"`.
- `getClassicalLettersAsNawat("(pa-ti)-tl") === "(pa-ti)-t"`.
- `getClassicalLettersAsNawat("-h") === "-h"` to prove `-h -> -t` is handled
  by agreement/connector slots, not blind orthography conversion.
