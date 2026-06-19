"use strict";

const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BUNDLED_PYTHON = "/Users/jaimenunez/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";
const DEFAULT_TERMS = Object.freeze(["deverbal nounstem", "denominal verbstem", "deverbal verbstem", "nounstem", "verbstem"]);

function parseArgs(argv) {
    const args = {
        python: process.env.CODEX_PYTHON || (fs.existsSync(BUNDLED_PYTHON) ? BUNDLED_PYTHON : "python3"),
        terms: [],
        minPage: 20,
        maxPage: 677,
        limit: 40,
        includeCovered: false,
    };
    for (let index = 0; index < argv.length; index += 1) {
        const value = argv[index];
        if (value === "--python") {
            args.python = argv[index + 1] || args.python;
            index += 1;
        } else if (value === "--min-page") {
            args.minPage = Number.parseInt(argv[index + 1] || "", 10);
            index += 1;
        } else if (value === "--max-page") {
            args.maxPage = Number.parseInt(argv[index + 1] || "", 10);
            index += 1;
        } else if (value === "--limit") {
            args.limit = Number.parseInt(argv[index + 1] || "", 10);
            index += 1;
        } else if (value === "--include-covered") {
            args.includeCovered = true;
        } else if (value) {
            args.terms.push(value);
        }
    }
    if (!args.terms.length) {
        args.terms = Array.from(DEFAULT_TERMS);
    }
    if (!Number.isFinite(args.minPage)) {
        args.minPage = 20;
    }
    if (!Number.isFinite(args.maxPage)) {
        args.maxPage = 677;
    }
    if (!Number.isFinite(args.limit) || args.limit < 0) {
        args.limit = 40;
    }
    return args;
}

function runJson(command, args) {
    return JSON.parse(execFileSync(command, args, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
    }));
}

function sumTermCounts(termCounts = {}) {
    return Object.values(termCounts).reduce((sum, count) => sum + Number(count || 0), 0);
}

function uniqueSorted(values) {
    return Array.from(new Set(values.filter((value) => value !== "" && value !== null && value !== undefined)))
        .sort((left, right) => {
            if (typeof left === "number" && typeof right === "number") {
                return left - right;
            }
            return String(left).localeCompare(String(right));
        });
}

function buildPageIndex(obstacleCatalog = []) {
    const pageIndex = new Map();
    for (const entry of obstacleCatalog) {
        for (const rawPage of entry.pdfPages || []) {
            const page = Number(rawPage);
            if (!Number.isFinite(page)) {
                continue;
            }
            if (!pageIndex.has(page)) {
                pageIndex.set(page, []);
            }
            pageIndex.get(page).push({
                id: entry.id || "",
                routeId: entry.routeId || "",
                sourceRefs: Array.isArray(entry.sourceRefs) ? Array.from(entry.sourceRefs) : [],
            });
        }
    }
    return pageIndex;
}

function rankCluster(cluster, pageIndex) {
    const page = Number(cluster.page);
    const obstacles = pageIndex.get(page) || [];
    const termTotal = sumTermCounts(cluster.termCounts || {});
    const sectionRefs = Array.isArray(cluster.sectionRefs) ? cluster.sectionRefs : [];
    const routeIds = uniqueSorted(obstacles.map((entry) => entry.routeId));
    const obstacleIds = uniqueSorted(obstacles.map((entry) => entry.id));
    const covered = obstacles.length > 0;
    const uncoveredWeight = covered ? 0 : 8;
    const narrowCoverageWeight = covered && routeIds.length === 1 && termTotal > obstacles.length ? 3 : 0;
    const score = termTotal + sectionRefs.length + uncoveredWeight + narrowCoverageWeight;
    return {
        page,
        score,
        covered,
        termCounts: cluster.termCounts || {},
        sectionRefs,
        header: cluster.header || "",
        routeIds,
        obstacleIds,
    };
}

function buildPressurePayload({ audit = {}, clusters = {}, terms = [], minPage = 20, maxPage = 677, limit = 40, includeCovered = false } = {}) {
    const obstacleCatalog = Array.isArray(audit.obstacleCatalog) ? audit.obstacleCatalog : [];
    const pageIndex = buildPageIndex(obstacleCatalog);
    const pressurePages = (clusters.clusters || [])
        .map((cluster) => rankCluster(cluster, pageIndex))
        .filter((entry) => entry.page >= minPage && entry.page <= maxPage)
        .filter((entry) => includeCovered || !entry.covered)
        .sort((left, right) => {
            if (right.score !== left.score) {
                return right.score - left.score;
            }
            return left.page - right.page;
        });
    return {
        kind: "andrews-pdf-stem-pressure",
        terms,
        catalogObstacleCount: audit.obstacleCatalogCount,
        catalogPageCount: audit.obstacleCatalogPageCount,
        pageRange: { minPage, maxPage },
        includeCovered,
        pressurePageCount: pressurePages.length,
        pressureLimit: limit,
        pressurePages: pressurePages.slice(0, limit),
    };
}

function main() {
    const args = parseArgs(process.argv.slice(2));
    const audit = runJson(process.execPath, [path.join(ROOT, "scripts/audit_cnv_cnn_back_and_forth.js")]);
    const clusters = runJson(args.python, [
        path.join(ROOT, "scripts/search_andrews_pdf_terms.py"),
        "--clusters",
        ...args.terms,
    ]);
    console.log(JSON.stringify(buildPressurePayload({
        audit,
        clusters,
        terms: args.terms,
        minPage: args.minPage,
        maxPage: args.maxPage,
        limit: args.limit,
        includeCovered: args.includeCovered,
    }), null, 2));
}

if (require.main === module) {
    main();
}

module.exports = {
    DEFAULT_TERMS,
    parseArgs,
    sumTermCounts,
    uniqueSorted,
    buildPageIndex,
    rankCluster,
    buildPressurePayload,
};
