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

function buildSurfaceChainState({
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
    surfaceRuleMeta = null,
} = {}) {
    const sourceOuterPrefix = String(surfaceRuleMeta?.sourceOuterPrefix || "");
    return {
        surfaceRuleMeta: surfaceRuleMeta && typeof surfaceRuleMeta === "object"
            ? { ...surfaceRuleMeta }
            : null,
        segments: [
            { role: "subject", value: String(subjectPrefix || "") },
            { role: "possessive", value: String(possessivePrefix || "") },
            { role: "sourceOuter", value: sourceOuterPrefix },
            { role: "object", value: String(objectPrefix || "") },
            { role: "verb", value: String(verb || "") },
        ],
    };
}

function cloneSurfaceChainState(chain = null) {
    const segments = Array.isArray(chain?.segments) ? chain.segments : [];
    return {
        ...chain,
        segments: segments.map((segment) => ({
            ...segment,
            value: String(segment?.value || ""),
        })),
    };
}

function getSurfaceChainSegmentValue(chain = null, role = "") {
    const segments = Array.isArray(chain?.segments) ? chain.segments : [];
    const match = segments.find((segment) => segment?.role === role);
    return String(match?.value || "");
}

function setSurfaceChainSegmentValue(chain = null, role = "", nextValue = "") {
    const segments = Array.isArray(chain?.segments) ? chain.segments : [];
    const match = segments.find((segment) => segment?.role === role);
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
    const subject = getSurfaceChainSegmentValue(nextChain, "subject");
    const object = getSurfaceChainSegmentValue(nextChain, "object");
    const verb = getSurfaceChainSegmentValue(nextChain, "verb");
    if (object || !verb.startsWith("i")) {
        return nextChain;
    }
    if (subject === "ni") {
        setSurfaceChainSegmentValue(nextChain, "subject", "n");
    } else if (subject === "ti") {
        setSurfaceChainSegmentValue(nextChain, "subject", "t");
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
    const verbValue = getSurfaceChainSegmentValue(nextChain, "verb");
    if (!endsWithAny(verbValue, IA_UA_SUFFIXES)) {
        return nextChain;
    }
    setSurfaceChainSegmentValue(nextChain, "verb", verbValue.slice(0, -1));
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
    const objectIndex = segments.findIndex((segment) => segment?.role === "object");
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
    const verbValue = getSurfaceChainSegmentValue(nextChain, "verb");
    if (!verbValue.startsWith("iskalia")) {
        return nextChain;
    }
    setSurfaceChainSegmentValue(nextChain, "verb", verbValue.replace("iskalia", "skalia"));
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
    const objectValue = getSurfaceChainSegmentValue(nextChain, "object");
    const verbValue = getSurfaceChainSegmentValue(nextChain, "verb");
    if (!objectValue.endsWith("i") || !verbValue.startsWith("i")) {
        return nextChain;
    }
    setSurfaceChainSegmentValue(nextChain, "verb", verbValue.slice(1));
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
    }
    return nextChain;
}

