#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { createModuleRuntime } = require("./lib/module_runtime");
const {
    EXPECTED_SOURCE_SHA256,
    extractKarttunenApplicativeRelations,
    extractKarttunenCausativeRelations,
    getBoundarylessIdentity,
    runInference,
} = require("./infer_classical_karttunen_1992_causative_boundaries");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_CAUSATIVE_REPORT = path.join(ROOT, "reports", "generated", "karttunen_1992_causative_boundaries", "karttunen_1992_causative_boundary_projection.json");
const DEFAULT_OUTPUT_DIR = path.join(ROOT, "reports", "generated", "karttunen_1992_lessons24_26_types");
const CONFIRMED_OVERLAP_MODULE = path.join(ROOT, "src", "core", "classical", "karttunen_1992_confirmed_overlap_data.mjs");

function freezeCatalogType(type) {
    return Object.freeze({
        ...type,
        canvasExamples: Object.freeze((type.canvasExamples || []).map(example => Object.freeze({ ...example }))),
        subtypes: Object.freeze((type.subtypes || []).map(subtype => Object.freeze({
            ...subtype,
            canvasExamples: Object.freeze((subtype.canvasExamples || []).map(example => Object.freeze({ ...example }))),
        }))),
        negativeExamples: Object.freeze((type.negativeExamples || []).map(example => Object.freeze({ ...example }))),
    });
}

const L24_TYPES = Object.freeze([
    freezeCatalogType({
        typeId: "l24-2431a-final-i-replacement",
        lesson: "24",
        section: "24.3.1.a",
        title: "Final i replacement by causative a",
        family: "a",
        prerequisite: "typed intransitive zero-object Class B source ending in i; lexical selection or a more specific destockal preference may be required",
        transformation: "remove final i and add short causative a after the resulting consonant",
        targetClass: "B",
        canvasExamples: [
            { source: "mani", target: "man-a" },
            { source: "tomi", target: "tom-a" },
            { source: "tēmi", target: "tēm-a" },
        ],
        subtypes: [
            { subtypeId: "l24-2431a-huaqui-consonant-alternation", section: "24.3.1.a", title: "Exact final-consonant alternation", canvasExamples: [{ source: "huā-qui", target: "huā-tz-a" }] },
            { subtypeId: "l24-2457-ni-replacement", section: "24.5.7.a", title: "Destockal ni replacement preference", canvasExamples: [{ source: "tlap-a-ni", target: "tlap-a-n-a" }, { source: "tzay-ā-ni", target: "tzay-ā-n-a" }, { source: "cot-ō-ni", target: "cot-ō-n-a" }] },
            { subtypeId: "l24-2457-hui-replacement", section: "24.5.7.b", title: "Destockal hui majority replacement", canvasExamples: [{ source: "chay-ā-hui", target: "chay-a-hu-a" }, { source: "tōy-ā-hui", target: "tōy-ā-hu-a" }] },
            { subtypeId: "l24-2459-fused-mini-replacement", section: "24.5.9", title: "Fused destockal mīni replacement", canvasExamples: [{ source: "mī-ni", target: "mi-n-a" }] },
        ],
    }),
    freezeCatalogType({
        typeId: "l24-2431b-final-i-addition",
        lesson: "24",
        section: "24.3.1.b",
        title: "Final i preservation plus causative ā",
        family: "ā",
        prerequisite: "typed intransitive zero-object source ending in i; Class A selects addition and Class B may require lexical choice",
        transformation: "preserve the full source and append long causative ā after its final vowel",
        targetClass: "C",
        canvasExamples: [
            { source: "ilpi", target: "ilpi-ā" },
            { source: "aqui", target: "aqui-ā" },
            { source: "pah-ti", target: "pah-ti-ā" },
        ],
        subtypes: [
            { subtypeId: "l24-2457-ni-addition", section: "24.5.7.a", title: "Destockal ni majority addition", canvasExamples: [{ source: "chacu-ā-ni", target: "chacu-ā-ni-ā" }, { source: "ol-i-ni", target: "ol-i-ni-a" }, { source: "tzoy-o-ni", target: "tzoy-o-ni-a" }] },
            { subtypeId: "l24-2457-hui-addition", section: "24.5.7.b", title: "Destockal hui exceptional addition", canvasExamples: [{ source: "tlap-i-hui", target: "tlap-i-hui-ā" }] },
            { subtypeId: "l24-2459-fused-addition", section: "24.5.9", title: "Fused destockal addition", canvasExamples: [{ source: "xi-ni", target: "xī-ni-ā" }, { source: "cē-hui", target: "cē-hui-ā" }] },
        ],
    }),
    freezeCatalogType({
        typeId: "l24-2432a-final-a-homophonous-replacement",
        lesson: "24",
        section: "24.3.2.a",
        title: "Final a morphological replacement",
        family: "a",
        prerequisite: "typed intransitive zero-object Class A source ending in non-ya a",
        transformation: "replace source-final a with causative a; the imperfective spelling is unchanged but the target becomes Class B",
        targetClass: "B",
        canvasExamples: [{ source: "ē-hua", target: "ē-hu-a", note: "same boundaryless imperfective surface; perfective class distinguishes the derivation" }],
        subtypes: [
            { subtypeId: "l24-2432b-note-yocoya-retentive", section: "24.3.2.b note", title: "Root-plus-ya retentive exception following §24.3.2.a", canvasExamples: [{ source: "yoco-ya", target: "yoco-y-a" }] },
        ],
    }),
    freezeCatalogType({
        typeId: "l24-2432b-root-plus-ya-replacement",
        lesson: "24",
        section: "24.3.2.b",
        title: "Root-plus-ya replacement by causative ā",
        family: "ā",
        prerequisite: "typed intransitive zero-object Class A/B source with a root-plus-ya analysis",
        transformation: "delete derivational ya and add long causative ā after the root-final vowel",
        targetClass: "C",
        canvasExamples: [{ source: "coco-ya", target: "coco-ā" }, { source: "tlap-ī-hui-ya", target: "tlap-i-hui-ā" }],
    }),
    freezeCatalogType({
        typeId: "l24-2465-destockal-hua-replacement",
        lesson: "24",
        section: "24.6.5",
        title: "Destockal long-vowel hua replacement",
        family: "a",
        prerequisite: "typed intransitive zero-object Class A/B source internally analyzed as root plus ā/ē plus hua",
        transformation: "replace the hua stem formative morphologically with hu-a; the boundaryless surface is unchanged",
        targetClass: "B",
        canvasExamples: [{ source: "chip-ā-hua", target: "chip-ā-hu-a" }, { source: "tōn-ē-hua", target: "tōn-ē-hu-a" }],
    }),
    freezeCatalogType({
        typeId: "l24-247-destockal-i-a-hui-to-o-a",
        lesson: "24",
        section: "24.7",
        title: "Destockal i-hui/a-hui replacement by o-ā",
        family: "o-ā",
        prerequisite: "typed intransitive zero-object Class B source internally analyzed as root plus i/a plus hui and not covered by an exact lexical gap",
        transformation: "replace the stock-formative-plus-hui sequence i-hui/a-hui with o-ā",
        targetClass: "C",
        canvasExamples: [{ source: "pol-i-hui", target: "pol-o-ā" }, { source: "pix-a-hui", target: "pix-o-ā" }],
        negativeExamples: [{ source: "pil-i-hui", reason: "Canvas §24.7 note 2 states that this source has no o-ā causative" }],
    }),
    freezeCatalogType({
        typeId: "l24-247n1-destockal-o-hui-to-o-a",
        lesson: "24",
        section: "24.7 note 1",
        title: "Destockal o-hui replacement by o-ā",
        family: "o-ā",
        prerequisite: "typed intransitive zero-object Class B source internally analyzed as root plus o plus hui",
        transformation: "preserve root plus o and replace final hui with long causative ā",
        targetClass: "C",
        canvasExamples: [{ source: "tlap-o-hui", target: "tlap-o-ā" }],
    }),
]);

const L25_TYPES = Object.freeze([
    Object.freeze({ typeId: "l25-suppletive-huica", lesson: "25", section: "25.1 note", title: "Suppletive huīca", family: "suppletive", prerequisite: "exact ya-uh or huāl-la-uh lexical source" }),
    Object.freeze({ typeId: "l25-252-hua-to-tia", lesson: "25", section: "25.2", title: "hua nonactive to tiā", family: "tiā", prerequisite: "canonical typed Lesson 20 B-hua nonactive" }),
    Object.freeze({ typeId: "l25-2521-final-ki-ka-hua-tia", lesson: "25", section: "25.2.1", title: "Final qui/ca through hua to tiā", family: "tiā", prerequisite: "typed active source ending qui/ca with the §25.2 hua nonactive analysis" }),
    Object.freeze({ typeId: "l25-2522-final-si-sa-xi-tia", lesson: "25", section: "25.2.2", title: "Final ci/si/sa/za through xi-tiā", family: "tiā", prerequisite: "typed active source in the §25.2 sibilant class" }),
    Object.freeze({ typeId: "l25-2523-final-ti-ta-i-chi-tia", lesson: "25", section: "25.2.3", title: "Final ti/ta through ī/chi-tiā", family: "tiā", prerequisite: "typed active source ending ti/ta with its licensed §25.2 allomorph" }),
    Object.freeze({ typeId: "l25-2524-destockal-hui-to-tia", lesson: "25", section: "25.2.4", title: "Destockal i/a-hui to huī-tiā", family: "tiā", prerequisite: "intransitive typed destockal i/a-hui analysis plus lexical selection" }),
    Object.freeze({ typeId: "l25-253-o-or-ohua-to-tia", lesson: "25", section: "25.3", title: "ō or o-hua nonactive to tiā", family: "tiā", prerequisite: "canonical typed Lesson 20 B-ō or B-o-hua nonactive" }),
    Object.freeze({ typeId: "l25-2531-final-wi-uh-tia", lesson: "25", section: "25.3.1", title: "Final hui through uh-tiā", family: "tiā", prerequisite: "typed source ending hui with the §25.3 ō/o-hua nonactive analysis" }),
    Object.freeze({ typeId: "l25-2532-transitive-mi-n-tia", lesson: "25", section: "25.3.2", title: "Transitive final mi through n-tiā", family: "tiā", prerequisite: "typed transitive source ending mi with the §25.3 nonactive analysis" }),
    Object.freeze({ typeId: "l25-254-lo-to-l-tia", lesson: "25", section: "25.4", title: "lō nonactive to l-tiā", family: "l-tiā", prerequisite: "canonical typed Lesson 20 B-lō nonactive" }),
    Object.freeze({ typeId: "l25-2541-final-ki-ka-l-tia", lesson: "25", section: "25.4.1", title: "Final qui/ca through l-tiā", family: "l-tiā", prerequisite: "typed active source ending qui/ca with the §25.4 lō nonactive analysis" }),
    Object.freeze({ typeId: "l25-2542-final-ni-na-l-tia", lesson: "25", section: "25.4.2", title: "Final ni through ni/na-l-tiā", family: "l-tiā", prerequisite: "typed active source ending ni with the §25.4 lō nonactive analysis" }),
    Object.freeze({ typeId: "l25-2543-final-kwa-kwi-l-tia", lesson: "25", section: "25.4.3", title: "Final cua through cui-l-tiā", family: "l-tiā", prerequisite: "typed active source ending cua with the §25.4 lō nonactive analysis" }),
    Object.freeze({ typeId: "l25-2544-final-si-sa-xi-l-tia", lesson: "25", section: "25.4.4", title: "Final ci/si/sa/za through xi-l-tiā", family: "l-tiā", prerequisite: "typed sibilant-final active source with the §25.4 lō nonactive analysis" }),
    Object.freeze({ typeId: "l25-2545-final-wa-wi-l-tia", lesson: "25", section: "25.4.5", title: "Final hua/wa through hui/wa-l-tiā", family: "l-tiā", prerequisite: "typed active source ending hua/wa with the §25.4 lō nonactive analysis" }),
    Object.freeze({ typeId: "l25-2546-postvocalic-ti-chi-l-tia", lesson: "25", section: "25.4.6", title: "Postvocalic ti through chi-l-tiā", family: "l-tiā", prerequisite: "typed postvocalic-ti source with the §25.4 lō nonactive analysis" }),
    Object.freeze({ typeId: "l25-2547-denominal-itz-ti-l-tia", lesson: "25", section: "25.4.7", title: "Denominal itz-ti through itz-ti-l-tiā", family: "l-tiā", prerequisite: "typed denominal itz-ti source" }),
    Object.freeze({ typeId: "l25-2548-root-ya-lo", lesson: "25", section: "25.4.8", title: "Root-plus-ya hidden lō formation", family: "l-tiā", prerequisite: "exact or typed intransitive root-plus-ya analysis" }),
    Object.freeze({ typeId: "l25-2551-denominal-ti-lia", lesson: "25", section: "25.5.1", title: "Denominal ti causative in liā", family: "liā", prerequisite: "intransitive Class B typed denominal-ti source" }),
    Object.freeze({ typeId: "l25-2552-root-ya-lia", lesson: "25", section: "25.5.2", title: "Root-plus-ya causative in liā", family: "liā", prerequisite: "intransitive Class A/B typed root-plus-ya source" }),
    Object.freeze({ typeId: "l25-256-final-o-huia-direct", lesson: "25", section: "25.6", title: "Final ō direct huiā causative", family: "huiā", prerequisite: "intransitive Class A final ō with typed hua nonactive" }),
    Object.freeze({ typeId: "l25-256-final-o-huia-replacive", lesson: "25", section: "25.6", title: "Final ō replacive a-huiā causative", family: "huiā", prerequisite: "intransitive Class A final ō with typed hua nonactive" }),
    Object.freeze({ typeId: "l25-258-parallel-type-two-comparison", lesson: "25", section: "25.8", title: "Exact parallel type-two comparison", family: "tiā", prerequisite: "exact Canvas §25.8 comparison witness; analytical classification only, never a productive route" }),
]);

