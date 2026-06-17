# Andrews PDF Digest

Source: `/Users/jaimenunez/Downloads/Andrews_Introduction_to_Classical_Nahuatl_693p_reOCR_squareZeroFixed.pdf`

Extraction check: local PDF read with bundled Python/pypdf on 2026-06-08. The PDF has 693 pages. The lesson/page sequence below follows the printed Contents: Lessons 1-58, Appendices A-G, and Index.

Copyright boundary: this is a paraphrased engineering digest. It is not a replacement for the book, does not reproduce paradigms or exercises, and should not be used as quoted wording. Before changing engine behavior, re-check the relevant PDF section directly.

## Authority Rules

- Andrews governs grammar architecture: categories, slot order, dependencies, boundaries, and source/target roles.
- Modern Nawat/Pipil orthography governs spelling realization. Classical spellings from Andrews are structural input, not direct Nawat surfaces.
- Nawat/Pipil evidence and user-confirmed forms govern fixtures, lexical examples, exceptions, and output forms.
- Lessons are curriculum and evidence indexes. The app should implement reusable engines, metadata, diagnostics, and controls rather than one module/control per lesson.
- A route can be shown as structural or diagnostic even when generation is blocked. Do not silently generate where Andrews requires an unconfirmed source.

## Global Grammar Model

- Andrews treats Nahuatl as its own system, not as English/Spanish categories translated into another spelling.
- "Word" is largely rejected for nuclear clauses; particles are the small class that can be treated as word-like.
- Core analysis is morphic: each surface is decomposed into information-bearing morphs and boundaries.
- Boundary notation matters: `#...#` for nuclear clause boundaries, parentheses for stems inside a clause formula, `+` for slot/position boundaries, and hyphen for stem-internal boundaries.
- Zero and square-zero distinguish regular mute morphs from irregular mute morphs in the Classical analysis. The app should preserve the distinction as metadata if it matters structurally.
- The two primary nuclear clause families are VNC and NNC.
- VNCs are organized around subject, object/valence, predicate stem, tense/mood, and number positions.
- NNCs are organized around subject, predicate nounstem, state, possessor when applicable, and number/reference positions. There is no tense slot in ordinary NNCs.
- Mainline and shuntline object behavior is a central Andrews distinction for VNC valence and derived voices.
- Supplementation, modification, complementation, conjunction, and adjunction are clause-unit structures; they must not be collapsed into single-word generation.

## Lesson Group Map

- Lessons 1-4: terminology, sounds/spelling, particles, and nuclear-clause formulas.
- Lessons 5-11: basic VNC, subject/object pronouns, tense, stem classes, sentence transforms, moods, and irregulars.
- Lessons 12-19: basic NNC, possession, noun classes, pronominal NNCs, and supplementation.
- Lessons 20-27: nonactive, passive, impersonal, causative, applicative, and frequentative verbstems.
- Lessons 28-34: compound verbstems, purposive VNCs, compound nounstems, affective/honorific/pejorative structures, and numeral NNCs.
- Lessons 35-43: nominalization, deverbal nounstems, patientive families, adjectival NNCs, and adjectival modification.
- Lessons 44-50: adverbial NNCs, relational/place/gentilic NNCs, and adverbial modification/adjunction.
- Lessons 51-58: complementation, conjunction, comparison, denominal verbstems, personal names, and miscellany.

## Lesson Digest

### Lesson 1: Linguistic Preliminaries (printed pp. 3-23)

- Establishes the anti-translationalist frame: learn Nahuatl through its own categories rather than through English/Spanish labels.
- Defines levels of analysis: phoneme/phone, morpheme/morph, stem, vocable, sentence, and structures made from them.
- Introduces the need to keep, redefine, reject, or coin terminology. Important rejected terms include preposition, postposition, auxiliary, and modal auxiliary.
- Engine implication: every later rule should be represented as internal structure, not as a translated label or gloss shortcut.

### Lesson 2: Pronunciation and Orthography (printed pp. 24-38)

- Presents Classical Nahuatl phonemes, vowel length, glottal stop, consonant classes, syllables, assimilation, elision, consonant loss, and spelling changes.
- Distinguishes phonemic/phonetic facts from inherited Spanish spelling conventions.
- Engine implication: Andrews spellings are grammar-rule evidence, but Nawat/Pipil spelling output must pass through the repo orthography bridge and Nawat evidence.

