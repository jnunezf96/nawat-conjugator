"use strict";

/**
 * Tests for src/core/calendar/calendar.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("calendar");

    s.eq(
        "Appendix E calendar-name boundary API is exported",
        [
            typeof ctx.buildCalendarNameBoundaryMetadata,
            typeof ctx.classifyCalendarNameCandidate,
            typeof ctx.classifyCalendarNameFalsePositive,
            typeof ctx.getCalendarNameAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildCalendarNameBoundaryMetadata();
    s.eq(
        "calendar-name boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            appendix: boundary.appendix,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "calendar-name-boundary",
            appendix: "E",
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasPersonalNameBoundary: true,
                hasPlaceGentilicBoundary: true,
                hasCalendarNameGeneration: false,
                hasStaticCalendarData: false,
                hasConfirmedFixtureData: false,
                changesNncGeneration: false,
                changesPersonalNameGeneration: false,
                changesPlaceGentilicGeneration: false,
                treatsRoadmapTextAsEvidence: false,
                treatsTranslationLabelsAsEvidence: false,
            },
            questionFields: [
                "calendarKind",
                "calendarCycle",
                "sourceName",
                "nameFunction",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized calendar kind remains unconfirmed without Nawat evidence",
        ctx.classifyCalendarNameCandidate({
            candidate: "calendar roadmap label",
            calendarKind: "day-name",
            calendarCycle: "unknown",
            sourceName: "unknown",
            nameFunction: "date-label",
            falsePositiveSource: "calendar-roadmap-text",
        }),
        {
            kind: "calendar-name-candidate-classification",
            version: 1,
            candidate: "calendar roadmap label",
            calendarKind: "day-name",
            calendarCycle: "unknown",
            sourceName: "unknown",
            nameFunction: "date-label",
            evidenceSource: "",
            falsePositiveSource: "calendar-roadmap-text",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "calendar-name-needs-nawat-evidence",
                "calendar-name-kind-recognized",
                "calendar-name-false-positive-source",
            ],
            boundary,
        }
    );
    s.eq(
        "calendar-name classifiers expose the LCM grammar frame contract",
        (() => {
            const classification = ctx.classifyCalendarNameCandidate({
                candidate: "calendar roadmap label",
                calendarKind: "day-name",
                falsePositiveSource: "calendar-roadmap-text",
            });
            return {
                hasFrame: Boolean(classification.grammarFrame),
                unitKind: classification.frames.unitFrame.unitKind,
                routeStage: classification.frames.routeContract.routeStage,
                generationAllowed: classification.frames.routeContract.generationAllowed,
                diagnosticId: classification.contractDiagnostics[0].id,
                enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(classification, "grammarFrame"),
            };
        })(),
        {
            hasFrame: true,
            unitKind: "calendar-name",
            routeStage: "classify-boundary",
            generationAllowed: false,
            diagnosticId: "calendar-name-needs-nawat-evidence",
            enumerableGrammarFrame: false,
        }
    );

    s.eq(
        "personal-name boundary is not calendar-name evidence",
        ctx.classifyCalendarNameFalsePositive("personal-name-boundary"),
        {
            kind: "calendar-name-false-positive",
            version: 1,
            source: "personal-name-boundary",
            isCalendarNameEvidence: false,
            isPersonalNameNncEvidence: false,
            isPlaceNameNncEvidence: false,
            generationAllowed: false,
            diagnostics: ["calendar-name-false-positive-source"],
            antiConflationRules: ctx.getCalendarNameAntiConflationRules(),
        }
    );

    s.eq(
        "calendar-name metadata carries anti-conflation rules",
        ctx.getCalendarNameAntiConflationRules(),
        [
            "calendar-name boundary metadata is not generation",
            "day, month, year, or cycle labels are not Nawat/Pipil calendar-name fixture data",
            "personal-name NNC boundary metadata is not calendar-name data",
            "place/gentilic boundary metadata and calendar roadmap text are not confirmed calendar names",
            "ordinary NNC fixtures or open-stem previews are not calendar-name evidence",
            "Andrews calendar categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("calendar-name boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("calendar-name boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
