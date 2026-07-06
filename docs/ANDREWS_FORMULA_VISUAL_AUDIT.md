# Andrews Formula Visual Audit

Source occurrence index: `docs/ANDREWS_FORMULA_OCCURRENCES.md`

Purpose: track every formula occurrence whose formula material had a high OCR-risk feature named by the user or found during the visual pass: zero/square-zero glyphs, uppercase letters, OCR `1`, spaces inside parentheses, non-ellipsis punctuation inside stem material, or formula material split across a line/page break. The 2026-06-23 pass also reconciled wrapped formulas that were previously split into `hash-fragment` plus continuation-token rows, and printed or visibly incomplete formulas left as `hash-fragment` rows. These rows were checked against rendered PDF page images rather than accepted directly from the OCR text layer.

Visual conventions applied: `[sq0]` means Andrews square-zero; `0` means regular zero; OCR `I` corrected to lower-case `l` only in non-name, non-template stem material; OCR `1` corrected where the page image showed lower-case `l` or `i`; OCR-added spaces inside formula parentheses were removed; OCR punctuation inside stem material was corrected when the rendered page showed letters, hyphens, regular zero, or vowel length instead; line/page-broken formula material was fused back into one occurrence when the rendered page showed one continuous formula. Ellipsis placeholders (`...`) are exempt and retained as structural placeholders. Capitalized template variables and proper-name stems were retained. This audit targets the named OCR-risk characters, not full long-vowel/diacritic normalization for every row.

## Counts

- Visual-risk rows audited: 1159.
- Rows corrected: 485.
- Rows retained after visual review: 674.

## Audit Rows

