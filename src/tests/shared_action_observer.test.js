"use strict";

const {
    countRenderingClassicalConstructionCalls,
    countRenderingOptionalClassicalDependencies,
    evaluateAlignment,
    pathMatchesClaim,
    validateResponsibility,
    validateSharedAction,
} = require("../../scripts/lib/shared_action_observer");
const { createSuite } = require("./runner");

function run() {
    const s = createSuite("shared_action_observer");

    s.eq(
        "renderer grammar constructors are visible",
        countRenderingClassicalConstructionCalls(`
            function buildClassicalNahuatlLocalView() { return null; }
            const frame = buildClassicalNahuatlLesson20Frame(input);
            const valid = isClassicalNahuatlLesson20Frame(frame);
        `),
        1
    );
    s.eq(
        "optional required Classical dependency is visible",
        countRenderingOptionalClassicalDependencies(`
            const frame = typeof buildClassicalNahuatlLesson20Frame === "function"
                ? buildClassicalNahuatlLesson20Frame(input)
                : null;
        `),
        1
    );
    s.ok("directory claim covers descendants", pathMatchesClaim("src/ui/rendering/rendering.mjs", "src/ui/"));
    s.no("unrelated claim stays uncovered", pathMatchesClaim("src/core/a.mjs", "src/ui/"));

    const supportedResponsibility = {
        id: "presentation",
        statement: "Render completed results.",
        primaryActor: "presentation",
        alignmentStatus: "support-added",
        actors: [
            { actorId: "presentation", kind: "primary", status: "active" },
            {
                actorId: "adapter",
                kind: "supporting",
                status: "active",
                addedBy: "coordinator",
                triggerFinding: "renderer owned grammar",
                contribution: "provide application result",
                alignmentEvidence: "constructor count falls",
                exitCondition: "renderer consumes result directly",
            },
        ],
    };
    s.eq("Coordinator-added actor satisfies shared responsibility", validateResponsibility(supportedResponsibility), []);
    s.ok(
        "misaligned responsibility without added actor is rejected",
        validateResponsibility({
            ...supportedResponsibility,
            actors: supportedResponsibility.actors.slice(0, 1),
        }).includes("coordinator-added-supporting-actor-required")
    );

    const actionFindings = validateSharedAction({
        id: "test-action",
        status: "active",
        incentive: { unchanged: true },
        coordinator: { actorId: "manager", mayAddSupportingActors: true },
        responsibilities: [{
            ...supportedResponsibility,
            paths: ["src/ui/"],
        }],
    }, ["src/ui/rendering/rendering.mjs", "src/core/classical/example.mjs"]);
    s.ok(
        "uncovered changed domain requires coordination",
        actionFindings.some((finding) => finding.code === "COORDINATION_REQUIRED")
    );

    const policy = {
        mode: "shadow",
        rules: [{
            id: "renderer-growth",
            metric: "renderingDirectClassicalConstructionCalls",
            direction: "nonincreasing",
            severity: "waiver-required",
            validIncentive: "render result",
            misalignedAction: "construct grammar",
            missingSupport: "application boundary",
        }],
    };
    const report = evaluateAlignment(
        policy,
        { renderingDirectClassicalConstructionCalls: 2 },
        { renderingDirectClassicalConstructionCalls: 3, actionFindings: [] }
    );
    s.eq("shadow observer reports shared action", report.status, "SHARED_ACTION_REQUIRED");
    s.no("shadow observer does not punish before support exists", report.shouldFail);
    s.eq("observer preserves valid incentive", report.metricFindings[0].validIncentive, "render result");
    s.eq("observer names missing support", report.metricFindings[0].missingSupport, "application boundary");

    const enforcedReport = evaluateAlignment(
        { ...policy, mode: "enforce" },
        { renderingDirectClassicalConstructionCalls: 2 },
        { renderingDirectClassicalConstructionCalls: 3, actionFindings: [] }
    );
    s.eq("enforced waiver-required deviation fails closed", enforcedReport.status, "HARD_INVARIANT_FAILED");
    s.ok("enforced waiver-required deviation blocks readiness", enforcedReport.shouldFail);

    const actionFailureReport = evaluateAlignment(
        { mode: "enforce", rules: [] },
        {},
        { actionFindings }
    );
    s.eq("an uncovered shared action fails closed", actionFailureReport.status, "HARD_INVARIANT_FAILED");
    s.ok("an uncovered shared action blocks readiness", actionFailureReport.shouldFail);

    return s;
}

module.exports = { run };