### Lesson 3: Particles (printed pp. 39-44)

- Defines particles as a minor lexical class distinct from nuclear clauses.
- Covers functional particle classes, negative particles, collocations, and honorificized particles.
- Engine implication: particles can be indexed and diagnosed, but they should not be forced into VNC/NNC stem generation.

### Lesson 4: Nuclear Clauses (printed pp. 45-49)

- Defines nuclear clauses and divides them into VNCs and NNCs.
- Builds formulas in stages, showing internal predicate structure and outside subject/object/number positions.
- Introduces personal pronouns as affixal material in nuclear clauses.
- Engine implication: VNC/NNC formulas should be structured slots, not plain strings.

### Lesson 5: Intransitive VNCs (printed pp. 50-55)

- Defines the intransitive VNC formula, subject positions, subject personal-pronoun fillers, and predicate/tense basics.
- Shows subject as a circumfixal pattern around the predicate/tense core.
- Engine implication: intransitive generation must keep person and number slots explicit around the stem/tense core.

### Lesson 6: Transitive VNCs (printed pp. 56-60)

- Defines transitive VNC formulas with monadic and dyadic valence positions.
- Introduces projective and reflexive object pronouns and object-pronoun summaries.
- Engine implication: object selection is a valence contract, not a label attached after conjugation.

### Lesson 7: Verbstem Classes (printed pp. 61-71)

- Explains verbstem morphemic structure, citation issues, stem classes, perfective-stem changes, variable class membership, and analysis/translation of VNCs.
- Includes how indefinite and personal-pronoun objects relate, plus `tla` fusion issues.
- Engine implication: class membership, stem shape, tense shape, and object behavior need separate metadata.

### Lesson 8: Expanded VNCs and Basic Sentences (printed pp. 72-77)

- Extends VNCs with optional prefixes and sentence-level material.
- Covers affirmative/negative assertion, emphatic assertion, and yes/no questions.
- Engine implication: sentence transformations should stay distinct from finite VNC word generation until sentence-level examples are explicitly modeled.

### Lesson 9: Optative Mood (printed pp. 78-83)

- Defines optative mood for wishes and command/exhortation sentence types.
- Contrasts optative and indicative VNCs, including affirmative/negative wish and command structures.
- Engine implication: optative morphology can be generated, but sentence force needs mood/sentence metadata.

### Lesson 10: Admonitive Mood (printed pp. 84-89)

- Defines admonitive as warning/advice, not a negative prohibition.
- Covers nonpast admonitive formation and affirmative/negative admonition sentences.
- Engine implication: do not label admonitive as optative/vetitive prohibition; keep polarity and cautionary mood distinct.

### Lesson 11: Irregular VNCs (printed pp. 90-99)

- Discusses irregularity in perfective stems, stem-final behavior, suppletion, and idioms.
- Engine implication: irregular behavior must be evidence-backed, scoped to specific stems, and not generalized from translation.

### Lesson 12: Absolutive-State NNCs (printed pp. 100-104)

- Contrasts NNC and VNC formulas.
- Defines absolutive-state NNCs, subject positions, subject pronouns, predicate position, animacy, and state.
- Engine implication: ordinary NNC formula is `#pers1-pers2(STEM)num1-num2#`; predicate is inside parentheses, connectors outside, and there is no tense slot.

### Lesson 13: Possessive-State NNCs (printed pp. 105-108)

- Defines possessive-state NNC formulas, subject/possessor positions, and monadic/dyadic possessive predicates.
- Engine implication: possessor and subject are separate roles; unsupported possessive states should diagnose rather than invent forms.

### Lesson 14: Nounstem Classes (printed pp. 109-119)

- Distinguishes use-stem kinds and four nounstem classes.
- Covers number, absolutive/possessive state, plural subject behavior, and analysis difficulties.
- Engine implication: noun class is grammar class only (`t`, `ti`, `in`, `zero` in the current Nawat bridge), not source status such as fixture/open/lexical.

### Lesson 15: Further NNC Remarks (printed pp. 120-125)

- Adds natural possession/state-case issues and NNC sentence structure.
- Engine implication: natural/required/inalienable possession needs confirmed Nawat/Pipil evidence before fixture fields or automatic generation.

### Lesson 16: Pronominal NNCs (printed pp. 126-135)

