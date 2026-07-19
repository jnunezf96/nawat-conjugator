#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { createModuleRuntime } = require("./lib/module_runtime");

const ROOT = path.resolve(__dirname, "..");

// The expected formulas below are executable ASCII realizations of the exact
// Andrews diagrams/inline formulas at the recorded Canvas lines. The line
// ranges are part of each case so the audit cannot silently outlive its source.
const CANVAS_EXAMPLES = Object.freeze([
    Object.freeze({
        id: "l24-8146-tomi-distinct-causative",
        lesson: 24,
        section: "24.8.1",
        lineStart: 8141,
        lineEnd: 8159,
        evidenceTokens: Object.freeze(["Source: tomi", "Transform: nictoma", "+c-Ø(", "-a)"]),
        derivationType: "causative",
        expectedSubtype: "type-one",
        sourceStem: "tomi",
        sourceSubject: "3sg",
        targetSubject: "1sg",
        sourceValence: "intransitive",
        verbClass: "B",
        sourceObjectRequests: Object.freeze([]),
        expectedTargetStem: "tom-a",
        expectedFormula: "#ni-0+c-0(tom-a)0+0-0#",
    }),
    Object.freeze({
        id: "l24-8166-tomi-reflexive-causative",
        lesson: 24,
        section: "24.8.2",
        lineStart: 8161,
        lineEnd: 8179,
        evidenceTokens: Object.freeze(["Source: nitomi", "Transform: ninotoma", "+n-o(", "-a)"]),
        derivationType: "causative",
        expectedSubtype: "type-one",
        sourceStem: "tomi",
        sourceSubject: "1sg",
        targetSubject: "1sg",
        sourceValence: "intransitive",
        verbClass: "B",
        sourceObjectRequests: Object.freeze([]),
        expectedTargetStem: "tom-a",
        expectedFormula: "#ni-0+n-o(tom-a)0+0-0#",
    }),
    Object.freeze({
        id: "l25-8571-chihua-type-two-causative",
        lesson: 25,
        section: "25.11.1",
        lineStart: 8570,
        lineEnd: 8578,
        evidenceTokens: Object.freeze(["Active source: nicchīhua", "Causative transform: tinēchchīhualtia", "chihua-l-tia", "shuntline"]),
        derivationType: "causative",
        expectedSubtype: "type-two",
        sourceStem: "chihua",
        sourceSubject: "1sg",
        targetSubject: "2sg",
        sourceValence: "specific-projective",
        verbClass: "A",
        sourceObjectRequests: Object.freeze([
            Object.freeze({ objectId: "source-object-1", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 }),
        ]),
        expectedTargetStem: "chīhua-l-tiā",
        canvasFormulaTranscription: "#ti-Ø+n-ēch+Ø-Ø(chihua-l-tia)Ø+Ø-Ø#",
        expectedFormula: "#ti-0+n-ech+0-0(chihua-l-tia)0+0-0#",
    }),
    Object.freeze({
        id: "l26-9321-xeloa-type-two-applicative",
        lesson: 26,
        section: "26.16.2",
        lineStart: 9318,
        lineEnd: 9325,
        evidenceTokens: Object.freeze(["only the mainline", "applicative object to be overt", "Single-object source: nicxeloa", "Applicative transform: nimitzxelhuia", "xel-huia"]),
        derivationType: "applicative",
        expectedSubtypePrefix: "type-two",
        sourceStem: "xeloa",
        sourceSubject: "1sg",
        targetSubject: "1sg",
        sourceValence: "specific-projective",
        verbClass: "C",
        sourceObjectRequests: Object.freeze([
            Object.freeze({ objectId: "source-object-1", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 }),
        ]),
        applicativeObjectKind: "specific-projective",
        applicativeObjectPerson: "2sg",
        expectedTargetStem: "xel-huiā",
        expectedFormula: "#ni-0+m-itz+0-0(xel-huia)0+0-0#",
    }),
]);

function getSourceObjectKind(example = {}) {
    return example.sourceObjectRequests?.[0]?.objectKind || "none";
}

function buildSourceMachineryFrame(context, example) {
    const firstObject = example.sourceObjectRequests?.[0] || null;
    const lesson7 = context.buildClassicalNahuatlLesson7VerbstemClassFrame(example.sourceStem, {
        subject: example.sourceSubject,
        mood: "indicative",
        tense: "present",
        verbClass: example.verbClass,
        perfectiveClass: example.verbClass,
        valence: example.sourceValence,
        transitivity: example.sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: getSourceObjectKind(example),
        objectPerson: firstObject?.objectPerson || "",
    });
    if ((example.sourceObjectRequests?.length || 0) < 2) {
        return lesson7;
    }
    return context.buildClassicalNahuatlLesson23MultipleObjectVncFrame(lesson7, {
        objectRequests: example.sourceObjectRequests,
    });
}

