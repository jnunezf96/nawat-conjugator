# Andrews Formula Inventory

Source PDF: `/Users/jaimenunez/Downloads/Andrews_Introduction_to_Classical_Nahuatl_693p_reOCR_squareZeroFixed.pdf`

Extraction check: local PDF read with bundled Python/pypdf on 2026-06-21, then line-break and visual-risk formula rows reconciled on 2026-06-23. Printed page references below are Andrews printed pages; in this PDF, the PDF page number is printed page plus 15 for the lesson body.

Scope: this curated inventory records formula templates, slot-filler formula paradigms, and formula-changing source/target patterns. The exhaustive occurrence index, including formula-bearing analyzed examples, is `docs/ANDREWS_FORMULA_OCCURRENCES.md`; OCR-risk rows checked against page images are tracked in `docs/ANDREWS_FORMULA_VISUAL_AUDIT.md`. Example analyses should be reopened in the PDF before implementation.

Authority boundary: Andrews supplies formula architecture, slot order, roles, boundaries, categories, dependencies, derivational permission, and the grammar logic that decides whether an Andrews-licensed route can generate. Classical spellings in this document are structural rule spellings only; any Nawat/Pipil output must pass through the repo orthography bridge, but Nawat/Pipil evidence is not the gate that decides Andrews grammar logic. `0` means regular zero. `[sq0]` means Andrews' square-zero mute irregular morph.

## Notation

| Notation | Formula role | Source |
| --- | --- | --- |
| `#...#` | Fore and aft nuclear-clause boundary. | Abbreviations and symbols, p. xiv |
| `#` outside a clause | Affix attachment point outside a nuclear-clause boundary. | Abbreviations and symbols, p. xiv |
| `-` | Stem-internal or dyad-internal boundary. | Abbreviations and symbols, p. xiv |
| `+` | Boundary between slots outside the stem; also certain stem-internal boundaries. | Abbreviations and symbols, p. xiv |
| `(STEM)` | Predicate stem boundary inside a nuclear clause. | §§4.4-4.5 |
| `pers1-pers2` | Subject person dyad. | §4.5 |
| `va`, `va1-va2` | Monadic or dyadic valence/object slot. | §§4.5, 6.2-6.3 |
| `st`, `st1-st2` | Monadic or dyadic state/possessor slot. | §§4.5, 13.1 |
| `tns` | VNC tense/mood slot. | §§4.5, 5.5 |
| `num1-num2` | Subject number connector dyad. It belongs to the subject, not the predicate. | §§4.5, 5.3, 12.3 |
| `IBASE`, `DBASE`, `SUF` | Intransitive base, directive base, and derivational suffix in multiple-valence formulas. | §23.2 |

## Core Nuclear-Clause Formulas

Andrews builds formulas in stages. The app should preserve these as structured slots, not as display-only strings.

| Family | Formula | Source | Engine boundary |
| --- | --- | --- | --- |
| General nuclear clause | `Subject + Predicate` | §4.4, printed p. 46 / PDF p. 61 | Both VNC and NNC are subject-plus-predicate structures. |
| General subject shell | `#person + ... + number#` | §4.4, printed p. 46 / PDF p. 61 | Subject is circumfixal around predicate material. |
| Stage-2 NNC | `#person+state(STEM)number#` | §4.4, printed p. 46 / PDF p. 61 | State belongs inside the predicate side of the formula. |
| Stage-2 VNC | `#person+valence(STEM)tense+number#` | §4.4, printed p. 46 / PDF p. 61 | Valence plus stem forms the core; tense is VNC-only. |
| VNC, dyadic transitive | `#pers1-pers2+va1-va2(STEM)tns+num1-num2#` | §4.5, printed p. 47 / PDF p. 62 | Specific mainline object formula. |
| VNC, monadic transitive | `#pers1-pers2+va(STEM)tns+num1-num2#` | §4.5, printed p. 47 / PDF p. 62 | Shuntline reflexive/reciprocal or nonspecific object formula. |
| VNC, intransitive | `#pers1-pers2(STEM)tns+num1-num2#` | §4.5, printed p. 47 / PDF p. 62; §5.1, printed p. 50 / PDF p. 65 | Valence position is implicit/vacant. |
| NNC, dyadic possessive state | `#pers1-pers2+st1-st2(STEM)num1-num2#` | §4.5, printed p. 48 / PDF p. 63; §13.1, printed p. 105 / PDF p. 120 | Specific possessor formula. |
| NNC, monadic possessive state | `#pers1-pers2+st(STEM)num1-num2#` | §4.5, printed p. 48 / PDF p. 63; §13.1, printed p. 105 / PDF p. 120 | Reciprocal or nonspecific possessor formula. |
| NNC, absolutive state | `#pers1-pers2(STEM)num1-num2#` | §4.5, printed p. 48 / PDF p. 63; §12.2, printed p. 100 / PDF p. 115 | No tense slot; state position is vacant/implicit. |