- Defines pronominal NNCs, entitive and quantitive families, and personal/interrogative/demonstrative/indefinite subtypes.
- Engine implication: pronominal NNCs are not ordinary NNCs with a different label; they need a parallel or explicitly extended slot model.

### Lesson 17: Supplementation, Part One (printed pp. 136-142)

- Introduces supplementation, especially shared-referent supplementation and topicalization.
- Covers information questions formed through supplements.
- Engine implication: supplements are clause-unit relations, not generated VNC/NNC word variants.

### Lesson 18: Supplementation, Part Two (printed pp. 143-148)

- Covers integrated, marked, discontinuous, named-partner, male-bonding, vocative, and deletion-related supplementation patterns.
- Notes free sentence-constituent order.
- Engine implication: supplementation needs AST/relationship metadata; do not treat UI topic/focus labels as evidence.

### Lesson 19: Supplementation, Part Three (printed pp. 149-159)

- Treats VNCs as supplements, included-referent supplementation, knowing/remembering constructions, reported speech, and deleted speech principals.
- Engine implication: VNC-as-supplement structures need clause-level modeling, not finite word generation.

### Lesson 20: Nonactive Verbstems (printed pp. 160-164)

- Presents nonactive stem formants such as `lo`, `lo-hua`, `o`, `o-hua`, `hua`, and `hua-lo`, plus class membership of nonactive stems.
- Engine implication: nonactive suffix contracts must preserve source-stem and target-class metadata; Classical `hua` sequences convert to Nawat `wa` where surfaced.

### Lesson 21: Passive-Voice VNCs (printed pp. 165-169)

- Defines passive generation from nonactive stems, passive behavior in optative/admonitive, and passive meaning expressed by active forms.
- Engine implication: passive is a voice/source transformation with valence effects, not simply a suffix substitution.

### Lesson 22: Impersonal VNCs (printed pp. 170-175)

- Distinguishes inherently impersonal VNCs, nonanimate subjects, impersonal voice, impersonal optative/admonitive, and `tla`-impersonal patterns.
- Engine implication: impersonal generation must keep nonanimate and impersonal distinct and model shuntline/mainline effects.

### Lesson 23: More on Verb Objects (printed pp. 176-181)

- Defines object kinds, multiple valence positions, restrictions on valence, multiple-valence formulas, and object ordering.
- Engine implication: multi-object VNCs need ordered valence slots and constraints rather than independent object toggles.

### Lesson 24: Type-One Causatives and Destockals (printed pp. 182-194)

- Relates valence to stem-final vowels, valence-neutral stems, first-type causatives, destockal derivation, and causative VNC generation.
- Engine implication: causative-one routes must record source valence, stem final, derived stem formative, and object requirement.

### Lesson 25: Type-Two Causatives (printed pp. 195-210)

- Covers `tia`, `lia`, and `huia` causatives from various source stems, class membership, single/double-object causatives, and voice/mood behavior.
- Engine implication: causative-two is source-sensitive; object count and nonactive/passive/impersonal interactions must be explicit.

### Lesson 26: Applicative Verbstems (printed pp. 211-227)

- Defines applicative nature, first/second type applicatives, source-ending rules, exceptions, class membership, transformations, object ambiguity, and voice/mood behavior.
- Engine implication: applicative requests need source stem class/final metadata, target object roles, and ambiguity diagnostics.

### Lesson 27: Frequentative Verbstems (printed pp. 228-234)

- Covers repeated/customary/assorted-action frequentatives, reduplication, object-pronoun reduplication, destockal sources, uncertain derivations, and nonactive frequentatives.
- Engine implication: frequentative must be isolated from generic reduplication helpers until confirmed Nawat/Pipil route examples are available.

### Lesson 28: Compound Verbstems with Verbal Embed (printed pp. 235-250)

- Defines compound stems, embed/matrix cohesiveness, VNC-predicate incorporation, connective-`t` compounds, intransitive-matrix compounds, special formations, accompanying possession, shared-object compounds, future embeds, and recursion.
- Engine implication: compound VNC support should parse matrix/embed roles and recursion; it should not flatten compounds into a string shortcut.

### Lesson 29: Purposive VNCs (printed pp. 251-259)

- Covers purposive verbstems, inbound/outbound directional behavior, passive/impersonal purposives, compound embeds, and directional prefixes.
- Engine implication: purposive should be directional/purposive boundary metadata until a proven Nawat generation route is scoped.