const L26_TYPES = Object.freeze([
    Object.freeze({ typeId: "l26-262-type-one-ia", lesson: "26", section: "26.2", title: "Lexically selected type-one iā", family: "iā", prerequisite: "exact lexical selection; shape is never a license" }),
    Object.freeze({ typeId: "l26-264-final-i-lia", lesson: "26", section: "26.4", title: "Final i plus liā", family: "liā", prerequisite: "typed source ending in i" }),
    Object.freeze({ typeId: "l26-264-sibilant-xi-lia", lesson: "26", section: "26.4", title: "Final ci/si to xi-liā", family: "liā", prerequisite: "typed final-i sibilant source" }),
    Object.freeze({ typeId: "l26-264-tzi-ti-chi-lia", lesson: "26", section: "26.4", title: "Final tzi/ti to chi-liā", family: "liā", prerequisite: "typed final-i source and the specified consonant environment" }),
    Object.freeze({ typeId: "l26-266-final-ia-lia", lesson: "26", section: "26.6", title: "Final iā to i-liā", family: "liā", prerequisite: "typed Class C final iā" }),
    Object.freeze({ typeId: "l26-267-consonant-a-i-lia", lesson: "26", section: "26.7", title: "Consonant+a to i-liā", family: "liā", prerequisite: "typed consonant-plus-a source" }),
    Object.freeze({ typeId: "l26-267-c-qui-lia", lesson: "26", section: "26.7", title: "c+a to qui-liā orthographic realization", family: "liā", prerequisite: "typed consonant-plus-a source ending ca" }),
    Object.freeze({ typeId: "l26-267-sa-za-xi-lia", lesson: "26", section: "26.7", title: "sa/za to xi-liā", family: "liā", prerequisite: "typed sa/za source" }),
    Object.freeze({ typeId: "l26-267-tla-tza-chi-lia", lesson: "26", section: "26.7", title: "tla/tza to chi-liā", family: "liā", prerequisite: "typed tla/tza source" }),
    Object.freeze({ typeId: "l26-267-tla-ti-lia-exact-shape", lesson: "26", section: "26.7", title: "Occasional tla to ti-liā", family: "liā", prerequisite: "exact lexical Andrews witness; shape alone is not a license" }),
    Object.freeze({ typeId: "l26-2681-class-d-append-lia", lesson: "26", section: "26.8.1", title: "Class D preserves source and appends liā", family: "liā", prerequisite: "typed Class D source" }),
    Object.freeze({ typeId: "l26-2682-transitive-iya-append-lia", lesson: "26", section: "26.8.2", title: "Transitive Class B iya preserves ya", family: "liā", prerequisite: "typed transitive Class B iya source" }),
    Object.freeze({ typeId: "l26-2683-intransitive-eya-delete-lia", lesson: "26", section: "26.8.3", title: "Intransitive Class B eya deletes ya", family: "liā", prerequisite: "typed intransitive Class B eya source" }),
    Object.freeze({ typeId: "l26-2684-oya-root-ya-delete-lia", lesson: "26", section: "26.8.4", title: "Typed oya or valence-neutral root-plus-ya deletion", family: "liā", prerequisite: "typed valence and root-plus-ya status" }),
    Object.freeze({ typeId: "l26-2691-root-l-oa-huia", lesson: "26", section: "26.9.1", title: "Root-final l o-ā to huiā", family: "huiā", prerequisite: "typed o-ā causative history with root-final l" }),
    Object.freeze({ typeId: "l26-2692-oa-al-il-huia", lesson: "26", section: "26.9.2", title: "o-ā to a/i-l-huiā", family: "huiā", prerequisite: "typed o-ā causative history and underlying a-hui/i-hui base" }),
    Object.freeze({ typeId: "l26-269-root-o-ya-l-huia", lesson: "26", section: "26.9", title: "Root-o or root-plus-ya l-huiā", family: "huiā", prerequisite: "typed o-ā causative history and root analysis" }),
    Object.freeze({ typeId: "l26-2694-oa-lia-exception", lesson: "26", section: "26.9.4", title: "Exceptional o-ā to o-liā", family: "liā", prerequisite: "exact lexical exception" }),
    Object.freeze({ typeId: "l26-2610-final-o-huia", lesson: "26", section: "26.10", title: "Intransitive final ō direct/replacive huiā", family: "huiā", prerequisite: "typed intransitive Class A final ō with canonical hua bridge" }),
    Object.freeze({ typeId: "l26-2611-rare-tia", lesson: "26", section: "26.11", title: "Rare lexical applicative tiā", family: "tiā", prerequisite: "exact lexical Andrews witness" }),
]);

const TYPE_BY_ID = new Map([...L24_TYPES, ...L25_TYPES, ...L26_TYPES].map(type => [type.typeId, type]));
const TYPE_ORDER = new Map([...L24_TYPES, ...L25_TYPES, ...L26_TYPES].map((type, index) => [type.typeId, index]));
const L25_TIER_ORDER = Object.freeze(["exact-andrews-canvas", "karttunen-nonactive-corroborated", "andrews-anchored-edit-compatible", "canvas-numbered-form-classification"]);

function assertInvariant(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function getCliValue(name, fallback = "") {
    const inline = process.argv.find(argument => argument.startsWith(`${name}=`));
    if (inline) {
        return inline.slice(name.length + 1);
    }
    const index = process.argv.indexOf(name);
    return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function pairIdentity(source = "", target = "") {
    return `${getBoundarylessIdentity(source)}\u0000${getBoundarylessIdentity(target)}`;
}

function relationId(operation, relation) {
    const code = operation === "causative" ? "c" : "a";
    return `karttunen-1992:${String(relation.csvRowNumbers[0]).padStart(6, "0")}:${code}:${getBoundarylessIdentity(relation.sourceOriginal)}>${getBoundarylessIdentity(relation.targetOriginal)}`;
}

function getRightEdgeEdit(sourceOriginal, targetOriginal) {
    const source = Array.from(getBoundarylessIdentity(sourceOriginal));
    const target = Array.from(getBoundarylessIdentity(targetOriginal));
    let commonPrefixLength = 0;
    while (commonPrefixLength < source.length && commonPrefixLength < target.length && source[commonPrefixLength] === target[commonPrefixLength]) {
        commonPrefixLength += 1;
    }
    const commonPrefix = source.slice(0, commonPrefixLength).join("");
    const sourceRemoved = source.slice(commonPrefixLength).join("");
    const targetAdded = target.slice(commonPrefixLength).join("");
    return Object.freeze({
        commonPrefix,
        commonPrefixLength,
        sourceRemoved,
        targetAdded,
        signature: `${sourceRemoved.toUpperCase()}→${targetAdded.toUpperCase()}`,
    });
}

function makeTypeCandidate(typeId, evidenceTier, classificationBasis, extras = {}) {
    const type = TYPE_BY_ID.get(typeId);
    assertInvariant(type, `unknown type id ${typeId}`);
    return Object.freeze({
        ...type,
        evidenceTier,
        classificationBasis,
        candidateRole: extras.candidateRole || "relation-type",
        ruleIds: Object.freeze([...(extras.ruleIds || [])]),
        routes: Object.freeze([...(extras.routes || [])]),
        sourcePrerequisites: Object.freeze([type.prerequisite, ...(extras.sourcePrerequisites || [])]),
        targetBoundaryHypotheses: Object.freeze([...(extras.targetBoundaryHypotheses || [])]),
        subtypeIds: Object.freeze([...(extras.subtypeIds || [])]),
        sourceGeneratedTargets: Object.freeze([...(extras.sourceGeneratedTargets || [])]),
        sourceProfiles: Object.freeze([...(extras.sourceProfiles || [])]),
        sourceAnalysisIds: Object.freeze([...(extras.sourceAnalysisIds || [])]),
        canvasPreferences: Object.freeze([...(extras.canvasPreferences || [])]),
        exactSourceWitness: extras.exactSourceWitness === true,
        classificationOnly: extras.classificationOnly === true,
        generationLicensed: false,
        authority: false,
    });
}

function dedupeCandidates(candidates) {
    const byIdentity = new Map();
    candidates.forEach(candidate => {
        const key = `${candidate.typeId}\u0000${candidate.evidenceTier}\u0000${candidate.candidateRole || "relation-type"}`;
        const existing = byIdentity.get(key);
        if (!existing) {
            byIdentity.set(key, candidate);
            return;
        }
        byIdentity.set(key, Object.freeze({
            ...existing,
            classificationBasis: Array.from(new Set([existing.classificationBasis, candidate.classificationBasis])).join("; "),
            ruleIds: Object.freeze(Array.from(new Set([...existing.ruleIds, ...candidate.ruleIds])).sort()),
            routes: Object.freeze(Array.from(new Set([...existing.routes, ...candidate.routes])).sort()),
            targetBoundaryHypotheses: Object.freeze(Array.from(new Set([...existing.targetBoundaryHypotheses, ...candidate.targetBoundaryHypotheses])).sort()),
            subtypeIds: Object.freeze(Array.from(new Set([...(existing.subtypeIds || []), ...(candidate.subtypeIds || [])])).sort()),
            sourceGeneratedTargets: Object.freeze(Array.from(new Set([...(existing.sourceGeneratedTargets || []), ...(candidate.sourceGeneratedTargets || [])])).sort()),
            sourceProfiles: Object.freeze(Array.from(new Set([...(existing.sourceProfiles || []), ...(candidate.sourceProfiles || [])])).sort()),
            sourceAnalysisIds: Object.freeze(Array.from(new Set([...(existing.sourceAnalysisIds || []), ...(candidate.sourceAnalysisIds || [])])).sort()),
            canvasPreferences: Object.freeze(Array.from(new Set([...(existing.canvasPreferences || []), ...(candidate.canvasPreferences || [])])).sort()),
            exactSourceWitness: existing.exactSourceWitness === true || candidate.exactSourceWitness === true,
        }));
    });
    return Object.freeze(Array.from(byIdentity.values()).sort((left, right) => (
        (TYPE_ORDER.get(left.typeId) ?? 999) - (TYPE_ORDER.get(right.typeId) ?? 999)
        || left.evidenceTier.localeCompare(right.evidenceTier)
    )));
}

function mapL24Route(route = "") {
    if ([
        "type-one-replacement-exact",
        "type-one-final-i-replacement",
        "type-one-final-i-consonant-alternation-exact",
        "type-one-fused-destockal-mini-replacement-exact",
    ].includes(route)) return "l24-2431a-final-i-replacement";
    if ([
        "type-one-final-i-addition",
        "type-one-fused-destockal-xini-addition-exact",
        "type-one-fused-destockal-cehui-addition-exact",
    ].includes(route)) return "l24-2431b-final-i-addition";
    if ([
        "type-one-final-a-morphological-replacement",
        "type-one-root-plus-ya-retentive-exception-exact",
    ].includes(route)) return "l24-2432a-final-a-homophonous-replacement";
    if (route === "type-one-root-plus-ya-replacement") return "l24-2432b-root-plus-ya-replacement";
    if (route === "type-one-destockal-hua-replacement") return "l24-2465-destockal-hua-replacement";
    if (route === "type-one-destockal-hui-to-o-a") return "l24-247-destockal-i-a-hui-to-o-a";
    if (route === "type-one-destockal-o-hui-to-o-a") return "l24-247n1-destockal-o-hui-to-o-a";
    return "";
}

function getL24SubtypeIds(option = {}) {
    const route = option.derivationRoute || "";
    const ruleId = option.ruleId || "";
    const analysisId = option.sourceAnalysisId || "";
    const subtypeIds = [];
    if (route === "type-one-final-i-consonant-alternation-exact" || ruleId.includes("huaqui")) {
        subtypeIds.push("l24-2431a-huaqui-consonant-alternation");
    }
    if (route === "type-one-root-plus-ya-retentive-exception-exact") {
        subtypeIds.push("l24-2432b-note-yocoya-retentive");
    }
    if (route === "type-one-fused-destockal-mini-replacement-exact") {
        subtypeIds.push("l24-2459-fused-mini-replacement");
    }
    if (["type-one-fused-destockal-xini-addition-exact", "type-one-fused-destockal-cehui-addition-exact"].includes(route)) {
        subtypeIds.push("l24-2459-fused-addition");
    }
    if (analysisId.includes("destockal-ni")) {
        subtypeIds.push(route.includes("addition") ? "l24-2457-ni-addition" : "l24-2457-ni-replacement");
    }
    if (analysisId.includes("destockal-hui") && !route.includes("to-o-a")) {
        subtypeIds.push(route.includes("addition") ? "l24-2457-hui-addition" : "l24-2457-hui-replacement");
    }
    return Array.from(new Set(subtypeIds)).sort();
}

function buildL24SourceFrame(context, stem, verbClass) {
    return context.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: "intransitive",
        transitivity: "intransitive",
        objectKind: "none",
        objectPerson: "",
    });
}

