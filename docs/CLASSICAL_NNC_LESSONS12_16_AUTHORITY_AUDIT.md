# Classical NNC Lessons 12-16 Authority Audit

## Purpose

This is the implementation map for Andrews Lessons 12-16. `ANDREWS_TRANSCRIPTION_CANVAS.md` is the deed. This file records how each sublesson must change machine behavior; it is not a substitute source.

Lessons are evidence and dependency indexes. The engine target is one reusable nominal-nuclear-clause pipeline:

`source nounstem -> use/class analysis -> state -> subject person -> subject number -> higher NNC conditions -> typed NNC slots -> final formula -> sentence surface`

The ordinary NNC formula remains `#pers1-pers2+STATE(STEM)num1-num2#`, with State vacant, monadic, or dyadic. The pronominal family in Lesson 16 is a constrained absolutive-state specialization of the same typed NNC architecture.

## Layer Contract

| Layer | Consumes | Produces | Provisional until |
| --- | --- | --- | --- |
| Lesson 4 | source stem | NNC formula frame | Lessons 12-16 select real fillers |
| Lesson 12 | Lesson 4 vacant-state NNC | absolutive subject/state frame | Lesson 14 selects nounstem use-shape and class behavior |
| Lesson 13 | Lesson 4 monadic/dyadic-state NNC | possessive subject/possessor frame | Lessons 14-15 select general-use shape and higher conditions |
| Lesson 14 | source nounstem plus L12/L13 frame | class/use-shape/number-derivation frame | Lesson 15 higher ordinary-NNC conditions or Lesson 16 family selection |
| Lesson 15 | ordinary NNC frame | assimilated, replaced, derived, restricted, and sentence-ready ordinary NNC | highest active sentence layer |
| Lesson 16 | Lesson 12 absolutive frame plus pronominal source kind | entitive or quantitive pronominal NNC | highest active sentence layer |

No lower formula string is authority. Each layer consumes typed slots and actions. A witness proves a rule; it is never a whitelist of accepted stems.

## Sublesson Map

