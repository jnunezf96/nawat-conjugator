// core/output/surface.js
// Surface chain realization: segment state, phonotactic step functions, pipeline.
// Extracted from script.js Conjugation Utilities section (lines 17,628–17,909 post-phase-3).
// Global-scope module: all functions defined directly on the global object.
// Deps: VOWEL_START_RE, VOWEL_RE, IA_UA_SUFFIXES, VALID_CONSONANTS — var globals in script.js.
//       splitVerbLetters() — defined in src/core/phonology/phonology.js.

"use strict";

// Phonological category: C = any consonant onset.
// Uppercase = category marker (standard phonological notation).
// Built lazily from VALID_CONSONANTS — the consonant inventory is the single source of truth.
var C = "";
function ensureC() { if (!C) C = [...VALID_CONSONANTS].join(""); }

// Coda rule regexes — each matches its target before C or word-finally.
var _codaReKw = null;
var _codaReY  = null;
var _codaReM  = null;
function buildCodaRe(target) {
    ensureC();
    return new RegExp(`${target}(?=[${C}]|$)`, "g");
}

function endsWithAny(value, suffixes) {
    return suffixes.some((suffix) => value.endsWith(suffix));
}

var OUTPUT_SURFACE_ROLES = Object.freeze([
    "pers1",
    "poseedor",
    "obj1",
    "tronco",
    "pers2",
    "num2",
    "sufijoNominal",
    "prefijoExternoFuente",
    "particulaPrepuesta",
]);

function normalizeOutputSurfaceRole(role = "") {
    const normalizedRole = String(role || "");
    return OUTPUT_SURFACE_ROLES.includes(normalizedRole) ? normalizedRole : normalizedRole;
}

function normalizeOutputSurfaceSlotInput(input = {}) {
    const node = input && typeof input === "object" ? input : {};
    const pers1 = String(node.pers1 ?? "");
    const poseedor = String(node.poseedor ?? "");
    const obj1 = String(node.obj1 ?? "");
    const tronco = String(node.tronco ?? "");
    const pers2 = String(node.pers2 ?? node.num2 ?? "");
    return {
        ...node,
        particulaPrepuesta: String(node.particulaPrepuesta ?? ""),
        pers1,
        poseedor,
        obj1,
        tronco,
        pers2,
        sufijoNominal: String(node.sufijoNominal ?? ""),
    };
}

function buildSurfaceChainState(input = {}) {
    const {
        pers1,
        poseedor,
        obj1,
        tronco,
        surfaceRuleMeta = null,
    } = normalizeOutputSurfaceSlotInput(input);
    const prefijoExternoFuente = String(surfaceRuleMeta?.prefijoExternoFuente || "");
    return {
        surfaceRuleMeta: surfaceRuleMeta && typeof surfaceRuleMeta === "object"
            ? { ...surfaceRuleMeta }
            : null,
        segments: [
            { role: "pers1", slot: "pers1", value: String(pers1 || "") },
            { role: "poseedor", slot: "poseedor", value: String(poseedor || "") },
            { role: "prefijoExternoFuente", slot: "prefijoExternoFuente", value: prefijoExternoFuente },
            { role: "obj1", slot: "obj1", value: String(obj1 || "") },
            { role: "tronco", slot: "tronco", value: String(tronco || "") },
        ],
        soundSpellingFrames: [],
    };
}

function cloneSurfaceChainState(chain = null) {
    const segments = Array.isArray(chain?.segments) ? chain.segments : [];
    return {
        ...chain,
        segments: segments.map((segment) => ({
            ...segment,
            value: String(segment?.value || ""),
            soundSpellingFrames: Array.isArray(segment?.soundSpellingFrames)
                ? segment.soundSpellingFrames.map((frame) => ({ ...frame }))
                : undefined,
        })),
        soundSpellingFrames: Array.isArray(chain?.soundSpellingFrames)
            ? chain.soundSpellingFrames.map((frame) => ({ ...frame }))
            : [],
    };
}

function getSurfaceSoundSpellingFrameKey(frame = null) {
    if (!frame || typeof frame !== "object") {
        return "";
    }
    return [
        frame.ruleId || "",
        frame.grammarSlot || "",
        frame.syllablePosition || "",
        frame.sourceSurface || "",
        frame.target || "",
        Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "",
        frame.segmentRole || "",
        frame.sourceSegmentValue || "",
        frame.targetSegmentValue || "",
    ].join(":");
}

function pushUniqueSurfaceSoundSpellingFrame(list = [], frame = null) {
    if (!Array.isArray(list) || !frame || typeof frame !== "object" || !frame.ruleId) {
        return;
    }
    const key = getSurfaceSoundSpellingFrameKey(frame);
    if (!key || list.some((entry) => getSurfaceSoundSpellingFrameKey(entry) === key)) {
        return;
    }
    list.push(frame);
}

function appendSurfaceChainLesson2Frame(chain = null, role = "", frameInput = {}, beforeValue = "", afterValue = "") {
    if (!chain || typeof chain !== "object" || typeof buildLesson2SoundSpellingFrame !== "function") {
        return;
    }
    const segments = Array.isArray(chain.segments) ? chain.segments : [];
    const normalizedRole = normalizeOutputSurfaceRole(role);
    const segment = segments.find((entry) => (
        entry?.role === normalizedRole
        || entry?.slot === role
    ));
    const frame = buildLesson2SoundSpellingFrame(frameInput);
    if (!frame || !frame.ruleId) {
        return;
    }
    const decoratedFrame = {
        ...frame,
        segmentRole: normalizedRole || String(role || ""),
        sourceSegmentValue: String(beforeValue || ""),
        targetSegmentValue: String(afterValue || ""),
    };
    if (!Array.isArray(chain.soundSpellingFrames)) {
        chain.soundSpellingFrames = [];
    }
    pushUniqueSurfaceSoundSpellingFrame(chain.soundSpellingFrames, decoratedFrame);
    if (segment) {
        if (!Array.isArray(segment.soundSpellingFrames)) {
            segment.soundSpellingFrames = [];
        }
        pushUniqueSurfaceSoundSpellingFrame(segment.soundSpellingFrames, decoratedFrame);
    }
}

function getSurfaceChainSegmentValue(chain = null, role = "") {
    const segments = Array.isArray(chain?.segments) ? chain.segments : [];
    const normalizedRole = normalizeOutputSurfaceRole(role);
    const match = segments.find((segment) => (
        segment?.role === normalizedRole
        || segment?.slot === role
    ));
    return String(match?.value || "");
}

function setSurfaceChainSegmentValue(chain = null, role = "", nextValue = "") {
    const segments = Array.isArray(chain?.segments) ? chain.segments : [];
    const normalizedRole = normalizeOutputSurfaceRole(role);
    const match = segments.find((segment) => (
        segment?.role === normalizedRole
        || segment?.slot === role
    ));
    if (match) {
        match.value = String(nextValue || "");
    }
}

function getSurfaceChainNextNonEmptyIndex(chain = null, startIndex = -1) {
    const segments = Array.isArray(chain?.segments) ? chain.segments : [];
    for (let index = startIndex + 1; index < segments.length; index += 1) {
        if (String(segments[index]?.value || "")) {
            return index;
        }
    }
    return -1;
}

