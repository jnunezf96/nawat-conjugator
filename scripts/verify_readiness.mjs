#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE_DIR = path.join(ROOT, ".readiness-cache");
const CACHE_SCHEMA_VERSION = 1;
const DEFAULT_JOBS = 2;
const activeChildren = new Set();

// The npm command text and cache schema are already part of every fingerprint.
// Keep orchestration-only edits from invalidating multi-hour grammar proofs.
const RUNNER_INPUTS = [];
const ENGINE_INPUTS = [
    ...RUNNER_INPUTS,
    "data",
    "src",
    "scripts/lib",
    "docs/CLASSICAL_TRANSCRIPTION_RULE_TAGS.json",
];
const CANVAS_INPUTS = [...ENGINE_INPUTS, "ANDREWS_TRANSCRIPTION_CANVAS.md"];
const AUDIT_EXCLUDES = ["src/tests"];

const STAGES = Object.freeze([
    {
        id: "runtime-manifest",
        responsibility: "foundation",
        npmScript: "check:runtime-manifest",
        phase: 0,
        inputs: [...RUNNER_INPUTS, "index.html", "src", "scripts/check_runtime_manifest.js", "scripts/lib"],
        excludes: AUDIT_EXCLUDES,
    },
    {
        id: "alignment",
        responsibility: "foundation",
        npmScript: "audit:alignment",
        phase: 0,
        cacheable: false,
        inputs: [...RUNNER_INPUTS, "config", "docs/CURRENT_TARGET.md", "docs/CODEX_BOARD.md", "docs/shared_actions", "index.html", "src", "scripts/audit_shared_action_alignment.js", "scripts/lib"],
    },
    {
        id: "regular-suite",
        responsibility: "foundation",
        npmScript: "test",
        phase: 1,
        inputs: [...CANVAS_INPUTS, "config", "index.html", "style.css", "scripts/check_grammar_data.js", "scripts/run_tests.js"],
    },
    {
        id: "lesson20",
        responsibility: "canvas-lessons20-22",
        npmScript: "audit:lesson20",
        phase: 1,
        inputs: [...CANVAS_INPUTS, "scripts/audit_classical_lesson20_nonactive_examples.js"],
        excludes: AUDIT_EXCLUDES,
    },
    {
        id: "lessons20-22",
        responsibility: "canvas-lessons20-22",
        npmScript: "audit:lessons20-22",
        phase: 1,
        inputs: [...CANVAS_INPUTS, "scripts/audit_classical_lessons20_22_canvas_examples.js"],
        excludes: AUDIT_EXCLUDES,
    },
    {
        id: "lessons24-25-complete",
        responsibility: "canvas-lessons24-26",
        npmScript: "audit:lessons24-25:complete-examples",
        phase: 1,
        inputs: [...CANVAS_INPUTS, "scripts/audit_classical_lessons24_25_complete_examples.js", "scripts/classical_lessons24_25_canvas_catalog.js"],
        excludes: AUDIT_EXCLUDES,
    },
    {
        id: "lessons24-26-witnesses",
        responsibility: "canvas-lessons24-26",
        npmScript: "audit:lessons24-26:witnesses",
        phase: 1,
        inputs: [...CANVAS_INPUTS, "scripts/audit_classical_lessons24_26_canvas_examples.js"],
        excludes: AUDIT_EXCLUDES,
    },
    {
        id: "lessons24-26-productive",
        responsibility: "canvas-lessons24-26",
        npmScript: "audit:lessons24-26:productive",
        phase: 1,
        inputs: [...CANVAS_INPUTS, "scripts/audit_classical_lessons24_26_productive_rules.js"],
        excludes: AUDIT_EXCLUDES,
    },
    {
        id: "lesson26-complete",
        responsibility: "canvas-lessons24-26",
        npmScript: "audit:lesson26:complete-examples",
        phase: 1,
        inputs: [...CANVAS_INPUTS, "scripts/audit_classical_lesson26_complete_examples.js", "scripts/classical_lesson26_canvas_catalog.js"],
        excludes: AUDIT_EXCLUDES,
    },
    {
        id: "karttunen-evidence",
        responsibility: "lexical-evidence",
        npmScript: "audit:karttunen-derivations",
        phase: 1,
        inputs: [...ENGINE_INPUTS, "scripts/audit_classical_karttunen_1992_derivation_evidence.js"],
        excludes: AUDIT_EXCLUDES,
    },
    {
        id: "browser-delivery",
        responsibility: "browser-delivery",
        npmScript: "smoke:browser",
        phase: 2,
        cacheable: false,
        inputs: [...RUNNER_INPUTS, "index.html", "style.css", "src", "scripts/smoke_modern_browser.mjs"],
        excludes: ["src/tests"],
    },
]);

