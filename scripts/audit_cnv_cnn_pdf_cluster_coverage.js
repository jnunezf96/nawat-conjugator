"use strict";

const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BUNDLED_PYTHON = "/Users/jaimenunez/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";
const DEFAULT_TERMS = Object.freeze([
    "Nominalization of VNCs",
    "preterit-agentive NNC",
    "customary-present agentive",
    "deverbal nounstem",
    "denominal verbstem",
    "deverbal verbstem",
    "deverbal",
    "denominal",
]);

const TERM_ROUTE_EXPECTATIONS = Object.freeze({
    "nominalization of vncs": Object.freeze(["cnv-predicate-to-cnn-nounstem-nominalization"]),
    "preterit-agentive nnc": Object.freeze([
        "cnv-predicate-to-cnn-nounstem-nominalization",
        "cnv-to-cnn-to-cnv-loop",
    ]),
    "customary-present agentive": Object.freeze(["cnv-predicate-to-cnn-nounstem-nominalization"]),
    "deverbal nounstem": Object.freeze([
        "cnv-core-to-cnn-nounstem-deverbal",
        "cnv-to-cnn-to-cnv-loop",
        "cnn-to-cnv-to-cnn-active-action-loop",
    ]),
    "denominal verbstem": Object.freeze([
        "cnn-nounstem-to-cnv-verbstem-denominal",
        "cnv-to-cnn-to-cnv-loop",
        "cnn-to-cnv-to-cnn-active-action-loop",
        "cnn-to-cnv-to-cnv-deverbal-chain",
    ]),
    "deverbal verbstem": Object.freeze([
        "cnv-verbstem-to-cnv-verbstem-deverbal",
        "cnn-to-cnv-to-cnv-deverbal-chain",
    ]),
    "deverbal": Object.freeze([
        "cnv-predicate-to-cnn-nounstem-nominalization",
        "cnv-core-to-cnn-nounstem-deverbal",
        "cnn-nounstem-to-cnv-verbstem-denominal",
        "cnv-verbstem-to-cnv-verbstem-deverbal",
        "cnv-to-cnn-to-cnv-loop",
        "cnn-to-cnv-to-cnn-active-action-loop",
        "cnn-to-cnv-to-cnv-deverbal-chain",
    ]),
    "denominal": Object.freeze([
        "cnv-predicate-to-cnn-nounstem-nominalization",
        "cnv-core-to-cnn-nounstem-deverbal",
        "cnn-nounstem-to-cnv-verbstem-denominal",
        "cnv-verbstem-to-cnv-verbstem-deverbal",
        "cnv-to-cnn-to-cnv-loop",
        "cnn-to-cnv-to-cnn-active-action-loop",
        "cnn-to-cnv-to-cnv-deverbal-chain",
    ]),
});

function parseArgs(argv) {
    const args = {
        python: process.env.CODEX_PYTHON || (fs.existsSync(BUNDLED_PYTHON) ? BUNDLED_PYTHON : "python3"),
        details: false,
        reviewLimit: 12,
        terms: [],
    };
    for (let index = 0; index < argv.length; index += 1) {
        const value = argv[index];
        if (value === "--python") {
            args.python = argv[index + 1] || args.python;
            index += 1;
        } else if (value === "--details") {
            args.details = true;
        } else if (value === "--review-limit") {
            const parsed = Number.parseInt(argv[index + 1] || "", 10);
            args.reviewLimit = Number.isFinite(parsed) && parsed >= 0 ? parsed : args.reviewLimit;
            index += 1;
        } else if (value === "--all-review-pressure") {
            args.reviewLimit = Infinity;
        } else if (value) {
            args.terms.push(value);
        }
    }
    if (!args.terms.length) {
        args.terms = Array.from(DEFAULT_TERMS);
    }
    return args;
}

function uniqueSorted(values) {
    return Array.from(new Set(values.filter((value) => value !== "" && value !== null && value !== undefined)))
        .sort((a, b) => {
            if (typeof a === "number" && typeof b === "number") {
                return a - b;
            }
            return String(a).localeCompare(String(b));
        });
}

function runJson(command, args) {
    return JSON.parse(execFileSync(command, args, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
    }));
}

