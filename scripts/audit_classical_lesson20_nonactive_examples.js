#!/usr/bin/env node
"use strict";

const path = require("path");
const { createModuleRuntime } = require("./lib/module_runtime");

const ROOT = path.resolve(__dirname, "..");

function requireLesson20Runtime(runtime) {
    if (!runtime || typeof runtime.getClassicalNahuatlLesson20NonactiveStemOptions !== "function") {
        throw new TypeError("Lesson 20 audits require the canonical ESM runtime context.");
    }
    return runtime;
}

const LESSON20_VISUAL_PDF_WITNESS = Object.freeze({
    sourceDocument: "Andrews_Introduction_to_Classical_Nahuatl_693p_reOCR_squareZeroFixed.pdf",
    pdfPages: Object.freeze([175, 176, 177, 178, 179]),
    printedPages: Object.freeze([160, 161, 162, 163, 164]),
    verificationMode: "visual-render-review",
});

const VISUALLY_REJECTED_LESSON20_OCR_FORMS = Object.freeze(new Set([
    "pa-tla-lo",
    "ce-li-lō",
    "ihcuani-lō",
    "pac-ō",
    "tīamic-ō",
    "choc-o-hua",
    "huā-c-ō-hua",
    "teci-hua",
    "tzahtzi-hua",
    "tequi-ti-hua",
    "i-hua",
    "āyi-hua",
    "ihcali-hua",
    "pano-lō",
]));

// These are the Lesson 20 spellings whose macrons or segment boundaries were
// verified directly on the rendered PDF.  Regular formations must come from a
// productive route; only Andrews' lexical/suppletive cases may come from an
// exact exception gate.
const VISUALLY_CONFIRMED_LESSON20_RULE_CASES = Object.freeze([
    { sourceStem: "yōco-ya", verbClass: "B", sourceValence: "specific-projective", expected: ["yōco-lō"], primary: "yōco-lō", authority: "productive", ruleId: "cn-l20-2-class-b-root-plus-ya-deletion", vowelLengthRuleId: "cn-l20-2-class-b-preserve-root-vowel-length" },
    { sourceStem: "ce-liā", verbClass: "C", sourceValence: "specific-projective", expected: ["ce-lī-lō"], primary: "ce-lī-lō", authority: "productive", ruleId: "cn-l20-2-class-c-final-i-lengthening", vowelLengthRuleId: "cn-l20-2-class-c-final-i-lengthening" },
    { sourceStem: "ihcuani-ā", verbClass: "C", sourceValence: "specific-projective", expected: ["ihcuanī-lō", "ihcuanī-hua"], primary: "ihcuanī-lō", authority: "productive", ruleId: "cn-l20-2-class-c-final-i-lengthening", vowelLengthRuleId: "cn-l20-2-class-c-final-i-lengthening" },
    { sourceStem: "huī-tz", verbClass: "A", sourceValence: "intransitive", expected: ["huī-lo-hua-tz"], primary: "huī-lo-hua-tz", authority: "exact-exception", ruleId: "cn-l20-3-huitz", vowelLengthRuleId: "cn-l20-3-huitz-preserve-source-long-i" },
    { sourceStem: "pāca", verbClass: "B", sourceValence: "specific-projective", expected: ["pāc-ō"], primary: "pāc-ō", authority: "productive", ruleId: "cn-l20-4-final-ka" },
    { sourceStem: "tiāmiqui", verbClass: "A", sourceValence: "intransitive", expected: ["tiāmic-ō"], primary: "tiāmic-ō", authority: "exact-exception", ruleId: "cn-l20-5-tiamique-exception", vowelLengthRuleId: "cn-l20-5-tiamiqui-preserve-source-long-a" },
    { sourceStem: "choca", verbClass: "B", sourceValence: "intransitive", expected: ["chōc-o-hua"], primary: "chōc-o-hua", authority: "exact-exception", ruleId: "cn-l20-5-choca", vowelLengthRuleId: "cn-l20-5-choca-lexical-o-lengthening" },
    { sourceStem: "huā-qui", verbClass: "B", sourceValence: "intransitive", expected: ["huā-c-o-hua"], primary: "huā-c-o-hua", authority: "productive", ruleId: "cn-l20-5-intransitive-final-qui" },
    { sourceStem: "teci", verbClass: "B", sourceValence: "intransitive", expected: ["tecī-hua"], primary: "tecī-hua", authority: "exact-exception", ruleId: "cn-l20-5-teci", vowelLengthRuleId: "cn-l20-5-teci-lexical-final-i-lengthening" },
    { sourceStem: "tzahtzi", verbClass: "B", sourceValence: "intransitive", expected: ["tzahtzī-hua"], primary: "tzahtzī-hua", authority: "exact-exception", ruleId: "cn-l20-5-tzahtzi", vowelLengthRuleId: "cn-l20-5-tzahtzi-lexical-final-i-lengthening" },
    { sourceStem: "tequi-ti", verbClass: "B", sourceValence: "intransitive", expected: ["tequi-tī-hua"], primary: "tequi-tī-hua", authority: "productive", ruleId: "cn-l20-6-final-i-o", vowelLengthRuleId: "cn-l20-6-short-final-i-lengthening-before-hua" },
    { sourceStem: "ī", verbClass: "B", sourceValence: "specific-projective", expected: ["ī-hua"], primary: "ī-hua", authority: "productive", ruleId: "cn-l20-6-final-i-o", vowelLengthRuleId: "cn-l20-6-preserve-final-long-i-or-o-before-hua" },
    { sourceStem: "āyi", verbClass: "B", sourceValence: "specific-projective", expected: ["āyī-hua"], primary: "āyī-hua", authority: "productive", ruleId: "cn-l20-6-final-i-o", vowelLengthRuleId: "cn-l20-6-short-final-i-lengthening-before-hua" },
    { sourceStem: "ihcali", verbClass: "B", sourceValence: "specific-projective", expected: ["ihcalī-hua", "ihcali-lō"], primary: "ihcalī-hua", authority: "productive", ruleId: "cn-l20-6-final-i-o", vowelLengthRuleId: "cn-l20-6-short-final-i-lengthening-before-hua" },
    { sourceStem: "panō", verbClass: "B", sourceValence: "intransitive", expected: ["panō-hua", "panō-lō"], primary: "panō-hua", authority: "productive", ruleId: "cn-l20-6-final-i-o", vowelLengthRuleId: "cn-l20-6-preserve-final-long-i-or-o-before-hua" },
]);

