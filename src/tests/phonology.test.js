"use strict";

/**
 * Tests for src/core/phonology/phonology.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("phonology");

    // splitVerbLetters — digraph recognition
    s.eq("splitVerbLetters: nemi", ctx.splitVerbLetters("nemi"), ["n","e","m","i"]);
    s.eq("splitVerbLetters: chichi digraphs", ctx.splitVerbLetters("chichi"), ["ch","i","ch","i"]);
    s.eq("splitVerbLetters: kisa", ctx.splitVerbLetters("kisa"), ["k","i","s","a"]);
    s.eq("splitVerbLetters: empty", ctx.splitVerbLetters(""), []);

    // getVerbLetterCount
    s.eq("getVerbLetterCount: nemi=4", ctx.getVerbLetterCount("nemi"), 4);
    s.eq("getVerbLetterCount: chichi=4 (digraphs)", ctx.getVerbLetterCount("chichi"), 4);

    // isVerbLetterVowel / isVerbLetterConsonant
    s.ok("isVerbLetterVowel: a", ctx.isVerbLetterVowel("a"));
    s.ok("isVerbLetterVowel: i", ctx.isVerbLetterVowel("i"));
    s.no("isVerbLetterVowel: n", ctx.isVerbLetterVowel("n"));
    s.no("isVerbLetterVowel: ch", ctx.isVerbLetterVowel("ch"));
    s.ok("isVerbLetterConsonant: n", ctx.isVerbLetterConsonant("n"));
    s.no("isVerbLetterConsonant: a", ctx.isVerbLetterConsonant("a"));
    s.no("isVerbLetterConsonant: empty", ctx.isVerbLetterConsonant(""));

    // getSyllables — CV structure
    const sylNemi = ctx.getSyllables("nemi");
    s.eq("getSyllables(nemi): 2 syllables", sylNemi.length, 2);
    s.eq("getSyllables(nemi): syl[0].form=CV", sylNemi[0].form, "CV");
    s.eq("getSyllables(nemi): syl[0].text=ne", sylNemi[0].text, "ne");
    s.eq("getSyllables(nemi): syl[1].text=mi", sylNemi[1].text, "mi");

    const sylKisa = ctx.getSyllables("kisa");
    s.eq("getSyllables(kisa): syl[0].onset=k", sylKisa[0].onset, "k");
    s.eq("getSyllables(kisa): syl[1].nucleus=a", sylKisa[1].nucleus, "a");

    s.eq(
        "applySyllableAnalysisTargetOptions: assume final vowel",
        ctx.applySyllableAnalysisTargetOptions("nem", { assumeFinalV: true }),
        "nema"
    );

    // isOpenSyllable
    s.ok("isOpenSyllable: CV", ctx.isOpenSyllable({ form: "CV" }));
    s.no("isOpenSyllable: CVC", ctx.isOpenSyllable({ form: "CVC" }));
    s.no("isOpenSyllable: VC", ctx.isOpenSyllable({ form: "VC" }));

    // getTrailingVowelCountFromSyllables
    s.eq("trailing vowels: nemi=1", ctx.getTrailingVowelCountFromSyllables(ctx.getSyllables("nemi")), 1);
    s.eq("trailing vowels: nem=0", ctx.getTrailingVowelCountFromSyllables(ctx.getSyllables("nem")), 0);

    // endsWithOpenSyllableSuffix
    s.ok("endsWithOpenSyllableSuffix: nemi/m/i", ctx.endsWithOpenSyllableSuffix("nemi", "m", "i"));
    s.ok("endsWithOpenSyllableSuffix: kisa/s/a", ctx.endsWithOpenSyllableSuffix("kisa", "s", "a"));
    s.no("endsWithOpenSyllableSuffix: nem/m/e", ctx.endsWithOpenSyllableSuffix("nem", "m", "e"));

    return s;
}

module.exports = { run };