### Lesson 30: Compound Verbstems with Nominal Embed (printed pp. 260-278)

- Covers incorporated objects, incorporated adverbs of means/place/time/cause/manner/comparison, unique embed nounstems, incorporated complements, reduplication in embeds, passive/impersonal behavior, and caveats.
- Engine implication: incorporated NNC compounds need matrix/embed semantics, source clause role, and evidence boundaries; single generated words do not prove all compound relations.

### Lesson 31: Compound Nounstems (printed pp. 279-288)

- Defines NNC + NNC compound nounstems, embed meaning, possessor orientation, matrix importance, unique fillers, conjunctive compounds, multiple-stemmed fillers, sex/progeny/fellowship notions, affinity, and distributive/varietal shapes.
- Engine implication: compound NNCs need an NNC-specific AST and cannot be inferred from VNC parser punctuation alone.

### Lesson 32: Affective NNCs (printed pp. 289-297)

- Covers valuing/disparaging affective matrix nounstems, affinity shapes, `pil`, nonanimate affective behavior, and flawed-subject NNCs.
- Engine implication: affective generation needs confirmed Nawat data; current support should remain diagnostic/boundary metadata.

### Lesson 33: Honorific and Pejorative VNCs (printed pp. 298-306)

- Covers honorific formation through causative/applicative routes, projective/reflexive sources, reverential subtype, pejoratives, and compound-stem interactions.
- Engine implication: honorific/pejorative behavior should not be confused with ordinary causative/applicative generation unless the honorific source contract is explicit.

### Lesson 34: Cardinal-Numeral NNCs (printed pp. 307-318)

- Covers numeral stems, one/two/three/four/five/ten/fifteen, vigesimal multipliers, conjoined numerals, object-shape counting sets, reduplication, approximation/more, and measures.
- Engine implication: numeral NNCs require their own numeral stem system and cannot be generated from ordinary open-stem NNCs alone.

### Lesson 35: Nominalization of VNCs, Part One (printed pp. 319-338)

- Introduces VNC nominalization, preterit-agentive NNCs, restricted/general use, possessive-state preterit-agentives, embeds, ownerhood, abundant ownerhood, vocative interaction, and double-nucleus embeds.
- Engine implication: nominalized outputs can feed later matrix routes only when the generated nounstem/source role is explicit.

### Lesson 36: Nominalization of VNCs, Part Two (printed pp. 339-355)

- Covers customary-present agentive, fully nominalized agentive, patientive, instrumentive, present/future agentive, action NNCs, passive-action, active-action, and possessor-source contrasts.
- Engine implication: subject material can belong inside a nominalized predicate stem; possessor source may come from the source VNC subject in limited action-noun contracts.

### Lesson 37: Deverbal Nounstems, Part One (printed pp. 356-366)

- Defines deverbal nounstems, active-action `z/liz` family, alternate translation values, active/passive-action contrast, multiple-nucleus uses, and passive patientive nounstems.
- Engine implication: `z/liz` maps through Nawat orthography (`s/lis`) but does not by itself create fixture evidence for all nouns.

### Lesson 38: Deverbal Nounstems, Part Two (printed pp. 367-375)

- Covers impersonal patientive nounstems and compound patientive nounstems.
- Engine implication: passive and impersonal patientive families must stay distinct even when surfaces look similar.

### Lesson 39: Deverbal Nounstems, Part Three (printed pp. 376-394)

- Covers imperfective patientive nounstems, characteristic-property patientives, root/stock patientives, multiple patientive derivations, patientive embeds, incorporated complements/objects, and characteristic-property embeds.
- Engine implication: patientive routes need source procedure metadata, tli-class connector restrictions where Andrews requires them, and diagnostics for multiple possible derivations.

### Lesson 40: Adjectival NNCs, Part One (printed pp. 395-405)

- Covers exceptional adjectival NNCs, NNC/VNC adjective function, derivationally generated adjective-like nounstems, nominalized VNC predicates as adjectives, obsolete preterit predicates, synonym pairs/triplets, and predicate-adjective sentences.
- Engine implication: adjectival function can route generated outputs as adjective-like without inventing sibling synonyms or full modifier ASTs.

### Lesson 41: Adjectival NNCs, Part Two (printed pp. 406-412)