// Every explicit source/result obligation in Andrews §§20.2-20.7, consolidated
// by active source analysis. Later-lesson supplements are deliberately excluded
// from the equality check by their andrewsSection metadata; they may add options
// without weakening this Lesson 20 gate.
const LESSON20_NONACTIVE_EXAMPLES = Object.freeze([
    // §20.2 lō
    { section: "20.2", sourceStem: "chihcha", verbClass: "A", sourceValence: "intransitive", expected: ["chihcha-lō"] },
    { section: "20.2", sourceStem: "pā-tz-ca", verbClass: "A", sourceValence: "specific-projective", expected: ["pā-tz-ca-lō"] },
    { section: "20.2", sourceStem: "pa-tla", verbClass: "A", sourceValence: "specific-projective", expected: ["pa-tla-lō"] },
    { section: "20.2", sourceStem: "mōtla", verbClass: "A", sourceValence: "specific-projective", expected: ["mōtla-lō"] },
    { section: "20.2", sourceStem: "mayāna", verbClass: "B", sourceValence: "intransitive", expected: ["mayāna-lō"] },
    { section: "20.2", sourceStem: "pitza", verbClass: "B", sourceValence: "specific-projective", expected: ["pitza-lō"] },
    { section: "20.2", sourceStem: "quetza", verbClass: "B", sourceValence: "specific-projective", expected: ["quetza-lō"] },
    { section: "20.2", sourceStem: "pōhu-a", verbClass: "B", sourceValence: "specific-projective", expected: ["pōhu-a-lō"] },
    { section: "20.2", sourceStem: "chihua", verbClass: "B", sourceValence: "specific-projective", expected: ["chīhua-lō"] },
    { section: "20.2", sourceStem: "piya", verbClass: "B", sourceValence: "specific-projective", expected: ["piya-lō"] },
    { section: "20.2", sourceStem: "tla-chiya", verbClass: "B", sourceValence: "specific-projective", expected: ["tla-chiya-lō"] },
    { section: "20.2", sourceStem: "coco-ya", verbClass: "B", sourceValence: "intransitive", expected: ["coco-lō"] },
    { section: "20.2", sourceStem: "yōco-ya", verbClass: "B", sourceValence: "specific-projective", expected: ["yōco-lō"] },
    { section: "20.2", sourceStem: "chol-o-ā", verbClass: "C", sourceValence: "intransitive", expected: ["chol-ō-lō"] },
    { section: "20.2", sourceStem: "pa-t-o-ā", verbClass: "C", sourceValence: "intransitive", expected: ["pa-t-ō-lō"] },
    { section: "20.2", sourceStem: "pol-o-ā", verbClass: "C", sourceValence: "specific-projective", expected: ["pol-ō-lō"] },
    { section: "20.2", sourceStem: "iht-o-ā", verbClass: "C", sourceValence: "specific-projective", expected: ["iht-ō-lō"] },
    { section: "20.2", sourceStem: "ce-liā", verbClass: "C", sourceValence: "specific-projective", expected: ["ce-lī-lō"] },
    { section: "20.2", sourceStem: "ihcuani-ā", verbClass: "C", sourceValence: "specific-projective", expected: ["ihcuanī-lō", "ihcuanī-hua"] },
    { section: "20.2", sourceStem: "tla-ti-ā", verbClass: "C", sourceValence: "specific-projective", expected: ["tla-ti-lō"] },
    { section: "20.2", sourceStem: "icn-ēl-iā", verbClass: "C", sourceValence: "specific-projective", expected: ["icn-ēl-i-lō"] },
    { section: "20.2", sourceStem: "tlā-ti-ā", verbClass: "C", sourceValence: "specific-projective", expected: ["tlā-ti-lō"] },
    { section: "20.2", sourceStem: "mā", verbClass: "D", sourceValence: "specific-projective", expected: ["ma-lō"] },
    { section: "20.2", sourceStem: "māmā", verbClass: "D", sourceValence: "specific-projective", expected: ["māma-lō"] },

    // §20.3 lo-hua
    { section: "20.3", sourceStem: "ca-h", verbClass: "A", sourceValence: "intransitive", expected: ["ye-lo-hua"] },
    { section: "20.3", sourceStem: "ya-uh", verbClass: "B", sourceValence: "intransitive", expected: ["hui-lo-hua"] },
    { section: "20.3", sourceStem: "huāl-la-uh", verbClass: "B", sourceValence: "intransitive", expected: ["huāl-hui-lo-hua"] },
    { section: "20.3", sourceStem: "huī-tz", verbClass: "A", sourceValence: "intransitive", expected: ["huī-lo-hua-tz"] },
    { section: "20.3", sourceStem: "itqui-tz", verbClass: "A", sourceValence: "specific-projective", expected: ["itqui-lo-hua-tz"] },
    { section: "20.3", sourceStem: "huica-tz", verbClass: "A", sourceValence: "specific-projective", expected: ["huica-lo-hua-tz", "huīc-o-hua-tz"] },

    // §20.4 ō, including Andrews-licensed alternatives from §§20.6-20.7.
    { section: "20.4", sourceStem: "pāca", verbClass: "B", sourceValence: "specific-projective", expected: ["pāc-ō"] },
    { section: "20.4", sourceStem: "toca", verbClass: "B", sourceValence: "specific-projective", expected: ["toc-ō"] },
    { section: "20.4", sourceStem: "tōcā", verbClass: "B", sourceValence: "specific-projective", expected: ["tōc-ō"] },
    { section: "20.4", sourceStem: "tequi", verbClass: "B", sourceValence: "specific-projective", expected: ["tec-ō"] },
    { section: "20.4", sourceStem: "caqui", verbClass: "B", sourceValence: "specific-projective", expected: ["cac-ō"] },
    { section: "20.4", sourceStem: "nequi", verbClass: "B", sourceValence: "specific-projective", expected: ["nec-ō"] },
    { section: "20.4", sourceStem: "itqui", verbClass: "B", sourceValence: "specific-projective", expected: ["itc-ō", "itquī-hua"] },
    { section: "20.4", sourceStem: "āna", verbClass: "B", sourceValence: "specific-projective", expected: ["ān-ō", "āna-lō"] },
    { section: "20.4", sourceStem: "peh-pena", verbClass: "B", sourceValence: "specific-projective", expected: ["peh-pen-ō", "peh-pena-lō"] },
    { section: "20.4", sourceStem: "tītlani", verbClass: "B", sourceValence: "specific-projective", expected: ["tītlan-ō", "tītlani-lō"] },
    { section: "20.4", sourceStem: "ih-tlani", verbClass: "B", sourceValence: "specific-projective", expected: ["ih-tlan-ō", "ih-tlani-lō"] },
    { section: "20.4", sourceStem: "tlāza", verbClass: "B", sourceValence: "specific-projective", expected: ["tlāx-ō", "tlāza-lō"] },
    { section: "20.4", sourceStem: "icza", verbClass: "B", sourceValence: "specific-projective", expected: ["icx-ō", "icza-lō"] },
    { section: "20.4", sourceStem: "imacaci", verbClass: "B", sourceValence: "specific-projective", expected: ["imacax-ō"] },
    { section: "20.4", sourceStem: "ihnecui", verbClass: "B", sourceValence: "specific-projective", expected: ["ihnec-ō", "ihnecu-ō"] },
    { section: "20.4", sourceStem: "itta", verbClass: "B", sourceValence: "specific-projective", expected: ["itt-ō", "itta-lō"] },
    { section: "20.4", sourceStem: "mati", verbClass: "B", sourceValence: "specific-projective", expected: ["mach-ō"] },
    { section: "20.4", sourceStem: "hue-tz-ca", verbClass: "A", sourceValence: "intransitive", expected: ["hue-tz-c-ō"] },
    { section: "20.4", sourceStem: "cuīca", verbClass: "A", sourceValence: "intransitive", expected: ["cuic-ō"] },
    { section: "20.4", sourceStem: "tiāmiqui", verbClass: "A", sourceValence: "intransitive", expected: ["tiāmic-ō"] },
    { section: "20.4", sourceStem: "ilō-ti", verbClass: "A", sourceValence: "intransitive", expected: ["īlō-ch-ō"] },

    // §§20.5-20.7 o-hua, hua, and hua-lō.
    { section: "20.5", sourceStem: "choca", verbClass: "B", sourceValence: "intransitive", expected: ["chōc-o-hua"] },
    { section: "20.5", sourceStem: "ihca", verbClass: "B", sourceValence: "intransitive", expected: ["ihc-o-hua"] },
    { section: "20.5", sourceStem: "miqui", verbClass: "B", sourceValence: "intransitive", expected: ["mic-o-hua"] },
    { section: "20.5", sourceStem: "huā-qui", verbClass: "B", sourceValence: "intransitive", expected: ["huā-c-o-hua"] },
    { section: "20.5", sourceStem: "nemi", verbClass: "B", sourceValence: "intransitive", expected: ["nem-o-hua"] },
    { section: "20.5", sourceStem: "quīza", verbClass: "B", sourceValence: "intransitive", expected: ["quīx-o-hua"] },
    { section: "20.5", sourceStem: "ihza", verbClass: "B", sourceValence: "intransitive", expected: ["ihx-o-hua"] },
    { section: "20.5", sourceStem: "nēci", verbClass: "B", sourceValence: "intransitive", expected: ["nēx-o-hua"] },
    { section: "20.5", sourceStem: "huetzi", verbClass: "B", sourceValence: "intransitive", expected: ["huech-o-hua"] },
    { section: "20.5", sourceStem: "ē-hua", verbClass: "B", sourceValence: "intransitive", expected: ["ē-ō-hua"] },
    { section: "20.5", sourceStem: "teo-hci-hui", verbClass: "B", sourceValence: "intransitive", expected: ["teo-hci-ō-hua"] },
    { section: "20.5", sourceStem: "ciya-hui", verbClass: "B", sourceValence: "intransitive", expected: ["ciya-ō-hua"] },
    { section: "20.5", sourceStem: "tēmi", verbClass: "B", sourceValence: "intransitive", expected: ["tēmī-hua"] },
    { section: "20.5", sourceStem: "teci", verbClass: "B", sourceValence: "intransitive", expected: ["tecī-hua"] },
    { section: "20.5", sourceStem: "ahci", verbClass: "B", sourceValence: "intransitive", expected: ["ahxī-hua"] },
    { section: "20.5", sourceStem: "tzahtzi", verbClass: "B", sourceValence: "intransitive", expected: ["tzahtzī-hua"] },
    { section: "20.5", sourceStem: "pīn-ā-hua", verbClass: "B", sourceValence: "intransitive", expected: ["pīn-ā-hua-lō"] },
    { section: "20.5", sourceStem: "mani", verbClass: "B", sourceValence: "intransitive", expected: ["man-o-hua", "mani-hua"] },
    { section: "20.5", sourceStem: "mamali", verbClass: "B", sourceValence: "specific-projective", expected: ["mamali-o-hua", "mamalī-hua-lō"] },
    { section: "20.6", sourceStem: "yōli", verbClass: "B", sourceValence: "intransitive", expected: ["yōli-hua"] },
    { section: "20.6", sourceStem: "cochi", verbClass: "B", sourceValence: "intransitive", expected: ["cochī-hua"] },
    { section: "20.6", sourceStem: "tequi-ti", verbClass: "B", sourceValence: "intransitive", expected: ["tequi-tī-hua"] },
    { section: "20.6", sourceStem: "ī", verbClass: "B", sourceValence: "specific-projective", expected: ["ī-hua"] },
    { section: "20.6", sourceStem: "pī", verbClass: "B", sourceValence: "specific-projective", expected: ["pī-hua"] },
    { section: "20.6", sourceStem: "cui", verbClass: "B", sourceValence: "specific-projective", expected: ["cuī-hua", "cui-hua-lō"] },
    { section: "20.6", sourceStem: "āyi", verbClass: "B", sourceValence: "specific-projective", expected: ["āyī-hua"] },
    { section: "20.6", sourceStem: "quēmi", verbClass: "B", sourceValence: "specific-projective", expected: ["quēmī-hua"] },
    { section: "20.6", sourceStem: "ihcali", verbClass: "B", sourceValence: "specific-projective", expected: ["ihcalī-hua", "ihcali-lō"] },
    { section: "20.6", sourceStem: "on-o", verbClass: "B", sourceValence: "intransitive", expected: ["on-o-hua"] },
    { section: "20.6", sourceStem: "temō", verbClass: "B", sourceValence: "intransitive", expected: ["temō-hua"] },
    // Visually verified against Andrews PDF p. 164; OCR had dropped both macrons in the alternate.
    { section: "20.6", sourceStem: "panō", verbClass: "B", sourceValence: "intransitive", expected: ["panō-hua", "panō-lō"] },
    { section: "20.6", sourceStem: "tlehcō", verbClass: "B", sourceValence: "intransitive", expected: ["tlehcō-hua"] },
    { section: "20.6", sourceStem: "zō", verbClass: "B", sourceValence: "specific-projective", expected: ["zō-hua", "zō-lō"] },
]);

