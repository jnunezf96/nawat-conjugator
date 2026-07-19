"use strict";

const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

const CLASSICAL_CONSTRUCTION_PREFIX = "(?:build|derive|resolve|evaluate|finalize|apply)ClassicalNahuatl";
const CLASSICAL_CONSTRUCTION_CALL = new RegExp(`\\b${CLASSICAL_CONSTRUCTION_PREFIX}[A-Za-z0-9_]*\\s*\\(`, "gu");
const OPTIONAL_CLASSICAL_DEPENDENCY = new RegExp(`typeof\\s+${CLASSICAL_CONSTRUCTION_PREFIX}[A-Za-z0-9_]*\\s*===\\s*[\"']function[\"']`, "gu");
const CONTRACT_KIND_LITERAL = /\bkind\s*:\s*["']([^"']+)["']/gu;
const REGISTERED_CONTRACT_KIND = /\bcontractKind\s*:\s*["']([^"']+)["']/gu;

function readText(filePath) {
    try {
        return fs.readFileSync(filePath, "utf8");
    } catch (_error) {
        return "";
    }
}

function readJson(filePath, fallback = null) {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (_error) {
        return fallback;
    }
}

function countMatches(source = "", pattern) {
    return Array.from(String(source || "").matchAll(pattern)).length;
}

function countRenderingClassicalConstructionCalls(source = "") {
    return String(source || "")
        .split(/\r?\n/u)
        .filter((line) => !/^\s*function\s+/u.test(line))
        .reduce((total, line) => total + countMatches(line, CLASSICAL_CONSTRUCTION_CALL), 0);
}

function countRenderingOptionalClassicalDependencies(source = "") {
    return countMatches(source, OPTIONAL_CLASSICAL_DEPENDENCY);
}

function extractContractKinds(source = "") {
    return Array.from(String(source || "").matchAll(CONTRACT_KIND_LITERAL), (match) => match[1]);
}

function extractRegisteredContractKinds(source = "") {
    return Array.from(String(source || "").matchAll(REGISTERED_CONTRACT_KIND), (match) => match[1]);
}

function walkFiles(rootPath, predicate = () => true) {
    if (!fs.existsSync(rootPath)) {
        return [];
    }
    const result = [];
    const stack = [rootPath];
    while (stack.length) {
        const current = stack.pop();
        const stat = fs.statSync(current);
        if (stat.isDirectory()) {
            fs.readdirSync(current).sort().reverse().forEach((name) => {
                stack.push(path.join(current, name));
            });
            continue;
        }
        if (predicate(current)) {
            result.push(current);
        }
    }
    return result.sort();
}

function runGit(rootDir, args) {
    try {
        return childProcess.execFileSync("git", args, {
            cwd: rootDir,
            encoding: "utf8",
            maxBuffer: 64 * 1024 * 1024,
            stdio: ["ignore", "pipe", "ignore"],
        }).trim();
    } catch (_error) {
        return "";
    }
}

function getChangedPaths(rootDir) {
    const tracked = runGit(rootDir, ["diff", "--name-only", "HEAD", "--"])
        .split(/\r?\n/u)
        .filter(Boolean);
    const untracked = runGit(rootDir, ["ls-files", "--others", "--exclude-standard"])
        .split(/\r?\n/u)
        .filter(Boolean);
    return Array.from(new Set([...tracked, ...untracked])).sort();
}