- Covers intensified adjectival NNCs, adjective nounstems from compound VNCs with nominal embeds, denominal verbstem sources, and adjectival nounstems as embeds.
- Engine implication: intensification and compound-source adjective metadata should preserve source roles and avoid changing Nawat surfaces without evidence.

### Lesson 42: Adjectival Modification, Part One (printed pp. 413-422)

- Covers multiple-nucleus adjectival modification, preposed modifiers, adjoined/principal modification structures, supplementation ambiguity, sentence modifiers, recursion, and incorporated modification.
- Engine implication: modification is clause/AST structure, not an output chip that changes a generated NNC.

### Lesson 43: Adjectival Modification, Part Two (printed pp. 423-429)

- Covers nonpreposed modifiers, cooperation of preposed/nonpreposed modifiers, discontinuity, interrogative heads, modified `oc ce`, shared-referent violations, singling-out, male-bonding, and named-partner modifiers.
- Engine implication: modifier/head order and shared-reference constraints should be AST metadata until confirmed examples justify generation.

### Lesson 44: Adverbial Nuclear Clauses (printed pp. 430-444)

- Defines adverbial nuclear clauses, degrees of adverbialization, adverbialized VNCs/NNCs, particle-looking NNCs, preterit-agentive adverbials, possessive-state adverbials, and incorporated adverbial modifiers.
- Engine implication: configured adverbio word output is partial; full adverbial clause support should be non-generative metadata unless examples are confirmed.

### Lesson 45: Relational NNCs, Part One (printed pp. 445-453)

- Rejects preposition/postposition labels and introduces relational nounstems with four usage options.
- Begins relational-stem groupings and option-one-only stems.
- Engine implication: relational NNCs require source/option metadata and must not be inferred from translation labels such as "place" or "preposition."

### Lesson 46: Relational NNCs, Part Two (printed pp. 454-475)

- Covers option-two relational nounstems, locative matrices such as `-n`, `-yan`, `-tlah`, `-co/-c`, `-ca`, directional/frequency `-pa`, other relational stems, and examples.
- Engine implication: locative/relational matrices are grammar structures; generated locativo-temporal nouns are not automatic relational evidence.

### Lesson 47: Relational NNCs, Part Three (printed pp. 476-492)

- Covers relational stems with options one/two/three, associated-entity NNCs, and pertinency NNCs.
- Engine implication: relational compounds and possessive relational predicates can be source evidence only when explicitly confirmed.

### Lesson 48: Place-Name and Gentilic NNCs (printed pp. 493-511)

- Defines place-name NNCs as adverbial in character and organizes place-name formation groups.
- Covers gentilic NNCs, incorporation, adjectival use, collectivity, and profession extensions.
- Engine implication: place/gentilic data needs confirmed Nawat/Pipil evidence; ordinary NNC fixtures or calendar labels are not enough.

### Lesson 49: Adverbial Modification, Part One (printed pp. 512-522)

- Covers multiple-nucleus adverbial modification, complex modification, recursion in head/modifier, intensifiers, adjunct plus appositive patterns, and double recursion.
- Engine implication: adverbial modification is recursive clause-unit structure and belongs in AST/diagnostics before generation.

### Lesson 50: Adverbial Modification, Part Two (printed pp. 523-536)

- Covers nonadverbialized clauses or clause units as adverbial modifiers: time, place, manner, consideration, purpose, concession, consequence, proviso, and reason.
- Engine implication: condition/purpose/concession/consequence/proviso markers need clause-level evidence and should not be treated as ordinary particle generation.

### Lesson 51: Complementation (printed pp. 537-543)

- Covers double-nucleus complement structures: object, subject, and adverbial complements.
- Engine implication: complement ASTs may compose supplied surfaces and link roles, but should not alter VNC/NNC generation.

### Lesson 52: Conjunction (printed pp. 544-558)

- Covers unmarked juxtaposition, marked `auh`, adverbial modifiers that are not conjunctions, correlative conjunction, lexical innovation, and parallel structure.
- Engine implication: conjunction needs balanced/principal/adjoined relation metadata; parser separators and slash variants are not evidence.

### Lesson 53: Similarity and Comparison (printed pp. 559-566)

- Covers similarity, comparison, equality, equality of size, comparative degree, "how much more" questions, and superlative degree.
- Engine implication: comparison remains non-generative until confirmed Nawat comparison examples justify data and AST behavior.