## VNC Subject And Tense Fillers

### Subject Person Dyad

Source: §§5.3-5.4, printed pp. 51-54.

| Slot | Fillers |
| --- | --- |
| `pers1` | `0` = third person; `t ~ ti` = second singular or first plural; `x ~ xi` = second person in optative VNCs only; `am ~ an ...` = second plural; `n ~ ni` = first singular. |
| `pers2` | `0` = nominative case. |

### Subject Number Connector Dyads

| VNC condition | `num1` inventory | `num2` inventory | Formula dyads |
| --- | --- | --- | --- |
| Present, customary-present, imperfect, distant-past indicative; also past optative | `0` | singular/common `0`; plural `h` | `0-0`, `0-h` |
| Future or preterit indicative | `c/qu ~ qui ~ [sq0]` | singular/common `0`; plural `eh` | `c-0 ~ qui-0 ~ [sq0]-0`, `qu-eh` |
| Nonpast optative | `c ~ [sq0]` | singular/common `0`; plural `an` | `[sq0]-0`, `c-an` |
| Nonpast admonitive | `t ~ [sq0]` | singular/common `0`; plural `in` with `ih` subvariant | `[sq0]-0`, `t-in ~ t-ih` |

### VNC Subject Formula Paradigms

Andrews gives these as top-line formula fillers for the VNC subject function.

These are subject-line fragments from Andrews' diagrammatic format. The full VNC shell still comes from the core VNC formula above.

| Condition | Subject formulas |
| --- | --- |
| Present/customary-present/imperfect/distant-past indicative | `#n-0(...+0-0#`, `#t-0(...+0-h#`, `#t-0(...+0-0#`, `#am-0(...+0-h#`, `#0-0(...+0-0#`, `#0-0(...+0-h#` |
| Past optative | Same as the preceding paradigm, except second-person formulas use `x ~ xi` in `pers1`: `#x-0(...+0-0#`, `#x-0(...+0-h#`. |
| Future or preterit indicative | Same person dyads as the main paradigm, with future/preterit number dyads such as `#n-0(...+c-0# ~ #n-0(...+qui-0#` and plural `#t-0(...+qu-eh#`. Singular formulas can also use `[sq0]-0` where Andrews permits the irregular silent variant. |
| Nonpast optative | `#n-0(...+0-0#`, `#t-0(...+c-an#`, `#x-0(...+0-0#`, `#x-0(...+c-an#`, `#0-0(...+0-0#`, `#0-0(...+c-an#` |
| Nonpast admonitive | Andrews prints the first-person examples and states the first two subpositions otherwise follow the main paradigm: `#n-0(...+[sq0]-0#`, `#t-0(...+t-in# ~ #t-0(...+t-ih#`. |

### VNC Tense/Mood Slot

Source: §5.5, printed p. 55.

| Mood | Tense | `tns` filler |
| --- | --- | --- |
| Indicative | present | `0` |
| Indicative | customary present | `ni` |
| Indicative | imperfect | `ya ~ ya` |
| Indicative | future | `z` |
| Indicative | preterit | `0` |
| Indicative | distant past | `ca ~ ca` |
| Optative | nonpast | `0` |
| Optative | past | `ni` |
| Admonitive | nonpast | `h` for Class A; `0` for other classes |

## VNC Valence Fillers

### Monadic Valence Formula

Source: §6.2, printed p. 57.

Formula: `#pers1-pers2+va(STEM)tns+num1-num2#`

| `va` filler | Role |
| --- | --- |
| `ne` | Shuntline reflexive/reciprocal object. |
| `te` | Nonspecific human projective object. |
| `tla` | Nonspecific nonhuman/nonanimate projective object. |

### Dyadic Valence Formula

Source: §§6.3-6.7, printed pp. 57-60.

Formula: `#pers1-pers2+va1-va2(STEM)tns+num1-num2#`

