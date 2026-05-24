// core/phonology/phonology.js
// Syllabification, phonotactics, syllable form validation.
// Extracted from script.js lines 3,120–3,705 (Syllable & Phonology section).
// Global-scope module: all functions defined directly on the global object.
// Deps: DIGRAPH_SET, VOWELS, REDUP_PREFIX_FORMS, SYLLABLE_FORM_SET, VOWEL_END_RE
//       (all initialized in script.js Configuration section before first call)
//       getSuppletiveWeyaRootPlusYaBase() — defined in src/core/irregulars/irregulars.js

"use strict";

function splitVerbLetters(verb) {
    const letters = [];
    for (let i = 0; i < verb.length; i += 1) {
        const pair = verb.slice(i, i + 2);
        if (DIGRAPH_SET.has(pair)) {
            letters.push(pair);
            i += 1;
        } else {
            letters.push(verb[i]);
        }
    }
    return letters;
}

function getVerbLetterCount(verb) {
    return splitVerbLetters(verb).length;
}

function isVerbLetterVowel(letter) {
    return letter.length === 1 && VOWELS.includes(letter);
}

function isVerbLetterConsonant(letter) {
    return !!letter && !isVerbLetterVowel(letter);
}

function startsWithICVCVPattern(verb) {
    const letters = splitVerbLetters(verb);
    if (!letters.length || letters[0] !== "i") {
        return false;
    }
    let index = 1;
    if (letters[index] === "j" || letters[index] === "l") {
        index += 1;
    }
    if (letters.length <= index + 3) {
        return false;
    }
    return isVerbLetterConsonant(letters[index])
        && isVerbLetterVowel(letters[index + 1])
        && isVerbLetterConsonant(letters[index + 2])
        && isVerbLetterVowel(letters[index + 3]);
}

function startsWithACVlPattern(verb) {
    const letters = splitVerbLetters(verb);
    if (letters.length < 4) {
        return false;
    }
    return letters[0] === "a"
        && isVerbLetterConsonant(letters[1])
        && isVerbLetterVowel(letters[2])
        && letters[3] === "l";
}

function startsWithAlPrefix(verb) {
    const letters = splitVerbLetters(verb);
    return letters.length >= 2 && letters[0] === "a" && letters[1] === "l";
}

function applySyllableAnalysisTargetOptions(rawTarget, options = {}) {
    let target = String(rawTarget || "");
    if (!target) {
        return "";
    }
    const lastChar = target.slice(-1);
    const hasFinalVowel = VOWELS.includes(lastChar);
    const isFinalCoda = lastChar === "j" || lastChar === "l";
    if (options.assumeFinalV && !hasFinalVowel && !isFinalCoda) {
        target += "a";
    }
    return target;
}

function getSyllableAnalysisTarget(rawVerb, options = {}) {
    const baseTarget = (
        typeof options.target === "string"
        || typeof options.target === "number"
    ) ? String(options.target) : String(rawVerb || "");
    return applySyllableAnalysisTargetOptions(baseTarget, options);
}

function splitVerbSyllables(verb) {
    const letters = splitVerbLetters(verb);
    const syllables = [];
    let index = 0;
    while (index < letters.length) {
        const current = letters[index];
        if (isVerbLetterVowel(current)) {
            const next = letters[index + 1];
            if (next === "j" || next === "l") {
                syllables.push({
                    letters: [current, next],
                    form: `V${next}`,
                    onset: "",
                    nucleus: current,
                    coda: next,
                    text: `${current}${next}`,
                });
                index += 2;
            } else {
                syllables.push({
                    letters: [current],
                    form: "V",
                    onset: "",
                    nucleus: current,
                    coda: "",
                    text: `${current}`,
                });
                index += 1;
            }
            continue;
        }
        const next = letters[index + 1];
        if (next && isVerbLetterVowel(next)) {
            const coda = letters[index + 2];
            if (coda === "j" || coda === "l") {
                syllables.push({
                    letters: [current, next, coda],
                    form: `CV${coda}`,
                    onset: current,
                    nucleus: next,
                    coda,
                    text: `${current}${next}${coda}`,
                });
                index += 3;
            } else {
                syllables.push({
                    letters: [current, next],
                    form: "CV",
                    onset: current,
                    nucleus: next,
                    coda: "",
                    text: `${current}${next}`,
                });
                index += 2;
            }
            continue;
        }
        syllables.push({
            letters: [current],
            form: "C",
            onset: current,
            nucleus: "",
            coda: "",
            text: `${current}`,
        });
        index += 1;
    }
    return syllables;
}

function getSyllables(rawVerb, options = {}) {
    const target = getSyllableAnalysisTarget(rawVerb, options);
    if (!target) {
        return [];
    }
    return splitVerbSyllables(target);
}