### Lesson 54: Denominal Verbstems, Part One (printed pp. 567-584)

- Covers inceptive/stative denominal suffixes `ti`, `hui`, `ya`, `a`, and `hua`; included-possessor `ti`; possession `ti`; and causative/applicative continuations from intransitive `ti`.
- Engine implication: denominal route targets must carry source requirements. `hui` and `hua` are Classical rule spellings and should surface through Nawat `wi`/`wa` where applicable.

### Lesson 55: Denominal Verbstems, Part Two (printed pp. 585-592)

- Covers temporal intransitive `tia`, causative and intransitive `tla`, `o-a` plus applicative `huia`, adverbial `huia`, relational-compound `o-a`/`huia`, `i-hui/a-hui > o-a`, and transitive `i-a`.
- Engine implication: many targets are source-limited. Temporal `tia` needs a confirmed temporal compound nounstem; adverbial/relational targets need confirmed source classification; `vt-na` is not Andrews-backed by the verified wording.

### Lesson 56: Personal-Name NNCs (printed pp. 593-607)

- Covers personal-name NNCs from single-clause, adjunction-created, and conjunction-created source units, plus sentence use.
- Engine implication: personal-name generation needs confirmed name data; capitalization, ordinary NNC, place/gentilic, or calendar metadata is not enough.

### Lesson 57: Miscellany, Part One (printed pp. 608-615)

- Covers nonsystemic tense use, valence irregularities, absolute topic, lack of supplement/head agreement, adverbial NNCs as supplements, and a nounstem-forming suffix.
- Engine implication: these are diagnostics and textual-analysis boundaries; do not normalize them into default engine behavior.

### Lesson 58: Miscellany, Part Two (printed pp. 616-626)

- Covers instrumental nounstems, problematic constructions, exclamations, `mah` constructions, principal-clause variants, incorporated nouns in subject function, and textual problems.
- Engine implication: miscellany should support diagnostics and evidence notes, not broad automatic generation.

## Appendix Digest

### Appendix A: VNC Paradigms (printed pp. 627-631)

- Provides paradigmatic VNC arrays across stem classes, tenses, moods, and active/nonactive relationships.
- Engine implication: use as paradigm-reference evidence after relevant lesson rules are understood; do not copy Classical surfaces as Nawat outputs.

### Appendix B: NNC Paradigms (printed pp. 632-638)

- Provides NNC paradigms conditioned by animacy, human/nonhuman status, state, nounstem class/subclass, and plural behavior.
- Engine implication: useful for validating slot architecture; fixture-backed Nawat examples still require Nawat evidence.

### Appendix C: Object Pronoun Combinations (printed pp. 639-643)

- Tabulates mainline/shuntline object combinations for single, double, and triple-object configurations.
- Engine implication: object-combination logic should be table/contract-driven, especially for multiple valence.

### Appendix D: Numeral NNCs and Numbers (printed pp. 644-647)

- Summarizes numeral NNCs, vigesimal organization, counting sets, and measures.
- Engine implication: numeral NNC support should be a specialized numeral system, not generic nominal generation.

### Appendix E: Day, Month, and Year Names (printed pp. 648-654)

- Summarizes divinatory and solar calendar naming, day signs, months, and year names.
- Engine implication: calendar data needs confirmed Nawat/Pipil forms and should not be inferred from ordinary NNC or place-name logic.

### Appendix F: Spelling Conventions in Older Texts (printed pp. 655-658)

- Summarizes Appendix F spelling conventions and their relation to phonological interpretation.
- Engine implication: Appendix F spelling handling belongs in an orthography/diagnostic bridge until alias data and tests justify normalization.

### Appendix G: Suggested Reading (printed pp. 659-662)

- Bibliographic orientation.
- Engine implication: no grammar generation contract; useful only for research triage.

## Extraction Gaps and Verification Notes

- pypdf extraction can misread long vowels, square zero, diacritics, and line-wrapped suffixes. Treat extracted spellings as leads, not final authority.
- The digest intentionally omits full paradigms and most examples. Use the PDF for exact paradigms before tests or data fixtures.
- Existing repo notes are strongest for Lessons 12-14, 35-41, 44-55, and the diagnostic boundaries for 51-58.
- Lessons 1-11, 15-34, and Appendices A-F should be re-checked section-by-section before any new engine contracts are implemented from this digest.
