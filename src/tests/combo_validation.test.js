"use strict";

/**
 * Tests for src/core/agreement/combo_validation.mjs
 * Covers: valence-combo signature/display/validation helpers.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("combo_validation");

    s.eq("getPers1Obj1Pers2Key joins pers1 obj1 pers2", ctx.getPers1Obj1Pers2Key("ni", "ki", ""), "ni|ki|");
    s.eq(
        "resolveComboValidationObj1 prefers person marker by derivation priority",
        ctx.resolveComboValidationObj1({
            obj1: "ta",
            obj2: "nech",
            derivationType: "applicative",
        }),
        "nech"
    );
    s.eq(
        "resolveComboValidationObj1 honors controller override",
        ctx.resolveComboValidationObj1({
            obj1: "ta",
            obj2: "nech",
            derivationType: "applicative",
            controllerObj1: "mu",
        }),
        "mu"
    );

    s.eq("collapseProjectiveForSignature maps empty to 0", ctx.collapseProjectiveForSignature(""), "0");
    s.eq("collapseProjectiveForSignature maps specific marker to ki", ctx.collapseProjectiveForSignature("tech"), "ki");
    s.eq("collapseSilentSpecificForSignature hides specific marker", ctx.collapseSilentSpecificForSignature("tech"), "0");
    s.eq("collapseSilentSpecificForDisplay hides specific marker", ctx.collapseSilentSpecificForDisplay("tech"), "");
    s.eq("collapseSilentSpecificForDisplay keeps non-specific marker", ctx.collapseSilentSpecificForDisplay("te"), "te");

    s.eq(
        "getObj1Obj2Obj3Signature collapses specific obj2 marker",
        ctx.getObj1Obj2Obj3Signature({
            obj1: "ki",
            obj2: "tech",
            obj3: "ta",
        }),
        "ki|0|ta"
    );
    s.ok(
        "isValidObj1Obj2Obj3Combo accepts canonical ki|mu|ta signature",
        ctx.isValidObj1Obj2Obj3Combo({
            obj1: "ki",
            obj2: "mu",
            obj3: "ta",
        })
    );
    s.ok(
        "isValidObj1Obj2Obj3Combo accepts collapsed specific obj2 marker",
        ctx.isValidObj1Obj2Obj3Combo({
            obj1: "ki",
            obj2: "tech",
            obj3: "ta",
        })
    );
    s.no(
        "isValidObj1Obj2Obj3Combo rejects impossible obj1+obj2+obj3 pattern",
        ctx.isValidObj1Obj2Obj3Combo({
            obj1: "ta",
            obj2: "mu",
            obj3: "te",
        })
    );

    return s;
}

module.exports = { run };
