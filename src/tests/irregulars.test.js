"use strict";

/**
 * Tests for src/core/irregulars/irregulars.js
 * Covers: suppletive stem getters, dropFinalVowel, isIntransitiveOnlySuppletiveId.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("irregulars");

    // Yawi suppletive stem getters
    s.eq("getSuppletiveYawiCanonical", ctx.getSuppletiveYawiCanonical(), "yawi");
    s.eq("getSuppletiveYawiImperfective", ctx.getSuppletiveYawiImperfective(), "ya");
    s.eq("getSuppletiveYawiShort", ctx.getSuppletiveYawiShort(), "yaw");
    s.eq("getSuppletiveYawiYuVariant", ctx.getSuppletiveYawiYuVariant(), "yu");
    s.eq("getSuppletiveYawiCausativeActive", ctx.getSuppletiveYawiCausativeActive(), "wika");

    // Weya suppletive stem getter
    s.eq("getSuppletiveWeyaCanonical", ctx.getSuppletiveWeyaCanonical(), "weyya");

    // dropFinalVowel
    s.eq("dropFinalVowel: nemi→nem", ctx.dropFinalVowel("nemi"), "nem");
    s.eq("dropFinalVowel: kisa→kis", ctx.dropFinalVowel("kisa"), "kis");
    s.eq("dropFinalVowel: nem (consonant) unchanged", ctx.dropFinalVowel("nem"), "nem");
    s.eq("dropFinalVowel: empty", ctx.dropFinalVowel(""), "");

    // isIntransitiveOnlySuppletiveId — yawi, kati, witzi are all intransitive-only
    s.ok("isIntransitiveOnlySuppletiveId: yawi", ctx.isIntransitiveOnlySuppletiveId("yawi"));
    s.ok("isIntransitiveOnlySuppletiveId: kati", ctx.isIntransitiveOnlySuppletiveId("kati"));
    s.ok("isIntransitiveOnlySuppletiveId: witzi", ctx.isIntransitiveOnlySuppletiveId("witzi"));
    s.no("isIntransitiveOnlySuppletiveId: unknown id", ctx.isIntransitiveOnlySuppletiveId("unknown"));
    s.no("isIntransitiveOnlySuppletiveId: empty", ctx.isIntransitiveOnlySuppletiveId(""));

    return s;
}

module.exports = { run };