Specific projective object dyads:

| Object role | Formula dyad |
| --- | --- |
| first singular object | `+n-ech(` |
| first plural object | `+t-ech(` |
| second singular object | `+m-itz(` |
| second plural object | `+am-ech(` |
| third singular/common object | `+c-0(` / `+qu-0(` ~ `+qui-0(` |
| third plural animate object | `+qu-im(` |

Mainline reflexive/reciprocal object dyads:

| Object role | Formula dyad |
| --- | --- |
| first singular reflexive | `+n-o(` ~ `+n-[sq0](` |
| first plural reflexive/reciprocal | `+t-o(` ~ `+t-[sq0](` |
| nonfirst common reflexive/reciprocal | `+m-o(` ~ `+m-[sq0](` |

## NNC Absolutive-State Fillers

Source: §§12.2-12.4, printed pp. 100-104 / PDF pp. 115-119.

Formula: `#pers1-pers2(STEM)num1-num2#`

Subject `pers1-pers2` uses the VNC nominative fillers except that `x ~ xi` does not occur.

| Number/reference condition | `num1-num2` formula dyads |
| --- | --- |
| Singular/common absolutive | `tl-0`, `tli-0 ~ li-0`, `in-0`, `0-0` |
| Animate plural absolutive | `t-in`, `m-eh`, `0-h` |

Andrews' subject formula shapes:

| Subject role | Formula shapes |
| --- | --- |
| first singular | `#n-0(...)tl-0#`; `#n-0(...)tli-0# ~ #n-0(...)li-0#`; `#n-0(...)in-0#`; `#n-0(...)0-0#` |
| first plural | `#t-0(...)t-in#`; `#t-0(...)m-eh#`; `#t-0(...)0-h#` |
| second singular | `#t-0(...)tl-0#`; `#t-0(...)tli-0# ~ #t-0(...)li-0#`; `#t-0(...)in-0#`; `#t-0(...)0-0#` |
| second plural | `#am-0(...)t-in#`; `#am-0(...)m-eh#`; `#am-0(...)0-h#` |
| third singular/common | `#0-0(...)tl-0#`; `#0-0(...)tli-0# ~ #0-0(...)li-0#`; `#0-0(...)in-0#`; `#0-0(...)0-0#` |
| third plural animate | `#0-0(...)t-in#`; `#0-0(...)m-eh#`; `#0-0(...)0-h#` |

Engine rule: the final dyad is a subject-number connector. It is not a nounstem suffix and does not create an NNC tense slot. Andrews prints the structural Classical dyad `tl-0`; Nawat/Pipil `t/ti` output is an orthography-bridge realization, not the formula source.

Slot-scoped Nawat/Pipil realization:

| Andrews/Classical dyad | Nawat/Pipil realization |
| --- | --- |
| `tl-0` | `t-0` |
| `tli-0 ~ li-0` | `ti-0` |
| `in-0` | `in-0` |
| `0-0` | `0-0` |
| `t-in` | `t-in` |
| `m-eh` | `m-et` |
| `0-h` | `0-t` |

## NNC Possessive-State Fillers

Source: §§13.1-13.6, printed pp. 105-108 / PDF pp. 120-123.

Formulas:

- Monadic state: `#pers1-pers2+st(STEM)num1-num2#`
- Dyadic state: `#pers1-pers2+st1-st2(STEM)num1-num2#`

### Possessive-State Subject Formulas

These are subject-line fragments from Andrews' diagrammatic format. The full possessive-state NNC shell still includes `+st(STEM)` or `+st1-st2(STEM)` in the predicate.

| Subject role | Formula shapes |
| --- | --- |
| first singular | `#n-0+...)uh-0#`; `#n-0+...)hui-0#`; `#n-0+...)0-0#` |
| first plural | `#t-0+...)hu-ān#` |
| second singular | `#t-0+...)uh-0#`; `#t-0+...)hui-0#`; `#t-0+...)0-0#` |
| second plural | `#am-0+...)hu-ān#` |
| third singular/common | `#0-0+...)uh-0#`; `#0-0+...)hui-0#`; `#0-0+...)0-0#` |
| third plural animate | `#0-0+...)hu-ān#` |

`uh` and `hu` are spelling-conditioned variants in Andrews' analysis; `hui` is consonant-conditioned and rare/morphologically conditioned in some environments. These are Classical structural spellings, not Nawat output spellings.

### Possessor/State Fillers

