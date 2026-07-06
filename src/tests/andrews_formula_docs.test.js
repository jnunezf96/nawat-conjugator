"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function readDoc(relativePath) {
    return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
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
                "| `i-m ~ i-n ...` | `i-n ~ i-nh` |",
            ]),
            hasBridgeNncRealizationTable: hasAll(conversionNotes, [
                "### Core NNC Slot Realization Table",
                "| `tl-0` | `t-0` |",
                "| `tli-0 ~ li-0` | `ti-0` |",
                "| `m-eh` | `m-et` |",
                "| `0-h` | `0-t` |",
                "| `st = tla` | `ta` |",
                "| `am-o ~ am-□` | `anm-u ~ anm-□` |",
                "| `i-m ~ i-n ...` | `i-n ~ i-nh` |",
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
                "`#an-0+n-o(pil)hu-an#`",
                "`#0-0+n-o(pil-hu-an-tzi-tzin)hu-an#`",
                "`#0-0+n-o(pil-hu-an-tzi-tzin)0-[sq0]#`",
                "`#0-0+i-m(pih-pil-hu-an-tzi-tzin)0-[sq0]#`",
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