function realizeSurfaceChainKContact(chain = null) {
    const nextChain = cloneSurfaceChainState(chain);
    const object = getSurfaceChainSegmentValue(nextChain, "object");
    const verb = getSurfaceChainSegmentValue(nextChain, "verb");
    if (!object.endsWith("k") || !verb.startsWith("k")) {
        return nextChain;
    }
    if (verb.startsWith("kw")) {
        setSurfaceChainSegmentValue(nextChain, "object", object.slice(0, -1));
    } else {
        setSurfaceChainSegmentValue(nextChain, "verb", verb.slice(1));
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
        segments[index].value = current.replace(_codaReKw, "k");
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
    const isTransitive = getSurfaceChainSegmentValue(nextChain, "object") !== "";
    for (let index = 0; index < segments.length; index += 1) {
        const current = String(segments[index]?.value || "");
        if (!current || !current.includes("y")) {
            continue;
        }
        // Phonotactic: coda [y] (before any consonant onset C, or word-finally) shifts to [sh].
        // Exception: intransitive stems with [s] in the last six phonemes shift to [s] instead.
        if (!_codaReY) { _codaReY = buildCodaRe("y"); }
        segments[index].value = current.replace(_codaReY, (match, offset) => {
            if (!isTransitive) {
                const before = current.slice(0, offset);
                const recent = splitVerbLetters(before).slice(-5);
                const hasRecentS = recent.some((l) => l === "s" || l === "sh");
                if (hasRecentS) {
                    return before.endsWith("s") ? "" : "s";
                }
            }
            return "sh";
        });
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
        segments[index].value = current.replace(_codaReM, "n");
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

function buildPrefixedChain({
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
    surfaceRuleMeta = null,
}) {
    return joinSurfaceChain(realizeSurfaceChain(buildSurfaceChainState({
        subjectPrefix,
        possessivePrefix,
        objectPrefix,
        verb,
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

function getSupportiveMarkerTokenForLetter(letter = "", format = SUPPORTIVE_MARKER_FORMAT.legacy) {
    const normalized = String(letter || "").trim().toLowerCase();
    const resolvedLetter = normalized === "y" ? "y" : "i";
    if (format === SUPPORTIVE_MARKER_FORMAT.regex || format === SUPPORTIVE_MARKER_FORMAT.screen) {
        return resolvedLetter === "y" ? REGEX_OPTIONAL_SUPPORTIVE_Y_MARKER : REGEX_OPTIONAL_SUPPORTIVE_I_MARKER;
    }
    return resolvedLetter === "y" ? OPTIONAL_SUPPORTIVE_Y_MARKER : OPTIONAL_SUPPORTIVE_I_MARKER;
}

function getSupportiveMarkerLetterFromValue(value = "", format = SUPPORTIVE_MARKER_FORMAT.legacy) {
    const source = String(value || "");
    const match = (
        format === SUPPORTIVE_MARKER_FORMAT.regex || format === SUPPORTIVE_MARKER_FORMAT.screen
    )
        ? source.match(REGEX_OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE)
        : source.match(OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE);
    return match ? String(match[1] || match[2] || "").toLowerCase() : "";
}

function replaceSupportiveMarkersWithLetters(value = "", format = SUPPORTIVE_MARKER_FORMAT.legacy) {
    const source = String(value || "");
    const pattern = (
        format === SUPPORTIVE_MARKER_FORMAT.regex || format === SUPPORTIVE_MARKER_FORMAT.screen
    )
        ? REGEX_OPTIONAL_SUPPORTIVE_MARKER_RE
        : OPTIONAL_SUPPORTIVE_MARKER_RE;
    return source.replace(pattern, (_match, letterA, letterB) => String(letterA || letterB || "").toLowerCase());
}

function getOptionalSupportiveMarkerForLetter(letter = "") {
    return getSupportiveMarkerTokenForLetter(letter, SUPPORTIVE_MARKER_FORMAT.legacy);
}

function getOptionalSupportiveMarkerLetter(value = "") {
    return getSupportiveMarkerLetterFromValue(value, SUPPORTIVE_MARKER_FORMAT.legacy);
}

function hasOptionalSupportiveMarker(value = "") {
    return Boolean(getOptionalSupportiveMarkerLetter(value));
}

function replaceOptionalSupportiveMarkersWithLetters(value = "") {
    return replaceSupportiveMarkersWithLetters(value, SUPPORTIVE_MARKER_FORMAT.legacy);
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

function replaceLegacyExplicitValenceMarkersWithRegexMarkers(value = "") {
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
    format = SUPPORTIVE_MARKER_FORMAT.legacy
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
    format = SUPPORTIVE_MARKER_FORMAT.legacy
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

function normalizeSupportiveMarkedLegacySurface(
    value = "",
    format = SUPPORTIVE_MARKER_FORMAT.legacy
) {
    const source = String(value || "");
    if (format === SUPPORTIVE_MARKER_FORMAT.regex || format === SUPPORTIVE_MARKER_FORMAT.screen) {
        return convertEnvelopeSupportiveMarkersToRegexInput(source);
    }
    return source;
}

function formatResolvedSupportiveMarkedSurface(
    value = "",
    format = SUPPORTIVE_MARKER_FORMAT.legacy,
    preserveMarkers = false
) {
    const legacyValue = String(value || "");
    if (!preserveMarkers) {
        return replaceOptionalSupportiveMarkersWithLetters(legacyValue);
    }
    if (format === SUPPORTIVE_MARKER_FORMAT.regex || format === SUPPORTIVE_MARKER_FORMAT.screen) {
        return convertRegexInputSupportiveMarkersToEnvelope(legacyValue);
    }
    return legacyValue;
}

function resolveOptionalSupportiveMarkedSurface({
    precedingSurface = "",
    markedSurface = "",
    inputFormat = SUPPORTIVE_MARKER_FORMAT.legacy,
    outputFormat = inputFormat,
    preserveMarkers = false,
} = {}) {
    const legacyMarkedSurface = normalizeSupportiveMarkedLegacySurface(markedSurface, inputFormat);
    if (!legacyMarkedSurface) {
        return {
            markerLetter: "",
            legacyMarkedSurface: "",
            plainSurface: "",
            outputSurface: "",
        };
    }
    const markerMatch = legacyMarkedSurface.match(OPTIONAL_SUPPORTIVE_MARKER_DETECT_RE);
    const markerLetter = markerMatch ? String(markerMatch[1] || "").toLowerCase() : "";
    let resolvedLegacySurface = legacyMarkedSurface;
    if (markerLetter === "y" && markerMatch) {
        const markerToken = markerMatch[0];
        const markerIndex = legacyMarkedSurface.indexOf(markerToken);
        const localPrecedingSurface = `${String(precedingSurface || "")}${legacyMarkedSurface.slice(0, markerIndex)}`;
        const followingSurface = legacyMarkedSurface.slice(markerIndex + markerToken.length);
        const yBehavior = resolveOptionalSupportiveYBehavior({
            precedingSurface: localPrecedingSurface,
            followingSurface,
        });
        const resolvedFollowingSurface = yBehavior.deleteReduplicativeY
            ? dropReduplicativeYAfterVj(followingSurface)
            : followingSurface;
        resolvedLegacySurface = (
            preserveMarkers && yBehavior.deleteReduplicativeY
                ? legacyMarkedSurface
                : (
                    `${legacyMarkedSurface.slice(0, markerIndex)}`
                    + `${yBehavior.deleteMarker ? "" : markerToken}`
                    + `${resolvedFollowingSurface}`
                )
        );
    }
    return {
        markerLetter,
        legacyMarkedSurface: resolvedLegacySurface,
        plainSurface: replaceOptionalSupportiveMarkersWithLetters(resolvedLegacySurface),
        outputSurface: formatResolvedSupportiveMarkedSurface(
            resolvedLegacySurface,
            outputFormat,
            preserveMarkers
        ),
    };
}

function markOptionalSupportiveSurface(
    value = "",
    letter = "",
    format = SUPPORTIVE_MARKER_FORMAT.legacy
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

function resolveOptionalSupportiveOutputVerb({
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
}) {
    if (!hasOptionalSupportiveI || optionalSupportiveLetter !== "y") {
        return String(verb || "");
    }
    const baseVerb = String(verb || "");
    const markedVerb = markOptionalSupportiveSurface(
        baseVerb,
        optionalSupportiveLetter,
        SUPPORTIVE_MARKER_FORMAT.legacy
    );
    if (!hasOptionalSupportiveMarker(markedVerb)) {
        return baseVerb;
    }
    const precedingSurface = `${subjectPrefix || ""}${possessivePrefix || ""}${objectPrefix || ""}`;
    return resolveOptionalSupportiveMarkedSurface({
        precedingSurface,
        markedSurface: markedVerb,
        inputFormat: SUPPORTIVE_MARKER_FORMAT.legacy,
        outputFormat: SUPPORTIVE_MARKER_FORMAT.legacy,
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
                verb: form,
                hasOptionalSupportiveI,
                optionalSupportiveLetter,
            }) || form;
        })
        .filter(Boolean)
        .join(" / ");
}

function buildOutputSurfaceChain({
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    directionalChainMeta = null,
    surfaceRuleMeta = null,
}) {
    const realizedDirectionalChain = resolveDirectionalOutputChain({
        subjectPrefix,
        objectPrefix,
        verb,
        directionalChainMeta,
    });
    const surfaceVerb = resolveOptionalSupportiveOutputVerb({
        subjectPrefix: realizedDirectionalChain.subjectPrefix,
        possessivePrefix,
        objectPrefix: realizedDirectionalChain.objectPrefix,
        verb: realizedDirectionalChain.verb,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
    });
    return buildSurfaceChainState({
        subjectPrefix: realizedDirectionalChain.subjectPrefix,
        possessivePrefix,
        objectPrefix: realizedDirectionalChain.objectPrefix,
        verb: surfaceVerb,
        surfaceRuleMeta,
    });
}

function buildOutputPrefixedChain({
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    directionalChainMeta = null,
    surfaceRuleMeta = null,
}) {
    return joinSurfaceChain(realizeSurfaceChain(buildOutputSurfaceChain({
        subjectPrefix,
        possessivePrefix,
        objectPrefix,
        verb,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        directionalChainMeta,
        surfaceRuleMeta,
    })));
}

function buildOutputWordSegments({
    preposedParticle = "",
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
    subjectSuffix = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    directionalChainMeta = null,
    surfaceRuleMeta = null,
}) {
    const realizedCoreChain = realizeSurfaceChain(buildOutputSurfaceChain({
        subjectPrefix,
        possessivePrefix,
        objectPrefix,
        verb,
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
    if (preposedParticle) {
        segments.push({ role: "particle", value: String(preposedParticle || "") });
    }
    segments.push(...coreSegments);
    if (subjectSuffix) {
        segments.push({ role: "subjectSuffix", value: String(subjectSuffix || "") });
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
        .map((segment) => ({
            role: String(segment?.role || ""),
            value: String(segment?.value || ""),
        }))
        .filter((segment) => segment.role || segment.value);
}

function getOutputSurfaceSegmentValue(segments = [], role = "") {
    const normalizedRole = String(role || "");
    const match = (Array.isArray(segments) ? segments : [])
        .find((segment) => String(segment?.role || "") === normalizedRole);
    return String(match?.value || "");
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
    const subjectPrefix = getOutputSurfaceSegmentValue(segments, "subject");
    const possessivePrefix = getOutputSurfaceSegmentValue(segments, "possessive");
    const sourceOuterPrefix = getOutputSurfaceSegmentValue(segments, "sourceOuter");
    const objectPrefix = getOutputSurfaceSegmentValue(segments, "object");
    const verb = getOutputSurfaceSegmentValue(segments, "verb");
    const subjectSuffix = getOutputSurfaceSegmentValue(segments, "subjectSuffix");
    const nominalSuffix = getOutputSurfaceSegmentValue(segments, "nominalSuffix");
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
        sourceInput: verb,
        diagnostics,
        sourceContract: {
            unitKind: "surface-segment-chain",
            segments,
            subjectPrefix,
            possessivePrefix,
            sourceOuterPrefix,
            objectPrefix,
            verb,
            subjectSuffix,
            nominalSuffix,
        },
        targetContract: {
            unitKind: "realized-output-surface",
            surface,
            outputKind: metadataKind,
        },
        orthographyFrame: {
            surface,
            surfaceForms,
            segments,
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true,
        },
        morphBoundaryFrame: {
            segments,
            segmentRoles: segments.map((segment) => segment.role),
        },
        nuclearClauseFrame: {
            surface,
            predicateStem: verb,
            subjectPrefix,
            objectPrefix,
            subjectSuffix,
            nominalSuffix,
            clauseBoundary: "#...#",
            slotOrder: ["subject", "possessive", "sourceOuter", "object", "verb", "subjectSuffix", "nominalSuffix"],
        },
        participantFrame: {
            subjectPrefix,
            possessivePrefix,
            objectPrefix,
            subjectSuffix,
        },
        inflectionFrame: {
            subjectSuffix,
            nominalSuffix,
        },
    });
}

function buildOutputWordResult({
    preposedParticle = "",
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
    subjectSuffix = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    directionalChainMeta = null,
    surfaceRuleMeta = null,
} = {}) {
    const segments = buildOutputWordSegments({
        preposedParticle,
        subjectPrefix,
        possessivePrefix,
        objectPrefix,
        verb,
        subjectSuffix,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        directionalChainMeta,
        surfaceRuleMeta,
    });
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

function buildOutputWordText({
    preposedParticle = "",
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
    subjectSuffix = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    directionalChainMeta = null,
    surfaceRuleMeta = null,
}) {
    return buildOutputWordResult({
        preposedParticle,
        subjectPrefix,
        possessivePrefix,
        objectPrefix,
        verb,
        subjectSuffix,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        directionalChainMeta,
        surfaceRuleMeta,
    }).surface;
}

function buildNominalOutputSegments({
    preposedParticle = "",
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
    subjectSuffix = "",
    trailingSuffix = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    directionalChainMeta = null,
    surfaceRuleMeta = null,
}) {
    const segments = buildOutputWordSegments({
        preposedParticle,
        subjectPrefix,
        possessivePrefix,
        objectPrefix,
        verb,
        subjectSuffix,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        directionalChainMeta,
        surfaceRuleMeta,
    });
    if (trailingSuffix) {
        segments.push({ role: "nominalSuffix", value: String(trailingSuffix || "") });
    }
    return segments;
}

function buildNominalOutputText({
    preposedParticle = "",
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
    subjectSuffix = "",
    trailingSuffix = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    directionalChainMeta = null,
    surfaceRuleMeta = null,
}) {
    return buildNominalOutputResult({
        preposedParticle,
        subjectPrefix,
        possessivePrefix,
        objectPrefix,
        verb,
        subjectSuffix,
        trailingSuffix,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        directionalChainMeta,
        surfaceRuleMeta,
    }).surface;
}

function buildNominalOutputResult({
    preposedParticle = "",
    subjectPrefix = "",
    possessivePrefix = "",
    objectPrefix = "",
    verb = "",
    subjectSuffix = "",
    trailingSuffix = "",
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    directionalChainMeta = null,
    surfaceRuleMeta = null,
} = {}) {
    const segments = buildNominalOutputSegments({
        preposedParticle,
        subjectPrefix,
        possessivePrefix,
        objectPrefix,
        verb,
        subjectSuffix,
        trailingSuffix,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        directionalChainMeta,
        surfaceRuleMeta,
    });
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

function realizeDerivedMuStemInteraction({
    objectPrefix = "",
    verb = "",
    alternateForms = [],
    enable = false,
} = {}) {
    if (!enable) {
        return {
            objectPrefix: String(objectPrefix || ""),
            verb: String(verb || ""),
            alternateForms: Array.isArray(alternateForms) ? alternateForms : [],
        };
    }
    let nextObjectPrefix = String(objectPrefix || "");
    let nextVerb = String(verb || "");
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
        objectPrefix: nextObjectPrefix,
        verb: nextVerb,
        alternateForms: nextAlternateForms,
    };
}