Monadic `st` fillers:

| Filler | Role |
| --- | --- |
| `ne` | Reciprocal possessor. |
| `tē` | Nonspecific human possessor. |
| `tla` | Nonspecific nonhuman possessor. |

Dyadic specific possessor fillers:

| Possessor role | `st1-st2` dyad |
| --- | --- |
| first singular possessor | `n-o ~ n-[sq0]` |
| first plural possessor | `t-o ~ t-[sq0]` |
| second singular possessor | `m-o ~ m-[sq0]` |
| second plural possessor | `am-o ~ am-[sq0]` |
| third singular/common possessor | `ī-0` |
| third plural possessor | `ī-m ~ i-n ...` |

Slot-scoped Nawat/Pipil realization:

| Andrews/Classical slot | Nawat/Pipil realization |
| --- | --- |
| `st = ne` | `ne` |
| `st = tē` | `te` |
| `st = tla` | `ta` |
| `n-o ~ n-[sq0]` | `n-u ~ n-[sq0]` |
| `t-o ~ t-[sq0]` | `t-u ~ t-[sq0]` |
| `m-o ~ m-[sq0]` | `m-u ~ m-[sq0]` |
| `am-o ~ am-[sq0]` | `anm-u ~ anm-[sq0]` |
| `ī-0` | `i-0` |
| `ī-m ~ i-n ...` | `i-n ~ i-nh` |

## Lesson 16 Quantitive Pronominal NNC Fillers

Source: §§16.7-16.9, printed pp. 131-135 / PDF pp. 146-150. Vowel and letter values below were checked against the rendered PDF image, not OCR text.

The matrix families and their exact allomorphs are separate typed facts:

| Matrix family | Exact matrix forms | PDF image fact |
| --- | --- | --- |
| `qui-ch` | `qui-ch` | Combined `qui-ch` has short `i`; it does not take predicate-internal plural `n`. |
| `quī` | `quī`, `quih`, `qui`, `c` | The underlying family has long `ī`; short and consonant-only forms remain distinct allomorphs. |
| `chī` | `chī`, `chih`, `chi`, `ch` | The underlying family has long `ī`; short and consonant-only forms remain distinct allomorphs. |

Plural quantitive predicates keep predicate derivation separate from the subject-number dyad:

| Predicate pluralization | Predicate result | Subject-number forms |
| --- | --- | --- |
| `qui-ch` plain | unchanged `...-qui-ch` | `t-in` |
| normal `quī/chī` internal plural | `...-quī-n` / `...-chī-n` | `t-in` or square-zero dyad |
| explicitly authorized plain `c/ch` variant | unchanged `...-c` / `...-ch` | `t-in` |
| explicitly authorized plain full-form variant | unchanged typed matrix | Canvas-witnessed `m-eh` |

Engine rule: the matrix family, exact matrix form, predicate-pluralization selection, and allowed subject-number dyads belong to one typed Lesson 16 record. A visible source spelling or formula cannot select another allomorph. Selecting an exact form that differs from the Source stem leaves a visible Source-edit requirement; the engine must not silently manufacture the new stem.

## Other NNC Search Evidence

Search targets: exact `other NNC(s)` plus the explicit heading `Other Adverbialized Absolutive-State NNCs`. As a search list, these hits are an evidence index and do not create new ordinary NNC generation gates; they record places where Andrews uses "other NNC(s)" wording across ordinary, possessive, adverbialized, incorporated, passive-action, place/gentilic, and name/location NNC uses while preserving the core NNC shell boundaries.

Exact `other NNC(s)` hits: printed p. 129 / PDF p. 144; printed p. 294 / PDF p. 309; printed p. 338 / PDF p. 353; printed p. 350 / PDF p. 365; printed p. 435 / PDF p. 450; printed p. 460 / PDF p. 475; printed p. 509 / PDF p. 524.

Additional `Other Adverbialized Absolutive-State NNCs` heading hits: printed p. 437 / PDF p. 452; printed p. 445 / PDF p. 460.

