#!/usr/bin/env node

import { createClassicalNahuatlLesson7VerbstemClassesRuntime } from "../src/core/classical/lesson7_verbstem_classes.mjs";

const lesson7 = createClassicalNahuatlLesson7VerbstemClassesRuntime({});

const cases = [
    // 7.3 class definitions
    ["7.3", "chōca", ["A"]],
    ["7.3", "ihza", ["A"]],
    ["7.3", "temō", ["A"]],
    ["7.3", "ehcō", ["A"]],
    ["7.3", "yōli", ["B"]],
    ["7.3", "chīhua", ["B"], { valence: "transitive" }],
    ["7.3", "tom-a", ["B"], { valence: "transitive" }],
    ["7.3", "tomi", ["B"]],
    ["7.3", "chol-o-ā", ["C"]],
    ["7.3", "ā-l-ti-ā", ["C"], { valence: "transitive" }],
    ["7.3", "yā", ["D"]],

    // 7.4 Class B changes and traditional-spelling warnings
    ["7.4", "miqui", ["B"]],
    ["7.4", "nēci", ["B"]],
    ["7.4", "cē-hui", ["B"]],
    ["7.4", "tzacu-a", ["B"], { valence: "transitive" }],
    ["7.4", "nemi", ["B"]],
    ["7.4", "tlaōco-ya", ["B", "A"], { valence: "intransitive" }],
    ["7.4", "cel-i-ya", ["B", "A"], { valence: "intransitive" }],
    ["7.4", "izta-ya", ["B", "A"], { valence: "intransitive" }],
    ["7.4", "zōhua", ["B"], { valence: "transitive" }],
    ["7.4", "chiya", ["B"], { valence: "transitive" }],
    ["7.4", "chiye", ["B"], { valence: "transitive" }],
    ["7.4", "ce-ya", ["B", "A"], { valence: "intransitive" }],
    ["7.4", "āyi", ["B"], { valence: "transitive" }],

    // 7.5 variable membership
    ["7.5", "yēc-ti-ya", ["B", "A"], { valence: "intransitive" }],
    ["7.5", "ē-hua", ["A", "B"], { valence: "intransitive" }],

    // 7.6.1 monosyllables
    ["7.6.1", "pī", ["A"]],
    ["7.6.1", "ī", ["A"]],
    ["7.6.1", "o", ["A"]],
    ["7.6.1", "cui", ["A"]],
    ["7.6.1", "zō", ["A"]],
    ["7.6.1", "ā", ["A"]],

    // 7.6.2 consonant clusters and long consonants
    ["7.6.2", "tzīn-ti", ["A"]],
    ["7.6.2", "pil-ca", ["A"]],
    ["7.6.2", "itqui", ["A"]],
    ["7.6.2", "ix-hui", ["A"]],
    ["7.6.2", "iuc-ci", ["A"]],
    ["7.6.2", "chihcha", ["A"]],
    ["7.6.2", "tzahtzi", ["A"]],
    ["7.6.2", "itt-a", ["A"], { valence: "transitive" }],

    // 7.6.3-7.6.7 productive endings and stated alternatives
    ["7.6.3", "po-pō-ca", ["A"]],
    ["7.6.3", "toca", ["A"], { valence: "transitive" }],
    ["7.6.3", "pāca", ["A", "B"], { valence: "transitive" }],
    ["7.6.4", "tla-tla", ["A"]],
    ["7.6.4", "mōtla", ["A"], { valence: "transitive" }],
    ["7.6.5", "tom-ā-hua", ["A"], { valence: "intransitive", signifiesChange: true }],
    ["7.6.5", "chip-ā-hua", ["A"], { valence: "intransitive", signifiesChange: true }],
    ["7.6.6", "yōcoya", ["B"], { valence: "transitive" }],
    ["7.6.6", "ō-ya", ["B"], { valence: "transitive" }],
    ["7.6.6", "chichi-ya", ["B", "A"], { valence: "intransitive" }],
    ["7.6.7", "tlehcō", ["A"]],

    // 7.6.8 enumerated Class D stems and the stated variant
    ["7.6.8", "cuā", ["D"], { valence: "transitive" }],
    ["7.6.8", "mā", ["D"], { valence: "transitive" }],
    ["7.6.8", "pā", ["D"], { valence: "transitive" }],
    ["7.6.8", "ihuā", ["D"], { valence: "transitive" }],
    ["7.6.8", "māmā", ["D"], { valence: "transitive" }],
    ["7.6.8", "mēmē", ["D"], { valence: "transitive" }],
    ["7.6.8", "nāhuā", ["D"], { valence: "transitive" }],
    ["7.6.8", "zōmā", ["D"], { valence: "reflexive" }],
];

const results = cases.map(([section, stem, expectedClassIds, options = {}]) => {
    const profile = lesson7.inferClassicalNahuatlLesson7ClassProfile(stem, options);
    const formRuleClassIds = profile.classGuidelineAllowedClassIds || [];
    const formRuleMatches = formRuleClassIds.length === expectedClassIds.length
        && expectedClassIds.every((classId) => formRuleClassIds.includes(classId));
    const selectedExampleChecks = expectedClassIds.map((classId) => (
        lesson7.inferClassicalNahuatlLesson7ClassProfile(stem, {
            ...options,
            verbClass: classId,
        })
    ));
    const examplesWorkAgainstRuleLogic = selectedExampleChecks.every((selectedProfile, index) => (
        selectedProfile.classId === expectedClassIds[index]
        && selectedProfile.classGuidelineContradictionBlocked !== true
    ));
    const pass = formRuleMatches || examplesWorkAgainstRuleLogic;
    return {
        section,
        stem,
        expected: expectedClassIds.join("/"),
        automatic: formRuleClassIds.join("/") || "open",
        checked: expectedClassIds.join("/"),
        authority: profile.guidelineId,
        checkKind: formRuleMatches
            ? (profile.classDeterminedByLexicalException
                ? "closed-exception-or-enumeration"
                : "general-form-rule")
            : "canvas-example-against-open-rule-logic",
        pass,
    };
});

console.table(results);
const failures = results.filter((result) => !result.pass);
console.log(`Lesson 7 class audit: ${results.length - failures.length}/${results.length} passed.`);
if (failures.length) {
    process.exitCode = 1;
}