function getL24OptionCandidate(option, verbClass, relationTargetOriginal, candidateRole) {
    const typeId = mapL24Route(option.derivationRoute);
    if (!typeId) {
        return null;
    }
    const isExactPair = getBoundarylessIdentity(option.targetStem) === getBoundarylessIdentity(relationTargetOriginal);
    return makeTypeCandidate(
        typeId,
        candidateRole === "relation-type" ? "current-andrews-exact-pair" : "current-andrews-source-option",
        candidateRole === "relation-type"
            ? "the canonical typed evaluator generated the exact boundaryless Karttunen target under a supported intransitive profile"
            : "the canonical typed evaluator can generate this Lesson 24 alternative from the same source under a synthetic intransitive profile, but it does not generate the recorded Karttunen target",
        {
            candidateRole,
            ruleIds: [option.ruleId].filter(Boolean),
            routes: [option.derivationRoute].filter(Boolean),
            sourcePrerequisites: [`${verbClass}:intransitive`, option.sourceAnalysisSelectionRequired ? "source-analysis-selection-required" : ""].filter(Boolean),
            targetBoundaryHypotheses: isExactPair ? [option.targetStem] : [],
            subtypeIds: getL24SubtypeIds(option),
            sourceGeneratedTargets: [option.targetStem].filter(Boolean),
            sourceProfiles: [`${verbClass}:intransitive`],
            sourceAnalysisIds: [option.sourceAnalysisId].filter(Boolean),
            canvasPreferences: [option.canvasPreference].filter(Boolean),
            exactSourceWitness: option.exactWitness === true || String(option.authorityStatus || "").startsWith("exact-"),
        }
    );
}

function getL24SourceAndRelationCandidates(context, relation) {
    const sourceCandidates = [];
    const relationCandidates = [];
    for (const verbClass of ["A", "B"]) {
        const sourceFrame = buildL24SourceFrame(context, getBoundarylessIdentity(relation.sourceOriginal), verbClass);
        const inventory = context.getClassicalNahuatlVncDerivationOptionInventory(sourceFrame, { derivationType: "causative" });
        for (const option of inventory.options || []) {
            if (option.derivationSubtype !== "type-one" || !mapL24Route(option.derivationRoute)) {
                continue;
            }
            const sourceCandidate = getL24OptionCandidate(option, verbClass, relation.targetOriginal, "source-compatibility-only");
            if (sourceCandidate) {
                sourceCandidates.push(sourceCandidate);
            }
            if (getBoundarylessIdentity(option.targetStem) === getBoundarylessIdentity(relation.targetOriginal)) {
                const relationCandidate = getL24OptionCandidate(option, verbClass, relation.targetOriginal, "relation-type");
                if (relationCandidate) {
                    relationCandidates.push(relationCandidate);
                }
            }
        }
    }
    return Object.freeze({
        sourceCandidates: dedupeCandidates(sourceCandidates),
        relationCandidates: dedupeCandidates(relationCandidates),
    });
}

async function organizeLesson24(causativeReport, lesson25Records) {
    const { context } = await createModuleRuntime({ rootDir: ROOT });
    const lesson25ByPair = new Map(lesson25Records.map(record => [pairIdentity(record.sourceOriginal, record.targetOriginal), record]));
    const records = causativeReport.records.map(record => {
        const candidates = getL24SourceAndRelationCandidates(context, record);
        const lesson25Record = lesson25ByPair.get(pairIdentity(record.sourceOriginal, record.targetOriginal)) || null;
        const primaryCandidates = candidates.relationCandidates;
        const classificationStatus = primaryCandidates.length
            ? primaryCandidates.length === 1 ? "typed-lesson24-single" : "typed-lesson24-ambiguous"
            : lesson25Record?.primaryTypeCandidates.length
                ? "assigned-to-lesson25"
                : "untyped-across-lessons24-25";
        const laterLessonReference = lesson25Record ? Object.freeze({
            lesson: "25",
            classificationStatus: lesson25Record.classificationStatus,
            primaryEvidenceTier: lesson25Record.primaryEvidenceTier,
            primaryTypeId: lesson25Record.primaryTypeId,
            primaryTypeCandidates: Object.freeze([...lesson25Record.primaryTypeCandidates]),
            role: "the same recorded relation organized under Lesson 25; never a Lesson 24 membership or license",
        }) : null;
        return Object.freeze({
            relationId: relationId("causative", record),
            operation: "causative",
            lesson: "24",
            sourceOriginal: record.sourceOriginal,
            targetOriginal: record.targetOriginal,
            csvRowNumbers: Object.freeze([...record.csvRowNumbers]),
            relationLabels: Object.freeze([...record.relationLabels]),
            editSignature: record.editFrontier.signature,
            targetEndingFamily: record.editFrontier.targetEndingFamily || "",
            classificationStatus,
            evidenceStatus: primaryCandidates.length ? "current-andrews-exact-pair" : record.editFrontier?.targetEndingFamily ? "later-causative-ending-shape" : "raw-shape-anomaly",
            assignedLesson: primaryCandidates.length ? "24" : lesson25Record?.primaryTypeCandidates.length ? "25" : "",
            assignedTypeCandidates: Object.freeze(primaryCandidates.length ? primaryCandidates.map(candidate => candidate.typeId) : [...(lesson25Record?.primaryTypeCandidates || [])]),
            primaryEvidenceTier: primaryCandidates.length ? "current-andrews-exact-pair" : "",
            primaryTypeId: primaryCandidates.length === 1 ? primaryCandidates[0].typeId : "",
            primaryTypeCandidates: Object.freeze(primaryCandidates.map(candidate => candidate.typeId)),
            typeCandidates: candidates.relationCandidates,
            sourceTypeCandidates: candidates.sourceCandidates,
            sourceCompatibleWithLesson24: candidates.sourceCandidates.length > 0,
            sourceExactWitness: candidates.sourceCandidates.some(candidate => candidate.exactSourceWitness),
            crossReferences: Object.freeze(laterLessonReference ? [laterLessonReference] : []),
            laterLessonReference,
            recordedPairRuntimeOverlapStatus: record.runtimeOverlapStatus,
            exactTargetBoundaries: Object.freeze(candidates.relationCandidates.flatMap(candidate => candidate.targetBoundaryHypotheses)),
            compatibleTargetBoundaries: Object.freeze([]),
            typedPrerequisitesKnownFromKarttunen: false,
            roundTrip: candidates.relationCandidates.every(candidate => candidate.targetBoundaryHypotheses.every(boundary => getBoundarylessIdentity(boundary) === getBoundarylessIdentity(record.targetOriginal))),
            authority: Object.freeze({ grammar: false, generation: false, targetConstruction: false, selection: false, formula: false, surface: false }),
        });
    });
    return Object.freeze(records);
}

function mapL25Route(route = "") {
    if (route.includes("from-hua-nonactive")) return "l25-252-hua-to-tia";
    if (route.includes("from-o-nonactive") || route.includes("from-o-hua-nonactive")) return "l25-253-o-or-ohua-to-tia";
    if (route.includes("from-lo-nonactive")) return "l25-254-lo-to-l-tia";
    if (route.includes("denominal-ti")) return "l25-2551-denominal-ti-lia";
    if (route.includes("root-plus-ya")) return "l25-2552-root-ya-lia";
    if (route.includes("final-o-direct")) return "l25-256-final-o-huia-direct";
    if (route.includes("final-o-replacive")) return "l25-256-final-o-huia-replacive";
    if (route.includes("suppletive")) return "l25-suppletive-huica";
    return "";
}

function mapL25CanvasSection(section = "") {
    if (section === "25.2.4") return "l25-2524-destockal-hui-to-tia";
    if (section === "25.4.8") return "l25-2548-root-ya-lo";
    return "";
}

function mapL25NonactiveFamily(family = "") {
    if (family === "hua") return "l25-252-hua-to-tia";
    if (family === "ō" || family === "o-hua") return "l25-253-o-or-ohua-to-tia";
    if (family === "lō") return "l25-254-lo-to-l-tia";
    return "";
}

function getL25ExactCandidates(record) {
    const candidates = [];
    for (const candidate of record.andrewsCandidates || []) {
        const typeId = mapL25Route(candidate.derivationRoute);
        if (typeId) {
            candidates.push(makeTypeCandidate(typeId, "exact-andrews-canvas", "current typed evaluator route reproduced the exact boundaryless Karttunen target", {
                ruleIds: [candidate.ruleId].filter(Boolean),
                routes: [candidate.derivationRoute].filter(Boolean),
                sourcePrerequisites: (candidate.profiles || []).map(profile => `${profile.verbClass}:${profile.sourceValence}`),
                targetBoundaryHypotheses: [candidate.segmentedTarget].filter(Boolean),
            }));
        }
    }
    for (const section of record.canvasExactEvidence?.andrewsSections || []) {
        const typeId = mapL25CanvasSection(section);
        if (typeId) {
            candidates.push(makeTypeCandidate(typeId, "exact-andrews-canvas", `explicit Canvas §${section} source-target witness`, {
                targetBoundaryHypotheses: record.canvasExactEvidence.targetBoundaryCandidates || [],
            }));
        }
    }
    return dedupeCandidates(candidates);
}

function getL25NonactiveCandidates(record) {
    return dedupeCandidates((record.nonactiveCorroboration || []).flatMap(match => {
        const typeId = mapL25NonactiveFamily(match.family);
        return typeId ? [makeTypeCandidate(typeId, "karttunen-nonactive-corroborated", `same-source Karttunen ${match.family} nonactive exactly round-trips through the closed Andrews family transformation`, {
            targetBoundaryHypotheses: [match.targetBoundary],
        })] : [];
    }));
}

function foldForClassification(value = "") {
    return lowerBoundaryless(value).normalize("NFD").replace(/\p{M}/gu, "");
}

function makeL25Boundary(record, typeId) {
    const target = lowerBoundaryless(record.targetOriginal);
    const foldedTarget = foldForClassification(record.targetOriginal);
    if (typeId === "l25-suppletive-huica") return target;
    if (typeId === "l25-258-parallel-type-two-comparison") {
        const [base, suffix] = splitFromRight(target, 3);
        return `${base}-${suffix}`;
    }
    if (typeId.startsWith("l25-252") || typeId.startsWith("l25-253")) {
        const [base, suffix] = splitFromRight(target, 3);
        return `${base}-${suffix}`;
    }
    if (typeId.startsWith("l25-254")) {
        const suffixLength = foldedTarget.endsWith("ltia") ? 4 : 3;
        const [base, suffix] = splitFromRight(target, suffixLength);
        return suffixLength === 4 ? `${base}-${suffix[0]}-${suffix.slice(1)}` : `${base}-${suffix}`;
    }
    if (typeId.startsWith("l25-255")) {
        const [base, suffix] = splitFromRight(target, 3);
        return `${base}-${suffix}`;
    }
    if (typeId.startsWith("l25-256")) {
        const [base, suffix] = splitFromRight(target, 4);
        return `${base}-${suffix}`;
    }
    return "";
}

