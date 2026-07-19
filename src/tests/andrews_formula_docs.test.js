"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function readDoc(relativePath) {
    return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function readClassicalMachineryText() {
    const classicalDir = path.join(ROOT, "src", "core", "classical");
    return fs.readdirSync(classicalDir)
        .filter((file) => file.endsWith(".mjs"))
        .sort()
        .map((file) => fs.readFileSync(path.join(classicalDir, file), "utf8"))
        .join("\n");
}

function parseOccurrenceRows(text) {
    return text.split(/\r?\n/u)
        .map((line) => {
            const match = line.match(/^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*`(.*)`\s*\|$/u);
            return match ? {
                no: Number(match[1]),
                printedPage: match[2].trim(),
                pdfPage: Number(match[3]),
                line: Number(match[4]),
                kind: match[5],
                formula: match[6],
            } : null;
        })
        .filter(Boolean);
}

function parseAuditRows(text) {
    return text.split(/\r?\n/u)
        .map((line) => {
            const match = line.match(/^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|\s*`(.*)`\s*\|\s*`(.*)`\s*\|$/u);
            return match ? {
                occurrence: Number(match[1]),
                printedPage: match[2].trim(),
                pdfPage: Number(match[3]),
                line: Number(match[4]),
                risk: match[5],
                status: match[6],
                formula: match[7],
                ocrFormula: match[8],
            } : null;
        })
        .filter(Boolean);
}

function hasAll(text, snippets) {
    return snippets.every((snippet) => text.includes(snippet));
}