| Printed page | PDF page | Hit type | Formula-bearing note |
| ---: | ---: | --- | --- |
| 129 | 144 | exact `other NNC(s)` | Interrogative/negative and related absolutive-state rows. |
| 294 | 309 | exact `other NNC(s)` | Possessive child/kin rows, plural NNC rows, and diminutive/reverential rows. |
| 338 | 353 | exact `other NNC(s)` | Incorporated/compound NNC row. |
| 350 | 365 | exact `other NNC(s)` | Passive-action NNC rows from VNC predicates. |
| 435 | 450 | exact `other NNC(s)` | Adverbial/pronominal rows and particle-like boundary examples. |
| 437 | 452 | heading hit | `Other Adverbialized Absolutive-State NNCs` rows. |
| 445 | 460 | heading hit | No formula-like rows indexed on the hit page. |
| 460 | 475 | exact `other NNC(s)` | Possessive/locative `-ya-n` and relational rows. |
| 509 | 524 | exact `other NNC(s)` | Name, place, gentilic, and community noun rows. |

`printed 129 / PDF 144`:

| Formula |
| --- |
| `#0-0(tl-eh)0-0#` |
| `#ti-0(tl-eh)m-eh#` |
| `#ti-0(tl-e-i)m-eh#` |
| `#ti-0(tl-e-i)t-in#` |
| `ah#0-0(tl-eh)0-0#` |
| `#0-0(tl-eh-hua)tl-0#` |

`printed 294 / PDF 309`:

NNC side: these rows keep possessive-state material such as `+n-o` and `+ī-m` before the parenthesized predicate stem, and keep subject-number connectors such as `hu-ān`, `0-[sq0]`, `t-in`, and `tli-0` outside the predicate stem. Stem-internal material includes child/kin stems plus plural, diminutive, reverential, and gendered compounds; no VNC tense slot is present. These p. 294 rows feed the scoped Lesson 32 `pil` child/noble NNC-side output generator through the Nawat/Pipil orthography bridge and are available to the ordinary CNN route only by explicit `ordinaryNnc.outputSet = "lesson32-pil-child-nnc-side"` opt-in, without changing the default ordinary NNC generation gate.

| Formula |
| --- |
| `#an-0+n-o(pil)hu-ān#` |
| `#0-0+n-o(pil-hu-ān-tzi-tzin)hu-ān#` |
| `#0-0+n-o(pil-hu-ān-tzi-tzin)0-[sq0]#` |
| `#0-0+ī-m(pih-pil-hu-ān-tzi-tzin)0-[sq0]#` |
| `#0-0(pi-pil)t-in#` |
| `#0-0(oquich-pi-pil)t-in#` |
| `#0-0(cihua-pi-pil)t-in#` |
| `#ti-0(pil-tzin)tli-0#` |
| `#0-0(pil-ton)tli-0#` |

`printed 338 / PDF 353`:

| Formula |
| --- |
| `#ni-0(0-0-mich-in-0+0-0-i-0-īx-xo-h-0)[sq0]-0#` |

`printed 350 / PDF 365`:

| Formula |
| --- |
| `#ni-0(tla-zo-h-tla-lo)ca+0-0#` |
| `#0-0+n-o(tla-zo-h-tla-lo-ca)0-0#` |
| `#0-0+ne(coco-li-lo)ca+0-0#` |
| `#0-0+i-0(ne-coco-li-lo-ca)0-0#` |
| `#t-0(il-namic-o)ca+0-0#` |
| `#0-0+m-o(il-namic-o-ca)0-0#` |
| `#ni-0+tla(tzacui-l-ti-lo)ca+0-0#` |

`printed 435 / PDF 450`:

| Formula |
| --- |
| `#0-0(mo)[sq0]-0#` |
| `ah#` |
| `ca#` |
| `ah#0-0(mo)[sq0]-0#` |

`printed 437 / PDF 452`:

| Formula |
| --- |
| `o#` |
| `#ti-0+n-o(mach)0-0#` |
| `#0-0(que-n)0-0#` |

`printed 445 / PDF 460`: No formula-like rows indexed on the hit page.

`printed 460 / PDF 475`:

| Formula |
| --- |
| `#0-0+i-0(m-o-chihua-ya-n)0-0#` |
| `#0-0+i-0(m-o-nequi-ya-n)0-0#` |
| `#0-0+n-o(tel-poch-ti-ya-n)0-0#` |
| `#0-0+i-0(hui-ya-n)0-0#` |
| `#0-0+t-o(neh-hui-ya-n)0-0#` |
| `#0-0+n-[sq0](ix-co-h-ti-ya-n)0-0#` |
| `#0-0(no-hui-ya-n)[sq0]-0#` |
| `#0-0(que-m-mani-ya-n)0-0#` |
| `#0-0(nem-mani-ya-n)[sq0]-0#` |
| `#0-0(cem-man-ya-n)[sq0]-0#` |