function classifyL25NumberedType(record, exactCandidates) {
    const source = foldForClassification(record.sourceOriginal);
    const target = foldForClassification(record.targetOriginal);
    const pair = pairIdentity(record.sourceOriginal, record.targetOriginal);
    const anomalyFlags = [];
    if (pair === pairIdentity("PĪNĀHUA", "PĪNĀUHTIĀ")) {
        return { typeIds: ["l25-258-parallel-type-two-comparison"], confidence: "exact-canvas-comparison", basis: "explicit Canvas §25.8 source-target witness, retained as a classified but nonproductive comparison type", anomalyFlags };
    }
    if (exactCandidates.some(candidate => candidate.typeId === "l25-suppletive-huica")) {
        return { typeIds: ["l25-suppletive-huica"], confidence: "exact-andrews", basis: "exact suppletive Canvas/Andrews source-target witness", anomalyFlags };
    }
    if (target.endsWith("ltia")) {
        let typeId = "l25-254-lo-to-l-tia";
        if (source.endsWith("itzti")) typeId = "l25-2547-denominal-itz-ti-l-tia";
        else if (source.endsWith("qui") || source.endsWith("ca")) typeId = "l25-2541-final-ki-ka-l-tia";
        else if (source.endsWith("ni")) typeId = "l25-2542-final-ni-na-l-tia";
        else if (source.endsWith("cua") || source.endsWith("qua") || source.endsWith("kwa")) typeId = "l25-2543-final-kwa-kwi-l-tia";
        else if (["ci", "si", "sa", "za"].some(ending => source.endsWith(ending))) typeId = "l25-2544-final-si-sa-xi-l-tia";
        else if (source.endsWith("hua") || source.endsWith("wa") || source.endsWith("hui")) typeId = "l25-2545-final-wa-wi-l-tia";
        else if (source.endsWith("ti")) typeId = "l25-2546-postvocalic-ti-chi-l-tia";
        else if (source.endsWith("ya")) typeId = "l25-2548-root-ya-lo";
        return { typeIds: [typeId], confidence: typeId === "l25-254-lo-to-l-tia" ? "chapter-family-shape" : "numbered-source-shape", basis: `target is l-tiā-shaped and the source right edge selects ${TYPE_BY_ID.get(typeId).section}`, anomalyFlags };
    }
    if (target.endsWith("huia")) {
        const directId = "l25-256-final-o-huia-direct";
        const replaciveId = "l25-256-final-o-huia-replacive";
        if (source.endsWith("o")) {
            const base = source.slice(0, -1);
            if (target === `${base}huia`) return { typeIds: [directId], confidence: "numbered-source-target-shape", basis: "final ō is replaced directly by huiā as in §25.6", anomalyFlags };
            if (target === `${base}ahuia`) return { typeIds: [replaciveId], confidence: "numbered-source-target-shape", basis: "final ō is replaced by a-huiā as in §25.6", anomalyFlags };
        }
        anomalyFlags.push("typed-final-o-prerequisite-not-recoverable-from-shape");
        return { typeIds: [directId, replaciveId], confidence: "chapter-family-ambiguous", basis: "huiā-shaped causative belongs to the two §25.6 realizations, but the raw tuple does not recover the typed final-ō analysis", anomalyFlags };
    }
    if (target.endsWith("lia")) {
        if (source.endsWith("ya")) return { typeIds: ["l25-2552-root-ya-lia"], confidence: "numbered-source-shape", basis: "root-plus-ya source and liā target select §25.5.2", anomalyFlags };
        if (source.endsWith("ti") || source.endsWith("tia") || target.endsWith("tilia")) return { typeIds: ["l25-2551-denominal-ti-lia"], confidence: "numbered-source-target-shape", basis: "ti edge before liā selects the §25.5.1 formation shape", anomalyFlags };
        anomalyFlags.push("typed-denominal-ti-or-root-ya-analysis-not-recoverable-from-shape");
        return { typeIds: ["l25-2551-denominal-ti-lia", "l25-2552-root-ya-lia"], confidence: "chapter-family-ambiguous", basis: "liā-shaped causative is confined to §25.5.1/§25.5.2, but the raw tuple does not recover denominal-ti versus root-plus-ya structure", anomalyFlags };
    }
    if (target.endsWith("tia")) {
        let typeId = "l25-252-hua-to-tia";
        if ((source.endsWith("ihui") || source.endsWith("ahui")) && target.endsWith("huitia")) typeId = "l25-2524-destockal-hui-to-tia";
        else if (source.endsWith("qui") || source.endsWith("ca")) typeId = "l25-2521-final-ki-ka-hua-tia";
        else if (["ci", "si", "sa", "za"].some(ending => source.endsWith(ending))) typeId = "l25-2522-final-si-sa-xi-tia";
        else if (source.endsWith("ti") || source.endsWith("ta")) typeId = "l25-2523-final-ti-ta-i-chi-tia";
        else if (source.endsWith("hui")) typeId = target.endsWith("uhtia") ? "l25-2531-final-wi-uh-tia" : "l25-2524-destockal-hui-to-tia";
        else if (source.endsWith("mi")) typeId = "l25-2532-transitive-mi-n-tia";
        else if (source.endsWith("oa") || source.endsWith("o") || source.endsWith("ohua")) typeId = "l25-253-o-or-ohua-to-tia";
        return { typeIds: [typeId], confidence: ["l25-252-hua-to-tia", "l25-253-o-or-ohua-to-tia"].includes(typeId) ? "chapter-family-shape" : "numbered-source-shape", basis: `tiā-shaped target and the source right edge select ${TYPE_BY_ID.get(typeId).section}`, anomalyFlags };
    }
    if (target.endsWith("tla")) {
        anomalyFlags.push("dictionary-form-outside-canonical-canvas-ending");
        if (source.endsWith("hui")) return { typeIds: ["l25-2524-destockal-hui-to-tia"], confidence: "nearest-numbered-type-with-anomaly", basis: "final hui selects §25.2.4; the raw dictionary target ends tla rather than the canonical tiā shape", anomalyFlags };
        if (source.endsWith("za") || source.endsWith("sa") || source.endsWith("ci")) return { typeIds: ["l25-2522-final-si-sa-xi-tia"], confidence: "nearest-numbered-type-with-anomaly", basis: "final za/sa/ci selects §25.2.2; the raw dictionary target ends tlā rather than the canonical tiā shape", anomalyFlags };
    }
    anomalyFlags.push("dictionary-form-outside-closed-canvas-endings");
    return { typeIds: ["l25-252-hua-to-tia", "l25-253-o-or-ohua-to-tia"], confidence: "chapter-family-ambiguous-with-anomaly", basis: "raw causative is confined analytically to the Lesson 25 tiā families, but its spelling does not expose a canonical numbered right edge", anomalyFlags };
}

function getL25EvidenceStatus(exactCandidates, nonactiveCandidates, anchoredCandidates, hasComparison) {
    if (exactCandidates.length) return exactCandidates.length === 1 ? "exact-single" : "exact-ambiguous";
    if (nonactiveCandidates.length) return nonactiveCandidates.length === 1 ? "nonactive-corroborated" : "nonactive-ambiguous";
    if (anchoredCandidates.length) return anchoredCandidates.length === 1 ? "shape-compatible-only" : "shape-ambiguous";
    if (hasComparison) return "exact-comparison-only";
    return "raw-shape-only";
}

function organizeLesson25(causativeReport) {
    const exactByPair = new Map(causativeReport.records.map(record => [pairIdentity(record.sourceOriginal, record.targetOriginal), getL25ExactCandidates(record)]));
    const records = causativeReport.records.map(record => {
        const exactCandidates = exactByPair.get(pairIdentity(record.sourceOriginal, record.targetOriginal)) || [];
        const nonactiveCandidates = getL25NonactiveCandidates(record);
        const anchoredTypeIds = new Set();
        for (const anchor of record.anchoredEditHypothesis?.anchors || []) {
            for (const candidate of exactByPair.get(pairIdentity(anchor.sourceOriginal, anchor.targetOriginal)) || []) {
                anchoredTypeIds.add(candidate.typeId);
            }
        }
        const anchoredCandidates = record.anchoredEditHypothesis
            ? Array.from(anchoredTypeIds, typeId => makeTypeCandidate(typeId, "andrews-anchored-edit-compatible", "same quantity-preserving right-edge edit signature as an exact Andrews/Canvas record; transfers no license or source analysis", {
                targetBoundaryHypotheses: [record.anchoredEditHypothesis.targetBoundary].filter(Boolean),
            }))
            : [];
        const crossReferences = (record.canvasExactEvidence?.andrewsSections || []).includes("25.8")
            ? Object.freeze([Object.freeze({ section: "25.8", role: "parallel type-one/type-two comparison witness", formationType: true, productive: false })])
            : Object.freeze([]);
        const analytical = classifyL25NumberedType(record, exactCandidates);
        const analyticalCandidates = analytical.typeIds.map(typeId => makeTypeCandidate(typeId, "canvas-numbered-form-classification", analytical.basis, {
            classificationOnly: true,
            targetBoundaryHypotheses: [makeL25Boundary(record, typeId)].filter(Boolean),
        }));
        const candidates = dedupeCandidates([...exactCandidates, ...nonactiveCandidates, ...anchoredCandidates, ...analyticalCandidates]);
        const primaryCandidates = dedupeCandidates(analyticalCandidates);
        const evidenceStatus = getL25EvidenceStatus(exactCandidates, nonactiveCandidates, anchoredCandidates, crossReferences.length > 0);
        const classificationStatus = primaryCandidates.length === 1 ? "typed-single" : "typed-ambiguous";
        assertInvariant(primaryCandidates.length > 0, `Lesson 25 row has no numbered type: ${record.sourceOriginal} -> ${record.targetOriginal}`);
        return Object.freeze({
            relationId: relationId("causative", record),
            operation: "causative",
            lesson: "25",
            sourceOriginal: record.sourceOriginal,
            targetOriginal: record.targetOriginal,
            csvRowNumbers: Object.freeze([...record.csvRowNumbers]),
            relationLabels: Object.freeze([...record.relationLabels]),
            originalBoundaryStatus: record.status,
            editSignature: record.editFrontier.signature,
            targetEndingFamily: record.editFrontier.targetEndingFamily || "",
            classificationStatus,
            evidenceStatus,
            classificationConfidence: analytical.confidence,
            classificationBasis: analytical.basis,
            anomalyFlags: Object.freeze([...analytical.anomalyFlags]),
            primaryEvidenceTier: "canvas-numbered-form-classification",
            strongestEvidenceTier: L25_TIER_ORDER.find(tier => candidates.some(candidate => candidate.evidenceTier === tier)) || "canvas-numbered-form-classification",
            primaryTypeId: primaryCandidates.length === 1 ? primaryCandidates[0].typeId : "",
            primaryTypeCandidates: Object.freeze(primaryCandidates.map(candidate => candidate.typeId)),
            typeCandidates: candidates,
            crossReferences,
            exactTargetBoundaries: Object.freeze([...record.targetBoundaryCandidates]),
            compatibleTargetBoundaries: Object.freeze([...record.targetBoundaryHypotheses]),
            runtimeOverlapStatus: record.runtimeOverlapStatus,
            typedPrerequisitesKnownFromKarttunen: false,
            roundTrip: primaryCandidates.every(candidate => candidate.targetBoundaryHypotheses.every(boundary => getBoundarylessIdentity(boundary) === getBoundarylessIdentity(record.targetOriginal))),
            authority: Object.freeze({ grammar: false, generation: false, targetConstruction: false, selection: false, formula: false, surface: false }),
        });
    });
    return Object.freeze(records);
}

function lowerBoundaryless(value = "") {
    return getBoundarylessIdentity(value).toLowerCase();
}

function splitFromRight(value, count) {
    const letters = Array.from(lowerBoundaryless(value));
    return [letters.slice(0, Math.max(0, letters.length - count)).join(""), letters.slice(Math.max(0, letters.length - count)).join("")];
}

function makeL26Boundary(relation, typeId, edit) {
    const target = lowerBoundaryless(relation.targetOriginal);
    if (typeId === "l26-262-type-one-ia") {
        const [base] = splitFromRight(target, 2);
        return `${base}-iā`;
    }
    if (["l26-264-final-i-lia", "l26-2681-class-d-append-lia", "l26-2682-transitive-iya-append-lia"].includes(typeId)) {
        const [base] = splitFromRight(target, 3);
        return `${base}-liā`;
    }
    if (["l26-264-sibilant-xi-lia", "l26-267-sa-za-xi-lia"].includes(typeId)) {
        const [base] = splitFromRight(target, 5);
        return `${base}-xi-liā`;
    }
    if (["l26-264-tzi-ti-chi-lia", "l26-267-tla-tza-chi-lia"].includes(typeId)) {
        const [base] = splitFromRight(target, 6);
        return `${base}-chi-liā`;
    }
    if (typeId === "l26-266-final-ia-lia") {
        const [base] = splitFromRight(target, 3);
        return `${base}-liā`;
    }
    if (typeId === "l26-267-consonant-a-i-lia") {
        const [base] = splitFromRight(target, 4);
        return `${base}-i-liā`;
    }
    if (typeId === "l26-267-c-qui-lia") {
        const [base] = splitFromRight(target, 6);
        return `${base}-qui-liā`;
    }
    if (typeId === "l26-267-tla-ti-lia-exact-shape") {
        const [base] = splitFromRight(target, 5);
        return `${base}-ti-liā`;
    }
    if (typeId === "l26-2683-intransitive-eya-delete-lia" || typeId === "l26-2684-oya-root-ya-delete-lia" || typeId === "l26-2694-oa-lia-exception") {
        const [base] = splitFromRight(target, 3);
        return `${base}-liā`;
    }
    if (typeId === "l26-2691-root-l-oa-huia") {
        const [base] = splitFromRight(target, 4);
        return `${base}-huiā`;
    }
    if (typeId === "l26-2692-oa-al-il-huia") {
        const [base, tail] = splitFromRight(target, 6);
        return `${base}-${tail[0]}-l-huiā`;
    }
    if (typeId === "l26-269-root-o-ya-l-huia") {
        const [base] = splitFromRight(target, 5);
        return `${base}-l-huiā`;
    }
    if (typeId === "l26-2610-final-o-huia") {
        const replacive = edit.signature === "Ō→AHUIĀ";
        const [base] = splitFromRight(target, replacive ? 5 : 4);
        return replacive ? `${base}-a-huiā` : `${base}-huiā`;
    }
    if (typeId === "l26-2611-rare-tia") {
        const [base, suffix] = splitFromRight(target, 3);
        return `${base}-${suffix}`;
    }
    return "";
}