function realizeSurfaceChainSubjectIInitialReduction(chain = null) {
    const nextChain = cloneSurfaceChainState(chain);
    const pers1 = getSurfaceChainSegmentValue(nextChain, "pers1");
    const obj1 = getSurfaceChainSegmentValue(nextChain, "obj1");
    const tronco = getSurfaceChainSegmentValue(nextChain, "tronco");
    if (obj1 || !tronco.startsWith("i")) {
        return nextChain;
    }
    if (pers1 === "ni") {
        setSurfaceChainSegmentValue(nextChain, "pers1", "n");
        appendSurfaceChainLesson2Frame(nextChain, "pers1", {
            ruleId: "pers1-ni-i-n",
            source: "ni",
            target: "n",
            slot: "pers1",
            syllablePosition: "before-i-stem",
        }, "ni", "n");
    } else if (pers1 === "ti") {
        setSurfaceChainSegmentValue(nextChain, "pers1", "t");
        appendSurfaceChainLesson2Frame(nextChain, "pers1", {
            ruleId: "pers1-ti-i-t",
            source: "ti",
            target: "t",
            slot: "pers1",
            syllablePosition: "before-i-stem",
        }, "ti", "t");
    }
    return nextChain;
}

function realizeSurfaceChainFinalIAUATrim(chain = null) {
    const nextChain = cloneSurfaceChainState(chain);
    const ruleMeta = nextChain?.surfaceRuleMeta && typeof nextChain.surfaceRuleMeta === "object"
        ? nextChain.surfaceRuleMeta
        : null;
    if (!ruleMeta || ruleMeta.trimFinalIAUAVowel !== true) {
        return nextChain;
    }
    const troncoValue = getSurfaceChainSegmentValue(nextChain, "tronco");
    if (!endsWithAny(troncoValue, IA_UA_SUFFIXES)) {
        return nextChain;
    }
    const nextTroncoValue = troncoValue.slice(0, -1);
    setSurfaceChainSegmentValue(nextChain, "tronco", nextTroncoValue);
    appendSurfaceChainLesson2Frame(nextChain, "tronco", {
        ruleId: "stem-final-a-elision",
        source: "a",
        target: "",
        slot: "stem-final",
        syllablePosition: "stem-final-vowel",
    }, troncoValue, nextTroncoValue);
    return nextChain;
}

function realizeSurfaceChainImperativeKiReduction(chain = null) {
    const nextChain = cloneSurfaceChainState(chain);
    const ruleMeta = nextChain?.surfaceRuleMeta && typeof nextChain.surfaceRuleMeta === "object"
        ? nextChain.surfaceRuleMeta
        : null;
    if (!ruleMeta || ruleMeta.imperativeKiReduction !== true) {
        return nextChain;
    }
    const segments = Array.isArray(nextChain.segments) ? nextChain.segments : [];
    const objectIndex = segments.findIndex((segment) => (
        normalizeOutputSurfaceRole(segment?.role) === "obj1"
        || segment?.slot === "obj1"
    ));
    if (objectIndex < 0) {
        return nextChain;
    }
    const objectValue = String(segments[objectIndex]?.value || "");
    if (objectValue !== "ki") {
        return nextChain;
    }
    const nextIndex = getSurfaceChainNextNonEmptyIndex(nextChain, objectIndex);
    if (nextIndex < 0) {
        return nextChain;
    }
    const nextValue = String(segments[nextIndex]?.value || "");
    if (!nextValue || VOWEL_START_RE.test(nextValue)) {
        return nextChain;
    }
    segments[objectIndex].value = "k";
    appendSurfaceChainLesson2Frame(nextChain, "obj1", {
        ruleId: "imperative-ki-before-c-k",
        source: "ki",
        target: "k",
        slot: "obj1",
        syllablePosition: "before-consonant",
    }, objectValue, "k");
    return nextChain;
}

function realizeSurfaceChainMuIskaliaReduction(chain = null) {
    const nextChain = cloneSurfaceChainState(chain);
    const ruleMeta = nextChain?.surfaceRuleMeta && typeof nextChain.surfaceRuleMeta === "object"
        ? nextChain.surfaceRuleMeta
        : null;
    if (!ruleMeta || ruleMeta.dropInitialIFromIskaliaAfterMu !== true) {
        return nextChain;
    }
    const troncoValue = getSurfaceChainSegmentValue(nextChain, "tronco");
    if (!troncoValue.startsWith("iskalia")) {
        return nextChain;
    }
    const nextTroncoValue = troncoValue.replace("iskalia", "skalia");
    setSurfaceChainSegmentValue(nextChain, "tronco", nextTroncoValue);
    appendSurfaceChainLesson2Frame(nextChain, "tronco", {
        ruleId: "mu-iskalia-i-elision",
        source: "i",
        target: "",
        slot: "stem-initial",
        syllablePosition: "after-mu",
    }, troncoValue, nextTroncoValue);
    return nextChain;
}

function realizeSurfaceChainObjectIInitialElision(chain = null) {
    const nextChain = cloneSurfaceChainState(chain);
    const ruleMeta = nextChain?.surfaceRuleMeta && typeof nextChain.surfaceRuleMeta === "object"
        ? nextChain.surfaceRuleMeta
        : null;
    if (!ruleMeta || ruleMeta.dropVerbInitialIAfterObjectI !== true) {
        return nextChain;
    }
    const obj1Value = getSurfaceChainSegmentValue(nextChain, "obj1");
    const troncoValue = getSurfaceChainSegmentValue(nextChain, "tronco");
    if (!obj1Value.endsWith("i") || !troncoValue.startsWith("i")) {
        return nextChain;
    }
    setSurfaceChainSegmentValue(nextChain, "tronco", troncoValue.slice(1));
    appendSurfaceChainLesson2Frame(nextChain, "tronco", {
        ruleId: "object-i-stem-i-elision",
        source: "i",
        target: "",
        slot: "stem-initial",
        syllablePosition: "after-i-object",
    }, troncoValue, troncoValue.slice(1));
    return nextChain;
}

function realizeSurfaceChainNhBeforeVowel(chain = null) {
    const nextChain = cloneSurfaceChainState(chain);
    const segments = Array.isArray(nextChain.segments) ? nextChain.segments : [];
    for (let index = 0; index < segments.length - 1; index += 1) {
        const current = String(segments[index]?.value || "");
        if (!current) {
            continue;
        }
        const nextIndex = getSurfaceChainNextNonEmptyIndex(nextChain, index);
        if (nextIndex === -1) {
            break;
        }
        const nextValue = String(segments[nextIndex]?.value || "");
        if (!nextValue || !VOWEL_START_RE.test(nextValue)) {
            continue;
        }
        if (!current.endsWith("n") || current.length < 2) {
            continue;
        }
        const prevChar = current[current.length - 2] || "";
        if (!VOWEL_RE.test(prevChar) || current.endsWith("nh")) {
            continue;
        }
        segments[index].value = `${current}h`;
        appendSurfaceChainLesson2Frame(nextChain, segments[index]?.role || segments[index]?.slot || "surface-segment", {
            ruleId: "n-open-transition-nh",
            source: "n",
            target: "nh",
            slot: segments[index]?.slot || "surface-segment",
            syllablePosition: "before-vowel",
        }, current, segments[index].value);
    }
    return nextChain;
}

