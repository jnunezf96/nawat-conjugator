"use strict";

/**
 * Tests for src/core/agreement/combo_validation.js
 * Covers: valence-combo signature/display/validation helpers.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("combo_validation");

    s.eq("getComboKey joins prefixes and suffix", ctx.getComboKey("ni", "ki", ""), "ni|ki|");
    s.eq(
        "resolveComboValidationObjectPrefix prefers person marker by derivation priority",
        ctx.resolveComboValidationObjectPrefix({
            objectPrefix: "ta",
            indirectObjectMarker: "nech",
            derivationType: "applicative",
        }),
        "nech"
    );
    s.eq(
        "resolveComboValidationObjectPrefix honors controller override",
        ctx.resolveComboValidationObjectPrefix({
            objectPrefix: "ta",
            indirectObjectMarker: "nech",
            derivationType: "applicative",
            controllerObjectMarker: "mu",
        }),
        "mu"
    );

    s.eq("collapseProjectiveForSignature maps empty to 0", ctx.collapseProjectiveForSignature(""), "0");
    s.eq("collapseProjectiveForSignature maps specific marker to ki", ctx.collapseProjectiveForSignature("tech"), "ki");
    s.eq("collapseSilentSpecificForSignature hides specific marker", ctx.collapseSilentSpecificForSignature("tech"), "0");
    s.eq("collapseSilentSpecificForDisplay hides specific marker", ctx.collapseSilentSpecificForDisplay("tech"), "");
    s.eq("collapseSilentSpecificForDisplay keeps non-specific marker", ctx.collapseSilentSpecificForDisplay("te"), "te");

    s.eq(
        "getValence4ComboSignature collapses specific indirect marker",
        ctx.getValence4ComboSignature({
            objectPrefix: "ki",
            indirectObjectMarker: "tech",
            thirdObjectMarker: "ta",
        }),
        "ki|0|ta"
    );
    s.ok(
        "isValidValence4Combo accepts canonical ki|mu|ta signature",
        ctx.isValidValence4Combo({
            objectPrefix: "ki",
            indirectObjectMarker: "mu",
            thirdObjectMarker: "ta",
        })
    );
    s.ok(
        "isValidValence4Combo accepts collapsed specific indirect marker",
        ctx.isValidValence4Combo({
            objectPrefix: "ki",
            indirectObjectMarker: "tech",
            thirdObjectMarker: "ta",
        })
    );
    s.no(
        "isValidValence4Combo rejects impossible direct+indirect+third pattern",
        ctx.isValidValence4Combo({
            objectPrefix: "ta",
            indirectObjectMarker: "mu",
            thirdObjectMarker: "te",
        })
    );

    return s;
}

module.exports = { run };