function makeRoundTripL26Boundary(relation, typeId, edit) {
    const projected = makeL26Boundary(relation, typeId, edit);
    if (projected && getBoundarylessIdentity(projected) === getBoundarylessIdentity(relation.targetOriginal)) return projected;
    const target = lowerBoundaryless(relation.targetOriginal);
    const folded = foldForClassification(relation.targetOriginal);
    const suffixLength = folded.endsWith("huia") ? 4 : folded.endsWith("tia") || folded.endsWith("lia") ? 3 : folded.endsWith("ia") ? 2 : 0;
    if (!suffixLength) return target;
    const [base, suffix] = splitFromRight(target, suffixLength);
    return `${base}-${suffix}`;
}

function hasTargetLiaVariant(targetOriginal = "") {
    const value = String(targetOriginal).normalize("NFC").replace(/[\p{Dash_Punctuation}\s()]/gu, "");
    return /(?:LI[ĀAÁ]|LĪA)$/u.test(value);
}

function hasTargetHuiaVariant(targetOriginal = "") {
    const value = String(targetOriginal).normalize("NFC").replace(/[\p{Dash_Punctuation}\s()]/gu, "");
    return /HUI[ĀA]$/u.test(value);
}

function classifyL26Exact(relation, edit) {
    const source = lowerBoundaryless(relation.sourceOriginal);
    const signature = edit.signature;
    if (signature === "Ā→LIĀ") return ["l26-266-final-ia-lia"];
    if (signature === "A→ILIĀ") return ["l26-267-consonant-a-i-lia"];
    if (signature === "CA→QUILIĀ") return ["l26-267-c-qui-lia"];
    if (signature === "TZA→CHILIĀ" || signature === "TLA→CHILIĀ") return ["l26-267-tla-tza-chi-lia"];
    if (signature === "ZA→XILIĀ") return ["l26-267-sa-za-xi-lia"];
    if (signature === "CI→XILIĀ") return ["l26-264-sibilant-xi-lia"];
    if (signature === "YA→LIĀ") return ["l26-2684-oya-root-ya-delete-lia"];
    if (signature === "Ō→AHUIĀ") return ["l26-2610-final-o-huia"];
    if (signature === "→LIĀ") {
        if (source.endsWith("iya")) return ["l26-2682-transitive-iya-append-lia"];
        if (source.endsWith("i")) return ["l26-264-final-i-lia", "l26-2681-class-d-append-lia"];
        return ["l26-2681-class-d-append-lia"];
    }
    return [];
}

function getL26ConflictFlags(relation, exactOverlap, edit) {
    const source = lowerBoundaryless(relation.sourceOriginal);
    const flags = [];
    if (edit.signature === "→LIĀ" && source.endsWith("ti")) {
        flags.push(Object.freeze({
            conflictId: "l25-2551-versus-l26-264",
            sections: Object.freeze(["25.5.1", "26.4"]),
            reason: "unsegmented final ti plus liā cannot resolve denominal-ti causative versus applicative without typed morphology and lexical valence",
            exactOverlap,
        }));
    }
    if (edit.signature === "Ō→AHUIĀ") {
        flags.push(Object.freeze({
            conflictId: "l25-256-versus-l26-2610",
            sections: Object.freeze(["25.6", "26.10"]),
            reason: "the final-ō replacive huiā formation is formally shared by the causative and applicative chapters",
            exactOverlap,
        }));
    }
    return Object.freeze(flags);
}

function classifyL26Nonoverlap(relation, edit) {
    const source = lowerBoundaryless(relation.sourceOriginal);
    const signature = edit.signature;
    if (signature === "→LIĀ" && source.endsWith("ti")) {
        return { status: "cross-lesson-ambiguous", typeIds: ["l26-264-final-i-lia"], externalSections: ["25.5.1"] };
    }
    if (signature === "YA→LIĀ") {
        return { status: "cross-lesson-ambiguous", typeIds: ["l26-2684-oya-root-ya-delete-lia"], externalSections: ["25.5.2"] };
    }
    if (signature === "→Ā") {
        return { status: "cross-lesson-ambiguous", typeIds: ["l26-262-type-one-ia"], externalSections: ["24.3"] };
    }
    if (signature === "A→IĀ") return { status: "compatible-hypothesis", typeIds: ["l26-262-type-one-ia"] };
    if (signature === "→LIĀ" && source.endsWith("iya")) return { status: "compatible-hypothesis", typeIds: ["l26-2682-transitive-iya-append-lia"] };
    if (signature === "→LIĀ" && source.endsWith("i")) return { status: "compatible-hypothesis", typeIds: ["l26-264-final-i-lia"] };
    if (signature === "→LIĀ" && source.endsWith("ā")) return { status: "compatible-hypothesis", typeIds: ["l26-2681-class-d-append-lia"] };
    if (signature === "I→ĪLIĀ") return { status: "compatible-hypothesis", typeIds: ["l26-264-final-i-lia"] };
    if (signature === "CI→XILIĀ") return { status: "compatible-hypothesis", typeIds: ["l26-264-sibilant-xi-lia"] };
    if (signature === "TZI→CHILIĀ" || signature === "TI→CHILIĀ") return { status: "compatible-hypothesis", typeIds: ["l26-264-tzi-ti-chi-lia"] };
    if (signature === "Ā→LIĀ" && source.endsWith("iā")) return { status: "compatible-hypothesis", typeIds: ["l26-266-final-ia-lia"] };
    if (signature === "A→ILIĀ") return { status: "compatible-hypothesis", typeIds: ["l26-267-consonant-a-i-lia"] };
    if (signature === "CA→QUILIĀ" || signature === "CUA→QUILIĀ") return { status: "compatible-hypothesis", typeIds: ["l26-267-c-qui-lia"] };
    if (signature === "ZA→XILIĀ") return { status: "compatible-hypothesis", typeIds: ["l26-267-sa-za-xi-lia"] };
    if (signature === "TZA→CHILIĀ" || signature === "TLA→CHILIĀ") return { status: "compatible-hypothesis", typeIds: ["l26-267-tla-tza-chi-lia"] };
    if (signature === "LA→ILIĀ") return { status: "compatible-hypothesis", typeIds: ["l26-267-tla-ti-lia-exact-shape"] };
    if (signature === "OĀ→HUIĀ") return { status: "compatible-hypothesis", typeIds: ["l26-2691-root-l-oa-huia"] };
    if (signature === "OĀ→ALHUIĀ" || signature === "OĀ→ILHUIĀ") return { status: "compatible-hypothesis", typeIds: ["l26-2692-oa-al-il-huia"] };
    if (signature === "Ā→LHUIĀ") return { status: "compatible-hypothesis", typeIds: ["l26-269-root-o-ya-l-huia"] };
    if (signature === "Ā→LIĀ" && source.endsWith("oā")) return { status: "compatible-hypothesis", typeIds: ["l26-2694-oa-lia-exception"] };
    return { status: "unclassified", typeIds: [] };
}

function classifyL26Exhaustively(relation, edit, initialClassification) {
    if (initialClassification.typeIds.length) {
        return {
            ...initialClassification,
            evidenceStatus: initialClassification.status,
            confidence: initialClassification.status === "exact-current-overlap" ? "exact-current-overlap" : "closed-edit-shape",
            basis: initialClassification.status === "exact-current-overlap"
                ? "reviewed exact current Andrews pair and audited section membership"
                : "reversible right-edge shape matches a closed Lesson 26 formation",
            anomalyFlags: [],
        };
    }
    const sourceRaw = lowerBoundaryless(relation.sourceOriginal);
    const source = foldForClassification(relation.sourceOriginal);
    const target = foldForClassification(relation.targetOriginal);
    const anomalyFlags = ["typed-class-valence-history-not-recoverable-from-karttunen-tuple"];
    let typeIds = [];
    let basis = "";
    if (target.endsWith("lia")) {
        if (source.endsWith("iya")) {
            typeIds = target.startsWith(`${source}lia`) ? ["l26-2682-transitive-iya-append-lia"] : ["l26-2684-oya-root-ya-delete-lia"];
        } else if (source.endsWith("eya")) typeIds = ["l26-2683-intransitive-eya-delete-lia"];
        else if (source.endsWith("oya")) typeIds = ["l26-2684-oya-root-ya-delete-lia"];
        else if (sourceRaw.endsWith("iā") || sourceRaw.endsWith("tiā") || sourceRaw.endsWith("ltiā")) typeIds = ["l26-266-final-ia-lia"];
        else if (source.endsWith("ci") || source.endsWith("si")) typeIds = ["l26-264-sibilant-xi-lia"];
        else if (source.endsWith("tzi") || source.endsWith("ti")) typeIds = ["l26-264-tzi-ti-chi-lia"];
        else if (sourceRaw.endsWith("i") || sourceRaw.endsWith("ī")) typeIds = ["l26-264-final-i-lia"];
        else if (source.endsWith("ca")) typeIds = ["l26-267-c-qui-lia"];
        else if (source.endsWith("sa") || source.endsWith("za")) typeIds = ["l26-267-sa-za-xi-lia"];
        else if (source.endsWith("tla") || source.endsWith("tza")) typeIds = target.endsWith("tilia") ? ["l26-267-tla-ti-lia-exact-shape"] : ["l26-267-tla-tza-chi-lia"];
        else if (source.endsWith("oa") && target.endsWith("olia")) typeIds = ["l26-2694-oa-lia-exception"];
        else if (sourceRaw.endsWith("ā")) typeIds = ["l26-2681-class-d-append-lia"];
        else if (source.endsWith("a")) {
            if (target.endsWith("quilia")) typeIds = ["l26-267-c-qui-lia"];
            else if (target.endsWith("xilia")) typeIds = ["l26-267-sa-za-xi-lia"];
            else if (target.endsWith("chilia")) typeIds = ["l26-267-tla-tza-chi-lia"];
            else if (target.endsWith("tilia")) typeIds = ["l26-267-tla-ti-lia-exact-shape"];
            else typeIds = ["l26-267-consonant-a-i-lia"];
        } else if (target.endsWith("quilia")) typeIds = ["l26-267-c-qui-lia"];
        else if (target.endsWith("xilia")) typeIds = ["l26-264-sibilant-xi-lia", "l26-267-sa-za-xi-lia"];
        else if (target.endsWith("chilia")) typeIds = ["l26-264-tzi-ti-chi-lia", "l26-267-tla-tza-chi-lia"];
        else if (target.endsWith("ilia")) typeIds = ["l26-267-consonant-a-i-lia"];
        else typeIds = ["l26-2681-class-d-append-lia"];
        basis = "liā-shaped target plus the surviving source/target right edge assigns the closest §26.4/§26.6/§26.7/§26.8 numbered formation";
    } else if (target.endsWith("huia")) {
        if (sourceRaw.endsWith("ō")) typeIds = ["l26-2610-final-o-huia"];
        else if (source.endsWith("oa")) {
            if (target.endsWith("alhuia") || target.endsWith("ilhuia")) typeIds = ["l26-2692-oa-al-il-huia"];
            else if (target.endsWith("lhuia")) typeIds = ["l26-269-root-o-ya-l-huia"];
            else typeIds = ["l26-2691-root-l-oa-huia"];
        } else if (source.endsWith("ya")) typeIds = ["l26-269-root-o-ya-l-huia"];
        else if (target.endsWith("alhuia") || target.endsWith("ilhuia")) typeIds = ["l26-2692-oa-al-il-huia"];
        else if (target.endsWith("lhuia")) typeIds = ["l26-269-root-o-ya-l-huia"];
        else typeIds = ["l26-2691-root-l-oa-huia"];
        basis = "huiā-shaped target is assigned to the closest §26.9/§26.10 formation; typed earlier-causative history remains unknown";
    } else if (target.endsWith("tia")) {
        typeIds = ["l26-2611-rare-tia"];
        basis = "tiā-shaped applicative is assigned to rare §26.11";
    } else if (target.endsWith("ia")) {
        typeIds = ["l26-262-type-one-ia"];
        basis = "non-liā/non-huiā iā-shaped applicative is assigned to lexically selected §26.2";
    } else {
        typeIds = ["l26-262-type-one-ia"];
        anomalyFlags.push("dictionary-form-outside-closed-canvas-endings");
        basis = "raw applicative is assigned to the lexically selected §26.2 residual type because its spelling exposes no type-two suffixal family";
    }
    return {
        status: typeIds.length === 1 ? "typed-single" : "typed-ambiguous",
        evidenceStatus: "raw-shape-only",
        typeIds,
        confidence: anomalyFlags.length > 1 ? "nearest-numbered-type-with-anomaly" : typeIds.length === 1 ? "chapter-family-shape" : "chapter-family-ambiguous",
        basis,
        anomalyFlags,
    };
}