function realizeSurfaceChainKContact(chain = null) {
    const nextChain = cloneSurfaceChainState(chain);
    const obj1 = getSurfaceChainSegmentValue(nextChain, "obj1");
    const tronco = getSurfaceChainSegmentValue(nextChain, "tronco");
    if (!obj1.endsWith("k") || !tronco.startsWith("k")) {
        return nextChain;
    }
    if (tronco.startsWith("kw")) {
        setSurfaceChainSegmentValue(nextChain, "obj1", obj1.slice(0, -1));
        appendSurfaceChainLesson2Frame(nextChain, "obj1", {
            ruleId: "k-contact-before-kw-elision",
            source: "k+kw",
            target: "kw",
            slot: "obj1-stem-boundary",
            syllablePosition: "before-kw",
        }, `${obj1}+${tronco}`, `${obj1.slice(0, -1)}+${tronco}`);
    } else {
        setSurfaceChainSegmentValue(nextChain, "tronco", tronco.slice(1));
        appendSurfaceChainLesson2Frame(nextChain, "tronco", {
            ruleId: "k-contact-single-k",
            source: "k+k",
            target: "k",
            slot: "obj1-stem-boundary",
            syllablePosition: "before-k",
        }, `${obj1}+${tronco}`, `${obj1}+${tronco.slice(1)}`);
    }
    return nextChain;
}

function realizeSurfaceChainKwCoalescence(chain = null) {
    const nextChain = cloneSurfaceChainState(chain);
    const segments = Array.isArray(nextChain.segments) ? nextChain.segments : [];
    for (let index = 0; index < segments.length; index += 1) {
        const current = String(segments[index]?.value || "");
        if (!current || !current.includes("kw")) {
            continue;
        }
        // Phonotactic: coda [kw] reduces to [k] before any consonant onset (C) or word-finally.
        if (!_codaReKw) { _codaReKw = buildCodaRe("kw"); }
        const nextValue = current.replace(_codaReKw, "k");
        if (nextValue !== current) {
            segments[index].value = nextValue;
            appendSurfaceChainLesson2Frame(nextChain, segments[index]?.role || segments[index]?.slot || "surface-segment", {
                ruleId: "kw-coda-k",
                source: "kw",
                target: "k",
                slot: segments[index]?.slot || "surface-segment",
                syllablePosition: "coda",
            }, current, nextValue);
        }
    }
    return nextChain;
}

function realizeSurfaceChainYShift(chain = null) {
    const nextChain = cloneSurfaceChainState(chain);
    const ruleMeta = nextChain?.surfaceRuleMeta && typeof nextChain.surfaceRuleMeta === "object"
        ? nextChain.surfaceRuleMeta
        : {};
    if (ruleMeta.preserveCodaY === true) {
        return nextChain;
    }
    const segments = Array.isArray(nextChain.segments) ? nextChain.segments : [];
    const isTransitive = getSurfaceChainSegmentValue(nextChain, "obj1") !== "";
    for (let index = 0; index < segments.length; index += 1) {
        const current = String(segments[index]?.value || "");
        if (!current || !current.includes("y")) {
            continue;
        }
        // Phonotactic: coda [y] (before any consonant onset C, or word-finally) shifts to [sh].
        // Exception: intransitive stems with [s] in the last six phonemes shift to [s] instead.
        if (!_codaReY) { _codaReY = buildCodaRe("y"); }
        let replacementTarget = "";
        const nextValue = current.replace(_codaReY, (match, offset) => {
            if (!isTransitive) {
                const before = current.slice(0, offset);
                const recent = splitVerbLetters(before).slice(-5);
                const hasRecentS = recent.some((l) => l === "s" || l === "sh");
                if (hasRecentS) {
                    replacementTarget = before.endsWith("s") ? "" : "s";
                    return replacementTarget;
                }
            }
            replacementTarget = "sh";
            return "sh";
        });
        if (nextValue !== current) {
            segments[index].value = nextValue;
            appendSurfaceChainLesson2Frame(nextChain, segments[index]?.role || segments[index]?.slot || "surface-segment", {
                ruleId: replacementTarget === "s" ? "y-coda-s" : "y-coda-sh",
                source: "y",
                target: replacementTarget,
                slot: segments[index]?.slot || "surface-segment",
                syllablePosition: "coda",
            }, current, nextValue);
        }
    }
    return nextChain;
}

function realizeSurfaceChainMCodaAssimilation(chain = null) {
    const nextChain = cloneSurfaceChainState(chain);
    const segments = Array.isArray(nextChain.segments) ? nextChain.segments : [];
    for (let index = 0; index < segments.length; index += 1) {
        const current = String(segments[index]?.value || "");
        if (!current || !current.includes("m")) {
            continue;
        }
        // Phonotactic: coda [m] assimilates to [n] before any consonant onset (C) or word-finally.
        if (!_codaReM) { _codaReM = buildCodaRe("m"); }
        const nextValue = current.replace(_codaReM, "n");
        if (nextValue !== current) {
            segments[index].value = nextValue;
            appendSurfaceChainLesson2Frame(nextChain, segments[index]?.role || segments[index]?.slot || "surface-segment", {
                ruleId: "m-coda-n",
                source: "m",
                target: "n",
                slot: segments[index]?.slot || "surface-segment",
                syllablePosition: "coda",
            }, current, nextValue);
        }
    }
    return nextChain;
}

function realizeSurfaceChain(chain = null) {
    const afterFinalTrim = realizeSurfaceChainFinalIAUATrim(chain);
    const afterMuIskaliaReduction = realizeSurfaceChainMuIskaliaReduction(afterFinalTrim);
    const afterSubjectReduction = realizeSurfaceChainSubjectIInitialReduction(afterMuIskaliaReduction);
    const afterImperativeKiReduction = realizeSurfaceChainImperativeKiReduction(afterSubjectReduction);
    const afterIContactElision = realizeSurfaceChainObjectIInitialElision(afterImperativeKiReduction);
    const afterNhBeforeVowel = realizeSurfaceChainNhBeforeVowel(afterIContactElision);
    const afterKContact = realizeSurfaceChainKContact(afterNhBeforeVowel);
    const afterKwCoalescence = realizeSurfaceChainKwCoalescence(afterKContact);
    const afterYShift = realizeSurfaceChainYShift(afterKwCoalescence);
    return realizeSurfaceChainMCodaAssimilation(afterYShift);
}

function joinSurfaceChain(chain = null) {
    return (Array.isArray(chain?.segments) ? chain.segments : [])
        .map((segment) => String(segment?.value || ""))
        .join("");
}

function buildPrefixedChain(input = {}) {
    const {
        pers1,
        poseedor,
        obj1,
        tronco,
        surfaceRuleMeta = null,
    } = normalizeOutputSurfaceSlotInput(input);
    return joinSurfaceChain(realizeSurfaceChain(buildSurfaceChainState({
        pers1,
        poseedor,
        obj1,
        tronco,
        surfaceRuleMeta,
    })));
}

// === Output Formatting ===
function isWjAlternationPair(left, right) {
    if (!left || !right || left.length !== right.length) {
        return false;
    }
    let diffIndex = -1;
    for (let i = 0; i < left.length; i += 1) {
        if (left[i] === right[i]) {
            continue;
        }
        if (diffIndex !== -1) {
            return false;
        }
        diffIndex = i;
        const isWj =
            (left[i] === "w" && right[i] === "j")
            || (left[i] === "j" && right[i] === "w");
        if (!isWj) {
            return false;
        }
    }
    return diffIndex !== -1;
}

function getExpectedAbsolutiveSuffix(form) {
    if (!form) {
        return "";
    }
    const letters = splitVerbLetters(form);
    const last = letters[letters.length - 1] || "";
    if (!last) {
        return "";
    }
    return isVerbLetterVowel(last) ? "t" : "ti";
}