| Section | Canvas lines | Consumed output | Rule operation | Output left provisional / finalizer | Required hostile opposite |
| --- | ---: | --- | --- | --- | --- |
| 12.1 | 4379-4386 | Lesson 4 NNC formula | distinguish State from VNC Valence and remove Tense | NNC skeleton / 12-16 NNC finalizer | VNC valence or tense cannot enter an NNC |
| 12.2 | 4387-4393 | vacant-State skeleton | authorize absolutive `#pers1-pers2(STEM)num1-num2#` | connector values / L14 | State or a noun suffix cannot be invented |
| 12.3 | 4394-4437 | absolutive skeleton | select nominative person and class-conditioned subject-number dyad | class choice / L14 | `x/xi` and predicate-owned number must fail |
| 12.4 | 4438-4483 | 12.3 subject rules | realize the complete person-number paradigm | stem/class / L14 | unsupported person-number pair cannot fall through |
| 12.5 | 4484-4504 | absolutive typed slots | keep nounstem as predicate, no tense, discourse time only | sentence interpretation / highest sentence layer | tense slot and definite-article meaning cannot be generated |
| 12.6 | 4505-4560 | nounstem plus subject reference | gate plural subject by animacy while allowing common number and metaphorical override | lexical/metaphorical decision / L15 | nounstem form alone cannot assert grammatical number |
| 12.7 | 4561-4571 | State plus nounstem | allow general State selection but preserve semantic restrictions | restrictions / L15 | unrestricted State cannot override a Canvas restriction |
| 13.1 | 4576-4589 | Lesson 4 possessive skeleton | authorize monadic and dyadic possessive State formulas | real possessors / 13.4-13.6 | possessive State cannot be moved outside predicate |
| 13.2 | 4590-4608 | possessive skeleton | select possessive subject number `uh/hu ~ hui ~ 0` and plural `hu-an` | lexical morphology / L14 | `uh/hu` cannot be called a possessive suffix |
| 13.3 | 4609-4626 | 13.2 subject rules | realize complete possessive subject paradigm | nounstem shape / L14 | absolutive number dyads cannot leak in |
| 13.4 | 4627-4647 | monadic State frame | authorize `ne`, `te`, `tla` possessor roles and restrictions | relational exceptions / L15 | monadic possessor cannot masquerade as dyadic person |
| 13.5 | 4648-4671 | dyadic State frame | split possessor person and number/case across st1-st2 | boundary allomorphy / L14 | st2 cannot be omitted when it carries required category |
| 13.6 | 4672-4696 | 13.5 specific possessor frame | realize specific possessor inventory and supportive/silent alternants | initial-stem boundary / L14.8 | traditional solid spelling cannot decide constituent analysis |
| 14.1 | 4699-4705 | source nounstem | select restricted use for absolutive and general use for possessive/embed | shape / 14.2, 14.7 | possessive output cannot blindly use citation form |
| 14.2 | 4706-4751 | source nounstem | represent lexical class, alternative class, and base/truncated/glottalized shape | use environment / 14.4-14.7 | ending heuristics cannot claim lexical class certainty |
| 14.3 | 4752-4824 | nounstem plus referent relation | derive affinity or distributive/varietal stem internally | NNC number slots / 14.4-14.6 | derivational collectivity cannot become grammatical number |
| 14.4 | 4825-4838 | absolutive common subject plus class | require restricted-use base shape and class connector | final ordinary slots / L15 | general-use/truncated stem cannot replace citation use here |
| 14.5 | 4839-4931 | absolutive plural subject plus class | choose plain/affinity/distributive stem and lexically authorized number dyad | lexical alternatives / L15 | class tendency cannot invent a lexical plural alternative |
| 14.6 | 4932-4959 | possessive plural frame | normally use plain general-use stem; allow motivated affinity/distributive | L15 assimilation | derived stem cannot be forced without semantic selection |
| 14.7 | 4960-5108 | possessive common frame | select base/truncated general-use subclass and `uh/hui/0/empty` connector | L15 peculiarities | ephemeral-vowel deletion and supportive-vowel insertion cannot be conflated |
| 14.8 | 5109-5153 | assembled possessive frame | preserve typed alternatives across ambiguous boundaries and spelling | typed final realization / L15 | surface spelling cannot reparse slots or erase vowel length |
| 15.1 | 5156-5288 | L13-L14 possessive NNC | apply general assimilation, lexical suppletion, possessor reduplication, secondary stems, analogical derivation, and reclassification as distinct actions | sentence layer / 15.3 | one witness-shaped rewrite cannot authorize neighboring stems |
| 15.2 | 5289-5335 | ordinary nounstem frame | enforce naturally-possessed and never-possessive lexical constraints, with metaphorical override | sentence layer / 15.3 | default State choice cannot violate lexical restriction |
| 15.3 | 5336-5371 | selected ordinary NNC | expose equative/attributive/adverbial sentence participation and ambiguity | highest active sentence layer | sentence particles cannot enter NNC slots; definiteness cannot be invented |
| 16.1 | 5374-5382 | L12 absolutive NNC | select pronominal semantic/structural family and internal plural `n` when licensed | subtype / 16.2-16.9 | plural `n` cannot become subject num1/num2 |
| 16.2 | 5383-5384 | pronominal family | classify entitive subtypes and record no relative pronouns | subtype / 16.3-16.6 | unsupported relative-pronoun family cannot be invented |
| 16.3 | 5385-5492 | entitive personal source | realize `eh/yeh` and `eh-hua/yeh-hua`, pluralized-stem variants, and typed alternatives | sentence use / later layer | English pronoun words cannot become source authority |
| 16.4 | 5493-5563 | entitive interrogative source | realize identificational interrogatives and context loss of interrogativity | sentence position/adjoining / later layer | fused traditional spelling cannot hide clause boundaries |
| 16.5 | 5564-5584 | demonstrative source | realize invariant third-person demonstrative NNC with silent plural dyad | honorific/sentence layers | stem cannot be pluralized merely because referent is plural |
| 16.6 | 5585-5607 | indefinite source | build `acah`/`itlah` compound stems and constrained human uses | sentence polarity/context | indefinite prefixes `te/tla` cannot substitute for these stems |
| 16.7 | 5608-5633 | quantitive source | represent compound matrix/embed inventory and context-sensitive allomorphs | 16.8-16.9 | spelling or one example cannot predict all `chi/qui` variants |
| 16.8 | 5634-5673 | `-qui-ch` quantitive source | build non-internal-plural quantitive NNCs and interrogative context behavior | sentence layer | internal plural `n` cannot be added to this family |
| 16.9 | 5674-5761 | `-qui` or `-chi` quantitive source | build internally pluralized stems, `t-in` or silent dyad, and attested variants | sentence layer | plain stem and pluralized stem cannot be frozen as one form |

## Evolution Rule

If a sublesson introduces a category the current frame cannot express, the shared schema must evolve before the rule is added. New fields require:

1. A Canvas witness and exact line range.
2. A typed source role.
3. A named transformation or selection action.
4. A declared finalizer.
5. A hostile test for the opposite behavior.
6. A surface control only when the decision belongs to the user; machine consequences remain read-only.

Examples remain verification vectors. They do not constitute the rule and cannot become lexical whitelists unless Canvas explicitly states that the behavior is lexical.

## Shared Surface Contract

- Source remains the entered `(STEM)`. A Lesson 16 family choice cannot manufacture a different pronominal stem; the entered stem must match the selected typed analysis.
- Authority exposes NNC subject, family, State, lexical class, possessive choices, conditioned number choices, referent status, and quantitive matrix only where the active Canvas family can use them.
- The ordinary route consumes Lessons 12-14 and is finalized by Lesson 15. The pronominal route consumes shared Lesson 12 structure and is finalized by Lesson 16.
- VNC-only mood, tense, class, valence, object, direction, polarity, and Lesson 11 construction controls are absent from the NNC surface.
- Result receives `selectedOutputLogicFrame` and the typed NNC slots. Formula text, translations, Canvas examples, and lesson numbers cannot independently authorize a result.
- Lesson 11.4.7 consumes `classical-nahuatl-lesson16-lesson11-cooperation-frame`; the former boolean cooperation claim is a hostile, rejected input.