function organizeLesson26(applicativeRelations, exactPairIds) {
    return Object.freeze(applicativeRelations.map(relation => {
        const exactOverlap = exactPairIds.has(pairIdentity(relation.sourceOriginal, relation.targetOriginal));
        const edit = getRightEdgeEdit(relation.sourceOriginal, relation.targetOriginal);
        const initialClassification = exactOverlap
            ? { status: "exact-current-overlap", typeIds: classifyL26Exact(relation, edit) }
            : classifyL26Nonoverlap(relation, edit);
        assertInvariant(!exactOverlap || initialClassification.typeIds.length > 0, `exact applicative overlap has no Lesson 26 type mapping: ${relation.sourceOriginal} -> ${relation.targetOriginal} (${edit.signature})`);
        const classification = classifyL26Exhaustively(relation, edit, initialClassification);
        const tier = exactOverlap ? "current-andrews-candidate-membership" : initialClassification.typeIds.length ? "karttunen-shape-compatible" : "canvas-numbered-form-classification";
        const candidates = dedupeCandidates(classification.typeIds.map(typeId => makeTypeCandidate(
            typeId,
            tier,
            exactOverlap
                ? "the exact quantity-preserving pair belongs to the reviewed current Andrews overlap; section membership is reproduced across the audited synthetic profile matrix"
                : classification.basis,
            { classificationOnly: !exactOverlap, targetBoundaryHypotheses: [makeRoundTripL26Boundary(relation, typeId, edit)].filter(Boolean) }
        )));
        assertInvariant(candidates.length > 0, `Lesson 26 row has no numbered type: ${relation.sourceOriginal} -> ${relation.targetOriginal}`);
        const conflictFlags = getL26ConflictFlags(relation, exactOverlap, edit);
        const roundTrip = candidates.every(candidate => candidate.targetBoundaryHypotheses.every(boundary => getBoundarylessIdentity(boundary) === getBoundarylessIdentity(relation.targetOriginal)));
        return Object.freeze({
            relationId: relationId("applicative", relation),
            operation: "applicative",
            lesson: "26",
            sourceOriginal: relation.sourceOriginal,
            targetOriginal: relation.targetOriginal,
            csvRowNumbers: Object.freeze([...relation.csvRowNumbers]),
            relationLabels: Object.freeze([...relation.relationLabels]),
            editSignature: edit.signature,
            targetFamily: hasTargetLiaVariant(relation.targetOriginal) ? "liā-shaped" : hasTargetHuiaVariant(relation.targetOriginal) ? "huiā-shaped" : "other",
            classificationStatus: candidates.length === 1 ? "typed-single" : "typed-ambiguous",
            evidenceStatus: classification.evidenceStatus,
            classificationConfidence: classification.confidence,
            classificationBasis: classification.basis,
            anomalyFlags: Object.freeze([...classification.anomalyFlags]),
            primaryEvidenceTier: tier,
            primaryTypeId: candidates.length === 1 ? candidates[0].typeId : "",
            primaryTypeCandidates: Object.freeze(candidates.map(candidate => candidate.typeId)),
            typeCandidates: candidates,
            externalAmbiguitySections: Object.freeze([...(classification.externalSections || [])]),
            conflictFlags,
            currentAndrewsOverlap: exactOverlap,
            typedPrerequisitesKnownFromKarttunen: false,
            roundTrip,
            authority: Object.freeze({ grammar: false, generation: false, targetConstruction: false, selection: false, formula: false, surface: false }),
        });
    }));
}

function countBy(records, getKey) {
    const counts = {};
    records.forEach(record => {
        const key = getKey(record);
        counts[key] = (counts[key] || 0) + 1;
    });
    return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
}

function buildGroups(records, catalog) {
    return Object.freeze(catalog.map(type => {
        const candidateMembers = records.filter(record => record.typeCandidates.some(candidate => candidate.typeId === type.typeId));
        const primaryMembers = records.filter(record => record.primaryTypeCandidates.includes(type.typeId));
        const sourceCandidateMembers = records.filter(record => (record.sourceTypeCandidates || []).some(candidate => candidate.typeId === type.typeId));
        return Object.freeze({
            ...type,
            recordCount: primaryMembers.length,
            candidateRecordCount: candidateMembers.length,
            sourceCompatibleRecordCount: sourceCandidateMembers.length,
            sourceExactWitnessRecordCount: sourceCandidateMembers.filter(record => record.sourceTypeCandidates.some(candidate => candidate.typeId === type.typeId && candidate.exactSourceWitness)).length,
            exactCount: primaryMembers.filter(record => ["exact-single", "exact-ambiguous", "exact-current-overlap"].includes(record.evidenceStatus || record.classificationStatus)).length,
            corroboratedCount: primaryMembers.filter(record => (record.evidenceStatus || record.classificationStatus).startsWith("nonactive")).length,
            hypothesisCount: primaryMembers.filter(record => ["shape-compatible-only", "shape-ambiguous", "compatible-hypothesis", "cross-lesson-ambiguous", "raw-shape-only"].includes(record.evidenceStatus || record.classificationStatus)).length,
            ambiguousMembershipCount: primaryMembers.filter(record => record.primaryTypeCandidates.length > 1 || record.externalAmbiguitySections?.length || record.conflictFlags?.length).length,
            candidateExactEvidenceCount: candidateMembers.filter(record => record.typeCandidates.some(candidate => candidate.typeId === type.typeId && ["exact-andrews-canvas", "current-andrews-candidate-membership"].includes(candidate.evidenceTier))).length,
            candidateCorroboratedEvidenceCount: candidateMembers.filter(record => record.typeCandidates.some(candidate => candidate.typeId === type.typeId && candidate.evidenceTier === "karttunen-nonactive-corroborated")).length,
            candidateCompatibleEvidenceCount: candidateMembers.filter(record => record.typeCandidates.some(candidate => candidate.typeId === type.typeId && ["andrews-anchored-edit-compatible", "karttunen-shape-compatible"].includes(candidate.evidenceTier))).length,
            recordIds: Object.freeze(primaryMembers.map(record => record.relationId)),
            candidateRecordIds: Object.freeze(candidateMembers.map(record => record.relationId)),
            sourceCompatibleRecordIds: Object.freeze(sourceCandidateMembers.map(record => record.relationId)),
        });
    }));
}

function summarizeLesson24(records) {
    const uniqueSourceKeys = new Set(records.map(record => getBoundarylessIdentity(record.sourceOriginal)));
    const compatibleSourceKeys = new Set(records.filter(record => record.sourceCompatibleWithLesson24).map(record => getBoundarylessIdentity(record.sourceOriginal)));
    const hasTypedLesson25Relation = record => (record.laterLessonReference?.primaryTypeCandidates || []).length > 0;
    return Object.freeze({
        records: records.length,
        uniqueSources: uniqueSourceKeys.size,
        classification: countBy(records, record => record.classificationStatus),
        evidenceStatus: countBy(records, record => record.evidenceStatus),
        assignedLesson: countBy(records, record => record.assignedLesson || "none"),
        recordsWithoutAssignment: records.filter(record => record.assignedTypeCandidates.length === 0).length,
        relationTypeMatches: records.filter(record => record.typeCandidates.length > 0).length,
        sourceCompatibleRecords: records.filter(record => record.sourceCompatibleWithLesson24).length,
        sourceIncompatibleRecords: records.filter(record => !record.sourceCompatibleWithLesson24).length,
        sourceCompatibleUniqueSources: compatibleSourceKeys.size,
        sourceExactWitnessRecords: records.filter(record => record.sourceExactWitness).length,
        crossLessonPartition: Object.freeze({
            sourceCompatibleAndLesson25Typed: records.filter(record => record.sourceCompatibleWithLesson24 && hasTypedLesson25Relation(record)).length,
            sourceCompatibleAndLesson25Untyped: records.filter(record => record.sourceCompatibleWithLesson24 && !hasTypedLesson25Relation(record)).length,
            noSourceOptionAndLesson25Typed: records.filter(record => !record.sourceCompatibleWithLesson24 && hasTypedLesson25Relation(record)).length,
            noSourceOptionAndLesson25Untyped: records.filter(record => !record.sourceCompatibleWithLesson24 && !hasTypedLesson25Relation(record)).length,
        }),
        sourceTypeMemberships: countBy(
            records.flatMap(record => record.sourceTypeCandidates.map(candidate => ({ typeId: candidate.typeId }))),
            membership => membership.typeId
        ),
        targetEndingFamily: countBy(records, record => record.targetEndingFamily || "none"),
        lesson25Classification: countBy(records, record => record.laterLessonReference?.classificationStatus || "none"),
    });
}

function summarizeLesson25(records) {
    return Object.freeze({
        records: records.length,
        classification: countBy(records, record => record.classificationStatus),
        evidenceStatus: countBy(records, record => record.evidenceStatus),
        classificationConfidence: countBy(records, record => record.classificationConfidence),
        primaryEvidenceTier: countBy(records, record => record.primaryEvidenceTier || "none"),
        recordsWithSinglePrimaryType: records.filter(record => record.primaryTypeId).length,
        recordsWithAmbiguousPrimaryType: records.filter(record => record.primaryTypeCandidates.length > 1).length,
        recordsWithoutType: records.filter(record => record.primaryTypeCandidates.length === 0).length,
        recordsWithAnomalyFlags: records.filter(record => record.anomalyFlags.length > 0).length,
        exactComparisonWitnesses: records.filter(record => record.crossReferences.some(reference => reference.section === "25.8")).length,
    });
}

function summarizeLesson26(records) {
    const exact = records.filter(record => record.currentAndrewsOverlap);
    const nonoverlap = records.filter(record => !record.currentAndrewsOverlap);
    return Object.freeze({
        records: records.length,
        classification: countBy(records, record => record.classificationStatus),
        evidenceStatus: countBy(records, record => record.evidenceStatus),
        classificationConfidence: countBy(records, record => record.classificationConfidence),
        exactCurrentOverlap: exact.length,
        nonoverlap: nonoverlap.length,
        exactSectionMembershipCombinations: countBy(exact, record => record.primaryTypeCandidates.map(typeId => TYPE_BY_ID.get(typeId).section).sort().join("+") || "none"),
        nonoverlapEvidenceStatus: countBy(nonoverlap, record => record.evidenceStatus),
        recordsWithoutType: records.filter(record => record.primaryTypeCandidates.length === 0).length,
        recordsWithAnomalyFlags: records.filter(record => record.anomalyFlags.length > 0).length,
        targetFamily: countBy(records, record => record.targetFamily),
        exactFinalTiConflictFlags: exact.filter(record => record.conflictFlags.some(flag => flag.conflictId === "l25-2551-versus-l26-264")).length,
        exactFinalOHuiaConflictFlags: exact.filter(record => record.conflictFlags.some(flag => flag.conflictId === "l25-256-versus-l26-2610")).length,
    });
}

