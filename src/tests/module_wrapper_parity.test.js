"use strict";

const childProcess = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "../..");

const CHECKPOINT_WRAPPERS = Object.freeze([
    "src/core/concepts/concepts.mjs",
    "src/core/particles/particles.mjs",
    "src/core/sentence/sentence.mjs",
    "src/core/grammar/frame.mjs",
    "src/core/orthography/orthography.mjs",
    "src/core/derivation/frequentative/frequentative.mjs",
    "src/core/clause/clause.mjs",
    "src/core/clause/modification/modification.mjs",
    "src/core/clause/adverbial/adverbial.mjs",
    "src/core/clause/adjunction/adjunction.mjs",
    "src/core/clause/complement/complement.mjs",
    "src/core/clause/conjunction/conjunction.mjs",
    "src/core/comparison/comparison.mjs",
    "src/core/calendar/calendar.mjs",
    "src/core/analysis/analysis.mjs",
    "src/core/vnc/purposive/purposive.mjs",
    "src/core/vnc/honorific_pejorative/honorific_pejorative.mjs",
    "src/core/nnc/compound/compound.mjs",
    "src/core/nnc/adjectival/adjectival.mjs",
    "src/core/nnc/nominalization/nominalization.mjs",
    "src/core/nnc/numerals/numerals.mjs",
    "src/core/nnc/relational/relational.mjs",
    "src/core/nnc/place_gentilic/place_gentilic.mjs",
    "src/core/nnc/names/names.mjs",
    "src/core/nnc/nnc.mjs",
    "src/core/generation/engine.mjs",
    "src/core/vnc/allomorphy.mjs",
    "src/ui/state.mjs",
    "src/ui/composer/composer.mjs",
    "src/ui/rendering/rendering.mjs",
]);

function parseGeneratedWrapperHeader(source = "") {
    const firstLine = String(source || "").split(/\r?\n/, 1)[0] || "";
    const sourceMatch = firstLine.match(/generated from (.+)\./);
    const exports = Array.from(source.matchAll(/export function\s+([A-Za-z0-9_$]+)\s*\(/g))
        .map((match) => match[1]);
    return {
        sourcePath: sourceMatch ? sourceMatch[1] : "",
        createName: exports[0] || "",
        installName: exports[1] || "",
    };
}

function firstDifferenceIndex(left = "", right = "") {
    const maxLength = Math.max(left.length, right.length);
    for (let index = 0; index < maxLength; index += 1) {
        if (left[index] !== right[index]) {
            return index;
        }
    }
    return -1;
}

function generateWrapperForComparison({
    sourcePath,
    outputPath,
    createName,
    installName,
}) {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nawat-wrapper-parity-"));
    const tmpOutput = path.join(tmpDir, path.basename(outputPath));
    try {
        childProcess.execFileSync(process.execPath, [
            path.join(ROOT, "scripts/generate_native_module_wrapper.mjs"),
            path.join(ROOT, sourcePath),
            tmpOutput,
            createName,
            installName,
        ], {
            cwd: ROOT,
            stdio: "pipe",
        });
        return fs.readFileSync(tmpOutput, "utf8");
    } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    }
}

function getWrapperMismatch(relOutputPath) {
    const outputPath = path.join(ROOT, relOutputPath);
    const currentSource = fs.readFileSync(outputPath, "utf8");
    const header = parseGeneratedWrapperHeader(currentSource);
    if (!header.sourcePath || !header.createName || !header.installName) {
        return {
            outputPath: relOutputPath,
            reason: "unparseable generated wrapper header",
        };
    }
    const generatedSource = generateWrapperForComparison({
        ...header,
        outputPath,
    });
    if (currentSource === generatedSource) {
        return null;
    }
    return {
        outputPath: relOutputPath,
        sourcePath: header.sourcePath,
        firstDifferenceIndex: firstDifferenceIndex(currentSource, generatedSource),
    };
}

function run() {
    const s = createSuite("module_wrapper_parity");

    s.eq(
        "checkpoint wrapper list stays focused",
        CHECKPOINT_WRAPPERS,
        [
            "src/core/concepts/concepts.mjs",
            "src/core/particles/particles.mjs",
            "src/core/sentence/sentence.mjs",
            "src/core/grammar/frame.mjs",
            "src/core/orthography/orthography.mjs",
            "src/core/derivation/frequentative/frequentative.mjs",
            "src/core/clause/clause.mjs",
            "src/core/clause/modification/modification.mjs",
            "src/core/clause/adverbial/adverbial.mjs",
            "src/core/clause/adjunction/adjunction.mjs",
            "src/core/clause/complement/complement.mjs",
            "src/core/clause/conjunction/conjunction.mjs",
            "src/core/comparison/comparison.mjs",
            "src/core/calendar/calendar.mjs",
            "src/core/analysis/analysis.mjs",
            "src/core/vnc/purposive/purposive.mjs",
            "src/core/vnc/honorific_pejorative/honorific_pejorative.mjs",
            "src/core/nnc/compound/compound.mjs",
            "src/core/nnc/adjectival/adjectival.mjs",
            "src/core/nnc/nominalization/nominalization.mjs",
            "src/core/nnc/numerals/numerals.mjs",
            "src/core/nnc/relational/relational.mjs",
            "src/core/nnc/place_gentilic/place_gentilic.mjs",
            "src/core/nnc/names/names.mjs",
            "src/core/nnc/nnc.mjs",
            "src/core/generation/engine.mjs",
            "src/core/vnc/allomorphy.mjs",
            "src/ui/state.mjs",
            "src/ui/composer/composer.mjs",
            "src/ui/rendering/rendering.mjs",
        ]
    );
    s.eq(
        "checkpoint module wrappers are generated from their JS sources",
        CHECKPOINT_WRAPPERS
            .map(getWrapperMismatch)
            .filter(Boolean),
        []
    );

    return s;
}

module.exports = { run };