function getSyllableBaseKey(syllable) {
    if (!syllable || !syllable.nucleus) {
        return "";
    }
    return `${syllable.onset || ""}:${syllable.nucleus}`;
}

function getNonReduplicatedRoot(verb) {
    if (!verb) {
        return verb;
    }
    const syllables = splitVerbSyllables(verb);
    if (syllables.length < 2) {
        return verb;
    }
    for (let i = 0; i < syllables.length - 1; i += 1) {
        const first = syllables[i];
        const second = syllables[i + 1];
        if (!first || !second) {
            continue;
        }
        const isStandardRedup = (
            REDUP_PREFIX_FORMS.has(first.form)
            && second.nucleus
            && isOpenSyllable(second)
            && (first.onset || second.onset)
            && getSyllableBaseKey(first) === getSyllableBaseKey(second)
        );
        const isLRedup = (
            second.nucleus
            && getSyllableBaseKey(first) === getSyllableBaseKey(second)
            && (
                ((first.form === "V" || first.form === "Vj") && second.form === "Vl")
                || ((first.form === "CV" || first.form === "CVj") && second.form === "CVl")
            )
        );
        if (isStandardRedup || isLRedup) {
            return syllables.slice(i + 1).map((syllable) => syllable.text).join("");
        }
    }
    return verb;
}

function matchesDerivationRuleBaseList(list, ruleBase, fullRuleBase, options = {}) {
    if (!Array.isArray(list) || list.length === 0) {
        return false;
    }
    const has = (value) => Boolean(value && list.includes(value));
    if (has(ruleBase) || has(fullRuleBase)) {
        return true;
    }
    if (options.allowRedup === false) {
        return false;
    }
    const nonRedupRuleBase = getNonReduplicatedRoot(ruleBase);
    if (nonRedupRuleBase && has(nonRedupRuleBase)) {
        return true;
    }
    const nonRedupFull = fullRuleBase ? getNonReduplicatedRoot(fullRuleBase) : "";
    return Boolean(nonRedupFull && has(nonRedupFull));
}

function isOpenSyllable(syllable) {
    return syllable && (syllable.form === "V" || syllable.form === "CV");
}

function isPlainVowelSyllable(syllable) {
    return syllable && syllable.form === "V";
}

function isCVWithOnset(syllable, onset) {
    return syllable && syllable.form === "CV" && syllable.onset === onset;
}

function endsWithOpenSyllableSuffix(verb, onset, nucleus, options = {}) {
    const syllables = splitVerbSyllables(verb);
    const minSyllables = options.allowSingleSyllable === true ? 1 : 2;
    if (syllables.length < minSyllables) {
        return false;
    }
    const last = syllables[syllables.length - 1];
    if (!last || last.form !== "CV" || last.onset !== onset || last.nucleus !== nucleus) {
        return false;
    }
    if (options.allowSingleSyllable === true && syllables.length === 1) {
        return true;
    }
    const prev = syllables[syllables.length - 2];
    return Boolean(prev && isOpenSyllable(prev));
}

function getTrailingVowelCountFromSyllables(syllables) {
    if (!syllables || syllables.length === 0) {
        return 0;
    }
    const last = syllables[syllables.length - 1];
    if (!last || !last.nucleus || !isOpenSyllable(last)) {
        return 0;
    }
    if (last.form !== "V") {
        return 1;
    }
    const prev = syllables[syllables.length - 2];
    if (prev && isOpenSyllable(prev) && prev.nucleus) {
        return 2;
    }
    return 1;
}

function getTotalVowelCountFromSyllables(syllables) {
    if (!syllables || syllables.length === 0) {
        return 0;
    }
    return syllables.reduce((count, syllable) => count + (syllable.nucleus ? 1 : 0), 0);
}

function endsWithIaUaSyllables(syllables) {
    if (!syllables || syllables.length < 2) {
        return false;
    }
    const last = syllables[syllables.length - 1];
    const prev = syllables[syllables.length - 2];
    if (!last || !prev || last.form !== "V" || !isOpenSyllable(prev)) {
        return false;
    }
    if (last.nucleus !== "a") {
        return false;
    }
    return prev.nucleus === "i" || prev.nucleus === "u";
}

function isItaSyllableSequence(syllables) {
    if (!syllables || syllables.length < 2) {
        return false;
    }
    const last = syllables[syllables.length - 1];
    const itaOnsets = new Set(["t", "d"]);
    if (!last || last.form !== "CV" || !itaOnsets.has(last.onset) || last.nucleus !== "a") {
        return false;
    }
    const penultimate = syllables[syllables.length - 2];
    if (!penultimate || penultimate.nucleus !== "i") {
        return false;
    }
    if (penultimate.form === "V") {
        return true;
    }
    if (penultimate.form !== "CV") {
        return false;
    }
    if (penultimate.onset === "kw") {
        return false;
    }
    if (penultimate.onset === "w") {
        const antepenultimate = syllables[syllables.length - 3];
        if (antepenultimate && antepenultimate.nucleus === "i") {
            return false;
        }
    }
    return true;
}