function verifyOrganization(report, causativeExtraction, applicativeExtraction, exactPairIds) {
    const l24 = report.lessons.lesson24;
    const l25 = report.lessons.lesson25;
    const l26 = report.lessons.lesson26;
    assertInvariant(causativeExtraction.relations.length === 276 && l24.records.length === 276 && l25.records.length === 276, "Lesson 24/25 causative total drifted");
    assertInvariant(applicativeExtraction.relations.length === 695 && l26.records.length === 695, "Lesson 26 applicative total drifted");
    assertInvariant(new Set(l24.records.map(record => record.relationId)).size === 276, "Lesson 24 relation ids are not unique");
    assertInvariant(new Set(l25.records.map(record => record.relationId)).size === 276, "Lesson 25 relation ids are not unique");
    assertInvariant(new Set(l26.records.map(record => record.relationId)).size === 695, "Lesson 26 relation ids are not unique");
    assertInvariant(exactPairIds.size === 452 && l26.records.filter(record => record.currentAndrewsOverlap).length === 452, "Lesson 26 exact current overlap total drifted");
    assertInvariant(L24_TYPES.length === 7 && L24_TYPES.every(type => type.canvasExamples.length > 0), "Lesson 24 closed formation catalog drifted");
    assertInvariant(L24_TYPES.find(type => type.typeId === "l24-247-destockal-i-a-hui-to-o-a")?.negativeExamples.some(example => example.source === "pil-i-hui"), "Lesson 24 §24.7 lexical gap is missing");
    assertInvariant(l24.summary.relationTypeMatches === 0, "a raw Karttunen causative target was incorrectly promoted to a Lesson 24 relation type");
    assertInvariant(l24.summary.classification["assigned-to-lesson25"] === 276 && l24.summary.assignedLesson["25"] === 276 && l24.summary.recordsWithoutAssignment === 0, "Lesson 24/25 combined assignment is not exhaustive");
    assertInvariant(l24.summary.evidenceStatus["later-causative-ending-shape"] === 274 && l24.summary.evidenceStatus["raw-shape-anomaly"] === 2, "Lesson 24 recorded-target evidence partition drifted");
    assertInvariant(l24.summary.uniqueSources === 238 && l24.summary.sourceCompatibleRecords === 225 && l24.summary.sourceIncompatibleRecords === 51 && l24.summary.sourceCompatibleUniqueSources === 189, "Lesson 24 source compatibility totals drifted");
    assertInvariant(l24.summary.sourceExactWitnessRecords === 2, "Lesson 24 exact source-witness count drifted");
    assertInvariant(l24.summary.sourceTypeMemberships["l24-2431a-final-i-replacement"] === 111
        && l24.summary.sourceTypeMemberships["l24-2431b-final-i-addition"] === 147
        && l24.summary.sourceTypeMemberships["l24-2432a-final-a-homophonous-replacement"] === 57
        && l24.summary.sourceTypeMemberships["l24-2432b-root-plus-ya-replacement"] === 9
        && l24.summary.sourceTypeMemberships["l24-2465-destockal-hua-replacement"] === 12
        && l24.summary.sourceTypeMemberships["l24-247-destockal-i-a-hui-to-o-a"] === 23
        && !l24.summary.sourceTypeMemberships["l24-247n1-destockal-o-hui-to-o-a"], "Lesson 24 source-family membership totals drifted");
    assertInvariant(l24.summary.crossLessonPartition.sourceCompatibleAndLesson25Typed === 225
        && l24.summary.crossLessonPartition.sourceCompatibleAndLesson25Untyped === 0
        && l24.summary.crossLessonPartition.noSourceOptionAndLesson25Typed === 51
        && l24.summary.crossLessonPartition.noSourceOptionAndLesson25Untyped === 0, "Lesson 24/Lesson 25 exhaustive cross-lesson partition drifted");
    assertInvariant(l24.records.every(record => record.typeCandidates.length === 0 && record.exactTargetBoundaries.length === 0), "a Lesson 24 row acquired a target type or boundary without an exact generated target");
    assertInvariant(l24.records.every(record => record.sourceTypeCandidates.every(candidate => candidate.sourceGeneratedTargets.every(target => getBoundarylessIdentity(target) !== getBoundarylessIdentity(record.targetOriginal)))), "a Lesson 24 source-only candidate secretly matches the recorded target");
    assertInvariant(l25.summary.evidenceStatus["exact-single"] + (l25.summary.evidenceStatus["exact-ambiguous"] || 0) === 89, "Lesson 25 exact formation-family count drifted");
    assertInvariant(l25.summary.exactComparisonWitnesses === 1, "Lesson 25 §25.8 comparison witness drifted");
    assertInvariant(l25.summary.evidenceStatus["nonactive-corroborated"] === 51, "Lesson 25 nonactive-corroborated count drifted");
    assertInvariant((l25.summary.evidenceStatus["shape-compatible-only"] || 0) + (l25.summary.evidenceStatus["shape-ambiguous"] || 0) === 73, "Lesson 25 anchored-edit count drifted");
    assertInvariant(l25.summary.evidenceStatus["shape-compatible-only"] === 22 && l25.summary.evidenceStatus["shape-ambiguous"] === 51, "Lesson 25 unique/ambiguous anchored-edit split drifted");
    assertInvariant(l25.summary.evidenceStatus["raw-shape-only"] === 62 && l25.summary.evidenceStatus["exact-comparison-only"] === 1, "Lesson 25 analytical-only evidence frontier drifted");
    assertInvariant(l25.summary.recordsWithoutType === 0 && l25.records.every(record => record.primaryTypeCandidates.length > 0 && record.roundTrip), "Lesson 25 contains an untyped or non-round-tripping row");
    assertInvariant(!Object.keys(l25.summary.classification).some(status => /ending-only|unresolved|unclassified/u.test(status)), "Lesson 25 retained a non-type classification bucket");
    assertInvariant(l26.summary.evidenceStatus["exact-current-overlap"] === 452, "Lesson 26 exact classification drifted");
    assertInvariant(l26.summary.evidenceStatus["compatible-hypothesis"] === 173, "Lesson 26 compatible classification drifted");
    assertInvariant(l26.summary.evidenceStatus["cross-lesson-ambiguous"] === 22, "Lesson 26 ambiguity classification drifted");
    assertInvariant(l26.summary.evidenceStatus["raw-shape-only"] === 48, "Lesson 26 analytical-only frontier drifted");
    assertInvariant(l26.summary.recordsWithoutType === 0 && l26.records.every(record => record.primaryTypeCandidates.length > 0), "Lesson 26 contains an untyped row");
    assertInvariant(!Object.keys(l26.summary.classification).some(status => /unclassified/u.test(status)), "Lesson 26 retained an unclassified type bucket");
    assertInvariant(l26.summary.exactSectionMembershipCombinations["26.4+26.8.1"] === 34, "Lesson 26 known §26.4/§26.8.1 ambiguity drifted");
    assertInvariant(l26.summary.exactSectionMembershipCombinations["26.6"] === 296 && l26.summary.exactSectionMembershipCombinations["26.7"] === 114, "Lesson 26 §26.6/§26.7 exact totals drifted");
    assertInvariant(l26.summary.exactSectionMembershipCombinations["26.4"] === 2
        && l26.summary.exactSectionMembershipCombinations["26.8.1"] === 2
        && l26.summary.exactSectionMembershipCombinations["26.8.2"] === 1
        && l26.summary.exactSectionMembershipCombinations["26.8.4"] === 2
        && l26.summary.exactSectionMembershipCombinations["26.10"] === 1, "Lesson 26 smaller exact type totals drifted");
    assertInvariant(l26.summary.exactFinalTiConflictFlags === 8 && l26.summary.exactFinalOHuiaConflictFlags === 1, "Lesson 26 exact cross-lesson warning totals drifted");
    assertInvariant(l26.records.every(record => record.roundTrip), "a Lesson 26 boundary hypothesis failed target round-trip");
    assertInvariant([...l24.records, ...l25.records, ...l26.records].every(record => Object.values(record.authority).every(value => value === false)
        && record.typeCandidates.every(candidate => candidate.authority === false)
        && (record.sourceTypeCandidates || []).every(candidate => candidate.authority === false)), "an organizer record acquired grammar authority");
    const huaquitia = l25.records.find(record => getBoundarylessIdentity(record.sourceOriginal) === "huāqui" && getBoundarylessIdentity(record.targetOriginal) === "huāquītiā");
    const pinauhtia = l25.records.find(record => getBoundarylessIdentity(record.sourceOriginal) === "pīnāhua" && getBoundarylessIdentity(record.targetOriginal) === "pīnāuhtiā");
    const ayiltia = l25.records.find(record => getBoundarylessIdentity(record.sourceOriginal) === "āyi" && getBoundarylessIdentity(record.targetOriginal) === "āyīltiā");
    assertInvariant(huaquitia?.primaryTypeCandidates.length === 1 && huaquitia.primaryTypeCandidates[0] === "l25-2521-final-ki-ka-hua-tia", "HUĀQUĪTIĀ is not classified specifically as §25.2.1");
    assertInvariant(pinauhtia?.crossReferences.some(reference => reference.section === "25.8") && pinauhtia.primaryTypeCandidates[0] === "l25-258-parallel-type-two-comparison", "PĪNĀUHTIĀ is not retained as the classified nonproductive §25.8 comparison");
    assertInvariant(ayiltia?.primaryTypeCandidates[0] === "l25-254-lo-to-l-tia" && ayiltia.typeCandidates.every(candidate => candidate.authority === false && candidate.generationLicensed === false), "ĀYĪLTIĀ is not analytically typed while remaining unlicensed");
    assertInvariant([...l25.records, ...l26.records].every(record => record.primaryTypeCandidates.every(typeId => TYPE_BY_ID.has(typeId))), "an exhaustive type assignment names an unknown Canvas type");
}

function serializeTsv(records) {
    const columns = [
        "relation_id", "lesson", "operation", "csv_rows", "source_original", "target_original", "classification_status", "evidence_status",
        "classification_confidence", "classification_basis", "anomaly_flags", "assigned_lesson", "assigned_type_candidates", "primary_evidence_tier", "primary_type_id", "type_candidates", "sections", "families", "edit_signature",
        "exact_or_current_overlap", "target_boundaries", "source_type_candidates", "source_type_sections", "source_candidate_subtypes",
        "source_generated_targets", "source_exact_witness", "later_lesson_status", "later_lesson_types", "cross_references", "conflict_flags", "typed_prerequisites_known",
        "classification_only", "generation_licensed", "grammar_authority", "generation_authority", "selection_authority",
    ];
    const clean = value => String(value == null ? "" : value).replace(/[\t\r\n]+/gu, " ");
    const sorted = [...records].sort((left, right) => (
        (TYPE_ORDER.get(left.primaryTypeId) ?? 999) - (TYPE_ORDER.get(right.primaryTypeId) ?? 999)
        || left.classificationStatus.localeCompare(right.classificationStatus)
        || getBoundarylessIdentity(left.sourceOriginal).localeCompare(getBoundarylessIdentity(right.sourceOriginal), "en")
        || getBoundarylessIdentity(left.targetOriginal).localeCompare(getBoundarylessIdentity(right.targetOriginal), "en")
    ));
    const lines = [columns.join("\t")];
    sorted.forEach(record => {
        const values = {
            relation_id: record.relationId,
            lesson: record.lesson,
            operation: record.operation,
            csv_rows: record.csvRowNumbers.join(","),
            source_original: record.sourceOriginal,
            target_original: record.targetOriginal,
            classification_status: record.classificationStatus,
            evidence_status: record.evidenceStatus || "",
            classification_confidence: record.classificationConfidence || "",
            classification_basis: record.classificationBasis || "",
            anomaly_flags: (record.anomalyFlags || []).join(" | "),
            assigned_lesson: record.assignedLesson || record.lesson,
            assigned_type_candidates: (record.assignedTypeCandidates || record.primaryTypeCandidates || []).join(" | "),
            primary_evidence_tier: record.primaryEvidenceTier,
            primary_type_id: record.primaryTypeId,
            type_candidates: Array.from(new Set(record.typeCandidates.map(candidate => candidate.typeId))).join(" | "),
            sections: Array.from(new Set(record.typeCandidates.map(candidate => candidate.section))).join(" | "),
            families: Array.from(new Set(record.typeCandidates.map(candidate => candidate.family))).join(" | "),
            edit_signature: record.editSignature,
            exact_or_current_overlap: ["exact-single", "exact-ambiguous", "exact-current-overlap", "exact-comparison-only", "exact-l24-target", "exact-l24-target-ambiguous"].includes(record.evidenceStatus || record.classificationStatus),
            target_boundaries: Array.from(new Set([
                ...(record.exactTargetBoundaries || []),
                ...(record.compatibleTargetBoundaries || []),
                ...record.typeCandidates.flatMap(candidate => candidate.targetBoundaryHypotheses),
            ])).join(" | "),
            source_type_candidates: Array.from(new Set((record.sourceTypeCandidates || []).map(candidate => candidate.typeId))).join(" | "),
            source_type_sections: Array.from(new Set((record.sourceTypeCandidates || []).map(candidate => candidate.section))).join(" | "),
            source_candidate_subtypes: Array.from(new Set((record.sourceTypeCandidates || []).flatMap(candidate => candidate.subtypeIds || []))).join(" | "),
            source_generated_targets: Array.from(new Set((record.sourceTypeCandidates || []).flatMap(candidate => candidate.sourceGeneratedTargets || []))).join(" | "),
            source_exact_witness: record.sourceExactWitness === true,
            later_lesson_status: record.laterLessonReference?.classificationStatus || "",
            later_lesson_types: (record.laterLessonReference?.primaryTypeCandidates || []).join(" | "),
            cross_references: (record.crossReferences || []).map(reference => reference.section || (reference.lesson ? `Lesson ${reference.lesson}` : "")).filter(Boolean).join(" | "),
            conflict_flags: (record.conflictFlags || []).map(flag => flag.conflictId).join(" | "),
            typed_prerequisites_known: record.typedPrerequisitesKnownFromKarttunen === true,
            classification_only: record.typeCandidates.some(candidate => candidate.classificationOnly),
            generation_licensed: record.typeCandidates.some(candidate => candidate.generationLicensed),
            grammar_authority: record.authority.grammar,
            generation_authority: record.authority.generation,
            selection_authority: record.authority.selection,
        };
        lines.push(columns.map(column => clean(values[column])).join("\t"));
    });
    return `${lines.join("\n")}\n`;
}

function serializeCatalogTsv(groups) {
    const columns = [
        "type_id", "lesson", "section", "title", "family", "transformation", "typed_prerequisite", "target_class",
        "canvas_examples", "subtypes", "negative_examples", "recorded_relation_count", "source_compatible_record_count",
        "source_exact_witness_record_count", "grammar_authority", "generation_authority", "selection_authority",
    ];
    const clean = value => String(value == null ? "" : value).replace(/[\t\r\n]+/gu, " ");
    const lines = [columns.join("\t")];
    for (const group of groups) {
        const values = {
            type_id: group.typeId,
            lesson: group.lesson,
            section: group.section,
            title: group.title,
            family: group.family,
            transformation: group.transformation,
            typed_prerequisite: group.prerequisite,
            target_class: group.targetClass,
            canvas_examples: group.canvasExamples.map(example => `${example.source} -> ${example.target}${example.note ? ` (${example.note})` : ""}`).join(" | "),
            subtypes: group.subtypes.map(subtype => `${subtype.subtypeId} [§${subtype.section}] ${subtype.title}: ${subtype.canvasExamples.map(example => `${example.source} -> ${example.target}`).join(", ")}`).join(" | "),
            negative_examples: group.negativeExamples.map(example => `${example.source}: ${example.reason}`).join(" | "),
            recorded_relation_count: group.recordCount,
            source_compatible_record_count: group.sourceCompatibleRecordCount,
            source_exact_witness_record_count: group.sourceExactWitnessRecordCount,
            grammar_authority: false,
            generation_authority: false,
            selection_authority: false,
        };
        lines.push(columns.map(column => clean(values[column])).join("\t"));
    }
    return `${lines.join("\n")}\n`;
}

