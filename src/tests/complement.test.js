"use strict";

/**
 * Tests for src/core/clause/complement/complement.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("complement");

    s.eq(
        "Lesson 51 complement API is exported",
        [
            typeof ctx.buildComplementClauseBoundaryMetadata,
            typeof ctx.classifyComplementClauseCandidate,
            typeof ctx.classifyComplementClauseFalsePositive,
            typeof ctx.getComplementClauseAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildComplementClauseBoundaryMetadata();
    s.eq(
        "complement boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "complement-clause-boundary",
            lesson: 51,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasVncGeneration: true,
                hasNncGeneration: true,
                hasNominalizationProfileMetadata: true,
                hasComplementAst: false,
                hasConfirmedClauseExamples: false,
                hasStaticComplementData: false,
                changesVncGeneration: false,
                changesNncGeneration: false,
                changesNominalizationGeneration: false,
                changesValencyBehavior: false,
                treatsGeneratedWordAsComplementEvidence: false,
                treatsObjectControlAsComplementEvidence: false,
            },
            questionFields: [
                "principalClause",
                "complement",
                "complementRole",
                "complementUnitType",
                "linkingEvidence",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized complement role remains unconfirmed without Nawat clause evidence",
        ctx.classifyComplementClauseCandidate({
            principalClause: "unknown",
            complement: "single generated word",
            complementRole: "object-complement",
            complementUnitType: "vnc",
            falsePositiveSource: "single-generated-word",
        }),
        {
            kind: "complement-clause-candidate-classification",
            version: 1,
            principalClause: "unknown",
            complement: "single generated word",
            candidate: "",
            complementRole: "object-complement",
            complementUnitType: "vnc",
            linkingEvidence: "",
            evidenceSource: "",
            falsePositiveSource: "single-generated-word",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "complement-clause-needs-nawat-clause-evidence",
                "complement-clause-role-recognized",
                "complement-clause-unit-recognized",
                "complement-clause-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "object controls are not complement evidence",
        ctx.classifyComplementClauseFalsePositive("object-control-label"),
        {
            kind: "complement-clause-false-positive",
            version: 1,
            source: "object-control-label",
            isComplementClauseEvidence: false,
            isComplementAstEvidence: false,
            generationAllowed: false,
            diagnostics: ["complement-clause-false-positive-source"],
            antiConflationRules: ctx.getComplementClauseAntiConflationRules(),
        }
    );

    s.eq(
        "complement metadata carries anti-conflation rules",
        ctx.getComplementClauseAntiConflationRules(),
        [
            "complement-clause boundary metadata is not generation",
            "object controls and subject labels are not complement-clause evidence",
            "ordinary VNC or NNC output is not a complement AST",
            "nominalizationProfile is not a clause-level complement relation",
            "single generated words do not prove object, subject, or adverbial complements",
            "Andrews complementation categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("complement boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("complement boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