// Later Canvas lessons sometimes presuppose or explicitly write a different
// nonactive base for a causative, passive/patientive, or impersonal formation.
// These are not allowed to rewrite Lesson 20's default.  They are a separate,
// engine-owned optional inventory under the user's "more the merrier" policy.
const CROSS_LESSON_NONACTIVE_SUPPLEMENT_EXAMPLES = Object.freeze([
    { section: "25.2/25.4", sourceStem: "caqui", verbClass: "B", sourceValence: "specific-projective", expected: ["caqui-hua", "caqui-lō"] },
    { section: "38.1.3.c", sourceStem: "cāhui", verbClass: "B", sourceValence: "intransitive", expected: ["cāhui-hua"] },
    { section: "38.1.1.a", sourceStem: "cē-hua", verbClass: "A", sourceValence: "intransitive", expected: ["cē-hua-lō"] },
    { section: "38.1.1.c", sourceStem: "chihcha", verbClass: "A", sourceValence: "intransitive", expected: ["chihchi-hua"] },
    { section: "38.1.1.d", sourceStem: "chīchi", verbClass: "B", sourceValence: "intransitive", expected: ["chīchi-hua-lō"] },
    { section: "25.2/25.4", sourceStem: "chōca", verbClass: "B", sourceValence: "intransitive", expected: ["chōquī-hua", "chōca-lō", "chōqui-lō"] },
    { section: "25.4", sourceStem: "cual-ā-ni", verbClass: "B", sourceValence: "intransitive", expected: ["cual-ā-ni-lō", "cual-ā-na-lō"] },
    { section: "38.1.4", sourceStem: "huica", verbClass: "B", sourceValence: "specific-projective", expected: ["huica-lō"] },
    { section: "38.1.3.a", sourceStem: "ī", verbClass: "B", sourceValence: "specific-projective", expected: ["ī-lō"] },
    { section: "37.9.1.c", sourceStem: "icza", verbClass: "B", sourceValence: "specific-projective", expected: ["icxi-hua"] },
    { section: "38.1.3.c", sourceStem: "ichcua", verbClass: "B", sourceValence: "specific-projective", expected: ["ichcui-hua"] },
    { section: "38.1.1.a", sourceStem: "ihyā-ya", verbClass: "B", sourceValence: "intransitive", expected: ["ihye-lō"] },
    { section: "25.2/25.4", sourceStem: "ihza", verbClass: "B", sourceValence: "intransitive", expected: ["ihxi-hua", "ihxi-lō"] },
    { section: "25.4", sourceStem: "imacaci", verbClass: "B", sourceValence: "specific-projective", expected: ["imacaxi-lō"] },
    { section: "25.2", sourceStem: "iuc-ci", verbClass: "B", sourceValence: "intransitive", expected: ["iuc-xi-hua"] },
    { section: "25.2/25.4/36.5", sourceStem: "itta", verbClass: "B", sourceValence: "specific-projective", expected: ["itt-ī-hua", "itz-ti-lō", "it-hu-a-lō"] },
    { section: "38.1.3.c", sourceStem: "it-hu-a", verbClass: "B", sourceValence: "specific-projective", expected: ["it-hui-hua"] },
    { section: "38.1.3.c", sourceStem: "ixca", verbClass: "A", sourceValence: "specific-projective", expected: ["ixqui-hua", "ixca-lō"] },
    { section: "25.4", sourceStem: "ix-tlā-hu-a", verbClass: "B", sourceValence: "specific-projective", expected: ["ix-tlā-hu-i-lō"] },
    { section: "25.3", sourceStem: "mahui", verbClass: "B", sourceValence: "intransitive", expected: ["mahu-o-hua"] },
    { section: "25.4", sourceStem: "maca", verbClass: "B", sourceValence: "specific-projective", expected: ["maqui-lō"] },
    { section: "36.6", sourceStem: "mamali", verbClass: "B", sourceValence: "specific-projective", expected: ["mamalī-hua"] },
    { section: "25.2/25.4", sourceStem: "mati", verbClass: "B", sourceValence: "specific-projective", expected: ["machi-hua", "machi-lō"] },
    { section: "37.9.1.c", sourceStem: "moh-mōtla", verbClass: "B", sourceValence: "specific-projective", expected: ["moh-mōchī-hua"] },
    { section: "25.2", sourceStem: "nēci", verbClass: "B", sourceValence: "intransitive", expected: ["nēxi-hua"] },
    { section: "37.9.1.c", sourceStem: "ohza", verbClass: "B", sourceValence: "specific-projective", expected: ["ohxi-hua"] },
    { section: "38.1.3.a", sourceStem: "ō-ya", verbClass: "B", sourceValence: "specific-projective", expected: ["ō-ya-lō"] },
    { section: "25.6", sourceStem: "on-o", verbClass: "B", sourceValence: "intransitive", expected: ["on-o-lō"] },
    { section: "25.6", sourceStem: "panō", verbClass: "B", sourceValence: "intransitive", expected: ["panō-lō"] },
    { section: "38.1.3.c", sourceStem: "pā-tz-ca", verbClass: "A", sourceValence: "specific-projective", expected: ["pā-tz-qui-hua"] },
    { section: "37.9.1.a", sourceStem: "piya", verbClass: "B", sourceValence: "specific-projective", expected: ["piye-lō"] },
    { section: "38.1.1.c", sourceStem: "pix-ca", verbClass: "A", sourceValence: "intransitive", expected: ["pix-qui-hua"] },
    { section: "25.3/25.4", sourceStem: "quēmi", verbClass: "B", sourceValence: "specific-projective", expected: ["quēm-o-hua", "quēmi-lō"] },
    { section: "37.9.1.b", sourceStem: "quetza", verbClass: "B", sourceValence: "specific-projective", expected: ["quech-ō"] },
    { section: "38.1.1.b", sourceStem: "tlacō-ti", verbClass: "A", sourceValence: "intransitive", expected: ["tlacō-ch-ō"] },
    { section: "25.6", sourceStem: "tlehcō", verbClass: "B", sourceValence: "intransitive", expected: ["tlehcō-lō"] },
    { section: "25.4", sourceStem: "tzacu-a", verbClass: "B", sourceValence: "specific-projective", expected: ["tzacu-i-lō"] },
    { section: "38.1.1.a", sourceStem: "tzāhua", verbClass: "A", sourceValence: "intransitive", expected: ["tzāhua-lō"] },
    { section: "38.1.1.c", sourceStem: "xō-tla", verbClass: "A", sourceValence: "intransitive", expected: ["xō-chī-hua"] },
    { section: "38.1.1.a", sourceStem: "yohua", verbClass: "A", sourceValence: "intransitive", expected: ["yohua-lō"], soleAuthorizedFormation: true },
]);

const ADDITIONAL_PRODUCTIVE_CANVAS_EXAMPLES = Object.freeze([
    { section: "24.2", sourceStem: "teci", verbClass: "B", sourceValence: "intransitive", expected: ["tecī-hua"], selectorRequired: false },
    { section: "24.2", sourceStem: "teci", verbClass: "B", sourceValence: "specific-projective", expected: ["tex-ō", "tex-o-hua"], selectorRequired: true },
    { section: "25.4.8", sourceStem: "tlaōco-ya", verbClass: "B", sourceValence: "intransitive", expected: ["tlaōco-lō"], selectorRequired: false },
    { section: "25.4.8", sourceStem: "āhui-ya", verbClass: "B", sourceValence: "intransitive", expected: ["āhui-lō", "āhui-ya-lō"], selectorRequired: true },
    { section: "25.4.5", sourceStem: "ix-tlā-hu-a", verbClass: "B", sourceValence: "specific-projective", expected: ["ix-tlā-hu-a-lō", "ix-tlā-hu-i-lō"], selectorRequired: true },
    { section: "27.4.1", sourceStem: "chi-chin-a-ca", verbClass: "A", sourceValence: "intransitive", expected: ["chi-chin-a-c-o-hua", "chi-chin-a-c-ō"], selectorRequired: true },
    { section: "25.4", sourceStem: "cuā", verbClass: "D", sourceValence: "specific-projective", expected: ["cua-lō"], selectorRequired: false },
]);