function pathMatchesClaim(filePath = "", claim = "") {
    const normalizedFile = String(filePath || "").replaceAll("\\", "/");
    const normalizedClaim = String(claim || "").replaceAll("\\", "/");
    if (!normalizedFile || !normalizedClaim) {
        return false;
    }
    if (normalizedClaim.endsWith("/")) {
        return normalizedFile.startsWith(normalizedClaim);
    }
    if (normalizedClaim.includes("*")) {
        const escaped = normalizedClaim
            .split("*")
            .map((part) => part.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"))
            .join(".*");
        return new RegExp(`^${escaped}$`, "u").test(normalizedFile);
    }
    return normalizedFile === normalizedClaim || normalizedFile.startsWith(normalizedClaim);
}

function validateResponsibility(responsibility = {}) {
    const failures = [];
    const actors = Array.isArray(responsibility.actors) ? responsibility.actors : [];
    const primaryActors = actors.filter((actor) => actor?.kind === "primary" && actor?.status !== "retired");
    if (!responsibility.id || !responsibility.statement) {
        failures.push("responsibility-id-and-statement-required");
    }
    if (!responsibility.primaryActor || !primaryActors.some((actor) => actor.actorId === responsibility.primaryActor)) {
        failures.push("active-primary-actor-required");
    }
    if (responsibility.alignmentStatus === "support-added") {
        const validSupportingActor = actors.some((actor) => (
            actor?.kind === "supporting"
            && actor?.status === "active"
            && actor?.addedBy
            && actor?.triggerFinding
            && actor?.contribution
            && actor?.alignmentEvidence
            && actor?.exitCondition
        ));
        if (!validSupportingActor) {
            failures.push("coordinator-added-supporting-actor-required");
        }
    }
    return failures;
}

function validateSharedAction(action = {}, changedPaths = []) {
    const findings = [];
    const responsibilities = Array.isArray(action.responsibilities) ? action.responsibilities : [];
    if (!action.id || !action.status || action.incentive?.unchanged !== true) {
        findings.push({
            code: "HARD_INVARIANT_FAILED",
            id: "malformed-shared-action",
            message: "Shared action requires id, status, and an explicitly unchanged valid incentive.",
        });
    }
    if (!action.coordinator?.actorId || action.coordinator?.mayAddSupportingActors !== true) {
        findings.push({
            code: "HARD_INVARIANT_FAILED",
            id: "missing-coordinator",
            message: "Shared action requires a Coordinator who may add supporting actors.",
        });
    }
    responsibilities.forEach((responsibility) => {
        validateResponsibility(responsibility).forEach((failure) => {
            findings.push({
                code: "SUPPORT_MISSING",
                id: `${action.id}:${responsibility.id || "unknown"}:${failure}`,
                message: `Responsibility ${responsibility.id || "<unknown>"} is missing required actor support: ${failure}.`,
            });
        });
    });
    if (action.status !== "complete") {
        changedPaths.forEach((changedPath) => {
            const covered = responsibilities.some((responsibility) => (
                (Array.isArray(responsibility.paths) ? responsibility.paths : [])
                    .some((claim) => pathMatchesClaim(changedPath, claim))
            ));
            if (!covered) {
                findings.push({
                    code: "COORDINATION_REQUIRED",
                    id: `${action.id}:uncovered:${changedPath}`,
                    message: `Changed path ${changedPath} has no responsible actor in the active shared action.`,
                });
            }
        });
    }
    if (action.status === "complete") {
        const openResponsibilities = responsibilities.filter((responsibility) => (
            responsibility.alignmentStatus !== "aligned"
            || (responsibility.actors || []).some((actor) => actor.status === "active" && actor.kind === "supporting")
        ));
        const openRetirements = (action.retirements || []).filter((retirement) => retirement.status !== "complete");
        if (openResponsibilities.length || openRetirements.length || action.closure?.oldAuthorityRemoved !== true) {
            findings.push({
                code: "CLOSURE_INCOMPLETE",
                id: `${action.id}:premature-completion`,
                message: "Shared action is marked complete while actor support, retirements, or old authority remain open.",
            });
        }
    }
    return findings;
}

function loadActiveSharedActions(rootDir, relativeDirectory) {
    const directory = path.join(rootDir, relativeDirectory || "docs/shared_actions/active");
    return walkFiles(directory, (filePath) => filePath.endsWith(".json"))
        .map((filePath) => ({
            path: path.relative(rootDir, filePath),
            action: readJson(filePath, {}),
        }));
}

function collectMetrics(rootDir, policy = {}) {
    const renderingSource = readText(path.join(rootDir, "src/ui/rendering/rendering.mjs"));
    const indexSource = readText(path.join(rootDir, "index.html"));
    const liveTargetSource = readText(path.join(rootDir, policy.liveTargetPath || "docs/CURRENT_TARGET.md"));
    const classicalFiles = [
        ...walkFiles(path.join(rootDir, "src/core/classical"), (filePath) => filePath.endsWith(".mjs")),
        ...walkFiles(path.join(rootDir, "src/application/classical"), (filePath) => filePath.endsWith(".mjs")),
    ];
    const allContractKinds = new Set(classicalFiles.flatMap((filePath) => extractContractKinds(readText(filePath))));
    const catalogFiles = walkFiles(path.join(rootDir, "src/core/grammar"), (filePath) => filePath.endsWith(".mjs"));
    const registeredKinds = new Set(catalogFiles.flatMap((filePath) => extractRegisteredContractKinds(readText(filePath))));
    const changedPaths = getChangedPaths(rootDir);
    const activeActions = loadActiveSharedActions(rootDir, policy.activeActionDirectory);
    const actionFindings = activeActions.flatMap(({ action }) => validateSharedAction(action, changedPaths));
    const trackedReportFiles = runGit(rootDir, ["ls-files", "reports"])
        .split(/\r?\n/u)
        .filter(Boolean).length;
    return {
        renderingDirectClassicalConstructionCalls: countRenderingClassicalConstructionCalls(renderingSource),
        renderingOptionalClassicalDependencies: countRenderingOptionalClassicalDependencies(renderingSource),
        unregisteredClassicalContractKinds: Array.from(allContractKinds).filter((kind) => !registeredKinds.has(kind)).length,
        browserScriptCount: countMatches(indexSource, /<script\b/gu),
        liveTargetLines: liveTargetSource ? liveTargetSource.split(/\r?\n/u).length : 0,
        trackedReportFiles,
        responsibilityAlignmentFailures: actionFindings.filter((finding) => finding.code === "SUPPORT_MISSING" || finding.code === "HARD_INVARIANT_FAILED").length,
        changedPathCount: changedPaths.length,
        activeSharedActionCount: activeActions.length,
        changedPaths,
        actionFindings,
        contractKindCount: allContractKinds.size,
        registeredContractKindCount: registeredKinds.size,
    };
}

function evaluateMetricRule(rule = {}, baseline = {}, current = {}) {
    const value = Number(current[rule.metric]) || 0;
    const baselineValue = Number(baseline[rule.metric]) || 0;
    let deviates = false;
    if (rule.direction === "nonincreasing") {
        deviates = value > baselineValue;
    } else if (rule.direction === "bounded") {
        deviates = value > Number(rule.maximum);
    } else if (rule.direction === "zero") {
        deviates = value !== 0;
    }
    return {
        id: rule.id,
        code: deviates
            ? (rule.severity === "waiver-required" ? "SHARED_ACTION_REQUIRED" : "COORDINATION_REQUIRED")
            : "ALIGNED",
        metric: rule.metric,
        value,
        baselineValue,
        delta: value - baselineValue,
        severity: rule.severity,
        validIncentive: rule.validIncentive,
        observedAction: rule.misalignedAction,
        missingSupport: rule.missingSupport,
        deviates,
    };
}

function evaluateAlignment(policy = {}, baseline = {}, current = {}) {
    const metricFindings = (Array.isArray(policy.rules) ? policy.rules : [])
        .map((rule) => evaluateMetricRule(rule, baseline, current));
    const actionFindings = Array.isArray(current.actionFindings) ? current.actionFindings : [];
    const deviations = metricFindings.filter((finding) => finding.deviates);
    const blocking = policy.mode !== "shadow" && [
        ...deviations.filter((finding) => ["blocking", "waiver-required"].includes(finding.severity)),
        ...actionFindings,
    ];
    return {
        kind: "shared-action-alignment-report",
        version: 1,
        mode: policy.mode || "shadow",
        status: blocking.length ? "HARD_INVARIANT_FAILED"
            : (deviations.length || actionFindings.length ? "SHARED_ACTION_REQUIRED" : "ALIGNED"),
        current,
        baseline,
        metricFindings,
        actionFindings,
        blockingCount: blocking.length,
        shouldFail: blocking.length > 0,
    };
}

function formatAlignmentReport(report = {}) {
    const lines = [
        `Shared-action alignment: ${report.status || "UNKNOWN"} (${report.mode || "shadow"})`,
    ];
    (report.metricFindings || []).forEach((finding) => {
        const marker = finding.deviates ? "!" : "✓";
        lines.push(`${marker} ${finding.id}: ${finding.value} (baseline ${finding.baselineValue}, delta ${finding.delta})`);
        if (finding.deviates) {
            lines.push(`  valid incentive: ${finding.validIncentive}`);
            lines.push(`  missing shared support: ${finding.missingSupport}`);
        }
    });
    (report.actionFindings || []).forEach((finding) => {
        lines.push(`! ${finding.code} ${finding.id}: ${finding.message}`);
    });
    return `${lines.join("\n")}\n`;
}

module.exports = {
    collectMetrics,
    countRenderingClassicalConstructionCalls,
    countRenderingOptionalClassicalDependencies,
    evaluateAlignment,
    evaluateMetricRule,
    extractContractKinds,
    extractRegisteredContractKinds,
    formatAlignmentReport,
    getChangedPaths,
    loadActiveSharedActions,
    pathMatchesClaim,
    validateResponsibility,
    validateSharedAction,
};