function buildReadme(report) {
    const l24 = report.lessons.lesson24.summary;
    const l25 = report.lessons.lesson25.summary;
    const l26 = report.lessons.lesson26.summary;
    return `# Karttunen 1992 organized by Andrews Lessons 24-26\n\n` +
        `This offline report groups the raw dictionary relations by Andrews formation type without giving Karttunen grammar, generation, selection, boundary, formula, or surface authority.\n\n` +
        `## Lesson 24 type-one causatives (${l24.records})\n\n` +
        `- Exact recorded Lesson 24 targets: ${l24.relationTypeMatches}\n` +
        `- Recorded relations assigned to a Lesson 25 type: ${l24.classification["assigned-to-lesson25"] || 0}\n` +
        `- Later-causative ending evidence / raw spelling anomalies: ${l24.evidenceStatus["later-causative-ending-shape"] || 0} / ${l24.evidenceStatus["raw-shape-anomaly"] || 0}\n` +
        `- Rows whose source has at least one current typed Lesson 24 alternative: ${l24.sourceCompatibleRecords} (${l24.sourceCompatibleUniqueSources} unique sources)\n` +
        `- Rows with no current Lesson 24 source option: ${l24.sourceIncompatibleRecords}\n` +
        `- Exact Canvas source witnesses whose recorded Karttunen target is instead later-type: ${l24.sourceExactWitnessRecords}\n\n` +
        `Cross-lesson partition: all ${l24.records} causatives now have at least one analytical Lesson 25 type. ${l24.crossLessonPartition.sourceCompatibleAndLesson25Typed} also have a separate Lesson 24 source alternative, while ${l24.crossLessonPartition.noSourceOptionAndLesson25Typed} have no current Lesson 24 source option. A Lesson 24 alternative remains a different derivation and never reclassifies Karttunen's recorded target.\n\n` +
        `The Lesson 24 catalog has seven peer formation families. §24.5 ni/hui preferences and fused forms are nested replacement/addition subtypes, while §§24.8-24.9 participant transformation and operator scope remain separate axes. Source compatibility never counts as membership of the recorded source-target relation.\n\n` +
        `## Lesson 25 causatives (${l25.records})\n\n` +
        `- Exact formation-family evidence: ${(l25.evidenceStatus["exact-single"] || 0) + (l25.evidenceStatus["exact-ambiguous"] || 0)}\n` +
        `- Exact §25.8 comparison witness (not a productive family): ${l25.exactComparisonWitnesses}\n` +
        `- Same-source nonactive corroborations beyond the exact set: ${l25.evidenceStatus["nonactive-corroborated"] || 0}\n` +
        `- Andrews-anchored shape evidence: ${(l25.evidenceStatus["shape-compatible-only"] || 0) + (l25.evidenceStatus["shape-ambiguous"] || 0)}\n` +
        `- Raw-shape-only analytical assignments: ${l25.evidenceStatus["raw-shape-only"] || 0}\n` +
        `- Untyped rows: ${l25.recordsWithoutType}\n\n` +
        `## Lesson 26 applicatives (${l26.records})\n\n` +
        `- Current exact Andrews overlaps: ${l26.exactCurrentOverlap}\n` +
        `- Compatible, non-authorizing shape evidence: ${l26.evidenceStatus["compatible-hypothesis"] || 0}\n` +
        `- Cross-lesson or cross-type evidence ambiguities: ${l26.evidenceStatus["cross-lesson-ambiguous"] || 0}\n` +
        `- Raw-shape-only analytical assignments: ${l26.evidenceStatus["raw-shape-only"] || 0}\n` +
        `- Untyped rows: ${l26.recordsWithoutType}\n` +
        `- Known exact §26.4 + §26.8.1 memberships: ${l26.exactSectionMembershipCombinations["26.4+26.8.1"] || 0}\n` +
        `- Exact final-ti §25.5.1 conflict warnings: ${l26.exactFinalTiConflictFlags}\n\n` +
        `The relation TSV files are sorted by primary type. Analytical assignment is exhaustive, but every candidate still has generationLicensed=false and every authority flag is false. Classification therefore helps the conjugator select which typed rule questions to ask; it cannot generate a form without the rule's class, valence, history, and lexical prerequisites.\n`;
}

async function loadCausativeReport(sourcePath, reportPath) {
    if (!fs.existsSync(reportPath)) {
        const result = await runInference({ sourcePath, outputDir: path.dirname(reportPath) });
        return result.report;
    }
    return JSON.parse(fs.readFileSync(reportPath, "utf8"));
}

async function runOrganizer({ sourcePath, causativeReportPath = DEFAULT_CAUSATIVE_REPORT, outputDir = DEFAULT_OUTPUT_DIR } = {}) {
    assertInvariant(sourcePath, "usage: npm run organize:karttunen-lessons24-26 -- --source /path/to/karttunen_all.csv");
    const csvBuffer = fs.readFileSync(sourcePath);
    const sourceSha256 = crypto.createHash("sha256").update(csvBuffer).digest("hex");
    assertInvariant(sourceSha256 === EXPECTED_SOURCE_SHA256, `Karttunen CSV SHA-256 mismatch: ${sourceSha256}`);
    const csvText = csvBuffer.toString("utf8");
    const causativeExtraction = extractKarttunenCausativeRelations(csvText);
    const applicativeExtraction = extractKarttunenApplicativeRelations(csvText);
    const causativeReport = await loadCausativeReport(sourcePath, causativeReportPath);
    assertInvariant(causativeReport.source?.sha256 === sourceSha256, "causative boundary report source hash does not match the requested CSV");
    assertInvariant(causativeReport.records.length === causativeExtraction.relations.length, "causative boundary report and reconciled raw inventory differ in size");
    const extractedCausativePairIds = new Set(causativeExtraction.relations.map(relation => pairIdentity(relation.sourceOriginal, relation.targetOriginal)));
    const reportedCausativePairIds = new Set(causativeReport.records.map(relation => pairIdentity(relation.sourceOriginal, relation.targetOriginal)));
    assertInvariant(extractedCausativePairIds.size === reportedCausativePairIds.size
        && [...extractedCausativePairIds].every(identity => reportedCausativePairIds.has(identity)), "causative boundary report and reconciled raw inventory differ by pair identity");
    const overlapModule = await import(pathToFileURL(CONFIRMED_OVERLAP_MODULE).href);
    const exactApplicativeTuples = overlapModule.KARTTUNEN_1992_CONFIRMED_OVERLAP_DATA.records.filter(tuple => tuple[0] === "a");
    const exactPairIds = new Set(exactApplicativeTuples.map(tuple => pairIdentity(tuple[1], tuple[2])));
    const rawApplicativePairIds = new Set(applicativeExtraction.relations.map(relation => pairIdentity(relation.sourceOriginal, relation.targetOriginal)));
    assertInvariant(exactPairIds.size === exactApplicativeTuples.length && [...exactPairIds].every(identity => rawApplicativePairIds.has(identity)), "reviewed applicative overlap index is not an exact subset of the reconciled raw inventory");
    const lesson25Records = organizeLesson25(causativeReport);
    const lesson24Records = await organizeLesson24(causativeReport, lesson25Records);
    const lesson26Records = organizeLesson26(applicativeExtraction.relations, exactPairIds);
    const report = Object.freeze({
        schemaVersion: 3,
        reportKind: "karttunen-1992-andrews-lessons24-26-type-organization",
        source: Object.freeze({
            fileName: path.basename(sourcePath),
            sha256: sourceSha256,
            field: "Karttunen",
            directionContract: "TARGET marker SOURCE; report stores SOURCE -> TARGET",
            normalizedTranslationUsed: false,
        }),
        method: Object.freeze({
            grammarAuthority: "Andrews transcription Canvas Lessons 24, 25, and 26",
            lexicalEvidence: "raw reconciled 1992 Karttunen applic., caus., and nonact. relations",
            lesson24Precedence: Object.freeze(["current typed exact pair", "current typed source option kept on a separate axis", "exhaustive recorded-relation assignment to its Lesson 25 type"]),
            lesson25Precedence: Object.freeze(["numbered Canvas type assignment", ...L25_TIER_ORDER, "nearest numbered type with explicit anomaly"]),
            lesson26Precedence: Object.freeze(["current exact overlap", "reversible closed-type compatibility", "cross-lesson ambiguity", "numbered Canvas family assignment from surviving shape"]),
            exhaustiveClassificationContract: "every reconciled causative and applicative receives at least one analytical Lesson 25 or Lesson 26 type; Lesson 24 source alternatives remain a separate axis",
            classificationVersusLicense: "type classification is descriptive; generation requires the canonical typed rule prerequisites and no report row or candidate is licensed or authoritative",
            sectionUmbrellasNotPromotedToTypes: Object.freeze(["24.3", "24.4", "26.3", "26.5"]),
            sourceFamiliesNestedUnderFormationTypes: Object.freeze(["24.5.7 ni/hui procedure preferences", "24.5.9 fused destockal exact forms"]),
            comparisonAndTransformationSectionsNotPromotedToProductiveTypes: Object.freeze(["24.8", "24.9", "25.8", "26.12", "26.13-26.23"]),
            typedPrerequisiteWarning: "Karttunen tuples do not encode lexical class, valence, derivational history, or typed source analysis.",
            authority: Object.freeze({ grammar: false, generation: false, targetConstruction: false, selection: false, formula: false, surface: false }),
        }),
        lessons: Object.freeze({
            lesson24: Object.freeze({
                operation: "causative",
                catalog: L24_TYPES,
                summary: summarizeLesson24(lesson24Records),
                groups: buildGroups(lesson24Records, L24_TYPES),
                records: lesson24Records,
            }),
            lesson25: Object.freeze({
                operation: "causative",
                catalog: L25_TYPES,
                summary: summarizeLesson25(lesson25Records),
                groups: buildGroups(lesson25Records, L25_TYPES),
                records: lesson25Records,
            }),
            lesson26: Object.freeze({
                operation: "applicative",
                catalog: L26_TYPES,
                summary: summarizeLesson26(lesson26Records),
                groups: buildGroups(lesson26Records, L26_TYPES),
                records: lesson26Records,
            }),
        }),
    });
    verifyOrganization(report, causativeExtraction, applicativeExtraction, exactPairIds);
    fs.mkdirSync(outputDir, { recursive: true });
    const jsonPath = path.join(outputDir, "karttunen_1992_lessons24_26_types.json");
    const lesson24TsvPath = path.join(outputDir, "lesson24_causative_types.tsv");
    const lesson24CatalogTsvPath = path.join(outputDir, "lesson24_causative_type_catalog.tsv");
    const lesson25TsvPath = path.join(outputDir, "lesson25_causative_types.tsv");
    const lesson26TsvPath = path.join(outputDir, "lesson26_applicative_types.tsv");
    const summaryPath = path.join(outputDir, "summary.json");
    const readmePath = path.join(outputDir, "README.md");
    fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    fs.writeFileSync(lesson24TsvPath, serializeTsv(lesson24Records), "utf8");
    fs.writeFileSync(lesson24CatalogTsvPath, serializeCatalogTsv(report.lessons.lesson24.groups), "utf8");
    fs.writeFileSync(lesson25TsvPath, serializeTsv(lesson25Records), "utf8");
    fs.writeFileSync(lesson26TsvPath, serializeTsv(lesson26Records), "utf8");
    fs.writeFileSync(summaryPath, `${JSON.stringify({ lesson24: report.lessons.lesson24.summary, lesson25: report.lessons.lesson25.summary, lesson26: report.lessons.lesson26.summary }, null, 2)}\n`, "utf8");
    fs.writeFileSync(readmePath, buildReadme(report), "utf8");
    return Object.freeze({ report, jsonPath, lesson24TsvPath, lesson24CatalogTsvPath, lesson25TsvPath, lesson26TsvPath, summaryPath, readmePath });
}

if (require.main === module) {
    runOrganizer({
        sourcePath: getCliValue("--source"),
        causativeReportPath: path.resolve(getCliValue("--causative-report", DEFAULT_CAUSATIVE_REPORT)),
        outputDir: path.resolve(getCliValue("--output-dir", DEFAULT_OUTPUT_DIR)),
    }).then(result => {
        const l24 = result.report.lessons.lesson24.summary;
        const l25 = result.report.lessons.lesson25.summary;
        const l26 = result.report.lessons.lesson26.summary;
        process.stdout.write(`Karttunen Lessons 24-26 organization: Lesson 24 has ${l24.sourceCompatibleRecords}/${l24.records} rows with a distinct source-compatible type-one alternative; Lesson 25 assigns ${l25.records - l25.recordsWithoutType}/${l25.records} causatives to a numbered analytical type; Lesson 26 assigns ${l26.records - l26.recordsWithoutType}/${l26.records} applicatives to a numbered analytical type; generation authority remains false; ${result.jsonPath}\n`);
    }).catch(error => {
        process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
        process.exit(1);
    });
}

module.exports = {
    L24_TYPES,
    L25_TYPES,
    L26_TYPES,
    organizeLesson24,
    organizeLesson25,
    organizeLesson26,
    runOrganizer,
    serializeCatalogTsv,
    verifyOrganization,
};
