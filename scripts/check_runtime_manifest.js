#!/usr/bin/env node
"use strict";

const path = require("path");
const { checkRuntimeManifest } = require("./lib/runtime_manifest_check");

const ROOT = path.resolve(__dirname, "..");

function main() {
    const report = checkRuntimeManifest(ROOT);
    const formatArg = process.argv.find((argument) => argument.startsWith("--format=")) || "";
    const format = formatArg.split("=")[1] || "text";
    if (format === "json") {
        process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    } else if (report.findings.length) {
        process.stderr.write(`Runtime manifest check: ${report.findings.length} deviation(s).\n`);
        report.findings.forEach((finding) => {
            const paths = finding.paths.length ? ` [${finding.paths.join(", ")}]` : "";
            process.stderr.write(`- ${finding.id}: ${finding.message}${paths}\n`);
        });
    } else {
        process.stdout.write(
            `Runtime manifest check: aligned (${report.counts.indexModules} browser entry, `
            + `${report.counts.runtimeModules} modules, ${report.counts.runtimeInstallers} installers).\n`
        );
    }
    if (report.findings.length) {
        process.exitCode = 1;
    }
    return report;
}

if (require.main === module) {
    main();
}

module.exports = { main };
