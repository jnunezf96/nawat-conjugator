#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const {
    collectMetrics,
    evaluateAlignment,
    formatAlignmentReport,
} = require("./lib/shared_action_observer");

const ROOT = path.resolve(__dirname, "..");
const POLICY_PATH = path.join(ROOT, "config/shared_action_alignment.json");

function readJson(filePath, fallback = {}) {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (_error) {
        return fallback;
    }
}

function main() {
    const policy = readJson(POLICY_PATH);
    const baselinePath = path.join(ROOT, policy.baselinePath || "config/shared_action_alignment.baseline.json");
    const baseline = readJson(baselinePath);
    const current = collectMetrics(ROOT, policy);
    const report = evaluateAlignment(policy, baseline, current);
    const formatArg = process.argv.find((arg) => arg.startsWith("--format=")) || "";
    const format = formatArg.split("=")[1] || "text";
    if (format === "json") {
        process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    } else {
        process.stdout.write(formatAlignmentReport(report));
    }
    if (report.shouldFail) {
        process.exitCode = 1;
    }
}

if (require.main === module) {
    main();
}

module.exports = { main };