function isAbsolutivePair(base, candidate) {
    if (!base || !candidate) {
        return false;
    }
    const suffix = getExpectedAbsolutiveSuffix(base);
    if (!suffix) {
        return false;
    }
    return candidate === `${base}${suffix}`;
}

function isPatientivoInPair(base, candidate) {
    if (!base || !candidate) {
        return false;
    }
    return candidate === `${base}in`;
}

function getNominalMarkerFamilyBases(form = "") {
    const normalizedForm = String(form || "");
    const bases = [];
    const pushBase = (value = "") => {
        const normalizedValue = String(value || "");
        if (!normalizedValue || bases.includes(normalizedValue)) {
            return;
        }
        bases.push(normalizedValue);
    };
    pushBase(normalizedForm);
    if (normalizedForm.endsWith("in") && normalizedForm.length > 2) {
        pushBase(normalizedForm.slice(0, -2));
    }
    if (normalizedForm.endsWith("ti") && normalizedForm.length > 2) {
        pushBase(normalizedForm.slice(0, -2));
    }
    if (normalizedForm.endsWith("t") && !normalizedForm.endsWith("ti") && normalizedForm.length > 1) {
        pushBase(normalizedForm.slice(0, -1));
    }
    return bases;
}

function resolveNominalMarkerFamily(expandedForms = [], used = [], baseIndex = 0) {
    const seedForm = expandedForms[baseIndex] || "";
    if (!seedForm || used[baseIndex]) {
        return null;
    }
    const candidateBases = getNominalMarkerFamilyBases(seedForm);
    let bestFamily = null;
    candidateBases.forEach((base) => {
        if (!base) {
            return;
        }
        const absolutiveSuffix = getExpectedAbsolutiveSuffix(base);
        const familyForms = [base];
        if (absolutiveSuffix) {
            familyForms.push(`${base}${absolutiveSuffix}`);
        }
        familyForms.push(`${base}in`);
        const indices = [];
        const matchedForms = [];
        familyForms.forEach((familyForm) => {
            const matchIndex = expandedForms.findIndex((candidate, index) => (
                !used[index]
                && !indices.includes(index)
                && candidate === familyForm
            ));
            if (matchIndex === -1) {
                return;
            }
            indices.push(matchIndex);
            matchedForms.push({
                form: expandedForms[matchIndex],
                index: matchIndex,
                role: familyForm === `${base}in`
                    ? "patientivo-in"
                    : (familyForm === base ? "zero" : "absolutive"),
            });
        });
        if (indices.length <= 1) {
            return;
        }
        if (!bestFamily || indices.length > bestFamily.indices.length) {
            const pairForms = matchedForms
                .filter((entry) => entry.role === "zero" || entry.role === "absolutive")
                .sort((left, right) => left.index - right.index)
                .map((entry) => entry.form);
            const inForm = matchedForms.find((entry) => entry.role === "patientivo-in")?.form || "";
            const textParts = [];
            if (pairForms.length) {
                textParts.push(pairForms.join("/"));
            }
            if (inForm) {
                if (textParts.length) {
                    textParts[textParts.length - 1] = `${textParts[textParts.length - 1]}, ${inForm}`;
                } else {
                    textParts.push(inForm);
                }
            }
            bestFamily = {
                indices,
                text: textParts.join(" / "),
            };
        }
    });
    return bestFamily;
}

function expandOptionalParentheticalForms(forms) {
    if (!Array.isArray(forms) || forms.length === 0) {
        return [];
    }
    const expanded = [];
    const seen = new Set();
    const expandOne = (form) => {
        const match = form.match(/^(.*)\(([^()]+)\)(.*)$/);
        if (!match) {
            return [form];
        }
        const before = match[1] || "";
        const optionalPart = match[2] || "";
        const after = match[3] || "";
        const withoutOptional = `${before}${after}`;
        const withOptional = `${before}${optionalPart}${after}`;
        return [
            ...expandOne(withoutOptional),
            ...expandOne(withOptional),
        ];
    };
    forms.forEach((form) => {
        expandOne(form).forEach((variant) => {
            if (!variant || seen.has(variant)) {
                return;
            }
            seen.add(variant);
            expanded.push(variant);
        });
    });
    return expanded;
}

function hasOptionalParentheticalForm(forms) {
    if (!Array.isArray(forms) || forms.length === 0) {
        return false;
    }
    return forms.some((form) => /\([^()]+\)/.test(form));
}

function formatConjugationDisplay(value) {
    if (!value) {
        return value;
    }
    const forms = value
        .split(/\s*\/\s*/g)
        .map((form) => form.trim())
        .filter(Boolean);
    const expandedForms = expandOptionalParentheticalForms(forms);
    if (expandedForms.length <= 1) {
        return expandedForms[0] || value.trim();
    }
    if (hasOptionalParentheticalForm(forms)) {
        const seen = new Set();
        const lines = [];
        forms.forEach((form) => {
            const grouped = expandOptionalParentheticalForms([form]).filter((variant) => {
                if (!variant || seen.has(variant)) {
                    return false;
                }
                seen.add(variant);
                return true;
            });
            if (grouped.length) {
                lines.push(grouped.join(" / "));
            }
        });
        if (lines.length) {
            return lines.join("\n");
        }
        return expandedForms.join(" / ");
    }
    const used = new Array(expandedForms.length).fill(false);
    const lines = [];
    for (let i = 0; i < expandedForms.length; i += 1) {
        if (used[i]) {
            continue;
        }
        const nominalFamily = resolveNominalMarkerFamily(expandedForms, used, i);
        if (nominalFamily) {
            lines.push(nominalFamily.text);
            nominalFamily.indices.forEach((index) => {
                used[index] = true;
            });
            continue;
        }
        let pairedIndex = -1;
        let pairText = "";
        for (let j = i + 1; j < expandedForms.length; j += 1) {
            if (used[j]) {
                continue;
            }
            const left = expandedForms[i];
            const right = expandedForms[j];
            if (isWjAlternationPair(left, right)) {
                pairedIndex = j;
                pairText = `${left} / ${right}`;
                break;
            }
        }
        if (pairedIndex === -1) {
            for (let j = i + 1; j < expandedForms.length; j += 1) {
                if (used[j]) {
                    continue;
                }
                const left = expandedForms[i];
                const right = expandedForms[j];
                if (isAbsolutivePair(left, right)) {
                    pairedIndex = j;
                    pairText = `${left} / ${right}`;
                    break;
                }
                if (isAbsolutivePair(right, left)) {
                    pairedIndex = j;
                    pairText = `${right} / ${left}`;
                    break;
                }
            }
        }
        if (pairedIndex !== -1) {
            lines.push(pairText || `${expandedForms[i]} / ${expandedForms[pairedIndex]}`);
            used[i] = true;
            used[pairedIndex] = true;
        } else {
            lines.push(expandedForms[i]);
            used[i] = true;
        }
    }
    return lines.join("\n");
}

function normalizeSupportiveMarkerValue(value = "") {
    const normalized = String(value || "").trim().toLowerCase();
    return normalized === "i" || normalized === "y" ? normalized : "";
}

function hasSupportiveMarkerValue(value = "") {
    return Boolean(normalizeSupportiveMarkerValue(value));
}