function isIVerbSyllableSequence(syllables) {
    return (
        syllables &&
        syllables.length === 1 &&
        isPlainVowelSyllable(syllables[0]) &&
        syllables[0].nucleus === "i"
    );
}


function areSyllablesPronounceable(syllables) {
    if (!syllables || syllables.length === 0) {
        return false;
    }
    // Invalid onset sequence: bare consonant syllable followed by CV.
    // This blocks shapes like C+CV (e.g., "cca") in real generation/validation.
    if (syllables.length >= 2 && syllables[0]?.form === "C" && syllables[1]?.form === "CV") {
        return false;
    }
    for (let i = 0; i < syllables.length; i += 1) {
        const syllable = syllables[i];
        const form = syllable.form;
        if (!SYLLABLE_FORM_SET.has(form)) {
            return false;
        }
        // Phonotactic: [w] and [kw] may not appear as onset before [u].
        // [u] and [w] are compatible in other positions (e.g. kwauwa), but
        // [w]+[u] and [kw]+[u] as onset+nucleus are blocked (e.g. *kwua, *wu).
        if (
            (syllable.onset === "w" || syllable.onset === "kw")
            && syllable.nucleus === "u"
        ) {
            return false;
        }
        if (form === "C" && i > 0) {
            const prev = syllables[i - 1];
            const allowWKCluster = prev
                && prev.form === "C"
                && prev.onset === "w"
                && syllable.onset === "k";
            if (!prev || (!isOpenSyllable(prev) && !allowWKCluster)) {
                return false;
            }
        }
    }
    if (syllables.length >= 2) {
        const last = syllables[syllables.length - 1];
        const prev = syllables[syllables.length - 2];
        const prevHasCoda = prev && (prev.coda === "l" || prev.coda === "j");
        if (prevHasCoda && last.form === "CV" && last.onset === "n") {
            return false;
        }
        if (prevHasCoda && last.form === "CV" && last.onset === "t" && last.nucleus === "a") {
            if (prev.coda === "l") {
                return false;
            }
        }
    }
    return true;
}

function isSyllableSequencePronounceable(rawVerb, options = {}) {
    return areSyllablesPronounceable(getSyllables(rawVerb, options));
}

function shouldCoalesceFinalI(base) {
    const letters = splitVerbLetters(base);
    if (letters.length < 2) {
        return false;
    }
    if (letters[letters.length - 1] !== "i") {
        return false;
    }
    return isVerbLetterVowel(letters[letters.length - 2]);
}

function getSimpleFinalYaHost(verb, options = {}) {
    if (!verb || !endsWithOpenSyllableSuffix(verb, "y", "a")) {
        return "";
    }
    if (options.isTransitive) {
        return "";
    }
    if (options.isYawi) {
        return "";
    }
    const nonRedupRoot = getNonReduplicatedRoot(verb);
    if (nonRedupRoot !== verb && nonRedupRoot === "ya") {
        const maxRedupLength = getVerbLetterCount("yajya");
        if (getVerbLetterCount(verb) <= maxRedupLength) {
            return "";
        }
    }
    if (getVerbLetterCount(verb) <= 2) {
        return "";
    }
    return verb.slice(0, -2) || "";
}

function getBareRootFromYaStem(stem = "") {
    if (!stem) {
        return "";
    }
    if (stem === "weya") {
        return getSuppletiveWeyaRootPlusYaBase() || stem.slice(0, -2);
    }
    let current = stem;
    let guard = 0;
    while (current.endsWith("ya") && getVerbLetterCount(current) > 2 && guard < 8) {
        current = current.slice(0, -2);
        guard += 1;
    }
    return current || "";
}

function analyzeYaHostFromRight(stem = "") {
    if (!stem || !stem.endsWith("ya") || getVerbLetterCount(stem) <= 2) {
        return {
            finalYaHostKind: "",
            bareRootPlusYaBase: "",
            bareRootPlusYaBasePronounceable: "",
        };
    }
    const bareRootPlusYaBase = getBareRootFromYaStem(stem);
    const bareRootPlusYaBasePronounceable = bareRootPlusYaBase
        && isSyllableSequencePronounceable(bareRootPlusYaBase)
        ? bareRootPlusYaBase
        : "";
    return {
        finalYaHostKind: "bare-root-ending-in-ya",
        bareRootPlusYaBase,
        bareRootPlusYaBasePronounceable,
    };
}