// Synthetic stems are intentionally absent from every lexical witness table.
// They prove that the engine executes Andrews' ending/class/valence rules
// instead of recognizing only the examples transcribed from the Canvas.
const UNLISTED_PRODUCTIVE_SHAPE_EXAMPLES = Object.freeze([
    { shape: "final-a-lō", sourceStem: "pala", verbClass: "B", sourceValence: "specific-projective", expected: ["pala-lō"], families: ["lō"] },
    { shape: "class-b-root-plus-ya", sourceStem: "mela-ya", verbClass: "B", sourceValence: "intransitive", expected: ["mela-lō"], families: ["lō"] },
    { shape: "class-c-o-a", sourceStem: "nem-o-ā", verbClass: "C", sourceValence: "intransitive", expected: ["nem-ō-lō"], families: ["lō"] },
    { shape: "class-d-reduced-long-a", sourceStem: "nā", verbClass: "D", sourceValence: "specific-projective", expected: ["na-lō"], families: ["lō"] },
    { shape: "transitive-final-ka", sourceStem: "xaka", verbClass: "B", sourceValence: "specific-projective", expected: ["xak-ō"], families: ["ō"] },
    { shape: "transitive-final-ki", sourceStem: "neki", verbClass: "B", sourceValence: "specific-projective", expected: ["nek-ō"], families: ["ō"] },
    { shape: "transitive-final-na", sourceStem: "pona", verbClass: "B", sourceValence: "specific-projective", expected: ["pon-ō", "pona-lō"], families: ["ō", "lō"] },
    { shape: "transitive-final-ni", sourceStem: "pani", verbClass: "B", sourceValence: "specific-projective", expected: ["pan-ō", "pani-lō"], families: ["ō", "lō"] },
    { shape: "transitive-final-sa", sourceStem: "pasa", verbClass: "B", sourceValence: "specific-projective", expected: ["pax-ō", "pasa-lō"], families: ["ō", "lō"] },
    { shape: "transitive-final-si", sourceStem: "pasi", verbClass: "B", sourceValence: "specific-projective", expected: ["pax-ō"], families: ["ō"] },
    { shape: "transitive-final-cui", sourceStem: "xocui", verbClass: "B", sourceValence: "specific-projective", expected: ["xoc-ō"], families: ["ō"] },
    { shape: "transitive-final-ta", sourceStem: "palata", verbClass: "B", sourceValence: "specific-projective", expected: ["palat-ō"], families: ["ō"] },
    { shape: "transitive-postvocalic-ti", sourceStem: "meloti", verbClass: "B", sourceValence: "specific-projective", expected: ["meloch-ō"], families: ["ō"] },
    { shape: "intransitive-final-ka", sourceStem: "teka", verbClass: "B", sourceValence: "intransitive", expected: ["tek-o-hua"], families: ["o-hua"] },
    { shape: "intransitive-final-ki", sourceStem: "miki", verbClass: "B", sourceValence: "intransitive", expected: ["mik-o-hua"], families: ["o-hua"] },
    { shape: "intransitive-final-mi", sourceStem: "tami", verbClass: "B", sourceValence: "intransitive", expected: ["tam-o-hua"], families: ["o-hua"] },
    { shape: "intransitive-final-sa", sourceStem: "pasa", verbClass: "B", sourceValence: "intransitive", expected: ["pax-o-hua"], families: ["o-hua"] },
    { shape: "intransitive-final-si", sourceStem: "pasi", verbClass: "B", sourceValence: "intransitive", expected: ["pax-o-hua"], families: ["o-hua"] },
    { shape: "intransitive-final-tzi", sourceStem: "patzi", verbClass: "B", sourceValence: "intransitive", expected: ["pach-o-hua"], families: ["o-hua"] },
    { shape: "intransitive-final-wa", sourceStem: "pewa", verbClass: "B", sourceValence: "intransitive", expected: ["peō-hua"], families: ["o-hua"] },
    { shape: "intransitive-final-wi", sourceStem: "pewi", verbClass: "B", sourceValence: "intransitive", expected: ["peō-hua"], families: ["o-hua"] },
    { shape: "intransitive-final-ni-possibility", sourceStem: "palani", verbClass: "B", sourceValence: "intransitive", expected: ["palanī-hua", "palan-o-hua"], families: ["hua", "o-hua"] },
    { shape: "intransitive-postvocalic-ti", sourceStem: "pa-ti", verbClass: "B", sourceValence: "intransitive", expected: ["pa-tī-hua", "pa-ch-ō"], families: ["hua", "ō"] },
    { shape: "final-o-hua", sourceStem: "pō", verbClass: "B", sourceValence: "intransitive", expected: ["pō-hua"], families: ["hua"] },
]);

// This is a decision-category matrix, not a lexical list. It covers every
// productive route above plus the remaining final-vowel categories, both
// boundary states, all four verbstem classes, licensed e-final identities,
// unsupported e-final shapes, and consonant-final licensed/unlicensed cells.
const NONACTIVE_CANDIDATE_LATTICE_MATRIX_CASES = Object.freeze([
    ...UNLISTED_PRODUCTIVE_SHAPE_EXAMPLES.map((example) => Object.freeze({
        cellId: `productive:${example.shape}`,
        ...example,
        expectedResolution: example.expected.length > 1 ? "selectable-alternatives" : "determinate",
        expectedIdentityResolution: "shape-only-unlisted-identity",
    })),
    Object.freeze({ cellId: "class-a:general-final-a", sourceStem: "cala", verbClass: "A", sourceValence: "intransitive", expected: ["cala-lō"], expectedResolution: "determinate", expectedIdentityResolution: "shape-only-unlisted-identity" }),
    Object.freeze({ cellId: "class-c:final-ia", sourceStem: "meliā", verbClass: "C", sourceValence: "specific-projective", expected: ["meli-lō"], expectedResolution: "determinate", expectedIdentityResolution: "shape-only-unlisted-identity" }),
    Object.freeze({ cellId: "general:final-i", sourceStem: "xochi", verbClass: "B", sourceValence: "specific-projective", expected: ["xochī-hua"], expectedResolution: "determinate", expectedIdentityResolution: "shape-only-unlisted-identity" }),
    Object.freeze({ cellId: "general:final-long-i", sourceStem: "pēpī", verbClass: "B", sourceValence: "specific-projective", expected: ["pēpī-hua"], expectedResolution: "determinate", expectedIdentityResolution: "shape-only-unlisted-identity" }),
    Object.freeze({ cellId: "general:final-short-o", sourceStem: "palo", verbClass: "B", sourceValence: "intransitive", expected: ["palo-hua"], expectedResolution: "determinate", expectedIdentityResolution: "shape-only-unlisted-identity" }),
    Object.freeze({ cellId: "identity:chiye", sourceStem: "chiye", verbClass: "B", sourceValence: "specific-projective", expected: ["chiye-lō"], expectedResolution: "determinate", expectedIdentityResolution: "licensed-active-identity" }),
    Object.freeze({ cellId: "identity:piye", sourceStem: "piye", verbClass: "B", sourceValence: "specific-projective", expected: ["piye-lō"], expectedResolution: "determinate", expectedIdentityResolution: "licensed-active-identity" }),
    Object.freeze({ cellId: "identity:meme-unresolved", sourceStem: "mēmē", verbClass: "D", sourceValence: "specific-projective", expected: [], expectedResolution: "documented-unresolved", expectedIdentityResolution: "licensed-active-identity", expectedBlockReason: "lesson20-active-allomorph-nonactive-formation-documented-unresolved" }),
    Object.freeze({ cellId: "shape:unknown-final-e", sourceStem: "xele", verbClass: "B", sourceValence: "specific-projective", expected: [], expectedResolution: "documented-unresolved", expectedIdentityResolution: "shape-only-unlisted-identity", expectedBlockReason: "lesson20-final-e-requires-licensed-active-identity-and-nonactive-witness" }),
    Object.freeze({ cellId: "shape:unknown-final-long-e", sourceStem: "xelē", verbClass: "B", sourceValence: "specific-projective", expected: [], expectedResolution: "documented-unresolved", expectedIdentityResolution: "shape-only-unlisted-identity", expectedBlockReason: "lesson20-final-e-requires-licensed-active-identity-and-nonactive-witness" }),
    Object.freeze({ cellId: "shape:licensed-consonant-final", sourceStem: "ca-h", verbClass: "A", sourceValence: "intransitive", expected: ["ye-lo-hua"], expectedResolution: "determinate", expectedIdentityResolution: "shape-only-unlisted-identity" }),
    Object.freeze({ cellId: "shape:unknown-consonant-final", sourceStem: "xoc", verbClass: "B", sourceValence: "intransitive", expected: [], expectedResolution: "documented-unresolved", expectedIdentityResolution: "shape-only-unlisted-identity", expectedBlockReason: "lesson20-consonant-final-source-requires-lexical-or-suppletive-license" }),
]);

