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
    const appendixRegistry = loadRegistryConst("src/appendices/registry.js", "APPENDIX_REGISTRY");
    const appendixRegistryMjs = loadRegistryConst("src/appendices/registry.mjs", "APPENDIX_REGISTRY");
    const curriculumGroups = loadRegistryConst("src/ui/curriculum/curriculum.js", "CURRICULUM_BOOK_GROUPS");
    const curriculumArchitectureNote = loadRegistryConst("src/ui/curriculum/curriculum.js", "CURRICULUM_ARCHITECTURE_NOTE");
    const getCurriculumMissingCategory = loadRegistryConst("src/ui/curriculum/curriculum.js", "getCurriculumMissingCategory");
    const curriculumSource = fs.readFileSync(path.join(ROOT, "src/ui/curriculum/curriculum.js"), "utf8");

    s.eq("lesson registry js/mjs payloads match", lessonRegistryMjs, lessonRegistry);
    s.eq("appendix registry js/mjs payloads match", appendixRegistryMjs, appendixRegistry);
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
        "partially-implemented": 43,
        implemented: 10,
        "not-mapped": 5,
    });

    const lessons = byId(lessonRegistry);
    [1, 2, 3, 4, 8, 9, 10, 11].forEach((lessonId) => {
        s.eq(`lesson ${lessonId} is partial Andrews coverage`, lessons[lessonId].status, "partially-implemented");
    });
    s.ok("lesson 1 notes concept glossary gap", /concept and notation registry/.test(lessons[1].notes));
    s.ok("lesson 2 notes Classical orthography gap", /Classical orthography/.test(lessons[2].notes));
    s.ok("lesson 3 notes particle inventory gap", /particle placement metadata/.test(lessons[3].notes));
    s.ok("lesson 4 notes nuclear-clause shell gap", /Nuclear-clause shell/.test(lessons[4].notes));
    s.ok("lesson 8 notes sentence generation gap", /sentence-layer metadata/.test(lessons[8].notes));
    s.ok("lesson 9 notes sentence-level optative gap", /sentence-level optative/.test(lessons[9].notes));
    s.ok("lesson 10 notes sentence-level admonition gap", /sentence-level admonition/.test(lessons[10].notes));
    s.ok("lesson 11 notes broader Andrews irregular gap", /Andrews irregular/.test(lessons[11].notes));

    s.eq(
        "lessons 1-4 keep foundations separate from implemented motors",
        [1, 2, 3, 4].map((lessonId) => [lessonId, lessons[lessonId].status]),
        [
            [1, "partially-implemented"],
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
        next: ["glosario visible", "normalizador ortografico", "inventario de particulas", "esqueleto de clausula"],
    });
    s.eq(
        "curriculum keeps lesson 2 and 4 partial in foundations",
        foundationsGroup.missing.map((row) => [row.lessons, row.state, row.target]),
        [
            ["1", "partial", "core/concepts + ui/glossary"],
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
        "appendix F is partial orthography bridge metadata rather than old-spelling generation",
        {
            status: appendices.F.status,
            dependencies: appendices.F.engineDependencies,
            notes: appendices.F.notes,
        },
        {
            status: "partially-implemented",
            dependencies: ["core/orthography"],
            notes: "Diagnostic older/Classical spelling bridge metadata exists; no old-spelling normalizer or fixture-backed alias data",
        }
    );

    s.eq(
        "lessons 20-26 are implemented while 27 remains unmapped",
        [20, 21, 22, 23, 24, 25, 26, 27].map((lessonId) => [lessonId, lessons[lessonId].status]),
        [
            [20, "implemented"],
            [21, "implemented"],
            [22, "implemented"],
            [23, "implemented"],
            [24, "implemented"],
            [25, "implemented"],
            [26, "implemented"],
            [27, "partially-implemented"],
        ]
    );
    s.ok("lesson 27 notes frequentative generation gap", /frequentative boundary metadata/.test(lessons[27].notes));
    s.eq(
        "lessons 20-27 keep frequentative separate from current derivation motors",
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
        next: ["frecuentativo"],
    });
    s.eq(
        "curriculum keeps only the frequentative row pending for derived verbs",
        derivedVerbsGroup.missing.map((row) => [row.lessons, row.state, row.target]),
        [
            ["27", "partial", "core/derivation/frequentative"],
        ]
    );
    s.eq(
        "curriculum no longer counts implemented lessons 20-26 as pending rows",
        derivedVerbsGroup.missing
            .filter((row) => /20|21|22|23|24|25|26/.test(row.lessons))
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