function analyzeFinalYaStructure(verb, options = {}) {
    const finalYaHost = getSimpleFinalYaHost(verb, options);
    if (!finalYaHost) {
        return {
            hasFinalYaSuffix: false,
            finalYaHost: "",
            finalYaHostKind: "",
            bareRootPlusYaBase: "",
            bareRootPlusYaBasePronounceable: "",
            isRootPlusYa: false,
        };
    }
    if (options.isWeya) {
        const bareRoot = getSuppletiveWeyaRootPlusYaBase() || "";
        const pronounceableBareRoot = bareRoot && isSyllableSequencePronounceable(bareRoot)
            ? bareRoot
            : "";
        if (options.requirePronounceable && !pronounceableBareRoot) {
            return {
                hasFinalYaSuffix: false,
                finalYaHost: "",
                finalYaHostKind: "",
                bareRootPlusYaBase: "",
                bareRootPlusYaBasePronounceable: "",
                isRootPlusYa: false,
            };
        }
        return {
            hasFinalYaSuffix: true,
            finalYaHost,
            finalYaHostKind: bareRoot ? "suppletive-bare-root" : "",
            bareRootPlusYaBase: bareRoot,
            bareRootPlusYaBasePronounceable: pronounceableBareRoot,
            isRootPlusYa: Boolean(bareRoot),
        };
    }
    let finalYaHostKind = "bare-root";
    let bareRootPlusYaBase = finalYaHost;
    let isRootPlusYa = true;
    if (finalYaHost.endsWith("ya") && getVerbLetterCount(finalYaHost) > 2) {
        const hostAnalysis = analyzeYaHostFromRight(finalYaHost);
        finalYaHostKind = hostAnalysis.finalYaHostKind || "bare-root-ending-in-ya";
        bareRootPlusYaBase = hostAnalysis.bareRootPlusYaBase || getBareRootFromYaStem(finalYaHost);
        isRootPlusYa = false;
    }
    const pronounceableBareRoot = bareRootPlusYaBase && isSyllableSequencePronounceable(bareRootPlusYaBase)
        ? bareRootPlusYaBase
        : "";
    if (options.requirePronounceable && isRootPlusYa && !pronounceableBareRoot) {
        return {
            hasFinalYaSuffix: false,
            finalYaHost: "",
            finalYaHostKind: "",
            bareRootPlusYaBase: "",
            bareRootPlusYaBasePronounceable: "",
            isRootPlusYa: false,
        };
    }
    return {
        hasFinalYaSuffix: true,
        finalYaHost,
        finalYaHostKind,
        bareRootPlusYaBase,
        bareRootPlusYaBasePronounceable: pronounceableBareRoot,
        isRootPlusYa,
    };
}

function resolveFinalYaImmediateHostBase(verb, options = {}) {
    const finalYaAnalysis = analyzeFinalYaStructure(verb, options);
    if (!finalYaAnalysis.hasFinalYaSuffix) {
        return "";
    }
    if (finalYaAnalysis.isRootPlusYa) {
        if (options.requirePronounceable) {
            return finalYaAnalysis.bareRootPlusYaBasePronounceable || "";
        }
        return finalYaAnalysis.bareRootPlusYaBase || "";
    }
    const host = finalYaAnalysis.finalYaHost || "";
    if (!host) {
        return "";
    }
    if (options.requirePronounceable && !isSyllableSequencePronounceable(host)) {
        return "";
    }
    return host;
}

function resolveFinalYaPerfectiveAlternateBase(verb, options = {}) {
    return resolveFinalYaImmediateHostBase(verb, {
        ...options,
        requirePronounceable: options.requirePronounceable !== false,
    });
}

function getRootPlusYaBase(verb, options = {}) {
    const finalYaAnalysis = analyzeFinalYaStructure(verb, options);
    if (!finalYaAnalysis.isRootPlusYa) {
        return null;
    }
    const base = finalYaAnalysis.bareRootPlusYaBase;
    if (!base) {
        return null;
    }
    if (options.requirePronounceable && !finalYaAnalysis.bareRootPlusYaBasePronounceable) {
        return null;
    }
    return base;
}

function shouldDropYaInRootPlusYaNonactive(source, options = {}) {
    if (!source || !source.endsWith("ya")) {
        return false;
    }
    const rootPlusYaBase = typeof options.rootPlusYaBase === "string"
        ? options.rootPlusYaBase
        : "";
    const rootBase = rootPlusYaBase || resolveFinalYaPerfectiveAlternateBase(source, {
        isTransitive: options.isTransitive === true,
        isYawi: options.isYawi === true,
        isWeya: options.isWeya === true,
        requirePronounceable: true,
    }) || "";
    if (!rootBase) {
        return false;
    }
    const rootSyllables = splitVerbSyllables(rootBase);
    const finalSyllable = rootSyllables[rootSyllables.length - 1];
    if (!isOpenSyllable(finalSyllable)) {
        return false;
    }
    return isSyllableSequencePronounceable(rootBase);
}
