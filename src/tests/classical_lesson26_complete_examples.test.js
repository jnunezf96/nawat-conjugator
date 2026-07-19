"use strict";

const path = require("path");
const { createSuite } = require("./runner");
const { CLASSICAL_NAHUATL_LESSON26_CANVAS_EXAMPLES } = require(path.resolve(__dirname, "..", "..", "scripts", "classical_lesson26_canvas_catalog.js"));

function buildSource(ctx, stem, verbClass, sourceValence) {
    return ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: sourceValence === "intransitive" ? "none" : "specific-projective",
        objectPerson: sourceValence === "intransitive" ? "" : "2sg",
    });
}

function getInventory(ctx, stem, verbClass, sourceValence, derivationType = "applicative") {
    return ctx.getClassicalNahuatlVncDerivationOptionInventory(buildSource(ctx, stem, verbClass, sourceValence), { derivationType });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson26_complete_examples");

    s.eq(
        "The evidence-only Lesson 26 catalog preserves all 161 Canvas rows without becoming grammar data",
        {
            total: CLASSICAL_NAHUATL_LESSON26_CANVAS_EXAMPLES.length,
            layers: Object.fromEntries(["stem", "transform", "later"].map(layer => [layer, CLASSICAL_NAHUATL_LESSON26_CANVAS_EXAMPLES.filter(example => example.layer === layer).length])),
            frozen: Object.isFrozen(CLASSICAL_NAHUATL_LESSON26_CANVAS_EXAMPLES) && CLASSICAL_NAHUATL_LESSON26_CANVAS_EXAMPLES.every(Object.isFrozen),
        },
        { total: 161, layers: { stem: 101, transform: 33, later: 27 }, frozen: true }
    );

    s.eq(
        "An unwitnessed typed source exposes user-selectable Type 1 alongside regular and exact Type 2 choices",
        (() => {
            const inventory = getInventory(ctx, "mati", "B", "specific-projective");
            return {
                canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                selectionRequired: inventory.selectionRequired,
                options: inventory.options.map(option => [option.derivationSubtype, option.targetStem, option.andrewsSection, option.lexicalChoiceRequired]),
            };
        })(),
        {
            canonical: true,
            selectionRequired: true,
            options: [
                ["type-two", "machi-liā", "26.4", false],
                ["type-one", "mat-iā", "26.2", true],
                ["type-two", "mati-liā", "26.4", false],
            ],
        }
    );

    s.eq(
        "Rare Type 3 remains a typed nonactive bridge and coexists with Type 1 and Type 2",
        (() => {
            const source = buildSource(ctx, "namaca", "A", "specific-projective");
            const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "applicative" });
            const typeThree = inventory.options.find(option => option.derivationSubtype === "type-three");
            const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "applicative",
                optionId: typeThree?.optionId,
                targetSubject: "3sg",
                applicativeObjectKind: "nonspecific-human",
            });
            const nonactive = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("namaca", { verbClass: "A", sourceValence: "specific-projective" });
            return {
                inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                targets: inventory.options.map(option => option.targetStem),
                typeThreeBridge: typeThree?.targetConstruction,
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                targetDepth: operation.targetObjectRequests?.length,
                nonactiveTargets: nonactive.options.map(option => option.nonactiveStem),
                selectorRequired: nonactive.selectorRequired,
            };
        })(),
        {
            inventoryCanonical: true,
            targets: ["namaqui-l-tiā", "namac-iā", "namaqui-liā"],
            typeThreeBridge: { operation: "typed-nonactive-bridge", nonactiveStem: "namaquī-lo", remove: "o", add: "tiā" },
            operationCanonical: true,
            targetDepth: 2,
            nonactiveTargets: ["namac-ō", "namaquī-lō"],
            selectorRequired: true,
        }
    );

    s.eq(
        "Lesson 26 identity, final-o-a analysis, and fused-tla defusion routes are executable choices",
        (() => {
            const itzi = getInventory(ctx, "itzi", "B", "intransitive");
            const xeloa = getInventory(ctx, "xel-o-ā", "C", "specific-projective");
            const defused = getInventory(ctx, "tla-hua-hua-l-o-ā", "C", "specific-projective");
            return {
                itzi: itzi.options.map(option => [option.derivationSubtype, option.targetStem]),
                xeloa: xeloa.options.map(option => option.targetStem),
                defused: defused.options.find(option => option.ruleId === "cn-l26-23-huahualoa-applicative-valence")?.targetStem,
                allCanonical: [itzi, xeloa, defused].every(inventory => ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory)),
            };
        })(),
        {
            itzi: [["irregular-applicative", "itt-a"], ["valence-neutral-applicative", "itzi"], ["type-two", "itzi-liā"]],
            xeloa: ["xel-huiā", "xel-a-l-huiā", "xel-i-l-huiā", "xel-o-l-huiā", "xel-o-liā"],
            defused: "hua-hua-l-o-ā",
            allCanonical: true,
        }
    );

    s.eq(
        "A caller cannot turn a Canvas target string into a canonical generated option",
        (() => {
            const inventory = getInventory(ctx, "mati", "B", "specific-projective");
            const forged = JSON.parse(JSON.stringify(inventory));
            forged.options[0].targetStem = "caller-forged-liā";
            forged.options[0].canonicalSignature = inventory.options[0].canonicalSignature;
            return {
                canonicalOriginal: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                canonicalForged: ctx.isClassicalNahuatlVncDerivationOptionInventory(forged),
                callerTargetsAllowed: inventory.options.some(option => option.callerSuppliedTargetAllowed !== false),
            };
        })(),
        { canonicalOriginal: true, canonicalForged: false, callerTargetsAllowed: false }
    );

    return s;
}

module.exports = { run };