function classifyUncoveredPage(page) {
    if (page <= 20 || page >= 678) {
        return "front-or-index-reference";
    }
    if (page < 334) {
        return "earlier-cross-reference";
    }
    if (page > 615) {
        return "later-cross-reference";
    }
    return "needs-route-review";
}

function buildCatalogPageIndex(obstacleCatalog = []) {
    const pageIndex = new Map();
    for (const obstacle of obstacleCatalog) {
        for (const page of obstacle.pdfPages || []) {
            const normalizedPage = Number(page);
            if (!Number.isFinite(normalizedPage)) {
                continue;
            }
            if (!pageIndex.has(normalizedPage)) {
                pageIndex.set(normalizedPage, []);
            }
            pageIndex.get(normalizedPage).push({
                id: obstacle.id || "",
                routeId: obstacle.routeId || "",
                sourceRefs: Array.isArray(obstacle.sourceRefs) ? Array.from(obstacle.sourceRefs) : [],
                requiredProbe: obstacle.requiredProbe || "",
            });
        }
    }
    return pageIndex;
}

function extractSectionRefsFromSourceRefs(sourceRefs = []) {
    return uniqueSorted(
        sourceRefs.flatMap((ref) => {
            const matches = [];
            const pattern = /\b(\d{1,2}\.\d+(?:\.\d+)*)\b/g;
            let match = pattern.exec(String(ref || ""));
            while (match) {
                matches.push(match[1]);
                match = pattern.exec(String(ref || ""));
            }
            return matches;
        })
    );
}

function buildClusterMappings(clusters = [], pageIndex = new Map()) {
    return clusters.map((cluster) => {
        const page = Number(cluster.page);
        const obstacles = pageIndex.get(page) || [];
        const routeIds = uniqueSorted(obstacles.map((entry) => entry.routeId));
        const obstacleIds = uniqueSorted(obstacles.map((entry) => entry.id));
        const sourceRefs = uniqueSorted(obstacles.flatMap((entry) => entry.sourceRefs || []));
        const sourceSectionRefs = extractSectionRefsFromSourceRefs(sourceRefs);
        const clusterSectionRefs = Array.isArray(cluster.sectionRefs) ? Array.from(cluster.sectionRefs) : [];
        const uncatalogedSectionRefs = clusterSectionRefs.filter((sectionRef) => !sourceSectionRefs.includes(sectionRef));
        return {
            page,
            termCounts: cluster.termCounts || {},
            header: cluster.header || "",
            sectionRefs: clusterSectionRefs,
            covered: obstacles.length > 0,
            routeIds,
            obstacleIds,
            sourceRefs,
            sourceSectionRefs,
            uncatalogedSectionRefs,
            coverageKind: obstacles.length === 0
                ? classifyUncoveredPage(page)
                : (routeIds.length > 1 ? "multi-route-cataloged" : "single-route-cataloged"),
        };
    });
}

function sumTermCounts(termCounts = {}) {
    return Object.values(termCounts).reduce((sum, count) => sum + Number(count || 0), 0);
}

function buildRouteCoverage(routeRecords = [], obstacleCatalog = [], clusterMappings = []) {
    return routeRecords.map((record) => {
        const routeObstacles = obstacleCatalog.filter((entry) => entry.routeId === record.id);
        const routePages = uniqueSorted(routeObstacles.flatMap((entry) => (entry.pdfPages || []).map(Number)).filter(Number.isFinite));
        const matchedClusters = clusterMappings.filter((entry) => entry.routeIds.includes(record.id));
        const matchedClusterPages = uniqueSorted(matchedClusters.map((entry) => entry.page));
        return {
            routeId: record.id,
            routeKind: record.routeKind || "",
            transition: record.transition || "",
            obstacleCount: routeObstacles.length,
            catalogPageCount: routePages.length,
            coveredClusterPageCount: matchedClusterPages.length,
            coveredClusterPages: matchedClusterPages,
        };
    });
}

function normalizeTerm(value = "") {
    return String(value || "").trim().toLowerCase();
}

function getExpectedRoutesForTerm(term = "") {
    return Array.from(TERM_ROUTE_EXPECTATIONS[normalizeTerm(term)] || []);
}