function run(ctx = {}) {
    const s = createSuite("andrews_formula_docs");
    const inventory = readDoc("docs/ANDREWS_FORMULA_INVENTORY.md");
    const conversionNotes = readDoc("docs/NAHUATL_TO_NAWAT_LETTER_CONVERSION_NOTES.md");
    const occurrencesText = readDoc("docs/ANDREWS_FORMULA_OCCURRENCES.md");
    const auditText = readDoc("docs/ANDREWS_FORMULA_VISUAL_AUDIT.md");
    const classicalRuleTags = JSON.parse(readDoc("docs/CLASSICAL_TRANSCRIPTION_RULE_TAGS.json"));
    const classicalMachineryText = readClassicalMachineryText();
    const transcriptionCanvasLines = readDoc("ANDREWS_TRANSCRIPTION_CANVAS.md").split(/\r?\n/u);
    const occurrences = parseOccurrenceRows(occurrencesText);
    const audits = parseAuditRows(auditText);
    const auditByOccurrence = new Map(audits.map((row) => [row.occurrence, row]));
    const fragmentRows = occurrences.filter((row) => row.kind === "hash-fragment");
    const correctedAuditRows = audits.filter((row) => row.status === "corrected");
    const retainedAuditRows = audits.filter((row) => row.status === "visual-retained");

    s.eq(
        "formula occurrence and visual-audit docs stay internally aligned",
        {
            occurrenceRows: occurrences.length,
            firstNo: occurrences[0]?.no,
            lastNo: occurrences[occurrences.length - 1]?.no,
            auditRows: audits.length,
            correctedRows: correctedAuditRows.length,
            retainedRows: retainedAuditRows.length,
            fragmentRows: fragmentRows.length,
            unauditedFragments: fragmentRows
                .filter((row) => !auditByOccurrence.has(row.no))
                .map((row) => row.no),
            lineBreakCorrections: audits
                .filter((row) => row.risk.includes("line-break"))
                .length,
        },
        {
            occurrenceRows: 2612,
            firstNo: 1,
            lastNo: 2612,
            auditRows: 1159,
            correctedRows: 485,
            retainedRows: 674,
            fragmentRows: 12,
            unauditedFragments: [],
            lineBreakCorrections: 79,
        }
    );

    s.eq(
        "Classical transcription rule tag ledger covers implemented Classical lesson slices and marks unfinished rule slices",
        (() => {
            const items = Array.isArray(classicalRuleTags.items) ? classicalRuleTags.items : [];
            const byId = new Map(items.map((item) => [item.tagId, item]));
            const unfinished = items
                .filter((item) => item.ruleLogicTag?.status !== "logic-tested")
                .map((item) => item.tagId);
            const lesson2Unfinished = items
                .filter((item) => item.lesson === 2 && item.ruleLogicTag?.status !== "logic-tested")
                .map((item) => item.tagId);
            const lesson3Unfinished = items
                .filter((item) => item.lesson === 3 && item.ruleLogicTag?.status !== "logic-tested")
                .map((item) => item.tagId);
            const missingMachineryTagIds = items
                .filter((item) => !classicalMachineryText.includes(item.tagId))
                .map((item) => item.tagId);
            const legalWitnessFailures = items
                .filter((item) => {
                    const tag = item.transcriptionTag || {};
                    if (
                        !Number.isInteger(tag.transcriptionLineStart)
                        || !Number.isInteger(tag.transcriptionLineEnd)
                        || tag.transcriptionLineStart < 1
                        || tag.transcriptionLineEnd < tag.transcriptionLineStart
                        || typeof tag.exactWitness !== "string"
                        || !tag.exactWitness.trim()
                    ) {
                        return true;
                    }
                    const transcriptionSpan = transcriptionCanvasLines
                        .slice(tag.transcriptionLineStart - 1, tag.transcriptionLineEnd)
                        .join("\n");
                    return !transcriptionSpan.includes(tag.exactWitness);
                })
                .map((item) => item.tagId);
            return {
                schemaVersion: classicalRuleTags.schemaVersion,
                sourceAuthority: classicalRuleTags.sourceAuthority,
                sourceDocument: classicalRuleTags.sourceDocument,
                lessons: Array.from(new Set(items.map((item) => item.lesson))).sort((a, b) => a - b),
                hasQueryHandle: Boolean(classicalRuleTags.queryHandles?.taggedButNotLogiqued),
                allHaveTranscriptionAndLogicTags: items.every((item) => (
                    item.tagId
                    && item.transcriptionTag?.status === "tagged"
                    && item.ruleLogicTag?.status
                )),
                legalWitnessPolicyAuthority: classicalRuleTags.legalWitnessPolicy?.authority || "",
                legalWitnessRequiredFields: classicalRuleTags.legalWitnessPolicy?.requiredFields || [],
                allTranscriptionTagsPointToCanvas: items.every((item) => (
                    item.transcriptionTag?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
                )),
                legalWitnessFailures,
                missingMachineryTagIds,
                requiredTagStatuses: {
                    lesson2Proof: byId.get("cn-l2-profile-firewall")?.ruleLogicTag?.status || "",
                    lesson2GraphemeInventory: byId.get("cn-l2-grapheme-inventory")?.ruleLogicTag?.status || "",
                    lesson2BoundaryMarks: byId.get("cn-l2-boundary-marks")?.ruleLogicTag?.status || "",
                    lesson3Separation: byId.get("cn-l3-particle-separation")?.ruleLogicTag?.status || "",
                    lesson4Chain: byId.get("cn-l4-prior-lesson-proof-chain")?.ruleLogicTag?.status || "",
                    lesson4Stage1: byId.get("cn-l4-nuclear-clause-stage1")?.ruleLogicTag?.status || "",
                    lesson4Selection: byId.get("cn-l4-vnc-nnc-selection")?.ruleLogicTag?.status || "",
                    lesson4PredicateBoundary: byId.get("cn-l4-predicate-boundary")?.ruleLogicTag?.status || "",
                    lesson5SquareZero: byId.get("cn-l5-square-zero-future-singular")?.ruleLogicTag?.status || "",
                    lesson2SpellingChanges: byId.get("cn-l2-spelling-changes")?.ruleLogicTag?.status || "",
                    lesson2OpenTransition: byId.get("cn-l2-open-transition")?.ruleLogicTag?.status || "",
                    lesson2SyllableStructure: byId.get("cn-l2-syllable-structure")?.ruleLogicTag?.status || "",
                    lesson2VocableStress: byId.get("cn-l2-vocable-stress")?.ruleLogicTag?.status || "",
                    lesson2ConsonantalLength: byId.get("cn-l2-consonantal-length")?.ruleLogicTag?.status || "",
                    lesson2Assimilation: byId.get("cn-l2-assimilation")?.ruleLogicTag?.status || "",
                    lesson2ConsonantLoss: byId.get("cn-l2-consonant-loss")?.ruleLogicTag?.status || "",
                    lesson2ConsonantPhoneShift: byId.get("cn-l2-consonant-phone-shift")?.ruleLogicTag?.status || "",
                    lesson2VowelElision: byId.get("cn-l2-vowel-elision")?.ruleLogicTag?.status || "",
                    lesson2LongVowelGlottal: byId.get("cn-l2-long-vowel-glottal-stop")?.ruleLogicTag?.status || "",
                    lesson2ProsodicContours: byId.get("cn-l2-prosodic-contours")?.ruleLogicTag?.status || "",
                    lesson3FunctionalClasses: byId.get("cn-l3-functional-classes")?.ruleLogicTag?.status || "",
                    lesson3NegativizingParticles: byId.get("cn-l3-negativizing-particles")?.ruleLogicTag?.status || "",
                    lesson3ParticleCollocations: byId.get("cn-l3-particle-collocations")?.ruleLogicTag?.status || "",
                    lesson3HonorificizedParticles: byId.get("cn-l3-honorificized-particles")?.ruleLogicTag?.status || "",
                    lesson4PersonalPronouns: byId.get("cn-l4-personal-pronouns")?.ruleLogicTag?.status || "",
                    lesson6TransitiveVnc: byId.get("cn-l6-transitive-vnc-formulas")?.ruleLogicTag?.status || "",
                    lesson6ObjectCategories: byId.get("cn-l6-object-pronoun-categories")?.ruleLogicTag?.status || "",
                    lesson6MonadicValence: byId.get("cn-l6-monadic-valence-position")?.ruleLogicTag?.status || "",
                    lesson6DyadicValence: byId.get("cn-l6-dyadic-valence-position")?.ruleLogicTag?.status || "",
                    lesson6ProjectiveFillers: byId.get("cn-l6-projective-object-fillers")?.ruleLogicTag?.status || "",
                    lesson6ReflexiveFillers: byId.get("cn-l6-mainline-reflexive-fillers")?.ruleLogicTag?.status || "",
                    lesson7VerbstemStructure: byId.get("cn-l7-verbstem-structure")?.ruleLogicTag?.status || "",
                    lesson7CitationForm: byId.get("cn-l7-citation-form")?.ruleLogicTag?.status || "",
                    lesson7VerbstemClasses: byId.get("cn-l7-verbstem-classes")?.ruleLogicTag?.status || "",
                    lesson7ClassBChanges: byId.get("cn-l7-class-b-perfective-changes")?.ruleLogicTag?.status || "",
                    lesson7ClassGuidelines: byId.get("cn-l7-class-guidelines")?.ruleLogicTag?.status || "",
                    lesson7PredicateFormation: byId.get("cn-l7-core-tense-predicate-formation")?.ruleLogicTag?.status || "",
                    lesson7Analysis: byId.get("cn-l7-analysis-translation")?.ruleLogicTag?.status || "",
                    lesson7TlaFusion: byId.get("cn-l7-tla-fusion")?.ruleLogicTag?.status || "",
                    lesson8ExpandedVncBoundary: byId.get("cn-l8-81-expanded-vnc-boundary")?.ruleLogicTag?.status || "",
                    lesson8SentenceSurface: byId.get("cn-l8-82-86-sentence-surface")?.ruleLogicTag?.status || "",
                    lesson9WishCommandSentenceLayer: byId.get("cn-l9-95-99-optative-wish-command-sentence-layer")?.ruleLogicTag?.status || "",
                    lesson10AdmonitiveSentenceLayer: byId.get("cn-l10-101-105-admonitive-sentence-layer")?.ruleLogicTag?.status || "",
                    lesson11IrregularParadigm: byId.get("cn-l11-irregular-vnc-paradigm")?.ruleLogicTag?.status || "",
                    lesson11OptionalIrregular: byId.get("cn-l11-optional-irregular-ti-perfective")?.ruleLogicTag?.status || "",
                    lesson12AbsolutiveNnc: byId.get("cn-l12-absolutive-nnc")?.ruleLogicTag?.status || "",
                    lesson13PossessiveNnc: byId.get("cn-l13-possessive-nnc")?.ruleLogicTag?.status || "",
                    lesson14NounstemClasses: byId.get("cn-l14-nounstem-classes")?.ruleLogicTag?.status || "",
                    lesson15HigherNnc: byId.get("cn-l15-further-nnc-conditions")?.ruleLogicTag?.status || "",
                    lesson16PronominalNnc: byId.get("cn-l16-pronominal-nncs")?.ruleLogicTag?.status || "",
                    lesson20NonactiveStem: byId.get("cn-l20-nonactive-stem")?.ruleLogicTag?.status || "",
                    lesson21PassiveSpecificObject: byId.get("cn-l21-passive-specific-object")?.ruleLogicTag?.status || "",
                    lesson22ImpersonalComplement: byId.get("cn-l22-impersonal-complement")?.ruleLogicTag?.status || "",
                    lesson24TypeOneCausative: byId.get("cn-l24-type-one-causative-a")?.ruleLogicTag?.status || "",
                    lesson25TypeTwoCausative: byId.get("cn-l25-type-two-causative-typed-nonactive-base")?.ruleLogicTag?.status || "",
                    lesson26ApplicativeImportedObject: byId.get("cn-l26-applicative-imported-object-transform")?.ruleLogicTag?.status || "",
                },
                lesson2SpellingChangeSubrules: (
                    byId.get("cn-l2-spelling-changes")?.ruleLogicTag?.subrules || []
                ).map((subrule) => {
                    const hasRange = Number.isInteger(subrule.transcriptionLineStart)
                        && Number.isInteger(subrule.transcriptionLineEnd)
                        && subrule.transcriptionLineEnd >= subrule.transcriptionLineStart
                        && Boolean(subrule.exactWitness);
                    const transcriptionSpan = hasRange
                        ? transcriptionCanvasLines
                            .slice(subrule.transcriptionLineStart - 1, subrule.transcriptionLineEnd)
                            .join("\n")
                        : "";
                    return {
                        id: subrule.id,
                        status: subrule.status,
                        hasLegalWitness: hasRange && transcriptionSpan.includes(subrule.exactWitness),
                    };
                }),
                lesson2OpenTransitionSubrules: (
                    byId.get("cn-l2-open-transition")?.ruleLogicTag?.subrules || []
                ).map((subrule) => {
                    const hasRange = Number.isInteger(subrule.transcriptionLineStart)
                        && Number.isInteger(subrule.transcriptionLineEnd)
                        && subrule.transcriptionLineEnd >= subrule.transcriptionLineStart
                        && Boolean(subrule.exactWitness);
                    const transcriptionSpan = hasRange
                        ? transcriptionCanvasLines
                            .slice(subrule.transcriptionLineStart - 1, subrule.transcriptionLineEnd)
                            .join("\n")
                        : "";
                    return {
                        id: subrule.id,
                        status: subrule.status,
                        hasLegalWitness: hasRange && transcriptionSpan.includes(subrule.exactWitness),
                    };
                }),
                lesson2SyllableStructureSubrules: (
                    byId.get("cn-l2-syllable-structure")?.ruleLogicTag?.subrules || []
                ).map((subrule) => {
                    const hasRange = Number.isInteger(subrule.transcriptionLineStart)
                        && Number.isInteger(subrule.transcriptionLineEnd)
                        && subrule.transcriptionLineEnd >= subrule.transcriptionLineStart
                        && Boolean(subrule.exactWitness);
                    const transcriptionSpan = hasRange
                        ? transcriptionCanvasLines
                            .slice(subrule.transcriptionLineStart - 1, subrule.transcriptionLineEnd)
                            .join("\n")
                        : "";
                    return {
                        id: subrule.id,
                        status: subrule.status,
                        hasLegalWitness: hasRange && transcriptionSpan.includes(subrule.exactWitness),
                    };
                }),
                lesson2StressSubrules: (
                    byId.get("cn-l2-vocable-stress")?.ruleLogicTag?.subrules || []
                ).map((subrule) => {
                    const hasRange = Number.isInteger(subrule.transcriptionLineStart)
                        && Number.isInteger(subrule.transcriptionLineEnd)
                        && subrule.transcriptionLineEnd >= subrule.transcriptionLineStart
                        && Boolean(subrule.exactWitness);
                    const transcriptionSpan = hasRange
                        ? transcriptionCanvasLines
                            .slice(subrule.transcriptionLineStart - 1, subrule.transcriptionLineEnd)
                            .join("\n")
                        : "";
                    return {
                        id: subrule.id,
                        status: subrule.status,
                        hasLegalWitness: hasRange && transcriptionSpan.includes(subrule.exactWitness),
                    };
                }),
                lesson2ConsonantalLengthSubrules: (
                    byId.get("cn-l2-consonantal-length")?.ruleLogicTag?.subrules || []
                ).map((subrule) => {
                    const hasRange = Number.isInteger(subrule.transcriptionLineStart)
                        && Number.isInteger(subrule.transcriptionLineEnd)
                        && subrule.transcriptionLineEnd >= subrule.transcriptionLineStart
                        && Boolean(subrule.exactWitness);
                    const transcriptionSpan = hasRange
                        ? transcriptionCanvasLines
                            .slice(subrule.transcriptionLineStart - 1, subrule.transcriptionLineEnd)
                            .join("\n")
                        : "";
                    return {
                        id: subrule.id,
                        status: subrule.status,
                        hasLegalWitness: hasRange && transcriptionSpan.includes(subrule.exactWitness),
                    };
                }),
                lesson2AssimilationSubrules: (
                    byId.get("cn-l2-assimilation")?.ruleLogicTag?.subrules || []
                ).map((subrule) => {
                    const hasRange = Number.isInteger(subrule.transcriptionLineStart)
                        && Number.isInteger(subrule.transcriptionLineEnd)
                        && subrule.transcriptionLineEnd >= subrule.transcriptionLineStart
                        && Boolean(subrule.exactWitness);
                    const transcriptionSpan = hasRange
                        ? transcriptionCanvasLines
                            .slice(subrule.transcriptionLineStart - 1, subrule.transcriptionLineEnd)
                            .join("\n")
                        : "";
                    return {
                        id: subrule.id,
                        status: subrule.status,
                        hasLegalWitness: hasRange && transcriptionSpan.includes(subrule.exactWitness),
                    };
                }),
                lesson2ConsonantLossSubrules: (
                    byId.get("cn-l2-consonant-loss")?.ruleLogicTag?.subrules || []
                ).map((subrule) => {
                    const hasRange = Number.isInteger(subrule.transcriptionLineStart)
                        && Number.isInteger(subrule.transcriptionLineEnd)
                        && subrule.transcriptionLineEnd >= subrule.transcriptionLineStart
                        && Boolean(subrule.exactWitness);
                    const transcriptionSpan = hasRange
                        ? transcriptionCanvasLines
                            .slice(subrule.transcriptionLineStart - 1, subrule.transcriptionLineEnd)
                            .join("\n")
                        : "";
                    return {
                        id: subrule.id,
                        status: subrule.status,
                        hasLegalWitness: hasRange && transcriptionSpan.includes(subrule.exactWitness),
                    };
                }),
                lesson2ConsonantPhoneShiftSubrules: (
                    byId.get("cn-l2-consonant-phone-shift")?.ruleLogicTag?.subrules || []
                ).map((subrule) => {
                    const hasRange = Number.isInteger(subrule.transcriptionLineStart)
                        && Number.isInteger(subrule.transcriptionLineEnd)
                        && subrule.transcriptionLineEnd >= subrule.transcriptionLineStart
                        && Boolean(subrule.exactWitness);
                    const transcriptionSpan = hasRange
                        ? transcriptionCanvasLines
                            .slice(subrule.transcriptionLineStart - 1, subrule.transcriptionLineEnd)
                            .join("\n")
                        : "";
                    return {
                        id: subrule.id,
                        status: subrule.status,
                        hasLegalWitness: hasRange && transcriptionSpan.includes(subrule.exactWitness),
                    };
                }),
                lesson2VowelElisionSubrules: (
                    byId.get("cn-l2-vowel-elision")?.ruleLogicTag?.subrules || []
                ).map((subrule) => {
                    const hasRange = Number.isInteger(subrule.transcriptionLineStart)
                        && Number.isInteger(subrule.transcriptionLineEnd)
                        && subrule.transcriptionLineEnd >= subrule.transcriptionLineStart
                        && Boolean(subrule.exactWitness);
                    const transcriptionSpan = hasRange
                        ? transcriptionCanvasLines
                            .slice(subrule.transcriptionLineStart - 1, subrule.transcriptionLineEnd)
                            .join("\n")
                        : "";
                    return {
                        id: subrule.id,
                        status: subrule.status,
                        hasLegalWitness: hasRange && transcriptionSpan.includes(subrule.exactWitness),
                    };
                }),
                lesson2LongVowelGlottalSubrules: (
                    byId.get("cn-l2-long-vowel-glottal-stop")?.ruleLogicTag?.subrules || []
                ).map((subrule) => {
                    const hasRange = Number.isInteger(subrule.transcriptionLineStart)
                        && Number.isInteger(subrule.transcriptionLineEnd)
                        && subrule.transcriptionLineEnd >= subrule.transcriptionLineStart
                        && Boolean(subrule.exactWitness);
                    const transcriptionSpan = hasRange
                        ? transcriptionCanvasLines
                            .slice(subrule.transcriptionLineStart - 1, subrule.transcriptionLineEnd)
                            .join("\n")
                        : "";
                    return {
                        id: subrule.id,
                        status: subrule.status,
                        hasLegalWitness: hasRange && transcriptionSpan.includes(subrule.exactWitness),
                    };
                }),
                lesson2ProsodicContourSubrules: (
                    byId.get("cn-l2-prosodic-contours")?.ruleLogicTag?.subrules || []
                ).map((subrule) => {
                    const hasRange = Number.isInteger(subrule.transcriptionLineStart)
                        && Number.isInteger(subrule.transcriptionLineEnd)
                        && subrule.transcriptionLineEnd >= subrule.transcriptionLineStart
                        && Boolean(subrule.exactWitness);
                    const transcriptionSpan = hasRange
                        ? transcriptionCanvasLines
                            .slice(subrule.transcriptionLineStart - 1, subrule.transcriptionLineEnd)
                            .join("\n")
                        : "";
                    return {
                        id: subrule.id,
                        status: subrule.status,
                        hasLegalWitness: hasRange && transcriptionSpan.includes(subrule.exactWitness),
                    };
                }),
                lesson3StaysParticleAuthority: (
                    byId.get("cn-l3-particle-inventory")?.ruleLogicTag?.notes?.includes("particle authority, not nuclear-clause authority")
                    && byId.get("cn-l3-particle-separation")?.ruleLogicTag?.notes?.includes("does not make Lesson 3 a nuclear-clause authority")
                    && byId.get("cn-l3-negativizing-particles")?.ruleLogicTag?.notes?.includes("no sentence/clause negation generation")
                    && byId.get("cn-l3-particle-collocations")?.ruleLogicTag?.notes?.includes("no compound or nuclear-clause generation")
                    && byId.get("cn-l3-honorificized-particles")?.ruleLogicTag?.notes?.includes("no honorific nuclear-clause operation")
                ),
                lesson3Unfinished,
                unfinishedStillTracked: unfinished.length > 0,
                lesson2Unfinished,
            };
        })(),
        {
            schemaVersion: 1,
            sourceAuthority: "Andrews transcription",
            sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
            lessons: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26],
            hasQueryHandle: true,
            allHaveTranscriptionAndLogicTags: true,
            legalWitnessPolicyAuthority: "Transcription line ranges are the legal deed. Digest anchors are navigation aids only.",
            legalWitnessRequiredFields: ["transcriptionLineStart", "transcriptionLineEnd", "exactWitness"],
            allTranscriptionTagsPointToCanvas: true,
            legalWitnessFailures: [],
            missingMachineryTagIds: [],
            requiredTagStatuses: {
                lesson2Proof: "logic-tested",
                lesson2GraphemeInventory: "logic-tested",
                lesson2BoundaryMarks: "logic-tested",
                lesson3Separation: "logic-tested",
                lesson4Chain: "logic-tested",
                lesson4Stage1: "logic-tested",
                lesson4Selection: "logic-tested",
                lesson4PredicateBoundary: "logic-tested",
                lesson5SquareZero: "logic-tested",
                lesson2SpellingChanges: "logic-tested",
                lesson2OpenTransition: "logic-tested",
                lesson2SyllableStructure: "logic-tested",
                lesson2VocableStress: "logic-tested",
                lesson2ConsonantalLength: "logic-tested",
                lesson2Assimilation: "logic-tested",
                lesson2ConsonantLoss: "logic-tested",
                lesson2ConsonantPhoneShift: "logic-tested",
                lesson2VowelElision: "logic-tested",
                lesson2LongVowelGlottal: "logic-tested",
                lesson2ProsodicContours: "logic-tested",
                lesson3FunctionalClasses: "logic-tested",
                lesson3NegativizingParticles: "logic-tested",
                lesson3ParticleCollocations: "logic-tested",
                lesson3HonorificizedParticles: "logic-tested",
                lesson4PersonalPronouns: "logic-tested",
                lesson6TransitiveVnc: "logic-tested",
                lesson6ObjectCategories: "logic-tested",
                lesson6MonadicValence: "logic-tested",
                lesson6DyadicValence: "logic-tested",
                lesson6ProjectiveFillers: "logic-tested",
                lesson6ReflexiveFillers: "logic-tested",
                lesson7VerbstemStructure: "logic-tested",
                lesson7CitationForm: "logic-tested",
                lesson7VerbstemClasses: "logic-tested",
                lesson7ClassBChanges: "logic-tested",
                lesson7ClassGuidelines: "logic-tested",
                lesson7PredicateFormation: "logic-tested",
                lesson7Analysis: "logic-tested",
                lesson7TlaFusion: "logic-tested",
                lesson8ExpandedVncBoundary: "logic-tested",
                lesson8SentenceSurface: "logic-tested",
                lesson9WishCommandSentenceLayer: "logic-tested",
                lesson10AdmonitiveSentenceLayer: "logic-tested",
                lesson11IrregularParadigm: "logic-tested",
                lesson11OptionalIrregular: "logic-tested",
                lesson12AbsolutiveNnc: "logic-tested",
                lesson13PossessiveNnc: "logic-tested",
                lesson14NounstemClasses: "logic-tested",
                lesson15HigherNnc: "logic-tested",
                lesson16PronominalNnc: "logic-tested",
                lesson20NonactiveStem: "logic-tested",
                lesson21PassiveSpecificObject: "logic-tested",
                lesson22ImpersonalComplement: "logic-tested",
                lesson24TypeOneCausative: "logic-tested",
                lesson25TypeTwoCausative: "logic-tested",
                lesson26ApplicativeImportedObject: "logic-tested",
            },
            lesson2SpellingChangeSubrules: [
                {
                    id: "cn-l2-spelling-changes-k-s-environment",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-spelling-changes-w-kw-syllable-final",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
            ],
            lesson2OpenTransitionSubrules: [
                {
                    id: "cn-l2-25-compound-boundary-open-transition",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-25-supportive-i-kept",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-25-stem-final-w-vocable-final",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-25-stem-final-k-before-e-i-qu",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-25-stem-final-kw-before-vowel-cu",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-25-stem-final-w-before-vowel-hu-variant",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
            ],
            lesson2SyllableStructureSubrules: [
                {
                    id: "cn-l2-26-vowel-count-no-diphthongs",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-26-four-syllable-shapes",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-26-intervocalic-consonant-onset",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-26-vowel-sequence-separated",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-26-u-is-digraph-only",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-26-two-consonant-cluster-split",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-26-digraphs-single-consonant",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-26-supportive-i-illegal-sequence",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-26-phonological-not-morphological",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
            ],
            lesson2StressSubrules: [
                {
                    id: "cn-l2-27-penultimate-vocable-stress",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-27-final-short-vowel-contrast",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-27-vocative-particle-exception",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-27-stress-group-connected-speech",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
            ],
            lesson2ConsonantalLengthSubrules: [
                {
                    id: "cn-l2-28-identical-consonants-create-long-consonant",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-28-single-bridging-pronunciation",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-28-affricate-release-feature-loss",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-28-within-vocable-double-spelling",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-28-traditional-text-spelling-warning",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
            ],
            lesson2AssimilationSubrules: [
                {
                    id: "cn-l2-29-grammatical-unlike-consonants",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-29-progressive-vs-regressive",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-210-progressive-l-tl-ll",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-210-progressive-l-y-ll",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-210-progressive-s-y-ss",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-210-progressive-x-y-xx",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-210-progressive-tz-y-tztz",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-210-progressive-ch-y-chch",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-210-progressive-assimilation-boundary-realization",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-210-ll-only-listed",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-211-regressive-nasal-sibilant",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-211-regressive-sibilant-group",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-211-regressive-w-bilabial",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-211-regressive-m-n-nn",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-211-regressive-m-partial",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-211-regressive-n-m-mm",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-211-regressive-n-p-mp",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-211-low-frequency-ch-p-pp",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-211-regressive-dissimilation-kk-hk",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
            ],
            lesson2ConsonantLossSubrules: [
                {
                    id: "cn-l2-212-loss-general",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-212-tz-w-tz",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-212-ch-w-ch",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-212-glottal-y-h",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-212-glottal-y-y",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-212-glottal-y-y-reduplication-block",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-212-initial-y-unstable-note",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-212-y-between-long-a-o-vowels",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-212-nasal-y-y",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-212-nasal-w-w",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-212-w-w-w",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
            ],
            lesson2ConsonantPhoneShiftSubrules: [
                {
                    id: "cn-l2-213-phone-shift-general",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-213-glottal-vowel-y",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-213-intervocalic-y-disappears",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-213-m-exposed-n",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-213-y-exposed-x",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-213-y-exposed-prior-s",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-213-kw-exposed-k",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-213-t-final-h",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-213-rare-glottal-nonfinal-t",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
            ],
            lesson2VowelElisionSubrules: [
                {
                    id: "cn-l2-214-short-vowel-stress-group-elision",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-214-long-vowel-resists-elision",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-214-listed-stress-group-examples",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-214-spelling-change-required",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-214-supportive-i-not-proper-elision",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
            ],
            lesson2LongVowelGlottalSubrules: [
                {
                    id: "cn-l2-215-irregular-short-vowel-glottal-morph",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-215-small-number-of-morphemes",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-215-embed-subposition-required",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-215-matrix-determines-choice",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-215-listed-examples",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
            ],
            lesson2ProsodicContourSubrules: [
                {
                    id: "cn-l2-216-sentences-had-prosodic-contours",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-216-known-stress-rules",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-216-long-final-vowel-low-pitch",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
                {
                    id: "cn-l2-216-sentential-prosody-unknown",
                    status: "logic-tested",
                    hasLegalWitness: true,
                },
            ],
            lesson3StaysParticleAuthority: true,
            lesson3Unfinished: [],
            unfinishedStillTracked: false,
            lesson2Unfinished: [],
        }
    );

    s.eq(
        "Andrews tense slot inventory matches runtime VNC tense frames",
        {
            inventoryHasTenseTable: hasAll(inventory, [
                "| VNC, dyadic transitive | `#pers1-pers2+va1-va2(STEM)tns+num1-num2#`",
                "| VNC, monadic transitive | `#pers1-pers2+va(STEM)tns+num1-num2#`",
                "| VNC, intransitive | `#pers1-pers2(STEM)tns+num1-num2#`",
                "| NNC, absolutive state | `#pers1-pers2(STEM)num1-num2#`",
                "Engine rule: the final dyad is a subject-number connector. It is not a nounstem suffix and does not create an NNC tense slot.",
                "| Indicative | present | `0` |",
                "| Indicative | customary present | `ni` |",
                "| Indicative | imperfect | `ya ~ ya` |",
                "| Indicative | future | `z` |",
                "| Indicative | preterit | `0` |",
                "| Indicative | distant past | `ca ~ ca` |",
                "| Optative | nonpast | `0` |",
                "| Optative | past | `ni` |",
                "| Admonitive | nonpast | `h` for Class A; `0` for other classes |",
            ]),
            frame: ctx.getVncLesson5TenseMorphFrame().andrewsMoodTenseInventory,
            profiles: Object.fromEntries(
                ["presente", "presente-habitual", "imperfecto", "futuro", "preterito", "pasado-remoto", "optativo"]
                    .map((tense) => {
                        const profile = ctx.getLesson5VncTenseProfile(tense);
                        return [tense, {
                            morph: profile?.morph,
                            mood: profile?.mood,
                            tense: profile?.tense,
                            connector: profile?.andrewsConnectorPattern,
                        }];
                    })
            ),
            predicateNominalSourceTenses: ctx.getPredicateNominalSourceTenses(),
            nawatFiniteExtensionsKeptOutOfPredicateNominalSources: [
                "presente-desiderativo",
                "perfecto",
                "pluscuamperfecto",
                "condicional-perfecto",
                "condicional",
            ].filter((tense) => !ctx.getPredicateNominalSourceTenses().includes(tense)),
            ordinaryNncHasTensePosition: ctx.getAndrewsFormulaSlotSchema("ordinary-nnc-shell").hasTensePosition,
            vncHasTensePosition: ctx.getAndrewsFormulaSlotSchema("vnc-shell").hasTensePosition,
        },
        {
            inventoryHasTenseTable: true,
            frame: {
                indicative: {
                    imperfectiveStem: ["present", "customary-present", "imperfect", "future"],
                    perfectiveStem: ["preterit", "distant-past"],
                },
                optative: {
                    imperfectiveStem: ["nonpast", "past"],
                },
                admonitive: {
                    perfectiveStem: ["nonpast"],
                },
            },
            profiles: {
                presente: { morph: "\u00d8", mood: "indicative", tense: "present", connector: "0 + 0/h" },
                "presente-habitual": { morph: "ni", mood: "indicative", tense: "customary-present", connector: "0 + 0/h" },
                imperfecto: { morph: "ya", mood: "indicative", tense: "imperfect", connector: "0 + 0/h" },
                futuro: { morph: "s", mood: "indicative", tense: "future", connector: "c/qu/qui~0 + 0/eh" },
                preterito: { morph: "\u00d8", mood: "indicative", tense: "preterit", connector: "c/qu/qui~0 + 0/eh" },
                "pasado-remoto": { morph: "ka", mood: "indicative", tense: "distant-past", connector: "0 + 0/h" },
                optativo: { morph: "\u00d8", mood: "optative", tense: "nonpast", connector: "0-0 / c-an" },
            },
            predicateNominalSourceTenses: ["presente", "presente-habitual", "imperfecto", "preterito", "pasado-remoto", "futuro"],
            nawatFiniteExtensionsKeptOutOfPredicateNominalSources: [
                "presente-desiderativo",
                "perfecto",
                "pluscuamperfecto",
                "condicional-perfecto",
                "condicional",
            ],
            ordinaryNncHasTensePosition: false,
            vncHasTensePosition: true,
        }
    );

    s.eq(
        "core NNC inventory keeps Andrews structural dyads before Nawat realization",
        {
            hasCorePrintedPdfRefs: hasAll(inventory, [
                "§4.4, printed p. 46 / PDF p. 61",
                "§4.5, printed p. 48 / PDF p. 63",
                "§12.2, printed p. 100 / PDF p. 115",
                "§13.1, printed p. 105 / PDF p. 120",
            ]),
            hasCoreNncFormulas: hasAll(inventory, [
                "`#pers1-pers2+st1-st2(STEM)num1-num2#`",
                "`#pers1-pers2+st(STEM)num1-num2#`",
                "`#pers1-pers2(STEM)num1-num2#`",
            ]),
            hasClassicalAbsolutiveDyads: hasAll(inventory, [
                "| Singular/common absolutive | `tl-0`, `tli-0 ~ li-0`, `in-0`, `0-0` |",
                "| first singular | `#n-0(...)tl-0#`",
                "Andrews prints the structural Classical dyad `tl-0`; Nawat/Pipil `t/ti` output is an orthography-bridge realization",
            ]),
            hasNawatNncRealizationTable: hasAll(inventory, [
                "| `tl-0` | `t-0` |",
                "| `tli-0 ~ li-0` | `ti-0` |",
                "| `m-eh` | `m-et` |",
                "| `0-h` | `0-t` |",
                "| `st = tla` | `ta` |",
                "| `am-o ~ am-[sq0]` | `anm-u ~ anm-[sq0]` |",
                "| `ī-m ~ i-n ...` | `i-n ~ i-nh` |",
            ]),
            hasBridgeNncRealizationTable: hasAll(conversionNotes, [
                "### Core NNC Slot Realization Table",
                "| `tl-0` | `t-0` |",
                "| `tli-0 ~ li-0` | `ti-0` |",
                "| `m-eh` | `m-et` |",
                "| `0-h` | `0-t` |",
                "| `st = tla` | `ta` |",
                "| `am-o ~ am-□` | `anm-u ~ anm-□` |",
                "| `ī-m ~ i-n ...` | `i-n ~ i-nh` |",
            ]),
            staleNawatDyadInAbsolutiveTable: inventory.includes("| Singular/common absolutive | `ti-0`"),
            runtimeLesson12Dyads: ctx.getNncLesson12SubjectPositionFrame().num1Num2Rule.singularCommonDyads,
        },
        {
            hasCorePrintedPdfRefs: true,
            hasCoreNncFormulas: true,
            hasClassicalAbsolutiveDyads: true,
            hasNawatNncRealizationTable: true,
            hasBridgeNncRealizationTable: true,
            staleNawatDyadInAbsolutiveTable: false,
            runtimeLesson12Dyads: ["tl-0", "tli-0", "li-0", "in-0", "0-0"],
        }
    );

    s.eq(
        "formula inventory records other NNC search evidence",
        {
            hasOtherNncSearchIndex: hasAll(inventory, [
                "## Other NNC Search Evidence",
                "Exact `other NNC(s)` hits",
                "Additional `Other Adverbialized Absolutive-State NNCs` heading hits",
                "| 445 | 460 | heading hit | No formula-like rows indexed on the hit page. |",
            ]),
            hasRepresentativeOtherNncRows: hasAll(inventory, [
                "`printed 129 / PDF 144`",
                "`#0-0(tl-eh)0-0#`",
                "`#0-0(tl-eh-hua)tl-0#`",
                "NNC side: these rows keep possessive-state material",
                "`#an-0+n-o(pil)hu-ān#`",
                "`#0-0+n-o(pil-hu-ān-tzi-tzin)hu-ān#`",
                "`#0-0+n-o(pil-hu-ān-tzi-tzin)0-[sq0]#`",
                "`#0-0+ī-m(pih-pil-hu-ān-tzi-tzin)0-[sq0]#`",
                "`#0-0(pi-pil)t-in#`",
                "`#0-0(oquich-pi-pil)t-in#`",
                "`#0-0(cihua-pi-pil)t-in#`",
                "`#ti-0(pil-tzin)tli-0#`",
                "`#0-0(pil-ton)tli-0#`",
                "no VNC tense slot is present",
                "These p. 294 rows feed the scoped Lesson 32 `pil` child/noble NNC-side output generator",
                "ordinaryNnc.outputSet = \"lesson32-pil-child-nnc-side\"",
                "without changing the default ordinary NNC generation gate",
                "`#ni-0(0-0-mich-in-0+0-0-i-0-īx-xo-h-0)[sq0]-0#`",
                "`#0-0(mo)[sq0]-0#`",
                "`#ti-0+n-o(mach)0-0#`",
                "`#0-0(que-n)0-0#`",
                "`#0-0+i-0(m-o-chihua-ya-n)0-0#`",
                "`#0-0(Cuauh-ti-tlan-ca-yo)tl-0#`",
            ]),
            evidenceIndexDoesNotCreateGenerationGate: inventory.includes(
                "these hits are an evidence index and do not create new ordinary NNC generation gates"
            ),
        },
        {
            hasOtherNncSearchIndex: true,
            hasRepresentativeOtherNncRows: true,
            evidenceIndexDoesNotCreateGenerationGate: true,
        }
    );

    s.eq(
        "formula docs cover derivational route families used by conjugation output",
        {
            inventoryHasDerivationalFamilies: hasAll(inventory, [
                "## Multiple-Valence VNC Formulas",
                "`#pers1-pers2+va+va+va(DBASE-CAUS-APPLIC)tns+num1-num2#`",
                "VNC + VNC = compound VNC",
                "NNC + VNC = compound VNC",
                "NNC + NNC = compound NNC",
                "## Nominalized VNC Formula Patterns",
                "Preterit-agentive NNC",
                "## Predicate-Derived NNC Formula Evidence",
                "Literal `NNC predicate` Search Hits",
                "Preterit-Agentive NNC Evidence",
                "`#ni-0(pix-ca-0)c-0#`",
                "`#0-0(mauh-0)qui-0#`",
                "`#0-0+t-o(mic-0-ca)uh-0#`",
                "Customary-present agentive by reanalysis",
                "Customary-present patientive",
                "Instrumentive",
                "Present-agentive",
                "Future-agentive",
                "Passive-action",
                "Active-action, first type",
                "## Personal-Name NNC Formula Pattern",
            ]),
            derivationTypes: Object.values(ctx.DERIVATION_TYPE).sort(),
            derivationModes: Object.values(ctx.DERIVATION_MODE).sort(),
            derivationalFormula: ctx.renderAndrewsFormulaTemplate("derivational-routes"),
            derivationalHasTensePosition: ctx.getDerivationalRouteFormulaSchema().hasTensePosition,
            workbenchRouteExamples: ctx.buildDerivationalRouteFormulaWorkbenchExamples()
                .map((example) => example.id)
                .sort(),
            nominalizationExamples: ctx.buildNominalizationFormulaWorkbenchExamples()
                .map((example) => example.id)
                .sort(),
        },
        {
            inventoryHasDerivationalFamilies: true,
            derivationTypes: ["applicative", "causative", "direct"],
            derivationModes: ["active", "nonactive"],
            derivationalFormula: "SOURCE -> OP -> TARGET",
            derivationalHasTensePosition: null,
            workbenchRouteExamples: [
                "route-24-causative",
                "route-25-causative",
                "route-26-applicative",
                "route-27-frequentative",
                "route-28-compound",
                "route-29-purposive",
                "route-35-agentive-nominalization",
                "route-46-3-1-a",
                "route-54-denominal",
                "route-56-personal-name",
            ],
            nominalizationExamples: [
                "customary-agentive-reanalysis",
                "customary-patientive",
                "fully-nominalized-customary-agentive",
                "future-agentive",
                "instrumentive-possessive",
                "preterit-agentive-concrete",
                "preterit-agentive-nominalization",
            ],
        }
    );

    s.eq(
        "denominal derivation contracts remain Andrews-indexed and source-gated",
        {
            coverage: ctx.getNawatDenominalAndrewsContractCoverageSummary(),
            contractIds: ctx.getNawatDenominalAndrewsContractInventory().map((contract) => contract.id),
            generatedCoverage: ctx.getGeneratedDenominalAndrewsContractCoverageSummary(),
        },
        {
            coverage: {
                version: 1,
                curriculumRef: { source: "Andrews", range: "54.2-55.7", role: "denominal-contract-inventory" },
                outputKind: "denominal-andrews-contract-coverage",
                contractCount: 26,
                routeCoveredContractCount: 3,
                unmodeledContractCount: 0,
                targetUnmodeledContractCount: 0,
                nawatOnlyRouteFamilies: ["vt-na"],
                unmodeledContractIds: [],
                targetUnmodeledContractIds: [],
                boundaries: {
                    noNewSurfaceForms: true,
                    noFixtureEvidence: true,
                    structuralInventoryOnly: false,
                    fullLessonGenerationModeled: false,
                },
            },
            contractIds: [
                "54.2.1-inceptive-stative-ti",
                "54.2.2-inceptive-stative-hui",
                "54.2.2-hui-lia-causative",
                "54.2.3-inceptive-stative-ya",
                "54.2.3-ti-ya-deverbal",
                "54.2.3-hui-ya-deverbal",
                "54.2.3-ya-lia-causative",
                "54.2.4-inceptive-stative-a",
                "54.2.5-inceptive-stative-hua",
                "54.3-included-possessor-ti",
                "54.4-possession-ti",
                "54.2-54.4-ti-lia-causative",
                "54.5-ti-a-causative",
                "54.6-t-ia-applicative",
                "55.1-temporal-tia",
                "55.2-causative-tla",
                "55.2-tla-ti-lia-applicative",
                "55.2-intransitive-tla",
                "55.2-intransitive-tla-ti-a-causative",
                "55.2-intransitive-tla-ti-lia-applicative",
                "55.3-intransitive-o-a-applicative-huia",
                "55.3-o-a-il-huia-al-huia-applicative-note",
                "55.4-adverbial-huia",
                "55.5-relational-compound-o-a-huia",
                "55.6-i-hui-a-hui-to-o-a",
                "55.7-transitive-i-a",
            ],
            generatedCoverage: {
                version: 1,
                curriculumRef: { source: "Andrews", range: "54.2-55.7", role: "denominal-contract-inventory" },
                outputKind: "denominal-andrews-contract-coverage",
                contractCount: 26,
                routeCoveredContractCount: 3,
                unmodeledContractCount: 23,
                targetUnmodeledContractCount: 1,
                nawatOnlyRouteFamilies: ["vt-na"],
                unmodeledContractIds: [
                    "54.2.2-inceptive-stative-hui",
                    "54.2.2-hui-lia-causative",
                    "54.2.3-inceptive-stative-ya",
                    "54.2.3-ti-ya-deverbal",
                    "54.2.3-hui-ya-deverbal",
                    "54.2.3-ya-lia-causative",
                    "54.2.4-inceptive-stative-a",
                    "54.2.5-inceptive-stative-hua",
                    "54.3-included-possessor-ti",
                    "54.2-54.4-ti-lia-causative",
                    "54.5-ti-a-causative",
                    "54.6-t-ia-applicative",
                    "55.1-temporal-tia",
                    "55.2-causative-tla",
                    "55.2-tla-ti-lia-applicative",
                    "55.2-intransitive-tla",
                    "55.2-intransitive-tla-ti-a-causative",
                    "55.2-intransitive-tla-ti-lia-applicative",
                    "55.3-intransitive-o-a-applicative-huia",
                    "55.3-o-a-il-huia-al-huia-applicative-note",
                    "55.4-adverbial-huia",
                    "55.5-relational-compound-o-a-huia",
                    "55.7-transitive-i-a",
                ],
                targetUnmodeledContractIds: ["55.6-i-hui-a-hui-to-o-a"],
                boundaries: {
                    noNewSurfaceForms: true,
                    noFixtureEvidence: true,
                    structuralInventoryOnly: true,
                    fullLessonGenerationModeled: false,
                },
            },
        }
    );

    return s;
}

module.exports = { run };
