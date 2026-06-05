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

    s.eq("lesson registry js/mjs payloads match", lessonRegistryMjs, lessonRegistry);
    s.eq("appendix registry js/mjs payloads match", appendixRegistryMjs, appendixRegistry);

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
        placeholder: 3,
        "partially-implemented": 19,
        implemented: 10,
        "not-mapped": 26,
    });

    const lessons = byId(lessonRegistry);
    [2, 9, 10, 11].forEach((lessonId) => {
        s.eq(`lesson ${lessonId} is partial Andrews coverage`, lessons[lessonId].status, "partially-implemented");
    });
    s.ok("lesson 2 notes Classical orthography gap", /Classical orthography/.test(lessons[2].notes));
    s.ok("lesson 9 notes sentence-level optative gap", /sentence-level optative/.test(lessons[9].notes));
    s.ok("lesson 10 notes sentence-level admonition gap", /sentence-level admonition/.test(lessons[10].notes));
    s.ok("lesson 11 notes broader Andrews irregular gap", /Andrews irregular/.test(lessons[11].notes));

    return s;
}

module.exports = { run };