function buildTermRouteMismatches(clusterMappings = []) {
    const mismatches = [];
    for (const mapping of clusterMappings) {
        const pageClass = classifyUncoveredPage(mapping.page);
        if (pageClass === "front-or-index-reference") {
            continue;
        }
        for (const [term, count] of Object.entries(mapping.termCounts || {})) {
            if (!Number(count || 0)) {
                continue;
            }
            const expectedRoutes = getExpectedRoutesForTerm(term);
            if (!expectedRoutes.length) {
                continue;
            }
            const matchedExpectedRoutes = expectedRoutes.filter((routeId) => mapping.routeIds.includes(routeId));
            if (matchedExpectedRoutes.length) {
                continue;
            }
            mismatches.push({
                page: mapping.page,
                term,
                count: Number(count || 0),
                routeIds: mapping.routeIds,
                obstacleIds: mapping.obstacleIds,
                expectedRoutes,
            });
        }
    }
    return mismatches;
}

function buildReviewPressurePages(clusterMappings = []) {
    return clusterMappings
        .map((entry) => {
            const termTotal = sumTermCounts(entry.termCounts);
            const sectionRefCount = entry.sectionRefs.length;
            const routeCount = entry.routeIds.length;
            const obstacleCount = entry.obstacleIds.length;
            const pageClass = classifyUncoveredPage(entry.page);
            const reasons = [];
            if (termTotal > 2) {
                reasons.push("multiple-term-hits");
            }
            if (sectionRefCount > 6) {
                reasons.push("many-section-refs");
            }
            if (entry.covered && routeCount === 1 && termTotal > obstacleCount) {
                reasons.push("terms-outnumber-obstacles");
            }
            if (entry.covered && routeCount === 1 && sectionRefCount > Math.max(3, obstacleCount * 3)) {
                reasons.push("section-refs-outnumber-obstacles");
            }
            if (!entry.covered && pageClass === "needs-route-review") {
                reasons.push("uncovered-route-page");
            }
            const score = (
                termTotal
                + Math.ceil(sectionRefCount / 2)
                + (entry.covered && routeCount === 1 ? 1 : 0)
                + (!entry.covered && pageClass === "needs-route-review" ? 3 : 0)
                + Math.max(0, termTotal - obstacleCount)
            );
            return {
                page: entry.page,
                score,
                reasons,
                termCounts: entry.termCounts,
                sectionRefCount,
                sectionRefs: entry.sectionRefs,
                routeIds: entry.routeIds,
                obstacleIds: entry.obstacleIds,
                coverageKind: entry.coverageKind,
            };
        })
        .filter((entry) => (
            entry.reasons.length > 0
            && classifyUncoveredPage(entry.page) !== "front-or-index-reference"
        ))
        .sort((left, right) => {
            if (right.score !== left.score) {
                return right.score - left.score;
            }
            return left.page - right.page;
        });
}

function buildSectionRefGapPages(clusterMappings = []) {
    return clusterMappings
        .filter((entry) => (
            entry.uncatalogedSectionRefs.length > 0
            && classifyUncoveredPage(entry.page) !== "front-or-index-reference"
        ))
        .map((entry) => ({
            page: entry.page,
            termCounts: entry.termCounts,
            routeIds: entry.routeIds,
            obstacleIds: entry.obstacleIds,
            sectionRefs: entry.sectionRefs,
            sourceSectionRefs: entry.sourceSectionRefs,
            uncatalogedSectionRefs: entry.uncatalogedSectionRefs,
        }))
        .sort((left, right) => {
            if (right.uncatalogedSectionRefs.length !== left.uncatalogedSectionRefs.length) {
                return right.uncatalogedSectionRefs.length - left.uncatalogedSectionRefs.length;
            }
            return left.page - right.page;
        });
}

function normalizeReviewLimit(value) {
    if (value === Infinity) {
        return Infinity;
    }
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 12;
}