`printed 509 / PDF 524`:

| Formula |
| --- |
| `#0-0(Col-huah-0-tzin-co)0-0#` |
| `#0-0(Col-huah-0-[sq0]-ca-ton-co)0-0#` |
| `#0-0(Me-xi-h-[sq0]-ca-yo)tl-0#` |
| `#0-0(Tol-te-[sq0]-ca-yo)tl-0#` |
| `#0-0(Cuauh-ti-tlan-ca-yo)tl-0#` |
| `#0-0(0-0-Cuauh-t-0+0-0-i-n-chan-ca-yo)tl-0#` |
| `#0-0(A-nahua-[sq0]-ca-yo)tl-0#` |
| `#0-0(a-mil-pan-e-ca-yo)tl-0#` |

## Predicate-Derived NNC Formula Evidence

Search target: literal PDF text hits for `predicate NNC`, `NNC predicate`, and `nominal predicate`, then formula extraction from those page numbers. These hits are not the whole nominalization inventory; they are the pages Andrews' text itself points to with predicate-NNC wording. Preterit predicate-derived NNCs are indexed separately below because Andrews labels the family as preterit-agentive NNCs.

### Literal `NNC predicate` Search Hits

| Printed page | PDF page | Formula-bearing? | Relevance |
| ---: | ---: | --- | --- |
| 103 | 118 | no | Nominal predicate translation and NNC number discussion. |
| 260 | 275 | no | NNC predicate as embed in compound verbstems. |
| 263 | 278 | yes | Incorporated-NNC predicate functioning as adverbial modifier. |
| 350 | 365 | yes | VNC predicate downgraded into passive-action NNC stem. |
| 425 | 440 | no | Interrogative pronominal NNCs and nominal predicate syntax. |
| 426 | 441 | no | Nominal predicate as head in modification/supplementation contrasts. |
| 526 | 541 | no | Adverbialized NNC as predicate inside an adverbial clause unit. |

### Formula-Bearing Literal Hits

Printed p. 263 / PDF p. 278, incorporated-NNC predicate as adverbial embed:

| Role | Formula |
| --- | --- |
| VNC source | `#ni-0(tla-cui)0+0-0#` |
| Transform with incorporated NNC predicate | `#n-0(a-tla-cui)0+0-0#` |
| Transform with road nounstem embed | `#n-0(oh-tla-toca)0+0-0#` |
| Transform with means/instrument embed | `#0-0(metz-tona)0+0-0#` |

Printed p. 350 / PDF p. 365, passive-action NNC from a distant-past passive VNC predicate:

| Source/target | Formula |
| --- | --- |
| VNC source | `#ni-0(tla-zo-h-tla-lo)ca+0-0#` |
| NNC target | `#0-0+n-o(tla-zo-h-tla-lo-ca)0-0#` |
| VNC source | `#0-0+ne(coco-li-lo)ca+0-0#` |
| NNC target | `#0-0+i-0(ne-coco-li-lo-ca)0-0#` |
| VNC source | `#t-0(il-namic-o)ca+0-0#` |
| NNC target | `#0-0+m-o(il-namic-o-ca)0-0#` |
| VNC source | `#ni-0+tla(tzacui-l-ti-lo)ca+0-0#` |

Engine boundary: when a VNC predicate is downgraded to an NNC stem, the VNC valency/object and tense material that belongs to the predicate remains inside the NNC predicate stem. The outer NNC still has no VNC `tns` slot.

### Preterit-Agentive NNC Evidence

Andrews treats the main preterit predicate-derived NNC family under preterit-agentive NNCs, not under the literal phrase `predicate NNC`. The key section is §35.2-35.6, printed pp. 319-325 / PDF pp. 334-340.

Printed p. 320 / PDF p. 335:

| Source/target | Formula | Boundary implication |
| --- | --- | --- |
| Preterit VNC source | `#ni-0(pix-ca)0+c-0#` | Preterit VNC source. |
| Preterit-agentive NNC | `#ni-0(pix-ca-0)c-0#` | Predicate stem reanalyzed as NNC stem; preterit subject-number material is now the NNC outside connector. |
| Preterit VNC source | `#0-0(pix-ca)0+qu-eh#` | Plural preterit VNC source. |
| Preterit-agentive NNC | `#0-0(pix-ca-0)qu-eh#` | Plural connector remains outside the predicate stem. |
| Preterit VNC source | `#0-0(mauh)0+0-0#` | Silent/zero preterit connector source. |
| Preterit-agentive NNC | `#0-0(mauh-0)qui-0#` | `qui-0` is the NNC connector, not a VNC tense slot. |