function buildCanvasExampleFrame(context, example) {
    const sourceMachineryFrame = buildSourceMachineryFrame(context, example);
    const optionInventory = context.getClassicalNahuatlVncDerivationOptionInventory(sourceMachineryFrame, {
        derivationType: example.derivationType,
        sourceValence: example.sourceValence,
        verbClass: example.verbClass,
    });
    const selectedOption = (optionInventory.options || []).find((option) => (
        option.targetStem === example.expectedTargetStem
        && (!example.expectedSubtype
            || option.subtype === example.expectedSubtype
            || option.derivationSubtype === example.expectedSubtype)
        && (!example.expectedSubtypePrefix || option.derivationSubtype.startsWith(example.expectedSubtypePrefix))
    ));
    const operationFrame = context.deriveClassicalNahuatlVncDerivationOperationFrame(sourceMachineryFrame, {
        derivationType: example.derivationType,
        optionId: selectedOption?.optionId || "missing-canvas-option",
        targetSubject: example.targetSubject,
        applicativeObjectKind: example.applicativeObjectKind || "specific-projective",
        applicativeObjectPerson: example.applicativeObjectPerson || "",
    });
    const machineryFrame = context.buildClassicalNahuatlDerivedVncMachineryFrame(
        sourceMachineryFrame,
        operationFrame,
        {
            mood: "indicative",
            tense: "present",
            targetSubject: example.targetSubject,
            sentenceOptions: {},
        }
    );
    return {
        sourceMachineryFrame,
        optionInventory,
        selectedOption,
        operationFrame,
        machineryFrame,
    };
}

function getFormulaRealization(frame = {}) {
    return frame.formulaRealization
        || frame.proofFrame?.conclusion?.formulaRealization
        || frame.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.formulaRealization
        || "";
}

async function auditClassicalLessons24To26CanvasExamples() {
    const { context } = await createModuleRuntime({ rootDir: ROOT });
    const canvasLines = fs.readFileSync(
        path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
        "utf8"
    ).split(/\r?\n/u);
    const results = CANVAS_EXAMPLES.map((example) => {
        const canvasRange = canvasLines.slice(example.lineStart - 1, example.lineEnd).join("\n");
        const missingEvidenceTokens = example.evidenceTokens.filter((token) => !canvasRange.includes(token));
        const built = buildCanvasExampleFrame(context, example);
        const actualFormula = getFormulaRealization(built.machineryFrame);
        const operationTyped = context.isClassicalNahuatlVncDerivationOperationFrame(built.operationFrame);
        const exact = built.machineryFrame?.authorizationStatus === "authorized"
            && operationTyped
            && built.selectedOption?.targetStem === example.expectedTargetStem
            && actualFormula === example.expectedFormula
            && missingEvidenceTokens.length === 0;
        return {
            id: example.id,
            lesson: example.lesson,
            section: example.section,
            lineStart: example.lineStart,
            lineEnd: example.lineEnd,
            sourceStem: example.sourceStem,
            derivationType: example.derivationType,
            derivationSubtype: built.selectedOption?.subtype || built.selectedOption?.derivationSubtype || "",
            selectedOptionId: built.selectedOption?.optionId || "",
            targetStem: built.operationFrame?.targetStem || "",
            operationTyped,
            status: built.machineryFrame?.authorizationStatus || "blocked",
            blockReason: built.machineryFrame?.blockReason || built.operationFrame?.blockReason || "",
            expectedFormula: example.expectedFormula,
            canvasFormulaTranscription: example.canvasFormulaTranscription || example.expectedFormula,
            actualFormula,
            missingEvidenceTokens,
            exact,
        };
    });
    const mismatches = results.filter((result) => !result.exact);
    return {
        kind: "classical-lessons24-26-four-witness-canvas-formula-audit",
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        caseCount: results.length,
        exactFormulaCount: results.length - mismatches.length,
        typedOperationCount: results.filter((result) => result.operationTyped).length,
        missingCanvasEvidenceCount: results.reduce(
            (count, result) => count + result.missingEvidenceTokens.length,
            0
        ),
        mismatchCount: mismatches.length,
        mismatches,
        results,
    };
}

async function main() {
    const report = await auditClassicalLessons24To26CanvasExamples();
    const summary = process.argv.includes("--summary")
        ? { ...report, results: undefined }
        : report;
    process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
    process.exitCode = report.mismatchCount || report.missingCanvasEvidenceCount ? 1 : 0;
}

if (require.main === module) {
    main().catch((error) => {
        process.stderr.write(`${error?.stack || error}\n`);
        process.exitCode = 1;
    });
}

module.exports = {
    CANVAS_EXAMPLES,
    auditClassicalLessons24To26CanvasExamples,
    buildCanvasExampleFrame,
    buildSourceMachineryFrame,
    getFormulaRealization,
};