// Later nominalizations are valuable only when their source chain identifies
// the active stem and the intervening nonactive stem. These records aggregate
// those direct or structurally recoverable active -> nonactive witnesses. The
// expected list is a subset assertion: a productive Lesson 20 default may
// coexist with later Canvas alternatives.
const LATER_ACTIVE_TO_NONACTIVE_EVIDENCE_EXAMPLES = Object.freeze([
    { section: "36.5", sourceStem: "tla-zo-h-tla", verbClass: "B", sourceValence: "specific-projective", expected: ["tla-zo-h-tla-lō"], evidence: "formula-backed-passive-stem" },
    { section: "36.5", sourceStem: "cuitla-hui-ā", verbClass: "C", sourceValence: "reflexive", expected: ["cuitla-hui-lō"], evidence: "formula-backed-passive-stem" },
    { section: "36.5", sourceStem: "pā-hua-ci", verbClass: "B", sourceValence: "specific-projective", expected: ["pā-hua-x-ō"], evidence: "formula-backed-passive-stem" },
    { section: "36.5/38.1.3.a", sourceStem: "ī", verbClass: "B", sourceValence: "specific-projective", expected: ["ī-hua", "ī-lō"], evidence: "formula-plus-patientive-source" },
    { section: "36.5", sourceStem: "itta", verbClass: "B", sourceValence: "specific-projective", expected: ["itt-ō", "itta-lō", "it-hu-a-lō"], evidence: "three-formula-passive-inventory" },
    { section: "36.6", sourceStem: "tequi", verbClass: "B", sourceValence: "specific-projective", expected: ["tec-ō"], evidence: "formula-backed-impersonal-stem" },
    { section: "36.6", sourceStem: "cochi", verbClass: "B", sourceValence: "intransitive", expected: ["cochī-hua"], evidence: "formula-backed-impersonal-stem" },
    { section: "36.6", sourceStem: "pah-ti-ā", verbClass: "C", sourceValence: "reflexive", expected: ["pah-ti-lō"], evidence: "formula-backed-impersonal-stem" },
    { section: "36.6", sourceStem: "mamali", verbClass: "B", sourceValence: "specific-projective", expected: ["mamalī-hua", "mamalī-hua-lō"], evidence: "formula-backed-variant-impersonal-stems" },
    { section: "36.6", sourceStem: "ichpāna", verbClass: "B", sourceValence: "specific-projective", expected: ["ichpān-ō"], evidence: "formula-backed-impersonal-stem" },
    { section: "36.6", sourceStem: "il-nāmiqui", verbClass: "B", sourceValence: "specific-projective", expected: ["il-nāmic-ō"], evidence: "formula-backed-impersonal-stem" },
    { section: "36.10", sourceStem: "coco-liā", verbClass: "C", sourceValence: "reflexive", expected: ["coco-li-lō"], evidence: "formula-backed-passive-stem" },
    { section: "36.10", sourceStem: "tzacui-l-tiā", verbClass: "C", sourceValence: "double-projective", expected: ["tzacui-l-ti-lō"], evidence: "formula-backed-passive-stem" },
    { section: "37.5.3", sourceStem: "ya-uh", verbClass: "B", sourceValence: "intransitive", expected: ["hui-lo-hua"], evidence: "impersonal-action-source" },
    { section: "37.5.3", sourceStem: "ahci", verbClass: "B", sourceValence: "intransitive", expected: ["ahxī-hua"], evidence: "impersonal-action-source" },
    { section: "37.9.1.a", sourceStem: "mā", verbClass: "D", sourceValence: "specific-projective", expected: ["ma-lō"], evidence: "explicit-passive-stem" },
    { section: "37.9.1.a", sourceStem: "malina", verbClass: "B", sourceValence: "specific-projective", expected: ["malina-lō"], evidence: "explicit-passive-stem" },
    { section: "37.9.1.a", sourceStem: "piya", verbClass: "B", sourceValence: "specific-projective", expected: ["piya-lō", "piye-lō"], evidence: "passive-patientive-source-variants" },
    { section: "37.9.1.b", sourceStem: "nāmiqui", verbClass: "B", sourceValence: "specific-projective", expected: ["nāmic-ō"], evidence: "explicit-passive-stem" },
    { section: "37.9.1.b", sourceStem: "tītlani", verbClass: "B", sourceValence: "specific-projective", expected: ["tītlan-ō"], evidence: "explicit-passive-stem" },
    { section: "37.9.1.b", sourceStem: "teci", verbClass: "B", sourceValence: "specific-projective", expected: ["tex-ō"], evidence: "explicit-passive-stem" },
    { section: "37.9.1.a-b", sourceStem: "quetza", verbClass: "B", sourceValence: "specific-projective", expected: ["quetza-lō", "quech-ō"], evidence: "two-passive-source-formations" },
    { section: "37.9.1.c", sourceStem: "zō", verbClass: "B", sourceValence: "specific-projective", expected: ["zō-hua", "zō-lō"], evidence: "explicit-passive-stem-plus-lesson20-variant" },
    { section: "37.9.1.c", sourceStem: "moh-mōtla", verbClass: "B", sourceValence: "specific-projective", expected: ["moh-mōchī-hua"], evidence: "explicit-passive-stem" },
    { section: "37.9.1.c", sourceStem: "icza", verbClass: "B", sourceValence: "specific-projective", expected: ["icxi-hua"], evidence: "explicit-passive-stem" },
    { section: "37.9.1.c", sourceStem: "ohza", verbClass: "B", sourceValence: "specific-projective", expected: ["ohxi-hua"], evidence: "explicit-passive-stem" },
    { section: "38.1.1.a", sourceStem: "tzāhua", verbClass: "A", sourceValence: "intransitive", expected: ["tzāhua-lō"], evidence: "explicit-impersonal-stem" },
    { section: "38.1.1.a", sourceStem: "tōna", verbClass: "B", sourceValence: "intransitive", expected: ["tōna-lō"], evidence: "impersonal-patientive-source" },
    { section: "38.1.1.a", sourceStem: "cē-hua", verbClass: "A", sourceValence: "intransitive", expected: ["cē-hua-lō"], evidence: "impersonal-patientive-source" },
    { section: "38.1.1.a", sourceStem: "yohua", verbClass: "A", sourceValence: "intransitive", expected: ["yohua-lō"], evidence: "impersonal-patientive-source" },
    { section: "38.1.1.a", sourceStem: "ihyā-ya", verbClass: "B", sourceValence: "intransitive", expected: ["ihye-lō"], evidence: "patientive-source-with-vowel-raising" },
    { section: "38.1.1.b", sourceStem: "huetzi", verbClass: "B", sourceValence: "intransitive", expected: ["huech-o-hua"], evidence: "explicit-impersonal-stem" },
    { section: "38.1.1.b", sourceStem: "tlacō-ti", verbClass: "A", sourceValence: "intransitive", expected: ["tlacō-ch-ō"], evidence: "explicit-impersonal-stem" },
    { section: "38.1.1.c", sourceStem: "pix-ca", verbClass: "A", sourceValence: "intransitive", expected: ["pix-qui-hua"], evidence: "explicit-impersonal-stem" },
    { section: "38.1.1.c", sourceStem: "chihcha", verbClass: "A", sourceValence: "intransitive", expected: ["chihcha-lō", "chihchi-hua"], evidence: "two-impersonal-source-formations" },
    { section: "38.1.1.c", sourceStem: "xō-tla", verbClass: "A", sourceValence: "intransitive", expected: ["xō-chī-hua"], evidence: "explicit-impersonal-stem" },
    { section: "38.1.1.d", sourceStem: "chīchi", verbClass: "B", sourceValence: "intransitive", expected: ["chīchi-hua-lō"], evidence: "explicit-impersonal-stem" },
    { section: "38.1.3.a", sourceStem: "ō-ya", verbClass: "B", sourceValence: "specific-projective", expected: ["ō-lō", "ō-ya-lō"], evidence: "root-deleted-and-full-stem-patientive-sources" },
    { section: "38.1.3.c", sourceStem: "cāhui", verbClass: "B", sourceValence: "intransitive", expected: ["cāhui-hua"], evidence: "patientive-source-reconstruction" },
    { section: "38.1.3.c", sourceStem: "ichcua", verbClass: "B", sourceValence: "specific-projective", expected: ["ichcui-hua"], evidence: "patientive-source-reconstruction" },
    { section: "38.1.3.c", sourceStem: "ixca", verbClass: "A", sourceValence: "specific-projective", expected: ["ixqui-hua", "ixca-lō"], evidence: "two-impersonal-source-formations" },
    { section: "38.1.3.c", sourceStem: "pā-tz-ca", verbClass: "A", sourceValence: "specific-projective", expected: ["pā-tz-qui-hua"], evidence: "patientive-source-reconstruction" },
    { section: "38.1.3.c", sourceStem: "it-hu-a", verbClass: "B", sourceValence: "specific-projective", expected: ["it-hui-hua"], evidence: "patientive-source-reconstruction" },
    { section: "38.1.4", sourceStem: "huica", verbClass: "B", sourceValence: "specific-projective", expected: ["huica-lō"], evidence: "exceptional-patientive-source-reconstruction" },
]);

// These records execute as ordered voice-layer chains. Their final targets
// remain excluded from the first-pass Lesson 20 selector, but exclusion alone
// is not treated as implementation.
const HIGHER_ORDER_NONACTIVE_EVIDENCE_EXAMPLES = Object.freeze([
    { section: "38.1.1.a", sourceStem: "yohua", verbClass: "A", sourceValence: "intransitive", routeId: "cn-l38-yohua-triply-impersonal", expected: "tla-yohua-lō", expectedLayerCount: 3 },
    { section: "38.1.1.a", sourceStem: "ihyā-ya", verbClass: "B", sourceValence: "intransitive", routeId: "cn-l38-tla-hyaya-doubly-impersonal", expected: "tla-hye-lō", expectedLayerCount: 2 },
    { section: "38.1.1.b", sourceStem: "tla-cōl-ō-ti", verbClass: "A", sourceValence: "intransitive", routeId: "cn-l38-tla-coloti-doubly-impersonal", expected: "tla-cōl-ō-ch-ō", expectedLayerCount: 1 },
    { section: "38.1.1.b", sourceStem: "nēci", verbClass: "B", sourceValence: "intransitive", routeId: "cn-l38-tla-neci-doubly-impersonal", expected: "tla-nex-ō", expectedLayerCount: 2 },
    { section: "38.1.4.a", sourceStem: "pach-o-ā", verbClass: "C", sourceValence: "specific-projective", routeId: "cn-l38-pachoia-impersonalized-passive", expected: "tla-pach-ō-lō", expectedLayerCount: 2 },
    { section: "38.1.4.b", sourceStem: "tītlani", verbClass: "B", sourceValence: "specific-projective", routeId: "cn-l38-titlani-impersonalized-passive", expected: "tla-tītlan-ō", expectedLayerCount: 2 },
    { section: "38.1.4.c", sourceStem: "ahci", verbClass: "B", sourceValence: "specific-projective", routeId: "cn-l38-ahci-impersonalized-passive", expected: "tla-ahxi-hua", expectedLayerCount: 2 },
]);