Printed p. 321 / PDF p. 336, further absolutive-state preterit-agentive NNC examples:

| Formula | Note |
| --- | --- |
| `#ni-0(tla-namaca-0)c-0#` | Projective `tla` remains in the predicate stem. |
| `#0-0(te-chix-0)qui-0#` | Projective `te` remains in the predicate stem. |
| `#ti-0(t-o-mach-tih-0)qu-eh#` | Reflexive/causative material remains in the predicate stem. |
| `#0-0(tlah-tla-mah-0)qui-0#` | Reduplicated/projective predicate material remains inside the stem. |
| `#0-0(mic-0)qui-0#` | Preterit predicate stem plus outside connector. |
| `#0-0(tla-tt-a-0)c-0#` | Preterit predicate stem plus outside connector. |
| `#0-0(tla-ht-o-h-0)qui-0#` | Preterit predicate stem plus outside connector. |

Printed p. 324 / PDF p. 339, general-use and possessive-state preterit-agentive stems:

| Formula | Note |
| --- | --- |
| `#0-0(yah-0-que)tl-0#` | General-use stem with matrix nounstem material. |
| `#0-0(mic-0-que)tl-0#` | General-use stem with matrix nounstem material. |
| `#0-0+t-o(mic-0-ca)uh-0#` | Possessive-state preterit-agentive NNC; possessor is outside the predicate stem. |
| `#0-0+n-o(te-mach-tih-0-ca)uh-0#` | Possessive-state preterit-agentive NNC with projective predicate material retained inside the stem. |
| `#n-0+i-0(tla-mamah-0-ca)uh-0#` | Possessive-state preterit-agentive NNC with source predicate material retained inside the stem. |

Implementation rule: preterit predicate-derived NNC rendering must bind the generated source predicate to the NNC predicate stem first, then render the NNC connector from the reanalysis. Do not render these as `#NNC(... )VNC-tns#`, and do not collapse alternant surfaces onto a single formula.

## Multiple-Valence VNC Formulas

Source: §§23.2-23.5, printed pp. 177-180.

Derivational histories:

| Source type | Formula sequence |
| --- | --- |
| Intransitive source | `(STEM)` -> `+va(IBASE-SUF)` -> `+va+va(IBASE-SUF-SUF)` -> `+va+va+va(IBASE-SUF-SUF-SUF)` |
| Directive source | `+va(STEM)` -> `+va+va(DBASE-SUF)` -> `+va+va+va(DBASE-SUF-SUF)` |

Representative multiple-valence formula:

`#pers1-pers2+va+va+va(DBASE-CAUS-APPLIC)tns+num1-num2#`

Implementation constraints from the same section:

- Every `va` is a full valence position and can have subpositions.
- Stem suffix order reflects derivational history; object-pronoun order does not simply mirror that suffix order.
- Specific projective objects are incompatible with each other as sounded forms; shuntline positions may be silenced when a mainline specific projective object is present.
- Object order priorities: specific projective before reflexive; specific projective before nonspecific projective; reflexive before nonspecific projective; human `te` before nonhuman `tla`.

## Compound Formula Patterns

Source: §§28.1-28.4 and §31.1, printed pp. 235-237 and 279.

| Formula | Result |
| --- | --- |
| `VNC + VNC = compound VNC` | Compound verbal nuclear clause. |
| `NNC + VNC = compound VNC` | Compound verbal nuclear clause with nominal embed. |
| `NNC + NNC = compound NNC` | Compound nominal nuclear clause. |

Recursive NNC compounding can be binary: `[NNC + NNC] + NNC`, `NNC + [NNC + NNC]`, `[NNC + NNC] + [NNC + NNC]`, and deeper nestings. In every compound stem, embed precedes matrix, and the matrix determines the resulting verbal or nominal nature.

Verbal-embed compound verbstem combinations:

| Embed + matrix | Formula type |
| --- | --- |
| `ISTEM + ISTEM` | Intransitive embed plus intransitive matrix. |
| `TSTEM + ISTEM` | Transitive embed plus intransitive matrix. |
| `ISTEM + TSTEM` | Intransitive embed plus transitive matrix. |
| `TSTEM + TSTEM` | Transitive embed plus transitive matrix. |