function getSupportiveMarkerTokenForLetter(letter = "", format = SUPPORTIVE_MARKER_FORMAT.envelope) {
    const normalized = String(letter || "").trim().toLowerCase();
    const resolvedLetter = normalized === "y" ? "y" : "i";
    if (format === SUPPORTIVE_MARKER_FORMAT.regex) {
        return resolvedLetter === "y" ? REGEX_OPTIONAL_SUPPORTIVE_Y_MARKER : REGEX_OPTIONAL_SUPPORTIVE_I_MARKER;
    }
    return resolvedLetter === "y" ? OPTIONAL_SUPPORTIVE_Y_MARKER : OPTIONAL_SUPPORTIVE_I_MARKER;
}

function getSupportiveMarkerLetterFromValue(value = "", format = SUPPORTIVE_MARKER_FORMAT.envelope) {
    const source = String(value || "");
    const match = (
        format === SUPPORTIVE_MARKER_FORMAT.regex
    )
        ? source.match(REGEX_OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE)
        : source.match(OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE);
    return match ? String(match[1] || match[2] || "").toLowerCase() : "";
}

function replaceSupportiveMarkersWithLetters(value = "", format = SUPPORTIVE_MARKER_FORMAT.envelope) {
    const source = String(value || "");
    const pattern = (
        format === SUPPORTIVE_MARKER_FORMAT.regex
    )
        ? REGEX_OPTIONAL_SUPPORTIVE_MARKER_RE
        : OPTIONAL_SUPPORTIVE_MARKER_RE;
    return source.replace(pattern, (_match, letterA, letterB) => String(letterA || letterB || "").toLowerCase());
}

function getOptionalSupportiveMarkerForLetter(letter = "") {
    return getSupportiveMarkerTokenForLetter(letter, SUPPORTIVE_MARKER_FORMAT.envelope);
}

function getOptionalSupportiveMarkerLetter(value = "") {
    return getSupportiveMarkerLetterFromValue(value, SUPPORTIVE_MARKER_FORMAT.envelope);
}

function hasOptionalSupportiveMarker(value = "") {
    return Boolean(getOptionalSupportiveMarkerLetter(value));
}

function replaceOptionalSupportiveMarkersWithLetters(value = "") {
    return replaceSupportiveMarkersWithLetters(value, SUPPORTIVE_MARKER_FORMAT.envelope);
}

function stripOptionalSupportiveMarkers(value = "") {
    return String(value || "").replace(OPTIONAL_SUPPORTIVE_MARKER_RE, "");
}

function getRegexOptionalSupportiveMarkerForLetter(letter = "") {
    return getSupportiveMarkerTokenForLetter(letter, SUPPORTIVE_MARKER_FORMAT.regex);
}

function getRegexOptionalSupportiveMarkerLetter(value = "") {
    return getSupportiveMarkerLetterFromValue(value, SUPPORTIVE_MARKER_FORMAT.regex);
}

function convertEnvelopeSupportiveMarkersToRegexInput(value = "") {
    return String(value || "").replace(REGEX_OPTIONAL_SUPPORTIVE_MARKER_RE, (_match, letter) => (
        getOptionalSupportiveMarkerForLetter(letter)
    ));
}

function convertRegexInputSupportiveMarkersToEnvelope(value = "") {
    return String(value || "").replace(OPTIONAL_SUPPORTIVE_MARKER_RE, (_match, letterA, letterB) => (
        getRegexOptionalSupportiveMarkerForLetter(letterA || letterB)
    ));
}

function replaceEnvelopeExplicitValenceMarkersWithRegexMarkers(value = "") {
    return String(value || "").replace(
        /(^|[-/])\((ta|te|mu|t|m)\)(?=$|[-/])/gi,
        (_match, separator, token) => `${separator}${String(token || "").toUpperCase()}`
    );
}

function normalizeSupportiveYContextSurface(value = "") {
    return replaceOptionalSupportiveMarkersWithLetters(
        convertEnvelopeSupportiveMarkersToRegexInput(String(value || ""))
    ).replace(/[^a-z]/gi, "").toLowerCase();
}

function getSupportiveYFollowingSurfaceLetters(followingSurface = "") {
    const normalized = normalizeSupportiveYContextSurface(followingSurface);
    if (!normalized) {
        return [];
    }
    const letters = splitVerbLetters(normalized);
    if (letters[0] === "y" && isVerbLetterVowel(letters[1] || "")) {
        return letters.slice(1);
    }
    return letters;
}

function getSupportiveYFollowingVowel(followingSurface = "") {
    const letters = getSupportiveYFollowingSurfaceLetters(followingSurface);
    return letters.find((letter) => isVerbLetterVowel(letter)) || "";
}

function hasInitialReduplicativeSupportiveYPattern(followingSurface = "") {
    const letters = getSupportiveYFollowingSurfaceLetters(followingSurface);
    return (
        letters.length >= 4
        && isVerbLetterVowel(letters[0] || "")
        && letters[1] === "j"
        && letters[2] === "y"
        && isVerbLetterVowel(letters[3] || "")
    );
}

function dropReduplicativeYAfterVj(followingSurface = "") {
    return normalizeSupportiveYContextSurface(followingSurface).replace(/^([aeiu]j)y(?=[aeiu])/i, "$1");
}

function markReduplicativeYAfterVj(
    followingSurface = "",
    format = SUPPORTIVE_MARKER_FORMAT.envelope
) {
    const normalized = normalizeSupportiveYContextSurface(followingSurface);
    if (!normalized) {
        return "";
    }
    const marker = getSupportiveMarkerTokenForLetter("y", format);
    return normalized.replace(/^([aeiu]j)y(?=[aeiu])/i, `$1${marker}`);
}

function markInitialReduplicativeSupportiveYSurface(
    surface = "",
    format = SUPPORTIVE_MARKER_FORMAT.envelope
) {
    const normalized = normalizeSupportiveYContextSurface(surface);
    if (!normalized) {
        return "";
    }
    const leadingMarker = getSupportiveMarkerTokenForLetter("y", format);
    if (!normalized.startsWith("y")) {
        return normalized;
    }
    const remainder = normalized.slice(1);
    return `${leadingMarker}${markReduplicativeYAfterVj(remainder, format) || remainder}`;
}

function resolveOptionalSupportiveYBehavior({
    precedingSurface = "",
    followingSurface = "",
} = {}) {
    const followingVowel = getSupportiveYFollowingVowel(followingSurface);
    const hasReduplicativePattern = hasInitialReduplicativeSupportiveYPattern(followingSurface);
    const normalizedPreceding = normalizeSupportiveYContextSurface(precedingSurface);
    const precedingLetters = splitVerbLetters(normalizedPreceding);
    const finalLetter = precedingLetters.length ? precedingLetters[precedingLetters.length - 1] : "";
    const isWordInitial = !finalLetter;
    if (isWordInitial) {
        return {
            deleteMarker: hasReduplicativePattern,
            deleteReduplicativeY: hasReduplicativePattern,
        };
    }
    if (isVerbLetterConsonant(finalLetter)) {
        return { deleteMarker: true, deleteReduplicativeY: hasReduplicativePattern };
    }
    if (finalLetter === "i") {
        return { deleteMarker: true, deleteReduplicativeY: hasReduplicativePattern };
    }
    if (followingVowel === "e") {
        return { deleteMarker: true, deleteReduplicativeY: hasReduplicativePattern };
    }
    return { deleteMarker: false, deleteReduplicativeY: false };
}

function normalizeSupportiveMarkedEnvelopeSurface(
    value = "",
    format = SUPPORTIVE_MARKER_FORMAT.envelope
) {
    const source = String(value || "");
    if (format === SUPPORTIVE_MARKER_FORMAT.regex) {
        return convertEnvelopeSupportiveMarkersToRegexInput(source);
    }
    return source;
}