function normalizeRelative(value) {
    return value.split(path.sep).join("/").replace(/^\.\//u, "");
}

function isExcluded(relativePath, excludes = []) {
    return excludes.some(excluded => relativePath === excluded || relativePath.startsWith(`${excluded}/`));
}

async function collectFiles(inputPaths, excludes = []) {
    const files = new Set();
    const missing = new Set();

    async function visit(absolutePath) {
        const relativePath = normalizeRelative(path.relative(ROOT, absolutePath));
        if (isExcluded(relativePath, excludes)) return;
        let stat;
        try {
            stat = await fs.lstat(absolutePath);
        } catch (error) {
            if (error?.code === "ENOENT") {
                missing.add(relativePath);
                return;
            }
            throw error;
        }
        if (stat.isDirectory()) {
            const entries = await fs.readdir(absolutePath, { withFileTypes: true });
            entries.sort((left, right) => left.name.localeCompare(right.name));
            for (const entry of entries) await visit(path.join(absolutePath, entry.name));
            return;
        }
        if (stat.isFile() || stat.isSymbolicLink()) files.add(relativePath);
    }

    for (const inputPath of inputPaths) await visit(path.join(ROOT, inputPath));
    return { files: [...files].sort(), missing: [...missing].sort() };
}

async function getPackageScripts() {
    const packageJson = JSON.parse(await fs.readFile(path.join(ROOT, "package.json"), "utf8"));
    return packageJson.scripts || {};
}

async function fingerprintStage(stage, packageScripts) {
    const command = packageScripts[stage.npmScript];
    if (!command) throw new Error(`Readiness stage ${stage.id} references missing npm script ${stage.npmScript}`);
    const inventory = await collectFiles(stage.inputs, stage.excludes || []);
    const hash = createHash("sha256");
    hash.update(JSON.stringify({
        cacheSchemaVersion: CACHE_SCHEMA_VERSION,
        stageId: stage.id,
        responsibility: stage.responsibility,
        npmScript: stage.npmScript,
        command,
        inputs: stage.inputs,
        excludes: stage.excludes || [],
        node: process.version,
        platform: process.platform,
        arch: process.arch,
        missing: inventory.missing,
    }));
    for (const relativePath of inventory.files) {
        hash.update(`\0${relativePath}\0`);
        hash.update(await fs.readFile(path.join(ROOT, relativePath)));
    }
    return {
        fingerprint: hash.digest("hex"),
        command,
        inputFileCount: inventory.files.length,
        missingInputs: inventory.missing,
    };
}

function cachePath(stage) {
    return path.join(CACHE_DIR, `${stage.id}.json`);
}

async function readProof(stage) {
    try {
        return JSON.parse(await fs.readFile(cachePath(stage), "utf8"));
    } catch (error) {
        if (error?.code === "ENOENT" || error instanceof SyntaxError) return null;
        throw error;
    }
}

async function writeProof(stage, proof) {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    const target = cachePath(stage);
    const temporary = `${target}.${process.pid}.tmp`;
    await fs.writeFile(temporary, `${JSON.stringify(proof, null, 2)}\n`, "utf8");
    await fs.rename(temporary, target);
}

function streamWithPrefix(stream, target, prefix) {
    let pending = "";
    stream.setEncoding("utf8");
    stream.on("data", chunk => {
        pending += chunk;
        const lines = pending.split(/\r?\n/u);
        pending = lines.pop() || "";
        for (const line of lines) target.write(`[${prefix}] ${line}\n`);
    });
    stream.on("end", () => {
        if (pending) target.write(`[${prefix}] ${pending}\n`);
    });
}

function runNpmScript(stage) {
    return new Promise((resolve, reject) => {
        const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
        const child = spawn(npmCommand, ["run", stage.npmScript], {
            cwd: ROOT,
            env: process.env,
            stdio: ["ignore", "pipe", "pipe"],
        });
        activeChildren.add(child);
        streamWithPrefix(child.stdout, process.stdout, stage.id);
        streamWithPrefix(child.stderr, process.stderr, stage.id);
        child.once("error", reject);
        child.once("exit", (code, signal) => {
            activeChildren.delete(child);
            if (signal) reject(new Error(`${stage.id} terminated by ${signal}`));
            else resolve(code ?? 1);
        });
    });
}

async function inspectStage(stage, packageScripts) {
    const fingerprint = await fingerprintStage(stage, packageScripts);
    const proof = stage.cacheable === false ? null : await readProof(stage);
    const reusable = Boolean(proof
        && proof.cacheSchemaVersion === CACHE_SCHEMA_VERSION
        && proof.stageId === stage.id
        && proof.fingerprint === fingerprint.fingerprint
        && proof.command === fingerprint.command
        && proof.status === "passed");
    return { stage, ...fingerprint, proof, reusable };
}

async function executeStage(inspection, { fresh = false } = {}) {
    const { stage } = inspection;
    if (!fresh && inspection.reusable) {
        process.stdout.write(`[REUSE] ${stage.id} (${stage.responsibility}) ${inspection.fingerprint.slice(0, 12)} passed ${inspection.proof.passedAt}\n`);
        return { stageId: stage.id, status: "reused", fingerprint: inspection.fingerprint };
    }
    process.stdout.write(`[RUN] ${stage.id} (${stage.responsibility}) ${inspection.fingerprint.slice(0, 12)}\n`);
    const startedAt = Date.now();
    const exitCode = await runNpmScript(stage);
    const durationMs = Date.now() - startedAt;
    if (exitCode !== 0) throw new Error(`${stage.id} failed with exit code ${exitCode}`);
    if (stage.cacheable !== false) {
        await writeProof(stage, {
            cacheSchemaVersion: CACHE_SCHEMA_VERSION,
            stageId: stage.id,
            responsibility: stage.responsibility,
            npmScript: stage.npmScript,
            command: inspection.command,
            fingerprint: inspection.fingerprint,
            inputFileCount: inspection.inputFileCount,
            status: "passed",
            passedAt: new Date().toISOString(),
            durationMs,
        });
    }
    process.stdout.write(`[PASS] ${stage.id} ${Math.round(durationMs / 1000)}s${stage.cacheable === false ? " (fresh-only)" : " (proof saved)"}\n`);
    return { stageId: stage.id, status: "executed", fingerprint: inspection.fingerprint, durationMs };
}

async function runPool(inspections, jobs, options) {
    const results = new Array(inspections.length);
    let nextIndex = 0;
    let firstError = null;
    async function worker() {
        while (!firstError) {
            const index = nextIndex;
            nextIndex += 1;
            if (index >= inspections.length) return;
            try {
                results[index] = await executeStage(inspections[index], options);
            } catch (error) {
                firstError = error;
            }
        }
    }
    await Promise.all(Array.from({ length: Math.min(jobs, inspections.length) }, () => worker()));
    if (firstError) throw firstError;
    return results;
}

function parseArguments(argv) {
    const options = { fresh: false, status: false, stages: [], jobs: Number(process.env.READINESS_JOBS || DEFAULT_JOBS) };
    for (let index = 0; index < argv.length; index += 1) {
        const argument = argv[index];
        if (argument === "--fresh") options.fresh = true;
        else if (argument === "--status") options.status = true;
        else if (argument === "--stage") options.stages.push(argv[++index] || "");
        else if (argument === "--jobs") options.jobs = Number(argv[++index]);
        else throw new Error(`Unknown readiness argument: ${argument}`);
    }
    if (!Number.isInteger(options.jobs) || options.jobs < 1 || options.jobs > 4) {
        throw new Error("--jobs must be an integer from 1 to 4");
    }
    return options;
}

async function main() {
    const options = parseArguments(process.argv.slice(2));
    const selected = options.stages.length ? STAGES.filter(stage => options.stages.includes(stage.id)) : [...STAGES];
    const missingStageIds = options.stages.filter(stageId => !STAGES.some(stage => stage.id === stageId));
    if (missingStageIds.length) throw new Error(`Unknown readiness stage(s): ${missingStageIds.join(", ")}`);
    const packageScripts = await getPackageScripts();
    const inspections = await Promise.all(selected.map(stage => inspectStage(stage, packageScripts)));

    if (options.status) {
        for (const inspection of inspections) {
            const status = inspection.stage.cacheable === false ? "fresh-required"
                : inspection.reusable ? `reusable ${inspection.proof.passedAt}` : "missing-or-stale";
            process.stdout.write(`${inspection.stage.id}\t${inspection.stage.responsibility}\t${status}\t${inspection.fingerprint.slice(0, 12)}\n`);
        }
        process.exitCode = inspections.every(inspection => inspection.reusable || inspection.stage.cacheable === false) ? 0 : 1;
        return;
    }

    const results = [];
    for (const phase of [...new Set(inspections.map(inspection => inspection.stage.phase))].sort()) {
        const phaseInspections = inspections.filter(inspection => inspection.stage.phase === phase);
        results.push(...await runPool(phaseInspections, options.jobs, options));
    }
    const reused = results.filter(result => result.status === "reused").length;
    const executed = results.length - reused;
    process.stdout.write(`Readiness passed: ${results.length}/${results.length} stages (${executed} executed, ${reused} content-addressed proofs reused).\n`);
}

function terminateChildren(signal) {
    for (const child of activeChildren) child.kill(signal);
}

process.on("SIGINT", () => {
    terminateChildren("SIGINT");
    process.exitCode = 130;
});
process.on("SIGTERM", () => {
    terminateChildren("SIGTERM");
    process.exitCode = 143;
});

main().catch(error => {
    terminateChildren("SIGTERM");
    process.stderr.write(`${error?.stack || error}\n`);
    process.exitCode = 1;
});
