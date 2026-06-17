"use strict";

/**
 * Tests for lesson and appendix registry metadata.
 * These registries are user-facing curriculum contracts, not grammar engines.
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "../..");

function loadRegistryConst(relPath, constName) {
    const absPath = path.join(ROOT, relPath);
    let source = fs.readFileSync(absPath, "utf8");
    source = source
        .replace(/export\s+const\s+/g, "const ")
        .replace(/export\s+function\s+/g, "function ");
    const context = {};
    vm.createContext(context);
    vm.runInContext(
        `${source}\nglobalThis.__REGISTRY_VALUE__ = ${constName};`,
        context,
        { filename: absPath }
    );
    return context.__REGISTRY_VALUE__;
}

function statusCounts(lessons) {
    return lessons.reduce((acc, lesson) => {
        acc[lesson.status] = (acc[lesson.status] || 0) + 1;
        return acc;
    }, {});
}

function byId(items) {
    return items.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {});
}

function run() {
    const s = createSuite("registry");

    const lessonRegistry = loadRegistryConst("src/lessons/registry.js", "LESSON_REGISTRY");
    const lessonRegistryMjs = loadRegistryConst("src/lessons/registry.mjs", "LESSON_REGISTRY");
    const trajectoryRedirectActions = loadRegistryConst("src/lessons/registry.js", "ANDREWS_TRAJECTORY_REDIRECT_ACTIONS");
    const trajectoryRedirectActionsMjs = loadRegistryConst("src/lessons/registry.mjs", "ANDREWS_TRAJECTORY_REDIRECT_ACTIONS");
    const trajectoryGroups = loadRegistryConst("src/lessons/registry.js", "ANDREWS_TRAJECTORY_GROUPS");
    const trajectoryGroupsMjs = loadRegistryConst("src/lessons/registry.mjs", "ANDREWS_TRAJECTORY_GROUPS");
    const planPursuitAimStatuses = loadRegistryConst("src/lessons/registry.js", "ANDREWS_PLAN_PURSUIT_AIM_STATUSES");
    const planPursuitAimStatusesMjs = loadRegistryConst("src/lessons/registry.mjs", "ANDREWS_PLAN_PURSUIT_AIM_STATUSES");
    const planPursuitArrowResults = loadRegistryConst("src/lessons/registry.js", "ANDREWS_PLAN_PURSUIT_ARROW_RESULTS");
    const planPursuitArrowResultsMjs = loadRegistryConst("src/lessons/registry.mjs", "ANDREWS_PLAN_PURSUIT_ARROW_RESULTS");
    const appendixRegistry = loadRegistryConst("src/appendices/registry.js", "APPENDIX_REGISTRY");
    const appendixRegistryMjs = loadRegistryConst("src/appendices/registry.mjs", "APPENDIX_REGISTRY");
    const curriculumGroups = loadRegistryConst("src/ui/curriculum/curriculum.js", "CURRICULUM_BOOK_GROUPS");
    const curriculumArchitectureNote = loadRegistryConst("src/ui/curriculum/curriculum.js", "CURRICULUM_ARCHITECTURE_NOTE");
    const getCurriculumMissingCategory = loadRegistryConst("src/ui/curriculum/curriculum.js", "getCurriculumMissingCategory");
    const curriculumSource = fs.readFileSync(path.join(ROOT, "src/ui/curriculum/curriculum.js"), "utf8");

    s.eq("lesson registry js/mjs payloads match", lessonRegistryMjs, lessonRegistry);
    s.eq("Andrews trajectory redirect action constants match", trajectoryRedirectActionsMjs, trajectoryRedirectActions);
    s.eq("Andrews trajectory group constants match", trajectoryGroupsMjs, trajectoryGroups);
    s.eq("Plan/Pursue aim status constants match", planPursuitAimStatusesMjs, planPursuitAimStatuses);
    s.eq("Plan/Pursue arrow result constants match", planPursuitArrowResultsMjs, planPursuitArrowResults);
    s.eq("appendix registry js/mjs payloads match", appendixRegistryMjs, appendixRegistry);
    s.eq("Andrews redirect actions are the fixed governance vocabulary", trajectoryRedirectActions, [
        "keep",
        "rename-visible-ui",
        "reframe-metadata",
        "diagnostic-only",
        "block-generation",
        "refactor-engine",
        "needs-nawat-evidence",
    ]);
    s.eq(
        "Andrews trajectory groups cover the curriculum blocks",
        trajectoryGroups.map((group) => [group.label, group.range, group.validationRefs.includes("src/tests/registry.test.js")]),
        [
            ["Lecciones 1-4", [1, 4], true],
            ["Lecciones 5-11", [5, 11], true],
            ["Lecciones 12-19", [12, 19], true],
            ["Lecciones 20-27", [20, 27], true],
            ["Lecciones 28-34", [28, 34], true],
            ["Lecciones 35-43", [35, 43], true],
            ["Lecciones 44-50", [44, 50], true],
            ["Lecciones 51-58", [51, 58], true],
        ]
    );
    s.eq("Plan/Pursue aim statuses are the fixed step vocabulary", planPursuitAimStatuses, [
        "queued",
        "shooting",
        "blocked",
        "closest-pass",
    ]);
    s.eq("Plan/Pursue arrow results are the fixed shot vocabulary", planPursuitArrowResults, [
        "hit",
        "miss",
    ]);
    const trajectoryDoc = fs.readFileSync(path.join(ROOT, "docs/ANDREWS_TRAJECTORY.md"), "utf8");
    s.ok(
        "Andrews trajectory ledger documents direction and redirection",
        /Directing Rule/.test(trajectoryDoc)
            && /Redirecting Rule/.test(trajectoryDoc)
            && /Plan\/Pursue Rule/.test(trajectoryDoc)
            && /Lessons 1-4/.test(trajectoryDoc)
            && /Lessons 51-58/.test(trajectoryDoc)
            && /block-generation/.test(trajectoryDoc)
    );
    s.ok(
        "curriculum map is labeled as an index, not a lesson-per-engine plan",
        /no es un motor por leccion/.test(curriculumArchitectureNote)
            && /categorias, metadatos, diagnosticos o controles compartidos/.test(curriculumArchitectureNote)
            && curriculumSource.includes('book-map__architecture-note')
            && curriculumSource.includes("getCurriculumMissingCategory(item)")
            && curriculumSource.includes("row.dataset.category = categoryLabel")
            && curriculumSource.includes("row.dataset.target = target")
            && curriculumSource.includes('book-map__missing-category')
            && curriculumSource.includes('Categoria compartida:')
            && curriculumSource.includes("Categoria/metadata; destino tecnico:")
            && curriculumSource.includes('book-map__next-label", "Categorias"')
    );
    const curriculumRows = curriculumGroups.flatMap((group) => group.missing || []);
    s.eq(
        "all current curriculum rows carry explicit grammar categories",
        curriculumRows
            .filter((row) => !row.category)
            .map((row) => `${row.lessons}:${row.label}`),
        []
    );
    s.eq(
        "curriculum row display uses explicit reusable grammar categories",
        [
            getCurriculumMissingCategory(curriculumRows.find((row) => row.lessons === "12-15")),
            getCurriculumMissingCategory(curriculumRows.find((row) => row.lessons === "8")),
            getCurriculumMissingCategory(curriculumRows.find((row) => row.lessons === "27")),
            getCurriculumMissingCategory(curriculumRows.find((row) => row.label === "registro de nounstems relacionales")),
            getCurriculumMissingCategory(curriculumRows.find((row) => row.lessons === "E")),
        ],
        ["NNC", "oracion", "frecuentativo", "relacional", "calendario"]
    );

    s.eq(
        "lesson registry has ids 1-58",
        lessonRegistry.map((lesson) => lesson.id),
        Array.from({ length: 58 }, (_, index) => index + 1)
    );
    s.eq(
        "appendix registry has ids A-G",
        appendixRegistry.map((appendix) => appendix.id),
        ["A", "B", "C", "D", "E", "F", "G"]
    );

    s.eq("lesson registry status counts reflect audited motor scope", statusCounts(lessonRegistry), {
        implemented: 5,
        "partially-implemented": 53,
    });

    const lessons = byId(lessonRegistry);
    const allowedTrajectoryActions = new Set(trajectoryRedirectActions);
    const allowedAimStatuses = new Set(planPursuitAimStatuses);
    const allowedArrowResults = new Set(planPursuitArrowResults);
    const expectedTrajectoryKeys = [
        "aimStatus",
        "closestPass",
        "directive",
        "evidenceStatus",
        "firedArrows",
        "hitCount",
        "implementationState",
        "missCount",
        "orthographyStatus",
        "pdfRefs",
        "plannedArrows",
        "redirectAction",
        "remainingGap",
        "stepNumber",
        "validationRefs",
    ];
    s.eq(
        "every lesson carries an Andrews trajectory contract",
        lessonRegistry
            .filter((lesson) => {
                const trajectory = lesson.trajectory || {};
                const keys = Object.keys(trajectory).sort();
                return JSON.stringify(keys) !== JSON.stringify(expectedTrajectoryKeys)
                    || !Array.isArray(trajectory.pdfRefs)
                    || !trajectory.pdfRefs.some((ref) => new RegExp(`^Andrews Lesson ${lesson.id}(\\b|\\.)`).test(ref))
                    || typeof trajectory.directive !== "string"
                    || !/Andrews/.test(trajectory.directive)
                    || !allowedTrajectoryActions.has(trajectory.redirectAction)
                    || trajectory.stepNumber !== lesson.id
                    || !allowedAimStatuses.has(trajectory.aimStatus)
                    || !Array.isArray(trajectory.plannedArrows)
                    || !trajectory.plannedArrows.length
                    || !Array.isArray(trajectory.firedArrows)
                    || !trajectory.firedArrows.every((arrow) => allowedArrowResults.has(arrow.result))
                    || trajectory.hitCount !== trajectory.firedArrows.filter((arrow) => arrow.result === "hit").length
                    || trajectory.missCount !== trajectory.firedArrows.filter((arrow) => arrow.result === "miss").length
                    || typeof trajectory.remainingGap !== "string"
                    || typeof trajectory.closestPass !== "boolean"
                    || !Array.isArray(trajectory.validationRefs)
                    || trajectory.validationRefs.length === 0;
            })
            .map((lesson) => lesson.id),
        []
    );
    s.eq(
        "lesson trajectory keeps every Andrews lesson as one ordered step",
        lessonRegistry.map((lesson) => lesson.trajectory.stepNumber),
        Array.from({ length: 58 }, (_, index) => index + 1)
    );
    s.eq(
        "implemented lessons are audited and kept by the Andrews trajectory",
        lessonRegistry
            .filter((lesson) => lesson.status === "implemented")
            .map((lesson) => [
                lesson.id,
                lesson.trajectory.implementationState,
                lesson.trajectory.redirectAction,
                lesson.trajectory.aimStatus,
                lesson.trajectory.closestPass,
                lesson.trajectory.remainingGap,
                lesson.trajectory.hitCount,
                lesson.trajectory.missCount,
                lesson.trajectory.validationRefs.some((ref) => /^src\/tests\/|^scripts\//.test(ref)),
            ]),
        [
            [1, "implemented-audited", "keep", "closest-pass", true, "none", 1, 0, true],
            [5, "implemented-audited", "keep", "closest-pass", true, "none", 1, 0, true],
            [6, "implemented-audited", "keep", "closest-pass", true, "none", 1, 0, true],
            [7, "implemented-audited", "keep", "closest-pass", true, "none", 1, 0, true],
            [20, "implemented-audited", "keep", "closest-pass", true, "none", 1, 0, true],
        ]
    );
    s.eq(
        "closest-pass lessons only contain validated hit arrows",
        lessonRegistry
            .filter((lesson) => lesson.trajectory.closestPass)
            .filter((lesson) => {
                const firedArrows = lesson.trajectory.firedArrows;
                return lesson.trajectory.remainingGap !== "none"
                    || !firedArrows.length
                    || firedArrows.some((arrow) => {
                        return arrow.result !== "hit"
                            || !Array.isArray(arrow.andrewsRefs)
                            || !arrow.andrewsRefs.length
                            || !Array.isArray(arrow.feedbackRefs)
                            || !arrow.feedbackRefs.length;
                    });
            })
            .map((lesson) => lesson.id),
        []
    );
    s.eq(
        "partial lessons stay in shooting state with visible gaps",
        lessonRegistry
            .filter((lesson) => lesson.status === "partially-implemented")
            .filter((lesson) => lesson.trajectory.aimStatus !== "shooting" || lesson.trajectory.closestPass || lesson.trajectory.remainingGap === "none")
            .map((lesson) => lesson.id),
        []
    );
    s.eq(
        "foundation lessons are seeded with direct redirect decisions",
        [1, 2, 3, 4].map((lessonId) => [
            lessonId,
            lessons[lessonId].trajectory.pdfRefs[0],
            lessons[lessonId].trajectory.redirectAction,
            lessons[lessonId].trajectory.orthographyStatus,
        ]),
        [
            [1, "Andrews Lesson 1", "keep", "not-surface-bearing"],
            [2, "Andrews Lesson 2.1-2.16", "needs-nawat-evidence", "orthography-bridge-required"],
            [3, "Andrews Lesson 3", "diagnostic-only", "orthography-adapted-seed-only"],
            [4, "Andrews Lesson 4.1-4.6", "reframe-metadata", "not-surface-bearing"],
        ]
    );
    s.eq(
        "not-mapped lessons are redirected away from generation",
        lessonRegistry
            .filter((lesson) => lesson.status === "not-mapped")
            .map((lesson) => [
                lesson.id,
                lesson.trajectory.implementationState,
                lesson.trajectory.redirectAction,
                lesson.trajectory.aimStatus,
                lesson.trajectory.closestPass,
                lesson.trajectory.firedArrows.length,
            ]),
        []
    );
    [2, 3, 4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].forEach((lessonId) => {
        s.eq(`lesson ${lessonId} is partial Andrews coverage`, lessons[lessonId].status, "partially-implemented");
    });
    s.eq("lesson 1 concept glossary layer is implemented as diagnostic UI", lessons[1].status, "implemented");
    s.ok("lesson 1 notes visible concept glossary without generation", /glosario visible de Lección 1/.test(lessons[1].notes) && /no se licencia generación/.test(lessons[1].notes));
    s.ok("lesson 2 notes Classical orthography gap", /ortografía de Andrews\/clásica/.test(lessons[2].notes));
    s.eq(
        "lesson 2 trajectory records the active Plan/Pursue shot",
        {
            plannedArrowIds: lessons[2].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[2].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            remainingGap: lessons[2].trajectory.remainingGap,
            closestPass: lessons[2].trajectory.closestPass,
        },
        {
            plannedArrowIds: ["lesson-2-subsection-coverage-audit"],
            firedArrowIds: [["lesson-2-subsection-coverage-audit", "hit"]],
            remainingGap: "Siguen bloqueadas, solo diagnósticas o pendientes de evidencia Nawat: longitud vocálica, acento/prosodia, consonantes largas, alternancia glotal y elecciones ortográficas sensibles a evidencia.",
            closestPass: false,
        }
    );
    s.eq(
        "lesson 3 trajectory records the active Plan/Pursue shot",
        {
            plannedArrowIds: lessons[3].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[3].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            remainingGap: lessons[3].trajectory.remainingGap,
            closestPass: lessons[3].trajectory.closestPass,
        },
        {
            plannedArrowIds: ["lesson-3-pdf-example-transfer-audit"],
            firedArrowIds: [["lesson-3-pdf-example-transfer-audit", "hit"]],
            remainingGap: "Siguen pendientes de evidencia: inventario local confirmado de partículas Nawat/Pipil, evidencia de colocación y generación; modo Partícula permanece solo diagnóstico.",
            closestPass: false,
        }
    );
    s.ok("lesson 3 notes particle inventory gap", /metadatos de colocación de partículas/.test(lessons[3].notes));
    s.eq(
        "lesson 4 trajectory records the active Plan/Pursue shot",
        {
            plannedArrowIds: lessons[4].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[4].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            remainingGap: lessons[4].trajectory.remainingGap,
            closestPass: lessons[4].trajectory.closestPass,
        },
        {
            plannedArrowIds: ["lesson-4-subsection-coverage-audit"],
            firedArrowIds: [["lesson-4-subsection-coverage-audit", "hit"]],
            remainingGap: "Siguen parciales o pendientes de evidencia: sintaxis oracional, registro de datos de fórmula, contexto de referencia de tercera persona y paradigmas detallados de rellenador de cláusula verbal/nominal.",
            closestPass: false,
        }
    );
    s.ok("lesson 4 notes nuclear-clause shell gap", /envoltura de cláusula nuclear/.test(lessons[4].notes));
    s.eq(
        "lesson 5 trajectory records the intransitive CNV closest-pass shot",
        {
            pdfRefs: lessons[5].trajectory.pdfRefs,
            redirectAction: lessons[5].trajectory.redirectAction,
            evidenceStatus: lessons[5].trajectory.evidenceStatus,
            orthographyStatus: lessons[5].trajectory.orthographyStatus,
            plannedArrowIds: lessons[5].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[5].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            remainingGap: lessons[5].trajectory.remainingGap,
            closestPass: lessons[5].trajectory.closestPass,
        },
        {
            pdfRefs: ["Andrews Lesson 5.1-5.5"],
            redirectAction: "keep",
            evidenceStatus: "direct-pdf-with-nawat-realization",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-5-intransitive-vnc-audit"],
            firedArrowIds: [["lesson-5-intransitive-vnc-audit", "hit"]],
            remainingGap: "none",
            closestPass: true,
        }
    );
    s.eq(
        "lesson 6 trajectory records the transitive CNV closest-pass shot",
        {
            pdfRefs: lessons[6].trajectory.pdfRefs,
            redirectAction: lessons[6].trajectory.redirectAction,
            evidenceStatus: lessons[6].trajectory.evidenceStatus,
            orthographyStatus: lessons[6].trajectory.orthographyStatus,
            plannedArrowIds: lessons[6].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[6].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            remainingGap: lessons[6].trajectory.remainingGap,
            closestPass: lessons[6].trajectory.closestPass,
        },
        {
            pdfRefs: ["Andrews Lesson 6.1-6.7"],
            redirectAction: "keep",
            evidenceStatus: "direct-pdf-with-nawat-realization",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-6-transitive-vnc-audit"],
            firedArrowIds: [["lesson-6-transitive-vnc-audit", "hit"]],
            remainingGap: "none",
            closestPass: true,
        }
    );
    s.eq(
        "lesson 7 trajectory records the verbstem-class closest-pass shot",
        {
            pdfRefs: lessons[7].trajectory.pdfRefs,
            redirectAction: lessons[7].trajectory.redirectAction,
            evidenceStatus: lessons[7].trajectory.evidenceStatus,
            orthographyStatus: lessons[7].trajectory.orthographyStatus,
            plannedArrowIds: lessons[7].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[7].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            remainingGap: lessons[7].trajectory.remainingGap,
            closestPass: lessons[7].trajectory.closestPass,
        },
        {
            pdfRefs: ["Andrews Lesson 7.1-7.10"],
            redirectAction: "keep",
            evidenceStatus: "direct-pdf-with-nawat-realization",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-7-verbstem-class-audit"],
            firedArrowIds: [["lesson-7-verbstem-class-audit", "hit"]],
            remainingGap: "none",
            closestPass: true,
        }
    );
    s.eq(
        "lesson 8 trajectory records the expanded-CNV sentence-layer partial shot",
        {
            pdfRefs: lessons[8].trajectory.pdfRefs,
            redirectAction: lessons[8].trajectory.redirectAction,
            evidenceStatus: lessons[8].trajectory.evidenceStatus,
            orthographyStatus: lessons[8].trajectory.orthographyStatus,
            plannedArrowIds: lessons[8].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[8].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[8].trajectory.aimStatus,
            closestPass: lessons[8].trajectory.closestPass,
            remainingGapMentionsSentenceGeneration: /generación oracional/.test(lessons[8].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 8.1-8.6"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-8-expanded-vnc-basic-sentence-audit"],
            firedArrowIds: [["lesson-8-expanded-vnc-basic-sentence-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsSentenceGeneration: true,
        }
    );
    s.eq(
        "lesson 9 trajectory records the optative sentence-layer partial shot",
        {
            pdfRefs: lessons[9].trajectory.pdfRefs,
            redirectAction: lessons[9].trajectory.redirectAction,
            evidenceStatus: lessons[9].trajectory.evidenceStatus,
            orthographyStatus: lessons[9].trajectory.orthographyStatus,
            plannedArrowIds: lessons[9].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[9].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[9].trajectory.aimStatus,
            closestPass: lessons[9].trajectory.closestPass,
            remainingGapMentionsImperativo: /imperativo/.test(lessons[9].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 9.1-9.9"],
            redirectAction: "reframe-metadata",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-9-optative-sentence-audit"],
            firedArrowIds: [["lesson-9-optative-sentence-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsImperativo: true,
        }
    );
    s.eq(
        "lesson 10 trajectory records the admonitive sentence-layer partial shot",
        {
            pdfRefs: lessons[10].trajectory.pdfRefs,
            redirectAction: lessons[10].trajectory.redirectAction,
            evidenceStatus: lessons[10].trajectory.evidenceStatus,
            orthographyStatus: lessons[10].trajectory.orthographyStatus,
            plannedArrowIds: lessons[10].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[10].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[10].trajectory.aimStatus,
            closestPass: lessons[10].trajectory.closestPass,
            remainingGapMentionsAdmonitive: /admonitivo/.test(lessons[10].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 10.1-10.5"],
            redirectAction: "reframe-metadata",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-10-admonitive-sentence-audit"],
            firedArrowIds: [["lesson-10-admonitive-sentence-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsAdmonitive: true,
        }
    );
    s.eq(
        "lesson 11 trajectory records the irregular VNC partial shot",
        {
            pdfRefs: lessons[11].trajectory.pdfRefs,
            redirectAction: lessons[11].trajectory.redirectAction,
            evidenceStatus: lessons[11].trajectory.evidenceStatus,
            orthographyStatus: lessons[11].trajectory.orthographyStatus,
            plannedArrowIds: lessons[11].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[11].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[11].trajectory.aimStatus,
            closestPass: lessons[11].trajectory.closestPass,
            remainingGapMentionsIrregulars: /irregular/.test(lessons[11].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 11.1-11.6"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-11-irregular-vnc-audit"],
            firedArrowIds: [["lesson-11-irregular-vnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsIrregulars: true,
        }
    );
    s.eq(
        "lesson 12 trajectory records the absolutive NNC partial shot",
        {
            pdfRefs: lessons[12].trajectory.pdfRefs,
            redirectAction: lessons[12].trajectory.redirectAction,
            evidenceStatus: lessons[12].trajectory.evidenceStatus,
            orthographyStatus: lessons[12].trajectory.orthographyStatus,
            plannedArrowIds: lessons[12].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[12].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[12].trajectory.aimStatus,
            closestPass: lessons[12].trajectory.closestPass,
            remainingGapMentionsFormulaSlots: /posiciones de fórmula/.test(lessons[12].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 12.1-12.7"],
            redirectAction: "reframe-metadata",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-12-absolutive-nnc-audit"],
            firedArrowIds: [["lesson-12-absolutive-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsFormulaSlots: true,
        }
    );
    s.eq(
        "lesson 13 trajectory records the possessive NNC partial shot",
        {
            pdfRefs: lessons[13].trajectory.pdfRefs,
            redirectAction: lessons[13].trajectory.redirectAction,
            evidenceStatus: lessons[13].trajectory.evidenceStatus,
            orthographyStatus: lessons[13].trajectory.orthographyStatus,
            plannedArrowIds: lessons[13].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[13].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[13].trajectory.aimStatus,
            closestPass: lessons[13].trajectory.closestPass,
            remainingGapMentionsPossessive: /estado posesivo/.test(lessons[13].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 13.1-13.6"],
            redirectAction: "reframe-metadata",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-13-possessive-nnc-audit"],
            firedArrowIds: [["lesson-13-possessive-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsPossessive: true,
        }
    );
    s.eq(
        "lesson 14 trajectory records the nounstem-class partial shot",
        {
            pdfRefs: lessons[14].trajectory.pdfRefs,
            redirectAction: lessons[14].trajectory.redirectAction,
            evidenceStatus: lessons[14].trajectory.evidenceStatus,
            orthographyStatus: lessons[14].trajectory.orthographyStatus,
            plannedArrowIds: lessons[14].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[14].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[14].trajectory.aimStatus,
            closestPass: lessons[14].trajectory.closestPass,
            remainingGapMentionsClass: /compatibilidad activa de clase/.test(lessons[14].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 14.1-14.8"],
            redirectAction: "reframe-metadata",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-14-nounstem-class-audit"],
            firedArrowIds: [["lesson-14-nounstem-class-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsClass: true,
        }
    );
    s.eq(
        "lesson 15 trajectory records the further-NNC partial shot",
        {
            pdfRefs: lessons[15].trajectory.pdfRefs,
            redirectAction: lessons[15].trajectory.redirectAction,
            evidenceStatus: lessons[15].trajectory.evidenceStatus,
            orthographyStatus: lessons[15].trajectory.orthographyStatus,
            plannedArrowIds: lessons[15].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[15].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[15].trajectory.aimStatus,
            closestPass: lessons[15].trajectory.closestPass,
            remainingGapMentionsNaturalPossession: /posesión natural/.test(lessons[15].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 15.1-15.3"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-15-further-nnc-audit"],
            firedArrowIds: [["lesson-15-further-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsNaturalPossession: true,
        }
    );
    s.eq(
        "lesson 16 trajectory records the pronominal-NNC partial shot",
        {
            pdfRefs: lessons[16].trajectory.pdfRefs,
            redirectAction: lessons[16].trajectory.redirectAction,
            evidenceStatus: lessons[16].trajectory.evidenceStatus,
            orthographyStatus: lessons[16].trajectory.orthographyStatus,
            plannedArrowIds: lessons[16].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[16].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[16].trajectory.aimStatus,
            closestPass: lessons[16].trajectory.closestPass,
            remainingGapMentionsPronominal: /cláusula nominal pronominal/.test(lessons[16].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 16.1-16.9"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-16-pronominal-nnc-audit"],
            firedArrowIds: [["lesson-16-pronominal-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsPronominal: true,
        }
    );
    s.eq(
        "lesson 17 trajectory records the supplementation partial shot",
        {
            pdfRefs: lessons[17].trajectory.pdfRefs,
            redirectAction: lessons[17].trajectory.redirectAction,
            evidenceStatus: lessons[17].trajectory.evidenceStatus,
            orthographyStatus: lessons[17].trajectory.orthographyStatus,
            plannedArrowIds: lessons[17].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[17].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[17].trajectory.aimStatus,
            closestPass: lessons[17].trajectory.closestPass,
            remainingGapMentionsSupplementationAst: /AST de suplementación/.test(lessons[17].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 17.1-17.6"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-17-supplementation-audit"],
            firedArrowIds: [["lesson-17-supplementation-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsSupplementationAst: true,
        }
    );
    s.eq(
        "lesson 18 trajectory records the supplementation part-two partial shot",
        {
            pdfRefs: lessons[18].trajectory.pdfRefs,
            redirectAction: lessons[18].trajectory.redirectAction,
            evidenceStatus: lessons[18].trajectory.evidenceStatus,
            orthographyStatus: lessons[18].trajectory.orthographyStatus,
            plannedArrowIds: lessons[18].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[18].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[18].trajectory.aimStatus,
            closestPass: lessons[18].trajectory.closestPass,
            remainingGapMentionsVocative: /vocativa/.test(lessons[18].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 18.1-18.12"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-18-supplementation-part-two-audit"],
            firedArrowIds: [["lesson-18-supplementation-part-two-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsVocative: true,
        }
    );
    s.eq(
        "lesson 19 trajectory records the supplementation part-three partial shot",
        {
            pdfRefs: lessons[19].trajectory.pdfRefs,
            redirectAction: lessons[19].trajectory.redirectAction,
            evidenceStatus: lessons[19].trajectory.evidenceStatus,
            orthographyStatus: lessons[19].trajectory.orthographyStatus,
            plannedArrowIds: lessons[19].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[19].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[19].trajectory.aimStatus,
            closestPass: lessons[19].trajectory.closestPass,
            remainingGapMentionsIncludedReferent: /referente incluido/.test(lessons[19].trajectory.remainingGap),
        },
        {
            pdfRefs: ["Andrews Lesson 19.1-19.6"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-19-supplementation-part-three-audit"],
            firedArrowIds: [["lesson-19-supplementation-part-three-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsIncludedReferent: true,
        }
    );
    s.eq(
        "lesson 20 trajectory records the nonactive closest-pass shot",
        {
            pdfRefs: lessons[20].trajectory.pdfRefs,
            redirectAction: lessons[20].trajectory.redirectAction,
            evidenceStatus: lessons[20].trajectory.evidenceStatus,
            orthographyStatus: lessons[20].trajectory.orthographyStatus,
            plannedArrowIds: lessons[20].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[20].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[20].trajectory.aimStatus,
            closestPass: lessons[20].trajectory.closestPass,
            remainingGap: lessons[20].trajectory.remainingGap,
        },
        {
            pdfRefs: ["Andrews Lesson 20.1-20.8"],
            redirectAction: "keep",
            evidenceStatus: "direct-pdf-with-nawat-realization",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-20-nonactive-verbstem-audit"],
            firedArrowIds: [["lesson-20-nonactive-verbstem-audit", "hit"]],
            aimStatus: "closest-pass",
            closestPass: true,
            remainingGap: "none",
        }
    );
    s.eq(
        "lesson 21 trajectory records the passive-voice partial shot",
        {
            status: lessons[21].status,
            pdfRefs: lessons[21].trajectory.pdfRefs,
            redirectAction: lessons[21].trajectory.redirectAction,
            evidenceStatus: lessons[21].trajectory.evidenceStatus,
            orthographyStatus: lessons[21].trajectory.orthographyStatus,
            plannedArrowIds: lessons[21].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[21].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[21].trajectory.aimStatus,
            closestPass: lessons[21].trajectory.closestPass,
            remainingGapMentionsPassiveImpersonal: /pasiva\/impersonal/.test(lessons[21].trajectory.remainingGap),
            remainingGapMentionsNonspecific: /no específico/.test(lessons[21].trajectory.remainingGap),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 21.1-21.4"],
            redirectAction: "refactor-engine",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-21-passive-voice-audit"],
            firedArrowIds: [["lesson-21-passive-voice-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsPassiveImpersonal: true,
            remainingGapMentionsNonspecific: true,
        }
    );
    s.eq(
        "lesson 22 trajectory records the impersonal-voice partial shot",
        {
            status: lessons[22].status,
            pdfRefs: lessons[22].trajectory.pdfRefs,
            redirectAction: lessons[22].trajectory.redirectAction,
            evidenceStatus: lessons[22].trajectory.evidenceStatus,
            orthographyStatus: lessons[22].trajectory.orthographyStatus,
            plannedArrowIds: lessons[22].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[22].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[22].trajectory.aimStatus,
            closestPass: lessons[22].trajectory.closestPass,
            remainingGapMentionsPassiveImpersonal: /pasiva\/impersonal/.test(lessons[22].trajectory.remainingGap),
            remainingGapMentionsTa: /te\/ta/.test(lessons[22].trajectory.remainingGap),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 22.1-22.6"],
            redirectAction: "refactor-engine",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-22-impersonal-voice-audit"],
            firedArrowIds: [["lesson-22-impersonal-voice-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsPassiveImpersonal: true,
            remainingGapMentionsTa: true,
        }
    );
    s.eq(
        "lesson 23 trajectory records the verb-object partial shot",
        {
            status: lessons[23].status,
            pdfRefs: lessons[23].trajectory.pdfRefs,
            redirectAction: lessons[23].trajectory.redirectAction,
            evidenceStatus: lessons[23].trajectory.evidenceStatus,
            orthographyStatus: lessons[23].trajectory.orthographyStatus,
            plannedArrowIds: lessons[23].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[23].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[23].trajectory.aimStatus,
            closestPass: lessons[23].trajectory.closestPass,
            remainingGapMentionsMainline: /línea principal\/línea desviada/.test(lessons[23].trajectory.remainingGap),
            remainingGapMentionsAppendixC: /Apéndice C/.test(lessons[23].trajectory.remainingGap),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 23.1-23.5"],
            redirectAction: "refactor-engine",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-23-verb-objects-audit"],
            firedArrowIds: [["lesson-23-verb-objects-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsMainline: true,
            remainingGapMentionsAppendixC: true,
        }
    );
    s.eq(
        "lesson 24 trajectory records the first-type causative partial shot",
        {
            status: lessons[24].status,
            pdfRefs: lessons[24].trajectory.pdfRefs,
            redirectAction: lessons[24].trajectory.redirectAction,
            evidenceStatus: lessons[24].trajectory.evidenceStatus,
            orthographyStatus: lessons[24].trajectory.orthographyStatus,
            plannedArrowIds: lessons[24].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[24].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[24].trajectory.aimStatus,
            closestPass: lessons[24].trajectory.closestPass,
            remainingGapMentionsDestockal: /desacerval/.test(lessons[24].trajectory.remainingGap),
            remainingGapMentionsSourceCnv: /cláusula verbal a objeto/.test(lessons[24].trajectory.remainingGap),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 24.1-24.9"],
            redirectAction: "refactor-engine",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-24-first-type-causative-audit"],
            firedArrowIds: [["lesson-24-first-type-causative-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsDestockal: true,
            remainingGapMentionsSourceCnv: true,
        }
    );
    s.eq(
        "lesson 25 trajectory records the second-type causative partial shot",
        {
            status: lessons[25].status,
            pdfRefs: lessons[25].trajectory.pdfRefs,
            redirectAction: lessons[25].trajectory.redirectAction,
            evidenceStatus: lessons[25].trajectory.evidenceStatus,
            orthographyStatus: lessons[25].trajectory.orthographyStatus,
            plannedArrowIds: lessons[25].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[25].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[25].trajectory.aimStatus,
            closestPass: lessons[25].trajectory.closestPass,
            remainingGapMentionsObjectDepth: /uno\/dos\/tres/.test(lessons[25].trajectory.remainingGap),
            remainingGapMentionsSilentObject: /objeto silencioso/.test(lessons[25].trajectory.remainingGap),
            remainingGapMentionsPassiveImpersonal: /pasivos\/impersonales/.test(lessons[25].trajectory.remainingGap),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 25.1-25.16"],
            redirectAction: "refactor-engine",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-25-second-type-causative-audit"],
            firedArrowIds: [["lesson-25-second-type-causative-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsObjectDepth: true,
            remainingGapMentionsSilentObject: true,
            remainingGapMentionsPassiveImpersonal: true,
        }
    );
    s.eq(
        "lesson 26 trajectory records the applicative partial shot",
        {
            status: lessons[26].status,
            pdfRefs: lessons[26].trajectory.pdfRefs,
            redirectAction: lessons[26].trajectory.redirectAction,
            evidenceStatus: lessons[26].trajectory.evidenceStatus,
            orthographyStatus: lessons[26].trajectory.orthographyStatus,
            plannedArrowIds: lessons[26].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[26].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[26].trajectory.aimStatus,
            closestPass: lessons[26].trajectory.closestPass,
            remainingGapMentionsObjectDepth: /uno\/dos\/tres/.test(lessons[26].trajectory.remainingGap),
            remainingGapMentionsAppendixC: /Apéndice C/.test(lessons[26].trajectory.remainingGap),
            remainingGapMentionsObjectUnit: /objeto-más-sufijo/.test(lessons[26].trajectory.remainingGap),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 26.1-26.23"],
            redirectAction: "refactor-engine",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-26-applicative-audit"],
            firedArrowIds: [["lesson-26-applicative-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsObjectDepth: true,
            remainingGapMentionsAppendixC: true,
            remainingGapMentionsObjectUnit: true,
        }
    );
    s.eq(
        "lesson 27 trajectory records the frequentative partial shot",
        {
            status: lessons[27].status,
            pdfRefs: lessons[27].trajectory.pdfRefs,
            redirectAction: lessons[27].trajectory.redirectAction,
            evidenceStatus: lessons[27].trajectory.evidenceStatus,
            orthographyStatus: lessons[27].trajectory.orthographyStatus,
            plannedArrowIds: lessons[27].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[27].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[27].trajectory.aimStatus,
            closestPass: lessons[27].trajectory.closestPass,
            remainingGapMentionsObjectPronoun: /pronombre objeto/.test(lessons[27].trajectory.remainingGap),
            remainingGapMentionsDestockal: /desacerval/.test(lessons[27].trajectory.remainingGap),
            remainingGapMentionsGenericRedup: /reduplicación genérica/.test(lessons[27].trajectory.remainingGap),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 27.1-27.6"],
            redirectAction: "block-generation",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-27-frequentative-audit"],
            firedArrowIds: [["lesson-27-frequentative-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsObjectPronoun: true,
            remainingGapMentionsDestockal: true,
            remainingGapMentionsGenericRedup: true,
        }
    );
    s.eq(
        "lesson 28 trajectory records the compound verbal-embed partial shot",
        {
            status: lessons[28].status,
            pdfRefs: lessons[28].trajectory.pdfRefs,
            redirectAction: lessons[28].trajectory.redirectAction,
            evidenceStatus: lessons[28].trajectory.evidenceStatus,
            orthographyStatus: lessons[28].trajectory.orthographyStatus,
            plannedArrowIds: lessons[28].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[28].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[28].trajectory.aimStatus,
            closestPass: lessons[28].trajectory.closestPass,
            remainingGapMentionsConnectiveT: /conectivo -t/.test(lessons[28].trajectory.remainingGap),
            remainingGapMentionsSharedObject: /objeto compartido/.test(lessons[28].trajectory.remainingGap),
            remainingGapMentionsFutureEmbed: /incrustación futura/.test(lessons[28].trajectory.remainingGap),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 28.1-28.12"],
            redirectAction: "refactor-engine",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-28-verbal-embed-compound-audit"],
            firedArrowIds: [["lesson-28-verbal-embed-compound-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsConnectiveT: true,
            remainingGapMentionsSharedObject: true,
            remainingGapMentionsFutureEmbed: true,
        }
    );
    s.eq(
        "lesson 29 trajectory records the purposive VNC partial shot",
        {
            status: lessons[29].status,
            pdfRefs: lessons[29].trajectory.pdfRefs,
            redirectAction: lessons[29].trajectory.redirectAction,
            evidenceStatus: lessons[29].trajectory.evidenceStatus,
            orthographyStatus: lessons[29].trajectory.orthographyStatus,
            plannedArrowIds: lessons[29].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[29].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[29].trajectory.aimStatus,
            closestPass: lessons[29].trajectory.closestPass,
            remainingGapMentionsSilentFuture: /futuro silencioso/.test(lessons[29].trajectory.remainingGap),
            remainingGapMentionsIrregularPlural: /plural irregular n/.test(lessons[29].trajectory.remainingGap),
            remainingGapMentionsExternalDirectionals: /wal\/on/.test(lessons[29].trajectory.remainingGap),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 29.1-29.7"],
            redirectAction: "block-generation",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-29-purposive-vnc-audit"],
            firedArrowIds: [["lesson-29-purposive-vnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsSilentFuture: true,
            remainingGapMentionsIrregularPlural: true,
            remainingGapMentionsExternalDirectionals: true,
        }
    );
    s.eq(
        "lesson 30 trajectory records the compound nominal-embed partial shot",
        {
            status: lessons[30].status,
            pdfRefs: lessons[30].trajectory.pdfRefs,
            redirectAction: lessons[30].trajectory.redirectAction,
            evidenceStatus: lessons[30].trajectory.evidenceStatus,
            orthographyStatus: lessons[30].trajectory.orthographyStatus,
            plannedArrowIds: lessons[30].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[30].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[30].trajectory.aimStatus,
            closestPass: lessons[30].trajectory.closestPass,
            remainingGapMentionsValenceLowering: /reducción de valencia/.test(lessons[30].trajectory.remainingGap),
            remainingGapMentionsTlaFusion: /fusión ta/.test(lessons[30].trajectory.remainingGap),
            remainingGapMentionsComplements: /complementos incorporados/.test(lessons[30].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 30\.1-30\.18/.test(lessons[30].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 30.1-30.18"],
            redirectAction: "refactor-engine",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-30-nominal-embed-compound-audit"],
            firedArrowIds: [["lesson-30-nominal-embed-compound-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsValenceLowering: true,
            remainingGapMentionsTlaFusion: true,
            remainingGapMentionsComplements: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 31 trajectory records the compound nounstem partial shot",
        {
            status: lessons[31].status,
            pdfRefs: lessons[31].trajectory.pdfRefs,
            redirectAction: lessons[31].trajectory.redirectAction,
            evidenceStatus: lessons[31].trajectory.evidenceStatus,
            orthographyStatus: lessons[31].trajectory.orthographyStatus,
            plannedArrowIds: lessons[31].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[31].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[31].trajectory.aimStatus,
            closestPass: lessons[31].trajectory.closestPass,
            remainingGapMentionsPossessorOrientation: /orientación de poseedor/.test(lessons[31].trajectory.remainingGap),
            remainingGapMentionsConjunctive: /compuestos conjuntivos/.test(lessons[31].trajectory.remainingGap),
            remainingGapMentionsDistributive: /distributivos\/varietales/.test(lessons[31].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 31\.1-31\.13/.test(lessons[31].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 31.1-31.13"],
            redirectAction: "block-generation",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-31-compound-nounstem-audit"],
            firedArrowIds: [["lesson-31-compound-nounstem-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsPossessorOrientation: true,
            remainingGapMentionsConjunctive: true,
            remainingGapMentionsDistributive: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 32 trajectory records the affective NNC partial shot",
        {
            status: lessons[32].status,
            pdfRefs: lessons[32].trajectory.pdfRefs,
            redirectAction: lessons[32].trajectory.redirectAction,
            evidenceStatus: lessons[32].trajectory.evidenceStatus,
            orthographyStatus: lessons[32].trajectory.orthographyStatus,
            plannedArrowIds: lessons[32].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[32].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[32].trajectory.aimStatus,
            closestPass: lessons[32].trajectory.closestPass,
            remainingGapMentionsAffectiveMatrix: /matriz afectiva/.test(lessons[32].trajectory.remainingGap),
            remainingGapMentionsFlawedSubject: /sujeto defectuoso/.test(lessons[32].trajectory.remainingGap),
            remainingGapMentionsPilAmbiguity: /ambigüedad pil niño\/noble/.test(lessons[32].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 32\.1-32\.8/.test(lessons[32].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 32.1-32.8"],
            redirectAction: "block-generation",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-32-affective-nnc-audit"],
            firedArrowIds: [["lesson-32-affective-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsAffectiveMatrix: true,
            remainingGapMentionsFlawedSubject: true,
            remainingGapMentionsPilAmbiguity: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 33 trajectory records the honorific/pejorative VNC partial shot",
        {
            status: lessons[33].status,
            pdfRefs: lessons[33].trajectory.pdfRefs,
            redirectAction: lessons[33].trajectory.redirectAction,
            evidenceStatus: lessons[33].trajectory.evidenceStatus,
            orthographyStatus: lessons[33].trajectory.orthographyStatus,
            plannedArrowIds: lessons[33].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[33].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[33].trajectory.aimStatus,
            closestPass: lessons[33].trajectory.closestPass,
            remainingGapMentionsReverential: /generación reverencial/.test(lessons[33].trajectory.remainingGap),
            remainingGapMentionsTzinoa: /tzin-u-a/.test(lessons[33].trajectory.remainingGap),
            remainingGapMentionsPulua: /pul-u-a/.test(lessons[33].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 33\.1-33\.10/.test(lessons[33].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 33.1-33.10"],
            redirectAction: "block-generation",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-33-honorific-pejorative-vnc-audit"],
            firedArrowIds: [["lesson-33-honorific-pejorative-vnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsReverential: true,
            remainingGapMentionsTzinoa: true,
            remainingGapMentionsPulua: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 34 trajectory records the cardinal-numeral NNC partial shot",
        {
            status: lessons[34].status,
            pdfRefs: lessons[34].trajectory.pdfRefs,
            redirectAction: lessons[34].trajectory.redirectAction,
            evidenceStatus: lessons[34].trajectory.evidenceStatus,
            orthographyStatus: lessons[34].trajectory.orthographyStatus,
            plannedArrowIds: lessons[34].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[34].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[34].trajectory.aimStatus,
            closestPass: lessons[34].trajectory.closestPass,
            remainingGapMentionsGrossCount: /conteo grueso/.test(lessons[34].trajectory.remainingGap),
            remainingGapMentionsClassifiers: /conjuntos clasificadores/.test(lessons[34].trajectory.remainingGap),
            remainingGapMentionsMeasures: /cláusulas nominales de medida/.test(lessons[34].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 34\.1-34\.16/.test(lessons[34].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 34.1-34.16"],
            redirectAction: "block-generation",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-34-cardinal-numeral-nnc-audit"],
            firedArrowIds: [["lesson-34-cardinal-numeral-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsGrossCount: true,
            remainingGapMentionsClassifiers: true,
            remainingGapMentionsMeasures: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 35 trajectory records the preterit-agentive nominalization partial shot",
        {
            status: lessons[35].status,
            pdfRefs: lessons[35].trajectory.pdfRefs,
            redirectAction: lessons[35].trajectory.redirectAction,
            evidenceStatus: lessons[35].trajectory.evidenceStatus,
            orthographyStatus: lessons[35].trajectory.orthographyStatus,
            plannedArrowIds: lessons[35].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[35].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[35].trajectory.aimStatus,
            closestPass: lessons[35].trajectory.closestPass,
            remainingGapMentionsNumberPosition: /alternancias de posición de número/.test(lessons[35].trajectory.remainingGap),
            remainingGapMentionsOwnerhood: /subclases de posesión/.test(lessons[35].trajectory.remainingGap),
            remainingGapMentionsAdverbial: /matrices adverbiales/.test(lessons[35].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 35\.1-35\.12/.test(lessons[35].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 35.1-35.12"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-35-preterit-agentive-audit"],
            firedArrowIds: [["lesson-35-preterit-agentive-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsNumberPosition: true,
            remainingGapMentionsOwnerhood: true,
            remainingGapMentionsAdverbial: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 36 trajectory records the nominalized VNC partial shot",
        {
            status: lessons[36].status,
            pdfRefs: lessons[36].trajectory.pdfRefs,
            redirectAction: lessons[36].trajectory.redirectAction,
            evidenceStatus: lessons[36].trajectory.evidenceStatus,
            orthographyStatus: lessons[36].trajectory.orthographyStatus,
            plannedArrowIds: lessons[36].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[36].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[36].trajectory.aimStatus,
            closestPass: lessons[36].trajectory.closestPass,
            remainingGapMentionsCustomary: /agentivos completos de presente habitual/.test(lessons[36].trajectory.remainingGap),
            remainingGapMentionsInstrumentive: /instrumentivo/.test(lessons[36].trajectory.remainingGap),
            remainingGapMentionsActionNnc: /acción pasiva y activa/.test(lessons[36].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 36\.1-36\.12/.test(lessons[36].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 36.1-36.12"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-36-nominalized-vnc-audit"],
            firedArrowIds: [["lesson-36-nominalized-vnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsCustomary: true,
            remainingGapMentionsInstrumentive: true,
            remainingGapMentionsActionNnc: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 37 trajectory records the deverbal nounstem partial shot",
        {
            status: lessons[37].status,
            pdfRefs: lessons[37].trajectory.pdfRefs,
            redirectAction: lessons[37].trajectory.redirectAction,
            evidenceStatus: lessons[37].trajectory.evidenceStatus,
            orthographyStatus: lessons[37].trajectory.orthographyStatus,
            plannedArrowIds: lessons[37].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[37].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[37].trajectory.aimStatus,
            closestPass: lessons[37].trajectory.closestPass,
            remainingGapMentionsActiveAction: /acción activa z\/liz/.test(lessons[37].trajectory.remainingGap),
            remainingGapMentionsPotentialPatient: /paciente potencial/.test(lessons[37].trajectory.remainingGap),
            remainingGapMentionsPassivePatientive: /fuente patientiva pasiva/.test(lessons[37].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 37\.1-37\.9/.test(lessons[37].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 37.1-37.9"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-37-deverbal-nounstem-audit"],
            firedArrowIds: [["lesson-37-deverbal-nounstem-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsActiveAction: true,
            remainingGapMentionsPotentialPatient: true,
            remainingGapMentionsPassivePatientive: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 38 trajectory records the impersonal patientive partial shot",
        {
            status: lessons[38].status,
            pdfRefs: lessons[38].trajectory.pdfRefs,
            redirectAction: lessons[38].trajectory.redirectAction,
            evidenceStatus: lessons[38].trajectory.evidenceStatus,
            orthographyStatus: lessons[38].trajectory.orthographyStatus,
            plannedArrowIds: lessons[38].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[38].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[38].trajectory.aimStatus,
            closestPass: lessons[38].trajectory.closestPass,
            remainingGapMentionsRootPlusYa: /raíz-más-ya/.test(lessons[38].trajectory.remainingGap),
            remainingGapMentionsHumanContrast: /contraste humano\/no humano/.test(lessons[38].trajectory.remainingGap),
            remainingGapMentionsCompoundPatientive: /patientivo compuesto/.test(lessons[38].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 38\.1-38\.2/.test(lessons[38].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 38.1-38.2"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-38-impersonal-patientive-audit"],
            firedArrowIds: [["lesson-38-impersonal-patientive-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsRootPlusYa: true,
            remainingGapMentionsHumanContrast: true,
            remainingGapMentionsCompoundPatientive: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 39 trajectory records the patientive operations partial shot",
        {
            status: lessons[39].status,
            pdfRefs: lessons[39].trajectory.pdfRefs,
            redirectAction: lessons[39].trajectory.redirectAction,
            evidenceStatus: lessons[39].trajectory.evidenceStatus,
            orthographyStatus: lessons[39].trajectory.orthographyStatus,
            plannedArrowIds: lessons[39].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[39].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[39].trajectory.aimStatus,
            closestPass: lessons[39].trajectory.closestPass,
            remainingGapMentionsOrganicPossession: /posesión orgánica/.test(lessons[39].trajectory.remainingGap),
            remainingGapMentionsRootStock: /raíz\/acervo/.test(lessons[39].trajectory.remainingGap),
            remainingGapMentionsValence: /violación de valencia/.test(lessons[39].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 39\.1-39\.9/.test(lessons[39].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 39.1-39.9"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-39-patientive-operations-audit"],
            firedArrowIds: [["lesson-39-patientive-operations-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsOrganicPossession: true,
            remainingGapMentionsRootStock: true,
            remainingGapMentionsValence: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 40 trajectory records the adjectival NNC partial shot",
        {
            status: lessons[40].status,
            pdfRefs: lessons[40].trajectory.pdfRefs,
            redirectAction: lessons[40].trajectory.redirectAction,
            evidenceStatus: lessons[40].trajectory.evidenceStatus,
            orthographyStatus: lessons[40].trajectory.orthographyStatus,
            plannedArrowIds: lessons[40].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[40].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[40].trajectory.aimStatus,
            closestPass: lessons[40].trajectory.closestPass,
            remainingGapMentionsExceptional: /cláusulas nominales adjetivales excepcionales/.test(lessons[40].trajectory.remainingGap),
            remainingGapMentionsSynonyms: /conjuntos sinónimos de fuente/.test(lessons[40].trajectory.remainingGap),
            remainingGapMentionsPredicateAdjectiveSentence: /oración predicado-adjetivo/.test(lessons[40].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 40\.1-40\.12/.test(lessons[40].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 40.1-40.12"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-40-adjectival-nnc-audit"],
            firedArrowIds: [["lesson-40-adjectival-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsExceptional: true,
            remainingGapMentionsSynonyms: true,
            remainingGapMentionsPredicateAdjectiveSentence: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 41 trajectory records the adjectival NNC part-two partial shot",
        {
            status: lessons[41].status,
            pdfRefs: lessons[41].trajectory.pdfRefs,
            redirectAction: lessons[41].trajectory.redirectAction,
            evidenceStatus: lessons[41].trajectory.evidenceStatus,
            orthographyStatus: lessons[41].trajectory.orthographyStatus,
            plannedArrowIds: lessons[41].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[41].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[41].trajectory.aimStatus,
            closestPass: lessons[41].trajectory.closestPass,
            remainingGapMentionsAffective: /matrices pah\/cal\/tzon\/afectivas/.test(lessons[41].trajectory.remainingGap),
            remainingGapMentionsCompoundSource: /fuente de tronco verbal compuesto/.test(lessons[41].trajectory.remainingGap),
            remainingGapMentionsEmbeddedAdjectival: /troncos nominales adjetivales incrustados/.test(lessons[41].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 41\.1-41\.4/.test(lessons[41].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 41.1-41.4"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-41-adjectival-nnc-audit"],
            firedArrowIds: [["lesson-41-adjectival-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsAffective: true,
            remainingGapMentionsCompoundSource: true,
            remainingGapMentionsEmbeddedAdjectival: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 42 trajectory records the adjectival-modification partial shot",
        {
            status: lessons[42].status,
            pdfRefs: lessons[42].trajectory.pdfRefs,
            redirectAction: lessons[42].trajectory.redirectAction,
            evidenceStatus: lessons[42].trajectory.evidenceStatus,
            orthographyStatus: lessons[42].trajectory.orthographyStatus,
            plannedArrowIds: lessons[42].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[42].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[42].trajectory.aimStatus,
            closestPass: lessons[42].trajectory.closestPass,
            remainingGapMentionsSupplementation: /ambigüedad de suplementación/.test(lessons[42].trajectory.remainingGap),
            remainingGapMentionsTransitiveVnc: /ambigüedad de modificador verbal transitivo/.test(lessons[42].trajectory.remainingGap),
            remainingGapMentionsIncorporated: /estructuras de modificación incorporada/.test(lessons[42].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 42\.1-42\.10/.test(lessons[42].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 42.1-42.10"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-42-adjectival-modification-audit"],
            firedArrowIds: [["lesson-42-adjectival-modification-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsSupplementation: true,
            remainingGapMentionsTransitiveVnc: true,
            remainingGapMentionsIncorporated: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 43 trajectory records the part-two adjectival-modification partial shot",
        {
            status: lessons[43].status,
            pdfRefs: lessons[43].trajectory.pdfRefs,
            redirectAction: lessons[43].trajectory.redirectAction,
            evidenceStatus: lessons[43].trajectory.evidenceStatus,
            orthographyStatus: lessons[43].trajectory.orthographyStatus,
            plannedArrowIds: lessons[43].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[43].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[43].trajectory.aimStatus,
            closestPass: lessons[43].trajectory.closestPass,
            remainingGapMentionsInterrogative: /ambigüedad de núcleo interrogativo ac\/tleh/.test(lessons[43].trajectory.remainingGap),
            remainingGapMentionsOcCe: /núcleos oc ce/.test(lessons[43].trajectory.remainingGap),
            remainingGapMentionsNamedPartner: /modificadores de pareja nombrada/.test(lessons[43].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 43\.1-43\.9/.test(lessons[43].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 43.1-43.9"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-43-adjectival-modification-audit"],
            firedArrowIds: [["lesson-43-adjectival-modification-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsInterrogative: true,
            remainingGapMentionsOcCe: true,
            remainingGapMentionsNamedPartner: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 44 trajectory records the adverbial nuclear-clause partial shot",
        {
            status: lessons[44].status,
            pdfRefs: lessons[44].trajectory.pdfRefs,
            redirectAction: lessons[44].trajectory.redirectAction,
            evidenceStatus: lessons[44].trajectory.evidenceStatus,
            orthographyStatus: lessons[44].trajectory.orthographyStatus,
            plannedArrowIds: lessons[44].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[44].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[44].trajectory.aimStatus,
            closestPass: lessons[44].trajectory.closestPass,
            remainingGapMentionsSecondDegree: /adverbiales nominales absolutivos de segundo grado/.test(lessons[44].trajectory.remainingGap),
            remainingGapMentionsParticleLooking: /cláusulas nominales que parecen partículas/.test(lessons[44].trajectory.remainingGap),
            remainingGapMentionsIncorporated: /modificadores adverbiales incorporados/.test(lessons[44].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 44\.1-44\.9/.test(lessons[44].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 44.1-44.9"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-44-adverbial-nuclear-audit"],
            firedArrowIds: [["lesson-44-adverbial-nuclear-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsSecondDegree: true,
            remainingGapMentionsParticleLooking: true,
            remainingGapMentionsIncorporated: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 45 trajectory records the relational NNC part-one partial shot",
        {
            status: lessons[45].status,
            pdfRefs: lessons[45].trajectory.pdfRefs,
            redirectAction: lessons[45].trajectory.redirectAction,
            evidenceStatus: lessons[45].trajectory.evidenceStatus,
            orthographyStatus: lessons[45].trajectory.orthographyStatus,
            plannedArrowIds: lessons[45].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[45].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[45].trajectory.aimStatus,
            closestPass: lessons[45].trajectory.closestPass,
            remainingGapMentionsRelationalData: /datos estáticos relacionales/.test(lessons[45].trajectory.remainingGap),
            remainingGapMentionsSupplementary: /análisis de poseedor suplementario/.test(lessons[45].trajectory.remainingGap),
            remainingGapMentionsIc: /usos especiales de ic/.test(lessons[45].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 45\.1-45\.4/.test(lessons[45].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 45.1-45.4"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-45-relational-nnc-audit"],
            firedArrowIds: [["lesson-45-relational-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsRelationalData: true,
            remainingGapMentionsSupplementary: true,
            remainingGapMentionsIc: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 46 trajectory records the relational NNC part-two partial shot",
        {
            status: lessons[46].status,
            pdfRefs: lessons[46].trajectory.pdfRefs,
            redirectAction: lessons[46].trajectory.redirectAction,
            evidenceStatus: lessons[46].trajectory.evidenceStatus,
            orthographyStatus: lessons[46].trajectory.orthographyStatus,
            plannedArrowIds: lessons[46].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[46].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[46].trajectory.aimStatus,
            closestPass: lessons[46].trajectory.closestPass,
            remainingGapMentionsMatrixData: /datos estáticos relacionales solo de matriz/.test(lessons[46].trajectory.remainingGap),
            remainingGapMentionsOrthography: /ortogr[aá]f|orthography|spelling/i.test(lessons[46].trajectory.remainingGap),
            remainingGapMentionsPa: /desambiguación de homónimo pa/.test(lessons[46].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 46\.1-46\.15/.test(lessons[46].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 46.1-46.15"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-46-relational-nnc-audit"],
            firedArrowIds: [["lesson-46-relational-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsMatrixData: true,
            remainingGapMentionsOrthography: true,
            remainingGapMentionsPa: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 47 trajectory records the relational NNC part-three partial shot",
        {
            status: lessons[47].status,
            pdfRefs: lessons[47].trajectory.pdfRefs,
            redirectAction: lessons[47].trajectory.redirectAction,
            evidenceStatus: lessons[47].trajectory.evidenceStatus,
            orthographyStatus: lessons[47].trajectory.orthographyStatus,
            plannedArrowIds: lessons[47].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[47].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[47].trajectory.aimStatus,
            closestPass: lessons[47].trajectory.closestPass,
            remainingGapMentionsCopa: /incrustación pa\/copa/.test(lessons[47].trajectory.remainingGap),
            remainingGapMentionsGentilic: /contraste entidad asociada frente a gentilicio/.test(lessons[47].trajectory.remainingGap),
            remainingGapMentionsPertinency: /enrutamiento de pertinencia/.test(lessons[47].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 47\.1-47\.5/.test(lessons[47].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 47.1-47.5"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-47-relational-nnc-audit"],
            firedArrowIds: [["lesson-47-relational-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsCopa: true,
            remainingGapMentionsGentilic: true,
            remainingGapMentionsPertinency: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 48 trajectory records the place-name and gentilic partial shot",
        {
            status: lessons[48].status,
            pdfRefs: lessons[48].trajectory.pdfRefs,
            redirectAction: lessons[48].trajectory.redirectAction,
            evidenceStatus: lessons[48].trajectory.evidenceStatus,
            orthographyStatus: lessons[48].trajectory.orthographyStatus,
            plannedArrowIds: lessons[48].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[48].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[48].trajectory.aimStatus,
            closestPass: lessons[48].trajectory.closestPass,
            remainingGapMentionsUnique: /resolución de referencia única/.test(lessons[48].trajectory.remainingGap),
            remainingGapMentionsGentilic: /enrutamiento de derivación gentilicia/.test(lessons[48].trajectory.remainingGap),
            remainingGapMentionsProfession: /extensión de profesión\/título/.test(lessons[48].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 48\.1-48\.13/.test(lessons[48].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 48.1-48.13"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "nawat-evidence-required",
            plannedArrowIds: ["lesson-48-place-gentilic-audit"],
            firedArrowIds: [["lesson-48-place-gentilic-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsUnique: true,
            remainingGapMentionsGentilic: true,
            remainingGapMentionsProfession: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 49 trajectory records the adverbial-modification part-one partial shot",
        {
            status: lessons[49].status,
            pdfRefs: lessons[49].trajectory.pdfRefs,
            redirectAction: lessons[49].trajectory.redirectAction,
            evidenceStatus: lessons[49].trajectory.evidenceStatus,
            orthographyStatus: lessons[49].trajectory.orthographyStatus,
            plannedArrowIds: lessons[49].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[49].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[49].trajectory.aimStatus,
            closestPass: lessons[49].trajectory.closestPass,
            remainingGapMentionsRecursiveParser: /detección recursiva de analizador/.test(lessons[49].trajectory.remainingGap),
            remainingGapMentionsInterrogative: /análisis de cláusula principal interrogativa/.test(lessons[49].trajectory.remainingGap),
            remainingGapMentionsOrthography: /ortogr[aá]f|orthography|spelling/i.test(lessons[49].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 49\.1-49\.10/.test(lessons[49].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 49.1-49.10"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-49-adverbial-adjunction-audit"],
            firedArrowIds: [["lesson-49-adverbial-adjunction-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsRecursiveParser: true,
            remainingGapMentionsInterrogative: true,
            remainingGapMentionsOrthography: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 50 trajectory records the adverbial-modification part-two partial shot",
        {
            status: lessons[50].status,
            pdfRefs: lessons[50].trajectory.pdfRefs,
            redirectAction: lessons[50].trajectory.redirectAction,
            evidenceStatus: lessons[50].trajectory.evidenceStatus,
            orthographyStatus: lessons[50].trajectory.orthographyStatus,
            plannedArrowIds: lessons[50].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[50].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[50].trajectory.aimStatus,
            closestPass: lessons[50].trajectory.closestPass,
            remainingGapMentionsSupplementation: /suplementación de referente incluido/.test(lessons[50].trajectory.remainingGap),
            remainingGapMentionsCondition: /condición abierta e hipotética/.test(lessons[50].trajectory.remainingGap),
            remainingGapMentionsOrthography: /ortogr[aá]f|orthography|spelling/i.test(lessons[50].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 50\.1-50\.11/.test(lessons[50].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 50.1-50.11"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-50-adverbial-adjunction-audit"],
            firedArrowIds: [["lesson-50-adverbial-adjunction-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsSupplementation: true,
            remainingGapMentionsCondition: true,
            remainingGapMentionsOrthography: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 51 trajectory records the complementation partial shot",
        {
            status: lessons[51].status,
            pdfRefs: lessons[51].trajectory.pdfRefs,
            redirectAction: lessons[51].trajectory.redirectAction,
            evidenceStatus: lessons[51].trajectory.evidenceStatus,
            orthographyStatus: lessons[51].trajectory.orthographyStatus,
            plannedArrowIds: lessons[51].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[51].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[51].trajectory.aimStatus,
            closestPass: lessons[51].trajectory.closestPass,
            remainingGapMentionsObjectInventory: /inventarios de troncos verbales de complemento de objeto/.test(lessons[51].trajectory.remainingGap),
            remainingGapMentionsRelational: /vocabulario relacional lexicalizado/.test(lessons[51].trajectory.remainingGap),
            remainingGapMentionsOrthography: /ortogr[aá]f|orthography|spelling/i.test(lessons[51].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 51\.1-51\.4/.test(lessons[51].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 51.1-51.4"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-51-complement-clause-audit"],
            firedArrowIds: [["lesson-51-complement-clause-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsObjectInventory: true,
            remainingGapMentionsRelational: true,
            remainingGapMentionsOrthography: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 52 trajectory records the conjunction partial shot",
        {
            status: lessons[52].status,
            pdfRefs: lessons[52].trajectory.pdfRefs,
            redirectAction: lessons[52].trajectory.redirectAction,
            evidenceStatus: lessons[52].trajectory.evidenceStatus,
            orthographyStatus: lessons[52].trajectory.orthographyStatus,
            plannedArrowIds: lessons[52].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[52].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[52].trajectory.aimStatus,
            closestPass: lessons[52].trajectory.closestPass,
            remainingGapMentionsRelationInference: /inferencia de relación no marcada/.test(lessons[52].trajectory.remainingGap),
            remainingGapMentionsCorrelation: /emparejamiento correlativo/.test(lessons[52].trajectory.remainingGap),
            remainingGapMentionsOrthography: /ortogr[aá]f|orthography|spelling/i.test(lessons[52].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 52\.1-52\.7/.test(lessons[52].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 52.1-52.7"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-52-conjunction-clause-audit"],
            firedArrowIds: [["lesson-52-conjunction-clause-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsRelationInference: true,
            remainingGapMentionsCorrelation: true,
            remainingGapMentionsOrthography: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 53 trajectory records the comparison partial shot",
        {
            status: lessons[53].status,
            pdfRefs: lessons[53].trajectory.pdfRefs,
            redirectAction: lessons[53].trajectory.redirectAction,
            evidenceStatus: lessons[53].trajectory.evidenceStatus,
            orthographyStatus: lessons[53].trajectory.orthographyStatus,
            plannedArrowIds: lessons[53].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[53].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[53].trajectory.aimStatus,
            closestPass: lessons[53].trajectory.closestPass,
            remainingGapMentionsIuhqui: /iuhqui/.test(lessons[53].trajectory.remainingGap),
            remainingGapMentionsSuperlative: /enrutamiento de superlativo/.test(lessons[53].trajectory.remainingGap),
            remainingGapMentionsOrthography: /ortogr[aá]f|orthography|spelling/i.test(lessons[53].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 53\.1-53\.7/.test(lessons[53].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 53.1-53.7"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-53-comparison-audit"],
            firedArrowIds: [["lesson-53-comparison-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsIuhqui: true,
            remainingGapMentionsSuperlative: true,
            remainingGapMentionsOrthography: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 54 trajectory records the denominal verbstem part-one partial shot",
        {
            status: lessons[54].status,
            pdfRefs: lessons[54].trajectory.pdfRefs,
            redirectAction: lessons[54].trajectory.redirectAction,
            evidenceStatus: lessons[54].trajectory.evidenceStatus,
            orthographyStatus: lessons[54].trajectory.orthographyStatus,
            plannedArrowIds: lessons[54].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[54].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[54].trajectory.aimStatus,
            closestPass: lessons[54].trajectory.closestPass,
            remainingGapMentionsPossessionTi: /semántica de ti posesivo/.test(lessons[54].trajectory.remainingGap),
            remainingGapMentionsDoubleObject: /ti-a de dos objetos/.test(lessons[54].trajectory.remainingGap),
            remainingGapMentionsVisibleUi: /acciones visibles de interfaz/.test(lessons[54].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 54\.1-54\.6/.test(lessons[54].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 54.1-54.6"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "orthography-bridge-plus-nawat-evidence-required",
            plannedArrowIds: ["lesson-54-denominal-verbstem-audit"],
            firedArrowIds: [["lesson-54-denominal-verbstem-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsPossessionTi: true,
            remainingGapMentionsDoubleObject: true,
            remainingGapMentionsVisibleUi: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 55 trajectory records the denominal verbstem part-two partial shot",
        {
            status: lessons[55].status,
            pdfRefs: lessons[55].trajectory.pdfRefs,
            redirectAction: lessons[55].trajectory.redirectAction,
            evidenceStatus: lessons[55].trajectory.evidenceStatus,
            orthographyStatus: lessons[55].trajectory.orthographyStatus,
            plannedArrowIds: lessons[55].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[55].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[55].trajectory.aimStatus,
            closestPass: lessons[55].trajectory.closestPass,
            remainingGapMentionsTemporalParsing: /análisis de compuestos temporales/.test(lessons[55].trajectory.remainingGap),
            remainingGapMentionsTlaInventory: /inventarios de tla/.test(lessons[55].trajectory.remainingGap),
            remainingGapMentionsVisibleUi: /acciones visibles de interfaz/.test(lessons[55].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 55\.1-55\.7/.test(lessons[55].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 55.1-55.7"],
            redirectAction: "needs-nawat-evidence",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "orthography-bridge-plus-nawat-evidence-required",
            plannedArrowIds: ["lesson-55-denominal-verbstem-audit"],
            firedArrowIds: [["lesson-55-denominal-verbstem-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsTemporalParsing: true,
            remainingGapMentionsTlaInventory: true,
            remainingGapMentionsVisibleUi: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 56 trajectory records the personal-name NNC partial shot",
        {
            status: lessons[56].status,
            pdfRefs: lessons[56].trajectory.pdfRefs,
            redirectAction: lessons[56].trajectory.redirectAction,
            evidenceStatus: lessons[56].trajectory.evidenceStatus,
            orthographyStatus: lessons[56].trajectory.orthographyStatus,
            plannedArrowIds: lessons[56].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[56].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[56].trajectory.aimStatus,
            closestPass: lessons[56].trajectory.closestPass,
            remainingGapMentionsStaticNames: /datos estáticos de nombres\/calendario/.test(lessons[56].trajectory.remainingGap),
            remainingGapMentionsVocative: /diagnósticos vocativos/.test(lessons[56].trajectory.remainingGap),
            remainingGapMentionsVisibleUi: /acciones visibles de interfaz/.test(lessons[56].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 56\.1-56\.5/.test(lessons[56].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 56.1-56.5"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-56-personal-name-nnc-audit"],
            firedArrowIds: [["lesson-56-personal-name-nnc-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsStaticNames: true,
            remainingGapMentionsVocative: true,
            remainingGapMentionsVisibleUi: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 57 trajectory records the miscellany part-one partial shot",
        {
            status: lessons[57].status,
            pdfRefs: lessons[57].trajectory.pdfRefs,
            redirectAction: lessons[57].trajectory.redirectAction,
            evidenceStatus: lessons[57].trajectory.evidenceStatus,
            orthographyStatus: lessons[57].trajectory.orthographyStatus,
            plannedArrowIds: lessons[57].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[57].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[57].trajectory.aimStatus,
            closestPass: lessons[57].trajectory.closestPass,
            remainingGapMentionsTenseAttraction: /detección de atracción temporal/.test(lessons[57].trajectory.remainingGap),
            remainingGapMentionsReferentTracking: /rastreo de referente/.test(lessons[57].trajectory.remainingGap),
            remainingGapMentionsVisibleUi: /acciones visibles de interfaz/.test(lessons[57].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 57\.1-57\.7/.test(lessons[57].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 57.1-57.7"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-57-analysis-audit"],
            firedArrowIds: [["lesson-57-analysis-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsTenseAttraction: true,
            remainingGapMentionsReferentTracking: true,
            remainingGapMentionsVisibleUi: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.eq(
        "lesson 58 trajectory records the miscellany part-two partial shot",
        {
            status: lessons[58].status,
            pdfRefs: lessons[58].trajectory.pdfRefs,
            redirectAction: lessons[58].trajectory.redirectAction,
            evidenceStatus: lessons[58].trajectory.evidenceStatus,
            orthographyStatus: lessons[58].trajectory.orthographyStatus,
            plannedArrowIds: lessons[58].trajectory.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lessons[58].trajectory.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            aimStatus: lessons[58].trajectory.aimStatus,
            closestPass: lessons[58].trajectory.closestPass,
            remainingGapMentionsMahAst: /AST de construcciones mah/.test(lessons[58].trajectory.remainingGap),
            remainingGapMentionsIncorporatedNoun: /diagnósticos de sujeto con nombre incorporado/.test(lessons[58].trajectory.remainingGap),
            remainingGapMentionsVisibleUi: /acciones visibles de interfaz/.test(lessons[58].trajectory.remainingGap),
            notesMentionAndrewsSubsections: /Andrews 58\.1-58\.8/.test(lessons[58].notes),
        },
        {
            status: "partially-implemented",
            pdfRefs: ["Andrews Lesson 58.1-58.8"],
            redirectAction: "diagnostic-only",
            evidenceStatus: "direct-pdf-partial",
            orthographyStatus: "not-surface-bearing",
            plannedArrowIds: ["lesson-58-analysis-audit"],
            firedArrowIds: [["lesson-58-analysis-audit", "hit"]],
            aimStatus: "shooting",
            closestPass: false,
            remainingGapMentionsMahAst: true,
            remainingGapMentionsIncorporatedNoun: true,
            remainingGapMentionsVisibleUi: true,
            notesMentionAndrewsSubsections: true,
        }
    );
    s.ok("lesson 8 notes sentence generation gap", /capa oracional diagnóstica/.test(lessons[8].notes) && /generación oracional/.test(lessons[8].notes));
    s.ok("lesson 9 notes sentence-level optative gap", /formas finitas optativas/.test(lessons[9].notes) && /nivel oracional/.test(lessons[9].notes));
    s.ok("lesson 10 notes sentence-level admonition gap", /formas finitas admonitivas/.test(lessons[10].notes) && /nivel oracional/.test(lessons[10].notes));
    s.ok("lesson 11 notes broader Andrews irregular gap", /perfectivos irregulares de Andrews/.test(lessons[11].notes));

    s.eq(
        "lessons 1-4 keep foundations separate from implemented motors",
        [1, 2, 3, 4].map((lessonId) => [lessonId, lessons[lessonId].status]),
        [
            [1, "implemented"],
            [2, "partially-implemented"],
            [3, "partially-implemented"],
            [4, "partially-implemented"],
        ]
    );
    s.eq(
        "lessons 1-4 reserve only foundation dependencies",
        [1, 2, 3, 4].map((lessonId) => lessons[lessonId].engineDependencies),
        [
            ["core/concepts"],
            ["core/phonology", "core/orthography"],
            ["core/particles"],
            ["core/clause"],
        ]
    );

    const foundationsGroup = curriculumGroups.find((group) => group.id === "foundations");
    s.eq("curriculum keeps lessons 1-4 grouped as foundations", {
        range: foundationsGroup.range,
        structures: foundationsGroup.structures,
        next: foundationsGroup.next,
    }, {
        range: [1, 4],
        structures: ["conceptos", "ortografia", "particulas", "clausula"],
        next: ["glosario activo", "normalizador ortografico", "inventario de particulas", "esqueleto de clausula"],
    });
    s.eq(
        "curriculum keeps lesson 2 and 4 partial in foundations",
        foundationsGroup.missing.map((row) => [row.lessons, row.state, row.target]),
        [
            ["2", "partial", "core/orthography + core/phonology"],
            ["3", "partial", "core/particles + data/static_particles"],
            ["4", "partial", "core/clause + data/static_formulae"],
        ]
    );

    s.eq(
        "lessons 5-7 are implemented VNC motors and 8-11 are partial mappings",
        [5, 6, 7, 8, 9, 10, 11].map((lessonId) => [lessonId, lessons[lessonId].status]),
        [
            [5, "implemented"],
            [6, "implemented"],
            [7, "implemented"],
            [8, "partially-implemented"],
            [9, "partially-implemented"],
            [10, "partially-implemented"],
            [11, "partially-implemented"],
        ]
    );
    s.eq(
        "lessons 5-11 distinguish implemented VNC motors from missing sentence layer",
        [5, 6, 7, 8, 9, 10, 11].map((lessonId) => lessons[lessonId].engineDependencies),
        [
            ["core/agreement", "core/vnc", "core/preterit"],
            ["core/agreement", "core/vnc"],
            ["core/vnc", "core/preterit"],
            ["core/vnc", "core/agreement", "core/sentence"],
            ["core/vnc", "core/sentence"],
            ["core/vnc", "core/sentence"],
            ["core/irregulars"],
        ]
    );

    const verbalCoreGroup = curriculumGroups.find((group) => group.id === "verbal-core");
    s.eq("curriculum keeps lessons 5-11 grouped as VNC basic", {
        range: verbalCoreGroup.range,
        structures: verbalCoreGroup.structures,
        next: verbalCoreGroup.next,
    }, {
        range: [5, 11],
        structures: ["acuerdo", "VNC", "preterito", "irregulares"],
        next: ["capa de oracion", "matriz de modos", "catalogo irregular"],
    });
    s.eq(
        "curriculum keeps VNC motors partial only for explanation and sentence-level gaps",
        verbalCoreGroup.missing.map((row) => [row.lessons, row.state, row.target]),
        [
            ["5-6", "partial", "ui/paradigms + core/agreement"],
            ["7", "partial", "data/static_verbstem_classes"],
            ["8", "partial", "core/sentence + core/clause"],
            ["9-10", "partial", "core/clause/mood + data/static_modes"],
            ["11", "partial", "core/irregulars + data/static_irregular_vnc"],
            ["A,C", "partial", "ui/paradigms"],
        ]
    );

    const appendices = byId(appendixRegistry);
    s.eq(
        "appendices A and C are implemented reference surfaces for VNC basics",
        [appendices.A.status, appendices.C.status],
        ["implemented", "implemented"]
    );
    s.eq(
        "appendix D is partial boundary metadata rather than numeral generation",
        {
            status: appendices.D.status,
            dependencies: appendices.D.engineDependencies,
            notes: appendices.D.notes,
        },
        {
            status: "partially-implemented",
            dependencies: ["core/nnc", "core/nnc/numerals"],
            notes: "Diagnostic numeral-NNC boundary metadata exists; no confirmed numeral data or generation",
        }
    );
    s.eq(
        "appendix E is partial boundary metadata rather than calendar generation",
        {
            status: appendices.E.status,
            dependencies: appendices.E.engineDependencies,
            notes: appendices.E.notes,
        },
        {
            status: "partially-implemented",
            dependencies: ["core/calendar"],
            notes: "Diagnostic calendar-name boundary metadata exists; no confirmed calendar data or generation",
        }
    );
    s.eq(
        "appendix F is partial orthography bridge metadata rather than Appendix F spelling generation",
        {
            status: appendices.F.status,
            dependencies: appendices.F.engineDependencies,
            notes: appendices.F.notes,
        },
        {
            status: "partially-implemented",
            dependencies: ["core/orthography"],
            notes: "Diagnostic Classical/Appendix F spelling bridge metadata exists; no Appendix F spelling normalizer or fixture-backed alias data",
        }
    );

    s.eq(
        "derived-verb lessons distinguish audited motors from voice, object, causative, and frequentative partials",
        [20, 21, 22, 23, 24, 25, 26, 27].map((lessonId) => [lessonId, lessons[lessonId].status]),
        [
            [20, "implemented"],
            [21, "partially-implemented"],
            [22, "partially-implemented"],
            [23, "partially-implemented"],
            [24, "partially-implemented"],
            [25, "partially-implemented"],
            [26, "partially-implemented"],
            [27, "partially-implemented"],
        ]
    );
    s.ok("lesson 23 notes object-function and silent-morph gap", /función de objeto/.test(lessons[23].notes) && /morfemas silenciosos/.test(lessons[23].notes));
    s.ok("lesson 24 notes final-vowel, destockal, and source-CNV gaps", /vocal final/.test(lessons[24].notes) && /desacervales/.test(lessons[24].notes) && /cláusula verbal a objeto/.test(lessons[24].notes));
    s.ok("lesson 25 notes source-CNV and silent-object gaps", /cláusula verbal fuente/.test(lessons[25].notes) && /objeto silencioso/.test(lessons[25].notes));
    s.ok("lesson 26 notes source-CNV and object-plus-suffix gaps", /cláusula verbal fuente/.test(lessons[26].notes) && /objeto-más-sufijo/.test(lessons[26].notes));
    s.ok("lesson 27 notes frequentative generation gap", /límite frecuentativo/.test(lessons[27].notes) && /pronombre objeto/.test(lessons[27].notes));
    s.eq(
        "lessons 20-27 keep voice, object, causative, and frequentative audits separate from current derivation motors",
        [20, 21, 22, 23, 24, 25, 26, 27].map((lessonId) => lessons[lessonId].engineDependencies),
        [
            ["core/derivation"],
            ["core/derivation", "core/vnc"],
            ["core/derivation", "core/vnc"],
            ["core/agreement", "core/vnc"],
            ["core/derivation"],
            ["core/derivation"],
            ["core/derivation"],
            ["core/derivation/frequentative"],
        ]
    );

    const derivedVerbsGroup = curriculumGroups.find((group) => group.id === "derived-verbs");
    s.eq("curriculum keeps lessons 20-27 grouped as derived verbs", {
        range: derivedVerbsGroup.range,
        structures: derivedVerbsGroup.structures,
        next: derivedVerbsGroup.next,
    }, {
        range: [20, 27],
        structures: ["derivacion", "valencia", "voz"],
        next: ["pasivo", "impersonal", "objetos", "causativo 1", "causativo 2", "aplicativo", "frecuentativo"],
    });
    s.eq(
        "curriculum keeps passive, impersonal, object, causative, and frequentative rows pending for derived verbs",
        derivedVerbsGroup.missing.map((row) => [row.lessons, row.state, row.target]),
        [
            ["21", "partial", "core/generation/valency + core/vnc"],
            ["22", "partial", "core/generation/valency + core/vnc"],
            ["23", "partial", "core/agreement + core/vnc"],
            ["24", "partial", "core/derivation + core/vnc"],
            ["25", "partial", "core/derivation + core/vnc"],
            ["26", "partial", "core/derivation + core/vnc"],
            ["27", "partial", "core/derivation/frequentative"],
        ]
    );
    s.eq(
        "curriculum no longer counts implemented derived-verb motors as pending rows",
        derivedVerbsGroup.missing
            .filter((row) => /20/.test(row.lessons))
            .map((row) => row.lessons),
        []
    );

    s.eq(
        "lessons 28-34 stay partial with boundary metadata",
        [28, 29, 30, 31, 32, 33, 34].map((lessonId) => [lessonId, lessons[lessonId].status]),
        [
            [28, "partially-implemented"],
            [29, "partially-implemented"],
            [30, "partially-implemented"],
            [31, "partially-implemented"],
            [32, "partially-implemented"],
            [33, "partially-implemented"],
            [34, "partially-implemented"],
        ]
    );
    s.eq(
        "lessons 28-34 keep parser compounds and boundary metadata separate from missing engines",
        [28, 29, 30, 31, 32, 33, 34].map((lessonId) => lessons[lessonId].engineDependencies),
        [
            ["core/parsing", "core/vnc"],
            ["core/vnc/purposive"],
            ["core/parsing", "core/vnc"],
            ["core/nnc", "core/nnc/compound"],
            ["core/nnc", "core/nnc/compound"],
            ["core/vnc", "core/vnc/honorific_pejorative"],
            ["core/nnc", "core/nnc/numerals"],
        ]
    );

    const compoundStemsGroup = curriculumGroups.find((group) => group.id === "compound-stems");
    s.eq("curriculum keeps lessons 28-34 grouped as compounds", {
        range: compoundStemsGroup.range,
        structures: compoundStemsGroup.structures,
        next: compoundStemsGroup.next,
    }, {
        range: [28, 34],
        structures: ["parser", "compuestos", "NNC/VNC"],
        next: ["purposivo", "NNC compuesto", "numeral y honorifico"],
    });
    s.eq(
        "curriculum marks compound constructor and boundary metadata partial in 28-34",
        compoundStemsGroup.missing.map((row) => [row.lessons, row.state, row.target]),
        [
            ["28,30", "partial", "core/parsing + core/compound"],
            ["29", "partial", "core/vnc/purposive"],
            ["31-32", "partial", "core/nnc/compound + data/static_affective_nnc"],
            ["33", "partial", "core/vnc/honorific_pejorative"],
            ["34,D", "partial", "core/nnc/numerals + data/static_numbers"],
        ]
    );
    s.eq(
        "curriculum labels Lesson 28/30 compound work in Spanish",
        compoundStemsGroup.missing[0].label,
        "compuesto verbal/nominal"
    );

    const nominalFormationLessons = Array.from({ length: 9 }, (_, index) => lessons[index + 35]);
    s.eq(
        "lessons 35-43 remain partial with modification boundary metadata",
        nominalFormationLessons.map((lesson) => [lesson.id, lesson.status]),
        [
            [35, "partially-implemented"],
            [36, "partially-implemented"],
            [37, "partially-implemented"],
            [38, "partially-implemented"],
            [39, "partially-implemented"],
            [40, "partially-implemented"],
            [41, "partially-implemented"],
            [42, "partially-implemented"],
            [43, "partially-implemented"],
        ]
    );
    s.eq(
        "lessons 35-39 keep NNC plus derivation dependencies",
        [35, 36, 37, 38, 39].map((lessonId) => lessons[lessonId].engineDependencies),
        [
            ["core/nnc", "core/nnc/nominalization", "core/derivation"],
            ["core/nnc", "core/nnc/nominalization", "core/derivation"],
            ["core/nnc", "core/nnc/nominalization", "core/derivation"],
            ["core/nnc", "core/nnc/nominalization", "core/derivation"],
            ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        ]
    );
    s.eq(
        "lessons 40-43 separate adjectival output from modification AST",
        [40, 41, 42, 43].map((lessonId) => lessons[lessonId].engineDependencies),
        [
            ["core/nnc", "core/nnc/adjectival"],
            ["core/nnc", "core/nnc/adjectival"],
            ["core/clause", "core/clause/modification"],
            ["core/clause", "core/clause/modification"],
        ]
    );

    const nominalFormationGroup = curriculumGroups.find((group) => group.id === "nominal-formation");
    s.eq("curriculum keeps lessons 35-43 grouped as nominal formation", {
        range: nominalFormationGroup.range,
        structures: nominalFormationGroup.structures,
        next: nominalFormationGroup.next,
    }, {
        range: [35, 43],
        structures: ["nominalizacion", "adjetivos", "modificacion"],
        next: ["registro por fuente", "funcion adjetival", "AST de modificacion"],
    });
    s.eq(
        "curriculum distinguishes partial nominal/adjectival motors from boundary modification AST",
        nominalFormationGroup.missing.map((row) => [row.lessons, row.state, row.target]),
        [
            ["35", "partial", "core/nnc/nominalization"],
            ["36", "partial", "data/static_nominalized_vnc_rules"],
            ["37", "partial", "core/nnc/nominalization + evidence"],
            ["38-39", "partial", "core/nnc/nominalization + patientiveFamilyProfile"],
            ["40-41", "partial", "core/nnc/adjectival + ui/adjective"],
            ["42-43", "partial", "core/clause/modification"],
        ]
    );

    s.eq(
        "lessons 44-50 are partial boundary mappings",
        [44, 45, 46, 47, 48, 49, 50].map((lessonId) => [lessonId, lessons[lessonId].status]),
        [
            [44, "partially-implemented"],
            [45, "partially-implemented"],
            [46, "partially-implemented"],
            [47, "partially-implemented"],
            [48, "partially-implemented"],
            [49, "partially-implemented"],
            [50, "partially-implemented"],
        ]
    );
    s.eq(
        "lessons 45-50 use boundary metadata dependencies",
        [44, 45, 46, 47, 48, 49, 50].map((lessonId) => lessons[lessonId].engineDependencies),
        [
            ["core/clause", "core/clause/adverbial"],
            ["core/nnc", "core/nnc/relational"],
            ["core/nnc", "core/nnc/relational"],
            ["core/nnc", "core/nnc/relational"],
            ["core/nnc", "core/nnc/place_gentilic"],
            ["core/clause", "core/clause/adjunction"],
            ["core/clause", "core/clause/adjunction"],
        ]
    );

    const relationsAdverbsGroup = curriculumGroups.find((group) => group.id === "relations-adverbs");
    s.eq("curriculum keeps lessons 44-50 grouped as relations", {
        range: relationsAdverbsGroup.range,
        structures: relationsAdverbsGroup.structures,
        next: relationsAdverbsGroup.next,
    }, {
        range: [44, 50],
        structures: ["relacional", "adverbio", "lugar"],
        next: ["registro relacional", "lugar y gentilicio", "adjuncion adverbial"],
    });
    s.eq(
        "curriculum marks relation/place/adjunction boundaries partial while data gaps remain missing",
        relationsAdverbsGroup.missing.map((row) => [row.lessons, row.state, row.target]),
        [
            ["44", "partial", "core/clause + data/static_adverbials"],
            ["45-47", "missing", "data/static_relational_nnc"],
            ["45-47", "partial", "core/nnc/relational"],
            ["48", "missing", "data/static_places + data/static_gentilics"],
            ["48", "partial", "core/nnc/place_gentilic"],
            ["49-50", "missing", "data/static_adverbial_adjunction + clause-adjunction AST"],
            ["49-50", "partial", "core/clause/adjunction"],
            ["E", "missing", "data/static_calendar"],
            ["E", "partial", "core/calendar"],
        ]
    );

    s.eq(
        "lessons 51-58 are partial boundary or route mappings",
        [51, 52, 53, 54, 55, 56, 57, 58].map((lessonId) => [lessonId, lessons[lessonId].status]),
        [
            [51, "partially-implemented"],
            [52, "partially-implemented"],
            [53, "partially-implemented"],
            [54, "partially-implemented"],
            [55, "partially-implemented"],
            [56, "partially-implemented"],
            [57, "partially-implemented"],
            [58, "partially-implemented"],
        ]
    );
    s.eq(
        "lessons 51-58 expose boundary/derivation dependencies without generation claims",
        [51, 52, 53, 54, 55, 56, 57, 58].map((lessonId) => lessons[lessonId].engineDependencies),
        [
            ["core/clause", "core/clause/complement"],
            ["core/clause", "core/clause/conjunction"],
            ["core/comparison"],
            ["core/derivation", "core/vnc"],
            ["core/derivation", "core/vnc"],
            ["core/nnc", "core/nnc/names"],
            ["core/analysis"],
            ["core/analysis"],
        ]
    );

    const clauseNamesGroup = curriculumGroups.find((group) => group.id === "clause-names");
    s.eq("curriculum keeps lessons 51-58 grouped as clause and names", {
        range: clauseNamesGroup.range,
        structures: clauseNamesGroup.structures,
        next: clauseNamesGroup.next,
    }, {
        range: [51, 58],
        structures: ["sintaxis", "denominal", "nombres"],
        next: ["AST de clausulas", "comparacion", "nombres y diagnosticos"],
    });
    s.eq(
        "curriculum marks 51-53 boundaries and 54-55 denominal partial while data gaps remain missing",
        clauseNamesGroup.missing.map((row) => [row.lessons, row.state, row.target]),
        [
            ["51", "missing", "data/static_complements + complement AST"],
            ["51", "partial", "core/clause/complement"],
            ["52", "missing", "data/static_conjunctions + conjunction AST"],
            ["52", "partial", "core/clause/conjunction"],
            ["53", "missing", "data/static_comparisons + comparison AST"],
            ["53", "partial", "core/comparison"],
            ["54-55", "partial", "core/derivation/denominal"],
            ["56,E", "missing", "data/static_names + data/static_calendar"],
            ["56,E", "partial", "core/nnc/names"],
            ["57-58", "missing", "data/static_analysis + analysis AST"],
            ["57-58", "partial", "core/analysis"],
            ["F", "partial", "core/orthography + data/static_old_spellings"],
        ]
    );

    return s;
}

module.exports = { run };
