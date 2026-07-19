#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { createModuleRuntime } = require("./lib/module_runtime");

const ROOT = path.resolve(__dirname, "..");

function parseAttributes(source = "") {
    const attributes = {};
    for (const match of source.matchAll(/([\w:-]+)="([^"]*)"/gu)) {
        attributes[match[1]] = match[2];
    }
    return attributes;
}

function readNncSourceExamples() {
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    return Array.from(shell.matchAll(/<option\b([^>]*data-classical-nnc-source-stem="[^"]+"[^>]*)>/gu))
        .map((match) => parseAttributes(match[1]))
        .map((attributes) => ({
            stem: attributes["data-classical-nnc-source-stem"] || "",
            sourceMode: attributes["data-classical-nnc-source-mode"] || "whole-stem",
            sourceEmbedStem: attributes["data-classical-nnc-source-embed"] || "",
            sourceMatrixStem: attributes["data-classical-nnc-source-matrix"] || "",
            nncType: attributes["data-classical-nnc-type"] || "ordinary",
            nncState: attributes["data-classical-nnc-state"] || "absolutive",
            nncNounClass: attributes["data-classical-nnc-class"] || "tl",
            subject: attributes["data-classical-nnc-subject"] || "3common",
            nncNumberForm: attributes["data-classical-nnc-number-form"] || "t-in",
            nncReferent: attributes["data-classical-nnc-referent"] || "animate",
            nncQuantitiveMatrix: attributes["data-classical-nnc-quantitive-matrix"] || "qui",
            nncQuantitiveMatrixForm: attributes["data-classical-nnc-source-matrix"] || "",
        }))
        .filter((example) => example.stem);
}

function product(groups = []) {
    return groups.reduce(
        (rows, values) => rows.flatMap((row) => values.map((value) => [...row, value])),
        [[]]
    );
}

function uniqueStates(states = []) {
    const seen = new Set();
    return states.filter((state) => {
        const key = JSON.stringify(state);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function normalizeNncSelectableState(context, state = {}) {
    let normalized = { ...state };
    for (let pass = 0; pass < 3; pass += 1) {
        const contract = context.getClassicalNncAuthorityOptionContract(normalized);
        const nextSubject = contract.selectedSubject || normalized.subject;
        const nextNumberForm = contract.numberValues.length
            ? (contract.numberValues.includes(normalized.nncNumberForm)
                ? normalized.nncNumberForm
                : contract.numberValues[0])
            : normalized.nncNumberForm;
        const nextMatrixForm = contract.selectedQuantitiveMatrixForm || normalized.nncQuantitiveMatrixForm;
        const nextPredicatePluralization = contract.selectedQuantitivePredicatePluralization
            || normalized.nncQuantitivePredicatePluralization;
        if (nextSubject === normalized.subject
            && nextNumberForm === normalized.nncNumberForm
            && nextMatrixForm === normalized.nncQuantitiveMatrixForm
            && nextPredicatePluralization === normalized.nncQuantitivePredicatePluralization) {
            break;
        }
        normalized = {
            ...normalized,
            subject: nextSubject,
            nncNumberForm: nextNumberForm,
            nncQuantitiveMatrixForm: nextMatrixForm,
            nncQuantitivePredicatePluralization: nextPredicatePluralization,
        };
    }
    const nncAnimacy = normalized.nncReferent === "nonanimate" ? "nonanimate" : "animate";
    return {
        ...normalized,
        nncAnimacy,
        nncMetaphoricalUse: nncAnimacy === "animate" && normalized.nncReferent === "metaphorical",
    };
}

function expandNncContextSelections(context, state = {}) {
    const contract = context.getClassicalNncAuthorityOptionContract(state);
    const doubledValues = contract.doubledFirstPluralAvailable ? [false, true] : [false];
    const dependentInValues = contract.dependentClauseIntroducedByInAvailable ? [false, true] : [false];
    const specialHumanValues = contract.specialHumanUseAvailable ? [false, true] : [false];
    return product([doubledValues, dependentInValues, specialHumanValues]).map(([
        nncDoubledFirstPlural,
        nncDependentClauseIntroducedByIn,
        nncSpecialHumanUse,
    ]) => ({
        ...state,
        nncDoubledFirstPlural,
        nncDependentClauseIntroducedByIn,
        nncSpecialHumanUse,
    }));
}

function buildNncSelectableStates(context, example) {
    const initial = {
        basalUnit: "nnc",
        stem: example.stem,
        sourceEmbedStem: example.sourceEmbedStem,
        sourceMatrixStem: example.sourceMatrixStem,
        nncType: example.nncType,
        nncState: example.nncState,
        nncNounClass: example.nncNounClass,
        nncPossessor: "3sg",
        nncUseShape: "base",
        nncSubclass: example.nncNounClass === "tli" ? "tli-1" : "tl-1a",
        nncNumberForm: example.nncNumberForm,
        nncReferent: example.nncReferent,
        nncQuantitiveMatrix: example.nncQuantitiveMatrix,
        nncQuantitiveMatrixForm: example.nncType === "quantitive" ? example.nncQuantitiveMatrixForm : "",
        nncQuantitivePredicatePluralization: "not-applicable",
        nncClausePosition: "initial",
        sentenceSurfaceMode: "statement",
        polarityMode: "positive",
    };
    const seedContract = context.getClassicalNncAuthorityOptionContract({
        ...initial,
        subject: example.subject,
    });
    const states = [];
    for (const subject of seedContract.subjectValues) {
        for (const nncState of seedContract.stateValues) {
            const subjectContract = context.getClassicalNncAuthorityOptionContract({
                ...initial,
                subject,
                nncState,
            });
            const nounClasses = example.nncType === "ordinary"
                ? subjectContract.nounClassValues
                : [subjectContract.selectedNounClass];
            for (const nncNounClass of nounClasses) {
                const classSeed = context.getClassicalNncAuthorityOptionContract({
                    ...initial,
                    subject,
                    nncState,
                    nncNounClass,
                });
                const subclasses = nncState === "possessive" && classSeed.classBoundSelection.subclassValues.length
                    ? classSeed.classBoundSelection.subclassValues
                    : [classSeed.classBoundSelection.selectedSubclass || initial.nncSubclass];
                for (const nncSubclass of subclasses) {
                    const classContract = context.getClassicalNncAuthorityOptionContract({
                        ...initial,
                        subject,
                        nncState,
                        nncNounClass,
                        nncSubclass,
                    });
                    const useShapes = nncState === "possessive"
                        ? classContract.classBoundSelection.useShapeValues
                        : [classContract.classBoundSelection.selectedUseShape || "base"];
                    const possessors = nncState === "possessive"
                        ? classContract.possessorValues
                        : [initial.nncPossessor];
                    const referents = example.nncType === "ordinary"
                        ? classContract.referentValues
                        : [initial.nncReferent];
                    const positions = example.nncType.startsWith("interrogative-")
                        ? ["initial", "noninitial"]
                        : ["initial"];
                    const matrixForms = classContract.quantitiveMatrixFormValues.length
                        ? classContract.quantitiveMatrixFormValues
                        : [initial.nncQuantitiveMatrixForm];
                    const predicatePluralizations = classContract.quantitivePredicatePluralizationValues.length
                        ? classContract.quantitivePredicatePluralizationValues
                        : [initial.nncQuantitivePredicatePluralization];
                    for (const [nncQuantitiveMatrixForm, nncQuantitivePredicatePluralization] of product([
                        matrixForms,
                        predicatePluralizations,
                    ])) {
                        const quantitiveContract = context.getClassicalNncAuthorityOptionContract({
                            ...initial,
                            subject,
                            nncState,
                            nncNounClass,
                            nncSubclass,
                            nncQuantitiveMatrixForm,
                            nncQuantitivePredicatePluralization,
                        });
                        const numberForms = quantitiveContract.numberValues.length
                            ? quantitiveContract.numberValues
                            : [initial.nncNumberForm];
                        for (const [nncUseShape, nncPossessor, nncNumberForm, nncReferent, nncClausePosition] of product([
                            useShapes,
                            possessors,
                            numberForms,
                            referents,
                            positions,
                        ])) {
                            states.push({
                                ...initial,
                                subject,
                                nncState,
                                nncNounClass,
                                nncSubclass,
                                nncUseShape,
                                nncPossessor,
                                nncNumberForm,
                                nncReferent,
                                nncClausePosition,
                                nncQuantitiveMatrixForm,
                                nncQuantitivePredicatePluralization,
                            });
                        }
                    }
                }
            }
        }
    }
    return uniqueStates(states
        .map((state) => normalizeNncSelectableState(context, state))
        .flatMap((state) => expandNncContextSelections(context, state)));
}

function buildNncPairwiseSelectableStates(context, example) {
    const initial = {
        basalUnit: "nnc",
        stem: example.stem,
        sourceEmbedStem: example.sourceEmbedStem,
        sourceMatrixStem: example.sourceMatrixStem,
        nncType: example.nncType,
        nncState: example.nncState,
        nncNounClass: example.nncNounClass,
        nncPossessor: "3sg",
        nncUseShape: "base",
        nncSubclass: example.nncNounClass === "tli" ? "tli-1" : "tl-1a",
        nncNumberForm: example.nncNumberForm,
        nncReferent: example.nncReferent,
        nncQuantitiveMatrix: example.nncQuantitiveMatrix,
        nncQuantitiveMatrixForm: example.nncType === "quantitive" ? example.nncQuantitiveMatrixForm : "",
        nncQuantitivePredicatePluralization: "not-applicable",
        nncClausePosition: "initial",
        sentenceSurfaceMode: "statement",
        polarityMode: "positive",
    };
    const seedContract = context.getClassicalNncAuthorityOptionContract({
        ...initial,
        subject: example.subject,
    });
    const states = [];
    for (const subject of seedContract.subjectValues) {
        for (const nncState of seedContract.stateValues) {
            const subjectContract = context.getClassicalNncAuthorityOptionContract({ ...initial, subject, nncState });
            const nounClasses = example.nncType === "ordinary"
                ? subjectContract.nounClassValues
                : [subjectContract.selectedNounClass];
            for (const nncNounClass of nounClasses) {
                const classSeed = context.getClassicalNncAuthorityOptionContract({
                    ...initial, subject, nncState, nncNounClass,
                });
                const subclasses = nncState === "possessive" && classSeed.classBoundSelection.subclassValues.length
                    ? classSeed.classBoundSelection.subclassValues
                    : [classSeed.classBoundSelection.selectedSubclass || initial.nncSubclass];
                for (const nncSubclass of subclasses) {
                    const contract = context.getClassicalNncAuthorityOptionContract({
                        ...initial, subject, nncState, nncNounClass, nncSubclass,
                    });
                    const useShapes = nncState === "possessive"
                        ? contract.classBoundSelection.useShapeValues
                        : [contract.classBoundSelection.selectedUseShape || "base"];
                    for (const nncUseShape of useShapes) {
                        const possessors = nncState === "possessive" ? contract.possessorValues : [initial.nncPossessor];
                        const referents = example.nncType === "ordinary"
                            ? (contract.referentValues || ["animate", "nonanimate", "metaphorical"])
                            : [initial.nncReferent];
                        const matrixForms = contract.quantitiveMatrixFormValues.length
                            ? contract.quantitiveMatrixFormValues
                            : [initial.nncQuantitiveMatrixForm];
                        const predicatePluralizations = contract.quantitivePredicatePluralizationValues.length
                            ? contract.quantitivePredicatePluralizationValues
                            : [initial.nncQuantitivePredicatePluralization];
                        for (const [nncQuantitiveMatrixForm, nncQuantitivePredicatePluralization] of product([
                            matrixForms,
                            predicatePluralizations,
                        ])) {
                            const variantContract = context.getClassicalNncAuthorityOptionContract({
                                ...initial,
                                subject,
                                nncState,
                                nncNounClass,
                                nncSubclass,
                                nncQuantitiveMatrixForm,
                                nncQuantitivePredicatePluralization,
                            });
                            const numberForms = variantContract.numberValues.length
                                ? variantContract.numberValues
                                : [initial.nncNumberForm];
                            const base = {
                                ...initial,
                                subject,
                                nncState,
                                nncNounClass,
                                nncSubclass,
                                nncUseShape,
                                nncNumberForm: numberForms[0],
                                nncPossessor: possessors[0],
                                nncReferent: referents[0],
                                nncQuantitiveMatrixForm,
                                nncQuantitivePredicatePluralization,
                            };
                            states.push(base);
                            numberForms.forEach((nncNumberForm) => states.push({ ...base, nncNumberForm }));
                            possessors.forEach((nncPossessor) => states.push({ ...base, nncPossessor }));
                            referents.forEach((nncReferent) => states.push({ ...base, nncReferent }));
                        }
                    }
                }
            }
        }
    }
    return uniqueStates(states
        .map((state) => normalizeNncSelectableState(context, state))
        .flatMap((state) => expandNncContextSelections(context, state)));
}

async function auditNncAuthorityStates(options = {}) {
    const { context } = await createModuleRuntime({ rootDir: ROOT });
    const examples = readNncSourceExamples().filter((example) => (
        (options.includeOrdinary !== false || example.nncType !== "ordinary")
        && (options.includePronominal !== false || example.nncType === "ordinary")
    ));
    const failures = [];
    const intentionallyUnresolved = [];
    let checked = 0;
    for (const example of examples) {
        const selectableStates = options.pairwise === true
            ? buildNncPairwiseSelectableStates(context, example)
            : buildNncSelectableStates(context, example);
        for (const state of selectableStates) {
            checked += 1;
            const surface = context.buildClassicalRuleLogicSurfaceFrame(state);
            if (surface.authorizationStatus !== "authorized") {
                const issue = {
                    stem: example.stem,
                    nncType: example.nncType,
                    subject: state.subject,
                    state: state.nncState,
                    nounClass: state.nncNounClass,
                    subclass: state.nncSubclass,
                    useShape: state.nncUseShape,
                    possessor: state.nncPossessor,
                    numberForm: state.nncNumberForm,
                    quantitiveMatrixForm: state.nncQuantitiveMatrixForm,
                    quantitivePredicatePluralization: state.nncQuantitivePredicatePluralization,
                    referent: state.nncReferent,
                    clausePosition: state.nncClausePosition,
                    blockReason: surface.blockReason,
                };
                if ([
                    "entered-stem-does-not-match-selected-pronominal-nnc-analysis",
                    "itlah-with-human-subject-requires-special-situation-selection",
                    "third-plural-possessor-st2-m-or-n-selection-required",
                ].includes(surface.blockReason)) {
                    const classification = surface.blockReason === "itlah-with-human-subject-requires-special-situation-selection"
                        ? "visible-required-context-selection"
                        : surface.blockReason === "third-plural-possessor-st2-m-or-n-selection-required"
                            ? "visible-required-third-plural-possessor-allomorph-selection"
                            : "visible-source-edit-required-after-exact-matrix-form-selection";
                    intentionallyUnresolved.push({
                        ...issue,
                        classification,
                    });
                } else {
                    failures.push(issue);
                }
            }
        }
    }
    return {
        kind: "classical-authority-engine-consistency-audit",
        scope: "nnc-canvas-source-examples-x-selectable-authority-states",
        checked,
        intentionallyUnresolvedCount: intentionallyUnresolved.length,
        intentionallyUnresolvedSamples: intentionallyUnresolved.slice(0, 10),
        failureCount: failures.length,
        failures,
    };
}

async function main() {
    const report = await auditNncAuthorityStates({
        includeOrdinary: !process.argv.includes("--pronominal-only"),
        includePronominal: !process.argv.includes("--ordinary-only"),
        pairwise: process.argv.includes("--pairwise"),
    });
    const output = process.argv.includes("--summary")
        ? {
            kind: report.kind,
            scope: report.scope,
            checked: report.checked,
            intentionallyUnresolvedCount: report.intentionallyUnresolvedCount,
            intentionallyUnresolvedSamples: report.intentionallyUnresolvedSamples,
            failureCount: report.failureCount,
            failureSamples: report.failures.slice(0, 10),
        }
        : report;
    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
    process.exitCode = report.failureCount ? 1 : 0;
}

if (require.main === module) {
    main().catch((error) => {
        process.stderr.write(`${error?.stack || error}\n`);
        process.exitCode = 1;
    });
}

module.exports = {
    auditNncAuthorityStates,
    buildNncPairwiseSelectableStates,
    buildNncSelectableStates,
    readNncSourceExamples,
};