function formatResolvedSupportiveMarkedSurface(
    value = "",
    format = SUPPORTIVE_MARKER_FORMAT.envelope,
    preserveMarkers = false
) {
    const envelopeValue = String(value || "");
    if (!preserveMarkers) {
        return replaceOptionalSupportiveMarkersWithLetters(envelopeValue);
    }
    if (format === SUPPORTIVE_MARKER_FORMAT.regex) {
        return convertRegexInputSupportiveMarkersToEnvelope(envelopeValue);
    }
    return envelopeValue;
}

function resolveOptionalSupportiveMarkedSurface({
    precedingSurface = "",
    markedSurface = "",
    inputFormat = SUPPORTIVE_MARKER_FORMAT.envelope,
    outputFormat = inputFormat,
    preserveMarkers = false,
} = {}) {
    const envelopeMarkedSurface = normalizeSupportiveMarkedEnvelopeSurface(markedSurface, inputFormat);
    if (!envelopeMarkedSurface) {
        return {
            markerLetter: "",
            envelopeMarkedSurface: "",
            plainSurface: "",
            outputSurface: "",
        };
    }
    const markerMatch = envelopeMarkedSurface.match(OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE);
    const markerLetter = markerMatch ? String(markerMatch[1] || "").toLowerCase() : "";
    let resolvedEnvelopeSurface = envelopeMarkedSurface;
    if (markerLetter === "y" && markerMatch) {
        const markerToken = markerMatch[0];
        const markerIndex = envelopeMarkedSurface.indexOf(markerToken);
        const localPrecedingSurface = `${String(precedingSurface || "")}${envelopeMarkedSurface.slice(0, markerIndex)}`;
        const followingSurface = envelopeMarkedSurface.slice(markerIndex + markerToken.length);
        const yBehavior = resolveOptionalSupportiveYBehavior({
            precedingSurface: localPrecedingSurface,
            followingSurface,
        });
        const resolvedFollowingSurface = yBehavior.deleteReduplicativeY
            ? dropReduplicativeYAfterVj(followingSurface)
            : followingSurface;
        resolvedEnvelopeSurface = (
            preserveMarkers && yBehavior.deleteReduplicativeY
                ? envelopeMarkedSurface
                : (
                    `${envelopeMarkedSurface.slice(0, markerIndex)}`
                    + `${yBehavior.deleteMarker ? "" : markerToken}`
                    + `${resolvedFollowingSurface}`
                )
        );
    }
    return {
        markerLetter,
        envelopeMarkedSurface: resolvedEnvelopeSurface,
        plainSurface: replaceOptionalSupportiveMarkersWithLetters(resolvedEnvelopeSurface),
        outputSurface: formatResolvedSupportiveMarkedSurface(
            resolvedEnvelopeSurface,
            outputFormat,
            preserveMarkers
        ),
    };
}

function markOptionalSupportiveSurface(
    value = "",
    letter = "",
    format = SUPPORTIVE_MARKER_FORMAT.envelope
) {
    const normalizedSurface = normalizeSupportiveYContextSurface(value);
    if (!normalizedSurface) {
        return "";
    }
    const supportiveLetter = resolveOptionalSupportiveLetter(letter, normalizedSurface);
    if (supportiveLetter === "y") {
        const supportiveYIndex = normalizedSurface.search(/y(?=[aeiu])/i);
        if (supportiveYIndex < 0) {
            return normalizedSurface;
        }
        const prefix = normalizedSurface.slice(0, supportiveYIndex);
        const ySegment = normalizedSurface.slice(supportiveYIndex);
        if (hasInitialReduplicativeSupportiveYPattern(ySegment)) {
            return `${prefix}${markInitialReduplicativeSupportiveYSurface(ySegment, format)}`;
        }
        if (ySegment.startsWith("y")) {
            return `${prefix}${getSupportiveMarkerTokenForLetter("y", format)}${ySegment.slice(1)}`;
        }
        return normalizedSurface;
    }
    if (normalizedSurface.startsWith("i")) {
        return `${getSupportiveMarkerTokenForLetter("i", format)}${normalizedSurface.slice(1)}`;
    }
    return normalizedSurface;
}

function resolveOptionalSupportiveOutputVerb(input = {}) {
    const {
        pers1,
        poseedor,
        obj1,
        tronco,
        hasOptionalSupportiveI = false,
        optionalSupportiveLetter = "",
    } = normalizeOutputSurfaceSlotInput(input);
    if (!hasOptionalSupportiveI || optionalSupportiveLetter !== "y") {
        return String(tronco || "");
    }
    const baseVerb = String(tronco || "");
    const markedVerb = markOptionalSupportiveSurface(
        baseVerb,
        optionalSupportiveLetter,
        SUPPORTIVE_MARKER_FORMAT.envelope
    );
    if (!hasOptionalSupportiveMarker(markedVerb)) {
        return baseVerb;
    }
    const precedingSurface = `${pers1 || ""}${poseedor || ""}${obj1 || ""}`;
    return resolveOptionalSupportiveMarkedSurface({
        precedingSurface,
        markedSurface: markedVerb,
        inputFormat: SUPPORTIVE_MARKER_FORMAT.envelope,
        outputFormat: SUPPORTIVE_MARKER_FORMAT.envelope,
        preserveMarkers: false,
    }).plainSurface || baseVerb;
}

function resolveOptionalSupportiveOutputText({
    value = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
} = {}) {
    return String(value || "")
        .split(" / ")
        .map((entry) => {
            const form = String(entry || "").trim();
            if (!form) {
                return "";
            }
            return resolveOptionalSupportiveOutputVerb({
                tronco: form,
                hasOptionalSupportiveI,
                optionalSupportiveLetter,
            }) || form;
        })
        .filter(Boolean)
        .join(" / ");
}

function buildOutputSurfaceChain(input = {}) {
    const {
        pers1,
        poseedor,
        obj1,
        tronco,
        hasOptionalSupportiveI = false,
        optionalSupportiveLetter = "",
        directionalChainMeta = null,
        surfaceRuleMeta = null,
    } = normalizeOutputSurfaceSlotInput(input);
    const realizedDirectionalChain = resolveDirectionalOutputChain({
        pers1,
        obj1,
        tronco,
        directionalChainMeta,
    });
    const directionalPers1 = String(realizedDirectionalChain.pers1 || "");
    const directionalObj1 = String(realizedDirectionalChain.obj1 || "");
    const directionalTronco = String(realizedDirectionalChain.tronco || "");
    const surfaceVerb = resolveOptionalSupportiveOutputVerb({
        pers1: directionalPers1,
        poseedor,
        obj1: directionalObj1,
        tronco: directionalTronco,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
    });
    const chain = buildSurfaceChainState({
        pers1: directionalPers1,
        poseedor,
        obj1: directionalObj1,
        tronco: surfaceVerb,
        surfaceRuleMeta,
    });
    if (Array.isArray(realizedDirectionalChain.soundSpellingFrames)) {
        realizedDirectionalChain.soundSpellingFrames.forEach((frame) => {
            if (!frame || typeof frame !== "object") {
                return;
            }
            if (!Array.isArray(chain.soundSpellingFrames)) {
                chain.soundSpellingFrames = [];
            }
            pushUniqueSurfaceSoundSpellingFrame(chain.soundSpellingFrames, frame);
            const segmentRole = normalizeOutputSurfaceRole(frame.segmentRole || frame.grammarSlot || "");
            const segment = Array.isArray(chain.segments)
                ? chain.segments.find((entry) => (
                    entry?.role === segmentRole
                    || entry?.slot === frame.grammarSlot
                ))
                : null;
            if (segment) {
                if (!Array.isArray(segment.soundSpellingFrames)) {
                    segment.soundSpellingFrames = [];
                }
                pushUniqueSurfaceSoundSpellingFrame(segment.soundSpellingFrames, frame);
            }
        });
    }
    return chain;
}