| Occurrence | Printed page | PDF page | Line | Risk | Status | Formula after visual pass | OCR-layer formula |
| ---: | --- | ---: | ---: | --- | --- | --- | --- |
| 28 | 46 | 61 | 23 | `uppercase` | `visual-retained` | `#person+state(STEM)number#` | `#person+state(STEM)number#` |
| 29 | 46 | 61 | 26 | `printed-fragment` | `visual-retained` | `#person+ ... )number` | `#person+ ... )number` |
| 30 | 46 | 61 | 34 | `uppercase` | `visual-retained` | `#person+valence(STEM)tense+number#` | `#person+valence(STEM)tense+number#` |
| 39 | 47 | 62 | 36 | `uppercase` | `visual-retained` | `#pers1-pers2+va1-va2(STEM)tns+num1-num2#` | `#pers1-pers2+va1-va2(STEM)tns+num1-num2#` |
| 40 | 47 | 62 | 37 | `uppercase` | `visual-retained` | `#pers1-pers2+va(STEM)tns+num1-num2#` | `#pers1-pers2+va(STEM)tns+num1-num2#` |
| 41 | 47 | 62 | 38 | `uppercase` | `visual-retained` | `#pers1-pers2(STEM)tns+num1-num2#` | `#pers1-pers2(STEM)tns+num1-num2#` |
| 42 | 48 | 63 | 3 | `uppercase` | `visual-retained` | `#pers1-pers2+st1-st2(STEM)num1-num2#` | `#pers1-pers2+st1-st2(STEM)num1-num2#` |
| 43 | 48 | 63 | 4 | `uppercase` | `visual-retained` | `#pers1-pers2+st(STEM)num1-num2#` | `#pers1-pers2+st(STEM)num1-num2#` |
| 44 | 48 | 63 | 5 | `uppercase` | `visual-retained` | `#pers1-pers2(STEM)num1-num2#` | `#pers1-pers2(STEM)num1-num2#` |
| 45 | 50 | 65 | 7 | `uppercase` | `visual-retained` | `#pers1-pers2(STEM)tns+num1-num2#` | `#pers1-pers2(STEM)tns+num1-num2#` |
| 74 | 57 | 72 | 5 | `uppercase` | `visual-retained` | `#pers1-pers2+va(STEM)tns+num1-num2#` | `#pers1-pers2+va(STEM)tns+num1-num2#` |
| 75 | 57 | 72 | 35 | `uppercase` | `visual-retained` | `#pers1-pers2+va1-va2(STEM)tns+num1-num2#` | `#pers1-pers2+va1-va2(STEM)tns+num1-num2#` |
| 87 | 68 | 83 | 27 | `line-break` | `corrected` | `#lsg-nom+2pl-obj(love)pres+con-sg#` | `#lsg-nom+2pl-obj(love)pres+[line-break]con-sg#` |
| 103 | 69 | 84 | 15 | `line-break` | `corrected` | `#1 pl-nom+ 1 pl-reflexobj(cause-become-sweaty)fut+con-pl#` | `#1 pl-nom+ 1 pl-reflexobj( cause-become-[line-break]sweaty)fut+con-pl#` |
| 107 | 69 | 84 | 19 | `space` | `corrected` | `#0-0+qui-0(ce-lih)ca+0-0#` | `#0-0+qui-0( ce-lih)ca+0-0#` |
| 108 | 69 | 84 | 19 | `space` | `corrected` | `#3-nom+ 3obj-sg(receive)distpast+con-sg#` | `#3-nom+ 3obj-sg(receive )distpast+con-sg#` |
| 109 | 69 | 84 | 22 | `line-break` | `corrected` | `#3-nom+2pl-obj(capture)distpast+con-pl#` | `#3-nom+2pl-obj(capture)distpast+[line-break]con-pl#` |
| 114 | 69 | 84 | 31 | `space` | `corrected` | `#2pl-nom+ 3obj-sg(dye)pres+con-pl#` | `#2pl-nom+ 3obj-sg( dye )pres+con-pl#` |
| 116 | 69 | 84 | 33 | `space,line-break` | `corrected` | `#2sg-nom+ 3obj-sg(carry-on-the-back)cust-past+con-sg#` | `#2sg-nom+ 3obj-sg( carry-on-the-back)cust-[line-break]past+con-sg#` |
| 146 | 73 | 88 | 11 | `digit-one,zero-or-square-zero` | `corrected` | `#am+on+m-[sq0](a-l-ti-h)ca+[sq0]-h-#` | `#am+on+m-O(a-1-ti-h)ca+O-h-#` |
| 176 | 79 | 94 | 25 | `space` | `corrected` | `#xi-0(cuica)0+0-0#` | `#xi-0( cuica)0+0-0#` |
| 181 | 79 | 94 | 32 | `space` | `corrected` | `#ni-0(chol-o)0+0-0#` | `#ni-0( chol-o )0+0-0#` |
| 182 | 79 | 94 | 32 | `space` | `corrected` | `#ni-0(chol-o-a)0+0-0#` | `#ni-0( chol-o-a)0+0-0#` |
| 183 | 79 | 94 | 33 | `space` | `corrected` | `#xi-0(chol-o)0+0-0#` | `#xi-0( chol-o )0+0-0#` |
| 185 | 79 | 94 | 34 | `space` | `corrected` | `#0-0(chol-o)0+0-0#` | `#0-0( chol-o )0+0-0#` |
| 187 | 80 | 95 | 27 | `space` | `corrected` | `#ni-0(cochi)0+0-0#` | `#ni-0( cochi)0+0-0#` |
| 220 | 85 | 100 | 27 | `space` | `corrected` | `#0-0(tzahtzi)0+qu-eh#` | `#0-0( tzahtzi)0+qu-eh#` |
| 226 | 86 | 101 | 5 | `space` | `corrected` | `#0-0(chol-o-h)0+[sq0]-0#` | `#0-0( chol-o-h)0+O-0#` |
| 228 | 86 | 101 | 11 | `space` | `corrected` | `#ni-0+tla(cuah)0+[sq0]-0#` | `#ni-0+tla( cuah)0+O-0#` |
| 229 | 86 | 101 | 13 | `space` | `corrected` | `#ni-0+tla(cuah)0+[sq0]-0#` | `#ni-0+tla( cuah)0+O-0#` |
| 252 | 92 | 107 | 3 | `space` | `corrected` | `#n-0(on-o)0+c-0#` | `#n-0( on-o )0+c-0#` |
| 253 | 92 | 107 | 4 | `space` | `corrected` | `#t-0(on-o)0+qu-eh#` | `#t-0( on-o )0+qu-eh#` |
| 280 | 94 | 109 | 4 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-i-h)0+qu-eh#` | `#0-0(0-i-h)0+qu-eh#` |
| 281 | 94 | 109 | 5 | `zero-or-square-zero` | `visual-retained` | `#am-0(0-i-h)0+qu-eh#` | `#am-0(0-i-h)0+qu-eh#` |
| 288 | 95 | 110 | 6 | `space` | `corrected` | `#0-0(ye)ya+0-0#` | `#0-0(ye )ya+0-0#` |
| 291 | 95 | 110 | 11 | `space` | `corrected` | `#an-0(ye)z+qu-eh#` | `#an-0(ye )z+qu-eh#` |
| 293 | 95 | 110 | 15 | `space` | `corrected` | `#0-0(ye)0+c-an#` | `#0-0(ye )0+c-an#` |
| 298 | 95 | 110 | 25 | `space` | `corrected` | `# ti-0(ye)h+t-in#` | `# ti-0(ye )h+t-in#` |
| 300 | 95 | 110 | 31 | `space` | `corrected` | `#ti-0(ca-h)0+0-0#` | `#ti-0( ca-h)0+0-0#` |
| 303 | 95 | 110 | 34 | `space` | `corrected` | `#an-0(ca-t)0+0-eh#` | `#an-0( ca-t)0+0-eh#` |
| 331 | 97 | 112 | 36 | `printed-fragment` | `visual-retained` | `#xi-0(ya)ni+0-h` | `#xi-0(ya)ni+0-h` |
| 347 | 100 | 115 | 16 | `uppercase` | `visual-retained` | `#pers1-pers2(STEM)num1-num2#` | `#pers1-pers2(STEM)num1-num2#` |
| 348 | 100 | 115 | 18 | `space` | `corrected` | `#pers1-pers2(...)num1-num2#` | `#pers1-pers2( ......... )num1-num2#` |
| 349 | 102 | 117 | 2 | `space` | `corrected` | `#n-0(...)tl-0#` | `#n-0( ......... )tl-0#` |
| 350 | 102 | 117 | 3 | `space` | `corrected` | `#n-0(...)li-0#` | `#n-0( ... )li-0#` |
| 351 | 102 | 117 | 3 | `space` | `corrected` | `#n-0(...)tli-0#` | `#n-0( ... )tli-0#` |
| 352 | 102 | 117 | 4 | `space` | `corrected` | `#n-0(...)in-0#` | `#n-0( ... )in-0#` |
| 353 | 102 | 117 | 5 | `space` | `corrected` | `#n-0(...)0-0#` | `#n-0( ... )0-0#` |
| 354 | 102 | 117 | 6 | `space` | `corrected` | `#lsg-nom(...)con-sg#` | `#lsg-nom( ... )con-sg#` |
| 355 | 102 | 117 | 7 | `space` | `corrected` | `#t-0(...)t-in#` | `#t-0( ... )t-in#` |
| 356 | 102 | 117 | 8 | `space` | `corrected` | `#t-0(...)m-eh#` | `#t-0( . .. )m-eh#` |
| 357 | 102 | 117 | 9 | `space` | `corrected` | `#t-0(...)0-h#` | `#t-0( ... )0-h#` |
| 358 | 102 | 117 | 10 | `space` | `corrected` | `#t-0(...)tl-0#` | `#t-0( ... )tl-0#` |
| 359 | 102 | 117 | 11 | `space` | `corrected` | `#t-0(...)li-0#` | `#t-0( ... )li-0#` |
| 360 | 102 | 117 | 11 | `space` | `corrected` | `#t-0(...)tli-0#` | `#t-0( ... )tli-0#` |
| 361 | 102 | 117 | 12 | `space` | `corrected` | `#t-0(...)in-0#` | `#t-0( . .. )in-0#` |
| 362 | 102 | 117 | 13 | `space` | `corrected` | `#t-0(...)0-0#` | `#t-0( . .. )0-0#` |
| 363 | 102 | 117 | 14 | `space` | `corrected` | `#am-0(...)t-in#` | `#am-0( ... )t-in#` |
| 364 | 102 | 117 | 15 | `space` | `corrected` | `#am-0(...)m-eh#` | `#am-0( ... )m-eh#` |
| 365 | 102 | 117 | 16 | `space` | `corrected` | `#am-0(...)0-h#` | `#am-0( ... )0-h#` |
| 366 | 102 | 117 | 17 | `space` | `corrected` | `#0-0(...)tl-0#` | `#0-0( . .. )tl-0#` |
| 367 | 102 | 117 | 18 | `space` | `corrected` | `#0-0(...)li-0#` | `#0-0( ... )li-0#` |
| 368 | 102 | 117 | 18 | `space` | `corrected` | `#0-0(...)tli-0#` | `#0-0( ... )tli-0#` |
| 369 | 102 | 117 | 19 | `space` | `corrected` | `#0-0(...)in-0#` | `#0-0( ... )in-0#` |
| 370 | 102 | 117 | 20 | `space` | `corrected` | `#0-0(...)0-0#` | `#0-0( . .. )0-0#` |
| 371 | 102 | 117 | 21 | `space` | `corrected` | `#0-0(...)t-in#` | `#0-0( ... )t-in#` |
| 372 | 102 | 117 | 22 | `space` | `corrected` | `#0-0(...)m-eh#` | `#0-0( . .. )m-eh#` |
| 373 | 102 | 117 | 23 | `space` | `corrected` | `#0-0(...)0-h#` | `#0-0( . .. )0-h#` |
| 374 | 102 | 117 | 28 | `space` | `corrected` | `#lpl-nom(...)con-pl#` | `#lpl-nom( ... )con-pl#` |
| 376 | 102 | 117 | 30 | `space` | `corrected` | `#2pl-nom(...)con-pl#` | `#2pl-nom( ... )con-pl#` |
| 377 | 102 | 117 | 31 | `space` | `corrected` | `#3-nom(...)con-sg#` | `#3-nom( ... )con-sg#` |
| 378 | 102 | 117 | 32 | `space` | `corrected` | `#3-nom(...)con-pl#` | `#3-nom( ... )con-pl#` |
| 380 | 104 | 119 | 6 | `space` | `corrected` | `#ti-0(cem-it-hua-l)t-in#` | `#ti-0( cem-it-hua-l)t-in#` |
| 381 | 104 | 119 | 8 | `space` | `corrected` | `#0-0(cem-a-tzacu-a-l)t-in#` | `#0-0( cem-a-tzacu-a-l)t-in#` |
| 382 | 104 | 119 | 13 | `space` | `corrected` | `#ti-0(...)m-eh#` | `#ti-0( ... )m-eh#` |
| 383 | 105 | 120 | 10 | `uppercase,printed-fragment` | `visual-retained` | `#pers1-pers2+st(STEM)num1-num2` | `#pers1-pers2+st(STEM)num1-num2` |
| 385 | 105 | 120 | 15 | `uppercase` | `visual-retained` | `#pers1-pers2+st1-st2(STEM)num1-num2#` | `#pers1-pers2+st1-st2(STEM)num1-num2#` |
| 405 | 108 | 123 | 15 | `printed-fragment` | `visual-retained` | `#am-0+m-o(` | `#am-0+m-o(` |
| 406 | 108 | 123 | 16 | `printed-fragment` | `visual-retained` | `#0-0+am-o(` | `#0-0+am-o(` |
| 407 | 112 | 127 | 8 | `space` | `corrected` | `#0-0(me)tl-0#` | `#0-0(me )tl-0#` |
| 408 | 112 | 127 | 9 | `space` | `corrected` | `#ti-0(cihua)tl-0#` | `#ti-0( cihua)tl-0#` |
| 410 | 112 | 127 | 11 | `space` | `corrected` | `#n-0(oquich)tli-0#` | `#n-0( oquich)tli-0#` |
| 414 | 112 | 127 | 18 | `space` | `corrected` | `#0-0(cah-cal)li-0#` | `#0-0( cah-cal)li-0#` |
| 422 | 113 | 128 | 5 | `space` | `corrected` | `#0-0(chicuah)m-eh#` | `#0-0( chicuah)m-eh#` |
| 434 | 113 | 128 | 32 | `space` | `corrected` | `#0-0(ci-cih)t-in#` | `#0-0( ci-cih)t-in#` |
| 441 | 114 | 129 | 12 | `space` | `corrected` | `#0-0(quimichi)m-eh#` | `#0-0( quimichi)m-eh#` |
| 444 | 114 | 129 | 17 | `space` | `corrected` | `#am-0(oquich)m-eh#` | `#am-0( oquich)m-eh#` |
| 450 | 114 | 129 | 31 | `space` | `corrected` | `#0-0+i-0(co-col)hu-an#` | `#0-0+i-0( co-col)hu-an#` |
| 453 | 115 | 130 | 3 | `space` | `corrected` | `#0-0+n-o(cone)hu-an#` | `#0-0+n-o( cone)hu-an#` |
| 455 | 115 | 130 | 8 | `space` | `corrected` | `#an-0+t-o(cih)hu-an#` | `#an-0+t-o( cih)hu-an#` |
| 456 | 115 | 130 | 9 | `space` | `corrected` | `#0-0+t-[sq0](oquich)hu-an#` | `#0-0+t-O( oquich)hu-an#` |
| 462 | 115 | 130 | 24 | `space` | `corrected` | `#0-0+m-o(chichi)0-0#` | `#0-0+m-o( chichi)0-0#` |
| 465 | 115 | 130 | 33 | `space` | `corrected` | `#0-0+i-0(comal)0-0#` | `#0-0+i-0( comal)0-0#` |
| 467 | 115 | 130 | 38 | `space` | `corrected` | `#0-0+n-[sq0](oh)hui-0#` | `#0-0+n-O( oh)hui-0#` |
| 469 | 116 | 131 | 6 | `space` | `corrected` | `#0-0+am-o(ch)hui-0#` | `#0-0+am-o( ch)hui-0#` |
| 474 | 116 | 131 | 16 | `space` | `corrected` | `#n-0+i-0(oquich)hui-0#` | `#n-0+i-0( oquich)hui-0#` |
| 475 | 116 | 131 | 17 | `space` | `corrected` | `#n-0+i-0(oquich)0-0#` | `#n-0+i-0( oquich)0-0#` |
| 476 | 116 | 131 | 38 | `space` | `corrected` | `#ni-0+m-o(cihua)uh-0#` | `#ni-0+m-o( cihua)uh-0#` |
| 487 | 117 | 132 | 12 | `space` | `corrected` | `#0-0+t-o(xo)0-0#` | `#0-0+t-o(xo )0-0#` |
| 488 | 117 | 132 | 15 | `space` | `corrected` | `#0-0+m-o(cxi)0-0#` | `#0-0+m-o( cxi)0-0#` |
| 491 | 117 | 132 | 28 | `space` | `corrected` | `#0-0+i-0(cue)0-0#` | `#0-0+i-0( cue)0-0#` |
| 496 | 118 | 133 | 6 | `space` | `corrected` | `#0-0+t-o(cuauh)0-0#` | `#0-0+t-o( cuauh)0-0#` |
| 497 | 118 | 133 | 8 | `space` | `corrected` | `#0-0+i-0(con)0-0#` | `#0-0+i-0( con)0-0#` |
| 498 | 118 | 133 | 9 | `space` | `corrected` | `#0-0+n-o(cax)0-0#` | `#0-0+n-o( cax)0-0#` |
| 501 | 118 | 133 | 20 | `space` | `corrected` | `#0-0+i-0(coz-qui)0-0#` | `#0-0+i-0( coz-qui)0-0#` |
| 502 | 118 | 133 | 22 | `space` | `corrected` | `#0-0+i-0(coz-ca)uh-0#` | `#0-0+i-0( coz-ca)uh-0#` |
| 513 | 120 | 135 | 12 | `space` | `corrected` | `#ti-0+m-o(cn-i)hu-an#` | `#ti-0+m-o( cn-i)hu-an#` |
| 537 | 126 | 141 | 25 | `space` | `corrected` | `#n-0(eh)0-0#` | `#n-0( eh)0-0#` |
| 538 | 126 | 141 | 26 | `space` | `corrected` | `#t-0(eh)0-0#` | `#t-0( eh)0-0#` |
| 540 | 127 | 142 | 2 | `space` | `corrected` | `#t-0(eh)m-eh#` | `#t-0( eh)m-eh#` |
| 543 | 127 | 142 | 10 | `space` | `corrected` | `#0-0(eh)0-0#` | `#0-0( eh)0-0#` |
| 545 | 127 | 142 | 29 | `space` | `corrected` | `#t-0(eh-hua)tl-0#` | `#t-0( eh-hua)tl-0#` |
| 548 | 127 | 142 | 33 | `space` | `corrected` | `#am-0(eh-hua-n)t-in#` | `#am-0( eh-hua-n)t-in#` |
| 560 | 128 | 143 | 31 | `space` | `corrected` | `#ti-t-0(eh-hua-n)0-0#` | `#ti-t-0( eh-hua-n)0-0#` |
| 569 | 130 | 145 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0(a-0)c-0#` | `#0-0(a-0)c-0#` |
| 570 | 130 | 145 | 16 | `zero-or-square-zero` | `visual-retained` | `ay#0-0(a-0)c-0#` | `ay#0-0(a-0)c-0#` |
| 587 | 133 | 148 | 3 | `space` | `corrected` | `#an-0(que-x-ix-qui-ch)t-in#` | `#an-0( que-x-ix-qui-ch)t-in#` |
| 593 | 133 | 148 | 32 | `space` | `corrected` | `#ti-0(ce-qui-n)t-in#` | `#ti-0( ce-qui-n)t-in#` |
| 594 | 133 | 148 | 33 | `space` | `corrected` | `#ti-0(ce-qui-n)0-0#` | `#ti-0( ce-qui-n)0-0#` |
| 595 | 133 | 148 | 34 | `space` | `corrected` | `#az-0(ce-qui-n)0-0#` | `#az-0( ce-qui-n)0-0#` |
| 616 | 143 | 158 | 9 | `space` | `corrected` | `#0-0+n-[sq0](ih-i-yo)0-0#` | `#0-0+n-[sq0](ih-i-yo )0-0#` |
| 620 | 145 | 160 | 10 | `space` | `corrected` | `#0-0+i-0(toz-qui)0-0#` | `#0-0+i-0( toz-qui)0-0#` |
| 633 | 150 | 165 | 18 | `line-break` | `corrected` | `#0-0+qu-0(i)ya+0-0#` | `#0-0+qu-0(i)ya+0-[line-break]0#` |
| 634 | 151 | 166 | 17 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-i-h)0+qu-eh#` | `#0-0(0-i-h)0+qu-eh#` |
| 636 | 151 | 166 | 19 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-i-h)0+qu-eh#` | `#0-0(0-i-h)0+qu-eh#` |
| 638 | 151 | 166 | 35 | `zero-or-square-zero` | `visual-retained` | `#t-0(0-i-h)0+qu-eh#` | `#t-0(0-i-h)0+qu-eh#` |
| 639 | 151 | 166 | 38 | `zero-or-square-zero` | `visual-retained` | `#am-0(0-i-h)0+qu-eh#` | `#am-0(0-i-h)0+qu-eh#` |
| 640 | 151 | 166 | 39 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-i-h)0+qu-eh#` | `#0-0(0-i-h)0+qu-eh#` |
| 641 | 152 | 167 | 13 | `zero-or-square-zero` | `visual-retained` | `#am-0(a-qu-0-i-h)0+qu-eh#` | `#am-0(a-qu-0-i-h)0+qu-eh#` |
| 645 | 152 | 167 | 21 | `zero-or-square-zero` | `visual-retained` | `#ti-0(tl-e-0-i-h)0+qu-eh#` | `#ti-0(tl-e-0-i-h)0+qu-eh#` |
| 646 | 152 | 167 | 22 | `zero-or-square-zero` | `visual-retained` | `#0-0(ca-tl-e-0-i-h)0+qu-eh#` | `#0-0(ca-tl-e-0-i-h)0+qu-eh#` |
| 647 | 152 | 167 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0(ca-tl-0-i-h)0+0-0#` | `#0-0(ca-tl-0-i-h)0+0-0#` |
| 648 | 152 | 167 | 28 | `zero-or-square-zero` | `visual-retained` | `#ti-0(ca-tl-0-i-h)0+0-0#` | `#ti-0(ca-tl-0-i-h)0+0-0#` |
| 649 | 152 | 167 | 29 | `zero-or-square-zero` | `visual-retained` | `#0-0(ca-tl-0-i-h)0+qu-eh#` | `#0-0(ca-tl-0-i-h)0+qu-eh#` |
| 661 | 167 | 182 | 6 | `uppercase` | `corrected` | `o#0-0+ne(tequi-ti-lo)ya+0-0#` | `o#0-0+ne(tequi-ti-Io)ya+0-0#` |
| 673 | 170 | 185 | 17 | `space` | `corrected` | `#0-0(quiy-a-hui)z+0-0#` | `#0-0( quiy-a-hui)z+0-0#` |
| 677 | 172 | 187 | 23 | `space` | `corrected` | `#0-0(mayana-lo)0+0-0#` | `#0-0(mayana-lo )0+0-0#` |
| 680 | 172 | 187 | 32 | `uppercase` | `corrected` | `#0-0(hui-lo-hua)0+0-0#` | `#0-0(hui-Io-hua)0+0-0#` |
| 685 | 173 | 188 | 9 | `uppercase` | `corrected` | `#0-0+te(tla-zo-h-tla-lo)0+0-0#` | `#0-0+te(tla-zo-h-tla-Io)0+0-0#` |
| 686 | 173 | 188 | 12 | `uppercase` | `corrected` | `o#0-0+tla(pol-o-lo)0+c-0#` | `o#0-0+tla(pol-o-Io)0+c-0#` |
| 688 | 173 | 188 | 21 | `uppercase` | `corrected` | `#0-0+ne(zahua-lo)0+0-0#` | `#0-0+ne(zahua-Io)0+0-0#` |
| 689 | 173 | 188 | 24 | `uppercase` | `corrected` | `o#0-0+ne+tla(tequi-ti-lo)0+c-0#` | `o#0-0+ne+tla(tequi-ti-Io)0+c-0#` |
| 690 | 174 | 189 | 3 | `space` | `corrected` | `#0-0(hue-tz-c-o)h+0-0#` | `#0-0(hue-tz-c-o )h+0-0#` |
| 692 | 176 | 191 | 21 | `space` | `corrected` | `#ni-0+c-0(cuel-o-a)0+0-0#` | `#ni-0+c-0( cuel-o-a)0+0-0#` |
| 693 | 176 | 191 | 23 | `space` | `corrected` | `#ni-0+c-0(cuica-t-ia)0+0-0#` | `#ni-0+c-0( cuica-t-ia)0+0-0#` |
| 694 | 177 | 192 | 37 | `uppercase` | `visual-retained` | `(STEM)` | `(STEM)` |
| 695 | 177 | 192 | 38 | `uppercase` | `visual-retained` | `+va(IBASE-SUF)` | `+va(IBASE-SUF)` |
| 696 | 177 | 192 | 39 | `uppercase` | `visual-retained` | `+va+va(IBASE-SUF-SUF)` | `+va+va(IBASE-SUF-SUF)` |
| 697 | 177 | 192 | 40 | `uppercase` | `visual-retained` | `+va+va+va(IBASE-SUF-SUF-SUF)` | `+va+va+va(IBASE-SUF-SUF-SUF)` |
| 698 | 178 | 193 | 3 | `uppercase` | `visual-retained` | `+va(STEM)` | `+va(STEM)` |
| 699 | 178 | 193 | 4 | `uppercase` | `visual-retained` | `+va+va(DBASE-SUF)` | `+va+va(DBASE-SUF)` |
| 700 | 178 | 193 | 5 | `uppercase` | `visual-retained` | `+va+va+va(DBASE-SUF-SUF)` | `+va+va+va(DBASE-SUF-SUF)` |
| 705 | 179 | 194 | 17 | `uppercase` | `visual-retained` | `#pers1-pers2+va+va+va(DBASE-CAUS-APPLIC)tns+num1-num2#` | `#pers1-pers2+va+va+va(DBASE-CAUS-APPLIC)tns+num1-num2#` |
| 706 | 179 | 194 | 19 | `printed-fragment` | `visual-retained` | `#pers1-pers2+ . . . +num1-num2` | `#pers1-pers2+ . . . +num1-num2` |
| 710 | 193 | 208 | 10 | `printed-fragment` | `visual-retained` | `#ni-0+ ... +0-` | `#ni-0+ ... +0-` |
| 713 | 202 | 217 | 9 | `space` | `corrected` | `#0-0(quiza)0+0-0#` | `#0-0( quiza)0+0-0#` |
| 714 | 202 | 217 | 10 | `space` | `corrected` | `#ti-0+c-0(quix-tia)0+0-0#` | `#ti-0+c-0( quix-tia)0+0-0#` |
| 716 | 202 | 217 | 15 | `space` | `corrected` | `#ni-0+n-o(quix-tia)0+0-0#` | `#ni-0+n-o( quix-tia)0+0-0#` |
| 718 | 202 | 217 | 31 | `space` | `corrected` | `#ti-0+te(quix-tia)0+0-0#` | `#ti-0+te( quix-tia)0+0-0#` |
| 719 | 203 | 218 | 4 | `space` | `corrected` | `#ni-0+c-0(chihua)0+0-0#` | `#ni-0+c-0( chihua)0+0-0#` |
| 724 | 203 | 218 | 18 | `uppercase` | `corrected` | `#ti-0+qu-in+[sq0]-[sq0](notza-l-tia)0+0-0#` | `#ti-0+qu-in+[sq0]-[sq0](notza-I-tia)0+0-0#` |
| 728 | 203 | 218 | 32 | `line-break` | `corrected` | `#ti-0+n-ech+ne(petl-a-hu-a-l-tia)0+0-0#` | `#ti-0+n-ech+ne(petl-a-hu-a-l-tia)0+0-[line-break]0#` |
| 734 | 204 | 219 | 18 | `space` | `corrected` | `#ti-0+n-ech+tla(cahua-l-tia)0+0-0#` | `#ti-0+n-ech+tla( cahua-l-tia)0+0-0#` |
| 735 | 204 | 219 | 26 | `space` | `corrected` | `#ni-0+c-0(cahua)0+0-0#` | `#ni-0+c-0( cahua)0+0-0#` |
| 741 | 205 | 220 | 10 | `space` | `corrected` | `#ni-0(notza-lo)0+0-0#` | `#ni-0(notza-lo )0+0-0#` |
| 745 | 205 | 220 | 27 | `space` | `corrected` | `#ni-0(piya-lo)0+0-0#` | `#ni-0(piya-lo )0+0-0#` |
| 749 | 206 | 221 | 17 | `space` | `corrected` | `#ni-0+m-itz+0-0(caqui-tia)0+0-0#` | `#ni-0+m-itz+0-0( caqui-tia)0+0-0#` |
| 750 | 206 | 221 | 19 | `space,uppercase` | `corrected` | `#0-0+n-ech+0-0+0-0(caqui-ti-l-tia)0+0-0#` | `#0-0+n-ech+0-0+0-0( caqui-ti-I-tia)0+0-0#` |
| 752 | 206 | 221 | 24 | `space` | `corrected` | `#ti-0+n-ech+[sq0]-in+0-0(caqui-ti-l-tia)0+0-0#` | `#ti-0+n-ech+O-in+0-0( caqui-ti-l-tia)0+0-0#` |
| 754 | 206 | 221 | 30 | `space` | `corrected` | `#ti-0+n-ech+0-0+tla(caqui-ti-l-tia)0+0-0#` | `#ti-0+n-ech+0-0+tla( caqui-ti-l-tia)0+0-0#` |
| 755 | 206 | 221 | 33 | `space` | `corrected` | `#ni-0+c-0+te(caqui-tia)0+0-0#` | `#ni-0+c-0+te( caqui-tia)0+0-0#` |
| 758 | 207 | 222 | 2 | `space` | `corrected` | `#ni-0+qu-in+0-0+ne(caqui-ti-l-tia)0+0-0#` | `#ni-0+qu-in+0-0+ne( caqui-ti-l-tia)0+0-0#` |
| 763 | 207 | 222 | 20 | `space` | `corrected` | `#ni-0+c-0+te(caqui-tia)0+0-0#` | `#ni-0+c-0+te( caqui-tia)0+0-0#` |
| 765 | 207 | 222 | 25 | `space` | `corrected` | `#ni-0+qu-in+tla(caqui-tia)0+0-0#` | `#ni-0+qu-in+tla( caqui-tia)0+0-0#` |
| 766 | 207 | 222 | 27 | `space` | `corrected` | `#ni-0+qu-in+n-o+tla(caqui-ti-l-tia)0+0-0#` | `#ni-0+qu-in+n-o+tla( caqui-ti-l-tia)0+0-0#` |
| 768 | 207 | 222 | 32 | `space` | `corrected` | `#ni-0+n-o+te+tla(caqui-ti-l-tia)0+0-0#` | `#ni-0+n-o+te+tla( caqui-ti-l-tia)0+0-0#` |
| 769 | 207 | 222 | 37 | `space` | `corrected` | `#ni-0+0-0(caqui-ti-lo)0+0-0#` | `#ni-0+0-0( caqui-ti-lo )0+0-0#` |
| 770 | 208 | 223 | 2 | `space` | `corrected` | `#ti-0+n-ech+[sq0]-0+te(caqui-ti-l-tia)0+0-0#` | `#ti-0+n-ech+[sq0]-0+te( caqui-ti-l-tia)0+0-0#` |
| 771 | 208 | 223 | 5 | `space` | `corrected` | `#ni-0+tla(caqui-ti-lo)0+0-0#` | `#ni-0+tla( caqui-ti-lo )0+0-0#` |
| 772 | 208 | 223 | 7 | `space` | `corrected` | `#ti-0+n-ech+te+tla(caqui-ti-l-tia)0+0-0#` | `#ti-0+n-ech+te+tla( caqui-ti-l-tia)0+0-0#` |
| 777 | 209 | 224 | 19 | `space` | `corrected` | `#ti-0+0-0(chihua-l-ti-lo)0+0-h#` | `#ti-0+0-0( chihua-l-ti-lo )0+0-h#` |
| 778 | 209 | 224 | 22 | `uppercase` | `corrected` | `#ti-0+qu-in(notza-l-ti-lo)0+0-0#` | `#ti-0+qu-in(notza-l-ti-Io)0+0-0#` |
| 780 | 209 | 224 | 25 | `space,uppercase` | `corrected` | `#0-0 + ne(cui-ti-lo)0+c-0#` | `#0-0 + ne( cui-ti-Io)0+c-0#` |
| 784 | 210 | 225 | 7 | `uppercase` | `corrected` | `#0-0+n-ech+[sq0]-[sq0]+[sq0]-0(caqui-ti-l-tih)0+qu-eh#` | `#0-0+n-ech+[sq0]-[sq0]+[sq0]-0(caqui-ti-I-tih)0+qu-eh#` |
| 795 | 220 | 235 | 33 | `space` | `corrected` | `#0-0+te(cen-tla-ht-a-l-huih)0+qu-eh#` | `#0-0+te( cen-tla-ht-a-l-huih)0+qu-eh#` |
| 802 | 222 | 237 | 27 | `uppercase` | `corrected` | `#0-0+n-ech+[sq0]-0+te(paca-l-ti-lia)0+0-0#` | `#0-0+n-ech+[sq0]-0+te(paca-I-ti-lia)0+0-0#` |
| 805 | 223 | 238 | 2 | `uppercase,line-break` | `corrected` | `#0-0+m-itz+[sq0]-0+m-o(paca-l-ti-lia)0+0-0#` | `#0-0+m-itz+[sq0]-0+m-o(paca-I-ti-Iia)0+0-[line-break]0#` |
| 809 | 224 | 239 | 12 | `uppercase` | `corrected` | `ca#xi-0+c-0+[sq0]-0(tlami-li)0+[sq0]-0#` | `ca#xi-0+c-0+O-0(tlami-Ii)0+O-0#` |
| 819 | 226 | 241 | 9 | `uppercase` | `corrected` | `#0-0+n-ech+tla(chihui-lih)0+0-0#` | `#0-0+n-ech+tla(chihui-Iih)0+0-0#` |
| 820 | 226 | 241 | 11 | `uppercase` | `corrected` | `#0-0+n-ech+0-0(tla-chihu-i-lih)0+0-0#` | `#0-0+n-ech+0-0(tla-chihu-i-Iih)0+0-0#` |
| 844 | 238 | 253 | 10 | `zero-or-square-zero` | `visual-retained` | `#ni-0(tzahtzi-0-t-e-hua)0+0-0#` | `#ni-0(tzahtzi-0-t-e-hua)0+0-0#` |
| 845 | 238 | 253 | 35 | `zero-or-square-zero` | `visual-retained` | `#0-0+tla(cuah-0-ti-ca-t)0+0-eh#` | `#0-0+tla(cuah-0-ti-ca-t)0+0-eh#` |
| 846 | 238 | 253 | 40 | `zero-or-square-zero` | `visual-retained` | `#0-0+(cuica-0-ti-ye)0+0-0#` | `#0-0+(cuica-0-ti-ye)0+0-0#` |
| 847 | 239 | 254 | 3 | `zero-or-square-zero` | `visual-retained` | `#ti-0(coh-coch-0-ti-ca-t)ca+0-0#` | `#ti-0(coh-coch-0-ti-ca-t)ca+0-0#` |
| 848 | 239 | 254 | 6 | `zero-or-square-zero` | `visual-retained` | `#ti-0(cop-0-ti-ye)h+0-0#` | `#ti-0(cop-0-ti-ye)h+0-0#` |
| 849 | 239 | 254 | 10 | `space,zero-or-square-zero` | `corrected` | `#ti-0+c-0(chiuh-0-ti-ye)h+0-0#` | `#ti-0+c-0( chiuh-0-ti-ye )h+0-0#` |
| 850 | 239 | 254 | 16 | `zero-or-square-zero` | `visual-retained` | `#t-0(e-hua-0-ti-ca-h)0+0-0#` | `#t-0(e-hua-0-ti-ca-h)0+0-0#` |
| 851 | 239 | 254 | 21 | `line-break,zero-or-square-zero` | `corrected` | `o#ni-0(cual-ā-n-0-ti-nen)0+[sq0]-0#` | `cual-a-n-0-ti-nen)0+0-0#[line-break]o#ni-0(` |
| 852 | 239 | 254 | 24 | `zero-or-square-zero` | `visual-retained` | `#ti-0+qu-in(huica-0-ti-nemi)z+qu-eh#` | `#ti-0+qu-in(huica-0-ti-nemi)z+qu-eh#` |
| 853 | 239 | 254 | 29 | `line-break,zero-or-square-zero` | `corrected` | `#ni-0(cuīca-0-ti-uh)0+0-0#` | `#ni-0(cuica-0-ti-uh)[line-break]0+0-0#` |
| 854 | 239 | 254 | 31 | `line-break,zero-or-square-zero` | `corrected` | `#ti-0(cuīca-0-ti-hui)0+0-h#` | `#ti-0( cuica-0-[line-break]ti-hui)0+0-h#` |
| 855 | 239 | 254 | 34 | `line-break,zero-or-square-zero` | `corrected` | `o#0-0+tla(pōuh-0-ti-yah)0+[sq0]-0#` | `o#0-[line-break]0+tla(pouh-0-ti-yah)0+0-0#` |
| 856 | 239 | 254 | 39 | `line-break,zero-or-square-zero` | `corrected` | `#ni-0+c-0(man-0-ti-yā)z+[sq0]-0#` | `#ni-0+c-[line-break]0(man-0-ti-ya)z+0-0#` |
| 857 | 240 | 255 | 5 | `line-break,zero-or-square-zero` | `corrected` | `#ni-0+tla(cuah-0-t-ā)z+[sq0]-0#` | `#ni-0+tla(cuah-0-[line-break]t-a)z+0-0#` |
| 858 | 240 | 255 | 7 | `line-break,zero-or-square-zero` | `corrected` | `o#0-0+hual+la(cuah-0-t-ah)0+[sq0]-0#` | `o#0-0+[line-break]cuah-0-t-ah)0+0-0#` |
| 859 | 240 | 255 | 11 | `line-break,zero-or-square-zero` | `corrected` | `o#0-0(tla-cal-ā-n-0-t-ah)0+[sq0]-0#` | `o#0-0(tla-[line-break]cal-a-n-0-t-ah)0+0-0#` |
| 862 | 240 | 255 | 22 | `zero-or-square-zero` | `visual-retained` | `#0-0+qui-0(quen-0-ti-yah)0+0-0#` | `#0-0+qui-0(quen-0-ti-yah)0+0-0#` |
| 864 | 240 | 255 | 24 | `line-break,zero-or-square-zero` | `corrected` | `#ti-0+qui-0+[sq0]-0(quen-tia)0+0-0#` | `#ti-[line-break]quen-tia)0+0-0#` |
| 865 | 240 | 255 | 31 | `zero-or-square-zero` | `visual-retained` | `#ni-0+c-0(nec-0-ti-ya)ya+0-0#` | `#ni-0+c-0(nec-0-ti-ya)ya+0-0#` |
| 867 | 240 | 255 | 40 | `line-break,zero-or-square-zero` | `corrected` | `#0-0(tzah-tzi-0-ti-huāl-lah)0+0-0#` | `#0-0(tzah-[line-break]tzi-0-ti-hual-lah)0+0-0#` |
| 868 | 240 | 255 | 44 | `zero-or-square-zero` | `visual-retained` | `#xi-0+c-0(mamah-0-ti-hual-hui)0+0-an#` | `#xi-0+c-0(mamah-0-ti-hual-hui)0+0-an#` |
| 869 | 240 | 255 | 47 | `line-break,zero-or-square-zero` | `corrected` | `o#0-0(cual-ā-n-0-ti-hui-tz)a+0-0#` | `0#0-[line-break]cual-a-n-0-ti-hui-tz)a+0-0#` |
| 870 | 241 | 256 | 2 | `line-break,zero-or-square-zero` | `corrected` | `#0-0+tla(cuah-0-ti-hui-tz)0+[sq0]-eh#` | `#0-[line-break]cuah-0-ti-hui-tz)0+0-eh#` |
| 872 | 241 | 256 | 14 | `line-break,zero-or-square-zero` | `corrected` | `o#ni-0+tla(tqui-tz)a+0-0#` | `o#ni-0+tla(tqui-[line-break]tz)a+0-0#` |
| 873 | 241 | 256 | 18 | `line-break,zero-or-square-zero` | `corrected` | `o#ni-0(tlaōco-x-0-t-ahci)0+c-0#` | `o#ni-0(tlaoco-[line-break]x-0-t-ahci)0+c-0#` |
| 874 | 241 | 256 | 21 | `line-break,zero-or-square-zero` | `corrected` | `#ti-0+c-0(māmah-0-t-ahci)z+[sq0]-0#` | `#ti-0+c-0[line-break](mamah-0-t-ahci)z+[sq0]-0#` |
| 875 | 241 | 256 | 26 | `zero-or-square-zero` | `visual-retained` | `o#0-0(ten-0-ti-man)ca+0-0#` | `o#0-0(ten-0-ti-man)ca+0-0#` |
| 876 | 241 | 256 | 28 | `line-break,zero-or-square-zero` | `corrected` | `#0-0(tla-chix-0-ti-mani)0+0-h#` | `#0-0(tla-[line-break]chix-0-ti-mani)0+0-h#` |
| 877 | 241 | 256 | 32 | `line-break,zero-or-square-zero` | `corrected` | `#ni-0+n-o(quetz-0-t-ihca)0+c-0#` | `#ni-[line-break]quetz-0-t-ihca)0+c-0#` |
| 878 | 241 | 256 | 35 | `line-break,zero-or-square-zero` | `corrected` | `o#ti-0(chōca-0-t-ihca)ca+0-h#` | `o#ti-[line-break]0(choca-0-t-ihca)ca+0-h#` |
| 879 | 242 | 257 | 3 | `line-break,zero-or-square-zero` | `corrected` | `#0-0(tlap-ā-n-0-t-o)0+c-0#` | `#0-0(tlap-a-n-0-[line-break])0+c-0#` |
| 880 | 242 | 257 | 7 | `line-break,zero-or-square-zero` | `corrected` | `#ti-0+t-o(tlāz-0-t-o)0+qu-eh#` | `#ti-0+t-o(tlaz-[line-break]0-t-o)0+qu-eh#` |
| 881 | 242 | 257 | 13 | `line-break,zero-or-square-zero` | `corrected` | `o#ni-0+n-[sq0](ē-uh-0-t-ē-hua)0+c-0#` | `o#ni-0+n-[sq0](e-uh-0-[line-break]t-e-hua)0+c-0#` |
| 882 | 242 | 257 | 17 | `space,zero-or-square-zero` | `corrected` | `#ti-0+c-0(cauh-0-t-e-hua)z+qu-eh#` | `#ti-0+c-0( cauh-0-t-e-hua)z+qu-eh#` |
| 883 | 242 | 257 | 19 | `line-break,zero-or-square-zero` | `corrected` | `o#0-0(cual-ā-n-0-t-ē-uh)0+[sq0]-0#` | `0#0-[line-break]cual-a-n-0-t-e-uh)0+0-0#` |
| 884 | 242 | 257 | 24 | `line-break,zero-or-square-zero` | `corrected` | `o#ni-0(quiz-0-ti-quiz)0+[sq0]-0#` | `o#ni-0([line-break]0+0-0#` |
| 885 | 242 | 257 | 27 | `line-break,zero-or-square-zero` | `corrected` | `#0-0+qui-0(cui-0-ti-quiza)z+[sq0]-0#` | `#0-0+qui-0(cui-0-[line-break]ti-quiza)z+0-0#` |
| 886 | 242 | 257 | 32 | `line-break,zero-or-square-zero` | `corrected` | `o#0-0(huetz-0-ti-huetz)0+qu-eh#` | `o#0-0(huetz-0-[line-break]ti-huetz)0+qu-eh#` |
| 887 | 242 | 257 | 35 | `line-break,zero-or-square-zero` | `corrected` | `#ni-0+c-0(cui-0-ti-huetzi)z+[sq0]-0#` | `#ni-0+c-0(cui-0-[line-break]ti-huetzi)z+0-0#` |
| 888 | 243 | 258 | 3 | `zero-or-square-zero` | `visual-retained` | `o#0-0(mic-0-ti-huetz)0+0-0#` | `o#0-0(mic-0-ti-huetz)0+0-0#` |
| 889 | 243 | 258 | 6 | `line-break,zero-or-square-zero` | `corrected` | `#0-0+m-o(tlal-o-h-0-ti-tlehco)0+0-0#` | `#0-0+m-o(tlal-[line-break]o-h-0-ti-tlehco)0+0-0#` |
| 890 | 243 | 258 | 11 | `line-break,zero-or-square-zero` | `corrected` | `o#ti-0+t-o(tlal-o-h-0-ti-cal-ac)0+qu-eh#` | `o#ti-0+t-[line-break]o(tlal-o-h-0-ti-cal-ac)0+qu-eh#` |
| 891 | 243 | 258 | 16 | `space,zero-or-square-zero` | `corrected` | `#0-0(coch-0-ti-pil-ca)ca+0-0#` | `#0-0( coch-0-ti-pil-ca)ca+0-0#` |
| 892 | 243 | 258 | 24 | `zero-or-square-zero` | `visual-retained` | `o#ti-0(ye-0-ti-ca-t)ca+0-0#` | `o#ti-0(ye-0-ti-ca-t)ca+0-0#` |
| 893 | 243 | 258 | 26 | `zero-or-square-zero` | `visual-retained` | `o#ni-0(ye-0-ti-yah)0+0-0#` | `o#ni-0(ye-0-ti-yah)0+0-0#` |
| 894 | 243 | 258 | 31 | `line-break,zero-or-square-zero` | `corrected` | `#ti-0(yah-0-ti-ca-t)0+[sq0]-eh#` | `#ti-0(yah-0-ti-ca-t)[line-break]0+0-eh#` |
| 895 | 243 | 258 | 35 | `line-break,zero-or-square-zero` | `corrected` | `#ti-0(yā-yah-0-ti-nemi)0+c-ān#` | `#ti-0(ya-yah-[line-break]0-ti-nemi)0+c-an#` |
| 896 | 244 | 259 | 18 | `zero-or-square-zero` | `visual-retained` | `#0-0+qu-im+on(itz-0-t-o)0+qu-eh#` | `#0-0+qu-im+on(itz-0-t-o)0+qu-eh#` |
| 897 | 244 | 259 | 21 | `zero-or-square-zero` | `visual-retained` | `#0-0+qu-0(itz-0-ti-hui)0+0-h#` | `#0-0+qu-0(itz-0-ti-hui)0+0-h#` |
| 898 | 244 | 259 | 25 | `zero-or-square-zero` | `visual-retained` | `o+0-0(itz-0-ti-man)ca+0-h#` | `o+0-0(itz-0-ti-man)ca+0-h#` |
| 899 | 244 | 259 | 27 | `zero-or-square-zero` | `visual-retained` | `#n-0+on(itz-0-ti-ya)z+0-0#` | `#n-0+on(itz-0-ti-ya)z+0-0#` |
| 900 | 244 | 259 | 30 | `zero-or-square-zero` | `visual-retained` | `o#n-0(itz-0-ti-ca-t)ca+0-0#` | `o#n-0(itz-0-ti-ca-t)ca+0-0#` |
| 901 | 244 | 259 | 34 | `zero-or-square-zero` | `visual-retained` | `#t-0(itz-0-ti-uh)0+0-0#` | `#t-0(itz-0-ti-uh)0+0-0#` |
| 902 | 244 | 259 | 36 | `zero-or-square-zero` | `visual-retained` | `o#t-0(itz-0-t-e-uh)0+qu-eh#` | `o#t-0(itz-0-t-e-uh)0+qu-eh#` |
| 903 | 245 | 260 | 2 | `zero-or-square-zero` | `visual-retained` | `o#0-0(tlap-a-n-0-ti-huetz)0+0-0#` | `o#0-0(tlap-a-n-0-ti-huetz)0+0-0#` |
| 904 | 245 | 260 | 6 | `zero-or-square-zero` | `visual-retained` | `o#ni-0(tequi-ti-0-t-ahci)0+c-0#` | `o#ni-0(tequi-ti-0-t-ahci)0+c-0#` |
| 905 | 245 | 260 | 8 | `space,zero-or-square-zero` | `corrected` | `#ti-0+tla(cuah-0-t-ahci)z+qu-eh#` | `#ti-0+tla( cuah-0-t-ahci)z+qu-eh#` |
| 906 | 245 | 260 | 12 | `zero-or-square-zero` | `visual-retained` | `#0-0(huic-o-0-ti-nemi)0+0-0#` | `#0-0(huic-o-0-ti-nemi)0+0-0#` |
| 907 | 245 | 260 | 12 | `line-break,zero-or-square-zero` | `corrected` | `#0-0(huic-ō-0-ti-nem-o-hua)0+0-0#` | `#0-0(huic-o-0-ti-[line-break]nem-o-hua)0+0-0#` |
| 908 | 245 | 260 | 13 | `line-break,zero-or-square-zero` | `corrected` | `#0-0(huic-ō-0-ti-nem-o)0+0-0#` | `#0-0(huic-o-0-[line-break]ti-nem-o)0+0-0#` |
| 909 | 245 | 260 | 15 | `zero-or-square-zero` | `visual-retained` | `#0-0(toc-o-0-ti-nemi)0+0-h#` | `#0-0(toc-o-0-ti-nemi)0+0-h#` |
| 910 | 245 | 260 | 16 | `uppercase,zero-or-square-zero` | `corrected` | `o#ni-0(cahua-lo-0-ti-quiz)ca+0-0#` | `o#ni-0(cahua-Io-0-ti-quiz)ca+0-0#` |
| 911 | 245 | 260 | 21 | `space,zero-or-square-zero` | `corrected` | `#0-0+tla(cuah-0-t-ahxi-hua)0+0-0#` | `#0-0+tla( cuah-0-t-ahxi-hua)0+0-0#` |
| 912 | 245 | 260 | 22 | `space,uppercase,zero-or-square-zero` | `corrected` | `#0-0+tla(cua-lo-0-t-ahci)0+0-0#` | `#0-0+tla( cua-Io-0-t-ahci)0+0-0#` |
| 913 | 245 | 260 | 23 | `space,uppercase,zero-or-square-zero` | `corrected` | `#0-0+tla(cua-lo-0-t-ahxi-hua)0+0-0#` | `#0-0+tla( cua-Io-0-t-ahxi-hua)0+0-0#` |
| 914 | 245 | 260 | 26 | `space,uppercase,zero-or-square-zero` | `corrected` | `#0-0+tla(cua-lo-0-ti-mani)0+0-0#` | `#0-0+tla( cua-Io-0-ti-mani)0+0-0#` |
| 916 | 245 | 260 | 28 | `zero-or-square-zero` | `visual-retained` | `#0-0(hui-lo-hua-0-t-ih-ca)0+c-0#` | `#0-0(hui-lo-hua-0-t-ih-ca)0+c-0#` |
| 917 | 245 | 260 | 31 | `zero-or-square-zero` | `visual-retained` | `#0-0(hui-lo-hua-0-ti-man-o-hua)0+0-0#` | `#0-0(hui-lo-hua-0-ti-man-o-hua)0+0-0#` |
| 918 | 245 | 260 | 34 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-nez-0-ti-mani)0+0-0#` | `#0-0(tla-nez-0-ti-mani)0+0-0#` |
| 919 | 245 | 260 | 35 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-yam-a-ni-x-0-t-o)0+c-0#` | `#0-0(tla-yam-a-ni-x-0-t-o)0+c-0#` |
| 920 | 246 | 261 | 28 | `zero-or-square-zero` | `visual-retained` | `o#0-0(tlap-o-uh-0-ti-m-o-cauh)0+0-0#` | `o#0-0(tlap-o-uh-0-ti-m-o-cauh)0+0-0#` |
| 921 | 246 | 261 | 33 | `zero-or-square-zero` | `visual-retained` | `#0-0(mic-0-ti-m-o-teca)0+c-0#` | `#0-0(mic-0-ti-m-o-teca)0+c-0#` |
| 922 | 246 | 261 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(lhu-i-h-0-ti-m-o-teca)0+0-0#` | `#0-0+m-o(lhu-i-h-0-ti-m-o-teca)0+0-0#` |
| 923 | 247 | 262 | 2 | `zero-or-square-zero` | `visual-retained` | `o#ti-0+qu-in(yahual-o-h-0-ti-m-o-teca)0+qu-eh#` | `o#ti-0+qu-in(yahual-o-h-0-ti-m-o-teca)0+qu-eh#` |
| 924 | 247 | 262 | 7 | `zero-or-square-zero` | `visual-retained` | `o#0-0+hual(tol-o-h-0-ti-m-o-tlal-i-h)ca+0-0#` | `o#0-0+hual(tol-o-h-0-ti-m-o-tlal-i-h)ca+0-0#` |
| 925 | 247 | 262 | 11 | `uppercase,zero-or-square-zero` | `corrected` | `o#ni-0(tla-mat-0-ti-m-o-tlal-i-h)0+0-0#` | `o#ni-0(tla-mat-0-ti-m-o-tlaU-h)0+0-0#` |
| 926 | 247 | 262 | 16 | `zero-or-square-zero` | `visual-retained` | `o#0-0(nal-tona-0-ti-m-o-man)0+0-0#` | `o#0-0(nal-tona-0-ti-m-o-man)0+0-0#` |
| 927 | 247 | 262 | 20 | `zero-or-square-zero` | `visual-retained` | `o#0-0(tla-yohua-0-ti-m-o-man)ca+0-0#` | `o#0-0(tla-yohua-0-ti-m-o-man)ca+0-0#` |
| 928 | 247 | 262 | 29 | `zero-or-square-zero` | `visual-retained` | `o#0-0(chip-a-hua-0-ti-m-o-quetz)0+0-0#` | `o#0-0(chip-a-hua-0-ti-m-o-quetz)0+0-0#` |
| 929 | 248 | 263 | 6 | `zero-or-square-zero` | `visual-retained` | `o#ni-0+n-[sq0](e-hu-a-0-ti-tlal-i-h)0+[sq0]-0#` | `o#ni-0+n-[sq0](e-hu-a-0-ti-tlal-i-h)0+[sq0]-0#` |
| 930 | 248 | 263 | 7 | `zero-or-square-zero` | `visual-retained` | `#0-0+qu-0(e-hu-a-0-ti-tlal-i)z+qu-eh#` | `#0-0+qu-0(e-hu-a-0-ti-tlal-i)z+qu-eh#` |
| 931 | 248 | 263 | 12 | `zero-or-square-zero` | `visual-retained` | `o#ni-0+qu-0(e-hu-a-0-ti-quetz)0+[sq0]-0#` | `o#ni-0+qu-0(e-hu-a-0-ti-quetz)0+[sq0]-0#` |
| 932 | 248 | 263 | 17 | `zero-or-square-zero` | `visual-retained` | `o#ni-0+qu-in(tla-pach-o-h-0-ti-teca)0+c-0#` | `o#ni-0+qu-in(tla-pach-o-h-0-ti-teca)0+c-0#` |
| 933 | 248 | 263 | 21 | `zero-or-square-zero` | `visual-retained` | `o#ti-0+c-0(tlap-o-h-0-ti-cauh)0+[sq0]-0#` | `o#ti-0+c-0(tlap-o-h-0-ti-cauh)0+[sq0]-0#` |
| 934 | 248 | 263 | 26 | `zero-or-square-zero` | `visual-retained` | `o#0-0+qui-0(huil-a-n-0-ti-quix-tih)0+qu-eh#` | `o#0-0+qui-0(huil-a-n-0-ti-quix-tih)0+qu-eh#` |
| 935 | 248 | 263 | 30 | `zero-or-square-zero` | `visual-retained` | `#0-0+t-ech(teh-ten-0-ti-may-a-uh)0+qu-eh#` | `#0-0+t-ech(teh-ten-0-ti-may-a-uh)0+qu-eh#` |
| 936 | 249 | 264 | 10 | `space` | `corrected` | `#ni-0(cochi-z-nequi)0+0-0#` | `#ni-0( cochi-z-nequi)0+0-0#` |
| 937 | 249 | 264 | 15 | `space` | `corrected` | `#ti-0+c-0(cohua-z-nequi)z+0-0#` | `#ti-0+c-0( cohua-z-nequi)z+0-0#` |
| 938 | 249 | 264 | 20 | `uppercase` | `corrected` | `#ti-0(tla-zo-h-tla-lo-z-nequi)ya+0-h#` | `#ti-0(tla-zo-h-tla-Io-z-nequi)ya+0-h#` |
| 939 | 249 | 264 | 22 | `uppercase` | `corrected` | `#0-0-te(tla-zo-h-tla-lo-z-nequi)ya+0-0#` | `#0-0-te(tla-zo-h-tla-Io-z-nequi)ya+0-0#` |
| 940 | 249 | 264 | 24 | `uppercase` | `corrected` | `#0-0+ne(tla-zo-h-tla-lo-z-nequi)ya+0-0#` | `#0-0+ne(tla-zo-h-tla-Io-z-nequi)ya+0-0#` |
| 941 | 249 | 264 | 32 | `space` | `corrected` | `#ni-0+c-0(qui)ya+0-0#` | `#ni-0+c-0( qui)ya+0-0#` |
| 943 | 249 | 264 | 35 | `space` | `corrected` | `#ni-0(cochi-z-qui)ya+0-0#` | `#ni-0( cochi-z-qui)ya+0-0#` |
| 944 | 249 | 264 | 39 | `space` | `corrected` | `#ti-0+c-0(cohua-z-qui)ya+0-0#` | `#ti-0+c-0( cohua-z-qui)ya+0-0#` |
| 947 | 250 | 265 | 9 | `uppercase` | `corrected` | `#0-0+te(tla-zo-h-tla-lo-z-qui)ya+0-0#` | `#0-0+te(tla-zo-h-tla-Io-z-qui)ya+0-0#` |
| 948 | 250 | 265 | 11 | `uppercase` | `corrected` | `#0-0+ne(tla-zo-h-tla-lo-z-qui)ya+0-0#` | `#0-0+ne(tla-zo-h-tla-Io-z-qui)ya+0-0#` |
| 949 | 252 | 267 | 30 | `space,zero-or-square-zero` | `corrected` | `#ni-0(cuica-[sq0]-t-i-uh)0+0-0#` | `#ni-0( cuica-[sq0]-t-i-uh)0+0-0#` |
| 950 | 252 | 267 | 32 | `zero-or-square-zero` | `visual-retained` | `#ti-0(cuica-[sq0]-t-i-hui)0+0-h#` | `#ti-0(cuica-[sq0]-t-i-hui)0+0-h#` |
| 951 | 252 | 267 | 35 | `zero-or-square-zero` | `visual-retained` | `#ti-0+te(notza-[sq0]-t-i-uh)0+0-0#` | `#ti-0+te(notza-[sq0]-t-i-uh)0+0-0#` |
| 952 | 252 | 267 | 37 | `zero-or-square-zero` | `visual-retained` | `#an-0+te(notza-[sq0]-t-i-hui)0+0-h#` | `#an-0+te(notza-[sq0]-t-i-hui)0+0-h#` |
| 953 | 253 | 268 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0+tla(hcuil-o-[sq0]-t-i-uh)0+0-0#` | `#0-0+tla(hcuil-o-[sq0]-t-i-uh)0+0-0#` |
| 954 | 253 | 268 | 4 | `zero-or-square-zero` | `visual-retained` | `#0-0+tla(hcuil-o-[sq0]-t-i-hui)0+0-h#` | `#0-0+tla(hcuil-o-[sq0]-t-i-hui)0+0-h#` |
| 955 | 253 | 268 | 7 | `space,zero-or-square-zero` | `corrected` | `#ni-0+tla(cua-[sq0]-t-i-uh)0+0-0#` | `#ni-0+tla( cua-[sq0]-t-i-uh)0+0-0#` |
| 956 | 253 | 268 | 9 | `space,zero-or-square-zero` | `corrected` | `#an-0+tla(cua-[sq0]-t-i-hui)0+0-h#` | `#an-0+tla( cua-[sq0]-t-i-hui)0+0-h#` |
| 957 | 253 | 268 | 24 | `zero-or-square-zero` | `visual-retained` | `#ni-0(cuica-0-ti-uh)0+0-0#` | `#ni-0(cuica-0-ti-uh)0+0-0#` |
| 958 | 253 | 268 | 25 | `space,zero-or-square-zero` | `corrected` | `#ni-0(cuica-[sq0]-t-i-uh)0+0-0#` | `#ni-0( cuica-[sq0]-t-i-uh)0+0-0#` |
| 959 | 253 | 268 | 30 | `zero-or-square-zero` | `visual-retained` | `#ni-0(tla-ht-o-h-0-ti-uh)0+0-0#` | `#ni-0(tla-ht-o-h-0-ti-uh)0+0-0#` |
| 960 | 253 | 268 | 31 | `zero-or-square-zero` | `visual-retained` | `#ni-0(tla-ht-o-[sq0]-t-i-uh)0+0-0#` | `#ni-0(tla-ht-o-[sq0]-t-i-uh)0+0-0#` |
| 961 | 253 | 268 | 33 | `space,zero-or-square-zero` | `corrected` | `#ni-0+tla(cuah-0-ti-uh)0+0-0#` | `#ni-0+tla( cuah-0-ti-uh)0+0-0#` |
| 962 | 253 | 268 | 34 | `zero-or-square-zero` | `visual-retained` | `#ni-0+tla(cua-[sq0]-t-i-uh)0+0-0#` | `#ni-0+tla(cua-[sq0]-t-i-uh)0+0-0#` |
| 963 | 253 | 268 | 40 | `zero-or-square-zero` | `visual-retained` | `#ni-0+te(notz-0-ti-uh)0+0-0#` | `#ni-0+te(notz-0-ti-uh)0+0-0#` |
| 964 | 254 | 269 | 2 | `zero-or-square-zero` | `visual-retained` | `#ni-0+te(notza-[sq0]-t-i-uh)0+0-0#` | `#ni-0+te(notza-[sq0]-t-i-uh)0+0-0#` |
| 970 | 254 | 269 | 13 | `zero-or-square-zero` | `visual-retained` | `o#0-0+te(notza-[sq0]-t-o)0+0-0#` | `o#0-0+te(notza-[sq0]-t-o)0+0-0#` |
| 971 | 254 | 269 | 14 | `zero-or-square-zero` | `visual-retained` | `o#0-0+te(notza-[sq0]-t-o)0+0-h#` | `o#0-0+te(notza-[sq0]-t-o)0+0-h#` |
| 972 | 254 | 269 | 16 | `zero-or-square-zero` | `visual-retained` | `o#ni-0+tla(hcuil-o-[sq0]-t-o)0+0-0#` | `o#ni-0+tla(hcuil-o-[sq0]-t-o)0+0-0#` |
| 973 | 254 | 269 | 17 | `zero-or-square-zero` | `visual-retained` | `o#ti-0+tla(hcuil-o-[sq0]-t-o)0+0-h` | `o#ti-0+tla(hcuil-o-[sq0]-t-o)0+0-h` |
| 974 | 254 | 269 | 19 | `zero-or-square-zero` | `visual-retained` | `o#ti-0+tla(cua-[sq0]-t-o)0+0-0#` | `o#ti-0+tla(cua-[sq0]-t-o)0+0-0#` |
| 977 | 254 | 269 | 24 | `zero-or-square-zero` | `visual-retained` | `#ni-0(cuica-[sq0]-t-o)0+0-0#` | `#ni-0(cuica-[sq0]-t-o)0+0-0#` |
| 978 | 254 | 269 | 25 | `zero-or-square-zero` | `visual-retained` | `#ni-0(cuica-0-t-o)0+0-0#` | `#ni-0(cuica-0-t-o)0+0-0#` |
| 979 | 254 | 269 | 33 | `zero-or-square-zero` | `visual-retained` | `#0-0(cuica-[sq0]-t-i)0+0-0#` | `#0-0(cuica-[sq0]-t-i)0+0-0#` |
| 980 | 254 | 269 | 35 | `zero-or-square-zero` | `visual-retained` | `#0-0(cuica-[sq0]-t-i)0+0-h#` | `#0-0(cuica-[sq0]-t-i)0+0-h#` |
| 981 | 254 | 269 | 38 | `zero-or-square-zero` | `visual-retained` | `#ni-0+te(notza-[sq0]-t-i)0+0-0#` | `#ni-0+te(notza-[sq0]-t-i)0+0-0#` |
| 982 | 254 | 269 | 40 | `zero-or-square-zero` | `visual-retained` | `#ti-0+te(notza-[sq0]-t-i)0+0-h#` | `#ti-0+te(notza-[sq0]-t-i)0+0-h#` |
| 983 | 255 | 270 | 3 | `zero-or-square-zero` | `visual-retained` | `#xi-0+tla(hcuil-o-[sq0]-t-i)0+0-0#` | `#xi-0+tla(hcuil-o-[sq0]-t-i)0+0-0#` |
| 984 | 255 | 270 | 4 | `zero-or-square-zero` | `visual-retained` | `#xi-0+tla(hcuil-o-[sq0]-t-i)0+0-h#` | `#xi-0+tla(hcuil-o-[sq0]-t-i)0+0-h#` |
| 985 | 255 | 270 | 6 | `space,zero-or-square-zero` | `corrected` | `#0-0+tla(cua-[sq0]-t-i)0+0-0#` | `#0-0+tla( cua-[sq0]-t-i)0+0-0#` |
| 986 | 255 | 270 | 8 | `zero-or-square-zero` | `visual-retained` | `#ti-0+tla(cua-[sq0]-t-i)0+0-h#` | `#ti-0+tla(cua-[sq0]-t-i)0+0-h#` |
| 987 | 255 | 270 | 11 | `zero-or-square-zero,printed-fragment` | `visual-retained` | `#xi-0+te(notza-[sq0]-t-i)0+0-n` | `#xi-0+te(notza-[sq0]-t-i)0+0-n` |
| 990 | 255 | 270 | 28 | `zero-or-square-zero` | `visual-retained` | `#ti-0(tzahtzi-[sq0]-t-i)0+0-h#` | `#ti-0(tzahtzi-[sq0]-t-i)0+0-h#` |
| 993 | 256 | 271 | 18 | `space,zero-or-square-zero` | `corrected` | `#ni-0(cuica-[sq0]-c-o)0+0-0#` | `#ni-0( cuica-[sq0]-c-o)0+0-0#` |
| 994 | 256 | 271 | 21 | `zero-or-square-zero` | `visual-retained` | `#ti-0(cuica-[sq0]-c-o)0+0-h#` | `#ti-0(cuica-[sq0]-c-o)0+0-h#` |
| 995 | 256 | 271 | 23 | `zero-or-square-zero` | `visual-retained` | `#ti-0+te(notza-[sq0]-c-o)0+0-0#` | `#ti-0+te(notza-[sq0]-c-o)0+0-0#` |
| 996 | 256 | 271 | 25 | `space,zero-or-square-zero` | `corrected` | `#an-0+te(notza-[sq0]-c-o)0+0-h#` | `#an-0+te(notza-[sq0]-c-o )0+0-h#` |
| 997 | 256 | 271 | 28 | `zero-or-square-zero` | `visual-retained` | `#0-0+tla(hcuil-o-[sq0]-c-o)0+0-0#` | `#0-0+tla(hcuil-o-[sq0]-c-o)0+0-0#` |
| 998 | 256 | 271 | 30 | `zero-or-square-zero` | `visual-retained` | `#0-0+tla(hcuil-o-[sq0]-c-o)0+0-h#` | `#0-0+tla(hcuil-o-[sq0]-c-o)0+0-h#` |
| 999 | 256 | 271 | 33 | `zero-or-square-zero` | `visual-retained` | `#ni-0+tla(cua-[sq0]-c-o)0+0-0#` | `#ni-0+tla(cua-[sq0]-c-o)0+0-0#` |
| 1000 | 256 | 271 | 35 | `space,zero-or-square-zero` | `corrected` | `#0-0+tla(cua-[sq0]-c-o)0+0-h#` | `#0-0+tla(cua-[sq0]-c-o )0+0-h#` |
| 1001 | 257 | 272 | 3 | `space,zero-or-square-zero` | `corrected` | `#ti-0(cuica-[sq0]-qu-i-uh)0+0-0#` | `#ti-0( cuica-[sq0]-qu-i-uh)0+0-0#` |
| 1002 | 257 | 272 | 4 | `zero-or-square-zero` | `visual-retained` | `#an-0(cuica-[sq0]-qu-i-hui)0+0-h#` | `#an-0(cuica-[sq0]-qu-i-hui)0+0-h#` |
| 1003 | 257 | 272 | 6 | `zero-or-square-zero` | `visual-retained` | `#0-0+te(notza-[sq0]-qu-i-uh)0+0-0#` | `#0-0+te(notza-[sq0]-qu-i-uh)0+0-0#` |
| 1004 | 257 | 272 | 7 | `zero-or-square-zero` | `visual-retained` | `#0-0+te(notza-[sq0]-qu-i-hui)0+0-h#` | `#0-0+te(notza-[sq0]-qu-i-hui)0+0-h#` |
| 1005 | 257 | 272 | 10 | `zero-or-square-zero` | `visual-retained` | `#ni-0+tla(hcuil-o-[sq0]-qu-i-uh)0+0-0#` | `#ni-0+tla(hcuil-o-[sq0]-qu-i-uh)0+0-0#` |
| 1006 | 257 | 272 | 12 | `zero-or-square-zero` | `visual-retained` | `#ti-0+tla(hcuil-o-[sq0]-qu-i-hui)0+0-h#` | `#ti-0+tla(hcuil-o-[sq0]-qu-i-hui)0+0-h#` |
| 1007 | 257 | 272 | 15 | `zero-or-square-zero` | `visual-retained` | `#0-0+tla(cua-[sq0]-qu-i-uh)0+0-0#` | `#0-0+tla(cua-[sq0]-qu-i-uh)0+0-0#` |
| 1008 | 257 | 272 | 16 | `zero-or-square-zero` | `visual-retained` | `#an-0+tla(cua-[sq0]-qu-i-hui)0+0-h#` | `#an-0+tla(cua-[sq0]-qu-i-hui)0+0-h#` |
| 1009 | 257 | 272 | 23 | `space,uppercase,zero-or-square-zero` | `corrected` | `#xi-0(cuica-[sq0]-qu-i)0+0-0#` | `#xi-0( cuica-O-qu-i)0+0-0#` |
| 1010 | 257 | 272 | 24 | `space,zero-or-square-zero` | `corrected` | `#xi-0(cuica-[sq0]-qu-i)0+0-h#` | `#xi-0( cuica-[sq0]-qu-i)0+0-h#` |
| 1011 | 257 | 272 | 26 | `zero-or-square-zero` | `visual-retained` | `#ni-0+te(notza-[sq0]-qu-i)0+0-0#` | `#ni-0+te(notza-[sq0]-qu-i)0+0-0#` |
| 1012 | 257 | 272 | 29 | `zero-or-square-zero` | `visual-retained` | `#ti-0+te(notza-[sq0]-qu-i)0+0-h#` | `#ti-0+te(notza-[sq0]-qu-i)0+0-h#` |
| 1013 | 257 | 272 | 32 | `zero-or-square-zero` | `visual-retained` | `#0-0+tla(hcuil-o-[sq0]-qu-i)0+0-0#` | `#0-0+tla(hcuil-o-[sq0]-qu-i)0+0-0#` |
| 1014 | 257 | 272 | 34 | `zero-or-square-zero` | `visual-retained` | `#0-0+tla(hcuil-o-[sq0]-qu-i)0+0-h#` | `#0-0+tla(hcuil-o-[sq0]-qu-i)0+0-h#` |
| 1015 | 257 | 272 | 37 | `space,zero-or-square-zero` | `corrected` | `#xi-0+tla(cua-[sq0]-qu-i)0+0-0#` | `#xi-0+tla( cua-[sq0]-qu-i)0+0-0#` |
| 1016 | 257 | 272 | 38 | `zero-or-square-zero` | `visual-retained` | `#ti-0+tla(cua-[sq0]-qu-i)0+0-h#` | `#ti-0+tla(cua-[sq0]-qu-i)0+0-h#` |
| 1017 | 258 | 273 | 6 | `uppercase,zero-or-square-zero` | `corrected` | `o#ti-0(pohua-lo-[sq0]-t-o)0+0-h#` | `o#ti-0(pohua-Io-[sq0]-t-o)0+0-h#` |
| 1018 | 258 | 273 | 7 | `zero-or-square-zero` | `visual-retained` | `#0-0(ana-lo-[sq0]-qu-i)0+0-0#` | `#0-0(ana-lo-[sq0]-qu-i)0+0-0#` |
| 1019 | 258 | 273 | 8 | `space,uppercase,zero-or-square-zero` | `corrected` | `#0-0(cac-o-[sq0]-qu-i)0+0-0#` | `#0-0( cac-o-O-qu-i)0+0-0#` |
| 1020 | 258 | 273 | 9 | `uppercase,zero-or-square-zero` | `corrected` | `ah#0-0(cui-hua-lo-[sq0]-c-o)0+0-0#` | `ah#0-0(cui-hua-Io-[sq0]-c-o)0+0-0#` |
| 1021 | 258 | 273 | 10 | `zero-or-square-zero` | `visual-retained` | `ca#0-0(huech-o-hua-[sq0]-t-i)0+0-0#` | `ca#0-0(huech-o-hua-[sq0]-t-i)0+0-0#` |
| 1022 | 258 | 273 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0(ahci-0-ti-huetzi-[sq0]-c-o)0+0-0#` | `#0-0(ahci-0-ti-huetzi-[sq0]-c-o)0+0-0#` |
| 1023 | 258 | 273 | 15 | `space,zero-or-square-zero` | `corrected` | `#0-0+qui-0(no-notz-0-ti-huetzi-[sq0]-t-o)0+0-h#` | `#0-0+qui-0(no-notz-0-ti-huetzi-[sq0]-t-o )0+0-h#` |
| 1024 | 258 | 273 | 17 | `zero-or-square-zero` | `visual-retained` | `#ti-0+t-o(tlaz-0-t-o-[sq0]-t-o)0+0-h#` | `#ti-0+t-o(tlaz-0-t-o-[sq0]-t-o)0+0-h#` |
| 1025 | 258 | 273 | 19 | `zero-or-square-zero` | `visual-retained` | `o#0-0(ahci-0-ti-m-o-quetza-[sq0]-t-o)0+0-0#` | `o#0-0(ahci-0-ti-m-o-quetza-[sq0]-t-o)0+0-0#` |
| 1027 | 258 | 273 | 25 | `space,zero-or-square-zero` | `corrected` | `#ni-0+c-0(namiqui-[sq0]-c-o)0+0-0#` | `#ni-0+c-0(namiqui-[sq0]-c-o )0+0-0#` |
| 1029 | 258 | 273 | 27 | `zero-or-square-zero` | `visual-retained` | `#ni-0+te(ih-itt-a-[sq0]-t-i-uh)0+0-0#` | `#ni-0+te(ih-itt-a-[sq0]-t-i-uh)0+0-0#` |
| 1030 | 258 | 273 | 30 | `zero-or-square-zero` | `visual-retained` | `#n-0+on(a-tla-cui-[sq0]-t-i-uh)0+0-0#` | `#n-0+on(a-tla-cui-[sq0]-t-i-uh)0+0-0#` |
| 1031 | 258 | 273 | 32 | `space,zero-or-square-zero` | `corrected` | `#ni-0+hual(la-chiya-[sq0]-c-o)0+0-0#` | `#ni-0+hual(la-chiya-[sq0]-c-o )0+0-0#` |
| 1032 | 258 | 273 | 37 | `zero-or-square-zero` | `visual-retained` | `o#t-0+on(quiza-[sq0]-c-o)0+0-0#` | `o#t-0+on(quiza-[sq0]-c-o)0+0-0#` |
| 1033 | 258 | 273 | 39 | `zero-or-square-zero` | `visual-retained` | `o#0-0+on(tlami-[sq0]-c-o)0+0-0#` | `o#0-0+on(tlami-[sq0]-c-o)0+0-0#` |
| 1034 | 259 | 274 | 2 | `uppercase,zero-or-square-zero` | `corrected` | `o#0-0+c-0+on+tla(teh-tequi-li-[sq0]-c-o)0+0-0#` | `o#0-0+c-0+on+tla(teh-tequi-li-O-c-o)0+0-0#` |
| 1051 | 262 | 277 | 11 | `uppercase` | `corrected` | `#0-0+n-ech(ih-i-yo-cahua-l-tia)0+0-0#` | `#0-0+n-ech(ih-i-yo-cahua-I-tia)0+0-0#` |
| 1054 | 262 | 277 | 23 | `uppercase` | `corrected` | `#ni-0+m-itz+0-0+0-0(tem-o-l-ti-lia)0+0-0#` | `#ni-0+m-itz+0-0+0-0(tem-o-l-ti-Iia)0+0-0#` |
| 1055 | 262 | 277 | 28 | `uppercase` | `corrected` | `#ni-0+m-itz+0-0(xo-chi-tem-o-l-ti-lia)0+0-0#` | `#ni-0+m-itz+0-0(xo-chi-tem-o-I-ti-Iia)0+0-0#` |
| 1058 | 263 | 278 | 6 | `space` | `corrected` | `#ni-0(tla-cui)0+0-0#` | `#ni-0( tla-cui)0+0-0#` |
| 1063 | 264 | 279 | 5 | `space` | `corrected` | `#ni-0+c-0(cuiqu-e-hu-a)0+0-0#` | `#ni-0+c-0( cuiqu-e-hu-a)0+0-0#` |
| 1076 | 265 | 280 | 16 | `space` | `corrected` | `#ni-0(cal-aqui)0+0-0#` | `#ni-0( cal-aqui)0+0-0#` |
| 1077 | 265 | 280 | 19 | `zero-or-square-zero` | `visual-retained` | `#ni-0+te(petla-0-ti-cal-aqui)0+0-0#` | `#ni-0+te(petla-0-ti-cal-aqui)0+0-0#` |
| 1079 | 265 | 280 | 28 | `zero-or-square-zero` | `visual-retained` | `#n-0(icxi-petl-a-uh-0-ti-nemi)0+0-0#` | `#n-0(icxi-petl-a-uh-0-ti-nemi)0+0-0#` |
| 1085 | 266 | 281 | 13 | `space` | `corrected` | `#0-0+m-o(cen-xiuh-zauh)0+qu-eh#` | `#0-0+m-o( cen-xiuh-zauh)0+qu-eh#` |
| 1088 | 266 | 281 | 25 | `space` | `corrected` | `#ni-0(coch-miqui)0+0-0#` | `#ni-0( coch-miqui)0+0-0#` |
| 1089 | 266 | 281 | 27 | `space` | `corrected` | `#ni-0(ci-a-uh-miqui)0+0-0#` | `#ni-0( ci-a-uh-miqui)0+0-0#` |
| 1092 | 266 | 281 | 34 | `space` | `corrected` | `#ni-0(ce-c-miqui)0+0-0#` | `#ni-0( ce-c-miqui)0+0-0#` |
| 1097 | 267 | 282 | 13 | `zero-or-square-zero` | `visual-retained` | `#0+0+m-o(tlahu-el-itz-0-ti-ca-t)ca+0-h#` | `#0+0+m-o(tlahu-el-itz-0-ti-ca-t)ca+0-h#` |
| 1102 | 267 | 282 | 27 | `printed-fragment` | `visual-retained` | `#0-0(ce-huetzi)0+0-0` | `#0-0(ce-huetzi)0+0-0` |
| 1104 | 268 | 283 | 2 | `uppercase` | `corrected` | `#ni-0(ma-ce-hua-l-la-ht-o-a)0+0-0#` | `#ni-0(ma-ce-hua-l-Ia-ht-o-a)0+0-0#` |
| 1120 | 271 | 286 | 19 | `line-break` | `corrected` | `#0-0+n-(ix)0-0#` | `#0-0+n-[line-break](ix)0-0#` |
| 1125 | 271 | 286 | 32 | `space` | `corrected` | `#0-0(oquich-miqui)0+0-0#` | `#0-0( oquich-miqui)0+0-0#` |
| 1126 | 271 | 286 | 36 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-ht-o-h-0-ca-mic-o-hua)0+0-0#` | `#0-0(tla-ht-o-h-0-ca-mic-o-hua)0+0-0#` |
| 1142 | 274 | 289 | 6 | `space` | `corrected` | `#ti-0(xicoh-mi-n-a-lo)h+0-0#` | `#ti-0(xicoh-mi-n-a-lo )h+0-0#` |
| 1153 | 275 | 290 | 34 | `space` | `corrected` | `#0-0+c-0(oh-ozomah-tzitz-qu-ia)0+0-h#` | `#0-0+c-0( oh-ozomah-tzitz-qu-ia)0+0-h#` |
| 1154 | 275 | 290 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0(nah-nacaz-tla-chix-0-ti-hui)0+0-h#` | `#0-0(nah-nacaz-tla-chix-0-ti-hui)0+0-h#` |
| 1156 | 276 | 291 | 6 | `space` | `corrected` | `#ni-0(mah-ma-neh-nemi)0+0-0#` | `#ni-0(mah-ma-neh-nemi )0+0-0#` |
| 1176 | 288 | 303 | 13 | `space,zero-or-square-zero` | `corrected` | `#0-0(0l-te-teo)0-h#` | `#0-0(0l-te-teo )0-h#` |
| 1177 | 288 | 303 | 15 | `space` | `corrected` | `#0-0(ci-cin-teo)0-h#` | `#0-0( ci-cin-teo )0-h#` |
| 1181 | 288 | 303 | 26 | `space` | `corrected` | `#0-0(cueh-cuez-coma)tl-0#` | `#0-0( cueh-cuez-coma)tl-0#` |
| 1185 | 290 | 305 | 8 | `space` | `corrected` | `#0-0(cah-cal-pol)li-0#` | `#0-0( cah-cal-pol)li-0#` |
| 1186 | 290 | 305 | 9 | `space` | `corrected` | `#ti-0(cal-pol)t-in#` | `#ti-0( cal-pol)t-in#` |
| 1204 | 293 | 308 | 21 | `line-break` | `corrected` | `#0-0+n-o(ch-ca-pi-pil)0-[sq0]#` | `#0-0+n-o(ch-[line-break]ca-pi-pil)0-[sq0]#` |
| 1206 | 293 | 308 | 24 | `line-break` | `corrected` | `#0-0+m-o(totol-po-pol)0-[sq0]#` | `#0-0+m-[line-break]o(totol-po-pol)0-[sq0]#` |
| 1207 | 293 | 308 | 27 | `space` | `corrected` | `#am-0+i-0(col-tzi-tzin)huan#` | `#am-0+i-0( col-tzi-tzin)huan#` |
| 1208 | 293 | 308 | 27 | `line-break` | `corrected` | `#am-0+i-0(col-tzi-tzin)0-0#` | `#am-0+i-0( col-[line-break]tzi-tzin)0-0#` |
| 1209 | 293 | 308 | 31 | `space` | `corrected` | `#0-0+n-o(chichi-to-ton)hu-an#` | `#0-0+n-o( chichi-to-ton)hu-an#` |
| 1210 | 293 | 308 | 31 | `line-break` | `corrected` | `#0-0+n-o(chichi-to-ton)0-[sq0]#` | `#0-0+n-[line-break]o( chichi-to-ton)0-[sq0]#` |
| 1216 | 294 | 309 | 33 | `space` | `corrected` | `#0-0(oquich-pi-pil)t-in#` | `#0-0( oquich-pi-pil)t-in#` |
| 1233 | 295 | 310 | 34 | `space` | `corrected` | `#ti-0+n-o(pil-lo)0-0#` | `#ti-0+n-o(pil-lo )0-0#` |
| 1238 | 296 | 311 | 21 | `space,punctuation` | `corrected` | `#0-0+i-0(cxi-to-ton)0-0#` | `#0-0+i-0( c:xi-to-ton)0-0#` |
| 1249 | 297 | 312 | 21 | `line-break` | `corrected` | `#ti-0(ix-te-coh-coy-o-c)t-in#` | `#ti-[line-break]0(ix-te-coh-coy-o-c)t-in#` |
| 1256 | 299 | 314 | 15 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(tla-ht-o-h-0-ca-ti-lia)0+0-0#` | `#0-0+m-o(tla-ht-o-h-0-ca-ti-lia)0+0-0#` |
| 1258 | 299 | 314 | 24 | `space` | `corrected` | `#0-0+m-[sq0](on-o-l-tia)0+0-0#` | `#0-0+m-[sq0]( on-o-l-tia)0+0-0#` |
| 1261 | 300 | 315 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(pil-qui-tih-0-t-ihca)0+c-0#` | `#0-0+m-o(pil-qui-tih-0-t-ihca)0+c-0#` |
| 1262 | 300 | 315 | 4 | `uppercase,zero-or-square-zero` | `corrected` | `#ti-0+m-[sq0](ihqui-l-tih-0-t-ihca)0+c-0#` | `#ti-0+m-[sq0](ihqui-I-tih-0-t-ihca)0+c-0#` |
| 1263 | 300 | 315 | 6 | `space,zero-or-square-zero` | `corrected` | `#0-0+m-[sq0](on-o-l-tih-0-t-o)0+c-0#` | `#0-0+m-[sq0]( on-o-l-tih-0-t-o )0+c-0#` |
| 1264 | 300 | 315 | 8 | `zero-or-square-zero` | `visual-retained` | `#am+m-o(ye-tz-0-ti-ca-t)0+0-eh#` | `#am+m-o(ye-tz-0-ti-ca-t)0+0-eh#` |
| 1265 | 300 | 315 | 15 | `zero-or-square-zero` | `visual-retained` | `#am-0+m-o(ye-tz-ti-h-0-ti-ca-t)0+0-eh#` | `#am-0+m-o(ye-tz-ti-h-0-ti-ca-t)0+0-eh#` |
| 1272 | 301 | 316 | 27 | `uppercase` | `corrected` | `#0-0+qui-0+m-o(huiqui-lia)0+0-0#` | `#0-0+qui-0+m-o(huiqui-Iia)0+0-0#` |
| 1274 | 301 | 316 | 31 | `uppercase` | `corrected` | `o#0-0+n-ech+[sq0]-0+m-o(maqui-lih)0+0-0#` | `o#0-0+n-ech+[sq0]-0+m-o(maqui-Iih)0+0-0#` |
| 1276 | 302 | 317 | 3 | `space` | `corrected` | `#0-0+n-ech+m-o+tla(chihua-l-ti-lia)0+0-0#` | `#0-0+n-ech+m-o+tla( chihua-l-ti-lia)0+0-0#` |
| 1278 | 303 | 318 | 2 | `zero-or-square-zero` | `visual-retained` | `#ti-0+m-o(tlal-i-h-0-tzin-o-a)0+0-0#` | `#ti-0+m-o(tlal-i-h-0-tzin-o-a)0+0-0#` |
| 1279 | 303 | 318 | 10 | `zero-or-square-zero` | `visual-retained` | `#am-0+m-o(patla-0-tzin-o-a)ya+0-h#` | `#am-0+m-o(patla-0-tzin-o-a)ya+0-h#` |
| 1280 | 303 | 318 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(xin-0-tzin-o-a)0+0-0#` | `#0-0+m-o(xin-0-tzin-o-a)0+0-0#` |
| 1281 | 303 | 318 | 18 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(tlal-o-h-0-tzin-o-a)0+0-0#` | `#0-0+m-o(tlal-o-h-0-tzin-o-a)0+0-0#` |
| 1282 | 303 | 318 | 20 | `zero-or-square-zero` | `visual-retained` | `o#ti-0+m-[sq0](a-l-ti-h-0-tzin-o-h)0+0-0#` | `o#ti-0+m-[sq0](a-l-ti-h-0-tzin-o-h)0+0-0#` |
| 1283 | 303 | 318 | 23 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(zomah-0-tzin-o)z+[sq0]-0#` | `#0-0+m-o(zomah-0-tzin-o)z+[sq0]-0#` |
| 1285 | 303 | 318 | 39 | `zero-or-square-zero` | `visual-retained` | `#ti-0+m-o(ciya-hui-tih-0-tzin-o-a)0+0-0#` | `#ti-0+m-o(ciya-hui-tih-0-tzin-o-a)0+0-0#` |
| 1286 | 304 | 319 | 3 | `space` | `corrected` | `#0-0+qui-0+m-o(cui-l-tia)0+0-h#` | `#0-0+qui-0+m-o( cui-l-tia)0+0-h#` |
| 1287 | 304 | 319 | 5 | `space,zero-or-square-zero` | `corrected` | `#0-0+qui-0+m-o(cui-l-tih-0-tzin-o-a)0+0-h#` | `#0-0+qui-0+m-o( cui-l-tih-0-tzin-o-a)0+0-h#` |
| 1288 | 304 | 319 | 21 | `zero-or-square-zero` | `visual-retained` | `#ni-0+c-0(chiuh-0-pol-o-a)0+0-0#` | `#ni-0+c-0(chiuh-0-pol-o-a)0+0-0#` |
| 1289 | 304 | 319 | 30 | `zero-or-square-zero` | `visual-retained` | `o#ni-0(hue-tz-ca-0-pol-o-h)0+0-0#` | `o#ni-0(hue-tz-ca-0-pol-o-h)0+0-0#` |
| 1290 | 304 | 319 | 33 | `space,zero-or-square-zero` | `corrected` | `#xi-0(quiz-0-pol-o)0+0-0#` | `#xi-0( quiz-0-pol-o )0+0-0#` |
| 1291 | 304 | 319 | 36 | `zero-or-square-zero` | `visual-retained` | `#ti-0+m-o(tlal-o-h-0-pol-o)z+[sq0]-0#` | `#ti-0+m-o(tlal-o-h-0-pol-o)z+[sq0]-0#` |
| 1292 | 304 | 319 | 38 | `zero-or-square-zero` | `visual-retained` | `#0-0+qu-0(ihcuani-h-0-pol-o-a)0+0-h#` | `#0-0+qu-0(ihcuani-h-0-pol-o-a)0+0-h#` |
| 1293 | 305 | 320 | 4 | `space,zero-or-square-zero` | `corrected` | `#0-0+tla(cuah-0-pol-o-h)ca+0-0#` | `#0-0+tla( cuah-0-pol-o-h)ca+0-0#` |
| 1294 | 305 | 320 | 10 | `zero-or-square-zero` | `visual-retained` | `#ti-0(choca-0-t-o)0+c-0#` | `#ti-0(choca-0-t-o)0+c-0#` |
| 1295 | 305 | 320 | 11 | `zero-or-square-zero` | `visual-retained` | `#ti-0+m-o(choqui-lih-0-t-o)0+c-0#` | `#ti-0+m-o(choqui-lih-0-t-o)0+c-0#` |
| 1296 | 305 | 320 | 13 | `zero-or-square-zero` | `visual-retained` | `#0-0(tzahtzi-0-t-e-hua)0+0-0#` | `#0-0(tzahtzi-0-t-e-hua)0+0-0#` |
| 1297 | 305 | 320 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0(tzahtzi-0-pol-o-h-0-t-e-hua)0+0-0#` | `#0-0(tzahtzi-0-pol-o-h-0-t-e-hua)0+0-0#` |
| 1298 | 305 | 320 | 16 | `zero-or-square-zero` | `visual-retained` | `#0-0+qui-0(cui-0-ti-huetz)0+0-0#` | `#0-0+qui-0(cui-0-ti-huetz)0+0-0#` |
| 1299 | 305 | 320 | 18 | `space,zero-or-square-zero` | `corrected` | `#0-0+qui-0+m-o(cui-lih-0-ti-huetz)0+0-0#` | `#0-0+qui-0+m-o( cui-lih-0-ti-huetz)0+0-0#` |
| 1300 | 305 | 320 | 24 | `zero-or-square-zero` | `visual-retained` | `#ni-0+qu-0(itz-0-ti-ca-h)0+0-0#` | `#ni-0+qu-0(itz-0-ti-ca-h)0+0-0#` |
| 1301 | 305 | 320 | 25 | `uppercase,zero-or-square-zero` | `corrected` | `#ni-0+c-0+n-o(tz-ti-lih-0-ti-ca-h)0+0-0#` | `#ni-0+c-0+n-o(tz-ti-Iih-0-ti-ca-h)0+0-0#` |
| 1302 | 305 | 320 | 29 | `zero-or-square-zero` | `visual-retained` | `o#0-0+qu-in(cui-0-ti-huetz)0+0-0#` | `o#0-0+qu-in(cui-0-ti-huetz)0+0-0#` |
| 1305 | 305 | 320 | 35 | `zero-or-square-zero` | `visual-retained` | `#ni-0+qu-0(e-hu-a-0-ti-tlal-i)z+0-0#` | `#ni-0+qu-0(e-hu-a-0-ti-tlal-i)z+0-0#` |
| 1306 | 305 | 320 | 37 | `zero-or-square-zero` | `visual-retained` | `#ni-0+c-0+n-[sq0](e-hu-a-0-ti-tlal-i-li)z+0-0#` | `#ni-0+c-0+n-[sq0](e-hu-a-0-ti-tlal-i-li)z+0-0#` |
| 1307 | 306 | 321 | 2 | `uppercase,zero-or-square-zero` | `corrected` | `o#ni-0+c-0+n-[sq0](e-hu-a-0-ti-quechi-lih)0+0-0#` | `o#ni-0+c-0+n-[sq0](e-hu-a-0-ti-quechi-Iih)0+0-0#` |
| 1308 | 306 | 321 | 4 | `zero-or-square-zero` | `visual-retained` | `o#ni-0+qu-in+n-o(tla-pach-o-h-0-ti-tequi-lih)0+0-0#` | `o#ni-0+qu-in+n-o(tla-pach-o-h-0-ti-tequi-lih)0+0-0#` |
| 1309 | 306 | 321 | 6 | `zero-or-square-zero` | `visual-retained` | `o#ti-0+c-0+m-o(tlap-o-h-0-ti-cahui-lih)0+0-0#` | `o#ti-0+c-0+m-o(tlap-o-h-0-ti-cahui-lih)0+0-0#` |
| 1310 | 306 | 321 | 8 | `zero-or-square-zero` | `visual-retained` | `o#0-0+qui-0+m-o(huil-an-0-ti-quix-ti-lih)0+qu-eh#` | `o#0-0+qui-0+m-o(huil-an-0-ti-quix-ti-lih)0+qu-eh#` |
| 1315 | 308 | 323 | 26 | `space` | `corrected` | `#0-0+m-o(cem-man-a)0+0-0#` | `#0-0+m-o( cem-man-a)0+0-0#` |
| 1317 | 309 | 324 | 4 | `space` | `corrected` | `#0-0(ome)0-0#` | `#0-0(ome )0-0#` |
| 1354 | 311 | 326 | 4 | `space` | `corrected` | `#0-0(cax-tol)li-0#` | `#0-0( cax-tol)li-0#` |
| 1365 | 311 | 326 | 29 | `space` | `corrected` | `#ti-0(cem-pohu-a-l)t-in#` | `#ti-0( cem-pohu-a-l)t-in#` |
| 1367 | 311 | 326 | 32 | `uppercase` | `corrected` | `#ti-0(cem-pohu-a-l-ix)t-in#` | `#ti-0(cem-pohu-a-I-ix)t-in#` |
| 1370 | 311 | 326 | 42 | `space` | `corrected` | `#0-0(cen-tzon)tli-0#` | `#0-0( cen-tzon)tli-0#` |
| 1379 | 312 | 327 | 32 | `space` | `corrected` | `#0-0(cax-tol)Ii-0#` | `#0-0( cax-tol)Ii-0#` |
| 1380 | 312 | 327 | 32 | `space` | `corrected` | `#0-0(om-ei)0-0#` | `#0-0( om-ei)0-0#` |
| 1383 | 312 | 327 | 36 | `space` | `corrected` | `#0-0(cem-pohu-a-l)li-0#` | `#0-0( cem-pohu-a-l)li-0#` |
| 1384 | 312 | 327 | 36 | `space` | `corrected` | `#0-0(om-ma-cu-i-l)li-0#` | `#0-0( om-ma-cu-i-l)li-0#` |
| 1385 | 312 | 327 | 39 | `space` | `corrected` | `#0-0(cem-pohu-a-l)li-0#` | `#0-0( cem-pohu-a-l)li-0#` |
| 1386 | 312 | 327 | 39 | `space,line-break` | `corrected` | `#0-0(om-mah-tlac)tli-0#` | `#0-0( om-mah-tlac)tli-[line-break]0#` |
| 1388 | 313 | 328 | 4 | `space` | `corrected` | `#t-0(on-cax-tol)t-in#` | `#t-0( on-cax-tol)t-in#` |
| 1395 | 313 | 328 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-cax-tol-li-0+0-0-om-om-pohua-l)li-0#` | `#0-0(0-0-cax-tol-li-0+0-0-om-om-pohua-l)li-0#` |
| 1396 | 313 | 328 | 29 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-mah-tlac-tli-0+0-0-on-nauh-tzon)tli-0#` | `#0-0(0-0-mah-tlac-tli-0+0-0-on-nauh-tzon)tli-0#` |
| 1399 | 314 | 329 | 14 | `uppercase` | `corrected` | `#0-0(ye-po-hu-a-l-te)tl-0#` | `#0-0(ye-po-hu-a-I-te)tl-0#` |
| 1410 | 315 | 330 | 7 | `space` | `corrected` | `#0-0(on-ce)0-0#` | `#0-0( on-ce)0-0#` |
| 1413 | 315 | 330 | 15 | `space` | `corrected` | `#0-0(cen-tla-man)t-in#` | `#0-0( cen-tla-man)t-in#` |
| 1414 | 315 | 330 | 18 | `space` | `corrected` | `#0-0(cax-tol-la-man)tli-0#` | `#0-0( cax-tol-la-man)tli-0#` |
| 1415 | 315 | 330 | 21 | `uppercase` | `corrected` | `#0-0(ma-cu-i-l-la-man-ix)t-in#` | `#0-0(ma-cu-i-l-Ia-man-ix)t-in#` |
| 1420 | 315 | 330 | 38 | `space` | `corrected` | `#0-0(cax-tol-olo)tl-0#` | `#0-0( cax-tol-olo)tl-0#` |
| 1421 | 315 | 330 | 38 | `space` | `corrected` | `#0-0(on-nahui)0-0#` | `#0-0( on-nahui)0-0#` |
| 1422 | 316 | 331 | 19 | `space` | `corrected` | `#0-0(cen-tecpan)tli-0#` | `#0-0( cen-tecpan)tli-0#` |
| 1431 | 320 | 335 | 7 | `zero-or-square-zero` | `visual-retained` | `#ni-0(pix-ca-0)c-0#` | `#ni-0(pix-ca-0)c-0#` |
| 1433 | 320 | 335 | 10 | `punctuation,zero-or-square-zero` | `corrected` | `#0-0(pix-ca-0)qu-eh#` | `#0-0(pix-ca~0)qu-eh#` |
| 1434 | 320 | 335 | 23 | `zero-or-square-zero` | `visual-retained` | `#0-0(e-hua-0)c-0#` | `#0-0(e-hua-0)c-0#` |
| 1435 | 320 | 335 | 24 | `zero-or-square-zero` | `visual-retained` | `#0-0(ix-hui-0)c-0#` | `#0-0(ix-hui-0)c-0#` |
| 1436 | 320 | 335 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0(iuc-ci-0)c-0#` | `#0-0(iuc-ci-0)c-0#` |
| 1438 | 320 | 335 | 33 | `zero-or-square-zero` | `visual-retained` | `#0-0(mauh-0)qui-0#` | `#0-0(mauh-0)qui-0#` |
| 1440 | 320 | 335 | 36 | `zero-or-square-zero` | `visual-retained` | `#ti-0(mauh-0)qu-eh#` | `#ti-0(mauh-0)qu-eh#` |
| 1441 | 320 | 335 | 40 | `zero-or-square-zero` | `visual-retained` | `#0-0(nen-0)qui-0#` | `#0-0(nen-0)qui-0#` |
| 1442 | 321 | 336 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0(yol-0)qui-0#` | `#0-0(yol-0)qui-0#` |
| 1443 | 321 | 336 | 3 | `zero-or-square-zero,printed-fragment` | `visual-retained` | `#0-0(tlan-0)qui-0` | `#0-0(tlan-0)qui-0` |
| 1444 | 321 | 336 | 5 | `space,zero-or-square-zero` | `corrected` | `#0-0(coch-0)qui-0#` | `#0-0( coch-0)qui-0#` |
| 1445 | 321 | 336 | 6 | `zero-or-square-zero` | `visual-retained` | `#0-0(yah-0)qui-0#` | `#0-0(yah-0)qui-0#` |
| 1446 | 321 | 336 | 7 | `zero-or-square-zero` | `visual-retained` | `#0-0(iuh-0)qui-0#` | `#0-0(iuh-0)qui-0#` |
| 1447 | 321 | 336 | 12 | `zero-or-square-zero` | `visual-retained` | `#ni-0(tla-namaca-0)c-0#` | `#ni-0(tla-namaca-0)c-0#` |
| 1448 | 321 | 336 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-chix-0)qui-0#` | `#0-0(te-chix-0)qui-0#` |
| 1449 | 321 | 336 | 16 | `zero-or-square-zero` | `visual-retained` | `#ti-0(t-o-mach-tih-0)qu-eh#` | `#ti-0(t-o-mach-tih-0)qu-eh#` |
| 1450 | 321 | 336 | 19 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlah-tla-mah-0)qui-0#` | `#0-0(tlah-tla-mah-0)qui-0#` |
| 1451 | 321 | 336 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0(mic-0)qui-0#` | `#0-0(mic-0)qui-0#` |
| 1452 | 321 | 336 | 27 | `zero-or-square-zero` | `visual-retained` | `#0-0(mi-mic-0)qu-eh#` | `#0-0(mi-mic-0)qu-eh#` |
| 1453 | 321 | 336 | 29 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-tt-a-0)c-0#` | `#0-0(tla-tt-a-0)c-0#` |
| 1454 | 321 | 336 | 31 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-tt-a-0)qu-eh#` | `#0-0(tla-tt-a-0)qu-eh#` |
| 1455 | 321 | 336 | 32 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-tla-tt-a-0)qu-eh#` | `#0-0(tla-tla-tt-a-0)qu-eh#` |
| 1456 | 321 | 336 | 33 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-ht-o-h-0)qui-0#` | `#0-0(tla-ht-o-h-0)qui-0#` |
| 1457 | 321 | 336 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-ht-o-h-0)qu-eh#` | `#0-0(tla-ht-o-h-0)qu-eh#` |
| 1458 | 321 | 336 | 38 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-tla-ht-o-h-0)qu-eh#` | `#0-0(tla-tla-ht-o-h-0)qu-eh#` |
| 1459 | 322 | 337 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0(a-0)c-0#` | `#0-0(a-0)c-0#` |
| 1460 | 322 | 337 | 7 | `uppercase,zero-or-square-zero` | `corrected` | `#ni-0(tlahu-el-i-lo-0)c-0#` | `#ni-0(tlahu-el-i-Io-0)c-0#` |
| 1461 | 322 | 337 | 10 | `space,uppercase,zero-or-square-zero` | `corrected` | `#0-0(ce-cua-lo-0)c-0#` | `#0-0( ce-cua-Io-0)c-0#` |
| 1462 | 322 | 337 | 12 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(ce-huechi-li-lo-0)c-0#` | `#0-0(ce-huechi-li-Io-0)c-0#` |
| 1463 | 322 | 337 | 19 | `zero-or-square-zero` | `visual-retained` | `#0-0(hue-tz-qui-z-tom-a-0)c-0#` | `#0-0(hue-tz-qui-z-tom-a-0)c-0#` |
| 1464 | 322 | 337 | 22 | `zero-or-square-zero` | `visual-retained` | `#0-0(teo-pix-0)qui-0#` | `#0-0(teo-pix-0)qui-0#` |
| 1465 | 322 | 337 | 29 | `zero-or-square-zero` | `visual-retained` | `#0-0(pain-0)0-0#` | `#0-0(pain-0)0-0#` |
| 1466 | 322 | 337 | 31 | `zero-or-square-zero` | `visual-retained` | `#ni-0(tla-hcuil-o-h-0)0-0#` | `#ni-0(tla-hcuil-o-h-0)0-0#` |
| 1467 | 322 | 337 | 33 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-memeh-0)0-0#` | `#0-0(tla-memeh-0)0-0#` |
| 1468 | 322 | 337 | 36 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-pix-0)qui-0#` | `#0-0(tla-pix-0)qui-0#` |
| 1469 | 322 | 337 | 38 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-chiuh-0)qui-0#` | `#0-0(te-chiuh-0)qui-0#` |
| 1470 | 322 | 337 | 41 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-namic-0)0-0#` | `#0-0(te-namic-0)0-0#` |
| 1471 | 322 | 337 | 41 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-namic-0)qui-0#` | `#0-0(te-namic-0)qui-0#` |
| 1473 | 323 | 338 | 4 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-namic-0)qu-eh#` | `#0-0(te-namic-0)qu-eh#` |
| 1475 | 323 | 338 | 16 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-mauh-0)0-0#` | `#0-0(te-mauh-0)0-0#` |
| 1476 | 323 | 338 | 20 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-mic-tih-0)0-0#` | `#0-0(te-mic-tih-0)0-0#` |
| 1477 | 323 | 338 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-izcal-i-h-0)qui-0#` | `#0-0(te-izcal-i-h-0)qui-0#` |
| 1478 | 323 | 338 | 27 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-izcal-i-h-0)0-0#` | `#0-0(te-izcal-i-h-0)0-0#` |
| 1479 | 323 | 338 | 29 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-choc-tih-0)qui-0#` | `#0-0(te-choc-tih-0)qui-0#` |
| 1480 | 323 | 338 | 31 | `space,zero-or-square-zero` | `corrected` | `#0-0(te-choc-tih-0)0-0#` | `#0-0( te-choc-tih-0)0-0#` |
| 1481 | 323 | 338 | 35 | `zero-or-square-zero` | `visual-retained` | `#ni-0+c-0+n-o(cui-tih-0)qui-0#` | `#ni-0+c-0+n-o(cui-tih-0)qui-0#` |
| 1482 | 323 | 338 | 38 | `zero-or-square-zero` | `visual-retained` | `ah#0-0+qui-0(mah-mat-0)qui-0#` | `ah#0-0+qui-0(mah-mat-0)qui-0#` |
| 1483 | 323 | 338 | 40 | `zero-or-square-zero` | `corrected` | `#0-0+qui-0+m-o(nahua-l-tih-0)[sq0]-0#` | `#0-0+qui-0+m-o(nahua-l-tih-0)O-0#` |
| 1484 | 324 | 339 | 22 | `zero-or-square-zero` | `visual-retained` | `#0-0(yah-0-que)tl-0#` | `#0-0(yah-0-que)tl-0#` |
| 1485 | 324 | 339 | 24 | `zero-or-square-zero` | `visual-retained` | `#0-0(mic-0-que)tl-0#` | `#0-0(mic-0-que)tl-0#` |
| 1486 | 324 | 339 | 26 | `zero-or-square-zero` | `visual-retained` | `#0-0(terno-0-que)tl-0#` | `#0-0(terno-0-que)tl-0#` |
| 1487 | 324 | 339 | 28 | `zero-or-square-zero` | `visual-retained` | `#0-0(m-o-quetz-0-que)tl-0#` | `#0-0(m-o-quetz-0-que)tl-0#` |
| 1488 | 324 | 339 | 31 | `zero-or-square-zero` | `visual-retained` | `#ni-0(cuica-tla-mat-0-que)tl-0#` | `#ni-0(cuica-tla-mat-0-que)tl-0#` |
| 1489 | 324 | 339 | 39 | `zero-or-square-zero` | `visual-retained` | `#0-0+t-o(mic-0-ca)uh-0#` | `#0-0+t-o(mic-0-ca)uh-0#` |
| 1490 | 324 | 339 | 41 | `zero-or-square-zero` | `visual-retained` | `#0-0+n-o(te-mach-tih-0-ca)uh-0#` | `#0-0+n-o(te-mach-tih-0-ca)uh-0#` |
| 1491 | 324 | 339 | 43 | `zero-or-square-zero` | `visual-retained` | `#n-0+i-0(tla-mamah-0-ca)uh-0#` | `#n-0+i-0(tla-mamah-0-ca)uh-0#` |
| 1492 | 325 | 340 | 2 | `zero-or-square-zero` | `visual-retained` | `#t-0+am-o(te-izcal-i-h-0-ca)hu-an#` | `#t-0+am-o(te-izcal-i-h-0-ca)hu-an#` |
| 1493 | 325 | 340 | 5 | `zero-or-square-zero` | `visual-retained` | `#0-0+i-n(tla-namaca-0-ca)uh-0#` | `#0-0+i-n(tla-namaca-0-ca)uh-0#` |
| 1494 | 325 | 340 | 8 | `zero-or-square-zero` | `visual-retained` | `#ti-0+m-o(ne-mach-tih-0-ca)hu-an#` | `#ti-0+m-o(ne-mach-tih-0-ca)hu-an#` |
| 1495 | 325 | 340 | 11 | `zero-or-square-zero` | `visual-retained` | `#ni-0+te(tla-pix-0-ca)uh-0#` | `#ni-0+te(tla-pix-0-ca)uh-0#` |
| 1496 | 325 | 340 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0+n-o(te-tla-zo-h-tla-0-ca)uh-0#` | `#0-0+n-o(te-tla-zo-h-tla-0-ca)uh-0#` |
| 1498 | 325 | 340 | 19 | `line-break` | `corrected` | `#0-0+i-0(tla-ht-o-h-0-ca-yo)hu-an#` | `#0-0+i-0(tla-ht-o-h-0-[line-break]ca-yo)hu-an#` |
| 1499 | 325 | 340 | 22 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0+m-o(tlahu-el-i-lo-0-ca)uh-0#` | `#0-0+m-o(tlahu-el-i-Io-0-ca)uh-0#` |
| 1500 | 325 | 340 | 32 | `zero-or-square-zero` | `visual-retained` | `#0-0+i-0(ti-yah-0-ca)hu-an#` | `#0-0+i-0(ti-yah-0-ca)hu-an#` |
| 1501 | 325 | 340 | 38 | `zero-or-square-zero` | `visual-retained` | `#n-0+i-0(tla-hcuil-o-h-0-ca-poh)0-0#` | `#n-0+i-0(tla-hcuil-o-h-0-ca-poh)0-0#` |
| 1502 | 325 | 340 | 40 | `zero-or-square-zero` | `visual-retained` | `#0-0+n-o(tlah-tla-mah-0-ca-poh)0-0#` | `#0-0+n-o(tlah-tla-mah-0-ca-poh)0-0#` |
| 1503 | 326 | 341 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0(teo-pix-0-ca-tilmah)tli-0#` | `#0-0(teo-pix-0-ca-tilmah)tli-0#` |
| 1504 | 326 | 341 | 4 | `zero-or-square-zero` | `visual-retained` | `#0-0(m-0-ih-mat-0-ca-tlaca)tl-0#` | `#0-0(m-0-ih-mat-0-ca-tlaca)tl-0#` |
| 1505 | 326 | 341 | 6 | `zero-or-square-zero` | `visual-retained` | `#0-0(mic-0-ca-quix-tih)0+qu-eh#` | `#0-0(mic-0-ca-quix-tih)0+qu-eh#` |
| 1506 | 326 | 341 | 8 | `zero-or-square-zero` | `visual-retained` | `#0-0(teo-pix-0-ca-tlal-i-a)0+0-0#` | `#0-0(teo-pix-0-ca-tlal-i-a)0+0-0#` |
| 1507 | 326 | 341 | 11 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-hcuil-o-h-0-ca-pol)0-0#` | `#0-0(tla-hcuil-o-h-0-ca-pol)0-0#` |
| 1508 | 326 | 341 | 13 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-ht-o-h-0-ca-tepi-ton)0-0#` | `#0-0(tla-ht-o-h-0-ca-tepi-ton)0-0#` |
| 1509 | 326 | 341 | 15 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-ht-o-h-0-ca-ton)tli-0#` | `#0-0(tla-ht-o-h-0-ca-ton)tli-0#` |
| 1510 | 326 | 341 | 16 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-mach-tih-0-ca-tzin)tli-0#` | `#0-0(te-mach-tih-0-ca-tzin)tli-0#` |
| 1511 | 326 | 341 | 18 | `zero-or-square-zero` | `visual-retained` | `#0-0(m-o-mach-tih-0-ca-pi-pil)t-in#` | `#0-0(m-o-mach-tih-0-ca-pi-pil)t-in#` |
| 1512 | 326 | 341 | 20 | `zero-or-square-zero` | `visual-retained` | `#0-0(a-0-ca-tzin)tli-0#` | `#0-0(a-0-ca-tzin)tli-0#` |
| 1513 | 326 | 341 | 26 | `zero-or-square-zero` | `visual-retained` | `#ti-0+c-0(mat-0-ca-tzin)tli-0#` | `#ti-0+c-0(mat-0-ca-tzin)tli-0#` |
| 1514 | 326 | 341 | 39 | `zero-or-square-zero` | `visual-retained` | `#n-0(ilama-h-0)0-0#` | `#n-0(ilama-h-0)0-0#` |
| 1515 | 326 | 341 | 41 | `zero-or-square-zero` | `visual-retained` | `#t-0(ilama-t-0)qu-eh#` | `#t-0(ilama-t-0)qu-eh#` |
| 1516 | 327 | 342 | 2 | `zero-or-square-zero` | `visual-retained` | `#ni-0+m-[sq0](ilama-t-0-ca)uh-0#` | `#ni-0+m-[sq0](ilama-t-0-ca)uh-0#` |
| 1517 | 327 | 342 | 4 | `zero-or-square-zero` | `visual-retained` | `#t-0+am-[sq0](ilama-t-0-ca)hu-an#` | `#t-0+am-[sq0](ilama-t-0-ca)hu-an#` |
| 1518 | 327 | 342 | 6 | `zero-or-square-zero` | `visual-retained` | `#0-0(ilama-t-0-ca-tzin)tli-0#` | `#0-0(ilama-t-0-ca-tzin)tli-0#` |
| 1519 | 327 | 342 | 8 | `zero-or-square-zero` | `visual-retained` | `#0-0(ilama-t-0-ca-tzi-tzin)t-in#` | `#0-0(ilama-t-0-ca-tzi-tzin)t-in#` |
| 1520 | 327 | 342 | 9 | `zero-or-square-zero` | `visual-retained` | `#ti-0+n-[sq0](ilama-t-0-ca-tzin)0-8#` | `#ti-0+n-[sq0](ilama-t-0-ca-tzin)0-8#` |
| 1521 | 327 | 342 | 10 | `zero-or-square-zero` | `visual-retained` | `#an-e+t-[sq0](ilama-t-0-ca-tzi-tzin)hu-an#` | `#an-e+t-[sq0](ilama-t-0-ca-tzi-tzin)hu-an#` |
| 1527 | 327 | 342 | 24 | `zero-or-square-zero` | `visual-retained` | `#ni-0(hue-hue-h-0)0-0#` | `#ni-0(hue-hue-h-0)0-0#` |
| 1528 | 327 | 342 | 26 | `zero-or-square-zero` | `visual-retained` | `#ti-0(hue-hue-t-0)qu-eh#` | `#ti-0(hue-hue-t-0)qu-eh#` |
| 1530 | 327 | 342 | 29 | `zero-or-square-zero` | `visual-retained` | `#t-0+am-o(hue-hue-t-0-ca)hu-an#` | `#t-0+am-o(hue-hue-t-0-ca)hu-an#` |
| 1531 | 327 | 342 | 31 | `zero-or-square-zero` | `visual-retained` | `#0-0(hue-hue-t-0-ca-tzin)tli-0#` | `#0-0(hue-hue-t-0-ca-tzin)tli-0#` |
| 1532 | 327 | 342 | 32 | `zero-or-square-zero` | `visual-retained` | `#0-0(hue-hue-t-0-ca-tzi-tzin)t-in#` | `#0-0(hue-hue-t-0-ca-tzi-tzin)t-in#` |
| 1533 | 327 | 342 | 33 | `zero-or-square-zero` | `visual-retained` | `#ti-0+n-o(hue-hue-t-0-ca-tzin)0-0#` | `#ti-0+n-o(hue-hue-t-0-ca-tzin)0-0#` |
| 1534 | 327 | 342 | 34 | `zero-or-square-zero` | `visual-retained` | `#an-0+t-o(hue-hue-t-0-ca-tzi-tzin)hu-an#` | `#an-0+t-o(hue-hue-t-0-ca-tzi-tzin)hu-an#` |
| 1535 | 327 | 342 | 38 | `zero-or-square-zero` | `visual-retained` | `#0-0(hue-hue-t-0-ca-yo)tl-0#` | `#0-0(hue-hue-t-0-ca-yo)tl-0#` |
| 1538 | 328 | 343 | 29 | `line-break` | `corrected` | `#n-0+i-0(hue-hueh-poh)0-0#` | `#n-[line-break]0+i-0(hue-hueh-poh)0-0#` |
| 1539 | 328 | 343 | 36 | `zero-or-square-zero` | `corrected` | `#0-0(hue-hue-h-0)[sq0]-0#` | `#0-0(hue-hue-h-0)O-0#` |
| 1542 | 329 | 344 | 28 | `zero-or-square-zero` | `visual-retained` | `#ni-0(caqu-eh-0-ti-nemi)0+0-0#` | `#ni-0(caqu-eh-0-ti-nemi)0+0-0#` |
| 1543 | 329 | 344 | 30 | `zero-or-square-zero` | `visual-retained` | `#0-0(tilmah-huah-0-t-o)0+c-0#` | `#0-0(tilmah-huah-0-t-o)0+c-0#` |
| 1544 | 332 | 347 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0(teuh-yo-h-0-ti-ca-h)0+0-0#` | `#0-0(teuh-yo-h-0-ti-ca-h)0+0-0#` |
| 1545 | 332 | 347 | 27 | `zero-or-square-zero` | `visual-retained` | `#ti-0(teuh-yo-h-0-ti-uh)0+0-0#` | `#ti-0(teuh-yo-h-0-ti-uh)0+0-0#` |
| 1546 | 332 | 347 | 29 | `zero-or-square-zero` | `visual-retained` | `#ti-0(zoqui-yo-h-0-ti-hui-tz)0+0-eh#` | `#ti-0(zoqui-yo-h-0-ti-hui-tz)0+0-eh#` |
| 1547 | 333 | 348 | 17 | `zero-or-square-zero` | `visual-retained` | `#0-0(atem-eh-0)0-0#` | `#0-0(atem-eh-0)0-0#` |
| 1548 | 333 | 348 | 19 | `zero-or-square-zero` | `visual-retained` | `#0-0(aten-yo-h-0)0-0#` | `#0-0(aten-yo-h-0)0-0#` |
| 1549 | 333 | 348 | 21 | `zero-or-square-zero` | `visual-retained` | `#ni-0(za-yol-eh-0)0-0#` | `#ni-0(za-yol-eh-0)0-0#` |
| 1550 | 333 | 348 | 23 | `zero-or-square-zero` | `visual-retained` | `#n-0+i-0(tlatzcan-huah-0-ca)uh-0#` | `#n-0+i-0(tlatzcan-huah-0-ca)uh-0#` |
| 1551 | 333 | 348 | 24 | `zero-or-square-zero` | `visual-retained` | `#ti-0(mil-eh-0)qu-eh#` | `#ti-0(mil-eh-0)qu-eh#` |
| 1552 | 333 | 348 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0(cua-cuauh-ton-eh-0)0-0#` | `#0-0(cua-cuauh-ton-eh-0)0-0#` |
| 1553 | 333 | 348 | 27 | `zero-or-square-zero` | `visual-retained` | `#0-0(mah-ma-eh-0)0-0#` | `#0-0(mah-ma-eh-0)0-0#` |
| 1554 | 333 | 348 | 29 | `zero-or-square-zero` | `visual-retained` | `#ti-0+m-o(mi-huah-0-ca)hu-an#` | `#ti-0+m-o(mi-huah-0-ca)hu-an#` |
| 1555 | 333 | 348 | 30 | `zero-or-square-zero` | `visual-retained` | `#n-0(axca-huah-0)0-0#` | `#n-0(axca-huah-0)0-0#` |
| 1556 | 333 | 348 | 31 | `zero-or-square-zero` | `visual-retained` | `#0-0(a-0)c-0#` | `#0-0(a-0)c-0#` |
| 1557 | 333 | 348 | 31 | `zero-or-square-zero` | `visual-retained` | `#0-0(axca-huah-0)0-0#` | `#0-0(axca-huah-0)0-0#` |
| 1558 | 333 | 348 | 34 | `zero-or-square-zero` | `visual-retained` | `#ni-0(cihua-huah-0)0-0#` | `#ni-0(cihua-huah-0)0-0#` |
| 1559 | 333 | 348 | 35 | `zero-or-square-zero` | `visual-retained` | `#ni-0(cua-cuahu-eh-0-ca-huah-0)0-0#` | `#ni-0(cua-cuahu-eh-0-ca-huah-0)0-0#` |
| 1560 | 333 | 348 | 37 | `zero-or-square-zero` | `visual-retained` | `#ni-0(xal-lo-h-0)0-0#` | `#ni-0(xal-lo-h-0)0-0#` |
| 1561 | 333 | 348 | 39 | `zero-or-square-zero` | `visual-retained` | `#ti-0(xal-lo-h-0)qu-eh#` | `#ti-0(xal-lo-h-0)qu-eh#` |
| 1562 | 333 | 348 | 40 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-ht-o-h-0-ca-yo-h-0)qu-eh#` | `#0-0(tla-ht-o-h-0-ca-yo-h-0)qu-eh#` |
| 1563 | 334 | 349 | 4 | `zero-or-square-zero` | `visual-retained` | `#8-0(toca-yo-h-0)0-8#` | `#8-0(toca-yo-h-0)0-8#` |
| 1564 | 334 | 349 | 6 | `zero-or-square-zero` | `visual-retained` | `#8-0(tocay-eh-0)0-8#` | `#8-0(tocay-eh-0)0-8#` |
| 1565 | 334 | 349 | 10 | `zero-or-square-zero` | `visual-retained` | `#0-0(chin-eh-0-ca-tzin)tli-8#` | `#0-0(chin-eh-0-ca-tzin)tli-8#` |
| 1566 | 334 | 349 | 12 | `zero-or-square-zero` | `visual-retained` | `#8-0(aten-yo-h-0-ca-pol)0-0#` | `#8-0(aten-yo-h-0-ca-pol)0-0#` |
| 1567 | 334 | 349 | 14 | `line-break` | `corrected` | `#0-0+m-o(cua-cuahu-eh-0-ca-huah-0-ca-tzi-tzin)hu-an#` | `#0-0+m-o( cua-cuahu-eh-0-ca-huah-0-ca-tzi-[line-break]tzin)hu-an#` |
| 1568 | 334 | 349 | 22 | `zero-or-square-zero` | `visual-retained` | `#ni-0(yao-quiz-0-ca-yac-ana)0+0-0#` | `#ni-0(yao-quiz-0-ca-yac-ana)0+0-0#` |
| 1569 | 334 | 349 | 26 | `zero-or-square-zero` | `visual-retained` | `#ti-0(cua-cuauh-ten-tzon-eh-0-ca-huah-0)0-0#` | `#ti-0(cua-cuauh-ten-tzon-eh-0-ca-huah-0)0-0#` |
| 1570 | 334 | 349 | 30 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0+m-itz(tlahu-el-i-lo-0-ca-maca)0+0-0#` | `#0-0+m-itz(tlahu-el-i-Io-0-ca-maca)0+0-0#` |
| 1571 | 334 | 349 | 39 | `zero-or-square-zero` | `visual-retained` | `#n-0(ihc-i-uh-0-ca-ya-uh)0+0-0#` | `#n-0(ihc-i-uh-0-ca-ya-uh)0+0-0#` |
| 1572 | 335 | 350 | 2 | `zero-or-square-zero` | `visual-retained` | `o#ti-0+c-0(mel-a-hua-0-ca-cac)0+0-0#` | `o#ti-0+c-0(mel-a-hua-0-ca-cac)0+0-0#` |
| 1573 | 335 | 350 | 5 | `zero-or-square-zero` | `visual-retained` | `o#ti-0+c-0(tla-mel-a-uh-0-ca-cac)0+0-0#` | `o#ti-0+c-0(tla-mel-a-uh-0-ca-cac)0+0-0#` |
| 1574 | 335 | 350 | 12 | `zero-or-square-zero` | `visual-retained` | `#ni-0(tla-ht-o-h-0-ca-tla-ht-o-a)0+0-0#` | `#ni-0(tla-ht-o-h-0-ca-tla-ht-o-a)0+0-0#` |
| 1575 | 335 | 350 | 16 | `zero-or-square-zero` | `visual-retained` | `#ni-0(n-o-chix-0-ca-ca-h)0+0-0#` | `#ni-0(n-o-chix-0-ca-ca-h)0+0-0#` |
| 1576 | 335 | 350 | 21 | `zero-or-square-zero` | `visual-retained` | `#ni-0(n-o-zcal-i-h-0-ca-nemi)0+0-0#` | `#ni-0(n-o-zcal-i-h-0-ca-nemi)0+0-0#` |
| 1577 | 335 | 350 | 25 | `zero-or-square-zero` | `visual-retained` | `#ni-0+c-0(ne-zcal-i-h-0-ca-itt-a)ya+0-0#` | `#ni-0+c-0(ne-zcal-i-h-0-ca-itt-a)ya+0-0#` |
| 1578 | 335 | 350 | 28 | `zero-or-square-zero` | `visual-retained` | `o#ni-0(n-0-ih-mat-0-ca-tla-ht-o-h)0+0-0#` | `o#ni-0(n-0-ih-mat-0-ca-tla-ht-o-h)0+0-0#` |
| 1579 | 335 | 350 | 30 | `zero-or-square-zero` | `visual-retained` | `#ni-0+c-0(ne-h-mat-0-ca-tem-o-a)0+0-0#` | `#ni-0+c-0(ne-h-mat-0-ca-tem-o-a)0+0-0#` |
| 1580 | 335 | 350 | 35 | `zero-or-square-zero` | `visual-retained` | `#ni-0+c-0(m-0-ahci-0-ca-caqui)0+0-0#` | `#ni-0+c-0(m-0-ahci-0-ca-caqui)0+0-0#` |
| 1581 | 335 | 350 | 41 | `zero-or-square-zero` | `visual-retained` | `#ni-0+tla(m-0-ahci-0-ca-caqui)0+0-0#` | `#ni-0+tla(m-0-ahci-0-ca-caqui)0+0-0#` |
| 1582 | 336 | 351 | 4 | `zero-or-square-zero` | `visual-retained` | `#ni-0+c-0(topil-eh-0-ca-tlal-i-a)0+0-0#` | `#ni-0+c-0(topil-eh-0-ca-tlal-i-a)0+0-0#` |
| 1583 | 336 | 351 | 7 | `zero-or-square-zero` | `visual-retained` | `#ti-0+c-0(axca-huah-0-ca-cahua)0+0-0#` | `#ti-0+c-0(axca-huah-0-ca-cahua)0+0-0#` |
| 1584 | 336 | 351 | 10 | `zero-or-square-zero` | `visual-retained` | `#0-0+qui-0(te-yac-an-0-ca-peh-pena)0+0-h#` | `#0-0+qui-0(te-yac-an-0-ca-peh-pena)0+0-h#` |
| 1585 | 336 | 351 | 13 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(xo-xo-uh-0-ca-i)0+0-0#` | `#0-0+m-o(xo-xo-uh-0-ca-i)0+0-0#` |
| 1586 | 336 | 351 | 18 | `uppercase,zero-or-square-zero` | `corrected` | `#ni-0+c-0(tlahu-el-i-lo-0-ca-mati)0+0-0#` | `#ni-0+c-0(tlahu-el-i-Io-0-ca-mati)0+0-0#` |
| 1587 | 336 | 351 | 20 | `zero-or-square-zero` | `visual-retained` | `#ni-0+n-o(pac-0-ca-tla-piqu-ia)ya+0-0#` | `#ni-0+n-o(pac-0-ca-tla-piqu-ia)ya+0-0#` |
| 1588 | 336 | 351 | 23 | `space,zero-or-square-zero` | `corrected` | `#ni-0+n-o(coch-0-ca-neh-nequi)ya+0-0#` | `#ni-0+n-o( coch-0-ca-neh-nequi)ya+0-0#` |
| 1589 | 336 | 351 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(coco-x-0-ca-toca)0+0-0#` | `#0-0+m-o(coco-x-0-ca-toca)0+0-0#` |
| 1590 | 336 | 351 | 31 | `zero-or-square-zero` | `visual-retained` | `o#ni-0+m-itz(mic-0-ca-ye-toca)0+0-0#` | `o#ni-0+m-itz(mic-0-ca-ye-toca)0+0-0#` |
| 1591 | 336 | 351 | 33 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(mic-0-ca-ye-toca)0+0-0#` | `#0-0+m-o(mic-0-ca-ye-toca)0+0-0#` |
| 1592 | 336 | 351 | 41 | `zero-or-square-zero` | `visual-retained` | `ah#ti-0+c-0+t-o(cac-0-ca-neh-nequi)0+0-h#` | `ah#ti-0+c-0+t-o(cac-0-ca-neh-nequi)0+0-h#` |
| 1594 | 336 | 351 | 43 | `zero-or-square-zero` | `corrected` | `#ni-0+qu-in+n-[sq0](ixi-mat-0-ca-neh-nequi)0+0-0#` | `#ni-0+qu-in+n-O(ixi-mat-0-ca-neh-nequi)0+0-0#` |
| 1596 | 337 | 352 | 9 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-tt-a-0)qu-0#e` | `#0-0(tla-tt-a-0)qu-0#e` |
| 1597 | 337 | 352 | 10 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-namaca-0)qu-0#e` | `#0-0(tla-namaca-0)qu-0#e` |
| 1598 | 337 | 352 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-pix-0)qu-0#e` | `#0-0(tla-pix-0)qu-0#e` |
| 1599 | 337 | 352 | 18 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-namiqu-0)0-0#e` | `#0-0(te-namiqu-0)0-0#e` |
| 1600 | 337 | 352 | 20 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-namic-0)qu-eh#` | `#0-0(te-namic-0)qu-eh#` |
| 1601 | 337 | 352 | 24 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-o-l-eh-0)0-0#e` | `#0-0(tla-o-l-eh-0)0-0#e` |
| 1602 | 337 | 352 | 26 | `zero-or-square-zero` | `visual-retained` | `#0-0(pil-huah-0)qu-eh#e` | `#0-0(pil-huah-0)qu-eh#e` |
| 1604 | 337 | 352 | 35 | `line-break` | `corrected` | `#0-0+i-0(ix)0-0#` | `#0-0+i-[line-break]0(ix)0-0#` |
| 1605 | 338 | 353 | 5 | `punctuation,zero-or-square-zero` | `corrected` | `#ni-0(0-0-mich-in-0+0-0-i-0-īx-xo-h-0)[sq0]-0#` | `#ni-0(0-0-mich-in-0+0-0-i-0-i:x-xo-h-0)0-0#` |
| 1610 | 340 | 355 | 2 | `uppercase` | `corrected` | `#0-0(tla-nel-ti-lia-ni)0-0#` | `#0-0(tla-nel-ti-Iia-ni)0-0#` |
| 1612 | 340 | 355 | 7 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0+te(tla-nel-ti-lih-0-ca)uh-0#` | `#0-0+te(tla-nel-ti-Iih-0-ca)uh-0#` |
| 1613 | 340 | 355 | 9 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(tla-nel-ti-lih-0-ca)hu-an#` | `#0-0+m-o(tla-nel-ti-lih-0-ca)hu-an#` |
| 1616 | 340 | 355 | 16 | `zero-or-square-zero` | `visual-retained` | `#ni-0+te(tla-cuah-0-ca)uh-0#` | `#ni-0+te(tla-cuah-0-ca)uh-0#` |
| 1617 | 340 | 355 | 18 | `zero-or-square-zero` | `visual-retained` | `#ti-0+m-o(tla-cuah-0-ca)hu-an#` | `#ti-0+m-o(tla-cuah-0-ca)hu-an#` |
| 1626 | 341 | 356 | 6 | `space` | `corrected` | `#am-0+i-n(tla-mati-ni)hn` | `#am-0+i-n( tla-mati-ni)hn` |
| 1627 | 341 | 356 | 9 | `space` | `corrected` | `#ni-0(cuica-ni)tl-0#` | `#ni-0( cuica-ni)tl-0#` |
| 1650 | 342 | 357 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0+qui-0+m-o(t-hui-0-ca-ye-toca-ni)0-0#` | `#0-0+qui-0+m-o(t-hui-0-ca-ye-toca-ni)0-0#` |
| 1653 | 344 | 359 | 22 | `uppercase` | `corrected` | `#0-0(tla-zo-h-tla-lo-ni)0-0#` | `#0-0(tla-zo-h-tla-Io-ni)0-0#` |
| 1654 | 344 | 359 | 23 | `space` | `corrected` | `#ti-0+ne(cuitla-hui-lo)ni+0-0#` | `#ti-0+ne( cuitla-hui-lo)ni+0-0#` |
| 1660 | 344 | 359 | 35 | `uppercase` | `corrected` | `#0-0(itt-a-lo-ni)0-0#` | `#0-0(itt-a-Io-ni)0-0#` |
| 1663 | 345 | 360 | 2 | `uppercase` | `corrected` | `#0-0(te-poh-pol-hui-lo-ni)0-0#` | `#0-0(te-poh-pol-hui-Io-ni)0-0#` |
| 1664 | 345 | 360 | 5 | `uppercase` | `corrected` | `#0-0(tla-poh-pol-hui-lo-ni)0-0#` | `#0-0(tla-poh-pol-hui-Io-ni)0-0#` |
| 1665 | 345 | 360 | 12 | `uppercase` | `corrected` | `*#ni-0(tla-zo-h-tla-lo-ni)tl-0#` | `*#ni-0(tla-zo-h-tla-Io-ni)tl-0#` |
| 1666 | 345 | 360 | 14 | `uppercase` | `corrected` | `#ni-0(tla-zo-h-tla-lo-ni)0-0#` | `#ni-0(tla-zo-h-tla-Io-ni)0-0#` |
| 1667 | 345 | 360 | 16 | `uppercase` | `corrected` | `#ti-0(tla-zo-h-tla-lo-ni)m-eh#` | `#ti-0(tla-zo-h-tla-Io-ni)m-eh#` |
| 1672 | 346 | 361 | 13 | `space` | `corrected` | `#0-0(cochi-hua)ni+0-0#` | `#0-0( cochi-hua)ni+0-0#` |
| 1675 | 346 | 361 | 17 | `space` | `corrected` | `#0-0+n-o(cochi-ya)0-0#` | `#0-0+n-o( cochi-ya)0-0#` |
| 1677 | 346 | 361 | 23 | `uppercase` | `corrected` | `#0-0(ne-pah-ti-lo-ni)0-0#` | `#0-0(ne-pah-ti-Io-ni)0-0#` |
| 1681 | 346 | 361 | 30 | `line-break` | `corrected` | `#0-0(tla-mamali-hua-lo-ni)0-0#` | `#0-0(tla-[line-break]mamali-hua-lo-ni)0-0#` |
| 1688 | 347 | 362 | 44 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(m-[sq0]-ih-mati-0)0-0#` | `#0-0(m-O-ih-mati-0)0-0#` |
| 1690 | 348 | 363 | 4 | `zero-or-square-zero` | `visual-retained` | `#0-0(m-o-tol-i-ni-a-0)0-h#` | `#0-0(m-o-tol-i-ni-a-0)0-h#` |
| 1692 | 348 | 363 | 7 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-imaca-ci-0)0-0#` | `#0-0(te-imaca-ci-0)0-0#` |
| 1694 | 348 | 363 | 11 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(te-tlah-tla-ayi-lia-0)0-0#` | `#0-0(te-tlah-tla-ayi-Iia-0)0-0#` |
| 1695 | 348 | 363 | 13 | `space` | `corrected` | `#0-0+m-[sq0](oquich-neh-nequi)0+0-0#` | `#0-0+m-[sq0]( oquich-neh-nequi)0+0-0#` |
| 1696 | 348 | 363 | 15 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(m-[sq0]-oquich-neh-nequi-0)0-0#` | `#0-0(m-O-oquich-neh-nequi-0)0-0#` |
| 1697 | 348 | 363 | 17 | `zero-or-square-zero` | `visual-retained` | `#0-0(tona-0-ti-uh)0+0-0#` | `#0-0(tona-0-ti-uh)0+0-0#` |
| 1698 | 348 | 363 | 20 | `zero-or-square-zero` | `visual-retained` | `#0-0(tona-0-ti-uh-0)0-0#` | `#0-0(tona-0-ti-uh-0)0-0#` |
| 1699 | 348 | 363 | 23 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Tona-0-ti-hu-0)0-0#e` | `#0-0(Tona-0-ti-hu-0)0-0#e` |
| 1700 | 348 | 363 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0+n-o(tona-0-ti-uh-0)0-0#` | `#0-0+n-o(tona-0-ti-uh-0)0-0#` |
| 1701 | 348 | 363 | 27 | `zero-or-square-zero,line-break` | `corrected` | `#0-0(tona-0-ti-uh-0-yo-h-0)[sq0]-0#` | `#0-0(tona-0-ti-uh-0-yo-h-0)[sq0]-[line-break]0#` |
| 1702 | 348 | 363 | 31 | `zero-or-square-zero` | `visual-retained` | `#0-0(a-tona-0-ti-uh-0)0-0#` | `#0-0(a-tona-0-ti-uh-0)0-0#` |
| 1711 | 349 | 364 | 20 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-maca-z-ca-yah-0)qu-eh#` | `#0-0(tla-maca-z-ca-yah-0)qu-eh#` |
| 1714 | 350 | 365 | 19 | `uppercase` | `corrected` | `#ni-0(tla-zo-h-tla-lo)ca+0-0#` | `#ni-0(tla-zo-h-tla-Io)ca+0-0#` |
| 1715 | 350 | 365 | 21 | `uppercase` | `corrected` | `#0-0+n-o(tla-zo-h-tla-lo-ca)0-0#` | `#0-0+n-o(tla-zo-h-tla-Io-ca)0-0#` |
| 1717 | 350 | 365 | 25 | `uppercase` | `corrected` | `#0-0+i-0(ne-coco-li-lo-ca)0-0#` | `#0-0+i-0(ne-coco-li-Io-ca)0-0#` |
| 1724 | 351 | 366 | 17 | `uppercase` | `corrected` | `#0-0(tla-zo-h-tla-lo-ca-yo)tl-0#` | `#0-0(tla-zo-h-tla-Io-ca-yo)tl-0#` |
| 1727 | 351 | 366 | 30 | `uppercase` | `corrected` | `#0-0+n-o(tla-zo-h-tla-lo-ca-yo)0-0#` | `#0-0+n-o(tla-zo-h-tla-Io-ca-yo)0-0#` |
| 1728 | 351 | 366 | 32 | `space` | `corrected` | `#0-0+i-0(ne-coco-li-lo-ca-yo)0-0#` | `#0-0+i-0(ne-coco-li-lo-ca-yo )0-0#` |
| 1730 | 352 | 367 | 15 | `space` | `corrected` | `#ni-0+n-o(cuep)ca+0-0#` | `#ni-0+n-o( cuep )ca+0-0#` |
| 1735 | 352 | 367 | 26 | `line-break` | `corrected` | `#am-0+i-n(ne-cauh-ca)hu-an#` | `#am-0+i-n(ne-[line-break]cauh-ca)hu-an#` |
| 1747 | 353 | 368 | 10 | `digit-one` | `corrected` | `#0-0+i-0(lpi-ca)0-0#` | `#0-0+i-0(1pi-ca)0-0#` |
| 1749 | 353 | 368 | 16 | `space` | `corrected` | `#0-0+m-o(chip-a-hua-ca)0-0#` | `#0-0+m-o( chip-a-hua-ca)0-0#` |
| 1756 | 353 | 368 | 31 | `space` | `corrected` | `#0-0(cel-i)ca+0-0#` | `#0-0( cel-i)ca+0-0#` |
| 1767 | 354 | 369 | 21 | `space` | `corrected` | `#0-0(cel-i-ca-yo)tl-0#` | `#0-0( cel-i-ca-yo)tl-0#` |
| 1771 | 355 | 370 | 6 | `zero-or-square-zero` | `visual-retained` | `#0-0+n-o(catz-a-hua-0-ca)uh-0#` | `#0-0+n-o(catz-a-hua-0-ca)uh-0#` |
| 1773 | 355 | 370 | 18 | `zero-or-square-zero` | `visual-retained` | `#0-0+n-o(ce-huechi-li-lo-0-ca)uh-0#` | `#0-0+n-o(ce-huechi-li-lo-0-ca)uh-0#` |
| 1774 | 356 | 371 | 24 | `space` | `corrected` | `#0-0(cochi-z)tli-0#` | `#0-0( cochi-z)tli-0#` |
| 1777 | 357 | 372 | 32 | `uppercase` | `corrected` | `#0-0+n-o(miqui-liz)0-0#` | `#0-0+n-o(miqui-Iiz)0-0#` |
| 1779 | 357 | 372 | 35 | `uppercase` | `corrected` | `#0-0+n-o(temo-liz)0-0#` | `#0-0+n-o(temo-Iiz)0-0#` |
| 1783 | 358 | 373 | 4 | `space` | `corrected` | `#0-0+n-o(chol-o-liz)0-0#` | `#0-0+n-o( chol-o-liz)0-0#` |
| 1790 | 361 | 376 | 25 | `space,uppercase` | `corrected` | `#0-0(choqui-liz-tzahtzi)0+0-0#` | `#0-0( choqui-Iiz-tzahtzi)0+0-0#` |
| 1792 | 361 | 376 | 31 | `uppercase` | `corrected` | `#0-0(te-tla-pol-o-l-ti-liz-pah)tli-0#` | `#0-0(te-tla-pol-o-I-ti-liz-pah)tli-0#` |
| 1793 | 361 | 376 | 34 | `uppercase` | `corrected` | `#0-0(pin-a-hui-liz-nemi-liz)tli-0#` | `#0-0(pin-a-hui-Iiz-nemi-Iiz)tli-0#` |
| 1794 | 361 | 376 | 36 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(ne-zahua-liz-mic-0-ca-tla-tqui-huah-0)[sq0]-0#` | `#0-0(ne-zahua-Iiz-mic-0-ca-tla-tqui-huah-0)O-0#` |
| 1795 | 361 | 376 | 40 | `uppercase` | `corrected` | `#0-0(iztlaca-ti-liz-ton)tli-0#` | `#0-0(iztlaca-ti-Iiz-ton)tli-0#` |
| 1798 | 378 | 393 | 9 | `line-break` | `corrected` | `#0-0+n-0(oquich-huah-tzin)0-0#` | `#0-0+n-[line-break]0( oquich-huah-tzin)0-0#` |
| 1799 | 378 | 393 | 12 | `line-break` | `corrected` | `#0-0+i-0(cihua-huah-tzin)0-0#` | `#0-0+i-[line-break]0(cihua-huah-tzin)0-0#` |
| 1802 | 382 | 397 | 28 | `space` | `corrected` | `#0-0(omi)tl-0#` | `#0-0( omi)tl-0#` |
| 1811 | 383 | 398 | 11 | `uppercase` | `corrected` | `#0-0+i-0(ah-tla-pa-l-lo)0-0#` | `#0-0+i-0(ah-tla-pa-I-lo)0-0#` |
| 1813 | 383 | 398 | 15 | `space` | `corrected` | `#0-0+i-0(ihhui-yo)0-0#` | `#0-0+i-0(ihhui-yo )0-0#` |
| 1815 | 383 | 398 | 18 | `space` | `corrected` | `#0-0+i-0(xo-chi-yo)0-0#` | `#0-0+i-0(xo-chi-yo )0-0#` |
| 1819 | 383 | 398 | 36 | `uppercase` | `corrected` | `#0-0+n-(ah-co-l-tzon-yo)0-0#` | `#0-0+n-(ah-co-I-tzon-yo)0-0#` |
| 1825 | 384 | 399 | 16 | `zero-or-square-zero` | `visual-retained` | `#0-0(tona-0-ca-yo)tl-0#` | `#0-0(tona-0-ca-yo)tl-0#` |
| 1826 | 384 | 399 | 20 | `zero-or-square-zero` | `visual-retained` | `#0-0+i-0(tona-0-ca-yo)0-0#` | `#0-0+i-0(tona-0-ca-yo)0-0#` |
| 1827 | 384 | 399 | 31 | `space` | `corrected` | `#0-0(cua-lo-ca-yo)tl-0#` | `#0-0( cua-lo-ca-yo)tl-0#` |
| 1829 | 384 | 399 | 38 | `space` | `corrected` | `#0-0(chiy-a-hua-ca-yo)tl-0#` | `#0-0( chiy-a-hua-ca-yo)tl-0#` |
| 1833 | 385 | 400 | 7 | `space` | `corrected` | `#0-0+i-0(cuep-o-n-ca)0-0#` | `#0-0+i-0( cuep-o-n-ca)0-0#` |
| 1835 | 385 | 400 | 11 | `zero-or-square-zero` | `visual-retained` | `#0-0(chiy-a-hua-0-ca-yo)tl-0#` | `#0-0(chiy-a-hua-0-ca-yo)tl-0#` |
| 1836 | 385 | 400 | 13 | `space` | `corrected` | `#0-0(cuep-o-n-ca-yo)tl-0#` | `#0-0( cuep-o-n-ca-yo)tl-0#` |
| 1837 | 385 | 400 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0(cuep-o-n-0-ca-yo)tl-0#` | `#0-0(cuep-o-n-0-ca-yo)tl-0#` |
| 1839 | 385 | 400 | 27 | `line-break` | `corrected` | `#0-0(tla-aqui-l-lo-h-0)0-0#` | `#0-[line-break]0(tla-aqui-l-lo-h-0)0-0#` |
| 1841 | 392 | 407 | 17 | `line-break` | `corrected` | `#ni-0+m-itz+[sq0]-0(chihua-l-toca)z+0-0#` | `#ni-0+m-[line-break]itz+[sq0]-0( chihua-l-toca)z+0-0#` |
| 1844 | 392 | 407 | 36 | `space,uppercase` | `corrected` | `#ni-0+m-itz+[sq0]-0(chihua-l-lani)0+0-0#` | `#ni-0+m-itz+[sq0]-0( chihua-l-Iani)0+0-0#` |
| 1845 | 392 | 407 | 38 | `space` | `corrected` | `#ti-0+0-0(chihua-l-lan-o)0+0-0#` | `#ti-0+0-0( chihua-l-lan-o )0+0-0#` |
| 1846 | 392 | 407 | 40 | `uppercase` | `corrected` | `#0-0+te+tla(chihua-l-lan-o)0+0-0#` | `#0-0+te+tla(chihua-l-Ian-o)0+0-0#` |
| 1848 | 393 | 408 | 37 | `uppercase` | `corrected` | `#0-0+t-ech(no-notza-l-temo)z+qu-eh#` | `#0-0+t-ech(no-notza-I-temo)z+qu-eh#` |
| 1856 | 396 | 411 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0(n-[sq0]-el)0-0#` | `#0-0(n-[sq0]-el)0-0#` |
| 1861 | 398 | 413 | 6 | `space` | `corrected` | `#0-0(tla-cuep)tli-0#` | `#0-0( tla-cuep )tli-0#` |
| 1870 | 399 | 414 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-mat-0-t-a-ni)0-0#` | `#0-0(tla-mat-0-t-a-ni)0-0#` |
| 1871 | 399 | 414 | 13 | `uppercase` | `corrected` | `#0-0(nel-ti-li-lo-ni)0-0#` | `#0-0(nel-ti-li-Io-ni)0-0#` |
| 1872 | 399 | 414 | 29 | `zero-or-square-zero` | `visual-retained` | `#t-0(ihuin-ti-0)c-0#` | `#t-0(ihuin-ti-0)c-0#` |
| 1873 | 399 | 414 | 30 | `zero-or-square-zero` | `visual-retained` | `#ti-0(chic-a-hua-0)qu-eh#` | `#ti-0(chic-a-hua-0)qu-eh#` |
| 1874 | 399 | 414 | 32 | `zero-or-square-zero` | `visual-retained` | `#0-0(catz-a-hua-0)c-0#` | `#0-0(catz-a-hua-0)c-0#` |
| 1875 | 399 | 414 | 33 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(ce-hui-lo-0)c-0#` | `#0-0(ce-hui-Io-0)c-0#` |
| 1876 | 399 | 414 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0(cem-ihca-0)c-0#` | `#0-0(cem-ihca-0)c-0#` |
| 1877 | 400 | 415 | 8 | `zero-or-square-zero` | `visual-retained` | `#0-0(cihua-ti-0)c-0#` | `#0-0(cihua-ti-0)c-0#` |
| 1878 | 400 | 415 | 22 | `zero-or-square-zero` | `visual-retained` | `#0-0(m-0-ahci-0)c-0#` | `#0-0(m-0-ahci-0)c-0#` |
| 1879 | 400 | 415 | 26 | `zero-or-square-zero` | `visual-retained` | `#0-0(hua-c-0)qui-0#` | `#0-0(hua-c-0)qui-0#` |
| 1880 | 400 | 415 | 27 | `zero-or-square-zero` | `visual-retained` | `#ti-0(cual-a-n-0)qu-eh#` | `#ti-0(cual-a-n-0)qu-eh#` |
| 1881 | 400 | 415 | 29 | `zero-or-square-zero` | `visual-retained` | `#t-0(iuh-0)qui-0#` | `#t-0(iuh-0)qui-0#` |
| 1882 | 400 | 415 | 30 | `space,zero-or-square-zero` | `corrected` | `#0-0(cen-quiz-0)qui-0#` | `#0-0( cen-quiz-0)qui-0#` |
| 1883 | 400 | 415 | 35 | `zero-or-square-zero` | `visual-retained` | `#0-0(hueh-cauh-0)[sq0]-0#` | `#0-0(hueh-cauh-0)[sq0]-0#` |
| 1884 | 400 | 415 | 39 | `zero-or-square-zero` | `visual-retained` | `#0-0(m-o-yec-chih-chiuh-0)qui-0#` | `#0-0(m-o-yec-chih-chiuh-0)qui-0#` |
| 1885 | 401 | 416 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-chic-a-uh-0)[sq0]-0#` | `#0-0(te-chic-a-uh-0)[sq0]-0#` |
| 1886 | 401 | 416 | 7 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-choc-tih-0)[sq0]-0#` | `#0-0(te-choc-tih-0)[sq0]-0#` |
| 1887 | 401 | 416 | 12 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-cua-cuah-0)0-0#` | `#0-0(te-cua-cuah-0)0-0#` |
| 1888 | 401 | 416 | 15 | `zero-or-square-zero` | `visual-retained` | `#0-0(ihchic-0-t-ihca-0)c-0#` | `#0-0(ihchic-0-t-ihca-0)c-0#` |
| 1889 | 401 | 416 | 20 | `space,zero-or-square-zero` | `corrected` | `#0-0(oh-hui-h-0)0-0#` | `#0-0( oh-hui-h-0)0-0#` |
| 1890 | 401 | 416 | 26 | `zero-or-square-zero` | `visual-retained` | `#n-0(iyo-h-0)0-0#` | `#n-0(iyo-h-0)0-0#` |
| 1891 | 401 | 416 | 31 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-nam-eh-0)[sq0]-0#` | `#0-0(te-nam-eh-0)[sq0]-0#` |
| 1892 | 401 | 416 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0(mahui-z-zo-h-0)qu-eh#` | `#0-0(mahui-z-zo-h-0)qu-eh#` |
| 1893 | 402 | 417 | 4 | `zero-or-square-zero` | `visual-retained` | `#0-0(icn-o-huah-0)[sq0]-0#` | `#0-0(icn-o-huah-0)[sq0]-0#` |
| 1894 | 402 | 417 | 13 | `zero-or-square-zero` | `visual-retained` | `#0-0(ahhuia-0)c-0#` | `#0-0(ahhuia-0)c-0#` |
| 1895 | 402 | 417 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0(ce-ce-0)c-0#` | `#0-0(ce-ce-0)c-0#` |
| 1896 | 402 | 417 | 15 | `zero-or-square-zero` | `visual-retained` | `#0-0(poye-0)c-0#` | `#0-0(poye-0)c-0#` |
| 1897 | 402 | 417 | 16 | `zero-or-square-zero` | `visual-retained` | `#0-0(cel-i-0)c-0#` | `#0-0(cel-i-0)c-0#` |
| 1898 | 402 | 417 | 17 | `zero-or-square-zero` | `visual-retained` | `#0-0(huel-i-0)c-0#` | `#0-0(huel-i-0)c-0#` |
| 1899 | 402 | 417 | 18 | `zero-or-square-zero` | `visual-retained` | `#0-0(yancui-0)c-0#` | `#0-0(yancui-0)c-0#` |
| 1900 | 402 | 417 | 19 | `zero-or-square-zero` | `visual-retained` | `#0-0(ihya-0)c-0#` | `#0-0(ihya-0)c-0#` |
| 1901 | 402 | 417 | 20 | `zero-or-square-zero` | `visual-retained` | `#0-0(izta-0)c-0#` | `#0-0(izta-0)c-0#` |
| 1902 | 402 | 417 | 23 | `zero-or-square-zero` | `visual-retained` | `#0-0(coz-ti-0)c-0#` | `#0-0(coz-ti-0)c-0#` |
| 1903 | 402 | 417 | 24 | `zero-or-square-zero` | `visual-retained` | `#0-0(itz-ti-0)c-0#` | `#0-0(itz-ti-0)c-0#` |
| 1904 | 403 | 418 | 16 | `zero-or-square-zero` | `visual-retained` | `#0-0(xo-xo-uh-0)qui-0#` | `#0-0(xo-xo-uh-0)qui-0#` |
| 1905 | 403 | 418 | 17 | `zero-or-square-zero` | `visual-retained` | `#0-0(xo-xo-c-ti-0)c-0#` | `#0-0(xo-xo-c-ti-0)c-0#` |
| 1906 | 403 | 418 | 19 | `zero-or-square-zero` | `visual-retained` | `#0-0(cot-o-n-0)qui-0#` | `#0-0(cot-o-n-0)qui-0#` |
| 1907 | 403 | 418 | 20 | `zero-or-square-zero` | `visual-retained` | `#0-0(cot-o-c-ti-0)c-0#` | `#0-0(cot-o-c-ti-0)c-0#` |
| 1908 | 403 | 418 | 26 | `zero-or-square-zero` | `visual-retained` | `#0-0(catz-a-hua-0)c-0#` | `#0-0(catz-a-hua-0)c-0#` |
| 1909 | 403 | 418 | 27 | `zero-or-square-zero` | `visual-retained` | `#0-0(catz-a-c-ti-0)c-0#` | `#0-0(catz-a-c-ti-0)c-0#` |
| 1910 | 403 | 418 | 29 | `zero-or-square-zero` | `visual-retained` | `#0-0(nex-e-hua-0)c-0#` | `#0-0(nex-e-hua-0)c-0#` |
| 1911 | 403 | 418 | 30 | `zero-or-square-zero` | `visual-retained` | `#0-0(nex-e-c-ti-0)c-0#` | `#0-0(nex-e-c-ti-0)c-0#` |
| 1912 | 403 | 418 | 32 | `zero-or-square-zero` | `visual-retained` | `#0-0(tic-e-hua-0)c-0#` | `#0-0(tic-e-hua-0)c-0#` |
| 1913 | 403 | 418 | 33 | `zero-or-square-zero` | `visual-retained` | `#0-0(tic-e-c-ti-0)c-0#` | `#0-0(tic-e-c-ti-0)c-0#` |
| 1914 | 403 | 418 | 36 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlil-e-hua-0)c-0#` | `#0-0(tlil-e-hua-0)c-0#` |
| 1915 | 403 | 418 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlil-e-c-ti-0)c-0#` | `#0-0(tlil-e-c-ti-0)c-0#` |
| 1916 | 404 | 419 | 8 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlil-i-uh-0)qui-0#` | `#0-0(tlil-i-uh-0)qui-0#` |
| 1917 | 404 | 419 | 9 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlil-ti-0)c-0#` | `#0-0(tlil-ti-0)c-0#` |
| 1918 | 404 | 419 | 11 | `zero-or-square-zero` | `visual-retained` | `#0-0(xol-o-ch-a-uh-0)qui-0#` | `#0-0(xol-o-ch-a-uh-0)qui-0#` |
| 1919 | 404 | 419 | 12 | `zero-or-square-zero` | `visual-retained` | `#0-0(xol-o-ch-ti-0)c-0#` | `#0-0(xol-o-ch-ti-0)c-0#` |
| 1920 | 404 | 419 | 21 | `zero-or-square-zero` | `visual-retained` | `#0-0(al-a-hua-0)c-0#` | `#0-0(al-a-hua-0)c-0#` |
| 1921 | 404 | 419 | 22 | `zero-or-square-zero` | `visual-retained` | `#0-0(al-a-c-ti-0)c-0#` | `#0-0(al-a-c-ti-0)c-0#` |
| 1922 | 404 | 419 | 23 | `zero-or-square-zero` | `visual-retained` | `#0-0(al-a-z-ti-0)c-0#` | `#0-0(al-a-z-ti-0)c-0#` |
| 1923 | 404 | 419 | 26 | `zero-or-square-zero` | `visual-retained` | `#0-0(yam-a-n-0)qui-0#` | `#0-0(yam-a-n-0)qui-0#` |
| 1924 | 404 | 419 | 27 | `zero-or-square-zero` | `visual-retained` | `#0-0(yam-a-c-ti-0)c-0#` | `#0-0(yam-a-c-ti-0)c-0#` |
| 1925 | 404 | 419 | 28 | `zero-or-square-zero` | `visual-retained` | `#0-0(yam-a-z-ti-0)c-0#` | `#0-0(yam-a-z-ti-0)c-0#` |
| 1926 | 404 | 419 | 31 | `zero-or-square-zero` | `visual-retained` | `#0-0(mel-a-hua-0)c-0#` | `#0-0(mel-a-hua-0)c-0#` |
| 1927 | 404 | 419 | 32 | `zero-or-square-zero` | `visual-retained` | `#0-0(mel-a-c-ti-0)c-0#` | `#0-0(mel-a-c-ti-0)c-0#` |
| 1928 | 404 | 419 | 33 | `zero-or-square-zero` | `visual-retained` | `#0-0(mel-a-z-ti-0)c-0#` | `#0-0(mel-a-z-ti-0)c-0#` |
| 1930 | 406 | 421 | 9 | `zero-or-square-zero` | `visual-retained` | `#0-0(ca-camoh-ti-0)c-0#` | `#0-0(ca-camoh-ti-0)c-0#` |
| 1933 | 406 | 421 | 18 | `zero-or-square-zero` | `visual-retained` | `#0-0(huih-huitz-ti-0)c-0#` | `#0-0(huih-huitz-ti-0)c-0#` |
| 1935 | 406 | 421 | 27 | `space,zero-or-square-zero` | `corrected` | `#0-0(cel-pah-ti-0)c-0#` | `#0-0( cel-pah-ti-0)c-0#` |
| 1936 | 406 | 421 | 29 | `zero-or-square-zero` | `visual-retained` | `#0-0(cuech-pah-ti-0)c-0#` | `#0-0(cuech-pah-ti-0)c-0#` |
| 1937 | 407 | 422 | 4 | `zero-or-square-zero` | `visual-retained` | `#0-0(yam-a-z-pah-ti-0)c-0#` | `#0-0(yam-a-z-pah-ti-0)c-0#` |
| 1938 | 407 | 422 | 8 | `zero-or-square-zero` | `visual-retained` | `#0-0(izta-pah-ti-0)c-0#` | `#0-0(izta-pah-ti-0)c-0#` |
| 1939 | 407 | 422 | 11 | `zero-or-square-zero` | `visual-retained` | `#0-0(poye-pah-ti-0)c-0#` | `#0-0(poye-pah-ti-0)c-0#` |
| 1940 | 407 | 422 | 13 | `space,zero-or-square-zero` | `corrected` | `#0-0(chichi-pah-ti-0)c-0#` | `#0-0( chichi-pah-ti-0)c-0#` |
| 1941 | 407 | 422 | 15 | `zero-or-square-zero` | `visual-retained` | `#0-0(ce-ce-pah-ti-0)c-0#` | `#0-0(ce-ce-pah-ti-0)c-0#` |
| 1942 | 407 | 422 | 17 | `zero-or-square-zero` | `visual-retained` | `#0-0(yancui-pah-ti-0)c-0#` | `#0-0(yancui-pah-ti-0)c-0#` |
| 1943 | 407 | 422 | 19 | `space,zero-or-square-zero` | `corrected` | `#0-0(coco-pah-ti-0)c-0#` | `#0-0( coco-pah-ti-0)c-0#` |
| 1944 | 407 | 422 | 24 | `zero-or-square-zero` | `visual-retained` | `#0-0(izta-0-ca-pah-ti-0)c-0#` | `#0-0(izta-0-ca-pah-ti-0)c-0#` |
| 1945 | 407 | 422 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0(yancui-0-ca-pah-ti-0)c-0#` | `#0-0(yancui-0-ca-pah-ti-0)c-0#` |
| 1946 | 407 | 422 | 27 | `space,zero-or-square-zero` | `corrected` | `#0-0(ce-cel-pah-ti-0)c-0#` | `#0-0( ce-cel-pah-ti-0)c-0#` |
| 1947 | 407 | 422 | 32 | `space,zero-or-square-zero` | `corrected` | `#0-0(ce-ce-palalah-ti-0)c-0#` | `#0-0( ce-ce-palalah-ti-0)c-0#` |
| 1948 | 408 | 423 | 2 | `space,zero-or-square-zero` | `corrected` | `#0-0(chip-a-c-cal-ti-0)c-0#` | `#0-0( chip-a-c-cal-ti-0)c-0#` |
| 1949 | 408 | 423 | 5 | `zero-or-square-zero` | `visual-retained` | `#0-0(itz-cal-ti-0)c-0#` | `#0-0(itz-cal-ti-0)c-0#` |
| 1950 | 408 | 423 | 9 | `zero-or-square-zero` | `visual-retained` | `#0-0(itz-calalah-ti-0)c-0#` | `#0-0(itz-calalah-ti-0)c-0#` |
| 1951 | 408 | 423 | 13 | `zero-or-square-zero` | `visual-retained` | `#0-0(chichi-pah-tzon-ti-0)c-0#` | `#0-0(chichi-pah-tzon-ti-0)c-0#` |
| 1953 | 408 | 423 | 22 | `space` | `corrected` | `#0-0(coz-pol)0-0#` | `#0-0( coz-pol)0-0#` |
| 1955 | 408 | 423 | 24 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlahu-el-i-lo-0-ca-pol)0-0#` | `#0-0(tlahu-el-i-lo-0-ca-pol)0-0#` |
| 1960 | 408 | 423 | 35 | `zero-or-square-zero` | `visual-retained` | `#0-0(cel-ti-0-ca-ton)tli-0#` | `#0-0(cel-ti-0-ca-ton)tli-0#` |
| 1961 | 408 | 423 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0(izta-0-ca-tzin)tli-0#` | `#0-0(izta-0-ca-tzin)tli-0#` |
| 1962 | 409 | 424 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0(a-zta-pil-ti-0)c-0#` | `#0-0(a-zta-pil-ti-0)c-0#` |
| 1963 | 409 | 424 | 17 | `space,uppercase,zero-or-square-zero` | `corrected` | `#0-0(ocuil-cua-lo-0)c-0#` | `#0-0( ocuil-cua-Io-0)c-0#` |
| 1964 | 409 | 424 | 19 | `zero-or-square-zero` | `visual-retained` | `#0-0(tle-ihya-0)c-0#` | `#0-0(tle-ihya-0)c-0#` |
| 1965 | 409 | 424 | 21 | `zero-or-square-zero` | `visual-retained` | `#0-0(po-c-coz-ti-0)c-0#` | `#0-0(po-c-coz-ti-0)c-0#` |
| 1966 | 409 | 424 | 23 | `space` | `corrected` | `#ni-0(coch-miqui-ni)0-0#` | `#ni-0( coch-miqui-ni)0-0#` |
| 1967 | 409 | 424 | 25 | `zero-or-square-zero` | `visual-retained` | `#ti-0(tequi-hue-tz-ca-0)c-0#` | `#ti-0(tequi-hue-tz-ca-0)c-0#` |
| 1970 | 409 | 424 | 36 | `space,zero-or-square-zero` | `corrected` | `#0-0(cua-petl-a-n-0)qui-0#` | `#0-0( cua-petl-a-n-0)qui-0#` |
| 1971 | 409 | 424 | 38 | `uppercase,zero-or-square-zero` | `corrected` | `#ti-0(tla-ht-o-l-huel-i-0)c-0#` | `#ti-0(tla-ht-o-I-huel-i-0)c-0#` |
| 1973 | 410 | 425 | 5 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-pam-pitz-a-hua-0)c-0#` | `#0-0(te-pam-pitz-a-hua-0)c-0#` |
| 1974 | 410 | 425 | 9 | `zero-or-square-zero` | `visual-retained` | `#0-0(nacaz-huih-huitz-ti-0)c-0#` | `#0-0(nacaz-huih-huitz-ti-0)c-0#` |
| 1975 | 410 | 425 | 12 | `zero-or-square-zero` | `visual-retained` | `#0-0(izti-coh-col-ti-0)c-0#` | `#0-0(izti-coh-col-ti-0)c-0#` |
| 1980 | 410 | 425 | 32 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlal-coco-x-0)qui-0#` | `#0-0(tlal-coco-x-0)qui-0#` |
| 1981 | 411 | 426 | 8 | `zero-or-square-zero` | `visual-retained` | `#0-0(xo-xo-uh-0-ca-cua-lo-ni)0-0#` | `#0-0(xo-xo-uh-0-ca-cua-lo-ni)0-0#` |
| 1982 | 411 | 426 | 10 | `zero-or-square-zero` | `visual-retained` | `#0-0(ce-ce-0-ca-i-hua-ni)0-0#` | `#0-0(ce-ce-0-ca-i-hua-ni)0-0#` |
| 1983 | 411 | 426 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0(cual-a-n-cui-0)c-0#` | `#0-0(cual-a-n-cui-0)c-0#` |
| 1984 | 411 | 426 | 16 | `zero-or-square-zero` | `visual-retained` | `#0-0(yoli-z-mat-0)qui-0#` | `#0-0(yoli-z-mat-0)qui-0#` |
| 1989 | 412 | 427 | 6 | `space,zero-or-square-zero` | `corrected` | `#0-0(con-nacaz-ti-0)c-0#` | `#0-0( con-nacaz-ti-0)c-0#` |
| 1990 | 412 | 427 | 9 | `zero-or-square-zero` | `visual-retained` | `#0-0(xilo-tzon-ti-0)c-0#` | `#0-0(xilo-tzon-ti-0)c-0#` |
| 1996 | 412 | 427 | 27 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(coco-x-0-ca-tah-tzin)0-0#` | `#0-0+m-o(coco-x-0-ca-tah-tzin)0-0#` |
| 1997 | 412 | 427 | 28 | `zero-or-square-zero` | `visual-retained` | `#0-0(yam-a-n-0-ca-cuica)tl-0#` | `#0-0(yam-a-n-0-ca-cuica)tl-0#` |
| 2000 | 417 | 432 | 21 | `zero-or-square-zero` | `visual-retained` | `#0-0(ix-man-0-ti-uh)0+0-0#` | `#0-0(ix-man-0-ti-uh)0+0-0#` |
| 2003 | 421 | 436 | 36 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-hue-i-0-0+0-0-a-ten)tli-0#` | `#0-0(0-0-hue-i-0-0+0-0-a-ten)tli-0#` |
| 2004 | 421 | 436 | 38 | `zero-or-square-zero` | `visual-retained` | `#0-0(coz-ti-0)c-0#` | `#0-0(coz-ti-0)c-0#` |
| 2006 | 422 | 437 | 2 | `line-break` | `corrected` | `#0-0(0-0-coz-ti-0-c-0+0-0-teo-cuitla-ozto)tl-0#` | `#0-0(0-0-coz-ti-0-c-0+0-0-teo-[line-break]cuitla-ozto)tl-0#` |
| 2007 | 422 | 437 | 4 | `line-break` | `corrected` | `#0-0+n-o(0-0-coz-ti-0-c-0+0-0-teo-cuitla-ozto)uh-0#` | `#0-0+n-o(0-0-coz-ti-0-c-[line-break]0+0-0-teo-cuitla-ozto)uh-0#` |
| 2008 | 422 | 437 | 7 | `zero-or-square-zero` | `visual-retained` | `#0-0(izta-0)c-0#` | `#0-0(izta-0)c-0#` |
| 2010 | 422 | 437 | 9 | `line-break` | `corrected` | `#n-0(0-0-izta-0-c-0+0-0-teo-cuitla-chip-a-hu-a)0+0-0#` | `#n-0(0-0-izta-0-c-0+0-0-teo-cuitla-chip-[line-break]a-hu-a)0+0-0#` |
| 2012 | 422 | 437 | 12 | `zero-or-square-zero` | `visual-retained` | `#0-0(izta-0)c-0#` | `#0-0(izta-0)c-0#` |
| 2013 | 422 | 437 | 14 | `line-break` | `corrected` | `#0-0(0-0-izta-0-c-0+0-0-caqu-eh-0)[sq0]-0#` | `#0-0(0-0-izta-0-c-0+0-0-caqu-eh-[line-break]0)[sq0]-0#` |
| 2014 | 422 | 437 | 18 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-chichi-0-c-0+0-0-a)tl-0#` | `#0-0(0-0-chichi-0-c-0+0-0-a)tl-0#` |
| 2015 | 422 | 437 | 20 | `zero-or-square-zero` | `visual-retained` | `#0-0+n-o(0-0-chichi-0-c+0-0-a)uh-0#` | `#0-0+n-o(0-0-chichi-0-c+0-0-a)uh-0#` |
| 2016 | 422 | 437 | 21 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-tla-zo-h-chay-a-hua-0-c-0+0-0-coz-ca)tl-0#` | `#0-0(0-0-tla-zo-h-chay-a-hua-0-c-0+0-0-coz-ca)tl-0#` |
| 2017 | 422 | 437 | 24 | `zero-or-square-zero` | `visual-retained` | `#0-0+i-0(0-0-tla-zo-h-chay-a-hua-0-c-0+0-0-coz-qui)0-0#` | `#0-0+i-0(0-0-tla-zo-h-chay-a-hua-0-c-0+0-0-coz-qui)0-0#` |
| 2018 | 422 | 437 | 26 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-izta-0-c-0+0-0-mich)in-0#` | `#0-0(0-0-izta-0-c-0+0-0-mich)in-0#` |
| 2019 | 422 | 437 | 27 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-izta-0-c-0+0-0-mich)t-in#` | `#0-0(0-0-izta-0-c-0+0-0-mich)t-in#` |
| 2021 | 431 | 446 | 6 | `space` | `corrected` | `#0-0(cen-ca-h)0+0-0#` | `#0-0( cen-ca-h)0+0-0#` |
| 2026 | 431 | 446 | 26 | `zero-or-square-zero` | `visual-retained` | `#0-0(iuh-0)qui-0#` | `#0-0(iuh-0)qui-0#` |
| 2030 | 432 | 447 | 16 | `zero-or-square-zero` | `visual-retained` | `#0-0(iz-0)qui-0#` | `#0-0(iz-0)qui-0#` |
| 2034 | 433 | 448 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-o(tqui-0-ti-ca-h)0+0-0#` | `#0-0+m-o(tqui-0-ti-ca-h)0+0-0#` |
| 2035 | 433 | 448 | 8 | `zero-or-square-zero` | `visual-retained` | `#0-0+m-[sq0](ahci-0-ti-ca-h)0+0-0#` | `#0-0+m-[sq0](ahci-0-ti-ca-h)0+0-0#` |
| 2036 | 433 | 448 | 25 | `space` | `corrected` | `#0-0(cem-ilhui)tl-0#` | `#0-0( cem-ilhui)tl-0#` |
| 2038 | 433 | 448 | 36 | `space` | `corrected` | `#0-0+i-n(chan)0-0#` | `#0-0+i-n( chan)0-0#` |
| 2039 | 434 | 449 | 9 | `space` | `corrected` | `#0-0(cen-yohoa-l)li-0#` | `#0-0( cen-yohoa-l)li-0#` |
| 2040 | 434 | 449 | 10 | `uppercase` | `corrected` | `#0-0(cen-yohoa-l)[sq0]-0#` | `#0-0(cen-yohoa-I)[sq0]-0#` |
| 2059 | 440 | 455 | 24 | `zero-or-square-zero` | `visual-retained` | `#0-0(pac-0-ca)[sq0]-0#` | `#0-0(pac-0-ca)[sq0]-0#` |
| 2060 | 440 | 455 | 27 | `zero-or-square-zero` | `visual-retained` | `#0-0(chic-a-hua-0-ca)[sq0]-0#` | `#0-0(chic-a-hua-0-ca)[sq0]-0#` |
| 2061 | 440 | 455 | 29 | `zero-or-square-zero` | `visual-retained` | `#0-0(chip-a-hua-0-ca)[sq0]-0#` | `#0-0(chip-a-hua-0-ca)[sq0]-0#` |
| 2062 | 440 | 455 | 31 | `zero-or-square-zero` | `visual-retained` | `#0-0(ihuin-ti-0-ca)[sq0]-0#` | `#0-0(ihuin-ti-0-ca)[sq0]-0#` |
| 2063 | 440 | 455 | 32 | `zero-or-square-zero` | `visual-retained` | `#0-0(tona-0-ca)[sq0]-0#` | `#0-0(tona-0-ca)[sq0]-0#` |
| 2064 | 440 | 455 | 34 | `zero-or-square-zero` | `visual-retained` | `#0-0(cual-a-n-0-ca)[sq0]-0#` | `#0-0(cual-a-n-0-ca)[sq0]-0#` |
| 2065 | 440 | 455 | 36 | `zero-or-square-zero` | `visual-retained` | `#0-0(ihc-i-uh-0-ca)[sq0]-0#` | `#0-0(ihc-i-uh-0-ca)[sq0]-0#` |
| 2066 | 440 | 455 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0(cen-quiz-0-ca)[sq0]-0#` | `#0-0(cen-quiz-0-ca)[sq0]-0#` |
| 2067 | 440 | 455 | 39 | `space,zero-or-square-zero` | `corrected` | `#0-0(ce-cen-yah-0-ca)[sq0]-0#` | `#0-0( ce-cen-yah-0-ca)[sq0]-0#` |
| 2068 | 441 | 456 | 4 | `space,zero-or-square-zero` | `corrected` | `#0-0(oh-hui-h-0-ca)[sq0]-0#` | `#0-0( oh-hui-h-0-ca)[sq0]-0#` |
| 2069 | 441 | 456 | 7 | `zero-or-square-zero` | `visual-retained` | `#0-0(neh-ne-uh-0-ca)[sq0]-0#` | `#0-0(neh-ne-uh-0-ca)[sq0]-0#` |
| 2070 | 441 | 456 | 12 | `zero-or-square-zero` | `visual-retained` | `#0-0(ahhuia-0-ca)[sq0]-0#` | `#0-0(ahhuia-0-ca)[sq0]-0#` |
| 2071 | 441 | 456 | 13 | `zero-or-square-zero` | `visual-retained` | `#0-0(ce-ce-0-ca)[sq0]-0#` | `#0-0(ce-ce-0-ca)[sq0]-0#` |
| 2072 | 441 | 456 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0(coco-0-ca)[sq0]-0#` | `#0-0(coco-0-ca)[sq0]-0#` |
| 2073 | 441 | 456 | 15 | `zero-or-square-zero` | `visual-retained` | `#0-0(cel-i-0-ca)[sq0]-0#` | `#0-0(cel-i-0-ca)[sq0]-0#` |
| 2074 | 441 | 456 | 16 | `zero-or-square-zero` | `visual-retained` | `#0-0(itz-ti-0-ca)[sq0]-0#` | `#0-0(itz-ti-0-ca)[sq0]-0#` |
| 2075 | 441 | 456 | 17 | `zero-or-square-zero` | `visual-retained` | `#0-0(yancui-0-ca)[sq0]-0#` | `#0-0(yancui-0-ca)[sq0]-0#` |
| 2076 | 441 | 456 | 18 | `zero-or-square-zero` | `visual-retained` | `#0-0(hue-i-0-ca)[sq0]-0#` | `#0-0(hue-i-0-ca)[sq0]-0#` |
| 2077 | 441 | 456 | 21 | `zero-or-square-zero` | `visual-retained` | `#0-0(yoco-x-0-ca)[sq0]-0#` | `#0-0(yoco-x-0-ca)[sq0]-0#` |
| 2078 | 441 | 456 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0(ich-ta-0-ca)[sq0]-0#` | `#0-0(ich-ta-0-ca)[sq0]-0#` |
| 2079 | 441 | 456 | 30 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-cem-an-0-ca)[sq0]-0#` | `#0-0(tla-cem-an-0-ca)[sq0]-0#` |
| 2080 | 441 | 456 | 33 | `zero-or-square-zero` | `visual-retained` | `#0-0(te-coco-h-0-ca)[sq0]-0#` | `#0-0(te-coco-h-0-ca)[sq0]-0#` |
| 2081 | 441 | 456 | 35 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-mat-0-ca)0-0#` | `#0-0(tla-mat-0-ca)0-0#` |
| 2082 | 441 | 456 | 40 | `zero-or-square-zero` | `visual-retained` | `#0-0(ne-h-mat-0-ca)0-0#` | `#0-0(ne-h-mat-0-ca)0-0#` |
| 2083 | 442 | 457 | 4 | `zero-or-square-zero` | `visual-retained` | `#0-0(m-[sq0]-ih-mat-0-ca)[sq0]-0#` | `#0-0(m-[sq0]-ih-mat-0-ca)[sq0]-0#` |
| 2084 | 442 | 457 | 7 | `zero-or-square-zero` | `visual-retained` | `#0-0(m-[sq0]-ahci-0-ca)[sq0]-0#` | `#0-0(m-[sq0]-ahci-0-ca)[sq0]-0#` |
| 2092 | 447 | 462 | 8 | `space` | `corrected` | `#0-0+n-o(cal-ti-tlan)0-0#` | `#0-0+n-o( cal-ti-tlan)0-0#` |
| 2094 | 447 | 462 | 14 | `zero-or-square-zero` | `visual-retained` | `#0-0(tloqu-eh-0)0-0#` | `#0-0(tloqu-eh-0)0-0#` |
| 2101 | 448 | 463 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlahu-an-0)qu-eh#` | `#0-0(tlahu-an-0)qu-eh#` |
| 2102 | 449 | 464 | 30 | `zero-or-square-zero` | `visual-retained` | `#0-0(tloqu-eh-0)0-0#` | `#0-0(tloqu-eh-0)0-0#` |
| 2105 | 452 | 467 | 27 | `zero-or-square-zero` | `visual-retained` | `#0-0(cem-el-eh-0)[sq0]-0#` | `#0-0(cem-el-eh-0)[sq0]-0#` |
| 2108 | 454 | 469 | 26 | `space,uppercase` | `visual-retained` | `(X +-ca)+ (-n)-tli-` | `(X +-ca)+ (-n)-tli-` |
| 2109 | 454 | 469 | 26 | `space,uppercase` | `visual-retained` | `(X) +(ca-+ -n)-tli-` | `(X) +(ca-+ -n)-tli-` |
| 2110 | 454 | 469 | 27 | `space,uppercase` | `visual-retained` | `(X +-ca)+ (-n)-tli-` | `(X +-ca)+ (-n)-tli-` |
| 2111 | 454 | 469 | 28 | `space,uppercase` | `visual-retained` | `(X + -ca)` | `(X + -ca)` |
| 2112 | 455 | 470 | 28 | `zero-or-square-zero` | `visual-retained` | `#0-0(cal-oh-hui-h-0-ca-n)tli-0#` | `#0-0(cal-oh-hui-h-0-ca-n)tli-0#` |
| 2113 | 455 | 470 | 34 | `zero-or-square-zero` | `visual-retained` | `#0-0(cal-oh-hu-i-h-0-ca-n)[sq0]-0#` | `#0-0(cal-oh-hu-i-h-0-ca-n)[sq0]-0#` |
| 2114 | 455 | 470 | 35 | `zero-or-square-zero` | `visual-retained` | `#0-0(tla-ht-o-h-0-ca-n)[sq0]-0#` | `#0-0(tla-ht-o-h-0-ca-n)[sq0]-0#` |
| 2115 | 455 | 470 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0(iuh-0-ca-n)[sq0]-0#` | `#0-0(iuh-0-ca-n)[sq0]-0#` |
| 2116 | 455 | 470 | 38 | `zero-or-square-zero` | `visual-retained` | `#0-0(que-n-am-i-h-0-ca-n)[sq0]-0#` | `#0-0(que-n-am-i-h-0-ca-n)[sq0]-0#` |
| 2117 | 455 | 470 | 40 | `zero-or-square-zero` | `visual-retained` | `#0-0(ax-0-ca-n)[sq0]-0#` | `#0-0(ax-0-ca-n)[sq0]-0#` |
| 2118 | 456 | 471 | 4 | `zero-or-square-zero` | `visual-retained` | `ay#0-0(ax-0-ca-n)[sq0]-0#` | `ay#0-0(ax-0-ca-n)[sq0]-0#` |
| 2121 | 456 | 471 | 11 | `zero-or-square-zero` | `visual-retained` | `#0-0(iyo-h-0-ca-n)[sq0]-0#` | `#0-0(iyo-h-0-ca-n)[sq0]-0#` |
| 2130 | 458 | 473 | 5 | `space` | `corrected` | `#0-0(ca-n-ah)[sq0]-0#` | `#0-0( ca-n-ah)[sq0]-0#` |
| 2135 | 459 | 474 | 18 | `space` | `corrected` | `#0-0+n-o(cochi-ya-n)0-0#` | `#0-0+n-o( cochi-ya-n)0-0#` |
| 2137 | 459 | 474 | 24 | `space` | `corrected` | `#0-0+m-[sq0](on-o-ya-n)0-0#` | `#0-0+m-[sq0]( on-o-ya-n)0-0#` |
| 2153 | 461 | 476 | 7 | `space` | `corrected` | `#0-0+am-o(chiye-lo-ya-n)0-0#` | `#0-0+am-o( chiye-lo-ya-n)0-0#` |
| 2164 | 462 | 477 | 4 | `zero-or-square-zero` | `visual-retained` | `#0-0(yohua-0-n)[sq0]-0#` | `#0-0(yohua-0-n)[sq0]-0#` |
| 2192 | 466 | 481 | 20 | `space` | `corrected` | `#0-0(yohua-tzin-co)0-0#` | `#0-0(yohua-tzin-co )0-0#` |
| 2195 | 466 | 481 | 26 | `space` | `corrected` | `#0-0(cal-pol-co)0-0#` | `#0-0( cal-pol-co )0-0#` |
| 2197 | 466 | 481 | 31 | `space` | `corrected` | `#0-0+m-o(ma-c)0-0#` | `#0-0+m-o(ma-c )0-0#` |
| 2198 | 466 | 481 | 36 | `zero-or-square-zero` | `visual-retained` | `#0-0(teoh-cal-[sq0]-tzin-co)[sq0]-0#` | `#0-0(teoh-cal-[sq0]-tzin-co)[sq0]-0#` |
| 2200 | 467 | 482 | 22 | `space` | `corrected` | `#0-0(cal-nacaz-co)0-0#` | `#0-0( cal-nacaz-co )0-0#` |
| 2201 | 467 | 482 | 24 | `space` | `corrected` | `#0-0+n-o(cal-nacaz-co)0-0#` | `#0-0+n-o( cal-nacaz-co )0-0#` |
| 2202 | 468 | 483 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0(nahua-qu-eh-0)[sq0]-0#` | `#0-0(nahua-qu-eh-0)[sq0]-0#` |
| 2209 | 472 | 487 | 30 | `space` | `corrected` | `#0-0+i-0(yol-lo-h-co-pa-tzin-co)0-0#` | `#0-0+i-0(yol-lo-h-co-pa-tzin-co )0-0#` |
| 2219 | 477 | 492 | 7 | `space` | `corrected` | `#0-0+qui-0(cuauh-tzalan-aqui-a)0+0-0#` | `#0-0+qui-0( cuauh-tzalan-aqui-a)0+0-0#` |
| 2221 | 478 | 493 | 17 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-coz-ti-0-c-0+0-0-ihhui-ti-ca)0-0#` | `#0-0(0-0-coz-ti-0-c-0+0-0-ihhui-ti-ca)0-0#` |
| 2222 | 478 | 493 | 23 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-ce-0-0+0-0-tomin-ti-ca)0-0#` | `#0-0(0-0-ce-0-0+0-0-tomin-ti-ca)0-0#` |
| 2225 | 478 | 493 | 31 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-ce-ti-ca)0-0#` | `#0-0(0-0-ce-ti-ca)0-0#` |
| 2226 | 479 | 494 | 31 | `space` | `corrected` | `#0-0(oh-tli-ca)0-0#` | `#0-0( oh-tli-ca)0-0#` |
| 2229 | 480 | 495 | 19 | `line-break` | `corrected` | `#0-0(tlal-t-icpa-qu-eh-0)0-0#` | `#0-0(tlal-t-icpa-[line-break]qu-eh-0)0-0#` |
| 2233 | 484 | 499 | 18 | `zero-or-square-zero` | `visual-retained` | `#0-0(izta-0-ca-ti-tlan)0-0#` | `#0-0(izta-0-ca-ti-tlan)0-0#` |
| 2237 | 485 | 500 | 8 | `space` | `corrected` | `#0-0(oh-ne-pan-co)0-0#` | `#0-0( oh-ne-pan-co )0-0#` |
| 2239 | 485 | 500 | 15 | `space` | `corrected` | `#0-0(cuauh-ne-pan-tlah)0-0#` | `#0-0( cuauh-ne-pan-tlah)0-0#` |
| 2240 | 485 | 500 | 16 | `uppercase` | `corrected` | `#0-0(yohua-l-ne-pan-tlah)0-0#` | `#0-0(yohua-I-ne-pan-tlah)0-0#` |
| 2241 | 485 | 500 | 18 | `space` | `corrected` | `#0-0+t-o(cua-ne-pan-tlah)0-0#` | `#0-0+t-o( cua-ne-pan-tlah)0-0#` |
| 2244 | 486 | 501 | 10 | `punctuation,uppercase` | `corrected` | `#0-0(Españoles)[sq0]-0#` | `#0-0(Espafi.oles)[sq0]-0#` |
| 2245 | 486 | 501 | 11 | `line-break` | `corrected` | `#0-0(Españoles)m-eh#` | `#0-[line-break]0(Espaiioles)m-eh#` |
| 2247 | 488 | 503 | 19 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-hue-i-0-0+0-0-a-pan)0-0#` | `#0-0(0-0-hue-i-0-0+0-0-a-pan)0-0#` |
| 2249 | 490 | 505 | 2 | `space` | `corrected` | `#0-0(cuauh-tlah-ca)tl-0#` | `#0-0( cuauh-tlah-ca)tl-0#` |
| 2254 | 490 | 505 | 12 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-hue-i-0-0+0-0-a-pan-ca)tl-0#` | `#0-0(0-0-hue-i-0-0+0-0-a-pan-ca)tl-0#` |
| 2255 | 490 | 505 | 17 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-tona-0-ti-uh-0-0-0+0-0-i-0+quiza-ya-n-ca)tl-0#` | `#0-0(0-0-tona-0-ti-uh-0-0-0+0-0-i-0+quiza-ya-n-ca)tl-0#` |
| 2256 | 490 | 505 | 25 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-ilhui-ca-a-tl-0+0-0-i-0-pitz-a-hua-ya-n-ca)tl-0#` | `#0-0(0-0-ilhui-ca-a-tl-0+0-0-i-0-pitz-a-hua-ya-n-ca)tl-0#` |
| 2257 | 490 | 505 | 34 | `space,zero-or-square-zero` | `corrected` | `#0-0(cuauh-ten-[sq0]-ca)tl-0#` | `#0-0( cuauh-ten-[sq0]-ca)tl-0#` |
| 2258 | 490 | 505 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0(a-toy-a-ten-[sq0]-ca)0-h#` | `#0-0(a-toy-a-ten-[sq0]-ca)0-h#` |
| 2259 | 490 | 505 | 40 | `zero-or-square-zero` | `visual-retained` | `#ni-0(xo-chi-te-pan-cal-[sq0]-ca)tl-0#` | `#ni-0(xo-chi-te-pan-cal-[sq0]-ca)tl-0#` |
| 2260 | 491 | 506 | 2 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(tepe-hxi-[sq0]-ca)tl-0#` | `#0-0(tepe-hxi-O-ca)tl-0#` |
| 2261 | 491 | 506 | 4 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(tlal-t-icpa-[sq0]-ca)tl-0#` | `#0-0(tlal-t-icpa-O-ca)tl-0#` |
| 2264 | 491 | 506 | 15 | `zero-or-square-zero` | `visual-retained` | `#0-0(i-0-hui-ya-n-yo)tl-0#` | `#0-0(i-0-hui-ya-n-yo)tl-0#` |
| 2267 | 491 | 506 | 25 | `line-break` | `corrected` | `#0-0(0-0-tona-0-ti-uh-0-0-0+0-0-i-0-cal-aqui-ya-n-yo)tl-0#` | `#0-0(0-0-tona-0-ti-uh-0-0-0+0-0-i-0-cal-aqui-ya-n-[line-break]yo)tl-0#` |
| 2268 | 491 | 506 | 29 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-huel-0-0+0-0-i-0-pan-yo)tl-0#` | `#0-0(0-0-huel-0-0+0-0-i-0-pan-yo)tl-0#` |
| 2269 | 491 | 506 | 33 | `line-break` | `corrected` | `#0-0(0-0-huel-0-0+0-0-im-man-yo)tl-0#` | `#0-[line-break]0(0-0-huel-0-0+0-0-im-man-yo)tl-0#` |
| 2272 | 492 | 507 | 7 | `zero-or-square-zero` | `visual-retained` | `#(tlal-t-icpa-[sq0]-ca-yo)tl-0#` | `#(tlal-t-icpa-[sq0]-ca-yo)tl-0#` |
| 2276 | 492 | 507 | 19 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-hue-i-0-0+0-0-a-pan-ca-yo)tl-0#` | `#0-0(0-0-hue-i-0-0+0-0-a-pan-ca-yo)tl-0#` |
| 2277 | 492 | 507 | 22 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-tona-0-ti-uh-0-0-0+0-0-i-quiza-ya-n-ca-yo)tl-0#` | `#0-0(0-0-tona-0-ti-uh-0-0-0+0-0-i-quiza-ya-n-ca-yo)tl-0#` |
| 2278 | 495 | 510 | 13 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-A-tl-0+0-0-I-0-huetzi-ya-n)0-0#` | `#0-0(0-0-A-tl-0+0-0-I-0-huetzi-ya-n)0-0#` |
| 2279 | 495 | 510 | 16 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Cuex-te-ca-tl-0+0-0-I-0-choca-ya-n)0-0#` | `#0-0(0-0-Cuex-te-ca-tl-0+0-0-I-0-choca-ya-n)0-0#` |
| 2280 | 495 | 510 | 20 | `uppercase` | `corrected` | `#0-0(Quin-e-hua-ya-n)[sq0]-0#` | `#0-0(Quin-e-hua-ya-n)O-0#` |
| 2281 | 495 | 510 | 21 | `uppercase` | `corrected` | `#0-0(Itz-tapal-na-na-tz-ca-ya-n)[sq0]-0#` | `#0-0(Itz-tapal-na-na-tz-ca-ya-n)O-0#` |
| 2282 | 495 | 510 | 28 | `uppercase` | `corrected` | `#0-0(Te-pano-hua-ya-n)[sq0]-0#` | `#0-0(Te-pano-hua-ya-n)O-0#` |
| 2283 | 495 | 510 | 30 | `uppercase` | `corrected` | `#0-0(A-tla-cui-hua-ya-n)[sq0]-0#` | `#0-0(A-tla-cui-hua-ya-n)O-0#` |
| 2284 | 495 | 510 | 32 | `uppercase` | `corrected` | `#0-0(A-tl-i-hua-ya-n)[sq0]-0#` | `#0-0(A-tl-i-hua-ya-n)O-0#` |
| 2285 | 495 | 510 | 36 | `uppercase` | `corrected` | `#0-0(Xol-o-ch-a-uh-ya-n)[sq0]-0#` | `#0-0(Xol-o-ch-a-uh-ya-n)O-0#` |
| 2286 | 495 | 510 | 38 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-A-tl-0+0-0-I-0-tlal-ac-ya-n)0-0#` | `#0-0(0-0-A-tl-0+0-0-I-0-tlal-ac-ya-n)0-0#` |
| 2287 | 496 | 511 | 4 | `digit-one,zero-or-square-zero` | `corrected` | `#0-0(Ol-ma-n)0-0#` | `#0-0(01-ma-n)0-0#` |
| 2288 | 496 | 511 | 5 | `uppercase` | `visual-retained` | `#0-0(Chichi-ma-n)0-0#` | `#0-0(Chichi-ma-n)0-0#` |
| 2289 | 496 | 511 | 8 | `uppercase` | `visual-retained` | `#0-0(A-col-ma-n)0-0#` | `#0-0(A-col-ma-n)0-0#` |
| 2290 | 496 | 511 | 9 | `zero-or-square-zero` | `corrected` | `#0-0(Ozto-ma-n)0-0#` | `#0-0(0zto-ma-n)0-0#` |
| 2291 | 496 | 511 | 17 | `uppercase` | `visual-retained` | `#0-0(A-zta-tla-n)0-0#` | `#0-0(A-zta-tla-n)0-0#` |
| 2292 | 496 | 511 | 19 | `uppercase` | `visual-retained` | `#0-0(Az-tla-n)0-0#` | `#0-0(Az-tla-n)0-0#` |
| 2293 | 496 | 511 | 34 | `uppercase` | `visual-retained` | `#0-0(Tol-la-n)0-0#` | `#0-0(Tol-la-n)0-0#` |
| 2294 | 496 | 511 | 35 | `uppercase` | `visual-retained` | `#0-0(Te-poz-tla-n)0-0#` | `#0-0(Te-poz-tla-n)0-0#` |
| 2295 | 496 | 511 | 37 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Hue-i-0-0+0-0-Mol-la-n)0-0#` | `#0-0(0-0-Hue-i-0-0+0-0-Mol-la-n)0-0#` |
| 2296 | 497 | 512 | 7 | `uppercase` | `visual-retained` | `#0-0(Mic-tla-n)tli-0#` | `#0-0(Mic-tla-n)tli-0#` |
| 2297 | 497 | 512 | 8 | `uppercase` | `visual-retained` | `#0-0(Mic-tla-n)0-0#` | `#0-0(Mic-tla-n)0-0#` |
| 2298 | 497 | 512 | 16 | `uppercase` | `visual-retained` | `#0-0(Xo-chi-a-ca-n)0-0#` | `#0-0(Xo-chi-a-ca-n)0-0#` |
| 2299 | 497 | 512 | 17 | `uppercase` | `visual-retained` | `#0-0(Coa-ix-tla-hua-ca-n)0-0#` | `#0-0(Coa-ix-tla-hua-ca-n)0-0#` |
| 2300 | 497 | 512 | 18 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Hue-i-ya-0-c-0+0-0-Ix-tla-hua-ca-n)0-0#` | `#0-0(0-0-Hue-i-ya-0-c-0+0-0-Ix-tla-hua-ca-n)0-0#` |
| 2301 | 498 | 513 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0(coh-coy-o-n-0-ca-n)0-0#` | `#0-0(coh-coy-o-n-0-ca-n)0-0#` |
| 2302 | 498 | 513 | 3 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Tla-ilo-tla-0-ca-n)0-0#` | `#0-0(Tla-ilo-tla-0-ca-n)0-0#` |
| 2303 | 498 | 513 | 5 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Coa-tl-0+0-0-Xo-xo-uh-0-ca-n)0-0#` | `#0-0(0-0-Coa-tl-0+0-0-Xo-xo-uh-0-ca-n)0-0#` |
| 2304 | 498 | 513 | 8 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Tepe-tl-0+0-0-Hue-i-ya-0-ca-n)[sq0]-0#` | `#0-0(0-0-Tepe-tl-0+0-0-Hue-i-ya-0-ca-n)[sq0]-0#` |
| 2305 | 498 | 513 | 14 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Ama-quem-eh-0-ca-n)0-0#` | `#0-0(Ama-quem-eh-0-ca-n)0-0#` |
| 2306 | 498 | 513 | 16 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Col-huah-0-ca-n)0-0#` | `#0-0(Col-huah-0-ca-n)0-0#` |
| 2307 | 498 | 513 | 18 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Teo-huah-0-ca-n)0-0#` | `#0-0(Teo-huah-0-ca-n)0-0#` |
| 2308 | 498 | 513 | 19 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Teo-ti-huah-0-ca-n)0-0#` | `#0-0(Teo-ti-huah-0-ca-n)0-0#` |
| 2309 | 498 | 513 | 36 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Te-nan-yoh-0-ca-n)0-0#` | `#0-0(Te-nan-yoh-0-ca-n)0-0#` |
| 2310 | 498 | 513 | 38 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Tiza-yo-h-0-ca-n)0-0#` | `#0-0(Tiza-yo-h-0-ca-n)0-0#` |
| 2311 | 499 | 514 | 2 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Izta-0-c-0+0-0-Coa-tl-0+0-0-i-0-on-o-ca-n)[sq0]-0#` | `#0-0(0-0-Izta-0-c-0+0-0-Coa-tl-0+0-0-i-0-on-o-ca-n)O-0#` |
| 2312 | 499 | 514 | 6 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Izta-0-c-0+0-0-Hue-xo-tl-0+0-0-I-0-hca-ca-n)[sq0]-0#` | `#0-0(0-0-Izta-0-c-0+0-0-Hue-xo-tl-0+0-0-I-0-hca-ca-n)O-0#` |
| 2313 | 499 | 514 | 9 | `line-break` | `corrected` | `#0-0(0-0-A-tl-0+0-0-Xo-xo-uh-0-qui-0+0-0-i-0-man-ca-n)0-0#` | `#0-0(0-0-A-tl-0+0-0-Xo-xo-uh-0-qui-0+0-0-i-0-man-ca-[line-break]n)0-0#` |
| 2314 | 499 | 514 | 11 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Toz-pal-a-tl-0+0-0-i-0-on-o-ca-n)[sq0]-0#` | `#0-0(0-0-Toz-pal-a-tl-0+0-0-i-0-on-o-ca-n)O-0#` |
| 2315 | 499 | 514 | 17 | `digit-one,uppercase` | `corrected` | `#0-0(Izta-pan)[sq0]-0#` | `#0-0(1zta-pan)O-0#` |
| 2316 | 499 | 514 | 18 | `uppercase` | `corrected` | `#0-0(Te-pan)[sq0]-0#` | `#0-0(Te-pan)O-0#` |
| 2317 | 499 | 514 | 19 | `uppercase` | `corrected` | `#0-0(Tlaco-tem-pan)[sq0]-0#` | `#0-0(Tlaco-tem-pan)O-0#` |
| 2318 | 499 | 514 | 20 | `uppercase` | `corrected` | `#0-0(Te-cua-ni-pan)[sq0]-0#` | `#0-0(Te-cua-ni-pan)O-0#` |
| 2319 | 499 | 514 | 22 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Hue-i-0-0+0-0-Mil-pan)[sq0]-0#` | `#0-0(0-0-Hue-i-0-0+0-0-Mil-pan)O-0#` |
| 2320 | 499 | 514 | 27 | `uppercase` | `corrected` | `#0-0(Pa-pal-o-a-pan)[sq0]-0#` | `#0-0(Pa-pal-o-a-pan)O-0#` |
| 2321 | 499 | 514 | 29 | `punctuation,uppercase` | `corrected` | `#0-0(Āhui-liz-ā-pan)[sq0]-0#` | `#0-0(.Ahui-liz-a-pan)O-0#` |
| 2322 | 499 | 514 | 31 | `uppercase` | `corrected` | `#0-0(Xal-a-pan)[sq0]-0#` | `#0-0(Xal-a-pan)O-0#` |
| 2323 | 499 | 514 | 33 | `uppercase` | `corrected` | `#0-0(Tiza-a-pan)[sq0]-0#` | `#0-0(Tiza-a-pan)O-0#` |
| 2324 | 500 | 515 | 2 | `uppercase` | `visual-retained` | `#0-0(Xal-ix-pan)0-0#` | `#0-0(Xal-ix-pan)0-0#` |
| 2325 | 500 | 515 | 4 | `digit-one,uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Tepe-tl-0+0-0-i-0-ix-pan)0-0#` | `#0-0(0-0-Tepe-tl-0+0-0-1-0-ix-pan)0-0#` |
| 2326 | 500 | 515 | 8 | `uppercase` | `visual-retained` | `#0-0(Xal-ti-pan)0-0#` | `#0-0(Xal-ti-pan)0-0#` |
| 2327 | 500 | 515 | 9 | `zero-or-square-zero` | `corrected` | `#0-0(Ohxi-ti-pan)0-0#` | `#0-0(0hxi-ti-pan)0-0#` |
| 2328 | 500 | 515 | 15 | `uppercase` | `visual-retained` | `#0-0(Me-xi-h-co)0-0#` | `#0-0(Me-xi-h-co)0-0#` |
| 2329 | 500 | 515 | 33 | `uppercase` | `visual-retained` | `#0-0(Chal-co)0-0#` | `#0-0(Chal-co)0-0#` |
| 2330 | 500 | 515 | 36 | `uppercase` | `visual-retained` | `#0-0(Tlach-co)0-0#` | `#0-0(Tlach-co)0-0#` |
| 2331 | 500 | 515 | 37 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Hue-i-0-0+0-0-Te-nan-co)0-0#` | `#0-0(0-0-Hue-i-0-0+0-0-Te-nan-co)0-0#` |
| 2332 | 501 | 516 | 2 | `space,uppercase` | `corrected` | `#0-0(A-ca-pol-co)0-0#` | `#0-0(A-ca-pol-co )0-0#` |
| 2333 | 501 | 516 | 3 | `space,uppercase` | `corrected` | `#0-0(Chimal-zol-co)0-0#` | `#0-0( Chimal-zol-co )0-0#` |
| 2334 | 501 | 516 | 15 | `uppercase` | `visual-retained` | `#0-0(A-toy-a-tzin-co)0-0#` | `#0-0(A-toy-a-tzin-co)0-0#` |
| 2335 | 501 | 516 | 16 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(A-toy-a-0-tzin-co)0-0#` | `#0-0(A-toy-a-0-tzin-co)0-0#` |
| 2336 | 501 | 516 | 18 | `uppercase` | `visual-retained` | `#0-0(Az-ca-potza-l-ton-co)0-0#` | `#0-0(Az-ca-potza-l-ton-co)0-0#` |
| 2337 | 501 | 516 | 19 | `line-break` | `corrected` | `#0-0(Az-ca-potz-a-l-0-ton-co)0-0#` | `#0-0(Az-ca-potz-a-[line-break]I-0-ton-co)0-0#` |
| 2338 | 501 | 516 | 24 | `uppercase` | `visual-retained` | `#0-0(Te-coa-c)0-0#` | `#0-0(Te-coa-c)0-0#` |
| 2339 | 501 | 516 | 25 | `uppercase` | `visual-retained` | `#0-0(Tepe-yaca-c)0-0#` | `#0-0(Tepe-yaca-c)0-0#` |
| 2340 | 501 | 516 | 27 | `uppercase` | `visual-retained` | `#0-0(Te-cua-n-tepe-c)0-0#` | `#0-0(Te-cua-n-tepe-c)0-0#` |
| 2341 | 501 | 516 | 31 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Tlil-i-uh-0-qui-0+0-0-Tepe-c)0-0#` | `#0-0(0-0-Tlil-i-uh-0-qui-0+0-0-Tepe-c)0-0#` |
| 2342 | 501 | 516 | 35 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Coa-tl-0+0-0-i-0-cama-c)0-0#` | `#0-0(0-0-Coa-tl-0+0-0-i-0-cama-c)0-0#` |
| 2343 | 501 | 516 | 40 | `uppercase` | `visual-retained` | `#0-0(Cuauh-nahua-c)0-0#` | `#0-0(Cuauh-nahua-c)0-0#` |
| 2344 | 502 | 517 | 2 | `punctuation,uppercase` | `corrected` | `#0-0(Ā-nāhua-c)0-0#` | `#0-0(.A-nahua-c)0-0#` |
| 2345 | 502 | 517 | 7 | `space,uppercase` | `corrected` | `#0-0(Xal-ix-co)0-0#` | `#0-0(Xal-ix-co )0-0#` |
| 2346 | 502 | 517 | 8 | `punctuation,uppercase` | `corrected` | `#0-0(Ā-tl-ix-co)0-0#` | `#0-0(.A-tl-ix-co)0-0#` |
| 2347 | 502 | 517 | 11 | `uppercase` | `visual-retained` | `#0-0(Tepe-t-icpa-c)0-0#` | `#0-0(Tepe-t-icpa-c)0-0#` |
| 2348 | 502 | 517 | 12 | `zero-or-square-zero` | `visual-retained` | `#0-0(0zto-t-icpa-c)0-0#` | `#0-0(0zto-t-icpa-c)0-0#` |
| 2349 | 502 | 517 | 16 | `uppercase` | `visual-retained` | `#0-0(Huexo-tlah)0-0#` | `#0-0(Huexo-tlah)0-0#` |
| 2350 | 502 | 517 | 17 | `uppercase` | `visual-retained` | `#0-0(Mil-lah)0-0#` | `#0-0(Mil-lah)0-0#` |
| 2351 | 502 | 517 | 18 | `punctuation,uppercase` | `corrected` | `#0-0(Ā-yō-tōch-cuitla-tlah)0-0#` | `#0-0(.A-yo-toch-cuitla-tlah)0-0#` |
| 2352 | 502 | 517 | 22 | `uppercase` | `visual-retained` | `#0-0(Ne-pan-tlah)0-0#` | `#0-0(Ne-pan-tlah)0-0#` |
| 2353 | 502 | 517 | 24 | `uppercase` | `visual-retained` | `#0-0(Tlal-ne-pan-tlah)0-0#` | `#0-0(Tlal-ne-pan-tlah)0-0#` |
| 2354 | 502 | 517 | 28 | `uppercase` | `visual-retained` | `#0-0(Coa-tzalan)0-0#` | `#0-0(Coa-tzalan)0-0#` |
| 2355 | 502 | 517 | 29 | `uppercase` | `visual-retained` | `#0-0(Cuauh-tzalan)0-0#` | `#0-0(Cuauh-tzalan)0-0#` |
| 2356 | 502 | 517 | 32 | `uppercase` | `visual-retained` | `#0-0(Te-noch-ti-tlan)0-0#` | `#0-0(Te-noch-ti-tlan)0-0#` |
| 2357 | 502 | 517 | 33 | `punctuation,uppercase` | `corrected` | `#0-0(Ā-ti-tlan)0-0#` | `#0-0(.A-ti-tlan)0-0#` |
| 2358 | 502 | 517 | 34 | `punctuation,uppercase` | `corrected` | `#0-0(Ā-ca-tzin-ti-tlan)0-0#` | `#0-0(.A-ca-tzin-ti-tlan)0-0#` |
| 2359 | 502 | 517 | 38 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Coa-tl-0+0-0-i-0-chan)0-0#` | `#0-0(0-0-Coa-tl-0+0-0-i-0-chan)0-0#` |
| 2360 | 503 | 518 | 2 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Cuauh-t-0+0-0-i-n-chan)0-0#` | `#0-0(0-0-Cuauh-t-0+0-0-i-n-chan)0-0#` |
| 2361 | 508 | 523 | 3 | `uppercase,zero-or-square-zero` | `visual-retained` | `#n-0(0-0-A-tl-0+0-0-i-0-ceuh-0-ca)tl-0#` | `#n-0(0-0-A-tl-0+0-0-i-0-ceuh-0-ca)tl-0#` |
| 2362 | 508 | 523 | 21 | `zero-or-square-zero` | `visual-retained` | `#0-0(0tom-pan)0-0#` | `#0-0(0tom-pan)0-0#` |
| 2363 | 508 | 523 | 22 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Mix-te-[sq0]-ca-pan)0-0#` | `#0-0(Mix-te-[sq0]-ca-pan)0-0#` |
| 2364 | 508 | 523 | 24 | `uppercase` | `visual-retained` | `#0-0(Te-pan-e-ca-pan)0-0#` | `#0-0(Te-pan-e-ca-pan)0-0#` |
| 2365 | 508 | 523 | 26 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Teo-huah-0-[sq0]-ca-tla-n)0-0#` | `#0-0(Teo-huah-0-[sq0]-ca-tla-n)0-0#` |
| 2366 | 508 | 523 | 29 | `space,uppercase,zero-or-square-zero` | `corrected` | `#0-0(Chichi-me-[sq0]-ca-tlal-pan)0-0#` | `#0-0( Chichi-me-[sq0]-ca-tlal-pan)0-0#` |
| 2367 | 508 | 523 | 39 | `space,uppercase,zero-or-square-zero` | `corrected` | `#0-0(Me-xi-h-0-ca-tzin-co)0-0#` | `#0-0(Me-xi-h-0-ca-tzin-co )0-0#` |
| 2368 | 509 | 524 | 2 | `space,uppercase,zero-or-square-zero` | `corrected` | `#0-0(Col-huah-0-tzin-co)0-0#` | `#0-0( Col-huah-0-tzin-co )0-0#` |
| 2369 | 509 | 524 | 5 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Col-huah-0-[sq0]-ca-ton-co)0-0#` | `#0-0(Col-huah-0-[sq0]-ca-ton-co)0-0#` |
| 2370 | 509 | 524 | 22 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Me-xi-h-[sq0]-ca-yo)tl-0#` | `#0-0(Me-xi-h-[sq0]-ca-yo)tl-0#` |
| 2371 | 509 | 524 | 25 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(Tol-te-[sq0]-ca-yo)tl-0#` | `#0-0(Tol-te-[sq0]-ca-yo)tl-0#` |
| 2372 | 509 | 524 | 27 | `uppercase` | `visual-retained` | `#0-0(Cuauh-ti-tlan-ca-yo)tl-0#` | `#0-0(Cuauh-ti-tlan-ca-yo)tl-0#` |
| 2373 | 509 | 524 | 30 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Cuauh-t-0+0-0-i-n-chan-ca-yo)tl-0#` | `#0-0(0-0-Cuauh-t-0+0-0-i-n-chan-ca-yo)tl-0#` |
| 2374 | 509 | 524 | 33 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(A-nahua-[sq0]-ca-yo)tl-0#` | `#0-0(A-nahua-[sq0]-ca-yo)tl-0#` |
| 2376 | 510 | 525 | 22 | `uppercase,zero-or-square-zero` | `corrected` | `#am-0+i-0(tol-te-[sq0]-ca)hu-an#` | `#am-0+i-0(tol-te-O-ca)hu-an#` |
| 2377 | 510 | 525 | 25 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(a-man-te-[sq0]-ca-yo)tl-0#` | `#0-0(a-man-te-O-ca-yo)tl-0#` |
| 2378 | 510 | 525 | 32 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlaco-ch-cal-0-ca)tl-0#` | `#0-0(tlaco-ch-cal-0-ca)tl-0#` |
| 2379 | 510 | 525 | 35 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(tlaca-tec-[sq0]-ca)tl-0#` | `#0-0(tlaca-tec-O-ca)tl-0#` |
| 2380 | 511 | 526 | 2 | `zero-or-square-zero` | `visual-retained` | `#0-0(tocuil-te-[sq0]-ca)tl-0#` | `#0-0(tocuil-te-[sq0]-ca)tl-0#` |
| 2382 | 511 | 526 | 8 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(tez-ca-coa-[sq0]-ca)tl-0#` | `#0-0(tez-ca-coa-O-ca)tl-0#` |
| 2391 | 543 | 558 | 11 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-te-ca-0-0+0-0-ne-cah-cay-a-hu-a-liz)tli-0#` | `#0-0(0-0-te-ca-0-0+0-0-ne-cah-cay-a-hu-a-liz)tli-0#` |
| 2392 | 543 | 558 | 13 | `zero-or-square-zero` | `visual-retained` | `#0-0+i-0(0-0-te-ca-0-0+0-0-ne-cah-cay-a-hu-a-liz)0-0#` | `#0-0+i-0(0-0-te-ca-0-0+0-0-ne-cah-cay-a-hu-a-liz)0-0#` |
| 2394 | 546 | 561 | 16 | `zero-or-square-zero` | `visual-retained` | `#0-0(cem-el-eh-0)0-0#` | `#0-0(cem-el-eh-0)0-0#` |
| 2397 | 575 | 590 | 26 | `zero-or-square-zero` | `visual-retained` | `o#0-0(i-0-ix-xip-tla-ti)0+c-0#` | `o#0-0(i-0-ix-xip-tla-ti)0+c-0#` |
| 2398 | 575 | 590 | 31 | `zero-or-square-zero` | `visual-retained` | `#t-0(i-0-hui-hhui-ti)z+0-0#` | `#t-0(i-0-hui-hhui-ti)z+0-0#` |
| 2399 | 575 | 590 | 38 | `zero-or-square-zero` | `visual-retained` | `#0-0(i-0-pa-ti-l-lo-ti)0+0-0#` | `#0-0(i-0-pa-ti-l-lo-ti)0+0-0#` |
| 2407 | 576 | 591 | 34 | `zero-or-square-zero` | `visual-retained` | `#0-0(i-0-mah-ce-hua-l-ti)0+0-0#` | `#0-0(i-0-mah-ce-hua-l-ti)0+0-0#` |
| 2410 | 577 | 592 | 4 | `uppercase` | `corrected` | `#0-0(t-o-mah-ce-hua-l-ti-z-nequi)0+0-0#` | `#0-0(t-o-mah-ce-hua-I-ti-z-nequi)0+0-0#` |
| 2411 | 577 | 592 | 7 | `uppercase` | `corrected` | `#ti-0(t-o-mah-ce-hua-l-ti)z+0-0#` | `#ti-0(t-o-mah-ce-hua-I-ti)z+0-0#` |
| 2413 | 577 | 592 | 18 | `uppercase` | `corrected` | `o#0-0(ce-l-n-o-tlahu-el-i-l-ti)0+c-0#` | `o#0-0(ce-I-n-o-tlahu-el-i-l-ti)0+c-0#` |
| 2417 | 577 | 592 | 30 | `zero-or-square-zero` | `visual-retained` | `#0-0(i-0-pan-ti)0+0-0#` | `#0-0(i-0-pan-ti)0+0-0#` |
| 2419 | 577 | 592 | 34 | `zero-or-square-zero` | `visual-retained` | `#0-0(i-0-pan-ti)z+0-0#` | `#0-0(i-0-pan-ti)z+0-0#` |
| 2420 | 577 | 592 | 37 | `zero-or-square-zero` | `visual-retained` | `#ni-0+tla(i-0-pan-ti-a)0+0-0#` | `#ni-0+tla(i-0-pan-ti-a)0+0-0#` |
| 2421 | 577 | 592 | 39 | `zero-or-square-zero` | `visual-retained` | `o#ti-0+tla(i-0-pan-ti-h)0+qu-eh#` | `o#ti-0+tla(i-0-pan-ti-h)0+qu-eh#` |
| 2425 | 594 | 609 | 5 | `punctuation,space` | `visual-retained` | `I am (you are) (he/she is) called/named '[clause]'` | `I am (you are) (he/she is) called/named '[clause]'` |
| 2426 | 594 | 609 | 6 | `punctuation,space` | `visual-retained` | `I am (you are, etc.) '[clause]'` | `I am (you are, etc.) '[clause]'` |
| 2428 | 594 | 609 | 18 | `zero-or-square-zero` | `visual-retained` | `#0-0(temo-0)c-0#` | `#0-0(temo-0)c-0#` |
| 2429 | 594 | 609 | 20 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Temo-0-c-0)0-0#` | `#ti-0(0-0-Temo-0-c-0)0-0#` |
| 2430 | 594 | 609 | 28 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Temo-0-c-0+tzin)0-0#` | `#ti-0(0-0-Temo-0-c-0+tzin)0-0#` |
| 2431 | 594 | 609 | 38 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Cuauh-temo-0-c-0)0-0#` | `#0-0(0-0-Cuauh-temo-0-c-0)0-0#` |
| 2432 | 595 | 610 | 6 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-Cua-cuauh-pitz-a-hua-0-c-0)0-0#` | `#ni-0(0-0-Cua-cuauh-pitz-a-hua-0-c-0)0-0#` |
| 2433 | 595 | 610 | 8 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-Chal-chiuh-tepe-huah-0-0-0)0-0#` | `#ni-0(0-0-Chal-chiuh-tepe-huah-0-0-0)0-0#` |
| 2434 | 595 | 610 | 14 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Tlal-teh-tecu-i-n-0-0-0)0-0#` | `#0-0(0-0-Tlal-teh-tecu-i-n-0-0-0)0-0#` |
| 2435 | 595 | 610 | 18 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Chimal-pain-0-0-0)0-0#` | `#0-0(0-0-Chimal-pain-0-0-0)0-0#` |
| 2436 | 595 | 610 | 23 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Petl-a-uh-0-0-0+tzin)0-0#` | `#ti-0(0-0-Petl-a-uh-0-0-0+tzin)0-0#` |
| 2437 | 595 | 610 | 26 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Te-huetzqui-tih-0-0-0+tzin)0-0#` | `#0-0(0-0-Te-huetzqui-tih-0-0-0+tzin)0-0#` |
| 2438 | 595 | 610 | 32 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Temo-0-ca-tzin-0-0)0-0#` | `#ti-0(0-0-Temo-0-ca-tzin-0-0)0-0#` |
| 2439 | 595 | 610 | 35 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Te-nam-mi-n-0-ca-tzin-0-0)0-0#` | `#ti-0(0-0-Te-nam-mi-n-0-ca-tzin-0-0)0-0#` |
| 2440 | 595 | 610 | 38 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Tiz-oqu-i-0-ca-tzin-0-0)0-0#` | `#0-0(0-0-Tiz-oqu-i-0-ca-tzin-0-0)0-0#` |
| 2441 | 596 | 611 | 4 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Tiz-oqu-i-0-c-0)0-0#` | `#0-0(0-0-Tiz-oqu-i-0-c-0)0-0#` |
| 2442 | 596 | 611 | 13 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Tlal-o-0-c-0)0-0#` | `#ti-0(0-0-Tlal-o-0-c-0)0-0#` |
| 2443 | 596 | 611 | 18 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Mil-i-n-0-t-o-0-c-0)0-0#` | `#ti-0(0-0-Mil-i-n-0-t-o-0-c-0)0-0#` |
| 2444 | 596 | 611 | 26 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Mil-i-n-0-t-o-0-c-0+tzin)0-0#` | `#ti-0(0-0-Mil-i-n-0-t-o-0-c-0+tzin)0-0#` |
| 2445 | 596 | 611 | 29 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-ix-huetzca-0-t-o-0-ca-tzin-0-0)0-0#` | `#0-0(0-0-ix-huetzca-0-t-o-0-ca-tzin-0-0)0-0#` |
| 2447 | 596 | 611 | 35 | `zero-or-square-zero` | `visual-retained` | `#0-0(cuauh-tla-ht-o-a-0)0-0#` | `#0-0(cuauh-tla-ht-o-a-0)0-0#` |
| 2448 | 596 | 611 | 39 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Cuauh-tla-ht-o-a-0-0-0)0-0#` | `#ti-0(0-0-Cuauh-tla-ht-o-a-0-0-0)0-0#` |
| 2449 | 597 | 612 | 2 | `uppercase,zero-or-square-zero,line-break` | `corrected` | `#ti-0(0-0-Cuauh-tla-ht-o-a-0-0-0+tzin)0-0#` | `#ti-0(0-0-Cuauh-tla-ht-o-a-0-0-0+tzin)0-[line-break]0#` |
| 2450 | 597 | 612 | 6 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(Chimal-po-po-ca-0-0-0)0-0#` | `#ti-0(Chimal-po-po-ca-0-0-0)0-0#` |
| 2451 | 597 | 612 | 34 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Nen-tla-mati-0-0-0+tzin)0-0#` | `#ti-0(0-0-Nen-tla-mati-0-0-0+tzin)0-0#` |
| 2452 | 597 | 612 | 36 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Te-tle-pan-quetza-0-0-0+tzin)0-0#` | `#ti-0(0-0-Te-tle-pan-quetza-0-0-0+tzin)0-0#` |
| 2453 | 597 | 612 | 39 | `space` | `corrected` | `#0-0+te+tla(cui-lia)ni+0-0#` | `#0-0+te+tla( cui-lia)ni+0-0#` |
| 2455 | 598 | 613 | 2 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Tla-cui-lia-ni-0-0)0-0#` | `#0-0(0-0-Tla-cui-lia-ni-0-0)0-0#` |
| 2456 | 598 | 613 | 5 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Tla-cui-lia-n-0-0+tzin)0-0#` | `#0-0(0-0-Tla-cui-Iia-n-0-0+tzin)0-0#` |
| 2457 | 598 | 613 | 9 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Noch-cua-ni-0-0)0-0#` | `#ti-0(0-0-Noch-cua-ni-0-0)0-0#` |
| 2458 | 598 | 613 | 11 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Tla-hye-l-cua-ni-0-0)0-0#` | `#0-0(0-0-Tla-hye-l-cua-ni-0-0)0-0#` |
| 2459 | 598 | 613 | 17 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Te-cohua-ni-0-0+tzin)0-0#` | `#0-0(0-0-Te-cohua-ni-0-0+tzin)0-0#` |
| 2460 | 598 | 613 | 19 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Chimal-paqui-ni-0-0+tzin)0-0#` | `#ti-0(0-0-Chimal-paqui-ni-0-0+tzin)0-0#` |
| 2461 | 598 | 613 | 22 | `zero-or-square-zero` | `visual-retained` | `#0-0(chan-ti-[sq0]-c-o)0+0-0#` | `#0-0(chan-ti-[sq0]-c-o)0+0-0#` |
| 2462 | 598 | 613 | 24 | `zero-or-square-zero` | `visual-retained` | `#0-0(chan-ti-[sq0]-c-o-0)0-0#` | `#0-0(chan-ti-[sq0]-c-o-0)0-0#` |
| 2463 | 598 | 613 | 26 | `uppercase,zero-or-square-zero,printed-fragment` | `visual-retained` | `#0-0(Chan-ti-[sq0]-c-o-0-0-0)0-0` | `#0-0(Chan-ti-[sq0]-c-o-0-0-0)0-0` |
| 2465 | 598 | 613 | 36 | `zero-or-square-zero` | `visual-retained` | `#0-0(m-o-tel-chiuh-0)0-0#` | `#0-0(m-o-tel-chiuh-0)0-0#` |
| 2466 | 598 | 613 | 38 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-M-o-tel-chiuh-0-0-0)0-0#` | `#ni-0(0-0-M-o-tel-chiuh-0-0-0)0-0#` |
| 2467 | 599 | 614 | 3 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-M-o-teuc-zoma-0-0-0)0-0#` | `#ni-0(0-0-M-o-teuc-zoma-0-0-0)0-0#` |
| 2468 | 599 | 614 | 11 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-M-o-ten-e-hu-a-0-0-0+tzin)0-0#` | `#ti-0(0-0-M-o-ten-e-hu-a-0-0-0+tzin)0-0#` |
| 2469 | 599 | 614 | 17 | `uppercase,zero-or-square-zero` | `corrected` | `#ti-0(0-0-Tepotz-iht-o-lo-0-c-0)0-0#` | `#ti-0(0-0-Tepotz-iht-o-Io-0-c-0)0-0#` |
| 2470 | 599 | 614 | 20 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Ah-huel-itt-o-0-c-0-tzin)0-0#` | `#0-0(0-0-Ah-huel-itt-o-0-c-0-tzin)0-0#` |
| 2471 | 599 | 614 | 28 | `uppercase` | `corrected` | `#0-0(citlal-la-tona)0+c-0#` | `#0-0(citlal-Ia-tona)0+c-0#` |
| 2472 | 599 | 614 | 30 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Citlal-la-tona-0-c-0)0-0#` | `#ti-0(0-0-Citlal-la-tona-0-c-0)0-0#` |
| 2473 | 599 | 614 | 35 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Chal-chiuh-tla-tona-0-c-0)0-0#` | `#ti-0(0-0-Chal-chiuh-tla-tona-0-c-0)0-0#` |
| 2474 | 599 | 614 | 38 | `zero-or-square-zero` | `visual-retained` | `#n-0(0-0-itz-tla-col-i-uh-0-qui-0)0-0#` | `#n-0(0-0-itz-tla-col-i-uh-0-qui-0)0-0#` |
| 2476 | 600 | 615 | 11 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-To-ch-in-0)0-0#` | `#ti-0(0-0-To-ch-in-0)0-0#` |
| 2477 | 600 | 615 | 14 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-Tlil-a-tl-0)0-0#` | `#ni-0(0-0-Tlil-a-tl-0)0-0#` |
| 2478 | 600 | 615 | 16 | `uppercase,zero-or-square-zero` | `visual-retained` | `#t-0(A-huitz-o-tl-0)0-0#` | `#t-0(A-huitz-o-tl-0)0-0#` |
| 2479 | 600 | 615 | 20 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Ma-cu-i-l-xo-chi-tl-0)0-0#` | `#0-0(0-0-Ma-cu-i-l-xo-chi-tl-0)0-0#` |
| 2480 | 600 | 615 | 23 | `uppercase,zero-or-square-zero` | `corrected` | `#ti-0(0-0-Te-poz-te-[sq0]-ca-tl-0)0-0#` | `#ti-0(0-0-Te-poz-te-O-ca-tl-0)0-0#` |
| 2481 | 600 | 615 | 25 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(Te-poz-te-[sq0]-ca)tl-0#` | `#0-0(Te-poz-te-O-ca)tl-0#` |
| 2482 | 600 | 615 | 27 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Huitz-tzil-opoch-tli-0)0-0#` | `#0-0(0-0-Huitz-tzil-opoch-tli-0)0-0#` |
| 2483 | 601 | 616 | 6 | `digit-one,uppercase,zero-or-square-zero` | `corrected` | `#ti-0(0-0-Paina-l-[sq0]-0)0-0#` | `#ti-0(0-0-Paina-1-O-0)0-0#` |
| 2484 | 601 | 616 | 10 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Eh-ca-[sq0]-0)0-0#` | `#0-0(0-0-Eh-ca-O-0)0-0#` |
| 2485 | 601 | 616 | 11 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-A-xa-yaca-[sq0]-0)0-0#` | `#0-0(0-0-A-xa-yaca-[sq0]-0)0-0#` |
| 2486 | 601 | 616 | 14 | `uppercase,zero-or-square-zero` | `corrected` | `#ti-0(0-0-Ten-tlil-[sq0]-0)0-0#` | `#ti-0(0-0-Ten-tlil-O-0)0-0#` |
| 2487 | 601 | 616 | 16 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Tiz-oc-[sq0]-0)0-0#` | `#0-0(0-0Tiz-oc-O-0)0-0#` |
| 2488 | 601 | 616 | 23 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Xip-e-[sq0]-0)0-0#` | `#0-0(0-0-Xip-e-O-0)0-0#` |
| 2489 | 601 | 616 | 28 | `uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Hueh-mac-[sq0]-0)0-0#` | `#0-0(0-0-Hueh-mac-O-0)0-0#` |
| 2490 | 602 | 617 | 8 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Xoco-tzin-0-0)0-0#` | `#ti-0(0-0-Xoco-tzin-0-0)0-0#` |
| 2491 | 602 | 617 | 16 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Yao-[sq0]-0+tzin)0-0#` | `#ti-0(0-0-Yao-[sq0]-0+tzin)0-0#` |
| 2492 | 602 | 617 | 17 | `line-break` | `corrected` | `#ti-0(0-0-Yao-tl-0)0-0#` | `#ti-0(0-0-Yao-[line-break]tl-0)0-0#` |
| 2493 | 602 | 617 | 20 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Cham-po-ch-[sq0]-0+tzin)0-0#` | `#ti-0(0-0-Cham-po-ch-[sq0]-0+tzin)0-0#` |
| 2494 | 602 | 617 | 22 | `zero-or-square-zero` | `visual-retained` | `#0-0(0-0-itz-cuauh-[sq0]-0+tzin)0-0#` | `#0-0(0-0-itz-cuauh-[sq0]-0+tzin)0-0#` |
| 2495 | 602 | 617 | 25 | `zero-or-square-zero` | `visual-retained` | `#t-0(0-0-ix-tlil-[sq0]-0+ton)0-0#` | `#t-0(0-0-ix-tlil-[sq0]-0+ton)0-0#` |
| 2497 | 602 | 617 | 30 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(T-0-i-0-tlaca-hu-an)0-0#` | `#ni-0(T-0-i-0-tlaca-hu-an)0-0#` |
| 2498 | 602 | 617 | 35 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-T-o-cih-0-0)0-0#` | `#ni-0(0-0-T-o-cih-0-0)0-0#` |
| 2499 | 602 | 617 | 39 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-T-o-tec-0-0)0-0#` | `#ni-0(0-0-T-o-tec-0-0)0-0#` |
| 2500 | 603 | 618 | 5 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-T-o-pil-tzin-0-0)0-0#` | `#ni-0(0-0-T-o-pil-tzin-0-0)0-0#` |
| 2501 | 603 | 618 | 7 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-T-o-nan-tzin-0-0)0-0#` | `#ti-0(0-0-T-o-nan-tzin-0-0)0-0#` |
| 2504 | 603 | 618 | 17 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-Coa-tl-0+0-0-i-0-cue-0-0)0-0#` | `#ni-0(0-0-Coa-tl-0+0-0-i-0-cue-0-0)0-0#` |
| 2505 | 603 | 618 | 21 | `line-break` | `corrected` | `#ni-0(0-0-Coa-cue-0-0)0-0#` | `#ni-0(0-0-Coa-cue-[line-break]0-0)0-0#` |
| 2506 | 603 | 618 | 24 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Coy-o-tl-0+0-0-i-0-nahua-l-0-0)0-0#` | `#ti-0(0-0-Coy-o-tl-0+0-0-i-0-nahua-l-0-0)0-0#` |
| 2507 | 603 | 618 | 26 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Citlal-li-0+0-0-i-0-cue-0-0)0-0#` | `#ti-0(0-0-Citlal-li-0+0-0-i-0-cue-0-0)0-0#` |
| 2508 | 603 | 618 | 28 | `uppercase,zero-or-square-zero` | `visual-retained` | `#t-0(0-0-i-0-cxi-0-0+0-0-Coa-tl-0)0-0#` | `#t-0(0-0-i-0-cxi-0-0+0-0-Coa-tl-0)0-0#` |
| 2509 | 603 | 618 | 30 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-Coz-a-hui-0-c-0+0-0-i-0-ne-chihua-l-0-0)0-0#` | `#ni-0(0-0-Coz-a-hui-0-c-0+0-0-i-0-ne-chihua-l-0-0)0-0#` |
| 2512 | 603 | 618 | 35 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Miz-tli-0+0-0-i-0-ma-0-0)0-0#` | `#ti-0(0-0-Miz-tli-0+0-0-i-0-ma-0-0)0-0#` |
| 2513 | 603 | 618 | 38 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Tloh-tli-0+0-0-i-0-ix-0-0)0-0#` | `#0-0(0-0-Tloh-tli-0+0-0-i-0-ix-0-0)0-0#` |
| 2518 | 604 | 619 | 13 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Huē-i-0-0+0-0-ozomah-tli-0)0-0#/` | `#ti-0(0-0-Huē-i-0-0+0-0-ozomah-tli-0)0-0#/` |
| 2519 | 604 | 619 | 15 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Huē-i-0-0+0-0-Ozomah-0-0+tzin)0-` | `#ti-0(0-0-Huē-i-0-0+0-0-Ozomah-0-0+tzin)0-` |
| 2520 | 604 | 619 | 19 | `uppercase,zero-or-square-zero` | `visual-retained` | `#n-0(0-0-Īztā-0-c-0+0-Coy-ō-tl-0)0-0#` | `#n-0(0-0-Īztā-0-c-0+0-Coy-ō-tl-0)0-0#` |
| 2521 | 604 | 619 | 21 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Cuāuh-tl-0-0+0-0-Ē-hua-ni-tl-0)0-0#` | `#ti-0(0-0-Cuāuh-tl-0-0+0-0-Ē-hua-ni-tl-0)0-0#` |
| 2522 | 604 | 619 | 24 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Cuāuh-tl-0+0-0-Ē-hua-ni-0-0+tzin)0-0#` | `#ti-0(0-0-Cuāuh-tl-0+0-0-Ē-hua-ni-0-0+tzin)0-0#` |
| 2523 | 604 | 619 | 26 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Tēuc-tl-0+0-0-Ē-hua-0-c-0)0-0#` | `#ti-0(0-0-Tēuc-tl-0+0-0-Ē-hua-0-c-0)0-0#` |
| 2524 | 604 | 619 | 29 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Tēuc-tl-0+0-0-Ē-hua-0-c-tzin-0-0)0-0#` | `#ti-0(0-0-Tēuc-tl-0+0-0-Ē-hua-0-c-tzin-0-0)0-0#` |
| 2525 | 604 | 619 | 32 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-Tez-ca-tl-0+0-0-Ih-pō-ca-0-0-0)0-0#` | `#ni-0(0-0-Tez-ca-tl-0+0-0-Ih-pō-ca-0-0-0)0-0#` |
| 2526 | 604 | 619 | 38 | `digit-one` | `corrected` | `#0-0+ī-0(pal)0-0#` | `#0-0+ī-0(pa1)0-0#` |
| 2527 | 604 | 619 | 38 | `line-break` | `corrected` | `#0-0(nem-o-hua)ni+0-0#` | `#0-0(nem-o-hua)ni+0-[line-break]0#` |
| 2528 | 604 | 619 | 41 | `zero-or-square-zero,printed-fragment` | `visual-retained` | `#t-0(0-0-ī-0-pal-0-0+0-0-nem-o-hua-ni)-` | `#t-0(0-0-ī-0-pal-0-0+0-0-nem-o-hua-ni)-` |
| 2529 | 605 | 620 | 3 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-T-o-pan-0-0+0-0-Tem-o-c-0)0-0#` | `#ni-0(0-0-T-o-pan-0-0+0-0-Tem-o-c-0)0-0#` |
| 2530 | 605 | 620 | 12 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-Nahui-0-0+0-0-0l-i-n-0-0-0)0-0#` | `#ni-0(0-0-Nahui-0-0+0-0-0l-i-n-0-0-0)0-0#` |
| 2531 | 605 | 620 | 14 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-Chic-ome-0-0+0-0-Coa-tl-0)0-0#` | `#ni-0(0-0-Chic-ome-0-0+0-0-Coa-tl-0)0-0#` |
| 2532 | 605 | 620 | 17 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Ma-cu-i-l-xo-chi-tl-0)0-0#` | `#0-0(0-0-Ma-cu-i-l-xo-chi-tl-0)0-0#` |
| 2533 | 605 | 620 | 19 | `zero-or-square-zero` | `visual-retained` | `#n-0(0-0-0m-a-ca-tl-0)0-0#` | `#n-0(0-0-0m-a-ca-tl-0)0-0#` |
| 2534 | 605 | 620 | 22 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Cipac-tli-0)0-0#` | `#0-0(0-0-Cipac-tli-0)0-0#` |
| 2535 | 605 | 620 | 25 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Cipac-ton-a-l-0-0)0-0#` | `#0-0(0-0-Cipac-ton-a-l-0-0)0-0#` |
| 2536 | 605 | 620 | 27 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Xo-chi-ton-a-l-0-0)0-0#` | `#0-0(0-0-Xo-chi-ton-a-l-0-0)0-0#` |
| 2537 | 605 | 620 | 30 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Ce-0-0+0-0-Coa-tl-0)0-0#` | `#0-0(0-0-Ce-0-0+0-0-Coa-tl-0)0-0#` |
| 2540 | 606 | 621 | 5 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Yohua-l-li-0)0-0#` | `#ti-0(0-0-Yohua-l-li-0)0-0#` |
| 2541 | 606 | 621 | 5 | `line-break` | `corrected` | `#t-0(0-0-Eh-eh-ca-tl-0)0-0#` | `#t-0(0-0-Eh-eh-[line-break]ca-tl-0)0-0#` |
| 2542 | 606 | 621 | 9 | `line-break` | `corrected` | `#0-0(0-0-Yohua-l-eh-eh-ca-tl-0)0-0#` | `#0-0(0-0-Yohua-1-eh-eh-ca-[line-break]tl-0)0-0#` |
| 2543 | 606 | 621 | 14 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ti-0(0-0-Tloqu-eh-0-0-0)0-0#` | `#ti-0(0-0-Tloqu-eh-0-0-0)0-0#` |
| 2544 | 606 | 621 | 14 | `line-break` | `corrected` | `#ti-0(0-0-Nahua-qu-eh-0-0-0)0-0#` | `#ti-0(0-0-Nahua-qu-eh-0-0-[line-break]0)0-0#` |
| 2545 | 606 | 621 | 22 | `uppercase,zero-or-square-zero` | `visual-retained` | `#ni-0(0-0-Teuc-xoch-0-0)0-0#` | `#ni-0(0-0-Teuc-xoch-0-0)0-0#` |
| 2546 | 606 | 621 | 30 | `line-break` | `corrected` | `#0-0(tlaca-teuc)tli-0#` | `#0-0(tlaca-teuc)tli-[line-break]0#` |
| 2547 | 606 | 621 | 34 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Chal-chiuh-tla-tona-0-c-0+tz)0-0#e` | `#0-0(0-0-Chal-chiuh-tla-tona-0-c-0+tz)0-0#e` |
| 2548 | 606 | 621 | 38 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Cuauh-tle-quetz-0-qu-0)0-0#e` | `#0-0(0-0-Cuauh-tle-quetz-0-qu-0)0-0#e` |
| 2549 | 607 | 622 | 16 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlal-o-0)c-0#` | `#0-0(tlal-o-0)c-0#` |
| 2550 | 607 | 622 | 17 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlal-o-0)qu-eh#` | `#0-0(tlal-o-0)qu-eh#` |
| 2554 | 607 | 622 | 21 | `line-break` | `corrected` | `#0-0(xi-xip-e)m-eh#` | `#0-0(xi-[line-break]xip-e)m-eh#` |
| 2556 | 607 | 622 | 23 | `line-break` | `corrected` | `#0-0(to-t-o-tec)t-in#` | `#0-0(to-[line-break]t-o-tec)t-in#` |
| 2557 | 607 | 622 | 29 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Tlal-o-0-ca-0-0+n)0-0#` | `#0-0(0-0-Tlal-o-0-ca-0-0+n)0-0#` |
| 2558 | 607 | 622 | 30 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Ma-cu-i-l-xo-chi-0-0+c)0-0#` | `#0-0(0-0-Ma-cu-i-l-xo-chi-0-0+c)0-0#` |
| 2559 | 607 | 622 | 31 | `space,uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Huitz-tzil-opoch-0-0+co)[sq0]-0#` | `#0-0(0-0-Huitz-tzil-opoch-0-0+co )[sq0]-0#` |
| 2560 | 607 | 622 | 32 | `space,uppercase,zero-or-square-zero` | `corrected` | `#0-0(0-0-Yo-pih-0-0+co)0-0#` | `#0-0(0-0-Yo-pih-0-0+co )0-0#` |
| 2561 | 607 | 622 | 33 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-T-o-tec-0-0+co)0-0#` | `#0-0(0-0-T-o-tec-0-0+co)0-0#` |
| 2562 | 607 | 622 | 34 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-T-o-cih-0-0+ti-tlan)[sq0]-0#` | `#0-0(0-0-T-o-cih-0-0+ti-tlan)[sq0]-0#` |
| 2563 | 607 | 622 | 35 | `uppercase,zero-or-square-zero` | `visual-retained` | `#0-0(0-0-Xip-e-0-0+tla-n)0-0#` | `#0-0(0-0-Xip-e-0-0+tla-n)0-0#` |
| 2565 | 614 | 629 | 20 | `line-break` | `corrected` | `#0-0+n-o(ztlac-meya)0+0-0#` | `#0-0+n-o(ztlac-[line-break]meya)0+0-0#` |
| 2568 | 614 | 629 | 34 | `line-break` | `corrected` | `#[sq0]-0+n-o(mati)0+0-0#` | `#[sq0]-0+n-[line-break]o(mati)0+0-0#` |
| 2570 | 618 | 633 | 8 | `space` | `corrected` | `#0-0+tla(choqui-z-tl-e-hu-a)0+0-h#` | `#0-0+tla( choqui-z-tl-e-hu-a)0+0-h#` |
| 2575 | 618 | 633 | 37 | `zero-or-square-zero` | `visual-retained` | `#0-0+qu-im(mic-0-t-o-0-c-cahua)0+0-h#` | `#0-0+qu-im(mic-0-t-o-0-c-cahua)0+0-h#` |
| 2576 | 618 | 633 | 39 | `zero-or-square-zero` | `visual-retained` | `#0-0+qui-0(petz-0-t-o-0-c-cauh)0+qu-eh#` | `#0-0+qui-0(petz-0-t-o-0-c-cauh)0+qu-eh#` |
| 2577 | 619 | 634 | 7 | `zero-or-square-zero` | `visual-retained` | `#ni-0+qu-im(pol-i-uh-0-ti-tlaza)z+0-0#` | `#ni-0+qu-im(pol-i-uh-0-ti-tlaza)z+0-0#` |
| 2588 | 623 | 638 | 32 | `zero-or-square-zero` | `visual-retained` | `#0-0(quimich-patl-a-n-0)0-0#` | `#0-0(quimich-patl-a-n-0)0-0#` |
| 2589 | 623 | 638 | 34 | `zero-or-square-zero` | `visual-retained` | `#0-0(tlal-ol-i-n-0)0-0#` | `#0-0(tlal-ol-i-n-0)0-0#` |
| 2595 | 648 | 663 | 17 | `punctuation,space` | `visual-retained` | `(1 + (5 + 5)) + 2` | `(1 + (5 + 5)) + 2` |
| 2596 | 648 | 663 | 17 | `punctuation,space` | `visual-retained` | `(2 + (5 + 5)) + 1` | `(2 + (5 + 5)) + 1` |
| 2597 | 648 | 663 | 17 | `space` | `visual-retained` | `(5 + 5) + 3` | `(5 + 5) + 3` |
| 2598 | 648 | 663 | 17 | `space` | `visual-retained` | `3 + (5 + 5)` | `3 + (5 + 5)` |
| 2599 | 648 | 663 | 17 | `space` | `visual-retained` | `4 + (5 + 4)` | `4 + (5 + 4)` |
| 2600 | 649 | 664 | 18 | `punctuation,space` | `visual-retained` | `(2 + (4 + 4)) + 3` | `(2 + (4 + 4)) + 3` |
| 2601 | 649 | 664 | 18 | `punctuation,space` | `visual-retained` | `(3 + (4 + 4)) + 2` | `(3 + (4 + 4)) + 2` |
| 2602 | 649 | 664 | 18 | `space` | `visual-retained` | `(4 + 4 + 4) + 1` | `(4 + 4 + 4) + 1` |
| 2603 | 649 | 664 | 18 | `space` | `visual-retained` | `1 + (4 + 4 + 4)` | `1 + (4 + 4 + 4)` |