// Patientive truncation sometimes proves that one of two suffix families was
// present without distinguishing which one. Preserve that evidence, but do not
// manufacture a selectable target.
const AMBIGUOUS_NONACTIVE_FAMILY_EVIDENCE_EXAMPLES = Object.freeze([
    { section: "38.1.1.b", sourceStem: "tēmiqui", verbClass: "B", sourceValence: "intransitive", patientiveStem: "tēmic", candidateFamilies: ["ō", "o-hua"] },
    { section: "38.1.1.b", sourceStem: "cual-ā-ni", verbClass: "B", sourceValence: "intransitive", patientiveStem: "cual-ā-n", candidateFamilies: ["ō", "o-hua"] },
    { section: "38.1.1.b", sourceStem: "cochi", verbClass: "B", sourceValence: "intransitive", patientiveStem: "coch", candidateFamilies: ["ō", "o-hua"] },
]);

function runAudit(runtime) {
    runtime = requireLesson20Runtime(runtime);
    const results = LESSON20_NONACTIVE_EXAMPLES.map((example) => {
        const inventory = runtime.getClassicalNahuatlLesson20NonactiveStemOptions(example.sourceStem, {
            verbClass: example.verbClass,
            sourceValence: example.sourceValence,
        });
        const actual = inventory.options
            .filter((option) => String(option.andrewsSection || "").startsWith("20")
                || String(option.supportingProductiveRuleId || "").startsWith("cn-l20-"))
            .map((option) => option.nonactiveStem);
        const expectedJson = JSON.stringify(example.expected);
        const actualJson = JSON.stringify(actual);
        const rejectedOcrForms = inventory.options
            .map((option) => option.nonactiveStem)
            .filter((stem) => VISUALLY_REJECTED_LESSON20_OCR_FORMS.has(stem));
        const authorizedOptionsAreTyped = inventory.options.every((option) => option.kind === "classical-nahuatl-lesson20-nonactive-option"
            && option.ruleId
            && option.formationAuthority
            && option.optionId === `${option.suffixFamily}:${option.nonactiveStem}`);
        const optionClassesMatchAppendix = inventory.options.every((option) => {
            if (["hua", "o-hua", "lo-hua"].includes(option.suffixFamily) && /hua$/u.test(option.nonactiveStem)) {
                return option.targetClass === "A-1";
            }
            if (["lō", "ō", "hua-lō"].includes(option.suffixFamily)) {
                return option.targetClass === "A-2";
            }
            return option.targetClass === "A";
        });
        return {
            ...example,
            actual,
            authorizationStatus: inventory.authorizationStatus,
            selectorRequired: inventory.selectorRequired,
            rejectedOcrForms,
            passed: expectedJson === actualJson
                && inventory.authorizationStatus === "authorized"
                && authorizedOptionsAreTyped
                && optionClassesMatchAppendix
                && rejectedOcrForms.length === 0
                && inventory.userSuppliedDerivedStemAllowed === false,
        };
    });
    const failures = results.filter((result) => !result.passed);
    return {
        kind: "classical-nahuatl-lesson20-nonactive-canvas-audit",
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        visualPdfWitness: LESSON20_VISUAL_PDF_WITNESS,
        sections: "20.2-20.8",
        caseCount: results.length,
        passedCount: results.length - failures.length,
        failureCount: failures.length,
        authorizationStatus: failures.length ? "blocked" : "authorized",
        failures,
        results,
    };
}

function runVisualRuleLogicAudit(runtime) {
    runtime = requireLesson20Runtime(runtime);
    const results = VISUALLY_CONFIRMED_LESSON20_RULE_CASES.map((example) => {
        const inventory = runtime.getClassicalNahuatlLesson20NonactiveStemOptions(example.sourceStem, {
            verbClass: example.verbClass,
            sourceValence: example.sourceValence,
        });
        const lesson20Options = inventory.options.filter((option) => (
            String(option.andrewsSection || "").startsWith("20")
            || String(option.supportingProductiveRuleId || "").startsWith("cn-l20-")
        ));
        const actual = lesson20Options.map((option) => option.nonactiveStem);
        const primary = lesson20Options.find((option) => option.nonactiveStem === example.primary) || null;
        const authorityMatches = example.authority === "productive"
            ? primary?.candidateSource === "productive-final-shape"
                && inventory.candidateResolutionSource === "productive-final-shape"
            : primary?.candidateSource === "exact-lesson20-formation"
                && ["obligatory-exception", "suppletive-lexical-rule"].includes(primary?.formationAuthority);
        const rejectedOcrForms = actual.filter((stem) => VISUALLY_REJECTED_LESSON20_OCR_FORMS.has(stem));
        const noStringOverrideRoute = inventory.candidateLattice.userSuppliedCandidateAllowed === false
            && inventory.userSuppliedDerivedStemAllowed === false;
        return {
            ...example,
            actual,
            actualRuleId: primary?.ruleId || "",
            actualVowelLengthRuleId: primary?.vowelLengthRuleId || "",
            actualCandidateSource: primary?.candidateSource || "",
            actualFormationAuthority: primary?.formationAuthority || "",
            rejectedOcrForms,
            passed: JSON.stringify(actual) === JSON.stringify(example.expected)
                && inventory.authorizationStatus === "authorized"
                && primary?.ruleId === example.ruleId
                && (!example.vowelLengthRuleId || primary?.vowelLengthRuleId === example.vowelLengthRuleId)
                && authorityMatches
                && rejectedOcrForms.length === 0
                && noStringOverrideRoute,
        };
    });
    const failures = results.filter((result) => !result.passed);
    return {
        kind: "classical-nahuatl-lesson20-visual-rule-logic-audit",
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        visualPdfWitness: LESSON20_VISUAL_PDF_WITNESS,
        sections: "20.2-20.6",
        caseCount: results.length,
        productiveCaseCount: results.filter((result) => result.authority === "productive").length,
        exceptionCaseCount: results.filter((result) => result.authority === "exact-exception").length,
        passedCount: results.length - failures.length,
        failureCount: failures.length,
        authorizationStatus: failures.length ? "blocked" : "authorized",
        failures,
        results,
    };
}

function runSupplementAudit(runtime) {
    runtime = requireLesson20Runtime(runtime);
    const results = CROSS_LESSON_NONACTIVE_SUPPLEMENT_EXAMPLES.map((example) => {
        const inventory = runtime.getClassicalNahuatlLesson20NonactiveStemOptions(example.sourceStem, {
            verbClass: example.verbClass,
            sourceValence: example.sourceValence,
        });
        const supplementOptions = inventory.options.filter((option) => !String(option.andrewsSection || "").startsWith("20"));
        const actual = supplementOptions.map((option) => option.nonactiveStem);
        const lesson20Option = inventory.options[0] || null;
        const typedOptionalSupplements = supplementOptions.every((option) => option.kind === "classical-nahuatl-lesson20-nonactive-option"
            && option.ruleId
            && option.formationAuthority
            && option.andrewsSection
            && option.attestationStatus
            && option.optionalForUser === true
            && option.optionRole === "user-choice"
            && option.isDefault === false);
        const soleAuthorizedFormation = example.soleAuthorizedFormation === true
            && inventory.options.length === 1
            && supplementOptions.length === 1
            && lesson20Option?.nonactiveStem === example.expected[0]
            && lesson20Option?.optionalForUser === false
            && lesson20Option?.optionRole === "determinate"
            && inventory.selectorRequired === false
            && inventory.selectionRequired === false
            && inventory.automaticOptionId === lesson20Option?.optionId;
        return {
            ...example,
            actual,
            lesson20Stem: lesson20Option?.nonactiveStem || "",
            passed: JSON.stringify(actual) === JSON.stringify(example.expected)
                && inventory.authorizationStatus === "authorized"
                && (soleAuthorizedFormation || (
                    String(lesson20Option?.andrewsSection || "").startsWith("20")
                    && typedOptionalSupplements
                    && inventory.selectorRequired === true
                    && inventory.selectionRequired === true
                    && inventory.defaultOptionId === ""
                    && inventory.alternativeSelectionPolicy === "explicit-user-choice-required-no-default"
                ))
                && inventory.userSuppliedDerivedStemAllowed === false,
        };
    });
    const failures = results.filter((result) => !result.passed);
    return {
        kind: "classical-nahuatl-cross-lesson-nonactive-supplement-audit",
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        sections: "25, 36, 37, 38",
        caseCount: results.length,
        optionCount: results.reduce((count, result) => count + result.expected.length, 0),
        passedCount: results.length - failures.length,
        failureCount: failures.length,
        authorizationStatus: failures.length ? "blocked" : "authorized",
        failures,
        results,
    };
}

