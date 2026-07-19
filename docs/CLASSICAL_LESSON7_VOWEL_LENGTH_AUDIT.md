# Classical Lesson 7 Vowel-Length Audit

Authority: `ANDREWS_TRANSCRIPTION_CANVAS.md`. This audit records how every Lesson 7 sublesson bears on vowel length. Lessons are evidence indexes; the executable rule is the reusable class-and-environment selection carried into selected output.

| Section | Canvas lines | Vowel-length consequence | Machinery status |
| --- | ---: | --- | --- |
| 7.1 | 2843-2876 | Internal morph boundaries remain inside one verbstem. Hyphenated analysis and solid spelling must preserve the same source vowels and macrons. | Represented by unified-stem parsing; hostile tests prevent internal morphs becoming formula slots. |
| 7.2 | 2877-2901 | Citation includes valence plus stem. Citation formatting must not erase source vowel length. | Represented by citation frames; citation is metadata, not a spelling rewrite. |
| 7.3 | 2902-2957 | A-2, C, and D authorize length alternations; C also distinguishes full and truncated shapes. Tense morphs and number environments select among them. | Implemented as machine-readable `vowelLengthOperation` and `vowelLengthEnvironment`, carried with the selected stem. |
| 7.4 | 2962-2983 | Class B final-vowel loss and related phonological changes do not authorize indiscriminate deletion of preceding macrons. | Existing Class B actions preserve the remaining source vowel structure. |
| 7.5 | 2984-2989 | Variable A/B membership changes the perfective route, not the lexical vowel-length identity by itself. | Preserved as class alternatives; no invented length rewrite. |
| 7.6 | 2990-3044 | Guidelines classify long-final and short-final stems, including long final `a` as Class D and most `o/o:` stems as Class A. | Guideline authority constrains class selection; contradictory explicit classes fail closed. |
| 7.7 | 3045-3120 | The complete predicate table finalizes the stem shape and vowel length for the selected mood, tense, person, and number. | Corrected and surfaced. Earlier class identity remains provisional until this table cell is selected. |
| 7.8 | 3125-3236 | Surface homophony, especially Class D, cannot replace structural analysis. A short surface does not erase the authorized long source stem. | Source and selected vowels remain separately observable in proof data. |
| 7.9 | 3237-3264 | Object relations add object structure but do not independently authorize a vowel-length rewrite. | Object selection consumes the selected Lesson 7 stem without becoming length authority. |
| 7.10 | 3265-3285 | Fusion creates a derived stem; class and predicate-table selection then apply to that whole derived stem. | Fusion no longer bypasses the same vowel-length finalizer used by an unfused stem. |

## Corrected 7.7 Cells

- A-2: present selects the short variant; singular nonpast optative is short, while plural nonpast optative keeps the long variant. Nonpast admonitive is short in every number.
- Class C: present selects full short; future selects truncated long; nonpast optative singular selects truncated short; nonpast optative plural selects truncated long.
- Class D: present is short; imperfect and future keep long final `ā`; singular nonpast optative is short, while plural nonpast optative and past optative keep long `ā`.
- Solid spelling and hyphenated analysis use the same class rule. A solid form such as `choloā` can produce future `cholō`; its internal morphology need not be pre-whitelisted.
- Derived fusion uses the same finalizer. Present `tla-temō` selects `tla-temo`, not a witness-specific exception.

## Hostile Proof

The focused firewall tests require the Canvas-authorized length and reject the opposite carrier. They cover solid and hyphenated Class C forms, A-2 present shortening, Class D short and long environments, and fused A-2 output. This proves that an earlier lesson, a lexical witness, or an already-rendered formula cannot freeze vowel length before the active 7.7 table cell finalizes it.