function buildCoveragePayload({ audit = {}, clusters = {}, terms = [], includeDetails = false, reviewLimit = 12 } = {}) {
    const obstacleCatalog = Array.isArray(audit.obstacleCatalog) ? audit.obstacleCatalog : [];
    const routeRecords = Array.isArray(audit.routeRecords) ? audit.routeRecords : [];
    const pageIndex = buildCatalogPageIndex(obstacleCatalog);
    const catalogPages = new Set(obstacleCatalog.flatMap((entry) => entry.pdfPages || []));
    const clusterPages = (clusters.clusters || []).map((entry) => Number(entry.page)).filter(Number.isFinite);
    const clusterMappings = buildClusterMappings(clusters.clusters || [], pageIndex);
    const coveredClusterPages = uniqueSorted(clusterPages.filter((page) => catalogPages.has(page)));
    const uncoveredClusterPages = uniqueSorted(clusterPages.filter((page) => !catalogPages.has(page)));
    const uncoveredClusterPageClasses = uncoveredClusterPages.reduce((acc, page) => {
        const key = classifyUncoveredPage(page);
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(page);
        return acc;
    }, {});
    const weaklyCatalogedClusterPages = clusterMappings
        .filter((entry) => (
            entry.covered
            && entry.routeIds.length === 1
            && entry.obstacleIds.length === 1
            && (sumTermCounts(entry.termCounts) > 1 || entry.sectionRefs.length > 6)
        ))
        .map((entry) => ({
            page: entry.page,
            routeId: entry.routeIds[0],
            obstacleId: entry.obstacleIds[0],
            termCounts: entry.termCounts,
            sectionRefs: entry.sectionRefs,
        }));
    const termRouteMismatches = buildTermRouteMismatches(clusterMappings);
    const reviewPressurePages = buildReviewPressurePages(clusterMappings);
    const normalizedReviewLimit = normalizeReviewLimit(reviewLimit);
    const sectionRefGapPages = buildSectionRefGapPages(clusterMappings);
    const payload = {
        kind: "andrews-cnv-cnn-pdf-cluster-coverage",
        terms,
        clusterCount: clusters.clusterCount,
        catalogObstacleCount: audit.obstacleCatalogCount,
        catalogPageCount: audit.obstacleCatalogPageCount,
        routeGaps: audit.obstacleCatalogRouteGaps,
        routeCoverage: buildRouteCoverage(routeRecords, obstacleCatalog, clusterMappings),
        coveredClusterPageCount: coveredClusterPages.length,
        coveredClusterPages,
        uncoveredClusterPageCount: uncoveredClusterPages.length,
        uncoveredClusterPages,
        uncoveredClusterPageClasses,
        weaklyCatalogedClusterPageCount: weaklyCatalogedClusterPages.length,
        weaklyCatalogedClusterPages,
        termRouteMismatchCount: termRouteMismatches.length,
        termRouteMismatches,
        reviewPressurePageCount: reviewPressurePages.length,
        reviewPressureLimit: normalizedReviewLimit === Infinity ? "all" : normalizedReviewLimit,
        reviewPressurePages: normalizedReviewLimit === Infinity
            ? reviewPressurePages
            : reviewPressurePages.slice(0, normalizedReviewLimit),
        sectionRefGapPageCount: sectionRefGapPages.length,
        sectionRefGapPages: sectionRefGapPages.slice(0, 12),
    };
    if (includeDetails) {
        payload.clusterMappings = clusterMappings;
    }
    return payload;
}

function main() {
    const args = parseArgs(process.argv.slice(2));
    const audit = runJson(process.execPath, [path.join(ROOT, "scripts/audit_cnv_cnn_back_and_forth.js")]);
    const clusters = runJson(args.python, [
        path.join(ROOT, "scripts/search_andrews_pdf_terms.py"),
        "--clusters",
        ...args.terms,
    ]);
    console.log(JSON.stringify(buildCoveragePayload({
        audit,
        clusters,
        terms: args.terms,
        includeDetails: args.details,
        reviewLimit: args.reviewLimit,
    }), null, 2));
}

if (require.main === module) {
    main();
}

module.exports = {
    DEFAULT_TERMS,
    parseArgs,
    uniqueSorted,
    classifyUncoveredPage,
    buildCatalogPageIndex,
    buildClusterMappings,
    extractSectionRefsFromSourceRefs,
    sumTermCounts,
    buildRouteCoverage,
    normalizeTerm,
    getExpectedRoutesForTerm,
    buildTermRouteMismatches,
    buildReviewPressurePages,
    buildSectionRefGapPages,
    normalizeReviewLimit,
    buildCoveragePayload,
};