function buildOutputPrefixedChain(input = {}) {
    return joinSurfaceChain(realizeSurfaceChain(buildOutputSurfaceChain(input)));
}

function buildOutputWordSegments(input = {}) {
    const {
        particulaPrepuesta,
        pers1,
        poseedor,
        obj1,
        tronco,
        pers2,
        hasOptionalSupportiveI = false,
        optionalSupportiveLetter = "",
        directionalChainMeta = null,
        surfaceRuleMeta = null,
    } = normalizeOutputSurfaceSlotInput(input);
    const realizedCoreChain = realizeSurfaceChain(buildOutputSurfaceChain({
        pers1,
        poseedor,
        obj1,
        tronco,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        directionalChainMeta,
        surfaceRuleMeta,
    }));
    const coreSegments = Array.isArray(realizedCoreChain?.segments)
        ? realizedCoreChain.segments.map((segment) => ({
            ...segment,
            value: String(segment?.value || ""),
        }))
        : [];
    const segments = [];
    if (particulaPrepuesta) {
        segments.push({ role: "particulaPrepuesta", slot: "particulaPrepuesta", value: String(particulaPrepuesta || "") });
    }
    segments.push(...coreSegments);
    if (pers2) {
        segments.push({ role: "pers2", slot: "pers2", value: String(pers2 || "") });
    }
    return segments;
}

function joinOutputWordSegments(segments = []) {
    return (Array.isArray(segments) ? segments : [])
        .map((segment) => String(segment?.value || ""))
        .join("");
}

var OUTPUT_SURFACE_ANDREWS_REFS = Object.freeze([
    "Andrews Lesson 2 2.1 and 2.6",
    "Andrews Lesson 4 4.4-4.5",
]);

function normalizeOutputSurfaceSegments(segments = []) {
    return (Array.isArray(segments) ? segments : [])
        .map((segment) => {
            const soundSpellingFrames = Array.isArray(segment?.soundSpellingFrames)
                ? segment.soundSpellingFrames.map((frame) => ({ ...frame }))
                : [];
            return {
                role: String(segment?.role || ""),
                slot: String(segment?.slot || ""),
                value: String(segment?.value || ""),
                ...(soundSpellingFrames.length ? { soundSpellingFrames } : {}),
            };
        })
        .filter((segment) => segment.role || segment.slot || segment.value);
}

function getOutputSurfaceSegmentValue(segments = [], role = "") {
    const rawRole = String(role || "");
    const normalizedRole = normalizeOutputSurfaceRole(rawRole);
    const match = (Array.isArray(segments) ? segments : [])
        .find((segment) => (
            String(segment?.role || "") === normalizedRole
            || String(segment?.slot || "") === rawRole
        ));
    return String(match?.value || "");
}

function buildOutputSurfaceSoundSpellingFrames(segments = []) {
    if (typeof buildLesson2SoundSpellingFrame !== "function") {
        return [];
    }
    const frames = [];
    const pushExistingFrame = (frame = null) => {
        pushUniqueSurfaceSoundSpellingFrame(frames, frame);
    };
    const pushFrame = (frameInput = {}) => {
        const frame = buildLesson2SoundSpellingFrame(frameInput);
        if (!frame || !frame.ruleId) {
            return;
        }
        pushExistingFrame(frame);
    };
    normalizeOutputSurfaceSegments(segments).forEach((segment) => {
        if (Array.isArray(segment.soundSpellingFrames)) {
            segment.soundSpellingFrames.forEach(pushExistingFrame);
        }
        const role = normalizeOutputSurfaceRole(segment.role || segment.slot || "");
        const slot = String(segment.slot || role || "");
        const value = String(segment.value || "");
        if ((role === "pers2" || slot === "pers2" || slot === "num2") && value === "t") {
            pushFrame({
                source: "-h",
                target: "-t",
                slot: "num2",
                syllablePosition: "slot-final",
            });
        }
        if ((role === "sufijoNominal" || slot === "sufijoNominal" || slot === "sufijo-nominal") && value === "t") {
            pushFrame({
                source: "-tl",
                target: "-t",
                slot: "sufijo-nominal",
                syllablePosition: "slot-final",
            });
        }
    });
    return frames;
}

function normalizeOutputSurfaceContractSurfaceValue(value = "") {
    const text = String(value || "").trim();
    return text === "—" ? "" : text;
}

function splitOutputSurfaceContractSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeOutputSurfaceContractSurfaceValue(entry))
        .filter(Boolean);
}

function getOutputSurfaceResultFrame(record = null, options = {}) {
    const optionFrame = options?.grammarFrame && typeof options.grammarFrame === "object"
        ? options.grammarFrame
        : (options?.frames && typeof options.frames === "object" ? options.frames : null);
    const recordFrame = record?.grammarFrame && typeof record.grammarFrame === "object"
        ? record.grammarFrame
        : (record?.frames && typeof record.frames === "object" ? record.frames : null);
    const frame = optionFrame || recordFrame;
    return frame?.resultFrame && typeof frame.resultFrame === "object"
        ? frame.resultFrame
        : null;
}