function runAdditionalProductiveAudit(runtime) {
    runtime = requireLesson20Runtime(runtime);
    const results = ADDITIONAL_PRODUCTIVE_CANVAS_EXAMPLES.map((example) => {
        const inventory = runtime.getClassicalNahuatlLesson20NonactiveStemOptions(example.sourceStem, {
            verbClass: example.verbClass,
            sourceValence: example.sourceValence,
        });
        const actual = inventory.options.map((option) => option.nonactiveStem);
        const typedOptions = inventory.options.every((option) => option.kind === "classical-nahuatl-lesson20-nonactive-option"
            && option.ruleId
            && option.formationAuthority
            && option.optionId === `${option.suffixFamily}:${option.nonactiveStem}`);
        return {
            ...example,
            actual,
            passed: JSON.stringify(actual) === JSON.stringify(example.expected)
                && inventory.authorizationStatus === "authorized"
                && inventory.selectorRequired === example.selectorRequired
                && typedOptions
                && inventory.userSuppliedDerivedStemAllowed === false,
        };
    });
    const failures = results.filter((result) => !result.passed);
    return {
        kind: "classical-nahuatl-additional-productive-nonactive-audit",
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        sections: "24.2, 25.4, 27.4.1",
        caseCount: results.length,
        passedCount: results.length - failures.length,
        failureCount: failures.length,
        authorizationStatus: failures.length ? "blocked" : "authorized",
        failures,
        results,
    };
}

function runUnlistedProductiveShapeAudit(runtime) {
    runtime = requireLesson20Runtime(runtime);
    const results = UNLISTED_PRODUCTIVE_SHAPE_EXAMPLES.map((example) => {
        const inventory = runtime.getClassicalNahuatlLesson20NonactiveStemOptions(example.sourceStem, {
            verbClass: example.verbClass,
            sourceValence: example.sourceValence,
        });
        const actual = inventory.options.map((option) => option.nonactiveStem);
        const actualFamilies = inventory.options.map((option) => option.suffixFamily);
        const selectedRecords = inventory.options.map((option) => runtime.deriveClassicalNahuatlLesson20NonactiveStemRecord(
            example.sourceStem,
            {
                verbClass: example.verbClass,
                sourceValence: example.sourceValence,
                optionId: option.optionId,
            }
        ));
        return {
            ...example,
            actual,
            actualFamilies,
            passed: JSON.stringify(actual) === JSON.stringify(example.expected)
                && JSON.stringify(actualFamilies) === JSON.stringify(example.families)
                && inventory.authorizationStatus === "authorized"
                && inventory.userSuppliedDerivedStemAllowed === false
                && selectedRecords.every((record, index) => record.authorizationStatus === "authorized"
                    && record.nonactiveStem === example.expected[index]
                    && record.selectionAuthority === "andrews-lesson20-rule-derivation"
                    && record.selectedRuleId),
        };
    });
    const failures = results.filter((result) => !result.passed);
    return {
        kind: "classical-nahuatl-unlisted-productive-nonactive-shape-audit",
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        sections: "20.2, 20.4-20.6",
        caseCount: results.length,
        passedCount: results.length - failures.length,
        failureCount: failures.length,
        authorizationStatus: failures.length ? "blocked" : "authorized",
        failures,
        results,
    };
}

function runNonactiveCandidateLatticeMatrixAudit(runtime) {
    runtime = requireLesson20Runtime(runtime);
    const results = NONACTIVE_CANDIDATE_LATTICE_MATRIX_CASES.map((example) => {
        const inventory = runtime.getClassicalNahuatlLesson20NonactiveStemOptions(example.sourceStem, {
            verbClass: example.verbClass,
            sourceValence: example.sourceValence,
            sourceIdentityFrame: {
                enteredStem: "CALLER-IDENTITY-LIES",
                exactNonactiveFormations: [{ nonactiveStem: "FORGED" }],
            },
        });
        const lattice = inventory.candidateLattice;
        const identity = inventory.sourceIdentityFrame;
        const actual = inventory.options.map((option) => option.nonactiveStem);
        const selectedRecords = inventory.options.map((option) => runtime.deriveClassicalNahuatlLesson20NonactiveStemRecord(
            example.sourceStem,
            {
                verbClass: example.verbClass,
                sourceValence: example.sourceValence,
                optionId: option.optionId,
            }
        ));
        const expectedBlockReason = example.expectedBlockReason || "";
        const typedOptions = inventory.options.every((option) => (
            option.kind === "classical-nahuatl-lesson20-nonactive-option"
            && option.sourceIdentityFrame === identity
            && option.sourceInternalMorphology === identity.internalMorphology
            && option.candidateSource
            && option.decisionCategory
            && option.finalShapeRelation?.authorizationStatus === "authorized"
        ));
        return {
            ...example,
            actual,
            actualResolution: inventory.candidateResolutionStatus,
            actualIdentityResolution: identity.identityResolution,
            actualBlockReason: inventory.blockReason,
            finalShapeCategory: /^[aeioāēīō]$/u.test(identity.sourceFinalShapeFrame.finalLetter)
                ? identity.sourceFinalShapeFrame.finalLetter
                : "C",
            boundaryCategory: identity.sourceFinalShapeFrame.hasMorphemeBoundary ? "hyphenated" : "solid",
            vowelLengthCategory: identity.sourceFinalShapeFrame.finalVowelLength,
            routeResolutions: lattice.productiveCandidateSet.routeEvaluations.map((route) => route.resolution),
            passed: JSON.stringify(actual) === JSON.stringify(example.expected)
                && inventory.candidateResolutionStatus === example.expectedResolution
                && identity.identityResolution === example.expectedIdentityResolution
                && inventory.blockReason === expectedBlockReason
                && inventory.sourceStem === example.sourceStem
                && identity.enteredStem === example.sourceStem
                && identity.callerSuppliedIdentityAllowed === false
                && lattice.kind === "classical-nahuatl-lesson20-nonactive-candidate-lattice"
                && lattice.userSuppliedCandidateAllowed === false
                && lattice.resolvedCandidateCount === example.expected.length
                && typedOptions
                && selectedRecords.every((record, index) => record.authorizationStatus === "authorized"
                    && record.nonactiveStem === example.expected[index]
                    && record.sourceIdentityFrame.enteredStem === example.sourceStem
                    && record.sourceIdentityFrame.callerSuppliedIdentityAllowed === false),
        };
    });
    const cellFailures = results.filter((result) => !result.passed);
    const axisCoverage = {
        verbClasses: Array.from(new Set(results.map((result) => result.verbClass))).sort(),
        valenceModes: Array.from(new Set(results.map((result) => result.sourceValence === "intransitive" ? "intransitive" : "transitive"))).sort(),
        finalShapeCategories: Array.from(new Set(results.map((result) => result.finalShapeCategory))).sort(),
        boundaryCategories: Array.from(new Set(results.map((result) => result.boundaryCategory))).sort(),
        vowelLengthCategories: Array.from(new Set(results.map((result) => result.vowelLengthCategory))).sort(),
        identityResolutions: Array.from(new Set(results.map((result) => result.actualIdentityResolution))).sort(),
        candidateResolutions: Array.from(new Set(results.map((result) => result.actualResolution))).sort(),
        routeResolutions: Array.from(new Set(results.flatMap((result) => result.routeResolutions))).sort(),
        finalShapeUnitLimits: Array.from(new Set(results.map((result) => (
            runtime.buildClassicalNahuatlLesson20StemFinalShapeFrame(result.sourceStem).unitLimit
        )))).sort(),
    };
    const requiredAxisValues = {
        verbClasses: ["A", "B", "C", "D"],
        valenceModes: ["intransitive", "transitive"],
        finalShapeCategories: ["C", "a", "ā", "e", "ē", "i", "ī", "o", "ō"],
        boundaryCategories: ["hyphenated", "solid"],
        vowelLengthCategories: ["long", "not-vowel", "short"],
        identityResolutions: ["licensed-active-identity", "shape-only-unlisted-identity"],
        candidateResolutions: ["determinate", "documented-unresolved", "selectable-alternatives"],
        routeResolutions: ["selected", "superseded-by-more-specific-rule"],
        finalShapeUnitLimits: [3],
    };
    const missingAxisValues = Object.fromEntries(Object.entries(requiredAxisValues).map(([axis, required]) => [
        axis,
        required.filter((value) => !axisCoverage[axis].includes(value)),
    ]));
    const axisFailureCount = Object.values(missingAxisValues).filter((missing) => missing.length).length;
    const failureCount = cellFailures.length + axisFailureCount;
    return {
        kind: "classical-nahuatl-lesson20-nonactive-candidate-lattice-matrix-audit",
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        dimensions: "class × valence × final one-to-three units × boundary × vowel length × active identity",
        caseCount: results.length,
        passedCount: results.length - cellFailures.length,
        failureCount,
        axisFailureCount,
        authorizationStatus: failureCount ? "blocked" : "authorized",
        axisCoverage,
        missingAxisValues,
        failures: cellFailures,
        results,
    };
}