Connective-`t` compound verbstems use a preterit-tense embedded predicate directly before the connective `t/ti`; the embedded VNC subject is deleted, while the matrix source supplies the compound VNC subject.

## Nominalized VNC Formula Patterns

Sources: Lessons 35-36, printed pp. 319-353. These are formula transformations, not new top-level shells. The resulting outputs still use NNC formulas.

| Family | Source formula effect | Target formula effect |
| --- | --- | --- |
| Preterit-agentive NNC (§35.3) | A preterit-tense VNC predicate is the source. | The VNC predicate is reanalyzed as an NNC nounstem. The preterit `0` becomes final inside the restricted-use nounstem; VNC subject number dyads continue unchanged in the absolutive reanalysis. |
| Customary-present agentive by reanalysis (§36.2) | A customary-present active VNC predicate with `tns = ni` is the source. | The VNC predicate becomes an absolutive NNC nounstem ending in `ni`; VNC-associated number dyads are retained. |
| Fully nominalized customary-present agentive (§36.3) | Same source domain as §36.2. | The nounstem is fully nominal; NNC number dyads replace VNC-associated dyads where the paradigm requires them. |
| Customary-present patientive (§36.5) | A customary-present passive-voice VNC predicate is the source. | The passive predicate becomes a patientive NNC nounstem. Single-object projective source material is not retained as an outside projective object; source reflexive is represented shuntline. |
| Instrumentive (§36.6) | Absolutive instrumentive uses a customary-present impersonal source; possessive instrumentive uses an imperfect active source. | Absolutive: source predicate becomes nounstem and no specific participant is available as possessor. Possessive: source subject transforms into possessor; an outer nonanimate subject with `0-0` is imported. |
| Present-agentive (§36.7) | A present-indicative VNC predicate is the source. | Predicate is converted into an absolutive-state NNC nounstem. |
| Future-agentive (§36.8) | A future-tense VNC predicate is the source. | Restricted-use nounstem keeps future `z` as final constituent; singular keeps original `qui-0`, plural uses `qu-eh`; general-use stem embeds the restricted stem in a compound nounstem. |
| Passive-action (§36.10) | A distant-past passive VNC predicate is the source. | Possessive-state general-use stem ends in distant-past `ca`; source subject transforms into possessor and an outer nonanimate subject is imported. Absolutive restricted-use stem compounds that general-use stem with `yo`. |
| Active-action, first type (§36.11) | A distant-past active VNC predicate is the source, mostly intransitive or reflexive. | Possessive-state general-use stem ends in distant-past `ca`; source subject transforms into possessor; mainline reflexive source becomes shuntline inside the nounstem. Absolutive restricted-use stem uses the `yo` compound pattern. |

## Personal-Name NNC Formula Pattern

Source: §§56.1-56.2, printed pp. 593-597.

Personal-name NNCs use the normal absolutive NNC shell outside, but their predicate stem is an entire downgraded statement containing one or more inner nuclear clauses.

Implementation schema:

`#outer-pers1-outer-pers2(INNER-CLAUSE-AS-STEM)0-0#`

Constraints:

- The outer number dyad is always `0-0`.
- Inner and outer subject pronouns are separate.
- If another number dyad such as `c-0` appears at the end of the personal-name material, it belongs to the inner subject, not the outer NNC subject.
- The inner clause can be a VNC or an NNC, and it remains structurally present inside the downgraded stem.

## Placement In This Repo

- This file is the Andrews formula inventory.
- `docs/ANDREWS_FORMULA_OCCURRENCES.md` is the exhaustive occurrence index for formula-like material in the PDF.
- `docs/ANDREWS_FORMULA_VISUAL_AUDIT.md` records visual checks for risky parenthesized stem material, related OCR `1` cases, non-ellipsis punctuation inside stems, and formula material split across line/page breaks.
- `docs/ANDREWS_PDF_DIGEST.md` remains the broad lesson digest.
- `docs/ANDREWS_SECTION_DIGEST.md` remains the navigation index.
- `docs/ANDREWS_LAYER_LCM.md` maps these formulas to reusable engine/UI layers.
- `docs/NAHUATL_TO_NAWAT_LETTER_CONVERSION_NOTES.md` governs how Classical structural spellings can be realized as Nawat/Pipil letters after the formula slot is known.