function getOutputSurfaceSurfaceForms(record = null, fallbackSurface = "", options = {}) {
    const node = record && typeof record === "object" ? record : {};
    const resultFrame = getOutputSurfaceResultFrame(node, options);
    const hasResultFrame = Boolean(resultFrame);
    const candidates = [];
    if (Array.isArray(resultFrame?.surfaceForms)) {
        candidates.push(...resultFrame.surfaceForms);
    }
    if (resultFrame?.surface) {
        candidates.push(resultFrame.surface);
    }
    if (hasResultFrame) {
        return candidates
            .flatMap((entry) => splitOutputSurfaceContractSurfaceText(entry))
            .filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    if (!hasResultFrame && Array.isArray(node.surfaceForms)) {
        candidates.push(...node.surfaceForms);
    }
    if (!hasResultFrame && node.surface) {
        candidates.push(node.surface);
    }
    if (!hasResultFrame && node.result) {
        candidates.push(node.result);
    }
    if (!hasResultFrame && fallbackSurface) {
        candidates.push(fallbackSurface);
    }
    return candidates
        .flatMap((entry) => splitOutputSurfaceContractSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function getOutputSurfacePrimarySurface(record = null, fallbackSurface = "", options = {}) {
    return getOutputSurfaceSurfaceForms(record, fallbackSurface, options)[0] || "";
}

function attachOutputSurfaceGrammarContract(record = null, options = {}) {
    if (!record || typeof record !== "object" || typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    const segments = normalizeOutputSurfaceSegments(options.segments || record.segments);
    const fallbackSurface = String(options.surface || joinOutputWordSegments(segments) || "");
    const surfaceForms = getOutputSurfaceSurfaceForms(record, fallbackSurface, options);
    const surface = getOutputSurfacePrimarySurface(record, fallbackSurface, options);
    const supported = options.supported !== undefined
        ? options.supported === true
        : Boolean(surface || surfaceForms.length);
    const diagnostics = Array.isArray(options.diagnostics) ? options.diagnostics : [];
    const metadataKind = String(options.metadataKind || "output-surface").trim();
    const routeStage = String(options.routeStage || (supported ? "realize-output-surface" : "blocked")).trim();
    const pers1 = getOutputSurfaceSegmentValue(segments, "pers1");
    const poseedor = getOutputSurfaceSegmentValue(segments, "poseedor");
    const prefijoExternoFuente = getOutputSurfaceSegmentValue(segments, "prefijoExternoFuente");
    const obj1 = getOutputSurfaceSegmentValue(segments, "obj1");
    const tronco = getOutputSurfaceSegmentValue(segments, "tronco");
    const pers2 = getOutputSurfaceSegmentValue(segments, "pers2");
    const sufijoNominal = getOutputSurfaceSegmentValue(segments, "sufijoNominal");
    const soundSpellingFrames = buildOutputSurfaceSoundSpellingFrames(segments);
    return attachGrammarMetadataContract({
        ...record,
        surfaceForms,
    }, {
        enumerable: false,
        metadataKind,
        unitKind: "output-surface",
        routeFamily: "output-surface",
        routeStage,
        generationAllowed: supported,
        supported,
        structuralSource: "Andrews Lesson 2",
        andrewsRefs: OUTPUT_SURFACE_ANDREWS_REFS,
        evidenceStatus: supported ? "surface-realized" : "blocked",
        diagnosticStatus: supported ? "surface-realized" : "blocked",
        surface,
        surfaceForms,
        sourceInput: tronco,
        diagnostics,
        sourceContract: {
            unitKind: "surface-segment-chain",
            segments,
            pers1,
            poseedor,
            obj1,
            tronco,
            pers2,
            prefijoExternoFuente,
            prefijoExternoFuente: prefijoExternoFuente,
            sufijoNominal,
        },
        targetContract: {
            unitKind: "realized-output-surface",
            surface,
            outputKind: metadataKind,
            soundSpellingFrames,
        },
        orthographyFrame: {
            surface,
            surfaceForms,
            segments,
            soundSpellingFrames,
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
        },
        morphBoundaryFrame: {
            segments,
            segmentRoles: segments.map((segment) => segment.role),
        },
        nuclearClauseFrame: {
            surface,
            predicateStem: tronco,
            tronco,
            pers1,
            poseedor,
            obj1,
            pers2,
            prefijoExternoFuente: prefijoExternoFuente,
            sufijoNominal,
            clauseBoundary: "#...#",
            slotOrder: ["pers1", "poseedor", "prefijoExternoFuente", "obj1", "tronco", "pers2", "sufijoNominal"],
            andrewsSlotOrder: ["pers1", "poseedor", "prefijoExternoFuente", "obj1", "tronco", "pers2", "sufijoNominal"],
        },
        participantFrame: {
            pers1Pers2: {
                prefix: pers1,
                suffix: pers2,
            },
            obj1: {
                prefix: obj1,
            },
            poseedor: {
                prefix: poseedor,
            },
            pers1,
            pers2,
            prefijoExternoFuente: prefijoExternoFuente,
        },
        inflectionFrame: {
            pers2,
            sufijoNominal,
        },
    });
}

function buildOutputWordResult(input = {}) {
    const segments = buildOutputWordSegments(input);
    const surface = joinOutputWordSegments(segments);
    return attachOutputSurfaceGrammarContract({
        surface,
        segments,
    }, {
        metadataKind: "output-word-surface",
        routeStage: surface ? "realize-output-word" : "blocked",
        supported: Boolean(surface),
        surface,
        segments,
    });
}

function buildOutputWordText(input = {}) {
    return buildOutputWordResult(input).surface;
}

function buildNominalOutputSegments(input = {}) {
    const { sufijoNominal } = normalizeOutputSurfaceSlotInput(input);
    const segments = buildOutputWordSegments(input);
    if (sufijoNominal) {
        segments.push({ role: "sufijoNominal", slot: "sufijoNominal", value: String(sufijoNominal || "") });
    }
    return segments;
}

function buildNominalOutputText(input = {}) {
    return buildNominalOutputResult(input).surface;
}

function buildNominalOutputResult(input = {}) {
    const segments = buildNominalOutputSegments(input);
    const surface = joinOutputWordSegments(segments);
    return attachOutputSurfaceGrammarContract({
        surface,
        segments,
    }, {
        metadataKind: "nominal-output-surface",
        routeStage: surface ? "realize-nominal-output" : "blocked",
        supported: Boolean(surface),
        surface,
        segments,
    });
}

function realizeDerivedMuStemInteraction(input = {}) {
    const {
        obj1,
        tronco,
        alternateForms = [],
        enable = false,
    } = normalizeOutputSurfaceSlotInput(input);
    if (!enable) {
        return {
            obj1: String(obj1 || ""),
            tronco: String(tronco || ""),
            alternateForms: Array.isArray(alternateForms) ? alternateForms : [],
        };
    }
    let nextObjectPrefix = String(obj1 || "");
    let nextVerb = String(tronco || "");
    const nextAlternateForms = Array.isArray(alternateForms)
        ? alternateForms
        : [];
    if (nextVerb.startsWith("mu") && nextObjectPrefix.endsWith("mu")) {
        nextObjectPrefix = nextObjectPrefix.slice(0, -2);
    }
    if (nextObjectPrefix === "mu" && nextVerb.startsWith("mu")) {
        nextObjectPrefix = "";
    }
    if (nextVerb.startsWith("mu")) {
        const embeddedMarker = nextObjectPrefix === "ta" || nextObjectPrefix === "te"
            ? nextObjectPrefix
            : (nextObjectPrefix.startsWith("al") && (nextObjectPrefix.slice(2) === "ta" || nextObjectPrefix.slice(2) === "te")
                ? nextObjectPrefix.slice(2)
                : (nextObjectPrefix.startsWith("wal") && (nextObjectPrefix.slice(3) === "ta" || nextObjectPrefix.slice(3) === "te")
                    ? nextObjectPrefix.slice(3)
                    : ""));
        if (embeddedMarker && !nextVerb.startsWith(`mu${embeddedMarker}`)) {
            if (nextObjectPrefix.startsWith("al")) {
                nextObjectPrefix = "al";
            } else if (nextObjectPrefix.startsWith("wal")) {
                nextObjectPrefix = "wal";
            } else {
                nextObjectPrefix = "";
            }
            nextVerb = `mu${embeddedMarker}${nextVerb.slice(2)}`;
            nextAlternateForms.forEach((form) => {
                if (
                    form
                    && form.verb
                    && form.verb.startsWith("mu")
                    && !form.verb.startsWith(`mu${embeddedMarker}`)
                ) {
                    form.verb = `mu${embeddedMarker}${form.verb.slice(2)}`;
                }
            });
        }
    } else if (
        !nextObjectPrefix
        && (nextVerb.startsWith("tamu") || nextVerb.startsWith("temu"))
    ) {
        const embeddedMarker = nextVerb.slice(0, 2);
        nextVerb = `mu${embeddedMarker}${nextVerb.slice(4)}`;
        nextAlternateForms.forEach((form) => {
            if (form && form.verb && (form.verb.startsWith("tamu") || form.verb.startsWith("temu"))) {
                const formMarker = form.verb.slice(0, 2);
                form.verb = `mu${formMarker}${form.verb.slice(4)}`;
            }
        });
    }
    return {
        obj1: nextObjectPrefix,
        tronco: nextVerb,
        alternateForms: nextAlternateForms,
    };
}