function runLaterActiveToNonactiveEvidenceAudit(runtime) {
    runtime = requireLesson20Runtime(runtime);
    const directResults = LATER_ACTIVE_TO_NONACTIVE_EVIDENCE_EXAMPLES.map((example) => {
        const inventory = runtime.getClassicalNahuatlLesson20NonactiveStemOptions(example.sourceStem, {
            verbClass: example.verbClass,
            sourceValence: example.sourceValence,
        });
        const actual = inventory.options.map((option) => option.nonactiveStem);
        const missing = example.expected.filter((stem) => !actual.includes(stem));
        return {
            ...example,
            actual,
            missing,
            passed: inventory.authorizationStatus === "authorized"
                && missing.length === 0
                && inventory.options.every((option) => option.kind === "classical-nahuatl-lesson20-nonactive-option"
                    && option.ruleId
                    && option.formationAuthority),
        };
    });
    const higherOrderResults = HIGHER_ORDER_NONACTIVE_EVIDENCE_EXAMPLES.map((example) => {
        const inventory = runtime.getClassicalNahuatlLesson20NonactiveStemOptions(example.sourceStem, {
            verbClass: example.verbClass,
            sourceValence: example.sourceValence,
        });
        const firstPassStems = inventory.options.map((option) => option.nonactiveStem);
        const routeInventory = runtime.getClassicalNahuatlOrderedVoiceLayerOptions(example.sourceStem);
        const chain = runtime.deriveClassicalNahuatlOrderedVoiceLayerChain(example.sourceStem, {
            routeId: example.routeId,
            targetStem: "TARGET-LIE",
            layers: [{ targetStem: "LAYER-LIE" }],
            formulaArtifact: "#FORMULA-LIE#",
            surfaceArtifact: "SURFACE-LIE",
        });
        return {
            ...example,
            firstPassStems,
            routeOptionIds: routeInventory.options.map((option) => option.routeId),
            actual: chain.targetStem,
            layerCount: chain.layerCount,
            layerContinuity: chain.layers.map((layer) => `${layer.sourceStem}>${layer.targetStem}`),
            passed: !firstPassStems.includes(example.expected)
                && routeInventory.options.some((option) => option.routeId === example.routeId)
                && chain.authorizationStatus === "authorized"
                && chain.targetStem === example.expected
                && chain.layerCount === example.expectedLayerCount
                && chain.sourceTargetContinuity === true
                && chain.layers.every((layer) => layer.consumesPreviousTypedOutput === true)
                && runtime.isClassicalNahuatlOrderedVoiceLayerChain(chain, example.sourceStem)
                && chain.callerSuppliedTargetAllowed === false
                && chain.callerSuppliedLayersAllowed === false
                && chain.formulaArtifactAuthority === false
                && chain.surfaceArtifactAuthority === false
                && !JSON.stringify(chain).includes("LIE"),
        };
    });
    const ambiguousResults = AMBIGUOUS_NONACTIVE_FAMILY_EVIDENCE_EXAMPLES.map((example) => {
        const inventory = runtime.getClassicalNahuatlLesson20NonactiveStemOptions(example.sourceStem, {
            verbClass: example.verbClass,
            sourceValence: example.sourceValence,
        });
        const unauthorizedExactTargets = inventory.options.filter((option) => option.andrewsSection === example.section);
        return {
            ...example,
            firstPassStems: inventory.options.map((option) => option.nonactiveStem),
            unauthorizedExactTargets: unauthorizedExactTargets.map((option) => option.nonactiveStem),
            passed: example.candidateFamilies.length > 1
                && new Set(example.candidateFamilies).size === example.candidateFamilies.length
                && unauthorizedExactTargets.length === 0,
        };
    });
    const results = [...directResults, ...higherOrderResults, ...ambiguousResults];
    const failures = results.filter((result) => !result.passed);
    return {
        kind: "classical-nahuatl-later-active-to-nonactive-evidence-audit",
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        sections: "36.5-38.2",
        directCaseCount: directResults.length,
        directFormationCount: directResults.reduce((count, result) => count + result.expected.length, 0),
        higherOrderCaseCount: higherOrderResults.length,
        ambiguousCaseCount: ambiguousResults.length,
        caseCount: results.length,
        passedCount: results.length - failures.length,
        failureCount: failures.length,
        authorizationStatus: failures.length ? "blocked" : "authorized",
        failures,
        directResults,
        higherOrderResults,
        ambiguousResults,
    };
}

async function main() {
    const { context } = await createModuleRuntime({ rootDir: ROOT });
    const report = runAudit(context);
    const visualRuleReport = runVisualRuleLogicAudit(context);
    const supplementReport = runSupplementAudit(context);
    const productiveReport = runAdditionalProductiveAudit(context);
    const unlistedShapeReport = runUnlistedProductiveShapeAudit(context);
    const candidateLatticeReport = runNonactiveCandidateLatticeMatrixAudit(context);
    const laterEvidenceReport = runLaterActiveToNonactiveEvidenceAudit(context);
    if (process.argv.includes("--json")) {
        process.stdout.write(`${JSON.stringify({ lesson20: report, visualRuleLogic: visualRuleReport, supplements: supplementReport, additionalProductive: productiveReport, unlistedShapes: unlistedShapeReport, candidateLattice: candidateLatticeReport, laterEvidence: laterEvidenceReport }, null, 2)}\n`);
    } else {
        process.stdout.write(`Lesson 20 Canvas audit: ${report.passedCount}/${report.caseCount} passed\n`);
        report.failures.forEach((failure) => {
            process.stdout.write(`FAIL §${failure.section} ${failure.sourceStem}: expected ${JSON.stringify(failure.expected)}, got ${JSON.stringify(failure.actual)}\n`);
        });
        process.stdout.write(`Lesson 20 visual rule-logic audit: ${visualRuleReport.passedCount}/${visualRuleReport.caseCount} passed (${visualRuleReport.productiveCaseCount} productive, ${visualRuleReport.exceptionCaseCount} exact exceptions)\n`);
        visualRuleReport.failures.forEach((failure) => {
            process.stdout.write(`FAIL ${failure.sourceStem}: expected ${JSON.stringify(failure.expected)}, got ${JSON.stringify(failure.actual)} via ${failure.actualCandidateSource || "no route"}\n`);
        });
        process.stdout.write(`Cross-lesson optional inventory audit: ${supplementReport.passedCount}/${supplementReport.caseCount} sources, ${supplementReport.optionCount} options passed\n`);
        supplementReport.failures.forEach((failure) => {
            process.stdout.write(`FAIL §${failure.section} ${failure.sourceStem}: expected supplements ${JSON.stringify(failure.expected)}, got ${JSON.stringify(failure.actual)}\n`);
        });
        process.stdout.write(`Additional productive Canvas audit: ${productiveReport.passedCount}/${productiveReport.caseCount} passed\n`);
        productiveReport.failures.forEach((failure) => {
            process.stdout.write(`FAIL §${failure.section} ${failure.sourceStem}: expected ${JSON.stringify(failure.expected)}, got ${JSON.stringify(failure.actual)}\n`);
        });
        process.stdout.write(`Unlisted productive-shape audit: ${unlistedShapeReport.passedCount}/${unlistedShapeReport.caseCount} passed\n`);
        unlistedShapeReport.failures.forEach((failure) => {
            process.stdout.write(`FAIL ${failure.shape} ${failure.sourceStem}: expected ${JSON.stringify(failure.expected)}, got ${JSON.stringify(failure.actual)}\n`);
        });
        process.stdout.write(`Nonactive candidate-lattice matrix: ${candidateLatticeReport.passedCount}/${candidateLatticeReport.caseCount} cells passed; ${candidateLatticeReport.axisFailureCount} uncovered axes\n`);
        candidateLatticeReport.failures.forEach((failure) => {
            process.stdout.write(`FAIL ${failure.cellId} ${failure.sourceStem}: expected ${JSON.stringify(failure.expected)}, got ${JSON.stringify(failure.actual)} (${failure.actualResolution})\n`);
        });
        Object.entries(candidateLatticeReport.missingAxisValues).forEach(([axis, missing]) => {
            if (missing.length) {
                process.stdout.write(`FAIL matrix axis ${axis}: missing ${JSON.stringify(missing)}\n`);
            }
        });
        process.stdout.write(`Later active-to-nonactive evidence audit: ${laterEvidenceReport.passedCount}/${laterEvidenceReport.caseCount} cases; ${laterEvidenceReport.directFormationCount} direct formations, ${laterEvidenceReport.higherOrderCaseCount} higher-order, ${laterEvidenceReport.ambiguousCaseCount} ambiguous-family records passed\n`);
        laterEvidenceReport.failures.forEach((failure) => {
            process.stdout.write(`FAIL §${failure.section} ${failure.sourceStem}: ${JSON.stringify(failure)}\n`);
        });
    }
    if (report.failureCount || visualRuleReport.failureCount || supplementReport.failureCount || productiveReport.failureCount || unlistedShapeReport.failureCount || candidateLatticeReport.failureCount || laterEvidenceReport.failureCount) {
        process.exitCode = 1;
    }
}

if (require.main === module) {
    main().catch((error) => {
        process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
        process.exitCode = 1;
    });
}

module.exports = {
    LESSON20_NONACTIVE_EXAMPLES,
    VISUALLY_CONFIRMED_LESSON20_RULE_CASES,
    CROSS_LESSON_NONACTIVE_SUPPLEMENT_EXAMPLES,
    ADDITIONAL_PRODUCTIVE_CANVAS_EXAMPLES,
    UNLISTED_PRODUCTIVE_SHAPE_EXAMPLES,
    NONACTIVE_CANDIDATE_LATTICE_MATRIX_CASES,
    LATER_ACTIVE_TO_NONACTIVE_EVIDENCE_EXAMPLES,
    HIGHER_ORDER_NONACTIVE_EVIDENCE_EXAMPLES,
    AMBIGUOUS_NONACTIVE_FAMILY_EVIDENCE_EXAMPLES,
    runAudit,
    runVisualRuleLogicAudit,
    runSupplementAudit,
    runAdditionalProductiveAudit,
    runUnlistedProductiveShapeAudit,
    runNonactiveCandidateLatticeMatrixAudit,
    runLaterActiveToNonactiveEvidenceAudit,
};
